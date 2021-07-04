/*
 * @Description: 基于useAsync 对project的二次封装 各个请求
 * @Author: OriX
 * @LastEditors: OriX
 */
import { useAsync } from "utils/useAsync";
import { Project } from "../screens/project-list/list";
import { useEffect, useCallback } from "react";
import { useHttp } from "./http";
import { cleanObj } from "utils";
// 请求project
export const useProject = (param?: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>();
  const client = useHttp();
  // 随着params的改变 数据应该也跟随改变
  const fetchProjects = useCallback(
    () => client("projects", { data: cleanObj(param || {}) }),
    [client, param]
  );
  useEffect(() => {
    // 将刷新函数传入
    run(fetchProjects(), { retry: fetchProjects });
  }, [param, fetchProjects, run]);
  return result;
};
// 修改project
export const useEditProject = () => {
  const { run, ...restAsyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    );
  };
  return {
    mutate,
    ...restAsyncResult,
  };
};
