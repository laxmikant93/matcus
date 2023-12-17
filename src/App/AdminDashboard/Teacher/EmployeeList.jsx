/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLink from '../../../Common/AppLink';
import { useDetectOutsideClick } from '../../../Common/DetectOutsideClick/useDetectOutsideClick';
import SearchControl from '../../../Common/SearchControl';
import { deleteEmployee, getEmployeeList, resetEmployeeList } from '../../../store/actions/employee';
import DummyProfile from "../../../assets/images/img/DummyProfile.png";
import NoDataAvailable from '../../../Common/NoDataAvailable';
import Popup from '../../../Common/Popup';
import UseOutsideClick from '../../../Common/UseOutsideClick';
import ImageViewer from '../../../Common/ImageViewer';
const EmployeeList = () => {
  const dispatch = useDispatch()
  const { user, deleteEmployeeLoading, deleteEmployeeSuccess, employeList, employeListSuccess } = useSelector((state) => {
    return {
      user: state.user,
      employeList: state.employee.list.data,
      employeListLoading: state.employee.list.loading,
      employeListSuccess: state.employee.list.success,
      deleteEmployeeLoading: state.employee.delete.loading,
      deleteEmployeeSuccess: state.employee.delete.success
    }
  })
  const dropdownRef = useRef()
  const [employeeId, setEmployeeId] = useState("")

  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

  const onClickBtnDropDownRemove = (_id, isActive) => {
    setEmployeeId(_id);
    setIsActive(isActive);
  };
  const [modalItemId, setModalItemId] = useState("");
  const [modal, setModal] = useState(false);
  const openModal = (_id) => {
    setModal(!modal);
    setModalItemId(_id);
  };
  const courseModalRef = useRef()
  UseOutsideClick(courseModalRef, () => {
    if (modal) setModal(false);
  });
  const handleDelete = (_id) => {
    dispatch(deleteEmployee(_id))
  }
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };
  const [employeeLength, setEmployeeLength] = useState("");
  const [searchFind, setSearchFind] = useState(false);
  useEffect(() => {
    if (searchTerm) {
      setSearchFind(true);
      let arr = [];
      for (let i = 0; i < employeList.length; i++) {
        if (
          employeList[i].fullname
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        ) {
          arr.push(employeList[i]);
        }
      }
      setEmployeeLength(arr.length);
    } else {
      setSearchFind(false);
    }
  }, [employeList, searchTerm]);
  useEffect(() => {
    dispatch(getEmployeeList(user.user_institute, "employee"))
  }, [dispatch, user.user_institute])
  useEffect(() => {
    return () => {
      dispatch(resetEmployeeList())
    }
  }, [dispatch])

  useEffect(() => {
    !deleteEmployeeLoading && deleteEmployeeSuccess && setIsActive(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteEmployeeLoading, deleteEmployeeSuccess]);
  return (
    <React.Fragment>
      <div className="PageTopHead PTH-InviteFacultyList mt-20">
        <div className="PTH-Item">
          <p className="text-sm w-300">
            {employeListSuccess ? (
              searchFind ? (
                <>
                  {employeeLength > 1 ? (
                    <>
                      <span className="primary">{employeeLength}</span>
                      &nbsp; Employees
                    </>
                  ) : (
                    <>
                      <span className="primary">{employeeLength}</span>
                      &nbsp;Employee
                    </>
                  )}
                </>
              ) : (
                <>
                  {employeList.length > 1 ? (
                    <>
                      <span className="primary">
                        {employeList.length}
                      </span>
                      &nbsp; Employees
                    </>
                  ) : (
                    <>
                      <span className="primary">
                        {employeList.length}
                      </span>
                      &nbsp;Employee
                    </>
                  )}
                </>
              )
            ) : (
              "Employee"
            )}
          </p>
        </div>
        <div className="PTH-Item">

        </div>
        <div className="PTH-Item">

        </div>
        <div className="PTH-Item P-Right">
          <SearchControl
            classNameWrappper="tableSearchbar"
            onChange={handleChange}
            id="search"
            name="search"
            placeholder="Employee Search"
          />
        </div>
        <div className="PTH-Item">
          <AppLink
            className="button button-primary btn-oval btn-sm button-block"
            to="/invite-faculty"
          >
            <i className="ed-icon icon-plus-add white i-xs"></i>
            Invite Staff
          </AppLink>
        </div>
      </div>
      <div className="gridListTable">
        <ul className="gridHeader">
          <li className="col col-4">Employee Details</li>
          <li className="col col-3">
            Role Access&nbsp;
          </li>
          <li className="col col-3">Last Sign In</li>
          <li className="col col-2">&nbsp;</li>
        </ul>
        <div className="gridBody"
        >
          {employeListSuccess ? (
            employeList.length > 0 ? (
              employeList.filter((item) => {
                if (searchTerm === "") {
                  return item;
                } else if (
                  item.fullname
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                ) {
                  return item;
                }
              }).map((item, key) => {
                return (
                  <div className="gridRow" key={key}>
                    <ul className="topInfo">
                      <li
                        className="col col-4"
                        data-head="Faculty Details"
                      >
                        <div className="userDetails">
                          <div className="profileCircle">
                            <a
                              href={`/profile/${item.username}`}
                              rel="noreferrer"
                              target="_blank"
                            >
                              <ImageViewer
                                object={
                                   item.profile_picture
                                }
                                defaultImage={DummyProfile}
                                alt="user profile"
                              />
                            </a>
                          </div>
                          <div className="profileDetails">
                            <div className="profile-name">
                              <a
                                href={`profile/${item.username}`}
                                rel="noreferrer"
                                target="_blank"
                              >
                                {item.fullname}
                              </a>
                            </div>
                            <div className="profile-email">
                              {item.email}
                            </div>
                            <div className="profile-contact">
                              {item.country_code}
                              {!item.country_code
                                ? ""
                                : "-"}
                              {item.contact}
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="col col-3" data-head="Role Access">
                        <div className="teacherList">
                          <div>
                            {item.roleaccess &&
                              item.roleaccess.length === 1 ?
                              item.roleaccess[0].replace("_", " ").replace("_", " ") : item.roleaccess && item.roleaccess.length > 1 ? "" : "Not Assigned"}
                          </div>&nbsp;&nbsp;
                          {item.roleaccess && item.roleaccess.length > 1 && (
                            <button
                              type="button"
                              className="btn_badge_tech white"
                              onClick={() => openModal(item._id)}
                            >
                              {item.roleaccess.length}
                            </button>
                          )}
                          {item._id === modalItemId &&
                            modal &&
                            item.roleaccess.length && (
                              <div className="teacherListCustom" ref={courseModalRef}>
                                <div className="teacherItem">
                                  {item.roleaccess.map((item) => {
                                    return (
                                      <React.Fragment>
                                        <p
                                          className="text-2xs mb-3 w-600"
                                        >
                                          {item.replace("_", " ").replace("_", " ")}
                                        </p>
                                      </React.Fragment>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                        </div>
                      </li>

                      <li
                        className="col col-3"
                        data-head="Last Sign in"
                      >
                        {item.lastLoginDate &&
                          item.lastLoginDate ? (
                          <React.Fragment>
                          </React.Fragment>
                        ) : (
                          "Not Logged"
                        )}
                      </li>
                      <li className="col col-2 actionCols">
                        <div className="actionBtn">
                          <button
                            className="btn-square"
                            title="Remove"
                            onClick={() =>
                              onClickBtnDropDownRemove(item._id, true)
                            }
                          >
                            <span className="cssIcon">
                              <i className="ed-trash"></i>
                            </span>
                          </button>
                        </div>

                        {
                          item._id === employeeId && isActive && (
                            <Popup
                              show={isActive}
                              RemovePopToggleRef={dropdownRef}
                              CancelProp={() => setIsActive(!isActive)}
                              RemoveProp={() => handleDelete(item._id)}
                              loading={deleteEmployeeLoading}
                            >
                              <p className="gray text-xxs w-300">
                                You are about to remove this Employee.
                              </p>
                              <p className="dgray text-xxs w-400">Are you sure?</p>
                            </Popup>
                          )
                        }

                      </li>
                    </ul>
                  </div>
                );
              })
            ) : (
              <li>
                {/* <td colSpan="6"> */}
                <NoDataAvailable title="No Records Found." />
                {/* </td> */}
              </li>
            )
          ) : (
            <div className="loadingGridData">
              <i className="ed-loadingGrid"></i>
            </div>
          )}
          {
            employeListSuccess &&
              searchFind &&
              employeList.length > 0 &&
              employeeLength === 0 ? (
              <div className="loadingGridData">No records found.</div>
            ) : (
              ""
            )
          }
        </div>
      </div>
    </React.Fragment>
  )
}
export default EmployeeList;