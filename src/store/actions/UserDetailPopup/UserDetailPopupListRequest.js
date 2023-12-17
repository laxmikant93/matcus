import Request from "../../../Classes/Request";

class UserDetailPopupRequest extends Request {

    constructor() {
        super()
        this.UserDetailPopupEndpoint = {
            userDetails: super.url('/authorization-middleware/user/__ID__?industry=_INSDUSTRY_', "middleware"),
        }
    }
}

export default new UserDetailPopupRequest();