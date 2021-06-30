/*
 * @Description:
 * @Author: OriX
 * @LastEditors: OriX
 */
import { useState } from "react";
import { LoginScreens } from "./login";
import { RegisterScreens } from "./register";
import { Card, Divider, Button } from "antd";
import styled from "@emotion/styled";
import logo from "assets/logo.svg";
import left from "assets/left.svg";
import right from "assets/right.svg";

export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <Container>
      <Header />
      <Background />
      <ShadowCard>
        <Title>{isRegister ? "请注册" : "请登录"}</Title>
        {isRegister ? <RegisterScreens /> : <LoginScreens />}
        <Divider />
        <a
          href="/#"
          style={{ marginTop: "15px" }}
          onClick={() => {
            setIsRegister(!isRegister);
          }}
        >
          {isRegister ? "已有账号？切换到登录" : "没有账号,立即注册"}
        </a>
      </ShadowCard>
    </Container>
  );
};
export const LongButton = styled(Button)`
  width: 100%;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 75vh;
`;
const Header = styled.header`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`;
const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-image: url(${left}), url(${right});
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-position: left bottom, right bottom;
`;

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`;
const Title = styled.h2`
  color: #6f847d;
  margin-bottom: 2.4rem;
`;
