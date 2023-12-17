import React, { useState } from "react";
import AppLink from "../../Common/AppLink";
import FormInput from "../../Common/Form/FormInput";

const SearchPanel = () => {
  const [SearchPanelClose, SetSearchPanelClose] = useState(false);

  return (
    <React.Fragment>
      {!SearchPanelClose && (
        <div className="pageFullCenter SearchPanelWrapper">
          <div className="SearchPanelCustom ">
            <div className="SearchPanelInput">
              <FormInput placeholder="Edneed Search" />
              <i className="ed-icon icon-search i-s base"></i>
            </div>
            <div className="SearchPanelInputSuugestion">
              <div className="InputSuggestionItem">
                <p className="text-xs gray w-300">
                  <span className="base">Harpreet</span> Public School
                </p>
                <p className="text-xxs">In Institutes</p>
              </div>
              <div className="InputSuggestionItem">
                <p className="text-xs gray w-300">
                  <span className="base">Harpreet</span> Public School
                </p>
                <p className="text-xxs">In Institutes</p>
              </div>
              <div className="InputSuggestionItem">
                <p className="text-xs gray w-300">
                  <span className="base">Harpreet</span> Public School
                </p>
                <p className="text-xxs">In Institutes</p>
              </div>
              <div className="InputSuggestionItem">
                <p className="text-xs gray w-300">
                  <span className="base">Harpreet</span> Public School
                </p>
                <p className="text-xxs">In Institutes</p>
              </div>
              <div className="InputSuggestionItem">
                <p className="text-xs gray w-300">
                  <span className="base">Harpreet</span> Public School
                </p>
                <p className="text-xxs">In Institutes</p>
              </div>
              <div className="InputSuugestionResult">
                <AppLink to="/" className="text-xs">
                  Show all results &nbsp;<i>&#8594;</i>
                </AppLink>
              </div>
            </div>

            <div className="CustomSearchSuggestion">
              <p className="text-xs">Try Searching for</p>
              <div className="CustomSearchSuggestionItem mt-10">
                <button className="button btn-xs btn-o-base">
                  Institute
                </button>
                <button className="button btn-xs btn-o-base">
                  Profiles
                </button>
                <button className="button btn-xs btn-o-base">
                  Q&A
                </button>
              </div>
            </div>
            <p
              className="underline text-xxs SearchPanelCustomClose"
              onClick={() => SetSearchPanelClose(!SearchPanelClose)}
            >
              <i className="w-600 text-xxs">&#9747;</i>&nbsp;Close
            </p>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default SearchPanel;
