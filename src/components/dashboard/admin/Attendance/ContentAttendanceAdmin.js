import { Grid2x2, UserCheck } from "lucide-react";
import { Breadcrumb } from "../Components/Breadcrumb";
import ManageAttendaceTable from "../Components/ManageAttendanceTable";
import ManageAttendanceFitTable from "../Components/ManageAttendanceFitTable";
export default function ContentAttendanceAdmin() {
  const tutorName = [
    {
      id: 1,
      name: "John Doe",
      slug: "john-doe",
    },
    {
      id: 2,
      name: "John Smith",
      slug: "john-smith",
    },
    {
      id: 3,
      name: "Siti Nurbaya",
      slug: "siti-nurbaya",
    },
    {
      id: 4,
      name: "Ethan Hunt",
      slug: "ethan-hunt",
    },
    {
      id: 5,
      name: "James Bond",
      slug: "james-bond",
    },
  ];
  const breadcrumbItems = [
    { label: "Dashboard", link: "/dashboard/admin", icon: Grid2x2 },
    {
      label: "Attendance",
      link: "/dashboard/admin/attendance",
      icon: UserCheck,
    },
  ];
  return (
    <>
      <div className="flex justify-between">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <ManageAttendanceFitTable
        data={tutorName}
        hiddenColumns={["id", "slug"]}
      />
    </>
  );
}
