import React, { useEffect, useRef, useState } from "react";
import SingleSelectDropdown from "../../../../Common/Form/SingleSelectDropdown";
import FilterSearch from "./FilterSearch";
import { useDispatch, useSelector } from "react-redux";
import Popup from "../../../../Common/Popup";
import UseOutsideClick from "../../../../Common/UseOutsideClick";
import {
  getClassroomViewList,
  deleteClassroomViewItem,
  SortTeacherClassroom,
} from "../../../../store/actions/classroomdetail";
import { useParams } from "react-router-dom";
import AddTeacher from "./AddTeacher";
import moment from "moment";
import { DATETIME_FORMAT_AP } from "../../../../Constant/constants";
import DummyProfile from "../../../Dashboard/TeacherDashboard/TeacherClassrooms/DummyProfile.png";
import NoDataAvailable from "../../../../Common/NoDataAvailable";
import Storage from "../../../../Classes/Storage";
import { courseID } from "../../../../Constant/auth";
import ImageViewer from "../../../../Common/ImageViewer";
const ViewClassroomTeachers = () => {
  const ToggleValue = "Teachers";
  const dispatch = useDispatch();
  const { classroomId } = useParams();
  const RemovePopToggleRef = useRef();

  UseOutsideClick(RemovePopToggleRef, () => {
    if (RemovePop) setRemovePop(false);
  });

  const {
    users,
    ViewClassroomList,
    ViewClassroomListSuccess,
    ViewClassroomDeleteLoading,
    ViewClassroomDeleteSuccess,
  } = useSelector((state) => {
    return {
      users: state.user,
      ViewClassroomList: state.classroomDetail.Teacherlist.data,
      ViewClassroomListSuccess: state.classroomDetail.Teacherlist.success,
      ViewClassroomListLoading: state.classroomDetail.Teacherlist.loading,
      ViewClassroomDeleteLoading: state.classroomDetail.delete.loading,
      ViewClassroomDeleteSuccess: state.classroomDetail.delete.success,
    };
  });

  useEffect(() => {
    dispatch(
      getClassroomViewList(
        users.user_institute,
        classroomId,
        ToggleValue,
        Storage.getJson(courseID),
        "teacher"
      )
    );
  }, [classroomId, dispatch, users._id, users.user_institute]);

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
            classroomId,
            ToggleValue,
            Storage.getJson(courseID)
          )
        );

        break;

      case "Recent to Old":
        dispatch(
          SortTeacherClassroom(
            users.user_institute,
            classroomId,
            "signin",
            "rto",
            "teacher",
            Storage.getJson(courseID)
          )
        );

        break;

      case "Old to Recent":
        dispatch(
          SortTeacherClassroom(
            users.user_institute,
            classroomId,
            "signin",
            "otr",
            "teacher",
            Storage.getJson(courseID)
          )
        );
        break;

      case "A to Z":
        dispatch(
          SortTeacherClassroom(
            users.user_institute,
            classroomId,
            "name",
            "atz",
            "teacher",
            Storage.getJson(courseID)
          )
        );
        break;

      case "Z to A":
        dispatch(
          SortTeacherClassroom(
            users.user_institute,
            classroomId,
            "name",
            "zta",
            "teacher",
            Storage.getJson(courseID)
          )
        );
        break;

      case "Not Logged":
        dispatch(
          SortTeacherClassroom(
            users.user_institute,
            classroomId,
            "logged",
            "not",
            "teacher",
            Storage.getJson(courseID)
          )
        );
        break;

      default:
        dispatch(
          getClassroomViewList(
            users.user_institute,
            classroomId,
            ToggleValue,
            Storage.getJson(courseID)
          )
        );
    }
  };
  return (
    <React.Fragment>
      <div className="PageTopHead PTH-ViewClassroomTeacher mt-20">
        <div className="PTH-Item">
          <SingleSelectDropdown
            selectGroup={selectGroup}
            filterValues={filterValues}
            SingleSelectHandel={(item) => SingleSelectHandel(item)}
          />
        </div>
        <div className="PTH-Item P-Right">
          <FilterSearch
            ToggleValue={ToggleValue}
            users={users}
            classroomId={classroomId}
          />
        </div>
        <div className="PTH-Item">
          <button
            className="button button-primary btn-oval btn-sm button-block"
            onClick={() => OpenAddTeacherModal()}
          >
            <i className="ed-icon icon-plus-add white i-xs"></i>
            Add Teacher
          </button>
        </div>
      </div>
      <div className="gridListTable">
        <ul className="gridHeader">
          <li className="col col-5">Name & Email</li>
          <li className="col col-3">Contact</li>
          <li className="col col-2">Last Sign in</li>
          <li className="col col-2">&nbsp;</li>
        </ul>
        <div className="gridBody">
          {ViewClassroomListSuccess && ToggleValue === "Teachers" ? (
            ViewClassroomList.length > 0 ? (
              ViewClassroomList.filter(item => item.user !== null).map((item) => {
                return (
                  <div className="gridRow" key={item._id}>
                    <ul className="topInfo">
                      <li className="col col-5" data-head="Name & Email">
                        <div className="userDetails">
                          <div className="profileCircle">
                            <a
                              href={`/profile/${item.user?.username}`}
                              rel="noreferrer"
                              target="_blank"
                            >
                              <ImageViewer
                                object={item.user?.profile_picture
                                }
                                defaultImage={DummyProfile}
                              />
                            </a>
                          </div>
                          <div className="profileDetails">
                            <div className="profile-name">
                              <a
                                className="text-xs primary"
                                href={`/profile/${item.user?.username}`}
                                rel="noreferrer"
                                target="_blank"
                              >
                                {item.user?.fullname}
                              </a>
                            </div>
                            <div className="profile-email">
                              {item.user?.email}
                            </div>
                          </div>
                        </div>
                      </li>

                      <li className="col col-3" data-head="Contact">
                        {item.user?.contact}
                      </li>
                      <li className="col col-2" data-head="Assign To">
                        {item.user?.password_change &&
                          item.user?.lastLoginDate ? (
                          <React.Fragment>
                            {" "}
                            {moment(item.user?.lastLoginDate).format(
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
                              You are about to remove Teachers.
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
        />
      )}
    </React.Fragment>
  );
};

export default ViewClassroomTeachers;
