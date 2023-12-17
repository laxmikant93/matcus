import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TeacherTheme from "../../../../Common/Theme/TeacherTheme";

import NoDataAvailable from "../../../../Common/NoDataAvailable";
import DummyProfile from "../DummyProfile.png";
import IconExternal from "./icon-external.png";
import IconDownload from "./icon-download.png";
import "../../Attendance.scss";
import LeaveRequestModal from "../../StudentAttendance/StudentLeaveRequest/ViewLeaveRequest";
import LeaveRequestListHeader from "./LeaveRequestListHeader";
import { useDispatch } from "react-redux";
import {
  acceptLeaveRequest,
  getTeacherLeaveRequestList,
} from "../../../../store/actions/TeacherAttendance";
import { useSelector } from "react-redux";
import { getTeacherClassroomSpecificData } from "../../../../store/actions/teachersubjectlist";
import moment from "moment";
import FormTextArea from "../../../../Common/Form/FormTextArea";
import { changedatavalue, getDanamicCalenderDate } from "../../commonFunctions";
import ImageViewer from "../../../../Common/ImageViewer";
const LeaveRequestList = () => {
  const [manageLRModal, SetManageLRModal] = useState();
  const dispatch = useDispatch();
  const { user, requestList, requestListSuccess } = useSelector((state) => {
    return {
      user: state.user,
      requestList: state.teacherAttendance.teacherLeaveRequestList.data,
      requestListSuccess:
        state.teacherAttendance.teacherLeaveRequestList.success,
    };
  });

  const [currentDate, setCurrentDate] = useState(`${new Date()}`);
  const [requestDetails, setRequestDetails] = useState({});
  const [reasonType, setReasonType] = useState("");
  const ManageLRModal = (item, value) => {
    SetManageLRModal(!manageLRModal);
    setRequestDetails(item);
    setReasonType(value);
  };
  const { _classroomId } = useParams();
  const closeModalState = () => {
    SetManageLRModal(!manageLRModal);
  };
  const [inputState, setInputState] = useState(false);

  const handleStatus = (e, _id) => {
    let inputValue = e.target.value;
    if (inputValue === "rejected") {
      setInputState(inputState === _id ? -1 : _id);
    } else {
      setInputState("");
    }
    dispatch(acceptLeaveRequest(_id, patchData(inputValue)));
  };
  const patchData = (inputValue) => {
    return {
      status: inputValue,
      owner: user._id,
      rejectReason: "",
    };
  };
  const rejectPatchData = () => {
    return {
      owner: user._id,
      rejectReason: rejectReason,
    };
  };
  const [rejectReason, setRejectReason] = useState("");
  const handleChange = (e) => {
    setRejectReason(e.target.value);
  };
  const handleTick = (_id) => {
    dispatch(acceptLeaveRequest(_id, rejectPatchData()));
    setInputState("");
  };
  const handleClose = () => {
    setInputState("");
  };
  const monthFilter = (values) => {
    let field = getDanamicCalenderDate(changedatavalue(values, currentDate));
    setCurrentDate(field.newDate ? field.newDate : new Date());
  };
  useEffect(() => {
    let field = getDanamicCalenderDate(currentDate);
    setCurrentDate(field.newDate ? field.newDate : new Date());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    dispatch(getTeacherClassroomSpecificData(_classroomId));
  }, [_classroomId, dispatch]);
  useEffect(() => {
    dispatch(
      getTeacherLeaveRequestList(user.user_institute, _classroomId, currentDate)
    );
  }, [_classroomId, currentDate, dispatch, user._id, user.user_institute]);
  return (
    <React.Fragment>
      <LeaveRequestListHeader
        currentDate={currentDate}
        changeDateValue={monthFilter}
      />
      <div className="gridListTable">
        <ul className="gridHeader">
          <li className="col col-3">Students</li>
          <li className="col col-3">Leave Date(s) & Status</li>
          <li className="col col-3">Request Reason</li>
          <li className="col col-3">Reject Reason</li>
        </ul>
        <div className="gridBody">
          {requestListSuccess ? (
            requestList.length ? (
              requestList.map((item, key) => {
                return (
                  <div key={key} className="gridRow">
                    <ul className="topInfo">
                      <li className="col col-3" data-head="Students">
                        <div className="userDetails">
                          <div className="profileCircle">
                            <a
                              href={`/profile/${item.username}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <ImageViewer
                                className="ListTableImg"
                                object={item.profile_picture
                                }
                                defaultImage={DummyProfile}
                                alt="user profile"
                              />
                            </a>
                          </div>
                          <div className="profileDetails">
                            <div className="profile-name">
                              {item.fullname}
                            </div>
                            <div className="primary">{item.admission_no}</div>
                          </div>
                        </div>
                      </li>
                      <li
                        className="col col-3"
                        data-head="Leave Date(s) & Status"
                      >
                        <div className="text-xxs">
                          {moment(item.startFrom).format("DD MMM YYYY")}
                        </div>
                        <div className="text-xxs mt-3">
                          {moment(item.endOn).format("DD MMM YYYY")}
                        </div>
                        {item.isCancelled ? (
                          <p className=" mt-3">Cancelled</p>
                        ) : (
                          <div className="selectTextType mt-3">
                            <select
                              value={item.status}
                              onChange={(e) => handleStatus(e, item._id)}
                              className={
                                item.status === "approved"
                                  ? "secondary"
                                  : item.status === "rejected"
                                    ? "red"
                                    : ""
                              }
                            >
                              <option value="pending" disabled>
                                Pending
                              </option>
                              <option value="approved">Approved</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          </div>
                        )}
                      </li>
                      <li className="col col-3" data-head="Request Reason">
                        <div className="RR-Wrap">
                          <div className="RR-wrap-cnt text-2xs">
                            {item.leaveReason}
                            {item.fileUpload?.src ? (
                              <div className="RR-Attach">
                                <img src={IconDownload} alt="" />
                                <a
                                  target="_blank"
                                  rel="noreferrer"
                                  href={item.fileUpload}
                                >
                                  {item.fileUpload?.src}
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
                      <li className="col col-3" data-head="Reject Reason">
                        <div className="RR-Wrap">
                          {inputState === item._id ? (
                            <React.Fragment>
                              <div className="RR-Textarea-Wapper">
                                <FormTextArea
                                  rows="1"
                                  type="text"
                                  placeholder="Reject Reason"
                                  maxLength="500"
                                  onChange={handleChange}
                                  onKeyUp={handleChange}
                                  TextareaBtmTxt="500"
                                ></FormTextArea>
                                <div className="RR-Textarea-Action">
                                  <button
                                    className="button btn-xs button-base"
                                    onClick={() => handleTick(item._id)}
                                  >
                                    Submit
                                  </button>
                                  <button
                                    className="button btn-xs btn-o-red red"
                                    onClick={handleClose}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </React.Fragment>
                          ) : (
                            <div className="RR-wrap-cnt text-2xs">
                              {item.rejectReason}
                            </div>
                          )}
                          {item.rejectReason && item.rejectReason !== "" ? (
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
      {manageLRModal && (
        <LeaveRequestModal
          manageLRModal={manageLRModal}
          closeModalState={() => closeModalState()}
          requestDetails={requestDetails}
          reasonType={reasonType}
        />
      )}
    </React.Fragment>
  );
};

export default LeaveRequestList;
