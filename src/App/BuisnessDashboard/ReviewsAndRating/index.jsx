import React from 'react'
import Breadcrumb from '../../../Common/Breadcrumb'
import BreadcrumbItem from '../../../Common/Breadcrumb/BreadcrumbItem'
import './reviewAndRating.scss';
import AddNewElement from '../../../Common/AddNewElement/AddNewElement';
import { useRef } from 'react';
import AddReviewPopup from './AddReviewPopup/AddReviewPopup';
import { useState } from 'react';
import FormInput from '../../../Common/Form/FormInput';
import AllReviewsList from './AllReviewsList/AllReviewsList';
import SearchControl from '../../../Common/SearchControl';
import UseOutsideClick from '../../../Common/UseOutsideClick';
import CheckboxInput from '../../../Common/Form/CheckboxInput';
import { useDispatch } from 'react-redux';
import { getAllReviewList, getSingleReviewReset, multipleDeleteReviewDetails, multiplePermanantDeleteReview, postReviewDetailsReset, restoreMultipleReviews, storeReviewId } from '../../../store/actions/ecomReviews';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Pagination from '../../../Common/Pagination';
import SettingsPopup from './SettingsPopup';
import { getInstituteData } from '../../../store/actions/businessInfo';

const ReviewsAndRating = () => {

  const openRef = useRef(null);
  const openSortByRef = useRef(null);
  const opensettingspopupRef = useRef(null);
  let dispatch = useDispatch();

  const { user, allCount, mineCount, publishCount, rejectCount, trashCount, pendingCount,
    getReviewsListData, getReviewsListSuccess } = useSelector((state) => {
      return {
        user: state.user,
        allCount: state.ecomReviews.getReviewsList.all,
        mineCount: state.ecomReviews.getReviewsList.mine,
        publishCount: state.ecomReviews.getReviewsList.published,
        rejectCount: state.ecomReviews.getReviewsList.rejected,
        trashCount: state.ecomReviews.getReviewsList.deleted,
        pendingCount: state.ecomReviews.getReviewsList.pending,
        getReviewsListData: state.ecomReviews.getReviewsList.data,
        getReviewsListSuccess: state.ecomReviews.getReviewsList.success,
      }
    })

  const [reviewList, setReviewList] = useState(false);
  const [openFilterBy, SetOpenFilterBy] = useState(false);
  const [sortByTick, setSortByTick] = useState("");
  const [openSortBy, setOpenSortBy] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFind, setSearchFind] = useState(false);
  const [checkboxes, setCheckboxes] = useState([]);
  const [listType, setListType] = useState("All");
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    if (getReviewsListSuccess && getReviewsListData && getReviewsListData.length) {
      setReviewList(true);
    }
  }, [getReviewsListData, getReviewsListData?.length, getReviewsListSuccess])

  useEffect(() => {
    if (listType === "All") {
      setTotalCount(allCount);
    }
    if (listType === "Mine") {
      setTotalCount(mineCount);
    }
    if (listType === "Pending") {
      setTotalCount(pendingCount);
    }
    if (listType === "Approved") {
      setTotalCount(publishCount);
    }
    if (listType === "Rejected") {
      setTotalCount(rejectCount);
    }
    if (listType === "Trash") {
      setTotalCount(trashCount);
    }
  }, [allCount, listType, mineCount, pendingCount, publishCount, rejectCount, trashCount])

  const onClosePopup = () => {
    openRef.current.close();
    dispatch(storeReviewId(""));
    dispatch(postReviewDetailsReset());
    dispatch(getSingleReviewReset());
  }

  const onOpenPopUp = () => {
    openRef.current.open();
  }

  const handleSortByPopup = () => {
    setOpenSortBy(!openSortBy)
  }

  UseOutsideClick(openSortByRef, () => {
    if (openSortBy) setOpenSortBy(false);
  });

  const handleSortBy = (type) => {
    switch (type) {
      case "Oldest":
        dispatch(getAllReviewList(user.user_business, "old", "", "", limit, currentPage));
        setSortByTick("Oldest");
        break;
      case "Latest":
        dispatch(getAllReviewList(user.user_business, "new", "", "", limit, currentPage));
        setSortByTick("Latest");
        break;
      default:
        dispatch(getAllReviewList(user.user_business, "", "", "", limit, currentPage));
        break;
    }
    setOpenSortBy(false);
  }

  const typeList = [
    {
      id: 1,
      type: 'All',
      value: allCount ? allCount : 0
    },
    {
      id: 2,
      type: 'Mine',
      value: mineCount ? mineCount : 0
    },
    {
      id: 3,
      type: 'Pending',
      value: pendingCount ? pendingCount : 0
    },
    {
      id: 4,
      type: 'Approved',
      value: publishCount ? publishCount : 0
    },
    {
      id: 5,
      type: 'Rejected',
      value: rejectCount ? rejectCount : 0
    },
    {
      id: 6,
      type: 'Trash',
      value: trashCount ? trashCount : 0
    }
  ];

  const handleListType = (type) => {
    if (searchFind) {
      // dispatch(getAllReviewList(user.user_business, "", "", searchTerm));
      switch (type) {
        case "Mine":
          dispatch(getAllReviewList(user.user_business, "", "admin", searchTerm, limit, currentPage));
          break;
        case "Pending":
          dispatch(getAllReviewList(user.user_business, "", "Pending", searchTerm, limit, currentPage));
          break;
        case "Rejected":
          dispatch(getAllReviewList(user.user_business, "", "Rejected", searchTerm, limit, currentPage));
          break;
        case "Trash":
          dispatch(getAllReviewList(user.user_business, "", "deleted", searchTerm, limit, currentPage));
          break;
        case "Approved":
          dispatch(getAllReviewList(user.user_business, "", "Published", searchTerm, limit, currentPage));
          break;
        default:
          dispatch(getAllReviewList(user.user_business, "", "", searchTerm, limit, currentPage));
          break;
      }
    }
    else {
      switch (type) {
        case "Mine":
          dispatch(getAllReviewList(user.user_business, "", "admin", "", limit, currentPage));
          break;
        case "Pending":
          dispatch(getAllReviewList(user.user_business, "", "Pending", "", limit, currentPage));
          break;
        case "Rejected":
          dispatch(getAllReviewList(user.user_business, "", "Rejected", "", limit, currentPage));
          break;
        case "Trash":
          dispatch(getAllReviewList(user.user_business, "", "deleted", "", limit, currentPage));
          break;
        case "Approved":
          dispatch(getAllReviewList(user.user_business, "", "Published", "", limit, currentPage));
          break;
        default:
          dispatch(getAllReviewList(user.user_business, "", "", "", limit, currentPage));
          break;
      }
    }
    setCheckboxes([]);

    setListType(type);
  }

  let typing;
  const searchInputHandel = (evt) => {
    evt.preventDefault();
    clearTimeout(typing);
    typing = setTimeout(() => {
      setSearchTerm(evt.target.value);
    }, 400);
    if (!evt.target.value) {
      clearTimeout(typing);
      setSearchTerm("");
    }
    setSearchFind(true);
  };

  useEffect(() => {
    if (searchFind) {
      dispatch(getAllReviewList(user.user_business, "", "", searchTerm, limit, currentPage));
    }
    else {
      dispatch(getAllReviewList(user.user_business, "", "", "", limit, currentPage));
    }
  }, [currentPage, dispatch, limit, searchFind, searchTerm, user.user_business])

  const handleDeleteButton = () => {
    let data = checkboxes.map((item) => {
      return (
        item._id
      )
    });
    dispatch(multipleDeleteReviewDetails(user.user_business, { "review": data }));
    setCheckboxes([]);
  }

  const handleRestoreButton = () => {
    let data = checkboxes.map((item) => {
      return (
        item._id
      )
    });
    dispatch(restoreMultipleReviews(user.user_business, { "review": data }));
    setCheckboxes([]);
  }

  const handlePermanantDeleteButton = () => {
    let data = checkboxes.map((item) => {
      return (
        item._id
      )
    });
    dispatch(multiplePermanantDeleteReview(user.user_business, { "review": data }));
    setCheckboxes([]);
  }

  const handleLimit = (e) => {
    console.log(e);
    let value = e.target.value;
    if (value === "0") {
      setLimit(10);
    }
    else {
      setLimit(value ? value : "")
    }
  }

  const openSettingsPopup = () => {
    opensettingspopupRef.current.open();
    dispatch(getInstituteData(user.user_business, user.user_business_type))
  }

  const onCloseSettingsPopup = () => {
    opensettingspopupRef.current.close();
  }

  // const filterRef = useRef(null)
  // const handleFilterBy = () => {
  //   SetOpenFilterBy(!openFilterBy);
  // }

  // const filterData = [
  //   {
  //     id: 1,
  //     filterName: 'ALL',
  //     value: 12,
  //   },
  //   {
  //     id: 2,
  //     filterName: 'Product Reviews',
  //     value: 12,
  //   },
  //   {
  //     id: 4,
  //     filterName: 'Service Reviews',
  //     value: 12,
  //   },
  //   {
  //     id: 5,
  //     filterName: 'Blog Comments',
  //     value: 12,
  //   }
  // ]

  return (
    <div className='reviewContainer'>
      <Breadcrumb>
        <BreadcrumbItem to="/" title=" Dashboard" />
        <BreadcrumbItem to="/ecommerce/review&rating" title="Reviews & Ratings" />
      </Breadcrumb>
      {/* <AddNewCollections /> */}
      {/* <h1>hello this is </h1> */}
      <div className='heading-wrapper'>
        <div className='heading-wrap'>
          <h1 className='text-md w-600 base'>Reviews & Ratings</h1>
        </div>
        {/* <Toast text={`Review ${toastStatus}. See ${toastStatus} Reviews in ${toastStatus} menu`} /> */}
        {checkboxes.length ? "" :
          <div className='btn-wrap'>
            <button className='button btn-xs button-primary' onClick={onOpenPopUp}>Add a review</button>
          </div>
        }
      </div>
      <div className='allType-container'>
        <ul className='allType-ul'>
          {
            typeList.map(({ id, type, value }) => (
              <li key={id} className="alltype-text-wrap" onClick={() => handleListType(type)}>
                <span className='allType-text text-xxs w-400'>{type}</span>
                <span className='alltype-value text-xxs w-300'>({value})</span>
              </li>
            ))

          }
        </ul>
        {reviewList ?
          <React.Fragment>
            {checkboxes.length ?
              <React.Fragment>
                {listType === "Trash" ?
                  <>
                    <button className='button btn-xs button-primary' onClick={handleRestoreButton}>Restore</button>
                    <button className='button btn-xs button-primary' onClick={handlePermanantDeleteButton}>Permanant Delete</button>
                  </>
                  :
                  <button className='button btn-xs button-primary' onClick={handleDeleteButton}>Delete</button>
                }
              </React.Fragment>
              :
              <div className='alltype-rightSearchBar'>
                <div className="headerItem add-collection-searchbar headerSearchBar">
                  <SearchControl
                    // value={searchTerm}
                    placeholder="Search..."
                    onChange={searchInputHandel}
                    reset={() => setSearchTerm("")}
                  />
                </div>
                <div className='filterby-container' ref={openSortByRef}>
                  <button className='filter-dropDown-btn' onClick={handleSortByPopup}>
                    <span className='text-2xs w-500 base'>Sort by</span><i className='ed-icon icon-sort   base'></i>
                  </button>
                  <div className={`dropDown-content ${openSortBy ? 'displayShow' : ''}`} >
                    <div className='sortBy-wrap' onClick={() => handleSortBy("Latest")}>
                      <i className={`ed-icon  primary icon-tick ${sortByTick === "Latest" ? 'icon-active' : ''}`} ></i>
                      <p className='text-xxs sort-by-option'>Reviews : (Latest)</p>
                    </div>
                    <div className='sortBy-wrap mt-3' onClick={() => handleSortBy("Oldest")}>
                      <i className={`ed-icon  primary icon-tick ${sortByTick === "Oldest" ? 'icon-active' : ''}`} ></i>
                      <p className='text-xxs sort-by-option'>Reviews : (Oldest)</p>
                    </div>
                  </div>
                </div>
              </div>
            }
          </React.Fragment>
          : ""
        }
        {!checkboxes.length ?
          <div className="setting-wrap">
            <button onClick={openSettingsPopup}><i className="icon-settingIcon"></i></button>
          </div>
          : ""
        }

      </div>
      <hr className='line' />
      {
        !reviewList ? (
          <div className='addnew-review-container'>
            <AddNewElement title={'Add a review'} onClick={onOpenPopUp} />
          </div>
        ) : (
          <AllReviewsList openRef={openRef} checkboxes={checkboxes} setCheckboxes={setCheckboxes} />
        )
      }
      <div>
      </div>
      {
        reviewList ? (
          <div className='review-pagination-wrapper'>
            <div className='reviewPagination-leftSide'>
              <p className='text-xs w-500 gray'>Show reviews on a page</p>
              <div className='pagination-inputWrap'>
                <FormInput
                  type="number"
                  // label="Ribbon"
                  id="price"
                  name="price"
                  min={1}
                  minLength={1}
                  // placeholder="₹"
                  value={limit}
                  maxLength="100"
                  onChange={(e) => handleLimit(e)}
                />
              </div>
            </div>
            <div className='reviewPagination-rightSide'>
              <div className='totalpages-wrap'>
                <p className='text-xs w-500 gray'>Results
                  {limit && <React.Fragment>
                    {(limit * currentPage) + 1 - limit}-{(limit * currentPage) > totalCount ? totalCount : (limit * currentPage)} of {totalCount}
                  </React.Fragment>}
                </p>
              </div>
              <div className='pagination-wrap'>
                {limit && limit > 0 && <Pagination
                  className="pagination-bar"
                  currentPage={currentPage}
                  totalCount={totalCount}
                  pageSize={limit}
                  onPageChange={page => setCurrentPage(page)}
                />}
              </div>
            </div>
          </div>
        ) : ''

      }
      <AddReviewPopup openpopup={openRef} onclose={() => onClosePopup()} />
      <SettingsPopup openref={opensettingspopupRef} onclose={() => onCloseSettingsPopup()} />
    </div>
  )
}

export default ReviewsAndRating