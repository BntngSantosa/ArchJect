import React from "react";

export default function Pagintaion({
    currentPage,
    setCurrentPage,
    totalPages,}) {
  return (
    <div className="flex justify-center mt-6 gap-2 text-sm">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="cursor-pointer px-3 py-1 bg-[#56DFCF] rounded text-black/70 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>

      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => setCurrentPage(i + 1)}
          className={`cursor-pointer px-3 py-1 rounded ${
            currentPage === i + 1 ? "bg-[#56df94] text-white" : "bg-white"
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="cursor-pointer px-3 py-1 bg-[#56DFCF] rounded text-black/70 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
}
