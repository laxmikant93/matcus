import { CLASSROOM_ASSIGNED_TYPE } from "../actions/classroomassigned/actionType";
function groupArrayOfObjects(list, key) {
  return list && list.length && list.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}
const CLASSROOM_ASSIGNED_INITIAL_STATE = {
  list: [],
  classroomassignedList: [],
  courseList: [],
  classroominfo: [],
  facultyList: {
    data: [],
    loading: false,
    error: false,
  },
  createcourse: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  delete: {
    data: "",
    loading: false,
    success: false,
    error: false,
  },
  updateselection: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  teacherassignedclassrooom: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  ClassroomData: {
    data: [],
    success: false,
  }
};

const classroomassigned = (
  state = CLASSROOM_ASSIGNED_INITIAL_STATE,
  { type, payload }
) => {

  switch (type) {
    case CLASSROOM_ASSIGNED_TYPE.CLASSROOM_ASSIGNED_READ:
      return {
        ...state,
        list: payload,
        // classroomassignedList: groupArrayOfObjects(payload, "course"),
        courseList: payload && payload.length ? [
          ...new Map(payload.map((item) => [item["course"], item])).values(),
        ] : [],
      };
    case CLASSROOM_ASSIGNED_TYPE.CLASSROOM_ASSIGNED_CHANGE:
      return {
        ...state,
        classroomList: state.list.filter((item) => item.course === payload),
      };
    case CLASSROOM_ASSIGNED_TYPE.CLASSROOM_ASSIGNED_CHANGE_RESET:
      return {
        ...state,
        classroomList: payload,
      };

    case CLASSROOM_ASSIGNED_TYPE.CLASSROOM_ASSIGNED_FACULTY:
      return {
        ...state,
        facultyList: {
          ...state.facultyList,
          data: payload,
          success: true,
        },
      };
    case CLASSROOM_ASSIGNED_TYPE.CLASSROOM_ASSIGNED_DELETE:
      return {
        ...state,
        delete: {
          ...state.delete,
          data: payload,
          success: true,
        },
      };
    case CLASSROOM_ASSIGNED_TYPE.ASSIGNED_TEACHER_CLASSROOM_DATA_LOADING:
      return {
        ...state,
        teacherassignedclassrooom: {
          ...state.teacherassignedclassrooom,
          data: [],
          success: false,
        },
      };
    case CLASSROOM_ASSIGNED_TYPE.DELETE_ASSIGNED_CLASSROOM:
      return {
        ...state,
        delete: {
          ...state.delete,
          data: payload,
          success: true,
        },

        teacherassignedclassrooom: {
          ...state.teacherassignedclassrooom,
          data: state.teacherassignedclassrooom.data.filter((item) => item._id !== payload),

        },

      };
    case CLASSROOM_ASSIGNED_TYPE.POST_COURSE_ASSIGNED:
      return {
        ...state,
        facultyList: {
          ...state.facultyList,
          data: state.facultyList.data.concat(payload),
          success: true,
        },
      };

    case CLASSROOM_ASSIGNED_TYPE.UPDATE_SELECTION_COURSE_ID:

      return {
        ...state,
        updateselection: {
          ...state.updateselection,
          data: state.facultyList.data.find(annItem => annItem.course === payload),
          success: true,
        },
        ClassroomData: {
          ...state.ClassroomData,
          data: state.facultyList.data.find(annItem => annItem.course === payload),
          success: true,
        },
      };
    case CLASSROOM_ASSIGNED_TYPE.ASSIGNED_TEACHER_CLASSROOM_DATA:

      return {
        ...state,
        teacherassignedclassrooom: {
          ...state.teacherassignedclassrooom,
          data: payload,
          success: true,
        },
      };
    default:
      return state;
  }
};
export default classroomassigned;