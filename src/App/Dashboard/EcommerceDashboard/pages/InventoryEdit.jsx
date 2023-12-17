import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import './inventoryEdit.scss';
import ProductImage from '../assets/images/Product_default.jpg'
import arrowLeft from '../assets/icons/arrowLeft.svg';
import FormInput from '../../../../Common/Form/FormInput';
import FormError from '../../../../Common/Form/FormError';
import IButton from '../assets/icons/i-Vector.svg';
import CheckboxInput from '../../../../Common/Form/CheckboxInput';
import { editProduct, getProductDetail } from '../../../../store/actions/ecommerce/action/product';
import { validator } from '../../../../store/actions/ecommerce/utils/validator';
import DeleteConfirmPop from '../Component/DeleteConfirmPop/DeleteConfirmPop';
import AppLink from '../../../../Common/AppLink';
import Delete from '../../../../assets/Icons/icon-delete.svg'
import Breadcrumb from '../../../../Common/Breadcrumb';
import BreadcrumbItem from '../../../../Common/Breadcrumb/BreadcrumbItem';
import Testimage from '../assets/images/shirt.png'
import Cropper from '../../../../Common/Cropper';
const InventoryEdit = () => {
  const [variations, setVariations] = useState([]);
  const [selectedVar, setSeletedVar] = useState({});
  const [product, setProduct] = useState({});
  const [discountPertype, setDiscountPertype] = useState(true);
  const [openPopup, setOpenPopup] = useState(false);
  /////////////////VALIDATION STATES
  const [priceV, setPriceV] = useState(false);
  const [costGoodsV, setCostGoodsV] = useState(false);
  const [profitV, setProfitV] = useState(false);
  const [skuV, setSkuV] = useState(false);
  const [barcodeV, setBarcodeV] = useState(false);
  const [qtyV, setQtyV] = useState(false);

  const [addVarient, setAddVarient] = useState(false);
  const [productOptionsCheckbox, setProductOptionsCheckbox] = useState(false);
  const [optionName, setOptionName] = useState("");
  const [optionValueArray, setOptionValueArray] = useState([]);
  const [variationOptions, setVariationOptions] = useState([]);
  const [mappedVariations, setMappedVariations] = useState([]);
  const [addMoreOptions, setAddMoreOptions] = useState(false);
  const [editstate, setEditState] = useState(false);
  const [editIndex, setEditIndex] = useState("");
  const [disableDoneButton, setdisableDoneButton] = useState(true);

  const { productDetail } = useSelector(state => state.productList);
  const user = useSelector((state) => state.user);

  const { varId, prodId } = useParams();

  const dispatch = useDispatch();
  const history = useNavigate();

  useEffect(() => {
    if (prodId) {
      dispatch(getProductDetail(prodId));
    }

  }, [prodId]);

  useEffect(() => {
    if (user && user.user_business_business_shop_category.length === 0) {
      history('/ecommerce/businessInfo');
    }
  }, [user]);

  useEffect(() => {
    if (productDetail.success === true) {

      setProduct(productDetail.data.productInfo);
    }
  }, [productDetail]);

  useEffect(() => {
    if (product.variations && product.variations.length > 0) {
      let array = [];
      const arr = product.variations.map((vl, i) => {
        let obj = { ...vl };
        if (vl._id === varId) {
          obj.selected = true
          let select = { ...vl, ind: i }
          setSeletedVar(() => JSON.parse(JSON.stringify(select)));
        } else {
          obj.selected = false
        }
        obj.variationActive === true && array.push(obj);
        return obj;
      });
      setVariations([...array]);
    }

  }, [product, varId]);



  const changeSelectedVarHandler = (i) => {
    let arr = [...variations];
    arr = variations.map((vl, j) => {
      let obj = { ...vl };
      if (i === j) {
        obj.selected = true;
        let select = { ...vl, ind: j }
        setSeletedVar(() => JSON.parse(JSON.stringify(select)));
      } else {
        obj.selected = false;
      }
      return obj;
    });
    setVariations([...arr]);
  };

  const editProductHandler = (e, type) => {
    // e.preventDefault();

    let singleObj = { ...selectedVar };
    let arr = [...variations];
    let obj = { ...product };
    if (type === 'price') {
      if (+e > 0) {
        setPriceV(false);
      } else {
        setPriceV(true);
      }
      singleObj.price = e;
      arr[selectedVar.ind].price = e;
      obj.variations[selectedVar.ind].price = e;
    }
    if (type === 'onSale') {
      singleObj.onSale = singleObj.onSale ? false : true;
      arr[selectedVar.ind].onSale = arr[selectedVar.ind].onSale ? false : true;
      obj.variations[selectedVar.ind].onSale = obj.variations[selectedVar.ind].onSale ? false : true;
    }
    if (type === 'discount') {
      singleObj.discountFix = e;
      arr[selectedVar.ind].discountFix = e;
      obj.variations[selectedVar.ind].discountFix = e;
    }
    if (type === 'discountPer') {
      singleObj.discountPercentage = e;
      arr[selectedVar.ind].discountPercentage = e;
      obj.variations[selectedVar.ind].discountPercentage = e;
    }
    if (type === 'salePrice') {
      singleObj.salePrice = e;
      arr[selectedVar.ind].salePrice = e;
      obj.variations[selectedVar.ind].salePrice = e;
    }
    if (type === 'costPrice') {
      if (+e > 0) {
        setCostGoodsV(false);
      } else {
        setCostGoodsV(true);
      }
      singleObj.costPrice = e;
      arr[selectedVar.ind].costPrice = e;
      obj.variations[selectedVar.ind].costPrice = e;
    }
    if (type === 'profit') {
      if (+e > 0) {
        setProfitV(false);
      } else {
        setProfitV(true);
      }
      singleObj.profit = e;
      arr[selectedVar.ind].profit = e;
      obj.variations[selectedVar.ind].profit = e;
    }
    if (type === 'margin') {
      singleObj.margin = e;
      arr[selectedVar.ind].margin = e;
      obj.variations[selectedVar.ind].margin = e;
    }
    if (type === 'sku') {
      if (validator('xx', e)) {
        setSkuV(false);
      } else {
        setSkuV(true);
      }
      singleObj.SKU = validator('xx', e);
      arr[selectedVar.ind].SKU = validator('xx', e);
      obj.variations[selectedVar.ind].SKU = validator('xx', e);
    }
    if (type === 'barcode') {
      if (validator('xx', e)) {
        setBarcodeV(false);
      } else {
        setBarcodeV(true);
      }
      singleObj.barcode = validator('xx', e);
      arr[selectedVar.ind].barcode = validator('xx', e);
      obj.variations[selectedVar.ind].barcode = validator('xx', e);
    }
    if (type === 'trackqty') {
      obj.trackQuantity = obj.trackQuantity ? false : true;

      // arr[selectedVar.ind].trackQuantity = arr[selectedVar.ind].trackQuantity ? false : true;
      // obj.variations[selectedVar.ind].trackQuantity = obj.variations[selectedVar.ind].trackQuantity ? false : true;
    }
    if (type === 'sellOutStock') {
      obj.sellOutofStock = obj.sellOutofStock ? false : true;

      // arr[selectedVar.ind].sellOutofStock = arr[selectedVar.ind].sellOutofStock ? false : true;
      // obj.variations[selectedVar.ind].sellOutofStock = obj.variations[selectedVar.ind].sellOutofStock ? false : true;
    }
    if (type === 'stock') {
      if (+e > 0) {
        setQtyV(false);
      } else {
        setQtyV(true);
      }
      singleObj.stock = e;
      arr[selectedVar.ind].stock = e;
      obj.variations[selectedVar.ind].stock = e;
    }
    setSeletedVar({ ...singleObj });
    setVariations([...arr]);
    setProduct({ ...obj });
  };

  const handleAcceptPopup = () => {
    setOpenPopup(() => openPopup ? false : true);
  };

  // TODO varriation-creation

  const showVariationListHandler = (productVariations, product) => {
    let show = true;
    let list = [];
    for (let n = 0; n < productVariations.length; n++) {
      // let list1 = [...list];
      let list1 = JSON.parse(JSON.stringify(list));
      list.length = 0;
      for (let m = 0; m < productVariations[n].value.length; m++) {
        if (n === 0) {
          const va = `0${m + 1}`;
          let obj = {
            stock: product.productAvailableQty,
            SKU: product.SKU,
            price: product.price,
            variationName: product.productName,
            // weight: productWeightType === 'kg' ? productWeight * 1000 : productWeight,
            productPicture: product.productPicture,
            // onSale: 'productSale',
            // discountFix: productCost < +productDiscount ? +productDiscount : productCost - 1,

            discountPercentage: product.discountPercentage,
            salePrice: product.salePrice,
            costPrice: product.costPrice,
            profit: product.profit,
            // margin: productMargin,
            barcode: product.barcode,
            // showInOnlineStore: 'productShowOnline',
            // trackQuantity: productTrackQty,
            sellOutOfStock: product.outOfStock,
            selected: false,
            visible: true,
          };
          obj[productVariations[n].name.toLowerCase().split(" ").join("")] = productVariations[n].value[m];
          list.push(obj);
        } else {
          let tempList = list1.map((data, i) => {
            const va = `0${m + 1}`;
            let obj = { ...data };
            obj[productVariations[n].name.toLowerCase().split(" ").join("")] = productVariations[n].value[m];
            obj.SKU = `${obj.SKU}${va.slice(-2)}`;
            return obj;
          });

          list = [...list, ...tempList];
        }
      }
    }
    setMappedVariations([...list]);

    return [...list]

  };

  // TODO END:
  const submitProductHandler = (type) => {
    if (!qtyV && !skuV && !profitV && !costGoodsV && !priceV && !barcodeV) {
      let body = { ...product, status: 'productEdit', variationOption: variationOptions, variations: showVariationListHandler(variationOptions, product) }
      if (type === 'delete') {
        body.variations.splice(selectedVar.ind, 1);
        // body.variations[selectedVar.ind].variationActive = false

      }
      body.productId = body._id;
      dispatch(editProduct(body));
      history('/ecommerce/inventory');
    }

  };
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (product && product.variationOption && product.variationOption.length) {
      setVariationOptions(product.variationOption);
    }
  }, [product]);

  const handleAddVarientButton = () => {
    setProductOptionsCheckbox(true);
    setAddVarient(true);
    setAddMoreOptions(false);
    setOptionName("");
    setOptionValueArray([]);
    setEditState(false);
    window.scrollTo(0, 2000);
  }

  const handleProductOptionsCheckbox = (e) => {
    let inputChecked = e.target.checked;
    if (inputChecked) {
      setProductOptionsCheckbox(true);
      setAddVarient(true);
    }
    else {
      setProductOptionsCheckbox(false);
    }
  }

  const handleProductOptionsName = (e) => {
    let inputValue = e.target.value;
    setOptionName(inputValue);
  }

  const handleMainDeleteButton = () => {
    setOptionName("");
    setOptionValueArray([]);
  }

  const handleAddValuesButton = () => {
    let array = optionValueArray;
    let value = { value: "" };
    array.push(value);
    setOptionValueArray([...array]);
  }

  const handleProductOptionsValues = (e, key) => {
    let inputValue = e.target.value;
    let array = optionValueArray;
    array[key]["value"] = inputValue;
    setOptionValueArray([...array]);
  }

  const handleDeleteButton = (item) => {
    let array = optionValueArray
    let index = array.indexOf(item);
    array.splice(index, 1);
    setOptionValueArray([...array]);
  }

  useEffect(() => {
    if (optionName && optionValueArray.length && optionValueArray.every((item) => item.value !== "")) {
      setdisableDoneButton(false);
    }
  }, [optionName, optionValueArray, optionValueArray.length])

  const handleDoneButton = () => {
    let valuearray = optionValueArray.map((item) => {
      return (
        item.value
      );
    })
    let value =
    {
      name: optionName,
      value: valuearray
    }
    let array = variationOptions;
    array.push(value);
    setVariationOptions([...array]);
    setAddMoreOptions(true);
    setAddVarient(false);
  }

  const handleAddMoreButton = () => {
    setAddMoreOptions(false);
    setOptionName("");
    setOptionValueArray([]);
    setAddVarient(true);
    setEditState(false);
  }

  const handleEditVariation = (item, index) => {
    setOptionName(item.name);
    setOptionValueArray([item]);
    setAddMoreOptions(false);
    setEditState(true);
    setEditIndex(index);
  }

  useEffect(() => {
    if (optionValueArray && optionValueArray.length && editstate) {
      let newArray = [];
      optionValueArray.map((item) => {
        return (
          <React.Fragment>
            {item.value && item.value.length ? item.value.map((val) => {
              return (
                newArray.push({ value: val })
              );
            }) : ""}
          </React.Fragment>
        );
      })
      setOptionValueArray([...newArray]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editstate])

  const handleUpdateButton = () => {
    let valuearray = optionValueArray.map((item) => {
      return (
        item.value
      );
    })
    let newdata = variationOptions.map((item, i) => i === editIndex ?
      {
        ...item,
        name: optionName,
        value: valuearray
      }
      : item)
    setVariationOptions([...newdata]);
    setAddMoreOptions(true);
    setAddVarient(false);
  }

  const handleDeleteVariation = (item) => {
    let array = variationOptions
    let index = array.indexOf(item);
    array.splice(index, 1);
    setVariationOptions([...array]);
  }

  return (
    <React.Fragment>
      <div className='dashBoard-home-container' >
        <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          <BreadcrumbItem to="/ecommerce/inventory" title="Inventories" />
          <BreadcrumbItem to={`/ecommerce/inventoryEdit/${varId}/${prodId}`} title="Edit Inventory" />
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
                  <p className='text-xxs w-500'>{product.productName}</p>
                  <p className='text-xs gray w-400 mt-5'>{variations.length} varients</p>
                  <p className='text-xxs w-500 primary mt-5'>{product.productActive ? 'Active' : 'Inactive'}</p>
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
            {product && variationOptions && variationOptions.length > 0 ?
              <div className='sidebars-container varient-sidebar-container mt-20'>
                <p className='text-regf w-600 varient-p'>Varients</p>
                {/* product varient list loop start here */}
                {variations && variations.length > 0 && variations.map((vl, i) => {
                  return (
                    <div className='mt-10 varient-sidebar-wrapper' key={i} onClick={() => { changeSelectedVarHandler(i) }}>
                      {/* active class is added when section is active */}
                      <div className={vl.selected === true ? 'inventory-edit-left-image-container  activeClass' : 'inventory-edit-left-image-container'}>
                        <div className='ineventory-edit-image-wrapper ineventory-edit-image-wrapper-small'>
                          <img src={vl.productPicture && vl.productPicture.length > 0 ? vl.productPicture[0] : ProductImage} alt="productImage" className='img-response' />
                        </div>
                        <div className='inventory-edit-text-wrapper '>
                          <p className='text-regf w-500'>
                            {/* {variationOptions.length > 0 && variationOptions.map((item, key) => {
                              return (
                                <React.Fragment key={key}>
                                  <span className='capitalize'>{item.name}</span>
                                  <span>/&nbsp;</span>
                                  {item.value && item.value.length ? item.value.map((val, index) => {
                                    return (
                                      <React.Fragment key={index}>
                                        <span className='capitalize'>{val}</span>
                                        <span>/&nbsp;</span>
                                      </React.Fragment>
                                    );
                                  }) : ""}
                                </React.Fragment>
                              )
                            })} */}

                            {variationOptions.length > 0 && variationOptions.map((v, j) => {
                              return (

                                j === 0 ?
                                  <span className='capitalize' key={j}>{vl[v.name]}</span> :
                                  <React.Fragment key={j}>
                                    <span>/&nbsp;</span>
                                    <span className='capitalize'>{vl[v.name]}</span>
                                    {/* {console.log(vl, "vl", [v.name], "sscb", vl[v.name], "consolefdata 460")} */}
                                  </React.Fragment>
                              )
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}

                {/* product varient list loop end here */}
              </div>
              :
              ""
            }
          </div>

          {/* right section start here */}
          <div className='inventory-edit-right-sidebar  '>
            {product && variationOptions && variationOptions.length > 0 ?
              <div className='sidebars-container'>
                <div className='e-commerce-inventory-wrap mb-20'>
                  <p className='e-commerce-card-para'>Options</p>
                  <hr className='horizontal-line' />
                  <div className='inventoryEdit-option-wrapper'>
                    {/* <div className='inventoryEdit-input-wrapper'> */}
                    <div className='drag-inventory-wrapper '>
                      <div className='inventory-wrap'>
                        <div className='inventory_item'>
                          <img className='inventory_img' src={Testimage} alt="" />
                          <button className="cross-btn"><i className="cross-icon"></i></button>
                        </div>
                        <div className='inventory_item'>
                          <img className='inventory_img' src={Testimage} alt="" />
                        </div>
                        <div className='inventory_item'>
                          <img className='inventory_img' src={Testimage} alt="" />
                        </div>
                        <div className='inventory_item'>
                          <img className='inventory_img' src={Testimage} alt="" />
                        </div>
                        <div className='inventory_item-button'>
                          <div className=' image-drag'>
                            <div className='dragbutton'>
                              <span className="set__icon"><i className='icon-plus'>&#43;</i></span>

                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div className='ineventory-edit-image-wrapper-right'>

                      </div> */}
                      {/* <div className='ineventory-edit-image-wrapper-left-section' >
                        <div className='ineventory-edit-image-wrapper-left'>
                          <img src={Testimage} alt="productImage" />
                        </div>
                        <div className='ineventory-edit-image-wrapper-left'>
                          <img src={Testimage} alt="productImage" />
                        </div>
                      </div> */}


                    </div>

                    {product && product.variationOption && product.variationOption.length > 0 && product.variationOption.map((v, j) => {
                      return (
                        <div className="formFieldwrap ">
                          <p className='label-heading'>
                            {v.name}
                          </p>
                          <FormInput
                            type="text"
                            // label="name"
                            id="color"
                            name="color"
                            value={selectedVar[v.name]}
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
                <p className='e-commerce-card-para'>Pricing</p>
                <hr className='horizontal-line' />
                <div className='product-info-wrap'>
                  <div className='pricing-price-input-wrap'>
                    <div className="formFieldwrap ecom-form-price">
                      <p className='label-heading mb-8'>
                        Price
                      </p>
                      <FormInput
                        type="number"
                        // label="Ribbon"
                        id="price"
                        name="price"
                        value={selectedVar.price}
                        // placeholder="₹"
                        maxLength="8"
                        onChange={(e) => { editProductHandler(e.target.value, 'price') }}
                        onWheel={(e) => e.target.blur()}
                      />
                      <span className='ruppe-symbol'>&#8377;</span>
                      <FormError
                        show={priceV}
                        error="Invalid try again "
                      />
                    </div>
                  </div>
                  <div className='pricing-discount-section'>
                    < CheckboxInput
                      label={"On Sale"}
                      LabelClass={"label-heading eComm-checkbox-center"}
                      className={"eComm-checkbox"}
                      onChange={(e) => { editProductHandler(e, 'onSale') }}
                    />
                    <div className='pricing-input-wrap'>
                      <div className='discount-lower-wrap'>
                        <div className=" position-relative  ">
                          <div className="formFieldwrap position-relative-2  ">
                            <p className='label-heading mb-8'>
                              Discount
                            </p>
                            <FormInput
                              placeholder="0"
                              maxLength="80"
                              className="discount-form-fieldwrap"
                              max="100"
                              min="0"
                              type="number"
                              // label="Ribbon"
                              id="discount"
                              name="discount"
                              value={discountPertype ? selectedVar.discountPercentage : selectedVar.discountFix}
                              onChange={(e) => {
                                // discountPertype ?
                                editProductHandler(e.target.value, 'discountPer')
                                // : editProductHandler(e, 'discount')
                              }}
                              onWheel={(e) => e.target.blur()}
                            />
                          </div>

                          <div className='discount-lower-spans'>
                            <span className={`margin-right ${discountPertype ? 'percentage-span ' : ''}`} onClick={() => { setDiscountPertype(true) }}>%</span>
                            {/* <span className={!discountPertype ? 'percentage-span' : ''} onClick={() => { setDiscountPertype(false) }}>₹</span> */}
                            {/* <span onClick={() => setDiscountScheme(true)} className={`margin-right ${discountScheme ? 'percentage-span' : ''}`}>%</span> <span onClick={() => setDiscountScheme(false)} className={discountScheme ? '' : 'percentage-span'}>₹</span> */}
                          </div>
                        </div>

                      </div>

                      <div className="formFieldwrap ecom-form-price ">
                        <p className='label-heading mb-8'>
                          Sale Price(₹)
                        </p>
                        <FormInput
                          type="number"
                          // label="Ribbon"
                          id="sale-price"
                          name="salePriceice"
                          value={selectedVar.salePrice}
                          // placeholder="₹"
                          maxLength="8"
                          onChange={(e) => { editProductHandler(e.target.value, 'salePrice') }}
                          onWheel={(e) => e.target.blur()}
                        />
                        <span className='ruppe-symbol'>&#8377;</span>
                        <FormError
                          show={false}
                          error="Invalid try again "
                        />
                      </div>
                    </div>
                  </div>
                  {/* cost of goods inputs */}
                  <div className='goods-section'>
                    <div className='goods-section-wrap'>
                      <div className='formFieldwrap ecom-form-price'>
                        <div className='goods-section-label-wrap'>
                          <p className='label-heading label-heading-margin'>
                            Cost of Goods
                          </p>
                          <img src={IButton} alt="icon" title=' The amount invested to produce and sell this product.' />
                        </div>
                        <FormInput
                          type="number"
                          // label="Ribbon"
                          id="cost-of-goods"
                          name="costofgoods"
                          value={selectedVar.costPrice}
                          // placeholder="₹"
                          maxLength="8"
                          onChange={(e) => { editProductHandler(e.target.value, 'costPrice') }}
                          onWheel={(e) => e.target.blur()}
                        />
                        <span className='ruppe-symbol'>&#8377;</span>
                        <FormError
                          show={costGoodsV}
                          error="Invalid try again "
                        />
                      </div>
                      <div className='formFieldwrap ecom-form-price'>
                        <div className='goods-section-label-wrap'>
                          <span for="profit" className='label-heading label-heading-margin'>
                            Profit
                          </span>
                          <img src={IButton} alt="icon" title='Product price after deducting the cost of goods.' />
                        </div>
                        <FormInput
                          type="number"
                          // label="Ribbon"
                          id="profit"
                          name="profit"
                          value={selectedVar.profit}

                          maxLength="8"
                          onChange={(e) => { editProductHandler(e.target.value, 'profit') }}
                          onWheel={(e) => e.target.blur()}
                        />
                        <span className='ruppe-symbol'>&#8377;</span>
                        <FormError
                          show={profitV}
                          error="Invalid try again "
                        />
                      </div>
                      <div className='formFieldwrap ecom-form-price '>
                        <div className='goods-section-label-wrap'>
                          <p className='label-heading label-heading-margin'>
                            Margin
                          </p>
                          <img src={IButton} alt="icon" title='Price percentage left after subtracting the cost of goods.' />
                        </div>
                        <FormInput
                          type="number"
                          // label="Ribbon"
                          id="margin"
                          name="Margin"
                          value={selectedVar.margin}
                          // placeholder="₹"
                          maxLength="8"
                          onChange={(e) => { editProductHandler(e.target.value, 'margin') }}
                          onWheel={(e) => e.target.blur()}
                        />
                        <span className='ruppe-symbol'>&#8377;</span>
                        <FormError
                          show={false}
                          error="Invalid try again "
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* inventory section */}
            <div className='sidebars-container mb-20'>
              <div className='e-commerce-inventory-wrap'>
                <p className='e-commerce-card-para'>Inventory</p>
                <hr className='horizontal-line' />
                <div className='inventory-info-wrap'>
                  <div className='product-form-group'>
                    <div className='formFieldwrap '>
                      <div className='goods-section-label-wrap'>
                        <p className='label-heading label-heading-margin'>
                          SKU (Stock Keeping Unit)
                        </p>
                        <img src={IButton} alt="icon" title='Define a unique code for each product or variant that can be used to track the inventory or stock. SKU may consist of a combination of letters and numbers.' />
                      </div>
                      <FormInput
                        type="text"
                        // label="Ribbon"
                        id="sku"
                        name="sku"
                        value={selectedVar.SKU}
                        placeholder=""
                        maxLength="80"
                        onChange={(e) => { editProductHandler(e.target.value, 'sku') }}
                      />
                      <FormError
                        show={skuV}
                        error="Invalid SKU "
                      />
                    </div>
                    <div className="formFieldwrap ">
                      <p className='label-heading mb-8'>
                        Barcode(ISBN, UPC, GTIN, etc)
                      </p>
                      <FormInput
                        type="text"
                        // label="Ribbon"
                        id="barcode"
                        name="barcode"
                        value={selectedVar.barcode}
                        placeholder=""
                        maxLength="80"
                        onChange={(e) => { editProductHandler(e.target.value, 'barcode') }}
                      // onWheel={(e) => e.target.blur()}
                      />
                      <FormError
                        show={barcodeV}
                        error="barcode invalid"
                      />
                    </div>
                  </div>
                  <div className='inventory-check-quality-wrap'>
                    < CheckboxInput
                      label={"Track quantity"}
                      LabelClass={"label-heading eComm-checkbox-center"}
                      className={"eComm-checkbox"}
                      checked={product.trackQuantity}
                      onChange={(e) => { editProductHandler(e, 'trackqty') }}
                    />
                    < CheckboxInput
                      label={"Continue selling when out of stock"}
                      LabelClass={"label-heading eComm-checkbox-center"}
                      className={"eComm-checkbox"}
                      checked={product.sellOutofStock}
                      onChange={(e) => { editProductHandler(e, 'sellOutStock') }}
                    />
                  </div>
                </div>
                {/* horizontal line will be place here */}
                <hr className='horizontal-line mt-15' />
                <div className='inventory-bottom-section'>
                  <p className='mt-20 label-heading'>QUANTITY</p>
                  <div className='inventory-quantity-input'>
                    <div className="formFieldwrap mt-25">
                      <p className='label-heading mb-8'>
                        Available
                      </p>
                      <FormInput
                        type="text"
                        // label="Ribbon"
                        id="sale-price"
                        name="salePriceice"
                        value={selectedVar.stock}
                        placeholder="0"
                        maxLength="80"
                        onChange={(e) => { editProductHandler(e.target.value, 'stock') }}
                      />
                      <FormError
                        show={qtyV}
                        error="Invalid quantity "
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* add varient section */}
            < div className='sidebars-container mt-20'>
              <div className='e-commerce-inventory-wrap'>
                <p className='e-commerce-card-para text-s w-500'>Set size or color for this product</p>
                <div className='set-size-div'>
                  <input type="checkbox" checked={productOptionsCheckbox} onChange={handleProductOptionsCheckbox} />
                  <label>This product has options, like size or color</label>
                </div>


                {productOptionsCheckbox &&

                  <div>

                    <div className='product-info-wrap '>
                      {variationOptions.length ? variationOptions.map((item, key) => {
                        return (

                          <div className='show-all-option-container' key={key}>
                            <div>
                              <hr className='horizontal-line' />
                              <div className='inline between-lg between-xs '>
                                <p className=' text-xs w-400 option-name-div capitalize'>{item.name}</p>
                                <div className='inline align-center option-button-wrapper'>
                                  <div className=''>
                                    <i className=" ed-icon icon-delete i-xs base" alt="delete icon" onClick={() => handleDeleteVariation(item)}></i>
                                    {/* <img src={Delete} className="addproduct-delete-icon" alt="delete icon" onClick={() => handleDeleteVariation(item)} /> */}
                                  </div>
                                  <button className='button btn-2xs'
                                    onClick={() => handleEditVariation(item, key)}
                                  >Edit</button>
                                </div>
                              </div>
                            </div>


                            <div className='show-all-options-wrap '>
                              {/* options value loop start here */}
                              <div className='option-item inline'>
                                {item.value && item.value.length ? item.value.map((val, index) => {
                                  return (
                                    <div key={index}>
                                      <div className='options text-xxs w-400'>{val}</div>
                                    </div>
                                  );
                                }) : ""}
                              </div>


                              {/* options value loop start here */}

                            </div>

                            {/* 

                            {item.value && item.value.length ? item.value.map((val, index) => {
                              return (
                                <div key={index}>
                                  <span className='options'>{val}</span>
                                </div>
                              );
                            }) : ""} */}

                            <hr className='mt-25' />

                          </div>
                        );
                      }) : ""}

                      <div className='optionname-optionvalue-div'>
                        <hr className='horizontal-line ' />
                        {/* option name section  */}
                        <div className='pricing-input-wrap mt-15'>
                          <p className='  mb-5  text-xs w-400 option-name-div '>Option name</p>
                          <div className='inline align-center  option-name-item' >
                            <div className='option-value-form'>
                              <FormInput
                                type="text"
                                id="price"
                                name="option_name"
                                value={optionName}
                                placeholder="Size"
                                maxLength="80"
                                className="option-value-form"
                                // disabled
                                onChange={handleProductOptionsName}
                              />
                            </div>
                            <div>
                              <i className=" ed-icon icon-delete i-xs base" alt="delete icon" onClick={handleMainDeleteButton}></i>
                            </div>
                          </div>
                        </div>


                        {/*   option value div */}
                        <div>
                          <p className='text-xs w-400 mb-5 mt-20'>Option values</p>
                          <div>
                            {optionValueArray.length ? optionValueArray.map((item, key) => {
                              return (
                                <React.Fragment key={key}>
                                  <div className='inline align-center option-name-item'>
                                    <div>
                                      <FormInput
                                        className="option-value-form"
                                        type="text"
                                        // label="Ribbon"
                                        id="price"
                                        name="option_value"
                                        value={item.value}
                                        // placeholder="₹"
                                        maxLength="80"
                                        onChange={(e) => handleProductOptionsValues(e, key)}
                                      />
                                    </div>

                                    <div>
                                      <i className="ed-icon icon-delete i-xs base" onClick={() => handleDeleteButton(item)} ></i>
                                    </div>
                                  </div>
                                </React.Fragment>
                              );
                            })
                              : ""
                            }
                          </div>

                          <button className='add-values-btn mt-5' onClick={handleAddValuesButton}>Add another value</button>
                          <div className='mt-15'>
                            {editstate ?
                              <button className='button btn btn-s'
                                onClick={handleUpdateButton}
                              >
                                Update
                              </button>
                              :
                              <React.Fragment>
                                {disableDoneButton ?
                                  <button className='button btn btn-s'
                                    disabled
                                  >
                                    Done
                                  </button>
                                  :
                                  <button className='button btn btn-s button-primary '
                                    onClick={handleDoneButton}
                                  >
                                    Done
                                  </button>
                                }
                              </React.Fragment>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                    {addMoreOptions ?

                      <div className='pricing-input-button-wrap mt-10'>
                        <hr className='mt-25 mb-15' />
                        <button className=' add-onther-option-button  '
                          onClick={handleAddMoreButton}
                        > <span>
                            <i className='ed-icon icon-plus-add primary i-xs'></i>
                          </span>
                          Add another option
                        </button>
                      </div>
                      :
                      <div>

                        <div className='pricing-input-wrap'>

                          {/* <div>
         <button
        onClick={handleAddValuesButton}
      >{optionValueArray.length ? "Add Another Value" : "Add value- e.g, Medium"}
      </button>
    </div> */}
                        </div>
                        {/* <div className='pricing-input-wrap mt-10'>
    {editstate ?
      <button className='button btn btn-sm'
        onClick={handleUpdateButton}
      >
        Update
      </button>
      :
      <React.Fragment>
        {disableDoneButton ?
          <button className='button btn btn-sm'
            disabled
          >
            Done
          </button>
          :
          <button className='button btn btn-sm'
            onClick={handleDoneButton}
          >
            Done
          </button>
        }
      </React.Fragment>
    }
  </div> */}
                      </div>
                    }
                  </div>
                }
              </div>

            </div>
          </div>
        </div>


        {
          openPopup && <DeleteConfirmPop index={'delete'} handleAcceptPopup={handleAcceptPopup} deleteVarHandler={submitProductHandler} />
        }

        <div className='inventory-edit-buton-wrapper mt-20'>
          <button className='button btn-o-red btn-sm' onClick={() => { handleAcceptPopup() }}>Delete</button>
          <button className='button button-primary btn-sm' onClick={() => { submitProductHandler('save') }}>Save</button>
        </div>
      </div>
    </React.Fragment >
  )
}

export default InventoryEdit