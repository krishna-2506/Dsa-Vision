#!/usr/bin/env python3
"""
Striver's A2Z DSA Sheet - Full Question Article Scraper
Target: All 450+ question articles on https://takeuforward.org/

Extracts for every question:
- Problem Statement
- Examples (Input, Output, Explanation)
- Constraints
- Multiple Approaches (Brute Force, Better, Optimal):
  - Approach Name
  - Intuition & Algorithm Breakdown
  - Time & Space Complexity (with detailed reasoning)
  - Full Working Code in 4 Languages: C++, Java, Python, JavaScript
- Associated Video & LeetCode Links

Features:
- Multi-threaded concurrent scraping (polite & fast)
- Automatic resume / caching (skips already downloaded questions)
- Generates individual JSON files and combined master dataset
"""

import sys
import os
import re
import json
import time
import argparse
import urllib.request
import urllib.error
from concurrent.futures import ThreadPoolExecutor, as_completed
from typing import Dict, List, Any, Optional
from bs4 import BeautifulSoup

# Ensure UTF-8 output on Windows consoles
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8")

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
}


def sanitize_filename(name: str) -> str:
    """Generate safe filename from string."""
    return re.sub(r'[^a-zA-Z0-9_\-]', '_', name.lower()).strip('_')[:60]


def fetch_url(url: str, retries: int = 3, timeout: int = 25) -> Optional[str]:
    """Fetch URL with retry logic."""
    for attempt in range(retries):
        try:
            req = urllib.request.Request(url, headers=HEADERS)
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                return resp.read().decode("utf-8", errors="ignore")
        except Exception as e:
            if attempt < retries - 1:
                time.sleep(1.0 + attempt)
            else:
                return None
    return None


def extract_article_html(html: str) -> str:
    """Extract and reconstruct full article HTML from Next.js RSC payload."""
    splits = html.split("self.__next_f.push(")
    combined = ""
    for chunk in splits[1:]:
        idx_close = chunk.rfind(")")
        content = chunk[:idx_close].strip()
        if content.startswith("[1,"):
            raw_str = content[3:].strip()
            if raw_str.endswith("]"):
                raw_str = raw_str[:-1].strip()
            try:
                val = json.loads(raw_str)
                combined += val
            except Exception:
                pass

    start_idx = combined.find("<p><strong>Problem Statement:")
    if start_idx == -1:
        start_idx = combined.find("Problem Statement:")

    if start_idx != -1:
        article_html = combined[start_idx:]
        end_marker = article_html.rfind("</div>")
        if end_marker != -1:
            article_html = article_html[:end_marker + 6]
        return article_html
    return combined or html


def clean_text(text: Optional[str]) -> str:
    """Clean excess whitespace from extracted text."""
    if not text:
        return ""
    text = re.sub(r'\r\n|\r', '\n', text)
    text = re.sub(r'[ \t]+', ' ', text)
    text = re.sub(r'\n{3,}', '\n\n', text)
    return text.strip()


def parse_article_content(html: str, problem_meta: Dict[str, Any]) -> Dict[str, Any]:
    """Parse complete problem statement, examples, and approaches from HTML."""
    article_html = extract_article_html(html)
    soup = BeautifulSoup(article_html, "html.parser")

    # 1. Problem Statement
    statement_p = soup.find(lambda t: t.name == "p" and "Problem Statement:" in t.text)
    problem_statement = ""
    if statement_p:
        problem_statement = statement_p.text.replace("Problem Statement:", "").strip()
    else:
        # Fallback 1: look for strong with Problem Statement
        st_tag = soup.find(lambda t: t.name in ["strong", "b"] and "Problem Statement" in t.text)
        if st_tag and st_tag.parent:
            problem_statement = st_tag.parent.text.replace("Problem Statement:", "").strip()
        else:
            # Fallback 2: introductory content paragraphs (for tutorials/concept notes)
            intro_paragraphs = []
            for p in soup.find_all("p"):
                txt = clean_text(p.text)
                if len(txt) > 25 and not txt.startswith("Disclaimer") and "practice link" not in txt.lower():
                    intro_paragraphs.append(txt)
                    if len(intro_paragraphs) >= 2:
                        break
            if intro_paragraphs:
                problem_statement = "\n\n".join(intro_paragraphs)

    # 2. Examples
    examples = []
    examples_div = soup.find("div", id="article_examples")
    if examples_div:
        pres = examples_div.find_all("pre")
        for pre in pres:
            raw_ex = pre.text.strip()
            if raw_ex:
                examples.append(clean_text(raw_ex))
    else:
        # Fallback: look for pre with Example 1
        ex_pres = soup.find_all(lambda t: t.name == "pre" and "Example" in t.text)
        for ep in ex_pres:
            raw_ex = ep.text.strip()
            if raw_ex:
                examples.append(clean_text(raw_ex))

    # 3. Approaches (Brute Force, Better, Optimal)
    approaches = []
    # Identify approach containers: details or divs with approach ids
    approach_blocks = soup.find_all("div", id=re.compile(r".*approach.*", re.I))
    if not approach_blocks:
        approach_blocks = soup.find_all("div", class_=re.compile(r".*approach.*", re.I))

    # Fallback to scanning details with .main-summary
    if not approach_blocks:
        details_list = soup.find_all("details")
        for d in details_list:
            if d.find("summary", class_="main-summary"):
                approach_blocks.append(d)

    for idx, block in enumerate(approach_blocks, 1):
        summary = block.find("summary", class_="main-summary")
        approach_name = clean_text(summary.text) if summary else f"Approach {idx}"
        approach_name = re.sub(r'\s+', ' ', approach_name).strip()

        # Algorithm text
        algo_div = block.find("div", class_="approach-algorithm")
        algorithm_desc = clean_text(algo_div.text) if algo_div else ""

        # Codes in C++, Java, Python, JavaScript
        codes = {}
        code_blocks = block.find_all("div", class_="code-block")
        for cb in code_blocks:
            lang = cb.get("data-lang", "unknown").lower().strip()
            code_tag = cb.find("code")
            if code_tag:
                codes[lang] = code_tag.text.strip()

        # Complexities
        time_complexity = ""
        space_complexity = ""
        time_details = ""
        space_details = ""

        tc_p = block.find(lambda t: t.name == "p" and "Time Complexity:" in t.text)
        if tc_p:
            time_details = clean_text(tc_p.text)
            m_tc = re.search(r'O\([^)]+\)', time_details)
            time_complexity = m_tc.group(0) if m_tc else "O(N)"

        sc_p = block.find(lambda t: t.name == "p" and "Space Complexity:" in t.text)
        if sc_p:
            space_details = clean_text(sc_p.text)
            m_sc = re.search(r'O\([^)]+\)', space_details)
            space_complexity = m_sc.group(0) if m_sc else "O(1)"

        if codes or algorithm_desc:
            approaches.append({
                "approach_name": approach_name,
                "algorithm": algorithm_desc,
                "time_complexity": time_complexity or "O(N)",
                "space_complexity": space_complexity or "O(1)",
                "time_complexity_details": time_details,
                "space_complexity_details": space_details,
                "codes": codes
            })

    # Fallback for tutorial or single-solution articles
    if not approaches:
        standalone_codes = {}
        for cb in soup.find_all("div", class_="code-block"):
            lang = cb.get("data-lang", "unknown").lower().strip()
            code_tag = cb.find("code")
            if code_tag:
                standalone_codes[lang] = code_tag.text.strip()

        if standalone_codes:
            approaches.append({
                "approach_name": "Standard Solution",
                "algorithm": "",
                "time_complexity": "O(N)",
                "space_complexity": "O(1)",
                "time_complexity_details": "",
                "space_complexity_details": "",
                "codes": standalone_codes
            })

    return {
        "problem_id": problem_meta.get("problem_id"),
        "problem_name": problem_meta.get("problem_name"),
        "step_no": problem_meta.get("step_no"),
        "step_name": problem_meta.get("step_name"),
        "substep_no": problem_meta.get("substep_no"),
        "substep_name": problem_meta.get("substep_name"),
        "difficulty": problem_meta.get("difficulty"),
        "youtube_url": problem_meta.get("youtube_url"),
        "leetcode_url": problem_meta.get("leetcode_url"),
        "article_url": problem_meta.get("article_url"),
        "plus_url": problem_meta.get("plus_url"),
        "problem_statement": clean_text(problem_statement),
        "examples": examples,
        "total_approaches": len(approaches),
        "approaches": approaches,
        "scraped_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
    }


def scrape_single_problem(problem_meta: Dict[str, Any], out_dir: str, cache: bool = True) -> Optional[Dict[str, Any]]:
    """Scrape a single problem, caching to disk."""
    pid = problem_meta.get("problem_id") or "000"
    pname = problem_meta.get("problem_name") or "problem"
    article_url = problem_meta.get("article_url")

    if not article_url:
        return None

    filename = f"{pid}_{sanitize_filename(pname)}.json"
    cache_path = os.path.join(out_dir, filename)

    if cache and os.path.exists(cache_path) and os.path.getsize(cache_path) > 100:
        try:
            with open(cache_path, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            pass

    html = fetch_url(article_url)
    if not html:
        return None

    try:
        data = parse_article_content(html, problem_meta)
        with open(cache_path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        return data
    except Exception as e:
        return None


def main():
    parser = argparse.ArgumentParser(
        description="Scrape detailed problem data, algorithms & multi-language codes for all Striver's A2Z questions."
    )
    parser.add_argument(
        "--source-json",
        default="data/strivers_a2z/strivers_a2z_sheet_flat.json",
        help="Path to flat problem list JSON (from scrape_strivers.py)",
    )
    parser.add_argument(
        "--out-dir",
        default="data/strivers_questions",
        help="Directory to save individual question JSON files",
    )
    parser.add_argument(
        "--master-json",
        default="data/strivers_all_questions_detailed.json",
        help="Path to save aggregated master JSON file",
    )
    parser.add_argument(
        "--workers",
        type=int,
        default=6,
        help="Number of concurrent worker threads (default: 6)",
    )
    parser.add_argument(
        "--limit",
        type=int,
        default=None,
        help="Optional limit on number of questions to scrape (for testing)",
    )
    args = parser.parse_args()

    # Load problem list
    if not os.path.exists(args.source_json):
        print(f"[-] Source JSON '{args.source_json}' not found. Running base scraper first...")
        import subprocess
        subprocess.run([sys.executable, "scrape_strivers.py"], check=True)

    with open(args.source_json, "r", encoding="utf-8") as f:
        problems = json.load(f)

    # Filter to problems with article URLs
    problems_with_articles = [p for p in problems if p.get("article_url")]
    total_available = len(problems_with_articles)

    if args.limit:
        problems_to_scrape = problems_with_articles[:args.limit]
    else:
        problems_to_scrape = problems_with_articles

    os.makedirs(args.out_dir, exist_ok=True)

    print("=" * 68)
    print("  STRIVER'S A2Z DSA - DETAILED QUESTION & CODE SCRAPER")
    print(f"  Target Questions: {len(problems_to_scrape)} / {total_available}")
    print(f"  Concurrent Threads: {args.workers}")
    print(f"  Cache Directory: {args.out_dir}")
    print("=" * 68 + "\n")

    results = []
    completed = 0
    total = len(problems_to_scrape)
    start_time = time.time()

    with ThreadPoolExecutor(max_workers=args.workers) as executor:
        future_to_prob = {
            executor.submit(scrape_single_problem, p, args.out_dir): p
            for p in problems_to_scrape
        }

        for future in as_completed(future_to_prob):
            completed += 1
            meta = future_to_prob[future]
            pname = meta.get("problem_name", "Unknown")
            pid = meta.get("problem_id", "")
            try:
                res = future.result()
                if res and res.get("problem_statement"):
                    results.append(res)
                    approaches_cnt = res.get("total_approaches", 0)
                    print(f"[{completed:3d}/{total}] [+] [{pid}] {pname[:35]:35s} | {approaches_cnt} approaches")
                elif res:
                    results.append(res)
                    print(f"[{completed:3d}/{total}] [*] [{pid}] {pname[:35]:35s} | Article parsed")
                else:
                    print(f"[{completed:3d}/{total}] [-] [{pid}] {pname[:35]:35s} | Fetch failed")
            except Exception as e:
                print(f"[{completed:3d}/{total}] [!] [{pid}] {pname[:35]:35s} | Error: {e}")

    elapsed = time.time() - start_time
    print("\n" + "-" * 68)
    print(f"  SCRAPING COMPLETE in {elapsed:.1f}s")
    print(f"  Successfully extracted: {len(results)} / {total} questions")
    print("-" * 68)

    # Save combined master JSON
    os.makedirs(os.path.dirname(args.master_json), exist_ok=True)
    with open(args.master_json, "w", encoding="utf-8") as f:
        json.dump({
            "metadata": {
                "total_questions": len(results),
                "source": "https://takeuforward.org/dsa/strivers-a2z-sheet-learn-dsa-a-to-z",
                "scraped_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
            },
            "questions": results
        }, f, indent=2, ensure_ascii=False)

    print(f"[+] Master dataset saved to: {args.master_json} ({os.path.getsize(args.master_json):,} bytes)")
    print(f"[+] Individual files cached in: {args.out_dir}/\n")


if __name__ == "__main__":
    main()
