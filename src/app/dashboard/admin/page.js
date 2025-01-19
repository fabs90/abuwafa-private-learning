"use client";
import { Breadcrumb } from "@/components/dashboard/admin/Components/Breadcrumb";
import ContentDashboardAdmin from "@/components/dashboard/admin/ContentDashboardAdmin";
import DashboardLayoutAdmin from "@/components/dashboard/admin/DashboardLayoutAdmin";
import { Grid2X2 } from "lucide-react";
import withRoleGuard from "@/utils/withRoleGuards";

function AdminDashboard(params) {
  return (
    <>
      <DashboardLayoutAdmin>
        <Breadcrumb
          items={[
            { label: "Dashboard", link: "/dashboard/admin", icon: Grid2X2 },
          ]}
        />
        <ContentDashboardAdmin />
      </DashboardLayoutAdmin>
    </>
  );
}

// Bungkus komponen AdminDashboard dengan middleware
export default withRoleGuard(AdminDashboard, ["admin"]);
