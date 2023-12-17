import React from "react";

const VacancyDetail = () => {
  return (
    <div className="VacancyDetailWrapper">
      <React.Fragment>
        <div className="VacancyDetailBanner">
          <div className="VD-BannerDetailTitle">
            <p className="text-sm">Admission open for Summer Term 2021</p>
          </div>
          <ul>
            <li>
              <p className="text-xxs">Session for</p>
              <p className="text-xs">2021-2022</p>
            </li>
            <li>
              <p className="text-xxs">No. of Seat</p>
              <p className="text-xs">2</p>
            </li>
            <li>
              <p className="text-xxs">Minimum Age</p>
              <p className="text-xs">18 Years</p>
            </li>
            <li>
              <p className="text-xxs">Course Fees</p>
              <p className="text-xs">
                <strong>(&#8377;)</strong> 25,000
              </p>
            </li>
            <li>
              <p className="text-xxs">Minimum Qualification</p>
              <p className="text-xs">Graudation</p>
            </li>
            <li>
              <p className="text-xxs">Last date to apply</p>
              <p className="text-xxs">30 Jun. 2021</p>
            </li>
          </ul>
        </div>

        <div className="VD-ActionSection mt-20">
          <span className="button button-base btn-sm">Apply Now</span>
          <span className="button btn-o-mgray btn-sm base">
            Download Job Description
          </span>
        </div>
        <div className="VD-ContentSection mt-20">
          <p className="text-sm">Job Description</p>
          <p className="text-xxs mt-10">
            This summer class will be on contemporary philosophy of the body and
            illness. As social human beings we are and have bodies that grow,
            age, enjoy, suffer, move, work, communicate, rest, fall sick and
            die. Since firsthand memories of a global pandemic are likely to
            still haunt the minds of both the teacher and the taught, the course
            is designed with a major module on the concept of a disease.
          </p>
          <p className="text-sm mt-20">Key Roles & Responsibility</p>
          <ul className="DashedInstructionList">
            <li className="text-xxs">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </li>
            <li className="text-xxs">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </li>
            <li className="text-xxs">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </li>
            <li className="text-xxs">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </li>
          </ul>
        </div>
      </React.Fragment>
    </div>
  );
};

export default VacancyDetail;
