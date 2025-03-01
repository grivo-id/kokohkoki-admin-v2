import { useContext } from "react";
import { AuthContext } from "./auth-provider";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("no useAuth on the provider");
  }
  return context;
};