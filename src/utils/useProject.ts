/*
 * @Description: 基于useAsync 对project的二次封装 各个请求
 * @Author: OriX
 * @LastEditors: OriX
 */
import { Project } from "../types/Project";
import { useHttp } from "./http";
import { QueryKey, useMutation, useQuery } from "react-query";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "utils/use-optimistic-options";
// 请求projects
export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  // 使用useQuery 根据 param 去发送异步请求
  return useQuery<Project[]>(["projects", param], () =>
    client("projects", { data: param })
  );
};
// 修改project
export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    useEditConfig(queryKey)
  );
};
// 增加project
export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, { data: params, method: "POST" }),
    useAddConfig(queryKey)
  );
};
// 删除project
export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) =>
      client(`projects/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};

// 获取单个project的详细信息
export const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(
    ["project", { id }],
    () => client(`projects/${id}`, {}),
    {
      enabled: Boolean(id),
    }
  );
};
