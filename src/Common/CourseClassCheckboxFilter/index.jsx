import React, { useEffect, useState, useRef } from "react";
import useCourseClassroom from "./useCourseClassroom";
import { useSelector } from "react-redux";
import UseOutsideClick from "../UseOutsideClick";
import { CourseClassromFilterProvider } from "../../Context/CourseClassromFilterContext";
import CourseOption from "./CourseOption";
import { DynamicCourseHeader } from "../UserElement";
import "../../Common/Form/Form.scss";
const CourseClassCheckboxFilter = ({ dropdownName, onSelect }) => {
  const [DropCheckToggle, SetDropCheckToggle] = useState(false);
  const DropCheckToggleRef = useRef();
  const mainCheckboxRef = useRef();
  const [selectAll, setSelectAll] = useState(true);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [classroomCount, setclassroomCount] = useState(0);

  UseOutsideClick(DropCheckToggleRef, () => {
    if (DropCheckToggle) SetDropCheckToggle(false);
  });

  const { userId } = useSelector((state) => state.user._id);
  const { user_institute } = useSelector((state) => state.user);

  const [
    courseLoading,
    courseError,
    courseList,
    courseSuccess,
    getCourseClassroom,
  ] = useCourseClassroom();

  const [courseSelection, setcourseSelection] = useState([]);
  const [classRoomSelection, setclassRoomSelection] = useState([]);
  const [courseClassRoomSelection, setcourseClassRoomSelection] = useState({});

  const getClassRooms = (courseId) => {
    const selectedCourseDetail = courseList.courseData.find(
      (courseItem) => courseItem._id === courseId
    );
    if (
      selectedCourseDetail.classroomData &&
      selectedCourseDetail.classroomData.length
    ) {
      return selectedCourseDetail.classroomData.map((classroomDataItem) => {
        return classroomDataItem._id;
      });
    } else {
      return [];
    }
  };

  // Course check & Uncheck
  const handleCourseSelection = (evt) => {
    const { name } = evt.target;
    const classrooms = getClassRooms(name);
    if (courseSelection.length > 0) {
      let selectedCourses = [...courseSelection];
      if (courseSelection.includes(name)) {
        let removeClassRoom = courseClassRoomSelection[name];
        if (removeClassRoom.length === classrooms.length) {
          selectedCourses = selectedCourses.filter(
            (courseItem) => courseItem !== name
          );
          setcourseSelection([...selectedCourses]); // Remove course
          const objSelection = {
            ...courseClassRoomSelection,
          };
          delete objSelection[name];
          setcourseClassRoomSelection({ ...objSelection });
          // Remove classrooms
          let selectedClassRooms = [...classRoomSelection];
          if (removeClassRoom.length > 0) {
            selectedClassRooms = selectedClassRooms.filter(
              (item) => !removeClassRoom.includes(item)
            );
          }
          setclassRoomSelection([...selectedClassRooms]);
        } else {
          const objSelection = {
            ...courseClassRoomSelection,
            [name]: classrooms,
          };
          setcourseClassRoomSelection({ ...objSelection });
          let selectedClassRooms = [...classRoomSelection];
          if (removeClassRoom.length > 0) {
            selectedClassRooms = selectedClassRooms.filter(
              (item) => !classrooms.includes(item)
            );
          }
          setclassRoomSelection([...selectedClassRooms, ...classrooms]);
        }
      } else {
        selectedCourses.push(name);
        const objSelection = {
          ...courseClassRoomSelection,
          [name]: classrooms,
        };
        setcourseClassRoomSelection({ ...objSelection });
        setcourseSelection([...selectedCourses]);
        setclassRoomSelection([...classRoomSelection, ...classrooms]);
      }
    } else {
      const objSelection = {
        [name]: classrooms,
      };
      setcourseClassRoomSelection(objSelection);
      setcourseSelection([name]);
      setclassRoomSelection([...classrooms]);
    }
  };

  // Classroom check & Uncheck
  const handleClassRoomSelection = (evt, parentId) => {
    const { name } = evt.target;

    let selectedClassRoomList = [...classRoomSelection];
    let selectedCourses = [...courseSelection];
    let classRoomOptions = courseClassRoomSelection[parentId];
    if (selectedClassRoomList.includes(name)) {
      selectedClassRoomList = selectedClassRoomList.filter(
        (removeClassRoom) => removeClassRoom !== name
      );
      setclassRoomSelection([...selectedClassRoomList]);

      if (classRoomOptions && classRoomOptions.length > 0) {
        classRoomOptions = classRoomOptions.filter(
          (classroomOption) => classroomOption !== name
        );
        const objSelection = {
          ...courseClassRoomSelection,
          [parentId]: [...classRoomOptions],
        };
        setcourseClassRoomSelection(objSelection);

        // Remove course
        if (classRoomOptions.length === 0) {
          if (selectedCourses.includes(parentId)) {
            selectedCourses = selectedCourses.filter(
              (courseOption) => courseOption !== parentId
            );
            setcourseSelection([...selectedCourses]);
          }
        }
      }
    } else {
      selectedClassRoomList.push(name);
      if (classRoomOptions) {
        const objSelection = {
          ...courseClassRoomSelection,
          [parentId]: [...classRoomOptions, name],
        };
        setcourseClassRoomSelection(objSelection);
      } else {
        const objSelection = {
          ...courseClassRoomSelection,
          [parentId]: [name],
        };
        setcourseClassRoomSelection(objSelection);
      }

      if (!selectedCourses.includes(parentId)) {
        selectedCourses.push(parentId);
        setcourseSelection(selectedCourses);
      }
      setclassRoomSelection([...selectedClassRoomList]);
    }
  };

  const handleCheckUncheck = () => {
    if (selectAll) {
      setSelectAll(false);
      setcourseSelection([]);
      setclassRoomSelection([]);
      setcourseClassRoomSelection({});
    } else {
      setSelectAll(true);
      markToAll();
    }
  };

  const markToAll = () => {
    let allCources = [];
    let allClassRooms = [];
    let allCourseClassRooms = {};
    let classRoomCount = 0;
    if (courseList.courseData && courseList.courseData.length) {
      // eslint-disable-next-line array-callback-return
      courseList.courseData.map((courseItem) => {
        const classRooms = getClassRooms(courseItem._id);
        classRoomCount = classRoomCount + courseItem.classroomData.length;
        allCources.push(courseItem._id);
        allClassRooms = allClassRooms.concat(classRooms);
        allCourseClassRooms = {
          ...allCourseClassRooms,
          [courseItem._id]: classRooms,
        };
      });
      setclassroomCount(classRoomCount);
      setcourseClassRoomSelection(allCourseClassRooms);
      setcourseSelection(allCources);
      setclassRoomSelection(allClassRooms);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    getCourseClassroom(user_institute, userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isFirstRender && DropCheckToggle) {
      // Select all checkbox after loading the course for open dropdown
      setIsFirstRender(false);
      markToAll();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DropCheckToggle, courseList]);

  function mainCheckboxSelection() {
    return (
      courseList.courseData &&
      courseList.courseData.length === courseSelection.length &&
      classroomCount === classRoomSelection.length
    );
  }

  useEffect(() => {
    // Dispatch Event
    if (DropCheckToggle) {
      onSelect({
        courseList: courseSelection,
        classRoomList: classRoomSelection,
      });

      // Main checkbox selection

      if (mainCheckboxSelection()) {
        if (mainCheckboxRef.current) {
          mainCheckboxRef.current.indeterminate = false;
          // mainCheckboxRef.current.nextSibling.classList.remove("CheckDash");
        }
        setSelectAll(true);
      } else {
        if (mainCheckboxRef.current) {
          let indeterminate =
            courseSelection.length > 0 && classRoomSelection.length > 0;
          mainCheckboxRef.current.indeterminate = indeterminate;
          if (indeterminate) {
            // mainCheckboxRef.current.nextSibling.classList.add("CheckDash");
          } else {
            // mainCheckboxRef.current.nextSibling.classList.remove("CheckDash");
          }
        }
        setSelectAll(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseSelection, classRoomSelection]);

  return (
    <div className="wrapper" ref={DropCheckToggleRef}>
      <CourseClassromFilterProvider
        value={{
          source: courseList,
          courseSelection: courseSelection,
          classRoomSelection: classRoomSelection,
          courseClassRoomSelection: courseClassRoomSelection,
          courseSelect: handleCourseSelection,
          classroomSelect: handleClassRoomSelection,
        }}
      >
        <div className="select_wrap">
          {/* <div
            className={`caret-dropdown ${DropCheckToggle ? "active" : ""}`}
          ></div> */}
          <ul
            className={`default_option ${DropCheckToggle ? "active" : ""}`}
            onClick={() => SetDropCheckToggle(!DropCheckToggle)}
          >
            <li>
              <div className="option">
                <p className="text-xxs w-500">
                  {dropdownName ? dropdownName : DynamicCourseHeader()}
                </p>
              </div>
            </li>
          </ul>
          {DropCheckToggle && (
            <ul className="select_Check_ul">
              {courseLoading ? (
                <li className="option">
                  <label>Loading</label>
                </li>
              ) : (
                courseSuccess && (
                  <React.Fragment>
                    <li className="option">
                      <label className="small">
                        <input
                          ref={mainCheckboxRef}
                          type="checkbox"
                          name="All"
                          defaultChecked={selectAll}
                          checked={selectAll}
                          onChange={() => handleCheckUncheck()}
                        />
                        All <DynamicCourseHeader />
                      </label>
                    </li>
                    <li className="Dropdown_divider"></li>
                    {courseList.courseData &&
                      courseList.courseData.length > 0 &&
                      courseList.courseData.map((courseItem) => (
                        <CourseOption
                          title={courseItem.coursename}
                          courseid={courseItem._id}
                          classroomData={courseItem.classroomData}
                        />
                      ))}
                  </React.Fragment>
                )
              )}
            </ul>
          )}
        </div>
      </CourseClassromFilterProvider>
    </div>
  );
};

export default CourseClassCheckboxFilter;
