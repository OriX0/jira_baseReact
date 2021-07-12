/*
 * @Description:
 * @Author: OriX
 * @LastEditors: OriX
 */
import qs from "qs";
import * as auth from "auth-provide";
import { useAuth } from "../context/auth-context";
import { useCallback } from "react";
const apiUrl = process.env.REACT_APP_API_URL;
interface fetchConfig extends RequestInit {
  token?: string;
  data?: object;
}

export const http = async (
  endpoint: string,
  { data, token, headers, ...customerConfig }: fetchConfig = {}
) => {
  const config = {
    method: "GET",
    // jwt token的发送 及设置content type
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customerConfig,
  };
  // 根据请求方式 将请求数据 加到对应的地方
  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        await auth.logout();
        window.location.reload();
        return Promise.reject({ message: "请重新登录" });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
};

export const useHttp = () => {
  const { user } = useAuth();
  return useCallback(
    (...[endpoint, config = {}]: Parameters<typeof http>) =>
      http(endpoint, { ...config, token: user?.token }),
    [user?.token]
  );
};
