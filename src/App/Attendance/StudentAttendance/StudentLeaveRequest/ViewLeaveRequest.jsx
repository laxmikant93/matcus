import moment from "moment";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../Common/Modal";
import ModalBody from "../../../../Common/Modal/ModalBody";
// import ModalFooter from "../../../../Common/Modal/ModalFooter";
import IconDownload from "./icon-download.png";
import ModalHeader from "../../../../Common/Modal/ModalHeader";
import { useNavigate, useParams } from "react-router-dom";
import UseOutsideClick from "../../../../Common/UseOutsideClick";
import Popup from "../../../../Common/Popup";
import { cancelLeaveRequest } from "../../../../store/actions/StudentAttendance";

const LeaveRequestModal = ({
  manageLRModal,
  closeModalState,
  requestDetails,
  reasonType,
}) => {
  const { user } = useSelector((state) => {
    return {
      user: state.user,
    };
  });
  const { _classroomId } = useParams();
  const [cancelPop, setCancelPop] = useState(false);
  const history = useNavigate();
  const dispatch = useDispatch();
  const RemovePopToggleRef = useRef();
  UseOutsideClick(RemovePopToggleRef, () => {
    if (cancelPop) setCancelPop(false);
  });
  const editHandler = () => {
    history(
      `/dashboard/student-edit-leave-request/${requestDetails._id}/${_classroomId}`
    );
  };
  const cancelHandler = () => {
    setCancelPop(true);
  };
  const cancelLeave = () => {
    setCancelPop(false);
    dispatch(cancelLeaveRequest(requestDetails._id, { isCancelled: true }));
    closeModalState();
  };
  return (
    <React.Fragment>
      <Modal show={manageLRModal}>
        <ModalHeader
          title="Leave Requests"
          closeButton={true}
          onclose={closeModalState}
        />
        <ModalBody>
          <ul className="LeaveRequest-Wrapper">
            <li>
              <p className="text-2xs w-300">Student Name</p>
              <p className="text-xs w-600">
                {user.user_activeRole === process.env.REACT_APP_STUDENT
                  ? user.user_fullname
                  : requestDetails.fullname}
              </p>
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
              {reasonType === "leave"
                ? requestDetails.leaveReason
                : requestDetails.rejectReason}
              <p></p>
              {/* <p>
                I kindly request you to grant me leave from {moment(requestDetails.startFrom).format('DD MMM YYYY')}. I will
                be thankful for your kindness.
              </p> */}
              {/* <p>Thanking you.</p> */}
              {requestDetails.fileUpload?.src && reasonType === "leave" ? (
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
            <li className="LR-Mail-Footer">
              {user.user_activeRole === process.env.REACT_APP_STUDENT ? (
                <React.Fragment>
                  {requestDetails.status === "pending" && requestDetails.isCancelled === false ?
                    <React.Fragment>
                      <button
                        type="button"
                        className="button button-base btn-md"
                        onClick={cancelHandler}
                      >
                        Cancel Leave
                      </button>
                      <button type="button" className="button button-base btn-md" onClick={editHandler}>
                        Edit Leave
                      </button>
                    </React.Fragment> : ""
                  }

                </React.Fragment>
              ) : (
                ""
              )}
              {cancelPop && (
                <Popup
                  show={cancelPop}
                  removeButtonLabel={"Yes, Cancel"}
                  cancelButtonLabel={"No"}
                  leaveRequest={true}
                  RemoveProp={cancelLeave}
                  RemovePopToggleRef={RemovePopToggleRef}
                  CancelProp={() => setCancelPop(!cancelPop)}
                >
                  <p className="gray text-xxs w-300">
                    You are about to cancel your applied leave.
                  </p>
                  <p className="dgray text-xxs w-400">Are you sure?</p>
                </Popup>
              )}
            </li>
          </ul>

        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};
export default LeaveRequestModal;
