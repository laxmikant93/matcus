const swDev = () => {

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

  if ('serviceWorker' in navigator) {
    console.log("Service worker supported by Browser");
    window.addEventListener('load', function () {
      // navigator.serviceWorker.register('/service-worker.js');
      // const origin = window.location.origin;
      // console.log('CHECKING ORIGIN', origin);
      navigator.serviceWorker.register(swUrl).then((response) => {
        // navigator.serviceWorker.register(swUrl).then((response) => {
        console.log('Registration successful, scope is:', response.scope);
        console.warn("service registeration response", response);
        return response.pushManager.getSubscription()
          .then(function (subscription) {
            return response.pushManager.subscribe({
              userVisibleOnly: true, applicationServerKey: determineAppServerKey()
            })
          })
      });
      // console.log("Service worker ready to load");
    });
  }
  // var standalone = window.navigator.standalone,
  //   userAgent = window.navigator.userAgent.toLowerCase(),
  //   safari = /safari/.test( userAgent ),
  //   ios = /iphone|ipod|ipad/.test( userAgent );

    // console.log("hiiiiiii",standalone,"standalone",userAgent,"userAgent",safari,"safari",ios,"ios")

    var isWebView = false;
    var userAgent = navigator.userAgent;
  
    if (/Android/.test(userAgent)) {
      // Check the Android version to determine how to differentiate WebView from Chrome
      var androidVersion = parseFloat(userAgent.slice(userAgent.indexOf("Android")+8));
      if (androidVersion >= 10) {
        // For Android 10 and above, check for the "wv" field in the user-agent string
        isWebView = /(wv)/.test(userAgent);
      } else {
        // For versions of Android below 10, check for the "Version/_X.X_" string in the user-agent string
        isWebView = userAgent.includes("Version/");
      }
    }
    console.log(isWebView,"issWebvieww")

  // navigator.serviceWorker.register(swUrl).then((response) => {
  //   // navigator.serviceWorker.register(swUrl).then((response) => {
  //   console.warn("service registeration response", response)
  //   return response.pushManager.getSubscription()
  //     .then(function (subscription) {
  //       return response.pushManager.subscribe({
  //         userVisibleOnly: true, applicationServerKey: determineAppServerKey()
  //       })
  //     })
  // });



}
export default swDev