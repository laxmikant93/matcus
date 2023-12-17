/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import GrayAuthTheme from "../../../Common/Theme/GrayAuthTheme";
import Breadcrumb from "../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../Common/Breadcrumb/BreadcrumbItem";
import "../../FeeManagement/fee-management.scss";
// import StudentFeeListingDetails from '../../Dashboard/StudentDashboard/StudentFeeListingDetails'
import AppLink from "../../../Common/AppLink";
import { DynamicCourseHeader } from "../../../Common/UserElement";
import { useDispatch, useSelector } from "react-redux";
import { getStudentCourseData, getStudentFee, studentFeeReset } from "../../../store/actions/feeManagementStudent";
import { useNavigate } from "react-router-dom";
import Storage from "../../../Classes/Storage";
import { feecourseid, feeinstiid, feeuserid } from "../../../Constant/auth";

const StudentFeeListing = () => {
  const history = useNavigate()
  const { users, studentCourseData, studentCourseDataSuccess, studentFeeDataSuccess, studentFeeData } = useSelector((state) => {
    return {
      users: state.user,
      studentCourseData: state.feeManagementStudent.studentCourseData.data,
      studentCourseDataSuccess: state.feeManagementStudent.studentCourseData.success,
      studentFeeData: state.feeManagementStudent.studentFeeData.data,
      studentFeeDataSuccess: state.feeManagementStudent.studentFeeData.success
    };
  });
  const dispatch = useDispatch()
  useEffect(() => {
    if (studentFeeData.length > 0) {
      dispatch(studentFeeReset())
    }
  }, [dispatch, studentFeeData.length])
  useEffect(() => {
    dispatch(getStudentCourseData(users.user_institute, users._id))
  }, [dispatch, users._id, users.user_institute])
  const handleClick = (item) => {
    history(`/dashboard/student/student-fee-listing-details${item.course}-${item.institute}-${item.user}`)
  }
  return (
    <React.Fragment>
      <React.Fragment>
        <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          <BreadcrumbItem
            to="/dashboard/student/fee-management"
            title="Fee Management"
          />
        </Breadcrumb>
        <div className="pageHeadIntro">
          <p className="text-sm w-300">View Fee</p>
        </div>
        <div className="gridListTable">
          <ul className="gridHeader">
            <li className="col col-5">
              <DynamicCourseHeader />
            </li>
            <li className="col col-3">Paid Amount</li>
            <li className="col col-3">Due Amount</li>
            <li className="col col-1">&nbsp;</li>
          </ul>
          <div className="gridBody">
            <div className="gridRow">
              {studentCourseDataSuccess && studentCourseData.map((item) => {
                return (
                  <ul className="topInfo" key={item.course}>
                    <li className="col col-5" data-head="Classroom">
                      {item.coursename}
                    </li>
                    <li className="col col-3" data-head="Paid Amount">
                      <p>{item.PaidAmount}</p>
                      {/* <button className="linkRefresh active">
                          <i></i>&nbsp;Refresh
                        </button> */}
                    </li>
                    <li className="col col-3" data-head="Due Amount">
                      {item.dueAmount}
                    </li>
                    <li className="col col-1 actionCols">
                      <div className="actionBtn">
                        <button
                          className="btn-square"
                          title="View fee listing"
                          // to="/dashboard/student/student-fee-listing-details"
                          onClick={() => handleClick(item)}
                        >
                          <span className="cssIcon">
                            <i className="ed-eye"></i>
                          </span>
                        </button>
                      </div>
                      {/* {studentFeeDataSuccess &&
                          <StudentFeeListingDetails

                          />} */}
                      {/* <StudentFeeListingDetails /> */}
                    </li>
                  </ul>
                )
              })}
            </div>
          </div>
        </div>
      </React.Fragment>
    </React.Fragment>
  );
};

export default StudentFeeListing;
