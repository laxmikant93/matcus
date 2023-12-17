import Request from "../../../Classes/Request";

class privateDomainRequest extends Request {
  constructor() {
    super()
    this.privateDomainEndpoint = {
      getDomainAvailablity: super.url('/domain/suggstions?domainName=__DOMAIN__', "middleware"),
      postUserDetailOffline: super.url('/offlineregistration'),
      postUserDetailOnline: super.url('/institute'),
      patchInstituteDetails: super.url('/institute/__INS__'),
      postCartDetails: super.url('/thirdparty/domainSubmit'),
      getTldsPrice: super.url('/thirdparty/gettlds'),
      postDomainSubmit: super.url('/domain/domainpost', "middleware"),
      patchInstitute: super.url('/institute/__INS__'),
      getOrderDetails: super.url('/domain/orderget?owner=__USERID__&business=__INSTITUTEID__&type=__TYPE__', "middleware"),
      createOrder: super.url('/domain/order', 'middleware'),
      getDomainDetails: super.url('/domain/domaindetailget?business=__INSTITUTEID__&owner=__USERID__&type=__TYPE__', 'middleware'),
      instituteDetails: super.url('/institute/__ID__'),
      getUserDetails: super.url('/domain/domaindetailget?owner=__USERID__&business=__INSTITUTEID__&type=__TYPE__', 'middleware'),
      postSupportMail: super.url('/institute/__INSTITUTE_ID__'),
      requestSupportMail: super.url("/razor/mailsendrequestbutton"),
      ecommerceSupportMail: super.url("/domain/mailsendrequestbutton", 'middleware'),
      // change the names
      subDomainMailer: super.url("/razor/mailonlysubdomaincreated"),
      sendMail2: super.url("/razor/mailexistingcustomer"),
      sendMail3: super.url("/razor/mailcancelorder"),
      sendMail4: super.url("/razor/maildomainandprivatedomaincreated"),
      techSupport: super.url("/domain/technicalsupport", 'middleware')
    }
  }
}
export default new privateDomainRequest();