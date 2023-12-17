import React from "react";

function RecurringClassesButton({
  handleTypeOfClass,
  isOneTimeClassActive,
  getDateInMonth,
  isEditable,
}) {
  return (
    <div className="formFieldwrap Recurringradio mt-20 scroll-top-menu-wrap">
      <div className="inputradiorecurring">
        {!isEditable && (
          <React.Fragment>
            <div className="input-custom-type">
              <label
                onChange={handleTypeOfClass}
                className={isOneTimeClassActive ? "active" : ""}
              >
                <input
                  type="radio"
                  name="type-of-class"
                  onChange={handleTypeOfClass}
                  checked={isOneTimeClassActive ? true : false}
                />
                One Time Class
              </label>
            </div>
            <div className="input-custom-type" onClick={() => getDateInMonth()}>
              <label
                onChange={handleTypeOfClass}
                className={!isOneTimeClassActive ? "active" : ""}
              >
                <input
                  type="radio"
                  name="type-of-class"
                  defaultChecked={!isOneTimeClassActive ? true : false}
                />
                Recurring Classes
              </label>
            </div>
          </React.Fragment>
        )}
        {isEditable && isOneTimeClassActive ? (
          <div className="input-custom-type">
            <label className={isOneTimeClassActive ? "active" : ""}>
              <input
                type="radio"
                name="type-of-class"
                checked={isOneTimeClassActive ? true : false}
              />
              One Time Class
            </label>
          </div>
        ) : (
          isEditable && (
            <div className="input-custom-type">
              <label className={!isOneTimeClassActive ? "active" : ""}>
                <input
                  type="radio"
                  name="type-of-class"
                  defaultChecked={!isOneTimeClassActive ? true : false}
                />
                Recurring Classes
              </label>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default RecurringClassesButton;
