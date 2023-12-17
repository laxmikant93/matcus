/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from "react";
import Breadcrumb from "../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../Common/Breadcrumb/BreadcrumbItem";
import GrayAuthTheme from "../../../Common/Theme/GrayAuthTheme";
import SearchControl from "../../../Common/SearchControl";
import AppLink from "../../../Common/AppLink";
import DummyProfile from "../../assets/images/img/DummyProfile.png";
import SingleSelectDropdown from "../../../Common/Form/SingleSelectDropdown";
import FormInput from "../../../Common/Form/FormInput";
import "./fee-management.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getInstituteFeeStructureList,
  getInstituteFeeStructureListScrolling,
} from "../../../store/actions/feeManagement";
import { useParams } from "react-router-dom";
const ViewFeeListing = () => {
  const [modalState, setModalState] = useState(false);
  const [modalStateEdit, setModalStateEdit] = useState(false);
  const [skip, setSkip] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [scrollLoading, setScrollLoading] = useState(false);
  const { user, feeList } = useSelector((state) => {
    return {
      user: state.user,
      feeList: state.feeManagement.feeList.data,
    };
  });
  const dispatch = useDispatch();
  const manageModalState = () => {
    setModalState(!modalState);
  };
  const closeModalState = () => {
    setModalState(!modalState);
  };
  const manageModalEdit = () => {
    setModalStateEdit(!modalStateEdit);
  };
  const closeModalStateEdit = () => {
    setModalStateEdit(false);
  };

  const { ClassRoomId } = useParams();
  useEffect(() => {
    dispatch(
      getInstituteFeeStructureList(ClassRoomId, user.user_institute, searchTerm)
    );
  }, [user, dispatch]);

  const ScrollANdSearch = useCallback(async (s, type) => {
    if (type === "scroll") {
      let newSkip = (await s) + 10;
      await setSkip(newSkip);
      dispatch(
        getInstituteFeeStructureListScrolling(
          ClassRoomId,
          user.user_institute,
          newSkip,
          searchTerm
        )
      );
    }
    setTimeout(() => {
      setScrollLoading(false);
    }, 1500);
  }, []);
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
    dispatch(
      getInstituteFeeStructureList(ClassRoomId, user.user_institute, searchTerm)
    );
  }, [searchTerm, dispatch]);
  useEffect(() => {
    const onScroll = function async() {
      if (window.innerHeight + window.scrollY > document.body.offsetHeight) {
        !scrollLoading && ScrollANdSearch(skip, "scroll");
        setScrollLoading(true);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollLoading, ScrollANdSearch, skip]);
  const calculatedAcedemicAmount = (item) => {
    let acedmicAmount = item.map((data) => {
      return parseFloat(data.amount ? data.amount : 0);
    });
    let totalAmount = acedmicAmount.reduce((a, b) => a + b, 0);
    const validAcedmicAmount = totalAmount ? totalAmount : 0;
    return validAcedmicAmount;
  };
  return (
    <>
      <React.Fragment>
        <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          <BreadcrumbItem to="/fee-management" title="Fee Management" />
          <BreadcrumbItem to="/view-fee-listing" title="view fee" />
        </Breadcrumb>
        <div className="pageHeadIntro">
          <p className="text-sm w-300">View Fee</p>
          <p className="text-xxs w-600">Classroom 8C, 2022-23</p>
        </div>
        <div className="pageHeadIntro col2 mt-10">
          <div className="itemShow">
            <div>
              <SingleSelectDropdown SingleSelectLabelName="Select Year" />
            </div>
            <div>
              <SingleSelectDropdown SingleSelectLabelName="Sort by status" />
            </div>
          </div>
          <div className="right">
            <div className="itemShow right col2">
              <div>
                <SearchControl
                  classNameWrappper="tableSearchbar"
                  id="search"
                  name="search_fee_students"
                  onChange={handleSearch}
                  placeholder="Student search"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="gridListTable">
          <ul className="gridHeader">
            <li className="col col-2">Students</li>
            <li className="col col-2">Academic/Tution</li>
            <li className="col col-2">Late Fee Fine</li>
            <li className="col col-2">Total Fee</li>
            <li className="col col-2">Status</li>
            <li className="col col-2">&nbsp;</li>
          </ul>
          <div className="gridBody">
            <div className="gridRow">
              {feeList &&
                feeList.length > 0 &&
                feeList.map((item) => {
                  return item.feeStatus === "Paid" ? (
                    <ul className="topInfo" key={item._id}>
                      <li className="col col-2">
                        <div className="userDetails">
                          <div className="profileCircle">
                            <a
                              href={`/profile/${item.username}`}
                              rel="noreferrer"
                              target="_blank"
                            >
                              <img src={DummyProfile} alt="Akansha Negi" />
                            </a>
                          </div>
                          <div className="profileDetails">
                            <div className="profile-name">
                              <a
                                href={`/profile/${item.username}`}
                                rel="noreferrer"
                                target="_blank"
                              >
                                {item.fullname}
                              </a>
                            </div>
                            <div className="admission-no">
                              <span>ADM No. {item.admission_no}</span>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="col col-2" data-head="Academic/Tution">
                        ₹
                        {item.feestructure.length > 0 &&
                          calculatedAcedemicAmount(item.feestructure)}
                      </li>
                      <li className="col col-2" data-head="Late Fee Fine">
                        ₹200
                      </li>
                      <li className="col col-2" data-head="Total Fee">
                        ₹{item.totalAmount}
                      </li>
                      <li className="col col-2 w-600 secondary">
                        <i className="icon-checkMark"></i> Paid
                      </li>
                      <li className="col col-2 actionCols">
                        <div className="actionBtn">
                          <AppLink
                            className="btn-square"
                            title="Download Fee Slip"
                            to="/view-fee-listing"
                          >
                            <span className="icon-download"></span>
                          </AppLink>
                          <AppLink
                            className="btn-square"
                            title="View Fee"
                            to="/view-fee-listing"
                          >
                            <span className="cssIcon">
                              <i className="ed-eye"></i>
                            </span>
                          </AppLink>
                        </div>
                      </li>
                    </ul>
                  ) : (
                    <ul className="topInfo" key={item._id}>
                      <li className="col col-2">
                        <div className="userDetails">
                          <div className="profileCircle">
                            <a
                              href={`/profile/${item.username}`}
                              rel="noreferrer"
                              target="_blank"
                            >
                              <img src={DummyProfile} alt="Akansha Negi" />
                            </a>
                          </div>
                          <div className="profileDetails">
                            <div className="profile-name">
                              <a
                                href={`/profile/${item.username}`}
                                rel="noreferrer"
                                target="_blank"
                              >
                                {item.fullname}
                              </a>
                            </div>
                            <div className="admission-no">
                              <span>ADM No. {item.admission_no}</span>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="col col-2" data-head="Academic/Tution">
                        ₹
                        {item.feestructure.length > 0 &&
                          calculatedAcedemicAmount(item.feestructure)}
                      </li>
                      <li className="col col-2" data-head="Late Fee Fine">
                        ₹400
                      </li>
                      <li className="col col-2" data-head="Total Fee">
                        ₹{item.totalAmount}
                      </li>
                      <li className="col col-2 w-600">
                        <AppLink
                          to="/collect-fee"
                          className="linkBtn primary"
                        >
                          Collect Fee
                        </AppLink>
                      </li>
                      <li className="col col-2 actionCols">
                        <div className="actionBtn">
                          <button
                            className="btn-square notified"
                            title="Nofitied to student"
                          >
                            <span className="cssIcon">
                              <i className="icon-bell-solid"></i>
                            </span>
                          </button>
                          <button
                            className="btn-square"
                            title="Edit Fee"
                            onClick={() => manageModalEdit()}
                          >
                            <span className="cssIcon">
                              <i className="ed-pen"></i>
                            </span>
                          </button>
                          <button
                            className="btn-square"
                            title="View Fee"
                            onClick={() => manageModalState()}
                          >
                            <span className="cssIcon">
                              <i className="ed-eye"></i>
                            </span>
                          </button>
                        </div>
                      </li>
                    </ul>
                  );
                })}
            </div>
            {/* <div className="gridRow">
                <ul className="topInfo">
                  <li className="col col-2">
                    <div className="userDetails">
                      <div className="profileCircle">
                        <a href="*" rel="noreferrer" target="_blank">
                          <img src={DummyProfile} alt="Akansha Negi" />
                        </a>
                      </div>
                      <div className="profileDetails">
                        <div className="profile-name">
                          <a href="*" rel="noreferrer" target="_blank">
                            Ravi Bhargav
                          </a>
                        </div>
                        <div className="admission-no">
                          <span>ADM No. DPIN5767</span>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="col col-2" data-head="Academic/Tution">
                    ₹2000
                  </li>
                  <li className="col col-2" data-head="Late Fee Fine">
                    ₹400
                  </li>
                  <li className="col col-2" data-head="Total Fee">
                    ₹2600
                  </li>
                  <li className="col col-2 w-600">
                    <AppLink to="/collect-fee" className="linkBtn primary">
                      Collect Fee
                    </AppLink>
                  </li>
                  <li className="col col-2 actionCols">
                    <div className="actionBtn">
                      <button
                        className="btn-square notified"
                        title="Nofitied to student"
                      >
                        <span className="cssIcon">
                          <i className="icon-bell-solid"></i>
                        </span>
                      </button>
                      <button
                        className="btn-square"
                        title="Edit Fee"
                        onClick={() => manageModalEdit()}
                      >
                        <span className="cssIcon">
                          <i className="ed-pen"></i>
                        </span>
                      </button>
                      <button
                        className="btn-square"
                        title="View Fee"
                        onClick={() => manageModalState()}
                      >
                        <span className="cssIcon">
                          <i className="ed-eye"></i>
                        </span>
                      </button>
                    </div>
                  </li>
                </ul> */}
            {/* </div> */}
            {/* <div className="gridRow">
                <ul className="topInfo">
                  <li className="col col-2">
                    <div className="userDetails">
                      <div className="profileCircle">
                        <a href="*" rel="noreferrer" target="_blank">
                          <img src={DummyProfile} alt="Akansha Negi" />
                        </a>
                      </div>
                      <div className="profileDetails">
                        <div className="profile-name">
                          <a href="*" rel="noreferrer" target="_blank">
                            Saurya Rana
                          </a>
                        </div>
                        <div className="admission-no">
                          <span>ADM No. DPIN5767</span>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li className="col col-2" data-head="Academic/Tution">
                    ₹2000
                  </li>
                  <li className="col col-2" data-head="Late Fee Fine">
                    ₹200
                  </li>
                  <li className="col col-2" data-head="Total Fee">
                    ₹2400
                  </li>
                  <li className="col col-2 w-600">
                    <AppLink to="/collect-fee" className="linkBtn primary">
                      Collect Fee
                    </AppLink>
                  </li>
                  <li className="col col-2 actionCols">
                    <div className="actionBtn">
                      <button className="btn-square" title="Nofity to student">
                        <span className="cssIcon">
                          <i className="icon-bell-solid"></i>
                        </span>
                      </button>
                      <AppLink
                        className="btn-square"
                        title="Edit Fee"
                        to="/view-fee-listing"
                      >
                        <span className="cssIcon">
                          <i className="ed-pen"></i>
                        </span>
                      </AppLink>
                      <AppLink
                        className="btn-square"
                        title="View Fee"
                        to="/view-fee-listing"
                      >
                        <span className="cssIcon">
                          <i className="ed-eye"></i>
                        </span>
                      </AppLink>
                    </div>
                  </li>
                </ul>
              </div> */}
          </div>
        </div>
        <div className={`modal modalShowing-${modalState}`}>
          <div className="modalwrapper">
            <span
              className="closeModal text-xxs dgray"
              onClick={() => closeModalState()}
            >
              X Close
            </span>
            <div className="modalHead">
              <div>
                <h3 className="text-sm w-300">View Fee Details</h3>
                <h5>Classroom 8E, 2022-23</h5>
              </div>
              <div>
                <div className="userDetails mt-20">
                  <div className="profileCircle">
                    <a href="*" rel="noreferrer" target="_blank">
                      <img src={DummyProfile} alt="Akansha Negi" />
                    </a>
                  </div>
                  <div className="profileDetails">
                    <div className="profile-name">
                      <a href="*" rel="noreferrer" target="_blank">
                        Saurya Rana ghfyhfyjhf
                      </a>
                    </div>
                    <div className="admission-no">
                      <span>ADM No. DPIN5767</span>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="modalbody">
                  <h3>Fee Structure</h3>
                  <div className="gridListTable">
                    <ul className="gridHeader">
                      <li className="col col-8">Fee Type</li>
                      <li className="col col-4">Amount</li>
                    </ul>
                    <div className="gridBody no-fixed">
                      <div className="gridRow">
                        <ul className="topInfo">
                          <li className="col col-8" data-head="Fee Type">
                            Academic/Tution Fee
                          </li>
                          <li className="col col-4" data-head="Amount">
                            ₹4000
                          </li>
                        </ul>
                      </div>
                      <div className="gridRow">
                        <ul className="topInfo">
                          <li className="col col-8" data-head="Fee Type">
                            Cricket
                          </li>
                          <li className="col col-4" data-head="Amount">
                            ₹500
                          </li>
                        </ul>
                      </div>
                      <div className="gridRow">
                        <ul className="topInfo">
                          <li className="col col-8" data-head="Fee Type">
                            Bus Charge
                          </li>
                          <li className="col col-4" data-head="Amount">
                            ₹1500
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <h3 className="mt-30">Fee Deductions</h3>
                  <div className="gridListTable">
                    <ul className="gridHeader">
                      <li className="col col-6">Deduction Type</li>
                      <li className="col col-3">Deducted Amount</li>
                      <li className="col col-3">Total</li>
                    </ul>
                    <div className="gridBody no-fixed">
                      <div className="gridRow">
                        <ul className="topInfo">
                          <li className="col col-8" data-head="Deduction Type">
                            Scholarship
                          </li>
                          <li className="col col-4" data-head="Deducted Amount">
                            20%
                          </li>
                          <li className="col col-4" data-head="Total Amount">
                            ₹3200
                          </li>
                        </ul>
                      </div>
                      <div className="gridRow">
                        <ul className="topInfo">
                          <li className="col col-8" data-head="Deduction Type">
                            Discount
                          </li>
                          <li className="col col-4" data-head="Deducted Amount">
                            ₹500
                          </li>
                          <li className="col col-4" data-head="Total Amount">
                            ₹3500
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <h2 className="mt-30">₹4000</h2>
                  <p className="text-xxs">
                    (Monthly fee is inclusive of all taxes.)
                  </p>
                </div>
              </div>
            </div>
            <div className="modalFooter mt-20">
              <div className="row">
                <button className="button btn-o-primary primary">
                  Notifiy to Student
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className={`modal modalShowing-${modalStateEdit}`}>
          <div className="modalwrapper">
            <span
              className="closeModal text-xxs dgray"
              onClick={() => closeModalStateEdit()}
            >
              X Close
            </span>
            <div className="modalHead">
              <div>
                <h3 className="text-sm w-300">Edit Fee Details</h3>
                <h5>Classroom 8E, 2022-23</h5>
              </div>
              <div>
                <div className="userDetails mt-20">
                  <div className="profileCircle">
                    <AppLink to="#" rel="noreferrer" target="_blank">
                      <img src={DummyProfile} alt="Akansha Negi" />
                    </AppLink>
                  </div>
                  <div className="profileDetails">
                    <div className="profile-name">
                      <AppLink to="#" rel="noreferrer" target="_blank">
                        Saurya Rana
                      </AppLink>
                    </div>
                    <div className="admission-no">
                      <span>ADM No. DPIN5767</span>
                    </div>
                  </div>
                </div>
                <hr />
              </div>
              <div className="modalbody">
                <h3>Fee Structure</h3>
                <div className="gridListTable">
                  <ul className="gridHeader">
                    <li className="col col-7">Fee Type</li>
                    <li className="col col-4">Amount (In ₹)</li>
                    <li className="col col-1">&nbsp;</li>
                  </ul>
                  <div className="gridBody no-fixed formTable">
                    <div className="gridRow">
                      <ul className="topInfo">
                        <li className="col col-7" data-head="Fee Type">
                          <FormInput
                            type="text"
                            placeholder="Fee title"
                            value="Academic/Tution Fee"
                          />
                        </li>
                        <li className="col col-4" data-head="Amount">
                          <FormInput
                            type="number"
                            placeholder="Fee amount"
                            value="4000"
                          />
                        </li>
                        <li className="col col-1 actionCols">
                          <div className="actionBtn">
                            <button
                              className="btn-square delete"
                              title="Delete"
                            >
                              <span className="cssIcon">
                                <i className="ed-trash"></i>
                              </span>
                            </button>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="gridRow">
                      <ul className="topInfo">
                        <li className="col col-7" data-head="Fee Type">
                          <FormInput
                            className=""
                            type="text"
                            placeholder="Fee title"
                            value=""
                          />
                        </li>
                        <li className="col col-4" data-head="Amount">
                          <FormInput
                            className=""
                            type="number"
                            placeholder="Fee amount"
                            value=""
                          />
                        </li>
                        <li className="col col-1 actionCols">
                          <div className="actionBtn">
                            <button
                              className="btn-square delete"
                              title="Delete"
                            >
                              <span className="cssIcon">
                                <i className="ed-trash"></i>
                              </span>
                            </button>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="mt-5">
                      <button className="button btn-sm btn-o-primary primary">
                        + Add More
                      </button>
                    </div>
                  </div>
                </div>
                <h3 className="mt-40">Fee Deductions</h3>
                <div className="gridListTable">
                  <ul className="gridHeader">
                    <li className="col col-5">Deductions Type</li>
                    <li className="col col-3">Fixed Amount</li>
                    <li className="col col-3">Amount (₹)</li>
                    <li className="col col-1">&nbsp;</li>
                  </ul>
                  <div className="gridBody no-fixed formTable">
                    <div className="gridRow">
                      <ul className="topInfo">
                        <li className="col col-5" data-head="Fee Type">
                          <FormInput
                            className=""
                            type="text"
                            placeholder="Fee title"
                            value="Academic/Tution Fee"
                          />
                        </li>
                        <li className="col col-3" data-head="Amount">
                          <FormInput
                            className=""
                            type="number"
                            placeholder="Fee amount"
                            value="800"
                          />
                        </li>
                        <li className="col col-3" data-head="Amount">
                          <FormInput
                            className=""
                            type="number"
                            placeholder="Fee amount"
                            value="3200"
                          />
                        </li>
                        <li className="col col-1 actionCols">
                          <div className="input-custom-type inline">
                            <label className="small">
                              <input type="checkbox" />
                            </label>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-5">
                    <button className="button btn-sm btn-o-primary primary">
                      + Add More
                    </button>
                  </div>
                  <div className="mt-20">
                    <div className="input-custom-type inline">
                      <label className="small">
                        <input type="checkbox" />
                        Save & Repeat All
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modalFooter mt-20">
              <div className="row">
                <button className="button btn-sm button-theme">Update Fee</button>
                <button className="button btn-o-primary btn-sm primary">
                  Notify to Student
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    </>
  );
};
export default ViewFeeListing;
