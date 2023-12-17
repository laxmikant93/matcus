import React from 'react';
import { Helmet } from 'react-helmet';

export default function EdneedTags() {
  const defaultMetaTitle = `Best Education Management System in 2022 | FREE Demo`
  const defaultMetaDiscription = `Edneed is the best Education Management System solution provider in India 2022. Let us show you a free demo and create your website in just 2 minutes.`
  return (
    <React.Fragment>
      <Helmet>
        {/* <!-- FACEBOOK TAG START HERE --> */}
        <meta property="fb:app_id" content="your_app_id" data-react-helmet="true" />
        <meta property="og:url" content={window.location.href} data-react-helmet="true" />
        <meta property="og:type" content="Website" data-react-helmet="true" />
        <meta property="og:title" content={defaultMetaTitle} data-react-helmet="true" />
        <meta property="og:description"
          content={defaultMetaDiscription} data-react-helmet="true" />
        <meta property="og:image" data-react-helmet="true" content="https://edneed-mailer-uat.s3.amazonaws.com/edneed-social-og-image.jpg" />
        <meta property="og:image:width" content="600" data-react-helmet="true" />
        <meta property="og:image:height" content="315" data-react-helmet="true" />
        <meta property="og:image:alt" content="Best Education Management System in 2022 | FREE Demo" data-react-helmet="true" />
        <meta property="og:site_name" content="EdneedTech" data-react-helmet="true" />
        <meta property="og:locale" content="en_IN" data-react-helmet="true" />
        <meta property="fb:admins" content="Facebook numeric ID" data-react-helmet="true" />
        {/* <!-- FACEBOOK TAG END HERE --> */}

        {/* <!--TWITTER TAG START HERE --> */}
        <meta name="twitter:title" content={defaultMetaTitle} data-react-helmet="true" />
        <meta name="twitter:image" data-react-helmet="true" content="https://edneed-mailer-uat.s3.amazonaws.com/edneed-social-og-image.jpg" />
        <meta name="twitter:image:alt" data-react-helmet="true" content="Best Education Management System in 2022 | FREE Demo" />
        <meta name="twitter:image:width" data-react-helmet="true" content="600" />
        <meta name="twitter:image:height" data-react-helmet="true" content="315" />
        <meta name="twitter:url" id="urlId" data-react-helmet="true" content={window.location.href} />
        <meta name="twitter:card" content="Website" data-react-helmet="true" />
        <meta name="twitter:description"
          content={defaultMetaDiscription} data-react-helmet="true" />
        <meta name="twitter:creator" content="@EdneedTech" data-react-helmet="true" />
        <meta name="twitter:site" content="@EdneedTech" data-react-helmet="true" />


        <meta itemprop="name" content={defaultMetaTitle} data-react-helmet="true" />
        <meta itemprop="description"
          content={defaultMetaDiscription} data-react-helmet="true" />
        <meta itemprop="image" data-react-helmet="true" content="https://edneed-mailer-uat.s3.amazonaws.com/edneed-social-og-image.jpg" />



        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Website",
            "mainEntityOfPage": {
              "@type": "EducationalOrganization",
              "@id": window.location.href
            },
            "name": "Edneed",
            "image": "https://edneed-mailer-uat.s3.amazonaws.com/edneed-social-og-image.jpg",
            "author": {
              "@type": "Organization",
              "name": "Edneed"
            },
            "description": { defaultMetaDiscription },
          })}
        </script>

      </Helmet>
    </React.Fragment>
  );
}