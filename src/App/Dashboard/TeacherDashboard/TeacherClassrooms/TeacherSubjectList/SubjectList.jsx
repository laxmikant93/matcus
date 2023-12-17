/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
// import Storage from "../../../../../Classes/Storage";
import AppLink from "../../../../../Common/AppLink";
import Breadcrumb from "../../../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../../../Common/Breadcrumb/BreadcrumbItem";
import SearchControl from "../../../../../Common/SearchControl";
// import SingleSelectDropdown from "../../../../../Common/Form/SingleSelectDropdown";
// import { SearchIcon } from "../../../../../Common/Icon";
import GrayAuthTheme from "../../../../../Common/Theme/GrayAuthTheme";
import {
  DynamicClassroomHeader,
  DynamicCourseHeader,
} from "../../../../../Common/UserElement";
import {
  getTeacherClassroomSpecificData,
  getTeacherSubjectsList,
} from "../../../../../store/actions/teachersubjectlist";
// import TeacherSubjectSearch from "./TeacherSubjectSearch";
import "../TeacherClassroom.scss";

const SubjectList = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const {
    users,
    TeacherClassroomDataSuccess,
    TeacherClassroomDataLoading,
    TeacherClassroomData,
    TeacherSubjectsListSuccess,
    TeacherSubjectsListLoading,
    TeacherSubjectsListData,
  } = useSelector((state) => {
    return {
      TeacherClassroomDataSuccess:
        state.teachersubjectlist.TeacherClassroomData.success,
      TeacherClassroomDataLoading:
        state.teachersubjectlist.TeacherClassroomData.loading,
      TeacherClassroomData: state.teachersubjectlist.TeacherClassroomData.data,
      TeacherSubjectsListSuccess: state.teachersubjectlist.Subjectlist.success,
      TeacherSubjectsListLoading: state.teachersubjectlist.Subjectlist.loading,
      TeacherSubjectsListData: state.teachersubjectlist.Subjectlist.data,
      users: state.user,
    };
  });

  useEffect(() => {
    dispatch(getTeacherSubjectsList(users.user_institute, users._id, id));
    dispatch(getTeacherClassroomSpecificData(id));
  }, [dispatch, id, users._id, users.user_institute]);

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
      for (let i = 0; i < TeacherSubjectsListData.length; i++) {
        if (
          TeacherSubjectsListData[i].classroomName
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        ) {
          arr.push(TeacherSubjectsListData[i]);
        }
      }
      setSubjectLength(arr.length);
    } else {
      setSearchFind(false);
    }
  }, [searchTerm, TeacherSubjectsListData]);

  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        <BreadcrumbItem
          to="/dashboard/teacher-classrooms-list"
          title={DynamicCourseHeader()}
        />
        <BreadcrumbItem
          to={`/dashboard/teacher/subject-list/${id}`}
          title={DynamicClassroomHeader()}
        />
      </Breadcrumb>
      <div className="PageTopHead PTH-SubjectList mt-20">
        <div className="PTH-Item">
          <div className="heading-with-edit">
            {TeacherClassroomDataSuccess && !TeacherClassroomDataLoading ? (
              <p className="secondary text-sm w-300">
                {TeacherClassroomData.coursename}{" "}
              </p>
            ) : (
              <p className="secondary text-sm w-300"></p>
            )}
          </div>
        </div>
        <div className="PTH-Item">
          {TeacherSubjectsListSuccess ? (
            searchFind ? (
              <>
                {subjectLength > 1 ? (
                  <>
                    <div className="PTH-Item">
                      <h1 className="text-xs w-300">
                        <span className="secondary">{subjectLength}</span>
                        &nbsp; {DynamicClassroomHeader()}
                      </h1>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="PTH-Item">
                      <h1 className="text-xs w-300">
                        <span className="primary">{subjectLength}</span>
                        &nbsp;
                        <DynamicClassroomHeader />
                        {DynamicClassroomHeader()}
                      </h1>
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                {TeacherSubjectsListData.length > 1 ? (
                  <>
                    <div className="PTH-Item">
                      <h1 className="text-xs w-300">
                        <span className="secondary">
                          {TeacherSubjectsListData.length}
                        </span>
                        &nbsp; {DynamicClassroomHeader()}
                      </h1>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="PTH-Item">
                      <h1 className="text-xs w-300">
                        <span className="secondary">
                          {TeacherSubjectsListData.length}
                        </span>
                        &nbsp;{DynamicClassroomHeader()}
                      </h1>
                    </div>
                  </>
                )}
              </>
            )
          ) : (
            <div className="PTH-Item">
              <h1 className="text-xs w-300">
                <span className="secondary"></span>
                &nbsp;{DynamicClassroomHeader()}
              </h1>
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
          {TeacherSubjectsListSuccess && !TeacherSubjectsListLoading ? (
            <>
              {TeacherSubjectsListData.length ? (
                TeacherSubjectsListData.filter((subjects) => {
                  if (searchTerm === "") {
                    return subjects;
                  } else if (
                    subjects.classroomName
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return subjects;
                  }
                }).map((item) => {
                  return (
                    <div className="SubjectListBox" key={item._id}>
                      <p className="base text-xs w-300">
                        {item.classroomName}
                      </p>

                      <div className="SubjectListBoxAction mt-10">
                        <AppLink
                          to={`/dashboard/teacher/${id}/view-classroom/${item.classroom}`}
                          className="btnText underline secondary text-xxs"
                        >
                          View <DynamicClassroomHeader />
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
            <div className="loadingGridData">Loading.</div>
          )}
        </div>
      </React.Fragment>
    </React.Fragment>
  );
};
export default SubjectList;
