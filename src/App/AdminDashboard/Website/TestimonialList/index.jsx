import React, { useState, useRef, useEffect } from "react";
import GrayAuthTheme from "../../../../Common/Theme/GrayAuthTheme";
import AppLink from "../../../../Common/AppLink";
import Breadcrumb from "../../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../../Common/Breadcrumb/BreadcrumbItem";
import SelectTitle from "../../../../Common/SectionTitle";
import BackgroundDefault from "../../../../assets/images/img/BackgroundDefault.png";
import {
  getTestimonial,
  deleteTestimonial,
  updateTestimonial,
  testimonialFeaturedMarked,
  testimonialSortByHTL,
  testimonialSortByLTH,
  testimonialFeaturedNotMarked,
  searchTestimonial,
  setSingleTestimonialData,
} from "../../../../store/actions/Testimonial";
import { useDispatch, useSelector } from "react-redux";
import { useDetectOutsideClick } from "../../../../Common/DetectOutsideClick/useDetectOutsideClick";
import EditTestimonial from "./EditTestimonial";
import "./TestimonialList.scss";
import SearchControl from "../../../../Common/SearchControl";
import NoDataAvailable from "../../../../Common/NoDataAvailable";
import ImageViewer from "../../../../Common/ImageViewer";
const TestimonialList = () => {
  const dispatch = useDispatch();
  const InsID = useSelector((state) => state.user.user_institute);
  const testimonialList = useSelector(
    (state) => state.testimonial.TestimonialList.data
  );
  const isTestimonialAvailable = useSelector(
    (state) => state.testimonial.TestimonialList.success
  );
  const businesstype = useSelector((state) =>
    state.user.user_business_type);
  const dropdownRef = useRef(null);
  const [testimonialId, setTestimonialId] = useState("");
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [modalStateEdit, setModalStateEdit] = useState(false);
  const [searchFind, setsearchFind] = useState(false);

  useEffect(() => {
    dispatch(getTestimonial(InsID, businesstype));
  }, [dispatch, InsID]);

  // handle POPUP
  const onClickBtnDropDownRemove = (_id, isActive) => {
    setTestimonialId(_id);
    setIsActive(isActive);
  };

  const manageModalEdit = () => {
    setModalStateEdit(!modalStateEdit);
  };

  const [editRating, setEditRating] = useState("");
  const userRating = useSelector((state) => state.testimonial.rating);

  const editPopup = (rating, allData) => {
    manageModalEdit();
    setEditRating(rating);
    dispatch(setSingleTestimonialData(allData));
  };

  const closePopup = () => {
    setEditRating(userRating);
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
    setsearchFind(true);
  };

  useEffect(() => {
    if (searchFind) {
      dispatch(searchTestimonial(InsID, searchTerm, businesstype));
    }
  }, [dispatch, InsID, searchTerm, searchFind]);

  // Remove Testimonial
  const removeTestimonial = (id, isActive) => {
    dispatch(deleteTestimonial(id, businesstype));
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
      type: businesstype
    };

    dispatch(updateTestimonial(id, businesstype, featureData));
  };

  const handleSort = (e) => {
    let selectDropdown = e.target.value;

    switch (selectDropdown) {
      case "all": {
        dispatch(getTestimonial(InsID, businesstype));
        break;
      }
      case "LTH": {
        dispatch(testimonialSortByLTH(InsID, businesstype));
        break;
      }
      case "HTL": {
        dispatch(testimonialSortByHTL(InsID, businesstype));
        break;
      }
      case "yes": {
        dispatch(testimonialFeaturedMarked(InsID, businesstype));
        break;
      }
      case "no": {
        dispatch(testimonialFeaturedNotMarked(InsID, businesstype));
        break;
      }
      default:
        dispatch(getTestimonial(InsID, businesstype));
    }
  };

  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        {/* <BreadcrumbItem to="/website-manage" title="Manage Website" /> */}
        <BreadcrumbItem to="/testimonial-list" title="Testimonial" />
      </Breadcrumb>
      <div className="PageTopHead PTH-TestimonialList mt-20">
        <div className="PTH-Item">
          <p className="TTH-TestimonialCount">
            <span className="primary">
              {testimonialList && testimonialList.length}
            </span>{" "}
            Testimonials
          </p>
        </div>
        <div className="PTH-Item">
          <div className="SortByTableHeadCst">
            <label>Sort by</label>
            <select onChange={(e) => handleSort(e)}>
              <option value="all">All</option>
              <optgroup className="" label="Ratings">
                <option value="LTH">Low to High</option>
                <option value="HTL">High to Low</option>
              </optgroup>
              <optgroup className="" label="Featured Marked">
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </optgroup>
            </select>
          </div>
        </div>
        <div className="PTH-Item P-Right">
          <SearchControl
            classNameWrappper="tableSearchbar"
            id="search"
            name="search"
            placeholder="Type Sender's Name or Message"
            onChange={handleSearch}
          />
        </div>
        <div className="PTH-Item P-Right">
          <AppLink
            to="/add-testimonial"
            className="button button-primary btn-oval btn-sm"
          >
            <i className="ed-icon icon-plus-add white i-xs"></i>Add
            Testimonial
          </AppLink>
        </div>
      </div>
      <SelectTitle type="testimonialsSelect" />
      <div className="gridListTable">
        <ul className="gridHeader">
          <li className="col col-2">Sender's Name</li>
          <li className="col col-4">Message</li>
          <li className="col col-2">Ratings</li>
          <li className="col col-2">Featured</li>
          <li className="col col-2">&nbsp;</li>
        </ul>
        <div className="gridBody">
          {isTestimonialAvailable && testimonialList.length ? (
            testimonialList.map((item) => {
              return (
                <div className="gridRow" key={item._id}>
                  <ul className="topInfo">
                    <li className="col col-2" data-head="Icon/Image">
                      <div className="testinomialNameDiv">
                        <div className="TestimonialListThubnail  ">
                          <ImageViewer
                            className="TableThumbnail testinomialImage"
                            object={item.thumbnail
                            }
                            defaultImage={BackgroundDefault}
                            alt="Testimonial Thumbnail"
                          />
                        </div>
                        <div className="testinomialName pl-2">
                          {item.name}
                        </div>
                      </div>

                    </li>
                    {/* <li className="col col-2" data-head="Sender's Name">

                      </li> */}
                    <li className="col col-4 sun-editor-output" data-head="Sender's Message"
                      dangerouslySetInnerHTML={{
                        __html:
                          item.message
                      }}
                    >
                    </li>
                    {/* {item.message} */}

                    <li className="col col-2" data-head="Ratings">
                      <p className="text-xxs">
                        {item.rating ? item.rating : 0}/5
                      </p>
                    </li>
                    <li className="col col-2" data-head="Featured Marked">
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
                    <li className="col col-2 actionCols">
                      <div className="actionBtn">
                        <button
                          className="btn-square"
                          title="Edit"
                          onClick={() => editPopup(item.rating, item)}
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
                      {item._id === testimonialId && (
                        <div
                          ref={dropdownRef}
                          className={`popup removePopup ${isActive ? "active" : "inactive"
                            }`}
                        >
                          <p className="heading text-xxs">
                            You are about to remove this testimonial.
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
                              onClick={() =>
                                removeTestimonial(item._id, false)
                              }
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
          ) : isTestimonialAvailable && testimonialList.length === 0 ? (
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
        <EditTestimonial closePopup={closePopup} editRating={editRating} />
        {/* <EditTestimonial closePopup={closePopup} /> */}
      </div>
    </React.Fragment>
  );
};

export default TestimonialList;
