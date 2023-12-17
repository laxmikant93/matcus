import { bool } from "prop-types";
import logo from "../assets/images/logo/edneed-logo.svg";
const NotFound = ({ showlogo }) => {
  return (
    <section className="">
      <div className="row center-md center-xs middleContentPlacement">
        <div className="col-xs-10 col-md-4">
          {showlogo && (
            <div className="logoCustom">
              <img className="brandLogo large" src={logo} alt="not found" />
            </div>
          )}

          <div className="error404-section-wrapper">
            <div className="error404-section">
              <h1 className="text-sm w-600 base text-left">404</h1>
              <p className="text-xxs w-300 red text-left">
                Oops, Page not found!
              </p>
              <p className="text-xs w-500 base text-left mt-20">
                This page is not available
              </p>
            </div>
            <span className="error-link-icon">
              <i className="ed-icon icon-404-link i-95 red"></i>
            </span>
            <span className="error-sad-icon">
              <i className="ed-icon icon-404-sad i-95 white"></i>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

NotFound.defaultProps = {
  showlogo: true,
};

NotFound.propTypes = {
  showlogo: bool,
};

export default NotFound;
