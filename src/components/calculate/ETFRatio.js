import { useMemo } from "react";

const ETFRatio = (ETFData) => {
  
  const ETFRatioData = useMemo(() => {
    const { content } = ETFData;
    
    // 避免資料還沒回來就先render
    if (!content) {
      return ;
    }
    if (content.length < 6) {
      return content;
    }
    const top5 = content.slice(0, 5);
    const otherPercentage = content.slice(5).reduce((acc, cur) => {
      return acc + cur.percentage;
    }, 0);
    const other = {
      name: "其他",
      percentage: otherPercentage.toFixed(2),
    };

    const ans = [...top5, other];
    return ans;
  }, [ETFData]);

  return ETFRatioData;
};

export default ETFRatio;