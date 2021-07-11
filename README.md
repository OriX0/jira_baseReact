## jira

### 整体功能

#### 登录模块

- 依据登录状态 将整个 app 分为 登录 app 和非登录 app
- 样式---antd 样式进行二次修改
- 登录鉴权---jwt token
- 前端用户鉴权---基于 React 的 context 对登录相关方法进行二次封装并将用户数据向下传递

#### 项目列表模块

- 路由管理---react-router@6.0
- 参数管理---基于 react-router 的 useSearchParams hook 进行二次封装

### 自定义 hook

#### 用户鉴权 hook

##### 实现流程

1. 创建 HOC context.Provider
   1. 调用各个方法后对当前登录用户信息的改变
   2. 接收子组件
   3. 将各类方法及 储存用户信息的值 通过 props 传递下去
2. 使用 useContext hook 读取上下文环境 并返回出去

#### 异步处理的 hook--核心

##### 实现流程

1. 定义默认状态和流程
2. 基于 useReudcer 初始化状态（默认状态和接收状态）
3. 初始化配置及刷新函数
4. 定义内部各个状态处理函数
   1. 请求成功 设置数据
   2. 请求失败 设置错误
   3. 主执行函数
      1. 判断传入的是否为 promise 类型
      2. 判断并设置刷新函数
      3. 设置当前状态
      4. 基于 promise 进行处理 设置数据和错误
5. 将各个函数及 状态返回

##### 实例

```tsx
import { useCallback, useState, useReducer } from "react";
import { useMountedRef } from "utils";
// ts--先定义接口类型
interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "success";
}
// 1.1-定义默认状态
const defaultInitState: State<null> = {
  stat: "idle",
  error: null,
  data: null,
};
// 1.2-定义默认配置
const defaultConfig = {
  throwOnError: false,
};
//1.3 工具函数--- 将dispatch 和 useMounter 结合
const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef();
  return useCallback(
    (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),
    [dispatch, mountedRef]
  );
};

// 异步处理hook
export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  // 2.1初始化状态
  const [state, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }),
    {
      ...defaultInitState,
      ...initialState,
    }
  );
  // 2.2初始化配置
  const config = { ...defaultConfig, ...initialConfig };
  // 状态 ---刷新函数 及 设置刷新函数   使用
  const [retry, setRetry] = useState(() => () => {});
  // 使用safe dispatch
  const safeDispatch = useSafeDispatch(dispatch);
  // 定义内部关于各个状态的处理函数 用useCallback对 返回值为函数的进行包裹
  const setData = useCallback(
    (data: D) =>
      safeDispatch({
        data,
        stat: "success",
        error: null,
      }),
    [safeDispatch]
  );
  const setError = useCallback(
    (error: Error) =>
      safeDispatch({
        error,
        stat: "error",
        data: null,
      }),
    [safeDispatch]
  );
  // 定义主执行函数 run
  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      // 判断参数是否为promise类型
      if (!promise || !promise.then) {
        throw new Error("请传入Promise类型的数据");
      }
      // 设置 retry函数
      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig.retry(), runConfig);
        }
      });
      // 设置当前状态为 loading
      // useCallback 里面使用setState直接赋值 会触犯无限渲染 应该使用函数式
      // setState({ ...state, stat: "loading" });
      safeDispatch({ stat: "loading" });
      // 进行处理
      return promise
        .then((data) => {
          setData(data);
          return data;
        })
        .catch((error) => {
          setError(error);
          if (config.throwOnError) {
            return Promise.reject(error);
          } else {
            return error;
          }
        });
    },
    [config.throwOnError, setData, setError, safeDispatch]
  );
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
    // 将retry函数返回 以便外部调用
    retry,
    // 返回当前状态
    ...state,
  };
};
```

#### http 请求 hook

##### 流程

1. 从 useAuth 中获取到用户的 token

2. 将用户的 token 附带其他请求参数发送给 http 方法

###### http 方法

      1. 接受url 和请求配置
      2. 如果请求是get请求 则进行url拼接
      3. 基于jwt验证规则 设置header
      4. 发送请求
      5. 返回值处理
               1. 如果是401 则跳转到登录页

#### url 参数 hook

##### 获取参数

```tsx
useMemo(
      // 遍历传入的key
      () =>
        keys.reduce((prev, curKey) => {
          // 拼接成对象返回
          return { ...prev, [curKey]: searchParams.get(curKey) || "" };
        }, {} as { [key in K]: string }), //初始值 进行状态定义
      /* eslint-disable react-hooks/exhaustive-deps */
      [searchParams] // 根据searchParams这个状态去判断是否改变及更新
```

##### 设置参数

```tsx
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
```

#### 工具--检查组件的挂载状态

##### 使用场景

避免在请求同时组件已经被渲染了，等到数据返回后的错误挂载

##### 实现原理

- 使用 useRef 缓存一个值 记录当前是否加载完毕
- 使用 useEffect 模拟生命周期
  - 当加载完成 设置 记录值为 true
  - 当被写在后 设置 记录值为 false
- 返回 该缓存值

```ts
export const useMountedRef = () => {
  const mountedRef = useRef(false);
  useEffect(() => {
    // 加载完了
    mountedRef.current = true;
    // 卸载
    return () => {
      mountedRef.current = false;
    };
  });
  return mountedRef;
};
```

#### 工具--乐观更新 hook

##### 应用场景

逻辑确定且逻辑相对简单的修改请求时，可使用乐观更新，让整体的项目交互更加流畅。

##### 实现原理

- 将改变前的值进行缓存

- 定义页面改变时候的回调函数

  - 先基于逻辑对页面逻辑进行更新

- 定义 请求 成功和失败的回调

  - 成功 用新值替换

  - 失败 用旧值替换

##### 基于 react-query 实现

```tsx
export const useConfig = (
  queryKey: QueryKey, // 查询关键词
  callback: (target: any, old?: any[]) => any[] // 改变数据时候的回调函数
) => {
  // 1.建立数据缓存的容器 这里是react-query的链接
  const queryClient = useQueryClient();
  return {
    // 3.1请求成功的回调 就把缓存中的key对应值遗忘 用新的值替代
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    // 2.定义数据改变时候的方法
    async onMutate(target: any) {
      // 1.先获取缓存数据
      const previousItems = queryClient.getQueryData(queryKey);
      // 2.调用callback 基于旧数据更新缓存数据
      queryClient.setQueryData(queryKey, (old?: any[]) => {
        return callback(target, old);
      });
      // 3.将原先的缓存数据先返回出去
      return { previousItems };
    },
    // 3.2 请求失败的回调 如果请求失败就把 从上下文中获取原先的数据设置回去
    onError(error: any, newItem: any, context: any) {
      queryClient.setQueryData(queryKey, context.previousItems);
    },
  };
};
```

### 报错或警告解决方案

#### a 标签提示必须有 href 属性

##### 解决方案

###### 用 antd 相应组件替代

用 antd 的 Button 组件代替 `type={link} <Button type={"link"} onClick={事件}>文字</Button>`

#### redux 报错

##### 错误信息

```js
Error: could not find react-redux context value; please ensure the component is wrapped in a <Provider>
```

##### 解决方案

redux 原理也是 context 所以需要进行包裹
