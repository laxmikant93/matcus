import React from 'react'
import AppLink from '../../../../Common/AppLink'
import Breadcrumb from '../../../../Common/Breadcrumb'
import BreadcrumbItem from '../../../../Common/Breadcrumb/BreadcrumbItem'
import arrowLeft from '../../../Dashboard/EcommerceDashboard/assets/icons/arrowLeft.svg';
import ProductImage from '../../../Dashboard/EcommerceDashboard/assets/images/Product_default.jpg'
import Testimage from '../../../Dashboard/EcommerceDashboard/assets/images/Categories_default.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import FormInput from '../../../../Common/Form/FormInput';
import FormError from '../../../../Common/Form/FormError';
import '../../../Dashboard/EcommerceDashboard/pages/inventoryEdit.scss';
import { useNavigate } from 'react-router-dom';
import { editProduct, getSingleProduct, resetEditProduct, resetGetSingleProduct } from '../../../../store/actions/ecommerce/action/product';
import Pricing from '../Products/CreateEditProduct/Pricing';
import Inventory from '../Products/CreateEditProduct/Inventory';
import Variations from '../Products/CreateEditProduct/Variations';
import { useRef } from 'react';
import ImageUploader from '../../../../Common/ImageUploader';
import VarientImagePop from '../../../Dashboard/EcommerceDashboard/Component/VarientImagePop/VarientImagePop';

const EditInventory = () => {

  const varientRef = useRef(null);
  const [product, setProduct] = useState({}); //data.product
  const [productVariations, setProductVariations] = useState([]);  //data.variation
  const [productVariant, setProductVariant] = useState([]);  //data.product.variant
  const [selectedVar, setSelectedVar] = useState(0);
  const [selectedVarData, setSelectedVarData] = useState(0);
  const [productInfo, setProductInfo] = useState({})
  const [pricingInfo, setPricingInfo] = useState({})
  const [inventoryInfo, setInventoryInfo] = useState({})
  // const [variationOption, setvariationOption] = useState("");
  const [priceInfoValid, setpriceInfoValid] = useState(false);
  const [inventoryInfoValid, setinventoryInfoValid] = useState(false);
  const [addVarient, setAddVarient] = useState(false);
  const [infoError, setInfoError] = useState(false);
  const [productImages, setProductImages] = useState([]);
  const [connectImages, setConnectImages] = useState([]);
  const [variationStatus, setVariationStatus] = useState(false)
  const dispatch = useDispatch();
  const history = useNavigate();
  // const varientRef = useRef(null);
  const { varId, _id } = useParams();
  const { user, productDetail, productEditSuccess } = useSelector(state => {
    return {
      user: state.user,
      productDetail: state.productList.getSingleProduct,
      productEditSuccess: state.productList.editProduct.success
    }
  });
  console.log('productDetail', productDetail);

  useEffect(() => {
    if (_id) {
      dispatch(getSingleProduct(_id));
    }
  }, [dispatch, _id]);

  useEffect(() => {
    if (productDetail.success) {
      setProduct(productDetail.data.product);
    }
  }, [product, productDetail]);

  useEffect(() => {
    if (productDetail.success && productDetail.data && productDetail.data.product && productDetail.data.product.productPicture) {
      setProductImages(productDetail.data.product.productPicture);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productDetail.success])

  useEffect(() => {
    if (productDetail.success && productDetail.data && productDetail.data.variation) {
      if (productDetail?.data.variation.length) {
        const data = productDetail?.data.variation.map((item) => {
          let element = { ...item }
          if (item?.variant_scheme) {
            for (let index = 0; index < item?.variant_scheme?.length; index++) {
              let elementData = item?.variant_scheme[index]
              element['visible'] = true
              element[elementData.title.split(" ").join("")] = elementData.value
            }
          }
          return { ...element }
        })
        let key = data.findIndex((i) => i._id === varId)
        setProductVariations([...data])
        // setVarientDetails([...data]);
        setSelectedVar(key);
      }
      // setProductVariations(productDetail.data.variation);
    }
  }, [productDetail.data, productDetail.success, productDetail.variation, varId])

  useEffect(() => {
    if (productDetail.success && productDetail.data && productDetail.data.product) {
      const arrWithColor = productDetail.data?.product?.variant.length ? productDetail.data?.product?.variant.map(object => {
        return { ...object, done: true };
      }) : [];
      setProductVariant(arrWithColor)
    }

    // setProductVariant(arr)
  }, [product, productDetail.data, productDetail.success])

  useEffect(() => {
    if (productDetail.success && product) {
      setProductInfo({
        productTitle: product.productName,
        productRibbon: product.ribbon,
        productDescription: product.productDescription,
        specificationArray: product.miscellaneous,
        defaultCheck: false,
        selectedCategroy: [],
      })
    }
  }, [product, productDetail.success])

  useEffect(() => {
    if (productVariations && productVariations.length && varId && !productDetail.data?.product?.defaultVariation) {
      let varData = productVariations.find((item, index) => index === selectedVar);
      setSelectedVarData(varData);
      if (productDetail.success && selectedVarData) {
        setPricingInfo({
          price: varData?.price,
          shippingCharge: varData?.shipping_cost,
          discount: varData?.discountFix,
          salePrice: varData?.salePrice,
          cog: varData?.costPrice,
          onSale: varData?.onSale,
          profit: varData?.profit
        })
        setInventoryInfo({
          productSKU: varData?.SKU,
          productBarcode: varData?.barcode,
          productAvailableQty: varData?.stock,
        })
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productDetail.success, productVariations, selectedVar, selectedVarData, varId])

  const handlePricingData = (value) => {
    setPricingInfo(value)
    setProductVariations([...value.productVariations])
  }
  const handleInventoryData = (value) => {
    setInventoryInfo(value)
    setProductVariations([...value.productVariations])
  }

  const handleProductVariations = (value) => {
    setProductVariant([...value.productVariations])
  }

  const isFormValid = (value, type) => {

    if (type === "priceInfo") {
      if(productDetail.data?.product?.defaultVariation){
        if (value) {
          setpriceInfoValid(true);
        }
        else {
          setpriceInfoValid(false);
        }
      }else{
        setpriceInfoValid(true);
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

  const handleAddVarientButton = () => {
    setAddVarient(true);
  }

  const changeSelectedVarHandler = (key, item) => {
    setSelectedVar(key);
    setSelectedVarData(item);
  }


  const handleInventoryDone = (value) => {
    let data = productVariant
    data = value
    setProductVariant([...data])
    dataHandler()
  }
  const connectImageJi = (value, data) => {
    // console.log(productVariations, data, "productVar")
    let array = productVariant;
    let index = array.findIndex(p => p.title.split(" ").join("") === value.title.split(" ").join(""));
    // let isValid = array.find(p => p.title === value.title) ? true : false
    array[index]['imageSet'] = data
    array[index]['isConnectImg'] = true
    setProductVariant([...array])
    varientRef.current.close()
  }

  const handleClearPrevious = () => {
    let array = productVariant
    for (let index = 0; index < array.length; index++) {
      array[index]['imageSet'] = []
      array[index]['isConnectImg'] = false
    }
    setProductVariant([...array])
  }
  const oncloseVarientPopup = () => {
    varientRef.current.close()
  }
  const onOpenVarientPopup = () => {
    varientRef.current.open()
  }
  const dataHandler = () => {
    let list = []

    // for (let index = 0; index < productVariant.length; index++) {
    //   const element = productVariant[index];
    //   for (let index = 0; index < element.value.length; index++) {
    //     const elementOptions = element.value[index];
    //     variant_scheme.push({
    //       title: element.title.split(" ").join(""),
    //       value: elementOptions
    //     })
    //   }
    // }
    productVariant &&
      productVariant.length > 0 &&
      productVariant.forEach((v, i) => {
        let list1 = JSON.parse(JSON.stringify(list));
        list.length = 0;
        for (let m = 0; m < v.value.length; m++) {
          if (i === 0) {
            const va = `0${m + 1}`;
            let obj = {
              stock: parseInt(inventoryInfo.productAvailableQty),
              SKU: `${inventoryInfo?.productSKU?.trim()}${va.slice(-2)}`,
              price: pricingInfo.price ? parseInt(pricingInfo.price) : 0,
              variationName: productInfo.productTitle,
              businessShopId: user.user_business,
              productPicture:[],
              onSale: pricingInfo.onSale,
              // discountFix: productCost < +productDiscount ? +productDiscount : productCost - 1,
              discountPercentage: pricingInfo.onSale && +pricingInfo.discount < 100 ? +pricingInfo.discount : pricingInfo.onSale && +pricingInfo.discount >= 100 ? 99 : 0,
              salePrice: pricingInfo.onSale && +pricingInfo.discount > 0 && +pricingInfo.discount < 100 ? pricingInfo.salePrice : productInfo.price,
              costPrice: parseInt(pricingInfo.cog),
              profit: parseInt(pricingInfo.profit),
              barcode: inventoryInfo.productBarcode,
              selected: false,
              visible: true,
              outOfStock: parseInt(inventoryInfo.productAvailableQty) > 0 ? false : true,
              variationActive: true,
              variant_schemeData: {}
            };
            obj[v.title.split(" ").join("")] = v.value[m];
            obj['variant_schemeData'] = { ...obj['variant_schemeData'], [v.title.split(" ").join("_")]: v.value[m] };
            list.push(obj);
          } else {
            let tempList = list1.map((data, i) => {
              const va = `0${m + 1}`;
              let obj = { ...data };
              obj[v.title.split(" ").join("")] = v.value[m];
              obj.SKU = `${obj.SKU.trim()}${va.slice(-2)}`;
              obj['variant_schemeData'] = { ...obj['variant_schemeData'], [v.title.split(" ").join("")]: v.value[m] };
              return obj;
            });
            list = [...list, ...tempList];
          }
        }
      });
    const data = list.map((item) => {
      let array = []
      for (const [key, value] of Object.entries(item.variant_schemeData)) {
        array.push({
          title: key.split("_").join(" "),
          value: value
        })
      }
      return { ...item, variant_scheme: array }
    })
    setProductVariations([...data]);
    // setNewProductVariations([...data]);
  }
  useEffect(() => {
    let array = []
    if (productDetail && productDetail?.data) {
      if (productDetail?.data?.product?.variant?.length) {
        for (let index = 0; index < productDetail?.data?.product?.variant?.length; index++) {
          const element = productDetail?.data?.product?.variant[index];
          array.push({
            ...element,
            done: true,
            isOptionValid: true,
          })
        }
        setProductVariations([...array])
      }
      if (productDetail.success && productDetail?.data?.variation.length) {
        const data = productDetail?.data?.variation.map((item) => {
          let element = { ...item }
          if (item?.variant_scheme) {
            for (let index = 0; index < item?.variant_scheme?.length; index++) {
              let elementData = item?.variant_scheme[index]
              element[elementData.title.split(" ").join("")] = elementData.value
            }
          }
          return { ...element }
        })

        setProductVariations([...data])
        // const filterList = new Array(data.length).fill("all");
        // setVariationFilterList([...filterList]);
      }
    }
  }, [productDetail])
  // const connectImage = (values) => {
  const handleDelete=(index)=>{
    let array = productVariant;
      let arrayData=array.findIndex((item)=>item?.isConnectImg===true&&item.done===true)
       let dattatatat= array[arrayData]['imageSet'].findIndex((item)=>item.variant_value===selectedVarData[array[arrayData].title.split(" ").join("")])
     array[arrayData]['imageSet'][dattatatat]['images'].splice(index,1)
    setProductVariant([...array])
  }
  useEffect(() => {
    let data = []
    if (productVariant && productVariant.length) {
      // let data = productVariant.find((i) => i.isConnectImg && i.isConnectImg === true)
      for (let index = 0; index < productVariant.length; index++) {
        const element = productVariant[index];
        if (element.isConnectImg === true && element.imageSet.length) {
          for (let index = 0; index < element.imageSet.length; index++) {
            const elementImages = element.imageSet[index];
            if (elementImages.variant_value === selectedVarData[element.title.split(" ").join("")]) {
              data = elementImages.images
            }
          }
        }
      }
      setConnectImages([...data]);
    }
  }, [productImages, productVariant, selectedVarData])

  const handleCancelButton = () => {
    history("/ecommerce/inventory");
  }
  useEffect(() => {
    return () => {
      dispatch(resetGetSingleProduct());
      dispatch(resetEditProduct());
    }
  }, [dispatch])

  const prepData = () => {
    if (productDetail.success) {
      if (productDetail?.data?.product?.defaultVariation) {
        return {
          product: {
            _id: _id,
            productName: productInfo.productTitle,
            productDescription: productInfo.productDescription,
            ribbon: productInfo.productRibbon,
            shipping_cost: pricingInfo.shippingCharge,
            businessShopId: user.user_business,
            productPicture: productImages,
            price: pricingInfo.price,
            salePrice: pricingInfo.salePrice,
            costPrice: pricingInfo.cog,
            profit: pricingInfo.profit,
            discountAvailability: false,
            discountFix: 6,
            discount_by_percent: pricingInfo.discount_by_percent,
            discountPercentage: parseInt(pricingInfo.discount),
            stock: inventoryInfo.productAvailableQty,
            SKU: inventoryInfo.productSKU,
            barcode: inventoryInfo.productBarcode,
            miscellaneous: productInfo.specificationArray,
            variant: productVariant
          },
          variation: productVariations
        }
      } else {
        return {
          product: {
            ...productDetail?.data?.product,
            variant:productVariant
          },
          variation: productVariations
        }
      }
    }
  }
  const resetAddVarientOption = (value) => {
    setAddVarient(value)
  }
  const handleUpdateVariation = () => {
    if (priceInfoValid && inventoryInfoValid) {
      dispatch(editProduct(prepData(), variationStatus ? "product-variation-new" : "product-variation-edit", user.user_business, _id));
      setInfoError(false);
    }
    else {
      setInfoError(true);
    }
  }
  useEffect(() => {
    if (productEditSuccess) {
      history("/ecommerce/inventory");
    }
  }, [history, productEditSuccess])

  const handleVariationStatus = (val) => {
    setVariationStatus(val)
  }
  // console.log(prepData(), "jjijijiji")
  useEffect(() => {
    if (productVariant.length) {
      if (productVariant.find((i) => i.isConnectImg === true)) {
        let data = productVariant.find((i) => i.isConnectImg === true)
        let details =
          // eslint-disable-next-line array-callback-return
          productVariations.map((item) => {
            if (Object.keys(item).includes(data.title.split(" ").join(""))) {
              let obj = {}
              // eslint-disable-next-line array-callback-return
              data.imageSet.map((details) => {
                if (details.variant_value === item[data.title.split(" ").join("")]) {
                  obj = [...details.images]
                }
              })
              return { ...item, productPicture: obj ? obj : [] }
            }

          })
        setProductVariations([...details])
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productVariant])
  console.log(productVariations,"jihhihi")
  return (
    <React.Fragment>
      {productDetail.success ? <div className='dashBoard-home-container' >
        <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          <BreadcrumbItem to="/ecommerce/inventory" title="Inventories" />
          <BreadcrumbItem to={`#`} title="Edit Inventory" />
        </Breadcrumb>
        <div className='inventory-edit-container'>
          <div className='inventory-path-div'>
            <div className='path-div-container align-center'>
              <AppLink to={'/ecommerce/inventory'}>
                <img src={arrowLeft} alt="arrow" className='cursor' />
              </AppLink>
              <p className='text-s w-500 base'> {product.productName}</p>
            </div>
          </div>
          <div className='inventory-edit-left-sidebar '>
            <div className='sidebars-container'>
              <div className='inventory-edit-left-image-container'>
                <div className='ineventory-edit-image-wrapper'>
                  <img src={product && product.productPicture && product.productPicture.length > 0 ? product.productPicture[0] : ProductImage} alt="productImage" className='img-response' />
                </div>
                <div className='inventory-edit-text-wrapper'>
                  <p className='text-regf w-500'>{product.productName}</p>
                  <p className='text-xs gray w-400 mt-5'>{product.variations && product.variations.length > 0 ? `${product.variations.length} varients` : `1 Product`} </p>
                  <p className='text-xxs w-500 primary mt-5'>{product.productActive === "active" ? 'Active' : 'Inactive'}</p>
                </div>
              </div>
            </div>

            {/* add varient button  */}
            <div className='mt-40'>
              <button className='button button-primary btn-s add-varients-btn'
                disabled={addVarient}
                onClick={handleAddVarientButton}
              >
                Add Varients</button>
            </div>

            {/* product image list here */}
            {product && productVariant && productVariant.filter((item) => item.done === true).length > 0 ?
              <div className='sidebars-container varient-sidebar-container mt-20'>
                <p className='text-regf w-600 varient-p'>Varients</p>
                {/* product varient list loop start here */}
                {productVariations && productVariations.length > 0 && productVariations.map((vl, i) => {
                  return (
                    <div className=' varient-sidebar-wrapper' key={i} onClick={() => { changeSelectedVarHandler(i, vl) }}>
                      {/* active class is added when section is active */}
                      <div className={selectedVar === i ? 'inventory-edit-left-image-container  activeClass' : 'inventory-edit-left-image-container'}>
                        <div className='ineventory-edit-image-wrapper ineventory-edit-image-wrapper-small'>
                          <img src={vl.productPicture && vl.productPicture.length > 0 ? vl.productPicture[0] : ProductImage} alt="productImage" className='img-response' />
                        </div>
                        <div className='inventory-edit-text-wrapper '>
                          <p className='text-regf w-500'>
                            {productVariant.length > 0 && productVariant.filter((item) => item.done === true).map((v, j) => {
                              return (
                                j === 0 ?
                                  <span className='capitalize' key={j}>{vl[v.title.split(" ").join("")]}</span> :
                                  <React.Fragment key={j}>
                                    <span>/&nbsp;</span>
                                    <span className='capitalize'>{vl[v.title.split(" ").join("")]}</span>
                                  </React.Fragment>
                              )
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              :
              ""
            }
          </div>

          {/* right section start here */}
          <div className='inventory-edit-right-sidebar  '>
            {product && productVariant && productVariant.filter((item) => item.done === true).length > 0 ?
              <div className='sidebars-container'>
                <div className='e-commerce-inventory-wrap mb-20'>
                  <p className='e-commerce-card-para'>Options</p>
                  <hr className='horizontal-line' />
                  <div className='inventoryEdit-option-wrapper'>
                    {/* <div className='inventoryEdit-input-wrapper'> */}
                    <div className={`drag-inventory-wrapper ${(selectedVarData && selectedVarData?.productPicture && selectedVarData?.productPicture.length > 1) || (productImages && productImages.length > 1) ? 'drag-inventory-no-images' : ' '} `}>
                      <div className='inventory-wrap'>
                        {selectedVarData && selectedVarData?.productPicture && selectedVarData?.productPicture.length ? selectedVarData.productPicture.map((varImage, key) => {
                          return (
                            <div className='inventory_item' key={key}>
                              <img className='inventory_img' src={varImage} alt="" />
                              <button className="cross-btn" onClick={()=>handleDelete(key)}><i className="cross-icon"></i></button>
                            </div>
                          );
                        })
                          :
                          productImages && productImages.length ? productImages.map((item, i) => {
                            return (
                              <div className='inventory_item' key={i}>
                                <img className='inventory_img' src={item} alt="" />
                                {/* <button className="cross-btn"><i className="cross-icon"></i></button> */}
                              </div>
                            )
                          })
                            :
                            ""
                        }
                        <div className='inventory_item-button'>
                          <div className=' image-drag'>
                            <div className='dragbutton' onClick={()=>onOpenVarientPopup()}>
                              <span className="set__icon">
                                <i className='icon-plus'>&#43;</i>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <ImageUploader onclose={() => addMoreRef.current.close()} multiSelect={true} discartRef={addMoreRef} onUploaded={connectImage} search={productInfo.productTitle} uploadLimit={5 - connectImages.length} /> */}
                      {/* <VarientImagePop handleClearPrevious={handleClearPrevious} onclose={oncloseVarientPopup} onConnectImage={connectImage} varientRef={varientRef} productVariations={productVariant} productImages={productImages} productTitle={productDetail.data && productDetail.data?.product?.productName} /> */}
                      <VarientImagePop onclose={oncloseVarientPopup} handleClearPrevious={handleClearPrevious} onConnectImage={connectImageJi} varientRef={varientRef} productVariations={productVariant} productImages={productImages} productTitle={productInfo.productTitle} />
     
                    </div>

                    {selectedVarData && product && productVariant && productVariant.length > 0 && productVariant.filter((item) => item.done === true).map((v, j) => {
                      return (
                        <div className="formFieldwrap ediInventoryform">
                          <p className='label-heading'>
                            {v.title}
                          </p>
                          <FormInput
                            type="text"
                            // label="name"
                            id="color"
                            name="color"
                            disabled={true}
                            value={selectedVarData[v.title.split(" ").join("")]}
                            placeholder="Roadster Tshirt"
                            maxLength="80"
                          />
                          <FormError
                            show={false}
                            error="Invalid Name."
                          />
                        </div>
                      )
                    })
                    }
                    {/* </div> */}
                  </div>
                </div>
              </div>
              : ""
            }

            {/* pricing section */}
            <div className='sidebars-container mb-20'>
              <div className='e-commerce-inventory-wrap'>
                <Pricing onLoadPricingData={handlePricingData} productVariations={productVariations} isFormValid={(val) => isFormValid(val, "priceInfo")} infoError={infoError} varID={selectedVar} />
              </div>
            </div>

            {/* inventory section */}
            <div className='sidebars-container mb-20'>
              <div className='e-commerce-inventory-wrap'>
                <Inventory productName={product.productName} productVariations={productVariations} onLoadInventoryData={handleInventoryData} isFormValid={(val) => isFormValid(val, "inventoryInfo")} infoError={infoError} varID={selectedVar} />
              </div>
            </div>

            {/* add varient section */}
            <div className='sidebars-container mb-20'>
              <div className='e-commerce-inventory-wrap'>
                <Variations resetAddVarientOption={resetAddVarientOption} productInfo={productInfo} handleInventoryDone={handleInventoryDone} pricingInfo={pricingInfo} inventoryInfo={inventoryInfo} productImages={productImages} onLoadVariationsData={handleProductVariations} isFormValid={(val) => isFormValid(val, "inventoryInfo")} infoError={infoError} addVarient={addVarient} handleVariationStatus={handleVariationStatus} />
              </div>
            </div>

          </div>
        </div>
        {/* 
        {
          openPopup && <DeleteConfirmPop index={'delete'} handleAcceptPopup={handleAcceptPopup} deleteVarHandler={submitProductHandler} />
        } */}
        <div className='inventory-edit-buton-wrapper mt-20'>
          <button className='button btn-o-silver btn-sm'
            onClick={handleCancelButton}
          >
            Cancel</button>
          <button className='button button-primary btn-sm' onClick={handleUpdateVariation}>Save</button>
        </div>
      </div> : <div className="loadingGridData">
        <i className="ed-loadingGrid"></i>
      </div>}
    </React.Fragment >
  )
}
export default EditInventory
