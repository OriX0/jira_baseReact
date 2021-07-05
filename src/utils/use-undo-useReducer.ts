/*
 * @Description: 基于useReducer 改写 use-undo
 * @Author: OriX
 * @LastEditors: OriX
 */
import { useReducer, useCallback } from "react";
const UNDO = "UNDO";
const REDO = "REDO";
const RESET = "RESET";
const SET = "SET";
type State<T> = {
  past: T[];
  present: T;
  future: T[];
};
type Action<T> = {
  newPresent?: T;
  type: typeof UNDO | typeof REDO | typeof RESET | typeof SET;
};
// 定义 事件处理的reducer
const undoReducer = <T>(state: State<T>, action: Action<T>) => {
  const { past, present, future } = state;
  const { newPresent, type } = action;
  switch (type) {
    case UNDO:
      if (past.length === 0) return state;
      // 当前操作回退---从历史操作获取最近的一项
      const previous = past[past.length - 1];
      // 新的历史操作---去除被取出的一项
      const newPast = past.slice(0, past.length - 1);
      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    case REDO:
      if (future.length === 0) return state;
      const next = future[0];
      const newFuture = future.slice(1);
      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    case SET:
      if (newPresent === present) return state;
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    case RESET:
      return {
        past: [],
        present: newPresent,
        future: [],
      };
  }
};

export const useUndoByReducer = <T>(initialPresent: T) => {
  const [state, dispatch] = useReducer(undoReducer, {
    past: [],
    present: initialPresent,
    future: [],
  } as State<T>);
  // 是否可以回退
  const canUndo = state.past.length !== 0;
  // 是否可以前进
  const canRedo = state.future.length !== 0;
  // 回退操作
  const undo = useCallback(() => dispatch({ type: UNDO }), []);
  // 前进操作
  const redo = useCallback(() => dispatch({ type: REDO }), []);
  // set操作
  const set = useCallback(
    (newPresent: T) => dispatch({ type: SET, newPresent }),
    []
  );
  // reset操作
  const reset = useCallback(
    (newPresent: T) => dispatch({ type: RESET, newPresent }),
    []
  );
  return {
    canRedo,
    canUndo,
    state,
    undo,
    redo,
    set,
    reset,
  };
};
