"use client";

import { Grid2X2 } from "lucide-react";
import { Breadcrumb } from "../admin/Components/Breadcrumb";
import ContentDashboard from "./ContentDashboard";
import DashboardLayoutTutor from "./DashboardLayoutTutor";

export default function DashboardTutor(params) {
  return (
    <>
      <DashboardLayoutTutor>
        <Breadcrumb
          items={[
            { label: "Dashboard", link: "/dashboard/tutor", icon: Grid2X2 },
          ]}
        />
        <ContentDashboard />
      </DashboardLayoutTutor>
    </>
  );
}
