import ManageTutortable from "../../Components/ManageTutorTable";
import ScheduleData from "../../../student/ScheduleData.json";
export default function ContentManageSchedules(params) {
  const data = [];
  return (
    <>
      <ManageTutortable data={ScheduleData} rowsPerPage={5} />
    </>
  );
}
