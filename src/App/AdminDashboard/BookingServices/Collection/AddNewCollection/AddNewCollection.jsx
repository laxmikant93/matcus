import React from 'react';
import Breadcrumb from '../../../../../Common/Breadcrumb';
import BreadcrumbItem from '../../../../../Common/Breadcrumb/BreadcrumbItem';
import './addNewCollection.scss';
import { useNavigate, useParams } from 'react-router-dom';
import FormInput from '../../../../../Common/Form/FormInput';
import FormError from '../../../../../Common/Form/FormError';
import CheckboxInput from '../../../../../Common/Form/CheckboxInput';
import Cropper from '../../../../../Common/Cropper';
import { useState } from 'react';
import BackPainImage from './backPain.png';
import Image from './image.jpg'
import SwitchButton from '../../../../../Common/Button/SwitchButton';
import { useRef } from 'react';
import SelectServicesPopup from './SelectServicesPopup/SelectServicesPopup';
import ValidationUtils from '../../../../../Classes/ValidationUtils';
import DummyProfile from "../../../../../assets/images/img/DummyProfile.png";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { editCollection, editcollectionReset, editSingleCollection, getAllCollectionReset, getSingleCollection, getSingleCollectionReset, postcollection, postcollectionReset } from '../../../../../store/actions/bookAppointment';
import { useEffect } from 'react';

const AddNewCollection = () => {
  const { id } = useParams();
  const ref = useRef()
  const history = useNavigate()
  const dispatch = useDispatch()
  const [collectionName, setCollectionName] = useState("")
  const [headerMenu, setHeaderMenu] = useState(false)
  const [footerMenu, setFooterMenu] = useState(false)
  const [collectionNameError, setCollectionNameError] = useState(false)

  const { user, institute, owner, serviceListsuccess, firstTimeSuccess, businesstype, getAllCollectiondata, getSingleCollectonData
  } = useSelector((state) => {
    return {
      user: state.user,
      institute: state.user.user_institute,
      owner: state.user._id,
      businesstype: state.user.user_business_type,
      serviceListsuccess: state.bookAppointment.serviceListByCategories.success,
      getAllCollectiondata: state.bookAppointment.getAllCollection,
      getSingleCollectonData: state.bookAppointment.getSingleCollecton,
      firstTimeSuccess: state.bookAppointment.serviceListByCategories.firstTimeSuccess,
    }
  });
  // console.log(user, institute, businesstype)

  // console.log(footerMenu)
  // console.log(headerMenu)
  // console.log(headerMenu)
  // console.log(headerMenu)


  const collectionList = [];
  const [serviceList, setServiceList] = useState([])
  const [collectionImage, setCollectionImage] = useState("");
  const [collectionService, setCollectionService] = useState("");

  const selectServices = useRef(null);
  const openSelectServices = () => {
    selectServices.current.open();
  }

  const closeSelectServices = () => {
    selectServices.current.close();
  }

  useEffect(() => {
    if (id) {
      dispatch(getSingleCollection(businesstype, user.user_business, id))
    }
  }, [businesstype, dispatch, id, user.user_business])
  // console.log(id, "id")
  useEffect(() => {
    if (getSingleCollectonData) {
      setCollectionName(getSingleCollectonData?.data[0]?.name)
      setFooterMenu(getSingleCollectonData?.data[0]?.show_on_footer)
      setHeaderMenu(getSingleCollectonData?.data[0]?.show_on_header)
      setCollectionImage(getSingleCollectonData?.data[0]?.image)
    }
  }, [getSingleCollectonData])


  useEffect(() => {
    if (getSingleCollectonData?.data[0] && getSingleCollectonData?.data[0]?.service) {
      setCollectionService(getSingleCollectonData?.data[0] && getSingleCollectonData?.data[0]?.service)
    }
  }, [getSingleCollectonData?.data])


  // console.log(getSingleCollectonData)
  const handleInput = (e) => {
    let inputName = e.target.name
    let inputValue = e.target.value
    switch (inputName) {
      case "collectionName":
        setCollectionName(inputValue)
        setCollectionNameError(ValidationUtils.isEmpty(inputValue));
        break;

      default:
        break;
    }
  }

  // console.log(getSingleCollectonData?.data[0] && getSingleCollectonData?.data[0]?.service.map((item) => {
  //   return (
  //     item.title
  //   )
  // })
  // )
  const handleHeaderChange = (e) => {
    let inputChecked = e.target.checked;
    setHeaderMenu(inputChecked)
  }
  const handleFooterChange = (e) => {
    let inputChecked = e.target.checked;
    setFooterMenu(inputChecked)
  }

  const handleCancel = () => {
    history("/bookingservices/collection")
    // postcollectionReset()
    // dispatch(editcollectionReset())
    // dispatch(getAllCollectionReset())
    dispatch(getSingleCollectionReset())
    // setCollectionName("")
  }

  const handleSave = () => {
    if (collectionName) {
      history("/bookingservices/collection")
      let data = {
        name: collectionName,
        business: user.user_business,
        owner: owner,
        show_on_header: headerMenu,
        show_on_footer: footerMenu,
        image: collectionImage,
        service: serviceList.map((e) => e._id)
      }
      console.log('businesstype',businesstype)
      dispatch(postcollection(data, businesstype))
    } else {
      setCollectionNameError(true)
    }
  }
  const handleEdit = () => {
    if (collectionName) {
      history("/bookingservices/collection")

      let data = {
        name: collectionName,
        business: user.user_business,
        owner: owner,
        show_on_header: headerMenu,
        show_on_footer: footerMenu,
        image: collectionImage,

        service: serviceList.map((e) => e._id)
      }
      // console.log("dasdasd")
      dispatch(editCollection(user.user_business_type, id, data))
    } else {
      setCollectionNameError(true)
    }
  }
  //UPLOAD IMAGE
  const updateImage = (data) => {
    // console.log("asdasd")
    // ref.current.open()
    setCollectionImage(data.location);
  };

  const handelAllData = (item) => {
    setServiceList(item)
  }
  useEffect(() => {
    if (getSingleCollectonData?.data[0] && getSingleCollectonData?.data[0]?.service) {
      setServiceList(getSingleCollectonData?.data[0] && getSingleCollectonData?.data[0]?.service)
    }
  }, [getSingleCollectonData?.data])


  // console.log(getSingleCollectonData?.data[0] && getSingleCollectonData?.data[0]?.service)


  const removeFromListHandler = (id) => {
    // console.log(id)
    let filterarr = serviceList.filter((item, i) => i !== id)
    setServiceList(filterarr)
  }

  const removeFromListHandlerGet = (id) => {
    // console.log(id)
    let filterarr = collectionService.filter((item, i) => i !== id)
    setCollectionService(filterarr)
  }

  // console.log(serviceList)
  // console.log(collectionService)
  // // console.log(getSingleCollectonData?.data[0] && getSingleCollectonData?.data[0]?.service)
  const handleDeleteCollectionImage = () => {
    setCollectionImage("");
  }
  return (
    <div className='addNewCollection'>
      <Breadcrumb>
        <BreadcrumbItem to="/dashboard" title="Booking" />
        <BreadcrumbItem to="/bookingservices/collection" title="Collection" />
        {id ?
          <BreadcrumbItem to="/bookingservices/collection/Update-collection/" title="Edit Collection" />
          :
          <BreadcrumbItem to="/bookingservices/collection/CreateCollection" title=" Create Collection " />
        }
      </Breadcrumb>
      {/* <h1>helllo thiis collection {id}</h1> */}
      <div className='addNewCollectionHeading-section'>
        <div className='heading-wrap'>
          {id ?
            <h3 className='text-lg w-600 base'>{collectionName}</h3>
            :
            <h3 className='text-lg w-600 base'>Collection 1</h3>
          }
        </div>
        <div className='heading-btn-wrap'>
          <button className='button btn-o-silver btn-cancel btn-xs' onClick={handleCancel}>Cancel</button>

          {id ?
            <button className='button button-primary btn-xs' onClick={handleEdit} >Update</button>
            :
            <button className='button button-primary btn-xs' onClick={handleSave} >Save</button>

          }
        </div>
      </div>

      <div className='CreateCollection-productAdd-container'>
        <div className='createCollection-leftsidebar'>
          <div className='productInCollection-top-section'>
            <p className='text-s w-500 base'>Services in collection <span className='lgray'>{getSingleCollectonData?.data[0]?.service?.length ? getSingleCollectonData?.data[0]?.service?.length : serviceList.length}</span></p>
            <button className='button button-primary btn-sm add-more-btn' onClick={openSelectServices}>+ Add More Service</button>
          </div>
          <hr className='horizontal-line ' />
          {serviceList.length > 0 ?
            <div className='createInCollection-leftsidebar-lower '>
              {
                serviceList.map((item, i) => {
                  return (
                    <div className='createInCollection-products-container'>
                      {console.log(item)}
                      <div className='createInCollection-image-div'>
                        <img src={item?.image ? item?.image : BackPainImage} alt="prodctImage" />
                      </div>
                      <div className='createCollection-textContainer'>
                        <p className='text-xxs w-500 text-center'>{item?.title}</p>
                      </div>
                      <div className='createInCollection-productcount-div'>
                        {/* <div className='createInCollection-round'><p className='text-3xs count-text'>7</p></div> */}
                      </div>
                      <div
                        className="cross-div"
                        onClick={() => {
                          removeFromListHandler(i);
                        }}
                      >
                        <i className='ed-icon i-xs white icon-cross'></i>
                      </div>
                    </div>
                  )
                })
              }
            </div> :
            <div className='createCollection-leftsidebar-lower mt-50'>
              <p className='text-xs  w-400'>Start adding services to your collection</p>
              <p className='text-2xs w-400 lgray mt-5'>Create a new collection to display on your site.</p>
              <button className='button button-primary  btn-xs mt-30' onClick={openSelectServices}>Add Services</button>
            </div>}
          {/* add new services popup */}
          {
            selectServices && <SelectServicesPopup openpopup={selectServices} onclose={closeSelectServices} selectedService={handelAllData} serviceListnewData={serviceList} />
          }
        </div>
        {/* right side */}
        <div className='createCollection-rightsidebar'>
          <div className='rightside-heading-wrap'>
            <p className='text-s w-500'>Collection info. </p>
          </div>
          <hr className='horizontal-line' />
          <div className='createCollection-rightsidebar-lower'>
            <div className="formFieldwrap ">
              {/* <p className='text-xs mb-8 w-500 '>
                Collection name
              </p> */}
              <FormInput
                type="text"
                labelPosition="top"
                label="Collection name"
                id="collectionName"
                name="collectionName"
                placeholder="e.g. Bags, Summer"
                value={collectionName}
                onChange={handleInput}
                maxLength="80"
              />
              <FormError
                show={collectionNameError}
                error="Collection Name required." />
            </div>
            <div className='createCollection-rightsidebar-lower-imageUpload mt-5'>
              <p className='label-heading text-xs w-500 mb-8'>
                Collection Image
              </p>
              {collectionImage ? (
                <div className='image-wrpper'>
                  <img className="gallery_img" src={collectionImage ? collectionImage : DummyProfile} alt="Collection" />

                  <div className='productOverlay'>
                    <div className='productIcon-wrap'>
                      <div className='product-circle'>
                        <i className='ed-icon i-xs white icon-cross' onClick={handleDeleteCollectionImage}></i>
                      </div>

                    </div>
                  </div>
                </div>
              ) : (
                <div className="image-drag">
                  <div className="dragbutton">
                    <span className="set__icon">  <i className='icon-plus'>&#43;</i>  </span>
                    <Cropper
                      minWidth={100}
                      maxWidth={1000}
                      // ref={ref}
                      // defaultRatio={5 / 3}
                      // onUploaded={uploadThumbnail}
                      // BtnName="+"
                      onUploaded={(data) => updateImage(data)}
                      ref={ref}
                      IconClassName=""
                    // BtnPropClass="button-o-silver button-block CropUploadBtn"
                    // customCropper={true}
                    />
                  </div>
                </div>
              )
              }

            </div>

          </div>
          <hr />
          <div className='showHeader-container'>
            <div className='showHeader-wrap'>
              <label className='switch-label' > Show on header menu</label>
              <SwitchButton
                onChange={(e) => handleHeaderChange(e)}
                checked={headerMenu}
              />
            </div>
            <div className='showHeader-wrap mt-15'>
              <label className='switch-label' > Show on Footer menu</label>
              <SwitchButton
                onChange={(e) => handleFooterChange(e)}
                checked={footerMenu}
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AddNewCollection