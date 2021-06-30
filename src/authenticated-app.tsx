/*
 * @Description:
 * @Author: OriX
 * @LastEditors: OriX
 */
import { useAuth } from "context/auth-context";
import { ProjectList } from "./screens/project-list";
import styled from "@emotion/styled";
export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <Container>
      <Header>
        <HeaderLeft>
          <h3>logo</h3>
          <h3>项目</h3>
          <h3>用户</h3>
        </HeaderLeft>
        <HeaderRight>
          <button onClick={logout}>登出</button>
        </HeaderRight>
      </Header>
      <Aside>aside</Aside>
      <Main>
        <ProjectList></ProjectList>
      </Main>
      <Nav>Nav</Nav>
      <Footer>footer</Footer>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-gap: 10rem;
  grid-template-rows: 6rem 1fr 6rem;
  grid-template-columns: 20rem 1fr 20rem;
  grid-template-areas:
    "header header header"
    "nav main aside"
    "footer footer footer";
`;
const Header = styled.header`
  grid-area: header;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const HeaderLeft = styled.div`
  display: flex;
  flex-direction: row;
`;
const HeaderRight = styled.div``;
const Main = styled.main`
  grid-area: main;
`;
const Nav = styled.nav`
  grid-area: nav;
`;
const Aside = styled.aside`
  grid-area: aside;
`;
const Footer = styled.footer`
  grid-area: footer;
`;
