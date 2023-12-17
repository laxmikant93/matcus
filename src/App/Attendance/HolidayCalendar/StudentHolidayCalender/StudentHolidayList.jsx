import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../../../../Common/Card";
import CardBody from "../../../../Common/Card/CardBody";
import CardHeader from "../../../../Common/Card/CardHeader";
import IconExternalLink from "../../icon-external-link.svg";
import StudentHolidayView from "./StudentHolidayView";

const StudentHolidayList = ({ currentYear }) => {
  const { studentHolidaySuccess, holidayList } = useSelector((state) => {
    return {
      studentHolidaySuccess: state.studentHolidays.studentHolidaysList.success,
      holidayList: state.studentHolidays.studentHolidaysList.data,
    };
  });

  const [holidayIdArray, setHolidayIdArray] = useState([]);
  useEffect(() => {
    const array = [];
    if (studentHolidaySuccess && holidayList.length) {
      // eslint-disable-next-line array-callback-return
      holidayList.map((item, i) => {
        array.push(i);
      });
      setHolidayIdArray(array);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentHolidaySuccess]);
  const [manageHolidayModal, setManageHolidayModal] = useState(false);
  const [holidayDetails, setHolidayDetails] = useState();

  const ManageModal = (item) => {
    setManageHolidayModal(!manageHolidayModal);
    setHolidayDetails(item);
  };
  const closeModalState = () => {
    setManageHolidayModal(false);
  };
  const manageShow = (index) => {
    const array = holidayIdArray;
    if (holidayIdArray.includes(index)) {
      let data = holidayIdArray;
      let myIndex = data.indexOf(index);
      data.splice(myIndex, 1);
    } else {
      array.push(index);
    }
    setHolidayIdArray([...array]);
  };

  const getClassroomName = (item) => {
    return item.classroomInfo?.length > 0
      ? item.classroomInfo[0].coursename
      : "";
  };
  return (
    <React.Fragment>
      <div className="Holiday-List-Tab-Wrap">
        {studentHolidaySuccess ? (
          holidayList.length ? (
            holidayList.map((holiday, index) => (
              <React.Fragment key={index}>
                <Card>
                  <CardHeader>
                    <p
                      onClick={() => manageShow(index)}
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
                        holiday.holidayData.map((item, index) => (
                          <div className="CardBodyHolidayListItem" key={index}>
                            <p className="text-xxs w-600">
                              {moment(item.startFrom).format("DD MMM")}-
                              {moment(item.endOn).format("DD MMM")}
                            </p>
                            <p className="text-xxs w-500">
                              {" "}
                              {item.holidayTitle}
                              &nbsp;&nbsp;
                              <span className="text-2xs primary">
                                {item.classroomInfo
                                  ? !item.classroomInfo.length
                                    ? ""
                                    : item.classroomInfo &&
                                      item.classroomInfo.length === 1
                                      ? getClassroomName(item)
                                      : item.classroomInfo.length + " classroom"
                                  : ""}
                              </span>
                            </p>
                            <ul className="holiday-action">
                              <li>
                                <button
                                  className="btnText"
                                  onClick={() => ManageModal(item)}
                                >
                                  <img src={IconExternalLink} alt="" />
                                </button>
                              </li>
                              <li className="holiday_type w-500">
                                {item.holidayType === "holiday"
                                  ? "H"
                                  : item.holidayType === "vacation"
                                    ? "V"
                                    : item.holidayType === "additional"
                                      ? "A"
                                      : item.holidayType === "statutory"
                                        ? "S"
                                        : item.holidayType === "gazetted"
                                          ? "G"
                                          : ""}
                              </li>
                            </ul>
                          </div>
                        ))
                      ) : (
                        <div className="CardBodyHolidayListItem" key={index}>
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
};

export default StudentHolidayList;
