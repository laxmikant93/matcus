import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const HeadLogo = (user) => {
  const { data } = useSelector((state) => state.institutewebsite);
  const [windowSize, setWindowSize] = useState({
    width: undefined,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function getLastWord(sentence) {
    var matches = sentence ? sentence.match(/\b(\w)/g) : "";
    var acronym = matches ? matches.join('') : "";
    return acronym;
  }

  return (
    <React.Fragment>
      <div className="subdomainlogoWrap">
        {data.hasOwnProperty("institute_logo") && data.institute_logo ? (
          <a href="/">
            <img src={data.institute_logo} alt={data.institute_name} />
            {windowSize.width <= 768 ?
              // <React.Fragment>
              //   {getLastWord(data.institute_name)}
              // </React.Fragment>
              ""
              : <span className="heroInsNameNav text-sm w-600 capitalize">
                {data.institute_name}
              </span>}

          </a>
        ) : (
          <React.Fragment>
            {
              windowSize.width <= 768 ?
                // <React.Fragment>
                //   {getLastWord(data.institute_name)}
                //   </React.Fragment>
                ""
                : <p>
                  <NavLink to="/">{data.institute_name}</NavLink>
                </p>
            }
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};

export default HeadLogo;
