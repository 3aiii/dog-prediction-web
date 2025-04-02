import React from "react";
import { Outlet } from "react-router-dom";

const AuthenticationLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#f0f8ff] to-[#dfefff]">
      <Outlet />
    </div>
  );
};

export default AuthenticationLayout;
