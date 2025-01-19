import CalendarTutor from "./TutorComponents/Calendar/Calendar";
import CardDashboard from "../../Card/Card";

export default function ContentDashboard(params) {
  return (
    <>
      <div className="flex flex-col z-100">
        <div className="flex flex-col gap-3 md:flex-row lg:flex-row justify-evenly">
          <CardDashboard
            title="7 Students"
            data={"5 Active : 2 Inactive"}
            icon={"/img/smiling-student.png"}
            width={140}
            height={136}
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
