import React, { useState, useEffect } from "react";
import SkinOption from "./SkinOption";
import SkinPreview from "./SkinPreview";
import "./SkinPreview.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDefaultsTheme,
  getAllUserCustomeTheme,
  getActivateTheme,
} from "../../store/actions/institutetheme";
import { ThemeProvider } from "styled-components";
import { EditStyleInstitute } from "./theme";
import { findSubdomain } from "../../store/actions/institutewebsite";
const SkinTheme = () => {
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

  useEffect(() => {
    dispatch(getAllDefaultsTheme());
    dispatch(getAllUserCustomeTheme(user.user_institute));
    dispatch(getActivateTheme(user.user_institute));
    dispatch(findSubdomain(user.user_institute_institute_subdomain));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [preview, setPreview] = useState();
  const managepreview = () => {
    setPreview(!preview);
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={institutetheme}>
        <EditStyleInstitute />
        <div className="SkinThemeWrapper displayblockskinpreviewmobile">
          {windowSize.width <= 992 ? (
            <React.Fragment>
              {!preview && <SkinOption />}
              {preview && <SkinPreview />}
              <div className="customise-preview-btn mt-20">
                <button className="button btn-md button-theme" onClick={managepreview}>
                  {preview ? "Customize Skin" : "Preview"}
                </button>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <SkinOption />
              <SkinPreview />
            </React.Fragment>
          )}
        </div>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default SkinTheme;
