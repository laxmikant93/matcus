import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import CheckboxInput from '../../../../Common/Form/CheckboxInput'
import SearchControl from '../../../../Common/SearchControl'
import EDropdown from '../Component/EDropdown'
import EDropDownShowMore from '../Component/EDropDownShowMore';
import ProductImage from '../assets/images/Product_default.jpg';
import './orderList.scss';
import './productList.scss';
import './inventory.scss'
import AppLink from '../../../../Common/AppLink';
import { editProduct, getProductList, productDelete } from '../../../../store/actions/ecommerce/action/product';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmPop from '../Component/DeleteConfirmPop/DeleteConfirmPop'
import NoDataAvailable from '../../../../Common/NoDataAvailable';
import Breadcrumb from '../../../../Common/Breadcrumb';
import BreadcrumbItem from '../../../../Common/Breadcrumb/BreadcrumbItem';
import { getAdminInventoryList, inventoryDelete, inventoryListInOutStock, resetInventoryDelete, searchInventory } from '../../../../store/actions/ecommerce/action/inventoryIndex';
import ThreeDot from '../assets/icons/threeDot.svg'
import Pagination from '../../../../Common/Pagination/index'
import UseOutsideClick from '../../../../Common/UseOutsideClick'; import { useOutsideClick } from 'rooks';
const Inventory = () => {
  const [checkBox, setCheckbox] = useState([]);
  const [inventoryProducts, setInventoryProducts] = useState([]);
  const [acceptPopupToggle, setAcceptPopupToggle] = useState("");
  const [skuStatus, setSKUStatus] = useState("");
  // const [openSidebar, setOpensidebar] = useState(false);
  const [searchTerm, setSearchTerm] = useState("")
  const { adminProductList } = useSelector((state) => state.productList);
  const [inventoryList, setInventoryList] = useState("")

  const RemovePopToggleRef = useRef();
  const [threeDotsPopup, setThreeDotPopup] = useState(false);

  useOutsideClick(RemovePopToggleRef, () => {
    if (threeDotsPopup !== -1) setThreeDotPopup(-1);

  });
  const [currentPage, setCurrentPage] = useState(1);
  const [productCount, setProductCount] = useState(0);
  const PageSize = 10;

  // console.log(threeDotsPopup, "line no 41");

  const { user, getInventorylist, inventorylistSuccess, deleteInventorySuccss, deleteInventoryLoadin } = useSelector((state) => {
    return {
      user: state.user,
      getInventorylist: state.ecomAdminInventory.getAdminInventoryList.data,
      inventorylistSuccess: state.ecomAdminInventory.getAdminInventoryList.success,
      deleteInventorySuccss: state.ecomAdminInventory.deleteInventory.success,
      deleteInventoryLoadin: state.ecomAdminInventory.deleteInventory.loading
    }
  })
  const [openDeletePop, setOpenDeletePop] = useState(-1);
  const [deleteProductID, setDeleteProductID] = useState("")
  const [productName, setProductName] = useState("")
  const [productVariation, setProductVariation] = useState("")
  const [productNameVariationName, setProductVariationName] = useState("")
  useEffect(() => {
    if (inventorylistSuccess && getInventorylist && getInventorylist?.inventory) {
      setInventoryList(getInventorylist?.inventory)
    }
  }, [inventorylistSuccess, getInventorylist])

  useEffect(() => {
    if (inventorylistSuccess === true && getInventorylist && getInventorylist?.productCount) {
      setProductCount(getInventorylist?.productCount)
    }
  }, [getInventorylist]);

  const menuColor = ['green', 'blue', 'white', 'red'];
  const dispatch = useDispatch();
  const history = useNavigate();

  useEffect(() => {
    dispatch(getProductList(user.user_business));
  }, [dispatch, user.user_business]);


  // useEffect(() => {
  //   if (user && user.user_business_business_shop_category.length === 0) {
  //     history('/ecommerce/businessInfo');
  //   }
  // }, [history, user]);

  useEffect(() => {
    if (adminProductList?.success === true && adminProductList?.data && adminProductList?.data?.products && adminProductList?.data?.products?.length > 0) {
      let array = [];
      adminProductList.data.products.map((vl, i) => {
        let obj = { ...vl, selected: false, showPopup: false };
        for (let j = 0; j < vl.variations && vl.variations.length; j++) {
          if (vl.variations[j].variationActive === true) {
            array.push({ ...vl.variations[j], picture: vl.productPicture, selected: false, productId: vl._id });
          }
        }
        return obj;
      });



      setInventoryProducts([...array]);
    }
  }, [adminProductList]);

  const handleChange = (e, value) => {
    let inputChecked = e.target.checked;
    let array = checkBox;
    if (inputChecked) {
      array.push(value);
    }
    else {
      let index = array.indexOf(value);
      array.splice(index, 1);
    }
    setCheckbox([...array]);

  }

  const handleSelectALLCheckboxes = (e) => {
    let inputChecked = e.target.checked;
    if (inputChecked) {
      setCheckbox([...adminProductList.data]);
    }
    else {
      setCheckbox([])
    }
  }

  const handleMultipleDelete = () => {
    let value = checkBox.map((item, i) => {
      return (
        item._id
      );
    });
    dispatch()
  }

  const handleStatusUpdate = (e, id, item) => {
    let inputValue = e.target.value;
    setProductVariationName(item.variationName)
    // if (item.variationName && inputValue) {
    dispatch(inventoryListInOutStock(id, inputValue))
    // }
  }

  const [variationArray, setVariationArray] = useState([])

  const handleShowpopup = (i, item) => {
    // console.log(i, "handleShowpopup")
    setThreeDotPopup(threeDotsPopup === -1 ? i : -1)
    setDeleteProductID(i)
    let array = variationArray
    array.push(item)
    setVariationArray([...array])
  }


  let typing;
  const handleSearch = (evt) => {
    evt.preventDefault();
    clearTimeout(typing);
    typing = setTimeout(() => {
      setSearchTerm(evt.target.value);
    }, 400);
    if (!evt.target.value) {
      dispatch(getAdminInventoryList(user.user_business, "", PageSize))
      clearTimeout(typing);
      setSearchTerm("");
    }
  };
  useEffect(() => {
    if (searchTerm) {
      dispatch(searchInventory(user.user_business, searchTerm))
    }
  }, [dispatch, searchTerm, user.user_business])

  const handleReset = () => {
    setSearchTerm("")
    dispatch(getAdminInventoryList(user.user_business, "", PageSize))
  }
  const handleAcceptPopupCancel = (i, item) => {
    setProductVariation(item?.variationName)
    setProductName(item?.productName)
    setOpenDeletePop(openDeletePop === i ? -1 : i);
    setThreeDotPopup(-1)
  }

  const deleteVarHandler = () => {
    // console.log(productName, productVariation, " name, var")
    // if (productName) {
    //   dispatch(inventoryDelete("product", deleteProductID))
    //   if (deleteInventory) {
    //     setOpenDeletePop(-1)
    //   }
    // } else {
    dispatch(inventoryDelete("variation", deleteProductID))
    if (deleteInventorySuccss) {
      setOpenDeletePop(-1)
      //   }
    }
    // setAcceptPopupToggle(false);
    // let len = 1;
    // const prodId = inventoryProducts[i].productId;
    // for (let v = 0; v < adminProductList.data.length; v++) {
    //   if (prodId === adminProductList.data[v]._id) {
    //     len = adminProductList.data[v].variations.length;
    //   }
    // }
    // if (len > 1) {
    //   const body = {
    //     ...inventoryProducts[i],
    //     status: "variationEdit",
    //     variationsId: inventoryProducts[i]._id,
    //     variationActive: false
    //   };

    //   dispatch(editProduct(body));
    //   // window.location.reload();
    // } else {
    //   dispatch(productDelete([prodId]), 'change');
    //   // window.location.reload();
    // }
  };
  useEffect(() => {
    if (deleteInventorySuccss) {
      dispatch(resetInventoryDelete())
    }
  }, [dispatch, deleteInventorySuccss])
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  // (currentPage - 1) * PageSize
  useEffect(() => {
    dispatch(getAdminInventoryList(user.user_business, "", PageSize))
  }, [dispatch])

  const handlePagination = (page) => {
    setCurrentPage(page)
    dispatch(getAdminInventoryList(user.user_business, page, PageSize))
  }

  const variantvalues = (arr) => {
    let resp = '';
    if (arr && arr.length) {
      resp = arr.map(v => v.value);
      return resp.join('/');
    }
    return resp;
  }
  return (
    <React.Fragment>
      <div className='dashBoard-home-container' >
        <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          <BreadcrumbItem to="/ecommerce/inventory" title="Inventories" />
        </Breadcrumb>

        <div className='orderList-wrapper'>
          <div className='oderList-top-div-wrapper'>
            <div className='orderList-top-left'>
              <span className=''>Inventory</span> <span className='count'>
                {/* {inventoryList && inventoryList.length > 0 ? inventoryList.length : 0} */}
                {(productCount <= 10 ? productCount : productCount - (currentPage * 10) < 0 ? `${productCount}/ ${productCount}` : `${currentPage * 10}/ ${productCount}`)}

              </span>
            </div>

            <div className='orderList-top-left'>
              {/* <button className='btn-text-blue button-sm '> Export CSV</button>
              <button className='btn-text-blue button-sm '> Import CSV</button> */}
              {/* <button onClick={() => { }}>Add New Product</button> */}
              <AppLink to="/createProduct" className='button button-primary btn-sm ' >Add New Product </AppLink>
            </div>
          </div>
          <div className='orderList-div mt-25'>
            <div className='orderList-checkbox-list product-list-top-wrapper'>
              {/* <div className='product-select-wrapper'>
                <React.Fragment>
                  {adminProductList.data && adminProductList.data.length ?
                    <span>
                      {
                        checkBox.length ?
                          <>
                            <p><span >{checkBox.length}</span><span className='checkbox-selected' >Selected</span></p>
                            <input type="checkbox"
                              onChange={handleSelectALLCheckboxes}
                              checked={adminProductList.success && adminProductList.data.length &&
                                checkBox.length === adminProductList.data.length}
                            />
                            <label>Select All</label>
                          </>
                          : <>
                            <input type="checkbox"
                              onChange={handleSelectALLCheckboxes}
                              checked={adminProductList.success && adminProductList.data.length &&
                                checkBox.length === adminProductList.data.length}
                            />
                            <label>Select All</label>
                          </>
                      }
                    </span> : ""}

                </React.Fragment>
              </div> */}
              {/* default view  */}

              {
                checkBox.length ? (
                  (

                    <div className='product-list-right-after'>
                      <div className='add-to-Collection-wrapper'>
                        {/* <button
                          onClick={handleMultipleDelete}
                        >
                          <i className="ed-icon icon-delete gray i-xs"></i>
                        </button> */}
                      </div>
                    </div>


                  )
                ) : (
                  < div className='product-list-right'>
                    <div className="headerItem headerSearchBarinventory">
                      <SearchControl
                        classNameWrappper="tableSearchbar"
                        placeholder="Search..."
                        onChange={handleSearch}
                        onKeyUp={handleSearch}
                        reset={() => handleReset()}
                      // value={searchTerm}
                      />
                    </div>
                    {/* <div className='collection-wapper-div'>
                      <p className='text-regf w-400'>Collection:</p>
                      <EDropdown menuName={'All products'} menuOptions={menuColor} arrow={true} className={'color-black '} otherClass={'btn-drop-round'} />
                    </div>
                    <div className='collection-wapper-div'>
                      <p className='text-regf w-400'>Filter by:</p>
                      <EDropdown menuName={'All'} menuOptions={menuColor} arrow={true} className={'color-black btn-drop-round'} otherClass={'btn-drop-round'} />
                    </div> */}
                  </div>
                )

              }
              {/* when user click on checkbox */}


            </div>
            <div className={`oderList-table-wrapper product ${inventoryList.length > 0 ? 'hideMinheight' : ''}`}>
              <table>
                <thead>
                  <tr className='product-tr-list'>
                    <th> &nbsp;</th>
                    <th> &nbsp;</th>

                    <th className='uppercase'>Name</th>
                    <th className='uppercase'>Price</th>
                    <th className='uppercase'>SKU</th>
                    <th className='uppercase'>INVENTORY</th>
                    {/* <th> &nbsp;</th> */}
                    <th className='uppercase'>QUANTITY</th>
                    <th className=''></th>

                  </tr>
                </thead>
                <tbody>
                  <React.Fragment>
                    {
                      inventorylistSuccess ?
                        inventoryList && inventoryList.length > 0 ? inventoryList
                          .map((item, i) => {
                            return (
                              <React.Fragment key={i}>
                                <tr className={` product-list-td-wrapper ${checkBox ? '' : ''}`} key={i} >
                                  <td>
                                    {/* <div className='order-list-th-wrapper'>
                                      <input type="checkbox"
                                        onChange={(e) => handleChange(e, item)}
                                        checked={checkBox.includes(item)}
                                      />
                                    </div> */}
                                  </td>
                                  <td>
                                    <AppLink to={`/editInventory/${item._id}/${item.productId}`}>
                                      <div className='order-list-th-wrapper'>
                                        <div className='product-image-wraper-div'>
                                          <img src={item.productPicture?.length ? item.productPicture[0] : ProductImage} alt="productImage" />
                                        </div>
                                      </div>
                                    </AppLink>
                                  </td>
                                  <td>
                                    <AppLink to={`/editInventory/${item._id}/${item.productId}`}>
                                      <div className='order-list-th-wrapper'>
                                        {/* <p className='text-xxs w-500'>{item.variationName}</p> */}
                                        <p className='text-xxs w-500'>{item.productName ? item.productName : item.variationName ? item.variationName : ""}</p>
                                        {/* <span>{variantvalues(item.variant_scheme)}</span> */}
                                        <span className="text-xxs w-500 base">{variantvalues(item.variant_scheme)}</span>
                                      </div>
                                    </AppLink>
                                  </td>
                                  <td >
                                    <div className='order-list-th-wrapper'>
                                      {
                                        item.defaultVariation ? (
                                          <p><span>&#8377;</span> <span className='text-xs w-400'>{item.price}</span></p>

                                        ) : (
                                          <p><span>&#8377;</span> <span className='text-xs w-400'>{item.price + item.salePrice}</span></p>

                                        )
                                      }

                                    </div>
                                  </td>
                                  <td >
                                    <div className='order-list-th-wrapper'>
                                      <p className='text-xxs w-400'>{item.SKU}</p>
                                    </div>
                                  </td>
                                  <td data-label="Select all">

                                    <div className='order-list-th-wrapper'>
                                      <div className=" inventory-select">
                                        <select
                                          // value={item?.outOfStock}
                                          value={item.stock === 0 || (item.outOfStock && item.outOfStock) ? "true" : "false"}
                                          onChange={(e) => handleStatusUpdate(e, item._id, item)}
                                          disabled={item.stock === 0}
                                          className='inventory-select-list'
                                        // onKeyUp={handleStatusUpdate}
                                        >
                                          <option value="false" >In Stock</option>
                                          <option value="true">Out Stock</option>
                                        </select>
                                      </div>
                                    </div>

                                  </td>
                                  <td data-label="Select all">
                                    <div className='order-list-th-wrapper'>
                                      <p className='text-xxs w-400'>{item.stock}</p>
                                    </div>
                                  </td>
                                  <td className='td-three-dot' ref={RemovePopToggleRef} >
                                    <div className='three-dot-imge-div'  >
                                      <img src={ThreeDot} alt="dot icon" className='product-three-dot-img'
                                        onClick={() => handleShowpopup(item._id, item)}
                                      // onClick={() => { handleShowSidebar(op._id) }} 


                                      />
                                      {
                                        threeDotsPopup === item._id &&
                                        <div className='threedot-wapper' ref={RemovePopToggleRef}>
                                          <AppLink to={`/editInventory/${item._id}/${item.productId}`} className='btn-text-blue mt-5 ' >Edit</AppLink>
                                          <hr className='product-list-hr' />
                                          <button className='btn-text-blue red'
                                            onClick={() => { handleAcceptPopupCancel(item._id, item) }}
                                          >Delete</button>
                                        </div>
                                      }
                                      {
                                        openDeletePop === item._id && <DeleteConfirmPop index={i} handleAcceptPopup={handleAcceptPopupCancel} deleteVarHandler={deleteVarHandler} loading={deleteInventoryLoadin} />
                                      }
                                    </div>
                                  </td>
                                  {/* {item.showPopup && (
                                <React.Fragment >
                                  <div className='Popup RemovePopup active'>
                                    <p className="text-xs">
                                      Delete Variation!!
                                    </p>
                                    <p className="red text-xs w-500">
                                      Are you sure?
                                    </p>
                                    <div className="removePopBtn pt-0 mt-0">
                                      <button
                                        className="button button-o-silver dgray button-sm"
                                        onClick={() => { handleAcceptPopup(i) }}
                                      >
                                        No, Cancel
                                      </button>
                                      <button
                                        className="button button-red button-sm"
                                        onClick={() => { deleteVarHandler(i) }}
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </div>
                                </React.Fragment>
                              )} */}
                                </tr>
                                <hr className='horizontal-line' />
                              </React.Fragment>
                            )
                          }) : <NoDataAvailable title="No records found." /> :
                        <div className="loadingGridData"><i className="ed-loadingGrid"></i></div>
                    }
                  </React.Fragment>
                </tbody>
              </table>
            </div>

          </div>

        </div>
        <div className='inline between-lg between-xs align-center pagination-wrapper '>
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
    </React.Fragment>
  )
}

export default Inventory