import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchControl from '../../../../Common/SearchControl';
import './allCollection.scss';
import ProductImage from '../assets/images/Collections_default.jpg';
import AppLink from '../../../../Common/AppLink';
import { deleteCollection, getCollectionList, resetGetCollectionList } from '../../../../store/actions/ecommerce/action/collection';
import CheckboxInput from '../../../../Common/Form/CheckboxInput';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmPop from '../Component/DeleteConfirmPop/DeleteConfirmPop';
import Breadcrumb from '../../../../Common/Breadcrumb';
import BreadcrumbItem from '../../../../Common/Breadcrumb/BreadcrumbItem';
import AddNewCollections from './AddNewCollections';
import DefaultImage1 from '../assets/images/Product_default.jpg'
const AllCollection = () => {
  const [collList, setCollList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("")
  const { adminCollectionList } = useSelector((state) => state.collectionList);
  const { loading } = useSelector((state) => state.collectionList.delete);
  const { success } = useSelector((state) => state.collectionList.delete);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const history = useNavigate();
  // useEffect(() => {
  //   if (user && user.user_business_business_shop_category.length === 0) {
  //     history('/ecommerce/businessInfo');
  //   }
  //   dispatch(getCollectionList(user.user_business, 'id'));
  // }, [dispatch, history, user]);

  useEffect(() => {
    dispatch(getCollectionList(user.user_business, 'id'));
  }, [dispatch, user.user_business])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const [openDeletePop, setOpenDeletePop] = useState(-1);
  const [deletecollId, setDeleteColId] = useState("")
  const handleAcceptPopup = (i) => {
    // let arr = [...collList];
    setOpenDeletePop(openDeletePop === i ? -1 : i);
    // setCollList([...arr]);
    setDeleteColId(i)
  }

  const deleteCollHandler = (i) => {
    // console.log(collList[i]._id)
    // dispatch(deleteCollection(user.user_business, collList[i]._id));
    // setOpenDeletePop(false);
    // dispatch(resetGetCollectionList());
    dispatch(deleteCollection(user.user_business, deletecollId));
    setOpenDeletePop("")
    // if (success) {
    //   console.log(success, "success")
    //   setOpenDeletePop("")
    // }
  };
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  // useEffect(() => {
  //   return () => {
  //     dispatch(resetGetCollectionList())
  //   }
  // }, [])

  const handleReset = () => {
    setSearchTerm("")
    dispatch(getCollectionList(user.user_business, 'id'));
  }

  return (
    <React.Fragment>
      <div className='dashBoard-home-container'>
        <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          <BreadcrumbItem to="/ecommerce/allCollection" title="Collections" />
        </Breadcrumb>
        <h1 className="Collection-heading">Collections <span>{adminCollectionList.success && adminCollectionList.data.length}</span></h1>
        <div className='allCollection-container'>
          <div className='allCollection-top-wrapper'>
            <p className='text-regf w-300'>Group related products into collections and add them to your site.</p>
            <div className='allCollection-top-right'>
              {adminCollectionList.success && adminCollectionList.data && adminCollectionList.data.length > 0 &&
                <div className='allCollection-top-right-search'>
                  <div className="headerItem headerSearchBar">
                    <SearchControl
                      classNameWrappper="tableSearchbar"
                      placeholder="Search..."
                      onChange={handleSearch}
                      onKeyUp={handleSearch}
                      reset={() => handleReset()}
                    />
                  </div>
                </div>
              }
              <AppLink to="/ecommerce/createCollection" className="button button-primary w-400 btn-xs">
                <span className='mt-5'><i className='ed-icon icon-plus-add white i-xs'></i></span>
                New Collection
              </AppLink>
            </div>
          </div>

          {adminCollectionList.success ?
            <div className='allCollection-lower-section-wrap mt-30'>
              {adminCollectionList.success && adminCollectionList.data && adminCollectionList.data.length > 0 && adminCollectionList.data.filter((coll) => {
                if (searchTerm === "") {
                  return coll;
                } else if (
                  coll.collectionName.toLowerCase()
                    .includes(searchTerm.toLowerCase())
                ) {
                  return coll;
                }
              }).map((vl, i) => {
                return (
                  <div className='allCollection-image-container allCollection-div'>
                    <AppLink to={`/ecommerce/productsInCollection/${vl._id}`}>
                      <>
                        {vl.picture && vl.picture.length > 0 ? <img src={vl.picture[0] ? vl.picture[0] : ProductImage} alt="" /> : <img src={ProductImage} alt="" />}

                        <div className='allCollection-overlay'> </div>
                        <div className='allcollection-text-wrap'>
                          {/* <p className='text-xs w-300 white'>{`${vl.collectionName} (${vl.productId.length})`}</p> */}
                          <p className='text-xs w-300 white'>{`${vl.collectionName} (${vl.productCount})`}</p>
                        </div>
                      </>
                    </AppLink>

                    <div className='allCollection-threeDot-wrap'>
                      <i className='ed-icon i-s  white icon-delete threeDot-icon ' onClick={() => { handleAcceptPopup(vl._id) }}></i>
                      {
                        openDeletePop === vl._id && <DeleteConfirmPop index={i} handleAcceptPopup={handleAcceptPopup} deleteVarHandler={deleteCollHandler} loading={loading} />
                      }
                      {/* <span className='threeDot-icon' onClick={() => { handleAcceptPopup(i) }}>&#8230;</span> */}

                      {/* {
                        vl.showPopup && <React.Fragment >
                          <DeleteConfirmPop onClosePop={handleAcceptPopup(i)} onDeletePop={deleteCollHandler(i)} />
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
                                onClick={() => { deleteCollHandler(i) }}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </React.Fragment>
                      } */}

                    </div>

                    <div className='allCollection-top-image-wrapper'>
                      <div>
                        {vl.featured && <p className='eComm-checkbox-center white'>Featured</p>}
                        {/* <CheckboxInput
                              label={"Featured"}
                              LabelClass={"label-heading eComm-checkbox-center"}
                              className={"eComm-checkbox"}
                              checked={vl.featured}
                            /> */}
                      </div>
                    </div>
                  </div>
                )
              })
              }

              {adminCollectionList.success && adminCollectionList.data && adminCollectionList.data.length === 0 &&
                < AppLink to="/ecommerce/createCollection"> <AddNewCollections /></AppLink>

              }

              {adminCollectionList.success && adminCollectionList.data && adminCollectionList.data.length >= 1 &&
                < AppLink to="/ecommerce/createCollection">
                  <div className='allCollection-div allcollection-addMore-div'>
                    <div className='allCollection-add-new'>
                      <span className='allCollection-plusIcon'>&#43;</span>
                      <p className='text-regf w-400 primary'>Add more</p>
                    </div>
                  </div>
                </AppLink>
              }

            </div>
            : <div className="loadingGridData"><i className="ed-loadingGrid"></i></div>
          } </div>
      </div>
    </React.Fragment >
  )
}

export default AllCollection