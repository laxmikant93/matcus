console.warn('ws file in public folder')
const isSameOrigin = (urlString) => {
  const urlOrigin = (new URL(urlString)).origin;
  return urlOrigin === this.location.origin;
}


let CacheData = "appV1";
//let CacheData = "appV2";
const urlsToCache = [
  '/index.html',
  '/offline.html',
  '/about',
  '/profile-review-list',
  '/faqs',
  '/contact',
  '/Institute/institute-listing',
  '/terms-of-service',
  '/privacy-policy',
  '/cookie-policy',
  '/sitemap.xml',
  '/favicon.ico',
  '/public/app-icon/edneed-app-icon-16x16.png',
  '/public/app-icon/edneed-app-icon-32x32.png',
  '/public/app-icon/edneed-app-icon-36x36.png',
  '/public/app-icon/edneed-app-icon-48x48.png',
  '/public/app-icon/edneed-app-icon-57x57.png',
  '/public/app-icon/edneed-app-icon-60x60.png',
  '/public/app-icon/edneed-app-icon-70x70.png',
  '/public/app-icon/edneed-app-icon-72x72.png',
  '/public/app-icon/edneed-app-icon-76x76.png',
  '/public/app-icon/edneed-app-icon-96x96.png',
  '/public/app-icon/edneed-app-icon-114x114.png',
  '/public/app-icon/edneed-app-icon-120x120.png',
  '/public/app-icon/edneed-app-icon-128x128.png',
  '/public/app-icon/edneed-app-icon-144x144.png',
  '/public/app-icon/edneed-app-icon-144x144.svg',
  '/public/app-icon/edneed-app-icon-150x150.png',
  '/public/app-icon/edneed-app-icon-152x152.png',
  '/public/app-icon/edneed-app-icon-167x167.png',
  '/public/app-icon/edneed-app-icon-180x180.png',
  '/public/app-icon/edneed-app-icon-192x192.png',
  '/public/app-icon/edneed-app-icon-256x256.png',
  '/public/app-icon/edneed-app-icon-310x310.png',
  '/public/app-icon/edneed-app-icon-384x384.png',
  '/public/app-icon/edneed-app-icon-512x512.png',
  '/public/app-icon/edneed-app-icon.ico',
  '/public/app-icon/edneed-screenshots-540x720.png',
  '/static/media/icon-bulkinvite.0a1288c9.svg',
  '/static/media/icon-testbuilder.429a464c.svg',
  '/static/media/icon-assignment.e98084f7.svg',
  '/static/media/icon-onlineclass.807e73a0.svg',
  '/static/media/icon-course-builder.d4fc49c0.svg',
  '/static/media/icon-give-your-answer.f4f352a2.svg',
  '/static/media/icon-share-knowledge.82dc866f.svg',
  '/static/media/icon-ims.60c682c1.svg',
  '/static/media/ed-laptop.f24df2ee.svg',
  '/static/media/ed-mobile.e333ccf1.svg',
  '/static/media/edneed-logo.b83d673d.svg',
  '/static/media/icon-secure-website.e165d77d.svg',
  '/static/media/icon-business-email.48107a51.svg',
  '/static/media/icon-prebuilt-theme.7f36c67a.svg',
  '/static/media/icon-mobile-friendly.b0a8ea59.svg',
  '/static/media/icon-google-ranking.52f69c64.svg',
  '/static/media/icon-twitter.96aa8e7a.svg',
  '/static/media/icon-chat.e29d42d1.svg',
  '/static/media/icon-fb.596a664c.svg',
  '/static/media/icon-linkedin.088c71b2.svg',
  '/static/media/icon-instagram.4a9a4c1e.svg',
  '/static/media/icon-watch-now.2464e645.svg',
  '/static/media/icon-contact-now.dcf35b97.svg',
  '/static/media/icon-call-back.e4ca22a1.svg',
  '/static/media/icon-other-role.ec23b9f7.svg',
  '/static/media/icon-student.4a42fbe1.svg',
  '/static/media/icon-teacher.5142e6a9.svg',
  '/static/media/icon-institute.186b41a6.svg',
  '/static/media/HomeFeature-1.867cc08f.png',
  '/static/media/HomeFeature-2.bafa0a2c.png',
  '/static/media/HomeFeature-3.67a40e50.png',
  '/static/media/HomeFeature-4.89e78cbe.png',
  '/static/media/HomeFeature-5.fcc92662.png',
  '/static/media/learning-community-artwork.dca4a152.png',
  '/public/edneed-app-icon.png',
  '/public/edneed-favicon.ico',
  '/edneed-video',
  '/manifest.json',
  '/static/css/39.d1902946.chunk.css',
  // '/static/css/main.45ca2564.chunk.css',
  '/static/js/39.094d7b3b.chunk.js',
  '/static/js/bundle.js',
  '/static/js/bundle.js.map',
  // '/static/js/main.chunk.js',
  // '/static/js/main.chunk.js.map',
  '/auth/login',
  '/auth/create-account',
  '/static/media/about-us-banner.a96bf05c.png',
  '/static/media/sammy-singh-edneed.65a80974.png',
  '.'
];

// 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css',
// 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css',
// 'https://www.youtube.com/s/player/495d0f2b/player_ias.vflset/en_US/base.js',
// 'https://www.youtube.com/s/player/495d0f2b/player_ias.vflset/en_US/remote.js',
// 'https://www.youtube.com/embed/Y1enSBAhGTo',
// 'https://www.youtube.com/s/player/e06dea74/fetch-polyfill.vflset/fetch-polyfill.js',
// 'https://edneed-images-uat.s3.amazonaws.com/1632876930file_example_MP4_640_3MG.mp4',
// 'https://www.gstatic.com/eureka/clank/97/cast_sender.js',
// 'https://www.googletagmanager.com/gtag/js?id=%REACT_APP_GTAG%',
// 'https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Manrope:wght@200;300;400;500;600;700;800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap',
// 'https://www.youtube.com/embed/Y1enSBAhGTo',
// 'https://www.youtube.com/embed/6Gdq_K3NyZA',
// 'https://www.youtube.com/embed/HhoOIn-8TfE',
// 'https://edneed-images-uat.s3.amazonaws.com/1619433662Web capture_23-2-2021_17236_newtab.jpeg',
// 'https://edneed-images-uat.s3.amazonaws.com/1622278026woo.jpg',
// 'https://edneed-images-uat.s3.amazonaws.com/blob:http://my_app.com:3000/0c49a16c-155a-4448-bafc-bc157e709c23',
// 'https://edneed-images-uat.s3.amazonaws.com/blob:http://my_app.com:3000/c1beb3a5-efe9-4684-ae1d-c61395d18777',
// 'https://edneed-images-uat.s3.amazonaws.com/blob:http://my_app.com:3000/33200481-c4f4-43a2-87fa-4b14cc580e0e',
// 'https://edneed-images-uat.s3.amazonaws.com/blob:https://getmelight.com/1a4cea47-c6fe-4418-a44e-ebf80d76ef72',
// 'https://edneed-images-uat.s3.amazonaws.com/1632876930file_example_MP4_640_3MG.mp4',
// 'https://connect.facebook.net/en_US/fbevents.js',


// if (navigator.storage) {
//   navigator.storage.estimate().then((data) => 
// }


// code to detect how much storage space is available in browser using navigator.storage.estimate().
if ('storage' in navigator && 'estimate' in navigator.storage) {
  navigator.storage.estimate().then(({ usage, quota }) => {
  
    const percentageUsed = (usage / quota) * 100;
   
    const remaining = quota - usage;
 

  });
}






// caching data
this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CacheData).then((cache) => {

      cache.addAll(urlsToCache)
    })
  )
})


// code for fetching cached data
this.addEventListener("fetch", (event) => {



  if (!navigator.onLine) {
   
    //if (event.request.url === "http://localhost:3000/static/js/bundle.js") {
    if (event.request.url === `${this.location.origin}/static/js/bundle.js`) {
      event.waitUntil(
        this.registration.showNotification("Internet", {
          body: "You are Offline!",
        })
      )
    }
    event.respondWith(
      caches.match(event.request)
        .then((response) => {

          if (response) {

            return (response)    // if valid response is found in cache return it
          } else {
            return fetch(event.request)
              .then((res) => {
                return caches.open(CacheData)
                  .then((cache) => {
                    cache.put(event.request.url, res.clone());  //save the response for future
                    return res;   // returned the fetch data
                  })
                  .catch((err) => {    // 14/02/2022 added catch handler if cache.put request fails for res.clone().

                    return caches.open(CacheData)
                      .then((cache) => {
                        return cache.match('/offline.html')
                      })
                  })
              })
              .catch((err) => {

                return caches.open(CacheData)
                  .then((cache) => {
                    return cache.match('/offline.html')
                  })
              })
          }
          // let requestUrl = event.request.clone();
          // fetch(requestUrl)
        })
    )
  }
})

this.addEventListener('activate', (event) => {
  const cacheWhiteList = [];
  cacheWhiteList.push(CacheData);
  event.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames.map((cacheName) => {
        if (!cacheWhiteList.includes(cacheName)) {
          return caches.delete(cacheName);
        }

      })
    ))
  )
});