/*
 * @Description: 工具模块
 * @Author: OriX
 * @LastEditors: OriX
 */
export const isFalse = (value) => (value === 0 ? false : !value);
export const cleanObj = (detailObj) => {
  const cloneObj = { ...detailObj };
  Object.keys(cloneObj).map((key) => {
    const value = cloneObj[key];
    if (isFalse(value)) {
      delete cloneObj[key];
    }
  });
  return cloneObj;
};
