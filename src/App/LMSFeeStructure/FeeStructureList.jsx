import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDetectOutsideClick } from "../../Common/DetectOutsideClick/useDetectOutsideClick";
import NoDataAvailable from "../../Common/NoDataAvailable";
import { DynamicCourseHeader } from "../../Common/UserElement";
import { deleteFee, updateFee } from "../../store/actions/lmsfeeStructure";

const FeeStructureList = () => {
  const { feeListData, feeListSuccess } = useSelector((state) => {
    return {
      feeListData: state.lmsfeeStructure.FeeList.data,
      feeListSuccess: state.lmsfeeStructure.FeeList.success,
    };
  });
  const dispatch = useDispatch();
  const history = useNavigate();
  // handle POPUP
  const dropdownRef = useRef(null);
  const [feeId, setFeeId] = useState("");
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

  const onClickBtnDropDownRemove = (_id, isActive) => {
    setFeeId(_id);
    setIsActive(isActive);
  };

  // delete/remove fee list
  const removeFee = (id, isActive) => {
    dispatch(deleteFee(id));
    setIsActive(isActive);
  };

  // handle DROPDOWN
  const handleFeature = (e, id) => {
    let statusData = {
      Publish: e.target.value,
    };

    dispatch(updateFee(id, statusData));
  };

  const handlePublishSubdomainFeature = (e, id) => {
    let statusData = {
      status: e.target.value,
    };

    dispatch(updateFee(id, statusData));
  };

  const editItem = (data) => {
    history(`/update-lms-fee-structure/${data._id}`);
  };
  return (
    <React.Fragment>
      <div className="gridListTable">
        <ul className="gridHeader">
          <li className="col col-2">Fee Details</li>
          <li className="col col-2"><DynamicCourseHeader /> Name</li>
          <li className="col col-2">Fees (₹)</li>
          <li className="col col-2">Publish to Website</li>
          <li className="col col-2">Publish to LMS</li>
          <li className="col col-2">&nbsp;</li>
        </ul>
        <div className="gridBody">
          {feeListSuccess && feeListData.length ? (
            feeListData.map((feeData) => {
              return (
                <div className="gridRow" key={feeData._id}>
                  <ul className="topInfo">
                    <li className="col col-2" data-head="Fee Details">
                      <p className="text-xs primary">{feeData.title}</p>
                      {/* <p className="mt-3">{feeData.class}</p> */}
                    </li>
                    <li className="col col-2" data-head="Coursename">
                      <p className="mt-3">
                        {feeData.coursename
                          ? feeData.coursename
                          : feeData.class}
                      </p>
                    </li>
                    <li className="col col-2" data-head="Total Fees">
                      <span className="inline">
                        {feeData.feeType === "rupees" ? (
                          <i className="w-500">&#8377; </i>
                        ) : (
                          ""
                        )}
                        {feeData.feeType === "usd" ? (
                          <i className="w-500">&#36; </i>
                        ) : (
                          ""
                        )}
                        {feeData.feeType === "euro" ? (
                          <i className="w-500">&euro; </i>
                        ) : (
                          ""
                        )}
                        {feeData.fee}
                      </span>
                    </li>
                    <li className="col col-2" data-head="Status">
                      <div className="selectTextType">
                        <select
                          value={feeData.status}
                          onChange={(e) =>
                            handlePublishSubdomainFeature(e, feeData._id)
                          }
                        >
                          <option hidden>Saved</option>
                          <option>Active</option>
                          <option>Inactive</option>
                        </select>
                      </div>
                    </li>
                    <li className="col col-2" data-head="Publish">

                      {feeData.Publish &&
                        <div className="selectTextType">
                          <select
                            value={feeData.Publish}
                            onChange={(e) => handleFeature(e, feeData._id)}
                            disabled={feeData.Publish === "Active"}
                          >
                            <option hidden>Saved</option>
                            <option>Active</option>
                            <option>Inactive</option>
                          </select>
                        </div>
                      }


                    </li>
                    <li className="col col-2 actionCols">
                      <div className="actionBtn">
                        <button
                          className="btn-square"
                          title="View & Update"
                          onClick={() => editItem(feeData)}
                        >
                          <span className="cssIcon">
                            <i className="ed-update"></i>
                          </span>
                        </button>
                        {feeData.Publish !== "Active" ? (
                          <button
                            className="btn-square"
                            title="Remove"
                            onClick={() =>
                              onClickBtnDropDownRemove(feeData._id, true)
                            }
                          >
                            <span className="cssIcon">
                              <i className="ed-trash"></i>
                            </span>
                          </button>
                        ) : ("")}
                      </div>
                      {feeData._id === feeId && (
                        <div
                          ref={dropdownRef}
                          className={`popup removePopup ${isActive ? "active" : "inactive"
                            }`}
                        >
                          <p className="heading text-xxs">
                            You are about to remove this Fee Structure.
                          </p>
                          <p className="sub-heading red text-xxs">
                            Are you sure?
                          </p>
                          <div className="removePopBtn">
                            <button
                              className="button btn-o-silver dgray btn-sm"
                              onClick={() =>
                                onClickBtnDropDownRemove(feeData._id, false)
                              }
                            >
                              Cancel
                            </button>
                            <button
                              className="button button-red btn-sm"
                              onClick={() => removeFee(feeData._id, false)}
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
          ) : feeListSuccess && feeListData.length === 0 ? (
            <NoDataAvailable title="No Records Found." />
          ) : (
            <div className="loadingGridData">
              <i className="ed-loadingGrid"></i>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default FeeStructureList;
