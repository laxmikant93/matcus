import React, { useState, useEffect } from 'react';
import './createCollectionPopUp.scss';
import Modals from '../../../../Common/Modals'
import ModalsBody from '../../../../Common/Modals/ModalsBody'
import ModalsHeader from '../../../../Common/Modals/ModalsHeader'
import SearchControl from '../../../../Common/SearchControl'
import ProductImage from '../assets/icons/productImage.png';
import DefaultImage from '../assets/images/Template_logoDef.png'
import { createCollection } from '../../../../store/actions/ecommerce/action/collection';
import ModalsFooter from '../../../../Common/Modals/ModalsFooter';
import { getProductList, getProductListSearch } from '../../../../store/actions/ecommerce/action/product';
import { useDispatch, useSelector } from 'react-redux';
import NoDataAvailable from '../../../../Common/NoDataAvailable';

const CreateCollectionPopUp = ({ list, show, onClose, submit, createCollectionRef, closeModalState, addedProduct }) => {
  const { user } = useSelector((state) => {
    return {
      user: state.user,
    }
  })
  const { adminProductList } = useSelector((state) => state.productList);
  // console.log('product list gt from createPage', list);
  const dispatch = useDispatch();
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    let selectedList = [];
    if (addedProduct && addedProduct.length > 0) {
      selectedList = addedProduct.map((v, i) => {
        return v._id;
      });
    }
    if (adminProductList && adminProductList.data && adminProductList.data.productlist) {
      const arr = adminProductList.data.productlist.map((v, i) => {
        let obj = selectedList.includes(v._id) ? { ...v, select: true } : { ...v, select: false };
        return obj;
      });
      setProductList([...arr]);
    }
  }, [addedProduct, adminProductList]);

  const selectionHandler = (val, i) => {
    let arr = [...productList];
    arr[i].select = val ? false : true;
    setProductList([...arr]);
  };

  const submitHandler = () => {
    let arr = [];
    productList.forEach((v, i) => {
      if (v.select === true) {
        arr.push(adminProductList.data.productlist[i]);
      }
    });
    submit(arr);
    createCollectionRef.current.close();
    setSearchTerm("")
    handleReset()
  };

  const closeModal = () => {
    onClose();
    handleReset()
  }
  const [searchTerm, setSearchTerm] = useState("")

  let typing;
  const handleSearchProduct = (evt) => {
    evt.preventDefault();
    clearTimeout(typing);
    typing = setTimeout(() => {
      setSearchTerm(evt.target.value);
      // sendSearchTerm(evt.target.value)
    }, 400);
    if (!evt.target.value) {
      dispatch(getProductList(user.user_business))
      clearTimeout(typing);
      setSearchTerm("");
    }
  };
  useEffect(() => {
    if (searchTerm) {
      dispatch(getProductListSearch(user.user_business, searchTerm))
    }
  }, [searchTerm, user.user_business])
  const handleReset = () => {
    setSearchTerm("")
    dispatch(getProductList(user.user_business))
  }

  return (
    <React.Fragment>
      {/* <div className='createCollection-modalwrap'>
        
      </div> */}
      <Modals ref={createCollectionRef} Position="center" slide="top" ClosePopUp={closeModalState}>
        <ModalsHeader
          title="Add products to this collections" />
        <ModalsBody className="createCollection-modalwrap">
          <div className='createCollectionModal'>
            <div className='createCollection-modal-body-wrap'>
              <div className='createCollection-search-bar mt-20'>
                <div className="headerItem headerSearchBar createCollectionpop-search">
                  <SearchControl
                    classNameWrappper="tableSearchbar"
                    placeholder="Search..."
                    onChange={handleSearchProduct}
                    // value={searchTerm}
                    reset={() => handleReset()}
                  />
                </div>
              </div>
              <div className='mt-20'>
                {/* when the product list is active add the col-active class below div */}
                {
                  productList ? (productList.length > 0 ? (productList.map((vl, i) => {
                    return (
                      <div
                        className={vl.select ? 'createCollection-product-list-wrap col-active' : 'createCollection-product-list-wrap'}
                        onClick={() => { selectionHandler(vl.select, i) }}
                        key={i}
                      >
                        <div className='createCollection-product-list-left'>
                          <div className='image-container'>
                            <img src={vl.productPicture && vl.productPicture.length > 0 ? vl.productPicture[0] : DefaultImage} alt="" />
                          </div>
                          <p className='text-xs base w-300'>{vl.productName}</p>
                        </div>
                        <div className='createCollection-product-list-right'>
                          <input
                            type="checkbox"
                            name={`physicalProduct${i}`}
                            value="physicalProduct"
                            className='createCollection-radio'
                            checked={vl.select}
                          />
                        </div>
                      </div>
                    );
                  })) : (<NoDataAvailable title="No records found." />))
                    : (<div className="loadingGridData"><i className="ed-loadingGrid"></i></div>)
                }
              </div>
            </div>
            <div className='createCollection-action-wrapper'>
              <div className='button-div'>
                <button className='button btn-text-blue' onClick={closeModal}> Cancel</button>
                <button className='button button-primary btn-oval btn-xs ' onClick={submitHandler}> Add</button>
              </div>
            </div>
          </div>
        </ModalsBody>
        <ModalsFooter className="createCollection-action-wrapper">

        </ModalsFooter>
      </Modals>
    </React.Fragment>
  )
}

export default CreateCollectionPopUp