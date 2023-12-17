import Request from "../../../Classes/Request";

class InviteFacultyList extends Request {
    constructor(){
        super()
        this.facultydata = {
            endpoint:super.url('/faculty'),
            singledata:super.url('/faculty/__USERID__'),
            
        }
    }
}
export default new InviteFacultyList();