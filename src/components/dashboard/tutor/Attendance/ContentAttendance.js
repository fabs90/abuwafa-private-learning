import TutorTable from "../TutorTable";
import TutorAttendanceData from "./TutorAttendanceData.json";
export default function ContentAttendanceTutor(params) {
  return (
    <>
      <TutorTable
        data={TutorAttendanceData}
        isAttendance={true}
        hiddenColumns={["date", "status", "slug"]}
      />
    </>
  );
}
