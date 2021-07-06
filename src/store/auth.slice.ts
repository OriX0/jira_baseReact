/*
 * @Description:
 * @Author: OriX
 * @LastEditors: OriX
 */
import { User } from "screens/project-list/search-panel";
import { createSlice } from "@reduxjs/toolkit";
import * as auth from "auth-provide";
import { AuthForm, bootstrapUser } from "context/auth-context";
import { AppDispatch, RootState } from "store/index";
// 定义状态类型
interface State {
  user: User | null;
}
// 初始化状态
const initialState: State = {
  user: null,
};
// 定义reducer切片
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});
//  从actions中解构获取 setUser action
const { setUser } = authSlice.actions;
// 暴露user的状态
export const selectUser = (state: RootState) => state.authState.user;
// 暴露对应的方法
export const login = (form: AuthForm) => (dispatch: AppDispatch) =>
  auth.login(form).then((user) => dispatch(setUser(user)));
export const register = (form: AuthForm) => (dispatch: AppDispatch) =>
  auth.register(form).then((user) => dispatch(setUser(user)));
export const logout = () => (dispatch: AppDispatch) =>
  auth.logout().then(() => dispatch(setUser(null)));
export const bootstrap = () => (dispatch: AppDispatch) =>
  bootstrapUser().then((user) => dispatch(setUser(user)));
