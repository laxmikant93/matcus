import React from 'react'
import AppLink from '../../../../Common/AppLink'
import CheckboxInput from '../../../../Common/Form/CheckboxInput'
import ShowRaringStar from '../ShowRatingStar/ShowRatingStar';
import './allReviewsList.scss';
import reviewLisingImage from '../reviewListImage.png';
import ReplyOn from '../replyon.png'
import ReplyOff from '../replyoff.png'
import { useRef } from 'react';
import ViewReviewDetails from '../ViewReviewDetailsPopup/ViewReviewDetailsPopup';
import ReviewComments from './ReviewComments/ReviewComments';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteReview, getSingleReview, getSingleReviewReset, multiplePermanantDeleteReview, patchReviewDetailsReset, readUnreadReviewReplies, restoreMultipleReviews, storeReviewId } from '../../../../store/actions/ecomReviews';
import NoDataAvailable from '../../../../Common/NoDataAvailable';
import moment from 'moment';
import { useState } from 'react';
import DeleteConfirmPop from '../../../Dashboard/EcommerceDashboard/Component/DeleteConfirmPop/DeleteConfirmPop';
import { useNavigate } from 'react-router-dom';
import AppLinkUrl from '../../../../Common/AppLink/AppLinkUrl';
const AllReviewsList = ({ openRef, checkboxes, setCheckboxes }) => {

  const openViewReview = useRef(null);

  const dispatch = useDispatch();
  const { user, getReviewsListData, getReviewsListSuccess } = useSelector((state) => {
    return {
      user: state.user,
      getReviewsListData: state.ecomReviews.getReviewsList.data,
      getReviewsListSuccess: state.ecomReviews.getReviewsList.success,
    }
  })

  const child = useRef(false);
  const [deletePopup, setDeletePopup] = useState(-1);

  const onCloseViewReview = () => {
    openViewReview.current.close();
    dispatch(storeReviewId(""));
    dispatch(getSingleReviewReset());
    dispatch(patchReviewDetailsReset());
  }

  const onOpenViewReview = (id) => {
    openViewReview.current.open();
    dispatch(storeReviewId(id));
    dispatch(getSingleReview(id));
    dispatch(readUnreadReviewReplies(user.user_business, id))
  }

  const onOpenEditReview = (id) => {
    openRef.current.open();
    dispatch(storeReviewId(id));
    dispatch(getSingleReview(id));
  }

  const onOpenDeleteReview = (id) => {
    setDeletePopup(deletePopup === id ? -1 : id);
  }

  const handleCancelButton = () => {
    setDeletePopup(-1);

  }

  const handleDeleteButton = () => {
    dispatch(deleteReview(user.user_business, deletePopup));
    setDeletePopup(-1);
  }

  const handleCheckboxes = (e, item) => {
    let inputChecked = e.target.checked;
    let array = checkboxes;
    if (inputChecked) {
      array.push(item);
    }
    else {
      let index = array.indexOf(item);
      // console.log(index, "line no 76");
      array.splice(index, 1);
    }
    setCheckboxes([...array]);
  }

  const handleSelectDeselectAll = (e) => {
    let inputChecked = e.target.checked;
    let array = getReviewsListData;
    if (inputChecked) {
      setCheckboxes([...array]);
    }
    else {
      setCheckboxes([]);
    }
  }

  const handleApproveReview = (id) => {
    openViewReview.current.open();
    dispatch(storeReviewId(id));
    dispatch(getSingleReview(id));
  }

  const handleRejectReview = (id) => {
    openViewReview.current.open();
    dispatch(storeReviewId(id));
    dispatch(getSingleReview(id));
  }

  const handleRestoreReview = (id) => {
    dispatch(restoreMultipleReviews(user.user_business, { "review": [id] }))
  }

  const handlePermanatReviewDelete = (id) => {
    dispatch(multiplePermanantDeleteReview(user.user_business, { "review": [id] }))
  }

  const handleChildParent = (selector, id) => {
    if (selector === 'child') {
      child.current = true;

    } else {
      if (!child.current) {
        onOpenViewReview(id);
      }
      child.current = false;
    }
    // dispatch(getSingleReview(id));
  }
  const dynamicRoute = () => {
    if (window.location.host.includes("my_app")) {
      return ".my_app.com:3000"
    } else if (window.location.host.includes("getmelight")) {
      return ".getmelight.com"
    } else if (window.location.host.includes("unicated")) {
      return ".unicated.com"
    } else if (window.location.host.includes("edneed")) {
      return ".edneed.com"
    } else {
      return ".edneed.com"
    }
  }

  const openSubDomain = (slug) => {
    if (window.location.host.includes("my_app")) {
      window.open(
        `http://${user.user_institute_institute_subdomain}${dynamicRoute()}/products/${slug}`
      );
    } else {
      window.open(
        `https://${user.user_institute_institute_subdomain}${dynamicRoute()}/products/${slug}`
      );
    }

  };
  return (
    <div className='review-table-container'>
      <div className="gridListTable ">
        <ul className="gridHeader ">
          <React.Fragment>
            <li className="col text-xs w-500  primary">
              <CheckboxInput
                label={""}
                LabelClass={""}
                className={""}
                checked={getReviewsListSuccess && getReviewsListData && getReviewsListData.length && getReviewsListData.length === checkboxes.length}
                onChange={handleSelectDeselectAll}
              />
            </li>
            <li className="col col-3 text-xs w-400 base" style={{ flexBasis: '20%' }}>Author</li>
            <li className="col col-3 text-xs w-500 " style={{ flexBasis: '28%' }}>Review Message</li>
            <li className="col col-1 text-xs w-500 " style={{ flexBasis: '10%' }}>Replies</li>
            <li className="col col-2 text-xs w-500 " style={{ flexBasis: '13%' }}>Media</li>
            <li className="col col-2 text-xs w-500 " style={{ flexBasis: '16%' }}>In response to</li>
            <li className="col col-1 text-xs w-500 " style={{ flexBasis: '10%' }}>Date</li>

          </React.Fragment>
        </ul>

        <div className='gridBody varients-after-grid-body '>
          <div className='gridRow varients-grid-row'>
            <>
              {getReviewsListSuccess ? getReviewsListData && getReviewsListData.length ?
                getReviewsListData.map((item) => (
                  // when need to open full review list 'onClick={onOpenViewReview }'
                  // when to open approve and decline list  onClick={onOpenViewReview }

                  <ul className="topInfo" onClick={() => handleChildParent('parent', item._id)}>
                    <li className='col'>
                      <div className='checkbox-wrap' onClick={() => handleChildParent('child', "")}>
                        <CheckboxInput
                          label={""}
                          LabelClass={""}
                          className={""}
                          checked={checkboxes.includes(item)}
                          onChange={(e) => handleCheckboxes(e, item)}
                        />
                      </div>
                    </li>
                    <li className="col col-3" style={{ flexBasis: '20%' }}>
                      <div className='author-wrapper'>
                        <div className='author-Topwrap'>
                          <div className='image-wrap'>
                            <img src={item?.profile_image ? item.profile_image : reviewLisingImage} alt="" />
                          </div>
                          <div className='author-details'>
                            {item.creator === "user" ?
                              <p className='text-xxs w-500 primary'>{item.user && item.user[0]?.fullname}</p>
                              :
                              <p className='text-xxs w-500 primary'>{item.reviewer_name}</p>
                            }
                          </div>
                        </div>

                        {item.creator === "admin" && item.isDeleted === false ?
                          <div className='author-Bottomwrap' onClick={() => handleChildParent('child', "")}>
                            <p className='text-3xs w-500'>
                              <span className=' base' onClick={() => onOpenEditReview(item._id)}>Edit</span>
                              {/* when the approve state */}
                              {/* <span className='status-green'>Approve</span> */}
                              <span className='auther-vline'>|</span>
                            </p>
                            <p className='text-3xs w-500 base'>
                              {/* reject state */}
                              {/* <span className='w-500 status-red '>Reject</span> */}
                              <span className='base' onClick={() => onOpenViewReview(item._id)} >View</span>

                              <span className='auther-vline'>|</span>
                            </p>
                            <p className='text-3xs w-500 base' onClick={() => onOpenDeleteReview(item._id)}>Delete</p>
                          </div>
                          :
                          <div className='author-Bottomwrap' onClick={() => handleChildParent('child', "")}>
                            {item.status === "Pending" && item.isDeleted === false ?
                              <React.Fragment>
                                <p className='text-3xs w-500'>
                                  {/* <span className=' base' >Edit</span>  */}
                                  {/* when the approve state */}
                                  <span className='status-green' onClick={() => handleApproveReview(item._id)}>Approve</span>
                                  <span className='auther-vline'>|</span>
                                </p>
                                <p className='text-3xs w-500 base'>
                                  {/* reject state */}
                                  <span className='w-500 status-red ' onClick={() => handleRejectReview(item._id)}>Reject</span>
                                  {/* <span className='base' >View</span>  */}

                                  <span className='auther-vline'>|</span>
                                </p>
                              </React.Fragment>
                              : item.status === "Rejected" && item.isDeleted === false ?
                                <p className='text-3xs w-500'>
                                  {/* <span className=' base' >Edit</span>  */}
                                  {/* when the approve state */}
                                  <span className='status-green' onClick={() => handleApproveReview(item._id)}>Approve</span>
                                  <span className='auther-vline'>|</span>
                                </p>
                                : item.isDeleted === true ?
                                  <React.Fragment>
                                    <p className='text-3xs w-500'>
                                      <span className='status-green' onClick={() => handleRestoreReview(item._id)}>Restore</span>
                                      <span className='auther-vline'>|</span>
                                    </p>
                                    <p className='text-3xs w-500 base'>
                                      <span className='w-500 status-red ' onClick={() => handlePermanatReviewDelete(item._id)}>Permanant Delete</span>
                                    </p>
                                  </React.Fragment>
                                  : ""
                            }
                            {item.isDeleted === true ? "" :
                              <p className='text-3xs w-500 base' onClick={() => onOpenDeleteReview(item._id)}>Delete</p>
                            }
                          </div>
                        }




                      </div>
                    </li>
                    <li className="col col-3 " style={{ flexBasis: '28%' }} >
                      <div className='reviewMessage-container'>
                        <div className='reviewMessage-topwrap'>
                          <p className='text-2xs w-400 base text-reviewMessgase'>{item.message}</p>
                        </div>
                        <div className='reviewMessage-bottomwrap'>
                          <p className='text-3xs w-400 base'>Rating :</p>
                          <ShowRaringStar width='9' height='9' starsValue={item.rating} />
                        </div>
                      </div>
                    </li>

                    <li className="col col-1" style={{ flexBasis: '10%' }} >
                      <div className='reply-container' onClick={() => onOpenViewReview(item._id)}>

                        {item.reply && item?.reply.length ? item.reply.every((i) => i?.read === true) ?
                          <>
                            {/* when new un-read reviews */}
                            < img src={ReplyOff} alt="" />
                          </>
                          :
                          <>
                            {/* after reviews are read */}
                            <img src={ReplyOn} alt="" />
                          </>
                          :
                          < img src={ReplyOff} alt="" />
                        }
                        <p className='text-xs w-500 base'>{item.reply && item?.reply.length ? item?.reply.length : 0}</p>
                      </div>
                    </li>

                    <li className="col col-2 " style={{ flexBasis: '13%' }}>
                      <div className='media-container'>
                        {item?.images && item?.images.length ?
                          item.images.map((image) => (
                            <div className='media-image-wrap'>
                              <img src={image} alt="" />
                            </div>
                          ))
                          : ""
                        }
                      </div>
                    </li>
                    <li className="col col-2" style={{ flexBasis: '16%' }}>
                      <div className='response-container'>
                        <p className='text-2xs w-500 base'>{item?.product?.productName}</p>
                        <p className='text-2xs w-400 gray mt-2'>SKU : {item?.product?.SKU}</p>
                        <AppLink to="#" onClick={() => openSubDomain(item?.product?.urlSlug)} className="">
                          <p className='text-2xs w-400 primary viewProduct-text mt-8' onClick={() => handleChildParent('child', "")}>View Product</p>
                        </AppLink>
                      </div>
                    </li>
                    <li className="col col-1" style={{ flexBasis: '10%' }}>
                      <div className='date-container'>
                        {/* Published state */}
                        {/* <p className='text-2xs w-500 base'>Published</p>  */}

                        {/* pending state  */}
                        {/* <p className='text-2xs w-500 red'>Pending</p>  */}

                        {/* for rejected state */}
                        {/* <p className='text-2xs w-500 red'>Rejected</p>  */}
                        {/* 
                         <p className='text-2xs w-300 base mt-3'>22/03/2022</p>
                         <p className='text-2xs w-300 base mt-2'>12:36 am</p> */}
                        {/* <div className='action-wrapper'>
                          <button className='button button-primary btn-3xs'>Approve</button>
                          <button className='button btn-o-red btn-3xs'>Reject</button>

                        </div> */}
                        <div className='autherDate-wrapper '>
                          <p className='text-2xs w-500 base mt-1'>{item.status}</p>
                          {item.status === "Pending" ?
                            <>
                              <p className='text-2xs w-300 base mt-3'>{moment(item?.date).format("DD-MM-YYYY")}</p>
                              <p className='text-2xs w-300 base mt-2'>{moment(item?.date).format("hh:mm a")}</p>
                            </>
                            :
                            <>
                              <p className='text-2xs w-300 base mt-3'>{moment(item.publish_date).format("DD-MM-YYYY")}</p>
                              <p className='text-2xs w-300 base mt-2'>{moment(item.publish_date).format("hh:mm a")}</p>
                            </>
                          }
                          {/* <p className='text-2xs w-300 base mt-3'>{moment(item.publish_date).format("DD-MM-YYYY")}</p>
                          <p className='text-2xs w-300 base mt-2'>{moment(item.publish_date).format("hh:mm a")}</p> */}
                        </div>
                      </div>
                    </li>


                    {/* {
                      <ReviewComments openReviewComments={openReviewComments} onCloseReviewComments={onCloseReviewComments} />
                    } */}
                  </ul>

                ))
                :
                <NoDataAvailable title="No Records Found." />
                :
                <div className="loadingGridData">
                  <i className="ed-loadingGrid"></i>
                </div>
              }
            </>
          </div>
        </div>
      </div>

      <ViewReviewDetails openViewReview={openViewReview} onclose={() => onCloseViewReview()} />
      {deletePopup !== -1 ? <DeleteConfirmPop index={deletePopup} handleAcceptPopup={
        handleCancelButton} deleteVarHandler={handleDeleteButton} /> : ""}
    </div>
  )
}

export default AllReviewsList