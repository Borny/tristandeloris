import { setStore, clearStore, getAllKeys, getItem, deleteItem, readAllData } from './js/utility'

const STATIC_CACHE = `static-013`
const DYNAMIC_CACHE = `dynamic-006`
const STORE_POSTS = 'posts'
const SYNC_POSTS = 'sync-posts'
const SYNC_REGISTER_NEW_POSTS = 'sync-new-posts'
const STATIC_FILES = [
    '/index.html',
    '/pages/offline.html',
    '/manifest.webmanifest',
    '/main.1f19ae8e.js',
    '/home.5fd3cac8.js',
    '/main.48b3db1d.css',
    '/home.5fd3cac8.css',
    '/favicon.26242483.ico',
    '/maunakea.3693c564.jpg',
    '/bx-rooftop.02bed6fe.jpg',
    '/kalalau-beach.2009ff86.jpg',
    '/hourtin-sunset.7c4dd7fb.jpg',
    '/crater-center.cb31532d.jpg',
    '/pamukkale.f0c4f7c3.jpg',
    '/rail-road-down-center.01d9c3c2.jpg',
    '/belaetcome.c74832df.png',
    '/ics.ccad7778.png',
    '/lacleduquai.9d6d72d6.png'
]

// INSTALL
// console.log('[Service Worker]')
self.addEventListener('install', (event) => {
    // console.log('[Service Worker] Installing service worker ...', event)
    event.waitUntil(
        caches.open(STATIC_CACHE).then((cache) => {
            // console.log('[Service Worker] Precaching app shell (index.html,css.js...) ...', event)
            cache.addAll(STATIC_FILES)
        })
    )
})

// ACTIVATE
self.addEventListener('activate', (event) => {
    // console.log('[Service Worker] Activating service worker ...', event)
    event.waitUntil(
        caches.keys().then((keyList) => {
            // console.log('[Service Worker] keyList :', keyList)
            return Promise.all(
                keyList.map((key) => {
                    if (key !== STATIC_CACHE && key !== DYNAMIC_CACHE) {
                        console.log('removed cache : ', key)
                        caches.delete(key)
                    }
                })
            )
        })
    )
    return self.clients.claim()
})

// FETCH
self.addEventListener('fetch', (event) => {
    const URL = 'http://localhost:9000/api/feed'

    if (event.request.url.indexOf(URL) > -1) { // storing json data using indexedDB
        console.log('[Service Worker] : IndexedDB')
        event.respondWith(
            fetch(event.request)
                .then(res => {
                    // console.log('[Service Worker] : IndexedDB =>', res.json())
                    const clonedRes = res.clone()
                    clearStore(STORE_POSTS)
                        .then(() => {
                            // setStore(response.data[key])
                            // .then(() => console.log('It worked!'))
                            // .catch((err) => console.log('It failed!', err))
                            return clonedRes.json()
                        })
                        .then(response => {
                            console.log('[Service Worker] : response', response)
                            for (let key in response.data) {
                                // console.log('[Service Worker] : key:', response.data[key])
                                // console.log('[Service Worker] : key id:', response.data[key].id)
                                setStore(response.data[key].title, response.data[key], STORE_POSTS)
                            }
                        })
                    return res
                })
        )
    } else if (STATIC_FILES.some(file => file === event.request.url)) { //
        // console.log('[Service Worker]: Fetching and caching static files ')
        // console.log('[Service Worker] caches.match :', caches.match)
        event.respondWith(
            caches.match(event.request)
        )
    } else {
        event.respondWith(
            caches.match(event.request)
                .then(response => {
                    if (response) {
                        return response
                    } else {
                        return fetch(event.request)
                            .then(res => {
                                return caches.open(DYNAMIC_CACHE)
                                    .then(cache => {
                                        // cache.put(event.request.url, res.clone())
                                        return res
                                    })
                            })
                            .catch(err => {
                                return caches.open(STATIC_CACHE)
                                    .then(cache => {
                                        // console.log(event.request.headers)
                                        if (event.request.headers.get('accept') && event.request.headers.get('accept').includes('text/html')) {
                                            return cache.match('/pages/offline.html')
                                        }
                                    })
                            })
                    }
                })
        )
    }
})

// SYNC
self.addEventListener('sync', function (event) {
    // console.log('[Service Worker] Background syncing', event)
    if (event.tag === 'sync-new-posts') {
        console.log('[Service Worker] Syncing new Posts')
        event.waitUntil(
            readAllData('sync-posts')
                .then(function (data) {
                    for (var dt of data) {
                        // sendDataPictureURL(dt)
                        // postData.append('id', dt.id)
                        // postData.append('location', dt.location)

                        // console.log('dt', dt)
                        const postData = new FormData()
                        postData.append('title', dt.title)
                        postData.append('fileName', `${dt.title.split(' ').join('-')}.png`)
                        postData.append('file', dt.picture)
                        // console.log('postData', postData)

                        sendDataPictureBlob(postData)
                            .then(function (res) {
                                return res.json()
                            })
                            .then(response => {
                                console.log('Sent data', response)
                                deleteItem('sync-posts', dt.title) // Isn't working correctly!
                            })
                            .catch(function (err) {
                                console.log('Error while sending data', err)
                            })
                    }

                })
        )
    }
})

function sendDataPictureURL(data) {
    return fetch(
        "http://localhost:9000/api/feed",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(data),
        }
    )
}

function sendDataPictureBlob(data) {
    // console.log('data', data)
    return fetch(
        "http://localhost:9000/api/feed",
        {
            method: "POST",
            // headers: {
            //     "Content-Type": "multipart/form-data",
            //     "Accept": "application/json"
            // },
            body: data,
        }
    )
}

// NOTIFICATIONS
self.addEventListener('notificationclick', event => {
    const notification = event.notification
    const action = event.action

    // console.log(notification)

    if (action === 'confirm') {
        // console.log('notif confirm ')
        notification.close()
    } else {
        // console.log('notif confirm ')
        event.waitUntil(
            clients.matchAll()
                .then(clnts => {
                    const client = clnts.find(c => {
                        return c.visibilityState === 'visible'
                    })
                    if (client !== undefined) {
                        client.navigate(notification.data.openUrl)
                        client.focus()
                    } else {
                        clients.openWindow(notification.data.openUrl)
                    }

                    notification.close()
                })
        )
    }
})

self.addEventListener('notificationclose', event => {
    console.log('notification was closed', event)
})

// PUSH
self.addEventListener('push', event => {
    let data = { title: 'from sw', content: 'worked but no data sent', openUrl: '/pages/feed.html' }
    if (event.data) {
        data = JSON.parse(event.data.text())
    }

    console.log('data push', data)

    const options = {
        body: data.content,
        icon: 'favicon.26242483.ico',
        badge: 'favicon.26242483.ico',
        image: data.image,
        data: {
            // url: data.openUrl
            url: '/index.html'
        }
    }

    event.waitUntil(
        self.registration.showNotification(data.title, options)
    )
})