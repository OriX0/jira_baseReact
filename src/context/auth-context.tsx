/*
 * @Description: 权限验证 上下文
 * @Author: OriX
 * @LastEditors: OriX
 */
import React, { ReactNode, useState } from "react";
import { User } from "../screens/project-list/search-panel";
import * as auth from "auth-provide";
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

export const AuthProvide = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const login = (form: AuthForm) =>
    auth.login(form).then((user) => setUser(user));
  const register = (form: AuthForm) =>
    auth.register(form).then((user) => setUser(user));
  const logout = () => auth.logout().then(() => setUser(null));
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