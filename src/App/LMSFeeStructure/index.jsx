import React, { useEffect, useState } from "react";
import FeeStructureList from "./FeeStructureList";
import GrayAuthTheme from "../../Common/Theme/GrayAuthTheme";
import AppLink from "../../Common/AppLink";
import Breadcrumb from "../../Common/Breadcrumb";
import BreadcrumbItem from "../../Common/Breadcrumb/BreadcrumbItem";
import SelectTitle from "../../Common/SectionTitle";
import { useDispatch, useSelector } from "react-redux";
import {
  getFee,
  searchFeeStructure,
  feeStatusInActive,
  feeStatusActive,
  feeSortByHTL,
  feeSortByLTH,
  feeStatusInSaved,
  sortByFeeType,
} from "../../store/actions/lmsfeeStructure";
import "./FeeStructure.scss";
import SearchControl from "../../Common/SearchControl";
import { resetAvailPaymentModes } from "../../store/actions/paymentmode";
const FeeStructure = () => {
  const dispatch = useDispatch();
  const InsID = useSelector((state) => state.user.user_institute);
  const feeList = useSelector((state) => state.lmsfeeStructure.FeeList.data);
  const isFeeListAvailable = useSelector(
    (state) => state.lmsfeeStructure.FeeList.success
  );

  useEffect(() => {
    dispatch(getFee(InsID));
  }, [dispatch, InsID]);
  useEffect(() => {
    return () => {
      dispatch(resetAvailPaymentModes());
    };
  }, [dispatch]);
  const handleSort = (e) => {
    let selectDropdown = e.target.value;

    switch (selectDropdown) {
      case "all": {
        dispatch(getFee(InsID));
        break;
      }
      case "LTH": {
        dispatch(feeSortByLTH(InsID));
        break;
      }
      case "HTL": {
        dispatch(feeSortByHTL(InsID));
        break;
      }
      case "Active": {
        dispatch(feeStatusActive(InsID));
        break;
      }
      case "Inactive": {
        dispatch(feeStatusInActive(InsID));
        break;
      }
      case "Saved": {
        dispatch(feeStatusInSaved(InsID));
        break;
      }
      case "rupees":
        dispatch(sortByFeeType(InsID, "rupees"));
        break;
      case "usd":
        dispatch(sortByFeeType(InsID, "usd"));
        break;
      case "euro":
        dispatch(sortByFeeType(InsID, "euro"));
        break;
      default: {
        dispatch(getFee(InsID));
      }
    }
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
    dispatch(searchFeeStructure(InsID, searchTerm));
  }, [dispatch, InsID, searchTerm]);

  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        <BreadcrumbItem to="/fee-management" title="Fee Management" />
        <BreadcrumbItem to="/LMS/fee-structure" title="Fee Structure" />
      </Breadcrumb>
      <div className="PageTopHead PTH-AdminFeeStructure mt-30">
        <div className="PTH-Item">
          <div className="ManageVacancyCount">
            <span className="primary">
              {isFeeListAvailable && feeList.length}
            </span>
            Fee Structure
          </div>
        </div>
        <div className="PTH-Item">
          <div className="SortByTableHeadCst">
            <label>Sort by</label>
            <select onChange={(e) => handleSort(e)}>
              <option value="all">All</option>
              <optgroup className="" label="Fee">
                <option value="LTH">Low to High</option>
                <option value="HTL">High to Low</option>
              </optgroup>
              <optgroup className="" label="Status">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Saved">Saved</option>
              </optgroup>
              <optgroup className="" label="Currency">
                <option value="rupees">&#8377; INR</option>
                <option value="usd">&#36; USD</option>
                <option value="euro">&euro; Euro</option>
              </optgroup>
            </select>
          </div>
        </div>
        <div className="PTH-Item P-Right">
          <SearchControl
            classNameWrappper="tableSearchbar"
            id="search"
            name="search"
            placeholder="Type Title"
            onChange={handleSearch}
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
      <SelectTitle type="feestructureSelect" />
      <FeeStructureList
      // feeList={feeList}
      // isFeeListAvailable={isFeeListAvailable}
      />
    </React.Fragment>
  );
};

export default FeeStructure;
