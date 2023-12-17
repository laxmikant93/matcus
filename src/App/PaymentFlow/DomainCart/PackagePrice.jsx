import React from "react";
const PackagePrice = () => {

  return (
    <div className="domainPriceRgt">
      <div className="CartDiscountandPriceSection mt-10">
        <div className="CartPriceSection">
          <p className="text-2xs">
            <span className="text-xxs base text-line-through"><i>&#8377;</i>39,999</span>/per year
          </p>
          <span>
            <p className="text-sm w-600 mt-3">&#8377;&nbsp;9999<span className="text-xxs "> /per year</span></p>
            + 3% Convenience charge.
          </span>

        </div>
        <div className="CartCheckoutSectionwrapper">
          <div className="CartCheckoutSectionCustom">
            <div className="CartDiscountSection">
              <p className="text-lg w-600">More than 70% OFF</p>
              <p className="text-xxs">
                No code required. Limited period offer.
                <sup className="red">&#10039;</sup>
              </p>
              <span className="scissorIcon base">&#9986;</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default PackagePrice;
