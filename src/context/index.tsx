/*
 * @Description:
 * @Author: OriX
 * @LastEditors: OriX
 */
import { ReactNode } from "react";
import { AuthProvide } from "./auth-context";
export const AppProviders = ({ children }: { children: ReactNode }) => {
  return <AuthProvide>{children}</AuthProvide>;
};
