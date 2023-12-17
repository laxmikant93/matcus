import React from 'react';
import { useSelector } from 'react-redux';
import CODIcon from '../../../assets/images/codIcon.png';
import './codavailable.scss';

const CODavailable = ({ icon = true }) => {
  const { productDetails, ecomWebsite } = useSelector((state) => {
    return {
      productDetails: state.productList.customerproductDetail.data.product,
      ecomWebsite: state.businessInfo.ecomWebsite
    }
  })

  // const CODAvilable = ecomWebsite.data && ecomWebsite.data.cod_price_limitation && ecomWebsite.data.cash_on_delivery_enabled && productDetails.cod && ((ecomWebsite.data.cod_price_limitation && ecomWebsite.data.cash_on_delivery_price_limit > 0 ? ecomWebsite.data.cash_on_delivery_price_limit : "") > (validPrice ? productDetails.price : productDetails?.salePrice));
  // const DefaultCODAvilable = ecomWebsite.data.cash_on_delivery_enabled && (ecomWebsite.data.cash_on_delivery_price_limit === 0 || ecomWebsite.data.cash_on_delivery_price_limit === "")
  // const DefaultCODAvilable = ecomWebsite.data.cash_on_delivery_enabled && !ecomWebsite.data.cod_price_limitation
  
  
  let SingleproductValid = (productDetails.cod === true) && ecomWebsite.data && ecomWebsite.data.cash_on_delivery_enabled;
  
  const validPrice = ((productDetails?.salePrice === 0) && (productDetails?.price > 0))
  let isvalidPrice = ecomWebsite.data.cash_on_delivery_price_limit && ecomWebsite.data.cod_price_limitation && ecomWebsite.data.cash_on_delivery_price_limit > (validPrice ? productDetails.price : productDetails?.salePrice)
  let isValidLimit = ecomWebsite.data && ecomWebsite.data.cash_on_delivery_enabled && productDetails.cod && ecomWebsite.data.cash_on_delivery_price_limit && ecomWebsite.data.cod_price_limitation && isvalidPrice
  let withoutLimit = ecomWebsite.data && ecomWebsite.data.cash_on_delivery_enabled && productDetails.cod && (ecomWebsite.data.cod_price_limitation=== false)
  let isValid = isValidLimit ? isValidLimit : withoutLimit;

  console.log(isvalidPrice,isValidLimit,isValid,"productDetails")
  // console.log(ecomWebsite.data,"ecomWebsite")
  return (
    <React.Fragment>
      <div className='cod-container'>
        {icon ? (
          <div className='cod-icon-wrap'>
            <img src={CODIcon} alt="codIcon" className='' />
          </div>
        ) : null
        }
        <div className='cod-right-text'>
          {/* <p className='cod-text'>COD Available</p> */}
          {/* <p className='cod-text'>{((productDetails?.salePrice > 0) && (productDetails?.price > 0) && (productDetails?.salePrice > 5000)) || ((productDetails?.salePrice === 0) && (productDetails?.price > 5000)) ? "COD Not Avilable" : "COD Available"}</p> */}

          {
            isValid ? (
              <p className='cod-text'>COD Available</p>
            ) : (
              <p className='cod-text'>COD Not Available</p>
            )
          }

        </div>


      </div>
    </React.Fragment>
  )
}

export default CODavailable