import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { verify } from "../composables/userService";

const AuthenticationLayout = () => {
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
    <div className="min-h-screen bg-gradient-to-r from-[#f0f8ff] to-[#dfefff]">
      <Outlet />
    </div>
  );
};

export default AuthenticationLayout;
