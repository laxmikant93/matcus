import React from 'react';
import './footer.scss';
import AmericanIcon from '../assets/images/americanIcon.png';
import SecoundIcon from '../assets/images/secound.png';
import Discover from '../assets/images/discover.png';
import MasterCard from '../assets/images/masterCard.png';
import JCB from '../assets/images/jcb.png';
import Visa from '../assets/images/visa.png'

const Footer = () => {
  return (
    <footer>
      <div className='container'>
        <div className='footer-container'>
          <div className='footer-store-wrap footer-wrap'>
            <p>Store Location</p>
            <ul>
              <li>Floor 2, <br />
                203,
                Tower C, Ithum Towers,
                Sector 62, Noida,
                Uttar Pradesh 201309</li>
            </ul>
          </div>
          <div className='footer-wrap'>
            <p>Shop</p>
            <ul>
              <li>Casual Wear </li>
              <li> Formal Wear</li>
              <li>Party Wear</li>
            </ul>
          </div>
          <div className='footer-wrap'>
            <p>Customer Support</p>
            <ul>
              <li> Contact Us </li>
              <li>  Help Center</li>
              <li>About Us</li>
              <li>  Careers</li>
            </ul>
          </div>
          <div className='footer-wrap'>
            <p>Policy</p>
            <ul>
              <li>Shipping & Returns</li>
              <li>Terms & Conditions</li>
              <li> Payment Methods</li>
              <li> FAQ</li>
            </ul>
          </div>
        </div>

        <hr className='footer-hr' />
        <div className='footer-lowerSection text-center'>
          <p className='footer-lowerSection-first-para'>We accept the following payment methods</p>
          <div className='footer-loweSection-imag-wrap text-center'>
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

          </div>
          <p className='footer-copywrite-text'>2022  by Edneed Technology Pvt. Ltd.</p>
        </div>
      </div>
    </footer >
  )
}

export default Footer