/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import SessionStorage from '../../Classes/SessionStorage'
import AppLinkUrl from '../../Common/AppLink/AppLinkUrl'
import { Userid } from '../../Common/UserElement'
import { subDomainMail } from '../../store/actions/privateDomain'
import { postInstituteDataOnline } from '../../store/actions/RegisterInstitute'
import AuthTimeLineLayout from "./AuthTimeLineLayout"


const WebsiteOverview = () => {
  const [subDomain, setSubdomain] = useState({})
  const [publishState, setPublishState] = useState("publishNow")
  const history = useNavigate()
  const registerInstitute = useSelector((state) => state.registerInstitute);
  const { user } = useSelector((state) => {
    return {
      user: state.user
    }
  })
  useEffect(() => {
    if (SessionStorage.alive("subdomain")) {
      let data = SessionStorage.getJson("subdomain")
      setSubdomain(data.institute_subdomain.value)
    }
  }, [])
  const dispatch = useDispatch()
  const id = Userid();
  const handleInput = (e) => {
    let inputValue = e.target.value
    setPublishState(inputValue)
  }
  const [createWebsite] = useState({
    institute_logo: "",
    institute_about: "",
    institute_about_head: "About Us",
    institute_about_subhead: "Changing lives, one student at a time.",
    institute_about_upload: "",
    institute_mission: "",
    institute_mission_head: "Mission",
    institute_mission_subhead: "Strive for progress, not perfection.",
    institute_vision: "",
    institute_vision_head: "Vision",
    institute_vision_subhead: "Excellence is not a skill. It is an attitude.",
    institute_owner_message: "",
    institute_owner_name: "",
    institute_owner_designation: "",
    institute_owner_profile_photo: "",
    institute_intro_video: "",
    institute_intro_title: "",
    institute_intro_description: "",
  });

  const [banners] = useState([
    {
      institute_featured_banner: "",
      institute_featured_headline: "",
      institute_short_description: "",
      bannnerError: false,
    },
  ]);
  const getWesbiteData = () => {
    return {
      institute_logo: createWebsite.institute_logo,
      institute_about: createWebsite.institute_about,
      institute_about_head: createWebsite.institute_about_head,
      institute_about_subhead: createWebsite.institute_about_subhead,
      institute_about_upload: createWebsite.institute_about_upload,
      institute_mission: createWebsite.institute_mission,
      institute_mission_head: createWebsite.institute_mission_head,
      institute_mission_subhead: createWebsite.institute_mission_subhead,
      institute_vision: createWebsite.institute_vision,
      institute_vision_head: createWebsite.institute_vision_head,
      institute_vision_subhead: createWebsite.institute_vision_subhead,
      institute_owner_designation: createWebsite.institute_owner_designation,
      institute_owner_profile_photo:
        createWebsite.institute_owner_profile_photo,
      institute_owner_message: createWebsite.institute_owner_message,
      institute_owner_name: createWebsite.institute_owner_name,
      institute_intro_video: createWebsite.institute_intro_video,
      institute_intro_title: createWebsite.institute_intro_title,
      institute_intro_description: createWebsite.institute_intro_description,
      banners: [...banners],
    };
  };
  const handleSubmit = (event) => {
    event.preventDefault()
    const regInstitute = SessionStorage.getJson("RegisterInstitiute");
    const instituteWebsite = getWesbiteData()
    const payloadForOnline = {
      ...regInstitute,
      ...instituteWebsite,
      institute_subdomain: subDomain,
      owner: id,
    };
    dispatch(postInstituteDataOnline(payloadForOnline));
  }
  if (registerInstitute.success) {

    window.open(
      AppLinkUrl.createSubdomain(registerInstitute.data.institute_subdomain)
    );

    SessionStorage.remove("subdomain")
    SessionStorage.remove("RegisterInstitiute")
    // let data = {
    //   userId: id,
    //   instituteId: registerInstitute.data._id,
    // };
    // dispatch(subDomainMail(data));
    history("/");
  }
  return (
    <AuthTimeLineLayout>
      <div className="form-wrapper">
        <div className='mb-40 mt-60'>
          <h1 className='w-600 mb-10'>Congrats, <span className='w-400 primary'>{user.user_fullname}!</span></h1>
          <p className='text-xxs'>Your free website
            <span className='primary w-500'>{` ${subDomain}`}.edneed.com</span> has been created successfully !</p>
        </div>
        <form className='timeline_form' onSubmit={handleSubmit}>
          <div className='radio_text'>
            <label className="small mr-30">
              <input
                type="radio"
                name="radio"
                value="publishNow"
                checked={publishState === "publishNow"}
                onChange={handleInput}
              />&nbsp;
              PUBLISH NOW
            </label>
          </div>
          <div className='mb-30'>
            <small><em>If you select publish now, your website will go live immediately and be available to everyone online.</em></small>
          </div>
          <button className='button button-primary btn-sm white next_btn' type='submit'>GO TO DASHBOARD</button>
        </form>
      </div>
    </AuthTimeLineLayout>
  )
}

export default WebsiteOverview