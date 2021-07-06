/*
 * @Description: reducer 切片 专门管理 project-list
 * @Author: OriX
 * @LastEditors: OriX
 */

import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";

// 定义 project-list 中 要用到的 state的类型
interface State {
  projectModalOpen: boolean;
}
// 定义初始state
const initialState: State = {
  projectModalOpen: false,
};
// 定义 reducer 切片
export const projectListSlice = createSlice({
  name: "projectListSlice", // 切片名字
  initialState,
  reducers: {
    // 因为函数名已经见名知意了 所以action的type基本不用上 基本用的都是payload参数
    showProjectModal(state) {
      // 这里直接赋值是因为 redux-toolkit 对于state已经做了副本处理 无需我们再次处理
      state.projectModalOpen = true;
    },
    closeProjectModal(state) {
      state.projectModalOpen = false;
    },
  },
});
// reducer slice 自己会暴露一个属性 action  相当于redux中的action
export const projectListActions = projectListSlice.actions;

// 暴露一个读取状态的方法  传入state  读取要读取的对应值
export const selectProjectModalOpen = (state: RootState) =>
  state.projectList.projectModalOpen;
