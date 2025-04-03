import React, { useState } from "react";
import Pagination from "../../../components/Pagination";

const ActivityLog = () => {
  const [activityLog, setActivityLog] = useState([
    {
      id: 1,
      user: "John Doe",
      action: "เปลี่ยนชื่อ",
      details: "เปลี่ยนเป็น 'JohnDoe'",
      timestamp: "2025-04-01 14:30",
    },
    {
      id: 2,
      user: "Jane Smith",
      action: "ลบโพสต์",
      details: "ลบโพสต์ 'วิธีใช้ระบบ'",
      timestamp: "2025-04-02 09:15",
    },
    {
      id: 3,
      user: "Michael Johnson",
      action: "อัปเดตรหัสผ่าน",
      details: "รหัสผ่านใหม่",
      timestamp: "2025-04-01 18:45",
    },
    {
      id: 4,
      user: "Alice Brown",
      action: "เพิ่มผู้ใช้",
      details: "เพิ่ม 'Tom Holland'",
      timestamp: "2025-04-02 12:00",
    },
    {
      id: 5,
      user: "Bob White",
      action: "แก้ไขบทความ",
      details: "อัปเดต 'ข่าวฟุตบอล'",
      timestamp: "2025-04-03 15:30",
    },
    {
      id: 6,
      user: "Chris Green",
      action: "เพิ่มหมวดหมู่",
      details: "เพิ่ม 'บทวิเคราะห์'",
      timestamp: "2025-04-03 16:45",
    },
    {
      id: 7,
      user: "Chris Green",
      action: "เพิ่มหมวดหมู่",
      details: "เพิ่ม 'บทวิเคราะห์'",
      timestamp: "2025-04-03 16:45",
    },
    {
      id: 8,
      user: "Chris Green",
      action: "เพิ่มหมวดหมู่",
      details: "เพิ่ม 'บทวิเคราะห์'",
      timestamp: "2025-04-03 16:45",
    },
    {
      id: 9,
      user: "Chris Green",
      action: "เพิ่มหมวดหมู่",
      details: "เพิ่ม 'บทวิเคราะห์'",
      timestamp: "2025-04-03 16:45",
    },
    {
      id: 10,
      user: "Chris Green",
      action: "เพิ่มหมวดหมู่",
      details: "เพิ่ม 'บทวิเคราะห์'",
      timestamp: "2025-04-03 16:45",
    },
    {
      id: 11,
      user: "Chris Green",
      action: "เพิ่มหมวดหมู่",
      details: "เพิ่ม 'บทวิเคราะห์'",
      timestamp: "2025-04-03 16:45",
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(activityLog.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedLogs = activityLog.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="flex justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full text-center">
        <h1 className="text-2xl text-left font-bold mb-4">ประวัติการดำเนินการ</h1>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">ผู้ใช้งาน</th>
              <th className="border p-2">การกระทำ</th>
              <th className="border p-2">รายละเอียด</th>
              <th className="border p-2">เวลา</th>
            </tr>
          </thead>
          <tbody>
            {selectedLogs.map((log, index) => (
              <tr key={log.id} className="border">
                <td className="border p-2">{startIndex + index + 1}</td>
                <td className="border p-2">{log.user}</td>
                <td className="border p-2">{log.action}</td>
                <td className="border p-2">{log.details}</td>
                <td className="border p-2">{log.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ActivityLog;
