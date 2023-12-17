import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddNewHobbies from "./AddNewHobbies";
import { getInterestHoobies, DeleteInterestHobbies } from "../../../../store/actions/publicProfile";
// import Popup from "../../../../Common/Popup";
import UseOutsideClick from "../../../../Common/UseOutsideClick";
function Hobbies() {
  const [AddHobbiesModal, SetAddHobbiesModal] = useState(false);
  const { user, interest, singleProfile } = useSelector((state) => {
    return {
      user: state.user,
      interest: state.publicProfile.Interest_Hobbies,
      singleProfile: state.publicProfile.singleProfile.data.userInfo,
    };
  });
  const Profileuser = singleProfile && singleProfile.user;
  const dispatch = useDispatch();
  useEffect(() => {
    Profileuser && dispatch(getInterestHoobies(Profileuser));
  }, [dispatch, Profileuser]);

  const IsUser = (user && user._id) === (singleProfile && singleProfile.user);
  const DeleteInvitation = (id) => {
    let data = { _id: id }
    dispatch(DeleteInterestHobbies(Profileuser, data));
    // setTimeout(() => {
    //   getInterestHoobies(Profileuser);
    // }, 900);
    setRemovePop(!RemovePop);
  };
  // const ProfileHobbiesData = [
  //   {
  //     id: 1,
  //     name: "Dance Instruction",
  //   },
  //   {
  //     id: 2,
  //     name: "Yoga Instruction",
  //   },
  //   {
  //     id: 3,
  //     name: "Performing Arts",
  //   },
  //   {
  //     id: 4,
  //     name: "Visual Arts",
  //   },
  //   {
  //     id: 5,
  //     name: "Voice Acting",
  //   },
  //   {
  //     id: 5,
  //     name: "Cumputer Skills",
  //   },
  //   {
  //     id: 5,
  //     name: "Academic Tutoring",
  //   },
  // ];

  const closeHobbiesModalState = () => {
    SetAddHobbiesModal(false);
  };

  const AddHobbiesModalState = () => {
    SetAddHobbiesModal(!AddHobbiesModal);
  };
  const [RemovePop, setRemovePop] = useState(false);
  const RemovePopToggleRef = useRef();

  UseOutsideClick(RemovePopToggleRef, () => {
    if (RemovePop) setRemovePop(false);
  });
  return (
    <React.Fragment>
      <div className="ProfileHobbies">
        <div className="ProfileHobbiesHead">
          <p className="text-sm w-500">Interests</p>
          {IsUser && (
            <React.Fragment>
              {/* {interest && interest.data && interest.data.length > 0 && (
                <button
                  className="button btn-xs button-primary"
                  onClick={() => EditHobbiesModalState()}
                >
                  <i className="ed-icon icon-edit i-xs white"></i>
                  Edit
                </button>
              )} */}
              <button
                className="button btn-xs button-primary"
                onClick={() => AddHobbiesModalState()}
              >
                <i className="ed-icon icon-plus-add i-xs white"></i>
                Add New
              </button>
            </React.Fragment>
          )}
        </div>
        <div className="ProfileHobbiesContent">
          {interest && interest.data && interest.data.length !== 0 ? (
            <ul className="ProfileHobbiesContentList mt-20">
              {interest &&
                interest.data &&
                interest.data.map((ProfileHobbies) => {
                  return (
                    <React.Fragment>
                      <li key={ProfileHobbies._id}>
                        <p className="nameCstm text-xxs primary">
                          {ProfileHobbies.name}
                        </p>
                        {IsUser && (<span
                          className="crossBtn"
                          onClick={() => DeleteInvitation(ProfileHobbies._id)}
                        ></span>)}

                        {/* {RemovePop && (ProfileHobbies._id===interestId) && (
                          <Popup
                            show={RemovePop}
                            RemovePopToggleRef={RemovePopToggleRef}
                            CancelProp={() => setRemovePop(!RemovePop)}
                            RemoveProp={() => DeleteInvitation(ProfileHobbies._id)}
                          >
                            <p className="gray text-xxs w-300">
                              You are about to remove this interest.
                            </p>
                            <p className="dgray text-xxs w-400">Are you sure?</p>
                          </Popup>
                        )} */}
                      </li>
                    </React.Fragment>
                  );
                })}
            </ul>
          ) : (
            <p className="mt-20">Not Added</p>
          )}
        </div>
      </div>
      <AddNewHobbies
        closeModalStateprop={closeHobbiesModalState}
        showprop={AddHobbiesModal}
        user={user}
        singleProfile={singleProfile}
      />
      {/* <RemoveHobbies
        closeModalStateprop={closeHobbiesModalState}
        showprop={EditHobbiesModal}
        user={user}
        singleProfile={singleProfile}
        interest={interest}
      /> */}
    </React.Fragment>
  );
}

export default Hobbies;
