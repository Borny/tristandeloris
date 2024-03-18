// import { urlBase64ToUint8Array } from './js/utility';
// import { Header } from './js/header';

// let deferredPrompt;
// const installBtn = document.getElementById('install-app');
// const askNotificationBtn = document.getElementById('enable-notification');
// const URL_SUBSCRIPTIONS = 'http://localhost:9000/api/subscription';

// // HEADER
// const header = new Header();
// header.initHeader();

console.log('main js');

// SERVICE WORKER
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register(new URL('./sw.js', import.meta.url), { type: 'module' })
    .then(() => {
      console.log('[Index JS] : Service worker registered!');
    });
}

// DEFERRING THE INSTALLATION
// window.addEventListener('beforeinstallprompt', (event) => {
//   console.log('beforeinstallprompt fired');
//   event.preventDefault();
//   deferredPrompt = event;
//   return false;
// });

// INSTALL THE APP
// installBtn.addEventListener('click', () => {
//     console.log('install the app')
//     if (deferredPrompt) {
//         deferredPrompt.prompt()

//         deferredPrompt.userChoice.then((choiceResult) => {
//             console.log(choiceResult.outcome)

//             if (choiceResult.outcome === 'dismissed') {
//                 console.log('User canceled installation')
//             } else {
//                 console.log('User added to home screen')
//             }
//         })

//         deferredPrompt = null
//     }
// })

// NOTIFICATIONS
// function displayNotificationEnabled() {
//   if ('serviceWorker' in navigator) {
//     const options = {
//       body: 'You successfully subscribed to our Notification Service',
//       icon: '/android-icon-192x192.95830eb1.png',
//       image: '/kalalau-beach.2009ff86.jpg',
//       dir: 'ltr',
//       lang: 'en-US',
//       vibrate: [100, 50, 200], // vibration / pause / vibration / pause / .....
//       badge: '/android-icon-192x192.95830eb1.png',
//       tag: 'confirm-notification', // if set will stack the notifications, they won't show
//       renotify: true,
//       data: {
//         dateOfArrival: Date.now(),
//         primaryKey: 1,
//       },
//       actions: [
//         {
//           action: 'confirm',
//           title: 'Okay',
//           icon: '/android-icon-192x192.95830eb1.png',
//         },
//         {
//           action: 'cancel',
//           title: 'Cancel',
//           icon: '/android-icon-192x192.95830eb1.png',
//         },
//       ],
//     };
//     navigator.serviceWorker.ready.then((swreg) => {
//       swreg.showNotification('Successfully subscribed!', options);
//     });
//   }
// }

// function configurePushSubcription() {
//   if (!('serviceWorker' in navigator)) {
//     console.log('no sw');
//     return;
//   }

//   let registration;
//   navigator.serviceWorker.ready
//     .then((swreg) => {
//       registration = swreg;
//       return swreg.pushManager.getSubscription();
//     })
//     .then((sub) => {
//       // console.log('sub', sub)
//       if (sub === null) {
//         // set new subscription
//         const vapidPublicKey =
//           'BKQAn_jLHEFQxqLXFttR5diwKyYhZqJ_PjhQhEMlD13jVipfj-pUdnw3rSGioSaDLt4RyP23ShJ6NwoUZy_Ovl0';
//         const convertedVapidPublicKey = urlBase64ToUint8Array(vapidPublicKey);

//         // console.log('vapid key')
//         return registration.pushManager.subscribe({
//           userVisibleOnly: true,
//           applicationServerKey: convertedVapidPublicKey,
//         });
//       } else {
//         // console.log('else')
//         // get subscription
//       }
//     })
//     .then((newSub) => {
//       console.log(newSub);
//       return fetch(URL_SUBSCRIPTIONS, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Accept: 'application/json',
//         },
//         body: JSON.stringify(newSub),
//       });
//     })
//     .then((response) => {
//       if (response.ok) {
//         displayNotificationEnabled();
//       }
//     });
// }

// function askNotificationPermission() {
//   console.log('ask notif permission');
//   Notification.requestPermission((response) => {
//     if (response === 'granted') {
//       console.log(response);
//       configurePushSubcription();
//     }
//   });
// }

// if ('Notification' in window) {
//     console.log('notif')
//     askNotificationBtn.classList.add('show')
//     askNotificationBtn.addEventListener('click', askNotificationPermission)
// }
