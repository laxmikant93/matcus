import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDetectOutsideClick } from "../../../../Common/DetectOutsideClick/useDetectOutsideClick";
import NoDataAvailable from "../../../../Common/NoDataAvailable";
import { deleteFee, updateFee } from "../../../../store/actions/feeStructure";

const FeeStructureList = ({ isFeeListAvailable, feeList }) => {
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
      status: e.target.value,
    };

    dispatch(updateFee(id, statusData));
  };

  const editItem = (id) => {
    history(`/update-fee-structure/${id}`);
  };

  return (
    <React.Fragment>
      <div className="gridListTable">
        <ul className="gridHeader">
          <li className="col col-4">Title</li>
          <li className="col col-4">Total Fees</li>
          <li className="col col-2">Status</li>
          <li className="col col-2">&nbsp;</li>
        </ul>
        <div className="gridBody">
          {isFeeListAvailable && feeList.length ? (
            feeList.map((feeData) => {
              return (
                <div className="gridRow" key={feeData._id}>
                  <ul className="topInfo" data-column="Title">
                    <li className="col col-4" data-head="Icon/Image">
                      <p className="text-xs primary">{feeData.title}</p>

                    </li>
                    <li className="col col-4" data-head="Title & Description">

                      <p className="mt-3">{feeData.className}</p>
                      <span className="inline">
                        {feeData.feeType === "rupees" ? (
                          <i className="primary w-600">&#8377;&nbsp; </i>
                        ) : (
                          ""
                        )}
                        {feeData.feeType === "usd" ? (
                          <i className="primary w-600">&#36;&nbsp; </i>
                        ) : (
                          ""
                        )}
                        {feeData.feeType === "euro" ? (
                          <i className="primary w-600">&euro;&nbsp; </i>
                        ) : (
                          ""
                        )}
                        {feeData.fee}
                      </span>
                    </li>
                    <li className="col col-2" data-column="Status">
                      <div className="selectTextType">
                        <select
                          value={feeData.status}
                          onChange={(e) => handleFeature(e, feeData._id)}
                        >
                          <option hidden>Saved</option>
                          <option>Active</option>
                          <option>Inactive</option>
                        </select>
                      </div>
                    </li>
                    <li className="col col-2">
                      <div className="actionBtn">
                        <button className="btn-square" title="Edit" onClick={() => editItem(feeData._id)}><span className="cssIcon"><i className="ed-pen"></i></span></button>
                        <button className="btn-square" title="Remove" onClick={() =>
                          onClickBtnDropDownRemove(feeData._id, true)
                        }><span className="cssIcon"><i className="ed-trash"></i></span></button>
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
                      </div>
                    </li>
                  </ul>
                </div>
              );
            })
          ) : isFeeListAvailable && feeList.length === 0 ? (

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
