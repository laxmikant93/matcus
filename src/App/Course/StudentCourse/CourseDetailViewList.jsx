import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { postImagePopUpData } from '../../../store/actions/admincourse';
import ContentUploadPopUp from '../AdminCourse/CreateCourse/CourseContent/ContentUploadPopUp';

const CourseDetailViewList = () => {
  const { contentData, imagePopUpShowSuccess } = useSelector((state) => {
    return {
      contentData: state.studentcourse.courseDetail.data.courseTopicInfo,
      imagePopUpShowSuccess: state.admincourse.imgaePopUp.success,
    }
  })
  const dispatch = useDispatch()
  const [showAnwer, hideAnswer] = useState(-1);
  function showHideFaq(index) {
    hideAnswer(showAnwer === index ? -1 : index);
  }
  const [isDownloadableValue, setIsDownloadableValue] = useState(false)
  const [showAnwerMini, hideAnswerMini] = useState(-1);
  function showHideFaqMini(index) {
    hideAnswerMini(showAnwerMini === index ? -1 : index);
  }
  const ShowImagePopup = (data, downloadable) => {
    dispatch(postImagePopUpData(data))
    setIsDownloadableValue(downloadable)
  }
  const openNewTab = (data) => {
    if (data.includes("https://")) {
      window.open(data, ' blank')
    } else {
      let URL = `https://${data}`
      window.open(URL, ' blank')
    }

  }
  return (
    <React.Fragment>
      <div className="CourseDetailViewList">
        {contentData.map((contentData, index) => {
          return (
            <article
              key={contentData._id}
              id={contentData._id}
              className={showAnwer === contentData._id ? "active" : ""}
            >
              <div
                className={`CourseDetailViewHeadWrap ${showAnwer === contentData._id && "active"
                  }`}
              >
                <div className="headCourseDetailView">
                  <p
                    className={`text-xs w-700 purple mt-3 mb-5 ${showAnwer === contentData._id ? "drop" : ""}`}
                    onClick={() => showHideFaq(contentData._id)}
                  >
                    {contentData.topicTitle}
                  </p>
                </div>
                <div className="headSubCourseDetailView">
                  <p className="text-xxs w-500 mgray">Topic {index + 1}</p>
                  <p className="text-xxs w-500 base"> {contentData.topicChapter && contentData.topicChapter.length + `${contentData.topicChapter && contentData.topicChapter.length > 1 ? ' Chapters' : ' Chapter'}`} </p>
                </div>
                <div className="headDes">
                  <p className="text-xs mt-5 mb-5 base w-400">
                    {showAnwer === contentData._id && contentData.topicShortDescription && contentData.topicShortDescription}
                  </p>
                </div>
                {showAnwer === contentData._id && (

                  <div className="CourseDetailViewheadAttachment mt-20">
                    {contentData.topicContent && contentData.topicContent.length ?
                      (
                        contentData.topicContent && contentData.topicContent.map((topicContentItem) => {
                          return (
                            <React.Fragment>
                              {
                                topicContentItem.contentFileUploadType === "fileUpload" ?
                                  // fileUpload
                                  <React.Fragment>
                                    {
                                      topicContentItem.isPublished === "Publish" ?

                                        <div className="attachmentitem" onClick={() => ShowImagePopup(topicContentItem.contentFileUpload, topicContentItem.isDownloadable)}>
                                          <span className="attachmentitemIcon">
                                            <i className="ed-icon icon-pdf white i-md"></i>
                                          </span>
                                          <span className="attachmentitemContent">
                                            {topicContentItem.contentFileUpload.split('https://edneed-images-uat.s3.amazonaws.com/')[1]}
                                          </span>
                                        </div>
                                        : ""}
                                  </React.Fragment>
                                  :
                                  // externalUrl
                                  <div className="attachmentitem" onClick={() => openNewTab(topicContentItem.contentFileUpload)}>
                                    <button className="attachmentitem" type='button' target="_blank"
                                      rel="noopener noreferrer">
                                      <span className="attachmentitemIcon">
                                        <i className="ed-icon icon-pdf white i-md"></i>
                                      </span>
                                      <span className="attachmentitemContent">
                                        {topicContentItem.contentFileUpload}
                                      </span>
                                    </button>
                                  </div>
                              }

                            </React.Fragment>
                          )
                        })
                      ) : ""}
                  </div>
                )}
              </div>
              {showAnwer === contentData._id && (
                <div className="CourseDetailViewDisp">
                  {
                    contentData.topicChapter && contentData.topicChapter.length ?
                      (
                        contentData.topicChapter && contentData.topicChapter.map((topicChapter, chapterIndex) => {
                          return (
                            <div
                              className={`CourseDetailViewHeadWrap ${showAnwer === `${index}-mini` && "active"
                                }`}
                            >
                              <div className="headCourseDetailView">
                                <p
                                  className="text-xs w-700 base mt-3 mb-5"
                                  onClick={() => showHideFaqMini(`${topicChapter._id}-mini`)}
                                >
                                  {topicChapter.chapterTitle}
                                </p>
                              </div>
                              <div className="headSubCourseDetailView">
                                <p className="text-xxs w-500 base">
                                  {" "}
                                  Chapter &nbsp;{`${index + 1}. ${chapterIndex + 1}`}{" "}
                                </p>
                              </div>
                              <div className="headDes">
                                {/* <p className="text-xxs mt-5 mb-5 base w-400"> */}
                                {showAnwerMini === `${topicChapter._id}-mini` &&
                                  <div className='sun-editor-output' dangerouslySetInnerHTML={{ __html: topicChapter.chapterShortDescription }} />
                                }
                                {/* </p> */}
                              </div>

                              {showAnwerMini === `${topicChapter._id}-mini` && (
                                <div className="CourseDetailViewheadAttachment mt-20">
                                  {
                                    topicChapter.chapterContent && topicChapter.chapterContent.length > 0 ? topicChapter.chapterContent.map((chapterContentItem, index) => {
                                      return (
                                        <React.Fragment>
                                          {
                                            chapterContentItem.contentFileUploadType === "fileUpload" ?
                                              // fileUpload
                                              <React.Fragment>
                                                {
                                                  chapterContentItem.isPublished === "Publish" ?
                                                    <React.Fragment>
                                                      {
                                                        chapterContentItem.contentFileUpload.includes(".mp3") ?

                                                          <div className="attachmentitem">
                                                            <span className="attachmentitemIcon">
                                                              <i className="ed-icon icon-pdf white i-md"></i>
                                                            </span>
                                                            <audio controls>
                                                              <source
                                                                src={chapterContentItem.contentFileUpload}
                                                                type="audio/mpeg"
                                                              />{chapterContentItem.contentFileUpload}
                                                            </audio>
                                                            {/* <span className="attachmentitemContent">
                                                        {chapterContentItem.contentFileUpload.split('https://edneed-images-uat.s3.amazonaws.com/')[1]}
                                                      </span> */}

                                                          </div> :
                                                          <div className="attachmentitem" onClick={() => ShowImagePopup(chapterContentItem.contentFileUpload, chapterContentItem.isDownloadable)}>
                                                            <span className="attachmentitemIcon">
                                                              <i className="ed-icon icon-pdf white i-md"></i>
                                                            </span>
                                                            <span className="attachmentitemContent">
                                                              {chapterContentItem.contentFileUpload.split('https://edneed-images-uat.s3.amazonaws.com/')[1]}
                                                            </span>
                                                          </div>
                                                      }
                                                    </React.Fragment>
                                                    : ""}
                                              </React.Fragment> :
                                              // externalUrl
                                              <div onClick={() => openNewTab(chapterContentItem.contentFileUpload)} className="attachmentitem">
                                                <span className="attachmentitemIcon">
                                                  <i className="ed-icon icon-pdf white i-md"></i>
                                                </span>
                                                <span className="attachmentitemContent">
                                                  {chapterContentItem.contentFileUpload}
                                                </span>
                                              </div>
                                          }

                                        </React.Fragment>
                                      )
                                    }) : "No Content Found."
                                  }


                                </div>
                              )}
                            </div>
                          )
                        })
                      ) : ""}
                </div>
              )}
            </article>
          );
        })}
      </div>
      {imagePopUpShowSuccess && <ContentUploadPopUp isDownloadable={isDownloadableValue} />
      }
    </React.Fragment>
  )
}
export default CourseDetailViewList;