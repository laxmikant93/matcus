import {userDetail, autoSelectedRole} from "../Constant/auth";
// import {classes_constant} from "../Constant/classes";
import Cookie from "./Cookies";
import Storage from "./Storage";

class Role {

    // constructor(){
    //     window.addEventListener("storage", this.getUpdateLocalStorage)
    // }

    // getUpdateLocalStorage = e => {
    // }

    isPageAdmin(user, pageid){
        // const users = Cookie.has(userDetail)?Cookie.get(userDetail,Cookie.cokConfig.type.json):{}
        const users = Storage.alive(autoSelectedRole)?Storage.getJson(autoSelectedRole):{}
        if(users.rba_kind==="pageaccess" && users.rba_role_type==="School Admin" && users.rba_ref===pageid){ //&& users.rba_user===user
            return true
        }
        else {
            return false
        }

    }

    isTeacher(user, pageid){

        // const users = Cookie.has(userDetail)?Cookie.get(userDetail,Cookie.cokConfig.type.json):{}
        const users = Storage.alive(autoSelectedRole)?Storage.getJson(autoSelectedRole):{}
        if(users.rba_kind==="pageaccess" && users.rba_role_type==="Teacher" && users.rba_ref===pageid){ //&& users.rba_user===user
            return true
        }
        else {
            return false
        }

    }

    isStudent(user, pageid){

        // const users = Cookie.has(userDetail)?Cookie.get(userDetail,Cookie.cokConfig.type.json):{}
        const users = Storage.alive(autoSelectedRole)?Storage.getJson(autoSelectedRole):{}
        if(users.rba_kind==="pageaccess" && users.rba_role_type==="Student" && users.rba_ref===pageid){ //&& users.rba_user===user
            return true
        }
        else {
            return false
        }
    }

    isOwner(user, pageowner){
        return user===pageowner;
    }

    isPageAdminByUID(uid, pageid){
        const users = Cookie.has(userDetail)?Cookie.get(userDetail,Cookie.cokConfig.type.json):{}
        if(users.rba_kind==="pageaccess" && users.rba_role_type==="School Admin" && users.rba_ref===pageid && users.rba_user_uid===uid){
            return true
        }
        else {
            return false
        }

    }

    isTeacherByUID(uid, pageid){

        const users = Cookie.has(userDetail)?Cookie.get(userDetail,Cookie.cokConfig.type.json):{}
        if(users.rba_kind==="pageaccess" && users.rba_role_type==="Teacher" && users.rba_ref===pageid && users.rba_user_uid===uid){
            return true
        }
        else {
            return false
        }

    }

    isStudentByUID(uid, pageid){

        const users = Cookie.has(userDetail)?Cookie.get(userDetail,Cookie.cokConfig.type.json):{}
        if(users.rba_kind==="pageaccess" && users.rba_role_type==="Student" && users.rba_ref===pageid && users.rba_user_uid===uid){
            return true
        }
        else {
            return false
        }
    }

}


export default new Role();