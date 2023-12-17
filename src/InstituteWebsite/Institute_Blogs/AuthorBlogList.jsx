import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
import ImageViewer from "../../Common/ImageViewer"
import GrayAuthTheme from '../../Common/Theme/GrayAuthTheme';
import { getBlogList } from '../../store/actions/instituteblogs';
import BackgroundDefault from "../../assets/images/img/BackgroundDefault.png"
import NoDataAvailable from '../../Common/NoDataAvailable';
import SharePopUp from '../../Common/SharePopUp';

const AuthorBlogList = ({ authorId }) => {

  let dispatch = useDispatch();
  let profileUrl = window.location.host;

  const { user, insDetails, blogs, blogList } = useSelector((state) => {
    return {
      user: state.user,
      insDetails: state.institutewebsite.data,
      blogs: state.instituteblogs.getBlogList,
      blogList: state.instituteblogs.getBlogList.data
    }
  })


  useEffect(() => {
    dispatch(getBlogList(user.user_institute, user._id, authorId, "", ""));
  }, [dispatch, authorId, user.user_institute, user._id])
  return (
    <GrayAuthTheme>
      <>
        {blogs.success ?
          <div className="pageInCenter">
            <React.Fragment>
              <div>
                <div className="ServiceListThubnail">
                  <ImageViewer defaultImage={BackgroundDefault} object={blogs.success &&
                        blogList.length &&
                        blogList[0].authorData && blogList[0].authorData.profile_picture ?
                        !blogList[0].authorData.profile_picture ||
                          blogList[0].authorData.profile_picture === ""
                          ? BackgroundDefault
                          : blogList[0].authorData.profile_picture
                        : BackgroundDefault} />
                  {/* <img
                    className="TableThumbnail"
                    src={
                      blogs.success &&
                        blogList.length &&
                        blogList[0].authorData && blogList[0].authorData.profile_picture ?
                        !blogList[0].authorData.profile_picture ||
                          blogList[0].authorData.profile_picture === ""
                          ? BackgroundDefault
                          : blogList[0].authorData.profile_picture
                        : BackgroundDefault
                    }
                    alt="author profile"
                  /> */}
                  <p className="text-s w-500">{blogs.success &&
                    blogList.length &&
                    blogList[0].authorData ? blogList[0].authorData.fullname : ""}
                  </p>
                  <p>
                    {blogs.success &&
                      blogList.length &&
                      blogList[0].authorData ?
                      blogList[0].author_description : ""}
                  </p>
                </div>
                <br />
                <div>
                  {blogs.success &&
                    blogList.length ?
                    blogList.map((item, i) => {
                      return (
                        <div key={i}>
                          <ul>
                            <li>
                              <ImageViewer object={
                                  !item.blog_image ||
                                    item.blog_image === ""
                                    ? BackgroundDefault
                                    : item.blog_image
                                } defaultImage={BackgroundDefault} />
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
                  }
                </div>
              </div>
            </React.Fragment>
          </div>
          :
          <div className="loadingGridData">
            <i className="ed-loadingGrid"></i>
          </div>
        }
      </>
    </GrayAuthTheme>
  )
}
export default AuthorBlogList;