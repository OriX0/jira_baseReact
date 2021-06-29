/*
 * @Description:
 * @Author: OriX
 * @LastEditors: OriX
 */
import { User } from "./search-panel";
import { Table } from "antd";
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
      title: "管理员",
      render(project: any) {
        console.log("project", project);
        return (
          <span>
            {users.find((user: User) => user.id === project.personId)?.name ||
              "未知"}
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
