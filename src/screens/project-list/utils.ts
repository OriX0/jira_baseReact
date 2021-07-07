/*
 * @Description: 关于project list需要用的数据的hook封装
 * @Author: OriX
 * @LastEditors: OriX
 */
import { useUrlQueryParam } from "utils/url";
import { useMemo } from "react";
import { useProject } from "utils/useProject";
import { useSearchParams } from "react-router-dom";

// 项目列表搜索的参数
export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  return [
    useMemo(
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param]
    ),
    setParam,
  ] as const;
};
// projectModel是否展示
export const useProjectModal = () => {
  // 当前是否是创建项目状态
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);
  // 当前是否在编辑
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    "editingProjectId",
  ]);
  const [_, setUrlParams] = useSearchParams();
  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId)
  );

  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => setUrlParams({ projectCreate: "", editingProjectId: "" });
  const startEdit = (id: number) =>
    setEditingProjectId({ editingProjectId: id });

  return {
    // 如果当前状态的 projectCreate 为true  或者 正在编辑（编辑id有值） 则展示模态框
    projectModalOpen: projectCreate === "true" || Boolean(editingProject),
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
  };
};
