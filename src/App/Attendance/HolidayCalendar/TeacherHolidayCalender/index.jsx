import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Breadcrumb from "../../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../../Common/Breadcrumb/BreadcrumbItem";
import GrayAuthTheme from "../../../../Common/Theme/GrayAuthTheme";
import { holidayCalendarList } from "../../../../store/actions/holidayCalender";
import { changeYearFilterValue } from "../../commonFunctions";
import "../Holiday.scss"
import TeacherHolidayList from "./TeacherHolidayList";
import TeacherHolidayListHeader from "./TeacherHolidayListHeader";
const TeacherHolidayCalender = () => {
  const { user } = useSelector((state) => {
    return {
      user: state.user,
    }
  })
  const dispatch = useDispatch()

  const [currentYear, setCurrentYear] = useState(new Date())
  const filterYear = (value) => {
    let field = changeYearFilterValue(value, currentYear);
    setCurrentYear(field.newDate)
  }
  useEffect(() => {
    dispatch(holidayCalendarList(user.user_institute, currentYear))
  }, [currentYear, dispatch, user.user_institute])

  return (
    <React.Fragment>
      <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          {
            user.user_activeRole === process.env.REACT_APP_TEACHER ?
              <BreadcrumbItem
                to="/dashboard/attendance-teacher-classroomSubjectlist"
                title="Attendance"
              /> : <BreadcrumbItem
                to="/admin-attendance-classroomSubjectlist"
                title="Attendance"
              />
          }

          <BreadcrumbItem to="#" title="Holidays Calendar" />
        </Breadcrumb>
        <TeacherHolidayListHeader onChangeYear={filterYear} currentYear={currentYear} />
        <TeacherHolidayList currentYear={currentYear} />
    </React.Fragment>
  )
}

export default TeacherHolidayCalender