import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AppLink from "../../Common/AppLink";
import Popup from "../../Common/Popup";
import UseOutsideClick from "../../Common/UseOutsideClick";

import {
  activateCustomTheme,
  deleteCustomTheme,
  previewCustomeTheme,
  getCustomThemeEdit,
  setThemeId,
  TemporaryDisplayCustomTHeme,
} from "../../store/actions/institutetheme";
const CustomSkinOption = ({
  manageSkinOption,
  manageSkinOption_parameter,
  showTheme,
  state,
}) => {
  const dispatch = useDispatch();
  const userThemes = useSelector(
    (state) => state.institutetheme.userThemes.data
  );

  const activeTheme = useSelector(
    (state) => state.institutetheme.activedTheme.activeTheme
  );

  const RemovePopToggleRef = useRef();

  const [RemovePop, setRemovePop] = useState(false);
  const [deleteID, setDeleteID] = useState("");
  const [colorPallets, setColorPallets] = useState([]);
  const [colorPalletsIDS, setColorPalletIDS] = useState([]);
  const user = useSelector((state) => state.user);

  const activateCustomThemeValue = (themeid) => {
    dispatch(activateCustomTheme(user.user_institute, themeid));
    dispatch(setThemeId(themeid));
  };

  const deleteCustomThemeValue = (themeid, idx) => {
    dispatch(deleteCustomTheme(user._id, themeid));
    // colorPallets.filter((data) => {
    //   return data !== themeid;
    let pikachu = colorPallets.filter((data, index) => {
      return index !== idx;
    });
    setColorPallets(pikachu);
    setRemovePop(!RemovePop);
  };
  const openthemes = (themeid) => {
    dispatch(previewCustomeTheme(themeid));
    dispatch(setThemeId(themeid));
  };
  const history = useNavigate();
  const openCloneEdit = (themeid) => {
    dispatch(getCustomThemeEdit(themeid, user.user_institute));
    history(`/skin-edit/${themeid}`);
    // window.open(`/skin-edit/${themeid}`)
  };

  // const openSidePreview = (themeid) => {
  //   dispatch(getCustomTheme(themeid));
  // };
  const RemovePopState = (_id) => {
    setRemovePop(!RemovePop);
    setDeleteID(_id);
  };
  UseOutsideClick(RemovePopToggleRef, () => {
    if (RemovePop) setRemovePop(false);
  });

  function colorPallet() {
    let colorData;
    let unique = [];
    userThemes &&
      userThemes.map((item) => {
        colorData = {
          id: "",
          color: [],
        };

        if (!colorPalletsIDS.includes(item._id)) {
          colorPalletsIDS.push(item._id);
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
        }
        //  '#6B3395', '#00194F'
      });
  }
  useEffect(() => {
    colorPallet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userThemes]);
  return (
    <React.Fragment>
      <div className="CustomSkins mt-30">
        <p
          className={`CustomSkinsHead mb-10 ${showTheme === "Custom" ? "active" : ""
            }`}
          onClick={() => manageSkinOption("Custom")}
        >
          Added custom skin by you
        </p>
        {showTheme === "Custom" && (
          <div className="CustomSkinsContent">
            {userThemes.Message
              ? ""
              : userThemes.map((userTheme, idx) => (
                <div
                  key={idx}
                  className={`CustomSkinsPalettes ${activeTheme &&
                    activeTheme.theme === userTheme._id &&
                    "active"
                    }`}
                  style={{ cursor: "pointer" }}
                  title="Click to Preview in Side"
                >
                  <ul
                    className="CS_Palettes_Color_body"
                    onClick={() =>
                      dispatch(TemporaryDisplayCustomTHeme(userTheme._id))
                    }
                  >
                    <li
                      style={{
                        backgroundColor: `${colorPallets.length > 0 && colorPallets[idx]
                          ? colorPallets[idx].color[0]
                          : "#FFFFFF"
                          }`,
                      }}
                    ></li>
                    <li
                      style={{
                        backgroundColor: `${colorPallets.length > 0 && colorPallets[idx]
                          ? colorPallets[idx].color[1]
                          : "#FFFFFF"
                          }`,
                      }}
                    ></li>
                    <li
                      style={{
                        backgroundColor: `${colorPallets.length > 0 && colorPallets[idx]
                          ? colorPallets[idx].color[2]
                          : "#FFFFFF"
                          }`,
                      }}
                    ></li>
                    <li
                      style={{
                        backgroundColor: `${colorPallets.length > 0 && colorPallets[idx]
                          ? colorPallets[idx].color[3]
                          : "#FFFFFF"
                          }`,
                      }}
                    ></li>
                  </ul>
                  <div className="CS_Palettes_Color_Footer">
                    <p className="text-xs w-500">{userTheme.theme_name}</p>
                    <div className="">
                      <button
                        type="button"
                        className="button btn-xs button-primary activethemepreview"
                        title={`Activate ${userTheme.theme_name} theme now`}
                        onClick={() =>
                          activateCustomThemeValue(userTheme._id)
                        }
                        value={userTheme._id}
                        disabled={
                          activeTheme && activeTheme.theme === userTheme._id
                            ? true
                            : false
                        }
                      >
                        {activeTheme && activeTheme.theme === userTheme._id
                          ? "Activated"
                          : "Activate "}
                      </button>
                    </div>
                    <div className="CS_Palettes_Action">
                      <AppLink
                        to={`/preview-skintheme/custom/${userTheme._id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <button
                          onClick={() => openthemes(userTheme._id)}
                          value={userTheme._id}
                          type="button"
                          title="Live Preview"
                          className="button btn-xs button-white primary"
                        >
                          <span className="gg-eye"></span>
                        </button>
                      </AppLink>

                      <button
                        onClick={() => openCloneEdit(userTheme._id)}
                        value={userTheme._id}
                        type="button"
                        title="Edit Skin"
                        className="button btn-xs button-white primary"
                      >
                        <i className="ed-icon i-xs primary icon-edit"></i>
                      </button>

                      {activeTheme.theme === userTheme._id ? (
                        ""
                      ) : (
                        <>
                          <button
                            onClick={() => RemovePopState(userTheme._id)}
                            value={userTheme._id}
                            type="button"
                            title="Delete Skin"
                            className="button btn-xs button-white primary"
                          >
                            <i className="ed-icon i-xs primary icon-delete"></i>
                          </button>

                          {
                            //Remove popup
                            userTheme._id === deleteID && RemovePop && (
                              <Popup
                                show={RemovePop}
                                RemovePopToggleRef={RemovePopToggleRef}
                                CancelProp={() => setRemovePop(!RemovePop)}
                                RemoveProp={() =>
                                  deleteCustomThemeValue(userTheme._id, idx)
                                }
                              // loading={deleteReviewLoading}
                              >
                                <p className="gray text-xxs w-300">
                                  You are about to remove this Skin.
                                </p>
                                <p className="dgray text-xxs w-400">
                                  Are you sure?
                                </p>
                              </Popup>
                            )
                          }
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            {userThemes && userThemes.length < 5 && (
              <a href="create-skin">
                <div className="AddCustomSkinsPalettes">
                  <i className="white">&#43;</i>
                  <h1 className="text-xs primary w-400 ">Add New skins</h1>
                </div>
              </a>
            )}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};
export default CustomSkinOption;
