import { createContext } from "react";

const CourseClassromFilterContext = createContext({ courseSelection: [], classRoomSelection: [], courseClassRoomSelection: {} });
const CourseClassromFilterProvider = CourseClassromFilterContext.Provider;
const CourseClassromFilterConsumer = CourseClassromFilterContext.Consumer;

export {
  CourseClassromFilterContext,
  CourseClassromFilterProvider,
  CourseClassromFilterConsumer,
}


