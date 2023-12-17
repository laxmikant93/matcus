import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../Common/Breadcrumb/BreadcrumbItem";
// import SingleSelectDropdown from "../../../Common/Form/SingleSelectDropdown";
import SearchControl from "../../../Common/SearchControl";
import StudentTheme from "../../../Common/Theme/StudentTheme";
import {
  DynamicClassroomHeader,
  DynamicCourseHeader,
} from "../../../Common/UserElement";
import { getStudentClassroomList } from "../../../store/actions/StudentClassroomListing";
import IconForward from "./icon-forward.svg";
import "../Attendance.scss";
import Card from "../../../Common/Card";
import CardBody from "../../../Common/Card/CardBody";
const StudentAttendanceClassroomList = () => {
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
    history(`/dashboard/student-subjects-attendance/${_id}`);
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

  const holidayCalender = () => {
    history("/dashboard/student-holiday-calender");
  };
  return (
    <StudentTheme>
     <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          <BreadcrumbItem
            to="/dashboard/attendance-student-classroomlist"
            title="Attendance"
          />
        </Breadcrumb>
        <div className="PageTopHead mt-10">
          <div className="PTH-Item">
            <p className="text-sm w-400">Attendance</p>
            <p className="text-xxs w-400">
              <strong>
                {" "}
                {classroomListSuccess ? (
                  searchFind ? (
                    <>
                      {classroomLength > 1 ? (
                        <>
                          {classroomLength}
                          &nbsp; {DynamicCourseHeader()}
                        </>
                      ) : (
                        <>
                          {classroomLength}
                          &nbsp;{DynamicCourseHeader()}
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {classroomList.length > 1 ? (
                        <>
                          {classroomList.length}
                          &nbsp; {DynamicCourseHeader()}
                        </>
                      ) : (
                        <>
                          {classroomList.length}
                          &nbsp;{DynamicCourseHeader()}
                        </>
                      )}
                    </>
                  )
                ) : (
                  <>{DynamicCourseHeader()}</>
                )}
              </strong>
            </p>
          </div>
        </div>
        <div className="PageTopHead PTH-StudentAttendanceClassroomList mt-20">
          <div className="PTH-Item P-Right">
            <SearchControl
              classNameWrappper="tableSearchbar"
              id="search"
              name="search"
              onChange={handleChange}
              placeholder={DynamicCourseHeader() + " Search"}
            />
          </div>
          <div className="PTH-Item P-Right">
            <button
              type="button"
              className="button btn-sm button-base"
              onClick={holidayCalender}
            >
              Holidays Calendar
            </button>
          </div>
        </div>

        <div className="StudentAttendanceClassroomListWrap">
          {classroomListSuccess ? (
            <>
              {classroomList.length ? (
                classroomList
                  // eslint-disable-next-line array-callback-return
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
                      <div
                        onClick={() => handleClick(item.course)}
                        className="ListItem"
                        key={item._id}
                      >
                        <Card className="cardPadding">
                          <CardBody>
                            <div className="ItemContent">
                              <div className="text-xs base w-600">
                                {item.courseName}
                              </div>
                              <div className="text-xxs base w-300">
                                {item.totalClassroom} {DynamicClassroomHeader()}
                              </div>
                            </div>
                            <div className="actionBtn">
                              <button
                                className="btn-square"
                                title="View"
                              // onClick={() => handleClick(item.course)}
                              >
                                <img src={IconForward} alt="Forward" />
                              </button>
                            </div>
                          </CardBody>
                        </Card>
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
          {classroomListSuccess &&
            searchFind &&
            classroomList.length > 0 &&
            classroomLength === 0 ? (
            <div className="loadingGridData">No records found.</div>
          ) : (
            ""
          )}
        </div>
    </StudentTheme>
  );
};
export default StudentAttendanceClassroomList;
