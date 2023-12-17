/* eslint-disable no-unused-vars */
import React from "react";
import AppLink from "../../../Common/AppLink";
import { SearchIcon } from "../../../Common/Icon";
import Auth from "../../../Classes/Auth";
import SearchControl from "../../../Common/SearchControl";

const InstituteListingHead = ({
  totalCount,
  handleChange,
  likedInstituteList,
  MyInstituteList,
  allInstitute,
  ActiveTab,
}) => {
  return (
    <React.Fragment>
      <div className="edContainer">
        <div className="PageTopHead PTH-InstituteListing mt-90">
          <div className="PTH-Item">
            <h1 className="text-2xl w-300">
              <span className="w-600">{totalCount}&nbsp;</span>Institute
            </h1>
          </div>

          {/* <div className="PTH-Item P-Right pthMLBtn">
          <AppLink
            to="/register-institute"
            target="_blank"
            className="digitizeLinkbtn"
          >
            <span className="text-xxs base">Are you runninmmmmmg an institute?</span>
            <span className="btnText primary text-xxs  mt-2 w-600">
              Digitize your Institute <i className="animate-r-arrow-icon"></i>
            </span>
            <span className="text-xxs w-500 tbLine mt-3">
              within 120 seconds
            </span>
          </AppLink>
        </div> */}
        </div>

        <div className="PageTopHead PTH-InstituteListing mt-10">
          <div className="PTH-Item">
            {Auth.isLogin() ? (
              <div className="InstituteListingFilter">
                <div className="actionBtnCustom">
                  <div className="groupBtn">
                    <button
                      className={ActiveTab === "all" ? "active" : ""}
                      onClick={() => allInstitute()}
                    >
                      All
                    </button>
                    <button
                      className={ActiveTab === "MyInstituteList" ? "active" : ""}
                      onClick={() => MyInstituteList()}
                    >
                      My Institute
                    </button>
                    <button
                      className={
                        ActiveTab === "likedInstituteList" ? "active" : ""
                      }
                      onClick={() => likedInstituteList()}
                    >
                      Liked by me
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="PTH-Item P-Right">
            <SearchControl
              classNameWrappper="tableSearchbar"
              id="search"
              name="search"
              onChange={(e) => handleChange(e)}
              onKeyUp={(e) => handleChange(e)}
              placeholder="Edneed search"
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default InstituteListingHead;
