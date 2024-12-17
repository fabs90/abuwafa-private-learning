import TutorTable from "../TutorTable";

export default function ContentSchedule(params) {
  const datas = [
    {
      Day: "Monday",
      Subject: "English",
      Time: "17:00 - 18:00",
      Method: "Offline (Home visit)",
      link: "-",
    },
  ];

  return (
    <>
      <TutorTable data={datas} />
    </>
  );
}
