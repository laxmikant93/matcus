import React, { useState } from 'react';
import Breadcrumb from '../../../Common/Breadcrumb';
import BreadcrumbItem from '../../../Common/Breadcrumb/BreadcrumbItem';
import InstituteTheme from '../../../Common/Theme/InstituteTheme';
import EmployeeList from './EmployeeList';
import DashboardFacultyList from './InviteFacultyList';

const StaffList = () => {
  const [toggle, setToggle] = useState("TeacherList")
  return (
    <React.Fragment>
     <>
     <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          <BreadcrumbItem to="/invite-faculty-list" title="Staff List" />
        </Breadcrumb>
        <div className="ViewClassroomTabBar  mt-20">
          <div className=" scroll-nav-tab-wrapper">
            <ul className=" scroll-nav-tab">
              <ul className="ViewClassroomTabListNew scroll-nav-tab">
                <li
                  className={`button  btn-sm  ${toggle === "TeacherList"
                    ? "button-primary primary"
                    : "btn-o-primary primary"
                    }`}
                  onClick={() =>
                    setToggle(
                      toggle === "TeacherList"
                        ? "TeacherList"
                        : "TeacherList"
                    )
                  }
                >
                  Teacher List
                </li>
                <li
                  className={`button  btn-sm ${toggle === "EmployeeList"
                    ? "button-primary primary"
                    : "btn-o-primary primary"
                    }`}
                  onClick={() =>
                    setToggle("EmployeeList")
                  }
                >
                  Employee List
                </li>
              </ul>
            </ul>
          </div>
        </div>
     </>
      {
        toggle === "TeacherList" ?
          <DashboardFacultyList /> : <EmployeeList />
      }
    </React.Fragment>
  )
}
export default StaffList;