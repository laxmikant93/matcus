import React, { useLayoutEffect } from 'react';
import { useRef } from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CategoryCheckboxFilter from '../../../../Common/CategoryCheckboxFilter';
import './shopSidebar.scss';
import FormError from '../../../../Common/Form/FormError';
import RenderFilter from '../../../../Common/FilterCollapse/RenderFilter';

const ShopSidebar = ({
  upperPrice,
  lowerPrice,
  selectedColl,
  selectedColor,
  selectedSubCat,
  collList,
  colorList,
  subCatList,
  upperProdPrice,
  varList,
  currFilter,
  handleFilters,
  handleCategoryFilters,
  handleCollectionFilters,
  handleCollectionFiltersAll,
  handlePrice,
  onBlureHandlePrice,
  error,
  dynamicVariantList,
  setDynamicVariantList,
  dynamicFilterHandler,
  dynamicFilterDataSuccess,
  handleClearFilter,
  selectedDynamicFilter,
  lowerProdPrice
}) => {
  const [isGenderOpen, setIsGenderOpen] = useState(false);
  const [isColorOpen, setIsColorOpen] = useState(false);
  const [isPriceOpen, setPriceIsOpen] = useState(false);
  const [isCollOpen, setIsCollOpen] = useState(false);
  const [colourList, setColourList] = useState([]);
  const [minValue, setMinValue] = useState(0);
  const [maxnValue, setMaxValue] = useState(100000);

  const { getCategorylistSuccess, getCategorylistData, } = useSelector((state) => {
    return {
      getCategorylistSuccess: state.ecomAdmin.list.success,
      getCategorylistData: state.ecomAdmin.list.data,
    }
  })

  useLayoutEffect(() => {
    if (currFilter?.substring(0, 2) === 'sc') {
      setIsGenderOpen(true);
    }
    if (currFilter?.substring(0, 2) === 'co') {
      setIsCollOpen(true);
    }
  }, []);

  useEffect(() => {
    if (varList && Object.keys(varList).includes('color')) {
      setColourList(varList.color);
    }
  }, [varList])

  const [otherFilter, setOtherFilter] = useState(-1);

  const handleCategory = (id) => {
    setOtherFilter(otherFilter === id ? -1 : id)
  }

  const handleOpenGender = (e) => {

    setIsGenderOpen((prev) => prev = !prev)
  }

  const handleOpenColor = (e) => {

    setIsColorOpen((prev) => prev = !prev)
  }

  const handleOpenPrice = (e) => {

    setPriceIsOpen((prev) => prev = !prev)
  }

  const handleOpenColl = (e) => {

    setIsCollOpen((prev) => prev = !prev)
  }

  const DropCheckToggleRef = useRef(null);
  // console.log(upperProdPrice,
  //   lowerPrice,
  //   upperPrice, "line 95")
  return (
    <React.Fragment>
      <div className='shopPage-sidebar-container'>
        <div className='shopSidebar-top-wrap'>
          <div className='shopSidebar-top-wrap-head'>
            <p>Filter</p>
            <span onClick={(e) => { handleClearFilter() }}>Clear All</span>
          </div>
          <RenderFilter>
            <div className='shopsibar-collap'>

              <CategoryCheckboxFilter success={getCategorylistSuccess} data={getCategorylistData.data} handleCategoryFilters={() => handleCategoryFilters()} level={3} ref={DropCheckToggleRef} dropdownNamefirst={"categoryName"} dropdownNameSecond={"subCategoryName"} dropdownNameThird={"subSubCategoryName"} />

              {colourList && colourList.length > 0 && <div className='category-container'>
                <button className={`collapase-btn ${isColorOpen ? "active" : ""}`} active onClick={handleOpenColor}>Colour</button>
                <div className={`collapse-content collapase-shortHeight  ${isColorOpen ? "showCollapse-content" : ""}`}>
                  <div className='color-filter-container'>
                    {
                      colourList.map((option, i) => {
                        return (
                          <div key={i} className={`circleOutside ${selectedColor.includes(option) ? 'activeCircle ' : ''}`}>
                            <div
                              className='circle'
                              style={{ backgroundColor: option }}
                              onClick={() => { handleFilters('color', option) }}
                            ></div>
                          </div>
                          // <div key={i} className={`div-circle circleOutside ${selectedColor.includes(option) ? 'activeCircle ': ''}`} onClick={() => { handleFilters('color', option) }} style={{ backgroundColor: option }}></div>
                        )
                      })
                    }
                  </div>
                </div>
              </div>}

              {/* price sidebar  */}
              <div className='category-container'>
                <button className={`collapase-btn ${isPriceOpen ? "active" : ""}`} active onClick={handleOpenPrice}>Price</button>
                <div className={`collapse-content collapase-rangeHeight  ${isPriceOpen ? "showCollapse-content" : ""}`}>
                  <div className='price-filter-wrapper'>
                    <div className="rangeLable">
                      <label htmlFor="min-value" className='price-label'>Rs. {lowerProdPrice}</label>
                      <label htmlFor="max-value" className='price-label'>Rs. {upperProdPrice}</label>
                    </div>
                    <div className='price-filter-container'>
                      <input type="range" min={lowerProdPrice} max={upperProdPrice} id='slider-1' value={lowerPrice} step={10} onChange={(e) => { handlePrice('lowPrice', e.target.value) }} onMouseLeave={() => { onBlureHandlePrice() }} />
                      <input type="range" min={lowerProdPrice} max={upperProdPrice} value={upperPrice} id='slider-2' step={10} onChange={(e) => { handlePrice('upperPrice', e.target.value) }} onMouseLeave={() => { onBlureHandlePrice() }} />
                    </div>
                    <div className='priceValue-wrap'>
                      <div className='priceValue-min-wrap'>

                        <input type="number" id="min-value" value={lowerPrice} name='min-value' onChange={(e) => { handlePrice('lowPrice', e.target.value) }} />
                      </div>
                      <div className='price-range-p'>
                        <p>to</p>
                      </div>
                      <div className='priceValue-max-wrap'>
                        <input type="number" id="max-value" value={upperPrice} onChange={(e) => { handlePrice('upperPrice', e.target.value) }} onKeyUp={() => { onBlureHandlePrice() }} onBlur={() => { onBlureHandlePrice() }} />
                      </div>
                    </div>

                    <div>
                      <FormError
                        show={error}
                        error="The price entered should be greater than starting price!"
                        className='visitorFormError'
                      />
                    </div>


                  </div>
                </div>
              </div>
              {/* collection */}
              <div className='category-container'>
                <button className={`collapase-btn ${isCollOpen ? "active" : ""}`} active onClick={handleOpenColl}>Collection</button>
                <div className={`collapse-content ${isCollOpen ? "showCollapse-content" : ""}`}>
                  <div className='category-filter-container'>
                    <p>All</p>
                    <input type="checkbox" id="vehicle1" checked={selectedColl.length === collList.length ? true : false} name="vehicle1" value="" onClick={(e) => { handleCollectionFiltersAll(e) }} />
                  </div>
                  {
                    collList && collList.length > 0 && collList.map((option, i) => {
                      return (
                        <div className='category-filter-container' key={i}>
                          <p>{option.collectionName}</p>
                          <input type="checkbox" id="vehicle1" checked={selectedColl.includes(option._id) ? true : false} name="vehicle1" value={option._id} onClick={(e) => { handleCollectionFilters(e.target.value) }} />
                        </div>
                      )
                    })
                  }
                </div>
              </div>
              {/* //TODO ui is not design for below code for dynamic filter */}
              {
                dynamicFilterDataSuccess && dynamicVariantList.length > 0 && dynamicVariantList.map((item, i, index) => {
                  return (
                    <div className='category-container'>
                      <button className={`collapase-btn ${otherFilter === item._id ? "active" : ""}`} active onClick={() => handleCategory(item._id)}>{item.title}</button>
                      {
                        otherFilter === item._id ? (
                          <div className={`collapse-content ${otherFilter === item._id ? "showCollapse-content" : ""}`} key={index}>
                            <div className='filter-menu-list'>
                              <h4 className='filter-heading-text'></h4>
                              {
                                item.value.length > 0 && item.value.map((elem, j) => {
                                  return (
                                    <div className='category-filter-container filter-list-menu' key={j}>
                                      <p className='filter-checkbox-para'>{elem}</p>
                                      <input type="checkbox" id="vehicle1"
                                        // checked={selectedDynamicFilter.includes(elem) ? true : false} 
                                        checked={selectedDynamicFilter.some((e) => e.value === elem)}
                                        name={item.title}
                                        value={elem}
                                        onClick={(e) => { dynamicFilterHandler(e.target.name, e.target.value) }}
                                      />
                                    </div>
                                  )
                                })
                              }
                            </div>

                          </div>
                        ) : ""
                      }

                    </div>
                  )
                })
              }
            </div>
          </RenderFilter>

        </div>




      </div>
    </React.Fragment >
  )
}

export default ShopSidebar