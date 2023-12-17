import React from 'react'
import "./businessname.scss"

const BusinessName = () => {
  return (
    <>
      <div className="edContainer">
        <div className="BusinessName-wrapper">
          <div>
            <h1 className="text-md w-600">What is the name of your ecommerce website</h1>
            <p className="text-xxs w-400">You can change it anytime</p>
            <div className="formFieldwrap">
              <input type="text" name="Business" placeholder="Business name" aria-describedby="Business name" />
            </div>
            <button type="submit" className="button btn-oval button-primary btn-sm">Continue </button>
          </div>

          <div className="button-group">
            <button type="button"><i className="arrow-icon"></i> Back</button>
            <button type="button">Skip</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default BusinessName