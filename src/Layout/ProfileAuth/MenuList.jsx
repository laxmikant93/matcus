import React, { useState, useEffect } from "react";
import AppLink from "../../Common/AppLink";
import Auth from "../../Classes/Auth";
import SearchPanel from "./SearchPanel";
import { useNavigate } from "react-router-dom";
import SessionStorage from "../../Classes/SessionStorage";
import { privateDomainAddNewIns, userDetail } from "../../Constant/auth";
import FreeDemoButton from "./FreeDemoButton";
import WatchVideoButton from "./WatchVideoButton";
import { useDispatch, useSelector } from "react-redux";
import { getAllReviews } from "../../store/actions/Testimonial";
import PDFViewer from "../../Common/PDFViewer";

const MenuList = () => {
  const [BrowseDropdownToggle, SetBrowseDropdownToggle] = useState(false);
  const [SearchDropdownToggle, SetSearchDropdownToggle] = useState(false);
  const [openPDF, setOpenPDF] = useState(false);
  const dispatch = useDispatch();
  // const [previewModel, setpreviewModel] = useState(false);
  // const [galleryPopup, setGalleryPopup] = useState({});
  const { user, allReviews, allReviewsSuccess } = useSelector((state) => {
    return {
      user: state.user,
      allReviews: state.testimonial.ReviewList.data,
      allReviewsSuccess: state.testimonial.ReviewList.success,
    };
  });
  useEffect(() => {
    dispatch(getAllReviews());
  }, [dispatch]);

  const history = useNavigate();
  const AddNewInstitute = () => {
    SessionStorage.setBool(privateDomainAddNewIns, true);
    history("/check-domain");
  };

  const [windowSize, setWindowSize] = useState({
    width: undefined,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <React.Fragment>
      <div className="sidebarMenuListWrapper">
        <ul className="sidebarMenuListCustom">
          {/* <li className="sidebarListItem dropList">
            Browse
            <ul className="sidebarListDropdown">
              <li className="sidebarListItem">
                <AppLink to="/register-institute" target="_blank">
                  Add your Institute
                </AppLink>
              </li>
              <li className="sidebarListItem">
                <AppLink to="/Institute/institute-listing" target="_blank">
                  Discover Institutes
                </AppLink>
              </li>
              <li className="sidebarListItem">
                <AppLink to="/" target="_blank">
                  Profile
                </AppLink>
              </li>
              {Auth.isLogin() && (
                <React.Fragment>
                  <li className="sidebarListItem">
                    <AppLink to="/community" target="_blank">
                      Discover Community
                    </AppLink>
                  </li>
                  <li className="sidebarListItem">
                    <AppLink to="/edneed-feed" target="_blank">
                      Edneed Feed
                    </AppLink>
                  </li>
                </React.Fragment>
              )}
            </ul>
          </li> */}
          {/* <li
            className={`sidebarListItem DropItemCst ${SearchDropdownToggle ? "active" : ""
              }`}
          >
            <p onClick={() => SetSearchDropdownToggle(!SearchDropdownToggle)}>
              Search
            </p>
            {SearchDropdownToggle && <SearchPanel />}
          </li> */}
          <li
            onClick={() => SetBrowseDropdownToggle(!BrowseDropdownToggle)}
            className={`sidebarListItem DropItemCst ${BrowseDropdownToggle ? "active" : ""
              }`}
          >
            <p >
              Browse
            </p>
            {BrowseDropdownToggle && (
              <ul className="sidebarListDropdown">
                <li className="sidebarListItem">
                  <AppLink to="/Institute/institute-listing" target="_blank">
                    Discover Institutes
                  </AppLink>
                </li>
                <li className="sidebarListItem">
                  <AppLink to="/profile-list" target="_blank">
                    Discover Peers
                  </AppLink>
                </li>
                {Auth.isLogin() && (
                  <React.Fragment>
                    <li className="sidebarListItem">
                      <span onClick={AddNewInstitute}>Add your Institute</span>
                    </li>
                    <li className="sidebarListItem">
                      <AppLink to="/community" target="_blank">
                        Discover Community
                      </AppLink>
                    </li>
                    <li className="sidebarListItem">
                      <AppLink to="/edneed-feed" target="_blank">
                        Edneed Feed
                      </AppLink>
                    </li>
                  </React.Fragment>
                )}
              </ul>
            )}
          </li>
          <React.Fragment>
            {windowSize.width <= 700 && (
              <li className="sidebarListItem">
                {Auth.isLogin() ? (
                  <WatchVideoButton
                    ButtonName="Video Tutorials"
                    className="btnText"
                  />
                ) : (
                  <FreeDemoButton ButtonName="FREE Demo" className="btnText" />
                )}
              </li>
            )}
          </React.Fragment>
          <li className="sidebarListItem">
            <AppLink to="/about" target="_blank">
              About Us
            </AppLink>
          </li>
          {allReviewsSuccess && allReviews.length > 0 ? (
            <li className="sidebarListItem">
              <AppLink to="/profile-review-list" target="_blank">
                Testimonials
              </AppLink>
            </li>
          ) : (
            ""
          )}

          <li className="sidebarListItem">
            <AppLink to="/faq" target="_blank">
              FAQs
            </AppLink>
          </li>
          <li className="sidebarListItem">
            <a href="https://blog.edneed.com/" rel="noreferrer" target="_blank">
              Blog
            </a>
          </li>
          <li className="sidebarListItem">
            <AppLink to="/contactus" target="_blank">
              Contact
            </AppLink>
          </li>

          {/* {user.user_activeRole === process.env.REACT_APP_STUDENT ? (
            ""
          ) : (
            <li className="sidebarListItem">
              <AppLink to="/user-manual" target="_blank">
                User Manual
              </AppLink>
            </li>
          )} */}

          {/* <PDFViewer openPDF={openPDF} setOpenPDF={setOpenPDF} url="https://edneed-mailer-uat.s3.amazonaws.com/edneed-manual-document.pdf" /> */}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default MenuList;
