/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useState, useRef, useEffect } from "react";
import { useDetectOutsideClick } from "../../../Common/DetectOutsideClick/useDetectOutsideClick";

import AppLink from "../../../Common/AppLink";
import InviteFacultyStatus from "./InviteFacultyStatus";
import GrayAuthTheme from "../../../Common/Theme/GrayAuthTheme";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getFacultyUserInfoData,
  deleteTeacherUserInfoData,
  getFacultySortingList,
  getNotLoggedData,
  getDataByCoursesClassroomsForTeacher,
  resetTeacherList,
  TeacherListFilterInfinityScroll,
  TeacherListSearchInfinityScroll,
  postExcelSheetColumns,
  resetExcelSheetColumns,
} from "../../../store/actions/studentlistuserinfo";
import Breadcrumb from "../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../Common/Breadcrumb/BreadcrumbItem";
import SingleSelectDropdown from "../../../Common/Form/SingleSelectDropdown";
import MultipleSelectDropDownCommon from "../../../Common/Form/MultiSelectDropDownCommon";
import DummyProfile from "../../../assets/images/img/DummyProfile.png";
import {
  DynamicCourseHeader,
} from "../../../Common/UserElement";
import moment from "moment";
import { DATETIME_FORMAT_AP } from "../../../Constant/constants";
import "./AdminDashboardTeacher.scss";
import SearchControl from "../../../Common/SearchControl";
import NoDataAvailable from "../../../Common/NoDataAvailable";
import { getAllClassroomSubjects } from "../../../store/actions/admincourse";
import { AllEntrySelected, AllEntrySelectedSwitch } from "../../../store/actions/MultiSelectDropDown";
import ExcelSheetCheckboxes from "../../../Common/DownloadExcelSheetCheckboxes";
import Pagination from "../../../Common/Pagination";
import UseOutsideClick from "../../../Common/UseOutsideClick";
import StaffList from ".";
import ImageViewer from "../../../Common/ImageViewer";

export default function DashboardFacultyList() {
  const success = false;
  let PageSize = 10;
  const history = useNavigate();
  const dropdownRef = useRef(null);
  const columnList = [
    {
      name: "Full Name",
      value: "fullname"
    }, {
      name: "Email",
      value: "email"
    }, {
      name: "Contact",
      value: "contact"
    }, {
      name: "Course Name",
      value: "coursename"
    },
    {
      name: "Gender",
      value: "gender"
    },
    {
      name: "Date of Birth",
      value: "dob"
    },
    {
      name: "Parent Contact",
      value: "parent_contact"
    },
    {
      name: "Parent Name",
      value: "parent_name"
    },

  ]

  const [currentPage, setCurrentPage] = useState(1);
  const [facultyId, setFacultyId] = useState("");
  const onClickBtnDropDownRemove = (_id, isActive) => {
    setFacultyId(_id);
    setIsActive(isActive);
  };
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const { users, faculty, facultySuccess, facultyScrollListLoading, TeacherListTotal, classroomSubjectsDetails, classroomSubjectSuccess, postExcelFileSuccess, excelFileLink } =
    useSelector((state) => {
      return {
        users: state.user,
        faculty: state.studentlistuserinfo.list.data,
        facultySuccess: state.studentlistuserinfo.list.success,
        facultyScrollListSuccess: state.studentlistuserinfo.teacherListScroll.success,
        facultyScrollListLoading: state.studentlistuserinfo.teacherListScroll.loading,
        TeacherListTotal: state.studentlistuserinfo.totalLength,
        classroomSubjectsDetails:
          state.admincourse.getAllClassroomSubjects.data,
        classroomSubjectSuccess:
          state.admincourse.getAllClassroomSubjects.success,
        excelFileLink: state.studentlistuserinfo.postExcelSheetColumn.data,
        postExcelFileSuccess: state.studentlistuserinfo.postExcelSheetColumn.success
      };
    });
  const dispatch = useDispatch();
  let limit = 10

  const [searchScrollEnable, setSearchScrollEnable] = useState(false);
  const [filterScrollEnable, setFilterScrollEnable] = useState(false);
  const [sortFilterScrollEnable, setScrollFilterSortEnable] = useState(false)
  useEffect(() => {
    setFilterScrollEnable(false);
    setSearchScrollEnable(false);
    setScrollFilterSortEnable(false)
    dispatch(
      getFacultyUserInfoData(
        users.user_institute,
        process.env.REACT_APP_TEACHER,
        "teacher", limit, skip
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, users]);

  const { user } = useSelector((state) => {
    return {
      user: state.user,
    };
  });

  const [searchTerm, setSearchTerm] = useState("");
  let typing;

  const handleChange = (event) => {
    event.preventDefault();
    setSkip(0)
    if (event.target.value === "") {
      setSearchScrollEnable(false);
      setFilterScrollEnable(false);
      setScrollFilterSortEnable(false)
      dispatch(
        getFacultyUserInfoData(
          users.user_institute,
          process.env.REACT_APP_TEACHER,
          "teacher", limit, skip
        )
      );
      setCurrentPage(1);
    } else {
      setSearchScrollEnable(true);
      setFilterScrollEnable(false)
      setScrollFilterSortEnable(false)
      clearTimeout(typing);
      typing = setTimeout(() => {
        setSearchTerm(event.target.value);
      }, 800);
      setCurrentPage(1);
    }

    if (!event.target.value) {
      setSkip(0)
      clearTimeout(typing);
      setSearchTerm("");
    }
  };

  const DeleteItem = (item) => {
    dispatch(deleteTeacherUserInfoData(item._id, user._id));
  };

  const selectGroup = [
    "Login Activity",
    "Recent to Old",
    "Old to Recent",
    // "Not Logged",
  ];

  const filterValues = ["Login Activity"];
  const [filterValue, setFilterValue] = useState("")
  const SingleSelectHandel = (value) => {
    const selectedValue = value;
    switch (selectedValue) {
      case "ALL": {
        setCurrentPage(1);
        setFilterScrollEnable(false);
        setScrollFilterSortEnable(false)
        setSearchScrollEnable(false);
        setSkip(0);
        setFilterValue("")
        dispatch(
          getFacultyUserInfoData(
            users.user_institute,
            process.env.REACT_APP_TEACHER,
            "teacher", limit, 0
          )
        );
        break;
      }
      case "Recent to Old": {

        setScrollFilterSortEnable(true)
        setCurrentPage(1);
        setFilterValue("rto")
        setFilterScrollEnable(false);
        setSearchScrollEnable(false);
        setSkip(0)
        dispatch(
          getFacultySortingList(
            users.user_institute,
            process.env.REACT_APP_TEACHER,
            "rto",
            "teacher", limit, 0
          )
        );
        break;
      }
      case "Old to Recent": {

        setScrollFilterSortEnable(true)
        setCurrentPage(1);
        setFilterScrollEnable(false);
        setSearchScrollEnable(false);
        setSkip(0)
        setFilterValue("otr")
        dispatch(
          getFacultySortingList(
            users.user_institute,
            process.env.REACT_APP_TEACHER,
            "otr",
            "teacher", limit, 0
          )
        );
        break;
      }
      case "Not Logged": {
        setCurrentPage(1);

        setScrollFilterSortEnable(true)
        setFilterScrollEnable(false);
        setSearchScrollEnable(false);
        setSkip(0);
        dispatch(
          getNotLoggedData(
            users.user_institute,
            process.env.REACT_APP_TEACHER,
            "teacher", limit, 0
          )
        );
        break;
      }

      default:
        setCurrentPage(1);
        setFilterScrollEnable(false);
        setSearchScrollEnable(false);
        setScrollFilterSortEnable(false)
        setSkip(0);
        setFilterValue("")
        dispatch(
          getFacultyUserInfoData(
            users.user_institute,
            process.env.REACT_APP_TEACHER,
            "teacher", limit, skip
          )
        );
    }
  };

  const [selectedClassroomsFilled, setSelectedClassroomsFilled] =
    useState(false);

  if (
    classroomSubjectSuccess &&
    !selectedClassroomsFilled &&
    classroomSubjectsDetails.length
  ) {
    setSelectedClassroomsFilled(true);
    let value = [];
    for (let i = 0; i < classroomSubjectsDetails.length; i++) {
      value.push(classroomSubjectsDetails[i]._id);
    }
    value.push("All");
    dispatch(AllEntrySelected(value));
    dispatch(AllEntrySelectedSwitch(value));
  }

  const getFilterList = (values) => {
    if (values.length) {
      setFilterScrollEnable(true)
      setSearchScrollEnable(false)
      setScrollFilterSortEnable(false)
      setCurrentPage(1);
      if (values.includes("All")) {
        let data = values;
        let indexData = data.indexOf("All");
        data.splice(indexData, 1);
        values = data
      }
      setFilterValue(values)
      dispatch(
        getDataByCoursesClassroomsForTeacher(
          user.user_institute,
          process.env.REACT_APP_TEACHER,
          values,
          "",
          "teacher",
          PageSize, (currentPage - 1) * PageSize
        )
      );
      setCurrentPage(1);
      setCurrentPage(1);
    } else {
      setCurrentPage(1);
      setFilterScrollEnable(false)
      setSearchScrollEnable(false)

      setScrollFilterSortEnable(false)
      setFilterValue([])
      dispatch(
        getFacultyUserInfoData(
          users.user_institute,
          process.env.REACT_APP_TEACHER,
          "teacher", PageSize, (currentPage - 1) * PageSize
        )
      );
      setCurrentPage(1);
    }
  };
  useEffect(() => {
    if (searchTerm && searchScrollEnable) {
      dispatch(
        TeacherListSearchInfinityScroll(
          users.user_institute,
          process.env.REACT_APP_TEACHER,
          "teacher",
          searchTerm, PageSize, (currentPage - 1) * PageSize
        )
      );
    } else if (filterScrollEnable) {
      dispatch(
        getDataByCoursesClassroomsForTeacher(
          user.user_institute,
          process.env.REACT_APP_TEACHER,
          filterValue,
          "",
          "teacher", PageSize, (currentPage - 1) * PageSize
        )
      );
    } else if (sortFilterScrollEnable) {
      dispatch(
        TeacherListFilterInfinityScroll(
          users.user_institute,
          process.env.REACT_APP_TEACHER,
          "teacher",
          filterValue, PageSize, (currentPage - 1) * PageSize
        )
      );
    } else {
      dispatch(
        getFacultyUserInfoData(
          users.user_institute,
          process.env.REACT_APP_TEACHER,
          "teacher", PageSize, (currentPage - 1) * PageSize
        )
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, filterValue, searchTerm, dispatch])
  const EditItem = (_id) => {
    history(`/edit-teacher/${_id}`);
  };
  const [excelModal, setExcelModal] = useState(false)
  const closeModal = () => {
    setExcelModal(false)
  }
  const downloadXLSX = () => {
    setExcelModal(true)
  };
  useEffect(() => {
    return () => {
      dispatch(resetTeacherList());
    };
  }, [dispatch]);
  const [skip, setSkip] = useState(0);
  const [selectedColumns, setSelectedColumns] = useState([])
  const handleCheckColumns = (values) => {
    setSelectedColumns(values)
  }
  const postExcelData = () => {
    return {
      "institute": user.user_institute,
      "role": user.user_activeRole,
      "kind": "teacher",
      "course": filterValue,
      "classroom": "",
      "invite": "",
      "status": filterValue,
      "search": searchTerm,
      "notAssigned": "",
      "limit": "",
      "skip": "",
      "usernamesearch": "",
      "action": "",
      "domainName": "",
      "fields": selectedColumns,
      "filename": "TeacherList"
    }
  }
  const [checkIsValid, setCheckIsValid] = useState(false)
  const downloadExcelFile = () => {
    setCheckIsValid(true)
    if (selectedColumns.length > 0) {
      dispatch(postExcelSheetColumns(postExcelData()))
    }
  }
  useEffect(() => {
    dispatch(getAllClassroomSubjects(user.user_institute));
  }, [dispatch, user.user_institute])
  const [modalItemId, setModalItemId] = useState("");
  const [modal, setModal] = useState(false);
  const openModal = (_id) => {
    setModal(!modal);
    setModalItemId(_id);
  };
  const courseModalRef = useRef()
  UseOutsideClick(courseModalRef, () => {
    if (modal) setModal(false);
  });
  useEffect(() => {
    if (postExcelFileSuccess) {
      window.location.href = excelFileLink.Location
      setExcelModal(false)

      setTimeout(() => {
        dispatch(resetExcelSheetColumns())
      }, 300);
    }
  }, [postExcelFileSuccess])
  return (
    <React.Fragment>
      <>
        {success ? (
          <InviteFacultyStatus />
        ) : (
          <React.Fragment>
            <div className="PageTopHead PTH-InviteFacultyList">
              <div className="PTH-Item">
                <p className="text-sm w-300">
                  {facultySuccess ? (
                    <React.Fragment>
                      <span className="primary">
                        {faculty.length > 0 ?
                          (TeacherListTotal <= 10 ? "" : TeacherListTotal - (currentPage * 10) < 0 ? `${TeacherListTotal}/` : `${currentPage * 10}/`)
                          : "0"}
                      </span>
                      <span className="primary">
                        {faculty.length > 0 ?
                          TeacherListTotal
                          : "0"}&nbsp;
                      </span>
                      Teachers
                    </React.Fragment>
                  ) : (
                    "   Teachers"
                  )}
                </p>

              </div>
              <div className="PTH-Item">
                <SingleSelectDropdown
                  SingleSelectHandel={SingleSelectHandel}
                  selectGroup={selectGroup}
                  filterValues={filterValues}
                />
              </div>
              <div className="PTH-Item">
                <MultipleSelectDropDownCommon
                  selectGroup={
                    classroomSubjectSuccess ? classroomSubjectsDetails : []
                  }
                  CourseSwitch={true}
                  OnSelectedValue={getFilterList}
                  name="Classrooms"
                />
              </div>
              <div className="PTH-Item P-Right">
                <SearchControl
                  classNameWrappper="tableSearchbar"
                  onChange={handleChange}
                  id="search"
                  name="search"
                  placeholder="Teacher Search"
                />
              </div>
              <div className="PTH-Item">
                <AppLink
                  className="button button-primary btn-oval btn-sm button-block"
                  to="/invite-faculty"
                >
                  <i className="ed-icon icon-plus-add white i-xs"></i>
                  Invite Staff
                </AppLink>
              </div>
            </div>
            <div className="gridListTable">
              <ul className="gridHeader">
                <li className="col col-4">Faculty Details</li>
                <li className="col col-3">
                  Assigned&nbsp;
                  <DynamicCourseHeader />
                </li>
                <li className="col col-3">Last Sign In</li>
                <li className="col col-2">&nbsp;</li>
              </ul>
              <div className="gridBody"
              >
                {facultySuccess ? (
                  faculty.length > 0 ? (
                    faculty.map((item) => {
                      return (
                        <div className="gridRow" key={item._id}>
                          <ul className="topInfo">
                            <li
                              className="col col-4"
                              data-head="Faculty Details"
                            >
                              <div className="userDetails">
                                <div className="profileCircle">
                                  <a
                                    href={`/profile/${item.userData.username}`}
                                    rel="noreferrer"
                                    target="_blank"
                                  >
                                    <ImageViewer
                                      object={item.userData.profile_picture}
                                      defaultImage={DummyProfile}
                                    />
                                  </a>
                                </div>
                                <div className="profileDetails">
                                  <div className="profile-name">
                                    <a
                                      href={`profile/${item.userData.username}`}
                                      rel="noreferrer"
                                      target="_blank"
                                    >
                                      {item.userData.fullname}
                                    </a>
                                  </div>
                                  <div className="profile-email">
                                    {item.userData.email}
                                  </div>
                                  <div className="profile-contact">
                                    {item.userData.country_code}
                                    {!item.userData.country_code
                                      ? ""
                                      : "-"}
                                    {item.userData.contact}
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li className="col col-3" data-head="Assign To">
                              <div className="teacherList">
                                <div>
                                  {item.classRoomList &&
                                    item.classRoomList.length === 1 ?
                                    item.classRoomList[0].coursename : item.classRoomList && item.classRoomList.length > 1 ? "" : "Not Assigned"}
                                </div>&nbsp;&nbsp;
                                {item.classRoomList && item.classRoomList.length > 1 && (
                                  <button
                                    type="button"
                                    className="btn_badge_tech white"
                                    onClick={() => openModal(item._id)}
                                  >
                                    {item.classRoomList.length}
                                  </button>
                                )}
                                {item._id === modalItemId &&
                                  modal &&
                                  item.classRoomList.length && (
                                    <div className="teacherListCustom" ref={courseModalRef}>
                                      <div className="teacherItem">
                                        {item.classRoomList.map((item) => {
                                          return (
                                            <React.Fragment>
                                              <p
                                                className="text-2xs mb-3 w-600"
                                              >
                                                {item.coursename}
                                              </p>
                                            </React.Fragment>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  )}
                              </div>
                            </li>
                            <li
                              className="col col-3"
                              data-head="Last Sign in"
                            >
                              {item.userData.lastLoginDate &&
                                item.userData.lastLoginDate ? (
                                <React.Fragment>
                                  {moment(
                                    item.userData.lastLoginDate
                                  ).format(DATETIME_FORMAT_AP)}
                                </React.Fragment>
                              ) : (
                                "Not Logged"
                              )}
                            </li>
                            <li className="col col-2 actionCols">
                              <div className="actionBtn">
                                <button
                                  className="btn-square"
                                  title="Edit"
                                  onClick={() => EditItem(item.userData._id)}
                                >
                                  <span className="cssIcon">
                                    <i className="ed-pen"></i>
                                  </span>
                                </button>
                                <button
                                  className="btn-square"
                                  title="Remove"
                                  onClick={() =>
                                    onClickBtnDropDownRemove(item._id, true)
                                  }
                                >
                                  <span className="cssIcon">
                                    <i className="ed-trash"></i>
                                  </span>
                                </button>
                              </div>

                              {item._id === facultyId && (
                                <div
                                  ref={dropdownRef}
                                  className={`popup removePopup ${isActive ? "active" : "inactive"
                                    }`}
                                >
                                  <h5 className="heading base  text-xs w-600">
                                    You are about to remove this Teacher.
                                  </h5>
                                  <p className="sub-heading red  text-xxs w-400">
                                    Are you sure?
                                  </p>
                                  <div className="removePopBtn">
                                    <button
                                      className="button btn-o-silver dgray btn-sm"
                                      onClick={() =>
                                        onClickBtnDropDownRemove(
                                          item._id,
                                          false
                                        )
                                      }
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      className="button button-red btn-sm"
                                      onClick={() => {
                                        DeleteItem(item);
                                        onClickBtnDropDownRemove(
                                          item.userData._id,
                                          false
                                        );
                                      }}
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              )}
                            </li>
                          </ul>
                        </div>
                      );
                    })
                  ) : (
                    <tr>
                      <NoDataAvailable title="No Records Found." />
                    </tr>
                  )
                ) : (
                  <div className="loadingGridData">
                    <i className="ed-loadingGrid"></i>
                  </div>
                )}
                {
                  facultyScrollListLoading &&
                  < div className="onscroll_loader">
                    <i className="ed-spinner"></i>
                  </div>
                }
              </div>
            </div>

            {facultySuccess && (
              <React.Fragment>
                {faculty.length > 0 && (
                  <div className="TableBottomBtn justify-start mt-20">
                    <div>
                      <button
                        className="button btn-o-primary primary btn-sm"
                        onClick={downloadXLSX}
                        title="Download"
                      >
                        <span className="cssIcon">
                          <i className="ed-download"></i>
                        </span>
                      </button>

                    </div>
                    <Pagination
                      className="pagination-bar"
                      currentPage={currentPage}
                      totalCount={TeacherListTotal}
                      pageSize={PageSize}
                      onPageChange={page => setCurrentPage(page)}
                    />
                  </div>
                )}
              </React.Fragment>
            )}
            {
              excelModal && <ExcelSheetCheckboxes show={excelModal} onClose={closeModal} columnList={columnList} OnSelectedValue={handleCheckColumns} isValidCheck={checkIsValid} saveDownload={downloadExcelFile} />
            }
          </React.Fragment>
        )}
      </>
    </React.Fragment>
  );

}
