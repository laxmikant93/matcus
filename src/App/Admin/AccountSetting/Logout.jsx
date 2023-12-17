import React from "react";
import AppLink from "../../../Common/AppLink";

export default function Logout() {
  return (
    <AppLink to="/auth/logout" className="btn-sm button-gray text-right">
      Logout
    </AppLink>
  );
}
