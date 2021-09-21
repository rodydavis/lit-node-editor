!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const s of e)if("childList"===s.type)for(const e of s.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const e="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,t=(e,t,s=null)=>{for(;t!==s;){const s=t.nextSibling;e.removeChild(t),t=s}},s=`{{lit-${String(Math.random()).slice(2)}}}`,i=`\x3c!--${s}--\x3e`,n=new RegExp(`${s}|${i}`);class r{constructor(e,t){this.parts=[],this.element=t;const i=[],r=[],a=document.createTreeWalker(t.content,133,null,!1);let l=0,c=-1,p=0;const{strings:u,values:{length:g}}=e;for(;p<g;){const e=a.nextNode();if(null!==e){if(c++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:s}=t;let i=0;for(let e=0;e<s;e++)o(t[e].name,"$lit$")&&i++;for(;i-- >0;){const t=u[p],s=h.exec(t)[2],i=s.toLowerCase()+"$lit$",r=e.getAttribute(i);e.removeAttribute(i);const o=r.split(n);this.parts.push({type:"attribute",index:c,name:s,strings:o}),p+=o.length-1}}"TEMPLATE"===e.tagName&&(r.push(e),a.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(s)>=0){const s=e.parentNode,r=t.split(n),a=r.length-1;for(let t=0;t<a;t++){let i,n=r[t];if(""===n)i=d();else{const e=h.exec(n);null!==e&&o(e[2],"$lit$")&&(n=n.slice(0,e.index)+e[1]+e[2].slice(0,-"$lit$".length)+e[3]),i=document.createTextNode(n)}s.insertBefore(i,e),this.parts.push({type:"node",index:++c})}""===r[a]?(s.insertBefore(d(),e),i.push(e)):e.data=r[a],p+=a}}else if(8===e.nodeType)if(e.data===s){const t=e.parentNode;null!==e.previousSibling&&c!==l||(c++,t.insertBefore(d(),e)),l=c,this.parts.push({type:"node",index:c}),null===e.nextSibling?e.data="":(i.push(e),c--),p++}else{let t=-1;for(;-1!==(t=e.data.indexOf(s,t+1));)this.parts.push({type:"node",index:-1}),p++}}else a.currentNode=r.pop()}for(const s of i)s.parentNode.removeChild(s)}}const o=(e,t)=>{const s=e.length-t.length;return s>=0&&e.slice(s)===t},a=e=>-1!==e.index,d=()=>document.createComment(""),h=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function l(e,t){const{element:{content:s},parts:i}=e,n=document.createTreeWalker(s,133,null,!1);let r=p(i),o=i[r],a=-1,d=0;const h=[];let l=null;for(;n.nextNode();){a++;const e=n.currentNode;for(e.previousSibling===l&&(l=null),t.has(e)&&(h.push(e),null===l&&(l=e)),null!==l&&d++;void 0!==o&&o.index===a;)o.index=null!==l?-1:o.index-d,r=p(i,r),o=i[r]}h.forEach((e=>e.parentNode.removeChild(e)))}const c=e=>{let t=11===e.nodeType?0:1;const s=document.createTreeWalker(e,133,null,!1);for(;s.nextNode();)t++;return t},p=(e,t=-1)=>{for(let s=t+1;s<e.length;s++){const t=e[s];if(a(t))return s}return-1};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const u=new WeakMap,g=e=>"function"==typeof e&&u.has(e),f={},m={};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class y{constructor(e,t,s){this.__parts=[],this.template=e,this.processor=t,this.options=s}update(e){let t=0;for(const s of this.__parts)void 0!==s&&s.setValue(e[t]),t++;for(const s of this.__parts)void 0!==s&&s.commit()}_clone(){const t=e?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),s=[],i=this.template.parts,n=document.createTreeWalker(t,133,null,!1);let r,o=0,d=0,h=n.nextNode();for(;o<i.length;)if(r=i[o],a(r)){for(;d<r.index;)d++,"TEMPLATE"===h.nodeName&&(s.push(h),n.currentNode=h.content),null===(h=n.nextNode())&&(n.currentNode=s.pop(),h=n.nextNode());if("node"===r.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(h.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(h,r.name,r.strings,this.options));o++}else this.__parts.push(void 0),o++;return e&&(document.adoptNode(t),customElements.upgrade(t)),t}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const v=window.trustedTypes&&trustedTypes.createPolicy("lit-html",{createHTML:e=>e}),_=` ${s} `;class w{constructor(e,t,s,i){this.strings=e,this.values=t,this.type=s,this.processor=i}getHTML(){const e=this.strings.length-1;let t="",n=!1;for(let r=0;r<e;r++){const e=this.strings[r],o=e.lastIndexOf("\x3c!--");n=(o>-1||n)&&-1===e.indexOf("--\x3e",o+1);const a=h.exec(e);t+=null===a?e+(n?_:i):e.substr(0,a.index)+a[1]+a[2]+"$lit$"+a[3]+s}return t+=this.strings[e],t}getTemplateElement(){const e=document.createElement("template");let t=this.getHTML();return void 0!==v&&(t=v.createHTML(t)),e.innerHTML=t,e}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const S=e=>null===e||!("object"==typeof e||"function"==typeof e),x=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class N{constructor(e,t,s){this.dirty=!0,this.element=e,this.name=t,this.strings=s,this.parts=[];for(let i=0;i<s.length-1;i++)this.parts[i]=this._createPart()}_createPart(){return new b(this)}_getValue(){const e=this.strings,t=e.length-1,s=this.parts;if(1===t&&""===e[0]&&""===e[1]){const e=s[0].value;if("symbol"==typeof e)return String(e);if("string"==typeof e||!x(e))return e}let i="";for(let n=0;n<t;n++){i+=e[n];const t=s[n];if(void 0!==t){const e=t.value;if(S(e)||!x(e))i+="string"==typeof e?e:String(e);else for(const t of e)i+="string"==typeof t?t:String(t)}}return i+=e[t],i}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class b{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===f||S(e)&&e===this.value||(this.value=e,g(e)||(this.committer.dirty=!0))}commit(){for(;g(this.value);){const e=this.value;this.value=f,e(this)}this.value!==f&&this.committer.commit()}}class P{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(d()),this.endNode=e.appendChild(d())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=d()),e.__insert(this.endNode=d())}insertAfterPart(e){e.__insert(this.startNode=d()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;g(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=f,e(this)}const e=this.__pendingValue;e!==f&&(S(e)?e!==this.value&&this.__commitText(e):e instanceof w?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):x(e)?this.__commitIterable(e):e===m?(this.value=m,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,s="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=s:this.__commitNode(document.createTextNode(s)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof y&&this.value.template===t)this.value.update(e.values);else{const s=new y(t,e.processor,this.options),i=s._clone();s.update(e.values),this.__commitNode(i),this.value=s}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let s,i=0;for(const n of e)s=t[i],void 0===s&&(s=new P(this.options),t.push(s),0===i?s.appendIntoPart(this):s.insertAfterPart(t[i-1])),s.setValue(n),s.commit(),i++;i<t.length&&(t.length=i,this.clear(s&&s.endNode))}clear(e=this.startNode){t(this.startNode.parentNode,e.nextSibling,this.endNode)}}class E{constructor(e,t,s){if(this.value=void 0,this.__pendingValue=void 0,2!==s.length||""!==s[0]||""!==s[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=s}setValue(e){this.__pendingValue=e}commit(){for(;g(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=f,e(this)}if(this.__pendingValue===f)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=f}}class C extends N{constructor(e,t,s){super(e,t,s),this.single=2===s.length&&""===s[0]&&""===s[1]}_createPart(){return new k(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class k extends b{}let A=!1;(()=>{try{const e={get capture(){return A=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class T{constructor(e,t,s){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=s,this.__boundHandleEvent=e=>this.handleEvent(e)}setValue(e){this.__pendingValue=e}commit(){for(;g(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=f,e(this)}if(this.__pendingValue===f)return;const e=this.__pendingValue,t=this.value,s=null==e||null!=t&&(e.capture!==t.capture||e.once!==t.once||e.passive!==t.passive),i=null!=e&&(null==t||s);s&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),i&&(this.__options=O(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=f}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const O=e=>e&&(A?{capture:e.capture,passive:e.passive,once:e.once}:e.capture)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */;function M(e){let t=$.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},$.set(e.type,t));let i=t.stringsArray.get(e.strings);if(void 0!==i)return i;const n=e.strings.join(s);return i=t.keyString.get(n),void 0===i&&(i=new r(e,e.getTemplateElement()),t.keyString.set(n,i)),t.stringsArray.set(e.strings,i),i}const $=new Map,U=new WeakMap;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const V=new
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class{handleAttributeExpressions(e,t,s,i){const n=t[0];if("."===n){return new C(e,t.slice(1),s).parts}if("@"===n)return[new T(e,t.slice(1),i.eventContext)];if("?"===n)return[new E(e,t.slice(1),s)];return new N(e,t,s).parts}handleTextExpression(e){return new P(e)}};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.4.1");const L=(e,...t)=>new w(e,t,"html",V)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */,R=(e,t)=>`${e}--${t}`;let I=!0;void 0===window.ShadyCSS?I=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),I=!1);const z=e=>t=>{const i=R(t.type,e);let n=$.get(i);void 0===n&&(n={stringsArray:new WeakMap,keyString:new Map},$.set(i,n));let o=n.stringsArray.get(t.strings);if(void 0!==o)return o;const a=t.strings.join(s);if(o=n.keyString.get(a),void 0===o){const s=t.getTemplateElement();I&&window.ShadyCSS.prepareTemplateDom(s,e),o=new r(t,s),n.keyString.set(a,o)}return n.stringsArray.set(t.strings,o),o},q=["html","svg"],F=new Set,j=(e,t,s)=>{F.add(e);const i=s?s.element:document.createElement("template"),n=t.querySelectorAll("style"),{length:r}=n;if(0===r)return void window.ShadyCSS.prepareTemplateStyles(i,e);const o=document.createElement("style");for(let h=0;h<r;h++){const e=n[h];e.parentNode.removeChild(e),o.textContent+=e.textContent}(e=>{q.forEach((t=>{const s=$.get(R(t,e));void 0!==s&&s.keyString.forEach((e=>{const{element:{content:t}}=e,s=new Set;Array.from(t.querySelectorAll("style")).forEach((e=>{s.add(e)})),l(e,s)}))}))})(e);const a=i.content;s?function(e,t,s=null){const{element:{content:i},parts:n}=e;if(null==s)return void i.appendChild(t);const r=document.createTreeWalker(i,133,null,!1);let o=p(n),a=0,d=-1;for(;r.nextNode();)for(d++,r.currentNode===s&&(a=c(t),s.parentNode.insertBefore(t,s));-1!==o&&n[o].index===d;){if(a>0){for(;-1!==o;)n[o].index+=a,o=p(n,o);return}o=p(n,o)}}(s,o,a.firstChild):a.insertBefore(o,a.firstChild),window.ShadyCSS.prepareTemplateStyles(i,e);const d=a.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==d)t.insertBefore(d.cloneNode(!0),t.firstChild);else if(s){a.insertBefore(o,a.firstChild);const e=new Set;e.add(o),l(s,e)}};window.JSCompiler_renameProperty=(e,t)=>e;const W={toAttribute(e,t){switch(t){case Boolean:return e?"":null;case Object:case Array:return null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){switch(t){case Boolean:return null!==e;case Number:return null===e?null:Number(e);case Object:case Array:return JSON.parse(e)}return e}},H=(e,t)=>t!==e&&(t==t||e==e),B={attribute:!0,type:String,converter:W,reflect:!1,hasChanged:H};class J extends HTMLElement{constructor(){super(),this.initialize()}static get observedAttributes(){this.finalize();const e=[];return this._classProperties.forEach(((t,s)=>{const i=this._attributeNameForProperty(s,t);void 0!==i&&(this._attributeToPropertyMap.set(i,s),e.push(i))})),e}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const e=Object.getPrototypeOf(this)._classProperties;void 0!==e&&e.forEach(((e,t)=>this._classProperties.set(t,e)))}}static createProperty(e,t=B){if(this._ensureClassProperties(),this._classProperties.set(e,t),t.noAccessor||this.prototype.hasOwnProperty(e))return;const s="symbol"==typeof e?Symbol():`__${e}`,i=this.getPropertyDescriptor(e,s,t);void 0!==i&&Object.defineProperty(this.prototype,e,i)}static getPropertyDescriptor(e,t,s){return{get(){return this[t]},set(i){const n=this[e];this[t]=i,this.requestUpdateInternal(e,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this._classProperties&&this._classProperties.get(e)||B}static finalize(){const e=Object.getPrototypeOf(this);if(e.hasOwnProperty("finalized")||e.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const e=this.properties,t=[...Object.getOwnPropertyNames(e),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e):[]];for(const s of t)this.createProperty(s,e[s])}}static _attributeNameForProperty(e,t){const s=t.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof e?e.toLowerCase():void 0}static _valueHasChanged(e,t,s=H){return s(e,t)}static _propertyValueFromAttribute(e,t){const s=t.type,i=t.converter||W,n="function"==typeof i?i:i.fromAttribute;return n?n(e,s):e}static _propertyValueToAttribute(e,t){if(void 0===t.reflect)return;const s=t.type,i=t.converter;return(i&&i.toAttribute||W.toAttribute)(e,s)}initialize(){this._updateState=0,this._updatePromise=new Promise((e=>this._enableUpdatingResolver=e)),this._changedProperties=new Map,this._saveInstanceProperties(),this.requestUpdateInternal()}_saveInstanceProperties(){this.constructor._classProperties.forEach(((e,t)=>{if(this.hasOwnProperty(t)){const e=this[t];delete this[t],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(t,e)}}))}_applyInstanceProperties(){this._instanceProperties.forEach(((e,t)=>this[t]=e)),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(e,t,s){t!==s&&this._attributeToProperty(e,s)}_propertyToAttribute(e,t,s=B){const i=this.constructor,n=i._attributeNameForProperty(e,s);if(void 0!==n){const e=i._propertyValueToAttribute(t,s);if(void 0===e)return;this._updateState=8|this._updateState,null==e?this.removeAttribute(n):this.setAttribute(n,e),this._updateState=-9&this._updateState}}_attributeToProperty(e,t){if(8&this._updateState)return;const s=this.constructor,i=s._attributeToPropertyMap.get(e);if(void 0!==i){const e=s.getPropertyOptions(i);this._updateState=16|this._updateState,this[i]=s._propertyValueFromAttribute(t,e),this._updateState=-17&this._updateState}}requestUpdateInternal(e,t,s){let i=!0;if(void 0!==e){const n=this.constructor;s=s||n.getPropertyOptions(e),n._valueHasChanged(this[e],t,s.hasChanged)?(this._changedProperties.has(e)||this._changedProperties.set(e,t),!0!==s.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(e,s))):i=!1}!this._hasRequestedUpdate&&i&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(e,t){return this.requestUpdateInternal(e,t),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(t){}const e=this.performUpdate();return null!=e&&await e,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){if(!this._hasRequestedUpdate)return;this._instanceProperties&&this._applyInstanceProperties();let e=!1;const t=this._changedProperties;try{e=this.shouldUpdate(t),e?this.update(t):this._markUpdated()}catch(s){throw e=!1,this._markUpdated(),s}e&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(t)),this.updated(t))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._updatePromise}shouldUpdate(e){return!0}update(e){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach(((e,t)=>this._propertyToAttribute(t,this[t],e))),this._reflectingProperties=void 0),this._markUpdated()}updated(e){}firstUpdated(e){}}J.finalized=!0;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const D=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,K=Symbol();class Y{constructor(e,t){if(t!==K)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){return void 0===this._styleSheet&&(D?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
(window.litElementVersions||(window.litElementVersions=[])).push("2.5.1");const X={};class Z extends J{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const e=this.getStyles();if(Array.isArray(e)){const t=(e,s)=>e.reduceRight(((e,s)=>Array.isArray(s)?t(s,e):(e.add(s),e)),s),s=t(e,new Set),i=[];s.forEach((e=>i.unshift(e))),this._styles=i}else this._styles=void 0===e?[]:[e];this._styles=this._styles.map((e=>{if(e instanceof CSSStyleSheet&&!D){const t=Array.prototype.slice.call(e.cssRules).reduce(((e,t)=>e+t.cssText),"");return new Y(String(t),K)}return e}))}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow(this.constructor.shadowRootOptions)}adoptStyles(){const e=this.constructor._styles;0!==e.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?D?this.renderRoot.adoptedStyleSheets=e.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(e.map((e=>e.cssText)),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(e){const t=this.render();super.update(e),t!==X&&this.constructor.render(t,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach((e=>{const t=document.createElement("style");t.textContent=e.cssText,this.renderRoot.appendChild(t)})))}render(){return X}}Z.finalized=!0,Z.render=(e,s,i)=>{if(!i||"object"!=typeof i||!i.scopeName)throw new Error("The `scopeName` option is required.");const n=i.scopeName,r=U.has(s),o=I&&11===s.nodeType&&!!s.host,a=o&&!F.has(n),d=a?document.createDocumentFragment():s;if(((e,s,i)=>{let n=U.get(s);void 0===n&&(t(s,s.firstChild),U.set(s,n=new P(Object.assign({templateFactory:M},i))),n.appendInto(s)),n.setValue(e),n.commit()})(e,d,Object.assign({templateFactory:z(n)},i)),a){const e=U.get(d);U.delete(d);const i=e.value instanceof y?e.value.template:void 0;j(n,d,i),t(s,s.firstChild),s.appendChild(d),U.set(s,e)}!r&&o&&window.ShadyCSS.styleElement(s.host)},Z.shadowRootOptions={mode:"open"};class G{constructor(){this.nodes=[],this.edges=[]}static fromJson(e){const{nodes:t,edges:s}=JSON.parse(e),i=new G;return t&&(i.nodes=t),s&&(i.edges=s),i}toJson(){const e={nodes:this.nodes,edges:this.edges};return JSON.stringify(e,null,2)}getNodeIndex(e){return this.nodes.findIndex((t=>t.id===e))}createNode(e){const t=this.getNodeIndex(e.id);-1===t?this.nodes.push(e):this.nodes[t]=e}retrieveNode(e){return this.nodes.find((t=>t.id===e))}retrieveEdgesForNode(e){return this.edges.filter((t=>t.startNode===e||t.endNode===e))}updateNode(e){const t=this.getNodeIndex(e.id);-1!==t&&(this.nodes[t]=e)}deleteNode(e){const t=this.getNodeIndex(e);-1!==t&&(this.nodes.splice(t,1),this.edges=this.edges.filter((t=>t.startNode!==e&&t.endNode!==e)))}getEdgeIndex(e){return this.edges.findIndex((t=>t.id===e))}createEdge(e){const t=this.getEdgeIndex(e.id);-1===t?this.edges.push(e):this.edges[t]=e}retrieveEdge(e){return this.edges.find((t=>t.id===e))}updateEdge(e){const t=this.getEdgeIndex(e.id);-1!==t&&(this.edges[t]=e)}deleteEdge(e){const t=this.getEdgeIndex(e);-1!==t&&this.edges.splice(t,1)}linkNodes(e,t,s){const i=Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15);this.createEdge({id:i,startNode:e.id,endNode:t.id,name:s})}}class Q{constructor(e){var t;this.store=new G,this.offset={x:0,y:0},this.rotation=0,this.scale=1,this.action=ee.NONE,this.selectedNodes=new Array,this.selectedEdges=new Array,this.hoveredNodes=new Array,this.matrix=[1,0,0,1,0,0],this.invMatrix=[1,0,0,1],this.shiftPressed=!1,this.onUpdate=()=>{},this.canvas=null!=(t=null==e?void 0:e.canvas)?t:document.createElement("canvas"),this.resize(null==e?void 0:e.size),this.ctx=this.canvas.getContext("2d"),this.ctx.imageSmoothingEnabled=!0,this.init()}init(){this.render(),this.canvas.addEventListener("contextmenu",(function(e){e.preventDefault()}),!1),this.canvas.addEventListener("wheel",(e=>this.onWheel(e)),!1),this.canvas.addEventListener("mousedown",(e=>this.onMouseDown(e)),!1),this.canvas.addEventListener("mousemove",(e=>this.onMouseMove(e)),!1),this.canvas.addEventListener("mouseup",(e=>this.onMouseUp(e)),!1),window.addEventListener("keydown",(e=>{this.shiftPressed=e.shiftKey})),window.addEventListener("keyup",(e=>{this.shiftPressed=!1}))}import(e){this.store=G.fromJson(e)}deleteNode(e){this.store.deleteNode(e.id),this.clear()}deleteEdge(e){this.store.deleteEdge(e.id),this.clearLinks(),this.onUpdate()}resize(e){this.size=null!=e?e:{width:window.innerWidth,height:window.innerHeight},this.canvas.setAttribute("width",`${this.size.width}px`),this.canvas.setAttribute("height",`${this.size.height}px`),this.canvas.width=this.size.width,this.canvas.height=this.size.height}onWheel(e){e.preventDefault(),e.ctrlKey?(this.action=ee.ZOOM,this.scale-=.01*e.deltaY):(this.action=ee.PAN,this.offset.x-=2*e.deltaX,this.offset.y-=2*e.deltaY),this.onUpdate(),this.action=ee.NONE}onMouseDown(e){this.start={x:e.offsetX,y:e.offsetY},this.end={x:e.offsetX,y:e.offsetY},this.action=this.shiftPressed?ee.LINK:ee.MOVE,this.clear();const t=this.getSelection(this.start);this.selectedNodes.push(...t),this.onUpdate()}onMouseUp(e){if(this.action===ee.LINK){const e=this.getSelection(this.start),t=this.getSelection(this.end);if(e.length>0&&t.length>0){const s=this.store.retrieveNode(e[e.length-1]),i=this.store.retrieveNode(t[t.length-1]);s&&i&&this.store.linkNodes(s,i,"simple")}}this.start=void 0,this.end=void 0,this.action=ee.NONE}onMouseMove(e){if(this.selectedNodes.length>0){if(this.action===ee.MOVE){const t={x:e.offsetX-this.start.x,y:e.offsetY-this.start.y},s=this.selectedNode();s&&this.moveNode(s,t),this.start={x:e.offsetX,y:e.offsetY}}this.action===ee.LINK&&(this.end={x:e.offsetX,y:e.offsetY})}else this.checkHover({x:e.offsetX,y:e.offsetY})}checkHover(e){this.hoveredNodes.splice(0,this.hoveredNodes.length);const t=this.getSelection(e);this.hoveredNodes.push(...t);const s=this.hoveredNode();this.canvas.style.cursor=s?"pointer":"default"}moveNode(e,t){e.x+=t.x/this.scale,e.y+=t.y/this.scale,this.store.updateNode(e)}selectedNode(){if(0===this.selectedNodes.length)return;const e=this.selectedNodes[this.selectedNodes.length-1];return this.store.retrieveNode(e)}hoveredNode(){if(0===this.hoveredNodes.length)return;const e=this.hoveredNodes[this.hoveredNodes.length-1];return this.store.retrieveNode(e)}clear(){this.selectedNodes.splice(0,this.selectedNodes.length),this.onUpdate()}clearLinks(){this.selectedEdges.splice(0,this.selectedEdges.length),this.onUpdate()}getSelection(e){const t=new Array,s=this.toWorld(e.x,e.y);for(const i of this.store.nodes)s.x>=i.x&&s.x<=i.x+i.width&&s.y>=i.y&&s.y<=i.y+i.height&&t.push(i.id);return t}render(){this.paint(),requestAnimationFrame((()=>this.render()))}paint(){this.ctx.setTransform(1,0,0,1,0,0),this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.renderBackground(),this.updateMatrix(),this.renderEdges(),this.renderNodes(),this.renderLink()}updateMatrix(){this.createMatrix(this.offset.x,this.offset.y,this.scale,this.rotation);const e=this.matrix;this.ctx.setTransform(e[0],e[1],e[2],e[3],e[4],e[5])}createMatrix(e,t,s,i){const n=this.matrix,r=this.invMatrix;n[3]=n[0]=Math.cos(i)*s,n[2]=-(n[1]=Math.sin(i)*s),n[4]=e,n[5]=t;const o=n[0]*n[3]-n[1]*n[2];r[0]=n[3]/o,r[1]=-n[1]/o,r[2]=-n[2]/o,r[3]=n[0]/o}toWorld(e,t){let s,i,n;return n=this.invMatrix,s=e-this.matrix[4],i=t-this.matrix[5],{x:s*n[0]+i*n[2],y:s*n[1]+i*n[3]}}renderLink(){this.action===ee.LINK&&this.scopedPaint((e=>{e.beginPath(),e.strokeStyle="red";const t=this.toWorld(this.start.x,this.start.y),s=this.toWorld(this.end.x,this.end.y);e.moveTo(t.x,t.y),e.lineTo(s.x,s.y),e.stroke()}))}renderBackground(){this.ctx.save(),this.ctx.fillStyle="whitesmoke",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height),this.ctx.restore()}renderNodes(){for(const e of this.store.nodes)this.renderNode(e)}renderEdges(){for(const e of this.store.edges)this.renderEdge(e)}renderNode(e){var t,s,i;this.ctx.save(),this.ctx.moveTo(e.x,e.y);const n=(null==(t=this.selectedNode())?void 0:t.id)===e.id,r=(null==(s=this.hoveredNode())?void 0:s.id)===e.id;this.scopedPaint((t=>{t.translate(e.x,e.y-5),t.font="12px Arial",t.textAlign="left",t.fillStyle="black",t.fillText(e.name,0,0)})),this.ctx.fillStyle=null!=(i=null==e?void 0:e.backgroundColor)?i:"white",this.ctx.fillRect(e.x,e.y,e.width,e.height),this.ctx.strokeStyle=n?"red":r?"blue":"black",this.ctx.strokeRect(e.x,e.y,e.width,e.height),this.ctx.restore()}renderEdge(e){this.scopedPaint((t=>{const s=this.selectedEdges.includes(e.id),i=this.store.retrieveNode(e.startNode),n=this.store.retrieveNode(e.endNode),r={x:i.x+i.width/2,y:i.y+i.height/2,width:i.width,height:i.height},o={x:n.x+n.width/2,y:n.y+n.height/2,width:n.width,height:n.height};t.beginPath(),t.strokeStyle=s?"purple":"black",t.moveTo(r.x,r.y),t.bezierCurveTo(r.x+r.width/2,r.y,o.x-o.width/2,o.y,o.x,o.y),t.stroke()}))}scopedPaint(e){this.ctx.save(),e(this.ctx),this.ctx.restore()}}var ee,te;(te=ee||(ee={}))[te.NONE=0]="NONE",te[te.ZOOM=1]="ZOOM",te[te.PAN=2]="PAN",te[te.MOVE=3]="MOVE",te[te.LINK=4]="LINK";var se=Object.defineProperty,ie=Object.getOwnPropertyDescriptor;"undefined"!=typeof require&&require;let ne=class extends Z{constructor(){super(...arguments),this.editor=new Q({size:{width:window.innerWidth-200,height:window.innerHeight}})}render(){return L`<main>
      <div id="output">${this.editor.canvas}</div>
      <div id="properties">
        <span class="title">Properties</span>
        ${this.renderProperties()}
      </div>
    </main>`}renderProperties(){var e;const t=this.editor.selectedNode();if(!t)return L`<div>
        <div class="property">
          <label>Import JSON</label>
          <input
            type="file"
            accept=".json"
            @change=${e=>{const t=e.target.files;if(t.length){this.editor.clear();const e=new FileReader;e.onload=e=>{const t=e.target.result;this.editor.import(t)},e.readAsText(t[0])}}}
          />
        </div>
        <div class="property">
          <label>Scale</label>
          <input
            type="number"
            .value=${this.editor.scale.toString()}
            step=".1"
            @change=${e=>{this.editor.scale=Number(e.target.value)}}
          />
        </div>
        <div class="property">
          <label>Rotation</label>
          <input
            type="number"
            .value=${this.editor.rotation.toString()}
            step=".1"
            @change=${e=>{this.editor.rotation=Number(e.target.value)}}
          />
        </div>
        <div class="property">
          <label>Offset x</label>
          <input
            type="number"
            .value=${this.editor.offset.x.toString()}
            step=".1"
            @change=${e=>{this.editor.offset.x=Number(e.target.value)}}
          />
        </div>
        <div class="property">
          <label>Offset x</label>
          <input
            type="number"
            .value=${this.editor.offset.y.toString()}
            step=".1"
            @change=${e=>{this.editor.offset.y=Number(e.target.value)}}
          />
        </div>
        <div class="property">
          <button
            @click=${()=>{const e=this.addRandomNode();this.editor.selectedNodes.push(e.id),this.requestUpdate()}}
          >
            Add new node
          </button>
        </div>
        <div class="property">
          <button
            @click=${()=>{const e=window.document.createElement("a"),t=this.editor.store.toJson();e.href=window.URL.createObjectURL(new Blob([t],{type:"application/json"})),e.download="editor.json",document.body.appendChild(e),e.click()}}
          >
            Export JSON
          </button>
        </div>
      </div>`;const s=this.editor.store.retrieveEdgesForNode(t.id);return L`
      <div class="property">
        <label>Name</label>
        <input
          type="text"
          .value=${t.name}
          @change=${e=>{t.name=e.target.value,this.editor.store.updateNode(t)}}
        />
      </div>
      <div class="property">
        <label>Background Color</label>
        <input
          type="color"
          .value=${null!=(e=t.backgroundColor)?e:"#FFFFFF"}
          @change=${e=>{t.backgroundColor=e.target.value,this.editor.store.updateNode(t)}}
        />
      </div>
      <div class="property">
        <label>Width</label>
        <input
          type="number"
          .value=${t.width.toString()}
          @change=${e=>{t.width=Number(e.target.value),this.editor.store.updateNode(t)}}
        />
      </div>
      <div class="property">
        <label>Height</label>
        <input
          type="number"
          .value=${t.height.toString()}
          @change=${e=>{t.height=Number(e.target.value),this.editor.store.updateNode(t)}}
        />
      </div>
      <div id="links">
        <span>Links</span>
        ${s.map((e=>L`<div class="property">
            <span>[${e.startNode}-${e.endNode}]</span>
            <input
              type="text"
              .value=${e.name}
              @change=${t=>{e.name=t.target.value,this.editor.store.updateEdge(e)}}
            />
            <button
              @click=${()=>{this.editor.clearLinks(),this.requestUpdate(),this.editor.selectedEdges.push(e.id)}}
            >
              Select link
            </button>
            <button
              class="destructive"
              @click=${()=>{confirm("Are you sure?")&&this.editor.deleteEdge(e)}}
            >
              Delete link
            </button>
          </div>`))}
      </div>
      <div class="property">
        <button
          class="destructive"
          @click=${()=>{confirm("Are you sure?")&&this.editor.deleteNode(t)}}
        >
          Delete node
        </button>
      </div>
    `}firstUpdated(){for(let e=0;e<10;e++)this.addRandomNode(e);for(let e=0;e<5;e++){const t=this.editor.store.nodes[e],s=this.editor.store.nodes[e+5];this.editor.store.linkNodes(t,s,"simple")}this.editor.onUpdate=()=>{this.requestUpdate()},window.addEventListener("resize",(()=>{this.editor.resize({width:window.innerWidth-200,height:window.innerHeight})}))}addRandomNode(e=this.editor.store.nodes.length){const t={id:`node${e}`,name:"Node "+e,x:Math.random()*this.editor.canvas.width,y:Math.random()*this.editor.canvas.height,width:100,height:100};return this.editor.store.createNode(t),t}};var re;
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/ne.styles=((e,...t)=>{const s=t.reduce(((t,s,i)=>t+(e=>{if(e instanceof Y)return e.cssText;if("number"==typeof e)return e;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${e}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(s)+e[i+1]),e[0]);return new Y(s,K)})`
    main {
      display: flex;
      flex-direction: row;
    }
    #output {
      flex: 1;
    }
    #properties {
      width: ${200}px;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      background-color: #eee;
    }
    .property {
      display: flex;
      flex-direction: column;
      padding: 10px;
    }
    .title {
      font-size: 1.5em;
      font-weight: bold;
      padding: 10px;
    }
    .destructive {
      background-color: red;
      color: white;
    }
    #links > span {
      padding-left: 10px;
      font-size: 0.9em;
      font-weight: bold;
    }
  `,ne=((e,t,s,i)=>{for(var n,r=i>1?void 0:i?ie(t,s):t,o=e.length-1;o>=0;o--)(n=e[o])&&(r=(i?n(t,s,r):n(r))||r);return i&&r&&se(t,s,r),r})([(re="node-editor",e=>"function"==typeof e?((e,t)=>(window.customElements.define(e,t),t))(re,e):((e,t)=>{const{kind:s,elements:i}=t;return{kind:s,elements:i,finisher(t){window.customElements.define(e,t)}}})(re,e))],ne);
