import ContentAttendanceAdmin from "@/components/dashboard/admin/Attendance/ContentAttendanceAdmin";
import DashboardLayoutAdmin from "@/components/dashboard/admin/DashboardLayoutAdmin";

export default function Page() {
  return (
    <DashboardLayoutAdmin title="Tutor Attendance">
      <ContentAttendanceAdmin />
    </DashboardLayoutAdmin>
  );
}
