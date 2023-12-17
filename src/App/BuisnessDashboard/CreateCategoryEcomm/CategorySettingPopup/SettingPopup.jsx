import React from 'react';
import CheckboxInput from '../../../../Common/Form/CheckboxInput';
import './settingPop.scss';

export const SettingPopup = ({ showOnHeader, InputChangeHeader, InputChangeFooter, showOnFooter, data, inputFeatureChange, isParent, handelDelete, dropdownRef, shop }) => {
  // console.log(showOnFooter,
  //   showOnHeader, ";limne 7")
  return (

    <div className='settingpop-container' ref={dropdownRef}>
      {
        (isParent || shop) && <div className='settingPop-header-wrap'>
          <CheckboxInput
            checked={showOnHeader}
            label={"Show on header"}
            LabelClass={"label-settingpop eComm-checkbox-center"}
            className={"setting-checkbox"}
            onChange={InputChangeHeader}
          />
          <div className='hr-line' ></div>
        </div>
      }

      {
        (isParent || shop) && <div className='settingPop-header-wrap'>
          <CheckboxInput
            checked={showOnFooter}
            label={"Show on footer"}
            LabelClass={"label-settingpop eComm-checkbox-center"}
            className={"setting-checkbox"}
            onChange={InputChangeFooter}

          />
          {!shop &&
            <div className='hr-line' > </div>
          }

        </div>}
      {
        !shop && <div className='settingPop-header-wrap'>
          <CheckboxInput
            checked={data.featured}
            onChange={(e) => inputFeatureChange(e, data)}
            label={"Mark as featured"}
            LabelClass={"label-settingpop eComm-checkbox-center"}
            className={"setting-checkbox"}
          />
          <i className='ed-icon  primary icon-iIcon hoverIcon' title='On switching on “Mark as featured”
          toggle button, your category will be
          shown on Home Page'></i>
          <div className='hr-line' > </div>
        </div>
      }

      {/*
      <div className='settingpop-iconBox'>
          <i className='ed-icon i-xs base icon-delete' onClick={() => handelDelete(data)}></i>
        {data.isHide ? (
          <i className="ed-icon i-xxs base icon-cross" onClick={() => setCloseEye(false, data)} ></i>
          // onClick={() => handelIsHide(data)}
        ) : (
          < i className='ed-icon i-xxs base icon-eye' onClick={() => setCloseEye(true, data)}></i>
          // onClick={() => handelIsHide(data)} 
        )}
        <p className='text-3xs base w-400 mt-2'>Toggle visibility</p>

      </div>
      <div className='hr-line' > </div>
      
      {/* delete icon div */}
      {!shop &&
        <div className='settingpop-iconBox'>
          <i className='ed-icon i-xxs base icon-delete' ></i>
          {/* onClick={() => handelDelete(data)} */}

          <p className='text-3xs base w-400 mt-3' onClick={() => handelDelete()}>Delete</p>
        </div>
      }

    </div>
  )
}
