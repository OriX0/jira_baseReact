/*
 * @Description:获取现有用户数据 渲染用户下拉列表
 * @Author: OriX
 * @LastEditors: OriX
 */
import { useUser } from "utils/useUser";
import { IdSelect } from "components/id-select";

export const UserSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  // 先获取用户的数据
  const { data: users } = useUser();
  // 渲染用户的下拉列表
  return <IdSelect options={users || []} {...props} />;
};
