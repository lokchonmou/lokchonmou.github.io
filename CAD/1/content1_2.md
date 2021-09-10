#2D constraints

Fusion360跟autocad/rhino等最大的分別，是它的特徵編輯性。相反，autocad和rhino是用座標系統去做編輯的。

舉一個例子，如果用autocad/rhino等，劃一條相切兩個圓的線，線的儲存方法是紀錄線段的頭尾兩點的座標，但如果兩個圓的尺寸和位置有所改變，**切線是不會跟著變的**。但特徵編輯軟件的特色，是更接近數學幾何的邏輯，切線是紀錄線的幾何特性是相切，所以即使圓的尺寸和座標變動，線段也會相切兩個圓。

[TOC]

## New Sketch

##2D constraints(約束)

以下是fusion360的2D constraints:

1. 