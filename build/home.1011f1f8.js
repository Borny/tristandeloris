parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"LDUH":[function(require,module,exports) {

},{"/home/mat/projects/tristandeloris-pro/tristandeloris/src/img/pics/crater-center.jpg":[["crater-center.f4ae935a.jpg","eNcj"],"eNcj"]}],"omcO":[function(require,module,exports) {
module.exports="rail-road-down-center.a9f95586.jpg";
},{}],"CiBw":[function(require,module,exports) {
module.exports="hourtin-sunset.41cc5768.jpg";
},{}],"l9pR":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Hero=void 0;var e=t(require("../img/pics/rail-road-down-center.jpg")),i=t(require("../img/pics/hourtin-sunset.jpg"));function t(e){return e&&e.__esModule?e:{default:e}}class o{constructor(){this.heroSection=document.querySelector(".hero"),this.imgsMobile=document.querySelectorAll(".hero__bg-img--mobile"),this.imgsDesktop=document.querySelectorAll(".hero__bg-img--desktop"),this.imgTransition=5e3}initHero(){let e=0,i=this.imgsMobile;window.innerWidth>=992&&(i=this.imgsDesktop),setInterval(()=>{i.forEach(e=>e.classList.remove("active")),++e>i.length-1&&(e=0),i[e].classList.add("active")},this.imgTransition)}}exports.Hero=o;
},{"../img/pics/rail-road-down-center.jpg":"omcO","../img/pics/hourtin-sunset.jpg":"CiBw"}],"eJ23":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Work=void 0;class e{constructor(){this.projects=document.querySelectorAll(".project")}toggleProjectPanels(){window.innerWidth>=992&&this.projects[0].classList.add("active"),this.projects.forEach(e=>{e.addEventListener("click",()=>{this.projects.forEach(e=>{e.classList.remove("active")}),e.classList.add("active")})})}}exports.Work=e;
},{}],"H3RA":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.About=void 0;class t{constructor(){this.capsules=document.querySelectorAll(".capsule"),this.target=document.getElementById("target"),this.skills=document.querySelectorAll(".skill")}initAbout(){this.animateSkills(),this.toggleExpandCapsules()}animateSkills(){const t=window.innerHeight/3*2;this.skills.forEach((e,c)=>{const l=e.querySelector(".svg-container");let o,s,n,i;window.innerWidth<=992?(o=e.querySelector(".svg-line--mobile"),s=o.querySelector(".path"),n=e.querySelector(".capsule"),i=e.querySelector(".dot")):(o=e.querySelector(".svg-line--desktop"),s=o.querySelector(".path"),n=e.querySelector(".capsule"),i=e.querySelector(".dot"));const a=o.clientWidth,p=o.clientHeight;l.style.width="".concat(a,"px"),l.style.height="".concat(p,"px");const r=i.offsetTop+i.clientHeight/2,y=i.offsetLeft+i.clientWidth/2;window.innerWidth<=992?0===c?(l.style.top="".concat(r-p,"px"),l.style.left="".concat(y,"px"),n.style.top="-".concat(n.clientHeight,"px"),n.style.right="-".concat(n.clientHeight/2,"px")):1===c?(l.style.top="".concat(r,"px"),l.style.left="".concat(y,"px"),n.style.top="".concat(p,"px"),n.style.right="-".concat(n.clientWidth/2,"px")):2===c?(l.style.top="".concat(r-p,"px"),l.style.left="-".concat(a-y,"px"),n.style.top="-".concat(n.clientHeight,"px"),n.style.left="-".concat(n.clientWidth/2,"px")):3===c&&(l.style.top="".concat(r,"px"),l.style.left="-".concat(a-y,"px"),n.style.bottom="-".concat(n.clientHeight,"px"),n.style.left="-".concat(n.clientHeight/2,"px")):0===c||1===c?(l.style.top="".concat(r-p,"px"),l.style.left="".concat(y-a,"px"),n.style.top="-".concat(n.clientHeight/2,"px"),n.style.right="".concat(a,"px")):2===c?(l.style.top="".concat(r-p,"px"),l.style.left="".concat(y,"px"),n.style.top="-".concat(n.clientHeight/2,"px"),n.style.left="".concat(a,"px")):3===c&&(l.style.top="".concat(r,"px"),l.style.left="".concat(y,"px"),n.style.bottom="-".concat(n.clientHeight/2,"px"),n.style.left="".concat(a,"px")),s.style.strokeDasharray="".concat(s.getTotalLength(),"px"),window.addEventListener("scroll",e=>{this.target.getBoundingClientRect().top<t?(n.classList.add("show"),s.classList.add("show")):(n.classList.remove("show"),s.classList.remove("show"))})})}toggleExpandCapsules(){this.capsules.forEach(t=>{t.querySelector(".btn-arrow").addEventListener("click",()=>{t.classList.toggle("expand")})})}}exports.About=t;
},{}],"QKHM":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Contact=void 0;class t{constructor(){this.labels=document.querySelectorAll(".form-control label"),this.form=document.getElementById("contact-form"),this.inputFields=document.querySelectorAll(".control"),this.name=document.getElementById("form-name"),this.subject=document.getElementById("form-subject"),this.mail=document.getElementById("form-email"),this.message=document.getElementById("form-message"),this.submitContactBtn=document.getElementById("submit-contact-btn"),this.loaderContact=document.getElementById("loader-contact"),this.successMessage=document.getElementById("success-message"),this.errorMessage=document.getElementById("error-message")}initForm(){this.clearInputs(),this.animateLabel(),this.inputFields.forEach(t=>{t.addEventListener("input",this.focusOnInput.bind(this))}),this.onSubmitForm()}isFormValid(){return this.name.validity.valid&&this.mail.validity.valid&&this.subject.validity.valid&&this.message.validity.valid}clearInputs(){this.inputFields.forEach(t=>{t.value=""})}focusOnInput(t){this.isFormValid()?this.submitContactBtn.removeAttribute("disabled"):this.submitContactBtn.setAttribute("disabled","disabled"),t&&""!==t.target.value?(t.target.classList.add("filled"),t.target.parentNode.lastElementChild.classList.add("invisible")):(t.target.classList.remove("filled"),t.target.parentNode.lastElementChild.classList.remove("invisible"))}animateLabel(){this.labels.forEach(t=>{t.innerHTML=t.innerText.split("").map((t,e)=>'<span style="transition-delay:'.concat(50*e,'ms">').concat(t,"</span>")).join("")})}onSubmitForm(){this.submitContactBtn.addEventListener("click",()=>this.submitForm())}async submitForm(){if(!this.isFormValid)return;const t={name:this.name.value,email:this.mail.value.trim(),subject:this.subject.value,message:this.message.value};this.loaderContact.classList.remove("hidden"),this.form.classList.add("loading"),this.errorMessage.classList.add("hidden");try{const s=await fetch("https://tristandeloris.herokuapp.com/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(200!==s.status)throw console.log("error:",s.status,s),this.form.classList.remove("loading"),this.loaderContact.classList.add("hidden"),this.errorMessage.classList.remove("hidden"),new Error("Something went wrong");this.loaderContact.classList.add("hidden"),this.form.classList.add("hidden"),this.successMessage.classList.remove("hidden")}catch(e){throw console.log("contact error:",e),this.form.classList.remove("loading"),this.errorMessage.classList.remove("hidden"),this.loaderContact.classList.add("hidden"),new Error("Something went wrong")}}}exports.Contact=t;
},{}],"nqs3":[function(require,module,exports) {
"use strict";require("../styles/main.scss");var e=require("./hero"),r=require("./work"),t=require("./about"),o=require("./contact");const n=new e.Hero;n.initHero();const i=new r.Work;i.toggleProjectPanels();const s=new t.About;s.initAbout();const c=new o.Contact;c.initForm();
},{"../styles/main.scss":"LDUH","./hero":"l9pR","./work":"eJ23","./about":"H3RA","./contact":"QKHM"}]},{},["nqs3"], null)