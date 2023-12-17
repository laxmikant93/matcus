import React from 'react';
const GroupOption = ({ active, Inputname, isChecked, handleInderminate, data, setActive, showGroupOption, lavel }) => {
  return (
    <React.Fragment>
      {
        showGroupOption ? (
          <li className="GroupOption" >
            <div className={`GroupOptLabelWrap AllCategory  ${active ? "" : ""} ${lavel === 'category' ? 'categoryPadding' : lavel === 'subcategory' ? 'subcatePadding' : ''} `}>
              <label className="small checkbox-padding">
                <input
                  type="checkbox"
                  name={Inputname}
                  checked={isChecked}
                  onChange={() => handleInderminate(data, isChecked)}
                />
              </label>
              <span
                className="GroupOptionLabel"
                title={Inputname}
                onClick={() => setActive(!active)}
              >
                {Inputname}
              </span>
            </div >
          </li >
        ) : (
          <React.Fragment>

            <label className="small">
              <input
                type="checkbox"
                name={Inputname}
                checked={isChecked}
                onChange={() => handleInderminate(data, isChecked)}
              />
            </label>
            <span
              className="GroupOptionLabel"
              title={Inputname}
              onClick={() => setActive(!active)}
            >
              {Inputname}
            </span>
          </React.Fragment>

        )
      }
    </React.Fragment>



  )
}
export default GroupOption