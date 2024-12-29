import DashboardLayoutTutor from "@/components/dashboard/tutor/DashboardLayoutTutor";
import ContentPaycheck from "@/components/dashboard/tutor/Paycheck/ContentPaycheck";

export default function page(params) {
  return (
    <>
      <DashboardLayoutTutor title="Paycheck">
        <ContentPaycheck />
      </DashboardLayoutTutor>
    </>
  );
}
