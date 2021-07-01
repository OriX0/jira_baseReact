/*
 * @Description: 基于useAsync 对project的二次封装
 * @Author: OriX
 * @LastEditors: OriX
 */
import { useAsync } from "utils/useAsync";
import { Project } from "../screens/project-list/list";
import { useEffect } from "react";
import { useHttp } from "./http";
import { cleanObj } from "utils";

export const useProject = (param?: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>();
  const client = useHttp();
  // 随着params的改变 数据应该也跟随改变
  useEffect(() => {
    run(client("projects", { data: cleanObj(param || {}) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);
  return result;
};
