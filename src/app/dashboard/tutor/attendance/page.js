import ContentAttendanceTutor from "@/components/dashboard/tutor/Attendance/ContentAttendance";
import DashboardLayoutTutor from "@/components/dashboard/tutor/DashboardLayoutTutor";

export default function TutorAttendance() {
  return (
    <>
      <div className="h-screen flex flex-col overflow-hidden">
        <div className="flex-1 overflow-x-auto">
          <DashboardLayoutTutor>
            <ContentAttendanceTutor />
          </DashboardLayoutTutor>
          ;
        </div>
      </div>
    </>
  );
}
