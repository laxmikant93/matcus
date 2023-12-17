import React, {
  useState,
  useRef,
  Fragment,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { func } from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
import FormInput from "../../../Common/Form/FormInput";
import FormError from "../../../Common/Form/FormError";
import useCourseStudents from "../useCourseStudents";
import AssignToStudents from '../../../Common/SelectSearchAssignTo/AssignToStudents';
import Validation from "../../../Classes/Validation";
import SelectTeacherCourse from "../../../Common/Form/SelectTeacherCourse";
import SelectTeacherClassRoom from "../../../Common/Form/SelectTeacherClassRoom";
import { useDetectOutsideClick } from "../../../Common/DetectOutsideClick/useDetectOutsideClick";
import FormTextArea from "../../../Common/Form/FormTextArea";
import Storage from "../../../Classes/SessionStorage";
import LocalStorage from "../../../Classes/Storage";
import { useSelector } from "react-redux";
import "./BasicInfo.scss";

const BasicInfo = forwardRef(({ onSave, props }, ref) => {
  const history = useNavigate();
  const validation = new Validation();
  const { _subjectId } = useParams();
  const dropdownRef = useRef(null);
  const onClickBtnRemove = () => setIsActive(!isActive);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [data, setData] = useState([])
  const [validate, setValidate] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("");
  const [classroom, setClassroom] = useState("");
  const [attendees, setAttendees] = useState("all");
  const [attendeeList, setAttendeeList] = useState([]);
  const [studentList, getStudentList] = useCourseStudents();
  const { admin, adminClone, adminEdit, create, clone, edit, teacherClassroom } = props.history.location.state;
  const [subjectId, setSubjectId] = useState("")
  const { ClassroomDetail, onlineExamQuestion, onlineExamSuccess } = useSelector((state) => {
    return {
      ClassroomDetail: state.classroomDetail.classrooomData.data,
      onlineExamQuestion: state.onlineexam.getSingleExam.data,
      onlineExamSuccess: state.onlineexam.getSingleExam.success,
    };
  });
  useEffect(() => {
    if (LocalStorage.alive("__wz_clsrom__")) {
      setSubjectId(LocalStorage.getJson("__wz_clsrom__"))
    }
  }, [])
  useEffect(() => {
    setBasicInfoData();
    setCourseClassroom();
    // if (onlineExamSuccess) {
    getBasicInfoData();
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onlineExamQuestion]);

  useEffect(() => {
    course && getStudentList(course)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course])

  const setBasicInfoData = () => {
    if (onlineExamQuestion && onlineExamSuccess && window.location.pathname.includes("edit-test")) {
      Storage.setJson("BasicInfo", {
        title: onlineExamQuestion.title,
        description: onlineExamQuestion.description,
        courseInfo: onlineExamQuestion.courseInfo,
        classroomInfo: onlineExamQuestion.classroomInfo,
        attendeeList: onlineExamQuestion.attendeeList,
      });
    }
  };

  const getBasicInfoData = async () => {
    if (Storage.alive("BasicInfo")) {
      const storedData = await Storage.getJson("BasicInfo");
      setTitle(storedData.title);
      setDescription(storedData.description);
      setCourse(storedData.courseInfo ? storedData.courseInfo._id : storedData.course);
      setClassroom(
        storedData.classroomInfo
          ? storedData.classroomInfo._id
          : storedData.classroom
      );
      setAttendeeList(storedData.attendeeList);
      if (storedData && storedData?.attendeeList?.length > 0) {
        setAttendees("specific")
      } else {
        setAttendees("all")
      }
    }
  };


  const setCourseClassroom = () => {
    if (!window.location.pathname.includes("teacher-create-test") && LocalStorage.alive("__wz_crse__") && LocalStorage.alive("__wz_clsrom__")) {
      const course = LocalStorage.getJson("__wz_crse__");
      const classroom = LocalStorage.getJson("__wz_clsrom__");
      setCourse(course);
      setClassroom(classroom);
      getStudentList(course)
    }
  };

  const handleValidation = () => {
    return (
      validation.isNotEmpty(title) &&
      validation.isNotEmpty(course) &&
      validation.isNotEmpty(classroom) &&
      (attendees === "specific" && !data.length ? false : true)
    );
  };

  const handleCourseData = e => {
    setCourse(e.target.value);
    getStudentList(e.target.value);
  };

  const handleClasseData = e => {
    setClassroom(e.target.value);
  };



  useImperativeHandle(ref, () => ({
    handleFirstTabData(tab) {
      saveAndContinue("onSwitch", tab);
    },
  }));

  const saveAndContinue = (onSwitch, tab) => {
    scrollToTop()
    setValidate(true);
    if (handleValidation()) {
      Storage.setJson("BasicInfo", {
        title,
        description,
        course,
        classroom,
        attendeeList: data,
      });
      onSwitch ? onSave(tab) : onSave();
    }
  };

  const cancelExam = () => {
    if (create || clone || edit) {
      history("/dashboard/teacher-online-test");
    } else if (admin || adminClone || adminEdit) {
      history(`/view-classroom/${subjectId}`, {
        adminToggle: "adminToggle",

      });
    }
    //Storage.clear()
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <React.Fragment>
      <div className="OnlineExamBasicInfo">
        <div className="formFieldwrap">
          <FormInput
            className={validate && !title ? "errorInput" : ""}
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            type="text"
            label="title"
            maxLength={80}
            defaultValue={title}
            placeholder="Title"
          />
          <FormError show={validate && !title} error="Title is required." />
        </div>

        <div className="formFieldwrap">
          <FormTextArea
            rows="3"
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            value={description}
            type="text"
            label="Short description"
            maxLength={250}
            defaultValue={description}
            placeholder="Write something about this test"
          />
        </div>

        {!admin && !adminClone && !adminEdit && !teacherClassroom && (
          <>
            <div className="formFieldwrap">
              <SelectTeacherCourse
                value={course}
                onSelect={(selectedCourse) => {
                  setCourse(selectedCourse);
                }}
                onEvent={handleCourseData}
                error={validate && !course}
              />
              <FormError
                show={validate && !course}
                error="Course is required."
              />
            </div>

            <div className="formFieldwrap">
              <SelectTeacherClassRoom
                value={classroom}
                onSelect={(selectedclassroom) => {
                  setClassroom(selectedclassroom);
                }}
                onEvent={handleClasseData}
                error={validate && !classroom}
              />
              <FormError
                show={validate && !classroom}
                error="Classroom is required."
              />
            </div>
          </>
        )}
      </div>
      {course && classroom && (
        <div className="createTestAllowAction mt-20 md-20">
          <div className="createTestAllowActionItem">
            <p className="text-xs w-500">Attendees List</p>
            <div
              className="input-custom-type inline mt-10"
              onClick={(e) => setAttendees(e.target.value)}
            >
              <label
                className={
                  (attendees === "all" || attendees === undefined) && "active"
                }
              >
                <input
                  value="all"
                  type="radio"
                  name="attendees"
                  checked={attendees === "all" || attendees === undefined}
                />
                All Attendees
              </label>
              <label className={attendees === "specific" && "active"}>
                <input
                  type="radio"
                  value="specific"
                  name="attendees"
                  checked={attendees === "specific"}
                />
                Specific Attendees
              </label>
            </div>
          </div>
        </div>
      )}
      {/* {console.log(attendeeList, "hiihhi")} */}
      {course && classroom && attendees === "specific" ? (
        <Fragment>
          <div className="SpecificAttendeesSearch specificAttendence-wrap mt-20">
            <AssignToStudents
              selectGroup={studentList ? studentList : []}
              selectedStudent={attendeeList}
              OnSelectedValue={(data) => setData(data)}
              SwitchSelectData={false}
              name={"Select Students"}
              onlineExam={true}
            />
            <FormError
              show={validate && !data.length}
              error="Please select a student."
              className=""
            />
          </div>

        </Fragment>
      ) : ""}
      <div className="ExamInstructionBtn mt-50">
        <button
          type="button"
          onClick={saveAndContinue}
          className="button btn-md button-theme btn-sm mr-5"
        >
          Save and Continue
        </button>
        <button
          type="button"
          className="button btn-o-primary btn-sm"
          onClick={onClickBtnRemove}
        >
          Cancel
        </button>
        <div
          ref={dropdownRef}
          className={`popup removePopup ${isActive ? "active" : "inactive"}`}
        >
          <p className="heading gray text-xxs w-400">
            You will loose all the data if you cancel, Do you want to proceed?
          </p>
          <div className="removePopBtn">
            <button
              onClick={cancelExam}
              className="button button-red btn-sm"
            >
              Yes
            </button>
            <button
              onClick={onClickBtnRemove}
              className="button btn-o-silver dgray btn-sm"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
});

BasicInfo.defaultProps = {
  onSave: () => { },
};

BasicInfo.protoType = {
  onSave: func,
};

export default BasicInfo;
