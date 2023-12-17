import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Breadcrumb from '../../../../Common/Breadcrumb';
import BreadcrumbItem from '../../../../Common/Breadcrumb/BreadcrumbItem';
import CircleButton from '../SettingComponents/CircleButton/CircleButton';
import './businessSetting.scss';
import BussienessInfo from './Components/BussinessInfo/BussienessInfo';
import LocationAndContact from './Components/LocationAndContact/LocationAndContact';
// import {getInstituteData} from "../../../../store/actions/"
import { getInstituteData, patchInstituteInfo } from '../../../../store/actions/businessInfo';
import TimeInput from './Components/TimeInput/TimeInput';
import ContactInfo from './Components/ContactInfo/ContactInfo';
import ValidationUtils from '../../../../Classes/ValidationUtils';

const BusinessSetting = () => {
  const dispatch = useDispatch()
  const [BussinessName, setBussinessName] = useState()
  const [businessLogo, setBusinessLogo] = useState()
  const [BusinessPhone, setBusinessPhone] = useState()
  const [BusinessEmail, setBusinessEmail] = useState()
  const [BusinessAddress, setBusinessAddress] = useState()
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")
  const [countryCode, setCountryCode] = useState("91");
  const [contactNumberError, setContactNumberError] = useState(false);
  const [showUserSide, setShowUserSide] = useState()
  const [emailError, setEmailError] = useState(false)
  const [openTime, setOpenTime] = useState()
  const [closeTime, setCloseTime] = useState()

  // const [addressDetails, setAddressDetails] = useState("")
  const [optionalAddress, setOptionalAddress] = useState("")
  const [getMapUrl, setGetMapUrl] = useState("")
  const [value, setValue] = useState("");
  const [addressDetailsError, setAddressDetailsError] = useState(false)

  // const [BussinessName, setBussinessName] = useState()

  const [serviceDays, setServiceDays] = useState([])

  const { user, getbusinessInfoData, businessId, businessType } = useSelector
    ((state) => {
      return {
        user: state.user,
        businessdetail: state.manageinstituteinfo,
        businessType: state.user.user_business_type,

        getbusinessInfoData: state.businessInfo.getInstituiteData,
        businessInfoPatchSuccess: state.businessInfo.patchInstituteInfo.loading,
        businessId: state.user.user_business
      };
    });

  useEffect(() => {
    dispatch(getInstituteData(user.user_business, user.user_business_type));
  }, [dispatch, user.user_business, user.user_business_type])

  // console.log(user.user_business_type)
  useEffect(() => {
    if (user.user_business_type === "LMS") {
      setBussinessName(getbusinessInfoData?.data?.institute_name)
      setBusinessLogo(getbusinessInfoData?.data?.institute_logo)
      setBusinessPhone(getbusinessInfoData?.data?.institute_phone)
      setBusinessEmail(getbusinessInfoData?.data?.institute_email)
      // setOpenTime(getbusinessInfoData?.data?.opening_time)
      // setCloseTime(getbusinessInfoData?.data?.closing_time)
      setValue(getbusinessInfoData?.data?.place_Name_Map)
      setServiceDays(getbusinessInfoData?.data?.servicing_days)


    } else {
      setBussinessName(getbusinessInfoData?.data?.business_name)
      setBusinessLogo(getbusinessInfoData?.data?.business_logo)
      setBusinessPhone(getbusinessInfoData?.data?.business_phone)
      setBusinessEmail(getbusinessInfoData?.data?.business_email)
      // setOpenTime(getbusinessInfoData?.data?.opening_time)
      // setCloseTime(getbusinessInfoData?.data?.closing_time)
      setValue(getbusinessInfoData?.data?.place_Name_Map)
      setServiceDays(getbusinessInfoData?.data?.servicing_days)
    }

  }, [getbusinessInfoData?.data?.business_email, getbusinessInfoData?.data?.business_logo, getbusinessInfoData?.data?.business_name, getbusinessInfoData?.data?.business_phone, getbusinessInfoData?.data?.institute_email, getbusinessInfoData?.data?.institute_logo, getbusinessInfoData?.data?.institute_name, getbusinessInfoData?.data?.institute_phone, getbusinessInfoData?.data?.place_Name_Map, getbusinessInfoData?.data?.servicing_days, user.user_business_type])
  let BusinessInfo = {
    BussinessName: BussinessName,
    businessLogo: businessLogo
  }

  let ContactInfoPage = {
    BusinessPhone: BusinessPhone,
    BusinessEmail: BusinessEmail,
    contactNumberError: contactNumberError,
    openTime: openTime,
    closeTime: closeTime,
    serviceDays: serviceDays,
    emailError: emailError
  }
  let DataForLocationValitdation = {
    addressDetailsError: addressDetailsError
  }
  const BussienessInfoData = (value0) => {
    setBussinessName(value0)
  }

  const BussienessInfoDatabusinessLogo = (value) => {
    setBusinessLogo(value)
  }


  const DataSendToMainPage = (value1) => {
    setBusinessEmail(value1?.BusinessEmail)
    setEmailError(value1?.BusinessEmailError)
    setBusinessPhone(value1?.businessPhone)
    setCountryCode(value1?.countryCode)
    setServiceDays(value1?.serviceDays)
    setOpenTime(value1?.openTime)
    setCloseTime(value1?.closeTime)
    setCloseTime(value1?.closeTime)
  }

  const locationAndContactDatapost = (value2) => {
    setBusinessAddress(value2?.addressDetails)
    setAddressDetailsError(value2?.addressDetailsError)
    setOptionalAddress(value2?.optionalAddress)
    setGetMapUrl(value2?.getMapUrl)
    setLatitude(value2?.latitude)
    setLongitude(value2?.longitude)
    setShowUserSide(value2?.showUserSide)
    setValue(value2?.value)
  }


  const numberValidation = () => {
    let isValid = true
    if (BusinessPhone && countryCode === "91") {
      if (BusinessPhone.length < 10) {
        isValid = false
        setContactNumberError(true)
      } else {
        isValid = true
        setContactNumberError(false)
      }
    } else {
      isValid = false
    }
    return isValid

  }
  // console.log(value?.label)
  const dataToUpdate = () => {
    if (businessType === "LMS") {
      // console.log("fsd")
      return {
        institute_name: BussinessName,
        institute_email: BusinessEmail,
        institute_address: BusinessAddress,
        optional_address: optionalAddress,
        location_url: getMapUrl,
        institute_phone_country_code: countryCode,
        institute_phone: BusinessPhone,
        servicing_days: serviceDays,
        opening_time: openTime,
        closing_time: closeTime,
        institute_logo: businessLogo,
        latitude: latitude,
        longitude: longitude,
        showUserSideMap: showUserSide,
        place_Name_Map: value?.label
      }
    } else {
      return {
        business_name: BussinessName,
        business_email: BusinessEmail,
        business_address: BusinessAddress,
        optional_address: optionalAddress,
        location_url: getMapUrl,
        business_phone_country_code: countryCode,
        business_phone: BusinessPhone,
        servicing_days: serviceDays,
        opening_time: openTime,
        closing_time: closeTime,
        business_logo: businessLogo,
        latitude: latitude,
        showUserSideMap: showUserSide,
        longitude: longitude,
        place_Name_Map: value?.label

      }
    }
  }

  const handlesubmit = (e) => {
    e.preventDefault();
    let numberValid = numberValidation()
    setContactNumberError(!numberValid)
    if (ValidationUtils.isNotEmpty(BussinessName) &&
      ValidationUtils.isNotEmpty(BusinessEmail) &&
      // ValidationUtils.isNotEmpty(BusinessAddress) &&
      numberValid
    ) {
      dispatch(patchInstituteInfo(businessId, dataToUpdate(), user.user_business_type)
      );
    } else {
      setEmailError(true)
      setAddressDetailsError(true)
    }
  };

  return (
    <>
      <React.Fragment>
        <div className='businessSetting-container'>
          <Breadcrumb>
            <BreadcrumbItem to="/settings" title=" Settings" />
            <BreadcrumbItem to="/businesssetting" title="Business Settings" />
          </Breadcrumb>
          <div className='businessSetting-wrapper'>
            <div className='businessSettign-topDiv'>
              <div className='heading-div'>
                <CircleButton position={'left'} path={'/settings'} />
                <div className=''>
                  <p className='text-md business-setting-p base 600'>Business Settings</p>
                  <p className='text-2xs w-400 base'>Manage your business settings here.</p>
                </div>
                <div className='text-right heading-btn'>
                  <button className='button btn-sm button-primary text-right' onClick={handlesubmit}> Save</button>
                </div>

              </div>
            </div>
            <hr className='mt-20' />
            <div className='businessSetting-lowerDiv'>
              <BussienessInfo BusinessInfo={BusinessInfo} BussienessInfoData={BussienessInfoData} BussienessInfoDatabusinessLogo={BussienessInfoDatabusinessLogo} />
              <div className='businessSetting-locationSection'>
                <LocationAndContact ContactInfoPage={ContactInfoPage} DataSendToMainPage={DataSendToMainPage} locationAndContactDatapost={locationAndContactDatapost} contactNumberError={contactNumberError} DataForLocationValitdation={DataForLocationValitdation} />
              </div>
            </div>
            <div className='bussinessSetting-contactInfo'>
            </div>
          </div>
        </div>


      </React.Fragment>

    </>

  )
}
export default BusinessSetting