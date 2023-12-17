import Request from "../../../Classes/Request";

class EditFaculty extends Request {
    constructor(){
        super()
        this.facultydata = {
            endpoint:super.url('/course'),
            singledata:super.url('/faculty/__USERID__'),
            
        }
    }
    FacultyCreate(name,userName,password,onSuccess,onError){
        const FacultyData={
            name:name,
            userName:userName,
            password:password
        };
        this.post(this.facultydata.endpoint,FacultyData,onSuccess,onError)
    }

    FacultyRead(onSuccess,onError)
    {
        this.get(this.facultydata.endpoint,onSuccess,onError)
    }


    FacultySingleRead(id,onSuccess,onError)
    {           
        // this.get(this.facultydata.singledata.replace(id),onSuccess,onError)
        this.get(this.facultydata.singledata.replace("__USERID__",id),onSuccess,onError)
    }


    FacultyEdit(name,email,username,onSuccess,onError){
        const FacultyData={
            name:name,
            username:username,
            email:email
        };
               
        this.patch(this.facultydata.endpoint,FacultyData,onSuccess,onError)
    }
    FacultyDelete(username,onSuccess,onError){
        const FacultyData={
            username:username,
        };
       
        this.delete(this.facultydata.endpoint,FacultyData,onSuccess,onError)

    }

}
export default new EditFaculty();