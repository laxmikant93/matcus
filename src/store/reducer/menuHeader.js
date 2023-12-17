import { MENUHEADERTYPES } from "../actions/menuHeader/actionTypes"

const MENU_HEADER_INITIAL_TYPES = {

  getMenuHeaderList: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  updateMenuHeader: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
  heading: {},
}

const menuHeader = (state = MENU_HEADER_INITIAL_TYPES, { type, payload }) => {

  switch (type) {
    case MENUHEADERTYPES.GET_MENU_HEADER_LIST_LOADING:
      return ({
        ...state,
        getMenuHeaderList: {
          ...state.getMenuHeaderList,
          data: [],
          loading: true,
          success: false,
          error: false
        }
      })

    case MENUHEADERTYPES.GET_MENU_HEADER_LIST_LOADED:
      return ({
        ...state,
        getMenuHeaderList: {
          ...state.getMenuHeaderList,
          data: payload,
          loading: false,
          success: true,
          error: false
        }
      })

    case MENUHEADERTYPES.GET_MENU_HEADER_LIST_RESET:
      return ({
        ...state,
        getMenuHeaderList: {
          ...state.getMenuHeaderList,
          data: [],
          loading: false,
          success: false,
          error: false
        }
      })

    case MENUHEADERTYPES.GET_MENU_HEADER_LIST_ERROR:
      return ({
        ...state,
        getMenuHeaderList: {
          ...state.getMenuHeaderList,
          data: [],
          loading: false,
          success: false,
          error: true
        }
      })

    case MENUHEADERTYPES.UPDATE_MENU_HEADER_LOADING:
      return ({
        ...state,
        updateMenuHeader: {
          ...state.updateMenuHeader,
          data: [],
          loading: true,
          success: false,
          error: false
        }
      })

    case MENUHEADERTYPES.UPDATE_MENU_HEADER_LOADED:
      return ({
        ...state,
        updateMenuHeader: {
          ...state.updateMenuHeader,
          data: payload,
          loading: false,
          success: true,
          error: false
        },
      })

    case MENUHEADERTYPES.UPDATE_MENU_HEADER_ERROR:
      return ({
        ...state,
        updateMenuHeader: {
          ...state.updateMenuHeader,
          data: [],
          loading: false,
          success: false,
          error: true
        }
      })

    case MENUHEADERTYPES.UPDATE_MENU_HEADER_RESET:
      return ({
        ...state,
        updateMenuHeader: {
          ...state.updateMenuHeader,
          data: [],
          loading: false,
          success: false,
          error: false
        }
      })
    case MENUHEADERTYPES.DYNAMIC_MENU_HEADERS_LOADING:
      return ({
        ...state,
        updateMenuHeader: {
          ...state.updateMenuHeader,
          data: [],
          loading: false,
          success: false,
          error: false
        }
      })
    case MENUHEADERTYPES.DYNAMIC_MENU_HEADERS:
      const heading = payload.subheaderData ? {
        facultyhead: payload.subheaderData_facultyhead || "Our Faculty",
        facultysubhead: payload.subheaderData_facultysubhead || "To be the best, you must learn from the best.",
        galleryhead: payload.subheaderData_galleryhead || "Our Gallery",
        gallerysubhead: payload.subheaderData_gallerysubhead || "A sneak-peak into our events and activities.",
        announcementhead: payload.subheaderData_announcementhead || "Announcements",
        announcementsubhead: payload.subheaderData_announcementsubhead || "Stay updated with our latest announcements.",
        faqhead: payload.subheaderData_faqhead || "Frequently Asked Questions",
        faqsubhead: payload.subheaderData_faqsubhead || "Need help? Refer to our most frequently asked questions. ",
        testimonialhead: payload.subheaderData_testimonialhead || "Our Testimonials",
        testimonialsubhead: payload.subheaderData_testimonialsubhead || "We lead by example. Here’s a few testimonials our clients have shared with us.",
        vacancyhead: payload.subheaderData_vacancyhead || "Current Openings",
        vacancysubhead: payload.subheaderData_vacancysubhead || "Join us and become a part of our institute’s dynamic culture.  ",
        servicehead: payload.subheaderData_servicehead || "Our Services",
        servicesubhead: payload.subheaderData_servicesubhead || "A full spectrum of services to ensure an enriching learning experience.",
        feehead: payload.subheaderData_feehead || "Our Fee Structure",
        feesubhead: payload.subheaderData_feesubhead || "We believe in transparency, trust and value creation.",
        admissionhead: payload.subheaderData_admissionhead || "Admissions Open",
        admissionsubhead: payload.subheaderData_admissionsubhead || "Apply now! Find application related information below.",
        noticehead: payload.subheaderData_noticehead || "Miscellaneous",
        noticesubhead: payload.subheaderData_noticesubhead || "Miscellaneous, Where you can add anything."
      } : {};
      return ({
        ...state,
        headingSuccess: true,
        heading: heading
      })
    default:
      return state
  }
}

export default menuHeader;