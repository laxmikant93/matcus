import React, { useEffect } from "react";
import GrayAuthTheme from "../../../../Common/Theme/GrayAuthTheme";
import Breadcrumb from "../../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../../Common/Breadcrumb/BreadcrumbItem";
import ViewClassroomTabs from "./ViewClassroomTabs";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Storage from "../../../../Classes/Storage";
import { courseID } from "../../../../Constant/auth";
import { useState } from "react";
import {
  DynamicClassroomHeader,
  DynamicCourseHeader,
} from "../../../../Common/UserElement";
import "./ViewClassroom.scss";
import { useDispatch } from "react-redux";
import { ClassroomIDFetch, resetClassroomDetails } from "../../../../store/actions/classroomdetail";

const ViewClassroom = (props) => {
  const [courseRouteID, setCourseID] = useState("");
  const { classroomId } = useParams();
  const dispatch = useDispatch()
  const { ClassroomDetail, ClassroomDetailSuccess } = useSelector((state) => {
    return {
      ClassroomDetail: state.classroomDetail.classrooomData.data,
      ClassroomDetailSuccess: state.classroomDetail.classrooomData.success,
    };
  });

  useEffect(() => {
    Storage.setJson("__wz_clsrom__", classroomId);
    setCourseID(Storage.getJson(courseID));
  }, [classroomId]);

  useEffect(() => {
    dispatch(ClassroomIDFetch(classroomId));
  }, [classroomId, dispatch]);
  useEffect(() => {
    return () => {
      dispatch(resetClassroomDetails())
    }
  }, [dispatch])
  return (
    <React.Fragment>
      <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          <BreadcrumbItem to="/school-admin-course" title={DynamicCourseHeader()} />
          <BreadcrumbItem to={`/edit-course/${courseRouteID}`} title={"Edit " + DynamicCourseHeader()} />
          <BreadcrumbItem to={`/view-classroom/${classroomId}`} title={DynamicClassroomHeader()} />
        </Breadcrumb>
        {ClassroomDetailSuccess ? (
          <p className="text-xs mt-20">
            {ClassroomDetail.data_courseInfo_coursename},{" "}
            <span className="text-xxs">
              {ClassroomDetail.data_classroomInfo_classroomname}
            </span>
          </p>
        ) : (
          <p>Loading...</p>
        )}

        <ViewClassroomTabs
          props={props} />
    </React.Fragment>
  );
};
export default ViewClassroom;
