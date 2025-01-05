import { Suspense } from "react";
import CalendarTutor from "./TutorComponents/Calendar/Calendar";
import smilingStudentIcon from "/public/smiling-student.png";
import handSubjectIcon from "/public/hand-subject.png";
import CardDashboard from "../../Card/Card";

export default function ContentDashboard(params) {
  return (
    <>
      <div className="flex flex-col z-100">
        <div className="flex flex-row justify-evenly">
          <CardDashboard
            title="7 Students"
            icon={smilingStudentIcon}
            width={145}
            height={160}
            isAdminPage={true}
          />

          <CardDashboard
            title="5 Subjects"
            icon={handSubjectIcon}
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
