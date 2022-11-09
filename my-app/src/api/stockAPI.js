import axios from "axios";

//處理日期格式
const FormatDate = (date) => {
  const reformatDate = new Intl.DateTimeFormat("nu", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(date)
    .split("/")
    .join("-");
  return reformatDate;
};

//取得目前時間
const nowDate = new Date().getTime();

// 富果API
const fugleAPI = axios.create({
  baseURL: "https://api.fugle.tw/marketdata/v0.3/candles?",
  timeout: 5000,
  params: {
    fields: "open,high,low,close,volume,turnover,change",
    apiToken: process.env.REACT_APP_API_KEY,
  },
});

// 取得股票資料
// 因限制一次取得資料期間為 1年，所以要分批取得，預計取五年資料
export const fugleAPIGet1 = (userId) =>
  fugleAPI({
    method: "get",
    params: {
      symbolId: userId,
      from: FormatDate(nowDate - 364 * 24 * 60 * 60 * 1000),
      to: FormatDate(nowDate),
    },
  })
    .then((res) => res.data.candles)
    .catch((error) => console.log(error));

export const fugleAPIGet2 = (userId) =>
  fugleAPI({
    method: "get",
    params: {
      symbolId: userId,
      from: FormatDate(nowDate - 728 * 24 * 60 * 60 * 1000),
      to: FormatDate(nowDate - 364 * 24 * 60 * 60 * 1000),
    },
  })
    .then((res) => res.data.candles)
    .catch((error) => console.log(error));

export const fugleAPIGet3 = (userId) =>
  fugleAPI({
    method: "get",
    params: {
      symbolId: userId,
      from: FormatDate(nowDate - 1092 * 24 * 60 * 60 * 1000),
      to: FormatDate(nowDate - 728 * 24 * 60 * 60 * 1000),
    },
  })
    .then((res) => res.data.candles)
    .catch((error) => console.log(error));
    
export const fugleAPIGet4 = (userId) =>
  fugleAPI({
    method: "get",
    params: {
      symbolId: userId,
      from: FormatDate(nowDate - 1456 * 24 * 60 * 60 * 1000),
      to: FormatDate(nowDate - 1092 * 24 * 60 * 60 * 1000),
    },
  })
    .then((res) => res.data.candles)
    .catch((error) => console.log(error));
    
export const fugleAPIGet5 = (userId) => 
  fugleAPI({
    method: "get",
    params: {
      symbolId: userId,
      from: FormatDate(nowDate - 1820 * 24 * 60 * 60 * 1000),
      to: FormatDate(nowDate - 1456 * 24 * 60 * 60 * 1000),
    },
  })
    .then((res) => res.data.candles)
    .catch((error) => console.log(error));

// 一次取得五年資料
export const fugleAPIGetFiveYear = (userId) => {
  return Promise.all([
    fugleAPIGet1(userId),
    fugleAPIGet2(userId),
    fugleAPIGet3(userId),
    fugleAPIGet4(userId),
    fugleAPIGet5(userId),
  ]);
};