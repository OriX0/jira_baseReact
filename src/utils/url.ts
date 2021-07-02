/*
 * @description: 对页面url中参数进行处理
 * @Author: OriX
 * @LastEditors: OriX
 */
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
// 返回页面url中指定键的参数值
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return [
    useMemo(
      // 遍历传入的key
      () =>
        keys.reduce((prev, curKey) => {
          // 拼接成对象返回
          return { ...prev, [curKey]: searchParams.get(curKey) || "" };
        }, {} as { [key in K]: string }), //初始值 进行状态定义
      /* eslint-disable react-hooks/exhaustive-deps */
      [searchParams] // 根据searchParams这个状态去判断是否改变及更新
    ),
    setSearchParams, // 将set方法返回
  ] as const;
};
