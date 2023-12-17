/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppLink from "../../../../../Common/AppLink";
import Breadcrumb from "../../../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../../../Common/Breadcrumb/BreadcrumbItem";
import SearchControl from "../../../../../Common/SearchControl";
import GrayAuthTheme from "../../../../../Common/Theme/GrayAuthTheme";
import {
  DynamicClassroomHeader,
  DynamicCourseHeader,
} from "../../../../../Common/UserElement";
import { getTeacherClassroomsList } from "../../../../../store/actions/teacherclassroomlist";
import "../TeacherClassroom.scss";
const TeacherClassroomList = () => {
  const dispatch = useDispatch();

  const { users, TeacherClassroomListSuccess, TeacherClassroomListData } =
    useSelector((state) => {
      return {
        TeacherClassroomListSuccess:
          state.teacherclassroomlist.Classroomlist.success,
        TeacherClassroomListLoading:
          state.teacherclassroomlist.Classroomlist.loading,
        TeacherClassroomListData: state.teacherclassroomlist.Classroomlist.data,
        users: state.user,
      };
    });

  useEffect(() => {
    dispatch(getTeacherClassroomsList(users.user_institute, users._id));
  }, [dispatch, users._id, users.user_institute]);
  const [searchFind, setSearchFind] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [classroomLength, setClassroomLength] = useState("");
  const handleChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (searchTerm) {
      setSearchFind(true);
      let arr = [];
      for (let i = 0; i < TeacherClassroomListData.length; i++) {
        if (
          TeacherClassroomListData[i].courseName
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        ) {
          arr.push(TeacherClassroomListData[i]);
        }
      }
      setClassroomLength(arr.length);
    } else {
      setSearchFind(false);
    }
  }, [searchTerm, TeacherClassroomListData]);
  return (
    <React.Fragment>
      <React.Fragment>
        <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          <BreadcrumbItem
            to="/dashboard/teacher-classrooms-list"
            title={DynamicCourseHeader()}
          />
        </Breadcrumb>
        <div className="PageTopHead PTH-TeacherClassroomList mt-20">
          <div className="PTH-Item">
            {TeacherClassroomListSuccess ? (
              searchFind ? (
                <>
                  {classroomLength > 1 ? (
                    <h1 className="text-sm w-300">
                      <span className="primary">{classroomLength}</span>
                      &nbsp; {DynamicCourseHeader()}
                    </h1>
                  ) : (
                    <h1 className="text-sm w-300">
                      <span className="primary">{classroomLength}</span>
                      &nbsp; {DynamicCourseHeader()}
                    </h1>
                  )}
                </>
              ) : (
                <>
                  {TeacherClassroomListData.length > 1 ? (
                    <h1 className="text-sm w-300">
                      <span className="primary">
                        {TeacherClassroomListData.length}
                      </span>
                      &nbsp; {DynamicCourseHeader()}
                    </h1>
                  ) : (
                    <h1 className="text-sm w-300">
                      <span className="primary">
                        {TeacherClassroomListData.length}
                      </span>
                      &nbsp; {DynamicCourseHeader()}
                    </h1>
                  )}
                </>
              )
            ) : (
              <h1 className="text-sm w-300">
                <span className="primary"></span>
                &nbsp; {DynamicCourseHeader()}
              </h1>
            )}
          </div>

          <div className="PTH-Item P-Right">
            <SearchControl
              classNameWrappper="tableSearchbar"
              id="search"
              name="search"
              onChange={handleChange}
              placeholder={DynamicCourseHeader() + " Search"}
            />
          </div>
        </div>
        <div className="gridListTable">
          <ul className="gridHeader">
            <li className="col col-6">Classroom Name</li>
            <li className="col col-3">Subject</li>
            <li className="col col-3">&nbsp;</li>
          </ul>
          <div className="gridBody">
            {TeacherClassroomListSuccess ? (
              <>
                {TeacherClassroomListData.length > 0 ? (
                  TeacherClassroomListData.filter((courses) => {
                    if (searchTerm === "") {
                      return courses;
                    } else if (
                      courses.courseName
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) {
                      return courses;
                    }
                  }).map((item) => {
                    return (
                      <div className="gridRow" key={item._id}>
                        <ul className="topInfo">
                          <li
                            className="col col-6"
                            data-head="Classroom Name"
                          >
                            {item.courseName}
                          </li>
                          <li className="col col-3" data-head="Subject">
                            {item.totalClassroom} {DynamicClassroomHeader()}
                          </li>
                          <li className="col col-3 actionCols">
                            <div className="actionBtn">
                              <AppLink
                                className="btn-square"
                                title="Edit Student"
                                to={`/dashboard/teacher/subject-list/${item.course}`}
                              >
                                <span className="cssIcon">
                                  <i className="ed-eye"></i>
                                </span>
                              </AppLink>
                            </div>
                          </li>
                        </ul>
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
            {TeacherClassroomListSuccess &&
              searchFind &&
              TeacherClassroomListData.length > 0 &&
              classroomLength === 0 ? (
              <div className="loadingGridData">No records found.</div>
            ) : (
              ""
            )}
          </div>
        </div>
      </React.Fragment>
    </React.Fragment>
  );
};
export default TeacherClassroomList;
