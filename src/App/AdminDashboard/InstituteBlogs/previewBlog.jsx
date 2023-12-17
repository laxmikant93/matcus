import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../../../Common/Breadcrumb';
import BreadcrumbItem from '../../../Common/Breadcrumb/BreadcrumbItem';
import GrayAuthTheme from '../../../Common/Theme/GrayAuthTheme';
import { getSingleBlog, updateBlog, updateBlogReset } from '../../../store/actions/instituteblogs';
import './previewblog.scss'

const PreviewBlog = () => {
  let { id, state } = useParams();
  let dispatch = useDispatch();
  let history = useNavigate();

  const { user, indId, singleBlogData, singleBlogSuccess, patchSuccess } = useSelector((state) => {
    return {
      user: state.user,
      insId: state.user.user_institute,
      singleBlogData: state.instituteblogs.getSingleBlog.data,
      singleBlogSuccess: state.instituteblogs.getSingleBlog.success,
      patchSuccess: state.instituteblogs.patchBlog.success,
    }
  })

  useEffect(() => {
    dispatch(getSingleBlog(id, user._id));
  }, [dispatch, id, user._id])

  const handleBackButton = () => {
    history("/blog-list");
  }

  const handleEditButton = () => {
    history(`/edit-blog/${id}`)
  }

  const handleAcceptButton = () => {
    dispatch(updateBlog(id, { status: "publish", publish_date: new Date() }));
  }

  const handleRejectButton = () => {
    dispatch(updateBlog(id, { status: "rejected", publish_date: new Date() }));
  }

  useEffect(() => {
    if (patchSuccess) {
      history("/blog-list");
    }
    return () => {
      dispatch(updateBlogReset());
    }
  }, [dispatch, history, patchSuccess])

  return (
    <GrayAuthTheme>

      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        {/* <BreadcrumbItem to="/blogs" title="Blogs" /> */}
        {state === "BlogList" ?
          <>
            <BreadcrumbItem to="/blogs" title="Blog" />
            <BreadcrumbItem to="/blog-list" title="Preview" />
            <BreadcrumbItem to={`/preview-blog/${id}/BlogList`} title={singleBlogSuccess ?
              singleBlogData.title : ""} />
          </>
          :
          <>
            <BreadcrumbItem to="/blog-categories" title="Blog Categories" />
            <BreadcrumbItem to={`/preview-category/${singleBlogSuccess ?
              singleBlogData.categoryData._id : ""}`}
              title={singleBlogSuccess ?
                singleBlogData.categoryData.category_title : ""} />
            <BreadcrumbItem to={`/preview-blog/${id}/BlogCategory`} title={singleBlogSuccess ?
              singleBlogData.title : ""} />
          </>
        }
      </Breadcrumb>
      <React.Fragment>
        <div className='formFieldwrap visitorFromfield mt-5'>
          <div className='inline between-xs align-center between-lg heading-topbtn-container'>
            <p className="text-lg black w-600 top-heading "> {singleBlogSuccess ?
              singleBlogData.title : ""}</p>
            <div className='buttons-wrapper mb-15 btn-container'>
              <button
                className="btn-square btn-sm text-xs primary back-button"
                title="Refresh"
                onClick={handleBackButton}
              >
                {/* <span className="cssIcon">
                  <i className="ed-trash"></i>
                </span> */}
                Back
              </button>
              <button
                className="btn-square white edit-button"
                title="Refresh"
                onClick={handleEditButton}
              >
                {/* <span className="cssIcon">
                  <i className="ed-trash"></i>
                </span> */}
                Edit
              </button>
              {singleBlogSuccess && singleBlogData.status === "pendingForApproval" ?
                <>
                  <button
                    className="btn-square "
                    title="Refresh"
                    onClick={handleAcceptButton}
                  >
                    {/* <span className="cssIcon">
                  <i className="ed-trash"></i>
                </span> */}
                    Accept
                  </button>
                  <button
                    className="btn-square"
                    title="Refresh"
                    onClick={handleRejectButton}
                  >
                    {/* <span className="cssIcon">
                  <i className="ed-trash"></i>
                </span> */}
                    Reject
                  </button>
                </> :
                singleBlogSuccess && singleBlogData.status === "rejected" ?
                  <button
                    className="btn-square"
                    title="Refresh"
                    onClick={handleAcceptButton}
                  >
                    {/* <span className="cssIcon">
                       <i className="ed-trash"></i>
                     </span> */}
                    Accept
                  </button>
                  : ""
              }
            </div>
          </div>
          <hr className='mb-15 mt-15' />

          <div className='blogListtopheader text-xs w-300 content-container-wrapper sun-editor-output'>
            <p

              dangerouslySetInnerHTML={{
                __html:
                  singleBlogSuccess ?
                    singleBlogData.content : "",
              }}
            ></p>
          </div>
        </div>
      </React.Fragment>

    </GrayAuthTheme >
  )
}
export default PreviewBlog;