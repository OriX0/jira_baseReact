/*
 * @Description: 登录模块
 * @Author: OriX
 * @LastEditors: OriX
 */

import { useAuth } from "context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "unauthenticated-app";
import { useAsync } from "utils/useAsync";
export const LoginScreens = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { login } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });
  const handleSubmit = async (value: {
    username: string;
    password: string;
  }) => {
    try {
      await run(login(value));
    } catch (e) {
      onError(e);
    }
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item name="username" label="用户名" rules={[{ required: true }]}>
        <Input type="text" placeholder={"请输入用户名"} id="username" />
      </Form.Item>
      <Form.Item name="password" label="密码" rules={[{ required: true }]}>
        <Input.Password type="text" placeholder={"请输入密码"} id="password" />
      </Form.Item>
      <LongButton type="primary" htmlType={"submit"} loading={isLoading}>
        {" "}
        登录
      </LongButton>
    </Form>
  );
};
