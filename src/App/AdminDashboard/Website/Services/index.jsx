import React, { useEffect, useState } from "react";
import GrayAuthTheme from "../../../../Common/Theme/GrayAuthTheme";
import AppLink from "../../../../Common/AppLink";
import Breadcrumb from "../../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../../Common/Breadcrumb/BreadcrumbItem";
import SelectTitle from "../../../../Common/SectionTitle";
import ServiceList from "./ServiceList";
import { useDispatch } from "react-redux";
import {
  readServicesList,
  searchServices,
  sortServices,
} from "../../../../store/actions/services";
import { useSelector } from "react-redux";
import "./Services.scss";
import SearchControl from "../../../../Common/SearchControl";
const Services = () => {
  const dispatch = useDispatch();
  const { user, services, servicesList, businesstype } = useSelector((state) => {
    return {
      user: state.user,
      servicesList: state.services.list.data,
      services: state.services.list,
      businesstype: state.user.user_business_type,
    };
  });
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

  //handle Sort
  const handleSort = (e) => {
    let inputValue = e.target.value;

    switch (inputValue) {
      case "All":
        dispatch(readServicesList(user.user_institute, businesstype));
        break;
      case "Active":
        dispatch(sortServices(user.user_institute, inputValue, businesstype));
        break;
      case "Saved":
        dispatch(sortServices(user.user_institute, "Saved", businesstype));
        break;
      case "Inactive":
        dispatch(sortServices(user.user_institute, "Inactive", businesstype));
        break;
      default:
        dispatch(readServicesList(user.user_institute, businesstype));
    }
  };

  useEffect(() => {
    dispatch(searchServices(user.user_institute, searchTerm.toLowerCase(), businesstype));
  }, [dispatch, user, searchTerm, businesstype]);

  useEffect(() => {
    dispatch(readServicesList(user.user_institute, businesstype));
  }, [dispatch, user]);
  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        {/* <BreadcrumbItem to="/website-manage" title="Manage Website" /> */}
        <BreadcrumbItem to="/services-list" title="Services" />
      </Breadcrumb>
      <div className="PageTopHead PTH-AdminServiceList mt-30">
        <div className="PTH-Item">
          <p className="ManageAdmissionCount">
            <span className="primary">
              {services.success ? servicesList.length : ""}
            </span>
            Services
          </p>
        </div>
        <div className="PTH-Item">
          <div className="SortByTableHeadCst">
            <label>Sort by</label>
            <select onChange={(e) => handleSort(e)}>
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Saved">Saved</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
        <div className="PTH-Item P-Right">
          <SearchControl
            classNameWrappper="tableSearchbar" id="search"
            onKeyUp={handleSearch}
            onChange={handleSearch}
            name="search"
            placeholder="Search service by title" />
        </div>
        <div className="PTH-Item">
          <AppLink
            to="/add-services"
            className="button button-primary btn-oval btn-sm button-block"
          >
            <i className="ed-icon icon-plus-add white i-xs"></i>Add Services
          </AppLink>
        </div>
      </div>
      <SelectTitle type="servicesSelect" />
      <ServiceList services={services} servicesList={servicesList} businesstype={businesstype} />
    </React.Fragment>
  );
};

export default Services;
