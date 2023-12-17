import React from 'react';
import { useState } from 'react';
import Card from '../../../../../../../Common/Card';
import CardBody from '../../../../../../../Common/Card/CardBody';
import CheckboxInput from '../../../../../../../Common/Form/CheckboxInput';
import CurrencyComponent from '../CurrencyComponent/CurrencyComponent';
import './tabComponents.scss';
import ImageLang from '../../../../asserts/images/lang-group.png'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import LanguagesJson from '../languages.json'

const TabComponent = ({ onLoadPrimaryCurrencyInfo, onLoadSecondaryCurrencyInfo, onLoadLanguageInfo }) => {

  const { getSelectedCurrencyDetails, getSelectedCurrencySuccess } = useSelector((state) => {
    return {
      getSelectedCurrencyDetails: state.ecommerceCurrency.getCurrencyData.data,
      getSelectedCurrencySuccess: state.ecommerceCurrency.getCurrencyData.success

    }
  })

  const [toggleState, setToggleState] = useState(1);
  const [primaryLanguage, setPrimaryLanguage] = useState("ENGLISH");
  const [languageSymbol, setLanguageSymbol] = useState("EN");
  const [checkbox, setCheckbox] = useState(false);
  const [onChange, setOnChange] = useState(false);
  const [languageOptions, setLanguageOptions] = useState(LanguagesJson);


  const handleToggleState = (index) => {
    setToggleState(index);
  }

  const handleChange = (e) => {
    let inputvalue = e.target.value;
    let symbol = inputvalue.split("-");
    setPrimaryLanguage(symbol[0]);
    setLanguageSymbol(symbol[1]);
    setOnChange(true);
  }

  const handleCheckbox = (e) => {
    if (e.target.checked) {
      setCheckbox(true);
    }
    else {
      setCheckbox(false);
    }
    setOnChange(true);
  }

  useEffect(() => {
    onLoadLanguageInfo({
      primaryLanguage: primaryLanguage,
      symbol: languageSymbol?.toLowerCase(),
      multipleLanguage: checkbox
    }, onChange)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkbox, languageSymbol, onChange, primaryLanguage])

  useEffect(() => {
    if (getSelectedCurrencySuccess && getSelectedCurrencyDetails && getSelectedCurrencyDetails.language) {
      setPrimaryLanguage(getSelectedCurrencyDetails.language?.primaryLanguage);
      setLanguageSymbol(getSelectedCurrencyDetails.language?.symbol?.toUpperCase());
      setCheckbox(getSelectedCurrencyDetails.language?.multipleLanguage);
      setOnChange(false);
    }
  }, [getSelectedCurrencyDetails, getSelectedCurrencySuccess])

  return (
    <React.Fragment>
      <div className='tabContainer'>
        <div className='tab-head'>
          <div className={`tab ${toggleState === 1 ? 'active-tab' : ''}`} onClick={() => { handleToggleState(1) }}>Currency</div>
          <div className={`tab ${toggleState === 2 ? 'active-tab' : ''}`} onClick={() => { handleToggleState(2) }}>Language</div>
        </div>
        <div className='tab-content-div'>
          <div className={`${toggleState === 1 ? 'active-content' : 'content'}`}>
            <CurrencyComponent onLoadPrimaryCurrencyInfo={onLoadPrimaryCurrencyInfo}
              onLoadSecondaryCurrencyInfo={onLoadSecondaryCurrencyInfo} />
          </div>
          <div className={`${toggleState === 2 ? 'active-content' : 'content'}`}>
            <div className='language-wrapper'>
              <div className='language-left'>
                <Card className='currencyCard'>
                  <CardBody>
                    <div className='cardBody-container'>
                      <p className='tex-18 w-500 primary website-name'>Language</p>
                      <p className='tex-18 w-500 base mt-15 '>Primary Language</p>
                      <p className='text-2xs w-300 base mt-2'>Select primary language for your website</p>
                      <div className='language-dropdown-container'>
                        <div className="formFieldwrap sidebar-formgroup ">
                          <div className="addProduct-align-div ">
                            <select
                              id="list"
                              defaultValue={false}
                              value={`${primaryLanguage}-${languageSymbol}`}
                              onChange={handleChange}
                            >
                              {primaryLanguage ? "" :
                                <option value="">Select Primary Language</option>
                              }
                              {languageOptions.length ? languageOptions.map((item, key) => {
                                return (
                                  <option value={`${item.name}-${item.code}`} key={key} >{item.name}</option>
                                );
                              }) : ""}
                              {/* <option value="Hindi" >Hindi </option>
                              <option value="Telgu" >Telgu</option>
                              <option value="Marathi" >Marathi</option>
                              <option value="Punjabi" >Punjabi</option> */}
                            </select>
                          </div>
                        </div>
                        <div className='checkobox-wrapper'>
                          <CheckboxInput
                            label={"Check the box if you want to show multiple language on your website"}
                            LabelClass={"labe-checkbox"}
                            className={"eComm-checkbox"}
                            disabled={!primaryLanguage}
                            checked={checkbox}
                            onChange={handleCheckbox}
                          />
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>

              <div className='language-right'>
                {checkbox &&
                  <Card className='currencyCard'>
                    <CardBody>
                      <p className='tex-18 w-500 primary website-name'>Preview</p>
                      <div className='cardBody-container mt-15'>
                        <div className='show-lang'>
                          <select
                            name="lang"
                            id="lang"
                            value={primaryLanguage}
                            disabled
                          >
                            {/* {languageOptions.length ? languageOptions.map((item, key) => {
                              return (
                                <option value={item.name} key={key} >{item.name}</option>
                              );
                            }) : ""} */}
                            <option> {primaryLanguage}</option>
                            {/* <option value="English" >ENG</option>
                            <option value="Hindi" >Hindi </option>
                            <option value="Telgu" >Telgu</option>
                            <option value="Marathi" >Marathi</option>
                            <option value="Punjabi" >Punjabi</option> */}
                          </select>
                        </div>
                        <div className='img-div'>
                          <img src={ImageLang} alt="" />
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                }
              </div>



            </div>
          </div>
        </div>
      </div>
    </React.Fragment >
  )
}

export default TabComponent