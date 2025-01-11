import TutorTable from "../TutorComponents/TutorTable";

export default function ContentPaycheck(params) {
  const datas = [
    {
      id: 1,
      name: "00239410229 A/N FABIAN JULIANSYAH CAHYADI",
      month: "March",
      session: "15",
      year: "2024",
    },
    {
      id: 2,
      name: "00239410229 A/N FABIAN JULIANSYAH CAHYADI",
      month: "April",
      session: "13",
      year: "2024",
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
