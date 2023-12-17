import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import FormError from "../../../../../Common/Form/FormError";
import SearchIcon from "../icon-search.svg";
import { setSelectedStudentData } from "../../../../../store/actions/onlineClasses";
import "./ClassroomOnlineClass.scss";

function StudentAssignTo({
  studentList,
  selectedStudent,
  handleSearchStudents,
  isValid,
  isSearchStudent,
  searchWords,
}) {
  const [selectedStudentsFromList, setSelectedStudentsFromList] = useState([]);
  useEffect(() => {
    setSelectedStudentsFromList(studentList);
  }, [studentList]);

  const dispatch = useDispatch();
  const [filterStudentId, setFilterStudentId] = useState("");
  const handleSelectStudent = (e) => {
    let name = e.target.name;
    let isChecked = e.target.checked;
    let singleCodeObj = {
      ...filterStudentId,
      [name]: isChecked,
    };

    setFilterStudentId({ ...filterStudentId, ...singleCodeObj });
    const asArray = Object.entries(singleCodeObj);
    const filteredCode = asArray.filter(([key, value]) => value !== false);
    let convertObj = Object.fromEntries(filteredCode);
    let getSelectedName = Object.keys(convertObj);
    let studentsData = [];
    for (let i = 0; i < getSelectedName.length; i++) {
      for (let j in studentList) {
        if (getSelectedName[i] === studentList[j]._id) {
          studentsData.push(studentList[j]);
        }
      }
    }
    setSelectedStudentsFromList(studentsData);
  };

  useEffect(() => {
    dispatch(setSelectedStudentData(selectedStudentsFromList));
  }, [dispatch, selectedStudentsFromList]);


  return (
    <React.Fragment>
      <div
        className="AssignTofullWidth"
      >
        <h1 className="text-xs base w-500 mb-10">Assign to Student</h1>

        <div className="formFieldwrap">
          <div className="cstmSelectWrap ">
            <input
              type="search"
              className="form-control form-control-search assignstudensreachinput"
              id="search"
              name="search"
              placeholder="Search Student"
              autoComplete="off"
              onChange={handleSearchStudents}
            />
            <span className="assigntostudensearchinput">
              <img src={SearchIcon} alt="data" />
            </span>
          </div>
          <FormError
            show={!isValid}
            error=" Please Select Course and Classroom first."
          />
          {selectedStudent.length > 0 && (
            <div className="searchResultAction">
              <p className="text-xxs primary mt-5">
                {selectedStudent.length > 0 &&
                  `${selectedStudent.length} selected`}
              </p>
              <div className="searchResultGroupAction">
                <button
                  type="button"
                  className="btnText underline groupActionBtn"
                >
                  Select All
                </button>
                <button
                  type="button"
                  className="btnText underline groupActionBtn"
                >
                  Deselect All
                </button>
              </div>
            </div>
          )}
          {isSearchStudent &&
            (studentList.length > 0 ? (
              <div className="AssignStudentSearchLiest text-xxs">
                <div className="SearchListWrapper">
                  {studentList
                    .filter((element) =>
                      element.fullname
                        .toLowerCase()
                        .includes(searchWords.toLowerCase())
                    )
                    .map((element) => {
                      return (
                        <div className="SearchListItem" key={element._id}>
                          <div className="SearchListItemContent">
                            <span className="text-xs">{element.fullname}</span>
                            <span className="text-xxs mgray">
                              {element.email}
                            </span>
                          </div>
                          <div className="SearchListItemInputAction">
                            <label className="small">
                              <input
                                type="checkbox"
                                name={element._id}
                                onChange={(e) =>
                                  handleSelectStudent(e, element)
                                }
                                checked={
                                  selectedStudentsFromList.find(
                                    (item) => item._id === element._id
                                  )
                                    ? true
                                    : false
                                }
                              />
                            </label>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            ) : (
              <li>Loading...</li>
            ))}
        </div>
      </div>
    </React.Fragment>
  );
}

export default StudentAssignTo;
