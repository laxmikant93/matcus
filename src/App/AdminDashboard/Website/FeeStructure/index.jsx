import React, { useEffect, useState } from "react";
import FeeStructureList from "./FeeStructureList";
import GrayAuthTheme from "../../../../Common/Theme/GrayAuthTheme";
import AppLink from "../../../../Common/AppLink";
import Breadcrumb from "../../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../../Common/Breadcrumb/BreadcrumbItem";
import SelectTitle from "../../../../Common/SectionTitle";
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
} from "../../../../store/actions/feeStructure";
import "./FeeStructure.scss";
import SearchControl from "../../../../Common/SearchControl";
import MultipleSelectDropDownCommon from "../../../../Common/Form/MultiSelectDropDownCommon";
import SingleSelectDropdown from "../../../../Common/Form/SingleSelectDropdown";
const FeeStructure = () => {
  const dispatch = useDispatch();
  const InsID = useSelector((state) => state.user.user_institute);
  const feeList = useSelector((state) => state.feeStructure.FeeList.data);
  const isFeeListAvailable = useSelector(
    (state) => state.feeStructure.FeeList.success
  );

  useEffect(() => {
    dispatch(getFee(InsID));
  }, [dispatch, InsID]);

  const handleSort = (type) => {
    // let selectDropdown = e.target.value;

    switch (type) {
      case "All": {
        dispatch(getFee(InsID));
        break;
      }
      case "Low to High": {
        dispatch(feeSortByLTH(InsID));
        break;
      }
      case "High to Low": {
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
      case "₹ INR":
        dispatch(sortByFeeType(InsID, "rupees"));
        break;
      case "$ USD":
        dispatch(sortByFeeType(InsID, "usd"));
        break;
      case "€ Euro":
        dispatch(sortByFeeType(InsID, "euro"));
        break;
      default: {
        dispatch(getFee(InsID));
      }
    }
  };
  const filterValues = ["Fee", "Status", "Currency"];
  const selectGroup = [
    "Fee",
    "Low to High",
    "High to Low",
    "Status",
    "Active",
    "Inactive",
    "Saved",
    "Currency",
    "₹ INR",
    "$ USD",
    "€ Euro",
  ];

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
        {/* <BreadcrumbItem to="/website-manage" title="Manage Website" /> */}
        <BreadcrumbItem to="/fee-structure" title="Fee Structure" />
      </Breadcrumb>
      <div className="PageTopHead PTH-AdminFeeStructure mt-30">
        <div className="PTH-Item">
          <p className="ManageVacancyCount">
            <span className="primary">
              {isFeeListAvailable && feeList.length}
            </span>
            Fee Structure
          </p>
        </div>
        <div className="PTH-Item">
          <SingleSelectDropdown
            SingleSelectHandel={(item) => handleSort(item)}
            selectGroup={selectGroup}
            filterValues={filterValues}
          />
          {/* <div className="SortByTableHeadCst">
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
            </div> */}
        </div>
        <div className="PTH-Item P-Right">
          <SearchControl
            classNameWrappper="tableSearchbar"
            id="search"
            name="search"
            placeholder="Type Title"
            onChange={handleSearch}
            onReset={() => setSearchTerm("")}
          />
        </div>
        <div className="PTH-Item">
          <AppLink
            to="/add-fee-structure"
            className="button button-primary btn-oval btn-sm button-block"
          >
            <i className="ed-icon icon-plus-add white i-xs"></i>Add Fee
            Structure
          </AppLink>
        </div>
      </div>
      <SelectTitle type="feestructureSelect" />
      <FeeStructureList
        feeList={feeList}
        isFeeListAvailable={isFeeListAvailable}
      />
    </React.Fragment>
  );
};

export default FeeStructure;
