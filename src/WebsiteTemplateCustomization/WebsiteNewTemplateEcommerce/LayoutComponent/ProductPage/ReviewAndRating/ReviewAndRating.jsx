import React from 'react'
import './reviewandrating.scss'
import Top from '../../../assets/images/tops.png'
import ShowRatingStar from '../../../../../App/BuisnessDashboard/ReviewsAndRating/ShowRatingStar/ShowRatingStar'
import { useRef } from 'react'
import WriteReviewPopup from './WriteReviewPopup/WriteReviewPopup'
import FormTextArea from '../../../../../Common/Form/FormTextArea'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getBuyerProductReviewDetails, getProductReviewList, postReviewReply } from '../../../../../store/actions/ecomReviews'
import ValidationFile from '../../../../../Classes/ValidationFile'
import { useEffect } from 'react'
import AppLinkUrl from '../../../../../Common/AppLink/AppLinkUrl'
import Auth from '../../../../../Classes/Auth'

const ReviewAndRating = ({ prodId }) => {

  let dispatch = useDispatch();

  const { user, getReviewsListSuccess, getReviewsListData, subdomainuser, businessInfoSuccess,
    businessInfoData, getbuyerProductStatusSuccess, getbuyerProductStatus } = useSelector((state) => {
      return {
        user: state.user,
        getReviewsListSuccess: state.ecomReviews.getProductReviewsData.success,
        getReviewsListData: state.ecomReviews.getProductReviewsData.data,
        subdomainuser: state.subdomainuser,
        businessInfoSuccess: state.businessInfo.ecomWebsite.success,
        // businessinfo: state.businessInfo.getInstituiteData.data,
        businessInfoData: state.businessInfo.ecomWebsite.data,
        getbuyerProductStatusSuccess: state.ecomReviews.getBuyerProductReview.success,
        getbuyerProductStatus: state.ecomReviews.getBuyerProductReview.data
      }
    });

  const [addReply, setAddReply] = useState(-1);
  const [reply, setReply] = useState("");

  const openpopup = useRef();

  useEffect(() => {
    dispatch(getProductReviewList(prodId));
  }, [dispatch, prodId])

  const openReviewAndRatingpopup = () => {
    openpopup.current.open();
  }

  const closeReviewAndRatingpopup = () => {
    openpopup.current.close();
  }

  const handleReplyButton = (id) => {
    setAddReply(addReply === id ? -1 : id);
  }

  const handleReplyInput = (e) => {
    let inputValue = e.target.value;
    let value = ValidationFile.spaceNotAccept(inputValue);
    setReply(value);
  }

  const handlePostReply = (reviewId) => {
    if (reply) {
      let data = {
        "user": subdomainuser._id,
        "message": reply,
        "date": new Date(),
        "status": "Pending"
      }
      dispatch(postReviewReply(businessInfoSuccess && businessInfoData._id, reviewId, data, "user"));
      setReply("");
      setAddReply(-1);
    }
  }

  useEffect(() => {
    if(AppLinkUrl.subdomain()&&subdomainuser._id&&businessInfoSuccess && businessInfoData && businessInfoData?.write_review === "buyer"){
      dispatch(getBuyerProductReviewDetails(businessInfoData._id, prodId, subdomainuser._id))
    }else if(AppLinkUrl.privateDomain() && user._id&&businessInfoSuccess && businessInfoData && businessInfoData?.write_review === "buyer"){
      dispatch(getBuyerProductReviewDetails(businessInfoData._id, prodId, user._id))
    }
  }, [businessInfoData, businessInfoSuccess, dispatch, prodId, subdomainuser._id,user])

  return (
    <div>
      <hr className='image-divider' />
      <div className='product-rating-conatiner-wrapper '>
        <p className='review-heading'>PRODUCT RATINGS & REVIEWS</p>
        <div className='product-rating-conatiner-item'>
          <div className='rating-heading-container'>
            <p className='rating-heading-item'>Ratings</p>
            {getReviewsListSuccess && getReviewsListData?.reviews.length ?
              <p className='rate-show-btn'> <span className='rate-show-btn-item'>
                {Math.round(getReviewsListSuccess && getReviewsListData && getReviewsListData?.rate)}
              </span><span><i className='starsvg'></i></span>
              </p>
              : ""
            }

          </div>
          {((Auth.isLogin() && AppLinkUrl.privateDomain()) || (Auth.isSubdomainLogin() && AppLinkUrl.subdomain())) &&
            businessInfoSuccess && businessInfoData && businessInfoData?.write_review === "anyone" ?
            <button className='buttonTrue btnTrue-o-secondary btn-xs  review-input-btn' onClick={openReviewAndRatingpopup}>Write a review  </button>
            :
            ((Auth.isLogin() && AppLinkUrl.privateDomain()) || (Auth.isSubdomainLogin() && AppLinkUrl.subdomain())) &&
              getbuyerProductStatusSuccess && getbuyerProductStatus && getbuyerProductStatus?.verified_buyer ?
              <button className='buttonTrue btnTrue-o-secondary btn-xs  review-input-btn' onClick={openReviewAndRatingpopup}>Write a review  </button>
              : ""}
          <WriteReviewPopup openpopup={openpopup} onclose={closeReviewAndRatingpopup} id={prodId} />
        </div>
        <hr />
        <div className='customer-reviews-wrapper'>
          <h3 className='review-heading'>Customer Reviews</h3>
          <ul className="review-container">
            {getReviewsListSuccess && getReviewsListData && getReviewsListData?.reviews.length ?
              getReviewsListData?.reviews.map((item, key) => {
                return (
                  <React.Fragment>
                    <li className={`users-reveiw-wrapper-container ${item.reply && item.reply.length > 0 ? "replay-active" : ""}`}>
                      <div className='reveiw-item-wrapper' key={key}>
                        <div className='reveiw-item-left'>
                          <div className='user-image-wrapper '>
                            <img src={item?.profile_image ? item?.profile_image : Top} alt="" />
                          </div>
                          <div className='name-rating-div'>
                            <p className='user-name'>{item.creator === "user" ? item?.user?.fullname : item?.reviewer_name}</p>
                            <div className='reviw-ratings'>
                              <ShowRatingStar starsValue={item?.rating} width={8} height={8} />
                            </div>
                          </div>
                        </div>
                        <div className='reveiw-item-right '>
                          <p className='user-review'>{item?.message}</p>
                          <div className='user-product-image-wrapper' >
                            {item.images && item.images.length ? item.images.map((img, key) => {
                              return (
                                <div className='product-image-container' key={key}>
                                  <img src={img} alt="" />
                                </div>
                              );
                            }) : ""}
                          </div>
                          {((Auth.isLogin() && AppLinkUrl.privateDomain()) || (Auth.isSubdomainLogin() && AppLinkUrl.subdomain())) ?
                            <button className='reply-btn' onClick={() => handleReplyButton(item._id)}>Reply</button>
                            : ""
                          }
                        </div>
                      </div>
                      {/* reply div */}
                      {item.reply && item.reply.length ?
                        item.reply.map((replyItem) => (
                          <div className='reply-div-wrapper reveiw-item-wrapper'>
                            <div className='reveiw-item-left replied-user-left-container'>
                              <div className='user-image-wrapper '>
                                <img src={Top} alt="" />
                              </div>
                              <div className='name-rating-div'>
                                <p className='user-name'>{replyItem.fullname}</p>
                              </div>
                            </div>
                            <div className='reveiw-item-right '>
                              <p className='user-review'>{replyItem?.message}</p>
                            </div>
                          </div>
                        ))
                        : ""
                      }

                      {/* reply input */}
                      {addReply === item._id &&
                        <div className='reply-div-wrapper reveiw-item-wrapper'>
                          <div className='reveiw-item-left replied-user-left-container'>
                            <div className='user-image-wrapper '>
                              <img src={Top} alt="" />
                            </div>
                            <div className='name-rating-div'>
                              <p className='user-name'>{subdomainuser?.user_fullname}</p>
                            </div>
                          </div>
                          <div className='reveiw-item-right '>
                            <div className='replay-tab'>
                              <FormTextArea
                                rows={2}
                                placeholder={'Reply'}
                                value={reply}
                                onChange={handleReplyInput}
                                maxlength={300}
                              />
                            </div>
                            <div className='reply-btn-wrap'>
                              <button className='btn-done' onClick={() => handlePostReply(item._id)}>Done</button>
                            </div>
                          </div>
                        </div>
                      }
                      {/* <hr /> */}
                    </li>
                  </React.Fragment>
                );
              })
              : "No records found."
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ReviewAndRating