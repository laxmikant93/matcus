import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import InputColorPicker from '../../Common/Form/InputColorPicker';
import "../themesidebar.scss"

const HeaderCustomize = ({ onLoadHeaderData }) => {
  const { themeSuccess, themeData } = useSelector((state) => {
    return {
      themeSuccess: state.websiteTemplate.getTemplate.success,
      themeData: state.websiteTemplate.getTemplate.data
    }
  })
  const [h4Fontstyle, setH4Fontstyle] = useState([]);
  const [ButtonFontstyle, setButtonFontstyle] = useState([]);
  const [NavMenuFontstyle, setNavMenuFontstyle] = useState([]);

  const [arrowicon, setArrowIcon] = useState(false)
  const [arrowicon2, setArrowIcon2] = useState(false)
  const [arrowicon3, setArrowIcon3] = useState(false)
  const [typographyValues, setTypographyvalues] = useState(
    {
      h4: {
        FontSize: `20px`,
        FontWeight: `700`,
        LineHeight: `30px`,
        FontFamily: ``,
        FontStyle: ``,
        LetterSpacing: ``,
      },
      h5: {
        FontSize: `16px`,
        FontWeight: `500`,
        LineHeight: `20px`,
        LetterSpacing: ``,
        FontFamily: ``,
        FontStyle: ``,
      },
      Button: {
        FontSize: `18px`,
        FontWeight: `600`,
        LineHeight: `24px`,
        LetterSpacing: ``,
        FontFamily: ``,
        FontStyle: ``,
      },
      NavMenu: {
        FontSize: `16px`,
        FontWeight: `400`,
        LineHeight: `28px`,
        LetterSpacing: ``,
        FontFamily: ``,
        FontStyle: ``,
      },
    })

  const {
    fonts,
  } = useSelector((state) => {
    return {
      fonts: state.fonts.list,

    };
  });
  const [HeaderBackground, setHeaderBackground] = useState("")
  const [headingColor, setHeadingColor] = useState('')
  const [loginBackground, setLoginBackground] = useState("")
  const [loginColor, setLoginColor] = useState("")
  const [loginBorderColor, setLoginBorderColor] = useState("")
  const [loginHoverBackground, setLoginHoverBackground] = useState("")
  const [loginHoverColor, setLoginHoverColor] = useState("")
  const [loginHoverBorderColor, setLoginHoverBorderColor] = useState("")
  const [loginActiveBackground, setLoginActiveBackground] = useState("")
  const [loginActiveColor, setLoginActiveColor] = useState("")
  const [loginActiveBorderColor, setLoginActiveBorderColor] = useState("")



  const [SignUpBackground, setSignUpBackground] = useState("")
  const [SignUpColor, setSignUpColor] = useState("")
  const [signUpBorderColor, setSignUpBorderColor] = useState("")
  const [SignUpHoverBackground, setSignUpHoverBackground] = useState("")
  const [SignUpHoverColor, setSignUpHoverColor] = useState("")
  const [SignUpHoverBorderColor, setSignUpHoverBorderColor] = useState("")
  const [SignUpActiveBackground, setSignUpActiveBackground] = useState("")
  const [SignUpActiveColor, setSignUpActiveColor] = useState("")
  const [SignUpActiveBorderColor, setSignUpActiveBorderColor] = useState("")


  const [navMenuBackground, setNavMenuBackground] = useState("")
  const [navMenuColor, setNavMenuColor] = useState("")
  const [navMenuHoverColor, setNavMenuHoverColor] = useState("")

  const [navMenuScrollIconColor, setNavMenuScrollIconColor] = useState("")
  const [navMenuScrollIconHoverColor, setNavMenuScrollIconHoverColor] = useState("")


  const findfontnamehandle = async (e, typo) => {
    const FontValue = await fonts.find((fontname) => fontname.fontname === e.target.value);
    switch (typo) {

      case "h4": {
        setH4Fontstyle(FontValue ? FontValue.fontstyle : []);
        break;
      }

      case "Button": {
        setButtonFontstyle(FontValue ? FontValue.fontstyle : []);
        break;
      }
      case "NavMenu": {
        setNavMenuFontstyle(FontValue ? FontValue.fontstyle : [])
        break;
      }

      default: return
    }

  }


  const handleUpdate = (e, typo) => {
    let inputValue = ""
    let inputName = e.target.name;
    if (inputName === "FontSize" ||
      inputName === "LineHeight" || inputName === "LetterSpacing") {
      inputValue = e.target.value + "px";
    } else {
      inputValue = e.target.value;
    }
    let InputData = {
      ...typographyValues,
      [typo]: {
        ...typographyValues[typo],
        [inputName]: inputValue
      }
    }
    setTypographyvalues(InputData)

  }
  useEffect(() => {
    if (themeSuccess) {
      setHeaderBackground(themeData.themeGlobal.headerThemeColor.Background)
      setHeadingColor(themeData.themeGlobal.headerThemeColor.h4.Color)

      setLoginBackground(themeData.themeGlobal.headerThemeColor.ButtonLogin.Background)
      setLoginColor(themeData.themeGlobal.headerThemeColor.ButtonLogin.Color)
      setLoginBorderColor(themeData.themeGlobal.headerThemeColor.ButtonLogin.BorderColor)
      setLoginHoverBackground(themeData.themeGlobal.headerThemeColor.ButtonLogin.Hover.Background)
      setLoginHoverColor(themeData.themeGlobal.headerThemeColor.ButtonLogin.Hover.Color)
      setLoginHoverBorderColor(themeData.themeGlobal.headerThemeColor.ButtonLogin.Hover.BorderColor)
      setLoginActiveBackground(themeData.themeGlobal.headerThemeColor.ButtonLogin.Active.Background)
      setLoginActiveColor(themeData.themeGlobal.headerThemeColor.ButtonLogin.Active.Color)
      setLoginActiveBorderColor(themeData.themeGlobal.headerThemeColor.ButtonLogin.Active.BorderColor)


      setSignUpBackground(themeData.themeGlobal.headerThemeColor.ButtonSignup.Background)
      setSignUpColor(themeData.themeGlobal.headerThemeColor.ButtonSignup.Color)
      setSignUpBorderColor(themeData.themeGlobal.headerThemeColor.ButtonSignup.BorderColor)
      setSignUpHoverBackground(themeData.themeGlobal.headerThemeColor.ButtonSignup.Hover.Background)
      setSignUpHoverColor(themeData.themeGlobal.headerThemeColor.ButtonSignup.Hover.Color)
      setSignUpHoverBorderColor(themeData.themeGlobal.headerThemeColor.ButtonSignup.Hover.BorderColor)
      setSignUpActiveBackground(themeData.themeGlobal.headerThemeColor.ButtonSignup.Active.Background)
      setSignUpActiveColor(themeData.themeGlobal.headerThemeColor.ButtonSignup.Active.Color)
      setSignUpActiveBorderColor(themeData.themeGlobal.headerThemeColor.ButtonSignup.Active.BorderColor)


      setNavMenuBackground(themeData.themeGlobal.headerThemeColor.NavMenu.Background)
      setNavMenuColor(themeData.themeGlobal.headerThemeColor.NavMenu.Color)
      setNavMenuHoverColor(themeData.themeGlobal.headerThemeColor.NavMenu.Hover.Color)
      setNavMenuScrollIconColor(themeData.themeGlobal.headerThemeColor.NavMenu.ScrollIcon.Color)
      setNavMenuScrollIconHoverColor(themeData.themeGlobal.headerThemeColor.NavMenu.ScrollIcon.Hover.Color)

      setTypographyvalues(themeData.themeGlobal.headerThemeTypo)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeSuccess])

  useEffect(() => {

    onLoadHeaderData({
      headingColor: headingColor,
      HeaderBackground: HeaderBackground,

      loginBackground: loginBackground,
      loginColor: loginColor,
      loginBorderColor: loginBorderColor,
      loginHoverBackground: loginHoverBackground,
      loginHoverColor: loginHoverColor,
      loginHoverBorderColor: loginHoverBorderColor,
      loginActiveBackground: loginActiveBackground,
      loginActiveColor: loginActiveColor,
      loginActiveBorderColor: loginActiveBorderColor,

      SignUpBackground: SignUpBackground,
      SignUpColor: SignUpColor,
      SignUpBorderColor: signUpBorderColor,
      SignUpHoverBackground: SignUpHoverBackground,
      SignUpHoverColor: SignUpHoverColor,
      SignUpHoverBorderColor: SignUpHoverBorderColor,
      SignUpActiveBackground: SignUpActiveBackground,
      SignUpActiveColor: SignUpActiveColor,
      SignUpActiveBorderColor: SignUpActiveBorderColor,

      navMenuHoverColor: navMenuHoverColor,
      navMenuColor: navMenuColor,
      navMenuScrollIconColor: navMenuScrollIconColor,
      navMenuBackground: navMenuBackground,
      navMenuScrollIconHoverColor: navMenuScrollIconHoverColor,

      typographyValues: typographyValues,
    })


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeSuccess, HeaderBackground, loginBorderColor, typographyValues, SignUpActiveBackground, SignUpActiveBorderColor, SignUpActiveColor, SignUpBackground, SignUpColor, SignUpHoverBackground, SignUpHoverBorderColor, SignUpHoverColor, headingColor, loginActiveBackground, loginActiveBorderColor, loginActiveColor, loginBackground, loginColor, loginHoverBackground, loginHoverBorderColor, loginHoverColor, navMenuBackground, navMenuColor, navMenuHoverColor, navMenuScrollIconColor, navMenuScrollIconHoverColor])

  return (
    <React.Fragment>
      <div className="theme-wrapper">
        <div className="customtheme-wrap">

          <ul className="Typography-wrap">
            <li>
              Heading Text Format
              <div className="card mt-10">
                <div className={`select-wrap mb-10 ${arrowicon ? "active" : ""}`} onClick={() => setArrowIcon(!arrowicon)}>
                  <select name="FontFamily" onClick={(e) => {
                    findfontnamehandle(e, "h4");
                    handleUpdate(e, "h4");
                  }}>
                    <option value="">Select</option>
                    {
                      fonts && fonts.map((item, index) => (
                        <option value={item.fontname} key={index}>{item.fontname}</option>
                      ))
                    }
                  </select>
                </div>
                <div className="font-grid">
                  <div className="item">
                    <div className={`select-wrap ${arrowicon2 ? "active" : ""}`} onClick={() => setArrowIcon2(!arrowicon2)}>
                      <select name="FontStyle" id="select-wrap" onClick={(e) => handleUpdate(e, "h4")}>
                        {h4Fontstyle.map((item, index) => (
                          <option value={item} key={index}>{item}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="item">
                    <div className="fontinput-wrap">
                      <i className="icon-fontsize icon"></i>
                      <input type="number" id="quantity" name="FontSize" min="1" onChange={(e) => handleUpdate(e, "h4")} />
                      <span>pt</span>
                    </div>
                  </div>
                  <div className="item">
                    <div className="fontinput-wrap">
                      <i className="icon-verticalalign icon"></i>
                      <input type="number" id="quantity" name="LetterSpacing" min="1" onChange={(e) => handleUpdate(e, "h4")} />
                      <span>px</span>
                    </div>
                  </div>
                  <div className="item">
                    <div className="fontinput-wrap">
                      <i className="icon-lineheight icon"></i>
                      <input type="number" id="quantity" name="LineHeight" min="1" onChange={(e) => handleUpdate(e, "h4")} />
                      <span>px</span>
                    </div>
                  </div>

                </div>
              </div>
            </li>
            <li>
              Button
              <div className="card mt-10">
                <div className={`select-wrap mb-10 ${arrowicon ? "active" : ""}`} onClick={() => setArrowIcon(!arrowicon)}>
                  <select name="FontFamily" onClick={(e) => {
                    findfontnamehandle(e, "Button");
                    handleUpdate(e, "Button");
                  }}>
                    <option value="">Select</option>
                    {
                      fonts && fonts.map((item, index) => (
                        <option value={item.fontname} key={index}>{item.fontname}</option>
                      ))
                    }
                  </select>
                </div>
                <div className="font-grid">
                  <div className="item">
                    <div className={`select-wrap ${arrowicon2 ? "active" : ""}`} onClick={() => setArrowIcon2(!arrowicon2)}>
                      <select name="FontStyle" id="select-wrap" onClick={(e) => handleUpdate(e, "Button")}>
                        {ButtonFontstyle.map((item, index) => (
                          <option value={item} key={index}>{item}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="item">
                    <div className="fontinput-wrap">
                      <i className="icon-fontsize icon"></i>
                      <input type="number" id="quantity" name="FontSize" min="1" onChange={(e) => handleUpdate(e, "Button")} />
                      <span>pt</span>
                    </div>
                  </div>
                  <div className="item">
                    <div className="fontinput-wrap">
                      <i className="icon-verticalalign icon"></i>
                      <input type="number" id="quantity" name="LetterSpacing" min="1" onChange={(e) => handleUpdate(e, "Button")} />
                      <span>px</span>
                    </div>
                  </div>
                  <div className="item">
                    <div className="fontinput-wrap">
                      <i className="icon-lineheight icon"></i>
                      <input type="number" id="quantity" name="LineHeight" min="1" onChange={(e) => handleUpdate(e, "Button")} />
                      <span>px</span>
                    </div>
                  </div>

                </div>
              </div>
            </li>
            <li>
              Nav Menu
              <div className="card mt-10">
                <div className={`select-wrap mb-10 ${arrowicon ? "active" : ""}`} onClick={() => setArrowIcon(!arrowicon)}>
                  <select name="FontFamily" onClick={(e) => {
                    findfontnamehandle(e, "NavMenu");
                    handleUpdate(e, "NavMenu");
                  }}>
                    <option value="">Select</option>
                    {
                      fonts && fonts.map((item, index) => (
                        <option value={item.fontname} key={index}>{item.fontname}</option>
                      ))
                    }
                  </select>
                </div>
                <div className="font-grid">
                  <div className="item">
                    <div className={`select-wrap ${arrowicon2 ? "active" : ""}`} onClick={() => setArrowIcon2(!arrowicon2)}>
                      <select name="FontStyle" id="select-wrap" onClick={(e) => handleUpdate(e, "NavMenu")}>
                        {NavMenuFontstyle.map((item, index) => (
                          <option value={item} key={index}>{item}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="item">
                    <div className="fontinput-wrap">
                      <i className="icon-fontsize icon"></i>
                      <input type="number" id="quantity" name="FontSize" min="1" onChange={(e) => handleUpdate(e, "NavMenu")} />
                      <span>pt</span>
                    </div>
                  </div>
                  <div className="item">
                    <div className="fontinput-wrap">
                      <i className="icon-verticalalign icon"></i>
                      <input type="number" id="quantity" name="LetterSpacing" min="1" onChange={(e) => handleUpdate(e, "NavMenu")} />
                      <span>px</span>
                    </div>
                  </div>
                  <div className="item">
                    <div className="fontinput-wrap">
                      <i className="icon-lineheight icon"></i>
                      <input type="number" id="quantity" name="LineHeight" min="1" onChange={(e) => handleUpdate(e, "NavMenu")} />
                      <span>px</span>
                    </div>
                  </div>

                </div>
              </div>
            </li>
          </ul>
          <ul className='themeColorWrap borderlist'>
            <li>
              <span className="underline">Heading Text Format</span>
              <div className="custom-themedrop mb-20 mt-10">
                <label>
                  <span className="text-2xs mb-5">Background Color</span>
                  <div className="color-picker mb-10">
                    <span className="colorName">Hex</span>
                    <p className="colorCode">{HeaderBackground}</p>
                    <div className="colorPaletteInput">
                      <InputColorPicker
                        selectedColor={HeaderBackground}
                        onChange={(color) =>
                          setHeaderBackground(color.hex)
                        }
                      />
                    </div>
                  </div>
                </label>
                <label>
                  <span className="text-2xs mb-5">Heading Color</span>
                  <div className="color-picker mb-10">
                    <span className="colorName">Hex</span>
                    <p className="colorCode">{headingColor}</p>
                    <div className="colorPaletteInput">
                      <InputColorPicker
                        selectedColor={headingColor}
                        onChange={(color) =>
                          setHeadingColor(color.hex)
                        }
                      />
                    </div>
                  </div>
                </label>
              </div>
            </li>
            <li>
              <span className="underline">Login Button</span>
              <div className="custom-themedrop mb-20 mt-10">
                <label>
                  <span className="text-2xs mb-5">Background Color</span>
                  <div className="color-picker mb-10">
                    <span className="colorName">Hex</span>
                    <p className="colorCode">{loginBackground}</p>
                    <div className="colorPaletteInput">
                      <InputColorPicker
                        selectedColor={loginBackground}
                        onChange={(color) =>
                          setLoginBackground(color.hex)
                        }
                      />
                    </div>
                  </div>
                </label>
                <label>
                  <span className="text-2xs mb-5">Text Color</span>
                  <div className="color-picker mb-10">
                    <span className="colorName">Hex</span>
                    <p className="colorCode">{loginColor}</p>
                    <div className="colorPaletteInput">
                      <InputColorPicker
                        selectedColor={loginColor}
                        onChange={(color) =>
                          setLoginColor(color.hex)
                        }
                      />
                    </div>
                  </div>
                </label>
                <label>
                  <span className="text-2xs mb-5">Border Color</span>
                  <div className="color-picker mb-10">
                    <span className="colorName">Hex</span>
                    <p className="colorCode">{loginBorderColor}</p>
                    <div className="colorPaletteInput">
                      <InputColorPicker
                        selectedColor={loginBorderColor}
                        onChange={(color) =>
                          setLoginBorderColor(color.hex)
                        }
                      />
                    </div>
                  </div>
                </label>
                <label>
                  <span className="text-2xs mb-5">Background Hover Color</span>
                  <div className="color-picker mb-10">
                    <span className="colorName">Hex</span>
                    <p className="colorCode">{loginHoverBackground}</p>
                    <div className="colorPaletteInput">
                      <InputColorPicker
                        selectedColor={loginHoverBackground}
                        onChange={(color) =>
                          setLoginHoverBackground(color.hex)
                        }
                      />
                    </div>
                  </div>
                </label>
                <label>
                  <span className="text-2xs mb-5">Text Hover Color</span>
                  <div className="color-picker mb-10">
                    <span className="colorName">Hex</span>
                    <p className="colorCode">{loginHoverColor}</p>
                    <div className="colorPaletteInput">
                      <InputColorPicker
                        selectedColor={loginHoverColor}
                        onChange={(color) =>
                          setLoginHoverColor(color.hex)
                        }
                      />
                    </div>
                  </div>
                </label>
                <label>
                  <span className="text-2xs mb-5">Hover Border Color</span>
                  <div className="color-picker mb-10">
                    <span className="colorName">Hex</span>
                    <p className="colorCode">{loginHoverBorderColor}</p>
                    <div className="colorPaletteInput">
                      <InputColorPicker
                        selectedColor={loginHoverBorderColor}
                        onChange={(color) =>
                          setLoginHoverBorderColor(color.hex)
                        }
                      />
                    </div>
                  </div>
                </label>
                <label>
                  <span className="text-2xs mb-5">Active Background Color</span>
                  <div className="color-picker mb-10">
                    <span className="colorName">Hex</span>
                    <p className="colorCode">{loginActiveBackground}</p>
                    <div className="colorPaletteInput">
                      <InputColorPicker
                        selectedColor={loginActiveBackground}
                        onChange={(color) =>
                          setLoginActiveBackground(color.hex)
                        }
                      />
                    </div>
                  </div>
                </label>
                <label>
                  <span className="text-2xs mb-5">Active Text Color</span>
                  <div className="color-picker mb-10">
                    <span className="colorName">Hex</span>
                    <p className="colorCode">{loginActiveColor}</p>
                    <div className="colorPaletteInput">
                      <InputColorPicker
                        selectedColor={loginActiveColor}
                        onChange={(color) =>
                          setLoginActiveColor(color.hex)
                        }
                      />
                    </div>
                  </div>
                </label>
                <label>
                  <span className="text-2xs mb-5">Active Border Color</span>
                  <div className="color-picker mb-10">
                    <span className="colorName">Hex</span>
                    <p className="colorCode">{loginActiveBorderColor}</p>
                    <div className="colorPaletteInput">
                      <InputColorPicker
                        selectedColor={loginActiveBorderColor}
                        onChange={(color) =>
                          setLoginActiveBorderColor(color.hex)
                        }
                      />
                    </div>
                  </div>
                </label>
              </div>
            </li>
            <li>
              <span className="underline">Sign up Button</span>
              <div className="custom-themedrop mb-20 mt-10">
                <label>
                  <span className="text-2xs mb-5">Background Color</span>
                  <div className="color-picker mb-10">
                    <span className="colorName">Hex</span>
                    <p className="colorCode">{SignUpBackground}</p>
                    <div className="colorPaletteInput">
                      <InputColorPicker
                        selectedColor={SignUpBackground}
                        onChange={(color) =>
                          setSignUpBackground(color.hex)
                        }
                      />
                    </div>
                  </div>
                </label>
                <label>
                  <span className="text-2xs mb-5">Text Color</span>
                  <div className="color-picker mb-10">
                    <span className="colorName">Hex</span>
                    <p className="colorCode">{SignUpColor}</p>
                    <div className="colorPaletteInput">
                      <InputColorPicker
                        selectedColor={SignUpColor}
                        onChange={(color) =>
                          setSignUpColor(color.hex)
                        }
                      />
                    </div>
                  </div>
                </label>
                <label>
                  <span className="text-2xs mb-5">Border Color</span>
                  <div className="color-picker mb-10">
                    <span className="colorName">Hex</span>
                    <p className="colorCode">{signUpBorderColor}</p>
                    <div className="colorPaletteInput">
                      <InputColorPicker
                        selectedColor={signUpBorderColor}
                        onChange={(color) =>
                          setSignUpBorderColor(color.hex)
                        }
                      />
                    </div>
                  </div>
                </label>
                <label>
                  <span className="text-2xs mb-5">Hover Background Color</span>
                  <div className="color-picker mb-10">
                    <span className="colorName">Hex</span>
                    <p className="colorCode">{SignUpHoverBackground}</p>
                    <div className="colorPaletteInput">
                      <InputColorPicker
                        selectedColor={SignUpHoverBackground}
                        onChange={(color) =>
                          setSignUpHoverBackground(color.hex)
                        }
                      />
                    </div>
                  </div>
                </label>
                <label>
                  <span className="text-2xs mb-5">Hover Text Color</span>
                  <div className="color-picker mb-10">
                    <span className="colorName">Hex</span>
                    <p className="colorCode">{SignUpHoverColor}</p>
                    <div className="colorPaletteInput">
                      <InputColorPicker
                        selectedColor={SignUpHoverColor}
                        onChange={(color) =>
                          setSignUpHoverColor(color.hex)
                        }
                      />
                    </div>
                  </div>
                </label>
                <label>
                  <span className="text-2xs mb-5">Hover Border Color</span>
                  <div className="color-picker mb-10">
                    <span className="colorName">Hex</span>
                    <p className="colorCode">{SignUpHoverBorderColor}</p>
                    <div className="colorPaletteInput">
                      <InputColorPicker
                        selectedColor={SignUpHoverBorderColor}
                        onChange={(color) =>
                          setSignUpHoverBorderColor(color.hex)
                        }
                      />
                    </div>
                  </div>
                </label>
                <label>
                  <span className="text-2xs mb-5">Active Background Color</span>
                  <div className="color-picker mb-10">
                    <span className="colorName">Hex</span>
                    <p className="colorCode">{SignUpActiveBackground}</p>
                    <div className="colorPaletteInput">
                      <InputColorPicker
                        selectedColor={SignUpActiveBackground}
                        onChange={(color) =>
                          setSignUpActiveBackground(color.hex)
                        }
                      />
                    </div>
                  </div>
                </label>
                <label>
                  <span className="text-2xs mb-5">Active Text Color</span>
                  <div className="color-picker mb-10">
                    <span className="colorName">Hex</span>
                    <p className="colorCode">{SignUpActiveColor}</p>
                    <div className="colorPaletteInput">
                      <InputColorPicker
                        selectedColor={SignUpActiveColor}
                        onChange={(color) =>
                          setSignUpActiveColor(color.hex)
                        }
                      />
                    </div>
                  </div>
                </label>
                <label>
                  <span className="text-2xs mb-5">Active Border Color</span>
                  <div className="color-picker mb-10">
                    <span className="colorName">Hex</span>
                    <p className="colorCode">{SignUpActiveBorderColor}</p>
                    <div className="colorPaletteInput">
                      <InputColorPicker
                        selectedColor={SignUpActiveBorderColor}
                        onChange={(color) =>
                          setSignUpActiveBorderColor(color.hex)
                        }
                      />
                    </div>
                  </div>
                </label>
              </div>
            </li>
            <li>
              <span className="underline"> Navigation Menu</span>
              <div className="custom-themedrop mb-20 mt-10">
                <label>
                  <span className="text-2xs mb-5">Background Color</span>
                  <div className="color-picker mb-10">
                    <span className="colorName">Hex</span>
                    <p className="colorCode">{navMenuBackground}</p>
                    <div className="colorPaletteInput">
                      <InputColorPicker
                        selectedColor={navMenuBackground}
                        onChange={(color) =>
                          setNavMenuBackground(color.hex)
                        }
                      />
                    </div>
                  </div>
                </label>
                <label>
                  <span className="text-2xs mb-5">Text Color</span>
                  <div className="color-picker mb-10">
                    <span className="colorName">Hex</span>
                    <p className="colorCode">{navMenuColor}</p>
                    <div className="colorPaletteInput">
                      <InputColorPicker
                        selectedColor={navMenuColor}
                        onChange={(color) =>
                          setNavMenuColor(color.hex)
                        }
                      />
                    </div>
                  </div>
                </label>
                <label>
                  <span className="text-2xs mb-5">Hover Text Color</span>
                  <div className="color-picker mb-10">
                    <span className="colorName">Hex</span>
                    <p className="colorCode">{navMenuHoverColor}</p>
                    <div className="colorPaletteInput">
                      <InputColorPicker
                        selectedColor={navMenuHoverColor}
                        onChange={(color) =>
                          setNavMenuHoverColor(color.hex)
                        }
                      />
                    </div>
                  </div>
                </label>
                <label>
                  <span className="text-2xs mb-5">Scroll Icon Color</span>
                  <div className="color-picker mb-10">
                    <span className="colorName">Hex</span>
                    <p className="colorCode">{navMenuScrollIconColor}</p>
                    <div className="colorPaletteInput">
                      <InputColorPicker
                        selectedColor={navMenuScrollIconColor}
                        onChange={(color) =>
                          setNavMenuScrollIconColor(color.hex)
                        }
                      />
                    </div>
                  </div>
                </label>
                <label>
                  <span className="text-2xs mb-5">Scroll Icon Hover Color</span>
                  <div className="color-picker mb-10">
                    <span className="colorName">Hex</span>
                    <p className="colorCode">{navMenuScrollIconHoverColor}</p>
                    <div className="colorPaletteInput">
                      <InputColorPicker
                        selectedColor={navMenuScrollIconHoverColor}
                        onChange={(color) =>
                          setNavMenuScrollIconHoverColor(color.hex)
                        }
                      />
                    </div>
                  </div>
                </label>
              </div>
            </li>

            {/* <label>
              <span className="text-xxs mb-5">Menu Background</span>
              <div className="color-picker mb-10">
                <div className="colorPaletteInput">
                  <InputColorPicker
                    selectedColor={MenuBackground}
                    onChange={(color) =>
                      setMenuBackground(color.hex)
                    }
                  />
                </div>
              </div>
            </label>
            <label>
              <span className="text-xxs mb-5">Menu Text Color</span>
              <div className="color-picker mb-20">
                <div className="colorPaletteInput">
                  <InputColorPicker
                    selectedColor={MenuTextColor}
                    onChange={(color) =>
                      setMenuHoverTextColor(color.hex)
                    }
                  />
                </div>
              </div>
            </label> */}
            {/* <label>
              <span className="text-xxs mb-5">Menu Hover Text Color</span>
              <div className="color-picker mb-10">
                <div className="colorPaletteInput">
                  <InputColorPicker
                    selectedColor={MenuHoverTextColor}
                    onChange={(color) =>
                      setMenuHoverTextColor(color.hex)
                    }
                  />
                </div>
              </div>
            </label> */}


            {/* <label>
              <span className="text-xxs mb-5">Button Login Active BorderColor</span>
              <div className="color-picker mb-10">
                <div className="colorPaletteInput">
                  <InputColorPicker
                    selectedColor={loginActiveBorderColor}
                    onChange={(color) =>
                      handleColorTheme("loginActiveBorderColor", color)
                    }
                  />
                </div>
              </div>
            </label> */}

          </ul>
        </div>
      </div>
    </React.Fragment>
  )
}
export default HeaderCustomize