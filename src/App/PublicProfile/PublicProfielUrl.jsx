import React, { useEffect, useRef, useState } from "react";
// import { useEffect } from "react";
import {
  nullUsernameResult,
  usernamesearchpublicprofiles,
} from "../../store/actions/publicProfile";
import FormInput from "../../Common/Form/FormInput";
import { useDispatch, useSelector } from "react-redux";
// import FormError from "../../Common/Form/FormInput";

// import axios from "axios";
// import FormError from "../../Common/Form/FormError";

const PublicProfielUrl = () => {
  const dispatch = useDispatch();
  const url = window.location.href;
  const arr = url.split("/profile/");
  const domain = arr[0];
  const urlid = arr[1];
  // const usern = arr[1];
  const [toggleURL, setToggleURL] = useState(false);
  const [preUsername, setPreUsername] = useState(false);
  const userProfiles = useSelector(
    (state) => state.publicProfile.singleProfile.data.userInfo
  );
  const { usernameCheck, userEdit } = useSelector((state) => {
    return {
      usernameCheck: state.publicProfile.usernamecheck.data.result,
      userEdit: state.publicProfile.editLink.data,
    };
  });
  let userid = userProfiles && userProfiles.user;
  let usernam = userProfiles && userProfiles.username;
  const [values, setValues] = useState(usernam);
  // const [name, setName] = useState(usernam);
  const [check, setCheck] = useState(false);

  useEffect(() => {
    setValues(userEdit.username);
  }, [userEdit]);

  const handleChange = (e) => {
    setCheck(false);
    setPreUsername(false);
    setValues(e.target.value);

    //  setTimeout(() => {
    (usernameCheck === false || usernameCheck === true) &&
      dispatch(nullUsernameResult());
    //  }, 400);
  };

  const searchresult = () => {
    if (userEdit && userEdit.username === values) {
      setPreUsername(true);
    } else if (userEdit && userEdit.username !== values) {
      setCheck(true);
      if (values === "" || values === null || values === undefined) {
        return false;
      } else {
        dispatch(usernamesearchpublicprofiles(userid, { username: values }));
      }
    }
  };

  const [copySuccess, setCopySuccess] = useState(false);
  const inputUrl = useRef(null);

  const copyToClipBoard = () => {
    inputUrl.current.select();
    document.execCommand("copy");
    setCopySuccess(true);
    setTimeout(() => {
      setCopySuccess(false);
    }, 3000);
  };
  // / handle Search
  // const [searchTerm, setSearchTerm] = useState({
  //   username: usernam,
  // });
  // const { username } = searchTerm;
  // let typing;

  // const handleSearch = (name) => (event) => {
  //   event.preventDefault();

  //   clearTimeout(typing);
  //   typing = setTimeout(() => {
  //     setSearchTerm({ ...searchTerm, [name]: event.target.value });
  //   }, 400);
  //   if (!event.target.value) {
  //     clearTimeout(typing);
  //     setSearchTerm("");
  //   }
  // };

  // useEffect(() => {
  //   dispatch(usernamesearchpublicprofiles(userid, searchTerm));
  // }, [dispatch, userid, searchTerm]);

  return (
    <div className="EditPublicProfileUrl">
      <p className="text-xs w-600">Public Profile URL</p>
      <div className="PPUrl-LinkCopy">
        <p className="text-xxs primary w-500">{domain + "/profile/" + urlid}</p>
        {/* <input
          type="text"
          ref={inputUrl}
          value={domain + "/profile/" + urlid}
          style={{ opacity: "0", width: "1px" }}
        /> */}

        <button
          onClick={copyToClipBoard}
          className={`button btn-xs ${copySuccess ? " button-primary" : " btn-o-silver base"
            }`}
        >
          {copySuccess ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="PPUrl-EditLink">
        <p
          className="underline text-xxs primary w-500"
          onClick={() => setToggleURL(!toggleURL)}
        >
          Edit Username
        </p>
        {toggleURL && (
          <div className="formFieldwrap mt-15">
            <FormInput
              label="Edit Username"
              name="username"
              defaultValue={values}
              placeholder="Edit Username"
              onChange={(e) => handleChange(e)}
            />

            {preUsername ? (
              <p className="text-xxs secondary mt-3">username is available!</p>
            ) : usernameCheck === undefined || usernameCheck === "" ? (
              ""
            ) : usernameCheck && check ? (
              <p className="text-xxs secondary mt-3">username is available!</p>
            ) : (
              !usernameCheck &&
              check && (
                <p className="text-xxs secondary mt-3" style={{ color: "red" }}>
                  username is not available!
                </p>
              )
            )}
            <button
              onClick={searchresult}
              className="button btn-sm button-primary mt-8"
              type="submit"
            >
              Check
            </button>
          </div>
        )}
        <input
          type="text"
          ref={inputUrl}
          defaultValue={domain + "/profile/" + urlid}
          style={{ opacity: "0" }}
        />
      </div>
    </div>
  );
};

export default PublicProfielUrl;
