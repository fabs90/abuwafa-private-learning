import ManageTutortable from "../../Components/ManageTutorTable";

export default function ContentManageSubject(params) {
  const data = [
    {
      subject: "Math",
      type: "Offline",
      grade: "Elementary",
      curriculum: "Merdeka",
    },
    {
      subject: "Math",
      type: "Online",
      grade: "Elementary",
      curriculum: "Merdeka",
    },
    {
      subject: "Math",
      type: "Offline",
      grade: "Junior High School",
      curriculum: "Merdeka",
    },
    {
      subject: "Science",
      type: "Online",
      grade: "Elementary",
      curriculum: "Merdeka",
    },
    {
      subject: "Science",
      type: "Offline",
      grade: "Junior High School",
      curriculum: "Merdeka",
    },
    {
      subject: "English",
      type: "Online",
      grade: "High School",
      curriculum: "Merdeka",
    },
    {
      subject: "History",
      type: "Offline",
      grade: "High School",
      curriculum: "Merdeka",
    },
    {
      subject: "Geography",
      type: "Online",
      grade: "Junior High School",
      curriculum: "Merdeka",
    },
    {
      subject: "Art",
      type: "Offline",
      grade: "Elementary",
      curriculum: "Merdeka",
    },
  ];
  return (
    <>
      <ManageTutortable
        data={data}
        href="/dashboard/admin/manage/subjects/create"
      />
    </>
  );
}
