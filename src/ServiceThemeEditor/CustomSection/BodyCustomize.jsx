
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import InputColorPicker from '../../Common/Form/InputColorPicker';
import { updateDynamicWebsiteThemeTemplate } from '../../store/actions/WebsiteTemplate';
import TypographyContent from './BodyTypography';

const BodyCustomize = ({ onLoadBodyData }) => {
  const { themeSuccess, themeData } = useSelector((state) => {
    return {
      themeSuccess: state.serviceTemplate.getTemplate.success,
      themeData: state.serviceTemplate.getTemplate.data
    }
  })
  const dispatch = useDispatch()
  const [websiteBackground, setwebsiteBackground] = useState("");
  const [RegularTextColor, setRegularTextColor] = useState("");
  const [HeadingTextColor, setHeadingTextColor] = useState("");
  const [SubHeadingTextColor, setSubHeadingTextColor] = useState("");
  const [HyperlinkTextColor, setHyperlinkTextColor] = useState("");
  const [HyperlinkHoverColor, setHyperlinkHoverColor] = useState("");
  const [ButtonBackground, setButtonBackground] = useState("");
  const [ButtonText, setButtonText] = useState("");
  const [ButtonHoverBackground, setButtonHoverBackground] = useState("");
  const [ButtonHoverTextColor, setButtonHoverTextColor] = useState("");
  const [bodyTypo, setBodyTypo] = useState({
    h1: {
      FontSize: `56px`,
      FontWeight: `700`,
      LineHeight: `68px`,
      FontFamily: ``,
      FontStyle: `Normal`,
      LetterSpacing: ``,
    },
    h2: {
      FontSize: `32px`,
      FontWeight: `700`,
      LineHeight: `42px`,
      FontFamily: ``,
      FontStyle: ``,
      LetterSpacing: ``,
    },
    h3: {
      FontSize: `18px`,
      FontWeight: `500`,
      LineHeight: `24px`,
      FontFamily: ``,
      FontStyle: ``,
      LetterSpacing: ``,
    },
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
    regular: {
      FontSize: `16px`,
      FontWeight: `400`,
      LineHeight: `28px`,
      LetterSpacing: ``,
      FontFamily: ``,
      FontStyle: ``,
    },
    anchor: {
      FontWeight: '500',
      FontSize: '16px',
      LineHeight: '1.24',
      LetterSpacing: ``,
      FontFamily: ``,
      FontStyle: ``,
    },
  })
  const handleColorTheme = (name, color) => {
    switch (name) {
      case "websiteBackground":
        setwebsiteBackground(color.hex)
        break;
      case "RegularTextColor":

        setRegularTextColor(color.hex)
        break;
      case "HeadingTextColor":

        setHeadingTextColor(color.hex)
        break;
      case "SubHeadingTextColor":

        setSubHeadingTextColor(color.hex)
        break;
      case "HyperlinkTextColor":

        setHyperlinkTextColor(color.hex)
        break;
      case "HyperlinkHoverColor":

        setHyperlinkHoverColor(color.hex)
        break;
      case "ButtonBackground":

        setButtonBackground(color.hex)
        break;
      case "ButtonText":

        setButtonText(color.hex)
        break;
      case "ButtonHoverBackground":

        setButtonHoverBackground(color.hex)
        break;
      case "ButtonHoverTextColor":

        setButtonHoverTextColor(color.hex)
        break;
      default:
        return false
    }
  }
  const handleBodyTypo = (values) => {
    setBodyTypo(values)
  }
  useEffect(() => {
    if (themeSuccess) {
      setwebsiteBackground(themeData.themeGlobal.bodyThemeColor.Background)
      setRegularTextColor(themeData.themeGlobal.bodyThemeColor.typography.Color)
      setHeadingTextColor(themeData.themeGlobal.bodyThemeColor.typography.HeadingColor)
      setSubHeadingTextColor(themeData.themeGlobal.bodyThemeColor.typography.SubHeadingColor)
      setHyperlinkTextColor(themeData.themeGlobal.bodyThemeColor.typography.LinkColor)
      setHyperlinkHoverColor(themeData.themeGlobal.bodyThemeColor.typography?.Hover?.LinkColor)
      setButtonBackground(themeData.themeGlobal.bodyThemeColor.Button.Background)
      setButtonText(themeData.themeGlobal.bodyThemeColor.Button.Color)
      setButtonHoverBackground(themeData.themeGlobal.bodyThemeColor.Button?.Hover?.Background)
      setButtonHoverTextColor(themeData.themeGlobal.bodyThemeColor.Button?.Hover?.Color)
      setBodyTypo(themeData.themeGlobal.typography)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeSuccess])
  useEffect(() => {
    onLoadBodyData({
      websiteBackground: websiteBackground,
      bodyTypo: bodyTypo,
      RegularTextColor: RegularTextColor,
      HeadingTextColor: HeadingTextColor,
      SubHeadingTextColor: SubHeadingTextColor,
      HyperlinkTextColor: HyperlinkTextColor,
      HyperlinkHoverColor: HyperlinkHoverColor,
      ButtonBackground: ButtonBackground,
      ButtonText: ButtonText,
      ButtonHoverBackground: ButtonHoverBackground,
      ButtonHoverTextColor: ButtonHoverTextColor
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ButtonBackground, ButtonHoverBackground, ButtonHoverTextColor, ButtonText, HeadingTextColor, HyperlinkHoverColor, HyperlinkTextColor, RegularTextColor, SubHeadingTextColor, bodyTypo, websiteBackground])
  return (
    <React.Fragment>
      <div className="theme-wrapper">
        <div className="customtheme-wrap">
          <TypographyContent onLoadTypoData={(val) => handleBodyTypo(val)} />
          <div className="themeColorWrap">
            <div className="custom-themedrop">
              <label>
                <span className="text-2xs mb-5">Website Background</span>
                <div className="color-picker">
                  <span className="colorName">Hex</span>
                  <p className="colorCode">{websiteBackground}</p>
                  <div className="colorPaletteInput">
                    <InputColorPicker
                      selectedColor={websiteBackground}
                      onChange={(color) =>
                        handleColorTheme("websiteBackground", color)
                      }
                    />
                  </div>
                </div>
              </label>
              <label>
                <span className="text-2xs mb-5">Paragraph</span>
                <div className="color-picker">
                  <span className="colorName">Hex</span>
                  <p className="colorCode">{RegularTextColor}</p>
                  <div className="colorPaletteInput">
                    <InputColorPicker
                      selectedColor={RegularTextColor}
                      onChange={(color) =>
                        handleColorTheme("RegularTextColor", color)
                      }
                    />
                  </div>
                </div>
              </label>
              <label>
                <span className="text-2xs mb-5">Heading</span>
                <div className="color-picker">
                  <span className="colorName">Hex</span>
                  <p className="colorCode">{HeadingTextColor}</p>
                  <div className="colorPaletteInput">
                    <InputColorPicker
                      selectedColor={HeadingTextColor}
                      onChange={(color) =>
                        handleColorTheme("HeadingTextColor", color)
                      }
                    />
                  </div>
                </div>
              </label>
              <label>
                <span className="text-2xs mb-5">Sub-Heading</span>
                <div className="color-picker">
                  <span className="colorName">Hex</span>
                  <p className="colorCode">{SubHeadingTextColor}</p>
                  <div className="colorPaletteInput">
                    <InputColorPicker
                      selectedColor={SubHeadingTextColor}
                      onChange={(color) =>
                        handleColorTheme("SubHeadingTextColor", color)
                      }
                    />
                  </div>
                </div>
              </label>
              <label>
                <span className="text-2xs mb-5">Hyperlink</span>
                <div className="color-picker">
                  <span className="colorName">Hex</span>
                  <p className="colorCode">{HyperlinkTextColor}</p>
                  <div className="colorPaletteInput">
                    <InputColorPicker
                      selectedColor={HyperlinkTextColor}
                      onChange={(color) =>
                        handleColorTheme("HyperlinkTextColor", color)
                      }
                    />
                  </div>
                </div>
              </label>
              <label>
                <span className="text-2xs mb-5">Hyperlink Hover</span>
                <div className="color-picker">
                  <span className="colorName">Hex</span>
                  <p className="colorCode">{HyperlinkHoverColor}</p>
                  <div className="colorPaletteInput">
                    <InputColorPicker
                      selectedColor={HyperlinkHoverColor}
                      onChange={(color) =>
                        handleColorTheme("HyperlinkHoverColor", color)
                      }
                    />
                  </div>
                </div>
              </label>
              <label>
                <span className="text-2xs mb-5">Button</span>
                <div className="color-picker">
                  <span className="colorName">Hex</span>
                  <p className="colorCode">{ButtonBackground}</p>
                  <div className="colorPaletteInput">
                    <InputColorPicker
                      selectedColor={ButtonBackground}
                      onChange={(color) =>
                        handleColorTheme("ButtonBackground", color)
                      }
                    />
                  </div>
                </div>
              </label>
              <label>
                <span className="text-2xs mb-5">Button Text </span>
                <div className="color-picker">
                  <span className="colorName">Hex</span>
                  <p className="colorCode">{ButtonText}</p>
                  <div className="colorPaletteInput">
                    <InputColorPicker
                      selectedColor={ButtonText}
                      onChange={(color) =>
                        handleColorTheme("ButtonText", color)
                      }
                    />
                  </div>
                </div>
              </label>
              <label>
                <span className="text-2xs mb-5">Button Hover</span>
                <div className="color-picker">
                  <span className="colorName">Hex</span>
                  <p className="colorCode">{ButtonHoverBackground}</p>
                  <div className="colorPaletteInput">
                    <InputColorPicker
                      selectedColor={ButtonHoverBackground}
                      onChange={(color) =>
                        handleColorTheme("ButtonHoverBackground", color)
                      }
                    />
                  </div>
                </div>
              </label>
              <label>
                <span className="text-2xs mb-5">Button Text Hover</span>
                <div className="color-picker">
                  <span className="colorName">Hex</span>
                  <p className="colorCode">{ButtonHoverTextColor}</p>
                  <div className="colorPaletteInput">
                    <InputColorPicker
                      selectedColor={ButtonHoverTextColor}
                      onChange={(color) =>
                        handleColorTheme("ButtonHoverTextColor", color)
                      }
                    />
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
export default BodyCustomize