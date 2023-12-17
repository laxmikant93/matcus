/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Storage from "../../../../Classes/Storage";
import useMeetToken from "./Hook/useMeetToken";
import { classes_constant } from "../../../../Constant/classes";
import { classroomID } from "../../../../Constant/auth";
import MeetLink from "./MeetLink";
import "./GoogleMeet.scss";

const MeetToken = ({ ViewClassroom, id }) => {
  const [token, tokenLoading, tokenError, getToken] = useMeetToken();
  const { _classroom, _subject } = useParams()
  const history = useNavigate();
  const routesDetails = Storage.alive("__onlineClassRoutes__")
    ? Storage.getJson("__onlineClassRoutes__")
    : "";
  // Get token, while compont mounted
  useEffect(() => {
    getToken(); // Init token generating process
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (token) {
      Storage.setJson(classes_constant.meettoken, token); // Storing google token in local storage
      setTimeout(() => {
        if (Storage.getBool("SwitchOnlineClassesTeacherClassroom")) {
          history(`/dashboard/teacher/create-subject-onlineclass/${routesDetails ? routesDetails.classroom : ""}/${routesDetails ? routesDetails.subject : ""}`)
        }
        else if (Storage.getBool("SwitchOnlineClasses")) {
          history(`/create-admin-onlineClass/${routesDetails ? routesDetails.classroom : ""}/${routesDetails ? routesDetails.subject : ""}`)
          // history(`/view-classroom/${Storage.getJson(classroomID)}`);
        } else {
          history("/dashboard/teacher/create-online-class"); // Redirecting to class schedule page
        }
      }, 1000);
    }
    // else {
    //   setTimeout(() => {
    //     if (Storage.getBool("SwitchOnlineClasses")) {
    //       history(`/view-classroom/${Storage.getJson(classroomID)}`);
    //     } else {
    //       history("/dashboard/teacher-online-class"); // Redirecting to class schedule page
    //     }

    //   }, 1000);
    // }
  }, [ViewClassroom, history, id, token]);

  return (
    <div className="MeetTokenCustom">
      {tokenLoading ? (
        <div
          className="pageInCenter text-center"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="loadingGridData">
            Please wait, while authorizing the request.
          </div>
        </div>
      ) : tokenError ? (
        <React.Fragment>
          {tokenError === "You haven't given the calender permissions." ? (
            <React.Fragment>
              <div className="pageInCenter">
                <p className="text-center text-xs mt-50">
                  You don't have sufficient permission to schedule a class,
                  Please give the required permissions during google login.
                </p>
              </div>{" "}
              {/* <button onClick={() => getToken()}>Failled, Try again</button> */}
              <MeetLink Title="Login Again." />
            </React.Fragment>
          ) : (
            <h1>{tokenError}</h1>
          )}
        </React.Fragment>
      ) : (
        token && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="loadingGridData">
              Please wait while redirecting...
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default MeetToken;
