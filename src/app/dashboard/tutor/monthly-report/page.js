import DashboardLayoutTutor from "@/components/dashboard/tutor/DashboardLayoutTutor";
import ContentMonthlyReportTutor from "@/components/dashboard/tutor/monthly-report/ContentMonthlyReport";

export default function page(params) {
  return (
    <>
      <DashboardLayoutTutor>
        <ContentMonthlyReportTutor />
      </DashboardLayoutTutor>
    </>
  );
}
