/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Breadcrumb from "../../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../../Common/Breadcrumb/BreadcrumbItem";
import StudentTheme from "../../../../Common/Theme/StudentTheme";

import NoDataAvailable from "../../../../Common/NoDataAvailable";
import IconExternal from "./icon-external.png";
import IconDownload from "./icon-download.png";
// import LeaveRequestModal from "./LeaveRequestModal";
import "../../Attendance.scss";
import LeaveRequestModal from "./ViewLeaveRequest";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getStudentLeaveRequestList,
  sortStudentLeaveRequestList,
} from "../../../../store/actions/StudentAttendance";
import moment from "moment";
import { changedatavalue, getDanamicCalenderDate } from "../../commonFunctions";
import { getTeacherClassroomSpecificData } from "../../../../store/actions/teachersubjectlist";
import SingleSelectDropdown from "../../../../Common/Form/SingleSelectDropdown";
import { searchStudentLeaveRequestList } from "../../../../store/actions/TeacherAttendance";
const ViewLeaves = () => {
  const [manageLRModal, SetManageLRModal] = useState();
  const { _classroomId } = useParams();
  const {
    user,
    requestList,
    requestListSuccess,
    ClassroomDetailSuccess,
    ClassroomDetail,
  } = useSelector((state) => {
    return {
      user: state.user,
      requestList: state.studentAttendance.studentRequestList.data,
      requestListSuccess: state.studentAttendance.studentRequestList.success,
      ClassroomDetailSuccess:
        state.teachersubjectlist.TeacherClassroomData.success,
      ClassroomDetail: state.teachersubjectlist.TeacherClassroomData.data,
    };
  });
  // const [disabledState, setDisabledState] = useState()
  const changeDateValue = (values) => {
    let field = getDanamicCalenderDate(changedatavalue(values, currentDate));
    setCurrentDate(field.newDate ? field.newDate : new Date());
  };
  const [currentDate, setCurrentDate] = useState(`${new Date()}`);
  const selectGroup = ["Pending", "Approved", "Rejected"];

  const filterValues = [];

  const SingleSelectHandel = (value) => {
    const selectedValue = value;
    switch (selectedValue) {
      case "ALL": {
        dispatch(
          getStudentLeaveRequestList(
            user.user_institute,
            user._id,
            _classroomId,
            currentDate
          )
        );
        break;
      }
      case "Pending": {
        dispatch(
          sortStudentLeaveRequestList(
            user.user_institute,
            user._id,
            _classroomId,
            currentDate,
            "status",
            "pending"
          )
        );
        break;
      }
      case "Approved": {
        dispatch(
          sortStudentLeaveRequestList(
            user.user_institute,
            user._id,
            _classroomId,
            currentDate,
            "status",
            "approved"
          )
        );
        break;
      }
      case "Rejected": {
        dispatch(
          sortStudentLeaveRequestList(
            user.user_institute,
            user._id,
            _classroomId,
            currentDate,
            "status",
            "rejected"
          )
        );
        break;
      }

      default:
    }
  };
  useEffect(() => {
    let field = getDanamicCalenderDate(currentDate);
    setCurrentDate(field.newDate ? field.newDate : new Date());
    // setDates(field.Dates);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const dispatch = useDispatch();
  const history = useNavigate();
  const [requestDetails, setRequestDetails] = useState({});
  const [reasonType, setReasonType] = useState("");
  const ManageLRModal = (item, value) => {
    setReasonType(value);
    SetManageLRModal(!manageLRModal);
    setRequestDetails(item);
  };
  const closeModalState = () => {
    SetManageLRModal(!manageLRModal);
  };
  const newLeaveRequest = () => {
    history(`/dashboard/student-new-leave-request/${_classroomId}`);
  };
  useEffect(() => {
    dispatch(getTeacherClassroomSpecificData(_classroomId));
  }, [_classroomId, dispatch]);
  useEffect(() => {
    dispatch(
      getStudentLeaveRequestList(
        user.user_institute,
        user._id,
        _classroomId,
        currentDate
      )
    );
  }, [_classroomId, currentDate, dispatch, user._id, user.user_institute]);
  return (
    <React.Fragment>
      <StudentTheme>
      <Breadcrumb>
            <BreadcrumbItem to="/" title="Dashboard" />
            <BreadcrumbItem
              to="/dashboard/attendance-student-classroomlist"
              title="Attendance"
            />
            <BreadcrumbItem
              to={`/dashboard/student-subjects-attendance/${_classroomId}`}
              title={ClassroomDetailSuccess && ClassroomDetail.coursename}
            />
            <BreadcrumbItem to="#" title="View Leaves" />
          </Breadcrumb>
          <div className="PageTopHead mt-10">
            <div className="PTH-Item">
              <p className="text-sm w-400">
                {requestListSuccess && requestList.length > 0
                  ? `${requestList.length}`
                  : "0"}
                &nbsp;
                {requestListSuccess && requestList.length > 1
                  ? "Leaves"
                  : "Leave"}
              </p>
              <p className="text-xxs w-600">
                {ClassroomDetailSuccess && ClassroomDetail.coursename}
              </p>
            </div>
          </div>
          <div className="PageTopHead PTH-Student-view-leaves mt-20">
            <div className="PTH-Item">
              <SingleSelectDropdown
                SingleSelectHandel={SingleSelectHandel}
                selectGroup={selectGroup}
                filterValues={filterValues}
              />
            </div>
            <div className="PTH-Item">
              <div className="LeftRightCalender">
                <button
                  type="button"
                  onClick={() => changeDateValue("minus")}
                  className="LeftDateIcon text-sm w-500"
                >
                  &#60;
                </button>
                <div className="DateCntMain">
                  {moment(currentDate).format("MMMM-YYYY")}
                </div>
                <button
                  type="button"
                  onClick={() => changeDateValue("plus")}
                  className="RightDateIcon text-sm w-500"
                >
                  &#62;
                </button>
              </div>
            </div>
            <div className="PTH-Item P-Right">
              <button
                type="button"
                className="button button-base btn-sm"
                onClick={newLeaveRequest}
              >
                <span className="text-xs">&#43;</span>&nbsp;New Leave Request
              </button>
            </div>
            {/* <div className="PTH-Item P-Right">
              <button
                type="button"
                className="button button-base btn-oval btn-sm"
              >
                Holidays Calendar
              </button>
            </div> */}
          </div>
          <div className="gridListTable">
            <ul className="gridHeader">
              <li className="col col-2">Leave Date</li>
              <li className="col col-4">Request Reason</li>
              <li className="col col-2">Status</li>
              <li className="col col-4">Reject Reason</li>
            </ul>
            <div className="gridBody">
              {requestListSuccess ? (
                requestList.length ? (
                  requestList.map((item) => {
                    return (
                      <div className="gridRow">
                        <ul className="topInfo">
                          <li className="col col-2" data-head="Leave Date">
                            <div className="text-xxs">
                              {moment(item.startFrom).format("DD MMM YYYY")}
                            </div>
                            <div className="text-xxs mt-3">
                              {moment(item.endOn).format("DD MMM YYYY")}
                            </div>
                          </li>
                          <li className="col col-4" data-head="Request Reason">
                            <div className="RR-Wrap">
                              <div className="RR-wrap-cnt text-2xs">
                                {item.leaveReason}
                                {item.fileUpload?.src ? (
                                  <div className="RR-Attach">
                                    <img src={IconDownload} alt="" />
                                    <a
                                      target="_blank"
                                      rel="noreferrer"
                                      href={item.fileUpload?.src}
                                    >
                                      {item?.fileUpload?.src}
                                    </a>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                              <button
                                className="btnText"
                                onClick={() => ManageLRModal(item, "leave")}
                              >
                                <img src={IconExternal} alt="external" />
                              </button>
                            </div>
                          </li>
                          <li className="col col-2" data-head="Status">
                            {/* <div className="base w-600">Pending</div> */}
                            {/* <div className="secondary w-600">Pending</div> */}

                            <React.Fragment>
                              {item.isCancelled ? (
                                <div className="bsPink w-600">Cancelled</div>
                              ) : (
                                <React.Fragment>
                                  {item.status === "pending" ? (
                                    <div className="bsPink w-600">Pending</div>
                                  ) : item.status === "approved" ? (
                                    <div className="secondary w-600">
                                      Approved
                                    </div>
                                  ) : item.status === "rejected" ? (
                                    <div className="red w-600">Rejected</div>
                                  ) : (
                                    ""
                                  )}
                                </React.Fragment>
                              )}
                            </React.Fragment>
                          </li>
                          <li className="col col-4" data-head="Reject Reason">
                            <div className="RR-Wrap">
                              <div className="RR-wrap-cnt text-2xs">
                                {item.rejectReason ? item.rejectReason : ""}
                              </div>
                              {item.rejectReason ? (
                                <button
                                  className="btnText"
                                  onClick={() => ManageLRModal(item, "reject")}
                                >
                                  <img src={IconExternal} alt="external" />
                                </button>
                              ) : (
                                ""
                              )}
                            </div>
                          </li>
                        </ul>
                      </div>
                    );
                  })
                ) : (
                  <NoDataAvailable title="No Records Found." />
                )
              ) : (
                <div className="loadingGridData">
                  <i className="ed-loadingGrid"></i>
                </div>
              )}
            </div>
          </div>
          <LeaveRequestModal
            manageLRModal={manageLRModal}
            closeModalState={() => closeModalState()}
            requestDetails={requestDetails}
            reasonType={reasonType}
          />
      </StudentTheme>
    </React.Fragment>
  );
};

export default ViewLeaves;
