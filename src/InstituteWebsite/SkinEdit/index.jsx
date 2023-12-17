import React, { useState, useEffect } from "react";
import SkinEditOption from "./SkinEditOption";
import SkinPreview from "./SkinPreview";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import "./SkinPreview.scss";

import {
  getAllDefaultsTheme,
  getAllUserCustomeTheme,
  getActivateTheme,
  getCustomThemeEdit,
} from "../../store/actions/institutetheme";
import { EditStyleInstitute } from "./theme";
import { findSubdomain } from "../../store/actions/institutewebsite";
import ComponentLoader from "../../Common/Loader/ComponentLoader";
import { useParams } from "react-router-dom";
const SkinEdit = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const institutetheme = useSelector((state) => state.institutetheme);

  const [windowSize, setWindowSize] = useState({
    width: undefined,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let param = useParams();
  useEffect(() => {
    dispatch(getAllDefaultsTheme());
    dispatch(getAllUserCustomeTheme(user.user_institute));
    dispatch(getActivateTheme(user.user_institute));
    dispatch(findSubdomain(user.user_institute_institute_subdomain));
    dispatch(getCustomThemeEdit(param.id, user.user_institute));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.user_institute_institute_subdomain]);

  const [preview, setPreview] = useState();
  const managepreview = () => {
    setPreview(!preview);
  };
  return (
    <React.Fragment>
      {institutetheme ? (
        <ThemeProvider theme={institutetheme}>
          <EditStyleInstitute />
          <div className="SkinThemeWrapper displayblockskinpreviewmobile">
            {windowSize.width <= 700 ? (
              <React.Fragment>
                {!preview && <SkinEditOption />}
                <div className="mt-20">
                  {preview && <SkinPreview />}
                  <button
                    className="button btn-md button-theme button-block"
                    onClick={managepreview}
                  >
                    {preview ? "Customize Skin" : "Preview"}
                  </button>
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <SkinEditOption />
                <SkinPreview />
              </React.Fragment>
            )}
          </div>
        </ThemeProvider>
      ) : (
        <ComponentLoader />
      )}
    </React.Fragment>
  );
};

export default SkinEdit;
