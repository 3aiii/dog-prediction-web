import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getHistory } from "../../../composables/dogService";
import { IMAGE_URL } from "../../../secret";
import { formatThaiDate } from "../../../utils/formatDate";
import { BsFillClipboardDataFill } from "react-icons/bs";

const InfoRow = ({ label, value }) => (
  <tr className="border-b">
    <td className="font-semibold py-2">{label}:</td>
    <td className="py-2">{value || "ไม่ระบุ"}</td>
  </tr>
);

const View = () => {
  const { id } = useParams();
  const [history, setHistory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getHistory(id);
      setHistory(data?.history);
    };

    fetchData();
  }, [id]);

  if (!history) return <p>Loading...</p>;

  return (
    <div className="flex gap-4 w-full">
      {/* Image Section */}
      <div className="w-1/3 h-fit bg-white rounded-md p-6 shadow-lg">
        <img
          src={`${IMAGE_URL}/${history.image}`}
          alt="Predicted Dog"
          className="w-full h-[250px] object-cover rounded-md"
        />
      </div>

      {/* Details Section */}
      <div className="w-2/3 bg-white rounded-md p-6 shadow-lg">
        <h1 className="text-3xl font-semibold mb-4">ข้อมูลการใช้งานโมเดล</h1>

        {/* Model Information */}
        <table className="w-full text-left table-fixed">
          <tbody className="text-gray-700">
            <InfoRow
              label="วันที่ทำนาย"
              value={formatThaiDate(history.createdAt)}
            />
            <InfoRow
              label="โมเดลที่ใช้"
              value={history.model_used.replace("model", "").toUpperCase()}
            />
            <InfoRow
              label="สายพันธุ์ที่คาดว่า"
              value={
                history.breedDetail
                  ? history.breedDetail.name
                  : "ไม่ทราบสายพันธุ์"
              }
            />
            <InfoRow
              label="ความมั่นใจ"
              value={
                history.percentage ? (
                  <span
                    className={`px-2 py-1 text-white bg-blue-500 rounded-md text-sm`}
                  >{`${history.percentage}%`}</span>
                ) : (
                  "ไม่ระบุ"
                )
              }
            />
            <InfoRow label="ผู้ใช้งาน" value={history.userDetail.email} />
            <InfoRow label="ชื่อ" value={history.userDetail.fname} />
            <InfoRow label="นามสกุล" value={history.userDetail.lname} />
            <InfoRow
              label="บทบาท"
              value={
                <span
                  className={`px-3 py-1 text-white ${
                    history.userDetail.role === "USER"
                      ? "bg-green-500"
                      : "bg-red-500"
                  } rounded-md text-sm`}
                >
                  {history.userDetail.role}
                </span>
              }
            />
          </tbody>
        </table>

        {history.breedDetail && (
          <>
            {/* Breed Information Section */}
            <h1 className="flex items-center gap-2 text-xl text-gray-700 font-semibold my-4">
              <BsFillClipboardDataFill size={20} />
              ข้อมูลสายพันธุ์
            </h1>
            <table className="w-full text-left table-fixed">
              <tbody className="text-gray-700">
                <InfoRow label="ลักษณะ" value={history.breedDetail.nature} />
                <InfoRow label="นิสัย" value={history.breedDetail.habits} />
                <InfoRow
                  label="การดูแล"
                  value={history.breedDetail.husbandry}
                />
                <InfoRow
                  label="ถิ่นกำเนิด"
                  value={history.breedDetail.origin}
                />
              </tbody>
            </table>
          </>
        )}

        {/* Back Button */}
        <div className="flex justify-end mt-4">
          <Link
            to={`/admin/used`}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
          >
            ย้อนกลับ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default View;
