import { Breadcrumb } from "@/components/dashboard/admin/Components/Breadcrumb";
import DashboardLayoutAdmin from "@/components/dashboard/admin/DashboardLayoutAdmin";
import ContentCreateStudent from "@/components/dashboard/admin/Manage/Students/ContentCreateStudent";
import { Grid2X2 } from "lucide-react";

export default function Page(params) {
  return (
    <>
      <DashboardLayoutAdmin title="Create Students">
        <Breadcrumb
          items={[
            { label: "Dashboard", link: "/dashboard/admin", icon: Grid2X2 },
            {
              label: "Manage Students",
              link: "/dashboard/admin/manage/students",
            },
            {
              label: "Create Students",
              link: "/dashboard/admin/manage/students/create",
            },
          ]}
        />
        <ContentCreateStudent />
      </DashboardLayoutAdmin>
    </>
  );
}
