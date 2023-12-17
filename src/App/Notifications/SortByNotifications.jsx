import React from "react";

function SortByNotifications({setNotificationQuery,notificationQuery}) {
  const changeOrderBy=(e)=>{
   let inputValue=e.target.value;
    switch(inputValue){
      case "All":{
          // orderby:"", orderunread:""
           setNotificationQuery({
             ...notificationQuery,
             orderby:"new",
             orderunread:""
           })
         break;
      }
      case "Read":{
        setNotificationQuery({
          ...notificationQuery,
          orderunread:"Read" ,
          orderby:""    
        })
        break;
      }
      case "Unread":{
        setNotificationQuery({
          ...notificationQuery,
          orderunread:"Unread",
          orderby:""
        })
        break;
      }
      case "RTO":{
        setNotificationQuery({
          ...notificationQuery,
          orderby:"new",
          orderunread:""
        })
        break;
      }
      case "OTR":{
        setNotificationQuery({
          ...notificationQuery,
          orderby:"oldest",
          orderunread:""
        })
        break;
      }
      default:{
        // orderby:"", orderunread:""
         setNotificationQuery({
           ...notificationQuery,
           orderby:"new",
           orderunread:""
         })
       break;
    }
    }
  }
  return (
    <>
       <div className="SortByTableHeadCst">
      <select onChange={changeOrderBy}>
        <option value="All">All</option>
        <optgroup className="" label="Status">
          <option value="Read">Read</option>
          <option value="Unread">Unread</option>
        </optgroup>
        <optgroup className="" label="Time">
          <option value="RTO">Recent to Old</option>
          <option value="OTR">Old to Recent </option>
        </optgroup>
      </select>
    </div>
    </>
  );
}

export default SortByNotifications;
