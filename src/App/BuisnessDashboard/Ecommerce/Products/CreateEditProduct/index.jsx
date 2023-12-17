import React, { useImperativeHandle } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Breadcrumb from '../../../../../Common/Breadcrumb'
import BreadcrumbItem from '../../../../../Common/Breadcrumb/BreadcrumbItem'
import { getAllCategoryList } from '../../../../../store/actions/ecomAdmin'
import { getAddProductCollectionList } from '../../../../../store/actions/ecommerce/action/collection'
import { createProduct, editProduct, getSingleProduct, resetCreateProduct, resetEditProduct, resetGetSingleProduct } from '../../../../../store/actions/ecommerce/action/product'
import Toast from '../../../../../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/CommonComponent/CommonJsx/Toast/Toast'
import '../../../../Dashboard/EcommerceDashboard/pages/addProduct.scss'
import Inventory from './Inventory'
import Pricing from './Pricing'
import ProductInfo from './ProductInfo'
import ProductSidebar from './ProductSidebar'
import ProductUpload from './ProductUpload'
import Variations from './Variations'
const CreateEditProduct = () => {
  const dispatch = useDispatch()

  // const { data, loading, success } = useSelector((state) => state.productList.slugAvailability)
  const { users, createProductSuccess, skuMessage, createProductLoading, editProductSuccess, editProductLoading, productDetails, productDetailsSuccess } = useSelector((state) => {
    return {
      users: state.user,
      createProductSuccess: state.productList.createProduct.success,
      createProductLoading: state.productList.createProduct.loading,
      editProductLoading: state.productList.editProduct.loading,
      editProductSuccess: state.productList.editProduct.success,
      productDetails: state.productList.getSingleProduct.data,
      productDetailsSuccess: state.productList.getSingleProduct.success,
      skuMessage: state.productList.skuAvailability.data,
    }
  })


  const { _id } = useParams()
  const history = useNavigate()
  const [productInfo, setProductInfo] = useState({})
  const [pricingInfo, setPricingInfo] = useState({})
  const [inventoryInfo, setInventoryInfo] = useState({})
  const [productImages, setProductImages] = useState([])
  const [variantError, setVariantError] = useState(false)
  const [productVariations, setProductVariations] = useState([])
  const [sideBarData, setSideBarData] = useState({})
  const [productInfoValid, setproductInfoValid] = useState(false);
  const [priceInfoValid, setpriceInfoValid] = useState(false);
  const [inventoryInfoValid, setinventoryInfoValid] = useState(false);
  const [infoError, setInfoError] = useState(false);
  const [variationStatus, setVariationStatus] = useState(false)
  const [deleteVariation, setDeleteVariation] = useState(false)
  const contactRef=useRef(null)
  const handleProductInfo = (value) => {
    setProductInfo(value)
  }
  const handlePricingData = (value) => {
    setPricingInfo(value)
  }
  const handleInventoryData = (value) => {
    setInventoryInfo(value)
  }
  const handleProductImages = (value) => {
    setProductImages([...value])
  }
  const handleProductVariations = (value) => {
    setProductVariations(value)
    // console.log(value)
  }
  useEffect(() => {
    dispatch(getAllCategoryList(users.user_business))
    dispatch(getAddProductCollectionList(users.user_business, "id"))
  }, [dispatch, users.user_business])
  const handleCancel = () => {
    history(`/ecommerce/productList`)
  }
  const handleProductSideBarData = (value) => {
    setSideBarData(value)
  }
  const isFormValid = (value, type) => {
    if (type === "productInfo") {
      if (value) {
        setproductInfoValid(true);
      }
      else {
        setproductInfoValid(false);
      }
    }
    if (type === "priceInfo") {
      if (value) {
        setpriceInfoValid(true);
      }
      else {
        setpriceInfoValid(false);
      }
    }
    if (type === "inventoryInfo") {
      if (value) {
        setinventoryInfoValid(true);
      }
      else {
        setinventoryInfoValid(false);
      }
    }
  }
  
  useEffect(() => {
    if (createProductSuccess || editProductSuccess) {
      if(contactRef?.current?.contact){
        history("/marketing-form")
      }else{
      history("/ecommerce/productList")
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createProductSuccess, editProductSuccess])
  useEffect(() => {
    return () => {
      dispatch(resetCreateProduct())
      dispatch(resetGetSingleProduct())
      dispatch(resetEditProduct())
    }
  }, [dispatch])


  const unCategorized = () => {
    if (productInfo.selectedCategroy?.category.length || productInfo.selectedCategroy?.subcategory.length || productInfo.selectedCategroy?.subsubcategory.length) {
      return false
    } else {
      return true
    }
  }

  const areVariantsValid = () => {
    let isValid = false
    if (productVariations.productVariations && productVariations.productVariations.length > 0) {
      if (productVariations.productVariations.every((item) => item.done === true)) {
        isValid = true
      } else {
        setVariantError(true)
        isValid = false
      }

    } else {
      isValid = true
    }
    return isValid
  }
  const prepData = () => {
    if (_id) {
      return {
        product: {
          _id: _id,
          productName: productInfo.productTitle,
          productDescription: productInfo.productDescription,
          ribbon: productInfo.productRibbon,
          uncategorized: unCategorized(),
          shipping_cost: parseInt(pricingInfo.shippingCharge),
          categoryId: productInfo.selectedCategroy?.category.length ? productInfo.selectedCategroy?.category : [],
          subCategoryId: productInfo.selectedCategroy?.subcategory.length ? productInfo.selectedCategroy?.subcategory : [],
          subSubCategoryId: productInfo.selectedCategroy?.subsubcategory ? productInfo.selectedCategroy?.subsubcategory : [],
          defaultCategoryCheck: productInfo.defaultCategoryCheck,
          defaultCategory: [
            {
              category_level: 0,
              id: productInfo.selectedCategroy?.category.length ? productInfo.selectedCategroy?.category : [],
            }, {
              category_level: 1,
              id: productInfo.selectedCategroy?.subcategory.length ? productInfo.selectedCategroy?.subcategory : [],
            }, {
              category_level: 2,
              id: productInfo.selectedCategroy?.subsubcategory ? productInfo.selectedCategroy?.subsubcategory : [],
            }
          ],
          businessShopId: users.user_business,
          collectionId: sideBarData.collections?.collectionIds,
          allowCancellation: sideBarData?.AllowCancellationDataNew,
          productPicture: productImages,
          price: pricingInfo.price,
          onSale: pricingInfo.onSale,
          salePrice: pricingInfo.onSale && pricingInfo.salePrice ? parseInt(pricingInfo.salePrice) : 0,
          costPrice: parseInt(pricingInfo.cog),
          profit: parseInt(pricingInfo.profit),
          discountAvailability: false,
          discountFix: 0,
          discount_by_percent: pricingInfo.discount_by_percent,
          discountPercentage: parseInt(pricingInfo.discount),
          stock: parseInt(inventoryInfo.productAvailableQty),
          SKU: inventoryInfo.productSKU,
          barcode: inventoryInfo.productBarcode,
          productActive: sideBarData.status,
          cod: sideBarData.payments?.COD,
          miscellaneous: productInfo.specificationArray,
          metaTitle: sideBarData.seoData?.title,
          metaDescription: sideBarData.seoData?.desc,
          metaKeywords: sideBarData.seoData?.keywords,
          urlSlug: sideBarData.seoData?.url,
          variant: productVariations.productVariations,

        },
        variation: productVariations.mappedVariations
      }
    } else {
      return {
        product: {
          productName: productInfo.productTitle,
          productDescription: productInfo.productDescription,
          ribbon: productInfo.productRibbon,
          uncategorized: unCategorized(),
          shipping_cost: parseInt(pricingInfo.shippingCharge),
          categoryId: productInfo.selectedCategroy?.category.length ? productInfo.selectedCategroy?.category : [],
          subCategoryId: productInfo.selectedCategroy?.subcategory.length ? productInfo.selectedCategroy?.subcategory : [],
          subSubCategoryId: productInfo.selectedCategroy?.subsubcategory ? productInfo.selectedCategroy?.subsubcategory : [],
          defaultCategoryCheck: productInfo.defaultCategoryCheck,
          defaultCategory: [
            {
              category_level: 0,
              id: productInfo.selectedCategroy?.category.length ? productInfo.selectedCategroy?.category : [],
            }, {
              category_level: 1,
              id: productInfo.selectedCategroy?.subcategory.length ? productInfo.selectedCategroy?.subcategory : [],
            }, {
              category_level: 2,
              id: productInfo.selectedCategroy?.subsubcategory ? productInfo.selectedCategroy?.subsubcategory : [],
            }
          ],
          businessShopId: users.user_business,
          collectionId: sideBarData.collections?.collectionIds,
          productPicture: productImages,
          allowCancellation: sideBarData.AllowCancellationDataNew,
          price: parseInt(pricingInfo.price),
          costPrice: parseInt(pricingInfo.cog),
          profit: parseInt(pricingInfo.profit),
          discountAvailability: false,
          discountFix: 0,
          discount_by_percent: pricingInfo.discount_by_percent,
          discountPercentage: parseInt(pricingInfo.discount),
          onSale: pricingInfo.onSale,
          salePrice: pricingInfo.onSale && pricingInfo.salePrice ? parseInt(pricingInfo.salePrice) : 0,
          stock: parseInt(inventoryInfo.productAvailableQty),
          SKU: inventoryInfo.productSKU,
          barcode: inventoryInfo.productBarcode,
          productActive: sideBarData.status,
          cod: sideBarData.payments?.COD,
          miscellaneous: productInfo.specificationArray,
          metaTitle: sideBarData.seoData?.title,
          metaDescription: sideBarData.seoData?.desc,
          urlSlug: sideBarData.seoData?.url,
          metaKeywords: sideBarData.seoData?.keywords ? sideBarData.seoData?.keywords : [],
          variant: productVariations.productVariations
        },
        variations: productVariations.mappedVariations
      }
    }

  }
  const handleVariationStatus = (val) => {
    setVariationStatus(val)
  }
  const handleDeleteVariationFromList = (val) => {
    setDeleteVariation(val)
  }
  const handleSave = () => {
    let variantsValid = areVariantsValid()
    if (productInfoValid && priceInfoValid && inventoryInfoValid && skuMessage !== "Not available" && variantsValid) {
      console.log("hihihihihihi")
      if (_id) {
        dispatch(editProduct(prepData(), variationStatus ? "product-variation-new" : "product-variation-edit", users.user_business, _id))
      } else {
        dispatch(createProduct(prepData(), users.user_dashboard_stepper))
      }
      setInfoError(false);
      contactRef.current.error=false
    }
    else {
      setInfoError(true);
      contactRef.current.error=true
    }
  }
  useEffect(() => {
    if (_id) {
      dispatch(getSingleProduct(_id))
    }
  }, [_id, dispatch]);

  // useEffect(() => {
  //   if (_id) {
  //     dispatch(editProduct(_id))
  //   }
  // }, [_id, dispatch])

  // console.log(_id, "line240")

   useEffect(() => {
    if (_id) {
      setProductImages(productDetails.product?.productPicture ? productDetails.product?.productPicture : [])
    }
  }, [_id, productDetails.product?.productPicture])
 useImperativeHandle(contactRef, () => ({
    saveProduct: () => handleSave(),
    error:null,
    contact:null

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [productInfoValid,priceInfoValid,inventoryInfoValid])
  // console.log(productInfo, pricingInfo, inventoryInfo, productImages, productVariations, sideBarData, "jjijiijijijijijijjijijijijijijijij")
  return (
    <React.Fragment>
      <div className=''>
        {_id && !productDetailsSuccess ? (
          <div className="loadingGridData">
            <i className="ed-loadingGrid"></i>
          </div>
        ) : (
          <div className='e-commerce-container'>
            <Breadcrumb>
              <BreadcrumbItem to="/" title="Dashboard" />
              <BreadcrumbItem to="/ecommerce/productList" title="Products" />
              <BreadcrumbItem to="/ecommerce/create-product" title="Add Product" />
            </Breadcrumb>
            <div className='top-button-section-wrap mb-25'>
              <h3 className='heading '>Product</h3>
              <div className='top-left-button-section'>
                <button className='button button-o-primary primary btn-oval btn-sm btn-primary-border' onClick={handleCancel}>Cancel</button>
                {
                  createProductLoading || editProductLoading ?
                    <button className='button button-primary btn-oval btn-sm' >Saving...</button> :
                    <button className='button button-primary btn-oval btn-sm' onClick={handleSave}>Save</button>
                }
              </div>
            </div>

            <div className='addProduct-top-container'>
              <div className='add-product-left'>
                <ProductInfo onLoadProductInfoData={handleProductInfo} isFormValid={(val) => isFormValid(val, "productInfo")} infoError={infoError} />
                <ProductUpload productName={productInfo.productTitle} onLoadProductImages={handleProductImages} />
                <Pricing onLoadPricingData={handlePricingData} isFormValid={(val) => isFormValid(val, "priceInfo")} infoError={infoError} />
                <Inventory productName={productInfo.productTitle} onLoadInventoryData={handleInventoryData} isFormValid={(val) => isFormValid(val, "inventoryInfo")} infoError={infoError} />
                <Variations variantError={variantError} productInfo={productInfo} pricingInfo={pricingInfo} inventoryInfo={inventoryInfo} productImages={productImages} sideBarData={sideBarData} onLoadVariationsData={handleProductVariations} handleVariationStatus={handleVariationStatus} isFormValid={(val) => isFormValid(val, "inventoryInfo")} infoError={infoError} addProduct={true} deleteVariationFromList={handleDeleteVariationFromList} />
                <div>
                </div>
              </div>
              <div className='add-product-left'>
                <ProductSidebar productName={productInfo.productTitle} contactRef={contactRef} productDesc={productInfo.productDescription} onLoadSideBarData={handleProductSideBarData} />
              </div>
            </div>

            <div className='bottom-left-button-section'>
              <button className='button button-o-primary primary btn-oval btn-sm btn-primary-border' onClick={handleCancel}>Cancel</button>
              {
                createProductLoading || editProductLoading ?
                  <button className='button button-primary btn-oval btn-sm' >Saving...</button> :
                  <button className='button button-primary btn-oval btn-sm' onClick={handleSave}>Save</button>
              }

            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  )
}
export default CreateEditProduct