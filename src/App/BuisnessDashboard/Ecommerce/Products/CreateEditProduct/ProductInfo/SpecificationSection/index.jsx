import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AddEditSpecification from "./AddEditSpecification";
import DeleteSpecification from "./DeleteSpecification";

const SpecificationSection = ({ onLoadSpecificationData }) => {

  const infoSectionRef = useRef(null);
  const deleteInfoRef = useRef(null);
  const [infoDataArray, setInfoDataArray] = useState([]);
  const [infoIndex, setInfoIndex] = useState("");
  const { _id } = useParams()
  const { productDetails } = useSelector((state) => {
    return {
      productDetails: state.productList.getSingleProduct.data,
    }
  })

  useEffect(() => {
    if (productDetails && _id) {
      setInfoDataArray(productDetails.product.miscellaneous);
    }
  }, [_id, productDetails])

  const handleAddSectionButton = () => {
    infoSectionRef.current.open();
  }

  const handleCloseModal = () => {

  }

  const handleEditInfo = (index) => {
    setInfoIndex(index);
    infoSectionRef.current.open();
  }

  const handleDeleteInfo = (index) => {
    setInfoIndex(index);
    deleteInfoRef.current.open();
  }
  useEffect(() => {
    onLoadSpecificationData(infoDataArray)
  }, [infoDataArray])
  return (
    <React.Fragment>
      <div className='inline between-lg between-xs add-section-div align-center'>
        <p className='text-xs w-400 base'>Additional Specification Section</p>
        {infoDataArray.length < 6 ?
          <button className='button btn-o-primary primary  btn-3xs btn-primary-border ' onClick={handleAddSectionButton} >Add Section</button>
          :
          ""
        }

      </div>
      <div className=' shipping-return-info-item'>
        {infoDataArray?.length > 0 ?
          <div>
            {infoDataArray.length > 0 ? infoDataArray.map((item, i) => {
              return (
                <div
                  className='title-edit-delete-wrapper'
                  key={i}>
                  <p className='text-xs base w-500 title-div'> {item.title} </p>
                  <div className='inline align-center between-lg '>
                    <p className='text-xxs description-div w-400'>{item.description}</p>
                    <div className='inline align-center edit-delete-wrapper '>
                      <i className="ed-icon i-xs primary icon-edit " onClick={() => handleEditInfo(i)}></i>
                      <i className="ed-icon i-xs primary icon-delete " onClick={() => handleDeleteInfo(i)}></i>
                    </div>
                  </div>

                </div>
              );
            }) : ""}
          </div>
          :
          <p>Add information like Materials, Shipping & Returns Policy, Benefits & product info. with your customer.</p>
        }
      </div>
      <AddEditSpecification infoSectionRef={infoSectionRef} onClose={handleCloseModal} infoIndex={infoIndex} setInfoIndex={(value) => setInfoIndex(value)} infoDataArray={infoDataArray} setInfoDataArray={(val) => setInfoDataArray(val)} />
      <DeleteSpecification deleteInfoRef={deleteInfoRef} onClose={handleCloseModal} infoIndex={infoIndex} setInfoIndex={(value) => setInfoIndex(value)} infoDataArray={infoDataArray} setInfoDataArray={(val) => setInfoDataArray(val)} />
    </React.Fragment>
  )
}
export default SpecificationSection