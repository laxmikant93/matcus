import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDetectOutsideClick } from "../../../../Common/DetectOutsideClick/useDetectOutsideClick";
import {
  deleteCertificate,
  getCertificate,
} from "../../../../store/actions/publicProfile";
import moment from "moment";
import EditCertificate from "./EditCertificate";
import AddNewCertificate from "./AddNewCertificate";

const Certificate = () => {
  const dropdownRef = useRef(null);
  const { userInfo } = useSelector((state) => {
    return {
      userInfo: state.publicProfile.singleProfile.data.userInfo,
      userId: state.user._id,
    };
  });

  const { fetchCertificatesDataSuccess, ProfileCertificatesData } = useSelector(
    (state) => {
      return {
        fetchCertificatesDataSuccess: state.publicProfile.certificate.success,
        ProfileCertificatesData: state.publicProfile.certificate.data,
      };
    }
  );

  const profileId = userInfo && userInfo.user;

  const dispatch = useDispatch();
  // const ProfileCertificateData = useSelector(state => state.publicProfile)

  useEffect(() => {
    profileId && dispatch(getCertificate(profileId));
  }, [dispatch, profileId]);

  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const [profileCertificateId, setProfileCertificateId] = useState("");

  const userId = useSelector((state) => state.user._id);

  // const [visibleCountCertificate, setVisibleCountCertificate] = useState(3);

  // const seeMoreCertificateCard = () => {
  //   setVisibleCountCertificate((prev) => prev + 3);
  // };

  const [AddCertificateModal, SetAddCertificateModal] = useState(false);
  const [EditCertificateModal, SetEditCertificateModal] = useState(false);
  const [editCertificateData, setEditCertificateData] = useState("");

  const AddCertificateModalState = () => {
    SetAddCertificateModal(!AddCertificateModal);
  };
  const closeAddModalState = () => {
    SetAddCertificateModal(false);
  };

  const EditCertificateModalState = (awardData) => {
    SetEditCertificateModal(!EditCertificateModal);
    setEditCertificateData(awardData);
  };
  const closeEditModalState = () => {
    SetEditCertificateModal(false);
  };

  const onClickBtnDropDownRemove = (_id, isActive) => {
    setProfileCertificateId(_id);
    setIsActive(isActive);
  };
  const removeCertificate = (id, isActive) => {
    dispatch(deleteCertificate(profileId, id));
    setIsActive(isActive);
  };

  return (
    <React.Fragment>
      <div className="ProfileCertificate">
        <div className="ProfileCertificateHead">
          <p className="text-sm w-500">Certificates</p>
          {profileId === userId && (
            <button
              className="button btn-xs button-primary"
              onClick={() => AddCertificateModalState()}
            >
              <i className="ed-icon icon-plus-add i-xs white"></i>
              Add Certificate
            </button>
          )}
        </div>
        <div className="ProfileCertificateContent">
          <ul className="ProfileCertificateContentList mt-20">
            {fetchCertificatesDataSuccess &&
              ProfileCertificatesData.length > 0 ? (
              ProfileCertificatesData.map((ProfileCertificate, key) => {
                return (
                  <li key={key}>
                    <p className="text-xxs">
                      {moment(ProfileCertificate.certificate_from).format(
                        "MMM, YYYY"
                      )}{" "}
                      {!ProfileCertificate.notExpire && <>- </>}
                      {!ProfileCertificate.notExpire &&
                        moment(ProfileCertificate.certificate_to).format(
                          "MMM, YYYY"
                        )}
                    </p>
                    <p className="text-xs w-500 primary mt-8">
                      {ProfileCertificate.certificate_name}
                    </p>
                    <p className="text-xs mt-8">
                      {ProfileCertificate.certificate_by}
                    </p>
                    {profileId === userId && (
                      <div className="ProfileCertificateAction mt-30">
                        <button
                          className="button btn-xs btn-o-primary primary"
                          onClick={() =>
                            EditCertificateModalState(ProfileCertificate)
                          }
                        >
                          <i className="ed-icon icon-edit i-xxs primary"></i>
                          Edit
                        </button>
                        <button
                          className="button btn-xs btn-o-primary primary"
                          onClick={() =>
                            onClickBtnDropDownRemove(
                              ProfileCertificate._id,
                              true
                            )
                          }
                        >
                          <i className="ed-icon icon-delete i-xs primary"></i>
                          Delete
                        </button>
                      </div>
                    )}

                    {/* delete popup */}
                    {ProfileCertificate._id === profileCertificateId && (
                      <div
                        ref={dropdownRef}
                        className={`popup removePopup ${isActive ? "active" : "inactive"
                          }`}
                      >
                        <p className="heading text-xxs">
                          You are about to remove this certificate.
                        </p>
                        <p className="sub-heading red text-xxs">Are you sure?</p>
                        <div className="removePopBtn">
                          <button
                            className="button btn-o-silver dgray btn-sm"
                            onClick={() => setIsActive(false)}
                          >
                            Cancel
                          </button>
                          <button
                            className="button button-red btn-sm"
                            onClick={() =>
                              removeCertificate(ProfileCertificate._id, false)
                            }
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })
            ) : (
              <p>Not Added</p>
            )}
          </ul>

          {/* {fetchCertificatesDataSuccess &&
              ProfileCertificatesData.length > visibleCountCertificate && (
                <p
                  className="btnText primary text-xs underline mt-20"
                  onClick={seeMoreCertificateCard}
                >
                  See more<i className="animate-r-arrow-icon"></i>
                </p>
              )} */}
        </div>
      </div>
      {AddCertificateModal && (
        <AddNewCertificate
          closeModalStateprop={closeAddModalState}
          showprop={AddCertificateModal}
          Id={profileId}
        />
      )}

      {EditCertificateModal && (
        <EditCertificate
          closeModalStateprop={closeEditModalState}
          showprop={EditCertificateModal}
          editCertificateData={editCertificateData}
          Id={profileId}
        />
      )}
    </React.Fragment>
  );
};

export default Certificate;
