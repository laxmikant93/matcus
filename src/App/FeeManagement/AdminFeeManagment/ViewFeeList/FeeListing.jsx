/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppLink from "../../../../Common/AppLink";
import { getInstituteFeeStructureList, getInstituteFeeStructureListScrolling, postExcelSheetColumns, resetExcelSheetColumns } from "../../../../store/actions/feeManagement";
import DummyProfile from "../../../../assets/images/img/DummyProfile.png";
import NoDataAvailable from "../../../../Common/NoDataAvailable";
import { useNavigate } from "react-router-dom";
import PreviewPaidFee from "./PreviewPaidFee";
import ExcelSheetCheckboxes from "../../../../Common/DownloadExcelSheetCheckboxes";
import Pagination from "../../../../Common/Pagination";

function FeeListing({
  ClassRoomId,
  institute,
  searchTerm,
  feeList,
  manageModalEdit,
  manageModalState,
  manageModalPaidPreview,
  filter,
  startDate,
  feeYear,
  type,
  resetPagination
}) {
  let PageSize = 10;
  const filterData = filter;
  const startDateData = startDate;
  const [skip, setSkip] = useState(0);
  const [scrollLoading, setScrollLoading] = useState(false);
  const [checkIsValid, setCheckIsValid] = useState(false)
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [excelModal, setExcelModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const { success, loading, postExcelFileSuccess, excelFileLink } = useSelector((state) => {
    return {
      success: state.feeManagement.feeList.success,
      loading: state.feeManagement.feeList.loading,
      excelFileLink: state.feeManagement.postExcelSheetColumn.data,
      postExcelFileSuccess: state.feeManagement.postExcelSheetColumn.success
    };
  });

  var today = new Date();

  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var selectDate =
    startDateData.getFullYear() +
    "-" +
    (startDateData.getMonth() + 1) +
    "-" +
    startDateData.getDate();
  const columnList = [
    {
      name: "Full Name",
      value: "fullname"
    }, {
      name: "Payment Cycle",
      value: "paymentCycle"
    }, {
      name: "Payment Month",
      value: "paymentMonth"
    },
    {
      name: "Username",
      value: "username"
    },
    {
      name: "Payment Type",
      value: "paymentType"
    },
    {
      name: "Fee Status",
      value: "feeStatus"
    },
  ];
  const postExcelData = () => {
    return {
      "institute": institute,
      "classRoomId": ClassRoomId,
      "search": searchTerm,
      "fields": selectedColumns,
      "filename": "StudentFeeList",
      "type": "InstituteStudentFee",
      "filter": filter,
      "date": startDate
    }
  }
  const closeModal = () => {
    setExcelModal(false)
  }
  const downloadExcelFile = (values) => {
    setSelectedColumns(values)
  }
  const handleSave = () => {
    
    setCheckIsValid(true)
    if (selectedColumns.length > 0) {
   
      dispatch(postExcelSheetColumns(postExcelData()))
    }
  }
  useEffect(() => {
    if (postExcelFileSuccess) {
      window.location.href = excelFileLink.Location
      setTimeout(() => {
        dispatch(resetExcelSheetColumns())
      }, 300);
      setExcelModal(false)
    }
  }, [postExcelFileSuccess]);
  // const ScrollANdSearch = useCallback(async (s, type) => {
  //   if (type === "scroll") {
  //     let newSkip = (await s) + 10;
  //     await setSkip(newSkip);
  //     dispatch(
  //       getInstituteFeeStructureListScrolling(
  //         ClassRoomId,
  //         institute,
  //         newSkip,
  //         searchTerm,
  //         startDateData,
  //         filterData
  //       )
  //     );
  //   }
  //   setTimeout(() => {
  //     setScrollLoading(false);
  //   }, 1500);
  // }, []);
  // useEffect(() => {
  //   const onScroll = function async() {
  //     if (window.innerHeight + window.scrollY > document.body.offsetHeight) {
  //       !scrollLoading && ScrollANdSearch(skip, "scroll");
  //       setScrollLoading(true);
  //     }
  //   };
  //   window.addEventListener("scroll", onScroll);
  //   return () => window.removeEventListener("scroll", onScroll);
  // }, [scrollLoading, ScrollANdSearch, skip]);
  useEffect(() => {
    dispatch(
      getInstituteFeeStructureList(
        ClassRoomId,
        institute,
        searchTerm,
        startDate,
        type,
        PageSize,
        (currentPage - 1) * PageSize
      )
    );
    feeYear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);
  useEffect(() => {
    setCurrentPage(1);
  }, [resetPagination])

  const calculatedAcedemicAmount = (item) => {
    let acedmicAmount = item.map((data) => {
      return parseFloat(data.amount ? data.amount : 0);
    });
    let totalAmount = acedmicAmount.reduce((a, b) => a + b, 0);
    const validAcedmicAmount = totalAmount ? totalAmount : 0;
    return validAcedmicAmount;
  };
  const downloadXLSX = () => {
    setExcelModal(true)
  }
  return (
    <div className="gridListTable">
      <ul className="gridHeader">
        <li className="col col-3">Students</li>
        <li className="col col-2">Academic/Tution</li>
        <li className="col col-3">Discount/Scholarship</li>
        <li className="col col-2">Total Fee & Status</li>
        <li className="col col-2">&nbsp;</li>
      </ul>
      {feeList.structure && feeList.structure.length > 0 ? (
        <div className="gridBody">
          <div className="gridRow">
            <React.Fragment>
              {feeList.structure.map((item) => {
                return item.feeStatus === "Paid" ? (
                  <ul className="topInfo" key={item._id}>
                    <li className="col col-3" data-head="Students">
                      <div className="userDetails">
                        <div className="profileCircle">
                          <a
                            href={`/profile/${item.username}`}
                            rel="noreferrer"
                            target="_blank"
                          >
                            {item.profile_picture ? <img src={item.profile_picture} alt="Akansha Negi" /> : <img src={DummyProfile} alt="Akansha Negi" />}
                          </a>
                        </div>
                        <div className="profileDetails">
                          <div className="profile-name">
                            <a
                              href={`/profile/${item.username}`}
                              rel="noreferrer"
                              target="_blank"
                            >
                              {item.fullname}
                            </a>
                          </div>
                          <div className="admission-no">
                            <span>ADM No. {item.admission_no}</span>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="col col-2" data-head="Academic/Tution">
                      ₹
                      {item.feestructure.length > 0 &&
                        calculatedAcedemicAmount(item.feestructure)}
                    </li>
                    <li className="col col-3" data-head="Discount/Scholarship">
                      ₹{item.feeStudentDiscount + item.feeStudentScholorship}
                    </li>
                    <li className="col col-2" data-head="Total Fee & Status">
                      ₹
                      {item.totalAmount -
                        (item.feeStudentScholorship + item.feeStudentDiscount)}
                      <div className=" w-600 secondary mt-3">
                        <i className="icon-checkMark"></i> Paid
                      </div>
                    </li>
                    <li className="col col-2 actionCols">
                      <div className="actionBtn">
                        {/* <AppLink
                          className="btn-square"
                          title="Download Fee Slip"
                          to="/view-fee-listing"
                        >
                          <span className="cssIcon">
                            <i className="ed-download"></i>
                          </span>
                        </AppLink> */}

                        <button
                          className="btn-square"
                          title="View Fee"
                          // to="/preview-paid-fee/"
                          to={`/preview-paid-fee/${item._id}`}
                          onClick={() => manageModalPaidPreview(item)}
                        >
                          <span className="cssIcon">
                            <i className="ed-eye"></i>
                          </span>
                        </button>
                      </div>
                    </li>
                  </ul>
                ) : (
                  <ul className="topInfo" key={item._id}>
                    <li className="col col-3">
                      <div className="userDetails">
                        <div className="profileCircle">
                          <a
                            href={`/profile/${item.username}`}
                            rel="noreferrer"
                            target="_blank"
                          >
                            {item.profile_picture ? <img src={item.profile_picture} alt="Akansha Negi" /> : <img src={DummyProfile} alt="Akansha Negi" />}

                          </a>
                        </div>
                        <div className="profileDetails">
                          <div className="profile-name">
                            <a
                              href={`/profile/${item.username}`}
                              rel="noreferrer"
                              target="_blank"
                            >
                              {item.fullname}
                            </a>
                          </div>
                          <div className="admission-no">
                            <span>ADM No. {item.admission_no}</span>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="col col-2" data-head="Academic/Tution">
                      ₹
                      {item.feestructure.length > 0 &&
                        calculatedAcedemicAmount(item.feestructure)}
                    </li>
                    <li className="col col-3" data-head="Discount/Scholarship">
                      ₹{item.feeStudentDiscount + item.feeStudentScholorship}
                    </li>
                    <li className="col col-2" data-head="Total Fee & Status">
                      ₹
                      {item.totalAmount -
                        (item.feeStudentScholorship + item.feeStudentDiscount)}
                      <div className="btn-o-primary button btn-2xs button-block">
                        {selectDate > date ? (
                          "Collect Fee"
                        ) : (
                          <AppLink
                            to={`/collect-fee/${item._id}/${ClassRoomId}`}
                            className="btn-o-primary button btn-2xs"
                          >
                            Collect Fee
                          </AppLink>
                        )}
                      </div>
                    </li>
                    {/* <li className="col col-2" data-head="Total Fee">
                      ₹{item.totalAmount}
                    </li> */}

                    <li className="col col-2 actionCols">
                      <div className="actionBtn">
                        {/* <button
                          className="btn-square notified"
                          title="Nofitied to student"
                        >
                          <span className="cssIcon">
                            <i className="icon-bell-solid"></i>
                          </span>
                        </button> */}
                        <button
                          className="btn-square"
                          title="Edit Fee"
                          onClick={() => manageModalEdit(item)}
                        >
                          <span className="cssIcon">
                            <i className="ed-pen"></i>
                          </span>
                        </button>
                        <button
                          className="btn-square"
                          title="View Fee"
                          onClick={() => manageModalState(item)}
                        >
                          <span className="cssIcon">
                            <i className="ed-eye"></i>
                          </span>
                        </button>
                      </div>
                    </li>
                  </ul>
                );
              })}
            </React.Fragment>
          </div>
        </div>
      ) : success && feeList.structure && feeList.structure.length === 0 ? (
        <NoDataAvailable title="Record Not Found" />
      ) : (
        <div className="loadingGridData">
          <i className="ed-loadingGrid"></i>
        </div>
      )}
      <React.Fragment>
        {/* {student.length > 0 && ( */}
        <div className="TableBottomBtn between-xs flex mt-20">
          <div>
            <button
              className="button btn-o-primary primary btn-sm"
              onClick={downloadXLSX}
              title="Download"
            >
              <span className="cssIcon">
                <i className="ed-download"></i>
              </span>
            </button>
          </div>
          {feeList.totalStructure && feeList.totalStructure > 0 &&
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={feeList.totalStructure}
              pageSize={PageSize}
              onPageChange={page => setCurrentPage(page)}
            />}

        </div>
        {/* )} */}
      </React.Fragment>
      {
        excelModal && <ExcelSheetCheckboxes show={excelModal} onClose={closeModal} columnList={columnList} OnSelectedValue={downloadExcelFile} saveDownload={handleSave} isValidCheck={checkIsValid} />
      }

    </div>
  );
}
export default FeeListing;
