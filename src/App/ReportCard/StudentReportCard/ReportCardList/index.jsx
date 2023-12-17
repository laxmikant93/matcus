import React from "react";
import Breadcrumb from "../../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../../Common/Breadcrumb/BreadcrumbItem";
import SingleSelectDropdown from "../../../../Common/Form/SingleSelectDropdown";
import SearchControl from "../../../../Common/SearchControl";
import GrayAuthTheme from "../../../../Common/Theme/GrayAuthTheme";
import "../../ReportCard.scss";
const StudentReportCardList = () => {
  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        <BreadcrumbItem
          to="/dashboard/student-report-card-List"
          title="Report Card"
        />
      </Breadcrumb>
      <div className="S-RC-List mt-20">
        <p className="text-sm w-300">2 Classrooms</p>
      </div>
      <div className="S-RC-List mt-5">
        <div className="PageTopHead PTH-RC-List">
          <div className="PTH-Item">
            <SingleSelectDropdown SingleSelectLabelName="Term" />
          </div>
          <div className="PTH-Item">
            <SingleSelectDropdown SingleSelectLabelName="Session" />
          </div>
          <div className="PTH-Item">
            <button type="button" className="refreshBtn" title="Refresh">
              <i className="ed-refresh"></i>
            </button>
          </div>
          <div className="PTH-Item">
            <SearchControl placeholder="Search Report Card" />
          </div>
        </div>
      </div>
      <ul className="RC-S-List">
        <li>
          <div className="RC-S-List-Details">
            <div className="text-xs base w-600">Term 1</div>
            <div className="mt-3 text-xxs w-500">01 March - 01 June, 2021</div>
          </div>
          <div className="RC-S-List-Details">
            <div className="text-xs base w-600">Term 1</div>
            <div className="mt-3 text-xxs w-500">01 March - 01 June, 2021</div>
          </div>
          <div className="RC-S-List-Details action">
            <button className="btnText" title="Notify">
              <i className="ed-download"></i>
            </button>
            <button className="btnText" title="Notify">
              <i className="ed-eye"></i>
            </button>
          </div>
        </li>
        <li>
          <div className="RC-S-List-Details">
            <div className="text-xs base w-600">Term 1</div>
            <div className="mt-3 text-xxs w-500">01 March - 01 June, 2021</div>
          </div>
          <div className="RC-S-List-Details">
            <div className="text-xs base w-600">Term 1</div>
            <div className="mt-3 text-xxs w-500">01 March - 01 June, 2021</div>
          </div>
          <div className="RC-S-List-Details action">
            <button className="btnText" title="Notify">
              <i className="ed-download"></i>
            </button>
            <button className="btnText" title="Notify">
              <i className="ed-eye"></i>
            </button>
          </div>
        </li>
        <li>
          <div className="RC-S-List-Details">
            <div className="text-xs base w-600">Term 1</div>
            <div className="mt-3 text-xxs w-500">01 March - 01 June, 2021</div>
          </div>
          <div className="RC-S-List-Details">
            <div className="text-xs base w-600">Term 1</div>
            <div className="mt-3 text-xxs w-500">01 March - 01 June, 2021</div>
          </div>
          <div className="RC-S-List-Details action">
            <button className="btnText" title="Download">
              <i className="ed-download"></i>
            </button>
            <button className="btnText" title="View">
              <i className="ed-eye"></i>
            </button>
          </div>
        </li>
      </ul>
    </React.Fragment>
  );
};

export default StudentReportCardList;
