/*
 * @Description:
 * @Author: OriX
 * @LastEditors: OriX
 */
import { Kanban } from "types/Kabnban";
import { useTasks } from "utils/task";
import { useTaskTypes } from "utils/task-type";
import { useTasksSearchParams } from "./utils";
import taskIcon from "assets/task.svg";
import bugIcon from "assets/bug.svg";
import styled from "@emotion/styled";
import { Card } from "antd";

const TaskTypeIcon = ({ id }: { id: Number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name;
  if (!name) {
    return null;
  }
  return (
    <img alt={"task-icon"} src={name === "task" ? taskIcon : bugIcon}></img>
  );
};
export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  const { data: allTasks } = useTasks(useTasksSearchParams());
  // 过滤tasks  展示相对应id的看板
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);
  return (
    <Container>
      <h3>{kanban.name}</h3>
      <TasksContainer>
        {tasks?.map((task) => {
          return (
            <Card key={task.id} style={{ marginBottom: "0.5rem" }}>
              <div>{task.name}</div>
              <TaskTypeIcon id={task.typeId} />
            </Card>
          );
        })}
      </TasksContainer>
    </Container>
  );
};

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;

const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;
  /* 不出现滚动条 防止页面跟随一起滚动 */
  ::-webkit-scrollbar {
    display: none;
  }
`;
