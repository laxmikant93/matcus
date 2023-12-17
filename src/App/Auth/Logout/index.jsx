import Auth from "../../../Classes/Auth";
import { useEffect } from "react";
import ReactGA from 'react-ga';
// import AppLink from "../../../Common/AppLink";
import AppLinkUrl from "../../../Common/AppLink/AppLinkUrl";

const Logout = () => {
    ReactGA.event({
        category: "LogOut",
        action: "click",
        label: "LOGOUT",
    })
    const dynamicRoute = () => {
        if (window.location.host.includes("my_app")) {
            return ".my_app.com:3000"
        } else if (window.location.host.includes("getmelight")) {
            return ".getmelight.com"
        } else if (window.location.host.includes("unicated")) {
            return ".unicated.com"
        } else if (window.location.host.includes("edneed")) {
            return ".edneed.com"
        } else {
            return ".edneed.com"
        }
    }

    Auth.logout();

    useEffect(() => {
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event) {
            window.history.pushState(null, document.title, window.location.href);

        });
    }, [])

    if (AppLinkUrl.subdomain()) {
        window.location.href = `http://${AppLinkUrl.subdomain()}${dynamicRoute()}`
    } else {
        return window.location.href = "/";
    }
}
export default Logout