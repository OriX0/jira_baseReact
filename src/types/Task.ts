/*
 * @Description:
 * @Author: OriX
 * @LastEditors: OriX
 */
export interface Task {
  id: number;
  name: string;
  // 经办人
  processId: number;
  projectId: number;
  // 任务组
  epicId: number;
  kanbanId: number;
  // 看板类型 bug or task
  typeId: number;
  note: string;
}
