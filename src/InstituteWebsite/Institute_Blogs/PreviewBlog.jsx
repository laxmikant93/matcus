import React from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
// import InstituteTheme from '../../Common/Theme/InstituteTheme';
import { getSingleBlog, likeBlog } from '../../store/actions/instituteblogs';
import moment from "moment";
import SharePopUp from '../../Common/SharePopUp';
import BackgroundDefault from "../../assets/images/img/BackgroundDefault.png"
// import { putFollow } from '../../store/actions/publicProfile';
// import AppLink from '../../Common/AppLink';
import { useState } from 'react';
import AuthorBlogList from './AuthorBlogList';
import ImageViewer from '../../Common/ImageViewer';

const PreviewBlog = ({ blogId }) => {
  let dispatch = useDispatch();
  let history = useNavigate();
  let shareUrl = `/website-blog-preview/${blogId}`
  let profileUrl = window.location.host;

  const [authorBlogs, setAuthorBlogs] = useState(false);

  const { user, singleBlogData, singleBlogSuccess } = useSelector((state) => {
    return {
      user: state.user,
      singleBlogData: state.instituteblogs.getSingleBlog.data,
      singleBlogSuccess: state.instituteblogs.getSingleBlog.success,
    }
  })

  useEffect(() => {
    if (user) {
      dispatch(getSingleBlog(blogId, user._id))
    } else {
      dispatch(getSingleBlog(blogId))
    }
  }, [blogId, dispatch, user, user._id])

  const handleLikeButton = (id, status) => {
    if (user.length) {
      dispatch(likeBlog({
        blog: id,
        user: user._id,
        isLike: !status,
        status: "previewBlog"
      }));
    }
    else {
      history("/auth/login");
    }
  }

  // const handleLikeButton = (id, status, totalLike) => {
  //   let data;
  //   if (status === false) {
  //     data = {
  //       blog: id,
  //       user: user._id,
  //       isLike: !status,
  //       totalLike: totalLike + 1,
  //     }
  //   }
  //   else {
  //     data = {
  //       blog: id,
  //       user: user._id,
  //       isLike: !status,
  //       totallike: totalLike - 1,
  //     }
  //   }
  //   dispatch(likeBlog(data));
  // }


  // const handleFollowButton = () => {
  //   dispatch(putFollow(user._id, {}));
  // }

  const handleOnClick = () => {
    setAuthorBlogs(true);
  }

  return (
    <>
      {authorBlogs ? <AuthorBlogList authorId={singleBlogSuccess ? singleBlogData.authorData._id : ""} /> :
        < React.Fragment >
          <div className="sectionCntrWrap">
            <div>
              <div>
                <ImageViewer object={singleBlogSuccess &&
                    singleBlogData.authorData.profile_picture ?
                    !singleBlogData.authorData.profile_picture ||
                      singleBlogData.authorData.profile_picture === ""
                      ? BackgroundDefault
                      : singleBlogData.authorData.profile_picture
                    : BackgroundDefault
                  } defaultImage={BackgroundDefault} />
                {/* <img
                  className="TableThumbnail"
                  src={singleBlogSuccess &&
                    singleBlogData.authorData.profile_picture ?
                    !singleBlogData.authorData.profile_picture ||
                      singleBlogData.authorData.profile_picture === ""
                      ? BackgroundDefault
                      : singleBlogData.authorData.profile_picture
                    : BackgroundDefault
                  }
                  alt="author profile"
                /> */}
                <p className="text-s primary w-500">{singleBlogSuccess ? singleBlogData.authorData.fullname : ""
                }
                </p>
                <p>
                  {singleBlogSuccess ?
                    <>
                      {moment(singleBlogData.publish_date).format("MMM DD")}
                      {/* {moment(singleBlogData[0].publish_date).format("hh:mm a")} */}
                    </>
                    : ""
                  }
                </p>
                <ul className="socialShare-icon">
                  <li className="socialShare-iconItem">
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${profileUrl}${shareUrl}`}
                      title="Facebook"
                      target="blank"
                    >
                      <i className="ed-icon icon-fb i-md gray"></i>
                    </a>
                  </li>
                  <li className="socialShare-iconItem">
                    <a
                      href={`https://twitter.com/intent/tweet?url=${profileUrl}${shareUrl}&text=`}
                      title="Twitter"
                      target="blank"
                    >
                      <i className="ed-icon icon-twitter i-md gray"></i>
                    </a>
                  </li>
                  <li className="socialShare-iconItem">
                    <a
                      href={`https://wa.me?text=${profileUrl}${shareUrl}`}
                      title="whatsapp"
                      target="blank"
                    >
                      <i className="ed-icon icon-whatsapp i-md gray"></i>
                    </a>
                  </li>
                  <li className="socialShare-iconItem">
                    <a
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${profileUrl}${shareUrl}`}
                      title="Linkedin"
                      target="blank"
                    >
                      <i className="ed-icon icon-linkedin i-md gray"></i>
                    </a>
                  </li>
                  <li className="socialShare-iconItem">
                    <a
                      href={`mailto:info@edneed.com?&subject=&cc=&bcc=&body=${profileUrl}${shareUrl}%0A`}
                      title="Email"
                      target="blank"
                    >
                      <i className="ed-icon icon-mail i-md gray"></i>
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <p className="text-s primary w-500">
                  {singleBlogSuccess ? singleBlogData.title : ""}
                </p>
                <div className="sun-editor-output"
                  dangerouslySetInnerHTML={{
                    __html:
                      singleBlogSuccess ?
                        singleBlogData.content
                        : ""
                    ,
                  }}
                ></div>
                <li>
                  <span className="cssIcon"
                    onClick={() => handleLikeButton(singleBlogData._id, singleBlogData.LikeStatus)}
                  >
                    <i className="ed-icon icon-like-thumb  i-xs primary"></i>
                  </span>
                  <p>
                    {singleBlogSuccess && singleBlogData.totalLike ?
                      singleBlogData.totalLike : 0}
                  </p>
                  <span>
                    <SharePopUp
                      shareUrl={`${profileUrl}/website-blog-preview/${singleBlogSuccess ?
                        singleBlogData._id : ""}`}
                      shareiconclass="base i-xs"
                      shareBtnClass="btnText"
                    />
                  </span>
                </li>
              </div>
              <div>
                <span>
                  <p onClick={handleOnClick}>
                    {`More From ${singleBlogSuccess ? singleBlogData.authorData.fullname : ""}`}
                  </p>
                  <p>{singleBlogSuccess ? singleBlogData.author_description : ""}</p>
                </span>
                {/* <button className='button button-sm w-600 button-primary'
            // onClick={handleFollowButton}
            >
              <i className="ed-icon icon-plus-add white i-xs"></i>
              Follow
            </button> */}
              </div>
            </div>
            <div></div>
          </div>
        </React.Fragment >
      }
    </>
  )
}
export default PreviewBlog;