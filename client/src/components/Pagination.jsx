import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // สร้าง array ของเลขหน้า
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center mt-6 space-x-2">
      {/* ปุ่มก่อนหน้า */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg transition ${
          currentPage === 1
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        }`}
      >
        ◀ ก่อนหน้า
      </button>

      {/* ปุ่มเลขหน้า */}
      {pageNumbers.map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={`px-4 py-2 rounded-lg transition ${
            currentPage === num
              ? "bg-blue-700 text-white font-bold"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {num}
        </button>
      ))}

      {/* ปุ่มถัดไป */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-lg transition ${
          currentPage === totalPages
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        }`}
      >
        ถัดไป ▶
      </button>
    </div>
  );
};

export default Pagination;
