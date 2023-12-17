import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import GrayAuthTheme from "../Common/Theme/GrayAuthTheme";
// import NoDataAvailable from "../Common/NoDataAvailable";
// import AppLink from "../Common/AppLink";
import imgCard from "../assets/images/img/appointment-banner.jpg"
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WebsiteServiceList.scss"
import { getAllMainServiceList } from "../store/actions/bookAppointment";
import SelectInput from "../Common/Form/SelectInput";
// import Storage from "../Classes/Storage";
import { selectRouteForPreview, setParamId } from "../store/actions/serviceWebsiteTemplate";
import FormError from "../Common/Form/FormError";
import ValidationUtils from "../Classes/ValidationUtils";
import ImageViewer from "../Common/ImageViewer";
const WebsiteServiceList = () => {
  let dispatch = useDispatch()
  let history = useNavigate()
  const [allService, setAllService] = useState("")
  const [filterService, setFilterService] = useState("")
  const [serviceidError, setServiceIdError] = useState(false);

  const { preview, serviceListData, templateSuccess } = useSelector((state) => {
    return {
      serviceListData: state.bookAppointment.getallServiceList.data,
      preview: state.serviceTemplate.preview,
      templateSuccess: state.serviceTemplate.getTemplate.success,
    }
  })

  const { instituteData } = useSelector((state) => state.serviceTemplate.getTemplate.data);

  useEffect(() => {
    if (templateSuccess) {
      dispatch(getAllMainServiceList(instituteData._id, instituteData.type))

    }
  }, [dispatch, templateSuccess, instituteData])


  const hadleCategorySelect = (e) => {
    let inputValue = e.target.value
    setAllService(inputValue);
    setServiceIdError(ValidationUtils.isEmpty(inputValue));
  }


  const handleContinue = () => {
    if (ValidationUtils.isNotEmpty(allService)) {
      if (preview) {
        dispatch(selectRouteForPreview(`/book-appointment/${allService}`, true))
        dispatch(setParamId(allService))
      }
      else {
        history(`/book-appointment/${allService}`)
      }
    } else {
      setServiceIdError(true)
    }
  }

  useEffect(() => {
    if (serviceListData && serviceListData.length > 0) {
      let array = []
      serviceListData.map((item) => {
        if (item.isHide === false || item.serviceDisablefrom === false && item.serviceDisableto === false) {
          array.push(item)
        }
      })
      setFilterService([...array])
    }
  }, [serviceListData])


  return (
    <GrayAuthTheme>
      <div className="serviceList-wrapper">
        <div className="serviceListCard">
          {instituteData && instituteData && instituteData.banners ? (
            instituteData.banners.length ?
              <ImageViewer object={instituteData.banners[0].business_featured_banner ? instituteData.banners[0].business_featured_banner : imgCard} defaultImage={imgCard} className="img-fluid" alt="" />

              : <React.Fragment>
                <img src={imgCard} className="img-fluid" alt="" />
              </React.Fragment>) : <img src={imgCard} className="img-fluid" alt="" />}
          {/* <img src={imgCard} className="img-fluid" alt="" /> */}
          <div className="cardbody">
            <p className="mb-10 text-xxs w-500">Services List</p>
            <div className="formFieldwrap">
              <SelectInput
                id="profession_cat"
                onChange={hadleCategorySelect}
                className="dropbtn"
                name="mainCategory"
                value={allService}
                required
              > <option value="" className="option active">
                  Select Service
                </option>
                {filterService.length
                  && filterService.map((item) => {
                    return (
                      <option className="option active"
                        value={item._id}
                      >
                        {item.title}
                      </option>
                    );
                  })
                }

              </SelectInput>
              <FormError
                show={!allService && serviceidError}
                error="Please select service"
                className='visitorFormError'
              />
            </div>
            <p className="text_term text-2xs w-400">By continuing, I agree to the Terms of Use & Privacy Policy</p>
            <button className="button btn-sm btn-block" onClick={handleContinue}>Continue</button>
          </div>
        </div>
      </div>
    </GrayAuthTheme>
  );
}
export default WebsiteServiceList;