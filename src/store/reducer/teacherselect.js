/*eslint no-extend-native: ["error", { "exceptions": ["Array"] }]*/
import * as TeacherActionTypes from "../actions/teacherselect/actionTypes";

Array.prototype.groupByKey = function (key) {

    if (!this) {
        return []
    }
    return this.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});

}

const INITIAL_TEACHER_SELECT_STATE = {
    loading: false,
    classroomassigned: {},
    data: [],
    selectedCourse: "",
    assignedClassroom: []
}

const teacherselect = (state = INITIAL_TEACHER_SELECT_STATE, { type, payload }) => {
    switch (type) {
        case TeacherActionTypes.TCH_COURSE_LOADING:
            return ({
                ...state,
                loading: true
            })

        case TeacherActionTypes.TCH_COURSE_LOADING_ERROR:
            return ({
                ...state,
                loading: false
            })

        case TeacherActionTypes.TCH_COURSE_LOADED:

            // Create Course List
            let allCourses = [];
            let courseData = payload.class
            let payloadArray = []
            for (let index = 0; index < courseData.length; index++) {
                const element = courseData[index];
                payloadArray.push({
                    ...element,
                    classroom: element.classroomName && element.classroomName._id,
                    classroomname: element.classroomName && element.classroomName.classroomname,
                    course: element.course._id,
                    coursename: element.course.coursename
                })
            }
            let data = payloadArray.groupByKey("course");
            
            for (const key in data) {
                if (data.hasOwnProperty.call(data, key)) {
                    const { coursename } = data[key][0];
                    
                    allCourses.push({
                        courseid: key,
                        course: coursename
                    })
                }
            }

            return ({
                ...state,
                loading: false,
                classroomassigned: payloadArray.groupByKey("course") || {},
                data: allCourses
            })

        case TeacherActionTypes.TCH_COURSE_RESET:
            return (INITIAL_TEACHER_SELECT_STATE)

        case TeacherActionTypes.TCH_SET_SELECTED_COURSE:
            return ({
                ...state,
                selectedCourse: payload,
                assignedClassroom: state.classroomassigned[payload] || []
            })

        case TeacherActionTypes.TCH_SET_CLASSROOM:
            return ({
                ...state,
                assignedClassroom: payload || []
            })


        case TeacherActionTypes.TCH_CLASSROOM_RESET:
            return ({
                ...state,
                assignedClassroom: []
            })

        default:
            return state;
    }
}

export default teacherselect;