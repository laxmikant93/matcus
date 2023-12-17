import React, { useState, useEffect, Fragment, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GrayAuthTheme from "../../Common/Theme/GrayAuthTheme";
import Breadcrumb from "../../Common/Breadcrumb";
import CustomLink from "./CustomLink";
import { useSelector, useDispatch } from "react-redux";
import {
  createOnlineExam,
  createOnlineExamReset,
} from "../../store/actions/onlineexam";
import BasicInfo from "./CreateExamSections/BasicInfo";
import CreateQuestions from "./CreateExamSections/CreateQuestions";
import ExamSettings from "./CreateExamSections/ExamSettings";
import ErrorBoundary from "../../Classes/ErrorBoundary"
import { courseID, classroomID } from "../../Constant/auth"
import { DynamicClassroomHeader, DynamicCourseHeader } from "../../Common/UserElement";
import Storage from "../../Classes/SessionStorage";
import LocalStorage from "../../Classes/Storage";
import "./OnlineExam.scss";


const OnlineExam = (props) => {
  const location= useLocation()
  const childRef = useRef()
  const history = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { create } = useSelector((state) => state.onlineexam);
  const [switchTabs, setSwitchTabs] = useState("first");
  const [examPayload, setExamPayload] = useState({
    owner: user._id,
    institute: user.user_institute,
  });
  const createTest = location?.state?.create
  const admin = location?.state?.admin
  const teacherClassroom = location?.state?.teacherClassroom


  const [courseId, setCourseId] = useState("")
  const [classroomId, setClassroomId] = useState("")
  useEffect(() => {
    if (LocalStorage.alive(courseID)) {
      setCourseId(LocalStorage.getJson(courseID))
    }
    if (LocalStorage.alive(classroomID)) {
      setClassroomId(LocalStorage.getJson(classroomID))
    }
  }, [])


  const handleBasicInfo = (data) => {
    setSwitchTabs("second");
    const temp = { ...examPayload, ...data };
    setExamPayload(temp);
  };

  const handleQuestionPaper = (data) => {
    setSwitchTabs("third");
    const temp = { ...examPayload, ...data };
    setExamPayload(temp);
  };

  const handleExamFinalSubmit = () => {
    if (Storage.alive("BasicInfo") && Storage.alive("Questions") && Storage.alive("ExamSettings")) {
      const BasicInfo = Storage.getJson("BasicInfo")
      const Questions = Storage.getJson("Questions")
      const ExamSettings = Storage.getJson("ExamSettings")
      dispatch(createOnlineExam({ ...BasicInfo, ...Questions, ...ExamSettings, owner: user._id, institute: user.user_institute, }))
      Storage.clear();
    }
  };
  useEffect(() => {
    if (create.success && (createTest)) {
      history("/dashboard/teacher-online-test");
    } else if (create.success && (admin)) {
      history(`/view-classroom/${classroomId}`, { adminToggle: "adminToggle" });
    }
    else if (create.success && teacherClassroom) {
      history(`/view-classroom/${classroomId}`, { teacherClassroom: "teacherClassroom" });
    }
    return () => {
      dispatch(createOnlineExamReset());
    };
  }, [create, history, dispatch, classroomId, createTest, admin, teacherClassroom]);
  useEffect(() => {
    return () => {
      Storage.clear();
    }
  }, [])
  useEffect(() => {
    Storage.clear()
  }, [])
  return (
    <React.Fragment>
      {
        admin ?
          <Breadcrumb>
            <CustomLink onChildClick={() => { Storage.clear(); history("/") }} title="Dashboard" />
            <CustomLink onChildClick={() => { Storage.clear(); history("/school-admin-course") }} title={DynamicCourseHeader()} />
            <CustomLink onChildClick={() => { Storage.clear(); history(`/edit-course/${courseId}`) }} title={"Edit " + DynamicCourseHeader()} />
            <CustomLink onChildClick={() => { Storage.clear(); history(`/view-classroom/${classroomId}`) }} title={DynamicClassroomHeader()} />
          </Breadcrumb>
          : teacherClassroom ?
            <Breadcrumb>
              <CustomLink onChildClick={() => { Storage.clear(); history("/") }} title="Dashboard" />
              <CustomLink onChildClick={() => { Storage.clear(); history("/dashboard/teacher-classrooms-list") }} title={DynamicCourseHeader()} />
              <CustomLink onChildClick={() => { Storage.clear(); history(`/dashboard/teacher/subject-list/${courseId}`) }} title={"Edit " + DynamicCourseHeader()} />
              <CustomLink onChildClick={() => { Storage.clear(); history(`/dashboard/teacher/${courseId}/view-classroom/${classroomId}`) }} title={DynamicClassroomHeader()} />
            </Breadcrumb> :
            < Breadcrumb >
              <CustomLink onChildClick={() => { Storage.clear(); history("/") }} title="Dashboard" />
              <CustomLink onChildClick={() => { Storage.clear(); history("/dashboard/teacher-online-test") }} title="Online Test" />
            </Breadcrumb>
      }

      {create.success ? (
        <div className="row mt-30">Wait...</div>
      ) : (
        <Fragment>
          <p className="text-sm w-300 mt-10">Create Online Test</p>
          <div className="EdOnlineTestTabBarCst scroll-nav-tab-wrapper mt-10 mb-30">
            <div className="EdOnlineTestTabList scroll-nav-tab">
              <button type="button" className={switchTabs === "first" ? "active" : ""}
                onClick={() => { setSwitchTabs("first") }}
              >
                Basic Info
              </button>
              <button type="button" className={switchTabs === "second" ? "active" : ""}
                onClick={() => { Storage.alive("BasicInfo") && setSwitchTabs("second") }}
              >
                Question Paper
              </button>
              <button type="button" className={switchTabs === "third" ? "active" : ""}
                onClick={() => { Storage.alive("Questions") && setSwitchTabs("third") }}
              >
                Settings
              </button>
            </div>
          </div>

          {switchTabs === "first" ? (
            <ErrorBoundary url={"/dashboard/teacher-online-test"}>
              <BasicInfo
                ref={childRef}
                props={props}
                onSave={(data) => handleBasicInfo(data)}
              />
            </ErrorBoundary>
          ) : switchTabs === "second" ? (
            <ErrorBoundary url={"/dashboard/teacher-online-test"}>
              <CreateQuestions
                ref={childRef}
                owner={user._id}
                course={examPayload.course}
                classroom={examPayload.classroom}
                onSave={(data) => handleQuestionPaper(data)}
              />
            </ErrorBoundary>
          ) : (
            <ErrorBoundary url={"/dashboard/teacher-online-test"}>
              <ExamSettings
                ref={childRef}
                props={props}
                onSubmit={(data) => handleExamFinalSubmit(data)} />
            </ErrorBoundary>
          )}
        </Fragment>
      )}
    </React.Fragment>
  );
};

export default OnlineExam;
