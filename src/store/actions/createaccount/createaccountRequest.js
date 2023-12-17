import Request from "../../../Classes/Request";

class createaccountRequest extends Request {
    constructor(){
        super()
        this.userEndpoint = {
            endpoint:super.url('/user'),            
        }
    }
}
export default new createaccountRequest();