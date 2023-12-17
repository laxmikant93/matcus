import moment from "moment";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormTextArea from "../../../../Common/Form/FormTextArea";
import Modal from "../../../../Common/Modal";
import ModalBody from "../../../../Common/Modal/ModalBody";
import IconDownload from "./icon-download.png";
import ModalFooter from "../../../../Common/Modal/ModalFooter";
import ModalHeader from "../../../../Common/Modal/ModalHeader";
import {
  acceptLeaveRequest,
  getSingleLeaveRequest,
  resetAcceptRequest,
} from "../../../../store/actions/TeacherAttendance";
import SelectInput from "../../../../Common/Form/SelectInput";
const TeacherLeaveRequestModal = ({
  manageLR,
  closeModalState,
  leaveId,
  updateLeaveStatus,
}) => {
  const dispatch = useDispatch();
  const {
    user,
    requestDetails,
    requestDetailsSuccess,
    studentName,
    updateLoading,
    updateSuccess,
  } = useSelector((state) => {
    return {
      user: state.user,
      requestDetails: state.teacherAttendance.getSingleLeaveRequest.data.data,
      requestDetailsSuccess:
        state.teacherAttendance.getSingleLeaveRequest.success,
      studentName:
        state.teacherAttendance.getSingleLeaveRequest.data.studentName,
      updateLoading: state.teacherAttendance.acceptLeaveRequest.loading,
      updateSuccess: state.teacherAttendance.acceptLeaveRequest.success,
    };
  });
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    if (requestDetailsSuccess) {
      setStatus(requestDetails.status);
    }
  }, [requestDetails, requestDetailsSuccess]);
  const [toggle, setToggle] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const handleChange = (e) => {
    let inputValue = e.target.value;
    if (inputValue === "rejected") {
      setToggle(true);
      setStatus(inputValue);
    } else {
      setToggle(false);
      setStatus(inputValue);
    }
  };
  const handleInput = (e) => {
    let inputValue = e.target.value;
    setRejectReason(inputValue);
  };
  const patchData = () => {
    return {
      rejectReason: rejectReason,
      status: status,
      owner: user._id,
    };
  };
  const updateButton = () => {
    dispatch(acceptLeaveRequest(leaveId, patchData()));
  };
  if (updateSuccess) {
    updateLeaveStatus();
    closeModalState();
    dispatch(resetAcceptRequest());
  }
  useEffect(() => {
    if (leaveId) {
      dispatch(getSingleLeaveRequest(leaveId));
    }
  }, [dispatch, leaveId]);
  return (
    <React.Fragment>
      <Modal show={manageLR}>
        <ModalHeader
          title="Leave Requests"
          closeButton={true}
          onclose={closeModalState}
        />
        {requestDetailsSuccess ? (
          <React.Fragment>
            <ModalBody>
              <ul className="LeaveRequest-Wrapper">
                <li>
                  <p className="text-2xs w-300">Student Name</p>
                  <p className="text-xs w-600">{studentName}</p>
                </li>
                <li className="LR-Time-Details">
                  <div className="LR-Time-From">
                    <p className="text-2xs w-300">FROM</p>
                    <p className="text-xxs w-500">
                      {moment(requestDetails.startFrom).format("DD MMM YYYY")}
                    </p>
                  </div>
                  <div className="LR-Time-To">
                    <p className="text-2xs w-300">TO</p>
                    <p className="text-xxs w-500">
                      {moment(requestDetails.endOn).format("DD MMM YYYY")}
                    </p>
                  </div>
                </li>
                <li className="LR-Mail-Body">
                  {/* <p>Respected Sir/ Madam,</p> */}
                  <p>{requestDetails.leaveReason}</p>
                  {/* <p>
                      I kindly request you to grant me leave from {moment(requestDetails.startFrom).format('DD MMM YYYY')} to {moment(requestDetails.endOn).format('DD MMM YYYY')}. I will
                      be thankful for your kindness.
                    </p>
                    <p>Thanking you.</p> */}
                  {requestDetails.fileUpload?.src ? (
                    <div className="RR-Attach">
                      <img src={IconDownload} alt="" />
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={requestDetails.fileUpload?.src}
                      >
                        Attachment
                      </a>
                    </div>
                  ) : (
                    ""
                  )}
                </li>
                <li className="LR-Mail-Action">
                  {/* <label className="text-xs w-600">Leave Status</label> */}
                  <SelectInput onChange={handleChange} value={status} label="Leave Status">
                    <option value="pending" hidden>
                      Pending
                    </option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Reject</option>
                  </SelectInput>
                  {toggle ? (
                    <FormTextArea
                      rows="2"
                      type="text"
                      placeholder="Reject Reason"
                      label="Reject Reason"
                      value={rejectReason}
                      maxLength="500"
                      onChange={handleInput}
                      onKeyUp={handleInput}
                      TextareaBtmTxt="500"
                    ></FormTextArea>
                  ) : (
                    ""
                  )}
                </li>
              </ul>
            </ModalBody>
            <ModalFooter>
              {updateLoading ? (
                <button type="button" className="button btn-sm button-base">
                  Updating Request...
                </button>
              ) : (
                <button
                  onClick={updateButton}
                  type="button"
                  className="button btn-sm button-base"
                >
                  Update Leave Request
                </button>
              )}
            </ModalFooter>
          </React.Fragment>
        ) : (
          <div className="loadingGridData">Loading...</div>
        )}
      </Modal>
    </React.Fragment>
  );
};
export default TeacherLeaveRequestModal;
