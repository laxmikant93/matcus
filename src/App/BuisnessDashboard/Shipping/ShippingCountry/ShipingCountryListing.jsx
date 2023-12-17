import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import NoDataAvailable from '../../../../Common/NoDataAvailable';
import { getShippingList } from '../../../../store/actions/shipping';
// import { getShippingList } from '../../../../store/actions/shipping';
import IndainFlag from '../../DashboardSetting/asserts/images/india-flag.png'

function ShipingCountryListing({ display }) {
  const history = useNavigate();
  const dispatch = useDispatch();

  const { users, getShippingListLoading, getShippingListSuccess, getShippingListData } = useSelector((state) => {
    return {
      users: state.user,
      getShippingListLoading: state.shipping.list.loading,
      getShippingListSuccess: state.shipping.list.success,
      getShippingListData: state.shipping.list.data,
    }
  });

  useEffect(() => {
    dispatch(getShippingList(users.user_institute))
  }, [dispatch, users.user_institute])

  return (
    <React.Fragment>
      {!getShippingListLoading &&
        getShippingListSuccess ?
        <div className='selectedCountry-wrapper mt-25'>
          <div className="gridListTable ">
            <ul className="gridHeader ">
              <React.Fragment>
                <li className=" col col-6 text-xs w-500  primary">Country</li>
                <li className=" col col-3 text-xs w-500 primary">Delivery Option </li>
                <li className="col col-3 text-xs w-500 "></li>
              </React.Fragment>
            </ul>

            <div className='gridBody varients-after-grid-body '>
              <div className='gridRow varients-grid-row'>
                {getShippingListSuccess && getShippingListData.length > 0 ? (
                  <>
                    {
                      getShippingListData.map((item, key) => {
                        return (
                          <ul className="topInfo" >
                            <li className='col-6 ' >
                              <div className='country-wrap'>
                                <div className='country-flag'>
                                  {/* <img src={IndainFlag} alt="IndainFlag" /> */}
                                  {item?.countryFlag ? item?.countryFlag : ""}
                                </div>
                                <div className='country-name'>
                                  <p className='text-xs w-500 base'>{item.country}</p>
                                </div>
                              </div>
                            </li>
                            <li className="col col-3">
                              <p className='text-xxs w-500 base'>{
                                item.shipping_rate.length && item.shipping_rate.every((item) => item.shipping_title === "FreeShipping") ? "Free Shipping" :
                                  item.shipping_rate.every((item) => item.shipping_title === "FlatShipping") ? "Flat Shipping" :
                                    "Free Shipping, Flat Shipping"
                              }</p>
                              <p className='text-xxs w-300 lgray'>{
                                item.Zones.length ? item.Zones.map((zoneItem, zoneKey) => {
                                  return `Zone ${zoneKey + 1}, `
                                }) : ""
                              }
                              </p>
                            </li>
                            <li className="col col-3 text-center" onClick={() => history(`/ecommerce/shipping/${item._id}`)}>
                              <div className='icon-wrap'>
                                <i className='ed-icon  i-xxs icon-pencial2'></i>
                                <p className='text-xxs w-400 lgray'>Edit</p>
                              </div>
                            </li>
                          </ul>
                        )
                      })
                    }
                  </>

                ) : (
                  <NoDataAvailable title="No Records Found." />
                )
                }

              </div>
            </div>
          </div>
        </div> : <div className='loadingGridData'>Loading...</div>}
    </React.Fragment >
  )
}

export default ShipingCountryListing