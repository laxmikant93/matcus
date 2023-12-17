import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AppLink from '../../../Common/AppLink';
import Breadcrumb from '../../../Common/Breadcrumb';
import BreadcrumbItem from '../../../Common/Breadcrumb/BreadcrumbItem';
import GrayAuthTheme from '../../../Common/Theme/GrayAuthTheme';
import { deleteMultipleBlogs, downloadExcelSheet, getBlogList } from '../../../store/actions/instituteblogs';
import './blog.scss'
import SearchControl from '../../../Common/SearchControl';
import BlogList from './blogList';
import ValidationFile from '../../../Classes/ValidationFile';
import Pagination from '../../../Common/Pagination';
import SingleSelectDropdown from '../../../Common/Form/SingleSelectDropdown';
import './bloglistindex.scss'

const BlogListIndex = () => {

  let dispatch = useDispatch();
  let history = useNavigate();

  let PageSize = 10;

  const [blogListType, setBlogListType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFind, setSearchFind] = useState(false);
  const [selectCheckboxes, setSelectCheckboxes] = useState([]);
  const [selectedBlogsCount, setSelectedBlogsCount] = useState(0);
  const [deleteIds, setDeleteIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortFilter, setSortFilter] = useState(false);

  const { user, insId, blogList, blogs, publishedBlogList, savedBlogList, totalBlogsLength,
    trashBlogsList, pendingApprovalList, rejectedBlogsList, authorBlogsLength,
    downloadExcelSheetSuccess, excelFileLink } = useSelector((state) => {
      return {
        user: state.user,
        insId: state.user.user_institute,
        blogList: state.instituteblogs.getBlogList.data,
        publishedBlogList: state.instituteblogs.getBlogList.publishlength,
        savedBlogList: state.instituteblogs.getBlogList.savelength,
        totalBlogsLength: state.instituteblogs.getBlogList.totalLength,
        trashBlogsList: state.instituteblogs.getBlogList.trashlength,
        pendingApprovalList: state.instituteblogs.getBlogList.pendingApprovalLength,
        rejectedBlogsList: state.instituteblogs.getBlogList.rejectedLength,
        authorBlogsLength: state.instituteblogs.getBlogList.authorLength,
        blogs: state.instituteblogs.getBlogList,
        downloadExcelSheetSuccess: state.instituteblogs.downloadExcelSheetData.success,
        excelFileLink: state.instituteblogs.downloadExcelSheetData.data,
      }
    })

  const handleBlogListByStatus = (status) => {
    setBlogListType(status);
    setCurrentPage(1);
    setSortFilter(!sortFilter);
  }

  const handleSearch = (e) => {
    let inputValue = e.target.value
    let value = ValidationFile.spaceNotAccept(inputValue);
    setSearchTerm(value);
    setSearchFind(true);
  }

  useEffect(() => {
    if (searchFind) {
      switch (blogListType) {
        case "":
          dispatch(getBlogList(insId, user._id, "", PageSize, (currentPage - 1) * PageSize, "search", searchTerm, "", ""));
          break;
        case "mine":
          dispatch(getBlogList(insId, user._id, user._id, PageSize, (currentPage - 1) * PageSize, "search", searchTerm, "", ""));
          break;
        case "Published":
          dispatch(getBlogList(insId, user._id, "", PageSize, (currentPage - 1) * PageSize, "status", "publish", "search", searchTerm));
          break;
        case "Saved":
          dispatch(getBlogList(insId, user._id, "", PageSize, (currentPage - 1) * PageSize, "status", "save", "search", searchTerm));
          break;
        case "Trashed":
          dispatch(getBlogList(insId, user._id, "", PageSize, (currentPage - 1) * PageSize, "status", "trash", true, searchTerm));
          break;
        case "Pending":
          dispatch(getBlogList(insId, user._id, "", PageSize, (currentPage - 1) * PageSize, "status", "pendingForApproval", "search", searchTerm));
          break;
        case "Rejected":
          dispatch(getBlogList(insId, user._id, "", PageSize, (currentPage - 1) * PageSize, "status", "rejected", "search", searchTerm));
          break;
        default:
          dispatch(getBlogList(insId, user._id, "", PageSize, (currentPage - 1) * PageSize, "search", searchTerm, "", ""));
      }
    }
  }, [PageSize, blogListType, currentPage, dispatch, insId, searchFind, searchTerm, user._id])

  const handleReloadButton = () => {
    dispatch(getBlogList(insId, user._id, "", PageSize, (currentPage - 1) * PageSize,));
    setSearchTerm("");
    setBlogListType("");
    setDeleteIds([]);
    setSortFilter(!sortFilter);
  }

  const handleMultipleDeleteButton = () => {
    dispatch(deleteMultipleBlogs({
      instituteIds: deleteIds
    }));
    setDeleteIds([]);
  }
  const handleCheckedIds = (val) => {
    setSelectedBlogsCount(val.length);
    setSelectCheckboxes(val);
    let value = val.map((item, i) => {
      return (
        item._id
      );
    });
    setDeleteIds(value);
  }

  const handleSelectAll = () => {
    handleCheckedIds(blogList);
  }

  const handleDeselectAll = () => {
    handleCheckedIds([]);
  }

  const formatDataForBlogList = {
    "institute": insId,
    "fields": [
      "title",
      "author",
      "category_title",
      "createdAt",
      "totalLike"
    ]
  }

  useEffect(() => {
    if (downloadExcelSheetSuccess) {
      window.location.href = excelFileLink.Location
    }
  }, [dispatch, downloadExcelSheetSuccess, excelFileLink.Location])

  // const downloadXLSX = () => {
  //   switch (blogListType) {
  //     case "":
  //       // dispatch(getBlogList(insId, ""));
  //       break;
  //     case "Published":
  //       // dispatch(getBlogList(insId, "", "status", "publish"));
  //       break;
  //     case "Saved":
  //       // dispatch(getBlogList(insId, "", "status", "save"));
  //       break;
  //     case "Trashed":
  //       // dispatch(getBlogList(insId, "", "trash", true));
  //       break;
  //     case "Pending":
  //       // dispatch(getBlogList(insId, "", "status", "pendingForApproval"));
  //       break;
  //     case "Rejected":
  //       // dispatch(getBlogList(insId, "", "status", "rejected"));
  //       break;
  //     default:
  //       // dispatch(getBlogList(insId, ""));
  //   }
  //   dispatch(downloadExcelSheet(formatDataForBlogList));
  // }

  const selectGroup = [
    "Date",
    "Recent to Old",
    "Old to Recent",
    "Likes",
    "High to Low",
    "Low to High"
  ];

  let filterValues = ["Date", "Likes",]

  const handleSingleSelect = (value) => {
    let selectedValue = value
    switch (blogListType) {
      case "":
        switch (selectedValue) {
          case "All":
            dispatch(getBlogList(insId, user._id, PageSize, (currentPage - 1) * PageSize, "Admin"));
            break;
          case "Recent to Old":
            dispatch(getBlogList(insId, user._id, PageSize, (currentPage - 1) * PageSize, "Admin",
              "sortOrder", "rto"));
            break;
          case "Old to Recent":
            dispatch(getBlogList(insId, user._id, PageSize, (currentPage - 1) * PageSize, "Admin",
              "sortOrder", "otr"));
            break;
          case "High to Low":
            dispatch(getBlogList(insId, user._id, PageSize, (currentPage - 1) * PageSize, "Admin",
              "sortOrder", "htl"));
            break;
          case "Low to High":
            dispatch(getBlogList(insId, user._id, PageSize, (currentPage - 1) * PageSize, "Admin",
              "sortOrder", "lth"));
            break;
          default:
            dispatch(getBlogList(insId, user._id, PageSize, (currentPage - 1) * PageSize, "Admin"));
        }
        break;
      case "mine":
        switch (selectedValue) {
          case "All":
            dispatch(getBlogList(insId, user._id, PageSize, (currentPage - 1) * PageSize, "Author"));
            break;
          case "Recent to Old":
            dispatch(getBlogList(insId, user._id, PageSize, (currentPage - 1) * PageSize, "Author",
              "sortOrder", "rto"));
            break;
          case "Old to Recent":
            dispatch(getBlogList(insId, user._id, PageSize, (currentPage - 1) * PageSize, "Author",
              "sortOrder", "otr"));
            break;
          case "High to Low":
            dispatch(getBlogList(insId, user._id, PageSize, (currentPage - 1) * PageSize, "Author",
              "sortOrder", "htl"));
            break;
          case "Low to High":
            dispatch(getBlogList(insId, user._id, PageSize, (currentPage - 1) * PageSize, "Author",
              "sortOrder", "lth"));
            break;
          default:
            dispatch(getBlogList(insId, user._id, PageSize, (currentPage - 1) * PageSize, "Author"));
        }
        break;
      case "Published":
        switch (selectedValue) {
          case "All":
            dispatch(getBlogList(insId, user._id, PageSize, (currentPage - 1) * PageSize, "Admin",
              "status", "publish"));
            break;
          case "Recent to Old":
            dispatch(getBlogList(insId, user._id, PageSize, (currentPage - 1) * PageSize, "Admin",
              "status", "publish", "sortOrder", "rto"));
            break;
          case "Old to Recent":
            dispatch(getBlogList(insId, user._id, PageSize, (currentPage - 1) * PageSize, "Admin",
              "status", "publish", "sortOrder", "otr"));
            break;
          case "High to Low":
            dispatch(getBlogList(insId, user._id, PageSize, (currentPage - 1) * PageSize, "Admin",
              "status", "publish", "sortOrder", "htl"));
            break;
          case "Low to High":
            dispatch(getBlogList(insId, user._id, PageSize, (currentPage - 1) * PageSize, "Admin",
              "status", "publish", "sortOrder", "lth"));
            break;
          default:
            dispatch(getBlogList(insId, user._id, PageSize, (currentPage - 1) * PageSize, "Admin",
              "status", "publish"));
        }
        break;
      case "Saved":
        switch (selectedValue) {
          case "All":
            dispatch(getBlogList(insId, user._id, PageSize, (currentPage - 1) * PageSize, "Admin",
              "status", "save"));
            break;
          case "Recent to Old":
            dispatch(getBlogList(insId, user._id, PageSize, (currentPage - 1) * PageSize, "Admin",
              "status", "save", "sortOrder", "rto"));
            break;
          case "Old to Recent":
            dispatch(getBlogList(insId, user._id, PageSize, (currentPage - 1) * PageSize, "Admin",
              "status", "save", "sortOrder", "otr"));
            break;
          case "High to Low":
            dispatch(getBlogList(insId, user._id, PageSize, (currentPage - 1) * PageSize, "Admin",
              "status", "save", "sortOrder", "htl"));
            break;
          case "Low to High":
            dispatch(getBlogList(insId, user._id, PageSize, (currentPage - 1) * PageSize, "Admin",
              "status", "save", "sortOrder", "lth"));
            break;
          default:
            dispatch(getBlogList(insId, user._id, PageSize, (currentPage - 1) * PageSize, "Admin",
              "status", "save"));
        }
        break;
      case "Trashed":
        switch (selectedValue) {
          case "All":
            dispatch(getBlogList(insId, user._id, PageSize, (currentPage - 1) * PageSize, "Admin",
              "trash", true));
            break;
          case "Recent to Old":
            dispatch(getBlogList(insId, user._id, PageSize, (currentPage - 1) * PageSize, "Admin",
              "trash", true, "sortOrder", "rto"));
            break;
          case "Old to Recent":
            dispatch(getBlogList(insId, user._id, PageSize, (currentPage - 1) * PageSize, "Admin",
              "trash", true, "sortOrder", "otr"));
            break;
          case "High to Low":
            dispatch(getBlogList(insId, user._id, PageSize, (currentPage - 1) * PageSize, "Admin",
              "trash", true, "sortOrder", "htl"));
            break;
          case "Low to High":
            dispatch(getBlogList(insId, user._id, PageSize, (currentPage - 1) * PageSize, "Admin",
              "trash", true, "sortOrder", "lth"));
            break;
          default:
            dispatch(getBlogList(insId, user._id, PageSize, (currentPage - 1) * PageSize, "Admin",
              "trash", true));
        }
        break;
      case "Pending":
        switch (selectedValue) {
          case "All":
            dispatch(getBlogList(insId, user._id, PageSize, (currentPage - 1) * PageSize, "Admin",
              "status", "pendingForApproval"));
            break;
          case "Recent to Old":
            dispatch(getBlogList(insId, user._id, PageSize, (currentPage - 1) * PageSize, "Admin",
              "status", "pendingForApproval", "sortOrder", "rto"));
            break;
          case "Old to Recent":
            dispatch(getBlogList(insId, user._id, PageSize, (currentPage - 1) * PageSize, "Admin",
              "status", "pendingForApproval", "sortOrder", "otr"));
            break;
          case "High to Low":
            dispatch(getBlogList(insId, user._id, PageSize, (currentPage - 1) * PageSize, "Admin",
              "status", "pendingForApproval", "sortOrder", "htl"));
            break;
          case "Low to High":
            dispatch(getBlogList(insId, user._id, PageSize, (currentPage - 1) * PageSize, "Admin",
              "status", "pendingForApproval", "sortOrder", "lth"));
            break;
          default:
            dispatch(getBlogList(insId, user._id, PageSize, (currentPage - 1) * PageSize, "Admin",
              "status", "pendingForApproval"));
        }
        break;
      case "Rejected":
        switch (selectedValue) {
          case "All":
            dispatch(getBlogList(insId, user._id, PageSize, (currentPage - 1) * PageSize, "Admin",
              "status", "rejected"));
            break;
          case "Recent to Old":
            dispatch(getBlogList(insId, user._id, PageSize, (currentPage - 1) * PageSize, "Admin",
              "status", "rejected", "sortOrder", "rto"));
            break;
          case "Old to Recent":
            dispatch(getBlogList(insId, user._id, PageSize, (currentPage - 1) * PageSize, "Admin",
              "status", "rejected", "sortOrder", "otr"));
            break;
          case "High to Low":
            dispatch(getBlogList(insId, user._id, PageSize, (currentPage - 1) * PageSize, "Admin",
              "status", "rejected", "sortOrder", "htl"));
            break;
          case "Low to High":
            dispatch(getBlogList(insId, user._id, PageSize, (currentPage - 1) * PageSize, "Admin",
              "status", "rejected", "sortOrder", "lth"));
            break;
          default:
            dispatch(getBlogList(insId, user._id, PageSize, (currentPage - 1) * PageSize, "Admin",
              "status", "rejected"));
        }
        break;
      default:
        switch (selectedValue) {
          case "All":
            dispatch(getBlogList(insId, user._id, PageSize, (currentPage - 1) * PageSize, "Admin"));
            break;
          case "Recent to Old":
            dispatch(getBlogList(insId, user._id, PageSize, (currentPage - 1) * PageSize, "Admin",
              "sortOrder", "rto"));
            break;
          case "Old to Recent":
            dispatch(getBlogList(insId, user._id, PageSize, (currentPage - 1) * PageSize, "Admin",
              "sortOrder", "otr"));
            break;
          case "High to Low":
            dispatch(getBlogList(insId, user._id, PageSize, (currentPage - 1) * PageSize, "Admin",
              "sortOrder", "htl"));
            break;
          case "Low to High":
            dispatch(getBlogList(insId, user._id, PageSize, (currentPage - 1) * PageSize, "Admin",
              "sortOrder", "lth"));
            break;
          default:
            dispatch(getBlogList(insId, user._id, PageSize, (currentPage - 1) * PageSize, "Admin"));
        }
    }
  }

  return (
    <GrayAuthTheme>
      <div className='inline between-xs middle-xs navigation-and-search-wrapper  '>
        <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          {/* <BreadcrumbItem to="/blogs" title="Blog" /> */}
          <BreadcrumbItem to="/blog-list" title="Posts" />
        </Breadcrumb>

        <div className='inline between-xs middle-xs navigation-and-search-container'>
          <div className="PTH-Item dis-right">
            <SearchControl
              classNameWrappper="tableSearchbar" id="search"
              onKeyUp={handleSearch}
              onChange={handleSearch}
              name="search"
              value={searchTerm}
              placeholder="Search Blogs" />
          </div>
          <div className='blogListtopheader'>
            {/* <p>Create and edit blogs to showcase on your website.</p> */}
            <div className="PTH-Item dis-right">
              <AppLink
                to="/add-new-blog"
                className="button button-primary  btn-s new-blog-btn "
              >
                {/* <i className="ed-icon icon-plus-add white i-xs"></i>Add New Blog */}
                Add New Blog
              </AppLink>
            </div>
          </div>
        </div>
      </div>


      <React.Fragment>

        <p className="text-lg w-600 pT-10 pb-" >Posts</p>


        {/* <div className='PTH-Item'>
            <SingleSelectDropdown
              SingleSelectHandel={handleSingleSelect}
              selectGroup={selectGroup}
              filterValues={filterValues}
              changeList={sortFilter}
            />
          </div> */}


        <div className='formFieldwrap visitorFromfield   blogs-list-info'>
          <span onClick={() => handleBlogListByStatus("")}>
            All <span className='text-xs w-300 gray mr-10'>({(totalBlogsLength <= 10 ? totalBlogsLength : totalBlogsLength - (currentPage * 10) < 0 ? `${totalBlogsLength}/ ${totalBlogsLength}` : `${currentPage * 10}/ ${totalBlogsLength}`)})</span>
          </span>
          <span onClick={() => handleBlogListByStatus("mine")}>
            Mine <span className='text-xs w-300 gray mr-10' >({(authorBlogsLength <= 10 ? authorBlogsLength : authorBlogsLength - (currentPage * 10) < 0 ? `${authorBlogsLength}/ ${authorBlogsLength}` : `${currentPage * 10}/ ${authorBlogsLength}`)})</span>
          </span>
          <span onClick={() => handleBlogListByStatus("Published")}>
            Published <span className='text-xs w-300 gray mr-10' >({(publishedBlogList <= 10 ? publishedBlogList : publishedBlogList - (currentPage * 10) < 0 ? `${publishedBlogList}/ ${publishedBlogList}` : `${currentPage * 10}/ ${publishedBlogList}`)})</span>
          </span>
          <span onClick={() => handleBlogListByStatus("Saved")}>
            Saved  <span className='text-xs w-300 gray mr-10' >({(savedBlogList <= 10 ? savedBlogList : savedBlogList - (currentPage * 10) < 0 ? `${savedBlogList}/ ${savedBlogList}` : `${currentPage * 10}/ ${savedBlogList}`)})</span>
          </span>
          <span onClick={() => handleBlogListByStatus("Trashed")}>
            Trash   <span className='text-xs w-300 gray mr-10' >({(trashBlogsList <= 10 ? trashBlogsList : trashBlogsList - (currentPage * 10) < 0 ? `${trashBlogsList}/ ${trashBlogsList}` : `${currentPage * 10}/ ${trashBlogsList}`)})</span>
          </span>
          <span onClick={() => handleBlogListByStatus("Pending")}>
            Pending  <span className='text-xs w-300 gray mr-10' >({(pendingApprovalList <= 10 ? pendingApprovalList : pendingApprovalList - (currentPage * 10) < 0 ? `${pendingApprovalList}/ ${pendingApprovalList}` : `${currentPage * 10}/ ${pendingApprovalList}`)})</span>
          </span>
          <span onClick={() => handleBlogListByStatus("Rejected")}>
            Rejected  <span className='text-xs w-300 gray mr-10' >({(rejectedBlogsList <= 10 ? rejectedBlogsList : rejectedBlogsList - (currentPage * 10) < 0 ? `${rejectedBlogsList}/ ${rejectedBlogsList}` : `${currentPage * 10}/ ${rejectedBlogsList}`)})</span>
          </span>
        </div>
        <hr />

        {/* <div>
          <button
            className="btn-square"
            title="Refresh"
            onClick={handleReloadButton}
          >
            <span className="cssIcon">
              <i className="ed-refresh"></i>
            </span>
          </button>
        </div> */}

        <div>
          {
            deleteIds.length ?
              <button
                className="btn-square"
                title="Refresh"
                onClick={handleMultipleDeleteButton}
              >
                <span className="cssIcon">
                  <i className="ed-trash"></i>
                </span>
              </button> : ""
          }
        </div>

      </React.Fragment>
      <BlogList
        blogs={blogs} blogList={blogList} insId={insId} blogListType={blogListType}
        onSelectedValue={(val) => handleCheckedIds(val)} refresh={deleteIds} pageSize={PageSize}
        currentPage={currentPage} selectCheckboxes={selectCheckboxes}
      />


      {/* <div>
        <button
          className="button button-o-primary primary button-sm"
          title="download"
          onClick={() => downloadXLSX()}
        >
          <span className="cssIcon">
            <i className="ed-download"></i>
          </span> 
        </button>
      </div> */}
      <hr className='mt-25 ' />
      {/* <div className='inline page-select-wrapper'>
        <p className='page-option-first'>{selectedBlogsCount} Selected</p>
        <div className='option-divider'></div>
        {selectCheckboxes.length ?
          <p className='page-option-second'
            onClick={handleDeselectAll}
          >Deselect All</p>
          :
          <p className='page-option-second'
            onClick={handleSelectAll}
            disabled={!selectCheckboxes.length}
          >Select All</p>}
      </div> */}


      <div className='blog-list-pagination-wrapper'>
        {blogListType === "" ?
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={totalBlogsLength}
            pageSize={PageSize}
            onPageChange={page => setCurrentPage(page)}
          /> :
          blogListType === "mine" ?
            < Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={authorBlogsLength}
              pageSize={PageSize}
              onPageChange={page => setCurrentPage(page)}
            />
            :
            blogListType === "Published" ?
              < Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={publishedBlogList}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)}
              />
              :
              blogListType === "Saved" ?
                <Pagination
                  className="pagination-bar"
                  currentPage={currentPage}
                  totalCount={savedBlogList}
                  pageSize={PageSize}
                  onPageChange={page => setCurrentPage(page)}
                /> :
                blogListType === "Trashed" ?
                  <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={trashBlogsList}
                    pageSize={PageSize}
                    onPageChange={page => setCurrentPage(page)}
                  /> :
                  blogListType === "Pending" ?
                    < Pagination
                      className="pagination-bar"
                      currentPage={currentPage}
                      totalCount={pendingApprovalList}
                      pageSize={PageSize}
                      onPageChange={page => setCurrentPage(page)}
                    />
                    : blogListType === "Rejected" ?
                      < Pagination
                        className="pagination-bar"
                        currentPage={currentPage}
                        totalCount={rejectedBlogsList}
                        pageSize={PageSize}
                        onPageChange={page => setCurrentPage(page)}
                      /> :
                      ""
        }
      </div>

    </GrayAuthTheme >
  );
}

export default BlogListIndex;
