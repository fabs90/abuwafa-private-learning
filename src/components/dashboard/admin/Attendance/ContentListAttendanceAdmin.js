import ManageAttendaceTable from "../Components/ManageAttendanceTable";
import datas from "./TutorAttendanceData.json";
export default function ContentListAttendanceAdmin() {
  return (
    <>
      <ManageAttendaceTable
        data={datas}
        hiddenColumns={["id", "slug"]}
        isDetailAttendance={true}
      />
    </>
  );
}
