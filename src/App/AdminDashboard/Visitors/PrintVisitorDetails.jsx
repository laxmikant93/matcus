/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../../../Common/Breadcrumb';
import moment from 'moment';
import BreadcrumbItem from '../../../Common/Breadcrumb/BreadcrumbItem';
import GrayAuthTheme from '../../../Common/Theme/GrayAuthTheme';
import { getSingleVisitor, resetSingleVisitor } from '../../../store/actions/visitorManagement';
import BackgroundDefault from "../../../assets/images/img/BackgroundDefault.png";
import './guardVistor.style.scss'
import ImageViewer from '../../../Common/ImageViewer';
const PrintVisitorDetails = () => {
  const { _id, state } = useParams();

  const printRef = useRef();
  let history = useNavigate();
  let dispatch = useDispatch();
  const { visitor, visitorData } = useSelector((state) => {
    return {
      visitor: state.visitorManagement.getSingleVisitor,
      visitorData: state.visitorManagement.getSingleVisitor.data
    };
  });

  useEffect(() => {
    dispatch(getSingleVisitor(_id));
  }, [dispatch, _id])

  useEffect(() => {
    return () => {
      dispatch(resetSingleVisitor());
    }
  }, [dispatch])

  const handlePrint = () => {
    window.print();
  }

  return (
    <React.Fragment>
      {
        state === "print" ? "" :
          <Breadcrumb>
            <BreadcrumbItem to="/" title="Dashboard" />
            <BreadcrumbItem to="/visitor-management-list" title="Visitors" />
            <BreadcrumbItem to={`/view-visitor-detail/${_id}/${state}`} title="View Visitor Details" />
          </Breadcrumb>
      }
      <React.Fragment>
        <div className='row mt-30 printGuestDetailsWrap '>
          <div className="col-12 col-sm-4">
            <div className="box guestProfileImg">
              {
              
                  <ImageViewer object={visitorData.photo} defaultImage={BackgroundDefault}/>
              }
            </div>
          </div>
          <div className=" col-12 col-sm-4">

          </div>
          <div class="col-xs-12 col-sm-8">
            <div class="box">

            </div>
            <div className="col-xs-12 col-sm-8">
              <div className="box">
                <div className="row visitorDetailspd">
                  <div className=" col-xs-12 col-sm-12 mt-20">
                    <p className='text-xs w-600 primary mb-20'>Guest Details</p>
                  </div>
                  <div className="  col-xs-6 col-sm-6  ">
                    <div className='detailsItems'>
                      <label className='w-500 mgray text-xxs'>Name:</label>
                      <p className="text-xs base w-500">{visitorData.name}</p>
                    </div>
                  </div>
                  <div className=" col-xs-6  col-sm-6 ">
                    <div className='detailsItems'>
                      <label className='w-500 mgray text-xxs'>Email:</label>
                      <p className="text-xs base w-500">{visitorData.visitor_email}</p>
                    </div>
                  </div>
                  <div className=" col-xs-6 col-sm-6">
                    <div className='detailsItems'>
                      <label className='w-500 mgray text-xxs'>Contact No:</label>
                      <p className="text-xs base w-500">
                        {visitorData.visitor_contact_no ? `${visitorData.visitor_country_code}-${visitorData.visitor_contact_no}` : ""}
                      </p>
                    </div>
                  </div>
                  <div className=" col-xs-6 col-sm-6">
                    <div className='detailsItems'>
                      <label className='w-500 mgray text-xxs'>Guest Count:</label>
                      <p className="text-xs base w-500">
                        {visitorData.no_of_visit_person}
                      </p>
                    </div>
                  </div>
                  <div className=" col-xs-6 col-sm-6">
                    <div className='detailsItems'>
                      <label className='w-500 mgray text-xxs'>Check-In:</label>
                      {visitorData.check_in ?
                        <>
                          <p className="text-xs base w-500">
                            {moment(visitorData.check_in).format("DD-MM-YYYY")} ,
                          </p>
                          <p className="text-xs base w-500">
                            {moment(visitorData.check_in).format("hh:mm a")}
                          </p>
                        </>
                        : ""
                      }
                    </div>
                  </div>
                  <div className=" col-xs-6 col-sm-6">
                    <div className='detailsItems'>
                      <label className='w-500 mgray text-xxs' >Check-Out:</label>
                      {visitorData.check_out ?
                        <>
                          <p className="text-xs base w-500">
                            {moment(visitorData.check_out).format("DD-MM-YYYY")},
                          </p>
                          <p className="text-xs base w-500">
                            {moment(visitorData.check_out).format("hh:mm a")}
                          </p>
                        </>
                        : ""
                      }
                    </div>
                  </div>
                  <div className=" col-xs-12">
                    <div className='detailsItems'>
                      <label className='w-500 mgray text-xxs'>Visit Reason:</label>
                      <p className="text-xs base w-500"

                        dangerouslySetInnerHTML={{
                          __html:
                            visitorData?.visit_reason
                        }}
                      ></p>
                      {/* <p className="text-xs base w-500">{visitorData.visit_reason}</p> */}
                    </div>
                    <div className='detailsItems'>
                      <label className='w-500 mgray text-xxs'>Status:</label>
                      <p className="text-xs base w-500">{visitorData.status}</p>
                    </div>
                  </div>
                </div>
                <div className="row mt-20 visitorDetailspd ">
                  <div className=" col-xs-12">
                    <p className='text-xs w-600 primary mb-10'>Host Details</p>
                  </div>

                  <div className="col-xs-6 col-sm-6">
                    <div className='detailsItems'>
                      <label className='w-500 mgray text-xxs'> Name</label>
                      <p className="text-xs base w-500">{visitorData.fullname}</p>
                    </div>
                  </div>
                  <div className=" col-xs-6 col-sm-6">
                    <div className='detailsItems'>
                      <label className='w-500 mgray text-xxs'>Email</label>
                      <p className="text-xs base w-500">{visitorData.email}</p>
                    </div>
                  </div>
                  <div className=" col-xs-6 col-sm-6">
                    <div className='detailsItems'>
                      <label className='w-500 mgray text-xxs'>Contact no.</label>
                      <p className="text-xs base w-500">{visitorData.contact}</p>
                    </div>
                  </div>

                </div>
                <div className="col-xs-12">
                  <div className="visitorListPrintButtton">
                    {state === "view" ? "" :
                      <button
                        className="button button-base btn-sm"
                        title="Print"
                        ref={printRef}
                        type="button"
                        onClick={handlePrint}
                      >
                        Print Details
                      </button>
                    }
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    </React.Fragment>
  );
}

export default PrintVisitorDetails;
