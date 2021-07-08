/*
 * @description: 对页面url中参数进行处理
 * @Author: OriX
 * @LastEditors: OriX
 */
import { useSearchParams, URLSearchParamsInit } from "react-router-dom";
import { useMemo } from "react";
import { cleanObj } from "utils";
// 返回页面url中指定键的参数值
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams] = useSearchParams();
  const setSearchParams = useSetUrlSearchParam();
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
    // 接收一个参数   该参数应该是一个对象 且key 必须在之前获取过的key
    (params: { [key in K]: unknown }) => {
      return setSearchParams(params);
    },
  ] as const;
};
// 设置参数hook
export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParam] = useSearchParams();
  return (params: { [key in string]: unknown }) => {
    //  合并参数集 并返回
    const o = cleanObj({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit;
    // 调用set方法 设置参数
    return setSearchParam(o);
  };
};
