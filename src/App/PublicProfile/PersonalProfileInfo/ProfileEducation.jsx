import React from "react";
import { IconEducation, IconHobbies } from "../../../Common/Icon";

const ProfileEducation = () => {
  const ProfileEducationData = [
    {
      id: 1,
      tenure: "Aug, 2020–Present",
      designation: "Master's in performing arts",
      name: "Rs Dance Academy",
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

  const ProfileHobbiesData = [
    {
      id: 1,
      name: "Dance Instruction",
    },
    {
      id: 2,
      name: "Yoga Instruction",
    },
    {
      id: 3,
      name: "Performing Arts",
    },
    {
      id: 4,
      name: "Visual Arts",
    },
    {
      id: 5,
      name: "Voice Acting",
    },
    {
      id: 5,
      name: "Cumputer Skills",
    },
    {
      id: 5,
      name: "Academic Tutoring",
    },
  ];
  return (
    <div className="ProfileEducationCst">
      <div className="ProfileEducation">
        <div className="ProfileEducationIcon">
          <i className="ed-icon icon-icon-education i-s base"></i>
        </div>
        <div className="ProfileEducationContent">
          <p className="text-lg w-500">Education</p>
          <ul className="ProfileEducationContentList">
            {ProfileEducationData.map((ProfileEducation) => {
              return (
                <li key={ProfileEducation.id}>
                  <p className="text-xxs">{ProfileEducation.tenure}</p>
                  <p className="text-xs w-600">
                    {ProfileEducation.designation}
                  </p>
                  <p className="text-xxs primary">
                    {ProfileEducation.name} - {ProfileEducation.location}
                  </p>
                  <p className="text-xxs">{ProfileEducation.detail}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="ProfileHobbies">
        <div className="ProfileHobbiesIcon">
          <i className="ed-icon icon-hobbies i-s base"></i>
        </div>
        <div className="ProfileHobbiesContent">
          <p className="text-lg w-500">Hobbies</p>
          <ul className="ProfileHobbiesContentList">
            {ProfileHobbiesData.map((ProfileHobbies) => {
              return (
                <li key={ProfileHobbies.id}>
                  <p className="text-xxs primary w-600">{ProfileHobbies.name}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileEducation;
