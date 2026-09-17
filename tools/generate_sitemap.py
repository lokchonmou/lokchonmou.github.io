#!/usr/bin/env python3
from __future__ import annotations

from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import quote
from xml.sax.saxutils import escape

SITE_URL = "https://lokchonmou.github.io"
DIST_DIR = Path("docs/.vitepress/dist")
OUTPUT_FILE = DIST_DIR / "sitemap.xml"
ALT_OUTPUT_FILE = DIST_DIR / "sitemap-main.xml"
SIMPLE_OUTPUT_FILE = DIST_DIR / "sitemap-simple.xml"


def url_for_html(html_file: Path) -> str:
    rel = html_file.relative_to(DIST_DIR)
    posix = rel.as_posix()

    if posix == "index.html":
        return f"{SITE_URL}/"

    if posix.endswith("/index.html"):
        route = posix[: -len("index.html")]
        path = f"/{route}"
        return f"{SITE_URL}{quote(path, safe='/-._~')}"

    route = posix[: -len(".html")]
    path = f"/{route}"
    return f"{SITE_URL}{quote(path, safe='/-._~')}"


def should_include(html_file: Path) -> bool:
    name = html_file.name.lower()
    if name == "404.html":
        return False
    return True


def lastmod_utc(path: Path) -> str:
    dt = datetime.fromtimestamp(path.stat().st_mtime, tz=timezone.utc)
    return dt.strftime("%Y-%m-%dT%H:%M:%SZ")


def main() -> None:
    if not DIST_DIR.exists():
        raise SystemExit(f"Build output not found: {DIST_DIR}")

    html_files = sorted(p for p in DIST_DIR.rglob("*.html") if should_include(p))

    lines: list[str] = [
        "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
        "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">",
    ]

    for html_file in html_files:
        loc = escape(url_for_html(html_file))
        lastmod = lastmod_utc(html_file)
        lines.append("  <url>")
        lines.append(f"    <loc>{loc}</loc>")
        lines.append(f"    <lastmod>{lastmod}</lastmod>")
        lines.append("  </url>")

    lines.append("</urlset>")
    content = "\n".join(lines) + "\n"
    OUTPUT_FILE.write_text(content, encoding="utf-8")
    ALT_OUTPUT_FILE.write_text(content, encoding="utf-8")

    simple_urls = [f"{SITE_URL}/", f"{SITE_URL}/zh/", f"{SITE_URL}/en/"]
    simple_lines: list[str] = [
        "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
        "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">",
    ]
    for url in simple_urls:
        simple_lines.append("  <url>")
        simple_lines.append(f"    <loc>{escape(url)}</loc>")
        simple_lines.append("  </url>")
    simple_lines.append("</urlset>")
    SIMPLE_OUTPUT_FILE.write_text("\n".join(simple_lines) + "\n", encoding="utf-8")

    print(
        f"Generated {OUTPUT_FILE}, {ALT_OUTPUT_FILE}, {SIMPLE_OUTPUT_FILE} "
        f"with {len(html_files)} URLs"
    )


if __name__ == "__main__":
    main()
