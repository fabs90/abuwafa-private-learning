import { Breadcrumb } from "@/components/dashboard/admin/Components/Breadcrumb";
import DashboardLayoutAdmin from "@/components/dashboard/admin/DashboardLayoutAdmin";
import ContentPaycheckAdmin from "@/components/dashboard/admin/Paycheck/ContentPaycheckAdmin";
import { Grid2X2 } from "lucide-react";

export default function Page(params) {
  return (
    <>
      <DashboardLayoutAdmin title="Paycheck">
        <Breadcrumb
          items={[
            { label: "Dashboard", link: "/dashboard/admin", icon: Grid2X2 },
            { label: "Paycheck", link: "/dashboard/admin/paycheck" },
          ]}
        />
        <ContentPaycheckAdmin />
      </DashboardLayoutAdmin>
    </>
  );
}
