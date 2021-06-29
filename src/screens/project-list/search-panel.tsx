/*
 * @Description:
 * @Author: OriX
 * @LastEditors: OriX
 */
import { Input, Form, Select } from "antd";
export interface User {
  id: number;
  name: string;
  token: string;
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
    <Form style={{ marginBottom: "2rem" }} layout={"inline"}>
      <Input
        placeholder="项目名"
        value={params.name}
        onChange={(event) => setParams({ ...params, name: event.target.value })}
      />
      <Select
        value={params.personId}
        onChange={(value) => {
          setParams({ ...params, personId: value });
        }}
      >
        <option value={""}>负责人</option>
        {users.map((user) => {
          return (
            <Select.Option key={user.id} value={user.id}>
              {user.name}
            </Select.Option>
          );
        })}
      </Select>
    </Form>
  );
};
