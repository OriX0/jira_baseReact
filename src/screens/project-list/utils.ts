/*
 * @Description: 关于project list需要用的数据的hook封装
 * @Author: OriX
 * @LastEditors: OriX
 */
import { useUrlQueryParam } from "utils/url";
import { useMemo } from "react";

// 项目列表搜索的参数
export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  return [
    useMemo(
      // 将personId的类型更改为number类型
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param]
    ),
    setParam,
  ] as const;
};
