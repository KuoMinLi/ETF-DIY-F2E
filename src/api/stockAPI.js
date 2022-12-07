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

// 定義一個月的豪秒數
const ONEMONTH = 30 * 24 * 60 * 60 * 1000;

//取得目前時間
const nowDate = new Date().getTime();

// 富果API
const fugleAPI = axios.create({
  method: "get",
  baseURL: "https://api.fugle.tw/marketdata/v0.3/candles?",
  timeout: 15000,
  params: {
    fields: "open,high,low,close,volume,turnover,change",
    apiToken: process.env.REACT_APP_API_KEY,
  },
});

// 將日期及股票代碼轉換成API格式
const fugleAPIGet = (userId, from, to) => {
  return fugleAPI({
    params: {
      symbolId: userId,
      from,
      to,
    },
  })
    .then((res) => res.data.candles)
    .catch((error) => console.log(error));
};

//  取得股票資料-一個月
export const fugleAPIGetOneMonth = (userId) => {
  return fugleAPIGet(
    userId,
    FormatDate(nowDate - ONEMONTH),
    FormatDate(nowDate)
  );
};

//  取得股票資料-一年
export const fugleAPIGetOneYear = (userId) => {
  return fugleAPIGet(
    userId,
    FormatDate(nowDate - ONEYEAR),
    FormatDate(nowDate)
  );
};


// 取得股票資料
// 因限制一次取得資料期間為 1年，所以要分批取得，預計取五年資料
// 同時要考量到股票上市日期，所以要確認取得的資料不會超過上市日期

// 一次取得五年資料
export const fugleAPIGetFiveYear = async (userId) => {
  let ans = [];
  for (let i = 1; i < 6; i++) {
    const formDate = FormatDate(nowDate - i * ONEYEAR);
    const toDate = FormatDate(nowDate - (i - 1) * ONEYEAR);
    const data = await fugleAPIGet(
      userId, formDate, toDate
    );
    // 確認取得的資料有滿一年，沒有則先加入後跳出迴圈
    if (data.length > 240) {
      ans = [...ans, ...data];
    } else {
      ans = [...ans, ...data];
      break;
    }
  }
  return ans;
};
