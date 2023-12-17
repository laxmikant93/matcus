/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import GrayAuthTheme from "../../../../Common/Theme/GrayAuthTheme";
import Breadcrumb from "../../../../Common/Breadcrumb/index";
import { useNavigate } from "react-router-dom";
import BreadcrumbItem from "../../../../Common/Breadcrumb/BreadcrumbItem";
import { SearchIcon } from "../../../../Common/Icon";
import SingleSelectDropdown from "../../../../Common/Form/SingleSelectDropdown";
import { useDispatch } from "react-redux";
import { getStudentClassroomList } from "../../../../store/actions/StudentClassroomListing";
import { useSelector } from "react-redux";
import {
  DynamicClassroomHeader,
  DynamicCourseHeader,
} from "../../../../Common/UserElement";
import "./StudentClassroom.scss";
import SearchControl from "../../../../Common/SearchControl";

const StudentClassrooms = (props) => {
  const dispatch = useDispatch();
  const { user, classroomList, classroomListSuccess } = useSelector((state) => {
    return {
      user: state.user,
      classroomList: state.studentClassroom.list.data,
      classroomListSuccess: state.studentClassroom.list.success,
    };
  });
  const history = useNavigate();
  const handleClick = (_id) => {
    history(`/dashboard/student-subjects-list/${_id}`);
  };
  useEffect(() => {
    dispatch(getStudentClassroomList(user.user_institute, user._id));
  }, [dispatch, user._id, user.user_institute]);

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
      for (let i = 0; i < classroomList.length; i++) {
        if (
          classroomList[i].courseName
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        ) {
          arr.push(classroomList[i]);
        }
      }
      setClassroomLength(arr.length);
    } else {
      setSearchFind(false);
    }
  }, [searchTerm, classroomList]);
  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        <BreadcrumbItem
          to="/dashboard/student-classroom-list"
          title="Classroom"
        />
      </Breadcrumb>
      <div className="PageTopHead PTH-StudentClassroomList mt-20">
        {/* <div className="PTH-Item InlinePTHItem">
            <h3 className="text-sm w-300">
              <span className="primary">{classroomListSuccess ? classroomList.length : ""}</span>{" "}

              {classroomListSuccess && classroomList.length > 1 ? "Classrooms" : "Classroom"}
            </h3>
          </div> */}

        {classroomListSuccess ? (
          searchFind ? (
            <>
              {classroomLength > 1 ? (
                <>
                  <div className="PTH-Item">
                    <h1 className="text-sm w-300">
                      <span className="purple">{classroomLength}</span>
                      &nbsp; {DynamicCourseHeader()}
                    </h1>
                  </div>
                </>
              ) : (
                <>
                  <div className="PTH-Item">
                    <h1 className="text-sm w-300">
                      <span className="purple">{classroomLength}</span>
                      &nbsp;{DynamicCourseHeader()}
                    </h1>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              {classroomList.length > 1 ? (
                <>
                  <div className="PTH-Item">
                    <h1 className="text-sm w-300">
                      <span className="purple">{classroomList.length}</span>
                      &nbsp; {DynamicCourseHeader()}
                    </h1>
                  </div>
                </>
              ) : (
                <>
                  <div className="PTH-Item">
                    <h1 className="text-sm w-300">
                      <span className="purple">{classroomList.length}</span>
                      &nbsp;{DynamicCourseHeader()}
                    </h1>
                  </div>
                </>
              )}
            </>
          )
        ) : (
          <div className="PTH-Item">
            <h1 className="text-sm w-300">&nbsp;{DynamicCourseHeader()}</h1>
          </div>
        )}
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
          <li className="col col-9">Course Name</li>
          <li className="col col-3">&nbsp;</li>
        </ul>
        <div className="gridBody">
          {classroomListSuccess ? (
            <>
              {classroomList.length ? (
                classroomList
                  .filter((classrooms) => {
                    if (searchTerm === "") {
                      return classrooms;
                    } else if (
                      classrooms.courseName
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) {
                      return classrooms;
                    }
                  })
                  // eslint-disable-next-line array-callback-return
                  .map((item) => {
                    return (
                      <div className="gridRow" key={item._id}>
                        <ul className="topInfo">
                          <li className="col col-9" data-head="Course Name">
                            <div className="Details">
                              <div className="text-xs purple w-600">
                                {item.courseName}
                              </div>
                              <div className="mt-3">
                                {item.totalClassroom}{" "}
                                {DynamicClassroomHeader()}
                              </div>
                            </div>
                          </li>
                          <li className="col col-3 actionCols">
                            <div className="actionBtn">
                              <button
                                className="btn-square"
                                title="View"
                                onClick={() => handleClick(item.course)}
                              >
                                <span className="cssIcon">
                                  <i className="ed-eye"></i>
                                </span>
                              </button>
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
        </div>
      </div>
    </React.Fragment>
  );
};
export default StudentClassrooms;
