"use client";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FormField } from "../../tutor/TutorComponents/InputField";
import { SearchField } from "./SearchField";

export default function ManageAttendanceTable({
  data = null,
  hiddenColumns = [],
  numbering = true,
  isDetailAttendance = false,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPageState, setRowsPerPageState] = useState(5);

  if (!data || data.length === 0) {
    return (
      <div>
        <table className="min-w-full border-collapse rounded-lg bg-white">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 capitalize rounded-tl-lg rounded-tr-lg">
                Data Not Found
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-100">
              <td className="px-4 py-2 text-center">-</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  const handleSelectChange = (e) => {
    setRowsPerPageState(Number(e.target.value));
    setCurrentPage(1);
  };

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const range = calculateRange(filteredData, rowsPerPageState);
  const paginatedData = sliceData(filteredData, currentPage, rowsPerPageState);

  const columns = Object.keys(data[0]);
  const visibleColumns = columns.filter((key) => !hiddenColumns.includes(key));

  return (
    <div className="overflow-x-auto text-center me-2">
      {/* Search and Rows per Page */}
      <div className="flex justify-between items-center pt-4 px-4 w-full gap-4 mb-4">
        <SearchField
          icon={<Search />}
          placeholder="Search by name"
          value={searchTerm}
          fitted
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="select select-bordered max-w-xs"
          value={rowsPerPageState}
          onChange={handleSelectChange}
        >
          <option disabled value="">
            Rows per page
          </option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={30}>30</option>
          <option value={50}>50</option>
        </select>
      </div>

      <table className="min-w-full border-collapse bg-white rounded-t-lg">
        <thead>
          <tr className="bg-gray-200">
            {numbering && <th className="w-1/12 px-4 py-4">No.</th>}
            {visibleColumns.map((key, index) => (
              <th key={index} className="w-1/5 px-4 py-4 capitalize">
                {key}
              </th>
            ))}
            <th className="px-4 py-4 capitalize">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td
                colSpan={visibleColumns.length + (numbering ? 2 : 1)}
                className="px-4 py-4 text-center text-black"
              >
                Data not found
              </td>
            </tr>
          ) : (
            paginatedData.map((item, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-100">
                {numbering && (
                  <td className="px-4 py-2 text-center">
                    {(currentPage - 1) * rowsPerPageState + rowIndex + 1}
                  </td>
                )}
                {visibleColumns.map((key, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-4 py-2 text-center truncate max-w-[300px]"
                  >
                    {key === "attendanceStatus" ? (
                      item[key] ? (
                        <span className="text-green-500 font-bold">✓</span>
                      ) : (
                        <span className="text-red-500 font-bold">✗</span>
                      )
                    ) : (
                      item[key]
                    )}
                  </td>
                ))}
                <td className="text-right px-4 py-2">
                  <Link
                    href={`/dashboard/admin/attendance/${item.slug}/detail`}
                    className="btn bg-primary hover:bg-darkerBlue text-white"
                  >
                    {isDetailAttendance ? "Detail" : "Check"}
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mb-3 p-4 bg-gray-200 rounded-b-lg">
        {range.map((page, index) => (
          <button
            key={index}
            className={`px-3 py-1 rounded ${
              currentPage === page
                ? "bg-blue text-white"
                : "bg-gray-200 text-black hover:bg-blue hover:text-white"
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
}

// Helper Functions
const calculateRange = (data, rowsPerPageState) => {
  const numPages = Math.ceil(data.length / rowsPerPageState);
  return Array.from({ length: numPages }, (_, i) => i + 1);
};

const sliceData = (data, page, rowsPerPageState) => {
  return data.slice((page - 1) * rowsPerPageState, page * rowsPerPageState);
};
