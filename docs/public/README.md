# docs/public usage

Place legacy static files here when preparing cutover.

Everything in this directory is copied as-is to the output root (`.vitepress/dist`).

For preview without replacing VitePress root pages yet, place legacy files under `docs/public/legacy` so they are served at `/legacy/...`.

If you are ready for full cutover, you can map old paths directly by placing files at their original paths under `docs/public`.
