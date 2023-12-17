import React, { useEffect, useState, useCallback } from "react";
import GrayAuthTheme from "../../../../Common/Theme/GrayAuthTheme";
import Breadcrumb from "../../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../../Common/Breadcrumb/BreadcrumbItem";
import DummyProfile from "../../DummyProfile.png";
import IconDownload from "../../IconDownload.png";
import IconEdit from "../../IconEdit.png";
import IconEmail from "../../IconEmail.png";
import "../../ReportCard.scss";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getStudentReport,
  updateStudentReport,
} from "../../../../store/actions/reportcard";
import FormInput from "../../../../Common/Form/FormInput";
import FormError from "./../../../../Common/Form/FormError";

const ReportCardView = () => {
  const dispatch = useDispatch();
  const { reportCardId } = useParams();

  const [teacherRemark, setTeacherRemark] = useState();
  const [reportUpdate, setReportUpdate] = useState();

  const { instituteId, studentReport, gradesData, subjectInfo } = useSelector(
    (state) => {
      return {
        instituteId: state.user.user_institute,
        studentReport: state.reportCard.studentReport.data,
        subjectInfo: state.reportCard.studentReport.data.report,
        gradesData: state.reportCard.studentReport.data.gradeInfo,
      };
    }
  );

  const setSubjectData = useCallback(() => {
    subjectInfo && setReportUpdate(subjectInfo.subjects);
  }, [subjectInfo]);

  useEffect(() => {
    dispatch(getStudentReport(instituteId, reportCardId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      setReportUpdate(null);
    };
  }, []);

  useEffect(() => setSubjectData(), [setSubjectData]);

  const handleStatus = (obtainedMark) => {
    let status = "";
    subjectInfo.subjects.forEach((item) => {
      if (obtainedMark > item.passingMarks) {
        status = "PASS";
      } else {
        status = "FAIL";
      }
    });
    return status;
  };

  const handleObtainedMarks = (e, key) => {
    const { name, value } = e.target;
    const temp = reportUpdate.map((item, index) =>
      key === index
        ? {
          ...item,
          [name]: +value,
          status: handleStatus(+value),
        }
        : item
    );
    setReportUpdate(temp);
  };

  const updateReportCard = () => {
    const payload = {
      institute: instituteId,
      subjects: reportUpdate,
      teacherRemark,
    };
    dispatch(updateStudentReport(reportCardId, payload));
  };

  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        <BreadcrumbItem
          to="/dashboard/teacher-report-card"
          title="Report Card"
        />
        <BreadcrumbItem
          to="/dashboard/teacher-report-card"
          title="Report View"
        />
      </Breadcrumb>
      {studentReport.userInfo && (
        <div className="RC-View-Wrap">
          <div className="RC-View-Profile">
            <ul className="RC-View-Intro">
              <li className="RC-View-Intro-Item">
                <span className="Prefix-Intro">Name</span>
                <span className="Detail-Intro">
                  {studentReport.userInfo.fullname}
                </span>
              </li>
              <li className="RC-View-Intro-Item">
                <span className="Prefix-Intro">Roll No.</span>
                <span className="Detail-Intro">
                  {studentReport.admissionNo[0].admission_no
                    ? studentReport.admissionNo[0].admission_no
                    : "Not Available"}
                </span>
              </li>
              <li className="RC-View-Intro-Item">
                <span className="Prefix-Intro">Father's Name</span>
                <span className="Detail-Intro">
                  {studentReport.userInfo.parent_name}
                </span>
              </li>
              <li className="RC-View-Intro-Item">
                <span className="Prefix-Intro">Class</span>
                <span className="Detail-Intro">
                  {studentReport.courseInfo &&
                    studentReport.courseInfo.courseName}
                </span>
              </li>
              <li className="RC-View-Intro-Item">
                <span className="Prefix-Intro">Session</span>
                <span className="Detail-Intro">2022-2023</span>
              </li>
              <li className="RC-View-Intro-Item">
                <span className="Prefix-Intro">Report Type</span>
                <span className="Detail-Intro">
                  {studentReport.report.termTitle}
                </span>
              </li>
            </ul>
            <div className="RC-View-Prof-Pic">
              <img
                src={
                  studentReport.userInfo.profilePic
                    ? studentReport.userInfo.profilePic
                    : DummyProfile
                }
                alt=""
              />
            </div>
          </div>
        </div>
      )}
      <div className="RC-List-View">
        <table>
          <thead>
            <tr>
              <th>Subjects</th>
              <th className="InnerTable" colSpan="2">
                <table>
                  <tr>
                    <td colSpan="2">Term 1</td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td>Obt.</td>
                  </tr>
                </table>
              </th>
              <th>Remarks</th>
              <th>Grades</th>
              <th>Attendance</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {reportUpdate &&
              reportUpdate.map((item, key) => (
                <tr key={key}>
                  <th>{item.classroom_classroomname}</th>
                  <td>{item.totalMarks}</td>
                  <td>
                    <div className="formFieldwrap">
                      <FormInput
                        name="marksObtained"
                        type="number"
                        placeholder="Marks"
                        value={item.marksObtained}
                        onChange={(e) => handleObtainedMarks(e, key)}
                        onBlur={() => {
                          item.marksObtained < +item.totalMarks &&
                            updateReportCard();
                        }}
                      />
                      <FormError
                        show={item.marksObtained > +item.totalMarks}
                        error="Obt. Marks should be less than total marks."
                      />
                    </div>
                  </td>
                  <td>{item.remark ? item.remark : "--"}</td>
                  <td>{item.grade ? item.grade : "--"}</td>
                  <td>{item.marksObtained >= 0 ? "Present" : "--"}</td>
                  <td>{item.status ? item.status : "--"}</td>
                </tr>
              ))}
          </tbody>
          <tfoot>
            <tr>
              <th>Total</th>
              {studentReport.report && (
                <>
                  <td>{studentReport.report.termTotalMarks}</td>
                  <td>{studentReport.report.TotalMarksObtained}</td>
                  <td colSpan="4">{studentReport.report.percentage}%</td>
                </>
              )}
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="RC-Scholastic-View">
        {studentReport.termInfo &&
          studentReport.termInfo.extraActivities.map((item, key) => (
            <table key={key}>
              <thead>
                <tr>
                  <th colSpan="3">{item.title}</th>
                </tr>
              </thead>
              <tbody>
                {item.subject.map((data) => (
                  <tr key={data}>
                    <td width="60%">{data}</td>
                    <td width="20%">A</td>
                    <td width="20%">Good</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
      </div>
      <ul className="RC-T-Remarks-View">
        <li className="RC-T-Remarks-View-Head">Teacher's Remarks</li>
        <li className="RC-T-Remarks-View-Content">
          <textarea
            rows="5"
            cols="50"
            placeholder="Type Here!"
            onChange={(e) => setTeacherRemark(e.target.value)}
            onBlur={updateReportCard}
            defaultValue={
              studentReport.report && studentReport.report.teacherRemark
            }
          />
        </li>
      </ul>
      <div className="RC-Grid-View">
        <table>
          <thead>
            <tr>
              <th colspan="9">Grades</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {studentReport.gradeInfo &&
                gradesData.grades.map((item) => (
                  <td key={item.subject}>{item.subjects}</td>
                ))}
            </tr>
            <tr>
              {studentReport.gradeInfo &&
                gradesData.grades.map((item, key) => (
                  <td
                    key={key}
                  >{`${item.gradeRangeFrom} - ${item.gradeRangeto}`}</td>
                ))}
            </tr>
          </tbody>
        </table>
      </div>
      {/* <div className="RC-Progress-View">
          <ul>
            <li>
              <div className="ProgressBarItemHead">English</div>
              <div className="ProgressBarItem">
                <label for="file">Term 01:</label>
                <progress id="file" value="32" max="100" />
                <span>32%</span>
              </div>
              <div className="ProgressBarItem">
                <label for="file">Term 02:</label>
                <progress id="file" value="32" max="100" />
                <span>32%</span>
              </div>
              <div className="ProgressBarItem">
                <label for="file">Final:</label>
                <progress id="file" value="32" max="100" />
                <span>32%</span>
              </div>
            </li>
            <li>
              <div className="ProgressBarItemHead">SC.</div>
              <div className="ProgressBarItem">
                <label for="file">Term 01:</label>
                <progress id="file" value="32" max="100" />
                <span>32%</span>
              </div>
              <div className="ProgressBarItem">
                <label for="file">Term 02:</label>
                <progress id="file" value="32" max="100" />
                <span>32%</span>
              </div>
              <div className="ProgressBarItem">
                <label for="file">Final:</label>
                <progress id="file" value="32" max="100" />
                <span>32%</span>
              </div>
            </li>
          </ul>
        </div> */}
      <div className="RC-Signature-View">
        <div className="RC-CT-Signature-View">
          <label for="CTsignature">Class Teacher</label>
          <canvas id="CTsignature" width="300" height="100"></canvas>
        </div>
        <div className="RC-P-Signature-View">
          <label for="Psignature">Principal</label>
          <canvas id="Psignature" width="300" height="100"></canvas>
        </div>
      </div>
      {/* <div className="RC-Action-View">
          <button
            type="button"
            className="button btn-o-primary primary btn-sm"
          >
            <img src={IconDownload} alt="Download" />
            Download
          </button>
          <button
            type="button"
            className="button btn-o-primary primary btn-sm"
          >
            <img src={IconEmail} alt="Download" />
            Email
          </button>
          <button
            type="button"
            className="button btn-o-primary primary btn-sm"
          >
            <img src={IconEdit} alt="Download" />
            Edit
          </button>
        </div> */}
    </React.Fragment>
  );
};

export default ReportCardView;
