import DashboardLayoutTutor from "@/components/dashboard/tutor/DashboardLayoutTutor";
import ContentPaycheckDetail from "@/components/dashboard/tutor/Paycheck/Detail/ContentPaycheckDetail";

export default function Page(params) {
  return (
    <>
      <DashboardLayoutTutor>
        <ContentPaycheckDetail />
      </DashboardLayoutTutor>
    </>
  );
}
