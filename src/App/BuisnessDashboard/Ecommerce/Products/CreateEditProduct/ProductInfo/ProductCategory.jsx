import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import "../../../../CreateCategoryEcomm/createCategory.scss"
import './productCategory.scss';
import { useDetectOutsideClick } from "../../../../../../Common/DetectOutsideClick/useDetectOutsideClick";
import { useParams } from "react-router-dom";
import { getSingleProduct } from "../../../../../../store/actions/ecommerce/action/product";
const ProductCategory = ({ position, setSelectedCategroy, addProduct, editProductCategory }) => {
  const openref = useRef(null);
  const [openDropDown, setOpenDropDown] = useDetectOutsideClick(openref, false);
  const [categoryName, setCategroyName] = useState("");
  const [subcategoryName, setsubcategoryName] = useState("");
  const [subsubcategoryName, setsubsubcategoryName] = useState("");
  const [Category, setCategroy] = useState("")
  const [category, setcategroy] = useState([]);
  const [subcategory, setsubcategory] = useState([]);
  const [subsubcategory, setsubsubcategory] = useState([]);

  const { _id } = useParams();
  const dispatch = useDispatch();
  const { getCategorylistSuccess, getCategorylistData, EditSelectionSuccess, EditSelectionData, productDetails, businessInfoData } = useSelector((state) => {
    return {
      users: state.user,
      getCategorylistSuccess: state.ecomAdmin.list.success,
      getCategorylistData: state.ecomAdmin.list.data,
      EditSelectionSuccess: state.ecomAdmin.editSelection.success,
      EditSelectionData: state.ecomAdmin.editSelection.data,
      productDetails: state.productList.getSingleProduct.data,
      businessInfoData: state.businessInfo.getInstituiteData.data,
    }
  })
  // console.log(businessInfoData, "dropdown compo")

  // useEffect(() => {
  //   if (_id) {
  //     dispatch(getSingleProduct(_id))
  //   }
  // }, []);

  useEffect(() => {
    if (productDetails && _id) {
      setcategroy(productDetails.product.categoryId);
      setsubcategory(productDetails.product.subCategoryId);
      setsubsubcategory(productDetails.product.subSubCategoryId);
    }
  }, [productDetails, _id])

  useEffect(() => {
    if (_id) {
      setcategroy(productDetails.product.categoryId);
      setsubcategory(productDetails.product.subCategoryId);
      setsubsubcategory(productDetails.product.subSubCategoryId);
    } else if (businessInfoData.defaultCategory && businessInfoData.defaultCategoryCheck) {
      // console.log("line 56")
      setcategroy(businessInfoData.defaultCategory[0].id)
      setsubcategory(businessInfoData.defaultCategory[1].id)
      setsubsubcategory(businessInfoData.defaultCategory[2].id)
    }
  }, [businessInfoData, _id])

  // console.log(category, "categorycategory-40", Category);

  const handleOpenDrop = () => {
    setOpenDropDown(!openDropDown)
  }

  const onChangeCategorySelect = (item) => {
    setCategroyName(item)
    handleOpenDrop()
  }

  useEffect(() => {
    if (category && subcategory && subsubcategory) {
      setCategroy(category.length + subcategory.length + subsubcategory.length)
    }
  }, [category, subcategory, subsubcategory])

  const handleOnChangeCategory = (e) => {
    let inputChecked = e.target.checked;
    let inputValue = e.target.value;
    let inputName = e.target.name;
    let array = category;
    if (inputChecked) {
      array.push(inputValue);
      setCategroyName(inputName);
    } else {
      let index = array.indexOf(inputValue);
      array.splice(index, 1);
    }
    setcategroy([...array]);
  }

  const handleOnChangeSubCategory = (e) => {
    let inputChecked = e.target.checked;
    let inputValue = e.target.value;
    let inputName = e.target.name;
    let array = subcategory;
    if (inputChecked) {
      array.push(inputValue);
      setsubcategoryName(inputName);
    } else {
      let index = array.indexOf(inputValue);
      array.splice(index, 1);
    }
    setsubcategory([...array]);
  }

  const handleOnChangeSubSubCategory = (e) => {
    let inputChecked = e.target.checked;
    let inputValue = e.target.value;
    let inputName = e.target.name;
    let array = subsubcategory;
    if (inputChecked) {
      array.push(inputValue);
      setsubsubcategoryName(inputName);
    } else {
      let index = array.indexOf(inputValue);
      array.splice(index, 1);
    }
    setsubsubcategory([...array]);
  }
  useEffect(() => {
    setSelectedCategroy({
      subsubcategory: subsubcategory,
      category: category,
      subcategory: subcategory
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, subcategory, subsubcategory])


  // useEffect(() => {
  //   if (productDetails && productDetails.product.categoryId && productDetails.product.categoryId.length) {
  //     console.log(1);
  //     if (getCategorylistSuccess && getCategorylistData.data.length > 0 && productDetails.product.categoryId.length.length === 1) {
  //       console.log(1.1);
  //       let data = getCategorylistData.data.filter((item, i) => item._id === productDetails.product.categoryId[0]);
  //       setCategroyName(data[0]?.categoryName)
  //       console.log(data);
  //     }
  //   }
  //   else if (productDetails && productDetails.product.subCategoryId && productDetails.product.subCategoryId.length) {
  //     console.log(2);
  //     if (getCategorylistSuccess && getCategorylistData.data.length > 0 && productDetails.product.subCategoryId.length === 1) {
  //       console.log(2.1);
  //       for (let i = 0; i < getCategorylistData.data.length; i++) {
  //         let element = getCategorylistData.data[i];
  //         let data = element.subcategories?.length && element.subcategories.filter((item, i) => item._id === productDetails.product.subCategoryId[0]);
  //         setsubcategoryName(data[0]?.categoryName)
  //         console.log(data, "139");
  //       }
  //     }
  //   }
  //   else if (productDetails && productDetails.product.subSubCategoryId && productDetails.product.subSubCategoryId.length) {
  //     console.log(3);
  //     if (getCategorylistSuccess && getCategorylistData.data.length > 0 && productDetails.product.subSubCategoryId.length === 1) {
  //       console.log(3.1);
  //       let data = getCategorylistData.data.filter((item, i) => item._id === productDetails.product.subSubCategoryId[0]);
  //       setsubsubcategoryName(data[0]?.categoryName)
  //       console.log(data);
  //     }
  //   }
  // }, [getCategorylistData.data, getCategorylistSuccess, productDetails])

  return (
    <React.Fragment>
      <div className='categoryContainer'>
        <div className="category-dropdown">
          <button className="categoryDropDpwn-btn" disabled={EditSelectionSuccess && EditSelectionData ? true : false} onClick={handleOpenDrop}>
            {productDetails && productDetails?.product?._id && Category ? `${Category} categories selected`
              :
              Category > 1 ? `${Category} categories selected` : Category === 1 && category.length ? categoryName : Category === 1 && subcategory.length ? subcategoryName : Category === 1 && subsubcategory.length ? subsubcategoryName : "Select Category"
            }
            <i className={`icon-openIcon icons icon-dropdown icons-s ${openDropDown ? 'rotate-icon' : ''}`}> </i> </button>
          <div className={`dropdown-content ${openDropDown ? '' : 'displayShow '} ${position === 'top' ? 'top' : 'bottom'}`} ref={openref}>
            {addProduct ? ("") : (<ul
            //  onClick={() => onChangeCategorySelect("Parent")}
            >Parent</ul>)}
            <React.Fragment>
              {getCategorylistSuccess && getCategorylistData.data.length > 0 ? getCategorylistData.data.map((item, key) => {
                return (
                  <React.Fragment key={key}>
                    <ul
                    // onClick={() => onChangeCategorySelect(item, item.categoryName)}
                    >
                      <label className="small">
                        <input
                          type="checkbox"
                          name={item.categoryName}
                          value={item._id}
                          checked={category.includes(item._id)}
                          onChange={handleOnChangeCategory}
                        />
                        {item.categoryName}
                      </label> </ul>
                    {item.subcategories?.length > 0 ? item.subcategories.map((subItem, subkey) => {
                      return (
                        <React.Fragment key={subkey}>
                          <ul
                          // onClick={() => onChangeCategorySelect(subItem, `${item.categoryName} > ${subItem.subCategoryName}`)}
                          >
                            <label className="small">
                              <input
                                type="checkbox"
                                name={`${item.categoryName} > ${subItem.subCategoryName}`}
                                value={subItem._id}
                                checked={subcategory.includes(subItem._id)}
                                onChange={handleOnChangeSubCategory}
                              />
                              {`${item.categoryName} > ${subItem.subCategoryName}`}
                            </label>
                          </ul>
                          {
                            addProduct && subItem.subsubcategories?.length > 0 ? subItem.subsubcategories.map((subSubItem, subSubKey) => {
                              return (
                                <React.Fragment key={subSubKey}>
                                  <ul
                                  //  onClick={() => onChangeCategorySelect(subSubItem, `${item.categoryName} > ${subItem.subCategoryName} > ${subSubItem.subSubCategoryName}`)}
                                  >
                                    <label className="small">
                                      <input
                                        type="checkbox"
                                        name={`${item.categoryName} > ${subItem.subCategoryName} > ${subSubItem.subSubCategoryName}`}
                                        value={subSubItem._id}
                                        checked={subsubcategory.includes(subSubItem._id)}
                                        onChange={handleOnChangeSubSubCategory}
                                      />
                                      {`${item.categoryName} > ${subItem.subCategoryName} > ${subSubItem.subSubCategoryName}`}
                                    </label>
                                  </ul>
                                </React.Fragment>
                              )
                            }) : ("")
                          }
                        </React.Fragment>
                      )
                    }) : ("")
                    }
                  </React.Fragment>
                )
              }) : ("")
              }
            </React.Fragment>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
export default ProductCategory