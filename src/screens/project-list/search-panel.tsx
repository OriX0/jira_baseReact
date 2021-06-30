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
      <Form.Item>
        <Input
          placeholder="项目名"
          value={params.name}
          onChange={(event) =>
            setParams({ ...params, name: event.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Select
          value={params.personId}
          onChange={(value) => {
            setParams({ ...params, personId: value });
          }}
        >
          <Select.Option value={""}>负责人</Select.Option>
          {users.map((user) => {
            return (
              <Select.Option key={user.id} value={user.id}>
                {user.name}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
    </Form>
  );
};
