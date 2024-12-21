import TutorTable from "../TutorComponents/TutorTable";

export default function ContentPaycheck(params) {
  const datas = [
    {
      id: 1,
      name: "Mr. Fabian",
      month: "March",
      salary: "Rp2.000.000",
    },
    {
      id: 2,
      name: "Mr. Fabian",
      month: "April",
      salary: "Rp2.150.000",
    },
  ];

  return (
    <>
      <TutorTable
        data={datas}
        hiddenColumns={["id"]}
        showDetail={true}
        title={"paycheck"}
      />
    </>
  );
}
