import { Navigate, Outlet } from "react-router";
import { useUser } from "@clerk/clerk-react";

const AdminProtectLayout = () => {
  const { user } = useUser();

  if (user?.publicMetadata.role !== "admin") {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default AdminProtectLayout;
