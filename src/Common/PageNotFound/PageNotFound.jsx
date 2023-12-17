import React from 'react'
import './PageNotFound.scss'
import ErrorImg from '../../assets/images/img/Error404(1).png'
// import AppLink from '../AppLink'
import { useNavigate } from 'react-router-dom';
import Auth from '../../Classes/Auth';
import AppLinkUrl from '../AppLink/AppLinkUrl';


const PageNotFound = () => {
  const Navigate = useNavigate();

  return (
    <div className={`page-not-found ${Auth.isLogin() ? "" : "mt-90"}`}>
      <h1 className="heading w-600 text-xl base ">We lost this page</h1>
      <p className="desc w-300 text-xs lgray">We searched high and low but couldn’t find what
        you’re looking for</p>
      <div className="error-img-wrap mt-10">
        <img src={ErrorImg} alt="" className="error-img " />
      </div>
      {
        AppLinkUrl.subdomain()||AppLinkUrl.privateDomain()?"":
      <button  onClick={() => Navigate.push('/')} className=" w-400 text-xs white mt-30 go-home-btn"> Go Home</button>
      }
    </div>
  )
}

export default PageNotFound
