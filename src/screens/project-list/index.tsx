import { useState, useEffect } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { cleanObj, useMount, useDebounce } from "../../utils/index";
import { useHttp } from "utils/http";
export const ProjectList = () => {
  const [params, setParams] = useState({
    name: "",
    personId: "",
  });
  const debounceParams = useDebounce(params, 2000);
  const [list, setList] = useState([]);
  const [users, setUser] = useState([]);
  const client = useHttp();
  // 随着params的改变 数据应该也跟随改变
  useEffect(() => {
    client("projects", { data: cleanObj(debounceParams) }).then(setList);
  }, [debounceParams]);
  useMount(() => {
    client("users", {}).then(setUser);
  });
  return (
    <div>
      <SearchPanel users={users} params={params} setParams={setParams} />
      <List list={list} users={users} />
    </div>
  );
};
