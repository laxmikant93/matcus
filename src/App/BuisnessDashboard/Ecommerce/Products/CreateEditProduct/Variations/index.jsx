import React, { useRef } from "react";
import { useState } from "react";
import CheckboxInput from "../../../../../../Common/Form/CheckboxInput";
import FormInput from "../../../../../../Common/Form/FormInput";
import Toast from "../../../../../../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/CommonComponent/CommonJsx/Toast/Toast";

import Delete from '../../../../../../assets/Icons/icon-delete.svg'
import ValidationFile from "../../../../../../Classes/ValidationFile";
import FormError from "../../../../../../Common/Form/FormError";
import VariationList from "./VariationList";
import { useEffect } from "react";
import VarientImagePop from "../../../../../Dashboard/EcommerceDashboard/Component/VarientImagePop/VarientImagePop";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
const Variations = ({ productInfo, deleteVariationFromList, variantError, resetAddVarientOption, handleVariationStatus, addProduct, handleInventoryDone, onLoadVariationsData, pricingInfo, inventoryInfo, sideBarData, productImages, addVarient }) => {
  const [productVariationCheck, setProductVariationCheck] = useState(false)
  const [showPopUpMessage, setShowPopUpMessage] = useState("")
  const { user, productDetails } = useSelector((state) => {
    return {
      user: state.user,
      productDetails: state.productList.getSingleProduct.data,
    }
  })


  const [productVariations, setProductVariations] = useState([])

  const varientRef = useRef(null);
  const { _id } = useParams()

  const oncloseVarientPopup = () => {
    varientRef.current.close()
  }
  const onOpenVarientPopup = () => {
    varientRef.current.open()
  }
  const handleCheck = (e) => {
    // console.log(productInfo.productTitle && pricingInfo.price && inventoryInfo.productAvailableQty)
    if (e.target.checked) {
      if (productInfo.productTitle && (pricingInfo.price || pricingInfo.price === 0 || pricingInfo.price === "0") && inventoryInfo.productAvailableQty) {
        setProductVariationCheck(e.target.checked)
        setProductVariations([{
          title: "",
          isActive: true,
          value: [""],
          done: false,
          isOptionValid: false,
          isConnectImg: false,
        }])
      } else {
        setProductVariationCheck(false)
        let message
        if (!productInfo.productTitle) {
          message = "Name"
        } else if (!pricingInfo.price || pricingInfo.price !== 0) {
          message = "Price"
        } else if (!inventoryInfo.productAvailableQty) {
          message = "Quantity"
        }
        setShowPopUpMessage(`Please enter Product ${message} to add Variation.`)
        setTimeout(() => {
          setShowPopUpMessage("");
        }, 2000);
      }
    } else {
      setProductVariationCheck(false)
      setProductVariations([])
    }

  }

  const deleteVariation = (key) => {
    setOptionValueError(false);
    setOptionNameError(false);
    let array = productVariations
    array.splice(key, 1)
    if (array.length === 0) {
      setProductVariationCheck(false)
    }
    setProductVariations([...array])
    if (addVarient) {
      resetAddVarientOption(false)
    }
  }
  const addAnotherOption = () => {
    let array = productVariations;
    array.push({
      title: "",
      value: [""],
      done: false,
      isOptionValid: false
    })
    setProductVariations([...array])
  }
  const addNewValue = (varIndex) => {
    let array = productVariations;
    array[varIndex]['value'].push((''))
    setProductVariations([...array])
  }
  const deleteVariationValue = (varIndex, optIndex) => {
    let array = productVariations
    array[varIndex]['value'].splice(optIndex, 1)
    setProductVariations([...array])
    setOptionValueError(false);
    setOptionNameError(false);
  }

  const handleInput = (type, e, varIndex, optIndex) => {
    let inputValue = e.target.value
    let array = productVariations
    if (type === "optionName") {
      array[varIndex]['title'] = ValidationFile.spaceNotAccept(inputValue)
      array[varIndex]['isOptionValid'] = ValidationFile.isNotEmpty(inputValue)
    } else {
      let element = array[varIndex]['value']
      element[optIndex] = ValidationFile.spaceNotAccept(inputValue)
    }
    setProductVariations([...array])
  }
  const [optionNameError, setOptionNameError] = useState(false)
  const [optionValueError, setOptionValueError] = useState(false)
  const isOptionNameValid = (key) => {
    let isValid = true;
    const element = productVariations[key];
    if (ValidationFile.isEmpty(element.title)) {
      isValid = false;
    }
    // console.log(isValid)
    if (isValid) {
      setOptionNameError(false);
    } else {
      setOptionNameError(true);
    }
    return isValid;
  };
  const isOptionValueValid = (key) => {
    let isValid = true;
    const element = productVariations[key];
    for (let index = 0; index < element.value.length; index++) {
      const elementValues = element.value[index];
      if (ValidationFile.isEmpty(elementValues)) {
        isValid = false;
      }
      if (isValid) {
        setOptionValueError(false);
      } else {
        setOptionValueError(true);
      }
    }
    return isValid
  }
  useEffect(() => {
    if (variantError) {
      setOptionNameError(true);
      setOptionValueError(true)
    }
  }, [variantError])
  const handleEdit = (key) => {
    let array = productVariations
    array[key]['done'] = false
    setProductVariations([...array])
  }
  const [mappedVariations, setMappedVariations] = useState([])
  const [variationFilterList, setVariationFilterList] = useState([]);
  const showVariationListHandler = (mappedVarData) => {
    let list = [];
    // console.log(productVariations, mappedVariations)
    productVariations &&
      productVariations.length > 0 &&
      productVariations.forEach((v, i) => {
        if (v.done) {
          let list1 = JSON.parse(JSON.stringify(list));
          list.length = 0;
          for (let m = 0; m < v.value.length; m++) {
            if (i === 0) {
              const va = `0${m + 1}`;
              let obj = {
                SKU: `${inventoryInfo.productSKU?.trim()}${va.slice(-2)}`,
                variant_schemeData: {}
              };
              obj[v.title.split(" ").join("")] = v.value[m];
              obj['variant_schemeData'] = { ...obj['variant_schemeData'], [v.title.split(" ").join("_")]: v.value[m] };
              list.push(obj);
              // console.log(obj, "ooobbgggg")
            } else {
              let tempList = list1.map((data, i) => {
                const va = `0${m + 1}`;
                let obj = { ...data };
                obj[v.title.split(" ").join("")] = v.value[m];
                obj.SKU = `${obj.SKU?.trim()}${va.slice(-2)}`;
                // console.log(obj['variant_scheme'], "liiiiiii")
                obj['variant_schemeData'] = { ...obj['variant_schemeData'], [v.title.split(" ").join("_")]: v.value[m] };
                // console.log(obj['variant_scheme'], "baaadddddd")
                // console.log(v.title, v.value, "aaaa")
                return obj;
              });
              list = [...list, ...tempList];
            }
          }
        }
      });

    const data = list.map((item) => {
      let array = []
      for (const [key, value] of Object.entries(item.variant_schemeData)) {
        // console.log(`${key}: ${value}`);
        array.push({
          title: key.split("_").join(" "),
          value: value
        })
      }
      return { ...item, variant_scheme: array }
    })
    let latestArray = []
    let obj = {}
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      const mappedelementData = mappedVarData ? mappedVarData[index] : mappedVariations[index]
      if (mappedelementData) {
        // console.log("mapppedd", mappedelementData)
        obj = Object.assign(mappedelementData, element)
      } else {

        obj = {
          ...element,
          stock: parseInt(inventoryInfo.productAvailableQty),
          price: 0,
          variationName: productInfo.productTitle,
          businessShopId: user.user_business,
          productPicture: [],
          onSale: pricingInfo.onSale,
          // discountFix: productCost < +productDiscount ? +productDiscount : productCost - 1,
          discountPercentage: pricingInfo?.discount ? pricingInfo?.discount : 0,
          // salePrice: parseInt(pricingInfo.onSale) && +pricingInfo.discount > 0 && +pricingInfo.discount < 100 ? pricingInfo.salePrice : parseInt(productInfo.price),
          salePrice: parseInt(pricingInfo.price),
          costPrice: pricingInfo.cog ? parseInt(pricingInfo.cog) : 0,
          profit: pricingInfo.profit ? parseInt(pricingInfo.profit) : 0,
          barcode: inventoryInfo.productBarcode,
          selected: false,
          visible: true,
          discount_by_percent: pricingInfo?.discount_by_percent,
          outOfStock: parseInt(inventoryInfo.productAvailableQty) > 0 ? false : true,
          cashOnDelivery: sideBarData?.payments?.COD,
          variationActive: true,
        }
      }
      latestArray.push(obj)
    }
    setMappedVariations([...latestArray]);
    const filterList = new Array(productVariations.length).fill("all");
    setVariationFilterList([...filterList]);
  };


  const filterVarients = (val, name, i) => {
    let list = [...variationFilterList];
    list[i] = val;
    const arr = mappedVariations.map((va, i) => {
      let obj = { ...va };
      obj.visible = true;
      for (let index = 0; index < list.length; index++) {
        if (list[index] && obj[productVariations[index].title.split(" ").join("")] !== list[index] && list[index] !== 'all') {
          obj.visible = false;
        }
      }
      return obj;
    });
    setMappedVariations(arr);
    setVariationFilterList([...list]);
  }
  const handleDone = (key) => {
    const optionNameValid = isOptionNameValid(key)
    const optionValueValid = isOptionValueValid(key)
    let array = productVariations
    if (optionNameValid && optionValueValid) {
      array[key]['done'] = true
      setProductVariations([...array])
      if (addProduct) {
        showVariationListHandler()
      } else {
        handleInventoryDone([...array])
      }
      handleVariationStatus(true)
      if (addVarient) {
        resetAddVarientOption(false)
      }
      console.log(productVariations, "hjii")
    }
  }

  const handleVariationInput = (val, index, type) => {
    let array = mappedVariations
    array[index][type] = !val ? val : val === "-" ? val : parseInt(val)
    setMappedVariations([...array])
  }

  const deleteVariationFromVarList = (values) => {
    // if (type === "multi") {
    //   let array = mappedVariations
    //   for (let index = 0; index < varId.length; index++) {
    //     const element = varId[index];
    //     array.splice(element)
    //   }
    //   setMappedVariations([...array]);
    // } else {
    //   let array = mappedVariations;
    //   array.splice(varId, 1)
    //   setMappedVariations([...array])
    // }
    let arr = [...values];
    let arrVar = [...productVariations];
    const count = arr.length;
    for (let j = count - 1; j >= 0; j--) {
      if (arr[j] && arr[j].selected) {
        const resp = deleteInputVar(j, arr, arrVar);
        arr = resp.arr;
        arrVar = resp.arrVar;
      }
    }
    deleteVariationFromList(true)
    handleVariationStatus(true)
    setProductVariations([...arrVar]);
    setMappedVariations(arr);
  }


  const deleteInputVar = (i, varia, opt) => {
    let arr = [...varia];
    let selectVar = { ...varia[i] };
    let arrVar = [...opt];
    let vars = {};
    let data = new Map();
    opt.forEach(v => {
      vars[v.title.split(" ").join("")] = selectVar[v.title.split(" ").join("")];
      data.set(v.title.split(" ").join(""), 0);
    });
    arr.splice(i, 1);
    arr.forEach(v => {
      Object.keys(vars).forEach(vl => {
        if (vars[vl] === v[vl]) {
          data.set(vl, data.get(vl) + 1);
        }
      });
    });

    data.forEach((value, key) => {
      if (value === 0) {
        const ele = vars[key];
        let ob = {};
        let ind;
        arrVar.forEach((vl) => {
          if (vl.title.split(" ").join("") === key && vl.value.length) {
            let arr1 = [...vl.value]
            ind = arr1.indexOf(ele);
            arr1.splice(ind, 1);
            ob = { title: key, value: arr1, done: true };
          }
        });
        let index;
        arrVar.forEach((v, i) => {
          if (v.title.split(" ").join("") === ob.title.split(" ").join("")) {
            index = i;
          }
        });
        if (ob.value.length === 0) {
          arrVar.splice(index, 1);
        } else {
          arrVar[index] = { ...ob };
        }
      }
    });
    // setProductVariations([...arrVar]);
    // setMappedVariations(arr);
    return { arr, arrVar };
  };
  const handleClearPrevious = () => {
    let array = productVariations
    for (let index = 0; index < array.length; index++) {
      array[index]['imageSet'] = []
      array[index]['isConnectImg'] = false
    }
    setProductVariations([...array])
  }
  const connectImage = (value, data) => {
    // console.log(productVariations, data, "productVar")
    let array = productVariations;
    let index = array.findIndex(p => p.title.split(" ").join("") === value.title.split(" ").join(""));
    // let isValid = array.find(p => p.title === value.title) ? true : false
    array[index]['imageSet'] = data
    array[index]['isConnectImg'] = true
    setProductVariations([...array])
    varientRef.current.close()
  }
  console.log(productVariations,"pvvv",mappedVariations,"kokoko")
  useEffect(() => {
    onLoadVariationsData({
      productVariations: productVariations,
      mappedVariations: mappedVariations
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mappedVariations, productVariations])

  useEffect(() => {
    if (productVariations.length) {
      if (productVariations.find((i) => i.isConnectImg === true&&i.done===true)) {
        let data = productVariations.find((i) => i.isConnectImg === true&&i.done===true)
        let details =
          // eslint-disable-next-line array-callback-return
          mappedVariations.map((item) => {
            console.log(data.title)
            console.log(Object.keys(item).includes(data?.title.split(" ").join("")),item[data?.title?.split(" ").join("")],"myyyy",data)
            if (Object.keys(item).includes(data?.title.split(" ").join(""))) {
              let obj=[]
               // eslint-disable-next-line array-callback-return
               data.imageSet.map((detailss) => {
                if (detailss.variant_value === item[data?.title?.split(" ").join("")]) {
                 return obj = [...detailss.images]

                }
              })
              return { ...item, productPicture: obj }
            }
          })
        setMappedVariations([...details])
        const filterList = new Array(productVariations.length).fill("all");
        setVariationFilterList([...filterList]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productVariations])
  // console.log(mappedVariations, productVariations,)
  useEffect(() => {
    if (addVarient && addVarient === true) {
      addAnotherOption()
      setProductVariationCheck(true);
      window.scrollTo(0, document.body.scrollHeight)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addVarient])

  useEffect(() => {
    let array = []
    if (productDetails && addProduct && _id) {
      if (productDetails?.product?.variant?.length) {
        setProductVariationCheck(true)
        for (let index = 0; index < productDetails?.product?.variant?.length; index++) {
          const element = productDetails?.product?.variant[index];
          array.push({
            ...element,
            done: true,
            isOptionValid: true,
          })
        }
        setProductVariations([...array]);
        showVariationListHandler([...array])
      }
      if (productDetails.variation.length) {
        const data = productDetails.variation.map((item) => {
          let element = { ...item }
          if (item?.variant_scheme) {
            for (let index = 0; index < item?.variant_scheme?.length; index++) {
              let elementData = item?.variant_scheme[index]
              element['visible'] = true
              element[elementData.title.split(" ").join("")] = elementData.value
            }
          }
          // console.log(element, { ...element }, item, { ...item }, "coojoojojojxsojsxoj")
          return { ...element }
        })

        setMappedVariations([...data])
        // const filterList = new Array(data.length).fill("all");
        // setVariationFilterList([...filterList]);
      }
    } else {
      if (productDetails?.product?.variant?.length) {
        setProductVariationCheck(true)
        for (let index = 0; index < productDetails?.product?.variant?.length; index++) {
          const element = productDetails?.product?.variant[index];
          array.push({
            ...element,
            done: true,
            isOptionValid: true,
          })
        }
        setProductVariations([...array]);

      }
      // if (productDetails.variation.length) {
      //   const data = productDetails.variation.map((item) => {
      //     let element = { ...item }
      //     if (item?.variant_scheme) {
      //       for (let index = 0; index < item?.variant_scheme?.length; index++) {
      //         let elementData = item?.variant_scheme[index]
      //         element['visible'] = true
      //         element[elementData.title] = elementData.value
      //       }
      //     }
      //     console.log(element, { ...element }, item, { ...item }, "coojoojojojxsojsxoj")
      //     return { ...element }
      //   })

      //   setMappedVariations([...data])
      //   // const filterList = new Array(data.length).fill("all");
      //   // setVariationFilterList([...filterList]);
      // }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_id, addProduct, productDetails])

  useEffect(() => {
    if (mappedVariations.length > 0) {
      let data = mappedVariations.map((element, i) => {
        return {
          ...element,
          salePrice: pricingInfo.price ? parseInt(pricingInfo.price) : element.salePrice,
          variationName: productInfo.productTitle,
          discountPercentage: pricingInfo?.discount ? pricingInfo?.discount : element.discount,
          cod: sideBarData?.payments?.COD ? sideBarData?.payments?.COD : true,
        }
      })
      setMappedVariations([...data])

      showVariationListHandler(data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pricingInfo?.discount, pricingInfo.price, productInfo.productTitle, inventoryInfo, sideBarData])

  return (
    <React.Fragment>

      <div className='e-commerce-wrap sectionGap'>
        <div className='connect-image-wrapper'>
          <p className='add-varient-card-para '>Set size or color for this product</p>
          {productVariations.length ? <button className=' connect-images-btn'
            onClick={() => onOpenVarientPopup()}
          >Connect Images</button> : ""}
        </div>
        <VarientImagePop onclose={oncloseVarientPopup} handleClearPrevious={handleClearPrevious} onConnectImage={connectImage} varientRef={varientRef} productVariations={productVariations} productImages={productImages} productTitle={productInfo.productTitle} />
        <div className='section-padding-left'>
          {showPopUpMessage && <Toast text={showPopUpMessage} />}
          <CheckboxInput
            label={"This product has options, like size or color"}
            LabelClass={"label-heading eComm-checkbox-center"}
            className={"eComm-checkbox"}
            name="checkbox"
            onChange={handleCheck}
            checked={productVariationCheck}
          />
        </div>

        {productVariationCheck &&
          <div>
            {/* add another option map loop start here */}

            {productVariations && productVariations.length > 0 &&
              productVariations.map((variation, key) => {
                return (variation.done ?
                  <div className='show-all-option-container' key={key}>
                    <div>
                      <hr className='horizontal-line' />
                      <div className='show-all-option-wrap'>
                        <div className='show-all-inner-div'>
                          <p className='label-heading'>{variation.title}</p>
                          <button className='edit-btn' onClick={() => handleEdit(key)}>Edit</button>
                        </div>
                        <div className='show-all-options-wrap'>

                          {variation && variation.value && variation.value.length > 0 && variation.value.map((val, j) => {
                            return <div className='options' key={j}>{val}</div>
                          })}

                        </div>
                      </div>
                    </div>

                  </div>
                  :
                  <div className='addProduct-option-container' key={key}>
                    <hr className='horizontal-line' />
                    <div className='addProduct-option-wrap  section-padding-left  '>
                      <div className='addproduct-dropdown '>
                        <label className='label-heading'>
                          Option name
                        </label>
                        <div className='addProduct-align-diva'>
                          <div className='formFieldwrap  width-100'>
                            <FormInput
                              type="text"
                              name={key}
                              value={variation.title}
                              placeholder=""
                              maxLength="80"
                              className=""
                              onChange={(e) => { handleInput("optionName", e, key) }}
                              onKeyUp={(e) => { handleInput("optionName", e, key) }}
                            />
                            <FormError show={!variation.isOptionValid && optionNameError} error="Option name required." />
                          </div>

                          <div >
                            <img src={Delete} onClick={() => { deleteVariation(key) }} className="addproduct-delete-icon" alt="delete icon" />
                          </div>
                        </div>
                      </div>

                      <div className='addProduct-options-list-wrap'>
                        <label className='label-heading'>
                          Option values
                        </label>
                        <div className='addproduct-options-list'>

                          {variation && variation.value && variation.value.length > 0 && variation.value.map((valOpt, valIndex) => {
                            return (<React.Fragment key={valIndex}>
                              <div className='addProduct-options-div '>
                                <div className='formFieldwrap width-100'>
                                  <FormInput
                                    type="text"
                                    id={key}
                                    name={valIndex}
                                    value={valOpt}
                                    placeholder=""
                                    maxLength="80"
                                    className=""
                                    onChange={(e) => { handleInput("optionValue", e, key, valIndex) }}
                                    onKeyUp={(e) => { handleInput("optionValue", e, key, valIndex) }}
                                  />
                                  <FormError show={!valOpt && optionValueError} error="Option value required." />
                                </div>
                                {
                                  <img src={Delete} className={`addproduct-delete-icon ${variation.value.length !== 1 ? '' : 'display-hidden'}`} alt="delete icon" onClick={() => { deleteVariationValue(key, valIndex) }} />
                                }
                              </div>
                            </React.Fragment>);
                          })}


                          <button className='add-values-btn' onClick={() => { addNewValue(key) }}>Add another value</button>
                          <FormError show={variantError} error={"Save Variations using done button."} />
                          <button className='button button-o-silver btn-gray-border  btn-sm mt-15' onClick={() => handleDone(key)} >Done</button>
                        </div>
                      </div>
                    </div>
                  </div>)

              })}

            {/* when submit button clicked this screen appers */}
            {/* <div className='show-all-option-container'>

            </div> */}
            {/* add another option button */}
            <div className='add-more-option-wrap' onClick={addAnotherOption}>
              <hr className='horizental-line' />
              <div className='add-more-btn-wrap section-padding-left '>
                <button
                  className='add-another-option-btn'
                >
                  <span>
                    <i className='ed-icon icon-plus-add primary i-xs'></i>
                  </span>
                  <span className='capitalize'>
                    Add Another Option
                  </span>
                </button>
              </div>
            </div>
          </div>
        }

      </div>
      <VariationList filterVarients={filterVarients} handleVariationInput={handleVariationInput} deleteVariation={deleteVariationFromVarList} productVariationCheck={productVariationCheck} productVariations={productVariations} mappedVariations={mappedVariations} showVariationList={true} />
    </React.Fragment>
  )
}
export default Variations