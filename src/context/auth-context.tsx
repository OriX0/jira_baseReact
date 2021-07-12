/*
 * @Description: 权限验证 上下文
 * @Author: OriX
 * @LastEditors: OriX
 */
import React, { ReactNode } from "react";
import { User } from "../screens/project-list/search-panel";
import * as auth from "auth-provide";
import { http } from "utils/http";
import { useMount } from "utils";
import { useAsync } from "utils/useAsync";
import { FullPageErrorFallback, FullPagLoading } from "components/lib";
import { useQueryClient } from "react-query";
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
interface AuthForm {
  username: string;
  password: string;
}
// 初始化user
const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    // 请求个人信息接口 获取个人信息
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

export const AuthProvide = ({ children }: { children: ReactNode }) => {
  const {
    run,
    isLoading,
    isIdle,
    isError,
    data: user,
    setData: setUser,
    error,
  } = useAsync<User | null>();
  const queryClient = useQueryClient();
  // 向下传递的方法
  const login = (form: AuthForm) =>
    auth.login(form).then((user) => setUser(user));
  const register = (form: AuthForm) =>
    auth.register(form).then((user) => setUser(user));
  const logout = () =>
    auth.logout().then(() => {
      setUser(null);
      // 清除 useQuery的所有数据
      queryClient.clear();
    });
  // 调用初始化
  useMount(() => {
    run(bootstrapUser());
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
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};
// 定义自定义Hook
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在authProvide中使用");
  }
  return context;
};
