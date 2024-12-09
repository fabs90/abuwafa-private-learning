import DashboardLayoutStudent from "@/components/dashboard/student/DashboardLayoutStudent";
import ContentInovice from "@/components/dashboard/student/Invoice/ContentInovice";

export default function page(params) {
  return (
    <>
      <DashboardLayoutStudent>
        <ContentInovice />
      </DashboardLayoutStudent>
    </>
  );
}
