#!/usr/bin/env python3
"""
Striver's A2Z DSA Sheet Scraper
Target: https://takeuforward.org/dsa/strivers-a2z-sheet-learn-dsa-a-to-z

Extracts all 18 steps, subcategories, and 470+ problems with:
- Problem Name & ID
- Step & Subcategory Hierarchy
- Difficulty (Easy, Medium, Hard)
- YouTube Video Link
- LeetCode Practice Link
- TakeUForward Article / Editorial Link
- TakeUForward Plus Practice Link

Saves structured data into both JSON and CSV formats.
"""

import sys
import os
import re
import json
import csv
import argparse
import urllib.request
from typing import Dict, List, Any, Optional

# Ensure UTF-8 output on Windows consoles
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8")

URL = "https://takeuforward.org/dsa/strivers-a2z-sheet-learn-dsa-a-to-z"
BASE_URL = "https://takeuforward.org"

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
}


def fetch_html(url: str) -> str:
    """Fetch raw HTML from the target URL."""
    print(f"[*] Fetching page from: {url}")
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=30) as resp:
        html = resp.read().decode("utf-8", errors="ignore")
    print(f"[+] Successfully fetched {len(html):,} bytes.")
    return html


def extract_nextjs_payload(html: str) -> str:
    """Extract and reconstruct the Next.js App Router RSC payload chunks."""
    splits = html.split("self.__next_f.push(")
    if len(splits) <= 1:
        raise ValueError("No self.__next_f.push calls found in page HTML.")

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
    return combined


def parse_sections_from_payload(payload: str) -> List[Dict[str, Any]]:
    """Extract and parse the 'sections' JSON array from decoded RSC payload."""
    sec_start = payload.find('"sections":[')
    if sec_start == -1:
        raise ValueError("Could not locate 'sections' array in decoded Next.js payload.")

    array_start = sec_start + len('"sections":')
    depth = 0
    in_string = False
    escape = False
    end_idx = -1

    for i in range(array_start, len(payload)):
        ch = payload[i]
        if escape:
            escape = False
            continue
        if ch == "\\":
            escape = True
            continue
        if ch == '"':
            in_string = not in_string
            continue
        if not in_string:
            if ch == "[":
                depth += 1
            elif ch == "]":
                depth -= 1
                if depth == 0:
                    end_idx = i + 1
                    break

    if end_idx == -1:
        raise ValueError("Failed to match closing bracket for 'sections' array.")

    sections_raw = payload[array_start:end_idx]
    # Replace Next.js undefined representation
    sections_cleaned = re.sub(r':\s*"\$undefined"', ": null", sections_raw)
    return json.loads(sections_cleaned)


def normalize_link(link: Optional[str]) -> Optional[str]:
    """Normalize relative links to full URLs."""
    if not link or link in ("$undefined", "null", ""):
        return None
    link = link.strip()
    if link.startswith("/"):
        return BASE_URL + link
    return link


def process_scraped_data(sections_data: List[Dict[str, Any]]) -> Dict[str, Any]:
    """Transform raw sections into both hierarchical and flat formats."""
    steps = []
    flat_problems = []

    for step_idx, sec in enumerate(sections_data, 1):
        step_id = sec.get("category_id")
        step_title = sec.get("category_name", f"Step {step_idx}").strip()
        subcategories = []

        for sub_idx, sub in enumerate(sec.get("subcategories", []), 1):
            sub_id = sub.get("subcategory_id")
            sub_title = sub.get("subcategory_name", f"Subcategory {sub_idx}").strip()
            # Clean newline characters in subcategory names
            sub_title = re.sub(r"\s+", " ", sub_title)

            problems = []
            for prob_idx, p in enumerate(sub.get("problems", []), 1):
                prob_id = p.get("problem_id")
                prob_name = p.get("problem_name", "").strip()
                difficulty = p.get("difficulty", "Medium")
                article_url = normalize_link(p.get("article"))
                youtube_url = normalize_link(p.get("youtube"))
                leetcode_url = normalize_link(p.get("leetcode"))
                plus_url = normalize_link(p.get("plus"))
                editorial_url = normalize_link(p.get("editorial"))
                other_link = normalize_link(p.get("link"))

                prob_item = {
                    "step_no": step_idx,
                    "step_name": step_title,
                    "substep_no": sub_idx,
                    "substep_name": sub_title,
                    "problem_id": prob_id,
                    "problem_name": prob_name,
                    "difficulty": difficulty,
                    "youtube_url": youtube_url,
                    "leetcode_url": leetcode_url,
                    "article_url": article_url,
                    "plus_url": plus_url,
                    "editorial_url": editorial_url,
                    "other_practice_url": other_link,
                }
                problems.append(prob_item)
                flat_problems.append(prob_item)

            subcategories.append({
                "substep_no": sub_idx,
                "subcategory_id": sub_id,
                "subcategory_name": sub_title,
                "total_problems": len(problems),
                "problems": problems,
            })

        steps.append({
            "step_no": step_idx,
            "category_id": step_id,
            "step_name": step_title,
            "total_subcategories": len(subcategories),
            "total_problems": sum(len(sub["problems"]) for sub in subcategories),
            "subcategories": subcategories,
        })

    stats = {
        "total_steps": len(steps),
        "total_subcategories": sum(len(s["subcategories"]) for s in steps),
        "total_problems": len(flat_problems),
        "with_youtube": sum(1 for p in flat_problems if p["youtube_url"]),
        "with_leetcode": sum(1 for p in flat_problems if p["leetcode_url"]),
        "with_article": sum(1 for p in flat_problems if p["article_url"]),
        "difficulty_breakdown": {
            "Easy": sum(1 for p in flat_problems if p["difficulty"] == "Easy"),
            "Medium": sum(1 for p in flat_problems if p["difficulty"] == "Medium"),
            "Hard": sum(1 for p in flat_problems if p["difficulty"] == "Hard"),
        }
    }

    return {
        "metadata": {
            "source_url": URL,
            "title": "Striver's A2Z DSA Sheet",
            "description": "Complete Striver's A2Z DSA Sheet questions with video tutorials, LeetCode links & articles",
            "stats": stats,
        },
        "steps": steps,
        "flat_problems": flat_problems,
    }


def save_json(data: Dict[str, Any], filepath: str) -> None:
    """Save full structured data to JSON."""
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"[+] Saved structured JSON to: {filepath} ({os.path.getsize(filepath):,} bytes)")


def save_csv(flat_problems: List[Dict[str, Any]], filepath: str) -> None:
    """Save flat problem list to CSV."""
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    fields = [
        "step_no",
        "step_name",
        "substep_no",
        "substep_name",
        "problem_id",
        "problem_name",
        "difficulty",
        "youtube_url",
        "leetcode_url",
        "article_url",
        "plus_url",
        "editorial_url",
        "other_practice_url",
    ]
    with open(filepath, "w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fields)
        writer.writeheader()
        for row in flat_problems:
            writer.writerow({k: (row[k] or "") for k in fields})
    print(f"[+] Saved CSV to: {filepath} ({os.path.getsize(filepath):,} bytes)")


def main():
    parser = argparse.ArgumentParser(
        description="Scrape all data from Striver's A2Z DSA Sheet (takeuforward.org)"
    )
    parser.add_argument(
        "--out-dir",
        default="data/strivers_a2z",
        help="Directory to save output files (default: data/strivers_a2z)",
    )
    parser.add_argument(
        "--filename",
        default="strivers_a2z_sheet",
        help="Base filename for JSON and CSV outputs (default: strivers_a2z_sheet)",
    )
    args = parser.parse_args()

    print("=" * 65)
    print("  STRIVER'S A2Z DSA SHEET DATA SCRAPER")
    print(f"  Target: {URL}")
    print("=" * 65)

    # 1. Fetch
    html = fetch_html(URL)

    # 2. Extract Next.js payload
    print("[*] Parsing Next.js hydration payload...")
    payload = extract_nextjs_payload(html)

    # 3. Parse sections
    print("[*] Extracting problem hierarchy & links...")
    raw_sections = parse_sections_from_payload(payload)

    # 4. Transform data
    data = process_scraped_data(raw_sections)
    stats = data["metadata"]["stats"]

    # 5. Print Summary
    print("\n" + "-" * 65)
    print(f"  COLLECTION SUMMARY:")
    print(f"  - Total Steps:         {stats['total_steps']}")
    print(f"  - Total Subcategories: {stats['total_subcategories']}")
    print(f"  - Total Problems:      {stats['total_problems']}")
    print(f"  - With YouTube Links:  {stats['with_youtube']} ({(stats['with_youtube']/stats['total_problems'])*100:.1f}%)")
    print(f"  - With LeetCode Links: {stats['with_leetcode']} ({(stats['with_leetcode']/stats['total_problems'])*100:.1f}%)")
    print(f"  - With Article Links:  {stats['with_article']} ({(stats['with_article']/stats['total_problems'])*100:.1f}%)")
    print(f"  - Difficulty:          Easy: {stats['difficulty_breakdown']['Easy']} | Med: {stats['difficulty_breakdown']['Medium']} | Hard: {stats['difficulty_breakdown']['Hard']}")
    print("-" * 65 + "\n")

    # 6. Save outputs
    json_path = os.path.join(args.out_dir, f"{args.filename}.json")
    csv_path = os.path.join(args.out_dir, f"{args.filename}.csv")

    save_json(data, json_path)
    save_csv(data["flat_problems"], csv_path)

    # Also save a minified clean flat list for quick lookups
    flat_json_path = os.path.join(args.out_dir, f"{args.filename}_flat.json")
    with open(flat_json_path, "w", encoding="utf-8") as f:
        json.dump(data["flat_problems"], f, indent=2, ensure_ascii=False)
    print(f"[+] Saved flat problems JSON to: {flat_json_path}")

    print("\n[OK] Done! All Striver's A2Z DSA Sheet data collected successfully.\n")


if __name__ == "__main__":
    main()
