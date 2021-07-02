/*
 * @Description: 工具模块
 * @Author: OriX
 * @LastEditors: OriX
 */
import { useState, useEffect, useRef } from "react";
export const isFalse = (value: unknown) => (value === 0 ? false : !value);
export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";
export const cleanObj = (detailObj: { [key: string]: unknown }) => {
  const cloneObj = { ...detailObj };
  Object.keys(cloneObj).forEach((key) => {
    const value = cloneObj[key];
    if (isFalse(value)) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
/**
 * 防抖hook
 * @param {Any} value 要进行监测的值
 * @param {Number} delay 监测延迟
 * @returns
 */
export const useDebounce = <V>(value: V, delay?: number): V => {
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

export const useArray = <A>(initArray: A[]) => {
  const [value, setValue] = useState(initArray);
  const add = (addValue: A) => {
    setValue([...value, addValue]);
  };
  return {
    value,
    setValue,
    clear: () => {
      setValue([]);
    },
    removeIndex: (index: number) => {
      const copy = [...value];
      copy.splice(index, 1);
      setValue(copy);
    },
    add,
  };
};

/**
 * @param title 标题
 * @param keepOnUnMount 组件卸载时是否还继续保持该标题
 */
// 自定义hook  设置title 及设置当前组件写在后是否保持该title
export const useDocumentTitle = (title: string, keepOnUnMount: boolean) => {
  // 页面加载时  oldTitle = 旧 title 即index.html中设置的title
  const oldTitle = useRef(document.title).current;
  console.log(oldTitle);
  // 加载完成 二次获取
  // 当外部调用该hook 更改 document.title
  useEffect(() => {
    document.title = title;
  }, [title]);
  // componentWillUnMount
  useEffect(() => {
    return () => {
      if (!keepOnUnMount) {
        document.title = oldTitle;
      }
    };
  }, [keepOnUnMount, oldTitle]);
};

export const toOriginRouter = () =>
  (window.location.href = window.location.origin);
