import React, { createContext } from "react";

const SearchContext = createContext();
export const UserConsumer = createContext.Consumer;

export const SearchProvider = (props) => {
  return <SearchContext.Provider>{props.children}</SearchContext.Provider>;
};
