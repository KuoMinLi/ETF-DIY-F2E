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
        ETFAvgPriceArr[i]?.close >
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
