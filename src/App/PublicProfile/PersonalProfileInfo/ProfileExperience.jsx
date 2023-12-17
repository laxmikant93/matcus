import React from "react";
import { IconExperience, IconAwards } from "../../../Common/Icon";

const ProfileExperience = () => {
  const ProfileExperienceData = [
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

  const ProfileAwardsData = [
    {
      id: 1,
      month: "Aug",
      year: "2015",
      name: "2018 HOLA Award - Contributing Choreography",
      detail: "Hispanic Organization for Latin Actors.",
    },
    {
      id: 2,
      month: "Aug",
      year: "2015",
      name: "2018 HOLA Award - Contributing Choreography",
      detail: "Hispanic Organization for Latin Actors.",
    },
    {
      id: 3,
      month: "Aug",
      year: "2015",
      name: "2018 HOLA Award - Contributing Choreography",
      detail: "Hispanic Organization for Latin Actors.",
    },
  ];
  return (
    <div className="ProfileExperienceCst">
      <div className="ProfileExperience">
        <div className="ProfileExperienceIcon">
          <i className="ed-icon icon-experience i-s base"></i>
        </div>
        <div className="ProfileExperienceContent">
          <p className="text-lg w-500">Experience</p>
          <ul className="ProfileExperienceContentList">
            {ProfileExperienceData.map((ProfileExperience) => {
              return (
                <li key={ProfileExperience.id}>
                  <p className="text-xxs">{ProfileExperience.tenure}</p>
                  <p className="text-xs w-600">
                    {ProfileExperience.designation}
                  </p>
                  <p className="text-xxs primary">
                    {ProfileExperience.name} - {ProfileExperience.location}
                  </p>
                  <p className="text-xxs">{ProfileExperience.detail}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="ProfileAwards">
        <div className="ProfileAwardsIcon">
          <i className="ed-icon icon-Awards i-s base"></i>
        </div>
        <div className="ProfileAwardsContent">
          <p className="text-lg w-500">Awards</p>
          <ul className="ProfileAwardsContentList">
            {ProfileAwardsData.map((ProfileAwards) => {
              return (
                <li key={ProfileAwards.id}>
                  <p className="text-xxs">
                    {ProfileAwards.month}&nbsp;
                    {ProfileAwards.year}
                  </p>
                  <p className="text-xxs w-600">{ProfileAwards.name}</p>
                  <p className="text-xxs">{ProfileAwards.detail}</p>
                </li>
              );
            })}
          </ul>
          <button className="button btn-sm btn-o-primary primary mt-20">
            View all Awards
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileExperience;
