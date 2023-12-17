import React, { useState, useRef, useEffect } from "react";
import GrayAuthTheme from "../../../../Common/Theme/GrayAuthTheme";
import AppLink from "../../../../Common/AppLink";
import Breadcrumb from "../../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../../Common/Breadcrumb/BreadcrumbItem";
import SelectTitle from "../../../../Common/SectionTitle";
import { useDispatch, useSelector } from "react-redux";
import { useDetectOutsideClick } from "../../../../Common/DetectOutsideClick/useDetectOutsideClick";
import {
  getFaq,
  deleteFaq,
  updateFaq,
  searchFaq,
  statusInActive,
  statusActive,
  featuredNotMarked,
  featuredMarked,
  setSingleFaqData,
} from "../../../../store/actions/Faq";
import EditFaq from "./EditFaq";
import SearchControl from "../../../../Common/SearchControl";
import NoDataAvailable from "../../../../Common/NoDataAvailable";
const FaqsList = () => {
  const dispatch = useDispatch();
  const InsID = useSelector((state) => state.user.user_institute);
  const faqList = useSelector((state) => state.faq.faqList.data);
  const isFaqAvailable = useSelector((state) => state.faq.faqList.success);
  const { user } = useSelector((state) => {
    return {
      user: state.user
    }
  })
  const dropdownRef = useRef(null);
  const [questonId, setQuestonId] = useState("");
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [modalStateEdit, setModalStateEdit] = useState(false);

  useEffect(() => {
    dispatch(getFaq(InsID, user.user_business_type));
  }, [dispatch, InsID, user.user_business_type]);

  // handle POPUP
  const onClickBtnDropDownRemove = (_id, isActive) => {
    setQuestonId(_id);
    setIsActive(isActive);
  };

  const manageModalEdit = () => {
    setModalStateEdit(!modalStateEdit);
  };

  const editPopup = (allData) => {
    manageModalEdit();
    // setModalStateEdit(true);
    dispatch(setSingleFaqData(allData));
  };

  const closePopup = () => {
    setModalStateEdit(false);
  };

  // handle Search
  const [searchTerm, setSearchTerm] = useState("");
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
    dispatch(searchFaq(InsID, searchTerm, user.user_business_type));
  }, [dispatch, InsID, searchTerm, user.user_business_type]);

  // Remove Faq
  const removeFaq = (id, isActive) => {
    dispatch(deleteFaq(id, user.user_business_type));
    closePopup();
    setIsActive(isActive);
  };

  let [ftMarked, setFtMarked] = useState("");
  let [ftMarkedId, setFtMarkedId] = useState("");

  // handle DROPDOWN
  const handleFeature = (id, e) => {
    setFtMarked(e.target.value);
    setFtMarkedId(id);
    let featureData = {
      isFeatureMarked: e.target.value,
    };

    dispatch(updateFaq(id, featureData, user.user_business_type));
  };

  let [status, setStatus] = useState("");
  let [statusId, setStatusId] = useState("");

  const handleStatus = (id, e) => {
    setStatus(e.target.value);
    setStatusId(id);
    let activeStatus = {
      isStatus: e.target.value,
    };

    dispatch(updateFaq(id, activeStatus, user.user_business_type));
  };

  const handleSort = (e) => {
    let selectDropdown = e.target.value;

    switch (selectDropdown) {
      case "all": {
        dispatch(getFaq(InsID, user.user_business_type));
        break;
      }
      case "Active": {
        dispatch(statusActive(InsID, user.user_business_type));
        break;
      }
      case "Inactive": {
        dispatch(statusInActive(InsID, user.user_business_type));
        break;
      }
      case "Yes": {
        dispatch(featuredMarked(InsID, user.user_business_type));
        break;
      }
      case "No": {
        dispatch(featuredNotMarked(InsID, user.user_business_type));
        break;
      }
      default:
        dispatch(getFaq(InsID, user.user_business_type));
    }
  };

  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        {/* <BreadcrumbItem to="/website-manage" title="Manage Website" /> */}
        <BreadcrumbItem to="/manage-faqs" title="Manage FAQs" />
      </Breadcrumb>
      <div className="PageTopHead PTH-ManageFaqs mt-20">
        <div className="PTH-Item">
          <div className="ManageFaqsCount">
            <span className="primary">
              {isFaqAvailable && faqList.length}
            </span>
            FAQs
          </div>
        </div>
        <div className="PTH-Item">
          <div className="SortByTableHeadCst">
            <label>Sort by</label>
            <select onChange={(e) => handleSort(e)}>
              <option>All</option>
              <optgroup className="" label="Featured">
                <option>Yes</option>
                <option>No</option>
              </optgroup>
              <optgroup className="" label="Status">
                <option>Active</option>
                <option>Inactive</option>
              </optgroup>
            </select>
          </div>
        </div>
        <div className="PTH-Item P-Right">
          <SearchControl
            classNameWrappper="tableSearchbar"
            id="search"
            name="search"
            placeholder="Type Your Question"
            onChange={handleSearch}
          />
        </div>
        <div className="PTH-Item P-Right">
          <AppLink
            to="/add-faqs"
            className="button button-primary btn-oval btn-sm button-block"
          >
            <i className="ed-icon icon-plus-add white i-xs"></i>Add Faq
          </AppLink>
        </div>
      </div>
      <SelectTitle type="faqSelect" />
      <div className="gridListTable">
        <ul className="gridHeader">
          <li className="col col-4">Question</li>
          <li className="col col-3">Featured</li>
          <li className="col col-3">Status</li>
          <li className="col col-2">&nbsp;</li>
        </ul>
        <div className="gridBody">
          {isFaqAvailable && faqList.length ? (
            faqList.map((item) => {
              return (
                <div className="gridRow" key={item._id}>
                  <ul className="topInfo">
                    <li className="col col-4" data-head="Question">
                      <div className="Details">
                        <div className="text-xs w-600 primary">
                          {item.title}
                        </div>
                        <div className="mt-3 sun-editor-output"
                          dangerouslySetInnerHTML={{
                            __html:
                              item.description
                          }}
                        >
                        </div>
                        {/* <div className="mt-3">{item.description}</div> */}
                      </div>
                    </li>
                    <li className="col col-3" data-head="Featured Marked">
                      <div className="selectTextType">
                        <select
                          value={
                            ftMarked && ftMarkedId === item._id
                              ? ftMarked
                              : item.isFeatureMarked
                          }
                          onChange={(e) => handleFeature(item._id, e)}
                        >
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </div>
                    </li>
                    <li className="col col-3" data-head="Status">
                      <div className="selectTextType">
                        <select
                          value={
                            status && statusId === item._id
                              ? status
                              : item.isStatus
                          }
                          onChange={(e) => handleStatus(item._id, e)}
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">InActive</option>
                        </select>
                      </div>
                    </li>
                    <li className="col col-2 actionCols">
                      <div className="actionBtn">
                        <button
                          className="btn-square"
                          title="Edit"
                          onClick={() => editPopup(item)}
                        >
                          <span className="cssIcon">
                            <i className="ed-pen"></i>
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
                        </button>
                      </div>
                      {/* delete popup */}
                      {item._id === questonId && (
                        <div
                          ref={dropdownRef}
                          className={`popup removePopup ${isActive ? "active" : "inactive"
                            }`}
                        >
                          <p className="heading text-xxs">
                            You are about to remove this question.
                          </p>
                          <p className="sub-heading red text-xxs">
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
                            <button
                              className="button button-red btn-sm"
                              onClick={() => removeFaq(item._id, false)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      )}
                    </li>
                  </ul>
                </div>
              );
            })
          ) : isFaqAvailable && faqList.length === 0 ? (
            <NoDataAvailable title="No Records Found." />
          ) : (
            <div className="loadingGridData">
              <i className="ed-loadingGrid"></i>
            </div>
          )}
        </div>
      </div>
      {/* edit popup */}
      <div className={`modal modalShowing-${modalStateEdit}`}>
        <EditFaq closePopup={closePopup} />
      </div>
    </React.Fragment>
  );
};

export default FaqsList;
