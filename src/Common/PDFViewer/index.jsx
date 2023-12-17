import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Modal from "../../Common/Modal";
import ModalBody from "../Modal/ModalBody";
import ModalHeader from "../Modal/ModalHeader";
import "./Pdfviewer.scss";
function PDFViewer({ openPDF, setOpenPDF, url }) {
  // const [openPdfModel,setOpenPdfModel]=useState(false);
  // const CloseAssignmentModal = () => {
  //   setOpenPDF(!openPDF);
  // }
  const ref = useRef(null);

  useEffect(() => {
    ref.current = document.addEventListener("contextmenu", function (e) {
      e.preventDefault();
    });
  }, []);
  // const pdf="https://edneed-mailer-uat.s3.amazonaws.com/edneed-manual-document.pdf"
  return (
    <div>
      <iframe
        className="PDFiframe"
        // ref={ref.current}
        src="https://edneed-mailer-uat.s3.amazonaws.com/edneed-manual-document.pdf#toolbar=0"
        id="pdf"
        type="application/pdf"
        title="user-manual"
        height={900}
        width={500}
      />
    </div>
  );
}

export default PDFViewer;
