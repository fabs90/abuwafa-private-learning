"use client";

export default function DynamicTable({ data }) {
  // Ambil keys dari objek pertama sebagai kolom (jika data tersedia)
  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div className="overflow-x-auto text-center">
      <table className="min-w-full border-collapse rounded-lg bg-white">
        <thead>
          <tr className="bg-gray-200">
            {columns.map((key, index) => (
              <th
                key={index}
                className={`px-4 py-2 capitalize${
                  index === 0 ? "rounded-tl-lg" : ""
                } ${index === columns.length - 1 ? "rounded-tr-lg" : ""}`}
              >
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-100">
              {columns.map((key, colIndex) => (
                <td
                  key={colIndex}
                  className={`px-4 py-2 ${
                    colIndex === 0 ? "rounded-bl-lg" : ""
                  } ${colIndex === columns.length - 1 ? "rounded-br-lg" : ""}`}
                >
                  {/* Render link jika key adalah "Link" */}
                  {key === "link" && item[key] !== "-" ? (
                    <a
                      href={item[key]}
                      className="text-blue-500 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Click here
                    </a>
                  ) : (
                    item[key]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
