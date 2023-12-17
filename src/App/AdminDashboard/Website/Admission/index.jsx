import React, { useEffect, useRef, useState } from "react";
import GrayAuthTheme from "../../../../Common/Theme/GrayAuthTheme";
import AppLink from "../../../../Common/AppLink";
import Breadcrumb from "../../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../../Common/Breadcrumb/BreadcrumbItem";
import SelectTitle from "../../../../Common/SectionTitle";
import { useDetectOutsideClick } from "../../../../Common/DetectOutsideClick/useDetectOutsideClick";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdmissionList,
  deleteAdmission,
  listStatusUpdate,
  getFilterAdmission,
  getSearchFilterAdmission,
  createAdmissionReset,
  updateAdmissionReset,
} from "../../../../store/actions/admission";
import { DATETIME_FORMAT_AP } from "../../../../Constant/constants";
import moment from "moment";
import "./Admission.scss";
import SearchControl from "../../../../Common/SearchControl";
import NoDataAvailable from "../../../../Common/NoDataAvailable";
const AdmissionList = () => {
  const dispatch = useDispatch();

  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [admissionDelete, setAdmissionDelete] = useState("");

  const onClickBtnDropDownRemove = (_id, isActive) => {
    setAdmissionDelete(_id);
    setIsActive(isActive);
  };

  /////// USE SELECTOR & USE EFFECT

  const {
    users,
    admissionlist,
    admissionListSuccess,

    admissionDeleteLoading,
  } = useSelector((state) => {
    return {
      users: state.user,
      admissionlist: state.admission.list.data,
      admissionListSuccess: state.admission.list.success,
      admissionDeleteLoading: state.admission.delete.loading,
    };
  });

  useEffect(() => {
    dispatch(getAdmissionList(users.user_institute));
    dispatch(createAdmissionReset());
    dispatch(updateAdmissionReset());
  }, [users, dispatch]);

  const handelListStatusUpdate = (e, _id) => {
    let inputValue = e.target.value;
    let popUpShow = true;
    dispatch(
      listStatusUpdate(_id, listStatusUpdateDataInfo(inputValue), popUpShow)
    );
  };

  const listStatusUpdateDataInfo = (inputValue) => {
    return {
      status: inputValue,
    };
  };

  ///////// VACANCY FILTER

  const admissionListFilter = (e) => {
    let inputValue = e.target.value;
    admissionListFilterSwitch(inputValue);
  };

  const handleDeleteAdmission = (_id) => {
    dispatch(deleteAdmission(_id));
  };

  const admissionListFilterSwitch = (message) => {
    switch (message) {
      case "All":
        dispatch(getAdmissionList(users.user_institute));

        break;
      case "Low to High":
        dispatch(getFilterAdmission(users.user_institute, "noofseat", "lth"));

        break;
      case "High to Low":
        dispatch(getFilterAdmission(users.user_institute, "noofseat", "htl"));

        break;
      case "Recent to Oldest":
        dispatch(
          getFilterAdmission(users.user_institute, "lastapplydate", "otn")
        );

        break;
      case "Oldest to Recent":
        dispatch(
          getFilterAdmission(users.user_institute, "lastapplydate", "nto")
        );

        break;
      case "Active":
        dispatch(getFilterAdmission(users.user_institute, "status", "Active"));

        break;
      case "Inactive":
        dispatch(
          getFilterAdmission(users.user_institute, "status", "Inactive")
        );

        break;
      case "Closed":
        dispatch(getFilterAdmission(users.user_institute, "status", "Closed"));

        break;
      case "Expired":
        dispatch(getFilterAdmission(users.user_institute, "status", "Expired"));

        break;
      case "Saved":
        dispatch(getFilterAdmission(users.user_institute, "status", "Saved"));

        break;

      default:
        dispatch(getAdmissionList(users.user_institute));
    }
  };

  ////////// SEARCH HANDEL
  const [searchTerm, setSearchTerm] = useState("");

  const resetSearch = () => {
    setSearchTerm("");
    dispatch(getAdmissionList(users.user_institute));
  };

  let typing;

  const searchInputHandel = (evt) => {
    if (evt.target.value === "") {
      resetSearch();
    }
    clearTimeout(typing);
    typing = setTimeout(() => {
      setSearchTerm(evt.target.value);
    }, 400);
    if (!evt.target.value) {
      setSearchTerm("");
      clearTimeout(typing);
    }
  };
  useEffect(() => {
    dispatch(getSearchFilterAdmission(users.user_institute, searchTerm));
  }, [searchTerm, users, dispatch]);

  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        {/* <BreadcrumbItem to="/website-manage" title="Manage Website" /> */}
        <BreadcrumbItem to="/admission-list" title="Admission" />
      </Breadcrumb>
      <div className="PageTopHead PTH-AdminAdmission mt-20">
        <div className="PTH-Item">
          {admissionListSuccess ? (
            <p className="ManageVacancyCount">
              <span className="primary">{admissionlist.length}</span>
              {admissionlist.length > 1 ? "Admissions" : "Admission"}
            </p>
          ) : (
            <p className="ManageVacancyCount">
              <span className="primary"></span> Admission
            </p>
          )}
        </div>
        <div className="PTH-Item">
          <div className="SortByTableHeadCst">
            <label>Sort by</label>
            <select onChange={(e) => admissionListFilter(e)}>
              <option>All</option>
              <optgroup className="" label="Last Date to Apply">
                <option>Recent to Oldest</option>
                <option>Oldest to Recent</option>
              </optgroup>
              <optgroup className="" label="Status">
                <option>Active</option>
                <option>Inactive</option>
                <option>Closed</option>
                <option>Expired</option>
                <option>Saved</option>
              </optgroup>
            </select>
          </div>
        </div>
        <div className="PTH-Item P-Right">
          <SearchControl
            classNameWrappper="tableSearchbar"
            id="search"
            name="search"
            onChange={(evt) => searchInputHandel(evt)}
            onKeyUp={(evt) => searchInputHandel(evt)}
            placeholder="Type Title or Course / Classroom"
          />
        </div>
        <div className="PTH-Item P-Right">
          <AppLink
            to="/add-admission"
            className="button button-primary btn-oval btn-sm"
          >
            <i className="ed-icon icon-plus-add white i-xs"></i>Add Admission
          </AppLink>
        </div>
      </div>
      <SelectTitle type="admissionsSelect" />
      <div className="gridListTable">
        <ul className="gridHeader">
          <li className="col col-3">Admission For</li>
          <li className="col col-3">Seats & Applicants</li>
          <li className="col col-2">Application Deadline</li>
          <li className="col col-2">Status</li>
          <li className="col col-2">&nbsp;</li>
        </ul>
        <div className="gridBody">
          {admissionListSuccess ? (
            admissionlist.length > 0 ? (
              admissionlist.map((item) => {
                return (
                  <div className="gridRow" key={item._id}>
                    <ul className="topInfo">
                      <li className="col col-3" data-head="Admission For">
                        <div className="Details">
                          <div className="text-xs primary">{item.title}</div>
                          <div className="mt-3">{item.class}</div>
                        </div>
                      </li>
                      <li
                        className="col col-3"
                        data-head="Seats & Applicants"
                      >
                        <div className="Details">
                          <div className="">
                            <span>No. of Seat:&nbsp;</span>
                            {item.noOfSeats}
                          </div>
                          <div className="mt-3">
                            <span>Applicants:&nbsp;</span>
                            {item.applicants}
                          </div>
                        </div>
                      </li>
                      <li
                        className="col col-2"
                        data-head="Application Deadline"
                      >
                        {moment(item.lastApplyDate).format(
                          DATETIME_FORMAT_AP
                        )}
                      </li>
                      <li className="col col-2" data-head="Status">
                        {item.status === "Expired" ? (
                          <p>{item.status}</p>
                        ) : (
                          <div className="selectTextType">
                            <select
                              onChange={(e) =>
                                handelListStatusUpdate(e, item._id)
                              }
                              value={item.status}
                            >
                              <option>Active</option>
                              <option>Inactive</option>
                              <option>Closed</option>
                              <option hidden>Expired</option>
                              <option hidden>Saved</option>
                            </select>
                          </div>
                        )}
                      </li>
                      <li className="col col-2 actionCols">
                        <div className="actionBtn">
                          <AppLink
                            className="btn-square"
                            title="Details"
                            to={`/admission-detail/${item._id}`}
                          >
                            <span className="cssIcon">
                              <i className="ed-eye"></i>
                            </span>
                          </AppLink>
                          <button
                            className="btn-square"
                            title="Remove"
                            onClick={() =>
                              onClickBtnDropDownRemove(item._id, true)
                            }
                          >
                            <span className="cssIcon">
                              <i className="ed-trash"></i>
                            </span>
                          </button>
                        </div>
                        {item._id === admissionDelete && (
                          <div
                            ref={dropdownRef}
                            className={`popup removePopup ${isActive ? "active" : "inactive"
                              }`}
                          >
                            <p className="heading w-600 text-xs">
                              You are about to remove this admission.
                            </p>
                            <p className=" red sub-heading text-xxs">
                              Are you sure?
                            </p>
                            <div className="removePopBtn">
                              <button
                                className="button btn-o-silver dgray btn-sm"
                                onClick={() =>
                                  onClickBtnDropDownRemove(item._id, false)
                                }
                              >
                                Cancel
                              </button>
                              {admissionDeleteLoading ? (
                                <button className="button button-red btn-sm">
                                  Removing...
                                </button>
                              ) : (
                                <button
                                  className="button button-red btn-sm"
                                  onClick={() => {
                                    handleDeleteAdmission(item._id);
                                    onClickBtnDropDownRemove(item._id, false);
                                  }}
                                >
                                  Remove
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </li>
                    </ul>
                  </div>
                );
              })
            ) : (
              <NoDataAvailable title="No Records Found." />
            )
          ) : (
            <div className="loadingGridData">
              <i className="ed-loadingGrid"></i>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdmissionList;
