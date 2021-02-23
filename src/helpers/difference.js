const difference = (obj1, obj2) => {
  let keyFound = false;
  Object.keys(obj1).forEach((key) => {
    if (obj1[key] !== obj2[key]) {
      return (keyFound = key);
    }
  });
  return keyFound || -1;
};

export default difference;
