"use client";
import { Plus, Search } from "lucide-react";
import { SearchField } from "./SearchField";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function ManagePaycheckTable({
  initialData = [], // Use initialData prop to set initial state
  columnName = [],
  hiddenColumns = [],
  numbering = false,
}) {
  const [data, setData] = useState(initialData); // Initialize state with initialData
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  let [rowsPerPageState, setRowsPerPageState] = useState(5);

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSelectChange = (e) => {
    setRowsPerPageState(e.target.value);
    setCurrentPage(1);
  };

  // Filter data based on search term
  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Calculate range and slice data
  const range = calculateRange(filteredData, rowsPerPageState);
  const paginatedData = sliceData(filteredData, currentPage, rowsPerPageState);

  const columns = data.length > 0 ? Object.keys(data[0]) : [];
  const visibleColumns = columns.filter((key) => !hiddenColumns.includes(key));

  // Delete function
  const handleDelete = async (paycheckId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this paycheck?"
    );
    if (confirmDelete) {
      try {
        const token = Cookies.get("token");
        await axios.delete(`http://localhost:8080/api/paycheck/${paycheckId}`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        // Remove the deleted item from the data
        const updatedData = data.filter((item) => item.id !== paycheckId); // Adjust the key based on your data structure
        setData(updatedData); // Update the state with the new data
        alert("Succesfully deleted data");
        window.location.reload();
      } catch (error) {
        console.error("Error deleting paycheck:", error);
      }
    }
  };

  return (
    <div className="overflow-x-auto text-center me-2">
      {/* Search Input Button */}
      <div className="flex justify-between items-center pt-[15px] px-[15px] w-full rounded-t-lg z-99 gap-4 md:gap-0 lg:gap-0 mb-4">
        <SearchField
          icon={<Search />}
          placeholder="Search by name"
          value={searchTerm}
          fitted={true}
          onChange={handleSearchTerm}
        />
        {/* Per-rows select */}
        <div>
          <select
            className="select select-bordered w-full max-w-xs"
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
      <table className="min-w-full border-collapse bg-white overflow-hidden rounded-t-lg">
        <thead>
          <tr className="bg-gray-200">
            {numbering && <th className="w-1/12 px-4 py-4 ">No.</th>}
            {visibleColumns.map((key, index) => (
              <th key={index} className="w-1/3 px-4 py-4 capitalize">
                {columnName[index] || key}
              </th>
            ))}
            {filteredData.length > 0 ? (
              <th className="px-4 py-2 capitalize flex justify-center items-center flex-wrap">
                <Link
                  href={"paycheck/create"}
                  className="btn btn-primary text-white"
                >
                  <Plus />
                  Add
                </Link>
              </th>
            ) : (
              ""
            )}
          </tr>
        </thead>

        <tbody>
          {filteredData.length > 0 ? (
            paginatedData.map((item, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-100">
                {numbering && (
                  <td className="w-1/12 ">
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
                    <Link
                      href={`${item.slug}/update`}
                      className="btn bg-blueYoender hover:bg-darkerBlueYoender text-white px-3 py-2 "
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id_paycheck)} // Adjust the key based on your data structure
                      className="btn bg-secondarySiena hover:bg-darkerSecondarySiena text-white px-3 py-2 "
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
                colSpan={visibleColumns.length + (numbering ? 2 : 1)} // +2 if "numbering" and "action", otherwise +1
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
