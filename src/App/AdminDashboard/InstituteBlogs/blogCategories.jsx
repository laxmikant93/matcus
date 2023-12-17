import React, { useEffect, useRef, useState } from 'react'
import Breadcrumb from '../../../Common/Breadcrumb';
import BreadcrumbItem from '../../../Common/Breadcrumb/BreadcrumbItem';
import NoDataAvailable from '../../../Common/NoDataAvailable';
import GrayAuthTheme from '../../../Common/Theme/GrayAuthTheme';
import './blog.scss'
import CreateCategory from './createCategory';
import BackgroundDefault from "../../../assets/images/img/BackgroundDefault.png"
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategory, deleteCategoryReset, getCategoryLists, searchCategory, updateCategory, updateCategoryReset } from '../../../store/actions/instituteblogs';
import { useNavigate } from 'react-router-dom';
import Popup from '../../../Common/Popup';
import SearchControl from '../../../Common/SearchControl';
import AppLink from '../../../Common/AppLink';
import ValidationFile from '../../../Classes/ValidationFile';
// card
import Card from '../../../Common/Card';
import CardMedia from '../../../Common/Card/CardMedia'
import CardBody from '../../../Common/Card/CardBody';

// icon
import EditIcon from "./edit-icon.svg";
import EyeIcon from "./eye-icon.svg";
import TrashIcon from "./trash-icon.svg";
import Dialog from "../../../Common/Dialog";
import DialogBody from "../../../Common/Dialog/DialogBody";

import './blogcategories.scss'

const BlogCategories = () => {

  const [categoryModal, setCategoryModal] = useState(false);
  const [removeCategoryPopup, setremoveCategoryPopup] = useState(-1);
  const [categoryId, setCategoryId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFind, setSearchFind] = useState(false);
  const [categoryLength, setCategoryLength] = useState("");
  const [categoryListType, setCategoryListType] = useState("All");

  const { user, insId, categories, getCategoryListSuccess, totalCatCount, mineCateCount,
    deleteCategoryLoading, deleteCategorySuccess, patchCategoryReset } = useSelector((state) => {
      return {
        user: state.user,
        insId: state.user.user_institute,
        categories: state.instituteblogs.getCategoryLists.data,
        totalCatCount: state.instituteblogs.getCategoryLists.totalCount,
        mineCateCount: state.instituteblogs.getCategoryLists.mineCount,
        getCategoryListSuccess: state.instituteblogs.getCategoryLists.success,
        deleteCategoryLoading: state.instituteblogs.deleteCategory.loading,
        deleteCategorySuccess: state.instituteblogs.deleteCategory.success,
        postCategorySuccess: state.instituteblogs.postCategory.success,
        patchCategoryReset: state.instituteblogs.patchCategory.success,
      }
    })

  let dispatch = useDispatch();
  let history = useNavigate();
  const RemovePopToggleRef = useRef();

  useEffect(() => {
    if (categoryListType === "All") {
      dispatch(getCategoryLists(insId, user._id, ""));
    }
    else if (categoryListType === "MINE") {
      dispatch(getCategoryLists(insId, user._id, "true")); //mine list
    }
    else {
      dispatch(getCategoryLists(insId, user._id, ""));
    }
  }, [categoryListType, dispatch, insId, user._id])

  const handleAddNewCategoryButton = () => {
    setCategoryModal(!categoryModal);
  }
  const removeCategoryRef = useRef(null)
  const handleCloseModal = () => {
    // setCategoryModal(!categoryModal);
    setCategoryId("");
  }

  const createCategoryModal = useRef(null);
  const handleRemoveButton = (id) => {
    setCategoryId(id);
    setremoveCategoryPopup(removeCategoryPopup === id ? -1 : id);
    removeCategoryRef.current.open()
  }

  const handleRemovePopupButton = () => {
    dispatch(deleteCategory(categoryId));
    setremoveCategoryPopup("");
  }

  const handleSearch = (e) => {
    let inputValue = e.target.value
    let value = ValidationFile.spaceNotAccept(inputValue);
    setSearchTerm(value);
  }

  useEffect(() => {
    if (searchTerm) {
      setSearchFind(true);
      let arr = [];
      for (let i = 0; i < categories.length; i++) {
        if (
          categories[i].category_title
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        ) {
          arr.push(categories[i]);
        }
      }
      setCategoryLength(arr.length);
    } else {
      setSearchFind(false);
    }
  }, [categories, searchTerm]);

  // useEffect(() => {
  //   if (searchFind) {
  //     dispatch(searchCategory(insId, searchTerm));
  //   }
  // }, [dispatch, insId, searchFind, searchTerm])

  const handleEditButton = (id) => {
    setCategoryId(id);
    setCategoryModal(!categoryModal);
    createCategoryModal.current.open()
  }

  const handlePreviewButton = (id) => {
    history(`/preview-category/${id}`)
  }

  const handleHideButton = (id, value) => {
    if (value === "Hide") {
      dispatch(updateCategory(id, { isHide: true }));
    }
    else {
      dispatch(updateCategory(id, { isHide: false }));
    }
  }

  useEffect(() => {
    if (patchCategoryReset) {
      dispatch(updateCategoryReset());
    }
  }, [dispatch, patchCategoryReset])

  useEffect(() => {
    if (deleteCategorySuccess) {
      dispatch(deleteCategoryReset());
    }
  }, [deleteCategorySuccess, dispatch])

  return (
    <React.Fragment>

      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        {/* <BreadcrumbItem to="/blogs" title="Blogs" /> */}
        <BreadcrumbItem to="/blog-categories" title="Categories" />
      </Breadcrumb>
      <React.Fragment>
        <div className='formFieldwrap visitorFromfield categorie-header-container  mt-5'>
          <div className='inline align-center between-xs between-lg main-header-wrapper'>
            <div className='formFieldwrap text-md w-400 categorie-heading visitorFromfield'>
              <span className='grey text-md' onClick={() => setCategoryListType("All")}>
                {getCategoryListSuccess ?
                  searchFind ?
                    <>
                      {` All(${(categoryLength)})`}
                    </>
                    :
                    <>
                      {` All(${(totalCatCount)})`}
                    </>

                  :
                  "All(0)"
                }
              </span>
              <span className='grey text-md' onClick={() => setCategoryListType("MINE")}>
                {getCategoryListSuccess ?
                  <>
                    {`Mine(${mineCateCount})`}
                  </>
                  :
                  " Mine(0)"
                }
              </span>
            </div>
            <div className='inline align-center button-searchbar-wrapper '>
              <div className="PTH-Item  dis-right">
                <SearchControl
                  classNameWrappper="tableSearchbar categories-searchbar " id="search"
                  onKeyUp={handleSearch}
                  onChange={handleSearch}
                  name="search"
                  placeholder="Search Categories" />
              </div>

              <div className='blogListtopheader'>
                <div className="PTH-Item dis-right">
                  <button
                    className="button button-primary btn-s "
                    onClick={() => createCategoryModal.current.open()}
                  >
                    {/* <i className="ed-icon icon-plus-add white i-xs"></i> */}
                    Add a New Category
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className='mt-5' />


        {/* <ul className="gridHeader">
          <li className="col col-3">Icon/Image</li>
          <li className="col col-3">Title</li>
          <li className="col col-4">Description</li>
          <li className="col col-2">&nbsp;</li>
        </ul> */}
        <div className="blog-category-grid-wrapper">
          <div className="blog-category-grid">

            {getCategoryListSuccess ?
              categories.length ? categories
                .filter((category) => {
                  return (
                    category.category_title
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  );
                })
                .map((item, i) => {
                  return (
                    <div className="blog-category-grid-item" key={i} disabled={item.isHide === true}>
                      <Card className="border-0">
                        <CardMedia>
                          <img
                            src={
                              !item.category_cover_image || item.category_cover_image === ""
                                ? BackgroundDefault
                                : item.category_cover_image
                            }
                            alt="Category Thumbnail"
                          />
                        </CardMedia>
                        <CardBody>
                          <div className="card-body-head">
                            <h4 className="black category-title w-500">{item.category_title}</h4>
                            <button className='category-card-btn'>
                              <i className='category-split-icon'></i>
                            </button>
                          </div>
                          <div className="card-body-content">
                            <p>{item.category_desc.length > 50 ?
                              ` ${item.category_desc.slice(0, 50)}... ` : item.category_desc}</p>
                            {item.category_desc.length > 50 &&
                              <AppLink to={`/preview-category/${item._id}`}>
                                Read More
                              </AppLink>
                            }
                          </div>
                        </CardBody>
                      </Card>
                      <div className="blog-category-group-action-btn">
                        <div className="group-action-btn">
                          {user.user_activeRole === process.env.REACT_APP_EMPLOYEE &&
                            item.owner !== user._id ? "" :
                            <button
                              title="Edit"
                              type="button"
                              onClick={() => handleEditButton(item._id)}
                            >
                              <img src={EditIcon} alt="" />
                            </button>
                          }

                          {item.isHide === true ?
                            <button
                              title="unhide"
                              type="button"
                              onClick={() => handleHideButton(item._id, "UnHide")}
                            >
                              {/* <img src={EyeIcon} alt="" /> */}
                              unhide
                            </button>
                            :
                            <button
                              title="Hide"
                              type="button"
                              onClick={() => handleHideButton(item._id, "Hide")}
                            >
                              <img src={EyeIcon} alt="" />
                            </button>
                          }
                          {user.user_activeRole === process.env.REACT_APP_EMPLOYEE &&
                            item.owner !== user._id ? "" :
                            <button
                              className="btn-square"
                              title="Remove"
                              type="button"
                              onClick={() => handleRemoveButton(item._id)}
                            >
                              <img src={TrashIcon} alt="" />
                            </button>
                          }
                          {/* {removeCategoryPopup === item._id &&
                            <React.Fragment>
                              <Popup
                                show={removeCategoryPopup}
                                removeButtonLabel={"Delete"}
                                cancelButtonLabel={"No, Cancel"}
                                leaveRequest={true}
                                RemoveProp={handleRemovePopupButton}
                                loading={deleteCategoryLoading}
                                RemovePopToggleRef={RemovePopToggleRef}
                                CancelProp={() => setremoveCategoryPopup(-1)}
                              >
                                <p className="gray text-s w-300">
                                  You are about to delete this category.
                                </p>
                                <p className="dgray text-s w-400">Are you sure?</p>
                              </Popup>
                            </React.Fragment>} */}
                          <Dialog ref={removeCategoryRef} Footer="true" CancelButton="true" SaveButton="true" handleActionProp={handleRemovePopupButton}>
                            <DialogBody bodyClass="remove-catergory-dialog-body">
                              <div className='remove-catergory-dialog'>
                                <p className="gray text-xs w-300">
                                  You are about to delete this category.
                                </p>
                                <p className="dgray text-xxs w-400">Are you sure?</p>
                              </div>
                            </DialogBody>
                          </Dialog>
                        </div>

                      </div>
                      {/* <Card className="border-0"
                        onClick={handlePreviewButton}
                      >
                        <CardMedia>
                          <img
                            src={
                              !item.category_cover_image || item.category_cover_image === ""
                                ? BackgroundDefault
                                : item.category_cover_image
                            }
                            alt="Category Thumbnail"
                          />
                        </CardMedia>
                        <CardBody>
                          <div className="card-body-head">
                            <h4 className="black category-title w-500">{item.category_title}</h4>
                            <button className='category-card-btn'>
                              <i className='category-split-icon'></i>
                            </button>
                          </div>
                          <div className="card-body-content">
                            <p>{item.category_desc.length > 50 ?
                              ` ${item.category_desc.slice(0, 50)}... ` : item.category_desc}</p>
                            {item.category_desc.length > 50 &&
                              <AppLink to={`/preview-category/${item._id}`}>
                                Read More
                              </AppLink>
                            }
                          </div>
                        </CardBody>
                      </Card> */}
                    </div>
                  );
                })
                : <NoDataAvailable title="No Records Found." />
              :
              <div className="loadingGridData">
                <i className="ed-loadingGrid"></i>
              </div>
            }

          </div>
        </div>

        {getCategoryListSuccess && <div className='blogListtopheader'>
          <div className="PTH-Item dis-right">
            <button
              className="button add-new-category-section "
              onClick={() => createCategoryModal.current.open()}
            >

              + Add a New Category
            </button>
          </div>
        </div>}
      </React.Fragment>
      <CreateCategory createCategoryref={createCategoryModal} categoryId={categoryId} />

    </React.Fragment>
  );
}

export default BlogCategories;
