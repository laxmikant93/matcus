import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UseOutsideClick from "../../Common/UseOutsideClick";
import {
  AllEntrySelected,
  resetAllEntry,
  addSelectedEntry,
  removeSelectedEntry,
  AllEntrySelectedSwitch,
  resetAllEntrySwitch,
  addSelectedEntrySwitch,
  removeSelectedEntrySwitch,
} from "../../store/actions/MultiSelectDropDown";
import "./Form.scss";
const MultipleSelectDropDownCommon = ({
  OnSelectedValue,
  selectGroup,
  name,
  CourseSwitch,
  SwitchSelectData,
}) => {
  const mainCheckboxRef = useRef();
  const dispatch = useDispatch();
  const { multiSelectDropdownData, multiSelectDropdownDataSwitch } =
    useSelector((state) => {
      return {
        multiSelectDropdownData: state.multiselectdropdown.selectedData.data,
        multiSelectDropdownDataSwitch:
          state.multiselectdropdown.selectedDataSwitch.data,
      };
    });

  let emptyDropDown = [];

  const [selectedOptions, setSelectedOptions] = useState([emptyDropDown]);

  const [DropRadioToggle, SetDropRadioToggle] = useState(false);
  // const [DropCheckToggle, SetDropCheckToggle] = useState(false);
  const DropRadioToggleRef = useRef();

  UseOutsideClick(DropRadioToggleRef, () => {
    if (DropRadioToggle) SetDropRadioToggle(false);
  });

  const AllDataCourse = () => {
    let data = [];
    for (let i = 0; i < selectGroup.length; i++) {
      data.push(selectGroup[i]._id);
    }
    data.push("All");
    return data;
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

  const AllSelectCheckCourseHandel = (e) => {
    const { checked } = e.target;
    if (checked) {
      dispatch(AllEntrySelected(AllDataCourse()));
      setSelectedOptions(AllDataCourse());
      OnSelectedValue(AllDataCourse());
    } else {
      dispatch(resetAllEntry());
      setSelectedOptions(emptyDropDown);
      OnSelectedValue(selectedOptions);
    }
  };

  const OptionSelectCheckCourseHandel = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      dispatch(addSelectedEntry(name));
      let data = multiSelectDropdownData;
      data.push(name);
      OnSelectedValue(data);
      setSelectedOptions(data);
    } else {
      let data = multiSelectDropdownData;
      let index = data.indexOf(name);
      data.splice(index, 1);

      dispatch(removeSelectedEntry(name));
      if (multiSelectDropdownData.includes("All")) {
        dispatch(removeSelectedEntry("All"));
        let index = data.indexOf("All");
        data.splice(index, 1);
      }
      OnSelectedValue(data);
      setSelectedOptions(data);
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
  return (
    <div className="wrapper" ref={DropRadioToggleRef}>
      <div className="select_wrap">
        {/* <div
          className={`caret-dropdown ${DropRadioToggle ? "active" : ""}`}
        ></div> */}
        <ul
          className={`default_option ${DropRadioToggle ? "active" : ""}`}
          onClick={() => SetDropRadioToggle(!DropRadioToggle)}
        >
          <li>
            <div className="option">
              <p className="text-xxs w-500">{name ? name : "Sort By"} </p>
            </div>
          </li>
        </ul>
        {DropRadioToggle && (
          <ul className="select_ul">
            {CourseSwitch ? (
              <li className="option">
                <label className="small">
                  <input
                    ref={mainCheckboxRef}
                    type="checkbox"
                    name="All"
                    onChange={AllSelectCheckCourseHandel}
                    defaultChecked={
                      multiSelectDropdownData.includes("All") ||
                      multiSelectDropdownData.length === selectGroup.length
                    }
                    checked={
                      multiSelectDropdownData.includes("All") ||
                      multiSelectDropdownData.length === selectGroup.length
                    }
                  />
                  All
                </label>
              </li>
            ) : (
              <>
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
              </>
            )}

            <li className="Dropdown_divider"></li>
            {CourseSwitch ? (
              <>
                {selectGroup && selectGroup.length > 0 ? (
                  selectGroup.map((item) => {
                    return (
                      <li key={item._id} className="option">
                        <label className="small" title={item.coursename}>
                          <input
                            type="checkbox"
                            name={item._id}
                            onChange={OptionSelectCheckCourseHandel}
                            defaultChecked={multiSelectDropdownData.includes(
                              item._id
                            )}
                            checked={multiSelectDropdownData.includes(item._id)}
                          />
                          {item.coursename}
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
                {SwitchSelectData ? (
                  <>
                    {selectGroup && selectGroup.length > 0 ? (
                      selectGroup.map((item) => {
                        return (
                          <li key={item.user} className="option">
                            <label className="small">
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
                              {item.user_fullname}- {item.user_email}
                            </label>
                          </li>
                        );
                      })
                    ) : (
                      <li className="option">No records</li>
                    )}
                  </>
                ) : (
                  <>
                    {selectGroup && selectGroup.length > 0 ? (
                      selectGroup.map((item) => {
                        return (
                          <li
                            key={item.user ? item.user : item._id}
                            className="option"
                          >
                            <label className="small">
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
                              <span>
                                {item.user_fullname
                                  ? item.user_fullname
                                  : item.fullname}
                                -{" "}
                                {item.user_email ? item.user_email : item.email}
                              </span>
                            </label>
                          </li>
                        );
                      })
                    ) : (
                      <li className="option">No records</li>
                    )}
                  </>
                )}
              </>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MultipleSelectDropDownCommon;
