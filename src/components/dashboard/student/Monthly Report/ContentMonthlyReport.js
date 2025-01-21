"use client";
import { Grid2X2 } from "lucide-react";
import StudentTable from "../StudentTable";
import { Breadcrumb } from "../../admin/Components/Breadcrumb";
import Loading from "@/app/dashboard/admin/monthly-report/loading";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import generateMonthlyReport from "@/utils/generateMonthlyReport";

export default function ContentMonthlyReport(params) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [monthlyReportData, setMonthlyReportData] = useState(null);
  const [error, setError] = useState(null);
  const date = new Date();
  const [hasGeneratedReport, setHasGeneratedReport] = useState(false); // State to track report generation

  useEffect(() => {
    const token = Cookies.get("token");
    const user_id = Cookies.get("user_id");

    const fetchMonthlyReport = async () => {
      axios
        .get(
          `https://abuwafa-backend-2583485117.us-central1.run.app/api/monthlyreport/detail/${user_id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then((res) => {
          if (!res.data.reports || res.data.reports.length === 0) {
            setMonthlyReportData(null); // Set to null if no reports are found
            setLoading(false);
            return; // Exit the function early
          }

          // Create an array of month names
          const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];

          // Transform the reports to replace month numbers with month names
          const transformedReports = res.data.reports.map((report) => {
            return {
              ...report,
              month: monthNames[report.month - 1], // Convert month number to month name
            };
          });

          setMonthlyReportData(transformedReports);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          throw new Error(`Error fetching monthly report: ${err.message}`);
        });
    };

    const fetchData = async () => {
      try {
        setLoading(true);
        // Check if the report already exists for the current month
        const existingReportCheck = await axios.get(
          `https://abuwafa-backend-2583485117.us-central1.run.app/api/monthlyreport/check/${user_id}/${
            date.getMonth() + 1
          }/${date.getFullYear()}`,
          {
            headers: { Authorization: token },
          }
        );

        if (existingReportCheck.data.exists) {
          console.log("Report already exists for the current month.");
          return;
        }

        const response = await axios.get(
          `https://abuwafa-backend-2583485117.us-central1.run.app/api/attendance/generate/${user_id}`,
          { headers: { Authorization: token } }
        );

        const responseData = response.data.data;
        setData(responseData);

        // Only generate report if we have data and it hasn't been generated this month
        if (responseData && responseData.length > 0 && !hasGeneratedReport) {
          const pdfBlob = await generateMonthlyReport(responseData);
          const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];
          // Create FormData object
          const formData = new FormData();
          formData.append("id_student", user_id);
          formData.append("student_name", responseData[0].student_name);
          formData.append("month", (date.getMonth() + 1).toString());
          formData.append("year", date.getFullYear().toString());
          formData.append(
            "file",
            new File(
              [pdfBlob],
              `Monthly_Report_${responseData[0].student_name}_${
                monthNames[date.getMonth()]
              }_${date.getFullYear()}.pdf`,
              { type: "application/pdf" }
            )
          );

          // Make POST request with FormData
          const createMonthlyReport = await axios.post(
            "https://abuwafa-backend-2583485117.us-central1.run.app/api/monthlyreports",
            formData,
            {
              headers: {
                Authorization: token,
                "Content-Type": "multipart/form-data",
              },
            }
          );

          // Set the flag to true to indicate the report has been generated
          setHasGeneratedReport(true);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token && user_id) {
      fetchMonthlyReport();
      if (date.getDate() === 20) {
        fetchData();
      }
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center my-auto h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <Breadcrumb
        items={[
          { label: "Dashboard", link: "/dashboard/student", icon: Grid2X2 },
          {
            label: "Monthly Report",
            link: "/dashboard/student/monthly-report",
          },
        ]}
      />
      <StudentTable
        data={monthlyReportData}
        isMonthlyReport={true}
        hiddenColumns={["file_path", "id_monthlyReport"]}
      />
    </>
  );
}

// "use client";
// import { Grid2X2 } from "lucide-react";
// import StudentTable from "../StudentTable";
// import { Breadcrumb } from "../../admin/Components/Breadcrumb";
// import Loading from "@/app/dashboard/admin/monthly-report/loading";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";
// import generateMonthlyReport from "@/utils/generateMonthlyReport";

// export default function ContentMonthlyReport(params) {
//   const [loading, setLoading] = useState(true);
//   const [data, setData] = useState(null);
//   const [monthlyReportData, setMonthlyReportData] = useState(null);
//   const [error, setError] = useState(null);
//   const date = new Date();

//   useEffect(() => {
//     const token = Cookies.get("token");
//     const user_id = Cookies.get("user_id");

//     const fetchMonthlyReport = async () => {
//       axios
//         .get(`https://abuwafa-backend-2583485117.us-central1.run.app/api/monthlyreport/detail/${user_id}`, {
//           headers: {
//             Authorization: token,
//           },
//         })
//         .then((res) => {
//           console.log(res);
//           // Check if reports are empty
//           if (!res.data.reports || res.data.reports.length === 0) {
//             setMonthlyReportData(null); // Set to null if no reports are found
//             setLoading(false);
//             return; // Exit the function early
//           }

//           // Create an array of month names
//           const monthNames = [
//             "January",
//             "February",
//             "March",
//             "April",
//             "May",
//             "June",
//             "July",
//             "August",
//             "September",
//             "October",
//             "November",
//             "December",
//           ];

//           // Transform the reports to replace month numbers with month names
//           const transformedReports = res.data.reports.map((report) => {
//             return {
//               ...report,
//               month: monthNames[report.month - 1], // Convert month number to month name
//             };
//           });

//           setMonthlyReportData(transformedReports);
//           setLoading(false);
//         })
//         .catch((err) => {
//           setError(err.message);
//           throw new Error(`Error fetching monthly report: ${err.message}`);
//         });
//     };

//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(
//           `https://abuwafa-backend-2583485117.us-central1.run.app/api/attendance/generate/${user_id}`,
//           { headers: { Authorization: token } }
//         );

//         const responseData = response.data.data;
//         setData(responseData);

//         // Only generate report if we have data
//         if (responseData && responseData.length > 0) {
//           const pdfBlob = await generateMonthlyReport(responseData);
//           const monthNames = [
//             "January",
//             "February",
//             "March",
//             "April",
//             "May",
//             "June",
//             "July",
//             "August",
//             "September",
//             "October",
//             "November",
//             "December",
//           ];
//           // Create FormData object
//           const formData = new FormData();
//           formData.append("id_student", user_id);
//           formData.append("student_name", responseData[0].student_name);
//           formData.append("month", (date.getMonth() + 1).toString());
//           formData.append("year", date.getFullYear().toString());
//           formData.append(
//             "file",
//             new File(
//               [pdfBlob],
//               `Monthly_Report_${responseData[0].student_name}_${
//                 monthNames[date.getMonth()]
//               }_${date.getFullYear()}.pdf`,
//               { type: "application/pdf" }
//             )
//           );

//           // formData.append("file", pdfFile);

//           // Make POST request with FormData
//           const createMonthlyReport = await axios.post(
//             "https://abuwafa-backend-2583485117.us-central1.run.app/api/monthlyreports",
//             formData,
//             {
//               headers: {
//                 Authorization: token,
//                 "Content-Type": "multipart/form-data",
//               },
//             }
//           );
//         }
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (token && user_id) {
//       fetchMonthlyReport();
//       // Check if today is the first day of the month
//       if (date.getDate() === 20) {
//         fetchData();
//       }
//     }
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center my-auto h-screen">
//         <Loading />
//       </div>
//     );
//   }

//   return (
//     <>
//       <Breadcrumb
//         items={[
//           { label: "Dashboard", link: "/dashboard/student", icon: Grid2X2 },
//           {
//             label: "Monthly Report",
//             link: "/dashboard/student/monthly-report",
//           },
//         ]}
//       />
//       <StudentTable
//         data={monthlyReportData}
//         isMonthlyReport={true}
//         hiddenColumns={["file_path", "id_monthlyReport"]}
//       />
//     </>
//   );
// }
