/*
 * @Description:
 * @Author: OriX
 * @LastEditors: OriX
 */
import { Kanban } from "types/Kabnban";
import { useTasks } from "utils/task";
import { useTasksSearchParams } from "./utils";
export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  const { data: allTasks } = useTasks(useTasksSearchParams());
  // 过滤tasks  展示相对应id的看板
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);
  return (
    <div>
      <h3>{kanban.name}</h3>
      {tasks?.map((task) => {
        return <div key={task.id}>{task.name}</div>;
      })}
    </div>
  );
};
