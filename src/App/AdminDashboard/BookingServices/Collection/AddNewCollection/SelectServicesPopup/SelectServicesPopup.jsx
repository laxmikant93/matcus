import React, { useEffect } from 'react';
import CheckboxInput from '../../../../../../Common/Form/CheckboxInput';
import SelectInput from '../../../../../../Common/Form/SelectInput';
import Modals from '../../../../../../Common/Modals';
import ModalBody from '../../../../../../Common/Modals/ModalsBody';
import ModalHeader from '../../../../../../Common/Modals/ModalsHeader';
import SearchControl from '../../../../../../Common/SearchControl';
import './selectServicesPopup.scss';
import BackPain from '../backPain.png';
import { useRef } from 'react';
import { useState } from 'react';
import UseOutsideClick from '../../../../../../Common/UseOutsideClick';
import { useDetectOutsideClick } from '../../../../../../Common/DetectOutsideClick/useDetectOutsideClick';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAllMainCategoryList, getServicesBycategories } from '../../../../../../store/actions/bookAppointment';
import NoDataAvailable from '../../../../../../Common/NoDataAvailable';

const SelectServicesPopup = ({ openpopup, onclose, selectedService, serviceListnewData }) => {
  const dispatch = useDispatch();
  const [searchCollection, setsearchCollection] = useState("")
  const [unCategorized, setUnCategorized] = useState(false)
  const [searchTerm, setsearchTerm] = useState("")
  const [serviceIds, setServiceIds] = useState([])
  const servicesList = [1, 2, 3, 4, 5];
  const checkboxRef = useRef(null);
  const openDropDownRef = useRef(null);
  const [openDropDown, setOpenDropDown] = useDetectOutsideClick(openDropDownRef, false);
  const [categoryIds, setcategoryIds] = useState([])


  useEffect(() => {
    setServiceIds(serviceListnewData)
  }, [serviceListnewData])

  // console.log(serviceListnewData)


  const { user, institute, owner, serviceListsuccess, serviceList, firstTimeSuccess, categoryList, categoryListSuccess
  } = useSelector((state) => {
    return {
      user: state.user,
      institute: state.user.user_institute,
      owner: state.user._id,
      businesstype: state.user.user_business_type,
      serviceListsuccess: state.bookAppointment.serviceListByCategories.success,
      serviceList: state.bookAppointment.serviceListByCategories,
      categoryListSuccess: state.bookAppointment.getMainCategoryList.success,
      categoryList: state.bookAppointment.getMainCategoryList.data,
    };
  });

  useEffect(() => {
    dispatch(getAllMainCategoryList(institute, owner, user.user_business_type))
  }, [dispatch, institute, owner, user.user_business_type]);

  const closeModal = () => {
    onclose();
  }

  useEffect(() => {
    dispatch(getServicesBycategories(institute, owner, "", user.user_business_type, {}, true))
  }, [dispatch, institute, owner, user.user_business_type])

  const handleOpenDropDown = () => {
    setOpenDropDown(!openDropDown);
  }

  // useEffect(() => {
  //   let selectedList = [];
  //   if (serviceListnewData && serviceListnewData.length > 0) {
  //     selectedList = serviceListnewData.map((v, i) => {
  //       return v._id;
  //     });
  //   }
  //   if (serviceListnewData) {
  //     const arr = serviceListnewData.map((v, i) => {
  //       let obj = selectedList.includes(v._id) ? { ...v, select: true } : { ...v, select: false };
  //       return obj;
  //     });
  //     setcategoryIds([...arr]);
  //   }
  // }, [serviceListnewData]);
  // console.log(categoryIds)

  // console.log(serviceIds)
  // console.log(serviceListnewData)

  const handleCategoryFilters = (e, item, type) => {
    let inputChecked = e.target.checked
    // console.log(item)
    let array = categoryIds
    if (inputChecked) {
      array.push(item._id)
    } else {
      let index = array.indexOf(item._id)
      array.splice(index, 1)
    }
    setcategoryIds([...array])
  }


  const handleAllCategory = (event) => {

    if (event.target.checked) {
      let newArr = []
      for (let i = 0; i < categoryList.length; i++) {
        newArr.push(categoryList[i]._id)
      } setcategoryIds(newArr)
    }
    else {
      setcategoryIds([])
    }
  }

  const handleCheckUncategorized = (e) => {
    let inputChecked = e.target.checked
    if (inputChecked) {
      setUnCategorized(true)
    } else {
      setUnCategorized(false)
    }
  }

  const handleSave = () => {
    selectedService(serviceIds)
    closeModal()
  }

  const handleCategorySearch = (e) => {
    setsearchCollection(e.target.value)
  }

  const handleResetCategory = () => {
    setsearchCollection("")
  }

  const categoryApplyButton = () => {
    if (categoryIds.length > 0 || unCategorized) {
      dispatch(getServicesBycategories(institute, owner, "", user.user_business_type, { categoryId: categoryIds, unCategorized: unCategorized }))
    } else {
      dispatch(getServicesBycategories(institute, owner, "", user.user_business_type))
    }
    setOpenDropDown(false)
  }

  let typing;
  const handlesearchTerm = (evt) => {
    evt.preventDefault();
    clearTimeout(typing)
    setsearchTerm(evt.target.value);
    if (!evt.target.value) {
      dispatch(getServicesBycategories(institute, owner, "", user.user_business_type))
      clearTimeout(typing)
    }
  }

  useEffect(() => {
    if (searchTerm) {
      dispatch(getServicesBycategories(institute, owner, searchTerm, user.user_business_type))
    } else {
      setsearchTerm("")
    }
  }, [dispatch, institute, owner, searchTerm, user.user_business_type])

  const handlesearchTermReset = () => {
    dispatch(getServicesBycategories(institute, owner, "", user.user_business_type))
  }

  const AllServiceHandle = (e) => {
    var array = []
    if (e.target.checked) {
      for (let i = 0; i < serviceList.data.length; i++) {
        array.push(serviceList.data[i])
      }
      setServiceIds([...array])
    } else {
      setServiceIds([])
    }
  }

  const selectSingleServiceHandle = (e, item) => {
    let inputChecked = e.target.checked;
    let array = serviceIds
    if (inputChecked) {
      array.push(item)
    } else {
      let index = array.indexOf(item)
      array.splice(index, 1)
    }
    setServiceIds([...array])
  }


  const checkExist = (item) => {
    // console.log("line 195", item)
    let a = [];
    a = serviceIds.filter(i => i._id === item._id);
    if (a?.length > 0) {
      return true
    }
    else {
      return false
    }
    // console.log(a)

  }
  // console.log(serviceList,serviceList.data, "line207")

  return (
    <Modals ref={openpopup} Position="center" slide="center" ClosePopUp={() => closeModal()} ModalsSize={'modal-l'}>
      <ModalHeader title={'Select the services to add to center of Excellence'}></ModalHeader>
      <ModalBody className={'services-modal-body'}>
        <div className='servicespopup-container'>
          <div className='servicespopup-search-container'>
            <div className='selected-wrap'>
              <p className='text-xs w-400 base'>Selected {serviceIds?.length}</p>
            </div>
            <div className='dropDown-wrap'>
              <div className='filterby-container'>
                <button className='filter-dropDown-btn' onClick={handleOpenDropDown}>
                  <span className='text-2xs w-500 base dropdown-text'>Filter  </span><i className={`icon-arrow ${openDropDown ? 'icon-rotate' : ''}`}></i>
                </button>
                <div className={`dropDown-content ${openDropDown ? 'displayShow' : ''}`} ref={openDropDownRef}>
                  <div className='dropDownsearch-wrap'>
                    <SearchControl
                      placeholder="Search..."
                      onChange={handleCategorySearch}
                      onKeyUp={handleCategorySearch}
                      reset={() => handleResetCategory()}
                    />
                  </div>
                  <div className='showmore-checkbox-wrapper' >
                    <CheckboxInput
                      label="All"
                      // value={categoryIds}
                      LabelClass={"label-heading eComm-checkbox-center label-heading-margin"}
                      className={"eComm-checkbox"}
                      checked={categoryIds.length == categoryList.length ? true : false}
                      onChange={(e) => handleAllCategory(e)}
                    />
                  </div>
                  {
                    categoryListSuccess && categoryList.length > 0 && categoryList.filter((collection) => {
                      if (searchCollection === "") {
                        return collection;
                      }
                      else if (collection.name.toLowerCase().includes(searchCollection.toLowerCase())) {
                        return collection
                      }
                    }).map((item, key) => {
                      return (
                        <React.Fragment>
                          < div className='filter-option-wrap'>
                            <CheckboxInput
                              label={item.main_category_name}
                              // multiLoop={true}
                              value={item._id}
                              LabelClass={"label-heading eComm-checkbox-center label-heading-margin"}
                              className={"eComm-checkbox"}
                              checked={categoryIds.includes(item._id)}
                              onChange={(e) => handleCategoryFilters(e, item)}
                            />
                            <p className='text-2xs w-400 base'>{item.service?.length}</p>
                          </div>
                        </React.Fragment>
                      )
                    })
                  }
                  <div className='showmore-checkbox-wrapper' >
                    <CheckboxInput
                      label="Uncategorized"
                      // multiLoop={true}
                      // value={unCategorized}
                      LabelClass={"label-heading eComm-checkbox-center label-heading-margin"}
                      className={"eComm-checkbox"}
                      checked={unCategorized}
                      onChange={(e) => handleCheckUncategorized(e)}
                    />
                  </div>
                  <div className='filter-option-btn-wrap '>
                    <button className='button button-primary btn-xs btn-block btn-oval' onClick={() => { categoryApplyButton() }}>Apply</button>
                  </div>
                </div>
              </div>
            </div>
            <div className='search-wrap'>
              <SearchControl
                placeholder="Search..."
                onChange={(e) => handlesearchTerm(e)}
                reset={() => handlesearchTermReset()}
              />
            </div>
          </div>
          <div className='servicesList-container'>
            <div className="gridListTable ">
              <ul className="gridHeader ">
                <React.Fragment>
                  <li className="col text-xs w-500  primary">
                    <div className='serviceHeader-checkbox'>
                      <CheckboxInput
                        label={""}
                        LabelClass={""}
                        className={""}
                        ref={checkboxRef}
                        checked={serviceIds?.length > 0 && serviceIds?.length == serviceList.data.length ? true : false}
                        onChange={(e) => AllServiceHandle(e)}
                      />
                    </div>

                  </li>
                  <li className=" col col-4 text-xs w-400 lgray" style={{ flexBasis: '40%' }}>Name</li>
                  <li className=" col-2 text-xs w-400 lgray " style={{ flexBasis: '20%' }}>Session</li>
                  <li className=" col-2 text-xs w-400 lgray " style={{ flexBasis: '20%' }}>Price</li>
                  <li className=" col-2 text-xs w-400 lgray" style={{ flexBasis: '20%' }}>Category</li>
                </React.Fragment>
              </ul>

              <div className='gridBody varients-after-grid-body '>
                <div className='gridRow varients-grid-row'>
                  <>
                    {serviceListsuccess ?
                      serviceList.data && serviceList.data.length > 0 ?
                        serviceList.data.map((item) => {
                          return (
                            // when need to open full review list 'onClick={onOpenViewReview }'
                            // when to open approve and decline list  onClick={onOpenViewReview }
                            <>
                              <ul className="topInfo"  >
                                <li className='col'>
                                  <div className='checkbox-wrap'>
                                    <CheckboxInput
                                      label={""}
                                      LabelClass={""}
                                      className={""}
                                      // checked={serviceIds.includes(item)}
                                      checked={checkExist(item)}
                                      onChange={(e) => selectSingleServiceHandle(e, item)}
                                    />
                                  </div>
                                </li>
                                <li className="col col-4" style={{ flexBasis: '40%' }}>
                                  <div className='name-wrapper'>
                                    <div className='image-wrap'>
                                      <img src={item.image ? item.image : BackPain} alt="" />
                                    </div>
                                    <p className='text-xs w-500 base'>{item.title}</p>
                                  </div>
                                </li>
                                <li className="col col-2 " style={{ flexBasis: '20%' }} >
                                  <div className='session-wrap'>
                                    <p className='text-xs w-500 base'>{item.duration} mint.</p>
                                  </div>
                                </li>

                                <li className="col col-2" style={{ flexBasis: '20%' }} >
                                  <div className='price-wrap'>
                                    <p className='text-xs w-500 base'><span>&#x20B9;</span> <span>{item.sessionPrice}</span></p>
                                  </div>
                                </li>

                                <li className="col col-2 " style={{ flexBasis: '20%' }}>
                                  <div className='category-wrap'>
                                    <p className='text-xs w-500 base'>{item?.categoryName?.main_category_name} </p>
                                  </div>
                                </li>
                              </ul>
                              <hr className='line' />
                            </>
                          )
                        }) : <NoDataAvailable title="No records found." /> :
                      <div className="loadingGridData"><i className="ed-loadingGrid"></i></div>
                    }
                  </>
                </div>
              </div>
            </div>
          </div>
          <div className='services-btn-wrap' >
            {/* when btn is disable put 'true' */}
            <button className='button button-primary btn-xs' aria-disabled={false} onClick={() => handleSave()}>Add Services</button>
          </div>
        </div>
      </ModalBody>
    </Modals >
  )
}

export default SelectServicesPopup