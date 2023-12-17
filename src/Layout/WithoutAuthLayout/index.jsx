import React from "react";
import ScrollToTop from "../../Common/ScrollPageTop"
import Footer from "./Footer"
import Header from "./Header"


const WithoutAuthLayout = ({ children }) => {

  return (
    <>
      <Header />
      {children}
      <Footer />
      <ScrollToTop />
    </>
  )
}

export default WithoutAuthLayout