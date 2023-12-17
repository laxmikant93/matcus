import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewGrades,
  getGrades,
  updateGrades,
} from "../../../../store/actions/reportcard";
import Breadcrumb from "../../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../../Common/Breadcrumb/BreadcrumbItem";
import FormInput from "../../../../Common/Form/FormInput";
import GrayAuthTheme from "../../../../Common/Theme/GrayAuthTheme";
// import FormError from "../../../../Common/Form/FormError";
import Validation from "../../../../Classes/Validation";
import "../../ReportCard.scss";
import { useNavigate } from "react-router-dom";
const validateForm = new Validation();

const Grades = () => {
  const initialState = {
    subject: { value: null, isValid: false },
    gradeRangeFrom: { value: null, isValid: false },
    gradeRangeTo: { value: null, isValid: false },
    remark: { value: null, isValid: false },
  };

  const history = useNavigate();
  const dispatch = useDispatch();
  const [grades, setGrades] = useState([]);
  const [data, setData] = useState(initialState);
  const [newGrade, setNewGrade] = useState(true);
  const [error, setError] = useState(false);

  const { gradeData, instituteId } = useSelector((state) => {
    return {
      gradeData: state.reportCard.gradeList.data,
      instituteId: state.user.user_institute,
    };
  });

  useEffect(() => {
    dispatch(getGrades(instituteId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (gradeData.length) {
      let temp = [];
      gradeData[0].grades.forEach((grade) => {
        temp.push({
          subject: { value: grade.subjects, isValid: true },
          gradeRangeFrom: { value: grade.gradeRangeFrom, isValid: true },
          gradeRangeTo: { value: grade.gradeRangeto, isValid: true },
          remark: { value: grade.remark, isValid: true },
        });
      });
      setGrades(temp);
    }
  }, [gradeData]);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let tempData = { ...data };
    tempData = {
      ...tempData,
      [name]: {
        ...tempData[name],
        value: value,
        isValid: validateForm.isNotEmpty(value),
      },
    };
    setData(tempData);
  };

  const handleCheckValidation = () => {
    let temp = [];
    Object.values(data).forEach((item) => {
      temp.push(item.isValid);
    });
    return temp.includes(false) ? false : true;
  };

  const handleAddMoreGrade = (e) => {
    e.preventDefault();
    setNewGrade(true);
  };

  const isMarksValid = () => {
    return +data.gradeRangeFrom.value < +data.gradeRangeTo.value ? true : false;
  };

  const createNewGrade = (e) => {
    e.preventDefault();
    setError(true);
    if (handleCheckValidation() && isMarksValid()) {
      setGrades([...grades, data]);
      setNewGrade(false);
      setData(initialState);
      setError(false);
    }
  };

  const cancelNewGrade = (e) => {
    e.preventDefault();
    setNewGrade(false);
    setError(false);
    setData(initialState);
  };

  const handleRemoveGrade = (e, key) => {
    e.preventDefault();
    setGrades((prev) => prev.filter((item, index) => index !== key));
  };

  const getPayload = () => {
    return {
      institute: instituteId,
      grades: grades.map((data) => {
        return {
          subjects: data.subject.value,
          gradeRangeFrom: data.gradeRangeFrom.value,
          gradeRangeto: data.gradeRangeTo.value,
          remark: data.remark.value,
        };
      }),
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createNewGrades(getPayload()));
    history("/dashboard/teacher-report-card");
  };

  const updateGrade = (e) => {
    e.preventDefault();
    dispatch(updateGrades(gradeData[0]._id, getPayload()));
    history("/dashboard/teacher-report-card");
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
          to="/dashboard/teacher-create-grades"
          title="Create New Grades"
        />
      </Breadcrumb>
      <div className="Grade-Create-Wrapper">
        <h1 className="Grade-Create-Head">
          {gradeData?.length ? "Update Grade" : "Add Grade"}
        </h1>
        <h5 className="">Define grading system up to 10 records.</h5>
        <form>
          <div className="Grade-Create-Custom mt-20">
            <div className="Grade-Subject-Grid">
              <div className="gridListTable">
                <ul className="gridHeader">
                  <li className="col col-4">Grade</li>
                  <li className="col col-2">Min marks</li>
                  <li className="col col-2">Max marks</li>
                  <li className="col col-3">Remarks</li>
                  <li className="col col-1">&nbsp;</li>
                </ul>

                <div className="gridBody">
                  {grades?.map((item, key) => {
                    return (
                      <div key={key} className="gridRow">
                        <ul className="topInfo">
                          <li className="col col-4" data-head="Subject">
                            <FormInput
                              readOnly
                              type="text"
                              placeholder="Subject"
                              value={item.subject.value}
                              onChange={(e) => handleChange(e, key)}
                            />
                          </li>
                          <li className="col col-2" data-head="Total Marks">
                            <FormInput
                              readOnly
                              type="number"
                              value={item.gradeRangeFrom.value}
                              onChange={(e) => handleChange(e, key)}
                            />
                          </li>
                          <li
                            className="col col-2"
                            data-head="Passing Marks"
                          >
                            <FormInput
                              readOnly
                              type="number"
                              value={item.gradeRangeTo.value}
                              onChange={(e) => handleChange(e, key)}
                            />
                          </li>
                          <li className="col col-3" data-head="Remarks">
                            <FormInput
                              readOnly
                              type="text"
                              value={item.remark.value}
                              onChange={(e) => handleChange(e, key)}
                            />
                          </li>
                          <li className="col col-1 actionCols">
                            <div className="actionBtn ">
                              <button
                                className="btn-square"
                                title="Remove"
                                onClick={(e) => handleRemoveGrade(e, key)}
                              >
                                <span className="cssIcon">
                                  <i className="ed-trash red"></i>
                                </span>
                              </button>
                            </div>
                          </li>
                        </ul>
                      </div>
                    );
                  })}
                  {newGrade && (
                    <div className="gridRow">
                      <ul className="topInfo">
                        <li className="col col-4" data-head="Subject">
                          <div className="">
                            <FormInput
                              type="text"
                              placeholder="Grade"
                              name="subject"
                              onChange={handleChange}
                              className={
                                error && !data.subject?.isValid
                                  ? "errorInput"
                                  : ""
                              }
                            />
                            {/* <FormError
                                  show={error && !data.subject?.isValid}
                                  error={"Required field"}
                                /> */}
                          </div>
                        </li>
                        <li className="col col-2" data-head="Total Marks">
                          <div className="">
                            <FormInput
                              type="number"
                              autoComplete="off"
                              name="gradeRangeFrom"
                              onChange={handleChange}
                              // value={state.passingMarks}
                              onWheel={(e) => e.target.blur()}
                              min={0}
                              className={
                                (error && !data.gradeRangeFrom?.isValid) ||
                                  (error &&
                                    !isMarksValid() &&
                                    data.gradeRangeFrom?.isValid &&
                                    data.gradeRangeTo?.isValid)
                                  ? "errorInput"
                                  : ""
                              }
                            />
                            {/* <FormError
                                  show={error && !data.gradeRangeFrom?.isValid}
                                  error={"Required field"}
                                /> */}
                            {/* <FormError
                                  show={
                                    error &&
                                    !isMarksValid() &&
                                    data.gradeRangeFrom?.isValid &&
                                    data.gradeRangeTo?.isValid
                                  }
                                  error="Passing Marks Should be Less than Total Marks."
                                /> */}
                          </div>
                        </li>
                        <li className="col col-2" data-head="Passing Marks">
                          <div className="">
                            <FormInput
                              type="number"
                              autoComplete="off"
                              name="gradeRangeTo"
                              onChange={handleChange}
                              onWheel={(e) => e.target.blur()}
                              min={0}
                              className={
                                error && !data.gradeRangeTo?.isValid
                                  ? "errorInput"
                                  : ""
                              }
                            />
                            {/* <FormError
                                  show={error && !data.gradeRangeTo?.isValid}
                                  error={"Required field"}
                                /> */}
                          </div>
                        </li>
                        <li className="col col-3" data-head="Remarks">
                          <div className="">
                            <FormInput
                              type="text"
                              name="remark"
                              onChange={handleChange}
                              className={
                                error && !data.remark?.isValid
                                  ? "errorInput"
                                  : ""
                              }
                            />
                            {/* <FormError
                                  show={error && !data.remark?.isValid}
                                  error={"Required field"}
                                /> */}
                          </div>
                        </li>
                        <li className="col col-1 actionCols">
                          <div className="actionBtn ">
                            <button
                              onClick={cancelNewGrade}
                              className="btn-square"
                              title="Cancel"
                            >
                              <span className="cssIcon">
                                <i className="ed-cancel base"></i>
                              </span>
                            </button>
                            <button
                              onClick={createNewGrade}
                              className="btn-square"
                              title="Add"
                            >
                              <span className="cssIcon">
                                <i className="ed-check primary"></i>
                              </span>
                            </button>
                          </div>
                        </li>
                      </ul>
                      <ul className="topInfo">
                        {(error && !data.subject?.isValid) ||
                          (error && !data.gradeRangeFrom?.isValid) ||
                          (error && !data.gradeRangeTo?.isValid) ||
                          (error && !data.remark?.isValid) ? (
                          <li className="col col-12 text-2xs red">
                            Required Fields can't be Blank.
                          </li>
                        ) : (
                          ""
                        )}
                      </ul>
                      <ul className="topInfo">
                        {error &&
                          !isMarksValid() &&
                          data.gradeRangeFrom?.isValid &&
                          data.gradeRangeTo?.isValid ? (
                          <li className="col col-12 text-2xs red">
                            Passing Marks Should be Less than Total Marks.
                          </li>
                        ) : (
                          ""
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="Add-More-Custom">
            {gradeData.length < 10 && (
              <button
                type="button"
                className="button btn-o-primary btn-sm primary"
                onClick={handleAddMoreGrade}
              >
                Add More Grades
              </button>
            )}
          </div>

          {gradeData?.length ? (
            <button
              type="button"
              onClick={updateGrade}
              className="button btn-md button-theme mt-50"
            >
              Update Grades
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="button btn-md button-theme mt-50"
            >
              Save Grades
            </button>
          )}
        </form>
      </div>
    </React.Fragment>
  );
};

export default Grades;
