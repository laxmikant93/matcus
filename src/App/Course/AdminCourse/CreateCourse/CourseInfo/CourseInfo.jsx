import React, { useState, useEffect } from "react";
import FormInput from "../../../../../Common/Form/FormInput";
import FormTextArea from "../../../../../Common/Form/FormTextArea";
import InputDatePicker from "../../../../../Common/Form/InputDatePicker";
// import Upload from "../../../../Common/Upload";
import { useDispatch, useSelector } from "react-redux";
import ValidationFile from "../../../../../Classes/ValidationFile";
import CourseMultipleClassroom from "../../../CourseMultipleClassrooms";
import CourseInfoRight from "./CourseInfoRight";
import FormError from "../../../../../Common/Form/FormError";
import moment from "moment";
// import AssignToTeachers from "../AssignToDropdown";
import {
  editCourseInfoData,
  postAdminCourseInfo,
  resetEditCourseInfoData,
  resetpostCourseInfoData,
} from "../../../../../store/actions/admincourse";
import { useNavigate, useParams } from "react-router";
import Storage from "../../../../../Classes/Storage";
import { DynamicCourseHeader } from "../../../../../Common/UserElement";

const CourseInfo = ({ toggleStateEdit }) => {
  const { _id, _classroomId } = useParams();
  const dispatch = useDispatch();
  const {
    user,
    createCourseData,
    createCourseState,
    getCourseInfoData,
    getCourseInfoDataState,
    editCourseState,
  } = useSelector((state) => {
    return {
      user: state.user,
      createCourseData: state.admincourse.createCourseInfo.data,
      createCourseState: state.admincourse.createCourseInfo,

      getCourseInfoData: state.admincourse.getSingleCourseInfoData.data,
      getCourseInfoDataState: state.admincourse.getSingleCourseInfoData,

      editCourseState: state.admincourse.editCourseInfo,
    };
  });
  const [isFilled, setIsFilled] = useState(false);
  const courseId = Storage.alive("__wz_crse__")
    ? Storage.getJson("__wz_crse__")
    : "";
  const [courseTitle, setCourseTitle] = useState("");
  const [courseTitleError, setCourseTitleError] = useState(false);
  const [shortIntro, setShortIntro] = useState("");
  const history = useNavigate();
  const [imageBanner, setImageBanner] = useState("");
  const [videoBanner, setVideoBanner] = useState("");
  const [startDate, setStartDate] = useState("");
  const [durationYear, setDurationYear] = useState("");
  const [durationMonth, setDurationMonth] = useState("");
  const [durationYearError, setDurationYearError] = useState(false);
  const [durationMonthError, setDurationMonthError] = useState(false);
  const [multipleClassrooms, setMultipleClassrooms] = useState([]);
  const [defaultBanner, setDefaultBanner] = useState("");

  const [ToggleMultipleClassrooms, SetToggleMultipleClassrooms] = useState(
    _id && getCourseInfoDataState.success
      ? getCourseInfoData.courseLevel
      : "institute"
  );
  useEffect(() => {
    if (
      _id &&
      getCourseInfoDataState.success &&
      !getCourseInfoDataState.loading &&
      !isFilled
    ) {
      setIsFilled(true);
      setCourseTitle(getCourseInfoData.courseTitle);
      setShortIntro(getCourseInfoData.shortIntro);
      SetToggleMultipleClassrooms(getCourseInfoData.courseLevel);
      setDurationYear(getCourseInfoData.durationYear);
      setDurationMonth(getCourseInfoData.durationMonth);
      setStartDate(getCourseInfoData.startFrom);
      setImageBanner(getCourseInfoData.courseBanner);
      setVideoBanner(getCourseInfoData.courseIntroVideo);
      setDefaultBanner(getCourseInfoData.defaultBanner);
    }
  }, [
    _id,
    getCourseInfoData,
    getCourseInfoDataState.loading,
    getCourseInfoDataState.success,
    isFilled,
  ]);

  const handleInput = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    switch (inputName) {
      case "coursetitle":
        setCourseTitle(inputValue);
        setCourseTitleError(ValidationFile.isEmpty(inputValue));
        break;
      case "shortIntro":
        setShortIntro(inputValue);
        break;
      case "year":
        setDurationYear(inputValue);
        setDurationYearError(inputValue > 4);
        break;
      case "month":
        setDurationMonth(inputValue);
        setDurationMonthError(inputValue > 11);
        break;
      default:
        return false;
    }
  };
  const handleImage = (image) => {
    setImageBanner(image);
  };
  const handleVideo = (video) => {
    setVideoBanner(video);
  };
  const handleDefaultBanner = (banner) => {
    setDefaultBanner(banner);
  };
  const [payloadData, setPayloadData] = useState([]);
  const forMakePatchData = () => {
    let arr = [];
    for (let index = 0; index < multipleClassrooms.length; index++) {
      const element = multipleClassrooms[index];
      if (element.classroomCheckData.length) {
        const newData = {
          classroomId: element.classroomCheckData[0],
          subjectId: element.subjectsData,
        };

        arr.push(newData);
      }
    }
    setPayloadData([...arr]);
  };
  const courseInfoData = () => {
    return {
      courseTitle: courseTitle,
      courseLevel:
        window.location.pathname.includes("admin") ||
          window.location.pathname.includes("teacherClassroom")
          ? "multipleClassroom"
          : ToggleMultipleClassrooms,
      shortIntro: shortIntro,
      courseBanner: imageBanner,
      defaultBanner: defaultBanner,
      classAssigned: payloadData,
      courseIntroVideo: videoBanner,
      institute: user.user_institute,
      owner:
        getCourseInfoData && getCourseInfoData.owner
          ? getCourseInfoData.owner
          : user._id,
      startFrom: startDate,
      durationYear: durationYear,
      durationMonth: durationMonth,
    };
  };

  const [multipleClassroomError, setMultipleClassroomError] = useState(false);
  const [courseInfoError, setCourseInfoError] = useState(false);


  const validation = () => {
    if (ToggleMultipleClassrooms === "multipleClassroom") {
      if (payloadData.length) {
        return true;
      }
      else {
        setMultipleClassroomError(true);
        return false;
      }
    }
    else {
      return true;
    }
  }

  const handleSave = () => {
    setCourseInfoError(true);
    forMakePatchData();
    const multipleClassroomValidation = validation()
    if (ValidationFile.isEmpty(courseTitle.trim())) {
      setCourseTitleError(true);
    }
    if (durationYear > 4) {
      setDurationYearError(true);
    }
    if (durationMonth > 11) {
      setDurationMonthError(true);
    }
    if (
      !ValidationFile.isEmpty(courseTitle.trim()) &&
      !durationMonthError &&
      !durationYearError && multipleClassroomValidation
    ) {
      if (!_id) {
        dispatch(postAdminCourseInfo(courseInfoData()));
      } else {
        dispatch(editCourseInfoData(_id, courseInfoData()));
      }
    }
  };
  const handleInstituteLevelCheck = () => {
    SetToggleMultipleClassrooms("institute");
    setMultipleClassroomError(false);
    setPayloadData([]);
  };
  const handleMultipleClassroomLevel = () => {
    SetToggleMultipleClassrooms("multipleClassroom");
  };
  const handleMultipleClassrooms = (val) => {
    setMultipleClassrooms(val);
    // setMultipleClassroomError(false);
    // forMakePatchData()
  };
  useEffect(() => {
    let arr = [];
    if (window.location.pathname.includes("admin")) {
      const newData = {
        classroomId: courseId,
        subjectId: [_classroomId],
      };
      arr.push(newData);
    } else if (window.location.pathname.includes("teacherClassroom")) {
      const newData = {
        classroomId: _classroomId,
        subjectId: [courseId],
      };
      arr.push(newData);
    } else {
      for (let index = 0; index < multipleClassrooms.length; index++) {
        const element = multipleClassrooms[index];
        if (element.classroomCheckData.length) {
          const newData = {
            classroomId: element.classroomCheckData[0],
            subjectId: element.subjectsData,
          };
          arr.push(newData);
        }
      }
    }
    setPayloadData([...arr]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [multipleClassrooms]);
  useEffect(() => {
    if (createCourseState.success && createCourseData._id) {
      if (window.location.pathname.includes("admin")) {
        history(
          `/edit-admin-course/${createCourseData._id}/${_classroomId}`,
          { savedInfo: "savedInfo" }
        );

        dispatch(resetpostCourseInfoData());
      } else if (window.location.pathname === "/create-course") {
        history(`/edit-courses/${createCourseData._id}`, {
          savedInfo: "savedInfo",
        });
        dispatch(resetpostCourseInfoData());
      } else if (
        window.location.pathname === "/dashboard/teacher-create-course"
      ) {
        history(`/dashboard/teacher-edit-course/${createCourseData._id}`, {
          savedInfo: "savedInfo",
        });
        dispatch(resetpostCourseInfoData());
      } else if (
        window.location.pathname.includes("create-teacherClassroom-course")
      ) {
        history(
          `/dashboard/edit-teacherClassroom-course/${createCourseData._id}/${_classroomId}`,
          { savedInfo: "savedInfo" }
        );
        dispatch(resetpostCourseInfoData());
      }
    }
  }, [
    _classroomId,
    createCourseData._id,
    createCourseState.success,
    dispatch,
    history,
  ]);
  useEffect(() => {
    if (_id && editCourseState.success) {
      if (window.location.pathname.includes("admin")) {
        history(`/edit-admin-course/${_id}/${_classroomId}`, {
         state:{ savedInfo: "savedInfo"},
        });
        toggleStateEdit("CourseContents");
        dispatch(resetEditCourseInfoData());
      } else if (window.location.pathname.includes("edit-courses")) {
        history(`/edit-courses/${_id}`, {state: {savedInfo: "savedInfo"} });
        toggleStateEdit("CourseContents");
        dispatch(resetEditCourseInfoData());
      } else if (window.location.pathname.includes("teacher-edit-course")) {
        history(`/dashboard/teacher-edit-course/${_id}`, 
         {state:{ savedInfo: "savedInfo"}}
        );
        toggleStateEdit("CourseContents");
        dispatch(resetEditCourseInfoData());
      } else if (
        window.location.pathname.includes("edit-teacherClassroom-course")
      ) {
        history(
          `/dashboard/edit-teacherClassroom-course/${_id}/${_classroomId}`,
          {state: {savedInfo: "savedInfo"} }
        );
        toggleStateEdit("CourseContents");
        dispatch(resetpostCourseInfoData());
      }
    }
  }, [
    _classroomId,
    _id,
    dispatch,
    editCourseState.loading,
    editCourseState.success,
    history,
    toggleStateEdit,
  ]);

  const handleCancel = () => {
    if (window.location.pathname === "/create-course") {
      history("/course");
    } else if (window.location.pathname.includes("edit-courses")) {
      history(`/course`);
    } else if (window.location.pathname.includes("teacher-create-course")) {
      history("/dashboard/teacher/course-list")
    }
    else if (window.location.pathname.includes("teacher-edit-course")) {
      history(`/dashboard/teacher/course-list`);
    } else if (window.location.pathname.includes("create-admin-course")) {
      history(`/view-classroom/${_classroomId}`, {state:{
        adminCourseToggle: "adminCourseToggle",
      }});
    }
    else if (window.location.pathname.includes("edit-admin-course")) {
      history(`/view-classroom/${_classroomId}`, {state:{
        adminCourseToggle: "adminCourseToggle",
      }});
    } else if (window.location.pathname.includes("create-teacherClassroom")) {
      history(`/dashboard/teacher/${_classroomId}/view-classroom/${courseId}`, {state:{ teacherCourseToggle: "teacherCourseToggle" }})
    }
    else if (window.location.pathname.includes("edit-teacherClassroom-course")) {
      history(`/dashboard/teacher/${_classroomId}/view-classroom/${courseId}`, {state:{ teacherCourseToggle: "teacherCourseToggle" }});
    }
  };
  return (
    <React.Fragment>
      {_id && !getCourseInfoDataState.success ? (
        <div className="loadingGridData">
          <i className="ed-loadingGrid"></i>
        </div>
      ) : (
        <React.Fragment>
          <div className="CourseInfoWrapper mb-20 mt-20">
            <div className="CourseInfoLeft">
              <div className="formFieldwrap">
                <FormInput
                  label="Material Title"
                  name="coursetitle"
                  onChange={handleInput}
                  placeholder="Material Title"
                  value={courseTitle}
                  maxLength="80"
                />
                <FormError
                  show={courseTitleError && courseInfoError}
                  error="Material Title is required."
                />
              </div>
              {window.location.pathname.includes("admin") ||
                window.location.pathname.includes("teacherClassroom") ? (
                ""
              ) : (
                <div className="SelectCreateCourseLevel">
                  <p className="text-xs w-600">Do you want to create at?</p>
                  <div className="input-custom-type">
                    <label
                      className={`mb-15 mt-10 ${ToggleMultipleClassrooms === "institute" ? "active" : ""
                        }`}
                    >
                      <input
                        type="radio"
                        name="institute"
                        value="institute"
                        checked={ToggleMultipleClassrooms === "institute"}
                        onChange={handleInstituteLevelCheck}
                      />
                      <div className="text-xs w-500">
                        Institute Level <br />
                        <span className="text-2xs gray w-200">
                          It will be default assign to all your institute.
                        </span>
                      </div>
                    </label>
                    <label
                      className={
                        ToggleMultipleClassrooms === "multipleClassroom"
                          ? "active"
                          : ""
                      }
                    >
                      <input
                        type="radio"
                        name="multipleClassroom"
                        value="multipleClassroom"
                        checked={
                          ToggleMultipleClassrooms === "multipleClassroom"
                        }
                        onChange={handleMultipleClassroomLevel}
                      />
                      <div className="text-xs w-500">
                        Multiple {DynamicCourseHeader()} <br />
                        <span className="text-2xs gray w-200">
                          It will be assign to single or multiple{" "}
                          {DynamicCourseHeader()}.
                        </span>
                      </div>
                    </label>
                  </div>
                  {ToggleMultipleClassrooms === "multipleClassroom" ? (
                    <>
                      <CourseMultipleClassroom
                        OnSelectedValue={handleMultipleClassrooms}
                      />
                      <FormError
                        show={multipleClassroomError}
                        error="Classroom Check Required"
                      />
                    </>
                  ) : (
                    ""
                  )}
                </div>
              )}

              <div className="formFieldwrap">
                <FormTextArea
                  name="shortIntro"
                  label="Short Introduction"
                  placeholder="Short Introduction"
                  onChange={handleInput}
                  value={shortIntro}
                  maxLength="220"
                  rows={` ${window.location.pathname.includes("admin") ||
                    window.location.pathname.includes("teacherClassroom")
                    ? "8"
                    : "2"
                    }`}
                />
              </div>
              <div className="SelectCourseDuration">
                <div className="datePickerWrap">
                  <InputDatePicker
                    name="startDate"
                    type="date"
                    label="Start From"
                    placeholder="Start From"
                    minDate={moment().toDate()}
                    onSelect={(selectedDob) => {
                      setStartDate(selectedDob);
                    }}
                    value={startDate}
                  />
                </div>
                <div className="formFieldwrap">
                  <FormInput
                    type="number"
                    label="Duration in Year"
                    name="year"
                    placeholder="Duration in Year"
                    min="0"
                    max="4"
                    maxLength="1"
                    onChange={handleInput}
                    value={durationYear}
                  />
                  <FormError
                    show={durationYearError && courseInfoError}
                    error="Years should be less than 5."
                  />
                </div>
                <div className="formFieldwrap">
                  <FormInput
                    type="number"
                    label="Duration in Month"
                    name="month"
                    placeholder="Duration in Month"
                    min="0"
                    max="11"
                    maxLength="2"
                    onChange={handleInput}
                    value={durationMonth}
                  />
                  <FormError
                    show={durationMonthError && courseInfoError}
                    error="Months should be less than 11."
                  />
                </div>
              </div>
            </div>
            <div className="CourseInfoRight">
              <CourseInfoRight
                onVideoUpload={(video) => handleVideo(video)}
                onImageUpload={(image) => handleImage(image)}
                onDefaultBanner={(banner) => handleDefaultBanner(banner)}
              />
            </div>
          </div>
          {createCourseState.loading || editCourseState.loading ? (
            <button type="button" className="button btn-md button-theme btn-md">
              Saving...
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSave}
              className="button btn-md button-theme btn-md"
            >
              Save & Continue
            </button>
          )}

          <button
            onClick={handleCancel}
            type="button"
            className="button btn-o-primary primary btn-md"
          >
            Cancel
          </button>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default CourseInfo;
