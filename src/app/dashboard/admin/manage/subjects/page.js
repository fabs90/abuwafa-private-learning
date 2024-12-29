import DashboardLayoutAdmin from "@/components/dashboard/admin/DashboardLayoutAdmin";
import ContentManageSubject from "@/components/dashboard/admin/Manage/Subjects/ContentManageSubject";

export default function Page(params) {
  return (
    <>
      <DashboardLayoutAdmin title="Manage Subjects">
        <ContentManageSubject />
      </DashboardLayoutAdmin>
    </>
  );
}
