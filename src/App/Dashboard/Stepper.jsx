import React, { useRef, useState } from 'react';
import './stepper.scss';
import CheckGreen from './EcommerceDashboard/assets/icons/checkGreen.svg';
import { useSelector } from 'react-redux';
import AppLink from '../../Common/AppLink';
import { useEffect } from 'react';
import Modals from '../../Common/Modals';
import ModalsBody from '../../Common/Modals/ModalsBody';
import ModalsHeader from '../../Common/Modals/ModalsHeader';
import ContactEmailVerify from './ContactEmailVerify';
import { useDispatch } from 'react-redux';
import { DashboardStepperAddTemplate, updateDashboardStepper } from '../../store/actions/user';
import VerifyEmailPop from './VerifyEmailPop';
// import StepperMarketing from './StepperMarketing';

const Stepper = ({ ContactSteps, Emailsteps, stepperComplete }) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => {
    return {
      user: state.user,
    };
  });
  const [index, setIndex] = useState(0);

  useEffect(() => {
    handelSectionStartup()
  }, [])

  // stepper complated
  // const [stepperIscompated, setStepperIsCompated] = useState(true);

  const handelSectionStartup = () => {
    if (user.user_business_type === "LMS") {
      if (user.user_signup_method === "Email") {
        for (let i = 0; i < ContactSteps.length; i++) {
          if (Object.keys(user.user_dashboard_stepper).includes(ContactSteps[i].checkWork) && user.user_dashboard_stepper[ContactSteps[i].checkWork]) {
          } else {
            setIndex(i)
            // setCompletedStepper(false)
            break
          }
        }
      } else {
        for (let i = 0; i < Emailsteps.length; i++) {
          if (Object.keys(user.user_dashboard_stepper).includes(Emailsteps[i].checkWork) && user.user_dashboard_stepper[Emailsteps[i].checkWork]) {
          } else {
            setIndex(i)
            break
          }
        }
      }

    } else {
      if (user.user_signup_method === "Email") {
        for (let i = 0; i < ContactSteps.length; i++) {
          if (Object.keys(user.user_dashboard_stepper).includes(ContactSteps[i].checkWork) && user.user_dashboard_stepper[ContactSteps[i].checkWork]) {
          } else {
            setIndex(i)
            // setCompletedStepper(false)
            break
          }
        }
      } else {
        for (let i = 0; i < Emailsteps.length; i++) {
          if (Object.keys(user.user_dashboard_stepper).includes(Emailsteps[i].checkWork) && user.user_dashboard_stepper[Emailsteps[i].checkWork]) {
          } else {
            setIndex(i)
            // setCompletedStepper(false)
            break
          }
        }
      }
    }

  }
  const handelStepperChange = (id) => {
    setIndex(id)
  }

  // const [completedStepper, setCompletedStepper] = useState(true);
  // const [showModalPopUp, setshowModalPopUp] = useState(false);
  const [verifyState, setVerifyState] = useState("");
  const testModals = useRef(null);

  const OpenModalPopUp = (state) => {
    testModals.current.open()
    setVerifyState(state);
    // setshowModalPopUp(!showModalPopUp)
  }
  const closeMainPopUp = () => {
    setVerifyState("");
    testModals.current.close()
    // setshowModalPopUp(false);
  }
  const AddTemplateEcommerce = () => {
    window.open(
      `https://${user.user_institute_institute_subdomain}.edneed.com`
    );
    let data = {
      ...user.user_dashboard_stepper, addTemplate: true
    }
    dispatch(updateDashboardStepper(data))
    let stepperData = {
      addTemplate: true,
      condition: "SelectTemplate",
      industry: user.user_business_type,
      institute: user.user_institute,
      owner: user._id
    }

    dispatch(DashboardStepperAddTemplate(stepperData))
  }
  const pikachu = (id, val) => {
    if (user.user_dashboard_stepper.addBuisnessDetails && user.user_dashboard_stepper.addEmail && user.user_dashboard_stepper.addContact
      && user.user_dashboard_stepper.addTemplate && user.user_dashboard_stepper.addDomain && (user.user_dashboard_stepper.addClassroom || user.user_dashboard_stepper.addProduct || user.user_dashboard_stepper.addService)) {
    } else {
      if (val && index == id) {
        setIndex(index + 1)
      }
    }
  }

  return (
    <React.Fragment>
      {/* multiform timeline  */}

      <div className='dashboard-top-form-wrapper'>
        {
          user.user_business_type === "LMS" ? (
            <>
              <h3 className='text-s w-600'>Setup your institute online step-by-step</h3>
              <hr className='mt-10 stepper-hr' />
            </>


          ) : (
            <>
              <h3 className='text-s w-600'>Steps to set up your online store:</h3>
              <hr className='mt-10 stepper-hr' />
            </>


          )
        }
        <div className='multi-form-container'>
          <div className='multi-form-left'>
            {user.user_signup_method === "Email" ? (
              <>
                {
                  ContactSteps.map((step, key) => {
                    return (
                      <>

                        {Object.keys(user.user_dashboard_stepper).includes(step.checkWork) && user.user_dashboard_stepper[step.checkWork] ? (

                          <div className='multi-container-content-wrap' key={step.id}>
                            {!stepperComplete && pikachu(step.id, user.user_dashboard_stepper[step.checkWork])}
                            <div className='steper-name'><p className='text-xxs w-400 gray stepDescription'>{step.name}</p></div>
                            {/* when step successful add 'stepSuccessful' class below div to turn circle green */}
                            {/* add "active" class when its active  */}
                            {/* <div className={`multiform-div stepSuccessful`}> */}
                            {/* when step is successful span will hide image is shown vice virsa */}
                            {/* <img src={CheckGreen} alt="green check" className='inner-mulultidiv' /> */}
                            {/* add "active" class when its active  */}
                            <div className={`multiform-div stepSuccessful`}>
                              {/* when step is successful span will hide image is shown vice virsa */}
                              <img src={CheckGreen} alt="green check" className='inner-mulultidiv' />
                              {/* add "active" class when its active  */}
                              {/* <span className={`text-xs primary w-500 inner-mulultidiv ${index === step.id ? "active" : ""}`} onClick={() => handelStepperChange(step.id)}>{step.number}</span> */}
                              <div className='dd'> <div className={`${step === ContactSteps[ContactSteps.length - 1] ? 'timelineLineDisplayNone' : 'timelineLine'}`}></div></div>
                            </div>
                            {/* </div> */}
                          </div>
                        ) : (
                          <div className='multi-container-content-wrap' key={step.id} >
                            <div className='steper-name'><p className={`text-xxs w-400 gray stepDescription ${index === step.id ? "primary" : ""}`} onClick={() => handelStepperChange(step.id)}>{step.name}</p></div>
                            {/* when step successful add 'stepSuccessful' class below div to turn circle green */}
                            {/* add "active" class when its active  */}
                            <div className={`multiform-div ${index === step.id ? "active" : ""}`} onClick={() => handelStepperChange(step.id)}>
                              {/* when step is successful span will hide image is shown vice virsa */}
                              {/* <img src={CheckGreen} alt="green check" className='inner-mulultidiv' /> */}
                              {/* add "active" class when its active  */}
                              <span className={`text-xs primary w-500 inner-mulultidiv ${index === step.id ? "active" : ""}`} onClick={() => handelStepperChange(step.id)}>{step.number}</span>
                              <div className='dd'> <div className={`${step === ContactSteps[ContactSteps.length - 1] ? 'timelineLineDisplayNone' : 'timelineLine'}`}></div></div>
                            </div>
                          </div>

                        )
                        }
                      </>
                    )

                  })}
              </>
            ) : (
              <>
                {
                  Emailsteps.map((step, key) => {
                    return (
                      <>

                        {Object.keys(user.user_dashboard_stepper).includes(step.checkWork) && user.user_dashboard_stepper[step.checkWork] ? (
                          <div className='multi-container-content-wrap' key={step.id} >
                            {!stepperComplete && pikachu(step.id, user.user_dashboard_stepper[step.checkWork])}
                            <div className='steper-name'><p className='text-xxs w-400 gray stepDescription'>{step.name}</p></div>
                            {/* when step successful add 'stepSuccessful' class below div to turn circle green */}
                            {/* add "active" class when its active  */}
                            <div className={`multiform-div stepSuccessful`}>
                              {/* when step is successful span will hide image is shown vice virsa */}
                              <img src={CheckGreen} alt="green check" className='inner-mulultidiv' />
                              {/* add "active" class when its active  */}
                              {/* <span className={`text-xs primary w-500 inner-mulultidiv ${index === step.id ? "active" : ""}`} onClick={() => handelStepperChange(step.id)}>{step.number}</span> */}
                              <div className='dd'> <div className={`${index === Emailsteps[Emailsteps.length - 1] ? 'timelineLineDisplayNone' : 'timelineLine'}`}></div></div>
                            </div>
                          </div>
                        ) : (
                          <div className='multi-container-content-wrap' key={step.id} >
                            <div className='steper-name'><p className={`text-xxs w-400 gray stepDescription ${index === step.id ? "primary" : ""}`} onClick={() => handelStepperChange(step.id)}>{step.name}</p></div>
                            {/* when step successful add 'stepSuccessful' class below div to turn circle green */}
                            {/* add "active" class when its active  */}
                            <div className={`multiform-div ${index === step.id ? "active" : ""}`} onClick={() => handelStepperChange(step.id)}>
                              {/* when step is successful span will hide image is shown vice virsa */}
                              {/* <img src={CheckGreen} alt="green check" className='inner-mulultidiv' /> */}
                              {/* add "active" class when its active  */}
                              <span className={`text-xs primary w-500 inner-mulultidiv ${index === step.id ? "active" : ""}`} >{step.number}</span>
                              <div className='dd'> <div className={`${step === Emailsteps[Emailsteps.length - 1] ? 'timelineLineDisplayNone' : 'timelineLine'}`}></div></div>
                            </div>
                          </div>
                        )
                        }
                      </>
                    )
                  })}
              </>
            )
            }

          </div>
          {
            user.user_dashboard_stepper.addBuisnessDetails && user.user_dashboard_stepper.addEmail && user.user_dashboard_stepper.addContact
              && user.user_dashboard_stepper.addTemplate && user.user_dashboard_stepper.addDomain && (user.user_dashboard_stepper.addClassroom || user.user_dashboard_stepper.addProduct || user.user_dashboard_stepper.addService) ? (
              <>
                <div className='multi-form-right'>
                  <div className='multi-form-content-wrap mt-25'>
                    <h1 className='text-xs w-600'>Setup Completed</h1>
                    <p className='mt-10 text-xxs w-300 '>Good Job!
                    </p>
                    <p className='text-xxs w-300 mt-5'>You have completed all the steps and your website is ready.</p>
                    <h1 className='text-xs w-600 mt-10'>Let’s explore</h1>
                  </div>
                </div></>
            ) : (
              <>
                {user.user_signup_method === "Contact" ? (
                  <div className='multi-form-right'>
                    <div className='multi-form-content-wrap mt-25'>
                      <h1 className='text-xs w-600'>{Emailsteps[index]?.title}</h1>
                      <p className='mt-10 text-xxs w-300 '>{Emailsteps[index]?.description}</p>
                      {(Emailsteps[index]?.checkWork == "addEmail") || (Emailsteps[index]?.checkWork == "addDomain" && !user.user_dashboard_stepper["addEmail"]) || (Emailsteps[index]?.checkWork == "addClassroom" && !user.user_dashboard_stepper["addEmail"]) ? (

                        <button className='button button-primary mt-30 buttom-sm btn-sm' onClick={() => OpenModalPopUp("addEmail")}>{Emailsteps[index]?.button}</button>
                      ) : (
                        <>
                          {Emailsteps[index]?.checkWork == "addTemplate" && user.user_business_type === "Ecommerce" ? (
                            <button className='button button-primary mt-30 buttom-sm btn-sm' onClick={() => AddTemplateEcommerce()}>{Emailsteps[index]?.button}</button>
                          ) : (
                            <AppLink to={Emailsteps[index]?.redirect ? Emailsteps[index]?.redirect : "#"} className='button button-primary mt-30 buttom-sm btn-sm'>{Emailsteps[index]?.button}</AppLink>
                          )

                          }
                        </>
                      )
                      }

                    </div>
                  </div>
                ) : (
                  <div className='multi-form-right'>
                    <div className='multi-form-content-wrap mt-25'>
                      <h1 className='text-xs w-600'>{ContactSteps[index]?.title}</h1>
                      <p className='mt-10 text-xxs w-300 '>{ContactSteps[index]?.description}</p>
                      {ContactSteps[index]?.checkWork == "addContact" ? (
                        <button className='button button-primary mt-30 buttom-sm btn-sm' onClick={() => OpenModalPopUp("addContact")}>{ContactSteps[index]?.button}</button>
                      ) : (
                        <>
                          {ContactSteps[index]?.checkWork == "addTemplate" && user.user_business_type === "Ecommerce" ? (
                            <button className='button button-primary mt-30 buttom-sm btn-sm' onClick={() => AddTemplateEcommerce()}>{ContactSteps[index]?.button}</button>
                          ) : (
                            <AppLink to={ContactSteps[index]?.redirect ? ContactSteps[index]?.redirect : "#"} className='button button-primary mt-30 buttom-sm btn-sm'>{ContactSteps[index]?.button}</AppLink>
                          )
                          }
                        </>
                      )
                      }
                    </div>
                  </div>
                )
                }
              </>
            )
          }


          <ContactEmailVerify verifyState={verifyState} testModals={testModals} closeMainPopUp={() => closeMainPopUp()} />


          {/* all these comments are screen for each  level please check it */}
          {/* screen for add product */}
          {/* <div className='multi-form-content-wrap mt-25'>
                <h1 className='text-xs w-600'>Add a product</h1>
                <p className='mt-10 text-xxs w-400 '>Please add a product to move to the next step</p>
                <button className='button button-primary mt-30 btn-sm' >Add Product</button>
              </div> */}

          {/* screen for add Explore
  
                  {/* <div className='multi-form-content-wrap mt-25'>
                  <h1 className='text-xs w-600'>Select a design template</h1>
                  <p className='mt-10 text-xxs w-300 '>Please select a design template for your store.</p>
                  <button className='button button-o-silver btn-sm mgray w-400 btn-w-400 mt-30'>Custom Templates</button>
                </div> */}

          {/* screen for add business */}

          {/* <div className='multi-form-content-wrap mt-25'>
                  <h1 className='text-xs w-600'>Add your business details</h1>
                  <p className='mt-10 text-xxs w-300 '>Please fill in your business details.</p>
                  <button className='button button-o-silver button-xs mgray w-400 btn-w-400 mt-30'>Business Info</button>
                </div> */}
          {/* screen for add domain */}
          {/* <div className='multi-form-content-wrap mt-25'>
                <h1 className='text-xs w-600 almost-done'> <span><i className='icons-done '></i></span> <span> Almost Done</span> </h1>
                <p className='mt-10 text-xxs w-400 '>Please add your custom domain. I.e., www.example.com. It is an optional step but makes your store appear more professional to customers.</p>
                <button className='button button-primary mt-30 buttom-sm btn-sm'>Add Domain</button>
              </div> */}
        </div>
      </div>
    </React.Fragment >
  )
}

export default Stepper