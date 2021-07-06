/*
 * @Description:  reducer store主文件
 * @Author: OriX
 * @LastEditors: OriX
 */
import { configureStore } from "@reduxjs/toolkit";
import { projectListSlice } from "screens/project-list/project-list.slice";

// 定义根reducer
export const rootReducer = {
  projectList: projectListSlice.reducer,
};

// 定义store
// configureStore 相当于 react-redux中的 combineReducers 封装 直接将reducer作为对象进行配置
export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
