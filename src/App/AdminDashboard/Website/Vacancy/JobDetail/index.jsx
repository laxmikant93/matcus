import React from "react";
import PostJobDetail from "../PostJobDetail";
import VacancyDetailHoc from "./VacancyDetailHoc";
import "./JobDetail.scss";
const AdmissionDetail = () => {
  return (
    <VacancyDetailHoc>
      <PostJobDetail />
    </VacancyDetailHoc>
  );
};

export default AdmissionDetail;
