import React, { useEffect } from 'react';
import './footer.scss';
import AmericanIcon from '../assets/images/americanIcon.png';
import SecoundIcon from '../assets/images/secound.png';
import Discover from '../assets/images/discover.png';
import MasterCard from '../assets/images/masterCard.png';
import JCB from '../assets/images/jcb.png';
import Visa from '../assets/images/visa.png'
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategoryList } from '../../../store/actions/ecomAdmin';
import AppLinkUrl from '../../../Common/AppLink/AppLinkUrl';
import { useNavigate } from 'react-router-dom';
import { clearAllCategory, showAddCat, showAddSubCat, showAddSubSubCat, CategoryPush } from '../../../store/actions/catergoryFilter';
import { statusActive } from '../../../store/actions/Faq';
import MultiLanguage from '../HeaderLayout/RibbonHeader/MultiLanguage';
import { readSectionTitle } from '../../../store/actions/sectionTitle';

const Footer = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { data, success } = useSelector((state) => state.businessInfo.ecomWebsite)
  const { privacypolicydata, subheader, faqData, faqsuccess, getbusinessInfoData, getAllData, getloading, getbusinessInfoSuccess, getbusinessInfoloading, getsuccess, successTemplate } = useSelector((state) => {
    return {
      successTemplate: state.websiteTemplate.getTemplate.success,
      privacypolicydata: state.websiteTemplate.getTemplate.policy_info,
      getAllData: state.ecomAdmin.list.data,
      getloading: state.ecomAdmin.list.loading,
      getsuccess: state.ecomAdmin.list.success,
      getbusinessInfoData: state.businessInfo.ecomWebsite.data,
      getbusinessInfoSuccess: state.businessInfo.ecomWebsite.success,
      getbusinessInfoloading: state.businessInfo.ecomWebsite.loading,
      faqData: state.faq.faqList.data,
      faqsuccess: state.faq.faqList.success,
      subheader: state.sectionTitle.list.data
    }
  })

  useEffect(() => {
    if (getbusinessInfoData && getbusinessInfoData._id) {
      dispatch(getAllCategoryList(getbusinessInfoData._id))

    }
  }, [dispatch, getbusinessInfoData])
  useEffect(() => {
    if (success) {
      dispatch(statusActive(data._id, "Ecommerce"))
    }

  }, [dispatch, success, data])


  const handleCategoryNavbarFilter = (Categoryitem) => {
    dispatch(clearAllCategory())
    dispatch(CategoryPush(Categoryitem._id))
    dispatch(showAddCat(Categoryitem._id))
    if (Categoryitem.subcategories.length > 0) {
      for (let i = 0; i < Categoryitem.subcategories.length; i++) {
        dispatch(showAddSubCat(Categoryitem.subcategories[i]._id))
        if (Categoryitem.subcategories[i].subsubcategories.length > 0) {
          dispatch(showAddSubSubCat(Categoryitem.subcategories[i]._id))
        }
      }
    }
    history("/products")
  }

  useEffect(() => {
    dispatch(readSectionTitle(data._id, "Ecommerce"));
  }, [data, dispatch])
  // console.log(getAllData, getsuccess, getloading, "line34")

  // const DataList = getAllData.data;
  // const CategoryData = getsuccess && getAllData?.data && DataList.filter(item => item.show_on_footer === true);
  // return CategoryData

  const ShopListFilter = getsuccess && getAllData?.data && getAllData?.data.filter(item => item.show_on_footer === true).length > 0;

  // console.log(CategoryData, res, "line65")
  const ribbinHead = getbusinessInfoSuccess && getbusinessInfoData?.language?.multipleLanguage;

  return (
    <footer className='footer'>
      <div className='containerTrue'>
        <div className='footer-container'>
          <div className='footer-store-wrap footer-wrap'>
            <p>Store Location</p>
            <ul>
              {success && <li>
                {data.business_name ? data.business_name + "," : ""}&nbsp;
                {data.business_address ? data.business_address + "," : ""}&nbsp;
                {data.business_address_line2 ? data.business_address_line2 + "," : " "}&nbsp;
                {data.business_address_line3 ? data.business_address_line3 + "," : ""}&nbsp;
                {data.business_state ? data.business_state + "," : ""}&nbsp;
                {data.business_city ? data.business_city + "," : ""}&nbsp;
                {data.business_country ? data.business_country + "," : ""}&nbsp;
                {data.business_zipcode ? data.business_zipcode : ""}
              </li>}
            </ul>
            <div className='footer-social-media-wrap'>
              {data.facebook_url && <a href={data.facebook_url} target='_blank' rel="noreferrer"> <i className='icons icons-facebook'></i></a>}
              {data.instagram_url && <a href={data.instagram_url} target='_blank' rel="noreferrer">   <i className='icons icons-instagram'></i></a>}
              {data.twitter_url && <a href={data.twitter_url} target='_blank' rel="noreferrer">  <i className='icons  icons-twitter '></i></a>}
              {data.linkedin_url && <a href={data.linkedin_url} target='_blank' rel="noreferrer">  <i className='icons  icons-linkedin '></i></a>}
              {data.youtube_url && <a href={data.youtube_url} target='_blank' rel="noreferrer">  <i className='icons  icons-youtube '></i></a>}

            </div>
          </div>
          <div className='footer-wrap'>
            {
              ShopListFilter ? (
                <>
                  <p>Shop</p>
                  <ul className="category-wrapper">
                    {
                      getsuccess && getAllData?.data && getAllData?.data.length > 0 && (
                        getAllData?.data.filter(item => item.show_on_footer === true).map((category) => (
                          <React.Fragment>
                            <li>
                              <button onClick={() => { handleCategoryNavbarFilter(category) }} className="buttonList">{category?.categoryName}</button>
                            </li>
                          </React.Fragment>
                        ))
                      )
                    }
                  </ul>
                </>
              ) : (
                <>
                  <p>Quick Links</p>
                  <ul>
                    <li>
                      <li><Link to={'/'}>Home</Link> </li>
                      {
                        getbusinessInfoSuccess && getbusinessInfoData.show_shop_on_header ? (
                          <li><Link to={'/products'}>Shop</Link> </li>
                        ) : ""
                      }
                      <li><Link to={'/ecom-aboutus'}>About Us</Link></li>
                    </li>
                  </ul>
                </>
              )
            }


          </div>
          <div className='footer-wrap'>
            <p>Customer Support</p>
            <ul>
              {/* <li><Link to={'/ecom-contactus'}>Customer Support </Link> </li> */}
              <li><Link to={'/ecom-contactus'}>Contact Us </Link> </li>
              {/* <li><Link to={'/ecom-aboutus'}>About Us</Link> </li> */}
            </ul>
          </div>
          <div className='footer-wrap'>
            <p>Policy</p>
            <ul>
              <li>
                <a href={`/policy/${successTemplate && privacypolicydata?.terms_of_service[0]?.slug}`}>
                  {successTemplate && privacypolicydata?.terms_of_service[0]?.show_on_footer ? privacypolicydata?.terms_of_service[0]?.title : ""}
                </a>
              </li>
              <li>
                <a href={`/policy/${successTemplate && privacypolicydata?.privacy_policy[0]?.slug}`}>
                  {successTemplate && privacypolicydata?.privacy_policy[0]?.show_on_footer ? privacypolicydata?.privacy_policy[0]?.title : ""}
                </a>
              </li>
              {successTemplate && privacypolicydata?.custom_policy.length > 0 ? privacypolicydata?.custom_policy.map((item, key) => {
                return (
                  <li key={key}>
                    <a href={`/policy/${item.slug}`}>
                      {item?.show_on_footer ? item.title : ""}
                    </a>
                  </li>
                );
              }) : ""
              }
              {/* {/ <li><Link to={'#'}>Payment Methods</Link > </li> */}
              {
                faqsuccess ? faqData.length > 0 ? <li><Link to="/ecom-faqs">{(subheader && subheader['faqhead']) || "Frequently Asked Questions"}</Link></li> : "" : ""
              }
            </ul>
          </div>
        </div>

        <hr className='footer-hr' />
        <div className='footer-lowerSection text-center'>
          {/* <p className='footer-lowerSection-first-para'>We accept the following payment methods</p> */}
          {/* <div className='footer-loweSection-imag-wrap text-center'>
            <div className='footer-lowerSection-image-div'>
              <img src={AmericanIcon} alt="" />
            </div>
            <div className='footer-lowerSection-image-div'>
              <img src={SecoundIcon} alt="" />
            </div>

            <div className='footer-lowerSection-image-div'>
              <img src={Discover} alt="" />
            </div>
            <div className='footer-lowerSection-image-div'>
              <img src={MasterCard} alt="" />
            </div>

            <div className='footer-lowerSection-image-div'>
              <img src={JCB} alt="" />
            </div>

            <div className='footer-lowerSection-image-div'>
              <img src={Visa} alt="" />
            </div>

          </div> */}
          <div className='footer-power-div'>
            <p className='footer-copywrite-text'>{data.business_name && <>©{data.business_name}&nbsp;-&nbsp;</>}<a href="https://webneed.io/" target="_blank" className='footer-copywrite-text' rel="noreferrer">
              Powered by webneed.io
            </a></p>
            {getbusinessInfoSuccess && getbusinessInfoData ? (
              ribbinHead ? "" : (<MultiLanguage />)
            ) : ("")

            }
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer