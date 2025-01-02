import { Breadcrumb } from "@/components/dashboard/admin/Components/Breadcrumb";
import DashboardLayoutAdmin from "@/components/dashboard/admin/DashboardLayoutAdmin";
import ContentManageTutor from "@/components/dashboard/admin/Manage/Tutors/ContentManageTutor";
import { Grid2X2 } from "lucide-react";

export default function Page() {
  const breadcrumbItems = [
    { label: "Dashboard", link: "/dashboard/admin", icon: Grid2X2 },
    {
      label: "Manage Tutors",
      link: "/dashboard/admin/manage/tutors",
    },
  ];
  return (
    <>
      <DashboardLayoutAdmin title="Manage Tutors">
        <Breadcrumb items={breadcrumbItems} />
        <ContentManageTutor />
      </DashboardLayoutAdmin>
    </>
  );
}
