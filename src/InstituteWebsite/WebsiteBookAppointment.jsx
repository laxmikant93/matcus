import React, { forwardRef, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import { DynamicHeaderConsumer } from '../Context/DynamicHeaderContext';
// import WebsiteAppointmentModal from '../InstituteWebsite/WebsiteAppointmentModal';
import ReactDatePicker from 'react-datepicker';
// import Sunrise from "../assets/Icons/icon-Sunrise.svg";
import "./WebsiteBookAppointment.scss";
import { getAllSlot, getBookingList, getSingleServiceDetail, postAppointmentDetail, resetGetAllSlot, resetPostAppointmentDetail } from '../store/actions/bookAppointment';
import PhoneInput from 'react-phone-input-2';
import FormInput from '../Common/Form/FormInput';
import FormError from '../Common/Form/FormError';
import ValidationUtils from '../Classes/ValidationUtils';
import ValidationFile from '../Classes/ValidationFile';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import Storage from '../Classes/Storage';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../Common/Breadcrumb';
import BreadcrumbItem from '../Common/Breadcrumb/BreadcrumbItem';
import Auth from '../Classes/Auth';
import AppLinkUrl from '../Common/AppLink/AppLinkUrl';
import InputDatePicker from '../Common/Form/InputDatePicker';
import ComponentLoader from "../Common/Loader/ComponentLoader"
const WebsiteBookAppointment = () => {

  const { instituteData } = useSelector((state) => state.serviceTemplate.getTemplate.data)
  const { instituteWebsite, users, insID, ownerID, getAllSlotdata, subdomainUsers,
    getSingleServiceDetaildata, businesstype, getSingleServiceDetailSuccess, getSingleAppointmentData, getAllSlotdataSuccess } = useSelector(
      (state) => {
        return {
          users: state.user,
          subdomainUsers: state.subdomainuser,
          insID: state.user.user_institute,
          ownerID: state.user._id,
          institute: state.user.user_institute,
          businesstype: state.user.user_business_type,
          instituteWebsite: state.institutewebsite.data,
          insWebsiteDetails: state.institutewebsite.heading,
          loading: state.bookAppointment.postAppointment.loading,
          success: state.bookAppointment.postAppointment.success,
          getSingleAppointmentData: state.bookAppointment.getSingleAppointment.data,

          getAllSlotdataSuccess: state.bookAppointment.getAllSlot.success,
          getAllSlotdataLoading: state.bookAppointment.getAllSlot.loading,
          getAllSlotdata: state.bookAppointment.getAllSlot.data,

          getSingleServiceDetailSuccess: state.bookAppointment.getSingleService.success,
          getSingleServiceDetailLoading: state.bookAppointment.getSingleService.loading,
          getSingleServiceDetaildata: state.bookAppointment.getSingleService.data,

          // getBookingListSuccess: state.bookAppointment.getBookingList.success,
          // getBookingListLoading: state.bookAppointment.getBookingList.loading,
          // getBookingListData: state.bookAppointment.getBookingList.data,
        }
      }
    );
  const history = useNavigate();

  let dispatch = useDispatch();
  const [timestart, setTimeStart] = useState(false);
  const [timeSlot, setTimeSlot] = useState("");
  const [myTime, setMyTime] = useState(new Date())
  const [endSlotTime, setEndSlotTime] = useState()
  const duration = 40
  const [cssDate, setCssDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState()
  const [bookingDateError, setBookingDateError] = useState(false);
  const [isLoggidin, setIsLoggidin] = useState(false);
  const [toggle, setIsToggle] = useState("Text")
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [countryCode, setCountryCode] = useState("91");
  // const [verifyIdentity, setVerifyIdenttity] = useState("");
  const [firstNameError, setFullNameError] = useState("");
  const [invalidEmailError, setInvalidEmailError] = useState(false);
  const [contactNumberError, setContactNumberError] = useState("");
  const [verifyIdentityError, setVerifyIdenttityError] = useState("");
  const [selectedTimeError, setSelectedTimeError] = useState(false);
  const [bookingSummary, setBookingSummary] = useState("")
  const [Stattic, setStattic] = useState("")
  const [StatticDate, setStatticDate] = useState("2022-08-25T07:14:54.349Z")
  const [bookingDate, setBookingDate] = useState();
  const [dateArray, setDateArray] = useState([]);
  const [allSolts, setAllSolts] = useState([]);
  const [weekDays, setWeekDays] = useState([]);
  const [slotsLeft, setSlotsLeft] = useState();
  const [emailError, setEmailError] = useState(false)

  const [summeryService, setSummeryService] = useState();
  const [summeryDuration, setSummeryDuration] = useState();


  const [firstLabel, setFirstLabel] = useState()
  const [secondLabel, setSecondLabel] = useState()
  const [thirdLabel, setThirdLabel] = useState()

  const [firstPlaceholder, setFirstPlaceholder] = useState()
  const [secondPlaceholder, setSecondPlaceholder] = useState()
  const [thirdPlaceholder, setThirdPlaceholder] = useState()

  const [fieldOne, setFieldOne] = useState("")
  const [fieldTwo, setFieldTwo] = useState("")
  const [fieldThree, setFieldThree] = useState("")

  const [fieldOneData, setFieldOneData] = useState("")
  const [fieldTwoData, setFieldTwoData] = useState("")
  const [fieldThreeData, setFieldThreeData] = useState("")

  const [fieldOneDataError, setFieldOneDataError] = useState(false)
  const [fieldTwoDataError, setFieldTwoDataError] = useState(false)
  const [fieldThreeDataError, setFieldThreeDataError] = useState(false)

  const [fieldValidationOne, setFieldValidationOne] = useState(false)
  const [fieldValidationTwo, setFieldValidationTwo] = useState(false)
  const [fieldValidationThree, setFieldValidationThree] = useState(false)
  const [serviceDisablefrom, setServiceDisablefrom] = useState(false)
  const [serviceDisableto, setServiceDisableto] = useState(false)

  const { _id } = useParams()
  // const { data, loading } = useSelector((state) => state.institutewebsite);

  useEffect(() => {
    if (Auth.isLogin() || Auth.isSubdomainLogin()) {
      setIsLoggidin(true);
      userFillData()
    } else {
      setIsLoggidin(false);
    }
  }, [users, subdomainUsers]);


  useEffect(() => {
    let data = {
      id: _id,
      userId: instituteData.owne
    }
    dispatch(getSingleServiceDetail(instituteData._id, data))
  }, [dispatch, _id, instituteData])

  useEffect(() => {
    if (getSingleServiceDetailSuccess) {

      let StatticDays = {
        "Sunday": 0,
        "Monday": 1,
        "Tuesday": 2,
        "Wednesday": 3,
        "Thursday": 4,
        "Friday": 5,
        "Saturday": 6,
      }
      let Days = StatticDays[getSingleServiceDetaildata?.workingDays && getSingleServiceDetaildata?.workingDays[0]?.serviceDay]
      var curr = new Date();
      var first = curr.getDate() - curr.getDay();
      var last = first + Days + 7;
      var lastday = new Date(curr.setDate(last));
      let latestDate = moment(lastday).format("YYYY/MM/DD")
      // console.log(lastday)
      // console.log(bookingDate)
      dispatch(getAllSlot(_id, instituteData._id, lastday, businesstype))


    }
  }, [getSingleServiceDetailSuccess])


  let StatticDays = {
    "Sunday": 0,
    "Monday": 1,
    "Tuesday": 2,
    "Wednesday": 3,
    "Thursday": 4,
    "Friday": 5,
    "Saturday": 6,
  }
  let Days = StatticDays[getSingleServiceDetaildata?.workingDays && getSingleServiceDetaildata?.workingDays[0]?.serviceDay]
  let curr = new Date();
  let first = curr.getDate() - curr.getDay();
  let last = first + Days + 7;
  let lastday = new Date(curr.setDate(last));
  let latestDate = moment(lastday).format("YYYY/MM/DD")



  useEffect(() => {

    dispatch(getAllSlot(_id, instituteData._id, bookingDate, businesstype))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [insID, bookingDate, _id, businesstype])


  const checkDayFunction = (day) => {
    if (day === "Sunday") {
      return 0;
    } else if (day === "Monday") {
      return 1;
    } else if (day === "Tuesday") {
      return 2;
    } else if (day === "Wednesday") {
      return 3;
    } else if (day === "Thursday") {
      return 4;
    } else if (day === "Friday") {
      return 5;
    } else if (day === "Saturday") {
      return 6;
    }
  }

  useEffect(() => {
    let array = []
    if (getSingleServiceDetaildata && getSingleServiceDetaildata.workingDays?.length > 0) {
      getSingleServiceDetaildata.workingDays.map((item) => {
        if (item.checked === true) {
          array.push(checkDayFunction(item.serviceDay))
        }
      })
      setWeekDays([...array])
    }

    setFirstLabel(getSingleServiceDetaildata?.data?.firstLabel)
    setSecondLabel(getSingleServiceDetaildata?.data?.secondLabel)
    setThirdLabel(getSingleServiceDetaildata?.data?.thirdLabel)

    setFirstPlaceholder(getSingleServiceDetaildata?.data?.firstPlaceholder)
    setSecondPlaceholder(getSingleServiceDetaildata?.data?.secondPlaceholder)
    setThirdPlaceholder(getSingleServiceDetaildata?.data?.thirdPlaceholder)

    setFieldOne(getSingleServiceDetaildata?.data?.fieldOne)
    setFieldTwo(getSingleServiceDetaildata?.data?.fieldTwo)
    setFieldThree(getSingleServiceDetaildata?.data?.fieldThree)

    setFieldValidationOne(getSingleServiceDetaildata?.data?.fieldValidationOne)
    setFieldValidationTwo(getSingleServiceDetaildata?.data?.fieldValidationTwo)
    setFieldValidationThree(getSingleServiceDetaildata?.data?.fieldValidationThree)
    setSummeryService(getSingleServiceDetaildata?.data?.title)
    setSummeryDuration(getSingleServiceDetaildata?.data?.duration)
    // serviceDisablefrom: "2022-09-04T18:30:00.000Z"
    // serviceDisableto: "2022-09-09T18:30:00.000Z
    setServiceDisablefrom(new Date(getSingleServiceDetaildata?.data?.serviceDisablefrom))
    setServiceDisableto(new Date(getSingleServiceDetaildata?.data?.serviceDisableto))
  }, [getSingleServiceDetaildata])


  useEffect(() => {
    if (getAllSlotdata && getAllSlotdata.length > 0) {
      getAllSlotdata.map((item) => {
        setAllSolts(item.slots)
      })
    }
  }, [getAllSlotdata])

  //TO GET PRE FILLED DATA WHEN USER IS LOGGED IN
  const userFillData = () => {
    if (AppLinkUrl.subdomain()) {
      setFullName(subdomainUsers.user_fullname)
      setEmail(subdomainUsers.user_email)
      setContactNumber(subdomainUsers.user_contact)
      setFullNameError(false);
      setContactNumberError(false);
    } else {
      setFullName(users.user_fullname)
      setEmail(users.user_email)
      setContactNumber(users.user_contact)
      setFullNameError(false);
      setContactNumberError(false);
    }

  }

  //VALIDATION ON INPUT VALUE IN FORMS
  const handlePersonalDetails = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    let value = ValidationFile.spaceNotAccept(inputValue);
    switch (inputName) {
      case "Booking_Date":
        setBookingDateError(ValidationUtils.isEmpty());
        break;
      case "Full_Name":
        setFullName(value);
        setFullNameError(ValidationUtils.isEmpty(value));
        break;

      case "Email_Address":
        setEmail(value);
        setInvalidEmailError(ValidationUtils.isEmpty(value));
        break;
      // case "Identity_Number":
      //   setVerifyIdenttity(value);
      //   // setVerifyIdenttityError(ValidationUtils.isEmpty(value));
      //   break;
      case "selectedTime":
        setSelectedTime(value);
        setSelectedTimeError(ValidationUtils.isEmpty(value));
        break;
      case "field_1":
        setFieldOneData(value);
        // setFieldOneDataError(ValidationUtils.isEmpty(value));
        break;
      case "field_2":
        setFieldTwoData(value);
        // setFieldTwoDataError(ValidationUtils.isEmpty(value));
        break;
      case "field_3":
        setFieldThreeData(value);
        // setFieldThreeDataError(ValidationUtils.isEmpty(value));
        break;
      default:
        return false;
    }
  }

  //FUNCTION ON TOGGLE BUTTON 
  const UploadHandler = (toggle) => {
    setIsToggle(toggle)
    if (toggle === "Text") {
      userFillData()
    }
    if (toggle === "someone") {
      setFullName("")
      setEmail("")
      setContactNumber("")
      setBookingDateError(false)
      setSelectedTimeError(false)
    }
  }

  //FUNCTION ON CONTACT NO.
  const handlePhoneInput = (inputValue, countryDetail) => {
    if (inputValue > 9) {
      let dialCode = countryDetail.dialCode;
      let mobile = inputValue.replace(dialCode, "");
      setContactNumber(mobile);
      setCountryCode(dialCode);
      setContactNumberError(ValidationUtils.isEmpty(mobile));
    }
  }
  const numberValidation = () => {
    let isValid = true
    if (contactNumber && countryCode === "91") {
      if (contactNumber.length < 10) {
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

  const validEmail = () => {
    let isValid = true
    if (email) {
      if (!ValidationUtils.isEmail(email)) {
        isValid = false
        setEmailError(true)
      } else {
        isValid = true
      }
    } else {
      isValid = true
    }
    return isValid
  }
  const appointmentDetails = {
    institute: instituteData._id,
    owner: instituteData.owner,
    service: _id,
    user: AppLinkUrl.privateDomain() ? users._id : subdomainUsers._id,
    booking_date: moment(bookingDate).add(331, "minutes"),
    booking_time: selectedTime,
    full_name: fullName,
    // category: category,
    // sub_category: subCategory,
    business: instituteData._id,
    contact: contactNumber,
    email: email,
    countryCode: countryCode,
    // identity: verifyIdentity,
    bookingSlotId: slotsLeft,
    customFields: {
      fieldOneData: fieldOneData,
      fieldTwoData: fieldTwoData,
      fieldThreeData: fieldThreeData
    }

  }


  //VALIDATION ON FORM INPUT
  const isFormValid = () => {
    return !ValidationFile.isEmpty(fullName)
      && !ValidationFile.isEmpty(bookingDate)
      && !ValidationFile.isEmpty(selectedTime)
      && !ValidationFile.isEmpty(email)
      && !ValidationFile.isEmpty(contactNumber)
  }
  const isfieldFormValid = () => {
    if (fieldValidationOne && ValidationUtils.isEmpty(fieldOneData)) {
      return false
    }
    if (fieldValidationTwo && ValidationUtils.isEmpty(fieldTwoData)) {
      return false
    }
    if (fieldValidationThree && ValidationUtils.isEmpty(fieldThreeData)) {
      return false
    }
    return true
  }

  function getDates(startDate, endDate) {
    const dates = []
    let currentDate = startDate
    const addDays = function (days) {
      const date = new Date(this.valueOf())
      date.setDate(date.getDate() + days)
      return date
    }
    while (currentDate <= endDate) {
      dates.push(currentDate)
      currentDate = addDays.call(currentDate, 1)
    }
    return dates
  }

  const handleSubmitButton = () => {
    let numberValid = numberValidation()
    setContactNumberError(!numberValid)
    let emailValid = validEmail()
    setEmailError(!emailValid)
    if (isFormValid() && isfieldFormValid() && numberValid && emailValid) {
      dispatch(postAppointmentDetail(instituteData.type, appointmentDetails));
      history("/appointment-ThankYou")
    } else {
      setFullNameError(true)
      setInvalidEmailError(true)
      setSelectedTimeError(true)
      setBookingDateError(true)
      setFieldOneDataError(fieldValidationOne)
      setFieldTwoDataError(fieldValidationTwo)
      setFieldThreeDataError(fieldValidationThree)
    }
  }

  const handleTiming = (item, key, timing) => {
    setTimeStart(key)
    setTimeSlot(timing)
    setSlotsLeft(item._id)
    if (timing === "morning") {
      setSelectedTime(item.startTime)
    } else if (timing === "evening") {
      setSelectedTime(item.startTime)
    }
  }

  useEffect(() => {
    return () => {
      dispatch(resetPostAppointmentDetail())
      dispatch(resetGetAllSlot())

    }
  }, [dispatch])

  return (
    <React.Fragment>
      <div className="websiteBookAppoinmentWrapper">
        <div className="Breadcrumb">
          <div className="userBreadcrumb-wrap">
            <h4 className="text-sm w-500">Appointment</h4>
            {/* <Breadcrumb>
              <BreadcrumbItem to="/" title="Home" />
              <BreadcrumbItem to="/book-appointment" title="Book an Appointment" />
            </Breadcrumb> */}
          </div>
          <Link to="/select-appointment-service" className="back-btn"><i className="icon-arrow">&#10132;</i> Back</Link>
          {/* <button className="back-btn"><i className="icon-arrow">&#10132;</i> Back</button> */}
        </div>
        {getSingleServiceDetailSuccess &&
          getSingleServiceDetaildata ? (
          <div className="BookAppointmentGrid">
            <div className="Aside">
              <div className="calender">
                {latestDate === "Invalid date" ?
                  "" :
                  <>
                    <ReactDatePicker
                      selectsRange
                      inline
                      selected={new Date(bookingDate ? bookingDate : latestDate)}
                      name='Booking_Date'
                      value={bookingDate}
                      onSelect={setBookingDate}
                      minDate={new Date()}
                      filterDate={(date) => [...weekDays].includes(date.getDay())}
                      excludeDates={getDates(new Date(serviceDisablefrom), new Date(serviceDisableto))}
                    // excludeDateIntervals={[{ start: serviceDisableto, end: serviceDisablefrom }]}
                    />
                    <FormError
                      show={bookingDateError && !bookingDate}
                      error="Booking date is required"
                    />
                  </>

                }

              </div>

              <div className="Bookingcard">
                <h2 className='mb-20'>Booking Summary</h2>
                <h3 className='mb-10'> service: {summeryService}</h3>
                <h3 className='mb-10'>{moment(bookingDate).format("DD-MMM-YYYY")}  {selectedTime}</h3>
                {/* <h4> Booking Time : </h4> */}
                {/* <h5>Dr. Rimjhim Sahay</h5> */}
                <h4>Session Duration : {summeryDuration}</h4>
              </div>

            </div>
            <div className="timetable">
              {getAllSlotdata && getAllSlotdata.length ?
                <div>
                  <h4>
                    {
                      allSolts.morning && allSolts.morning.length > 0 ? (
                        <>
                          <i className="icon-morning"></i>
                          Morning
                        </>
                      ) : ""
                    }
                  </h4>
                  <div className="time">
                    {
                      allSolts && allSolts.morning && allSolts.morning.map((item, key) => (
                        <button onClick={() => handleTiming(item, key, "morning")}
                          name="selectedTime" disabled={item.available === 0}
                        >
                          <div className="col" >
                            <div className={`timecard ${timestart === key && timeSlot === "morning" ? 'active' : ''} `}>
                              <span className='dot'> </span>
                              {item.startTime.split(":")[1] === "0" ? (
                                `${item.startTime.split(":")[0] + ":00"}`
                              ) : (
                                item.startTime
                              )
                              }
                            </div>
                            <div className="slot">{item.available}  Slots</div>
                          </div>
                        </button>

                      ))
                    }
                  </div>
                  <h4>
                    {
                      allSolts.evening && allSolts.evening.length > 0 ? (
                        <>
                          <i className="icon-morning"></i>
                          Evening
                        </>
                      ) : ""}
                  </h4>
                  <div className="time">
                    {
                      allSolts && allSolts.evening && allSolts.evening.map((item, key) => (
                        <button name="selectedTime" onClick={() => handleTiming(item, key, "evening")} disabled={item.available === 0}>
                          <div className="col">
                            <div className={`timecard ${timestart === key && timeSlot === "evening" ? 'active' : ''} `}>
                              <span className='dot'></span>
                              {item.startTime.split(":")[1] === "0" ? (
                                `${item.startTime.split(":")[0] + ":00"}`
                              ) : (
                                item.startTime
                              )
                              }
                              {/* {item.startTime} */}
                            </div>
                            <div className="slot">{item.available} Slots</div>
                          </div>
                        </button>
                      ))
                    }

                  </div>
                  <FormError
                    show={selectedTimeError && !selectedTime}
                    error="Please Provide Date and Time"
                    className='visitorFormError mb-5'
                  />
                </div> :
                <div>
                  <p className='no-slot-p'>No slots are available! Please select another date. </p>
                </div>}


              {
                users.token ? (
                  <div className="input-custom-type inline mb-40">
                    <label className={`small ${toggle === "first" ? "active" : ""
                      } `}>
                      <input
                        type="radio"
                        defaultChecked={true}
                        value="name"
                        name="user1"
                        checked={toggle === "Text"}
                        onChange={() => UploadHandler("Text")}
                      />
                      {users.user_fullname}
                    </label>
                    <label className={`small ${toggle === "someone" ? "active" : ""
                      } `}>
                      <input
                        type="radio"
                        value="Name1"
                        name="user2"
                        checked={toggle === "someone"}
                        onChange={() => UploadHandler("someone")}
                      />
                      Someone Else
                    </label>
                  </div>
                ) : " "
              }
              < div className="From-wrapper">
                <div className="column">
                  <div className="formFieldwrap">
                    <FormInput
                      type="text"
                      name="Full_Name"
                      value={fullName}
                      label="Full Name*"
                      placeholder="Enter your full name"
                      onChange={handlePersonalDetails}
                      onKeyUp={handlePersonalDetails}
                      disabled={toggle === "Text"}
                    />
                    <FormError
                      show={firstNameError && !fullName}
                      error="Full name is required."
                      className='visitorFormError'
                    />
                  </div>
                </div>
                <div className="column">
                  <div className="formFieldwrap">

                    <FormInput
                      type="text"
                      name="Email_Address"
                      value={email}
                      onChange={handlePersonalDetails}
                      onKeyUp={handlePersonalDetails}
                      label="Email Address*"
                      placeholder="Enter your email address"
                    // disabled={toggle === "Text"}
                    />
                    <FormError
                      show={!email && invalidEmailError}
                      error=" Email is required."
                      className='visitorFormError'
                    />
                    <FormError
                      show={email && emailError}
                      error="Invalid Email."
                    />

                  </div>
                </div>
                <div className="column">
                  <div className="formFieldwrap">
                    <div className="cstmPhoneInput">
                      <PhoneInput
                        countryCodeEditable={false}
                        containerClass="form-group"
                        inputClass="form-control"
                        specialLabel
                        country={"in"}
                        value={`${countryCode} ${contactNumber} `}
                        inputProps={{
                          name: "phone",
                          required: true,
                          autoFocus: false,
                          placeholder: "Enter mobile",
                        }}
                        enableSearch
                        name="mobileNo"
                        searchPlaceholder="Search Country"
                        onChange={(value, formattedValue) => {
                          handlePhoneInput(value, formattedValue);
                        }}
                        onKeyUp={(value, formattedValue) => {
                          handlePhoneInput(value, formattedValue);
                        }}
                        disableSearchIcon
                      />
                      <label className="animLabel" htmlFor="mobile_number">
                        Mobile Number*
                      </label>
                      <FormError
                        show={!contactNumber && contactNumberError}
                        error="Contact number is required."
                        className='visitorFormError'
                      />
                      <FormError
                        show={contactNumber && countryCode === "91" && contactNumberError}
                        error="Invalid Contact."
                        className='visitorFormError'
                      />
                    </div>
                  </div>
                </div>
                {/* <div className="column">
                <div className="formFieldwrap">
                  <FormInput
                    type="number"
                    name="Identity_Number"
                    value={verifyIdentity}
                    onChange={handlePersonalDetails}
                    onKeyUp={handlePersonalDetails}
                    label="Identity Number"
                    placeholder="Enter your Identity Number"
                  />

                </div>
              </div> */}
                {fieldOne ? <div className="column">
                  <div className="formFieldwrap">
                    <FormInput
                      type="text"
                      name="field_1"
                      value={fieldOneData}
                      onChange={handlePersonalDetails}
                      onKeyUp={handlePersonalDetails}
                      label={firstLabel}
                      placeholder={firstPlaceholder}
                    />
                    <FormError
                      show={!fieldOneData && fieldOneDataError}
                      error="This Field is Required"

                      className='visitorFormError'
                    />
                  </div>
                </div> : ""}

                {fieldTwo ? <div className="column">
                  <div className="formFieldwrap">
                    <FormInput
                      type="text"
                      name="field_2"
                      value={fieldTwoData}
                      onChange={handlePersonalDetails}
                      onKeyUp={handlePersonalDetails}
                      label={secondLabel}
                      placeholder={secondPlaceholder}
                    />
                    <FormError
                      show={!fieldTwoData && fieldTwoDataError}
                      error="This Field is Required"

                      className='visitorFormError'
                    />
                  </div>
                </div> : ""}

                {fieldThree ? <div className="column">
                  <div className="formFieldwrap">
                    <FormInput
                      type="text"
                      name="field_3"
                      value={fieldThreeData}
                      onChange={handlePersonalDetails}
                      onKeyUp={handlePersonalDetails}
                      label={thirdLabel}
                      placeholder={thirdPlaceholder}
                    />
                    <FormError
                      show={!fieldThreeData && fieldThreeDataError}
                      error="This Field is Required"
                      className='visitorFormError'
                    />
                  </div>
                </div> : ""}

              </div>
              <div className="Bookbtn">
                <button
                  type="submit"
                  className="button button-primary"
                  onClick={handleSubmitButton}
                >
                  BOOK APPOINTMENT
                </button>
              </div>
              <div className="term">
                <p>Updates will be sent to the email provided above. <br />
                  By booking this appointment, you agree to Essura Pharmacy Terms and Conditions.</p>
              </div>
            </div>
          </div>
        ) : (
          <ComponentLoader />
        )

        }

      </div>
    </React.Fragment>
  );

}

export default WebsiteBookAppointment

