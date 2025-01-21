"use client";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SearchField } from "./SearchField";
import axios from "axios";
import Cookies from "js-cookie";

export default function ManageStudentAdminTable({
  data = null,
  hiddenColumns = [],
  numbering = true,
  href = "",
  rowsPerPage = 5,
  primary_key = "",
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  let [rowsPerPageState, setRowsPerPageState] = useState(5);
  const token = Cookies.get("token");
  const role = Cookies.get("role");

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmed) {
      console.log("ID: ", id);

      try {
        const response = await axios.delete(
          `https://abuwafa-backend-2583485117.us-central1.run.app/api/students/profile/${id}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        if (response.status === 200) {
          alert("Item deleted successfully!");
          // Perbarui data tanpa reload halaman
          window.location.reload();
        } else {
          alert("Failed to delete the item. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting item:", error);
        alert("An error occurred while trying to delete the item.");
      }
    }
  };

  // Default `data` to an empty array if it's null
  const tableData = data || [];

  const handleSelectChange = (e) => {
    setRowsPerPageState(Number(e.target.value));
    setCurrentPage(1);
  };

  // Filter data based on search term
  const filteredData = tableData.filter((item) =>
    Object.values(item).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Calculate range and slice data
  const range = calculateRange(filteredData, rowsPerPageState);
  const paginatedData = sliceData(filteredData, currentPage, rowsPerPageState);

  const columns = tableData.length > 0 ? Object.keys(tableData[0]) : [];
  const visibleColumns = columns.filter((key) => !hiddenColumns.includes(key));

  if (!data || data.length === 0) {
    return (
      <div className="px-1">
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

  return (
    <div className="overflow-x-auto text-center px-1">
      {/* Search Input and Button */}
      <div className="flex justify-between items-center pt-[15px] z-99 mb-4">
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
            className="select select-bordered max-w-xs w-3/4 focus-within:outline-none"
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
      </div>
      <table className="min-w-full border-collapse bg-white overflow-hidden rounded-t-lg">
        <thead>
          <tr className="bg-gray-200">
            {numbering && <th className="w-1/12 px-4 py-2">No.</th>}
            {visibleColumns.map((key, index) => (
              <th key={index} className="w-1/5 px-4 py-2 capitalize">
                {key}
              </th>
            ))}
            <th className="px-4 py-2 flex justify-center items-center flex-wrap">
              <Link href={href} className="btn btn-primary text-white">
                <Plus />
                Add
              </Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            paginatedData.map((item, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-100">
                {numbering && (
                  <td className="w-1/12">
                    {(currentPage - 1) * rowsPerPageState + rowIndex + 1}
                  </td>
                )}
                {visibleColumns.map((key, colIndex) => (
                  <td key={colIndex} className="py-4 md:py-0 lg:py-0">
                    {item[key]}
                  </td>
                ))}
                <td className="px-4 py-2">
                  <div className="flex justify-center items-center gap-2">
                    {/* Update Button */}
                    <Link
                      href={`${item[primary_key]}/update`}
                      className="btn bg-blueYoender hover:bg-darkerBlueYoender text-white px-3 py-2"
                    >
                      Update
                    </Link>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(item.id_student)}
                      className="btn bg-secondarySiena hover:bg-darkerSecondarySiena text-white px-3 py-2"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={visibleColumns.length + (numbering ? 2 : 1)}
                className="text-center py-4"
              >
                Data Not Found
              </td>
            </tr>
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
