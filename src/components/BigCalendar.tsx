"use client";
import React, { useState } from "react";
import { Calendar, momentLocalizer, Views, View } from "react-big-calendar";
import moment from "moment";
import { calendarEvents } from "../libs/data";
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = momentLocalizer(moment);
const BigCalendar = () => {
  const [view, setView] = useState<View>(Views.WORK_WEEK);
  const handleChangeView = (selectedView: View) => {
    setView(selectedView);
  };
  return (
    <Calendar
      localizer={localizer}
      events={calendarEvents}
      onView={handleChangeView}
      startAccessor="start"
      views={["work_week", "day"]}
      view={view}
      endAccessor="end"
      style={{ height: "98%" }}
      min={new Date(2025, 1, 0, 7, 0, 0)}
      max={new Date(2025, 1, 0, 17, 0, 0)}
    />
  );
};

export default BigCalendar;

// "use client";

// import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
// import moment from "moment";
// import { calendarEvents } from "../libs/data";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import { useState } from "react";

// const localizer = momentLocalizer(moment);

// const BigCalendar = () => {
//   const [view, setView] = useState<View>(Views.WORK_WEEK);

//   const handleOnChangeView = (selectedView: View) => {
//     setView(selectedView);
//   };

//   return (
//     <Calendar
//       localizer={localizer}
//       events={calendarEvents}
//       startAccessor="start"
//       endAccessor="end"
//       views={["work_week", "day"]}
//       view={view}
//       style={{ height: "98%" }}
//       onView={handleOnChangeView}
//       min={new Date(2025, 1, 0, 8, 0, 0)}
//       max={new Date(2025, 1, 0, 17, 0, 0)}
//     />
//   );
// };

// export default BigCalendar;
