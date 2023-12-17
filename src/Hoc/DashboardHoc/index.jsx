import { Component } from "react";
import { connect } from "react-redux";
import { DSB_MapStateToProps } from "./DashboardHocMapDispatch";

class DashboardHoc extends Component {


    getUserType = () => {
        const { user, chooseoption } = this.props;

        return user.user_activeRole ? user.user_activeRole : chooseoption.option
    }
    getUserModelType = () => {
        const { user } = this.props
        return user.user_business_type ? user.user_business_type : "null"
    }

    render() {
        return this.props.children({
            userType: this.getUserType(),
            user: this.props.user,
            businessType: this.getUserModelType()
        })
    }

}

export default connect(DSB_MapStateToProps, null)(DashboardHoc)