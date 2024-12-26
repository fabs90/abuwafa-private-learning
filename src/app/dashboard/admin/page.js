import ContentDashboardAdmin from "@/components/dashboard/admin/ContentDashboardAdmin";
import DashboardLayoutAdmin from "@/components/dashboard/admin/DashboardLayoutAdmin";

export default function AdminDashboard(params) {
  return (
    <>
      <DashboardLayoutAdmin>
        <ContentDashboardAdmin />
      </DashboardLayoutAdmin>
    </>
  );
}
