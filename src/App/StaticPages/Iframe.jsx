import React from 'react';
import "./Pdf.scss";

const Iframe = () => {
  const iframe = '<iframe src="https://edneed-mailer-uat.s3.amazonaws.com/form-mgt-7a-edneed.pdf#toolbar=0" title="mgt7a" frameBorder="0" type="application/pdf" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen classNAme="frame"></iframe>';

  return (
    <>
      <div
        dangerouslySetInnerHTML={{ __html: iframe ? iframe : "" }} className="frame-wrap sun-editor-output"
      />
    </>
  );
}

export default Iframe