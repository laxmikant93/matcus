import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "./../Form/FormInput";
import UseOutsideClick from "./../UseOutsideClick";
import {
  addSelectedEntry,
  addSelectedEntrySwitch,
  AllEntrySelected,
  AllEntrySelectedSwitch,
  removeSelectedEntry,
  removeSelectedEntrySwitch,
  resetAllEntry,
  resetAllEntrySwitch,
} from "../../store/actions/MultiSelectDropDown";
import "./SelectSearch.scss";
import "./assignCourse.scss";
const AssignToTeachers = ({
  selectGroup,
  OnSelectedValue,
  SwitchSelectData,
}) => {
  const [DropRadioToggle, SetDropRadioToggle] = useState(false);
  let emptyDropDown = [];
  const {
    listSuccess,
    multiSelectDropdownData,
    multiSelectDropdownDataSwitch,
  } = useSelector((state) => {
    return {
      multiSelectDropdownData: state.multiselectdropdown.selectedData.data,
      multiSelectDropdownDataSwitch:
        state.multiselectdropdown.selectedDataSwitch.data,
      listSuccess: state.admincourse.getAssignedTeacherList.success,
    };
  });
  const mainCheckboxRef = useRef();
  const dispatch = useDispatch();
  const [selectedOptions, setSelectedOptions] = useState([emptyDropDown]);
  const DropRadioToggleRef = useRef();
  UseOutsideClick(DropRadioToggleRef, () => {
    if (DropRadioToggle) {
      SetDropRadioToggle(false);
      setSearchTeacher("");
    }
  });
  const [searchTeacher, setSearchTeacher] = useState("");
  const handleSearch = (e) => {
    setSearchTeacher(e.target.value);
  };
  const allData = () => {
    let data = [];
    for (let i = 0; i < selectGroup.length; i++) {
      selectGroup[i].user
        ? data.push(selectGroup[i].user)
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
      dispatch(AllEntrySelectedSwitch(arrayValidationsFill));

      dispatch(AllEntrySelected(arrayValidationsFill));
      setSelectedOptions(arrayValidationsFill);
      OnSelectedValue(arrayValidationsFill);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, listSuccess, selectGroup]);
  const AllSelectedCheckHandel = (e) => {
    const { checked } = e.target;

    if (checked) {
      if (SwitchSelectData) {
        dispatch(AllEntrySelectedSwitch(allData()));
        setSelectedOptions(allData());
        OnSelectedValue(allData());
      } else {
        dispatch(AllEntrySelected(allData()));
        setSelectedOptions(allData());
        OnSelectedValue(allData());
      }
    } else {
      if (SwitchSelectData) {
        dispatch(resetAllEntrySwitch());
        setSelectedOptions(emptyDropDown);
        OnSelectedValue(selectedOptions);
      } else {
        dispatch(resetAllEntry());
        setSelectedOptions(emptyDropDown);
        OnSelectedValue(selectedOptions);
      }
    }
  };
  const OptionSingleSelectCheckHandel = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      if (SwitchSelectData) {
        dispatch(addSelectedEntrySwitch(name));
        let data = multiSelectDropdownDataSwitch;
        data.push(name);
        OnSelectedValue(data);
        setSelectedOptions(data);
      } else {
        dispatch(addSelectedEntry(name));
        let data = multiSelectDropdownData;
        data.push(name);
        OnSelectedValue(data);
        setSelectedOptions(data);
      }
    } else {
      if (SwitchSelectData) {
        dispatch(removeSelectedEntrySwitch(name));
        let data = multiSelectDropdownDataSwitch;
        let index = data.indexOf(name);
        data.splice(index, 1);
        if (multiSelectDropdownDataSwitch.includes("All")) {
          dispatch(removeSelectedEntrySwitch("All"));
          let index = data.indexOf("All");
          data.splice(index, 1);
          //SetDropCheckToggle(true)
        }
        OnSelectedValue(data);
        setSelectedOptions(data);
      } else {
        dispatch(removeSelectedEntry(name));
        let data = multiSelectDropdownData;
        let index = data.indexOf(name);
        data.splice(index, 1);
        if (multiSelectDropdownData.includes("All")) {
          dispatch(removeSelectedEntry("All"));
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
      dispatch(AllEntrySelectedSwitch(allData()));
      setSelectedOptions(allData());
      OnSelectedValue(allData());
    } else {
      dispatch(AllEntrySelected(allData()));
      setSelectedOptions(allData());
      OnSelectedValue(allData());
    }
  };
  const deSelectAll = () => {
    activeNotActive();
    if (SwitchSelectData) {
      dispatch(resetAllEntrySwitch());
      setSelectedOptions(emptyDropDown);
      OnSelectedValue(selectedOptions);
    } else {
      dispatch(resetAllEntry());
      setSelectedOptions(emptyDropDown);
      OnSelectedValue(selectedOptions);
    }
  };
  useEffect(() => {
    return () => {
      dispatch(resetAllEntry());
      setSelectedOptions(emptyDropDown);
      OnSelectedValue(selectedOptions);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleTeacherDropdownToggle = () => {
    SetDropRadioToggle(!DropRadioToggle);
    setSearchTeacher("");
  };
  const [isActiveToggle, setIsActiveToggle] = useState(false);

  const activeNotActive = () => {
    setIsActiveToggle(!isActiveToggle);
  };
  return (
    <React.Fragment>
      <div className="assignToWrapperTeacher mb-10" ref={DropRadioToggleRef}>
        <div className="select_wrap">
          <ul
            className={`default_option ${DropRadioToggle ? "active" : ""}`}
            onClick={handleTeacherDropdownToggle}
          >
            <li>
              <div className="option">
                <p className="text-xs w-500">
                  {multiSelectDropdownData.length
                    ? multiSelectDropdownData.includes("All")
                      ? multiSelectDropdownData.length -
                      1 +
                      " Teachers Selected"
                      : multiSelectDropdownData.length + " Teachers Selected"
                    : "Assign to Teachers"}{" "}
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
                  placeholder="Search Teacher by name & email"
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
                {/* <>
                {SwitchSelectData ? (
                  <li className="option">
                    <label className="small">
                      <input
                        ref={mainCheckboxRef}
                        type="checkbox"
                        name="All"
                        onChange={AllSelectedCheckHandel}
                        defaultChecked={
                          multiSelectDropdownDataSwitch.length ===
                          selectGroup.length ||
                          multiSelectDropdownDataSwitch.includes("All")
                        }
                        checked={
                          multiSelectDropdownDataSwitch.length ===
                          selectGroup.length ||
                          multiSelectDropdownDataSwitch.includes("All")
                        }
                      />
                      All
                    </label>
                  </li>
                ) : (
                  <li className="option">
                    <label className="small">
                      <input
                        ref={mainCheckboxRef}
                        type="checkbox"
                        name="All"
                        onChange={AllSelectedCheckHandel}
                        defaultChecked={
                          multiSelectDropdownData.length ===
                          selectGroup.length ||
                          multiSelectDropdownData.includes("All")
                        }
                        checked={
                          multiSelectDropdownData.length ===
                          selectGroup.length ||
                          multiSelectDropdownData.includes("All")
                        }
                      />
                      All
                    </label>
                  </li>
                )}
              </> */}
                <>
                  {SwitchSelectData ? (
                    <>
                      {selectGroup && selectGroup.length > 0 ? (
                        selectGroup
                          .filter((teachers) => {
                            if (searchTeacher === "") {
                              return teachers;
                            } else {
                              return (
                                // teachers.user_fullname
                                //   ? teachers.user_fullname
                                (teachers.fullname &&
                                  teachers.fullname
                                    .toLowerCase()
                                    .includes(searchTeacher.toLowerCase())) ||
                                (teachers.email &&
                                  teachers.email
                                    .toLowerCase()
                                    .includes(searchTeacher.toLowerCase()))
                              );
                            }
                          })
                          .map((item) => {
                            return (
                              <li key={item.user} className="option">
                                <label className="small">
                                  {item.user_fullname}- {item.user_email}
                                  <input
                                    type="checkbox"
                                    name={item.user}
                                    onChange={OptionSingleSelectCheckHandel}
                                    defaultChecked={multiSelectDropdownDataSwitch.includes(
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
                        <li className="option">Loading</li>
                      )}
                    </>
                  ) : (
                    <>
                      {selectGroup && selectGroup.length > 0 ? (
                        selectGroup
                          .filter((teachers) => {
                            if (searchTeacher === "") {
                              return teachers;
                            } else {
                              return (
                                // teachers.user_fullname
                                //   ? teachers.user_fullname
                                (teachers.fullname &&
                                  teachers.fullname
                                    .toLowerCase()
                                    .includes(searchTeacher.toLowerCase())) ||
                                (teachers.email &&
                                  teachers.email
                                    .toLowerCase()
                                    .includes(searchTeacher.toLowerCase()))
                              );
                            }
                          })
                          .map((item) => {
                            return (
                              <li
                                key={item.user ? item.user : item._id}
                                className="option SearchListItemWrapper"
                              >
                                <label className="small">
                                  {item.user_fullname
                                    ? item.user_fullname
                                    : item.fullname}
                                  -{" "}
                                  {item.user_email
                                    ? item.user_email
                                    : item.email}
                                  <input
                                    type="checkbox"
                                    name={item.user ? item.user : item._id}
                                    onChange={OptionSingleSelectCheckHandel}
                                    defaultChecked={multiSelectDropdownData.includes(
                                      item.user || item._id
                                    )}
                                    checked={multiSelectDropdownData.includes(
                                      item.user || item._id
                                    )}
                                  />
                                </label>
                              </li>
                            );
                          })
                      ) : (
                        <li className="option">Loading</li>
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
export default AssignToTeachers;
