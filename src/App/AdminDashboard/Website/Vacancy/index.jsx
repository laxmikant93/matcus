import React, { useEffect, useRef, useState } from "react";
import GrayAuthTheme from "../../../../Common/Theme/GrayAuthTheme";
import AppLink from "../../../../Common/AppLink";
import { useDetectOutsideClick } from "../../../../Common/DetectOutsideClick/useDetectOutsideClick";
import Breadcrumb from "../../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../../Common/Breadcrumb/BreadcrumbItem";
import SelectTitle from "../../../../Common/SectionTitle";
import {
  getVacancyList,
  deleteVacancy,
  listStatusUpdate,
  getFilterVacancy,
  getSearchFilterVacancy,
  updateSelectionReset,
  updateVacancyReset,
} from "../../../../store/actions/vacancy";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import "./Vacancy.scss";
import SearchControl from "../../../../Common/SearchControl";
import NoDataAvailable from "../../../../Common/NoDataAvailable";
const VacancyList = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [vacancyDelete, setVacancyDelete] = useState("");

  const onClickBtnDropDownRemove = (_id, isActive) => {
    setVacancyDelete(_id);
    setIsActive(isActive);
  };

  /////// USE SELECTOR & USE EFFECT

  const { users, vacancylist, vacancyListSuccess, vacancyListDelete, businesstype } =
    useSelector((state) => {
      return {
        users: state.user,
        businesstype: state.user.user_business_type,
        vacancylist: state.vacancy.list.data,
        vacancyListSuccess: state.vacancy.list.success,
        vacancyListDelete: state.vacancy.delete.loading,
      };
    });

  useEffect(() => {
    dispatch(getVacancyList(users.user_institute, businesstype,
    ));
    dispatch(updateSelectionReset());
    dispatch(updateVacancyReset());
  }, [dispatch, users]);

  /////////// VACANCY DELETE

  const handleDeleteVacancy = (_id) => {
    dispatch(deleteVacancy(_id, businesstype));
  };

  /////////// VACANCY LIST STATUS

  const handelListStatusUpdate = (e, _id) => {
    let inputValue = e.target.value;
    let popUpShow = true;
    dispatch(
      listStatusUpdate(_id, listStatusUpdateDataInfo(inputValue), popUpShow)
    );
  };

  const listStatusUpdateDataInfo = (inputValue) => {
    return {
      isStatus: inputValue,
      industry: businesstype
    };
  };

  ///////// VACANCY FILTER

  const vacancyListFilter = (e) => {
    // if (!sortDispatchLoading) {
    let inputValue = e.target.value;
    vacancyListFilterSwitch(inputValue);
    // }
  };

  const vacancyListFilterSwitch = (message) => {
    switch (message) {
      case "All":
        dispatch(getVacancyList(users.user_institute, businesstype));

        break;
      case "Low to High":
        dispatch(getFilterVacancy(users.user_institute, "noofopening", "lth", businesstype));

        break;
      case "High to Low":
        dispatch(getFilterVacancy(users.user_institute, "noofopening", "htl", businesstype));

        break;
      case "Part Time":
        dispatch(
          getFilterVacancy(users.user_institute, "positiontype", "Part Time", businesstype)
        );

        break;
      case "Full Time":
        dispatch(
          getFilterVacancy(users.user_institute, "positiontype", "Full Time", businesstype)
        );

        break;
      case "Internship":
        dispatch(
          getFilterVacancy(users.user_institute, "positiontype", "Internship", businesstype)
        );

        break;
      case "Contractual":
        dispatch(
          getFilterVacancy(users.user_institute, "positiontype", "Contractual", businesstype)
        );

        break;
      case "Zero Contract":
        dispatch(
          getFilterVacancy(
            users.user_institute,
            "positiontype",
            "Zero Contract",
            businesstype
          )
        );

        break;
      case "Trainee":
        dispatch(
          getFilterVacancy(users.user_institute, "positiontype", "Trainee", businesstype)
        );

        break;
      case "Volunteer":
        dispatch(
          getFilterVacancy(users.user_institute, "positiontype", "Volunteer", businesstype)
        );

        break;
      case "Active":
        dispatch(getFilterVacancy(users.user_institute, "status", "Active", businesstype));

        break;
      case "Inactive":
        dispatch(getFilterVacancy(users.user_institute, "status", "Inactive", businesstype));

        break;
      case "Closed":
        dispatch(getFilterVacancy(users.user_institute, "status", "Closed", businesstype));

        break;
      case "Expired":
        dispatch(getFilterVacancy(users.user_institute, "status", "Expired", businesstype));

        break;
      case "Saved":
        dispatch(getFilterVacancy(users.user_institute, "status", "Saved", businesstype));

        break;

      default:
        dispatch(getVacancyList(users.user_institute, businesstype));
    }
  };

  ////////// SEARCH HANDEL
  const [searchTerm, setSearchTerm] = useState({
    SearchTerm: {
      value: "",
    },
  });

  const resetSearch = () => {
    let SearchData = {
      ...searchTerm,
      SearchTerm: {
        value: "",
      },
    };
    setSearchTerm(SearchData);
    dispatch(getVacancyList(users.user_institute, businesstype));
  };

  let typing;

  const searchInputHandel = (evt) => {
    if (evt.target.value === "") {
      resetSearch();
    }
    let SearchData = {
      ...searchTerm,
      SearchTerm: {
        value: evt.target.value,
      },
    };
    setSearchTerm(SearchData);
    clearTimeout(typing);
    typing = setTimeout(() => {
      dispatch(
        getSearchFilterVacancy(
          users.user_institute,
          searchTerm.SearchTerm.value,
          businesstype
        )
      );
    }, 800);
    if (!evt.target.value) {
      clearTimeout(typing);
    }
  };
  /////////// EDIT VACANCY
  const EditJobDetails = (item) => {
    history(`/job-detail/${item._id}`);
  };


  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        {/* <BreadcrumbItem to="/website-manage" title="Manage Website" /> */}
        <BreadcrumbItem to="/vacancy-list" title="Vacancy" />
      </Breadcrumb>
      <div className="PageTopHead PTH-Vacancy mt-30">
        <div className="PTH-Item">
          {vacancyListSuccess ? (
            <>
              {vacancylist ? (
                <div className="ManageVacancyCount">
                  <span className="primary">{vacancylist.length}</span>
                  {vacancylist.length > 1 ? "Vacancies" : "Vacancy"}
                </div>
              ) : (
                ""
              )}
            </>
          ) : (
            <p className="ManageVacancyCount">
              <span className="primary"></span> Vacancy
            </p>
          )}
        </div>
        <div className="PTH-Item">
          <div className="SortByTableHeadCst">
            <label>Sort by</label>
            <select onChange={(e) => vacancyListFilter(e)}>
              <option>All</option>
              <optgroup className="" label="No. of Opening">
                <option>Low to High</option>
                <option>High to Low</option>
              </optgroup>
              <optgroup className="" label="Position Type">
                <option>Full Time</option>
                <option>Part Time</option>
                <option>Internship</option>
                <option>Contractual</option>
                <option>Zero Contract</option>
                <option>Trainee</option>
                <option>Volunteer</option>
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
            placeholder="Type Job title or Qualification"
          />
        </div>
        <div className="PTH-Item P-Right">
          <AppLink
            to="/post-job"
            className="button button-primary btn-oval btn-sm"
          >
            <i className="ed-icon icon-plus-add white i-xs"></i>Post Job
          </AppLink>
        </div>
      </div>
      <SelectTitle type="vacanciesSelect" />
      <div className="gridListTable">
        <ul className="gridHeader">
          <li className="col col-3">Job Title</li>
          <li className="col col-3">No. of Openings & Type</li>
          <li className="col col-2">Applicants</li>
          <li className="col col-2">Status</li>
          <li className="col col-2">&nbsp;</li>
        </ul>
        <div className="gridBody">
          {vacancyListSuccess ? (
            vacancylist.length > 0 ? (
              vacancylist.map((item) => {
                return (
                  <div className="gridRow" key={item._id}>
                    <ul className="topInfo">
                      <li className="col col-3" data-head="Job Title">
                        <div className="Details">
                          <div className="text-xs w-600 primary">
                            {item.title}
                          </div>
                          <div className="mt-3">{item.qualification}</div>
                        </div>
                      </li>
                      <li
                        className="col col-3"
                        data-head="No. of Opening & Type"
                      >
                        <div className="Details">
                          <div className="">{item.noOfPosition}</div>
                          <div className="mt-3">{item.position}</div>
                        </div>
                      </li>
                      {/* <td data-head="Position Type"></td> */}
                      <li className="col col-2" data-head="Applicants">
                        {item.applicants}
                      </li>
                      <li className="col col-2" data-head="Status">
                        {item.isStatus === "Expired" ? (
                          <p>Expired</p>
                        ) : (
                          // <div className="selectTextType">
                          //   <select
                          //     onChange={(e) =>
                          //       handelListStatusUpdate(e, item._id)
                          //     }
                          //     value={item.isStatus}
                          //   >
                          //     <option>Active</option>
                          //     <option>Inactive</option>
                          //     <option>Closed</option>
                          //     <option hidden>Expired</option>
                          //     <option hidden>Saved</option>
                          //   </select>
                          // </div>
                          <div className="selectTextType">
                            <select
                              onChange={(e) =>
                                handelListStatusUpdate(e, item._id)
                              }
                              value={item.isStatus}
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
                          <button
                            className="btn-square"
                            title="Job Details"
                            onClick={() => EditJobDetails(item)}
                          >
                            <span className="cssIcon">
                              <i className="ed-eye"></i>
                            </span>
                          </button>
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
                          </button>{" "}
                          {/* <AppLink to={`/job-detail/${item._id}`}>Job Details</AppLink> */}
                        </div>
                        {item._id === vacancyDelete && (
                          <div
                            ref={dropdownRef}
                            className={`popup removePopup ${isActive ? "active" : "inactive"
                              }`}
                          >
                            <p className="heading text-xs w-600">
                              You are about to remove this vacancy.
                            </p>
                            <p className="sub-heading  red ">Are you sure?</p>
                            <div className="removePopBtn">
                              <button
                                className="button btn-o-silver dgray btn-sm"
                                onClick={() =>
                                  onClickBtnDropDownRemove(item._id, false)
                                }
                              >
                                Cancel
                              </button>
                              {vacancyListDelete ? (
                                <button className="button button-red btn-sm">
                                  Removing...
                                </button>
                              ) : (
                                <button
                                  className="button button-red btn-sm"
                                  onClick={() => {
                                    handleDeleteVacancy(item._id);
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
              <tr className="mx-0 text-center">
                <td colSpan="5">
                  <NoDataAvailable title="No Records Found." />
                </td>
              </tr>
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

export default VacancyList;
