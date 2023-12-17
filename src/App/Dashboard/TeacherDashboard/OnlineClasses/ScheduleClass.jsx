/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Modal from "../../../../Common/Modal";
import ModalHeader from "../../../../Common/Modal/ModalHeader";
import { changeClassroomAssignedDataResets } from "../../../../store/actions/classroomassigned";
import ZoomModal from "./ZoomModal";
import GoogleMeetLogo from "./logo-googlemeet.svg";
import ZoomLogo from "./logo-zoom.svg";
// import MeetModal from "./MeetModal";
import { getStudentList } from "../../../../store/actions/onlineClasses";

const ScheduleClass = ({
  isEditable,
  handleClosePopupFromComponent,
  scheduleMeetingOn,
  editClassesData,
}) => {
  const dispatch = useDispatch();
  const { onlineClasses, onlineclassSuccess } = useSelector((state) => {
    return {
      onlineClasses: state.onlineClasses.list.data,
      onlineclassSuccess: state.onlineClasses.list.success,
    };
  });

  const [openPopup, setOpenPopup] = useState(false);
  const [ScheduleClassModal, SetScheduleClassModal] = useState(false);
  const [storedPopup, setStoredPopup] = useState(false);
  const [isSchduleViaGoogle, setIsSchduleViaGoogle] = useState(false);
  const [openPopupForEdit, setOpenPopupForEdit] = useState(false);
  // const [onlineclassInfo, setOnlineClassInfo] = useState(emptyOnlineClassInfo);
  // const [showSubmitError, setShowSubmitError] = useState(false);
  // const [showGoogleSubmitError, setShowGoogleSubmitError] = useState(false);

  useEffect(() => {
    let keepPopUpOpen = localStorage.getItem("openPopUp");
    let isSelectedMeet = localStorage.getItem("isChooseMeet");

    setStoredPopup(keepPopUpOpen);
    setIsSchduleViaGoogle(isSelectedMeet);
  }, []);

  useEffect(() => {
    let openPopUpEdit = isEditable ? true : false;
    setOpenPopupForEdit(openPopUpEdit);
  }, [isEditable]);

  const popUpToggle = () => {
    SetScheduleClassModal(!ScheduleClassModal);
    localStorage.setItem("openPopUp", true);
    setOpenPopup(true);
    setStoredPopup(false);
    // dispatch(getStudentList(_courseid, _classroomid, _insid))
  };

  const closeModalState = () => {
    localStorage.removeItem("openPopUp", false);
    setOpenPopup(false);
    setStoredPopup(false);
    setIsSchduleViaGoogle(false);
    setOpenPopupForEdit(false);
    localStorage.removeItem("isChooseMeet");

    setTimeout(() => {
      dispatch(changeClassroomAssignedDataResets());
    }, 100);

    SetScheduleClassModal(!ScheduleClassModal);

    isEditable && handleClosePopupFromComponent();
  };

  const scheduleviaZoom = () => {
    setIsSchduleViaGoogle(false);
    localStorage.removeItem("isChooseMeet");
  };

  const scheduleviaGoogle = () => {
    setIsSchduleViaGoogle(true);
    localStorage.setItem("isChooseMeet", true);
  };

  return (
    <div className="PageTopHead PTH-TeacherOnlineClass1 mt-20">
      <div className="PTH-Item">
        <p className="text-sm w-300">
          {onlineclassSuccess && onlineClasses.length} Online Classes
        </p>
      </div>
      <div className="PTH-Item">
        <button
          className="button button-secondary btn-oval btn-sm button-block"
          onClick={popUpToggle}
        >
          <i className="ed-icon icon-plus-add white i-xs"></i>Schedule Class
        </button>

        <Modal
          ModalSize="modal-m"
          show={openPopup || storedPopup || openPopupForEdit}
        >
          <ModalHeader
            title="Schedule live class"
            TitleClass="mb-20"
            closeButton={true}
            onclose={closeModalState}
          />

          {/* <ModalBody> */}
          <div className="ChooseLiveClassVia">
            <p className="text-xxs w-600">
              {isEditable ? "Class Scheduled via" : "Choose class via"}
            </p>
            {!openPopupForEdit ? (
              <div className="LiveClassOptSelect mt-8">
                <button
                  className={`button btn-md ${isSchduleViaGoogle ? "btn-o-silver" : "btn-o-primary"
                    }`}
                  onClick={scheduleviaZoom}
                >
                  <img src={ZoomLogo} alt="Zoom" />
                </button>
                <button
                  className={`button btn-md ${isSchduleViaGoogle ? "btn-o-primary" : "btn-o-silver"
                    }`}
                  onClick={scheduleviaGoogle}
                >
                  <img src={GoogleMeetLogo} alt="Google Meet" />
                </button>
              </div>
            ) : scheduleMeetingOn !== "GoogleMeet" ? (
              <div className="LiveClassOptSelect mt-8">
                <button className={`button btn-md btn-o-primary`}>
                  <img src={ZoomLogo} alt="Zoom" />
                </button>
              </div>
            ) : (
              <div className="LiveClassOptSelect mt-8">
                <button className={`button btn-md btn-o-primary`}>
                  <img src={GoogleMeetLogo} alt="Google Meet" />
                </button>
              </div>
            )}
          </div>

          {isSchduleViaGoogle || scheduleMeetingOn === "GoogleMeet" ? (
            ""
          ) : (
            // <MeetModal
            //   closeModal={closeModalState}
            //   editClassesData={editClassesData}
            //   isEditable={isEditable}
            // // handleClosePopupFromComponent={handleClosePopupFromComponent}
            // />
            <ZoomModal
              closeModal={closeModalState}
              editClassesData={editClassesData}
              isEditable={isEditable}
            // handleClosePopupFromComponent={handleClosePopupFromComponent}
            />
          )}

          {/* </ModalBody> */}
          {/* <ZoomModal /> */}
        </Modal>
      </div>
    </div>
  );
};

export default ScheduleClass;
