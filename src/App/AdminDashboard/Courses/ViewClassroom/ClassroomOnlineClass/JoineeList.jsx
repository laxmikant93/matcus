import React, { useEffect } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  getAttendessList,
  resetListStore,
} from "../../../../../store/actions/zoomApi";
import "./ClassroomOnlineClass.scss";
import FileSaver from "file-saver";
import * as XLSX from 'xlsx';
import NoDataAvailable from "../../../../../Common/NoDataAvailable";

function JoineeList({ closePopup, teacherData, isClick }) {
  const dispatch = useDispatch();

  useEffect(() => {
    teacherData && isClick && dispatch(getAttendessList(teacherData._id));
  }, [dispatch, teacherData, isClick]);
  // eslint-disable-line react-hooks/exhaustive-deps

  const participent = useSelector((state) => state.zoomapi.attendessList);
  const isSuccess = useSelector((state) => state.zoomapi.attendessListStatus);
  const onClose = () => {
    dispatch(resetListStore());
    closePopup();
  };

  // convert JSON Data into Excel
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileName = `${teacherData.classroomInfo_classroomname}_Attendees_List`;
  const fileExtension = ".xlsx";

  const downloadXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(participent);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <div className="modalwrapper">
      <span className="closeModal dgray text-xxs" onClick={onClose}>
        Close
      </span>
      <div className="modalHead">
        <div className="PageTopHead PTH-TeacherJoineeList mt-20">
          <div className="PTH-Item">
            <p className="text-sm w-300">
              {teacherData.classroomInfo_classroomname}
            </p>
          </div>
          <div className="PTH-Item P-Right">
            {moment(teacherData.class_timing).format("dddd, MMM Do, h:mm")} -{" "}
            {moment(teacherData.class_timing)
              .add(teacherData.duration, "m")
              .format("h:mm A")}
          </div>
        </div>
        {participent.length >= 1 && (
          <button
            className="button btn-o-primary primary btn-sm"
            onClick={downloadXLSX}
          >
            Download Excelsheet
          </button>
        )}
      </div>
      <div className="modalbody">
        <div className="gridListTable">
          <ul className="gridHeader">
            <li className="col col-6">Student Name</li>
            <li className="col col-3">Joining Time</li>
            <li className="col col-3">Leave Time</li>
          </ul>
          <div className="gridBody">
            {isSuccess && participent.length >= 1 ? (
              participent.map((attendees) => {
                return (
                  <div className="gridRow" key={attendees._id}>
                    <ul className="topInfo">
                      <li className="col col-6" data-column="Student Name">{attendees.name}</li>
                      <li className="col col-3" data-head="Joining Time">{attendees.join_time}</li>
                      <li className="col col-3" data-head="Leave Time">{attendees.leave_time}</li>
                    </ul>
                  </div>
                );
              })
            ) : isSuccess && participent.length === 0 ? (
              <NoDataAvailable title="Class Has not been held yet." />
            ) : (
              <div className="loadingGridData">
                <i className="ed-loadingGrid"></i>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default JoineeList;
