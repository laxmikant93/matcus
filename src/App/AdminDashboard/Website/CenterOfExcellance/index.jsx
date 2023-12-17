import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../../../Common/Card';
import CardBody from '../../../../Common/Card/CardBody';
import ImageCropper from '../../../../Common/Cropper';
import FormInput from '../../../../Common/Form/FormInput';
import FormTextArea from '../../../../Common/Form/FormTextArea';
import { getInstituteData, getInstituteDataReset, patchInstituteDataReset, patchInstituteInfo } from '../../../../store/actions/businessInfo';
import BackgroundDefault from "../../../../assets/images/img/BackgroundDefault.png";
import Breadcrumb from '../../../../Common/Breadcrumb';
import BreadcrumbItem from '../../../../Common/Breadcrumb/BreadcrumbItem';
import SelectTitle from "../../../../Common/SectionTitle";
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import TextEditor from '../../../../Common/Form/TextEditor';
const CenterOfExcellance = () => {
  const [institute_coe, set_institute_coe] = useState("");
  const [institute_coe_head, set_institute_coe_head] = useState("");
  const [institute_coe_subhead, set_institute_coe_subhead] = useState("");
  const [institute_coe_upload, set_institute_coe_upload] = useState("");
  const [isFilled, setisFilled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPatched, setIsPatched] = useState(false);

  const s3Url = "https://edneed-images-uat.s3.amazonaws.com/";

  const dispatch = useDispatch();
  const ref = useRef()
  const { InstituteInfo, users, InstitutePatchSuccess, businessId } = useSelector(
    (state) => {
      return {
        InstituteInfo: state.businessInfo.getInstituiteData.data,
        InstitutePatchSuccess: state.businessInfo.patchInstituteInfo.loading,
        users: state.user,
        businessId: state.user.user_business
      };
    }
  )

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    return () => {
      dispatch(patchInstituteDataReset())
      dispatch(getInstituteDataReset())
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(getInstituteData(businessId, users.user_business_type));
  }, [businessId, dispatch, users]);

  if (InstituteInfo.business_subdomain && !isFilled) {
    setisFilled(true);

    set_institute_coe(InstituteInfo.business_coe)
    set_institute_coe_head(InstituteInfo.business_coe_head)
    set_institute_coe_subhead(InstituteInfo.business_coe_subhead)
    set_institute_coe_upload(InstituteInfo.business_coebanner)
  }
  const handleinput = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;

    switch (inputName) {

      case "institute_coe":
        set_institute_coe(inputValue);
        break;

      case "institute_coe_head":
        set_institute_coe_head(inputValue);
        break;

      case "institute_coe_subhead":
        set_institute_coe_subhead(inputValue);
        break;


      default:
        break;
    }
  };

  const handleCOEContent = (value) => {
    set_institute_coe(value);
  };

  const uploadCoeImage = (data) => {
    let imgData = data.location;
    set_institute_coe_upload(imgData);
  }
  const removeCoeImage = () => {
    set_institute_coe_upload("");
  };

  const patchInstituteFormData = () => {
    return {

      business_coebanner: institute_coe_upload,
      business_coe: institute_coe,
      business_coe_head: institute_coe_head,
      business_coe_subhead: institute_coe_subhead,

    };
  };
  const history = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    dispatch(
      patchInstituteInfo(businessId, patchInstituteFormData(), users.user_business_type)

    );
    setIsLoading(true);
  };
  if (!InstitutePatchSuccess && !isPatched && isLoading) {
    setIsPatched(true);
    history(`/`);
  }
  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        <BreadcrumbItem to="/coe" title="Edit COE" />
      </Breadcrumb>
      <div className="PageTopHead PTH-MIW-Head mt-30">
        <div className="PTH-Item">
          <h1 className="text-sm w-300">Edit Center Of Excellence  Information</h1>
          <p className="heading text-xxs base">
            Tell us more amazing things about your business.
          </p>
        </div>
      </div>
      <div className="EditSiteBuilderBody">
        <div className="SBBodyHeadWrap">
          <div className="SBBodyHeadItem">
            <p className="secondary text-xs w-500">
              {users.user_institute_institute_subdomain}.edneed.com
            </p>
            <SelectTitle type={"coeSelect"} />
          </div>
        </div>
        {
          users.user_business_type === "Services" &&
          <Card className="MIW-AboutInstitute cardPadding mt-40">
            <CardBody>
              {/* <p className="labelcst text-sm w-500 mb-5">Centre of Excellence</p> */}
              {/* <div className="formFieldwrap">
                <FormInput
                  label="Main Heading"
                  onChange={handleinput}
                  value={institute_coe_head}
                  name="institute_coe_head"
                  placeholder="Centre of Excellence"
                  maxLength="80"
                />
              </div>
              <div className="formFieldwrap">
                <FormInput
                  label="Subheading"
                  onChange={handleinput}
                  value={institute_coe_subhead}
                  name="institute_coe_subhead"
                  placeholder="Changing lives, one student at a time"
                  maxLength="140"
                />
              </div> */}
              <div className="formFieldwrap">
                {/* <FormTextArea
                  onKeyUp={handleinput}
                  id="101"
                  rows="7"
                  type="text"
                  placeholder="Tell something amazing highlights your business"
                  label="About your COE"
                  name="institute_coe"
                  value={institute_coe}
                  style={{ whiteSpace: " pre-wrap" }}
                  maxLength="2000"
                  onChange={handleinput}
                  TextareaBtmTxt="2000"
                ></FormTextArea> */}
                <TextEditor
                  feature={"Tell something amazing highlights your business"}
                  preFilledData={institute_coe}
                  currentResponse={(value) => handleCOEContent(value)}
                />
              </div>
              <div className="MIW-AboutUploadImage">
                <div className="MIW-AboutUploadImageLeft">
                  <p>Upload Image</p>
                  <ul className="DashedInstructionList">
                    <li className="text-xxs">Accept only .jpg, .bmp or .png.</li>
                  </ul>
                  <div className="formFieldwrap mt-15">
                    <ImageCropper
                      minWidth={users.user_business_type === "Services" ? 900 : 300}
                      maxWidth={users.user_business_type === "Services" ? 1440 : 600}
                      minHeight={users.user_business_type === "Services" && 300}
                      maxHeight={users.user_business_type === "Services" && 480}
                      defaultRatio={users.user_business_type === "Services" ? 6 / 2 : 5 / 3}
                      onUploaded={uploadCoeImage}
                      ref={ref}
                      BtnName="Upload Image"
                      IconClassName="i-md gray"
                      BtnPropClass="button btn-xs btn-o-silver button-block CropUploadBtn"
                    />
                    {institute_coe_upload && (
                      <a
                        className="btnText priamry text-2xs attachmentwithtext mt-3"
                        href={institute_coe_upload}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="ed-icon icon-attachment gray i-xs"></i>
                        {institute_coe_upload.replace(s3Url, "")}
                      </a>
                    )}
                  </div>
                </div>
                <div className="MIW-AboutUploadImageRight">
                  <div className="MIW-AboutImagePreview">
                    <h6 className="text-xxs dgray w-400">Image preview</h6>
                    <img
                      className="MIW-AboutImgPreview"
                      src={
                        institute_coe_upload
                          ? institute_coe_upload
                          : BackgroundDefault
                      }
                      alt="About preview"
                    />
                  </div>
                  {institute_coe_upload && (
                    <button
                      className="button btn-sm btn-o-red red mt-8"
                      onClick={removeCoeImage}
                    >
                      {" "}
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </CardBody>
          </Card>

        }
      </div>
      <div className="SiteBuilderAction mt-50">
        {!InstitutePatchSuccess ? (
          <button className="button btn-md button-theme btn-md" onClick={handlesubmit}>
            Update Business
          </button>
        ) : (
          <button className="button btn-md button-theme btn-md">Updating...</button>
        )}
      </div>
    </React.Fragment>
  )
}
export default CenterOfExcellance