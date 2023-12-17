import Request from "../../../Classes/Request";

class WhatsAppSupportRequest extends Request {
    constructor() {
        super()
        this.whatsAppEndPoint = {
            whatsAppPrivateDomain: super.url('institute?domain=__PRIVATEDOMAIN__')
        }
    }
}
export default new WhatsAppSupportRequest();