import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import UseOutsideClick from "../../Common/UseOutsideClick";
import "./Form.scss";
const MultipleGroupSelectDropdown = ({
  coursesAndClassrooms,
  dropdownName,
  parentCheckbox,
  childCheckbox,
  getAllChild,
  getParent,
}) => {
  const [DropCheckToggle, SetDropCheckToggle] = useState(false);
  const DropCheckToggleRef = useRef();

  UseOutsideClick(DropCheckToggleRef, () => {
    if (DropCheckToggle) SetDropCheckToggle(false);
  });

  const [GroupCheckOpt, SetGroupCheckOpt] = useState(-1);
  function showHideGroupCheckOpt(index) {
    SetGroupCheckOpt(GroupCheckOpt === index ? -1 : index);
  }

  const { getSelectedCourse, getSelectedClassroom } = useSelector((state) => {
    return {
      getSelectedCourse: state.onlineClasses.setSelectedCourse,
      getSelectedClassroom: state.onlineClasses.setSelectedClassRoom,
    };
  });

  const [isAllSelected, setIsAllSelected] = useState(false);

  useEffect(() => {
    const allselect =
      getSelectedClassroom.length === 0 && getSelectedCourse.length === 0
        ? true
        : false;
    setIsAllSelected(allselect);
  }, [getSelectedClassroom, getSelectedCourse]);

  // const selectAllCourse = () => {
  //   setIsAllSelected(!isAllSelected);
  // };

  return (
    <div className="wrapper" ref={DropCheckToggleRef}>
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
                {dropdownName ? dropdownName : "Course"}
              </p>
            </div>
          </li>
        </ul>
        {DropCheckToggle && (
          <ul className="select_Check_ul">
            <li className="option">
              <label
                className="small"
              // onClick={selectAllCourse}
              >
                <input
                  type="checkbox"
                  name="All"
                  onChange={parentCheckbox}
                  defaultChecked={
                    // getSelectedClassroom.length === 0 &&
                    // getSelectedCourse.length === 0 ?
                    //    true
                    //   : false
                    isAllSelected
                  }
                />
                All Courses
              </label>
            </li>

            <li className="Dropdown_divider"></li>
            {coursesAndClassrooms.map((GroupOpt, index) => {
              return (
                <li className="GroupOption" key={GroupOpt._id}>
                  <div
                    title={GroupOpt.coursename}
                    className={`GroupOptLabelWrap ${GroupCheckOpt === index ? "active" : ""
                      }`}
                  >
                    <label
                      className="small"
                      onClick={() => getAllChild(GroupOpt.classroomData)}
                    >
                      <input
                        type="checkbox"
                        // name={GroupOpt.coursename}
                        name={GroupOpt._id}
                        defaultChecked={getSelectedCourse.includes(
                          GroupOpt._id
                        )}
                        onChange={parentCheckbox}
                      // indeterminate={getSelectedCourse.includes(GroupOpt._id)}
                      />
                    </label>

                    <span
                      className="GroupOptionLabel"
                      onClick={() => showHideGroupCheckOpt(index)}
                    >
                      {GroupOpt.coursename}
                    </span>
                  </div>
                  {GroupCheckOpt === index && (
                    <ul>
                      {GroupOpt.classroomData.length > 0 &&
                        GroupOpt.classroomData.map((classRoom) => {
                          return (
                            <li className="option" key={classRoom._id}>
                              <label
                                className="small"
                                onClick={() => getParent(GroupOpt._id)}
                                title={classRoom.classroomname}
                              >
                                <input
                                  type="checkbox"
                                  // name={classRoom.classroomname}
                                  name={classRoom._id}
                                  defaultChecked={getSelectedClassroom.includes(
                                    classRoom._id
                                  )}
                                  onChange={childCheckbox}
                                />
                                <span> {classRoom.classroomname}</span>
                              </label>
                            </li>
                          );
                        })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MultipleGroupSelectDropdown;
