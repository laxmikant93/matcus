import React from 'react'
import { useState } from 'react';
import FormError from '../../../../../../Common/Form/FormError';
import FormInput from '../../../../../../Common/Form/FormInput';
import CardContainer from '../../../SettingComponents/CardContainer/CardContainer';
import './websiteMetaTitle.scss';
import PreviewImg from '../../../asserts/images/favicon.png';
import EdFav from '../../../asserts/images/edfav.png';
import Moobi from '../../../asserts/images/moobi.png';
import Canva from '../../../asserts/images/canva.webp'
import { useDispatch, useSelector } from 'react-redux';
import { getInstituteData, patchInstituteInfo } from '../../../../../../store/actions/businessInfo';
import { useEffect } from 'react';
import ValidationFile from '../../../../../../Classes/ValidationFile';
const WebsiteMetaTitle = ({onMetaTitle,favProp}) => {
  const [inputFill, setInputFill] = useState(false);
  const [metaTitle, setMetaTitle] = useState('School Management System I LMS');
  const [metaTitleError, setMetaTitleError] = useState(false);
  const [para, setpara] = useState('School Management System I LMS ');
  const [editMetatitle, setEditMetaTitle] = useState(false)
  const { user, businessdetail, getbusinessInfoData } = useSelector((state) => {
    return {
      user: state.user,
      businessdetail: state.manageinstituteinfo,
      getbusinessInfoData: state.businessInfo.getInstituiteData,
    };
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInstituteData(user.user_business, user.user_business_type));
  }, [dispatch, user.user_business, user.user_business_type])

  useEffect(() => {
    if (getbusinessInfoData.success && !getbusinessInfoData.loading) {
      setMetaTitle(getbusinessInfoData.data.meta_title ? getbusinessInfoData.data.meta_title : "");
    }
  }, [getbusinessInfoData.success, getbusinessInfoData.data.meta_title])

  const handleGetWebsiteTitle = (e) => {
    setMetaTitle(e.target.value);
  }
  const handleEdit = () => {
    setEditMetaTitle(true)
  }
  const handleTitleDone = () => {
    if (ValidationFile.isEmpty(metaTitle)) {
      setMetaTitleError(true);
    }
    if (!ValidationFile.isEmpty(metaTitle)) {
      onMetaTitle(metaTitle)
      dispatch(patchInstituteInfo(user.user_business, { meta_title: metaTitle }, user.user_business_type, user._id, user.user_dashboard_stepper));
      setEditMetaTitle(false)

    }
  }
  // console.log(getbusinessInfoData.data.meta_title, "getmetaa")
  return (
    <React.Fragment>
      <div className='websiteMetaTitle-container'>
        <CardContainer>
          <div className='metaTitle-wrapper'>
            <div className='meta-left'>
              <p className='text-s w-500 primary'>Website Meta Title</p>
              <hr className='hr-line' />
              <p className='text-2xs w-300 base'>Edit the title of your website</p>
              <div className='metaTitleInput-container'>
                {editMetatitle ?
                  <div className='input-wrapper'>
                    <div className="formFieldwrap ">
                      <FormInput
                        type="text"
                        label=""
                        id="name"
                        name="meta_title"
                        value={metaTitle}
                        placeholder="Enter meta title of your website"
                        maxLength="150"
                        onChange={handleGetWebsiteTitle}
                        autoFocus={true}
                      />
                      <FormError
                        show={metaTitleError}
                        error="Meta title is required."
                      />
                    </div>
                    <div>
                      <p className='text-xs w-400 primary cursor-pointer text-right' onClick={handleTitleDone} >Done</p>
                    </div>
                  </div> :
                  <>
                    <div className='siteName-edit-wrapper'>
                      <div className='edit-input-wrapper'>
                        <div className="formFieldwrap ">
                          <FormInput
                            type="text"
                            label=""
                            id="name"
                            name="site_name"
                            value={metaTitle}
                            placeholder="Enter Site Name"
                            maxLength="80"
                          />
                        </div>
                      </div>
                      <div className='edit-text-wrap'>
                        <p className='text-xs w-400 primary cursor-pointer ' onClick={handleEdit}>Edit</p>
                      </div>
                    </div>
                  </>
                }
                <p className='text-3xs w-300 base text-right info-limit-text'>* Max word limit 150 words</p>
              </div>
            </div>
            <div className='v-line'></div>
            <div className='meta-right'>
              <p className='text-s w-500 primary'> Preview</p>
              <div className='preview-div'>
                <div className='image-div'>
                  <img src={PreviewImg} alt="" />
                </div>
                <div className='preview-logo-div'>
                  <div className='circle-image'>
                    <img src={favProp?favProp: EdFav} alt="" />
                  </div>
                  <div className='text-div'>
                    <p> {metaTitle ? (metaTitle.slice(0, 25)) : (para.slice(0, 25))}</p>
                  </div>
                </div>
              </div>

            </div >

          </div>

        </CardContainer>
      </div>
    </React.Fragment>
  )
}

export default WebsiteMetaTitle