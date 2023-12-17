import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "../../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../../Common/Breadcrumb/BreadcrumbItem";
import InstituteTheme from "../../../../Common/Theme/InstituteTheme";
import {
  findInstituteInformation,
  resetManageInstituteInfo,
} from "../../../../store/actions/instituteregistration/action";
import GATags from "./GATags";
import SocialMediaTag from "./SocialMediaTag";
import CustomPageMeta from "./CustomPageMeta";
import "./MetaTag.scss";
import BasicMetaTags from "./BasicMetaTags";

export default function MetaTags() {
  const { users, institutedetail } = useSelector((state) => {
    return {
      users: state.user,
      institutedetail: state.manageinstituteinfo,
    };
  });
  const dispatch = useDispatch();
  const [activeDetails, setActiveDetails] = useState("BasicMetaTags");
  useEffect(() => {
    dispatch(findInstituteInformation(users.user_institute, users.user_business_type));
  }, [dispatch, users]);

  useEffect(() => {
    return () => {
      dispatch(resetManageInstituteInfo());
    };
  }, [dispatch]);
  // toggle function
  const handleBasicMeteTag = () => {
    setActiveDetails("BasicMetaTags");
  };
  // -----------------  PLEASE DON'T REMOVE THEASE FUNCTIONS, WILL BE USED LATER.
  const handleSocialMetaTag = () => {
    setActiveDetails("SocialMetaTags");
  };
  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        {/* <BreadcrumbItem to="/website-manage" title="Manage Website" /> */}
        <BreadcrumbItem to="/seo-metatag" title="Meta Data" />
      </Breadcrumb>
      <div className="Seometaheadingsectio">
        <h1 className="text-xl w-100 mt-30">Meta Data</h1>
        <p className="text-s">
          Helps visitors to understand information about your website in a
          concise manner.
        </p>
      </div>
      <div className="">
        <button
          className={
            ` mb-10 mr-5 ${activeDetails === "BasicMetaTags"
              ? "button btn-sm base button-base w-400"
              : "button btn-sm base btn-o-silver"}`
          }
          onClick={handleBasicMeteTag}
        >
          Basic Meta Tags
        </button>
        <button
          className={
            ` mb-10 ${activeDetails === "SocialMetaTags"
              ? "button btn-sm base button-base w-400"
              : "button btn-sm base btn-o-silver"}`
          }
          onClick={handleSocialMetaTag}
        >
          Social Meta Tags
        </button>
      </div>
      {!institutedetail.loading ? (
        <React.Fragment>

          {activeDetails === "BasicMetaTags" ? (
            <BasicMetaTags manageToggleUsingSubmitButton={handleSocialMetaTag} />
          ) : activeDetails === "SocialMetaTags" ? (
            <SocialMediaTag
            />
          ) : activeDetails === "GAT" ? (
            <GATags
            />
          ) : activeDetails === "customMetaTag" ? (
            <CustomPageMeta />
          ) : (
            activeDetails
          )}
        </React.Fragment>
      ) : (
        <div className="loadingGridData">
          <i className="ed-loadingGrid"></i>
        </div>
      )}
    </React.Fragment>
  );
}
