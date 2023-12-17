import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import SessionStorage from "../../Classes/SessionStorage";

export default function SubDomainTags() {
  const { instituteData, instituteDataSuccess } = useSelector((state) => {
    return {
      instituteData: state.institutewebsite.data,
      instituteDataSuccess: state.institutewebsite,
    };
  });
  useEffect(() => {
    if (instituteDataSuccess.loading) {
    } else if (instituteDataSuccess.notfound) {
    } else if (instituteDataSuccess.reload) {
    } else {
      SessionStorage.setJson("insData", instituteData);
    }
  }, [
    instituteData,
    instituteDataSuccess.loading,
    instituteDataSuccess.notfound,
    instituteDataSuccess.reload,
  ]);

  return (
    <React.Fragment>
      {
        instituteDataSuccess ? <Helmet>
          <title data-react-helmet="true">{instituteData.meta_title ? instituteData.meta_title : instituteData.institute_name}</title>
          <meta
            name="description"
            content={instituteData.meta_description}
            data-react-helmet="true"
          />
          <meta
            name="keyword"
            content={instituteData.meta_keywords}
            data-react-helmet="true"
          />
          <link
            rel="shortcut icon"
            href={instituteData.favIcon ===
              undefined ||
              instituteData.favIcon ===
              null ||
              instituteData.favIcon ===
              ""
              ? instituteData.institute_logo ===
                undefined ||
                instituteData.institute_logo ===
                null ||
                instituteData.institute_logo ===
                "" ? "" : instituteData.institute_logo
              : instituteData.favIcon}
            type="image/x-icon"
            data-react-helmet="true"
          />
          <link
            rel="icon"
            // href={instituteData.favIcon ? instituteData.favIcon : instituteData.institute_logo}
            href={instituteData.favIcon ===
              undefined ||
              instituteData.favIcon ===
              null ||
              instituteData.favIcon ===
              ""
              ? instituteData.institute_logo ===
                undefined ||
                instituteData.institute_logo ===
                null ||
                instituteData.institute_logo ===
                "" ? "" : instituteData.institute_logo
              : instituteData.favIcon}
            type="image/x-icon"
            data-react-helmet="true"
          />
          <link
            rel="canonical"
            href="http://mysite.com/example"
            data-react-helmet="true"
          />
          {/* <!-- FACEBOOK TAG START HERE --> */}
          <meta
            property="fb:app_id"
            content="your_app_id"
            data-react-helmet="true"
          />
          <meta
            property="og:url"
            id="url_id"
            content={window.location.href}
            data-react-helmet="true"
          />
          <meta property="og:type" content="Website" data-react-helmet="true" />
          <meta
            property="og:title"
            content={instituteData.meta_title ? instituteData.meta_title : instituteData.institute_name}
            data-react-helmet="true"
          />
          <meta
            property="og:description"
            content={instituteData.meta_description}
            data-react-helmet="true"
          />
          <meta
            property="og:image"
            content={instituteData.og_tag ? instituteData.og_tag : instituteData.banners?.length ? instituteData.banners[0].institute_featured_banner : ""}
            data-react-helmet="true"
          />
          <meta
            property="og:image:width"
            content="600"
            data-react-helmet="true"
          />
          <meta
            property="og:image:height"
            content="315"
            data-react-helmet="true"
          />
          <meta
            property="og:image:alt"
            content={instituteData.meta_title ? instituteData.meta_title : instituteData.institute_name}
            data-react-helmet="true"
          />
          <meta
            property="og:site_name"
            content="EdneedTech"
            data-react-helmet="true"
          />
          <meta property="og:locale" content="en_IN" data-react-helmet="true" />
          <meta
            property="fb:admins"
            content="Facebook numeric ID"
            data-react-helmet="true"
          />
          {/* <!-- FACEBOOK TAG END HERE --> */}

          {/* <!--TWITTER TAG START HERE --> */}
          <meta
            name="twitter:title"
            content={instituteData.og_title ? instituteData.og_title : instituteData.institute_name}
            data-react-helmet="true"
          />
          <meta
            name="twitter:image"
            content={instituteData.og_tag ? instituteData.og_tag : instituteData.banners?.length ? instituteData.banners[0].institute_featured_banner : ""}
            data-react-helmet="true"
          />
          <meta
            name="twitter:image:alt"
            content={instituteData.og_title}
            data-react-helmet="true"
          />
          <meta
            name="twitter:image:width"
            content="600"
            data-react-helmet="true"
          />
          <meta
            name="twitter:image:height"
            content="315"
            data-react-helmet="true"
          />
          <meta
            name="twitter:url"
            id="urlId"
            content={window.location.href}
            data-react-helmet="true"
          />
          <meta
            name="twitter:card"
            content="Website"
            data-react-helmet="true"
          />
          <meta
            name="twitter:description"
            content={instituteData.meta_description}
            data-react-helmet="true"
          />
          <meta
            name="twitter:creator"
            content="@EdneedTech"
            data-react-helmet="true"
          />
          <meta
            name="twitter:site"
            content="@EdneedTech"
            data-react-helmet="true"
          />

          <meta
            itemprop="name"
            content={instituteData.meta_title ? instituteData.meta_title : instituteData.institute_name}
            data-react-helmet="true"
          />
          <meta
            itemprop="description"
            content={instituteData.meta_description}
            data-react-helmet="true"
          />
          <meta
            itemprop="image"
            content={instituteData.og_tag ? instituteData.og_tag : instituteData.banners?.length ? instituteData.banners[0].institute_featured_banner : ""}
            data-react-helmet="true"
          />

          {/* <script className='structured-data-list' type="application/ld+json">{structuredJSON}</script> */}

          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "Website",
              mainEntityOfPage: {
                "@type": "EducationalOrganization",
                "@id": window.location.href,
              },
              name: "Edneed",
              image: instituteData.og_tag,
              author: {
                "@type": "Organization",
                name: "Edneed",
              },
              description: instituteData.og_description,
            })}
          </script>
        </Helmet> : ""
      }

    </React.Fragment>
  );
}
