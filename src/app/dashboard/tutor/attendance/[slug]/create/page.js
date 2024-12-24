import CreateAttendanceForm from "@/components/dashboard/tutor/Attendance/Create/CreateAttendanceForm";
import DashboardLayoutTutor from "@/components/dashboard/tutor/DashboardLayoutTutor";

export default function Page({ params }) {
  return (
    <>
      <DashboardLayoutTutor>
        <CreateAttendanceForm />
      </DashboardLayoutTutor>
    </>
  );
}
