"use client";

import generateInvoice from "@/utils/generateInvoice";
import generateMonthlyReport from "@/utils/generateMonthlyReport";
import { Download } from "lucide-react";

export default function StudentTable({
  data,
  hiddenColumns = [],
  isMonthlyReport = false,
  isInvoice = false,
}) {
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
                      >
                        Click Here
                      </a>
                    )}
                  </td>
                ))}

                {isMonthlyReport && (
                  <td className="px-4 py-3">
                    <a
                      onClick={() => generateMonthlyReport(item)}
                      className="btn btn-success text-white cursor-pointer"
                      rel="noopener noreferrer"
                    >
                      <Download />
                      Download
                    </a>
                  </td>
                )}
                {isInvoice && (
                  <td className="px-4 py-3">
                    <a
                      onClick={() => generateInvoice(item)}
                      className="btn btn-success text-white cursor-pointer"
                      rel="noopener noreferrer"
                    >
                      <Download />
                      Download
                    </a>
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
