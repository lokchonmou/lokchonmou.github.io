#!/usr/bin/env python3
from __future__ import annotations

import argparse
import re
import shutil
from pathlib import Path
from urllib.parse import urlsplit, urlunsplit

IMAGE_EXTENSIONS = {
    '.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.bmp', '.tif', '.tiff', '.avif'
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description='Migrate one chapter folder: copy assets to docs/public/media/<chapter>, copy md files to destination, and rewrite image links.'
    )
    parser.add_argument('--source', required=True, help='Source chapter folder path')
    parser.add_argument('--md-dest', required=True, help='Destination folder for markdown files')
    parser.add_argument(
        '--chapter-name',
        default=None,
        help='Override chapter folder name used under docs/public/media (default: basename of source)'
    )
    parser.add_argument(
        '--url-prefix',
        default='/media',
        help='Public URL prefix used inside markdown (default: /media)'
    )
    return parser.parse_args()


def is_external_link(link: str) -> bool:
    lowered = link.lower()
    return (
        lowered.startswith('http://')
        or lowered.startswith('https://')
        or lowered.startswith('data:')
        or lowered.startswith('mailto:')
        or lowered.startswith('tel:')
        or lowered.startswith('#')
    )


def is_image_path(path_value: str) -> bool:
    return Path(path_value).suffix.lower() in IMAGE_EXTENSIONS


def normalized_url_prefix(prefix: str) -> str:
    value = prefix.strip()
    if not value:
        return '/media'
    if not value.startswith('/'):
        value = '/' + value
    return value.rstrip('/')


def rewrite_image_link(raw_link: str, md_source_dir: Path, source_root: Path, chapter_name: str, url_prefix: str) -> str:
    parts = urlsplit(raw_link)
    link_path = parts.path

    if not link_path or is_external_link(raw_link):
        return raw_link

    if not is_image_path(link_path):
        return raw_link

    if link_path.startswith('/'):
        if link_path.startswith('/media/'):
            return raw_link
        if link_path.startswith('/docs/public/media/'):
            converted = link_path.replace('/docs/public/media/', '/media/', 1)
            return urlunsplit((parts.scheme, parts.netloc, converted, parts.query, parts.fragment))
        return raw_link

    resolved = (md_source_dir / link_path).resolve()
    try:
        rel = resolved.relative_to(source_root.resolve())
    except ValueError:
        return raw_link

    new_path = f"{url_prefix}/{chapter_name}/{rel.as_posix()}"
    return urlunsplit((parts.scheme, parts.netloc, new_path, parts.query, parts.fragment))


def rewrite_markdown_images(content: str, md_source_dir: Path, source_root: Path, chapter_name: str, url_prefix: str) -> str:
    md_image_pattern = re.compile(r'!\[([^\]]*)\]\(([^)\s]+)(\s+"[^"]*")?\)')
    html_img_pattern = re.compile(r'(<img\b[^>]*\bsrc=["\'])([^"\']+)(["\'][^>]*>)', re.IGNORECASE)

    def replace_md(match: re.Match[str]) -> str:
        alt_text = match.group(1)
        link = match.group(2)
        title_part = match.group(3) or ''
        new_link = rewrite_image_link(link, md_source_dir, source_root, chapter_name, url_prefix)
        return f'![{alt_text}]({new_link}{title_part})'

    def replace_html(match: re.Match[str]) -> str:
        prefix = match.group(1)
        link = match.group(2)
        suffix = match.group(3)
        new_link = rewrite_image_link(link, md_source_dir, source_root, chapter_name, url_prefix)
        return f'{prefix}{new_link}{suffix}'

    content = md_image_pattern.sub(replace_md, content)
    content = html_img_pattern.sub(replace_html, content)
    return content


def copy_assets(source_root: Path, media_dest_root: Path) -> int:
    copied = 0
    for path in source_root.rglob('*'):
        if not path.is_file():
            continue
        if path.suffix.lower() in {'.md', '.markdown', '.html', '.htm'}:
            continue

        relative_path = path.relative_to(source_root)
        target = media_dest_root / relative_path
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(path, target)
        copied += 1
    return copied


def copy_and_rewrite_markdowns(source_root: Path, md_dest_root: Path, chapter_name: str, url_prefix: str) -> int:
    copied = 0
    for path in source_root.rglob('*'):
        if not path.is_file() or path.suffix.lower() not in {'.md', '.markdown'}:
            continue

        relative_path = path.relative_to(source_root)
        target = md_dest_root / relative_path
        target.parent.mkdir(parents=True, exist_ok=True)

        raw = path.read_text(encoding='utf-8')
        rewritten = rewrite_markdown_images(raw, path.parent, source_root, chapter_name, url_prefix)
        target.write_text(rewritten, encoding='utf-8')
        copied += 1
    return copied


def main() -> None:
    args = parse_args()

    source_root = Path(args.source).expanduser().resolve()
    md_dest_root = Path(args.md_dest).expanduser().resolve()

    if not source_root.exists() or not source_root.is_dir():
        raise SystemExit(f'[error] source folder not found: {source_root}')

    chapter_name = args.chapter_name or source_root.name
    url_prefix = normalized_url_prefix(args.url_prefix)

    script_root = Path(__file__).resolve().parent.parent
    media_dest_root = script_root / 'docs' / 'public' / 'media' / chapter_name
    media_dest_root.mkdir(parents=True, exist_ok=True)
    md_dest_root.mkdir(parents=True, exist_ok=True)

    asset_count = copy_assets(source_root, media_dest_root)
    md_count = copy_and_rewrite_markdowns(source_root, md_dest_root, chapter_name, url_prefix)

    print(f'[done] source: {source_root}')
    print(f'[done] media copied: {asset_count} files -> {media_dest_root}')
    print(f'[done] markdown copied: {md_count} files -> {md_dest_root}')
    print(f'[done] image url prefix: {url_prefix}/{chapter_name}/...')


if __name__ == '__main__':
    main()
