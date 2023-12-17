import React,{useEffect, useState} from 'react';
import { crypt,decrypt } from '../../Auth/AuthV1/Encrypt_Decrypt';
import { useParams } from 'react-router-dom';
import Auth from '../../../Classes/Auth';
import { setLoginToStore } from '../../../store/actions/user';
import { useDispatch } from 'react-redux';
import AppLink from './../../../Common/AppLink/index';
import { useNavigate } from 'react-router-dom';
import UserRequest from '../../../store/actions/user/UserRequest';
import ComponentLoader from '../../../Common/Loader/ComponentLoader';

function PostEncryptComponent() {
  const dispatch=useDispatch();
const {code,websiteType}=useParams();
const [isLoading,setLoading]=useState(false)
    useEffect(()=>{
      UserRequest.tokenMiddlewareGet(
        code,
        (success)=>{
          console.log(success,"line 20")
          setLoading(true)
          let data = success.data.data.token_body;
          let TokenData={
            user_role:data.user_role,
            institute:data.institute,
            data:data.data,
            token_data:data.token_data,
            business:data.business,
            website:data.website,
            websiteType:data.websiteType
          }
          console.log(TokenData)
          Auth.setUserLogin(TokenData, false); // Set Cookies of user login
          dispatch(setLoginToStore(Auth.user())); // Set Userdata to redux store 
          setTimeout(() => {
          window.location.href='/'
            
          }, 1000);
        }
        ,(error) => {
          
        }
      )
    },[code])

  return (
    <div>{!isLoading?<ComponentLoader/>:""} </div>
  )
}

export default PostEncryptComponent