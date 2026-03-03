# 遷移任務清單（給你 / 下一手 AI）

> 使用方式：每完成一項就打勾，完成後執行 `python3 tools/migration_progress.py` 更新進度。

## 每次搬運後固定流程

1. 搬運內容（`docs/zh/*.md` + `docs/public/media/...`）
2. 執行：`python3 tools/migration_progress.py`
3. 檢查 `docs/MIGRATION-PROGRESS.md` 有反映最新數字
4. 在本檔勾選已完成任務
5. commit + push 到 `LCM-STUDIO-2.0`

> 備註：`docs/MIGRATION-PROGRESS.md` 是自動報告，不建議手動改；本檔才是手動任務追蹤。

## A. 內容搬運

- [ ] `arduino-processing`：由入口頁擴充成完整章節
- [ ] `esp32-vibe-coding`：由入口頁擴充成完整章節
- [ ] `game-coding`：由入口頁擴充成完整章節
- [ ] `geometry-construction`：由入口頁擴充成完整章節
- [ ] `interactive-lab`：由入口頁擴充成完整章節
- [ ] `math-robotics`：由入口頁擴充成完整章節
- [ ] `private-research`：由入口頁擴充成完整章節
- [ ] `processing`：由入口頁擴充成完整章節
- [ ] `projects`：由入口頁擴充成完整章節

## B. 媒體資源

- [ ] 檢查所有 `/media/...` 引用是否存在於 `docs/public/media/...`
- [ ] 缺漏的資料夾與檔案補齊
- [ ] 404 圖片/附件連結清零

## C. 導覽與路徑

- [ ] `docs/zh/index.md` 首頁卡片連結全部驗證
- [ ] 中英頁面互跳（`/zh/`、`/en/`）驗證
- [ ] 舊站必要入口（如舊版連結）保留

## D. 部署與驗收

- [ ] push 到 `LCM-STUDIO-2.0` 後 Actions 成功
- [ ] 線上首頁與章節頁正常載入
- [ ] 手機與平板版面檢查

## E. 最終清理（全部搬完才做）

- [ ] 確認舊資料夾內容已遷移到 `docs/` / `docs/public/`
- [ ] 刪除根目錄舊站資料夾（逐批、可回滾）
- [ ] 保留最小必要結構（`.github`、`docs`、`package*.json`、`.gitignore`、`README.md`）
