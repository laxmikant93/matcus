import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  getAttendessList,
  resetListStore,
} from "../../../../store/actions/zoomApi";
import { useState } from "react";
import NoDataAvailable from "../../../../Common/NoDataAvailable";

function JoineeList({ closePopup, classId, teacherData, isClick }) {
  const { singleClassData, singleClasssuccess } = useSelector((state) => {
    return {
      singleClassData: state.onlineClasses.singleClass.data,
      singleClasssuccess: state.onlineClasses.singleClass.success,
      users: state.user,
      onlineclassSuccess: state.onlineClasses.list.success,
      onlineClasses: state.onlineClasses.list.data,
    };
  });

  const dispatch = useDispatch();
  useEffect(() => {
    teacherData && isClick && dispatch(getAttendessList(classId));
  }, [dispatch, teacherData, isClick, classId]);
  const onClose = () => {
    dispatch(resetListStore());
    closePopup();
  };
  const [participants, setParticipants] = useState([]);
  useEffect(() => {
    if (singleClasssuccess) {
      setParticipants(singleClassData?.participants);
    }
  }, [singleClassData?.participants, singleClasssuccess]);

  return (
    <div className="modalwrapper modal-m">
      {/* <div
        className={`DateInputIcon  ${activeToggleName === "CalenderIcon" ? "activeBlack" : "not"
          } `}
        onClick={SingleSelectHandel}
      >
        <Calender />
        <InputDatePicker
          popperPlacement="top-right"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          highlightDates={uniq(calenderData).map((date) => {
            const d = new Date(date);
            d.setDate(d.getDate());
            return d;
          })}
          includedDates={uniq(calenderData).map((date) => {
            const d = new Date(date);
            d.setDate(d.getDate());
            return d;
          })}
          className={`onlineClasscalenderIconFilter`}
        />
      </div> */}
      <span className="closeModal dgray text-xxs" onClick={onClose}>
        Close
      </span>
      <div className="modalHead">
        <div className="PageTopHead PTH-TeacherJoineeList mt-20">
          <div className="PTH-Item">
            <p className="text-sm w-500">
              {participants.length > 0 ? participants.length : ""} Attendees
            </p>
            <div className="attendesPopuprecurringclass"></div>
          </div>
        </div>
      </div>
      <div className="modalbody">
        <div className="gridListTable">
          <ul className="gridHeader">
            <li className="col col-3">Student Name</li>
            <li className="col col-3">Joining Time</li>
            <li className="col col-2">Leave Time</li>
          </ul>
          <div className="gridBody">
            {participants.length > 0 ? (
              participants.map((item) => {
                return (
                  <div className="gridRow" key={item._id}>
                    <ul className="topInfo">
                      <li data-head="Student Name" className="col col-3">{item.name}</li>
                      <li data-head="Joining Time" className="col col-3">
                        {item.join_time ? item.join_time : "-"}
                      </li>
                      <li data-head="Leave Time" className="col col-3">
                        {item.leave_time ? item.leave_time : "-"}
                      </li>
                    </ul>
                  </div>
                );
              })
            ) : (
              <NoDataAvailable title="Class Has not been held yet." />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoineeList;
