/*
 * @Description:
 * @Author: OriX
 * @LastEditors: OriX
 */
import { useHttp } from "./http";
import { useQuery } from "react-query";
import { TaskType } from "types/Task-type";

// 请求Task
export const useTaskTypes = () => {
  const client = useHttp();
  // 根据 param 去发送异步请求 使用useQuery进行魂村
  return useQuery<TaskType[]>(["taskTypes"], () => client("taskTypes"));
};
