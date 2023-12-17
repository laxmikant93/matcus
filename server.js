const express = require("express");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const xml = require('xml');
const PORT = 5003;
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
  let productsData = await axios.get(`https://middleware.getmelight.com/authorization-middleware/getDynamicSeo/?domain=${subdomain}`);
  seoData = productsData.data.data
  let xml = ""
  switch (seoData.business_category) {
    case "Ecommerce":
      if (seoData.template_type === "static") {
        xml = `<?xml version="1.0" encoding="UTF-8"?>`
        xml += `<urlset >`
        for (let i = 0; i < ecom.length; i++) {
          xml += `
        <url>
          <loc>${hostName}${ecom[i]}</loc>
          <lastmod>2023-03-06</lastmod>
          <changefreq>monthly</changefreq>
        </url>
        `

        }
        xml += `</urlset >`
      } else {
        xml = `<?xml version="1.0" encoding="UTF-8"?>`
        xml += `<urlset >`
        for (let i = 0; i < dEcom.length; i++) {
          xml += `
        <url>
          <loc>${hostName}${dEcom[i]}</loc>
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
      xml += `<urlset >`
      for (let i = 0; i < services.length; i++) {
        xml += `
      <url>
        <loc>${hostName}${services[i]}</loc>
        <lastmod>2023-03-06</lastmod>
        <changefreq>monthly</changefreq>
      </url>
      `
      }
      xml += `</urlset >`
      break;
    case "Landing":
      xml = `<?xml version="1.0" encoding="UTF-8"?>`
      xml += `<urlset >`
      for (let i = 0; i < portfolio.length; i++) {
        xml += `
      <url>
        <loc>${hostName}${portfolio[i]}</loc>
        <lastmod>2023-03-06</lastmod>
        <changefreq>monthly</changefreq>
      </url>
      `
      }
      xml += `</urlset >`
      break;
    case "LMS":
      xml = `<?xml version="1.0" encoding="UTF-8"?>`
      xml += `<urlset >`
      for (let i = 0; i < lms.length; i++) {
        xml += `
      <url>
        <loc>${hostName}${lms[i]}</loc>
        <lastmod>2023-03-06</lastmod>
        <changefreq>monthly</changefreq>
      </url>
      `
      }
      xml += `</urlset >`
      break;

    default:
      break;
  }


  res.header('Content-Type', 'application/xml')
  res.status(200).send(xml)
})
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
  let businessData = await axios.get(`https://middleware.getmelight.com/authorization-middleware/getDynamicSeo/?domain=${subdomain}`);
  seoData = businessData.data.data
  //const filePath = path.resolve(__dirname, "/var/www/html/", "index.html");
  const filePath = path.resolve(__dirname, "/var/www/shopunide/shopunide", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return;
    }
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
      .replace(/__LOAD_DATA__/g, `{height:${seoData.loader.height},width:${seoData.loader.width},colorspalette1: ${seoData.loader.colorspalette1},colorspalette2: ${seoData.loader.colorspalette2},animation_speed: ${seoData.loader.animation_speed},component:${seoData.loader.component}},`)
      .replace(/__CANOC__/g,DomainName)
      .replace(/__PIKACHU__/g,{
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
      })
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
  let productsData = await axios.get(`https://middleware.getmelight.com/authorization-middleware/getDynamicProductSlugSeo/?domain=${subdomain}&slug=${req.params.id}`);
  seoData = productsData.data.data

  //const filePath = path.resolve(__dirname, "/var/www/html/", "index.html");
  const filePath = path.resolve(__dirname, "/var/www/shopunide/shopunide", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return;
    }

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
      .replace(/__LOAD_DATA__/g, `{height:${seoData.loader.height},width:${seoData.loader.width},colorspalette1: ${seoData.loader.colorspalette1},colorspalette2: ${seoData.loader.colorspalette2},animation_speed: ${seoData.loader.animation_speed},component:${seoData.loader.component}},`)
      .replace(/__CANOC__/g,DomainName)
      .replace(/__PIKACHU__/g,{
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
      })


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
  let productsData = await axios.get(`https://middleware.getmelight.com/authorization-middleware/getDynamicBlogSlugSeo/?domain=${subdomain}&slug=${req.params.id}`);
  seoData = productsData.data.data

  //const filePath = path.resolve(__dirname, "/var/www/html/", "index.html");
  const filePath = path.resolve(__dirname, "/var/www/shopunide/shopunide", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return;
    }

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
      .replace(/__LOAD_DATA__/g, `{height:${seoData.loader.height},width:${seoData.loader.width},colorspalette1: ${seoData.loader.colorspalette1},colorspalette2: ${seoData.loader.colorspalette2},animation_speed: ${seoData.loader.animation_speed},component:${seoData.loader.component}},`)
      .replace(/__CANOC__/g,DomainName)
      .replace(/__PIKACHU__/g,{
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
      })


    res.send(data)
  });



})
//app.use(express.static(path.resolve(__dirname, "/var/www/html/")))
app.use(express.static(path.resolve(__dirname, "/var/www/shopunide/shopunide")))

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
  let businessData = await axios.get(`https://middleware.getmelight.com/authorization-middleware/getDynamicSeo/?domain=${subdomain}`);
  seoData = businessData.data.data

  //const filePath = path.resolve(__dirname, "/var/www/html/", "index.html");
  const filePath = path.resolve(__dirname, "/var/www/shopunide/shopunide", "index.html");
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
      .replace(/__LOAD_DATA__/g, `{height:${seoData.loader.height},width:${seoData.loader.width},colorspalette1: ${seoData.loader.colorspalette1},colorspalette2: ${seoData.loader.colorspalette2},animation_speed: ${seoData.loader.animation_speed},component:${seoData.loader.component}},`)
      .replace(/__CANOC__/g,DomainName)
      .replace(/__PIKACHU__/g,changejson)
      .replace(/__PIKACHU2__/g,changejson2)
    res.send(data)
  });
});

app.listen(PORT, () => {
  //console.log(`Server is listening on port ${PORT}`)
})