import DashboardLayoutAdmin from "@/components/dashboard/admin/DashboardLayoutAdmin";
import ContentManageStudent from "@/components/dashboard/admin/Manage/Students/ContentManageStudent";
export default function Page(params) {
  return (
    <>
      <DashboardLayoutAdmin title="Manage Students">
        <ContentManageStudent />
      </DashboardLayoutAdmin>
    </>
  );
}
