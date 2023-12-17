import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import DropDown from '../../CommonComponent/CommonJsx/TrueThemeDropDown';
import './shopPage.scss'
// import '../Home/home.scss';
// import '../../HeaderLayout/header.scss';
import heart from '../../assets/images/wishlist.png';
import heartFill from '../../assets/images/wishlistfill.png';
// import NewArrival3 from '../../assets/images/newArrival3.png';
// import NewArrival4 from '../../assets/images/newArrival4.png';
import { Link, Switch, useLocation, useParams } from 'react-router-dom';
import ShopSidebar from '../../CommonComponent/CommonJsx/ShopSidebar';
import { getFileteredProductList, getFilterData, resetProductDetailsPage } from '../../../../store/actions/ecommerce/action/product';
// import AppLink from '..getFilterDataselectedColl/../../../Common/AppLink';
// import { getCollectionList } from '../../../../store/actions/ecommerce/action/collection';
// import { getCategoryList, getSubCategoryList } from '../../../../store/actions/ecommerce/action/category';
// // import { getSavedCustomer } from '../../../../store/actions/ecommerce/action/auth';
// import ComponentLoader from '../../../../Common/Loader/ComponentLoader';
// import MobileBar from '../../CommonComponent/CommonJsx/MobileBar/MobileBar';
// import AppLinkUrl from '../../../../Common/AppLink/AppLinkUrl';
import DefaultImage from '../../assets/images/Product_default.jpg';
import Ribbon from '../../CommonComponent/CommonJsx/Ribbon/Ribbon';
import Pagination from '../../../../Common/Pagination';
import ThreeDotLoader from '../../../../Common/ThreeDotLoader/ThreeDotLoader';
import { clearAllCategory, clearSearchFilter } from "../../../../store/actions/catergoryFilter";
import { useNavigate } from 'react-router-dom';
import { debounce } from '../../../../Common/ImageUploader/UnsplashSection/commonFunction';
import Share from '../../CommonComponent/CommonJsx/Share/Share';
import { useRef } from 'react';
import { resetCollectionFilter } from '../../../../store/actions/collectionfilter';
import { convertToIndianFormat } from '../../../../CommonFunctions/helperFunction';
import { priceCalculator } from '../../CommonComponent/commonFunction/PriceCalculator';

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
const ShopPage = () => {

  const history = useNavigate();
  const shareRef = useRef(null);
  const dispatch = useDispatch();
  let PageSize = 12;
  const query = useQuery()
  const [searchid, setSearchId] = useState("");

  // const [productList, setProductList] = useState([]);
  const [productCount, setProductCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [upperProdPrice, setUpperProdPrice] = useState(10000);
  const [lowerProdPrice, setLowerProdPrice] = useState(1);
  const [collList, setCollList] = useState([]);
  const [varList, setVarList] = useState({});
  const [subCatList, setSubCatList] = useState([]);

  // wishList states
  const [wishlist, setWishList] = useState('')

  /////SELECTED FILTERS
  const [selectedSubCat, setSelectedSubCat] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);
  const [selectedColl, setSelectedColl] = useState([]);

  // const [selectedSort, setSelectedSort] = useState('');
  // const [selectedSize, setSelectedSize] = useState([]);
  // const [businessid, setBusinessId] = useState("")
  const [collectionList, setCollection] = useState()

  let [upperPrice, setUpperPrice] = useState(10000);
  const [lowerPrice, setLowerPrice] = useState(1);
  const [error, setError] = useState(false);


  const [dynamicVariantList, setDynamicVariantList] = useState([]);
  const [selectedDynamicFilter, setSelectedDynamicFilter] = useState([]);

  const [firstLoader, setFirstLoader] = useState(false);

  const { customerProductList } = useSelector((state) => state.productList);
  const { adminCollectionList } = useSelector((state) => state.collectionList);
  const { CategoryList } = useSelector((state) => state.categoryList);

  const [shareshow, setShareShow] = useState(false)
  const [innerWindow, setWindow] = useState({
    width: undefined,
  });
  const { categoryFilterList, collectionFilter, customerProductListLoading, dynamicFilterDataSuccess, dynamicFilterDataList, businessInfoSuccess, customerProductListSuccess,
    customerProductListData, sendCategoryList, showLoader,
    businessInfoData, homePageproducts, currency } = useSelector((state) => {
      return {
        categoryFilterList: state.catergoryFilter.list,
        sendCategoryList: state.catergoryFilter.sendCategoryList,
        collectionFilter: state.collectionFilter.list.data,
        dynamicFilterDataSuccess: state.productList.dynamicFilterGetData.success,
        customerProductListSuccess: state.productList.customerProductList.success,
        customerProductListLoading: state.productList.customerProductList.loading,
        customerProductListData: state.productList.customerProductList.data,
        dynamicFilterDataList: state.productList.dynamicFilterGetData.data,
        showLoader: state.productList.productLoader.showLoader,
        businessInfoSuccess: state.businessInfo.ecomWebsite.success,
        businessInfoData: state.businessInfo.ecomWebsite.data,
        homePageproducts: state.productList.homePageproducts,
        currency: state.currencyList,
      };
    });


  useEffect(() => {
    if (query.get("search")) {
      setSearchId(query.get("search"))
    }
  }, [query])


  useEffect(() => {
    function handleResize() {
      setWindow({
        width: window.innerWidth,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.addEventListener("resize", handleResize);
  }, [])
  // console.log(innerWindow, "line57")

  const WishListHandle = (id) => {
    setWishList(id)

  }

  const RemoveWishListHandle = () => {
    setWishList(false)
  }



  useEffect(() => {
    const handler = (e) => {
      if (shareshow && shareRef.current && !shareRef.current.contains(e.target)) {
        setShareShow(false)
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, [setShareShow])

  const MouseEnter = (id) => {
    setShareShow(id)
  }
  const MouseLeave = () => {
    setShareShow(false)
    // setCopySuccess(false);
  }

  // useEffect(() => {
  //   if (searchid && searchid !== "" && window.location.href.includes("search = ") && businessInfoSuccess && businessInfoData) {
  //     // console.log("line 95")
  //     dispatch(getFileteredProductList(businessInfoData._id, (searchid.replace("sr", "")), { limit: PageSize, skip: (currentPage - 1) * PageSize }));
  //   }
  // }, [PageSize, currentPage, searchid])





  useEffect(() => {
    dispatch(resetProductDetailsPage())
  }, [])
  useEffect(() => {
    if (homePageproducts && homePageproducts.data && homePageproducts.data.BusinessInfo) {

      setCollList(homePageproducts.data.featuredCollection)
    }
  }, [homePageproducts])
  useEffect(() => {
    if (collectionFilter) {
      setSelectedColl(collectionFilter)
    }
  }, [collectionFilter])
  useEffect(() => {
    return () => {
      dispatch(resetCollectionFilter())
    }
  }, [])

  useEffect(() => {
    if (businessInfoSuccess && businessInfoData) {
      // setBusinessId(businessInfoData._id)
      dispatch(getFilterData(businessInfoData._id))
    }
  }, [businessInfoData])

  useEffect(() => {
    if (dynamicFilterDataSuccess && dynamicFilterDataList) {
      if (dynamicFilterDataList.Variations.length > 0) {
        setDynamicVariantList(dynamicFilterDataList.Variations)
      }
      setUpperPrice(dynamicFilterDataList?.Price.max)
      setUpperProdPrice(dynamicFilterDataList?.Price.max)
      setLowerProdPrice(dynamicFilterDataList?.Price.low)
      setLowerPrice(dynamicFilterDataList?.Price.low)
    }
  }, [dynamicFilterDataList])


  useEffect(() => {
    if (customerProductList.success === true && customerProductList.data) {
      // setProductList(customerProductList.data.productlist);
      setProductCount(customerProductListData.productlength)
    }
  }, [customerProductList])
  // TODO  2. Close  new-code.......


  useEffect(() => {

    let sendCateg = [
      {
        category_level: 0,
        _id: sendCategoryList.category_level_Zero
      }, {
        category_level: 1,
        _id: sendCategoryList.category_level_One
      },
      {
        category_level: 2,
        _id: sendCategoryList.category_level_Two
      }]
    if ((categoryFilterList.data[0]._id.length > 0 || categoryFilterList.data[1]._id.length > 0 || categoryFilterList.data[2]._id.length > 0) && selectedColl && selectedDynamicFilter.length > 0) {

      let cate = { "collection": selectedColl, "level": sendCateg, "variants": selectedDynamicFilter, "limit": PageSize, "skip": (currentPage - 1) * PageSize }
      dispatch(getFileteredProductList(businessInfoData._id, (searchid.replace("sr", "")), cate))
    }
    else if ((categoryFilterList.data[0]._id.length > 0 || categoryFilterList.data[1]._id.length > 0 || categoryFilterList.data[2]._id.length > 0) && selectedDynamicFilter) {

      let cate = { "level": sendCateg, "variants": selectedDynamicFilter, "limit": PageSize, "skip": (currentPage - 1) * PageSize }
      // console.log("code executed 267  2...2")
      dispatch(getFileteredProductList(businessInfoData._id, (searchid.replace("sr", "")), cate))
    }
    else if (selectedColl.length > 0 && selectedDynamicFilter.length > 0) {

      let cate = { "collection": selectedColl, "variants": selectedDynamicFilter, "limit": PageSize, "skip": (currentPage - 1) * PageSize };
      // console.log("code executed 272  3...3")
      dispatch(getFileteredProductList(businessInfoData._id, (searchid.replace("sr", "")), cate))
    }
    else if (selectedColl.length > 0) {

      let cate = { "collection": selectedColl, "limit": PageSize, "skip": (currentPage - 1) * PageSize };
      // console.log("code executed 277  4...4")
      dispatch(getFileteredProductList(businessInfoData._id, (searchid.replace("sr", "")), cate))
    }
    else if (categoryFilterList.data[0]._id.length > 0 || categoryFilterList.data[1]._id.length > 0 || categoryFilterList.data[2]._id.length > 0) {

      let cate = { "level": sendCateg, "limit": PageSize, "skip": (currentPage - 1) * PageSize }
      // console.log("code executed 256  1...1")
      dispatch(getFileteredProductList(businessInfoData._id, (searchid.replace("sr", "")), cate))
    }
    else if (selectedDynamicFilter.length > 0) {

      let cate = { "variants": selectedDynamicFilter };
      dispatch(getFileteredProductList(businessInfoData._id, (searchid.replace("sr", "")), cate))
    }
    else {
      // console.log("line 202")
      if (!firstLoader) {
        setTimeout(() => {
          setFirstLoader(true)
        }, 1000);
      } else {
        dispatch(getFileteredProductList(businessInfoData._id, (searchid.replace("sr", "")), { limit: PageSize, skip: (currentPage - 1) * PageSize }))
      }
    }
  }, [currentPage, categoryFilterList, selectedColl, selectedDynamicFilter, sendCategoryList])

  // useEffect(() => {
  //   let sendCateg = [
  //     {
  //       category_level: 0,
  //       _id: sendCategoryList.category_level_Zero
  //     }, {
  //       category_level: 1,
  //       _id: sendCategoryList.category_level_One
  //     },
  //     {
  //       category_level: 2,
  //       _id: sendCategoryList.category_level_Two
  //     }]
  //   if ((categoryFilterList.data[0]._id.length > 0 || categoryFilterList.data[1]._id.length > 0 || categoryFilterList.data[2]._id.length > 0) && selectedColl && selectedDynamicFilter.length > 0) {

  //     let cate = { "collection": selectedColl, "level": sendCateg, "variants": selectedDynamicFilter, "limit": PageSize, "skip": (currentPage - 1) * PageSize }
  //     dispatch(getFileteredProductList(businessInfoData._id, "", cate))
  //   }
  // }, [currentPage])
  // const [colorsArray, setColorsArray] = useState([])
  // const [sizeListArray, setSizeListArray] = useState([])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [categoryFilter, setCategoryFilter] = useState([
    {
      category_level: 0,
      _id: []
    }, {
      category_level: 1,
      _id: []
    },
    {
      category_level: 2,
      _id: []
    }]);

  // const [collection_id, setCollection_id] = useState([]);

  const handleCategoryFilters = (type, item) => {
    switch (type) {
      case 0:
        if (!categoryFilter[0]._id.includes(item._id)) {
          let inputFields = categoryFilter
          inputFields[0]._id.push(item._id)
          setCategoryFilter([...inputFields])
        } else {
          let inputFields = categoryFilter
          inputFields[0]._id.filter((fil) => fil !== item._id)
          setCategoryFilter([...inputFields])
        }

        break;
      case 1:
        if (!categoryFilter[1]._id.includes(item._id)) {
          let inputFields = categoryFilter
          inputFields[1]._id.push(item._id)
          setCategoryFilter([...inputFields])
        } else {
          let inputFields = categoryFilter
          inputFields[1]._id.filter((fil) => fil !== item._id)
          setCategoryFilter([...inputFields])
        }
        break;
      case 2:
        if (!categoryFilter[2]._id.includes(item._id)) {
          let inputFields = categoryFilter
          inputFields[2]._id.push(item._id)
          setCategoryFilter([...inputFields])
        } else {
          let inputFields = categoryFilter
          inputFields[2]._id.filter((fil) => fil !== item._id)
          setCategoryFilter([...inputFields])
        }
        break;

      default:
        break;
    }
  }


  const collectionHandler = (value) => {
    let arr = [...selectedColl];
    if (arr.includes(value)) {
      arr = arr.filter(f => f !== value)
      setSelectedColl(arr)
    }
    else {
      setSelectedColl([...selectedColl, value])
    }
  }

  const AllCollectionHandler = (event) => {
    if (event.target.checked) {
      let newArr = []
      for (let i = 0; i < collList.length; i++) {
        newArr.push(collList[i]._id)
      } setSelectedColl(newArr)
    }
    else {
      setSelectedColl([])
    }
  }

  const [pricedChanged, setPriceChanged] = useState(false)
  const handlePrice = (type, value) => {
    setPriceChanged(true)
    setError(false)
    if (type === "lowPrice") {
      setLowerPrice(parseInt(value))
    }
    else {
      // setUpperPrice()
      setUpperPrice(parseInt(value))
    }
  }
  useEffect(() => {
    if (pricedChanged) {
      optimizedpriceFn()
    }
  }, [pricedChanged])

  const onBlureHandlePrice = () => {
    setPriceChanged(false)
    // console.log("line 346", upperPrice, lowerPrice)
    upperPrice = parseInt(upperPrice);
    if (isNaN(upperPrice)) {
      upperPrice = 0
    }
    if (upperPrice < lowerPrice) {
      setError(true)
    }
    else if ((categoryFilterList.data[0]._id.length > 0 || categoryFilterList.data[1]._id.length > 0 || categoryFilterList.data[2]._id.length > 0) && selectedColl && upperPrice > 0 && lowerPrice) {
      let cate = { "collection": selectedColl, "level": categoryFilterList.data, "price": { "start": lowerPrice, "end": upperPrice }, limit: PageSize, skip: (currentPage - 1) * PageSize }
      dispatch(getFileteredProductList(businessInfoData._id, "", cate))
    }
    else if (selectedColl.length > 0 && upperPrice > 0 && lowerPrice) {
      let cate = { "collection": selectedColl, "price": { "start": lowerPrice, "end": upperPrice }, limit: PageSize, skip: (currentPage - 1) * PageSize };
      dispatch(getFileteredProductList(businessInfoData._id, "", cate))
    }
    else if (upperPrice > 0 && lowerPrice) {
      let cate = { "price": { "start": lowerPrice, "end": upperPrice }, limit: PageSize, skip: (currentPage - 1) * PageSize };
      dispatch(getFileteredProductList(businessInfoData._id, "", cate))
    }
    /* else if(upperPrice<lowerPrice){
      alert("upper price should be greater than lower")
    } */
  }
  const optimizedpriceFn = useCallback(debounce(onBlureHandlePrice), []);

  const dynamicFilterHandler = (name, value) => {
    let arr = [...selectedDynamicFilter];

    let isFound = arr.some(element => {
      if (element.value === value) {
        return true;
      }
      else {
        return false;
      }
    });

    if (!isFound) {
      arr.push({ "title": name, "value": value })
      setSelectedDynamicFilter(arr)
    }
    else {
      let toddlers = arr.filter(item => item.value !== value)
      setSelectedDynamicFilter(toddlers)
    }
  }


  const handleClearFilter = () => {
    // clear-all collection
    setSelectedColl([])
    //clear-all price
    setLowerPrice(parseInt(1))
    setUpperPrice(parseInt(10000))
    // clear-all variant
    setSelectedDynamicFilter([])
    // clear-all categories
    dispatch(clearAllCategory())
    // clear-search-filter
    dispatch(clearSearchFilter(true))
    dispatch(getFileteredProductList(businessInfoData._id, "", { limit: 12, skip: 0 }))
    history("/products")

  }

  const getPrice = (val) => {
    if (currency) {
      if (currency.selectedCurrency && currency.selectedCurrency.data.rate) return `${currency.selectedCurrency.data.symbol ? currency.selectedCurrency.data.symbol : 'Rs'} ${convertToIndianFormat(priceCalculator(val, currency.selectedCurrency.data.commision, currency.selectedCurrency.data.rate))}`;
      else return `${currency.primaryCurrency.data.symbol ? currency.primaryCurrency.data.symbol : 'Rs'} ${convertToIndianFormat(priceCalculator(val, currency.primaryCurrency.data.commision, currency.primaryCurrency.data.rate))}`;
    }
    return val;
  }


  return (
    <React.Fragment>
      <div className='mt-20'>
        <div className='containerTrue pb-45 '>

          <div className='trueTheme-shopPage-container'>
            {/* {showLoader &&
              <ThreeDotLoader />
            } */}


            <div className='left-sidebar'>
              <ul className='trueTheme-breadcrumbs'>
                <li><Link to='/'>Home</Link></li>
                <li className=''><Link to='#' className='active'>Shop</Link></li>
              </ul>
              <ShopSidebar
                upperPrice={upperPrice}
                lowerPrice={lowerPrice}
                selectedColl={selectedColl}
                selectedColor={selectedColor}
                selectedSubCat={selectedSubCat}
                collList={collList}
                // colorList={colorsArray}
                subCatList={subCatList}
                upperProdPrice={upperProdPrice}
                lowerProdPrice={lowerProdPrice}
                varList={varList}
                currFilter={searchid}
                // handleFilters={(type, val) => { filtersHandler(type, val) }}
                handleCollectionFiltersAll={(val) => { AllCollectionHandler(val) }}
                handleCollectionFilters={(val) => { collectionHandler(val) }}
                handleCategoryFilters={(type, item) => handleCategoryFilters(type, item)}
                handlePrice={(type, val) => { handlePrice(type, val) }}
                onBlureHandlePrice={() => { onBlureHandlePrice() }}
                error={error}
                dynamicFilterDataSuccess={dynamicFilterDataSuccess}
                dynamicVariantList={dynamicVariantList}
                setDynamicVariantList={() => setDynamicVariantList()}
                dynamicFilterHandler={(name, value) => { dynamicFilterHandler(name, value) }}
                handleClearFilter={() => handleClearFilter()}
                selectedDynamicFilter={selectedDynamicFilter}
              />
            </div>
            {
              showLoader ?
                <ThreeDotLoader />
                :
                customerProductListSuccess ? (
                  <>
                    <div className='trueTheme-shopPage-rightSidebar'>
                      <div className='trueTheme-dropDown-container'>
                        {searchid?.substring(0, 2) === 'sr' ?
                          <div>
                            <p>
                              {
                                showLoader ? "" :
                                  customerProductListSuccess &&
                                  customerProductListData && customerProductListData.productlength
                              }
                              {showLoader ? "" : ` Results found for "${searchid && searchid.replace("sr", "")}" :`}</p>
                          </div>
                          : ""
                        }

                        <div className='trueTheme-sortDropDown'>
                          {/* <DropDown name='Sort By' options={sortMenu} handleFilters={(type, val) => { filtersHandler('SortBy', val) }} /> */}
                        </div>
                      </div>


                      {
                        customerProductListSuccess ?
                          <React.Fragment>
                            <div className='trueTheme-productList-container'>
                              {/* best seller loop start here */}
                              {
                                customerProductListData && customerProductListData.productlist.length > 0 ? customerProductListData.productlist.map((options, i) => {
                                  return (
                                    <>
                                      <div className="productCard-wrapper" ref={shareRef} onMouseLeave={MouseLeave}>
                                        <Link to={`/products/${options.urlSlug}`} onMouseEnter={() => MouseEnter(options._id)} key={i} className="product-tail">
                                          <div className='shopPage-wrapper'>
                                            <div className='shopPage-image-wrap'>
                                              <div style={{ background: `url($)` }}></div>
                                              <img className={`image ${options.productPicture && options.productPicture.length ? "" : "DefaultImage"}`} src={options.productPicture && options.productPicture.length > 0 ? options.productPicture[0] : DefaultImage} alt="" />
                                            </div>
                                            <div className='shopPage-description-wrap'>
                                              <p className='shopPage-name'>{options.productName}</p>
                                              <div className='price-div'>
                                                {/* <p className='shopPage-price'>Rs.{Math.ceil((options.variations[0]?.price*(100 - options.variations[0]?.discountPercentage))/100)}</p> */}
                                                {/* {options.discountPercentage > 0 ?
                                            <>
                                              {options?.discount_by_percent ?
                                                <>
                                                  <p className='shopPage-price'>Rs. {convertToIndianFormat(Math.ceil((100 - options.discountPercentage) / 100 * (options.price)))}</p>
                                                  <p className='best-seller-discount'><del>Rs.{convertToIndianFormat(options?.price)}</del></p>
                                                  <p className='best-seller-percentage'>({options?.discountPercentage}%)</p>
                                                </>
                                                :
                                                <>
                                                  <p className='shopPage-price'>Rs. {convertToIndianFormat(Math.ceil(options.price - options.discountPercentage))}</p>
                                                  <p className='best-seller-discount'><del>Rs.{convertToIndianFormat(options?.price)}</del></p>
                                                  <p className='best-seller-percentage'>(Rs.{options?.discountPercentage})</p>
                                                </>
                                              }
                                            </>
                                            :
                                            <>
                                              <p className='shopPage-price'>Rs. {convertToIndianFormat(options.price)}</p>
                                            </>
                                          } */}

                                                {options.discountPercentage > 0 ?
                                                  <p className='shopPage-price'>{getPrice(options.salePrice)}</p>
                                                  :
                                                  <p className='shopPage-price'>{getPrice(options.price)}</p>
                                                }
                                                {options.discountPercentage > 0 && <>
                                                  <p className='best-seller-discount'><del>{getPrice(options?.price)}</del></p>
                                                  {options?.discount_by_percent ?
                                                    <p className='best-seller-percentage'>({options?.discountPercentage}%)</p>
                                                    :
                                                    <p className='best-seller-percentage'>({getPrice(options?.discountPercentage)})</p>
                                                  }
                                                </>}

                                              </div>

                                              <div className='shopPage-color-wrap'>
                                                {
                                                  options.variationOption && options.variationOption.length > 0 && options.variationOption.map((color, index) => {
                                                    return (
                                                      <div key={index} className='shopPage-color-div' style={{ backgroundColor: color }}></div>
                                                    )
                                                  })
                                                }
                                              </div>
                                            </div>
                                            {
                                              options?.ribbon ? (
                                                <Ribbon
                                                  Ribbon={options}
                                                />
                                              ) : ""
                                            }
                                          </div>
                                        </Link>

                                        <div className="wishlist-wrap">
                                          {/* {
                                            wishlist === options._id ? (
                                              <button className='wishlist-button'>
                                                <img src={heartFill} alt={heart} className="wishList-icon" onClick={() => RemoveWishListHandle()} onMouseLeave={() => RemoveWishListHandle()} />
                                              </button>
                                            ) :
                                              <button className='wishlist-button'>
                                                <img src={heart} alt={heart} className="wishList-icon" onClick={() => WishListHandle(options._id)} onMouseEnter={() => WishListHandle(options._id)} />
                                              </button>
                                          } */}

                                          <button className='wishlist-button' onClick={() => WishListHandle(options._id)}>
                                            <i className={`icon-wishlist ${wishlist === options._id ? "active" : ""}`}></i>
                                          </button>
                                        </div>
                                        {
                                          innerWindow.width > 992 ? (
                                            shareshow === options._id ? (
                                              <div className={`show-icon ${shareshow ? "active" : ""}`}>
                                                <Share
                                                  // shareUrl={AppLinkUrl.createSubdomain(
                                                  //   options.urlSlug
                                                  // )}
                                                  id={options._id}
                                                  slug={options.urlSlug}
                                                />
                                              </div>
                                            ) : ""
                                          ) : (
                                            <Share
                                              id={options._id}
                                              slug={options.urlSlug}
                                            />
                                          )
                                        }
                                      </div>
                                    </>

                                  )
                                }) :
                                  <div className='loadingGridData'>No Products Found.</div>
                              }
                            </div>

                          </React.Fragment>
                          : ""
                      }
                      {customerProductListData.productlist.length > 0 && <div className='shop-pagination-container'>
                        <ul className="pagination-div">
                          <Pagination
                            className="pagination-bar"
                            currentPage={currentPage}
                            totalCount={productCount}
                            pageSize={PageSize}
                            onPageChange={page => setCurrentPage(page)}
                          />
                        </ul>
                      </div>
                      }
                    </div>

                  </>
                ) : ("")
            }
          </div>
        </div>
      </div>


    </React.Fragment >
  )
}

export default ShopPage