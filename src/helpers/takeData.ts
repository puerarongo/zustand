const takeData = (arr: any, skip: number) => {
  const result = [];
  const take = 15;

  for (let i = 0; i < arr.length; i += 1) {
    if (result.length === take) break;
    if (i < skip) continue;
    result.push(arr[i]);
  }
  return result;
};

export default takeData;
