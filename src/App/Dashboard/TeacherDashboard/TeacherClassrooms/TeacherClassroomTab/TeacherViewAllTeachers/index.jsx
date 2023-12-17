/* eslint-disable no-unused-vars */
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import SingleSelectDropdown from "../../../../../../Common/Form/SingleSelectDropdown";
import NoDataAvailable from "../../../../../../Common/NoDataAvailable";
import SearchControl from "../../../../../../Common/SearchControl";
import { DATETIME_FORMAT_AP } from "../../../../../../Constant/constants";
import {
  getClassroomViewList,
  SearchClassroomViewItem,
  SortTeacherClassroom,
} from "../../../../../../store/actions/classroomdetail";
import DummyProfile from "../../DummyProfile.png";
const ViewClassroomTeachersTab = ({ studentClassroom }) => {
  const ToggleValue = "Teachers";
  const dispatch = useDispatch();
  const { classroomId, subjectId } = useParams();

  // UseOutsideClick(RemovePopToggleRef, () => {
  //   if (RemovePop) setRemovePop(false);
  // });

  const {
    users,
    ViewClassroomList,
    ViewClassroomListSuccess,
    ViewClassroomListLoading,
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

        subjectId,
        ToggleValue,
        classroomId
      )
    );
  }, [classroomId, dispatch, subjectId, users._id, users.user_institute]);
  // const [listGetLoading, setListGetLoading] = useState(false);
  // useEffect(() => {
  //   if (ViewClassroomListLoading) {
  //     setListGetLoading(true);
  //   } else if (!listGetLoading) {
  //     dispatch(
  //       getClassroomViewList(
  //         users.user_institute,
  //         subjectId,
  //         ToggleValue,
  //         "teacher"
  //       )
  //     );
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [classroomId, users._id, users.user_institute, listGetLoading]);

  // useEffect(() => {
  //   if (!ViewClassroomListLoading && listGetLoading) {
  //     setListGetLoading(false);
  //   }
  // }, [ViewClassroomListLoading, listGetLoading]);

  // const [RemovePop, setRemovePop] = useState(false);
  // const [showAddTeacherModal, setShowAddTeacherModal] = useState(false);
  // const [deleteID, setDeleteID] = useState("");

  // const RemovePopState = (_id) => {
  //   setRemovePop(!RemovePop);
  //   setDeleteID(_id);
  // };

  // const DeleteInvitation = (_id) => {
  //   dispatch(deleteClassroomViewItem(_id, ToggleValue));
  // };

  // const CloseAddTeacherModal = () => {
  //   setShowAddTeacherModal(false);
  // };

  // const OpenAddTeacherModal = () => {
  //   setShowAddTeacherModal(true);
  // };

  // useEffect(() => {
  //   !ViewClassroomDeleteLoading &&
  //     ViewClassroomDeleteSuccess &&
  //     setRemovePop(false);
  // }, [ViewClassroomDeleteLoading, ViewClassroomDeleteSuccess]);

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
            "teacher",
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
            "teacher",
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
            "teacher",
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
            "teacher",
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
            "teacher",
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
            "teacher",

          )
        );
    }
  };
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputHandel = (evt) => {
    evt.preventDefault();
    setSearchTerm(evt.target.value);
  };
  useEffect(() => {
    if (searchTerm) {
      dispatch(
        SearchClassroomViewItem(
          users.user_institute,
          ToggleValue,
          subjectId,
          searchTerm,
          classroomId
        )
      );
    } else {
      dispatch(
        getClassroomViewList(
          users.user_institute,

          subjectId,
          ToggleValue,
          classroomId
        )
      );
    }
  }, [searchTerm, dispatch, users.user_institute, subjectId, classroomId]);
  return (
    <React.Fragment>
      <div className="PageTopHead PTH-TeacherViewClassroom mt-20">
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
          <SearchControl
            classNameWrappper="tableSearchbar"
            id="search"
            name="search"
            onChange={(evt) => searchInputHandel(evt)}
            placeholder={`Search ${ToggleValue}`}
          />
        </div>
      </div>
      <div className="gridListTable">
        <ul className="gridHeader">
          <li className="col col-6">Name & Email</li>
          <li className="col col-3">Contact</li>
          <li className="col col-3">Last Sign in</li>
        </ul>
        <div className="gridBody">
          {ViewClassroomListSuccess && ToggleValue === "Teachers" ? (
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
                            {" "}
                            {moment(item.user.lastLoginDate).format(
                              DATETIME_FORMAT_AP
                            )}
                          </React.Fragment>
                        ) : (
                          "Not Logged"
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
    </React.Fragment>
  );
};
export default ViewClassroomTeachersTab;
