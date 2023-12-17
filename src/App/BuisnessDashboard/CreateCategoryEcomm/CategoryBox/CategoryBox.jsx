import React from 'react';
import './categoryBox.scss';
import Dotted from '../../../Dashboard/EcommerceDashboard/assets/icons/categoryDotted.svg'
// import SwitchButton from '../../../../Common/Button/SwitchButton';
import { useState } from 'react';
import DeleteConfirmPOP from '../../../Dashboard/EcommerceDashboard/Component/DeleteConfirmPop/DeleteConfirmPop';
import SwitchButtonEcom from '../../../Dashboard/EcommerceDashboard/Component/SwitchButtonEcom/SwitchButtonEcom';
// import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import FormInput from '../../../../Common/Form/FormInput';
import { EditCategory, EditCategoryReset, EditSelection } from '../../../../store/actions/ecomAdmin';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from '../../../../WebsiteTemplateCustomization/WebsiteNewTemplateEcommerce/CommonComponent/CommonJsx/Toast/Toast';
import { sendCategoryDataToProductList, sendUNCategoryDataToProductList } from '../../../../store/actions/ecommerce/action/product';
import { SettingPopup } from '../CategorySettingPopup/SettingPopup';
import { useDetectOutsideClick } from '../../../../Common/DetectOutsideClick/useDetectOutsideClick';
import { useRef } from 'react';

const CategoryBox = ({ data, dropdownRef, categoryName, productCount, isParent, id, mainKey, startValue, DragHover, DragHoverCount, parentIndex,
  ChildIndex, subChildIndex, isChildren, isSubChildren, unCategorised, dragHoverError, openSettingpop, setOpenSettingpop, dragItem
}) => {

  const dispatch = useDispatch();

  const { users, getCategoryEditSuccess, getCategoryEditLoading,
    getCategorylistData } = useSelector((state) => {
      return {
        users: state.user,
        getCategoryEditSuccess: state.ecomAdmin.edit.success,
        getCategoryEditLoading: state.ecomAdmin.edit.loading,
        getCategorylistData: state.ecomAdmin.list.data,
      }
    })

  const history = useNavigate()
  const [showPopup, setShowPopup] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  const [showOnHeader, setShowOnHeader] = useState(false);
  const [showOnFooter, setShowOnFooter] = useState(false);
  // open setting icon popup
  // const [openSettingpop, setOpenSettingpop] = useDetectOutsideClick(dropdownRef, false);

  useEffect(() => {
    if (data) {
      setShowOnFooter(data.show_on_footer)
      setShowOnHeader(data.show_on_header)
    }
  }, [data])


  const dataPrepUpdate = (value, header, footer) => {
    switch (value.category_level) {
      case 1:
        return {
          owner: users._id,
          business: users.user_business,
          category_level: 1,
          _id: value._id,
          show_on_header: header,
          show_on_footer: footer
        }

      case 2:
        return {
          owner: users._id,
          business: users.user_business,
          category_level: 2,
          _id: value._id,
          show_on_header: header,
          show_on_footer: footer
        }

      default:
        return {
          owner: users._id,
          business: users.user_business,
          category_level: 0,
          _id: value._id,
          show_on_header: header,
          show_on_footer: footer
        }
    }
  }
  const InputChangeHeader = (e) => {
    let value = e.target.checked
    setShowOnHeader(value)
    dispatch(EditCategory(dataPrepUpdate(data, value, showOnFooter)))
  }
  const InputChangeFooter = (e) => {
    let value = e.target.checked

    dispatch(EditCategory(dataPrepUpdate(data, showOnHeader, value)))
    setShowOnFooter(value)
  }

  useEffect(() => {
    if (getCategoryEditSuccess) {
      dispatch(EditCategoryReset());
      setDeleteData({});
      if (openSettingpop) {
        setOpenSettingpop("");
      }
    }

  }, [dispatch, getCategoryEditSuccess, openSettingpop, setOpenSettingpop])

  const dragStart = (e, position) => {
    dragItem.current = position;
    startValue(position)
  };

  const deleteVarHandler = () => {
    dispatch(EditCategory(dataPrep(deleteData, true), "delete"))
  }

  const EditCategoryDetails = (data) => {
    dispatch(EditSelection(data))
  }
  const handelIsHide = (data) => {
    dispatch(EditCategory(dataPrep(data, false)))
  }
  const handelDelete = (data) => {
    setDeleteData(data)
  }

  const dataPrep = (value, isDeleted) => {
    switch (value.category_level) {
      case 1:
        return {
          owner: users._id,
          business: users.user_business,
          category_level: 1,
          _id: value._id,
          isHide: value.isHide ? false : true,
          isDeleted: isDeleted,
        }

      case 2:
        return {
          owner: users._id,
          business: users.user_business,
          category_level: 2,
          isDeleted: isDeleted,
          isHide: value.isHide ? false : true,
          _id: value._id
        }

      default:
        return {
          owner: users._id,
          business: users.user_business,
          category_level: 0,
          isDeleted: isDeleted,
          isHide: value.isHide ? false : true,
          _id: value._id
        }
    }
  }
  const routeToProductList = (data, type) => {
    let propData = {}
    if (type === "category") {
      propData = {
        category: data,
        uncategory: false
      }
    } else {
      propData = {
        category: [],
        uncategory: true
      }
    }

    dispatch(sendCategoryDataToProductList({ propData }))
    history("/ecommerce/productList")

  }
  const UncategorizedRouteToProductList = (value) => {
    // history({
    //   pathname: "/ecommerce/productList",
    //   state: { UnCatData: value }
    // })
    if (value) {
      dispatch(sendUNCategoryDataToProductList(value))
      history("/ecommerce/productList")
    }

  }
  const inputFeatureChange = (e, value) => {
    data = {
      owner: users._id,
      business: users.user_business,
      category_level: value.category_level,
      _id: value._id,
      featured: e.target.checked
    }
    dispatch(EditCategory(data))
  }

  const ChangeSettingpop = (data) => {
    if (openSettingpop === data) {
      setOpenSettingpop("")
    } else {
      setOpenSettingpop(data)
    }
  }
  const setCloseEye = (isHide, value) => {
    data = {
      owner: users._id,
      business: users.user_business,
      category_level: value.category_level,
      _id: value._id,
      isHide: isHide
    }
    dispatch(EditCategory(data))
  }
  return (
    <React.Fragment>
      {DragHover ? (
        <div className='categoryBox-wrapper' >
          <div className='categoryBox-container'>
            <div className='categoryBox-container-leftsidebar' >
              <div className={`categoryBox-div ${isChildren ? 'childCategory ' : ''} ${isSubChildren ? "subChildCategory" : ''} ${dragHoverError ? 'dragErrorState' : 'dragSuccessState'}`}>
                {/* <div className={`categoryBox-div subChildCategory`}> */}
                <div className='categoryBox-leftsidebar'>
                  <div className='categoryBox'>
                    <div className='box-text'>
                      {dragHoverError ? (
                        <>
                          <span className='text-xxs w-400 '>Cannot Drag Same Name Error</span>
                        </>
                      ) : (
                        <>
                          <span className='text-xxs w-400 secondary'> Drag Here</span>
                        </>
                      )}

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='categoryBox-wrapper' draggable={!unCategorised} onDragStart={(e) => dragStart(e, mainKey)}   >
          <div className='categoryBox-container'>
            <div className='categoryBox-container-leftsidebar' >
              <div className={`categoryBox-div ${isChildren ? 'childCategory ' : ''} ${isSubChildren ? "subChildCategory" : ''}`}>
                <div className='categoryBox-leftsidebar'>
                  <div className='categoryBox'>
                    {/* {changeName === data._id ? (
                      <div className='box-text'>
                        <FormInput value={newName} onChange={(e) => setNewName(e.target.value)} />
                      </div>) : (
                    )} */}
                    <div className='box-text'>
                      {!unCategorised ? (
                        <>
                          <img src={Dotted} alt="" className='' /> <span className='text-xxs w-400 base' onClick={() => routeToProductList(data, "category")} >{categoryName} ({(productCount)})</span>
                        </>

                      ) : (
                        <>
                          <img src={Dotted} alt="" className='' /> <span className='text-xxs w-400 base' onClick={() => routeToProductList(true)} >{categoryName} ({(productCount)})</span>
                        </>
                      )

                      }
                    </div>
                  </div>
                </div>
                <div className='categoryBox-rightsidebar'  >
                  {!unCategorised &&
                    <div className='box-icons'>
                      <i className='ed-icon i-xxs base icon-pencial' onClick={() => EditCategoryDetails(data)}></i>
                      {/* <i className='ed-icon i-xs base icon-delete' onClick={() => handelDelete(data)}></i> */}
                      {/* {!unCategorised && data.isHide ? (
                      <i className="ed-icon i-xs base icon-cross" onClick={() => handelIsHide(data)}></i>
                    ) : (
                      < i className='ed-icon i-xs base icon-eye' onClick={() => handelIsHide(data)} ></i>
                    )} */}
                      <div className='setting-wrapper'>
                        <i className='ed-icon i-xs base icon-setting position-relative' onClick={() => ChangeSettingpop(data._id)}></i>
                      </div>

                    </div>
                  }
                  {/* open pop up when delete icon is click */}
                  {!unCategorised && deleteData._id === data._id && <DeleteConfirmPOP handleAcceptPopup={() => setDeleteData({})} deleteVarHandler={() => deleteVarHandler()} loading={getCategoryEditLoading} />}
                </div>

                {!unCategorised && openSettingpop === data._id &&
                  <SettingPopup showOnHeader={showOnHeader} InputChangeHeader={(e) => InputChangeHeader(e)}
                    InputChangeFooter={(e) => InputChangeFooter(e)}
                    showOnFooter={showOnFooter}
                    inputFeatureChange={(e, value) => inputFeatureChange(e, value)}
                    data={data}
                    isParent={isParent}
                    setCloseEye={(value) => setCloseEye(value, data)}
                    handelDelete={() => handelDelete(data)}
                    dropdownRef={dropdownRef}
                  />
                }
              </div>
            </div>
            {/* {/* {
              isParent && !unCategorised ? (
                <React.Fragment>
                  <div className='categoryBox-container-rightsidebar'>
                    <div className='categoryList-switchDiv'>
                      <div className='switchDivleftsidebar'>
                        <p className='text-3xs w-400 base'>show in header3</p>
                      </div>
                      <div className='switchDivrightsidebar'>
                        <SwitchButtonEcom id={'switch' + id} isFeatured={showOnHeader} InputChange={(e) => InputChangeHeader(e)} />
                      </div>
                    </div>
                    <div className='categoryList-switchDiv mt-8'>
                      <div className='switchDivleftsidebar'>
                        <p className='text-3xs w-400 base'>show in footer</p>
                      </div>
                      <div className='switchDivrightsidebar'>
                        <SwitchButtonEcom id={'switch1' + id} isFeatured={showOnFooter} InputChange={(e) => InputChangeFooter(e)} />
                      </div>
                    </div>
                  </div>
                </React.Fragment>

              ) : null
            } */}
          </div >
        </div >
      )

      }
      {showPopup && <Toast text={"Cannot show categories more than 16 on footer"} />}

    </React.Fragment >

  )
}

export default CategoryBox