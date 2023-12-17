import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SessionStorage from "../../../../../../Classes/SessionStorage";
import SwitchButton from "../../../../../../Common/Button/SwitchButton";
import { getInstituteData } from "../../../../../../store/actions/businessInfo";
import DiscartPopUp from "../../../../../Dashboard/EcommerceDashboard/Component/DiscartPopUp";

const Payments = ({ storagedata, edit, editId, onLoadPayments }) => {
  const [COD, setCOD] = useState(true);

  const dispatch = useDispatch();
  const discartRef = useRef(null);
  const { _id } = useParams()
  const { user, getbusinessInfoSuccess, getbusinessInfoData, productDetails } = useSelector((state) => {
    return {
      user: state.user,
      getbusinessInfoSuccess: state.businessInfo.getInstituiteData.success,
      getbusinessInfoData: state.businessInfo.getInstituiteData.data,
      productDetails: state.productList.getSingleProduct.data,
    };
  })

  useEffect(() => {
    dispatch(getInstituteData(user.user_business, user.user_business_type));
  }, [dispatch, user.user_business, user.user_business_type])

  useEffect(() => {
    if (getbusinessInfoSuccess && getbusinessInfoData && !getbusinessInfoData.cash_on_delivery_enabled
    ) {
      setCOD(false);
    }
  }, [getbusinessInfoData, getbusinessInfoSuccess]);

  useEffect(() => {
    if (productDetails && _id) {
      setCOD(productDetails.product.cod);
    }
  }, [productDetails])

  const handleCODSetting = (e) => {
    let inputChecked = e.target.checked;
    if (user.user_razorpay_id) {
      if (inputChecked) {
        setCOD(true);
      }
      else {
        setCOD(false);
      }
    }
    else {
      if (inputChecked) {
        setCOD(true);
      }
      else {
        discartRef.current.open();
        SessionStorage.setJson("data", storagedata);
      }
    }

  }
  useEffect(() => {
    onLoadPayments({
      COD: COD
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [COD])
  const oncloseDiscardPopup = () => {
    // discartRef.current.close()
  }
  return (
    <React.Fragment>
      <div className='addProduct-container  sectionGap'>
        <div className='e-commerce-wrap'>
          <p className='sidebar-heading '>Payments</p>
          <hr className='horizontal-line' />
          <div className='sidebar-collection-wrap side-padding'>
            <div className='delivery-container'>
              <div className='text-div'>
                <p className='text-xs w-500 base'>Cash On Delivery</p>
              </div>

              {getbusinessInfoSuccess && getbusinessInfoData && getbusinessInfoData.cash_on_delivery_enabled ?
                <div className='switch-button'>
                  <SwitchButton
                    checked={COD}
                    onChange={(e) => handleCODSetting(e)}
                  />
                </div>
                :
                <div className='switch-button'>
                  <SwitchButton
                    disabled
                    checked={COD}
                    onChange={(e) => handleCODSetting(e)}
                  />
                </div>
              }

              <div className='switch-button'>
                {edit === true ?
                  <DiscartPopUp onclose={() => oncloseDiscardPopup()} discartRef={discartRef} popuptext={true} editpopup={true} editId={editId} />
                  :
                  <DiscartPopUp onclose={() => oncloseDiscardPopup()} discartRef={discartRef} popuptext={true} />
                }

              </div>

            </div>
            <p className='text-3xs w-300 toogle-text'>Turn on the toggle button to allow users to select cash on delivery payment methods for this product</p>

          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
export default Payments