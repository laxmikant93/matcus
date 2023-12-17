import React from 'react'

const LoadingMore = ({name,className, ...props}, ref) => {
    return (
        <div className="loading-more-btn">
        <button className={`button ${className}`}>
            {name}
        </button>
    </div>
    )
}

export default LoadingMore
