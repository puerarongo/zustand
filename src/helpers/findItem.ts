const findItem = (arr: any, id: string) => {
  const foundItem = arr.find((el: any) => el.id === Number(id));
  return foundItem;
};

export default findItem;
