import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ValidationFile from "../../../../../../Classes/ValidationFile";
import FormError from "../../../../../../Common/Form/FormError";
import FormInput from "../../../../../../Common/Form/FormInput";
import { debounce } from "../../../../../../Common/ImageUploader/UnsplashSection/commonFunction";
import { checkSkuAvailability, resetSkuAvailability } from "../../../../../../store/actions/ecommerce/action/product";

import IButton from '../../../../../Dashboard/EcommerceDashboard/assets/icons/i-Vector.svg';
const Inventory = ({ productName, productVariations, onLoadInventoryData, isFormValid, infoError, varID }) => {
  const [productSKU, setProductSKU] = useState("");
  const [dynamicSKU, setDynamicSKU] = useState("")
  const [productBarcode, setProductBarcode] = useState("");
  const [productAvailableQty, setProductAvailableQty] = useState();
  const [productAvailableQtyError, setProductAvailableQtyError] = useState(false);

  const { _id } = useParams()
  const [symbolsArr] = useState(["e", "E", "+", "-", "."]);

  const { productDetails, productDetailsSuccess, skuMessage, user } = useSelector((state) => {
    return {
      productDetails: state.productList.getSingleProduct.data,
      productDetailsSuccess: state.productList.getSingleProduct.success,
      skuMessage: state.productList.skuAvailability.data,
      user: state.user
    }
  })

  const dispatch = useDispatch()
  const [disabledState, setDisabledState] = useState(false)
  useEffect(() => {
    if (productDetails && productDetailsSuccess) {
      if (!productDetails?.product?.defaultVariation && window.location.pathname.includes('editInventory')) {
        setProductSKU(productDetails.variation?.length && productDetails.variation.find((item, i) => i === varID)?.SKU)
        setProductBarcode(productDetails.variation?.length && productDetails.variation.find((item, i) => i === varID)?.barcode);
        setProductAvailableQty(productDetails.variation?.length && productDetails.variation.find((item, i) => i === varID)?.stock);
        setDynamicSKU(productDetails.variation?.length && productDetails.variation.find((item, i) => i === varID)?.SKU)
        setDisabledState(true)
      }
      else {
        if (_id) {
          setProductSKU(productDetails.product.SKU);
          setProductBarcode(productDetails.product.barcode);
          setProductAvailableQty(productDetails.product.stock);
          setDynamicSKU(productDetails.product.SKU)
        }
      }
    }
  }, [_id, productDetails, varID])

  const handleInput = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    let value = ValidationFile.spaceNotAccept(inputValue)
    switch (inputName) {
      case "barcode":
        setProductBarcode(value);
        if (window.location.pathname.includes('editInventory')) {
          if (productVariations.length > 0) {
            productVariations[varID]['barcode'] = value
          }
        }
        break;
      case "salePriceice":
        setProductAvailableQty(value);
        setProductAvailableQtyError(
          ValidationFile.isEmpty(ValidationFile.spaceNotAccept(inputValue)));
        if (window.location.pathname.includes('editInventory')) {
          if (productVariations.length > 0) {
            productVariations[varID]['stock'] = parseInt(value)
          }
        }
        break;

      default:
        break;
    }
  }
  const handleSKU = (e) => {
    let inputValue = e.target.value
    setDynamicSKU(ValidationFile.spaceNotAccept(inputValue))
    if (window.location.pathname.includes('editInventory')) {
      if (productVariations.length > 0) {
        productVariations[varID]['SKU'] = parseInt(ValidationFile.spaceNotAccept(inputValue))
      }
    }
    dispatch(checkSkuAvailability({ sku: inputValue, business: user.user_business, productId: _id ? _id : null }))
  }
  useEffect(() => {
    if (!varID) {
      if (productName) {
        if (ValidationFile.spaceNotAccept(productName).split(" ").length > 1) {
          setProductSKU(
            `${ValidationFile.spaceNotAccept(productName)
              .split(" ")[0]
              .substring(0, 1)}${ValidationFile.spaceNotAccept(productName)
                .split(" ")[1]
                .substring(0, 1)}${Math.random().toString(36).substring(2, 8)}`
          );
        } else {
          setProductSKU(
            `${ValidationFile.spaceNotAccept(productName).substring(
              0,
              2
            )}${Math.random().toString(36).substring(2, 8)}`
          );
        }
      }
    }
  }, [productName])
  useEffect(() => {
    onLoadInventoryData({
      productSKU: dynamicSKU ? dynamicSKU : productSKU,
      productBarcode: productBarcode,
      productAvailableQty: parseInt(productAvailableQty),
      productVariations: productVariations,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productAvailableQty, productBarcode, productSKU, dynamicSKU])

  useEffect(() => {
    if (ValidationFile.isNotEmpty(productAvailableQty)) {
      isFormValid(true);
    }
    else {
      isFormValid(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productAvailableQty])

  useEffect(() => {
    if (infoError) {
      if (!productAvailableQty) {
        setProductAvailableQtyError(true);
      }
      else {
        setProductAvailableQtyError(false);
      }
    }
  }, [infoError, productAvailableQty])

  useEffect(() => {
    return () => {
      dispatch(resetSkuAvailability())
    }
  }, [dispatch])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const optimizedFn = useCallback(debounce(handleSKU), []);
  return (
    <React.Fragment>
      <div className='e-commerce-wrap sectionGap'>
        <p className='e-commerce-card-para'>Inventory</p>
        <hr className='horizontal-line' />
        <div className='product-info-wrap'>
          <div className='product-form-group'>
            <div className='formFieldwrap width-100'>
              <div className='goods-section-label-wrap'>
                <p className='label-heading label-heading-margin'>
                  SKU (Stock Keeping Unit)
                </p>
                <img src={IButton} alt="icon" title='Define a unique code for each product or variant that can be used to track the inventory or stock. SKU may consist of a combination of letters and numbers.' />
              </div>
              <FormInput
                type="text"
                // label="Ribbon"
                id="sku"
                name="sku"
                onChange={(e) => optimizedFn(e)}
                onKeyUp={(e) => optimizedFn(e)}
                defaultValue={dynamicSKU}
                placeholder=""
                maxLength="80"
                disabled={disabledState}
                onKeyDown={() => skuMessage && dispatch(resetSkuAvailability())}
              />
              <FormError show={skuMessage === "Not available"} error="SKU should always be unique." />
            </div>
            <div className="formFieldwrap width-100 ">
              <p className='label-heading mb-8'>
                Barcode(ISBN, UPC, GTIN, etc)
              </p>
              <FormInput
                type="text"
                // label="Ribbon"
                id="barcode"
                name="barcode"
                onChange={handleInput}
                onWheel={(e) => e.target.blur()}
                onKeyDown={(e) =>
                  symbolsArr.includes(e.key) && e.preventDefault()
                }
                value={productBarcode}
                placeholder=""
                maxLength="8"
              />
            </div>
          </div>
        </div>
        {/* horizontal line will be place here */}
        <hr className='horizontal-line mt-15' />
        <div className='inventory-bottom-section'>
          <p className='mt-20 label-heading'>QUANTITY</p>
          <div className='inventory-quantity-input'>
            <div className="formFieldwrap mt-25">
              <p className='label-heading mb-8'>
                Available
              </p>
              <FormInput
                type="number"
                // label="Ribbon"
                id="sale-price"
                name="salePriceice"
                onChange={handleInput}
                onKeyDown={(e) =>
                  symbolsArr.includes(e.key) && e.preventDefault()
                }
                onWheel={(e) => e.target.blur()}
                value={productAvailableQty}
                placeholder="0"
                maxLength="5"
              />
              <FormError
                show={productAvailableQtyError}
                error="Quantity is required."
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
export default Inventory