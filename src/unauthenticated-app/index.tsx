/*
 * @Description:
 * @Author: OriX
 * @LastEditors: OriX
 */
import { useState } from "react";
import { LoginScreens } from "./login";
import { RegisterScreens } from "./register";
import { Card, Button } from "antd";
export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card>
        {isRegister ? <RegisterScreens /> : <LoginScreens />}
        <Button
          style={{ marginTop: "15px" }}
          onClick={() => {
            setIsRegister(!isRegister);
          }}
        >
          切换到{isRegister ? "登录" : "注册"}
        </Button>
      </Card>
    </div>
  );
};
