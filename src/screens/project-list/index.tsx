/*
 * @Description: project list的主文件
 * @Author: OriX
 * @LastEditors: OriX
 */
import { useState, useEffect } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { cleanObj, useMount, useDebounce } from "../../utils/index";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
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
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users} params={params} setParams={setParams} />
      <List list={list} users={users} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
