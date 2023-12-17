import React, { useEffect, useState } from 'react'
import CardContainer from '../../../SettingComponents/CardContainer/CardContainer';
import './locationAndContact.scss';
import mapImage from '../../../asserts/images/mapImage.png'
import FormInput from '../../../../../../Common/Form/FormInput';
import FormError from '../../../../../../Common/Form/FormError';
import IButton from '../../../../../Dashboard/EcommerceDashboard/assets/icons/i-Vector.svg'
import ContactInfo from '../ContactInfo/ContactInfo';
import ValidationUtils from '../../../../../../Classes/ValidationUtils';
import axios from 'axios';
import GoogleMapReact from 'google-map-react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { useDispatch, useSelector } from 'react-redux';
import { getInstituteData } from '../../../../../../store/actions/businessInfo';
// import axios from 'axios';

const AnyReactComponent = ({ img }) => <div>{img}</div>;

const LocationAndContact = ({ LocationAndContactPage, ContactInfoPage, DataSendToMainPage, locationAndContactDatapost, DataForLocationValitdation }) => {
  const dispatch = useDispatch()


  const Marker = props => {
    return <div className="SuperAwesomePin"></div>
  }
  const [addressDetails, setAddressDetails] = useState("")
  const [addressDetailsError, setAddressDetailsError] = useState("")
  const [optionalAddress, setOptionalAddress] = useState("")
  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()
  const [getMapUrl, setGetMapUrl] = useState()
  const [showUserSide, setShowUserSide] = useState()
  const [value, setValue] = useState("");
  const [indiaMap, setIndiaMap] = useState()
  const [valueSearch, setValueSearch] = useState()

  // latitude:
  // longitude:
  const [locationData, setLocationData] = useState({
    center: {
      lat: "",
      lng: ""
    },
  })

  // console.log(value)
  // console.log(DataForLocationValitdation.addressDetailsError, "dushyant address latest")

  const { user, getbusinessInfoData, businessId, businessType } = useSelector
    ((state) => {
      return {
        user: state.user,
        businessdetail: state.manageinstituteinfo,
        businessType: state.user.user_business_type,

        getbusinessInfoData: state.businessInfo.getInstituiteData,
        businessInfoPatchSuccess: state.businessInfo.patchInstituteInfo.loading,
        businessId: state.user.user_business
      };
    });

  useEffect(() => {
    dispatch(getInstituteData(user.user_business, user.user_business_type));
  }, [dispatch, user.user_business, user.user_business_type])


  useEffect(() => {

    if (user.user_business_type === "LMS") {

      setAddressDetails(getbusinessInfoData?.data?.institute_address)

      setLatitude(getbusinessInfoData?.data?.latitude)
      setLongitude(getbusinessInfoData?.data?.longitude)
      setGetMapUrl(getbusinessInfoData?.data?.location_url)
      setOptionalAddress(getbusinessInfoData?.data?.optional_address)
      setShowUserSide(getbusinessInfoData?.data?.showUserSideMap)
      setValueSearch(getbusinessInfoData?.data?.place_Name_Map)
      setAddressDetailsError(DataForLocationValitdation.addressDetailsError)

    } else {
      setAddressDetails(getbusinessInfoData?.data?.business_address)
      setLatitude(getbusinessInfoData?.data?.latitude)
      setLongitude(getbusinessInfoData?.data?.longitude)
      setGetMapUrl(getbusinessInfoData?.data?.location_url)
      setOptionalAddress(getbusinessInfoData?.data?.optional_address)
      setShowUserSide(getbusinessInfoData?.data?.showUserSideMap)
      setValueSearch(getbusinessInfoData?.data?.place_Name_Map)
      setAddressDetailsError(DataForLocationValitdation.addressDetailsError)
    }
  }, [getbusinessInfoData, DataForLocationValitdation.addressDetailsError])


  // console.log(addressDetails)
  // console.log(optionalAddress)
  // console.log(getMapUrl)
  // console.log(latitude)
  // console.log(longitude)
  // console.log(showUserSide)
  // console.log(valueSearch)
  // console.log(getMapUrl)
  // useEffect(() => {
  //   if (LocationAndContactPage?.BusinessAddress) {
  //     setAddressDetails(LocationAndContactPage?.BusinessAddress)
  //     setOptionalAddress(LocationAndContactPage?.optionalAddress)
  //     setGetMapUrl(LocationAndContactPage?.getMapUrl)
  //     setLatitude(LocationAndContactPage?.latitude)
  //     setLongitude(LocationAndContactPage?.longitude)
  //     setShowUserSide(LocationAndContactPage?.showUserSide)
  //     // console.log(LocationAndContactPage?.getMapUrl)
  //   }
  // }, [LocationAndContactPage])
  // console.log(showUserSide)
  // #######################

  // console.log(getMapUrl)
  // console.log(latitude)
  // console.log(longitude)

  // #######################

  const handlePersonalDetails = (e) => {
    e.preventDefault();
    let inputName = e.target.name;
    let inputValue = e.target.value;
    switch (inputName) {
      case "address_details":
        setAddressDetails(inputValue);
        setAddressDetailsError(ValidationUtils.isEmpty(inputValue));
        locationAndContactDatapost({
          addressDetails: inputValue,
          optionalAddress: optionalAddress,
          getMapUrl: getMapUrl,
          latitude: latitude,
          longitude: longitude,
          showUserSide: showUserSide,
          value: value,
          addressDetailsError: addressDetailsError

        })
        break;
      case "address_optional":
        setOptionalAddress(inputValue);
        locationAndContactDatapost({
          addressDetails: addressDetails,
          optionalAddress: inputValue,
          getMapUrl: getMapUrl,
          latitude: latitude,
          longitude: longitude,
          showUserSide: showUserSide,
          value: value,
          // addressDetailsError: addressDetailsError


        })
        break;
      default:
    }
  }

  const BussienessContactData = (value) => {
    DataSendToMainPage(value)
  }
  useEffect(() => {
    // if (value) {
    var location = value;

    axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: JSON.stringify(location),
        key: 'AIzaSyCnHsbHlyAEsjRBse6D2FsSriujZETOalw'
      }
    }).then((res) => {
      setLocationData({
        center: {
          lat: res.data.results[0].geometry.location.lat,
          lng: res.data.results[0].geometry.location.lng
        },
      })
      console.log(res)
      let latdata = res.data.results[0].geometry.location.lat
      let lngData = res.data.results[0].geometry.location.lng
      if (latdata && lngData) {
        let getMapUrlReplace = "https://maps.google.com/maps?q=lat,lng&hl=es;z=14&output=embed"
        setGetMapUrl(getMapUrlReplace.replace("lat", latdata).replace("lng", lngData))
        // console.log(getMapUrlReplace.replace("lat", latitude).replace("lng", longitude))
        // locationAndContactDatapost({
        //   addressDetails: addressDetails,
        //   optionalAddress: optionalAddress,
        //   getMapUrl: getMapUrlReplace.replace("lat", latitude).replace("lng", lngData),
        //   showUserSide: showUserSide,
        //   latitude: latitude,
        //   longitude: longitude,
        //   value: value
        // })
        // console.log(getMapUrlReplace.replace("lat", latitude).replace("lng", longitude))
      } else {
        setIndiaMap(<iframe title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19451819.707779944!2d72.28784066297035!3d22.072999048774875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1664262698830!5m2!1sen!2sin" width="300" height="150"></iframe>)
      }

      setIsField(true)
      setLatitude(latdata)
      setLongitude(lngData)
      locationAndContactDatapost({
        addressDetails: addressDetails,
        optionalAddress: optionalAddress,
        getMapUrl: getMapUrl,
        latitude: res.data.results[0].geometry.location.lat,
        longitude: res.data.results[0].geometry.location.lng,
        showUserSide: showUserSide,
        value: value,
        // addressDetailsError: addressDetailsError

      })
      return res;
    }).catch(error => {
      return error;
    });
    // }
  }, [getMapUrl, value])


  const renderMarkers = (map, maps) => {
    let marker = new maps.Marker({
      position: { lat: locationData?.center?.lat, lng: locationData?.center?.lng },
      map,
      title: 'Hello World!'
    });
    return marker;
  };

  const iconBase = <img src="https://cdn-icons-png.flaticon.com/512/684/684908.png" alt='location' width={30} height={30} />
  const [isField, setIsField] = useState(false)
  useEffect(() => {
    // if (!isField) {
    if (latitude && longitude) {
      let getMapUrlReplace = "https://maps.google.com/maps?q=lat,lng&hl=es;z=14&output=embed"
      setGetMapUrl(getMapUrlReplace.replace("lat", latitude).replace("lng", longitude))
      // console.log(getMapUrlReplace.replace("lat", latitude).replace("lng", longitude))
      locationAndContactDatapost({
        addressDetails: addressDetails,
        optionalAddress: optionalAddress,
        getMapUrl: getMapUrlReplace.replace("lat", latitude).replace("lng", longitude),
        showUserSide: showUserSide,
        latitude: latitude,
        longitude: longitude,
        // addressDetailsError: addressDetailsError,
        value: value,
      })
      // console.log(getMapUrlReplace.replace("lat", latitude).replace("lng", longitude))
    } else {
      setIndiaMap(<iframe title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19451819.707779944!2d72.28784066297035!3d22.072999048774875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1664262698830!5m2!1sen!2sin" width="300" height="150"></iframe>)
    }
  }, [addressDetails, latitude, longitude, getMapUrl, optionalAddress, showUserSide, value])

  // console.log(getMapUrl)

  const handleCategoryFilters = (e) => {
    let inputChecked = e.target.checked
    setShowUserSide(inputChecked)
    locationAndContactDatapost({
      addressDetails: addressDetails,
      optionalAddress: optionalAddress,
      getMapUrl: getMapUrl,
      showUserSide: inputChecked,
      latitude: latitude,
      longitude: longitude,
      // addressDetailsError: addressDetailsError,
      value: value,

    })
  }

  const [showEditor, setshowEditor] = useState(false);

  const showMapEditor = () => {
    setshowEditor(true)
  }

  return (
    <React.Fragment>
      <div className='locationAndContact-container'>
        <CardContainer>
          <div className='locationAndContact-wrapper'>
            <p className='tex-18 w-500 primary website-name'>Location & Contact</p>
            <div className='map-wrapper'>
              <p className='text-18 base w-400'>Location</p>
              <p className='text-2xs w-300 base mt-2'>Let customers know where your business is based.</p>
              <div className='locationAndContact-Inputwrapper'>
                <div className='inputWrapper-left'>
                  <div className="formFieldwrap width-65">
                    <p className='label-heading  text-xxs w-400 base'>
                      Address
                    </p>
                    <FormInput
                      type="text"
                      id="address_details"
                      name="address_details"
                      value={addressDetails}
                      onChange={handlePersonalDetails}
                      placeholder="Enter Address"
                      maxLength="80"
                    />
                    <FormError
                      show={!addressDetails && addressDetailsError}
                      error="Name is required."
                    />
                  </div>
                  <div className="formFieldwrap width-65">
                    <p className='label-heading  text-xxs w-400 base'>
                      Address Description(optional)
                    </p>
                    <FormInput
                      type="text"
                      id="address_optional"
                      name="address_optional"
                      value={optionalAddress}
                      onChange={handlePersonalDetails}
                      placeholder="e.g., Located on the ground floor"
                      maxLength="80"
                    />
                    <FormError
                      show={false}
                      error="Name is required."
                    />
                  </div>
                  <div className="formFieldwrap width-65">
                    <div className='goods-section-label-wrap'>
                      <p className='text-xxs w-400 base'>
                        Location Name
                      </p>
                      <img src={IButton} alt="icon" title='' />
                    </div>
                    {valueSearch && !showEditor ? (
                      <div className='searchLocationValue' onClick={showMapEditor} >
                        <p className='text-xxs w-400 base'>{valueSearch}</p>
                        <div className='searchLocation-arrow'>
                          <div className='v-line'></div>
                          <i className='ed-icon i-xxs icon-arrowDown '></i>
                        </div>
                      </div>
                    ) : (
                      <GooglePlacesAutocomplete
                        apiKey="AIzaSyCnHsbHlyAEsjRBse6D2FsSriujZETOalw"
                        selectProps={{
                          value,
                          onChange: (e)=>setValue(e)
                        }}
                      />
                      
                    )
                    }

                  </div>
                </div>
                <div className='inputWrapper-right'>
                  <div className='inputWrapper-map'>
                    {locationData?.center?.lat && locationData?.center?.lng ?
                      <div style={{ height: '23vh', width: '97%' }}>
                        <GoogleMapReact
                          bootstrapURLKeys={{ key: "AIzaSyCnHsbHlyAEsjRBse6D2FsSriujZETOalw" }}
                          defaultCenter={locationData.center}
                          defaultZoom={14}
                          center={{ lat: locationData?.center?.lat, lng: locationData?.center?.lng }}
                          yesIWantToUseGoogleMapApiInternals
                          onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
                        >

                          <AnyReactComponent
                            lat={locationData.center.lat}
                            lng={locationData.center.lng}
                          // img={iconBase}
                          />
                          {/* {/ 25.2048493,55.2707828 /} */}
                        </GoogleMapReact>
                      </div>
                      : <div>
                        {getMapUrl ?
                          <iframe title="map" src={getMapUrl} width="300" height="150" referrerpolicy="no-referrer-when-downgrade"></iframe>
                          :
                          indiaMap

                        }

                      </div>
                    }
                    <label>Show On User Side</label>&nbsp;&nbsp;
                    <input type="checkbox"
                      id="vehicle1"
                      checked={showUserSide}
                      name="Show On User Side"
                      value=''
                      onChange={handleCategoryFilters} />
                  </div>
                  {/* {/ <button onClick={handleRemoveMap}>Remove Map</button > /} */}
                </div>
              </div>
            </div>
            <hr className='mt-10' />
            <ContactInfo ContactInfoPage={ContactInfoPage} BussienessContactData={BussienessContactData} />
          </div>
        </CardContainer >
      </div >
    </React.Fragment >
  )
}

export default LocationAndContact