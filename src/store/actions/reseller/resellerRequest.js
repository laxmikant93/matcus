import Request from "../../../Classes/Request";

class ResellerRequest extends Request {
    constructor(){
        super()
        this.Reseller = {
            endpoint:super.url('https://domaincheck.httpapi.com/api/domains/available.json?auth-userid=__USER_ID__&api-key=__KEY__&domain-name=__DOMAIN_NAME__&tlds=com&tlds=net'),
            test:super.url("https://domaincheck.httpapi.com/api/domains/available.json?auth-userid=1081155&api-key=a7bpmaCduNMk2Zz4PS5GnR45PwNUCaPZ&domain-name=Pikachu&tlds=com&tlds=net&tlds=org"),
            
        }
    }
}
export default new ResellerRequest();