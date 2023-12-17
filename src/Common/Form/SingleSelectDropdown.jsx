import React, { useState, useRef } from "react";
import { useEffect } from "react";
import UseOutsideClick from "../../Common/UseOutsideClick";
import "./Form.scss";
const SingleSelectDropdown = ({
  SingleSelectHandel,
  selectGroup,
  SelectWidth,
  filterValues,
  SingleSelectLabelName,
  dontShowAll,
  changeList,
  resetState
}) => {
  const [DropRadioToggle, SetDropRadioToggle] = useState(false);
  const DropRadioToggleRef = useRef();

  UseOutsideClick(DropRadioToggleRef, () => {
    if (DropRadioToggle) SetDropRadioToggle(false);
  });

  // console.log("reset",resetState)
  useEffect(()=>{
    if(resetState){
      // console.log("reset1",resetState)
      SelectedValue("All")
      SetDropRadioToggle(false)
    }

  },[resetState])

  // const selectGroup = [
  //   "Created On",
  //   "Recent to Old",
  //   "Old to Recent",
  //   "Duration",
  //   "High to Low",
  //   "Low to High",
  //   "Meeting On",
  //   "zoom",
  //   "Goole Meet",
  //   "Attendees",
  //   "High to Low",
  //   "Low to High",
  // ];
  const [selectedName, setSelectedName] = useState("");
  const SelectedValue = (item) => {
    SingleSelectHandel(item);
    setSelectedName(item);
    SetDropRadioToggle(!DropRadioToggle);
  };

  useEffect(() => {
    setSelectedName("")
  }, [changeList])

  // const handleReset = () => {
  //   SelectedValue("All")
  // }

  return (
    <div className="wrapper" ref={DropRadioToggleRef}>
      <div className={`select_wrap ${SelectWidth}`}>
        {/* <div
          className={`caret-dropdown ${DropRadioToggle ? "active" : ""}`}
        ></div> */}

        <ul
          className={`default_option ${DropRadioToggle ? "active" : ""}`}
          onClick={() => SetDropRadioToggle(!DropRadioToggle)}
        >
          <li>
            <div className="option">
              <p className="text-xxs w-500">
                {selectedName
                  ? selectedName.replace(/[0-9]/g, "")
                  : SingleSelectLabelName
                    ? SingleSelectLabelName
                    : "Sort By"}
              </p>
            </div>
          </li>
        </ul>
        {DropRadioToggle && (
          <ul className="select_ul">
            {dontShowAll === true ? ("") :
              (<li className="option" onClick={() => SelectedValue("All")}>
                <label htmlFor="a25">All</label>
              </li>
              )
            }

            <li className="Dropdown_divider"></li>
            <li className="option OptHead">
              {/* <label>rajes-kumar</label> */}
            </li>

            <React.Fragment>
              {selectGroup &&
                selectGroup.map((item, key) => {
                  return (
                    <React.Fragment key={item}>
                      {filterValues.includes(item) && (
                        <li className="option OptHead">
                          <label>{item.replace(/[0-9]/g, "")}</label>
                        </li>
                      )}
                      {filterValues && !filterValues.includes(item) && (
                        <li
                          className={`option ${selectedName === item && "active"
                            }`}
                          onClick={() => SelectedValue(item)}
                          value={key}
                        >
                          <input type="radio" id="a25" name="amount" />
                          <label htmlFor="a25">
                            {item.replace(/[0-9]/g, "")}
                          </label>
                        </li>
                      )}
                    </React.Fragment>
                  );
                })}
            </React.Fragment>
          </ul>
        )}
      </div>
    </div >
  );
};

export default SingleSelectDropdown;

/* <li className="option">
  <input type="radio" id="a25" name="amount" />
  <label for="a25">Teacher</label>
</li>
<li className="option">
  <input type="radio" id="a25" name="amount" />
  <label for="a25">Teacher</label>
</li>
<li className="option">
  <input type="radio" id="a25" name="amount" />
  <label for="a25">Teacher</label>
</li>
<li className="option">
  <input type="radio" id="a25" name="amount" />
  <label for="a25">Teacher</label>
</li> */
