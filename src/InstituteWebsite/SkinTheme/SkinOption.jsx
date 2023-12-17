import React, { useEffect, useState } from "react";
import AppLink from "../../Common/AppLink";
import PreferredSkinOption from "./PreferredSkinOption";
import CustomSkinOption from "./CustomSkinOption";
import Breadcrumb from "../../Common/Breadcrumb";
import BreadcrumbItem from "../../Common/Breadcrumb/BreadcrumbItem";
import { useSelector } from "react-redux";

const SkinOption = () => {
  const [showTheme, setshowTheme] = useState("");
  const [showOptionType, setShowOptionType] = useState("");
  const { activetheme, defaultThemes } = useSelector((state) => {
    return {
      activetheme: state.institutetheme.activedTheme,
      defaultThemes: state.institutetheme.defaultThemes,
    }
  })
  const manageSkinOption = (type) => {
    // setshowTheme(!showTheme);
    if (type === showTheme) {
      setshowTheme("");
    } else {
      setshowTheme(type)
    }

  };
  async function selectSkinoption(theme) {
    let id = theme.themevalue && theme.themevalue._id;
    let filterTheme = await defaultThemes.data && defaultThemes.data.filter((item) => {
      if (item._id === id) return true
      else return false;
    });
    if (defaultThemes.data.length > 0 && theme.themevalue._id) {
      if (filterTheme.length > 0) {
        setshowTheme("Default");
      } else {
        setshowTheme("Custom");
      }
    }
  }
  useEffect(() => {
    selectSkinoption(activetheme);
  }, [activetheme]);

  return (
    <React.Fragment>
      <div className="SkinOptionWrapper">
        {/* <AppLink
          className="btnText SkinOption_Breadcrumb underline text-xxs ml-10"
          to="/website-manage"
        >
          <i className="animate-r-arrow-icon back-i"></i>
          Manage Website
        </AppLink> */}
        <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          {/* <BreadcrumbItem to="/website-manage" title="Manage Website" /> */}
          <BreadcrumbItem to="/skin-theme" title="Skin Theme" />
        </Breadcrumb>
        <PreferredSkinOption
          showTheme={showTheme}
          // manageSkinOption_parameter="preferref_skin" //!1
          manageSkinOption={manageSkinOption}
        />
        <CustomSkinOption
          showTheme={showTheme}
          // manageSkinOption_parameter="custom_skin" //!2
          manageSkinOption={manageSkinOption}
        />
      </div>
    </React.Fragment>
  );
};

export default SkinOption;
