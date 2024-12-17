"use client";

import ContentDashboard from "./ContentDashboard";
import DashboardLayoutTutor from "./DashboardLayoutTutor";

export default function DashboardTutor(params) {
  return (
    <>
      <div className="h-screen flex flex-col overflow-hidden">
        <div className="flex-1 overflow-x-auto">
          <DashboardLayoutTutor>
            <ContentDashboard />
          </DashboardLayoutTutor>
          ;
        </div>
      </div>
    </>
  );
}
