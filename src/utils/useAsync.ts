/*
 * @Description:  异步的统一处理hook
 * @Author: OriX
 * @LastEditors: OriX
 */
import { useState } from "react";
// 1.先定义接口类型
interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "success";
}
// 2.定义默认状态
const defaultInitState: State<null> = {
  stat: "idle",
  error: null,
  data: null,
};
// 3.定义customerHook
export const useAsync = <D>(initialState?: State<D>) => {
  // 初始化状态
  const [state, setState] = useState<State<D>>({
    ...defaultInitState,
    ...initialState,
  });
  // 定义内部关于各个状态的处理函数
  const setData = (data: D) =>
    setState({
      data,
      stat: "success",
      error: null,
    });
  const setError = (error: Error) =>
    setState({
      error,
      stat: "error",
      data: null,
    });
  // 定义主执行函数 run
  const run = (promise: Promise<D>) => {
    // 判断参数是否为promise类型
    if (!promise || !promise.then) {
      throw new Error("请传入Promise类型的数据");
    }
    // 设置当前状态为 loading
    setState({ ...state, stat: "loading" });
    // 进行处理
    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((error) => {
        setError(error);
        return error;
      });
  };
  return {
    // 返回状态标识
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    // 返回处理函数
    run,
    setData,
    setError,
    // 返回当前状态
    ...state,
  };
};
