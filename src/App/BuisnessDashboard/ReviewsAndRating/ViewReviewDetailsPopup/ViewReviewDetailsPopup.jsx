import React from 'react';
import './viewReviewDetailsPopup.scss';
import Modals from '../../../../Common/Modals/index'
import ModalHeader from '../../../../Common/Modals/ModalsHeader'
import ModalBody from '../../../../Common/Modals/ModalsBody';
import uploadImage from '../AddReviewPopup/uploadImage.png'
import ShowRatingStar from '../ShowRatingStar/ShowRatingStar';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReviewReply, postReviewReply, replyStatusUpdate, reviewStatusUpdate } from '../../../../store/actions/ecomReviews';
import ValidationFile from '../../../../Classes/ValidationFile';
import moment from 'moment';

const ViewReviewDetails = ({ openViewReview, onclose }) => {

  const [replyReview, setReplyReview] = useState(false);
  const [reply, setReply] = useState("");

  let dispatch = useDispatch();

  const { user, getSingleReviewDetails, getSingleReviewSuccess, reviewId } = useSelector((state) => {
    return {
      user: state.user,
      getSingleReviewDetails: state.ecomReviews.getSingleReviewData.data,
      getSingleReviewSuccess: state.ecomReviews.getSingleReviewData.success,
      reviewId: state.ecomReviews.reviewId
    }
  });

  const closeModal = () => {
    onclose();
    setReplyReview(false);
  }

  const handleApproveReply = (id) => {
    let data = {
      "_id": id,
      "status": "Published"
    }
    dispatch(replyStatusUpdate(user.user_business, reviewId, data));
    // console.log(reviewId, "lne no 50");
  }

  const handleDeleteReply = (id) => {
    dispatch(deleteReviewReply(user.user_business, reviewId, id));
  }

  const handlePostReply = () => {
    if (reply) {
      let data = {
        "user": user._id,
        "message": reply,
        "date": new Date(),
        "status": "Published"
      }
      dispatch(postReviewReply(user.user_business, reviewId, data));
      setReply("");
    }
  }

  const handleReplyInput = (e) => {
    let inputValue = e.target.value;
    let value = ValidationFile.spaceNotAccept(inputValue);
    setReply(value);
  }


  const handleApproveReview = () => {
    if (getSingleReviewSuccess && getSingleReviewDetails && getSingleReviewDetails?.status === "Rejected") {
      dispatch(reviewStatusUpdate(user.user_business, reviewId, "Published", "reject"));
    }
    else {
      dispatch(reviewStatusUpdate(user.user_business, reviewId, "Published"));
    }
    closeModal();
  }

  const handleRejectReview = () => {
    dispatch(reviewStatusUpdate(user.user_business, reviewId, "Rejected"));
    closeModal();
  }

  return (
    <Modals ref={openViewReview} Position="center" slide="center" ClosePopUp={() => closeModal()} ModalsSize={'modal-m'}>
      <ModalHeader title={'View Review Details'} />
      <ModalBody>
        <div className='viewReviewdetails-container'>
          <div className='review-details'>
            <div className='reviewDetails-leftSide'>
              <div className='reviewDetails-topSection'>
                <div className='reviewerName-wrap'>
                  <p className='viewReview-label base text-2xs w-500'>Reviewer Name</p>
                  {getSingleReviewSuccess && getSingleReviewDetails && getSingleReviewDetails?.creator === "user" ?
                    <p className='text-xxs w-400 base'>{getSingleReviewSuccess && getSingleReviewDetails && getSingleReviewDetails?.user && getSingleReviewDetails?.user?.fullname}</p>
                    :
                    <p className='text-xxs w-400 base'>{getSingleReviewSuccess && getSingleReviewDetails && getSingleReviewDetails?.reviewer_name}</p>
                  }
                </div>

                <div className='date-wrap'>
                  <p className='viewReview-label base text-2xs w-500'>Date</p>
                  {getSingleReviewSuccess && getSingleReviewDetails && getSingleReviewDetails?.status === "Pending" ?
                    <>
                      <p className='text-xxs w-400 base'>{getSingleReviewSuccess && getSingleReviewDetails && moment(getSingleReviewDetails?.date).format("DD-MM-YYYY")}</p>
                      <p className='text-2xs w-300 base mt-2'>{getSingleReviewSuccess && getSingleReviewDetails && moment(getSingleReviewDetails?.date).format("hh:mm a")}</p>
                    </>
                    :
                    <>
                    <p className='text-xxs w-400 base'>{getSingleReviewSuccess && getSingleReviewDetails && moment(getSingleReviewDetails?.publish_date).format("DD-MM-YYYY")}</p>
                    <p className='text-2xs w-300 base mt-2'>{getSingleReviewSuccess && getSingleReviewDetails && moment(getSingleReviewDetails?.publish_date).format("hh:mm a")}</p>
                    </>
                  }
                </div>

                <div className='date-wrap'>
                  <p className='viewReview-label base text-2xs w-500'>Ratings</p>
                  <ShowRatingStar width={14} height={14} starsValue={getSingleReviewSuccess && getSingleReviewDetails && getSingleReviewDetails?.rating} />
                </div>
              </div>
              <div className='reviewDetails-messageSection'>
                <p className='viewReview-label base text-2xs w-500'>Review Message</p>
                <p className='text-xxs w-400 base reviewMessage-text'>{getSingleReviewSuccess && getSingleReviewDetails && getSingleReviewDetails?.message}</p>
              </div>
            </div>

            <div className='reviewDetails-RightSide'>
              <p className='viewReview-label base text-2xs w-500'>Profile Picture</p>
              <div className='viewReview-image-wrap'>
                <img src={getSingleReviewSuccess && getSingleReviewDetails && getSingleReviewDetails?.profile_image ? getSingleReviewDetails?.profile_image : uploadImage} alt="" />
              </div>
            </div>
          </div>
          <div className='reviewDetails-mediaSection'>
            <div className='mediaSection-leftside'>
              <p className='viewReview-label base text-2xs w-500'>Product</p>
              <div className='productImage-wrapper'>
                <div className='mediaSection-productImage-wrap'>
                  <img src={getSingleReviewSuccess && getSingleReviewDetails && getSingleReviewDetails?.product?.productPicture?.length ?
                    getSingleReviewSuccess && getSingleReviewDetails && getSingleReviewDetails?.product?.productPicture[0] : uploadImage
                  } alt="" />
                </div>
                <div className='productText-wrap'>
                  <p className='text-xxs w-400 base'>{getSingleReviewSuccess && getSingleReviewDetails && getSingleReviewDetails?.product?.productName}</p>
                  <p className='text-xxs w-400 gray mt-3'> SKU : {getSingleReviewSuccess && getSingleReviewDetails && getSingleReviewDetails?.product?.SKU}</p>
                </div>
              </div>
            </div>
            {getSingleReviewSuccess && getSingleReviewDetails && getSingleReviewDetails?.images?.length ?
              <div className='mediaSection-rightside'>
                <p className='viewReview-label base text-2xs w-500'>Media</p>
                <div className='media-images-container'>
                  {getSingleReviewDetails?.images.map((item) => (
                    <div className='media-images-wrap'>
                      <img src={item} alt="" />
                    </div>
                  ))
                  }
                </div>
              </div>
              : ""
            }
          </div>
          {getSingleReviewSuccess && getSingleReviewDetails && getSingleReviewDetails?.reply?.length ?
            <React.Fragment>
              <hr className='line' />
              <div className='viewReview-replySection'>
                <div className='reply-text-wrap'>
                  <h4 className='text-xs w-500 primary'>Replies</h4>
                </div>
                <div className='replyList-container'>
                  {getSingleReviewDetails?.reply.map((item) => (
                    <div className='replyList-box'>
                      <div className='replyListBox-leftSide'>
                        <div className='image-wrap'>
                          <img src={uploadImage} alt="" />
                        </div>
                        <div className='replyList-name-wrap'>
                          <p className='text-2xs w-500 base'>{item.fullname}</p>
                          <p className='text-3xs 400 gray mt-1'>{moment(item.date).format("DD-MM-YYYY")}</p>
                        </div>
                      </div>
                      <div className='replyListBox-rightSide'>
                        <p className='text-2xs w-400 base'>{item.message}</p>
                        <div className='approveStatus'>
                          <div className='beforeStatus-approve'>
                            {item.status === "Pending" ?
                              <p className='text-3xs w-400'><span className='text-approve' onClick={() => handleApproveReply(item?.replyId)}>Approve</span>  <span className='base wordLine'>|</span></p>
                              : ""
                            }
                            {item.status === "Published" ?
                              <div className='afterStatu-approve'>
                                <i className='ed-icon i-xxxs  gray icon-delete'></i>
                                <p className='text-3xs w-400 red' onClick={() => handleDeleteReply(item?.replyId)}>Delete</p>
                              </div>
                              :
                              <p className='text-3xs w-400 base' onClick={() => handleDeleteReply(item?.replyId)}> Delete</p>
                            }
                          </div>
                          {/* this section will show when the status is approved */}
                          {/* <div className='afterStatu-approve'>
                            <i className='ed-icon i-xxxs  gray icon-delete'></i>
                            <p className='text-3xs w-400 red'>Delete</p>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  ))
                  }
                </div>
              </div>
              <div className={`reply-btn-wrap ${replyReview ? 'reply-btn-wrap-shadow' : ''}`} >
                {
                  replyReview ? (
                    <div className='reply-chatMessage-wrap'>
                      <div className='chatMessage-image'>
                        <img src={uploadImage} alt="" />
                      </div>
                      <div className='chatMessage-box'>
                        <textarea
                          className="form-control chatMessage-input"
                          id="exampleFormControlTextarea1"
                          rows="2"
                          placeholder="Reply"
                          value={reply}
                          onChange={handleReplyInput}
                        ></textarea>
                      </div>
                      <div className='chat-postBtn-wrap'>
                        <button className='button button-primary btn-sm' onClick={handlePostReply}>Post</button>
                      </div>
                    </div>

                  ) : (
                    <button className='button btn-xs button-primary' onClick={() => { setReplyReview(true) }}>Reply</button>
                  )
                }
              </div>
            </React.Fragment>
            :
            <React.Fragment>
              {getSingleReviewSuccess && getSingleReviewDetails && getSingleReviewDetails?.status === "Pending" ?
                <>
                  <hr />
                  < div className='btnWrap-wrap'>
                    <button className='button btn-xs  button-primary ' onClick={handleApproveReview}>Approve</button>
                    <button className='button btn-xs  btn-o-red' onClick={handleRejectReview}>Reject</button>
                  </div>
                </>
                : getSingleReviewSuccess && getSingleReviewDetails && getSingleReviewDetails?.status === "Rejected" ?
                  <button className='button btn-xs button-primary' onClick={handleApproveReview}>Approve</button>
                  : ""}
            </React.Fragment>
          }

        </div>
      </ModalBody>
    </Modals>
  )
}

export default ViewReviewDetails