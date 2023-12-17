/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { SearchIcon } from "../../Common/Icon";
import { searchWords } from "../../store/actions/community/index";
import { useDispatch } from "react-redux";

export default function SearchCommunity() {
  const [searchWord, setSearchWord] = useState("");
  const dispatch = useDispatch();

  let typing;
  function handleChange(e) {
    clearTimeout(typing);
    typing = setTimeout(() => {
      setSearchWord(e.target.value);
    }, 400);

    if (!e.target.value) {
      clearTimeout(typing);
      setSearchWord("");
    }
  }

  useEffect(() => {
    dispatch(searchWords(searchWord));
  }, [dispatch, searchWord]);

  return (
    <div className="CommunityTopSearchbar">
      <input
        type="search"
        className="form-control-search"
        id="search"
        name="search"
        placeholder="Edneed search"
        onChange={handleChange}
      />
      <i className="ed-icon icon-search mgray i-md"></i>
    </div>
  );
}
