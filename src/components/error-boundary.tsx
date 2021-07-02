/*
 * @description:
 * @Author: OriX
 * @LastEditors: OriX
 */
import React from "react";

// 定义发生错误时候的 render
type FallbackRender = (props: { error: Error | null }) => React.ReactElement;

/**
 * 错误边界必须继承与react component  接收两个参数 Props. 和 State
 * P props应该接收子组件 及 错误返回的
 * S state 应该是 当前是否发生错误
 */
export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { error: Error | null }
> {
  // 定义状态 需要和传入的状态一样
  state = { error: null };
  // 捕捉后代的错误状态  捕获到后赋值给状态中的error属性
  static getDerivedStateFromError(error: null) {
    return { error };
  }
  // 渲染逻辑
  render() {
    // 从state和props中分别解构需要的数据
    const { error } = this.state;
    const { fallbackRender, children } = this.props;
    // 如果是错误状态
    if (error) {
      // 调用错误的处理函数 将错误传入 返回错误的处理组件
      return fallbackRender({ error });
    }
    // 否则 正常渲染 子组件
    return children;
  }
}
