import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import FormInput from "../../../../Common/Form/FormInput";
// import {
//   IconGrayCurrentEmployer,
//   IconGrayExperience,
//   IconGrayLocation,
// } from "../../../../Common/Icon";
import { updateHighlight } from "../../../../store/actions/publicProfile";

function AddUpdateAbout({
  setIsHighlightModalOpen,
  userProfileInfo,
  userId,
  editHighlightData,
}) {
  const dispatch = useDispatch();
  const [highlightFields, setHighlightFields] = useState({
    current_employer: "",
    experience: "",
    location_country: "",
    location_city: "",
  });

  useEffect(() => {
    if (editHighlightData) {
      setHighlightFields({
        current_employer: editHighlightData.current_employer
          ? editHighlightData.current_employer
          : "",
        experience: editHighlightData.experience
          ? editHighlightData.experience
          : "",
        location_country: editHighlightData.location_country
          ? editHighlightData.location_country
          : "",
        location_city: editHighlightData.location_city
          ? editHighlightData.location_city
          : "",
      });
    }
  }, [editHighlightData]);

  const handleOnchange = (e) => {
    // const fieldsName = "",
    let fieldsName = {
      ...highlightFields,
      [e.target.name]: e.target.value.trimStart(),
    };
    setHighlightFields(fieldsName);
  };

  // const postData = {
  //   current_employer: highlightFields.current_employer
  //     ? highlightFields.current_employer
  //     : userProfileInfo.current_employer,
  //   experience: highlightFields.experience
  //     ? highlightFields.experience
  //     : userProfileInfo.experience,
  //   location_country: highlightFields.location_country
  //     ? highlightFields.location_country
  //     : userProfileInfo.location_country,
  //   location_city: highlightFields.location_city
  //     ? highlightFields.location_city
  //     : userProfileInfo.location_city,
  // };

  const postData = {
    current_employer: highlightFields.current_employer,
    experience: highlightFields.experience,
    location_country: highlightFields.location_country,
    location_city: highlightFields.location_city,
  };

  const handleSave = () => {
    dispatch(updateHighlight(userId, postData));
    setIsHighlightModalOpen(false);
  };

  return (
    <ul className="pp-Highlight-Content-list editMode">
      <li className="Highlight-Employer">
        <div className="Highlight-Employer-Icon">
          <i className="ed-icon icon-current-employer base i-s"></i>
        </div>
        <div className="Highlight-Employer-Content">
          <p className="text-xxs">Current Employer</p>
          <div className="formFieldwrap mt-10">
            <FormInput
              type="text"
              placeholder="Working At"
              name="current_employer"
              onChange={handleOnchange}
              // defaultValue={userProfileInfo && userProfileInfo.current_employer}
              value={highlightFields.current_employer}
            />
          </div>
        </div>
      </li>
      <li className="Highlight-Experience">
        <div className="Highlight-Employer-Icon">
          <i className="ed-icon icon-experience base i-s"></i>
        </div>
        <div className="Highlight-Employer-Content">
          <p className="text-xxs">Experience</p>
          <div className="formFieldwrap mt-10">
            <FormInput
              type="text"
              placeholder="Experience"
              name="experience"
              // defaultValue={userProfileInfo && userProfileInfo.experience}
              value={highlightFields.experience}
              onChange={handleOnchange}
            />
          </div>
        </div>
      </li>
      <li className="Highlight-Location">
        <div className="Highlight-Employer-Icon">
          <i className="ed-icon icon-location base i-s"></i>
        </div>
        <div className="Highlight-Employer-Content">
          <p className="text-xxs">Location</p>
          <div className="formFieldwrap mt-10">
            <FormInput
              type="text"
              placeholder="Country Name"
              name="location_country"
              // defaultValue={userProfileInfo && userProfileInfo.location_country}
              value={highlightFields.location_country}
              onChange={handleOnchange}
            />
          </div>
          <div className="formFieldwrap">
            <FormInput
              type="text"
              placeholder="State or City"
              name="location_city"
              // defaultValue={userProfileInfo && userProfileInfo.location_city}
              value={highlightFields.location_city}
              onChange={handleOnchange}
            />
          </div>
        </div>
      </li>
      <li className="pp-Highlight-Action-button">
        <button
          className="button btn-sm button-primary"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className="button btn-sm btn-o-primary primary"
          onClick={() => setIsHighlightModalOpen(false)}
        >
          Cancel
        </button>
      </li>
    </ul>
  );
}

export default AddUpdateAbout;
