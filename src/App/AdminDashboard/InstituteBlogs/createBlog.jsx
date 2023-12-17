import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../../Common/Breadcrumb';
import BreadcrumbItem from '../../../Common/Breadcrumb/BreadcrumbItem';
import InstituteTheme from '../../../Common/Theme/InstituteTheme';
import './blog.scss';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FormInput from '../../../Common/Form/FormInput';
import FormTextArea from '../../../Common/Form/FormTextArea';
import ImageCropper from '../../../Common/Cropper';
import ValidationFile from '../../../Classes/ValidationFile';
import ValidationUtils from '../../../Classes/ValidationUtils';
import FormError from '../../../Common/Form/FormError';
import {
  getCategoryLists, postBlogDetail, resetPostBlogDetail, getSingleBlog,
  updateBlog, updateBlogReset, getSingleBlogReset, getAuthorDescription
} from '../../../store/actions/instituteblogs';
import CreateCategory from './createCategory';
import TextEditor from '../../../Common/Form/TextEditor';
import { getEmployeeList } from '../../../store/actions/employee';
import Upload from '../../../Common/Upload';
import './createblog.scss'

const AddNewBlog = () => {

  const { id } = useParams();

  const { user, insId, postBlogDetailSuccess, postBlogDetailLoading, prefilledAuthorDesc,
    postBlogDetailSaveLoading, getCategoryListData, getCategoryListSuccess,
    postCategorySuccess, postCategoryData, singleBlogSuccess, singleBlogData,
    patchBlogDetailSuccess, patchBlogDetailLoading, authorDescSuccess,
    patchBlogDetailSaveLoading, employeeList, employeeListSuccess } = useSelector((state) => {
      return {
        user: state.user,
        insId: state.user.user_institute,
        postBlogDetailSuccess: state.instituteblogs.postBlog.success,
        postBlogDetailLoading: state.instituteblogs.postBlog.loading,
        postBlogDetailSaveLoading: state.instituteblogs.postBlog.saveLoading,
        getCategoryListData: state.instituteblogs.getCategoryLists.data,
        getCategoryListSuccess: state.instituteblogs.getCategoryLists.success,
        postCategorySuccess: state.instituteblogs.postCategory.success,
        postCategoryData: state.instituteblogs.postCategory.data,
        singleBlogSuccess: state.instituteblogs.getSingleBlog.success,
        singleBlogData: state.instituteblogs.getSingleBlog.data,
        patchBlogDetailSuccess: state.instituteblogs.patchBlog.success,
        patchBlogDetailSaveLoading: state.instituteblogs.patchBlog.saveLoading,
        patchBlogDetailLoading: state.instituteblogs.patchBlog.loading,
        employeeList: state.employee.list.data,
        employeeListSuccess: state.employee.list.success,
        prefilledAuthorDesc: state.instituteblogs.authorData.data,
        authorDescSuccess: state.instituteblogs.authorData.success,
      }
    })

  const [blogTitle, setBlogTitle] = useState("");
  const [authorName, setAuthorName] = useState(user._id);
  const [authorDesc, setAuthorDesc] = useState("");
  const [authorPhoto, setAuthorPhoto] = useState("");
  const [category, setCategory] = useState("");
  const [categoryId, setCategoryId] = useState(false);
  const [featuredBlog, setFeaturedBlog] = useState(false);
  const [featuredImage, setFeaturedImage] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeyword, setMetaKeyword] = useState("");
  const [metaKeywordError, setMetaKeywordError] = useState("");
  const [metaKeywordChips, setMetaKeywordChips] = useState([]);
  const [OGTitle, setOGTitle] = useState("");
  const [OGDescription, setOGDescription] = useState("");
  const [OGImage, setOGImage] = useState("");
  const [blogTitleError, setBlogTitleError] = useState("");
  const [categoryModal, setCategoryModal] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [blogContent, setBlogContent] = useState("");
  const [imgFile, setImgFile] = useState("");
  const [videoFile, setVideoFile] = useState("");
  const [audioFile, setAudioFile] = useState("");
  const [imgCount, setImageCount] = useState(0);
  const [audioCount, setAudioCount] = useState(0);
  const [videoCount, setVideoCount] = useState(0);
  const [mediaCount, setMediaCount] = useState(0);
  const [mediaCountError, setMediaCountError] = useState(0)


  let history = useNavigate();
  let dispatch = useDispatch();
  const s3Url = "https://edneed-images-uat.s3.amazonaws.com/";

  const handleInput = (e) => {
    let inputValue = e.target.value;
    let value = ValidationFile.spaceNotAccept(inputValue);
    setBlogTitle(value);
    setBlogTitleError(ValidationUtils.isEmpty(value));
  }

  const handleOnChangeContent = (value) => {
    // console.log(value, "line no 98");
    setBlogContent(value);
  }

  useEffect(() => {
    dispatch(getEmployeeList(insId, "employee"));
  }, [dispatch, insId])

  const handleAuthorInput = (e) => {
    let inputValue = e.target.value;
    let value = ValidationFile.spaceNotAccept(inputValue);
    let inputName = e.target.name;
    if (inputName === "authorDesc") {
      setAuthorDesc(value);
    }
    else {
      setAuthorName(inputValue);
      setAuthorDesc("");
    }
  }

  const handleSelectCategory = (e) => {
    let inputValue = e.target.value;
    setCategory(inputValue);
    setCategoryId(true);
    if (inputValue === "addNewCategory") {
      setCategoryModal(!categoryModal);
    }
  }

  const handleCloseModal = () => {
    setCategoryModal(!categoryModal);
    setCategory("");
  }

  const uploadBlogImages = (data, type) => {
    let imgData = data.location;
    switch (type) {
      case "OG_Image":
        setOGImage(imgData);
        break;

      case "Author":
        setAuthorPhoto(imgData);
        break;

      default:
        setFeaturedImage(imgData);
    }
  }

  const removeBlogImages = (type) => {
    let imgData = "";
    switch (type) {
      case "OG_Image":
        setOGImage(imgData);
        break;

      case "Author":
        setAuthorPhoto(imgData);
        break;

      default:
        setFeaturedImage(imgData);
    }
  }


  const handleSeoInput = (e) => {
    let inputValue = e.target.value;
    let value = ValidationFile.spaceNotAccept(inputValue);
    let inputName = e.target.name;
    switch (inputName) {
      case "metaTitle":
        setMetaTitle(value);
        break;

      case "metaDescription":
        setMetaDescription(value);
        break;

      case "OGTitle":
        setOGTitle(value);
        break;

      default:
        setOGDescription(value);
    }
  }

  const handleFeaturedBlog = (e) => {
    let inputChecked = e.target.checked;
    if (inputChecked === true) {
      setFeaturedBlog(true)
    }
    else {
      setFeaturedBlog(false)
    }
  }

  const handleValidation = () => {
    let isValid = true;
    if (ValidationUtils.isEmpty(blogTitle)) {
      setBlogTitleError(true);
      isValid = false;
    }
    if (mediaCount) {
      if (mediaCount > 10) {
        setMediaCountError(true);
        isValid = false;
      }
      else {
        setMediaCountError(false);
        isValid = true;
      }
    }
    return isValid;
  }

  const blogDetails = {
    instituteId: insId,
    user: user._id,
    title: blogTitle,
    content: blogContent,
    status: "",
    blog_image: featuredImage,
    author: authorName,
    author_description: authorDesc,
    author_photo: authorPhoto,
    featured_Blog: featuredBlog,
    seo_meta_title: metaTitle,
    seo_meta_desc: metaDescription,
    seo_meta_keyword: metaKeywordChips,
    seo_og_title: OGTitle,
    seo_og_desc: OGDescription,
    seo_og_image: OGImage,
    publish_date: ""
  }

  const blogDetailsWithCategory = {
    instituteId: insId,
    user: user._id,
    title: blogTitle,
    content: blogContent,
    status: "",
    blog_image: featuredImage,
    author: authorName,
    author_description: authorDesc,
    author_photo: authorPhoto,
    category_id: category,
    featured_Blog: featuredBlog,
    seo_meta_title: metaTitle,
    seo_meta_desc: metaDescription,
    seo_meta_keyword: metaKeywordChips,
    seo_og_title: OGTitle,
    seo_og_desc: OGDescription,
    seo_og_image: OGImage,
    publish_date: ""
  }

  const handleSubmitButton = (statusType) => {
    let blogData = { ...blogDetails, status: "save" }
    let blogDatat2 = { ...blogDetailsWithCategory, status: "save" }
    let validations = handleValidation();
    if (validations) {
      if (categoryId) {
        if (!id && statusType === "Save") {
          dispatch(postBlogDetail(blogDatat2, "save"));
        }
        else if (statusType === "Switch") {
          dispatch(updateBlog(id, blogDatat2, "save"));
        }
        else if (id && statusType === "Save") {
          dispatch(updateBlog(id, blogDatat2, "save"));
        }
      }
      else {
        if (!id && statusType === "Save") {
          dispatch(postBlogDetail(blogData, "save"));
        }
        else if (statusType === "Switch") {
          dispatch(updateBlog(id, blogData, "save"));
        }
        else if (id && statusType === "Save") {
          dispatch(updateBlog(id, blogData, "save"));
        }
      }

    }
  }

  const handleCancelButton = () => {
    history("/blog-list");
  }

  const handlePublishButton = (statusType) => {
    let blogData = { ...blogDetails, status: "publish", publish_date: new Date() }
    let blogDatat2 = { ...blogDetailsWithCategory, status: "publish", publish_date: new Date() }
    let validations = handleValidation();
    if (validations) {
      if (categoryId) {
        if (!id && statusType === "Publish") {
          dispatch(postBlogDetail(blogDatat2, "publish"));
        }
        else if (statusType === "Update") {
          dispatch(updateBlog(id, blogDatat2, "publish"));
        }
        else if (id && statusType === "Publish") {
          dispatch(updateBlog(id, blogDatat2, "publish"));
        }
      }
      else {
        if (!id && statusType === "Publish") {
          dispatch(postBlogDetail(blogData, "publish"));
        }
        else if (statusType === "Update") {
          dispatch(updateBlog(id, blogData, "publish"));
        }
        else if (id && statusType === "Publish") {
          dispatch(updateBlog(id, blogData, "publish"));
        }
      }

    }
  }


  const handleRequestForApprovalButton = (type) => {
    let blogData = { ...blogDetails, status: "pendingForApproval", publish_date: new Date() }
    let blogDatat2 = { ...blogDetailsWithCategory, status: "pendingForApproval", publish_date: new Date() }
    let validations = handleValidation();
    if (validations) {
      if (categoryId) {
        if (type === "Create") {
          dispatch(postBlogDetail(blogDatat2, "publish"));
        }
        else {
          dispatch(updateBlog(id, blogDatat2));
        }
      }
      else {
        if (type === "Create") {
          dispatch(postBlogDetail(blogData, "publish"));
        }
        else {
          dispatch(updateBlog(id, blogData));
        }
      }
    }
  }

  useEffect(() => {
    dispatch(getCategoryLists(insId, user._id, ""));
  }, [dispatch, insId, user._id])

  useEffect(() => {
    if (postCategorySuccess && postCategoryData) {
      setCategory(postCategoryData._id)
    }
    if (postBlogDetailSuccess) {
      history("/blog-list");
    }
    return () => {
      dispatch(resetPostBlogDetail());
    }
  }, [dispatch, history, insId, postBlogDetailSuccess, postCategoryData, postCategorySuccess])

  useEffect(() => {
    if (id) {
      dispatch(getSingleBlog(id, user._id));
    }
  }, [dispatch, id, user._id])

  useEffect(() => {
    if (singleBlogSuccess && singleBlogData && !isFilled) {
      setIsFilled(true);
      setBlogTitle(singleBlogData.title);
      setBlogContent(singleBlogData.content);
      setFeaturedImage(singleBlogData.blog_image);
      setAuthorName(singleBlogData.author);
      setAuthorDesc(singleBlogData.author_description);
      setAuthorPhoto(singleBlogData.author_photo);
      setCategory(singleBlogData.category_id);
      setCategoryId(singleBlogData.category_id ? true : false);
      setFeaturedBlog(singleBlogData.featured_Blog);
      setMetaTitle(singleBlogData.seo_meta_title);
      setMetaDescription(singleBlogData.seo_meta_desc);
      setMetaKeywordChips(singleBlogData.seo_meta_keyword);
      setOGTitle(singleBlogData.seo_og_title);
      setOGDescription(singleBlogData.seo_og_desc);
      setOGImage(singleBlogData.seo_og_image);
    }
  }, [isFilled, singleBlogData, singleBlogSuccess])

  useEffect(() => {
    dispatch(getAuthorDescription(authorName, insId));
  }, [authorName, dispatch, insId])

  useEffect(() => {
    if (prefilledAuthorDesc && authorDescSuccess) {
      setAuthorDesc(prefilledAuthorDesc.author_description)
    }
  }, [authorDescSuccess, prefilledAuthorDesc])


  useEffect(() => {
    if (patchBlogDetailSuccess) {
      history("/blog-list");
    }
    return () => {
      dispatch(updateBlogReset());
      dispatch(getSingleBlogReset());
    }
  }, [dispatch, history, patchBlogDetailSuccess])

  const uploadContentImages = (data, type) => {
    let imgData = data.location;
    if (type === "image") {
      setImgFile(imgData);
      setAudioFile("");
      setVideoFile("");
    }
    else if (type === "video") {
      setVideoFile(imgData);
      setImgFile("");
      setAudioFile("");
    }
    else {
      setAudioFile(imgData);
      setImgFile("");
      setVideoFile("");
    }
  }
  function countOccurences(string, word) {
    return string.split(word).length - 1;
  }

  useEffect(() => {
    let imageCount = imgCount;
    imageCount = countOccurences(blogContent, "<img");
    setImageCount(imageCount);

    let audCount = audioCount;
    audCount = countOccurences(blogContent, "</audio>");
    setAudioCount(audCount);

    let vidCount = videoCount;
    vidCount = countOccurences(blogContent, "</video>");
    setVideoCount(vidCount);
  }, [audioCount, blogContent, imgCount, videoCount])


  useEffect(() => {
    setMediaCount(imgCount + audioCount + videoCount);
  }, [audioCount, imgCount, videoCount]);

  useEffect(() => {
    if (mediaCount > 10) {
      setMediaCountError(true);
    }
    else {
      setMediaCountError(false)
    }
  }, [mediaCount])


  useEffect(() => {
    let content = blogContent
    if (imgFile) {
      setBlogContent(`${content}<img src = ${imgFile}></img>`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgFile])

  useEffect(() => {
    let content = blogContent
    if (audioFile) {
      setBlogContent(`${content}<audio src = ${audioFile}></audio>`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioFile])

  useEffect(() => {
    if (videoFile) {
      let content = blogContent
      setBlogContent(`${content}<video src = ${videoFile}></video>`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoFile])

  const handleMetaKeywords = (e) => {
    let inputValue = e.target.value;
    setMetaKeyword(inputValue);
  }

  const handleSubmitMetaChips = () => {
    let array = metaKeywordChips;
    if (ValidationUtils.isEmpty(metaKeyword)) {
      setMetaKeywordError(true);
    }
    if (ValidationUtils.isNotEmpty(metaKeyword)) {
      array.push(metaKeyword);
      setMetaKeywordChips([...array]);
      setMetaKeyword("");
    }
  }

  const handleSpliceMetaChips = (item) => {
    let array = metaKeywordChips;
    let value = array.indexOf(item);
    array.splice(value, 1);
    setMetaKeywordChips([...array]);
  }

  return (
    < React.Fragment >
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        {/* <BreadcrumbItem to="/blogs" title="Blogs" /> */}
        <BreadcrumbItem to="/blog-list" title="Blog " />
        {
          id ? (
            <BreadcrumbItem to={`/edit-blog/${id}`} title="Edit Blog" />
          ) : (
            <BreadcrumbItem to="/add-new-blog" title="Create Blog" />)
        }

      </Breadcrumb>
      <div className='createBlog'>

        {/* create blog  or  upper buttons */}
        <div className='inline top-header-button-wrapper between-lg between-xs align-center '>
          {/* heading create blog */}
          <div>
            {id ? <h2>Create Blog</h2> :
              <p className='blog-page-heading w-500'>Create Blog</p>}
          </div>
          {/* functinolaitu buttons container */}

          <div className="actionCols top-button-container mt-10">
            {id && singleBlogSuccess && singleBlogData.status === "save" ?
              <div>
                <React.Fragment>
                  {patchBlogDetailSaveLoading ?
                    <button className="button button-primary btn-sm create-btn "
                      type="submit" >
                      Saving...
                    </button>
                    :
                    <button className="button button-primary btn-sm  create-btn"
                      onClick={() => handleSubmitButton("Save")}
                      type="submit" >
                      Save as draft
                    </button>
                  }
                </React.Fragment>

                <React.Fragment>
                  {patchBlogDetailLoading ?
                    <button className="button button-primary btn-sm  create-btn"
                      type="submit" >
                      Publishing...
                    </button>
                    :
                    <button className="button button-primary btn-sm  create-btn"
                      onClick={() => handlePublishButton("Publish")}
                      type="submit" >
                      Publish
                    </button>
                  }
                </React.Fragment>

                <React.Fragment>
                  <button className="button button-primary btn-sm  create-btn"
                    onClick={handleCancelButton}
                    type="submit" >
                    Cancel
                  </button>
                </React.Fragment>

              </div> :
              id && singleBlogSuccess && singleBlogData.status === "publish" ?
                <div>
                  <React.Fragment>
                    {patchBlogDetailSaveLoading ?
                      <button className="button button-primary btn-sm  create-btn"
                        type="submit" >
                        Switching...
                      </button>
                      :
                      <button className="button button-primary btn-sm  create-btn"
                        onClick={() => handleSubmitButton("Switch")}
                        type="submit" >
                        Switch to draft
                      </button>
                    }
                  </React.Fragment>

                  <React.Fragment>
                    {patchBlogDetailLoading ?
                      <button className="button button-primary btn-sm  create-btn"
                        type="submit" >
                        Updating...
                      </button>
                      :
                      <button className="button button-primary btn-sm  create-btn"
                        onClick={() => handlePublishButton("Update")}
                        type="submit" >
                        Update
                      </button>
                    }
                  </React.Fragment>

                  <React.Fragment>
                    <button className="button button-primary btn-sm  create-btn"
                      onClick={handleCancelButton}
                      type="submit" >
                      Cancel
                    </button>
                  </React.Fragment>
                </div>
                :
                <div>
                  <React.Fragment>
                    {postBlogDetailSaveLoading ?
                      <button className="button button-primary btn-sm  create-btn"
                        type="submit" >
                        Saving...
                      </button>
                      :
                      <button className="button button-primary btn-sm  create-btn"
                        onClick={() => handleSubmitButton("Save")}
                        type="submit" >
                        Save as draft
                      </button>
                    }
                  </React.Fragment>

                  {!id && user.user_activeRole === process.env.REACT_APP_EMPLOYEE ?
                    < React.Fragment >
                      {
                        postBlogDetailLoading ?
                          <button className="button button-primary btn-sm  create-btn"
                            type="submit">
                            Requesting...
                          </button>
                          :
                          <button className="button button-primary btn-sm  create-btn"
                            onClick={() => handleRequestForApprovalButton("Create")}
                            type="submit" >
                            Request for approval
                          </button>
                      }
                    </React.Fragment>
                    :
                    id && user.user_activeRole === process.env.REACT_APP_EMPLOYEE ?
                      < React.Fragment >
                        {
                          patchBlogDetailLoading ?
                            <button className="button button-primary btn-sm  create-btn"
                              type="submit">
                              Requesting...
                            </button>
                            :
                            <button className="button button-primary btn-sm  create-btn"
                              onClick={() => handleRequestForApprovalButton("Update")}
                              type="submit" >
                              Request for approval
                            </button>
                        }
                      </React.Fragment>
                      :
                      <React.Fragment>
                        {postBlogDetailLoading ?
                          <button className="button button-primary btn-sm  create-btn"
                            type="submit" >
                            Publishing...
                          </button>
                          :
                          <button className="button button-primary btn-sm  create-btn"
                            onClick={() => handlePublishButton("Publish")}
                            type="submit" >
                            Publish
                          </button>
                        }
                      </React.Fragment>
                  }
                  <React.Fragment>
                    <button className="button button button-primary btn-sm  create-btn"
                      onClick={handleCancelButton}
                      type="submit" >
                      Cancel
                    </button>
                  </React.Fragment>
                </div>
            }
          </div>
        </div>

        {/* main content container */}
        <div className=' createblog-main-wrapper inline '>
          {/* left side content */}
          <div className='createBlog-editor createblog-left-container'>
            <div className="SortByTableHeadCst blogs-info-title-container">
              <p className="text-s w-500">
                {" "}
                Blog Info
              </p>
              <hr className='mt-10 mb-10' />
              <p className='text-xs w-400 pb-10'>Blog Title</p>
              <FormInput
                className="blog-title-input text-xs w-400"
                type="text"
                label="Blog Title"
                value={blogTitle}
                placeholder="Type your title here"
                name="blogTitle"
                maxLength={80}
                onChange={handleInput}

              />
              <FormError
                show={blogTitleError}
                error="Blog Title is required."
                className=''
              />
            </div>
            <div className="SortByTableHeadCst ">
              <p className="text-xs w-400 mt-20 pt-2 black">
                {" "}
                Upload Blog Cover
              </p>

              <div className="formFieldwrap mt-10">
                <ImageCropper
                  minWidth={120}
                  maxWidth={400}
                  defaultRatio={1 / 1}
                  onUploaded={(e) => uploadBlogImages(e, "Feature")}
                  BtnName="Upload Image"
                  IconClassName="i-md primary"
                  BtnPropClass="button-o-silver button-block CropUploadBtn upload-imgbtn"

                />
                {featuredImage && (
                  <a
                    className="btnText priamry text-xxs attachmentwithtext mt-3"
                    href={featuredImage}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="ed-icon icon-attachment gray i-xs"></i>
                    {featuredImage.replace(s3Url, "")}
                  </a>
                )}
              </div>
              <div className="DashedInstructionList ">
                <p className="text-2xs grey">
                  .jpg, .png formats accepted only
                </p>
              </div>
              <div className="formFieldwrap mt-8">
                {featuredImage ? (
                  <button
                    type="button"
                    onClick={() => removeBlogImages("Feature")}
                    className="button btn-sm button-o-red red mt-8"
                  >
                    Remove
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
            <p className=" text-xs w-400 pT-15 mt-3 pb-10">
              {" "}
              Blog Content
            </p>

            <div className=" blog-content-text-editor">
              <TextEditor

                preFilledData={blogContent}
                currentResponse={(value) => handleOnChangeContent(value)}
                feature="Enter blog content here..."
              />
            </div>
            <div className=' video-image-upload-wrapper inline between-lg between-xs mt-25'>
              <ImageCropper
                minWidth={120}
                maxWidth={400}
                defaultRatio={1 / 1}
                onUploaded={(e) => uploadContentImages(e, "image")}
                BtnName="Upload Image"
                IconClassName="i-md primary"
                BtnPropClass="button btn-sm upload-imgbtn-2 "
              />

              {/* <button label="upload Video" IconFileUploadClass="icon-file-upload base i-xs" onUploaded={(e) => uploadContentImages(e, "video")} hidenFileName={true} size={10} name={videoFile} onlyVideo={true}>uplaod video</button> */}
              <Upload
                label="Upload Video"
                name={videoFile}
                onlyVideo={true}
                size={10}
                hidenFileName={true}
                onUploaded={(e) => uploadContentImages(e, "video")}
                IconFileUploadClass="icon-file-upload base i-xs"
                className={"upload-video-btn"}

              />
            </div>
            <div className='mt-15 text-2xs w-400 img-instruction-container'>
              <p>Upload images/videos to your blogs from here.</p>
              <ul className="list-container">
                <li className='instruction-list' >To upload images or videos in your blog just place the cursor where you need the media and upload.</li>
                <li className='instruction-list'>Maximum of 10 images/videos allowed.</li>
              </ul>

            </div>

            {/* <Upload
                    label="Upload Audio File"
                    size={10}
                    onlyAudio={true}
                    hidenFileName={true}
                    onUploaded={(e) => uploadContentImages(e, "audio")}
                    IconFileUploadClass="icon-file-upload base i-xs"
                  /> */}
            <FormError
              show={mediaCountError}
              error="Total media accepts - 10."
              className=''
            />


          </div>
          <div className='createBlog-sideBar createblog-right-container '>
            <div className="SortByTableHeadCst author-info-container text-s w-500">Author Info
              <hr className='mt-10 mb-15' />
              <div>
                {user.user_activeRole === process.env.REACT_APP_EMPLOYEE ?
                  <p>{user.user_fullname}</p> :
                  <div>
                    <select className="author-name-container"
                      value={authorName}
                      onChange={handleAuthorInput}

                    >
                      <option value={user._id} >{user.user_fullname}</option>
                      {employeeListSuccess ? (
                        employeeList.length > 0 ? (
                          employeeList.map((item, key) => {
                            return (
                              <React.Fragment>
                                <option
                                  key={item._id}
                                  value={item.user}
                                >
                                  {item.fullname}
                                </option>
                              </React.Fragment>
                            );
                          })
                        ) : (
                          <option value="">No Records</option>
                        )
                      ) : (
                        <option value="">Loading...</option>
                      )}
                    </select>
                  </div>
                }

                <FormTextArea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  type="text"
                  onChange={handleAuthorInput}
                  placeholder="Type author description here"
                  name="authorDesc"
                  value={authorDesc}
                  label="Description"
                  style={{ whiteSpace: " pre-wrap" }}
                  maxLength="500"
                  TextareaBtmTxt="500"
                >
                </FormTextArea>
              </div>
            </div>

            <div className="SortByTableHeadCst text-s w-500 category-wrapper mt-25">Category
              <hr className='mt-5 mb-15' />

              <div>
                <select className='slect-category-container'
                  value={category}
                  onChange={handleSelectCategory}
                >
                  <option value="" >Select Category</option>
                  {getCategoryListSuccess ? (
                    getCategoryListData.length > 0 ? (
                      getCategoryListData.map((item, key) => {
                        return (
                          <React.Fragment>
                            <option
                              key={item._id}
                              value={item._id}
                            // value={item.category_title}
                            >
                              {item.category_title}
                            </option>
                          </React.Fragment>
                        );
                      })
                    ) : (
                      <option value="">No Records</option>
                    )
                  ) : (
                    <option value="">Loading...</option>
                  )}
                  <option value="addNewCategory">
                    Add New Category
                  </option>
                </select>
                {/* <FormError
                      show={categoryError}
                      error="Select category is required."
                    /> */}
              </div>
            </div>

            <div className="SortByTableHeadCst text-s w-500 seo-container mt-25">Seo Settings

              <hr className='mt-5 mb-15' />

              <div className="SortByTableHeadCst mt-20">
                <FormInput
                  label="Meta Title"
                  value={metaTitle}
                  placeholder="Meta Title"
                  name="metaTitle"
                  maxLength="80"
                  onChange={handleSeoInput}
                />
                <FormTextArea
                  className="form-control mt-10"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  type="text"
                  onChange={handleSeoInput}
                  placeholder="Meta Description"
                  name="metaDescription"
                  value={metaDescription}
                  label="Description"
                  style={{ whiteSpace: " pre-wrap" }}
                  maxLength="500"
                  TextareaBtmTxt="500"
                >
                </FormTextArea>
                {/* <form
                  // onSubmit={handleMetaKeywords}
                  > */}
                <FormInput
                  label="Meta Keywords"
                  value={metaKeyword}
                  placeholder="Meta Keywords"
                  name="metaKeywords"
                  maxLength="500"
                  onChange={(e) => handleMetaKeywords(e)}
                />
                <FormError
                  show={metaKeywordError}
                  error="Please enter keyword"
                />
                <button onClick={() => handleSubmitMetaChips()}>
                  tick
                </button>
                {metaKeywordChips.length ? metaKeywordChips.map((item) => {
                  return (
                    <React.Fragment>
                      <p>{item}</p>
                      <button onClick={() => handleSpliceMetaChips(item)}>
                        Cross
                      </button>
                    </React.Fragment>
                  );
                })
                  : ""
                }
                {/* </form> */}
              </div>
              <FormInput
                label="OG Title"
                value={OGTitle}
                placeholder="OG Title"
                name="OGTitle"
                maxLength="80"
                onChange={handleSeoInput}
              />
              <FormTextArea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                type="text"
                onChange={handleSeoInput}
                placeholder="OG Description"
                name="OGDesc"
                value={OGDescription}
                label="Description"
                style={{ whiteSpace: " pre-wrap" }}
                maxLength="500"
                TextareaBtmTxt="500"
              >
              </FormTextArea>
              <div className="SortByTableHeadCst">
                <p className="text-s w-500">
                  {" "}
                  OG Image
                </p>
                {/* <div className="DashedInstructionList">
                    <p className="text-xs">
                      - For images accept only .PNG or .JPG file format.
                    </p>
                  </div> */}
                <div className="formFieldwrap mt-10">
                  <ImageCropper
                    minWidth={120}
                    maxWidth={400}
                    defaultRatio={1 / 1}
                    onUploaded={(e) => uploadBlogImages(e, "OG_Image")}
                    BtnName="Upload Image"
                    IconClassName="i-md primary"
                    BtnPropClass="button button-block upload-img-btn3 "
                  />
                  {OGImage && (
                    <a
                      className="btnText priamry text-xxs attachmentwithtext mt-3"
                      href={OGImage}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="ed-icon icon-attachment gray i-xs"></i>
                      {OGImage.replace(s3Url, "")}
                    </a>
                  )}
                </div>
                <div className="formFieldwrap mt-8">
                  {OGImage ? (
                    <button
                      type="button"
                      onClick={() => removeBlogImages("OG_Image")}
                      className="button button-sm button-o-red red mt-8"
                    >
                      Remove
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>


            <div className="ml-10 mt-25 text-s w-400 SortByTableHeadCst">
              <input className='mr-5'
                type="checkbox"
                checked={featuredBlog === true}
                onChange={handleFeaturedBlog}
              />
              <label>Mark as Featured</label>
            </div>
          </div>
        </div>
      </div>

      {
        categoryModal &&
        <CreateCategory show={categoryModal} onclose={handleCloseModal} />
      }
    </React.Fragment >
  )
}

export default AddNewBlog;
