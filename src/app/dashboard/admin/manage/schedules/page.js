import DashboardLayoutAdmin from "@/components/dashboard/admin/DashboardLayoutAdmin";
import ContentManageSchedules from "@/components/dashboard/admin/Manage/Schedules/ContentManageSchedules";

export default function Page(params) {
  return (
    <>
      <DashboardLayoutAdmin title="Manage Schedules">
        {/* Content */}
        <ContentManageSchedules />
      </DashboardLayoutAdmin>
    </>
  );
}
