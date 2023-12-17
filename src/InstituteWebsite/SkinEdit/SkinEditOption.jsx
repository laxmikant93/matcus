import React, { useEffect, useState } from "react";
// import styled, { createGlobalStyle } from "styled-components";
// import AppLink from "../../Common/AppLink";
import { useNavigate, useParams } from "react-router-dom";

import FormInput from "../../Common/Form/FormInput";
import ValidationFile from "../../Classes/ValidationFile";
import {
  changeThemeProperty,
  editCustomTheme,
  activateCustomTheme,
  changeThemePropertySize,
  createNewCustomTheme,
  cloneThemeEmpty,
  emptyNewCustomTheme,
} from "../../store/actions/institutetheme";
import { useDispatch, useSelector } from "react-redux";
// import { ChromePicker } from "react-color";
import InputColorPicker from "../../Common/Form/InputColorPicker";
import Breadcrumb from "../../Common/Breadcrumb";
import BreadcrumbItem from "../../Common/Breadcrumb/BreadcrumbItem";
import FormError from "../../Common/Form/FormError";
import SelectInput from "../../Common/Form/SelectInput";

const SkinEditOption = ({ onChange }) => {
  const [showEditTheme, setshowEditTheme] = useState(-1);
  const [themeId, setThemeId] = useState("")
  const [valid, setValid] = useState(false);
  function manageSkinEditOption(index) {
    setshowEditTheme(showEditTheme === index ? -1 : index);
  }
  const history = useNavigate();
  const param = useParams();
  const [regularFont, setRegularFont] = useState();
  const [headerSubFont, setHeaderSubFont] = useState();
  const [subheaderSubFont, setSubHeaderSubFont] = useState();
  const dispatch = useDispatch();

  const institutetheme = useSelector(
    (state) => state.institutetheme.clonetheme
  );
  const customTheme = useSelector(
    (state) => state.institutetheme.newCustomTheme
  );

  const user = useSelector((state) => state.user);

  const font = useSelector((state) => state.fonts.list);

  // const theme_name = institutetheme && institutetheme.theme_name;
  const [themeName, setThemeName] = useState({ theme_name: { value: "", valid: false } });
  const [inputvalue, setInputvalue] = useState({
    theme_name: "",
    website_background: "#F6F6F6",
    regular_text_color: "#0A0A0A",
    heading_text_color: "#0A0A0A",
    sub_heading_text_color: "#F17013",
    hyperlink_text_color: "#EBC05E",
    hyperlink_hover_color: "#0A0A0A",
    button_background: "#EBC05E",
    button_text: "#0A0A0A",
    button_hover_background: "#0A0A0A",
    button_hover_text_color: "#FFFFFF",
    header_background: "#0A0A0A",
    menu_background: "#0A0A0A",
    menu_text_color: "#EBC05E",
    primary_background: "#D9D9D9",
    primary_text_color: "#0A0A0A",
    secondary_background: "#EBC15F",
    secondary_text_color: "#FFFFFF",
    regular_body_font: "",
    regular_body_fonturl: "",
    heading_sub_font: "",
    heading_sub_fonturl: "",
    subheading_sub_font: "",
    subheading_sub_fonturl: "",
    banner: "FixWidth",
    banner_background: "#D9D9D9",
    banner_text_color: "#0A0A0A",
    body_text_size: "",
    body_text_type: "",
    heading_size: "",
    heading_type: "",
    sub_heading_size: "",
    sub_heading_type: "",
    regular_line_height: "",
    regular_letter_spacing: "",
    heading_line_height: "",
    heading_letter_spacing: "",
    subheading_line_height: "",
    subheading_letter_spacing: "",
    circle_background_image: "#",
    circle_background_line: "#",
    footer_background_color: "#121212",
    footer_text_color: "#f1f1f1",
    footer_link_color: "#f1f1f1",
    footer_link_hover_color: "#146efa",
    menu_hover_text_color: "#ffffff",
  });

  const handleColorTheme = (name, color) => {
    setInputvalue({ ...inputvalue, [name]: color.hex });
    dispatch(changeThemeProperty(name, color.hex, themeId));
  };

  const handleThemeTitle = (name, e) => {
    setValid(false);
    let value = e.target.value;
    let data = {
      ...themeName,
      theme_name: {
        value: value,
        valid: ValidationFile.isEmpty(value),
      },
    };
    setThemeName(data);
    setInputvalue({ ...inputvalue, [name]: e.target.value });
    dispatch(changeThemeProperty(name, value, themeId));
  };
  const handleColorThemeFromInputField = (name, e) => {
    setInputvalue({ ...inputvalue, [name]: e.target.value });
    dispatch(changeThemeProperty(name, e.target.value, themeId));
  };
  const handleRegularBodySize = (name, name1, name2, e) => {
    let value = e.target.value + "px";
    setInputvalue({ ...inputvalue, [name]: value });
    dispatch(changeThemePropertySize([name1], [name2], value));
  };
  const handleLineSpacing = (name, e) => {
    let value = e.target.value + "px";
    setInputvalue({ ...inputvalue, [name]: value });
    dispatch(changeThemeProperty(name, value, themeId));
  };
  const handleRegularBodyType = (name, name1, name2, e) => {
    setInputvalue({ ...inputvalue, [name]: e.target.value });
    dispatch(changeThemePropertySize([name1], [name2], e.target.value));
  };

  const handleBannerValue = (name, value) => {
    setInputvalue({ ...inputvalue, [name]: value });
    dispatch(changeThemeProperty(name, value, themeId));
  };
  const saveCloneThme = (themeid) => {
    setValid(true);
    if (themeName.theme_name.valid) {
      const data = { ...inputvalue, _id: themeid };
      dispatch(editCustomTheme(user.user_institute, data));
      history("/skin-theme");
    }
  };

  const saveAndActivateCloneThme = (themeid) => {
    setValid(true);
    if (themeName.theme_name.valid) {
      const data = { ...inputvalue, _id: themeid };
      dispatch(editCustomTheme(user.user_institute, data));
      dispatch(activateCustomTheme(user.user_institute, themeid));
      history("/skin-theme");
    }
  };

  const saveTheme = () => {
    setValid(true);
    if (themeName.theme_name.valid) {
      dispatch(createNewCustomTheme(user.user_institute, inputvalue));
      history("/skin-theme");
    }
  };

  const saveAndActivateThme = () => {
    setValid(true);
    if (themeName.theme_name.valid) {
      dispatch(createNewCustomTheme(user.user_institute, inputvalue));
    }
  };

  useEffect(() => {
    customTheme._id && dispatch(activateCustomTheme(user.user_institute, customTheme._id));
    return () => {
      dispatch(emptyNewCustomTheme());
      history("/skin-theme");
    }
  }, [customTheme])
  const cancelEdit = () => {
    history("/skin-theme");
  };

  // for Regular fonts change and regular fonts url

  const onRegularFontChange = (name, e) => {
    // handleColorTheme(name, e);
    function isValue(value) {
      if (value.fontname === e.target.value) {
        setRegularFont(value);
        setInputvalue({ ...inputvalue, [name]: e.target.value });
        dispatch(changeThemeProperty(name, e.target.value, themeId));
        return value;
      }
    }
    let d = font.filter(isValue);
    handleRegularFontUrl("regular_body_fonturl", d[0].url);
  };
  const handleRegularFontUrl = (name, value) => {
    setInputvalue({ ...inputvalue, [name]: value });
    dispatch(changeThemeProperty(name, value, themeId));
  };

  // for header header fonts change and url

  const onHeaderSubFontChange = (name, e) => {
    // handleColorTheme(name, e);
    function isValue(value) {
      if (value.fontname === e.target.value) {
        setHeaderSubFont(value);
        setInputvalue({ ...inputvalue, [name]: e.target.value });
        dispatch(changeThemeProperty(name, e.target.value, themeId));
        return value;
      }
    }
    let d = font.filter(isValue);
    handleHeaderSubFontUrl("heading_sub_fonturl", d[0].url);
  };

  const handleHeaderSubFontUrl = (name, value) => {
    setInputvalue({ ...inputvalue, [name]: value });
    dispatch(changeThemeProperty(name, value, themeId));
  };

  // for sub header fonts change and url

  const onSubHeaderSubFontChange = (name, e) => {
    // handleColorTheme(name, e);
    function isValue(value) {
      if (value.fontname === e.target.value) {
        setSubHeaderSubFont(value);
        setInputvalue({ ...inputvalue, [name]: e.target.value });
        dispatch(changeThemeProperty(name, e.target.value, themeId));
        return value;
      }
    }
    let d = font.filter(isValue);
    handleSubHeaderSubFontUrl("subheading_sub_fonturl", d[0].url);
  };

  const handleSubHeaderSubFontUrl = (name, value) => {
    setInputvalue({ ...inputvalue, [name]: value });
    dispatch(changeThemeProperty(name, value, themeId));
  };
  useEffect(() => {
    if (window.location.pathname.includes("skin-edit")) {
      param.id ? setThemeId(param.id) : setThemeId("");
    }
  }, [])
  useEffect(() => {
    // let institutetheme = institutetheme && institutetheme;
    setInputvalue({
      _id: institutetheme && institutetheme._id ? institutetheme._id : "",
      theme_name:
        institutetheme && institutetheme.theme_name
          ? institutetheme.theme_name
          : inputvalue.theme_name,
      website_background:
        institutetheme && institutetheme.website_background
          ? institutetheme.website_background
          : inputvalue.website_background,
      regular_text_color:
        institutetheme && institutetheme.regular_text_color
          ? institutetheme.regular_text_color
          : inputvalue.regular_text_color,
      heading_text_color:
        institutetheme && institutetheme.heading_text_color
          ? institutetheme.heading_text_color
          : inputvalue.heading_text_color,
      sub_heading_text_color:
        institutetheme && institutetheme.sub_heading_text_color
          ? institutetheme.sub_heading_text_color
          : inputvalue.sub_heading_text_color,
      hyperlink_text_color:
        institutetheme && institutetheme.hyperlink_text_color
          ? institutetheme.hyperlink_text_color
          : inputvalue.hyperlink_text_color,
      hyperlink_hover_color:
        institutetheme && institutetheme.hyperlink_hover_color
          ? institutetheme.hyperlink_hover_color
          : inputvalue.hyperlink_hover_color,
      button_background:
        institutetheme && institutetheme.button_background
          ? institutetheme.button_background
          : inputvalue.button_background,
      button_text:
        institutetheme && institutetheme.button_text
          ? institutetheme.button_text
          : inputvalue.button_text,
      button_hover_background:
        institutetheme && institutetheme.button_hover_background
          ? institutetheme.button_hover_background
          : inputvalue.button_hover_background,
      button_hover_text_color:
        institutetheme && institutetheme.button_hover_text_color
          ? institutetheme.button_hover_text_color
          : inputvalue.button_hover_text_color,
      header_background:
        institutetheme && institutetheme.header_background
          ? institutetheme.header_background
          : inputvalue.header_background,
      menu_background:
        institutetheme && institutetheme.menu_background
          ? institutetheme.menu_background
          : inputvalue.menu_background,
      menu_text_color:
        institutetheme && institutetheme.menu_text_color
          ? institutetheme.menu_text_color
          : inputvalue.menu_text_color,
      primary_background:
        institutetheme && institutetheme.primary_background
          ? institutetheme.primary_background
          : inputvalue.primary_background,
      primary_text_color:
        institutetheme && institutetheme.primary_text_color
          ? institutetheme.primary_text_color
          : inputvalue.primary_text_color,
      secondary_background:
        institutetheme && institutetheme.secondary_background
          ? institutetheme.secondary_background
          : inputvalue.secondary_background,
      secondary_text_color:
        institutetheme && institutetheme.secondary_text_color
          ? institutetheme.secondary_text_color
          : inputvalue.secondary_text_color,

      regular_body_font:
        institutetheme && institutetheme.regular_body_font
          ? institutetheme.regular_body_font
          : inputvalue.regular_body_font,
      regular_body_fonturl:
        institutetheme && institutetheme.regular_body_fonturl
          ? institutetheme.regular_body_fonturl
          : inputvalue.regular_body_fonturl,
      heading_sub_font:
        institutetheme && institutetheme.heading_sub_font
          ? institutetheme.heading_sub_font
          : inputvalue.heading_sub_font,
      heading_sub_fonturl:
        institutetheme && institutetheme.heading_sub_fonturl
          ? institutetheme.heading_sub_fonturl
          : inputvalue.heading_sub_fonturl,
      subheading_sub_font:
        institutetheme && institutetheme.subheading_sub_font
          ? institutetheme.subheading_sub_font
          : inputvalue.subheading_sub_font,
      subheading_sub_fonturl:
        institutetheme && institutetheme.subheading_sub_fonturl
          ? institutetheme.subheading_sub_fonturl
          : inputvalue.subheading_sub_fonturl,
      banner:
        institutetheme && institutetheme.banner ? institutetheme.banner : inputvalue.banner,
      banner_background:
        institutetheme && institutetheme.banner_background
          ? institutetheme.banner_background
          : inputvalue.banner_background,
      banner_text_color:
        institutetheme && institutetheme.banner_text_color
          ? institutetheme.banner_text_color
          : inputvalue.banner_text_color,
      body_text_size:
        institutetheme &&
          institutetheme.body_text &&
          institutetheme.body_text.size
          ? institutetheme.body_text.size
          : inputvalue.body_text_size,
      body_text_type:
        institutetheme &&
          institutetheme.body_text &&
          institutetheme.body_text.text_type
          ? institutetheme.body_text.text_type
          : inputvalue.body_text_type,
      heading_size:
        institutetheme && institutetheme.heading && institutetheme.heading.size
          ? institutetheme.heading.size
          : inputvalue.heading_size,
      heading_type:
        institutetheme &&
          institutetheme.heading &&
          institutetheme.heading.text_type
          ? institutetheme.heading.text_type
          : inputvalue.heading_type,
      sub_heading_size:
        institutetheme &&
          institutetheme.sub_heading &&
          institutetheme.sub_heading.size
          ? institutetheme.sub_heading.size
          : inputvalue.sub_heading_size,
      sub_heading_type:
        institutetheme &&
          institutetheme.sub_heading &&
          institutetheme.sub_heading.text_type
          ? institutetheme.sub_heading.text_type
          : inputvalue.sub_heading_type,
      regular_line_height:
        institutetheme && institutetheme.regular_line_height
          ? institutetheme.regular_line_height
          : inputvalue.regular_line_height,
      regular_letter_spacing:
        institutetheme && institutetheme.regular_letter_spacing
          ? institutetheme.regular_letter_spacing
          : inputvalue.regular_letter_spacing,
      heading_line_height:
        institutetheme && institutetheme.heading_line_height
          ? institutetheme.heading_line_height
          : inputvalue.heading_line_height,
      heading_letter_spacing:
        institutetheme && institutetheme.heading_letter_spacing
          ? institutetheme.heading_letter_spacing
          : inputvalue.heading_letter_spacing,
      subheading_line_height:
        institutetheme && institutetheme.subheading_line_height
          ? institutetheme.subheading_line_height
          : inputvalue.subheading_line_height,
      subheading_letter_spacing:
        institutetheme && institutetheme.subheading_letter_spacing
          ? institutetheme.subheading_letter_spacing
          : inputvalue.subheading_letter_spacing,
      circle_background_image:
        institutetheme && institutetheme.circle_background_image
          ? institutetheme.circle_background_image
          : inputvalue.circle_background_image,
      circle_background_line:
        institutetheme && institutetheme.circle_background_line
          ? institutetheme.circle_background_line
          : inputvalue.circle_background_line,
      footer_background_color:
        institutetheme && institutetheme.footer_background_color
          ? institutetheme.footer_background_color
          : inputvalue.footer_background_color,
      footer_text_color:
        institutetheme && institutetheme.footer_text_color
          ? institutetheme.footer_text_color
          : inputvalue.footer_text_color,
      footer_link_color:
        institutetheme && institutetheme.footer_link_color
          ? institutetheme.footer_link_color
          : inputvalue.footer_link_color,
      footer_link_hover_color:
        institutetheme && institutetheme.footer_link_hover_color
          ? institutetheme.footer_link_hover_color
          : inputvalue.footer_link_hover_color,
      menu_hover_text_color:
        institutetheme && institutetheme.menu_hover_text_color
          ? institutetheme.menu_hover_text_color
          : inputvalue.menu_hover_text_color,
    });
    setThemeName({
      theme_name: {
        value:
          institutetheme && institutetheme.theme_name
            ? institutetheme.theme_name
            : "",
        valid: institutetheme && institutetheme.theme_name
          ? true
          : false
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [institutetheme]);

  let number1 = inputvalue.body_text_size;
  var integer1 = parseInt(number1, 10);

  let number2 = inputvalue.heading_size;
  var integer2 = parseInt(number2, 10);

  let number3 = inputvalue.sub_heading_size;
  var integer3 = parseInt(number3, 10);

  let number4 = inputvalue.subheading_line_height;
  var integer4 = parseInt(number4, 10);

  let number5 = inputvalue.subheading_letter_spacing;
  var integer5 = parseInt(number5, 10);

  let number6 = inputvalue.heading_line_height;
  var integer6 = parseInt(number6, 10);

  let number7 = inputvalue.heading_letter_spacing;
  var integer7 = parseInt(number7, 10);

  let number8 = inputvalue.regular_line_height;
  var integer8 = parseInt(number8, 10);

  let number9 = inputvalue.regular_letter_spacing;
  var integer9 = parseInt(number9, 10);

  function paramCheck() {
    if (themeId) {
      return `/skin-edit/${themeId}`;
    } else {
      return `/create-skin`;
    }
  }

  useEffect(() => {
    return () => {
      dispatch(cloneThemeEmpty());
    };
  }, [dispatch]);

  return (
    <div className="skinEditWrapper">
      <div className="skinEditOptionWrapper">
        {/* <AppLink
          className="btnText SkinOption_Breadcrumb  primary underline text-xxs ml-10"
          to="/website-manage"
        >
          <i className="animate-r-arrow-icon back-i"></i>
          Manage Website
        </AppLink> */}
        <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          {/* <BreadcrumbItem to="/website-manage" title="Manage Website" /> */}
          <BreadcrumbItem to="/skin-theme" title="Skin Theme" />
          <BreadcrumbItem to={paramCheck()} title={themeId ? "Edit Skin" : "Create Skin"} />
        </Breadcrumb>
        {/* <PreferredSkinOption
          showTheme={showEditTheme}
          // manageSkinOption_parameter="preferref_skin" //!1
          manageSkinOption={manageSkinEditOption}
        /> */}
        <div className="divider"></div>
        <div className="ColorSkinTitle mt-30">
          <p className="text-xs w-500 mb-3">Color Skin Title*</p>
          <div className="formFieldwrap">
            <FormInput
              placeholder="Skin Title"
              name="theme_name"
              defaultValue={inputvalue.theme_name}
              onChange={(e) => handleThemeTitle("theme_name", e)}
            />
            <FormError
              show={!themeName.theme_name.valid && valid}
              error="Please enter theme name."
            />
          </div>
        </div>
        <div className="divider"></div>
        <div className="colorpaletteWrap">
          <p
            className={`colorpaletteHead mb-10 ${showEditTheme === "palette" ? "active" : ""
              }`}
            onClick={() => manageSkinEditOption("palette")}
          >
            Color Palette
          </p>
          {showEditTheme === "palette" && (
            <div className="colorPaletteContent mt-10">
              <div className="colorPaletteItemWrap">
                <label className="text-xxs capitalize">Website Background</label>
                <div className="colorPaletteItem mt-3">
                  {/* <div className="colorCodeValue">
                  {inputvalue.website_background}
                  </div> */}
                  <div className="colorCodeValue">
                    <input
                      className="inputhxscolorcode"
                      type="text"
                      value={inputvalue.website_background.toUpperCase()}
                      onChange={(e) =>
                        handleColorThemeFromInputField("website_background", e)
                      }
                    />
                  </div>
                  <div className="colorPaletteInput">
                    <InputColorPicker
                      selectedColor={inputvalue.website_background}
                      onChange={(color) =>
                        handleColorTheme("website_background", color)
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="colorPaletteItemWrap">
                <label className="text-xxs capitalize">Regular text color</label>
                <div className="colorPaletteItem mt-3">
                  <div className="colorCodeValue">
                    <input
                      className="inputhxscolorcode"
                      type="text"
                      value={inputvalue.regular_text_color.toUpperCase()}
                      onChange={(e) =>
                        handleColorThemeFromInputField("regular_text_color", e)
                      }
                    />
                  </div>
                  <div className="colorPaletteInput">
                    <InputColorPicker
                      selectedColor={inputvalue.regular_text_color}
                      onChange={(e) =>
                        handleColorTheme("regular_text_color", e)
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="colorPaletteItemWrap">
                <label className="text-xxs capitalize">Heading text color</label>
                <div className="colorPaletteItem mt-3">
                  <div className="colorCodeValue">
                    <input
                      className="inputhxscolorcode"
                      type="text"
                      value={inputvalue.heading_text_color.toUpperCase()}
                      onChange={(e) =>
                        handleColorThemeFromInputField("heading_text_color", e)
                      }
                    />
                  </div>
                  <div className="colorPaletteInput">
                    <InputColorPicker
                      selectedColor={inputvalue.heading_text_color}
                      onChange={(color) =>
                        handleColorTheme("heading_text_color", color)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="colorPaletteItemWrap">
                <label className="text-xxs capitalize">
                  Sub Heading text color
                </label>
                <div className="colorPaletteItem mt-3">
                  <div className="colorCodeValue">
                    <input
                      className="inputhxscolorcode"
                      type="text"
                      value={inputvalue.sub_heading_text_color.toUpperCase()}
                      onChange={(e) =>
                        handleColorThemeFromInputField(
                          "sub_heading_text_color",
                          e
                        )
                      }
                    />
                  </div>
                  <div className="colorPaletteInput">
                    <InputColorPicker
                      selectedColor={inputvalue.sub_heading_text_color}
                      onChange={(color) =>
                        handleColorTheme("sub_heading_text_color", color)
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="colorPaletteItemWrap">
                <label className="text-xxs capitalize">
                  Hyperlink text color
                </label>
                <div className="colorPaletteItem mt-3">
                  <div className="colorCodeValue">
                    <input
                      className=" inputhxscolorcode"
                      type="text"
                      value={inputvalue.hyperlink_text_color.toUpperCase()}
                      onChange={(e) =>
                        handleColorThemeFromInputField(
                          "hyperlink_text_color",
                          e
                        )
                      }
                    />
                  </div>
                  <div className="colorPaletteInput">
                    <InputColorPicker
                      selectedColor={inputvalue.hyperlink_text_color}
                      onChange={(color) =>
                        handleColorTheme("hyperlink_text_color", color)
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="colorPaletteItemWrap">
                <label className="text-xxs capitalize">
                  Hyperlink hover color
                </label>
                <div className="colorPaletteItem mt-3">
                  <div className="colorCodeValue">
                    <input
                      className=" inputhxscolorcode"
                      type="text"
                      value={inputvalue.hyperlink_hover_color.toUpperCase()}
                      onChange={(e) =>
                        handleColorThemeFromInputField(
                          "hyperlink_hover_color",
                          e
                        )
                      }
                    />
                  </div>
                  <div className="colorPaletteInput">
                    <InputColorPicker
                      selectedColor={inputvalue.hyperlink_hover_color}
                      onChange={(color) =>
                        handleColorTheme("hyperlink_hover_color", color)
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="colorPaletteItemWrap">
                <label className="text-xxs capitalize">Button background</label>
                <div className="colorPaletteItem mt-3">
                  <div className="colorCodeValue">
                    <input
                      className=" inputhxscolorcode"
                      type="text"
                      value={inputvalue.button_background.toUpperCase()}
                      onChange={(e) =>
                        handleColorThemeFromInputField("button_background", e)
                      }
                    />
                  </div>
                  <div className="colorPaletteInput">
                    <InputColorPicker
                      selectedColor={inputvalue.button_background}
                      onChange={(color) =>
                        handleColorTheme("button_background", color)
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="colorPaletteItemWrap">
                <label className="text-xxs capitalize">Button text</label>
                <div className="colorPaletteItem mt-3">
                  <div className="colorCodeValue">
                    <input
                      className=" inputhxscolorcode"
                      type="text"
                      value={inputvalue.button_text.toUpperCase()}
                      onChange={(e) =>
                        handleColorThemeFromInputField("button_text", e)
                      }
                    />
                  </div>
                  <div className="colorPaletteInput">
                    <InputColorPicker
                      selectedColor={inputvalue.button_text}
                      onChange={(color) =>
                        handleColorTheme("button_text", color)
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="colorPaletteItemWrap">
                <label className="text-xxs capitalize">
                  Button hover background
                </label>
                <div className="colorPaletteItem mt-3">
                  <div className="colorCodeValue">
                    <input
                      className=" inputhxscolorcode"
                      type="text"
                      value={inputvalue.button_hover_background.toUpperCase()}
                      onChange={(e) =>
                        handleColorThemeFromInputField(
                          "button_hover_background",
                          e
                        )
                      }
                    />
                  </div>
                  <div className="colorPaletteInput">
                    <InputColorPicker
                      selectedColor={inputvalue.button_hover_background}
                      onChange={(color) =>
                        handleColorTheme("button_hover_background", color)
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="colorPaletteItemWrap">
                <label className="text-xxs capitalize">
                  Button hover text color
                </label>
                <div className="colorPaletteItem mt-3">
                  <div className="colorCodeValue">
                    <input
                      className=" inputhxscolorcode"
                      type="text"
                      value={inputvalue.button_hover_text_color.toUpperCase()}
                      onChange={(e) =>
                        handleColorThemeFromInputField(
                          "button_hover_text_color",
                          e
                        )
                      }
                    />
                  </div>
                  <div className="colorPaletteInput">
                    <InputColorPicker
                      selectedColor={inputvalue.button_hover_text_color}
                      onChange={(color) =>
                        handleColorTheme("button_hover_text_color", color)
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="colorPaletteItemWrap">
                <label className="text-xxs capitalize">
                  Circle background Image
                </label>
                <div className="colorPaletteItem mt-3">
                  <div className="colorCodeValue">
                    <input
                      className=" inputhxscolorcode"
                      type="text"
                      value={inputvalue.circle_background_image.toUpperCase()}
                      onChange={(e) =>
                        handleColorThemeFromInputField(
                          "circle_background_image",
                          e
                        )
                      }
                    />
                  </div>
                  <div className="colorPaletteInput">
                    <InputColorPicker
                      selectedColor={inputvalue.circle_background_image}
                      onChange={(color) =>
                        handleColorTheme("circle_background_image", color)
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="colorPaletteItemWrap">
                <label className="text-xxs capitalize">
                  Circle background line
                </label>
                <div className="colorPaletteItem mt-3">
                  <div className="colorCodeValue">
                    <input
                      className=" inputhxscolorcode"
                      type="text"
                      value={inputvalue.circle_background_line.toUpperCase()}
                      onChange={(e) =>
                        handleColorThemeFromInputField(
                          "circle_background_line",
                          e
                        )
                      }
                    />
                  </div>
                  <div className="colorPaletteInput">
                    <InputColorPicker
                      selectedColor={inputvalue.circle_background_line}
                      onChange={(color) =>
                        handleColorTheme("circle_background_line", color)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="divider"></div>
        <div className="colorpaletteWrap">
          <p
            className={`colorpaletteHead mb-10 ${showEditTheme === "headerMenu" ? "active" : ""
              }`}
            onClick={() => manageSkinEditOption("headerMenu")}
          >
            Header & Menu
          </p>
          {showEditTheme === "headerMenu" && (
            <div className="colorPaletteContent mt-10">
              <div className="colorPaletteItemWrap">
                <label className="text-xxs capitalize">Header Background</label>
                <div className="colorPaletteItem mt-3">
                  <div className="colorCodeValue">
                    <input
                      className=" inputhxscolorcode"
                      type="text"
                      value={inputvalue.header_background.toUpperCase()}
                      onChange={(e) =>
                        handleColorThemeFromInputField("header_background", e)
                      }
                    />
                  </div>
                  <div className="colorPaletteInput">
                    <InputColorPicker
                      selectedColor={inputvalue.header_background}
                      onChange={(color) =>
                        handleColorTheme("header_background", color)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="colorPaletteItemWrap">
                <label className="text-xxs capitalize">Menu Background</label>
                <div className="colorPaletteItem mt-3">
                  <div className="colorCodeValue">
                    <input
                      className=" inputhxscolorcode"
                      type="text"
                      value={inputvalue.menu_background.toUpperCase()}
                      onChange={(e) =>
                        handleColorThemeFromInputField("menu_background", e)
                      }
                    />
                  </div>
                  <div className="colorPaletteInput">
                    <InputColorPicker
                      selectedColor={inputvalue.menu_background}
                      onChange={(color) =>
                        handleColorTheme("menu_background", color)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="colorPaletteItemWrap">
                <label className="text-xxs capitalize">Menu Text Color</label>
                <div className="colorPaletteItem mt-3">
                  <div className="colorCodeValue">
                    <input
                      className=" inputhxscolorcode"
                      type="text"
                      value={inputvalue.menu_text_color.toUpperCase()}
                      onChange={(e) =>
                        handleColorThemeFromInputField("menu_text_color", e)
                      }
                    />
                  </div>
                  <div className="colorPaletteInput">
                    <InputColorPicker
                      selectedColor={inputvalue.menu_text_color}
                      onChange={(color) =>
                        handleColorTheme("menu_text_color", color)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="colorPaletteItemWrap">
                <label className="text-xxs capitalize ">
                  Menu hover text color
                </label>
                <div className="colorPaletteItem mt-3">
                  <div className="colorCodeValue">
                    <input
                      className=" inputhxscolorcode"
                      type="text"
                      value={inputvalue.menu_hover_text_color.toUpperCase()}
                      onChange={(e) =>
                        handleColorThemeFromInputField(
                          "menu_hover_text_color",
                          e
                        )
                      }
                    />
                  </div>
                  <div className="colorPaletteInput">
                    <InputColorPicker
                      selectedColor={inputvalue.menu_hover_text_color}
                      onChange={(color) =>
                        handleColorTheme("menu_hover_text_color", color)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* <div className="divider"></div> */}
        {/* <div className="bannerCustomisedWrap">
          <p
            className={`bannerCustomisedHead mb-10 ${showEditTheme === "banner" ? "active" : ""
              }`}
            onClick={() => manageSkinEditOption("banner")}
          >
            Banners
          </p>
          {showEditTheme === "banner" && (
            <div className="bannerCustomisedContent mt-10">
              <div className="bannerCustomisedItemWrap">
                <label className="text-xxs capitalize">Fix Width</label>
                <div
                  className={`bannerCustomisedItem mt-3 ${inputvalue.banner === "FixWidth" && "active"
                    }`}
                >
                  <p
                    className="bannerFix"
                    name="FixWidth"
                    defaultValue={inputvalue.banner}
                    onClick={() => handleBannerValue("banner", "FixWidth")}
                  >
                    Banner
                  </p>
                </div>
              </div>
              <div className="bannerCustomisedItemWrap">
                <label className="text-xxs capitalize">Full Width</label>
                <div
                  className={`bannerCustomisedItem mt-3 ${inputvalue.banner === "FullWidth" && "active"
                    }`}
                >
                  <p
                    className="bannerFull"
                    value="FullWidth"
                    onClick={() => handleBannerValue("banner", "FullWidth")}
                  >
                    Banner
                  </p>
                </div>
              </div>
              <div className="bannerCustomisedItemWrap">
                <label className="text-xxs capitalize">
                  2 Column full width
                </label>
                <div
                  className={`bannerCustomisedItem mt-3 ${inputvalue.banner === "2ColumfullWidth" && "active"
                    }`}
                >
                  <div
                    className="bannerColumnWrap"
                    value="FullWidth"
                    onClick={() =>
                      handleBannerValue("banner", "2ColumfullWidth")
                    }
                  >
                    <p className="bannerColumn">Banner</p>
                    <p className="bannerColumn">Banner</p>
                  </div>
                </div>
              </div>

              <div className="colorPaletteItemWrap">
                <label className="text-xxs capitalize">Banner Background</label>
                <div className="colorPaletteItem mt-3">
                  <div className="colorCodeValue">
                    <input
                      className=" inputhxscolorcode"
                      type="text"
                      value={inputvalue.banner_background.toUpperCase()}
                      onChange={(e) =>
                        handleColorThemeFromInputField("banner_background", e)
                      }
                    />
                  </div>
                  <div className="colorPaletteInput">
                    <InputColorPicker
                      selectedColor={inputvalue.banner_background}
                      onChange={(color) =>
                        handleColorTheme("banner_background", color)
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="colorPaletteItemWrap">
                <label className="text-xxs capitalize">Banner Text Color</label>
                <div className="colorPaletteItem mt-3">
                  <div className="colorCodeValue">
                    <input
                      className=" inputhxscolorcode"
                      type="text"
                      value={inputvalue.banner_text_color.toUpperCase()}
                      onChange={(e) =>
                        handleColorThemeFromInputField("banner_text_color", e)
                      }
                    />
                  </div>
                  <div className="colorPaletteInput">
                    <InputColorPicker
                      selectedColor={inputvalue.banner_text_color}
                      onChange={(color) =>
                        handleColorTheme("banner_text_color", color)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div> */}

        {/* <div className="divider"></div>
        <div className="colorpaletteWrap">
          <p
            className={`colorpaletteHead mb-10 ${showEditTheme === "sectionBackground" ? "active" : ""
              }`}
            onClick={() => manageSkinEditOption("sectionBackground")}
          >
            Sections Background
          </p>
          {showEditTheme === "sectionBackground" && (
            <div className="colorPaletteContent mt-10">
              <div className="colorPaletteItemWrap">
                <label className="text-xxs capitalize"> Intro Background</label>
                <div className="colorPaletteItem mt-3">
                  <div className="colorCodeValue">
                    <input
                      className=" inputhxscolorcode"
                      type="text"
                      value={inputvalue.primary_background.toUpperCase()}
                      onChange={(e) =>
                        handleColorThemeFromInputField("primary_background", e)
                      }
                    />
                  </div>
                  <div className="colorPaletteInput">
                    <InputColorPicker
                      selectedColor={inputvalue.primary_background}
                      onChange={(color) =>
                        handleColorTheme("primary_background", color)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="colorPaletteItemWrap">
                <label className="text-xxs capitalize">Intro Text Color</label>
                <div className="colorPaletteItem mt-3">
                  <div className="colorCodeValue">
                    <input
                      className=" inputhxscolorcode"
                      type="text"
                      value={inputvalue.primary_text_color.toUpperCase()}
                      onChange={(e) =>
                        handleColorThemeFromInputField("primary_text_color", e)
                      }
                    />
                  </div>
                  <div className="colorPaletteInput">
                    <InputColorPicker
                      selectedColor={inputvalue.primary_text_color}
                      onChange={(color) =>
                        handleColorTheme("primary_text_color", color)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="colorPaletteItemWrap">
                <label className="text-xxs capitalize">Primary Background</label>
                <div className="colorPaletteItem mt-3">
                  <div className="colorCodeValue">
                    <input
                      className=" inputhxscolorcode"
                      type="text"
                      value={inputvalue.secondary_background.toUpperCase()}
                      onChange={(e) =>
                        handleColorThemeFromInputField(
                          "secondary_background",
                          e
                        )
                      }
                    />
                  </div>
                  <div className="colorPaletteInput">
                    <InputColorPicker
                      selectedColor={inputvalue.secondary_background}
                      onChange={(color) =>
                        handleColorTheme("secondary_background", color)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="colorPaletteItemWrap">
                <label className="text-xxs capitalize">Primary Text</label>
                <div className="colorPaletteItem mt-3">
                  <div className="colorCodeValue">
                    <input
                      className=" inputhxscolorcode"
                      type="text"
                      value={inputvalue.secondary_text_color.toUpperCase()}
                      onChange={(e) =>
                        handleColorThemeFromInputField(
                          "secondary_text_color",
                          e
                        )
                      }
                    />
                  </div>
                  <div className="colorPaletteInput">
                    <InputColorPicker
                      selectedColor={inputvalue.secondary_text_color}
                      onChange={(color) =>
                        handleColorTheme("secondary_text_color", color)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="colorPaletteItemWrap">
                <label className="text-xxs capitalize">
                  Secondary Background
                </label>
                <div className="colorPaletteItem mt-3">
                  <div className="colorCodeValue">
                    <input
                      className=" inputhxscolorcode"
                      type="text"
                      value={inputvalue.secondary_background.toUpperCase()}
                      onChange={(e) =>
                        handleColorThemeFromInputField(
                          "secondary_background",
                          e
                        )
                      }
                    />
                  </div>
                  <div className="colorPaletteInput">
                    <InputColorPicker
                      selectedColor={inputvalue.secondary_background}
                      onChange={(color) =>
                        handleColorTheme("secondary_background", color)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="colorPaletteItemWrap">
                <label className="text-xxs capitalize">Secondary Text</label>
                <div className="colorPaletteItem mt-3">
                  <div className="colorCodeValue">
                    <input
                      className=" inputhxscolorcode"
                      type="text"
                      value={inputvalue.secondary_text_color.toUpperCase()}
                      onChange={(e) =>
                        handleColorThemeFromInputField(
                          "secondary_text_color",
                          e
                        )
                      }
                    />
                  </div>
                  <div className="colorPaletteInput">
                    <InputColorPicker
                      selectedColor={inputvalue.secondary_text_color}
                      onChange={(color) =>
                        handleColorTheme("secondary_text_color", color)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div> */}

        <div className="divider"></div>
        <div className="TypographyCustomisedWrap">
          <p
            className={`TypographyCustomisedHead mb-10 ${showEditTheme === "typography" ? "active" : ""
              }`}
            onClick={() => manageSkinEditOption("typography")}
          >
            Typography{" "}
            {/* <u className="text-xxs w-500">Preferred Google Fonts only</u> */}
          </p>
          {showEditTheme === "typography" && (
            <div>
              <div className="TypographyCustomisedContent mt-10">
                <div className="TypographyCustomisedItemWrap">
                  <label className="text-xxs w-400">
                    Regular body Font Family
                  </label>
                  <div className="TypographyCustomisedItem mt-3">
                    <SelectInput
                      name="regular_body_font"
                      defaultValue={inputvalue.regular_body_font}
                      onChange={(e) =>
                        onRegularFontChange("regular_body_font", e)
                      }
                    >
                      {font.map((data, idx) => (
                        <option
                          key={idx}
                          value={data.fontname}
                          style={{ fontFamily: data.fontname }}
                        >
                          {data.fontname}
                        </option>
                      ))}
                    </SelectInput>
                  </div>
                </div>

                <div className="TypoFontCustomisedItemWrap">
                  <label className="text-xxs w-400">Font Size & Weight</label>
                  <div className="TypoFontCustomisedItem mt-3">
                    <div className="input-group">
                      <FormInput
                        type="number"
                        name="body_text_size"
                        defaultValue={integer1}
                        onChange={(e) =>
                          handleRegularBodySize(
                            "body_text_size",
                            "body_text",
                            "size",
                            e
                          )
                        }
                      />
                      <div className="input-group-append">
                        <SelectInput
                          name="body_text_type"
                          defaultValue={inputvalue.body_text_type}
                          onChange={(e) =>
                            handleRegularBodyType(
                              "body_text_type",
                              "body_text",
                              "text_type",
                              e
                            )
                          }
                        >
                          {regularFont && regularFont.fontweight ? (
                            regularFont.fontweight.map((data, idx) => (
                              <option key={idx} value={data}>
                                {data}
                              </option>
                            ))
                          ) : (
                            <option value={inputvalue.body_text_type}>
                              {inputvalue.body_text_type}
                            </option>
                          )}
                        </SelectInput>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="TypoFontCustomisedItem  TypoFontCustomisedItemLinewrapper mt-3">
                  <div>
                    <label className="text-xxs w-400">Line Height</label>
                    <div className="input-group">
                      <FormInput
                        type="number"
                        name="regular_line_height"
                        defaultValue={integer8}
                        onChange={(e) =>
                          handleLineSpacing("regular_line_height", e)
                        }
                      />
                      <h1 className="text-xxs w-400">Px</h1>
                    </div>
                  </div>

                  <div>
                    <label className="text-xxs w-400">Letter Spacing</label>
                    <div className="input-group">
                      <FormInput
                        type="number"
                        name="regular_letter_spacing"
                        defaultValue={integer9}
                        onChange={(e) =>
                          handleLineSpacing(
                            "regular_letter_spacing",

                            e
                          )
                        }
                      />
                      <h1 className="text-xxs w-400">Px</h1>
                    </div>
                  </div>
                </div>
              </div>

              <div className="TypographyCustomisedContent mt-10">
                <div className="TypographyCustomisedItemWrap">
                  <label className="text-xxs w-400">Heading font Family</label>
                  <div className="TypographyCustomisedItem mt-3">
                    <SelectInput
                      name="heading_sub_font"
                      defaultValue={inputvalue.heading_sub_font}
                      onChange={(e) =>
                        onHeaderSubFontChange("heading_sub_font", e)
                      }
                    >
                      {font.map((data, idx) => (
                        <option
                          key={idx}
                          value={data.fontname}
                          style={{ fontFamily: data.fontname }}
                        >
                          {data.fontname}
                        </option>
                      ))}
                    </SelectInput>
                  </div>
                </div>
                <div className="TypoFontCustomisedItemWrap">
                  <label className="text-xxs w-400">Font Size & Weight</label>
                  <div className="TypoFontCustomisedItem mt-3">
                    <div className="input-group">
                      <FormInput
                        type="number"
                        name="heading_size"
                        defaultValue={integer2}
                        onChange={(e) =>
                          handleRegularBodySize(
                            "heading_size",
                            "heading",
                            "size",
                            e
                          )
                        }
                      />
                      <div className="input-group-append">
                        <SelectInput
                          name="heading_type"
                          defaultValue={inputvalue.heading_type}
                          onChange={(e) =>
                            handleRegularBodyType(
                              "heading_type",
                              "heading",
                              "text_type",
                              e
                            )
                          }
                        >
                          {headerSubFont && headerSubFont.fontweight ? (
                            headerSubFont.fontweight.map((data, idx) => (
                              <option key={idx} value={data}>
                                {data}
                              </option>
                            ))
                          ) : (
                            <option value={inputvalue.heading_type}>
                              {inputvalue.heading_type}
                            </option>
                          )}
                        </SelectInput>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="TypoFontCustomisedItem TypoFontCustomisedItemLinewrapper mt-3">
                  <div>
                    <label className="text-xxs w-400">Line Height</label>
                    <div className="input-group">
                      <FormInput
                        type="number"
                        name="heading_line_height"
                        defaultValue={integer6}
                        onChange={(e) =>
                          handleLineSpacing("heading_line_height", e)
                        }
                      />
                      <h1 className="text-xxs w-400">Px </h1>
                    </div>
                  </div>
                  <div>
                    <label className="text-xxs w-400">Letter Spacing</label>
                    <div className="input-group">
                      <FormInput
                        type="number"
                        name="heading_letter_spacing"
                        defaultValue={integer7}
                        onChange={(e) =>
                          handleLineSpacing(
                            "heading_letter_spacing",

                            e
                          )
                        }
                      />
                      <h1 className="text-xxs w-400">Px </h1>
                    </div>
                  </div>
                </div>
              </div>

              <div className="TypographyCustomisedContent mt-10">
                <div className="TypographyCustomisedItemWrap">
                  <label className="text-xxs w-400">
                    Sub-heading font Family
                  </label>
                  <div className="TypographyCustomisedItem mt-3">
                    <SelectInput
                      name="subheading_sub_font"
                      defaultValue={inputvalue.subheading_sub_font}
                      onChange={(e) =>
                        onSubHeaderSubFontChange("subheading_sub_font", e)
                      }
                    >
                      {font.map((data, idx) => (
                        <option
                          key={idx}
                          value={data.fontname}
                          style={{ fontFamily: data.fontname }}
                        >
                          {data.fontname}
                        </option>
                      ))}
                    </SelectInput>
                  </div>
                </div>
                <div className="TypoFontCustomisedItemWrap">
                  <label className="text-xxs w-400">Font Size & Weight</label>
                  <div className="TypoFontCustomisedItem mt-3">
                    <div className="input-group">
                      <FormInput
                        type="number"
                        name="sub_heading_size"
                        defaultValue={integer3}
                        onChange={(e) =>
                          handleRegularBodySize(
                            "sub_heading_size",
                            "sub_heading",
                            "size",
                            e
                          )
                        }
                      />
                      <div className="input-group-append">
                        <SelectInput
                          name="sub_heading_type"
                          defaultValue={inputvalue.sub_heading_type}
                          onChange={(e) =>
                            handleRegularBodyType(
                              "sub_heading_type",
                              "sub_heading",
                              "text_type",
                              e
                            )
                          }
                        >
                          {subheaderSubFont && subheaderSubFont.fontweight ? (
                            subheaderSubFont.fontweight.map((data, idx) => (
                              <option key={idx} value={data}>
                                {data}
                              </option>
                            ))
                          ) : (
                            <option value={inputvalue.sub_heading_type}>
                              {inputvalue.sub_heading_type}
                            </option>
                          )}
                        </SelectInput>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="TypoFontCustomisedItem TypoFontCustomisedItemLinewrapper mt-3">
                  <div>
                    <label className="text-xxs w-400">Line Height</label>
                    <div className="input-group">
                      <FormInput
                        type="number"
                        name="subheading_line_height"
                        defaultValue={integer4}
                        onChange={(e) =>
                          handleLineSpacing("subheading_line_height", e)
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xxs w-400">Letter Spacing</label>
                    <div className="input-group">
                      <FormInput
                        type="number"
                        name="subheading_letter_spacing"
                        defaultValue={integer5}
                        onChange={(e) =>
                          handleLineSpacing("subheading_letter_spacing", e)
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="divider"></div>
        <div className="colorpaletteWrap">
          <p
            className={`colorpaletteHead mb-10 ${showEditTheme === "footer" ? "active" : ""
              }`}
            onClick={() => manageSkinEditOption("footer")}
          >
            Footer
          </p>
          {showEditTheme === "footer" && (
            <div className="colorPaletteContent mt-10">
              <div className="colorPaletteItemWrap">
                <label className="text-xxs  ">Background Color</label>
                <div className="colorPaletteItem mt-3">
                  <div className="colorCodeValue">
                    <input
                      className=" inputhxscolorcode"
                      type="text"
                      value={inputvalue.footer_background_color.toUpperCase()}
                      onChange={(e) =>
                        handleColorThemeFromInputField(
                          "footer_background_color",
                          e
                        )
                      }
                    />
                  </div>
                  <div className="colorPaletteInput">
                    <InputColorPicker
                      selectedColor={inputvalue.footer_background_color}
                      onChange={(color) =>
                        handleColorTheme("footer_background_color", color)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="colorPaletteItemWrap">
                <label className="text-xxs  ">Text Color</label>
                <div className="colorPaletteItem mt-3">
                  <div className="colorCodeValue">
                    <input
                      className=" inputhxscolorcode"
                      type="text"
                      value={inputvalue.footer_text_color.toUpperCase()}
                      onChange={(e) =>
                        handleColorThemeFromInputField("footer_text_color", e)
                      }
                    />
                  </div>
                  <div className="colorPaletteInput">
                    <InputColorPicker
                      selectedColor={inputvalue.footer_text_color}
                      onChange={(color) =>
                        handleColorTheme("footer_text_color", color)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="colorPaletteItemWrap">
                <label className="text-xxs  ">Link Color</label>
                <div className="colorPaletteItem mt-3">
                  <div className="colorCodeValue">
                    <input
                      className=" inputhxscolorcode"
                      type="text"
                      value={inputvalue.footer_link_color.toUpperCase()}
                      onChange={(e) =>
                        handleColorThemeFromInputField("footer_link_color", e)
                      }
                    />
                  </div>
                  <div className="colorPaletteInput">
                    <InputColorPicker
                      selectedColor={inputvalue.footer_link_color}
                      onChange={(color) =>
                        handleColorTheme("footer_link_color", color)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="colorPaletteItemWrap">
                <label className="text-xxs  ">Link Hover color</label>
                <div className="colorPaletteItem mt-3">
                  <div className="colorCodeValue">
                    <input
                      className=" inputhxscolorcode"
                      type="text"
                      value={inputvalue.footer_link_hover_color.toUpperCase()}
                      onChange={(e) =>
                        handleColorThemeFromInputField(
                          "footer_link_hover_color",
                          e
                        )
                      }
                    />
                  </div>
                  <div className="colorPaletteInput">
                    <InputColorPicker
                      selectedColor={inputvalue.footer_link_hover_color}
                      onChange={(color) =>
                        handleColorTheme("footer_link_hover_color", color)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="divider"></div>
        <div className="editSkinAction">
          {inputvalue && inputvalue._id ? (
            <>
              {" "}
              <button
                onClick={() => saveCloneThme(institutetheme._id)}
                value={institutetheme._id}
                type="button"
                className="button button-primary"
              >
                Save Skin
              </button>{" "}
              <button
                onClick={() => saveAndActivateCloneThme(institutetheme._id)}
                value={institutetheme._id}
                type="button"
                className="button btn-o-primary primary"
              >
                Save & Activate
              </button>
            </>
          ) : (
            <>
              {" "}
              <button
                onClick={() => saveTheme()}
                type="button"
                className="button button-primary"
              >
                Save Skin
              </button>{" "}
              <button
                onClick={() => saveAndActivateThme()}
                type="button"
                className="button btn-o-primary primary"
              >
                Save & Activate
              </button>
            </>
          )}

          <button
            onClick={cancelEdit}
            type="button"
            className="button btn-o-primary primary"
          >
            Cancel
          </button>
        </div>
        {/* <ThemePanel
          onChange={(name, value) => {
            this.props.changeThemeProperty(name, value);
          }}
        /> */}
      </div>
    </div>
  );
};

export default SkinEditOption;
