import React, { lazy } from 'react';
import { Route } from 'react-router-dom';
import Auth from '../../Classes/Auth';
import AppLinkUrl from '../../Common/AppLink/AppLinkUrl';
import HomeRoute from '../HomeRoute';
import WebsiteRoute from "../../WebsiteTemplateCustomization/WebsiteRoute"
import Editoverview from '../../App/BuisnessDashboard/EditOverview/Editoverview';
const BusinessInfo = lazy(() => import("../../App/BuisnessDashboard/ManageWebsite/ManageBusinessInfo"));
const DashboardHome = lazy(() => import("../../App/Dashboard/EcommerceDashboard/pages/DashboardHome"));
const EcommerceOrderList = lazy(() => import("../../App/Dashboard/EcommerceDashboard/pages/OrderList"));
const EcommerceFailedOrderList = lazy(() => import("../../App/Dashboard/EcommerceDashboard/pages/FailedOrderList"));
const EcommerceProductList = lazy(() => import("../../App/Dashboard/EcommerceDashboard/pages/ProductList"));
const EcommerceInventory = lazy(() => import("../../App/Dashboard/EcommerceDashboard/pages/Inventory"));
const EcommerceCustomerList = lazy(() => import("../../App/Dashboard/EcommerceDashboard/pages/CustomerList"));
const EcommercePaymentFlow = lazy(() => import("../../App/Dashboard/EcommerceDashboard/pages/PaymentFlow"));
const EcommerceInventoryEdit = lazy(() => import("../../App/Dashboard/EcommerceDashboard/pages/InventoryEdit"));
const EcommerceOrderDetails = lazy(() => import("../../App/Dashboard/EcommerceDashboard/pages/OrderDetails"));
const EcommerceAbandonedCart = lazy(() => import("../../App/Dashboard/EcommerceDashboard/pages/Abandoned"));
const EcommerceInvoice = lazy(() => import("../../App/Dashboard/EcommerceDashboard/pages/Invoice/Invoice"));
const EcommerceCreateCollection = lazy(() => import("../../App/Dashboard/EcommerceDashboard/pages/CreateCollection"));
const EcommerceProductsInCollection = lazy(() => import("../../App/Dashboard/EcommerceDashboard/pages/ProductsInCollections"));
const EcommerceAllCollection = lazy(() => import("../../App/Dashboard/EcommerceDashboard/pages/AllCollection"));
const AddNewCollection = lazy(() => import("../../App/Dashboard/EcommerceDashboard/pages/AddNewCollections"));
const CreateProduct = lazy(() => import("../../App/Dashboard/EcommerceDashboard/pages/AddProduct"));
const EditProduct = lazy(() => import("../../App/Dashboard/EcommerceDashboard/pages/EditProduct"));
const PaymentAccount = lazy(() => import("../../App/Dashboard/EcommerceDashboard/pages/RazorPay/CreatePaymentAccount"));
const CreateCategory = lazy(() => import("../../App/BuisnessDashboard/CreateCategoryEcomm/CreateCategory"));


// website setting routes
const dashboardSettingHome = lazy(() => import("../../App/BuisnessDashboard/DashboardSetting"));
const WebsiteSetting = lazy(() => import("../../App/BuisnessDashboard/DashboardSetting/WebsiteSetting/WebsiteSetting"));
const PolicySetting = lazy(() => import("../../App/BuisnessDashboard/DashboardSetting/BusinessSetting/PolicySetting/PolicySetting"));
const BusinessSetting = lazy(() => import("../../App/BuisnessDashboard/DashboardSetting/BusinessSetting/BusinessSetting"));
const CurrencyAndLanguage = lazy(() => import("../../App/BuisnessDashboard/DashboardSetting/WebsiteSetting/CurrencyAndLanguage/CurrencyAndLanguage"));
const mailSetting = lazy(() => import("../../App/BuisnessDashboard/DashboardSetting/BusinessSetting/MailSetting/MailSetting"));
// bulk uplod 
const bulkUpload = lazy(() => import("../../App/BuisnessDashboard/BulkUpload/index"));
// shipping by region
const shipping = lazy(() => import("../../App/BuisnessDashboard/Shipping/index"));
// Review and Rating
const Review = lazy(() => import("../../App/BuisnessDashboard/ReviewsAndRating/index"));

const EcommerceProtectedRoutes = () => {
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
        <Route path="/ecommerce/dashboard" component={DashboardHome} />
        <Route path="/ecommerce/create-product" component={CreateProduct} />
        <Route path="/ecommerce/editProduct/:id" component={EditProduct} />
        <Route path="/ecommerce/addproduct" component={CreateProduct} />
        <Route path="/ecommerce/orderList/:id/:state" component={EcommerceOrderList} />
        <Route path="/ecommerce/failedOrderList/:id/:state" component={EcommerceFailedOrderList} />
        {/* {/ <Route path="/ecommerce / orderList /:id/returnOrder" component={EcommerceOrderList} /> /} */}
        <Route path="/ecommerce/productList" component={EcommerceProductList} />
        <Route path="/ecommerce/inventory" component={EcommerceInventory} />
        <Route path="/ecommerce/customerList" component={EcommerceCustomerList} />
        <Route path="/ecommerce/payments/:state/:id" component={EcommercePaymentFlow} />
        <Route path="/ecommerce/inventoryEdit/:varId/:prodId" component={EcommerceInventoryEdit} />
        <Route path="/ecommerce/orderDetails/:orderId" component={EcommerceOrderDetails} />
        <Route path="/ecommerce/abandonedCart" component={EcommerceAbandonedCart} />
        <Route path="/ecommerce/invoice/:orderId" component={EcommerceInvoice} />
        <Route path="/ecommerce/createCollection" component={EcommerceCreateCollection} />
        <Route path="/ecommerce/productsInCollection/:collId" component={EcommerceProductsInCollection} />
        <Route path="/ecommerce/allCollection" component={EcommerceAllCollection} />
        <Route path="/ecommerce/addnew/collection" component={AddNewCollection} />
        <Route path="/ecommerce/create-payment-account" component={PaymentAccount} />
        <Route path="/ecommerce/business-info-manage" component={Editoverview} />

        {/* // website setting routes */}
        <Route path="/ecommerce/settings" component={dashboardSettingHome} />
        <Route path="/ecommerce/websitesetting" component={WebsiteSetting} />
        <Route path="/ecommerce/policysetting" component={PolicySetting} />
        <Route path="/ecommerce/businesssetting" component={BusinessSetting} />
        <Route path="/ecommerce/currency-and-language" component={CurrencyAndLanguage} />
        <Route path="/ecommerce/create-category" component={CreateCategory} />
        <Route path="/ecommerce/businessInfo" component={BusinessInfo} />
        <Route path="/ecommerce/mail-setting" component={mailSetting} />

        {/* bulk upload */}
        <Route path="/ecommerce/bulkupload" component={bulkUpload} />

        {/* shipping by region */}
        <Route path="/ecommerce/shipping" component={shipping} exact />
        {/* edit shipping by region  */}
        <Route path="/ecommerce/shipping/:id" component={shipping} exact />
        {/* <Route path="/ecommerce/shipping" component={shipping} exact /> */}
        {/* review and rating */}
        <Route path="/ecommerce/review&rating" component={Review} />

      </AuthenticatedRoutes>
    </React.Fragment>
  )
}
export default EcommerceProtectedRoutes