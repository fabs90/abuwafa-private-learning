import DashboardLayoutTutor from "@/components/dashboard/tutor/DashboardLayoutTutor";
import ContentTutorProfile from "@/components/dashboard/tutor/Profile/ContentTutorProfile";

export default function TutorProfilePage(params) {
  return (
    <>
      <div className="h-full">
        <DashboardLayoutTutor>
          <ContentTutorProfile />
        </DashboardLayoutTutor>
        ;
      </div>
    </>
  );
}
