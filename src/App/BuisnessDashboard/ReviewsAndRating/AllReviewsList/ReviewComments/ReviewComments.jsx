import React from 'react';
import ShowRatingStar from '../../ShowRatingStar/ShowRatingStar';
import uploadImage from '../../AddReviewPopup/uploadImage.png'
import Modals from '../../../../../Common/Modals';
import ModalHeader from '../../../../../Common/Modals/ModalsHeader';
import ModalBody from '../../../../../Common/Modals/ModalsBody';
import './reviewComments.scss';

const ReviewComments = ({openReviewComments,onCloseReviewComments}) => {
  const closeModal = () => {
    onCloseReviewComments();
  }
  return (
    <Modals ref={openReviewComments} Position="center" slide="center" ClosePopUp={() => closeModal()} ModalsSize={'modal-m'} >
      <ModalHeader title={'View Review Details'} />
       <ModalBody>
        <div className='reviewComments-container'>
          <div className='viewReviewdetails-container'>
           <div className='review-details'>
            <div className='reviewDetails-leftSide'>
              <div className='reviewDetails-topSection'>
               <div className='reviewerName-wrap'>
               <p className='viewReview-label base text-2xs w-500'>Reviewer Name</p>
               <p className='text-xxs w-400 base'>Rajesh Khanna</p>
               </div>

               <div className='date-wrap'>
                <p className='viewReview-label base text-2xs w-500'>Date</p>
                <p className='text-xxs w-400 base'>28-07-22</p>
               </div>

               <div className='date-wrap'>
                <p className='viewReview-label base text-2xs w-500'>Ratings</p>
                <ShowRatingStar width={14} height={14} starsValue={3} />
                </div>
              </div>
              <div className='reviewDetails-messageSection'>
                <p className='viewReview-label base text-2xs w-500'>Review Message</p>
                <p className='text-xxs w-400 base reviewMessage-text'>This product was amazingly amazing. I recommend you all to shop here. One of the best sellers out there.</p>
              </div>
            </div>

            <div className='reviewDetails-RightSide'>
              <p className='viewReview-label base text-2xs w-500'>Profile Picture</p>
              <div className='viewReview-image-wrap'>
                <img src={uploadImage} alt="" />
              </div>
            </div>
          </div>
          <div className='reviewDetails-mediaSection'>
            <div className='mediaSection-leftside'>
              <p className='viewReview-label base text-2xs w-500'>Product</p>
              <div className='productImage-wrapper'>
              <div className='mediaSection-productImage-wrap'>
               <img src={uploadImage} alt="" />
              </div>
              <div className='productText-wrap'>
                <p className='text-xxs w-400 base'>Ripped Women Jeans</p>
                <p className='text-xxs w-400 gray mt-3'> SKU : 1584DERT4</p>
              </div>
              </div>
            </div>
            {/* <div className='mediaSection-rightside'>
             <p className='viewReview-label base text-2xs w-500'>Media</p>
             <div className='media-images-container'>
              {
                imageCount.map(()=> (
                  <div className='media-images-wrap'>
                  <img src={uploadImage} alt="" />
                 </div>
                ))    
              }
             </div>
            </div> */}
          </div>
        </div>
        <hr  className='line'/>
        <div className='approve-btn-wrap'>
          <button className='button btn-o-red btn-xs'>Reject</button>
          <button className='button button-primary btn-xs'>Approve</button>
        </div>
    </div>
    </ModalBody>
    </Modals>
  )
}

export default ReviewComments