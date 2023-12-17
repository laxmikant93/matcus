/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import SearchControl from '../../../Common/SearchControl';
import Breadcrumb from "../../../Common/Breadcrumb";
import BreadcrumbItem from "../../../Common/Breadcrumb/BreadcrumbItem";
import { getAllSTAFFList, updateStaffAccess } from "../../../store/actions/accesscontrol";
import "./AccessControl.scss";
import GrayAuthTheme from '../../../Common/Theme/GrayAuthTheme';
import NoDataAvailable from '../../../Common/NoDataAvailable';
import DummyProfile from "../../../assets/images/img/DummyProfile.png";
import ValidationFile from '../../../Classes/ValidationFile';
import ImageViewer from '../../../Common/ImageViewer';

const RoleAccess = () => {
  const dispatch = useDispatch();
  const [staffData, setStaffData] = useState([])
  const { users, getTeacherListLoading, getTeacherListSuccess, getTeacherListData, patchTeacherAccessControlLoading } = useSelector((state) => {
    return {
      users: state.user,
      getTeacherListLoading: state.accesscontrol.list.loading,
      getTeacherListSuccess: state.accesscontrol.list.success,
      getTeacherListData: state.accesscontrol.list.data,
      patchTeacherAccessControlLoading: state.accesscontrol.updateStaffList.loading,
      patchTeacherAccessControlSuccess: state.accesscontrol.updateStaffList.success,
      patchTeacherAccessControlData: state.accesscontrol.updateStaffList.data,

    }
  });

  const [toggle, setToggle] = useState("TeacherList");

  useEffect(() => {
    setSearchTerm("")
  }, [toggle])
  useEffect(() => {
    if (!getTeacherListLoading &&
      getTeacherListSuccess && getTeacherListData) {
      setStaffData(getTeacherListData);
    }
  }, [getTeacherListLoading,
    getTeacherListSuccess,
    getTeacherListData])

  useEffect(() => {
    if (toggle === "TeacherList") {
      dispatch(getAllSTAFFList(users.user_institute, "teacher"))
    } else {
      dispatch(getAllSTAFFList(users.user_institute, "employee"))
    }
  }, [dispatch, toggle, users.user_institute])
  const roles = ["manage_study_material", "manage_classroom", "manage_visitor_management", "manage_attendance", "manage_online_test", "manage_assignment", "manage_online_class"]
  const employeeRoles = ["manage_website", "manage_study_material", "manage_student", "manage_teacher", "manage_classroom", "manage_visitor_management", "manage_guard_management", "manage_attendance", "manage_fee_management", "manage_access_control"]

  const handelRoleChecked = (e, key, value, item) => {

    let checked = e.target.checked;
    let staffDataPrep = staffData;

    if (checked) {
      staffDataPrep[key].roleaccess.push(value);
      setStaffData([...staffDataPrep])
    } else {

      let itemKey = staffDataPrep[key].roleaccess.indexOf(value);
      staffDataPrep[key].roleaccess.splice(itemKey, 1)
      setStaffData([...staffDataPrep])

    }
  }
  const handelRoleALLChecked = (e, key, item) => {
    let checked = e.target.checked;
    let staffDataPrep = staffData;
    if (checked) {
      staffDataPrep[key].roleaccess = toggle === "TeacherList" ? roles : employeeRoles;
      setStaffData([...staffDataPrep])
    } else {
      staffDataPrep[key].roleaccess = [];
      setStaffData([...staffDataPrep])
    }

  }
  const FormDataResult = () => {
    let dataResult = [];
    for (let i = 0; i < staffData.length; i++) {
      let data = {
        "id": staffData[i]._id,
        "roleaccess": staffData[i].roleaccess
      }
      dataResult.push(data)
    }
    return dataResult
  }
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (e) => {
    setSearchTerm(ValidationFile.spaceNotAccept(e.target.value));
  };
  const [staffLength, setStaffLength] = useState("");
  const [searchFind, setSearchFind] = useState(false);
  useEffect(() => {
    if (searchTerm) {
      setSearchFind(true);
      let arr = [];
      for (let i = 0; i < staffData.length; i++) {
        if (
          staffData[i].fullname
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        ) {
          arr.push(staffData[i]);
        }
      }
      setStaffLength(arr.length);
    } else {
      setSearchFind(false);
    }
  }, [staffData, searchTerm]);
  const SubmitRoleAccessSelections = () => {
    dispatch(updateStaffAccess(FormDataResult()))
  }
  return (
    <>
      <React.Fragment>
        <Breadcrumb>
          <BreadcrumbItem to="/" title="Dashboard" />
          <BreadcrumbItem to="/access-control" title="Role Access" />
        </Breadcrumb>
        <div className="RoleAccessWrapper mt-20">
          <div className="PageTopHead PTH-RoleAccessSetting">
            <div className="PTH-Item">
              <h1 className="text-sm w-400">Role Access</h1>

            </div>
            <div className="PTH-Item">
              <p className="text-sm w-300">
                {getTeacherListSuccess ? (
                  searchFind ? (
                    <>
                      {staffLength > 1 ? (
                        <>
                          <span className="primary">{staffLength}</span>
                          &nbsp; {toggle === "TeacherList" ? "Teachers" : "Employees"}
                        </>
                      ) : (
                        <>
                          <span className="primary">{staffLength}</span>
                          &nbsp;{toggle === "TeacherList" ? "Teacher" : "Employee"}
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {staffData.length > 1 ? (
                        <>
                          <span className="primary">
                            {staffData.length}
                          </span>
                          &nbsp; {toggle === "TeacherList" ? "Teachers" : "Employees"}
                        </>
                      ) : (
                        <>
                          <span className="primary">
                            {staffData.length}
                          </span>
                          &nbsp;{toggle === "TeacherList" ? "Teacher" : "Employee"}
                        </>
                      )}
                    </>
                  )
                ) : (
                  toggle === "TeacherList" ? "Teacher" : "Employee"
                )}
              </p>
            </div>
            <div className="PTH-Item P-Right">
              <SearchControl
                classNameWrappper="tableSearchbar"
                onChange={handleChange}
                id="search"
                name="search"
                value={searchTerm}
                placeholder={toggle === "TeacherList" ? "Teacher Search" : "Employee Search"}
              />
            </div>
            {/* <div className="ViewClassroomTabBar"> */}
            <div className="scroll-nav-tab-wrapper">
              <ul className=" scroll-nav-tab">
                <ul className="ViewClassroomTabListNew scroll-nav-tab">
                  <li
                    className={`button  btn-sm mr-5  ${toggle === "TeacherList"
                      ? "button-primary primary"
                      : "btn-o-primary primary"
                      }`}
                    onClick={() =>
                      setToggle(
                        toggle === "TeacherList"
                          ? "TeacherList"
                          : "TeacherList"
                      )
                    }
                  >
                    Teacher List
                  </li>
                  <li
                    className={`button  btn-sm ${toggle === "EmployeeList"
                      ? "button-primary primary"
                      : "btn-o-primary primary"
                      }`}
                    onClick={() =>
                      setToggle("EmployeeList")
                    }
                  >
                    Employee List
                  </li>
                </ul>
              </ul>
            </div>
            {/* </div> */}
          </div>
          <div className="RoleAccessCustom">
            <div className="RoleAccess-List-View-Wrapper">
              <table>
                <thead>
                  <tr>
                    <th>User Detail</th>
                    <th>Select/Un-Select all</th>
                    <React.Fragment>
                      {toggle === "EmployeeList" ? (
                        employeeRoles.map((item, key) => {
                          return (
                            <React.Fragment key={key}>
                              <th>{item.replace("_", " ").replace("_", " ")}</th>
                            </React.Fragment>
                          )
                        })
                      ) : (

                        roles.map((item, key) => {
                          return (
                            <React.Fragment key={key}>
                              <th>{item.replace("_", " ").replace("_", " ")}</th>
                            </React.Fragment>
                          )
                        })
                      )}
                    </React.Fragment>
                  </tr>
                </thead>
                <tbody>
                  <React.Fragment>
                    {getTeacherListLoading == false && getTeacherListSuccess ? (
                      <React.Fragment>
                        {getTeacherListSuccess && getTeacherListData.length > 0 && staffData.length > 0 ? (staffData.filter((item) => {
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
                            <tr key={key}>
                              <th>
                                <div className="scroll-nav-tab-wrapper">
                                  <div className="Attendance-ProfileDetail">
                                    <a href={`profile/${item.username}`}
                                      rel="noreferrer"
                                      target="_blank"
                                    >
                                      <ImageViewer 
                                      object={item.profile_picture}
                                      defaultImage={DummyProfile} />
                                    </a>

                                    <div className="scroll-nav-tab-wrapper">
                                      <div className="ProfileDetail">
                                        <a className="text-rgf w-600"
                                          href={`profile/${item.username}`}
                                          rel="noreferrer"
                                          target="_blank"
                                        >
                                          {item.fullname}
                                        </a>
                                        {/* <p className="text-rgf w-600">{item.fullname}</p> */}
                                        <p className="text-2xs primary w-500" title="jasminegargedneed@gmail.com">{item.email ? item.email : ""}</p>
                                        <p className="text-xxs primary w-500">{item.contact && item.country_code ? ` +${item.country_code}-${item.contact}` : ""}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </th>
                              <td data-label="Select all">
                                <div className="input-custom-type">
                                  <label>
                                    {toggle === "EmployeeList" ? (<input
                                      checked={item.roleaccess.length === employeeRoles.length}
                                      type="checkbox"
                                      onChange={(e) => handelRoleALLChecked(e, key, item)}
                                    />) : (<input
                                      checked={item.roleaccess.length === roles.length}
                                      type="checkbox"
                                      onChange={(e) => handelRoleALLChecked(e, key, item)}
                                    />)

                                    }

                                  </label>
                                </div>
                              </td>
                              <React.Fragment>
                                {toggle === "EmployeeList" ? (
                                  employeeRoles.length > 0 ? (employeeRoles.map((roleAccessItem, roleAccessKey) => {
                                    return (
                                      <React.Fragment>
                                        <td data-label={`${roleAccessItem.replace("_", " ").replace("_", " ")}`} roleAccessKey={roleAccessKey}>
                                          <div className="input-custom-type">
                                            <label>
                                              <input checked={item.roleaccess.includes(roleAccessItem)}
                                                type="checkbox"
                                                onChange={(e) => handelRoleChecked(e, key, roleAccessItem, item)}
                                              />
                                            </label>
                                          </div>
                                        </td>
                                      </React.Fragment>
                                    )
                                  })
                                  ) : <NoDataAvailable title="No Records Found" />
                                ) : (
                                  roles.length > 0 ? (roles.map((roleAccessItem, roleAccessKey) => {
                                    return (
                                      <React.Fragment>
                                        <td data-label={`${roleAccessItem.replace("_", " ").replace("_", " ")}`} roleAccessKey={roleAccessKey}>
                                          <div className="input-custom-type">
                                            <label>
                                              <input checked={item.roleaccess.includes(roleAccessItem)}
                                                type="checkbox"
                                                onChange={(e) => handelRoleChecked(e, key, roleAccessItem, item)}
                                              />
                                            </label>
                                          </div>
                                        </td>
                                      </React.Fragment>
                                    )
                                  })
                                  ) : <NoDataAvailable title="No Records Found" />
                                )}

                              </React.Fragment>
                            </tr>
                          )
                        })
                        ) :
                          <tr>
                            <td colSpan="5">
                              <NoDataAvailable title={toggle === "TeacherList" ? "No Teacher Found." : "No Employee Found."} />
                            </td>
                          </tr>
                        }
                      </React.Fragment>
                    ) :
                      <div className="loadingGridData">
                        <i className="ed-loadingGrid"></i>
                      </div>
                    }
                  </React.Fragment>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="mt-20">
          {getTeacherListSuccess && getTeacherListData.length > 0 &&
            (
              <>
                {
                  patchTeacherAccessControlLoading ? (
                    <button
                      className="button button-primary btn-oval btn-sm"
                      onClick={SubmitRoleAccessSelections}
                    >
                      <i className="ed-icon icon-plus-add white i-xs"></i>
                      Saving...
                    </button>
                  ) : (
                    <button
                      className="button button-primary btn-oval btn-sm"
                      onClick={SubmitRoleAccessSelections}
                    >
                      <i className="ed-icon icon-plus-add white i-xs"></i>
                      Save Role
                    </button>
                  )
                }
              </>
            )
          }
        </div>
      </React.Fragment>
    </>
  )
}

export default RoleAccess