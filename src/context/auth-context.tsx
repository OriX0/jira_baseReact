/*
 * @Description: 权限验证 上下文
 * @Author: OriX
 * @LastEditors: OriX
 */
import React, { ReactNode, useCallback } from "react";
import { User } from "../screens/project-list/search-panel";
import * as auth from "auth-provide";
import { http } from "utils/http";
import { useMount } from "utils";
import { useAsync } from "utils/useAsync";
import { FullPageErrorFallback, FullPagLoading } from "components/lib";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, bootstrap } from "store/auth.slice";
import * as authStore from "store/auth.slice";

// 创建context的容器对象
const AuthContext = React.createContext<
  | {
      user: User | null;
      login: (form: AuthForm) => Promise<void>;
      register: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";
export interface AuthForm {
  username: string;
  password: string;
}
// 初始化user
export const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    // 请求个人信息接口 获取个人信息
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};
// 返回 AuthContext.Provider 并传入相对应需要的值
export const AuthProvide = ({ children }: { children: ReactNode }) => {
  const { error, isLoading, isIdle, isError, run } = useAsync<User | null>(); // user和setUser提升到redux中去了
  //
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();
  // 调用初始化
  useMount(() => {
    run(dispatch(bootstrap()));
  });
  // 判断当前状态 是否加载中 加载loading组件
  if (isLoading || isIdle) {
    return <FullPagLoading />;
  }
  // 判断当前状态 是否为error 报错 并展示当前错误
  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }
  return (
    //  只包裹返回 children即可 无需返回  AuthContext.Provider了
    <div>{children}</div>
  );
};
// 定义自定义Hook
/* export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在authProvide中使用");
  }
  return context;
}; */
export const useAuth = () => {
  // 引入dispatch
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();
  // 引入状态中的user
  const user = useSelector(selectUser);
  // 定义login和register方法
  const login = useCallback(
    (form: AuthForm) => {
      dispatch(authStore.login(form));
    },
    [dispatch]
  );
  const register = useCallback(
    (form: AuthForm) => dispatch(authStore.register(form)),
    [dispatch]
  );
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]);
  return {
    user,
    login,
    register,
    logout,
  };
};
