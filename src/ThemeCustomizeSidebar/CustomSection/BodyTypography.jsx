import React, { useState } from 'react'
import SelectInput from '../../Common/Form/SelectInput'
import "../themesidebar.scss"
// import iconleft from "./sidebar-icon/icon-fontleft.svg"
// import iconcenter from "./sidebar-icon/icon-fontcenter.svg"
// import iconright from "./sidebar-icon/icon-fontright.svg"
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { findFont } from '../../store/actions/googleFonts'

const TypographyContent = ({ onLoadTypoData }) => {
  const { themeSuccess, themeData } = useSelector((state) => {
    return {
      themeSuccess: state.websiteTemplate.getTemplate.success,
      themeData: state.websiteTemplate.getTemplate.data
    }
  })
  const [typographyValues, setTypographyvalues] = useState(
    {
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
  const [arrowicon, setArrowIcon] = useState(false)
  const [arrowicon2, setArrowIcon2] = useState(false)
  const [arrowicon3, setArrowIcon3] = useState(false)
  const [h1Fontstyle, setH1Fontstyle] = useState([]);
  const [h2Fontstyle, setH2Fontstyle] = useState([]);
  const [h3Fontstyle, setH3Fontstyle] = useState([]);
  const [h4Fontstyle, setH4Fontstyle] = useState([]);
  const [h5Fontstyle, setH5Fontstyle] = useState([]);
  const [h6Fontstyle, setH6Fontstyle] = useState([]);
  const [regularFontstyle, setregularFontstyle] = useState([]);
  const [anchorFontstyle, setanchorFontstyle] = useState([]);
  const dispatch = useDispatch();
  const {
    fonts,
  } = useSelector((state) => {
    return {
      fonts: state.fonts.list,

    };
  });
  const findfontnamehandle = async (e, typo) => {
    const FontValue = await fonts.find((fontname) => fontname.fontname === e.target.value);
    switch (typo) {
      case "h1": {
        setH1Fontstyle(FontValue ? FontValue.fontstyle : []);
        break;
      }
      case "h2": {
        setH2Fontstyle(FontValue ? FontValue.fontstyle : []);
        break;
      }
      case "h3": {
        setH3Fontstyle(FontValue ? FontValue.fontstyle : []);
        break;
      }
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
      case "regular": {
        setregularFontstyle(FontValue ? FontValue.fontstyle : []);
        break;
      }
      case "anchor": {
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
      setTypographyvalues(themeData.themeGlobal.typography)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeSuccess])
  useEffect(() => {
    onLoadTypoData(typographyValues)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typographyValues])
  return (
    <>
      <ul className="Typography-wrap">
        <li>
          Heading 1 Text Format
          <div className="card mt-10">
            <div className={`select-wrap mb-10 ${arrowicon ? "active" : ""}`} onClick={() => setArrowIcon(!arrowicon)}>
              <select name="FontFamily" onClick={(e) => {
                findfontnamehandle(e, "h1");
                handleUpdate(e, "h1");
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
                  <select name="FontStyle" id="select-wrap" onClick={(e) => handleUpdate(e, "h1")}>
                    {h1Fontstyle.map((item, index) => (
                      <option value={item} key={index}>{item}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="item">
                <div className="fontinput-wrap">
                  <i className="icon-fontsize icon"></i>
                  <input type="number" id="quantity" name="FontSize" min="1" onChange={(e) => handleUpdate(e, "h1")} />
                  <span>pt</span>
                </div>
              </div>
              <div className="item">
                <div className="fontinput-wrap">
                  <i className="icon-verticalalign icon"></i>
                  <input type="number" id="quantity" name="LetterSpacing" min="1" onChange={(e) => handleUpdate(e, "h1")} />
                  <span>px</span>
                </div>
              </div>
              <div className="item">
                <div className="fontinput-wrap">
                  <i className="icon-lineheight icon"></i>
                  <input type="number" id="quantity" name="LineHeight" min="1" onChange={(e) => handleUpdate(e, "h1")} />
                  <span>px</span>
                </div>
              </div>

            </div>
          </div>
        </li>
        <li>
          Heading 2 Text Format
          <div className="card mt-10">
            <div className={`select-wrap mb-10 ${arrowicon ? "active" : ""}`} onClick={() => setArrowIcon(!arrowicon)}>
              <select name="FontFamily" onClick={(e) => {
                findfontnamehandle(e, "h2");
                handleUpdate(e, "h2");
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
                  <select name="FontStyle" id="select-wrap" onClick={(e) => handleUpdate(e, "h2")}>
                    {h2Fontstyle.map((item, index) => (
                      <option value={item} key={index}>{item}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="item">
                <div className="fontinput-wrap">
                  <i className="icon-fontsize icon"></i>
                  <input type="number" id="quantity" name="FontSize" min="1" onChange={(e) => handleUpdate(e, "h2")} />
                  <span>pt</span>
                </div>
              </div>
              <div className="item">
                <div className="fontinput-wrap">
                  <i className="icon-verticalalign icon"></i>
                  <input type="number" id="quantity" name="LetterSpacing" min="1" onChange={(e) => handleUpdate(e, "h2")} />
                  <span>px</span>
                </div>
              </div>
              <div className="item">
                <div className="fontinput-wrap">
                  <i className="icon-lineheight icon"></i>
                  <input type="number" id="quantity" name="LineHeight" min="1" onChange={(e) => handleUpdate(e, "h2")} />
                  <span>px</span>
                </div>
              </div>

            </div>
          </div>
        </li>
        <li>
          Heading 3 Text Format
          <div className="card mt-10">
            <div className={`select-wrap mb-10 ${arrowicon ? "active" : ""}`} onClick={() => setArrowIcon(!arrowicon)}>
              <select name="FontFamily" onClick={(e) => {
                findfontnamehandle(e, "h3");
                handleUpdate(e, "h3");
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
                  <select name="FontStyle" id="select-wrap" onClick={(e) => handleUpdate(e, "h3")}>
                    {h3Fontstyle.map((item, index) => (
                      <option value={item} key={index}>{item}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="item">
                <div className="fontinput-wrap">
                  <i className="icon-fontsize icon"></i>
                  <input type="number" id="quantity" name="FontSize" min="1" onChange={(e) => handleUpdate(e, "h3")} />
                  <span>pt</span>
                </div>
              </div>
              <div className="item">
                <div className="fontinput-wrap">
                  <i className="icon-verticalalign icon"></i>
                  <input type="number" id="quantity" name="LetterSpacing" min="1" onChange={(e) => handleUpdate(e, "h3")} />
                  <span>px</span>
                </div>
              </div>
              <div className="item">
                <div className="fontinput-wrap">
                  <i className="icon-lineheight icon"></i>
                  <input type="number" id="quantity" name="LineHeight" min="1" onChange={(e) => handleUpdate(e, "h3")} />
                  <span>px</span>
                </div>
              </div>

            </div>
          </div>
        </li>
        <li>
          Heading 4 Text Format
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
                findfontnamehandle(e, "anchor");
                handleUpdate(e, "anchor");
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
                  <select name="FontStyle" id="select-wrap" onClick={(e) => handleUpdate(e, "anchor")}>
                    {anchorFontstyle.map((item, index) => (
                      <option value={item} key={index}>{item}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="item">
                <div className="fontinput-wrap">
                  <i className="icon-fontsize icon"></i>
                  <input type="number" id="quantity" name="FontSize" min="1" onChange={(e) => handleUpdate(e, "anchor")} />
                  <span>pt</span>
                </div>
              </div>
              <div className="item">
                <div className="fontinput-wrap">
                  <i className="icon-verticalalign icon"></i>
                  <input type="number" id="quantity" name="LetterSpacing" min="1" onChange={(e) => handleUpdate(e, "anchor")} />
                  <span>px</span>
                </div>
              </div>
              <div className="item">
                <div className="fontinput-wrap">
                  <i className="icon-lineheight icon"></i>
                  <input type="number" id="quantity" name="LineHeight" min="1" onChange={(e) => handleUpdate(e, "anchor")} />
                  <span>px</span>
                </div>
              </div>

            </div>
          </div>
        </li>
        <li>
          Paragraph Text Format
          <div className="card mt-10">
            <div className={`select-wrap mb-10 ${arrowicon ? "active" : ""}`} onClick={() => setArrowIcon(!arrowicon)}>
              <select name="FontFamily" onClick={(e) => {
                findfontnamehandle(e, "regular");
                handleUpdate(e, "regular");
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
                  <select name="FontStyle" id="select-wrap" onClick={(e) => handleUpdate(e, "regular")}>
                    {regularFontstyle.map((item, index) => (
                      <option value={item} key={index}>{item}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="item">
                <div className="fontinput-wrap">
                  <i className="icon-fontsize icon"></i>
                  <input type="number" id="quantity" name="FontSize" min="1" onChange={(e) => handleUpdate(e, "regular")} />
                  <span>pt</span>
                </div>
              </div>
              <div className="item">
                <div className="fontinput-wrap">
                  <i className="icon-verticalalign icon"></i>
                  <input type="number" id="quantity" name="LetterSpacing" min="1" onChange={(e) => handleUpdate(e, "regular")} />
                  <span>px</span>
                </div>
              </div>
              <div className="item">
                <div className="fontinput-wrap">
                  <i className="icon-lineheight icon"></i>
                  <input type="number" id="quantity" name="LineHeight" min="1" onChange={(e) => handleUpdate(e, "regular")} />
                  <span>px</span>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </>
  )
}

export default TypographyContent