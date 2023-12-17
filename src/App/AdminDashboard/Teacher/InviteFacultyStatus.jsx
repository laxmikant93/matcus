/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import GrayAuthTheme from "../../../Common/Theme/GrayAuthTheme";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../Common/Breadcrumb/BreadcrumbItem";
import { IconDownload } from "../../../Common/Icon";
import {
  postBulkUpload,
  createTeacherDataRest,
} from "../../../store/actions/inviteteacher";
import UploadFile from "../../../Common/Upload";
import { useNavigate } from "react-router";
import Modal from "../../../Common/Modal";
import ModalBody from "../../../Common/Modal/ModalBody";
import ProgressLoader from "../../../assets/images/img/progress-loader.gif";

import useDownTimer from "../../../App/Auth/Hooks/useTimer";
import "./AdminDashboardTeacher.scss";
const InviteFacultyStatus = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const [checkMailNotSent, setCheckMailNotSent] = useState(false);
  const [checkMailSentSuccessfully, setCheckMailSentSuccessfully] =
    useState(false);
  const [showSuccessError, setShowSuccessError] = useState(false);
  const [ScheduleClassModal, SetScheduleClassModal] = useState(false);
  const [timer, setTimer] = useDownTimer();
  const [timerStarted, setTimerStarted] = useState(false);
  const user = useSelector((state) => state.user);
  const teacherBulkUpload = useSelector(
    (state) => state.inviteteacher.create.success
  );
  const teacherBulkUploadLoading = useSelector(
    (state) => state.inviteteacher.create.loading
  );
  const teacherBulkUploadResponse = useSelector(
    (state) => state.inviteteacher.create.data
  );

  const loadingModal = () => {
    SetScheduleClassModal(!ScheduleClassModal);
  };

  if (teacherBulkUpload && !checkMailNotSent) {
    setCheckMailNotSent(true);
    if (teacherBulkUploadResponse.mailNotSent > 0) {
    }
  }
  if (teacherBulkUpload && !checkMailSentSuccessfully) {
    setCheckMailSentSuccessfully(true);
    if (
      teacherBulkUploadResponse.mailNotSent === teacherBulkUploadResponse.total
    ) {
      setShowSuccessError(true);
    }
  }

  const uploadHandel = (data) => {
    let fileData = data.location;
    dispatch(postBulkUpload(bulkUploadData(fileData)));
    SetScheduleClassModal(false);
  };

  useEffect(() => {
    return () => {
      dispatch(createTeacherDataRest());
    };
  }, [dispatch]);
  useEffect(() => {
    if (!teacherBulkUpload && !teacherBulkUploadLoading && !timerStarted) {
      setTimer(4);
      setTimerStarted(true);
    }
  }, [setTimer, teacherBulkUpload, teacherBulkUploadLoading, timerStarted]);

  if (timerStarted && timer === "0s") {
    history("/invite-faculty-list");
  }

  const bulkUploadData = (fileData) => {
    return {
      institute: user.user_institute,
      owner: user._id,
      kind: "teacher",
      url: fileData,
    };
  };

  return (
    <React.Fragment>
      <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          <BreadcrumbItem to="/invite-faculty-list" title="Staff" />
          <BreadcrumbItem
            to="/invite-faculty-status"
            title="Invitation Status"
          />
        </Breadcrumb>
        {teacherBulkUpload && teacherBulkUploadResponse ? (
          <div className="row">
            {teacherBulkUpload && teacherBulkUploadResponse ? (
              <React.Fragment>
                <div className="col-xs-12 col-md-12 mt-20">
                  <p className="heading text-sm w-300">
                    Staff Invitation Status
                  </p>
                  {!showSuccessError && teacherBulkUploadResponse ? (
                    <p className="sub-heading text-xs secondary w-500">
                      {teacherBulkUploadResponse.totalMailSent} invitations sent
                      successfully.
                    </p>
                  ) : (
                    ""
                  )}
                  {showSuccessError && teacherBulkUploadResponse ? (
                    <p className="sub-heading text-xs secondary w-500 red">
                      {teacherBulkUploadResponse.totalMailSent} invitations sent
                      successfully.
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </React.Fragment>
            ) : (
              ""
            )}
            {teacherBulkUploadResponse.errors > 0 ? (
              <React.Fragment>
                <div className="col-xs-12 col-md-7 mt-30">
                  {showSuccessError ? (
                    <>
                      <p className="heading red text-sm w-300">
                        {teacherBulkUploadResponse.mailNotSent}/
                        {teacherBulkUploadResponse.total} records failed{" "}
                      </p>
                      <p className="sub-heading text-xxs w-500">
                        Download and fix staffs information and upload again.
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="heading red text-sm w-300">
                        You have got {teacherBulkUploadResponse.errors} warnings{" "}
                      </p>
                      <p className="sub-heading text-xxs w-500">
                        Download and view your warning message in excel sheet.
                      </p>
                    </>
                  )}

                  <div className="bulk-xls-download mt-15">
                    <a
                      className="btnText text-xxs mt-8 w-600"
                      href={teacherBulkUploadResponse.toUploadExcelData}
                    >
                      Download Excel Sheet
                      <i className="ed-icon icon-download i-s primary"></i>
                    </a>
                  </div>
                  <div className="invite-again-wrap mt-60">
                  </div>
                </div>
                <div className="col-xs-12 col-md-5 mt-30">
                  <div className="information-section-wrapper">
                    <div className="information-section-box">
                      <p className="text-xs primary w-300">
                        Why my invitation failed?
                      </p>
                      <p className="text-xs base w-300 mt-8">
                        Invitations fail due to incomplete details. Kindly
                        download the Excel and fill in all the details required
                        to send invitations successfully. Once completed,
                        re-upload the Excel sheet.
                      </p>
                      <p className="text-xs base w-300 mt-8">
                        Refer to the Remarks column in the Excel sheet to figure
                        out why invitations failed.
                      </p>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ) : (
              ""
            )}
          </div>
        ) : (
          <div className="loadingGridData">
            <i className="ed-loadingGrid"></i>
          </div>
        )}

      <Modal show={ScheduleClassModal}>
        <ModalBody>
          <div className="mt-40 mb-40 text-center">
            <p className="text-sm">File Uploading</p>
            <img className="mt-20" src={ProgressLoader} alt="" />
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
};

export default InviteFacultyStatus;
