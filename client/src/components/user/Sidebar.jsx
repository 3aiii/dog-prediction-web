import React, { useEffect, useState } from "react";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { logout, verify } from "../../composables/userService";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [id, setId] = useState(null);

  const isActive = (path) => {
    return location.pathname === path ? "bg-gray-700" : "";
  };

  const Logout = async () => {
    try {
      const result = await Swal.fire({
        title: "ออกจากระบบ",
        text: "คุณต้องการออกจากระบบหรือไม่?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "ยกเลิก",
        confirmButtonText: "ใช่",
      });

      if (result.isConfirmed) {
        const { data } = await logout();
        if (data) {
          Swal.fire({
            title: "ออกจากระบบสำเร็จ!",
            text: "คุณได้ออกจากระบบเรียบร้อยแล้ว",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
            timerProgressBar: true,
          }).then(() => {
            navigate("/login");
          });
        }
      }
    } catch (error) {
      Swal.fire({
        title: "ล็อกเอ้าไม่สำเร็จ!",
        text:
          error.response?.data?.error || "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
      });
    }
  };

  useEffect(() => {
    const Verify = async () => {
      const { data } = await verify();
      setRole(data?.role);
      setId(data?.user_id);

      const currentPath = location.pathname;
      if (data.role === "ADMIN" && currentPath !== "/admin/user") {
        navigate("/admin/user");
      } else if (data.role === "USER" && currentPath !== "/dog-breed") {
        navigate("/dog-breed");
      } else if (data.error === "Unauthorized") {
        navigate("/login");
      }
    };
    Verify();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-[300px] h-full bg-[#1e272e] text-white p-4">
        <h2 className="text-xl font-semibold border-b border-white/20 pb-2 mt-6 mb-4">
          เมนูผู้ใช้งาน
        </h2>
        {role === "ADMIN" ? (
          <nav className="space-y-2">
            <Link
              to="/admin/user"
              className={`block px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:translate-x-1 transition ${
                isActive("/admin/user") ||
                isActive("/admin/user/create") ||
                matchPath("/admin/user/edit/:id", location.pathname)
                  ? "bg-gray-700"
                  : ""
              }`}
            >
              เพิ่ม ลบ แก้ไข ข้อมูลผู้ใช้งาน
            </Link>
            <Link
              to="/admin/used"
              className={`block px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:translate-x-1 
                  transition ${
                    isActive("/admin/used") ||
                    matchPath("/admin/used/:id", location.pathname)
                      ? `bg-gray-700`
                      : ``
                  } `}
            >
              ข้อมูลการใช้งานระบบของผู้ใช้
            </Link>
            <Link
              to={`/edit/profile/${id}`}
              className={`block px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:translate-x-1 transition 
             ${
               matchPath("/edit/profile/:id", location.pathname)
                 ? "bg-gray-700"
                 : ""
             }
              )}`}
            >
              แก้ไขข้อมูลส่วนตัว
            </Link>
          </nav>
        ) : (
          <nav className="space-y-2">
            <Link
              to="/predict"
              className={`block px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:translate-x-1 transition ${isActive(
                "/predict"
              )}`}
            >
              ทำนายสายพันธุ์สุนัข
              <span className="bg-blue-600 rounded-md px-3 text-sm ml-2">
                แนะนำ
              </span>
            </Link>
            <Link
              to="/dog-breed"
              className={`block px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:translate-x-1 transition ${isActive(
                "/dog-breed"
              )}`}
            >
              ข้อมูลสายพันธุ์สุนัข
            </Link>
            <Link
              to="top-dog-breed-prediction"
              className={`block px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:translate-x-1 transition ${isActive(
                "/top-dog-breed-prediction"
              )}`}
            >
              ข้อมูลสุนัขที่มีการทำนายมากที่สุด
            </Link>
            <Link
              to={`/edit/profile/${id}`}
              className={`block px-4 py-2 rounded-lg text-gray-300 hover:bg-gray-700 hover:translate-x-1 transition ${
                matchPath("/edit/profile/:id", location.pathname)
                  ? "bg-gray-700"
                  : ""
              }`}
            >
              แก้ไขข้อมูลส่วนตัว
            </Link>
          </nav>
        )}

        <button
          onClick={Logout}
          className="w-full text-left px-4 py-2 bg-red-500 rounded-md text-white hover:bg-red-600 mt-4 transition"
        >
          ออกจากระบบ
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
