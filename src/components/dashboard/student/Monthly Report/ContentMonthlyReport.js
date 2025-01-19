"use client";
import { Grid2X2 } from "lucide-react";
import StudentTable from "../StudentTable";
import MonthlyReportData from "./MonthlyReportData.json";
import { Breadcrumb } from "../../admin/Components/Breadcrumb";
import Loading from "@/app/dashboard/admin/monthly-report/loading";
import { useState } from "react";

export default function ContentMonthlyReport(params) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

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
      <StudentTable data={MonthlyReportData} isMonthlyReport={true} />
    </>
  );
}
