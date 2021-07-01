/*
 * @Description: 注册模块
 * @Author: OriX
 * @LastEditors: OriX
 */

import { useAuth } from "context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "./index";
import { useAsync } from "utils/useAsync";
export const RegisterScreens = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { register } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });
  const handleSubmit = async ({
    cPassword,
    ...value
  }: {
    username: string;
    password: string;
    cPassword: string;
  }) => {
    // 密码确认
    if (cPassword !== value.password) {
      onError(new Error("两次输入密码不一致 请检查"));
      return;
    }
    // 判断抛出
    try {
      await run(register(value));
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
      <Form.Item name="cPassword" label="密码" rules={[{ required: true }]}>
        <Input.Password type="text" placeholder={"确认密码"} id="cPassword" />
      </Form.Item>
      <LongButton type="primary" htmlType={"submit"} loading={isLoading}>
        {" "}
        注册
      </LongButton>
    </Form>
  );
};
