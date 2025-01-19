import { Breadcrumb } from "@/components/dashboard/admin/Components/Breadcrumb";
import DashboardLayoutAdmin from "@/components/dashboard/admin/DashboardLayoutAdmin";
import ContentManageSchedules from "@/components/dashboard/admin/Manage/Schedules/ContentManageSchedules";
import { Grid2X2 } from "lucide-react";

export default function Page(params) {
  const breadcrumbItems = [
    { label: "Dashboard", link: "/dashboard/admin", icon: Grid2X2 },
    {
      label: "Manage Schedules",
      link: "/dashboard/admin/manage/schedules",
    },
  ];

  return (
    <>
      <DashboardLayoutAdmin title="Manage Schedules">
        <Breadcrumb items={breadcrumbItems} />
        <ContentManageSchedules />
      </DashboardLayoutAdmin>
    </>
  );
}
