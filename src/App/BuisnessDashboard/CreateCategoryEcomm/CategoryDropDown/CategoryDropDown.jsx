import React, { useRef } from 'react';
import { useState } from 'react';
import './categoryDropDown.scss';
import { useDetectOutsideClick } from '../../../../Common/DetectOutsideClick/useDetectOutsideClick';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
// import { useRaf } from 'rooks';

const CategoryDropDown = ({ position, setSelectedCategroy, addProduct, editProductCategory, cancel }) => {
  const openref = useRef(null);
  const [openDropDown, setOpenDropDown] = useDetectOutsideClick(openref, false);
  const [Category, setCategroy] = useState("Parent");
  const { users, getCategorylistSuccess, getCategorylistData, EditSelectionSuccess,
    EditSelectionData, createCategorySuccess, EditCategorySuccess } = useSelector((state) => {
      return {
        users: state.user,
        getCategorylistSuccess: state.ecomAdmin.list.success,
        getCategorylistData: state.ecomAdmin.list.data,
        EditSelectionSuccess: state.ecomAdmin.editSelection.success,
        EditSelectionData: state.ecomAdmin.editSelection.data,
        EditCategorySuccess: state.ecomAdmin.edit.success,
        createCategorySuccess: state.ecomAdmin.create.success,
      }
    })


  // useEffect(() => {
  //   if (editProductCategory !== "" || editProductCategory !== undefined || editProductCategory !== null) {
  //     setCategroy(editProductCategory)
  //   }
  // }, [editProductCategory])

  useEffect(() => {
    if (cancel) {
      setCategroy("Parent");
    }
  }, [cancel])

  useEffect(() => {
    if (EditSelectionSuccess && getCategorylistData && getCategorylistSuccess && EditSelectionData) {
      let categoryName = ""
      // let subcategoryName = ""
      let category = {}
      let subcategory = {}
      switch (EditSelectionData.category_level) {
        case 0:
          categoryName = getCategorylistData.data.find((item) => item._id === EditSelectionData._id).categoryName
          setCategroy("Parent")
          break
        case 1:
          category = getCategorylistData.data.find((item) => item._id === EditSelectionData.categoryId)
          categoryName = category.categoryName
          // subcategory = category.subcategories.find((item) => item._id === EditSelectionData._id)
          setCategroy(`${categoryName}`)
          break
        case 2:
          category = getCategorylistData.data.find((item) => item._id === EditSelectionData.categoryId)
          categoryName = category.categoryName
          subcategory = category.subcategories.find((item) => item._id === EditSelectionData.subCategoryId)
          // let subsubcategory = subcategory.subsubcategories.find((item) => item._id === EditSelectionData._id)
          // let subsubcategoryName = subsubcategory.subSubCategoryName
          setCategroy(`${categoryName}>${subcategory.subCategoryName}`)
          break

        default:
          break;
      }

    }
  }, [EditSelectionSuccess, getCategorylistData, getCategorylistSuccess, EditSelectionData])

  const handleOpenDrop = () => {
    setOpenDropDown(true);
  }

  // const [isOver, setIsOver] = useState(false)

  // const handleChangeBgColr = () => {
  //   setIsOver(!isOver)
  // }

  useEffect(() => {
    if (createCategorySuccess || EditCategorySuccess) {
      setCategroy("Parent");
    }
  }, [EditCategorySuccess, createCategorySuccess])

  const onChangeCategorySelect = (value, item) => {

    setSelectedCategroy(value, item);
    if (value === "Parent") {
      setCategroy("Parent")
    } else {
      // heirarchyName(item)
      setCategroy(item)
    }
    setOpenDropDown(false);
  }

  return (
    <React.Fragment>
      <div className='categoryContainer'>
        <div className="category-dropdown">
          <button className="categoryDropDpwn-btn"
            disabled={EditSelectionSuccess && EditSelectionData ? true : false}
            onClick={handleOpenDrop}>{Category ? Category : "Select Category"} <i className={`icon-openIcon icons icon-dropdown icons-s ${openDropDown ? 'rotate-icon' : ''}`}> </i> </button>
          <div className={`dropdown-content ${openDropDown ? '' : 'displayShow '} ${position === 'top' ? 'top' : 'bottom'}`} ref={openref}>
            {addProduct ? ("") : (<ul onClick={() => onChangeCategorySelect("Parent")}>Parent</ul>)}
            <React.Fragment>
              {getCategorylistSuccess && getCategorylistData.data.length > 0 ? getCategorylistData.data.map((item, key) => {
                return (
                  <React.Fragment key={key}>
                    <ul onClick={() => onChangeCategorySelect(item, item.categoryName)}>{item.categoryName}</ul>
                    {item.subcategories?.length > 0 ? item.subcategories.map((subItem, subkey) => {
                      return (
                        <React.Fragment key={subkey}>
                          <ul onClick={() => onChangeCategorySelect(subItem, `${item.categoryName} > ${subItem.subCategoryName}`)}>{`${item.categoryName} > ${subItem.subCategoryName}`}</ul>
                          {
                            addProduct && subItem.subsubcategories?.length > 0 ? subItem.subsubcategories.map((subSubItem, subSubKey) => {
                              return (
                                <React.Fragment key={subSubKey}>
                                  <ul onClick={() => onChangeCategorySelect(subSubItem, `${item.categoryName} > ${subItem.subCategoryName} > ${subSubItem.subSubCategoryName}`)}>{`${item.categoryName} > ${subItem.subCategoryName} > ${subSubItem.subSubCategoryName}`}</ul>
                                </React.Fragment>
                              )
                            }) : ("")
                          }
                        </React.Fragment>
                      )
                    }) : ("")
                    }
                  </React.Fragment>
                )
              }) : ("")
              }
            </React.Fragment>
          </div>
        </div>
      </div>
    </React.Fragment >
  )
}

export default CategoryDropDown