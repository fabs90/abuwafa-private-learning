import { Grid2X2 } from "lucide-react";
import StudentTable from "../StudentTable";
import MonthlyReportData from "./MonthlyReportData.json";
import { Breadcrumb } from "../../admin/Components/Breadcrumb";
export default function ContentMonthlyReport(params) {
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
      <StudentTable data={MonthlyReportData} isMonthlyReport={true} />
    </>
  );
}
