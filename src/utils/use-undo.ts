/*
 * @Description:
 * @Author: OriX
 * @LastEditors: OriX
 */
import { useCallback, useState } from "react";
export const useUndo = <T>(initialPresent: T) => {
  /* 状态---历史操作的合集数组
  const [past,setPast] = useState<T[]>([])
  状态---当前操作
  const [present,setPresent] = useState(initialPresent)
  状态---未来操作
  const [future,setFuture]= useState<T[]>([]) */

  const [state, setState] = useState<{ past: T[]; present: T; future: T[] }>({
    past: [],
    present: initialPresent,
    future: [],
  });
  // 是否可以回退
  const canUndo = state.past.length !== 0;
  // 是否可以前进
  const canRedo = state.future.length !== 0;

  // 回退操作
  const undo = useCallback(() => {
    setState((currentState) => {
      const { past, present, future } = currentState;
      if (past.length === 0) return currentState;
      // 当前操作回退---从历史操作获取最近的一项
      const previous = past[past.length - 1];
      // 新的历史操作---去除被取出的一项
      const newPast = past.slice(0, past.length - 1);
      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    });
  }, []);
  // 前进操作
  const redo = useCallback(() => {
    setState((currentState) => {
      const { past, present, future } = currentState;
      if (future.length === 0) return currentState;
      const previous = future[0];
      const newFuture = future.slice(1);
      return {
        past: [...past, present],
        present: previous,
        future: newFuture,
      };
    });
  }, []);
  // 设置新值操作
  const set = useCallback((newPresent: T) => {
    setState((currentState) => {
      const { past, present, future } = currentState;
      if (newPresent === present) return currentState;
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    });
  }, []);
  // 重置操作
  const reset = useCallback((newPresent: T) => {
    setState(() => {
      return {
        past: [],
        present: newPresent,
        future: [],
      };
    });
  }, []);
  // 返回
  return [state, { set, reset, undo, redo, canRedo, canUndo }] as const;
};
