import { fugleAPIGetOneMonth } from "../../api/stockAPI";


// data ={
//   [
//     category: "指數型",
//     code: "0050",
//     custodyFee: 0.035,
//     id: "637f480ec4df6de61315adf1",
//     managementFee: 0.32,
//     name: "元大台灣50",
//   ]
// }

const etfListAddRoR = async (data) => {

  if (!data) {
    return;
  }

  const ans = await Promise.all(
    data.map(async (item) => {

      const { code } = item;
      const allPrice = await fugleAPIGetOneMonth(code);

      // 計算漲跌幅
      const nowPrice = allPrice[0].close;
      let lastPrice = allPrice[19]?.close;
      // 為了避免因假日導致交易日少於20天，讓allPrice往下找，直到找到有值的為止
      let i = 19;
      while (lastPrice === undefined && i >= 0) {
        i--;
        lastPrice = allPrice[i]?.close;
      }

      if (nowPrice === null || lastPrice === null) {
        const changePercent = 0;
        return { ...item, changePercent };
      }

      const change = nowPrice - lastPrice;
      const changePercent = +((change / lastPrice) * 100).toFixed(2);
      return { ...item, changePercent };
    })
  );
  return ans;
};

export default etfListAddRoR;