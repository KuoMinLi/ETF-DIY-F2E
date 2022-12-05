import { useEffect, useState } from "react";
import { apiDIYGet } from "../../api/diyAPI";



const DiyItem = (userId , token) => {

  console.log(userId ,token);
  let ans = [1,2];
  (async () => {
    
    try {
      const ETFData = await apiDIYGet(token);
      const ETFDataFilter = ETFData.data.filter((item) => item._id === userId)[0];
      console.log(12,ETFDataFilter);
      const ETFDataFilterData = ETFDataFilter.data;
      ans = ETFDataFilterData;
    } catch (error) {
      console.log(error);
    }
  })();
  return ans;
};

      

export default DiyItem;
