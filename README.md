# ETF 自由配
######  React.js Tailwind CSS Chart.js 

![](https://i.imgur.com/cKFLxfv.png)

![](https://i.imgur.com/PMpcwrR.png)

![](https://i.imgur.com/m7lyY36.png)



ETF 自由配為一款可以即時查尋台股
ETF股票即時報酬率及持股資訊的網站，提供使用者快速掌握ETF股票資訊並可加入會員進行收藏功能，此外也提供自組ETF功能，讓使用者能立即開始打造屬於自己的ETF。


本專案僅為個人專題及面試所開發的，沒有任何營利目的，資料來源為[富果股市API](https://developer.fugle.tw/)，對於任何因數據錯誤、資料不正確導致的損失，概不負責，投資一定有風險，股票投資有賺有賠，申購前應詳閱公開說明書！

## 功能 

* 提供自由打造台股上市櫃個股比例之ETF，計算出報酬率並與現有ETF比較。
* 提供台灣股市目前上市的ETF(僅包含台灣市場型)，約為30檔。
* 提供ETF五年內的投報率、前五大持股名單及產業占比。
* 提供輸入ETF股票代碼查詢、收藏功能

## Demo

1. 直接點選 [ETF自由配](https://kuominli.github.io/ETF-DIY-F2E/#/)
2. 下滑直接開始查詢市場ETF股票代碼
3. 加入會員享有自組ETF及收藏功能
4. 點選熱門選擇可立即得到組合配置
5. 點選績效比較查看自組與現有指數ETF報酬率差別

## 使用工具

* 使用 React 作為開發框架
* 使用 Tailwind CSS 作為CSS框架
* 使用 Chart.js / react-chartjs-2 作為圖表呈現
* 使用 Redux 作為全域變數管理
* 使用 SweetAlert2 作為提示訊息框



## 開發

### 下載
* 將其專案 clone到本地 
```
git clone git@github.com:KuoMinLi/ETF-DIY-F2E.git
```

* npm install 

### 環境變數

請在當前目錄下新增一個 .env 檔案，內容可以照這 .env.example 進行修改。
```
REACT_APP_API_KEY=xxxxxxxxxxxxxxxxxxxxx //需要在富果股市登入會員取得金鑰
```

### 啟動

* npm start
