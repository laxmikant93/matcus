import React from "react";
import Collections from "./Collections";
import Payments from "./Payments";
import ProductStatus from "./ProductStatus";
import SeoSettings from "./SeoSettings";

import '../../../../../Dashboard/EcommerceDashboard/pages/sidebar.scss'
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Return from "./Return";
import Cancellation from "./Cancellation";
const ProductSidebar = ({ productName, productDesc, onLoadSideBarData,contactRef }) => {
  const [status, setStatus] = useState("active")
  const [collections, setCollections] = useState({})
  const [payments, setPayments] = useState()
  const [seoData, setSeoData] = useState({})
  const [AllowCancellationDataNew, setAllowCancellationDataNew] = useState()
  const handleStatus = (value) => {
    setStatus(value)
  }
  console.log(contactRef,"jjijijiji")
  const { productDetails } = useSelector((state) => {
    return {
      productDetails: state.productList.getSingleProduct.data,
    }
  })
  const { _id } = useParams()
  const handleCollections = (value) => {
    setCollections(value)
  }
  const handlePayments = (value) => {
    setPayments(value)
  }
  const handleSeoData = (value) => {
    setSeoData(value)
  }
  useEffect(() => {
    onLoadSideBarData({
      status: status,
      collections: collections,
      payments: payments,
      seoData: seoData,
      AllowCancellationDataNew: AllowCancellationDataNew
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collections, payments, seoData, status, AllowCancellationDataNew])
  useEffect(() => {
    if (productDetails && _id) {
      setStatus(productDetails.product.productActive);
      setAllowCancellationDataNew(productDetails.product.allowCancellation)
    }
  }, [_id, productDetails])

  const oncancellationData = (value) => {
    setAllowCancellationDataNew(value)
  }
  return (
    <React.Fragment>
      <div className='sidebar-container'>
        <ProductStatus handleProductStatus={handleStatus} />
        {/* collection section */}
        <Collections onLoadCollections={handleCollections} />
        {/* delivery section */}
        <Payments onLoadPayments={handlePayments} />
        {/* return section  */}
        {/* <Return /> */}
        {/* cancelation section */}
        <Cancellation oncancellationData={oncancellationData} />
        {/* seo setting */}
        <SeoSettings contactRef={contactRef} productName={productName} productDesc={productDesc} onLoadSeoData={handleSeoData} />
      </div>
    </React.Fragment>
  )
}
export default ProductSidebar