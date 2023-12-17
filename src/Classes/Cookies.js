import Encryption from "./Encryption";

class Cookies extends Encryption {

    constructor() {
        super()
        this.cokConfig = {
            type: {
                string: "string", // default
                json: "json",
                bool: "bool"
            },
            host: this.getCookieHost()
        }
    }

    set(name, value, type) {
        switch (type) {
            case this.cokConfig.type.json:
                this.setJson(name, value);
                break;
            case this.cokConfig.type.bool:
                this.setBool(name, value);
                break;
            default:
                this.setString(name, value);
                break;
        }
    }

    get(name, type = this.cokConfig.type.string) {

        switch (type) {
            case this.cokConfig.type.json:
                return this.getJson(name);
            case this.cokConfig.type.bool:
                return this.getBool(name);
            default:
                return this.getString(name);
        }
    }

    update(name, value, type = this.cokConfig.type.string) {
        switch (type) {
            case this.cokConfig.type.json:
                this.updateCookies(name, this.encodeJson(value))
                break;
            case this.cokConfig.type.bool:
                this.updateCookies(name, value)
                break;
            default:
                this.updateCookies(name, this.encode(value))
                break;
        }
    }

    getJson(name) {
        let encJson = this.getCookies(name);
        return this.decodeJson(encJson);
    }

    setJson(name, jsonVal) {
        this.setCookies(name, this.encodeJson(jsonVal));
    }

    setBool(name, boolVal) {
        this.setCookies(name, boolVal);
    }

    getBool(name) {
        return this.getCookies(name);
    }

    setString(name, strVal) {
        this.setCookies(name, this.encode(strVal))
    }

    getString(name) {
        let encText = this.getCookies(name);
        return this.decodeString(encText);
    }

    getCookieHost() {
        let host = window.location.hostname;
        let domain;
        // if (host.split('.').length === 2) // only valid for example.com
        // {
        //     // no "." in a domain - it's localhost or something similar
        //     return domain = `.${host}`;
        // }
        // else
        // {
        //     let domainParts = host.split('.');

        //     if(domainParts.length===3){
        //         domainParts.shift();
        //         domain = '.'+domainParts.join('.');
        //     }
        //     else{
        //         let revDomainPart = domainParts.reverse();
        //         domain = `.${revDomainPart[1]}.${revDomainPart[0]}`; //'.'+domainParts.join('.');
        //     }
        // } 
        //  old krishna sir code commented by Ankit


        // code starts here 
        if (host.includes('localhost')) {
            return 'localhost';
        }

        if (host.split('.').length > 3) {
            let domainParts = host.split('.');

            // Subdomain with IP
            if (domainParts.length > 3) {

                if (domainParts[0] === "www") {
                    let afterRemoveWww = domainParts.slice(2, domainParts.length);
                    return afterRemoveWww.join('.');
                }
                else {
                    domainParts.shift();
                    domain = domainParts.join('.');
                    domain = host
                }

            }

            return domain
        }

        if (host.split('.').length === 2) // only valid for example.com
        {
            // no "." in a domain - it's localhost or something similar
            return domain = `${host}`;
        }
        else {
            if (host.split('.').length === 3) {
                let domainParts = host.split('.');
                if (domainParts[0] === "www") {
                    let afterRemoveWww = domainParts.slice(2, domainParts.length);
                    return afterRemoveWww.join('.');
                } else {
                    if (domainParts.includes("edneed") || domainParts.includes("getmelight") || domainParts.includes("unicated")) {
                        let revDomainPart = domainParts.reverse();
                        domain = `${revDomainPart[1]}.${revDomainPart[0]}`; //'.'+domainParts.join('.');
                        return domain
                    } else {
                        return domain = `${host}`;
                    }
                }
            }
            // let domainParts = host.split('.');
            // if (domainParts.length === 3) {
            //     domainParts.shift();
            //     domain = domainParts.join('.');
            // }
            // else {
            //     let revDomainPart = domainParts.reverse();
            //     domain = `${revDomainPart[1]}.${revDomainPart[0]}`; //'.'+domainParts.join('.');
            // }
        }
        // end here 
        return domain;
    }

    setCookies(name, value) {
        let myDate = new Date();
        myDate.setMonth(myDate.getMonth() + 12);
        document.cookie = `${name}=${value};expires=${myDate};path=/;domain=${this.cokConfig.host};`;
    }

    updateCookies(name, value) {
        this.remove(name);
        let myDate = new Date();
        myDate.setMonth(myDate.getMonth() + 12);
        document.cookie = `${name}=${value};expires=${myDate};path=/;domain=${this.cokConfig.host};`;
        // document.cookie =  `${name}=${value};`;
    }
    updateNoExpiryCookies(name, value) {
        this.remove(name);
        let myDate = new Date();
        document.cookie = `${name}=${value};expires=${myDate};path=/;domain=${this.cokConfig.host};`;
        // document.cookie =  `${name}=${value};`;
    }

    getCookies(name) {
        let allCookies = document.cookie.split(';');
        let matchedItemVal = undefined;
        allCookies.forEach(cookiesItem => {
            let cookiesItemParts = cookiesItem.split('=');
            if (cookiesItemParts[0].trim().localeCompare(name) === 0) {
                matchedItemVal = cookiesItemParts[1];
            }
        });
        return matchedItemVal;
    }
    remove(name) {
        let expireTime = new Date();
        expireTime.setMonth(expireTime.getMonth() - 12);
        document.cookie = `${name}=;expires=${expireTime};path=/;domain=${this.cokConfig.host};`;
    }
    removeNoExpiry(name) {
        let expireTime = new Date();
        document.cookie = `${name}=;expires=${expireTime};path=/;domain=${this.cokConfig.host};`;
    }

    has(name) {

        let allCookies = document.cookie.split(';');
        let matchedItemVal = undefined;
        allCookies.forEach(cookiesItem => {
            let cookiesItemParts = cookiesItem.split('=');

            if (cookiesItemParts[0].trim().localeCompare(name) === 0) {


                return matchedItemVal = cookiesItemParts[1];
            }

            // if(cookiesItemParts[0].trim().localeCompare(name)>-1){
            //     return matchedItemVal = cookiesItemParts[1];
            // }

        });
        return matchedItemVal;
    }

    alive(name) {
        return this.has(name) ? this.getBool(name) : false;
    }

}

export default new Cookies();