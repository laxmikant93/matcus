import React from "react";
import { Route } from "react-router";
import AppLinkUrl from "../Common/AppLink/AppLinkUrl";
import Home from "../App/Home";
import Auth from "../Classes/Auth";
import Dashboard from "../App/Dashboard";
import TemplateRoutes from "./TemplateRoutes";
import PageNotFound from "../Common/PageNotFound/PageNotFound";

class HomeRoute extends React.Component {

  getRouteComponent() {
    return AppLinkUrl.privateDomain() || AppLinkUrl.subdomain() ?
      <TemplateRoutes/> :
      Auth.isLogin() ?
        <Dashboard/>
        :
        window.location.pathname==="/"?
        <Home/>:<PageNotFound/>;
  }

  render() {
    return this.getRouteComponent()
    
  }
}


export default HomeRoute;