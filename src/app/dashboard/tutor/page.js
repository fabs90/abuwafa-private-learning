import DashboardTutor from "@/components/dashboard/tutor/DashboardTutor";

export default function TutorDashboard(params) {
  return (
    <>
      <div className="h-screen flex flex-col overflow-hidden">
        <div className="flex-1 overflow-x-auto">
          <DashboardTutor />
        </div>
      </div>
    </>
  );
}
