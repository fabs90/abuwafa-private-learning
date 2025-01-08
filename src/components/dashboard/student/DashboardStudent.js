"use client";
import StudentTable from "./StudentTable";
import ScheduleData from "./ScheduleData.json";
import DashboardLayoutStudent from "./DashboardLayoutStudent";
import { Suspense, useEffect, useState } from "react";
import Loading from "./loading";
import { Breadcrumb } from "../admin/Components/Breadcrumb";
import { Grid2X2 } from "lucide-react";
export default function DashboardStudent() {
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   // Simulasi loading data
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 2000); // 2 detik delay
  //   return () => clearTimeout(timer);
  // }, []);

  // if (isLoading) {
  //   return (
  //     <DashboardLayoutStudent>
  //       <div className="space-y-4 skeleton h-[100px] bg-gray-200">
  //         {[...Array(5)].map((_, index) => (
  //           <div key={index} className=""></div>
  //         ))}
  //       </div>
  //     </DashboardLayoutStudent>
  //   );
  // }

  return (
    <DashboardLayoutStudent>
      <Suspense fallback={<Loading />}>
        <Breadcrumb
          items={[
            { label: "Dashboard", link: "/dashboard/student", icon: Grid2X2 },
          ]}
        />
        <StudentTable data={ScheduleData} />
      </Suspense>
    </DashboardLayoutStudent>
  );
}
