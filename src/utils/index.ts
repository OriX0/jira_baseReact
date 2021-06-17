/*
 * @Description: 工具模块
 * @Author: OriX
 * @LastEditors: OriX
 */
import { useState, useEffect } from "react";
export const isFalse = (value: unknown) => (value === 0 ? false : !value);
export const cleanObj = (detailObj: object) => {
  const cloneObj = { ...detailObj };
  Object.keys(cloneObj).map((key) => {
    // @ts-ignore
    const value = cloneObj[key];
    if (isFalse(value)) {
      // @ts-ignore
      delete cloneObj[key];
    }
  });
  return cloneObj;
};
/**
 * 每次组件渲染 只运行一次
 * @param {Function} callback 回调执行函数
 */
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};
/**
 * 防抖hook
 * @param {Any} value 要进行监测的值
 * @param {Number} delay 监测延迟
 * @returns
 */
export const useDebounce = (value: unknown, delay?: number): any => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    // 每次value改变的时候  就设置一个定时器  当定时器走完 设置debounce值
    const timeout = setTimeout(() => setDebounceValue(value), delay);
    // 返回一个函数 如果上一个useEffect运行完了 且再次调用该函数 则会清理上一个timeout
    return () => clearTimeout(timeout);
  }, [value, delay]);
  // 最终未被清理掉的值就是返回的值
  return debounceValue;
};
