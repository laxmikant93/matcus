/* eslint-disable no-unused-vars */
import React from 'react';
import './home.scss';

import PackageWB from "./HomeIcons/package-wb.png";
import PackageLMS from "./HomeIcons/package-lms.png";
import packageDM from "./HomeIcons/package-dm.png";
import HomeSubscribeInput from './HomeSubscribeInput';
const EdneedSubscribe = () => {
    return (
        <div className={'edneed_subscribe_custom'}>
            <div className={`edContainer`}>
                <div className={'edneed_subscribe_wrap'}>
                    <p className={'edneed_subscribe_head'}>Let’s digitize your educational
                        institute with Edneed. </p>
                    <div className="subscribe_input_form">
                        <HomeSubscribeInput />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EdneedSubscribe