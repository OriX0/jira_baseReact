/*
 * @Description:
 * @Author: OriX
 * @LastEditors: OriX
 */
import { User } from "./types/User";
const apiUrl = process.env.REACT_APP_API_URL;

const localStorageAuthKey = "__auth_provide_token__";
export const getToken = () => localStorage.getItem(localStorageAuthKey);
// 处理请求返回的值  如果有token 就储存到local storage中
export const handelResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageAuthKey, user.token || "");
  return user;
};
// 登录
export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handelResponse(await response.json());
    }
    return Promise.reject(await response.json());
  });
};
// 注册
export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handelResponse(await response.json());
    }
    return Promise.reject(await response.json());
  });
};
// 退出登录
export const logout = async () => {
  window.localStorage.removeItem(localStorageAuthKey);
};
