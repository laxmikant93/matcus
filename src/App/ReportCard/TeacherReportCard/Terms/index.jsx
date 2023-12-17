import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "../../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../../Common/Breadcrumb/BreadcrumbItem";
import Card from "../../../../Common/Card";
import CardBody from "../../../../Common/Card/CardBody";
import FormInput from "../../../../Common/Form/FormInput";
import GrayAuthTheme from "../../../../Common/Theme/GrayAuthTheme";
import SelectTeacherCourse from "../../../../Common/Form/SelectTeacherCourse";
import "../../ReportCard.scss";
import FormError from "../../../../Common/Form/FormError";
import Validation from "../../../../Classes/Validation";
import { addTerm } from "../../../../store/actions/reportcard";
import { useNavigate } from "react-router-dom";
import { DynamicCourseHeader } from "../../../../Common/UserElement";

const checkValidation = new Validation();

const Terms = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { assignedClassroom } = useSelector((state) => state.teacherselect);
  const { user } = useSelector((state) => state);
  const isSuccess = useSelector((state) => state.reportCard.termList.success);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const data = {
    classroom_classroomname: "",
    passingMarks: "",
    totalMarks: "",
    institute: user.user_institute,
    owner: user._id,
  };

  const sectionData = {
    title: "",
    subject: [""],
  };

  const [termTitle, setTermTitle] = useState("");
  const [state, setState] = useState(data);

  const [terms, setTerms] = useState([]);
  const [isTermOpen, setIsTermOpen] = useState(false);
  const [isSectionOpen, setIsSectionOpen] = useState(false);
  const [course, setCourse] = useState();
  const [extraSection, setExtraSection] = useState([]);
  const [isSubjectSaved, setIsSubjectSaved] = useState(false);

  const validationsForAddingTerms = () => {
    const { classroom_classroomname, passingMarks, totalMarks } = state;

    return checkValidation.isNotEmpty(classroom_classroomname) &&
      checkValidation.isNotEmpty(passingMarks) &&
      checkValidation.isNotEmpty(totalMarks)
      ? true
      : false;
  };

  const insertMarks = (oldArr) => {
    const newArr = oldArr.map((item, key) => {
      return { ...item, passingMarks: "", totalMarks: "" };
    });
    return newArr;
  };

  useEffect(() => {
    setTerms(insertMarks(assignedClassroom));
    setIsSubmit(false);
  }, [assignedClassroom, isSuccess]);

  const createNewTerm = (e) => {
    e.preventDefault();
    setIsSubjectSaved(true);
    if (validationsForAddingTerms()) {
      setTerms([...terms, state]);
      setIsTermOpen(false);
      setState(data);
    }
  };

  const addNewTerm = (e) => {
    e.preventDefault();
    setIsTermOpen(true);
    setState(data);
  };

  const cancelNewTerm = (e) => {
    e.preventDefault();
    setIsTermOpen(false);
    setState(data);
    setIsSubjectSaved(false);
  };

  const handleRemoveTerm = (e, key) => {
    e.preventDefault();
    setTerms((prev) => prev.filter((item, index) => index !== key));
  };

  const handlePreviousClass = (e, key) => {
    e.preventDefault();
    const { value } = e.target;
    let copyTerm = [...terms];
    copyTerm = copyTerm.map((item, index) => {
      if (index === key) {
        return { ...item, passingMarks: value.trimStart() };
      } else {
        return item;
      }
    });
    setTerms(copyTerm);
  };

  const handleTotalMarks = (e, key) => {
    e.preventDefault();
    const { value } = e.target;
    let copyTerm = [...terms];
    copyTerm = copyTerm.map((item, index) => {
      if (index === key) {
        return { ...item, totalMarks: value.trimStart() };
      } else {
        return item;
      }
    });
    setTerms(copyTerm);
  };

  const handleTerms = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    const copyTerm = { ...state };
    switch (name) {
      case "classroom_classroomname":
        copyTerm[name] = value.trimStart();
        break;
      case "passingMarks":
        copyTerm[name] = value.trimStart();
        break;
      case "totalMarks":
        copyTerm[name] = value.trimStart();
        break;
      default:
        return copyTerm;
    }
    setState(copyTerm);
  };

  const handleAddExtraSection = (e) => {
    e.preventDefault();
    setExtraSection([...extraSection, sectionData]);
    setIsSectionOpen(true);
  };

  const handleDeleteSection = (e, key) => {
    e.preventDefault();
    setExtraSection((prev) => prev.filter((item, index) => index !== key));
  };

  const handleChangeSection = (e, key, index) => {
    e.preventDefault();
    const { name, value } = e.target;
    const temp = [...extraSection];
    switch (name) {
      case "title":
        temp[key][name] = value;
        break;
      case "subject":
        temp[index][name][key] = value;
        break;
      default:
        break;
    }
    setExtraSection(temp);
  };

  const [subjectKey, setSubjectKey] = useState("");

  const handleAddExtaSubject = (e, key) => {
    e.preventDefault();
    const section = [...extraSection];
    section.map((element, index) => {
      return index === key
        ? { ...element, ...element.subject.push("") }
        : element;
    });

    setExtraSection(section);
    // setIsSubjectSaved(false);
    setSubjectKey("");
  };

  const handleSubjectCancel = (e, subjectKey, sectionIndex) => {
    e.preventDefault();

    const sections = [...extraSection];
    const data = sections.map((e, key) => {
      if (key === sectionIndex) {
        let filteredSub = e.subject.filter(
          (element, index) => index !== subjectKey && element
        );
        return { ...e, subject: filteredSub };
      } else {
        return e;
      }
    });
    setExtraSection(data);
    // setIsSubjectSaved(true);
  };

  const createSectionSubject = (e, key) => {
    e.preventDefault();
    setSubjectKey(key);
    // setIsSubjectSaved(true);
  };

  const isValidRequiredField = () => {
    let isTure = terms.every((item) => {
      return checkValidation.isNotEmpty(item.passingMarks) &&
        checkValidation.isNotEmpty(item.totalMarks)
        ? true
        : false;
    });
    return isTure && checkValidation.isNotEmpty(termTitle) ? true : false;
  };

  const isPassingMarksValid = () => {
    let isTure = terms.every((item) => {
      return +item.passingMarks > +item.totalMarks ? false : true;
    });
    return isTure;
  };

  const termData = {
    title: termTitle,
    course: course,
    owner: user._id,
    subjects: terms,
    extraActivities: extraSection,
    institute: user.user_institute,
  };

  const hasRepeatedClass = () => {
    let className = terms.map((item, index) => {
      return item.classroom_classroomname;
    });
    const hasDuplicates = className.length !== new Set(className).size;
    return hasDuplicates;
  };

  const createTerm = () => {
    setIsSubmit(true);

    if (
      isValidRequiredField() &&
      isPassingMarksValid() &&
      !hasRepeatedClass()
    ) {
      dispatch(addTerm(termData));
      setIsLoading(true);
    }
  };

  useEffect(() => {
    isSuccess && history("/dashboard/teacher-report-card");
  }, [isSuccess, history]);

  return (
    <React.Fragment>
      <React.Fragment>
        <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          <BreadcrumbItem
            to="/dashboard/teacher-report-card"
            title="Report Card"
          />
          <BreadcrumbItem
            to="/dashboard/teacher-create-terms"
            title="Create New Terms"
          />
        </Breadcrumb>
        <div className="Terms-Create-Wrapper">
          <h1 className="Term-Create-Head">Create New Term</h1>
          <form>
            <div className="Term-Create-Custom mt-20">
              <div className="formFieldwrap">
                <FormInput
                  label="Term Title"
                  placeholder="Term Title"
                  onChange={(e) => setTermTitle(e.target.value.trimStart())}
                  name="termTitle"
                  autoComplete="off"
                  value={termTitle}
                  className={!termTitle && isSubmit ? "errorInput" : ""}
                />
                <FormError
                  show={!termTitle && isSubmit}
                  error="Title Required."
                />
              </div>
              <div className="formFieldwrap">
                <SelectTeacherCourse
                  value={course}
                  onSelect={(selectedCourse) => {
                    setCourse(selectedCourse);
                  }}
                  onEvent={(e) => setCourse(e.target.value)}
                  error={!course && isSubmit}
                />
                <FormError
                  show={!course && isSubmit}
                  error={`Select ${DynamicCourseHeader()}`}
                />
              </div>
              <div className="Term-Subject-Grid">
                <div className="gridListTable">
                  <ul className="gridHeader">
                    <li className="col col-7">Subject</li>
                    <li className="col col-2">Passing Marks</li>
                    <li className="col col-2">Total Marks</li>
                    <li className="col col-1">&nbsp;</li>
                  </ul>

                  <div className="gridBody">
                    {terms.map((item, key) => {
                      return (
                        <div className="gridRow" key={key}>
                          <ul className="topInfo">
                            <li className="col col-7" data-head="Subject">
                              <div className="">
                                <FormInput
                                  type="text"
                                  placeholder="Subject"
                                  value={item.classroom_classroomname}
                                  disabled
                                />
                              </div>
                            </li>
                            <li
                              className="col col-2"
                              data-head="Passing Marks"
                            >
                              <div className="">
                                <FormInput
                                  type="number"
                                  value={item.passingMarks}
                                  onWheel={(e) => e.target.blur()}
                                  name="passingMarks"
                                  onChange={(e) =>
                                    handlePreviousClass(e, key)
                                  }
                                  min={0}
                                  className={
                                    (item.passingMarks &&
                                      item.totalMarks &&
                                      +item.passingMarks > +item.totalMarks &&
                                      isSubmit) ||
                                      (!item.passingMarks && isSubmit)
                                      ? "errorInput"
                                      : ""
                                  }
                                />
                                {/* <FormError
                                    show={!item.passingMarks && isSubmit}
                                    error="Passing Marks Required."
                                  /> */}
                                {/* <FormError
                                    show={
                                      item.passingMarks &&
                                      item.totalMarks &&
                                      +item.passingMarks > +item.totalMarks &&
                                      isSubmit
                                    }
                                    error="Passing Marks Should be Less than Total Marks."
                                  /> */}
                              </div>
                            </li>
                            <li className="col col-2" data-head="Total Marks">
                              <div className="">
                                <FormInput
                                  type="number"
                                  value={item.totalMarks}
                                  onWheel={(e) => e.target.blur()}
                                  name="totalMarks"
                                  onChange={(e) => handleTotalMarks(e, key)}
                                  min={0}
                                  className={
                                    !item.totalMarks && isSubmit
                                      ? "errorInput"
                                      : ""
                                  }
                                />
                                {/* <FormError
                                    show={!item.totalMarks && isSubmit}
                                    error="Total Marks Required."
                                  /> */}
                              </div>
                            </li>
                            <li className="col col-1 actionCols">
                              <div className="actionBtn ">
                                <button
                                  className="btn-square "
                                  title="Remove"
                                  onClick={(e) => handleRemoveTerm(e, key)}
                                >
                                  <span className="cssIcon">
                                    <i className="ed-trash red"></i>
                                  </span>
                                </button>
                              </div>
                            </li>
                          </ul>
                          <ul className="topInfo">
                            {item.passingMarks &&
                              item.totalMarks &&
                              +item.passingMarks > +item.totalMarks &&
                              isSubmit ? (
                              <li className="col col-12 text-2xs red">
                                Passing Marks Should be Less than Total Marks.
                              </li>
                            ) : (
                              ""
                            )}
                          </ul>
                          <ul className="topInfo">
                            {(!state.totalMarks ||
                              !state.passingMarks ||
                              !state.classroom_classroomname) &&
                              isSubmit ? (
                              <li className="col col-12 text-2xs red">
                                Required Fields can't be Blank.
                              </li>
                            ) : (
                              ""
                            )}
                          </ul>
                        </div>
                      );
                    })}

                    {isTermOpen && (
                      <div className="gridRow">
                        <ul className="topInfo">
                          <li className="col col-7" data-head="Subject">
                            <div className="">
                              <FormInput
                                type="text"
                                placeholder="Subject"
                                autoComplete="off"
                                name="classroom_classroomname"
                                onChange={handleTerms}
                                value={state.classroom_classroomname}
                                className={
                                  !state.classroom_classroomname &&
                                    (isSubmit || isSubjectSaved)
                                    ? "errorInput"
                                    : ""
                                }
                              />
                              {/* <FormError
                                  show={
                                    !state.classroom_classroomname &&
                                    (isSubmit || isSubjectSaved)
                                  }
                                  error="Subject Required."
                                /> */}
                            </div>
                          </li>
                          <li className="col col-2" data-head="Passing Marks">
                            <div className="">
                              <FormInput
                                type="number"
                                autoComplete="off"
                                name="passingMarks"
                                onChange={handleTerms}
                                value={state.passingMarks}
                                onWheel={(e) => e.target.blur()}
                                min={0}
                                className={
                                  !state.passingMarks &&
                                    (isSubmit || isSubjectSaved)
                                    ? "errorInput"
                                    : ""
                                }
                              />
                              {/* <FormError
                                  show={!state.passingMarks && (isSubmit || isSubjectSaved)}
                                  error="Passing Marks Required."
                                /> */}
                            </div>
                          </li>
                          <li className="col col-2" data-head="Total Marks">
                            <div className="">
                              <FormInput
                                type="number"
                                autoComplete="off"
                                name="totalMarks"
                                onChange={handleTerms}
                                value={state.totalMarks}
                                onWheel={(e) => e.target.blur()}
                                min={0}
                                className={
                                  !state.totalMarks &&
                                    (isSubmit || isSubjectSaved)
                                    ? "errorInput"
                                    : ""
                                }
                              />
                              {/* <FormError
                                  show={
                                    !state.totalMarks &&
                                    (isSubmit || isSubjectSaved)
                                  }
                                  error="Total Marks Required."
                                />  */}
                            </div>
                          </li>
                          <li className="col col-1 actionCols">
                            <div className="actionBtn ">
                              <button
                                className="btn-square"
                                title="Remove"
                                onClick={cancelNewTerm}
                              >
                                <span className="cssIcon">
                                  <i className="ed-cancel base"></i>
                                </span>
                              </button>
                              <button
                                className="btn-square"
                                title="Save"
                                onClick={createNewTerm}
                              >
                                <span className="cssIcon">
                                  <i className="ed-check primary"></i>
                                </span>
                              </button>
                            </div>
                          </li>
                        </ul>
                        <ul className="topInfo">
                          {(!state.totalMarks ||
                            !state.passingMarks ||
                            !state.classroom_classroomname) &&
                            (isSubmit || isSubjectSaved) ? (
                            <li className="col col-12 text-2xs red">
                              Required Fields can't be Blank.
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
              <div>
                <FormError
                  show={isSubmit && hasRepeatedClass()}
                  error="ClassName Should not be repeated."
                />
              </div>
              {course && (
                <div className="Add-More-Custom">
                  <button
                    type="button"
                    className="button btn-o-primary btn-sm primary"
                    onClick={addNewTerm}
                    disabled={isTermOpen ? true : false}
                  >
                    Add More Subjects
                  </button>
                </div>
              )}
            </div>

            {isSectionOpen && (
              <div className="Create-New-Section mt-40">
                {extraSection.length > 0 && isSectionOpen && (
                  <h5 className="text-sm w-300">Create New Section</h5>
                )}
                {extraSection.length > 0 &&
                  extraSection.map((item, key) => {
                    return (
                      <Card key={key} className="mt-20 cardPadding">
                        <CardBody>
                          <div className="Del-New-Section">
                            <button
                              type="button"
                              className="Del-New-Section-Btn white"
                              title="Remove"
                              onClick={(e) => handleDeleteSection(e, key)}
                            >
                              <i className="ed-trash"></i>
                            </button>
                          </div>
                          <div className="Create-Sec-Wrap">
                            <div className="formFieldwrap">
                              <FormInput
                                type="text"
                                label="Section Title"
                                placeholder="Section Title"
                                name="title"
                                onChange={(e) => handleChangeSection(e, key)}
                                value={item.title}
                                autoComplete="off"
                              />
                            </div>
                          </div>

                          {item.subject.map((subject, index) => {
                            return (
                              <div
                                key={index}
                                className="Extra-Subject-Title-Item"
                              >
                                <div className="formFieldwrap">
                                  <FormInput
                                    type="text"
                                    name="subject"
                                    label="Subject Name"
                                    placeholder="Subject Name"
                                    onChange={(e) =>
                                      handleChangeSection(e, index, key)
                                    }
                                    value={subject}
                                    autoComplete="off"
                                  />
                                </div>
                                {/* {isSubjectSaved && subjectKey !== index ? (
                                  <div className="actionBtn ">
                                    <button
                                      className="btn-square "
                                      title="Remove"
                                      onClick={(e) =>
                                        handleSubjectCancel(e, index, key)
                                      }
                                    >
                                      <span className="cssIcon">
                                        <i className="ed-trash red"></i>
                                      </span>
                                    </button>
                                  </div>
                                ) : (
                                  <> */}
                                <span
                                  type="button"
                                  // className="Action-Btn base"
                                  className="cssIcon"
                                  title="Remove"
                                  onClick={(e) =>
                                    handleSubjectCancel(e, index, key)
                                  }
                                >
                                  {/* <i className="Cancel-Icon"></i> */}
                                  <i className="ed-trash red"></i>
                                </span>
                                {/* <span
                                  type="button"
                                  className="Action-Btn primary"
                                  title="Save"
                                  onClick={(e) =>
                                    createSectionSubject(e, index)
                                  }
                                >
                                  <i className="Check-Icon"></i>
                                </span> */}
                                {/* </>
                                )} */}
                              </div>
                            );
                          })}
                          <button
                            type="button"
                            className="button btn-o-primary primary btn-sm"
                            onClick={(e) => handleAddExtaSubject(e, key)}
                          // disabled={isSubjectSaved ? false : true}
                          >
                            Add More
                          </button>
                        </CardBody>
                      </Card>
                    );
                  })}
              </div>
            )}
            {course && (
              <div className="Add-More-Custom">
                <button
                  type="button"
                  className="button btn-o-primary btn-sm primary"
                  onClick={handleAddExtraSection}
                >
                  Add Extra Section
                </button>
              </div>
            )}

            <button
              type="button"
              className="button btn-md button-theme mt-50"
              onClick={!isLoading && createTerm}
            >
              {!isLoading ? "Save Term" : "Loading"}
            </button>
          </form>
        </div>
      </React.Fragment>
    </React.Fragment>
  );
};

export default Terms;
