/*
 * @Description:
 * @Author: OriX
 * @LastEditors: OriX
 */
import { useAuth } from "context/auth-context";
import { ProjectList } from "./screens/project-list";
export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <>
      <button onClick={logout}>登出</button>
      <ProjectList></ProjectList>
    </>
  );
};
