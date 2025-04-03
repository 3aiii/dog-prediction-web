import React from "react";

const Create = () => {
  return (
    <div>
      <h1 className="text-center text-3xl text-[#2f3542] font-bold my-6 mb-8">
        เพิ่มข้อมูลผู้ใช้งาน
      </h1>
      <div className="flex justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full text-center">
          <form className="mt-4">
            <div className="flex gap-2 mb-4">
              <div className="w-full">
                <label className="block text-left text-lg font-medium mb-1">
                  ชื่อ:
                </label>
                <input type="text" placeholder="ชื่อ" className="btn-field" />
              </div>
              <div className="w-full">
                <label className="block text-left text-lg font-medium mb-1">
                  นามสกุล:
                </label>
                <input
                  type="text"
                  placeholder="นามสกุล"
                  className="btn-field"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-left text-lg font-medium mb-1">
                อีเมล:
              </label>
              <input type="email" placeholder="อีเมล" className="btn-field" />
            </div>
            <div className="mb-4">
              <label className="block text-left text-lg font-medium mb-1">
                รหัสผู้ใช้งาน:
              </label>
              <input
                type="password"
                placeholder="รหัสผู้ใช้งาน"
                className="btn-field"
              />
            </div>
            <div className="mb-4">
              <label className="block text-left text-lg font-medium mb-1">
                บทบาท:
              </label>
              <select className="btn-field">
                <option value={"USER"}>USER</option>
                <option value={"ADMIN"}>ADMIN</option>
              </select>
            </div>
            <div className="flex  justify-end gap-2">
              <button className="bg-gray-500 hover:bg-gray-600 transition px-3 py-2 rounded-md text-white">
                ยกเลิก
              </button>
              <button className="btn-green text-white">เพิ่มข้อมูล</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
