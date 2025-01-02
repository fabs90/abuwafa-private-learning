import { Breadcrumb } from "@/components/dashboard/admin/Components/Breadcrumb";
import DashboardLayoutAdmin from "@/components/dashboard/admin/DashboardLayoutAdmin";
import ContentManageStudent from "@/components/dashboard/admin/Manage/Students/ContentManageStudent";
import { Grid2X2 } from "lucide-react";
export default function Page(params) {
  const breadcrumbItems = [
    { label: "Dashboard", link: "/dashboard/admin", icon: Grid2X2 },
    {
      label: "Manage Students",
      link: "/dashboard/admin/manage/students",
    },
  ];
  return (
    <>
      <DashboardLayoutAdmin title="Manage Students">
        <Breadcrumb items={breadcrumbItems} />
        <ContentManageStudent />
      </DashboardLayoutAdmin>
    </>
  );
}
