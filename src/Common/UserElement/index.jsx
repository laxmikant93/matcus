import { useSelector } from "react-redux";
import Storage from "../../Classes/Storage";

export const Fullname = () => {
    const user = useSelector(state => state.user);
    return user.user_fullname ? user.user_fullname : "";
}

export const Username = () => {
    const user = useSelector(state => state.user);
    return user.user_email ? user.user_email : "";
}

export const Useremail = () => {
    const user = useSelector(state => state.user);
    return user.user_useremail ? user.user_useremail : "";
}

export const Userid = () => {
    const user = useSelector(state => state.user);
    return user._id ? user._id : "";
}
export const UserToken = () => {
    const user = useSelector(state => state.user);
    return user.token ? user.token : "";
}

export const UserImageUrl = () => {
    const user = useSelector(state => state.user);
    // return user.userinfo_profile_picture
    return user.user_profile_picture ? user.user_profile_picture : "";
}

export const UserInstitute = () => {
    const user = useSelector(state => state.user);
    return user.user_institute_institute_name ? user.user_institute_institute_name : "NA"
}
export const UserInstituteAddress = () => {
    const user = useSelector(state => state.user);
    return user.user_institute_institute_address ? user.user_institute_institute_address : <></>
}

export const DynamicCourseHeader = () => {
    const course = Storage.alive('heading') ? Storage.getJson('heading') : {}
    return course.coursehead ? course.coursehead : "Classroom"
}
export const DynamicClassroomHeader = () => {
    const course = Storage.alive('heading') ? Storage.getJson('heading') : {}
    return course.classroomhead ? course.classroomhead : "Subject"
}
export const GetUserTheme = ({ onLoaded }) => {
    const user = useSelector(state => state.user);
    const getthemetext = () => {
        let theme = 'institute';

        switch (user.user_activeRole) {
            // case process.env.REACT_APP_TEACHER:
            //     theme = 'teacher'
            //     break;

            case process.env.REACT_APP_STUDENT:
                theme = 'student'
                break;
            case process.env.REACT_APP_PAGE_OWNER:
                theme = 'teacher'
                break;

            default:
                theme = "institute"
                break;
        }

        return theme;
    }
    onLoaded(getthemetext())
    return <></>
}

export const UserActiveRole = () => {
    const user = useSelector(state => state.user);
    return user.user_activeRole ? user.user_activeRole : ""
}
export const UserRoleAccess = () => {
    const user = useSelector(state => state.user);
    return user.user_role_access ? user.user_role_access : []
}

// export const CoursesTaxanomyTopic = () => {
//     const taxanomySuccess = useSelector(state => state.admincourse.getTaxanomy.success)
//     const taxanomyData = useSelector(state => state.admincourse.getTaxanomy.data)
//     if (taxanomySuccess) {
//         if (taxanomyData.taxanomyTopic) {
//             return taxanomyData.taxanomyTopic
//         } else {
//             return "Topic"
//         }
//     } else {
//         return "Topic"
//     }
// }
// export const CoursesTaxanomyChapter = () => {
//     const taxanomySuccess = useSelector(state => state.admincourse.getTaxanomy.success)
//     const taxanomyData = useSelector(state => state.admincourse.getTaxanomy.data)
//     if (taxanomySuccess) {
//         if (taxanomyData.taxanomyChapter) {
//             return taxanomyData.taxanomyChapter
//         } else {
//             return "Chapter"
//         }
//     } else {
//         return "Chapter"
//     }
// }
// export const CoursesTaxanomyContent = () => {
//     const taxanomySuccess = useSelector(state => state.admincourse.getTaxanomy.success)
//     const taxanomyData = useSelector(state => state.admincourse.getTaxanomy.data)
//     if (taxanomySuccess) {
//         if (taxanomyData.taxanomyContent) {
//             return taxanomyData.taxanomyContent
//         } else {
//             return "Content"
//         }
//     } else {
//         return "Content"
//     }
// }
