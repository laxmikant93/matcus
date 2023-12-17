import React, { useEffect } from "react";
import GrayAuthTheme from "../../../../../Common/Theme/GrayAuthTheme";
import Breadcrumb from "../../../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../../../Common/Breadcrumb/BreadcrumbItem";
import { useParams } from "react-router";
import {
  selectTitleNamevacancyReset,
  selectTitleNamevacancy,
} from "../../../../../store/actions/vacancy";
import { useDispatch, useSelector } from "react-redux";
import VacancyMenuHeader from "./VacancyMenuHeader";
import "./JobDetail.scss";
const JobDetail = ({ children }) => {
  const Toggle = "ViewJobDetail";
  const postId = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(selectTitleNamevacancy(postId.id, businesstype));
  }, [dispatch, postId]);

  useEffect(() => {
    return () => {
      dispatch(selectTitleNamevacancyReset());
    };
  }, [dispatch]);

  const { TitleName, TitleNameData, businesstype } = useSelector((state) => {
    return {
      TitleName: state.vacancy.titleName.success,
      TitleNameData: state.vacancy.titleName.data,
      businesstype: state.user.user_business_type,
    };
  });

  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        <BreadcrumbItem to="/vacancy-list" title="Vacancy" />
        <BreadcrumbItem to={`/job-detail/${postId.id}`} title="Job Detail" />
      </Breadcrumb>
      <div className="AddTestimonialHead mt-30">
        {TitleName ? (
          <div className="PTH-Item">
            <p className="text-sm">{TitleNameData.title}</p>
          </div>
        ) : (
          <div className="PTH-Item">
            <p className="text-sm"></p>
          </div>
        )}
        {/* <p className="text-sm w-500">Job profile Name</p> */}
      </div>
      <VacancyMenuHeader toggle={Toggle} postId={postId.id} />
      {children}
    </React.Fragment>
  );
};

export default JobDetail;
