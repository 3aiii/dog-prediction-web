import React, { useState } from "react";
import { create } from "../../../../composables/userService";
import Swal from "sweetalert2";

const Create = () => {
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
      const { data } = await create(formData);

      if (data) {
        Swal.fire({
          title: "เพิ่มข้อมูลผู้ใช้งานสำเร็จ!",
          text: "ผู้ใช้งานถูกเพิ่มเข้าระบบเรียบร้อยแล้ว",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
          timerProgressBar: true,
        }).then(() => {
          setFormData({
            fname: "",
            lname: "",
            email: "",
            password: "",
            role: "USER",
          });
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text:
          error.response.data.error || "เกิดข้อผิดพลาด โปรดลองอีกครั้งภายหลัง",
      });
    }
  };

  return (
    <div>
      <h1 className="text-center text-3xl text-[#2f3542] font-bold my-6 mb-8">
        เพิ่มข้อมูลผู้ใช้งาน
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
                placeholder="รหัสผู้ใช้งาน"
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
                onClick={() =>
                  setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    role: "USER",
                  })
                }
              >
                ยกเลิก
              </button>
              <button type="submit" className="btn-green text-white">
                เพิ่มข้อมูล
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
