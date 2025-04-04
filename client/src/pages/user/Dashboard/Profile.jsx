import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { get, update } from "../../../composables/userService";
import Swal from "sweetalert2";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        fname: data?.fname || "",
        lname: data?.lname || "",
        email: data?.email || "",
        password: "",
      });
    } catch (error) {
      Swal.fire({
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถโหลดข้อมูลผู้ใช้ได้",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
      });
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  return (
    <div>
      <h1 className="text-3xl text-[#2f3542] text-center font-bold my-6 mb-8">
        แก้ไขข้อมูลส่วนตัว
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
                  value={formData.fname}
                  onChange={handleChange}
                  placeholder="ชื่อ"
                  className="btn-field"
                  required
                />
              </div>
              <div className="w-full">
                <label className="block text-left text-lg font-medium mb-1">
                  นามสกุล:
                </label>
                <input
                  type="text"
                  name="lname"
                  value={formData.lname}
                  onChange={handleChange}
                  placeholder="นามสกุล"
                  className="btn-field"
                  required
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
                value={formData.email}
                onChange={handleChange}
                placeholder="อีเมล"
                className="btn-field"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-left text-lg font-medium mb-1">
                รหัสผ่านใหม่ (หากต้องการเปลี่ยน):
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="รหัสผ่านใหม่"
                className="btn-field"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => fetchUser()}
                className="bg-gray-500 hover:bg-gray-600 transition px-3 py-2 rounded-md text-white"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 transition text-white rounded-md px-3 py-2"
              >
                แก้ไขข้อมูลส่วนตัว
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
