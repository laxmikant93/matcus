import React, { useState } from "react";
import PrimaryAuthTheme from "../../../../Common/Theme/PrimaryAuthTheme";
import FormInput from "../../../../Common/Form/FormInput";
import AppLink from "../../../../Common/AppLink";
import SelectInput from "../../../../Common/Form/SelectInput";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const [modalState, setModalState] = useState(false);
  const manageModalState = () => {
    setModalState(!modalState);
  };
  const closeModalState = () => {
    setModalState(modalState);
  };
  const [seconds, setSeconds] = React.useState(5);
  React.useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setTimeout(() => { });
    }
  });

  return (
    <React.Fragment>
      <div className="row mt-40">
        <div className="col-md-6 text-left">
          <h2 className="text-sm gray w-300">
            Thanks, <span className="dgray">Sanjeet</span>
          </h2>
          <h6 className="text-xxs gray w-300">
            You have chosen user role as an{" "}
            <span className="w-400 dgray">Institute owner.</span>
          </h6>
        </div>
        <div className="col-md-6 text-right">
          <h2 className="text-xxs w-300 gray">
            Chosen by mistake? <span className="base">No worries.</span>
          </h2>
          <AppLink
            to="/sign-up"
            className="button btn-o-mgray primary btn-sm w-500 mt-3"
          >
            <i className="animate-r-arrow-icon back-i"></i> Change to another
            role
          </AppLink>
        </div>
      </div>
      <div className="row mt-40">
        <div className="col-md-12">
          <h3 className="dgray text-xs w-500">Institute Information</h3>
        </div>
      </div>
      <div className="row mt-10">
        <div className="col-md-6">
          <FormInput
            className=""
            name="text"
            type="text"
            label="Institute Name"
            placeholder="* Institute name"
          />
        </div>
        <div className="col-md-3">
          <div className="formFieldwrap">
            <SelectInput id="select-type" name="profession_cat" label="Select Type">
              <option value="0">Select Type</option>
              <option value="5124">Arts and hobbies</option>
            </SelectInput>
            {/* <label className="animLabel" htmlFor="profession_cat">
              Select Type
            </label> */}
          </div>
        </div>
        <div className="col-md-3">
          <FormInput
            className=""
            name="text"
            type="text"
            label="Full Address"
            placeholder="Locality or area"
          />
        </div>
        <div className="col-md-12">
          <FormInput
            className=""
            name="text"
            type="text"
            label="Full Address"
            placeholder="Full Address"
          />
        </div>
        <div className="col-md-4">
          <FormInput
            className=""
            name="text"
            type="text"
            label="Institute Name"
            placeholder="* Official email"
          />
        </div>
        <div className="col-md-4">
          <FormInput
            className=""
            name="text"
            type="text"
            label="Institute Name"
            placeholder="* Official contact number"
          />
        </div>
        <div className="col-md-4">
          <FormInput
            className=""
            name="text"
            type="text"
            label="Institute Name"
            placeholder="Existing website URL"
          />
        </div>
        <div className="col-md-3">
          <div className="formFieldwrap">
            <SelectInput id="select_country" name="profession_cat" label="Select Country">
              <option value="0">Select Country</option>
              <option value="5124">Arts and hobbies</option>
            </SelectInput>
          </div>
        </div>
        <div className="col-md-3">
          <div className="formFieldwrap">
            <SelectInput id="select_state" name="profession_cat" label="Select State">
              <option value="0">Select State</option>
              <option value="5124">Arts and hobbies</option>
            </SelectInput>
          </div>
        </div>
        <div className="col-md-3">
          <div className="formFieldwrap">
            <SelectInput id="select_city" name="profession_cat" label="Select City">
              <option value="0">Select City</option>
              <option value="5124">Arts and hobbies</option>
            </SelectInput>
          </div>
        </div>
        <div className="col-md-3">
          <FormInput
            className=""
            name="text"
            type="text"
            label="Institute Name"
            placeholder="* Zip/Pin code"
          />
        </div>
        <div className="col-md-12">
          <button
            className="button btn-md button-theme"
            onClick={() => manageModalState()}
          >
            Go to Dashboard <i className="animate-r-arrow-icon"></i>
          </button>
        </div>
      </div>
      <div className={`modal modalShowing-${modalState}`}>
        <div className="modalwrapper">
          <span
            className="closeModal text-xxs gray"
            onClick={() => closeModalState()}
          >
            Close
          </span>
          <div className="modalHead"> </div>
          <div className="modalbody">
            <div className="goSuccessModal">
              <div className="row">
                <div className="col-md-12 center-md">
                  <h3 className="secondary text-sm w-300">Almost Done!</h3>
                  <span className="gray text-xs w-400">
                    Sanjeet, Preparing your dashboard
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
          <div className="modalFooter"> </div>
        </div>
      </div>
    </React.Fragment>
  );
};
