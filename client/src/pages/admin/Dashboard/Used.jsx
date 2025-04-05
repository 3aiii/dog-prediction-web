import React, { useEffect, useState } from "react";
import Pagination from "../../../components/Pagination";
import { history } from "../../../composables/dogService";
import { formatThaiDate } from "../../../utils/formatDate";
import { Link } from "react-router-dom";

const ActivityLog = () => {
  const [historys, setHistorys] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;

  useEffect(() => {
    const fetchHistory = async () => {
      const { data } = await history(currentPage, itemsPerPage);
      setHistorys(data);
    };
    fetchHistory();
  }, [currentPage]);
  return (
    <div className="flex justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full text-center">
        <h1 className="text-2xl text-left font-bold mb-4">
          ประวัติการดำเนินการ
        </h1>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">ผู้ใช้งาน</th>
              <th className="border p-2">ใช้โมเดล</th>
              <th className="border p-2">เปอร์เซ็น (%)</th>
              <th className="border p-2">วันเวลาที่ใช้งาน</th>
              <th className="border p-2 w-48"></th>
            </tr>
          </thead>
          <tbody>
            {historys?.history?.map((his, index) => (
              <tr key={index} className="border">
                <td className="border p-2">{startIndex + index + 1}</td>
                <td className="border p-2">{his.userDetail.email}</td>
                <td className="border p-2">
                  {his.model_used.replace("model", "")}
                </td>
                <td className="border p-2">{his.percentage} </td>

                <td className="border p-2">{formatThaiDate(his.createdAt)}</td>
                <td className="border p-2">
                  <Link
                    to={`/admin/used/${his.prediction_id}`}
                    className="bg-blue-500 transition hover:bg-blue-600 text-white px-2 py-1 rounded mr-2"
                  >
                    ดูเพิ่มเติม
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          currentPage={currentPage}
          totalPages={historys?.pagination?.totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ActivityLog;
