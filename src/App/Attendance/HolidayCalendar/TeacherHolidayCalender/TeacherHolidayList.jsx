import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../../../../Common/Card";
import CardBody from "../../../../Common/Card/CardBody";
import CardHeader from "../../../../Common/Card/CardHeader";
import Popup from "../../../../Common/Popup";
import UseOutsideClick from "../../../../Common/UseOutsideClick";
import { deleteHoliday } from "../../../../store/actions/holidayCalender";

import IconExternalLink from "../../icon-external-link.svg";
import IconDelete from "../../icon-trash.svg";
import StudentHolidayView from "../StudentHolidayCalender/StudentHolidayView";
import TeacherEditHoliday from "./TeacherEditHoliday";

const TeacherHolidayList = ({ currentYear }) => {
  const [holidayIdArray, setHolidayIdArray] = useState([]);
  const [RemovePop, setRemovePop] = useState(false);
  const RemovePopToggleRef = useRef();
  const [editModal, setEditModal] = useState(false);
  const dispatch = useDispatch();
  UseOutsideClick(RemovePopToggleRef, () => {
    if (RemovePop) setRemovePop(false);
  });
  const { user, holidayList, holidayListSuccess, deleteHolidayLoading } =
    useSelector((state) => {
      return {
        user: state.user,
        holidayList: state.holidayCalendar.holidayList.data,
        holidayListSuccess: state.holidayCalendar.holidayList.success,
        deleteHolidayLoading: state.holidayCalendar.deleteHoliday.loading,
      };
    });

  useEffect(() => {
    const array = [];
    if (holidayListSuccess && holidayList.length) {
      // eslint-disable-next-line array-callback-return
      holidayList.map((item, i) => {
        array.push(i);
      });
      setHolidayIdArray(array);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [holidayListSuccess]);
  const [deleteId, setDeleteId] = useState("");
  const [popUpIndex, setPopUpIndex] = useState("")
  // console.log(popUpIndex, "popUpIndex")
  const RemovePopState = (_id, i, item) => {
    // console.log(i, "i")
    setPopUpIndex(i, item)
    setRemovePop(!RemovePop);
    setDeleteId(_id);
  };
  function showHideHoliday(index) {
    const array = holidayIdArray;
    if (holidayIdArray.includes(index)) {
      let data = holidayIdArray;
      let myIndex = data.indexOf(index);
      data.splice(myIndex, 1);
    } else {
      array.push(index);
    }
    setHolidayIdArray([...array]);
  }
  const [holidayId, setHolidayId] = useState("");
  const [holidayMonth, setHolidayMonth] = useState("");

  const manageModal = (_id, month) => {
    setEditModal(!editModal);
    setHolidayId(_id);
    setHolidayMonth(month);
  };
  const closeModalState = () => {
    setEditModal(false);
    setManageHolidayModal(false);
  };

  const handleDeleteHoliday = (_id, month, index) => {
    dispatch(deleteHoliday(_id, month, index));
    setRemovePop(false);
  };
  const [manageHolidayModal, setManageHolidayModal] = useState(false);
  const [holidayDetails, setHolidayDetails] = useState();

  const ManageModal = (item) => {
    setManageHolidayModal(!manageHolidayModal);
    setHolidayDetails(item);
  };
  return (
    <React.Fragment>
      <div className="Holiday-List-Tab-Wrap">
        {holidayListSuccess ? (
          holidayList.length ? (
            holidayList.map((holiday, index) => (
              <React.Fragment>
                <Card key={index}>
                  <CardHeader>
                    <p
                      onClick={() => showHideHoliday(index)}
                      className={`HeaderCnt text-xs w-500 ${holidayIdArray.includes(index) ? "active" : ""
                        }`}
                    >
                      {holiday.month},{moment(currentYear).format("yyyy")}&nbsp;
                      {/* {holiday.year} */}
                      <span className="text-xxs w-400">
                        &nbsp; &nbsp;
                        {holiday.holidayData.length > 1
                          ? `${holiday.holidayData.length} Holidays`
                          : `${holiday.holidayData.length} Holiday`}
                      </span>
                    </p>
                  </CardHeader>
                  {holidayIdArray.includes(index) && (
                    <CardBody>
                      {holiday.holidayData.length ? (
                        holiday.holidayData.map((item, key) => (
                          <div className="CardBodyHolidayListItem" key={key}>
                            <p className="text-xxs w-600">
                              {moment(item.startFrom).format("DD MMM")} -{" "}
                              {moment(item.endOn).format("DD MMM")}
                            </p>
                            <p className="text-xxs w-500">
                              {item.holidayTitle} &nbsp;&nbsp;
                              <span className="text-2xs primary">
                                {item.classroomInfo
                                  ? !item.classroomInfo.length
                                    ? ""
                                    : item.classroomInfo &&
                                      item.classroomInfo.length === 1
                                      ? getClassroomName(item)
                                      : item.classroomInfo.length + " Classrooms"
                                  : ""}
                              </span>
                            </p>
                            <ul className="holiday-action">
                              {user.user_activeRole ===
                                process.env.REACT_APP_TEACHER ? (
                                <li onClick={() => ManageModal(item)}>
                                  <img src={IconExternalLink} alt="" />
                                </li>
                              ) : (
                                <React.Fragment>
                                  <li
                                    onClick={() =>
                                      manageModal(item._id, holiday.month)
                                    }
                                  >
                                    <img src={IconExternalLink} alt="" />
                                  </li>
                                  <li onClick={() => RemovePopState(item._id, item + index + key)}>
                                    <img src={IconDelete} alt="" />
                                  </li>
                                </React.Fragment>
                              )}

                              <li className="holiday_type w-500">
                                {item.holidayType === "holiday"
                                  ? "H"
                                  : item.holidayType === "vacation"
                                    ? "V"
                                    : item.holidayType === "gazetted"
                                      ? "G"
                                      : item.holidayType === "statutory"
                                        ? "S"
                                        : item.holidayType === "additional"
                                          ? "A"
                                          : ""}
                              </li>
                              {/* item._id === deleteId && RemovePop && */}
                              {/* {console.log(popUpIndex === index + key, "index")} */}
                              {
                                popUpIndex === item + index + key &&
                                (
                                  <Popup
                                    show={RemovePop}
                                    RemovePopToggleRef={RemovePopToggleRef}
                                    CancelProp={() => setRemovePop(!RemovePop)}
                                    RemoveProp={() =>
                                      handleDeleteHoliday(item._id, holiday.month, index)
                                    }
                                    loading={deleteHolidayLoading}
                                  >
                                    <p className="gray text-xxs w-300">
                                      You are about to delete holiday.
                                    </p>
                                    <p className="dgray text-xxs w-400">
                                      Are you sure?
                                    </p>
                                  </Popup>
                                )}
                            </ul>
                          </div>
                        ))
                      ) : (
                        <div className="CardBodyHolidayListItem">
                          No Holidays Found in this Month.
                        </div>
                      )}
                    </CardBody>
                  )}
                </Card>
              </React.Fragment>
            ))
          ) : (
            <div className="loadingGridData">No Holidays Found.</div>
          )
        ) : (
          <div className="loadingGridData">Loading...</div>
        )}

        {editModal && (
          <TeacherEditHoliday
            show={editModal}
            onClose={closeModalState}
            _id={holidayId}
            month={holidayMonth}
          />
        )}
        {manageHolidayModal && (
          <StudentHolidayView
            onclose={closeModalState}
            manageHolidayModal={manageHolidayModal}
            holidayDetails={holidayDetails}
          />
        )}
      </div>
    </React.Fragment>
  );
  function getClassroomName(item) {
    return item.classroomInfo?.length > 0
      ? item.classroomInfo[0].coursename
      : "";
  }
};

export default TeacherHolidayList;
