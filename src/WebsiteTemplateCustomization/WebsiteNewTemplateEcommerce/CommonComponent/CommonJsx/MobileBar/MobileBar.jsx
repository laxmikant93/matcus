import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Auth from '../../../../../Classes/Auth';
import { getSavedCustomer } from '../../../../../store/actions/ecommerce/action/auth';
import { readCart } from '../../../../../store/actions/ecommerce/action/cartOrder';
import './mobilebar.scss';

const MobileBar = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [pathname, setPathname] = useState(window.location.pathname);

  const { customerDetail } = useSelector((state) => state.ecomAuth);
  const { customerCart } = useSelector((state) => state.orderCartList);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(getSavedCustomer());
    setPathname(window.location.pathname);
  }, []);

  // useEffect(() => {
  //   if (customerDetail.data && customerDetail.data.data && customerDetail.data.data._id) {
  //     dispatch(readCart({ userId: customerDetail.data.data._id, status: "readAddToCart" }));
  //   }
  // }, [customerDetail]);

  useEffect(() => {
    if (customerCart.success === true && customerCart.data && customerCart.data.cartProduct && customerCart.data.cartProduct.length > 0) {

      const iTot = customerCart.data.cartProduct.reduce((tot, curr, i) => {
        return tot + curr.quantity;
      }, 0);
      setTotalItems(iTot);
    }
  }, [customerCart]);

  return (
    <React.Fragment>
      <div className='mobilebar-container'>
        <div className='containerTrue'>
          <div className='mobilebar-wrap'>
            <div className='mobilebar-div'>
              <Link to={'/'}>
                {/* when route is active add "activeColor" class */}
                <i className={pathname === '/' ? 'icons icon-home activeColor' : 'icons icon-home '}></i>
                <p>Home</p>
              </Link>
            </div>
            <div className='mobilebar-div'>
              <Link to={'/products'}>
                <i className={pathname.includes('products') ? 'icons icon-shop activeColor' : 'icons icon-shop'}></i>
                <p>Shop</p></Link>
            </div>
            <div className='mobilebar-div'>
              <Link to={'/ecom-cart'}>
                <div className='cart-div'>
                  <i className={pathname.includes('ecom-cart') ? 'icons icon-cart position-relative activeColor' : 'icons icon-cart position-relative'}></i>
                  {totalItems > 0 && (<div className='count-div'>
                    <span>{totalItems}</span>
                  </div>)}
                </div>
                <p>Cart</p>
              </Link>
            </div>
            <div className='mobilebar-div'>
              <Link to={'/ecom-wishlist'}>
                <i className={pathname.includes('ecom-wishlist') ? 'icons icon-wishlist activeColor' : 'icons icon-wishlist'}></i>
                <p>Wishlist</p></Link>
            </div>
            <div className='mobilebar-div'>
              <Link to={Auth.isLogin() || Auth.isSubdomainLogin() ? '/ecom-myprofile' : "/customer-login"}>
                <i className={pathname.includes('ecom-myprofile') ? 'icons icon-profile activeColor' : 'icons icon-profile'}></i>
                <p>Profile</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default MobileBar