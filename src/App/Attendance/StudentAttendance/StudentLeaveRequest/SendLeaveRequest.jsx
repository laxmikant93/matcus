import React, { useEffect, useRef } from "react";
import Breadcrumb from "../../../../Common/Breadcrumb";
import { useNavigate, useParams } from "react-router-dom";
import BreadcrumbItem from "../../../../Common/Breadcrumb/BreadcrumbItem";
import FormTextArea from "../../../../Common/Form/FormTextArea";
import InputDatePicker from "../../../../Common/Form/InputDatePicker";
import StudentTheme from "../../../../Common/Theme/StudentTheme";
import "../../Attendance.scss";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getTeacherClassroomSpecificData } from "../../../../store/actions/teachersubjectlist";
import { useState } from "react";
import Upload from "../../../../Common/Upload";
import ValidationFile from "../../../../Classes/ValidationFile";
import FormError from "../../../../Common/Form/FormError";
import {
  resetSendLeaveRequest,
  sendLeaveRequest,
} from "../../../../store/actions/StudentAttendance";
import {
  acceptLeaveRequest,
  getSingleLeaveRequest,
  resetAcceptRequest,
  resetSingleRequest,
} from "../../../../store/actions/TeacherAttendance";
import UploadButton from "../../../../Common/UploadButton";
import Uploader from "../../../../Common/ImageUploader";
const NewLeaveRequest = () => {
  const { _id, _classroomId } = useParams();
  const ref=useRef(null)
  const s3Url = "https://edneed-images-uat.s3.amazonaws.com/";
  const dispatch = useDispatch();
  const history = useNavigate();
  const [startFrom, setStartFrom] = useState("");
  const [endsOn, setEndsOn] = useState("");
  const [reason, setReason] = useState("");
  const [file, setFile] = useState("");
  const [startsDateError, setStartsDateError] = useState(false);
  const [endsDateError, setEndsDateError] = useState(false);
  const [error, setError] = useState(false);
  const {
    user,
    ClassroomDetail,
    ClassroomDetailSuccess,
    editStateSuccess,
    sendLeaveRequestState,
    requestDetails,
    requestDetailsSuccess,
    editStateLoading,
    requestDetailsLoading,
  } = useSelector((state) => {
    return {
      user: state.user,
      ClassroomDetailSuccess:
        state.teachersubjectlist.TeacherClassroomData.success,
      ClassroomDetail: state.teachersubjectlist.TeacherClassroomData.data,
      sendLeaveRequestState: state.studentAttendance.sendLeaveRequest,
      requestDetails: state.teacherAttendance.getSingleLeaveRequest.data.data,
      requestDetailsSuccess:
        state.teacherAttendance.getSingleLeaveRequest.success,
      requestDetailsLoading:
        state.teacherAttendance.getSingleLeaveRequest.loading,
      editStateLoading: state.teacherAttendance.acceptLeaveRequest.loading,
      editStateSuccess: state.teacherAttendance.acceptLeaveRequest.success,
    };
  });
  const handleDate = (selectedDate, value) => {
    if (value === "startDate") {
      setStartFrom(selectedDate);
      setStartsDateError(ValidationFile.isEmpty(selectedDate));
    } else {
      setEndsOn(selectedDate);
      setEndsDateError(ValidationFile.isEmpty(selectedDate));
      setEndsDateError(selectedDate < startFrom);
    }
  };
  const uploadImage = (data) => {
    let fileData = data
    setFile(fileData);
  };

  const postData = () => {
    return {
      leaveReason: reason,
      startFrom: startFrom,
      endOn: endsOn,
      fileUpload: file,
      user: user._id,
      course: _classroomId,
      institute: user.user_institute,
      owner: user._id,
    };
  };

  const handleSubmit = () => {
    setError(true);
    if (ValidationFile.isEmpty(startFrom)) {
      setStartsDateError(true);
    }
    if (ValidationFile.isEmpty(endsOn) || endsOn < startFrom) {
      setEndsDateError(true);
    }
    if (
      !ValidationFile.isEmpty(startFrom) &&
      !ValidationFile.isEmpty(endsOn) &&
      endsOn >= startFrom
    ) {
      if (_id) {
        dispatch(acceptLeaveRequest(_id, postData()));
      } else {
        dispatch(sendLeaveRequest(postData()));
      }
    }
  };
  if (sendLeaveRequestState.success) {
    history(`/dashboard/student-view-leaves/${_classroomId}`);
  }
  if (editStateSuccess) {
    history(`/dashboard/student-view-leaves/${_classroomId}`);
  }
  const handleCancel = () => {
    history(`/dashboard/student-view-leaves/${_classroomId}`);
  };
  useEffect(() => {
    return () => {
      dispatch(resetSendLeaveRequest());
      dispatch(resetAcceptRequest());
      dispatch(resetSingleRequest());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTeacherClassroomSpecificData(_classroomId));
  }, [_classroomId, dispatch]);
  useEffect(() => {
    if (_id) {
      dispatch(getSingleLeaveRequest(_id));
    }
  }, [_id, dispatch]);
  const [isFiled, setIsFilled] = useState(false);
  if (_id && requestDetailsSuccess && requestDetails && !isFiled) {
    setIsFilled(true);
    setStartFrom(requestDetails.startFrom);
    setEndsOn(requestDetails.endOn);
    setReason(requestDetails.leaveReason);
    setFile(requestDetails.fileUpload);
  }
  return (
    <StudentTheme>
      <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          <BreadcrumbItem
            to="/dashboard/attendance-student-classroomlist"
            title="Attendance"
          />
          <BreadcrumbItem
            to={`/dashboard/student-subjects-attendance/${_classroomId}`}
            title={`${ClassroomDetailSuccess && ClassroomDetail.coursename}`}
          />
          <BreadcrumbItem
            to="#"
            title={_id ? "Edit Leave Request" : " New Leave Request"}
          />
        </Breadcrumb>
        <div className="PageTopHead mt-10">
          <div className="PTH-Item">
            <p className="text-sm w-400">{_id ? "Edit" : "New"} Leave Request</p>
            <p className="text-xxs w-600">
              {" "}
              {ClassroomDetailSuccess && ClassroomDetail.coursename}
            </p>
          </div>
        </div>
        {_id && requestDetailsLoading ? (
          <div className="loadingGridData">Loading...</div>
        ) : (
          <div className="NewLeaveRequestWrapper">
            <div className="datePickerWrap">
              <InputDatePicker
                className=""
                label="Leave Start From"
                name="startDate"
                onSelect={(selectedDate) =>
                  handleDate(selectedDate, "startDate")
                }
                value={startFrom}
                minDate={new Date()}
                id="startDate"
                type="date"
                placeholder="Leave Start From"
              />
              <FormError
                show={startsDateError && error}
                error="Start Date is required."
              />
            </div>
            <div className="datePickerWrap">
              <InputDatePicker
                className=""
                label="Leave Ends On"
                name="startDate"
                onSelect={(selectedDate) => handleDate(selectedDate, "endDate")}
                value={endsOn}
                minDate={new Date()}
                id="startDate"
                type="date"
                placeholder="Leave Ends On"
              />
              <FormError
                show={endsDateError && !endsOn && error}
                error="Ends Date is required."
              />
              <FormError
                show={endsDateError && endsOn && error}
                error="End date should be after start date."
              />
            </div>
            <div className="formFieldwrap LA-Textarea-Wapper">
              <FormTextArea
                rows="4"
                type="text"
                placeholder="Write a strong reason to take leave"
                label="Write a strong reason to take leave"
                maxLength="500"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                onKeyUp={(e) => setReason(e.target.value)}
                TextareaBtmTxt="500"
              ></FormTextArea>
            </div>
            <div className="LA-Upload-Wapper">
              <p className="text-xxs w-600">
                Upload file if required for leave approval.
              </p>
              <ul className="DashedInstructionList mb-5">
                <li className="text-xxs">
                  {" "}
                  Accept only png, .jpg, .pdf and maximum file size 5 MB.
                </li>
              </ul>
              <div className="formFieldwrap mt-5">
                  <UploadButton
                      BtnName="Upload File"
                      IconClassName="icon-file-upload base i-xs"
                      BtnPropClass="btn-o-silver btn-xs button-block CropUploadBtn"
                      onClick={()=>{ref.current.open()}}
                      object={file}
                      showLink={true}
                    />
               <Uploader size={5}
       onclose={() => ref.current.close()}
      multiSelect={false} discartRef={ref} onUploaded={(data)=>uploadImage(data)} validationProp={"onlyImagePdf"}  uploadLimit={1} />
                
              </div>
            </div>
            <div className="LA-Action-Wapper">
              {sendLeaveRequestState.loading || editStateLoading ? (
                <button type="button" className="button button-base btn-sm">
                  {_id ? "Updating" : "Sending"} Request...
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="button button-base btn-sm"
                >
                  {_id ? " Update" : "Send"} Request
                </button>
              )}
              <button
                type="button"
                onClick={handleCancel}
                className="button btn-o-base btn-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
    </StudentTheme>
  );
};

export default NewLeaveRequest;
