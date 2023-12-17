import React from "react";
import { IconLanguages } from "../../../Common/Icon";

const ProfileLanguages = () => {
  const ProfileLanguageData = [
    {
      id: 1,
      name: "Screen Actors Guild",
      type: "Fluent / Native Proficiency",
    },
    {
      id: 2,
      name: "Screen Actors Guild",
      type: "Fluent / Native Proficiency",
    },
    {
      id: 3,
      name: "Screen Actors Guild",
      type: "Fluent / Native Proficiency",
    },
    {
      id: 3,
      name: "Screen Actors Guild",
      type: "Fluent / Native Proficiency",
    },
  ];
  return (
    <div className="ProfileLanguagesCst">
      <div className="ProfileLanguages">
        <div className="ProfileLanguagesIcon">
          <i className="ed-icon icon-languages i-s base"></i>
        </div>
        <div className="ProfileLanguagesContent">
          <p className="text-lg w-500">Locations</p>
          <ul className="ProfileLanguagesContentList">
            {ProfileLanguageData.map((ProfileLanguage) => {
              return (
                <li key={ProfileLanguages.id}>
                  <p className="text-xs primary">{ProfileLanguage.name}</p>
                  <p className="text-xxs">{ProfileLanguage.type}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileLanguages;
