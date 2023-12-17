import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import NoDataAvailable from '../../Common/NoDataAvailable';
import GrayAuthTheme from '../../Common/Theme/GrayAuthTheme';
import { getBlogList, getCategoryWiseBlogs, getSingleCategory, getSingleCategoryReset, likeBlog } from '../../store/actions/instituteblogs';
import BackgroundDefault from "../../assets/images/img/BackgroundDefault.png"
// import AppLink from '../../Common/AppLink';
import SharePopUp from '../../Common/SharePopUp';
import { useState } from 'react';
import ImageViewer from '../../Common/ImageViewer';

const CategoryWiseBlogList = ({ blogId }) => {

  let dispatch = useDispatch();
  let history = useNavigate();
  let profileUrl = window.location.host;

  const { user, insId, blogs, blogList, categoryData, categorySuccess } = useSelector((state) => {
    return {
      user: state.user,
      insId: state.user.user_institute,
      blogs: state.instituteblogs.getSubdomainCategoryBlogs,
      blogList: state.instituteblogs.getSubdomainCategoryBlogs.data,
      categoryData: state.instituteblogs.getSingleCategory.data,
      categorySuccess: state.instituteblogs.getSingleCategory.success,
    }
  })

  const [categoryId, setcategoryId] = useState("");

  useEffect(() => {
    if (categorySuccess && categoryData.length) {
      setcategoryId(categoryData[0]._id)
    }
  }, [categoryData, categorySuccess])

  // let categoryId = categorySuccess && categoryData.length ? categoryData[0]._id : ""



  useEffect(() => {
    if (categoryId) {
      dispatch(getCategoryWiseBlogs(insId, categoryId));
    }
  }, [categoryId, dispatch, insId])

  useEffect(() => {
    dispatch(getSingleCategory(blogId))
    return () => {
      dispatch(getSingleCategoryReset());
    }
  }, [blogId, dispatch])

  // const handleLikeButton = (_id) => {
  //   dispatch(likeBlog({
  //     blog: _id,
  //     user: user._id
  //   }));
  // }

  return (
    <GrayAuthTheme>
      <div className="pageInCenter">
        <React.Fragment>
          <div className='formFieldwrap visitorFromfield mt-5'>
            <div>
              <div className="ServiceListThubnail">
                <ImageViewer object={
                    categorySuccess &&
                      categoryData.length ?
                      !categoryData[0].category_cover_image ||
                        categoryData[0].category_cover_image === ""
                        ? BackgroundDefault
                        : categoryData[0].category_cover_image
                      : ""
                  } defaultImage={BackgroundDefault}/>
                {/* <img
                  className="TableThumbnail"
                  src={
                    categorySuccess &&
                      categoryData.length ?
                      !categoryData[0].category_cover_image ||
                        categoryData[0].category_cover_image === ""
                        ? BackgroundDefault
                        : categoryData[0].category_cover_image
                      : ""
                  }
                  alt="Blog category Thumbnail"
                /> */}
              </div>
              <p className="text-sm primary w-500">
                {categorySuccess && categoryData.length ?
                  categoryData[0].category_title : ""}
              </p>
              <div className='blogListtopheader'>
                <p>
                  {categorySuccess && categoryData.length ?
                    categoryData[0].category_desc : ""}
                </p>
              </div>
            </div>
            <br />
            <br />
            <div>
              {blogs.success ? blogList.length ? blogList.map((item, i) => {
                return (
                  <div key={i}>
                    <ul>
                      <li>
                        <ImageViewer object={item.userData[0].profile_picture ?
                            !item.userData[0].profile_picture ||
                              item.userData[0].profile_picture === ""
                              ? BackgroundDefault
                              : item.userData[0].profile_picture
                            : BackgroundDefault}  defaultImage={BackgroundDefault}/>

                        {/* <img
                          className="TableThumbnail"
                          src={item.userData[0].profile_picture ?
                            !item.userData[0].profile_picture ||
                              item.userData[0].profile_picture === ""
                              ? BackgroundDefault
                              : item.userData[0].profile_picture
                            : BackgroundDefault
                          }
                          alt="Blog category Thumbnail"
                        /> */}
                      </li>
                      <li>
                        <p className="text-s w-500">{item.userData[0].fullname}</p>
                      </li>
                      <br />
                      <li>
                        <p className="text-sm primary w-500">{item.title}</p>
                      </li>
                      <li>
                        <div className='sun-editor-output'
                          dangerouslySetInnerHTML={{
                            __html:
                              item.content.length > 2000 ?
                                `${item.content.slice(0, 2000)}... 
                        `: item.content,
                          }}
                        >
                        </div>
                      </li>
                      <br />
                      <li>
                        {/* <span className="cssIcon"
                          onClick={() => handleLikeButton(item._id)}
                        >
                          <i className="ed-icon icon-like-thumb  i-xs primary"></i> 
                          lik
                        </span>
                        <span>
                          <p></p>
                        </span> */}
                        <span>
                          <SharePopUp
                            shareUrl={`${profileUrl}/website-blog-preview/${item._id}`}
                            shareiconclass="base i-xs"
                            shareBtnClass="btnText"
                          />
                        </span>
                      </li>
                      <br />
                    </ul>
                  </div>
                )
              }) : <NoDataAvailable title="No Records Found." />
                : <div className="loadingGridData">
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

export default CategoryWiseBlogList;
