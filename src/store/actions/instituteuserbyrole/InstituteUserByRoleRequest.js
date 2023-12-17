import Request from "../../../Classes/Request";

class InstituteUserByRoleRequest extends Request {
    constructor(){
        super()
        this.instituteUsersEndpoints = {
            find:super.url('user?institute=__INSTITUTE__&activeRole=__USERTYPE__')
        }
    }
}

export default new InstituteUserByRoleRequest()