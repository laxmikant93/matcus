import React, { useEffect, useState } from "react";
import { forwardRef } from "react";
import GalleryPopup from "../Common/GalleryPopup";
import InstituteGalleryHoc from "../Hoc/InstituteGalleryHoc";
import BackgroundDefault from "../assets/images/img/BackgroundDefault.png";
import "./InstituteWebsite.scss";
import ComponentLoader from "../Common/Loader/ComponentLoader";
import GalleryFilter from "./GalleryFilter";
import { useDispatch, useSelector } from "react-redux";
import {
  filterGalleryList,
  findGallery,
} from "../store/actions/institutegallery";
import AppLink from "../Common/AppLink";
import { DynamicHeaderConsumer } from "../Context/DynamicHeaderContext";
import { NavLink } from "react-router-dom";
import ImageViewer from "../Common/ImageViewer";
const WebsiteGallery = forwardRef(
  ({ instituteid, galleryLimit, homePage, disabledButton = false }, ref) => {
    const dispatch = useDispatch();
    const [ToggleActiveTab, SetToggleActiveTab] = useState("All");
    const [kind, setKind] = useState("");
    const allGalleryList = () => {
      setKind("");
      SetToggleActiveTab("All");
      dispatch(findGallery(instituteid));
    };

    const ImagesGalleryList = () => {
      setKind("images");
      let forUI = "GalleryListImages";
      SetToggleActiveTab("Images");
      dispatch(filterGalleryList(forUI, instituteid));
    };

    const VideosGalleryList = () => {
      setKind("videos");
      SetToggleActiveTab("Videos");
      let forUI = "GalleryListVideos";
      dispatch(filterGalleryList(forUI, instituteid));
    };

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const insWebsiteDetails = useSelector(
      (state) => state.institutewebsite.heading
    );
    const { users, instituteWebsite, businesstype } = useSelector((state) => {
      return {
        instituteWebsite: state.institutewebsite.data,
        users: state.user,
        businesstype: state.user.user_business_type,
      };
    });

    useEffect(() => {
      if (users.token) {
        if (
          users._id === instituteWebsite.owner &&
          users.user_activeRole === process.env.REACT_APP_PAGE_OWNER &&
          users.user_institute_institute_subdomain ===
          instituteWebsite.institute_subdomain
        ) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    }, [users, instituteWebsite]);

    return (
      instituteid && (
        <React.Fragment>
          {/* 6041c05bcd919403cde30134 */}

          <InstituteGalleryHoc instituteId={instituteid}>
            {({ gallery, loading, viewgallerypopup }) => (
              < React.Fragment >
                {
                  homePage ?
                    ((loading) || (ToggleActiveTab === "Images" || ToggleActiveTab === "Videos") || (gallery && gallery.length > 0)) && (
                      <section className="gallerysecWrap" ref={ref}>
                        <div className="sectionCntrWrap">
                          <div className="PageTopHead">
                            <DynamicHeaderConsumer>
                              {(value) => (
                                <div className="PTH-Item secHeadWrap">
                                  <h3 className="heading">
                                    {value.galleryhead || "Gallery"}
                                  </h3>
                                  <p className="subheading">
                                    {value.gallerysubhead ||
                                      "A sneak-peak into our events and activities."}
                                  </p>
                                </div>
                              )}
                            </DynamicHeaderConsumer>
                          </div>
                          <div className="w-gallery-sec">
                            {gallery && gallery.length > 0 ? (
                              <GalleryFilter
                                allGalleryList={() => allGalleryList()}
                                ImagesGalleryList={() => ImagesGalleryList()}
                                VideosGalleryList={() => VideosGalleryList()}
                                ActiveTab={ToggleActiveTab}
                              />
                            ) : (
                              <>
                                {ToggleActiveTab === "Images" ||
                                  ToggleActiveTab === "Videos" ? (
                                  <GalleryFilter
                                    allGalleryList={() => allGalleryList()}
                                    ImagesGalleryList={() => ImagesGalleryList()}
                                    VideosGalleryList={() => VideosGalleryList()}
                                    ActiveTab={ToggleActiveTab}
                                  />
                                ) : (
                                  ""
                                )}
                              </>
                            )}

                            {loading ? (
                              <ComponentLoader />
                            ) : gallery && gallery.length > 0 ? (
                              <div className="gallery-wraper mt-15">
                                {gallery
                                  .slice(
                                    0,
                                    galleryLimit ? galleryLimit : gallery.length
                                  )
                                  .map((galleryItem, index) => (
                                    <div
                                      key={`gallery_${index}`}
                                      className="gallery-wrap"
                                      onClick={() => viewgallerypopup(galleryItem._id)}
                                    >
                                      {" "}
                                      {/* className="gallery-1" - Removed */}
                                      {galleryItem?.thumbnail.includes(".mp4") ? (
                                        <video
                                          src={
                                            galleryItem?.thumbnail&&galleryItem?.thumbnail?.src
                                              ? galleryItem.thumbnail.src
                                              : BackgroundDefault
                                          }
                                          className="img-fluid"
                                          alt=""
                                        ></video>
                                      ) : (
                                        <ImageViewer
                                          object={
                                            galleryItem?.thumbnail
                                              ? galleryItem.thumbnail
                                              : BackgroundDefault
                                          }
                                          defaultImage={BackgroundDefault}
                                          className="img-fluid"
                                          alt="website-gallery"
                                          loading="lazy"
                                        />
                                      )}
                                      <div className="gallery-overlay text-center">
                                        <p className="text-reg w-500">
                                          {galleryItem.title}
                                        </p>
                                        {galleryItem.gallerycount > 0 ? (
                                          <p className="text-xxs">{`${galleryItem.gallerycount
                                            } ${galleryItem.gallerycount === 1
                                              ? "Image"
                                              : "Images"
                                            }`}</p>
                                        ) : (
                                          ""
                                        )}
                                        {galleryItem.videoscount > 0 ? (
                                          <p className="text-xxs">{`${galleryItem.videoscount
                                            } ${galleryItem.videoscount === 1
                                              ? "Video"
                                              : "Videos"
                                            }`}</p>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            ) : (
                              <>
                                {isLoggedIn ? (
                                  <React.Fragment>
                                    <p className="text-xxs">
                                      Your gallery is empty. You can start by adding
                                      pictures of your institute.
                                    </p>
                                    {!disabledButton ? (
                                      <AppLink
                                        className="button mt-20"
                                        to="/gallery-list"
                                        target="_blank"
                                      >
                                        Add Images or Videos
                                      </AppLink>
                                    ) : (
                                      <button
                                        className="button mt-20"
                                        to="/gallery-list"
                                        target="_blank"
                                      >
                                        Add Images or Videos
                                      </button>
                                    )}
                                  </React.Fragment>
                                ) : (
                                  `No ${insWebsiteDetails.galleryhead
                                    ? insWebsiteDetails.galleryhead
                                    : "Gallery"}`
                                )}
                              </>
                            )}
                          </div>
                          {gallery.length > 0 ? (
                            <React.Fragment>
                              {galleryLimit ? (
                                <NavLink to="gallery" className="button mt-20">
                                  View all{" "}
                                  {insWebsiteDetails.galleryhead
                                    ? insWebsiteDetails.galleryhead
                                    : "Images and Videos"}
                                </NavLink>
                              ) : (
                                ""
                              )}
                            </React.Fragment>
                          ) : (
                            ""
                          )}
                        </div>
                      </section>
                    ) : (
                      <section className="gallerysecWrap" ref={ref}>
                        <div className="sectionCntrWrap">
                          <div className="PageTopHead">
                            <DynamicHeaderConsumer>
                              {(value) => (
                                <div className="PTH-Item secHeadWrap">
                                  <h3 className="heading">
                                    {value.galleryhead || "Gallery"}
                                  </h3>
                                  <p className="subheading">
                                    {value.gallerysubhead ||
                                      "A sneak-peak into our events and activities."}
                                  </p>
                                </div>
                              )}
                            </DynamicHeaderConsumer>
                          </div>
                          <div className="w-gallery-sec">
                            {gallery && gallery.length > 0 ? (
                              <GalleryFilter
                                allGalleryList={() => allGalleryList()}
                                ImagesGalleryList={() => ImagesGalleryList()}
                                VideosGalleryList={() => VideosGalleryList()}
                                ActiveTab={ToggleActiveTab}
                              />
                            ) : (
                              <>
                                {ToggleActiveTab === "Images" ||
                                  ToggleActiveTab === "Videos" ? (
                                  <GalleryFilter
                                    allGalleryList={() => allGalleryList()}
                                    ImagesGalleryList={() => ImagesGalleryList()}
                                    VideosGalleryList={() => VideosGalleryList()}
                                    ActiveTab={ToggleActiveTab}
                                  />
                                ) : (
                                  ""
                                )}
                              </>
                            )}

                            {loading ? (
                              <ComponentLoader />
                            ) : gallery && gallery.length > 0 ? (
                              <div className="gallery-wraper mt-15">
                                {gallery
                                  .slice(
                                    0,
                                    galleryLimit ? galleryLimit : gallery.length
                                  )
                                  .map((galleryItem, index) => (
                                    <div
                                      key={`gallery_${index}`}
                                      className="gallery-wrap"
                                      onClick={() => viewgallerypopup(galleryItem._id)}
                                    >
                                      {" "}
                                      {/* className="gallery-1" - Removed */}
                                      {galleryItem?.thumbnail.includes(".mp4") ? (
                                        <video
                                          src={
                                            galleryItem?.thumbnail?.src
                                              ? galleryItem?.thumbnail?.src
                                              : BackgroundDefault
                                          }
                                          className="img-fluid"
                                          alt=""
                                        ></video>
                                      ) : (
                                        <ImageViewer
                                          object={
                                            galleryItem?.thumbnail
                                              ? galleryItem?.thumbnail
                                              : BackgroundDefault
                                          }
                                          defaultImage={BackgroundDefault}
                                          className="img-fluid"
                                          alt="website-gallery"
                                          loading="lazy"
                                        />
                                      )}
                                      <div className="gallery-overlay text-center">
                                        <p className="text-reg w-500">
                                          {galleryItem.title}
                                        </p>
                                        {galleryItem.gallerycount > 0 ? (
                                          <p className="text-xxs">{`${galleryItem.gallerycount
                                            } ${galleryItem.gallerycount === 1
                                              ? "Image"
                                              : "Images"
                                            }`}</p>
                                        ) : (
                                          ""
                                        )}
                                        {galleryItem.videoscount > 0 ? (
                                          <p className="text-xxs">{`${galleryItem.videoscount
                                            } ${galleryItem.videoscount === 1
                                              ? "Video"
                                              : "Videos"
                                            }`}</p>
                                        ) : (
                                          ""
                                        )}
                                      </div>
                                    </div>
                                  ))}
                              </div>
                            ) : (
                              <>
                                {isLoggedIn ? (
                                  <React.Fragment>
                                    <p className="text-xxs">
                                      Your gallery is empty. You can start by adding
                                      pictures of your institute.
                                    </p>
                                    {!disabledButton ? (
                                      <AppLink
                                        className="button mt-20"
                                        to="/gallery-list"
                                        target="_blank"
                                      >
                                        Add Images or Videos
                                      </AppLink>
                                    ) : (
                                      <button
                                        className="button mt-20"
                                        to="/gallery-list"
                                        target="_blank"
                                      >
                                        Add Images or Videos
                                      </button>
                                    )}
                                  </React.Fragment>
                                ) : (
                                  `No ${insWebsiteDetails.galleryhead
                                    ? insWebsiteDetails.galleryhead
                                    : "Gallery"}`
                                )}
                              </>
                            )}
                          </div>
                          {gallery.length > 0 ? (
                            <React.Fragment>
                              {galleryLimit ? (
                                <NavLink to="gallery" className="button mt-20">
                                  View all{" "}
                                  {insWebsiteDetails.galleryhead
                                    ? insWebsiteDetails.galleryhead
                                    : "Images and Videos"}
                                </NavLink>
                              ) : (
                                ""
                              )}
                            </React.Fragment>
                          ) : (
                            ""
                          )}
                        </div>
                      </section>
                    )
                }

              </React.Fragment>
            )}
          </InstituteGalleryHoc >
          <GalleryPopup Kind={kind} />
        </React.Fragment >
      )
    );
  }
);

export default WebsiteGallery;
