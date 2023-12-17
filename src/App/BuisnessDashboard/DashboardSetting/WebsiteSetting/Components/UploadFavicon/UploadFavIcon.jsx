import React, { useRef } from "react";
import CardContainer from "../../../SettingComponents/CardContainer/CardContainer";
// import PreviewIcon from '../PreviewIcon/PreviewIcon';
// import UploadImage from '../UploadImage/UploadImage';
import "./uploadFavicon.scss";
import upload from "../../../asserts/images/upload.png";
import PreviewImg from "../../../asserts/images/favicon.png";
import Cropper from "../../../../../../Common/Cropper";
// import logo from '../../../asserts/images/moobi.png';
import EdFav from "../../../asserts/images/edfav.png";
import { useState } from "react";
import { useEffect } from "react";
import {
  getInstituteData,
  patchInstituteInfo,
} from "../../../../../../store/actions/businessInfo";
import { useDispatch, useSelector } from "react-redux";
import UploadButton from "../../../../../../Common/UploadButton";
import Uploader from "../../../../../../Common/ImageUploader";
import ImageViewer from "../../../../../../Common/ImageViewer";

const UploadFavIcon = ({ onUploadFavIcon, metaProp }) => {
  const [favIcon, setFavIcon] = useState("");
  const dispatch = useDispatch();
  const { user, getbusinessInfoData } = useSelector((state) => {
    return {
      user: state.user,
      businessdetail: state.manageinstituteinfo,
      getbusinessInfoData: state.businessInfo.getInstituiteData,
    };
  });
  const ref = useRef();
  const uploadImage = (data) => {
    let logo = data;
    setFavIcon(logo);
    onUploadFavIcon(logo.src);
    dispatch(
      patchInstituteInfo(
        user.user_business,
        { favIcon: logo },
        user.user_business_type,
        user._id,
        user.user_dashboard_stepper
      )
    );
  };
  // useEffect(() => {
  //   dispatch(patchInstituteInfo(user.user_business, { favIcon: favIcon }, user.user_business_type, user._id, user.user_dashboard_stepper));
  // }, [dispatch])
  // console.log(favIcon, "favIcon")
  const handleRomove = () => {
    setFavIcon("");
  };
  const handleCropperPopup = () => {
    ref.current.open();
  };
  useEffect(() => {
    dispatch(getInstituteData(user.user_business, user.user_business_type));
  }, [dispatch, user.user_business, user.user_business_type]);

  useEffect(() => {
    if (getbusinessInfoData.success && !getbusinessInfoData.loading) {
      setFavIcon(getbusinessInfoData.data.favIcon);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getbusinessInfoData.success, getbusinessInfoData.data.favIcon]);
  return (
    <React.Fragment>
      <div className="uploadfav-container">
        <CardContainer>
          <div className="upaload-wrapper">
            <div className="upload-left">
              <p className="text-s w-500 primary">Upload Favicon</p>
              <hr className="hr-line" />

              <div className="uploadImage">
                <div className="uploadImage-container">
                  <div className="uploadleft">
                    <UploadButton customButton={true}>
                      <div
                        className="upload-wrapper"
                        onClick={handleCropperPopup}
                      >
                        <div className="uploadIncon-div">
                          <div className="text-center upload-icon">
                            <img src={upload} alt="" />
                            <p className="text-xs w-500 base">Upload Image</p>
                          </div>
                        </div>
                      </div>
                    </UploadButton>
                    <Uploader
                      accept="image/png, image/jpeg, image/jpg, image/PNG, image/webp, image/WEBP"
                      onclose={() => ref.current.close()}
                      multiSelect={false}
                      discartRef={ref}
                      onUploaded={(data) => uploadImage(data)}
                      uploadLimit={1}
                    />
                  </div>
                  <div className="uploadright">
                    {favIcon ? (
                      <button
                        className="button btn-xs btn-o-silver gray"
                        onClick={handleRomove}
                      >
                        Remove
                      </button>
                    ) : (
                      <button
                        className="button btn-xs btn-o-primary primary"
                        onClick={handleCropperPopup}
                      >
                        Browse Media
                      </button>
                    )}

                    {/* when logo is uploaded show remove button */}
                  </div>
                </div>
                {/* <p className='text-2xs w-400 mt-3 primary imageLink-div'> <span><i className='ed-icon primary i-xxs icon-faculties '></i></span>  <span>ATTIF3.jpg file uploaded successfully</span></p> */}
                <p className="text-2xs w-300 base mt-10">
                  {" "}
                  <span className="w-500">.jpg, .png, .svg </span>format only.
                </p>
                <p className="text-2xs w-300 base mt-5">
                  {" "}
                  Upload an image of{" "}
                  <span className="w-500"> atleast 70px X 70px</span>
                </p>
              </div>
            </div>
            <div className="v-line"></div>
            <div className="upload-right">
              <p className="text-s w-500 primary">Favicon Preview</p>
              <div className="previewIcon-container">
                <div className="preview-div">
                  <div className="image-div">
                    <img src={PreviewImg} alt="" />
                  </div>
                  <div className="preview-logo-div">
                    <div className="circle-image">
                      <ImageViewer src={favIcon} defaultImage={EdFav} />
                    </div>
                    <div className="text-div">
                      <p>
                        {metaProp
                          ? metaProp?.slice(0, 25)
                          : "School Management System"}
                      </p>
                    </div>
                  </div>
                </div>
                {/* <div className='icon-div'>
          <img src={EdLogo} alt="" />
        </div> */}
              </div>
            </div>
          </div>
        </CardContainer>
      </div>
    </React.Fragment>
  );
};

export default UploadFavIcon;
