import { string } from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { instituteUserByRoleMapStateToProp, instituteUserByRoleMapDispatchToProp } from "./InstituteUserByRoleMapDispatch";
class InstituteUserByRoleHoc extends React.Component {

    constructor(){
        super()
        this.state = {
            limit:12
        }
    }


    componentDidMount(){
        if(this.props.instituteId && this.props.userType){
            this.props.loadinstituteusers(
                this.props.instituteId,
                this.props.userType,
                this.state.limit
            )
        }
    }

    moreinstituteusers = () => {
        const {skip} = this.props.instituteUsers
        this.props.loadinstituteusers(
            this.props.instituteId,
            this.props.userType,
            this.state.limit,
            skip
        )
    }

    render(){
        const {data, loading, total, more, moreloading} = this.props.instituteUsers
        return this.props.children({
            users:data,
            loading,
            total,
            more,
            moreloading,
            moreUsers:this.moreinstituteusers
        })
    }
}

InstituteUserByRoleHoc.defaultProps = {
    instituteId:undefined,
    userType:undefined
}

InstituteUserByRoleHoc.propTypes = {
    instituteId:string.isRequired,
    userType:string.isRequired
}

export default connect(instituteUserByRoleMapStateToProp, instituteUserByRoleMapDispatchToProp)(InstituteUserByRoleHoc)