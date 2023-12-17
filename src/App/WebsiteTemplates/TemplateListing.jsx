import React, { useRef, useState } from 'react';
// import EDropdown from '../Dashboard/EcommerceDashboard/Component/EDropdown';
import './templeteSelect.scss';
// import ThemeImage from '../Dashboard/EcommerceDashboard/assets/icons/themeImage.png';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createWebsiteTemplate, getTemplateList, resetCreateWebsiteTemplate } from '../../store/actions/WebsiteTemplate';
import { DashboardStepperAddTemplate, updateDashboardStepper } from "../../store/actions/user";
// import { createWebsiteTemplate, getTemplateList, resetCreateWebsiteTemplate } from '../../store/actions/WebsiteTemplate';
import NoDataAvailable from '../../Common/NoDataAvailable';
import { useNavigate } from 'react-router-dom';
import AppLinkUrl from '../../Common/AppLink/AppLinkUrl';
import Auth from '../../Classes/Auth';
// import Pagination from '../../../../Common/Pagination';
import Dialog from '../../Common/Dialog';
import DialogBody from '../../Common/Dialog/DialogBody';
import ImageViewer from '../../Common/ImageViewer';
const TemplateListing = () => {
  const history = useNavigate()
  // const menuColor = ['templete1', 'templete2', 'templete3', 'templete4', 'templete5', 'templete6'];
  const { user, templateList, templateListSuccess, createTemplateSuccess, createTemplateData } = useSelector((state) => {
    return {
      user: state.user,
      templateList: state.websiteTemplate.list.data,
      templateListSuccess: state.websiteTemplate.list.success,
      createTemplateSuccess: state.websiteTemplate.create.success,
      createTemplateData: state.websiteTemplate.create.data
    }
  })
  
  const PDPopToggleRef = useRef();
  const dispatch = useDispatch()
  const editTemplate = (item) => {
    if(AppLinkUrl.privateDomain()){
      PDPopToggleRef.current.open()
    }else{
    if (user.user_business_type === "LMS") {
      let createTemplateData = {
        owner: user._id,
        template: item._id,
        // business: "",
        // institute: "ObjectId",
        theme: item.theme,
        isDefaultTheme: true,
        industry: user.user_business_type,
        templateImg: item.templateImg
      }
      dispatch(createWebsiteTemplate({ ...createTemplateData, institute: user.user_institute },"LMS"))
    } else {
      let createTemplateData = {
        owner: user._id,
        template: item._id,
        // business: "",
        // institute: "ObjectId",
        theme: item.theme,
        isDefaultTheme: true,
        industry: user.user_business_type,
        templateImg: item.templateImg
      }
      dispatch(createWebsiteTemplate({ ...createTemplateData, business: user.user_institute },"Services"))
      // dispatch(createWebsiteTemplate({ ...createTemplateData, business: user.user_business }))
    
    }}
  }
  useEffect(() => {
    if (createTemplateSuccess && createTemplateData._id) {
      if(user.user_business_type==="LMS"){
        window.open(`${AppLinkUrl.baseUrl()}theme-sidebar/${createTemplateData._id}`)
      }else{
        window.open(`${AppLinkUrl.baseUrl()}service-theme-sidebar/${createTemplateData._id}`)
      }
      // history(`/theme-sidebar/${createTemplateData._id}`)
    }
    return () => {
      dispatch(resetCreateWebsiteTemplate())
    }
  }, [createTemplateData._id, createTemplateSuccess, dispatch, user.user_business_type])
  const previewTemplate = (item) => {
    let type = "default"
    if(AppLinkUrl.privateDomain()){
      PDPopToggleRef.current.open()
    }else{
      if (user.user_business_type === "Services") {

        window.open(`${AppLinkUrl.baseUrl()}service-template-preview/${item._id}/${type}`)
      } else {
  
        window.open(`${AppLinkUrl.baseUrl()}website-template-preview/${item._id}/${type}`)
      }
    }
    // history(`/website-template-preview/${item._id}/${type}`)
  }
  const handleEdneedRoute = ()=>{
    window.open(`https://edneed.com/auth/login`,"_blank")
    PDPopToggleRef.current.close()
  }
  useEffect(() => {
    dispatch(getTemplateList(user.user_business_type))
    if (user.user_dashboard_stepper && user.user_dashboard_stepper.addTemplate === false) {
      let steup = {
        ...user.user_dashboard_stepper, addTemplate: true,
      }
      delete steup._id
      Auth.updateUserDetail("user_dashboard_stepper", steup);
      dispatch(updateDashboardStepper(steup))
      let stepperData = {
        addTemplate: true,
        condition: "SelectTemplate",
        industry: user.user_business_type,
        institute: user.user_institute,
        owner: user._id
      }

      dispatch(DashboardStepperAddTemplate(stepperData))
    }


  }, [user.user_business_type])
  const handleRoute = () => {
    history("/dashboard")
  }
  return (
    <React.Fragment>
      <div className='dashBoard-home-container'>
        <div className='templete-select-container'>
          <h1 className='text-xl w-600'>Pick the Website  Template You Love</h1>
          <p className='text-xxs w-400'>It’s personalized for your site type: <span className='dashboard-type-text' onClick={handleRoute}>{user.user_business_type}</span></p>

          {/* <div className='templete-top-menu-header-wrap mt-25'>
            <EDropdown menuName={'All Templates'} menuOptions={menuColor} arrow={true} className={'color-black'} />
            <EDropdown menuName={'Ecommerce'} menuOptions={menuColor} arrow={true} className={'color-black'} />
            <EDropdown menuName={'Institution'} menuOptions={menuColor} arrow={true} className={'color-black'} />
            <EDropdown menuName={'Medical'} menuOptions={menuColor} arrow={true} className={'color-black'} />
            <EDropdown menuName={'Food'} menuOptions={menuColor} arrow={true} className={'color-black'} />
            <EDropdown menuName={'Blog'} menuOptions={menuColor} arrow={true} className={'color-black'} />
          </div> */}
          <div className='templete-area-container'>
            {/* theme loop start here */}

            {
              // user.user_business_type === "Services" ?


              //   <div className="templete-card-wrap ">
              //     <div className="templete-image-wrap">
              //       <img src={TranquilImage} alt="themeimage" className='img-response' />
              //       <div className='templete-overlay-wrap'>
              //         <button className='button button-primary btn-oval btn-sm' onClick={() => editTemplate()} target="_blank">Edit</button>
              //         <button className='button btn-o-primary primary btn-oval button-s btn-xs' onClick={() => previewTemplate()} target="_blank">View</button>
              //       </div>

              //     </div>
              //     <p className='text-xs w-400'>The Tranquill</p>
              //   </div>
              //   :
                templateListSuccess ? (
                  templateList.length > 0 ? (
                    templateList.map((item) => {
                      return (
                        <div className="templete-card-wrap ">
                          <div className='templete-image-wrap'>
                            <img src={item.templateImg} alt="themeimage"  />
                            <ImageViewer
            object={item.templateImg} className='img-response'/>
                            <div className='templete-overlay-wrap'>
                              <button className='button button-primary btn-oval btn-sm' onClick={() => editTemplate(item)} >Edit</button>
                              <button className='button btn-o-primary btn-oval btn-sm' onClick={() => previewTemplate(item)}>View</button>
                            </div>
                          </div>
                          <p className='text-xs w-400'>{item.templateName}</p>
                        </div>
                      )
                    })
                  ) : (<NoDataAvailable title="No Records Found." />)
                ) : <div className="loadingGridData">
                  <i className="ed-loadingGrid"></i>
                </div>
            }
            {/* theme loop end here */}
          </div>

          <div className='pagination-container'>
            {/* <Pagination
              className="pagination-bar"
              currentPage={1}
              totalCount={100}
              pageSize={10}
            /> */}
          </div>
        </div>
      </div>
      <Dialog ref={PDPopToggleRef} >
          <DialogBody>
            <p className='text-s w-400 base'>You are about to open Editor, Are you sure?</p>
            <div className='divider'></div>
            <p className='text-xs w-400 base mt-20 mb-20'>Note : You will be redirected to Edneed Login page.</p>
            
            <div className='seoPop-btn-wrapper mt-15'>
              <button className='button btn-o-base btn-xs' onClick={()=>PDPopToggleRef.current.close()} >Close</button>
              {/* {
                productDetail ? <button className='button btn-xs seo-btns btn-save' onClick={handleUpdate}> Update changes</button> :
                  <button className='button btn-xs seo-btns btn-save' onClick={handleSave}> Save changes</button>
              } */}

              <button className='button button-primary btn-xs' onClick={()=>handleEdneedRoute()}>Open</button>
            </div>
          </DialogBody>
        </Dialog>
    </React.Fragment>
  )
}

export default TemplateListing