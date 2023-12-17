/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import Breadcrumb from "../../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../../Common/Breadcrumb/BreadcrumbItem";
import GrayAuthTheme from "../../../../Common/Theme/GrayAuthTheme";
import "../../fee-management.scss";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FeeListing from "./FeeListing";
import PreviewFeeModal from "./PreviewFeeModal";
import EditFeeModal from "./EditFeeModal";
import { getInstituteFeeStructureList } from "../../../../store/actions/feeManagement";
import { useDetectOutsideClick } from "../../../../Common/DetectOutsideClick/useDetectOutsideClick";
import FilterViewFee from "./FilterViewFee";
import PreviewPaidFee from "./PreviewPaidFee";
const ViewFeeList = () => {
  const dropdownRef = useRef(null);
  const dropdownRefEdit = useRef(null);
  const [modalState, setModalState] = useDetectOutsideClick(dropdownRef, false);
  const [modalStateEdit, setModalStateEdit] = useDetectOutsideClick(
    dropdownRefEdit,
    false
  );
  const [resetPagination, SetResetPagination] = useState("");
  const [paidPreviewModal, setPaidPreviewModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [courseYear, setCourseYear] = useState("");
  const [editData, setEditData] = useState("");
  const [preview, setPreview] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [filter, setFilter] = useState("");
  const { user, feeList } = useSelector((state) => {
    return {
      user: state.user,
      feeList: state.feeManagement.feeList.data,
    };
  });
  const dispatch = useDispatch();
  const manageModalState = (item) => {
    setPreview(item);
    setModalState(!modalState);
  };
  const closeModalState = () => {
    setModalState(!modalState);
  };
  const manageModalEdit = (item) => {
    setModalStateEdit(!modalStateEdit);
    setEditData(item ? item : "");
  };
  const closeModalStateEdit = () => {
    setModalStateEdit(!modalStateEdit);
    setEditData("");
  };

  const manageModalPaidPreview = (item) => {
    setPreview(item);
    setPaidPreviewModal(!paidPreviewModal);
  };
  const closeManagePaidPreview = () => {
    setPreview("");
    setPaidPreviewModal(!paidPreviewModal);
  };

  const { ClassRoomId } = useParams();
  const feeYear = () => {
    if (feeList && feeList.ClassRoom && feeList.ClassRoom.session) {
      if (feeList.ClassRoom.session.sessionExist) {
        if (new Date().getMonth() < 3) {
          setCourseYear(
            `${new Date().getFullYear() - 1}-${new Date().getFullYear()}`
          );
        } else {
          setCourseYear(
            `${new Date().getFullYear()}-${new Date().getFullYear() - 1}`
          );
        }
      } else {
        setCourseYear(`${new Date().getFullYear()}`);
      }
    } else {
      setCourseYear(`${new Date().getFullYear()}`);
    }
  };

  useEffect(() => {
    dispatch(
      getInstituteFeeStructureList(
        ClassRoomId,
        user.user_institute,
        searchTerm,
        startDate,
        ""
      )
    );
    feeYear();
    SetResetPagination("");
  }, [user.user_institute, ClassRoomId, dispatch, searchTerm]);
  let typing;
  const handleSearch = (event) => {
    event.preventDefault();
    clearTimeout(typing);
    typing = setTimeout(() => {
      setSearchTerm(event.target.value);
    }, 400);

    if (!event.target.value) {
      clearTimeout(typing);
      setSearchTerm("");
    }
  };
  // useEffect(() => {
  //   dispatch(getInstituteFeeStructureList(ClassRoomId, user.user_institute, searchTerm));
  // }, [searchTerm, dispatch]);
  const handleFilterChange = (type) => {
    SetResetPagination("Reset")
    switch (type) {
      case "Paid": {
        dispatch(
          getInstituteFeeStructureList(
            ClassRoomId,
            user.user_institute,
            searchTerm,
            startDate,
            type,
            10, 0
          )
        );
        setFilter(type);
        break;
      }
      case "Pending": {
        dispatch(
          getInstituteFeeStructureList(
            ClassRoomId,
            user.user_institute,
            searchTerm,
            startDate,
            type,
            10, 0
          )
        );
        setFilter(type);
        break;
      }
      default: {
        dispatch(
          getInstituteFeeStructureList(
            ClassRoomId,
            user.user_institute,
            searchTerm,
            startDate,
            "",
            10, 0
          )
        );
        setFilter("");
      }
    }
  };
  const handleDateFilter = (data) => {
    dispatch(
      getInstituteFeeStructureList(
        ClassRoomId,
        user.user_institute,
        searchTerm,
        data,
        filter,
        10,
        0
      )
    );
    SetResetPagination("Reset");
    setStartDate(data);
  };
  return (
    <>
      <React.Fragment>
        <>
          <Breadcrumb>
            <BreadcrumbItem to="/" title="Dashboard" />
            <BreadcrumbItem to="/fee-management" title="Fee Management" />
            <BreadcrumbItem
              to={`/view-fee-listing/${ClassRoomId}`}
              title="view fee"
            />
          </Breadcrumb>
          <div className="pageHeadIntro">
            <p className="text-sm w-300">View Fee</p>
            <p className="text-xxs w-600">
              {feeList.ClassRoom && feeList.ClassRoom.coursename}, {courseYear}
            </p>
          </div>
          <FilterViewFee
            handleSearch={handleSearch}
            startDate={startDate}
            handleChange={handleFilterChange}
            handleDateFilter={handleDateFilter}
            reset={() => setSearchTerm("")}
          />
          <FeeListing
            feeList={feeList}
            ClassRoomId={ClassRoomId}
            searchTerm={searchTerm}
            institute={user.user_institute}
            manageModalState={manageModalState}
            manageModalEdit={manageModalEdit}
            manageModalPaidPreview={manageModalPaidPreview}
            filter={filter}
            startDate={startDate}
            feeYear={feeYear}
            type={filter}
            resetPagination={resetPagination}
          />
        </>
        <PreviewFeeModal
          modalState={modalState}
          closeModalState={closeModalState}
          feeList={feeList}
          preview={preview}
          ref={dropdownRef}
        />

        <EditFeeModal
          closeModalStateEdit={closeModalStateEdit}
          coursename={feeList.ClassRoom ? feeList.ClassRoom.coursename : ""}
          modalStateEdit={modalStateEdit}
          courseYear={courseYear}
          editData={editData}
          ref={dropdownRefEdit}
        />
        <PreviewPaidFee
          closeManagePaidPreview={closeManagePaidPreview}
          paidPreviewModal={paidPreviewModal}
          preview={preview}
        />
      </React.Fragment>
    </>
  );
};
export default ViewFeeList;
