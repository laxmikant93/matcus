import React from 'react'

const CardBody = ({children,className, ...props}, ref) => {
    return (
        <div className={`cardBody ${className}`}>
            {children}
        </div>
    )
}

export default CardBody
