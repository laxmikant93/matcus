import { useState } from "react";
import Request from "../../../../../Classes/Request";
const createMeetRequest = new Request();
/**
 *
 * @param {*} token : Google Auth token is mandatory to create the token
 * @description : Hook is used to create the event
 * @returns : Hook return array of states in [eventLoading, eventError, eventDetail, createEvent] the form
 * @author : Krishna Kumar
 * @date : 01/Jul/2021
 * @updated : 03/Jul/2021
 */

const useMeetCreate = (token) => {
  const [eventDetail, setEventDetail] = useState(undefined); // Event detail state and default value is undefined
  const [eventLoading, setEventLoading] = useState(false); // Loading state and default value is false
  const [eventError, setEventError] = useState(null); // Error state and default value is undefined

  const createEvent = (eventData) => {
    setEventLoading(true); // Start loading
    createMeetRequest.post(
      createMeetRequest.url("meet/create"),
      {
        token,
        data: eventData,
      },
      (success) => {
        setEventDetail(success.data.data); // Set event detail
        setEventLoading(false); // Stop loading
      },
      (error) => {
        setEventError(error.message); // Set error, while receiving during event creation
        setEventLoading(false); // Stop loading
      }
    );
  };

  return [eventLoading, eventError, eventDetail, createEvent];
};

export default useMeetCreate;
