import React, { useEffect, useState } from "react";
// import GrayAuthTheme from "../../../../Common/Theme/GrayAuthTheme";
import "./CreateCourse.scss";
import CourseInfo from "./CourseInfo/CourseInfo";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import CourseContent from "./CourseContent";
import { AdminCourseReset, getSingleCourseInfoData } from "../../../../store/actions/admincourse";
const CreateCourse = ({ idToggle }) => {
  const [toggle, setToggle] = useState("CourseInfo"); // teacher or student
  const { _id } = useParams();
  const dispatch = useDispatch()
  const [toggleSet, setToggleSet] = useState(false)
  if (idToggle === "CourseContents" && !toggleSet) {
    setToggleSet(true)
    setToggle('CourseContents')
  }
  useEffect(() => {
    if (_id) {
      dispatch(getSingleCourseInfoData(_id))
    }
  }, [_id, dispatch])

  const toggleStateEdit = (data) => {
    setToggle('CourseContents')
  }

  useEffect(() => {
    return () => {
      dispatch(AdminCourseReset())
    }
  }, [dispatch])
  return (
    <React.Fragment>
      {/* <React.Fragment> */}
      {/* <div className="pageInCenter"> */}
      <div className="PageTopHead PTH-CreateCourseList mt-20">
        <div className="PTH-Item">
          <p className="text-sm w-200">{_id ? "Edit Material" : "Create New Material"}</p>
          {/* <p className="text-xs w-600">Physics</p> */}
        </div>
      </div>
      {_id ? (
        <div className="PageTopHead PTH-CreateCourseList mt-20">
          <div className="PTH-Item">
            <ul className="CreateCourseListTab scroll-nav-tab">
              <li
                className={
                  toggle === "CourseInfo"
                    ? "CreateCourseListTabItem active"
                    : "CreateCourseListTabItem"
                }
                onClick={() =>
                  setToggle(
                    "CourseInfo"
                    // toggle === "CourseInfo" ? "default" : "CourseInfo"
                  )
                }
              >
                Material Info
              </li>
              <li
                className={
                  toggle === "CourseContents"
                    ? "CreateCourseListTabItem active"
                    : "CreateCourseListTabItem"
                }
                onClick={() =>
                  setToggle(
                    "CourseContents"
                    // toggle === "CourseContents" ? "default" : "CourseContents"
                  )
                }
              >
                Contents
              </li>
            </ul>
          </div>
        </div>
      ) : (
        ""
      )}

      {toggle === "CourseInfo" ? (
        <CourseInfo toggleStateEdit={(data) => toggleStateEdit(data)} />
      ) : toggle === "CourseContents" ? (
        <CourseContent />
      ) : (
        <CourseInfo toggleStateEdit={(data) => toggleStateEdit(data)} />
      )}
      {/* </div> */}
      {/* </React.Fragment> */}
    </React.Fragment>
  );
};

export default CreateCourse;
