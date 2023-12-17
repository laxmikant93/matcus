/**
 * This context is made for managing the forgot password header only
 */
import { createContext } from "react";
const forgetPasswordContext = createContext(true); // Default is true
const ForgotPasswordProvider = forgetPasswordContext.Provider;
const ForgotPasswordConsumer = forgetPasswordContext.Consumer;

export {
  forgetPasswordContext,
  ForgotPasswordProvider,
  ForgotPasswordConsumer
}