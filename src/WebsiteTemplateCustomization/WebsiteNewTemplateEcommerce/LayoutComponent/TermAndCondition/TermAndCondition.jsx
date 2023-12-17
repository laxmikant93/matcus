import React, { useEffect } from 'react';
import MobileBar from '../../CommonComponent/CommonJsx/MobileBar/MobileBar';
import '../ReturnPolicy/returnPolicy.scss';

const TermAndCondition = () => {

  // page scroll to top

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <section className='return-section '>
      <div className='containerTrue mt-24  pb-45'>
        <div className='return-policy-wrapper'>
          <h3 className='return-heading text-underline'>Terms & Conditions</h3>
          <div className='retun-ul-wrapper faq-ul-wrapper'>
            <ul>
              <li>In certain cases where the seller is unable to process a replacement for any reason whatsoever, a refund will be given.</li>
              <li>In cases where a product accessory is found missing/damaged/defective, the seller may either process a replacement of the particular accessory or issue an eGV for an
                amount equivalent to the price of the accessory, at the seller’s discretion.</li>
              <li>During open box deliveries, while accepting your order, if you received a different or a damaged product, you will be given a refund (on the spot refunds for cash-on-
                delivery orders). Once you have accepted an open box delivery, no return request will be processed, except for manufacturing defects. In such cases, these category-
                specific replacement/return general conditions will be applicable. Click here to know more about Open Box Delivery.</li>
              <li>For products where installation is provided by Flipkart's service partners, do not open the product packaging by yourself. Flipkart authorised personnel shall help in
                unboxing and installation of the product.</li>
              <li>For Furniture, any product-related issues will be checked by authorised service personnel (free of cost) and attempted to be resolved by replacing the faulty/ defective
                part of the product. Full replacement will be provided only in cases where the service personnel opines that replacing the faulty/defective part will not resolve the issue.</li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  )
}

export default TermAndCondition