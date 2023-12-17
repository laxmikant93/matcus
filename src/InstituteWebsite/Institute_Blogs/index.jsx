import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import AppLink from '../../Common/AppLink';
import { getDomainBlogList, getWebsiteBlogList, likeBlog } from '../../store/actions/instituteblogs';
import BackgroundDefault from "../../assets/images/img/BackgroundDefault.png"
import SharePopUp from '../../Common/SharePopUp';
import AppLinkUrl from '../../Common/AppLink/AppLinkUrl';
import PreviewBlog from './PreviewBlog';
import CategoryWiseBlogList from './CategoryWiseBlogList';
import CategoriesList from './CategoriesList';
import FeatureBlogsList from './FeatureBlogsList';
import ImageViewer from '../../Common/ImageViewer';

const WebsiteBlogs = () => {

  let dispatch = useDispatch();
  let history = useNavigate();
  let profileUrl = window.location.host;

  const [newComponent, setNewComponent] = useState("");
  const [blogId, setBlogId] = useState("");

  const { user, insDetails, blogs, publishedBlogList, categoriesList, featuredBlogList } = useSelector((state) => {
    return {
      user: state.user,
      insDetails: state.institutewebsite.data,
      blogs: state.instituteblogs.getWesbiteBlogList,
      publishedBlogList: state.instituteblogs.getWesbiteBlogList.publishBlogs,
      categoriesList: state.instituteblogs.getWesbiteBlogList.allCategories,
      featuredBlogList: state.instituteblogs.getWesbiteBlogList.featuredBlogs,
    }
  })

  useEffect(() => {
    if (AppLinkUrl.privateDomain()) {
      dispatch(getDomainBlogList(insDetails.domain, ""));
    }
    else {
      dispatch(getWebsiteBlogList(insDetails.institute_subdomain, ""));
    }
  }, [dispatch, insDetails.domain, insDetails.institute_subdomain, user._id, user.domain])

  const handleLikeButton = (id, status) => {
    dispatch(likeBlog({
      blog: id,
      user: user._id,
      isLike: !status,
      status: "mainPage"
    }));
  }

  const handleShowMoreButton = (state) => {
    setNewComponent(state);
  }

  const handleRedMoreButton = (state, id) => {
    setNewComponent(state);
    setBlogId(id);
  }

  return (
    <>
      {newComponent === "previewBlog" ? <PreviewBlog blogId={blogId} /> :
        newComponent === "previewCategory" ? <CategoryWiseBlogList blogId={blogId} />
          : newComponent === "categories" ? <CategoriesList />
            : newComponent === "featuredBlogs" ? <FeatureBlogsList />
              :
              <React.Fragment>
                {blogs.success ?
                  <React.Fragment>
                    < div className="sectionCntrWrap" >
                      <div className=''>
                        <div className="text-xl w-500">Recommended</div>
                        <div>
                          <div className="text-s primary w-500">
                            {blogs.success && publishedBlogList.length ?
                              publishedBlogList[0].title : ""
                            }
                          </div>
                          <div className="sun-editor-output"
                            dangerouslySetInnerHTML={{
                              __html:
                                blogs.success &&
                                  publishedBlogList.length ?
                                  publishedBlogList[0].content.length > 8000 ?
                                    `${publishedBlogList[0].content.slice(0, 8000)} ... 
                        `: publishedBlogList[0].content
                                  : ""
                              ,
                            }}
                          >
                          </div>
                          {blogs.success &&
                            publishedBlogList.length ?
                            publishedBlogList[0].content.length > 180 ?
                              // <AppLink to={`/website-blog-preview/${publishedBlogList[0]._id}`}>Read More</AppLink>
                              <button onClick={() => handleRedMoreButton("previewBlog", publishedBlogList[0]._id)}>Read More</button>
                              : ""
                            : ""
                          }
                          <div className="ServiceListThubnail">
                            <ImageViewer object={blogs.success &&
                                publishedBlogList.length ?
                                !publishedBlogList[0].blog_image || publishedBlogList[0].blog_image === ""
                                  ? BackgroundDefault
                                  : publishedBlogList[0].blog_image
                                : ""} defaultImage={BackgroundDefault}/>
                            {/* <img
                              className="TableThumbnail"
                              src={blogs.success &&
                                publishedBlogList.length ?
                                !publishedBlogList[0].blog_image || publishedBlogList[0].blog_image === ""
                                  ? BackgroundDefault
                                  : publishedBlogList[0].blog_image
                                : ""
                              }
                              alt="Category Thumbnail"
                            /> */}
                          </div>
                        </div>
                      </div>
                      {
                        blogs.success && categoriesList.length ?
                          <div className=''>
                            <div className="text-xl w-500">Categories</div>
                            {blogs.success && categoriesList.length ?
                              categoriesList.slice(0, 8)
                                .map((item, i) => {
                                  return (
                                    <div className="gridRow" key={i}
                                    >
                                      <ul className="topInfo">
                                        <li className="col col-3" data-head="Icon/Image">
                                          <div className="ServiceListThubnail">
                                            <ImageViewer object={ !item.category_cover_image || item.category_cover_image === ""
                                                  ? BackgroundDefault
                                                  : item.category_cover_image} defaultImage={BackgroundDefault} />
                                            {/* <img
                                              className="TableThumbnail"
                                              src={
                                                !item.category_cover_image || item.category_cover_image === ""
                                                  ? BackgroundDefault
                                                  : item.category_cover_image
                                              }
                                              alt="Category Thumbnail"
                                            /> */}
                                          </div>
                                        </li>
                                        <li className="col col-3" data-head="Title">
                                          <p className="text-sm primary w-500">{item.category_title}</p>
                                        </li>
                                        <li className="col col-4" data-head="Description">
                                          <div className="">
                                            {item.category_desc.length > 180 ?
                                              ` ${item.category_desc.slice(0, 180)}... ` : item.category_desc}

                                            {item.category_desc.length > 180 &&
                                              // <AppLink to={`/website-blogs-by-category/${item._id}`}>
                                              //   Read More
                                              // </AppLink>
                                              <button onClick={() => handleRedMoreButton("previewCategory", item._id)}>Read More</button>
                                            }
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  );
                                }) : ""
                            }
                            {categoriesList.length > 8 &&
                              <button className="button button-theme"
                                onClick={() => handleShowMoreButton("categories")}
                              >
                                Show More
                              </button>}
                          </div> : ""
                      }
                      {
                        blogs.success && featuredBlogList.length ?
                          <div className=''>
                            <div className="text-xl w-500">Featured Blogs</div>
                            {blogs.success && featuredBlogList.length ?
                              featuredBlogList.slice(0, 2)
                                .map((item, i) => {
                                  return (
                                    <>
                                      <div className="gridRow" key={i}
                                      >
                                        <ul className="topInfo">
                                          <li>
                                            <ImageViewer object={item.authorData && item.authorData.profile_picture ?
                                                !item.authorData.profile_picture ||
                                                  item.authorData.profile_picture === ""
                                                  ? BackgroundDefault
                                                  : item.authorData.profile_picture
                                                : BackgroundDefault
                                              } defaultImage={BackgroundDefault}/>
                                            {/* <img
                                              className="TableThumbnail"
                                              src={item.authorData && item.authorData.profile_picture ?
                                                !item.authorData.profile_picture ||
                                                  item.authorData.profile_picture === ""
                                                  ? BackgroundDefault
                                                  : item.authorData.profile_picture
                                                : BackgroundDefault
                                              }
                                              alt="Blog category Thumbnail"
                                            /> */}
                                          </li>
                                          <li>
                                            <p className="text-s w-500">{item.authorData.fullname}</p>
                                          </li>
                                          <br />
                                          <li className="col col-3" data-head="Title">
                                            <p className="text-sm primary w-500">{item.title}</p>
                                          </li>
                                          <li className="col col-4" data-head="Description">
                                            <div className="sun-editor-output"
                                              dangerouslySetInnerHTML={{
                                                __html:

                                                  item.content.length > 8000 ?
                                                    `${item.content.slice(0, 8000)} ... 
                                          `: item.content
                                                ,
                                              }}
                                            >
                                            </div>
                                          </li>
                                          <li>
                                            <span className="cssIcon"
                                              onClick={() => handleLikeButton(item._id, item.LikeStatus)}
                                            >
                                              {/* <i className="ed-icon icon-like-thumb  i-xs primary"></i> */}
                                              like
                                            </span>
                                            <span>
                                              <p>{item.totalLike && item.totalLike}</p>
                                            </span>
                                            <span>
                                              <SharePopUp
                                                shareUrl={`${profileUrl}/website-blog-preview/${item._id}`}
                                                shareiconclass="base i-xs"
                                                shareBtnClass="btnText"
                                              />
                                            </span>
                                          </li>
                                        </ul>
                                      </div>
                                    </>
                                  );
                                }) :
                              ""
                            }
                            {featuredBlogList.length > 2 &&
                              <button className="button button-theme"
                                onClick={() => handleShowMoreButton("featuredBlogs")}
                              >
                                Show More
                              </button>}
                          </div> : ""
                      }
                    </div >
                  </React.Fragment>
                  :
                  <div className="loadingGridData">
                    <i className="ed-loadingGrid"></i>
                  </div>
                }
              </React.Fragment>
      }
    </>
  );
}
export default WebsiteBlogs;

