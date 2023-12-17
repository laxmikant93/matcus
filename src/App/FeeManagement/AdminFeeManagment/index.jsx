/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useCallback } from "react";
import GrayAuthTheme from "../../../Common/Theme/GrayAuthTheme";
import SearchControl from "../../../Common/SearchControl";
import Breadcrumb from "../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../Common/Breadcrumb/BreadcrumbItem";
import SingleSelectDropdown from "../../../Common/Form/SingleSelectDropdown";
import {
  DynamicClassroomHeader,
  DynamicCourseHeader,
} from "../../../Common/UserElement";
import "../fee-management.scss";
import AppLink from "../../../Common/AppLink";
import { useDispatch, useSelector } from "react-redux";
import {
  ActiveupdateFee,
  feeStructureIsExist,
  getInstituteCourses,
  getInstituteCoursesScroll,
  getInstitutesearch,
} from "../../../store/actions/feeManagement";
import NoDataAvailable from "../../../Common/NoDataAvailable";
import ModalfeeStructureExist from "./ModalfeeStructureExist";
import { deleteFee, updateFee } from "../../../store/actions/feeManagement";
import { useNavigate } from "react-router-dom";
const FeeManagement = () => {
  const dispatch = useDispatch();
  const {
    user,
    CourseList,
    CourseListLoading,
    CourseListSuccess,
    feeStructureExist,
    existLoading,
    existSuccess,
  } = useSelector((state) => {
    return {
      user: state.user,
      CourseList: state.feeManagement.InstituteCourseList.data,
      CourseListLoading: state.feeManagement.InstituteCourseList.loading,
      CourseListSuccess: state.feeManagement.InstituteCourseList.success,
      feeStructureExist: state.feeManagement.feeStructureExist.exist,
      existLoading: state.feeManagement.feeStructureExist.loading,
      existSuccess: state.feeManagement.feeStructureExist.success,
    };
  });
  const [skip, setSkip] = useState(0);
  const [scrollLoading, setScrollLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalState, setModalState] = useState(false);
  useEffect(() => {
    dispatch(getInstituteCourses(user.user_institute, user._id));
  }, [user, dispatch]);

  // const ScrollANdSearch = useCallback(async (s, type) => {
  //   if (type === "scroll") {
  //     let newSkip = (await s) + 10;
  //     await setSkip(newSkip);
  //     dispatch(
  //       getInstituteCoursesScroll(
  //         user.user_institute,
  //         user._id,
  //         newSkip,
  //         searchTerm
  //       )
  //     );
  //   }
  //   setTimeout(() => {
  //     setScrollLoading(false);
  //   }, 1500);
  // }, []);
  let typing;
  const handleSearch = (event) => {
    event.preventDefault();
    clearTimeout(typing);
    typing = setTimeout(() => {
      setSearchTerm(event.target.value);
    }, 400);

    if (!event.target.value) {
      clearTimeout(typing);
      setSearchTerm("");
    }
  };
  useEffect(() => {
    dispatch(getInstitutesearch(user.user_institute, user._id, searchTerm));
    dispatch(feeStructureIsExist(user.user_institute, user._id));
  }, [searchTerm, dispatch]);
  useEffect(() => {
    if (!feeStructureExist && !existLoading && existSuccess) {
      setModalState(true);
    } else {
      setModalState(false)
    }
  }, [feeStructureExist, existLoading, existSuccess]);
  // useEffect(() => {
  //   const onScroll = function async() {
  //     if (window.innerHeight + window.scrollY > document.body.offsetHeight) {
  //       !scrollLoading && ScrollANdSearch(skip, "scroll");
  //       setScrollLoading(true);
  //     }
  //   };
  //   window.addEventListener("scroll", onScroll);
  //   return () => window.removeEventListener("scroll", onScroll);
  // }, [scrollLoading, ScrollANdSearch, skip]);
  const handlePublishSubdomainFeature = (e, id) => {
    let statusData = {
      Publish: e.target.value,
    };

    dispatch(ActiveupdateFee(id, statusData));
  };
  const [onlineShow, setOnlineShow] = useState("");
  const [ToggleSectionTitle, SetToggleSectionTitle] = useState(false);

  const handleClick = (_id) => {
    setOnlineShow(_id);
    SetToggleSectionTitle(!ToggleSectionTitle);
  };
  const history = useNavigate();
  return (
    <>
      <React.Fragment>
        <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          <BreadcrumbItem to="/fee-management" title="Fee Management" />
        </Breadcrumb>

        <div className="feeManagementAdmin-wrapper">
          <div className="pageHeadIntro feeManagementAdmin">
            <div className="PTH-Item">
              <p className="text-sm w-300">Fee Management</p>
            </div>
            <div className="PTH-Item right">
              <SearchControl
                classNameWrappper="tableSearchbar"
                id="search"
                name="search_fee_students"
                onChange={handleSearch}
                reset={() => setSearchTerm("")}
                placeholder="Classroom search"
              />
            </div>
            <div className="PTH-Item">
              <AppLink
                to="/add-lms-fee-structure"
                className="button button-primary btn-oval btn-sm button-block"
              >
                <i className="ed-icon icon-plus-add white i-xs"></i>Add Fee
                Structure
              </AppLink>
            </div>
          </div>
          <div className="gridListTable">
            <ul className="gridHeader">
              <li className="col col-3">
                <DynamicCourseHeader />
              </li>
              <li className="col col-3">No. of Students</li>
              <li className="col col-3">Status</li>
              <li className="col col-3">&nbsp;&nbsp;&nbsp;</li>
            </ul>

            <div className="gridBody">
              {CourseList && CourseList.length > 0 && !CourseListLoading ? (
                CourseList.map((item) => {
                  return (
                    <div className="gridRow" key={item._id}>
                      <ul className="topInfo">
                        <li className="col col-3" data-head="Classroom">
                          {item.coursename}<br />
                          <button
                            className={`btnText BtnCaret text-xxs w-300 ${ToggleSectionTitle && item._id === onlineShow
                              ? `active`
                              : ``
                              }`}
                            onClick={() => handleClick(item._id, false)}
                          >
                            {ToggleSectionTitle && item._id === onlineShow
                              ? `Show Less`
                              : `Show More`}
                          </button>
                        </li>

                        <li className="col col-3"
                          data-head="No. of Students"
                        >
                          {item.TotalStudent}
                        </li>
                        <li className="col col-3" data-head="Status">
                          <div className="selectTextType">
                            <select
                              value={item.Publish}
                              onChange={(e) =>
                                handlePublishSubdomainFeature(e, item.feeStructureId)
                              }
                              disabled={item.Publish === "Active"}
                            >
                              <option hidden>Saved</option>
                              <option>Active</option>
                            </select>
                          </div>
                        </li>
                        <li className="col col-3 actionCols">
                          <div className="actionBtn">
                            <AppLink
                              className="btn-square"
                              title="Edit"
                              to={`/update-lms-fee-structure/${item.feeStructureId}`}
                            >
                              <span className="cssIcon">
                                <i className="ed-pen"></i>
                              </span>
                            </AppLink>
                            <AppLink
                              className="btn-square"
                              title="Clone & Edit"
                              to={`/clone-edit-lms-fee-structure/${item.feeStructureId}`}
                            >
                              <span className="cssIcon">
                                <i className="ed-editclone"></i>
                              </span>
                            </AppLink>
                            <button
                              className={`btn-square ${item.Publish === "Saved" ? "disabled" : ""}`}
                              title="View fee listing"
                              onClick={() => history(`/view-fee-listing/${item._id}`)}
                              type="button"
                              disabled={item.Publish === "Saved"}
                            >
                              <span className="cssIcon">
                                <i className="ed-eye"></i>
                              </span>
                            </button>
                          </div>
                        </li>

                      </ul>
                      {item._id === onlineShow && ToggleSectionTitle && (
                        <ul className="topInfo">
                          <li className="col col-3">
                            <div className="Details">
                              <div className="w-600 base">
                                Payment Cycle
                              </div>
                              <div className="mt-3">
                                {item.paymentCycle}
                              </div>
                            </div>
                          </li>
                          <li className="col col-3">
                            <div className="Details">
                              <div className="w-600 base">
                                Total Paid Amount
                              </div>
                              <div className="mt-3" data-head="Due Amount">
                                <p>₹ {item.PaidAmount}</p>
                              </div>
                            </div>
                          </li>
                          <li className="col col-3">
                            <div className="Details">
                              <div className="w-600 base">Total Due Amount</div>
                              <div className="mt-3">₹ {item.dueAmount}</div>
                            </div>
                          </li>
                        </ul>
                      )}
                    </div>
                  );
                })
              ) : CourseListLoading && !CourseListSuccess ? (
                <div className="loadingGridData">
                  <p>Loading...</p>
                </div>
              ) : (
                !CourseListLoading &&
                CourseListSuccess && (
                  <NoDataAvailable title="Record Not Found" />
                )
              )}
            </div>
          </div>
        </div>
        <ModalfeeStructureExist show={modalState} setShow={setModalState} />
      </React.Fragment>
    </>
  );
};

export default FeeManagement;
