!function(){const t=document.createElement("link").relList;if(!(t&&t.supports&&t.supports("modulepreload"))){for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver((t=>{for(const i of t)if("childList"===i.type)for(const t of i.addedNodes)"LINK"===t.tagName&&"modulepreload"===t.rel&&e(t)})).observe(document,{childList:!0,subtree:!0})}function e(t){if(t.ep)return;t.ep=!0;const e=function(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerpolicy&&(e.referrerPolicy=t.referrerpolicy),"use-credentials"===t.crossorigin?e.credentials="include":"anonymous"===t.crossorigin?e.credentials="omit":e.credentials="same-origin",e}(t);fetch(t.href,e)}}();
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,e=Symbol(),i=new Map;class s{constructor(t,i){if(this._$cssResult$=!0,i!==e)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){let e=i.get(this.cssText);return t&&void 0===e&&(i.set(this.cssText,e=new CSSStyleSheet),e.replaceSync(this.cssText)),e}toString(){return this.cssText}}const n=t?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let i="";for(const e of t.cssRules)i+=e.cssText;return(t=>new s("string"==typeof t?t:t+"",e))(i)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var o,r;const l={toAttribute(t,e){switch(e){case Boolean:t=t?"":null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(s){i=null}}return i}},h=(t,e)=>e!==t&&(e==e||t==t),d={attribute:!0,type:String,converter:l,reflect:!1,hasChanged:h};class a extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var e;null!==(e=this.l)&&void 0!==e||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const s=this._$Eh(i,e);void 0!==s&&(this._$Eu.set(s,i),t.push(s))})),t}static createProperty(t,e=d){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const n=this[t];this[e]=s,this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||d}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eh(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ev=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Ep(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$Em)&&void 0!==e?e:this._$Em=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$Em)||void 0===e||e.splice(this._$Em.indexOf(t)>>>0,1)}_$Ep(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Et.set(e,this[e]),delete this[e])}))}createRenderRoot(){var e;const i=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return s=i,n=this.constructor.elementStyles,t?s.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((t=>{const e=document.createElement("style"),i=window.litNonce;void 0!==i&&e.setAttribute("nonce",i),e.textContent=t.cssText,s.appendChild(e)})),i;var s,n}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Em)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Em)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$Eg(t,e,i=d){var s,n;const o=this.constructor._$Eh(t,i);if(void 0!==o&&!0===i.reflect){const r=(null!==(n=null===(s=i.converter)||void 0===s?void 0:s.toAttribute)&&void 0!==n?n:l.toAttribute)(e,i.type);this._$Ei=t,null==r?this.removeAttribute(o):this.setAttribute(o,r),this._$Ei=null}}_$AK(t,e){var i,s,n;const o=this.constructor,r=o._$Eu.get(t);if(void 0!==r&&this._$Ei!==r){const t=o.getPropertyOptions(r),h=t.converter,d=null!==(n=null!==(s=null===(i=h)||void 0===i?void 0:i.fromAttribute)&&void 0!==s?s:"function"==typeof h?h:null)&&void 0!==n?n:l.fromAttribute;this._$Ei=r,this[r]=d(e,t.type),this._$Ei=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||h)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$Ei!==t&&(void 0===this._$ES&&(this._$ES=new Map),this._$ES.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$Ev=this._$EC())}async _$EC(){this.isUpdatePending=!0;try{await this._$Ev}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,e)=>this[e]=t)),this._$Et=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$Em)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$ET()}catch(s){throw e=!1,this._$ET(),s}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$Em)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$ET(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ev}shouldUpdate(t){return!0}update(t){void 0!==this._$ES&&(this._$ES.forEach(((t,e)=>this._$Eg(e,this[e],t))),this._$ES=void 0),this._$ET()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var c,u;a.finalized=!0,a.elementProperties=new Map,a.elementStyles=[],a.shadowRootOptions={mode:"open"},null===(o=globalThis.reactiveElementPolyfillSupport)||void 0===o||o.call(globalThis,{ReactiveElement:a}),(null!==(r=globalThis.reactiveElementVersions)&&void 0!==r?r:globalThis.reactiveElementVersions=[]).push("1.0.0");const p=globalThis.trustedTypes,v=p?p.createPolicy("lit-html",{createHTML:t=>t}):void 0,f=`lit$${(Math.random()+"").slice(9)}$`,g="?"+f,y=`<${g}>`,m=document,$=(t="")=>m.createComment(t),x=t=>null===t||"object"!=typeof t&&"function"!=typeof t,E=Array.isArray,_=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,A=/-->/g,b=/>/g,w=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,S=/'/g,N=/"/g,M=/^(?:script|style|textarea)$/i,O=(T=1,(t,...e)=>({_$litType$:T,strings:t,values:e})),U=Symbol.for("lit-noChange"),C=Symbol.for("lit-nothing"),P=new WeakMap,k=m.createTreeWalker(m,129,null,!1);var T,R,L,H;class I{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,o=0;const r=t.length-1,l=this.parts,[h,d]=((t,e)=>{const i=t.length-1,s=[];let n,o=2===e?"<svg>":"",r=_;for(let h=0;h<i;h++){const e=t[h];let i,l,d=-1,a=0;for(;a<e.length&&(r.lastIndex=a,l=r.exec(e),null!==l);)a=r.lastIndex,r===_?"!--"===l[1]?r=A:void 0!==l[1]?r=b:void 0!==l[2]?(M.test(l[2])&&(n=RegExp("</"+l[2],"g")),r=w):void 0!==l[3]&&(r=w):r===w?">"===l[0]?(r=null!=n?n:_,d=-1):void 0===l[1]?d=-2:(d=r.lastIndex-l[2].length,i=l[1],r=void 0===l[3]?w:'"'===l[3]?N:S):r===N||r===S?r=w:r===A||r===b?r=_:(r=w,n=void 0);const c=r===w&&t[h+1].startsWith("/>")?" ":"";o+=r===_?e+y:d>=0?(s.push(i),e.slice(0,d)+"$lit$"+e.slice(d)+f+c):e+f+(-2===d?(s.push(void 0),h):c)}const l=o+(t[i]||"<?>")+(2===e?"</svg>":"");return[void 0!==v?v.createHTML(l):l,s]})(t,e);if(this.el=I.createElement(h,i),k.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=k.nextNode())&&l.length<r;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(f)){const i=d[o++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+"$lit$").split(f),e=/([.?@])?(.*)/.exec(i);l.push({type:1,index:n,name:e[2],strings:t,ctor:"."===e[1]?K:"?"===e[1]?j:"@"===e[1]?F:B})}else l.push({type:6,index:n})}for(const e of t)s.removeAttribute(e)}if(M.test(s.tagName)){const t=s.textContent.split(f),e=t.length-1;if(e>0){s.textContent=p?p.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],$()),k.nextNode(),l.push({type:2,index:++n});s.append(t[e],$())}}}else if(8===s.nodeType)if(s.data===g)l.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(f,t+1));)l.push({type:7,index:n}),t+=f.length-1}n++}}static createElement(t,e){const i=m.createElement("template");return i.innerHTML=t,i}}function D(t,e,i=t,s){var n,o,r,l;if(e===U)return e;let h=void 0!==s?null===(n=i._$Cl)||void 0===n?void 0:n[s]:i._$Cu;const d=x(e)?void 0:e._$litDirective$;return(null==h?void 0:h.constructor)!==d&&(null===(o=null==h?void 0:h._$AO)||void 0===o||o.call(h,!1),void 0===d?h=void 0:(h=new d(t),h._$AT(t,i,s)),void 0!==s?(null!==(r=(l=i)._$Cl)&&void 0!==r?r:l._$Cl=[])[s]=h:i._$Cu=h),void 0!==h&&(e=D(t,h._$AS(t,e.values),h,s)),e}class z{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;const{el:{content:i},parts:s}=this._$AD,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:m).importNode(i,!0);k.currentNode=n;let o=k.nextNode(),r=0,l=0,h=s[0];for(;void 0!==h;){if(r===h.index){let e;2===h.type?e=new W(o,o.nextSibling,this,t):1===h.type?e=new h.ctor(o,h.name,h.strings,this,t):6===h.type&&(e=new V(o,this,t)),this.v.push(e),h=s[++l]}r!==(null==h?void 0:h.index)&&(o=k.nextNode(),r++)}return n}m(t){let e=0;for(const i of this.v)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class W{constructor(t,e,i,s){var n;this.type=2,this._$AH=C,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cg=null===(n=null==s?void 0:s.isConnected)||void 0===n||n}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=D(this,t,e),x(t)?t===C||null==t||""===t?(this._$AH!==C&&this._$AR(),this._$AH=C):t!==this._$AH&&t!==U&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.S(t):(t=>{var e;return E(t)||"function"==typeof(null===(e=t)||void 0===e?void 0:e[Symbol.iterator])})(t)?this.M(t):this.$(t)}A(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}S(t){this._$AH!==t&&(this._$AR(),this._$AH=this.A(t))}$(t){this._$AH!==C&&x(this._$AH)?this._$AA.nextSibling.data=t:this.S(m.createTextNode(t)),this._$AH=t}T(t){var e;const{values:i,_$litType$:s}=t,n="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=I.createElement(s.h,this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===n)this._$AH.m(i);else{const t=new z(n,this),e=t.p(this.options);t.m(i),this.S(e),this._$AH=t}}_$AC(t){let e=P.get(t.strings);return void 0===e&&P.set(t.strings,e=new I(t)),e}M(t){E(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new W(this.A($()),this.A($()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cg=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class B{constructor(t,e,i,s,n){this.type=1,this._$AH=C,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=C}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const n=this.strings;let o=!1;if(void 0===n)t=D(this,t,e,0),o=!x(t)||t!==this._$AH&&t!==U,o&&(this._$AH=t);else{const s=t;let r,l;for(t=n[0],r=0;r<n.length-1;r++)l=D(this,s[i+r],e,r),l===U&&(l=this._$AH[r]),o||(o=!x(l)||l!==this._$AH[r]),l===C?t=C:t!==C&&(t+=(null!=l?l:"")+n[r+1]),this._$AH[r]=l}o&&!s&&this.k(t)}k(t){t===C?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class K extends B{constructor(){super(...arguments),this.type=3}k(t){this.element[this.name]=t===C?void 0:t}}class j extends B{constructor(){super(...arguments),this.type=4}k(t){t&&t!==C?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)}}class F extends B{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=D(this,t,e,0))&&void 0!==i?i:C)===U)return;const s=this._$AH,n=t===C&&s!==C||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==C&&(s===C||n);n&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class V{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){D(this,t)}}null===(c=globalThis.litHtmlPolyfillSupport)||void 0===c||c.call(globalThis,I,W),(null!==(u=globalThis.litHtmlVersions)&&void 0!==u?u:globalThis.litHtmlVersions=[]).push("2.0.0");class J extends a{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=((t,e,i)=>{var s,n;const o=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let r=o._$litPart$;if(void 0===r){const t=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;o._$litPart$=r=new W(e.insertBefore($(),t),t,void 0,null!=i?i:{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1)}render(){return U}}J.finalized=!0,J._$litElement$=!0,null===(R=globalThis.litElementHydrateSupport)||void 0===R||R.call(globalThis,{LitElement:J}),null===(L=globalThis.litElementPolyfillSupport)||void 0===L||L.call(globalThis,{LitElement:J}),(null!==(H=globalThis.litElementVersions)&&void 0!==H?H:globalThis.litElementVersions=[]).push("3.0.0");class Y{constructor(){this.nodes=[],this.edges=[]}static fromJson(t){const{nodes:e,edges:i}=JSON.parse(t),s=new Y;return e&&(s.nodes=e),i&&(s.edges=i),s}toJson(){const t={nodes:this.nodes,edges:this.edges};return JSON.stringify(t,null,2)}getNodeIndex(t){return this.nodes.findIndex((e=>e.id===t))}createNode(t){const e=this.getNodeIndex(t.id);-1===e?this.nodes.push(t):this.nodes[e]=t}retrieveNode(t){return this.nodes.find((e=>e.id===t))}retrieveEdgesForNode(t){return this.edges.filter((e=>e.startNode===t||e.endNode===t))}updateNode(t){const e=this.getNodeIndex(t.id);-1!==e&&(this.nodes[e]=t)}deleteNode(t){const e=this.getNodeIndex(t);if(-1===e)return;this.nodes.splice(e,1);const i=this.retrieveEdgesForNode(t);for(const s of i)this.deleteEdge(s.id)}getEdgeIndex(t){return this.edges.findIndex((e=>e.id===t))}createEdge(t){const e=this.getEdgeIndex(t.id);-1===e?this.edges.push(t):this.edges[e]=t}retrieveEdge(t){return this.edges.find((e=>e.id===t))}updateEdge(t){const e=this.getEdgeIndex(t.id);-1!==e&&(this.edges[e]=t)}deleteEdge(t){const e=this.getEdgeIndex(t);-1!==e&&this.edges.splice(e,1)}linkNodes(t,e,i){const s=Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15);this.createEdge({id:s,startNode:t.id,endNode:e.id,name:i,type:"edge"})}}class q{constructor(t){var e;this.store=new Y,this.offset={x:0,y:0},this.rotation=0,this.scale=1,this.action=X.NONE,this.selection=new Array,this.matrix=[1,0,0,1,0,0],this.invMatrix=[1,0,0,1],this.pointers=new Map,this.mouse={x:0,y:0},this.minScale=.1,this.maxScale=4,this.gestureEvents=!1,this.lastScale=-1,this.lastRotation=-1,this.lastOffset={x:0,y:0},this.rotationEnabled=!0,this.zoomEnabled=!0,this.panEnabled=!0,this.onUpdate=()=>{},this.canvas=null!=(e=null==t?void 0:t.canvas)?e:document.createElement("canvas"),this.resize(null==t?void 0:t.size),this.init()}get ctx(){const t=this.canvas.getContext("2d");return t.imageSmoothingEnabled=!0,t}get size(){return{width:this.canvas.width,height:this.canvas.height}}init(){this.render(),this.canvas.addEventListener("contextmenu",(t=>t.preventDefault()),!1),this.canvas.addEventListener("wheel",(t=>this.onWheel(t)),!1),this.canvas.addEventListener("pointerdown",(t=>this.onPointerDown(t)),!1),this.canvas.addEventListener("pointerover",(t=>this.onPointerMove(t)),!1),this.canvas.addEventListener("pointermove",(t=>this.onPointerMove(t)),!1),this.canvas.addEventListener("pointerup",(t=>this.onPointerUp(t)),!1),this.canvas.addEventListener("pointerleave",(t=>this.onPointerUp(t)),!1),this.canvas.addEventListener("pointercancel",(t=>this.onPointerUp(t)),!1),this.canvas.addEventListener("mousemove",(t=>this.onMouseMove(t)),!1),this.canvas.addEventListener("mousedown",(t=>this.onMouseDown(t)),!1),this.canvas.addEventListener("mouseup",(t=>this.onMouseUp(t)),!1),this.canvas.addEventListener("gesturestart",(t=>this.onGestureStart(t)),!1),this.canvas.addEventListener("gesturechange",(t=>this.onGestureChange(t)),!1),this.canvas.addEventListener("gestureend",(t=>this.onGestureEnd(t)),!1),window.addEventListener("keydown",(t=>this.onKeyDown(t))),window.addEventListener("DOMMouseScroll",(t=>{t.preventDefault()}))}onWheel(t){if(t.preventDefault(),!this.gestureEvents){if(t.ctrlKey){this.action=X.ZOOM;const e=.01*-t.deltaY;this.zoom(e)}else{this.action=X.PAN;const e={x:2*-t.deltaX,y:2*-t.deltaY};this.pan(e)}this.onUpdate(),this.action=X.NONE}}onGestureStart(t){t.preventDefault(),this.gestureEvents=!0,this.lastScale=t.scale,this.lastRotation=t.rotation,this.lastOffset={x:t.clientX,y:t.clientY}}onGestureChange(t){t.preventDefault(),this.gestureEvents=!0;const e=.01*(this.lastRotation-t.rotation);this.rotation-=e,this.lastRotation=t.rotation;const i=1*(this.lastScale-t.scale);this.scale-=i,this.lastScale=t.scale;const s=.01*(this.lastOffset.x-t.clientX),n=.01*(this.lastOffset.y-t.clientY);this.offset.x-=s*this.scale,this.offset.y-=n*this.scale,this.lastOffset={x:t.clientX,y:t.clientY},this.onUpdate(),this.applyMatrix()}onGestureEnd(t){t.preventDefault(),this.gestureEvents=!1}onMouseUp(t){this.mouse={x:t.offsetX,y:t.offsetY}}onMouseDown(t){this.mouse={x:t.offsetX,y:t.offsetY}}onMouseMove(t){this.mouse={x:t.offsetX,y:t.offsetY}}onPointerDown(t){const e={x:t.offsetX,y:t.offsetY};this.pointers.set(t.pointerId,e),this.canvas.setPointerCapture(t.pointerId),this.start=e,this.end=e;const i=this.toWorld(e.x,e.y),s=this.selectOffset(i,this.selection,t.shiftKey);if(0===s.length&&(this.selection=[],this.onUpdate()),this.action=s.length>0?t.shiftKey?X.LINK:X.MOVE:X.MARQUEE,s.length>0){const t=s[s.length-1];this.action===X.MOVE&&(this.movingNodeId=t)}}onPointerMove(t){const e={x:t.offsetX,y:t.offsetY},i=t.pointerId,s=this.pointers.get(i);if(s){const t={x:e.x-s.x,y:e.y-s.y};if(this.end=e,this.action===X.MOVE){const e=this.store.retrieveNode(this.movingNodeId);e&&this.moveNode(e,t)}this.pointers.set(i,e)}}onPointerUp(t){if(this.canvas.releasePointerCapture(t.pointerId),this.pointers.delete(t.pointerId),this.start&&this.end){const e=this.toWorld(this.start.x,this.start.y),i=this.toWorld(this.end.x,this.end.y),s={x:Math.min(e.x,i.x),y:Math.min(e.y,i.y)},n={x:Math.max(e.x,i.x),y:Math.max(e.y,i.y)};if(this.action===X.LINK){const s=t.shiftKey,n=this.checkOffsetType(e,s),o=this.checkOffsetType(i,s);if(console.log(X[this.action],s,n,o),"node"===n&&"node"===o){const t=this.getOffset(e,s),n=this.getOffset(i,s);this.store.linkNodes(t,n,"simple")}}else if(this.action===X.MARQUEE){t.shiftKey&&(this.selection=[]);const e={x:s.x,y:s.y,width:n.x-s.x,height:n.y-s.y},i=this.store.nodes,o=[];for(const t of i){const i={x:t.x,y:t.y,width:t.width,height:t.height};i.x<e.x+e.width&&i.x+i.width>e.x&&i.y<e.y+e.height&&i.y+i.height>e.y&&o.push(t)}for(const t of o)this.selection.push(t.id)}else this.selection=this.selectOffset(i,this.selection,t.shiftKey),this.onUpdate()}this.start=void 0,this.end=void 0,this.movingNodeId=void 0,this.action=X.NONE,this.onUpdate()}getOffset(t,e){const i=this.selectOffset(t,this.selection,e);if(i.length>1){const t=this.store.retrieveNode(i[i.length-1]);if(t)return t}}checkOffsetType(t,e){const i=this.getOffset(t,e);return i?i.type:"none"}onKeyDown(t){"Backspace"!==t.key&&"Delete"!==t.key||this.deleteSelection();"+"!==t.key&&"="!==t.key||this.zoom(.1),"-"===t.key&&this.zoom(-.1);"ArrowUp"===t.key&&this.pan({x:0,y:-10}),"ArrowDown"===t.key&&this.pan({x:0,y:10}),"ArrowLeft"===t.key&&this.pan({x:-10,y:0}),"ArrowRight"===t.key&&this.pan({x:10,y:0})}zoom(t){this.scale+=t,this.scale<=this.minScale?this.scale=this.minScale:this.scale>=this.maxScale&&(this.scale=this.maxScale)}pan(t){this.offset.x+=t.x/this.scale,this.offset.y+=t.y/this.scale}import(t){this.store=Y.fromJson(t)}deleteNode(t){this.store.deleteNode(t.id),this.clear(),this.onUpdate()}deleteEdge(t){this.store.deleteEdge(t.id),this.clear(),this.onUpdate()}resize(t){var e,i;const s=null!=(e=null==t?void 0:t.width)?e:window.innerWidth,n=null!=(i=null==t?void 0:t.height)?i:window.innerHeight;this.canvas.setAttribute("width",`${s}px`),this.canvas.setAttribute("height",`${n}px`),this.canvas.width=s,this.canvas.height=n}deleteSelection(){console.log("delete selection",this.selection);for(const t of this.selection){const e=this.store.retrieveNode(t);e&&this.store.deleteNode(e.id);const i=this.store.retrieveEdge(t);i&&this.store.deleteEdge(i.id)}this.selection=[],this.onUpdate()}selectOffset(t,e,i){let s=[...e];i||(s=[]);const n=this.store.nodes.filter((e=>t.x>=e.x&&t.x<=e.x+e.width&&t.y>=e.y&&t.y<=e.y+e.height)),o=this.store.edges.filter((e=>{const{start:i,end:s}=this.getEdgePoints(e);return et(this.ctx,i,s,t)}));if(n.length>0){const t=n[n.length-1];s.push(t.id)}if(!i&&s.length>0)return s;if(o.length>0){const t=o[o.length-1];s.push(t.id)}return s}moveNode(t,e){t.x+=e.x/this.scale,t.y+=e.y/this.scale,this.store.updateNode(t)}clear(){this.selection.splice(0,this.selection.length),this.onUpdate()}render(){this.paint(),requestAnimationFrame((()=>this.render()))}paint(){var t,e,i;if(this.ctx.setTransform(1,0,0,1,0,0),this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),t=this.ctx,e=this.canvas.width,i=this.canvas.height,t.fillStyle="whitesmoke",t.fillRect(0,0,e,i),this.applyMatrix(),this.renderEdges(),this.renderNodes(),this.start&&this.end){const t=this.toWorld(this.start.x,this.start.y),e=this.toWorld(this.end.x,this.end.y);this.action==X.LINK&&tt(this.ctx,t,e,"red"),this.action==X.MARQUEE&&function(t,e,i){t.beginPath(),t.fillStyle="rgba(0, 0, 1, 0.2)",t.rect(e.x,e.y,i.x-e.x,i.y-e.y),t.fill()}(this.ctx,t,e)}}setMatrix(t,e,i){this.offset=t,this.scale=e,this.rotation=i,this.applyMatrix()}applyMatrix(){const t=this.panEnabled?this.offset:{x:0,y:0},e=this.zoomEnabled?this.scale:1,i=this.rotationEnabled?this.rotation:0,{matrix:s}=this.createMatrix(t.x,t.y,e,i);this.ctx.setTransform(s[0],s[1],s[2],s[3],s[4],s[5])}createMatrix(t,e,i,s){const n=this.matrix,o=this.invMatrix;n[3]=n[0]=Math.cos(s)*i,n[2]=-(n[1]=Math.sin(s)*i),n[4]=t,n[5]=e;const r=n[0]*n[3]-n[1]*n[2];return o[0]=n[3]/r,o[1]=-n[1]/r,o[2]=-n[2]/r,o[3]=n[0]/r,{matrix:this.matrix,invMatrix:this.invMatrix}}toWorld(t,e){let i,s,n;return n=this.invMatrix,i=t-this.matrix[4],s=e-this.matrix[5],{x:i*n[0]+s*n[2],y:i*n[1]+s*n[3]}}renderNodes(){var t;const e=this.mouse,i=this.toWorld(e.x,e.y),s=this.store.nodes.filter((t=>i.x>=t.x&&i.x<=t.x+t.width&&i.y>=t.y&&i.y<=t.y+t.height));for(const n of this.store.nodes){const e=this.selection.includes(n.id),i=(null==(t=[...s].pop())?void 0:t.id)===n.id;Q(this.ctx,n,{isSelected:e,isHovered:i})}}renderEdges(){var t;const e=this.mouse,i=this.toWorld(e.x,e.y),s=this.store.edges.filter((t=>{const{start:e,end:s}=this.getEdgePoints(t);return et(this.ctx,e,s,i)}));for(const n of this.store.edges){const e=this.selection.includes(n.id),{start:i,end:o,mid:r}=this.getEdgePoints(n),l=(null==(t=[...s].pop())?void 0:t.id)===n.id;tt(this.ctx,i,o,e?"red":l?"blue":"black"),Z(this.ctx,n.name,{textAlign:"center",offset:r})}}getEdgePoints(t){const e=this.store.retrieveNode(t.startNode),i=this.store.retrieveNode(t.endNode),s={x:e.x+e.width/2,y:e.y+e.height/2,width:e.width,height:e.height},n={x:i.x+i.width/2,y:i.y+i.height/2,width:i.width,height:i.height};return{start:s,end:n,mid:{x:(s.x+n.x)/2,y:(s.y+n.y)/2}}}}var X,G;function Q(t,e,i){var s,n,o;Z(t,e.name,{offset:{x:e.x,y:e.y-5}});Z(t,`${`(${e.x.toFixed(2)},${e.y.toFixed(2)})`} - ${`${e.width}x${e.height}`}`,{offset:{x:e.x,y:e.y+e.height+10}}),t.fillStyle=null!=(s=null==e?void 0:e.backgroundColor)?s:"white",t.fillRect(e.x,e.y,e.width,e.height);const r=null!=(n=null==i?void 0:i.isSelected)&&n,l=null!=(o=null==i?void 0:i.isHovered)&&o;t.strokeStyle=r?"red":l?"blue":"black",t.strokeRect(e.x,e.y,e.width,e.height)}function Z(t,e,i){var s,n,o,r,l,h,d;t.font="10px 1.2em Arial",t.textAlign=null!=(s=null==i?void 0:i.textAlign)?s:"left",t.fillStyle=null!=(n=null==i?void 0:i.color)?n:"black";const a=null!=(r=null==(o=null==i?void 0:i.offset)?void 0:o.x)?r:0,c=null!=(h=null==(l=null==i?void 0:i.offset)?void 0:l.y)?h:0,u=null!=(d=null==i?void 0:i.maxWidth)?d:void 0;t.fillText(e,a,c,u);return{height:12,width:t.measureText(e).width}}function tt(t,e,i,s="black"){t.beginPath(),t.strokeStyle=s,t.moveTo(e.x,e.y),t.lineTo(i.x,i.y),t.stroke()}function et(t,e,i,s){return t.beginPath(),t.strokeStyle="transparent",t.moveTo(e.x,e.y),t.lineTo(i.x,i.y),t.stroke(),t.isPointInStroke(s.x,s.y)}(G=X||(X={}))[G.NONE=0]="NONE",G[G.ZOOM=1]="ZOOM",G[G.PAN=2]="PAN",G[G.MOVE=3]="MOVE",G[G.LINK=4]="LINK",G[G.MARQUEE=5]="MARQUEE";var it=Object.defineProperty,st=Object.getOwnPropertyDescriptor;"undefined"!=typeof require&&require;let nt=class extends J{constructor(){super(...arguments),this.editor=new q({size:{width:window.innerWidth-200,height:window.innerHeight}})}render(){return O`<main>
      <div id="output">${this.editor.canvas}</div>
      <div id="properties">${this.renderProperties()}</div>
    </main>`}renderProperties(){var t,e;const i=this.editor.selection[this.editor.selection.length-1],s=null!=(t=this.editor.store.retrieveNode(i))?t:this.editor.store.retrieveEdge(i);return"node"===(null==s?void 0:s.type)?O`
        <span class="title">Node</span>
        <div class="property">
          <label>Name</label>
          <input
            type="text"
            .value=${s.name}
            @change=${t=>{s.name=t.target.value,this.editor.store.updateNode(s)}}
          />
        </div>
        <div class="property">
          <label>Background Color</label>
          <input
            type="color"
            .value=${null!=(e=s.backgroundColor)?e:"#FFFFFF"}
            @change=${t=>{s.backgroundColor=t.target.value,this.editor.store.updateNode(s)}}
          />
        </div>
        <div class="property">
          <label>Width</label>
          <input
            type="number"
            .value=${s.width.toString()}
            @change=${t=>{s.width=Number(t.target.value),this.editor.store.updateNode(s)}}
          />
        </div>
        <div class="property">
          <label>Height</label>
          <input
            type="number"
            .value=${s.height.toString()}
            @change=${t=>{s.height=Number(t.target.value),this.editor.store.updateNode(s)}}
          />
        </div>
        <div class="property">
          <button
            class="destructive"
            @click=${()=>{confirm("Are you sure?")&&this.editor.deleteNode(s)}}
          >
            Delete node
          </button>
        </div>
      `:"edge"===(null==s?void 0:s.type)?O` <span class="title">Edge</span>
        <div class="property">
          <label>Name</label>
          <input
            type="text"
            .value=${s.name}
            @change=${t=>{s.name=t.target.value,this.editor.store.updateEdge(s)}}
          />
        </div>
        <div class="property">
          <button
            class="destructive"
            @click=${()=>{confirm("Are you sure?")&&this.editor.deleteEdge(s)}}
          >
            Delete node
          </button>
        </div>`:O` <span class="title">Editor</span>
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
            @click=${()=>{const t=this.addRandomNode();this.editor.selection.push(t.id),this.requestUpdate()}}
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
      </div>`}firstUpdated(){for(let t=0;t<10;t++)this.addRandomNode(t);for(let t=0;t<5;t++){const e=this.editor.store.nodes[t],i=this.editor.store.nodes[t+5];this.editor.store.linkNodes(e,i,"simple")}this.editor.onUpdate=()=>{this.requestUpdate()},window.addEventListener("resize",(()=>{this.editor.resize({width:window.innerWidth-200,height:window.innerHeight})}))}addRandomNode(t=this.editor.store.nodes.length){const e={id:`node${t}`,name:"Node "+t,x:Math.random()*this.editor.canvas.width,y:Math.random()*this.editor.canvas.height,width:100,height:100,type:"node"};return this.editor.store.createNode(e),e}};var ot;nt.styles=((t,...i)=>{const n=1===t.length?t[0]:i.reduce(((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new s(n,e)})`
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
  `,nt=((t,e,i,s)=>{for(var n,o=s>1?void 0:s?st(e,i):e,r=t.length-1;r>=0;r--)(n=t[r])&&(o=(s?n(e,i,o):n(o))||o);return s&&o&&it(e,i,o),o})([(ot="node-editor",t=>{return"function"==typeof t?(e=ot,i=t,window.customElements.define(e,i),i):((t,e)=>{const{kind:i,elements:s}=e;return{kind:i,elements:s,finisher(e){window.customElements.define(t,e)}}})(ot,t);var e,i})],nt);
