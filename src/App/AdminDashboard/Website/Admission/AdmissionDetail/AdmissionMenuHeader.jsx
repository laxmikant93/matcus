import React, { useEffect, useState } from "react";
import AppLink from "../../../../../Common/AppLink";

function AdmissionMenuHeader({ postId }) {
  const [toggle, setToggle] = useState("ViewJobDetail");

  const locationVal = window.location.href;

  useEffect(() => {
    if (locationVal.includes("admission-applicant-detail")) {
      setToggle("ViewAdmissionApplicant");
    } else {
      setToggle("ViewAdmissionDetail");
    }
  }, [locationVal]);

  return (
    <div className="ToggleBtnSectionCst mt-10">
      <AppLink
        className={`text-xs w-300 ${toggle === "ViewAdmissionDetail" ? "active" : ""
          }`}
        to={`/admission-detail/${postId}`}
      >
        View Details
      </AppLink>

      <AppLink
        className={`text-xs w-300 ${toggle === "ViewAdmissionApplicant" ? "active" : ""
          }`}
        to={`/admission-applicant-detail/${postId}`}
      >
        Applicants
      </AppLink>
    </div>
  );
}

export default AdmissionMenuHeader;
