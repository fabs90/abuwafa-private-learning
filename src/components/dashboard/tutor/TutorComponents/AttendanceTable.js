export default function AttendanceTable({
  data = null,
  hiddenColumns = [],
  numbering = false,
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
      <table className="min-w-full border-collapse bg-white">
        <thead>
          <tr className="bg-gray-200">
            {numbering && <th className="rounded-tl-lg">No.</th>}
            {visibleColumns.map((key, index) => (
              <th key={index} className="px-4 py-2 capitalize">
                {key}
              </th>
            ))}
            {/* {isAttendance && <th className="px-4 py-2 capitalize">Actions</th>} */}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-100 capitalize">
              {numbering && <td className="px-4 py-2">{rowIndex + 1}</td>}
              {visibleColumns.map((key, colIndex) => (
                <td key={colIndex} className="px-4 py-2">
                  {item[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
