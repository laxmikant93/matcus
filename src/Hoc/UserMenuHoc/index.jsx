import React from "react";
import { connect } from "react-redux";
import { UserMenuMapStateToProps } from "./UserMenuHocMapDispatch"

class UserMenuHoc extends React.Component {

    userTypeText = () => {

        let usertypetext = undefined;

        switch (this.props.user.user_activeRole) {
            case process.env.REACT_APP_TEACHER:
                usertypetext = 'teacher';
                break;


            case process.env.REACT_APP_STUDENT:
                usertypetext = 'student';
                break;

            case process.env.REACT_APP_PAGE_OWNER:
                usertypetext = 'owner';
                break;


            default:
                usertypetext = undefined
                break;
        }

        return usertypetext;
    }

    render() {
        return this.props.children({
            usertypetext: this.userTypeText(),
            usertype: this.props.user.user_activeRole,
            user: this.props.user,
            subdomainuser: this.props.subdomainuser,
            usertypeSubdomain: this.props.subdomainuser.user_activeRole

        })
    }




}


export default connect(UserMenuMapStateToProps, null)(UserMenuHoc)