import React from 'react'

const CardHeader = (({children, className,...props}, ref) => {
    return (
        <div className={`cardHeader ${className}`}>
            {children}
        </div>
    )
})

export default CardHeader
