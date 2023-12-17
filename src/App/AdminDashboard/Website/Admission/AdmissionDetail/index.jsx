import React from "react";
import AddAdmissionDetail from "../AddAdmissionDetail";
import AdmissionDetailHoc from "./AdmissionDetailHoc";
import "./AdmissionDetail.scss";
const AdmissionDetail = () => {
  return (
    <AdmissionDetailHoc>
      <AddAdmissionDetail />
    </AdmissionDetailHoc>
  );
};

export default AdmissionDetail;
