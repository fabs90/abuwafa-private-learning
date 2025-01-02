import ContentListAttendanceAdmin from "@/components/dashboard/admin/Attendance/ContentListAttendanceAdmin";
import { Breadcrumb } from "@/components/dashboard/admin/Components/Breadcrumb";
import DashboardLayoutAdmin from "@/components/dashboard/admin/DashboardLayoutAdmin";
import { Grid2X2, UserCheck } from "lucide-react";
export default function Page({ params }) {
  const breadcrumbItems = [
    { label: "Dashboard", link: "/dashboard/admin", icon: Grid2X2 },
    {
      label: "Attendance",
      link: "/dashboard/admin/attendance",
      icon: UserCheck,
    },
    {
      label: "Attendance List",
      link: "/dashboard/admin/attendance/slug/list",
    },
  ];
  return (
    <>
      <DashboardLayoutAdmin title={`List Attendance ${params.slug}`}>
        <Breadcrumb items={breadcrumbItems} />
        <ContentListAttendanceAdmin />
      </DashboardLayoutAdmin>
    </>
  );
}
