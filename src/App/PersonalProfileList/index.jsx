import React, { useCallback, useEffect, useState } from "react";
import PersonalProfileListHead from "./PersonalProfileListHead";
import Card from "../../Common/Card/index";
import CardBody from "../../Common/Card/CardBody";
import CardMedia from "../../Common/Card/CardMedia";
import ReactGA from "react-ga";
// import { DefaultInstituteBanner } from "../../Common/Images";
// import { userDetail } from "../../Constant/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  // getPublicProfiles,
  getPublicProfilesLoadMore,
  // searchpublicprofiles,
  searchpublicprofilesScroll,
  searchpublicprofilesTypeScroll,
  // sortPublicProfile,
  // sortPublicProfileMore,
  sortPublicProfileScroll,
} from "../../store/actions/publicProfile";
import "./PersonalProfile.scss";
import NoDataAvailable from "../../Common/NoDataAvailable";
// import { useRef } from "react";
const PersonalProfileList = () => {
  const dispatch = useDispatch();

  const userProfiles = useSelector(
    (state) => state.publicProfile.profiles.data
  );
  const [hideLoadMore, setHideLoadMore] = useState(false);
  const limit = 10;
  const [skip, setSkip] = useState(0);
  const [type, setType] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  let totalLength = userProfiles && userProfiles.profilelistlength;
  let dataFound = userProfiles.data && userProfiles.data.length;
  // const fireFunction = () => {
  //   let toskip = limit + skip;
  //   setSkip(toskip);
  //   dispatch(getPublicProfilesLoadMore(limit, toskip));
  //   setPreData([...preData, userProfiles]);
  // };

  const loadMore = useCallback(() => {
    let toSkip = skip + limit;
    setSkip(toSkip);
    switch (type) {
      case "Other": {
        if (searchValue) {
          dispatch(
            searchpublicprofilesTypeScroll(searchValue, type, limit, skip)
          );
        } else {
          dispatch(sortPublicProfileScroll("Other", limit, toSkip));
        }
        break;
      }
      case "InstituteOwner": {
        if (searchValue) {
          dispatch(
            searchpublicprofilesTypeScroll(searchValue, type, limit, skip)
          );
        } else {
          dispatch(sortPublicProfileScroll("InstituteOwner", limit, toSkip));
        }
        break;
      }
      case "Teacher": {
        if (searchValue) {
          dispatch(
            searchpublicprofilesTypeScroll(searchValue, type, limit, skip)
          );
        } else {
          dispatch(sortPublicProfileScroll("Teacher", limit, toSkip));
        }
        break;
      }
      case "Student": {
        if (searchValue) {
          dispatch(
            searchpublicprofilesTypeScroll(searchValue, type, limit, skip)
          );
        } else {
          dispatch(sortPublicProfileScroll("Student", limit, toSkip));
        }
        break;
      }
      case "All": {
        if (searchValue) {
          dispatch(searchpublicprofilesScroll(searchValue, limit, skip));
        } else {
          dispatch(getPublicProfilesLoadMore(limit, toSkip));
        }
        break;
      }
      //   case "Search":{
      // dispatch(searchpublicprofiles(value));
      // break;
      //   }
      default:
        if (!searchValue) {
          dispatch(searchpublicprofilesScroll(searchValue, limit, skip));
        } else {
          dispatch(getPublicProfilesLoadMore(limit, toSkip));
        }
    }
    setTimeout(() => {
      setLoading(false);
      setHideLoadMore(false);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, userProfiles, type]);

  // function usePrevious(value) {
  //   const ref = useRef();

  //   useEffect(() => {
  //     ref.current = value;
  //   }, [value]);

  //   return ref.current;
  // }

  useEffect(() => {
    const onScroll = function () {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setLoading(false);
        setHideLoadMore(false);
        if (type !== "Search" && dataFound < totalLength) {
          userProfiles.data.length === skip &&
            setLoading(true) &&
            setHideLoadMore(true);
          userProfiles.data && userProfiles.data.length > skip && loadMore();
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfiles, loadMore, skip, type]);

  useEffect(() => {
    setSkip(0);
    setSearchValue("");
  }, [type, searchValue]);
  /*** Get last word from Name ***/

  // function getLastWord(words) {
  //   var lastLetter = words.split(" ");
  //   return lastLetter[lastLetter.length - 1][0];
  // }

  ReactGA.event({
    category: "Resources",
    action: "click",
    label: "Home_Footer_DP",
  })
  return (
    <React.Fragment>
      <div className="edContainer">
        <PersonalProfileListHead
          setType={setType}
          setSearchValue={setSearchValue}
          type={type}
        />
        <div className="personalProfileListSection">
          {userProfiles.data && userProfiles.data.length ? (
            userProfiles.data &&
            userProfiles.data.length > 0 &&
            userProfiles.data.map((item) => {
              return (
                <Card>
                  {item.profile.public_profile_banner && (
                    <CardMedia>
                      <img
                        src={item.profile.public_profile_banner}
                        alt="profile banner"
                      />
                    </CardMedia>
                  )}
                  <CardBody className="cardPadding">
                    <div
                      className={`PPL-ProfilePhoto ${!item.profile.public_profile_banner ||
                        item.profile.public_profile_banner === null ||
                        item.profile.public_profile_banner === undefined ||
                        item.profile.public_profile_picture === "false"
                        ? "without-ppl-cover"
                        : ""
                        } `}
                    >
                      {!item.profile.public_profile_picture ||
                        item.profile.public_profile_picture === null ||
                        item.profile.public_profile_picture === undefined ||
                        item.profile.public_profile_picture === "false" ? (
                        <React.Fragment>
                          <div className="DefaultPH-ProfilePic">
                            {/* {item.profile.name && item.profile.name.substring(0, 1)}
                          {getLastWord(item.profile.name? item.profile.name : "")} */}
                          </div>
                        </React.Fragment>
                      ) : (
                        <img
                          src={item.profile.public_profile_picture}
                          alt="user_profile"
                        />
                      )}
                    </div>
                    <p className="text-xs">{item.profile.name}</p>
                    <p className="text-xxs">
                      {item.profile.role === "InstituteOwner" ? (
                        "Institute Admin"
                      ) : item.profile.role === "Other" &&
                        item.profile.otherUserTypeName &&
                        item.profile.otherUserTypeName !== "" ? (
                        item.profile.otherUserTypeName
                      ) : (
                        <p className="text-xxs">{item.profile.role}</p>
                      )}
                    </p>
                    <div className="TabletFeature">
                      <button className="button btn-o-silver base btn-oval btn-xs">
                        {/* 56 Likes */}
                        {item.profile.like.length}{" "}
                        {item.profile.like.length > 1 ? "Likes" : "Like"}
                      </button>
                      <button className="button btn-o-silver base btn-oval btn-xs">
                        {/* 56 Followers */}
                        {item.profile.follower.length}{" "}
                        {item.profile.follower.length > 1
                          ? "Followers"
                          : "Follower"}
                      </button>
                      <button className="button btn-o-silver base btn-oval btn-xs">
                        {item.review}{" "}
                        {item.review === "1" || item.review === "0"
                          ? "Review"
                          : "Reviews"}
                      </button>
                      <button className="button btn-o-silver base btn-oval btn-xs">
                        {item.photos}{" "}
                        {item.photos === "1" || item.photos === "0"
                          ? "Image"
                          : "Images"}
                      </button>
                      <button className="button btn-o-silver base btn-oval btn-xs">
                        {item.videos}{" "}
                        {item.videos === "1" || item.videos === "0"
                          ? "Video"
                          : "Videos"}
                      </button>
                      {/* <button className="button btn-o-silver base btn-oval btn-xs">
                      56 Courses
                    </button> */}
                    </div>
                    <div className="PPL-ActionButton">
                      <a
                        href={`/profile/${item.profile.username}`}
                        target="_blank"
                        rel="noreferrer"
                        className="button btn-o-primary primary btn-sm"
                      >
                        View Profile
                      </a>
                      {item.profile.website && (
                        <a
                          href={item.profile.website}
                          className="button btn-o-primary primary btn-sm"
                        >
                          View Website
                        </a>
                      )}
                    </div>
                  </CardBody>
                </Card>
              );
            })
          ) : !userProfiles.data &&
            !userProfiles.searchData &&
            userProfiles.profilelistlength === 0 ? (
            <>
              <NoDataAvailable title="No profile found." />
            </>
          ) : (
            <>
              <div className="loadingGridData">
                <i className="ed-loadingGrid"></i>
              </div>
            </>
          )}

          {/* <Card>
          <CardMedia>
            <img src={DefaultInstituteBanner} alt="" />
          </CardMedia>
          <CardBody className="cardPadding">
            <div className="PPL-ProfilePhoto"></div>
            <p className="text-xs">Meenal Bhatnagar</p>
            <p className="text-xxs">Dance Teacher</p>
            <div className="TabletFeature">
              <button className="button btn-o-silver base btn-oval btn-xs">
                56 Likes
              </button>
              <button className="button btn-o-silver base btn-oval btn-xs">
                56 Followers
              </button>
              <button className="button btn-o-silver base btn-oval btn-xs">
                56 Reviews
              </button>
              <button className="button btn-o-silver base btn-oval btn-xs">
                56 Images
              </button>
              <button className="button btn-o-silver base btn-oval btn-xs">
                56 Videos
              </button>
              <button className="button btn-o-silver base btn-oval btn-xs">
                56 Courses
              </button>
            </div>
            <div className="PPL-ActionButton">
              <button className="button btn-o-primary primary btn-sm">
                View Profile
              </button>
              <button className="button btn-o-primary primary btn-sm">
                View Website
              </button>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="cardPadding">
            <div className="PPL-ProfilePhoto without-ppl-cover"></div>
            <p className="text-xs">Meenal Bhatnagar</p>
            <p className="text-xxs">Dance Teacher</p>
            <div className="TabletFeature">
              <button className="button btn-o-silver base btn-oval btn-xs">
                56 Likes
              </button>
              <button className="button btn-o-silver base btn-oval btn-xs">
                56 Followers
              </button>
              <button className="button btn-o-silver base btn-oval btn-xs">
                56 Reviews
              </button>
              <button className="button btn-o-silver base btn-oval btn-xs">
                56 Images
              </button>
              <button className="button btn-o-silver base btn-oval btn-xs">
                56 Videos
              </button>
              <button className="button btn-o-silver base btn-oval btn-xs">
                56 Courses
              </button>
            </div>
            <div className="PPL-ActionButton">
              <button className="button btn-o-primary primary btn-sm">
                View Website
              </button>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="cardPadding">
            <div className="PPL-ProfilePhoto without-ppl-cover"></div>
            <p className="text-xs">Meenal Bhatnagar</p>
            <p className="text-xxs">Dance Teacher</p>
            <div className="TabletFeature">
              <button className="button btn-o-silver base btn-oval btn-xs">
                56 Likes
              </button>
              <button className="button btn-o-silver base btn-oval btn-xs">
                56 Followers
              </button>
              <button className="button btn-o-silver base btn-oval btn-xs">
                56 Reviews
              </button>
              <button className="button btn-o-silver base btn-oval btn-xs">
                56 Images
              </button>
              <button className="button btn-o-silver base btn-oval btn-xs">
                56 Videos
              </button>
              <button className="button btn-o-silver base btn-oval btn-xs">
                56 Courses
              </button>
            </div>
            <div className="PPL-ActionButton">
              <button className="button btn-o-primary primary btn-sm">
                View Profile
              </button>
              <button className="button btn-o-primary primary btn-sm">
                View Website
              </button>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardMedia>
            <img src={DefaultInstituteBanner} alt="" />
          </CardMedia>
          <CardBody className="cardPadding">
            <div className="PPL-ProfilePhoto"></div>
            <p className="text-xs">Meenal Bhatnagar</p>
            <p className="text-xxs">Dance Teacher</p>
            <div className="TabletFeature">
              <button className="button btn-o-silver base btn-oval btn-xs">
                56 Likes
              </button>
              <button className="button btn-o-silver base btn-oval btn-xs">
                56 Followers
              </button>
              <button className="button btn-o-silver base btn-oval btn-xs">
                56 Reviews
              </button>
              <button className="button btn-o-silver base btn-oval btn-xs">
                56 Images
              </button>
              <button className="button btn-o-silver base btn-oval btn-xs">
                56 Videos
              </button>
              <button className="button btn-o-silver base btn-oval btn-xs">
                56 Courses
              </button>
            </div>
            <div className="PPL-ActionButton">
              <button className="button btn-o-primary primary btn-sm">
                View Profile
              </button>
              <button className="button btn-o-primary primary btn-sm">
                View Website
              </button>
            </div>
          </CardBody>
        </Card> */}


        </div>
        <div className="loadingMoreDataBtnWrap">
          {loading && type !== "Search" && (
            <span>
              {!hideLoadMore ? (
                <>
                  Loading more...
                </>
              ) : (
                ""
              )}
            </span>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default PersonalProfileList;
