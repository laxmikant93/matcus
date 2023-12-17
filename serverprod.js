const express = require("express");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const xml = require('xml');
const PORT = 5001;
const app = express();
let ecom = [
  "/",
  "/products",
  "aboutus", "/ecomFooter",
  "/customer-login",
  '/customer-login-with-otpv1',
  '/customer-signup-otp-verify',
  "/ecommerce/addproduct",
  "/ecomTemHome",
  '/ecomFooter',
  '/ecomDefaultTemp',
  '/products',
  '/Adrees-Details-WL',
  '/Payment-Details-WL',
  '/ecom-orderDetails',
  '/category',
  '/ecom-cart',
  '/ecom-orderConfirm',
  '/ecom-myOrders',
  '/ecom-orderDetails',
  '/ecom-order/initiatePayment',
  '/ecom-RazorPay/create-account',
  '/ecom-myaccount',
  '/ecom-savedaddress',
  '/ecom-myprofile',
  '/ecom-wishlist',
  '/ecom-aboutus',
  '/ecom-paymode',
  '/ecom-contactus',
  '/ecom-returnpolicy',
  '/ecom-tnc',
  '/ecom-faqs',
  '/ecom-currency-selector'
]
let dEcom = [
  "/",
  '/loginsignup',
  '/products',
  '/products',
  '/products',
  '/ecom-cart',
  '/shippingAddresses',
  '/ecom-paymode',
  '/ecom-orderConfirm',
  '/ecom-myOrders',
  '/ecom-orderDetails',
  '/my-profile',
  '/ecom-wishlist',
  '/aboutus',
  '/contactus',
  '/ecom-orderDetails',
  '/policies',
  '/policyContent',
  '/faqs',
  '/ecom-currency-selector'
]
let services = [
  "/customer-login",
  "/account-setting",
  "/faculty",
  "/customer-login-with-otpv1/",
  "/customer-signup-otp-verify",
  "/aboutus",
  "/contactus",
  "/miscellaneous",
  "/categories",
  "/service-detail/",
  "/profile-detail/",
  "/facilities",
  "/announcements",
  "/vacancy",
  "/gallery",
  "/testimonials",
  "/gallery-list",
  "/service",
  "/empanelment",
  "/category-services/",
  "/center-of-excellence",
  "/select-appointment-service",
  "/book-appointment/",
  "/my-booking",
  "/collections",
  "/appointment-ThankYou",
  "/booking-status",
  "/Payment-method",
  "/"]
let portfolio = [
  "/overview",
  "/faculty",
  "/announcements",
  "/admission",
  "/feestructure",
  "/facility",
  "/gallery",
  "/gallery-list",
  "/contactus",
  "/vacancy",
  "/aboutus",
  "/services",
  "/faqs",
  "/miscellaneous",
  "/privacypolicy",
  "/profile-landing",
  "/auth/login",
  "/service_List",
  "/auth/logout",
  "/"
]
let lms = [
  "/overview",
  "/faculty",
  "/announcements",
  "/admission",
  "/feestructure",
  "/facility",
  "/gallery",
  "/gallery-list",
  "/contactus",
  "/vacancy",
  "/aboutus",
  "/services",
  "/faqs",
  "/miscellaneous",
  "/privacypolicy",
  "/profile-landing",
  "/auth/login",
  "/service_List",
  "/auth/logout",
  "/"
]
app.get('/sitemap.xml', async (req, res) => {
  let hostName = req.headers.host

  let seoData = ""

  let subdomain = ""
  if (hostName.includes(":5000") && !hostName.includes("my_app")) {
    subdomain = hostName.replace(":5000", "")
  } else {
    subdomain = req.headers.host
  }
  let productsData = await axios.get(`https://middleware.edneed.com/authorization-middleware/getDynamicSeo/?domain=${subdomain}`);
  seoData = productsData.data.data
  let xml = ""
  switch (seoData.business_category) {
    case "Ecommerce":
      if (seoData.template_type === "static") {
        xml = `<?xml version="1.0" encoding="UTF-8"?>`
        xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`
        for (let i = 0; i < ecom.length; i++) {
          xml += `
        <url>
          <loc>https://${hostName}${ecom[i]}</loc>
          <lastmod>2023-03-06</lastmod>
          <changefreq>monthly</changefreq>
        </url>
        `

        }
        xml += `</urlset>`
      } else {
        xml = `<?xml version="1.0" encoding="UTF-8"?>`
        xml += `<urlset >`
        for (let i = 0; i < dEcom.length; i++) {
          xml += `
        <url>
          <loc>https://${hostName}${dEcom[i]}</loc>
          <lastmod>2023-03-06</lastmod>
          <changefreq>monthly</changefreq>
        </url>
        `
        }
        xml += `</urlset >`
      }

      break;
    case "Services":
      xml = `<?xml version="1.0" encoding="UTF-8"?>`
      xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`
      for (let i = 0; i < services.length; i++) {
        xml += `
      <url>
        <loc>https://${hostName}${services[i]}</loc>
        <lastmod>2023-03-06</lastmod>
        <changefreq>monthly</changefreq>
      </url>
      `
      }
      xml += `</urlset >`
      break;
    case "Landing":
      xml = `<?xml version="1.0" encoding="UTF-8"?>`
      xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`
      for (let i = 0; i < portfolio.length; i++) {
        xml += `
      <url>
        <loc>https://${hostName}${portfolio[i]}</loc>
        <lastmod>2023-03-06</lastmod>
        <changefreq>monthly</changefreq>
      </url>
      `
      }
      xml += `</urlset >`
      break;
    case "LMS":
      xml = `<?xml version="1.0" encoding="UTF-8"?>`
      xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`
      for (let i = 0; i < lms.length; i++) {
        xml += `
      <url>
        <loc>https://${hostName}${lms[i]}</loc>
        <lastmod>2023-03-06</lastmod>
        <changefreq>monthly</changefreq>
      </url>
      `
      }
      xml += `</urlset >`
      break;

    default:
      xml = `<?xml version="1.0" encoding="UTF-8"?>`
      xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`
      for (let i = 0; i < lms.length; i++) {
        xml += `
      <url>
        <loc>https://${hostName}${lms[i]}</loc>
        <lastmod>2023-03-06</lastmod>
        <changefreq>monthly</changefreq>
      </url>
      `
      }
      xml += `</urlset >`
      break;
  }


  res.header('Content-Type', 'application/xml')
  res.status(200).send(xml)
})
// app.get('/robots.txt', async (req, res) => {
//   let hostName = req.headers.host
//   let data="# https://www.robotstxt.org/robotstxt.html\n"+
//   "User-agent: *\n"+
//   "Disallow:\n"+
//   "/auth/\n"+
//   "/createProduct\n"+
//   "/website-template-preview/\n"+
//   "/landing-template-preview/\n"+
//   "/service-template-preview/\n"+
//   "/ecommerce-template-preview/\n"+
//   "/business-name\n"+
//   "/bookingservices\n"+
//   "/ecommerce\n"+
//   "/dashboard/\n"+
//   "/dashboard\n"+
//   "/basicdetailV1\n"+
//   "/institutedetailsV1\n"+
//   "/getwebsiteV1\n"+
//   "/websiteoverviewV1\n"+
//   "/account-setting\n"+
//   "/manage-institute\n"+
//   "/manage-basic-info\n"+
//   "/institute-info-manage\n"+
//   "/skin-theme\n"+
//   "/create-skin\n"+
//   "/admin-create-class\n"+
//   "/invite-students\n"+
//   "/invite-students-status\n"+
//   "/invite-students-history\n"+
//   "/invite-faculty-history\n"+
//   "/fee-management\n"+
//   "/visitor-management-list\n"+
//   "/add-visitors\n"+
//   "/edit-visitor/\n"+
//   "/view-visitor-detail/\n"+
//   "/print-visitor-detail/\n"+
//   "/fee-management\n"+
//   "/visitor-management\n"+
//   "/My_Booking\n"+
//   "/My_Profile\n"+
//   "/invite-faculty-list\n"+
//   "/add-faculty\n"+
//   "/invite-faculty\n"+
//   "/edit-faculty/\n"+
//   "/edit-teacher/\n"+
//   "/invite-faculty-status\n"+
//   "/admin-attendance-classroomSubjectlist\n"+
//   "/admin-attendance-list/\n"+
//   "/contact-list\n"+
//   "/settings\n"+
//   "/WebsiteSetting\n"+
//   "/BusinessSetting\n"+
//   "/mail-setting\n"+
//   "/teacher-dashboard-route\n"+
//   "/school-admin-course\n"+
//   "/email-reset-password\n"+
//   "/dashboard/teacher-online-class/meetcallback\n"+
//   "sitemap: https://webneed.io/sitemap.xml"

//   const filePath = path.resolve(__dirname, "/var/www/html", "robots.txt");
//   console.log(filePath,"path1")
     
//   fs.open(filePath, "w", (err, fd)=>{
//       if(err){
//           console.log(err.message);
//       }else{
//           fs.write(fd, data, (err, bytes)=>{
//               if(err){
//                   console.log(err.message);
//               }else{
//                   console.log(bytes +' bytes written');
//               }
//           })        
//       }
//   })
//   res.send(data)
// })
app.get("/", async (req, res) => {
  let hostName = req.headers.host
  let seoData = ""
  let DomainName = req.headers.host
  DomainName=`https://${DomainName}`
  let subdomain = ""
  if (hostName.includes(":5000") && !hostName.includes("my_app")) {
    subdomain = hostName.replace(":5000", "")
  } else {
    subdomain = req.headers.host
  }
  let businessData = await axios.get(`https://middleware.edneed.com/authorization-middleware/getDynamicSeo/?domain=${subdomain}`);
  seoData = businessData.data.data
  //const filePath = path.resolve(__dirname, "/var/www/html/", "index.html");
  const filePath = path.resolve(__dirname, "/var/www/html", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return;
    }
    let changejson={
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
      {
        "@type": "ListItem",
        "position": 4,
        "name": "About",
        "item": `${DomainName}/about`
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "FAQ",
        "item": `${DomainName}/faqs`
      },
      {
          "@type": "ListItem",
          "position": 3,
          "name": "Contact",
          "item": `${DomainName}/contact`
        }
      ]
    }
    let changejson2=`{
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
      {
        "@type": "ListItem",
        "position": 4,
        "name": "About",
        "item": ${DomainName}/about
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "FAQ",
        "item":${DomainName}/faqs
      },
      {
          "@type": "ListItem",
          "position": 3,
          "name": "Contact",
          "item": ${DomainName}/contact
        }
      ]
    }`
    data = data
      .replace(/__TITLE__/g, seoData.meta_title ? seoData.meta_title : seoData.institute_name)
      .replace(/__DESCRIPTION__/g, seoData.meta_description ? seoData.meta_description : "")
      .replace(/__KEYWORDS__/g, seoData.meta_keywords ? seoData.meta_keywords : seoData && seoData.institute_name && seoData.institute_name)
      .replace(/__FAVICON__/g, seoData.favIcon ? seoData.favIcon : seoData && seoData.institute_logo ? seoData.institute_logo : "")
      .replace(/__OG_TITLE__/g, seoData.og_title ? seoData.og_title : seoData && seoData.institute_name)
      .replace(/__OG_DESCRIPTION__/g, seoData.og_description ? seoData.og_description : "")
      .replace(/__OG_IMAGE_ALT__/g, seoData.og_title ? seoData.og_title : "")
      .replace(/__OG_IMAGE__/g, seoData.og_tag ? seoData.og_tag : seoData && seoData.banners ? seoData.banners : "")
      .replace(/__AUTHOR__/g, seoData.institute_name)
      .replace(/__APPLICATION_NAME__/g, seoData.institute_name)
      .replace(/__GTAG__/g, seoData.gtag)
      .replace(/__CANOC__/g,DomainName)
      .replace(/__PIKACHU__/g,changejson)
      .replace(/__PIKACHU2__/g,changejson2)
    res.send(data)
  });
});

app.get("/products/:id", async (req, res) => {
  let hostName = req.headers.host
  let seoData = ""
  let DomainName = req.headers.host
  DomainName=`https://${DomainName}`
  let subdomain = ""
  if (hostName.includes(":5000") && !hostName.includes("my_app")) {
    subdomain = hostName.replace(":5000", "")
  } else {
    subdomain = req.headers.host
  }
  let productsData = await axios.get(`https://middleware.edneed.com/authorization-middleware/getDynamicProductSlugSeo/?domain=${subdomain}&slug=${req.params.id}`);
  seoData = productsData.data.data

  //const filePath = path.resolve(__dirname, "/var/www/html/", "index.html");
  const filePath = path.resolve(__dirname, "/var/www/html", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return;
    }
    let changejson={
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
      {
        "@type": "ListItem",
        "position": 4,
        "name": "About",
        "item": `${DomainName}/about`
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "FAQ",
        "item": `${DomainName}/faqs`
      },
      {
          "@type": "ListItem",
          "position": 3,
          "name": "Contact",
          "item": `${DomainName}/contact`
        }
      ]
    }
    let changejson2=`{
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
      {
        "@type": "ListItem",
        "position": 4,
        "name": "About",
        "item": ${DomainName}/about
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "FAQ",
        "item":${DomainName}/faqs
      },
      {
          "@type": "ListItem",
          "position": 3,
          "name": "Contact",
          "item": ${DomainName}/contact
        }
      ]
    }`
    data = data
      .replace(/__TITLE__/g, seoData.meta_title ? seoData.meta_title : seoData.institute_name)
      .replace(/__DESCRIPTION__/g, seoData.meta_description ? seoData.meta_description : "")
      .replace(/__KEYWORDS__/g, seoData.meta_keywords ? seoData.meta_keywords : seoData && seoData.institute_name && seoData.institute_name)
      .replace(/__FAVICON__/g, seoData.favIcon ? seoData.favIcon : seoData && seoData.institute_logo ? seoData.institute_logo : "")
      .replace(/__OG_TITLE__/g, seoData.meta_title ? seoData.meta_title : seoData.institute_name)
      .replace(/__OG_DESCRIPTION__/g, seoData.meta_description ? seoData.meta_description : "")
      .replace(/__OG_IMAGE_ALT__/g, seoData.meta_title ? seoData.meta_title : seoData.institute_name)
      .replace(/__OG_IMAGE__/g, seoData && seoData.banners ? seoData.banners : "")
      .replace(/__AUTHOR__/g, seoData.institute_name)
      .replace(/__APPLICATION_NAME__/g, seoData.institute_name)
      .replace(/__GTAG__/g, seoData.gtag)
      .replace(/__CANOC__/g,DomainName)
      .replace(/__PIKACHU__/g,changejson)
      .replace(/__PIKACHU2__/g,changejson2)


    res.send(data)
  });



})
app.get("/blog/:id", async (req, res) => {
  let hostName = req.headers.host
  let seoData = ""
  let DomainName = req.headers.host
  DomainName=`https://${DomainName}`
  let subdomain = ""
  if (hostName.includes(":5000") && !hostName.includes("my_app")) {
    subdomain = hostName.replace(":5000", "")
  } else {
    subdomain = req.headers.host
  }
  let productsData = await axios.get(`https://middleware.edneed.com/authorization-middleware/getDynamicBlogSlugSeo/?domain=${subdomain}&slug=${req.params.id}`);
  seoData = productsData.data.data

  //const filePath = path.resolve(__dirname, "/var/www/html/", "index.html");
  const filePath = path.resolve(__dirname, "/var/www/html", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return;
    }
    let changejson={
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
      {
        "@type": "ListItem",
        "position": 4,
        "name": "About",
        "item": `${DomainName}/about`
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "FAQ",
        "item": `${DomainName}/faqs`
      },
      {
          "@type": "ListItem",
          "position": 3,
          "name": "Contact",
          "item": `${DomainName}/contact`
        }
      ]
    }
    let changejson2=`{
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
      {
        "@type": "ListItem",
        "position": 4,
        "name": "About",
        "item": ${DomainName}/about
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "FAQ",
        "item":${DomainName}/faqs
      },
      {
          "@type": "ListItem",
          "position": 3,
          "name": "Contact",
          "item": ${DomainName}/contact
        }
      ]
    }`
    data = data
      .replace(/__TITLE__/g, seoData.meta_title ? seoData.meta_title : seoData.institute_name)
      .replace(/__DESCRIPTION__/g, seoData.meta_description ? seoData.meta_description : "")
      .replace(/__KEYWORDS__/g, seoData.meta_keywords ? seoData.meta_keywords : seoData && seoData.institute_name && seoData.institute_name)
      .replace(/__FAVICON__/g, seoData.favIcon ? seoData.favIcon : seoData && seoData.institute_logo ? seoData.institute_logo : "")
      .replace(/__OG_TITLE__/g, seoData.meta_title ? seoData.meta_title : seoData.institute_name)
      .replace(/__OG_DESCRIPTION__/g, seoData.meta_description ? seoData.meta_description : "")
      .replace(/__OG_IMAGE_ALT__/g, seoData.meta_title ? seoData.meta_title : seoData.institute_name)
      .replace(/__OG_IMAGE__/g, seoData && seoData.banners ? seoData.banners : "")
      .replace(/__AUTHOR__/g, seoData.institute_name)
      .replace(/__APPLICATION_NAME__/g, seoData.institute_name)
      .replace(/__GTAG__/g, seoData.gtag)
     
      .replace(/__CANOC__/g,DomainName)
      .replace(/__PIKACHU__/g,changejson)
      .replace(/__PIKACHU2__/g,changejson2)


    res.send(data)
  });



})
//app.use(express.static(path.resolve(__dirname, "/var/www/html/")))
app.use(express.static(path.resolve(__dirname, "/var/www/html")))

app.get("/*", async (req, res) => {
  let hostName = req.headers.host
  let seoData = ""
  let DomainName = req.headers.host
  DomainName=`https://${DomainName}`

  let subdomain = ""
  if (hostName.includes(":5000") && !hostName.includes("my_app")) {
    subdomain = hostName.replace(":5000", "")
  } else {
    subdomain = req.headers.host
  }
  let businessData = await axios.get(`https://middleware.edneed.com/authorization-middleware/getDynamicSeo/?domain=${subdomain}`);
  seoData = businessData.data.data

  //const filePath = path.resolve(__dirname, "/var/www/html/", "index.html");
  const filePath = path.resolve(__dirname, "/var/www/html", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return;
    }
    let changejson={
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
      {
        "@type": "ListItem",
        "position": 4,
        "name": "About",
        "item": `${DomainName}/about`
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "FAQ",
        "item": `${DomainName}/faqs`
      },
      {
          "@type": "ListItem",
          "position": 3,
          "name": "Contact",
          "item": `${DomainName}/contact`
        }
      ]
    }
    let changejson2=`{
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
      {
        "@type": "ListItem",
        "position": 4,
        "name": "About",
        "item": ${DomainName}/about
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "FAQ",
        "item":${DomainName}/faqs
      },
      {
          "@type": "ListItem",
          "position": 3,
          "name": "Contact",
          "item": ${DomainName}/contact
        }
      ]
    }`
    data = data
      .replace(/__TITLE__/g, seoData.meta_title ? seoData.meta_title : seoData.institute_name)
      .replace(/__DESCRIPTION__/g, seoData.meta_description ? seoData.meta_description : "")
      .replace(/__KEYWORDS__/g, seoData.meta_keywords ? seoData.meta_keywords : seoData && seoData.institute_name && seoData.institute_name)
      .replace(/__FAVICON__/g, seoData.favIcon ? seoData.favIcon : seoData && seoData.institute_logo ? seoData.institute_logo : "")
      .replace(/__OG_TITLE__/g, seoData.og_title ? seoData.og_title : seoData && seoData.institute_name)
      .replace(/__OG_DESCRIPTION__/g, seoData.og_description ? seoData.og_description : "")
      .replace(/__OG_IMAGE_ALT__/g, seoData.og_title ? seoData.og_title : "")
      .replace(/__OG_IMAGE__/g, seoData.og_tag ? seoData.og_tag : seoData && seoData.banners ? seoData.banners : "")
      .replace(/__AUTHOR__/g, seoData.institute_name)
      .replace(/__APPLICATION_NAME__/g, seoData.institute_name)
      .replace(/__GTAG__/g, seoData.gtag)
     
      .replace(/__CANOC__/g,DomainName)
      .replace(/__PIKACHU__/g,changejson)
      .replace(/__PIKACHU2__/g,changejson2)
    res.send(data)
  });
});

app.listen(PORT, () => {
  //console.log(`Server is listening on port ${PORT}`)
})