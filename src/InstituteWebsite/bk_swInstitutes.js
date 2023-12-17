export const swInstitutes = () => {

  // function to determine the Server key to send Push Notification
  function determineAppServerKey() {
    var vapidPublicKey = 'BGGQWyaaRlzFozBOSZ1i4N8BIbA85msbOgRC1z_AAgHWg4YzdXxNF_hGc0xd9UzwVRiUmVGlUoRYCKU302afyxw';  // public key generated from https://vapidkeys.com/
    return urlBase64ToUint8Array(vapidPublicKey);
  }

  // function to convert  encoded data into s.tring for Push Notification
  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;

  }
  let swUrl = `${process.env.PUBLIC_URL}/sw.js`


  // if ('serviceWorker' in navigator) {
  // if (navigator.serviceWorker) {

  //   window.addEventListener('load', function () {
  //     //navigator.serviceWorker.register('/service-worker.js');
  //     navigator.serviceWorker.register(swUrl).then((response) => {
  //       return response.pushManager.getSubscription()
  //         .then(function (subscription) {
  //           return response.pushManager.subscribe({
  //             userVisibleOnly: true,
  //             applicationServerKey: determineAppServerKey()
  //           })
  //         })
  //     });
  //   });
  // } else {

  // }

  if ('serviceWorker' in navigator) {

    window.addEventListener('load', function () {
      // navigator.serviceWorker.register('/service-worker.js');
      navigator.serviceWorker.register(swUrl).then((response) => {
        // navigator.serviceWorker.register(swUrl).then((response) => {

        console.warn("service registeration response", response);

        return response.pushManager.getSubscription()
          .then(function (subscription) {
            return response.pushManager.subscribe({
              userVisibleOnly: true, applicationServerKey: determineAppServerKey()
            })
          })
      });

    });
  }

  // navigator.serviceWorker.register(swUrl).then((response) => {
  //   // navigator.serviceWorker.register(swUrl).then((response) => {
  //   return response.pushManager.getSubscription()
  //     .then(function (subscription) {
  //       return response.pushManager.subscribe({
  //         userVisibleOnly: true, applicationServerKey: determineAppServerKey()
  //       })
  //     })
  // });



}
//export default swInstitutes;