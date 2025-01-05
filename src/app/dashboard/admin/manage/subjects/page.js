import { Breadcrumb } from "@/components/dashboard/admin/Components/Breadcrumb";
import DashboardLayoutAdmin from "@/components/dashboard/admin/DashboardLayoutAdmin";
import ContentManageSubject from "@/components/dashboard/admin/Manage/Subjects/ContentManageSubject";
import { Grid2X2 } from "lucide-react";

export default function Page(params) {
  const breadcrumbItems = [
    { label: "Dashboard", link: "/dashboard/admin", icon: Grid2X2 },
    {
      label: "Manage Subjects",
      link: "/dashboard/admin/manage/subjects",
    },
  ];
  return (
    <>
      <DashboardLayoutAdmin title="Manage Subjects">
        <Breadcrumb items={breadcrumbItems} />
        <ContentManageSubject />
      </DashboardLayoutAdmin>
    </>
  );
}
