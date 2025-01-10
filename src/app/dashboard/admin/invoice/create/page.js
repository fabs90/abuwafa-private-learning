import DashboardLayoutAdmin from "@/components/dashboard/admin/DashboardLayoutAdmin";
import CreateInvoice from "@/components/dashboard/admin/Invoice/CreateInvoice";

export default function Page(params) {
  return (
    <>
      <DashboardLayoutAdmin title="Create Invoice">
        <CreateInvoice />
      </DashboardLayoutAdmin>
    </>
  );
}
