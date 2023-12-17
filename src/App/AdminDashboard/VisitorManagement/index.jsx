/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Breadcrumb from '../../../Common/Breadcrumb'
import BreadcrumbItem from '../../../Common/Breadcrumb/BreadcrumbItem'
import SingleSelectDropdown from '../../../Common/Form/SingleSelectDropdown'
import SearchControl from '../../../Common/SearchControl'
import GrayAuthTheme from '../../../Common/Theme/GrayAuthTheme'
import { getTeacherSortList, getTeacherVisitorList, getVisitorList, searchTeacherVisitor, searchVisitor, sortVisitor } from '../../../store/actions/visitorManagement'
import { changedatavalue, getDanamicCalenderDate } from '../../Attendance/commonFunctions'
import VisitorList from './VisitorList'
import './visitorManagement.style.scss'
import moment from "moment";

const Visitor = () => {
  const dispatch = useDispatch()
  const { user, teacherVisitorListData, teacherVisitor } = useSelector((state) => {
    return {
      user: state.user,
      teacherVisitor: state.visitorManagement.getTeacherVisitorList,
      teacherVisitorListData: state.visitorManagement.getTeacherVisitorList.data
    }
  })

  const selectGroup = ["pending", "Approved", "Rejected", "Cancelled"];
  let filterValues = []
  const SingleSelectHandel = (value) => {
    let selectedValue = value
    switch (selectedValue) {
      case "All": {
        if (user.user_activeRole === process.env.REACT_APP_TEACHER) {
          dispatch(getTeacherVisitorList(user.user_institute, user._id, currentDate))
        } else {
          dispatch(getTeacherVisitorList(user.user_institute, "", currentDate))
        }
        break;
      }
      case "pending": {
        if (user.user_activeRole === process.env.REACT_APP_TEACHER) {
          dispatch(getTeacherSortList(user.user_institute, user._id, currentDate, "pending"))
        } else {
          dispatch(getTeacherSortList(user.user_institute, "", currentDate, "pending"));
        }
        break;
      }
      case "Approved": {
        if (user.user_activeRole === process.env.REACT_APP_TEACHER) {
          dispatch(getTeacherSortList(user.user_institute, user._id, currentDate, "approved"))
        } else {
          dispatch(getTeacherSortList(user.user_institute, "", currentDate, "approved"));
        }
        break;
      }
      case "Rejected": {
        if (user.user_activeRole === process.env.REACT_APP_TEACHER) {
          dispatch(getTeacherSortList(user.user_institute, user._id, currentDate, "rejected"))
        } else {
          dispatch(getTeacherSortList(user.user_institute, "", currentDate, "rejected"));
        }
        break;
      }
      case "Cancelled":
        if (user.user_activeRole === process.env.REACT_APP_TEACHER) {
          dispatch(getTeacherSortList(user.user_institute, user._id, currentDate, "cancelled"));
        } else {
          dispatch(getTeacherSortList(user.user_institute, "", currentDate, "cancelled"));
        }
        break;
      default:
        if (user.user_activeRole === process.env.REACT_APP_TEACHER) {
          dispatch(getTeacherVisitorList(user.user_institute, user._id, currentDate))
        } else {
          dispatch(getTeacherVisitorList(user.user_institute, "", currentDate))
        }

    }
  }
  const [currentDate, setCurrentDate] = useState(`${new Date()}`);
  const monthFilter = (values) => {
    let field = getDanamicCalenderDate(changedatavalue(values, currentDate));
    setCurrentDate(field.newDate ? field.newDate : new Date());
  };

  const [searchTerm, setSearchTerm] = useState("")
  let typing;
  const handleSearch = (e) => {
    e.preventDefault()
    clearTimeout(typing)
    typing = setTimeout(() => {
      setSearchTerm(e.target.value)
    }, 400)

    if (!e.target.value) {
      clearTimeout(typing)
      setSearchTerm("")
    }
  }
  //search
  useEffect(() => {
    if (searchTerm && user.user_activeRole === process.env.REACT_APP_TEACHER) {
      dispatch(searchTeacherVisitor(user.user_institute, user._id, currentDate, searchTerm))
    }
    else {
      dispatch(searchTeacherVisitor(user.user_institute, "", currentDate, searchTerm));
    }
  }, [dispatch, searchTerm, user.user_institute, currentDate])

  useEffect(() => {
    if (user.user_activeRole === process.env.REACT_APP_TEACHER) {
      dispatch(getTeacherVisitorList(user.user_institute, user._id, currentDate))
    } else {
      dispatch(getTeacherVisitorList(user.user_institute, "", currentDate))
    }

  }, [dispatch, user.user_institute, user._id, currentDate])
  return (
    <React.Fragment>
      <div className="vistorManagementPageInCenter">
        <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          <BreadcrumbItem to="/visitor-management" title="Visitor" />
        </Breadcrumb>

        <div className="visitorManagement-wrapper mt-10">
          <div className="visitorManagementPageTopHead">
            <div className="PTH-Item">
              <p className="text-sm w-400">Visitor Request List</p>
            </div>
            <div className="guardVisitCount">
              <p className="ManageAdmissionCount">
                <span className="primary mr-3">
                  {teacherVisitor.success ? teacherVisitorListData.length : ""}
                </span>
                {teacherVisitorListData.length > 1 ? "Visitors" : "Visitor"}
              </p>
            </div>
          </div>
          {/* top search area */}
          <div className="visitorManagementPageTopHead PTH-AdminServiceList mt-10">
            <div className='vistorTopSection'>
              <div className='topSectionDropDown'>
                <SingleSelectDropdown
                  SingleSelectHandel={SingleSelectHandel}
                  selectGroup={selectGroup}
                  filterValues={filterValues}
                />
              </div>
              {/* Calender widget */}
              <div className='topSectionCalender'>
                <div className="guardTopCalenderWrapper">
                  <button
                    type="button"
                    onClick={() => monthFilter("minus")}
                    className="vistorManaDateIcon text-sm w-500"
                  >
                    &#60;
                  </button>
                  <div className="visitorMonthCnt">
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
              <div className='topSectionSearch'>
                <SearchControl
                  classNameWrappper="tableSearchbar" id="search"
                  name="search"
                  onChange={handleSearch}
                  onKeyUp={handleSearch}
                  placeholder="Search service by title" />
              </div>
            </div>
            {/* vistor list table */}
            <div className="vistorManagementContentTable">
              <VisitorList currentDate={currentDate} teacherVisitorListData={teacherVisitorListData} teacherVisitor={teacherVisitor} />
            </div>
          </div>
        </div>

      </div>

    </React.Fragment>
  )
}

export default Visitor