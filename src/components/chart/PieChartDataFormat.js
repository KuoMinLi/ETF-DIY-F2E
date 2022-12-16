import { codeNameData } from "../../data/codeNameData";

const pieChartDataFormat = (ETFData) => {
    const { content } = ETFData;
    // 避免資料還沒回來就先render
    if (!content) {
      return content;
    }

    // 將content的資料加上產業類別
    const contentData = content.map((item) => {
      const industry = codeNameData.filter(
        (i) => i.code === parseInt(item.code)
      )[0].industry;
      return { ...item, industry };
    });

    // 將產業類別分類
    const contentRatio = contentData.reduce((acc, cur) => {
      if (!acc[cur.industry]) {
        acc[cur.industry] = cur.percentage;
      } else {
        acc[cur.industry] += cur.percentage;
      }
      return acc;
    }, {});

    // 將產業類別轉成pieChart需要的格式
    const pieChartData = Object.keys(contentRatio).map((item) => {
      return { name: item, value: contentRatio[item] };
    });
    pieChartData.sort((a, b) => b.value - a.value);

    // 只取前五名
    const top5 = pieChartData.slice(0, 5);
    return top5;
};

export default pieChartDataFormat;
