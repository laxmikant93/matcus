import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../../../../Common/Breadcrumb';
import BreadcrumbItem from '../../../../../Common/Breadcrumb/BreadcrumbItem';
import { postCurrencyDetails, postCurrencyDetailsReset } from '../../../../../store/actions/ecomCurrency';
import CircleButton from '../../SettingComponents/CircleButton/CircleButton';
import TabComponent from './Components/TabComponent/TabComponent';
import './currencyAndLanguage.scss';
import { useCookies } from 'react-cookie';
// import Api from "../../Classes/Api";
import AppLinkUrl from '../../../../../Common/AppLink/AppLinkUrl';

const CurrencyAndLanguage = () => {

  let history = useNavigate();
  let dispatch = useDispatch();

  const { user, successData } = useSelector((state) => {
    return {
      user: state.user,
      successData: state.ecommerceCurrency.postCurrencyData.success,
    }
  })

  const [primaryCurrency, setPrimaryCurrency] = useState({});
  const [secondaryCurrency, setSecondaryCurrency] = useState([]);
  const [languageData, setLanguageData] = useState({});
  const [changeData, setChangeData] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["googtrans"]);

  const handlePrimaryCurrencyInfo = (value) => {
    setPrimaryCurrency(value)
  }

  const handleSecondaryCurrencyInfo = (value, onchange) => {
    setSecondaryCurrency(value);
    setChangeData(onchange);
  }

  const handleLanguageInfo = (value, onchange) => {
    setLanguageData(value);
    setChangeData(onchange);
  }

  const handleSaveButton = () => {
    let data =
    {
      data: {
        // primary: primaryCurrency,
        currencies: secondaryCurrency,
        language: languageData
      }
    }
    dispatch(postCurrencyDetails(user.user_business, data, changeData));

  }
  useEffect(() => {
    if (successData) {
      removeCookie('googtrans', { domain: AppLinkUrl.getHost(), path: '/' })
    }
  }, [removeCookie, successData])

  // useEffect(() => {
  //   return () => {
  //     dispatch(postCurrencyDetailsReset());
  //   }
  // }, [dispatch])


  const handleCancelButton = () => {
    history("/ecommerce/settings");
  }

  return (
    <React.Fragment>
      <div className='currency-container'>
        <Breadcrumb>
          <BreadcrumbItem to="/ecommerce/settings" title=" Settings" />
          {/* <BreadcrumbItem to="/website-manage" title="Manage Website" /> */}
          <BreadcrumbItem to="/ecommerce/currency-and-language" title="Currency and language settings" />
        </Breadcrumb>
        <div className='currency-wrapper'>
          <div className='currency-topdiv'>
            <div className='heading-div'>
              <div className='heading-wrapper'>
                <div className='heading-btn-div'>
                  <div>
                    <div className='inline align-center heading-item'>
                      <CircleButton position={'left'} path={'/ecommerce/settings'} />
                      <h1 className='text-md w-600 website-Setting-heading base'>Currency and Language settings</h1>
                    </div>

                    <p className='text-2xs w-400 base currency-subheading'>Manage your website’s language and currency here.</p>
                  </div>

                  {/* <div>



                  </div> */}
                  <div className='btn-div '>
                    <button className='button btn-o-silver btn-xs trashp' onClick={handleCancelButton}>Cancel</button>
                    <button className='button button-primary btn-xs' onClick={handleSaveButton}>Save</button>
                  </div>
                </div>

              </div>
            </div>
            <hr className='mt-20' />
          </div>
          <div className='currency-lower-div'>
            <TabComponent onLoadPrimaryCurrencyInfo={handlePrimaryCurrencyInfo}
              onLoadSecondaryCurrencyInfo={handleSecondaryCurrencyInfo} onLoadLanguageInfo={handleLanguageInfo} />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default CurrencyAndLanguage