"use client";

import generateInvoice from "@/utils/generateInvoice";
import generateMonthlyReport from "@/utils/generateMonthlyReport";
import Cookies from "js-cookie";
import { Download } from "lucide-react";

export default function StudentTable({
  data,
  hiddenColumns = [],
  isMonthlyReport = false,
  isInvoice = false,
}) {
  const handleDownload = async (item) => {
    try {
      // Get the file from the backend
      const response = await fetch(
        `http://localhost:8080/api/monthlyreports/download/${item.id_monthlyReport}`,
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
        item.file_path;

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

  const handleInvoiceDownload = async (item) => {
    try {
      // Get the file from the backend
      const response = await fetch(
        `http://localhost:8080/api/invoice/download/${item.id_invoice}`,
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

  if (!data || data.length === 0) {
    return (
      <>
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
      </>
    );
  }

  // Filter visible columns based on hiddenColumns
  const visibleColumns = Object.keys(data[0]).filter(
    (key) => !hiddenColumns.includes(key)
  );

  return (
    <>
      <div className="overflow-x-auto text-center">
        <table className="min-w-full border-collapse rounded-lg bg-white">
          <thead>
            <tr className="bg-gray-200">
              {visibleColumns.map((key, index) => (
                <th
                  key={index}
                  className={`px-4 py-3 capitalize ${
                    index === 0 ? "rounded-tl-lg" : ""
                  } ${index === visibleColumns.length - 1 ? "" : ""}`}
                >
                  {key}
                </th>
              ))}
              {isMonthlyReport && (
                <th className="px-4 py-3 rounded-tr-lg capitalize">Action</th>
              )}
              {isInvoice && (
                <th className="px-4 py-3 rounded-tr-lg capitalize">Action</th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((item, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-100">
                {visibleColumns.map((key, colIndex) => (
                  <td
                    key={colIndex}
                    className={`px-4 py-3 ${
                      colIndex === 0 ? "rounded-bl-lg" : ""
                    } ${
                      colIndex === visibleColumns.length - 1
                        ? "rounded-br-lg"
                        : ""
                    }`}
                  >
                    {/* Render the value for each cell */}
                    {key !== "link" ? (
                      item[key]
                    ) : (
                      <a
                        href={item.link}
                        className="text-blue-500 cursor-pointer"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        Click Here
                      </a>
                    )}
                  </td>
                ))}

                {isMonthlyReport && (
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDownload(item)}
                      className="btn btn-success text-white cursor-pointer"
                      rel="noopener noreferrer"
                    >
                      <Download />
                      Download
                    </button>
                  </td>
                )}
                {isInvoice && (
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleInvoiceDownload(item)}
                      className="btn btn-success text-white cursor-pointer"
                      rel="noopener noreferrer"
                    >
                      <Download />
                      Download
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
