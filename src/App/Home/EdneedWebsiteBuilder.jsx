/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';
import './home.scss';
import HomeSubscribeInput from './HomeSubscribeInput';

import heroHome from "./HomeIcons/hero_home.png"
import wb1 from "./WB_Icon/wb_1.svg";
import wb2 from "./WB_Icon/wb_2.svg";
import wb3 from "./WB_Icon/wb_3.svg";
import wb4 from "./WB_Icon/wb_4.svg";
import wb5 from "./WB_Icon/wb_5.svg";
import wb6 from "./WB_Icon/wb_6.svg";
import wb7 from "./WB_Icon/wb_7.svg";
import AppLink from '../../Common/AppLink';
const EdneedWebsiteBuilder = () => {

    const wbRef = useRef(null);
    useEffect(() => {
        document.addEventListener("WB_Selection", () => {
            wbRef.current.scrollIntoView()
        })
    }, [])
    return (
        <div className={'edneed_wb_wrap'} ref={wbRef} id="wbRef">
            <div className={`edContainer`}>
                <div className={'edneed_wb_head'}>
                    <h3 className={`primary w-600 text-xs`}>WEBSITE BUILDER TOOL</h3>
                    <h4 className={`base w-600`}>Create A Powerful Website In 2 Minutes With Edneed</h4>
                    <h5 className={`dgray text-xxs w-500 mt-10`}>Your website is your face on the internet. We make it easy to manage your institute&apos;s online presence.</h5>
                </div>
                <div className={'ed_wb_list_grid'}>
                    <div className={'ed_wb_list_grid_item'}>
                        <img src={wb1} alt="Zero Coding Required" />
                        <h5>Zero coding required</h5>
                        <p>Design your website without coding a single line.</p>
                    </div>
                    <div className={'ed_wb_list_grid_item'}>
                        <img src={wb2} alt="SEO Tools" />
                        <h5>SEO tools</h5>
                        <p>Make your website rank higher on Google search.</p>
                    </div>
                    <div className={'ed_wb_list_grid_item'}>
                        <img src={wb3} alt="SEO Tools" />
                        <h5>Device friendly interface</h5>
                        <p>Use your website on mobile, laptop, tablet, or computer.</p>
                    </div>
                    <div className={'ed_wb_list_grid_item'}>
                        <img src={wb4} alt="Website Builder Tool With Dynamic Options" />
                        <h5>Custom website</h5>
                        <p>Get the website name of your choice for your institution.</p>
                    </div>
                    <div className={'ed_wb_list_grid_item'}>
                        <img src={wb5} alt="Website Builder Tool With Dynamic Options" />
                        <h5>Free website</h5>
                        <p>Get ready to grow by getting a free sub-website.</p>
                    </div>
                    <div className={'ed_wb_list_grid_item'}>
                        <img src={wb6} alt="Website Builder Tool With Dynamic Options" />
                        <h5>Create your choice of theme</h5>
                        <p>Design a unique and attractive theme for your website.</p>
                    </div>
                    <div className={'ed_wb_list_grid_item'}>
                        <img src={wb7} alt="Website Builder Tool With Dynamic Options" />
                        <h5>Editable content</h5>
                        <p>Easily edit your content. No need to hire a website editor. </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EdneedWebsiteBuilder