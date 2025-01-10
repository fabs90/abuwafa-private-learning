import DashboardLayoutAdmin from "@/components/dashboard/admin/DashboardLayoutAdmin";
import CreateMonthlyReport from "@/components/dashboard/admin/Monthly-report/CreateMonthlyReport";

export default function Page(params) {
  return (
    <>
      <DashboardLayoutAdmin title="Create Monthly Report">
        <CreateMonthlyReport />
      </DashboardLayoutAdmin>
    </>
  );
}
