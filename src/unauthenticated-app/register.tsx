/*
 * @Description: 注册模块
 * @Author: OriX
 * @LastEditors: OriX
 */

import { useAuth } from "context/auth-context";
import { FormEvent } from "react";
export const RegisterScreens = () => {
  const { register, user } = useAuth();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLFormElement).value;
    const password = (event.currentTarget.elements[1] as HTMLFormElement).value;
    register({ username, password });
  };
  return (
    <form onSubmit={handleSubmit}>
      {user ? <div>登录成功,用户名:{user?.name}</div> : null}
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" name="username" id="username" />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" name="password" id="password" />
      </div>
      <button type="submit">注册</button>
    </form>
  );
};
