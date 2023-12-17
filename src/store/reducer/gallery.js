import { GALLERYTYPES } from "../actions/gallary/actionTypes";

const GALLERY_INITIAL_STATE = {
  list: {
    data: [],
    loading: false,
    error: false,
  },
  listid: {
    data: [],
    loading: false,
    error: false,
  },
  create: {
    data: "",
    loading: false,
    success: false,
    error: false,
  },
  update: {
    data: "",
    loading: false,
    success: false,
    error: false,
  },
  delete: {
    data: "",
    loading: false,
    success: false,
    error: false,
  },
};

export const gallery = (state = GALLERY_INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case GALLERYTYPES.GALLERY_READ: {
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          success: true,
        },
      };
    }

    case GALLERYTYPES.GALLERY_CREATE: {
      return {
        ...state,
        create: {
          ...state.create,
          data: payload,
          success: true,
        },
        list: {
          ...state.list,
          data: state.list.data.concat([
            {
              _id: payload.newgallery,
              thumbnail: payload.newgallery_thumbnail,
              title: payload.newgallery_title,
            },
          ]),
          success: true,
        },
      };
    }
    case GALLERYTYPES.GALLERY_EDIT: {
      return {
        ...state,
        update: {
          ...state.update,
          data: payload,
          success: true,
        },
        listid: {
          ...state.listid,
          data: { ...state.listid.data, title: payload.title },
          success: true,
        },
      };
    }
    case GALLERYTYPES.GALLERY_DELETE: {
      return {
        ...state,
        delete: {
          ...state.delete,
          data: payload,
          success: true,
        },
        list: {
          ...state.list,
          data: state.list.data.filter((item) => item._id !== payload),
          // data: state.list.data.filter((item) => item._id !== payload._id),
          success: true,
        },
      };
    }

    case GALLERYTYPES.GALLERY_READ_ID: {
      return {
        ...state,
        listid: {
          ...state.listid,
          data: payload,
          success: true,
        },
      };
    }
    case GALLERYTYPES.GALLERY_UPDATE_SELECTION:
      return {
        ...state,
        update: {
          ...state.update,
          data: state.list.data.find((annItem) => annItem._id === payload),
        },
      };

    default:
      return state;
  }
};

export default gallery;