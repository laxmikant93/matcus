import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import AppLink from "../../../../Common/AppLink";
import Storage from "../../../../Classes/Storage";
import MultipleSelectDropDownCommon from "../../../../Common/Form/MultiSelectDropDownCommon";
import SingleSelectDropdown from "../../../../Common/Form/SingleSelectDropdown";
import {
  createdByAssignToCoursesAdminClassroom,
  deleteClassroomViewItem,
  getAssignmentTeacherClassroom,
  getClassroomViewList,
  SortCoursesAdminClassroom,
} from "../../../../store/actions/classroomdetail";
import FilterSearch from "./FilterSearch";
import refresh from "./icon-refresh.svg";
import Popup from "../../../../Common/Popup";
import UseOutsideClick from "../../../../Common/UseOutsideClick";
import moment from "moment";
import AssignToModal from "../../../Course/AdminCourse/AssignToDropdown";
import {
  AllEntrySelected,
  AllEntrySelectedSwitch,
} from "../../../../store/actions/MultiSelectDropDown";
const ViewClassroomCourses = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const { classroomId } = useParams();
  const {
    users,
    ViewClassroomList,
    ViewClassroomListLoading,
    ViewClassroomListSuccess,
    ViewClassroomDeleteLoading,
    ViewClassroomDeleteSuccess,
    TeacherListData,
    TeacherListDataSuccess,
    postState,
  } = useSelector((state) => {
    return {
      users: state.user,
      ViewClassroomList: state.classroomDetail.CourseList.data,
      ViewClassroomListSuccess: state.classroomDetail.CourseList.success,
      ViewClassroomDeleteLoading: state.classroomDetail.delete.loading,
      ViewClassroomDeleteSuccess: state.classroomDetail.delete.success,
      ViewClassroomListLoading: state.classroomDetail.CourseList.loading,
      TeacherListData: state.classroomDetail.TeacherDataList.data,
      TeacherListDataSuccess: state.classroomDetail.TeacherDataList.success,
      postState: state.admincourse.postAssignedData,
    };
  });
  const [listGetLoading, setListGetLoading] = useState(false);
  useEffect(() => {
    if (ViewClassroomListLoading) {
      setListGetLoading(true);
    } else if (!listGetLoading) {
      dispatch(
        getClassroomViewList(
          users.user_institute,
          classroomId,
          ToggleValue,
          courseId
        )
      );
      dispatch(
        getAssignmentTeacherClassroom(users.user_institute, classroomId)
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classroomId, users._id, users.user_institute, listGetLoading]);
  const selectGroup = [
    "Duration",
    "Longest to Shortest",
    "Shortest to Longest",

    "Start Date",
    "Recent to Old",
    "Old to Recent",

    "Topic",
    "High to Low",
    "Low to High",
  ];
  const RemovePopToggleRef = useRef();

  UseOutsideClick(RemovePopToggleRef, () => {
    if (RemovePop) setRemovePop(false);
  });

  const [RemovePop, setRemovePop] = useState(false);
  const [deleteID, setDeleteID] = useState("");
  const ToggleValue = "Courses";
  const filterValues = ["Duration", "Start Date", "Topic"];
  const courseId = Storage.alive("__wz_crse__")
    ? Storage.getJson("__wz_crse__")
    : "";
  const RemovePopState = (_id) => {
    setRemovePop(!RemovePop);
    setDeleteID(_id);
  };

  const SingleSelectHandel = (value) => {
    const selectedValue = value;
    switch (selectedValue) {
      case "ALL": {
        dispatch(
          getClassroomViewList(
            users.user_institute,
            classroomId,
            ToggleValue,
            courseId
          )
        );
        break;
      }
      case "Longest to Shortest": {
        dispatch(
          SortCoursesAdminClassroom(
            users.user_institute,
            courseId,
            classroomId,
            "duration",
            "long"
          )
        );
        break;
      }
      case "Shortest to Longest": {
        dispatch(
          SortCoursesAdminClassroom(
            users.user_institute,
            courseId,
            classroomId,
            "duration",
            "short"
          )
        );
        break;
      }
      case "Recent to Old": {
        dispatch(
          SortCoursesAdminClassroom(
            users.user_institute,
            courseId,
            classroomId,
            "time",
            "rto"
          )
        );
        break;
      }
      case "Old to Recent": {
        dispatch(
          SortCoursesAdminClassroom(
            users.user_institute,
            courseId,
            classroomId,
            "time",
            "otr"
          )
        );
        break;
      }
      case "High to Low": {
        dispatch(
          SortCoursesAdminClassroom(
            users.user_institute,
            courseId,
            classroomId,
            "topic",
            "htl"
          )
        );
        break;
      }
      case "Low to High": {
        dispatch(
          SortCoursesAdminClassroom(
            users.user_institute,
            courseId,
            classroomId,
            "topic",
            "lth"
          )
        );
        break;
      }

      default:
        dispatch(
          getClassroomViewList(
            users.user_institute,
            classroomId,
            ToggleValue,
            courseId
          )
        );
    }
  };

  const deleteAdminCourse = (_id) => {
    dispatch(deleteClassroomViewItem(_id, ToggleValue));
  };
  const [modalItemId, setModalItemId] = useState("");
  const [modal, setModal] = useState(false);
  const openModal = (_id) => {
    setModal(!modal);
    setModalItemId(_id);
  };
  UseOutsideClick(RemovePopToggleRef, () => {
    if (modal) setModal(false);
  });

  const editCourse = (id) => {
    history(`/edit-admin-course/${id}/${classroomId}`);
  };
  const [assignToCourseId, setAssignToCourseId] = useState("");
  const [assignToModalState, setAssignToModalState] = useState(false);
  const closeModalState = () => {
    setAssignToModalState(!assignToModalState);
    setAssignToCourseId("");
    setTimeout(() => {
      setSelectedTeacherFilled(false);
    }, 200);
  };
  const [selectedTeacherFilled, setSelectedTeacherFilled] = useState(false);

  if (TeacherListDataSuccess && !selectedTeacherFilled) {
    setSelectedTeacherFilled(true);

    let value = [];
    for (let i = 0; i < TeacherListData.length; i++) {
      value.push(TeacherListData[i].user._id);
    }
    value.push("All");
    dispatch(AllEntrySelected(value));
    dispatch(AllEntrySelectedSwitch(value));
  }
  const OnSelectedValueAssignTo = (value) => {
    dispatch(
      createdByAssignToCoursesAdminClassroom(
        users.user_institute,
        courseId,
        classroomId,
        "assignTo",
        value
      )
    );
  };
  const OnSelectedValueCreatedBy = (value) => {
    dispatch(
      createdByAssignToCoursesAdminClassroom(
        users.user_institute,
        courseId,
        classroomId,
        "createdBy",
        value
      )
    );
  };
  const handleNotify = (_id) => {
    setAssignToCourseId(_id);
    setAssignToModalState(!assignToModalState);
  };
  useEffect(() => {
    !ViewClassroomDeleteLoading &&
      ViewClassroomDeleteSuccess &&
      setRemovePop(false);
  }, [ViewClassroomDeleteLoading, ViewClassroomDeleteSuccess]);

  useEffect(() => {
    if (postState.success) {
      dispatch(
        getClassroomViewList(
          users.user_institute,
          classroomId,
          ToggleValue,
          courseId
        )
      );
    }
  }, [
    classroomId,
    courseId,
    dispatch,
    postState.success,
    users.user_institute,
  ]);
  const handleRefresh = () => {
    dispatch(
      getClassroomViewList(
        users.user_institute,
        classroomId,
        ToggleValue,
        courseId
      )
    );
  };
  // eslint-disable-next-line no-unused-vars
  const [multipleDropDownUserData, setMultipleDropDownUserData] = useState([]);
  useEffect(() => {
    if (TeacherListData && TeacherListData.length) {
      TeacherListData.map((item) => item.user && multipleDropDownUserData.push(item.user));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [TeacherListData, users._id])
  return (
    <React.Fragment>
      <div className="PageTopHead PTH-ViewClassroomAdminCourse mt-20">
        <div className="PTH-Item">
          <SingleSelectDropdown
            selectGroup={selectGroup}
            filterValues={filterValues}
            SingleSelectHandel={(item) => SingleSelectHandel(item)}
          />
        </div>
        <div className="PTH-Item">
          {
            <MultipleSelectDropDownCommon
              selectGroup={TeacherListDataSuccess && multipleDropDownUserData}
              OnSelectedValue={OnSelectedValueAssignTo}
              name={"Assign To"}
              SwitchSelectData={false}
            />
          }
        </div>
        <div className="PTH-Item">
          {
            <MultipleSelectDropDownCommon
              selectGroup={TeacherListDataSuccess && multipleDropDownUserData}
              OnSelectedValue={OnSelectedValueCreatedBy}
              name={"Created By"}
              SwitchSelectData={false}
            />
          }
        </div>
        <div className="PTH-Item P-Right">
          <FilterSearch ToggleValue={ToggleValue} courseId={courseId} />
        </div>
        <div className="refreshHalf">
          <button type="button" onClick={handleRefresh} title="Refresh" className="refreshBtn">
            <img src={refresh} alt="" width="18px" />
          </button>
        </div>
        <div className="PTH-Item P-Right">
          <AppLink
            className="button button-primary btn-oval btn-sm button-block"
            to={`/create-admin-course/${classroomId}`}
          >
            <i className="ed-icon icon-plus-add white i-xs"></i>
            Create New Material
          </AppLink>
        </div>
      </div>
      <div className="gridListTable">
        <ul className="gridHeader">
          <li className="col col-3">Material Details</li>
          <li className="col col-3">Assign To</li>
          <li className="col col-4">Topics & Duration</li>
          <li className="col col-2">&nbsp;</li>
        </ul>
        <div className="gridBody">
          {ViewClassroomListSuccess && ToggleValue === "Courses" ? (
            ViewClassroomList.length > 0 ? (
              ViewClassroomList.map((item, key) => {
                return (
                  <div className="gridRow" key={item._id}>
                    <ul className="topInfo">
                      <li className="col col-3" data-head="Course Details">
                        <div className="text-xs primary w-600">
                          {item.courseTitle}
                        </div>
                        <div className="mt-3">
                          <span>Created By:&nbsp;</span>
                          {item.createdBy}
                        </div>
                      </li>
                      <li className="col col-3" data-head="Assign To">
                        <div className="teacherCourseList">
                          <div>
                            {item.assignTo &&
                              item.assignTo.length &&
                              item.assignTo[0].fullname}
                          </div>
                          {item.assignTo && item.assignTo.length > 0 && (
                            <button
                              type="button"
                              className="btnText white"
                              onClick={() => openModal(item._id)}
                            >
                              {item.assignTo.length}
                            </button>
                          )}
                          {item._id === modalItemId &&
                            modal &&
                            item.assignTo.length && (
                              <div className="teacherCourseListCustom">
                                <div className="teacherCourseListItem">
                                  {item.assignTo.map((item) => {
                                    return (
                                      <React.Fragment>
                                        <p
                                          className="text-2xs mb-3 w-600"
                                          ref={RemovePopToggleRef}
                                        >
                                          {item.fullname}
                                        </p>
                                      </React.Fragment>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                        </div>
                      </li>
                      <li className="col col-4" data-head="Topics & Duration">
                        <div className="">{item.topic}</div>
                        <div className="mt-3">
                          {`${item.durationYear ? item.durationYear : "-"
                            } Year`}{" "}
                          |{" "}
                          {`${item.durationMonth ? item.durationMonth : "-"
                            } Months`}
                        </div>
                        <div className="mt-3">
                          {item.startFrom ? (
                            <React.Fragment>
                              {moment(item.startFrom).format("Do MMMM YYYY")}
                            </React.Fragment>
                          ) : (
                            "-"
                          )}
                        </div>
                      </li>
                      <li className="col col-2 actionCols">
                        <div className="actionBtn">
                          <button
                            className="btn-square"
                            title="Assign"
                            onClick={() => handleNotify(item._id)}
                          >
                            <span className="cssIcon">
                              <i className="ed-assign"></i>
                            </span>
                          </button>
                          <button
                            className="btn-square"
                            title="Edit"
                            onClick={() => editCourse(item._id)}
                          >
                            <span className="cssIcon">
                              <i className="ed-pen"></i>
                            </span>
                          </button>
                          <button
                            className="btn-square"
                            title="Remove"
                            onClick={() => RemovePopState(item._id)}
                          >
                            <span className="cssIcon">
                              <i className="ed-trash"></i>
                            </span>
                          </button>
                        </div>
                        {item._id === deleteID && RemovePop && (
                          <Popup
                            show={RemovePop}
                            RemovePopToggleRef={RemovePopToggleRef}
                            CancelProp={() => setRemovePop(!RemovePop)}
                            RemoveProp={() => deleteAdminCourse(item._id)}
                            loading={ViewClassroomDeleteLoading}
                          >
                            <p className="gray text-xxs w-300">
                              You are about to delete Material.
                            </p>
                            <p className="dgray text-xxs w-400">Are you sure?</p>
                          </Popup>
                        )}
                      </li>
                    </ul>
                  </div>
                );
              })
            ) : (
              <div className="loadingGridData">No Material found.</div>
            )
          ) : (
            <div className="loadingGridData">
              <i className="ed-loadingGrid"></i>
            </div>
          )}
        </div>
      </div>
      <AssignToModal
        onclose={closeModalState}
        show={assignToModalState}
        courseId={assignToCourseId}
      />
    </React.Fragment>
  );
};
export default ViewClassroomCourses;
