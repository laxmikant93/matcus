import React, { useState } from "react";
import faqList from "./faq_data.json";

import ReactGA from "react-ga";
import "./Faq.scss";
export default function Faqs() {
  const [showAnwer, hideAnswer] = useState(-1);
  function showHideFaq(index) {
    hideAnswer(showAnwer === index ? -1 : index);
  }

  ReactGA.event({
    category: "resources",
    action: "click",
    label: "Home_Footer_FAQs",
  })


  return (
    <React.Fragment>
      <div className="fullEdContainer">
        <div className="head_faqs">
          <h1 className="w-500">
            Have <span className="w-700">Questions?</span> Look Here.
          </h1>
        </div>
        <div className="edContainer">
          <section className="faqWrapSec">
            {faqList.map((faqList, index) => {
              return (
                <article
                  key={index}
                  id={index}
                  className={showAnwer === index ? "active" : ""}
                >
                  <div className="faqHead" onClick={() => showHideFaq(index)}>
                    <strong>{index + 1}.&nbsp;&nbsp;</strong>{faqList.question}
                    {showAnwer === index ? <span className="openclose_faq_icon">&#8722;</span> : <span className="openclose_faq_icon">&#43;</span>}
                  </div>
                  {showAnwer === index ? <div
                    className="faqAnswerDisp sun-editor-output"
                    dangerouslySetInnerHTML={{ __html: faqList.answer }}
                  ></div> : ""}
                </article>
              );
            })}
            <div className="faqWrapSec_enquiry">
              <p className="text-xs w-600">Any other question? Write to us at:</p>
              <p>
                <a href="mailto:support@edneed.com" className="primary text-xs w-600">
                  support@edneed.com
                </a>
              </p>
            </div>
          </section>
        </div>
        <div className="footer_faqs">
          <h1 className="w-500">
            <span className="w-700">Revolutionizing Digital Education</span>
          </h1>
        </div>
      </div>
    </React.Fragment>
  );
}
