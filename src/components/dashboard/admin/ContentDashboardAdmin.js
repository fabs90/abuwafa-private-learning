import CardDashboard from "@/components/Card/Card";
import smilingStudentIcon from "/assets/smiling-student.png";
import smilingTutorIcon from "/assets/smiling-tutor.png";
import handSubjectIcon from "/assets/hand-subject.png";
import TutorTable from "../tutor/TutorComponents/TutorTable";
export default function ContentDashboardAdmin(params) {
  return (
    <>
      <div className="flex flex-row gap-4 justify-between">
        <CardDashboard
          title="80 Students"
          icon={smilingStudentIcon}
          width={145}
          height={160}
          isAdminPage={true}
        />
        <CardDashboard
          title="30 Tutors"
          icon={smilingTutorIcon}
          width={164}
          height={160}
          isAdminPage={true}
        />
        <CardDashboard
          title="26 Subjects"
          icon={handSubjectIcon}
          width={139}
          height={160}
          isAdminPage={true}
        />
      </div>
      <div className="mt-4">
        <TutorTable />
      </div>
    </>
  );
}
