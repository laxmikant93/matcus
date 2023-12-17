import React from "react";
import { IconAffiliations } from "../../../Common/Icon";

const ProfileAffiliations = () => {
  const ProfileAffiliationsData = [
    {
      id: 1,
      tenure: "Aug, 2020–Present",
      designation: "Abacus Specialist",
      name: "Ballroom Moves",
      location: "South Delhi",
      detail:
        "I teach group classes and private clients. Group classes are athletic based working on stamina, endurance, balance, and muscle fatigue. Privates are tailored to the individual.",
    },
    {
      id: 2,
      tenure: "May, 2015–Aug, 2020",
      designation: "Yoga Instructor, Dance Teacher",
      name: "JB Global School",
      location: "New Delhi",
      detail:
        "Take Worldwide Online classes of Yoga, Strength & Flexibility, Dance (Indian classical & Western)",
    },
    {
      id: 3,
      tenure: "Aug, 2020–Present",
      designation: "Abacus Specialist",
      name: "Ballroom Moves",
      location: "South Delhi",
      detail:
        "I teach group classes and private clients. Group classes are athletic based working on stamina, endurance, balance, and muscle fatigue. Privates are tailored to the individual.",
    },
  ];

  return (
    <div className="ProfileAffiliationsCst">
      <div className="ProfileAffiliations">
        <div className="ProfileAffiliationsIcon">
          <i className="ed-icon icon-affiliations i-s base"></i>
        </div>
        <div className="ProfileAffiliationsContent">
          <p className="text-lg w-500">Affilixxxxxations</p>
          <ul className="ProfileAffiliationsContentList">
            {ProfileAffiliationsData.map((ProfileAffiliations) => {
              return (
                <li key={ProfileAffiliations.id}>
                  <p className="text-xxs">{ProfileAffiliations.tenure}</p>
                  <p className="text-xs primary">{ProfileAffiliations.name}</p>
                  <p className="text-xxs">{ProfileAffiliations.detail}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileAffiliations;
