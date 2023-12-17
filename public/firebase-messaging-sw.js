// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyAOZ1R9KL8tORRHcl4Org_d07onMRKowFk",
  authDomain: "edneed-73e50.firebaseapp.com",
  databaseURL: "https://edneed-73e50.firebaseio.com",
  projectId: "edneed-73e50",
  storageBucket: "edneed-73e50.appspot.com",
  messagingSenderId: "971344965786",
  appId: "1:971344965786:web:567e303930eb2876922f23"
};


// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  // Customize notification here


  let { data } = payload;
  let body = (data.title && data.title.includes("##from##")) ? data.from_fullName : data.title
  body += data.title.replace("##from##", "");

  // Set Complete URL
  const { protocol, port, hostname } = self.location;

  if (data.page) {
    data.url = `${protocol}//${data.page}.${hostname}${port > 0 ? ':' + port + data.url : data.url}`
  }
  else {
    data.url = `${protocol}//${hostname}${port > 0 ? ':' + port + data.url : data.url}`
  }

  const notificationTitle = data.type;
  const notificationOptions = {
    body: body,
    data
  };


  self.registration.showNotification(notificationTitle, notificationOptions);


})

self.addEventListener('notificationclick', function (event) {
  // Android doesn’t close the notification when you click on it
  // See: http://crbug.com/463146

  const { url } = event.notification.data;
  event.notification.close();

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(clients.matchAll({
    type: 'window'
  }).then(function (clientList) {
    for (var i = 0; i < clientList.length; i++) {
      var client = clientList[i];
      if (client.url === url && 'focus' in client) {
        return client.focus();
      }
    }
    if (clients.openWindow) {
      return clients.openWindow(url);
    }
  }));
});