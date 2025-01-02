import ManageTutortable from "../../Components/ManageTutorTable";

export default function ContentManageStudent(params) {
  const data = [
    {
      name: "Alice Johnson",
      status: "active",
      grade: "10",
      school: "Greenwood High School",
      no_telepon: "081234567890",
    },
    {
      name: "Bob Smith",
      status: "not active",
      grade: "11",
      school: "Riverdale High School",
      no_telepon: "082345678901",
    },
    {
      name: "Charlie Brown",
      status: "active",
      grade: "12",
      school: "Sunnydale High School",
      no_telepon: "083456789012",
    },
    {
      name: "Diana Prince",
      status: "active",
      grade: "10",
      school: "Metropolis High School",
      no_telepon: "084567890123",
    },
    {
      name: "Ethan Hunt",
      status: "not active",
      grade: "11",
      school: "Gotham High School",
      no_telepon: "085678901234",
    },
    {
      name: "Nick Furry",
      status: "active",
      grade: "12",
      school: "Metropolis High School",
      no_telepon: "084567890123",
    },
  ];
  return (
    <>
      <ManageTutortable
        data={data}
        rowsPerPage={5}
        href="/dashboard/admin/manage/students/create"
      />
    </>
  );
}
