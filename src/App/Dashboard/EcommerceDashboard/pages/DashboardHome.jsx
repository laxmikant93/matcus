import React, { useEffect, useRef } from 'react';
import './dashboard.scss';
import OrderIcon from '../assets/icons/orderIcon.svg';
import TodaySale from '../assets/icons/todaySale.svg';
import Weeklysale from '../assets/icons/weeklySale.svg'
import EcommerceStatisticsBlock from '../Component/EcommerceStatisticsBlock';
import InquiryIcon from '../assets/icons/inquiry.svg'
import CustomDomain from '../assets/icons/customDomain.png';
import CustomTemplte from '../assets/icons/customTemplte.png';
import VideoImage from '../assets/icons/imageBackground.png';
import VideoIcon from '../assets/icons/videoIcon.svg'
import bookImage from '../assets/icons/readingImage.png';
import CheckGreen from '../assets/icons/checkGreen.svg'
import { useNavigate } from 'react-router-dom';
import TemplateChoose from '../../InstituteDashboard/Components/TemplateChoose';
import ProceedToBookStrip from '../../InstituteDashboard/ProceedToBookStrip';
import { useSelector } from 'react-redux';
import { getInstituteData } from '../../../../store/actions/businessInfo';
import { useDispatch } from 'react-redux';
import { getDomainDetails } from '../../../../store/actions/privateDomain';
import AppLink from '../../../../Common/AppLink';
import { dashboardProductCount } from '../../../../store/actions/ecommerce/action/product';
import Stepper from '../../Stepper';
import { useState } from 'react';
import ContactEmailVerify from '../../ContactEmailVerify';
import SupportRequestForm from '../../../Admin/Website/SupportRequestForm';
import StepperMarketing from '../../StepperMarketing';
import Cookies from '../../../../Classes/Cookies';
import { useDetectOutsideClick } from "../../../../Common/DetectOutsideClick/useDetectOutsideClick";
const DashboardHome = () => {
  const dropdownRef = useRef(null);
  const [supportrequest, setsupportrequest] = useDetectOutsideClick(dropdownRef, false);

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

  const { users, businessData, businessDataSuccess, postedDomainDetailsSuccess, postedDomainDetailsData } = useSelector((state) => {
    return {
      users: state.user,
      businessData: state.businessInfo.getInstituiteData.data,
      businessDataSuccess: state.businessInfo.getInstituiteData.data,
      postedDomainDetailsData: state.privatedomain.domainDetailsGet.data,
      postedDomainDetailsSuccess: state.privatedomain.domainDetailsGet.success,

    }
  })

  const { dashboardCount } = useSelector((state) => state.productList);
  const orders = [{
    id: 1,
    number: dashboardCount.data.newOrders,
    text: "New Orders",
    icon: OrderIcon
  },
  {
    id: 2,
    number: dashboardCount.data.todaySales,
    text: "Today’s sales",
    icon: TodaySale
  },
  {
    id: 3,
    number: dashboardCount.data.weeklySales,
    text: "Weekly sales",
    icon: Weeklysale
  },
  {
    id: 4,
    number: dashboardCount.data.totalSales,
    text: "Total sales",
    icon: TodaySale
  }
  ]
  const payment = [
    {
      id: 1,
      number: dashboardCount.data.todayPayments,
      text: "Today’s sales ",
      icon: OrderIcon,
      status: 'payment'
    },
    {
      id: 2,
      number: dashboardCount.data.weeklyPayments,
      text: "Weekly sales",
      icon: TodaySale,
      status: 'payment'
    },
    {
      id: 3,
      number: dashboardCount.data.allSales,
      text: "All sales",
      icon: Weeklysale,
      status: 'payment'
    }
  ]
  const product = [
    {
      id: 1,
      number: dashboardCount.data.activeProducts,
      text: "Active",
      icon: Weeklysale,
    },
    {
      id: 2,
      number: dashboardCount.data.inActiveProducts,
      text: "Inactive ",
      icon: Weeklysale,
    },
    // {
    //   id: 3,
    //   number: 10,
    //   text: "Out of Stock",
    //   icon: Weeklysale,
    // },
    // {
    //   id: 4,
    //   number: 30,
    //   text: "Drafted",
    //   icon: Weeklysale,
    // },
    // {
    //   id: 5,
    //   number: 100,
    //   text: "Low Stock",
    //   icon: Weeklysale,
    // }
  ]
  // const returnProduct = [
  //   {
  //     id: 1,
  //     number: 90,
  //     text: "Return requests",
  //     icon: Weeklysale,
  //   },
  //   {
  //     id: 2,
  //     number: 10,
  //     text: "Completed ",
  //     icon: Weeklysale,
  //   },
  // ]
  const inquiries = [
    {
      id: 1,
      number: dashboardCount.data.customerInquires,
      text: "Customer Inquires",
      icon: InquiryIcon,
    }
  ]

  const contactStepsEcommerce = [
    {
      id: 0,
      name: "Profile",
      number: 1,
      title: "Manage Profile",
      description: "Fill in your ecommerce details to complete your website profile.",
      button: "Manage Profile",
      redirect: "/ecommerce/businessInfo",
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
      name: "Add Product",
      number: 4,
      title: "Add Product",
      description: "Please add a product to move to the next step.",
      button: "Add Product",
      redirect: "/createProduct",
      checkWork: "addProduct",
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
      description: " Fill in your ecommerce details to complete your website profile.",
      button: "Add Domain",
      redirect: "/ecommerce/businessInfo",
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
      name: "Add Product",
      number: 4,
      title: "Add Product",
      description: "Please add a product to move to the next step.",
      button: "Add Product",
      redirect: "/ecommerce/create-product",
      checkWork: "addProduct",
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

  const themeName = "oval";
  const websiteUrl = "https://abeauty.edneed.com/";

  const history = useNavigate();
  const dispatch = useDispatch();


  const addProductHandler = () => {

    history('/ecommerce/create-product');
  }

  useEffect(() => {
    dispatch(getInstituteData(users.user_business, users.user_business_type))
  }, [dispatch, users.user_business, users.user_business_type])
  useEffect(() => {
    dispatch(getDomainDetails(users._id, users.user_business, users.user_business_type))
  }, [dispatch, users._id, users.user_business, users.user_business_type])
  const openSubDomain = () => {
    window.open(
      `https://${businessData.domain}`
    );
  };
  const ProceedToBook = () => {

    history(`/myCart/${postedDomainDetailsData.domain}`);
  };

  useEffect(() => {
    dispatch(dashboardProductCount(users.user_business));
  }, [dispatch, users.user_business])
  const [stepperComplete, setStepperComplete] = useState(false)
  useEffect(() => {
    if (users.user_dashboard_stepper.addBuisnessDetails && users.user_dashboard_stepper.addEmail && users.user_dashboard_stepper.addContact
      && users.user_dashboard_stepper.addTemplate && users.user_dashboard_stepper.addDomain && users.user_dashboard_stepper.addProduct) {
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
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <React.Fragment>
      <div className='dashBoard-home-container'>
        {/* <h1 className='text-xl w-600'>Welcome, <span className='capitalize'>{users.user_fullname}</span></h1>
        <p className='text-xxs w-400'>It’s personalized for your site type:	&nbsp;Online Store  <span className='dashboard-type-text'>Ecommerce</span></p> */}
        <div className="deshwelcome-wrapper">
          <div>
            <h1 className=" text-md base w-600">Welcome, <span className='capitalize'>{users.user_fullname}</span></h1>
            <p className="text-xxs base w-400">It’s personalized for your site type:	&nbsp;Online Store  <span className='dashboard-type-text'>Ecommerce</span></p>
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
        {businessDataSuccess && !businessData.domain && postedDomainDetailsSuccess && postedDomainDetailsData === null ? (
          <ProceedToBookStrip title="Buy Domain right now !" btnName="Buy Domain" handleClick={BookPrivateDomain} />
        ) : ("")}


        <div className='dashBoard-upper-container'>
          <div>
            <TemplateChoose domain={businessData.domain} themeName={themeName} websiteUrl={websiteUrl} />
          </div>
          {!users.user_institute_isOld && !stepperComplete ? (
            <Stepper ContactSteps={contactStepsEcommerce}
              Emailsteps={emailStepsEcommerce} stepperComplete={stepperComplete} />
          ) : (
            <StepperMarketing />
          )

          }
          {/* multiform timeline  */}
          {/* <div className='dashboard-top-form-wrapper'>
            <h3 className='text-s w-600'>Steps to set up your online store:</h3>
            <div className='multi-form-container'>
              <div className='multi-form-left'>
                {
                  formSteps.map((step) => {
                    return (
                      <div className='multi-container-content-wrap' key={step.id}>
                        <div className='steper-name'><p className='text-xxs w-400 gray stepDescription'>{step.name}</p></div>
                        <div className='multiform-div '>
                          <span className='text-xs primary w-500 inner-mulultidiv '>{step.number}</span>
                          <div className='dd'> <div className={`${step === formSteps[formSteps.length - 1] ? 'timelineLineDisplayNone' : 'timelineLine'}`}></div></div>

                        </div>

                      </div>
                    )
                  })
                }
              </div>
              <div className='multi-form-right'>
                <div className='multi-form-content-wrap mt-25'>
                  <h1 className='text-xs w-600'>Add a product</h1>
                  <p className='mt-10 text-xxs w-400 '>Please add a product to move to the next step</p>
                  <AppLink className="button button-primary mt-30 btn-sm" to={'/ecommerce/create-product'}>Add Product</AppLink>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        {/* order section */}
        <div className='section-container'>
          <h3 className='order-heading'>Orders</h3>
          <div className='order-summarry-wrapper'>
            {
              orders.map((data) => {
                return (

                  <EcommerceStatisticsBlock key={data.id} data={data} />
                )
              })
            }
          </div>
        </div>
        {/* Payment */}
        <div className='section-container'>
          <h3 className='order-heading'>Payment</h3>
          <div className='order-summarry-wrapper'>
            {
              payment.map((data) => {
                return (
                  <EcommerceStatisticsBlock key={data.id} data={data} />
                )
              })
            }

          </div>
        </div>
        {/* orders */}
        <div className='section-container'>
          <h3 className='order-heading'>Product</h3>
          <div className='order-summarry-wrapper'>
            {
              product.map((data) => {
                return (
                  <EcommerceStatisticsBlock key={data.id} data={data} />
                )
              })
            }
          </div>
        </div>
        {/* return product */}
        {/* <div className='section-container'>
          <h3 className='order-heading'>Return</h3>
          <div className='order-summarry-wrapper'>
            {
              returnProduct.map((data) => {
                return (
                  <EcommerceStatisticsBlock key={data.id} data={data} />
                )
              })
            }
          </div>
        </div> */}

        {/* Inquiries */}
        <div className='section-container'>
          <h3 className='order-heading'>Inquiries</h3>
          <div className='order-summarry-wrapper'>
            {
              inquiries.map((data) => {
                return (
                  <EcommerceStatisticsBlock key={data.id} data={data} />
                )
              })
            }
          </div>
        </div>
        {/* <div className='dashbord-adddomain-container'>
          <div className='adddomain-section-left'>
            <h3 className='text-regf w-600 '>Strengthen your brand with a custom domain</h3>
            <p className='mt-8 text-xs gray w-400 dashPara '>Your current sub-domain is <span>example.com</span> but you can add a custom domain to help customers find your online store. A custom domain name can not only build trust with your audience — it can also strengthen your brand and drive traffic to your site</p>
            <button className='button button-primary text-xxs btn-sm w-400 mt-40'>Add domain</button>
          </div>
          <div className='adddomain-section-right'>
            <img src={CustomDomain} alt="man with laptop" className='img-response' />
          </div>
        </div>
        <div className='dashbord-adddomain-container mt-25'>
          <div className='adddomain-section-left'>
            <h3 className='text-regf w-600 '>
              Explore store design templates
            </h3>
            <p className='mt-8 text-xs gray w-400 dashPara '>Shine a spotlight on your online store and bring your brand to life. Our attractive design templates work to make your online business attractive and easy to use. </p>
            <button className='button button-primary btn-sm text-xxs w-400 mt-40'>Explore Now</button>
          </div>
          <div className='adddomain-section-right'>
            <img src={CustomTemplte} alt="man with laptop" className='img-response' />
          </div>
        </div>

        <div className='dashboard-tut-container mt-25'>
          <img src={VideoImage} alt="" />
          <img src={VideoIcon} alt="" className='videoIconImage' />
          <div className='tut-right-section'>
            <h3 className='text-regf w-600 '>Learn more about your store with guided video tutorials</h3>
            <p className='mt-8 text-xs gray w-400 dashPara '>Learn all you need to know about your online store with Edneed’s e-commerce video guides.
            </p>
            <button className='button button-o-silver button-xs mgray btn-sm w-400  w-400 mt-40 btn-w-400'>Explore Youtube channel</button>
          </div>
        </div>
        <div className='dashboard-tut-container mt-25'>
          <div className='readingbook-section-left'>
            <img src={bookImage} alt="" className='img-response bookReading' />
          </div>
          <div className='tut-right-section'>
            <h3 className='text-regf w-600 '>Get to know Edneed with guided video tutorials</h3>
            <p className='mt-8 text-xs gray w-400 dashPara '>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor idunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex eacommodo consequat.</p>
            <div className='mt-40 tut-button-container'>
              <button className='button button-o-silver button-xs btn-sm mgray w-400 btn-w-400'>Read blog post </button>
              <p className='ashPara w-400 text-xs'><span>9 min ago</span></p>
            </div>
          </div>
        </div>

        <div className='dashboard-slect-plan-wrap mt-25'>
          <p className='text-xs w-400'>Give your business the time it needs to grow. Select from a wide range of plans and get savings up to 50%.
          </p>
          <button className='button btn-slect-plan button-xs text-xxs'>Select a plan</button>

        </div> */}


      </div>
      {/* container ends */}
      <ContactEmailVerify verifyState={"addEmail"} testModals={testModals} closeMainPopUp={() => closeMainPopUp()} />
    </React.Fragment >
  )
}

export default DashboardHome