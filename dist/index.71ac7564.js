!function(){function t(t){return t&&t.__esModule?t.default:t}function e(t,e,n,r,i,o,a){try{var s=t[o](a),c=s.value}catch(t){return void n(t)}s.done?e(c):Promise.resolve(c).then(r,i)}function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function i(t,e,n){return e&&r(t.prototype,e),n&&r(t,n),t}var o=function(){"use strict";function t(){n(this,t),this.headerTitleBtn=document.getElementById("header-title"),this.headerTitleArrow=document.getElementsByClassName("header__title__arrow")[0],this.headerSocial=document.getElementById("header-social"),this.headerTitleBackdrop=document.getElementById("header-title-backdrop"),this.headerNavBackdrop=document.getElementById("header-nav-backdrop"),this.navBtn=document.getElementById("nav-btn"),this.navList=document.getElementById("nav-list"),this.navItems=this.navList.querySelectorAll(".main-navigation__item"),this.URL="http://localhost:9000/api/feed",this.initHeader()}return i(t,[{key:"initHeader",value:function(){var t=this,e=this,n=this,r=this,i=this;this.headerTitleBtn.addEventListener("click",(function(){t.toggleHeaderTitle()})),this.headerTitleBackdrop.addEventListener("click",(function(){e.toggleHeaderTitle()})),this.headerNavBackdrop.addEventListener("click",(function(){n.toggleNav()})),this.navBtn.addEventListener("click",(function(){r.toggleNav()})),this.navItems.forEach((function(t){return t.addEventListener("click",(function(){return i.toggleNav()}))}))}},{key:"toggleHeaderTitle",value:function(){this.headerSocial.classList.toggle("active"),this.headerSocial.classList.contains("active")?this.headerSocial.classList.remove("iddle"):this.headerSocial.classList.add("iddle"),this.headerTitleBtn.classList.toggle("active"),this.headerTitleBackdrop.classList.toggle("active")}},{key:"toggleNav",value:function(){this.navBtn.classList.toggle("open"),this.navList.classList.toggle("active"),this.headerNavBackdrop.classList.contains("active")?this.headerNavBackdrop.classList.remove("active"):this.headerNavBackdrop.classList.add("active"),this.headerTitleBtn.classList.remove("active"),this.headerTitleBackdrop.classList.remove("active"),this.headerSocial.classList.remove("active")}}]),t}(),a=function(){"use strict";function t(){n(this,t),this.heroSection=document.querySelector(".hero"),this.imgsMobile=document.querySelectorAll(".hero__bg-img--mobile"),this.imgsDesktop=document.querySelectorAll(".hero__bg-img--desktop"),this.imgTransition=5e3,this.initHero()}return i(t,[{key:"initHero",value:function(){var t=0,e=this.imgsMobile;window.innerWidth>=992&&(e=this.imgsDesktop),setInterval((function(){e.forEach((function(t){return t.classList.remove("active")})),++t>e.length-1&&(t=0),e[t].classList.add("active")}),this.imgTransition)}}]),t}(),s=function(){"use strict";function t(){n(this,t),this.projects=document.querySelectorAll(".project"),this.toggleProjectPanels()}return i(t,[{key:"toggleProjectPanels",value:function(){var t=this;window.innerWidth>=992&&this.projects[0].classList.add("active"),this.projects.forEach((function(e){var n=t;e.addEventListener("click",(function(){n.projects.forEach((function(t){t.classList.remove("active")})),e.classList.add("active")}))}))}}]),t}(),c=function(){"use strict";function t(){n(this,t),this.capsules=document.querySelectorAll(".capsule"),this.target=document.getElementById("target"),this.skills=document.querySelectorAll(".skill"),this.initAbout()}return i(t,[{key:"initAbout",value:function(){var t=this;this.toggleExpandCapsules(),window.addEventListener("load",(function(){t.animateSkills()}))}},{key:"animateSkills",value:function(){var t=this,e=window.innerHeight/3*2;this.skills.forEach((function(n,r){var i,o,a,s,c=t,l=n.querySelector(".svg-container");window.innerWidth<=768?(i=n.querySelector(".svg-line--mobile"),o=i.querySelector(".path"),a=n.querySelector(".capsule"),s=n.querySelector(".dot")):(i=n.querySelector(".svg-line--desktop"),o=i.querySelector(".path"),a=n.querySelector(".capsule"),s=n.querySelector(".dot"));var u=i.clientWidth,h=i.clientHeight;l.style.width="".concat(u,"px"),l.style.height="".concat(h,"px");var d=s.offsetTop+s.clientHeight/2,f=s.offsetLeft+s.clientWidth/2;window.innerWidth<=768?0===r?(l.style.top="".concat(d-h,"px"),l.style.left="".concat(f,"px"),a.style.top="-".concat(a.clientHeight,"px"),a.style.right="-".concat(a.clientHeight/2,"px")):1===r?(l.style.top="".concat(d,"px"),l.style.left="".concat(f,"px"),a.style.top="".concat(h,"px"),a.style.right="-".concat(a.clientWidth/2,"px")):2===r?(l.style.top="".concat(d-h,"px"),l.style.left="-".concat(u-f,"px"),a.style.top="-".concat(a.clientHeight,"px"),a.style.left="-".concat(a.clientWidth/2,"px")):3===r&&(l.style.top="".concat(d,"px"),l.style.left="-".concat(u-f,"px"),a.style.bottom="-".concat(a.clientHeight,"px"),a.style.left="-".concat(a.clientHeight/2,"px")):0===r||1===r?(l.style.top="".concat(d-h,"px"),l.style.left="".concat(f-u,"px"),a.style.top="-".concat(a.clientHeight/2,"px"),a.style.right="".concat(u,"px")):2===r?(l.style.top="".concat(d-h,"px"),l.style.left="".concat(f,"px"),a.style.top="-".concat(a.clientHeight/2,"px"),a.style.left="".concat(u,"px")):3===r&&(l.style.top="".concat(d,"px"),l.style.left="".concat(f,"px"),a.style.bottom="-".concat(a.clientHeight/2,"px"),a.style.left="".concat(u,"px")),o.style.strokeDasharray="".concat(o.getTotalLength(),"px"),window.addEventListener("scroll",(function(t){c.target.getBoundingClientRect().top<e?(a.classList.add("show"),o.classList.add("show")):(a.classList.remove("show"),o.classList.remove("show"))}))}))}},{key:"toggleExpandCapsules",value:function(){this.capsules.forEach((function(t){t.querySelector(".btn-arrow").addEventListener("click",(function(){t.classList.toggle("expand")}))}))}}]),t}(),l={},u=function(t){var e,n=Object.prototype,r=n.hasOwnProperty,i="function"==typeof Symbol?Symbol:{},o=i.iterator||"@@iterator",a=i.asyncIterator||"@@asyncIterator",s=i.toStringTag||"@@toStringTag";function c(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(t){c=function(t,e,n){return t[e]=n}}function l(t,e,n,r){var i=e&&e.prototype instanceof m?e:m,o=Object.create(i.prototype),a=new j(r||[]);return o._invoke=function(t,e,n){var r=h;return function(i,o){if(r===f)throw new Error("Generator is already running");if(r===p){if("throw"===i)throw o;return I()}for(n.method=i,n.arg=o;;){var a=n.delegate;if(a){var s=S(a,n);if(s){if(s===v)continue;return s}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===h)throw r=p,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=f;var c=u(t,e,n);if("normal"===c.type){if(r=n.done?p:d,c.arg===v)continue;return{value:c.arg,done:n.done}}"throw"===c.type&&(r=p,n.method="throw",n.arg=c.arg)}}}(t,n,a),o}function u(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}t.wrap=l;var h="suspendedStart",d="suspendedYield",f="executing",p="completed",v={};function m(){}function y(){}function g(){}var L={};c(L,o,(function(){return this}));var w=Object.getPrototypeOf,b=w&&w(w(_([])));b&&b!==n&&r.call(b,o)&&(L=b);var x=g.prototype=m.prototype=Object.create(L);function E(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function k(t,e){function n(i,o,a,s){var c=u(t[i],t,o);if("throw"!==c.type){var l=c.arg,h=l.value;return h&&"object"==typeof h&&r.call(h,"__await")?e.resolve(h.__await).then((function(t){n("next",t,a,s)}),(function(t){n("throw",t,a,s)})):e.resolve(h).then((function(t){l.value=t,a(l)}),(function(t){return n("throw",t,a,s)}))}s(c.arg)}var i;this._invoke=function(t,r){function o(){return new e((function(e,i){n(t,r,e,i)}))}return i=i?i.then(o,o):o()}}function S(t,n){var r=t.iterator[n.method];if(r===e){if(n.delegate=null,"throw"===n.method){if(t.iterator.return&&(n.method="return",n.arg=e,S(t,n),"throw"===n.method))return v;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return v}var i=u(r,t.iterator,n.arg);if("throw"===i.type)return n.method="throw",n.arg=i.arg,n.delegate=null,v;var o=i.arg;return o?o.done?(n[t.resultName]=o.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=e),n.delegate=null,v):o:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,v)}function B(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function T(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function j(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(B,this),this.reset(!0)}function _(t){if(t){var n=t[o];if(n)return n.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var i=-1,a=function n(){for(;++i<t.length;)if(r.call(t,i))return n.value=t[i],n.done=!1,n;return n.value=e,n.done=!0,n};return a.next=a}}return{next:I}}function I(){return{value:e,done:!0}}return y.prototype=g,c(x,"constructor",g),c(g,"constructor",y),y.displayName=c(g,s,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===y||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,g):(t.__proto__=g,c(t,s,"GeneratorFunction")),t.prototype=Object.create(x),t},t.awrap=function(t){return{__await:t}},E(k.prototype),c(k.prototype,a,(function(){return this})),t.AsyncIterator=k,t.async=function(e,n,r,i,o){void 0===o&&(o=Promise);var a=new k(l(e,n,r,i),o);return t.isGeneratorFunction(n)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},E(x),c(x,s,"Generator"),c(x,o,(function(){return this})),c(x,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){for(;e.length;){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},t.values=_,j.prototype={constructor:j,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(T),!t)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var n=this;function i(r,i){return s.type="throw",s.arg=t,n.next=r,i&&(n.method="next",n.arg=e),!!i}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],s=a.completion;if("root"===a.tryLoc)return i("end");if(a.tryLoc<=this.prev){var c=r.call(a,"catchLoc"),l=r.call(a,"finallyLoc");if(c&&l){if(this.prev<a.catchLoc)return i(a.catchLoc,!0);if(this.prev<a.finallyLoc)return i(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return i(a.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return i(a.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var i=this.tryEntries[n];if(i.tryLoc<=this.prev&&r.call(i,"finallyLoc")&&this.prev<i.finallyLoc){var o=i;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var a=o?o.completion:{};return a.type=t,a.arg=e,o?(this.method="next",this.next=o.finallyLoc,v):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),v},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),T(n),v}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var i=r.arg;T(n)}return i}}throw new Error("illegal catch attempt")},delegateYield:function(t,n,r){return this.delegate={iterator:_(t),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=e),v}},t}(l);try{regeneratorRuntime=u}catch(t){"object"==typeof globalThis?globalThis.regeneratorRuntime=u:Function("r","regeneratorRuntime = r")(u)}var h=function(){"use strict";function r(){n(this,r),this.labels=document.querySelectorAll(".form-control label"),this.form=document.getElementById("contact-form"),this.inputFields=document.querySelectorAll(".control"),this.name=document.getElementById("form-name"),this.subject=document.getElementById("form-subject"),this.mail=document.getElementById("form-email"),this.message=document.getElementById("form-message"),this.submitContactBtn=document.getElementById("submit-contact-btn"),this.loaderContact=document.getElementById("loader-contact"),this.successMessage=document.getElementById("success-message"),this.errorMessage=document.getElementById("error-message"),this.initForm()}return i(r,[{key:"initForm",value:function(){var t=this;this.clearInputs(),this.animateLabel(),this.inputFields.forEach((function(e){e.addEventListener("input",t.focusOnInput.bind(t))})),this.onSubmitForm()}},{key:"isFormValid",value:function(){return this.name.validity.valid&&this.mail.validity.valid&&this.subject.validity.valid&&this.message.validity.valid}},{key:"clearInputs",value:function(){this.inputFields.forEach((function(t){t.value=""}))}},{key:"focusOnInput",value:function(t){this.isFormValid()?this.submitContactBtn.removeAttribute("disabled"):this.submitContactBtn.setAttribute("disabled","disabled"),t&&""!==t.target.value?(t.target.classList.add("filled"),t.target.parentNode.lastElementChild.classList.add("invisible")):(t.target.classList.remove("filled"),t.target.parentNode.lastElementChild.classList.remove("invisible"))}},{key:"animateLabel",value:function(){this.labels.forEach((function(t){t.innerHTML=t.innerText.split("").map((function(t,e){return'<span style="transition-delay:'.concat(50*e,'ms">').concat(t,"</span>")})).join("")}))}},{key:"onSubmitForm",value:function(){var t=this;this.submitContactBtn.addEventListener("click",(function(){return t.submitForm()}))}},{key:"submitForm",value:function(){return(n=t(l).mark((function e(){var n,r;return t(l).wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(this.isFormValid){t.next=2;break}return t.abrupt("return");case 2:return n={name:this.name.value.trim(),email:this.mail.value.trim(),subject:this.subject.value,message:this.message.value},this.loaderContact.classList.remove("hidden"),this.form.classList.add("loading"),this.errorMessage.classList.add("hidden"),t.prev=6,t.next=9,fetch("https://tristan-deloris-pro.herokuapp.com/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});case 9:if(201!==(r=t.sent).status){t.next=14;break}this.loaderContact.classList.add("hidden"),this.form.classList.add("hidden"),this.successMessage.classList.remove("hidden"),t.next=19;break;case 14:throw console.log("error:",r.status,r),this.form.classList.remove("loading"),this.loaderContact.classList.add("hidden"),this.errorMessage.classList.remove("hidden"),new Error("Something went wrong");case 19:t.next=27;break;case 21:throw t.prev=21,t.t0=t.catch(6),this.form.classList.remove("loading"),this.errorMessage.classList.remove("hidden"),this.loaderContact.classList.add("hidden"),new Error("Something went wrong");case 27:case"end":return t.stop()}}),e,this,[[6,21]])})).bind(this),function(){var t=this,r=arguments;return new Promise((function(i,o){var a=n.apply(t,r);function s(t){e(a,i,o,s,c,"next",t)}function c(t){e(a,i,o,s,c,"throw",t)}s(void 0)}))})();var n}}]),r}();new o,new a,new s,new c,new h}();