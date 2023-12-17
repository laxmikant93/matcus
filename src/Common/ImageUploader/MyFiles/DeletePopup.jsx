import React, { forwardRef } from "react";
import "./deletepopup.scss"

const DeletePopup = forwardRef(({ loading, handleDelete, cancel }, ref) => {
  return (

    <div className='deletePop-container-admin' ref={ref}>
      <div className='trueThemepop-wrap-admin'>
        <div className="deleteContent">
          <button className='cancel-btn' onClick={() => cancel()}><i className='ed-icon i-xs  icon-cross' ></i></button>
          <p className='deletepop-p text-center'> {"Delete Confirmation"}</p>
          <p className='delete-para'>
            {" Are you sure you want to delete the files permanently? The deleted files will not appear on your site anymore. It may take 3-4 days to reflect on your site."}
          </p>
        </div>
        <div className='deletePop-btn-wrapper'>
          <hr className='line' />
          <button className="buttonpop" onClick={() => cancel()} >Cancel</button>
          {
            loading ? (
              <button className={`buttonpop  btn-delete`}>{"Deleting..."}  </button>
            ) : (
              <button className="btn-delete" onClick={() => handleDelete()}>Delete</button>
            )
          }
        </div>
      </div>
    </div>

  )
})
export default DeletePopup