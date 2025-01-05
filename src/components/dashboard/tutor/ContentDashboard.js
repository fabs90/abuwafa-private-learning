import CalendarTutor from "./TutorComponents/Calendar/Calendar";
import CardDashboard from "../../Card/Card";

export default function ContentDashboard(params) {
  return (
    <>
      <div className="flex flex-col z-100">
        <div className="flex flex-row justify-evenly">
          <CardDashboard
            title="7 Students"
            icon={"/img/smiling-student.png"}
            width={145}
            height={160}
            isAdminPage={true}
          />

          <CardDashboard
            title="5 Subjects"
            icon={"/img/hand-subject.png"}
            width={139}
            height={160}
            isAdminPage={true}
          />
        </div>
        <div className="mt-8">
          <CalendarTutor />
        </div>
      </div>
    </>
  );
}
