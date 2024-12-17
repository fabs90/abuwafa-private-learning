import StudentTable from "../StudentTable";
import InoviceData from "./InvoiceData.json";
export default function ContentInovice(params) {
  return (
    <>
      <StudentTable data={InoviceData} />
    </>
  );
}
