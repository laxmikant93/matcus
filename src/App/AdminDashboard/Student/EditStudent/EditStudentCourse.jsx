/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ValidationUtils from "../../../../Classes/ValidationUtils";
import Card from "../../../../Common/Card";
import CardBody from "../../../../Common/Card/CardBody";
import FormError from "../../../../Common/Form/FormError";
import {
  DynamicClassroomHeader,
  DynamicCourseHeader,
} from "../../../../Common/UserElement";
import {
  assignMultipleCourses,
  deleteAssignedCourse,
  getAssignedMultipleCourses,
  getCourseData,
  resetMultipleCourses,
} from "../../../../store/actions/courses";
import { showSuccessPopup } from "../../../../store/actions/successmessagepopup";
import { useNavigate, useParams } from "react-router";
import { getClassroomDataInviteFaculty } from "../../../../store/actions/classroom";
import UseOutsideClick from "../../../../Common/UseOutsideClick";
import Popup from "../../../../Common/Popup";
import "./MultipleCourse.scss";
import SelectInput from "../../../../Common/Form/SelectInput";

const EditStduentCourse = ({ userType }) => {
  const { _id } = useParams();
  const { _courseId } = useParams();
  const dispatch = useDispatch();
  const history = useNavigate();
  const {
    user,
    coursesData,
    classroom,
    classroomSuccess,
    getCourseAssignedData,
    getCourseAssignedDataSuccess,
    assignAndUpdateState,
    deleteAssignedCourseLoading,
    deleteAssignedCourseSuccess,
  } = useSelector((state) => {
    return {
      user: state.user,
      coursesData: state.courses.list.data,
      classroom: state.classroom.list.data,
      classroomSuccess: state.classroom.list.success,
      getCourseAssignedData: state.courses.multipleCoursesAssigned.data,
      getCourseAssignedDataSuccess:
        state.courses.multipleCoursesAssigned.success,
      assignAndUpdateState: state.courses.assignMultipleCourses,
      deleteAssignedCourseLoading:
        state.courses.deleteStudentAssignedCourse.loading,
      deleteAssignedCourseSuccess:
        state.courses.deleteStudentAssignedCourse.success,
    };
  });

  const mainCheckboxRef = useRef();
  const [courses, setCourses] = useState([]);
  const [sameCourseError, setSameCourseError] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [singleSelect, setSingleSelect] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const addMoreCourse = useCallback(() => {
    let coursesList = courses;
    coursesList.push({
      institute: "",
      course: "",
      classroomData: [],
      isCourseValid: false,
      isClassroomValid: false,
      isCourseSame: true,
      postNewAddMoreCourse: true,
    });
    setCourses([...coursesList]);
  });
  useEffect(() => {
    if (getCourseAssignedDataSuccess && !isFilled) {
      setIsFilled(true);
      if (!getCourseAssignedData.length) {
        addMoreCourse();
      } else {
        let arrayValidationsFill = [];
        for (let index = 0; index < getCourseAssignedData.length; index++) {
          const element = getCourseAssignedData[index];
          let filterGetClassroomData = element.classroomData.map((item) => {
            return item.isClassroomAssigned === "yes" ? item._id : false;
          });
          arrayValidationsFill.push({
            ...element,
            getClassroomList: element.classroomData,
            classroomData: filterGetClassroomData.filter(
              (item) => item !== false
            ),
            isCourseValid: false,
            isClassroomValid: isClassroomLengthValid(
              filterGetClassroomData.filter((item) => item !== false)
            ),
            patchData: true,
            isCourseSame: true,
          });
        }
        let arr = [];
        for (let index = 0; index < getCourseAssignedData.length; index++) {
          const element = getCourseAssignedData[index];
          let filterAssignedData = element.classroomData.map((item) => {
            return item.isClassroomAssigned === "yes" ? item._id : false;
          });
          const newData = {
            id: element._id,
            course: element.course,
            classroom: filterAssignedData.filter((item) => item !== false),
          };
          arr.push(newData);
        }
        setPayloadData([...arr]);
        isClassroomValid();
        setCourses(arrayValidationsFill);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCourseAssignedDataSuccess, courses, getCourseAssignedData, isFilled]);

  const [RemovePop, setRemovePop] = useState(false);
  const [deleteID, setDeleteID] = useState("");
  const RemovePopState = (_id) => {
    setRemovePop(!RemovePop);
    setDeleteID(_id);
  };
  const RemovePopToggleRef = useRef();

  UseOutsideClick(RemovePopToggleRef, () => {
    if (RemovePop) setRemovePop(false);
  });

  const removeCourse = (key) => {
    if (courses[key]["patchData"] && courses[key]["patchData"] === true) {
      dispatch(deleteAssignedCourse(courses[key]["_id"]));
      courses.splice(key, 1);
    } else {
      courses.splice(key, 1);
      dispatch(showSuccessPopup("Deleted Successfully."));
      setRemovePop(false);
      if (courses && courses[key] && courses[key]["isSameCourse"]) {
        courses[key]["isCourseSame"] = checkSameCourse(courses[key]["course"]);
      }
    }
    forMakePatchData();
    setCourses([...courses]);
  };
  useEffect(() => {
    !deleteAssignedCourseLoading &&
      deleteAssignedCourseSuccess &&
      setRemovePop(false);
  }, [deleteAssignedCourseLoading, deleteAssignedCourseSuccess]);

  const selectAll = (key) => {
    if (
      courses[key]["postNewAddMoreCourse"] &&
      courses[key]["postNewAddMoreCourse"] === true
    ) {
      courses[key]["classroomData"] =
        classroomSuccess &&
        classroom.length &&
        classroom
          .filter((c) => c.course === courses[key]["course"])
          .map((item) => {
            return item._id;
          });

      courses[key]["isClassroomValid"] = isClassroomLengthValid(
        classroomSuccess &&
        classroom.length &&
        classroom
          .filter((c) => c.course === courses[key]["course"])
          .map((item) => {
            return item._id;
          })
      );
    } else {
      courses[key]["classroomData"] = courses[key].getClassroomList.map(
        (item) => {
          return item._id;
        }
      );
      courses[key]["isClassroomValid"] = isClassroomLengthValid(
        courses[key].getClassroomList.map((item) => {
          return item._id;
        })
      );
    }
    setCourses([...courses]);
    forMakePatchData();
    isClassroomValid();
  };
  const deSelectAll = (key) => {
    let emptyArray = [];
    courses[key]["classroomData"] = emptyArray;

    courses[key]["isClassroomValid"] = isClassroomLengthValid(
      courses[key]["classroomData"]
    );

    setCourses([...courses]);
    forMakePatchData();

    isClassroomValid();
  };
  const handleCourse = (e, key) => {
    let inputValue = e.target.value;
    courses[key]["course"] = inputValue;
    courses[key]["isCourseValid"] = ValidationUtils.isNotEmpty(inputValue);
    courses[key]["isCourseSame"] = checkSameCourse(inputValue);
    courses[key]["classroomData"] = [];
    courses[key]["postNewAddMoreCourse"] = true;
    setCourses([...courses]);
    isCourseValid();
    isClassroomValid();
    if (inputValue === "") {
    } else {
      dispatch(getClassroomDataInviteFaculty(inputValue));
    }
    forMakePatchData();
  };

  const checkSameCourse = (inputValue) => {
    let sameData = courses.filter((item) => item.course === inputValue);
    if (sameData.length > 1) {
      return false;
    } else {
      return true;
    }
  };
  const isClassroomLengthValid = (inputValue) => {

    if (inputValue.length > 0) {
      return true;
    } else {
      return false;
    }
  };
  const isSameCourse = () => {
    let isValid = true;
    for (let key = 0; key < courses.length; key++) {
      const element = courses[key];
      if (!element.isCourseSame) {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      setSameCourseError(false);
    } else {
      setSameCourseError(true);
    }
    return isValid;
  };

  const handleClassroom = (e, key) => {
    let checked = e.target.checked;
    let inputValue = e.target.value;
    if (checked) {
      courses[key]["classroomData"].push(inputValue);
      setSingleSelect(true);
    } else {
      let data = courses[key]["classroomData"];
      let index = data.indexOf(inputValue);
      data.splice(index, 1);
    }
    courses[key]["isClassroomValid"] = isClassroomLengthValid(
      courses[key]["classroomData"]
    );
    setCourses([...courses]);
    forMakePatchData();
    isClassroomValid();
  };
  const [courseError, setCourseError] = useState(false);
  const isCourseValid = () => {
    let isValid = true;
    for (let key = 0; key < courses.length; key++) {
      const element = courses[key];
      if (ValidationUtils.isEmpty(element.course)) {
        isValid = false;
        break;
      }
    }

    if (isValid) {
      setCourseError(false);
    } else {
      setCourseError(true);
    }
    return isValid;
  };
  const [classroomError, setClassroomError] = useState(false);

  const isClassroomValid = () => {
    let isValid = true;
    for (let key = 0; key < courses.length; key++) {
      const element = courses[key];
      if (!element.isClassroomValid) {
        isValid = false;

        break;
      }
    }
    if (isValid) {
      setClassroomError(false);
    } else {
      setClassroomError(true);
    }
    return isValid;
  };

  const [payloadData, setPayloadData] = useState([]);
  const forMakePatchData = () => {
    let arr = [];
    for (let index = 0; index < courses.length; index++) {
      const element = courses[index];

      if (element.patchData) {
        const newData = {
          id: element._id,
          course: element.course,
          classroom: element.classroomData,
        };
        arr.push(newData);
      } else {
        const newData = {
          course: element.course,
          classroom: element.classroomData,
        };
        arr.push(newData);
      }
    }
    setPayloadData([...arr]);
  };
  // }, [courses]);

  const handleUpdate = () => {
    forMakePatchData();
    const courseValid = isCourseValid();
    const isCourseSame = isSameCourse();
    const classroomValid = isClassroomValid();
    if (courseValid && isCourseSame && classroomValid) {
      if (
        window.location.pathname.includes("edit-student") ||
        window.location.pathname.includes("update-multiple-courses")
      ) {
        dispatch(
          assignMultipleCourses(
            _id,
            user.user_institute,
            user._id,
            "student",
            payloadData
          )
        );
      } else {
        dispatch(
          assignMultipleCourses(
            _id,
            user.user_institute,
            user._id,
            "teacher",
            payloadData
          )
        );
      }
    }
  };
  if (assignAndUpdateState.success) {
    if (window.location.pathname.includes("edit-student")) {
      history("/invite-student-list");
    } else if (window.location.pathname.includes("update-multiple-courses")) {
      history(`/edit-course/${_courseId}`);
    } else if (window.location.pathname.includes("edit-teacher")) {
      history("/invite-faculty-list");
    } else if (
      window.location.pathname.includes("assign-teacher-multiple-classroom")
    ) {
      history(`/edit-course/${_courseId}`);
    }
  }
  const cancelButton = () => {
    if (window.location.pathname.includes("edit-student")) {
      history("/invite-student-list");
    } else if (window.location.pathname.includes("update-multiple-courses")) {
      history(`/edit-course/${_courseId}`);
    } else if (window.location.pathname.includes("edit-teacher")) {
      history("/invite-faculty-list");
    } else if (
      window.location.pathname.includes("assign-teacher-multiple-classroom")
    ) {
      history(`/edit-course/${_courseId}`);
    }
  };
  useEffect(() => {
    dispatch(getCourseData(user.user_institute));
  }, [_id, dispatch, user]);
  useEffect(() => {
    if (
      window.location.pathname.includes("edit-student") ||
      window.location.pathname.includes("update-multiple-courses")
    ) {
      dispatch(getAssignedMultipleCourses(user.user_institute, _id, "student"));
    } else {
      dispatch(getAssignedMultipleCourses(user.user_institute, _id, "teacher"));
    }
  }, [_id, dispatch, user.user_institute]);

  useEffect(() => {
    return () => {
      dispatch(resetMultipleCourses());
    };
  }, [dispatch]);
  return (
    <React.Fragment>
      {getCourseAssignedDataSuccess ? (
        <div className="S-DetailList mt-20">
          {courses.map((coursesDataa, key) => {
            return (
              <Card className="cardPadding" key={key}>
                <CardBody>
                  <div className="List_coures_wrapper">
                    <div className="List_coures">
                      <div
                        className="formFieldwrap"
                      >
                        <SelectInput
                          id="profession_cat"
                          onChange={(e) => handleCourse(e, key)}
                          name="student_course"
                          value={coursesDataa.course}
                          className={(!courses[key]["course"] && courseError) ||
                            (coursesDataa.course &&
                              !courses[key]["isCourseSame"])
                            ? "errorInput"
                            : ""
                          }
                          label={`Select ${DynamicCourseHeader()}`}
                          required
                        >
                          <option value="">
                            Select {DynamicCourseHeader()}
                          </option>
                          {coursesData.length
                            ? coursesData.map((item) => {
                              return (
                                <option key={item._id} value={item._id}>
                                  {item.coursename}
                                </option>
                              );
                            })
                            : ""}
                        </SelectInput>
                        {/* <label className="animLabel" htmlFor="profession_cat">
                          Select <DynamicCourseHeader />
                        </label> */}
                        <FormError
                          show={!courses[key]["course"] && courseError}
                          error={DynamicCourseHeader() + " is required."}
                        />
                        {sameCourseError && (
                          <FormError
                            show={
                              coursesDataa.course &&
                              !courses[key]["isCourseSame"]
                            }
                            error={`This ${DynamicCourseHeader()} is already assigned to ${userType}.`}
                          ></FormError>
                        )}
                      </div>

                      <div className="coursechooseclass_grid mt-10 mb-10">
                        {/* <div className="select_deselect w-400"> */}
                        {coursesDataa.postNewAddMoreCourse &&
                          coursesDataa.postNewAddMoreCourse === true
                          ? coursesDataa.course &&
                          classroomSuccess &&
                          classroom.length > 0 && (
                            <React.Fragment>
                              <span className="text-xs base w-500">
                                Choose <DynamicClassroomHeader />{" "}
                              </span>
                              <div className="select_deselect w-400">
                                <p
                                  className="btnText text-xxs primary underline"
                                  type="button"
                                  onClick={() => selectAll(key)}
                                >
                                  Select All
                                </p>
                                <p
                                  className="btnText text-xxs primary underline"
                                  type="button"
                                  onClick={() => deSelectAll(key)}
                                >
                                  Deselect All
                                </p>
                              </div>
                            </React.Fragment>
                          )
                          : coursesDataa.getClassroomList.length > 0 && (
                            <React.Fragment>
                              <span className="text-xs base w-500">
                                Choose <DynamicClassroomHeader />
                              </span>
                              <div className="select_deselect w-400">
                                <p
                                  className="btnText text-xxs primary underline"
                                  type="button"
                                  onClick={() => selectAll(key)}
                                >
                                  Select All
                                </p>
                                <p
                                  className="btnText text-xxs primary underline"
                                  type="button"
                                  onClick={() => deSelectAll(key)}
                                >
                                  Deselect All
                                </p>
                              </div>
                            </React.Fragment>
                          )}

                      </div>
                      {
                        <React.Fragment>
                          <div className="checkbox">
                            {coursesDataa.postNewAddMoreCourse &&
                              coursesDataa.postNewAddMoreCourse === true ? (
                              coursesDataa.course ? (
                                classroomSuccess ? (
                                  classroom.length ? (
                                    classroom
                                      .filter(
                                        (c) => c.course === coursesDataa.course
                                      )
                                      .map((item) => {
                                        return (
                                          <React.Fragment key={item._id}>
                                            <div className="input-custom-type">
                                              <label
                                                className={`mt-5 ${coursesDataa.classroomData.includes(
                                                  item._id
                                                )
                                                  ? "active"
                                                  : ""
                                                  } `}
                                              >
                                                <input
                                                  type="checkbox"
                                                  ref={mainCheckboxRef}
                                                  onChange={(e) =>
                                                    handleClassroom(e, key)
                                                  }
                                                  checked={coursesDataa.classroomData.includes(
                                                    item._id
                                                  )}
                                                  defaultChecked={coursesDataa.classroomData.includes(
                                                    item._id
                                                  )}
                                                  name={key}
                                                  value={item._id}
                                                />

                                                {item.classroomname}
                                              </label>
                                            </div>
                                          </React.Fragment>
                                        );
                                      })
                                  ) : (
                                    ""
                                  )
                                ) : (
                                  <h1>Loading...</h1>
                                )
                              ) : (
                                ""
                              )
                            ) : coursesDataa.getClassroomList.length ? (
                              coursesDataa.getClassroomList.map(
                                (item, optionKey) => {
                                  return (
                                    <React.Fragment key={optionKey}>
                                      <div className="input-custom-type">
                                        <label
                                          className={`mt-5 ${coursesDataa.classroomData.includes(
                                            item._id
                                          )
                                            ? "active"
                                            : ""
                                            } `}
                                        >
                                          <input
                                            type="checkbox"
                                            ref={mainCheckboxRef}
                                            onChange={(e) =>
                                              handleClassroom(e, key)
                                            }
                                            checked={coursesDataa.classroomData.includes(
                                              item._id
                                            )}
                                            defaultChecked={coursesDataa.classroomData.includes(
                                              item._id
                                            )}
                                            name={key}
                                            value={item._id}
                                          />

                                          {item.classroomname}
                                        </label>
                                      </div>
                                    </React.Fragment>
                                  );
                                }
                              )
                            ) : (
                              ""
                            )}
                            {coursesDataa.course ? (
                              <FormError
                                show={
                                  !courses[key]["classroomData"].length &&
                                  classroomError
                                }
                                error={
                                  "Atleast One Subject should be selected."
                                }
                              />
                            ) : (
                              ""
                            )}
                          </div>
                        </React.Fragment>
                      }
                    </div>
                    {courses.length !== 1 && (
                      <button
                        type="button"
                        onClick={() => RemovePopState(key)}
                        className="button btn-o-red red listremove_btn btn-xs"
                      >
                        <i className="ed-icon icon-delete red i-md h-40"></i>{" "}
                        Remove
                      </button>
                    )}
                    {key === deleteID && RemovePop && (
                      <Popup
                        show={RemovePop}
                        RemovePopToggleRef={RemovePopToggleRef}
                        CancelProp={() => setRemovePop(!RemovePop)}
                        RemoveProp={() => removeCourse(key)}
                        loading={deleteAssignedCourseLoading}
                        className={"customPopup"}
                      >
                        <p className="gray text-xxs w-300">
                          You are about to remove this <DynamicCourseHeader />.
                        </p>
                        <p className="dgray text-xxs w-400">Are you sure?</p>
                      </Popup>
                    )}
                  </div>
                </CardBody>
              </Card>
            );
          })}
          {courses.length < coursesData.length && (
            <div className="listcoursebtngrid">
              <button
                onClick={addMoreCourse}
                className="button button-primary btn-sm mt-20"
              >
                {" "}
                <i className="ed-icon icon-plus-add white i-md"></i>
                Add New <DynamicCourseHeader />
              </button>
            </div>
          )}
          <div className="btn_update_cancel mt-20">
            {assignAndUpdateState.loading ? (
              <button className="button btn-md button-theme btn-sm" type="button">
                Updating <DynamicCourseHeader />
                ...
              </button>
            ) : (
              <button
                className="button btn-md button-theme btn-sm"
                type="button"
                onClick={handleUpdate}
              >
                Update <DynamicCourseHeader />
              </button>
            )}
            <button
              className="button btn-sm btn-o-primary primary"
              type="button"
              onClick={cancelButton}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="loadingGridData">Loading....</div>
      )}
    </React.Fragment>
  );
};
export default EditStduentCourse;
