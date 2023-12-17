import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const ThemeSelection = () => {
  const [kiaTheme, setKiaTheme] = useState(false);
  const { getbusinessInfoData } = useSelector((state) => {
    return {

      getbusinessInfoData: state.businessInfo.ecomWebsite.data,

      businessInfoData: state.businessInfo.ecomWebsite.data,
      // getbusinessInfoSuccess: state.businessInfo.ecomWebsite.success,
      // getbusinessInfoloading: state.businessInfo.ecomWebsite.loading,
    };
  })
  // React useEffect hook that will fire up
  // when "darkTheme" changes
  useEffect(() => {
    if (getbusinessInfoData && getbusinessInfoData._id === "6346ae2a97eeb30759ae5ce7") {

      setKiaTheme(!kiaTheme)


    }

  }, []);
  useEffect(() => {

    // Accessing scss variable "--background-color"
    // and "--text-color" using plain JavaScript
    // and changing the same according to the state of "darkTheme"
    const root = document.documentElement;
    // root?.style.setProperty(
    //   (("--alpha"),
    //     kiaTheme ? "" : "var(--alpha_1)"),
    //   ("--beta",
    //     kiaTheme ? "" : "var(--beta_1)"),
    //   ("--gama",
    //     kiaTheme ? "var(--gama_1)" : "")
    // );

    root?.style.setProperty(
      "--alpha",
      kiaTheme ? "" : "var(--alpha_1)"

    );
    root?.style.setProperty(

      "--beta",
      kiaTheme ? "" : "var(--beta_1)"

    );
    root?.style.setProperty(
      "--gama",
      kiaTheme ? "" : "var(--gama_1)"

    );


  }, [kiaTheme]);

  //   ("--alpha",
  //   kiaTheme ? "--alpha_1" : ""),
  // ("--beta",
  //   kiaTheme ? "--beta_1" : ""),
  // ("--gama",
  //   kiaTheme ? "--gama_1" : "")
  return (
    <React.Fragment></React.Fragment>
  )
}

export default ThemeSelection