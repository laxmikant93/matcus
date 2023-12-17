import React from "react";
import { connect } from "react-redux";
import { string } from "prop-types";
import { INS_GALLERY_MAP_STATE_TO_PROPS, INS_GALLERY_MAP_DISPATCH_TO_PROPS } from "./InstituteGalleryMapDispatch";
class InstituteGalleryHoc extends React.Component {
    constructor() {
        super()
        this.state = {
            limit: 1,

        }
    }
    componentDidMount() {
        this.props.instituteId && this.props.loadgallery(this.props.instituteId)
    }

    moregallery = () => {
        const { skip } = this.props.institutegallery
        this.props.loadgallerymore(this.props.instituteId, this.state.limit, skip)
    }

    render() {

        const { data, loading, total, more, moreloading } = this.props.institutegallery
        return this.props.children({
            gallery: data,
            more,
            loading,
            moreloading,
            total,
            loadmore: this.moregallery,
            viewgallerypopup: this.props.opnegallerypopup
        })
    }
}

InstituteGalleryHoc.defaultProps = {
    instituteId: undefined,
}

InstituteGalleryHoc.propTypes = {
    instituteId: string.isRequired,
}

export default connect(INS_GALLERY_MAP_STATE_TO_PROPS, INS_GALLERY_MAP_DISPATCH_TO_PROPS)(InstituteGalleryHoc)