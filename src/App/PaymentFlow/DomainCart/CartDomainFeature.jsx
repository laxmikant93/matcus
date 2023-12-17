import React, { useState } from "react";
import CartDomainFeatureData from "./CartDomainFeatureData.json";

const CartDomainFeature = () => {
  const [showAnwer, hideAnswer] = useState(-1);
  function showHideFaq(index) {
    hideAnswer(showAnwer === index ? -1 : index);
  }
  return (
    <section className=" cartFeatureWrap">
      <div className="CartDomainFeatureWrapper homeBorder">
        <div className="CartDomainFeatureHead">
          <p>The Best Deals Inside. All in one place.</p>
        </div>
        <div className="CartDomainFeatureList">
          {
            CartDomainFeatureData.map((CartDomainFeatureData, index) => (
              <article
                key={index}
              >
                <div
                  className="CartDomainFeatureListHead"
                >
                  <h5>{CartDomainFeatureData.question}</h5>
                </div>
                <div
                  className="CartDomainFeatureListAnswerDisp sun-editor-output"
                  dangerouslySetInnerHTML={{
                    __html: CartDomainFeatureData.answer,
                  }}
                ></div>
              </article>
            ))
          }
        </div>
      </div>
    </section>
  );
};

export default CartDomainFeature;
