import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useDetectOutsideClick } from "../../../../Common/DetectOutsideClick/useDetectOutsideClick";
import BackgroundDefault from "../../../../assets/images/img/BackgroundDefault.png";
import {
  deleteService,
  selectServicesToUpdate,
  serviceUpdate,
} from "../../../../store/actions/services";
import EditServices from "./EditServices";
import NoDataAvailable from "../../../../Common/NoDataAvailable";
import ImageViewer from "../../../../Common/ImageViewer";
const ServiceList = ({ services, servicesList, businesstype }) => {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const [serviceId, setServiceId] = useState("");

  const onClickBtnDropDownRemove = (id, isActive) => {
    setServiceId(id);
    setIsActive(isActive);
  };
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

  const handelListStatusUpdate = (e, _id) => {
    let inputValue = e.target.value;
    dispatch(serviceUpdate(_id, listStatusUpdateInfo(inputValue)));
  };

  const listStatusUpdateInfo = (inputValue) => {
    return {
      isStatus: inputValue,
      industry: businesstype
    };
  };



  const [ScheduleClassModal, SetScheduleClassModal] = useState(false);
  const closeModalState = () => {
    SetScheduleClassModal(!ScheduleClassModal);
  };
  const removeService = (_id) => {
    dispatch(deleteService(_id, businesstype));
  };

  const EditItem = (item) => {
    dispatch(selectServicesToUpdate(item._id, businesstype));
    SetScheduleClassModal(!ScheduleClassModal);
  };
  return (
    <React.Fragment>
      <div className="gridListTable">
        <ul className="gridHeader">
          <li className="col col-2">Icon/Image</li>
          <li className="col col-6">Title & Description</li>
          <li className="col col-2">Status</li>
          <li className="col col-2">&nbsp;</li>
        </ul>
        <div className="gridBody">
          {services.success ? (
            servicesList.length > 0 ? (
              servicesList.map((item) => {
                return (
                  <div className="gridRow" key={item._id}>
                    <ul className="topInfo">
                      <li className="col col-2" data-head="Icon/Image">
                        <div className="ServiceListThubnail">
                          <ImageViewer
                            className="TableThumbnail"
                            object={item.thumbnail}
                            defaultImage={BackgroundDefault}
                          />
                        </div>
                      </li>
                      <li className="col col-6" data-head="Title & Description">
                        <p className="text-xs primary w-500">{item.title}</p>
                        <div className="mt-3 sun-editor-output"
                          dangerouslySetInnerHTML={{
                            __html:
                              item.details
                          }}
                        >
                        </div>
                        {/* <p>{item.details}</p> */}
                      </li>

                      <li className="col col-2" data-head="Status">
                        <div className="selectTextType">
                          <select
                            className=""
                            onChange={(e) =>
                              handelListStatusUpdate(e, item._id)
                            }
                            value={item.isStatus}
                          >
                            <option>Active</option>
                            <option hidden>Saved</option>
                            <option>Inactive</option>
                          </select>
                        </div>
                      </li>
                      <li className="col col-2 actionCols">
                        <div className="actionBtn">
                          <button
                            className="btn-square"
                            title="Edit"
                            onClick={() =>
                              //
                              EditItem(item)
                            }
                          >
                            <span className="cssIcon">
                              <i className="ed-pen"></i>
                            </span>
                          </button>
                          <button
                            className="btn-square"
                            title="Remove"
                            type="button"
                            onClick={() =>
                              onClickBtnDropDownRemove(item._id, true)
                            }
                          >
                            <span className="cssIcon">
                              <i className="ed-trash"></i>
                            </span>
                          </button>
                        </div>
                        {item._id === serviceId && (
                          <div
                            ref={dropdownRef}
                            className={`popup removePopup ${isActive ? "active" : "inactive"
                              }`}
                          //   className={`popup removePopup active`}
                          >
                            <h5 className="heading text-xs w-00">
                              You are about to remove this service.
                            </h5>
                            <p className="sub-heading red text-xxs w-400">
                              Are you sure?
                            </p>
                            <div className="removePopBtn">
                              <button
                                className="button btn-o-silver dgray btn-sm"
                                onClick={() =>
                                  onClickBtnDropDownRemove(item._id, false)
                                }
                              >
                                Cancel
                              </button>
                              <button
                                className="button button-red btn-sm"
                                onClick={() => {
                                  removeService(item._id);
                                  onClickBtnDropDownRemove(item._id, false);
                                }}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        )}
                      </li>
                    </ul>
                  </div>
                );
              })
            ) : (
              <NoDataAvailable title="No Records Found." />
            )
          ) : (
            <div className="loadingGridData">
              <i className="ed-loadingGrid"></i>
            </div>
          )}
        </div>
      </div>

      <EditServices onclose={closeModalState} show={ScheduleClassModal} />
    </React.Fragment>
  );
};

export default ServiceList;
