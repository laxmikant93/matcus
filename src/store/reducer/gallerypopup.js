import { GalleryPopupActionTypes } from "../actions/gallerypopup/actionTypes";

const GALLERY_POPUP_INITIAL_STATE = {
    galleryid:undefined,
    show:false,
    loading:true,
    reload:false,
    total:0,
    skip:0,
    more:false,
    moreloading:false,
    data:[]
}

const gallerypopup = (state=GALLERY_POPUP_INITIAL_STATE, {type, payload}) => {
    switch (type) {

        case GalleryPopupActionTypes.GALLERY_POPUP_SHOW:
            return({
                ...GALLERY_POPUP_INITIAL_STATE,
                galleryid:payload,
                show:true,
            })
        
        case GalleryPopupActionTypes.GALLERY_POPUP_HIDE:
            return(GALLERY_POPUP_INITIAL_STATE)

        case GalleryPopupActionTypes.GALLERY_POPUP_LOADING:
            return({
                ...state,
                loading:true,
                reload:false,
                data:[]
            })
        
        case GalleryPopupActionTypes.GALLERY_POPUP_LOADED:
            return({
                ...state,
                loading:false,
                reload:false,
                data:payload.data,
                total:payload.total,
                skip:payload.limit,
                more:(payload.total>payload.data.length && payload.data.length===payload.limit),

            })
            
        case GalleryPopupActionTypes.GALLERY_POPUP_MORE_LOADING:
            return({
                ...state,
                moreloading:true,
            })
        
        case GalleryPopupActionTypes.GALLERY_POPUP_MORE_LOADED:
            let updatedGall = state.data.concat(payload.data);
            return({
                ...state,
                moreloading:false,
                reload:false,
                data:updatedGall,
                total:payload.total,
                skip:state.skip+payload.limit,
                more:(payload.total>updatedGall.length && payload.data.length===payload.limit),
            })

        case GalleryPopupActionTypes.GALLERY_POPUP_LOADING_ERROR:
            return({
                ...state,
                loading:false,
                reload:true,
                data:[]
            })

        default:
            return state;
    }
}

export default  gallerypopup