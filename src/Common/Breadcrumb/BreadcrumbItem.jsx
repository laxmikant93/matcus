import AppLink from "../AppLink";

import { string } from "prop-types";
import AppLinkUrl from "../AppLink/AppLinkUrl";

function BreadcrumbItem({ title, to }) {
    if (to === "/") {
        return <li className="text-xxs gray w-300"><AppLink to={"/dashboard"}>{title}</AppLink></li>
    } else {
        return <li className="text-xxs gray w-300"><AppLink to={to}>{title}</AppLink></li>
    }
}

if (AppLinkUrl.privateDomain()) {
    BreadcrumbItem.defaultProps = {
        title: "Undefined",
        to: "/dashboard"
    }
} else {
    BreadcrumbItem.defaultProps = {
        title: "Undefined",
        to: "/"
    }
}


BreadcrumbItem.propTypes = {
    title: string.isRequired,
    to: string.isRequired
}

export default BreadcrumbItem