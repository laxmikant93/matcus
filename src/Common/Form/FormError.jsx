import React from "react"
import erroricon from "../../assets/Icons/error-icon.svg"

const FormError = ({ className, error, success, show = false }) => {
    return show === true && <div className={`errorInputMsg ${className}`}>
        {
            success ? "" : <React.Fragment> <img src={erroricon} alt="erroricon" className="erroricon" />
                &nbsp;</React.Fragment>
        }
        {error}</div>
}

export default FormError