import ButtonForm from "@/components/button/Button";
import CreateAttendanceForm from "@/components/dashboard/tutor/Attendance/Create/CreateAttendanceForm";
import DashboardLayoutTutor from "@/components/dashboard/tutor/DashboardLayoutTutor";

export default function page(params) {
  return (
    <>
      <DashboardLayoutTutor>
        <CreateAttendanceForm />
      
      </DashboardLayoutTutor>
    </>
  );
}
