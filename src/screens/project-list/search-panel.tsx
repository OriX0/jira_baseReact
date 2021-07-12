/*
 * @Description:
 * @Author: OriX
 * @LastEditors: OriX
 */
import { Input, Form } from "antd";
import { UserSelect } from "components/user-select";
import { Project } from "../../types/Project";
import { User } from "../../types/User";
interface SearchPanelProps {
  users: User[];
  params: Partial<Pick<Project, "name" | "personId">>;
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
        <UserSelect
          value={params.personId}
          onChange={(value) => {
            setParams({ ...params, personId: value });
          }}
          defaultOptionName={"负责人"}
        />
      </Form.Item>
    </Form>
  );
};
