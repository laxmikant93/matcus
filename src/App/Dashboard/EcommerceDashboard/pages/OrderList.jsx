import moment from 'moment';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import AppLink from '../../../../Common/AppLink';
import Breadcrumb from '../../../../Common/Breadcrumb';
import BreadcrumbItem from '../../../../Common/Breadcrumb/BreadcrumbItem';
import CheckboxInput from '../../../../Common/Form/CheckboxInput';
import FormInput from '../../../../Common/Form/FormInput';
import InputDatePicker from '../../../../Common/Form/InputDatePicker';
import Lightbox from '../../../../Common/Lightbox';
import LightBoxHeader from '../../../../Common/Lightbox/LightBoxHeader';
import LightBoxContent from '../../../../Common/Lightbox/LightBoxContent';
import NoDataAvailable from '../../../../Common/NoDataAvailable';
import SearchControl from '../../../../Common/SearchControl';
import { getOrderList, changeOrderStatus, getOrderListByStatus, getOrderListbySearch, getOrderListbyDate, resetAdminOrderList, getOrderListSortBy } from '../../../../store/actions/ecommerce/action/cartOrder';
import ProductImage from '../assets/icons/productImage.png'
import EDropdown from '../Component/EDropdown';
import './orderList.scss';
import Invoice from './Invoice/Invoice';
import Pagination from '../../../../Common/Pagination';
import { getProductListBySortby } from '../../../../store/actions/ecommerce/action/product';
import EDropDownShowMore from '../Component/EDropDownShowMore';
import { useDetectOutsideClick } from '../../../../Common/DetectOutsideClick/useDetectOutsideClick';
import SelectInput from '../../../../Common/Form/SelectInput';

const OrderList = () => {
  const dropdownRef = useRef(null);
  const [SortbyRef, SetSortbyRef] = useDetectOutsideClick(dropdownRef, false)
  const HandleshowSortbyRef = () => {
    SetSortbyRef(!SortbyRef)
  }
  // const handleAddtoCategory = (e) => {
  //   setShowAdtoCategory(!showAdtoCategory)
  // }
  // const [showAdtoCategory, setShowAdtoCategory] = useDetectOutsideClick(dropdownRef, false);
  const [checkBox, setCheckbox] = useState(false);
  const [status, setStatus] = useState('All');
  const [orderList, setOrderList] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const adminOrderList = useSelector((state) => state.orderCartList.adminOrderList);
  const user = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const [productCount, setProductCount] = useState(0);
  let PageSize = 10;

  const dispatch = useDispatch();
  const history = useNavigate();
  const { id, state } = useParams();
  // console.log(id, state, "id, state ")
  // useEffect(() => {
  //   dispatch(getOrderList(user.user_business, PageSize, currentPage));
  // }, [PageSize, currentPage, dispatch, user.user_business]);
  const [sortValue, setSortValue] = useState("")
  const [checkSort, setCheckSort] = useState(false)

  const handleSort = (value) => {
    let inputValue = value
    setStartDate("")
    setEndDate("")
    setSearchTerm("")
    setStatus("All")
    setSortValue(inputValue)
    setCurrentPage(1)
    switch (inputValue) {
      case "rto":
        setCheckSort(true)
        if (id && state === "customerOrder") {
          dispatch(getOrderListSortBy(user.user_business, "rto", PageSize, 1, id))
        } else {
          dispatch(getOrderListSortBy(user.user_business, "rto", PageSize, 1, ""))
        }
        break;
      case "otr":
        setCheckSort(true)
        if (id && state === "customerOrder") {
          dispatch(getOrderListSortBy(user.user_business, "otr", PageSize, 1, id))
        } else {
          dispatch(getOrderListSortBy(user.user_business, "otr", PageSize, 1, ""))
        }
        break;
      case "htl":
        setCheckSort(true)
        if (id && state === "customerOrder") {
          dispatch(getOrderListSortBy(user.user_business, "htl", PageSize, 1, id))
        } else {
          dispatch(getOrderListSortBy(user.user_business, "htl", PageSize, 1, ""))
        }
        break;
      case "itemMaxToMin":
        setCheckSort(true)
        if (id && state === "customerOrder") {
          dispatch(getOrderListSortBy(user.user_business, "itemMaxToMin", PageSize, 1, id))
        } else {
          dispatch(getOrderListSortBy(user.user_business, "itemMaxToMin", PageSize, 1, ""))
        }
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    return () => {
      dispatch(resetAdminOrderList())
    }
  }, [])
  // useEffect(() => {
  //   if (state === "customerOrder") {
  //     if (adminOrderList?.data?.orderInfo) {
  //       let data = adminOrderList.data.orderInfo;
  //       let filterdata = data.filter((item) => item?.userId?._id === id);
  //       setOrderList([...filterdata]);
  //       setProductCount(filterdata.length);
  //     }
  //   }
  // }, [state, adminOrderList, id])

  // useEffect(() => {
  //   if (user && user.user_business_business_shop_category.length === 0) {
  //     history('/ecommerce/businessInfo');
  //   }
  // }, [history, user]);

  useEffect(() => {
    // if (state === "OrderList") {
    if (adminOrderList.success === true && adminOrderList.data && adminOrderList.data.orderInfo) {

      let arr = adminOrderList.data.orderInfo.map((vl, i) => {
        return { ...vl, selected: false };
      });
      setOrderList([...arr]);
    }
    // }
  }, [adminOrderList.success, adminOrderList])

  // useEffect(() => {
  //   if (state === "OrderList") {
  //     if (adminOrderList.success === true && adminOrderList.data && adminOrderList.data.orderInfo) {

  //       let arr = adminOrderList.data.orderInfo.filter((vl, i) => {

  //         return { selected: false };

  //       });
  //       setOrderList([...arr]);
  //     }
  //   }

  // }, [adminOrderList.success, state, adminOrderList])
  // const loop = [1, 2, 3, 4, 5, 6, 7, 8, 1, 1, 1];

  // const handleChange = (i) => {
  //   // setCheckbox(e.target.checked);
  //   let arr = [...orderList];
  //   arr[i].selected = arr[i].selected ? false : true;
  //   setOrderList([...arr]);
  // }

  // const deliveryStatusHandler = (val, ind, id) => {
  //   let arr = orderList;
  //   arr[ind].Status = val;
  //   setOrderList([...arr]);
  //   const data = {
  //     status: "edit order",
  //     orderId: id,
  //     Status: val
  //   };

  //   dispatch(changeOrderStatus(data, user.user_business_business_subdomain));
  //   // window.location.reload();
  // };


  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleStatus = (value) => {
    setStatus(value)
    setSearchTerm("")
    setStartDate("")
    setEndDate("")
    setSortValue("")
  }

  useEffect(() => {
    switch (status) {
      case "All":
        if (!searchTerm && !sortValue && !startDate && !endDate) {
          if (id && state === "customerOrder") {
            // console.log("All hit id && state", id, state)
            dispatch(getOrderList(user.user_business, PageSize, currentPage, id));
            setOrderList([])
          } else {
            // console.log("main All !idddddddddddddddddddddddddddd")
            dispatch(getOrderList(user.user_business, PageSize, currentPage, ""));
            setOrderList([])
          }
        }
        break;
      case "Placed":
        if (id && state === "customerOrder") {
          dispatch(getOrderListByStatus(user.user_business, status, PageSize, currentPage, id));
          setOrderList([])
        } else {
          dispatch(getOrderListByStatus(user.user_business, status, PageSize, currentPage, ""));
          setOrderList([])
        }
        break;
      case "Shipped":
        if (id && state === "customerOrder") {
          dispatch(getOrderListByStatus(user.user_business, status, PageSize, currentPage, id));
          setOrderList([])
        } else {
          dispatch(getOrderListByStatus(user.user_business, status, PageSize, currentPage, ""));
          setOrderList([])
        }
        break;
      case "Delivered":
        if (id && state === "customerOrder") {
          dispatch(getOrderListByStatus(user.user_business, status, PageSize, currentPage, id));
          setOrderList([])
        } else {
          dispatch(getOrderListByStatus(user.user_business, status, PageSize, currentPage, ""));
          setOrderList([])
        }
        break;
      case "Failed":
        if (id && state === "customerOrder") {
          dispatch(getOrderListByStatus(user.user_business, status, PageSize, currentPage, id));
          setOrderList([])
        } else {
          dispatch(getOrderListByStatus(user.user_business, status, PageSize, currentPage, ""));
          setOrderList([])
        }
        break;
      case "PartiallyFulfilled":
        if (id && state === "customerOrder") {
          dispatch(getOrderListByStatus(user.user_business, status, PageSize, currentPage, id));
          setOrderList([])
        } else {
          dispatch(getOrderListByStatus(user.user_business, status, PageSize, currentPage, ""));
          setOrderList([])
        }
        break;
      default:
      // dispatch(getOrderList(user.user_business, PageSize, currentPage));
    }
  }, [status, PageSize, dispatch, currentPage, user.user_business])
  useEffect(() => {
    setCurrentPage(1)
  }, [status])
  let typing;
  const searchInputHandel = (evt) => {
    // evt.preventDefault();
    // clearTimeout(typing);
    // typing = setTimeout(() => {
    setSearchTerm(evt.target.value);
    // }, 400);
    setStartDate("")
    setEndDate("")
    if (!evt.target.value || evt.target.value === "") {
      setStatus("All")
      clearTimeout(typing);
      // console.log("!evt search")
      if (id && state === "customerOrder") {
        dispatch(getOrderList(user.user_business, PageSize, currentPage, id));
      } else {
        dispatch(getOrderList(user.user_business, PageSize, currentPage, ""));
      }
    }
  };
  useEffect(() => {
    if (searchTerm) {
      // console.log("searchTerm hit 1")
      setStatus("All")
      setCurrentPage(1)
      if (id && state === "customerOrder") {
        dispatch(getOrderListbySearch(user.user_business, searchTerm, PageSize, 1, id));
      } else {
        dispatch(getOrderListbySearch(user.user_business, searchTerm, PageSize, 1, ""));
      }
      setOrderList([])
    }
  }, [PageSize, dispatch, searchTerm, user.user_business]);

  const handleSearchTermReset = () => {
    setSearchTerm("")
    setCurrentPage(1)
    if (id && state === "customerOrder") {
      dispatch(getOrderList(user.user_business, PageSize, currentPage, id));

    } else {
      dispatch(getOrderList(user.user_business, PageSize, currentPage, ""));
    }
  }
  useEffect(() => {
    if (startDate && endDate) {
      setSearchTerm("")
      setSortValue("")
      setStatus("All")
      if (id && state === "customerOrder") {
        // console.log("hitt 1 s e datae")
        dispatch(getOrderListbyDate(user.user_business, moment(startDate).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"), moment(endDate).format("YYYY-MM-DDT23:mm:ss.SSS[Z]"), PageSize, 1, id))
      } else {
        dispatch(getOrderListbyDate(user.user_business, moment(startDate).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"), moment(endDate).format("YYYY-MM-DDT23:mm:ss.SSS[Z]"), PageSize, 1, ""))
      }
      setCurrentPage(1)
    }
  }, [dispatch, endDate, startDate, user.user_business])

  //Invoice Download Popup
  const InvoiceDownload = useRef(null);
  const closeModal = () => {
    // InvoiceDownload.current.close()
  }
  //Close Invoice Download Popup
  const [orderDetails, setOrderDetails] = useState("")
  const handleInvoice = (op) => {
    setOrderDetails(op)
    InvoiceDownload.current.open()
  }
  const handleDownloadInvoice = () => {
    window.print();
  }

  useEffect(() => {
    if (adminOrderList.success && adminOrderList.data && adminOrderList.data) {
      setProductCount(adminOrderList.data.productCount)
    }
  }, [adminOrderList.data, adminOrderList.success, adminOrderList, state, currentPage])
  // console.log(orderList, "orderList")
  // console.log(adminOrderList, "adminOrderList,")
  // console.log(currentPage, "currentPage")
  // console.log(sortValue, "sortValue")
  // console.log(status, "status")
  // console.log(productCount, "productCount")
  const handlepagination = (page) => {
    setCurrentPage(page)
    if (id && state === "customerOrder" && startDate && endDate && status === "All") {
      // console.log("if id hai")
      dispatch(getOrderListbyDate(user.user_business, moment(startDate).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"), moment(endDate).format("YYYY-MM-DDT23:mm:ss.SSS[Z]"), PageSize, page, id))
      setCurrentPage(page)
    } else if (startDate && endDate) {
      // console.log(" startDate datee", "else", "")
      dispatch(getOrderListbyDate(user.user_business, moment(startDate).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"), moment(endDate).format("YYYY-MM-DDT23:mm:ss.SSS[Z]"), PageSize, page, ""))
      setCurrentPage(page)
    }
    if (searchTerm && status === "All") {
      setCurrentPage(page)
      dispatch(getOrderListbySearch(user.user_business, searchTerm, PageSize, page))
    } else if (id && state === "customerOrder" && searchTerm && status === "All") {
      setCurrentPage(page)
      dispatch(getOrderListbySearch(user.user_business, searchTerm, PageSize, page))
    }
    if (sortValue && status === "All") {
      // console.log("sortValue && status===ALL", sortValue, status)
      setCurrentPage(page)
      dispatch(getOrderListSortBy(user.user_business, sortValue, PageSize, page, ""))
    } else if (id && state === "customerOrder" && sortValue) {
      // console.log("sortt hit page 2 ", id)
      setCurrentPage(page)
      dispatch(getOrderListSortBy(user.user_business, sortValue, PageSize, page, id))
    }

  }

  return (
    <React.Fragment>
     {
      adminOrderList.success &&adminOrderList.data&&
      <div className='dashBoard-home-container' >
        <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          <BreadcrumbItem to="/ecommerce/orderList/:id/OrderList/" title="Orders" />
        </Breadcrumb>
        <div className='orderList-wrapper'>
          <div className='oderList-top-div-wrapper'>
            <div className='orderList-top-left'>
              <span className=''>Orders</span>
              <span className='count'>
                {(productCount <= 10 ? productCount : productCount - (currentPage * 10) < 0 ? `${productCount}/ ${productCount}` : `${currentPage * 10}/ ${productCount}`)}
              </span>
            </div>
            <div className='product-list-right-after'  >
              <div className="datePickerWrap orderList-date">
                <InputDatePicker
                  name="startDate"
                  type="date"
                  value={startDate}
                  onSelect={(selectedDate) => setStartDate(selectedDate, "startDate")}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  placeholder={'DD-MM-YYYY'}
                />
              </div>
              <span className="text-xxs w-400 gray">to</span>
              <div className="datePickerWrap  orderList-date">
                <InputDatePicker
                  name="Custom_Date"
                  type="date"
                  // selected={endDate}
                  value={endDate}
                  onSelect={(selectedDate) => setEndDate(selectedDate, "endDate")}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  placeholder={'DD-MM-YYYY'}
                />
              </div>
            </div>
            {/* <div className='orderList-top-left'>
              <button className='btn-text-blue button-sm '> Export CSV</button>
              <button className='btn-text-blue button-sm '> Import CSV</button>
            </div> */}
          </div>

          <div className='orderList-div mt-25'>
            {/* <div className='orderList-checkbox-list'>
              < CheckboxInput
                // label={'Select All'}
                LabelClass={"label-heading eComm-checkbox-center label-heading-margin"}
                className={"eComm-checkbox"}
                // onChange={() => handleChange('all')}
                checked={checkBox}
              />
              {
                checkBox ?
                  <p><span >1</span><span className='checkbox-selected' >Selected</span></p>
                  : <p>Select All</p>
              }

            </div> */}
            {/* <div className='orderList-table-container'>
              <div className="gridListTable ">
                <ul className="gridHeader  order-grid-header">
                  <li className="col col-0" > &nbsp; </li>
                  <li className="col col-4  uppercase"> &nbsp; </li>
                  <li className="col col-4  uppercase"> Name</li>
                  <li className="col col-4  uppercase"> Price</li>
                  <li className="col col-4  uppercase">Status</li>
                  <li className="col col-4  uppercase">Oder Id</li>
                  <li className="col col-4 uppercase"> QUANTITY</li>
                  <li className="col col-4  uppercase">SKU</li>
                </ul>
                <div className='gridBody orderList-gridBody'>
                  <div className='gridRow orderList-grid-row'>

                    <ul className="topInfo orderList-topInfo">
                      <li className='col-0'>
                        < CheckboxInput
                          // label={"Continue selling when out of stock"}
                          // LabelClass={"label-heading eComm-checkbox-center"}
                          className={"eComm-checkbox"}
                        />
                      </li>
                      <li className="col col-4">
                        <div className='product-image-wraper-div'>
                          <img src={ProductImage} alt="productImage" />
                        </div>
                      </li>
                      <li className="col col-4">
                        <p className='text-regf w-500'>Roadster Tshirt</p>
                        <p className='text-xs w-400 gray'> Black/Small</p>
                      </li>
                      <li className="col col-4">
                        <p><span>&#36;</span> <span className='text-xs w-400'>150</span></p>
                      </li>
                      <li className="col col-4">
                        <p className='text-xs w-400'>Deliverd</p>
                      </li>
                      <li className="col col-4">
                        <p className='text-xs w-400'> #12211-23113-23</p>
                      </li>
                      <li className="col col-4">
                        <p className='text-xs w-400'>234</p>
                      </li>
                      <li className="col col-4">
                        <p className='text-xs w-400'> 122112311323434</p>
                      </li>
                    </ul>

                    
                  </div>

                </div>
              </div>
            </div>  */}
            <div className='orderList-checkbox-list orderList-justify product-list-top-wrapper'>
              <div className='product-select-wrapper'>
                <div className='tab-btn-div'>
                  <button className={`btn-status ${status === 'All' ? 'btn-tab-active' : ''}`} onClick={() => handleStatus("All")}>
                    All
                  </button>
                  <button className={`btn-status ${status === 'Placed' ? 'btn-tab-active' : ''}`} onClick={() => handleStatus("Placed")} >Processing</button>
                  <button className={`btn-status ${status === 'Shipped' ? 'btn-tab-active' : ''}`} onClick={() => handleStatus("Shipped")} >Shipped</button>
                  <button className={`btn-status ${status === 'Delivered' ? 'btn-tab-active' : ''}`} onClick={() => handleStatus("Delivered")} >Delivered</button>
                  <button className={`btn-status ${status === 'Failed' ? 'btn-tab-active' : ''}`} onClick={() => handleStatus("Failed")} >Failed</button>
                  <button className={`btn-status ${status === 'PartiallyFulfilled' ? 'btn-tab-active' : ''}`} onClick={() => handleStatus("PartiallyFulfilled")} >Partially Fulfilled</button>
                </div>
              </div>
              <div className='inline orderlist-dropdown-searchbar-wrapper '>
                {/* <button className='orderlist-sortby-btn'><p>Sort by</p><span className='sortby-dropdown-icon'></span></button> */}
                {/* <div className='orderlist-shipped-dropdown-wrapper'>
                  <SelectInput>
                    <option value="">Sort by</option>
                    <option value="">Date : ( Latest )</option>
                    <option value="">Date : ( Oldest )</option>
                    <option value="">Price : (High to low)</option>
                    <option value="">Items : (Max to Min)</option>

                  </SelectInput>

                </div> */}

                <div className='sort-by-wraper' ref={dropdownRef}>
                  {/* <button className='color-black btn-drop-round category-button' onClick={() => HandleshowSortbyRef()}>Sort by</button> */}
                  <i className='ed-icon  base icon-soryBy' onClick={() => HandleshowSortbyRef()} title={'Sort By'}></i>
                  {SortbyRef ?
                    (<EDropDownShowMore>
                      <div className='sort-by-popup-dropdown' ref={dropdownRef} >
                        <div className='inline sort-by-option-item'>

                          <i className={`ed-icon  primary icon-tick ${checkSort && sortValue === "rto" ? 'show-icon-tick' : ''}`} ></i>
                          <p className=' sort-by-option' onClick={() => handleSort("rto")} >Date : ( Latest )</p>
                        </div>
                        <div className='inline  sort-by-option-item mt-10'>

                          <i className={`ed-icon  primary icon-tick ${checkSort && sortValue === "otr" ? 'show-icon-tick' : ''}`} ></i>
                          <p className=' sort-by-option  base w-400 ' onClick={() => handleSort("otr")}>Date : ( Oldest )</p>
                        </div>
                        <div className='inline sort-by-option-item mt-10'>

                          <i className={`ed-icon  primary icon-tick ${checkSort && sortValue === "htl" ? 'show-icon-tick' : ''}`} ></i>
                          <p className='sort-by-option  base w-400 ' onClick={() => handleSort("htl")} >Price : (High to low)</p>
                        </div>
                        <div className='inline sort-by-option-item mt-10 '>

                          <i className={`ed-icon  primary icon-tick ${checkSort && sortValue === "itemMaxToMin" ? 'show-icon-tick' : ''}`} ></i>
                          <p className=' sort-by-option  base w-400 ' onClick={() => handleSort("itemMaxToMin")} >Items : (Max to Min)</p>
                        </div>
                      </div>
                    </EDropDownShowMore>) : ""
                  }
                </div>

                <div className='product-list-right-after orderList-searchbar'  >
                  <SearchControl
                    classNameWrappper="tableSearchbar"
                    id="search"
                    onChange={searchInputHandel}
                    onKeyUp={searchInputHandel}
                    value={searchTerm}
                    // reset={() => setSearchTerm("")}
                    name="search"
                    placeholder={"Search..."}
                    reset={() => handleSearchTermReset()}
                  />
                </div>
              </div>

            </div>
            <div className={`oderList-table-wrapper ${orderList.length > 0 ? 'hideMinheight' : ''}`}>
              <table>
                <thead>
                  <tr>
                    <th className='uppercase' style={{ width: '25%', }}>ORDER ID</th>
                    <th className='uppercase' style={{ minWidth: '180px' }}>PURCHASE DATE</th>
                    <th className='uppercase' style={{ width: '30%' }}>STATUS</th>
                    <th className='uppercase' style={{ width: '20%' }}>BUYER’S NAME</th>
                    <th className='uppercase' style={{ width: '12%' }}>PRICE</th>
                    <th className='uppercase' style={{ width: '5%' }}>Items</th>
                    <th className='uppercase' style={{ width: '3%' }}> Invoices </th>
                  </tr>
                </thead>
                <tbody>
                  <React.Fragment>

                    {adminOrderList.success ?
                      orderList && orderList.length > 0 ? orderList.map((op, i) => {
                        return (
                          <React.Fragment key={i}>
                            <tr className={`${checkBox ? 'tr-bg-color' : ''}`}>
                              {/* <td> */}
                              {/* <div className='order-list-th-wrapper'>
                                  <CheckboxInput
                                    // label={"Continue selling when out of stock"}
                                    // LabelClass={"label-heading eComm-checkbox-center"}
                                    className={"eComm-checkbox"}
                                    onChange={() => handleChange(i)}
                                    checked={op.selected}
                                  />
                                </div> */}
                              {/* </td> */}
                              {/* <td>
                                <div className='order-list-th-wrapper'>
                                  <div className='product-image-wraper-div'>
                                    <img src={ProductImage} alt="productImage" />
                                  </div>
                                </div>
                              </td> */}
                              <td data-label="Purchaase date">


                                <div className='order-list-th-wrapper'>
                                  <AppLink to={`/ecommerce/orderDetails/${op?._id}`}>
                                    <p className='text-xxs w-400 primary'>{op.order_id && op?.order_id.substring(0, 15)}...</p>
                                  </AppLink>
                                </div>
                              </td>
                              <td data-label="order Id">
                                <div className='order-list-th-wrapper'>
                                  {/* <p className='text-xs w-400'>April 2,2022</p> */}
                                  <p className='text-xxs w-400'>{op.createdAt.substring(0, 10)}</p>
                                </div>
                              </td>
                              <td >
                                <div className='order-list-th-wrapper '>
                                  {op?.failedCount > 0 && op?.deliverCount > 0 ?
                                    <>
                                      <div className={`status-wrapper status-delivered`}>
                                        <div className='status-dot'></div>
                                        <div className='status-text'>
                                          {/* <p className='text-xxs w-00 base'>{op.Status}</p> */}

                                          <p className='text-xxs w-00 base'>Deliver ({op?.deliverCount})</p>

                                        </div>
                                      </div>
                                      <div className={`status-wrapper status-failed mt-8`}>
                                        <div className='status-dot'></div>
                                        <div className='status-text'>
                                          {/* <p className='text-xxs w-00 base'>{op.Status}</p> */}

                                          <p className='text-xxs w-00 base'>Failed ({op?.failedCount})</p>

                                        </div>
                                      </div>
                                    </> :

                                    <div className={`status-wrapper ${op.Status === 'Shipped' ? 'status-shipped'
                                      : op.Status === 'Placed' ? 'status-processing'
                                        : op.Status === 'Delivered' ? 'status-delivered'
                                          : op.Status === 'Rejected' ? 'status-failed'
                                            : op.Status === 'Failed' ? 'status-failed' : op.Status === 'PartiallyFulfilled' ? 'status-partially' : ''}`}>
                                      <div className='status-dot'></div>
                                      <div className='status-text'>
                                        {op?.Status === 'Placed' && op?.isAccept ? <p className='text-2xs w-00 base'>Processing</p> : <p className='text-2xs w-00 base'>{op?.Status}</p>
                                        }
                                      </div>
                                    </div>}
                                  {/* <select
                                    id="list"
                                    // name="blood_group"
                                    // defaultValue={"Pending"}

                                    value={op.Status}
                                    onChange={(e) => { deliveryStatusHandler(e.target.value, i, op._id) }}
                                    disabled={op.Status === "Delivered"}
                                  >
                                    <option value="Pending">Order Placed</option>
                                    <option value="Pending">Processing</option>
                                    <option value="Pending">Shipped</option>
                                    <option value="Delivered">Failed</option>
                                    <option value="Delivered">Delivered</option>

                                    * <option>Unknown</option> *
                                  </select> */}
                                  {/* <p className='text-xs w-400'>{op.Status}</p> */}
                                </div>
                              </td>
                              <td data-label="buryer name">
                                <div className='order-list-th-wrapper'>
                                  <p className='text-xxs w-400 capitalize'>{op?.userId?.fullname}</p>

                                </div>
                              </td>
                              <td data-label="price">
                                <div className='order-list-th-wrapper'>
                                  <p className='text-xxs w-400 white-space'><span>&#8377;</span>{op.orderTotal}</p>
                                </div>
                              </td>
                              <td data-label="items">
                                <div className='order-list-th-wrapper'>
                                  <p className='text-xxs w-400'>{op.orderProduct ? op.orderProduct.length : ""}</p>
                                </div>
                              </td>
                              <td data-label="Select all" style={{ textAlign: 'center' }}>
                                {/* <button type="button" className="button">Invoice</button> */}
                                <div className='invoice-wrapper'>
                                  <div className='invoice-circle' onClick={() => handleInvoice(op)}>
                                    <i className='ed-icon i-xs primary icon-invoice'></i>

                                    <div className='toopTip-container'>
                                      <p className='text-3xs w-400 primary'>View Invoice</p>
                                    </div>
                                  </div>
                                </div>

                              </td>
                            </tr>

                            {/* <div className='edit-sidebar-wrap'>
                              <div className='sidebar-edit-btn-container'>
                                <button type="button" className="button" onClick={() => InvoiceDownload.current.open()}>Invoice</button>
                                {
                                  orderList && orderList.length > 0 && orderList.map((op, i) => {
                                    return (
                                      <div className='sidebar-edit-wrap reverse' key={i}>
                                        <AppLink to={`/ecommerce/orderDetails/${op._id}`} className="text-xxs primary w-400">View Detail </AppLink>
                                        {op.Status === "Completed" ?
                                          <AppLink to={`/ecommerce/invoice/${op._id}`} className="text-xxs primary w-400">Invoice </AppLink>
                                          : ""
                                        }
                                      </div>
                                    )
                                  })
                                }
                              </div>
                            </div> */}

                            {/* <hr className='horizontal-line' /> */}

                          </React.Fragment>
                        )
                      }) : <NoDataAvailable title="No Records Found" />
                      :
                      <div className="loadingGridData">
                        <i className="ed-loadingGrid"></i>
                      </div>
                    }

                  </React.Fragment>
                </tbody >

              </table >
            </div >
            <div className='orderList-top-left'>

            </div>
          </div >
          {
            adminOrderList.success &&adminOrderList.data&&
            <div className='orderList-top-right'>
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={productCount}
              pageSize={PageSize}
              onPageChange={page => handlepagination(page)}
            />
          </div>
          }
        
        </div >
      </div >}
      <Lightbox ActionItem={<button className='button btn-2xs button-primary' onClick={() => handleDownloadInvoice()}>Download</button>} Title={`Order ID :  #${orderDetails && orderDetails?.order_id}`} ref={InvoiceDownload} Position="Center" Slide="Top" ClosePopUp={() => closeModal()} LightboxSize="Lightbox_S">
        <LightBoxContent>
          <Invoice orderDetails={orderDetails} />
        </LightBoxContent>
      </Lightbox>
    </React.Fragment >
  )
}

export default OrderList