import { createContext } from "react"
const DynamicHeaderContext = createContext();

export const DynamicHeaderProvider = DynamicHeaderContext.Provider;
export const DynamicHeaderConsumer = DynamicHeaderContext.Consumer;