// data = [{
//   "date": "2017-11-27",
//   "open": 85.15,
//   "high": 85.15,
//   "low": 84.1,
//   "close": 84.15,
//   "volume": 2127304,
//   "turnover": 179561728,
//   "change": -1
// }]

const periodRoR = (data) => {
  const totalDays = data.length;
  const period = [
    { name: "五年", daysToSubtract: 1200 },
    { name: "三年", daysToSubtract: 960 },
    { name: "一年", daysToSubtract: 240 },
    { name: "半年", daysToSubtract: 120 },
    { name: "一個月", daysToSubtract: 20 },
  ];

  // 當數據未取得時，會出現NaN，所以要先判斷
  if (data.length === 0) {
    return period.map((item) => ({
      ...item,
      data: 0,
    }));
  }

  return period.map((item) => {
    // 若數據不足，則回傳尚未上市
    if (totalDays - item.daysToSubtract < 0) {
      return {
        ...item,
        data: "尚未上市",
      };
    }

    // 這邊要注意，因為data是倒著排的，所以要用totalDays - daysToSubtract
    const daysBeforeNow = totalDays - item.daysToSubtract;

    const closePrice = data[daysBeforeNow].close;
    const todayClosePrice = data.slice(-1)[0].close;

    const earn = todayClosePrice - closePrice;
    const rateOfReturn = earn / closePrice;

    return {
      ...item,
      // format ror to 2 decimal percentage
      data: (rateOfReturn * 100).toFixed(2) || 0,
    };
  });
};

export default periodRoR;
