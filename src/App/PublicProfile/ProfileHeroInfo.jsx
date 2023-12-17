import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../../Common/Form/FormInput";
import {
  updateLevel,
  updateSkills,
  updateTaughtSubject,
  updateTeachingMOde,
} from "../../store/actions/publicProfile";

const ProfileHeroInfo = () => {
  const dispatch = useDispatch();
  const singleProfile = useSelector(
    (state) => state.publicProfile.singleProfile.data.userInfo
  );
  const userId = useSelector((state) => state.user._id);

  const id = singleProfile && singleProfile.user;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isModalOpenForLevelTaught, setIsModalOpenForLevelTaught] =
    useState(false);
  const [isModalOpenForTeachingMode, setIsModalOpenForTeachingMode] =
    useState(false);
  const [isModalOpenForTaughtSubject, setIsModalOpenForTaughtSubject] =
    useState(false);
  const [isModalOpenForSkills, setIsModalOpenForSkills] = useState(false);

  const [speciality, setSpeciality] = useState({
    level_taught: "",
    teaching_mode: "",
    taught_subject: "",
    skills: "",
  });

  const isUserFound = id === userId;
  const isNotStudent = singleProfile && singleProfile.role !== "Student";

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    const feildName = {
      ...speciality,
      [name]: value,
    };
    setSpeciality(feildName);
  };

  const handleSave = (mode) => {
    switch (mode) {
      case "level_taught": {
        dispatch(
          updateLevel(id, {
            level_taught: speciality.level_taught,
          })
        );
        setIsModalOpenForLevelTaught(false);
        break;
      }
      case "teaching_mode": {
        dispatch(
          updateTeachingMOde(id, {
            teaching_mode: speciality.teaching_mode,
          })
        );
        setIsModalOpenForTeachingMode(false);
        break;
      }
      case "taught_subject": {
        dispatch(
          updateTaughtSubject(id, {
            taught_subject: speciality.taught_subject,
          })
        );
        setIsModalOpenForTaughtSubject(false);
        break;
      }
      case "skills": {
        dispatch(
          updateSkills(id, {
            skills: speciality.skills,
          })
        );
        setIsModalOpenForSkills(false);
        break;
      }

      default:
    }
    setIsModalOpen(false);
  };

  return (
    <>
      {isNotStudent && (
        <div className="ProfileHeroInfoCst">
          {(isUserFound || (singleProfile && singleProfile.level_taught)) && (
            <div className="PH-HeroInfo-Item LevelTaught">
              <p className="text-xxs">Levels Taught</p>
              {isModalOpenForLevelTaught ? (
                <div className="formFieldwrap">
                  <FormInput
                    placeholder="Enter Your Teaching Level"
                    name="level_taught"
                    onChange={handleChange}
                    autoFocus={true}
                    defaultValue={singleProfile && singleProfile.level_taught}
                  />
                </div>
              ) : (
                <p className="text-xxs w-500 primary mt-3">
                  {/* Beginner, Intermediate, Advanced */}
                  {singleProfile && singleProfile.level_taught
                    ? singleProfile.level_taught
                    : "Not Added"}
                </p>
              )}

              {isUserFound && (
                <ControlButton
                  isAllModalOpen={isModalOpen}
                  setIsAllModalOpen={setIsModalOpen}
                  isModalOpen={isModalOpenForLevelTaught}
                  setIsModalOpen={setIsModalOpenForLevelTaught}
                  handleSave={handleSave}
                  mode="level_taught"
                  singleProfile={
                    singleProfile && singleProfile.level_taught ? true : false
                  }
                />
              )}
            </div>
          )}

          {(isUserFound || (singleProfile && singleProfile.teaching_mode)) && (
            <div className="PH-HeroInfo-Item TeachingMode">
              <p className="text-xxs">Mode of Teaching</p>
              {isModalOpenForTeachingMode ? (
                <FormInput
                  placeholder="Enter your mode of teaching"
                  onChange={handleChange}
                  name="teaching_mode"
                  autoFocus={true}
                  defaultValue={singleProfile && singleProfile.teaching_mode}
                />
              ) : (
                <p className="text-xxs w-500 primary mt-3">
                  {/* Online, Studio, Teacher Home */}
                  {singleProfile && singleProfile.teaching_mode
                    ? singleProfile.teaching_mode
                    : "Not Added"}
                </p>
              )}
              {isUserFound && (
                <ControlButton
                  isAllModalOpen={isModalOpen}
                  setIsAllModalOpen={setIsModalOpen}
                  isModalOpen={isModalOpenForTeachingMode}
                  setIsModalOpen={setIsModalOpenForTeachingMode}
                  handleSave={handleSave}
                  mode="teaching_mode"
                  singleProfile={singleProfile && singleProfile.teaching_mode}
                />
              )}
            </div>
          )}

          {(isUserFound || (singleProfile && singleProfile.taught_subject)) && (
            <div className="PH-HeroInfo-Item TaughtSubjects">
              <p className="text-xxs"> Subjects</p>
              {isModalOpenForTaughtSubject ? (
                <FormInput
                  placeholder="Enter your subjects"
                  onChange={handleChange}
                  name="taught_subject"
                  autoFocus={true}
                  defaultValue={singleProfile && singleProfile.taught_subject}
                />
              ) : (
                <p className="text-xxs w-500 primary mt-3">
                  {/* Modern Theatre,Contemporary,Jazz */}
                  {singleProfile && singleProfile.taught_subject
                    ? singleProfile.taught_subject
                    : "Not Added"}
                </p>
              )}
              {isUserFound && (
                <ControlButton
                  isAllModalOpen={isModalOpen}
                  setIsAllModalOpen={setIsModalOpen}
                  isModalOpen={isModalOpenForTaughtSubject}
                  setIsModalOpen={setIsModalOpenForTaughtSubject}
                  handleSave={handleSave}
                  mode="taught_subject"
                  singleProfile={singleProfile && singleProfile.taught_subject}
                />
              )}
            </div>
          )}

          {(isUserFound || (singleProfile && singleProfile.skills)) && (
            <div className="PH-HeroInfo-Item SkillsCst">
              <p className="text-xxs">Skills</p>

              {isModalOpenForSkills ? (
                <FormInput
                  placeholder="Enter Your Skills"
                  onChange={handleChange}
                  name="skills"
                  autoFocus={true}
                  defaultValue={singleProfile && singleProfile.skills}
                />
              ) : (
                <p className="text-xxs w-500 primary mt-3">
                  {/* Live Dance Classes, Hip Hop, Street Dance, Ballet, Ballroom */}
                  {singleProfile && singleProfile.skills
                    ? singleProfile.skills
                    : "Not Added"}
                </p>
              )}
              {isUserFound && (
                <ControlButton
                  isAllModalOpen={isModalOpen}
                  setIsAllModalOpen={setIsModalOpen}
                  isModalOpen={isModalOpenForSkills}
                  setIsModalOpen={setIsModalOpenForSkills}
                  handleSave={handleSave}
                  mode="skills"
                  singleProfile={singleProfile && singleProfile.skills}
                />
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProfileHeroInfo;

export function ControlButton({
  isModalOpen,
  setIsModalOpen,
  handleSave,
  isAllModalOpen,
  setIsAllModalOpen,
  mode,
  singleProfile,
}) {
  const openPopUp = () => {
    setIsModalOpen(true);
    setIsAllModalOpen(!isAllModalOpen);
  };

  const closePopUp = () => {
    setIsModalOpen(false);
    setIsAllModalOpen(!isAllModalOpen);
  };

  return (
    <React.Fragment>
      {!isModalOpen ? (
        singleProfile ? (
          <div className="PublicProfileActionButtonAfter">
            <button
              className="button btn-xs btn-o-primary primary"
              onClick={openPopUp}
            >
              <i className="ed-icon icon-edit i-xxs primary"></i>
              Edit
            </button>
          </div>
        ) : (
          <div className="PublicProfileActionButtonAfter">
            <button
              className="button btn-xs btn-o-primary primary"
              onClick={openPopUp}
            >
              <i className="ed-icon icon-plus-add i-xs primary"></i>
              Add
            </button>
          </div>
        )
      ) : (
        <div className="PublicProfileActionButtonAfter">
          <button
            className="button btn-xs btn-o-primary primary"
            onClick={() => handleSave(mode)}
          >
            Save
          </button>
          <button
            className="button btn-xs btn-o-primary primary"
            onClick={closePopUp}
          >
            Cancel
          </button>
        </div>
      )}
    </React.Fragment>
  );
}
