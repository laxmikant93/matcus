import React, { useEffect } from 'react';
import './returnPolicy.scss';

const ReturnPolicy = () => {

  // page scroll to top

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <React.Fragment>
      <section className='return-section pb-45 '>
        <div className='containerTrue mt-24'>
          <h1 className='return-heading text-underline '>Shipping & Returns Policy</h1>
          <div className='return-policy-wrapper'>
            <h3 className='return-heading'>Returns Policy</h3>
            <p className='return-para'>Returns is a scheme provided by respective sellers directly under this policy in terms of which the option of exchange, replacement and/ or refund is offered by the
              respective sellers to you. All products listed under a particular category may not have the same returns policy. For all products, the returns/replacement policy provided
              on the product page shall prevail over the general returns policy. Do refer the respective item's applicable return/replacement policy on the product page for any
              exceptions to this returns policy and the table below</p>
            <div className='retun-ul-wrapper'>
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

          <div className='return-policy-wrapper'>
            <h3 className='return-heading'>Shipping Policy</h3>
            <p className='return-para'>Returns is a scheme provided by respective sellers directly under this policy in terms of which the option of exchange, replacement and/ or refund is offered by the
              respective sellers to you. All products listed under a particular category may not have the same returns policy. For all products, the returns/replacement policy provided
              on the product page shall prevail over the general returns policy. Do refer the respective item's applicable return/replacement policy on the product page for any
              exceptions to this returns policy and the table below</p>
            <div className='retun-ul-wrapper'>
              <ul>
                <li>In certain cases where the seller is unable to process a replacement for any reason whatsoever, a refund will be given.
                </li>
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
    </React.Fragment>
  )
}

export default ReturnPolicy