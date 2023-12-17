import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SessionStorage from "../../../Classes/SessionStorage";
import { instiid, uid } from "../../../Constant/auth";

import { useParams } from "react-router";

// import queryString from 'query-string';
const AbandonedCart = () => {

  const history = useNavigate();


  let { id } = useParams();

  if (id) {
    const splitid = id.split("-")
    const userId = splitid[0]
    const instituteId = splitid[1]
    SessionStorage.setJson(uid, userId)
    SessionStorage.setJson(instiid, instituteId)
  
  }

  useEffect(() => {
    if (SessionStorage.alive(uid) && SessionStorage.alive(instiid)) {
      history('/payment-summary')
    }
  }, [history])


  return (
    <React.Fragment>
      <div className="loadingGridData">Loading your order.</div>
    </React.Fragment>
  );
};

export default AbandonedCart;
