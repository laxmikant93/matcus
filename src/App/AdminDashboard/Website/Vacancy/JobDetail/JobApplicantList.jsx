import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getApplicantList,
  getFilterApplicant,
  getSearchFilterApplicant,
  applicantlistStatusUpdate,
  applicantStatusCheck,
} from "../../../../../store/actions/vacancy";
import { useParams } from "react-router-dom";
import moment from "moment";
import { DATETIME_FORMAT_AP } from "../../../../../Constant/constants";
import VacancyDetailHoc from "./VacancyDetailHoc";
// import { useDetectOutsideClick } from "../../../../Common/DetectOutsideClick/useDetectOutsideClick";
import UseOutsideClick from "../../../../../Common/UseOutsideClick";
import "./JobDetail.scss";
import SearchControl from "../../../../../Common/SearchControl";
import NoDataAvailable from "../../../../../Common/NoDataAvailable";
const JobApplicantList = () => {
  const [toggle, setTogget] = useState(-1);
  const [ViewDetails, SetViewDetails] = useState();

  const ViewDetail = (id, active) => {
    if (toggle) {
      SetViewDetails(ViewDetails === id ? -1 : id);
      setTogget(active === id ? -1 : id);
    }
    // else {
    //   SetViewDetails(id);
    //   setTogget(active === id ? -1 : id);
    // }
  };

  const dispatch = useDispatch();
  const { id } = useParams();

  const { users, applicantlist, applicantListSuccess, businesstype } = useSelector(
    (state) => {
      return {
        users: state.user,
        businesstype: state.user.user_business_type,
        applicantlist: state.vacancy.applicant.data,
        applicantListSuccess: state.vacancy.applicant.success,
      };
    }
  );

  useEffect(() => {
    dispatch(getApplicantList(users.user_institute, id, businesstype));
  }, [dispatch, users, id]);

  const applicantListFilter = (e) => {
    let inputValue = e.target.value;
    applicantListFilterSwitch(inputValue);
  };

  const applicantListFilterSwitch = (message) => {
    switch (message) {
      case "All":
        dispatch(getApplicantList(users.user_institute, id, businesstype));

        break;
      case "Low to High":
        dispatch(
          getFilterApplicant(users.user_institute, id, "qualification", "lth", businesstype)
        );

        break;
      case "High to Low":
        dispatch(
          getFilterApplicant(users.user_institute, id, "qualification", "htl", businesstype)
        );
        break;
      case "Recent to Old":
        dispatch(
          getFilterApplicant(users.user_institute, id, "applied", "rto", businesstype)
        );

        break;
      case "Old to Recent":
        dispatch(
          getFilterApplicant(users.user_institute, id, "applied", "otr", businesstype)
        );

        break;

      case "Shortlist":
        dispatch(
          getFilterApplicant(users.user_institute, id, "status", "Shortlist", businesstype)
        );

        break;
      case "Accepted":
        dispatch(
          getFilterApplicant(users.user_institute, id, "status", "Accepted", businesstype)
        );

        break;
      case "Rejected":
        dispatch(
          getFilterApplicant(users.user_institute, id, "status", "Rejected", businesstype)
        );

        break;
      case "Saved in List":
        dispatch(
          getFilterApplicant(users.user_institute, id, "status", "Applied", businesstype)
        );

        break;

      default:
        dispatch(getApplicantList(users.user_institute, id, businesstype));
    }
  };
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
    dispatch(getApplicantList(users.user_institute, id, businesstype));
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
        getSearchFilterApplicant(
          users.user_institute,
          id,
          searchTerm.SearchTerm.value,
          businesstype
        )
      );
    }, 800);
    if (!evt.target.value) {
      clearTimeout(typing);
    }
  };

  const handelListStatusUpdate = (e, _id) => {
    let inputValue = e.target.value;
    dispatch(
      applicantlistStatusUpdate(_id, listStatusUpdateDataInfo(inputValue))
    );
  };

  const listStatusUpdateDataInfo = (inputValue) => {
    return {
      isStatus: inputValue,
      industry: businesstype,
      emailNotify: "No",
    };
  };

  const [VacancyDelete, SetVacancyDelete] = useState(false);
  const [VacancyId, SetVacancyid] = useState();
  const DropCheckToggleRef = useRef();

  const onClickNotifyCheckbox = (_id) => {
    SetVacancyDelete(!VacancyDelete);
    SetVacancyid(_id);
  };
  UseOutsideClick(DropCheckToggleRef, () => {
    if (VacancyDelete) SetVacancyDelete(false);
  });

  const StatusCheck = (_id) => {
    dispatch(applicantStatusCheck(_id, emailNotifyCheck()));
  };

  const emailNotifyCheck = () => {
    return {
      emailNotify: "Yes",
      industry: businesstype
    };
  };

  const notifyAgain = (_id) => {
    dispatch(applicantStatusCheck(_id, emailNotifyCheck()));
  };

  return (
    <VacancyDetailHoc>
      <React.Fragment>
        <div className="PageTopHead PTH-VacancyApplicantsList mt-20">
          <div className="PTH-Item">
            {applicantListSuccess ? (
              <p className="ManageVacancyCount">
                <span className="primary">{applicantlist.length}</span>{" "}
                {applicantlist.length < 1 ? "Applicant" : "Applicants"}
              </p>
            ) : (
              <p className="ManageVacancyCount">
                <span className="primary"></span> Applicant
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
                  <option>Shortlist</option>
                  <option>Accepted</option>
                  <option>Rejected</option>
                  <option value="Saved in List">Applied</option>
                </optgroup>
              </select>
            </div>
          </div>
          <div className="PTH-Item P-Right">
            <SearchControl
              classNameWrappper="tableSearchbar"
              id="search"
              name="search"
              onKeyUp={(evt) => searchInputHandel(evt)}
              onChange={(evt) => searchInputHandel(evt)}
              placeholder="Type Name or Qualification"
            />
          </div>
        </div>
        <div className="gridListTable">
          <ul className="gridHeader">
            <li className="col col-4">Applicant's Name</li>
            <li className="col col-4">Applied on</li>
            <li className="col col-2">Status</li>
            <li className="col col-2">Email Status</li>
          </ul>
          <div className="gridBody" ref={DropCheckToggleRef}>
            {applicantListSuccess ? (
              applicantlist.length > 0 ? (
                applicantlist.map((item) => {
                  return (
                    <React.Fragment>
                      <div className="gridRow" key={item._id}>
                        <ul className="topInfo">
                          <li
                            className="col col-4"
                            data-head="Applicant's Name"
                          >
                            <div className="profileDetails">
                              <div className="profile-name">
                                {item.fullname}
                              </div>
                              <div className="mt-3">
                                <span>Qualification&nbsp;</span>
                                {item.qualification}
                              </div>
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
                          <li className="col col-4" data-head="Applied on">
                            {moment(item.createdAt).format(DATETIME_FORMAT_AP)}
                          </li>
                          <li className="col col-2" data-head="Status">
                            {item.isStatus === "Accepted" &&
                              item.emailNotify === "Yes" ? (
                              "Accepted"
                            ) : (
                              <>
                                {item.isStatus === "Rejected" &&
                                  item.emailNotify === "Yes" ? (
                                  "Rejected"
                                ) : (
                                  <div className="selectTextType">
                                    <select
                                      className=""
                                      onChange={(e) =>
                                        handelListStatusUpdate(e, item._id)
                                      }
                                      value={item.isStatus}
                                    >
                                      <option hidden>Applied</option>
                                      <option>Shortlist</option>
                                      <option>Accepted</option>
                                      <option>Rejected</option>
                                    </select>
                                  </div>
                                )}
                              </>
                            )}
                          </li>
                          <li className="col col-2" data-head="Email Status">
                            {item.isStatus === "Applied" ? (
                              ""
                            ) : (
                              <React.Fragment>
                                {(item.isStatus === "Shortlist" || item.isStatus === "Rejected" || item.isStatus === "Accepted") &&
                                  item.emailNotify === "No" ? (
                                  <div className="input-custom-type">
                                    <label className="small">
                                      <input
                                        type="checkbox"
                                        onChange={() => StatusCheck(item._id)}
                                        checked={item.emailNotify === "yes"}
                                      />
                                      Notify
                                    </label>
                                  </div>
                                ) : (
                                  <React.Fragment>
                                    {item.emailNotify === "Yes" ? (
                                      <React.Fragment>
                                        <div className="input-custom-type">
                                          <label className="small">
                                            <input
                                              type="checkbox"
                                              onChange={() =>
                                                onClickNotifyCheckbox(item._id)
                                              }
                                              checked={true}
                                            />
                                            Notified
                                          </label>
                                        </div>
                                        <p
                                          className="btnText primary text-left mt-8"
                                          onClick={() => notifyAgain(item._id)}
                                        >
                                          Notify again
                                        </p>
                                      </React.Fragment>
                                    ) : (
                                      <React.Fragment>
                                        <div className="input-custom-type VacancyNotifyInput">
                                          <label className="small">
                                            <input
                                              type="checkbox"
                                              onChange={() =>
                                                onClickNotifyCheckbox(
                                                  item._id,
                                                  true
                                                )
                                              }
                                              checked={
                                                item._id === VacancyId &&
                                                VacancyDelete
                                              }
                                            />
                                            Notify
                                          </label>

                                          {item._id === VacancyId &&
                                            VacancyDelete && (
                                              <div
                                                className="Popup RemovePopup"
                                              // ref={DropCheckToggleRef}
                                              >
                                                <p className="heading">
                                                  You are about to notify this
                                                  applicant.
                                                </p>
                                                <p className="sub-heading">
                                                  Are you sure?
                                                </p>
                                                <div className="RemovePopBtn">
                                                  <button
                                                    className="button btn-o-silver dgray btn-sm"
                                                    onClick={() =>
                                                      SetVacancyDelete(
                                                        !VacancyDelete
                                                      )
                                                    }
                                                  >
                                                    Cancel
                                                  </button>
                                                  <button
                                                    className="button button-red btn-sm"
                                                    onClick={() =>
                                                      StatusCheck(
                                                        item._id,
                                                        true
                                                      )
                                                    }
                                                  >
                                                    Notify
                                                  </button>
                                                </div>
                                              </div>
                                            )}
                                        </div>
                                      </React.Fragment>
                                    )}
                                  </React.Fragment>
                                )}
                              </React.Fragment>
                            )}
                          </li>
                        </ul>
                        {item._id === ViewDetails && toggle && (
                          <ul className="topInfo">
                            <li className="col col-3">
                              <div className="Details">
                                <div className="text-xxs">Email</div>
                                <div className="text-xs w-600 mt-3">
                                  {item.email}
                                </div>
                              </div>
                            </li>
                            <li className="col col-3">
                              <div className="Details">
                                <div className="text-xxs">Contact</div>
                                <div className="text-xs w-600 mt-3">
                                  {item.contact}
                                </div>
                              </div>
                            </li>

                            <li className="col col-3">
                              <div className="Details">
                                <div className="text-xxs">Experience</div>
                                <div className="text-xs w-600 mt-3">
                                  {item.experience}
                                </div>
                              </div>
                            </li>

                            <li className="col col-3">
                              <div className="Details">
                                <div className="text-xxs">Current Location</div>
                                <div className="text-xs w-600 mt-3">
                                  {item.address}
                                </div>
                              </div>
                            </li>
                            {item.fileUpload ? (
                              <li className="col col-3">
                                <div className="Details">
                                  <div className="text-xxs">Attached CV</div>

                                  <a
                                    className="primary mt-3"
                                    href={item.fileUpload}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                  >
                                    Download
                                  </a>
                                </div>
                              </li>
                            ) : (
                              ""
                            )}
                          </ul>
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
      </React.Fragment>
    </VacancyDetailHoc>
  );
};

export default JobApplicantList;
