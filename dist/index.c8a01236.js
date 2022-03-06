// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
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
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"fSbD7":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "4a236f9275d0a351";
module.bundle.HMR_BUNDLE_ID = "6d5e001cc8a01236";
"use strict";
function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;
    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
        if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
            if (it) o = it;
            var i = 0;
            var F = function F() {
            };
            return {
                s: F,
                n: function n() {
                    if (i >= o.length) return {
                        done: true
                    };
                    return {
                        done: false,
                        value: o[i++]
                    };
                },
                e: function e(_e) {
                    throw _e;
                },
                f: F
            };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true, didErr = false, err;
    return {
        s: function s() {
            it = o[Symbol.iterator]();
        },
        n: function n() {
            var step = it.next();
            normalCompletion = step.done;
            return step;
        },
        e: function e(_e2) {
            didErr = true;
            err = _e2;
        },
        f: function f() {
            try {
                if (!normalCompletion && it.return != null) it.return();
            } finally{
                if (didErr) throw err;
            }
        }
    };
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function dispose(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/'); // $FlowFixMe
    ws.onmessage = function(event) {
        checkedAssets = {
        };
        acceptedAssets = {
        };
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            var assets = data.assets.filter(function(asset) {
                return asset.envHash === HMR_ENV_HASH;
            }); // Handle HMR Update
            var handled = assets.every(function(asset) {
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            var _iterator = _createForOfIteratorHelper(data.diagnostics.ansi), _step;
            try {
                for(_iterator.s(); !(_step = _iterator.n()).done;){
                    var ansiDiagnostic = _step.value;
                    var stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                    console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
                }
            } catch (err) {
                _iterator.e(err);
            } finally{
                _iterator.f();
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    var errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    var _iterator2 = _createForOfIteratorHelper(diagnostics), _step2;
    try {
        for(_iterator2.s(); !(_step2 = _iterator2.n()).done;){
            var diagnostic = _step2.value;
            var stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
            errorHTML += "\n      <div>\n        <div style=\"font-size: 18px; font-weight: bold; margin-top: 20px;\">\n          \uD83D\uDEA8 ".concat(diagnostic.message, "\n        </div>\n        <pre>").concat(stack, "</pre>\n        <div>\n          ").concat(diagnostic.hints.map(function(hint) {
                return '<div>💡 ' + hint + '</div>';
            }).join(''), "\n        </div>\n        ").concat(diagnostic.documentation ? "<div>\uD83D\uDCDD <a style=\"color: violet\" href=\"".concat(diagnostic.documentation, "\" target=\"_blank\">Learn more</a></div>") : '', "\n      </div>\n    ");
        }
    } catch (err) {
        _iterator2.e(err);
    } finally{
        _iterator2.f();
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', link.getAttribute('href').split('?')[0] + '?' + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        var deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            var fn = new Function('require', 'module', 'exports', asset.output);
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) return true;
    var parents = getParents(module.bundle.root, id); // If no parents, the asset is new. Prevent reloading the page.
    if (!parents.length) return true;
    return parents.some(function(v) {
        return hmrAcceptCheck(v[0], v[1], null);
    });
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"bzG5g":[function(require,module,exports) {
var _header = require("./header");
var _hero = require("./hero");
var _work = require("./work");
var _about = require("./about");
var _contact = require("./contact");
// HEADER
new _header.Header();
new _hero.Hero();
new _work.Work();
new _about.About();
new _contact.Contact();

},{"./header":"88COx","./hero":"2DL8N","./work":"bVkXw","./about":"86Lj1","./contact":"7LsZ5"}],"88COx":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Header", ()=>Header
);
class Header {
    constructor(){
        this.body = document.getElementById('body');
        this.header = document.getElementById('header');
        this.headerTitleBtn = document.getElementById('header-title');
        this.headerTitleArrow = document.getElementsByClassName('header__title__arrow')[0];
        this.headerSocial = document.getElementById('header-social');
        this.headerTitleBackdrop = document.getElementById('header-title-backdrop');
        this.headerNavBackdrop = document.getElementById('header-nav-backdrop');
        this.navBtn = document.getElementById('nav-btn');
        this.navList = document.getElementById('nav-list');
        this.navItems = this.navList.querySelectorAll('.main-navigation__item');
        this.URL = 'http://localhost:9000/api/feed';
        this.initHeader();
    }
    initHeader() {
        window.addEventListener('load', ()=>{
            this.header.classList.remove('hidden');
        });
        this.headerTitleBtn.addEventListener('click', ()=>{
            this.toggleHeaderTitle();
        });
        this.headerTitleBackdrop.addEventListener('click', ()=>{
            this.toggleHeaderTitle();
        });
        this.headerNavBackdrop.addEventListener('click', ()=>{
            this.toggleNav();
        });
        this.navBtn.addEventListener('click', ()=>{
            this.toggleNav();
        });
        this.navItems.forEach((item)=>item.addEventListener('click', ()=>this.toggleNav()
            )
        );
    }
    toggleHeaderTitle() {
        this.headerSocial.classList.toggle('active');
        this.headerSocial.classList.contains('active') ? this.headerSocial.classList.remove('iddle') : this.headerSocial.classList.add('iddle');
        this.headerTitleBtn.classList.toggle('active');
        this.headerTitleBackdrop.classList.toggle('active');
    }
    toggleNav() {
        this.body.classList.toggle('overflow--hidden');
        this.navBtn.classList.toggle('open');
        this.navList.classList.toggle('active');
        this.headerNavBackdrop.classList.contains('active') ? this.headerNavBackdrop.classList.remove('active') : this.headerNavBackdrop.classList.add('active');
        // Close the header title if open
        this.headerTitleBtn.classList.remove('active');
        this.headerTitleBackdrop.classList.remove('active');
        this.headerSocial.classList.remove('active');
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"ciiiV":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"2DL8N":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Hero", ()=>Hero
);
class Hero {
    constructor(){
        this.heroSection = document.querySelector('.hero');
        this.imgsMobile = document.querySelectorAll('.hero__bg-img--mobile');
        this.imgsDesktop = document.querySelectorAll('.hero__bg-img--desktop');
        // this.hideableElements = document.querySelectorAll(".hideable")
        this.toggleTextBtn = document.getElementById('text-action');
        this.imgTransition = 5000;
        this.initHero();
    }
    initHero() {
        let idx = 0;
        let imgs = this.imgsMobile;
        if (window.innerWidth >= 992) imgs = this.imgsDesktop;
        setInterval(()=>{
            imgs.forEach((img)=>img.classList.remove('active')
            );
            idx++;
            if (idx > imgs.length - 1) idx = 0;
            imgs[idx].classList.add('active');
        }, this.imgTransition);
    }
    toggleText() {
        this.toggleTextBtn.addEventListener('click', ()=>{
            this.toggleTextBtn.classList.toggle('masked');
            this.hideableElements.forEach((element)=>element.classList.toggle('hide')
            );
        });
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"bVkXw":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Work", ()=>Work
);
class Work {
    constructor(){
        this.projects = document.querySelectorAll('.project');
        this.toggleProjectPanels();
    }
    toggleProjectPanels() {
        if (window.innerWidth >= 992) this.projects[0].classList.add('active');
        this.projects.forEach((project)=>{
            project.addEventListener('click', ()=>{
                this.projects.forEach((proj)=>{
                    proj.classList.remove('active');
                });
                project.classList.add('active');
            });
        });
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"86Lj1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "About", ()=>About
);
class About {
    constructor(){
        this.capsules = document.querySelectorAll('.capsule');
        this.target = document.getElementById('target');
        this.skills = document.querySelectorAll('.skill');
        this.initAbout();
    }
    initAbout() {
        window.addEventListener('load', ()=>{
            this.toggleExpandCapsules();
            this.animateSkills();
        });
    }
    animateSkills() {
        const triggerBottom = window.innerHeight / 3 * 2;
        this.skills.forEach((skill, index)=>{
            const svgContainer = skill.querySelector('.svg-container');
            let svgLine, path, capsule, dot;
            if (window.innerWidth <= 768) {
                // Defining the elements of each skills
                svgLine = skill.querySelector('.svg-line--mobile');
                path = svgLine.querySelector('.path');
                capsule = skill.querySelector('.capsule'); // button
                dot = skill.querySelector('.dot');
                const capsuleHeight = capsule.clientHeight;
                const svgLineWidth = svgLine.clientWidth;
                const svgLineHeight = svgLine.clientHeight;
                const dotY = dot.offsetTop + dot.clientHeight / 2;
                const dotX = dot.offsetLeft + dot.clientWidth / 2;
                svgContainer.style.width = `${svgLineWidth}px`;
                svgContainer.style.height = `${svgLineHeight}px`;
                if (index === 0) {
                    svgContainer.style.top = `${dotY - svgLineHeight}px`;
                    svgContainer.style.left = `${dotX}px`;
                    capsule.style.top = `-${capsuleHeight}px`;
                    capsule.style.right = `-${capsuleHeight / 2}px`;
                } else if (index === 1) {
                    svgContainer.style.top = `${dotY}px`;
                    svgContainer.style.left = `${dotX}px`;
                    capsule.style.top = `${svgLineHeight}px`;
                    capsule.style.right = `-${capsuleHeight / 2}px`;
                } else if (index === 2) {
                    svgContainer.style.top = `${dotY - svgLineHeight}px`;
                    svgContainer.style.left = `-${svgLineWidth - dotX}px`;
                    capsule.style.top = `-${capsuleHeight}px`;
                    capsule.style.left = `-${capsuleHeight / 2}px`;
                } else if (index === 3) {
                    svgContainer.style.top = `${dotY}px`;
                    svgContainer.style.left = `-${svgLineWidth - dotX}px`;
                    capsule.style.bottom = `-${capsuleHeight}px`;
                    capsule.style.left = `-${capsuleHeight / 2}px`;
                }
            } else {
                svgLine = skill.querySelector('.svg-line--desktop');
                path = svgLine.querySelector('.path');
                capsule = skill.querySelector('.capsule');
                dot = skill.querySelector('.dot');
                const capsuleHeight = capsule.clientHeight;
                const svgLineWidth = svgLine.clientWidth;
                const svgLineHeight = svgLine.clientHeight;
                const dotY = dot.offsetTop + dot.clientHeight / 2;
                const dotX = dot.offsetLeft + dot.clientWidth / 2;
                svgContainer.style.width = `${svgLineWidth}px`;
                svgContainer.style.height = `${svgLineHeight}px`;
                if (index === 0 || index === 1) {
                    svgContainer.style.top = `${dotY - svgLineHeight}px`;
                    svgContainer.style.left = `${dotX - svgLineWidth}px`;
                    capsule.style.top = `-${capsuleHeight / 2}px`;
                    capsule.style.right = `${svgLineWidth}px`;
                } else if (index === 2) {
                    svgContainer.style.top = `${dotY - svgLineHeight}px`;
                    svgContainer.style.left = `${dotX}px`;
                    capsule.style.top = `-${capsuleHeight / 2}px`;
                    capsule.style.left = `${svgLineWidth}px`;
                } else if (index === 3) {
                    svgContainer.style.top = `${dotY}px`;
                    svgContainer.style.left = `${dotX}px`;
                    capsule.style.bottom = `-${capsuleHeight / 2}px`;
                    capsule.style.left = `${svgLineWidth}px`;
                }
            }
            path.style.strokeDasharray = `${path.getTotalLength()}px`;
            // DISPLAYING THE CAPSULES
            window.addEventListener('scroll', (e)=>{
                const targetTop = this.target.getBoundingClientRect().top;
                if (targetTop < triggerBottom) {
                    capsule.classList.add('show');
                    path.classList.add('show');
                } else {
                    capsule.classList.remove('show');
                    path.classList.remove('show');
                    capsule.classList.remove('expand');
                }
            });
        });
    }
    toggleExpandCapsules() {
        this.capsules.forEach((capsule)=>{
            const btn = capsule.querySelector('.btn-arrow');
            btn.addEventListener('click', ()=>{
                capsule.classList.toggle('expand');
            });
        });
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}],"7LsZ5":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Contact", ()=>Contact
);
class Contact {
    constructor(){
        this.labels = document.querySelectorAll('.form-control label');
        this.form = document.getElementById('contact-form');
        this.inputFields = document.querySelectorAll('.control');
        this.name = document.getElementById('form-name');
        this.subject = document.getElementById('form-subject');
        this.mail = document.getElementById('form-email');
        this.message = document.getElementById('form-message');
        this.submitContactBtn = document.getElementById('submit-contact-btn');
        this.loaderContact = document.getElementById('loader-contact');
        this.successMessage = document.getElementById('success-message');
        this.errorMessage = document.getElementById('error-message');
        this.initForm();
    }
    initForm() {
        this.clearInputs();
        this.animateLabel();
        // Goes through the array inputFields
        this.inputFields.forEach((input)=>{
            // Creates an event listener on the current input_field
            input.addEventListener('input', this.focusOnInput.bind(this));
        });
        this.onSubmitForm();
    }
    isFormValid() {
        return this.name.validity.valid && this.mail.validity.valid && this.subject.validity.valid && this.message.validity.valid;
    }
    // Clears the inputs
    clearInputs() {
        this.inputFields.forEach((input)=>{
            input.value = '';
        });
    }
    focusOnInput(input) {
        this.isFormValid() ? this.submitContactBtn.removeAttribute('disabled') : this.submitContactBtn.setAttribute('disabled', 'disabled');
        if (input && input.target.value !== '') {
            input.target.classList.add('filled');
            input.target.parentNode.lastElementChild.classList.add('invisible');
        } else {
            input.target.classList.remove('filled');
            input.target.parentNode.lastElementChild.classList.remove('invisible');
        }
    }
    // Animate the labels on focus
    animateLabel() {
        this.labels.forEach((label)=>{
            label.innerHTML = label.innerText.split('').map((letter, idx)=>`<span style="transition-delay:${idx * 50}ms">${letter}</span>`
            ).join('');
        });
    }
    onSubmitForm() {
        this.submitContactBtn.addEventListener('click', ()=>this.submitForm()
        );
    }
    async submitForm() {
        if (!this.isFormValid) return;
        const formData = {
            name: this.name.value.trim(),
            email: this.mail.value.trim(),
            subject: this.subject.value,
            message: this.message.value
        };
        // Show loader
        this.loaderContact.classList.remove('hidden');
        this.form.classList.add('loading');
        this.errorMessage.classList.add('hidden');
        try {
            const res = await fetch(// 'https://tristan-deloris-pro.herokuapp.com/api/contact',
            'http://localhost:9000/api/contact', // 'http://localhost:9000/api/contactffff',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (res.status === 201) {
                this.loaderContact.classList.add('hidden');
                this.form.classList.add('hidden');
                this.successMessage.classList.remove('hidden');
            } else {
                console.log('error:', res.status, res);
                this.form.classList.remove('loading');
                this.loaderContact.classList.add('hidden');
                this.errorMessage.classList.remove('hidden');
                throw new Error('Something went wrong');
            }
        } catch (error) {
            // console.log('contact error:', error);
            //   this.form.classList.remove("hidden");
            this.form.classList.remove('loading');
            this.errorMessage.classList.remove('hidden');
            this.loaderContact.classList.add('hidden');
            throw new Error('Something went wrong');
        }
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"ciiiV"}]},["fSbD7","bzG5g"], "bzG5g", "parcelRequire3cd7")

//# sourceMappingURL=index.c8a01236.js.map
