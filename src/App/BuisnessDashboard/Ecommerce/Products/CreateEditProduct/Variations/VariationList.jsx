import React from "react";
import CheckboxInput from "../../../../../../Common/Form/CheckboxInput";
import FormInput from "../../../../../../Common/Form/FormInput";
import EDropdown from "../../../../../../Layout/AuthLayout/Component/EDropdown";

import Delete from '../../../../../../assets/Icons/icon-delete.svg'
import DefaultImage from '../../../../../Dashboard/EcommerceDashboard/assets/images/Product_default.jpg'
import { useState } from "react";
import "./variationList.scss"
import Varientpopup from "../../../../../Dashboard/EcommerceDashboard/Component/VarientPopup/Varientpopup";
const VariationList = ({ productVariationCheck, deleteVariation, handleVariationInput, filterVarients, productVariations, mappedVariations, showVariationList }) => {

  const [deleteIdsArray, setDeleteIdsArray] = useState([])
  const [selectedVariations, setSelectedVariations] = useState([])
  const handleVariationCheckBox = (e, type, value) => {
    if (type === "multi") {
      if (value === "all") {
        if (e.target.checked) {
          let variationArray = mappedVariations;
          let array = deleteIdsArray
          array = mappedVariations.map((item, i) => i)
          let data = variationArray.map((item, i) => {
            return {
              ...item,
              selected: true
            }
          })
          // console.log(data)
          setSelectedVariations([...data])
          setDeleteIdsArray([...array])
        } else {
          let variationArray = mappedVariations;
          let array = []
          let data = variationArray.map((item, i) => {
            return {
              ...item,
              selected: false
            }
          })
          // console.log(data)
          setSelectedVariations([...data])
          setDeleteIdsArray([...array])
        }

      }
    } else {
      if (e.target.checked) {
        let array = deleteIdsArray
        let variationArray = mappedVariations;
        array.push(value)
        variationArray[value]['selected'] = true
        setSelectedVariations([...variationArray])
        setDeleteIdsArray([...array])
      } else {
        let array = deleteIdsArray
        let variationArray = mappedVariations;
        let index = array.indexOf(value)
        array.splice(index, 1)
        variationArray[value]['selected'] = false
        setSelectedVariations([...variationArray])
        setDeleteIdsArray([...array])
      }
    }
  }

  const handleDelete = (i, type) => {
    let variationArray = mappedVariations;
    if (type === "multi") {
      deleteVariation(selectedVariations)
      setDeleteIdsArray([])
    } else {
      variationArray[i]['selected'] = true
      deleteVariation([...variationArray])
      setDeleteIdsArray([])
    }

  }

  return (
    <React.Fragment>
      {showVariationList && productVariationCheck && mappedVariations && mappedVariations.length > 0 &&
        <div className='e-commerce-wrap sectionGap'>
          <div className='varients-after-top-section'>
            <p className='e-commerce-card-para'>Product Images & Videos ({mappedVariations.length})</p>
            {/* <div>
            <button className=' button button-white primary text-regf'>Open Full</button>
            <button className='edit-btn add-varient-btn '>Add Varients</button>
          </div> */}

          </div>

          <hr className='horizontal-line' />
          <div className='varients-after-wrap'>
            <div className='varients-after-topDropn-container'>
              <div className="filter-item">
                <p className='text-regf gray w-400'>select</p>
                {productVariations.length > 0 && productVariations.filter((item) => item.done === true).map((v, i) => {
                  return (<Varientpopup menuName={v.title} menuOptions={v.value} selectOption={(val) => filterVarients(val, v.title, i)} />)
                })}
              </div>
              <div className="action-item">
                {/* {mappedVariations && mappedVariations.length > 0 && mappedVariations.map((v, i) => {
                return (
                  <div className='sidebar-edit-wrap'>
                    <img src={Delete} onClick={() => { deleteInputVar(i) }} className="addproduct-delete-icon" alt="delete icon" />
                  </div>
                );
              })} */}
              </div>
            </div>
            <div className='varients-after-product-table-container'>
              <div className="gridListTable ">
                <ul className="gridHeader height-20 mb-15">
                  <li className="col-2">
                    <CheckboxInput
                      label={""}
                      LabelClass={"label-heading eComm-checkbox-center"}
                      className={"eComm-checkbox"}
                      onChange={(e) => { handleVariationCheckBox(e, 'multi', "all") }}

                      checked={deleteIdsArray.length === mappedVariations.length}
                    />
                  </li>
                  {
                    deleteIdsArray.length ?
                      <li className='col-12' >
                        <div className='varients-after-checked-container section-padding-right'>
                          <div>
                            {/* <p className='text-regf w-500'>7 selected</p> */}
                            {/* <img src={Delete} className="addproduct-delete-icon" alt="delete icon" /> */}
                          </div>
                          <div className='varient-bulk-wrapper'>
                            {/* <button className='edit-btn'>open Bulk edit</button> */}
                            <p className='text-regf w-500'>{deleteIdsArray.length} selected</p>
                            <div><img src={Delete} className="addproduct-delete-icon" alt="delete icon" onClick={() => handleDelete("", "multi")} /></div>
                          </div>
                        </div>
                      </li>
                      :
                      <React.Fragment>
                        <li className="col-6 "> Varient</li>
                        <li className="col-4 "> Price diffrence (+/-)</li>
                        <li className="col-4 ">Quantity</li>
                        <li className="col-4 ">SKU</li>
                      </React.Fragment>
                  }
                </ul>

                <hr className='horizontal-line' />
                <div className='gridBody varients-after-grid-body '>
                  <div className='gridRow varients-grid-row'>

                    {mappedVariations && mappedVariations.length > 0 && mappedVariations.map((v, i) => {

                      return (v?.visible ?
                        <ul className="topInfo" key={i} >
                          <li className='col-0'>
                            <CheckboxInput
                              className={"eComm-checkbox"}
                              onChange={(e) => handleVariationCheckBox(e, "single", i)}
                              checked={deleteIdsArray.includes(i)}
                              value={i}
                            />
                          </li>
                          <li className="col col-6">
                            <div className='varient-table-col-container'>
                              <div className='varient-product-wrap'>
                                <div className='product-image-wraper-div'>
                                  <img src={v.productPicture.length > 0 ? v.productPicture[0] : DefaultImage} alt="productImage" className='img-response' />
                                </div>
                                <div className='varient-p'>
                                  {productVariations && productVariations.length > 0 && productVariations.map((va, k) => {
                                    return (
                                      <p className='mt-5' key={k} title={v[va.title.split(" ").join("")]}> <span className='text-2xs w-500'>{v[va.title.split(" ").join("")]}</span></p>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>

                          </li>
                          <li className="col col-4">
                            <div className='formFieldwrap form-padding-0 width-100'>
                              <FormInput
                                type="number"
                                id=""
                                name=""
                                value={v.price === 0 ? "" : v.price}
                                placeholder={"0"}
                                maxLength="80"
                                // className="inputPad"
                                onChange={(e) => (handleVariationInput(e.target.value, i, 'price'))}
                                onWheel={(e) => e.target.blur()}
                              />
                            </div>

                          </li>
                          <li className="col col-4">
                            <div className='formFieldwrap form-padding-0 width-100'>
                              <FormInput
                                type="number"
                                id=""
                                name=""
                                value={v.stock}
                                placeholder=""
                                maxLength="80"
                                className="inputPad"
                                onChange={(e) => (handleVariationInput(e.target.value, i, 'stock'))}
                                onWheel={(e) => e.target.blur()}
                              />
                            </div>
                          </li>
                          <li className="col col-4">
                            <div className='formFieldwrap form-padding-0 width-100'>
                              <FormInput
                                type="text"
                                id=""
                                name=""
                                disabled
                                value={v.SKU}
                                placeholder=""
                                maxLength="80"
                                className="inputPad"
                              />
                            </div>
                          </li>
                          {/* <div className='sidebar-edit-wrap'>
                            <img src={Delete} onClick={() => { handleDelete(i, "single") }} className="addproduct-delete-icon" alt="delete icon" />
                          </div> */}
                        </ul>
                        : null);
                    })}
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>}
    </React.Fragment>
  )
}
export default VariationList