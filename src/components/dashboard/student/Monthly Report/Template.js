export default function Template(params) {
  return (
    <div className="max-w-3xl mx-auto p-8 bg-teal-500 container-template">
      <div
        className="border-white border-white-template"
        style={{ borderWidth: "15px" }}
      >
        <div
          className="border-red-950 border-red-950-template"
          style={{ borderWidth: "10px" }}
        >
          <div
            className="bg-white p-8  border-4 border-red-400"
            style={{ borderWidth: "13px" }}
          >
            <div className="text-center mb-8">
              <img
                src="/img/abuwafalogo.png"
                alt="Abuwafa Logo"
                className="mx-auto mb-4 w-36"
              />
              <h1 className="text-3xl  mt-4">MONTHLY REPORT</h1>
              <h2 className="text-xl mt-2">SEPTEMBER 2024</h2>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <span className="font-bold">NAME: </span>
                <span>THARIQ(2024050026)</span>
              </div>
              <div>
                <span className="font-bold">SUBJECT/LEVEL: </span>
                <span>ENGLISH & INTER CUR</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th>DATE</th>
                    <th>SUB</th>
                    <th>TUTOR</th>
                    <th>TOPIC</th>
                    <th>RESULT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1 Sept 24</td>
                    <td>Math</td>
                    <td>Ms. Dinda</td>
                    <td>
                      Numbers (Working on excercies and a little introduction)
                    </td>
                    <td>
                      Good at numbers, but need to practice more to solve
                      numbers problem.
                    </td>
                  </tr>
                  <tr>
                    <td>1 Sept 24</td>
                    <td>Math</td>
                    <td>Ms. Dinda</td>
                    <td>
                      Numbers (Working on excercies and a little introduction)
                    </td>
                    <td>
                      Good at numbers, but need to practice more to solve
                      numbers problem.
                    </td>
                  </tr>
                  <tr>
                    <td>1 Sept 24</td>
                    <td>Math</td>
                    <td>Ms. Dinda</td>
                    <td>
                      Numbers (Working on excercies and a little introduction)
                    </td>
                    <td>
                      Good at numbers, but need to practice more to solve
                      numbers problem.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
