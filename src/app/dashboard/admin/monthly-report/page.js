import { Breadcrumb } from "@/components/dashboard/admin/Components/Breadcrumb";
import DashboardLayoutAdmin from "@/components/dashboard/admin/DashboardLayoutAdmin";
import ContentMonthlyReportAdmin from "@/components/dashboard/admin/Monthly-report/ContentMonthlyReportAdmin";
import { Grid2X2 } from "lucide-react";

export default function Page() {
  return (
    <>
      <DashboardLayoutAdmin title="Monthly Report">
        <Breadcrumb
          items={[
            { label: "Dashboard", link: "/dashboard/admin", icon: Grid2X2 },
            {
              label: "Monthly Report",
              link: "/dashboard/admin/monthly-report",
            },
          ]}
        />
        <ContentMonthlyReportAdmin />
      </DashboardLayoutAdmin>
    </>
  );
}
