import React from 'react';
import { useState } from 'react';
import FormError from '../../../../../Common/Form/FormError';
import FormInput from '../../../../../Common/Form/FormInput';
import InputDatePicker from '../../../../../Common/Form/InputDatePicker'
import RatingStar from '../../RatingStar/RatingStar';
import './addReviewForm.scss';
import SearchImage from './searchImage.png';
import crossImg from './crossPng.png'
import UploadMedia from '../UploadMedia/UploadMedia';
import ValidationFile from '../../../../../Classes/ValidationFile';
import Rating from '../../../../../Common/Rating';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductList } from '../../../../../store/actions/ecommerce/action/product';
import { useRef } from 'react';
import UseOutsideClick from '../../../../../Common/UseOutsideClick';
const AddReviewForm = ({ onLoadReviewData, reviewer_name_error, review_stars_error, review_description_error,
  selected_product_error,setDisablebutton }) => {

  const dispatch = useDispatch();
  const { user, getProductListSuccess, getProductListData, getSingleReviewDetails, getSingleReviewSuccess } = useSelector((state) => {
    return {
      user: state.user,
      getProductListSuccess: state.productList.adminProductList.success,
      getProductListData: state.productList.adminProductList.data,
      getSingleReviewDetails: state.ecomReviews.getSingleReviewData.data,
      getSingleReviewSuccess: state.ecomReviews.getSingleReviewData.success,
    }
  })

  const [afterSearch, setAfterSearch] = useState(false);
  const [reviewer_name, setreviewer_name] = useState("");
  const [review_date, setreview_date] = useState("");
  const [review_stars, setreview_stars] = useState("");
  const [review_description, setreview_description] = useState("");
  const [selected_product, setselected_product] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFind, setSearchFind] = useState(false);
  const [productlist, setProductList] = useState([]);
  const [isFilled, setIsFilled] = useState(false);

  const RemovePopToggleRef = useRef();
  UseOutsideClick(RemovePopToggleRef, () => {
    if (afterSearch) handleOutSideClick();
  });


  useEffect(() => {
    dispatch(getProductList(user.user_business,))
  }, [dispatch, user.user_business])

  useEffect(() => {
    if (getProductListSuccess && getProductListData && getProductListData?.productlist.length) {
      setProductList(getProductListData?.productlist);
    }
  }, [getProductListData, getProductListSuccess])

  const handleSearch = (event) => {
    setSearchFind(true);
    event.preventDefault();
    setSearchTerm(event.target.value.trim());
  };

  useEffect(() => {
    if (searchFind && searchTerm) {
      if (productlist && productlist.length) {
        let data = productlist.filter((value) => {
          return (
            value.productName
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          );
        })
        setProductList([...data]);
      }
    }
    else {
      setProductList(getProductListData?.productlist);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getProductListData?.productlist, searchFind, searchTerm])

  const handleChange = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    let value = ValidationFile.spaceNotAccept(inputValue);
    switch (inputName) {
      case "reviewer_name":
        setreviewer_name(value);
        break;
      case "review_description":
        setreview_description(value);
        break;
      default:
        break;
    }
    setDisablebutton(false);
  }

  const handleDatePicker = (value) => {
    setreview_date(value);
  }

  const handleRatingStars = (value) => {
    setreview_stars(value);
    setDisablebutton(false);
  }

  const handleSelectedProduct = (item) => {
    setselected_product(item);
    setAfterSearch(false);
    setDisablebutton(false);
  }

  const handleCrossIcon = () => {
    setselected_product("");
    setSearchTerm("");
    setSearchFind(false);
  }

  const handleOutSideClick = () => {
    setAfterSearch(false);
    setSearchTerm("");
    setSearchFind(false);
  }

  useEffect(() => {
    onLoadReviewData({
      "reviewer_name": reviewer_name,
      "date": review_date,
      "rating": review_stars,
      "message": review_description,
      "product": selected_product?._id,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [review_date, review_description, review_stars, reviewer_name, selected_product?._id])

  useEffect(() => {
    if (getSingleReviewSuccess && getSingleReviewDetails && !isFilled && getSingleReviewDetails) {
      setIsFilled(true);
      setreviewer_name(getSingleReviewDetails?.reviewer_name);
      setreview_date(getSingleReviewDetails?.date);
      setreview_description(getSingleReviewDetails?.message);
      setreview_stars(getSingleReviewDetails?.rating);
      setselected_product(getSingleReviewDetails?.product);
    }
  }, [getSingleReviewDetails, getSingleReviewSuccess, isFilled])


  return (
    <div className='addReviewForm-container'>
      <div className='addReviewForm-firstSection'>
        <div className="reviewName-wrap">
          <FormInput
            type="text"
            label="Reviewer Name"
            labelPosition={'top'}
            id="reviewer_name"
            name="reviewer_name"
            value={reviewer_name}
            placeholder="Enter reviewer full name"
            maxLength="30"
            onChange={handleChange}
          />
          <FormError
            show={reviewer_name_error}
            error="Please enter reviewer name."
          />
        </div>
        {/* <div className="datePickerWrap">
          <p className='text-xs w-400 base lable-text '>Date</p>
          <InputDatePicker
            name="dob"
            type="date"
            value={review_date}
            placeholder="DD-MM-YYYY"
            onKeyDown={(e) => e.preventDefault()}
            onChange={handleDatePicker}
          />
        </div> */}
        <div className='star-section'>
          <p className='text-xs w-400 base rating-label'>Select Stars</p>
          <Rating onRatingClick={handleRatingStars} ratingStar={review_stars} IsClickable={true} />
          <FormError
            show={review_stars_error}
            error="Please select stars."
          />
          {/* <RatingStar value={review_stars} onChange={handleRatingStars} /> */}
        </div>
      </div>
      <div className='addReviewForm-secoundSection'>
        <p className='text-xs w-400 base lable-text '>Review Message</p>
        <div className="form-group">
          <textarea
            className="form-control"
            name="review_description"
            id="exampleFormControlTextarea1"
            rows="2"
            value={review_description}
            placeholder="Enter review message here"
            maxLength="350"
            onChange={handleChange}
          ></textarea>
          <FormError
            show={review_description_error}
            error="Please enter your review."
          />
        </div>
      </div>
      <div className='search-section'>
        <label className='text-xs w-400 base lable-text'> Select the Product</label>
        {
          afterSearch ? (
            <div className='searchfrom' ref={RemovePopToggleRef}>
              <input type="search" className='review-searchInput' placeholder='Search the product' onChange={handleSearch} value={searchTerm} />
              <div className='searchResult-wrap' >
                {productlist && productlist.length ? productlist.map((item, i) => (
                  <div className='searchResults-container' key={i} onClick={() => handleSelectedProduct(item)}>
                    <div className='serachResult-imageWrap'>
                      <img src={item.productPicture && item.productPicture.length ? item.productPicture[0] : SearchImage} alt="" />
                    </div>
                    <div className='search-result-text-wrap'>
                      <p className='text-2xs w-500 base'>{item.productName}</p>
                      <p className='text-3xs w-500 lgray mt-2'>SKU : {item.SKU}</p>
                    </div>
                  </div>
                ))
                  :
                  "No records found."
                }
              </div>
            </div>) : (
            <div className='searchForm-afterSelect-wrap' onClick={() => { setAfterSearch(!afterSearch) }}>
              {selected_product ?
                <div className='search-after'>
                  <div className='image-wrap'>
                    <img src={selected_product.productPicture && selected_product.productPicture.length ? selected_product.productPicture[0] : SearchImage} alt="" />
                  </div>
                  <div className='title-wrap'>
                    <p className='text-xxs w-400 base'>{selected_product.productName}</p>
                  </div>
                  <div className='sku-wrap'>
                    <p className='text-xxs w-400 lgray'>I  SKU : {selected_product.SKU}</p>
                  </div>
                  <div className='cross-icon-wrap' onClick={handleCrossIcon}>
                    {/* <i className='ed-icon i-s icon-cross gray'></i> */}
                    <img src={crossImg} alt="" />
                  </div>
                </div>
                :
                <div className='searchfrom'>
                  <input type="search" className='review-searchInput' placeholder='Search the product' onChange={handleSearch} value={searchTerm} />
                </div>
              }
            </div>
          )
        }
        <FormError
          show={selected_product_error}
          error="Please select the product."
        />
      </div>
    </div>
  )
}

export default AddReviewForm