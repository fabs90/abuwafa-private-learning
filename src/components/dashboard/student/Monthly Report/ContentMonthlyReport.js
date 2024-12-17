import StudentTable from "../StudentTable";
import MonthlyReportData from "./MonthlyReportData.json";
export default function ContentMonthlyReport(params) {
  return (
    <>
      <StudentTable data={MonthlyReportData} />
    </>
  );
}
