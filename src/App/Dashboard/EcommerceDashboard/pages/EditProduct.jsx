import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import IButton from '../assets/icons/i-Vector.svg';
import Delete from '../../../../assets/Icons/icon-delete.svg'
import CheckboxInput from '../../../../Common/Form/CheckboxInput';
import EDropdown from '../Component/EDropdown';

import './addProduct.scss';
import FormError from '../../../../Common/Form/FormError';
import FormInput from '../../../../Common/Form/FormInput';
import FormTextArea from '../../../../Common/Form/FormTextArea';
import DefaultImage from '../assets/images/Product_default.jpg'

import SideBar from './SideBar';
import Cropper from '../../../../Common/Cropper';
import { editProduct, getProductDetail, resetEditProduct } from '../../../../store/actions/ecommerce/action/product';
import { getCollectionList, resetGetCollectionList } from '../../../../store/actions/ecommerce/action/collection';
import { getAllCategoryList } from '../../../../store/actions/ecomAdmin/index';
import { validator } from '../../../../store/actions/ecommerce/utils/validator';
import ValidationFile from '../../../../Classes/ValidationFile';
import { getSubCategoryList } from '../../../../store/actions/ecommerce/action/category';
import TextEditor from '../../../../Common/Form/TextEditor';
import SessionStorage from '../../../../Classes/SessionStorage';
import { getInstituteData } from '../../../../store/actions/businessInfo';
import CrossImage from '../assets/icons/imageCross.png';
import PencialImage from '../assets/icons/imagePencial.png'
import Modals from '../../../../Common/Modals';
import ModalsHeader from '../../../../Common/Modals/ModalsHeader';
import ModalsBody from '../../../../Common/Modals/ModalsBody';
import ValidationUtils from '../../../../Classes/ValidationUtils';
import CategoryDropDown from '../../../BuisnessDashboard/CreateCategoryEcomm/CategoryDropDown/CategoryDropDown';
import Breadcrumb from '../../../../Common/Breadcrumb';
import BreadcrumbItem from '../../../../Common/Breadcrumb/BreadcrumbItem';

const EditProduct = () => {
  const ref = useRef()
  const [inputCheck, setInputCheck] = useState(false);
  const [uploadfile, setUploadFile] = useState(false);
  // when varient checkbox is clicked it will hide the table header menu show bulk button
  const [productName, setProductName] = useState('');
  const [productActive, setProductActive] = useState(false);
  const [productColl, setProductColl] = useState([]);
  const [productShowOnline, setProductShowOnline] = useState(true);
  const [productDescription, setProductDescription] = useState('');
  const [productRibbon, setProductRibbon] = useState('');
  const [productImages, setProductImages] = useState([]);
  const [productPrice, setProductPrice] = useState('');
  const [productSale, setProductSale] = useState(false);
  const [discountScheme, setDiscountScheme] = useState(true);
  const [productDiscount, setProductDiscount] = useState('');
  const [productDiscountPercent, setProductDiscountPercent] = useState('');
  const [productSalePrice, setProductSalePrice] = useState('');
  const [productCost, setProductCost] = useState('');
  const [productProfit, setProductProfit] = useState('');
  const [productMargin, setProductMargin] = useState('');
  const [productPhysical, setProductPhysical] = useState(true);
  const [productWeight, setProductWeight] = useState('');
  const [productSKU, setProductSKU] = useState('');
  const [productBarcode, setProductBarcode] = useState('');
  const [productTrackQty, setProductTrackQty] = useState(false);
  const [productSellOutOfStock, setProductSellOutOfStock] = useState(false);
  const [productAvailableQty, setProductAvailableQty] = useState();
  const [productHasVariations, setProductHasVariations] = useState(false);
  const [varFields, setVarFields] = useState([]);
  const [productVariations, setProductVariations] = useState([]);
  const [mappedVariations, setMappedVariations] = useState([]);
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [subCategoryName, setSubCategoryName] = useState('');
  const [newArrival, setNewArrival] = useState(false);
  const [bestSeller, setBestSeller] = useState(false);
  const [productNameError, setProductNameError] = useState(false);
  const [productDescriptionError, setProductDescriptionError] = useState(false);
  const [productPriceError, setProductPriceError] = useState(false);
  const [productSalePriceError, setProductSalePriceError] = useState(false);
  const [productCostError, setProductCostError] = useState(false);
  const [productProfitError, setProductProfitError] = useState(false);
  const [productSKUError, setProductSKUError] = useState(false);
  const [productAvailableQtyError, setProductAvailableQtyError] = useState(false);
  const [subCategoryNameError, setSubCategoryNameError] = useState(false);
  const [infoError, setInfoError] = useState(false);
  const [variationFilterList, setVariationFilterList] = useState([]);
  const [showVariationList, setShowVariationList] = useState(false);
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [urlSlug, setUrlSlug] = useState(false);
  const { adminCollectionList } = useSelector((state) => state.collectionList);
  const [conditionForSeoPages, setConditionForSeoPage] = useState("");

  // const user = useSelector((state) => state.user);
  const { productDetail, editProduct: editProductState } = useSelector((state) => state.productList);
  const { SubCategoryList } = useSelector((state) => state.categoryList);

  const { user, EditProductSuccess, productDetailData, getCategorylistSuccess, productDetailLoading,
    getCategorylistData, productDetailSuccess } = useSelector((state) => {
      return {
        user: state.user,
        EditProductSuccess: state.productList.editProduct.success,
        getbusinessInfoSuccess: state.businessInfo.getInstituiteData.success,
        getbusinessInfoData: state.businessInfo.getInstituiteData.data,
        productDetailSuccess: state.productList.productDetail.success,
        productDetailLoading: state.productList.productDetail.loading,
        productDetailData: state.productList.productDetail.data.productInfo,
        getCategorylistSuccess: state.ecomAdmin.list.success,
        getCategorylistData: state.ecomAdmin.list.data,
      };
    })
  // console.log(getbusinessInfoData, "getbusinessInfoDatagetbusinessInfoDatagetbusinessInfoData")
  // console.log(EditProductSuccess, "EditProductSuccessEditProductSuccessEditProductSuccess")
  // console.log(adminCollectionList, "adminCollectionListadminCollectionListadminCollectionList")
  const dispatch = useDispatch();
  const history = useNavigate();
  const { id } = useParams();
  const infoSectionRef = useRef(null);
  const deleteInfoRef = useRef(null);

  const [COD, setCOD] = useState(true);
  const [shippingCharges, setShippingCharges] = useState("");
  const [storageData, setStorageData] = useState("");
  const [infoTitle, setInfoTitle] = useState("");
  const [infoTitleError, setInfoTitleError] = useState(false);
  const [infoDesc, setInfoDesc] = useState("");
  const [infoDataArray, setInfoDataArray] = useState([]);
  const [infoIndex, setInfoIndex] = useState("");

  //shadab dev

  const [selectedCategroy, setSelectedCategroy] = useState("")

  const [selectedCategroyError, setSelectedCategroyError] = useState(false)
  // const [data, setData] = useState("")
  const { users } = useSelector((state) => {
    return {
      users: state.user
    }
  })

  const [editProductCategory, seteditProductCategory] = useState()
  useEffect(() => {
    if (productDetailSuccess && productDetailData && getCategorylistSuccess && getCategorylistData) {
      let categoryName = ""
      // let subcategoryName = ""
      let category = {}
      let subcategory = {}
      switch (productDetailData.category_level) {
        case 0:
          categoryName = getCategorylistData.find((item) => item._id === productDetailData.categoryId).categoryName
          seteditProductCategory(categoryName)
          break
        case 1:
          category = getCategorylistData.find((item) => item._id === productDetailData.categoryId)
          categoryName = category.categoryName
          subcategory = category.subcategories.find((item) => item._id === productDetailData.subCategoryId)
          seteditProductCategory(`${categoryName}>${subcategory.subCategoryName}`)
          break
        case 2:
          category = getCategorylistData.find((item) => item._id === productDetailData.categoryId)
          categoryName = category.categoryName
          subcategory = category.subcategories.find((item) => item._id === productDetailData.subCategoryId)
          let subsubcategory = subcategory.subsubcategories.find((item) => item._id === productDetailData.subSubCategoryId)
          let subsubcategoryName = subsubcategory.subSubCategoryName
          seteditProductCategory(`${categoryName}>${subcategory.subCategoryName}>${subsubcategoryName}`)
          break

        default:
          break;
      }

    }
  }, [getCategorylistData, getCategorylistSuccess, productDetailSuccess, productDetailData])

  // useEffect(() => {
  //   if (productDetailData && productDetailSuccess) {
  //     setSelectedCategroy(productDetail.data.categoryName)
  //   }
  // }, [productDetail.data.categoryName, productDetailData, productDetailSuccess])

  useEffect(() => {
    dispatch(getAllCategoryList(users.user_business))
  }, [])

  /// end

  useLayoutEffect(() => {
    // dispatch(getSubCategoryList(user.user_business_business_shop_category[0]));
    dispatch(getProductDetail(id));
  }, []);


  // useEffect(() => {
  //   dispatch(getInstituteData(user.user_business, user.user_business_type));
  // }, [dispatch, user.user_business, user.user_business_type])

  // useEffect(() => {
  //   if (getbusinessInfoSuccess && getbusinessInfoData && !getbusinessInfoData.cash_on_delivery_enabled) {
  //     setCOD(false);
  //   }
  // }, [getbusinessInfoData, getbusinessInfoSuccess])


  useEffect(() => {
    const data = {
      owner: user._id,
      productName: productName,
      ribbon: productRibbon,
      cod: COD,
      shipping_cost: shippingCharges,
      miscellaneous: infoDataArray,
      // gender: productGender,
      physicalProduct: productPhysical,
      trackQuantity: productTrackQty,
      sellOutofStock: productSellOutOfStock,
      productDescription,
      productActive: productActive,
      collectionId: productColl,
      // variationOption: [...arr],
      // variations: !productHasVariations || mappedVariations.length === 0 ? [obj] : [...mappedVariations],
      productPicture: productImages ? [...productImages] : [],
      newArrival: newArrival,
      bestSeller: bestSeller,
      businessShopId: user.user_business,
      // categoryId: category,
      // subCategoryId: subCategory,
      subCategoryName: subCategoryName,
      price: productPrice,
      salePrice: productSalePrice,
      costPrice: productCost,
      profit: productProfit,
      discountPercentage: +productDiscountPercent < 100 ? +productDiscountPercent : 99,
      stock: productAvailableQty,
      SKU: productSKU,
      barcode: productBarcode,
      categoryId: selectedCategroy._id,
      subCategoryId: selectedCategroy._id,
      subSubCategoryId: selectedCategroy._id,
      // subSubCategoryId: subSubCategory,
      domain: user.user_business_business_subdomain,
      // categoryId: selectedCategroy.categoryId._id,
      // subCategoryId: selectedCategroy.categoryId.subCategoryId._id,
      // subSubCategoryId: selectedCategroy.categoryId.subCategoryId.subSubCategoryId._id
    };
    setStorageData(data);
  }, [COD, bestSeller, category, selectedCategroy, infoDataArray, mappedVariations, newArrival, productActive, productAvailableQty, productBarcode, productColl, productCost, productDescription, productDiscountPercent, productHasVariations, productImages, productName, productPhysical, productPrice, productProfit, productRibbon, productSKU, productSalePrice, productSellOutOfStock, productTrackQty, subCategory, subCategoryName, user._id, user.user_business, user.user_business_business_subdomain, shippingCharges])

  useEffect(() => {
    if (SessionStorage.alive("data")) {
      let data = SessionStorage.getJson("data")
      setProductName(data.productName);
      setProductRibbon(data.ribbon);
      setProductDescription(data.productDescription);
      setProductImages(data?.productPicture ? productImages : "");
      setProductPrice(data.price);
      setProductProfit(data.profit);
      setProductSKU(data.SKU);
      setProductBarcode(data.barcode);
      setBestSeller(data.bestSeller);
      setProductColl(data.collectionId);
      setProductAvailableQty(data.stock);
      setProductCost(data.costPrice);
      setProductDiscountPercent(data.discountPercentage);
      setNewArrival(data.newArrival);
      setProductActive(data.productActive);
      setProductSalePrice(data.salePrice);
      setProductSellOutOfStock(data.sellOutofStock);
      setSubCategory(data.subCategoryId);
      setSubCategoryName(data.subCategoryName);
      // setSelectedCategroy(data.selectedCategroy);
      setProductTrackQty(data.trackQuantity);
      setCategory(data.categoryId);
      setMetaTitle(data.metaTitle)
      setMetaDescription(data.metaDescription)
      setUrlSlug(data.urlSlug)
      setInfoDataArray(data.miscellaneous);
      setShippingCharges(data.shipping_cost);
    }
    else if (productDetail.success === true) {
      setProductName(productDetail.data.productName)
      setCOD(productDetail.data.cod)
      setShippingCharges(productDetail.data.shipping_cost);
      setInfoDataArray(productDetail.data.miscellaneous)
      setProductActive(productDetail.data.productActive)
      setProductColl(productDetail.data.collectionId)
      setProductDescription(productDetail.data.productDescription)
      setProductRibbon(productDetail.data.ribbon)
      setProductImages(productDetail.data.productPicture)
      setProductPrice(productDetail.data.price)
      setProductSale(productDetail.data.salePrice && productDetail.data.salePrice > 0 ? true : false)
      setProductDiscountPercent(productDetail.data.discountPercentage)
      setProductSalePrice(productDetail.data.salePrice)
      setProductCost(productDetail.data.costPrice)
      setProductProfit(productDetail.data.profit)
      setProductSKU(productDetail.data.SKU)
      setProductBarcode(productDetail.data.barcode)
      setProductTrackQty(productDetail.data.trackQuantity)
      setProductSellOutOfStock(productDetail.data.sellOutofStock)
      setProductAvailableQty(productDetail.data.stock)
      setProductHasVariations(productDetail.data?.variationOption?.length > 0 ? true : false)
      setCategory(productDetail.data.categoryId)
      setSubCategory(productDetail.data.subCategoryId)
      setSubCategoryName(productDetail.data.subCategoryName)
      setNewArrival(productDetail.data.newArrival)
      setBestSeller(productDetail.data.bestSeller)
      setMetaTitle(productDetail?.data?.metaTitle)
      setMetaDescription(productDetail?.data?.metaDescription)
      setUrlSlug(productDetail?.data?.urlSlug)
      if (productDetail.data?.variationOption?.length > 0) {
        let variations = productDetail.data.variationOption.map(v => {
          return { ...v, done: true };
        });
        setProductVariations(variations);
      }
    }
  }, [productDetail.data, productDetail.success])

  useEffect(() => {
    return () => {
      if (EditProductSuccess) {
        SessionStorage.remove("data");
      }
    };
  }, [EditProductSuccess]);

  useEffect(() => {
    if (productDetail.success === true && SubCategoryList.success === true && SubCategoryList.data.length > 0) {
      SubCategoryList.data.forEach(v => {
        if (productDetail.data.subCategoryId === v._id) {
          setVarFields(v.options.variations);
        }
      });
    }
  }, [SubCategoryList, productDetail]);

  // useEffect(() => {
  //   if (productDetail.success === true) {
  //     setProductName(productDetail.data.productName)
  //     setCOD(productDetail.data.cod)
  //     setProductActive(productDetail.data.productActive)
  //     setProductColl(productDetail.data.collectionId)
  //     setProductDescription(productDetail.data.productDescription)
  //     setProductRibbon(productDetail.data.ribbon)
  //     setProductImages(productDetail.data.productPicture)
  //     setProductPrice(productDetail.data.price)
  //     setProductSale(productDetail.data.salePrice && productDetail.data.salePrice > 0 ? true : false)
  //     setProductDiscountPercent(productDetail.data.discountPercentage)
  //     setProductSalePrice(productDetail.data.salePrice)
  //     setProductCost(productDetail.data.costPrice)
  //     setProductProfit(productDetail.data.profit)
  //     setProductSKU(productDetail.data.SKU)
  //     setProductBarcode(productDetail.data.barcode)
  //     setProductTrackQty(productDetail.data.trackQuantity)
  //     setProductSellOutOfStock(productDetail.data.sellOutofStock)
  //     setProductAvailableQty(productDetail.data.stock)
  //     setProductHasVariations(productDetail.data.variationOption.length > 0 ? true : false)
  //     setCategory(productDetail.data.categoryId)
  //     setSubCategory(productDetail.data.subCategoryId)
  //     setSubCategoryName(productDetail.data.subCategoryName)
  //     setNewArrival(productDetail.data.newArrival)
  //     setBestSeller(productDetail.data.bestSeller)
  //     if (productDetail.data.variationOption.length > 0) {
  //       let variations = productDetail.data.variationOption.map(v => {
  //         return { ...v, done: false };
  //       });
  //       setProductVariations(variations);
  //     }
  //   }
  // }, [productDetail]);

  useEffect(() => {
    if (user && user.user_business_business_shop_category.length === 0) {
      // history('/ecommerce/businessInfo');
    }
    dispatch(getCollectionList(user.user_business, 'id'));
  }, [user]);

  const UploadModle = () => {
    setUploadFile(!uploadfile)
  }

  const uploadThumbnail = (data) => {
    let imgData = data.location;
    const imgArr = [...productImages];
    imgArr.push(imgData);
    setProductImages([...imgArr]);

  };

  const handleInput = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;

    switch (inputName) {
      case "product_Name":
        setProductName(ValidationFile.spaceNotAccept(inputValue));
        setProductNameError(
          ValidationFile.isEmpty(ValidationFile.spaceNotAccept(inputValue))
        );
        if (ValidationFile.spaceNotAccept(inputValue).split(" ").length > 1) {
          setProductSKU(
            `${ValidationFile.spaceNotAccept(inputValue)
              .split(" ")[0]
              .substring(0, 1)}${ValidationFile.spaceNotAccept(inputValue)
                .split(" ")[1]
                .substring(0, 1)}${Math.random().toString(36).substring(2, 8)}`
          );
        } else {
          setProductSKU(
            `${ValidationFile.spaceNotAccept(inputValue).substring(
              0,
              2
            )}${Math.random().toString(36).substring(2, 8)}`
          );
        }
        break;
      case "Ribbon":
        setProductRibbon(ValidationFile.spaceNotAccept(inputValue));
        break;
      case "shippingCharges":
        setShippingCharges(ValidationFile.spaceNotAccept(inputValue));
        break;
      case "description":
        setProductDescription(ValidationFile.spaceNotAccept(inputValue));
        setProductDescriptionError(
          ValidationFile.isEmpty(ValidationFile.spaceNotAccept(inputValue))
        );
        break;
      case "price":
        setProductPrice(ValidationFile.spaceNotAccept(inputValue));
        setProductPriceError(
          ValidationFile.isEmpty(ValidationFile.spaceNotAccept(inputValue))
        );
        if (productCost) {
          const profit = Math.ceil(
            ValidationFile.spaceNotAccept(inputValue) - productCost
          );
          setProductProfit(profit);
        }
        break;
      case "discount":
        setProductDiscountPercent(ValidationFile.spaceNotAccept(inputValue));
        const salePr =
          (productPrice * (100 - ValidationFile.spaceNotAccept(inputValue))) /
          100;
        setProductSalePrice(Math.ceil(salePr));
        if (productSalePrice && productSalePrice != 0 && productCost > 0) {
          const profit = Math.ceil(Math.ceil(salePr) - productCost);
          setProductProfit(profit);
        }
        break;
      case "productSale":
        setProductSalePrice(ValidationFile.spaceNotAccept(inputValue));
        const discountPer =
          ((productPrice - ValidationFile.spaceNotAccept(inputValue)) * 100) /
          productPrice;
        setProductDiscountPercent(Math.floor(discountPer));
        setProductSalePriceError(
          ValidationFile.isEmpty(ValidationFile.spaceNotAccept(inputValue))
        );
        break;
      case "costofgoods":
        setProductCost(ValidationFile.spaceNotAccept(inputValue));
        if (productSalePrice && productSalePrice != 0) {
          const profit = Math.ceil(
            productSalePrice - ValidationFile.spaceNotAccept(inputValue)
          );
          setProductProfit(profit);
        } else {
          const profit = Math.ceil(
            productPrice - ValidationFile.spaceNotAccept(inputValue)
          );
          setProductProfit(profit);
        }
        setProductCostError(
          ValidationFile.isEmpty(ValidationFile.spaceNotAccept(inputValue))
        );
        break;
      case "Margin":
        setProductMargin(ValidationFile.spaceNotAccept(inputValue));
        break;
      case "weight":
        setProductWeight(ValidationFile.spaceNotAccept(inputValue));
        break;
      case "checkbox":
        setProductHasVariations(ValidationFile.spaceNotAccept(inputValue));
        setProductHasVariations(productHasVariations ? false : true);
        break;
      case "barcode":
        setProductBarcode(ValidationFile.spaceNotAccept(inputValue));
        break;
      case "salePriceice":
        setProductAvailableQty(ValidationFile.spaceNotAccept(inputValue));
        setProductAvailableQtyError(
          ValidationFile.isEmpty(ValidationFile.spaceNotAccept(inputValue))
        );
        break;
      default:
        return false;
    }
  };

  const setvarsubcat = (obj) => {
    setSubCategory(obj._id);
    if (
      obj.options &&
      obj.options.variations &&
      obj.options.variations.length > 0
    ) {
      setVarFields(obj.options.variations);
    }
    setSubCategoryName(obj.subCategoryName);
  };

  const changeVariationName = (e, i) => {
    e.preventDefault();
    let arr = [...productVariations];
    arr[i].name = e.target.value;
    setProductVariations(arr);
  };

  const deleteVariationHandler = (i) => {
    let arr = [...productVariations];
    arr.splice(i, 1);
    setProductVariations(arr);
  };

  const addNewVarValue = (val, i, j, type) => {
    let arr = [...productVariations];
    if (type === "val") {
      arr[i].value[j] = val;
    }
    if (type === "add") {
      arr[i].value.push("");
    }

    setProductVariations(arr);
  };

  const deleteVarValue = (i, j) => {
    let arr = [...productVariations];
    arr[i].value.splice(j, 1);
    setProductVariations(arr);
  };

  const changeInputVar = (e, i, type) => {
    // e.preventDefault();
    let arr = [...mappedVariations];
    if (type === "price") {
      arr[i].price = e;
      if (productDiscountPercent > 0 && productDiscountPercent < 100) {
        arr[i].salePrice = Math.ceil((e * (100 - productDiscountPercent)) / 100)
      } else {
        arr[i].salePrice = e;
      }
    }
    if (type === "sku") {
      arr[i].SKU = e;
    }
    if (type === "quantity") {
      arr[i].stock = e;
    }
    setMappedVariations(arr);
  };

  const deleteInputVar = (i) => {
    let arr = [...mappedVariations];
    let selectVar = { ...mappedVariations[i] };
    let arrVar = [...productVariations];
    let vars = {};
    let data = new Map();
    productVariations.forEach(v => {
      vars[v.name.toLowerCase().split(" ").join("")] = selectVar[v.name.toLowerCase().split(" ").join("")];
      data.set(v.name.toLowerCase().split(" ").join(""), 0);
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
          if (vl.name === key && vl.value.length) {
            let arr1 = [...vl.value]
            ind = arr1.indexOf(ele);
            arr1.splice(ind, 1);
            ob = { name: key, value: arr1, done: true };
          }
        });
        let index;
        arrVar.forEach((v, i) => {
          if (v.name === ob.name) {
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
    setProductVariations([...arrVar]);
    setMappedVariations(arr);
  };

  const changeVarSelectStatus = (val, i, option) => {
    if (option === "one") {
      let check = true;
      let arr = [...mappedVariations];
      arr[i].selected = val ? false : true;
      setMappedVariations(arr);

      mappedVariations[i].selected === false && setInputCheck(false);
      mappedVariations.forEach((m) => {
        if (m.selected === false) {
          check = false;
        }
      });
      setInputCheck(check);
    } else {
      let arr = [...mappedVariations];
      arr.forEach((va, j) => {
        va.selected = val ? false : true;
      });
      setMappedVariations(arr);
      setInputCheck(val ? false : true);
    }
  };

  const changeDoneStatus = (i, status) => {
    let arr = [...productVariations];
    arr[i].done = status;
    let val = [];
    arr[i].value.length > 0 &&
      arr[i].value.forEach((v) => {
        if (validator("xx", v)) {
          val.push(v);
        }
      });
    arr[i].value = val;
    setProductVariations(arr);
    showVariationListHandler();
  };

  const selectOptionHandler = (val, name, i) => {
    const arr = mappedVariations.map((va, i) => {
      let obj = { ...va };
      if (obj[name] === val) {
        obj.visible = true;
      } else {
        obj.visible = false;
      }
      return obj;
    });
    setMappedVariations(arr);
    let list = [...variationFilterList];
    list[i] = val;

    setVariationFilterList([...list]);
  };

  const toggleBulkEditor = () => {
    let open = false;
    mappedVariations.forEach((m) => {
      if (m.selected === true) {
        open = true;
      }
    });
    return open;
  };

  const countSelectedVar = () => {
    const count = mappedVariations.reduce((tot, va, i) => {
      if (va.selected === true) {
        return (tot += 1);
      }
      return tot;
    }, 0);
    return count;
  };

  const showVariationListHandler = () => {
    let show = true;
    let list = [];
    productVariations &&
      productVariations.length > 0 &&
      productVariations.forEach((v, i) => {
        if (v.done === false) {
          show = false;
        }
      });
    setShowVariationList(show);
    if (show === true) {
      for (let n = 0; n < productVariations.length; n++) {
        // let list1 = [...list];
        let list1 = JSON.parse(JSON.stringify(list));
        list.length = 0;
        for (let m = 0; m < productVariations[n].value.length; m++) {
          if (n === 0) {
            const va = `0${m + 1}`;
            let obj = {
              stock: productAvailableQty,
              SKU: `${productSKU}${va.slice(-2)}`,
              price: productPrice,
              variationName: productName,
              // weight: productWeightType === 'kg' ? productWeight * 1000 : productWeight,
              productPicture: [...productImages],
              onSale: productSale,
              // discountFix: productCost < +productDiscount ? +productDiscount : productCost - 1,

              discountPercentage: productSale && +productDiscountPercent < 100 ? +productDiscountPercent : productSale && +productDiscountPercent >= 100 ? 99 : 0,
              salePrice: productSale && +productDiscountPercent > 0 && +productDiscountPercent < 100 ? productSalePrice : productPrice,
              costPrice: productCost,
              profit: productProfit,
              // margin: productMargin,
              barcode: productBarcode,
              showInOnlineStore: productShowOnline,
              // trackQuantity: productTrackQty,
              // sellOutOfStock: productSellOutOfStock,
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

      const filterList = new Array(productVariations.length).fill("all");
      setVariationFilterList([...filterList]);
    }
  };

  const addNewVariationHandler = () => {
    let variations = [...productVariations];
    variations.push({
      name: "",
      value: [],
      done: false,
    });
    setProductVariations(variations);
  };

  const showVariationHandler = (obj) => {
    let show = true;
    const filters = variationFilterList;
    const fields = productVariations.map((ob) => ob.name);

    for (let j = 0; j < fields.length; j++) {
      if (obj[fields[j]] !== filters[j] && filters[j] !== "all") {
        show = false;
        break;
      }
    }

    return show;
  };

  const cancelHandler = () => {
    history("/ecommerce/productList");
    dispatch(resetGetCollectionList())

  };

  const editProductHandler = () => {
    let obj = {
      stock: productAvailableQty,
      variationName: productName,
      SKU: `${productSKU}01`,
      price: productPrice,
      // weight: productWeightType === 'kg' ? productWeight * 1000 : productWeight,
      productPicture: productImages,
      onSale: productSale,
      // discountFix: productCost < +productDiscount ? +productDiscount : productCost - 1,
      discountPercentage: productSale && +productDiscountPercent < 100 ? +productDiscountPercent : productSale && +productDiscountPercent >= 100 ? 99 : 0,
      salePrice: productSale && +productDiscountPercent > 0 && +productDiscountPercent < 100 ? productSalePrice : productPrice,
      costPrice: productCost,
      profit: productProfit,
      // margin: productMargin,
      barcode: productBarcode,
      showInOnlineStore: productShowOnline,
      // trackQuantity: productTrackQty,
      // sellOutOfStock: productSellOutOfStock,
      selected: false,
      visible: true,
    };
    let arr = [];
    if (productVariations && productVariations.length > 0) {
      arr = productVariations.map((vl, i) => {
        return { name: vl.name, value: [...vl.value] };
      });
    }
    setInfoError(true);
    if (ValidationFile.isEmpty(productName)) {
      setProductNameError(true);
    }
    if (ValidationFile.isEmpty(productDescription)) {
      setProductDescriptionError(true);
    }
    if (ValidationFile.isEmpty(productPrice)) {
      setProductPriceError(true);
    }
    if (ValidationFile.isEmpty(productSalePrice)) {
      setProductSalePriceError(true);
    }
    // if (ValidationFile.isEmpty(subCategoryName)) {
    //   setSubCategoryNameError(true);
    // }
    if (ValidationFile.isEmpty(productSKU)) {
      setProductSKUError(true);
    }
    if (ValidationFile.isEmpty(productAvailableQty)) {
      setProductAvailableQtyError(true);
    }
    // if (ValidationFile.isEmpty(selectedCategroy._id)) {
    //   setSelectedCategroyError(true)
    // } else if (ValidationFile.isNotEmpty(selectedCategroy._id)) {
    //   setSelectedCategroyError(false)
    // }
    let data;
    if (
      !ValidationFile.isEmpty(productName) &&
      !ValidationFile.isEmpty(productDescription) &&
      !ValidationFile.isEmpty(productPrice) &&
      // !ValidationFile.isEmpty(subCategoryName) &&
      !ValidationFile.isEmpty(productSKU) &&
      !ValidationFile.isEmpty(productAvailableQty)
      // !ValidationFile.isEmpty(selectedCategroy._id)
    ) {

      switch (selectedCategroy.category_level) {
        case 1:
          data = {
            productId: productDetail.data._id,
            status: "productEdit",
            owner: user._id,
            productName: productName,
            cod: COD,
            shipping_cost: shippingCharges,
            miscellaneous: infoDataArray,
            ribbon: productRibbon,
            physicalProduct: productPhysical,
            trackQuantity: productTrackQty,
            sellOutofStock: productSellOutOfStock,
            productDescription,
            productActive: productActive,
            collectionId: productColl,
            variationOption: [...arr],
            variations:
              !productHasVariations || mappedVariations.length === 0
                ? [obj]
                : [...mappedVariations],
            productPicture: [...productImages],
            newArrival: newArrival,
            bestSeller: bestSeller,
            businessShopId: user.user_business,
            // categoryId: category,
            subCategoryId: subCategory,
            subCategoryName: subCategoryName,
            categoryId: selectedCategroy._id,
            category_level: 0,
            price: productPrice,
            salePrice: +productDiscountPercent > 0 && +productDiscountPercent < 100 ? productSalePrice : productPrice,
            costPrice: productCost,
            profit: productProfit,
            discountPercentage: +productDiscountPercent < 100 ? +productDiscountPercent : +productDiscountPercent >= 100 ? 99 : 0,
            stock: productAvailableQty,
            SKU: productSKU,
            barcode: productBarcode,
            // subSubCategoryId: subSubCategory,
            domain: user.user_business_business_subdomain,
            metaTitle: metaTitle ? metaTitle : productName,
            metaDescription: metaDescription ? metaDescription : productDescription,
            urlSlug: "https://justshop.edneed.com/product/",
          };
          break

        case "1":
          data = {
            productId: productDetail.data._id,
            status: "productEdit",
            owner: user._id,
            productName: productName,
            cod: COD,
            shipping_cost: shippingCharges,
            miscellaneous: infoDataArray,
            ribbon: productRibbon,
            physicalProduct: productPhysical,
            trackQuantity: productTrackQty,
            sellOutofStock: productSellOutOfStock,
            productDescription,
            productActive: productActive,
            collectionId: productColl,
            variationOption: [...arr],
            variations:
              !productHasVariations || mappedVariations.length === 0
                ? [obj]
                : [...mappedVariations],
            productPicture: [...productImages],
            newArrival: newArrival,
            bestSeller: bestSeller,
            businessShopId: user.user_business,
            // categoryId: category,
            // subCategoryId: subCategory,
            subCategoryName: subCategoryName,
            price: productPrice,
            salePrice: +productDiscountPercent > 0 && +productDiscountPercent < 100 ? productSalePrice : productPrice,
            costPrice: productCost,
            profit: productProfit,
            discountPercentage: +productDiscountPercent < 100 ? +productDiscountPercent : +productDiscountPercent >= 100 ? 99 : 0,
            stock: productAvailableQty,
            SKU: productSKU,
            barcode: productBarcode,
            categoryId: selectedCategroy.categoryId,
            subCategoryId: selectedCategroy._id,
            category_level: 1,
            metaTitle: metaTitle ? metaTitle : productName,
            metaDescription: metaDescription ? metaDescription : productDescription,
            urlSlug: "https://justshop.edneed.com/product/",
            // subSubCategoryId: subSubCategory,
            domain: user.user_business_business_subdomain,
          };
          break
        case 2:
          data = {
            productId: productDetail.data._id,
            status: "productEdit",
            owner: user._id,
            productName: productName,
            cod: COD,
            shipping_cost: shippingCharges,
            miscellaneous: infoDataArray,
            ribbon: productRibbon,
            physicalProduct: productPhysical,
            trackQuantity: productTrackQty,
            sellOutofStock: productSellOutOfStock,
            productDescription,
            productActive: productActive,
            collectionId: productColl,
            variationOption: [...arr],
            variations:
              !productHasVariations || mappedVariations.length === 0
                ? [obj]
                : [...mappedVariations],
            productPicture: [...productImages],
            newArrival: newArrival,
            bestSeller: bestSeller,
            businessShopId: user.user_business,
            // categoryId: category,
            // subCategoryId: subCategory,
            subCategoryName: subCategoryName,
            price: productPrice,
            salePrice: +productDiscountPercent > 0 && +productDiscountPercent < 100 ? productSalePrice : productPrice,
            costPrice: productCost,
            profit: productProfit,
            discountPercentage: +productDiscountPercent < 100 ? +productDiscountPercent : +productDiscountPercent >= 100 ? 99 : 0,
            stock: productAvailableQty,
            SKU: productSKU,
            barcode: productBarcode,
            metaTitle: metaTitle ? metaTitle : productName,
            metaDescription: metaDescription ? metaDescription : productDescription,
            urlSlug: "https://justshop.edneed.com/product/",
            categoryId: selectedCategroy.categoryId,
            subCategoryId: selectedCategroy.subCategoryId,
            subSubCategoryId: selectedCategroy._id,
            // subSubCategoryId: subSubCategory,
            domain: user.user_business_business_subdomain,
          };
          break
        default:
          break
      }
      // const data = {
      //   productId: productDetail.data._id,
      //   status: "productEdit",
      //   owner: user._id,
      //   productName: productName,
      //   cod: COD,
      //   shipping_cost: shippingCharges,
      //   miscellaneous: infoDataArray,
      //   ribbon: productRibbon,
      //   physicalProduct: productPhysical,
      //   trackQuantity: productTrackQty,
      //   sellOutofStock: productSellOutOfStock,
      //   productDescription,
      //   productActive: productActive,
      //   collectionId: productColl,
      //   variationOption: [...arr],
      //   variations:
      //     !productHasVariations || mappedVariations.length === 0
      //       ? [obj]
      //       : [...mappedVariations],
      //   productPicture: [...productImages],
      //   newArrival: newArrival,
      //   bestSeller: bestSeller,
      //   businessShopId: user.user_business,
      //   categoryId: category,
      //   subCategoryId: subCategory,
      //   subCategoryName: subCategoryName,
      //   price: productPrice,
      //   salePrice: +productDiscountPercent > 0 && +productDiscountPercent < 100 ? productSalePrice : productPrice,
      //   costPrice: productCost,
      //   profit: productProfit,
      //   discountPercentage: +productDiscountPercent < 100 ? +productDiscountPercent : +productDiscountPercent >= 100 ? 99 : 0,
      //   stock: productAvailableQty,
      //   SKU: productSKU,
      //   barcode: productBarcode,
      //   // subSubCategoryId: subSubCategory,
      //   domain: user.user_business_business_subdomain,
      // };
      dispatch(editProduct(data));
      if (conditionForSeoPages) {
        history(`/marketingform/seo`)
      } else {
        history('/ecommerce/productList')
      }
    }
  };
  const handleeditallSeoData = (value) => {
    setMetaTitle(value.metaTitle)
    setMetaDescription(value.metaDescription)
    setUrlSlug(value.urlSlug)
  }
  useEffect(() => {
    // if (editProductState.success) {
    //   history('/ecommerce/productList');
    return () => {
      dispatch(resetEditProduct());
    }
    // }
  }, [dispatch, history])

  const handleOnChangeContent = (value) => {
    setProductDescription(value);
  }

  const handleAddSectionButton = () => {
    infoSectionRef.current.open();
  }

  const handleResetInfoData = () => {
    setInfoTitle("");
    setInfoDesc("");
    setInfoTitleError(false);
    setInfoIndex("");
  }

  const closeModal = () => {
    handleResetInfoData();
  }

  const closeModalPopup = () => {
    infoSectionRef.current.close();
    handleResetInfoData();
  }

  const handleAddSectionInputs = (e) => {
    let inputValue = e.target.value;
    let value = ValidationFile.spaceNotAccept(inputValue);
    let inputName = e.target.name;
    switch (inputName) {
      case "infoTitle":
        setInfoTitle(value);
        setInfoTitleError(ValidationUtils.isEmpty(value));
        break;
      default:
        setInfoDesc(value);
    }
  }

  const handleSaveButton = () => {
    if (ValidationUtils.isEmpty(infoTitle)) {
      setInfoTitleError(true);
    }

    if (ValidationUtils.isNotEmpty(infoTitle)) {
      let data = infoDataArray;
      let body = {
        title: infoTitle,
        description: infoDesc,
      }
      data.push(body);
      setInfoDataArray([...data]);
      infoSectionRef.current.close();
      handleResetInfoData();
    }
  }



  const handleEditInfo = (index) => {
    setInfoIndex(index + 1);
    let data = infoDataArray.filter((item, i) => i === index);
    setInfoTitle(data[0].title);
    setInfoDesc(data[0].description);
    infoSectionRef.current.open();
  }

  const handleUpdateButton = () => {
    if (ValidationUtils.isEmpty(infoTitle)) {
      setInfoTitleError(true);
    }
    if (ValidationUtils.isNotEmpty(infoTitle)) {
      let body = {
        title: infoTitle,
        description: infoDesc
      }
      let data = infoDataArray.map((item, i) => i === infoIndex - 1 ? body : item);
      setInfoDataArray([...data]);
      infoSectionRef.current.close();
      handleResetInfoData();
    }
  }

  const handleDeleteInfo = (index) => {
    setInfoIndex(index + 1);
    deleteInfoRef.current.open();
    // let data = infoDataArray.filter((item, i) => i !== index);
    // setInfoDataArray([...data]);
  }

  const handleCloseDeletePopup = () => {
    deleteInfoRef.current.close();
    handleResetInfoData();
  }

  const handleYesButton = () => {
    let data = infoDataArray.filter((item, i) => i !== infoIndex - 1);
    setInfoDataArray([...data]);
    deleteInfoRef.current.close();
    handleResetInfoData();
  }


  const deletemg = (i) => {
    let deleteimgTemp = productImages;
    let newinputs = deleteimgTemp.filter((faculty, index) => faculty !== i);
    setProductImages([...newinputs])
  }
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])



  let getSeodata = {
    metaTitle: metaTitle,
    metaDescription: metaDescription,
    urlSlug: urlSlug
  }
  const handleContactRoutes = (value) => {
    setConditionForSeoPage(value)
  }
  return (
    <React.Fragment>
      {/* <Layout> */}
      <div className='e-commerce-container'>
        <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          <BreadcrumbItem to="/ecommerce/productList" title="Products" />
          <BreadcrumbItem to={`/ecommerce/editProduct/${id}`} title="Edit Product" />
        </Breadcrumb>
        <div className='top-button-section-wrap mb-25'>
          <h3 className='heading '>Product</h3>
          <div className='top-left-button-section'>
            <button className='button button-o-primary primary btn-oval btn-sm btn-primary-border ' onClick={() => { cancelHandler() }}>Cancel</button>
            {editProductState.loading ? (<button className='button button-primary btn-oval btn-sm' >Saving...</button>) : (<button className='button button-primary btn-oval btn-sm' onClick={() => { editProductHandler() }}>Save</button>)}
          </div>
        </div>
        <div className='addProduct-top-container'>
          <div className='add-product-left'>
            <div className='e-commerce-wrap'>
              <p className='e-commerce-card-para'>Product info</p>
              <hr className='horizontal-line' />
              <div className='product-info-wrap'>
                <div className='product-form-group '>

                  <div className="formFieldwrap width-65">
                    <p className='label-heading'>
                      Name
                    </p>
                    <FormInput
                      type="text"
                      onChange={handleInput}
                      id="name"
                      name="product_Name"
                      value={productName}
                      placeholder="Add Product Name"
                      maxLength="80"
                    />
                    <FormError
                      show={productNameError && infoError}
                      error="Name is required."
                    />
                  </div>

                  <div className="formFieldwrap ">
                    <p className='label-heading mb-8'>
                      Ribbon
                    </p>
                    <FormInput
                      type="text"
                      id="ribbon"
                      name="Ribbon"
                      onChange={handleInput}

                      value={productRibbon}
                      placeholder="e.g., New Arrival"
                      maxLength="80"
                    />
                    <FormError
                      show={false}
                      error="Invalid try again "
                    />
                  </div>
                </div>
                <div className=''>
                  <div className="formFieldwrap ">
                    <p className='label-heading'>
                      Description
                    </p>
                    {/* <FormTextArea
                      className="form-control"
                      id="description"
                      rows="3"
                      type="text"
                      name="description"
                      onChange={handleInput}

                      value={productDescription}
                      placeholder="Add description about the product"
                      style={{ whiteSpace: " pre-wrap" }}
                      maxLength="500"
                    // TextareaBtmTxt="500"
                    ></FormTextArea> */}
                    <TextEditor
                      preFilledData={productDescription}
                      currentResponse={(value) => handleOnChangeContent(value)}
                    />
                    <FormError
                      show={productDescriptionError && infoError}
                      error="Description is required."
                    />
                  </div>
                </div>

                <div className='product-info-gender'></div>
                <div className="formFieldwrap width-65">
                  <p className='label-heading'>
                    Product category
                  </p>
                  <CategoryDropDown position={'bottom'} setSelectedCategroy={(value) => setSelectedCategroy(value)} addProduct={true} editProductCategory={editProductCategory} />
                  <FormError
                    show={selectedCategroyError}
                    error="Quantity is required."
                    className="mt-5"
                  />
                  <p className='text-3xs w-400 gray mt-5'>You can add categories where this product will appear in for store visitor filtering. (You can add category from category tab)</p>

                </div>
                <label className='inline mark-feature'>
                  <FormInput
                    type="checkbox"

                  />
                  Use this category as default whenever adding a product
                </label>
              </div>
              <hr className='horizontal-line mt-5 mb-15' />
              <div>
                <div className='inline between-lg between-xs add-section-div align-center'>
                  <p className='text-xs w-400 base'>Additional Specification Section</p>
                  {infoDataArray?.length < 6 ?
                    <button className='button btn-o-primary primary  btn-3xs  ' onClick={handleAddSectionButton} >Add Section</button>
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
                                {/* <button className='button btn-3xs btn-o-gray'

                                    >
                                      <span className="cssIcon">

                                      </span>
                                    </button> */}
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

                <div>
                  <React.Fragment>
                    <Modals ref={infoSectionRef} Position="center" slide="top" ClosePopUp={() => closeModal()} ModalsSize="modal-s">
                      <ModalsHeader title={infoIndex ? 'Edit Specification Section' : 'Add Specification Section'} />
                      <ModalsBody>
                        <div className='discart-container'>
                          <div>
                            {/* <p className='text-xs w-400 base pT-15'>Info Title</p> */}
                            <p className='text-xs w-400 base'>Info Title</p>
                            <FormInput
                              className="mt-5 gray text-xxs w-400"
                              placeholder="e.g., Material or Shipping & Return Policy "
                              name="infoTitle"
                              value={infoTitle}
                              onChange={handleAddSectionInputs}
                            />
                            <FormError
                              show={infoTitleError}
                              error="Please enter info title."
                            />
                          </div>
                          <div>
                            <p className='text-xs w-400 base mt-25'>Description</p>
                            <FormTextArea
                              className="mt-5"
                              placeholder="Add description about the product additional information section."
                              name="infoDesc"
                              maxlength={120}
                              rows={5}
                              value={infoDesc}
                              onChange={handleAddSectionInputs}
                            />
                          </div>
                          {/* <p className='text-xs w-500 base'>Do you really want to discard all the changes ?</p> */}
                          <div className='discard-btn-wrapper '>
                            <button className='button btn-xs text-xs w-400 btn-oval btn-o-primary'
                              onClick={closeModalPopup}
                            >
                              Cancel
                            </button>
                            {infoIndex ?
                              <button className='button btn-xs text-xs w-400 btn-oval button-primary'
                                onClick={handleUpdateButton}
                              >
                                Update
                              </button>
                              :
                              <button className='button btn-xs text-xs w-400 btn-oval button-primary'
                                onClick={handleSaveButton}
                              >
                                Save
                              </button>
                            }

                          </div>
                        </div>
                      </ModalsBody>
                    </Modals>
                  </React.Fragment>
                </div>
                <div>
                  <React.Fragment>
                    <Modals ref={deleteInfoRef} Position="center" slide="top" ClosePopUp={() => closeModal()} ModalsSize="modal-s">
                      <ModalsHeader
                        className="deletepop-header"
                        title={'Delete this info section'} />
                      <ModalsBody>
                        <div className='discart-container'>
                          <p className='text-xs w-500 base'>The information section will get removed from your site.</p>
                          {/* <p className='text-xs w-500 base'>Do you really want to discard all the changes ?</p> */}
                          <div className='discard-btn-wrapper mt-35'>
                            <button className='button btn-sm btn-o-gray'
                              onClick={handleCloseDeletePopup}
                            >Cancel
                            </button>
                            <button className='button btn-sm button-red'
                              onClick={handleYesButton}
                            > Yes Delete
                            </button>
                          </div>
                        </div>
                      </ModalsBody>
                    </Modals>
                  </React.Fragment>
                </div>
                <div>
                </div>
              </div>
            </div>
            {/* // next section */}
            <div className='e-commerce-wrap sectionGap'>
              <p className='e-commerce-card-para'>Product Images & Videos</p>
              <hr className='horizontal-line' />
              {productImages && productImages.length === 0 && <div className='uploadwrap'>
                {/* <Cropper /> */}
                <button className='upload addImages' onClick={() => UploadModle()}>

                  <div className='upload-icons'>
                    <i className="Icon-gallery"></i>
                    {/* <span className='addText'>Add Images</span> */}
                    <Cropper
                      // minWidth={210}
                      // maxWidth={630}
                      minWidth={210}
                      maxWidth={210}
                      minHeight={280}
                      maxHeight={280}
                      ref={ref}
                      defaultRatio={3 / 4}
                      onUploaded={uploadThumbnail}
                      BtnName="Upload Image"
                      IconClassName="i-md gray"
                      BtnPropClass="button-o-silver button-block CropUploadBtn"
                    />
                  </div>
                </button>

              </div>}
              <div className="drag-gallery-wrapper">
                <div className="gallery-wrap">
                  {productImages && productImages.length > 0 && productImages.map((img, i) => {
                    return (
                      <div className='gallery_item' key={i}>
                        <img
                          className="gallery_img"
                          src={img}
                          alt={img}
                        />
                        <div className='gallery_item-overlay'>
                          <div className='gallery_item-btn-wrapper'>
                            <div className='gallery_item-circle'>
                              <img src={CrossImage} alt="" onClick={() => deletemg()} />
                            </div>
                            {/* <div className='gallery_item-circle'>
                              <img src={PencialImage} alt="" />
                            </div> */}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {productImages && productImages.length > 0 &&
                    <div className='gallery_item'>
                      <div className="image-drag" onClick={() => UploadModle()}>
                        <div className="dragbutton">
                          <span className="set__icon"><i className='icon-plus'>&#43;</i></span>

                          <Cropper
                            minWidth={210}
                            maxWidth={210}
                            minHeight={280}
                            maxHeight={280}
                            ref={ref}
                            defaultRatio={3 / 4}
                            onUploaded={uploadThumbnail}
                            BtnName=""
                            IconClassName=""
                            BtnPropClass="button-o-silver button-block CropUploadBtn"
                          />
                        </div>
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
            {/* pricing section */}
            <div className='e-commerce-wrap sectionGap'>
              <p className='e-commerce-card-para'>Pricing</p>
              <hr className='horizontal-line' />
              <div className='product-info-wrap'>
                <div className='pricing-price-input-wrap'>
                  <div className="formFieldwrap position-relative ecom-form-price">
                    <p className='label-heading mb-8'>
                      Price (<span>&#8377;</span>)
                    </p>
                    <FormInput
                      type="number"
                      // label="Ribbon"
                      id="price"
                      name="price"
                      onChange={handleInput}
                      min="0"
                      onWheel={(e) => e.target.blur()}
                      value={productPrice}
                      placeholder="₹"
                      maxLength="80"

                    />
                    <FormError
                      show={productPriceError && infoError}
                      error="Product Price is required."
                    />
                    <span className='ruppe-symbol'>&#8377;</span>
                  </div>
                  <div className="formFieldwrap ">
                    <p className='label-heading mb-8'>
                      Shipping Charges (<span>&#8377;</span>)
                    </p>
                    <FormInput
                      type="number"
                      // label="Ribbon"
                      id="price"
                      name="shippingCharges"
                      onChange={handleInput}

                      onWheel={(e) => e.target.blur()}
                      value={shippingCharges}
                      placeholder="₹"
                      maxLength="80"

                    />
                  </div>
                </div>
                <div className='pricing-discount-section'>
                  <CheckboxInput
                    label={"On Sale"}
                    LabelClass={"label-heading eComm-checkbox-center"}
                    className={"eComm-checkbox"}
                    checked={productSale}
                    onClick={() => { productSale ? setProductSale(false) : setProductSale(true) }}
                  />
                  {productSale && <div className='pricing-input-wrap'>
                    <div className='discount-lower-wrap'>
                      <div className=' position-relative'>
                        <div className="formFieldwrap position-relative ">
                          <p className='label-heading mb-8'>
                            Discount
                          </p>
                          <FormInput
                            type="number"
                            // label="Ribbon"
                            id="discount"
                            name="discount"
                            onChange={handleInput}
                            onWheel={(e) => e.target.blur()}
                            value={discountScheme ? productDiscountPercent : productDiscount}
                            placeholder="0"
                            maxLength="80"
                            className="discount-form-fieldwrap"
                            max="100"
                            min="0"
                          />
                        </div>
                        <div className='discount-lower-spans'>
                          <span onClick={() => setDiscountScheme(true)} className={`margin-right ${discountScheme ? 'percentage-span' : ''}`}>%</span>
                          {/* <span onClick={() => setDiscountScheme(false)} className={discountScheme ? '' : 'percentage-span'}>₹</span> */}
                        </div>
                      </div>
                    </div>
                    <div className="formFieldwrap position-relative ecom-form-price ">
                      <p className='label-heading mb-8'>
                        Sale Price(₹)
                      </p>
                      <FormInput
                        type="number"
                        // label="Ribbon"
                        id="sale-price"
                        name="productSale"
                        onChange={handleInput}
                        min="0"
                        onWheel={(e) => e.target.blur()}
                        value={productSalePrice}
                        placeholder="₹"
                        maxLength="8"
                      />
                      <span className='ruppe-symbol'>&#8377;</span>
                      <FormError
                        show={productSalePriceError && infoError}
                        error="Sale-Price is required."
                      />
                    </div>
                  </div>}
                </div>
                {/* cost of goods inputs */}
                <div className='goods-section'>
                  <div className='goods-section-wrap'>
                    <div className='formFieldwrap ecom-form-price'>
                      <div className='goods-section-label-wrap'>
                        <p className='label-heading label-heading-margin'>
                          Cost of Goods
                        </p>
                        <img src={IButton} alt="icon" title="The amount invested to produce and sell this product." />
                      </div>
                      <FormInput
                        type="number"
                        id="cost-of-goods"
                        name="costofgoods"
                        onChange={handleInput}
                        min="0"
                        onWheel={(e) => e.target.blur()}
                        value={productCost}
                        placeholder="₹"
                        maxLength="8"
                      />
                      <span className='ruppe-symbol'>&#8377;</span>
                      <FormError
                        show={productCostError && infoError}
                        error="Cost of goods is required."
                      />
                    </div>
                    <div className='formFieldwrap  ecom-form-price'>
                      <div className='goods-section-label-wrap'>
                        <span className='label-heading label-heading-margin'>
                          Profit
                        </span>
                        <img src={IButton} alt="icon" title='Product price after deducting the cost of goods.' />
                      </div>
                      <FormInput
                        type="number"
                        id="profit"
                        name="profit"
                        onWheel={(e) => e.target.blur()}
                        value={productProfit}
                        placeholder="₹"
                        maxLength="8"
                      />
                      <span className='ruppe-symbol'>&#8377;</span>
                      <FormError
                        show={productProfitError && infoError}
                        error="Profit is Required"
                      />
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
                  <div className='formFieldwrap '>
                    <div className='goods-section-label-wrap'>
                      <p className='label-heading label-heading-margin'>
                        SKU (Stock Keeping Unit)
                      </p>
                      <img src={IButton} alt="icon" title='Define a unique code for each product or variant that can be used to track the inventory or stock. SKU may consist of a combination of letters and numbers.' />
                    </div>
                    <FormInput
                      type="text"
                      id="sku"
                      name="sku"
                      value={productSKU}
                      placeholder=""
                      maxLength="80"
                      disabled={true}
                    />
                    <FormError
                      show={productSKUError && infoError}
                      error="SKU is required."
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
                      onChange={handleInput}
                      value={productBarcode}
                      placeholder=""
                      maxLength="8"
                    />
                  </div>
                </div>
                {/* <div className='inventory-check-quality-wrap'>
                  <CheckboxInput
                    label={"Best Seller"}
                    LabelClass={"label-heading eComm-checkbox-center"}
                    className={"eComm-checkbox"}
                    checked={bestSeller}
                    onClick={() => { bestSeller ? setBestSeller(false) : setBestSeller(true) }}
                  />
                  <CheckboxInput
                    label={"New Arrival"}
                    LabelClass={"label-heading eComm-checkbox-center"}
                    className={"eComm-checkbox"}
                    checked={newArrival}
                    onClick={() => { newArrival ? setNewArrival(false) : setNewArrival(true) }}
                  />
                  <CheckboxInput
                    label={"Track quantity"}
                    LabelClass={"label-heading eComm-checkbox-center"}
                    className={"eComm-checkbox"}
                    checked={productTrackQty}
                    onClick={() => { productTrackQty ? setProductTrackQty(false) : setProductTrackQty(true) }}
                  />
                  <CheckboxInput
                    label={"Continue selling when out of stock"}
                    LabelClass={"label-heading eComm-checkbox-center"}
                    className={"eComm-checkbox"}
                    checked={productSellOutOfStock}
                    onClick={() => { productSellOutOfStock ? setProductSellOutOfStock(false) : setProductSellOutOfStock(true) }}
                  />
                </div> */}
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
                      type="number"
                      // label="Ribbon"
                      id="sale-price"
                      name="salePriceice"
                      onChange={handleInput}

                      onWheel={(e) => e.target.blur()}
                      value={productAvailableQty}
                      placeholder="0"
                      maxLength="5"
                    />
                    <FormError
                      show={productAvailableQtyError && infoError}
                      error="Quantity is required."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* add size and quantity section */}

            <div className='e-commerce-wrap sectionGap'>
              <p className='add-varient-card-para '>Set size or color for this product</p>
              <div className='section-padding-left'>
                <CheckboxInput
                  label={"This product has options, like size or color"}
                  LabelClass={"label-heading eComm-checkbox-center"}
                  className={"eComm-checkbox"}
                  name="checkbox"
                  checked={productHasVariations}
                  onChange={handleInput}
                />
              </div>

              {productHasVariations &&
                <div>
                  {/* add another option map loop start here */}

                  {productVariations && productVariations.length > 0 && productVariations.map((variation, i) => {
                    return (variation.done ?
                      <div className='show-all-option-container'>
                        {/* option loop start here */}
                        <div>
                          <hr className='horizontal-line' />
                          <div className='show-all-option-wrap'>
                            <div className='show-all-inner-div'>
                              <p className='label-heading'>{variation.name}</p>
                              <button className='edit-btn' onClick={() => { changeDoneStatus(i, false) }}>Edit</button>
                            </div>
                            <div className='show-all-options-wrap'>
                              {/* options value loop start here */}
                              {variation && variation.value && variation.value.length > 0 && variation.value.map((val, j) => {
                                return <div className='options' key={j}>{val}</div>
                              })}
                              {/* options value loop start here */}
                            </div>
                          </div>
                        </div>
                        {/* options loop end here */}
                      </div>
                      :

                      < div className='addProduct-option-container' key={i}>
                        <hr className='horizontal-line' />

                        <div className='addProduct-option-wrap  section-padding-left  '>
                          <div className='addproduct-dropdown '>
                            <label className='label-heading'>
                              Option name
                            </label>
                            <div className='addProduct-align-diva'>
                              <select
                                name="ecommerce"
                                onChange={(e) => { changeVariationName(e, i) }}
                                value={variation.name}
                              >
                                <option value="">--Select Variation Name--</option>
                                {varFields && varFields.length > 0 && varFields.map((vl, i) => {
                                  return <option value={vl}>{vl}</option>
                                })}
                              </select>

                              <div ><img src={Delete} onClick={() => { deleteVariationHandler(i) }} className="addproduct-delete-icon" alt="delete icon" /></div>
                            </div>

                          </div>

                          <div className='addProduct-options-list-wrap'>
                            <label className='label-heading'>
                              Option values
                            </label>
                            <div className='addproduct-options-list'>
                              {/* options value loop display here */}
                              {variation && variation.value && variation.value.length > 0 && variation.value.map((v, j) => {
                                return (<React.Fragment key={j}>
                                  <div className='addProduct-options-div '>
                                    <div className='formFieldwrap width-100'>
                                      <FormInput
                                        type="text"
                                        id={j}
                                        name={v}
                                        value={v}
                                        placeholder=""
                                        maxLength="80"
                                        className=""
                                        onChange={(e) => { addNewVarValue(e.target.value, i, j, 'val') }}
                                      />
                                    </div>
                                    <img src={Delete} className="addproduct-delete-icon" alt="delete icon" onClick={() => { deleteVarValue(i, j) }} />
                                  </div>
                                </React.Fragment>);
                              })}

                              {/* add value button  */}
                              <button className='add-values-btn' onClick={() => { addNewVarValue('', i, '', 'add') }}>Add another value</button>
                              <button className='button button-o-silver btn-gray-border  btn-sm mt-15' onClick={() => { changeDoneStatus(i, true) }} >Done</button>
                            </div>
                          </div>
                        </div>
                      </div>)
                    // : null
                  })}

                  {/* when submit button clicked this screen appers */}
                  <div className='show-all-option-container'>

                  </div>
                  {/* add another option button */}
                  <div className='add-more-option-wrap'>
                    <hr className='horizental-line' />
                    <div className='add-more-btn-wrap section-padding-left '>
                      <button
                        className='add-another-option-btn'
                        onClick={() => { addNewVariationHandler() }}>
                        <span>
                          <i className='ed-icon icon-plus-add primary i-xs'></i>
                        </span>
                        <span className='capitalize'>{productVariations.length > 0 ? 'add another option' : 'add option'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              }

            </div>

            {/* varient after section */}

            {showVariationList && <div className='e-commerce-wrap sectionGap'>
              <div className='varients-after-top-section'>
                <p className='e-commerce-card-para'>Product Images & Videos</p>
              </div>

              <hr className='horizontal-line' />
              <div className='varients-after-wrap'>
                <div className='varients-after-topDropn-container'>
                  <div className="filter-item">
                    <p className='text-regf gray w-400'>select</p>
                    {productVariations.length > 0 && productVariations.map((v, i) => {
                      return (<EDropdown menuName={v.name} menuOptions={v.value} selectOption={(val) => { selectOptionHandler(val, v.name, i) }} />)
                    })}
                  </div>
                  <div className="action-item">
                    {mappedVariations && mappedVariations.length > 0 && mappedVariations.map((v, i) => {
                      return (
                        <div className='sidebar-edit-wrap'>
                          <img src={Delete} onClick={() => { deleteInputVar(i) }} className="addproduct-delete-icon" alt="delete icon" />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className='varients-after-product-table-container'>
                  <div className="gridListTable ">
                    <ul className="gridHeader padding-left-right height-20 mb-15">
                      <li className="col-2">
                        <CheckboxInput
                          label={""}
                          LabelClass={"label-heading eComm-checkbox-center"}
                          className={"eComm-checkbox"}
                          onClick={() => { changeVarSelectStatus(inputCheck, 'i', 'all') }}
                          value={inputCheck}
                          checked={inputCheck}
                        />
                      </li>
                      {
                        toggleBulkEditor() ?
                          <li className='col-12' >
                            <div className='varients-after-checked-container section-padding-right'>
                              <div><p className='text-regf w-500'>{countSelectedVar()} {countSelectedVar() === 1 ? 'item' : 'items'} selected</p></div>
                            </div>
                          </li>
                          :
                          <React.Fragment>
                            <li className="col-6 "> Varient</li>
                            <li className="col-4 "> Price</li>
                            <li className="col-4 ">Quantity</li>
                            <li className="col-4 ">SKU</li>
                          </React.Fragment>
                      }
                    </ul>

                    <hr className='horizontal-line' />
                    <div className='gridBody  varients-after-grid-body '>
                      <div className='gridRow varients-grid-row'>
                        {/* product details loop start */}
                        {mappedVariations && mappedVariations.length > 0 && mappedVariations.map((v, i) => {

                          return (showVariationHandler(v) ?
                            <ul className="topInfo" key={i} >
                              <li className='col-0'>
                                < CheckboxInput
                                  className={"eComm-checkbox"}
                                  value={v.selected}
                                  onClick={() => { changeVarSelectStatus(v.selected, i, 'one') }}
                                  checked={v.selected}
                                />
                              </li>
                              <li className="col col-6">
                                <div className='varient-table-col-container'>
                                  <div className='varient-product-wrap'>
                                    <div className='product-image-wraper-div'>
                                      <img src={v.productPicture[0] ? v.productPicture[0] : DefaultImage} alt="productImage" className='img-response' />
                                    </div>
                                    <div className='varient-p'>
                                      {productVariations && productVariations.length > 0 && productVariations.map((va, k) => {
                                        return (
                                          // <p className='mt-8'><span className='text-xxs primary w-500 '>{va.name} :</span> <span className='text-xxs primary w-500'>{v[va.name]}</span></p>
                                          <p className='mt-8' key={k} title={v[va.name.toLowerCase().split(" ").join("")]}> <span className='text-2xs w-500'>{v[va.name.toLowerCase().split(" ").join("")]}</span></p>
                                        );
                                      })}
                                    </div>
                                  </div>
                                </div>

                              </li>
                              <li className="col col-4">
                                <div className='formFieldwrap width-100'>
                                  <FormInput
                                    type="number"
                                    id=""
                                    name=""
                                    value={v.price}
                                    placeholder=""
                                    maxLength="80"
                                    className="inputPad"
                                    onChange={(e) => (changeInputVar(e.target.value, i, 'price'))}
                                    onWheel={(e) => e.target.blur()}
                                  />
                                  {/* <span className="currency_icon">&#8377;</span> */}
                                </div>

                              </li>
                              <li className="col col-4">
                                <div className='formFieldwrap width-100'>
                                  <FormInput
                                    type="number"
                                    id=""
                                    name=""
                                    value={v.stock}
                                    placeholder=""
                                    maxLength="80"
                                    className="inputPad"
                                    onChange={(e) => (changeInputVar(e.target.value, i, 'quantity'))}
                                    onWheel={(e) => e.target.blur()}
                                  />
                                </div>
                              </li>
                              <li className="col col-4">
                                <div className='formFieldwrap width-100'>
                                  <FormInput
                                    type="text"
                                    id=""
                                    name=""
                                    value={v.SKU}
                                    placeholder=""
                                    maxLength="80"
                                    className="inputPad"
                                  />
                                </div>
                              </li>

                            </ul>
                            : null);
                        })}
                        {/* product details loop end */}
                      </div>
                      {/* <div className='edit-sidebar-wrap'>
                        <div className='sidebar-edit-btn-container'>
                          {mappedVariations && mappedVariations.length > 0 && mappedVariations.map((v, i) => {
                            return (
                              <div className='sidebar-edit-wrap'>
                                <img src={Delete} onClick={() => { deleteInputVar(i) }} className="addproduct-delete-icon" alt="delete icon" />
                              </div>
                            );
                          })}

                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>}
            <div>
            </div>

          </div>
          <div className='add-product-left'>
            <SideBar
              COD={COD}
              storagedata={storageData}
              active={(v) => { setProductActive(v) }}
              collChosen={(ls) => { setProductColl([...ls]) }}
              showOnline={productShowOnline}
              changeShowOnline={(v) => { setProductShowOnline(v) }}
              catAction={(v) => { setCategory(v) }}
              subCatAction={(v) => { setvarsubcat(v) }}
              cashOnDelivery={(val) => { setCOD(val) }}
              activeStatus={productActive}
              selectedSubCat={subCategory}
              // subSubCatAction={(v) => { setSubSubCategory(v) }}
              // FormErrorShow={!subCategoryName && subCategoryNameError && infoError}
              edit={true}
              editId={id}
              getSeodata={getSeodata}
              editallSeoData={handleeditallSeoData}
              editProductHandler={editProductHandler}
              productDetail={productDetail}
              contactRoute={(val) => handleContactRoutes(val)}
            />


          </div>

        </div>
        <div className='bottom-left-button-section'>
          <button className='button button-o-primary primary btn-oval btn-sm btn-primary-border' onClick={() => { cancelHandler() }}>Cancel</button>
          {editProductState.loading ? (<button className='button button-primary btn-oval btn-sm' >Saving...</button>) : (<button className='button button-primary btn-oval btn-sm' onClick={() => { editProductHandler() }}>Save</button>)}
        </div>
      </div >
    </React.Fragment >
  )
}

export default EditProduct;