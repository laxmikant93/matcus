import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SelectTeacherCourse from "../../Common/Form/SelectTeacherCourse";
import {
  getTermList,
  getGrades,
  clearTerm
} from "../../store/actions/reportcard";
import FormError from "../../Common/Form/FormError";
import { DynamicCourseHeader } from "../../Common/UserElement"
import SelectInput from "../../Common/Form/SelectInput";

const ReportCardFilter = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const [course, setCourse] = useState();
  const [terms, setTerms] = useState();
  const [isSubmit, setIsSubmit] = useState(false);

  const { instituteId, termList } = useSelector((state) => {
    return {
      instituteId: state.user.user_institute,
      termList: state.reportCard.termList.list,
    };
  });

  useEffect(() => {
    dispatch(getGrades(instituteId));
    course && dispatch(getTermList(instituteId, course));
    return (() => {
      dispatch(clearTerm())
    })
  }, [instituteId, course, dispatch]);

  const handleTerm = (e) => {
    e.target.value === "consolidate"
      ? setTerms(true)
      : setTerms(e.target.value);
  };

  const handleResult = (e) => {
    e.preventDefault();
    setIsSubmit(true);
    if (course && terms) {
      history("/dashboard/teacher-result-view", { course: course, terms: terms });
      setIsSubmit(false);
    }
  };

  return (
    <form>
      <div className={`formFieldwrap mb-25`}>
        <SelectInput name="courseHeader" id="select_Course" label="Select Academic Session">
          <option value="">Select Academic Session</option>
          <option value="Classroom">2022-2023</option>
        </SelectInput>
      </div>
      <div className={`formFieldwrap  mb-25`}>
        <SelectTeacherCourse
          value={course}
          onSelect={(selectedCourse) => {
            setCourse(selectedCourse);
          }}
          onEvent={(e) => setCourse(e.target.value)}
        />
        <FormError
          show={!course && isSubmit}
          error={`Please select ${DynamicCourseHeader()}`}
        />
      </div>

      <div className={`formFieldwrap  mb-25`}>
        <SelectInput label="Select Term" name="courseHeader" id="select_Course" onChange={handleTerm}>
          <option value="">Select Term</option>
          {/* {termList && termList.length > 1 && (
            <option value={"consolidate"}>Consolidate</option>
          )} */}
          {termList && termList.length > 0 &&
            termList.map((item) => {
              return (
                <React.Fragment key={item.term}>
                  <option value={item.term}>{item.name}</option>
                </React.Fragment>
              );
            })}
        </SelectInput>
        <FormError show={!terms && isSubmit} error="Please Select Term." />
      </div>
      <button
        className="button btn-md button-theme button-block"
        onClick={handleResult}
      >
        Show Result
      </button>
    </form>
  );
};

export default ReportCardFilter;
