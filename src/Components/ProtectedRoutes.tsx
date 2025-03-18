import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/Redux/store";

interface ProtectedRoutesProps {
  children: ReactNode;
}

const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.signIn.isAuthenticated
  );
  if (isAuthenticated || localStorage.getItem("socialUserToken")) {
    return children;
  } else {
    return <Navigate to="/sign-in" />;
  }
};
export default ProtectedRoutes;
