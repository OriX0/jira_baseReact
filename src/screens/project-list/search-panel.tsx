/*
 * @Description:
 * @Author: OriX
 * @LastEditors: OriX
 */
export interface User {
  id: number;
  name: string;
}
interface SearchPanelProps {
  users: User[];
  params: {
    name: string;
    personId: string;
  };
  setParams: (params: SearchPanelProps["params"]) => void;
}
export const SearchPanel = ({ users, params, setParams }: SearchPanelProps) => {
  return (
    <form>
      <input
        placeholder="项目名"
        value={params.name}
        onChange={(event) => setParams({ ...params, name: event.target.value })}
      />
      <select
        value={params.personId}
        onChange={(event) => {
          setParams({ ...params, personId: event.target.value });
        }}
      >
        <option value={""}>负责人</option>
        {users.map((user) => {
          return (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          );
        })}
      </select>
    </form>
  );
};
