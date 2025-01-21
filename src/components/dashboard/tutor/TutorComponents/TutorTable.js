"use client";
import { Download, Plus, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SearchField } from "../../admin/Components/SearchField";
import { generatePDF } from "@/utils/generatePdf";
import Cookies from "js-cookie";

export default function TutorTable({
  data = null,
  isAttendance = false,
  hiddenColumns = [],
  showDetail = false,
  title = "Paycheck",
  rowsPerPage = 5,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPageState, setRowsPerPageState] = useState(rowsPerPage);

  if (!data) {
    return (
      <div>
        <table className="min-w-full border-collapse rounded-lg bg-white z-50">
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

  // Filter and paginate data
  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      typeof value === "string" || typeof value === "number"
        ? value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        : false
    )
  );

  const range = calculateRange(filteredData, rowsPerPageState);
  const paginatedData = sliceData(filteredData, currentPage, rowsPerPageState);

  const visibleColumns =
    data.length > 0
      ? Object.keys(data[0]).filter((key) => !hiddenColumns.includes(key))
      : [];

  // Handlers
  const handleSelectChange = (e) => {
    setRowsPerPageState(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleDownload = async (item) => {
    try {
      // Get the file from the backend
      const response = await fetch(
        `https://abuwafa-backend-2583485117.us-central1.run.app/api/paycheck/download/${item.id_paycheck}`,
        {
          headers: {
            Authorization: `${Cookies.get("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("File download failed");
      }

      // Get the filename from the response headers or use a default name
      const filename =
        response.headers.get("content-disposition")?.split("filename=")[1] ||
        item.file;

      // Convert response to blob
      const blob = await response.blob();

      // Create a link element and trigger download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download file");
    }
  };

  return (
    <div className="overflow-x-auto text-center">
      {/* Search and Per-rows select */}
      <div className="flex justify-between items-center pt-4 mb-4">
        <SearchField
          icon={<Search />}
          placeholder="Search by name"
          value={searchTerm}
          fitted={true}
          onChange={handleSearchChange}
        />
        <select
          className="select select-bordered max-w-xs w-3/4 focus:outline-none"
          value={rowsPerPageState}
          onChange={handleSelectChange}
        >
          <option disabled value="">
            Rows per-page
          </option>
          {[5, 10, 30, 50].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      <table className="min-w-full border-collapse rounded-t-lg bg-white">
        {filteredData.length > 0 ? (
          <>
            <thead>
              <tr className="bg-gray-200">
                <th className="rounded-tl-lg">No.</th>
                {visibleColumns.map((key) => (
                  <th key={key} className="px-4 py-4 capitalize">
                    {key}
                  </th>
                ))}
                {isAttendance && (
                  <th className="px-4 py-2 capitalize rounded-tr-lg">
                    Actions
                  </th>
                )}
                {showDetail && (
                  <th className="px-4 py-2 capitalize">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-4 py-4">{index + 1}</td>
                  {visibleColumns.map((key) => (
                    <td key={key} className="px-4 py-2">
                      {item[key]}
                    </td>
                  ))}
                  {isAttendance && (
                    <td className="p-4">
                      <Link
                        href={`attendance/${item?.id_tutor}/create`}
                        className="btn btn-primary text-white flex items-center"
                      >
                        <Plus className="mr-2" />
                        Fill
                      </Link>
                    </td>
                  )}
                  {showDetail && (
                    <td className="text-center">
                      <button
                        onClick={() => handleDownload(item)}
                        className="btn mx-auto btn-success flex items-center justify-center"
                      >
                        <Download className="mr-2" />
                        Download
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </>
        ) : (
          <>
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 capitalize rounded-tl-lg rounded-tr-lg">
                  Data Not Found
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>-</td>
              </tr>
            </tbody>
          </>
        )}
      </table>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mb-3 p-4 bg-gray-200 w-full rounded-b-lg">
        {range.map((page) => (
          <button
            key={page}
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
const calculateRange = (data, rowsPerPage) => {
  const total = Math.ceil(data.length / rowsPerPage);
  return Array.from({ length: total }, (_, i) => i + 1);
};

const sliceData = (data, page, rowsPerPage) => {
  const start = (page - 1) * rowsPerPage;
  return data.slice(start, start + rowsPerPage);
};
