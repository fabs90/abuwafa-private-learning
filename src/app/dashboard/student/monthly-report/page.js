"use client";

import DashboardLayoutStudent from "@/components/dashboard/student/DashboardLayoutStudent";
import ContentMonthlyReport from "@/components/dashboard/student/Monthly Report/ContentMonthlyReport";

export default function MonthlyReport() {
  return (
    <div className="h-screen">
      <DashboardLayoutStudent>
        <ContentMonthlyReport />
      </DashboardLayoutStudent>
    </div>
  );
}
