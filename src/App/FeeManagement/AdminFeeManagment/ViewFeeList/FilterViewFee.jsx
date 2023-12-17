/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import InputDatePicker from "../../../../Common/Form/InputDatePicker";
import SingleSelectDropdown from "../../../../Common/Form/SingleSelectDropdown";
import SearchControl from "../../../../Common/SearchControl";

function FilterViewFee({
  handleSearch,
  handleChange,
  startDate,
  handleDateFilter,
  reset
}) {
  const selectGroup = ["Paid", "Pending"];
  const filterValues = [];
  return (
    <div className="PageTopHead PTH-filter-view-fee mt-20">
      <div className="PTH-Item">
        <SingleSelectDropdown
          SingleSelectLabelName="Sort by status"
          selectGroup={selectGroup}
          SingleSelectHandel={handleChange}
          filterValues={filterValues}
        />
      </div>
      <div className="PTH-Item">
        <div className="datePickerWrap">
          <InputDatePicker
            selected={startDate}
            onChange={handleDateFilter}
            showMonthYearPicker
            showFullMonthYearPicker
            dateFormat="MMMM yyyy"
          />
        </div>
      </div>
      <div className="PTH-Item P-Right">
        <SearchControl
          classNameWrappper="tableSearchbar"
          id="search"
          name="search_fee_students"
          onChange={handleSearch}
          placeholder="Student search"
          reset={reset}
        />
      </div>
    </div>
  );
}

export default FilterViewFee;
