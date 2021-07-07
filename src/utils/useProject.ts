/*
 * @Description: 基于useAsync 对project的二次封装 各个请求
 * @Author: OriX
 * @LastEditors: OriX
 */
import { Project } from "../screens/project-list/list";
import { useHttp } from "./http";
import { useMutation, useQuery, useQueryClient } from "react-query";
// 请求projects
export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  // 使用useQuery 根据 param 去发送异步请求
  return useQuery<Project[]>(["projects", param], () =>
    client("projects", { data: param })
  );
};
// 修改project
export const useEditProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    {
      // 当请求成功的时候 就更新这个projects这个惠安村
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};
// 增加project
export const useAddProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, { data: params, method: "POST" }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
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
