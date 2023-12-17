import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UseOutsideClick from "../../Common/UseOutsideClick";
import { setFilteredTeachers } from "../../store/actions/onlineClasses";
import "./Form.scss";
const MultipleSelectDropdown = ({
  SingleSelectCheckHandel,
  selectGroup,
  selectdTeachers,
  name,
}) => {
  const [DropRadioToggle, SetDropRadioToggle] = useState(false);
  const DropRadioToggleRef = useRef();
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(setFilteredTeachers(selectGroup));
  // }, [, dispatch]);

  UseOutsideClick(DropRadioToggleRef, () => {
    if (DropRadioToggle) SetDropRadioToggle(false);
  });

  const selectedTFilteredeacher = useSelector(
    (state) => state.onlineClasses.setFilteredTeachers
  );
  const selectedAssignmentTFilteredeacher = useSelector(
    (state) => state.assignment.setFilteredTeachers
  );

  // if(selectGroup.join('') === Array(selectGroup.length).fill(selectGroup[0]).join(''))
  const [isAllTrue, setIsAllTrue] = useState(false);

  useEffect(() => {
    JSON.stringify(selectGroup) === JSON.stringify(selectedTFilteredeacher)
      ? setIsAllTrue(true)
      : setIsAllTrue(false);
  }, [selectGroup, selectedTFilteredeacher]);



  // const [initiallyAllSelected, setInitiallyAllSelected] = useState(true);
  // const setInitiallyTrue = () => {
  //   selectedTFilteredeacher.includes(item) ||
  //     selectedAssignmentTFilteredeacher.includes(item);
  // };

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
            <li className="option">
              {/*  <input type="radio" id="a25" name="amount" onChange={(e) => SingleSelectHandel(e)} /> */}
              <label className="small">
                <input
                  type="checkbox"
                  name="All"
                  onChange={SingleSelectCheckHandel}
                  defaultChecked={
                    (selectedTFilteredeacher.length === 0 &&
                      selectedAssignmentTFilteredeacher.length === 0) ||
                      isAllTrue
                      ? true
                      : false
                  }
                />
                All
              </label>
            </li>
            <li className="Dropdown_divider"></li>
            {selectGroup &&
              selectGroup.length > 0 &&
              selectGroup.map((item) => {
                return (
                  <li key={item} className="option">
                    <label className="small">
                      <input
                        type="checkbox"
                        name={item}
                        onChange={SingleSelectCheckHandel}
                        // checked={}
                        defaultChecked={
                          selectedTFilteredeacher.includes(item) ||
                            selectedAssignmentTFilteredeacher.includes(item) ||
                            isAllTrue
                            ? true
                            : false
                        }
                      />
                      {item}
                    </label>
                  </li>
                );
              })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MultipleSelectDropdown;
