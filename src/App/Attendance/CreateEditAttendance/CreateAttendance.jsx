import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ValidationUtils from "../../../Classes/ValidationUtils";
import Card from "../../../Common/Card";
import { useParams } from "react-router-dom";
import CardBody from "../../../Common/Card/CardBody";
import FormError from "../../../Common/Form/FormError";
import InputDatePicker from "../../../Common/Form/InputDatePicker";
import Modal from "../../../Common/Modal";
import ModalBody from "../../../Common/Modal/ModalBody";
import ModalFooter from "../../../Common/Modal/ModalFooter";
import ModalHeader from "../../../Common/Modal/ModalHeader";
import {
  DynamicClassroomHeader,
  DynamicCourseHeader,
} from "../../../Common/UserElement";
import {
  deleteAttendance,
  getSingleAttendanceInfo,
  postAttendance,
  resetPostAttendance,
  resetSingleAttendanceInfo,
} from "../../../store/actions/TeacherAttendance";
import UseOutsideClick from "../../../Common/UseOutsideClick";
import Popup from "../../../Common/Popup";
import { AttendanceStartTimeValidation } from "../commonFunctions";
import SelectInput from "../../../Common/Form/SelectInput";
const CreateAttendance = ({
  show,
  onclose,
  classroomId,
  propDate,
  getApiHit,
}) => {
  const dispatch = useDispatch();
  const { _subjectId } = useParams();
  const [endTimeError, setEndTimeError] = useState(false);
  const {
    user,
    classroom,
    postAttendanceState,
    singleAttendanceInfoState,
    singleAttendanceInfo,
    ClassroomDetail,
    ClassroomDetailSuccess,
  } = useSelector((state) => {
    return {
      user: state.user,
      classroom: state.classroom.list.data,
      postAttendanceState: state.teacherAttendance.postAttendance,
      singleAttendanceInfoState:
        state.teacherAttendance.getSingleAttendanceInfo,
      singleAttendanceInfo:
        state.teacherAttendance.getSingleAttendanceInfo.data.data,
      ClassroomDetail: state.classroomDetail.classrooomData.data,
      ClassroomDetailSuccess: state.classroomDetail.classrooomData.success,
    };
  });
  const [attendanceDate, setAttendanceDate] = useState(
    propDate ? propDate : new Date()
  );
  let [attendance, setAttendance] = useState([]);

  useEffect(() => {
    if (_subjectId) {
      dispatch(
        getSingleAttendanceInfo(
          user.user_institute,
          classroomId,
          _subjectId,
          attendanceDate
        )
      );
    } else {
      dispatch(
        getSingleAttendanceInfo(
          user.user_institute,
          classroomId,
          "",
          attendanceDate
        )
      );
    }

    setIsFilled(false);
  }, [_subjectId, attendanceDate, classroomId, dispatch, user.user_institute]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const addMoreAttendance = () => {
    // setFaculty([...faculty, faculty]);
    let attendanceLists = attendance;
    attendanceLists.push({
      classroom: _subjectId ? _subjectId : "",
      startTime: "",
      endTime: "",
      status: "Present",
      periodStatus: "Present",
      isObjectValuesChanged: false,
      isClassroomValid: false,
      isStartsTimeValid: false,
      isStartTimeDuplicate: false,
      isEndTimeDuplicate: false,
      isEndTimeValid: false,
    });
    setAttendance([...attendanceLists]);
  };
  const [isFilled, setIsFilled] = useState(false);
  useEffect(() => {
    if (singleAttendanceInfoState.success && !isFilled) {
      setIsFilled(true);
      if (!singleAttendanceInfo.length) {
        setAttendance([
          {
            classroom: _subjectId ? _subjectId : "",
            startTime: "",
            endTime: "",
            status: "Present",
            periodStatus: "Present",
            isClassroomValid: false,
            isStartsTimeValid: false,
            isEndTimeValid: false,
            isStartTimeDuplicate: false,
            isEndTimeDuplicate: false,
          },
        ]);
      } else {
        let arrayValidationsFill = [];
        for (let index = 0; index < singleAttendanceInfo.length; index++) {
          const element = singleAttendanceInfo[index];
          arrayValidationsFill.push({
            ...element,
            periodId: element._id,
            isClassroomValid: false,
            isStartTimeDuplicate: false,
            isEndTimeDuplicate: false,
            isCompareEndTimeValid: true,
            isStartsTimeValid: false,
            isEndTimeValid: false,
          });
        }

        setAttendance(arrayValidationsFill);
      }
    }
  }, [
    singleAttendanceInfo,
    attendance,
    attendanceDate,
    singleAttendanceInfoState.success,
    _subjectId,
    isFilled,
  ]);
  const [RemovePop, setRemovePop] = useState(false);
  const [deleteID, setDeleteID] = useState("");
  const RemovePopState = (_id) => {
    setRemovePop(!RemovePop);
    setDeleteID(_id);
  };
  const RemovePopToggleRef = useRef();

  UseOutsideClick(RemovePopToggleRef, () => {
    if (RemovePop) setRemovePop(false);
  });

  const handleInputSubject = (e, key) => {
    let inputValue = e.target.value;
    let allinputs = attendance;
    allinputs[key]["classroom"] = inputValue;
    attendance[key]["isObjectValuesChanged"] = true;
    allinputs[key]["isClassroomValid"] = ValidationUtils.isNotEmpty(inputValue);
    setAttendance([...allinputs]);
    isSubjectValid();
  };
  const removeAttendance = (key) => {
    let attendanceLists = [...attendance];
    if (attendanceLists[key]["_id"]) {
      dispatch(deleteAttendance(attendanceLists[key]["_id"]));
      attendanceLists.splice(key, 1);
      getApiHit();
      setAttendance([...attendanceLists]);
      setRemovePop(!RemovePop);
    } else {
      attendanceLists.splice(key, 1);
      setAttendance([...attendanceLists]);
      setRemovePop(!RemovePop);
    }
    // setAttendance([...attendanceLists]);
    // setRemovePop(!RemovePop)
  };
  const handleTime = (selectedTime, timing, key) => {
    if (timing === "startTime") {
      let allinputs = attendance;
      allinputs[key]["startTime"] = selectedTime;
      allinputs[key]["isObjectValuesChanged"] = true;
      allinputs[key]["isStartsTimeValid"] = ValidationUtils.isNotEmpty(
        selectedTime.toString()
      );
      allinputs[key]["isStartTimeDuplicate"] = AttendanceStartTimeValidation(
        attendance,
        selectedTime,
        key
      );
      setAttendance([...allinputs]);
      isStartTimeValid();

      isEndsTimeValid();
      isDuplicateStartTime();
    } else {
      let allinputs = attendance;
      allinputs[key]["endTime"] = selectedTime;
      allinputs[key]["isObjectValuesChanged"] = true;
      allinputs[key]["isEndTimeValid"] =
        ValidationUtils.isNotEmpty(selectedTime && selectedTime.toString()) &&
        allinputs[key]["startTime"] < allinputs[key]["endTime"];
      allinputs[key]["isCompareEndTimeValid"] =
        new Date(allinputs[key]["startTime"]) <
        new Date(allinputs[key]["endTime"]);
      // && AttendanceEndTimeValidation(attendance,selectedTime,key)
      setAttendance([...allinputs]);
      isEndsTimeValid();
      setEndTimeError(false);
      isDuplicateStartTime();
    }
  };
  const handleStatus = (value, key) => {
    attendance[key]["status"] = value;
    attendance[key]["periodStatus"] = value;
    attendance[key]["isObjectValuesChanged"] = true;
    attendance[key]["isStatusValid"] = ValidationUtils.isNotEmpty(value);
    setAttendance([...attendance]);
  };
  const [showSubjectError, setShowSubjectError] = useState(false);
  const [showStartTimeError, setShowStartTimeError] = useState(false);
  const [dupicateStartTime, setDuplicateStartTime] = useState(false);
  // const [dupicateEndsTime, setDuplicateEndsTime] = useState(false)
  const [showEndsTimeError, setShowEndsTimeError] = useState(false);
  const isSubjectValid = () => {
    let isValid = true;
    for (let key = 0; key < attendance.length; key++) {
      const element = attendance[key];
      if (ValidationUtils.isEmpty(element.classroom)) {
        isValid = false;
        break;
      }
    }
    if (isValid) {
      setShowSubjectError(false);
    } else {
      setShowSubjectError(true);
    }
    return isValid;
  };
  const isStartTimeValid = () => {
    let isValid = true;
    for (let key = 0; key < attendance.length; key++) {
      const element = attendance[key];
      if (ValidationUtils.isEmpty(element.startTime.toString())) {
        isValid = false;
        break;
      }
    }
    if (isValid) {
      setShowStartTimeError(false);
    } else {
      setShowStartTimeError(true);
    }
    return isValid;
  };
  const isEndsTimeValid = () => {
    let isValid = true;
    for (let key = 0; key < attendance.length; key++) {
      const element = attendance[key];
      if (
        ValidationUtils.isEmpty(
          element.endTime && element.endTime.toString()
        ) ||
        (element.endTime && element.startTime) >
        (element.endTime && element.endTime)
      ) {
        isValid = false;
        break;
      }
    }
    if (isValid) {
      setShowEndsTimeError(false);
    } else {
      setShowEndsTimeError(true);
    }
    return isValid;
  };
  const isDuplicateStartTime = () => {
    let isValid = true;
    for (let key = 0; key < attendance.length; key++) {
      const element = attendance[key];
      if (!AttendanceStartTimeValidation(attendance, element.startTime, key)) {
        isValid = false;
        break;
      }
    }
    if (isValid) {
      setDuplicateStartTime(false);
    } else {
      setDuplicateStartTime(true);
    }
    return isValid;
  };

  const closeModalState = () => {
    onclose();
  };
  const attendanceData = attendance.filter(
    (item) => item.isObjectValuesChanged === true
  );
  const postData = () => {
    if (_subjectId) {
      return {
        attendanceDate: attendanceDate,
        classroom: _subjectId,
        institute: user.user_institute,
        owner: user._id,
        course: classroomId,
        attendance: attendanceData,
      };
    } else {
      return {
        attendanceDate: attendanceDate,
        institute: user.user_institute,
        owner: user._id,
        course: classroomId,
        attendance: attendanceData,
      };
    }
  };

  const saveAttendance = () => {
    setEndTimeError(true);
    const isValidSubject = isSubjectValid();
    const isValidStartTime = isStartTimeValid();
    const isValidEndsTime = isEndsTimeValid();
    const isDuplicateStartTiming = isDuplicateStartTime();
    if (
      isValidSubject &&
      isValidStartTime &&
      isValidEndsTime &&
      isDuplicateStartTiming
    ) {
      dispatch(postAttendance(postData()));
    }
  };
  if (postAttendanceState.success) {
    onclose();
    setTimeout(() => {
      dispatch(resetPostAttendance());
    }, 200);
  }
  useEffect(() => {
    return () => {
      dispatch(resetSingleAttendanceInfo());
    };
  }, [dispatch]);
  const handleAttendanceDate = (selectedDate) => {
    let data = [];
    setAttendanceDate(selectedDate);
    setAttendance(data);
  };
  return (
    <React.Fragment>
      <Modal show={show} className="MarkAttendance-Modal">
        <ModalHeader
          // title={`Class ${moment(new Date()).format("DD MM YYYY")}`}
          closeButton={true}
          onclose={closeModalState}
        >
          <div className="MarkAttendance-ModalHead">
            <div className="ClassNameCst">
              {_subjectId ? (
                <React.Fragment>
                  <p className="text-2xs w-300">
                    <DynamicCourseHeader /> & <DynamicClassroomHeader />
                  </p>
                  <p className="text-sm w-600">{`${ClassroomDetailSuccess
                    ? ClassroomDetail.data_courseInfo_coursename
                    : ""
                    }, ${ClassroomDetailSuccess
                      ? ClassroomDetail.data_classroomInfo_classroomname
                      : ""
                    }`}</p>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <p className="text-2xs w-300">
                    <DynamicCourseHeader />
                  </p>
                  <p className="text-sm w-600">{`${ClassroomDetailSuccess ? ClassroomDetail.coursename : ""
                    }`}</p>
                </React.Fragment>
              )}
              {/* <p className="text-xxs w-400">
              {moment(new Date()).format("DD - MM - YYYY")}
            </p> */}
            </div>
            <div className="datePickerWrap">
              <InputDatePicker
                name="startDate"
                onSelect={handleAttendanceDate}
                value={attendanceDate}
                maxDate={new Date()}
                id="startDate"
                type="date"
                placeholder="Attendance Date"
              />
            </div>
          </div>
        </ModalHeader>
        {singleAttendanceInfoState.success ? (
          <React.Fragment>
            <ModalBody>
              <div className="MarkAttendance-Item">
                {attendance.map((attendanceData, key) => {
                  return (
                    <React.Fragment>
                      <Card className="cardPadding">
                        <CardBody>
                          <div className="MarkAttendance-ItemInputWrap">
                            <div className="formFieldwrap">
                              <SelectInput
                                onChange={(e) => handleInputSubject(e, key)}
                                name={key}
                                id="select_Classroom"
                                value={
                                  _subjectId
                                    ? _subjectId
                                    : attendanceData.classroom
                                }
                                disabled={_subjectId ? true : false}
                                label={`select Subject`}
                              >
                                <option value="">
                                  Select {DynamicClassroomHeader()}
                                </option>
                                {classroom.length
                                  ? classroom
                                    // .filter(
                                    //   (c) => c.course === faculty.course
                                    // )
                                    .map((item) => {
                                      return (
                                        <option value={item._id}>
                                          {item.classroomname}
                                        </option>
                                      );
                                    })
                                  : ""}
                              </SelectInput>

                              {showSubjectError && (
                                <FormError
                                  show={!attendance[key]["isClassroomValid"]}
                                  error={
                                    DynamicClassroomHeader() + " is required."
                                  }
                                ></FormError>
                              )}
                            </div>
                            <div className="datePickerWrap ">
                              <InputDatePicker
                                value={attendanceData.startTime}
                                onSelect={(selectedTime) =>
                                  handleTime(selectedTime, "startTime", key)
                                }
                                showTimeSelect
                                showTimeSelectOnly
                                name="startTiming"
                                timeIntervals={5}
                                dateFormat="h:mm aa"
                                label="Session Start Time"
                                type="time"
                                placeholder="Session Start Time"
                              />
                              {showStartTimeError && (
                                <FormError
                                  show={
                                    !attendanceData.isStartsTimeValid &&
                                    !attendanceData.startTime
                                  }
                                  error={"Start Time is required."}
                                />
                              )}
                              {dupicateStartTime && (
                                <FormError
                                  show={
                                    !attendanceData.isStartTimeDuplicate &&
                                    attendanceData.startTime !== ""
                                  }
                                  error={"Invalid Start Time."}
                                />
                              )}
                            </div>
                            <div className="datePickerWrap ">
                              <InputDatePicker
                                value={attendanceData.endTime}
                                onSelect={(selectedTime) =>
                                  handleTime(selectedTime, "endTime", key)
                                }
                                showTimeSelect
                                showTimeSelectOnly
                                name="endTiming"
                                timeIntervals={5}
                                dateFormat="h:mm aa"
                                label="Session End Time"
                                type="time"
                                placeholder="Session End Time"
                              />
                              {showEndsTimeError && (
                                <React.Fragment>
                                  <FormError
                                    show={
                                      endTimeError &&
                                      !attendanceData.isEndTimeValid &&
                                      !attendanceData.endTime
                                    }
                                    error={"End Time is required."}
                                  />
                                  <FormError
                                    show={
                                      !attendanceData.isCompareEndTimeValid &&
                                      attendanceData.endTime &&
                                      attendanceData.endTime.toString() !== ""
                                    }
                                    error={
                                      "End time should be after start time."
                                    }
                                  />
                                </React.Fragment>
                              )}
                            </div>
                          </div>
                          <p className="text-xxs w-600">Mark all as</p>
                          <div className="MarkAttendance-ItemActionWrap">
                            <div className="MarkAttendance-ItemActionLeft">
                              <button
                                onClick={() => handleStatus("Present", key)}
                                // className="button button-base btn-sm base"
                                className={
                                  attendance[key]["periodStatus"] === "Present"
                                    ? "button button-base btn-xs"
                                    : "button btn-o-base btn-xs base"
                                }
                              >
                                Present
                              </button>
                              <button
                                onClick={() => handleStatus("Absent", key)}
                                // className="button button-base btn-sm base"
                                className={
                                  attendance[key]["periodStatus"] === "Absent"
                                    ? "button button-base btn-xs"
                                    : "button btn-o-base btn-xs base"
                                }
                              >
                                Absent
                              </button>
                              {/* <button
                                  onClick={() => handleStatus("Leave", key)}
                                  // className="button button-base btn-sm base"
                                  className={
                                    attendance[key]["periodStatus"] === "Leave"
                                      ? "button button-primary btn-xs"
                                      : "button btn-o-primary btn-xs primary"
                                  }
                                >
                                  Leave
                                </button> */}
                            </div>
                            <div className="MarkAttendance-ItemActionRight">
                              {attendance.length !== 1 && (
                                <button
                                  type="button"
                                  onClick={(e) => RemovePopState(key)}
                                  className="red RemoveAttendance"
                                >
                                  <i className="ed-trash"></i>
                                </button>
                              )}
                            </div>
                            {key === deleteID && RemovePop && (
                              <Popup
                                show={RemovePop}
                                RemovePopToggleRef={RemovePopToggleRef}
                                CancelProp={() => setRemovePop(!RemovePop)}
                                RemoveProp={() => removeAttendance(key)}
                                className={"customPopup"}
                              >
                                <p className="gray text-xxs w-300">
                                  You are about to remove this Attendance.
                                </p>
                                <p className="dgray text-xxs w-400">
                                  Are you sure?
                                </p>
                              </Popup>
                            )}
                          </div>
                        </CardBody>
                      </Card>
                    </React.Fragment>
                  );
                })}

                <FormError
                  show={dupicateStartTime}
                  error="Duplicate Periods Time. Check all timing."
                />
                {attendance.length < 20 && (
                  <button
                    onClick={addMoreAttendance}
                    className="button btn-o-primary primary btn-sm mt-30"
                  >
                    Add More Session
                  </button>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              {postAttendanceState.loading ? (
                <button className="button button-base btn-sm base">
                  Saving Attendance...
                </button>
              ) : (
                <button
                  className="button button-base btn-sm base"
                  onClick={saveAttendance}
                >
                  Save Attendance
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
export default CreateAttendance;
