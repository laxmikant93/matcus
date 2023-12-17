import React, { useState, useRef, useEffect } from 'react'
import "./bookAppointment.style.scss";
import FormError from '../../../Common/Form/FormError';
import ValidationFile from '../../../Classes/ValidationFile';
import FormInput from '../../../Common/Form/FormInput';
import ToggleIcon from './ToggleIcon';

const BookingForm = ({ saveData, allCustomFields, updateChecked }) => {

  const [firstLabel, setFirstLabel] = useState()
  const [secondLabel, setSecondLabel] = useState()
  const [thirdLabel, setThirdLabel] = useState()

  const [firstPlaceholder, setFirstPlaceholder] = useState("")
  const [secondPlaceholder, setSecondPlaceholder] = useState("")
  const [thirdPlaceholder, setThirdPlaceholder] = useState("")

  const [firstLabelError, setFirstLabelError] = useState("")
  const [secondLabelError, setSecondLabelError] = useState()
  const [thirdLabelError, setThirdLabelError] = useState()

  const [firstPlaceholderError, setFirstPlaceholderError] = useState()
  const [secondPlaceholderError, setSecondPlaceholderError] = useState()
  const [thirdPlaceholderError, setThirdPlaceholderError] = useState()

  const [fieldOne, setFieldOne] = useState(false)
  const [fieldTwo, setFieldTwo] = useState(false)
  const [fieldThree, setFieldThree] = useState(false)

  const [fieldValidationOne, setFieldValidationOne] = useState(false)
  const [fieldValidationTwo, setFieldValidationTwo] = useState(false)
  const [fieldValidationThree, setFieldValidationThree] = useState(false)

  const [checkErrOne, setCheckErrOne] = useState(false)
  const [checkErrTwo, setCheckErrTwo] = useState(false)
  const [checkErrThree, setCheckErrThree] = useState(false)

  const [allowClientsOnline, setallowClientsOnline] = useState(true);
  const [showOption, hideOption] = useState(false);
  const [showList, setShowList] = useState(false);
  const childRef = useRef(null)
  const [showform, setShowForm] = useState(false);

  useEffect(() => {
    setFirstLabel(allCustomFields.firstLabel)
    setSecondLabel(allCustomFields.secondLabel)
    setThirdLabel(allCustomFields.thirdLabel)

    setFirstPlaceholder(allCustomFields.firstPlaceholder)
    setSecondPlaceholder(allCustomFields.secondPlaceholder)
    setThirdPlaceholder(allCustomFields.thirdPlaceholder)

    setFieldOne(allCustomFields.fieldOne)
    setFieldTwo(allCustomFields.fieldTwo)
    setFieldThree(allCustomFields.fieldThree)

    setFieldValidationOne(allCustomFields.fieldValidationOne)
    setFieldValidationTwo(allCustomFields.fieldValidationTwo)
    setFieldValidationThree(allCustomFields.fieldValidationThree)
    setallowClientsOnline(allCustomFields.allowClientsOnline)
  }, [allCustomFields.fieldOne, allCustomFields.fieldThree, allCustomFields.fieldTwo, allCustomFields.fieldValidationOne,
  allCustomFields.fieldValidationThree, allCustomFields.fieldValidationTwo, allCustomFields.firstLabel, allCustomFields.firstPlaceholder,
  allCustomFields.secondLabel, allCustomFields.secondPlaceholder, allCustomFields.thirdLabel, allCustomFields.thirdPlaceholder, allCustomFields.allowClientsOnline])

  const handleToggle = (e) => {
    let inputChecked = e.target.checked
    if (inputChecked) {
      updateChecked(inputChecked)
      setallowClientsOnline(true);
    }
    else {
      updateChecked(false)
      setallowClientsOnline(false);
    }
  }

  const handleCheckBoxFirst = (e) => {
    let inputChecked = e.target.checked
    if (inputChecked) {
      setFieldOne(true);
      setFieldValidationOne(false);
      setCheckErrOne(false)
    }
    else {
      setFieldOne(false);
      setFieldValidationOne(false);
    }
  }
  const handleCheckBoxSecond = (e) => {
    let inputChecked = e.target.checked
    if (inputChecked) {
      setFieldTwo(true);
      setFieldValidationTwo(false);
    } else {
      setFieldTwo(false);
      setFieldValidationTwo(false);
    }
  }
  const handleCheckBoxThird = (e) => {
    let inputChecked = e.target.checked
    if (inputChecked) {
      setFieldThree(true);
      setFieldValidationThree(false);
      setCheckErrThree(false)
    } else {
      setFieldThree(false);
      setFieldValidationThree(false);
    }
  }
  const handleCheckBoxValidationFirst = () => {
    setFieldValidationOne(fieldValidationOne ? false : true)
  }
  const handleCheckBoxValidationSecond = () => {
    setFieldValidationTwo(fieldValidationTwo ? false : true)
  }
  const handleCheckBoxValidationThird = () => {
    setFieldValidationThree(fieldValidationThree ? false : true)
  }
  const fieldOneValid = () => {
    let isValid = true;
    if (fieldOne === true) {
      if (ValidationFile.isEmpty(firstPlaceholder)) {
        setFirstPlaceholderError(true);
        isValid = false;
      }
      if (ValidationFile.isEmpty(firstLabel)) {
        setFirstLabelError(true);
        isValid = false;
      }
    }
    else if (firstPlaceholder) {
      if (fieldOne === false) {
        setCheckErrOne(true);
        isValid = false;
      }
      if (ValidationFile.isEmpty(firstLabel)) {
        setFirstLabelError(true);
        isValid = false;
      }
    }
    else if (firstLabel) {
      if (fieldOne === false) {
        setCheckErrOne(true);
        isValid = false;
      }
      if (ValidationFile.isEmpty(firstPlaceholder)) {
        setFirstPlaceholderError(true);
        isValid = false;
      }
    }
    return isValid;
  }

  const fieldTwoValid = () => {
    let isValid = true;
    if (fieldTwo === true) {
      if (ValidationFile.isEmpty(secondPlaceholder)) {
        setSecondPlaceholderError(true);
        isValid = false;
      }
      if (ValidationFile.isEmpty(secondLabel)) {
        setSecondLabelError(true);
        isValid = false;
      }
    }
    else if (secondPlaceholder) {
      if (fieldTwo === false) {
        setCheckErrTwo(true);
        isValid = false;
      }
      if (ValidationFile.isEmpty(secondLabel)) {
        setSecondLabelError(true);
        isValid = false;
      }
    }
    else if (secondLabel) {
      if (fieldTwo === false) {
        setCheckErrTwo(true);
        isValid = false;
      }
      if (ValidationFile.isEmpty(secondPlaceholder)) {
        setSecondPlaceholderError(true);
        isValid = false;
      }
    }
    return isValid;
  }

  const fieldThreeValid = () => {
    let isValid = true;
    if (fieldThree === true) {
      if (ValidationFile.isEmpty(thirdPlaceholder)) {
        setThirdPlaceholderError(true);
        isValid = false;
      }
      if (ValidationFile.isEmpty(thirdLabel)) {
        setThirdLabelError(true);
        isValid = false;
      }
    }
    else if (thirdPlaceholder) {
      if (fieldThree === false) {
        setCheckErrThree(true);
        isValid = false;
      }
      if (ValidationFile.isEmpty(thirdLabel)) {
        setThirdLabelError(true);
        isValid = false;
      }
    }
    else if (thirdLabel) {
      if (fieldThree === false) {
        setCheckErrThree(true);
        isValid = false;
      }
      if (ValidationFile.isEmpty(thirdPlaceholder)) {
        setThirdPlaceholderError(true);
        isValid = false;
      }
    }
    return isValid;
  }

  let postServiceData = {
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

  const handleSave = () => {
    let ValidFieldOne = fieldOneValid();
    let ValidFieldTwo = fieldTwoValid();
    let ValidFieldThree = fieldThreeValid();
    if (ValidFieldOne && ValidFieldTwo && ValidFieldThree) {
      setShowForm(!showform)
      saveData(postServiceData)
      setCheckErrOne(false);
      setCheckErrTwo(false);
      setCheckErrThree(false);
      setFirstPlaceholderError(false);
      setSecondPlaceholderError(false);
      setThirdPlaceholderError(false);
      setFirstLabelError(false);
      setSecondLabelError(false);
      setThirdLabelError(false);
    }
  }


  const showHideAdditional = () => {
    return hideOption(!showOption);
  }

  const DropHandle = () => {
    return setShowList(!showList);
  }

  // const handleCustomFormSave = (value) => {
  //   setFirstLabel(value.firstLabel)
  //   setSecondLabel(value.secondLabel)
  //   setThirdLabel(value.thirdLabel)

  //   setFirstPlaceholder(value.firstPlaceholder)
  //   setSecondPlaceholder(value.secondPlaceholder)
  //   setThirdPlaceholder(value.thirdPlaceholder)

  //   setFieldOne(value.fieldOne)
  //   setFieldTwo(value.fieldTwo)
  //   setFieldThree(value.fieldThree)

  //   setFieldValidationOne(value.fieldValidationOne)
  //   setFieldValidationTwo(value.fieldValidationTwo)
  //   setFieldValidationThree(value.fieldValidationThree)
  //   setShowForm(false)
  // }
  const bookingformHandle = () => {
    setShowForm(!showform);
    // allCustomFields
  }
  const bookingformHandleClose = () => {
    showform(true)
    setShowForm(false)
  }
  return (
    <React.Fragment>
      <div className="book__form" >
        <div className="posi__border additional pb-10">
          <h2 className="">Additional Settings</h2>
          <button className="button btn-o-primary btn-xs ps-10 relative" onClick={() => showHideAdditional()}><i className={`arrow-icon ${showOption ? "active" : "unactive"}`}></i>{showOption ? "Show Less " : "Show More"}</button>
        </div>
        <p className="w-300">Set booking preferences and customize your booking form.</p>
        {showOption ? (
          <div className={`Accordian`} ref={childRef}>
            <div className="Additional__grid mb-2 0">
              <div>
                <i className="icon_calender"></i>
              </div>
              <div className="details">
                <h4>Online Booking Preferences</h4>
                <p className="mb-10">Accept or decline online booking requests.</p>
                <div className="dropdown mb-20">
                  <button className="dropbtn" onClick={() => DropHandle()}><i className={`arrow-icon ${showList ? "active" : ""}`}></i> Manually approve or decline booking requests</button>
                  {showList ? (<ul id="myDropdown" className="dropdown-content">
                    <li className="option active">Manually approve or decline booking requests</li>
                    <li className="option option__grid">
                      <div className="toggle_icon">
                        <ToggleIcon
                          onChange={(e) => handleToggle(e)}
                          checked={allowClientsOnline}
                        />
                      </div>
                      <div>
                        <h5>Allow clients to book appointments online</h5>
                      </div>
                      {/* <div className="">
                                  <ToggleIcon
                                    isOn={value}
                                    onColor="#0184ff"
                                    handleToggle={() => setValue(!value)} />
                                  <SwitchButton
                                    onChange={() => setValue(!value)}
                                    checked={value}
                                  />

                                </div> */}
                    </li>
                  </ul>) : null
                  }
                </div>
              </div>
            </div>
            <div className="Additional__grid">
              <div>
                <i className="icon_note"></i>
              </div>
              <div className="details" >
                <h4>Booking Form</h4>
                <p className="mb-10">Customize the booking form for this service or use a default form.</p>
                <div className="dropdown">
                  <div className="dropbtn book_formgrid" >
                    <h5>Default Booking Form</h5>
                    {
                      showform ? (
                        <>
                          <div className='bookingSaveBtn-wrap'>
                            <button className="text-xxs w-500 gray mr-20" onClick={() => setShowForm(!showform)}>
                              <span className='iconcol '>Cancel</span>
                            </button>
                            <button className="text-xxs w-500 primary" onClick={() => handleSave()}>
                              <span className='iconcol'>Done</span>
                            </button>
                          </div>
                        </>
                      ) :

                        (
                          <div className='bookingDefaultBtn-wrap' onClick={() => bookingformHandle()}>
                            <button>
                              <i className='ed-edit'></i>
                            </button>
                            <button className='className="text-xxs w-500 primary'>
                              <span>Customize Default Form</span>
                            </button>
                          </div>
                        )
                    }

                  </div>
                  {
                    showform ?
                      <div>
                        <div className="mt-20">
                          <div className="book_form-wrap">
                            <h5>Clients fill out this form when booking on your site. You can customize it to collect the exact info you need.</h5>
                            <div className="form_card_wrapper">

                              <div className="book_card">
                                <div className="input_grid">
                                  <div className="formFieldwrap">
                                    <FormInput
                                      value="Full Name*"
                                      disabled
                                      label="Input Field Name"
                                      labelPosition="top"
                                    />
                                    <FormError
                                      // show={!fourthPlaceholder && fourthPlaceholderError}
                                      error="Full Name is required."
                                      className='visitorFormError'
                                    />
                                  </div>
                                  <div className="formFieldwrap">
                                    <FormInput
                                      // onChange={(e) => setFourthLabel(e.target.value)}
                                      value="Enter Full Name Here"
                                      label="Input Field Hint"
                                      labelPosition="top"
                                      disabled


                                    // label="Enter Email Address* Here "
                                    />
                                    <FormError
                                      // show={!fourthLabel && fourthLabelError}
                                      error="Mobile Number is required."
                                      className='visitorFormError'
                                    />
                                  </div>
                                </div>
                                {/* <div className='button_switch'> */}
                                {/* <SwitchButton
                                    // onClick={() => handleCheckBoxValidationFourth()}
                                    // checked={fieldValidationFour}
                                    disabled
                                  // disabled={!fieldFour}
                                  /> */}
                                {/* <label>This is a *Required field.</label> */}
                                {/* </div> */}
                                {/* <div className='button_switch'> */}
                                {/* <SwitchButton
                                    // onChange={(e) => handleCheckBoxFourth(e)}
                                    disabled
                                  // checked={fieldFour}
                                  /> */}
                                {/* <label>Visible on the form</label> */}
                                {/* <FormError */}
                                {/* // show={checkErrFour}
                                    // error="please select the checkbox"
                                    // className='visitorFormError'
                                  // /> */}
                                {/* </div> */}
                              </div>

                              <div className="book_card">
                                <div className="input_grid">
                                  <div className="formFieldwrap">
                                    <FormInput
                                      // onChange={(e) => setSixPlaceholder(e.target.value)}
                                      value="Email Address*"
                                      // placeholder="Add a Field Name"
                                      disabled
                                      label="Input Field Name"
                                      labelPosition="top"

                                    />
                                    <FormError
                                      // show={!sixPlaceholder && sixthPlaceholderError}
                                      error="Field Name is required."
                                      className='visitorFormError'
                                    />
                                  </div>
                                  <div className="formFieldwrap">
                                    <FormInput
                                      // onChange={(e) => setFourthLabel(e.target.value)}
                                      value="Enter Email Here"
                                      disabled
                                      label="Input Field Hint"
                                      labelPosition="top"
                                    />
                                    <FormError
                                      // show={!sixthLabel && sixLabelError}
                                      error="Field Hint is required."
                                      className='visitorFormError'
                                    />
                                  </div>
                                </div>
                                {/* <div className='button_switch'>
                                  <SwitchButton
                                    // onClick={() => handleCheckBoxValidationSixth()}
                                    // checked={fieldValidationSix}
                                    disabled
                                  // disabled={!fieldSix}
                                  />
                                  <label>This is a *Required field.</label>
                                </div>
                                <div className='button_switch'>
                                  <SwitchButton
                                    // onChange={(e) => handleCheckBoxSixth(e)}
                                    disabled
                                  // checked={fieldSix}
                                  />
                                  <label>Visible on the form</label>
                                  <FormError
                                    // show={checkErrSix}
                                    error="please select the checkbox"
                                    className='visitorFormError'
                                  />
                                </div> */}
                              </div>
                              <div className="book_card">
                                <div className="input_grid">
                                  <div className="formFieldwrap">
                                    <FormInput
                                      // onChange={(e) => setFifthPlaceholder(e.target.value)}
                                      value="Mobile Number*"
                                      // placeholder="Enter Mobile Number Here*"
                                      disabled
                                      label="Input Field Name "
                                      labelPosition="top"
                                    />
                                    <FormError
                                      // show={!fifthPlaceholder && fifthPlaceholderError}
                                      error="Identity number is required."
                                      className='visitorFormError'
                                    />
                                  </div>
                                  <div className="formFieldwrap">
                                    <FormInput
                                      // onChange={(e) => setFifthLabel(e.target.value)}
                                      value="Enter Mobile Number Here"
                                      // placeholder="Enter Your Aadhaar/PAN"
                                      label="Input Field Hint"
                                      disabled
                                      labelPosition="top"
                                    />
                                    <FormError
                                      // show={!fifthLabel && fifthLabelError}
                                      error="Aadhaar/PAN is required."
                                      className='visitorFormError'
                                    />
                                  </div>
                                </div>
                                {/* <div className='button_switch'>
                                  <SwitchButton
                                    // onClick={() => handleCheckBoxValidationFifth()}
                                    // checked={fieldValidationFive}
                                    disabled
                                  // disabled={!fieldFive}
                                  />
                                  <label>This is a *Required field.</label>
                                </div>
                                <div className='button_switch'>
                                  <SwitchButton
                                    // onChange={(e) => handleCheckBoxFifth(e)}
                                    disabled
                                  // checked={fieldFive}
                                  />
                                  <label>Visible on the form</label>
                                  <FormError
                                    // show={checkErrFive}
                                    error="please select the checkbox"
                                    className='visitorFormError'
                                  />
                                </div> */}
                              </div>
                              {/* <div className="form_card_wrapper"> */}
                              <div className="book_card">
                                <div className="input_grid">
                                  <div className="formFieldwrap">
                                    <FormInput
                                      placeholder="Add a Field Name"
                                      label=" Input Field Name"
                                      onChange={(e) => setFirstLabel(e.target.value)}
                                      value={firstLabel}
                                      labelPosition="top"
                                    />
                                    <FormError
                                      show={!firstLabel && firstLabelError}
                                      error="First Name is required."
                                      className='visitorFormError'
                                    />
                                  </div>
                                  <div className="formFieldwrap">
                                    <FormInput
                                      placeholder="Enter the Field Hint"
                                      label="  Input Field Hint "
                                      onChange={(e) => setFirstPlaceholder(e.target.value)}
                                      value={firstPlaceholder}
                                      labelPosition="top"
                                    />
                                    <FormError
                                      show={!firstPlaceholder && firstPlaceholderError}
                                      error="First Name is required."
                                      className='visitorFormError'
                                    />
                                  </div>

                                </div>

                                <div className='button_switch'>
                                  <input type="checkbox"
                                    onChange={(e) => handleCheckBoxFirst(e)}
                                    checked={fieldOne}
                                  />
                                  <label>Visible on the form</label>
                                  <FormError
                                    show={checkErrOne}
                                    error="please select the checkbox"
                                    className='visitorFormError'
                                  />
                                </div>
                                <div className='button_switch'>
                                  <input type="checkbox"
                                    checked={fieldValidationOne}
                                    onChange={(e) => handleCheckBoxValidationFirst(e)}
                                    disabled={!fieldOne}
                                  />
                                  <label>This is a *Required field.</label>
                                </div>
                              </div>
                              <div className="book_card">
                                <div className="input_grid">
                                  <div className="formFieldwrap">
                                    <FormInput
                                      onChange={(e) => setSecondLabel(e.target.value)}
                                      value={secondLabel}
                                      placeholder="Add a Field Name"
                                      label="Input Field Name"
                                      labelPosition="top"
                                    />
                                    <FormError
                                      show={!secondLabel && secondLabelError}
                                      error="Last name is required."
                                      className='visitorFormError'
                                    />
                                  </div>
                                  <div className="formFieldwrap">
                                    <FormInput
                                      onChange={(e) => setSecondPlaceholder(e.target.value)}
                                      value={secondPlaceholder}
                                      placeholder="Enter the Field Hint"
                                      label="Input Field Hint "
                                      labelPosition="top"
                                    />
                                    <FormError
                                      show={!secondPlaceholder && secondPlaceholderError}
                                      error="Last name is required."
                                      className='visitorFormError'
                                    />
                                  </div>

                                </div>
                                <div className='button_switch'>
                                  <input type="checkbox"
                                    onChange={(e) => handleCheckBoxSecond(e)}
                                    checked={fieldTwo}
                                  />
                                  <label>Visible on the form</label>
                                  <FormError
                                    show={checkErrTwo}
                                    error="please select the checkbox"
                                    className='visitorFormError'
                                  />
                                </div>
                                <div className='button_switch'>
                                  <input type="checkbox"
                                    onChange={(e) => handleCheckBoxValidationSecond(e)}
                                    checked={fieldValidationTwo}
                                    disabled={!fieldTwo}
                                  />
                                  <label>This is a *Required field.</label>
                                </div>


                              </div>
                              <div className="book_card">
                                <div className="input_grid">
                                  <div className="formFieldwrap">
                                    <FormInput
                                      onChange={(e) => setThirdLabel(e.target.value)}
                                      value={thirdLabel}
                                      placeholder="Add a Field Name"
                                      label="Input Field Name"
                                      labelPosition="top"
                                    />
                                    <FormError
                                      show={!thirdLabel && thirdLabelError}
                                      error="Email address is required."
                                      className='visitorFormError'
                                    />
                                  </div>
                                  <div className="formFieldwrap">
                                    <FormInput
                                      onChange={(e) => setThirdPlaceholder(e.target.value)}
                                      value={thirdPlaceholder}
                                      placeholder="Enter the Field Hint"
                                      label="Input Field Hint "
                                      labelPosition="top"
                                    />
                                    <FormError
                                      show={!thirdPlaceholder && thirdPlaceholderError}
                                      error="Email adddress is required."
                                      className='visitorFormError'
                                    />
                                  </div>

                                </div>

                                <div className='button_switch'>
                                  <input type="checkbox"
                                    onChange={(e) => handleCheckBoxThird(e)}
                                    checked={fieldThree}
                                  />
                                  <label>Visible on the form</label>
                                  <FormError
                                    show={checkErrThree}
                                    error="please select the checkbox"
                                    className='visitorFormError'
                                  />
                                </div>
                                <div className='button_switch'>
                                  <input type="checkbox"
                                    onChange={(e) => handleCheckBoxValidationThird(e)}
                                    checked={fieldValidationThree}
                                    disabled={!fieldThree}
                                  />
                                  <label>This is a *Required field.</label>
                                </div>
                              </div>
                              {/* <button onClick={handleSave}>Save Setting</button> */}
                            </div>
                          </div>
                        </div>
                        {/* <BookingForm bookingformHandleClose={() => bookingformHandleClose()} saveData={handleCustomFormSave} allCustomFields={allCustomFields} /> */}
                      </div> : ""
                  }
                </div>
              </div>
            </div>
          </div>
        ) : null

        }
      </div>

    </React.Fragment>
  )
}

export default BookingForm