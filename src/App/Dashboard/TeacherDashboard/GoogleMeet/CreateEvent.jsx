import React from "react";
// import useMeetCreate from "./Hook/useMeetCreate";
// import { classes_constant } from "../../../../Constant/classes";
// import { useDispatch } from "react-redux";
// import { scheduleClassViaGoogleMeet } from "../../../../store/actions/zoomApi";
// import Storage from "../../../../Classes/Storage";

// const meetResource = {
//   start: { dateTime: "2021-07-09T23:12:00.000+09:00" },
//   end: { dateTime: "2021-07-13T23:30:00.000+09:00" },
//   attendees: [{ email: "krishna.kumar@edneed.com" }],
//   conferenceData: {
//     createRequest: {
//       requestId: "sample12345",
//       conferenceSolutionKey: { type: "hangoutsMeet" },
//     },
//   },
//   summary: " HEllo TEst ",
//   description: "description Test ",
// };

function CreateEvent({
  formData,
  scheduleMeetClassSubmit,
  scheduleMeetClassSubmitForEdit,
  isLoading,
  isEditable,
}) {
  // const dispatch = useDispatch();
  // const authData = localStorage.getItem(classes_constant.meettoken);

  // const token = authData ? Storage.getJson(classes_constant.meettoken) : "";
  // const [eventLoading, eventError, eventDetail, createEvent] =
  //   useMeetCreate(token);


  // const scheduleEvent = () => {
  //   token && createEvent(meetResource);
  //   eventDetail && dispatch(scheduleClassViaGoogleMeet(eventDetail));
  // };

  return (
    <div>
      {/* <button className="button btn-md button-theme" onClick={scheduleEvent}> */}
      {!isLoading ? (
        !isEditable ? (
          <button
            className="button btn-md button-theme"
            onClick={scheduleMeetClassSubmit}
          >
            Schedule Now!
          </button>
        ) : (
          <button
            className="button btn-md button-theme"
            onClick={scheduleMeetClassSubmitForEdit}
          >
            Update Class
          </button>
        )
      ) : (
        <button className="button btn-md button-theme">Loading..</button>
      )}
    </div>
  );
}

export default CreateEvent;
