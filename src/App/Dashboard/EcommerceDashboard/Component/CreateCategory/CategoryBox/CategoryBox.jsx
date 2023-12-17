import React from 'react';
import './categoryBox.scss';
import Dotted from '../../../assets/icons/categoryDotted.svg'
import SwitchButton from '../../../../../../Common/Button/SwitchButton';

const CategoryBox = ({ option }) => {
  // console.log(option)
  return (
    <React.Fragment>
      <div className='categoryBox-wrapper'>
        <div className='categoryBox-container'>
          <div className='categoryBox-container-leftsidebar'>
            <div className={`categoryBox-div ${option.isChildren ? 'childCategory ' : ''} ${option.isSubChildren ? "subChildCategory" : ''}`}>
              <div className='categoryBox-leftsidebar'>
                <div className='categoryBox'>
                  <div className='box-text'>
                    <span><img src={Dotted} alt="" className='mt-5' /></span> <span>{option.categoryName} ({(option.productCount)})</span>
                  </div>
                </div>
              </div>
              <div className='categoryBox-rightsidebar'>
                <div className='box-icons'>
                  <i className='ed-icon i-xs base icon-pencial'></i>
                  <i className='ed-icon i-xs base icon-delete'></i>
                  <i className='ed-icon i-xs base icon-eye'></i>
                </div>
              </div>
            </div>
          </div>
          {
            option.isParent ? (
              <div className='categoryBox-container-rightsidebar'>
                <div className='categoryList-switchDiv'>
                  <div className='switchDivleftsidebar'>
                    <p>show in header</p>
                  </div>
                  <div className='switchDivrightsidebar'>
                    <div className='cstm-switch '>
                      <SwitchButton />
                    </div>
                  </div>
                </div>
              </div>
            ) : null

          }
        </div>
      </div>
    </React.Fragment >

  )
}

export default CategoryBox