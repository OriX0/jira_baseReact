/*
 * @Description:
 * @Author: OriX
 * @LastEditors: OriX
 */
import { useHttp } from "./http";
import { useQuery } from "react-query";
import { Task } from "types/Task";

// 请求Task
export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();
  // 根据 param 去发送异步请求 使用useQuery进行魂村
  return useQuery<Task[]>(["tasks", param], () =>
    client("tasks", { data: param })
  );
};
