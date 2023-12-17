/* eslint-disable no-unused-vars */
import React from "react";
import GrayAuthTheme from "../../../Common/Theme/GrayAuthTheme";
import { SearchIcon } from "../../../Common/Icon";
import "./StudentDashboard.scss";
import SearchControl from "../../../Common/SearchControl";

export default function StudentJoinAssignments() {
  return (
    <>
      <React.Fragment>
        <div className="PageTopHead PTH-StudentJoinAssignment mt-20">
          <div className="PTH-Item">
            <h3 className="heading dgray text-sm w-300">Assignments</h3>
            <p className="sub-heading base text-xxs w-300">Class 5-D, 2021</p>
          </div>
          <div className="PTH-Item">
            <SearchControl
              classNameWrappper="tableSearchbar"
              id="search"
              name="search"
              placeholder="Search Classes"
            />
          </div>
        </div>

        <div className="row mt-20">
          <div className="col-md-12 col-xs-12">
            <div className="student-join-assignment">
              <table>
                <thead>
                  <tr>
                    <th width="20%">Title</th>
                    <th width="25%">Classroom</th>
                    <th width="20%">Grade & Remarks</th>
                    <th width="15%">Created on</th>
                    <th width="15%">Due Date</th>
                    <th width="5%"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td data-column="Title">Worksheet on globe and map</td>
                    <td data-column="Classroom">Class 5-D, 2021 Geography</td>
                    <td data-column="Grade & Remarks">
                      <p className="gray">05 Feb. 2021</p>
                      <p className="gray">9:23 am</p>
                    </td>
                    <td data-column="Created on">
                      <p className="gray">On or before</p>
                      <p className="gray">16 Feb. 2021</p>
                      <p className="gray">5:00 pm</p>
                    </td>
                    <td data-column="Due Date">
                      <p className="gray">On or before</p>
                      <p className="gray">16 Feb. 2021</p>
                      <p className="gray">5:00 pm</p>
                    </td>
                    <td>
                      <div className="actionBtnCustom">
                        <button className="button btn-sm purple btn-o-mgray button-block">
                          View Result
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td data-column="Title">Worksheet on globe and map</td>
                    <td data-column="Classroom">Class 5-D, 2021 Geography</td>
                    <td data-column="Grade & Remarks">
                      <p className="gray">05 Feb. 2021</p>
                      <p className="gray">9:23 am</p>
                    </td>
                    <td data-column="Created on">
                      <p className="gray">On or before</p>
                      <p className="gray">16 Feb. 2021</p>
                      <p className="gray">5:00 pm</p>
                    </td>
                    <td data-column="Due Date">
                      <p className="gray">On or before</p>
                      <p className="gray">16 Feb. 2021</p>
                      <p className="gray">5:00 pm</p>
                    </td>
                    <td>
                      <div className="actionBtnCustom">
                        <button className="button btn-sm button-gray button-block">
                          Submiitted
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td data-column="Title">Worksheet on globe and map</td>
                    <td data-column="Classroom">Class 5-D, 2021 Geography</td>
                    <td data-column="Grade & Remarks">
                      <p className="gray">05 Feb. 2021</p>
                      <p className="gray">9:23 am</p>
                    </td>
                    <td data-column="Created on">
                      <p className="gray">On or before</p>
                      <p className="gray">16 Feb. 2021</p>
                      <p className="gray">5:00 pm</p>
                    </td>
                    <td data-column="Due Date">
                      <p className="gray">On or before</p>
                      <p className="gray">16 Feb. 2021</p>
                      <p className="gray">5:00 pm</p>
                    </td>
                    <td>
                      <div className="actionBtnCustom">
                        <button className="button btn-sm button-purple button-block">
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </React.Fragment>
    </>
  );
}
