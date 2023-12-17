import React, { useEffect, useRef } from 'react';
import '../EcommerceDashboard/_commonEcommerce.scss';
import '../InstituteDashboard/InstituteDashboard.scss';
import OrderIcon from '../EcommerceDashboard/assets/icons/orderIcon.svg';
import TodaySale from '../EcommerceDashboard/assets/icons/todaySale.svg';
import Weeklysale from '../EcommerceDashboard/assets/icons/weeklySale.svg'
import InquiryIcon from '../EcommerceDashboard/assets/icons/inquiry.svg'
// import EcommerceStatisticsBlock from '../EcommerceDashboard/Component/EcommerceStatisticsBlock';
// import InquiryIcon from '../EcommerceDashboard/assets/icons/inquiry.svg'
import { useNavigate } from 'react-router-dom';
import TemplateChoose from '../InstituteDashboard/Components/TemplateChoose';
import ProceedToBookStrip from '../InstituteDashboard/ProceedToBookStrip';
import { useSelector } from 'react-redux';
import { getInstituteData } from '../../../store/actions/businessInfo';
import { useDispatch } from 'react-redux';
import { getDomainDetails } from '../../../store/actions/privateDomain';
// import AppLink from '../../../Common/AppLink';
import { dashboardProductCount } from '../../../store/actions/ecommerce/action/product';
import Stepper from '../Stepper';
import { useState } from 'react';
import ContactEmailVerify from '../ContactEmailVerify';
import SupportRequestForm from '../../Admin/Website/SupportRequestForm';
import StepperMarketing from '../StepperMarketing';
import Cookies from '../../../Classes/Cookies';
import AppLink from '../../../Common/AppLink';
import EcommerceStatisticsBlock from '../EcommerceDashboard/Component/EcommerceStatisticsBlock';
import { bookAppointmentAdminDashboardCount } from '../../../store/actions/bookAppointment';
const ServiceDashboard = () => {
  const dropdownRef = useRef(null);
  const [supportrequest, setsupportrequest] = useState(false);

  const sendsupportrequest = () => {
    setsupportrequest(!supportrequest);
  };

  const closeSendSupportRequest = () => {
    setsupportrequest(false);
  };
  const {
    institute_private_domain,
    institute_private_domain_success
  } = useSelector((state) => {
    return {
      institute_private_domain: state.checkdomain.list.data.domain,
      institute_private_domain_success: state.checkdomain.list.success,
    };
  });

  const { users, businessData, businessDataSuccess, postedDomainDetailsSuccess, postedDomainDetailsData, adminCountDashboardSuccess,
    adminCountDashboardLoading, adminCountDashboarddata } = useSelector((state) => {
      return {
        users: state.user,
        businessData: state.businessInfo.getInstituiteData.data,
        businessDataSuccess: state.businessInfo.getInstituiteData.data,
        postedDomainDetailsData: state.privatedomain.domainDetailsGet.data,
        postedDomainDetailsSuccess: state.privatedomain.domainDetailsGet.success,
        adminCountDashboardSuccess: state.bookAppointment.adminCountDashboard.success,
        adminCountDashboardLoading: state.bookAppointment.adminCountDashboard.loading,
        adminCountDashboarddata: state.bookAppointment.adminCountDashboard.data,

      }
    })

  const orders = [{
    id: 1,
    number: adminCountDashboardSuccess ? adminCountDashboarddata.new_booking : 0,
    text: "New Bookings",
    icon: OrderIcon
  },
  {
    id: 2,
    number: adminCountDashboardSuccess ? adminCountDashboarddata.today_booking : 0,
    text: "Today’s Bookings",
    icon: TodaySale
  },
  {
    id: 3,
    number: adminCountDashboardSuccess ? adminCountDashboarddata.weekly_booking : 0,
    text: "Weekly Bookings",
    icon: Weeklysale
  },
  {
    id: 4,
    number: adminCountDashboardSuccess ? adminCountDashboarddata.total_booking : 0,
    text: "Total Bookings",
    icon: TodaySale
  }
  ]

  const inquries = [{
    id: 1,
    number: adminCountDashboardSuccess ? adminCountDashboarddata.customer_inq : 0,
    text: "Customer Inquiries",
    icon: InquiryIcon
  },
  ]

  const contactStepsEcommerce = [
    {
      id: 0,
      name: "Profile",
      number: 1,
      title: "Manage Profile",
      description: "Fill in your ecommerce details to complete your website profile.",
      button: "Manage Profile",
      redirect: "/bookingservices/businessInfo",
      checkWork: "addBuisnessDetails",
    },
    {
      id: 1,
      name: "Verify Contact",
      number: 2,
      title: "Verify Contact",
      description: "Get access to website features.",
      button: "Verify now",
      redirect: "addContact",
      checkWork: "addContact",
    },
    {
      id: 2,
      name: "Choose Template",
      number: 3,
      title: "Choose Template",
      description: "Select a template from a range of options to begin customizing your website.",
      button: "Select",
      redirect: "/templates",
      checkWork: "addTemplate",
    },
    {
      id: 3,
      name: "Add Service",
      number: 4,
      title: "Add Service",
      description: "Please add a service to move to the next step.",
      button: "Add Service",
      redirect: "/bookingservices/category-create",
      checkWork: "addService",
    },
    {
      id: 4,
      name: "Buy Domain ",
      number: 5,
      title: "Buy Domain ",
      description: "Give your ecommerce a separate identity. Get a domain now!",
      button: "Buy now",
      redirect: "/check-domain",
      checkWork: "addDomain",
    },
  ];
  const emailStepsEcommerce = [
    {
      id: 0,
      name: "Profile",
      number: 1,
      title: "Manage Profile",
      description: "Fill in your ecommerce details to complete your website profile.",
      button: "Manage Profile",
      redirect: "/bookingservices/businessInfo",
      checkWork: "addBuisnessDetails",
    },
    {
      id: 1,
      name: "Verify Email",
      number: 2,
      title: "Verify Email",
      description: "Get access to website features.",
      button: "Verify now",
      redirect: "addEmail",
      checkWork: "addEmail",
    },
    {
      id: 2,
      name: "Choose Template",
      number: 3,
      title: "Select a Template",
      description: "Select a template from a range of options to begin customizing your website.",
      button: "Select",
      redirect: "/templates",
      checkWork: "addTemplate",
    },
    {
      id: 3,
      name: "Add Service",
      number: 4,
      title: "Add Service",
      description: "Please add a service to move to the next step.",
      button: "Add Service",
      redirect: "/bookingservices/category-create",
      checkWork: "addService",
    },
    {
      id: 4,
      name: "Buy Domain ",
      number: 5,
      title: "Buy Domain ",
      description: "Give your ecommerce a separate identity. Get a domain now!",
      button: "Buy now",
      redirect: "/check-domain",
      checkWork: "addDomain",
    },
  ];


  // console.log(Cookies.get("__wz_ud__"))
  const themeName = "oval";
  const websiteUrl = "https://abeauty.edneed.com/";

  const history = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInstituteData(users.user_business, users.user_business_type))
  }, [dispatch, users.user_business, users.user_business_type])

  useEffect(() => {
    dispatch(bookAppointmentAdminDashboardCount(users.user_business, users._id, users.user_business_type))
  }, [users.user_business, users.user_business_type])

  useEffect(() => {
    dispatch(getDomainDetails(users._id, users.user_business, users.user_business_type))
  }, [dispatch, users._id, users.user_business, users.user_business_type])

  const ProceedToBook = () => {
    history(`/myCart/${postedDomainDetailsData.domain}`);
  };

  const [stepperComplete, setStepperComplete] = useState(false)

  useEffect(() => {
    if (users.user_dashboard_stepper.addBuisnessDetails && users.user_dashboard_stepper.addEmail && users.user_dashboard_stepper.addContact
      && users.user_dashboard_stepper.addTemplate && users.user_dashboard_stepper.addDomain && users.user_dashboard_stepper.addService) {
      setStepperComplete(true)
    }
  }, [users.user_dashboard_stepper])

  const testModals = useRef(null);

  const closeMainPopUp = () => {
    testModals.current.close()
  }

  const BookPrivateDomain = () => {
    if (!users.user_email_verify) {
      testModals.current.open();
    } else {
      history("/check-domain");
    }
  };
  const redirectBookingList = () => {
    history('/bookingservices/booking-list')
  }
  const redirectInquiries = () => {
    history('/contact-list')
  }

  return (
    <React.Fragment>
      <div className='dashBoard-home-container'>
        {/* <h1 className='text-xl w-600'>Welcome, <span className='capitalize'>{users.user_fullname}</span></h1>
        <p className='text-xxs w-400'>It’s personalized for your site type:	&nbsp;Online Store  <span className='dashboard-type-text'>Ecommerce</span></p> */}
        <div className="deshwelcome-wrapper">
          <div>
            <h1 className=" text-md base w-600">Welcome, <span className='capitalize'>{users.user_fullname}</span></h1>
            <p className="text-xxs base w-400">It’s personalized for your site type:	&nbsp;Online Services  <span className='dashboard-type-text'>{users.user_business_type}</span></p>
          </div>
          <div>
            {!institute_private_domain && institute_private_domain_success ? (
              <React.Fragment>
                <div className="SupportRequest-wrapper" ref={dropdownRef}>
                  <p className="text-xxs base w-400">Have an existing domain?</p>
                  <button
                    className="button btn-sm btn-o-primary primary"
                    onClick={sendsupportrequest}
                  >
                    Send Support Request
                  </button>
                  {supportrequest && (
                    <div className="supportRequestFormWrapper">
                      <SupportRequestForm
                        closeSendSupportRequest={() =>
                          closeSendSupportRequest()
                        }
                        ecommerce={"ecommmerce"}
                      />
                    </div>
                  )}
                </div>
              </React.Fragment>
            ) : (
              ""
            )}
          </div>
        </div>
        {businessDataSuccess && businessData.domain ?
          (<div className="instituteDashboard-edit">
            {/* <button className="text-xxs w-400 primary" onClick={openSubDomain}>{businessData.domain}</button>
            <i className='ed-icon i-xs primary icon-edit'></i> */}
          </div>)
          : businessDataSuccess && !businessData.domain && postedDomainDetailsSuccess && postedDomainDetailsData === null ? (
            <ProceedToBookStrip title="Buy Domain right now !" btnName="Buy Domain" handleClick={BookPrivateDomain} />
          ) : (<ProceedToBookStrip title="1 Domain is in your Cart. Check Out Now!" btnName="Proceed to Book" handleClick={ProceedToBook} />)}


        <div className='dashBoard-upper-container'>
          <div>
            <TemplateChoose themeName={themeName} websiteUrl={websiteUrl} />
          </div>
          {!users.user_institute_isOld && !stepperComplete ? (
            <Stepper ContactSteps={contactStepsEcommerce}
              Emailsteps={emailStepsEcommerce} stepperComplete={stepperComplete} />
          ) : (
            <StepperMarketing />
          )

          }
        </div>

        <div className='section-container'>
          <h3 className='order-heading'>Bookings</h3>
          <div className='order-summarry-wrapper' onClick={redirectBookingList}>
            {
              orders.map((data) => {
                return (
                  <EcommerceStatisticsBlock key={data.id} data={data} />
                )
              })
            }
          </div>
        </div>
        <div className='section-container'>
          <h3 className='order-heading'>Inquiries</h3>
          <div className='order-summarry-wrapper' onClick={redirectInquiries} >
            {
              inquries.map((data) => {
                return (
                  <EcommerceStatisticsBlock key={data.id} data={data} />
                )
              })
            }
          </div>
        </div>
      </div>
      {/* container ends */}
      <ContactEmailVerify verifyState={"addEmail"} testModals={testModals} closeMainPopUp={() => closeMainPopUp()} />
    </React.Fragment >
  )
}
export default ServiceDashboard