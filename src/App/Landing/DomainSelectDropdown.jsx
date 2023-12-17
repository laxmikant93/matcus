import React, { useEffect, useState } from "react";
import SessionStorage from "../../Classes/SessionStorage";
import { privateDomainBookNew } from "../../Constant/auth";
const DomainSelectDropdown = ({
  onlyTLDSData,
  handelAssignToUpdate,
  tldsVal,
  privateDomainValue,
  selectedTlds,
  domainSuggestionSelected,
  changesdomainValues
}) => {
  const [bookNewDomainSession, serBookNewDomainSession] = useState(false)
  // useEffect(() => {
  
  //   changesdomainValues(privateDomainValue, tldsVal)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [privateDomainValue, tldsVal])
  return (

    <div className={`suggestDomainNameList${bookNewDomainSession ? " mt-20" : ""}`}>
      <p className="text-xs w-600 base text-left">You can select any one of the domains available below :</p>
      <div className="input-custom-type">
        {onlyTLDSData.length > 0 ? (
          onlyTLDSData
            // eslint-disable-next-line array-callback-return
            .filter((item) => {
              if (tldsVal === "") {
                return item;
              } else if (
                item
                  .toLowerCase()
                  .includes(tldsVal.toLowerCase())
              ) {
              } else {
                return item
              }
            }).map((item, key) => {
              return (
                <React.Fragment key={key}>
                  <label>
                    <input type="radio" name="tldsName" value={item} onChange={(e) => handelAssignToUpdate(e)} checked={selectedTlds === item && domainSuggestionSelected} />
                    {item}
                  </label>
                </React.Fragment>
              );
            })
        ) : (
          <p>No Record Found</p>
        )}
      </div>
    </div>
  );
};

export default DomainSelectDropdown;
