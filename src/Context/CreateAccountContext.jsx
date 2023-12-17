import { createContext } from "react";
const defaultCreateAccountValues = { showRole: true }
const CreateAccountContext = createContext(defaultCreateAccountValues);
const CreateAccountProvider = CreateAccountContext.Provider;
const CreateAccountConsumer = CreateAccountContext.Consumer;

export {
  defaultCreateAccountValues,
  CreateAccountProvider,
  CreateAccountConsumer,
  CreateAccountContext
}
