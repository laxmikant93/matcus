import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import NoDataAvailable from '../../../Common/NoDataAvailable';
import SearchControl from '../../../Common/SearchControl'
import { getAllSTAFFList, updateStaffAccess } from "../../../store/actions/accesscontrol"
const RoleAccess = () => {
  const dispatch = useDispatch();
  const [staffData, setStaffData] = useState([])
  const { users, getTeacherListLoading, getTeacherListSuccess, getTeacherListData,
    patchTeacherAccessControlLoading,
  } = useSelector((state) => {
    return {
      users: state.user,
      getTeacherListLoading: state.accesscontrol.list.loading,
      getTeacherListSuccess: state.accesscontrol.list.success,
      getTeacherListData: state.accesscontrol.list.data,
      patchTeacherAccessControlLoading: state.accesscontrol.updateStaffList.loading,
    }
  });

  useEffect(() => {
    if (!getTeacherListLoading &&
      getTeacherListSuccess && getTeacherListData) {

      setStaffData(getTeacherListData);
    }
  }, [getTeacherListLoading,
    getTeacherListSuccess,
    getTeacherListData])
  useEffect(() => {
    dispatch(getAllSTAFFList(users.user_institute, process.env.REACT_APP_TEACHER))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const roles = ["manage_study_material", "manage_classroom", "manage_visitor_management", "manage_attendance", "manage_online_test", "manage_assignment", "manage_online_class", "manage_report_card"]
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
      staffDataPrep[key].roleaccess = roles;
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
  const SubmitRoleAccessSelections = () => {
    dispatch(updateStaffAccess(FormDataResult()))
  }
  return (
    <>
      <div className="RoleAccessWrapper">
        <p className="text-sm w-500 base">Role Access</p>
        <div className="PageTopHead PTH-RoleAccessSetting">
          <div className="PTH-Item P-Right">
            <SearchControl
              placeholder={"Student Search"}
            />
          </div>
        </div>
        <div className="RoleAccessCustom">
          <div className="RoleAccess-List-View-Wrapper">
            <table>
              <thead>
                <tr>
                  <th>User Detail</th>
                  <th>Select all</th>
                  {roles.map((item, key) => {
                    return (
                      <React.Fragment key={key}>
                        <th>{item.replace("_", " ").replace("_", " ")}</th>
                      </React.Fragment>
                    )
                  })
                  }
                </tr>
              </thead>
              <tbody>
                <React.Fragment>
                  {!getTeacherListLoading && staffData.length > 0 ? (
                    <React.Fragment>
                      {getTeacherListSuccess && getTeacherListData.length > 0 ? (staffData.map((item, key) => {
                        return (
                          <tr key={key}>
                            <th>
                              <div className="scroll-nav-tab-wrapper">
                                <div className="Attendance-ProfileDetail">
                                  <img src="https://edneed-images-uat.s3.amazonaws.com/blob:https://edneed.com/3a4e74fe-8417-463c-8b1d-a70800f18917" alt="Profile" />
                                  <div className="scroll-nav-tab-wrapper">
                                    <div className="ProfileDetail">
                                      <p className="text-rgf w-600">{item.userData.fullname}</p>
                                      <p className="text-2xs primary w-500" title="jasminegargedneed@gmail.com">{item.userData.email ? item.userData.email : ""}</p>
                                      <p className="text-xxs primary w-500">{item.userData.contact && item.userData.country_code ? item.userData.country_code + item.userData.contact : ""}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </th>
                            <td data-label="Select all">
                              <div className="input-custom-type">
                                <label>
                                  <input
                                    checked={item.roleaccess.length === roles.length}
                                    type="checkbox"
                                    onChange={(e) => handelRoleALLChecked(e, key, item)}
                                  />
                                </label>
                              </div>
                            </td>
                            <React.Fragment>
                              {roles.length > 0 ? (roles.map((roleAccessItem, roleAccessKey) => {
                                return (
                                  <React.Fragment>
                                    <td data-label="Select all" roleAccessKey={roleAccessKey}>
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
                              ) : <NoDataAvailable title="No Record" />
                              }
                            </React.Fragment>
                          </tr>
                        )
                      })
                      )
                        :
                        <NoDataAvailable title="No Record" />
                      }
                    </React.Fragment>
                  ) : ("Loading....")}
                </React.Fragment>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="mt-20">
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

      </div>
    </>
  )
}

export default RoleAccess