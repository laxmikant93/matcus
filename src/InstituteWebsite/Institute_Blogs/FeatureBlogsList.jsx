import React from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import GrayAuthTheme from '../../Common/Theme/GrayAuthTheme';
import { getFeaturedBlogsList } from '../../store/actions/instituteblogs';
import BackgroundDefault from "../../assets/images/img/BackgroundDefault.png"
import NoDataAvailable from '../../Common/NoDataAvailable';
// import AppLink from '../../Common/AppLink';
import SharePopUp from '../../Common/SharePopUp';
import AppLinkUrl from '../../Common/AppLink/AppLinkUrl';
import { useState } from 'react';
import PreviewBlog from './PreviewBlog';
import ImageViewer from '../../Common/ImageViewer';

const FeatureBlogsList = () => {

  let dispatch = useDispatch();
  let profileUrl = window.location.host;

  const [blogId, setblogId] = useState("");
  const [previewpage, setpreviewpage] = useState(false);

  const { user, insDetails, success, featuredBlogsData, nonFeaturedBlogsData } = useSelector((state) => {
    return {
      user: state.user,
      insDetails: state.institutewebsite.data,
      success: state.instituteblogs.getWebsiteFeatureBlogs.success,
      featuredBlogsData: state.instituteblogs.getWebsiteFeatureBlogs.featuredBlogs,
      nonFeaturedBlogsData: state.instituteblogs.getWebsiteFeatureBlogs.nonFeaturedBlogs
    }
  })

  useEffect(() => {
    if (AppLinkUrl.privateDomain()) {
      dispatch(getFeaturedBlogsList(insDetails.domain, "privateDomain"));
    }
    else {
      dispatch(getFeaturedBlogsList(insDetails.institute_subdomain, "subDomain"));
    }
  }, [dispatch, insDetails.domain, insDetails.institute_subdomain, user.domain])

  const handleonClick = (id) => {
    setpreviewpage(true);
    setblogId(id);
  }

  return (
    <GrayAuthTheme>
      {previewpage ? <PreviewBlog blogId={blogId} /> :
        <div className="pageInCenter">
          <React.Fragment>
            <>
              {success ?
                <div>
                  <div>
                    <div className="text-xl w-500">All Featured</div>
                    {success && featuredBlogsData &&
                      featuredBlogsData.length ?
                      featuredBlogsData.map((item, i) => {
                        return (
                          <>
                            <div className="gridRow" key={i}
                            >
                              <ul className="topInfo">
                                <li>
                                  <ImageViewer object={
                                      !item.blog_image ||
                                        item.blog_image === ""
                                        ? BackgroundDefault
                                        : item.blog_image
                                    } defaultImage={BackgroundDefault}/>

                                  {/* <img
                                    className="TableThumbnail"
                                    src={
                                      !item.blog_image ||
                                        item.blog_image === ""
                                        ? BackgroundDefault
                                        : item.blog_image
                                    }
                                    alt="Blog category Thumbnail"
                                  /> */}
                                </li>
                                <li className="col col-3" data-head="Title">
                                  <p className="text-sm primary w-500">{item.title}</p>
                                </li>
                                <li className="col col-4" data-head="Description">
                                  <div className="sun-editor-output"
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        item.content.length > 180 ?
                                          `${item.content.slice(0, 2500)} ... 
                                          `: item.content
                                      ,
                                    }}
                                  >
                                  </div>
                                  {item.content.length > 180 ?
                                    <button onClick={() => handleonClick(item._id)}>Read More</button>
                                    // <AppLink to={`/website-blog-preview/${item._id}`}>Read More</AppLink>
                                    : ""
                                  }
                                </li>
                                <br />
                                <br />
                              </ul>
                            </div>
                          </>
                        );
                      }) :
                      <NoDataAvailable title="No Records Found." />
                    }
                  </div>
                  <div>
                    <div className="text-xl w-500">Non-Featured Blogs</div>
                    {success && nonFeaturedBlogsData &&
                      nonFeaturedBlogsData.length ?
                      nonFeaturedBlogsData.map((item, i) => {
                        return (
                          <>
                            <div className="gridRow" key={i}
                            >
                              <ul className="topInfo">
                                <li>
                                  <ImageViewer object={item.authorData.profile_picture ?
                                      !item.authorData.profile_picture ||
                                        item.authorData.profile_picture === ""
                                        ? BackgroundDefault
                                        : item.authorData.profile_picture
                                      : BackgroundDefault}  defaultImage={BackgroundDefault} />
                                  {/* <img
                                    className="TableThumbnail"
                                    src={item.authorData.profile_picture ?
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
                                        item.content.length > 180 ?
                                          `${item.content.slice(0, 2500)} ... 
                                          `: item.content
                                      ,
                                    }}
                                  >
                                  </div>
                                </li>
                                <li>
                                  <span>
                                    <SharePopUp
                                      shareUrl={`${profileUrl}/website-blog-preview/${item._id}`}
                                      shareiconclass="base i-xs"
                                      shareBtnClass="btnText"
                                    />
                                  </span>
                                </li>
                                <br />
                                <br />
                              </ul>
                            </div>
                          </>
                        );
                      }) :
                      <NoDataAvailable title="No Records Found." />
                    }
                  </div>
                </div>
                : <div className="loadingGridData">
                  <i className="ed-loadingGrid"></i>
                </div>
              }
            </>
          </React.Fragment>
        </div>
      }
    </GrayAuthTheme>
  )
}
export default FeatureBlogsList;
