import DashboardLayoutAdmin from "@/components/dashboard/admin/DashboardLayoutAdmin";
import ContentAdminProfile from "@/components/dashboard/admin/Profile/ContentAdminProfile";

export default function Page(params) {
  return (
    <DashboardLayoutAdmin title="Profile">
      <ContentAdminProfile />
    </DashboardLayoutAdmin>
  );
}
