import ManageTutortable from "../../Components/ManageTutorTable";

export default function ContentManageTutor(params) {
  const data = [
    {
      name: "John Doe Kontoloyo selenge",
      subject: "Math",
      email: "johndoe213@email.com",
      username: "sadasd",
    },
    {
      name: "Alice Wonderland Pratama",
      subject: "Science",
      email: "alicewonder@yahoo.com",
      username: "alicep",
    },
    {
      name: "Mark Twain Nugroho",
      subject: "History",
      email: "mtwainnugroho12@email.com",
      username: "markt",
    },
    {
      name: "Emma Watson Raharja",
      subject: "Literature",
      email: 27,
      username: "emmaw",
    },
    {
      name: "Bruce Wayne Batman",
      subject: "Business",
      email: 35,
      username: "bruceb",
    },
    {
      name: "Clark Kent Superman",
      subject: "Journalism",
      email: 40,
      username: "clarkk",
    },
    {
      name: "Tony Stark Ironman",
      subject: "Engineering",
      email: 32,
      username: "tonys",
    },
    {
      name: "Diana Prince Wonder",
      subject: "Philosophy",
      email: 29,
      username: "dianap",
    },
  ];

  return (
    <>
      <ManageTutortable
        data={data}
        href="/dashboard/admin/manage/tutors/create"
      />
    </>
  );
}
