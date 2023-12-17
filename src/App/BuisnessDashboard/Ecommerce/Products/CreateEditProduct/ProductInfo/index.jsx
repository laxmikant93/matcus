import React from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ValidationFile from "../../../../../../Classes/ValidationFile";
import FormError from "../../../../../../Common/Form/FormError";
import FormInput from "../../../../../../Common/Form/FormInput";
import TextEditor from "../../../../../../Common/Form/TextEditor";
import { debounce } from "../../../../../../Common/ImageUploader/UnsplashSection/commonFunction";
import { getSlugAvailibilty } from "../../../../../../store/actions/ecommerce/action/product";
import CategoryDropDown from "../../../../CreateCategoryEcomm/CategoryDropDown/CategoryDropDown";
import ProductCategory from "./ProductCategory";
import SpecificationSection from "./SpecificationSection";

const ProductInfo = ({ onLoadProductInfoData, isFormValid, infoError }) => {
  const dispatch = useDispatch();
  const { user, productDetails, businessInfoData } = useSelector((state) => {
    return {
      user: state.user,
      productDetails: state.productList.getSingleProduct.data,
      businessInfoData: state.businessInfo.getInstituiteData.data,
    }
  })

  const { _id } = useParams();
  const [productTitle, setProductTitle] = useState("")
  const [productRibbon, setProductRibbon] = useState("")
  const [productDescription, setProductDescription] = useState("")
  const [productTitleError, setProductTitleError] = useState(false)
  const [productDescriptionError, setProductDescriptionError] = useState(false)
  const [specificationArray, setSpecificationArray] = useState([])
  const [selectedCategroy, setSelectedCategroy] = useState({})
  const [defaultCategory, setDefaultCheck] = useState(false);

  // const [selectedCategroyError, setSelectedCategroyError] = useState(false)
  const handleInput = (e) => {
    let inputName = e.target.name
    let inputValue = e.target.value
    switch (inputName) {
      case "title":
        setProductTitle(ValidationFile.spaceNotAccept(inputValue))
        setProductTitleError(ValidationFile.isEmpty(inputValue))
        dispatch(getSlugAvailibilty(user.user_business, inputValue))
        break;
      case "ribbon":
        setProductRibbon(ValidationFile.spaceNotAccept(inputValue))
        break;
      default:
        return false
    }
  }
  const optimizedFn = useCallback(debounce(handleInput), []);
  const handleOnChangeContent = (value) => {
    setProductDescription(value)
    setProductDescriptionError(ValidationFile.isEmpty(value))
  }
  const handleLoadSpecification = (values) => {
    setSpecificationArray([...values])
  }
  useEffect(() => {
    onLoadProductInfoData({
      productTitle: productTitle,
      productRibbon: productRibbon,
      productDescription: productDescription,
      specificationArray: specificationArray,
      defaultCategoryCheck: defaultCategory,
      selectedCategroy: selectedCategroy
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultCategory, productDescription, productRibbon, productTitle, selectedCategroy, specificationArray])

  useEffect(() => {
    if (ValidationFile.isNotEmpty(productTitle)) {
      isFormValid(true);
    }
    else {
      isFormValid(false);
    }
  }, [productDescription, productTitle])

  useEffect(() => {
    if (infoError) {
      if (!productTitle) {
        setProductTitleError(true);
      }

    }
    else {
      setProductDescriptionError(false);
      setProductTitleError(false);
    }
  }, [infoError, productDescription, productTitle])

  useEffect(() => {
    if (productDetails && _id) {
      setProductTitle(productDetails.product.productName);
      setProductRibbon(productDetails.product.ribbon);
      setProductDescription(productDetails.product.productDescription);
      setDefaultCheck(productDetails.product.defaultCheckCategory)
      // setSpecificationArray(productDetails.product.miscellaneous);
      // setDefaultCheck(productDetails.product.productActive);
      // setSelectedCategroy(productDetails.product.categoryId);
    }
    if (businessInfoData.defaultCategoryCheck) {
      setDefaultCheck(businessInfoData.defaultCategoryCheck);
    }
  }, [_id, productDetails, businessInfoData])

  const handleCheck = (e) => {
    const value = e.target.checked;
    setDefaultCheck(value)
  }

  return (
    <React.Fragment>
      <div className='e-commerce-wrap'>
        <p className='e-commerce-card-para'>Product info</p>
        <hr className='horizontal-line' />
        <div className='product-info-wrap'>
          <div className='product-form-group '>
            <div className="formFieldwrap width-65">
              <p className='label-heading'>
                Name
              </p>
              <FormInput
                type="text"
                // label="name"
                onChange={(e) => optimizedFn(e)}
                onKeyUp={(e) => optimizedFn(e)}
                onKeyDown={(e) => (e.key === '#' || e.key === '&' || e.key === '/' || e.key === '%') && e.preventDefault() }
                id="name"
                name="title"
                // value={productTitle}
                defaultValue={productTitle}
                placeholder="Add Product Name"
                maxLength="80"
              />
              <FormError
                show={productTitleError}
                error="Name is required."
              />
            </div>

            <div className="formFieldwrap ">
              <p className='label-heading mb-8'>
                Ribbon
              </p>
              <FormInput
                type="text"
                // label="Ribbon"
                id="ribbon"
                name="ribbon"
                onChange={handleInput}
                onKeyUp={handleInput}
                value={productRibbon}
                placeholder="e.g., New Arrival"
                maxLength="80"
              />
              {/* <FormError
                show={false}
                error="Invalid try again "
              /> */}
            </div>
          </div>
          <div className=''>
            <div className="formFieldwrap ">
              <p className='label-heading'>
                Description
              </p>
              <TextEditor
                preFilledData={productDescription}
                currentResponse={(value) => handleOnChangeContent(value)}
                feature="Add description about the product"
              />

            </div>
          </div>

          <div className='product-info-gender'>

          </div>

          {/* category list */}
          <div className="formFieldwrap width-65">
            <p className='label-heading'>
              Product category
            </p>
            {/* <CategoryDropDown position={'bottom'} setSelectedCategroy={(value) => setSelectedCategroy(value)} addProduct={true} /> */}
            <ProductCategory position={'bottom'} addProduct={true} setSelectedCategroy={(value) => setSelectedCategroy(value)} />
            {/* <FormError
              show={selectedCategroyError}
              error="Quantity is required."
              className="mt-5"
            /> */}
            <p className='text-3xs w-400 gray mt-5'>You can add categories where this product will appear in for store visitor filtering. (You can add category from category tab)</p>

          </div>
          <label className='inline mark-feature'>
            <FormInput
              type="checkbox"
              value={defaultCategory}
              onChange={(e) => handleCheck(e)}
              checked={defaultCategory}
            />
            Use this category as default whenever adding a product
          </label>
        </div>
        <hr className='horizontal-line mt-5 mb-15' />
        <div>
          <SpecificationSection onLoadSpecificationData={handleLoadSpecification} />
          <div className=' shipping-return-info-item'>
          </div>
          <div>
          </div>
          <div>
          </div>
          <div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
export default ProductInfo