import React from 'react';
import './categoryList.scss';
// import EcomCard from '../EcomCard/EcomCard';
import CategoryBox from '../CategoryBox/CategoryBox';
// import SwitchButton from '../../../../../../Common/SwitchButton';
import { useState } from 'react';
import SwitchButtonEcom from '../../../Dashboard/EcommerceDashboard/Component/SwitchButtonEcom/SwitchButtonEcom';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { EditCategory, EditCategoryPosition, EditCategoryReset, EditDragDropCategory, EditSelection, getAllCategoryList } from '../../../../store/actions/ecomAdmin';
import { getInstituteData, patchInstituteInfo } from '../../../../store/actions/businessInfo';
import UseOutsideClick from '../../../../Common/UseOutsideClick';
import { Ecomm_Admin_ActionTypes } from '../../../../store/actions/ecomAdmin/ActionType';
import { SettingPopup } from '../CategorySettingPopup/SettingPopup';
// import CategoryFillDetails from '../CategoryFillDetail/CategoryFillDetails';
const CategoryList = () => {

  const dispatch = useDispatch();
  const { users, getCategorylistSuccess, getCategorylistData, getCategoryEditSuccess, getbusinessInfoSuccess,
    getbusinessInfoData, expandListSuccess,
    expandListData } = useSelector((state) => {
      return {
        users: state.user,
        getbusinessInfoSuccess: state.businessInfo.getInstituiteData.success,
        getbusinessInfoData: state.businessInfo.getInstituiteData.data,
        getCategorylistSuccess: state.ecomAdmin.list.success,
        getCategorylistData: state.ecomAdmin.list.data,
        getCategorylistUncategorizedCount: state.ecomAdmin.list.data.UncategorizedCount,
        getCategoryEditSuccess: state.ecomAdmin.edit.success,
        expandListSuccess: state.ecomAdmin.expandList.success,
        expandListData: state.ecomAdmin.expandList.data
      }
    })

  const dropdownRef = useRef(null);
  const dropdownShopRef = useRef(null);
  const [CategorylistData, setCategorylistData] = useState([])
  const [editDetails, setEditDetails] = useState()
  const [expendModal, setExpendModal] = useState([]);
  const [expendSubCategory, setExpendSubCategory] = useState([]);
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);
  const [openSettingpop, setOpenSettingpop] = useState("")
  const [openSettingShopPop, setOpenSettingShopPop] = useState("")
  const [dragStart, setDragStart] = useState({});
  const [dragHover, setDragHover] = useState({});
  // console.log(expendModal, "line 45", expendSubCategory)

  UseOutsideClick(dropdownRef, () => {
    if (openSettingpop) setOpenSettingpop(false);
  });
  UseOutsideClick(dropdownShopRef, () => {
    if (openSettingShopPop) setOpenSettingShopPop(false);
  });

  useEffect(() => {
    dispatch(getAllCategoryList(users.user_business))
  }, [])

  useEffect(() => {
    dispatch(getInstituteData(users.user_business, users.user_business_type));
  }, [])

  useEffect(() => {

    if (getCategorylistSuccess && getCategorylistData.data) {
      setCategorylistData(getCategorylistData.data)
    }

  }, [getCategorylistSuccess,
    getCategorylistData.data])

  // useEffect(() => {
  //   dispatch(getInstituteData(users.user_business, users.user_business_type));
  // }, [dispatch, users]);

  const handleExpend = (parent) => {

    if (expendModal.includes(parent)) {
      let newinputs = expendModal.filter(
        (student) => student !== parent
      );
      setExpendModal([...newinputs]);
    } else {
      let modalPush = expendModal
      modalPush.push(parent)
      setExpendModal([...modalPush])
    }
  }

  const handleExpendSubCategory = (subCat) => {
    // let modalPush = expendSubCategory
    if (expendSubCategory.includes(subCat)) {
      let newinputs = expendSubCategory.filter((item => item !== subCat))
      setExpendSubCategory([...newinputs])
    } else {
      let modalPush = expendSubCategory
      modalPush.push(subCat)
      setExpendSubCategory([...modalPush])
      // let newinput = expendSubCategory.push(subCat)
      // setExpendSubCategory([...newinput])
    }
  }


  const startValue = (position, value, parentIndex, ChildIndex, subChildIndex) => {

    let data = {
      position: position,
      value: value,
      parentIndex: parentIndex,
      ChildIndex: ChildIndex,
      subChildIndex: subChildIndex
    }
    setDragStart(data)
  }

  const dragEnter = (e, _id, position, value, parentIndex, ChildIndex, subChildIndex,) => {
    if (dragStart.value === "Parent") {
      if (value === "Parent") {
        let data = {
          position: position,
          value: value,
          parentIndex: parentIndex,
          ChildIndex: ChildIndex,
          subChildIndex: subChildIndex,
          match: _id,
          showError: false
        }
        dragOverItem.current = position;
        setDragHover(data)
      }
      if (value === "Child") {
        let checksubsubCatExist = CategorylistData[dragStart.parentIndex].subcategories.length > 0 && CategorylistData[dragStart.parentIndex].subcategories[0].subsubcategories.length > 0 ? true : false
        let checkSameShiftLevel = CategorylistData[parentIndex]
        let checkSameLevel = CategorylistData[dragStart.parentIndex]
        if (!checksubsubCatExist) {
          if (checkSameShiftLevel._id === checkSameLevel._id) {
          } else {
            let transferData = CategorylistData[dragStart.parentIndex]
            let nameExit = CategorylistData[parentIndex].subcategories.find((item) => item.subCategoryName === transferData.categoryName)
            if (nameExit) {
              let data = {
                position: position,
                value: value,
                parentIndex: parentIndex,
                ChildIndex: ChildIndex,
                subChildIndex: subChildIndex,
                match: _id,
                showError: true
              }
              dragOverItem.current = position;
              setDragHover(data)
            } else {
              let data = {
                position: position,
                value: value,
                parentIndex: parentIndex,
                ChildIndex: ChildIndex,
                subChildIndex: subChildIndex,
                match: _id,
                showError: false
              }
              dragOverItem.current = position;
              setDragHover(data)
              // console.log(data)
            }

          }
        }
      }
      if (value === "subChild") {
        let checkSameLevel = CategorylistData[dragStart.parentIndex]
        let checkSameShiftLevel = CategorylistData[dragHover.parentIndex]
        let checksubsubCatExist = CategorylistData[dragStart.parentIndex].subcategories.length > 0 && CategorylistData[dragStart.parentIndex].subcategories[0].subsubcategories.length > 0 ? true : false
        if (!checksubsubCatExist) {
          if (checkSameShiftLevel._id === checkSameLevel._id) {
          } else {
            let transferData = CategorylistData[dragStart.parentIndex]
            let nameExit = CategorylistData[parentIndex].subcategories[ChildIndex].subsubcategories.find((item) => item.subSubCategoryName === transferData.categoryName)
            if (nameExit) {
              let data = {
                position: position,
                value: value,
                parentIndex: parentIndex,
                ChildIndex: ChildIndex,
                subChildIndex: subChildIndex,
                match: _id,
                showError: true
              }
              dragOverItem.current = position;
              setDragHover(data)
            } else {
              let data = {
                position: position,
                value: value,
                parentIndex: parentIndex,
                ChildIndex: ChildIndex,
                subChildIndex: subChildIndex,
                match: _id,
                showError: false
              }
              dragOverItem.current = position;
              setDragHover(data)
            }
          }
        }
      }
    }
    if (dragStart.value === "Child") {
      // console.log("line 186")
      if (value === "Parent") {
        // console.log("line 188", dragStart, dragHover)
        let transferData = CategorylistData[dragStart.parentIndex].subcategories[dragStart.ChildIndex]
        let nameExit = CategorylistData.find((item) => item.categoryName === transferData.subCategoryName)
        if (nameExit) {
          let data = {
            position: position,
            value: value,
            parentIndex: parentIndex,
            ChildIndex: ChildIndex,
            subChildIndex: subChildIndex,
            match: _id,
            showError: true
          }
          dragOverItem.current = position;
          setDragHover(data)
          // console.log(data)
        } else {
          let data = {
            position: position,
            value: value,
            parentIndex: parentIndex,
            ChildIndex: ChildIndex,
            subChildIndex: subChildIndex,
            match: _id,
            showError: false
          }
          dragOverItem.current = position;
          setDragHover(data)
          // console.log(data)
        }

      }
      if (value === "Child") {
        // console.log("line 153")
        let checkSameLevel = CategorylistData[dragStart.parentIndex]
        let checkSameShiftLevel = CategorylistData[parentIndex]
        // console.log(checkSameLevel, checkSameShiftLevel, "line 186")
        if (checkSameShiftLevel._id === checkSameLevel._id) {
          let data = {
            position: position,
            value: value,
            parentIndex: parentIndex,
            ChildIndex: ChildIndex,
            subChildIndex: subChildIndex,
            match: _id,
            showError: false
          }
          dragOverItem.current = position;
          setDragHover(data)
        } else {
          let transferData = CategorylistData[dragStart.parentIndex].subcategories[dragStart.ChildIndex]
          let nameExit = CategorylistData[parentIndex].subcategories.find((item) => item.subCategoryName === transferData.subCategoryName)
          if (nameExit) {
            let data = {
              position: position,
              value: value,
              parentIndex: parentIndex,
              ChildIndex: ChildIndex,
              subChildIndex: subChildIndex,
              match: _id,
              showError: true
            }
            dragOverItem.current = position;
            setDragHover(data)
            // console.log(data)
          } else {
            let data = {
              position: position,
              value: value,
              parentIndex: parentIndex,
              ChildIndex: ChildIndex,
              subChildIndex: subChildIndex,
              match: _id,
              showError: false
            }
            dragOverItem.current = position;
            setDragHover(data)
            // console.log(data)
          }
        }
      }
      if (value === "subChild") {
        let checkSameLevel = CategorylistData[dragStart.parentIndex]
        let checkSameShiftLevel = CategorylistData[parentIndex]
        // console.log(checkSameLevel, checkSameShiftLevel, "line 186")
        if (checkSameShiftLevel._id === checkSameLevel._id) {
          // console.log("DONT MOVE")
        } else {
          let transferData = CategorylistData[dragStart.parentIndex].subcategories[dragStart.ChildIndex]
          let nameExit = CategorylistData[parentIndex].subcategories[ChildIndex].subsubcategories.find((item) => item.subSubCategoryName === transferData.subCategoryName)
          if (nameExit) {
            let data = {
              position: position,
              value: value,
              parentIndex: parentIndex,
              ChildIndex: ChildIndex,
              subChildIndex: subChildIndex,
              match: _id,
              showError: true
            }
            dragOverItem.current = position;
            setDragHover(data)
            // console.log(data)
          } else {
            let data = {
              position: position,
              value: value,
              parentIndex: parentIndex,
              ChildIndex: ChildIndex,
              subChildIndex: subChildIndex,
              match: _id,
              showError: false
            }
            dragOverItem.current = position;
            setDragHover(data)
            // console.log(data)
          }
        }
      }
    }
    if (dragStart.value === "subChild") {
      // console.log("subcat 123")
      if (value === "Parent") {
        // console.log("subcat 123 Parent")
        let transferData = CategorylistData[dragStart.parentIndex].subcategories[dragStart.ChildIndex].subsubcategories[dragStart.position]
        let nameExit = CategorylistData.find((item) => item.categoryName === transferData.subSubCategoryName)
        if (nameExit) {
          let data = {
            position: position,
            value: value,
            parentIndex: parentIndex,
            ChildIndex: ChildIndex,
            subChildIndex: subChildIndex,
            match: _id,
            showError: true
          }
          dragOverItem.current = position;
          setDragHover(data)
          // console.log(data)
        } else {
          let data = {
            position: position,
            value: value,
            parentIndex: parentIndex,
            ChildIndex: ChildIndex,
            subChildIndex: subChildIndex,
            match: _id,
            showError: false
          }
          dragOverItem.current = position;
          setDragHover(data)
          // console.log(data)
        }
      }
      if (value === "Child") {
        let transferData = CategorylistData[dragStart.parentIndex].subcategories[dragStart.ChildIndex].subsubcategories[dragStart.position]
        let nameExit = CategorylistData[parentIndex].subcategories.find((item) => item.subCategoryName === transferData.subSubCategoryName)
        if (nameExit) {
          let data = {
            position: position,
            value: value,
            parentIndex: parentIndex,
            ChildIndex: ChildIndex,
            subChildIndex: subChildIndex,
            match: _id,
            showError: true
          }
          dragOverItem.current = position;
          setDragHover(data)
          // console.log(data)
        } else {
          let data = {
            position: position,
            value: value,
            parentIndex: parentIndex,
            ChildIndex: ChildIndex,
            subChildIndex: subChildIndex,
            match: _id,
            showError: false
          }
          dragOverItem.current = position;
          setDragHover(data)
          // console.log(data)
        }
      }
      if (value === "subChild") {
        let checkSameLevel = CategorylistData[dragStart.parentIndex].subcategories[dragStart.ChildIndex]
        let checkSameShiftLevel = CategorylistData[parentIndex].subcategories[ChildIndex]
        // console.log(checkSameLevel, checkSameShiftLevel, "line 186")
        if (checkSameShiftLevel._id === checkSameLevel._id) {
          let data = {
            position: position,
            value: value,
            parentIndex: parentIndex,
            ChildIndex: ChildIndex,
            subChildIndex: subChildIndex,
            match: _id,
            showError: false
          }
          dragOverItem.current = position;
          setDragHover(data)
        } else {
          let transferData = CategorylistData[dragStart.parentIndex].subcategories[dragStart.ChildIndex].subsubcategories[dragStart.position]
          let nameExit = CategorylistData[parentIndex].subcategories[ChildIndex].subsubcategories.find((item) => item.subSubCategoryName === transferData.subSubCategoryName)
          if (nameExit) {
            let data = {
              position: position,
              value: value,
              parentIndex: parentIndex,
              ChildIndex: ChildIndex,
              subChildIndex: subChildIndex,
              match: _id,
              showError: true
            }
            dragOverItem.current = position;
            setDragHover(data)
            // console.log(data)
          } else {
            let data = {
              position: position,
              value: value,
              parentIndex: parentIndex,
              ChildIndex: ChildIndex,
              subChildIndex: subChildIndex,
              match: _id,
              showError: false
            }
            dragOverItem.current = position;
            setDragHover(data)
            // console.log(data)
          }
        }
      }
    }
  };

  useEffect(() => {
    // console.log("lin1 105")
    if (getCategoryEditSuccess) {
      dispatch(EditCategoryReset())
      setEditDetails();
    }

  }, [getCategoryEditSuccess])

  const drop = () => {
    // console.log("line 114", dragStart, dragHover)

    if (dragStart?.value === "Parent") {
      if (dragHover.value === "Parent") {
        let transferData = CategorylistData[dragStart.position]

        let data = {
          category_level: transferData.category_level,
          Category: transferData._id,
          business: users.user_business,
          oldPosition: dragStart.position,
          newPos: dragHover.position
        }

        dispatch(EditCategoryPosition(data))
      }
      if (dragHover.value === "Child" && !dragHover.showError) {
        // console.log("line 153")
        let checksubsubCatExist = CategorylistData[dragStart.parentIndex].subcategories.length > 0 && CategorylistData[dragStart.parentIndex].subcategories[0].subsubcategories.length > 0 ? true : false
        let checkSameShiftLevel = CategorylistData[dragHover.parentIndex]
        let checkSameLevel = CategorylistData[dragStart.parentIndex]
        // console.log(checkSameLevel, checkSameShiftLevel, "line 186", checksubsubCatExist)
        if (!checksubsubCatExist) {
          if (checkSameShiftLevel._id === checkSameLevel._id) {
            let transferData = CategorylistData[dragStart.parentIndex]
            let data = {
              category_level: transferData.category_level,
              Category: transferData._id,
              business: users.user_business,
              oldPosition: dragStart.position,
              newPos: dragHover.position
            }
            dispatch(EditCategoryPosition(data))
          } else {
            // console.log("line 130")
            let transferData = CategorylistData[dragStart.parentIndex]
            let inputFields = CategorylistData
            // let filterData = CategorylistData
            let data = {
              ...CategorylistData[dragStart.parentIndex],
              position: dragHover.position,
              subCategoryName: transferData.categoryName,
              category_level: 1,
            }
            inputFields[dragHover.parentIndex].subcategories.splice([dragHover.position], 0, data)
            // console.log(inputFields, "line 140", data, "pikahuc 222")

            // inputFields.splice([dragStart.position], 1)
            inputFields.splice(dragStart.position, 1)
            // console.log(inputFields, "lin2 142")
            let finalData = {
              business: users.user_business,
              category: transferData._id,
              subcategory: "",
              subsubcategory: "",
              movinglevel: 1,
              movingcategoryid: checkSameShiftLevel._id,
              movingcategoryupperid: "",
              newPos: dragHover.position
            }
            dispatch(EditDragDropCategory(finalData))
            setCategorylistData([...inputFields])
          }
        }
      }
      if (dragHover.value === "subChild" && !dragHover.showError) {
        let checkSameLevel = CategorylistData[dragStart.parentIndex]
        let checkSameShiftLevel = CategorylistData[dragHover.parentIndex]
        let checksubsubCatExist = CategorylistData[dragStart.parentIndex].subcategories.length > 0 && CategorylistData[dragStart.parentIndex].subcategories[0].subsubcategories.length > 0 ? true : false
        if (checksubsubCatExist) {
          // console.log(checkSameLevel, checkSameShiftLevel, "line 186")
          if (checkSameShiftLevel._id === checkSameLevel._id) {
            let transferData = CategorylistData[dragStart.parentIndex]
            let data = {
              category_level: transferData.category_level,
              Category: transferData._id,
              business: users.user_business,
              oldPosition: dragStart.position,
              newPos: dragHover.position
            }
            dispatch(EditCategoryPosition(data))
          } else {
            let transferData = CategorylistData[dragStart.parentIndex]
            let inputFields = CategorylistData
            // let filterData = CategorylistData
            let pikachu = CategorylistData.splice([dragStart.position], 1)
            // console.log(pikachu, "line 200")

            let data = {
              ...pikachu[0],
              subSubCategoryName: pikachu[0].subCategoryName,
              position: dragHover.position
            }
            // console.log(data, "line 205")

            inputFields[dragHover.parentIndex].subcategories[dragHover.ChildIndex].subsubcategories.splice([dragHover.position], 0, data)
            let finalData = {
              business: users.user_business,
              category: "",
              subcategory: transferData._id,
              subsubcategory: "",
              movinglevel: 2,
              movingcategoryid: CategorylistData[dragHover.parentIndex].subcategories[dragHover.ChildIndex]._id,
              movingcategoryupperid: CategorylistData[dragHover.parentIndex]._id,
              newPos: dragHover.position
            }
            // console.log(inputFields, "line 218  ")
            dispatch(EditDragDropCategory(finalData))
            setCategorylistData([...inputFields])
          }
        }
      }
    }
    if (dragStart?.value === "Child") {
      if (dragHover.value === "Parent" && !dragHover.showError) {
        // console.log("subcat 123 Parent")
        let transferData = CategorylistData[dragStart.parentIndex].subcategories[dragStart.ChildIndex]
        // console.log(transferData, "line 127")
        let changeData = {
          productCount: transferData.productCount ? transferData.productCount : 0,
          _id: 442121233,
          categoryName: transferData.subCategoryName,
          category_level: 0,
          position: dragHover.position
        }

        let inputFields = CategorylistData
        let filterData = CategorylistData
        let pikachu = filterData[dragStart.parentIndex].subcategories.splice([dragStart.position], 1)
        // console.log(pikachu, "line 140", filterData)
        inputFields[dragStart.parentIndex]["Child"] = pikachu
        // console.log(inputFields, "line 142")
        inputFields.splice(dragHover.position, 0, changeData)
        setCategorylistData([...inputFields])
        let finalData = {
          business: users.user_business,
          category: "",
          subcategory: transferData._id,
          subsubcategory: "",
          movinglevel: 0,
          movingcategoryid: "",
          movingcategoryupperid: "",
          newPos: dragHover.position
        }
        dispatch(EditDragDropCategory(finalData))

      }
      if (dragHover.value === "Child" && !dragHover.showError) {
        // console.log("line 153")
        let checkSameLevel = CategorylistData[dragStart.parentIndex]
        let checkSameShiftLevel = CategorylistData[dragHover.parentIndex]
        // console.log(checkSameLevel, checkSameShiftLevel, "line 186")
        if (checkSameShiftLevel._id === checkSameLevel._id) {
          let transferData = CategorylistData[dragStart.parentIndex].subcategories[dragStart.ChildIndex]

          let data = {
            category_level: transferData.category_level,
            Category: transferData._id,
            business: users.user_business,
            oldPosition: dragStart.position,
            newPos: dragHover.position
          }

          dispatch(EditCategoryPosition(data))
        } else {
          let transferData = CategorylistData[dragStart.parentIndex].subcategories[dragStart.ChildIndex]
          let inputFields = CategorylistData
          let filterData = CategorylistData
          let pikachu = filterData[dragStart.parentIndex].subcategories.splice([dragStart.position], 1)
          let data = {
            ...pikachu[0],
            position: dragHover.position
          }
          inputFields[dragHover.parentIndex].subcategories.splice([dragHover.position], 0, data)
          let finalData = {
            business: users.user_business,
            category: "",
            subcategory: transferData._id,
            subsubcategory: "",
            movinglevel: 1,
            movingcategoryid: CategorylistData[dragHover.parentIndex]._id,
            movingcategoryupperid: "",
            newPos: dragHover.position
          }
          dispatch(EditDragDropCategory(finalData))
          setCategorylistData([...inputFields])
        }
      }
      if (dragHover.value === "subChild" && !dragHover.showError) {
        let checkSameLevel = CategorylistData[dragStart.parentIndex]
        let checkSameShiftLevel = CategorylistData[dragHover.parentIndex]
        // console.log(checkSameLevel, checkSameShiftLevel, "line 186")
        if (checkSameShiftLevel._id === checkSameLevel._id) {
          let transferData = CategorylistData[dragStart.parentIndex].subcategories[dragStart.ChildIndex]
          let data = {
            category_level: transferData.category_level,
            Category: transferData._id,
            business: users.user_business,
            oldPosition: dragStart.position,
            newPos: dragHover.position
          }
          dispatch(EditCategoryPosition(data))
        } else {
          let transferData = CategorylistData[dragStart.parentIndex].subcategories[dragStart.ChildIndex]
          // let changeData = {
          //   productCount: transferData.productCount ? transferData.productCount : 0,
          //   _id: 12333,
          //   subSubCategoryName: transferData.subSubCategoryName,
          //   position: dragHover.position
          // }
          // let transferData = CategorylistData[dragStart.parentIndex].subcategories[dragStart.ChildIndex]
          let inputFields = CategorylistData
          let filterData = CategorylistData
          let pikachu = filterData[dragStart.parentIndex].subcategories.splice([dragStart.position], 1)
          // console.log(pikachu, "line 200")

          let data = {
            ...pikachu[0],
            subSubCategoryName: pikachu[0].subCategoryName,
            position: dragHover.position
          }
          // console.log(data, "line 205")

          inputFields[dragHover.parentIndex].subcategories[dragHover.ChildIndex].subsubcategories.splice([dragHover.position], 0, data)
          let finalData = {
            business: users.user_business,
            category: "",
            subcategory: transferData._id,
            subsubcategory: "",
            movinglevel: 2,
            movingcategoryid: CategorylistData[dragHover.parentIndex].subcategories[dragHover.ChildIndex]._id,
            movingcategoryupperid: CategorylistData[dragHover.parentIndex]._id,
            newPos: dragHover.position
          }
          // console.log(inputFields, "line 218  ")
          dispatch(EditDragDropCategory(finalData))
          setCategorylistData([...inputFields])
        }
      }
    }
    if (dragStart?.value === "subChild") {
      // console.log("subcat 123")
      if (dragHover.value === "Parent" && !dragHover.showError) {
        // console.log("subcat 123 Parent")
        let transferData = CategorylistData[dragStart.parentIndex].subcategories[dragStart.ChildIndex].subsubcategories[dragStart.position]
        // console.log(transferData, "line 127")
        let changeData = {
          productCount: transferData.productCount ? transferData.productCount : 0,
          _id: 121233,
          categoryName: transferData.subSubCategoryName,
          category_level: 0,
          position: dragHover.position
        }

        let inputFields = CategorylistData
        let filterData = CategorylistData
        let pikachu = filterData[dragStart.parentIndex].subcategories[dragStart.ChildIndex].subsubcategories.splice([dragStart.position], 1)
        // console.log(pikachu, "line 140", filterData)
        inputFields[dragStart.parentIndex].subcategories[dragStart.ChildIndex]["subChildren"] = pikachu
        // console.log(inputFields, "line 142")
        inputFields.splice(dragHover.position, 0, changeData)
        setCategorylistData([...inputFields])
        let finalData = {
          business: users.user_business,
          category: "",
          subcategory: "",
          subsubcategory: transferData._id,
          movinglevel: 0,
          movingcategoryid: "",
          movingcategoryupperid: "",
          newPos: dragHover.position
        }
        dispatch(EditDragDropCategory(finalData))
      }
      if (dragHover.value === "Child" && !dragHover.showError) {
        let transferData = CategorylistData[dragStart.parentIndex].subcategories[dragStart.ChildIndex].subsubcategories[dragStart.position]
        let changeData = {
          productCount: transferData.productCount ? transferData.productCount : 0,
          _id: 1232222,
          subCategoryName: transferData.subSubCategoryName,
          position: dragHover.position
        }
        let inputFields = CategorylistData
        // inputFields[dragStart.parentIndex].subcategories.push(changeData)
        let filterData = CategorylistData
        let pikachu = filterData[dragStart.parentIndex].subcategories[dragStart.ChildIndex].subsubcategories.splice([dragStart.position], 1)
        inputFields[dragStart.parentIndex].subcategories[dragStart.ChildIndex]["subChildren"] = pikachu
        inputFields[dragStart.parentIndex].subcategories.splice(dragHover.position, 0, changeData)
        let finalData = {
          business: users.user_business,
          category: "",
          subcategory: "",
          subsubcategory: transferData._id,
          movinglevel: 1,
          movingcategoryid: CategorylistData[dragHover.parentIndex]._id,
          movingcategoryupperid: "",
          newPos: dragHover.position
        }
        dispatch(EditDragDropCategory(finalData))
        setCategorylistData([...inputFields])

      }
      if (dragHover.value === "subChild" && !dragHover.showError) {
        let checkSameLevel = CategorylistData[dragStart.parentIndex].subcategories[dragStart.ChildIndex]
        let checkSameShiftLevel = CategorylistData[dragHover.parentIndex].subcategories[dragHover.ChildIndex]
        // console.log(checkSameLevel, checkSameShiftLevel, "line 186")
        if (checkSameShiftLevel._id === checkSameLevel._id) {
          let transferData = CategorylistData[dragStart.parentIndex].subcategories[dragStart.ChildIndex].subsubcategories[dragStart.position]
          let data = {
            category_level: transferData.category_level,
            Category: transferData._id,
            business: users.user_business,
            oldPosition: dragStart.position,
            newPos: dragHover.position
          }

          dispatch(EditCategoryPosition(data))
        } else {
          let transferData = CategorylistData[dragStart.parentIndex].subcategories[dragStart.ChildIndex].subsubcategories[dragStart.position]
          let changeData = {
            productCount: transferData.productCount ? transferData.productCount : 0,
            _id: 12333,
            subSubCategoryName: transferData.subSubCategoryName,
            position: dragHover.position
          }
          let inputFields = CategorylistData
          // inputFields[dragStart.parentIndex].subcategories[dragStart.ChildIndex].push(changeData)
          let filterData = CategorylistData
          let pikachu = filterData[dragStart.parentIndex].subcategories[dragStart.ChildIndex].subsubcategories.splice([dragStart.position], 1)
          inputFields[dragStart.parentIndex].subcategories[dragStart.ChildIndex]["subChildren"] = pikachu
          inputFields[dragStart.parentIndex].subcategories[dragStart.ChildIndex].subsubcategories.splice(dragHover.position, 0, changeData)
          setCategorylistData([...inputFields])
          let finalData = {
            business: users.user_business,
            category: "",
            subcategory: "",
            subsubcategory: transferData._id,
            movinglevel: 2,
            movingcategoryid: CategorylistData[dragHover.parentIndex].subcategories[dragHover.ChildIndex]._id,
            movingcategoryupperid: CategorylistData[dragHover.parentIndex]._id,
            newPos: dragHover.position
          }
          // console.log(finalData, "line 793")
          dispatch(EditDragDropCategory(finalData))
        }
      }
    }
    setDragStart({})
    setDragHover({})
  }

  const [shopShowOnHeader, setShopShowOnHeader] = useState(false);
  const [shopShowOnFooter, setShopShowOnFooter] = useState(false);

  useEffect(() => {
    if (getbusinessInfoSuccess && getbusinessInfoData) {
      setShopShowOnHeader(getbusinessInfoData.show_shop_on_header)
      setShopShowOnFooter(getbusinessInfoData.show_shop_on_footer)
    }
  }, [getbusinessInfoSuccess, getbusinessInfoData])


  const InputChangeHeader = (e) => {
    let value = e.target.checked
    setShopShowOnHeader(value)
    let data = {
      show_shop_on_header: value
    }
    dispatch(patchInstituteInfo(users.user_business, data, users.user_business_type, "", "", true));
  }

  const InputChangeFooter = (e) => {
    let value = e.target.checked
    setShopShowOnFooter(value)
    let data = {
      show_shop_on_footer: value
    }
    dispatch(patchInstituteInfo(users.user_business, data, users.user_business_type, "", "", true));
  }

  useEffect(() => {
    if (expandListSuccess && expandListData) {
      if (expandListData.category && expandListData.subCategory) {
        setExpendModal(expandListData.category)
        setExpendSubCategory(expandListData.subCategory)
      } else if (expandListData.category) {
        setExpendModal(expandListData.category)
      }

      dispatch({
        type: Ecomm_Admin_ActionTypes.ECOMM_ADMIN_CATEGORY_EXPAND_LIST_REST,
      })
    }
  }, [expandListSuccess, expandListData])

  const EditCategoryDetails = () => {
    let data = {
      shop: true,
      categoryName: getbusinessInfoData.shop_name
    }
    dispatch(EditSelection(data))
  }
  return (
    <React.Fragment>
      <div className='category-list-container'>
        <div className='category-list-heading-div'>
          <p className='text-xs w-400 base'>Category</p>
        </div>
        <hr className='line' />
        {getCategorylistSuccess && getbusinessInfoData ? (
          <React.Fragment>
            <div className='categoryList-wrapper' >
              <div className='categoryList-shopleftsidebar'>
                <div className='categoryList-icon-wrapper'>
                  <div className='expend-leftsidebar visibilityNone '>
                    <i className='ed-icon  base    icon-expendmin'></i>
                  </div>
                  <div className='expend-rightSidebar'>
                    <div className='shop-box'>
                      <div className='shopBox-leftSide'>
                        <p className='text-xxs w-400 base'>{getbusinessInfoData.shop_name ? getbusinessInfoData.shop_name : "Shop"}</p>
                      </div>
                      <div className='shopbox-rightSide'>
                        <i className='ed-icon i-xxs base icon-pencial' onClick={EditCategoryDetails}></i>
                        <i className='ed-icon i-xs base icon-setting position-relative' onClick={() => setOpenSettingShopPop(!openSettingShopPop)}></i>
                      </div>
                      {
                        openSettingShopPop && <SettingPopup dropdownRef={dropdownShopRef} isParent={true} showOnHeader={shopShowOnHeader} showOnFooter={shopShowOnFooter} InputChangeFooter={InputChangeFooter} shop={true} InputChangeHeader={InputChangeHeader} openSettingpop={openSettingpop} setOpenSettingpop={setOpenSettingpop} />
                      }
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className='categoryList-shoprightsidebar'>
                <div className='categoryList-switchDiv'>
                  <div className='categoryList-switchDiv-leftSidebar'>
                    <p className='text-3xs base w-400'>show in header</p>
                  </div>
                  <div className='categoryList-switchDiv-rightSidebar'>
                    <SwitchButtonEcom id={'allProduct'} isFeatured={shopShowOnHeader} InputChange={(e) => InputChangeHeader(e)} />
                  </div>
                </div>
              </div> */}
            </div>
            <div className='categoryList-parent-container' >
              {getCategorylistSuccess &&
                getCategorylistData?.data.length > 0 && CategorylistData.length > 0 ?
                CategorylistData.map((category, parent) => {
                  return (
                    <div className='categoryList-dropdown'>
                      <div className='categoryList-leftsidebar' onDragEnter={(e) => dragEnter(e, category._id, parent, "Parent", parent)} onDragEnd={() => drop()}>
                        <div className='categoryList-expeped-div' key={parent} aria-disabled="false" >
                          <div className={`categoryList-expeped-div-leftSidebar ${category?.subcategories?.length > 0 ? '' : 'visibilityNone'}`} onClick={() => handleExpend(category._id)}>
                            {
                              expendModal.includes(category._id) ? <i className='ed-icon  base    icon-expendmin'></i> : <i className='ed-icon  base icon-expendPlus'></i>
                            }
                          </div>
                          <div className={`categoryList-expeped-div-rightSidebar ${expendModal.includes(category._id) ? 'mt-8' : ''}`} >
                            {dragHover.match === category._id && <CategoryBox DragHover={category.categoryName} isChildren={false} isSubChildren={false}
                              DragHoverCount={10} dragHoverError={dragHover.showError} dropdownRef={dropdownRef} />}
                            <CategoryBox unCategorised={false} dropdownRef={dropdownRef} data={category} categoryName={category.categoryName} productCount={category.productsTotal} isParent={true} id={category._id} mainKey={parent} dragItem={dragItem} openSettingpop={openSettingpop} setOpenSettingpop={(value) => setOpenSettingpop(value)} startValue={(value) => startValue(value, "Parent", parent)} isChildren={false} isSubChildren={false} />
                          </div>
                        </div>
                      </div>
                      <div className={`lower-category ${expendModal.includes(category._id) ? '' : 'displayNone'}`}>
                        {
                          category.subcategories && category.subcategories.map((subCategory, child) => {
                            return (
                              <div className='categoryList-dropDown-div mt-12' key={subCategory._id}>
                                {/* children box is showing here  */}
                                <div className='categoryList-expeped-div position-relative' onDragEnter={(e) => dragEnter(e, subCategory._id, child, "Child", parent, child)} onDragEnd={() => drop()}>
                                  {
                                    <div className={`categoryList-expeped-div-leftSidebar categoryList-position ${subCategory?.subsubcategories?.length > 0 ? '' : 'visibilityNone'}`} onClick={() => handleExpendSubCategory(subCategory._id)}>
                                      {
                                        expendSubCategory.includes(subCategory._id) ? <i className='ed-icon  base    icon-expendmin'></i> : <i className='ed-icon  base icon-expendPlus'></i>
                                      }
                                    </div>
                                  }
                                  <div className='categoryList-expeped-div-rightSidebar'>
                                    {dragHover.match === subCategory._id && <CategoryBox dropdownRef={dropdownRef} DragHover={subCategory.subCategoryName} isChildren={true} isSubChildren={false}
                                      DragHoverCount={9} dragHoverError={dragHover.showError} />}
                                    <CategoryBox unCategorised={false} dropdownRef={dropdownRef} data={subCategory} categoryName={subCategory.subCategoryName} productCount={subCategory.productsTotal} isParent={false} id={subCategory._id} mainKey={child} dragItem={dragItem} openSettingpop={openSettingpop} setOpenSettingpop={(value) => setOpenSettingpop(value)} startValue={(value) => startValue(value, "Child", parent, child)} isChildren={true} isSubChildren={false}
                                      EditCategoryDetails={(data) => EditCategoryDetails(data)}
                                    />
                                  </div>
                                </div>
                                {expendSubCategory.includes(subCategory._id) &&
                                  <div className={`lower-category ${expendSubCategory.includes(subCategory._id) ? '' : 'displayNone'}`} >
                                    {
                                      subCategory?.subsubcategories && subCategory.subsubcategories.map((subChildCategory, subChildkey) => {
                                        return (
                                          <React.Fragment>
                                            <div className='sub-category-dropDown-div mt-12' onDragEnter={(e) => dragEnter(e, subChildCategory._id, subChildkey, "subChild", parent, child, subChildkey)} onDragEnd={() => drop()}>
                                              {/* {dragHover.value === "subChild" && dragHover.parentIndex === parent && dragHover.ChildIndex === child && dragHover.subChildIndex === subChildkey &&
                                            <CategoryBox DragHover={"Charizard"} isChildren={false} isSubChildren={true} DragHoverCount={11} />
                                          } */}
                                              {dragHover.match === subChildCategory._id &&
                                                <CategoryBox dropdownRef={dropdownRef} DragHover={subChildCategory.subSubCategoryName} isChildren={false} isSubChildren={true} dragHoverError={dragHover.showError} />
                                              }
                                              <CategoryBox dropdownRef={dropdownRef}
                                                unCategorised={false} dragItem={dragItem} openSettingpop={openSettingpop} setOpenSettingpop={(value) => setOpenSettingpop(value)} data={subChildCategory} categoryName={subChildCategory.subSubCategoryName} productCount={subChildCategory.productsTotal} isParent={false} id={subChildCategory._id} mainKey={subChildkey} startValue={(value) => startValue(value, "subChild", parent, child, subChildkey)} isChildren={false} isSubChildren={true} />
                                            </div>
                                          </React.Fragment>
                                        )
                                      })
                                    }
                                  </div>}
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
                  )
                }) : ("")
              }
              {getCategorylistSuccess &&
                getCategorylistData?.data &&
                < div className='categoryList-dropdown space-left '>
                  <div className='categoryList-leftsidebar'>
                    <div className='categoryList-expeped-div' >
                      <div className={`categoryList-expeped-div-leftSidebar`}>
                      </div>
                      <div className={`categoryList-expeped-div-rightSidebar`} >
                        <CategoryBox unCategorised={true} dropdownRef={dropdownRef} categoryName={"Uncategorised"} productCount={getCategorylistData.UncategorizedCount} isParent={true} isChildren={false} isSubChildren={false} />
                      </div>
                    </div>
                  </div>
                </div>
              }

            </div>
          </React.Fragment>
        ) : (
          " Loading......"
        )

        }

      </div >

    </React.Fragment >
  )
}

export default CategoryList