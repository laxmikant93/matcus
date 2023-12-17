import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getApplicantList,
  getFilterApplicant,
  getSearchFilterApplicant,
  applicantlistStatusUpdate,
} from "../../../../../store/actions/admission";
import { useParams } from "react-router-dom";
import moment from "moment";
import { DATETIME_FORMAT_AP } from "../../../../../Constant/constants";
import AdmissionDetailHoc from "./AdmissionDetailHoc";
import SearchControl from "../../../../../Common/SearchControl";
import NoDataAvailable from "../../../../../Common/NoDataAvailable";
const AdmissionApplicantList = () => {
  const [toggle, setTogget] = useState(false);
  const [ViewDetails, SetViewDetails] = useState();

  const ViewDetail = (id, active) => {
    if (ViewDetails === id) {
      SetViewDetails("");
      setTogget(false);
    } else if (ViewDetails !== id) {
      SetViewDetails(id);
      setTogget(true);
    } else {
      SetViewDetails(id);
      setTogget(active);
    }

  };
  const dispatch = useDispatch();
  const { id } = useParams();

  const { users, applicantlist, applicantListSuccess } = useSelector(
    (state) => {
      return {
        users: state.user,
        applicantlist: state.admission.applicant.data,
        applicantListSuccess: state.admission.applicant.success,
      };
    }
  );

  useEffect(() => {
    dispatch(getApplicantList(users.user_institute, id));
  }, [dispatch, users, id]);

  const applicantListFilter = (e) => {
    let inputValue = e.target.value;
    applicantListFilterSwitch(inputValue);
  };

  const applicantListFilterSwitch = (message) => {
    switch (message) {
      case "All":
        dispatch(getApplicantList(users.user_institute, id));

        break;
      case "Low to High":
        dispatch(
          getFilterApplicant(users.user_institute, id, "qualification", "lth")
        );

        break;
      case "High to Low":
        dispatch(
          getFilterApplicant(users.user_institute, id, "qualification", "htl")
        );

        break;
      case "Recent to Old":
        dispatch(
          getFilterApplicant(users.user_institute, id, "applied", "rto")
        );

        break;
      case "Old to Recent":
        dispatch(
          getFilterApplicant(users.user_institute, id, "applied", "otr")
        );

        break;
      case "Shortlist":
        dispatch(
          getFilterApplicant(users.user_institute, id, "status", "Shortlist")
        );

        break;
      case "Accepted":
        dispatch(
          getFilterApplicant(users.user_institute, id, "status", "Accepted")
        );

        break;
      case "Rejected":
        dispatch(
          getFilterApplicant(users.user_institute, id, "status", "Rejected")
        );

        break;
      case "Saved in List":
        dispatch(
          getFilterApplicant(users.user_institute, id, "status", "Applied")
        );

        break;

      default:
        dispatch(getApplicantList(users.user_institute, id));
    }
  };
  const [searchTerm, setSearchTerm] = useState("");

  const resetSearch = () => {
    setSearchTerm("");
    dispatch(getApplicantList(users.user_institute, id));
  };

  let typing;

  const searchInputHandel = (evt) => {
    if (evt.target.value === "") {
      resetSearch();
    }
    clearTimeout(typing);
    typing = setTimeout(() => {
      setSearchTerm(evt.target.value);
    }, 800);
    if (!evt.target.value) {
      setSearchTerm("");
      clearTimeout(typing);
    }
  };

  useEffect(() => {
    dispatch(getSearchFilterApplicant(users.user_institute, id, searchTerm));
  }, [searchTerm, dispatch, users, id]);

  const handelListStatusUpdate = (e, _id) => {
    let inputValue = e.target.value;
    dispatch(
      applicantlistStatusUpdate(_id, listStatusUpdateDataInfo(inputValue))
    );
  };

  const listStatusUpdateDataInfo = (inputValue) => {
    return {
      status: inputValue,
    };
  };

  const calculate_age = (dob1) => {
    var today = new Date();
    var birthDate = new Date(dob1); // create a date object directly from `dob1` argument
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }
    return age_now;
  };

  return (
    <AdmissionDetailHoc>
      <div className="PageTopHead PTH-AdmissionApplicantsList mt-20">
        <div className="PTH-Item">
          {applicantListSuccess ? (
            <p className="ManageVacancyCount">
              <span className="primary">{applicantlist.length}</span>{" "}
              {applicantlist.length < 1 ? "Applicant" : "Applicants"}
            </p>
          ) : (
            <p className="ManageAdmissionCount">
              <span className="primary"></span> Admission
            </p>
          )}
        </div>
        <div className="PTH-Item">
          <div className="SortByTableHeadCst">
            <label>Sort by</label>
            <select onChange={(e) => applicantListFilter(e)}>
              <option>All</option>
              <optgroup className="" label="Qualification">
                <option>Low to High</option>
                <option>High to Low</option>
              </optgroup>
              <optgroup className="" label="Applied on">
                <option>Recent to Old</option>
                <option>Old to Recent</option>
              </optgroup>
              <optgroup className="" label="Status">
                <option>Accepted</option>
                <option>Rejected</option>
                <option>Shortlist</option>
                <option value="Saved in List">Applied</option>
              </optgroup>
            </select>
          </div>
        </div>
        <div className="PTH-Item P-Right">
          <SearchControl
            classNameWrappper="tableSearchbar"
            id="search"
            onKeyUp={(evt) => searchInputHandel(evt)}
            onChange={(evt) => searchInputHandel(evt)}
            name="search"
            placeholder="Type Name or Qualification"
          />
        </div>
      </div>
      <div className="gridListTable">
        <ul className="gridHeader">
          <li className="col col-4">Applicant's Name</li>
          <li className="col col-3">Qualification & Age</li>
          <li className="col col-3">Applied on</li>
          <li className="col col-2">Status</li>
        </ul>
        <div className="gridBody">
          {applicantListSuccess ? (
            applicantlist.length > 0 ? (
              applicantlist.map((item) => {
                return (
                  <React.Fragment>
                    <div className="gridRow" key={item._id}>
                      <ul className="topInfo">
                        <li className="col col-4" data-head="Applicant's Name">
                          <div className="profileDetails">
                            <div className="profile-name">{item.fullname}</div>
                            <div className="mt-3">
                              <button
                                className={`btnText BtnCaret text-xxs w-300${item._id === ViewDetails && toggle
                                  ? "active"
                                  : ""
                                  }`}
                                onClick={() => ViewDetail(item._id, !toggle)}
                              >
                                View Detail
                              </button>
                            </div>
                          </div>
                        </li>
                        <li
                          className="col col-3"
                          data-head="Qualification & Age"
                        >
                          <div className="Details">
                            <div className="">
                              <span></span>
                              {item.qualification}
                            </div>
                            <div className="mt-3">
                              <span>Age:&nbsp;</span>
                              {calculate_age(item.dob)} Years
                            </div>
                          </div>
                        </li>
                        <li className="col col-3" data-head="Applied on">
                          {moment(item.createdAt).format(DATETIME_FORMAT_AP)}
                        </li>
                        <li className="col col-2" data-head="Status">
                          <div className="selectTextType">
                            <select
                              className="secondary"
                              onChange={(e) =>
                                handelListStatusUpdate(e, item._id)
                              }
                              value={item.status}
                            >
                              <option hidden>Applied</option>
                              <option>Shortlist</option>
                              <option>Accepted</option>
                              <option>Rejected</option>
                            </select>
                          </div>
                        </li>
                      </ul>
                      {item._id === ViewDetails && toggle && (
                        <React.Fragment>
                          <ul className="topInfo">
                            <li className="col col-4">
                              <div className="Details">
                                <p className="text-xs">Email</p>
                                <p className="text-regf w-600 mt-3">
                                  {item.email}
                                </p>
                              </div>
                            </li>
                            <li className="col col-4">
                              <div className="Details">
                                <p className="text-xs">Contact</p>
                                <p className="text-regf w-600 mt-3">
                                  {item.contact}
                                </p>
                              </div>
                            </li>
                            <li className="col col-4">
                              <div className="Details">
                                <p className="text-xs">Current Location</p>
                                <p className="text-regf w-600 mt-3">
                                  {item.address}
                                </p>
                              </div>
                            </li>
                          </ul>
                          <ul className="topInfo">
                            {item.photo && <li className="col col-4">
                              <div className="Details">
                                {/* <p className="text-xs">Uploaded Photo</p> */}
                                <p className="text-regf w-600 mt-3">
                                  <a href={item.photo} target="_blank" rel="noreferrer" className="text-xs">
                                    Uploaded Photo
                                  </a>
                                </p>
                              </div>
                            </li>}
                            {
                              item.attachment && <li className="col col-4">
                                <div className="Details">
                                  {/* <p className="text-xs">Uploaded Attachment</p> */}
                                  <p className="text-regf w-600 mt-3">
                                    <a href={item.attachment} target="_blank" rel="noreferrer" className="text-xs">
                                      Uploaded Attachment
                                    </a>
                                  </p>
                                </div>
                              </li>
                            }


                          </ul>
                        </React.Fragment>
                      )}
                    </div>
                  </React.Fragment>
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
    </AdmissionDetailHoc>
  );
};

export default AdmissionApplicantList;
