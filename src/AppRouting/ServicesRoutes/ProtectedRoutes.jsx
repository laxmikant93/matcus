import React, { lazy } from 'react';
import { Route } from 'react-router-dom';
import Auth from '../../Classes/Auth';
import AppLinkUrl from '../../Common/AppLink/AppLinkUrl';
import HomeRoute from '../HomeRoute';
import WebsiteRoute from "../../WebsiteTemplateCustomization/WebsiteRoute";
import Editoverview from '../../App/BuisnessDashboard/EditOverview/Editoverview';
import BookAppointment from '../../App/AdminDashboard/BookAppointment';
import Bookinglist from '../../App/AdminDashboard/BookAppointment/BookingList';
import BookingSetting from '../../App/AdminDashboard/BookAppointment/BookingSetting';
import CategoryCreateUpdate from '../../App/AdminDashboard/BookAppointment/CategoryCreateUpdate';
import CategoryServie from '../../App/AdminDashboard/BookingServices/Service/CategoryServie';
import CreateCategory from '../../App/AdminDashboard/BookingServices/Categories';
import BookingCollection from '../../App/AdminDashboard/BookingServices/Collection';
import AddNewCollection from '../../App/AdminDashboard/BookingServices/Collection/AddNewCollection/AddNewCollection';
const BusinessInfo = lazy(() => import("../../App/BuisnessDashboard/ManageWebsite/ManageBusinessInfo"));
const DashboardHome = lazy(() => import("../../App/Dashboard/ServiceDashboard/index"));

const ServicesProtectedRoutes = () => {
  function AuthenticatedRoutes({ children }) {
    if (AppLinkUrl.privateDomain()) {
      return Auth.isLogin() ? children : <WebsiteRoute />;
    } else {
      return Auth.isLogin() ? children : <HomeRoute />;
    }
    //return Auth.isLogin() ? Auth.user().user_password_change? children:<EmailResetPassword />: <Home />  ;
  }
  return (
    <React.Fragment>
      <AuthenticatedRoutes>
        <Route path="/dashboard" component={DashboardHome} />
        <Route path="/bookingservices/businessInfo" component={BusinessInfo} />
        <Route path="/bookingservices/business-info-manage" component={Editoverview} />
        <Route path="/bookingservices/book-appointment-list" component={BookAppointment} access={"manage_website"} />
        <Route path="/bookingservices/booking-list" component={Bookinglist} access={"manage_website"} />
        <Route path="/bookingservices/booking-setting" component={BookingSetting} access={"manage_website"} />
        <Route path="/bookingservices/category-create" component={CategoryCreateUpdate} access={"manage_website"} />
        <Route path="/bookingservices/category-update/:state/:id" component={CategoryCreateUpdate} access={"manage_website"} />

        <Route path="/bookingservices/booking-service" component={CategoryServie} access={"manage_website"} />
      <Route path="/bookingservices/booking-create-category" component={CreateCategory} />
      {/* <Route path="/bookingservices/bookings-category" component={CategoryServie} /> */}
      <Route exact path="/bookingservices/collection" component={BookingCollection} />
      <Route exact path="/bookingservices/collection/CreateCollection" component={AddNewCollection} />
      <Route exact path="/bookingservices/collection/Update-collection/:id" component={AddNewCollection} />
      </AuthenticatedRoutes>
    </React.Fragment>
  )
}
export default ServicesProtectedRoutes