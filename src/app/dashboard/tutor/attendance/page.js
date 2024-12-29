import ContentAttendanceTutor from "@/components/dashboard/tutor/Attendance/ContentAttendance";
import DashboardLayoutTutor from "@/components/dashboard/tutor/DashboardLayoutTutor";

export default function TutorAttendance() {
  return (
    <>
      <DashboardLayoutTutor title="Attendance">
        <ContentAttendanceTutor />
      </DashboardLayoutTutor>
    </>
  );
}
