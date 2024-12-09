import DashboardLayoutStudent from "@/components/dashboard/student/DashboardLayoutStudent";
import ContentProfile from "@/components/dashboard/student/Profile/ContentProfile";

export default function ProfilePage() {
  return (
    <div className="h-full">
      <DashboardLayoutStudent>
        <ContentProfile />
      </DashboardLayoutStudent>
    </div>
  );
}
