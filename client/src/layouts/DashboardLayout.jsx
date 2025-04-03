import React, { useEffect } from "react";
import Sidebar from "../components/user/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { verify } from "../composables/userService";

const DashboardLayout = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const Verify = async () => {
      const { data } = await verify();

      if (data.role === "ADMIN") {
        navigate("/admin/user", { state: { role: data?.role } });
      } else if (data.role === "USER") {
        navigate("/dog-breed", { state: { role: data?.role } });
      }
    };

    Verify();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="p-8 w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
