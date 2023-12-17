import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Breadcrumb from '../../../../Common/Breadcrumb';
import BreadcrumbItem from '../../../../Common/Breadcrumb/BreadcrumbItem';
import SingleSelectDropdown from '../../../../Common/Form/SingleSelectDropdown';
import SearchControl from '../../../../Common/SearchControl';
import GrayAuthTheme from '../../../../Common/Theme/GrayAuthTheme';
import { downloadExcelSheet, downloadExcelSheetReset, getContactList, searchContactList } from '../../../../store/actions/contactus';
import ContactList from './contactList';
import Pagination from '../../../../Common/Pagination';
import FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { DATETIME_FORMAT_AP } from '../../../../Constant/constants';
import moment from 'moment';
import './style.scss'

const Contacts = () => {

  let dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchFind, setSearchFind] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrderFetch, setSortOrderFetch] = useState("");
  const [bookingSet, setBookingFetch] = useState("");
  const [filterSelect, setFilterSelect] = useState("");
  const [resetState, setResetTrue] = useState(false);
  const [searchSelectHandle, setsearchSelectHandle] = useState(false)


  let PageSize = 10;
  const { user, insId, contacts, contactLists, ContactsListTotal, downloadExcelSheetSuccess, excelFileLink } = useSelector((state) => {
    return {
      user: state.user,
      insId: state.user.user_institute,
      contacts: state.contactUs.getContactList,
      contactLists: state.contactUs.getContactList.data,
      ContactsListTotal: state.contactUs.getContactList.totalLength,
      downloadExcelSheetSuccess: state.contactUs.downloadExcelSheetData.success,
      excelFileLink: state.contactUs.downloadExcelSheetData.data,
    }
  })

  useEffect(() => {
    // console.log("line 44")
    dispatch(getContactList(insId, searchTerm,
      PageSize, (currentPage - 1) * PageSize, user.user_business_type, sortOrderFetch, bookingSet
    ));
  }, [dispatch, insId, PageSize, currentPage, user.user_business_type])

  // const [selectGroupList, setSelectGroup] = useState()
  // const [restState, setResetState] = useState()

  // const handleReset= () =>{
  //   setResetState("All")
  // }

  const selectGroup = [
    "Recent to Old",
    "Old to Recent",
  ]

  const selectEnquiryGroup = [
    "Bookings",
    "Enquiries",
  ]

  let filterValues = ["Timings"]
  let filterEnquiryValues = ["Timings"]


  const SingleSelectHandel1 = (value) => {
    // console.log("searchSelectHandle",searchSelectHandle)
    if (!searchSelectHandle) {
      let selectedValue = value;
      // alert("sbdkjsg vsukfs",selectedValue)
      switch (selectedValue) {
        case "All":
          dispatch(getContactList(insId, searchTerm,
            PageSize, (currentPage - 1) * PageSize, user.user_business_type, "", ""
          ));
          break;
        case "Recent to Old":
          setSortOrderFetch("rto")
          dispatch(getContactList(insId, searchTerm,
            PageSize, (currentPage - 1) * PageSize, user.user_business_type, "rto", bookingSet
          ));
          break;
        case "Old to Recent":
          setSortOrderFetch("otr")
          dispatch(getContactList(insId, searchTerm,
            PageSize, (currentPage - 1) * PageSize, user.user_business_type, "otr", bookingSet
          ));
          break;
        case "Bookings":
          setBookingFetch("booking_form")
          dispatch(getContactList(insId, searchTerm,
            PageSize, (currentPage - 1) * PageSize, user.user_business_type, sortOrderFetch, "booking_form"
          ));
          break;
        case "Enquiries":
          setBookingFetch("enquiry")
          dispatch(getContactList(insId, searchTerm,
            PageSize, (currentPage - 1) * PageSize, user.user_business_type, sortOrderFetch, "enquiry",
          ));
          break;
        default:
          dispatch(getContactList(insId, searchTerm,
            PageSize, (currentPage - 1) * PageSize, user.user_business_type, "", ""
          ));
      }
    }
    else {
      setsearchSelectHandle(false)
    }
  }


  const ResetFoo = () => {
    setsearchSelectHandle(true)
    setSortOrderFetch("")
    setBookingFetch("")
    setSearchTerm("");
    setResetTrue(true)
    setTimeout(() => {
      setResetTrue(false)
    }, [1000])
  }
  const handleReloadButton = () => {
    dispatch(getContactList(insId, "",
      PageSize, (currentPage - 1) * PageSize, user.user_business_type, "", ""
    ));
    // setSearchTerm("");
    // setSortOrderFetch("")
    setCurrentPage(1);
    ResetFoo();
  }




  const onChangehandle = (e) => {
    let inputValue = e.target.value;
    setSearchTerm(inputValue);
  }

  const SearchChangehandle = (e) => {
    if (e.key === "Enter") {
      setsearchSelectHandle(true)
      setSearchFind(true);
      setSortOrderFetch("");
      setBookingFetch("");
      setResetTrue(true)
      dispatch(getContactList(insId, searchTerm,
        PageSize, (currentPage - 1) * PageSize, user.user_business_type, "", ""
      ));
      setSearchFind(false);
      setTimeout(() => {
        setResetTrue(false)
      }, [1000])
      // }
      setCurrentPage(1);
    }

  }

  // useEffect(() => {
  //   if (searchFind) {
  //     dispatch(searchContactList(insId, searchTerm,
  //       PageSize, (currentPage - 1) * PageSize, user.user_business_type, "", ""
  //     ));
  //     setSearchFind(false);
  //   }
  // }, [PageSize, currentPage, dispatch, insId, searchFind, searchTerm, user.user_business_type,])

  // const formatDataForContactList = () => {
  //   const rawData = contactLists;
  //   const filterData = [];
  //   contactLists &&
  //     // eslint-disable-next-line array-callback-return
  //     rawData.map((item) => {
  //       filterData.push({
  //         Requester_Name: item.name,
  //         Requester_Email: item.requester_email,
  //         Subject_Title: item.title,
  //         DateTime: moment(item.createdAt).format(
  //           DATETIME_FORMAT_AP
  //         ),
  //         Message: item.message,
  //       });
  //     });
  //   return filterData;

  // };

  // // convert JSON Data into Excel
  // const fileType =
  //   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  // const fileName = `Contact_details`;
  // const fileExtension = ".xlsx";


  // const downloadXLSX = () => {
  //   const worksheet = XLSX.utils.json_to_sheet(formatDataForContactList());
  //   const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
  //   const excelBuffer = XLSX.write(workbook, {
  //     bookType: "xlsx",
  //     type: "array",
  //   });
  //   const data = new Blob([excelBuffer], { type: fileType });
  //   FileSaver.saveAs(data, fileName + fileExtension);
  // };

  const formatDataForContactList = {
    "business": insId,
    "industry": user.user_business_type,
    "fields": [
      "name",
      "requester_email",
      "title",
      "createdAt",
      "message",
      "contact",
      "country_code"
    ],
    "data": contactLists
  }

  const downloadXLSX = () => {
    dispatch(downloadExcelSheet(formatDataForContactList));
  }

  useEffect(() => {
    if (downloadExcelSheetSuccess) {
      window.location.href = excelFileLink.Location
    }
    return () => {
      dispatch(downloadExcelSheetReset());
    }
  }, [dispatch, downloadExcelSheetSuccess, excelFileLink.Location])

  return (
    <React.Fragment>
      <Breadcrumb>
        <BreadcrumbItem to="/" title="Dashboard" />
        {/* <BreadcrumbItem to="/website-manage" title="Manage Website" /> */}
        <BreadcrumbItem to="/contact-list" title="Contact List" />
      </Breadcrumb>
      <div className="contact-list-count">
        <p className="ManageAdmissionCount">
          Enquiry Received
          <span className="">
            {/* {contacts.success && contactLists.length} */}
            {contacts.success ? contactLists.length > 0 ?
              (ContactsListTotal <= 10 ? ContactsListTotal : ContactsListTotal - (currentPage * 10) < 0 ? `${ContactsListTotal}/${ContactsListTotal}` : `${currentPage * 10}/${ContactsListTotal}`)
              : "0" : "0"}
          </span>
          {/* <span>{contactLists.length > 1 ? " Contacts" : " Contact"}</span> */}
        </p>
      </div>
      <div className="PageTopHead PTH-AdminServiceList PHT-contact-list mt-30">
        <div className="PTH-Item">
          <button
            className="refreshBtn"
            title="Refresh"
            onClick={() => handleReloadButton()}
          >
            {/* <span className="cssIcon">
              <i className="ed-refresh"></i>
            </span> */}
            Clear All
          </button>
        </div>

        {/* select search and button in one line  */}
        <div className="PTH-Item">
          <div className="SortByTableHeadCst">
          {user.user_business_type === "Services" ?
            <div className="SortByTableHeadCst">
              <SingleSelectDropdown
                SingleSelectHandel={SingleSelectHandel1}
                selectGroup={selectEnquiryGroup}
                filterValues={filterEnquiryValues}
                SingleSelectLabelName={"All Enquiries"}
                resetState={resetState}
              />
            </div>
            : ""
          }
          </div>
        </div>
        {/* <div className="PTH-Item">
          <div className="SortByTableHeadCst">
            <SingleSelectDropdown
              SingleSelectHandel={SingleSelectHandel1}
              selectGroup={selectGroup}
              filterValues={filterValues}
              SingleSelectLabelName={"Sort by"}
              resetState={resetState}
            />
          </div>
        </div> */}

        <div className="PTH-Item P-Right">
          <SearchControl
            classNameWrappper="tableSearchbar" id="search"
            name="search"
            onKeyPress={(e) => SearchChangehandle(e)}
            onChange={onChangehandle}
            value={searchTerm}
            placeholder="Search Requester" />
        </div>

      </div>
      <ContactList contacts={contacts} contactLists={contactLists} />
      <div className='TableBottomBtn justify-start mt-20'>
        <div>
          <button
            className="button btn-o-primary primary btn-sm downlord-btn"
            title="download"
            onClick={() => downloadXLSX()}
          >
            <span className="cssIcon">
              <i className="ed-download"></i>
            </span>
          </button>
          <span>Download</span>
        </div>

        <div className="Result-container">
          <div className="TotalCount-wrap">
            <p>Results <span>{currentPage}</span>-<span>{PageSize}</span> of <span>{ContactsListTotal}</span></p>
          </div>
          {contacts.success&&parseInt(ContactsListTotal) >10 ?
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={ContactsListTotal}
            pageSize={PageSize}
            onPageChange={page => setCurrentPage(page)}
          />:""}
         
        </div>
      </div>
    </React.Fragment>
  );
}

export default Contacts;