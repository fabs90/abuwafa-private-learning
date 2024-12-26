import DashboardLayoutTutor from "@/components/dashboard/tutor/DashboardLayoutTutor";
import React from "react";
import ContentTutorProfile from "@/components/dashboard/tutor/Profile/ContentTutorProfile";

export default function TutorProfilePage(params) {
  return (
    <>
      <DashboardLayoutTutor>
        <ContentTutorProfile />
      </DashboardLayoutTutor>
    </>
  );
}
