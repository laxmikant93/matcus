import React from 'react'

const CardMedia = (({children, className, ...props}, ref) => {
    return (
        <div className={`cardMedia ${className}`}>
            {children}
        </div>
    )
})

export default CardMedia
