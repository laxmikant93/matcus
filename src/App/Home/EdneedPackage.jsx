/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import './home.scss';

import PackageWB from "./HomeIcons/package-wb.png";
import PackageLMS from "./HomeIcons/package-lms.png";
import packageDM from "./HomeIcons/package-dm.png";
import AppLink from '../../Common/AppLink';
import ReactGA from "react-ga";
const EdneedPackage = () => {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
    });

    const callUs1 = () => {
        ReactGA.event({
            category: "CallUs",
            action: "click",
            label: "Home_wb",
        })
    }

    const callUs2 = () => {
        ReactGA.event({
            category: "CallUs",
            action: "click",
            label: "Home_lm",
        })
    }

    const callUs3 = () => {
        ReactGA.event({
            category: "CallUs",
            action: "click",
            label: "Home_dm",
        })
    }




    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
            });
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        <div className={'edneed_package_wrap'}>
            <div className={'edneed_package_head'}>
                <h5>Our Featured Packages</h5>
                <h6 className={`primary`}>Select a plan that is right for you</h6>
            </div>
            <div className={'edneed_package_grid'}>
                <div className={'edneed_package_grid_item'}>
                    <div className={'edneed_package_grid_item_body'}>
                        <div className={'package_item_icon'}>
                            <img className="img-fluid" src={PackageWB} alt="" />
                        </div>
                        <div className={'package_item_head'}>
                            Website Builder
                        </div>
                        <ul className={'package_item_cnt_list'}>
                            <li>No coding required</li>
                            <li>Attractive & dynamic website</li>
                            <li>Highly customizable</li>
                            <li>SSL secure website</li>
                            <li>SEO</li>
                        </ul>
                    </div>
                    <div className={'edneed_package_grid_item_btn'}>
                        {
                            windowSize.width <= 600 ?
                                <a href="tel:8368214889" className={'button button-secondary button-block'}>Call us now</a>
                                :
                                <a href="/contact" className={'button button-secondary button-block'} onClick={() => callUs1()}>Call us now</a>
                        }
                    </div>        <span className={'package_item_discount_btn'}>20 % OFF*</span>
                </div>
                <div className={'edneed_package_grid_item'}>
                    <div className={'edneed_package_grid_item_body'}>
                        <div className={'package_item_head_wrapper'}>
                            <div className={'package_item_icon'}>
                                <img className="img-fluid" src={PackageLMS} alt="" />
                            </div>
                            <div className={'package_item_head'}>
                                Learning Management System
                            </div>
                        </div>
                        <ul className={'package_item_cnt_list'}>
                            <li>Online classes</li>
                            <li>Online tests</li>
                            <li>Online assignments</li>
                            <li>Study material</li>
                            <li>Attendance & leave management</li>
                            <li>Learning community</li>
                            <li>Fee management</li>
                        </ul>
                    </div>
                    <div className={'edneed_package_grid_item_btn'}>
                        {
                            windowSize.width <= 600 ?
                                <a href="tel:8368214889" className={'button button-secondary button-block'}>Call us now</a>
                                :
                                <a href="/contact" className={'button button-secondary button-block'} onClick={() => callUs2()}>Call us now</a>
                        }
                    </div>
                    <span className={'package_item_discount_btn'}>80 % OFF*</span>
                </div>
                <div className={'edneed_package_grid_item'}>
                    <div className={'edneed_package_grid_item_body'}>
                        <div className={'package_item_icon'}>
                            <img className={'package_icon img-fluid'} src={packageDM} alt="" />
                        </div>
                        <div className={'package_item_head'}>
                            Digital Marketing
                        </div>
                        <ul className={'package_item_cnt_list'}>
                            <li>SEO optimized social media posts</li>
                            <li>Advertisements for Facebook and Instagram</li>
                            <li>Multiple Social Media Accounts</li>
                            <li>Rank Your School/Institute&apos;s Website</li>
                            <li>Build Your Institute as A Brand</li>
                        </ul>
                    </div>
                    <div className={'package_item_head'}>

                    </div>
                    <div className={'edneed_package_grid_item_btn'}>

                        {
                            windowSize.width <= 600 ?
                                <a href="tel:8368214889" className={'button button-secondary button-block'}>Call us now</a>
                                :
                                <a href="/contact" className={'button button-secondary button-block'} onClick={() => callUs3()}>Call us now</a>
                        }
                    </div>        <span className={'package_item_discount_btn'}>30 % OFF*</span>
                </div>
            </div>
        </div>
    )
}

export default EdneedPackage