import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import AppLinkUrl from '../../Common/AppLink/AppLinkUrl';
import Dialog from '../../Common/Dialog';
import DialogBody from '../../Common/Dialog/DialogBody';
import NoDataAvailable from '../../Common/NoDataAvailable';
import Popup from '../../Common/Popup';
import UseOutsideClick from '../../Common/UseOutsideClick';
import { deleteUserTemplate, getUserTemplates } from '../../store/actions/WebsiteTemplate';
import './templeteSelect.scss';
import ImageViewer from '../../Common/ImageViewer';

const MyTemplates = () => {
  const dispatch = useDispatch()
  const { user, getUserTemplatesList, getUserTemplatesSuccess, deleteUserTemplateLoading, deleteUserTemplateSuccess } = useSelector((state) => {
    return {
      user: state.user,
      getUserTemplatesList: state.websiteTemplate.userTemplatesList.data,
      getUserTemplatesSuccess: state.websiteTemplate.userTemplatesList.success,
      deleteUserTemplateLoading: state.websiteTemplate.deleteUserTemplate.loading,
      deleteUserTemplateSuccess: state.websiteTemplate.deleteUserTemplate.success,
    }
  })
  const RemovePopToggleRef = useRef();

  const PDPopToggleRef = useRef();
  UseOutsideClick(RemovePopToggleRef, () => {
    if (RemovePop) setRemovePop(false);
  });
 
  const [RemovePop, setRemovePop] = useState(false)
  const [deleteID, setDeleteID] = useState("")
  useEffect(() => {
    dispatch(getUserTemplates(user._id, user.user_institute, user.user_business_type))
  }, [dispatch, user._id, user.user_business_type, user.user_institute])

  const RemovePopState = (_id) => {
    setRemovePop(!RemovePop);
    setDeleteID(_id);
  };
  const editTemplate = (item) => {
    if(AppLinkUrl.privateDomain()){
      PDPopToggleRef.current.open()
    }else{
      if (user.user_business_type === "Services") {

        window.open(`${AppLinkUrl.baseUrl()}service-theme-sidebar/${item._id}`)
      } else {
  
        window.open(`${AppLinkUrl.baseUrl()}theme-sidebar/${item._id}`)
      }
    }
    
    // history(`/theme-sidebar/${item._id}`)
  }

  const previewTemplate = (item) => {
    let type = "user"
    // history(`/website-template-preview/${item._id}/${type}`)
    if(AppLinkUrl.privateDomain()){
     PDPopToggleRef.current.open()
    }else{
      if (user.user_business_type === "Services") {
        window.open(`${AppLinkUrl.baseUrl()}service-template-preview/${item._id}/${type}`)
      } else {
        window.open(`${AppLinkUrl.baseUrl()}website-template-preview/${item._id}/${type}`)
      }
    }
   

  }
  const deleteTemplate = (_id) => {
    dispatch(deleteUserTemplate({
      condition: "DeleteAllTemplate",
      templateID: _id,
      deleteUserTemplate: true,
      industry: user.user_business_type
    }))
  }

  const handleRoute = ()=>{
    window.open(`https://edneed.com/auth/login`,"_blank")
    PDPopToggleRef.current.close()
  }
  useEffect(() => {
    !deleteUserTemplateLoading && deleteUserTemplateSuccess && setRemovePop(false);
  }, [deleteUserTemplateLoading, deleteUserTemplateSuccess]);
  return (
    <React.Fragment>
      <div className=''>
        <div className='templete-select-container'>
          <h1 className='text-xl w-600'>Pick the Website Template You Love</h1>
         
              <div className='templete-area-container'>
                {/* theme loop start here */}

                {
                  getUserTemplatesSuccess ? (
                    getUserTemplatesList.length > 0 ? (
                      getUserTemplatesList.map((item) => {
                        return (
                          <>
                            <div className="templete-card-wrap ">
                              <div className="templete-image-wrap">
                               
                                 <ImageViewer
                                    object={item.templateImg} className='img-response'/>
                                <div className='templete-overlay-wrap'>
                                  <button className='button button-primary btn-oval btn-sm' onClick={() => editTemplate(item)} target="_blank">Edit</button>
                                 
                                  <button className='button btn-o-primary primary btn-oval button-s btn-xs' onClick={() => previewTemplate(item)} target="_blank">View</button>
                                  {!item?.ActivatedTemplate && 
                                  <button className='button btn-o-primary primary btn-oval button-s btn-xs'
                                   onClick={() => RemovePopState(item._id)} target="_blank">Delete</button>}
                                </div>
                              
                                {item._id === deleteID && RemovePop && (
                                  <Popup
                                    show={RemovePop}
                                    RemovePopToggleRef={RemovePopToggleRef}
                                    CancelProp={() => setRemovePop(!RemovePop)}
                                    RemoveProp={() => deleteTemplate(item._id)}
                                    loading={deleteUserTemplateLoading}
                                    
                                  >
                                    <p className="gray text-xxs w-300">
                                      You are about to remove this template.
                                    </p>
                                    <p className="dgray text-xxs w-400">Are you sure?</p>
                                  </Popup>
                                )}
                              </div>
                              <p className='text-xs w-400'>{item.templateName} {item.ActivatedTemplate ? "Activated" : "Not Activated"}</p>



                            </div>

                          </>
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

              <button className='button button-primary btn-xs' onClick={()=>handleRoute()}>Open</button>
            </div>
          </DialogBody>
        </Dialog>
    </React.Fragment>
  )
}
export default MyTemplates