const filterDate = (Array) => {
  
  // 將陣列長度最短的排在前面
  Array.sort((a, b) => a.length - b.length);

  // 找出多出的日期並去除
  const shortETF = Array[0];
  for (let i = 1; i < Array.length; i++) {
    const longETF = Array[i];
    const shortETFDate = [...shortETF].map((item) => item.date);
    const longETFDate = [...longETF].map((item) => item.date);
    const diffDate = longETFDate.filter((item) => !shortETFDate.includes(item));
    diffDate.forEach((item) => {
      longETF.splice(
        longETF.findIndex((index) => index.date === item),
        1
      );
    });
  }

  return Array;
};

export default filterDate;
