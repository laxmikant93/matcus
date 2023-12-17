import Request from "../../../Classes/Request";

class AppointmentRequest extends Request {
  constructor() {
    super();
    this.AppointmentEndpoint = {
      postAppointment: super.url('/appointmentBooking/createAppointment?type=__type__', "commonservices"),

      getBookingList: super.url('/appointmentBooking/getAppointmentsResult/?institute=_insID_&owner=_ownerID_&type=__type__', "commonservices"),
      getBookingListSearch: super.url('/appointmentBooking/getAppointmentsResult/?institute=_insID_&owner=_ownerID_&searchString=_VALUE_&type=__type__', "commonservices"),
      getBookingListSort: super.url('/appointmentBooking/getAppointmentsResult/?institute=_insID_&owner=_ownerID_&sort=_VALUE_&type=__type__', "commonservices"),
      getBookingListByDate: super.url('/appointmentBooking/getAppointmentsResult/?institute=_insID_&owner=_ownerID_&date=_VALUE_&type=__type__', "commonservices"),
      getBookingListByCustomeDate: super.url('/appointmentBooking/getAppointmentsResult/?institute=_insID_&owner=_ownerID_&startDate=_VALUE_&endDate=_VALUE_&type=__type__', "commonservices"),

      // get All Main Service List
      getAllMainServiceList: super.url('/appointmentBooking/getservice/inst?type=__type__', "commonservices"),

      // get All Main Service List
      getAllSlot: super.url('/appointmentBooking/getserviceSlots/serviceId/insID?date=_DATE_&type=__type__', "commonservices"),
      geteditAppointment: super.url('appointmentBooking/editAppointment/appointmentId?type=__type__', "commonservices"),


      getSingleAppointment: super.url('/appointmentBooking/getSingleAppointment/appointmentId?type=__type__', "commonservices"),
      // editAppointmentDetail: super.url('/appointmentBooking/editAppointment/appointmentId?type=__type__'),
      // sortAppointmentList: super.url('/appointmentBooking/getAppointmentsResult/?_QUERY_=__TITLE__'),
      // searchAppointment:super.url('/appointmentBooking/getAppointmentsResult'),
      postServiceDetail: super.url('/appointmentBooking/service-create?type=__type__', "commonservices"),
      getSingleServiceDetail: super.url('/appointmentBooking/service?type=__type__', "commonservices"),
      getAllServiceList: super.url('/appointmentBooking/serviceList?type=__type__', "commonservices"),
      editServiceDetails: super.url('/appointmentBooking/serviceUpdate/serviceId?type=__type__', "commonservices"),
      deleteService: super.url('/appointmentBooking/serviceDelete/serviceId?type=__type__', "commonservices"),
      postMainCategoryDetail: super.url('/appointmentBooking/mainCategory-create?type=__type__', "commonservices"),
      getSingleMainCategoryDetail: super.url('/appointmentBooking/mainCategoryList/categoryId?type=__type__', "commonservices"),
      getAllMainCategoryList: super.url('/appointmentBooking/mainCategoryList?business=__bid__&owner=__ownerid__&type=__type__', "commonservices"),
      editMainCategoryDetails: super.url('/appointmentBooking/mainCategoryUpdate/categoryId?type=__type__', "commonservices"),
      editMainCategoryData: super.url('/appointmentBooking/editCategory/_id?type=__type__', "commonservices"),
      deleteMainCategory: super.url('/appointmentBooking/mainCategoryDelete/categoryId?type=__type__', "commonservices"),
      getpolicy: super.url('/appointmentBooking/policy?owner=OWNID&institute=INSID&type=__type__', "commonservices"),
      postpolicy: super.url('/appointmentBooking/policy?type=__type__', "commonservices"),
      editpolicy: super.url('/appointmentBooking/policy?id=_ID&type=__type__', "commonservices"),
      dashboardsteppercourse: super.url("/authService/DashboardStepperUpdate"),
      adminCountDashboard: super.url("/appointmentBooking/countAppointmentdetails/__INS__/__OWNER__?type=__TYPE__", "commonservices"),
      getAllUnCategoryList: super.url('/appointmentBooking/unCategoryList?business=__bid__&owner=__ownerid__&type=__type__', "commonservices"),



      //Services by categories
      getServicesBycategories: super.url("/appointmentBooking/getAllService?business=_insID_&owner=_ownerID_&search=_VALUE_&type=__type__", "commonservices"),
      getMainBusiCategory: super.url("/appointmentBooking/getBusinessServiceCategory?business=_insID_&owner=_ownerID_&type=__type__", "commonservices"),
      editMainBusiCategory: super.url("/appointmentBooking/updateBusinessServiceCategory?business=_insID_&owner=_ownerID_&type=__type__", "commonservices"),
      multiDeleteUnCategory: super.url("/appointmentBooking/updateServiceOfSingleCategory/_catID_?type=__type__", "commonservices"),
      deleteCategory: super.url("/appointmentBooking/updateServiceInsideMainCat/_catID_?type=__type__", "commonservices"),
      // collection 
      postCollection: super.url("/appointmentBooking/postServiceCollection?type=__type__", "commonservices"),

      getAllCollection: super.url("/appointmentBooking/getAllServiceCollection?type=_Type_&business=_buesinessid_&owner=_ownerID_&search=_value_", "commonservices"),

      getSigleCollection: super.url("/appointmentBooking/getSingleCollection?type=_Type_&business=_buesinessid_&conlectionid=_CollectionID_", "commonservices"),
      getSigleCollectionEndUser: super.url("/appointmentBooking/getSingleCollectionEndUser?type=_Type_&business=_buesinessid_&urlSlug=_urlSlug_", "commonservices"),
      getShowOnHeaderCollections: super.url("/appointmentBooking/getShowOnHeaderCollections?business=_buesinessid_&owner=_OWNER_&type=_Type_", "commonservices"),
      getMainBusiCollection: super.url("/appointmentBooking/getBusinessCollection?type=_Type_&business=_buesinessid_&owner=_ownerID_", "commonservices"),
      editMainBusiCollection: super.url("/appointmentBooking/patchBusinessCollection?type=_Type_&business=_buesinessid_&owner=_ownerID_", "commonservices"),
      deleteCollection: super.url("/appointmentBooking/deleteCollection/CollectionID", "commonservices"),
      editCollection: super.url("/appointmentBooking/editcollectionDetail/CollectionID", "commonservices"),
      //BOOKING FORM ON BOOKING BUTTON 
      postBookingFormData: super.url('/contact/createServiceBookingForm?industry=__type__', "commonservices"),
      // GET FOR DISABLE BUTTON
      getDisableButtonData: super.url('/contact/getServiceBookingSelection/busniess?industry=__type__', "commonservices"),
      patchDisableButtonData: super.url('/contact/updateServiceBookingSelection/id?industry=__type__', "commonservices"),
      
    }
  }
}
export default new AppointmentRequest(); 