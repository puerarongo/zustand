function uniqueObjects(array: any) {
  const uniqueObjects: any = [];

  array.forEach((obj: any) => {
    const objExist = uniqueObjects.some((el: any) => {
      return JSON.stringify(el) === JSON.stringify(obj);
    });

    if (!objExist) {
      uniqueObjects.push(obj);
    }
  });

  return uniqueObjects;
}

export default uniqueObjects;
