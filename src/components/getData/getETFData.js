import { fugleAPIGetFiveYear } from "../../api/stockAPI";
import { getETFListByCode } from "../../api/etfAPI";
import { codeNameData } from "../../data/codeNameData";


const getETFData = (etfId) => {

  const ans = (async () => {
    try {
      const resultAll = await fugleAPIGetFiveYear(etfId);
      const itemName = codeNameData.filter((item) => item.code === etfId)[0]
        ?.name;
      const ETFResult = await getETFListByCode(etfId);
      const ETFResultData = ETFResult.data[0];
      return {ETFResultData, resultAll, itemName};
    } catch (error) {
      console.log(error);
    }
  })();
  return ans;
}

export default getETFData;