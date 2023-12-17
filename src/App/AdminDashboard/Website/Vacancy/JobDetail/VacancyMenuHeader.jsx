import React from "react";
import AppLink from "../../../../../Common/AppLink";
import "./JobDetail.scss";
function VacancyMenuHeader({ postId }) {
  const pathname = window.location.pathname;

  return (
    <div className="ToggleBtnSectionCst mt-10">
      <AppLink
        to={`/job-detail/${postId}`}
        className={`text-xs w-300 ${pathname === `/job-detail/${postId}` ? "active" : ""
          }`}
      >
        View Details
      </AppLink>
      <AppLink
        to={`/job-applicant-detail/${postId}`}
        className={`text-xs w-300 ${pathname === `/job-applicant-detail/${postId}` ? "active" : ""
          }`}
      >
        Applicants
      </AppLink>
    </div>
  );
}

export default VacancyMenuHeader;
