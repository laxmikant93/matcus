import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import allreducers from "./reducer";
import UserRequest from "./actions/user/UserRequest";
let composeEnhancers = compose;

if (UserRequest.apiConfig.mode === "development" || UserRequest.apiConfig.mode === "productiondev" || UserRequest.apiConfig.mode === "productionqa") {

  composeEnhancers = typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;
}

const store = createStore(
  allreducers,
  composeEnhancers(applyMiddleware(thunk))
)

export default store;