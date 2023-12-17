import React, { useEffect, useRef, useState } from "react";
import SingleSelectDropdown from "../../../../../../Common/Form/SingleSelectDropdown";
// import FilterSearch from "./FilterSearch";
import { useDispatch, useSelector } from "react-redux";
// import Popup from "../../../../Common/Popup";
import UseOutsideClick from "../../../../../..//Common/UseOutsideClick";
import {
  getClassroomViewList,
  deleteClassroomViewItem,
  SortTeacherClassroom,
} from "../../../../../../store/actions/classroomdetail";
import { useParams } from "react-router-dom";
// import AddTeacher from "./AddTeacher";
import moment from "moment";
import { DATETIME_FORMAT_AP } from "../../../../../../Constant/constants";
import TeacherClassroomStudentFilterSearch from "./TeacherClassroomStudentFilterSearch";
import Storage from "../../../../../../Classes/Storage";
import AddTeacher from "../../../../../AdminDashboard/Courses/ViewClassroom/AddTeacher";
import NoDataAvailable from "../../../../../../Common/NoDataAvailable";
import DummyProfile from "../../DummyProfile.png";
import Popup from "../../../../../../Common/Popup";

const TeacherViewStudentsTab = () => {
  const ToggleValue = "Students";
  const dispatch = useDispatch();
  const { classroomId, subjectId } = useParams();
  const RemovePopToggleRef = useRef();

  UseOutsideClick(RemovePopToggleRef, () => {
    if (RemovePop) setRemovePop(false);
  });
  useEffect(() => {
    Storage.setJson("__wz_crse__", subjectId);
  }, [subjectId]);
  const {
    users,
    ViewClassroomList,
    ViewClassroomListSuccess,
    ViewClassroomDeleteLoading,
    ViewClassroomDeleteSuccess,
  } = useSelector((state) => {
    return {
      users: state.user,
      ViewClassroomList: state.classroomDetail.Studentlist.data,
      ViewClassroomListSuccess: state.classroomDetail.Studentlist.success,
      ViewClassroomListLoading: state.classroomDetail.Studentlist.loading,
      ViewClassroomDeleteLoading: state.classroomDetail.delete.loading,
      ViewClassroomDeleteSuccess: state.classroomDetail.delete.success,
    };
  });

  // const [listGetLoading, setListGetLoading] = useState(false)
  // useEffect(() => {
  //   if (ViewClassroomListLoading) {
  //     setListGetLoading(true);
  //   } else if (!listGetLoading) {
  //     dispatch(
  //       getClassroomViewList(users.user_institute, subjectId, ToggleValue)
  //     );
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [subjectId, users._id, users.user_institute, listGetLoading]);

  // useEffect(() => {
  //   if (!ViewClassroomListLoading && listGetLoading) {
  //     setListGetLoading(false)
  //   }
  // }, [ViewClassroomListLoading, listGetLoading])
  useEffect(() => {
    dispatch(
      getClassroomViewList(
        users.user_institute,
        subjectId,
        ToggleValue,
        classroomId
      )
    );
  }, [subjectId, dispatch, users._id, users.user_institute, classroomId]);

  const [RemovePop, setRemovePop] = useState(false);
  const [showAddTeacherModal, setShowAddTeacherModal] = useState(false);
  const [deleteID, setDeleteID] = useState("");

  const RemovePopState = (_id) => {
    setRemovePop(!RemovePop);
    setDeleteID(_id);
  };

  const DeleteInvitation = (_id) => {
    dispatch(deleteClassroomViewItem(_id, ToggleValue));
  };

  const CloseAddTeacherModal = () => {
    setShowAddTeacherModal(false);
  };

  const OpenAddTeacherModal = () => {
    setShowAddTeacherModal(true);
  };

  useEffect(() => {
    !ViewClassroomDeleteLoading &&
      ViewClassroomDeleteSuccess &&
      setRemovePop(false);
  }, [ViewClassroomDeleteLoading, ViewClassroomDeleteSuccess]);

  const selectGroup = [
    "Signed In",
    "Recent to Old",
    "Old to Recent",
    "Not Logged",
    "By Name",
    "A to Z",
    "Z to A",
  ];

  const filterValues = ["Signed In", "By Name"];

  const SingleSelectHandel = (item) => {
    let message = item;
    switch (message) {
      case "All":
        dispatch(
          getClassroomViewList(
            users.user_institute,
            subjectId,
            ToggleValue,
            classroomId
          )
        );

        break;

      case "Recent to Old":
        dispatch(
          SortTeacherClassroom(
            users.user_institute,
            subjectId,
            "signin",
            "rto",
            "student",
            classroomId
          )
        );

        break;

      case "Old to Recent":
        dispatch(
          SortTeacherClassroom(
            users.user_institute,
            subjectId,
            "signin",
            "otr",
            "student",
            classroomId
          )
        );
        break;

      case "A to Z":
        dispatch(
          SortTeacherClassroom(
            users.user_institute,
            subjectId,
            "name",
            "atz",
            "student",
            classroomId
          )
        );
        break;

      case "Z to A":
        dispatch(
          SortTeacherClassroom(
            users.user_institute,
            subjectId,
            "name",
            "zta",
            "student",
            classroomId
          )
        );
        break;

      case "Not Logged":
        dispatch(
          SortTeacherClassroom(
            users.user_institute,
            subjectId,
            "logged",
            "not",
            "student",
            classroomId
          )
        );
        break;

      default:
        dispatch(
          getClassroomViewList(
            users.user_institute,
            subjectId,
            ToggleValue,
            classroomId
          )
        );
    }
  };
  return (
    <React.Fragment>
      <div className="PageTopHead PTH-StudentViewClassroom mt-20">
        <div className="PTH-Item">
          <SingleSelectDropdown
            selectGroup={selectGroup}
            filterValues={filterValues}
            SingleSelectHandel={(item) => SingleSelectHandel(item)}
          />
        </div>
        {/* <div className="PTH-Item"><MultipleGroupSelectDropdown /></div>
        <div className="PTH-Item"><MultipleGroupSelectDropdown /></div> */}
        <div className="PTH-Item P-Right">
          <TeacherClassroomStudentFilterSearch toggle={ToggleValue} />
        </div>
        <div className="PTH-Item">
          <button
            className="button button-secondary btn-oval btn-sm button-block"
            onClick={() => OpenAddTeacherModal()}
          >
            <i className="ed-icon icon-plus-add white i-xs"></i>
            Add Student
          </button>
        </div>
      </div>
      <div className="gridListTable">
        <ul className="gridHeader">
          <li className="col col-6">Name & Email</li>
          <li className="col col-3">Contact</li>
          <li className="col col-3">Last Sign in</li>
          <li className="col col-3"></li>
        </ul>
        <div className="gridBody">
          {ViewClassroomListSuccess && ToggleValue === "Students" ? (
            ViewClassroomList.length > 0 ? (
              ViewClassroomList.map((item) => {
                return (
                  <div className="gridRow" key={item._id}>
                    <ul className="topInfo">
                      <li className="col col-6" data-head="Name & Email">
                        <div className="userDetails">
                          <div className="profileCircle">
                            <a
                              href={`/profile/${item.user.username}`}
                              rel="noreferrer"
                              target="_blank"
                            >
                              <img
                                src={
                                  item.user.profile_picture === undefined ||
                                    item.user.profile_picture === null ||
                                    item.user.profile_picture === ""
                                    ? DummyProfile
                                    : item.user.profile_picture
                                }
                                alt="user profile"
                              />
                            </a>
                          </div>
                          <div className="profileDetails">
                            <div className="profile-name">
                              <a
                                className="text-xs secondary"
                                href={`/profile/${item.user.username}`}
                                rel="noreferrer"
                                target="_blank"
                              >
                                {item.user.fullname}
                              </a>
                              {/* <p className="text-xs primary">{item.user_fullname}</p> */}
                            </div>
                            <div className="profile-email">
                              <p className="mt-3">{item.user.email}</p>
                            </div>
                            <div className="admission-no">
                              <span>ADM No. {item.user.admission_no}</span>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="col col-3" data-head="Contact">
                        {item.user.contact}
                      </li>
                      <li className="col col-3" data-head="Last Sign in">
                        {item.user.password_change &&
                          item.user.lastLoginDate ? (
                          <React.Fragment>
                            {moment(item.user.lastLoginDate).format(
                              DATETIME_FORMAT_AP
                            )}
                          </React.Fragment>
                        ) : (
                          "Not Logged"
                        )}
                      </li>
                      <li className="col col-2 actionCols">
                        <div className="actionBtn">
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
                            RemoveProp={() => DeleteInvitation(item._id)}
                            loading={ViewClassroomDeleteLoading}
                          >
                            <p className="gray text-xxs w-300">
                              You are about to delete student.
                            </p>
                            <p className="dgray text-xxs w-400">Are you sure?</p>
                          </Popup>
                        )}
                      </li>
                      {/* <li>
                        <div className="actionBtnCustom">
                          <div className="groupBtn">
                            <button onClick={() => RemovePopState(item._id)}>
                              Remove
                            </button>
                          </div>
                          {item._id === deleteID && RemovePop && (
                            <Popup
                              show={RemovePop}
                              RemovePopToggleRef={RemovePopToggleRef}
                              CancelProp={() => setRemovePop(!RemovePop)}
                              RemoveProp={() => DeleteInvitation(item._id)}
                              loading={ViewClassroomDeleteLoading}
                            >
                              <p className="gray text-xxs w-300">
                                You are about to remove Student.
                              </p>
                              <p className="dgray text-xxs w-400">
                                Are you sure?
                              </p>
                            </Popup>
                          )}
                        </div>
                      </li> */}
                    </ul>
                  </div>
                );
              })
            ) : (
              <NoDataAvailable title="No Records Found." />
            )
          ) : (
            <div className="loadingGridData">
              <i className="ed-loadingGrid"></i>
            </div>
          )}
        </div>
      </div>
      {showAddTeacherModal && (
        <AddTeacher
          CloseAddTeacherModal={() => CloseAddTeacherModal()}
          ToggleValue={ToggleValue}
          modalOpen={showAddTeacherModal}
          teacherClassroom={true}
        />
      )}
    </React.Fragment>
  );
};

export default TeacherViewStudentsTab;
