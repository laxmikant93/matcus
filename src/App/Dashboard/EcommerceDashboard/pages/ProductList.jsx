import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckboxInput from '../../../../Common/Form/CheckboxInput';
import FormInput from '../../../../Common/Form/FormInput';
import SearchControl from '../../../../Common/SearchControl';
import ProductImage from '../assets/images/Product_default.jpg'
import EDropdown from '../Component/EDropdown';
import ThreeDot from '../assets/icons/threeDot.svg'
import './orderList.scss';
import './productList.scss';
import EDropDownShowMore from '../Component/EDropDownShowMore';
import { useDetectOutsideClick } from '../../../../Common/DetectOutsideClick/useDetectOutsideClick';
import AppLink from '../../../../Common/AppLink';
import { addMultipleProductToCollCat, editMultiProduct, editProduct, getProductList, getProductListByCategory, getProductListByCategoryColl, getProductListBySortby, getProductListSearch, productDelete, resetGetProductList, resetSendCategoryDataToProductList, ResetSendUNCategoryDataToProductList, sendCategoryDataToProductList, sendUNCategoryDataToProductList, storeCurrentPage } from '../../../../store/actions/ecommerce/action/product';
import { useNavigate } from 'react-router-dom';
import { createAddProductCollection, createCollection, editMultiCollection, getAddProductCollectionList, getCollectionList, resetCreateAddProductCollection, resetGetCollectionList } from '../../../../store/actions/ecommerce/action/collection';
import NoDataAvailable from '../../../../Common/NoDataAvailable';
import UseOutsideClick from '../../../../Common/UseOutsideClick';
import DeleteConfirmPop from '../Component/DeleteConfirmPop/DeleteConfirmPop';
import Breadcrumb from '../../../../Common/Breadcrumb';
import BreadcrumbItem from '../../../../Common/Breadcrumb/BreadcrumbItem';
import Pagination from '../../../../Common/Pagination';
import { getAllCategoryList } from '../../../../store/actions/ecomAdmin';
import { useLocation, useParams } from 'react-router-dom';
import CrossIcon from '../assets/icons/cross.svg'
import ValidationUtils from '../../../../Classes/ValidationUtils';
import FormError from '../../../../Common/Form/FormError';
import refresh from '../assets/icons/icon-refresh.svg'
import SelectInput from '../../../../Common/Form/SelectInput';
import ValidationFile from '../../../../Classes/ValidationFile';
import { useOutsideClick } from 'rooks';
// import e from 'express';

const ProductList = () => {
  const dropdownRef = useRef(null);
  const dropRef = useRef(null)
  const child = useRef(false);
  const [checkBox, setCheckbox] = useState(false);
  const [productList, setProductList] = useState([]);
  // const [selectAll, setSelectAll] = useState(false);
  // const [selectList, setSelectList] = useState([]);
  const [selectedItem, setselectedItem] = useState(false);
  const [Visible, setVisibile] = useState(true);
  const [collList, setCollList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedColl, setSelectedColl] = useState([]);
  const [activeColor, setActiveColor] = useDetectOutsideClick(dropRef, false);
  const [productCount, setProductCount] = useState("");
  const location = useLocation();
  const [openDeletePop, setOpenDeletePop] = useState(-1);
  const [openDeleteAllPop, setOpenDeleteAllPop] = useState(false);
  const [threeDotsPopup, setThreeDotPopup] = useState(-1);
  let PageSize = 10;
  const [selectedInd, setSelectedInd] = useState('');
  const [collectionIds, setCollectionIds] = useState([])
  const { adminProductList } = useSelector((state) => state.productList);
  const { deleteProduct } = useSelector((state) => state.productList);
  const { adminCollectionList } = useSelector((state) => state.collectionList);
  // const [collectionList, setCollectionList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("")
  const [searchFind, setSearchFind] = useState(false)
  const [searchCategory, setSearchCategory] = useState("")
  const [searchCollection, setSearchCollection] = useState("")
  const [newCollName, setNewCollName] = useState('');
  const [collectionName, setCollectionName] = useState("")
  const [newCollNameError, setNewCollNameError] = useState(false);
  const [showCreateCollectionPop, setShowCreateCollectionPop] = useState(false)
  const [categoryLevel, setCategoryLevel] = useState("")
  const [category_id, setCategory_id] = useState("")
  const [checkboxes, setCheckboxes] = useState([]);

  const {
    user, editCurrentPage,
    getCategorylistSuccess,
    getCategorylistData,
    cCategoryDataFromCategoryPage,
    deleteLoading, deleteSuccss, postCollectionSuccess, postCollectionData, collectionList, collectionListSuccess, AddMultiProToCollSuccess } = useSelector((state) => {
      return {
        user: state.user,
        getCategorylistSuccess: state.ecomAdmin.list.success,
        getCategorylistData: state.ecomAdmin.list.data,
        getCategoryEditSuccess: state.ecomAdmin.edit.success,
        cCategoryDataFromCategoryPage: state.productList.getCategorydatafromCategoryPage.data,
        deleteLoading: state.productList.deleteProduct.loading,
        deleteSuccss: state.productList.deleteProduct.success,
        AddMultiProToCollSuccess: state.productList.addMultiProToColl.success,
        postCollectionSuccess: state.collectionList.createAddProductCollection.success,
        postCollectionData: state.collectionList.createAddProductCollection.data,
        collectionList: state.collectionList.addProductCollectionList.data,
        collectionListSuccess: state.collectionList.addProductCollectionList.success,
        editCurrentPage: state.productList.currentPage
      }
    })
  console.log(editCurrentPage, "jojjo")
  const [currentPage, setCurrentPage] = useState(editCurrentPage ? editCurrentPage : 1);
  const dispatch = useDispatch();
  const history = useNavigate();
  const [showDropDown, setShowDropDown] = useDetectOutsideClick(dropdownRef, false);
  // sort by drop down 
  const [showSortbyDropDown, setSortbyDropDown] = useDetectOutsideClick(dropdownRef, false);
  const [showDropColl, setShowDropColl] = useDetectOutsideClick(dropdownRef, false);
  const [showAdtoCategory, setShowAdtoCategory] = useDetectOutsideClick(dropdownRef, false);
  const [setVisibility, setSetVisibility] = useDetectOutsideClick(dropdownRef, false);
  const [closeOpenHeader, setCloseOpenHeader] = useState(false)
  const [getCollListAtApply, setGetCollListAtApply] = useState(false)
  const RemovePopToggleRef = useRef();

  useOutsideClick(RemovePopToggleRef, () => {
    if (threeDotsPopup !== -1) setThreeDotPopup(-1);

  });
  const [showForm, setShowForm] = useState(false)
  useEffect(() => {
    if (!cCategoryDataFromCategoryPage?.propData) {
      dispatch(getProductList(user.user_business, dataPrep("ALL", currentPage)))
    }
  }, []);

  useEffect(() => {
    if (editCurrentPage) {
      setCurrentPage(editCurrentPage);
    }
  }, [editCurrentPage])

  console.log(currentPage, "line no 122");

  useEffect(() => {
    if (adminProductList.success === true && (adminProductList.data?.productlength || adminProductList.data?.productlength === 0)) {
      setProductCount(adminProductList?.data?.productlength)
    }
  }, [adminProductList]);

  useEffect(() => {
    if (adminProductList.success === true && adminProductList.data && adminProductList.data.productlist?.length > 0) {
      let array = [];
      const arr = adminProductList.data.productlist.map((vl, i) => {
        let obj = { ...vl, selected: false, showPopup: false };
        return obj;
      });
      setProductList([...arr]);
    } else {
      setProductList([])
    }
  }, [adminProductList.data, adminProductList.success]);

  // const handleChange = (e, i) => {
  //   // setCheckbox(e.target.checked);
  //   let array = [...selectList];
  //   if (i === 'all') {
  //     let val = selectAll;
  //     val = val ? false : true;
  //     setSelectAll(val);
  //     let arr = [...productList];
  //     for (let v = 0; v < arr.length; v++) {
  //       arr[v].selected = val;
  //       if (val) {
  //         array.push(arr[v]._id);
  //       }
  //     }
  //     setProductList([...arr]);
  //   } else {
  //     let arr = [...productList];
  //     arr[i].selected = arr[i].selected ? false : true;
  //     setProductList([...arr]);
  //     let check = true;
  //     for (let v = 0; v < arr.length; v++) {
  //       if (arr[v].selected === false) {
  //         check = false;
  //       } else {
  //         array.push(arr[v]._id);
  //       }
  //     }
  //     setSelectAll(check);
  //   }
  //   array = [...new Set(array)];
  //   setSelectList([...array])

  // }

  const handleCheckboxes = (e, id) => {
    let array = checkboxes;
    let inputChecked = e.target.checked;
    if (inputChecked) {
      array.push(id);
    }
    else {
      let index = array.indexOf(id);
      array.splice(index, 1);
    }
    setCheckboxes([...array]);
  }
  console.log(checkboxes, "line no 192");

  const handleSelectAllCheckbox = (e) => {
    let array = productList;
    let inputChecked = e.target.checked;
    let data = array.map((item) => {
      return (
        item._id
    )
    })
    if (inputChecked) {
      setCheckboxes([...data]);
    }
    else {
      setCheckboxes([]);
    }
  }

  const changeProductStatusHandler = (val, prodId) => {

    const body = {
      product: {
        _id: prodId,
        productActive: val
      },
      variation: []
    };
    dispatch(editProduct(body, "product-variation-edit", user.user_business, prodId));
  };

  // const setVisibilityHandler = () => {
  //   dispatch(editMultiProduct(selectList, Visible));
  //   let arr = [...productList];
  //   for (let v = 0; v < arr.length; v++) {
  //     if (selectList.includes(arr[v]._id)) {
  //       arr[v].selected = Visible;
  //     }
  //   }
  //   setProductList([...arr]);
  //   setSetVisibility(!setVisibility);
  // }

  const handleShowSidebar = (id) => {
    setThreeDotPopup(threeDotsPopup === id ? -1 : id)
  };

  const handleOpenDeletePopUpForMulti = () => {
    // console.log("mainnn openn multi open")
    setOpenDeleteAllPop(!openDeleteAllPop);
  }
  const handleDeleteAllPopup = () => {
    setOpenDeleteAllPop(false);
    // setSelectAll(false)
    // selectList([])
    setCloseOpenHeader(true)
    // console.log("open 1 three dot")
  }

  const handleDeletepopup = (id, i) => {
    setSelectedInd(i);
    setOpenDeletePop(openDeletePop === id ? -1 : id);
    setThreeDotPopup(-1);
    // console.log("open three delete button")

  }

  const deleteProductHandler = (i, st) => {
    if (st === 'multi') {
      let arr = [...productList];
      for (let v = 0; v < arr.length; v++) {
        if (checkboxes.includes(arr[v]._id)) {
          let ind = arr.findIndex(ob => ob._id === arr[v]._id);
          arr.splice(ind, 1);
        }
      }
      setProductList([...arr]);
      dispatch(productDelete('product', [...checkboxes]));
      if (deleteProduct) {
        let array = ""
        // setSelectList([...array])
        setCheckboxes([...array])
      }
    } else {
      dispatch(productDelete('product', [productList[selectedInd]._id]));
      let arr = [...productList];
      arr.splice(i, 1);
      setProductList([...arr]);
    }
    setOpenDeleteAllPop(false);
    // setOpenDeletePop(false);
    // setSelectAll(false)

  };
  useEffect(() => {
    if (deleteSuccss) {
      dispatch(getProductList(user.user_business, dataPrep("ALL", 1)))
      // setOpenDeletePop(false);
    }
  }, [deleteSuccss])
  // const addToCollHandler = () => {
  //   dispatch(editMultiCollection({ prodList: selectList, collList: selectedColl }));
  //   setShowDropDown(!showDropDown)
  // };
  // dropdown of add collection dropdown
  const handleShowDropDown = (e) => {
    setShowDropDown(!showDropDown)
  }

  const handlePopupCollection = (e) => {
    setShowDropColl(!showDropColl)
  }
  const handleshowSortbyDropDown = (e) => {
    setSortbyDropDown(!showSortbyDropDown)
  }
  const handleAddtoCategory = (e) => {
    setShowAdtoCategory(!showAdtoCategory)
  }

  const handleShowSetVisibility = () => {
    setSetVisibility(!setVisibility)
  }
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  // useEffect(() => {
  //   if (adminCollectionList.success && adminCollectionList.data) {
  //     adminCollectionList.data.map((item) => {
  //       collectionList.push(item)
  //     })
  //     setCollectionList([...collectionList])
  //   } else {
  //     // setCollectionList([])
  //   }
  // }, [adminCollectionList])

  useEffect(() => {
    return () => {
      dispatch(resetGetProductList())
      // dispatch(resetGetCollectionList())
      setProductList([])
      setProductCount("")
      // setCollectionList([])
      dispatch(resetSendCategoryDataToProductList())
      dispatch(ResetSendUNCategoryDataToProductList())
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(getAllCategoryList(user.user_business))
  }, [dispatch, user.user_business])

  const handleCategorySearch = (e) => {
    setSearchCategory(e.target.value)
  }
  const handleCategorySearchReset = () => {
    setSearchCategory("")
    setCategoryFilter([{
      category_level: 0,
      _id: []
    }, {
      category_level: 1,
      _id: []
    },
    {
      category_level: 2,
      _id: []
    }])
    dispatch(getAllCategoryList(user.user_business))
    // dispatch(getProductList(user.user_business, dataPrep("ALL", 1)))

  }

  const [categoryFilter, setCategoryFilter] = useState([
    {
      category_level: 0,
      _id: []
    }, {
      category_level: 1,
      _id: []
    },
    {
      category_level: 2,
      _id: []
    }]
  );

  const handleCategoryFilters = (type, item) => {
    switch (type) {
      case 0:
        if (!categoryFilter[0]?._id.includes(item._id)) {
          let inputFields = categoryFilter
          inputFields[0]?._id.push(item._id)
          setCategoryFilter([...inputFields])
          return [...inputFields]
        } else {
          let inputFields = categoryFilter
          let index = inputFields[0]._id.indexOf(item)
          inputFields[0]?._id.splice(index, 1)
          setCategoryFilter([...inputFields])
          return [...inputFields]
        }

      case 1:
        if (!categoryFilter[1]?._id.includes(item._id)) {
          let inputFields = categoryFilter
          inputFields[1]?._id.push(item._id)
          setCategoryFilter([...inputFields])
          return [...inputFields]
        } else {
          let inputFields = categoryFilter
          let index = inputFields[1]._id.indexOf(item)
          inputFields[1]?._id.splice(index, 1)
          setCategoryFilter([...inputFields])
          return [...inputFields]
        }

      case 2:
        if (!categoryFilter[2]?._id.includes(item._id)) {
          let inputFields = categoryFilter
          inputFields[2]?._id.push(item._id)
          setCategoryFilter([...inputFields])
          return [...inputFields]
        } else {
          let inputFields = categoryFilter
          let index = inputFields[2]._id.indexOf(item)
          inputFields[2]?._id.splice(index, 1)
          setCategoryFilter([...inputFields])
          return [...inputFields]
        }

      default:
        break;
    }
  }

  const handleCollFilters = (e, item) => {
    let inputChecked = e.target.checked
    let array = collectionIds
    if (inputChecked) {
      array.push(item._id)
    } else {
      let index = array.indexOf(item._id)
      array.splice(index, 1)
    }
    setCollectionIds([...array])
  }
  // CATEGORY -COLLECTION APPLYYYYY FILTER
  const categoryCollApplyButton = (type) => {
    dispatch(getProductListByCategoryColl(user.user_business, dataPrep(type)))
    // console.log("CATEGORY -COLLECTION APPLYYYYY")
    setShowDropColl(false)
    setShowDropDown(false);
  }
  const [sortValue, setSortValue] = useState("")
  const [checkSort, setCheckSort] = useState(false)
  const handleSort = (value) => {
    let inputValue = value
    setSortValue(inputValue)
    switch (inputValue) {
      case "rto":
        setCheckSort(true)
        dispatch(getProductListBySortby(user.user_business, "rto", dataPrep("ALL", 1)))
        break;
      case "otr":
        setCheckSort(true)
        dispatch(getProductListBySortby(user.user_business, "otr", dataPrep("ALL", 1)))
        break;
      case "active":
        setCheckSort(true)
        dispatch(getProductListBySortby(user.user_business, "active", dataPrep("ALL", 1)))
        break;
      case "draft":
        setCheckSort(true)
        dispatch(getProductListBySortby(user.user_business, "draft", dataPrep("ALL", 1)))
        break;
      default:
        break;
    }
  }

  const handleCollectionSearch = (e) => {
    setSearchCollection(e.target.value)
  }
  const handleResetColl = () => {
    setSearchCollection("")
    setCollectionIds([])
  }

  const dataPrep = (type, page) => {
    if (type === "ALL") {
      return {
        limit: PageSize,
        skip: ((page - 1) * PageSize),
      }
    } else {
      if (type === "category" && categoryFilter[0]?._id.length > 0 && categoryFilter[1]?._id.length > 0 && categoryFilter[2]?._id.length > 0) {
        if (collectionIds.length > 0) {
          return {
            limit: PageSize,
            skip: ((currentPage - 1) * PageSize),
            collection: collectionIds,
            level: categoryFilter,
            products: checkboxes,
            unCategorized: unCategorized
          }
        } else {
          return {
            limit: PageSize,
            skip: ((currentPage - 1) * PageSize),
            level: categoryFilter,
            unCategorized: unCategorized
          }
        }
      } else {
        if (categoryFilter[0]?._id.length > 0 || categoryFilter[1]?._id.length > 0 || categoryFilter[2]?._id.length > 0) {
          return {
            limit: PageSize,
            skip: ((currentPage - 1) * PageSize),
            collection: collectionIds,
            level: categoryFilter,
            products: checkboxes,
            unCategorized: unCategorized
          }
        }
        else if (type === "Uncat") {
          return {
            limit: PageSize,
            // skip: ((currentPage - 1) * PageSize),
            skip: ((page - 1) * PageSize),
            unCategorized: unCategorized
          }
        } else {
          return {
            limit: PageSize,
            skip: ((currentPage - 1) * PageSize),
            collection: collectionIds,
            unCategorized: unCategorized
          }
        }
      }
    }

  }
  let typing;
  const handleSearchProduct = (evt) => {
    evt.preventDefault();
    // clearTimeout(typing);
    // typing = setTimeout(() => {
    setSearchTerm(evt.target.value);
    setCurrentPage(1)
    // }, 400);
    if (!evt.target.value) {
      dispatch(getProductList(user.user_business, dataPrep("ALL", 1)))
      clearTimeout(typing);
      setSearchTerm("");
      setCurrentPage(1)
    }
  };
  useEffect(() => {
    if (searchTerm) {
      dispatch(getProductListSearch(user.user_business, searchTerm, dataPrep("ALL", 1)))
    }
  }, [dispatch, searchTerm, user.user_business])
  const handleReset = () => {
    setSearchTerm("")
    dispatch(getProductList(user.user_business, dataPrep("ALL", 1)))
  }
  useEffect(() => {
    // dispatch(getCollectionList(user.user_business, 'id'));
    dispatch(getAddProductCollectionList(user.user_business, "id"))
    setGetCollListAtApply(false)
  }, [dispatch, user, getCollListAtApply]);

  const createPopupHandle = () => {
    setShowForm(true)
  }
  const handleClose = () => {
    setShowForm(false)
    setCollectionName("")
  }
  let collection = {
    businessShopId: user.user_business,
    collectionName: collectionName
  }
  const createCollHandler = () => {
    if (ValidationFile.isEmpty(collectionName)) {
      setNewCollNameError(true)
    }
    if (ValidationFile.isNotEmpty(collectionName)) {
      dispatch(createAddProductCollection(user.user_business, { collection: collection }, true))
    }
  }
  useEffect(() => {
    if (postCollectionSuccess) {
      setShowForm(false)
      let array = collectionIds
      if (postCollectionData.collActive === true) {
        array.push(postCollectionData?._id)
        setCollectionIds([...array])
      }
      setCollectionName("")
      dispatch(resetCreateAddProductCollection())
    }
  }, [collectionIds, dispatch, postCollectionData._id, postCollectionData.collActive, postCollectionSuccess])
 
  const addtoCategoryButton = () => {
    dispatch(addMultipleProductToCollCat("category", { products: checkboxes, category: categoryFilter }))
    setShowAdtoCategory(!showAdtoCategory)
    setCheckboxes([]);
    // setSelectAll(false)
    // setSelectList([])
    let arr = [...productList];
    for (let v = 0; v < arr.length; v++) {
      arr[v].selected = false;
    }
    setCategoryFilter([{
      category_level: 0,
      _id: []
    }, {
      category_level: 1,
      _id: []
    },
    {
      category_level: 2,
      _id: []
    }])

  }

  const addToCollHandlerButton = () => {
    dispatch(addMultipleProductToCollCat("collection", { products: checkboxes, collection: collectionIds }))
    setShowDropDown(!showDropDown)
    setCollectionName("")
    setCheckboxes([]);
    // setSelectList([])
    // setSelectAll(false)
    setGetCollListAtApply(true)
    let arr = [...productList];
    for (let v = 0; v < arr.length; v++) {
      arr[v].selected = false;
    }
    setCollectionIds([])

  }
  const [unCategorized, setUnCategorized] = useState(false)

  //USELOCATION GetProductlist-by cat id
  useEffect(() => {
    if (cCategoryDataFromCategoryPage?.propData && cCategoryDataFromCategoryPage?.propData?.uncategory === false) {
      let data = {
        limit: PageSize,
        skip: ((currentPage - 1) * PageSize),
        level: handleCategoryFilters(cCategoryDataFromCategoryPage.propData.category.category_level, cCategoryDataFromCategoryPage.propData.category),
      }
      dispatch(getProductListByCategoryColl(user.user_business, data))
    }
  }, [cCategoryDataFromCategoryPage])

  useEffect(() => {
    if (cCategoryDataFromCategoryPage?.propData && cCategoryDataFromCategoryPage?.propData?.uncategory === true) {
      // setUnCategorized(true)
      // let data = {
      //   unCategorized: true
      // }
      setUnCategorized(cCategoryDataFromCategoryPage?.propData?.uncategory)
      // dispatch(getProductListByCategoryColl(user.user_business, unCategorized))
      dispatch(getProductListByCategoryColl(user.user_business, { unCategorized: true }))
    }
  }, [cCategoryDataFromCategoryPage])

  const handleCheckUncategorized = (e) => {
    let inputChecked = e.target.checked
    if (inputChecked) {
      // dispatch(getProductListByCategoryColl(user.user_business, dataPrep("category")))
      setUnCategorized(true)
    } else {
      // dispatch(getProductListByCategoryColl(user.user_business, dataPrep("category")))
      setUnCategorized(false)
    }
  }
  const handleRefresh = () => {
    handleReset()
    // setSearchTerm("");
    setCurrentPage(1)
    setCategoryFilter([{
      category_level: 0,
      _id: []
    }, {
      category_level: 1,
      _id: []
    },
    {
      category_level: 2,
      _id: []
    }])
    setCollectionIds([])
    setSortValue("")
    setSearchCategory("")
    setSearchCollection("")
    // dispatch(getProductList(user.user_business, dataPrep("ALL", 1)))
  }
  const handlePagination = (page) => {
    // setSelectAll(false);
    if (collectionIds.length > 0) {
      dispatch(getProductList(user.user_business, dataPrep("collection")));
      setCurrentPage(page)
    } else if (categoryFilter[0]?._id.length > 0 || categoryFilter[1]?._id.length > 0 || categoryFilter[2]?._id.length > 0) {
      dispatch(getProductList(user.user_business, dataPrep("category")));
      setCurrentPage(page)
    } else if (searchTerm) {
      // console.log("pagin serach 3");
      setCurrentPage(page)
      dispatch(getProductListSearch(user.user_business, searchTerm, dataPrep("ALL", page)))
    } else if (unCategorized) {
      dispatch(getProductList(user.user_business, dataPrep("Uncat", page)))
      setCurrentPage(page)
    }
    else {
      dispatch(getProductList(user.user_business, dataPrep("ALL", page)));
      setCurrentPage(page)
    }
  }

  const handleChildParent = (selector, link) => {
    if (selector === 'child') {
      child.current = true;
    } else {
      if (!child.current) {
        history(link);
        dispatch(storeCurrentPage(currentPage));
      }
      child.current = false;
    }
  }

  const handleEditButton = (id) => {
    history(`/editProduct/${id}`);
    dispatch(storeCurrentPage(currentPage));
  }

  useEffect(() => {
    return () => {
      setProductList([])
    }
  }, [])
  return (
    <React.Fragment>
      <div className='dashBoard-home-container' >
        <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          <BreadcrumbItem to="/ecommerce/productList" title="Products" />
        </Breadcrumb>
        <div className='orderList-wrapper productList-wrapper'>
          <div className='oderList-top-div-wrapper'>
            <div className='orderList-top-left'>
              <span className=''>Products</span> <span className='count'>
                {(productCount <= 10 ? productCount : productCount - (currentPage * 10) < 0 ? `${productCount}/ ${productCount}` : `${currentPage * 10}/ ${productCount}`)}
              </span>
            </div>
            <div className='orderList-top-right'>
              {/* <button className=''> </button> */}
              {/* <AppLink to="/ecommerce/bulkupload" className="btn-text-blue export-btn btn-2xs">Bulk Upload</AppLink>
              <button className='btn-text-blue btn-2xs '> Import CSV</button> */}


              <AppLink to="/createProduct" className='button button-primary add-new-product-btn btn-xs ' >Add New Product </AppLink>
            </div>
          </div>
          <div className='orderList-div mt-25'>
            <div className='orderList-checkbox-list product-list-top-wrapper'>
              <div className=' product-select-wrapper-checkbox '>
                <CheckboxInput
                  // label={'Select All'}
                  LabelClass={"label-heading eComm-checkbox-center label-heading-margin"}
                  className={"eComm-checkbox"}
                  onChange={handleSelectAllCheckbox}
                  // onChange={() => { handleChange('', 'all') }}
                  checked={productList?.length && checkboxes.length && checkboxes.length === productList.length}
                />
                {
                  checkboxes.length > 0 ?
                    <p><span >{checkboxes.length}</span><span className='checkbox-selected' >Selected</span></p>
                    : <p>Select All</p>
                }
              </div>
              {/* default view  */}
              <div className='product-list-right-after'  >
                {
                  checkboxes.length > 0 ? (
                    (
                      <React.Fragment>
                        <div className='add-to-Collection-wrapper'>
                          <button className='btn-text-blue' onClick={handleAddtoCategory}>Add to Category</button>
                          {
                            showAdtoCategory ? (
                              <EDropDownShowMore >
                                <div className='showmore-container-div' ref={dropdownRef}>
                                  <div className="headerItem add-collection-searchbar headerSearchBar ">
                                    <SearchControl
                                      placeholder="Search..."
                                      onChange={handleCategorySearch}
                                      // onKeyUp={handleSearch}
                                      reset={() => handleCategorySearchReset()}
                                    />
                                  </div>
                                  <div className='showmore-checkbox-container-wrapper '>
                                    <div className='showmore-checkbox-container '>
                                      {getCategorylistSuccess && getCategorylistData.data.length > 0 ? getCategorylistData.data.filter((category) => {
                                        if (searchCategory === "") {
                                          return category;
                                        } else if (
                                          category.categoryName.toLowerCase()
                                            .includes(searchCategory.toLowerCase())
                                        ) {
                                          return category;
                                        }
                                      }).map((item, key) => {
                                        return (
                                          <React.Fragment>
                                            <div className='showmore-checkbox-wrapper ' key={key}>
                                              <CheckboxInput
                                                label={item.categoryName}
                                                multiLoop={true}
                                                value={item._id}
                                                LabelClass={"label-heading eComm-checkbox-center label-heading-margin"}
                                                className={"eComm-checkbox"}
                                                checked={categoryFilter[0]?._id.includes(item._id)}
                                                onChange={(e) => handleCategoryFilters(item.category_level, item)}
                                              />

                                            </div>
                                            {item.subcategories?.length > 0 ? item.subcategories.map((subItem, subkey) => {
                                              return (
                                                <React.Fragment key={subkey}>
                                                  <div className='showmore-checkbox-wrapper' key={key}>
                                                    <CheckboxInput
                                                      label={`${item.categoryName} > ${subItem.subCategoryName}`}
                                                      multiLoop={true}
                                                      value={subItem._id}
                                                      LabelClass={"label-heading eComm-checkbox-center label-heading-margin"}
                                                      className={"eComm-checkbox"}
                                                      checked={categoryFilter[1]?._id.includes(subItem._id)}
                                                      onChange={() => handleCategoryFilters(subItem.category_level, subItem)}
                                                    />

                                                  </div>
                                                  {subItem.subsubcategories?.length > 0 ? subItem.subsubcategories.map((subSubItem, subSubKey) => {
                                                    return (
                                                      <React.Fragment key={subSubKey}>
                                                        <div className='showmore-checkbox-wrapper' key={key}>
                                                          <CheckboxInput
                                                            label={`${item.categoryName} > ${subItem.subCategoryName} > ${subSubItem.subSubCategoryName}`}
                                                            multiLoop={true}
                                                            value={subSubItem._id}
                                                            LabelClass={"label-heading eComm-checkbox-center label-heading-margin"}
                                                            className={"eComm-checkbox"}
                                                            checked={categoryFilter[2]?._id.includes(subSubItem._id)}
                                                            onChange={(e) => handleCategoryFilters(subSubItem.category_level, subSubItem)}
                                                          />
                                                        </div>
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
                                      <div className='showmore-checkbox-wrapper' >
                                        <CheckboxInput
                                          label="Uncategorized"
                                          // multiLoop={true}
                                          value={unCategorized}
                                          LabelClass={"label-heading eComm-checkbox-center label-heading-margin"}
                                          className={"eComm-checkbox"}
                                          checked={unCategorized}
                                          onChange={(e) => handleCheckUncategorized(e)}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className='dropdown-btn-wrapper'>
                                  <button className='button button-primary btn-block apply-button  btn-oval text-right mt-10 btn-2xs text-xxs' onClick={() => { addtoCategoryButton() }}>Apply</button>
                                </div>
                              </EDropDownShowMore>
                            ) : ''
                          }

                        </div>
                        <div className='add-to-Collection-wrapper'>
                          <button className='btn-text-blue' onClick={handleShowDropDown}>Add to Collection</button>
                          {
                            showDropDown ? (
                              <EDropDownShowMore >
                                <div className='showmore-container-div dropdown-right-padding' ref={dropdownRef}>
                                  <div className="headerItem add-collection-searchbar headerSearchBar">
                                    <SearchControl
                                      value={searchCollection}
                                      placeholder="Search..."
                                      onChange={handleCollectionSearch}
                                      reset={() => handleResetColl()}
                                    />
                                  </div>
                                  <div className='mt-20 collection-cheqbox-wrapper'>
                                  </div>
                                  <div className='showmore-checkbox-container '>
                                    {collectionListSuccess &&
                                      collectionList && collectionList.length > 0 && collectionList.filter((collection) => {
                                        if (searchCollection === "") {
                                          return collection;
                                        } else if (collection.collectionName.toLowerCase()
                                          .includes(searchCollection.toLowerCase())
                                        ) {
                                          return collection;
                                        }
                                      }).map((item, i) => {
                                        return (
                                          <div className='showmore-checkbox-wrapper' key={i}>
                                            < CheckboxInput
                                              label={item.collectionName}
                                              value={item._id}
                                              LabelClass={"label-heading eComm-checkbox-center label-heading-margin"}
                                              className={"eComm-checkbox"}
                                              checked={collectionIds.includes(item._id)}
                                              onClick={(e) => { handleCollFilters(e, item) }}
                                            />
                                            <span className='text-regf w-400'>{item.productCount}</span>
                                          </div>)
                                      })}
                                    {/* {!showForm && */}
                                    <button className='btn-text-blue button-xs mt-20' onClick={() => setShowForm(true)} > <i className='ed-icon icon-plus-add primary i-xs'></i> Create Collection</button>
                                    {/* } */}
                                    {showForm ?
                                      <>
                                        <div className='inline between-lg between-xs create-collection-wrapper-item '>
                                          <CheckboxInput
                                            label={""}
                                            LabelClass={"label-heading eComm-checkbox-center"}
                                            className={"eComm-checkbox"}
                                          />
                                          <div>
                                            <FormInput
                                              className="create-collection-input-box"
                                              type="text"
                                              // label="name"
                                              id="name"
                                              name="add-collection"
                                              value={collectionName}
                                              placeholder=""
                                              maxLength="80"
                                              onChange={(e) => { setCollectionName(e.target.value) }}
                                            />
                                          </div>


                                          <div className='collection-btn-wrap'>
                                            <button className='delete-div' onClick={() => handleClose()}>
                                              <img src={CrossIcon} alt="cross icon" />
                                            </button>
                                            {/* onClick={() => { createCollHandler() }} */}
                                            <button className='delete-div' onClick={() => { createCollHandler() }}>
                                              <i className='ed-check '></i>
                                            </button>
                                          </div>
                                        </div>
                                        <FormError
                                          show={newCollNameError}
                                          error="Collection name is required."
                                        />
                                      </>
                                      : ""
                                    }
                                    {/* <div className='inline between-lg between-xs create-collection-wrapper-item '>
                                      <input type="checkbox" />
                                      <input className='create-collection-input-box' type="text" />
                                      <div className='delete-div '> <img className='mt-8' src={CrossIcon} alt="cross icon" /></div>
                                      <div className='check-div '> <i className='ed-check mt-5'></i> </div>
                                    </div> */}
                                  </div>
                                </div>
                                <div className='dropdown-btn-wrapper'>
                                  <button className='button button-primary btn-block apply-button  btn-oval text-right mt-10 btn-2xs text-xxs' onClick={() => { addToCollHandlerButton() }}>Apply</button>
                                </div>
                              </EDropDownShowMore>
                            ) : ''
                          }
                        </div>
                        {/* <button className='btn-text-blue btn-export'>Export</button> */}
                        <i className="ed-icon icon-delete primary i-xs" onClick={() => { handleOpenDeletePopUpForMulti() }}></i>
                        {openDeleteAllPop && <DeleteConfirmPop index={''} handleAcceptPopup={handleDeleteAllPopup} deleteVarHandler={deleteProductHandler} loading={deleteLoading} />}
                      </React.Fragment>
                    )
                  ) : (

                    <div className='product-select-wrapper '>
                      <div className='add-to-Collection-wrapper'>
                        <button onClick={handleRefresh} title="Refresh" className="refresh-btn">
                          {/* <img src={refresh} alt="" width="18px" /> */}
                          Clear All
                        </button>
                        <button className="color-black btn-drop-round category-button " onClick={handleShowDropDown}>  Categories </button>
                        {
                          showDropDown ? (
                            <EDropDownShowMore >
                              <div className='showmore-container-div dropdown-right-padding' ref={dropdownRef}>
                                <div className="headerItem add-collection-searchbar headerSearchBar ">
                                  <SearchControl
                                    value={searchCategory}
                                    placeholder="Search..."
                                    onChange={handleCategorySearch}
                                    // onKeyUp={handleSearch}
                                    reset={() => handleCategorySearchReset()}
                                  />
                                </div>
                                <div className='showmore-checkbox-container-wrapper '>
                                  <div className='showmore-checkbox-container '>
                                    {getCategorylistSuccess && getCategorylistData?.data.length > 0 ? getCategorylistData?.data.filter((category) => {
                                      if (searchCategory === "") {
                                        return category;
                                      } else if (
                                        category.categoryName.toLowerCase()
                                          .includes(searchCategory.toLowerCase())
                                      ) {
                                        return category;
                                      }
                                    }).map((item, key) => {
                                      return (
                                        <React.Fragment>
                                          <div className='showmore-checkbox-wrapper ' key={key}>
                                            <CheckboxInput
                                              label={item.categoryName}
                                              multiLoop={true}
                                              value={item._id}
                                              LabelClass={"label-heading eComm-checkbox-center label-heading-margin"}
                                              className={"eComm-checkbox"}
                                              checked={categoryFilter[0]?._id.includes(item._id)}
                                              onChange={(e) => handleCategoryFilters(item.category_level, item)}
                                            />

                                          </div>
                                          {item.subcategories?.length > 0 ? item.subcategories.map((subItem, subkey) => {
                                            return (
                                              <React.Fragment key={subkey}>
                                                <div className='showmore-checkbox-wrapper' key={key}>
                                                  <CheckboxInput
                                                    label={`${item.categoryName} > ${subItem.subCategoryName}`}
                                                    multiLoop={true}
                                                    value={subItem._id}
                                                    LabelClass={"label-heading eComm-checkbox-center label-heading-margin"}
                                                    className={"eComm-checkbox"}
                                                    checked={categoryFilter[1]?._id.includes(subItem._id)}
                                                    onChange={() => handleCategoryFilters(subItem.category_level, subItem)}
                                                  />

                                                </div>
                                                {subItem.subsubcategories?.length > 0 ? subItem.subsubcategories.map((subSubItem, subSubKey) => {
                                                  return (
                                                    <React.Fragment key={subSubKey}>
                                                      <div className='showmore-checkbox-wrapper' key={key}>
                                                        <CheckboxInput
                                                          label={`${item.categoryName} > ${subItem.subCategoryName} > ${subSubItem.subSubCategoryName}`}
                                                          multiLoop={true}
                                                          value={subSubItem._id}
                                                          LabelClass={"label-heading eComm-checkbox-center label-heading-margin"}
                                                          className={"eComm-checkbox"}
                                                          checked={categoryFilter[2]?._id.includes(subSubItem._id)}
                                                          onChange={(e) => handleCategoryFilters(subSubItem.category_level, subSubItem)}
                                                        />

                                                      </div>
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
                                    <div className='showmore-checkbox-wrapper'>
                                      <CheckboxInput
                                        label="Uncategorized"
                                        // multiLoop={true}
                                        value={unCategorized}
                                        LabelClass={"label-heading eComm-checkbox-center label-heading-margin"}
                                        className={"eComm-checkbox"}
                                        onChange={(e) => handleCheckUncategorized(e)}
                                        checked={unCategorized}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='dropdown-btn-wrapper'>
                                <button className='button button-primary btn-block apply-button  btn-oval text-right mt-10 btn-2xs text-xxs' onClick={() => { categoryCollApplyButton("category") }}>Apply</button>
                              </div>
                            </EDropDownShowMore>
                          ) : ''
                        }
                      </div>
                      <div className='add-to-Collection-wrapper'>
                        <button className="color-black btn-drop-round category-button" onClick={handlePopupCollection}> Collection </button>
                        {
                          showDropColl ? (
                            <EDropDownShowMore >
                              <div className='showmore-container-div ' ref={dropdownRef}>
                                <div className="headerItem add-collection-searchbar headerSearchBar">
                                  <SearchControl
                                    placeholder="Search..."
                                    value={searchCollection}
                                    onChange={handleCollectionSearch}
                                    // onKeyUp={handleSearch}
                                    reset={() => handleResetColl()}
                                  />
                                </div>

                                <div className='showmore-checkbox-container '>
                                  {collectionList && collectionList.length > 0 ? collectionList.filter((collection) => {
                                    if (searchCollection === "") {
                                      return collection;
                                    } else if (
                                      collection.collectionName.toLowerCase()
                                        .includes(searchCollection.toLowerCase())
                                    ) {
                                      return collection;
                                    }
                                  }
                                  ).map((item, key) => {
                                    return (
                                      <React.Fragment>
                                        <div className='showmore-checkbox-wrapper' key={key}>
                                          <CheckboxInput
                                            label={item.collectionName}
                                            // multiLoop={true}
                                            value={item._id}
                                            LabelClass={"label-heading eComm-checkbox-center label-heading-margin"}
                                            className={"eComm-checkbox"}
                                            checked={collectionIds.includes(item._id)}
                                            onChange={(e) => handleCollFilters(e, item)}
                                          />
                                          <span className='text-regf w-400'>{item.productCount}</span>
                                        </div>

                                      </React.Fragment>
                                    )
                                  }) : ("")
                                  }
                                </div>

                              </div>
                              <div className='dropdown-btn-wrapper'>
                                <button className='button button-primary btn-block apply-button btn-block  btn-oval text-right mt-10 btn-2xs text-xxs' onClick={() => { categoryCollApplyButton() }}>Apply</button>
                              </div>
                            </EDropDownShowMore>
                          ) : ''
                        }
                      </div>
                      <div className=' sort-by-wraper'>
                        <button className='color-black btn-drop-round category-button ' onClick={handleshowSortbyDropDown} > Sort by</button>
                        {
                          showSortbyDropDown ? (
                            <EDropDownShowMore >
                              {/* <div className=' dropdown-right-padding' > */}
                              <div className='sort-by-popup-dropdown' ref={dropdownRef}>
                                <div className='inline sort-by-option-item'>

                                  <i className={`ed-icon  primary icon-tick ${checkSort && sortValue === "rto" ? 'show-icon-tick' : ''}`}></i>
                                  <p className=' sort-by-option' onClick={() => handleSort("rto")}>Products : (Latest)</p>
                                </div>
                                <div className='inline  sort-by-option-item mt-10'>

                                  <i className={`ed-icon  primary icon-tick ${checkSort && sortValue === "otr" ? 'show-icon-tick' : ''}`} ></i>
                                  <p className=' sort-by-option  base w-400 ' onClick={() => handleSort("otr")}>Products : (Oldest)</p>
                                </div>
                                <div className='inline sort-by-option-item mt-10'>

                                  <i className={`ed-icon  primary icon-tick ${checkSort && sortValue === "active" ? 'show-icon-tick' : ''}`} ></i>
                                  <p className='sort-by-option  base w-400 ' onClick={() => handleSort("active")}>Status : (Active)</p>
                                </div>
                                <div className='inline sort-by-option-item mt-10 '>
                                  <i className={`ed-icon  primary icon-tick ${checkSort && sortValue === "draft" ? 'show-icon-tick' : ''}`} ></i>
                                  <p className=' sort-by-option  base w-400 ' onClick={() => handleSort("draft")}>Status : (Draft)</p>
                                </div>
                              </div>

                              {/* </div> */}
                            </EDropDownShowMore>
                          ) : ''
                        }
                      </div>
                      {/* <div className='collection-wapper-div'>
                        <select
                          id="profession_cat"
                         
                          className="color-black btn-drop-round filter-select"
                          name="filterBy"
                          value={sortValue}
                          required
                        >
                          <option value="All" className="option active ">
                            Sort by
                          </option>
                          <option className="option active" value="rto">Products : (Latest)</option>
                          <option className="option active" value="otr">Products : (Oldest) </option>
                          <option className="option active" value="Active">Status : (Active) </option>
                          <option className="option active" value="Draft">Status : (Draft)</option>
                        </select>
                      </div> */}
                      <div className="headerItem headerSearchBar productlist-searchbar">
                        <SearchControl
                          classNameWrappper="tableSearchbar"
                          id="search"
                          onChange={handleSearchProduct}
                          reset={() => handleReset()}
                          name="search"
                          value={searchTerm}
                          placeholder={"Search..."}
                        />
                      </div>
                    </div>
                  )

                }
              </div>
              {/* when user click on checkbox */}
            </div>
            <div className={`oderList-table-wrapper product ${productList.length > 0 ? 'hideMinheight' : ''}`}>
              <table>
                <thead>
                  <tr className='product-tr-list'>
                    <th> &nbsp;</th>
                    <th> &nbsp;</th>
                    <th className='uppercase'>Name</th>
                    {/* <th className='uppercase'>SKU</th> */}
                    <th className='uppercase'>INVENTORY</th>
                    <th className='uppercase'>Status</th>
                    <th className=''></th>
                  </tr>
                </thead>
                <tbody>
                  <React.Fragment>
                    {
                      adminProductList.success ?
                        productList && productList.length > 0 ?
                          productList
                            .map((op, i) => {
                              return (

                                <React.Fragment key={i} >
                                  <tr onClick={() => { handleChildParent('parent', `/editProduct/${op._id}`) }} className={` product-list-td-wrapper cursor-pointer ${checkBox ? 'tr-bg-color' : ''} ${activeColor ? "tr-bg-color" : ""}`}>
                                    <td style={{ paddingRight: '0px' }}>
                                      <div className='order-list-th-cheqbox order-list-th-wrapper' onClick={() => { handleChildParent('child', `link`) }}>
                                        <CheckboxInput
                                          // label={"Continue selling when out of stock"}
                                          // LabelClass={"label-heading eComm-checkbox-center"}
                                          className={"eComm-checkbox"}
                                          onChange={(e) => handleCheckboxes(e, op._id)}
                                          checked={checkboxes.includes(op._id)}
                                        />
                                      </div>
                                    </td>
                                    <td style={{ paddingRight: '0px' }}>
                                      {/* <AppLink to={`/ecommerce/editProduct/${op._id}`}> */}
                                      <div className='order-list-th-wrapper' >
                                        <div className='product-image-wraper-div'>
                                          <img src={op.productPicture && op.productPicture.length > 0 ? op.productPicture[0] : ProductImage} alt="productImage" />
                                        </div>
                                      </div>
                                      {/* </AppLink> */}
                                    </td>
                                    <td>
                                      {/* <AppLink to={`/editProduct/${op._id}`}> */}
                                      <div className='order-list-th-wrapper'>
                                        <p className='text-xxs gray w-400'>{op.productName}</p>
                                      </div>
                                      {/* </AppLink> */}
                                    </td>
                                    {/* <td >
                                      <div className='order-list-th-wrapper'>
                                        <p className='text-xs w-400'>122112311323434</p>
                                      </div>
                                    </td> */}
                                    <td data-label="Select all">
                                      {/* <AppLink to={`/editProduct/${op._id}`}> */}
                                      <div className='order-list-th-wrapper'>
                                        {
                                          op.defaultVariation ?
                                            <p className='text-xxs base w-400'> {op?.stock} in stock </p> :
                                            <p className='text-xxs base w-400'> {op?.stock} in stock for {op?.Totalvariation} variants </p>
                                        }
                                        {/* <p className='text-xxs base w-400'> {op.variations.reduce((t, v) => t + v.stock, 0)} in stock for {op.variations.length} variants </p> */}
                                      </div>
                                      {/* </AppLink> */}
                                    </td>
                                    <td data-label="Select all">
                                      {/* <div className='order-list-th-wrapper ' onClick={() => { handleChildParent('child', `/editProduct/${op._id}`) }}> */}
                                      {/* when prodcut is is active add 'green' class and otherwise add 'red' class below */}
                                      {/* <p className={`text-xs w-400 green`}>{op.productActive ? 'Active' : 'Inactive'}</p> */}
                                      {/* <select
                                          id="weightSelect"
                                          defaultValue={op.productActive}
                                          onChange={(e) => { changeProductStatusHandler(e.target.value, op._id) }}
                                        >
                                          <option className=' text-2xs w-400 secondaryL' value="active">Active</option>
                                          <option className=' text-2xs w-400 ' value="draft">Draft</option>
                                        </select> */}
                                      {/* </div> */}
                                      <div className='product-shipped-dropdown-wrapper' onClick={() => { handleChildParent('child', `/editProduct/${op._id}`) }}>

                                        <SelectInput
                                          defaultValue={op.productActive}
                                          onChange={(e) => { changeProductStatusHandler(e.target.value, op._id) }}>
                                          <option className=' text-2xs w-400 ' value="active">Active</option>
                                          <option className=' text-2xs w-400 draft-state ' value="draft">Draft</option>
                                        </SelectInput>

                                      </div>
                                    </td>
                                    <td className='td-three-dot'>
                                      <div className='three-dot-imge-div' onClick={() => { handleChildParent('child', `/editProduct/${op._id}`) }}>
                                        <img src={ThreeDot} alt="dot icon" className='product-three-dot-img' onClick={() => { handleShowSidebar(op._id) }} />
                                        {/* <i className="ed-icon icon-delete base i-xs icons-delete" onClick={() => { handleAcceptPopup(i) }} ></i> */}
                                        {
                                          threeDotsPopup === op._id ? (
                                            <div className='threedot-wapper' ref={RemovePopToggleRef}>
                                              <button onClick={() => handleEditButton(op._id)} className='btn-text-blue mt-5 ' >Edit</button>
                                              <hr className='product-list-hr' />
                                              <button className='btn-text-blue red' onClick={() => { handleDeletepopup(op._id, i) }}>Delete</button>

                                            </div>) : ""
                                        }
                                      </div>

                                    </td>
                                  </tr>

                                  {openDeletePop === op._id &&

                                    <DeleteConfirmPop index={selectedInd} loading={deleteLoading} handleAcceptPopup={handleDeletepopup} deleteVarHandler={() => { deleteProductHandler(selectedInd, 'change') }} />
                                  }
                                </React.Fragment>
                              )
                            }) : <NoDataAvailable title="No records found." />
                        : <div className="loadingGridData"><i className="ed-loadingGrid"></i></div>
                    }
                  </React.Fragment>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* <div className='orderList-top-right'> */}
        {/* <button className='btn-text-blue export-btn btn-sm '> Export CSV</button>
              <button className='btn-text-blue btn-sm '> Import CSV</button> */}
        {/* </div> */}

        <div className='inline between-lg between-xs align-center pagination-wrapper '>
          {/* <div className='inline align-center show-product-div  '>
            <p className='gray text-xs w-500'>Show products on a page</p>
            <div className='show-product-div-count'>15</div>
          </div> */}
          <div className='orderList-top-right'>
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={productCount}
              pageSize={PageSize}
              onPageChange={(page) => handlePagination(page)}
            />
          </div>
        </div>

      </div>
    </React.Fragment >
  )
}

export default ProductList