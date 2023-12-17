export const RemoveHTMLTags = (str) => {
  if ((str === null) || (str === '') || (!str))
    return false;
  else
    str = str.toString();
  return str.replace(/(<([^>]+)>)/ig, '');

}

export const isWebView=()=>{
  var isWebView = false;
  var userAgent = navigator.userAgent;
  var standalone = navigator.standalone,
  safari = /safari/.test(userAgent),
  ios = /iphone|ipod|ipad/.test(userAgent.toLowerCase());
  if(ios){
    if (!standalone && !safari) {
      isWebView=true
    };
  }else{
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
  }
 
  return isWebView
}

var standalone = window.navigator.standalone,
  userAgent = navigator.userAgent.toLowerCase(),
  safari = /safari/.test(userAgent),
  ios = /iphone|ipod|ipad/.test(userAgent);
export const data= {
   isWebViews:false,
   userAgent : navigator?.userAgent,
   androidVersion:parseFloat(navigator?.userAgent.slice(navigator?.userAgent?.indexOf("Android")+8)),
   isWebView : /(wv)/.test(navigator?.userAgent),
   isWebViewn:navigator?.userAgent.includes("Version/"),
   standalone:navigator?.standalone,
   safari:safari,
   ios:ios
}