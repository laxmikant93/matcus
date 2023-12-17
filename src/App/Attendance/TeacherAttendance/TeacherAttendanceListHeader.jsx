import moment from "moment";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import SelectInput from "../../../Common/Form/SelectInput";
import SearchControl from "../../../Common/SearchControl";
import { DynamicClassroomHeader } from "../../../Common/UserElement";
import { getClassroomDataInviteFaculty } from "../../../store/actions/classroom";
import { ClassroomIDFetch } from "../../../store/actions/classroomdetail";
import {
  getTeacherStudentAttendanceList,
  searchStudentAttendanceList,
} from "../../../store/actions/TeacherAttendance";

const TeacherAttendanceListHeader = ({
  modal,
  currentDate,
  changeDateValue,
  propDate,
}) => {
  const { _classroomId, _subjectId } = useParams();
  const dispatch = useDispatch();
  // const history = useNavigate()
  const { user, ClassroomDetail, ClassroomDetailSuccess, classroom } =
    useSelector((state) => {
      return {
        user: state.user,
        ClassroomDetail: state.classroomDetail.classrooomData.data,
        ClassroomDetailSuccess: state.classroomDetail.classrooomData.success,
        classroom: state.classroom.list.data,
      };
    });
  const [searchTerm, setSearchTerm] = useState("");
  let typing;
  const handleSearch = (event) => {
    event.preventDefault();
    clearTimeout(typing);
    typing = setTimeout(() => {
      setSearchTerm(event.target.value);
    }, 400);

    if (!event.target.value) {
      clearTimeout(typing);
      setSearchTerm("");
    }
  };
  useEffect(() => {
    if (window.location.pathname.includes("teacher")) {
      if (_subjectId) {
        if (searchTerm) {
          dispatch(
            searchStudentAttendanceList(
              "teacherClassroomSubject",
              user.user_institute,
              user._id,
              _classroomId,
              _subjectId,
              currentDate,
              searchTerm
            )
          );
        } else {
          dispatch(
            getTeacherStudentAttendanceList(
              "teacherClassroomSubject",
              user.user_institute,
              user._id,
              _classroomId,
              _subjectId,
              currentDate
            )
          );
        }
      } else {
        if (searchTerm) {
          dispatch(
            searchStudentAttendanceList(
              "teacherClassroom",
              user.user_institute,
              user._id,
              _classroomId,
              "",
              currentDate,
              searchTerm
            )
          );
        } else {
          dispatch(
            getTeacherStudentAttendanceList(
              "teacherClassroom",
              user.user_institute,
              user._id,
              _classroomId,
              "",
              currentDate
            )
          );
        }
      }
    } else if (window.location.pathname.includes("admin")) {
      if (_subjectId) {
        if (searchTerm) {
          dispatch(
            searchStudentAttendanceList(
              "adminClassroomSubject",
              user.user_institute,
              "",
              _classroomId,
              _subjectId,
              currentDate,
              searchTerm
            )
          );
        } else {
          dispatch(
            getTeacherStudentAttendanceList(
              "adminClassroomSubject",
              user.user_institute,
              "",
              _classroomId,
              _subjectId,
              currentDate
            )
          );
        }
      } else {
        if (searchTerm) {
          dispatch(
            searchStudentAttendanceList(
              "adminClassroom",
              user.user_institute,
              "",
              _classroomId,
              "",
              currentDate,
              searchTerm
            )
          );
        } else {
          dispatch(
            getTeacherStudentAttendanceList(
              "adminClassroom",
              user.user_institute,
              "",
              _classroomId,
              "",
              currentDate
            )
          );
        }
      }
    }
  }, [
    _classroomId,
    _subjectId,
    currentDate,
    dispatch,
    searchTerm,
    user._id,
    user.user_institute,
  ]);
  useEffect(() => {
    if (_subjectId) {
      dispatch(ClassroomIDFetch(_subjectId));
    } else {
      dispatch(ClassroomIDFetch(user.user_institute, _classroomId));
    }
  }, [_classroomId, _subjectId, dispatch]);
  // const [disabledState, setDisabledState] = useState(false);
  // useEffect(() => {
  //   let thisDate = new Date();
  //   setDisabledState(
  //     moment(thisDate).format("MM-YYYY") ===
  //     moment(currentDate).format("MM-YYYY")
  //   );
  // }, [currentDate]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const handleSubjectFilter = (e) => {
    let _id = e.target.value;
    setSelectedSubject(_id);
    if (window.location.pathname.includes("admin")) {
      dispatch(
        getTeacherStudentAttendanceList(
          "adminClassroomSubject",
          user.user_institute,
          "",
          _classroomId,
          _id,
          currentDate
        )
      );
    } else if (window.location.pathname.includes("teacher")) {
      dispatch(
        getTeacherStudentAttendanceList(
          "teacherClassroomSubject",
          user.user_institute,
          user._id,
          _classroomId,
          _id,
          currentDate
        )
      );
    }
  };
  useEffect(() => {
    if (!_subjectId) {
      dispatch(getClassroomDataInviteFaculty(_classroomId));
    }
  }, [_classroomId, _subjectId, dispatch]);
  useEffect(() => {
    setSelectedSubject("");
  }, [currentDate, propDate]);
  return (
    <React.Fragment>
      <div className="Attendance-ListView-Head mt-20">
        {_subjectId ? (
          <p className="HeadNameCst text-sm w-500">
            {ClassroomDetailSuccess &&
              ClassroomDetail.data_courseInfo_coursename}
            ,{" "}
            {ClassroomDetailSuccess &&
              ClassroomDetail.data_classroomInfo_classroomname}
          </p>
        ) : (
          <p className="HeadNameCst text-sm w-500">
            {ClassroomDetailSuccess && ClassroomDetail.coursename}
          </p>
        )}

        <div className="scroll-nav-tab-wrapper">
          <ul className="Attendance-List-labeling">
            <li className="text-2xs w-500">
              <span className="secondary">
                <i className="disc"></i>P&nbsp;
              </span>
              -&nbsp;Present
            </li>
            <li className="text-2xs w-500">
              <span className="red">
                <i className="disc"></i>A&nbsp;
              </span>
              -&nbsp;Absent
            </li>
            <li className="text-2xs w-500">
              <span className="primary">
                <i className="disc"></i>L&nbsp;
              </span>
              -&nbsp;Leave Approved
            </li>
            <li className="text-2xs w-500">
              <span className="primary">
                <i className="disc"></i>ML&nbsp;
              </span>
              -&nbsp;Manual Leave
            </li>
            <li className="text-2xs w-500">
              <span className="bsPink">
                <i className="disc"></i>LR&nbsp;
              </span>
              -&nbsp;Leave Request
            </li>
            <li className="text-2xs w-500">
              <span className="gray">
                <i className="disc"></i>H&nbsp;
              </span>
              -&nbsp;Holiday
            </li>
          </ul>
        </div>
      </div>
      <div className="PageTopHead PTH-Attendance-ListView mt-20">
        <div className="PTH-Item">
          {!_subjectId ? (
            <SelectInput
              onChange={handleSubjectFilter}
              id="select_Classroom"
              value={selectedSubject}
              label={DynamicClassroomHeader}
            >
              <option value="">All {DynamicClassroomHeader()}</option>
              {classroom.length
                ? classroom.map((item) => {
                  return (
                    <option value={item._id}>{item.classroomname}</option>
                  );
                })
                : ""}
            </SelectInput>
          ) : (
            <p className="text-xxs w-500"></p>
          )}
        </div>
        <div className="PTH-Item P-Right">
          <div className="LeftRightCalender">
            {/* <InputDatePicker /> */}
            <button
              type="button"
              className="LeftDateIcon text-sm w-500"
              onClick={() => changeDateValue("minus")}
            >
              &#60;
            </button>
            <div className="DateCntMain">
              {moment(currentDate).format("MMMM-YYYY")}
            </div>
            <button
              type="button"
              className="RightDateIcon text-sm w-500"
              onClick={() => changeDateValue("plus")}
            // disabled={disabledState}
            >
              &#62;
            </button>
          </div>
        </div>
        <div className="PTH-Item P-Right">
          <SearchControl
            placeholder={"Student Search"}
            onChange={handleSearch}
            onKeyUp={handleSearch}
          />
        </div>
        <div className="PTH-Item P-Right">
          <button
            onClick={modal}
            type="button"
            className="button btn-sm button-base"
          >
            Mark Attendance
          </button>
        </div>
        {/* <div className="PTH-Item P-Right">
          <button type="button" onClick={handleHoliday} className="button btn-sm button-base">
            Holidays calender
          </button>
        </div> */}
      </div>
    </React.Fragment>
  );
};
export default TeacherAttendanceListHeader;
