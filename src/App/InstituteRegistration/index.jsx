import React, { useEffect, useState } from "react";
import FormInput from "../../Common/Form/FormInput";
import FormError from "../../Common/Form/FormError";
import { Fullname } from "../../Common/UserElement";
import InstituteValidation from "./instituteValidation";
import { UnsetChooseOption } from ".././../store/actions/chooseoption";
import { setUserActiveRole } from ".././../store/actions/user";
import { connect, useDispatch, useSelector } from "react-redux";
import InstituteTheme from "../../Common/Theme/InstituteTheme";
import { InsMapDispatchToProps, InsMapStateToProps } from "./insMapDispatch";
import CountrySelect from "../../Common/Form/CountrySelect";
import StateSelect from "../../Common/Form/StateSelect";
import AppLink from "../../Common/AppLink";
import SelectInput from "../../Common/Form/SelectInput";

const InstituteRegistration = (props) => {
  const dispatch = useDispatch();

  const [seconds, setSeconds] = useState(5);
  const user = useSelector((state) => state.user);

  const [institute_name_error, set_institute_name_error] = useState(false);
  const [institute_email_error, set_institute_email_error] = useState(false);
  const [institute_category_error, set_institute_category_error] =
    useState(false);
  const [institute_phone_error, set_institute_phone_error] = useState(false);
  const [institute_country_error, set_institute_country_error] =
    useState(false);
  const [institute_state_error, set_institute_state_error] = useState(false);
  const [institute_city_error, set_institute_city_error] = useState(false);
  const [institute_address_error, set_institute_address_error] =
    useState(false);
  const [institute_zipcode_error, set_institute_zipcode_error] =
    useState(false);

  const [showError, setShowError] = useState(false);

  const handleInput = (e, key) => {
    InstituteValidation.handleInput(e);
    checkRegistrationErrors();
  };

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");

  const handleFormSubmit = (e) => {
    const { registerInstitutes } = props;
    e.preventDefault();
    setShowError(true);
    checkRegistrationErrors();
    if (InstituteValidation.isValid()) {
      const insRegdata = {
        ...InstituteValidation.getFormInputData(),
        owner: user._id,
      };

      registerInstitutes(insRegdata);
    } else {
    }
  };

  const checkRegistrationErrors = () => {
    set_institute_email_error(
      !InstituteValidation.getFormInput().institute_email.valid && showError
    );
    set_institute_category_error(
      !InstituteValidation.getFormInput().institute_category.valid && showError
    );
    set_institute_phone_error(
      !InstituteValidation.getFormInput().institute_phone.valid && showError
    );
    set_institute_country_error(
      !InstituteValidation.getFormInput().institute_country.valid && showError
    );
    set_institute_state_error(
      !InstituteValidation.getFormInput().institute_state.valid && showError
    );
    set_institute_city_error(
      !InstituteValidation.getFormInput().institute_city.valid && showError
    );
    set_institute_address_error(
      !InstituteValidation.getFormInput().institute_address.valid && showError
    );
    set_institute_name_error(
      !InstituteValidation.getFormInput().institute_name.valid && showError
    );
    set_institute_zipcode_error(
      !InstituteValidation.getFormInput().institute_zipcode.valid && showError
    );

    if (props.institute.success) {
      if (seconds > 0) {
        setTimeout(() => setSeconds(seconds - 1), 1000);
      } else {
        dispatch(setUserActiveRole(process.env.REACT_APP_PAGE_OWNER)); // Set user active role
        InstituteValidation.resetInstituteRegistrationForm(); // Reset Registration form
        props.resetStates(); // reset role and states
      }
    }
  };

  useEffect(checkRegistrationErrors, [showError, seconds, props, dispatch]);

  return (
    <React.Fragment>
      <div className="row mt-30">
        <div className="col-md-6 text-left mt-20">
          <h2 className="text-sm w-300">
            Thanks, <Fullname />
          </h2>
          <h6 className="text-xxs w-400">
            You have chosen{" "}
            <span className="w-500 primary">Institute Admin</span> role.
          </h6>
        </div>
        {!props.institute.success && (
          <div className="col-md-6 mt-10 text-right mt-20">
            <h2 className="text-xxs w-400">
              Chosen by mistake? <span className="base">No worries.</span>
            </h2>
            <button
              className="button btn-o-silver primary btn-sm w-500 mt-3"
              onClick={() => dispatch(UnsetChooseOption())}
            >
              <i className="animate-r-arrow-icon back-i"></i> Change to
              another role
            </button>
          </div>
        )}
      </div>

      {!props.institute.success && (
        <React.Fragment>
          <div className="row mt-40">
            <div className="col-md-12">
              <h3 className="text-xs w-500">Register Your Institute</h3>
            </div>
          </div>

          <form onSubmit={handleFormSubmit}>
            <div className="row mt-10">
              <div className="col-xs-12 col-md-8">
                <div className="formFieldwrap">
                  <FormInput
                    onChange={handleInput}
                    onKeyUp={handleInput}
                    className={institute_name_error ? "errorInput" : ""}
                    name="institute_name"
                    type="text"
                    label="*Institute Name"
                    placeholder="* Institute name"
                  />
                  <FormError
                    show={institute_name_error}
                    error="Institute name required."
                  />
                </div>
              </div>
              <div className="col-xs-12 col-md-4">
                <div className="formFieldwrap">

                  <SelectInput
                    className={institute_category_error ? "errorInput" : ""}
                    onChange={handleInput}
                    id="institute_category"
                    name="institute_category"
                    label="Select category"
                  >
                    <option value="">* Select Category</option>
                    <option value="Play School">Play School</option>
                    <option value="Day Care">Day Care</option>
                    <option value="Special Care">Special Care</option>
                    <option value="Primary School">Primary School</option>
                    <option value="Secondary School">
                      Secondary School
                    </option>
                    <option value="Sr. Secondary School / High School">
                      Sr. Secondary School / High School
                    </option>
                    <option value="College">College</option>
                    <option value="University">University</option>
                    <option value="Vocational Training Centre">
                      Vocational Training Centre
                    </option>
                    <option value="Distance Learning Centre">
                      Distance Learning Centre
                    </option>
                    <option value="Professional Grooming Institute">
                      Professional Grooming Institute
                    </option>
                    <option value="Online Learning Institute">
                      Online Learning Institute
                    </option>
                    <option value="Institute">Institute</option>
                    <option value="Organization">Organization</option>
                    <option value="NGO">NGO</option>
                    <option value="Others">Others</option>
                  </SelectInput>
                  {/* <label className="animLabel" htmlFor="institute_category">
                      Select category
                    </label> */}
                  {/* </div> */}
                  <FormError
                    show={institute_category_error}
                    error="Please select category."
                  />
                </div>
              </div>

              <div className="col-xs-12 col-md-4">
                <div className="formFieldwrap">
                  <FormInput
                    onChange={handleInput}
                    onKeyUp={handleInput}
                    className={institute_email_error ? "errorInput" : ""}
                    name="institute_email"
                    type="text"
                    label="*Official email"
                    placeholder="* Official email"
                  />
                  <FormError
                    show={institute_email_error}
                    error="Official email required."
                  />
                </div>
              </div>
              <div className="col-xs-12 col-md-4">
                <div className="formFieldwrap">
                  <FormInput
                    onChange={handleInput}
                    onKeyUp={handleInput}
                    className={institute_phone_error ? "errorInput" : ""}
                    name="institute_phone"
                    type="text"
                    maxLength={15}
                    label="*Official contact number"
                    placeholder="* Official contact number"
                  />
                  <FormError
                    show={institute_phone_error}
                    error="Official contact number required."
                  />
                </div>
              </div>
              <div className="col-xs-12 col-md-4">
                <div className="formFieldwrap">
                  <FormInput
                    onChange={handleInput}
                    onKeyUp={handleInput}
                    className=""
                    name="institute_category"
                    type="text"
                    label="Existing website URL"
                    placeholder="Existing website URL"
                  />
                </div>
              </div>
              <div className="col-xs-12 col-md-12">
                <div className="formFieldwrap">
                  <FormInput
                    onChange={handleInput}
                    onKeyUp={handleInput}
                    className=""
                    name="institute_address"
                    type="text"
                    label="Full Address"
                    placeholder="Full Address"
                  />
                  <FormError
                    show={institute_address_error}
                    error="Please enter institute address."
                  />
                </div>
              </div>
              <div className="col-xs-12 col-md-3">
                <div className="formFieldwrap">
                  <CountrySelect
                    name="institute_country"
                    value={country}
                    onSelect={(value) => setCountry(value)}
                    onEvent={handleInput}
                  />

                  <FormError
                    show={institute_country_error}
                    error="Please select country"
                  />
                </div>
              </div>
              <div className="col-xs-12 col-md-3">
                <div className="formFieldwrap">
                  <StateSelect
                    name="institute_state"
                    value={state}
                    onSelect={(value) => setState(value)}
                    onEvent={handleInput}
                  />
                  <FormError
                    show={institute_state_error}
                    error="Please provide state"
                  />
                </div>
              </div>
              <div className="col-xs-12 col-md-3">
                <div className="formFieldwrap">
                  <FormInput
                    onChange={handleInput}
                    onKeyUp={handleInput}
                    className=""
                    name="institute_city"
                    type="text"
                    label="City Name"
                    placeholder="Enter City"
                  />
                  <FormError
                    show={institute_city_error}
                    error="Please enter institute city."
                  />
                </div>
              </div>
              <div className="col-xs-12 col-md-3">
                <div className="formFieldwrap">
                  <FormInput
                    onChange={handleInput}
                    onKeyUp={handleInput}
                    className=""
                    name="institute_zipcode"
                    type="text"
                    label="Zip/Pin code"
                    placeholder="Zip/Pin code"
                  />
                  <FormError
                    show={institute_zipcode_error}
                    error="Please provide pincode/zipcode."
                  />
                </div>
              </div>
              <div className="col-xs-12">
                {props.institute.loading ? (
                  <button type="button" className="button btn-md button-theme">
                    Loading...
                  </button>
                ) : (
                  <button type="submit" className="button btn-md button-theme">
                    Go to Dashboard <i className="animate-r-arrow-icon"></i>
                  </button>
                )}
              </div>
            </div>
          </form>
          {/* <div className="row mt-50">
            <div className="col-xs-12 col-sm-4 col-md-3">
              <div className="OthLoginOpt mt-10">
                <AppLink
                  to="/community"
                  className="button btn-o-mgray btn-sm primary mt-8 w-500"
                >
                  Discover Edneed Community{" "}
                  <i className="animate-r-arrow-icon"></i>
                </AppLink>
              </div>
            </div>
          </div> */}
        </React.Fragment>
      )}

      <div className={`modal modalShowing-${props.institute.success}`}>
        <div className="modalwrapper">
          <div className="goSuccessModal">
            <div className="row">
              <div className="col-md-12 center-md">
                <h3 className="secondary text-sm w-300">Almost Done!</h3>
                <span className="gray text-xs w-400">
                  <Fullname /> Preparing your dashboard
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 text-center mt-8">
                <div className="progress mt-30" data-percentage="100">
                  <span className="progress-left">
                    <span className="progress-bar"></span>
                  </span>
                  <span className="progress-right">
                    <span className="progress-bar"></span>
                  </span>
                  <div className="progress-value">
                    <div className="redirectPageTime">
                      <span className="secondary text-lg w-300">
                        {seconds}
                      </span>
                      <span className="gray text-xxs">Seconds</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default connect(
  InsMapStateToProps,
  InsMapDispatchToProps
)(InstituteRegistration);

// export default InstituteRegistration
