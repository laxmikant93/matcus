import React, { useEffect, useRef, useState } from "react";
import Breadcrumb from "../../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../../Common/Breadcrumb/BreadcrumbItem";
import SearchControl from "../../../../Common/SearchControl";
import GrayAuthTheme from "../../../../Common/Theme/GrayAuthTheme";
import { useDetectOutsideClick } from "../../../../Common/DetectOutsideClick/useDetectOutsideClick";

import "../../ReportCard.scss";
import SelectInput from "../../../../Common/Form/SelectInput";
const ViewGrades = () => {
  const dropdownRef = useRef(null);
  const [ActionFilter, setActionFilter] = useDetectOutsideClick(
    dropdownRef,
    false
  );
  const [info, setinfo] = useDetectOutsideClick(dropdownRef, false);

  return (
    <React.Fragment>
      <React.Fragment>
        <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          <BreadcrumbItem
            to="/dashboard/teacher-report-card"
            title="Report Card"
          />
          <BreadcrumbItem to="/dashboard/view-grades" title="View Grades" />
        </Breadcrumb>
        <div className="View-Grades-Wrapper">
          <div className="PageTopHead PTH-RC-ViewGrades mt-20">
            <div className="PTH-Item">
              <h1 className="text-sm w-200">Result</h1>
              <h4 className="w-500">Classroom 10 A</h4>
            </div>
            <div className="PTH-Item P-Right">
              <SearchControl
                classNameWrappper="tableSearchbar"
                id="search"
                name="search"
                placeholder="Result Report Card"
              />
            </div>
            <div className="PTH-Item P-Right">
              <div className="RC-ActionDropFilter-Wrapper">
                <button
                  type="button"
                  className="RC-ActionDropFilterBtn"
                  onClick={() => setActionFilter(!info)}
                >
                  <span className="text-sm w-800 white">&#8285;</span>
                </button>
                {ActionFilter && (
                  <div
                    ref={dropdownRef}
                    className="RC-ActionDropFilter actionDrop"
                  >
                    <div className="Download-RC-Wrap">
                      <label>Download Report Card</label>
                      <div className={`formFieldwrap mt-5`}>
                        <SelectInput>
                          <option>All Terms</option>
                          <option>All Terms</option>
                          <option>All Terms</option>
                          <option>All Terms</option>
                        </SelectInput>
                      </div>
                      <div className="input-custom-type mt-20 mb-20">
                        <label className="small">
                          <input type="radio" />
                          For All
                        </label>
                        <label className="small mt-10">
                          <input type="radio" />
                          For Specific
                        </label>
                      </div>
                      <button
                        type="button"
                        className="button btn-xs btn-o-primary primary"
                      >
                        PDF
                      </button>
                      <button
                        type="button"
                        className="button btn-xs btn-o-primary primary"
                      >
                        Excel
                      </button>
                    </div>
                    <div className="Download-RC-Wrap">
                      <label>Send Report Card on Email</label>
                      <div className={`formFieldwrap mt-5`}>
                        <SelectInput>
                          <option>All Terms</option>
                          <option>All Terms</option>
                          <option>All Terms</option>
                          <option>All Terms</option>
                        </SelectInput>
                      </div>
                      <div className="input-custom-type mt-20 mb-20">
                        <label className="small">
                          <input type="radio" />
                          For All
                        </label>
                        <label className="small mt-10">
                          <input type="radio" />
                          For Specific
                        </label>
                      </div>
                      <button
                        type="button"
                        className="button btn-xs btn-o-primary primary"
                      >
                        Send Email
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="PTH-Item P-Right">
              <div className="RC-ActionDropFilter-Wrapper">
                <button type="button" className="RC-ActionDropFilterBtn">
                  <i className="ed-printer white"></i>
                </button>
              </div>
            </div>
            <div className="PTH-Item P-Right">
              <div className="RC-ActionDropFilter-Wrapper">
                <button
                  type="button"
                  className="RC-ActionDropFilterBtn infoBtn"
                  onClick={() => setinfo(!info)}
                >
                  <span className="text-xs w-400 primary">&#8505;</span>
                </button>
                {info && (
                  <div
                    ref={dropdownRef}
                    className="RC-ActionDropFilter infoDrop"
                  >
                    <ul>
                      <li className="text-xxs w-600">Term 1</li>
                      <li className="MarksCst">
                        <span className="text-xxs w-400">Marks</span>
                        <span className="text-xxs w-600">700</span>
                      </li>
                      <li className="SubjectsCst">
                        <span className="text-xxs w-400">Subjects</span>
                        <span className="text-xxs w-600">8</span>
                      </li>
                      <li className="text-xxs w-400">
                        15 May 2021 - 20 May 2022
                      </li>
                    </ul>
                    <ul>
                      <li className="text-xxs w-600">Term 2</li>
                      <li className="MarksCst">
                        <span className="text-xxs w-400">Marks</span>
                        <span className="text-xxs w-600">700</span>
                      </li>
                      <li className="SubjectsCst">
                        <span className="text-xxs w-400">Subjects</span>
                        <span className="text-xxs w-600">8</span>
                      </li>
                      <li className="text-xxs w-400">
                        15 May 2021 - 20 May 2022
                      </li>
                    </ul>
                    <ul>
                      <li className="text-xxs w-600">Term 3</li>
                      <li className="MarksCst">
                        <span className="text-xxs w-400">Marks</span>
                        <span className="text-xxs w-600">700</span>
                      </li>
                      <li className="SubjectsCst">
                        <span className="text-xxs w-400">Subjects</span>
                        <span className="text-xxs w-600">8</span>
                      </li>
                      <li className="text-xxs w-400">
                        15 May 2021 - 20 May 2022
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="gridListTable">
            <ul className="gridHeader">
              <li className="col col-4">Terms</li>
              <li className="col col-2">Subjects</li>
              <li className="col col-2">Marks</li>
              <li className="col col-2">Students</li>
              <li className="col col-2">&nbsp;</li>
            </ul>

            <div className="gridBody">
              <div className="gridRow">
                <ul className="topInfo">
                  <li className="col col-4" data-head="Terms">
                    <div className="Details">
                      <div className="text-xs primary w-600">Term 1</div>
                      <div className="mt-3">01 March - 01 June, 2021</div>
                    </div>
                  </li>
                  <li className="col col-2" data-head="Subjects">
                    <p className="text-xs primary w-600">6 Subjects</p>
                  </li>
                  <li className="col col-2" data-head="Marks">
                    <p className="text-xs primary w-600">600</p>
                  </li>
                  <li className="col col-2" data-head="Students">
                    <p className="text-xs primary w-600">30 Students</p>
                  </li>
                  <li className="col col-2 actionCols">
                    <div className="actionBtn ">
                      <button className="btn-square" title="Notify">
                        <span className="cssIcon">
                          <i className="ed-pen"></i>
                        </span>
                      </button>
                      <button className="btn-square" title="Notify">
                        <span className="cssIcon red">
                          <i className="ed-trash"></i>
                        </span>
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    </React.Fragment>
  );
};

export default ViewGrades;
