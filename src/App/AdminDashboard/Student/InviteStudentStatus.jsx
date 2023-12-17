/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import GrayAuthTheme from "../../../Common/Theme/GrayAuthTheme";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../Common/Breadcrumb/BreadcrumbItem";
import { IconDownload } from "../../../Common/Icon";
import {
  postBulkUpload,
  postBulkUploadClear,
} from "../../../store/actions/student";
import UploadFile from "../../../Common/Upload";
import Modal from "../../../Common/Modal";
import ModalBody from "../../../Common/Modal/ModalBody";
import ProgressLoader from "../../../assets/images/img/progress-loader.gif";

import { useEffect } from "react";

const InviteStudentStatus = () => {
  const dispatch = useDispatch();
  const [ScheduleClassModal, SetScheduleClassModal] = useState(false);
  const user = useSelector((state) => state.user);
  const studentBulkUpload = useSelector(
    (state) => state.students.create.success
  );
  const studentBulkUploadLoadding = useSelector(
    (state) => state.students.create.loading
  );
  const studentBulkUploadResponse = useSelector(
    (state) => state.students.create.data
  );

  const [checkMailNotSent, setCheckMailNotSent] = useState(false);
  const [checkMailSentSuccessfully, setCheckMailSentSuccessfully] =
    useState(false);
  const [showFailedError, setShowFailedError] = useState(false);
  const [showSuccessError, setShowSuccessError] = useState(false);

  const loadingModal = () => {
    SetScheduleClassModal(!ScheduleClassModal);
  };

  const uploadHandel = (data) => {
    let fileData = data.location;

    dispatch(postBulkUpload(bulkUploadData(fileData)));
    SetScheduleClassModal(false);
  };

  useEffect(() => {
    return () => {
      dispatch(postBulkUploadClear());
    };
  }, [dispatch]);

  const bulkUploadData = (fileData) => {
    return {
      institute: user.user_institute,
      owner: user._id,
      kind: "student",
      url: fileData,
    };
  };

  if (studentBulkUpload && !checkMailNotSent) {
    setCheckMailNotSent(true);
    if (studentBulkUploadResponse.mailNotSent > 0) {
      setShowFailedError(true);
    }
  }
  if (studentBulkUpload && !checkMailSentSuccessfully) {
    setCheckMailSentSuccessfully(true);
    if (
      studentBulkUploadResponse.mailNotSent === studentBulkUploadResponse.total
    ) {
      setShowSuccessError(true);
    }
  }

  if (studentBulkUpload && !checkMailNotSent) {
    setCheckMailNotSent(true);
    if (studentBulkUploadResponse.mailNotSent > 0) {
      setShowFailedError(true);
    }
  }

  if (studentBulkUpload && !checkMailSentSuccessfully) {
    setCheckMailSentSuccessfully(true);
    if (
      studentBulkUploadResponse.mailNotSent === studentBulkUploadResponse.total
    ) {
      setShowSuccessError(true);
    }
  }

  return (
    <React.Fragment>
      <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          <BreadcrumbItem to="/invite-student-list" title="Students" />
          <BreadcrumbItem
            to="/invite-students-status"
            title="Invitation Status"
          />
        </Breadcrumb>
        {studentBulkUpload && studentBulkUploadResponse ? (
          <div className="row">
            {studentBulkUpload && studentBulkUploadResponse ? (
              <div className="col-xs-12 col-md-12 mt-20">
                <p className="heading text-sm w-300">
                  Students Invitation Status
                </p>
                <a
                  className="btnText text-xxs mt-8"
                  href={studentBulkUploadResponse.toUploadExcelData}
                >
                  <i> Download Excel Sheet</i>
                  <i className="ed-icon icon-download i-s primary"></i>
                </a>
                {!showSuccessError && studentBulkUploadResponse ? (
                  <p className="sub-heading text-xs secondary w-500 ">
                    {studentBulkUploadResponse.totalMailSent} invitations sent
                    successfully.
                  </p>
                ) : (
                  ""
                )}
                {showSuccessError && studentBulkUploadResponse ? (
                  <p className="sub-heading text-xs secondary w-500 red">
                    {studentBulkUploadResponse.totalMailSent} invitations sent
                    successfully.
                  </p>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}
            {showFailedError && studentBulkUploadResponse ? (
              <React.Fragment>
                <div className="col-xs-12 col-md-7 mt-30">
                  <p className="heading red text-sm w-300">
                    {studentBulkUploadResponse.mailNotSent}/
                    {studentBulkUploadResponse.total} records failed
                  </p>
                  <p className="sub-heading text-xxs w-500">
                    Download and fix student information and upload again.
                  </p>
                  <div className="bulk-xls-download mt-15">
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

export default InviteStudentStatus;
