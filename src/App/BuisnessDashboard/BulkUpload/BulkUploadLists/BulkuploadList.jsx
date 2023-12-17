import React from 'react'
import { useRef } from 'react';
import AppLink from '../../../../Common/AppLink'
import CheckboxInput from '../../../../Common/Form/CheckboxInput'

import ThreeDots from '../../../Dashboard/EcommerceDashboard/assets/icons/threeDot.svg'
import ProductImage from '../../BulkUpload/productimg.png';
import './bulkuploadlist.scss'
import ImportCompletePopup from './ImportCompletePopup/ImportCompletePopup';
const BulkuploadList = () => {
  // popup function 
  const openref = useRef(null);
  const onOpenProductImport = () => {
    openref.current.open()
  }
  const onCloseProductImport = () => {
    openref.current.close()
  }
  // 
  return (
    <div>
      <div className='inline between-lg between-xs bulklist-header-wrapper '>
        <p>15 Products Imported</p>
        <div className='add-products-btn-wrapper'>
          <button className='button button-primary btn-xs add-products-btn' onClick={() => { onOpenProductImport() }} >Add products to product page</button>
        </div>
      </div>
      {
        <ImportCompletePopup openref={openref} onclose={onCloseProductImport} />
      }
      <div className="bulkupload-table-wrapper"  >
        <table>
          <thead>
            <tr className='product-tr-list'>
              <th> &nbsp;</th>
              <th> &nbsp;</th>
              <th className='uppercase'>Name</th>
              {/* <th className='uppercase'>SKU</th> */}
              <th className='uppercase'>INVENTORY</th>
              <th className='uppercase'>Status</th>
              <th className=''></th>
            </tr>
          </thead>
          <tbody>
            <React.Fragment>

              <React.Fragment key={""}>
                <tr className={` product-list-td-wrapper cursor-pointer  `}>
                  <td style={{ paddingRight: '0px' }}>
                    <div className='order-list-th-cheqbox order-list-th-wrapper'>
                      <CheckboxInput
                        // label={"Continue selling when out of stock"}
                        // LabelClass={"label-heading eComm-checkbox-center"}
                        className={"eComm-checkbox"}

                      />
                    </div>
                  </td>
                  <td style={{ paddingRight: '0px' }}>

                    <div className='order-list-th-wrapper'>
                      <div className='product-image-wraper-div'>
                        <img src={ProductImage} alt="productImage" />
                      </div>
                    </div>

                  </td>
                  <td>
                    <AppLink to={``}>
                      <div className='order-list-th-wrapper'>
                        <p className='text-xs gray w-400'>Black Tshirt ajksur...</p>
                      </div>
                    </AppLink>
                  </td>
                  {/* <td >
                                      <div className='order-list-th-wrapper'>
                                        <p className='text-xs w-400'>122112311323434</p>
                                      </div>
                                    </td> */}
                  <td data-label="Select all">
                    <AppLink to={``}>
                      <div className='order-list-th-wrapper'>
                        <p className='text-xxs base w-400'>  in stock for  variants </p>

                      </div>
                    </AppLink>
                  </td>
                  <td data-label="Select all">
                    <div className='order-list-th-wrapper '>
                      {/* when prodcut is is active add 'green' class and otherwise add 'red' class below */}
                      {/* <p className={`text-xs w-400 green`}>{op.productActive ? 'Active' : 'Inactive'}</p> */}
                      <select
                        id="weightSelect"

                      >
                        <option className=' text-2xs w-400 secondaryL' value={true}>Active</option>
                        <option className=' text-2xs w-400 ' value={false}>In active</option>
                      </select>
                    </div>
                  </td>
                  <td className='td-three-dot'>
                    <div className='three-dot-imge-div' >
                      <img src={ThreeDots} alt="dot icon" className='product-three-dot-img' />
                      {/* <i className="ed-icon icon-delete base i-xs icons-delete" onClick={() => { handleAcceptPopup(i) }} ></i> */}


                      <div className='threedot-wapper'>
                        <AppLink to={``} className='btn-text-blue mt-5 ' >Edit</AppLink>
                        <hr className='product-list-hr' />
                        <button className='btn-text-blue red'>Delete</button>

                      </div>

                    </div>

                  </td>
                </tr>
                <hr className='horizontal-line' />


              </React.Fragment>
              {/* <NoDataAvailable title="No records found." />
              <div className="loadingGridData"><i className="ed-loadingGrid"></i></div> */}

            </React.Fragment>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BulkuploadList