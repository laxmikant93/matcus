/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';
import './home.scss';
import WB from "./HomeIcons/product1.png";
import LMS from "./HomeIcons/product2.png";
import DM from "./HomeIcons/product3.png";
import ReactGA from "react-ga";
const EdProducts = () => {

    /*   ReactGA.event({
          category: "Header",
          action: "click",
       label:"Home_Header_Product",
        })
      
   */
    return (
        <>
            <div className="edContainer">
                <div className={'ed_products_page_wrap'}>
                    <div className={'edneed_products_head'}>
                        <h3 className={`primary w-600 text-xs`} id="dmRef">EDNEED'S PRODUCTS</h3>
                        <h4 className={`base w-600`}>Essential Tools to Support Your Digital Transformation</h4>
                    </div>
                    <div className="ed_product_Wb">
                        <div className="ed_product_Cnt">
                            <h6>Website Builder Tool With Dynamic Options</h6>
                            <span className={`${'ed_lms_cnt_divider'} ${'a'}`}></span>
                            <ul className={'ed_products_list_grid_item_list a'}>
                                <li>Free website*</li>
                                <li>No coding required</li>
                                <li>Build Your Website Within 2 Minutes</li>
                                <li>Support Multiple Platforms</li>
                                <li>Payment Modes For The Website</li>
                            </ul>
                        </div>
                        <div className="ed_product_Img">
                            <img src={WB} alt="" />
                        </div>
                    </div>
                    <div className="ed_product_LMS">
                        <div className="ed_product_Img">
                            <img src={LMS} alt="" />
                        </div>
                        <div className="ed_product_Cnt s">
                            <h6>Learning Management System (LMS)</h6>
                            <span className={`${'ed_lms_cnt_divider'} ${'s'}`}></span>
                            <ul className={'ed_products_list_grid_item_list s'}>
                                <li>End-to-end institute management</li>
                                <li>Track teachers and students</li>
                                <li>Online tests and assignments</li>
                                <li>Upload & share study material</li>
                                <li>Digital report cards</li>
                            </ul>
                        </div>
                    </div>
                    <div className="ed_product_DM">
                        <div className="ed_product_Cnt t">
                            <h6>Digital Marketing to
                                grow your brand</h6>
                            <span className={`${'ed_lms_cnt_divider'} ${'t'}`}></span>
                            <ul className={'ed_products_list_grid_item_list t'}>
                                <li>Rank Your School/Institute&apos;s Website</li>
                                <li>Grow Your Brand</li>
                                <li>Multiple Social Media Accounts</li>
                                <li>Social Media Posts Creation</li>
                                <li>Advertisements for Facebook and Instagram</li>
                            </ul>
                        </div>
                        <div className="ed_product_Img">
                            <img src={DM} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EdProducts