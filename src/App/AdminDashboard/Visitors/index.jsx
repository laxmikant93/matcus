/* eslint-disable no-unused-vars */
import AppLink from "../../../Common/AppLink";
import Breadcrumb from "../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../Common/Breadcrumb/BreadcrumbItem";
import SearchControl from "../../../Common/SearchControl";
import GrayAuthTheme from "../../../Common/Theme/GrayAuthTheme";
import SingleSelectDropdown from '../../../Common/Form/SingleSelectDropdown'
import VisitorsList from "./VisitorsList";
import './guardVistor.style.scss'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { getVisitorList, searchVisitor, sortVisitor } from "../../../store/actions/visitorManagement";
import { changedatavalue, getDanamicCalenderDate } from "../../Attendance/commonFunctions";
const Visitors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFind, setSearchFind] = useState(false);
  const [currentDate, setCurrentDate] = useState(`${new Date()}`);

  let history = useNavigate();
  let dispatch = useDispatch();

  const { user, visitors, visitorList } = useSelector((state) => {
    return {
      user: state.user,
      visitors: state.visitorManagement.getVisitorList,
      visitorList: state.visitorManagement.getVisitorList.data
    };
  });

  useEffect(() => {
    dispatch(getVisitorList(user.user_institute, currentDate));
  }, [dispatch, user, currentDate])

  let typing;
  const handleSearch = (e) => {
    let inputValue = e.target.value
    clearTimeout(typing);
    typing = setTimeout(() => {
      setSearchTerm(inputValue);
      setSearchFind(true);
    }, 400);
  }

  useEffect(() => {
    if (searchFind) {
      dispatch(searchVisitor(user.user_institute, searchTerm, currentDate));
    }
  }, [dispatch, user, searchFind, searchTerm, currentDate])

  const selectGroup = ["Pending", "Approved", "Rejected", "Cancelled"];
  let filterValues = []
  const SingleSelectHandel = (value) => {
    let selectedValue = value
    switch (selectedValue) {
      case "All":
        dispatch(getVisitorList(user.user_institute, currentDate));
        break;
      case "Pending":
        dispatch(sortVisitor(user.user_institute, "pending", currentDate));
        break;
      case "Approved":
        dispatch(sortVisitor(user.user_institute, "approved", currentDate));
        break;
      case "Rejected":
        dispatch(sortVisitor(user.user_institute, "rejected", currentDate));
        break;
      case "Cancelled":
        dispatch(sortVisitor(user.user_institute, "cancelled", currentDate));
        break;
      default:
        dispatch(getVisitorList(user.user_institute, currentDate));
    }
  }


  const monthFilter = (values) => {
    let field = getDanamicCalenderDate(changedatavalue(values, currentDate));
    setCurrentDate(field.newDate ? field.newDate : new Date());
  };

  return (
    <React.Fragment>
      <div className="guardVistorpageInCenter">
        <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          <BreadcrumbItem to="/visitor-management-list" title="Visitors" />
        </Breadcrumb>
        <div className="guardeManagementAdmin-wrapper">
          <div className="guardVistorPageTopHead  mt-10">
            <div className="guardVisitCount">
              <p className="text-sm w-300 mb-3">Guard Management</p>
              <p className="ManageAdmissionCount">
                <span className="primary mr-3">
                  {visitors.success ? visitorList.length : ""}
                </span>
                {visitorList.length > 1 ? "Visitors" : "Visitor"}
              </p>
            </div>
            <div className="guardVistorTopSection mt-20">
              <div className='PTH-Item'>
                <SingleSelectDropdown
                  SingleSelectHandel={SingleSelectHandel}
                  selectGroup={selectGroup}
                  filterValues={filterValues}
                />
              </div>

              {/* Calender widget */}
              <div className='PTH-Item'>
                <div className="guardTopCalenderWrapper">
                  <button
                    type="button"
                    onClick={() => monthFilter("minus")}
                    className="vistorManaDateIcon text-sm w-500"
                  >
                    &#60;
                  </button>
                  <div className="DateCntMain visitorMonthCnt">
                    {moment(currentDate).format("MMMM-YYYY")}
                  </div>

                  <button

                    type="button"
                    onClick={() => monthFilter("plus")}
                    className="vistorManaDateIcon text-sm w-500"
                  >
                    &#62;
                  </button>
                </div>
              </div>
              <div className="PTH-Item dis-left">
                <SearchControl
                  classNameWrappper="tableSearchbar" id="search"
                  onKeyUp={handleSearch}
                  onChange={handleSearch}
                  name="search"
                  placeholder="Search visitor by visitor name" />
              </div>
              <div className="PTH-Item dis-right">
                <AppLink
                  to="/add-visitors"
                  className="button button-primary btn-oval btn-sm button-addVistor "
                >
                  <i className="ed-icon icon-plus-add white i-xs"></i>Add Visitors
                </AppLink>
              </div>
            </div>


          </div>
          <VisitorsList visitors={visitors} visitorList={visitorList} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Visitors;