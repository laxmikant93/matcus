import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormTextArea from "../../../../Common/Form/FormTextArea";
// import {
//   IconGrayCurrentEmployer,
//   IconGrayExperience,
//   IconGrayLocation,
// } from "../../../../Common/Icon";
import { updateUserAbout } from "../../../../store/actions/publicProfile";
import AddUpdateAbout from "./AddUpdateAbout";

const ProfileAbout = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector(
    (state) => state.publicProfile.singleProfile.data.userInfo
  );
  const userProfileInfo = useSelector(
    (state) => state.publicProfile.singleProfile.data.profileInfo
  );

  const user = useSelector((state) => state.user._id);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHighlightModalOpen, setIsHighlightModalOpen] = useState(false);
  const [userAboutInput, setUserAboutInput] = useState("");
  const [editHighlightData, setEditHighlightData] = useState("");

  const id = userProfile && userProfile.user;
  const isUserFound = user === id;

  useEffect(() => {
    setUserAboutInput(userProfileInfo && userProfileInfo.about);
  }, [userProfileInfo, setIsModalOpen, isModalOpen]);
  const submitUserAbout = () => {
    // setUserAbout(userAboutInput);
    dispatch(updateUserAbout(id, { about: userAboutInput }));
    setIsModalOpen(false);
  };

  const editHighlights = (state, editData) => {
    setIsHighlightModalOpen(state);
    setEditHighlightData(editData);
  };

  // const

  return (
    <div className="PP-About-Highlights">
      <div className="PP-Info-about">
        <p className="text-sm w-500">About {userProfile && userProfile.name}</p>
        <div className="PP-Info-about-content mt-8">
          {!isModalOpen && (
            <p className="text-xs" style={{ whiteSpace: "pre-wrap" }}>
              {/* {userAbout || (userProfileInfo && userProfileInfo.about)} */}
              {userAboutInput ? userAboutInput : "Not Added"}
            </p>
          )}

          {isModalOpen && (
            <React.Fragment>
              <div className="formFieldwrap">
                <FormTextArea
                  style={{ whiteSpace: "pre-wrap" }}
                  type="text"
                  onChange={(e) =>
                    setUserAboutInput(e.target.value.trimStart())
                  }
                  name="about"
                  value={userAboutInput}
                  cols="100"
                  rows="5"
                  placeholder="About me"
                  maxLength="500"
                  TextareaBtmTxt="500"
                />
              </div>
              <button
                className="button btn-sm button-primary"
                onClick={submitUserAbout}
              >
                Save
              </button>
              <button
                className="button btn-sm btn-o-primary primary"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </React.Fragment>
          )}
        </div>

        {isUserFound &&
          (userAboutInput
            ? !isModalOpen && (
              <div className="PublicProfileActionButtonAfter">
                <button
                  className="button btn-xs btn-o-primary primary"
                  onClick={() => setIsModalOpen(true)}
                >
                  <i className="ed-icon icon-edit i-xxs primary"></i>
                  Edit
                </button>
              </div>
            )
            : !isModalOpen && (
              <button
                className="button btn-xs btn-o-primary primary"
                onClick={() => setIsModalOpen(true)}
              >
                <i className="ed-icon icon-plus-add i-xs primary"></i>
                Add
              </button>
            ))}
      </div>

      {/* Highlight */}
      <div className="PP-Info-Highlights">
        <div className="pp-Highlight-Content">
          <div className="pp-Highlight-Content-head">
            <p className="text-sm w-500">HighLights</p>
          </div>
          {isHighlightModalOpen ? (
            <AddUpdateAbout
              setIsHighlightModalOpen={setIsHighlightModalOpen}
              userProfileInfo={userProfileInfo}
              userId={id}
              editHighlightData={editHighlightData}
            />
          ) : (
            <ul className="pp-Highlight-Content-list">
              <li className="Highlight-Employer">
                <div className="Highlight-Employer-Icon">
                  <i className="ed-icon icon-current-employer base i-s"></i>
                </div>
                <div className="Highlight-Employer-Content">
                  <p className="text-xxs">Current Employer</p>
                  <p className="text-xs primary w-500">
                    {userProfileInfo && userProfileInfo.current_employer
                      ? userProfileInfo.current_employer
                      : "Not Added"}
                  </p>
                </div>
              </li>
              <li className="Highlight-Experience">
                <div className="Highlight-Experience-Icon">
                  <i className="ed-icon icon-experience base i-s"></i>
                </div>
                <div className="Highlight-Experience-Content">
                  <p className="text-xxs">Experience</p>
                  {/* <p className="text-xs">10+ years</p> */}
                  <p className="text-xs primary w-500">
                    {userProfileInfo && userProfileInfo.experience
                      ? userProfileInfo.experience
                      : "Not Added"}
                  </p>
                </div>
              </li>
              <li className="Highlight-Location">
                <div className="Highlight-Location-Icon">
                  <i className="ed-icon icon-location base i-s"></i>
                </div>
                <div className="Highlight-Location-Content">
                  <p className="text-xxs">Location</p>
                  {/* <p className="text-xs primary">New Delhi, India</p> */}
                  <p className="text-xs primary w-500">
                    {userProfileInfo &&
                      (userProfileInfo.location_city ||
                        userProfileInfo.location_country)
                      ? `${userProfileInfo.location_city}, ${userProfileInfo.location_country
                        ? userProfileInfo.location_country
                        : ""
                      }`
                      : "Not Added"}
                  </p>
                </div>
              </li>
            </ul>
          )}
          <div className="PublicProfileActionButtonAfter">
            {!isHighlightModalOpen &&
              isUserFound &&
              (userProfileInfo &&
                (userProfileInfo.current_employer ||
                  userProfileInfo.experience ||
                  userProfileInfo.location_city) ? (
                <button
                  className="button btn-xs btn-o-primary primary"
                  onClick={() => editHighlights(true, userProfileInfo)}
                >
                  <i className="ed-icon icon-edit i-xxs primary"></i>
                  Edit
                </button>
              ) : (
                <button
                  className="button btn-xs btn-o-primary primary"
                  onClick={() => setIsHighlightModalOpen(true)}
                >
                  <i className="ed-icon icon-plus-add i-xs primary"></i>
                  Add
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAbout;
