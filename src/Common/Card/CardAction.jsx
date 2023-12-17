import React from 'react'

const CardAction = ({children, className, ...props}, ref) => {
    return (
        <div className={`cardAction ${className}`}>
            {children}
        </div>
    )
}

export default CardAction
