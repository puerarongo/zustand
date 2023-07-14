const filterArr = (arr1: any, arr2: any) => {
  return arr1.filter((el: any) => !arr2.includes(el.id));
};

export default filterArr;
