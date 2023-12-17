import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CheckboxInput from '../../../../Common/Form/CheckboxInput';
import SearchControl from '../../../../Common/SearchControl';
import EDropdown from '../Component/EDropdown';
import EDropDownShowMore from '../Component/EDropDownShowMore';
import ProductImage from '../assets/images/Product_default.jpg';
import './orderList.scss';
import './productList.scss';
import './customerList.scss'
import { getCustomerList } from '../../../../store/actions/ecommerce/action/user';
import { useNavigate } from 'react-router-dom';
import AppLink from '../../../../Common/AppLink';
import NoDataAvailable from '../../../../Common/NoDataAvailable';
import Breadcrumb from '../../../../Common/Breadcrumb';
import BreadcrumbItem from '../../../../Common/Breadcrumb/BreadcrumbItem';

const CustomerList = () => {
  const [customerList, setCustomerList] = useState([]);
  const [checkBox, setCheckbox] = useState(false);

  const { adminUserList } = useSelector((state) => state.userList);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const history = useNavigate();

  useEffect(() => {
    if (user && user.user_business) {
      dispatch(getCustomerList(user.user_business, "getAllUser"));
    }
  }, [dispatch, user]);

  // useEffect(() => {
  //   let data = adminUserList.data
  //   let filterdata = data.filter((item) => item.business === user.user_business && item._id !== user._id);
  //   setCustomerList([...filterdata]);
  // }, [adminUserList, user._id, user.user_business])



  // useEffect(() => {
  //   if (user && user.user_business_business_shop_category.length === 0) {
  //     history('/ecommerce/businessInfo');
  //   }
  // }, [user]);

  // useEffect(() => {
  //   if (adminUserList.success === true && adminUserList.data && adminUserList.data.length > 0) {
  //     let arr = adminUserList.data.map((vl, i) => {
  //       return { ...vl, selected: false };
  //     });
  //     setCustomerList([...arr]);

  //   }

  // }, [adminUserList]);

  const loop = [1, 2, 3, 4, 5, 6, 7, 8];
  const handleChange = (e) => {
    setCheckbox(e.target.checked);

  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (

    <React.Fragment>
      <div className='dashBoard-home-container' >
        <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          <BreadcrumbItem to="/ecommerce/customerList/" title="Customers" />
        </Breadcrumb>
        <div className='orderList-wrapper'>
          <div className='oderList-top-div-wrapper'>
            <div className='orderList-top-left'>
              <span className=''>Customers</span> <span className='count'> {adminUserList.data && adminUserList.data.length}</span>
            </div>
            {/* <div className='orderList-top-left'>
              <button className='btn-text-blue button-sm '> Export CSV</button>
              <button className='btn-text-blue button-sm '> Import CSV</button>
            </div> */}
          </div>
          <div className='orderList-div mt-25'>
            {/* <div className='orderList-checkbox-list product-list-top-wrapper'>
              <div className='product-select-wrapper'>
                < CheckboxInput
                  // label={'Select All'}
                  LabelClass={"label-heading eComm-checkbox-center label-heading-margin"}
                  className={"eComm-checkbox"}
                  onChange={handleChange}
                  checked={checkBox}
                />
                {
                  checkBox ?
                    <p><span >1</span><span className='checkbox-selected' >Selected</span></p>
                    : <p>Select All</p>
                }
              </div>
            </div> */}
            <div className={`oderList-table-wrapper product ${customerList.length > 0 ? 'hideMinheight' : ''}`}>
              <table>
                <thead>
                  <tr className='product-tr-list customer-tr-List'>
                    <th> &nbsp;</th>
                    <th> &nbsp;</th>
                    <th className='uppercase'>Name</th>
                    <th className='uppercase'>Customer ID</th>
                    <th className='uppercase'>Email</th>
                    <th className='uppercase'>Phone</th>
                    <th className='uppercase'>Location</th>
                    <th className='uppercase'>All Orders</th>
                    <th className=''></th>
                  </tr>
                </thead>
                <tbody className='coustmerlist-table-body'>
                  <React.Fragment>
                    {adminUserList.success ?
                      adminUserList.data && adminUserList.data.length > 0 ? adminUserList.data.map((op, i) => {
                        return (
                          <React.Fragment key={i}>
                            <tr className={` product-list-td-wrapper customer-list-wrapper ${checkBox ? 'tr-bg-color' : ''}`}>
                              <td>
                                {/* <div className='order-list-th-wrapper'>
                                  <CheckboxInput
                                    // label={"Continue selling when out of stock"}
                                    // LabelClass={"label-heading eComm-checkbox-center"}
                                    className={"eComm-checkbox"}
                                    // onChange={handleChange}
                                    checked={op.selected}
                                  />
                                </div> */}
                              </td>
                              <td>
                                <div className='order-list-th-wrapper'>
                                  <div className='product-image-wraper-div cusotmer-image-wrapper-div'>
                                    <img src={ProductImage} alt="productImage" />
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div className='order-list-th-wrapper'>
                                  <p className='text-regf w-500'>{op.fullname ? op.fullname : ''}</p>
                                </div>
                              </td>
                              <td >
                                <div className='order-list-th-wrapper'>
                                  <span className='text-xs w-400'>{op.username ? op.username : ''}</span>
                                </div>
                              </td>
                              <td >
                                <div className='order-list-th-wrapper'>
                                  <p className='text-xs w-400'>{op.email ? op.email : ''}</p>
                                </div>
                              </td>
                              <td data-label="Select all">
                                <div className='order-list-th-wrapper'>
                                  <p className='text-xs w-400'>{op.contact ? op.contact : ''} </p>

                                </div>
                              </td>
                              <td data-label="Select all">
                                <div className='order-list-th-wrapper'>
                                  {/* <p className='text-xs w-400'>New Delhi</p> */}
                                </div>
                              </td>
                              <td data-label="Select all">
                                <div className='order-list-th-wrapper'>
                                  <p className='text-xs w-400 primary'>{op.orderCount}</p>
                                </div>
                              </td>
                              <td className='td-three-dot'>
                                {/* <p className='text-xxs w-400 customer-list-view-order-p'
                                
                                ></p> */}
                                <AppLink to={`/ecommerce/orderList/${op._id}/customerOrder`}>View Orders</AppLink>
                              </td>
                            </tr>
                            <hr className='horizontal-line' />
                          </React.Fragment>
                        )
                      })
                        : <NoDataAvailable title="No Records Found" />
                      :
                      <div className="loadingGridData">
                        <i className="ed-loadingGrid"></i>
                      </div>
                    }
                  </React.Fragment>
                </tbody >
              </table >
            </div >
          </div >
        </div >
      </div >
    </React.Fragment >
  )
}

export default CustomerList