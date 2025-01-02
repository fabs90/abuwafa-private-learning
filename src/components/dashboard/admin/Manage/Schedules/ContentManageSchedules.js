import ManageTutortable from "../../Components/ManageTutorTable";
import ScheduleData from "../../../student/ScheduleData.json";
export default function ContentManageSchedules() {
  return (
    <>
      <ManageTutortable
        data={ScheduleData}
        rowsPerPage={5}
        href="/dashboard/admin/manage/schedules/create"
      />
    </>
  );
}
