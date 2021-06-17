/*
 * @Description:
 * @Author: OriX
 * @LastEditors: OriX
 */
import { User } from "./search-panel";
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
  return (
    <table>
      <thead>
        <tr>
          <th>项目名</th>
          <th>管理人</th>
        </tr>
      </thead>
      <tbody>
        {list.map((project) => {
          return (
            <tr key={project.id}>
              <th>{project.name}</th>
              <th>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </th>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
