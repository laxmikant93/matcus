import { bool, string } from "prop-types";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
// import { useDetectOutsideClick } from "../../../Common/DetectOutsideClick/useDetectOutsideClick";
import DummyProfile from "./DummyProfile.png";
// import infoicon from "./Icon-feather-info.svg";
import FormTextArea from "../../../Common/Form/FormTextArea";
import { useSelector, useDispatch } from "react-redux";
import MinutesSelect from "../../../Common/Form/MinutesSelect";
import {
  getGraceRequest,
  PostTeacherReject,
  PostTeacherAccept,
  getStudentListSubmittedExam,
  resetGraceAccept,
  resetGraceReject,
} from "../../../store/actions/onlineexam";
import { subscriberToTopic } from "../../../firebase/subscribetopic";
import { messaging } from "../../../firebase/messaginInit";
import FormError from "../../../Common/Form/FormError"
import ValidationFile from "../../../Classes/ValidationFile";
import { setCommonError } from "../../../store/actions/commonerror";
import moment from "moment";

function TeacherAttendeesList({
  studentName,
  studentImage,
  status,
  examID,
  studentID,
  viewRequest,
  RequestAccepted,
  Autosubmit,
  Rejected,
  Accepted,
  submittedOn,
  startExam,
  studentProfile,
  studentEmail,
  studentAdmission,
  windowSwtich,
  resumeTime,
  contact,
  Terminated,
  endExam
}) {
  const {
    graceRequest,
    users,
    rejectedSuccess,
    studentListSuccess,
    rejectedLoading,
    acceptSuccess,
    acceptLoading,
  } = useSelector((state) => {
    return {
      users: state.user,
      rejectedSuccess: state.onlineexam.rejectRequest.success,
      rejectedLoading: state.onlineexam.rejectRequest.loading,
      acceptSuccess: state.onlineexam.acceptRequest.success,
      acceptLoading: state.onlineexam.acceptRequest.loading,
      graceRequest: state.onlineexam.graceRequest.data,
      studentListSuccess: state.onlineexam.studentList.success,
    };
  });

  async function firenotification() {
    if (messaging) {
      messaging.onMessage((payload) => {
        dispatch(getStudentListSubmittedExam(_id));
      });
      if (users._id) {
        const firebaseToken = await messaging.getToken();
        subscriberToTopic(firebaseToken, users._id);
      }
    }
  }

  useEffect(() => {
    firenotification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatch = useDispatch();
  const { _id } = useParams();

  const [modalState, setModalState] = useState(false);

  const manageModalState = (examID, studentID) => {
    dispatch(getGraceRequest(examID, studentID));
    setModalState(!modalState);
  };

  const closeModalState = () => {
    setModalState(false);
  };
  // showminPopup
  // const dropdownRef = useRef(null);
  // const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);



  // const onClickBtnDropDownToogle = () => {
  //   setIsActive(!isActive);
  // };

  // SECOND POPUP
  const [modalState2, setModalState2] = useState(false);

  const manageModalState2 = () => {
    closeModalState();
    setModalState2(!modalState2);
  };

  const closeModalState2 = () => {
    setModalState2(false);
  };
  const closeModalState3 = () => {
    setModalState2(false);
    setModalState(!modalState);
  };

  const [newexperience, setNewexperience] = useState({
    GraceRequest: {
      value: "",
      isValid: false,
    },
    Choose: {
      value: "",
      isValid: false,
    },
    validation: false,
  });
  const [expField, setExField] = useState(false);

  const isFormValid = () => {
    return newexperience.GraceRequest.isValid || newexperience.Choose.isValid
      ? true
      : false;
  };

  const validationConfirm = (inputValue, inputName) => {
    switch (inputName) {
      case "GraceRequest":
        return ValidationFile.validEmpty(inputValue);
      case "Choose":
        return ValidationFile.validEmpty(inputValue);
      default:
        return false;
    }
  };

  const [GraceRequest, setGraceRequest] = useState("");
  const [Choose] = useState("Choose Minutes");

  const handleInput = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    let newexperienceData = {
      ...newexperience,
      [inputName]: {
        value: inputValue,
        isValid: validationConfirm(inputValue, inputName),
      },
      validation: isFormValid(),
    };
    setNewexperience(newexperienceData);
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    setExField(true);
    if (isFormValid()) {
      dispatch(PostTeacherAccept(GraceTimeExtend()));
    }
  };
  if (acceptSuccess || rejectedSuccess) {
    dispatch(getStudentListSubmittedExam(_id));
  }

  if (studentListSuccess && (acceptSuccess || rejectedSuccess)) {
    dispatch(resetGraceAccept());
    dispatch(resetGraceReject());
    closeModalState();
    closeModalState2();
  }

  const handelSubmit2 = (e) => {
    e.preventDefault();
    setExField(true);
    if (isFormValid()) {
      dispatch(PostTeacherReject(GraceSubmitData()));
      dispatch(setCommonError("Grace Time Request Rejected."));
    }
    ResetForm();
  };

  const ResetForm = () => {
    setGraceRequest("");
  };

  const GraceSubmitData = () => {
    return {
      rejectDiscription: newexperience.GraceRequest.value,
      action: "reject",
      examId: examID,
      studentId: studentID,
    };
  };
  const GraceTimeExtend = () => {
    return {
      extendedTime: newexperience.Choose.value,
      action: "approve",
      examId: examID,
      studentId: studentID,
    };
  };

  // First
  const [onlineShow, setOnlineShow] = useState("");
  const [ToggleSectionTitle, SetToggleSectionTitle] = useState(false);

  const handleClick = (studentID) => {
    setOnlineShow(studentID);
    SetToggleSectionTitle(!ToggleSectionTitle);
  };

  let reverse
  if (windowSwtich) reverse = windowSwtich.slice(0).reverse()

  return (
    <ul className="topInfo">
      <li className="col col-1">
        <div className="profileImgWrap">
          {studentImage ? (
            <a
              href={`/profile/${studentProfile}`}
              target="_blank"
              rel="noreferrer"
            >
              <img className="ListTableImg" src={studentImage} alt="data" />
            </a>
          ) : (
            <a
              href={`/profile/${studentProfile}`}
              target="_blank"
              rel="noreferrer"
            >
              <img className="ListTableImg" src={DummyProfile} alt="data" />
            </a>
          )}
        </div>
      </li>

      <li className="col col-2" data-column="Student Name">
        <a href={`/profile/${studentProfile}`} target="_blank" rel="noreferrer">
          {studentName}
        </a>
        <p>{studentEmail}</p>
        <p>{studentAdmission}</p>
        <p>{contact}</p>
      </li>

      <li className="col col-2" data-column="Status">
        {status === "Participated" ? (
          <p>Participated</p>
        ) : status === "Participating" ? (
          <p>Participating</p>
        ) : (
          <p className="red">Not Participated</p>
        )}
      </li>
      {
        Terminated
      }
      <li className="col col-3" data-column="Attend/Leave/ResumeTime">
        {/* terminated textpopup Mukesh Add */}
        <div className="terminateInfoIcon">
          {Terminated && <p className="red mb-3">
            Terminated{" "}
            {/* <img
              src={infoicon}
              alt=""
              width="16"
              onClick={onClickBtnDropDownToogle}
            /> */}
          </p>}
          {/* {onClickBtnDropDownToogle ? (
            <div
              ref={dropdownRef}
              className={`popup removePopup terminatedPopuponline ${isActive ? "active" : "inactive"
                }`}
            >
              <span
                className="closepopupbutton text-xxs gray"
                onClick={onClickBtnDropDownToogle}
              >
                X Close
              </span>
              <h4 className="text-xs base w-400">This Test was strict mode.</h4>
              <p className="sub-heading base text-xxs clampline2online">
                when student minimizes exam should terminated when student
                minimizes exam should terminated
              </p>
              <div className="removePopBtn"></div>
            </div>
          ) : (
            ""
          )} */}
        </div>
        {status === "Participated" ? `${moment(startExam).format("h:mm a")} ` : ""}-{status === "Participated" && submittedOn ? moment(submittedOn).format("h:mm a") : ""}

      </li>

      <li className="col col-2" data-column="Window Switch">
        <div className="windowswitchWrappermain">
          <p>
            {reverse && reverse.length > 0
              ? reverse.length
              : "0"}
          </p>
          {reverse && reverse.length > 0 ? (
            <div className="windowSwitchdropdownwrapper">
              <button
                className={`btnText BtnCaret text-xxs w-300 ${ToggleSectionTitle && studentID === onlineShow ? `active` : ``
                  }`}
                onClick={() => handleClick(studentID, false)}
              >
                {ToggleSectionTitle && studentID === onlineShow}{reverse && moment(reverse[0]).format("h:mm a")}
              </button>
              {studentID === onlineShow && ToggleSectionTitle && (
                <div className="windowSwitchdropdown">
                  {reverse && reverse.length > 0
                    ? reverse.map((item, index) => (
                      <p key={index}>{moment(item).format("h:mm a")}</p>
                    ))
                    : ""}
                </div>
              )}
            </div>
          ) : ""}
        </div>
      </li>

      <li className="col col-2" data-column="Grace Request">
        <div>
          {Accepted ? (
            <p className="mt-5 secondary">Request Accepted</p>
          ) : Rejected ? (
            <p className="mt-5 red">Request Rejected</p>
          ) : (
            ""
          )}
          {viewRequest && (
            <button
              className={`button   btn-sm ${Accepted || Rejected
                ? "button-transparent gray underline"
                : Autosubmit && !Rejected && !Accepted
                  ? " button-secondary"
                  : "btn-o-secondary secondary"
                }`}
              onClick={() => manageModalState(examID, studentID)}
            >
              View Request
            </button>
          )}
          <div className={`modal modalShowing-${modalState}`}>
            <div className="modalwrapper">
              <span
                className="closeModal text-xxs gray"
                onClick={() => closeModalState()}
              >
                X Close
              </span>
              <p className="text-xs mb-20">{graceRequest.fullname}</p>
              <p>Requested</p>
              <p className="text-xs w-500 mt-3">Grace Time</p>

              <p className="text-xxs gray mt-20">Request Message</p>
              <p className="text-xxs mt-3">{graceRequest.graceDiscription}</p>
              <div className="attached-assignment">
                {graceRequest.fileUploadGraceTime ? (
                  <a
                    className="button btn-xs button-secondary mt-10"
                    href={graceRequest.fileUploadGraceTime}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="ed-icon icon-attachment white i-s"></i>
                    View Attachment
                  </a>
                ) : (
                  ""
                )}
                <p className="text-xxs gray mt-30 mb-3">Extend Time</p>
                <div className="formFieldwrap">
                  <MinutesSelect
                    start={5}
                    end={60}
                    step={4}
                    text=""
                    name="Choose"
                    defaultSelect={Choose}
                    onEvent={handleInput}
                    disabled={RequestAccepted ? true : false}
                    label="Select Minutes"
                  />
                  <FormError
                    show={!newexperience.Choose.isValid && expField}
                    error="Please provide extended duration."
                  />
                </div>
              </div>
              {acceptLoading ? (
                <button className="button button-secondary btn-xs">
                  Accepting...
                </button>
              ) : (
                <button
                  className="button button-secondary btn-xs"
                  type="submit"
                  disabled={RequestAccepted}
                  onClick={handelSubmit}
                >
                  Accept
                </button>
              )}

              <button
                className="button btn-o-secondary secondary btn-xs"
                onClick={() => manageModalState2()}
                disabled={RequestAccepted}
              >
                Reject
              </button>
            </div>
          </div>
          <div className={`modal modalShowing-${modalState2}`}>
            <div className="modalwrapper">
              <span
                className="closeModal text-xxs gray"
                onClick={() => closeModalState2()}
              >
                X Close
              </span>
              <form onSubmit={handelSubmit2}>
                <p className="text-xs mb-20">{studentName}</p>
                <p>Requested</p>
                <p className="text-xs w-500 mt-3">Grace Time</p>
                <p className="text-xxs gray w-500 mt-10">
                  Add reason for rejection.
                </p>
                <div className="formFieldwrap mt-10">
                  <FormTextArea
                    label="Description"
                    name="GraceRequest"
                    rows="4"
                    placeholder="Add reason for rejection."
                    maxLength="150"
                    defaultValue={GraceRequest}
                    onChange={handleInput}
                    onKeyUp={handleInput}
                  />
                  <FormError
                    show={!newexperience.GraceRequest.isValid && expField}
                    error="Type here your genuine reason."
                  />
                </div>

                {rejectedLoading ? (
                  <button className="button button-secondary btn-xs">
                    Loading...
                  </button>
                ) : (
                  <button
                    className="button button-secondary btn-xs"
                    type="submit"
                  >
                    Add Comment
                  </button>
                )}
                <span
                  className="button btn-o-red red btn-xs"
                  onClick={() => closeModalState3()}
                >
                  Cancel
                </span>
              </form>
            </div>
          </div>
        </div>
      </li>
    </ul>
  );
}

TeacherAttendeesList.defaultProps = {
  studentName: undefined,
  studentImage: undefined,
  studentAdmission: undefined,
  status: "",
  submittedOn: string,
  startExam: string,
  RequestAccepted: false,
  Autosubmit: false,
  Accepted: false,
  Rejected: false,
  resumeTime: string,
};

TeacherAttendeesList.propTypes = {
  studentName: string.isRequired,
  studentImage: string,
  studentAdmission: string,
  status: string.isRequired,
  submittedOn: string,
  startExam: string,
  RequestAccepted: bool,
  Autosubmit: bool,
  Accepted: bool,
  Rejected: bool,
  resumeTime: string,
};

export default TeacherAttendeesList;
