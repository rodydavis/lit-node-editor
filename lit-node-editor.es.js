!function(){const t=document.createElement("link").relList;if(!(t&&t.supports&&t.supports("modulepreload"))){for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver((t=>{for(const i of t)if("childList"===i.type)for(const t of i.addedNodes)"LINK"===t.tagName&&"modulepreload"===t.rel&&e(t)})).observe(document,{childList:!0,subtree:!0})}function e(t){if(t.ep)return;t.ep=!0;const e=function(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerpolicy&&(e.referrerPolicy=t.referrerpolicy),"use-credentials"===t.crossorigin?e.credentials="include":"anonymous"===t.crossorigin?e.credentials="omit":e.credentials="same-origin",e}(t);fetch(t.href,e)}}();
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,e=Symbol(),i=new Map;class s{constructor(t,i){if(this._$cssResult$=!0,i!==e)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){let e=i.get(this.cssText);return t&&void 0===e&&(i.set(this.cssText,e=new CSSStyleSheet),e.replaceSync(this.cssText)),e}toString(){return this.cssText}}const o=t?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let i="";for(const e of t.cssRules)i+=e.cssText;return(t=>new s("string"==typeof t?t:t+"",e))(i)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var n,r;const d={toAttribute(t,e){switch(e){case Boolean:t=t?"":null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(s){i=null}}return i}},h=(t,e)=>e!==t&&(e==e||t==t),l={attribute:!0,type:String,converter:d,reflect:!1,hasChanged:h};class a extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var e;null!==(e=this.l)&&void 0!==e||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const s=this._$Eh(i,e);void 0!==s&&(this._$Eu.set(s,i),t.push(s))})),t}static createProperty(t,e=l){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const o=this[t];this[e]=s,this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||l}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Eh(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ev=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Ep(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$Em)&&void 0!==e?e:this._$Em=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$Em)||void 0===e||e.splice(this._$Em.indexOf(t)>>>0,1)}_$Ep(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Et.set(e,this[e]),delete this[e])}))}createRenderRoot(){var e;const i=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return s=i,o=this.constructor.elementStyles,t?s.adoptedStyleSheets=o.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):o.forEach((t=>{const e=document.createElement("style"),i=window.litNonce;void 0!==i&&e.setAttribute("nonce",i),e.textContent=t.cssText,s.appendChild(e)})),i;var s,o}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Em)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Em)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$Eg(t,e,i=l){var s,o;const n=this.constructor._$Eh(t,i);if(void 0!==n&&!0===i.reflect){const r=(null!==(o=null===(s=i.converter)||void 0===s?void 0:s.toAttribute)&&void 0!==o?o:d.toAttribute)(e,i.type);this._$Ei=t,null==r?this.removeAttribute(n):this.setAttribute(n,r),this._$Ei=null}}_$AK(t,e){var i,s,o;const n=this.constructor,r=n._$Eu.get(t);if(void 0!==r&&this._$Ei!==r){const t=n.getPropertyOptions(r),h=t.converter,l=null!==(o=null!==(s=null===(i=h)||void 0===i?void 0:i.fromAttribute)&&void 0!==s?s:"function"==typeof h?h:null)&&void 0!==o?o:d.fromAttribute;this._$Ei=r,this[r]=l(e,t.type),this._$Ei=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||h)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$Ei!==t&&(void 0===this._$ES&&(this._$ES=new Map),this._$ES.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$Ev=this._$EC())}async _$EC(){this.isUpdatePending=!0;try{await this._$Ev}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,e)=>this[e]=t)),this._$Et=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$Em)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$ET()}catch(s){throw e=!1,this._$ET(),s}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$Em)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$ET(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ev}shouldUpdate(t){return!0}update(t){void 0!==this._$ES&&(this._$ES.forEach(((t,e)=>this._$Eg(e,this[e],t))),this._$ES=void 0),this._$ET()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var c,u;a.finalized=!0,a.elementProperties=new Map,a.elementStyles=[],a.shadowRootOptions={mode:"open"},null===(n=globalThis.reactiveElementPolyfillSupport)||void 0===n||n.call(globalThis,{ReactiveElement:a}),(null!==(r=globalThis.reactiveElementVersions)&&void 0!==r?r:globalThis.reactiveElementVersions=[]).push("1.0.0");const p=globalThis.trustedTypes,v=p?p.createPolicy("lit-html",{createHTML:t=>t}):void 0,g=`lit$${(Math.random()+"").slice(9)}$`,f="?"+g,$=`<${f}>`,y=document,m=(t="")=>y.createComment(t),_=t=>null===t||"object"!=typeof t&&"function"!=typeof t,A=Array.isArray,b=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,x=/-->/g,N=/>/g,E=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,w=/'/g,S=/"/g,k=/^(?:script|style|textarea)$/i,C=(O=1,(t,...e)=>({_$litType$:O,strings:t,values:e})),P=Symbol.for("lit-noChange"),M=Symbol.for("lit-nothing"),U=new WeakMap,T=y.createTreeWalker(y,129,null,!1);var O,H,L,R;class I{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0;const r=t.length-1,d=this.parts,[h,l]=((t,e)=>{const i=t.length-1,s=[];let o,n=2===e?"<svg>":"",r=b;for(let h=0;h<i;h++){const e=t[h];let i,d,l=-1,a=0;for(;a<e.length&&(r.lastIndex=a,d=r.exec(e),null!==d);)a=r.lastIndex,r===b?"!--"===d[1]?r=x:void 0!==d[1]?r=N:void 0!==d[2]?(k.test(d[2])&&(o=RegExp("</"+d[2],"g")),r=E):void 0!==d[3]&&(r=E):r===E?">"===d[0]?(r=null!=o?o:b,l=-1):void 0===d[1]?l=-2:(l=r.lastIndex-d[2].length,i=d[1],r=void 0===d[3]?E:'"'===d[3]?S:w):r===S||r===w?r=E:r===x||r===N?r=b:(r=E,o=void 0);const c=r===E&&t[h+1].startsWith("/>")?" ":"";n+=r===b?e+$:l>=0?(s.push(i),e.slice(0,l)+"$lit$"+e.slice(l)+g+c):e+g+(-2===l?(s.push(void 0),h):c)}const d=n+(t[i]||"<?>")+(2===e?"</svg>":"");return[void 0!==v?v.createHTML(d):d,s]})(t,e);if(this.el=I.createElement(h,i),T.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=T.nextNode())&&d.length<r;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(g)){const i=l[n++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+"$lit$").split(g),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?j:"?"===e[1]?F:"@"===e[1]?K:W})}else d.push({type:6,index:o})}for(const e of t)s.removeAttribute(e)}if(k.test(s.tagName)){const t=s.textContent.split(g),e=t.length-1;if(e>0){s.textContent=p?p.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],m()),T.nextNode(),d.push({type:2,index:++o});s.append(t[e],m())}}}else if(8===s.nodeType)if(s.data===f)d.push({type:2,index:o});else{let t=-1;for(;-1!==(t=s.data.indexOf(g,t+1));)d.push({type:7,index:o}),t+=g.length-1}o++}}static createElement(t,e){const i=y.createElement("template");return i.innerHTML=t,i}}function z(t,e,i=t,s){var o,n,r,d;if(e===P)return e;let h=void 0!==s?null===(o=i._$Cl)||void 0===o?void 0:o[s]:i._$Cu;const l=_(e)?void 0:e._$litDirective$;return(null==h?void 0:h.constructor)!==l&&(null===(n=null==h?void 0:h._$AO)||void 0===n||n.call(h,!1),void 0===l?h=void 0:(h=new l(t),h._$AT(t,i,s)),void 0!==s?(null!==(r=(d=i)._$Cl)&&void 0!==r?r:d._$Cl=[])[s]=h:i._$Cu=h),void 0!==h&&(e=z(t,h._$AS(t,e.values),h,s)),e}class D{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;const{el:{content:i},parts:s}=this._$AD,o=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:y).importNode(i,!0);T.currentNode=o;let n=T.nextNode(),r=0,d=0,h=s[0];for(;void 0!==h;){if(r===h.index){let e;2===h.type?e=new B(n,n.nextSibling,this,t):1===h.type?e=new h.ctor(n,h.name,h.strings,this,t):6===h.type&&(e=new V(n,this,t)),this.v.push(e),h=s[++d]}r!==(null==h?void 0:h.index)&&(n=T.nextNode(),r++)}return o}m(t){let e=0;for(const i of this.v)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class B{constructor(t,e,i,s){var o;this.type=2,this._$AH=M,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cg=null===(o=null==s?void 0:s.isConnected)||void 0===o||o}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=z(this,t,e),_(t)?t===M||null==t||""===t?(this._$AH!==M&&this._$AR(),this._$AH=M):t!==this._$AH&&t!==P&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.S(t):(t=>{var e;return A(t)||"function"==typeof(null===(e=t)||void 0===e?void 0:e[Symbol.iterator])})(t)?this.M(t):this.$(t)}A(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}S(t){this._$AH!==t&&(this._$AR(),this._$AH=this.A(t))}$(t){this._$AH!==M&&_(this._$AH)?this._$AA.nextSibling.data=t:this.S(y.createTextNode(t)),this._$AH=t}T(t){var e;const{values:i,_$litType$:s}=t,o="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=I.createElement(s.h,this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===o)this._$AH.m(i);else{const t=new D(o,this),e=t.p(this.options);t.m(i),this.S(e),this._$AH=t}}_$AC(t){let e=U.get(t.strings);return void 0===e&&U.set(t.strings,e=new I(t)),e}M(t){A(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new B(this.A(m()),this.A(m()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cg=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class W{constructor(t,e,i,s,o){this.type=1,this._$AH=M,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=M}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const o=this.strings;let n=!1;if(void 0===o)t=z(this,t,e,0),n=!_(t)||t!==this._$AH&&t!==P,n&&(this._$AH=t);else{const s=t;let r,d;for(t=o[0],r=0;r<o.length-1;r++)d=z(this,s[i+r],e,r),d===P&&(d=this._$AH[r]),n||(n=!_(d)||d!==this._$AH[r]),d===M?t=M:t!==M&&(t+=(null!=d?d:"")+o[r+1]),this._$AH[r]=d}n&&!s&&this.k(t)}k(t){t===M?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class j extends W{constructor(){super(...arguments),this.type=3}k(t){this.element[this.name]=t===M?void 0:t}}class F extends W{constructor(){super(...arguments),this.type=4}k(t){t&&t!==M?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)}}class K extends W{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=z(this,t,e,0))&&void 0!==i?i:M)===P)return;const s=this._$AH,o=t===M&&s!==M||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==M&&(s===M||o);o&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class V{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){z(this,t)}}null===(c=globalThis.litHtmlPolyfillSupport)||void 0===c||c.call(globalThis,I,B),(null!==(u=globalThis.litHtmlVersions)&&void 0!==u?u:globalThis.litHtmlVersions=[]).push("2.0.0");class q extends a{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=((t,e,i)=>{var s,o;const n=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let r=n._$litPart$;if(void 0===r){const t=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:null;n._$litPart$=r=new B(e.insertBefore(m(),t),t,void 0,null!=i?i:{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1)}render(){return P}}q.finalized=!0,q._$litElement$=!0,null===(H=globalThis.litElementHydrateSupport)||void 0===H||H.call(globalThis,{LitElement:q}),null===(L=globalThis.litElementPolyfillSupport)||void 0===L||L.call(globalThis,{LitElement:q}),(null!==(R=globalThis.litElementVersions)&&void 0!==R?R:globalThis.litElementVersions=[]).push("3.0.0");class J{constructor(){this.nodes=[],this.edges=[]}static fromJson(t){const{nodes:e,edges:i}=JSON.parse(t),s=new J;return e&&(s.nodes=e),i&&(s.edges=i),s}toJson(){const t={nodes:this.nodes,edges:this.edges};return JSON.stringify(t,null,2)}getNodeIndex(t){return this.nodes.findIndex((e=>e.id===t))}createNode(t){const e=this.getNodeIndex(t.id);-1===e?this.nodes.push(t):this.nodes[e]=t}retrieveNode(t){return this.nodes.find((e=>e.id===t))}retrieveEdgesForNode(t){return this.edges.filter((e=>e.startNode===t||e.endNode===t))}updateNode(t){const e=this.getNodeIndex(t.id);-1!==e&&(this.nodes[e]=t)}deleteNode(t){const e=this.getNodeIndex(t);if(-1===e)return;this.nodes.splice(e,1);const i=this.retrieveEdgesForNode(t);for(const s of i)this.deleteEdge(s.id)}getEdgeIndex(t){return this.edges.findIndex((e=>e.id===t))}createEdge(t){const e=this.getEdgeIndex(t.id);-1===e?this.edges.push(t):this.edges[e]=t}retrieveEdge(t){return this.edges.find((e=>e.id===t))}updateEdge(t){const e=this.getEdgeIndex(t.id);-1!==e&&(this.edges[e]=t)}deleteEdge(t){const e=this.getEdgeIndex(t);-1!==e&&this.edges.splice(e,1)}linkNodes(t,e,i){const s=Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15);this.createEdge({id:s,startNode:t.id,endNode:e.id,name:i})}}class Y{constructor(t){var e;this.store=new J,this.offset={x:0,y:0},this.rotation=0,this.scale=1,this.action=X.NONE,this.selectedNodes=new Array,this.selectedEdges=new Array,this.hoveredNodes=new Array,this.matrix=[1,0,0,1,0,0],this.invMatrix=[1,0,0,1],this.shiftPressed=!1,this.onUpdate=()=>{},this.canvas=null!=(e=null==t?void 0:t.canvas)?e:document.createElement("canvas"),this.resize(null==t?void 0:t.size),this.ctx=this.canvas.getContext("2d"),this.ctx.imageSmoothingEnabled=!0,this.init()}init(){this.render(),this.canvas.addEventListener("contextmenu",(t=>t.preventDefault()),!1),this.canvas.addEventListener("wheel",(t=>this.onWheel(t)),!1),this.canvas.addEventListener("mousedown",(t=>this.onMouseDown(t)),!1),this.canvas.addEventListener("mousemove",(t=>this.onMouseMove(t)),!1),this.canvas.addEventListener("mouseup",(t=>this.onMouseUp(t)),!1),window.addEventListener("keydown",(t=>{this.shiftPressed=t.shiftKey})),window.addEventListener("keyup",(t=>{this.shiftPressed=!1}))}import(t){this.store=J.fromJson(t)}deleteNode(t){this.store.deleteNode(t.id),this.clear()}deleteEdge(t){this.store.deleteEdge(t.id),this.clearLinks(),this.onUpdate()}resize(t){this.size=null!=t?t:{width:window.innerWidth,height:window.innerHeight},this.canvas.setAttribute("width",`${this.size.width}px`),this.canvas.setAttribute("height",`${this.size.height}px`),this.canvas.width=this.size.width,this.canvas.height=this.size.height}onWheel(t){t.preventDefault(),t.ctrlKey?(this.action=X.ZOOM,this.scale-=.01*t.deltaY):(this.action=X.PAN,this.offset.x-=2*t.deltaX,this.offset.y-=2*t.deltaY),this.onUpdate(),this.action=X.NONE}onMouseDown(t){this.start={x:t.offsetX,y:t.offsetY},this.end={x:t.offsetX,y:t.offsetY},this.action=this.shiftPressed?X.LINK:X.MOVE,this.clear();const e=this.getSelection(this.start);this.selectedNodes.push(...e),this.onUpdate()}onMouseUp(t){if(this.action===X.LINK){const t=this.getSelection(this.start),e=this.getSelection(this.end);if(t.length>0&&e.length>0){const i=this.store.retrieveNode(t[t.length-1]),s=this.store.retrieveNode(e[e.length-1]);i&&s&&this.store.linkNodes(i,s,"simple")}}this.start=void 0,this.end=void 0,this.action=X.NONE}onMouseMove(t){if(this.selectedNodes.length>0){if(this.action===X.MOVE){const e={x:t.offsetX-this.start.x,y:t.offsetY-this.start.y},i=this.selectedNode();i&&this.moveNode(i,e),this.start={x:t.offsetX,y:t.offsetY}}this.action===X.LINK&&(this.end={x:t.offsetX,y:t.offsetY})}else this.checkHover({x:t.offsetX,y:t.offsetY})}checkHover(t){this.hoveredNodes.splice(0,this.hoveredNodes.length);const e=this.getSelection(t);this.hoveredNodes.push(...e);const i=this.hoveredNode();this.canvas.style.cursor=i?"pointer":"default"}moveNode(t,e){t.x+=e.x/this.scale,t.y+=e.y/this.scale,this.store.updateNode(t)}selectedNode(){if(0===this.selectedNodes.length)return;const t=this.selectedNodes[this.selectedNodes.length-1];return this.store.retrieveNode(t)}hoveredNode(){if(0===this.hoveredNodes.length)return;const t=this.hoveredNodes[this.hoveredNodes.length-1];return this.store.retrieveNode(t)}clear(){this.selectedNodes.splice(0,this.selectedNodes.length),this.onUpdate()}clearLinks(){this.selectedEdges.splice(0,this.selectedEdges.length),this.onUpdate()}getSelection(t){const e=new Array,i=this.toWorld(t.x,t.y);for(const s of this.store.nodes)i.x>=s.x&&i.x<=s.x+s.width&&i.y>=s.y&&i.y<=s.y+s.height&&e.push(s.id);return e}render(){this.paint(),requestAnimationFrame((()=>this.render()))}paint(){this.ctx.setTransform(1,0,0,1,0,0),this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.renderBackground(),this.updateMatrix(),this.renderEdges(),this.renderNodes(),this.renderLink()}updateMatrix(){this.createMatrix(this.offset.x,this.offset.y,this.scale,this.rotation);const t=this.matrix;this.ctx.setTransform(t[0],t[1],t[2],t[3],t[4],t[5])}createMatrix(t,e,i,s){const o=this.matrix,n=this.invMatrix;o[3]=o[0]=Math.cos(s)*i,o[2]=-(o[1]=Math.sin(s)*i),o[4]=t,o[5]=e;const r=o[0]*o[3]-o[1]*o[2];n[0]=o[3]/r,n[1]=-o[1]/r,n[2]=-o[2]/r,n[3]=o[0]/r}toWorld(t,e){let i,s,o;return o=this.invMatrix,i=t-this.matrix[4],s=e-this.matrix[5],{x:i*o[0]+s*o[2],y:i*o[1]+s*o[3]}}renderLink(){this.action===X.LINK&&this.scopedPaint((t=>{t.beginPath(),t.strokeStyle="red";const e=this.toWorld(this.start.x,this.start.y),i=this.toWorld(this.end.x,this.end.y);t.moveTo(e.x,e.y),t.lineTo(i.x,i.y),t.stroke()}))}renderBackground(){this.ctx.save(),this.ctx.fillStyle="whitesmoke",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height),this.ctx.restore()}renderNodes(){for(const t of this.store.nodes)this.renderNode(t)}renderEdges(){for(const t of this.store.edges)this.renderEdge(t)}renderNode(t){var e,i,s;this.ctx.save(),this.ctx.moveTo(t.x,t.y);const o=(null==(e=this.selectedNode())?void 0:e.id)===t.id,n=(null==(i=this.hoveredNode())?void 0:i.id)===t.id;this.scopedPaint((e=>{e.translate(t.x,t.y-5),e.font="12px Arial",e.textAlign="left",e.fillStyle="black",e.fillText(t.name,0,0)})),this.ctx.fillStyle=null!=(s=null==t?void 0:t.backgroundColor)?s:"white",this.ctx.fillRect(t.x,t.y,t.width,t.height),this.ctx.strokeStyle=o?"red":n?"blue":"black",this.ctx.strokeRect(t.x,t.y,t.width,t.height),this.ctx.restore()}renderEdge(t){this.scopedPaint((e=>{const i=this.selectedEdges.includes(t.id),s=this.store.retrieveNode(t.startNode),o=this.store.retrieveNode(t.endNode),n={x:s.x+s.width/2,y:s.y+s.height/2,width:s.width,height:s.height},r={x:o.x+o.width/2,y:o.y+o.height/2,width:o.width,height:o.height};e.beginPath(),e.strokeStyle=i?"purple":"black",e.moveTo(n.x,n.y),e.bezierCurveTo(n.x+n.width/2,n.y,r.x-r.width/2,r.y,r.x,r.y),e.stroke()}))}scopedPaint(t){this.ctx.save(),t(this.ctx),this.ctx.restore()}}var X,Z;(Z=X||(X={}))[Z.NONE=0]="NONE",Z[Z.ZOOM=1]="ZOOM",Z[Z.PAN=2]="PAN",Z[Z.MOVE=3]="MOVE",Z[Z.LINK=4]="LINK";var G=Object.defineProperty,Q=Object.getOwnPropertyDescriptor;"undefined"!=typeof require&&require;let tt=class extends q{constructor(){super(...arguments),this.editor=new Y({size:{width:window.innerWidth-200,height:window.innerHeight}})}render(){return C`<main>
      <div id="output">${this.editor.canvas}</div>
      <div id="properties">
        <span class="title">Properties</span>
        ${this.renderProperties()}
      </div>
    </main>`}renderProperties(){var t;const e=this.editor.selectedNode();if(!e)return C`<div>
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
      </div>`;const i=this.editor.store.retrieveEdgesForNode(e.id);return C`
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
      <div id="links">
        <span>Links</span>
        ${i.map((t=>C`<div class="property">
            <span>[${t.startNode}-${t.endNode}]</span>
            <input
              type="text"
              .value=${t.name}
              @change=${e=>{t.name=e.target.value,this.editor.store.updateEdge(t)}}
            />
            <button
              @click=${()=>{this.editor.clearLinks(),this.requestUpdate(),this.editor.selectedEdges.push(t.id)}}
            >
              Select link
            </button>
            <button
              class="destructive"
              @click=${()=>{confirm("Are you sure?")&&this.editor.deleteEdge(t)}}
            >
              Delete link
            </button>
          </div>`))}
      </div>
      <div class="property">
        <button
          class="destructive"
          @click=${()=>{confirm("Are you sure?")&&this.editor.deleteNode(e)}}
        >
          Delete node
        </button>
      </div>
    `}firstUpdated(){for(let t=0;t<10;t++)this.addRandomNode(t);for(let t=0;t<5;t++){const e=this.editor.store.nodes[t],i=this.editor.store.nodes[t+5];this.editor.store.linkNodes(e,i,"simple")}this.editor.onUpdate=()=>{this.requestUpdate()},window.addEventListener("resize",(()=>{this.editor.resize({width:window.innerWidth-200,height:window.innerHeight})}))}addRandomNode(t=this.editor.store.nodes.length){const e={id:`node${t}`,name:"Node "+t,x:Math.random()*this.editor.canvas.width,y:Math.random()*this.editor.canvas.height,width:100,height:100};return this.editor.store.createNode(e),e}};var et;tt.styles=((t,...i)=>{const o=1===t.length?t[0]:i.reduce(((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new s(o,e)})`
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
  `,tt=((t,e,i,s)=>{for(var o,n=s>1?void 0:s?Q(e,i):e,r=t.length-1;r>=0;r--)(o=t[r])&&(n=(s?o(e,i,n):o(n))||n);return s&&n&&G(e,i,n),n})([(et="node-editor",t=>{return"function"==typeof t?(e=et,i=t,window.customElements.define(e,i),i):((t,e)=>{const{kind:i,elements:s}=e;return{kind:i,elements:s,finisher(e){window.customElements.define(t,e)}}})(et,t);var e,i})],tt);
