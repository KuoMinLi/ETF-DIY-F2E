import { apiDIYGet } from "../../api/diyAPI";
import { fugleAPIGetFiveYear } from "../../api/stockAPI";

const DiyItem = async (etfId, token) => {
  const diyAllData = await apiDIYGet(token);
  const diyData = diyAllData.data.filter((item) => item._id === etfId)[0];

  const ETFTotalPrice = await Promise.all(
    diyData.content.map(async (item) => {
      const { code, percentage } = item;
      const itemPrice = await fugleAPIGetFiveYear(code);
      const calPrice = itemPrice.map((item) => {
        const { close, date } = item;
        return {
          date,
          cal: (close * percentage) / 100,
        };
      });
      return calPrice;
    })
  );

  // 將陣列長度最短的排在前面
  ETFTotalPrice.sort((a, b) => a.length - b.length);

  // 找出多出的日期並去除
  const shortETF = ETFTotalPrice[0];
  for (let i = 1; i < ETFTotalPrice.length; i++) {
    const longETF = ETFTotalPrice[i];
    const shortETFDate = [...shortETF].map((item) => item.date);
    const longETFDate = [...longETF].map((item) => item.date);
    const diffDate = longETFDate.filter((item) => !shortETFDate.includes(item));
    diffDate.forEach((item) => {
      longETF.splice(longETF.findIndex((index) => index.date === item), 1);
    });
  }
  
  // 將陣列中依日期的股價累加
  const ETFAvgPrice = ETFTotalPrice.reduce((acc, cur) => {
    cur.forEach((item) => {
      if (!acc[item.date]) {
        acc[item.date] = item.cal;
      } else {
        acc[item.date] += item.cal;
      }
    });
    return acc;
  }, {});

  // 將物件轉為陣列
  const ETFAvgPriceArr = Object.entries(ETFAvgPrice).map((item) => {
    return {
      date: item[0],
      close: item[1],
    };
  });

  //因個股可能有停止交易原因，故須將極端值去除
  for (let i = 0; i < ETFAvgPriceArr.length; i++) {
    if (
      ((ETFAvgPriceArr[i]?.close - ETFAvgPriceArr[i + 1]?.close) /
        ETFAvgPriceArr[i+1]?.close >
        0.2)
    ) {
      ETFAvgPriceArr.splice(i+1, 1);
    }

    if (
      ((ETFAvgPriceArr[i]?.close - ETFAvgPriceArr[i + 1]?.close) /
        ETFAvgPriceArr[i + 1]?.close <
        -0.2)
    ) {
      ETFAvgPriceArr.splice(i+1, 1);
    }
  }

  return {
    diyData,
    ETFAvgPriceArr,
  };
};

export default DiyItem;
