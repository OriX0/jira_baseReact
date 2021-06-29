/*
 * @Description: 登录模块
 * @Author: OriX
 * @LastEditors: OriX
 */

import { useAuth } from "context/auth-context";
import { Form, Button, Input } from "antd";
export const LoginScreens = () => {
  const { login, user } = useAuth();
  const handleSubmit = (value: { username: string; password: string }) => {
    login(value);
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item name="username" label="用户名" rules={[{ required: true }]}>
        <Input type="text" placeholder={"请输入用户名"} id="username" />
      </Form.Item>
      <Form.Item name="password" label="密码" rules={[{ required: true }]}>
        <Input.Password type="text" placeholder={"请输入密码"} id="password" />
      </Form.Item>
      <Button type="primary" htmlType={"submit"}>
        {" "}
        登录
      </Button>
    </Form>
  );
};
