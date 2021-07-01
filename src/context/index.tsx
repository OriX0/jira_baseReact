/*
 * @Description:
 * @Author: OriX
 * @LastEditors: OriX
 */
import { ReactNode } from "react";
import { AuthProvide } from "./auth-context";
import { QueryClient, QueryClientProvider } from "react-query";
export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvide>{children}</AuthProvide>
    </QueryClientProvider>
  );
};
