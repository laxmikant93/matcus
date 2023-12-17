import React, { useEffect, useState } from "react";
import PrivateDomainSelection from "./PrivateDomainSelection";
import SubDomainSelection from "./SubDomainSelection";
import SessionStorage from "../../Classes/SessionStorage";
import { privateDomainOpt } from "../../Constant/auth";

const DomainSelection = ({
  submitCheckSubdomain,
  ChangeSubmitValidationCheck,
  regDomainData,
  regPrivateDomainData,
  isSubmitted,
  privateDomainGo
}) => {
  const [ToggleUpload, SetToggleUpload] = useState("sd");
  const [EditPrivateDomainBool, setEditPrivateDomainBool] = useState(false);
  const [EditSubDomainBool, setEditSubDomainBool] = useState(false);

  useEffect(() => {
    if (SessionStorage.alive(privateDomainOpt)) {
      if (SessionStorage.getBool(privateDomainOpt) === "true") {
        SetToggleUpload("pd");
      } else {
        SetToggleUpload("sd");
      }
    }
  }, [ToggleUpload]);

  const UploadHandler = (ToggleUpload) => {
    SetToggleUpload(ToggleUpload);
    if (ToggleUpload === "pd") {
      SessionStorage.setBool(privateDomainOpt, true);
    } else {
      SessionStorage.setBool(privateDomainOpt, false);
    }
  };

  const setIsEditablePrivateDomainFunc = () => {
    setEditPrivateDomainBool(!EditPrivateDomainBool);
  };

  const setIsEditableSubDomainFunc = () => {
    setEditSubDomainBool(!EditSubDomainBool);
  };
  // const regPrivateDomainData = () => {
  // }
  return (
    <React.Fragment>
      <div className="edContainer">
        <div className="registerDomainSelWrap">
          <div className="registerDomainSel mt-90 mb-20">
            <div className="input-custom-type">
              <label className={`large ${ToggleUpload === "pd" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="pd"
                  value="pd"
                  checked={ToggleUpload === "pd"}
                  onChange={(e) => UploadHandler("pd")}
                />

                <span className="text-xxs w-300">
                  <strong className="text-xs w-500">
                    Private + Free Subdomain
                  </strong>
                  <br />
                  Book & get your Edneed subdomain for FREE.
                </span>
              </label>
              <label className={`large ${ToggleUpload === "sd" ? "active" : ""}`}>
                <input
                  type="radio"
                  name="sd"
                  value="sd"
                  checked={ToggleUpload === "sd"}
                  onChange={(e) => UploadHandler("sd")}
                />
                <span className="text-xxs w-300">
                  <strong className="text-xs w-500">Only Subdomain</strong>
                  <br />
                  100% FREE with Edneed.              </span>
              </label>
            </div>
          </div>
          <div className="PrivateAndSubDomainCst">
            {ToggleUpload === "pd" && (
              <PrivateDomainSelection
                EditPrivateDomainBool={EditPrivateDomainBool}
                setIsEditablePrivateDomainFunc={setIsEditablePrivateDomainFunc}
                regPrivateDomainData={regPrivateDomainData}
                isSubmitted={isSubmitted}
                privateDomainGo={privateDomainGo}
                ChangeSubmitValidationCheck={ChangeSubmitValidationCheck}
              />
            )}

            <SubDomainSelection
              EditSubDomainBool={EditSubDomainBool}
              submitCheckSubdomain={submitCheckSubdomain}
              ChangeSubmitValidationCheck={ChangeSubmitValidationCheck}
              regDomainData={regDomainData}
              setIsEditableSubDomainFunc={setIsEditableSubDomainFunc}
            />
          </div>
          <ul className="DomainSelectionEditAction mt-10">
            {ToggleUpload === "pd" && (
              <li
                className="editPvtDomain primary text-xxs"
                onClick={setIsEditablePrivateDomainFunc}
              >
                <i className="ed-icon primary i-s icon-edit"></i>Edit Private
                Domain
              </li>
            )}
            <li
              className="editSubDomain primary text-xxs"
              onClick={setIsEditableSubDomainFunc}
            >
              <i className="ed-icon primary i-s icon-edit"></i>Edit Subdomain
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DomainSelection;
