import React from "react";
import FormTextArea from "../../../../Common/Form/FormTextArea";

function GATags({ gatCode, institutedetail, handleSubmit }) {
  return (
    <div className="googlean-wrapper mt-50">
      <div>
        <h2 className="w-200 text-sm">Set Up the Google Analytics Tag</h2>
        <p className="w-300 text-xs">
          Google Analytics gives you the tools you need to better understand
          your customers.
        </p>
        <a
          className="underline text-xxs"
          href="cdvfvfv"
          target="_blank"
          rel="noopener noreferrer"
        >
          How to get Google Analytics code
        </a>
        <div className="AddSocialLinkBody mt-20">
          <div className="AddSocialLinkItem">
            <div className="formFieldwrap">
              <FormTextArea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="6"
                type="text"
                // onChange={(e) => handleServicesDetailsInput(e, key)}
                placeholder="Google Analytics Code"
                value={gatCode}
                label="Google Analytics Code"
                style={{ whiteSpace: " pre-wrap" }}
                maxLength="500"
              ></FormTextArea>
            </div>
          </div>
        </div>
        {institutedetail.updating ? (
          <button
            type="button"
            className="button btn-md button-theme savesocialbtnmetatag"
          // onClick={handleSubmit}
          >
            Updating...
          </button>
        ) : (
          <button
            type="button"
            className="button btn-md button-theme savesocialbtnmetatag"
            onClick={handleSubmit}
          >
            Save Social Media
          </button>
        )}
      </div>
    </div>
  );
}

export default GATags;
