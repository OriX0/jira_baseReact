/*
 * @Description:乐观更新hook
 * @Author: OriX
 * @LastEditors: OriX
 */
import { QueryKey, useQueryClient } from "react-query";

/**
 * 乐观更新主 hook
 * @param queryKey
 * @param callback 回调函数
 * @returns
 */
export const useConfig = (
  queryKey: QueryKey,
  callback: (target: any, old?: any[]) => any[]
) => {
  // 建立query连接
  const queryClient = useQueryClient();
  return {
    // 请求成功 就把缓存中的key对应值遗忘 用新的值替代
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    // 当发生改变的时候
    async onMutate(target: any) {
      // 1.先获取缓存数据
      const previousItems = queryClient.getQueryData(queryKey);
      // 2.调用callback 基于旧数据更新缓存数据
      queryClient.setQueryData(queryKey, (old?: any[]) => {
        return callback(target, old);
      });
      // 3.将原先的缓存数据先返回出去
      return { previousItems };
    },
    // 如果请求失败就把 从上下文中获取原先的数据设置回去
    onError(error: any, newItem: any, context: any) {
      queryClient.setQueryData(queryKey, context.previousItems);
    },
  };
};

export const useDeleteConfig = (queryKey: QueryKey) =>
  useConfig(
    queryKey,
    (target, old) => old?.filter((item) => item.id !== target.id) || []
  );
export const useEditConfig = (queryKey: QueryKey) =>
  useConfig(
    queryKey,
    (target, old) =>
      old?.map((item) =>
        item.id === target.id ? { ...item, ...target } : item
      ) || []
  );
export const useAddConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => (old ? [...old, target] : []));
