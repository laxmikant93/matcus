import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ValidationFile from "../../Classes/ValidationFile";
import {
  readSectionTitle,
  resetSectionTitle,
  updateSectionTitle,
} from "../../store/actions/sectionTitle";
import FormInput from "../Form/FormInput";
import "./SectionTitle.scss";
function SelectTitle({ type }) {
  const [ToggleSectionTitle, SetToggleSectionTitle] = useState(false);
  const [heading, setHeading] = useState();
  const [subHeading, setSubHeading] = useState();
  const [toast, setToast] = useState(false);
  const { user, sectionData } = useSelector((state) => {
    return {
      user: state.user,
      sectionData: state.sectionTitle.list,
    };
  });
  const dispatch = useDispatch();
  const [isFilled, setisFilled] = useState(false);
  useEffect(() => {
    // dispatch(
    //   updateSectionTitle({
    //     institute: user.user_institute,
    //     business: user.user_institute,
    //     industry: user.user_business_type
    //   })
    // );
    setTimeout(() => {
      dispatch(readSectionTitle(user.user_institute, user.user_business_type));
    }, 200);
  }, [user, dispatch]);

  if (sectionData.data && sectionData.success && !isFilled) {
    setisFilled(true);
    switch (type) {
      case "facultySelect":
        setHeading(sectionData.data.facultyhead);
        setSubHeading(sectionData.data.facultysubhead);
        break;
      case "announcementSelect":
        setHeading(sectionData.data.announcementhead);
        setSubHeading(sectionData.data.announcementsubhead);
        break;
      case "noticeSelect":
        setHeading(sectionData.data.noticehead);
        setSubHeading(sectionData.data.noticesubhead);
        break;
      case "admissionsSelect":
        setHeading(sectionData.data.admissionhead);
        setSubHeading(sectionData.data.admissionsubhead);
        break;
      case "galleriesSelect":
        setHeading(sectionData.data.galleryhead);
        setSubHeading(sectionData.data.gallerysubhead);
        break;
      case "testimonialsSelect":
        setHeading(sectionData.data.testimonialhead);
        setSubHeading(sectionData.data.testimonialsubhead);
        break;
      case "faqSelect":
        setHeading(sectionData.data.faqhead);
        setSubHeading(sectionData.data.faqsubhead);
        break;
      case "vacanciesSelect":
        setHeading(sectionData.data.vacancyhead);
        setSubHeading(sectionData.data.vacancysubhead);
        break;
      case "servicesSelect":
        if (user.user_business_type === "Services") {
          setHeading(sectionData.data.facilitieshead);
          setSubHeading(sectionData.data.facilitiessubhead);
        } else {
          setHeading(sectionData.data.servicehead);
          setSubHeading(sectionData.data.servicesubhead);
        }
        break;
      case "feestructureSelect":
        setHeading(sectionData.data.feehead);
        setSubHeading(sectionData.data.feesubhead);
        break;
      case "paymentSelect":
        setHeading(sectionData.data.paymenthead);
        setSubHeading(sectionData.data.paymentsubhead);
        break;
      case "coeSelect":
        setHeading(sectionData.data.coehead);
        setSubHeading(sectionData.data.coesubhead);
        break;
      case "categorySelect":
        setHeading(sectionData.data.categoryhead);
        setSubHeading(sectionData.data.categorysubhead);
        break;
      case "bookingserviceSelect":
        setHeading(sectionData.data.bookservicehead);
        setSubHeading(sectionData.data.bookservicesubhead);
        break;
      default:
        break;
    }
  }
  const handleInput = (e) => {
    let inputValue = ValidationFile.spaceNotAccept(e.target.value) ;
    let inputName = e.target.name;
    switch (type) {
      case "facultySelect":
        switch (inputName) {
          case "heading":
            setHeading(inputValue);
            break;
          case "subHeading":
            setSubHeading(inputValue);
            break;
          default:
            return false;
        }
        break;
      case "announcementSelect":
        switch (inputName) {
          case "heading":
            setHeading(inputValue);
            break;
          case "subHeading":
            setSubHeading(inputValue);
            break;
          default:
            return false;
        }

        break;
      case "admissionsSelect":
        switch (inputName) {
          case "heading":
            setHeading(inputValue);
            break;
          case "subHeading":
            setSubHeading(inputValue);
            break;
          default:
            return false;
        }
        break;
      case "testimonialsSelect":
        switch (inputName) {
          case "heading":
            setHeading(inputValue);
            break;
          case "subHeading":
            setSubHeading(inputValue);
            break;
          default:
            return false;
        }

        break;
      case "galleriesSelect":
        switch (inputName) {
          case "heading":
            setHeading(inputValue);
            break;
          case "subHeading":
            setSubHeading(inputValue);
            break;
          default:
            return false;
        }
        break;
      case "faqSelect":
        switch (inputName) {
          case "heading":
            setHeading(inputValue);
            break;
          case "subHeading":
            setSubHeading(inputValue);
            break;
          default:
            return false;
        }

        break;
      case "vacanciesSelect":
        switch (inputName) {
          case "heading":
            setHeading(inputValue);
            break;
          case "subHeading":
            setSubHeading(inputValue);
            break;
          default:
            return false;
        }
        break;
      case "servicesSelect":
        switch (inputName) {
          case "heading":
            setHeading(inputValue);
            break;
          case "subHeading":
            setSubHeading(inputValue);
            break;
          default:
            return false;
        }

        break;
      case "feestructureSelect":
        switch (inputName) {
          case "heading":
            setHeading(inputValue);
            break;
          case "subHeading":
            setSubHeading(inputValue);
            break;
          default:
            return false;
        }

        break;
      case "paymentSelect":
        switch (inputName) {
          case "heading":
            setHeading(inputValue);
            break;
          case "subHeading":
            setSubHeading(inputValue);
            break;
          default:
            return false;
        }

        break;

      case "coeSelect":
        switch (inputName) {
          case "heading":
            setHeading(inputValue);
            break;
          case "subHeading":
            setSubHeading(inputValue);
            break;
          default:
            return false;
        }

        break;

      case "categorySelect":
        switch (inputName) {
          case "heading":
            setHeading(inputValue);
            break;
          case "subHeading":
            setSubHeading(inputValue);
            break;
          default:
            return false;
        }

        break;

      case "bookingserviceSelect":
        switch (inputName) {
          case "heading":
            setHeading(inputValue);
            break;
          case "subHeading":
            setSubHeading(inputValue);
            break;
          default:
            return false;
        }

        break;

      default:
        break;
    }
  };
  const announcementSectionData = () => {
    return {
      announcementhead: heading,
      announcementsubhead: subHeading,
      institute: user.user_institute,
      business: user.user_institute,
      owner: user._id,
      industry: user.user_business_type
    };
  };
  const noticeSectionData = () => {
    return {
      noticehead: heading,
      noticesubhead: subHeading,
      institute: user.user_institute,
      business: user.user_institute,
      owner: user._id,
      industry: user.user_business_type
    };
  };
  const facultySectionData = () => {
    return {
      facultyhead: heading,
      facultysubhead: subHeading,
      institute: user.user_institute,
      business: user.user_institute,
      owner: user._id,
      industry: user.user_business_type
    };
  };
  const gallerySectionData = () => {
    return {
      galleryhead: heading,
      gallerysubhead: subHeading,
      institute: user.user_institute,
      business: user.user_institute,
      owner: user._id,
      industry: user.user_business_type
    };
  };
  const testimonialSectionData = () => {
    return {
      testimonialhead: heading,
      testimonialsubhead: subHeading,
      institute: user.user_institute,
      business: user.user_institute,
      owner: user._id,
      industry: user.user_business_type
    };
  };
  const faqSectionData = () => {
    return {
      faqhead: heading,
      faqsubhead: subHeading,
      institute: user.user_institute,
      business: user.user_institute,
      owner: user._id,
      industry: user.user_business_type
    };
  };
  const addmissionSectionData = () => {
    return {
      admissionhead: heading,
      admissionsubhead: subHeading,
      institute: user.user_institute,
      business: user.user_institute,
      owner: user._id,
      industry: user.user_business_type
    };
  };
  const servicesSectionData = () => {
    return {
      servicehead: heading,
      servicesubhead: subHeading,
      institute: user.user_institute,
      business: user.user_institute,
      owner: user._id,
      industry: user.user_business_type
    };
  };
  const vacanciesSectionData = () => {
    return {
      vacancyhead: heading,
      vacancysubhead: subHeading,
      institute: user.user_institute,
      business: user.user_institute,
      owner: user._id,
      industry: user.user_business_type
    };
  };
  const feestructureSectionData = () => {
    return {
      feehead: heading,
      feesubhead: subHeading,
      institute: user.user_institute,
      business: user.user_institute,
      owner: user._id,
      industry: user.user_business_type
    };
  };
  const paymentSectionData = () => {
    return {
      paymenthead: heading,
      paymentsubhead: subHeading,
      institute: user.user_institute,
      business: user.user_institute,
      owner: user._id,
      industry: user.user_business_type
    };
  };
  const coeSectionData = () => {
    return {
      coehead: heading,
      coesubhead: subHeading,
      institute: user.user_institute,
      business: user.user_institute,
      owner: user._id,
      industry: user.user_business_type
    };
  };
  const categorySectionData = () => {
    return {
      categoryhead: heading,
      categorysubhead: subHeading,
      institute: user.user_institute,
      business: user.user_institute,
      owner: user._id,
      industry: user.user_business_type
    };
  };
  const bookServiceSectionData = () => {
    return {
      bookservicehead: heading,
      bookservicesubhead: subHeading,
      institute: user.user_institute,
      business: user.user_institute,
      owner: user._id,
      industry: user.user_business_type
    };
  };
  useEffect(() => {
    return () => {
      dispatch(resetSectionTitle());
    };
  }, [dispatch]);
  const onBlur = () => {
    switch (type) {
      case "facultySelect":
        dispatch(updateSectionTitle(facultySectionData()));
        break;
      case "announcementSelect":
        dispatch(updateSectionTitle(announcementSectionData()));
        break;
      case "noticeSelect":
        dispatch(updateSectionTitle(noticeSectionData()));
        break;
      case "testimonialsSelect":
        dispatch(updateSectionTitle(testimonialSectionData()));
        break;
      case "admissionsSelect":
        dispatch(updateSectionTitle(addmissionSectionData()));
        break;
      case "galleriesSelect":
        dispatch(updateSectionTitle(gallerySectionData()));
        break;
      case "faqSelect":
        dispatch(updateSectionTitle(faqSectionData()));
        break;
      case "vacanciesSelect":
        dispatch(updateSectionTitle(vacanciesSectionData()));
        break;
      case "feestructureSelect":
        dispatch(updateSectionTitle(feestructureSectionData()));
        break;
      case "servicesSelect":
        dispatch(updateSectionTitle(servicesSectionData()));
        break;
      case "paymentSelect":
        dispatch(updateSectionTitle(paymentSectionData()));
        break;
      case "coeSelect":
        dispatch(updateSectionTitle(coeSectionData()));
        break;
      case "categorySelect":
        dispatch(updateSectionTitle(categorySectionData()));
        break;
      case "bookingserviceSelect":
        dispatch(updateSectionTitle(bookServiceSectionData()));
        break;
      default:
        break;
    }
    setToast(true);
    SetToggleSectionTitle(false);
    setTimeout(() => {
      setToast(false);
    }, 8000);
  };
  return (
    <div className="SectionTitleCustomWrap">
      <div className="SectionTitleCustom">
        <button
          className={`btnText BtnCaret text-xxs w-300 ${ToggleSectionTitle ? `active` : ``
            }`}
          onClick={() => SetToggleSectionTitle(!ToggleSectionTitle)}
        >
          {type === "categorySelect" ? "Category Section Title" : type === "bookingserviceSelect" ? "Service Section Title" : "Section Title"}
        </button>
        <p className="secondary">
          {toast ? "Heading have been successfully saved." : ""}
        </p>
        {ToggleSectionTitle && (
          <div className="SectionTitleInput mt-10">
            {!sectionData.loading && sectionData.success ? (
              <React.Fragment>
                <div className="formFieldwrap">
                  <FormInput
                    type="text"
                    label="Heading"
                    name="heading"
                    value={heading}
                    placeholder="Heading"
                    onChange={handleInput}
                    onKeyUp={handleInput}
                    // onBlur={onBlur}
                    maxLength="20"
                  />
                </div>
                <div className="formFieldwrap">
                  <FormInput
                    type="text"
                    label="Subheading"
                    name="subHeading"
                    value={subHeading}
                    placeholder="Subheading"
                    onChange={handleInput}
                    // onBlur={onBlur}
                    onKeyUp={handleInput}
                  />
                </div>
                <button
                  className="button button-primary btn-sm"
                  onClick={onBlur}
                >
                  Save
                </button>
              </React.Fragment>
            ) : (
              <div>Loading...</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
export default SelectTitle;
