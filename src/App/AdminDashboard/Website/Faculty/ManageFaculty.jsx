/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import InstituteTheme from "../../../../Common/Theme/InstituteTheme";
import DummyProfile from "../../../../assets/images/img/DummyProfile.png";
import { SearchIcon } from "../../../../Common/Icon";
import { useDispatch, useSelector } from "react-redux";
import {
  getFaculty,
  deleteFaculty,
} from "../../../../store/actions/manageFaculty";
import { useNavigate } from "react-router-dom";
import AppLink from "../../../../Common/AppLink";
import Breadcrumb from "../../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../../Common/Breadcrumb/BreadcrumbItem";
import { useDetectOutsideClick } from "../../../../Common/DetectOutsideClick/useDetectOutsideClick";
import SelectTitle from "../../../../Common/SectionTitle";
import "./Faculty.scss";
import SearchControl from "../../../../Common/SearchControl";
import NoDataAvailable from "../../../../Common/NoDataAvailable";
import ImageViewer from "../../../../Common/ImageViewer";
export default function ManageFaculty() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const insID = useSelector((state) => state.user.user_institute);
  const faculties = useSelector(
    (state) => state.manageFaculty.facultyList.data
  );

  const facultySuccess = useSelector(
    (state) => state.manageFaculty.facultyList.success
  );
  const industryType = useSelector((state) => state.user.user_business_type);
  useEffect(() => {
    dispatch(getFaculty(insID, industryType));
  }, [dispatch, insID]);

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (event) => {
    event.preventDefault();
    setSearchTerm(event.target.value.trim());
  };

  const dropdownRef = useRef(null);
  const [facultyId, setFacultyId] = useState("");
  const onClickBtnDropDownRemove = (id, isActive) => {
    setFacultyId(id);
    setIsActive(isActive);
  };
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

  const editFaculty = (_id) => {
    history(`/edit-web-faculty/${_id}`);
  };
  const removeFaculty = (id) => {
    dispatch(deleteFaculty(id, { isDeleted: true }, industryType));
  };
  const [facultyLength, setfacultylength] = useState("");
  const [SearchFind, setSearchFind] = useState(false);

  useEffect(() => {
    if (searchTerm) {
      setSearchFind(true);
      let arr = [];
      for (let i = 0; i < faculties.length; i++) {
        if (
          faculties[i].fullname
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          faculties[i].designation
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        ) {
          arr.push(faculties[i]);
        }
      }
      setfacultylength(arr.length);
    } else {
      setSearchFind(false);
    }
  }, [faculties, searchTerm]);

  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        {/* <BreadcrumbItem to="/website-manage" title="Manage Website" /> */}
        <BreadcrumbItem to="/manage-faculty" title="Manage Faculty" />
      </Breadcrumb>

      <React.Fragment>
        <div className="row mt-30">
          <div className="col-xs-12 col-xs-12">
            <div className="PageTopHead PTH-AdminManageFaculty">
              <div className="PTH-Item">
                <h3 className="text-sm w-300">
                  {facultySuccess ? (
                    SearchFind ? (
                      <>
                        {facultyLength > 1 ? (
                          <>
                            <span className="primary">{facultyLength}</span>
                            &nbsp; Faculties
                          </>
                        ) : (
                          <>
                            <span className="primary">{facultyLength}</span>
                            &nbsp;Faculty
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        {faculties && faculties.length > 1 ? (
                          <>
                            <span className="primary">{faculties.length}</span>
                            &nbsp; Faculties
                          </>
                        ) : (
                          <>
                            <span className="primary">{faculties.length}</span>
                            &nbsp;Faculty
                          </>
                        )}
                      </>
                    )
                  ) : (
                    "Faculty"
                  )}
                </h3>
              </div>
              <div className="PTH-Item P-Right">
                <SearchControl
                  classNameWrappper="tableSearchbar"
                  onChange={handleSearch}
                  id="search"
                  name="search"
                  placeholder="Type faculty name or designation"
                />
              </div>
              <div className="PTH-Item P-Right">
                <AppLink
                  to="/add-faculty"
                  className="button button-primary btn-oval btn-sm button-block"
                >
                  <i className="ed-icon icon-plus-add white i-xs"></i>
                  Add Faculty
                </AppLink>
              </div>
            </div>

            <SelectTitle type="facultySelect" />
          </div>
        </div>
        <div className="row relative">
          <div className="col-xs-12">
            <div className="gridListTable TeacherExamList">
              <ul className="gridHeader">
                <li className="col col-3">Profile</li>
                <li className="col col-3">Full Name</li>
                <li className="col col-3">Designation</li>
                <li className="col col-3">&nbsp;</li>
              </ul>
              <div className="gridBody">
                {facultySuccess && faculties ? (
                  faculties.length > 0 ? (
                    faculties
                      .filter((faculties) => {
                        return (
                          faculties.fullname
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                          faculties.designation
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                        );
                      })
                      .map((item) => {
                        return (
                          <React.Fragment>
                            <div className="gridRow" key={item._id}>
                              <ul className="topInfo">
                                <li className="col col-3">
                                  <div className="profileImgWrap">
                                    <ImageViewer
                                      object={item.profileurl}
                                      defaultImage={DummyProfile}
                                      className="admin-profile-image img-fluid"
                                    />
                                  </div>
                                </li>
                                <li
                                  className="col col-3"
                                  data-column="Faculty Name"
                                >
                                  {item.fullname}
                                  {/* Vishal Ranjan */}
                                </li>
                                <li
                                  className="col col-3"
                                  data-column="Designation"
                                >
                                  {item.designation}
                                  {/* Software Developer */}
                                </li>

                                <li className="col col-3 actionCols">
                                  <div className="actionBtn">
                                    <button
                                      onClick={() => editFaculty(item._id)}
                                      className="btn-square"
                                      title="edit"
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

                                  {item._id === facultyId && (
                                    <div
                                      ref={dropdownRef}
                                      className={`popup removePopup ${
                                        isActive ? "active" : "inactive"
                                      }`}
                                    >
                                      <h5 className="heading text-xs w-600">
                                        You are about to remove this faculty.
                                      </h5>
                                      <p className="sub-heading red text-xxs w-400">
                                        Are you sure?
                                      </p>
                                      <div className="removePopBtn">
                                        <button
                                          className="button btn-o-silver dgray btn-sm"
                                          onClick={() =>
                                            onClickBtnDropDownRemove(
                                              item._id,
                                              false
                                            )
                                          }
                                        >
                                          Cancel
                                        </button>
                                        <button
                                          className="button button-red btn-sm"
                                          onClick={() => {
                                            removeFaculty(item._id);
                                            onClickBtnDropDownRemove(
                                              item._id,
                                              false
                                            );
                                          }}
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  )}
                                </li>
                              </ul>
                            </div>
                          </React.Fragment>
                        );
                      })
                  ) : (
                    <ul>
                      <li colSpan="4">
                        <NoDataAvailable title="No Records Found." />
                      </li>
                    </ul>
                  )
                ) : (
                  <ul>
                    <li>
                      <div className="loadingGridData">
                        <i className="ed-loadingGrid"></i>
                      </div>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    </React.Fragment>
  );
}
