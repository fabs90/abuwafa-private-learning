import DashboardLayoutAdmin from "@/components/dashboard/admin/DashboardLayoutAdmin";
import CreatePaycheckAdmin from "@/components/dashboard/admin/Paycheck/CreatePaycheckAdmin";

export default function Page(params) {
  return (
    <DashboardLayoutAdmin title="Paycheck">
      <CreatePaycheckAdmin />
    </DashboardLayoutAdmin>
  );
}
