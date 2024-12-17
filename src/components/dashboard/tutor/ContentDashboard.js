import CalendarTutor from "./Calendar/Calendar";
import CardDashboard from "./Card/Card";
import academicHatIcon from "/public/academic-hat.svg";
import bookIcon from "/public/book.svg";

export default function ContentDashboard(params) {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row justify-evenly">
          <CardDashboard title="Students" data="7" icon={academicHatIcon} />
          <CardDashboard
            title="Monthly Report"
            data="5"
            icon={bookIcon}
            className=""
          />
        </div>
        <div className="mt-8">
          <CalendarTutor />
        </div>
      </div>
    </>
  );
}
