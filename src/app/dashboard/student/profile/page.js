import DashboardLayoutStudent from "@/components/dashboard/student/DashboardLayoutStudent";
import ContentProfile from "@/components/dashboard/student/Profile/ContentProfile";

export default function ProfilePage() {
  return (
    <div className="h-screen flex flex-col overflow-auto">
      <DashboardLayoutStudent>
        <ContentProfile />
      </DashboardLayoutStudent>
    </div>
  );
}
