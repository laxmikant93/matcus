import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import ValidationFile from "../../../../../../Classes/ValidationFile";
import CheckboxInput from "../../../../../../Common/Form/CheckboxInput";
import FormError from "../../../../../../Common/Form/FormError";
import FormInput from "../../../../../../Common/Form/FormInput";

import IButton from '../../../../../Dashboard/EcommerceDashboard/assets/icons/i-Vector.svg';
const Pricing = ({ onLoadPricingData, productVariations, isFormValid, infoError, varID }) => {
  const [price, setPrice] = useState("")
  const [masterProductPrice,setMasterProductPrice]=useState("")
  const [shippingCharge, setshippingCharge] = useState("")
  const [discount, setdiscount] = useState("")
  const [discount_by_percent, set_discount_by_percent] = useState(false)
  const [discountError, setDiscountError] = useState(false)
  const [salePrice, setSalePrice] = useState("")
  const [cog, setCog] = useState("")
  const [profit, setProfit] = useState("");
  const [productPriceError, setProductPriceError] = useState(false);
  const [onSale, setOnSale] = useState(false)
  const [symbolsArr] = useState(["e", "E", "+", "."]);
  const { _id } = useParams()
  const { pathname } = useLocation()
  const { productDetails, productDetailsSuccess } = useSelector((state) => {
    return {
      productDetails: state.productList.getSingleProduct.data,
      productDetailsSuccess: state.productList.getSingleProduct.success
    }
  })


  const handleInput = (e) => {
    let inputName = e.target.name
    let inputValue = e.target.value

    switch (inputName) {
      case "price": 
        if (cog) {
          const dynamicprofit = Math.ceil(
            ValidationFile.spaceNotAccept(inputValue) - cog
          );
          setProfit(dynamicprofit);
        }
        if (productVariations) {
          let val= !inputValue ? inputValue : inputValue === "-" ? inputValue : parseInt(inputValue)
          productVariations[varID]['price'] = val
          setPrice(val)
        }else{
          setPrice(parseInt(inputValue))
          setProductPriceError(
            ValidationFile.isEmpty(ValidationFile.spaceNotAccept(inputValue))
          );
        }
        if (discount) {
          isDiscountValid(discount)
        }
        break;
      case "shippingCharge":
        setshippingCharge(inputValue)
        break;
      case "discount":
        setdiscount(parseInt(inputValue))
        isDiscountValid(parseInt(inputValue))

        break;
      case "salePrice":
        setSalePrice(inputValue)
        const discountPer = ((price - ValidationFile.spaceNotAccept(inputValue)) * 100) / price;
        setdiscount(Math.floor(discountPer));
        // console.log(Math.floor(discountPer), "line 69")
        break;
      case "cog":
        setCog(inputValue)
        if (salePrice && salePrice !== 0) {
          const profit = Math.ceil(
            salePrice - ValidationFile.spaceNotAccept(inputValue)
          );
          setProfit(profit);
        } else {
          const profit = Math.ceil(
            price - ValidationFile.spaceNotAccept(inputValue)
          );
          setProfit(profit);
        }
        if(!cog){
          setProfit("")
        }

        if (productVariations) {
          productVariations[varID]['costPrice'] = parseInt(inputValue)
        }
        break;
      case "profit":
        setProfit(inputValue)
        if (productVariations) {
          productVariations[varID]['profit'] = parseInt(inputValue)
        }
        break;

      default:
        return false
    }
  }
  const handleDiscountType = (value) => {
    set_discount_by_percent(value)
    setdiscount("")
    setSalePrice("")
  }
  const isDiscountValid = (inputValue) => {
    if (inputValue) {
      if (discount_by_percent) {
        if (inputValue > 100) {
          setDiscountError(true)
          return false
        } else {
          setDiscountError(false)
          const salePr = (price * (100 - ValidationFile.spaceNotAccept(parseInt(inputValue)))) / 100; setSalePrice(Math.ceil(salePr));
          if (salePrice && salePrice !== 0 && cog > 0) {
            const profit = Math.ceil(Math.ceil(salePr) - cog);
            setProfit(profit);
          }
          return true
        }

      } else {
        if (inputValue > price) {
          setDiscountError(true)
          return false
        } else {
          setDiscountError(false)
          const salePr = (price - ValidationFile.spaceNotAccept(parseInt(inputValue))); setSalePrice(Math.ceil(salePr));
          // console.log(salePr, "line 59")
          if (salePrice && salePrice !== 0 && cog > 0) {
            const profit = Math.ceil(Math.ceil(salePr) - cog);
            setProfit(profit);
          }
          return true

        }

      }
    } else {
      const salePr = (price - ValidationFile.spaceNotAccept(parseInt(0))); setSalePrice(Math.ceil(salePr));
      if (cog) {
        const profit = Math.ceil(
          salePrice - ValidationFile.spaceNotAccept(cog)
        );
        setProfit(profit);
      } else {
        setProfit("")
      }

    }
  }
  useEffect(() => {
    onLoadPricingData({
      price: parseInt(price),
      shippingCharge: parseInt(shippingCharge),
      discount: parseInt(discount),
      salePrice: parseInt(salePrice),
      cog: parseInt(cog),
      onSale: onSale,
      profit: parseInt(profit),
      discount_by_percent: discount_by_percent,
      productVariations: productVariations,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cog, discount, onSale, price, profit, salePrice, discount_by_percent, shippingCharge])

  useEffect(() => {
    // const validDiscount = isDiscountValid(discount)
    if(window.location.pathname.includes("inventory")){
        isFormValid(true);
     }else{
      if (ValidationFile.isNotEmpty(price)) {
        isFormValid(true);
      }
      else {
        isFormValid(false);
      }
    }
   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price])

  useEffect(() => {
    
    if (infoError) {
      if (!price) {
        setProductPriceError(true);
      }
      else {
        setProductPriceError(false);
      }
    }
    else {
      setProductPriceError(false);
    }
  }, [infoError, price])

  useEffect(() => {
    if (productDetails && productDetailsSuccess) {
      if (!productDetails?.product?.defaultVariation && window.location.pathname.includes('editInventory')) {
        setPrice(productDetails.variation?.length ? productDetails.variation.find((item, i) => i === varID)?.price?productDetails.variation.find((item, i) => i === varID)?.price:0 :0);
        setshippingCharge(productDetails.variation?.length && productDetails.variation.find((item, i) => i === varID)?.shipping_cost);
        setdiscount(productDetails.variation?.length && productDetails.variation.find((item, i) => i === varID)?.discountPercentage);
        setSalePrice(productDetails.variation?.length && productDetails.variation.find((item, i) => i === varID)?.salePrice);
        setCog(productDetails.variation?.length && productDetails.variation.find((item, i) => i === varID)?.costPrice);
        setProfit(productDetails.variation?.length && productDetails.variation.find((item, i) => i === varID)?.profit);
        setOnSale(productDetails.variation?.length && productDetails.variation.find((item, i) => i === varID)?.onSale)
        setMasterProductPrice(productDetails?.product.price)
      }
      else {
        if (_id) {
          setPrice(productDetails.product.price);
          // console.log(productDetails.product.price, typeof (productDetails.product.price))
          setshippingCharge(productDetails.product.shipping_cost);
          setdiscount(productDetails.product.discountPercentage);
          setSalePrice(productDetails.product.salePrice);
          set_discount_by_percent(productDetails.product?.discount_by_percent)
          setCog(productDetails.product.costPrice);
          setProfit(productDetails.product.profit);
          if (productDetails.product.onSale) {
            setOnSale(productDetails.product.onSale ? productDetails.product.onSale : false)
          } else {
            setOnSale(productDetails.product.discountPercentage ? true : false)
          }
          setMasterProductPrice(productDetails?.product.price)
        }
      }
    }
  }, [_id, productDetails, productDetailsSuccess, varID])
  const handleOnSale = (e) => {
    setOnSale(e.target.checked)
    setdiscount("");
    setSalePrice("");
    set_discount_by_percent(e.target.checked)
  }
  
  return (
    <React.Fragment>
      <div className='e-commerce-wrap sectionGap'>
        <p className='e-commerce-card-para'>Pricing</p>
        <hr className='horizontal-line' />
        <div className='product-info-wrap'>
          <div className='pricing-price-input-wrap'>
            <div className="formFieldwrap  ecom-form-price">
              <p className='label-heading mb-8'>
                {window.location.pathname.includes("editInventory")?"Price diffrence (+/-)":"Price"}
              </p>
              <FormInput
                type="number"
                id="price"
                name="price"
                onChange={handleInput}
                onKeyUp={handleInput}
                onKeyDown={(e) =>
                  symbolsArr.includes(e.key) && e.preventDefault()
                }
                min={0}
                onWheel={(e) => e.target.blur()}
                value={price}
                maxLength="8"
                className="position-relative"
              />
              <FormError
                show={productPriceError}
                error="Product Price is required."
              />
              <span className='ruppe-symbol'>&#8377;</span>
            </div>


          {window.location.pathname.includes("editInventory")?  
          <div className="formFieldwrap  ecom-form-price">
              <p className='label-heading mb-8'>
                Price
              </p>
              <FormInput
                type="number"
                id="price"
                name="price"      
                disabled={true}
                value={masterProductPrice}
                maxLength="8"
                className="position-relative"
              />
              <span className='ruppe-symbol'>&#8377;</span>
            </div>:""}
            {/* <div className="formFieldwrap ">
              <p className='label-heading mb-8'>
                Shipping Charges (<span>&#8377;</span>)
              </p>
              <FormInput
                type="number"
                id="price"
                name="shippingCharge"
                onKeyDown={(e) =>
                  symbolsArr.includes(e.key) && e.preventDefault()
                }
                onChange={handleInput}
                onKeyUp={handleInput}
                onWheel={(e) => e.target.blur()}
                placeholder="₹"
                value={shippingCharge}
                maxLength="80"
              />

            </div> */}
          </div>
          <div className='pricing-discount-section'>
            {pathname.includes("editInventory") ? "" : <React.Fragment>
              <CheckboxInput
                label={"On Sale"}
                LabelClass={"label-heading eComm-checkbox-center"}
                className={"eComm-checkbox"}
                onChange={handleOnSale}
                checked={onSale}
              />

              {onSale && <div className='pricing-input-wrap'>
                <div className='discount-lower-wrap'>
                  <div className='position-relative'>
                    <div className="formFieldwrap position-relative ">
                      <p className='label-heading mb-8'>
                        Discount
                      </p>
                      <FormInput
                        type="number"
                        // label="Ribbon"
                        id="discount"
                        name="discount"
                        value={discount}
                        onWheel={(e) => e.target.blur()}
                        onChange={handleInput}
                        onKeyUp={handleInput}
                        onKeyDown={(e) =>
                          symbolsArr.includes(e.key) && e.preventDefault()
                        }
                        placeholder="0"
                        className="discount-form-fieldwrap"
                        max="100"
                        min="0"
                      />
                      <FormError show={discountError} error="Invalid discount." />
                    </div>
                    <div className='discount-lower-spans'>
                      <span
                        onClick={() => handleDiscountType(true)}
                        className={`margin-right ${discount_by_percent ? 'percentage-span' : ''}`}
                      >
                        %
                      </span>
                      <span onClick={() => handleDiscountType(false)} className={discount_by_percent ? '' : 'percentage-span'}>₹</span>

                    </div>
                  </div>
                </div>
                <div className="formFieldwrap position-relative ecom-form-price">
                  <p className='label-heading mb-8'>
                    Sale Price
                  </p>
                  <FormInput
                    type="number"
                    id="sale-price"
                    name="salePrice"
                    min="0"
                    disabled={true}
                    value={salePrice}
                    onKeyDown={(e) =>
                      symbolsArr.includes(e.key) && e.preventDefault()
                    }
                    onWheel={(e) => e.target.blur()}
                    onChange={handleInput}
                    onKeyUp={handleInput}
                    maxLength="8"
                  />
                  <span className='ruppe-symbol'>&#8377;</span>
                  {/* <FormError
                  show={productSalePriceError && infoError}
                  error="Sale-Price is required."
                /> */}
                </div>
              </div>}
            </React.Fragment>}
          </div>
          {/* cost of goods inputs */}
          <div className='goods-section'>
            <div className='goods-section-wrap'>
              <div className='formFieldwrap ecom-form-price'>
                <div className='goods-section-label-wrap'>
                  <p className='label-heading label-heading-margin'>
                    Cost of Goods
                  </p>
                  <img src={IButton} alt="icon" title="The amount invested to produce and sell this product." />
                </div>
                <FormInput
                  type="number"
                  id="cost-of-goods"
                  name="cog"
                  value={cog}
                  onKeyDown={(e) =>
                    symbolsArr.includes(e.key) && e.preventDefault()
                  }
                  onChange={handleInput}
                  min="0"
                  onKeyUp={handleInput}
                  onWheel={(e) => e.target.blur()}
                  maxLength="8"
                />
                <span className='ruppe-symbol'>&#8377;</span>
                {/* <FormError
                  show={productCostError && infoError}
                  error="Cost of goods is required."
                /> */}
              </div>

              <div className='formFieldwrap  ecom-form-price'>
                <div className='goods-section-label-wrap'>
                  <span className='label-heading label-heading-margin'>
                    Profit
                  </span>
                  <img src={IButton} alt="icon" title='Product price after deducting the cost of goods.' />
                </div>
                <FormInput
                  type="number"
                  id="profit"
                  value={profit}
                  name="profit"
                  onKeyDown={(e) =>
                    symbolsArr.includes(e.key) && e.preventDefault()
                  }
                  onChange={handleInput}
                  onKeyUp={handleInput}
                  onWheel={(e) => e.target.blur()}
                  maxLength="8"
                  disabled={true}
                />
                <span className='ruppe-symbol'>&#8377;</span>
                {/* <FormError
                  show={productProfitError && infoError}
                  error="Profit is Required"
                /> */}
              </div>

            </div>
            <p className='text-xxs gray customer-text  w-300'>Customers won’t see this</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
export default Pricing