import moment from "moment";

export function getDanamicCalenderDate(date) {
  let day;
  let year;
  let month;
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let dd;
  let dates = [];
  if (date.newDate) {
    day = new Date(date.newDate).getDay();
    year = moment(date.newDate).format("yyyy");
    month = moment(date.newDate).format("M");
    dd = new Date(year, month, 0).getDate();
  }
  else {
    day = new Date(date).getDay()
    year = moment(date.newDate).format("yyyy");
    month = moment(date.newDate).format("M");
    dd = new Date(year, month, 0).getDate();
  }
  for (let i = 1; i <= dd; i++) {
    let d = new Date(`${year}-${month}-${i}`);
    d.setHours(d.getHours() + 5);
    d.setMinutes(d.getMinutes() + 30);
    dates.push({ day: days[day], date: i, fullDate: d });
    if (day === 6 || day === "6") {
      day = 0;
    } else {
      day = day + 1;
    }
  }
  return { newDate: date.newDate, Dates: dates };
}

export function changedatavalue(value, date) {
  let year = moment(date).format("yyyy");
  let month = moment(date).format("M");
  let newDate;
  if (value === "plus") {
    if (month !== "12") {
      newDate = new Date(year, parseInt(month), "01");
    } else {
      newDate = new Date(parseInt(year), parseInt("12"), "01")
    }
    return { newDate: newDate }
  } else if (value === "minus") {
    if (parseInt(month) === 1) {
      newDate = new Date(parseInt(year) - 1, parseInt("11"), "01");
    } else {
      newDate = new Date(year, parseInt(month) - 2, "01");
    }
    return { month: month, newDate: newDate }
  }
}

export const changeYearFilterValue = (value,date)=>{
  let newDate;
  if(value==="plus"){
    newDate = moment(date).add(1,'year').format()
    let firstDateOfYear = new Date(date.getFullYear(), 0, 1);
    return {newDate:new Date(newDate),firstDateOfYear:new Date(firstDateOfYear)}
  }else if(value==="minus"){
    newDate = moment(date).subtract(1,'year').format()
    let firstDateOfYear = new Date(date.getFullYear(), 0, 1);
    return {newDate:new Date(newDate),firstDateOfYear:new Date(firstDateOfYear)}
  }
}

export function AttendanceStartTimeValidation(data, time, key) {
  //validation for previous attendance times
  if (data.length > 0 && data) {
    let Date1 = new Date(time).getTime();
    let start;
    let end;
    for (let i = 0; i < data.length; i++) {
      start = new Date(data[i].startTime).getTime();
      end = new Date(data[i].endTime).getTime();
      if (key !== i) {
        if (Date1 < end && Date1 > start) {
          return false;
        }
      }
      if (i === data.length - 1) {
        return true
      }
    }
  }
}


export function AttendanceEndTimeValidation(data, time, key) {
  //validation for previous attendance times
  if (data.length > 0 && data) {
    let Date1 = new Date(time).getTime();
    let start;
    let end;
    for (let i = 0; i < data.length; i++) {
      start = new Date(data[i].startTime).getTime();
      end = new Date(data[i].endTime).getTime();
      if (key !== i) {
        if (Date1 < end && Date1 > start) {
          return false;
        }
      }
      if (i === data.length - 1) {
        return true
      }
    }
  }
}

