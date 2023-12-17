import React from "react";
import GrayAuthTheme from "../../../../Common/Theme/GrayAuthTheme";
import Breadcrumb from "../../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../../Common/Breadcrumb/BreadcrumbItem";
import SelectTitle from "../../../../Common/SectionTitle";
import PaymentModeOption from "./PaymentModeOption";
import "./PaymentMode.scss";
const PaymentMode = () => {
  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        {/* <BreadcrumbItem to="/website-manage" title="Manage Website" /> */}
        <BreadcrumbItem to="/payment-mode" title="Payment Mode" />
      </Breadcrumb>
      <div className="PageTopHead PTH-PaymentMode mt-30">
        <div className="PTH-Item">
          <p className="text-sm">Payment Method</p>
        </div>
      </div>
      <SelectTitle type="paymentSelect" />
      <PaymentModeOption />
    </React.Fragment>
  );
};

export default PaymentMode;
