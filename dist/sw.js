// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/idb/build/esm/wrap-idb-value.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.r = replaceTraps;
exports.w = wrap;
exports.u = exports.i = exports.a = void 0;

const instanceOfAny = (object, constructors) => constructors.some(c => object instanceof c);

exports.i = instanceOfAny;
let idbProxyableTypes;
let cursorAdvanceMethods; // This is a function to prevent it throwing up in node environments.

function getIdbProxyableTypes() {
  return idbProxyableTypes || (idbProxyableTypes = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
} // This is a function to prevent it throwing up in node environments.


function getCursorAdvanceMethods() {
  return cursorAdvanceMethods || (cursorAdvanceMethods = [IDBCursor.prototype.advance, IDBCursor.prototype.continue, IDBCursor.prototype.continuePrimaryKey]);
}

const cursorRequestMap = new WeakMap();
const transactionDoneMap = new WeakMap();
const transactionStoreNamesMap = new WeakMap();
const transformCache = new WeakMap();
const reverseTransformCache = new WeakMap();
exports.a = reverseTransformCache;

function promisifyRequest(request) {
  const promise = new Promise((resolve, reject) => {
    const unlisten = () => {
      request.removeEventListener('success', success);
      request.removeEventListener('error', error);
    };

    const success = () => {
      resolve(wrap(request.result));
      unlisten();
    };

    const error = () => {
      reject(request.error);
      unlisten();
    };

    request.addEventListener('success', success);
    request.addEventListener('error', error);
  });
  promise.then(value => {
    // Since cursoring reuses the IDBRequest (*sigh*), we cache it for later retrieval
    // (see wrapFunction).
    if (value instanceof IDBCursor) {
      cursorRequestMap.set(value, request);
    } // Catching to avoid "Uncaught Promise exceptions"

  }).catch(() => {}); // This mapping exists in reverseTransformCache but doesn't doesn't exist in transformCache. This
  // is because we create many promises from a single IDBRequest.

  reverseTransformCache.set(promise, request);
  return promise;
}

function cacheDonePromiseForTransaction(tx) {
  // Early bail if we've already created a done promise for this transaction.
  if (transactionDoneMap.has(tx)) return;
  const done = new Promise((resolve, reject) => {
    const unlisten = () => {
      tx.removeEventListener('complete', complete);
      tx.removeEventListener('error', error);
      tx.removeEventListener('abort', error);
    };

    const complete = () => {
      resolve();
      unlisten();
    };

    const error = () => {
      reject(tx.error || new DOMException('AbortError', 'AbortError'));
      unlisten();
    };

    tx.addEventListener('complete', complete);
    tx.addEventListener('error', error);
    tx.addEventListener('abort', error);
  }); // Cache it for later retrieval.

  transactionDoneMap.set(tx, done);
}

let idbProxyTraps = {
  get(target, prop, receiver) {
    if (target instanceof IDBTransaction) {
      // Special handling for transaction.done.
      if (prop === 'done') return transactionDoneMap.get(target); // Polyfill for objectStoreNames because of Edge.

      if (prop === 'objectStoreNames') {
        return target.objectStoreNames || transactionStoreNamesMap.get(target);
      } // Make tx.store return the only store in the transaction, or undefined if there are many.


      if (prop === 'store') {
        return receiver.objectStoreNames[1] ? undefined : receiver.objectStore(receiver.objectStoreNames[0]);
      }
    } // Else transform whatever we get back.


    return wrap(target[prop]);
  },

  set(target, prop, value) {
    target[prop] = value;
    return true;
  },

  has(target, prop) {
    if (target instanceof IDBTransaction && (prop === 'done' || prop === 'store')) {
      return true;
    }

    return prop in target;
  }

};

function replaceTraps(callback) {
  idbProxyTraps = callback(idbProxyTraps);
}

function wrapFunction(func) {
  // Due to expected object equality (which is enforced by the caching in `wrap`), we
  // only create one new func per func.
  // Edge doesn't support objectStoreNames (booo), so we polyfill it here.
  if (func === IDBDatabase.prototype.transaction && !('objectStoreNames' in IDBTransaction.prototype)) {
    return function (storeNames, ...args) {
      const tx = func.call(unwrap(this), storeNames, ...args);
      transactionStoreNamesMap.set(tx, storeNames.sort ? storeNames.sort() : [storeNames]);
      return wrap(tx);
    };
  } // Cursor methods are special, as the behaviour is a little more different to standard IDB. In
  // IDB, you advance the cursor and wait for a new 'success' on the IDBRequest that gave you the
  // cursor. It's kinda like a promise that can resolve with many values. That doesn't make sense
  // with real promises, so each advance methods returns a new promise for the cursor object, or
  // undefined if the end of the cursor has been reached.


  if (getCursorAdvanceMethods().includes(func)) {
    return function (...args) {
      // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
      // the original object.
      func.apply(unwrap(this), args);
      return wrap(cursorRequestMap.get(this));
    };
  }

  return function (...args) {
    // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
    // the original object.
    return wrap(func.apply(unwrap(this), args));
  };
}

function transformCachableValue(value) {
  if (typeof value === 'function') return wrapFunction(value); // This doesn't return, it just creates a 'done' promise for the transaction,
  // which is later returned for transaction.done (see idbObjectHandler).

  if (value instanceof IDBTransaction) cacheDonePromiseForTransaction(value);
  if (instanceOfAny(value, getIdbProxyableTypes())) return new Proxy(value, idbProxyTraps); // Return the same value back if we're not going to transform it.

  return value;
}

function wrap(value) {
  // We sometimes generate multiple promises from a single IDBRequest (eg when cursoring), because
  // IDB is weird and a single IDBRequest can yield many responses, so these can't be cached.
  if (value instanceof IDBRequest) return promisifyRequest(value); // If we've already transformed this value before, reuse the transformed value.
  // This is faster, but it also provides object equality.

  if (transformCache.has(value)) return transformCache.get(value);
  const newValue = transformCachableValue(value); // Not all types are transformed.
  // These may be primitive types, so they can't be WeakMap keys.

  if (newValue !== value) {
    transformCache.set(value, newValue);
    reverseTransformCache.set(newValue, value);
  }

  return newValue;
}

const unwrap = value => reverseTransformCache.get(value);

exports.u = unwrap;
},{}],"../node_modules/idb/build/esm/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteDB = deleteDB;
exports.openDB = openDB;
Object.defineProperty(exports, "unwrap", {
  enumerable: true,
  get: function () {
    return _wrapIdbValue.u;
  }
});
Object.defineProperty(exports, "wrap", {
  enumerable: true,
  get: function () {
    return _wrapIdbValue.w;
  }
});

var _wrapIdbValue = require("./wrap-idb-value.js");

/**
 * Open a database.
 *
 * @param name Name of the database.
 * @param version Schema version.
 * @param callbacks Additional callbacks.
 */
function openDB(name, version, {
  blocked,
  upgrade,
  blocking,
  terminated
} = {}) {
  const request = indexedDB.open(name, version);
  const openPromise = (0, _wrapIdbValue.w)(request);

  if (upgrade) {
    request.addEventListener('upgradeneeded', event => {
      upgrade((0, _wrapIdbValue.w)(request.result), event.oldVersion, event.newVersion, (0, _wrapIdbValue.w)(request.transaction));
    });
  }

  if (blocked) request.addEventListener('blocked', () => blocked());
  openPromise.then(db => {
    if (terminated) db.addEventListener('close', () => terminated());
    if (blocking) db.addEventListener('versionchange', () => blocking());
  }).catch(() => {});
  return openPromise;
}
/**
 * Delete a database.
 *
 * @param name Name of the database.
 */


function deleteDB(name, {
  blocked
} = {}) {
  const request = indexedDB.deleteDatabase(name);
  if (blocked) request.addEventListener('blocked', () => blocked());
  return (0, _wrapIdbValue.w)(request).then(() => undefined);
}

const readMethods = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'];
const writeMethods = ['put', 'add', 'delete', 'clear'];
const cachedMethods = new Map();

function getMethod(target, prop) {
  if (!(target instanceof IDBDatabase && !(prop in target) && typeof prop === 'string')) {
    return;
  }

  if (cachedMethods.get(prop)) return cachedMethods.get(prop);
  const targetFuncName = prop.replace(/FromIndex$/, '');
  const useIndex = prop !== targetFuncName;
  const isWrite = writeMethods.includes(targetFuncName);

  if ( // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
  !(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) || !(isWrite || readMethods.includes(targetFuncName))) {
    return;
  }

  const method = async function (storeName, ...args) {
    // isWrite ? 'readwrite' : undefined gzipps better, but fails in Edge :(
    const tx = this.transaction(storeName, isWrite ? 'readwrite' : 'readonly');
    let target = tx.store;
    if (useIndex) target = target.index(args.shift()); // Must reject if op rejects.
    // If it's a write operation, must reject if tx.done rejects.
    // Must reject with op rejection first.
    // Must resolve with op value.
    // Must handle both promises (no unhandled rejections)

    return (await Promise.all([target[targetFuncName](...args), isWrite && tx.done]))[0];
  };

  cachedMethods.set(prop, method);
  return method;
}

(0, _wrapIdbValue.r)(oldTraps => ({ ...oldTraps,
  get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),
  has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop)
}));
},{"./wrap-idb-value.js":"../node_modules/idb/build/esm/wrap-idb-value.js"}],"js/utility.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.writeData = writeData;
exports.readAllData = readAllData;
exports.setStore = setStore;
exports.getItem = getItem;
exports.getAllKeys = getAllKeys;
exports.deleteItem = deleteItem;
exports.clearStore = clearStore;
exports.urlBase64ToUint8Array = urlBase64ToUint8Array;
exports.dataURItoBlob = dataURItoBlob;

var _idb = require("idb");

// INDEXED DB
const dbPromise = (0, _idb.openDB)('posts-store', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('posts')) {
      console.log('[Utility JS] : creating the database');
      db.createObjectStore('posts');
    }

    if (!db.objectStoreNames.contains('sync-posts')) {
      // console.log('[Utility JS] : creating the database')
      db.createObjectStore('sync-posts');
    }
  }

});

async function writeData(st, data) {
  console.log('write data', data);
  return dbPromise.then(db => {
    const tx = db.transaction(st, 'readwrite');
    const store = tx.objectStore(st);
    store.put(data);
    return tx.complete;
  });
}

;

async function readAllData(st) {
  return dbPromise.then(function (db) {
    var tx = db.transaction(st, 'readonly');
    var store = tx.objectStore(st);
    return store.getAll();
  });
}

async function setStore(key, val, store) {
  console.log('setting store');
  return (await dbPromise).put(store, val, key);
}

async function getItem(key, store) {
  // console.log('getting store')
  return (await dbPromise).get(store, key);
}

async function getAllKeys(store) {
  return (await dbPromise).getAllKeys(store);
}

async function deleteItem(store, key) {
  console.log('delete store');
  return (await dbPromise).delete(store, key);
}

async function clearStore(store) {
  // console.log('clearing store')
  return (await dbPromise).clear(store);
} // CONVERT 64 STRING TO ARRAY


function urlBase64ToUint8Array(base64String) {
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
} // CONVERT BASE64 URL TO BLOB 


function dataURItoBlob(dataURI) {
  var byteString = atob(dataURI.split(',')[1]);
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);

  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  var blob = new Blob([ab], {
    type: mimeString
  });
  return blob;
}
},{"idb":"../node_modules/idb/build/esm/index.js"}],"sw.js":[function(require,module,exports) {
"use strict";

var _utility = require("./js/utility");

const STATIC_CACHE = "static-013";
const DYNAMIC_CACHE = "dynamic-006";
const STORE_POSTS = 'posts';
const SYNC_POSTS = 'sync-posts';
const SYNC_REGISTER_NEW_POSTS = 'sync-new-posts';
const STATIC_FILES = ['/index.html', '/pages/offline.html', '/manifest.webmanifest', '/main.1f19ae8e.js', '/home.5fd3cac8.js', '/main.48b3db1d.css', '/home.5fd3cac8.css', '/favicon.26242483.ico', '/maunakea.3693c564.jpg', '/bx-rooftop.02bed6fe.jpg', '/kalalau-beach.2009ff86.jpg', '/hourtin-sunset.7c4dd7fb.jpg', '/crater-center.cb31532d.jpg', '/pamukkale.f0c4f7c3.jpg', '/rail-road-down-center.01d9c3c2.jpg', '/belaetcome.c74832df.png', '/ics.ccad7778.png', '/lacleduquai.9d6d72d6.png']; // INSTALL
// console.log('[Service Worker]')

self.addEventListener('install', event => {
  // console.log('[Service Worker] Installing service worker ...', event)
  event.waitUntil(caches.open(STATIC_CACHE).then(cache => {
    // console.log('[Service Worker] Precaching app shell (index.html,css.js...) ...', event)
    cache.addAll(STATIC_FILES);
  }));
}); // ACTIVATE

self.addEventListener('activate', event => {
  // console.log('[Service Worker] Activating service worker ...', event)
  event.waitUntil(caches.keys().then(keyList => {
    // console.log('[Service Worker] keyList :', keyList)
    return Promise.all(keyList.map(key => {
      if (key !== STATIC_CACHE && key !== DYNAMIC_CACHE) {
        console.log('removed cache : ', key);
        caches.delete(key);
      }
    }));
  }));
  return self.clients.claim();
}); // FETCH

self.addEventListener('fetch', event => {
  const URL = 'http://localhost:9000/api/feed';

  if (event.request.url.indexOf(URL) > -1) {
    // storing json data using indexedDB
    console.log('[Service Worker] : IndexedDB');
    event.respondWith(fetch(event.request).then(res => {
      // console.log('[Service Worker] : IndexedDB =>', res.json())
      const clonedRes = res.clone();
      (0, _utility.clearStore)(STORE_POSTS).then(() => {
        // setStore(response.data[key])
        // .then(() => console.log('It worked!'))
        // .catch((err) => console.log('It failed!', err))
        return clonedRes.json();
      }).then(response => {
        console.log('[Service Worker] : response', response);

        for (let key in response.data) {
          // console.log('[Service Worker] : key:', response.data[key])
          // console.log('[Service Worker] : key id:', response.data[key].id)
          (0, _utility.setStore)(response.data[key].title, response.data[key], STORE_POSTS);
        }
      });
      return res;
    }));
  } else if (STATIC_FILES.some(file => file === event.request.url)) {
    //
    // console.log('[Service Worker]: Fetching and caching static files ')
    // console.log('[Service Worker] caches.match :', caches.match)
    event.respondWith(caches.match(event.request));
  } else {
    event.respondWith(caches.match(event.request).then(response => {
      if (response) {
        return response;
      } else {
        return fetch(event.request).then(res => {
          return caches.open(DYNAMIC_CACHE).then(cache => {
            // cache.put(event.request.url, res.clone())
            return res;
          });
        }).catch(err => {
          return caches.open(STATIC_CACHE).then(cache => {
            // console.log(event.request.headers)
            if (event.request.headers.get('accept') && event.request.headers.get('accept').includes('text/html')) {
              return cache.match('/pages/offline.html');
            }
          });
        });
      }
    }));
  }
}); // SYNC

self.addEventListener('sync', function (event) {
  // console.log('[Service Worker] Background syncing', event)
  if (event.tag === 'sync-new-posts') {
    console.log('[Service Worker] Syncing new Posts');
    event.waitUntil((0, _utility.readAllData)('sync-posts').then(function (data) {
      for (var dt of data) {
        // sendDataPictureURL(dt)
        // postData.append('id', dt.id)
        // postData.append('location', dt.location)
        // console.log('dt', dt)
        const postData = new FormData();
        postData.append('title', dt.title);
        postData.append('fileName', "".concat(dt.title.split(' ').join('-'), ".png"));
        postData.append('file', dt.picture); // console.log('postData', postData)

        sendDataPictureBlob(postData).then(function (res) {
          return res.json();
        }).then(response => {
          console.log('Sent data', response);
          (0, _utility.deleteItem)('sync-posts', dt.title); // Isn't working correctly!
        }).catch(function (err) {
          console.log('Error while sending data', err);
        });
      }
    }));
  }
});

function sendDataPictureURL(data) {
  return fetch("http://localhost:9000/api/feed", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(data)
  });
}

function sendDataPictureBlob(data) {
  // console.log('data', data)
  return fetch("http://localhost:9000/api/feed", {
    method: "POST",
    // headers: {
    //     "Content-Type": "multipart/form-data",
    //     "Accept": "application/json"
    // },
    body: data
  });
} // NOTIFICATIONS


self.addEventListener('notificationclick', event => {
  const notification = event.notification;
  const action = event.action; // console.log(notification)

  if (action === 'confirm') {
    // console.log('notif confirm ')
    notification.close();
  } else {
    // console.log('notif confirm ')
    event.waitUntil(clients.matchAll().then(clnts => {
      const client = clnts.find(c => {
        return c.visibilityState === 'visible';
      });

      if (client !== undefined) {
        client.navigate(notification.data.openUrl);
        client.focus();
      } else {
        clients.openWindow(notification.data.openUrl);
      }

      notification.close();
    }));
  }
});
self.addEventListener('notificationclose', event => {
  console.log('notification was closed', event);
}); // PUSH

self.addEventListener('push', event => {
  let data = {
    title: 'from sw',
    content: 'worked but no data sent',
    openUrl: '/pages/feed.html'
  };

  if (event.data) {
    data = JSON.parse(event.data.text());
  }

  console.log('data push', data);
  const options = {
    body: data.content,
    icon: 'favicon.26242483.ico',
    badge: 'favicon.26242483.ico',
    image: data.image,
    data: {
      // url: data.openUrl
      url: '/index.html'
    }
  };
  event.waitUntil(self.registration.showNotification(data.title, options));
});
},{"./js/utility":"js/utility.js"}],"../../../../.nvm/versions/node/v14.16.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "36081" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../.nvm/versions/node/v14.16.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","sw.js"], null)
//# sourceMappingURL=/sw.js.map