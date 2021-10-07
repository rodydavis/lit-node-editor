!function(){const t=document.createElement("link").relList;if(!(t&&t.supports&&t.supports("modulepreload"))){for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver((t=>{for(const s of t)if("childList"===s.type)for(const t of s.addedNodes)"LINK"===t.tagName&&"modulepreload"===t.rel&&e(t)})).observe(document,{childList:!0,subtree:!0})}function e(t){if(t.ep)return;t.ep=!0;const e=function(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerpolicy&&(e.referrerPolicy=t.referrerpolicy),"use-credentials"===t.crossorigin?e.credentials="include":"anonymous"===t.crossorigin?e.credentials="omit":e.credentials="same-origin",e}(t);fetch(t.href,e)}}();
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,e=Symbol(),s=new Map;class i{constructor(t,s){if(this._$cssResult$=!0,s!==e)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){let e=s.get(this.cssText);return t&&void 0===e&&(s.set(this.cssText,e=new CSSStyleSheet),e.replaceSync(this.cssText)),e}toString(){return this.cssText}}const o=(t,...s)=>{const o=1===t.length?t[0]:s.reduce(((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1]),t[0]);return new i(o,e)},n=t?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let s="";for(const e of t.cssRules)s+=e.cssText;return(t=>new i("string"==typeof t?t:t+"",e))(s)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var r,l;const h={toAttribute(t,e){switch(e){case Boolean:t=t?"":null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(i){s=null}}return s}},a=(t,e)=>e!==t&&(e==e||t==t),d={attribute:!0,type:String,converter:h,reflect:!1,hasChanged:a};class c extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var e;null!==(e=this.l)&&void 0!==e||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,s)=>{const i=this._$Eh(s,e);void 0!==i&&(this._$Eu.set(i,s),t.push(i))})),t}static createProperty(t,e=d){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,i=this.getPropertyDescriptor(t,s,e);void 0!==i&&Object.defineProperty(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(i){const o=this[t];this[e]=i,this.requestUpdate(t,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||d}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of e)this.createProperty(s,t[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eh(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ev=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Ep(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,s;(null!==(e=this._$Em)&&void 0!==e?e:this._$Em=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t))}removeController(t){var e;null===(e=this._$Em)||void 0===e||e.splice(this._$Em.indexOf(t)>>>0,1)}_$Ep(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Et.set(e,this[e]),delete this[e])}))}createRenderRoot(){var e;const s=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return i=s,o=this.constructor.elementStyles,t?i.adoptedStyleSheets=o.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):o.forEach((t=>{const e=document.createElement("style"),s=window.litNonce;void 0!==s&&e.setAttribute("nonce",s),e.textContent=t.cssText,i.appendChild(e)})),s;var i,o}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Em)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Em)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$Eg(t,e,s=d){var i,o;const n=this.constructor._$Eh(t,s);if(void 0!==n&&!0===s.reflect){const r=(null!==(o=null===(i=s.converter)||void 0===i?void 0:i.toAttribute)&&void 0!==o?o:h.toAttribute)(e,s.type);this._$Ei=t,null==r?this.removeAttribute(n):this.setAttribute(n,r),this._$Ei=null}}_$AK(t,e){var s,i,o;const n=this.constructor,r=n._$Eu.get(t);if(void 0!==r&&this._$Ei!==r){const t=n.getPropertyOptions(r),l=t.converter,a=null!==(o=null!==(i=null===(s=l)||void 0===s?void 0:s.fromAttribute)&&void 0!==i?i:"function"==typeof l?l:null)&&void 0!==o?o:h.fromAttribute;this._$Ei=r,this[r]=a(e,t.type),this._$Ei=null}}requestUpdate(t,e,s){let i=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||a)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===s.reflect&&this._$Ei!==t&&(void 0===this._$ES&&(this._$ES=new Map),this._$ES.set(t,s))):i=!1),!this.isUpdatePending&&i&&(this._$Ev=this._$EC())}async _$EC(){this.isUpdatePending=!0;try{await this._$Ev}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,e)=>this[e]=t)),this._$Et=void 0);let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),null===(t=this._$Em)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(s)):this._$ET()}catch(i){throw e=!1,this._$ET(),i}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;null===(e=this._$Em)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$ET(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ev}shouldUpdate(t){return!0}update(t){void 0!==this._$ES&&(this._$ES.forEach(((t,e)=>this._$Eg(e,this[e],t))),this._$ES=void 0),this._$ET()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var u,p;c.finalized=!0,c.elementProperties=new Map,c.elementStyles=[],c.shadowRootOptions={mode:"open"},null===(r=globalThis.reactiveElementPolyfillSupport)||void 0===r||r.call(globalThis,{ReactiveElement:c}),(null!==(l=globalThis.reactiveElementVersions)&&void 0!==l?l:globalThis.reactiveElementVersions=[]).push("1.0.0");const v=globalThis.trustedTypes,f=v?v.createPolicy("lit-html",{createHTML:t=>t}):void 0,g=`lit$${(Math.random()+"").slice(9)}$`,y="?"+g,m=`<${y}>`,x=document,$=(t="")=>x.createComment(t),b=t=>null===t||"object"!=typeof t&&"function"!=typeof t,_=Array.isArray,E=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,w=/-->/g,A=/>/g,S=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,N=/'/g,M=/"/g,C=/^(?:script|style|textarea)$/i,k=(R=1,(t,...e)=>({_$litType$:R,strings:t,values:e})),O=Symbol.for("lit-noChange"),U=Symbol.for("lit-nothing"),P=new WeakMap,T=x.createTreeWalker(x,129,null,!1);var R,L,H,I;class D{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,n=0;const r=t.length-1,l=this.parts,[h,a]=((t,e)=>{const s=t.length-1,i=[];let o,n=2===e?"<svg>":"",r=E;for(let h=0;h<s;h++){const e=t[h];let s,l,a=-1,d=0;for(;d<e.length&&(r.lastIndex=d,l=r.exec(e),null!==l);)d=r.lastIndex,r===E?"!--"===l[1]?r=w:void 0!==l[1]?r=A:void 0!==l[2]?(C.test(l[2])&&(o=RegExp("</"+l[2],"g")),r=S):void 0!==l[3]&&(r=S):r===S?">"===l[0]?(r=null!=o?o:E,a=-1):void 0===l[1]?a=-2:(a=r.lastIndex-l[2].length,s=l[1],r=void 0===l[3]?S:'"'===l[3]?M:N):r===M||r===N?r=S:r===w||r===A?r=E:(r=S,o=void 0);const c=r===S&&t[h+1].startsWith("/>")?" ":"";n+=r===E?e+m:a>=0?(i.push(s),e.slice(0,a)+"$lit$"+e.slice(a)+g+c):e+g+(-2===a?(i.push(void 0),h):c)}const l=n+(t[s]||"<?>")+(2===e?"</svg>":"");return[void 0!==f?f.createHTML(l):l,i]})(t,e);if(this.el=D.createElement(h,s),T.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(i=T.nextNode())&&l.length<r;){if(1===i.nodeType){if(i.hasAttributes()){const t=[];for(const e of i.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(g)){const s=a[n++];if(t.push(e),void 0!==s){const t=i.getAttribute(s.toLowerCase()+"$lit$").split(g),e=/([.?@])?(.*)/.exec(s);l.push({type:1,index:o,name:e[2],strings:t,ctor:"."===e[1]?V:"?"===e[1]?j:"@"===e[1]?W:K})}else l.push({type:6,index:o})}for(const e of t)i.removeAttribute(e)}if(C.test(i.tagName)){const t=i.textContent.split(g),e=t.length-1;if(e>0){i.textContent=v?v.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],$()),T.nextNode(),l.push({type:2,index:++o});i.append(t[e],$())}}}else if(8===i.nodeType)if(i.data===y)l.push({type:2,index:o});else{let t=-1;for(;-1!==(t=i.data.indexOf(g,t+1));)l.push({type:7,index:o}),t+=g.length-1}o++}}static createElement(t,e){const s=x.createElement("template");return s.innerHTML=t,s}}function z(t,e,s=t,i){var o,n,r,l;if(e===O)return e;let h=void 0!==i?null===(o=s._$Cl)||void 0===o?void 0:o[i]:s._$Cu;const a=b(e)?void 0:e._$litDirective$;return(null==h?void 0:h.constructor)!==a&&(null===(n=null==h?void 0:h._$AO)||void 0===n||n.call(h,!1),void 0===a?h=void 0:(h=new a(t),h._$AT(t,s,i)),void 0!==i?(null!==(r=(l=s)._$Cl)&&void 0!==r?r:l._$Cl=[])[i]=h:s._$Cu=h),void 0!==h&&(e=z(t,h._$AS(t,e.values),h,i)),e}class q{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;const{el:{content:s},parts:i}=this._$AD,o=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:x).importNode(s,!0);T.currentNode=o;let n=T.nextNode(),r=0,l=0,h=i[0];for(;void 0!==h;){if(r===h.index){let e;2===h.type?e=new B(n,n.nextSibling,this,t):1===h.type?e=new h.ctor(n,h.name,h.strings,this,t):6===h.type&&(e=new F(n,this,t)),this.v.push(e),h=i[++l]}r!==(null==h?void 0:h.index)&&(n=T.nextNode(),r++)}return o}m(t){let e=0;for(const s of this.v)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class B{constructor(t,e,s,i){var o;this.type=2,this._$AH=U,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cg=null===(o=null==i?void 0:i.isConnected)||void 0===o||o}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=z(this,t,e),b(t)?t===U||null==t||""===t?(this._$AH!==U&&this._$AR(),this._$AH=U):t!==this._$AH&&t!==O&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.S(t):(t=>{var e;return _(t)||"function"==typeof(null===(e=t)||void 0===e?void 0:e[Symbol.iterator])})(t)?this.M(t):this.$(t)}A(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}S(t){this._$AH!==t&&(this._$AR(),this._$AH=this.A(t))}$(t){this._$AH!==U&&b(this._$AH)?this._$AA.nextSibling.data=t:this.S(x.createTextNode(t)),this._$AH=t}T(t){var e;const{values:s,_$litType$:i}=t,o="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=D.createElement(i.h,this.options)),i);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===o)this._$AH.m(s);else{const t=new q(o,this),e=t.p(this.options);t.m(s),this.S(e),this._$AH=t}}_$AC(t){let e=P.get(t.strings);return void 0===e&&P.set(t.strings,e=new D(t)),e}M(t){_(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const o of t)i===e.length?e.push(s=new B(this.A($()),this.A($()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cg=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class K{constructor(t,e,s,i,o){this.type=1,this._$AH=U,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=U}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,s,i){const o=this.strings;let n=!1;if(void 0===o)t=z(this,t,e,0),n=!b(t)||t!==this._$AH&&t!==O,n&&(this._$AH=t);else{const i=t;let r,l;for(t=o[0],r=0;r<o.length-1;r++)l=z(this,i[s+r],e,r),l===O&&(l=this._$AH[r]),n||(n=!b(l)||l!==this._$AH[r]),l===U?t=U:t!==U&&(t+=(null!=l?l:"")+o[r+1]),this._$AH[r]=l}n&&!i&&this.k(t)}k(t){t===U?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class V extends K{constructor(){super(...arguments),this.type=3}k(t){this.element[this.name]=t===U?void 0:t}}class j extends K{constructor(){super(...arguments),this.type=4}k(t){t&&t!==U?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)}}class W extends K{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){var s;if((t=null!==(s=z(this,t,e,0))&&void 0!==s?s:U)===O)return;const i=this._$AH,o=t===U&&i!==U||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==U&&(i===U||o);o&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t)}}class F{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){z(this,t)}}null===(u=globalThis.litHtmlPolyfillSupport)||void 0===u||u.call(globalThis,D,B),(null!==(p=globalThis.litHtmlVersions)&&void 0!==p?p:globalThis.litHtmlVersions=[]).push("2.0.0");class Y extends c{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,e;const s=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=s.firstChild),s}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=((t,e,s)=>{var i,o;const n=null!==(i=null==s?void 0:s.renderBefore)&&void 0!==i?i:e;let r=n._$litPart$;if(void 0===r){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=r=new B(e.insertBefore($(),t),t,void 0,null!=s?s:{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1)}render(){return O}}Y.finalized=!0,Y._$litElement$=!0,null===(L=globalThis.litElementHydrateSupport)||void 0===L||L.call(globalThis,{LitElement:Y}),null===(H=globalThis.litElementPolyfillSupport)||void 0===H||H.call(globalThis,{LitElement:Y}),(null!==(I=globalThis.litElementVersions)&&void 0!==I?I:globalThis.litElementVersions=[]).push("3.0.0");class J{constructor(){this.nodes=[],this.edges=[]}static fromJson(t){const{nodes:e,edges:s}=JSON.parse(t),i=new J;return e&&(i.nodes=e),s&&(i.edges=s),i}toJson(){const t={nodes:this.nodes,edges:this.edges};return JSON.stringify(t,null,2)}getNodeIndex(t){return this.nodes.findIndex((e=>e.id===t))}createNode(t){const e=this.getNodeIndex(t.id);-1===e?this.nodes.push(t):this.nodes[e]=t}retrieveNode(t){return this.nodes.find((e=>e.id===t))}retrieveEdgesForNode(t){return this.edges.filter((e=>e.startNode===t||e.endNode===t))}updateNode(t){const e=this.getNodeIndex(t.id);-1!==e&&(this.nodes[e]=t)}deleteNode(t){const e=this.getNodeIndex(t);if(-1===e)return;this.nodes.splice(e,1);const s=this.retrieveEdgesForNode(t);for(const i of s)this.deleteEdge(i.id)}getEdgeIndex(t){return this.edges.findIndex((e=>e.id===t))}createEdge(t){const e=this.getEdgeIndex(t.id);-1===e?this.edges.push(t):this.edges[e]=t}retrieveEdge(t){return this.edges.find((e=>e.id===t))}updateEdge(t){const e=this.getEdgeIndex(t.id);-1!==e&&(this.edges[e]=t)}deleteEdge(t){const e=this.getEdgeIndex(t);-1!==e&&this.edges.splice(e,1)}linkNodes(t,e,s){const i=Math.random().toString(36).substring(2,15)+Math.random().toString(36).substring(2,15);this.createEdge({id:i,startNode:t.id,endNode:e.id,name:s,type:"edge"})}}const X=8;function G(t,e){const{x:s=0,y:i=0,maxWidth:o,fontFamily:n="Roboto",fontSize:r=X,fontStyle:l="normal",fontWeight:h="normal",textAlign:a="left",textBaseline:d="alphabetic",lineHeight:c=1.2,text:u,fillColor:p,strokeColor:v}=e;t.save(),t.font=`${l} ${h} ${r}px ${c}em ${n}`,t.textAlign=a,t.textBaseline=d,p&&(t.fillStyle=p,t.fillText(u,s,i,o)),v&&(t.strokeStyle=v,t.strokeText(u,s,i,o)),t.restore();return{height:r*c,width:t.measureText(e.text).width}}function Q(t,e){const{start:s,end:i,fillColor:o,strokeColor:n}=e;t.save(),t.beginPath(),t.moveTo(s.x,s.y),t.lineTo(i.x,i.y),o&&(t.fillStyle=o,t.fill()),n&&(t.strokeStyle=n,t.stroke()),t.restore()}function Z(t,e,s,i=1){if(t.x===e.x)return Math.abs(s.x-t.x)<=i;if(t.y===e.y)return Math.abs(s.y-t.y)<=i;const o=(e.y-t.y)/(e.x-t.x),n=t.y-o*t.x,r=o*s.x+n;return Math.abs(r-s.y)<=i}const tt=[1,0,0,1,0,0],et=[1,0,0,1],st=it({x:0,y:0},1,0);function it(t,e,s){const i=[...tt],o=[...et];i[3]=i[0]=Math.cos(s)*e,i[2]=-(i[1]=Math.sin(s)*e),i[4]=t.x,i[5]=t.y;const n=i[0]*i[3]-i[1]*i[2];return o[0]=i[3]/n,o[1]=-i[1]/n,o[2]=-i[2]/n,o[3]=i[0]/n,{matrix:i,inverseMatrix:o}}function ot(t,e){let s,i,o;o=t.inverseMatrix,s=e.x-t.matrix[4],i=e.y-t.matrix[5];return{x:s*o[0]+i*o[2],y:s*o[1]+i*o[3]}}function nt(t){const e=function(t){const e=t.matrix;return Math.atan2(e[1],e[0])}(t),{scale:s}=function(t){const e=t.matrix,s=Math.sqrt(e[0]*e[0]+e[1]*e[1]),i=Math.sqrt(e[2]*e[2]+e[3]*e[3]);return{scaleX:s,scaleY:i,scale:Math.max(s,i)}}(t);return{rotation:e,scale:s,offset:function(t){const e=t.matrix;return{x:e[4],y:e[5]}}(t)}}function rt(t,e){const s=e.matrix;t.setTransform(s[0],s[1],s[2],s[3],s[4],s[5])}function lt(t,e){const{x:s=0,y:i=0,width:o=0,height:n=0,fillColor:r,strokeColor:l}=e;t.rect(s,i,o,n),r&&(t.fillStyle=r,t.fillRect(s,i,o,n)),l&&(t.strokeStyle=l,t.strokeRect(s,i,o,n))}class ht{constructor(t,e){var s;this.host=t,this.store=new J,this.action=at.NONE,this.selection=new Array,this.pointers=new Map,this.mouse={x:0,y:0},this.minScale=.1,this.maxScale=4,this.gestureEvents=!1,this.lastScale=-1,this.lastRotation=-1,this.lastOffset={x:0,y:0},this.rotationEnabled=!0,this.zoomEnabled=!0,this.panEnabled=!0,this.context=st,this.host.addController(this),this.canvas=null!=(s=null==e?void 0:e.canvas)?s:document.createElement("canvas"),this.ctx=this.canvas.getContext("2d"),this.ctx.imageSmoothingEnabled=!0,this.resize(null==e?void 0:e.size),this.init()}hostConnected(){}hostDisconnected(){}nodeTree(){return{children:this.store.nodes.map((t=>ct(t,this.store,!this.selection.includes(t.id))))}}get size(){return{width:this.canvas.width,height:this.canvas.height}}init(){this.canvas.addEventListener("contextmenu",(t=>t.preventDefault()),!1),this.canvas.addEventListener("wheel",(t=>this.onWheel(t)),!1),this.canvas.addEventListener("pointerdown",(t=>this.onPointerDown(t)),!1),this.canvas.addEventListener("pointerover",(t=>this.onPointerMove(t)),!1),this.canvas.addEventListener("pointermove",(t=>this.onPointerMove(t)),!1),this.canvas.addEventListener("pointerup",(t=>this.onPointerUp(t)),!1),this.canvas.addEventListener("pointerleave",(t=>this.onPointerUp(t)),!1),this.canvas.addEventListener("pointercancel",(t=>this.onPointerUp(t)),!1),this.canvas.addEventListener("mousemove",(t=>this.onMouseMove(t)),!1),this.canvas.addEventListener("mousedown",(t=>this.onMouseDown(t)),!1),this.canvas.addEventListener("mouseup",(t=>this.onMouseUp(t)),!1),this.canvas.addEventListener("gesturestart",(t=>this.onGestureStart(t)),!1),this.canvas.addEventListener("gesturechange",(t=>this.onGestureChange(t)),!1),this.canvas.addEventListener("gestureend",(t=>this.onGestureEnd(t)),!1),window.addEventListener("keydown",(t=>this.onKeyDown(t))),window.addEventListener("DOMMouseScroll",(t=>{t.preventDefault()})),this.render(),this.host.requestUpdate()}render(){this.paint(),requestAnimationFrame((()=>this.render()))}onWheel(t){if(t.preventDefault(),!this.gestureEvents){if(t.ctrlKey){this.action=at.ZOOM;const e=.01*-t.deltaY;this.zoom(e)}else{this.action=at.PAN;const e={x:2*-t.deltaX,y:2*-t.deltaY};this.pan(e)}this.host.requestUpdate(),this.action=at.NONE}}onGestureStart(t){t.preventDefault(),this.gestureEvents=!0,this.lastScale=t.scale,this.lastRotation=t.rotation,this.lastOffset={x:t.clientX,y:t.clientY}}onGestureChange(t){t.preventDefault(),this.gestureEvents=!0;const{scale:e,offset:s,rotation:i}=nt(this.context);let o=i,n=e,r=s;o-=.01*(this.lastRotation-t.rotation),this.lastRotation=t.rotation;n-=1*(this.lastScale-t.scale),this.lastScale=t.scale;const l=.01*(this.lastOffset.x-t.clientX),h=.01*(this.lastOffset.y-t.clientY);r.x-=l*n,r.y-=h*n,this.lastOffset={x:t.clientX,y:t.clientY},this.context=it(r,n,o),this.host.requestUpdate(),rt(this.ctx,this.context)}onGestureEnd(t){t.preventDefault(),this.gestureEvents=!1}onMouseUp(t){this.mouse={x:t.offsetX,y:t.offsetY}}onMouseDown(t){this.mouse={x:t.offsetX,y:t.offsetY}}onMouseMove(t){this.mouse={x:t.offsetX,y:t.offsetY}}onPointerDown(t){const e={x:t.offsetX,y:t.offsetY};this.pointers.set(t.pointerId,e),this.canvas.setPointerCapture(t.pointerId),this.start=e,this.end=e;const s=ot(this.context,e);if(this.selection.length>1)return void(this.action=at.MOVE);const i=this.selectOffset(s,this.selection,t.shiftKey);if(0===i.length&&(this.selection=[],this.host.requestUpdate()),this.action=i.length>0?t.shiftKey?at.LINK:at.MOVE:at.MARQUEE,i.length>0){const t=i[i.length-1];this.action===at.MOVE&&(this.selection=[t])}}onPointerMove(t){const e={x:t.offsetX,y:t.offsetY},s=t.pointerId,i=this.pointers.get(s);if(i){const t={x:e.x-i.x,y:e.y-i.y};if(this.end=e,this.action===at.MOVE)for(const e of this.selection){const s=this.store.retrieveNode(e);s&&this.moveNode(s,t)}this.pointers.set(s,e)}}onPointerUp(t){if(this.canvas.releasePointerCapture(t.pointerId),this.pointers.delete(t.pointerId),this.start&&this.end){const e=ot(this.context,this.start),s=ot(this.context,this.end),i={x:Math.min(e.x,s.x),y:Math.min(e.y,s.y)},o={x:Math.max(e.x,s.x),y:Math.max(e.y,s.y)};if(this.action===at.LINK){const i=t.shiftKey,o=this.checkOffsetType(e,i),n=this.checkOffsetType(s,i);if("node"===o&&"node"===n){const t=this.getOffset(e,i),o=this.getOffset(s,i);this.store.linkNodes(t,o,"simple")}}else if(this.action===at.MARQUEE){t.shiftKey&&(this.selection=[]);const e={x:i.x,y:i.y,width:o.x-i.x,height:o.y-i.y},s=this.store.nodes,n=[];for(const t of s){const s={x:t.x,y:t.y,width:t.width,height:t.height};s.x<e.x+e.width&&s.x+s.width>e.x&&s.y<e.y+e.height&&s.y+s.height>e.y&&n.push(t)}for(const t of n)this.selection.push(t.id)}else this.selection=this.selectOffset(s,this.selection,t.shiftKey),this.host.requestUpdate()}this.start=void 0,this.end=void 0,this.action=at.NONE,this.host.requestUpdate()}getOffset(t,e){const s=this.selectOffset(t,this.selection,e);if(s.length>1){const t=this.store.retrieveNode(s[s.length-1]);if(t)return t}}checkOffsetType(t,e){const s=this.getOffset(t,e);return s?s.type:"none"}onKeyDown(t){"Backspace"!==t.key&&"Delete"!==t.key||this.deleteSelection();"+"!==t.key&&"="!==t.key||this.zoom(.1),"-"===t.key&&this.zoom(-.1);"ArrowUp"===t.key&&this.pan({x:0,y:-10}),"ArrowDown"===t.key&&this.pan({x:0,y:10}),"ArrowLeft"===t.key&&this.pan({x:-10,y:0}),"ArrowRight"===t.key&&this.pan({x:10,y:0}),"a"===t.key&&t.metaKey&&(this.selection=this.store.nodes.map((t=>t.id)),this.host.requestUpdate())}zoom(t){const{scale:e,offset:s,rotation:i}=nt(this.context);let o=e;o+=t,this.context=it(s,o,i)}pan(t){const{offset:e,scale:s,rotation:i}=nt(this.context);let o=e;o.x+=t.x/s,o.y+=t.y/s,this.context=it(o,s,i)}rotate(t){const{rotation:e,offset:s,scale:i}=nt(this.context);let o=e;o+=t,this.context=it(s,i,o)}import(t){this.store=J.fromJson(t)}deleteNode(t){this.store.deleteNode(t.id),this.clear(),this.host.requestUpdate()}deleteEdge(t){this.store.deleteEdge(t.id),this.clear(),this.host.requestUpdate()}resize(t){var e,s;const i=null!=(e=null==t?void 0:t.width)?e:window.innerWidth,o=null!=(s=null==t?void 0:t.height)?s:window.innerHeight;this.canvas.setAttribute("width",`${i}px`),this.canvas.setAttribute("height",`${o}px`),this.canvas.width=i,this.canvas.height=o}deleteSelection(){console.log("delete selection",this.selection);for(const t of this.selection){const e=this.store.retrieveNode(t);e&&this.store.deleteNode(e.id);const s=this.store.retrieveEdge(t);s&&this.store.deleteEdge(s.id)}this.selection=[],this.host.requestUpdate()}selectOffset(t,e,s){let i=[...e];s||(i=[]);const o=this.store.nodes.filter((e=>t.x>=e.x&&t.x<=e.x+e.width&&t.y>=e.y&&t.y<=e.y+e.height));if(o.length>0){const t=o[o.length-1];i.push(t.id)}if(!s&&i.length>0)return i;const n=this.store.edges.filter((e=>{const{start:s,end:i}=this.getEdgePoints(e);return Z(s,i,t)}));if(n.length>0){const t=n[n.length-1];i.push(t.id)}return i}get scale(){const{scale:t}=nt(this.context);return t}get rotation(){const{rotation:t}=nt(this.context);return t}get offset(){const{offset:t}=nt(this.context);return t}moveNode(t,e){const{scale:s}=nt(this.context);t.x+=e.x/s,t.y+=e.y/s,this.store.updateNode(t)}clear(){this.selection=[],this.host.requestUpdate()}paint(){!function(t){const e=tt;t.setTransform(e[0],e[1],e[2],e[3],e[4],e[5])}(this.ctx),this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),lt(this.ctx,{x:0,y:0,width:this.canvas.width,height:this.canvas.height,fillColor:"whitesmoke"}),rt(this.ctx,this.context);const t=this.mouse,e=ot(this.context,t);for(const s of this.store.edges){const t=this.selection.includes(s.id),{start:i,end:o,mid:n}=this.getEdgePoints(s),r=this.ctx;Q(r,{start:i,end:o,strokeColor:t?"red":"black"});Z(i,o,e)&&!t&&(r.strokeStyle="blue",r.stroke()),G(this.ctx,{text:s.name,textAlign:"center",x:n.x,y:n.y,fillColor:"black"})}for(const s of this.store.nodes){const t=this.selection.includes(s.id),i=this.ctx;G(i,{text:s.name,x:s.x,y:s.y-5,fillColor:"black"}),lt(i,{x:s.x,y:s.y,width:s.width,height:s.height,strokeColor:t?"red":"black",fillColor:"white"});e.x>=s.x&&e.x<=s.x+s.width&&e.y>=s.y&&e.y<=s.y+s.height&&!t&&(i.strokeStyle="blue",i.strokeRect(s.x,s.y,s.width,s.height))}if(this.start&&this.end){const t=ot(this.context,this.start),e=ot(this.context,this.end);this.action==at.LINK&&Q(this.ctx,{start:t,end:e,strokeColor:"red"}),this.action==at.MARQUEE&&lt(this.ctx,{x:Math.min(t.x,e.x),y:Math.min(t.y,e.y),width:Math.abs(t.x-e.x),height:Math.abs(t.y-e.y),fillColor:"rgba(135, 206, 235, 0.2)",strokeColor:"rgba(135, 206, 235, 0.5)"})}if(this.selection.length>1){const t=this.store.nodes.filter((t=>this.selection.includes(t.id))),e=Math.min(...t.map((t=>t.y))),s=Math.min(...t.map((t=>t.x))),i=Math.max(...t.map((t=>t.y+t.height))),o={x:s,y:e},n={x:Math.max(...t.map((t=>t.x+t.width))),y:i};o&&n&&lt(this.ctx,{x:o.x,y:o.y,width:n.x-o.x,height:n.y-o.y,fillColor:"transparent",strokeColor:"blue"})}}getEdgePoints(t){const e=this.store.retrieveNode(t.startNode),s=this.store.retrieveNode(t.endNode),i=t=>({x:t.x+t.width/2,y:t.y+t.height/2,width:t.width,height:t.height}),o=i(e),n=i(s);return{start:o,end:n,mid:function(t,e){return{x:(t.x+e.x)/2,y:(t.y+e.y)/2}}(o,n)}}}var at,dt;function ct(t,e,s=!1,i=new Map){if(i.has(t.id))return null;i.set(t.id,!0);const o=[],n=e.retrieveEdgesForNode(t.id);for(const r of n){const t=[],n=ct(e.retrieveNode(r.endNode),e,s,i);n&&t.push(n);const l=ct(e.retrieveNode(r.startNode),e,s,i);l&&t.push(l),o.push({id:r.id,name:r.name,children:t,collapsed:!1})}return{id:t.id,name:t.name,children:o,collapsed:s}}(dt=at||(at={}))[dt.NONE=0]="NONE",dt[dt.ZOOM=1]="ZOOM",dt[dt.PAN=2]="PAN",dt[dt.MOVE=3]="MOVE",dt[dt.LINK=4]="LINK",dt[dt.MARQUEE=5]="MARQUEE";function ut(t,e){return k`
    <li
      @click=${()=>{t.collapsed=!t.collapsed,e.onSelect(t),e.onUpdate()}}
    >
      ${t.name}
      ${t.collapsed||0===t.children.length?k``:k`
            <ul class="nested">
              ${t.children.map((t=>ut(t,e)))}
            </ul>
          `}
    </li>
  `}const pt={styles:o`
  ul.tree {
    width: 100%;
    height: 100%;
    overflow-x: scroll;
    white-space: nowrap;
  }
  ul.tree,
  ul.tree ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  ul.tree ul {
    margin-left: 10px;
  }
  ul.tree li {
    margin: 0;
    padding: 0 7px;
    line-height: 20px;
    color: #369;
    font-weight: bold;
    border-left: 1px solid rgb(100, 100, 100);
  }
  ul.tree li:last-child {
    border-left: none;
  }
  ul.tree li:before {
    position: relative;
    top: -0.3em;
    height: 1em;
    width: 12px;
    color: white;
    border-bottom: 1px solid rgb(100, 100, 100);
    content: "";
    display: inline-block;
    left: -7px;
  }
  ul.tree li:last-child:before {
    border-left: 1px solid rgb(100, 100, 100);
  }
`,template:function(t){return k`
    <ul class="tree">
      ${t.treeView.children.map((e=>ut(e,t)))}
    </ul>
  `}};var vt=Object.defineProperty,ft=Object.getOwnPropertyDescriptor;"undefined"!=typeof require&&require;let gt=class extends Y{constructor(){super(...arguments),this.editor=new ht(this,{size:{width:window.innerWidth-400,height:window.innerHeight}})}render(){return k`<main>
      <div class="sidebar">
        ${pt.template({treeView:this.editor.nodeTree(),onUpdate:()=>this.requestUpdate(),onSelect:t=>{this.editor.selection.push(t.id)}})}
      </div>
      <div id="output">${this.editor.canvas}</div>
      <div id="properties">${this.renderProperties()}</div>
    </main>`}renderProperties(){var t,e;const s=this.editor.selection[this.editor.selection.length-1],i=null!=(t=this.editor.store.retrieveNode(s))?t:this.editor.store.retrieveEdge(s);return"node"===(null==i?void 0:i.type)?k`
        <span class="title">Node</span>
        <div class="property">
          <label>Name</label>
          <input
            type="text"
            .value=${i.name}
            @change=${t=>{i.name=t.target.value,this.editor.store.updateNode(i)}}
          />
        </div>
        <div class="property">
          <label>Background Color</label>
          <input
            type="color"
            .value=${null!=(e=i.backgroundColor)?e:"#FFFFFF"}
            @change=${t=>{i.backgroundColor=t.target.value,this.editor.store.updateNode(i)}}
          />
        </div>
        <div class="property">
          <label>Width</label>
          <input
            type="number"
            .value=${i.width.toString()}
            @change=${t=>{i.width=Number(t.target.value),this.editor.store.updateNode(i)}}
          />
        </div>
        <div class="property">
          <label>Height</label>
          <input
            type="number"
            .value=${i.height.toString()}
            @change=${t=>{i.height=Number(t.target.value),this.editor.store.updateNode(i)}}
          />
        </div>
        <div class="property">
          <button
            class="destructive"
            @click=${()=>{confirm("Are you sure?")&&this.editor.deleteNode(i)}}
          >
            Delete node
          </button>
        </div>
      `:"edge"===(null==i?void 0:i.type)?k` <span class="title">Edge</span>
        <div class="property">
          <label>Name</label>
          <input
            type="text"
            .value=${i.name}
            @change=${t=>{i.name=t.target.value,this.editor.store.updateEdge(i)}}
          />
        </div>
        <div class="property">
          <button
            class="destructive"
            @click=${()=>{confirm("Are you sure?")&&this.editor.deleteEdge(i)}}
          >
            Delete node
          </button>
        </div>`:k` <span class="title">Editor</span>
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
            @change=${t=>{this.editor.zoom(Number(t.target.value))}}
          />
        </div>
        <div class="property">
          <label>Rotation</label>
          <input
            type="number"
            .value=${this.editor.rotation.toString()}
            step=".1"
            @change=${t=>{this.editor.rotate(Number(t.target.value))}}
          />
        </div>
        <div class="property">
          <label>Offset x</label>
          <input
            type="number"
            .value=${this.editor.offset.x.toString()}
            step=".1"
            @change=${t=>{this.editor.pan({x:Number(t.target.value),y:this.editor.offset.y})}}
          />
        </div>
        <div class="property">
          <label>Offset x</label>
          <input
            type="number"
            .value=${this.editor.offset.y.toString()}
            step=".1"
            @change=${t=>{this.editor.pan({x:this.editor.offset.x,y:Number(t.target.value)})}}
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
      </div>`}firstUpdated(){for(let t=0;t<10;t++)this.addRandomNode(t);for(let t=0;t<5;t++){const e=this.editor.store.nodes[t],s=this.editor.store.nodes[t+5];this.editor.store.linkNodes(e,s,"simple")}window.addEventListener("resize",(()=>{this.editor.resize({width:window.innerWidth-200,height:window.innerHeight})}))}addRandomNode(t=this.editor.store.nodes.length){const e={id:`node${t}`,name:"Node "+t,x:Math.random()*this.editor.canvas.width,y:Math.random()*this.editor.canvas.height,width:100,height:100,type:"node"};return this.editor.store.createNode(e),e}};var yt;gt.styles=[pt.styles,o`
      main {
        height: 100vh;
        width: 100%;
        display: flex;
        flex-direction: row;
      }
      #output {
        flex: 1;
      }
      .sidebar {
        width: ${200}px;
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
    `],gt=((t,e,s,i)=>{for(var o,n=i>1?void 0:i?ft(e,s):e,r=t.length-1;r>=0;r--)(o=t[r])&&(n=(i?o(e,s,n):o(n))||n);return i&&n&&vt(e,s,n),n})([(yt="node-editor",t=>{return"function"==typeof t?(e=yt,s=t,window.customElements.define(e,s),s):((t,e)=>{const{kind:s,elements:i}=e;return{kind:s,elements:i,finisher(e){window.customElements.define(t,e)}}})(yt,t);var e,s})],gt);
