/*
 * @Description:
 * @Author: OriX
 * @LastEditors: OriX
 */
import { User } from "./search-panel";
import { Table, TableProps, Dropdown, Menu } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Pin } from "components/pin";
import { useEditProject } from "utils/useProject";
import { ButtonNoPadding } from "components/lib";
import { useProjectModal } from "screens/project-list/utils";
export interface Project {
  id: number;
  name: string;
  personId: number;
  organization: string;
  created: number;
  pin: boolean;
}
interface ListProps extends TableProps<Project> {
  users: User[];
}
export const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject();
  const { startEdit } = useProjectModal();
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });
  const editProject = (id: number) => () => startEdit(id);
  const columns = [
    {
      title: <Pin checked={true} disabled={true} />,
      render(value: any, project: Project) {
        return (
          <Pin checked={project.pin} onCheckedChange={pinProject(project.id)} />
        );
      },
    },
    {
      title: "项目名",
      sorter: (a: Project, b: any) => a.name.localeCompare(b.name),
      render(value: any, project: any) {
        return <Link to={String(project.id)}>{project.name}</Link>;
      },
    },
    {
      title: "部门",
      dataIndex: "organization",
    },
    {
      title: "负责人",
      render(project: any) {
        return (
          <span>
            {users.find((user: User) => user.id === project.personId)?.name ||
              "未知"}
          </span>
        );
      },
    },
    {
      title: "创建时间",
      render(project: any) {
        return (
          <span>
            {project.created
              ? dayjs(project.created).format("YYYY-MM-DD")
              : "无"}
          </span>
        );
      },
    },
    {
      // 渲染编辑项目的弹框
      render(value: any, project: Project) {
        return (
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item
                  key={"edit"}
                  onClick={() => {
                    editProject(project.id);
                  }}
                >
                  编辑
                </Menu.Item>
                <Menu.Item key={"delete"}>删除</Menu.Item>
              </Menu>
            }
          >
            <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
          </Dropdown>
        );
      },
    },
  ];
  return (
    <Table rowKey={"id"} pagination={false} columns={columns} {...props} />
  );
};
