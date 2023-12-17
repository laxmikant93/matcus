import { useSelector } from "react-redux";
function InstituteFooter() {
  const { data } = useSelector((state) => state.institutewebsite);
  return (
    <footer className="sd-footer-theme">
      <div className="sd-footerWrap">
        <div className="sd-copyright">©{(new Date().getFullYear())}, {data.institute_name}. All Rights Reserved.</div>
        <div className="sd-powered-text"><a href="https://edneed.com/" target="_blank" rel="noreferrer">Edneed Technology Pvt. Ltd.</a> is an education partner with {data.institute_name}.</div>
      </div>
    </footer>
  );
};

export default InstituteFooter;