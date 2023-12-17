import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AppLink from "../../Common/AppLink";

import {
  activateDefaultTheme,
  previewDefaultTheme,
  cloneDefaultTheme,
  // getDefaultTheme,
  setThemeId,
  // activePreferredSideTheme,
  TemporaryDisplayPreffredTHeme,
} from "../../store/actions/institutetheme";
const PreferredSkinOption = ({ manageSkinOption, showTheme }) => {
  const dispatch = useDispatch();
  const defaultThemes = useSelector(
    (state) => state.institutetheme.defaultThemes.data
  );
  const userTheme = useSelector(
    (state) => state.institutetheme.userThemes.data
  );
  const activeTheme = useSelector(
    (state) => state.institutetheme.activedTheme.activeTheme
  );
  const [colorPallets] = useState([]);
  const [preventRedirect, setPreventRedirect] = useState(false);
  const history = useNavigate();
  const user = useSelector((state) => state.user);
  const DefaultThemeActive = (themeid) => {
    dispatch(activateDefaultTheme(user.user_institute, themeid));
    dispatch(setThemeId(themeid));
  };

  const cloneSkinTheme = (themeid) => {
    setPreventRedirect(true);
    dispatch(cloneDefaultTheme(user.user_institute, themeid));
  };
  const openthemes = (themeid) => {
    dispatch(previewDefaultTheme(themeid));
    dispatch(setThemeId(themeid));
  };

  const clonetheme = useSelector((state) => state.institutetheme.clonetheme);
  useEffect(() => {
    if (preventRedirect) {
      clonetheme._id && history(`/skin-edit/${clonetheme._id}`);
    }
  }, [clonetheme, history, preventRedirect]);

  useEffect(() => {
    colorPallet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultThemes]);

  function colorPallet() {
    let colorData;
    defaultThemes &&
      defaultThemes.map((item) => {
        colorData = {
          id: "",
          color: [],
        };
        colorData.id = item._id;
        colorData.color.push(item.website_background);
        colorData.color.push(item.regular_text_color);
        colorData.color.push(item.heading_text_color);
        colorData.color.push(item.hyperlink_text_color);
        colorData.color.push(item.button_background);
        colorData.color.push(item.button_text);
        colorData.color.push(item.button_hover_text_color);
        colorData.color.push(item.header_background);

        let color = colorData.color;
        let unique = [...new Set(color)];
        for (let i = 0; i < color.length; i++) {
          if (!unique.includes(color[i].toUpperCase())) {
            unique.push(color[i].toUpperCase());
          }
        }
        colorData = {
          ...colorData,
          color: unique,
        };
        colorPallets.push(colorData);
        unique = [];
      });
  }

  return (
    <React.Fragment>
      <div className="PreferredSkins preferedSkinThemebottomborder mt-20">
        <p
          className={`PreferredSkinsHead mb-10 ${showTheme === "Default" ? "active" : ""
            }`}
          onClick={() => manageSkinOption("Default")}
        >
          Preferred Skins
        </p>
        {showTheme === "Default" && (
          <div className="PreferredSkinsContent ">
            {defaultThemes.Message
              ? ""
              : defaultThemes.map((defaultTheme, idx) => (
                <div
                  key={idx}
                  className={`PreferredSkinsPalettes ${activeTheme &&
                    activeTheme.theme === defaultTheme._id &&
                    "active"
                    }`}
                  style={{ cursor: "pointer" }}
                  title="Click to Preview in Side"
                  onClick={() =>
                    dispatch(TemporaryDisplayPreffredTHeme(defaultTheme._id))
                  }
                >
                  <ul className="PS_Palettes_Color_body">
                    <li
                      style={{
                        backgroundColor: `${colorPallets.length > 0 &&
                          colorPallets[idx].color[0]
                          }`,
                      }}
                    ></li>
                    <li
                      style={{
                        backgroundColor: `${colorPallets.length > 0 &&
                          colorPallets[idx].color[1]
                          }`,
                      }}
                    ></li>
                    <li
                      style={{
                        backgroundColor: `${colorPallets.length > 0 &&
                          colorPallets[idx].color[2]
                          }`,
                      }}
                    ></li>
                    <li
                      style={{
                        backgroundColor: `${colorPallets.length > 0 &&
                          colorPallets[idx].color[3]
                          }`,
                      }}
                    ></li>
                  </ul>
                  <div className="PS_Palettes_Color_Footer">
                    <h1 className="text-xxs w-400">
                      {defaultTheme.theme_name}
                    </h1>
                    <div className="PS_Palettes_Action">
                      <button
                        onClick={() => DefaultThemeActive(defaultTheme._id)}
                        value={defaultTheme._id}
                        type="button"
                        className="button btn-2xs button-primary activethemepreview"
                      >
                        {activeTheme && activeTheme.theme === defaultTheme._id
                          ? "Activated"
                          : "Active"}
                      </button>
                      <AppLink
                        to={`/preview-skintheme/default/${defaultTheme._id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button
                          onClick={() => openthemes(defaultTheme._id)}
                          value={defaultTheme._id}
                          type="button"
                          className="button btn-s button-white primary  text-2xs"
                          title="Preview"
                        >
                          <span className="gg-eye"></span>
                        </button>
                      </AppLink>

                      {userTheme && userTheme.length < 5 && (
                        <button
                          to="skin-edit"
                          onClick={() => cloneSkinTheme(defaultTheme._id)}
                          value={defaultTheme._id}
                          type="button"
                          className="button text-2xs btn-sm button-white primary "
                          title="Clone and Edit"
                        >
                          <div className="clonebtnWrapper">
                            {" "}
                            <span className="cloneIconshape"></span>
                            <span className="bgclone-shape"></span>
                          </div>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default PreferredSkinOption;
