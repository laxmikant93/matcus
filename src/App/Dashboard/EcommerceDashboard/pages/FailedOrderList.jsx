import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import AppLink from '../../../../Common/AppLink';
import Breadcrumb from '../../../../Common/Breadcrumb';
import BreadcrumbItem from '../../../../Common/Breadcrumb/BreadcrumbItem';
import CheckboxInput from '../../../../Common/Form/CheckboxInput';
import FormInput from '../../../../Common/Form/FormInput';
import NoDataAvailable from '../../../../Common/NoDataAvailable';
import { getOrderList, changeOrderStatus } from '../../../../store/actions/ecommerce/action/cartOrder';
import ProductImage from '../assets/icons/productImage.png'
import EDropdown from '../Component/EDropdown';
import './orderList.scss';

const OrderList = () => {
  const [checkBox, setCheckbox] = useState(false);
  const [status, setStatus] = useState('');
  const [orderList, setOrderList] = useState([]);

  const { adminOrderList } = useSelector((state) => state.orderCartList);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const history = useNavigate();
  const { id, state } = useParams();



  useEffect(() => {
    dispatch(getOrderList(user.user_business));
  }, [dispatch]);


  // useEffect(() => {
  //   if (user && user.user_business_business_shop_category.length === 0) {
  //     history('/ecommerce/businessInfo');
  //   }
  // }, [history, user]);

  useEffect(() => {
    if (state === ":failedOrders") {
      if (adminOrderList.success === true && adminOrderList.data && adminOrderList.data.length > 0) {

        let arr = adminOrderList.data.filter((item) => item.Status === "Pending").map((vl, i) => {
          return { ...vl, selected: false };
        });
        setOrderList([...arr]);
      }
    }

  }, [state, adminOrderList])

  // const loop = [1, 2, 3, 4, 5, 6, 7, 8, 1, 1, 1];

  const handleChange = (i) => {
    // setCheckbox(e.target.checked);
    let arr = [...orderList];
    arr[i].selected = arr[i].selected ? false : true;
    setOrderList([...arr]);

  }

  const deliveryStatusHandler = (val, ind, id) => {
    let arr = orderList;
    arr[ind].Status = val;
    setOrderList([...arr]);
    const data = {
      status: "edit order",
      orderId: id,
      Status: val
    };

    dispatch(changeOrderStatus(data, user.user_business_business_subdomain));
    // window.location.reload();
  };
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <React.Fragment>
      <div className='dashBoard-home-container' >
        <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          <BreadcrumbItem to="/ecommerce/failedOrderList/:id/:failedOrders" title="Failed Orders" />
        </Breadcrumb>
        <div className='orderList-wrapper'>
          <div className='oderList-top-div-wrapper'>
            <div className='orderList-top-left'>
              <span className='text-md w-500'>Failed Orders</span> <span className='text-md w-500 gray'> {orderList.length}</span>
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
            </div> */}
            <div className='oderList-table-wrapper'>
              <table>
                <thead>
                  <tr>
                    <th> &nbsp;</th>
                    <th className='uppercase'>PURCHASE DATE</th>
                    <th className='uppercase'>ORDER ID</th>
                    <th className='uppercase'>STATUS</th>
                    <th className='uppercase'>BUYER’S NAME</th>
                    <th className='uppercase'>PRICE</th>
                    <th className='uppercase'>No. Of Products</th>
                    <th>&nbsp; </th>
                  </tr>
                </thead>
                <tbody>
                  <React.Fragment>

                    {adminOrderList.success ?
                      orderList && orderList.length > 0 ? orderList.map((op, i) => {
                        return (
                          <React.Fragment key={i}>
                            <tr className={`${checkBox ? 'tr-bg-color' : ''}`}>
                              <td>
                                {/* <div className='order-list-th-wrapper'>
                                  <CheckboxInput
                                    // label={"Continue selling when out of stock"}
                                    // LabelClass={"label-heading eComm-checkbox-center"}
                                    className={"eComm-checkbox"}
                                    onChange={() => handleChange(i)}
                                    checked={op.selected}
                                  />
                                </div> */}
                              </td>
                              {/* <td>
                                <div className='order-list-th-wrapper'>
                                  <div className='product-image-wraper-div'>
                                    <img src={ProductImage} alt="productImage" />
                                  </div>
                                </div>
                              </td> */}
                              <td data-label="Purchaase date">
                                <div className='order-list-th-wrapper'>
                                  {/* <p className='text-xs w-400'>April 2,2022</p> */}
                                  <p className='text-xxs w-400'>{op.createdAt.substring(0, 10)}</p>
                                </div>
                              </td>
                              <td data-label="order Id">
                                <div className='order-list-th-wrapper'>
                                  <AppLink to={`/ecommerce/orderDetails/${op._id}`}>
                                    <p className='text-xxs w-400 primary'>{op._id.substring(0, 15)}...</p>
                                  </AppLink>
                                </div>
                              </td>
                              <td >
                                <div className='order-list-th-wrapper '>
                                  <p className='text-xxs w-400'>Payment Failed</p>
                                  {/* <select
                                    id="list"
                                    // name="blood_group"
                                    // defaultValue={"Pending"}

                                    value={op.Status}
                                    onChange={(e) => { deliveryStatusHandler(e.target.value, i, op._id) }}
                                    disabled={op.Status === "Delivered"}
                                  >
                                    <option value="Pending">Pending</option>
                                    <option value="Placed">Order Placed</option>
                                    <option value="Ready to Dispatch">Ready to Dispatch</option>
                                    <option value="In-Transit">In-Transit</option>
                                    <option value="Delivered">Delivered</option>

                                  </select> */}
                                  {/* <p className='text-xs w-400'>{op.Status}</p> */}
                                </div>
                              </td>
                              <td data-label="buryer name">
                                <div className='order-list-th-wrapper'>
                                  <p className='text-xxs w-400'>{op.userId.fullname}</p>

                                </div>
                              </td>
                              <td data-label="Select all">
                                <div className='order-list-th-wrapper'>
                                  <p className='text-xxs w-400'><span>&#8377;</span>{op.orderTotal}</p>
                                </div>
                              </td>
                              <td data-label="No. of product">
                                <div className='order-list-th-wrapper'>
                                  <p className='text-xxs w-400'>{op.orderProduct ? op.orderProduct.length : ""}</p>
                                </div>
                              </td>
                              <td data-label="Select all">

                              </td>
                            </tr>

                            <div className='edit-sidebar-wrap'>
                              <div className='sidebar-edit-btn-container'>
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
                            </div>
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
                </tbody>

              </table>
            </div>

          </div>
        </div>
      </div>
    </React.Fragment >
  )
}

export default OrderList