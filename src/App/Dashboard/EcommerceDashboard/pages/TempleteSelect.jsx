import React, { useEffect } from 'react';
import EDropdown from '../Component/EDropdown';
import './templeteSelect.scss';
import ThemeImage from '../assets/icons/themeImage.png';
import Pagination from '../../../../Common/Pagination';

const TempleteSelect = () => {
  const menuColor = ['templete1', 'templete2', 'templete3', 'templete4', 'templete5', 'templete6'];
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <React.Fragment>
      <div className='dashBoard-home-container'>
        <div className='templete-select-container'>
          <h1 className='text-xl w-600'>Pick the Website  Template You Love</h1>
          <p className='text-xxs w-400'>It’s personalized for your site type: <span className='dashboard-type-text'>Ecommerce</span></p>

          <div className='templete-top-menu-header-wrap mt-25'>
            <EDropdown menuName={'All Templates'} menuOptions={menuColor} arrow={true} className={'color-black'} />
            <EDropdown menuName={'Ecommerce'} menuOptions={menuColor} arrow={true} className={'color-black'} />
            <EDropdown menuName={'Institution'} menuOptions={menuColor} arrow={true} className={'color-black'} />
            <EDropdown menuName={'Medical'} menuOptions={menuColor} arrow={true} className={'color-black'} />
            <EDropdown menuName={'Food'} menuOptions={menuColor} arrow={true} className={'color-black'} />
            <EDropdown menuName={'Blog'} menuOptions={menuColor} arrow={true} className={'color-black'} />
          </div>
          <div className='templete-area-container'>
            {/* theme loop start here */}
            <div>
              <div className='templete-image-wrap'>
                <img src={ThemeImage} alt="themeimage" className='img-response' />
                <div className='templete-overlay-wrap'>
                  <button className='button button-primary btn-oval'>Edit</button>
                  <button className='button button-o-primary primary btn-oval button-s'>Save</button>
                </div>
              </div>
              <p className='text-xs w-400 mt-5'>Sporting Goods Store</p>
            </div>
            <div>
              <div className='templete-image-wrap'>
                <img src={ThemeImage} alt="themeimage" className='img-response' />
                <div className='templete-overlay-wrap'>
                  <button className='button button-primary btn-oval'>Edit</button>
                  <button className='button button-o-primary primary btn-oval button-s'>Save</button>
                </div>
              </div>
              <p className='text-xs w-400 mt-5'>Sporting Goods Store</p>
            </div>



            {/* theme loop end here */}
          </div>

          <div className='pagination-container'>
            <Pagination
              className="pagination-bar"
              currentPage={1}
              totalCount={100}
              pageSize={10}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default TempleteSelect