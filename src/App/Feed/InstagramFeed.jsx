import React from "react";

const InstagramFeed = () => {
  return (
    <>
      <div className="InstagramFeedCst">
        <div className="InstagramFeedHead">
          <div className="InstagramItem">
            <i className="ed-icon icon-instagram-feed purple i-65"></i>
          </div>
          <div className="InstagramItem">
            <p className="text-md primary w-300 purple">We Are Social</p>
            <p className="text-xs w-500 purple">
              Connect with us — @EdneedTech
            </p>
          </div>
        </div>
        <div className="InstagramFeedBody">
          <div className="InstagramItem">
            <img
              className="img-fluid"
              src="https://edneed-mailer-uat.s3.amazonaws.com/edneed-instagram-why-edneed-website.jpg"
              alt="Edneed Technology Instagram"
              onClick={() =>
                window.open("https://www.instagram.com/edneedtech/", "_blank")
              }
            />
          </div>
          <div className="InstagramItem">
            <img
              className="img-fluid"
              src="https://edneed-mailer-uat.s3.amazonaws.com/edneed-instagram-things-every-students.jpg"
              alt="Edneed Technology Instagram"
              onClick={() =>
                window.open("https://www.instagram.com/edneedtech/", "_blank")
              }
            />
          </div>
          <div className="InstagramItem">
            <img
              className="img-fluid"
              src="https://edneed-mailer-uat.s3.amazonaws.com/edneed-instagram-the-only-teammates.jpg"
              alt="Edneed Technology Instagram"
              onClick={() =>
                window.open("https://www.instagram.com/edneedtech/", "_blank")
              }
            />
          </div>
          <div className="InstagramItem">
            <img
              className="img-fluid"
              src="https://edneed-mailer-uat.s3.amazonaws.com/edneed-instagram-remote-learnng-superpowers.jpg"
              alt="Edneed Technology Instagram"
              onClick={() =>
                window.open("https://www.instagram.com/edneedtech/", "_blank")
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default InstagramFeed;
