#!/usr/bin/env python3
from __future__ import annotations

import re
from collections import defaultdict
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
DOCS_DIR = REPO_ROOT / "docs"
ZH_DIR = DOCS_DIR / "zh"
EN_DIR = DOCS_DIR / "en"
PUBLIC_MEDIA_DIR = DOCS_DIR / "public" / "media"
REPORT_PATH = DOCS_DIR / "MIGRATION-PROGRESS.md"

IGNORE_TOP_DIRS = {
    ".git",
    ".github",
    ".vscode",
    "docs",
    "node_modules",
    ".idea",
    "dist",
    "build",
    ".cache",
}

SECTION_MAP = {
    "arduinoXprocessing": "arduino-processing",
    "CAD & CAM": "cad-cam",
    "ESP32 & Vibe Coding": "esp32-vibe-coding",
    "gamming": "game-coding",
    "Construction of geometric figures": "geometry-construction",
    "interactive": "interactive-lab",
    "math&robotics": "math-robotics",
    "private research": "private-research",
    "processing": "processing",
    "Projects": "projects",
}

MEDIA_REF_RE = re.compile(r"/media/([^/\n\r\t\s`\"'<>]+)/")


@dataclass
class SectionProgress:
    legacy_name: str
    docs_slug: str
    legacy_exists: bool
    md_count: int


def list_top_level_dirs() -> list[str]:
    return sorted(
        p.name
        for p in REPO_ROOT.iterdir()
        if p.is_dir() and p.name not in IGNORE_TOP_DIRS
    )


def count_legacy_html() -> int:
    count = 0
    for p in REPO_ROOT.rglob("*.html"):
        if any(part in {"docs", "node_modules", ".git"} for part in p.parts):
            continue
        count += 1
    return count


def count_md_files(root: Path) -> int:
    if not root.exists():
        return 0
    return sum(1 for _ in root.rglob("*.md"))


def zh_md_counts() -> dict[str, int]:
    counts: dict[str, int] = {}
    if not ZH_DIR.exists():
        return counts
    for section in sorted(p for p in ZH_DIR.iterdir() if p.is_dir()):
        counts[section.name] = count_md_files(section)
    return counts


def referenced_media_dirs() -> set[str]:
    refs: set[str] = set()
    for md_file in DOCS_DIR.rglob("*.md"):
        text = md_file.read_text(encoding="utf-8", errors="ignore")
        for match in MEDIA_REF_RE.finditer(text):
            refs.add(match.group(1))
    return refs


def existing_media_dirs() -> set[str]:
    if not PUBLIC_MEDIA_DIR.exists():
        return set()
    return {p.name for p in PUBLIC_MEDIA_DIR.iterdir() if p.is_dir()}


def build_section_progress() -> list[SectionProgress]:
    counts = zh_md_counts()
    items: list[SectionProgress] = []
    for legacy_name, docs_slug in SECTION_MAP.items():
        items.append(
            SectionProgress(
                legacy_name=legacy_name,
                docs_slug=docs_slug,
                legacy_exists=(REPO_ROOT / legacy_name).exists(),
                md_count=counts.get(docs_slug, 0),
            )
        )
    return items


def render_report() -> str:
    now = datetime.now(timezone.utc).astimezone()
    top_dirs = list_top_level_dirs()

    total_docs_md = count_md_files(DOCS_DIR)
    total_zh_md = count_md_files(ZH_DIR)
    total_en_md = count_md_files(EN_DIR)
    legacy_html = count_legacy_html()

    refs = referenced_media_dirs()
    existing = existing_media_dirs()
    missing = sorted(refs - existing)

    section_items = build_section_progress()

    ready_sections = sum(1 for x in section_items if x.md_count > 1)
    total_sections = len(section_items)

    lines: list[str] = []
    lines.append("# 搬運進度報告（自動產生）")
    lines.append("")
    lines.append(f"> 產生時間：{now.strftime('%Y-%m-%d %H:%M:%S %z')}")
    lines.append("")
    lines.append("## 總覽")
    lines.append("")
    lines.append(f"- `docs/` Markdown 總數：**{total_docs_md}**")
    lines.append(f"- `docs/zh` Markdown：**{total_zh_md}**")
    lines.append(f"- `docs/en` Markdown：**{total_en_md}**")
    lines.append(f"- 舊站 HTML（docs 外）：**{legacy_html}**")
    lines.append(f"- 已有內容章節（md > 1）：**{ready_sections}/{total_sections}**")
    lines.append("")

    lines.append("## 章節對照（舊 -> 新）")
    lines.append("")
    lines.append("| 舊資料夾 | 新路徑 slug | 新站 md 數量 | 狀態 |")
    lines.append("|---|---|---:|---|")
    for item in section_items:
        status = "✅ 進行中" if item.md_count > 1 else "🟡 僅入口/待搬"
        if not item.legacy_exists:
            status = "⚪ 舊資料夾不存在"
        lines.append(
            f"| {item.legacy_name} | `{item.docs_slug}` | {item.md_count} | {status} |"
        )
    lines.append("")

    lines.append("## 媒體資源檢查（`/media/...`）")
    lines.append("")
    lines.append(f"- Markdown 內引用到的 media 子資料夾：**{len(refs)}**")
    lines.append(f"- `docs/public/media` 現有子資料夾：**{len(existing)}**")
    lines.append(f"- 缺少子資料夾：**{len(missing)}**")
    if missing:
        lines.append("")
        lines.append("### 缺少的 media 子資料夾")
        lines.append("")
        for name in missing:
            lines.append(f"- `{name}`")
    lines.append("")

    lines.append("## 倉庫頂層資料夾（排除 docs/node_modules/.git）")
    lines.append("")
    for name in top_dirs:
        lines.append(f"- `{name}`")
    lines.append("")

    lines.append("## 下一步建議")
    lines.append("")
    if missing:
        lines.append("1. 先補齊 `docs/public/media` 中缺少的資料夾與檔案。")
        lines.append("2. 逐章節把 `md` 從入口頁擴充為完整內容（優先不是 `cad-cam` 的章節）。")
        lines.append("3. 每次搬運後執行一次本腳本，更新本報告。")
        lines.append("4. 確認新站連結與圖片無誤後，再刪除舊站根目錄資料夾。")
    else:
        lines.append("1. 優先把非 `cad-cam` 章節由入口頁擴充為完整內容。")
        lines.append("2. 每次搬運後執行一次本腳本，更新本報告。")
        lines.append("3. 抽樣檢查圖片、PDF、影片連結是否正常。")
        lines.append("4. 確認新站內容齊全後，分批刪除舊站根目錄資料夾。")
    lines.append("")
    lines.append("---")
    lines.append("")
    lines.append("_此檔由 `tools/migration_progress.py` 產生，請勿手動長篇改寫。_")
    lines.append("")

    return "\n".join(lines)


def main() -> None:
    report = render_report()
    REPORT_PATH.write_text(report, encoding="utf-8")
    print(f"Updated: {REPORT_PATH}")


if __name__ == "__main__":
    main()
