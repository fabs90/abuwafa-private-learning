"use client";

import DashboardLayoutStudent from "@/components/dashboard/student/DashboardLayoutStudent";
import ContentMonthlyReport from "@/components/dashboard/student/Monthly Report/ContentMonthlyReport";
import Template from "@/components/dashboard/student/Monthly Report/Template";

export default function MonthlyReport() {
  return (
    <div className="h-screen overflow-auto">
      <DashboardLayoutStudent>
        <ContentMonthlyReport />
      </DashboardLayoutStudent>
    </div>
  );
}
