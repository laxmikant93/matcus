/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import './home.scss';
// import SessionStorage from "../../Classes/SessionStorage";
import SessionStorage from "../../Classes/SessionStorage";
import {
    privateDomainOpt,
    privateDomain,
    privateDomainOfflineFlow,
    privateDomainTLDS,
} from "../../Constant/auth";

import subscribeIcons from "./HomeIcons/globe.svg"
import { useNavigate } from 'react-router-dom';
import FormInput from '../../Common/Form/FormInput';
import ValidationFile from '../Auth/ValidationFile';
import FormError from '../../Common/Form/FormError';
import ReactGA from "react-ga"


const HomeSubscribeInput = () => {
    const history = useNavigate()
    const [privateDomainSelect, setPrivatedomainSelect] = useState(true);

    const [domain, setDomain] = useState("");
    const [tlds, setTlds] = useState("");
    const [errorShow, setErrorShow] = useState(false);
    const [submit, setSubtmiShow] = useState(false);
    const [edneedError, setEdneedError] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault()
        setSubtmiShow(true);
        if (!domain || edneedError) {
            setErrorShow(true);
        } else {
            if (privateDomainSelect) {
                SessionStorage.setBool(privateDomainOpt, true);
            } else {
                SessionStorage.setBool(privateDomainOpt, false);
            }
            SessionStorage.setJson(privateDomainTLDS, tlds);
            SessionStorage.setBool(privateDomainOfflineFlow, true);
            SessionStorage.setJson("DomainName", domain);
            SessionStorage.setJson(privateDomain, domain);
            history("/register-institute");
        }

        ReactGA.event({
            category: "First_Fold",
            action: "click",
            label: "Home_Domain1",
        })
        ReactGA.event({
            category: "Footer",
            action: "click",
            label: "Home_Domain2",
        })
    };
    const symbolsArr = [",", " ", '"', `'`, "!", "@", "`", "~", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "=", "+", ".", "<", ">", "/", "?", ":", ";", "{", "}", "[", "]", `|`,]

    const nonAllowedDomains = ["edneed", "www", "api", "blog"];
    const onChange = (e) => {

        symbolsArr.includes(e.key) && e.preventDefault()
        setSubtmiShow(false);
        let DomainValue = e.target.value.toLowerCase().trim();
        let Value = ValidationFile.filterDomainName(DomainValue);

        if (nonAllowedDomains.includes(Value.dvalue)) {
            setEdneedError(true);
        } else {
            setDomain(Value.dvalue);
            setTlds(Value.tdlsVal);
            setEdneedError(false);
        }
    };

    return (
        <React.Fragment>
            <form className={'custom_subscribe_input_wrapper'} onSubmit={handleSubmit} >
                <div className={'custom_subscribe_input'}>
                    <span className={'custom_subscribe_icons'}>
                        <img className="img-fluid" src={subscribeIcons} alt="Facebook Logo" />
                    </span>
                    <input className={'custom_subscribe_input_field'}
                        type="text"
                        placeholder="Check domain availability"
                        onChange={(e) => onChange(e)}
                        onKeyDown={(e) =>
                            symbolsArr.includes(e.key) && e.preventDefault()
                        }
                    />

                    {/* <FormError
                    show={submit && errorShow && !edneedError}
                    error="Please enter your domain name."
                    className="text-xs w-500 mt-20"
                /> */}
                    {/* <FormError
                    show={submit && edneedError}
                    error="Domain can't contain www, edneed, blog, api."
                    className="text-xs w-500 mt-20"
                /> */}
                </div>
                <button type="submit" className={`button ${'custom_subscribe_button'} button - sm`}>Check Availability</button>
            </form >
            {(submit && errorShow && !edneedError) && <p className="text-2xs red w-500 mt-15">Please enter your domain name.</p>}
            {/* {(submit && errorShow) && <p className="text-2xs red w-500 mt-3">Domain can't contain www, edneed, blog, api.</p>} */}
        </React.Fragment>
    )
}

export default HomeSubscribeInput