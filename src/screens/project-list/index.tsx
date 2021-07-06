/*
 * @Description: project list的主文件
 * @Author: OriX
 * @LastEditors: OriX
 */
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce, useDocumentTitle } from "../../utils/index";
import { Typography } from "antd";
import styled from "@emotion/styled";
import { useProject } from "utils/useProject";
import { useUser } from "utils/useUser";
import { useProjectsSearchParams } from "./utils";
import { useDispatch } from "react-redux";
import { ButtonNoPadding, Row } from "components/lib";
import { projectListActions } from "./project-list.slice";
export const ProjectList = () => {
  // 使用projectSearchParams hook中获取参数及设置参数的方法 已经对params进行处理了
  const [params, setParams] = useProjectsSearchParams();
  const debounceParams = useDebounce(params, 2000);
  const { isLoading, error, data: list, retry } = useProject(debounceParams);
  const { data: users } = useUser();
  const dispatch = useDispatch();
  // 设置标题
  useDocumentTitle("项目管理", false);
  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding
          onClick={() => dispatch(projectListActions.showProjectModal())}
          type={"link"}
        >
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel users={users || []} params={params} setParams={setParams} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
        refresh={retry}
        users={users || []}
        loading={isLoading}
        dataSource={list || []}
      />
    </Container>
  );
};
// 要检测的组件 +.whyDidYouRender = 布尔值
ProjectList.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;
