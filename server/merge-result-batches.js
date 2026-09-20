import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const RESULT_DIR = path.resolve(process.cwd(), 'result data');
const DB_PATH = path.resolve(process.cwd(), 'data', 'algovision.sqlite');
const MASTER_FILE = path.join(RESULT_DIR, 'dsa_research_combined_master.json');
const BACKUP_FILE = path.join(RESULT_DIR, 'dsa_research_combined_master.backup.json');

function getYoutubeVideoId(url) {
  if (!url || typeof url !== 'string') return null;
  const m = url.match(/(?:v=|\/embed\/|youtu\.be\/|\/v\/|watch\?v=)([\w-]{11})/);
  return m ? m[1] : null;
}

function normalizeWebUrl(u) {
  if (!u || typeof u !== 'string') return '';
  return u.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/+$/, '');
}

export function runBatchMerge() {
  console.log('='.repeat(70));
  console.log('  DSA RESEARCH BATCHES MERGE & DEDUPLICATION PIPELINE');
  console.log('='.repeat(70));

  if (!fs.existsSync(RESULT_DIR)) {
    console.error(`[-] Result directory not found at ${RESULT_DIR}`);
    process.exit(1);
  }

  // Backup master file if exists
  if (fs.existsSync(MASTER_FILE)) {
    fs.copyFileSync(MASTER_FILE, BACKUP_FILE);
    console.log(`[+] Backed up master research file to ${path.basename(BACKUP_FILE)}`);
  }

  // Find all JSON batch files
  const files = fs.readdirSync(RESULT_DIR).filter(f => f.endsWith('.json') && !f.includes('backup'));
  console.log(`[+] Found ${files.length} batch files in ${RESULT_DIR}:`);
  for (const f of files) {
    console.log(`    - ${f}`);
  }

  // Aggregation map
  const aggregated = new Map();

  for (const file of files) {
    const filePath = path.join(RESULT_DIR, file);
    let items;
    try {
      items = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (err) {
      console.error(`[-] Failed to parse ${file}:`, err.message);
      continue;
    }

    if (!Array.isArray(items)) {
      items = items.questions || [];
    }

    let fileCount = 0;
    for (const item of items) {
      const id = item.id || item.slug;
      if (!id) continue;
      fileCount++;

      if (!aggregated.has(id)) {
        aggregated.set(id, {
          id,
          title: item.title || id,
          gfg_url: item.gfg_url || null,
          alternate_articles: Array.isArray(item.alternate_articles) ? [...item.alternate_articles] : [],
          alternate_videos: Array.isArray(item.alternate_videos) ? [...item.alternate_videos] : [],
          article_content: item.article_content || null,
          source_files: [file]
        });
      } else {
        const existing = aggregated.get(id);
        existing.source_files.push(file);
        if (!existing.gfg_url && item.gfg_url) {
          existing.gfg_url = item.gfg_url;
        }
        if (!existing.article_content && item.article_content) {
          existing.article_content = item.article_content;
        }
        if (Array.isArray(item.alternate_articles)) {
          existing.alternate_articles.push(...item.alternate_articles);
        }
        if (Array.isArray(item.alternate_videos)) {
          existing.alternate_videos.push(...item.alternate_videos);
        }
      }
    }
    console.log(`    Parsed ${fileCount} entries from ${file}`);
  }

  console.log(`\n[+] Total unique problems aggregated across batches: ${aggregated.size}`);

  // Connect to SQLite
  const sqlite = new DatabaseSync(DB_PATH);
  const dbQuestions = sqlite.prepare('SELECT id, slug, title, youtube_url, article_url, gfg_url, youtube_videos, alternate_articles FROM questions').all();
  const dbById = new Map();
  const dbBySlug = new Map();
  const dbByTitle = new Map();

  for (const q of dbQuestions) {
    dbById.set(q.id, q);
    if (q.slug) dbBySlug.set(q.slug, q);
    if (q.title) dbByTitle.set(q.title.toLowerCase().trim(), q);
  }

  console.log(`[+] Total questions in database: ${dbQuestions.length}`);

  let updatedDbCount = 0;
  let skippedTufVideosCount = 0;
  let addedAltVideosCount = 0;
  let skippedTufArticlesCount = 0;
  let skippedGfgArticlesCount = 0;
  let addedAltArticlesCount = 0;
  let gfgUrlsSetCount = 0;

  const consolidatedMaster = [];

  const updateStmt = sqlite.prepare(`
    UPDATE questions
    SET gfg_url = ?,
        youtube_videos = ?,
        alternate_articles = ?,
        youtube_url = CASE WHEN (youtube_url IS NULL OR youtube_url = '') AND ? != '' THEN ? ELSE youtube_url END,
        updated_at = datetime('now')
    WHERE id = ?
  `);

  sqlite.exec('BEGIN TRANSACTION');

  try {
    for (const [id, rawItem] of aggregated.entries()) {
      const normTitle = (rawItem.title || '').toLowerCase().trim();
      const q = dbById.get(id) || dbBySlug.get(id) || dbByTitle.get(normTitle);
      
      const primaryArticleNorm = normalizeWebUrl(q?.article_url);
      let primaryYtUrl = q?.youtube_url || '';
      let primaryYtId = getYoutubeVideoId(primaryYtUrl);

      // Determine GFG URL
      let candidateGfg = rawItem.gfg_url || q?.gfg_url || '';
      if (!candidateGfg) {
        const found = rawItem.alternate_articles?.find(a => (a.url || '').toLowerCase().includes('geeksforgeeks'));
        if (found) candidateGfg = found.url;
      }
      const gfgNorm = normalizeWebUrl(candidateGfg);
      if (candidateGfg && (!q?.gfg_url || q.gfg_url !== candidateGfg)) {
        gfgUrlsSetCount++;
      }

      // --- Deduplicate Videos ---
      const finalVideos = [];
      const seenYtIds = new Set();
      const seenVideoUrls = new Set();
      let newPrimaryYtToSet = '';

      if (id === 'two-sum' && !primaryYtUrl) {
        primaryYtUrl = 'https://youtu.be/UXDSeD9mN-k';
        primaryYtId = getYoutubeVideoId(primaryYtUrl);
        newPrimaryYtToSet = primaryYtUrl;
      }

      // Step 1: Establish Primary Video
      if (primaryYtUrl) {
        if (primaryYtId) seenYtIds.add(primaryYtId);
        seenVideoUrls.add(normalizeWebUrl(primaryYtUrl));
        finalVideos.push({
          id: 'striver-primary',
          title: "Striver's Tutorial",
          url: primaryYtUrl,
          channel: 'take U forward',
          is_primary: true
        });
      } else {
        // Look for TUF video in the batch to promote to primary
        const tufCandidate = rawItem.alternate_videos.find(v => {
          if (!v || !v.url) return false;
          const vUrl = v.url.trim();
          const normUrl = normalizeWebUrl(vUrl);
          const ch = (v.channel || '').toLowerCase();
          const isYt = Boolean(getYoutubeVideoId(vUrl));
          return isYt && (ch.includes('take u forward') || ch.includes('striver') || normUrl.includes('takeuforward'));
        });

        if (tufCandidate) {
          const vUrl = tufCandidate.url.trim();
          const vId = getYoutubeVideoId(vUrl);
          if (vId) seenYtIds.add(vId);
          seenVideoUrls.add(normalizeWebUrl(vUrl));
          finalVideos.push({
            id: 'striver-primary',
            title: tufCandidate.title || "Striver's Tutorial",
            url: vUrl,
            channel: 'take U forward',
            is_primary: true,
            ...(tufCandidate.notes ? { notes: tufCandidate.notes } : {})
          });
          primaryYtUrl = vUrl;
          primaryYtId = vId;
          newPrimaryYtToSet = vUrl;
        }
      }

      // Step 2: Add Alternate Educator Videos with strict TUF & duplicate suppression
      for (const v of rawItem.alternate_videos) {
        if (!v || !v.url) continue;
        const vUrl = v.url.trim();
        const vId = getYoutubeVideoId(vUrl);
        const normUrl = normalizeWebUrl(vUrl);
        const ch = (v.channel || '').toLowerCase();
        const isTuf = ch.includes('take u forward') || ch.includes('striver') || normUrl.includes('takeuforward');

        // Check if duplicate of already included video
        if (vId && seenYtIds.has(vId)) {
          if (isTuf) skippedTufVideosCount++;
          continue;
        }
        if (normUrl && seenVideoUrls.has(normUrl)) {
          if (isTuf) skippedTufVideosCount++;
          continue;
        }

        // Strict TUF deduplication: if primary TUF video already exists, don't add duplicate TUF video
        if (isTuf) {
          skippedTufVideosCount++;
          continue;
        }

        // Non-TUF alternate educator video (NeetCode, Abdul Bari, etc.)
        if (vId) seenYtIds.add(vId);
        if (normUrl) seenVideoUrls.add(normUrl);
        finalVideos.push({
          id: v.id || (vId ? `vid-${vId}` : `vid-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`),
          title: v.title || 'Video Solution',
          url: vUrl,
          channel: v.channel || 'Educator',
          is_primary: false,
          ...(v.notes ? { notes: v.notes } : {})
        });
        addedAltVideosCount++;
      }

      // --- Deduplicate Articles ---
      const finalArticles = [];
      const seenArticleUrls = new Set();
      if (primaryArticleNorm) seenArticleUrls.add(primaryArticleNorm);
      if (gfgNorm) seenArticleUrls.add(gfgNorm);

      for (const a of rawItem.alternate_articles) {
        if (!a || !a.url) continue;
        const aUrl = a.url.trim();
        const aNorm = normalizeWebUrl(aUrl);
        const src = (a.source || '').toLowerCase();
        const isTuf = src.includes('take u forward') || src.includes('striver') || aNorm.includes('takeuforward.org');

        // Strict TUF deduplication: TUF article already present on site
        if (isTuf) {
          skippedTufArticlesCount++;
          continue;
        }

        // Dedicated GeeksforGeeks problem card already covers gfg_url
        if (gfgNorm && (aNorm === gfgNorm || aNorm.includes(gfgNorm) || gfgNorm.includes(aNorm))) {
          skippedGfgArticlesCount++;
          continue;
        }

        if (seenArticleUrls.has(aNorm)) {
          continue;
        }

        seenArticleUrls.add(aNorm);
        finalArticles.push({
          title: a.title || 'Editorial Article',
          url: aUrl,
          source: a.source || 'Editorial'
        });
        addedAltArticlesCount++;
      }

      // Build consolidated clean item
      consolidatedMaster.push({
        id,
        title: rawItem.title || q?.title || id,
        gfg_url: candidateGfg || null,
        alternate_articles: finalArticles,
        alternate_videos: finalVideos.filter(v => !v.is_primary), // clean alternate videos
        primary_video: finalVideos.find(v => v.is_primary) || null,
        ...(rawItem.article_content ? { article_content: rawItem.article_content } : {})
      });

      // Update SQLite database if question exists
      if (q) {
        updateStmt.run(
          candidateGfg || null,
          JSON.stringify(finalVideos),
          JSON.stringify(finalArticles),
          newPrimaryYtToSet,
          newPrimaryYtToSet,
          q.id
        );
        updatedDbCount++;
      }
    }

    sqlite.exec('COMMIT');
    console.log(`\n[+] Successfully updated ${updatedDbCount} questions in SQLite database!`);
  } catch (err) {
    sqlite.exec('ROLLBACK');
    console.error('[-] Transaction failed, rolled back:', err);
    throw err;
  }

  // Save consolidated master dataset to disk
  fs.writeFileSync(MASTER_FILE, JSON.stringify(consolidatedMaster, null, 2), 'utf8');
  console.log(`[+] Saved consolidated deduplicated master file (${consolidatedMaster.length} items) to:`);
  console.log(`    ${MASTER_FILE}`);

  // Summary Metrics
  console.log('\n' + '='.repeat(70));
  console.log('  PIPELINE AUDIT & DEDUPLICATION SUMMARY');
  console.log('='.repeat(70));
  console.log(`  Questions Ingested / Updated in SQLite: ${updatedDbCount}`);
  console.log(`  GFG Practice URLs Configured:          ${gfgUrlsSetCount}`);
  console.log(`  Duplicate TUF Videos Skipped:          ${skippedTufVideosCount} (Preserved single primary TUF video)`);
  console.log(`  Alternate Educator Videos Added:       ${addedAltVideosCount} (NeetCode, Abdul Bari, Babbar, etc.)`);
  console.log(`  Duplicate TUF Articles Skipped:        ${skippedTufArticlesCount} (Avoided duplicate TUF guide cards)`);
  console.log(`  Duplicate GFG Articles Skipped:        ${skippedGfgArticlesCount} (Avoided duplicate GFG practice cards)`);
  console.log(`  Unique Alternate Articles Added:       ${addedAltArticlesCount} (LeetCode editorials & tutorials)`);
  console.log('='.repeat(70));
}

// Auto-run if executed directly
if (process.argv[1] && process.argv[1].endsWith('merge-result-batches.js')) {
  runBatchMerge();
}
