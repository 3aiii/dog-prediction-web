import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../../../components/Pagination";
import { gets, remove } from "../../../../composables/userService";
import Swal from "sweetalert2";

const Index = () => {
  const [users, setUsers] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const startIndex = (currentPage - 1) * itemsPerPage;

  const fetchUsers = async () => {
    const { data } = await gets(currentPage, itemsPerPage);
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const deleteUser = async (id) => {
    try {
      const result = await Swal.fire({
        title: "ลบผู้ใช้งาน",
        text: "คุณต้องการลบผู้ใช้งานนี้หรือไม่?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "ยกเลิก",
        confirmButtonText: "ใช่, ลบเลย",
      });

      if (result.isConfirmed) {
        const { data } = await remove(id);
        if (data) {
          Swal.fire({
            title: "ลบผู้ใช้งานสำเร็จ!",
            text: "ผู้ใช้งานถูกลบออกจากระบบเรียบร้อยแล้ว",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
            timerProgressBar: true,
            didClose: () => {
              fetchUsers();
            },
          });
        }
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text:
          error.response.data.message ||
          "เกิดข้อผิดพลาด โปรดลองอีกครั้งภายหลัง",
      });
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full text-center">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold mb-4">ข้อมูลผู้ใช้งาน</h1>
            <Link
              to={`/admin/user/create`}
              className="btn-green text-white px-4 py-2 rounded mb-4"
            >
              เพิ่มผู้ใช้งาน
            </Link>
          </div>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 w-16">ID</th>
                <th className="border p-2">ชื่อ-นามสกุล</th>
                <th className="border p-2">อีเมล</th>
                <th className="border p-2 w-48"></th>
              </tr>
            </thead>
            <tbody>
              {users?.data?.map((user, index) => (
                <tr key={index} className="border">
                  <td className="border p-2">{startIndex + index + 1}</td>
                  <td className="border p-2">
                    {user.fname} {user.lname}
                  </td>
                  <td className="border p-2">{user.email}</td>
                  <td className="border p-2">
                    <Link
                      to={`/admin/user/edit/${user.user_id}`}
                      state={{ user }}
                      className="bg-yellow-500 transition hover:bg-yellow-600 text-white px-2 py-1 rounded mr-2"
                    >
                      แก้ไขข้อมูล
                    </Link>
                    <button
                      onClick={() => deleteUser(user.user_id)}
                      className="bg-red-500 transition hover:bg-red-600 text-white px-2 py-1 rounded"
                    >
                      ลบข้อมูล
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            totalPages={users?.totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
