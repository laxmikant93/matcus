// import moment from 'moment'
import React, { useEffect } from 'react'
import ZoomLogo from "./logo-zoom.svg";
import GoogleMeetLogo from "./logo-googlemeet.svg";
import "./Recurring.scss";
import ClassMethod from './ClassMethod';
import { useState } from 'react';
import { classes_constant } from '../../../Constant/classes';
import MeetLink from '../../Dashboard/TeacherDashboard/GoogleMeet/MeetLink';
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { resetEditOnlineClasses, resetPostOnlineClasses } from '../../../store/actions/onlineClasses';
const OnlineClass = () => {
  const [classesOn, setClassesOn] = useState("Zoom")
  const dispatch = useDispatch()
  const [meetTokenLive, setmeetTokenLive] = useState(false);
  let { _id } = useParams();
  useEffect(() => {
    let meetAuthToken = localStorage.getItem(classes_constant.meettoken);
    let isTokenValid = meetAuthToken ? true : false;
    setmeetTokenLive(isTokenValid);
  }, []);
  const {
    singleClassData,
    singleClasssuccess,

  } = useSelector((state) => {
    return {
      singleClasssuccess: state.onlineClasses.singleClass.success,
      singleClassData: state.onlineClasses.singleClass.data,

    };
  });
  useEffect(() => {
    return () => {
      if (_id) {
        dispatch(resetEditOnlineClasses())
      } else {
        dispatch(resetPostOnlineClasses())
      }
    }
  }, [_id, dispatch])
  return (
    <React.Fragment>
      <div className="ChooseLiveClassVia">
        <p className="text-xxs w-600">
        </p>
        {_id ? (
          <div className="LiveClassOptSelect mt-8">
            {!singleClasssuccess ? (
              ""
            ) : (
              <React.Fragment>
                {

                  singleClassData.meetingOn === "Zoom" ? (<button onClick={() => setClassesOn("Zoom")} className={`button btn-md ${classesOn === "Zoom" ? "btn-o-primary" : "btn-o-silver"} onlineclasszoombtn `} >
                    <img src={ZoomLogo} alt="Zoom" />
                  </button>) : (
                    <button className={`button btn-md ${classesOn === "GoogleMeet" ? "btn-o-primary" : "btn-o-silver"} `} onClick={() => setClassesOn("GoogleMeet")}>
                      <img src={GoogleMeetLogo} alt="Google Meet" />
                    </button>)
                }
              </React.Fragment>
            )}
          </div>
        ) : (<div className="LiveClassOptSelect mt-8">
          <button onClick={() => setClassesOn("Zoom")} className={`button btn-md ${classesOn === "Zoom" ? "btn-o-primary" : "btn-o-silver"} `} >
            <img src={ZoomLogo} alt="Zoom" />
          </button>
          <button className={`button  ${classesOn === "GoogleMeet" ? "btn-o-primary" : "btn-o-silver"}`} onClick={() => setClassesOn("GoogleMeet")}>
            <img src={GoogleMeetLogo} alt="Google Meet" />
          </button>
        </div>)}
      </div>

      {classesOn === "Zoom" ? <ClassMethod meetingOn={classesOn} setMeetingOn={() => setClassesOn()} /> :

        <React.Fragment>
          {meetTokenLive ? <ClassMethod meetingOn={classesOn} setMeetingOn={() => setClassesOn()} /> :
            <div className="row mt-20">
              <div className="col-xs-12 text-center">
                <h3 className="dgray text-xxs w-400">
                  To Schedule online classes via Google Meet You need to
                  authenticate yourself by google account.
                </h3>
                <p className="mt-15 gray">
                  Don't worry, we don't store your password.
                </p>
                <MeetLink ViewClassroom={false} />
              </div>
            </div>
          }

        </React.Fragment>
      }
    </React.Fragment>
  )

}

export default OnlineClass