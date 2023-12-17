/* eslint-disable no-unused-vars */
import React, { useState, useRef } from "react";
import Breadcrumb from "../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../Common/Breadcrumb/BreadcrumbItem";
import SingleSelectDropdown from "../../../Common/Form/SingleSelectDropdown";
import SearchControl from "../../../Common/SearchControl";
import GrayAuthTheme from "../../../Common/Theme/GrayAuthTheme";
import UseOutsideClick from "../../../Common/UseOutsideClick";
import Card from "../../../Common/Card";
import CardBody from "../../../Common/Card/CardBody";
import CardHeader from "../../../Common/Card/CardHeader";
import IconExternalLink from "../icon-external-link.svg";
import IconDelete from "../icon-trash.svg";
import "./Holiday.scss";
import Popup from "../../../Common/Popup";

const HolidayCalendar = () => {

  return (
    <React.Fragment>
      <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          <BreadcrumbItem
            to="/dashboard/attendance-student-classroomlist"
            title="Attendance"
          />
          <BreadcrumbItem to="#" title="Holidays Calendar" />
        </Breadcrumb>
        {/* header */}
        {/* holi list */}
    </React.Fragment>
  );
};

export default HolidayCalendar;
