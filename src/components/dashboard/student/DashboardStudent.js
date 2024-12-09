"use client";
import StudentTable from "./StudentTable";
import ScheduleData from "./ScheduleData.json";
import DashboardLayoutStudent from "./DashboardLayoutStudent";
export default function DashboardStudent() {
  return (
    <DashboardLayoutStudent>
      <StudentTable data={ScheduleData} />
    </DashboardLayoutStudent>
  );
}
