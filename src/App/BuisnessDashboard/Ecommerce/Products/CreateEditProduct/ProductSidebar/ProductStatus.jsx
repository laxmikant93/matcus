import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ProductStatus = ({ handleProductStatus }) => {

  const { productDetails } = useSelector((state) => {
    return {
      productDetails: state.productList.getSingleProduct.data,
    }
  })
  const { _id } = useParams()

  const [status, setStatus] = useState("active");

  const handleStatus = (e) => {
    setStatus(e.target.value)
    handleProductStatus(e.target.value)
  }

  useEffect(() => {
    if (productDetails && _id) {
      setStatus(productDetails.product.productActive);
    }
  }, [_id, productDetails])

  return (
    <React.Fragment>
      <div className='addProduct-container'>
        <div className='e-commerce-wrap'>
          <p className='sidebar-heading '>Product Status</p>
          <div className='sidebar-info-wrap side-padding '>
            <div className="formFieldwrap sidebar-formgroup ">
              <div className="addProduct-align-div ">
                <select
                  id="list"
                  value={status}
                  onChange={handleStatus}
                >
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                </select>
              </div>
            </div>
            <p className='text-xxs w-300'>{status === "draft" ? "This product will be hidden from all sales channels." : "This product will be shown in all sales channels."}</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
export default ProductStatus