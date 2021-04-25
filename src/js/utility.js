import { openDB } from 'idb'

// INDEXED DB
const dbPromise = openDB('posts-store', 1, {
    upgrade(db) {
        if (!db.objectStoreNames.contains('posts')) {
            console.log('[Utility JS] : creating the database')
            db.createObjectStore('posts')
        }
        if (!db.objectStoreNames.contains('sync-posts')) {
            // console.log('[Utility JS] : creating the database')
            db.createObjectStore('sync-posts')
        }
    },
})

export async function writeData(st, data) {
    console.log('write data', data)
    return dbPromise.then((db) => {
        const tx = db.transaction(st, 'readwrite')
        const store = tx.objectStore(st)
        store.put(data)
        return tx.complete
    })
};

export async function readAllData(st) {
    return dbPromise
        .then(function (db) {
            var tx = db.transaction(st, 'readonly')
            var store = tx.objectStore(st)
            return store.getAll()
        })
}

export async function setStore(key, val, store) {
    console.log('setting store')
    return (await dbPromise).put(store, val, key)
}

export async function getItem(key, store) {
    // console.log('getting store')
    return (await dbPromise).get(store, key)
}

export async function getAllKeys(store) {
    return (await dbPromise).getAllKeys(store)
}

export async function deleteItem(store, key) {
    console.log('delete store')
    return (await dbPromise).delete(store, key)
}

export async function clearStore(store) {
    // console.log('clearing store')
    return (await dbPromise).clear(store)
}

// CONVERT 64 STRING TO ARRAY
export function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4)
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/')

    var rawData = window.atob(base64)
    var outputArray = new Uint8Array(rawData.length)

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
}

// CONVERT BASE64 URL TO BLOB 
export function dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1])
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    var ab = new ArrayBuffer(byteString.length)
    var ia = new Uint8Array(ab)
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
    }
    var blob = new Blob([ab], { type: mimeString })
    return blob
}