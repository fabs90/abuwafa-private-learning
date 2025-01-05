import { Plus } from "lucide-react";
import Link from "next/link";
export default function TutorTable({
  data = null,
  isAttendance = false,
  hiddenColumns = [],
  showDetail = false,
  title = "",
}) {
  if (data == null) {
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

  const columns = data.length > 0 ? Object.keys(data[0]) : [];
  const visibleColumns = columns.filter((key) => !hiddenColumns.includes(key));

  return (
    <div className="overflow-x-auto text-center">
      <table className="min-w-full border-collapse rounded-lg bg-white">
        <thead>
          <tr className="bg-gray-200">
            <th className="rounded-tl-lg">No.</th>
            {visibleColumns.map((key, index) => (
              <th key={index} className="px-4 py-2 capitalize">
                {key}
              </th>
            ))}
            {isAttendance && <th className="px-4 py-2 capitalize">Actions</th>}
            {showDetail && (
              <th className="px-4 py-2 capitalize rounded-tr-lg">Detail</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-100 capitalize">
              <td className="px-4 py-2">{rowIndex + 1}</td>
              {visibleColumns.map((key, colIndex) => (
                <td key={colIndex} className="px-4 py-2">
                  {item[key]}
                </td>
              ))}
              {isAttendance && (
                <td className="p-4">
                  <Link
                    href={`attendance/${item.slug}/create`}
                    className="btn btn-primary text-white"
                  >
                    <Plus />
                    Fill
                  </Link>
                </td>
              )}
              {showDetail && (
                <td>
                  <Link
                    href={`/dashboard/tutor/${title}/${item.id}`}
                    className="text-blue-500 underline"
                  >
                    View Details
                  </Link>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
