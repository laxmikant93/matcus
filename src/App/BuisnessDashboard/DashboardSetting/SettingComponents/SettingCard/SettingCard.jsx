import React from 'react';
import { Link } from 'react-router-dom';
import CardContainer from '../CardContainer/CardContainer';
import CircleButton from '../CircleButton/CircleButton';
import './settingCard.scss';

const SettingCard = ({ LMSdata, data }) => {
  return (
    <React.Fragment>
      <div className='settingCard-container'>
        {LMSdata ?
          LMSdata.map((options) => {
            return (
              <div className='setting-wrap' key={options.id}>
                <p className='text-18 w-500 base mt-25 '>{options.heading}</p>

                {
                  options.settingData.map((options) => {
                    return (
                      <Link to={`${options.path}`}>
                        <div className='sub-category-wrap cursor-pointer'>
                          <CardContainer>
                            <div className='settingCard-wrapper'>
                              <div className='icon-div'>
                                <i className={`ed-icon i-48 primary ${options.icon} `}></i>
                                <p className=' text-18 w-500 base '>{options.title}</p>
                              </div>
                              <div className='vr-line'></div>
                              <div className=' inline between-lg between-xs align-center settingCard-text-wrapper'>
                                <div className='setting-text-div'>
                                  <div className='text-div'>
                                    <p className='text-xs w-400 base'> {options.subtitle}</p>
                                  </div>
                                </div>
                                <div className='btn-div'>
                                  <CircleButton position={'right'} path={options.path} />
                                </div>
                              </div>

                            </div>
                          </CardContainer>
                        </div>
                      </Link>
                    )
                  })
                }

              </div>
            )
          })
          :
          data.map((options) => {
            return (
              <div className='setting-wrap' key={options.id}>
                <p className='text-18 w-500 base mt-25 '>{options.heading}</p>

                {
                  options.settingData.map((options) => {
                    return (
                      <Link to={`${options.path}`}>
                        <div className='sub-category-wrap cursor-pointer'>
                          <CardContainer>
                            <div className='settingCard-wrapper'>
                              <div className='icon-div'>
                                <i className={`ed-icon i-48 primary ${options.icon} `}></i>
                                <p className=' text-18 w-500 base '>{options.title}</p>
                              </div>
                              <div className='vr-line'></div>
                              <div className=' inline between-lg between-xs align-center settingCard-text-wrapper'>
                                <div className='setting-text-div'>
                                  <div className='text-div'>
                                    <p className='text-xs w-400 base'> {options.subtitle}</p>
                                  </div>
                                </div>
                                <div className='btn-div'>
                                  <CircleButton position={'right'} path={options.path} />
                                </div>
                              </div>

                            </div>
                          </CardContainer>
                        </div>
                      </Link>
                    )
                  })
                }

              </div>
            )
          })
        }
      </div >
    </React.Fragment >
  )
}

export default SettingCard