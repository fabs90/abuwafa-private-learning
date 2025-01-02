import { Breadcrumb } from "@/components/dashboard/admin/Components/Breadcrumb";
import DashboardLayoutAdmin from "@/components/dashboard/admin/DashboardLayoutAdmin";
import ContentCreateTutor from "@/components/dashboard/admin/Manage/Tutors/ContentCreateTutor";
import { Grid2X2 } from "lucide-react";

export default function Page(params) {
  return (
    <>
      <DashboardLayoutAdmin title="Create Tutors">
        <Breadcrumb
          items={[
            { label: "Dashboard", link: "/dashboard/admin", icon: Grid2X2 },
            {
              label: "Manage Tutors",
              link: "/dashboard/admin/manage/tutors",
            },
            {
              label: "Create Tutor",
              link: "/dashboard/admin/manage/tutors/create",
            },
          ]}
        />
        <ContentCreateTutor />
      </DashboardLayoutAdmin>
    </>
  );
}
