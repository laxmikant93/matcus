/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import AppLink from "../../../../../Common/AppLink";
import Breadcrumb from "../../../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../../../Common/Breadcrumb/BreadcrumbItem";
import SingleSelectDropdown from "../../../../../Common/Form/SingleSelectDropdown";
import { SearchIcon } from "../../../../../Common/Icon";
import SearchControl from "../../../../../Common/SearchControl";
import GrayAuthTheme from "../../../../../Common/Theme/GrayAuthTheme";
import { DynamicClassroomHeader } from "../../../../../Common/UserElement";
import {
  getSingleStudentClassroomInfo,
  getStudentClassroomSubjects,
} from "../../../../../store/actions/StudentClassroomListing";
import "../StudentClassroom.scss";

const StudentSubjectList = () => {
  const dispatch = useDispatch();
  const {
    user,
    classroomSubjectsList,
    singleClassroomInfo,
    singleClassroomInfoSuccess,
    classroomSubjectsListSuccess,
  } = useSelector((state) => {
    return {
      user: state.user,
      singleClassroomInfo: state.studentClassroom.singleClassroomInfo.data,
      singleClassroomInfoSuccess:
        state.studentClassroom.singleClassroomInfo.success,
      classroomSubjectsList: state.studentClassroom.classroomSubjects.data,
      classroomSubjectsListSuccess:
        state.studentClassroom.classroomSubjects.success,
    };
  });
  const { _id } = useParams();
  useEffect(() => {
    dispatch(getSingleStudentClassroomInfo(_id));
  }, [dispatch, _id]);
  useEffect(() => {
    dispatch(getStudentClassroomSubjects(user.user_institute, user._id, _id));
  }, [_id, dispatch, user._id, user.user_institute]);

  const [searchFind, setSearchFind] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectLength, setSubjectLength] = useState("");
  const handleChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };
  useEffect(() => {
    if (searchTerm) {
      setSearchFind(true);
      let arr = [];
      for (let i = 0; i < classroomSubjectsList.length; i++) {
        if (
          classroomSubjectsList[i].classroomName
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        ) {
          arr.push(classroomSubjectsList[i]);
        }
      }
      setSubjectLength(arr.length);
    } else {
      setSearchFind(false);
    }
  }, [searchTerm, classroomSubjectsList]);
  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        <BreadcrumbItem
          to="/dashboard/student-classroom-list"
          title="Classroom"
        />
        <BreadcrumbItem
          to={`/dashboard/student-subjects-list/${_id}`}
          title="Subject"
        />
      </Breadcrumb>

      {/* <h3 className="text-sm w-300">
              <span className="primary">{classroomSubjectsListSuccess && classroomSubjectsList.length}</span>{" "}

              {classroomSubjectsListSuccess && classroomSubjectsList.length > 1 ? "Subjects" : "Subject"}
            </h3> */}

      <div className="PageTopHead PTH-SubjectList mt-20">
        <div className="PTH-Item">
          <h1 className="text-sm w-300">
            {singleClassroomInfoSuccess && singleClassroomInfo.coursename}
          </h1>
        </div>
        <div className="PTH-Item">
          {classroomSubjectsListSuccess ? (
            searchFind ? (
              <>
                {subjectLength > 1 ? (
                  <div className="text-xs w-300">
                    <span className="purple">{subjectLength}</span>
                    &nbsp; {DynamicClassroomHeader()}
                  </div>
                ) : (
                  <div className="text-xs w-300">
                    <span className="purple">{subjectLength}</span>
                    &nbsp;{DynamicClassroomHeader()}
                  </div>
                )}
              </>
            ) : (
              <>
                {classroomSubjectsList.length > 1 ? (
                  <div className="text-xs w-300">
                    <span className="purple">
                      {classroomSubjectsList.length}
                    </span>
                    &nbsp; {DynamicClassroomHeader()}
                  </div>
                ) : (
                  <div className="text-xs w-300">
                    <span className="purple">
                      {classroomSubjectsList.length}
                    </span>
                    &nbsp;{DynamicClassroomHeader()}
                  </div>
                )}
              </>
            )
          ) : (
            <div className="text-xs w-300">
              <span className="purple"></span>
              &nbsp;{DynamicClassroomHeader()}
            </div>
          )}
        </div>
        <div className="PTH-Item P-Right">
          <SearchControl
            classNameWrappper="tableSearchbar"
            id="search"
            name="search"
            onChange={handleChange}
            placeholder={DynamicClassroomHeader() + " Search"}
          />
        </div>
      </div>
      <React.Fragment>
        <div className="SubjectListBoxWrapper mt-20">
          {classroomSubjectsListSuccess ? (
            <>
              {classroomSubjectsList.length ? (
                classroomSubjectsList
                  .filter((subjects) => {
                    if (searchTerm === "") {
                      return subjects;
                    } else if (
                      subjects.classroomName
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) {
                      return subjects;
                    }
                  })
                  .map((item) => {
                    return (
                      <div className="SubjectListBox" key={item._id}>
                        <p className="base text-xs w-300">
                          {item.classroomName}{" "}
                        </p>
                        <div className="SubjectListBoxAction mt-10">
                          <AppLink
                            to={`/dashboard/student/${_id}/view-classroom/${item.classroom}`}
                            className="btnText underline purple text-xxs"
                          >
                            View Subject
                          </AppLink>
                        </div>
                      </div>
                    );
                  })
              ) : (
                <div className="loadingGridData">No records found.</div>
              )}
            </>
          ) : (
            <div className="loadingGridData">
              <i className="ed-loadingGrid"></i>
            </div>
          )}
        </div>
      </React.Fragment>
    </React.Fragment>
  );
};
export default StudentSubjectList;
