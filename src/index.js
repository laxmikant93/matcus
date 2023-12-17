import React from "react";
import ReactDOM from "react-dom/client";
import AppRouting from "./AppRouting";
import { Provider } from "react-redux";
import store from "./store";
import { GoogleOAuthProvider } from "@react-oauth/google";

//import reportWebVitals from "./reportWebVitals";
import "react-datepicker/dist/react-datepicker.css";
import swDev from "./swDev";
//import * as serviceWorker from "./serviceWorker";
// import 'react-app-polyfill/ie9';
// import "./assets/Style/_theme.scss";
// import "./assets/Style/_typo.scss";
import "./assets/Style/_Common.scss";
import "./assets/Style/_form.scss";
import "./assets/Style/_table.scss";
import "./assets/Style/_Icons.scss";
import "./assets/Style/_flexgrid.scss";
import "./assets/Style/_progressBar.scss";
import "./assets/Style/_PageTopHead.scss";
import "./assets/Style/_toolTips.scss";
import "./assets/Style/_button.scss";
// import "./assets/Style/_buttonV1.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const root = ReactDOM.createRoot(document.getElementById("edwapp"));

root.render(
  // <React.StrictMode>
    <GoogleOAuthProvider clientId="638441640539-53j4q2k31g35ikbqj0pnptld640ai0ha.apps.googleusercontent.com">
      <Provider store={store}>
        <AppRouting />
      </Provider>
    </GoogleOAuthProvider>
  // </React.StrictMode>
);
swDev();
//serviceWorker.register();

// If you want to start measuring performance in your app, pass a function
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
