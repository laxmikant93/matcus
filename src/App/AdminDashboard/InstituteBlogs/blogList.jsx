import React from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AppLink from '../../../Common/AppLink';
import BackgroundDefault from "../../../assets/images/img/BackgroundDefault.png"
import Popup from '../../../Common/Popup';
import NoDataAvailable from '../../../Common/NoDataAvailable';
import { useEffect } from 'react';
import { acceptRejectBlogs, deleteBlog, getBlogList, restoreTrashedBlogs, updateBlog, updateBlogReset, } from '../../../store/actions/instituteblogs';
import FormInput from '../../../Common/Form/FormInput';
import moment from "moment";
import './bloglist.scss'

const BlogList = ({ blogs, blogList, insId, blogListType, onSelectedValue,
  refresh, pageSize, currentPage, selectCheckboxes }) => {

  let dispatch = useDispatch();
  let history = useNavigate();
  const RemovePopToggleRef = useRef();

  const [blogId, setBlogId] = useState("");
  const [removeBlogToggle, setRemoveBlogToggle] = useState(-1);
  const [restorePopupToggle, setRestorePopupToggle] = useState(-1);
  const [checkboxes, setCheckboxes] = useState([]);

  const { user, deleteBlogLoading, restoreBlogLoading, patchBlogSuccess } = useSelector((state) => {
    return {
      user: state.user,
      deleteBlogLoading: state.instituteblogs.deleteBlog.loading,
      restoreBlogLoading: state.instituteblogs.patchBlog.loading,
      patchBlogSuccess: state.instituteblogs.patchBlog.success
    }
  })

  useEffect(() => {
    switch (blogListType) {
      case "":
        dispatch(getBlogList(insId, user._id, "", pageSize, (currentPage - 1) * pageSize, "", "", "", ""));
        break;
      case "mine":
        dispatch(getBlogList(insId, user._id, user._id, pageSize, (currentPage - 1) * pageSize, "", "", "", ""));
        break;
      case "Published":
        dispatch(getBlogList(insId, user._id, "", pageSize, (currentPage - 1) * pageSize, "status", "publish", "", ""));
        break;
      case "Saved":
        dispatch(getBlogList(insId, user._id, "", pageSize, (currentPage - 1) * pageSize, "status", "save", "", ""));
        break;
      case "Trashed":
        dispatch(getBlogList(insId, user._id, "", pageSize, (currentPage - 1) * pageSize, "trash", true, "", ""))
        break;
      case "Pending":
        dispatch(getBlogList(insId, user._id, "", pageSize, (currentPage - 1) * pageSize, "status", "pendingForApproval", "", ""));
        break;
      case "Rejected":
        dispatch(getBlogList(insId, user._id, "", pageSize, (currentPage - 1) * pageSize, "status", "rejected", "", ""));
        break;
      default:
        dispatch(getBlogList(insId, user._id, "", pageSize, (currentPage - 1) * pageSize, "", "", "", ""));
    }
    setRemoveBlogToggle("");
    setRestorePopupToggle("");
  }, [pageSize, blogListType, currentPage, dispatch, insId, user._id, user.user_activeRole])

  const handleViewButton = (id) => {
    history(`/preview-blog/${id}/BlogList`);
  }

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

  const handleRestoreButton = (id) => {
    setBlogId(id);
    setRestorePopupToggle(restorePopupToggle === id ? -1 : id);
  }

  const handleRestorePopupRemoveButton = () => {
    dispatch(restoreTrashedBlogs(blogId));
    setRestorePopupToggle(-1);
  }

  useEffect(() => {
    setCheckboxes([...selectCheckboxes])
  }, [selectCheckboxes])

  const handleCheckboxes = (e, value) => {
    let inputChecked = e.target.checked;
    let array = checkboxes;
    if (inputChecked) {
      array.push(value)
    }
    else {
      let index = array.indexOf(value);
      array.splice(index, 1);
    }
    setCheckboxes([...array]);
    onSelectedValue([...array]);
  }

  const handleSelectALLCheckboxes = (e) => {
    let inputChecked = e.target.checked;
    if (inputChecked) {
      setCheckboxes([...blogList]);
      onSelectedValue([...blogList]);
    }
    else {
      setCheckboxes([])
      onSelectedValue([])
    }
  }

  const handleHideButton = (id, value) => {
    if (value === "Hide") {
      dispatch(updateBlog(id, { isHide: true }));
    }
    else {
      dispatch(updateBlog(id, { isHide: false }));
    }
  }

  useEffect(() => {
    if (patchBlogSuccess) {
      dispatch(updateBlogReset());
    }
  }, [dispatch, patchBlogSuccess])


  const handleAcceptButton = (id, listType) => {
    dispatch(acceptRejectBlogs(id, { status: "publish", publish_date: new Date() }, "accept", listType));
  }

  const handleRejectButton = (id, listType) => {
    dispatch(acceptRejectBlogs(id, { status: "rejected", publish_date: new Date() }, "reject", listType));
  }

  useEffect(() => {
    if (!refresh.length) {
      setCheckboxes([]);
    }
  }, [refresh.length])

  return (
    <React.Fragment>
      <div className="gridListTable">
        <ul className="gridHeader post-table-header">
          {/* <li className="col col-xs">&nbsp;</li> */}
          {blogListType !== "Trashed" && blogList.length ?
            <>
              {/* <li className="col col-xs">&nbsp;</li> */}
              <li className="col col-1">
                <input
                  type="checkbox"
                  onChange={handleSelectALLCheckboxes}
                  checked={blogs.success && blogList.length && checkboxes.length === blogList.length}
                />
              </li>
            </>

            :
            <li className="col col-1">&nbsp;</li>
          }
          <li className="col col-3">Title & Author</li>
          <li className="col col-2">Tags</li>
          <li className="col col-2">Category</li>
          <li className="col col-2">Date</li>
          <li className="col col-2">Likes</li>
          {/* <li className="col col-xs">&nbsp;</li> */}
        </ul>
        <div className="gridBody main-grid-body">
          {blogs.success ? blogList.length ? blogList.map((item, i) => {
            return (
              <div className="gridRow blogs-table-info text-2xs w-300" key={i}>
                <ul className="topInfo ">
                  {blogListType !== "Trashed" ?
                    <>
                      {/* <li className="col col-xs">&nbsp;</li> */}
                      <li className="col col-1">
                        <div className='inline title-handle'>
                          <input
                            type="checkbox"
                            onChange={(e) => handleCheckboxes(e, item)}
                            checked={checkboxes.includes(item)}
                          />
                        </div>
                      </li>
                    </>
                    :
                    <li className="col col-1">&nbsp;</li>
                  }
                  <li className="col col-3" data-head="Title & Author">
                    <div className='inline title-section'>
                      <p className="text-s primary w-500">{item.title}</p>
                      <p>{item.authorData ?
                        item.authorData.fullname : ""}</p>
                      <div className="inline  align-center blogs-btn-container ">

                        {blogListType !== "Trashed" ?
                          <>
                            {user.user_activeRole === process.env.REACT_APP_EMPLOYEE
                              && item.user !== user._id
                              ? ""
                              :
                              < button
                                className=" btn-xs title-btn text-3xs"
                                title="Edit"
                                onClick={() => handleEditButton(item._id)}
                              >
                                {/* <span className="cssIcon">
			                            <i className="ed-pen"></i>
			                            </span> */}
                                EDIT
                              </button>
                            }
                            <div className='edit-button-divider'></div>
                            <button
                              className="btn-xs title-btn text-3xs"
                              title="Preview"
                              type="button"
                              onClick={() => handleViewButton(item._id)}
                            >
                              {/* <span className="cssIcon">
			                          <i className="ed-eye"></i>
		                            </span> */}
                              PREVIEW
                            </button>
                          </>
                          : ""
                        }
                        <div className='edit-button-divider'></div>
                        {
                          user.user_activeRole === process.env.REACT_APP_EMPLOYEE ? "" :
                            (blogListType === "Published" ||
                              (blogListType === "" && item.status === "publish")) ?
                              <React.Fragment>
                                {item.isHide === true ?
                                  <>

                                    <button
                                      className="btn-xs title-btn text-3xs"
                                      title="unhide"
                                      type="button"
                                      onClick={() => handleHideButton(item._id, "UnHide")}
                                    >
                                      Show
                                    </button>
                                    <div className='edit-button-divider'></div>
                                  </>
                                  :
                                  <>

                                    < button
                                      className="btn-xs title-btn text-3xs"
                                      title="Hide"
                                      type="button"
                                      onClick={() => handleHideButton(item._id, "Hide")}
                                    >
                                      Hide
                                    </button>
                                    <div className='edit-button-divider'></div>
                                  </>}
                              </React.Fragment>
                              : ""
                        }

                        {user.user_activeRole === process.env.REACT_APP_EMPLOYEE &&
                          item.status === "publish" ? "" :
                          <React.Fragment>
                            {blogListType === "Trashed" ?
                              <button
                                className="btn-xs title-btn text-3xs"
                                title="Restore"
                                type="button"
                                onClick={() => handleRestoreButton(item._id)}
                              >
                                {<span className="cssIcon">
                                  <i className="ed-view"></i>
                                </span>}
                              </button>
                              :
                              <>
                                {user.user_activeRole === process.env.REACT_APP_EMPLOYEE &&
                                  item.user !== user._id ? "" :
                                  <button
                                    className="btn-xs title-btn text-3xs "
                                    title="Remove"
                                    type="button"
                                    onClick={() => handleRemoveButton(item._id)}
                                  >
                                    {/* <span className="cssIcon">
			                             <i className="ed-trash"></i>
			                           </span> */}
                                    DELETE
                                  </button>
                                }
                              </>
                            }
                          </React.Fragment>
                        }

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
                          </React.Fragment>}

                        {restorePopupToggle === item._id &&
                          <React.Fragment>
                            <Popup
                              show={restorePopupToggle}
                              removeButtonLabel={"Restore"}
                              cancelButtonLabel={"No, Cancel"}
                              leaveRequest={true}
                              RemoveProp={handleRestorePopupRemoveButton}
                              loading={restoreBlogLoading}
                              RemovePopToggleRef={RemovePopToggleRef}
                              CancelProp={() => setRestorePopupToggle(-1)}
                            >
                              <p className="gray text-s w-300">
                                You are about to restore this blog.
                              </p>
                              <p className="dgray text-s w-400">Are you sure?</p>
                            </Popup>
                          </React.Fragment>}

                        {user.user_activeRole === process.env.REACT_APP_EMPLOYEE ? "" :
                          <React.Fragment>
                            {(blogListType === "Rejected" ||
                              (blogListType === "" && item.status === "rejected")) &&
                              <button
                                className="btn-square"
                                title="Reject"
                                onClick={() => handleAcceptButton(item._id, "Rejected")}
                              >
                                {/* <span className="cssIcon">
		                               <i className="ed-trash"></i>
	                                 </span> */}
                                Accept
                              </button>}

                            {(blogListType === "Pending" ||
                              (blogListType === "" && item.status === "pendingForApproval")) &&
                              <>
                                <button
                                  className="btn-square"
                                  title="Accept"
                                  onClick={() => handleAcceptButton(item._id, "Pending")}
                                >
                                  {/* <span className="cssIcon">
				                            <i className="ed-trash"></i>
			                              </span> */}
                                  Accept
                                </button>
                                <button
                                  className="btn-square"
                                  title="Reject"
                                  onClick={() => handleRejectButton(item._id, "Pending")}
                                >
                                  {/* <span className="cssIcon">
				                            <i className="ed-trash"></i>
			                              </span> */}
                                  Reject
                                </button>
                              </>
                            }
                          </React.Fragment>
                        }

                      </div>
                    </div>

                  </li>
                  <li className="col col-2" data-head="Tags">
                    <p>hey this is blog section o edneed </p>
                  </li>
                  <li className="col col-2" data-head="Category">
                    <p>{item.categoryData ?
                      item.categoryData.category_title : ""}</p>
                  </li>
                  <li className="col col-2" data-head="Date">
                    {item.status === "publish" ?
                      <div>
                        <p>Published</p>
                        <p>
                          {moment(item.publish_date).format("DD-MM-YYYY")}
                          {moment(item.publish_date).format("hh:mm a")}
                        </p>
                      </div>
                      : item.status === "pendingForApproval" ?
                        <div>
                          <p>Pending for Approval</p>
                          <p>
                            {moment(item.publish_date).format("DD-MM-YYYY")}
                            {moment(item.publish_date).format("hh:mm a")}
                          </p>
                        </div>
                        : item.status === "rejected" ?
                          <div>
                            <p>Rejected</p>
                            <p>
                              {moment(item.publish_date).format("DD-MM-YYYY")}
                              {moment(item.publish_date).format("hh:mm a")}
                            </p>
                          </div>
                          :
                          <div>
                            <p >Draft</p>
                            <p>{moment(item.createdAt).format("DD-MM-YYYY")}</p>
                            <p>{moment(item.createdAt).format("hh:mm a")}</p>
                          </div>
                    }
                  </li>
                  <li className="col col-2" data-head="Likes">
                    <p>{item.totalLike}</p>
                  </li>

                </ul>
              </div>
            );
          })
            :
            <NoDataAvailable title="No Records Found." />
            :
            <div className="loadingGridData">
              <i className="ed-loadingGrid"></i>
            </div>
          }

        </div>
      </div>
    </React.Fragment >
  );
}

export default BlogList;
