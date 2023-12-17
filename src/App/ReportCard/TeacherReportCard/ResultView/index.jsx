import React, { useEffect, useRef, useState } from "react";
import GrayAuthTheme from "../../../../Common/Theme/GrayAuthTheme";
import Breadcrumb from "../../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../../Common/Breadcrumb/BreadcrumbItem";
import SearchControl from "../../../../Common/SearchControl";
import "../../ReportCard.scss";
import { useDetectOutsideClick } from "../../../../Common/DetectOutsideClick/useDetectOutsideClick";
import DummyProfile from "../../DummyProfile.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getReport } from "../../../../store/actions/reportcard";

const ResultView = (props) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const dropdownRef = useRef(null);
  const [ActionFilter, setActionFilter] = useDetectOutsideClick(
    dropdownRef,
    false
  );
  const [info, setinfo] = useDetectOutsideClick(dropdownRef, false);
  const { course, terms } = props.history.location.state;
  const { resultList, instituteId } = useSelector((state) => {
    return {
      resultList: state.reportCard.reportList.data,
      instituteId: state.user.user_institute,
    };
  });

  const [once, setOnce] = useState(true);
  if (course && terms && once) {
    setOnce(false);
    dispatch(getReport(instituteId, course, terms));
  }

  const [searchWord, setSearchWord] = useState("");
  let debounce;

  const handleSearchStudents = (e) => {
    let typedWord = e.target.value;
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      setSearchWord(typedWord);
    }, 400);
  };

  const findGrades = (marks) => {
    let grade = "-";
    if (marks >= 90 && marks < 100) {
      grade = "A+";
    } else if (marks >= 80 && marks < 90) {
      grade = "A";
    } else if (marks >= 70 && marks < 80) {
      grade = "B+";
    } else if (marks >= 60 && marks < 70) {
      grade = "B";
    }
    return grade;
  };
  const [term, setTerm] = useState([]);
  const findTerm = () => {
    if (resultList) {
      const mappedTerm = resultList.map((item) => item.termTitle);
      const filteredTerm = mappedTerm.filter(
        (item, index) => mappedTerm.indexOf(item) === index
      );
      setTerm(filteredTerm);
    }
  };

  useEffect(() => {
    findTerm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultList]);

  function handleStudentResult(id) {
    history(`/dashboard/teacher-report-card-view/${id}`);
  }

  return (
    <React.Fragment>
      <React.Fragment>
        <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          <BreadcrumbItem
            to="/dashboard/teacher-report-card"
            title="Report Card"
          />
        </Breadcrumb>
        <div className="PageTopHead PTH-RC-ResultView mt-20">
          <div className="PTH-Item">
            <h1 className="text-sm w-200">Result</h1>
            {resultList.length && (
              <h4 className="w-500">{resultList[0].courseName}</h4>
            )}
          </div>
          <div className="PTH-Item P-Right">
            <SearchControl
              classNameWrappper="tableSearchbar"
              id="search"
              name="search"
              placeholder="Type Student Name"
              onChange={handleSearchStudents}
              autocomplete="off"
            />
          </div>
          <div className="PTH-Item P-Right">
            <div className="RC-ActionDropFilter-Wrapper">

            </div>
          </div>
          <div className="PTH-Item P-Right">

          </div>
          <div className="PTH-Item P-Right">
            <div className="RC-ActionDropFilter-Wrapper">
              {/* <button
                  type="button"
                  className="RC-ActionDropFilterBtn infoBtn"
                  onClick={() => setinfo(!info)}
                >
                  <span className="text-xs w-400 primary">&#8505;</span>
                </button> */}
              {info && (
                <div
                  ref={dropdownRef}
                  className="RC-ActionDropFilter infoDrop"
                >
                  {resultList && resultList.length &&
                    <ul>
                      <li className="text-xxs w-600">{resultList[0].termTitle}</li>
                      <li className="MarksCst">
                        <span className="text-xxs w-400">Marks</span>
                        <span className="text-xxs w-600">{resultList[0].termTotalMarks}</span>
                      </li>
                      <li className="SubjectsCst">
                        <span className="text-xxs w-400">Subjects</span>
                        <span className="text-xxs w-600">{resultList[0].subjects.length}</span>
                      </li>
                      {/* <li className="text-xxs w-400">
                          15 May 2021 - 20 May 2022
                        </li> */}
                    </ul>
                  }
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="RC-Result-View-Wrapper">
          <table>
            <thead>
              <tr>
                <th rowSpan="2">
                  {" "}
                  {resultList && resultList.length} Students
                </th>
                {term.map((item, key) => {
                  return (
                    <React.Fragment key={key}>
                      <th colSpan="3">{item}</th>
                    </React.Fragment>
                  );
                })}
                {term.length > 1 && (
                  <>
                    <th rowSpan="2">Rank</th>
                    <th rowSpan="2">Present</th>
                  </>
                )}
                <th rowSpan="2">Action</th>
              </tr>
              <tr>
                <th>Marks</th>
                <th>%</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {resultList &&
                resultList
                  .filter((item) => {
                    return item.studentName
                      .toLowerCase()
                      .includes(searchWord.toLocaleLowerCase());
                  })
                  .map((item, key) => {
                    return (
                      <tr key={key}>
                        <th>
                          <div className="RCR-ProfileDetail">
                            <img
                              src={
                                item.studentProfile
                                  ? item.studentProfile
                                  : DummyProfile
                              }
                              alt="Profile"
                            />
                            <div className="ProfileDetail">
                              <p className="text-rgf w-600">
                                {item.studentName}
                              </p>
                            </div>
                          </div>
                        </th>
                        <td data-label={`${item.termTitle}-Marks`}>
                          {item.termTotalMarks}
                        </td>
                        <td data-label={`${item.termTitle}-%`}>
                          {item.percentage}
                        </td>
                        <td data-label={`${item.termTitle}-Grade`}>
                          {findGrades(
                            parseFloat(Math.ceil(+item.percentage))
                          )}
                        </td>
                        {item.termTitle === "consolidate" && (
                          <>
                            <td>1st</td>
                            <td>120</td>
                          </>
                        )}
                        <th>
                          <div className="RCR-ProfileAction">
                            {/* <button type="button">
                                <span>
                                  <i className="ed-download base"></i>
                                </span>
                              </button> */}
                            <button
                              type="button"
                              onClick={() => handleStudentResult(item._id)}
                            >
                              <span>
                                <i className="ed-next base"></i>
                              </span>
                            </button>
                          </div>
                        </th>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
          {/* <table>
              <thead>
                <tr>
                  <th rowSpan="2">
                    {resultList.Report && resultList.Report.length} Students
                  </th>
                  {term.map((item, key) => {
                    return (
                      <React.Fragment key={key}>
                        <th colSpan="3" rowSpan="2">
                          <table className="innerThead">
                            <tr>
                              <td colSpan="3">{item}</td>
                            </tr>
                            <tr>
                              <td>Marks</td>
                              <td>%</td>
                              <td>Grade</td>
                            </tr>
                          </table>
                        </th>
                      </React.Fragment>
                    );
                  })}
                  {term.length > 1 && (
                    <>
                      <th rowSpan="2" colSpan="1">
                        Rank
                      </th>
                      <th rowSpan="2">Present</th>
                    </>
                  )}
                  <th colSpan="3" rowSpan="2">
                    <table className="innerThead">
                      <tr>
                        <td colSpan="3">Term 2</td>
                      </tr>
                      <tr>
                        <td>Marks</td>
                        <td>%</td>
                        <td>Grade</td>
                      </tr>
                    </table>
                  </th>
                  <th rowSpan="2" colSpan="1">
                    Rank
                  </th>
                  <th rowSpan="2">Present</th>
                  <th rowSpan="2"></th>
                </tr>
              </thead>
              <tbody>
                {resultList &&
                  resultList.map((item, key) => {
                    return (
                      <tr key={key}>
                        <th>
                          <div className="RCR-ProfileDetail">
                            <img src={item.studentProfile ? item.studentProfile : DummyProfile} alt="Profile" />
                            <div className="ProfileDetail">
                              <p className="text-rgf w-600">
                                {item.studentName}
                              </p>
                              <p className="text-xxs w-400">01</p>
                            </div>
                          </div>
                        </th>
                        <td>{item.termTotalMarks}</td>
                        <td>{item.percentage}</td>
                        <td>
                          {findGrades(parseFloat(Math.ceil(+item.percentage)))}
                        </td>
                        {item.termTitle === "consolidate" && (
                          <>
                            <td>1st</td>
                            <td>120</td>
                          </>
                        )}
                        <th>
                          <div className="RCR-ProfileAction">
                            <button type="button">
                              <span>
                                <i className="ed-download base"></i>
                              </span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleStudentResult(item._id)}
                            >
                              <span>
                                <i className="ed-next base"></i>
                              </span>
                            </button>
                          </div>
                        </th>
                      </tr>
                    );
                  })}
              </tbody>
            </table> */}
        </div>
      </React.Fragment>
    </React.Fragment>
  );
};

export default ResultView;
