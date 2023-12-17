import React from "react";
import SingleSelectDropdown from "../../Common/Form/SingleSelectDropdown";
// import { SearchIcon } from "../../Common/Icon";
import SearchControl from "../../Common/SearchControl";
// import SortByNotifications from "./SortByNotifications";
function SearchNotifications({ setNotificationQuery, notificationQuery }) {
  let typing;

  const searchNotify = (e) => {
    let inputValue = e.target.value.trim();
    let inputName = e.target.name;
    clearTimeout(typing);
    typing = setTimeout(() => {
      setNotificationQuery({
        ...notificationQuery,
        [inputName]: inputValue,
      });
    }, 500);
  };
  const selectGroup = [
    "All",
    "Status",
    "Read",
    "Unread",
    "Time",
    "Recent to Old",
    "Old To Recent",
  ];

  const filterValues = ["Status", "Time"];

  const changeOrderBy = (inputValue) => {
    //  let inputValue=e.target.value;
    switch (inputValue) {
      case "All": {
        // orderby:"", orderunread:""
        setNotificationQuery({
          ...notificationQuery,
          orderby: "new",
          orderunread: "",
        });
        break;
      }
      case "Read": {
        setNotificationQuery({
          ...notificationQuery,
          orderunread: "Read",
          orderby: "",
        });
        break;
      }
      case "Unread": {
        setNotificationQuery({
          ...notificationQuery,
          orderunread: "Unread",
          orderby: "",
        });
        break;
      }
      case "Recent to Old": {
        setNotificationQuery({
          ...notificationQuery,
          orderby: "new",
          orderunread: "",
        });
        break;
      }
      case "Old To Recent": {
        setNotificationQuery({
          ...notificationQuery,
          orderby: "oldest",
          orderunread: "",
        });
        break;
      }
      default: {
        // orderby:"", orderunread:""
        setNotificationQuery({
          ...notificationQuery,
          orderby: "new",
          orderunread: "",
        });
        break;
      }
    }
  };
  return (
    <>
      <div className="P-Right right_searchshortfiled">
        <SearchControl
          classNameWrappper="tableSearchbar"
          id="search"
          name="search"
          onChange={searchNotify}
          placeholder="Search Notifications"
        />
        <SingleSelectDropdown
          selectGroup={selectGroup}
          filterValues={filterValues}
          SingleSelectHandel={(item) => changeOrderBy(item)}
        />
      </div>
    </>
  );
}

export default SearchNotifications;
