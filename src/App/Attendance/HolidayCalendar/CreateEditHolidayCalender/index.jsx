import React from "react";
import Breadcrumb from "../../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../../Common/Breadcrumb/BreadcrumbItem";
import GrayAuthTheme from "../../../../Common/Theme/GrayAuthTheme";
import CreateEditHoliday from "./CreateEditHoliday";
import '../Holiday.scss'
import { useSelector } from "react-redux";
const CreateEditHolidayCalender = () => {
  const { user } = useSelector((state) => {
    return {
      user: state.user,
    }
  })
  return (
    <React.Fragment>
      <Breadcrumb>
            <BreadcrumbItem to="/" title="Dashboard" />
            {
              user.user_activeRole === process.env.REACT_APP_TEACHER ?
                <React.Fragment>
                  <BreadcrumbItem
                    to="/dashboard/attendance-teacher-classroomSubjectlist"
                    title="Attendance"
                  />
                  <BreadcrumbItem to="/dashboard/holiday-calendar" title="Holidays Calendar" />
                </React.Fragment> :
                <React.Fragment><BreadcrumbItem
                  to="/admin-attendance-classroomSubjectlist"
                  title="Attendance"
                />

                  <BreadcrumbItem to="/admin-holiday-calender-list" title="Holidays Calendar" />
                </React.Fragment>
            }
            <BreadcrumbItem to="#" title="Add New Holiday" />
          </Breadcrumb>
          <CreateEditHoliday />
    </React.Fragment>
  )
}

export default CreateEditHolidayCalender