import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../../../Common/Breadcrumb';
import BreadcrumbItem from '../../../Common/Breadcrumb/BreadcrumbItem';
import GrayAuthTheme from '../../../Common/Theme/GrayAuthTheme';
import { deleteBlog, getBlogList, getSingleCategory, getSingleCategoryReset, updateBlog } from '../../../store/actions/instituteblogs';
import BackgroundDefault from "../../../assets/images/img/BackgroundDefault.png"
import SearchControl from '../../../Common/SearchControl';
import { useState } from 'react';
import Popup from '../../../Common/Popup';
import { useRef } from 'react';
import NoDataAvailable from '../../../Common/NoDataAvailable';
import AppLink from '../../../Common/AppLink';

const PreviewCategory = () => {

  let { id } = useParams();
  let history = useNavigate();
  let dispatch = useDispatch();
  const RemovePopToggleRef = useRef();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchFind, setSearchFind] = useState(false);
  const [blogId, setBlogId] = useState("");
  const [removeBlogToggle, setRemoveBlogToggle] = useState(-1);


  const { insId, singleCategoryData, singleCategorySuccess,
    blogs, blogList, deleteBlogLoading } = useSelector((state) => {
      return {
        insId: state.user.user_institute,
        singleCategoryData: state.instituteblogs.getSingleCategory.data,
        singleCategorySuccess: state.instituteblogs.getSingleCategory.success,
        blogs: state.instituteblogs.getBlogList,
        blogList: state.instituteblogs.getBlogList.data,
        deleteBlogLoading: state.instituteblogs.deleteBlog.loading,
      }
    })

  useEffect(() => {
    dispatch(getSingleCategory(id))
    return () => {
      dispatch(getSingleCategoryReset());
    }
  }, [id, dispatch])

  useEffect(() => {
    if (singleCategorySuccess) {
      dispatch(getBlogList(insId, "", "", "", "", "category", singleCategoryData[0]._id));
    }
  }, [dispatch, insId, singleCategoryData, singleCategorySuccess]);

  let typing;
  const handleSearch = (e) => {
    let inputValue = e.target.value
    clearTimeout(typing);
    typing = setTimeout(() => {
      setSearchTerm(inputValue);
      setSearchFind(true);
    }, 400);
  }

  useEffect(() => {
    if (searchFind) {
      dispatch(getBlogList(insId, "category", singleCategoryData[0]._id, "search", searchTerm));
    }
  }, [dispatch, insId, searchFind, searchTerm, singleCategoryData])

  const handleEditButton = (id) => {
    history(`/edit-blog/${id}`)
  }

  const handleRemoveButton = (id) => {
    setBlogId(id);
    setRemoveBlogToggle(removeBlogToggle === id ? -1 : id);
  }

  const handleRemovePopupButton = () => {
    dispatch(deleteBlog(blogId));
    setRemoveBlogToggle(-1);
  }

  const handleHideButton = (id, value) => {
    if (value === "Hide") {
      dispatch(updateBlog(id, { isHide: true }));
    }
    else {
      dispatch(updateBlog(id, { isHide: false }));
    }
  }

  return (
    <GrayAuthTheme>
      <div className="pageInCenter">
        <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          {/* <BreadcrumbItem to="/blogs" title="Blogs" /> */}
          <BreadcrumbItem to="/blog-categories" title="Blog Categories" />
          <BreadcrumbItem to={`/preview-category/${id}`} title={singleCategorySuccess ?
            singleCategoryData[0].category_title : ""} />
        </Breadcrumb>
        <React.Fragment>
          <div className='formFieldwrap visitorFromfield mt-5'>
            <p>
              {singleCategorySuccess ?
                singleCategoryData[0].category_title : ""}</p>
            <div className="PTH-Item dis-right">
              <SearchControl
                classNameWrappper="tableSearchbar" id="search"
                onKeyUp={handleSearch}
                onChange={handleSearch}
                name="search"
                placeholder="Search Categories" />
            </div>
            <div className='blogListtopheader'>
              <p>
                {singleCategorySuccess ?
                  singleCategoryData[0].category_desc : ""}</p>
            </div>
          </div>

          <div className="gridListTable">
            <ul className="gridHeader">
              <li className="col col-3">Icon/Image</li>
              <li className="col col-3">Title</li>
              <li className="col col-4">Description</li>
              <li className="col col-2">&nbsp;</li>
            </ul>
            <div className="gridBody">
              {blogs.success ? blogList.length ? blogList.map((item, i) => {
                return (
                  <div className="gridRow" key="">
                    <ul className="topInfo">
                      <li className="col col-3" data-head="Icon/Image">
                        <div className="ServiceListThubnail">
                          <img
                            className="TableThumbnail"
                            src={
                              !item.blog_image || item.blog_image === ""
                                ? BackgroundDefault
                                : item.blog_image
                            }
                            alt="Blog Feature Thumbnail"
                          />
                        </div>
                      </li>
                      <li className="col col-3" data-head="Title">
                        <p className="text-sm primary w-500">{item.title}</p>
                      </li>
                      <li className="col col-2" data-head="Description">
                        <div className="sun-editor-output"
                          dangerouslySetInnerHTML={{
                            __html:
                              item.content.length > 180 ?
                                `${item.content.slice(0, 180)}... 
                        `: item.content,
                          }}
                        >
                        </div>
                        {item.content.length > 180 ?
                          <AppLink to={`/preview-blog/${item._id}/BlogCategory`}>Read More</AppLink> : ""}
                      </li>
                      <li className="col col-2 actionCols">
                      </li>
                      <li className="col col-2 actionCols">
                        <div className="actionBtn">
                          <button
                            className="btn-square"
                            title="Edit"
                            onClick={() => handleEditButton(item._id)}
                          >
                            <span className="cssIcon">
                              <i className="ed-pen"></i>
                            </span>
                          </button>

                          {item.isHide === true ?
                            <>
                              <button
                                className="btn-square"
                                title="unhide"
                                type="button"
                                onClick={() => handleHideButton(item._id, "UnHide")}
                              >
                                Show
                              </button>
                            </>
                            :
                            <>
                              < button
                                className="btn-square"
                                title="Hide"
                                type="button"
                                onClick={() => handleHideButton(item._id, "Hide")}
                              >
                                Hide
                              </button>
                            </>
                          }

                          <button
                            className="btn-square"
                            title="Remove"
                            type="button"
                            onClick={() => handleRemoveButton(item._id)}
                          >
                            <span className="cssIcon">
                              <i className="ed-trash"></i>
                            </span>
                          </button>



                          {removeBlogToggle === item._id &&
                            <React.Fragment>
                              <Popup
                                show={removeBlogToggle}
                                removeButtonLabel={"Delete"}
                                cancelButtonLabel={"No, Cancel"}
                                leaveRequest={true}
                                RemoveProp={handleRemovePopupButton}
                                loading={deleteBlogLoading}
                                RemovePopToggleRef={RemovePopToggleRef}
                                CancelProp={() => setRemoveBlogToggle(-1)}
                              >
                                <p className="gray text-s w-300">
                                  You are about to delete this blog.
                                </p>
                                <p className="dgray text-s w-400">Are you sure?</p>
                              </Popup>
                            </React.Fragment>
                          }
                        </div>

                      </li>
                    </ul>
                  </div>
                );
              }) :
                <NoDataAvailable title="No Records Found." />
                :
                <div className="loadingGridData">
                  <i className="ed-loadingGrid"></i>
                </div>
              }
            </div>
          </div>
        </React.Fragment>
      </div>
    </GrayAuthTheme>
  );
}
export default PreviewCategory;