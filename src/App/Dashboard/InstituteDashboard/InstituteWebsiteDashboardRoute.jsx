import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";

import { getInstituteData } from "../../../store/actions/checkdomain";


const InstituteWebsiteDashboardRoute = () => {

    const dispatch = useDispatch();


    const { users } = useSelector((state) => {
        return {
            users: state.user,
        }
    });


    useEffect(() => {

        dispatch(getInstituteData(users.user_institute))

    }, [dispatch, users])



    return <React.Fragment>
        <div style={{ padding: 100 }}>
            {
                users.user_institute_institute_subdomain === "" || users.user_institute_institute_subdomain === undefined ?

                    <Navigate to='/check-domain' />

                    :
                    <Navigate to='/website-manage' />

            }
        </div>
    </React.Fragment>
}
export default InstituteWebsiteDashboardRoute