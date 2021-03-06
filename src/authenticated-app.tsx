/*
 * @Description:
 * @Author: OriX
 * @LastEditors: OriX
 */
import { useAuth } from "context/auth-context";
import { ProjectList as ProjectListScreen } from "./screens/project-list";
import styled from "@emotion/styled";
import { Row, ButtonNoPadding } from "components/lib";
import { Dropdown, Menu, Button } from "antd";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Navigate, Route, Routes } from "react-router";
import { ProjectScreen } from "screens/project";
import { toOriginRouter } from "utils";
import { ProjectPopover } from "components/project-popover";
import { ProjectModal } from "screens/project-list/project-model";

export const AuthenticatedApp = () => {
  return (
    <Container>
      <PageHeader />
      <Main>
        <Routes>
          <Route path={"/projects"} element={<ProjectListScreen />} />
          <Route path={"/projects/:projectId/*"} element={<ProjectScreen />} />
          <Navigate to={"/projects"} />
        </Routes>
      </Main>
      {/* 要让各个组件都能访问到modal modal的层级应该比较高 */}
      <ProjectModal />
    </Container>
  );
};
const PageHeader = () => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding onClick={toOriginRouter} type={"link"}>
          <SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
        </ButtonNoPadding>
        <ProjectPopover />
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  );
};
const User = () => {
  const { logout, user } = useAuth();
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"logout"}>
            <Button type={"link"} onClick={logout}>
              登出
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      {/* // 默认显示 用户名字 */}
      <Button type={"link"} onClick={(e) => e.preventDefault()}>
        Hi,{user?.name}
      </Button>
    </Dropdown>
  );
};
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.4);
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main``;
