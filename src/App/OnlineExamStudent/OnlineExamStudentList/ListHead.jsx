import React from "react";

export function ListHead({ children }) {
    return (
        <ul className="gridHeader">
            
                {children}
            
        </ul>
    )
}

export function ListHeadItem({title,width, className, ...props}){
    return <li width={width} className={` ${className} `} {...props}>{title}</li>
}