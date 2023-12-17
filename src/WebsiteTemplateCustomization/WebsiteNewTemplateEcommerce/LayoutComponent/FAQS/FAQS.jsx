import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import NoDataAvailable from '../../../../Common/NoDataAvailable';
import { getFaq, statusActive } from '../../../../store/actions/Faq';
import MobileBar from '../../CommonComponent/CommonJsx/MobileBar/MobileBar';
import '../ReturnPolicy/returnPolicy.scss';
import './faqs.scss';

const FAQS = () => {
  const { user, faqLoading, subheader, faqsuccess, faqData } = useSelector((state) => {
    return {
      user: state.user,
      faqLoading: state.faq.faqList.loading,
      faqData: state.faq.faqList.data,

      subheader: state.sectionTitle.list.data,
      faqsuccess: state.faq.faqList.success
    }
  })
  const { data, success } = useSelector((state) => state.businessInfo.ecomWebsite);

  const dispatch = useDispatch()
  useEffect(() => {
    if (success) {
      dispatch(statusActive(data._id, "Ecommerce"))
    }

  }, [dispatch, success, data])


  // page scroll to top

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  return (
    <section className='return-section'>
      <React.Fragment>
        <div className='containerTrue pb-45 '>
          <h1 className='return-heading text-underline mt-25 '>{(subheader && subheader['faqhead']) || "Frequently Asked Questions"}</h1>
          <div className='faq-section-wrapper'>
            {faqsuccess ? faqData.length ? (
              faqData.map((item) => {
                return (
                  <div className='return-policy-wrapper'>
                    <div className='retun-ul-wrapper '>
                      <ul className='faq-ul-wrapper'>
                        <li className='faq-li'>{item.title}
                          <p dangerouslySetInnerHTML={{
                            __html:
                              item.description,
                          }}></p>
                        </li>
                      </ul>
                    </div>
                  </div>
                )
              })
            ) :
              <div className='return-policy-wrapper'>
                <div className='retun-ul-wrapper '>
                  <ul className='faq-ul-wrapper'>
                    <li>
                      What are the costs
                      <p> "There are different service plans with rich features for users of all experience levels. If you outgrow your current plan, you can
                        upgrade to a more sophisticated plan and get more website templates and more storage for your content."</p>
                    </li>

                  </ul>
                </div>
              </div>
              :
              (
                <div className="loadingGridData">
                  <i className="ed-loadingGrid"></i>
                </div>
              )}
          </div>
        </div>
      </React.Fragment>

    </section >
  )
}

export default FAQS