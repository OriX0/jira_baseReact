/*
 * @Description:
 * @Author: OriX
 * @LastEditors: OriX
 */
import { User } from "./search-panel";
import { Table } from "antd";
import dayjs from "dayjs";
interface Project {
  id: number;
  name: string;
  personId: number;
  organization: string;
  created: number;
}
interface ListProps {
  list: Project[];
  users: User[];
}
export const List = ({ list, users }: ListProps) => {
  const columns = [
    {
      title: "项目名",
      dataIndex: "name",
      sorter: (a: Project, b: any) => a.name.localeCompare(b.name),
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
  ];
  return (
    <Table
      rowKey={"id"}
      pagination={false}
      columns={columns}
      dataSource={list}
    />
  );
};
