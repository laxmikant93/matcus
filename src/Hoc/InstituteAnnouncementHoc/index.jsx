import React from "react";
import { connect } from "react-redux";
import { string } from "prop-types";
import { INS_ANN_MAP_STATE_TO_PROPS, INS_ANN_MAP_DISPATCH_TO_PROPS } from "./InstituteAnnouncementMapDispatch";
class InstituteAnnouncementHoc extends React.Component {
    constructor(props){
        super()
        this.state = {
            limit:12,
        }
    }
    componentDidMount(){
        this.props.instituteId && this.props.loadannouncement(this.props.instituteId)
    }

    moreannouncement = () => {
        const {skip} = this.props.instituteannouncement
        this.props.loadannouncementmore(this.props.instituteId, this.state.limit, skip)
    }




    render(){

        const {data, loading, total, more, moreloading} = this.props.instituteannouncement
        return this.props.children({
            data:data,
            more,
            loading,
            moreloading,
            viewPopup:this.props.showAnnPopup,
            total,
            loadmore:this.moreannouncement
        })
    }
}

InstituteAnnouncementHoc.defaultProps = {
    instituteId:undefined
}

InstituteAnnouncementHoc.propTypes = {
    instituteId:string.isRequired
}

export default connect(INS_ANN_MAP_STATE_TO_PROPS, INS_ANN_MAP_DISPATCH_TO_PROPS)(InstituteAnnouncementHoc)