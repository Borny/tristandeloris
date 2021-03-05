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
})({"../../../../AppData/Roaming/npm/node_modules/parcel/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../../../AppData/Roaming/npm/node_modules/parcel/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../../../AppData/Roaming/npm/node_modules/parcel/src/builtins/bundle-url.js"}],"styles/main.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"C:\\Users\\Tristan\\Desktop\\projects\\tristandeloris\\src\\img\\pics\\maunakea.jpg":[["maunakea.3693c564.jpg","img/pics/maunakea.jpg"],"img/pics/maunakea.jpg"],"C:\\Users\\Tristan\\Desktop\\projects\\tristandeloris\\src\\img\\pics\\crater-center.jpg":[["crater-center.cb31532d.jpg","img/pics/crater-center.jpg"],"img/pics/crater-center.jpg"],"_css_loader":"../../../../AppData/Roaming/npm/node_modules/parcel/src/builtins/css-loader.js"}],"js/header.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Header = void 0;

class Header {
  constructor() {
    this.headerTitleBtn = document.getElementById("header-title");
    this.headerSocial = document.getElementById("header-social");
    this.headerBackdrop = document.getElementById("header-backdrop");
  }

  initHeader() {
    this.headerTitleBtn.addEventListener("click", () => {
      this.toggleHeaderTitle();
    });
    this.headerBackdrop.addEventListener("click", () => {
      this.toggleHeaderTitle();
    });
  }

  toggleHeaderTitle() {
    this.headerSocial.classList.toggle("active");
    this.headerSocial.classList.contains("active") ? this.headerSocial.classList.remove("iddle") : this.headerSocial.classList.add("iddle");
    this.headerTitleBtn.classList.toggle("active");
    this.headerBackdrop.classList.toggle("active");
  }

}

exports.Header = Header;
},{}],"img/pics/rail-road-down-center.jpg":[function(require,module,exports) {
module.exports = "/rail-road-down-center.01d9c3c2.jpg";
},{}],"img/pics/hourtin-sunset.jpg":[function(require,module,exports) {
module.exports = "/hourtin-sunset.7c4dd7fb.jpg";
},{}],"js/hero.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Hero = void 0;

var _railRoadDownCenter = _interopRequireDefault(require("../img/pics/rail-road-down-center.jpg"));

var _hourtinSunset = _interopRequireDefault(require("../img/pics/hourtin-sunset.jpg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Hero {
  constructor() {
    this.heroSection = document.querySelector(".hero");
  }

  initHero() {
    // console.log(imageURL);
    const railImg = "rail-road-down.jpg";
    const sunsetImg = "/img/pics/hourtin-sunset.jpg";
    let idx = 0;
    const imgs = [_railRoadDownCenter.default, _hourtinSunset.default //   "https://images.unsplash.com/photo-1536744052983-bcf122437f48?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    //   "https://images.unsplash.com/photo-1531743672295-bbd901790069?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
    ];
    this.heroSection.style.backgroundImage = "url('".concat(imgs[idx], "')");
    setInterval(() => {
      console.log(idx);
      this.heroSection.style.backgroundImage = "url('".concat(imgs[idx], "')");
      idx++;

      if (idx > imgs.length - 1) {
        idx = 0;
      }
    }, 4000);
  }

}

exports.Hero = Hero;
},{"../img/pics/rail-road-down-center.jpg":"img/pics/rail-road-down-center.jpg","../img/pics/hourtin-sunset.jpg":"img/pics/hourtin-sunset.jpg"}],"js/work.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Work = void 0;

class Work {
  constructor() {
    this.projects = document.querySelectorAll(".project");
  }

  toggleProjectPanels() {
    if (window.innerWidth >= 992) {
      this.projects[0].classList.add("active");
    }

    this.projects.forEach(project => {
      project.addEventListener("click", () => {
        this.projects.forEach(proj => {
          proj.classList.remove("active");
        });
        project.classList.add("active");
      });
    });
  }

}

exports.Work = Work;
},{}],"js/about.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.About = void 0;

class About {
  constructor() {
    this.capsules = document.querySelectorAll(".capsule");
    this.target = document.getElementById("target");
    this.skills = document.querySelectorAll(".skill");
  }

  initAbout() {
    this.animateSkills();
    this.toggleExpandCapsules();
  }

  animateSkills() {
    const triggerBottom = window.innerHeight / 3 * 2;
    this.skills.forEach((skill, index) => {
      const svgContainer = skill.querySelector(".svg-container");
      let svg, path, capsule, dot;

      if (window.innerWidth <= 992) {
        svg = skill.querySelector(".svg-line--mobile");
        path = svg.querySelector(".path");
        capsule = skill.querySelector(".capsule");
        dot = skill.querySelector(".dot");
      } else {
        svg = skill.querySelector(".svg-line--desktop");
        path = svg.querySelector(".path");
        capsule = skill.querySelector(".capsule");
        dot = skill.querySelector(".dot");
      }

      const svgWidth = svg.clientWidth;
      const svgHeight = svg.clientHeight;
      svgContainer.style.width = "".concat(svgWidth, "px");
      svgContainer.style.height = "".concat(svgHeight, "px");
      const dotY = dot.offsetTop + dot.clientHeight / 2;
      const dotX = dot.offsetLeft + dot.clientWidth / 2; // On mobile we change the top position of the second svg line

      if (window.innerWidth <= 992) {
        if (index === 0) {
          svgContainer.style.top = "".concat(dotY - svgHeight, "px");
          svgContainer.style.left = "".concat(dotX, "px");
          capsule.style.top = "-".concat(capsule.clientHeight, "px");
          capsule.style.right = "-".concat(capsule.clientHeight / 2, "px");
        } else if (index === 1) {
          svgContainer.style.top = "".concat(dotY, "px");
          svgContainer.style.left = "".concat(dotX, "px");
          capsule.style.top = "".concat(svgHeight, "px");
          capsule.style.right = "-".concat(capsule.clientWidth / 2, "px");
        } else if (index === 2) {
          svgContainer.style.top = "".concat(dotY - svgHeight, "px");
          svgContainer.style.left = "-".concat(svgWidth - dotX, "px");
          capsule.style.top = "-".concat(capsule.clientHeight, "px");
          capsule.style.left = "-".concat(capsule.clientWidth / 2, "px");
        } else if (index === 3) {
          svgContainer.style.top = "".concat(dotY, "px");
          svgContainer.style.left = "-".concat(svgWidth - dotX, "px");
          capsule.style.bottom = "-".concat(capsule.clientHeight, "px");
          capsule.style.left = "-".concat(capsule.clientHeight / 2, "px");
        }
      } else {
        if (index === 0 || index === 1) {
          svgContainer.style.top = "".concat(dotY - svgHeight, "px");
          svgContainer.style.left = "".concat(dotX - svgWidth, "px");
          capsule.style.top = "-".concat(capsule.clientHeight / 2, "px");
          capsule.style.right = "".concat(svgWidth, "px");
        } else if (index === 2) {
          svgContainer.style.top = "".concat(dotY - svgHeight, "px");
          svgContainer.style.left = "".concat(dotX, "px");
          capsule.style.top = "-".concat(capsule.clientHeight / 2, "px");
          capsule.style.left = "".concat(svgWidth, "px");
        } else if (index === 3) {
          svgContainer.style.top = "".concat(dotY, "px");
          svgContainer.style.left = "".concat(dotX, "px");
          capsule.style.bottom = "-".concat(capsule.clientHeight / 2, "px");
          capsule.style.left = "".concat(svgWidth, "px");
        }
      }

      path.style.strokeDasharray = "".concat(path.getTotalLength(), "px");
      window.addEventListener("scroll", e => {
        const targetTop = this.target.getBoundingClientRect().top;

        if (targetTop < triggerBottom) {
          capsule.classList.add("show");
          path.classList.add("show");
        } else {
          capsule.classList.remove("show");
          path.classList.remove("show");
        }
      });
    });
  }

  toggleExpandCapsules() {
    this.capsules.forEach(capsule => {
      const btn = capsule.querySelector(".btn-arrow");
      btn.addEventListener("click", () => {
        capsule.classList.toggle("expand");
      });
    });
  }

}

exports.About = About;
},{}],"js/contact.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Contact = void 0;

class Contact {
  constructor() {
    this.labels = document.querySelectorAll(".form-control label");
    this.form = document.getElementById("contact-form");
    this.inputFields = document.querySelectorAll(".control");
    this.name = document.getElementById("form-name");
    this.subject = document.getElementById("form-subject");
    this.mail = document.getElementById("form-email");
    this.message = document.getElementById("form-message");
    this.submitContactBtn = document.getElementById("submit-contact-btn");
    this.loaderContact = document.getElementById("loader-contact");
    this.successMessage = document.getElementById("success-message");
    this.errorMessage = document.getElementById("error-message");
  }

  initForm() {
    this.clearInputs();
    this.animateLabel(); // Goes through the array inputFields

    this.inputFields.forEach(input => {
      // Creates an event listener on the current input_field
      input.addEventListener("input", this.focusOnInput.bind(this));
    });
    this.onSubmitForm();
  }

  isFormValid() {
    return this.name.validity.valid && this.mail.validity.valid && this.subject.validity.valid && this.message.validity.valid;
  } // Clears the inputs


  clearInputs() {
    this.inputFields.forEach(input => {
      input.value = "";
    });
  }

  focusOnInput(input) {
    this.isFormValid() ? this.submitContactBtn.removeAttribute("disabled") : this.submitContactBtn.setAttribute("disabled", "disabled");

    if (input && input.target.value !== "") {
      input.target.classList.add("filled");
      input.target.parentNode.lastElementChild.classList.add("invisible");
    } else {
      input.target.classList.remove("filled");
      input.target.parentNode.lastElementChild.classList.remove("invisible");
    }
  } // Animate the labels on focus


  animateLabel() {
    this.labels.forEach(label => {
      label.innerHTML = label.innerText.split("").map((letter, idx) => "<span style=\"transition-delay:".concat(idx * 50, "ms\">").concat(letter, "</span>")).join("");
    });
  }

  onSubmitForm() {
    this.submitContactBtn.addEventListener("click", () => this.submitForm());
  }

  async submitForm() {
    if (!this.isFormValid) {
      return;
    }

    const formData = {
      name: this.name.value,
      email: this.mail.value.trim(),
      subject: this.subject.value,
      message: this.message.value
    }; // Show loader

    this.loaderContact.classList.remove("hidden");
    this.form.classList.add("loading");
    this.errorMessage.classList.add("hidden");

    try {
      const res = await fetch( // "https://belaetcome.herokuapp.com/api/contact",
      "http://localhost:5000/api/contact", // 'http://localhost:9000/api/contactffff',
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (res.status === 200) {
        this.loaderContact.classList.add("hidden");
        this.form.classList.add("hidden");
        this.successMessage.classList.remove("hidden");
      } else {
        console.log("error:", res.status, res);
        this.form.classList.remove("loading");
        this.loaderContact.classList.add("hidden");
        this.errorMessage.classList.remove("hidden");
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.log("contact error:", error); //   this.form.classList.remove("hidden");

      this.form.classList.remove("loading");
      this.errorMessage.classList.remove("hidden");
      this.loaderContact.classList.add("hidden");
      throw new Error("Something went wrong");
    }
  }

}

exports.Contact = Contact;
},{}],"index.js":[function(require,module,exports) {
"use strict";

require("./styles/main.scss");

var _header = require("./js/header");

var _hero = require("./js/hero");

var _work = require("./js/work");

var _about = require("./js/about");

var _contact = require("./js/contact");

// import "regenerator-runtime/runtime";
// HEADER
const header = new _header.Header();
header.initHeader(); // WORK

const hero = new _hero.Hero();
hero.initHero(); // WORK

const work = new _work.Work();
work.toggleProjectPanels(); // ABOUT

const about = new _about.About();
about.initAbout(); // CONTACT

const contact = new _contact.Contact();
contact.initForm();
},{"./styles/main.scss":"styles/main.scss","./js/header":"js/header.js","./js/hero":"js/hero.js","./js/work":"js/work.js","./js/about":"js/about.js","./js/contact":"js/contact.js"}],"../../../../AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59538" + '/');

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
},{}]},{},["../../../../AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map