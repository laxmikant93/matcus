import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import Category from "./Category";
import './categoryCheckbox.scss'
const CategoryCheckboxFilter = ({ data, success, handleCategoryFilters, level, dropdownNamefirst, dropdownNameSecond, dropdownNameThird }) => {

  const [isOpen, setIsOpen] = useState(false);

  const { categoryList } = useSelector((state) => {
    return {
      categoryList: state.catergoryFilter.list.data
    }
  })

  const handleOpenGender = (value) => {
    setIsOpen(value)
  }
  useEffect(() => {
    if (categoryList[0]._id.length > 0 || categoryList[1]._id.length > 0 || categoryList[2]._id.length > 0) {
      setIsOpen(true)
    }
  }, [categoryList])
  // const [selectedSubCat, setselectedSubCat] = useState([]);

  return (
    <React.Fragment>
      <div className="category-wrapper-common">
        <div className="select_wrap">
          {/* <div
            className={`caret-dropdown ${DropCheckToggle ? "active" : ""}`}
          ></div> */}
          <button
            className={`collapase-btn ${isOpen ? "collapseActive" : ""}`}
            onClick={() => handleOpenGender(!isOpen)}
          >
            {"Categories"}
          </button>
          {isOpen && (
            <ul className="select_Check_ul">
              {!success ? (
                <li className="option">
                  <label>Loading</label>
                </li>
              ) : (
                success && isOpen && (
                  <React.Fragment>

                    {success && data.length ? data.map((item, key) => {
                      return (
                        <React.Fragment key={key}>

                          <Category data_lvl1={item}
                            dropdownNamefirst={dropdownNamefirst}
                            dropdownNameSecond={dropdownNameSecond}
                            dropdownNameThird={dropdownNameThird} />

                        </React.Fragment>)
                    }) : ("")}
                  </React.Fragment>
                )
              )}
            </ul>
          )}
        </div>
      </div>
      {/* <div className='category-container'>
        <button className={`collapase-btn ${isOpen ? "active" : ""}`} active onClick={() => handleOpenGender(!isOpen)}>Categories</button>
        {
          isOpen ? (
            <div className={`collapse-content ${isOpen ? "showCollapse-content" : ""}`}>
              <div className='category-filter-container'>
                <p>All</p>
                <input type="checkbox" id="vehicle1"
                  name="vehicle1" value='' onChange={(e) => handleCategoryFilters("All")} />
              </div>
              {success && data.length ? data.map((item, key) => {
                return (
                  <Category data_lvl1={item} />
                  <React.Fragment key={key}>
                    <div className='category-filter-container'>
                      <input type="checkbox" id="vehicle1" checked={selectedSubCat.includes(item._id) ? true : false} name="vehicle1" value={item["categoryName"]} onChange={() => handleCategoryFilters(0, item)} />
                      <p>{item["categoryName"]}</p>
                    </div>
                    {level > 1 && item["subcategories"]?.length > 0 ? item["subcategories"].map((subItem, subkey) => {
                      return (
                        <React.Fragment key={subkey}>
                          <>
                            <div className='category-filter-container'>
                              <input type="checkbox" id="vehicle1" checked={selectedSubCat.includes(subItem._id) ? true : false} name="vehicle1" value={`${subItem["subCategoryName"]}`} onChange={(e) => { handleCategoryFilters(1, subItem) }} />
                              <p>{`${subItem["subCategoryName"]}`}</p>
                            </div>
                          </>
                          {level > 2 && subItem["subsubcategories"]?.length > 0 ? subItem["subsubcategories"].map((subSubItem, subSubKey) => {
                            return (
                              <React.Fragment key={subSubKey}>
                                <>
                                  <div className='category-filter-container'>
                                    <input type="checkbox" id="vehicle1" checked={selectedSubCat.includes(subSubItem._id) ? true : false} name="vehicle1" value={`${subSubItem["subSubCategoryName"]}`} onChange={(e) => { handleCategoryFilters(2, subSubItem) }} />
                                    <p>{`${subSubItem["subSubCategoryName"]}`}</p>
                                  </div>
                                </>
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
            </div>
          ) : ("")
        }

      </div> */}
    </React.Fragment>
  )
}
export default CategoryCheckboxFilter