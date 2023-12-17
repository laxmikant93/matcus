import Request from "../../../Classes/Request";

class LikeRequest extends Request {
    constructor(){
        super()
        this.LikeEndpoint = {
            LikeList:super.url('/like'),
              
        }
    }
}
export default new LikeRequest();