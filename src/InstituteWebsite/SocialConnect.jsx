import React from "react";
import AppLinkUrl from "../Common/AppLink/AppLinkUrl";
import { useSelector } from "react-redux";

const SocialConnect = () => {
  const insUrlData = useSelector((state) => state.institutewebsite.data);

  const isSkinPreviewRoute =
    window.location.pathname.includes("/preview-skintheme");
  return (
    <>
      {(AppLinkUrl.subdomain() || isSkinPreviewRoute || AppLinkUrl.privateDomain()) && (
        <>
          {(insUrlData.facebook_url ||
            insUrlData.twitter_url ||
            insUrlData.linkedin_url ||
            insUrlData.instagram_url ||
            insUrlData.youtube_url) && (
              <div className="sd-social-connect">
                {(insUrlData.facebook_url || !insUrlData.facebook_url === "") && (
                  <a
                    href={insUrlData.facebook_url}
                    target="blank"
                    title="Share it on Facebook_"
                  >
                    <i className="ed-icon icon-fb i-xs"></i>
                  </a>
                )}
                {(insUrlData.twitter_url || !insUrlData.twitter_url === "") && (
                  <a
                    href={insUrlData.twitter_url}
                    target="blank"
                    title="Share it on Twitter"
                  >
                    <i className="ed-icon icon-twitter i-xs"></i>
                  </a>
                )}
                {(insUrlData.linkedin_url || !insUrlData.linkedin_url === "") && (
                  <a
                    href={insUrlData.linkedin_url}
                    target="blank"
                    title="Share it on Linkedin"
                  >
                    <i className="ed-icon icon-linkedin i-xs"></i>
                  </a>
                )}
                {(insUrlData.instagram_url ||
                  !insUrlData.instagram_url === "") && (
                    <a
                      href={insUrlData.instagram_url}
                      target="blank"
                      title="Share it on Instagram"
                    >
                      <i className="ed-icon icon-instagram i-xs"></i>
                    </a>
                  )}
                {(insUrlData.youtube_url || !insUrlData.youtube_url === "") && (
                  <a
                    href={insUrlData.youtube_url}
                    target="blank"
                    title="Share it on YouTube"
                  >
                    <i className="ed-icon icon-youtube i-xs"></i>
                  </a>
                )}
              </div>
            )}
        </>
      )}
    </>
  );
};

export default SocialConnect;
