import { useState, useEffect } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import * as qs from "qs";
import { cleanObj } from "../../utils/index";
const apiUrl = process.env.REACT_APP_API_URL;
export const ProjectList = () => {
  const [params, setParams] = useState({
    name: "",
    personId: "",
  });
  const [list, setList] = useState([]);
  const [users, setUser] = useState([]);
  // 随着params的改变 数据应该也跟随改变
  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObj(params))}`).then(
      async (response) => {
        if (response.ok) {
          setList(await response.json());
        }
      }
    );
  }, [params]);
  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUser(await response.json());
      }
    });
  }, []);
  return (
    <div>
      <SearchPanel users={users} params={params} setParams={setParams} />
      <List list={list} users={users} />
    </div>
  );
};
