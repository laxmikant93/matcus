import React, { useState, useEffect, Fragment, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GrayAuthTheme from "../../Common/Theme/GrayAuthTheme";
import Breadcrumb from "../../Common/Breadcrumb";
import CustomLink from "./CustomLink";
import { useSelector, useDispatch } from "react-redux";
import {
  // createOnlineExam,
  // createOnlineExamReset,
  updateOnlineExam,
  resetUpdateExam,
  createOnlineExamReset,
  createOnlineExam,
} from "../../store/actions/onlineexam";
import BasicInfo from "./CreateExamSections/BasicInfo";
import EditQuestions from "./CreateExamSections/EditQuestions";
import ExamSettings from "./CreateExamSections/ExamSettings";
import ErrorBoundary from "../../Classes/ErrorBoundary";
import useExamDataForUpdate from "./useExamDataForUpdate";
import {
  DynamicClassroomHeader,
  DynamicCourseHeader,
} from "../../Common/UserElement";
import { courseID, classroomID } from "../../Constant/auth";
import Storage from "../../Classes/SessionStorage";
import LocalStorage from "../../Classes/Storage";
import "./OnlineExam.scss";

const UpdateExam = (props) => {
  const childRef = useRef();
  const history = useNavigate();
  const dispatch = useDispatch();
  const examId = useParams();
  const adminClone = props.history.location.state.adminClone;
  const adminEdit = props.history.location.state.adminEdit;
  const clone = props.history.location.state.clone;
  const edit = props.history.location.state.edit;

  const user = useSelector((state) => state.user);
  const { create } = useSelector((state) => state.onlineexam);
  const { update } = useSelector((state) => state.onlineexam);

  const [switchTabs, setSwitchTabs] = useState("first");
  const [examPayload, setExamPayload] = useState({
    owner: user._id,
    institute: user.user_institute,
  });
  const [getExamDataForUpdate] = useExamDataForUpdate();

  const handleBasicInfo = (data) => {
    data ? setSwitchTabs(data) : setSwitchTabs("second");
    const temp = { ...examPayload, ...data };
    setExamPayload(temp);
  };

  const handleQuestionPaper = (data) => {
    data ? setSwitchTabs(data) : setSwitchTabs("third");
    const temp = { ...examPayload, ...data };
    setExamPayload(temp);
  };

  const handleExamSetting = (data) => {
    setSwitchTabs(data);
  };

  const handleFinalSubmit = () => {
    const BasicInfo = Storage.getJson("BasicInfo");
    const Questions = Storage.getJson("Questions");
    const ExamSettings = Storage.getJson("ExamSettings");
    if (edit || adminEdit) {
      dispatch(
        updateOnlineExam(examId._id, {
          ...BasicInfo,
          ...Questions,
          ...ExamSettings,
          owner: user._id,
          institute: user.user_institute,
        })
      );
    } else if (clone || adminClone) {
      dispatch(
        createOnlineExam({
          ...BasicInfo,
          ...Questions,
          ...ExamSettings,
          owner: user._id,
          institute: user.user_institute,
        })
      );
    }
    Storage.clear();
  };

  useEffect(() => {
    getExamDataForUpdate(examId._id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examId]);

  const [courseId, setCourseId] = useState("");
  const [classroomId, setClassroomId] = useState("");
  useEffect(() => {
    if (LocalStorage.alive(courseID)) {
      setCourseId(LocalStorage.getJson(courseID));
    }
    if (LocalStorage.alive(classroomID)) {
      setClassroomId(LocalStorage.getJson(classroomID));
    }
  }, []);

  useEffect(() => {
    if (update.success && edit) {
      history("/dashboard/teacher-online-test");
    } else if (update.success && adminEdit) {
      history(`/view-classroom/${classroomId}`, {
        adminToggle: "adminToggle",
      });
    }
    return () => {
      dispatch(resetUpdateExam());
    };
  }, [update, history, dispatch, edit, adminEdit, classroomId]);

  useEffect(() => {
    if (create.success && clone) {
      history("/dashboard/teacher-online-test");
    } else if (create.success && adminClone) {
      history(`/view-classroom/${classroomId}`, {
        adminToggle: "adminToggle",
      });
    }
    return () => {
      dispatch(createOnlineExamReset());
    };
  }, [create, history, dispatch, clone, adminClone, classroomId, adminEdit]);

  const commonAdminBreadCrumb = () => {
    return (
      <>
        <CustomLink
          onChildClick={() => {
            Storage.clear();
            history("/");
          }}
          title="Dashboard"
        />
        <CustomLink
          onChildClick={() => {
            Storage.clear();
            history("/school-admin-course");
          }}
          title={DynamicCourseHeader()}
        />
        <CustomLink
          onChildClick={() => {
            Storage.clear();
            history(`/edit-course/${courseId}`);
          }}
          title={"Edit " + DynamicCourseHeader()}
        />
        <CustomLink
          onChildClick={() => {
            Storage.clear();
            history(`/view-classroom/${classroomId}`);
          }}
          title={DynamicClassroomHeader()}
        />
      </>
    );
  };

  const commonTeacherBreadCrumb = () => {
    return (
      <>
        <CustomLink
          onChildClick={() => {
            Storage.clear();
            history("/");
          }}
          title="Dashboard"
        />
        <CustomLink
          onChildClick={() => {
            Storage.clear();
            history("/dashboard/teacher-online-test");
          }}
          title="Online Test"
        />
      </>
    );
  };

  return (
    <React.Fragment>
      {adminEdit ? (
        <Breadcrumb>
          {commonAdminBreadCrumb()}
          <CustomLink
            to={{
              pathname: `/admin-edit-test/${examId._id}`,
              state: { adminEdit: "adminEdit" },
            }}
            title="Edit Online Test"
          />
        </Breadcrumb>
      ) : (
        adminClone && (
          <Breadcrumb>
            {commonAdminBreadCrumb()}
            <CustomLink
              to={{
                pathname: `/admin-edit-test/${examId._id}`,
                state: { adminClone: "adminClone" },
              }}
              title="Clone & Edit Online Test"
            />
          </Breadcrumb>
        )
      )}
      {edit ? (
        <Breadcrumb>
          {commonTeacherBreadCrumb()}
          <CustomLink
            to={{
              pathname: `/dashboard/teacher-edit-test/${examId._id}`,
              state: { edit: "edit" },
            }}
            title="Edit Online Test"
          />
        </Breadcrumb>
      ) : (
        clone && (
          <Breadcrumb>
            {commonTeacherBreadCrumb()}
            <CustomLink
              to={{
                pathname: `/dashboard/teacher-edit-test/${examId._id}`,
                state: { clone: "clone" },
              }}
              title="Clone & Edit Online Test"
            />
          </Breadcrumb>
        )
      )}
      {update.success ? (
        <div className="row mt-30">Wait...</div>
      ) : (
        <Fragment>
          {adminClone || clone ? (
            <p className="text-sm w-300 mt-10">Clone & Edit Online Test</p>
          ) : (
            (adminEdit || edit) && (
              <p className="text-sm w-300 mt-10">Edit Online Test</p>
            )
          )}
          <div className="EdOnlineTestTabBarCst scroll-nav-tab-wrapper mt-10 mb-30">
            <ul className="EdOnlineTestTabList scroll-nav-tab">
              <li
                className={switchTabs === "first" ? "active" : ""}
                onClick={() =>
                  switchTabs === "second"
                    ? childRef.current.handleSecondTabData("first")
                    : switchTabs === "third"
                      ? childRef.current.handleThirdTabData("first")
                      : ""
                }
              >
                Basic Info
              </li>
              <li
                className={switchTabs === "second" ? "active" : ""}
                onClick={() =>
                  switchTabs === "first"
                    ? childRef.current.handleFirstTabData("second")
                    : switchTabs === "third"
                      ? childRef.current.handleThirdTabData("second")
                      : ""
                }
              >
                Question Paper
              </li>
              <li
                className={switchTabs === "third" ? "active" : ""}
                onClick={() =>
                  switchTabs === "first"
                    ? childRef.current.handleFirstTabData("third")
                    : switchTabs === "second"
                      ? childRef.current.handleSecondTabData("third")
                      : ""
                }
              >
                Settings
              </li>
            </ul>
          </div>

          {switchTabs === "first" ? (
            <ErrorBoundary url={"/dashboard/teacher-online-test"}>
              <BasicInfo
                props={props}
                ref={childRef}
                onSave={(data) => handleBasicInfo(data)}
              />
            </ErrorBoundary>
          ) : switchTabs === "second" ? (
            <ErrorBoundary url={"/dashboard/teacher-online-test"}>
              <EditQuestions
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
                onSave={(data) => handleExamSetting(data)}
                onSubmit={(data) => handleFinalSubmit(data)}
              />
            </ErrorBoundary>
          )}
        </Fragment>
      )}
    </React.Fragment>
  );
};

export default UpdateExam;
