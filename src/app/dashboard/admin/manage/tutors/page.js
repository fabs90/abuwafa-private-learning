import DashboardLayoutAdmin from "@/components/dashboard/admin/DashboardLayoutAdmin";
import ContentManageTutor from "@/components/dashboard/admin/Manage/Tutors/ContentManageTutor";

export default function Page(params) {
  return (
    <>
      <DashboardLayoutAdmin title="Manage Tutors">
        <ContentManageTutor />
      </DashboardLayoutAdmin>
    </>
  );
}
