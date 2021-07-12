/*
 * @Description: kanban组件 相关业务逻辑合计
 * @Author: OriX
 * @LastEditors: OriX
 */

import { useHttp } from "./http";
import { useQuery } from "react-query";
import { Kanban } from "types/Kabnban";

// 请求kanban
export const useKanbans = (param?: Partial<Kanban>) => {
  const client = useHttp();
  // 根据 param 去发送异步请求 使用useQuery进行魂村
  return useQuery<Kanban[]>(["kanbans", param], () =>
    client("kanbans", { data: param })
  );
};
