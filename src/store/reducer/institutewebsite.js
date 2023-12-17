import { INS_ACTION_TYPES } from "../actions/institutewebsite/actionTypes";

const INS_WEBSITE_INITIAL_STATE = {
    loading: true,
    reload: false,
    notfound: false,
    data: {},
    heading: {},
    like: {
        data: [],
        success: false,
        loading: false,
        error: false,
    },
    subdomainliked: {
        data: [],
        success: false,
        loading: false,
        error: false,
    },
    domainpwamanifestinfo: {
        data: [],
        success: false,
        loading: false,
        error: false
    },
    menuList: {
        data: [],
        loading: false,
        success: false,
        error: false
    }
}

const institutewebsite = (state = INS_WEBSITE_INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case INS_ACTION_TYPES.INS_SUBDOMAIN_LOADING:
            return ({
                ...state,
                loading: true,
                reload: false,
                notfound: false,
                data: {},
                heading: {}
            })

        case INS_ACTION_TYPES.INS_SUBDOMAIN_LOADED:
            const data = payload.data[0];
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
                testimonialsubhead: payload.subheaderData_testimonialsubhead || "We value your review. Share your experience with us.",
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
                loading: false,
                reload: false,
                notfound: false,
                data: data,
                heading: heading
            })

        case INS_ACTION_TYPES.INS_SUBDOMAIN_LOADING_ERROR:
            return ({
                ...state,
                loading: false,
                reload: true,
                notfound: false,
                data: {}
            })

        case INS_ACTION_TYPES.INS_SUBDOMAIN_NOT_FOUND:
            return ({
                ...state,
                loading: false,
                reload: false,
                notfound: true,
                data: {}
            })

        case INS_ACTION_TYPES.INS_SUBDOMIAN_LIKE:
            return ({
                ...state,
                like: {
                    ...state.like,
                    data: payload,
                    success: true
                },

            })
        case INS_ACTION_TYPES.INS_SUBDOMAIN_LIKE_INFO:
            return ({
                ...state,
                subdomainliked: {
                    ...state.subdomainliked,
                    data: payload,
                    success: true
                },
            })
        case INS_ACTION_TYPES.INS_DOMAIN_PWA_LOADING:
            return ({
                ...state,
                loading: true,
                reload: false,
                notfound: false,
                data: {},
                heading: {}
            })
        case INS_ACTION_TYPES.INS_WEBSITE_HEADER_LOADING: {
            return ({
                ...state,
                menuList: {
                    ...state.menuList,
                    data: [],
                    loading: true,
                    success: false
                },
            })
        }
        case INS_ACTION_TYPES.INS_WEBSITE_HEADER: {
            return ({
                ...state,
                menuList: {
                    ...state.menuList,
                    data: payload,
                    loading: false,
                    success: true,
                },
            })
        }
        case INS_ACTION_TYPES.INS_DOMAIN_PWA_LOADED:
            return ({

            })
        default:
            return state;
    }
}

export default institutewebsite