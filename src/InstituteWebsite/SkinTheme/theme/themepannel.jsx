import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FormInputColor from "../../Common/Form/FormInputColor";
import {
  getActivateTheme,
  getPublicTheme,
} from "../../store/actions/institutetheme";
const Themepannel = ({ onChange }) => {
  const dispatch = useDispatch();
  const publicinstitute = useSelector((state) => state.institutewebsite);

  const handleColorChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  useEffect(() => {
    if (publicinstitute.data._id) {
      dispatch(getActivateTheme(publicinstitute.data._id));
    } else if (publicinstitute.data._id) {

      dispatch(getPublicTheme(publicinstitute.data._id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicinstitute]);

  const themeDetail = useSelector((state) => state.institutetheme);

  return (
    <div style={{ margin: "2rem" }}>
      <fieldset
        title="Color Palette"
        style={{ border: "1px solid", padding: "1.5rem" }}
      >
        <legend style={{ backgroundColor: "gray", padding: "0.5rem" }}>
          Color Palette
        </legend>
        <div style={{ width: "15%", float: "left" }}>
          <FormInputColor
            name="website_background"
            onChange={handleColorChange}
            value={themeDetail[themeDetail.activeTheme].website_background}
            label="Website background"
          />{" "}
        </div>
        <div style={{ width: "15%", float: "left" }}>
          <FormInputColor
            name="regular_text_color"
            onChange={handleColorChange}
            value={themeDetail[themeDetail.activeTheme].regular_text_color}
            label="Regular text color"
          />{" "}
        </div>
        <div style={{ width: "15%", float: "left" }}>
          <FormInputColor
            name="heading_text_color"
            onChange={handleColorChange}
            value={themeDetail[themeDetail.activeTheme].heading_text_color}
            label="Heading text color"
          />{" "}
        </div>
        <div style={{ width: "15%", float: "left" }}>
          <FormInputColor
            name="hyperlink_text_color"
            onChange={handleColorChange}
            value={themeDetail[themeDetail.activeTheme].hyperlink_text_color}
            label="Hyperlink text color"
          />{" "}
        </div>
        <div style={{ width: "15%", float: "left" }}>
          <FormInputColor
            name="hyperlink_hover_color"
            onChange={handleColorChange}
            value={themeDetail[themeDetail.activeTheme].hyperlink_hover_color}
            label="Hyperlink hover color"
          />{" "}
        </div>
        <div style={{ width: "15%", float: "left" }}>
          <FormInputColor
            name="button_background"
            onChange={handleColorChange}
            value={themeDetail[themeDetail.activeTheme].button_background}
            label="Button background"
          />{" "}
        </div>
        <div style={{ width: "15%", float: "left" }}>
          <FormInputColor
            name="button_text"
            onChange={handleColorChange}
            value={themeDetail[themeDetail.activeTheme].button_text}
            label="Button text"
          />{" "}
        </div>
        <div style={{ width: "15%", float: "left" }}>
          <FormInputColor
            name="button_hover_background"
            onChange={handleColorChange}
            value={themeDetail[themeDetail.activeTheme].button_hover_background}
            label="Button hover background"
          />{" "}
        </div>
        <div style={{ width: "15%", float: "left" }}>
          <FormInputColor
            name="button_hover_text_color"
            onChange={handleColorChange}
            value={themeDetail[themeDetail.activeTheme].button_hover_text_color}
            label="Button hover text color"
          />{" "}
        </div>
      </fieldset>

      <fieldset
        title="Header & Menu"
        style={{ border: "1px solid", padding: "1.5rem", marginTop: "0.5rem" }}
      >
        <legend style={{ backgroundColor: "gray", padding: "0.5rem" }}>
          Header & Menu
        </legend>
        <div style={{ width: "15%", float: "left" }}>
          <FormInputColor
            name="header_background"
            onChange={handleColorChange}
            value={themeDetail[themeDetail.activeTheme].header_background}
            label="Header Background"
          />{" "}
        </div>
        <div style={{ width: "15%", float: "left" }}>
          <FormInputColor
            name="menu_background"
            onChange={handleColorChange}
            value={themeDetail[themeDetail.activeTheme].menu_background}
            label="Menu Background"
          />{" "}
        </div>
        <div style={{ width: "15%", float: "left" }}>
          <FormInputColor
            name="menu_text_color"
            onChange={handleColorChange}
            value={themeDetail[themeDetail.activeTheme].menu_text_color}
            label="Menu Text color"
          />{" "}
        </div>
      </fieldset>

      <fieldset
        title="Banner"
        style={{ border: "1px solid", padding: "1.5rem", marginTop: "0.5rem" }}
      >
        <legend style={{ backgroundColor: "gray", padding: "0.5rem" }}>
          Banner
        </legend>
      </fieldset>

      <fieldset
        title="Typography"
        style={{ border: "1px solid", padding: "1.5rem", marginTop: "0.5rem" }}
      >
        <legend style={{ backgroundColor: "gray", padding: "0.5rem" }}>
          Typography
        </legend>
      </fieldset>

      <fieldset
        title="Font & Weight"
        style={{ border: "1px solid", padding: "1.5rem", marginTop: "0.5rem" }}
      >
        <legend style={{ backgroundColor: "gray", padding: "0.5rem" }}>
          Font & Weight
        </legend>
      </fieldset>
    </div>
  );
};

export default React.memo(Themepannel);
