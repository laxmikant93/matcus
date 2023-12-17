import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CourseSelect from "../../../Common/Form/CourseSelect";
import FormError from "../../../Common/Form/FormError";
import FormInput from "../../../Common/Form/FormInput";
import InputDatePicker from "../../../Common/Form/InputDatePicker";
import MinutesSelect from "../../../Common/Form/MinutesSelect";
import {
  DynamicClassroomHeader,
  DynamicCourseHeader,
} from "../../../Common/UserElement";
import { getClassroomAssignedData } from "../../../store/actions/classroomassigned";
import {
  editOnlineClass,
  getOnlineClass,
  postOnlineClasses,
  postOnlineClassesMeet,
  resetSingleClass,
  resetOnlineClasses,
} from "../../../store/actions/onlineClasses";
import ClassroomSelect from "../../../Common/Form/ClassroomSelect";
import ValidationFile from "../../Auth/ValidationFile";

import ValidationDateTime from "../../../Classes/ValidationFile";
import Recurring from "./Recurring";
import "./Recurring.scss";
import { getAssignedStudents } from "../../../store/actions/studentjoinclass";
import { classes_constant } from "../../../Constant/classes";
import Storage from "../../../Classes/Storage";
import AssignToStudents from "../../../Common/SelectSearchAssignTo/AssignToStudents";
import ZoomVerificationPopup from "../ZoomVerificationPopup";
const ClassMethod = ({ meetingOn, setMeetingOn }) => {
  const history = useNavigate();
  const dispatch = useDispatch();
  // setMeetingOn(meetingOn)
  let { _id, _classroomId, _subjectId } = useParams();

  useEffect(() => {
    if (window.location.pathname.includes("create-admin-onlineClass")) {
      Storage.setBool("SwitchOnlineClasses", true);
      Storage.remove("SwitchOnlineClassesTeacherClassroom");
    } else if (
      window.location.pathname.includes(
        "dashboard/teacher/create-subject-onlineclass"
      )
    ) {
      Storage.setBool("SwitchOnlineClassesTeacherClassroom", true);
      Storage.remove("SwitchOnlineClasses");
    } else {
      Storage.remove("SwitchOnlineClasses");
      Storage.remove("SwitchOnlineClassesTeacherClassroom");
    }
  }, []);

  useEffect(() => {
    const allParams = {
      classroom: _classroomId && _classroomId,
      subject: _subjectId && _subjectId,
    };
    Storage.setJson("__onlineClassRoutes__", allParams);
  }, [_classroomId, _subjectId]);

  const [classPostInfo, setClassPostInfo] = useState({
    course: {
      value: "",
      isValid: false,
    },
    institute: {
      value: "",
      isValid: true,
    },
    owner: {
      value: "",
      isValid: true,
    },
    classRoom: {
      value: "",
      isValid: false,
    },
    startDate: {
      value: "",
      isValid: false,
    },
    end_timing: {
      value: "",
      isValid: true,
    },
    startTiming: {
      value: "",
      isValid: false,
    },
    duration: {
      value: 10,
      isValid: false,
    },
    class_timing: {
      value: "",
      isValid: true,
    },
    classType: {
      value: 2,
      isValid: true,
    },
    endDate: {
      value: "",
      isValid: true,
    },
    classTopic: {
      value: "",
      isValid: false,
    },
    agenda: {
      value: "",
      isValid: false,
    },
    recurrence_type: {
      value: "",
      isValid: true,
    },
    repeat_interval: {
      value: "",
      isValid: true,
    },
    recurring_days: {
      value: [],
      isValid: true,
    },
    monthly_day: {
      value: 1,
      isValid: true,
    },
    validation: false,
  });

  const [formError, setFormError] = useState(false);
  const [recurring, setRecurring] = useState(false);
  const [recurringtype, setRecurringType] = useState("DAILY");
  const handleRecurring = () => {
    setRecurring(true);
    let classPostData = {
      ...classPostInfo,
      classType: {
        value: 8,
        isValid: true,
      },
      recurring_days: {
        value: [],
        isValid: false,
      },
      endDate: {
        value: "",
        isValid: false,
      },
    };
    setClassPostInfo(classPostData);
  };
  const handleNormal = () => {
    setRecurring(false);
    let classPostData = {
      ...classPostInfo,
      classType: {
        value: 2,
        isValid: true,
      },
      recurring_days: {
        value: [],
        isValid: true,
      },
      endDate: {
        value: "",
        isValid: true,
      },
    };
    setClassPostInfo(classPostData);
  };
  // Redux
  const {
    users,
    singleClassData,
    singleClasssuccess,
    classCreateSuccess,
    classCreateLoading,
    classEditLoading,
    classEditSuccess,
    getStudentList,
    getStudentListSuccess,
    zoomVerification,
    zoomVerificationSuccess,
  } = useSelector((state) => {
    return {
      users: state.user,
      isEditSuccess: state.zoomapi.googleMeetEditData.success,
      meetEventData: state.zoomapi.googleMeetData.eventData,
      meetEventDataForEdit: state.zoomapi.googleMeetEditData.eventData,
      singleClasssuccess: state.onlineClasses.singleClass.success,
      singleClassData: state.onlineClasses.singleClass.data,
      classCreateSuccess: state.onlineClasses.create.success,
      classCreateLoading: state.onlineClasses.create.loading,
      classEditSuccess: state.onlineClasses.edit.success,
      classEditLoading: state.onlineClasses.edit.loading,
      zoomVerification: state.onlineClasses.zoomVerification.data,
      zoomVerificationSuccess: state.onlineClasses.zoomVerification.success,
      getStudentList: state.studentjoinclass.assignedStudent.data,
      getStudentListSuccess: state.studentjoinclass.assignedStudent.success,
    };
  });

  useEffect(() => {
    if (_id) {
      return () => {
        dispatch(resetOnlineClasses());
      };
    }
  }, [_id, dispatch]);
  // VALIDATION CHECKING
  const isFormValid = () => {
    if (
      window.location.pathname.includes("admin") ||
      window.location.pathname.includes("subject")
    ) {
      return classPostInfo.agenda.isValid &&
        classPostInfo.classTopic.isValid &&
        classPostInfo.startDate.isValid &&
        classPostInfo.startTiming.isValid &&
        classPostInfo.duration.value &&
        classPostInfo.classType.isValid &&
        classPostInfo.endDate.isValid &&
        classPostInfo.recurrence_type.isValid &&
        classPostInfo.repeat_interval.isValid &&
        classPostInfo.recurring_days.isValid
        ? true
        : false;
    } else {
      return classPostInfo.course.isValid &&
        classPostInfo.classRoom.isValid &&
        classPostInfo.agenda.isValid &&
        classPostInfo.classTopic.isValid &&
        classPostInfo.startDate.isValid &&
        classPostInfo.startTiming.isValid &&
        classPostInfo.duration.value &&
        classPostInfo.classType.isValid &&
        classPostInfo.endDate.isValid &&
        classPostInfo.recurrence_type.isValid &&
        classPostInfo.repeat_interval.isValid &&
        classPostInfo.recurring_days.isValid
        ? true
        : false;
    }
  };
  useEffect(() => {
    dispatch(
      getClassroomAssignedData(users._id, users.user_institute, "teacher")
    );
  }, [dispatch, users._id, users.user_institute]);
  const [classRoomId, setClassRoomId] = useState("");
  const [courseId, setCourseId] = useState("");
  // const [recurrenceType, setRecurrenceType] = useState("")

  // submisstion and on change functionilities
  const handleInput = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    if (inputName === "course") {
      setCourseId(inputValue);
    }
    if (inputName === "classRoom") {
      setClassRoomId(inputValue);
    }
    if (
      inputValue === "MONTHLY" ||
      inputValue === "WEEKLY" ||
      inputValue === "DAILY"
    ) {
      setRecurringType(inputValue);
    }
    if (recurring === true) {
      classPostInfo.classType.value = 8;
    }
    if (recurring === false) {
      classPostInfo.classType.value = 2;
    }
    if (inputName === "recurring_days") {
      let data = classPostInfo.recurring_days.value;
      // if (data.includes(inputValue)) {
      if (classPostInfo.recurring_days.value.includes(inputValue)) {
        let indexWeek = classPostInfo.recurring_days.value.indexOf(inputValue);
        data.splice(indexWeek, 1);
      } else {
        data.push(inputValue);
      }

      // }
      if (data.length > 0) {
        let data1 = {
          ...classPostInfo,
          recurring_days: { value: data, isValid: true },
        };
        setClassPostInfo(data1);
      } else {
        let data1 = {
          ...classPostInfo,
          recurring_days: { value: data, isValid: false },
        };
        setClassPostInfo(data1);
      }
    } else {
      let classPostData = {
        ...classPostInfo,
        [inputName]: {
          value: inputValue,
          isValid: verfication(inputName, inputValue),
        },
        validation: isFormValid(),
      };
      setClassPostInfo(classPostData);
      setFormError(false);
    }
  };

  useEffect(() => {
    setRecurringType(recurringtype);
  }, [recurringtype]);
  useEffect(() => {
    if (
      window.location.pathname.includes("admin") ||
      window.location.pathname.includes("subject")
    ) {
      setClassRoomId(_subjectId);
      setCourseId(_classroomId);
    }
    if (classRoomId && courseId) {
      dispatch(
        getAssignedStudents(users.user_institute, courseId, classRoomId)
      );
    }
  }, [
    _classroomId,
    _subjectId,
    classRoomId,
    courseId,
    dispatch,
    users.user_institute,
  ]);

  const [realValidationDate, setRealValidationDate] = useState([]);
  const [realValidationTime, setRealValidationTime] = useState([]);
  const [realDateTime, setRealDateTime] = useState("");
  const [onlyDate, setOnlyDate] = useState("");
  const [onlyTime, setOnlyTime] = useState("");
  const [dateTimeValidError, setDateTimeValidErrors] = useState(false);
  const [startDate, setStartDate] = useState("")

  const handleDate = (selectedDate, switchValue) => {
    if (switchValue === "startDate") {
      setStartDate(selectedDate)
      let validDateDetails = selectedDate.toString().split(" ");
      setRealValidationDate(validDateDetails);
      let date;
      date = moment(selectedDate).add(1, "d").toISOString();
      date = date.split("T");
      date = date[0];
      setOnlyDate(date);
      let classPostData = {
        ...classPostInfo,
        startDate: {
          value: moment(selectedDate).toISOString(),
          isValid: verfication(switchValue, selectedDate),
        },
        validation: isFormValid(),
      };
      setClassPostInfo(classPostData);

    }
    if (switchValue === "endDate") {
      let classPostData = {
        ...classPostInfo,
        endDate: {
          value: moment(selectedDate).toISOString(),
          isValid: verfication(switchValue, selectedDate),
        },
        validation: isFormValid(),
      };
      setClassPostInfo(classPostData);
    }
    if (switchValue === "startTiming") {
      let validTimeDetails = selectedDate.toString().split(" ");
      setRealValidationTime(validTimeDetails);
      let time;
      time = moment(selectedDate).toISOString();
      time = time.split("T");
      time = time[1];
      setOnlyTime(time);
      let classPostData = {
        ...classPostInfo,
        startTiming: {
          value: moment(selectedDate).toISOString(),
          isValid: verfication(switchValue, selectedDate),
        },
        validation: isFormValid(),
      };
      setClassPostInfo(classPostData);
    }
  };
  useEffect(() => {
    let date = [
      realValidationDate[0],
      realValidationDate[1],
      realValidationDate[2],
      realValidationDate[3],
      realValidationTime[4],
      realValidationTime[5],
      realValidationDate[6],
      realValidationDate[7],
      realValidationDate[8],
    ];

    setDateTimeValidErrors(
      !ValidationDateTime.compareCurrentDateTime(new Date(date.join(" ")))
    );
  }, [
    classPostInfo,
    dateTimeValidError,
    realDateTime,
    realValidationDate,
    realValidationTime,
  ]);
  const verfication = (inputName, inputValue) => {
    switch (inputName) {
      case "course": {
        return ValidationFile.validEmpty(inputValue);
      }
      case "classRoom": {
        return ValidationFile.validEmpty(inputValue);
      }
      case "startDate": {
        return ValidationFile.validEmpty(inputValue);
      }
      case "startTiming": {
        return ValidationFile.validEmpty(inputValue);
      }
      case "duration": {
        return ValidationFile.validEmpty(inputValue);
      }
      case "classTopic": {
        return ValidationFile.validEmpty(inputValue);
      }
      case "agenda": {
        return ValidationFile.validEmpty(inputValue);
      }
      case "repeat_interval": {
        return recurring && ValidationFile.validEmpty(inputValue);
      }
      case "recurring_days": {
        return recurring && ValidationFile.validEmpty(inputValue);
      }
      case "endDate": {
        return recurring && ValidationFile.validEmpty(inputValue);
      }
      case "monthly_day": {
        return recurring && ValidationFile.validEmpty(inputValue);
      }

      default:
        return false;
    }
  };

  const isFormValidRecurring = () => {
    return classPostInfo.agenda.isValid &&
      classPostInfo.classTopic.isValid &&
      classPostInfo.startDate.isValid &&
      classPostInfo.startTiming.isValid &&
      classPostInfo.duration.value &&
      classPostInfo.classType.isValid &&
      classPostInfo.endDate.isValid &&
      classPostInfo.recurrence_type.isValid &&
      classPostInfo.repeat_interval.isValid &&
      classPostInfo.recurring_days.isValid
      ? true
      : false;
  };
  const isFormValidRecurringDaily = () => {
    return classPostInfo.agenda.isValid &&
      classPostInfo.classTopic.isValid &&
      classPostInfo.startDate.isValid &&
      classPostInfo.startTiming.isValid &&
      classPostInfo.duration.value &&
      classPostInfo.classType.isValid &&
      classPostInfo.endDate.isValid &&
      classPostInfo.recurrence_type.isValid &&
      classPostInfo.repeat_interval.isValid &&
      !dateTimeValidError
      ? true
      : false;
  };

  const [assignedData, setAssignedData] = useState([]);
  const onSelectedStudents = (value) => {
    setAssignedData(value);
    setAssignToError(false)
  };

  if (assignedData.includes("All")) {
    assignedData.pop();
  }
  const token = Storage.alive(classes_constant.meettoken)
    ? Storage.getJson(classes_constant.meettoken)
    : "";
  const postDetailsData = () => {
    if (classPostInfo.classType.value === 2) {
      return {
        institute: users.user_institute,
        owner: users._id,
        classroom:
          window.location.pathname.includes("admin") ||
            window.location.pathname.includes("subject")
            ? _subjectId
            : classPostInfo.classRoom.value,
        course:
          window.location.pathname.includes("admin") ||
            window.location.pathname.includes("subject")
            ? _classroomId
            : classPostInfo.course.value,
        startDate: classPostInfo.startDate.value,
        class_timing: onlyDate + "T" + onlyTime,
        startTime: classPostInfo.startTiming.value,
        end_timing: moment(onlyDate + "T" + onlyTime).add(1, "d"),
        duration: classPostInfo.duration.value,
        class_type: classPostInfo.classType.value,
        topic: classPostInfo.classTopic.value,
        agenda: classPostInfo.agenda.value,
        token: token,
        assignToStudent: assignedData,
      };
    }
    if (classPostInfo.classType.value === 8) {
      return {
        institute: users.user_institute,
        owner: users._id,
        classroom:
          window.location.pathname.includes("admin") ||
            window.location.pathname.includes("subject")
            ? _subjectId
            : classPostInfo.classRoom.value,
        course:
          window.location.pathname.includes("admin") ||
            window.location.pathname.includes("subject")
            ? _classroomId
            : classPostInfo.course.value,
        token: token,
        startDate: classPostInfo.startDate.value,
        startTime: classPostInfo.startTiming.value,
        class_timing: onlyDate + "T" + onlyTime,
        duration: classPostInfo.duration.value,
        class_type: classPostInfo.classType.value,
        topic: classPostInfo.classTopic.value,
        agenda: classPostInfo.agenda.value,
        recurrence_type: recurringtype,
        repeat_interval: classPostInfo.repeat_interval.value
          ? classPostInfo.repeat_interval.value
          : 1,
        recurring_days: classPostInfo.recurring_days.value,
        end_timing: classPostInfo.endDate.value,
        monthly_day: classPostInfo.monthly_day.value,
        assignToStudent: assignedData,
      };
    }
  };

  const [editClassRoomId, setEditClassRoomId] = useState("");
  const [editCourseId, setEditCourseId] = useState("");
  const [assignToError, setAssignToError] = useState(false)
  const editDetailsData = () => {
    if (classPostInfo.classType.value === 2) {
      return {
        institute: users.user_institute,
        owner: users._id,
        classroom: editClassRoomId,
        course: editCourseId,
        startDate: classPostInfo.startDate.value,
        startTime: classPostInfo.startTiming.value,
        class_timing: onlyDate + "T" + onlyTime,
        duration: classPostInfo.duration.value,
        token: token ? token : "",
        end_timing: moment(onlyDate + "T" + onlyTime).add(1, "d"),
        class_type: classPostInfo.classType.value,
        topic: classPostInfo.classTopic.value,
        agenda: classPostInfo.agenda.value,
        assignToStudent: assignedData,
      };
    }
    if (classPostInfo.classType.value === 8) {
      return {
        institute: users.user_institute,
        owner: users._id,
        classroom: editClassRoomId,
        course: editCourseId,
        startDate: classPostInfo.startDate.value,
        startTime: classPostInfo.startTiming.value,
        class_timing: onlyDate + "T" + onlyTime,
        duration: classPostInfo.duration.value,
        token: token ? token : "",
        class_type: classPostInfo.classType.value,
        topic: classPostInfo.classTopic.value,
        agenda: classPostInfo.agenda.value,
        recurrence_type: recurringtype,
        repeat_interval: classPostInfo.repeat_interval.value
          ? classPostInfo.repeat_interval.value
          : 1,
        recurring_days: classPostInfo.recurring_days.value,
        end_timing: classPostInfo.endDate.value,
        monthly_day: classPostInfo.monthly_day.value,
        assignToStudent: assignedData,
      };
    }
  };
  const validation = () => {
    if (assignedData.length > 0) {
      return true;
    }
    else {
      setAssignToError(true);
      return false;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(true);
    const assignToValidation = validation()
    if (meetingOn === "Zoom") {
      if (classPostInfo.classType.value === 8) {
        if (recurringtype === "DAILY" || recurringtype === "MONTHLY") {
          if (isFormValidRecurringDaily() && !dateTimeValidError && assignToValidation) {
            dispatch(postOnlineClasses(postDetailsData()));
          }
        } else {
          if (isFormValidRecurring() && !dateTimeValidError && assignToValidation) {
            dispatch(postOnlineClasses(postDetailsData()));
          }
        }
      } else {
        if (isFormValid() && !dateTimeValidError && assignToValidation) {
          dispatch(postOnlineClasses(postDetailsData()));
        }
      }
    }
    if (meetingOn === "GoogleMeet") {
      if (classPostInfo.classType.value === 8) {
        if (recurringtype === "DAILY" || recurringtype === "MONTHLY") {
          if (isFormValidRecurringDaily()) {
            dispatch(postOnlineClassesMeet(postDetailsData()));
          }
        } else {
          if (isFormValidRecurring() && !dateTimeValidError) {
            dispatch(postOnlineClassesMeet(postDetailsData()));
          }
        }
      } else {
        if (isFormValid() && !dateTimeValidError) {
          dispatch(postOnlineClassesMeet(postDetailsData()));
        }
      }
    }
    if (classCreateSuccess) {
      setClassPostInfo({});
    }
  };
  const [isEditable, setIsEditable] = useState(false);
  // edit thingy
  useEffect(() => {
    if (_id && !isEditable) {
      setIsEditable(true);
      dispatch(getOnlineClass(_id));
    }
  }, [_id, dispatch, isEditable]);
  useEffect(() => {
    if (classCreateSuccess) {
      if (window.location.pathname.includes("/teacher/create-online-class")) {
        history("/dashboard/teacher-online-class");
      } else if (
        window.location.pathname.includes("create-subject-onlineclass")
      ) {
        history(
          `/dashboard/teacher/${_classroomId}/view-classroom/${_subjectId}`
        );
      } else if (
        window.location.pathname.includes("create-admin-onlineClass")
      ) {
        history(`/view-classroom/${_subjectId}`);
      }
    }
  }, [_classroomId, _subjectId, classCreateSuccess, dispatch, history]);
  useEffect(() => {
    if (classEditSuccess) {
      // history("/dashboard/teacher-online-class")
      if (window.location.pathname.includes("teacher/edit-online-class")) {
        history("/dashboard/teacher-online-class");
      } else if (
        window.location.pathname.includes("edit-subject-onlineclass")
      ) {
        history(
          `/dashboard/teacher/${_classroomId}/view-classroom/${_subjectId}`
        );
      } else if (window.location.pathname.includes("edit-admin-onlineClass")) {
        history(`/view-classroom/${_subjectId}`);
      }
    }
  }, [_classroomId, _subjectId, classEditSuccess, dispatch, history]);
  const [classId, setClassId] = useState("");

  const durationArray = ["5", "10", "15", "20", "25", "30", "35", "40"];
  useEffect(() => {
    if (singleClasssuccess && singleClassData) {
      setClassId(singleClassData._id);
      setEditClassRoomId(singleClassData.classroom);
      setEditCourseId(singleClassData.course);
      let date = singleClassData.startDate ? singleClassData.startDate : "";
      date = date.includes("T") ? date.split("T") : date;
      date = date.length ? date[0] : "";
      let validDateDetails = new Date(singleClassData.startDate)
        .toString()
        .split(" ");
      setRealValidationDate(validDateDetails);
      setOnlyDate(date);
      let time = singleClassData.startTime ? singleClassData.startTime : "";
      time = time.includes("T") ? time.split("T") : time;
      time = time.length ? time[1] : "";
      let validTimeDetails = new Date(singleClassData.startTime)
        .toString()
        .split(" ");
      setRealValidationTime(validTimeDetails);
      setOnlyTime(time);
      let classPostData = {
        course: {
          value: singleClassData.course,
          isValid: true,
        },
        institute: {
          value: singleClassData.institute,
          isValid: true,
        },
        owner: {
          value: singleClassData.owner,
          isValid: true,
        },
        classRoom: {
          value: singleClassData.classroom,
          isValid: true,
        },
        startDate: {
          value: singleClassData.startDate ? singleClassData.startDate : "",
          isValid: singleClassData.startDate ? true : false,
        },
        startTiming: {
          value: singleClassData.startTime ? singleClassData.startTime : "",
          isValid: singleClassData.startTime ? true : false,
        },
        duration: {
          value:
            singleClassData.duration &&
              durationArray.includes(singleClassData.duration)
              ? singleClassData.duration
              : "",
          isValid:
            singleClassData.duration &&
              durationArray.includes(singleClassData.duration)
              ? true
              : false,
        },
        classType: {
          value: singleClassData.class_type ? singleClassData.class_type : "",
          isValid: true,
        },
        endDate: {
          value: singleClassData.end_timing ? singleClassData.end_timing : "",
          isValid: true,
        },
        classTopic: {
          value: singleClassData.topic,
          isValid: true,
        },
        agenda: {
          value: singleClassData.agenda,
          isValid: true,
        },
        recurrence_type: {
          value: singleClassData.recurrence_type,
          isValid: true,
        },
        repeat_interval: {
          value: singleClassData.repeat_interval,
          isValid: true,
        },
        recurring_days: {
          value: singleClassData.recurring_days,
          isValid: true,
        },
        class_timing: {
          value: singleClassData.class_timing,
          isValid: true,
        },
        monthly_day: {
          value: singleClassData.monthly_day,
          isValid: true,
        },
        end_timing: {
          value: singleClassData.startTiming,
          isValid: true,
        },
      };
      setRecurringType(singleClassData.recurrence_type);
      setClassPostInfo(classPostData);
      if (singleClassData.class_type === 8) {
        setRecurring(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditable, singleClassData, singleClasssuccess]);

  const handleEdit = (e) => {
    let meetingOn = singleClassData && singleClassData.meetingOn
    e.preventDefault();
    if (isFormValid() && !dateTimeValidError) {
      setFormError(false);
      dispatch(editOnlineClass(editDetailsData(), classId, meetingOn));
    } else {
      setFormError(true);
    }

    // setClassPostInfo({})
  };
  useEffect(() => {
    if (classEditSuccess) {
      dispatch(resetSingleClass());
    }
  }, [classEditSuccess, dispatch]);
  const [verificationPopUp, setVerificationPopUp] = useState(false);
  useEffect(() => {
    if (zoomVerificationSuccess) {
      setVerificationPopUp(zoomVerification);
    }
  }, [zoomVerification, zoomVerificationSuccess]);

  // Meet logic
  return (
    <React.Fragment>
      {_id && !singleClasssuccess ? (
        <div className="loadingGridData">
          <i className="ed-loadingGrid"></i>
        </div>
      ) : (
        <React.Fragment>
          <div className="TeacherScheduleClassModal mt-30">
            {window.location.pathname.includes("admin") ||
              window.location.pathname.includes("subject") ? (
              ""
            ) : (
              <React.Fragment>
                <div className="formFieldwrap">
                  <CourseSelect
                    className=" "
                    key="courseSelect"
                    name="course"
                    value={classPostInfo.course.value}
                    onEvent={handleInput}
                    autoevent={true}
                    disabled={_id}
                    label={DynamicCourseHeader}
                  />
                  <FormError
                    show={formError && !classPostInfo.course.value}
                    error={`${DynamicCourseHeader()} required.`}
                  />
                </div>
                <div className="formFieldwrap">
                  <ClassroomSelect
                    className=""
                    key="classroomSelect"
                    name="classRoom"
                    value={classPostInfo.classRoom.value}
                    disabled={_id}
                    onEvent={handleInput}
                    label={DynamicClassroomHeader}
                  />
                  <FormError
                    show={formError && !classPostInfo.classRoom.value}
                    error={`${DynamicClassroomHeader()} required.`}
                  />
                </div>
              </React.Fragment>
            )}

            <div className="Recurringradio">
              <div className="fiveColumWrapper">
                <div>
                  <div className="datePickerWrap">
                    <InputDatePicker
                      className=""
                      label="Class Start On"
                      name="startDate"
                      onSelect={(selectedDate) =>
                        handleDate(selectedDate, "startDate")
                      }
                      value={classPostInfo.startDate.value}
                      minDate={new Date()}
                      id="startDate"
                      type="date"
                      placeholder="Class Start On"
                      onKeyDown={(e) => e.preventDefault()}
                    />
                    <FormError
                      show={formError && !classPostInfo.startDate.value}
                      error={"Stard Date required."}
                    />
                  </div>
                </div>

                {/* <div className="formFieldwrap"> */}
                <div>
                  <div className="datePickerWrap ">
                    <InputDatePicker
                      value={classPostInfo.startTiming.value}
                      onSelect={(selectedTime) =>
                        handleDate(selectedTime, "startTiming")
                      }
                      showTimeSelect
                      showTimeSelectOnly
                      name="startTiming"
                      timeIntervals={5}
                      dateFormat="h:mm aa"
                      label="Time"
                      type="time"
                      placeholder="Start Timing"
                      onKeyDown={(e) => e.preventDefault()}
                    />
                    <FormError
                      show={
                        dateTimeValidError &&
                        classPostInfo.startTiming.value !== ""
                      }
                      error="Schedule time should be in future"
                    />
                    <FormError
                      show={formError && !classPostInfo.startTiming.value}
                      error={"Stard Timing required."}
                    />
                  </div>
                </div>
                <div>
                  {meetingOn === "Zoom" ? (
                    <div className="formFieldwrap">
                      <MinutesSelect
                        start={5}
                        end={40}
                        step={4}
                        selected={classPostInfo.duration.value}
                        name="duration"
                        isHide={true}
                        onEvent={handleInput}
                        className=""
                        defaultSelect={classPostInfo.duration.value}
                        label="Duration"
                      />
                      {/* <label className="animLabel">Duration</label> */}

                      <FormError
                        show={formError && !classPostInfo.duration.value}
                        error={"Duration is required."}
                      />
                    </div>
                  ) : meetingOn === "GoogleMeet" ? (
                    <div className="formFieldwrap">
                      <MinutesSelect
                        start={5}
                        end={180}
                        step={4}
                        value={classPostInfo.duration.value}
                        name="duration"
                        isHide={true}
                        onEvent={handleInput}
                        className=""
                        defaultSelect={classPostInfo.duration.value}
                        label="Duration"
                      />
                      {/* <label className="animLabel">Duration</label> */}
                      <FormError
                        show={formError && !classPostInfo.duration.value}
                        error={"Duration is required."}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            {(getStudentListSuccess || _id) && (
              <React.Fragment>
                <div className="formFieldwrap">
                  <AssignToStudents
                    selectGroup={
                      getStudentListSuccess && !_id
                        ? getStudentList
                        : _id
                          ? singleClassData.studentList
                          : []
                    }
                    editData={_id ? true : false}
                    OnSelectedValue={onSelectedStudents}
                    SwitchSelectData={false}
                    createData={_id ? false : true}
                    name={"Assign to Students"}
                  />
                  <FormError show={assignToError} error="Select Students." />
                </div>
              </React.Fragment>
            )}

            <div className="Recurringradio mb-20 scroll-top-menu-wrap">
              <p className="base text-xs w-400 mb-10">Choose class Type </p>
              <div className="inputradiorecurring">
                <div className="input-custom-type">
                  <label htmlFor="Onetime">
                    <input
                      type="radio"
                      defaultChecked={true}
                      //value="No Restrictions"
                      name="accessibilityMode"
                      id="Onetime"
                      checked={classPostInfo.classType.value === 2}
                      onClick={handleNormal}
                    />
                    One time Class
                  </label>
                </div>
                <div className="input-custom-type">
                  <label htmlFor="Recurring">
                    <input
                      type="radio"
                      checked={classPostInfo.classType.value === 8}
                      value="No Restrictions"
                      name="accessibilityMode"
                      id="Recurring"
                      onClick={handleRecurring}
                    />
                    Recurring Classes
                  </label>
                </div>
              </div>
            </div>
            {recurring && (
              <Recurring
                formError={formError}
                classPostInfo={classPostInfo}
                setClassPostInfo={setClassPostInfo}
                handleSubmit={(e) => handleSubmit(e)}
                handleInput={(e) => handleInput(e)}
                recurringtype={recurringtype}
                handleDate={(e, switchValue) => handleDate(e, switchValue)}
                startDate={startDate}
              />
            )}
            <div className="formFieldwrap Recurringradio">
              <FormInput
                className=""
                name="classTopic"
                onChange={handleInput}
                value={classPostInfo.classTopic.value}
                type="text"
                label="Class Topic"
                placeholder="Enter Class Topic"
                autoComplete="off"
              />
              <FormError
                show={formError && !classPostInfo.classTopic.value}
                error={"Class Topic is required."}
              />
            </div>

            <div className="formFieldwrap Recurringradio">
              <FormInput
                className=""
                name="agenda"
                type="text"
                value={classPostInfo.agenda.value}
                onChange={handleInput}
                label="Class Agenda / Purpose"
                placeholder="Enter video agenda/purpose"
                autoComplete="off"
              />
              <FormError
                show={formError && !classPostInfo.agenda.value}
                error={"Agenda is required."}
              />
            </div>
          </div>
          <div className="row">
            {isEditable ? (
              <div className="col-xs-12">
                {classEditLoading ? (
                  <button
                    className="button btn-md button-theme"
                  // onClick={handleEdit}
                  >
                    Editing Class
                  </button>
                ) : (
                  <button className="button btn-md button-theme" onClick={handleEdit}>
                    Edit Class
                  </button>
                )}
              </div>
            ) : (
              <div className="col-xs-12">
                {classCreateLoading ? (
                  <button
                    className="button btn-md button-theme"
                  // onClick={handleSubmit}
                  >
                    Creating Class
                  </button>
                ) : (
                  <button
                    className="button btn-md button-theme"
                    onClick={handleSubmit}
                  >
                    Schedule Now!
                  </button>
                )}
              </div>
            )}
            {verificationPopUp === true && (
              <React.Fragment>
                <ZoomVerificationPopup />
              </React.Fragment>
            )}
          </div>
        </React.Fragment >
      )}
    </React.Fragment >
  );
}

export default ClassMethod;
