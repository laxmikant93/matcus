import React, { useState } from "react";
import { useSelector } from "react-redux";
import AppLink from "../../../Common/AppLink";
import Breadcrumb from "../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../Common/Breadcrumb/BreadcrumbItem";
import GrayAuthTheme from "../../../Common/Theme/GrayAuthTheme";
import "../ReportCard.scss";
import ReportCardFilter from "../ReportCardFilter";
const TeacherReportCard = () => {

  const { gradeData, instituteName } = useSelector((state) => {
    return {
      instituteName: state.user.user_institute_institute_name,
      gradeData: state.reportCard.gradeList.data,
    };
  });

  const [termLength] = useState(-1);

  return (
    <React.Fragment>
      <React.Fragment>
        <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          <BreadcrumbItem
            to="/dashboard/teacher-report-card"
            title="Report Card"
          />
        </Breadcrumb>
        <div className="RC-Dashbaord">
          <div className="RC-DashbaordWrapper">
            <div className="RC-DashbaordHead">
              <h1>Report Card</h1>
              <p>{instituteName}</p>
            </div>
            <div className="RC-FIlterWrapper">
              <ReportCardFilter />
            </div>
            <div className="RC-Add-Term-Grade">
              <AppLink
                to="/dashboard/teacher-create-terms"
                type="button"
                className="button btn-o-primary primary btn-sm button-block"
              >
                {termLength >= 1 ? "View Terms" : "Add Terms"}
              </AppLink>
              {gradeData.length ? (
                <AppLink
                  to="/dashboard/teacher-create-grades"
                  className="button btn-o-primary primary btn-sm button-block"
                >
                  View Grades
                </AppLink>
              ) : (
                <AppLink
                  to="/dashboard/teacher-create-grades"
                  className="button btn-o-primary primary btn-sm button-block"
                >
                  Add Grades
                </AppLink>
              )}
            </div>
          </div>
        </div>
        {/* <AppLink to="/dashboard/add-grade">Add Grade</AppLink> */}
      </React.Fragment>
    </React.Fragment>
  );
};

export default TeacherReportCard;
