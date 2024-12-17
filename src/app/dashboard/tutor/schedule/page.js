import DashboardLayoutTutor from "@/components/dashboard/tutor/DashboardLayoutTutor";
import ContentSchedule from "@/components/dashboard/tutor/Schedule/ContentSchedule";

export default function page(params) {
  return (
    <>
      <div className="h-screen flex flex-col overflow-hidden">
        <div className="flex-1 overflow-x-auto">
          <DashboardLayoutTutor>
            <ContentSchedule />
          </DashboardLayoutTutor>
          ;
        </div>
      </div>
    </>
  );
}
