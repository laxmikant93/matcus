/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import MultiSelectDropDownCommon from "../../../../../../Common/Form/MultiSelectDropDownCommon";
import AppLink from "../../../../../../Common/AppLink";
import SingleSelectDropdown from "../../../../../../Common/Form/SingleSelectDropdown";
import { useDispatch, useSelector } from "react-redux";
import Popup from "../../../../../../Common/Popup";
import UseOutsideClick from "../../../../../../Common/UseOutsideClick";
import {
  getClassroomViewList,
  deleteClassroomViewItem,
  AssignmentUpdateSelection,
  SortAssignmentClassroom,
  UpdateAssignmentSelectionClear,
  getAssignmentTeacherClassroom,
  TeacherAssignmentAssignToUpdate,
  MultiSelectAssignmentClassroomFilter,
} from "../../../../../../store/actions/classroomdetail";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { DATETIME_FORMAT_AP } from "../../../../../../Constant/constants";
// import CreateEditAssignment from "./CreateEditAssignment";
import {
  AllEntrySelected,
  AllEntrySelectedSwitch,
} from "../../../../../../store/actions/MultiSelectDropDown";
import TeacherAssignmentFilterSearch from "./TeacherClassroomAssignmentFilterSearch";
import CreateEditAssignment from "./TeacherClassroomAssignmentCreateEdit";
const TeacherAssignmentTab = () => {
  const { classroomId, subjectId } = useParams();
  const dispatch = useDispatch();
  const history = useNavigate();
  const ToggleValue = "Assignments";
  const RemovePopToggleRef = useRef();

  UseOutsideClick(RemovePopToggleRef, () => {
    if (RemovePop) setRemovePop(false);
  });

  const [RemovePop, setRemovePop] = useState(false);
  const [deleteID, setDeleteID] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalState, setModalState] = useState("");

  const {
    users,
    ViewClassroomList,
    ViewClassroomListSuccess,
    ViewClassroomDeleteLoading,
    TeacherListData,
    TeacherListDataSuccess,
    ViewClassroomListLoading,
    ViewClassroomDeleteSuccess,
  } = useSelector((state) => {
    return {
      users: state.user,
      ViewClassroomList: state.classroomDetail.Assignmentlist.data,
      TeacherListData: state.classroomDetail.TeacherDataList.data,
      TeacherListDataSuccess: state.classroomDetail.TeacherDataList.success,
      ViewClassroomListSuccess: state.classroomDetail.Assignmentlist.success,
      ViewClassroomListLoading: state.classroomDetail.Assignmentlist.loading,
      ViewClassroomDeleteLoading: state.classroomDetail.delete.loading,
      ViewClassroomDeleteSuccess: state.classroomDetail.delete.success,
    };
  });

  useEffect(() => {
    !ViewClassroomDeleteLoading &&
      ViewClassroomDeleteSuccess &&
      setRemovePop(false);
  }, [ViewClassroomDeleteLoading, ViewClassroomDeleteSuccess]);

  useEffect(() => {
    dispatch(
      getClassroomViewList(users.user_institute, subjectId, ToggleValue)
    );
    dispatch(getAssignmentTeacherClassroom(users.user_institute, subjectId));
  }, [subjectId, dispatch, users._id, users.user_institute]);

  // const [listGetLoading, setListGetLoading] = useState(false);
  // useEffect(() => {
  //   if (ViewClassroomListLoading) {
  //     setListGetLoading(true);
  //   } else if (!listGetLoading) {
  //     dispatch(
  //       getClassroomViewList(users.user_institute, subjectId, ToggleValue)
  //     );
  //     dispatch(getAssignmentTeacherClassroom(users.user_institute, subjectId));
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [classroomId, users._id, users.user_institute, listGetLoading]);

  // useEffect(() => {
  //   if (!ViewClassroomListLoading && listGetLoading) {
  //     setListGetLoading(false);
  //   }
  // }, [ViewClassroomListLoading, listGetLoading]);

  const RemovePopState = (_id) => {
    setRemovePop(!RemovePop);
    setDeleteID(_id);
  };

  const DeleteInvitation = (_id) => {
    dispatch(deleteClassroomViewItem(_id, ToggleValue));
  };

  const OpenAssignmentModal = (_id) => {
    setModalOpen(true);
    AddAssignmentModalState("Edit Assignment");
    dispatch(AssignmentUpdateSelection(_id));
  };

  const CloseAssignmentModal = () => {
    setModalOpen(false);
    dispatch(UpdateAssignmentSelectionClear());
  };

  const AddAssignmentModalState = (state) => {
    setModalOpen(true);
    setModalState(state);
  };

  const selectGroup = [
    "Created Date",
    "Recent to Old",
    "Old to Recent",
    "Due Date",
    "Recent to Old.",
    "Old to Recent.",
  ];

  const filterValues = ["Created Date", "Due Date"];

  const SingleSelectHandel = (item) => {
    let message = item;
    switch (message) {
      case "All":
        dispatch(
          getClassroomViewList(users.user_institute, subjectId, ToggleValue)
        );

        break;

      case "Recent to Old":
        dispatch(
          SortAssignmentClassroom(
            users.user_institute,
            subjectId,
            "createdon",
            "rto"
          )
        );

        break;

      case "Old to Recent":
        dispatch(
          SortAssignmentClassroom(
            users.user_institute,
            subjectId,
            "createdon",
            "otr"
          )
        );

        break;
      case "Recent to Old.":
        dispatch(
          SortAssignmentClassroom(
            users.user_institute,
            subjectId,
            "duedate",
            "rto"
          )
        );

        break;

      case "Old to Recent.":
        dispatch(
          SortAssignmentClassroom(
            users.user_institute,
            subjectId,
            "duedate",
            "otr"
          )
        );

        break;

      default:
        dispatch(
          getClassroomViewList(users.user_institute, subjectId, ToggleValue)
        );
    }
  };

  const handelAssignToUpdate = (e, _id) => {
    let AssighntoValue = e.target.value;
    let data = "";
    dispatch(
      TeacherAssignmentAssignToUpdate(
        { data },
        AssighntoValue,
        _id._id,
        users._id
      )
    );
  };

  const [selectedTeacherFilled, setSelectedTeacherFilled] = useState(false);

  if (ViewClassroomListSuccess && !selectedTeacherFilled) {
    setSelectedTeacherFilled(true);
    let value = [];
    for (let i = 0; i < TeacherListData.length; i++) {
      value.push(TeacherListData[i].user._id);
    }
    value.push("All");
    if (ToggleValue === "Assignments") {
      dispatch(AllEntrySelected(value));
      dispatch(AllEntrySelectedSwitch(value));
    }
  }
  const OnSelectedValueAssigntTo = (val) => {
    dispatch(
      MultiSelectAssignmentClassroomFilter(
        users.user_institute,
        subjectId,
        "assignTo",
        val
      )
    );
  };
  const OnSelectedValueCreatedBy = (val) => {
    dispatch(
      MultiSelectAssignmentClassroomFilter(
        users.user_institute,
        subjectId,
        "createdBy",
        val
      )
    );
  };

  const RedirectToView = (item) => {
    history({
      pathname: `/dashboard/teacher-assignment-view/${item}`,
      state: {
        ClassroomView: "ClassroomView",
        courseRouteID: classroomId,
        classroomRouteID: subjectId,
      },
    });
  };
  const [multipleDropDownUserData, setMultipleDropDownUserData] = useState([]);
  useEffect(() => {
    if (TeacherListData && TeacherListData.length) {
      TeacherListData.map((item) => item.user && multipleDropDownUserData.push(item.user));
    }
  }, [TeacherListData, users._id]);
  return (
    <React.Fragment>
      <div className="PageTopHead PTH-TeacherViewClassroomAssignment mt-20">
        <div className="PTH-Item">
          <SingleSelectDropdown
            selectGroup={selectGroup}
            filterValues={filterValues}
            SingleSelectHandel={(item) => SingleSelectHandel(item)}
          />
        </div>
        <div className="PTH-Item">
          {
            <MultiSelectDropDownCommon
              selectGroup={multipleDropDownUserData}
              OnSelectedValue={OnSelectedValueCreatedBy}
              name={"Created By"}
              SwitchSelectData={false}
            />
          }
        </div>
        <div className="PTH-Item P-Right">
          <TeacherAssignmentFilterSearch ToggleValue={ToggleValue} />
        </div>
        <div className="PTH-Item P-Right">
          <button
            className="button button-secondary btn-oval btn-sm button-block"
            onClick={() => AddAssignmentModalState("Create Assignment")}
          >
            <i className="ed-icon icon-plus-add white i-xs"></i>
            Add Assignment
          </button>
        </div>
      </div>
      <div className="gridListTable">
        <ul className="gridHeader">
          <li className="col col-4">Title</li>
          <li className="col col-3">Created By</li>
          <li className="col col-3">Createdddd & Due Date</li>
          <li className="col col-2">&nbsp;</li>
        </ul>
        <div className="gridBody">
          {ViewClassroomListSuccess && ToggleValue === "Assignments" ? (
            ViewClassroomList.length > 0 ? (
              ViewClassroomList.map((item, key) => {
                return (
                  <div className="gridRow" key={item._id}>
                    <ul className="topInfo">
                      <li className="col col-4" data-head="Title">
                        <div className="">{item.title}</div>
                      </li>
                      <li className="col col-3" data-head="Created By">
                        <div className="">{item.createdBy}</div>
                      </li>
                      <li className="col col-3" data-head="Created & Due Daten">
                        <div className="">
                          {moment(item.createdAt).format(DATETIME_FORMAT_AP)}
                        </div>
                        <div className="">
                          {moment(item.duedate).format(DATETIME_FORMAT_AP)}
                        </div>
                      </li>
                      <li className="col col-2 actionCols">
                        <div className="actionBtn">
                          <button
                            className="btn-square"
                            title="View"
                            onClick={() => RedirectToView(item._id)}
                          >
                            <span className="cssIcon">
                              <i className="ed-eye"></i>
                            </span>
                          </button>
                          {/* <AppLink
                            className="btn-square"
                            rel="noopener noreferrer"
                            target="blank"
                            to={`/view-assignment/${item._id}`}
                            title="View"
                          >
                            <span className="cssIcon">
                              <i className="ed-eye"></i>
                            </span>
                          </AppLink> */}

                          <button
                            className="btn-square"
                            title="Edit"
                            onClick={() => OpenAssignmentModal(item._id)}
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
                            RemoveProp={() => DeleteInvitation(item._id)}
                            loading={ViewClassroomDeleteLoading}
                          >
                            <p className="gray text-xxs w-300">
                              You are about to delete assignment.
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
              <div className="loadingGridData">No Records</div>
            )
          ) : (
            <div className="loadingGridData">
              <i className="ed-loadingGrid"></i>
            </div>
          )}
        </div>
      </div>

      {modalOpen && (
        <CreateEditAssignment
          CloseAssignmentModal={() => CloseAssignmentModal()}
          modalOpen={modalOpen}
          modalState={modalState}
        />
      )}
    </React.Fragment>
  );
};

export default TeacherAssignmentTab;
