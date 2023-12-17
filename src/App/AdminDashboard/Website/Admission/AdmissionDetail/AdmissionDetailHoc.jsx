import React, { useEffect } from "react";
import GrayAuthTheme from "../../../../../Common/Theme/GrayAuthTheme";
import Breadcrumb from "../../../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../../../Common/Breadcrumb/BreadcrumbItem";
import {
  selectTitleNameAdmissionReset,
  selectTitleNameAdmission,
} from "../../../../../store/actions/admission";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import AdmissionMenuHeader from "./AdmissionMenuHeader";
import "./AdmissionDetail.scss";

const AdmissionDetailHoc = ({ children }) => {
  const Toggle = "ViewAdmissionDetail";
  const postId = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(selectTitleNameAdmission(postId.id));
  }, [dispatch, postId]);

  useEffect(() => {
    return () => {
      dispatch(selectTitleNameAdmissionReset());
    };
  }, [dispatch]);

  const { TitleName, TitleNameData } = useSelector((state) => {
    return {
      TitleName: state.admission.titleName.success,
      TitleNameData: state.admission.titleName.data,
    };
  });

  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        {/* <BreadcrumbItem to="/website-manage" title="Manage Website" /> */}
        <BreadcrumbItem to="/admission-list" title="Admission" />
        <BreadcrumbItem
          to={`/admission-detail/${postId.id}`}
          title="Admission Detail"
        />
      </Breadcrumb>
      <div className="PageTopHead PTH-AdminAdmissionDetail mt-20">
        {TitleName ? (
          <div className="PTH-Item">
            <p className="text-sm">{TitleNameData.title}</p>
          </div>
        ) : (
          <div className="PTH-Item">
            <p className="text-sm"></p>
          </div>
        )}
      </div>
      <AdmissionMenuHeader toggle={Toggle} postId={postId.id} />
      {children}
    </React.Fragment>
  );
};

export default AdmissionDetailHoc;
