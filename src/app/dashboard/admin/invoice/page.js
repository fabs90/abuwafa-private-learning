import { Breadcrumb } from "@/components/dashboard/admin/Components/Breadcrumb";
import ManageInvoiceTable from "@/components/dashboard/admin/Components/ManageInvoiceTable";
import DashboardLayoutAdmin from "@/components/dashboard/admin/DashboardLayoutAdmin";
import ContentInvoiceAdmin from "@/components/dashboard/admin/Invoice/ContentInvoiceAdmin";
import { Grid2X2 } from "lucide-react";

export default function Page(params) {
  return (
    <>
      <DashboardLayoutAdmin title="Invoice">
        <Breadcrumb
          items={[
            { label: "Dashboard", link: "/dashboard/admin", icon: Grid2X2 },
            { label: "Invoice", link: "/dashboard/admin/invoice" },
          ]}
        />
        <ContentInvoiceAdmin />
      </DashboardLayoutAdmin>
    </>
  );
}
