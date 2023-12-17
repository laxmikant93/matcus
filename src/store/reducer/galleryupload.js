import { GALLERYUPLOADTYPES } from "../actions/galleryupload/actionTypes";

const GALLERYUPLOAD_INITIAL_STATE = {
  list: {
    data: [],
    loading: false,
    error: false,
  },
  create: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  update: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  delete: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  updateSelectionGallery: {
    data: [],
    loading: false,
    success: false,
    error: false,
  }
};

const galleryupload = (state = GALLERYUPLOAD_INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case GALLERYUPLOADTYPES.GALLERYUPLOAD_READ: {
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          success: true,
        },
      };
    }
    case GALLERYUPLOADTYPES.GALLERYUPLOAD_UPDATE_SELECTION: {
      return {
        ...state,
        updateSelectionGallery: {
          ...state.updateSelectionGallery,
          data: payload,
          success: true
        }
      }
    }
    case GALLERYUPLOADTYPES.GALLERYUPLOAD_RESET: {
      return {
        ...state,
        updateSelectionGallery: {
          ...state.updateSelectionGallery,
          data: payload,
          success: false,
        }
      }
    }
    case GALLERYUPLOADTYPES.GALLERYUPLOAD_CREATE: {
      return {
        ...state,
        create: {
          ...state.create,
          data: payload,
          success: true,
        },
        list: {
          ...state.list,
          data: state.list.data.concat(payload),
          success: true,
        },
      };
    }
    case GALLERYUPLOADTYPES.GALLERYUPLOAD_EDIT: {
      return {
        ...state,
        update: {
          ...state.update,
          data: payload,
          success: true,
        },
        list: {
          ...state.list,
          data: state.list.data.map((content) =>
            content._id === payload._id
              ? {
                ...content,
                images: payload.images,
                videos: payload.videos,
                featuredFlag: payload.featuredFlag,
                description: payload.description,
              }
              : content
          ),
          success: true
        },
      };
    }
    case GALLERYUPLOADTYPES.GALLERYUPLOAD_DELETE: {
      return {
        ...state,
        delete: {
          ...state.delete,
          data: payload,
          success: true,
        },
        list: {
          ...state.list,
          data: state.list.data.filter((item) => item._id !== payload._id),
          success: true,
        },
      };
    }

    default:
      return state;
  }
};
export default galleryupload;