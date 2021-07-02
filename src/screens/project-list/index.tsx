/*
 * @Description: project list的主文件
 * @Author: OriX
 * @LastEditors: OriX
 */
import { useState } from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce, useDocumentTitle } from "../../utils/index";
import { Typography } from "antd";
import styled from "@emotion/styled";
import { useProject } from "utils/useProject";
import { useUser } from "utils/useUser";
export const ProjectList = () => {
  const [params, setParams] = useState({
    name: "",
    personId: "",
  });
  const debounceParams = useDebounce(params, 2000);
  const { isLoading, error, data: list } = useProject(debounceParams);
  const { data: users } = useUser();
  // 设置标题
  useDocumentTitle("项目管理", false);
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users || []} params={params} setParams={setParams} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List users={users || []} loading={isLoading} dataSource={list || []} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
