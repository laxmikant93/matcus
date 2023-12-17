/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useState, useRef, useEffect } from "react";
import { useDetectOutsideClick } from "../../../Common/DetectOutsideClick/useDetectOutsideClick";
import GrayAuthTheme from "../../../Common/Theme/GrayAuthTheme";
import AppLink from "../../../Common/AppLink";
import InviteStudentStatus from "./InviteStudentStatus";
import SingleSelectDropdown from "../../../Common/Form/SingleSelectDropdown";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteStudentUserInfoData,
  getAllCoursesForStudentFilter,
  getStudentNotLoggedData,
  getStudentSortByCourse,
  getStudentSortingList,
  getStudentUserInfoData,
  postExcelSheetColumns,
  resetExcelSheetColumns,
  resetStudentList,
  searchStudentUserInfoData,
  studentListSearchInfinityScroll,
} from "../../../store/actions/studentlistuserinfo";
import { successInviteStudentReset } from "../../../store/actions/student";
import Breadcrumb from "../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../Common/Breadcrumb/BreadcrumbItem";
import DummyProfile from "../../../assets/images/img/DummyProfile.png";
import {
  DynamicCourseHeader,
} from "../../../Common/UserElement";
import moment from "moment";
import { DATETIME_FORMAT_AP } from "../../../Constant/constants";
import "./AdminDashboardStudent.scss";
import SearchControl from "../../../Common/SearchControl";
import NoDataAvailable from "../../../Common/NoDataAvailable";
import { getAllClassroomSubjects } from "../../../store/actions/admincourse";
import MultipleSelectDropDownCommon from "../../../Common/Form/MultiSelectDropDownCommon";
import { AllEntrySelected, AllEntrySelectedSwitch } from "../../../store/actions/MultiSelectDropDown";
import Pagination from "../../../Common/Pagination";
import ExcelSheetCheckboxes from "../../../Common/DownloadExcelSheetCheckboxes";
import UseOutsideClick from "../../../Common/UseOutsideClick";
import ImageViewer from "../../../Common/ImageViewer";

export default function InviteStudentList() {
  let PageSize = 10;
  const [studentId, setStudentId] = useState("");
  const onClickBtnDropDownRemove = (_id, isActive) => {
    setStudentId(_id);
    setIsActive(isActive);
  };
  const success = false;
  const history = useNavigate();
  const dropdownRef = useRef(null);

  let limit = 10;
  const columnList = [
    {
      name: "Full Name",
      value: "fullname"
    }, {
      name: "Email",
      value: "email"
    },
    {
      name: "Admission No.",
      value: "admission_no"
    },
    {
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
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const { users, student, StudentListScrollSuccess, StudentListTotal, studentSuccess, classroomSubjectsDetails, classroomSubjectSuccess, postExcelFileSuccess, excelFileLink } = useSelector((state) => {
    return {
      users: state.user,
      student: state.studentlistuserinfo.studentdatainfo.data,
      StudentListScrollSuccess: state.studentlistuserinfo.studentListScroll.success,
      StudentListTotal: state.studentlistuserinfo.totalLength,
      studentSuccess: state.studentlistuserinfo.studentdatainfo.success,
      classroomSubjectsDetails:
        state.admincourse.getAllClassroomSubjects.data,
      classroomSubjectSuccess:
        state.admincourse.getAllClassroomSubjects.success,
      excelFileLink: state.studentlistuserinfo.postExcelSheetColumn.data,
      postExcelFileSuccess: state.studentlistuserinfo.postExcelSheetColumn.success
    }
  });

  useEffect(() => {
    setFilterScrollEnable(false);
    setSearchScrollEnable(false);
    setNormalListScrollEnable(true);
    dispatch(
      getStudentUserInfoData(
        users.user_institute,
        process.env.REACT_APP_STUDENT,
        "student", limit, skip
      )
    );
    dispatch(successInviteStudentReset());
  }, [dispatch, users]);

  const [searchTerm, setSearchTerm] = useState("");

  let typing;

  const handleChangeSearch = (event) => {
    event.preventDefault();
    setSkip(0)
    if (event.target.value === "") {
      setCurrentPage(1);
      setSearchScrollEnable(false);
      setNormalListScrollEnable(true);
      setFilterScrollEnable(false)
      dispatch(
        getStudentUserInfoData(
          users.user_institute,
          process.env.REACT_APP_STUDENT,
          "student", limit, skip
        )
      );
    } else {
      setCurrentPage(1);
      clearTimeout(typing);
      setSearchScrollEnable(true);
      setNormalListScrollEnable(false);
      setFilterScrollEnable(false)
      typing = setTimeout(() => {
        setSearchScrollEnable(true);
        setSearchTerm(event.target.value);
      }, 800);
    }
    if (!event.target.value) {
      setSkip(0)
      clearTimeout(typing);
      setSearchTerm("");
    }
  };

  useEffect(() => {
    if (searchScrollEnable) {
      dispatch(
        searchStudentUserInfoData(
          users.user_institute,
          process.env.REACT_APP_STUDENT,
          "student",
          searchTerm, limit, 0
        )
      );
    }

  }, [searchTerm]);

  const selectGroup = [
    "Login Activity",
    "Recent to Old",
    "Old to Recent",
    // "Not Logged",
  ];
  const [filterValue, setFilterValue] = useState("")
  const filterValues = ["Login Activity"];
  //
  const SingleSelectHandel = (value) => {
    const selectedValue = value;
    switch (selectedValue) {
      case "ALL": {
        setCurrentPage(1);
        setFilterValue("")
        setFilterScrollEnable(false);
        setNormalListScrollEnable(true);
        setSearchScrollEnable(false);
        setSkip(0)
        dispatch(
          getStudentUserInfoData(
            users.user_institute,
            process.env.REACT_APP_STUDENT,
            "student", limit, 0
          )
        );
        break;
      }
      case "Recent to Old": {
        setCurrentPage(1);
        setFilterValue("rto")
        setFilterScrollEnable(true);
        setSearchScrollEnable(false);
        setNormalListScrollEnable(false);
        setSkip(0)
        dispatch(
          getStudentSortingList(
            users.user_institute,
            process.env.REACT_APP_STUDENT,
            "rto",
            "student", limit, 0
          )
        );
        break;
      }
      case "Old to Recent": {
        setCurrentPage(1);
        setFilterValue("otr")
        setFilterScrollEnable(true);
        setSearchScrollEnable(false);
        setNormalListScrollEnable(false);
        setSkip(0)
        dispatch(
          getStudentSortingList(
            users.user_institute,
            process.env.REACT_APP_STUDENT,
            "otr",
            "student", limit, 0
          )
        );
        break;
      }
      case "Not Logged": {
        setCurrentPage(1);
        setFilterScrollEnable(false);
        setSearchScrollEnable(false);
        setNormalListScrollEnable(false);
        setSkip(0)
        dispatch(
          getStudentNotLoggedData(
            users.user_institute,
            process.env.REACT_APP_STUDENT,
            "student", limit, 0
          )
        );
        break;
      }
      default:
    }
  };

  const EditItem = (value) => {
    history(`/edit-student/${value}`);
  };

  const DeleteItem = (item) => {
    dispatch(deleteStudentUserInfoData(item._id));
  };
  const [excelModal, setExcelModal] = useState(false)
  const downloadXLSX = () => {
    setExcelModal(true)
  };
  const closeModal = () => {
    setExcelModal(false)
  }
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
      setCurrentPage(1);
      setFilterScrollEnable(true)
      if (values.includes("All")) {
        let data = values;
        let indexData = data.indexOf("All");
        data.splice(indexData, 1);
        values = data
      }
      setFilterValue(values)
      setFilterValue(values)
      dispatch(
        getStudentSortByCourse(
          users.user_institute,
          process.env.REACT_APP_STUDENT,
          values,
          "",
          "student",
          PageSize, (currentPage - 1) * PageSize
        )
      );
    } else {
      setCurrentPage(1);
      setFilterScrollEnable(false)
      setSearchScrollEnable(false)
      dispatch(
        getStudentUserInfoData(
          users.user_institute,
          process.env.REACT_APP_STUDENT,
          "student", limit, skip
        )
      );
    }
  };

  useEffect(() => {
    dispatch(getAllCoursesForStudentFilter(users.user_institute));
  }, [dispatch, users.user_institute]);


  useEffect(() => {
    return () => {
      dispatch(resetStudentList());
    };
  }, [dispatch]);



  useEffect(() => {
    if (StudentListScrollSuccess) {
      setScrollLoading(false);
    }
  }, [StudentListScrollSuccess]);

  const [skip, setSkip] = useState(0);
  const [scrollLoading, setScrollLoading] = useState(false);
  const [searchScrollEnable, setSearchScrollEnable] = useState(false);
  const [filterScrollEnable, setFilterScrollEnable] = useState(false);
  const [NormalListScrollEnable, setNormalListScrollEnable] = useState(false);

  useEffect(() => {
    if (searchScrollEnable) {
      dispatch(studentListSearchInfinityScroll(
        users.user_institute,
        process.env.REACT_APP_STUDENT,
        "student",
        searchTerm, PageSize, (currentPage - 1) * PageSize
      )
      )
    } else if (filterScrollEnable) {
      dispatch(
        getStudentSortingList(
          users.user_institute,
          process.env.REACT_APP_STUDENT,
          filterValue,
          "student", PageSize, (currentPage - 1) * PageSize
        )
      );
    } else {
      dispatch(
        getStudentUserInfoData(
          users.user_institute,
          process.env.REACT_APP_STUDENT,
          "student", PageSize, (currentPage - 1) * PageSize
        )
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchTerm, dispatch])

  const [selectedColumns, setSelectedColumns] = useState([])
  const downloadExcelFile = (values) => {
    setSelectedColumns(values)
  }
  const postExcelData = () => {
    return {
      "institute": users.user_institute,
      "role": process.env.REACT_APP_STUDENT,
      "kind": "student",
      "course": filterValue,
      "invite": filterValue,
      "status": filterValue,
      "search": searchTerm,
      "notAssigned": filterValue,
      "fields": selectedColumns,
      "filename": "StudentList"
    }
  }
  const [checkIsValid, setCheckIsValid] = useState(false)
  const handleSave = () => {
    setCheckIsValid(true)
    if (selectedColumns.length > 0) {
      dispatch(postExcelSheetColumns(postExcelData()))
    }
  }
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
    dispatch(getAllClassroomSubjects(users.user_institute));
  }, [dispatch, users.user_institute])
  useEffect(() => {
    if (postExcelFileSuccess) {
      window.location.href = excelFileLink.Location
      setTimeout(() => {
        dispatch(resetExcelSheetColumns())
      }, 300);
      setExcelModal(false)
    }
  }, [postExcelFileSuccess]);

  return (
    <React.Fragment>
      <React.Fragment>
        {success ? (
          <InviteStudentStatus />
        ) : (
          <React.Fragment>
            <Breadcrumb>
              <BreadcrumbItem to="/" title="Dashboard" />
              <BreadcrumbItem to="/invite-student-list" title="Students" />
            </Breadcrumb>
            <div className="PageTopHead PTH-InviteStudentList mt-20">
              <div className="PTH-Item">
                {studentSuccess ? (
                  <p className="text-sm w-300">
                    <span className="primary">{StudentListTotal <= 10 ? "" : StudentListTotal - (currentPage * 10) < 0 ? `${StudentListTotal}/` : `${currentPage * 10}/`}
                      {StudentListTotal}</span> Students
                  </p>
                ) : (
                  <p className="text-sm w-300">
                    <span className="primary">--</span> Students
                  </p>
                )}
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
                  id="search"
                  name="search"
                  onChange={handleChangeSearch}
                  placeholder="Student Search"
                />
              </div>
              <div className="PTH-Item">
                <AppLink
                  to="/invite-students"
                  className="button button-primary btn-oval btn-sm button-block"
                >
                  <i className="ed-icon icon-plus-add white i-xs"></i> Invite
                  Students
                </AppLink>
              </div>
            </div>

            <div className="gridListTable">
              <ul className="gridHeader">
                <li className="col col-4">Student Details</li>
                <li className="col col-3">
                  No. of <DynamicCourseHeader />
                </li>
                <li className="col col-2">Last Sign In</li>
                <li className="col col-3">&nbsp;</li>
              </ul>
              <div className="gridBody"
              >
                {studentSuccess ? (
                  <>
                    {student.length ? (
                      student.map((item) => {
                        return (
                          <div className="gridRow" key={item._id}>
                            <ul className="topInfo">
                              <li className="col col-4">
                                <div className="userDetails">
                                  <div className="profileCircle">
                                    <a
                                      href={`/profile/${item.userData && item.userData.username}`}
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
                                        href={`/profile/${item.userData && item.userData.username}`}
                                        rel="noreferrer"
                                        target="_blank"
                                      >
                                        {item.userData && item.userData.fullname}
                                      </a>
                                    </div>
                                    <div className="profile-email">
                                      {item.userData && item.userData.email}
                                    </div>
                                    <div className="profile-contact">
                                      {item.userData && item.userData.country_code}
                                      {item.userData && !item.userData.country_code ? "" : "-"}
                                      {item.userData && item.userData.contact}
                                    </div>
                                    <div className="admission-no">
                                      <span>ADM No. {item.admission_no}</span>
                                    </div>
                                  </div>
                                </div>
                              </li>



                              <li className="col col-3" data-head="Assign To">
                                <div className="StudentList">
                                  {<div>
                                    {item.classRoomList &&
                                      item.classRoomList.length === 1 ?
                                      item.classRoomList[0].coursename : item.classRoomList.length > 1 ? "" : "Not Assigned"}
                                  </div>}&nbsp;&nbsp;
                                  {item.classRoomList && item.classRoomList.length > 1 && (
                                    <button
                                      type="button"
                                      className="btn_badge white"
                                      onClick={() => openModal(item._id)}
                                    >
                                      {item.classRoomList.length}
                                    </button>
                                  )}
                                  {item._id === modalItemId &&
                                    modal &&
                                    item.classRoomList.length && (
                                      <div className="studentListCustom" ref={courseModalRef}>
                                        <div className="studentListItem">
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
                                className="col col-2 time-Display"
                                data-head="Last Sign In"
                              >
                                {item.userData && item.userData.lastLoginDate ? (
                                  <React.Fragment>
                                    <span>
                                      {item.userData && moment(
                                        item.userData.lastLoginDate
                                      ).format(DATETIME_FORMAT_AP)}
                                    </span>

                                  </React.Fragment>
                                ) : (
                                  <span>Not Logged</span>
                                )}
                              </li>
                              <li className="col col-3 actionCols">
                                <div className="actionBtn">
                                  <button
                                    className="btn-square"
                                    title="Edit Student"
                                    onClick={() => EditItem(item.userData && item.userData._id)}
                                  >
                                    <span className="cssIcon">
                                      <i className="ed-pen"></i>
                                    </span>
                                  </button>
                                  <button
                                    className="btn-square delete"
                                    title="Delete Student"
                                    onClick={() =>
                                      onClickBtnDropDownRemove(item._id, true)
                                    }
                                  >
                                    <span className="cssIcon">
                                      <i className="ed-trash"></i>
                                    </span>
                                  </button>
                                </div>
                                {item._id === studentId && (
                                  <div
                                    ref={dropdownRef}
                                    className={`popup removePopup ${isActive ? "active" : "inactive"
                                      }`}
                                  >
                                    <h5 className="heading base text-xs w-600">
                                      You are about to remove this Student.
                                    </h5>
                                    <p className="sub-heading red text-xxs w-400">
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
                                            item.userData && item.userData._id,
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
                      <NoDataAvailable title="No records found." />
                    )}
                  </>
                ) : (
                  <div className="loadingGridData"><i className="ed-loadingGrid"></i></div>
                )}
              </div>
            </div>

            {studentSuccess && (
              <React.Fragment>
                {student.length > 0 && (
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
                      totalCount={StudentListTotal}
                      pageSize={PageSize}
                      onPageChange={page => setCurrentPage(page)}
                    />

                  </div>
                )}
              </React.Fragment>
            )}
            {
              excelModal && <ExcelSheetCheckboxes show={excelModal} onClose={closeModal} columnList={columnList} OnSelectedValue={downloadExcelFile} saveDownload={handleSave} isValidCheck={checkIsValid} />
            }
          </React.Fragment>
        )}
      </React.Fragment>
    </React.Fragment>
  );


}
