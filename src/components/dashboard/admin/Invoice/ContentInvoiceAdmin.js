import ManageInvoiceTable from "../Components/ManageInvoiceTable";

export default function ContentInvoiceAdmin(params) {
  const datas = [
    {
      name: "Fikri",
      month: "January",
      status: "✅",
    },
    {
      name: "Fikri",
      month: "February",
      status: "✅",
    },
    {
      name: "Fikri",
      month: "March",
      status: "❌",
    },
    {
      name: "Kenji",
      month: "March",
      status: "❌",
    },
    {
      name: "Kenji",
      month: "April",
      status: "❌",
    },
  ];

  return (
    <>
      <ManageInvoiceTable data={datas} columnName={["Student Name"]} />
    </>
  );
}
