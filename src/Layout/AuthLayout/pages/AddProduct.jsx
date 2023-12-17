import React, { useState } from 'react';
import { useRef } from 'react';
import EcommerceHome from '../index';
// import FileUpload from '../../../FileUpload/index';
// import InputFileBtn from '../../../../Common/Form/InputFileBtn';
import OpenImgaes from '../assets/icons/openImagesIcon.svg';
import OpenVideos from '../assets/icons/openvideoIcon.svg';
import IButton from '../assets/icons/i-Vector.svg';
import Delete from '../../../../assets/Icons/icon-delete.svg'
import CheckboxInput from '../../../../Common/Form/CheckboxInput';
import EDropdown from '../Component/EDropdown';

import './addProduct.scss';



const AddProduct = () => {
  const inputFile = useRef(null);
  // to open file when click on addimages
  const hanndleFile = (e) => {
    inputFile.current.click();
  };

  const menuColor = ['black', 'pink', 'white', 'green', 'blue'];
  const menuSize = ['S', 'M', 'L', 'XL', 'XXL'];
  const menuStyle = ['half sleeve', 'full sleeve', 'half neck', 'full neck'];

  return (
    <React.Fragment>
      <EcommerceHome>
        <div className='e-commerce-container'>

          <h3 className='heading heading-topPadding'>Product</h3>
          <div className='e-commerce-wrap'>
            <p className='e-commerce-card-para'>Product info</p>
            <hr className='horizontal-line' />
            <div className='product-info-wrap'>
              <form action="">
                <div className='product-form-group '>
                  <div className='form-group-ecommerce mb-30'>
                    <label for="name" className='label-heading'>
                      Name
                    </label>
                    <input type="text" id='name' placeholder="Add a product name" />
                  </div>

                  <div className='form-group-ecommerce mb-30'>
                    <label for="Ribbon" className='label-heading'>
                      Ribbon
                    </label>
                    <input type="text" id="Ribbon" placeholder="e.g., New Arrival" />
                  </div>
                </div>
                <div className=''>
                  <div className='form-group-textArea '>
                    <label for="Description" className='label-heading mb-10'>
                      Description
                    </label>
                    <textarea id="textarea" name="Description" placeholder='Add description about the product'>
                    </textarea>
                  </div>
                </div>

              </form>
            </div>
          </div>
          {/* // next section */}
          <div className='e-commerce-wrap sectionGap'>
            <p className='e-commerce-card-para'>Product Images & Videos</p>
            <hr className='horizontal-line' />
            <div className='uploadwrap'>
              <div className='upload addImages' onClick={hanndleFile}>
                <input
                  type="file"
                  id="file"
                  ref={inputFile}
                  style={{ display: "none" }}
                />
                <div className='upload-icons'>
                  <span><img src={OpenImgaes} alt="" /></span><span className='addText'>Add Images</span>
                </div>

              </div>
              <div className='upload addImages' onClick={hanndleFile}>
                <input
                  type="file"
                  id="file"
                  ref={inputFile}
                  style={{ display: "none" }}
                />
                <div className='upload-icons'>
                  <span><img src={OpenVideos} alt="" /></span> <span className='addText '>Add Videos</span>
                </div>
              </div>
            </div>
          </div>

          {/* pricing section */}
          <div className='e-commerce-wrap sectionGap'>
            <p className='e-commerce-card-para'>Pricing</p>
            <hr className='horizontal-line' />
            <div className='product-info-wrap'>
              <div className='pricing-price-input-wrap'>
                <div className='form-group-ecommerce mb-30'>
                  <label for="price" className='label-heading'>
                    Price
                  </label>
                  <input type="text" id='price' placeholder="₹" />
                </div>
              </div>
              <div className='pricing-discount-section'>
                < CheckboxInput
                  label={"On Sale"}
                  LabelClass={"label-heading eComm-checkbox-center"}
                  className={"eComm-checkbox"}
                />
                <div className='pricing-input-wrap'>
                  <div className='form-group-ecommerce mb-30'>
                    <label for="discount" className='label-heading'>
                      Discount
                    </label>
                    <div className='discount-lower-wrap'>
                      <input type="text" id='discount' placeholder="₹" className='discound-input' />
                      <div className='discount-lower-spans'>
                        <span className='percentage-span'>%</span> <span>₹</span>
                      </div>
                    </div>
                  </div>
                  <div className='form-group-ecommerce mb-30'>
                    <label for="sale-Price" className='label-heading'>
                      Sale Price(₹)
                    </label>
                    <input type="text" id='sale-Price' placeholder="₹" />
                  </div>
                </div>
              </div>
              {/* cost of goods inputs */}
              <div className='goods-section'>
                <div className='goods-section-wrap'>
                  <div className='form-group-ecommerce '>
                    <div className='goods-section-label-wrap'>
                      <label for="cost-of-goods" className='label-heading label-heading-margin'>
                        Cost of Goods
                      </label>
                      <img src={IButton} alt="icon" titile="The amount invested to produce and sell this product." />

                    </div>
                    <input type="text" id='cost-of-goods' placeholder="₹" />
                  </div>
                  <div className='form-group-ecommerce '>
                    <div className='goods-section-label-wrap'>
                      <label for="profit" className='label-heading label-heading-margin'>
                        Profit
                      </label>
                      <img src={IButton} alt="icon" title="Product price after deducting the cost of goods." />
                    </div>
                    <input type="text" id='profit' placeholder="₹" />
                  </div>
                  <div className='form-group-ecommerce '>
                    <div className='goods-section-label-wrap'>
                      <label for="margin" className='label-heading label-heading-margin'>
                        Margin
                      </label>
                      <img src={IButton} alt="icon" title="Price percentage left after subtracting the cost of goods." />
                    </div>
                    <input type="text" id='margin' placeholder="₹" />
                  </div>
                </div>
                <p className='text-xs gray mt-10 w-300'>Customers won’t see this</p>
              </div>
            </div>
          </div>

          {/* Invertory Area */}
          <div className='e-commerce-wrap sectionGap'>
            <p className='e-commerce-card-para'>Inventory</p>
            <hr className='horizontal-line' />
            <div className='product-info-wrap'>
              <div className='product-form-group'>
                <div className='form-group-ecommerce mb-30'>
                  <label for="sku" className='label-heading'>
                    SKU (Stock Keeping Unit)
                  </label>
                  <input type="text" id='sku' placeholder="" />
                </div>

                <div className='form-group-ecommerce mb-30'>
                  <label for="barcode" className='label-heading'>
                    Barcode(ISBN, UPC, GTIN, etc)
                  </label>
                  <input type="text" id="barcode" placeholder="" />
                </div>
              </div>
              <div className='inventory-check-quality-wrap'>
                < CheckboxInput
                  label={"Track quantity"}
                  LabelClass={"label-heading eComm-checkbox-center"}
                  className={"eComm-checkbox"}
                />
                < CheckboxInput
                  label={"Continue selling when out of stock"}
                  LabelClass={"label-heading eComm-checkbox-center"}
                  className={"eComm-checkbox"}
                />
              </div>
            </div>
            {/* horizontal line will be place here */}
            <hr className='horizontal-line mt-15' />
            <div className='inventory-bottom-section'>
              <p className='mt-20 label-heading'>QUANTITY</p>
              <div className='form-group-ecommerce mt-30'>
                <label for="available" className='label-heading'>
                  Available
                </label>
                <input type="text" id='available' placeholder="0" />
              </div>
            </div>
          </div>

          {/* add size and quantity section */}

          <div className='e-commerce-wrap sectionGap'>
            <p className='add-varient-card-para '>Set size or color for this product</p>
            <div className='section-padding-left'>
              < CheckboxInput
                label={"Continue selling when out of stock"}
                LabelClass={"label-heading eComm-checkbox-center"}
                className={"eComm-checkbox"}
              />
            </div>

            {/* add another option map loop start here */}

            < div className='addProduct-option-container'>
              <hr className='horizontal-line' />
              <div className='addProduct-option-wrap  section-padding-left'>
                <div className='addproduct-dropdown '>
                  <label className='label-heading'>
                    Option name
                  </label>
                  <div className='addProduct-align-div'>
                    <select name="ecommerce" >
                      <option value="">Size</option>
                      <option value="">color</option>
                      <option value="">varient</option>
                    </select>
                    <div ><img src={Delete} className="addproduct-delete-icon" alt="delete icon" /></div>
                  </div>
                </div>

                <div className='addProduct-options-list-wrap'>
                  <label className='label-heading'>
                    Option values
                  </label>
                  <div className='addproduct-options-list'>
                    {/* options value loop display here */}
                    <div className='addProduct-options-div '>
                      <input type="text" id='available' />
                      <img src={Delete} className="addproduct-delete-icon" alt="delete icon" />
                    </div>
                    {/* loop end here */}

                    {/* add value button  */}
                    <button className='add-values-btn'>Add another value </button>
                    <button className='button button-o-silver mt-15' >Done</button>
                  </div>
                </div>
              </div>
            </div>
            {/* add another option map loop end here */}



            {/* when submit button clicked this screen appers */}
            <div className='show-all-option-container'>
              {/* option loop start here */}
              <div>
                <hr className='horizontal-line' />
                <div className='show-all-option-wrap'>
                  <div className='show-all-inner-div   '>
                    <p className='label-heading'>size</p>
                    <button className='edit-btn '>Edit</button>
                  </div>
                  <div className='show-all-options-wrap'>
                    {/* options value loop start here */}
                    <div className='options'> S</div>
                    <div className='options'> M</div>
                    <div className='options'> L</div>
                    <div className='options'>XL</div>
                    {/* options value loop start here */}
                  </div>
                </div>
              </div>
              {/* options loop end here */}
            </div>

            {/* add another option button */}
            <div className='add-more-option-wrap'>
              <hr className='horizental-line' />
              <div className='add-more-btn-wrap section-padding-left '>
                <button className='add-another-option-btn'><span><i className='ed-icon icon-plus-add primary i-xs'></i></span> <span>add another option</span></button>
              </div>
            </div>
          </div>

          {/* varient after section */}
          <div className='e-commerce-wrap sectionGap'>
            <div className='varients-after-top-section'>
              <p className='e-commerce-card-para'>Product Images & Videos</p>
              <button className='edit-btn add-varient-btn '>Add Varients</button>
            </div>

            <hr className='horizontal-line' />
            <div className='varients-after-wrap'>
              <div className='varients-after-topDropn-container'>
                <p className='text-skm gray w-400'>select</p>
                <EDropdown menuName={"Size"} menuOptions={menuSize} />
                <EDropdown menuName={"Color"} menuOptions={menuColor} />
                <EDropdown menuName={"Style"} menuOptions={menuStyle} />
              </div>
              <div className='varients-after-product-table-container'>
                <div className="gridListTable">
                  <ul className="gridHeader">
                    <li className="col col-1">
                      < CheckboxInput
                        // label={"Continue selling when out of stock"}
                        LabelClass={"label-heading eComm-checkbox-center"}
                        className={"eComm-checkbox"}
                      />
                    </li>
                    <li className="col col-3"> Varient</li>
                    <li className="col col-2"> Price</li>
                    <li className="col col-2">Quantity</li>
                    <li className="col col-2">SKU</li>
                    <li className="col col-2">Barcode</li>
                    <li className="col col-2"></li>

                  </ul>
                </div>
                <hr className='horizental-line' />
                <div className='gridBody'>
                  <ul className="topInfo">
                    <li className='col col-4'>

                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* varient after section end here */}
        </div>
      </EcommerceHome>
    </React.Fragment >
  )
}

export default AddProduct