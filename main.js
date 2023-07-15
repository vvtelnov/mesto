(()=>{"use strict";function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(e,n){for(var r=0;r<n.length;r++){var o=n[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,(void 0,i=function(e,n){if("object"!==t(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,"string");if("object"!==t(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(o.key),"symbol"===t(i)?i:String(i)),o)}var i}var n=function(){function t(e){var n=e.token,r=e.groupId;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._baseUrl="https://mesto.nomoreparties.co/v1/",this._token=n,this._groupId=r,this._fetchHeader={authorization:this._token,"Content-Type":"application/json"}}var n,r;return n=t,(r=[{key:"_getResponseData",value:function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}},{key:"getUserInfoFromDB",value:function(){return fetch("".concat(this._baseUrl).concat(this._groupId,"/users/me"),{headers:this._fetchHeader,method:"GET"}).then(this._getResponseData)}},{key:"updateUserInfo",value:function(t,e){return fetch("".concat(this._baseUrl).concat(this._groupId,"/users/me"),{headers:this._fetchHeader,method:"PATCH",body:JSON.stringify({name:t,about:e})}).then(this._getResponseData)}},{key:"updateUserAvatar",value:function(t){return fetch("".concat(this._baseUrl).concat(this._groupId,"/users/me/avatar"),{headers:this._fetchHeader,method:"PATCH",body:JSON.stringify({avatar:t})}).then(this._getResponseData)}},{key:"getCards",value:function(){return fetch("".concat(this._baseUrl).concat(this._groupId,"/cards"),{headers:this._fetchHeader,method:"GET"}).then(this._getResponseData)}},{key:"postCard",value:function(t,e){return fetch("".concat(this._baseUrl).concat(this._groupId,"/cards"),{headers:this._fetchHeader,method:"POST",body:JSON.stringify({name:t,link:e})}).then(this._getResponseData)}},{key:"likeCard",value:function(t){return fetch("".concat(this._baseUrl).concat(this._groupId,"/cards/").concat(t,"/likes"),{headers:this._fetchHeader,method:"PUT"}).then(this._getResponseData)}},{key:"removeCardLike",value:function(t){return fetch("".concat(this._baseUrl).concat(this._groupId,"/cards/").concat(t,"/likes"),{headers:this._fetchHeader,method:"DELETE"}).then(this._getResponseData)}},{key:"deleteCard",value:function(t){return fetch("".concat(this._baseUrl).concat(this._groupId,"/cards/").concat(t),{headers:this._fetchHeader,method:"DELETE"}).then(this._getResponseData)}}])&&e(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}();function r(t){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r(t)}function o(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,(void 0,i=function(t,e){if("object"!==r(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var o=n.call(t,"string");if("object"!==r(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(o.key),"symbol"===r(i)?i:String(i)),o)}var i}var i=function(){function t(e,n){var r=e.items,o=e.renderer;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._initItems=r,this._renderer=o,this._container=document.querySelector(n)}var e,n;return e=t,(n=[{key:"appendInitItemsToPage",value:function(){var t=this;this._container.innerHTML="",this._initItems.forEach((function(e){t.appendItemToPage(e)}))}},{key:"prependInitItemsToPage",value:function(){var t=this;this._container.innerHTML="",this._initItems.forEach((function(e){t.prependItemToPage(e)}))}},{key:"appendItemToPage",value:function(t){this._container.append(this._renderer(t))}},{key:"prependItemToPage",value:function(t){this._container.prepend(this._renderer(t))}}])&&o(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function u(t){return u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},u(t)}function a(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==u(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==u(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===u(o)?o:String(o)),r)}var o}var c=function(){function t(e){var n=e.imgName,r=e.imgLink,o=e.likes,i=e.isLiked,u=e.cardId,a=e.userId,c=e.canBeDeleted,s=e.cardTemplate,l=e.handleCardClick,f=e.handleDeleteCard,p=e.handleLikeCard;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._imgName=String(n),this._imgLink=String(r),this._likesNumb=Number(o),this._isLiked=Boolean(i),this._cardId=u,this._userId=a,this._canBeDeleted=c,this._cardTemplate=document.querySelector(s),this._handleCardClick=l,this._handleDeleteCard=f,this._handleLikeCardClick=p,this._createContentCard()}var e,n;return e=t,(n=[{key:"getReadyCardInstance",value:function(){return this._cardElement}},{key:"getCardId",value:function(){return this._cardId}},{key:"_createContentCard",value:function(){this._createEmptyContentCard(),this._fillCardWithContent(),this._setEventListeners()}},{key:"_createEmptyContentCard",value:function(){this._cardElement=this._cardTemplate.content.querySelector(".publication").cloneNode(!0),this._cardPhoto=this._cardElement.querySelector(".publication__photo"),this._cardTitle=this._cardElement.querySelector(".publication__title"),this._cardLikeButton=this._cardElement.querySelector(".publication__like-button"),this._likeCounter=this._cardElement.querySelector(".publication__like-counter"),this._cardDeleteButton=this._cardElement.querySelector(".publication__delete-button")}},{key:"_fillCardWithContent",value:function(){this._cardPhoto.src=this._imgLink,this._cardPhoto.alt=this._imgName,this._cardTitle.textContent=this._imgName,this._updLikesCounter(this._likesNumb),this._toggleLikeBtnState(),this._canBeDeleted||(this._cardDeleteButton.setAttribute("disabled",!0),this._cardDeleteButton.classList.add("publication__delete-button_disabled"))}},{key:"_setEventListeners",value:function(){var t=this;this._cardLikeButton.addEventListener("click",(function(){t._updLikesSection()})),this._canBeDeleted&&this._cardDeleteButton.addEventListener("click",(function(){t._deleteCard()})),this._cardPhoto.addEventListener("click",(function(){t._openPopupZoomImage()}))}},{key:"_updLikesSection",value:function(){var t=this;this._handleLikeCardClick(this._cardId,this._isLiked).then((function(e){t._isLiked=!t._isLiked,t._updLikesCounter(e),t._toggleLikeBtnState()})).catch((function(t){console.error("".concat(t," - (Не получается обработать нажатие на кнопку лайка)"))}))}},{key:"_updLikesCounter",value:function(t){this._likesNumb=t,this._likeCounter.textContent=this._likesNumb}},{key:"_toggleLikeBtnState",value:function(){this._isLiked?this._cardLikeButton.classList.add("publication__like-button_active"):this._cardLikeButton.classList.remove("publication__like-button_active")}},{key:"_deleteCard",value:function(){this._handleDeleteCard(this)}},{key:"deleteCardDom",value:function(){this._canBeDeleted?this._cardElement.remove():console.error("Ошибка, Данную карточку невозможно убрать со страницы")}},{key:"_openPopupZoomImage",value:function(){this._handleCardClick(this._imgName,this._imgLink)}}])&&a(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function s(t){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},s(t)}function l(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==s(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==s(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===s(o)?o:String(o)),r)}var o}var f=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._popup=document.querySelector(e),this._handleEscClose=this._handleEscClose.bind(this)}var e,n;return e=t,(n=[{key:"open",value:function(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"setEventListeners",value:function(){this._popup.addEventListener("click",this._handleCloseByClick.bind(this))}},{key:"_handleEscClose",value:function(t){"Escape"!==t.key&&"Esc"!==t.key||this.close()}},{key:"_handleCloseByClick",value:function(t){(t.target===t.currentTarget||t.target.classList.contains("popup__close-button")||t.target.classList.contains("popup__img-close-button"))&&this.close()}}])&&l(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function p(t){return p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},p(t)}function h(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==p(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==p(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===p(o)?o:String(o)),r)}var o}function d(){return d="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=m(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},d.apply(this,arguments)}function y(t,e){return y=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},y(t,e)}function m(t){return m=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},m(t)}var b=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&y(t,e)}(u,t);var e,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=m(r);if(o){var n=m(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===p(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function u(t,e,n){var r;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),(r=i.call(this,t))._formSubmitHandler=e,r._form=r._popup.querySelector("form"),r._inputsList=Array.from(r._form.querySelectorAll(".popup__text-input-form")),r._submitBtn=r._form.querySelector(".popup__save-button"),r._defaultSubmitBtnText=r._submitBtn.textContent,r._submitBtnText=n,r}return e=u,(n=[{key:"_getInputValues",value:function(){return this._inputsList.reduce((function(t,e){return t[e.id]=e.value,t}),{})}},{key:"_setInputValues",value:function(t){var e=this;Object.keys(t).forEach((function(n){var r=e._inputsList.find((function(t){return t.id===n}));r&&(r.value=t[n])}))}},{key:"setEventListeners",value:function(){var t=this;d(m(u.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",(function(e){t._changeSubmitBtnMessage(t._submitBtnText),e.preventDefault();var n=t._getInputValues();t._formSubmitHandler(n)}))}},{key:"closeWithFormReset",value:function(){this.close(),this._form.reset()}},{key:"openWithSpecifiedFormParam",value:function(t){t&&(this._setInputValues(t),this.open())}},{key:"_changeSubmitBtnMessage",value:function(t){this._submitBtn.textContent=t}},{key:"setSubmitBtnMessageToDefaultValue",value:function(){this._changeSubmitBtnMessage(this._defaultSubmitBtnText)}}])&&h(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),u}(f);function _(t){return _="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},_(t)}function v(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==_(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==_(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===_(o)?o:String(o)),r)}var o}function g(){return g="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=k(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},g.apply(this,arguments)}function S(t,e){return S=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},S(t,e)}function k(t){return k=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},k(t)}var E=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&S(t,e)}(u,t);var e,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=k(r);if(o){var n=k(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===_(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function u(t,e,n){var r;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),(r=i.call(this,t))._formSubmitHandler=e,r._form=r._popup.querySelector("form"),r._submitBtn=r._form.querySelector(".popup__save-button"),r._defaultSubmitBtnText=r._submitBtn.textContent,r._submitBtnText=n,r}return e=u,(n=[{key:"open",value:function(t){g(k(u.prototype),"open",this).call(this),this._confirmDeleteItemData=t}},{key:"setEventListeners",value:function(){var t=this;g(k(u.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",(function(e){t._changeSubmitBtnMessage(t._submitBtnText),e.preventDefault(),t._formSubmitHandler(t._confirmDeleteItemData)}))}},{key:"_changeSubmitBtnMessage",value:function(t){this._submitBtn.textContent=t}},{key:"setSubmitBtnMessageToDefaultValue",value:function(){this._changeSubmitBtnMessage(this._defaultSubmitBtnText)}}])&&v(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),u}(f);function w(t){return w="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},w(t)}function C(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==w(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==w(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===w(o)?o:String(o)),r)}var o}function P(){return P="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=O(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},P.apply(this,arguments)}function L(t,e){return L=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},L(t,e)}function O(t){return O=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},O(t)}var j=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&L(t,e)}(u,t);var e,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=O(r);if(o){var n=O(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===w(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function u(t,e,n){var r;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),(r=i.call(this,t))._imgNode=r._popup.querySelector(e),r._titleNode=r._popup.querySelector(n),r}return e=u,(n=[{key:"open",value:function(t,e){P(O(u.prototype),"open",this).call(this),this._imgNode.src=e,this._imgNode.alt=t,this._titleNode.textContent=t}}])&&C(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),u}(f);function B(t){return B="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},B(t)}function I(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==B(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==B(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===B(o)?o:String(o)),r)}var o}var T=function(){function t(e){var n=e.userNameSelector,r=e.userProfessionSelector,o=e.userAvatarSelector;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._userNameNode=document.querySelector(n),this._userProfessionNode=document.querySelector(r),this._userAvatarNode=document.querySelector(o)}var e,n;return e=t,(n=[{key:"getUserInfo",value:function(){return{name:this._userNameNode.textContent,profession:this._userProfessionNode.textContent}}},{key:"setUserInfo",value:function(t,e){this._userNameNode.textContent=t,this._userProfessionNode.textContent=e}},{key:"setUserAvatar",value:function(t){this._userAvatarNode.src=t}}])&&I(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function D(t){return D="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},D(t)}function R(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==D(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==D(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===D(o)?o:String(o)),r)}var o}var N,x,A=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._config=e,this._formElement=n,this._formInputElementsArr=Array.from(this._formElement.querySelectorAll(this._config.inputElement)),this._formSubmitButtonElement=this._formElement.querySelectorAll(this._config.buttonElement)[0]}var e,n;return e=t,(n=[{key:"enableValidation",value:function(){this.toggleButtonState(),this._setInputListener()}},{key:"_setInputListener",value:function(){var t=this;this._formInputElementsArr.forEach((function(e){e.addEventListener("input",(function(){t.toggleInputErrorMsg(e),t.toggleButtonState()}))}))}},{key:"toggleInputErrorMsg",value:function(t){t.validity.valid?this._hideInputError(t):this._showInputError(t)}},{key:"toggleButtonState",value:function(){this._formElement.checkValidity()?(this._formSubmitButtonElement.classList.remove(this._config.inactiveButtonClass),this._formSubmitButtonElement.removeAttribute("disabled")):(this._formSubmitButtonElement.classList.add(this._config.inactiveButtonClass),this._formSubmitButtonElement.setAttribute("disabled",!0))}},{key:"resetValidation",value:function(){var t=this;this._formInputElementsArr.forEach((function(e){t._hideInputError(e)})),this.toggleButtonState()}},{key:"_showInputError",value:function(t){var e=this._formElement.querySelector(".".concat(t.id,"-error"));e.classList.add(this._config.errorClass),e.textContent=t.validationMessage,t.classList.add(this._config.inputErrorClass)}},{key:"_hideInputError",value:function(t){var e=this._formElement.querySelector(".".concat(t.id,"-error"));e.classList.remove(this._config.errorClass),e.textContent="",t.classList.remove(this._config.inputErrorClass)}}])&&R(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}(),q=document.querySelector(".profile"),U=document.querySelector(".profile__edit-button"),H=q.querySelector(".profile__avatar-container"),M=document.querySelector(".profile__add-button"),V={},F={formElement:".popup__form",inputElement:".popup__text-input-form",buttonElement:".popup__save-button",inactiveButtonClass:"popup__save-button_disabled",inputErrorClass:"popup__text-input-form_error-shown",errorClass:"popup__input-error_shown"},W=new n({token:"b37ee88e-f73b-4f50-b8b1-191a1fa0a0d2",groupId:"cohort-70"}),J=new T({userNameSelector:".profile__title",userProfessionSelector:".profile__subtitle",userAvatarSelector:".profile__avatar"});function G(t,e){$.open(t,e)}function Z(t){Y.open(t)}function z(t,e){return e?W.removeCardLike(t).then((function(t){return t.likes.length})).catch((function(t){console.error("Ошибка / ".concat(t," (Не получается убрать лайк)"))})):W.likeCard(t).then((function(t){return t.likes.length})).catch((function(t){console.error("Ошибка / ".concat(t," (Не получается поставить лайк)"))}))}Array.from(document.querySelectorAll(F.formElement)).forEach((function(t){var e=new A(F,t);V[t.name]=e})),function(){for(var t in V)V[t].enableValidation()}();var K=new b("#popup-edit-profile",(function(t){var e=this,n=t["profile-title-input"],r=t["profile-subtitle-input"];W.updateUserInfo(n,r).then((function(t){t?(J.setUserInfo(t.name,t.about),e.closeWithFormReset(),e.setSubmitBtnMessageToDefaultValue()):console.error("Не удается обновить данные пользователя")})).catch((function(t){console.error("".concat(t," (Не получается изменить профиль пользователя)"))}))}),"Сохранение..."),Q=new b("#popup-edit-avatar",(function(t){var e=this,n=t["avatar-link"];W.updateUserAvatar(n).then((function(t){t?(J.setUserAvatar(t.avatar),e.closeWithFormReset(),e.setSubmitBtnMessageToDefaultValue()):console.error("Не удается обновить аватар пользователя")})).catch((function(t){console.error("".concat(t," (Не получается изменить аватар пользователя)"))}))}),"Сохранение..."),X=new b("#popup-new-place",(function(t){var e=this,n=t["new-pub-name"],r=t["new-pub-link"];W.postCard(n,r).then((function(t){x.prependItemToPage(t),V["add-new-publication"].toggleButtonState(),e.closeWithFormReset(),e.setSubmitBtnMessageToDefaultValue()})).catch((function(t){console.log("".concat(t," (Не получается загрузить новый пост)"))}))}),"Создание..."),Y=new E("#popup-confirm-delete",(function(t){var e=this;W.deleteCard(t.getCardId()).then((function(n){n&&(t.deleteCardDom(),e.close(),e.setSubmitBtnMessageToDefaultValue())})).catch((function(t){console.log("".concat(t," (Возникла ошибка при удалении поста)"))}))}),"Удаление..."),$=new j("#popup-big-img",".popup__image",".popup__pub-title");U.addEventListener("click",(function(){return K.openWithSpecifiedFormParam({"profile-title-input":(t=J.getUserInfo()).name,"profile-subtitle-input":t.profession});var t})),H.addEventListener("click",(function(){return Q.open()})),M.addEventListener("click",(function(){return X.open()})),K.setEventListeners(),Q.setEventListeners(),X.setEventListeners(),Y.setEventListeners(),$.setEventListeners(),Promise.all([W.getUserInfoFromDB(),W.getCards()]).then((function(t){var e=t[0];N=e._id;var n,r=t[1];n=r,Array.isArray(n)||(n=Array.from(n)),n.sort((function(t,e){return new Date(t.createdAt)-new Date(e.createdAt)})),e?(J.setUserInfo(e.name,e.about),J.setUserAvatar(e.avatar)):(console.error("Не удалось получить данные пользователя из Базы данных"),console.log("Устанавливаем значения по умолчанию..."),J.setUserInfo("Жак-Ив Кусто","Исследователь океана")),(x=new i({items:r,renderer:function(t){return new c({imgName:t.name,imgLink:t.link,likes:t.likes.length,isLiked:t.likes.find((function(t){return t._id===N})),cardId:t._id,userId:N,canBeDeleted:t.owner._id===N,cardTemplate:"#publication-template",handleCardClick:G,handleDeleteCard:Z,handleLikeCard:z}).getReadyCardInstance()}},".publications")).prependInitItemsToPage()})).catch((function(t){console.error("Ошибка / ".concat(t))}))})();