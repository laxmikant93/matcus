import React from 'react'
import './imageUploder.scss'

const AddImageIcon = ({ handleShow, count }) => {


  return (
    < React.Fragment >
      <div className="image-drag" onClick={handleShow}>

        <div className={`ActionUploadBanner ${count ? 'actionDisable' : ''}`}>
          {/* <ImageCropper
            minWidth={80}
            maxWidth={200}
            minHeight={40}
            maxHeight={100}
            defaultRatio={1 / 1}
            // BtnName={imageBanner ? "Update Banner" : "Upload Banner"}
            BtnPropClass="dragbutton"
          /> */}
          <span className="set__icon"><i className='icon-plus'>&#43;</i></span>
        </div>

        {/* after coppper image put image below */}
        {/* <div className='image-div'>
                        <img src={Canva} alt="" />
                      </div> */}

      </div>
    </React.Fragment >
  )
}

export default AddImageIcon