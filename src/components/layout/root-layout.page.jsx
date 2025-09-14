import Navigation from "../Home/Navigation";
import { Outlet } from "react-router";
import { Toaster } from "@/components/ui/sonner"

const RootLayoutPage = () => {
  return (
    <>
      <Navigation />
      <Outlet />
        <Toaster/>
    </>
  );
};

export default RootLayoutPage;
