import Breadcrumb from "../../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../../Common/Breadcrumb/BreadcrumbItem";
import GrayAuthTheme from "../../../../Common/Theme/GrayAuthTheme";
import StudentHolidayList from "./StudentHolidayList";
import StudentHolidayListHeader from "./StudentHolidayListHeader";
import '../Holiday.scss'
import { useSelector } from "react-redux";
import React,{ useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getStudentHolidaysList } from "../../../../store/actions/studentHolidays";
import { changeYearFilterValue } from "../../commonFunctions";

const StudentHolidayCalender = () => {
  const dispatch = useDispatch()

  const [currentYear, setCurrentYear] = useState(new Date())

  const { user } = useSelector((state) => {
    return {
      user: state.user
    }
  })
  useEffect(() => {
    dispatch(getStudentHolidaysList(user.user_institute, user._id, currentYear))
  }, [dispatch, user, currentYear])

  const filterYear = (value) => {
    let field = changeYearFilterValue(value, currentYear);
    setCurrentYear(field.newDate)
  }
  return (
    <React.Fragment>
      <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          <BreadcrumbItem
            to="/dashboard/attendance-student-classroomlist"
            title="Attendance"
          />
          <BreadcrumbItem to="#" title="Holidays Calendar" />
        </Breadcrumb>
        <StudentHolidayListHeader changeYear={filterYear} currentYear={currentYear} />
        <StudentHolidayList currentYear={currentYear} />
    </React.Fragment>
  )

}
export default StudentHolidayCalender;