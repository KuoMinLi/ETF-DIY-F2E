import axios from "axios";


// 富果API
const fugleAPI = axios.create({
  baseURL: "https://api.fugle.tw/marketdata/v0.3/candles?",
  timeout: 5000,
  params: {
    fields: "open,high,low,close,volume,turnover,change",
    apiToken: process.env.REACT_APP_API_KEY
  },
});


// 取得股票資料
export const fugleAPIGetAll = (config) => fugleAPI(config);