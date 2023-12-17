import React from 'react';
import './header.scss';
import Logo from '../assets/icons/logo.svg';
import Profile from '../assets/icons/profile.svg';
import Cart from '../assets/icons/cart.svg';
import Circle from '../assets/icons/circle.svg'

const Header = () => {
  return (
    <header>
      <div className='container'>
        <div className='header-container-wrap'>
          <div className='header-container-left'>
            <div className='header-logo'>
              <img src={Logo} alt="" />
            </div>
            <div className='header-logo-text'>
              <h1>Radhe Shyam & Sons Apparels</h1>
            </div>
          </div>
          <div className='header-container-right'>
            <div className='header-login-wrap'>
              <img src={Profile} alt="" />
              <p>Log In / Sign Up</p>
            </div>
            <div className='header-cart-div'>
              <img src={Cart} alt="" />
            </div>
            <div className='header-cart-order-count'>
              <img src={Circle} alt="" />
              <div className='header-order-count-text'>
                <p>10</p>
              </div>
            </div>
          </div>
        </div>
        <div className='header-search-wrap text-center'>
          <input type="text" className='header-search' id="" placeholder='Search products, brands and more...' />
        </div>
      </div>
    </header>
  )
}

export default Header