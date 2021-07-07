/*
 * @Description:
 * @Author: OriX
 * @LastEditors: OriX
 */
import styled from "@emotion/styled";
import { Spin, Button, Typography } from "antd";
import { DevTools } from "jira-dev-tool";

/**
 *  自定义组件  一行内容 行内元素垂直居中
 *  自定义每个元素的距离
 */
export const Row = styled.div<{
  gap?: number | boolean;
  between?: boolean;
  marginBottom?: number;
}>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.between ? "space-between" : undefined)};
  margin-bottom: ${(props) =>
    props.marginBottom ? props.marginBottom + "rem" : "1rem"};
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${(props) =>
      typeof props.gap === "number"
        ? props.gap + "rem"
        : props.gap
        ? "2rem"
        : undefined};
  }
`;

// 覆盖整个页面的加载组件
const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const FullPagLoading = () => (
  <FullPage>
    <Spin size={"large"} />
  </FullPage>
);

// 覆盖整个页面的报错组件
export const FullPageErrorFallback = ({ error }: { error: Error | null }) => (
  <FullPage>
    <DevTools />
    <ErrorBox error={error} />
  </FullPage>
);

// 基于antd 的button组件修改padding 为0
export const ButtonNoPadding = styled(Button)`
  padding: 0;
`;

// 类型守卫  如果value有message属性 就把他定义成 Error类型
const isError = (value: any): value is Error => value?.message;
// 错误展示组件
export const ErrorBox = ({ error }: { error: unknown }) => {
  if (isError(error)) {
    return <Typography.Text type={"danger"}>{error?.message}</Typography.Text>;
  }
  return null;
};
