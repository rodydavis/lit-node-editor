!function(){const t=document.createElement("link").relList;if(!(t&&t.supports&&t.supports("modulepreload"))){for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver((t=>{for(const s of t)if("childList"===s.type)for(const t of s.addedNodes)"LINK"===t.tagName&&"modulepreload"===t.rel&&e(t)})).observe(document,{childList:!0,subtree:!0})}function e(t){if(t.ep)return;t.ep=!0;const e=function(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerpolicy&&(e.referrerPolicy=t.referrerpolicy),"use-credentials"===t.crossorigin?e.credentials="include":"anonymous"===t.crossorigin?e.credentials="omit":e.credentials="same-origin",e}(t);fetch(t.href,e)}}();
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,e=Symbol(),s=new Map;class i{constructor(t,s){if(this._$cssResult$=!0,s!==e)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){let e=s.get(this.cssText);return t&&void 0===e&&(s.set(this.cssText,e=new CSSStyleSheet),e.replaceSync(this.cssText)),e}toString(){return this.cssText}}const o=t?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let s="";for(const e of t.cssRules)s+=e.cssText;return(t=>new i("string"==typeof t?t:t+"",e))(s)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var n,r;const d={toAttribute(t,e){switch(e){case Boolean:t=t?"":null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(i){s=null}}return s}},h=(t,e)=>e!==t&&(e==e||t==t),l={attribute:!0,type:String,converter:d,reflect:!1,hasChanged:h};class a extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var e;null!==(e=this.l)&&void 0!==e||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,s)=>{const i=this._$Eh(s,e);void 0!==i&&(this._$Eu.set(i,s),t.push(i))})),t}static createProperty(t,e=l){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,i=this.getPropertyDescriptor(t,s,e);void 0!==i&&Object.defineProperty(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(i){const o=this[t];this[e]=i,this.requestUpdate(t,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||l}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of e)this.createProperty(s,t[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Eh(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ev=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Ep(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,s;(null!==(e=this._$Em)&&void 0!==e?e:this._$Em=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t))}removeController(t){var e;null===(e=this._$Em)||void 0===e||e.splice(this._$Em.indexOf(t)>>>0,1)}_$Ep(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Et.set(e,this[e]),delete this[e])}))}createRenderRoot(){var e;const s=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return i=s,o=this.constructor.elementStyles,t?i.adoptedStyleSheets=o.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):o.forEach((t=>{const e=document.createElement("style"),s=window.litNonce;void 0!==s&&e.setAttribute("nonce",s),e.textContent=t.cssText,i.appendChild(e)})),s;var i,o}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Em)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Em)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$Eg(t,e,s=l){var i,o;const n=this.constructor._$Eh(t,s);if(void 0!==n&&!0===s.reflect){const r=(null!==(o=null===(i=s.converter)||void 0===i?void 0:i.toAttribute)&&void 0!==o?o:d.toAttribute)(e,s.type);this._$Ei=t,null==r?this.removeAttribute(n):this.setAttribute(n,r),this._$Ei=null}}_$AK(t,e){var s,i,o;const n=this.constructor,r=n._$Eu.get(t);if(void 0!==r&&this._$Ei!==r){const t=n.getPropertyOptions(r),h=t.converter,l=null!==(o=null!==(i=null===(s=h)||void 0===s?void 0:s.fromAttribute)&&void 0!==i?i:"function"==typeof h?h:null)&&void 0!==o?o:d.fromAttribute;this._$Ei=r,this[r]=l(e,t.type),this._$Ei=null}}requestUpdate(t,e,s){let i=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||h)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===s.reflect&&this._$Ei!==t&&(void 0===this._$ES&&(this._$ES=new Map),this._$ES.set(t,s))):i=!1),!this.isUpdatePending&&i&&(this._$Ev=this._$EC())}async _$EC(){this.isUpdatePending=!0;try{await this._$Ev}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,e)=>this[e]=t)),this._$Et=void 0);let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),null===(t=this._$Em)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(s)):this._$ET()}catch(i){throw e=!1,this._$ET(),i}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;null===(e=this._$Em)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$ET(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ev}shouldUpdate(t){return!0}update(t){void 0!==this._$ES&&(this._$ES.forEach(((t,e)=>this._$Eg(e,this[e],t))),this._$ES=void 0),this._$ET()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var c,u;a.finalized=!0,a.elementProperties=new Map,a.elementStyles=[],a.shadowRootOptions={mode:"open"},null===(n=globalThis.reactiveElementPolyfillSupport)||void 0===n||n.call(globalThis,{ReactiveElement:a}),(null!==(r=globalThis.reactiveElementVersions)&&void 0!==r?r:globalThis.reactiveElementVersions=[]).push("1.0.0");const p=globalThis.trustedTypes,v=p?p.createPolicy("lit-html",{createHTML:t=>t}):void 0,g=`lit$${(Math.random()+"").slice(9)}$`,f="?"+g,y=`<${f}>`,$=document,m=(t="")=>$.createComment(t),x=t=>null===t||"object"!=typeof t&&"function"!=typeof t,_=Array.isArray,A=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,b=/-->/g,E=/>/g,w=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,N=/'/g,S=/"/g,C=/^(?:script|style|textarea)$/i,M=(T=1,(t,...e)=>({_$litType$:T,strings:t,values:e})),P=Symbol.for("lit-noChange"),k=Symbol.for("lit-nothing"),U=new WeakMap,O=$.createTreeWalker($,129,null,!1);var T,H,L,R;class I{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,n=0;const r=t.length-1,d=this.parts,[h,l]=((t,e)=>{const s=t.length-1,i=[];let o,n=2===e?"<svg>":"",r=A;for(let h=0;h<s;h++){const e=t[h];let s,d,l=-1,a=0;for(;a<e.length&&(r.lastIndex=a,d=r.exec(e),null!==d);)a=r.lastIndex,r===A?"!--"===d[1]?r=b:void 0!==d[1]?r=E:void 0!==d[2]?(C.test(d[2])&&(o=RegExp("</"+d[2],"g")),r=w):void 0!==d[3]&&(r=w):r===w?">"===d[0]?(r=null!=o?o:A,l=-1):void 0===d[1]?l=-2:(l=r.lastIndex-d[2].length,s=d[1],r=void 0===d[3]?w:'"'===d[3]?S:N):r===S||r===N?r=w:r===b||r===E?r=A:(r=w,o=void 0);const c=r===w&&t[h+1].startsWith("/>")?" ":"";n+=r===A?e+y:l>=0?(i.push(s),e.slice(0,l)+"$lit$"+e.slice(l)+g+c):e+g+(-2===l?(i.push(void 0),h):c)}const d=n+(t[s]||"<?>")+(2===e?"</svg>":"");return[void 0!==v?v.createHTML(d):d,i]})(t,e);if(this.el=I.createElement(h,s),O.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(i=O.nextNode())&&d.length<r;){if(1===i.nodeType){if(i.hasAttributes()){const t=[];for(const e of i.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(g)){const s=l[n++];if(t.push(e),void 0!==s){const t=i.getAttribute(s.toLowerCase()+"$lit$").split(g),e=/([.?@])?(.*)/.exec(s);d.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?j:"?"===e[1]?K:"@"===e[1]?V:W})}else d.push({type:6,index:o})}for(const e of t)i.removeAttribute(e)}if(C.test(i.tagName)){const t=i.textContent.split(g),e=t.length-1;if(e>0){i.textContent=p?p.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],m()),O.nextNode(),d.push({type:2,index:++o});i.append(t[e],m())}}}else if(8===i.nodeType)if(i.data===f)d.push({type:2,index:o});else{let t=-1;for(;-1!==(t=i.data.indexOf(g,t+1));)d.push({type:7,index:o}),t+=g.length-1}o++}}static createElement(t,e){const s=$.createElement("template");return s.innerHTML=t,s}}function z(t,e,s=t,i){var o,n,r,d;if(e===P)return e;let h=void 0!==i?null===(o=s._$Cl)||void 0===o?void 0:o[i]:s._$Cu;const l=x(e)?void 0:e._$litDirective$;return(null==h?void 0:h.constructor)!==l&&(null===(n=null==h?void 0:h._$AO)||void 0===n||n.call(h,!1),void 0===l?h=void 0:(h=new l(t),h._$AT(t,s,i)),void 0!==i?(null!==(r=(d=s)._$Cl)&&void 0!==r?r:d._$Cl=[])[i]=h:s._$Cu=h),void 0!==h&&(e=z(t,h._$AS(t,e.values),h,i)),e}class D{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;const{el:{content:s},parts:i}=this._$AD,o=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:$).importNode(s,!0);O.currentNode=o;let n=O.nextNode(),r=0,d=0,h=i[0];for(;void 0!==h;){if(r===h.index){let e;2===h.type?e=new B(n,n.nextSibling,this,t):1===h.type?e=new h.ctor(n,h.name,h.strings,this,t):6===h.type&&(e=new F(n,this,t)),this.v.push(e),h=i[++d]}r!==(null==h?void 0:h.index)&&(n=O.nextNode(),r++)}return o}m(t){let e=0;for(const s of this.v)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class B{constructor(t,e,s,i){var o;this.type=2,this._$AH=k,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cg=null===(o=null==i?void 0:i.isConnected)||void 0===o||o}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=z(this,t,e),x(t)?t===k||null==t||""===t?(this._$AH!==k&&this._$AR(),this._$AH=k):t!==this._$AH&&t!==P&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.S(t):(t=>{var e;return _(t)||"function"==typeof(null===(e=t)||void 0===e?void 0:e[Symbol.iterator])})(t)?this.M(t):this.$(t)}A(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}S(t){this._$AH!==t&&(this._$AR(),this._$AH=this.A(t))}$(t){this._$AH!==k&&x(this._$AH)?this._$AA.nextSibling.data=t:this.S($.createTextNode(t)),this._$AH=t}T(t){var e;const{values:s,_$litType$:i}=t,o="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=I.createElement(i.h,this.options)),i);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===o)this._$AH.m(s);else{const t=new D(o,this),e=t.p(this.options);t.m(s),this.S(e),this._$AH=t}}_$AC(t){let e=U.get(t.strings);return void 0===e&&U.set(t.strings,e=new I(t)),e}M(t){_(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const o of t)i===e.length?e.push(s=new B(this.A(m()),this.A(m()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cg=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class W{constructor(t,e,s,i,o){this.type=1,this._$AH=k,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=k}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,s,i){const o=this.strings;let n=!1;if(void 0===o)t=z(this,t,e,0),n=!x(t)||t!==this._$AH&&t!==P,n&&(this._$AH=t);else{const i=t;let r,d;for(t=o[0],r=0;r<o.length-1;r++)d=z(this,i[s+r],e,r),d===P&&(d=this._$AH[r]),n||(n=!x(d)||d!==this._$AH[r]),d===k?t=k:t!==k&&(t+=(null!=d?d:"")+o[r+1]),this._$AH[r]=d}n&&!i&&this.k(t)}k(t){t===k?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class j extends W{constructor(){super(...arguments),this.type=3}k(t){this.element[this.name]=t===k?void 0:t}}class K extends W{constructor(){super(...arguments),this.type=4}k(t){t&&t!==k?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)}}class V extends W{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){var s;if((t=null!==(s=z(this,t,e,0))&&void 0!==s?s:k)===P)return;const i=this._$AH,o=t===k&&i!==k||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==k&&(i===k||o);o&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t)}}class F{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){z(this,t)}}null===(c=globalThis.litHtmlPolyfillSupport)||void 0===c||c.call(globalThis,I,B),(null!==(u=globalThis.litHtmlVersions)&&void 0!==u?u:globalThis.litHtmlVersions=[]).push("2.0.0");class J extends a{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,e;const s=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=s.firstChild),s}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=((t,e,s)=>{var i,o;const n=null!==(i=null==s?void 0:s.renderBefore)&&void 0!==i?i:e;let r=n._$litPart$;if(void 0===r){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=r=new B(e.insertBefore(m(),t),t,void 0,null!=s?s:{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1)}render(){return P}}J.finalized=!0,J._$litElement$=!0,null===(H=globalThis.litElementHydrateSupport)||void 0===H||H.call(globalThis,{LitElement:J}),null===(L=globalThis.litElementPolyfillSupport)||void 0===L||L.call(globalThis,{LitElement:J}),(null!==(R=globalThis.litElementVersions)&&void 0!==R?R:globalThis.litElementVersions=[]).push("3.0.0");class q{constructor(){this.nodes=[],this.edges=[]}static fromJson(t){const{nodes:e,edges:s}=JSON.parse(t),i=new q;return e&&(i.nodes=e),s&&(i.edges=s),i}toJson(){const t={nodes:this.nodes,edges:this.edges};return JSON.stringify(t,null,2)}getNodeIndex(t){return this.nodes.findIndex((e=>e.id===t))}createNode(t){const e=this.getNodeIndex(t.id);-1===e?this.nodes.push(t):this.nodes[e]=t}retrieveNode(t){return this.nodes.find((e=>e.id===t))}retrieveEdgesForNode(t){return this.edges.filter((e=>e.startNode===t||e.endNode===t))}updateNode(t){const e=this.getNodeIndex(t.id);-1!==e&&(this.nodes[e]=t)}deleteNode(t){const e=this.getNodeIndex(t);if(-1===e)return;this.nodes.splice(e,1);const s=this.retrieveEdgesForNode(t);for(const i of s)this.deleteEdge(i.id)}getEdgeIndex(t){return this.edges.findIndex((e=>e.id===t))}createEdge(t){const e=this.getEdgeIndex(t.id);-1===e?this.edges.push(t):this.edges[e]=t}retrieveEdge(t){return this.edges.find((e=>e.id===t))}updateEdge(t){const e=this.getEdgeIndex(t.id);-1!==e&&(this.edges[e]=t)}deleteEdge(t){const e=this.getEdgeIndex(t);-1!==e&&this.edges.splice(e,1)}linkNodes(t,e,s){const i=Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15);this.createEdge({id:i,startNode:t.id,endNode:e.id,name:s,type:"edge"})}}class Y{constructor(t){var e;this.store=new q,this.offset={x:0,y:0},this.rotation=0,this.scale=1,this.action=X.NONE,this.selectedNodes=new Array,this.selectedEdges=new Array,this.hoveredNodes=new Array,this.hoveredEdges=new Array,this.matrix=[1,0,0,1,0,0],this.invMatrix=[1,0,0,1],this.shiftPressed=!1,this.onUpdate=()=>{},this.canvas=null!=(e=null==t?void 0:t.canvas)?e:document.createElement("canvas"),this.resize(null==t?void 0:t.size),this.ctx=this.canvas.getContext("2d"),this.ctx.imageSmoothingEnabled=!0,this.init()}init(){this.render(),this.canvas.addEventListener("contextmenu",(t=>t.preventDefault()),!1),this.canvas.addEventListener("wheel",(t=>this.onWheel(t)),!1),this.canvas.addEventListener("mousedown",(t=>this.onMouseDown(t)),!1),this.canvas.addEventListener("mousemove",(t=>this.onMouseMove(t)),!1),this.canvas.addEventListener("mouseup",(t=>this.onMouseUp(t)),!1),window.addEventListener("keydown",(t=>{this.shiftPressed=t.shiftKey})),window.addEventListener("keyup",(t=>{this.shiftPressed=!1}))}import(t){this.store=q.fromJson(t)}deleteNode(t){this.store.deleteNode(t.id),this.clear()}deleteEdge(t){this.store.deleteEdge(t.id),this.clearLinks(),this.onUpdate()}resize(t){this.size=null!=t?t:{width:window.innerWidth,height:window.innerHeight},this.canvas.setAttribute("width",`${this.size.width}px`),this.canvas.setAttribute("height",`${this.size.height}px`),this.canvas.width=this.size.width,this.canvas.height=this.size.height}onWheel(t){t.preventDefault(),t.ctrlKey?(this.action=X.ZOOM,this.scale-=.01*t.deltaY):(this.action=X.PAN,this.offset.x-=2*t.deltaX,this.offset.y-=2*t.deltaY),this.onUpdate(),this.action=X.NONE}onMouseDown(t){this.start={x:t.offsetX,y:t.offsetY},this.end={x:t.offsetX,y:t.offsetY},this.action=this.shiftPressed?X.LINK:X.MOVE,this.clear();const e=this.getSelection(this.start);this.selectedNodes.push(...e.nodes),this.selectedEdges.push(...e.edges),this.onUpdate()}onMouseUp(t){if(this.action===X.LINK){const t=this.getSelection(this.start).nodes,e=this.getSelection(this.end).nodes;if(t.length>0&&e.length>0){const s=this.store.retrieveNode(t[t.length-1]),i=this.store.retrieveNode(e[e.length-1]);s&&i&&this.store.linkNodes(s,i,"simple")}}this.start=void 0,this.end=void 0,this.action=X.NONE}onMouseMove(t){if(this.checkHover({x:t.offsetX,y:t.offsetY}),this.selectedNodes.length>0){if(this.action===X.MOVE){const e={x:t.offsetX-this.start.x,y:t.offsetY-this.start.y},s=this.topSelection();"node"===(null==s?void 0:s.type)&&this.moveNode(s,e),this.start={x:t.offsetX,y:t.offsetY}}this.action===X.LINK&&(this.end={x:t.offsetX,y:t.offsetY})}}checkHover(t){this.hoveredNodes.splice(0,this.hoveredNodes.length),this.hoveredEdges.splice(0,this.hoveredEdges.length);const e=this.getSelection(t);this.hoveredNodes.push(...e.nodes),this.hoveredEdges.push(...e.edges);const s=this.topHovered();this.canvas.style.cursor=s?"pointer":"default"}moveNode(t,e){t.x+=e.x/this.scale,t.y+=e.y/this.scale,this.store.updateNode(t)}topSelection(){if(this.selectedNodes.length>0){const t=this.selectedNodes[this.selectedNodes.length-1];return this.store.retrieveNode(t)}if(this.selectedEdges.length>0){const t=this.selectedEdges[this.selectedEdges.length-1];return this.store.retrieveEdge(t)}}topHovered(){if(this.hoveredNodes.length>0){const t=this.hoveredNodes[this.hoveredNodes.length-1];return this.store.retrieveNode(t)}if(this.hoveredEdges.length>0){const t=this.hoveredEdges[this.hoveredEdges.length-1];return this.store.retrieveEdge(t)}}clear(){this.selectedNodes.splice(0,this.selectedNodes.length),this.selectedEdges.splice(0,this.selectedEdges.length),this.onUpdate()}clearLinks(){this.selectedEdges.splice(0,this.selectedEdges.length),this.onUpdate()}getSelection(t){const e=new Array,s=new Array,i=this.toWorld(t.x,t.y);for(const o of this.store.nodes)i.x>=o.x&&i.x<=o.x+o.width&&i.y>=o.y&&i.y<=o.y+o.height&&e.push(o.id);for(const o of this.store.edges){const t=this.getEdgePoints(o),e=this.drawLabel(o.name,{offset:t.mid,textAlign:"center"}),n={x:t.mid.x-e.width/2,y:t.mid.y-e.height/2,width:e.width,height:e.height};i.x>=n.x&&i.x<=n.x+n.width&&i.y>=n.y&&i.y<=n.y+n.height&&s.push(o.id)}return{nodes:e,edges:s}}render(){this.paint(),requestAnimationFrame((()=>this.render()))}paint(){this.ctx.setTransform(1,0,0,1,0,0),this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.renderBackground(),this.updateMatrix(),this.renderEdges(),this.renderNodes(),this.renderLink()}updateMatrix(){this.createMatrix(this.offset.x,this.offset.y,this.scale,this.rotation);const t=this.matrix;this.ctx.setTransform(t[0],t[1],t[2],t[3],t[4],t[5])}createMatrix(t,e,s,i){const o=this.matrix,n=this.invMatrix;o[3]=o[0]=Math.cos(i)*s,o[2]=-(o[1]=Math.sin(i)*s),o[4]=t,o[5]=e;const r=o[0]*o[3]-o[1]*o[2];n[0]=o[3]/r,n[1]=-o[1]/r,n[2]=-o[2]/r,n[3]=o[0]/r}toWorld(t,e){let s,i,o;return o=this.invMatrix,s=t-this.matrix[4],i=e-this.matrix[5],{x:s*o[0]+i*o[2],y:s*o[1]+i*o[3]}}renderLink(){if(this.action===X.LINK){const t=this.toWorld(this.start.x,this.start.y),e=this.toWorld(this.end.x,this.end.y);this.drawLine(t,e,"red")}}renderBackground(){this.ctx.save(),this.ctx.fillStyle="whitesmoke",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height),this.ctx.restore()}renderNodes(){for(const t of this.store.nodes)this.renderNode(t)}renderEdges(){for(const t of this.store.edges)this.renderEdge(t)}renderNode(t){var e;const{isSelected:s,isHovered:i}=this.getNodeStats(t);this.ctx.save(),this.ctx.moveTo(t.x,t.y);const o={x:t.x,y:t.y-5};this.drawLabel(t.name,{offset:o}),this.ctx.fillStyle=null!=(e=null==t?void 0:t.backgroundColor)?e:"white",this.ctx.fillRect(t.x,t.y,t.width,t.height),this.ctx.strokeStyle=s?"red":i?"blue":"black",this.ctx.strokeRect(t.x,t.y,t.width,t.height),this.ctx.restore()}renderEdge(t){const{isSelected:e,isHovered:s}=this.getNodeStats(t),{start:i,end:o,mid:n}=this.getEdgePoints(t);this.drawLine(i,o,e?"red":s?"blue":"black"),this.drawLabel(t.name,{textAlign:"center",offset:n})}getNodeStats(t){const e=this.topSelection(),s=this.topHovered(),i=(null==e?void 0:e.type)===t.type,o=(null==s?void 0:s.type)===t.type;return{isSelected:i&&e.id===t.id,isHovered:o&&s.id===t.id}}getEdgePoints(t){const e=this.store.retrieveNode(t.startNode),s=this.store.retrieveNode(t.endNode),i={x:e.x+e.width/2,y:e.y+e.height/2,width:e.width,height:e.height},o={x:s.x+s.width/2,y:s.y+s.height/2,width:s.width,height:s.height};return{start:i,end:o,mid:{x:(i.x+o.x)/2,y:(i.y+o.y)/2}}}drawLine(t,e,s="black"){this.scopedPaint((i=>{i.beginPath(),i.strokeStyle=s,i.moveTo(t.x,t.y),i.lineTo(e.x,e.y),i.stroke()}))}drawLabel(t,e){var s,i;let o;this.ctx.save(),(null==e?void 0:e.offset)&&this.ctx.translate(e.offset.x,e.offset.y);this.ctx.font="10px 1.2em Arial",this.ctx.textAlign=null!=(s=null==e?void 0:e.textAlign)?s:"left",this.ctx.fillStyle=null!=(i=null==e?void 0:e.color)?i:"black",this.ctx.fillText(t,0,0),o=this.ctx.measureText(t),this.ctx.restore();return{height:12,width:o.width}}scopedPaint(t){this.ctx.save(),t(this.ctx),this.ctx.restore()}}var X,Z;(Z=X||(X={}))[Z.NONE=0]="NONE",Z[Z.ZOOM=1]="ZOOM",Z[Z.PAN=2]="PAN",Z[Z.MOVE=3]="MOVE",Z[Z.LINK=4]="LINK";var G=Object.defineProperty,Q=Object.getOwnPropertyDescriptor;"undefined"!=typeof require&&require;let tt=class extends J{constructor(){super(...arguments),this.editor=new Y({size:{width:window.innerWidth-200,height:window.innerHeight}})}render(){return M`<main>
      <div id="output">${this.editor.canvas}</div>
      <div id="properties">${this.renderProperties()}</div>
    </main>`}renderProperties(){var t;const e=this.editor.topSelection();return"node"===(null==e?void 0:e.type)?M`
        <span class="title">Node</span>
        <div class="property">
          <label>Name</label>
          <input
            type="text"
            .value=${e.name}
            @change=${t=>{e.name=t.target.value,this.editor.store.updateNode(e)}}
          />
        </div>
        <div class="property">
          <label>Background Color</label>
          <input
            type="color"
            .value=${null!=(t=e.backgroundColor)?t:"#FFFFFF"}
            @change=${t=>{e.backgroundColor=t.target.value,this.editor.store.updateNode(e)}}
          />
        </div>
        <div class="property">
          <label>Width</label>
          <input
            type="number"
            .value=${e.width.toString()}
            @change=${t=>{e.width=Number(t.target.value),this.editor.store.updateNode(e)}}
          />
        </div>
        <div class="property">
          <label>Height</label>
          <input
            type="number"
            .value=${e.height.toString()}
            @change=${t=>{e.height=Number(t.target.value),this.editor.store.updateNode(e)}}
          />
        </div>
        <div class="property">
          <button
            class="destructive"
            @click=${()=>{confirm("Are you sure?")&&this.editor.deleteNode(e)}}
          >
            Delete node
          </button>
        </div>
      `:"edge"===(null==e?void 0:e.type)?M` <span class="title">Edge</span>
        <div class="property">
          <label>Name</label>
          <input
            type="text"
            .value=${e.name}
            @change=${t=>{e.name=t.target.value,this.editor.store.updateEdge(e)}}
          />
        </div>
        <div class="property">
          <button
            class="destructive"
            @click=${()=>{confirm("Are you sure?")&&this.editor.deleteEdge(e)}}
          >
            Delete node
          </button>
        </div>`:M` <span class="title">Editor</span>
      <div>
        <div class="property">
          <label>Import JSON</label>
          <input
            type="file"
            accept=".json"
            @change=${t=>{const e=t.target.files;if(e.length){this.editor.clear();const t=new FileReader;t.onload=t=>{const e=t.target.result;this.editor.import(e)},t.readAsText(e[0])}}}
          />
        </div>
        <div class="property">
          <label>Scale</label>
          <input
            type="number"
            .value=${this.editor.scale.toString()}
            step=".1"
            @change=${t=>{this.editor.scale=Number(t.target.value)}}
          />
        </div>
        <div class="property">
          <label>Rotation</label>
          <input
            type="number"
            .value=${this.editor.rotation.toString()}
            step=".1"
            @change=${t=>{this.editor.rotation=Number(t.target.value)}}
          />
        </div>
        <div class="property">
          <label>Offset x</label>
          <input
            type="number"
            .value=${this.editor.offset.x.toString()}
            step=".1"
            @change=${t=>{this.editor.offset.x=Number(t.target.value)}}
          />
        </div>
        <div class="property">
          <label>Offset x</label>
          <input
            type="number"
            .value=${this.editor.offset.y.toString()}
            step=".1"
            @change=${t=>{this.editor.offset.y=Number(t.target.value)}}
          />
        </div>
        <div class="property">
          <button
            @click=${()=>{const t=this.addRandomNode();this.editor.selectedNodes.push(t.id),this.requestUpdate()}}
          >
            Add new node
          </button>
        </div>
        <div class="property">
          <button
            @click=${()=>{const t=window.document.createElement("a"),e=this.editor.store.toJson();t.href=window.URL.createObjectURL(new Blob([e],{type:"application/json"})),t.download="editor.json",document.body.appendChild(t),t.click()}}
          >
            Export JSON
          </button>
        </div>
      </div>`}firstUpdated(){for(let t=0;t<10;t++)this.addRandomNode(t);for(let t=0;t<5;t++){const e=this.editor.store.nodes[t],s=this.editor.store.nodes[t+5];this.editor.store.linkNodes(e,s,"simple")}this.editor.onUpdate=()=>{this.requestUpdate()},window.addEventListener("resize",(()=>{this.editor.resize({width:window.innerWidth-200,height:window.innerHeight})}))}addRandomNode(t=this.editor.store.nodes.length){const e={id:`node${t}`,name:"Node "+t,x:Math.random()*this.editor.canvas.width,y:Math.random()*this.editor.canvas.height,width:100,height:100,type:"node"};return this.editor.store.createNode(e),e}};var et;tt.styles=((t,...s)=>{const o=1===t.length?t[0]:s.reduce(((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1]),t[0]);return new i(o,e)})`
    main {
      height: 100vh;
      width: 100%;
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
      overflow-y: scroll;
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
  `,tt=((t,e,s,i)=>{for(var o,n=i>1?void 0:i?Q(e,s):e,r=t.length-1;r>=0;r--)(o=t[r])&&(n=(i?o(e,s,n):o(n))||n);return i&&n&&G(e,s,n),n})([(et="node-editor",t=>{return"function"==typeof t?(e=et,s=t,window.customElements.define(e,s),s):((t,e)=>{const{kind:s,elements:i}=e;return{kind:s,elements:i,finisher(e){window.customElements.define(t,e)}}})(et,t);var e,s})],tt);
