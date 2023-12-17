import React, { forwardRef } from "react";
import IconSearch from "./icon-search.svg";
import "./SearchControl.scss";

const SearchControl = forwardRef(({ name, value, id, type, label, classNameWrappper, className, reset, ...props }, ref) => {

    return (
        <form className={`SearchControlbar ${classNameWrappper}`} onSubmit={(e) => e.preventDefault()}>
            <input type="search" required className={`form-control-search ${className}`} id={id} ref={ref} name={name} value={value} {...props} />
            <button className="search-close-icon" type="reset" onClick={reset}></button>
            <i className="search-icon"></i>
        </form>
    )
})
export default SearchControl;
