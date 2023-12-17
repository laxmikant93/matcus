import React from "react";
import { useSelector } from "react-redux";


function FormTextArea({ name, rows, maxlength, id, label, labelPosition, TextareaBtmTxt, className, ...props }) {
    const { user } = useSelector((state) => {
        return {
            user: state.user,
        };
    });
    return (
        <React.Fragment>
            <div className="form-group">
                {labelPosition === "top" ?
                    (
                        <label className="animLabelTop" htmlFor={id}>{label}</label>
                    ) : ""}
                <textarea rows={rows} maxLength={maxlength}
                    className={`form-control ${user.user_activeRole === process.env.REACT_APP_TEACHER
                        ? "teacher"
                        : user.user_activeRole === process.env.REACT_APP_STUDENT
                            ? "student"
                            : "admin"
                        } ${className}`} id={id} name={name} {...props}></textarea>
                {labelPosition !== "top" ? <label className="animLabel" htmlFor={id}>{label}</label> : ""}
                {TextareaBtmTxt && <small className="w-400">Max. allowed <span className="base">{TextareaBtmTxt}</span> characters.</small>}
            </div>
        </React.Fragment>
    )
}
export default FormTextArea;