import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "./../Form/FormInput";

import NoDataAvailable from "../../Common/NoDataAvailable";
import UseOutsideClick from "./../UseOutsideClick";
import DummyProfile from "./DummyProfile.png";
import "./SelectSearch.scss";
import "./assignCourse.scss";
import {
  addSelectedEntryStudents,
  addSelectedEntrySwitchStudents,
  AllEntrySelectedStudents,
  AllEntrySelectedSwitchStudents,
  removeSelectedEntryStudents,
  removeSelectedEntrySwitchStudents,
  resetAllEntryStudents,
  resetAllEntrySwitchStudents,
} from "../../store/actions/MultiSelectDropDown";
import ImageViewer from "../ImageViewer";
const AssignToStudents = ({
  selectGroup,
  OnSelectedValue,
  SwitchSelectData,
  selectedStudent,
  editData,
  createData,
  onlineExam
}) => {
  const [DropRadioToggle, SetDropRadioToggle] = useState(false);
  const [isActiveToggle, setIsActiveToggle] = useState(false);

  const activeNotActive = () => {
    setIsActiveToggle(!isActiveToggle);
  };

  let emptyDropDown = [];
  const {
    multiSelectDropdownData,
    multiSelectDropdownDataSwitch,
    listSuccess,
  } = useSelector((state) => {
    return {
      multiSelectDropdownData:
        state.multiselectdropdown.selectedDataStudents.data,
      multiSelectDropdownDataSwitch:
        state.multiselectdropdown.selectedDataSwitchStudents.data,
      listSuccess: state.admincourse.getAssignedTeacherList.success,
    };
  });
  const mainCheckboxRef = useRef();
  const dispatch = useDispatch();
  const [selectedOptions, setSelectedOptions] = useState([emptyDropDown]);
  const DropRadioToggleRef = useRef();
  UseOutsideClick(DropRadioToggleRef, () => {
    if (DropRadioToggle) {
      setSearchStudents("");
      SetDropRadioToggle(false);
    }
  });
  const [searchStudents, setSearchStudents] = useState("");
  const handleSearch = (e) => {
    setSearchStudents(e.target.value);
  };
  const allData = () => {
    let data = [];
    for (let i = 0; i < selectGroup.length; i++) {
      let element = selectGroup[i];
      element.user
        ? data.push(selectGroup[i].user._id)
        : data.push(selectGroup[i]._id);
    }
    data.push("All");
    return data;
  };
  useEffect(() => {
    if (listSuccess) {
      let arrayValidationsFill = [];
      for (let index = 0; index < selectGroup.length; index++) {
        const element = selectGroup[index];
        if (element.isAssigned === "yes") {
          arrayValidationsFill.push(element.user);
        }
      }
      dispatch(AllEntrySelectedSwitchStudents(arrayValidationsFill));

      dispatch(AllEntrySelectedStudents(arrayValidationsFill));
      setSelectedOptions(arrayValidationsFill);
      OnSelectedValue(arrayValidationsFill);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, listSuccess, selectGroup]);

  useEffect(() => {
    if (selectedStudent) {
      let filteredData = [];
      selectGroup.forEach((element) => {
        selectedStudent.forEach((student) => {
          if (element.user._id === student) {
            filteredData.push(student);
          }
        });
      });
      dispatch(AllEntrySelectedSwitchStudents(filteredData));
      dispatch(AllEntrySelectedStudents(filteredData));
      setSelectedOptions(filteredData);
      OnSelectedValue(filteredData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectGroup, selectedStudent]);

  useEffect(() => {
    if (editData) {
      let arrayValidationsFill = [];
      for (let index = 0; index < selectGroup.length; index++) {
        const element = selectGroup[index];
        if (element.isAssigned === "yes") {
          arrayValidationsFill.push(element.user);
        }
      }
      dispatch(AllEntrySelectedSwitchStudents(arrayValidationsFill));

      dispatch(AllEntrySelectedStudents(arrayValidationsFill));
      setSelectedOptions(arrayValidationsFill);
      OnSelectedValue(arrayValidationsFill);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const OptionSingleSelectCheckHandel = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      if (SwitchSelectData) {
        dispatch(addSelectedEntrySwitchStudents(name));
        let data = multiSelectDropdownDataSwitch;
        data.push(name);
        OnSelectedValue(data);
        setSelectedOptions(data);
      } else {
        dispatch(addSelectedEntryStudents(name));
        let data = multiSelectDropdownData;
        data.push(name);
        OnSelectedValue(data);
        setSelectedOptions(data);
      }
    } else {
      if (SwitchSelectData) {
        dispatch(removeSelectedEntrySwitchStudents(name));
        let data = multiSelectDropdownDataSwitch;
        let index = data.indexOf(name);
        data.splice(index, 1);
        if (multiSelectDropdownDataSwitch.includes("All")) {
          dispatch(removeSelectedEntrySwitchStudents("All"));
          let index = data.indexOf("All");
          data.splice(index, 1);
          //SetDropCheckToggle(true)
        }
        OnSelectedValue(data);
        setSelectedOptions(data);
      } else {
        dispatch(removeSelectedEntryStudents(name));
        let data = multiSelectDropdownData;
        let index = data.indexOf(name);
        data.splice(index, 1);
        if (multiSelectDropdownData.includes("All")) {
          dispatch(removeSelectedEntryStudents("All"));
          let index = data.indexOf("All");
          data.splice(index, 1);
        }
        OnSelectedValue(data);
        setSelectedOptions(data);
      }
    }
  };

  useEffect(() => {
    if (
      selectedOptions.length !== selectGroup.length &&
      selectedOptions.length > 0 &&
      selectedOptions.length < selectGroup.length
    ) {
      if (mainCheckboxRef.current) {
        let indeterminate = selectedOptions.length > 0;
        mainCheckboxRef.current.indeterminate = true;
        if (indeterminate) {
          // mainCheckboxRef.current.nextSibling.classList.add("CheckDash");
        } else {
          // mainCheckboxRef.current.nextSibling.classList.remove("CheckDash");
        }
      }
    } else {
      if (mainCheckboxRef.current) {
        mainCheckboxRef.current.indeterminate = false;
        // mainCheckboxRef.current.nextSibling.classList.remove("CheckDash");
      }
    }
  }, [selectedOptions, selectedOptions.length, selectGroup.length]);

  const selectAll = () => {
    activeNotActive();
    if (SwitchSelectData) {
      dispatch(AllEntrySelectedSwitchStudents(allData()));
      setSelectedOptions(allData());
      OnSelectedValue(allData());
    } else {
      dispatch(AllEntrySelectedStudents(allData()));
      setSelectedOptions(allData());
      OnSelectedValue(allData());
    }
  };
  const deSelectAll = () => {
    activeNotActive();
    if (SwitchSelectData) {
      dispatch(resetAllEntrySwitchStudents());
      setSelectedOptions([]);
      OnSelectedValue([]);
    } else {
      dispatch(resetAllEntryStudents());
      setSelectedOptions([]);
      OnSelectedValue([]);
    }
  };
  useEffect(() => {
    return () => {
      dispatch(resetAllEntryStudents());
      setSelectedOptions(emptyDropDown);
      OnSelectedValue(selectedOptions);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleStudentsDropdownToggle = () => {
    SetDropRadioToggle(!DropRadioToggle);
    setSearchStudents("");
  };
  useEffect(() => {
    if (createData && selectGroup.length) {
      selectAll();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createData]);

  return (
    <React.Fragment>
      <div className="assignToWrapperStudent mb-10" ref={DropRadioToggleRef}>
        <div className="select_wrap">
          <ul
            className={`default_option ${DropRadioToggle ? "active" : ""}`}
            onClick={handleStudentsDropdownToggle}
          >
            <li>
              <div className="option">
                <p className="text-xs w-500">
                  {multiSelectDropdownData.length
                    ? multiSelectDropdownData.includes("All")
                      ? multiSelectDropdownData.length -
                      1 +
                      " Students Selected"
                      : multiSelectDropdownData.length + " Students Selected"
                    : "Assign to Students"}{" "}
                </p>
                {/* <p>{name}</p> */}
              </div>
            </li>
          </ul>
          {DropRadioToggle && (
            <React.Fragment>
              <ul className="select_ul">
                <FormInput
                  type="search"
                  className="form-control-search"
                  id="search"
                  onKeyUp={handleSearch}
                  onChange={handleSearch}
                  name="search"
                  placeholder="Search Students by name & email"
                />
                <div className="selectSectionCustom">
                  <button
                    onClick={selectAll}
                    className={`btnText underline text-2xs w-600 ${isActiveToggle ? "primary" : "base"
                      }`}
                  >
                    Select All
                  </button>
                  <button
                    onClick={deSelectAll}
                    className={`btnText underline text-2xs w-600  ${isActiveToggle ? "primary" : "base"
                      }`}
                  >
                    Deselect All
                  </button>
                </div>
                <></>
                <>
                  {SwitchSelectData ? (
                    <>
                      {selectGroup && selectGroup.length > 0 ? (
                        selectGroup
                          .filter((students) => {
                            return students.fullname
                              ? students.fullname
                              : students.user.fullname
                                .toLowerCase()
                                .includes(
                                  searchStudents &&
                                  searchStudents.toLowerCase()
                                ) ||
                              (students.email
                                ? students.email
                                : students.user.email
                                  .toLowerCase()
                                  .includes(
                                    searchStudents.toLowerCase()
                                  ));
                            // teachers.user_email
                            // ? teachers.user_email
                            // : teachers.email
                            //   .toLowerCase()
                            //   .includes(searchTeacher && searchTeacher.toLowerCase())
                          })
                          .map((item) => {
                            return (
                              <li key={item.user} className="option">
                                <label className="small">
                                  {item.user.fullname}- {item.user.email}
                                  <input
                                    type="checkbox"
                                    name={item.user}
                                    onChange={OptionSingleSelectCheckHandel}
                                    defaultChecked={
                                      multiSelectDropdownDataSwitch.includes(
                                        item.user
                                      )}
                                    checked={multiSelectDropdownDataSwitch.includes(
                                      item.user
                                    )}
                                  />
                                </label>
                              </li>
                            );
                          })
                      ) : (
                        <NoDataAvailable title="No Records Found." />
                      )}
                    </>
                  ) : (
                    <>
                      {selectGroup && selectGroup.length > 0 ? (
                        selectGroup
                          .filter((students) => {
                            if (searchStudents === "") {
                              return students;
                            } else {
                              return (
                                // teachers.user_fullname
                                //   ? teachers.user_fullname
                                (students.fullname &&
                                  students.fullname
                                    .toLowerCase()
                                    .includes(searchStudents.toLowerCase())) ||
                                (students.email &&
                                  students.email
                                    .toLowerCase()
                                    .includes(searchStudents.toLowerCase()))
                              );
                            }
                          })
                          .map((item) => {
                            return (
                              <li
                                key={item.user ? item.user : item._id}
                                className="option SearchListItemWrapper"
                              >
                                <label className="small SearchListItem SpecificAttendsListOnlineEx ">
                                  <div className="SearchListImage">
                                    <ImageViewer
                                      alt="selectedImage"
                                      object={
                                        item.user.profile_picture
                                      }
                                      defaultImage={DummyProfile}
                                    />
                                  </div>
                                  <div>
                                    <h3 className="text-xxs base w-400 ">
                                      {item.user.fullname
                                        ? item.user.fullname
                                        : item.fullname}
                                    </h3>
                                    <p>
                                      {item.user.email
                                        ? item.user.email
                                        : item.email}
                                    </p>
                                    <p>{`Admission Number ${item.admission_no ? item.admission_no : ""
                                      }`}</p>
                                  </div>
                                  <input
                                    type="checkbox"
                                    name={onlineExam ? item.user._id :
                                      item.user ? item.user : item._id}
                                    onChange={OptionSingleSelectCheckHandel}
                                    defaultChecked={multiSelectDropdownData.includes(
                                      onlineExam ? item.user._id :
                                        item.user ? item.user : item._id
                                    )}
                                    checked={multiSelectDropdownData.includes(
                                      onlineExam ? item.user._id :
                                        item.user ? item.user : item._id
                                    )}
                                  />
                                </label>
                                {/* <img src={item.profile_picture} alt="" /> */}
                              </li>
                            );
                          })
                      ) : (
                        <li className="option">No records</li>
                      )}
                    </>
                  )}
                </>
              </ul>
            </React.Fragment>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};
export default AssignToStudents;
