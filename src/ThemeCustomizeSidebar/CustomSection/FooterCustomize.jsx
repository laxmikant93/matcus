import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import InputColorPicker from '../../Common/Form/InputColorPicker';

const FooterCustomize = ({ onLoadFooterData }) => {
  const { themeSuccess, themeData } = useSelector((state) => {
    return {
      themeSuccess: state.websiteTemplate.getTemplate.success,
      themeData: state.websiteTemplate.getTemplate.data
    }
  })
  const [FooterBackground, setFooterBackground] = useState("")
  const [logoBackGround, setLogoBackground] = useState("")
  const [heading4Color, setHeading4Color] = useState("")
  const [heading5Color, setHeading5Color] = useState("")
  const [heading6Color, setHeading6Color] = useState("")
  const [LinkColor, setLinkColor] = useState("")
  const [LinkHovercolor, setLinkHovercolor] = useState("")
  const [copyrightColor, setCopyrightColor] = useState("")


  const [h4Fontstyle, setH4Fontstyle] = useState([]);
  const [h5Fontstyle, setH5Fontstyle] = useState([]);
  const [h6Fontstyle, setH6Fontstyle] = useState([]);
  const [regularFontstyle, setregularFontstyle] = useState([]);
  const [anchorFontstyle, setanchorFontstyle] = useState([]);

  const [arrowicon, setArrowIcon] = useState(false)
  const [arrowicon2, setArrowIcon2] = useState(false)
  const [arrowicon3, setArrowIcon3] = useState(false)
  const {
    fonts,
  } = useSelector((state) => {
    return {
      fonts: state.fonts.list,

    };
  });

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
      h6: {
        FontSize: `18px`,
        FontWeight: `600`,
        LineHeight: `24px`,
        LetterSpacing: ``,
        FontFamily: ``,
        FontStyle: ``,
      },
      Copyright: {
        FontSize: `16px`,
        FontWeight: `400`,
        LineHeight: `28px`,
        LetterSpacing: ``,
        FontFamily: ``,
        FontStyle: ``,
      },
      a: {
        FontWeight: '500',
        FontSize: '16px',
        LineHeight: '1.24',
        LetterSpacing: ``,
        FontFamily: ``,
        FontStyle: ``,
      },
    })
  const findfontnamehandle = async (e, typo) => {
    const FontValue = await fonts.find((fontname) => fontname.fontname === e.target.value);
    switch (typo) {

      case "h4": {
        setH4Fontstyle(FontValue ? FontValue.fontstyle : []);
        break;
      }
      case "h5": {
        setH5Fontstyle(FontValue ? FontValue.fontstyle : []);
        break;
      }
      case "h6": {
        setH6Fontstyle(FontValue ? FontValue.fontstyle : []);
        break;
      }
      case "Copyright": {
        setregularFontstyle(FontValue ? FontValue.fontstyle : []);
        break;
      }
      case "a": {
        setanchorFontstyle(FontValue ? FontValue.fontstyle : [])
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
      setFooterBackground(themeData.themeGlobal.footerThemeColor.Background)
      setLogoBackground(themeData.themeGlobal.footerThemeColor.Logo.Background)
      setHeading4Color(themeData.themeGlobal.footerThemeColor.h4.Color)
      setHeading5Color(themeData.themeGlobal.footerThemeColor.h5.Color)
      setHeading6Color(themeData.themeGlobal.footerThemeColor.h6.Color)
      setLinkColor(themeData.themeGlobal.footerThemeColor.a.Color)
      setLinkHovercolor(themeData.themeGlobal.footerThemeColor.a.Hover.Color)
      setCopyrightColor(themeData.themeGlobal.footerThemeColor.Copyright.Color)
      setTypographyvalues(themeData.themeGlobal.footerThemeTypo)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeSuccess])

  useEffect(() => {
    onLoadFooterData({
      FooterBackground: FooterBackground,
      LinkColor: LinkColor,
      LinkHovercolor: LinkHovercolor,
      logoBackGround: logoBackGround,
      heading4Color: heading4Color,
      heading5Color: heading5Color,
      heading6Color: heading6Color,
      copyrightColor: copyrightColor,
      typography: typographyValues
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [FooterBackground, LinkColor, LinkHovercolor, copyrightColor, heading4Color, heading5Color, heading6Color, logoBackGround, typographyValues])
  return (
    <React.Fragment>
      <div className="themeColorWrap">
        <ul className="Typography-wrap">
          <li>
            Heading 1 Text Format
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
            Heading 5 Text Format
            <div className="card mt-10">
              <div className={`select-wrap mb-10 ${arrowicon ? "active" : ""}`} onClick={() => setArrowIcon(!arrowicon)}>
                <select name="FontFamily" onClick={(e) => {
                  findfontnamehandle(e, "h5");
                  handleUpdate(e, "h5");
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
                    <select name="FontStyle" id="select-wrap" onClick={(e) => handleUpdate(e, "h5")}>
                      {h5Fontstyle.map((item, index) => (
                        <option value={item} key={index}>{item}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="item">
                  <div className="fontinput-wrap">
                    <i className="icon-fontsize icon"></i>
                    <input type="number" id="quantity" name="FontSize" min="1" onChange={(e) => handleUpdate(e, "h5")} />
                    <span>pt</span>
                  </div>
                </div>
                <div className="item">
                  <div className="fontinput-wrap">
                    <i className="icon-verticalalign icon"></i>
                    <input type="number" id="quantity" name="LetterSpacing" min="1" onChange={(e) => handleUpdate(e, "h5")} />
                    <span>px</span>
                  </div>
                </div>
                <div className="item">
                  <div className="fontinput-wrap">
                    <i className="icon-lineheight icon"></i>
                    <input type="number" id="quantity" name="LineHeight" min="1" onChange={(e) => handleUpdate(e, "h5")} />
                    <span>px</span>
                  </div>
                </div>

              </div>
            </div>
          </li>
          <li>
            Heading 6 Text Format
            <div className="card mt-10">
              <div className={`select-wrap mb-10 ${arrowicon ? "active" : ""}`} onClick={() => setArrowIcon(!arrowicon)}>
                <select name="FontFamily" onClick={(e) => {
                  findfontnamehandle(e, "h6");
                  handleUpdate(e, "h6");
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
                    <select name="FontStyle" id="select-wrap" onClick={(e) => handleUpdate(e, "h6")}>
                      {h6Fontstyle.map((item, index) => (
                        <option value={item} key={index}>{item}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="item">
                  <div className="fontinput-wrap">
                    <i className="icon-fontsize icon"></i>
                    <input type="number" id="quantity" name="FontSize" min="1" onChange={(e) => handleUpdate(e, "h6")} />
                    <span>pt</span>
                  </div>
                </div>
                <div className="item">
                  <div className="fontinput-wrap">
                    <i className="icon-verticalalign icon"></i>
                    <input type="number" id="quantity" name="LetterSpacing" min="1" onChange={(e) => handleUpdate(e, "h6")} />
                    <span>px</span>
                  </div>
                </div>
                <div className="item">
                  <div className="fontinput-wrap">
                    <i className="icon-lineheight icon"></i>
                    <input type="number" id="quantity" name="LineHeight" min="1" onChange={(e) => handleUpdate(e, "h6")} />
                    <span>px</span>
                  </div>
                </div>

              </div>
            </div>
          </li>
          <li>
            Anchor Text Format
            <div className="card mt-10">
              <div className={`select-wrap mb-10 ${arrowicon ? "active" : ""}`} onClick={() => setArrowIcon(!arrowicon)}>
                <select name="FontFamily" onClick={(e) => {
                  findfontnamehandle(e, "a");
                  handleUpdate(e, "a");
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
                    <select name="FontStyle" id="select-wrap" onClick={(e) => handleUpdate(e, "a")}>
                      {anchorFontstyle.map((item, index) => (
                        <option value={item} key={index}>{item}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="item">
                  <div className="fontinput-wrap">
                    <i className="icon-fontsize icon"></i>
                    <input type="number" id="quantity" name="FontSize" min="1" onChange={(e) => handleUpdate(e, "a")} />
                    <span>pt</span>
                  </div>
                </div>
                <div className="item">
                  <div className="fontinput-wrap">
                    <i className="icon-verticalalign icon"></i>
                    <input type="number" id="quantity" name="LetterSpacing" min="1" onChange={(e) => handleUpdate(e, "a")} />
                    <span>px</span>
                  </div>
                </div>
                <div className="item">
                  <div className="fontinput-wrap">
                    <i className="icon-lineheight icon"></i>
                    <input type="number" id="quantity" name="LineHeight" min="1" onChange={(e) => handleUpdate(e, "a")} />
                    <span>px</span>
                  </div>
                </div>

              </div>
            </div>
          </li>
          <li>
            Copyright
            <div className="card mt-10">
              <div className={`select-wrap mb-10 ${arrowicon ? "active" : ""}`} onClick={() => setArrowIcon(!arrowicon)}>
                <select name="FontFamily" onClick={(e) => {
                  findfontnamehandle(e, "Copyright");
                  handleUpdate(e, "Copyright");
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
                    <select name="FontStyle" id="select-wrap" onClick={(e) => handleUpdate(e, "Copyright")}>
                      {regularFontstyle.map((item, index) => (
                        <option value={item} key={index}>{item}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="item">
                  <div className="fontinput-wrap">
                    <i className="icon-fontsize icon"></i>
                    <input type="number" id="quantity" name="FontSize" min="1" onChange={(e) => handleUpdate(e, "Copyright")} />
                    <span>pt</span>
                  </div>
                </div>
                <div className="item">
                  <div className="fontinput-wrap">
                    <i className="icon-verticalalign icon"></i>
                    <input type="number" id="quantity" name="LetterSpacing" min="1" onChange={(e) => handleUpdate(e, "Copyright")} />
                    <span>px</span>
                  </div>
                </div>
                <div className="item">
                  <div className="fontinput-wrap">
                    <i className="icon-lineheight icon"></i>
                    <input type="number" id="quantity" name="LineHeight" min="1" onChange={(e) => handleUpdate(e, "Copyright")} />
                    <span>px</span>
                  </div>
                </div>

              </div>
            </div>
          </li>
        </ul>
        <div className="custom-themedrop mt-20 mb-20">
          <label>
            <span className="text-2xs mb-5">Footer Background</span>
            <div className="color-picker mb-10">
              <span className="colorName">Hex</span>
              <p className="colorCode">{FooterBackground}</p>
              <div className="colorPaletteInput">
                <InputColorPicker
                  selectedColor={FooterBackground}
                  onChange={(color) =>
                    setFooterBackground(color.hex)
                  }
                />
              </div>
            </div>
          </label>
          <label>
            <span className="text-2xs mb-5">Link Color</span>
            <div className="color-picker mb-10">
              <span className="colorName">Hex</span>
              <p className="colorCode">{LinkColor}</p>
              <div className="colorPaletteInput">
                <InputColorPicker
                  selectedColor={LinkColor}
                  onChange={(color) =>
                    setLinkColor(color.hex)
                  }
                />
              </div>
            </div>
          </label>
          <label>
            <span className="text-2xs mb-5">Link Hover color</span>
            <div className="color-picker mb-10">
              <span className="colorName">Hex</span>
              <p className="colorCode">{LinkHovercolor}</p>
              <div className="colorPaletteInput">
                <InputColorPicker
                  selectedColor={LinkHovercolor}
                  onChange={(color) =>
                    setLinkHovercolor(color.hex)
                  }
                />
              </div>
            </div>
          </label>
          <label>
            <span className="text-2xs mb-5">Copyright Color</span>
            <div className="color-picker mb-10">
              <span className="colorName">Hex</span>
              <p className="colorCode">{copyrightColor}</p>
              <div className="colorPaletteInput">
                <InputColorPicker
                  selectedColor={copyrightColor}
                  onChange={(color) =>
                    setCopyrightColor(color.hex)
                  }
                />
              </div>
            </div>
          </label>
          <label>
            <span className="text-2xs mb-5">Logo Background</span>
            <div className="color-picker mb-10">
              <span className="colorName">Hex</span>
              <p className="colorCode">{logoBackGround}</p>
              <div className="colorPaletteInput">
                <InputColorPicker
                  selectedColor={logoBackGround}
                  onChange={(color) =>
                    setLogoBackground(color.hex)
                  }
                />
              </div>
            </div>
          </label>
          <label>
            <span className="text-2xs mb-5">Heading4 Color</span>
            <div className="color-picker mb-10">
              <span className="colorName">Hex</span>
              <p className="colorCode">{heading4Color}</p>
              <div className="colorPaletteInput">
                <InputColorPicker
                  selectedColor={heading4Color}
                  onChange={(color) =>
                    setHeading4Color(color.hex)
                  }
                />
              </div>
            </div>
          </label>
          <label>
            <span className="text-2xs mb-5">Heading5 Color</span>
            <div className="color-picker mb-10">
              <span className="colorName">Hex</span>
              <p className="colorCode">{heading5Color}</p>
              <div className="colorPaletteInput">
                <InputColorPicker
                  selectedColor={heading5Color}
                  onChange={(color) =>
                    setHeading5Color(color.hex)
                  }
                />
              </div>
            </div>
          </label>
          <label>
            <span className="text-2xs mb-5">Heading6 Color</span>
            <div className="color-picker mb-10">
              <span className="colorName">Hex</span>
              <p className="colorCode">{heading6Color}</p>
              <div className="colorPaletteInput">
                <InputColorPicker
                  selectedColor={heading6Color}
                  onChange={(color) =>
                    setHeading6Color(color.hex)
                  }
                />
              </div>
            </div>
          </label>
        </div>
      </div>

    </React.Fragment>
  )
}
export default FooterCustomize