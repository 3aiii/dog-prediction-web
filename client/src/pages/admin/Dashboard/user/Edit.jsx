import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get, update } from "../../../../composables/userService";
import Swal from "sweetalert2";

const Edit = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    role: "USER",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await update(id, formData);
      if (data) {
        Swal.fire({
          title: "แก้ไขข้อมูลสำเร็จ!",
          text: "ข้อมูลของคุณได้รับการอัปเดตแล้ว",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
          timerProgressBar: true,
        }).then(() => {
          navigate(`/edit/profile/${id}`);
        });
      }
    } catch (error) {
      Swal.fire({
        title: "เกิดข้อผิดพลาด",
        text: error.response?.data?.error || "ไม่สามารถแก้ไขข้อมูลได้",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
      });
    }
  };

  const fetchUser = async () => {
    try {
      const { data } = await get(`user/${id}`);
      setFormData({
        fname: data.fname || "",
        lname: data.lname || "",
        email: data.email || "",
        password: "",
        role: data.role || "USER",
      });
    } catch (error) {
      console.error("ไม่สามารถโหลดข้อมูลผู้ใช้:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  return (
    <div>
      <h1 className="text-center text-3xl text-[#2f3542] font-bold my-6 mb-8">
        แก้ไขข้อมูลผู้ใช้งาน
      </h1>
      <div className="flex justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full text-center">
          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="flex gap-2 mb-4">
              <div className="w-full">
                <label className="block text-left text-lg font-medium mb-1">
                  ชื่อ:
                </label>
                <input
                  type="text"
                  name="fname"
                  placeholder="ชื่อ"
                  className="btn-field"
                  value={formData.fname}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full">
                <label className="block text-left text-lg font-medium mb-1">
                  นามสกุล:
                </label>
                <input
                  type="text"
                  name="lname"
                  placeholder="นามสกุล"
                  className="btn-field"
                  value={formData.lname}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-left text-lg font-medium mb-1">
                อีเมล:
              </label>
              <input
                type="email"
                name="email"
                placeholder="อีเมล"
                className="btn-field"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-left text-lg font-medium mb-1">
                รหัสผู้ใช้งาน:
              </label>
              <input
                type="password"
                name="password"
                placeholder="รหัสใหม่ (เว้นว่างถ้าไม่เปลี่ยน)"
                className="btn-field"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-left text-lg font-medium mb-1">
                บทบาท:
              </label>
              <select
                name="role"
                className="btn-field"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="bg-gray-500 hover:bg-gray-600 transition px-3 py-2 rounded-md text-white"
                onClick={() => fetchUser()}
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 transition text-white rounded-md px-3 py-2"
              >
                แก้ไขข้อมูล
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;
