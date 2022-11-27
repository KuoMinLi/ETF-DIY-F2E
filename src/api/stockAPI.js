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

// 定義一年的豪秒數
const ONEYEAR = 364 * 24 * 60 * 60 * 1000;

//取得目前時間
const nowDate = new Date().getTime();

// 富果API
const fugleAPI = axios.create({
  method: "get",
  baseURL: "https://api.fugle.tw/marketdata/v0.3/candles?",
  timeout: 5000,
  params: {
    fields: "open,high,low,close,volume,turnover,change",
    apiToken: process.env.REACT_APP_API_KEY,
  },
});

// 取得股票資料
// 因限制一次取得資料期間為 1年，所以要分批取得，預計取五年資料
// 同時要考量到股票上市日期，所以要確認取得的資料不會超過上市日期
export const fugleAPIGet1 = (userId) =>{
  return fugleAPI({
    params: {
      symbolId: userId,
      from: FormatDate(nowDate - ONEYEAR * 1),
      to: FormatDate(nowDate),
    },
  })
    .then((res) => res.data.candles)
    .catch((error) => console.log(error));
};

export const fugleAPIGet2 = (userId) =>{
  return fugleAPI({
    params: {
      symbolId: userId,
      from: FormatDate(nowDate - ONEYEAR * 2),
      to: FormatDate(nowDate - ONEYEAR * 1),
    },
  })
    .then((res) => res.data.candles)
    .catch((error) => console.log(error));
};

export const fugleAPIGet3 = (userId) =>{
  return fugleAPI({
    params: {
      symbolId: userId,
      from: FormatDate(nowDate - ONEYEAR * 3),
      to: FormatDate(nowDate - ONEYEAR * 2),
    },
  })
    .then((res) => res.data.candles)
    .catch((error) => console.log(error));
};

export const fugleAPIGet4 = (userId) =>{
  return fugleAPI({
    params: {
      symbolId: userId,
      from: FormatDate(nowDate - ONEYEAR * 4),
      to: FormatDate(nowDate - ONEYEAR * 3),
    },
  })
    .then((res) => res.data.candles)
    .catch((error) => console.log(error));
};

export const fugleAPIGet5 = (userId) => {
  return fugleAPI({
    params: {
      symbolId: userId,
      from: FormatDate(nowDate - ONEYEAR * 5),
      to: FormatDate(nowDate - ONEYEAR * 4),
    },
  })
    .then((res) => res.data.candles)
    .catch((error) => console.log(error));
}

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