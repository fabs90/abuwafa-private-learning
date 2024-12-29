import DashboardLayoutTutor from "@/components/dashboard/tutor/DashboardLayoutTutor";
import ContentSchedule from "@/components/dashboard/tutor/Schedule/ContentSchedule";

export default function page(params) {
  return (
    <>
      <DashboardLayoutTutor title="Schedule">
        <ContentSchedule />
      </DashboardLayoutTutor>
    </>
  );
}
