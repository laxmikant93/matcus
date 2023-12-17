/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';
import './home.scss';

import edProduct1 from "./HomeIcons/ed-product-1.webp";
import edProduct2 from "./HomeIcons/ed-product-2.webp";
import edProduct3 from "./HomeIcons/ed-product-3.webp";
import edCalenderIcon from "./HomeIcons/calender.png";
import AppLink from '../../Common/AppLink';
import ReactGA from "react-ga";

const EdneedProducts = () => {
    // const srvRef = useRef(null);
    // useEffect(() => {
    //     document.addEventListener("serviceSelection", () => {
    //         srvRef.current.scrollIntoView()
    //     })
    //     document.addEventListener("DM_Selection", () => {
    //         srvRef.current.scrollIntoView()
    //     })
    // }, [])

    const bookDemo = () => {
        ReactGA.event({
            category: "Products_Demo",
            action: "click",
            label: "Home_Demo",
        })

    }

    return (
        <>
            <div className={'edneed_products_wrap'} id="section-1">
                <div className={'edneed_products_head'}>
                    <h3 className={`primary w-600 text-xs`} id="dmRef">EDNEED'S PRODUCTS</h3>
                    <h4 className={`base w-600`}>Essential Tools to Support Your Digital Transformation</h4>
                </div>
                <div className={'ed_products_list_grid'}>
                    <div className={'ed_products_list_grid_item'}>
                        <div className={'ed_products_list_grid_item_banner'}>
                            <img className="img-fluid" src={edProduct1} alt="Website Builder Tool With Dynamic Options" />
                        </div>
                        <p className={'ed_products_list_grid_item_head'}>
                            Website Builder Tool with dynamic options
                        </p>
                        <ul className={'ed_products_list_grid_item_list'}>
                            <li>Free website*</li>
                            <li>No coding required</li>
                            <li>Build Your Website Within 2 Minutes</li>
                            <li>Support Multiple Platforms</li>
                            <li>Payment Modes For The Website</li>
                        </ul>
                    </div>
                    <div className={'ed_products_list_grid_item'}>
                        <div className={'ed_products_list_grid_item_banner'}>
                            <img className="img-fluid" src={edProduct2} alt="Website Builder Tool With Dynamic Options" />
                        </div>
                        <p className={'ed_products_list_grid_item_head'}>
                            Learning Management System (LMS)
                        </p>
                        <ul className={'ed_products_list_grid_item_list'}>
                            <li>End-to-end institute management</li>
                            <li>Track teachers and students</li>
                            <li>Online tests and assignments</li>
                            <li>Upload & share study material</li>
                            <li>Digital report cards</li>
                        </ul>
                    </div>
                    <div className={'ed_products_list_grid_item'}>
                        <div className={'ed_products_list_grid_item_banner'}>
                            <img className="img-fluid" src={edProduct3} alt="Website Builder Tool With Dynamic Options" />
                        </div>
                        <p className={'ed_products_list_grid_item_head'}>
                            Digital Marketing to grow your brand
                        </p>
                        <ul className={'ed_products_list_grid_item_list'}>
                            <li>Rank Your School/Institute&apos;s Website</li>
                            <li>Grow Your Brand</li>
                            <li>Multiple Social Media Accounts</li>
                            <li>Social Media Posts Creation</li>
                            <li>Advertisements for Facebook and Instagram</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={'ed_try_it_free'}>
                <div className={'ed_try_it_free_button'}>
                    <AppLink to="/request-demo" onClick={() => bookDemo()}><img src={edCalenderIcon} alt="Calender Icon" width="18" height="20" />Book a Free Demo</AppLink>
                </div>
            </div>
        </>
    )
}

export default EdneedProducts