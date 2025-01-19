"use client";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FormField } from "../../tutor/TutorComponents/InputField";
import { SearchField } from "./SearchField";

export default function ManageAttendanceFitTable({
  data = null,
  hiddenColumns = [],
  numbering = true,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  let [rowsPerPageState, setRowsPerPageState] = useState(5);

  if (data == null) {
    return (
      <div className="px-1">
        <table className="table-auto min-w-full border-collapse rounded-lg bg-white">
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
    setRowsPerPageState(e.target.value);
    setCurrentPage(1);
  };

  // Filter data based on search term
  const filteredData = data.filter((item) =>
    Object.values(item).some(
      (value) =>
        value != null && // Check if value is not null or undefined
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Calculate range and slice data
  const range = calculateRange(filteredData, rowsPerPageState);
  const paginatedData = sliceData(filteredData, currentPage, rowsPerPageState);

  const columns = data.length > 0 ? Object.keys(data[0]) : [];
  const visibleColumns = columns.filter((key) => !hiddenColumns.includes(key));

  return (
    <div className="overflow-x-auto text-center px-1">
      {/* Search Input Button */}
      <div className="flex justify-between items-center pt-4 w-full rounded-t-lg z-99 gap-4 md:gap-0 lg:gap-0 mb-4">
        <SearchField
          icon={<Search />}
          placeholder="Search by name"
          value={searchTerm}
          fitted={true}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* Per-rows select */}
        <div className="flex justify-end">
          <select
            className="select select-bordered w-3/4 max-w-xs focus-within:outline-none"
            value={rowsPerPageState}
            onChange={handleSelectChange}
          >
            <option disabled value="">
              Rows per-page
            </option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
      <table className="table-auto min-w-full border-collapse bg-white overflow-hidden rounded-t-lg">
        <thead>
          <tr className="bg-gray-200">
            {numbering && <th className="w-1/12 px-4 py-4 text-center">No.</th>}
            {visibleColumns.map((key, index) => (
              <th
                key={index}
                className="px-4 py-4 capitalize text-center min-w-[150px] max-w-[300px]"
              >
                {key}
              </th>
            ))}
            <th className="px-10 py-4 capitalize text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 ? (
            <tr>
              <td
                colSpan={visibleColumns.length + (numbering ? 2 : 1)} // Tambahkan kolom untuk "No." dan "Action" jika ada numbering
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
                    {key === "attendance_status" ? (
                      item[key]?.trim().toLowerCase() === "present" ? (
                        <span className="text-green-500 font-bold">✓</span>
                      ) : (
                        <span className="text-red-500 font-bold">✗</span>
                      )
                    ) : (
                      item[key]
                    )}
                  </td>
                ))}
                <td className="text-right px-4 py-2 flex justify-end">
                  <Link
                    href={`attendance/${item["id_schedule"]}/list`}
                    className="btn bg-primary hover:bg-darkerBlueYoender text-white me-4"
                  >
                    Check
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-2 mb-3 p-4 bg-gray-200 w-full rounded-b-lg z-99">
        {range.map((page, index) => (
          <button
            key={index}
            className={`px-3 py-1 rounded ${
              currentPage === page
                ? "bg-blueYoender text-white"
                : "bg-gray-200 text-black hover:bg-blueYoender hover:text-white"
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

// Helper functions
const calculateRange = (data, rowsPerPageState) => {
  const range = [];
  const num = Math.ceil(data.length / rowsPerPageState);
  for (let i = 1; i <= num; i++) {
    range.push(i);
  }
  return range;
};

const sliceData = (data, page, rowsPerPageState) => {
  return data.slice((page - 1) * rowsPerPageState, page * rowsPerPageState);
};
