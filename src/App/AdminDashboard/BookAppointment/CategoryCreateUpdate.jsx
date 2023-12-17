import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../Common/Breadcrumb/BreadcrumbItem";
import FormError from "../../../Common/Form/FormError";
import FormInput from "../../../Common/Form/FormInput";
import FormTextArea from "../../../Common/Form/FormTextArea"
import InstituteTheme from "../../../Common/Theme/InstituteTheme";
import './bookAppointment.style.scss'
import {
  editServiceDetails,
  getAllMainCategoryList, getSingleServiceDetail, postResetMAinCategoryDetail, postResetServiceDetail,
  postServiceDetail, resetEditService, resetGetSingleService
} from "../../../store/actions/bookAppointment";
import ValidationFile from "../../../Classes/ValidationFile";
import ValidationUtils from "../../../Classes/ValidationUtils";
import ToggleIcon from "./ToggleIcon";
import InputDatePicker from "../../../Common/Form/InputDatePicker";
import MinutesSelect from "../../../Common/Form/MinutesSelect";
import moment from "moment";
import ImageCropper from "../../../Common/Cropper";
import AddCategoryPopup from "./AddCategoryPopup";
import BookingForm from "./BookingForm";
// import { useDetectOutsideClick } from "../../../Common/DetectOutsideClick/useDetectOutsideClick";
// import SwitchButton from "../../../Common/Button/SwitchButton";
import SingleSelectDropdown from "../../../Common/Form/SingleSelectDropdown";
import TextEditor from "../../../Common/Form/TextEditor";
import ServiceSlug from "../BookingServices/Service/ServiceSlug";
const CategoryCreateUpdate = () => {
  const showAddCategoryRef = useRef();
  const { id, state } = useParams();
  const dispatch = useDispatch();
  const history = useNavigate()
  const [serviceTitle, setServiceTitle] = useState("")
  const [serviceDescription, setServiceDescription] = useState("")
  const [servicetitleError, setServiceTitleError] = useState("")
  const [imageBanner, setImageBanner] = useState("");
  const [sessionMode, setSessionMode] = useState("Offline")
  const [estimatedMins, setEstimatedMins] = useState("")
  const [price, setPrice] = useState("")
  const [noOfslots, setNoOfSlots] = useState("")
  const [estimatedMinsError, setEstimatedMinsError] = useState("")
  const [showStartTimeError, setShowStartTimeError] = useState(false);
  const [showEndsTimeError, setShowEndsTimeError] = useState(false);
  const [priceError, setPriceError] = useState("")
  const [serviceCategory, setServiceCategory] = useState("");
  const [newCategory, setNewCategory] = useState("")
  const [newCategoryError, setNewCategoryError] = useState("")
  const [isFilled, setIsFilled] = useState(false);
  const [showOption, hideOption] = useState(false);
  const [showList, setShowList] = useState(false);
  const [dropList, setDropList] = useState(false);
  const [inputBox, setInputBox] = useState(false);
  const [value, setValue] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dissableChecked, setIsChecked] = useState(false);
  const [serviceToggle, setServiceToggle] = useState(false);
  const [serviceVissible, setServiceVissible] = useState(true);
  const symbolsArray = ["e", "E", "+", "-", "."]

  const [firstLabel, setFirstLabel] = useState()
  const [secondLabel, setSecondLabel] = useState()
  const [thirdLabel, setThirdLabel] = useState()

  const [firstPlaceholder, setFirstPlaceholder] = useState("")
  const [secondPlaceholder, setSecondPlaceholder] = useState("")
  const [thirdPlaceholder, setThirdPlaceholder] = useState("")

  const [fieldOne, setFieldOne] = useState(false)
  const [fieldTwo, setFieldTwo] = useState(false)
  const [fieldThree, setFieldThree] = useState(false)

  const [fieldValidationOne, setFieldValidationOne] = useState(false)
  const [fieldValidationTwo, setFieldValidationTwo] = useState(false)
  const [fieldValidationThree, setFieldValidationThree] = useState(false)
  const [allowClientsOnline, setallowClientsOnline] = useState(true);
  const ref = useRef()

  const [seoSetting, setSeoSetting] = useState("");
  const [metaDescription, setmetaDescription] = useState("")
  const [urlSlug, seturlSlug] = useState("");
  const [metakeywords, setMetaKeywords] = useState("");

  // console.log(urlSlug)

  // const [startTime, setStartTime] = useState("")
  // const [endTime, setendTime] = useState("")
  const uploadImageRef = useRef();
  const childRef = useRef(null)
  const [customeFields, setCustomFields] = useState({})
  const [showform, setShowForm] = useState(false);
  const s3Url = "https://edneed-images-uat.s3.amazonaws.com/";

  const { users, institute, owner, businesstype, buttonCreateSucces, categoryList, getSingleServiceLoading,
    getSingleServiceSuccess, getSingleServiceData, buttonEditSuccess, postMainCategoryListSuccess, serviceCreateLoading, serviceEditLoading
  } = useSelector((state) => {
    return {
      users: state.user,
      institute: state.user.user_institute,
      owner: state.user._id,
      businesstype: state.user.user_business_type,
      postMainCategoryListSuccess: state.bookAppointment.postMainCategory.success,
      serviceCreateLoading: state.bookAppointment.postService.loading,
      buttonCreateSucces: state.bookAppointment.postService.success,
      serviceEditLoading: state.bookAppointment.editService.loading,
      buttonEditSuccess: state.bookAppointment.editService.success,
      categoryListSuccess: state.bookAppointment.getMainCategoryList.success,
      categoryList: state.bookAppointment.getMainCategoryList.data,
      getSingleServiceLoading: state.bookAppointment.getSingleService.loading,
      getSingleServiceSuccess: state.bookAppointment.getSingleService.success,
      getSingleServiceData: state.bookAppointment.getSingleService.data
    };
  });

  useEffect(() => {
    dispatch(getAllMainCategoryList(institute, owner, businesstype))
  }, []);

  useEffect(() => {
    return () => {

      dispatch(resetEditService())
      // dispatch(postResetMAinCategoryDetail())
    };
  }, [dispatch])

  useEffect(() => {
    if (window.location.pathname.includes('categoryId') && id) {
      setServiceCategory(id)
    }
    if (id && window.location.pathname.includes('serviceId')) {
      let data = {
        id: id,
        userId: users._id
      }
      dispatch(getSingleServiceDetail(businesstype, data))
    }

  }, [dispatch])
  const [routeToCat, setrouteToCat] = useState(false)

  useEffect(() => {
    if (buttonCreateSucces === true && window.location.pathname.includes('category-create')) {
      history("/bookingservices/booking-service")
    }
    if (buttonEditSuccess === true) {
      history("/bookingservices/booking-service")
    }
    if (buttonCreateSucces === true && window.location.pathname.includes('categoryId') && id) {
      history("/bookingservices/booking-create-category")
    }
  }, [buttonCreateSucces, buttonEditSuccess, dispatch])
  useEffect(() => {
    return () => {
      dispatch(postResetServiceDetail())
    }
  }, [dispatch])

  useEffect(() => {
    document.addEventListener('mousedown', clickOutside);
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    }
  }, [showList, dropList, showOption])

  useEffect(() => {
    if (postMainCategoryListSuccess) {
      setServiceCategory(categoryList[0]._id);

    }
  }, [categoryList, postMainCategoryListSuccess])

  useEffect(() => {
    if (getSingleServiceData && getSingleServiceData.data && getSingleServiceSuccess && !getSingleServiceLoading) {
      fillUpdateData();
      fillServiceDetails(getSingleServiceData.workingDays)
    }
  }, [getSingleServiceData, getSingleServiceSuccess, getSingleServiceLoading])

  useEffect(() => {
    return () => {
      dispatch(resetGetSingleService())
    }
  }, [dispatch])

  useEffect(() => {
    return () => {
      dispatch(postResetMAinCategoryDetail())
    }
  }, [dispatch])

  const handleInput = (e) => {
    let inputName = e.target.name
    let inputValue = e.target.value
    switch (inputName) {
      case "title":
        setServiceTitle(ValidationFile.spaceNotAccept(inputValue));
        setServiceTitleError(ValidationFile.isEmpty(ValidationFile.spaceNotAccept(inputValue)));
        break;
      case "description":
        setServiceDescription(ValidationFile.spaceNotAccept(inputValue));
        break;
      case "minutes":
        setEstimatedMins(ValidationFile.spaceNotAccept(inputValue));
        setEstimatedMinsError(ValidationFile.isEmpty(ValidationFile.spaceNotAccept(inputValue)));
        break;
      case "pricePerSession":
        setPrice(ValidationFile.spaceNotAccept(inputValue));
        setPriceError(ValidationFile.isEmpty(ValidationFile.spaceNotAccept(inputValue)));
        break;
      case "slotPerSession":
        setNoOfSlots(ValidationFile.spaceNotAccept(inputValue));
        // setPriceError(ValidationFile.isEmpty(ValidationFile.spaceNotAccept(inputValue)));
        break;
      case "name":
        setSessionMode(inputValue);
        break;
      case "mainCategory":
        setServiceCategory(ValidationFile.spaceNotAccept(inputValue)());
        // setNewCategoryError(ValidationFile.isEmpty(ValidationFile.spaceNotAccept(inputValue)));
        break;
      default:
        return false;
    };
  }

  //FUNCTION TO ADD DURATION 

  const handleMin = (e) => {
    let inputValue = e.target.value === "not selected" ? 0 : e.target.value;
    setEstimatedMins(inputValue * 1);
    isStartTimeValid();
    isEndsTimeValid();
  }

  const handleToggle = (e) => {
    // e.preventDefault();
    let inputChecked = e.target.checked
    if (inputChecked) {
      setServiceToggle(true);
    }
    else {
      setServiceToggle(false);
    }
  }

  const handleVissible = (e) => {
    let inputVissible = e.target.checked
    if (inputVissible) {
      setServiceVissible(true);
    }
    else {
      setServiceVissible(false);
    }

  }

  //ARRAY OF WEAK
  const [serviceDetails, setServiceDetails] = useState([
    {
      institute: users.user_institute,
      business: users.user_institute,
      owner: users._id,
      serviceDay: "Sunday",
      checked: false,
      shift: [
        {
          realSessionStartTime: "",
          realSessionEndTime: "",
          sessionStartTime: "",
          sessionEndTime: "",
          isStartsTimeValid: false,
          isEndTimeValid: false,
          isCompareEndTimeValid: false,
          shiftError: false,
          bufferTime: 0,
          duration: estimatedMins
        }
      ]
    },
    {
      institute: users.user_institute,
      business: users.user_institute,
      owner: users._id,
      serviceDay: "Monday",
      checked: false,
      shift: [
        {
          realSessionStartTime: "",
          realSessionEndTime: "",
          sessionStartTime: "",
          sessionEndTime: "",
          isStartsTimeValid: false,
          isEndTimeValid: false,
          isCompareEndTimeValid: false,
          bufferTime: 0,
          duration: estimatedMins
        }
      ]
    },
    {
      institute: users.user_institute,
      business: users.user_institute,
      owner: users._id,
      serviceDay: "Tuesday",
      checked: false,
      shift: [
        {
          realSessionStartTime: "",
          realSessionEndTime: "",
          sessionStartTime: "",
          sessionEndTime: "",
          isStartsTimeValid: false,
          isEndTimeValid: false,
          isCompareEndTimeValid: false,
          bufferTime: 0,
          duration: estimatedMins
        }
      ]
    },
    {
      institute: users.user_institute,
      business: users.user_institute,
      owner: users._id,
      serviceDay: "Wednesday",
      checked: false,
      shift: [
        {
          realSessionStartTime: "",
          realSessionEndTime: "",
          sessionStartTime: "",
          sessionEndTime: "",
          isStartsTimeValid: false,
          isEndTimeValid: false,
          isCompareEndTimeValid: false,
          bufferTime: 0,
          duration: estimatedMins
        }
      ]
    },
    {
      institute: users.user_institute,
      business: users.user_institute,
      owner: users._id,
      serviceDay: "Thursday",
      checked: false,
      shift: [
        {
          realSessionStartTime: "",
          realSessionEndTime: "",
          sessionStartTime: "",
          sessionEndTime: "",
          isStartsTimeValid: false,
          isEndTimeValid: false,
          isCompareEndTimeValid: false,
          bufferTime: 0,
          duration: estimatedMins
        }
      ]
    },
    {
      institute: users.user_institute,
      business: users.user_institute,
      owner: users._id,
      serviceDay: "Friday",
      checked: false,
      shift: [
        {
          realSessionStartTime: "",
          realSessionEndTime: "",
          sessionStartTime: "",
          sessionEndTime: "",
          isStartsTimeValid: false,
          isEndTimeValid: false,
          isCompareEndTimeValid: false,
          bufferTime: 0,
          duration: +estimatedMins
        }
      ]
    },
    {
      institute: users.user_institute,
      business: users.user_institute,
      owner: users._id,
      serviceDay: "Saturday",
      checked: false,
      shift: [
        {
          realSessionStartTime: "",
          realSessionEndTime: "",
          sessionStartTime: "",
          sessionEndTime: "",
          isStartsTimeValid: false,
          isEndTimeValid: false,
          isCompareEndTimeValid: false,
          bufferTime: 0,
          duration: estimatedMins
        }
      ]
    }
  ])

  const handleTime = (selectedTime, time, key, shiftkey, name, index) => {
    let array = serviceDetails;
    if (time === "startTime") {
      let realSessionStartTime = selectedTime;
      array[key].shift[shiftkey]['sessionStartTime'] = moment(realSessionStartTime).format("HH:mm A");
      array[key].shift[shiftkey]['duration'] = estimatedMins;
      array[key].shift[shiftkey]['realSessionStartTime'] = realSessionStartTime

      if (shiftkey > 0) {
        array[key].shift[shiftkey]["isStartsTimeValid"] = (ValidationUtils.isNotEmpty(selectedTime?.toString()) && (new Date(realSessionStartTime) > new Date(array[key].shift[shiftkey - 1].realSessionEndTime)))
      } else {
        array[key].shift[shiftkey]['isStartsTimeValid'] = ValidationUtils.isNotEmpty(selectedTime?.toString())
      }
      // isStartTimeValid()
    }
    if (time === "endTime") {
      let realSessionEndTime = selectedTime;
      array[key].shift[shiftkey]['sessionEndTime'] = moment(realSessionEndTime).format("HH:mm A");
      array[key].shift[shiftkey]['duration'] = estimatedMins;
      array[key].shift[shiftkey]['realSessionEndTime'] = realSessionEndTime
      array[key].shift[shiftkey]["isEndTimeValid"] = ValidationUtils.isEmpty(selectedTime?.toString())
      array[key].shift[shiftkey]["isCompareEndTimeValid"] =
        (new Date(moment(array[key].shift[shiftkey]['realSessionStartTime']).add(estimatedMins, 'minutes')) >
          new Date(array[key].shift[shiftkey]['realSessionEndTime']));
      // isEndsTimeValid()
    }
    setServiceDetails([...array])
  }

  //VALIDATION ON START TIME
  const isStartTimeValid = () => {
    let isValid = true;
    let array = serviceDetails;
    for (let key = 0; key < array.length; key++) {
      let shiftArray = array[key].shift
      for (let shiftkey = 0; shiftkey < shiftArray.length; shiftkey++) {
        const element = shiftArray[shiftkey];
        if (array[key].checked === true) {
          if (shiftkey > 0) {
            if (ValidationUtils.isEmpty(element.realSessionStartTime.toString()) ||
              (new Date(element.realSessionStartTime) < new Date(shiftArray[shiftkey - 1].realSessionEndTime))) {
              isValid = false;
              break;
            }
          } else {
            if (ValidationUtils.isEmpty(element.realSessionStartTime.toString())) {
              isValid = false;
            }
          }
        }
        // else {
        //   if (ValidationUtils.isEmpty(element.realSessionStartTime.toString())) {
        //     isValid = false;
        //   }
        // }
      }
      if (isValid) {
        setShowStartTimeError(false);
      } else {
        setShowStartTimeError(true);
      }
    }
    return isValid;
  };


  //VALIDATION ON END TIME
  const isEndsTimeValid = () => {
    let isValid = true;
    let array = serviceDetails;
    for (let key = 0; key < array.length; key++) {
      let shiftArray = array[key].shift;
      for (let shiftkey = 0; shiftkey < shiftArray.length; shiftkey++) {
        const element = shiftArray[shiftkey];
        if (array[key].checked === true) {
          if (
            ValidationUtils.isEmpty(element.realSessionEndTime && element.realSessionEndTime) || new Date(moment(element.realSessionStartTime).add(estimatedMins, 'minutes')) >
            new Date(element.realSessionEndTime && element.realSessionEndTime)
          ) {
            array[key].shift[shiftkey]["isCompareEndTimeValid"] =
              (new Date(moment(array[key].shift[shiftkey]['realSessionStartTime']).add(estimatedMins, 'minutes')) >
                new Date(array[key].shift[shiftkey]['realSessionEndTime']));
            array[key].shift[shiftkey]["isEndTimeValid"] = ValidationUtils.isEmpty(element.realSessionEndTime?.toString())
            setServiceDetails([...array])
            isValid = false;
            break;
          }
          else {
            if (ValidationUtils.isEmpty(element.realSessionEndTime?.toString())) {
              isValid = false;
            }
          }
        }
      }
      if (isValid) {
        setShowEndsTimeError(false);
      } else {
        setShowEndsTimeError(true);
      }
    }
    return isValid;
  };


  const HandleDissableDate = (e) => {
    let inputDissable = e.target.checked
    if (inputDissable) {
      setIsChecked(true)
    }
    else {
      setIsChecked(false);
      setStartDate("")
      setEndDate("")
    }
  }

  const handleClicked = (key) => {
    let data = {
      realSessionStartTime: "",
      realSessionEndTime: "",
      sessionStartTime: "",
      sessionEndTime: "",
      isStartsTimeValid: false,
      isEndTimeValid: true,
      isCompareEndTimeValid: false,
      bufferTime: 0,
      duration: estimatedMins
    }
    let tempData = serviceDetails
    let shiftData = tempData[key].shift
    shiftData.push(data)
    tempData[key]["shift"] = shiftData
    setServiceDetails([...tempData]);
  }

  const deleteShift = (key, shiftkey) => {
    let tempData = serviceDetails
    let filterData = tempData[key].shift.filter((faculty, index) => index !== shiftkey);
    tempData[key]["shift"] = filterData
    setServiceDetails([...tempData]);

  }
  //VALIDATION ON FORM
  const isFormValid = () => {
    if (!ValidationFile.isEmpty(serviceTitle.trim())
      && !ValidationFile.isEmpty(estimatedMins)
      // && !ValidationFile.isEmpty(price)
      // && !ValidationFile.isEmpty(serviceCategory)
    ) {
      return true;
    } else {
      return false;
    }
  }

  //FUNCTION TO PASS DATA ON CHECK
  const handlChecked = (key, state) => {
    let array = serviceDetails
    if (state === "Ischecked") {
      array[key]["checked"] = true
    }
    else if (state === "uncheck") {
      array[key]["checked"] = false
    }
    // // else {
    //   // remove from list
    //   setServiceDetailsInfos(
    //     serviceDetailInfos.filter((service) => service.id !== item.id),
    //   );
    // }
    setServiceDetails([...array])
    // isStartTimeValid()
    // isEndsTimeValid()
  }

  //UPLOAD IMAGE
  const updateImage = (data) => {
    // ref.current.open()
    setImageBanner(data.location);

  };
  const EditImageHandle = () => {
    ref.current.open();
  }
  const CloseHandle = () => {
    // ref.current.open()
    setImageBanner("");

  };
  // console.log(imageBanner, "line583")

  //SELECT CATEGORY
  const hadleCategorySelect = (e) => {
    let inputValue = e.target.value;
    if (inputValue === "addCategory") {
      showAddCategoryPopup()
    } else {
      setServiceCategory(inputValue);
      setNewCategory(ValidationFile.isEmpty(inputValue));
    }
    setDropList(!dropList);
  }

  //FORM INPUT CATEGORY
  const handleCategoryInput = (e) => {
    let inputValue = e.target.value;
    setNewCategory(inputValue)
  }

  const clickOutside = (e) => {
    if (childRef.current !== null && childRef.current.contains(e.target)) {
      return;
    }
    setDropList(false)
    setShowList(false)
    // hideOption(false)
  }
  //TO GET PRE FILED DATA
  const fillUpdateData = () => {

    setServiceTitle(getSingleServiceData.data.title);
    setServiceDescription(getSingleServiceData.data.description);
    setImageBanner(getSingleServiceData.data.image);
    setEstimatedMins(getSingleServiceData.data.duration);
    setPrice(getSingleServiceData.data.sessionPrice);
    setNoOfSlots(getSingleServiceData.data.slots);
    // setServiceDetails(getSingleServiceData.data.workingDays)
    setServiceCategory(getSingleServiceData.data.main_category && !getSingleServiceData?.data?.unCategorized ? getSingleServiceData.data.main_category : ""  )
    setStartDate(
      getSingleServiceData.data.serviceDisablefrom ?
        moment(new Date(getSingleServiceData.data.serviceDisablefrom)).add(5, 'hours').add(30, 'minutes').format() : "")
    setEndDate(
      getSingleServiceData.data.serviceDisableto ?
        moment(new Date(getSingleServiceData.data.serviceDisableto)).add(5, 'hours').add(30, 'minutes').format() : "")
    if (getSingleServiceData.data.serviceDisableto && getSingleServiceData.data.serviceDisablefrom) {
      setIsChecked(true)
    }
    setServiceToggle(getSingleServiceData.data.visibleOneSite)
    setServiceVissible(getSingleServiceData.data.markAsFeatured)
    setFirstLabel(getSingleServiceData?.data?.firstLabel)
    setSecondLabel(getSingleServiceData?.data?.secondLabel)
    setThirdLabel(getSingleServiceData?.data?.thirdLabel)

    setFirstPlaceholder(getSingleServiceData?.data?.firstPlaceholder)
    setSecondPlaceholder(getSingleServiceData?.data?.secondPlaceholder)
    setThirdPlaceholder(getSingleServiceData?.data?.thirdPlaceholder)

    setFieldOne(getSingleServiceData?.data?.fieldOne)
    setFieldTwo(getSingleServiceData?.data?.fieldTwo)
    setFieldThree(getSingleServiceData?.data?.fieldThree)

    setFieldValidationOne(getSingleServiceData?.data?.fieldValidationOne)
    setFieldValidationTwo(getSingleServiceData?.data?.fieldValidationTwo)
    setFieldValidationThree(getSingleServiceData?.data?.fieldValidationThree)
    setallowClientsOnline(getSingleServiceData?.data?.allowClientsOnline)
    setMetaKeywords(getSingleServiceData?.data?.metaKeywords)
    seturlSlug(getSingleServiceData?.data?.urlSlug)
    setmetaDescription(getSingleServiceData?.data?.metaDescription)
  }

  const fillServiceDetails = (days) => {
    let tempData = serviceDetails
    let serviceDays = []
    for (let j = 0; j < tempData.length; j++) {
      let pushed = false
      for (let i = 0; i < days.length; i++) {
        if (days[i].serviceDay === tempData[j].serviceDay) {
          serviceDays.push(days[i])
          pushed = true
        }
      }
      if (pushed == false) {
        serviceDays.push(tempData[j])
      }
    }
    setServiceDetails(serviceDays)
  }
  // console.log(urlSlug)

  //FUNCTION ON UPDATE BUTTON
  const handleUpdate = () => {
    const isValidStartTime = isStartTimeValid();
    const isValidEndsTime = isEndsTimeValid();
    if (id && isValidStartTime && isValidEndsTime) {
      if (isFormValid()) {
        dispatch(editServiceDetails(id, businesstype, serviceDataInfo()))
      }
    }
  }
  const allDataForSeo = (value) => {
    setSeoSetting(value.urlSlug)
    setmetaDescription(value.metaDescription)
    seturlSlug(value.urlSlug)
    setMetaKeywords(value.metakeywords)


  }
  // console.log(urlSlug)
  // console.log(urlSlug)
  // console.log(metakeywords)
  // console.log(metaDescription)

  let allCustomFields = {
    firstLabel: firstLabel,
    secondLabel: secondLabel,
    thirdLabel: thirdLabel,
    firstPlaceholder: firstPlaceholder,
    secondPlaceholder: secondPlaceholder,
    thirdPlaceholder: thirdPlaceholder,
    fieldOne: fieldOne,
    fieldTwo: fieldTwo,
    fieldThree: fieldThree,
    fieldValidationOne: fieldValidationOne,
    fieldValidationTwo: fieldValidationTwo,
    fieldValidationThree: fieldValidationThree,
    allowClientsOnline: allowClientsOnline
  }

  //DATA PASS ON SUBMIT  
  // const serviceDataInfo = () => {
  //   let arr;
  //   if (serviceDetails.length > 0) {
  //     arr = serviceDetails.map(v => {
  //       let obj = { ...v };
  //       if (obj.checked) {
  //         obj.shift[0].duration = +estimatedMins;
  //       }
  //       return obj;
  //     });

  //   }
  //   arr = arr.filter((item) => item.checked === true)
  //   return {
  //     "days": arr,
  //     "service": {
  //       "owner": users._id,
  //       "institute": users.user_institute,
  //       "business": users.user_institute,
  //       "title": serviceTitle,
  //       "description": serviceDescription,
  //       "image": imageBanner,
  //       "duration": estimatedMins,
  //       "sessionPrice": price,
  //       "main_category": serviceCategory,
  //       "slots": noOfslots,
  //       "visibleOneSite": serviceToggle,
  //       "markAsFeatured": serviceVissible,
  //       "serviceDisablefrom": startDate,
  //       "serviceDisableto": endDate,
  //       "firstLabel": firstLabel,
  //       "secondLabel": secondLabel,
  //       "thirdLabel": thirdLabel,
  //       "firstPlaceholder": firstPlaceholder,
  //       "secondPlaceholder": secondPlaceholder,
  //       "thirdPlaceholder": thirdPlaceholder,
  //       "fieldOne": fieldOne,
  //       "fieldTwo": fieldTwo,
  //       "fieldThree": fieldThree,
  //       "fieldValidationOne": fieldValidationOne,
  //       "fieldValidationTwo": fieldValidationTwo,
  //       "fieldValidationThree": fieldValidationThree,
  //       "allowClientsOnline": allowClientsOnline,
  //       "metaTitle": urlSlug,
  //       "metaDescription": metaDescription,
  //       "urlSlug": urlSlug,
  //       "metaKeywords": metakeywords
  //     }
  //   }
  // }
  //DATA PASS ON SUBMIT  
  const serviceDataInfo = () => {
    if (serviceCategory) {
      let arr;
      if (serviceDetails.length > 0) {
        arr = serviceDetails.map(v => {
          let obj = { ...v };
          if (obj.checked) {
            obj.shift[0].duration = +estimatedMins;
          }
          return obj;
        });

      }
      arr = arr.filter((item) => item.checked === true)
      return {
        "days": arr,
        "service": {
          "owner": users._id,
          "institute": users.user_institute,
          "business": users.user_institute,
          "title": serviceTitle,
          "description": serviceDescription,
          "image": imageBanner,
          "duration": estimatedMins,
          "sessionPrice": price,
          "main_category": serviceCategory,
          "slots": noOfslots,
          "visibleOneSite": serviceToggle,
          "markAsFeatured": serviceVissible,
          "serviceDisablefrom": startDate,
          "serviceDisableto": endDate,
          "firstLabel": firstLabel,
          "secondLabel": secondLabel,
          "thirdLabel": thirdLabel,
          "firstPlaceholder": firstPlaceholder,
          "secondPlaceholder": secondPlaceholder,
          "thirdPlaceholder": thirdPlaceholder,
          "fieldOne": fieldOne,
          "fieldTwo": fieldTwo,
          "fieldThree": fieldThree,
          "fieldValidationOne": fieldValidationOne,
          "fieldValidationTwo": fieldValidationTwo,
          "fieldValidationThree": fieldValidationThree,
          "allowClientsOnline": allowClientsOnline,
          "metaTitle": urlSlug,
          "metaDescription": metaDescription,
          "urlSlug": urlSlug,
          "metaKeywords": metakeywords,
          "unCategorized": false
        }
      }
    } else {
      let arr;
      if (serviceDetails.length > 0) {
        arr = serviceDetails.map(v => {
          let obj = { ...v };
          if (obj.checked) {
            obj.shift[0].duration = +estimatedMins;
          }
          return obj;
        });

      }
      arr = arr.filter((item) => item.checked === true)
      return {
        "days": arr,
        "service": {
          "owner": users._id,
          "institute": users.user_institute,
          "business": users.user_institute,
          "title": serviceTitle,
          "description": serviceDescription,
          "image": imageBanner,
          "duration": estimatedMins,
          "sessionPrice": price,

          "slots": noOfslots,
          "visibleOneSite": serviceToggle,
          "markAsFeatured": serviceVissible,
          "serviceDisablefrom": startDate,
          "serviceDisableto": endDate,
          "firstLabel": firstLabel,
          "secondLabel": secondLabel,
          "thirdLabel": thirdLabel,
          "firstPlaceholder": firstPlaceholder,
          "secondPlaceholder": secondPlaceholder,
          "thirdPlaceholder": thirdPlaceholder,
          "fieldOne": fieldOne,
          "fieldTwo": fieldTwo,
          "fieldThree": fieldThree,
          "fieldValidationOne": fieldValidationOne,
          "fieldValidationTwo": fieldValidationTwo,
          "fieldValidationThree": fieldValidationThree,
          "allowClientsOnline": allowClientsOnline,
          "metaTitle": urlSlug,
          "metaDescription": metaDescription,
          "urlSlug": urlSlug,
          "metaKeywords": metakeywords,
          "unCategorized": true
        }
      }
    }

  }
  const [selectAnyServiceDay, setSelectAnyServiceDay] = useState(false)
  const checkAnyDayselect = () => {
    let isValid = true
    if (serviceDetails.length < 0) {
      isValid = false;
      setSelectAnyServiceDay(true)
    } else {
      isValid = true
      setSelectAnyServiceDay(false)
    }
    return isValid
    // if (isValid) {
    //   setSelectAnyServiceDay(false)
    // } else {
    //   setSelectAnyServiceDay(true)
    // }

  }
  //FUNCTION ON SUBMIT BUTTON
  const handleSubmit = () => {
    const isValidStartTime = isStartTimeValid();
    const isValidEndsTime = isEndsTimeValid();
    const checkAnyService = checkAnyDayselect()
    const isFormVali = isFormValid()
    if (checkAnyService) {
      setSelectAnyServiceDay(true)
    }
    // console.log(serviceDetails.length, "serviceDetails.length")
    // console.log(checkAnyService, "checkAnyService")
    // console.log(isValidStartTime, "isValidStartTime")
    // console.log(isValidEndsTime, "isValidEndsTime")
    // console.log(isFormVali, "isFormVali")
    if (isFormValid() && isValidStartTime && isValidEndsTime
      // &&  checkAnyService
    ) {
      dispatch(postServiceDetail(businesstype, serviceDataInfo(), users.user_dashboard_stepper, institute))
    }
    else {
      setServiceTitleError(true);
      setEstimatedMinsError(true);
      // setPriceError(true);
      // setNewCategoryError(true);
    }
  }

  const handleCancel = () => {
    history("/bookingservices/booking-service")
  }

  // popup handles
  const showAddCategoryPopup = () => {
    showAddCategoryRef.current.open()
  }
  const onCloseAddcategory = () => {
    showAddCategoryRef.current.close()
  }
  // const bookingformHandle = () => {
  //   setShowForm(!showform);
  //   // allCustomFields
  // }
  const bookingformHandleClose = () => {
    showform(true)
    setShowForm(false)
  }

  const handleCustomFormSave = (value) => {
    setFirstLabel(value.firstLabel)
    setSecondLabel(value.secondLabel)
    setThirdLabel(value.thirdLabel)

    setFirstPlaceholder(value.firstPlaceholder)
    setSecondPlaceholder(value.secondPlaceholder)
    setThirdPlaceholder(value.thirdPlaceholder)

    setFieldOne(value.fieldOne)
    setFieldTwo(value.fieldTwo)
    setFieldThree(value.fieldThree)

    setFieldValidationOne(value.fieldValidationOne)
    setFieldValidationTwo(value.fieldValidationTwo)
    setFieldValidationThree(value.fieldValidationThree)
    setallowClientsOnline(value.allowClientsOnline)
    setShowForm(false)
  }

  const updateChecked = (data) => {
    setallowClientsOnline(data)
  }
  const handleOnChangeContent = (value) => {
    setServiceDescription(value);
  };

  return (
    <>
      <div className="">
        <Breadcrumb>
          <BreadcrumbItem to="/bookingservices/booking-service" title="Booking Services" />
          <BreadcrumbItem to="/bookingservices/category-create" title="Service Information" />
          {/* {window.location.pathname.includes("category-create") && <BreadcrumbItem to="/bookingservices/category-create" title="Create New Service" />}
          {window.location.pathname.includes("categoryId") && <BreadcrumbItem to={`/bookingservices/category-update/categoryId/${id}`}
            title="Create New Category" />}
          {window.location.pathname.includes("serviceId") && <BreadcrumbItem to={`/bookingservices/category-update/serviceId/${id}`}
            title="Update Services" />} */}

        </Breadcrumb>
        <div className="bookAppointment_wrap">
          <div className="BookAppointmentGrid">
            <div className="column">
              <h1 className="">Service Information</h1>
            </div>
            <div className="column">
              <div className="column">
                <div className="button__group">
                  <button className="button btn-o-primary primary btn-sm bg-lightblue"
                    onClick={() => handleCancel()}
                  >Cancel</button>
                  {id && window.location.pathname.includes('serviceId') ?
                    (
                      serviceEditLoading ? (
                        <button className="button button-primary btn-sm">Updating...</button>
                      ) : (
                        <button className="button button-primary btn-sm"
                          onClick={() => handleUpdate()}>Update</button>
                      )
                    )
                    : (serviceCreateLoading ? (
                      <button className="button button-primary btn-sm">Saving...</button>) :
                      (<button className="button button-primary btn-sm"
                        onClick={() => handleSubmit()}>Save</button>)
                    )
                  }
                </div>
              </div>

            </div>
            <div className="BookAppointmentDetailGrid">
              <div className="bookform-wrap">
                <div className="book__form ">
                  <h2 className="posi__border">General Info</h2>
                  <div className="service__grid">
                    <div>
                      <div className="formFieldwrap pb-10">
                        <FormInput
                          label="Service Title"
                          labelPosition="top"
                          name="title"
                          placeholder="eg., Basketball Coaching"
                          value={serviceTitle}
                          onChange={(e) => handleInput(e)}
                          autoFocus
                        />
                        <FormError
                          show={servicetitleError && serviceTitle === ""}
                          error="Title is required."
                        />
                        <FormError
                          show={serviceDetails.length === 0 && selectAnyServiceDay}
                          error="selectAnyServiceDay selectAnyServiceDay required."
                        />
                      </div>
                      <div className="formFieldwrap pb-0">
                        {/* <FormTextArea
                          labelPosition="top"
                          label={"Service Description (Optional)"}
                          name="description"
                          placeholder="eg. A list of what you provide in your service"
                          onChange={(e) => handleInput(e)}
                          value={serviceDescription}
                        /> */}
                        <label>Service Description (Optional)</label>
                        <TextEditor
                          preFilledData={serviceDescription}
                          currentResponse={(value) => handleOnChangeContent(value)}
                        />
                      </div>
                    </div>
                    <div className="service__grid_image_drag">
                      <label htmlFor="#" className="mb-5">Image (Optional)</label>
                      <div className={`dragwrap ${imageBanner ? "" : "uploadimg"}`}>
                        {/* <span className="set__icon"><i className='set__icon icon-plus'>&#43;</i></span> */}

                        <div className="ActionUploadBanner">
                          <ImageCropper
                            minWidth={users.user_business_type === "Services" ? 250 : 225}
                            maxWidth={users.user_business_type === "Services" ? 500 : 225}
                            minHeight={users.user_business_type === "Services" && 166}
                            maxHeight={users.user_business_type === "Services" && 332}
                            defaultRatio={users.user_business_type === "Services" ? 3 / 2 : 1 / 1}
                            onUploaded={(data) => updateImage(data)}
                            ref={ref}
                            // BtnName={imageBanner ? "Update Banner" : "Upload Banner"}
                            BtnPropClass="dragbutton"
                          />
                          <span className="set__icon"><i className='icon-plus'>&#43;</i></span>

                        </div>
                        {imageBanner ? (
                          <img className="banner-image set__icon" src={imageBanner} alt="" />
                        ) : null}

                        {
                          imageBanner ? (
                            <div className="overlay">
                              <div className="button-group">
                                <button className="icon-wrap" onClick={() => EditImageHandle()}>
                                  <i className="edit-icon"></i>
                                </button>
                                <button className="icon-wrap" onClick={() => CloseHandle()} >
                                  <i className="close-icon"></i>
                                </button>
                              </div>
                            </div>
                          ) : ""
                        }


                      </div>
                    </div>
                  </div>
                </div>
                <div className="book__form ">
                  <h2 className="posi__border">Service details</h2>
                  <div className="servicedetail__grid">
                    <div className="col">
                      <label htmlFor="#">Session Duration</label>
                      <MinutesSelect
                        start={5}
                        end={60}
                        selected={estimatedMins}
                        defaultSelect={"Select Session"}
                        name={"minutes"}
                        onEvent={handleMin}
                      />
                      <FormError
                        show={estimatedMinsError && estimatedMins === ""}
                        error="Duration is required."
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="#">Price Per Session</label>
                      <div className="section-wrap">
                        <FormInput
                          placeholder="Enter service amount"
                          lable={"Price per session"}
                          min="0"
                          onChange={(e) => handleInput(e)}
                          onKeyDown={(e) =>
                            symbolsArray.includes(e.key) && e.preventDefault()
                          }
                          onWheel={(e) => e.target.blur()}
                          name={"pricePerSession"}
                          value={price}
                          type="number"
                        />
                        <i className="rupee-icon"></i>
                      </div>
                      {/* <FormError
                        show={priceError && price === ""}
                        error="Please enter digits only."
                      /> */}
                    </div>
                    {/* <div className="col">
                      <label htmlFor="#">Mode of Session </label>
                      <FormInput
                        name="session"
                        value={sessionMode}
                      />
                    </div> */}
                    <div className="col">
                      <label htmlFor="#">No. of bookings per slot </label>
                      <div className="formFieldwrap pb-0">
                        <FormInput
                          placeholder="Enter no. of slots"
                          lable={"slots"}
                          onChange={(e) => handleInput(e)}
                          min="0"
                          onKeyDown={(e) =>
                            symbolsArray.includes(e.key) && e.preventDefault()
                          }
                          onWheel={(e) => e.target.blur()}
                          name={"slotPerSession"}
                          value={noOfslots}
                          type="number"
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div className="posi__border pb-20">
                  <div className="notify">
                    <p>Clients has to pay the entire amount online for booking the appointment.</p>
                    <button className="button button-primary white button-xs">Change</button>
                  </div>
                </div> */}
                  <div className="sencond_sec">
                    {/* <h4>Video Conferencing</h4>
                    <div className="videogrid">
                      <p>Add video conferencing to conduct this service online.</p>
                      <button className="button btn-o-primary btn-xs" ><i className="video_icon mr-5"></i> Add</button>
                    </div> */}

                    <ul>
                      <li className="DateWrapper">
                        <div className="column">
                          <label className="day disable" >
                            <input type="checkbox" className=""
                              // defaultChecked={false}
                              checked={dissableChecked}
                              // checked="dissableDate"
                              onClick={(e) => HandleDissableDate(e)}

                            />Disable services from
                          </label>
                        </div>
                        <div className="column">
                          <div className="DateGrid" aria-disabled={dissableChecked === false ? true : false}>
                            <div className="datePickerWrap">
                              <InputDatePicker
                                name="startDate"
                                disabled={dissableChecked === false ? true : false}
                                value={startDate}
                                onSelect={(selectedDate) => setStartDate(selectedDate, "startDate")}
                              />
                            </div>
                            <span className="font-text">To</span>
                            <div className="datePickerWrap">
                              <InputDatePicker
                                name="Custom_Date"
                                value={endDate}
                                disabled={dissableChecked === false ? true : false}
                                onSelect={(selectedDate) => setEndDate(selectedDate, "endDate")}
                                minDate={startDate}
                              />
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="book__form service__details ">
                  <div className="service__grid">
                    <h2 className="posi__border">Service Acceptance Hours</h2>
                    <p className="mb-20">Choose what time you start accepting your bookings for this service</p>
                  </div>

                  <ul className="">
                    <li className="serviceAcceptance__grid justify-between">
                      <span>Day</span>
                      <span>Working Hours</span>
                      <span>Location</span>
                    </li>
                  </ul>
                  {
                    serviceDetails.map((item, key) => {
                      return (
                        <>
                          <ul>
                            <li className="serviceAcceptance__grid">
                              <div className="column1">
                                <label className="day" htmlFor={item.serviceDay}>
                                  <input type="checkbox" id={item.serviceDay} className="" name={item.serviceDay}
                                    onClick={item.checked ? () => handlChecked(key, "uncheck") : () => handlChecked(key, "Ischecked")}
                                    checked={item.checked}
                                  />
                                  {item.serviceDay}
                                </label>
                              </div>
                              <div className="column2">
                                <div className="timegrid">
                                  {item.shift.map((shiftItem, shiftkey) => {
                                    return (
                                      <React.Fragment>
                                        <div className="custom-time">
                                          <div>
                                            <InputDatePicker
                                              className="min-card"
                                              onSelect={(selectedTime) => handleTime(selectedTime, "startTime", key, shiftkey)
                                              }
                                              showTimeSelect
                                              showTimeSelectOnly
                                              value={shiftItem.realSessionStartTime}
                                              name="startTiming"
                                              timeIntervals={5}
                                              dateFormat="h:mm aa"
                                              type="time"
                                              placeholder="Start Timing"
                                              onKeyDown={(e) => e.preventDefault()}
                                            />
                                            {showStartTimeError && (
                                              <React.Fragment>
                                                <FormError
                                                  show={
                                                    showStartTimeError && item.checked === true && !shiftItem.sessionStartTime
                                                    && !shiftItem.isStartsTimeValid
                                                  }
                                                  error={"Check Timing"}
                                                />
                                                <FormError
                                                  show={
                                                    shiftItem.sessionStartTime !== "" &&
                                                    showStartTimeError && item.checked === true
                                                    && !shiftItem.isStartsTimeValid
                                                  }
                                                  error={"Check Timing"}
                                                />
                                              </React.Fragment>
                                            )}
                                          </div>

                                          <span className="font-text mt-10">To</span>

                                          <div>
                                            <InputDatePicker
                                              className="min-card"
                                              onSelect={(selectedTime) => handleTime(selectedTime, "endTime", key, shiftkey)
                                              }
                                              showTimeSelect
                                              showTimeSelectOnly
                                              name="endTiming"
                                              value={shiftItem.realSessionEndTime}
                                              timeIntervals={5}
                                              dateFormat="h:mm aa"
                                              type="time"
                                              placeholder="End Timing"
                                              onKeyDown={(e) => e.preventDefault()}
                                            />
                                            {showEndsTimeError && (
                                              <React.Fragment>
                                                <FormError
                                                  show={
                                                    showEndsTimeError && item.checked === true && shiftItem.isEndTimeValid
                                                  }
                                                  error={"Check Timing"}
                                                />
                                                <FormError
                                                  show={
                                                    shiftItem.isCompareEndTimeValid && shiftItem.realSessionEndTime !== ""
                                                  }
                                                  error={
                                                    "Check Timing"
                                                  }
                                                />
                                              </React.Fragment>
                                            )}
                                          </div>
                                          <div className={`icon-wrap ${(item.shift.length === shiftkey + 1 || item.shift.length < 1) ? "" : "mt-10"}`}>
                                            {item.shift.length > 1 &&
                                              <div className={`icon`}>
                                                <button onClick={() => deleteShift(key, shiftkey)}>
                                                  <i className="icon-minus"></i>
                                                </button>
                                              </div>
                                            }
                                            {(item.shift.length === shiftkey + 1 || item.shift.length < 1) &&
                                              <div className={`icon ${item.shift.length === 1 ? "mt-10" : ""}`}>
                                                <button onClick={() => handleClicked(key)}>
                                                  <i className="icon-addtime"></i>
                                                </button>
                                              </div>
                                            }
                                          </div>

                                        </div>

                                      </React.Fragment>
                                    )
                                  })
                                  }

                                </div>
                              </div>
                              <div className="column3">
                                <div className="officeaddress">
                                  <p className="text-center text-3xs w-400">{users.user_business_business_address ? users.user_business_business_address : "Office Address"}</p>
                                </div>
                              </div>
                            </li>
                          </ul>

                        </>
                      )
                    }
                    )
                  }
                  <FormError
                    show={serviceDetails.length === 0 && selectAnyServiceDay}
                    error={"Create a service"}
                  />
                </div>
                <BookingForm bookingformHandleClose={() => bookingformHandleClose()} saveData={handleCustomFormSave} allCustomFields={allCustomFields} updateChecked={updateChecked} />
              </div>
              <div className="">
                <div className="book__setting">
                  <h4 className="posi__border">Display Settings</h4>
                  <div className="toggle_icon">
                    <ToggleIcon
                      checked={serviceToggle}
                      onChange={(e) => handleToggle(e)}
                    />
                    <h3 className="">Visible on site</h3>
                  </div>
                  <p className="term">Turn on the toggle button to make this visible or hide on the site.</p>
                </div>
                <div className="book__setting">
                  <h4 className="posi__border">Service Category</h4>
                  <div className="dropdown" ref={childRef}>
                    <div className="drop-wrap">
                      <select
                        id="profession_cat"
                        onChange={hadleCategorySelect}
                        className="dropbtn"
                        name="mainCategory"
                        value={serviceCategory}
                        required
                      >
                        <option>
                          Select Category
                        </option>
                        {categoryList.length
                          ? categoryList.map((item) => {
                            return (
                              <option key={item._id} className="option active" value={item._id} >
                                {item.main_category_name}
                              </option>
                            );
                          })
                          : ""}
                        <option className="option add_menu" value="addCategory">+ Add a new category
                        </option>
                      </select>
                      {/* <label className="animLabel" htmlFor="profession_cat">
                      Select Category
                    </label> */}
                      {/* {
                      inputBox ?

                        (<>
                          <FormInput placeholder="Enter Your Category"
                            value={newCategory}
                            onChange={(e) => handleCategoryInput(e)}
                            className="mb-10 mt-10"
                          />
                          <button onClick={() => addNewCategory()} className="button mb-10 button-primary btn-xs">Add</button>
                        </>
                        ) : null
                    } */}
                      <FormError
                        show={newCategoryError && serviceCategory === ""}
                        error="Main Category is required"
                      ></FormError>
                      <i className={`arrow-icon ${dropList ? "active" : ""}`}></i>
                    </div>
                  </div>
                  <p className="term mt-10">Use categories to organize your services.</p>
                </div>
                <div className="markfeaturecategory mt-20">
                  <label className="small">
                    <input
                      type="checkbox"
                      defaultChecked={true}
                      checked={serviceVissible}
                      onClick={(e) => handleVissible(e)}
                    />
                    Mark as featured
                  </label>
                  <p className="text-3xs w-500 base">If marked as featured then the service wil be shown on the
                    homepage. </p>
                </div>
                <div className="mt-20">
                  <ServiceSlug
                    serviceTitle={serviceTitle}
                    serviceDescription={serviceDescription}
                    allDataForSeo={allDataForSeo}
                    metaDescriptions={metaDescription}
                    urlSlugs={urlSlug}
                    metakeywordss={metakeywords}
                    handleSubmit={handleSubmit}
                    handleUpdate={handleUpdate}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <AddCategoryPopup onCloseAddcategory={onCloseAddcategory} showAddCategoryRef={showAddCategoryRef} title={"Add a category"} />
      </div>
    </>
  )
}
export default CategoryCreateUpdate;