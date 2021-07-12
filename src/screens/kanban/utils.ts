/*
 * @Description: kanban所用到的工具函数
 * @Author: OriX
 * @LastEditors: OriX
 */

import { useLocation } from "react-router";
import { useProject } from "utils/useProject";

// 从url中获取到 project的id
export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  /**
   * pathname.match(/projects\/(\d+)/)?.[1]
   * 返回一个数组  第一个item 为全部匹配到的  第二个item为 捕获组里的数字 即需要的id
   */
  const id = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(id);
};
// 返回当前从url获取到 的 改project的所有信息
export const useProjectInUrl = () => useProject(useProjectIdInUrl());
// 返回一个对象  当前projectId的值
export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() });
// 用于请求Project时候时候发送的相关参数   kanbans 为url  后面的是当前的projectId
export const useKanbansQueryKey = () => ["kanbans", useKanbanSearchParams()];
// Task的请求参数
export const useTasksSearchParams = () => ({ projectId: useProjectIdInUrl() });
// 用于请求Task时候时候发送的相关参数   kanbans 为url  后面的是当前的projectId
export const useTasksQueryKey = () => ["tasks", useTasksSearchParams()];
