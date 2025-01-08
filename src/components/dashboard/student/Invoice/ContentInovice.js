import { Grid2X2 } from "lucide-react";
import { Breadcrumb } from "../../admin/Components/Breadcrumb";
import StudentTable from "../StudentTable";
import InoviceData from "./InvoiceData.json";
export default function ContentInovice(params) {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Dashboard", link: "/dashboard", icon: Grid2X2 },
          {
            label: "Invoice",
            link: "/dashboard/student/invoice",
          },
        ]}
      />
      <StudentTable data={InoviceData} isInvoice={true} />
    </>
  );
}
