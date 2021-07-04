/*
 * @Description:
 * @Author: OriX
 * @LastEditors: OriX
 */
import { useEffect } from "react";
import { useHttp } from "./http";
import { User } from "../screens/project-list/search-panel";
import { useAsync } from "./useAsync";
import { cleanObj } from "utils";

export const useUser = (param?: Partial<User>) => {
  const { run, ...result } = useAsync<User[]>();
  const client = useHttp();
  // 随着params的改变 数据应该也跟随改变
  useEffect(() => {
    run(client("users", { data: cleanObj(param || {}) }));
  }, [param, client, run]);
  return result;
};
