import Request from "../../../Classes/Request";

class FacultyList extends Request {
    constructor(){
        super()
        this.facultylist = {
            endpoint:super.url('/'),
        }
    }
    FacultyListFetch(onSuccess,onError){
    
        this.get(this.facultylist.endpoint,onSuccess,onError)
    }

}
export default new FacultyList();