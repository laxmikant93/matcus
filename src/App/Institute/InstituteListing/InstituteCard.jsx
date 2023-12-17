import React from "react";
import DefaultInstituteBanner from "../../../assets/images/img/institute-banner-blank.jpg";

import CardMedia from "../../../Common/Card/CardMedia";
import CardBody from "../../../Common/Card/CardBody";
import Card from "../../../Common/Card";
import Share from "../../../Common/SharePopUp";
import AppLinkUrl from "../../../Common/AppLink/AppLinkUrl";
const InstituteCard = ({ LikeButton, ViewMore, institute }) => {
  //* Get last word from Institute Name */
  function getLastWord(words) {
    let worldSplit = words.split(" ");
    if (worldSplit.length === 1) {
      return "";
    } else {
      var lastLetter = words.split(" ");
      return lastLetter[lastLetter.length - 1][0];
    }
  }
  return (
    <React.Fragment>
      <Card>
        <CardMedia className="NocardPadding">
          {institute.banners === undefined ||
            institute.banners === null ||
            institute.banners === "" ? (
            <>
              {institute.institute_featured_banner === undefined ||
                institute.institute_featured_banner === null ||
                institute.institute_featured_banner === "" ? (
                <div className="DefaultInsListCoverImg">
                  <img src={DefaultInstituteBanner} alt="Default Cover" />
                </div>
              ) : (
                <img
                  className="img-fluid InsListCoverImg"
                  src={institute.institute_featured_banner}
                  alt=""
                />
              )}
            </>
          ) : (
            <>
              {institute.banners.length > 0 ? (
                <>
                  {institute.banners[0].institute_featured_banner ===
                    undefined ||
                    institute.banners[0].institute_featured_banner === null ||
                    institute.banners[0].institute_featured_banner === "" ? (
                    <div className="DefaultInsListCoverImg">
                      <img src={DefaultInstituteBanner} alt="Default Cover" />
                    </div>
                  ) : (
                    <img
                      className="img-fluid InsListCoverImg"
                      src={institute.banners[0].institute_featured_banner}
                      alt=""
                    />
                  )}
                </>
              ) : (
                <div className="DefaultInsListCoverImg">
                  <img src={DefaultInstituteBanner} alt="Default Cover" />
                </div>
              )}
            </>
          )}

          <div className="CardActionCustom">
            <ul className="CardActionCustomList">
              <li className="CardActionCustomListItem sharepopupWrapper">
                <Share
                  shareUrl={AppLinkUrl.createSubdomain(
                    institute.institute_subdomain
                  )}
                  shareiconclass="base i-xs"
                  shareBtnClass="btnText"
                />
              </li>
              <li className="CardActionCustomListItem">
                {institute.likestatus ? (
                  <button
                    className="btnText red"
                    onClick={() => LikeButton(institute)}
                  >
                    <i className="ed-icon icon-like-thumb red i-xs"></i>

                    <span className="likeCounts">
                      {institute.totallike < 1 ? "" : institute.totallike}
                      &nbsp;{institute.totallike > 1 ? "Likes" : "Like"}
                    </span>
                  </button>
                ) : (
                  <button
                    className="btnText "
                    onClick={() => LikeButton(institute)}
                  >
                    <i className="ed-icon icon-like-thumb base i-xs"></i>

                    <span className="likeCounts">
                      {institute.totallike < 1 ? "" : institute.totallike}
                      &nbsp;{institute.totallike > 1 ? "Likes" : "Like"}
                    </span>
                  </button>
                )}
              </li>
              <li className="CardActionCustomListItem">
                <button
                  className="btnText"
                  onClick={() => ViewMore(institute.institute_subdomain)}
                >
                  <i className="ed-icon icon-awesome-eye base i-xs"></i>
                  Website
                </button>
              </li>
            </ul>
          </div>
        </CardMedia>
        <CardBody className="cardPadding">
          <div className="institute-info-display">
            <div
              className="institue-logo"
              onClick={() => ViewMore(institute.institute_subdomain)}
            >
              {institute.institute_logo ? (
                <img
                  src={institute.institute_logo}
                  alt={institute.institute_name}
                />
              ) : (
                <div className="DefaultInsLogo">
                  {institute.institute_name.substring(0, 1)}
                  {getLastWord(institute.institute_name)}
                </div>
              )}
            </div>
            <div className="institue-name-info mt-8">
              <div className="edtooltip">
                <p className="inst-name text-sm w-600">
                  {institute.institute_name}
                </p>
                <span className="edtooltiptext">
                  {institute.institute_name}
                </span>
              </div>

              {institute.institute_city ? (
                <p className="inst-address text-xxs">
                  &nbsp; {institute.institute_city}
                </p>
              ) : (
                <p className="inst-address text-xxs">
                  {institute.institute_state}
                </p>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};

export default InstituteCard;
