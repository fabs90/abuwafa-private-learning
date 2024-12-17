import DashboardStudent from "@/components/dashboard/student/DashboardStudent";

export default function StudentDashboard() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="flex-1 overflow-x-auto">
        <DashboardStudent />
      </div>
    </div>
  );
}
