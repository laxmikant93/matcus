import React, { useState } from "react";
import AppLink from "../../Common/AppLink";
import PreferredSkinOption from "./PreferredSkinOption";
import CustomSkinOption from "./CustomSkinOption";

const SkinOption = () => {
  const [showTheme, setshowTheme] = useState(true);

  const manageSkinOption = () => {
    setshowTheme(!showTheme);
  };

  return (
    <React.Fragment>
      <div className="SkinOptionWrapper">
        <AppLink
          className="btnText SkinOption_Breadcrumb underline text-xxs ml-10"
          to="/website-manage"
        >
          <i className="animate-r-arrow-icon back-i"></i>
          Manage Website
        </AppLink>
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
