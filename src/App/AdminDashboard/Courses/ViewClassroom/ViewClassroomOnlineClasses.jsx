import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UseOutsideClick from "../../../../Common/UseOutsideClick";
import { getClassroomViewList } from "../../../../store/actions/classroomdetail";
import { useParams } from "react-router-dom";
import Storage from "../../../../Classes/Storage";
import {
  AllEntrySelected,
  AllEntrySelectedSwitch,
} from "../../../../store/actions/MultiSelectDropDown";
import SearchFilterAdmin from "./ClassroomOnlineClass/SearchFilterAdmin";
import AdminSideList from "./ClassroomOnlineClass/AdminSideList";
import { courseID } from "../../../../Constant/auth";
const ViewClassroomOnlineClasses = () => {
  const ToggleValue = "Online Classes";
  const { classroomId } = useParams();
  const RemovePopToggleRef = useRef();
  const dispatch = useDispatch();
  UseOutsideClick(RemovePopToggleRef, () => {
    if (RemovePop) setRemovePop(false);
  });
  const [RemovePop, setRemovePop] = useState(false);
  const { users, TeacherListData, TeacherListDataSuccess } = useSelector(
    (state) => {
      return {
        users: state.user,
        ViewClassroomList: state.classroomDetail.list.data,
        ClassroomDetail: state.classroomDetail.classrooomData.data,
        ClassroomDetailSuccess: state.classroomDetail.classrooomData.success,
        ViewClassroomListSuccess: state.classroomDetail.list.success,
        ViewClassroomDeleteLoading: state.classroomDetail.delete.loading,
        TeacherListData: state.classroomDetail.TeacherDataList.data,
        TeacherListDataSuccess: state.classroomDetail.TeacherDataList.success,
        isSuccess: state.zoomapi.success,
      };
    }
  );

  useEffect(() => {
    Storage.setBool("SwitchOnlineClasses", true);
  }, []);

  const [selectedTeacherFilled, setSelectedTeacherFilled] = useState(false);

  if (TeacherListDataSuccess && !selectedTeacherFilled) {
    setSelectedTeacherFilled(true);
    let value = [];
    for (let i = 0; i < TeacherListData.length; i++) {
      value.push(TeacherListData[i].user._id);
    }
    value.push("All");
    if (ToggleValue === "Online Classes") {
      dispatch(AllEntrySelected(value));
      dispatch(AllEntrySelectedSwitch(value));
    }
  }
  const [courseRouteID, setCourseID] = useState("");
  useEffect(() => {
    setCourseID(Storage.getJson(courseID));
  }, [courseRouteID]);

  useEffect(() => {
    dispatch(
      getClassroomViewList(users.user_institute, classroomId, "Online Classes")
    );
  }, [classroomId, dispatch, users._id, users.user_institute]);

  return (
    <React.Fragment>
      <SearchFilterAdmin />
      <AdminSideList />
    </React.Fragment>
  );
};

export default ViewClassroomOnlineClasses;
