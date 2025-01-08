import CardDashboard from "@/components/Card/Card";
import TutorTable from "../tutor/TutorComponents/TutorTable";
export default function ContentDashboardAdmin(params) {
  return (
    <>
      <div className="flex flex-col md:flex-row lg:flex-row gap-4 justify-evenly">
        <CardDashboard
          title="80 Students"
          icon={"/img/smiling-student.png"}
          width={145}
          height={160}
          isAdminPage={true}
        />
        <CardDashboard
          title="30 Tutors"
          icon={"/img/smiling-tutor.png"}
          width={164}
          height={160}
          isAdminPage={true}
        />
        <CardDashboard
          title="26 Subjects"
          icon={"/img/hand-subject.png"}
          width={139}
          height={160}
          isAdminPage={true}
        />
      </div>
    </>
  );
}
