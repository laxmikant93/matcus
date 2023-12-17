import { SERVICESTYPES } from "../actions/services/actionType";

const SERVICES_INITIAL_STATE = {
  list: {
    data: [],
    loading: false,
    error: false,
    success: false,
  },
  addService: {
    data: [],
    loading: false,
    saveLoading: false,
    error: false,
    success: false,
  },
  update: {
    data: {},
    loading: false,
    error: false,
    success: false,
  },
  updateSelection: {
    data: {},
    loading: false,
    error: false,
    success: false,
  },
  deleteService: {
    data: {},
    loading: false,
    error: false,
    success: false,
  },
};

const services = (state = SERVICES_INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SERVICESTYPES.SERVICESREAD:
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          loading: false,
          success: true,
        },
      };
    case SERVICESTYPES.SERVICES_UPDATE_SELECTION:
      return {
        ...state,
        updateSelection: {
          ...state.updateSelection,
          data: payload,
          success: true,
        },
      };
    case SERVICESTYPES.SERVICES_UPDATE_SELECTION_CLEAR:
      return {
        ...state,
        updateSelection: {
          ...state.updateSelection,
          data: payload,
          success: false,
        },
      };
    case SERVICESTYPES.SEARCHSERVICE: {
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          loading: false,
          success: true,
        },
      };
    }
    case SERVICESTYPES.SORTSERVICE: {
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          loading: false,
          success: true,
        },
      };
    }
    case SERVICESTYPES.SERVICESLOADING:
      return {
        ...state,
        list: {
          ...state.list,
          data: payload,
          success: false,
          loading: true,
        },
      };


    case SERVICESTYPES.POSTSERVICELOADING:
      return ({
        ...state,
        addService: {
          ...state.addService,
          saveLoading: false,
          loading: true,
          success: false,
          error: false
        }
      })
    case SERVICESTYPES.POST_SERVICE_LOADING_SAVE:
      return ({
        ...state,
        addService: {
          ...state.addService,
          saveLoading: true,
          loading: false,
          success: false,
          error: false
        }
      })

    case SERVICESTYPES.POSTSERVICE: {
      return {
        ...state,
        addService: {
          data: payload,
          loading: false,
          success: true,
          saveLoading: false,
        },
        list: {
          data: [payload].concat(state.list.data),
          loading: false,
        },
      };
    }
    case SERVICESTYPES.DELETESERVICE: {
      return {
        ...state,
        deleteService: {
          ...state.deleteService,
          data: payload,
          success: true,
        },
        list: {
          ...state.list,
          data: state.list.data.filter((item) => item._id !== payload),
          success: true,
        },
      };
    }
    case SERVICESTYPES.SERVICESUPDATE: {
      return {
        ...state,
        list: {
          ...state.list,
          data: state.list.data.map((content) =>
            content._id === payload._id
              ? {
                ...content,
                isStatus: payload.isStatus,
              }
              : content
          ),
          success: true,
        },
      };
    }

    case SERVICESTYPES.SERVICE_UPDATING: {
      return {
        ...state,
        update: {
          ...state.update,
          loading: true,
          success: false,
          data: payload,
        }

      }
    }

    case SERVICESTYPES.SERVICE_LIST_UPDATE: {
      return {
        ...state,
        update: {
          ...state.update,
          loading: false,
          success: true,

        },
        list: {
          ...state.list,
          data: state.list.data.map((content) =>
            content._id === payload._id
              ? {
                ...content,
                title: payload.title,
                details: payload.details,
                thumbnail: payload.thumbnail,
              }
              : content
          ),
          success: true,
        },
      };
    }
    case SERVICESTYPES.SERVICES_UPDATING_CLEAR: {
      return {
        ...state,
        update: {
          ...state.update,
          loading: false,
          data: {},
          success: false,
          error: false,
        }
      }
    }
    case SERVICESTYPES.RESETSERVICES:
      return SERVICES_INITIAL_STATE;
    default:
      return state;
  }
};
export default services;