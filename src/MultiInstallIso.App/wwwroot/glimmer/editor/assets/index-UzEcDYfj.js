var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,o)=>(o=n==null?{}:e(i(n)),s(r||!n||!n.__esModule||!a.call(n,`default`)?t(o,`default`,{value:n,enumerable:!0}):o,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var l=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.for(`react.view_transition`),m=Symbol.iterator;function h(e){return typeof e!=`object`||!e?null:(e=m&&e[m]||e[`@@iterator`],typeof e==`function`?e:null)}var g={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},_=Object.assign,v={};function y(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||g}y.prototype.isReactComponent={},y.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},y.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function b(){}b.prototype=y.prototype;function x(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||g}var S=x.prototype=new b;S.constructor=x,_(S,y.prototype),S.isPureReactComponent=!0;var C=Array.isArray;function w(){}var T={H:null,A:null,T:null,S:null},E=Object.prototype.hasOwnProperty;function D(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function O(e,t){return D(e.type,t,e.props)}function k(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function A(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var j=/\/+/g;function M(e,t){return typeof e==`object`&&e&&e.key!=null?A(``+e.key):t.toString(36)}function N(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(w,w):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function P(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,P(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+M(e,0):a,C(o)?(i=``,c!=null&&(i=c.replace(j,`$&/`)+`/`),P(o,r,i,``,function(e){return e})):o!=null&&(k(o)&&(o=O(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(j,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(C(e))for(var u=0;u<e.length;u++)a=e[u],s=l+M(a,u),c+=P(a,r,i,s,o);else if(u=h(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+M(a,u++),c+=P(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return P(N(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function F(e,t,n){if(e==null)return e;var r=[],i=0;return P(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function I(e){if(e._status===-1){var t=e._result,n=t();n.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t,n.status===void 0&&(n.status=`fulfilled`,n.value=t))},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t,n.status===void 0&&(n.status=`rejected`,n.reason=t))}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var L=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)};function R(e){var t=T.T,n={};n.types=t===null?null:t.types,T.T=n;try{var r=e(),i=T.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(w,L)}catch(e){L(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),T.T=t}}function z(e){var t=T.T;if(t!==null){var n=t.types;n===null?t.types=[e]:n.indexOf(e)===-1&&n.push(e)}else R(z.bind(null,e))}var ee={map:F,forEach:function(e,t,n){F(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return F(e,function(){t++}),t},toArray:function(e){return F(e,function(e){return e})||[]},only:function(e){if(!k(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=ee,e.Component=y,e.Fragment=r,e.Profiler=a,e.PureComponent=x,e.StrictMode=i,e.Suspense=l,e.ViewTransition=p,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=T,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return T.H.useMemoCache(e)}},e.addTransitionType=z,e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=_({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!E.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return D(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)E.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return D(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=k,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:I}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=R,e.unstable_useCacheRefresh=function(){return T.H.useCacheRefresh()},e.use=function(e){return T.H.use(e)},e.useActionState=function(e,t,n){return T.H.useActionState(e,t,n)},e.useCallback=function(e,t){return T.H.useCallback(e,t)},e.useContext=function(e){return T.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return T.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return T.H.useEffect(e,t)},e.useEffectEvent=function(e){return T.H.useEffectEvent(e)},e.useId=function(){return T.H.useId()},e.useImperativeHandle=function(e,t,n){return T.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return T.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return T.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return T.H.useMemo(e,t)},e.useOptimistic=function(e,t){return T.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return T.H.useReducer(e,t,n)},e.useRef=function(e){return T.H.useRef(e)},e.useState=function(e){return T.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return T.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return T.H.useTransition()},e.version=`19.3.0`})),u=o(((e,t)=>{t.exports=l()})),d=o((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function x(e){if(h=!1,b(e),!m){if(n(c)!==null)m=!0,S||(S=!0,O());else{var t=n(l);t!==null&&j(x,t.startTime-e)}}}var S=!1,C=-1,w=5,T=-1;function E(){return g?!0:!(e.unstable_now()-T<w)}function D(){if(g=!1,S){var t=e.unstable_now();T=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(C),C=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&E());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&j(x,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}i=void 0}}finally{i?O():S=!1}}}var O;if(typeof y==`function`)O=function(){y(D)};else if(typeof MessageChannel<`u`){var k=new MessageChannel,A=k.port2;k.port1.onmessage=D,O=function(){A.postMessage(null)}}else O=function(){_(D,0)};function j(t,n){C=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):w=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(C),C=-1):h=!0,j(x,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,S||(S=!0,O()))),r},e.unstable_shouldYield=E,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),f=o(((e,t)=>{t.exports=d()})),p=o((e=>{var t=u();function n(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function r(){}var i={d:{f:r,r:function(){throw Error(n(522))},D:r,C:r,L:r,m:r,X:r,S:r,M:r},p:0,findDOMNode:null},a=Symbol.for(`react.portal`),o=Symbol.for(`react.recoverable`),s=Symbol.for(`react.optimistic_key`);function c(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:a,key:r==null?null:r===s?s:``+r,children:e,containerInfo:t,implementation:n}}var l=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function d(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,e.browser=function(e){return{$$typeof:o,_reason:e}},e.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(n(299));return c(e,t,null,r)},e.flushSync=function(e){var t=l.T,n=i.p;try{if(l.T=null,i.p=2,e)return e()}finally{l.T=t,i.p=n,i.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,i.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&i.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=d(n,t.crossOrigin),a=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?i.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:a,fetchPriority:o}):n===`script`&&i.d.X(e,{crossOrigin:r,integrity:a,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`){if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=d(t.as,t.crossOrigin);i.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0})}}else t??i.d.M(e)}},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=d(n,t.crossOrigin);i.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`){if(t){var n=d(t.as,t.crossOrigin);i.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0})}else i.d.m(e)}},e.requestFormReset=function(e){i.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return l.H.useFormState(e,t,n)},e.useFormStatus=function(){return l.H.useHostTransitionStatus()},e.version=`19.3.0`})),m=o(((e,t)=>{function n(){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE==`function`)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=p()})),h=o((e=>{var t=f(),n=u(),r=m();function i(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function a(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function o(e){for(var t=e,n=t;n&&!n.alternate;)t=n,t.flags&4098&&(e=t.return),n=t.return;for(;t.return;)t=t.return;return t.tag===3?e:null}function s(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function c(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function l(e){if(o(e)!==e)throw Error(i(188))}function d(e){var t=e.alternate;if(!t){if(t=o(e),t===null)throw Error(i(188));return t===e?e:null}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return l(a),e;if(s===r)return l(a),t;s=s.sibling}throw Error(i(188))}if(n.return!==r.return)n=a,r=s;else{for(var c=!1,u=a.child;u;){if(u===n){c=!0,n=a,r=s;break}if(u===r){c=!0,r=a,n=s;break}u=u.sibling}if(!c){for(u=s.child;u;){if(u===n){c=!0,n=s,r=a;break}if(u===r){c=!0,r=s,n=a;break}u=u.sibling}if(!c)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(n.tag!==3)throw Error(i(188));return n.stateNode.current===n?e:t}function p(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=p(e),t!==null)return t;e=e.sibling}return null}function h(e,t,n,r,i,a){for(;e!==null;){if((e.tag===5||e.tag===27||e.tag===6)&&n(e,r,i,a)||(e.tag!==22||e.memoizedState===null)&&(t||e.tag!==5&&e.tag!==27)&&h(e.child,t,n,r,i,a))return!0;e=e.sibling}return!1}function g(e){for(e=e.return;e!==null;){if(e.tag===3||e.tag===5||e.tag===27)return e;e=e.return}return null}function _(e){var t=!1;for(e=e.return;e!==null&&(e.tag===4&&(t=!0),e.tag!==3&&e.tag!==5&&e.tag!==27);)e=e.return;return t}function v(e){var t=[null,null],n=g(e);return n===null||y(t,e,n.child,{foundSelf:!1}),t}function y(e,t,n,r){for(;n!==null;){if(n===t)r.foundSelf=!0;else if(n.tag===5||n.tag===27||n.tag===6){if(r.foundSelf)return e[1]=n,!0;e[0]=n}else if((n.tag!==22||n.memoizedState===null)&&y(e,t,n.child,r))return!0;n=n.sibling}return!1}function b(e){switch(e.tag){case 5:case 27:case 6:return e.stateNode;case 3:return e.stateNode.containerInfo;default:throw Error(i(559))}}var x=null,S=null;function C(e,t,n){return e===n||e===t&&(x=e,!0)}function w(e,t,n){return e===n?(S=e,!1):e===t&&(S!==null&&(x=e),!0)}function T(e){if(e===null)return null;do e=e===null?null:e.return;while(e&&e.tag!==5&&e.tag!==27&&e.tag!==3);return e||null}function E(e,t,n){for(var r=0,i=e;i;i=n(i))r++;i=0;for(var a=t;a;a=n(a))i++;for(;0<r-i;)e=n(e),r--;for(;0<i-r;)t=n(t),i--;for(;r--;){if(e===t||t!==null&&e===t.alternate)return e;e=n(e),t=n(t)}return null}var D=Object.assign,O=Symbol.for(`react.element`),k=Symbol.for(`react.transitional.element`),A=Symbol.for(`react.portal`),j=Symbol.for(`react.fragment`),M=Symbol.for(`react.strict_mode`),N=Symbol.for(`react.profiler`),P=Symbol.for(`react.consumer`),F=Symbol.for(`react.context`),I=Symbol.for(`react.forward_ref`),L=Symbol.for(`react.suspense`),R=Symbol.for(`react.suspense_list`),z=Symbol.for(`react.memo`),ee=Symbol.for(`react.lazy`),B=Symbol.for(`react.activity`),te=Symbol.for(`react.legacy_hidden`),ne=Symbol.for(`react.memo_cache_sentinel`),V=Symbol.for(`react.view_transition`),re=Symbol.for(`react.recoverable`),H=Symbol.iterator;function U(e){return typeof e!=`object`||!e?null:(e=H&&e[H]||e[`@@iterator`],typeof e==`function`?e:null)}var ie=Symbol.for(`react.client.reference`);function W(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===ie?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case j:return`Fragment`;case N:return`Profiler`;case M:return`StrictMode`;case L:return`Suspense`;case R:return`SuspenseList`;case B:return`Activity`;case V:return`ViewTransition`}if(typeof e==`object`)switch(e.$$typeof){case A:return`Portal`;case F:return e.displayName||`Context`;case P:return(e._context.displayName||`Context`)+`.Consumer`;case I:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case z:return t=e.displayName||null,t===null?W(e.type)||`Memo`:t;case ee:t=e._payload,e=e._init;try{return W(e(t))}catch{}}return null}var ae=Array.isArray,G=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,K=r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,oe={pending:!1,data:null,method:null,action:null},se=[],ce=-1;function le(e){return{current:e}}function ue(e){0>ce||(e.current=se[ce],se[ce]=null,ce--)}function de(e,t){ce++,se[ce]=e.current,e.current=t}var fe=le(null),pe=le(null),me=le(null),he=le(null);function ge(e,t){switch(de(me,t),de(pe,e),de(fe,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?up(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=up(t),e=dp(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}ue(fe),de(fe,e)}function _e(){ue(fe),ue(pe),ue(me)}function ve(e){var t=e.memoizedState;t!==null&&(sh._currentValue=t.memoizedState,de(he,e)),t=fe.current;var n=dp(t,e.type);t!==n&&(de(pe,e),de(fe,n))}function ye(e){pe.current===e&&(ue(fe),ue(pe)),he.current===e&&(ue(he),sh._currentValue=oe)}var be,xe;function Se(e){if(be===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);be=t&&t[1]||``,xe=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+be+e+xe}var Ce=!1;function we(e,t){if(!e||Ce)return``;Ce=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}n=!1;try{var i=Object.getOwnPropertyDescriptor(e.prototype,`props`);Object.defineProperty(e.prototype,"props",{configurable:!0,set:function(){throw Error()}}),n=!0,new e}finally{n&&(i===void 0?delete e.prototype.props:Object.defineProperty(e.prototype,"props",i))}}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{Ce=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?Se(n):``}function q(e,t){switch(e.tag){case 26:case 27:case 5:return Se(e.type);case 16:return Se(`Lazy`);case 13:return e.child!==t&&t!==null?Se(`Suspense Fallback`):Se(`Suspense`);case 19:return Se(`SuspenseList`);case 0:case 15:return we(e.type,!1);case 11:return we(e.type.render,!1);case 1:return we(e.type,!0);case 31:return Se(`Activity`);case 30:return Se(`ViewTransition`);default:return``}}function Te(e){try{var t=``,n=null;do t+=q(e,n),n=e,e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var Ee=Object.prototype.hasOwnProperty,J=t.unstable_scheduleCallback,De=t.unstable_cancelCallback,Oe=t.unstable_shouldYield,ke=t.unstable_requestPaint,Ae=t.unstable_now,je=t.unstable_getCurrentPriorityLevel,Me=t.unstable_ImmediatePriority,Ne=t.unstable_UserBlockingPriority,Pe=t.unstable_NormalPriority,Fe=t.unstable_LowPriority,Ie=t.unstable_IdlePriority,Le=t.log,Re=t.unstable_setDisableYieldValue,ze=null,Be=null;function Ve(e){if(typeof Le==`function`&&Re(e),Be&&typeof Be.setStrictMode==`function`)try{Be.setStrictMode(ze,e)}catch{}}var He=Math.clz32?Math.clz32:Ge,Ue=Math.log,We=Math.LN2;function Ge(e){return e>>>=0,e===0?32:31-(Ue(e)/We|0)|0}var Ke=256,qe=262144,Je=4194304;function Ye(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&-e;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Xe(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=Ye(n))):i=Ye(o):i=Ye(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=Ye(n))):i=Ye(o)):i=Ye(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function Ze(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function Qe(e,t){t&8&&(t|=t&32);var n=e.entangledLanes;if(n!==0)for(e=e.entanglements,n&=t;0<n;){var r=31-He(n),i=1<<r;t|=e[r],n&=~i}return t}function $e(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function et(){var e=Je;return Je<<=1,!(Je&62914560)&&(Je=4194304),e}function tt(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function nt(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function rt(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-He(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&it(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function it(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-He(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function at(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-He(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function ot(e,t){var n=t&-t;return n=n&42?1:st(n),(n&(e.suspendedLanes|t))===0?n:0}function st(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function ct(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function lt(){var e=K.p;return e===0?(e=window.event,e===void 0?32:Ch(e.type)):e}function ut(e,t){var n=K.p;try{return K.p=e,t()}finally{K.p=n}}var dt=Math.random().toString(36).slice(2),ft=`__reactFiber$`+dt,pt=`__reactProps$`+dt,mt=`__reactContainer$`+dt,ht=`__reactEvents$`+dt,gt=`__reactListeners$`+dt,_t=`__reactHandles$`+dt,vt=`__reactResources$`+dt,yt=`__reactMarker$`+dt,bt=`__reactLoad$`+dt;function xt(e){delete e[ft],delete e[pt],delete e[gt],delete e[_t]}function St(e){var t;if(t=e[ft])return t;for(var n=e.parentNode;n;){if(t=n[mt]||n[ft]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=fm(e);e!==null;){if(n=e[ft])return n;e=fm(e)}return t}e=n,n=e.parentNode}return null}function Ct(e){if(e=e[ft]||e[mt]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function wt(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(i(33))}function Tt(e){var t=e[vt];return t||=e[vt]={hoistableStyles:new Map,hoistableScripts:new Map},t}function Et(e){e[yt]=!0}function Dt(e){e[bt]=void 0}var Ot=new Set,kt={};function At(e,t){jt(e,t),jt(e+`Capture`,t)}function jt(e,t){for(kt[e]=t,e=0;e<t.length;e++)Ot.add(t[e])}var Mt=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),Nt={},Pt={};function Ft(e){return Ee.call(Pt,e)?!0:Ee.call(Nt,e)?!1:Mt.test(e)?Pt[e]=!0:(Nt[e]=!0,!1)}var It=!1;function Lt(){var e=It;return It=!1,e}function Rt(e,t,n){if(Ft(t)){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,n)}}}function zt(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,n)}}function Bt(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,r)}}function Vt(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function Ht(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function Ut(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){n=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Wt(e){if(!e._valueTracker){var t=Ht(e)?`checked`:`value`;e._valueTracker=Ut(e,t,``+e[t])}}function Gt(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=Ht(e)?e.checked?`true`:`false`:e.value),e=r,e!==n&&(t.setValue(e),!0)}var Kt=/[\n"\\]/g;function qt(e){return e.replace(Kt,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function Jt(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+Vt(t)):e.value!==``+Vt(t)&&(e.value=``+Vt(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):Xt(e,Vt(n)):o===`number`&&e.value==t?Xt(e,Vt(e.value)):Xt(e,Vt(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+Vt(s):e.removeAttribute(`name`)}function Yt(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){Wt(e);return}n=n==null?``:``+Vt(n),t=t==null?n:``+Vt(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),Wt(e)}function Xt(e,t){e.defaultValue!==``+t&&(e.defaultValue=``+t)}function Zt(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+Vt(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function Qt(e,t,n){if(t!=null&&(t=``+Vt(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n==null?``:``+Vt(n)}function $t(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(i(92));if(ae(r)){if(1<r.length)throw Error(i(93));r=r[0]}n=r}n??=``,t=n}n=Vt(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),Wt(e)}function en(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var tn=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function nn(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||tn.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function rn(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(i(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``,It=!0);for(var a in t)r=t[a],t.hasOwnProperty(a)&&n[a]!==r&&(nn(e,a,r),It=!0)}else for(var o in t)t.hasOwnProperty(o)&&nn(e,o,t[o])}function an(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var on=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`maskType`,`mask-type`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),sn=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function cn(e){return sn.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function ln(){}var un=null;function dn(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var fn=null,pn=null;function mn(e){var t=Ct(e);if(t&&(e=t.stateNode)){var n=e[pt]||null;a:switch(e=t.stateNode,t.type){case`input`:if(Jt(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+qt(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=r[pt]||null;if(!a)throw Error(i(90));Jt(r,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&Gt(r)}break a;case`textarea`:Qt(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&Zt(e,!!n.multiple,t,!1)}}}var hn=!1;function gn(e,t,n){if(hn)return e(t,n);hn=!0;try{return e(t)}finally{if(hn=!1,(fn!==null||pn!==null)&&(Id(),fn&&(t=fn,e=pn,pn=fn=null,mn(t),e)))for(t=0;t<e.length;t++)mn(e[t])}}function _n(e,t){var n=e.stateNode;if(n===null)return null;var r=n[pt]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=e!==`button`&&e!==`input`&&e!==`select`&&e!==`textarea`),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(i(231,t,typeof n));return n}var vn=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0,yn=!1;if(vn)try{var bn={};Object.defineProperty(bn,"passive",{get:function(){yn=!0}}),window.addEventListener(`test`,bn,bn),window.removeEventListener(`test`,bn,bn)}catch{yn=!1}var xn=null,Sn=null,Cn=null;function wn(){if(Cn)return Cn;var e,t=Sn,n=t.length,r,i=`value`in xn?xn.value:xn.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return Cn=i.slice(e,1<r?1-r:void 0)}function Tn(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function En(){return!0}function Dn(){return!1}function On(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?En:Dn,this.isPropagationStopped=Dn,this}return D(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=En)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=En)},persist:function(){},isPersistent:En}),t}var kn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Y=On(kn),An=D({},kn,{view:0,detail:0}),jn=On(An),Mn,Nn,Pn,Fn=D({},An,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Gn,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==Pn&&(Pn&&e.type===`mousemove`?(Mn=e.screenX-Pn.screenX,Nn=e.screenY-Pn.screenY):Nn=Mn=0,Pn=e),Mn)},movementY:function(e){return`movementY`in e?e.movementY:Nn}}),In=On(Fn),X=On(D({},Fn,{dataTransfer:0})),Ln=On(D({},An,{relatedTarget:0})),Rn=On(D({},kn,{animationName:0,elapsedTime:0,pseudoElement:0})),zn=On(D({},kn,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),Bn=On(D({},kn,{data:0})),Vn={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},Hn={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},Un={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function Wn(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Un[e])?!!t[e]:!1}function Gn(){return Wn}var Kn=On(D({},An,{key:function(e){if(e.key){var t=Vn[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=Tn(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?Hn[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Gn,charCode:function(e){return e.type===`keypress`?Tn(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?Tn(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),qn=On(D({},Fn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),Jn=On(D({},kn,{submitter:0})),Yn=On(D({},An,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Gn})),Xn=On(D({},kn,{propertyName:0,elapsedTime:0,pseudoElement:0})),Zn=On(D({},Fn,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),Qn=On(D({},kn,{newState:0,oldState:0,source:0})),$n=[9,13,27,32],er=vn&&`CompositionEvent`in window,Z=null;vn&&`documentMode`in document&&(Z=document.documentMode);var tr=vn&&`TextEvent`in window&&!Z,nr=vn&&(!er||Z&&8<Z&&11>=Z),Q=` `,rr=!1;function ir(e,t){switch(e){case`keyup`:return $n.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function ar(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var or=!1;function sr(e,t){switch(e){case`compositionend`:return ar(t);case`keypress`:return t.which===32?(rr=!0,Q):null;case`textInput`:return e=t.data,e===Q&&rr?null:e;default:return null}}function cr(e,t){if(or)return e===`compositionend`||!er&&ir(e,t)?(e=wn(),Cn=Sn=xn=null,or=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return nr&&t.locale!==`ko`?null:t.data;default:return null}}var lr={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ur(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!lr[e.type]:t===`textarea`}function dr(e,t,n,r){fn?pn?pn.push(r):pn=[r]:fn=r,t=qf(t,`onChange`),0<t.length&&(n=new Y(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var fr=null,pr=null;function mr(e){zf(e,0)}function hr(e){if(Gt(wt(e)))return e}function gr(e,t){if(e===`change`)return t}var _r=!1;if(vn){var vr;if(vn){var yr=`oninput`in document;if(!yr){var br=document.createElement(`div`);br.setAttribute(`oninput`,`return;`),yr=typeof br.oninput==`function`}vr=yr}else vr=!1;_r=vr&&(!document.documentMode||9<document.documentMode)}function xr(){fr&&(fr.detachEvent(`onpropertychange`,Sr),pr=fr=null)}function Sr(e){if(e.propertyName===`value`&&hr(pr)){var t=[];dr(t,pr,e,dn(e)),gn(mr,t)}}function Cr(e,t,n){e===`focusin`?(xr(),fr=t,pr=n,fr.attachEvent(`onpropertychange`,Sr)):e===`focusout`&&xr()}function wr(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return hr(pr)}function Tr(e,t){if(e===`click`)return hr(t)}function Er(e,t){if(e===`input`||e===`change`)return hr(t)}function Dr(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var Or=typeof Object.is==`function`?Object.is:Dr;function kr(e,t){if(Or(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Ee.call(t,i)||!Or(e[i],t[i]))return!1}return!0}function Ar(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}function jr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Mr(e,t){var n=jr(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=jr(n)}}function Nr(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Nr(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Pr(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Ar(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=Ar(e.document)}return t}function Fr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var Ir=vn&&`documentMode`in document&&11>=document.documentMode,Lr=null,Rr=null,zr=null,Br=!1;function Vr(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Br||Lr==null||Lr!==Ar(r)||(r=Lr,`selectionStart`in r&&Fr(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),zr&&kr(zr,r)||(zr=r,r=qf(Rr,`onSelect`),0<r.length&&(t=new Y(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=Lr)))}function Hr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var Ur={animationend:Hr(`Animation`,`AnimationEnd`),animationiteration:Hr(`Animation`,`AnimationIteration`),animationstart:Hr(`Animation`,`AnimationStart`),transitionrun:Hr(`Transition`,`TransitionRun`),transitionstart:Hr(`Transition`,`TransitionStart`),transitioncancel:Hr(`Transition`,`TransitionCancel`),transitionend:Hr(`Transition`,`TransitionEnd`)},Wr={},Gr={};vn&&(Gr=document.createElement(`div`).style,`AnimationEvent`in window||(delete Ur.animationend.animation,delete Ur.animationiteration.animation,delete Ur.animationstart.animation),`TransitionEvent`in window||delete Ur.transitionend.transition);function Kr(e){if(Wr[e])return Wr[e];if(!Ur[e])return e;var t=Ur[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Gr)return Wr[e]=t[n];return e}var qr=Kr(`animationend`),Jr=Kr(`animationiteration`),Yr=Kr(`animationstart`),Xr=Kr(`transitionrun`),Zr=Kr(`transitionstart`),Qr=Kr(`transitioncancel`),$r=Kr(`transitionend`),ei=new Map,ti=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);ti.push(`scrollEnd`);function ni(e,t){ei.set(e,t),At(t,[e])}var ri=0;function ii(e,t){if(e.name!=null&&e.name!==`auto`)return e.name;if(t.autoName!==null)return t.autoName;e=_d.identifierPrefix;var n=ri++;return e=`_`+e+`t_`+n.toString(32)+`_`,t.autoName=e}function $(e){if(e==null||typeof e==`string`)return e;var t=null,n=Td;if(n!==null)for(var r=0;r<n.length;r++){var i=e[n[r]];if(i!=null){if(i===`none`)return`none`;t=t==null?i:t+(` `+i)}}return t??e.default}function ai(e,t){return e=$(e),t=$(t),t==null?e===`auto`?null:e:t===`auto`?null:t}var oi=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},si=[],ci=0,li=0;function ui(){for(var e=ci,t=li=ci=0;t<e;){var n=si[t];si[t++]=null;var r=si[t];si[t++]=null;var i=si[t];si[t++]=null;var a=si[t];if(si[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&mi(n,i,a)}}function di(e,t,n,r){si[ci++]=e,si[ci++]=t,si[ci++]=n,si[ci++]=r,li|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function fi(e,t,n,r){return di(e,t,n,r),hi(e)}function pi(e,t){return di(e,null,null,t),hi(e)}function mi(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-He(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function hi(e){if(50<Ed)throw Ed=0,Dd=null,Error(i(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var gi={};function _i(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function vi(e,t,n,r){return new _i(e,t,n,r)}function yi(e){return e=e.prototype,!(!e||!e.isReactComponent)}function bi(e,t){var n=e.alternate;return n===null?(n=vi(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&1206910976,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function xi(e,t){e.flags&=1206910978;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Si(e,t,n,r,a,o){var s=0;if(r=e,typeof r==`function`)yi(r)&&(s=1);else if(typeof r==`string`)s=qm(e,n,fe.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(r){case B:return e=vi(31,n,t,a),e.elementType=B,e.lanes=o,e;case j:return Ci(n.children,a,o,t);case M:s=8,a|=24;break;case N:return e=vi(12,n,t,a|2),e.elementType=N,e.lanes=o,e;case L:return e=vi(13,n,t,a),e.elementType=L,e.lanes=o,e;case R:return e=vi(19,n,t,a),e.elementType=R,e.lanes=o,e;case te:case V:return e=a|32,e=vi(30,n,t,e),e.elementType=V,e.lanes=o,e.stateNode={autoName:null,paired:null,clones:null,ref:null},e;default:if(typeof r==`object`&&r)switch(r.$$typeof){case F:s=10;break a;case P:s=9;break a;case I:s=11;break a;case z:s=14;break a;case ee:s=16,r=null;break a}s=29,n=Error(i(130,e===null?`null`:typeof e,``)),r=null}return t=vi(s,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function Ci(e,t,n,r){return e=vi(7,e,r,t),e.lanes=n,e}function wi(e,t,n){return e=vi(6,e,null,t),e.lanes=n,e}function Ti(e){var t=vi(18,null,null,0);return t.stateNode=e,t}function Ei(e,t,n){return t=vi(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var Di=new WeakMap;function Oi(e,t){if(typeof e==`object`&&e){var n=Di.get(e);return n===void 0?(t={value:e,source:t,stack:Te(t)},Di.set(e,t),t):n}return{value:e,source:t,stack:Te(t)}}var ki=[],Ai=0,ji=null,Mi=0,Ni=[],Pi=0,Fi=null,Ii=1,Li=``;function Ri(e,t){ki[Ai++]=Mi,ki[Ai++]=ji,ji=e,Mi=t}function zi(e,t,n){Ni[Pi++]=Ii,Ni[Pi++]=Li,Ni[Pi++]=Fi,Fi=e;var r=Ii;e=Li;var i=32-He(r)-1;r&=~(1<<i),n+=1;var a=32-He(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,Ii=1<<32-He(t)+i|n<<i|r,Li=a+e}else Ii=1<<a|n<<i|r,Li=e}function Bi(e){e.return!==null&&(Ri(e,1),zi(e,1,0))}function Vi(e){for(;e===ji;)ji=ki[--Ai],ki[Ai]=null,Mi=ki[--Ai],ki[Ai]=null;for(;e===Fi;)Fi=Ni[--Pi],Ni[Pi]=null,Li=Ni[--Pi],Ni[Pi]=null,Ii=Ni[--Pi],Ni[Pi]=null}function Hi(e,t){Ni[Pi++]=Ii,Ni[Pi++]=Li,Ni[Pi++]=Fi,Ii=t.id,Li=t.overflow,Fi=e}var Ui=null,Wi=null,Gi=!1,Ki=null,qi=!1,Ji=Error(i(519));function Yi(e){throw ta(Oi(Error(i(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),Ji}function Xi(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[ft]=e,t[pt]=r,n){case`dialog`:Bf(`cancel`,t),Bf(`close`,t);break;case`iframe`:case`object`:case`embed`:Bf(`load`,t);break;case`video`:case`audio`:for(n=0;n<Lf.length;n++)Bf(Lf[n],t);break;case`source`:Bf(`error`,t);break;case`img`:case`image`:case`link`:Bf(`error`,t),Bf(`load`,t);break;case`details`:Bf(`toggle`,t);break;case`input`:Bf(`invalid`,t),Yt(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:Bf(`invalid`,t);break;case`textarea`:Bf(`invalid`,t),$t(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||$f(t.textContent,n)?(r.popover!=null&&(Bf(`beforetoggle`,t),Bf(`toggle`,t)),r.onScroll!=null&&Bf(`scroll`,t),r.onScrollEnd!=null&&Bf(`scrollend`,t),r.onClick!=null&&(t.onclick=ln),t=!0):t=!1,t||Yi(e,!0)}function Zi(e){for(Ui=e.return;Ui;)switch(Ui.tag){case 5:case 31:case 13:qi=!1;return;case 27:case 3:qi=!0;return;default:Ui=Ui.return}}function Qi(e){if(e!==Ui)return!1;if(!Gi)return Zi(e),Gi=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=n===`form`||n===`button`||pp(e.type,e.memoizedProps)),n=!n),n&&Wi&&Yi(e),Zi(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));Wi=dm(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));Wi=dm(e)}else t===27?(t=Wi,Sp(e.type)?(e=um,um=null,Wi=e):Wi=t):Wi=Ui?lm(e.stateNode.nextSibling):null;return!0}function $i(){Wi=Ui=null,Gi=!1}function ea(){var e=Ki;return e!==null&&(ld===null?ld=e:ld.push.apply(ld,e),Ki=null),e}function ta(e){Ki===null?Ki=[e]:Ki.push(e)}var na=le(null),ra=null,ia=null;function aa(e,t,n){de(na,t._currentValue),t._currentValue=n}function oa(e){e._currentValue=na.current,ue(na)}function sa(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function ca(e,t,n,r){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var o=a.dependencies;if(o!==null){var s=a.child;o=o.firstContext;a:for(;o!==null;){var c=o;o=a;for(var l=0;l<t.length;l++)if(c.context===t[l]){o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),sa(o.return,n,e),r||(s=null);break a}o=c.next}}else if(a.tag===18){if(s=a.return,s===null)throw Error(i(341));s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),sa(s,n,e),s=null}else a.tag===13&&a.memoizedState!==null&&a.memoizedState.dehydrated===null?(a.lanes|=n,s=a.alternate,s!==null&&(s.lanes|=n),sa(a.return,n,e),s=a.child,s=s===null?null:s.sibling):s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}}function la(e,t,n,r){e=null;for(var a=t,o=!1;a!==null;){if(!o){if(a.flags&524288)o=!0;else if(a.flags&262144)break}if(a.tag===10){var s=a.alternate;if(s===null)throw Error(i(387));if(s=s.memoizedProps,s!==null){var c=a.type;Or(a.pendingProps.value,s.value)||(e===null?e=[c]:e.push(c))}}else if(a===he.current){if(s=a.alternate,s===null)throw Error(i(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e===null?e=[sh]:e.push(sh))}a=a.return}return e!==null&&ca(t,e,n,r),t.flags|=262144,e!==null}function ua(e){for(e=e.firstContext;e!==null;){if(!Or(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function da(e){ra=e,ia=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function fa(e){return ma(ra,e)}function pa(e,t){return ra===null&&da(e),ma(e,t)}function ma(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},ia===null){if(e===null)throw Error(i(308));ia=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else ia=ia.next=t;return n}var ha=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},ga=t.unstable_scheduleCallback,_a=t.unstable_NormalPriority,va={$$typeof:F,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function ya(){return{controller:new ha,data:new Map,refCount:0}}function ba(e){e.refCount--,e.refCount===0&&ga(_a,function(){e.controller.abort()})}function xa(e,t){if(e.pendingLanes&4194048){var n=e.transitionTypes;for(n===null&&(n=e.transitionTypes=[]),e=0;e<t.length;e++){var r=t[e];n.indexOf(r)===-1&&n.push(r)}}}var Sa=null;function Ca(e){var t=e.transitionTypes;return e.transitionTypes=null,t}var wa=null,Ta=0,Ea=0,Da=null;function Oa(e,t){if(wa===null){var n=wa=[];Ta=0,Ea=Mf(),Da={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return Ta++,t.then(ka,ka),t}function ka(){if(--Ta===0&&(Sa=null,wa!==null)){Da!==null&&(Da.status=`fulfilled`);var e=wa;wa=null,Ea=0,Da=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function Aa(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var ja=G.S;G.S=function(e,t){if(fd=Ae(),typeof t==`object`&&t&&typeof t.then==`function`&&Oa(e,t),Sa!==null)for(var n=vf;n!==null;)xa(n,Sa),n=n.next;if(n=e.types,n!==null){for(var r=vf;r!==null;)xa(r,n),r=r.next;if(Ea!==0){r=Sa,r===null&&(r=Sa=[]);for(var i=0;i<n.length;i++){var a=n[i];r.indexOf(a)===-1&&r.push(a)}}}ja!==null&&ja(e,t)};var Ma=le(null);function Na(){var e=Ma.current;return e===null?qu.pooledCache:e}function Pa(e,t){t===null?de(Ma,Ma.current):de(Ma,t.pool)}function Fa(){var e=Na();return e===null?null:{parent:va._currentValue,pool:e}}var Ia=Error(i(460)),La=Error(i(474)),Ra=Error(i(542)),za={then:function(){}};function Ba(e){return e=e.status,e===`fulfilled`||e===`rejected`}function Va(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(ln,ln),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Ga(e),e===void 0&&!(`reason`in t)?Error(i(600)):e;default:if(typeof t.status==`string`)t.then(ln,ln);else{if(e=qu,e!==null&&100<e.shellSuspendCounter)throw Error(i(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,Ga(e),e}throw Ua=t,Ia}}function Ha(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?(Ua=e,Ia):e}}var Ua=null;function Wa(){if(Ua===null)throw Error(i(459));var e=Ua;return Ua=null,e}function Ga(e){if(e===Ia||e===Ra)throw Error(i(483))}var Ka=null,qa=0;function Ja(e){var t=qa;return qa+=1,Ka===null&&(Ka=[]),Va(Ka,e,t)}function Ya(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function Xa(e,t){throw t.$$typeof===O?Error(i(525)):(e=Object.prototype.toString.call(t),Error(i(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function Za(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function a(e,t){return e=bi(e,t),e.index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=134217730,n):(r=r.index,r<n?(t.flags|=2,n):r)):(t.flags|=1048576,n)}function s(t){return e&&t.alternate===null&&(t.flags|=134217730),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=wi(n,e.mode,r),t.return=e,t):(t=a(t,n),t.return=e,t)}function l(e,t,n,r){var i=n.type;return i===j?(e=d(e,t,n.props.children,r,n.key),Ya(e,n),e):t!==null&&(t.elementType===i||typeof i==`object`&&i&&i.$$typeof===ee&&Ha(i)===t.type)?(t=a(t,n.props),Ya(t,n),t.return=e,t):(t=Si(n.type,n.key,n.props,null,e.mode,r),Ya(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=Ei(n,e.mode,r),t.return=e,t):(t=a(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,i){return t===null||t.tag!==7?(t=Ci(n,e.mode,r,i),t.return=e,t):(t=a(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=wi(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case k:return n=Si(t.type,t.key,t.props,null,e.mode,n),Ya(n,t),n.return=e,n;case A:return t=Ei(t,e.mode,n),t.return=e,t;case ee:return t=Ha(t),f(e,t,n)}if(ae(t)||U(t))return t=Ci(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,Ja(t),n);if(t.$$typeof===F)return f(e,pa(e,t),n);Xa(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case k:return n.key===i?l(e,t,n,r):null;case A:return n.key===i?u(e,t,n,r):null;case ee:return n=Ha(n),p(e,t,n,r)}if(ae(n)||U(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,Ja(n),r);if(n.$$typeof===F)return p(e,t,pa(e,n),r);Xa(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case k:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case A:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case ee:return r=Ha(r),m(e,t,n,r,i)}if(ae(r)||U(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,Ja(r),i);if(r.$$typeof===F)return m(e,t,n,pa(t,r),i);Xa(t,r)}return null}function h(i,a,s,c){for(var l=null,u=null,d=a,h=a=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),a=o(_,a,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),Gi&&Ri(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(a=o(d,a,h),u===null?l=d:u.sibling=d,u=d);return Gi&&Ri(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&(_=g.alternate,_!==null&&d.delete(_.key===null?h:_.key)),a=o(g,a,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),Gi&&Ri(i,h),l}function g(a,s,c,l){if(c==null)throw Error(i(151));for(var u=null,d=null,h=s,g=s=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(a,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(a,h),s=o(y,s,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(a,h),Gi&&Ri(a,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(a,v.value,l),v!==null&&(s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return Gi&&Ri(a,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,a,g,v.value,l),v!==null&&(e&&(_=v.alternate,_!==null&&h.delete(_.key===null?g:_.key)),s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(a,e)}),Gi&&Ri(a,g),u}function _(e,r,o,c){if(typeof o==`object`&&o&&o.type===j&&o.key===null&&o.props.ref===void 0&&(o=o.props.children),typeof o==`object`&&o){switch(o.$$typeof){case k:a:{for(var l=o.key;r!==null;){if(r.key===l){if(l=o.type,l===j){if(r.tag===7){n(e,r.sibling),c=a(r,o.props.children),Ya(c,o),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===ee&&Ha(l)===r.type){n(e,r.sibling),c=a(r,o.props),Ya(c,o),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}o.type===j?(c=Ci(o.props.children,e.mode,c,o.key),Ya(c,o),c.return=e,e=c):(c=Si(o.type,o.key,o.props,null,e.mode,c),Ya(c,o),c.return=e,e=c)}return s(e);case A:a:{for(l=o.key;r!==null;){if(r.key===l){if(r.tag===4&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),c=a(r,o.children||[]),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}c=Ei(o,e.mode,c),c.return=e,e=c}return s(e);case ee:return o=Ha(o),_(e,r,o,c)}if(ae(o))return h(e,r,o,c);if(U(o)){if(l=U(o),typeof l!=`function`)throw Error(i(150));return o=l.call(o),g(e,r,o,c)}if(typeof o.then==`function`)return _(e,r,Ja(o),c);if(o.$$typeof===F)return _(e,r,pa(e,o),c);Xa(e,o)}return typeof o==`string`&&o!==``||typeof o==`number`||typeof o==`bigint`?(o=``+o,r!==null&&r.tag===6?(n(e,r.sibling),c=a(r,o),c.return=e,e=c):(n(e,r),c=wi(o,e.mode,c),c.return=e,e=c),s(e)):n(e,r)}return function(e,t,n,r){try{qa=0;var i=_(e,t,n,r);return Ka=null,i}catch(t){if(t===Ia||t===Ra)throw t;var a=vi(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var Qa=Za(!0),$a=Za(!1),eo=!1;function to(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function no(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function ro(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function io(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,Ku&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=hi(e),mi(e,null,n),t}return di(e,r,t,n),hi(e)}function ao(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,at(e,n)}}function oo(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var so=!1;function co(){if(so){var e=Da;if(e!==null)throw e}}function lo(e,t,n,r){so=!1;var i=e.updateQueue;eo=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var f=s.lane&-536870913,p=f!==s.lane;if(p?(Yu&f)===f:(r&f)===f){f!==0&&f===Ea&&(so=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var m=e,h=s;f=t;var g=n;switch(h.tag){case 1:if(m=h.payload,typeof m==`function`){d=m.call(g,d,f);break a}d=m;break a;case 3:m.flags=m.flags&-65537|128;case 0:if(m=h.payload,f=typeof m==`function`?m.call(g,d,f):m,f==null)break a;d=D({},d,f);break a;case 2:eo=!0}}f=s.callback,f!==null&&(e.flags|=64,p&&(e.flags|=8192),p=i.callbacks,p===null?i.callbacks=[f]:p.push(f))}else p={lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=p,c=d):u=u.next=p,o|=f;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;p=s,s=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),rd|=o,e.lanes=o,e.memoizedState=d}}function uo(e,t){if(typeof e!=`function`)throw Error(i(191,e));e.call(t)}function fo(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)uo(n[e],t)}var po=le(null),mo=le(0);function ho(e,t){e=td,de(mo,e),de(po,t),td=e|t.baseLanes}function go(){de(mo,td),de(po,po.current)}function _o(){td=mo.current,ue(po),ue(mo)}var vo=le(null),yo=null;function bo(e){var t=e.alternate;de(To,To.current&1),de(vo,e),yo===null&&(t===null||po.current!==null||t.memoizedState!==null)&&(yo=e)}function xo(e){de(To,To.current),de(vo,e),yo===null&&(yo=e)}function So(e){e.tag===22?(de(To,To.current),de(vo,e),yo===null&&(yo=e)):Co()}function Co(){de(To,To.current),de(vo,vo.current)}function wo(e){ue(vo),yo===e&&(yo=null),ue(To)}var To=le(0);function Eo(e,t){de(vo,vo.current),de(To,t)}function Do(e){ue(To),ue(vo),yo===e&&(yo=null)}function Oo(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||om(n)||sm(n)))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==`independent`){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var ko=0,Ao=null,jo=null,Mo=null,No=!1,Po=!1,Fo=!1,Io=0,Lo=0,Ro=null,zo=0;function Bo(){throw Error(i(321))}function Vo(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Or(e[n],t[n]))return!1;return!0}function Ho(e,t,n,r,i,a){return ko=a,Ao=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,G.H=e===null||e.memoizedState===null?ac:oc,Fo=!1,a=n(r,i),Fo=!1,Po&&(a=Wo(t,n,r,i)),Uo(e),a}function Uo(e){G.H=ic;var t=jo!==null&&jo.next!==null;if(ko=0,Mo=jo=Ao=null,No=!1,Lo=0,Ro=null,t)throw Error(i(300));e===null||Cc||(e=e.dependencies,e!==null&&ua(e)&&(Cc=!0))}function Wo(e,t,n,r){Ao=e;var a=0;do{if(Po&&(Ro=null),Lo=0,Po=!1,25<=a)throw Error(i(301));if(a+=1,Mo=jo=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}G.H=sc,o=t(n,r)}while(Po);return o}function Go(){var e=G.H,t=e.useState()[0];return t=typeof t.then==`function`?Qo(t):t,e=e.useState()[0],(jo===null?null:jo.memoizedState)!==e&&(Ao.flags|=1024),t}function Ko(){var e=Io!==0;return Io=0,e}function qo(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function Jo(e){if(No){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}No=!1}ko=0,Mo=jo=Ao=null,Po=!1,Lo=Io=0,Ro=null}function Yo(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Mo===null?Ao.memoizedState=Mo=e:Mo=Mo.next=e,Mo}function Xo(){if(jo===null){var e=Ao.alternate;e=e===null?null:e.memoizedState}else e=jo.next;var t=Mo===null?Ao.memoizedState:Mo.next;if(t!==null)Mo=t,jo=e;else{if(e===null)throw Ao.alternate===null?Error(i(467)):Error(i(310));jo=e,e={memoizedState:jo.memoizedState,baseState:jo.baseState,baseQueue:jo.baseQueue,queue:jo.queue,next:null},Mo===null?Ao.memoizedState=Mo=e:Mo=Mo.next=e}return Mo}function Zo(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Qo(e){var t=Lo;return Lo+=1,Ro===null&&(Ro=[]),e=Va(Ro,e,t),t=Ao,(Mo===null?t.memoizedState:Mo.next)===null&&(t=t.alternate,G.H=t===null||t.memoizedState===null?ac:oc),e}function $o(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return Qo(e);if(e.$$typeof===re)return;if(e.$$typeof===F)return fa(e)}throw Error(i(438,String(e)))}function es(e){var t=null,n=Ao.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=Ao.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=Zo(),Ao.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=ne;return t.index++,n}function ts(e,t){return typeof t==`function`?t(e):t}function ns(e){return rs(Xo(),jo,e)}function rs(e,t,n){var r=e.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=n;var a=e.baseQueue,o=r.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}t.baseQueue=a=o,r.pending=null}if(o=e.baseState,a===null)e.memoizedState=o;else{t=a.next;var c=s=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(ko&f)===f:(Yu&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===Ea&&(d=!0);else if((ko&p)===p){u=u.next,p===Ea&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,s=o):l=l.next=f,Ao.lanes|=p,rd|=p;f=u.action,Fo&&n(o,f),o=u.hasEagerState?u.eagerState:n(o,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,s=o):l=l.next=p,Ao.lanes|=f,rd|=f;u=u.next}while(u!==null&&u!==t);if(l===null?s=o:l.next=c,!Or(o,e.memoizedState)&&(Cc=!0,d&&(n=Da,n!==null)))throw n;e.memoizedState=o,e.baseState=s,e.baseQueue=l,r.lastRenderedState=o}return a===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function is(e){var t=Xo(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);Or(o,t.memoizedState)||(Cc=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function as(e,t,n){var r=Ao,a=Xo(),o=Gi;if(o){if(n===void 0)throw Error(i(407));n=n()}else n=t();var s=!Or((jo||a).memoizedState,n);if(s&&(a.memoizedState=n,Cc=!0),a=a.queue,As(cs.bind(null,r,a,e),[e]),e=a.getSnapshot!==t||s||Mo!==null&&!!(Mo.memoizedState.tag&1),Ts(e?9:8,{destroy:void 0},ss.bind(null,r,a,n,t),null),e){if(r.flags|=2048,qu===null)throw Error(i(349));o||ko&127||os(r,t,n)}return n}function os(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=Ao.updateQueue,t===null?(t=Zo(),Ao.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function ss(e,t,n,r){t.value=n,t.getSnapshot=r,ls(t)&&us(e)}function cs(e,t,n){return n(function(){ls(t)&&us(e)})}function ls(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Or(e,n)}catch{return!0}}function us(e){var t=pi(e,2);t!==null&&jd(t,e,2)}function ds(e){var t=Yo();if(typeof e==`function`){var n=e;if(e=n(),Fo){Ve(!0);try{n()}finally{Ve(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ts,lastRenderedState:e},t}function fs(e,t,n,r){return e.baseState=n,rs(e,jo,typeof r==`function`?r:ts)}function ps(e,t,n,r,a){if(tc(e))throw Error(i(485));if(e=t.action,e!==null){var o={payload:a,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){o.listeners.push(e)}};G.T===null?o.isTransition=!1:n(!0),r(o),n=t.pending,n===null?(o.next=t.pending=o,ms(t,o)):(o.next=n.next,t.pending=n.next=o)}}function ms(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=G.T,o={};o.types=a===null?null:a.types,G.T=o;try{var s=n(i,r),c=G.S;c!==null&&c(o,s),hs(e,t,s)}catch(n){_s(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),G.T=a}}else try{a=n(i,r),hs(e,t,a)}catch(n){_s(e,t,n)}}function hs(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){gs(e,t,n)},function(n){return _s(e,t,n)}):gs(e,t,n)}function gs(e,t,n){t.status=`fulfilled`,t.value=n,vs(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,ms(e,n)))}function _s(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,vs(t),t=t.next;while(t!==r)}e.action=null}function vs(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function ys(e,t){return t}function bs(e,t){if(Gi){var n=qu.formState;if(n!==null){a:{var r=Ao;if(Gi){if(Wi){b:{for(var i=Wi,a=qi;i.nodeType!==8;){if(!a){i=null;break b}if(i=lm(i.nextSibling),i===null){i=null;break b}}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){Wi=lm(i.nextSibling),r=i.data===`F!`;break a}}Yi(r)}r=!1}r&&(t=n[0])}}return n=Yo(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ys,lastRenderedState:t},n.queue=r,n=Qs.bind(null,Ao,r),r.dispatch=n,r=ds(!1),a=ec.bind(null,Ao,!1,r.queue),r=Yo(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=ps.bind(null,Ao,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function xs(e){return Ss(Xo(),jo,e)}function Ss(e,t,n){if(t=rs(e,t,ys)[0],e=ns(ts)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=Qo(t)}catch(e){throw e===Ia?Ra:e}else r=t;t=Xo();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(Ao.flags|=2048,Ts(9,{destroy:void 0},Cs.bind(null,i,n),null)),[r,a,e]}function Cs(e,t){e.action=t}function ws(e){var t=Xo(),n=jo;if(n!==null)return Ss(t,n,e);Xo(),t=t.memoizedState,n=Xo();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function Ts(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=Ao.updateQueue,t===null&&(t=Zo(),Ao.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function Es(){return Xo().memoizedState}function Ds(e,t,n,r){var i=Yo();Ao.flags|=e,i.memoizedState=Ts(1|t,{destroy:void 0},n,r===void 0?null:r)}function Os(e,t,n,r){var i=Xo();r=r===void 0?null:r;var a=i.memoizedState.inst;jo!==null&&r!==null&&Vo(r,jo.memoizedState.deps)?i.memoizedState=Ts(t,a,n,r):(Ao.flags|=e,i.memoizedState=Ts(1|t,a,n,r))}function ks(e,t){Ds(8390656,8,e,t)}function As(e,t){Os(2048,8,e,t)}function js(e){Ao.flags|=4;var t=Ao.updateQueue;if(t===null)t=Zo(),Ao.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function Ms(e){var t=Xo().memoizedState;return js({ref:t,nextImpl:e}),function(){if(Ku&2)throw Error(i(440));return t.impl.apply(void 0,arguments)}}function Ns(e,t){return Os(4,2,e,t)}function Ps(e,t){return Os(4,4,e,t)}function Fs(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Is(e,t,n){n=n==null?null:n.concat([e]),Os(4,4,Fs.bind(null,t,e),n)}function Ls(){}function Rs(e,t){var n=Xo();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&Vo(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function zs(e,t){var n=Xo();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&Vo(t,r[1]))return r[0];if(r=e(),Fo){Ve(!0);try{e()}finally{Ve(!1)}}return n.memoizedState=[r,t],r}function Bs(e,t,n){return n===void 0||ko&1073741824&&!(Yu&261930)?e.memoizedState=t:(e.memoizedState=n,e=kd(),Ao.lanes|=e,rd|=e,n)}function Vs(e,t,n,r){return Or(n,t)?n:po.current===null?!(ko&106)||ko&1073741824&&!(Yu&261930)?(Cc=!0,e.memoizedState=n):(e=kd(),Ao.lanes|=e,rd|=e,t):(e=Bs(e,n,r),Or(e,t)||(Cc=!0),e)}function Hs(e,t,n,r,i){var a=K.p;K.p=a!==0&&8>a?a:8;var o=G.T,s={};s.types=o===null?null:o.types,G.T=s,ec(e,!1,t,n);try{var c=i(),l=G.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?$s(e,t,Aa(c,r),Od(e)):$s(e,t,r,Od(e))}catch(n){$s(e,t,{then:function(){},status:`rejected`,reason:n},Od())}finally{K.p=a,o!==null&&s.types!==null&&(o.types=s.types),G.T=o}}function Us(){}function Ws(e,t,n,r){if(e.tag!==5)throw Error(i(476));var a=Gs(e).queue;Hs(e,a,t,oe,n===null?Us:function(){return Ks(e),n(r)})}function Gs(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:oe,baseState:oe,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ts,lastRenderedState:oe},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ts,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function Ks(e){var t=Gs(e);t.next===null&&(t=e.alternate.memoizedState),$s(e,t.next.queue,{},Od())}function qs(){return fa(sh)}function Js(){return Xo().memoizedState}function Ys(){return Xo().memoizedState}function Xs(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=Od();e=ro(n);var r=io(t,e,n);r!==null&&(jd(r,t,n),ao(r,t,n)),t={cache:ya()},e.payload=t;return}t=t.return}}function Zs(e,t,n){var r=Od();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},tc(e)?nc(t,n):(n=fi(e,t,n,r),n!==null&&(jd(n,e,r),rc(n,t,r)))}function Qs(e,t,n){$s(e,t,n,Od())}function $s(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(tc(e))nc(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,Or(s,o))return di(e,t,i,0),qu===null&&ui(),!1}catch{}if(n=fi(e,t,i,r),n!==null)return jd(n,e,r),rc(n,t,r),!0}return!1}function ec(e,t,n,r){if(r={lane:2,revertLane:Mf(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},tc(e)){if(t)throw Error(i(479))}else t=fi(e,n,r,2),t!==null&&jd(t,e,2)}function tc(e){var t=e.alternate;return e===Ao||t!==null&&t===Ao}function nc(e,t){Po=No=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function rc(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,at(e,n)}}var ic={readContext:fa,use:$o,useCallback:Bo,useContext:Bo,useEffect:Bo,useImperativeHandle:Bo,useLayoutEffect:Bo,useInsertionEffect:Bo,useMemo:Bo,useReducer:Bo,useRef:Bo,useState:Bo,useDebugValue:Bo,useDeferredValue:Bo,useTransition:Bo,useSyncExternalStore:Bo,useId:Bo,useHostTransitionStatus:Bo,useFormState:Bo,useActionState:Bo,useOptimistic:Bo,useMemoCache:Bo,useCacheRefresh:Bo,useEffectEvent:Bo},ac={readContext:fa,use:$o,useCallback:function(e,t){return Yo().memoizedState=[e,t===void 0?null:t],e},useContext:fa,useEffect:ks,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),Ds(4194308,4,Fs.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Ds(4194308,4,e,t)},useInsertionEffect:function(e,t){Ds(4,2,e,t)},useMemo:function(e,t){var n=Yo();t=t===void 0?null:t;var r=e();if(Fo){Ve(!0);try{e()}finally{Ve(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=Yo();if(n!==void 0){var i=n(t);if(Fo){Ve(!0);try{n(t)}finally{Ve(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=Zs.bind(null,Ao,e),[r.memoizedState,e]},useRef:function(e){var t=Yo();return e={current:e},t.memoizedState=e},useState:function(e){e=ds(e);var t=e.queue,n=Qs.bind(null,Ao,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:Ls,useDeferredValue:function(e,t){return Bs(Yo(),e,t)},useTransition:function(){var e=ds(!1);return e=Hs.bind(null,Ao,e.queue,!0,!1),Yo().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=Ao,a=Yo();if(Gi){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),qu===null)throw Error(i(349));Yu&127||os(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,ks(cs.bind(null,r,o,e),[e]),r.flags|=2048,Ts(9,{destroy:void 0},ss.bind(null,r,o,n,t),null),n},useId:function(){var e=Yo(),t=qu.identifierPrefix;if(Gi){var n=Li,r=Ii;n=(r&~(1<<32-He(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=Io++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=zo++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:qs,useFormState:bs,useActionState:bs,useOptimistic:function(e){var t=Yo();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=ec.bind(null,Ao,!0,n),n.dispatch=t,[e,t]},useMemoCache:es,useCacheRefresh:function(){return Yo().memoizedState=Xs.bind(null,Ao)},useEffectEvent:function(e){var t=Yo(),n={impl:e};return t.memoizedState=n,function(){if(Ku&2)throw Error(i(440));return n.impl.apply(void 0,arguments)}}},oc={readContext:fa,use:$o,useCallback:Rs,useContext:fa,useEffect:As,useImperativeHandle:Is,useInsertionEffect:Ns,useLayoutEffect:Ps,useMemo:zs,useReducer:ns,useRef:Es,useState:function(){return ns(ts)},useDebugValue:Ls,useDeferredValue:function(e,t){return Vs(Xo(),jo.memoizedState,e,t)},useTransition:function(){var e=ns(ts)[0],t=Xo().memoizedState;return[typeof e==`boolean`?e:Qo(e),t]},useSyncExternalStore:as,useId:Js,useHostTransitionStatus:qs,useFormState:xs,useActionState:xs,useOptimistic:function(e,t){return fs(Xo(),jo,e,t)},useMemoCache:es,useCacheRefresh:Ys,useEffectEvent:Ms},sc={readContext:fa,use:$o,useCallback:Rs,useContext:fa,useEffect:As,useImperativeHandle:Is,useInsertionEffect:Ns,useLayoutEffect:Ps,useMemo:zs,useReducer:is,useRef:Es,useState:function(){return is(ts)},useDebugValue:Ls,useDeferredValue:function(e,t){var n=Xo();return jo===null?Bs(n,e,t):Vs(n,jo.memoizedState,e,t)},useTransition:function(){var e=is(ts)[0],t=Xo().memoizedState;return[typeof e==`boolean`?e:Qo(e),t]},useSyncExternalStore:as,useId:Js,useHostTransitionStatus:qs,useFormState:ws,useActionState:ws,useOptimistic:function(e,t){var n=Xo();return jo===null?(n.baseState=e,[e,n.queue.dispatch]):fs(n,jo,e,t)},useMemoCache:es,useCacheRefresh:Ys,useEffectEvent:Ms};function cc(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:D({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var lc={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=Od(),i=ro(r);i.payload=t,n!=null&&(i.callback=n),t=io(e,i,r),t!==null&&(jd(t,e,r),ao(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=Od(),i=ro(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=io(e,i,r),t!==null&&(jd(t,e,r),ao(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Od(),r=ro(n);r.tag=2,t!=null&&(r.callback=t),t=io(e,r,n),t!==null&&(jd(t,e,n),ao(t,e,n))}};function uc(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!kr(n,r)||!kr(i,a):!0}function dc(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&lc.enqueueReplaceState(t,t.state,null)}function fc(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=D({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function pc(e){oi(e)}function mc(e){console.error(e)}function hc(e){oi(e)}function gc(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function _c(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function vc(e,t,n){return n=ro(n),n.tag=3,n.payload={element:null},n.callback=function(){gc(e,t)},n}function yc(e){return e=ro(e),e.tag=3,e}function bc(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){_c(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){_c(t,n,r),typeof i!=`function`&&(hd===null?hd=new Set([this]):hd.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function xc(e,t,n,r,a){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&la(t,n,a,!0),n=vo.current,n!==null){switch(n.tag){case 31:case 13:case 19:return yo===null?Ud():n.alternate===null&&nd===0&&(nd=3),n.flags&=-257,n.flags|=65536,n.lanes=a,r===za?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),ff(e,r,a)),!1;case 22:return n.flags|=65536,r===za?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),ff(e,r,a)),!1}throw Error(i(435,n.tag))}return ff(e,r,a),Ud(),!1}if(Gi)return t=vo.current,t===null?(r!==Ji&&(t=Error(i(423),{cause:r}),ta(Oi(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,r=Oi(r,n),a=vc(e.stateNode,r,a),oo(e,a),nd!==4&&(nd=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,r!==Ji&&(e=Error(i(422),{cause:r}),ta(Oi(e,n)))),!1;var o=Error(i(520),{cause:r});if(o=Oi(o,n),cd===null?cd=[o]:cd.push(o),nd!==4&&(nd=2),t===null)return!0;r=Oi(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=vc(n.stateNode,r,e),oo(n,e),!1;case 1:if(t=n.type,o=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||o!==null&&typeof o.componentDidCatch==`function`&&(hd===null||!hd.has(o))))return n.flags|=65536,a&=-a,n.lanes|=a,a=yc(a),bc(a,e,n,r),oo(n,a),!1;break;case 22:if(n.memoizedState!==null)return n.flags|=65536,!1}n=n.return}while(n!==null);return!1}var Sc=Error(i(461)),Cc=!1;function wc(e,t,n,r){t.child=e===null?$a(t,null,n,r):Qa(t,e.child,n,r)}function Tc(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return da(t),r=Ho(e,t,n,o,a,i),s=Ko(),e!==null&&!Cc?(qo(e,t,i),$c(e,t,i)):(Gi&&s&&Bi(t),t.flags|=1,wc(e,t,r,i),t.child)}function Ec(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!yi(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,Dc(e,t,a,r,i)):(e=Si(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!el(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?kr:n,n(o,r)&&e.ref===t.ref)return $c(e,t,i)}return t.flags|=1,e=bi(a,r),e.ref=t.ref,e.return=t,t.child=e}function Dc(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(kr(a,r)&&e.ref===t.ref){if(Cc=!1,t.pendingProps=r=a,el(e,i))e.flags&131072&&(Cc=!0);else return t.lanes=e.lanes,$c(e,t,i)}}return Fc(e,t,n,r,i)}function Oc(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return Ac(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Pa(t,a===null?null:a.cachePool),a===null?go():ho(t,a),So(t);else return r=t.lanes=536870912,Ac(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&Pa(t,null),go(),Co()):(Pa(t,a.cachePool),ho(t,a),Co(),t.memoizedState=null);return wc(e,t,i,n),t.child}function kc(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Ac(e,t,n,r,i){var a=Na();return a=a===null?null:{parent:va._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&Pa(t,null),go(),So(t),e!==null&&la(e,t,r,!0),t.childLanes=i,null}function jc(e,t){return t=Wc({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function Mc(e,t,n){return Qa(t,e.child,null,n),e=jc(t,t.pendingProps),e.flags|=2,wo(t),t.memoizedState=null,e}function Nc(e,t,n){var r=t.pendingProps,a=!!(t.flags&128);if(t.flags&=-129,e===null){if(Gi){if(r.mode===`hidden`)return e=jc(t,r),t.lanes=536870912,e.memoizedState={baseLanes:0,cachePool:null},kc(null,e);if(xo(t),(e=Wi)?(e=am(e,qi),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Fi===null?null:{id:Ii,overflow:Li},retryLane:536870912,hydrationErrors:null},n=Ti(e),n.return=t,t.child=n,Ui=t,Wi=null)):e=null,e===null)throw Yi(t);return t.lanes=536870912,null}return jc(t,r)}var o=e.memoizedState;if(o!==null){var s=o.dehydrated;if(xo(t),a){if(t.flags&256)t.flags&=-257,t=Mc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(i(558))}else if(Cc||la(e,t,n,!1),a=(n&e.childLanes)!==0,Cc||a){if(po.current===null){if(r=qu,r!==null&&(s=ot(r,n),s!==0&&s!==o.retryLane))throw o.retryLane=s,pi(e,s),jd(r,e,s),Sc;Ud()}t=Mc(e,t,n)}else e=o.treeContext,Wi=lm(s.nextSibling),Ui=t,Gi=!0,Ki=null,qi=!1,e!==null&&Hi(t,e),t=jc(t,r),t.flags|=134221824;return t}return e=bi(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function Pc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(i(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function Fc(e,t,n,r,i){return da(t),n=Ho(e,t,n,r,void 0,i),r=Ko(),e!==null&&!Cc?(qo(e,t,i),$c(e,t,i)):(Gi&&r&&Bi(t),t.flags|=1,wc(e,t,n,i),t.child)}function Ic(e,t,n,r,i,a){return da(t),t.updateQueue=null,n=Wo(t,r,n,i),Uo(e),r=Ko(),e!==null&&!Cc?(qo(e,t,a),$c(e,t,a)):(Gi&&r&&Bi(t),t.flags|=1,wc(e,t,n,a),t.child)}function Lc(e,t,n,r,i){if(da(t),t.stateNode===null){var a=gi,o=n.contextType;typeof o==`object`&&o&&(a=fa(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=lc,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},to(t),o=n.contextType,a.context=typeof o==`object`&&o?fa(o):gi,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(cc(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&lc.enqueueReplaceState(a,a.state,null),lo(t,r,a,i),co(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=fc(n,s);a.props=c;var l=a.context,u=n.contextType;o=gi,typeof u==`object`&&u&&(o=fa(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&dc(t,a,r,o),eo=!1;var f=t.memoizedState;a.state=f,lo(t,r,a,i),co(),l=t.memoizedState,s||f!==l||eo?(typeof d==`function`&&(cc(t,n,d,r),l=t.memoizedState),(c=eo||uc(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,no(e,t),o=t.memoizedProps,u=fc(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=gi,typeof l==`object`&&l&&(c=fa(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&dc(t,a,r,c),eo=!1,f=t.memoizedState,a.state=f,lo(t,r,a,i),co();var p=t.memoizedState;o!==d||f!==p||eo||e!==null&&e.dependencies!==null&&ua(e.dependencies)?(typeof s==`function`&&(cc(t,n,s,r),p=t.memoizedState),(u=eo||uc(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&ua(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,Pc(e,t),r=!!(t.flags&128),a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=Qa(t,e.child,null,i),t.child=Qa(t,null,n,i)):wc(e,t,n,i),t.memoizedState=a.state,e=t.child):e=$c(e,t,i),e}function Rc(e,t,n,r){return $i(),t.flags|=256,wc(e,t,n,r),t.child}var zc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Bc(e){return{baseLanes:e,cachePool:Fa()}}function Vc(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=od),e}function Hc(e,t,n){var r=t.pendingProps,i=!1,a=!!(t.flags&128),o;if((o=a)||(o=e!==null&&e.memoizedState===null?!1:!!(To.current&2)),o&&(i=!0,t.flags&=-129),o=!!(t.flags&32),t.flags&=-33,e===null){if(Gi){if(i?bo(t):Co(),(e=Wi)?(e=am(e,qi),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Fi===null?null:{id:Ii,overflow:Li},retryLane:536870912,hydrationErrors:null},n=Ti(e),n.return=t,t.child=n,Ui=t,Wi=null)):e=null,e===null)throw Yi(t);return t.lanes=sm(e)?32:536870912,null}return a=r.children,r=r.fallback,i?(Co(),i=t.mode,a=Wc({mode:`hidden`,children:a},i),r=Ci(r,i,n,null),a.return=t,r.return=t,a.sibling=r,t.child=a,r=t.child,r.memoizedState=Bc(n),r.childLanes=Vc(e,o,n),t.memoizedState=zc,kc(null,r)):(bo(t),Uc(t,a))}var s=e.memoizedState;if(s!==null){var c=s.dehydrated;if(c!==null)return Kc(e,t,a,o,r,c,s,n)}return i?(Co(),i=r.fallback,a=t.mode,s=e.child,c=s.sibling,r=bi(s,{mode:`hidden`,children:r.children}),r.subtreeFlags=s.subtreeFlags&1206910976,c===null?(i=Ci(i,a,n,null),i.flags|=2):i=bi(c,i),i.return=t,r.return=t,r.sibling=i,t.child=r,kc(null,r),r=t.child,i=e.child.memoizedState,i===null?i=Bc(n):(a=i.cachePool,a===null?a=Fa():(s=va._currentValue,a=a.parent===s?a:{parent:s,pool:s}),i={baseLanes:i.baseLanes|n,cachePool:a}),r.memoizedState=i,r.childLanes=Vc(e,o,n),t.memoizedState=zc,kc(e.child,r)):(bo(t),n=e.child,e=n.sibling,n=bi(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(o=t.deletions,o===null?(t.deletions=[e],t.flags|=16):o.push(e)),t.child=n,t.memoizedState=null,n)}function Uc(e,t){return t=Wc({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function Wc(e,t){return e=vi(22,e,null,t),e.lanes=0,e}function Gc(e,t,n){return Qa(t,e.child,null,n),e=Uc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Kc(e,t,n,r,a,o,s,c){if(n)return t.flags&256?(bo(t),t.flags&=-257,Gc(e,t,c)):t.memoizedState===null?(Co(),o=a.fallback,s=t.mode,a=Wc({mode:`visible`,children:a.children},s),o=Ci(o,s,c,null),o.flags|=2,a.return=t,o.return=t,a.sibling=o,t.child=a,Qa(t,e.child,null,c),a=t.child,a.memoizedState=Bc(c),a.childLanes=Vc(e,r,c),t.memoizedState=zc,kc(null,a)):(Co(),t.child=e.child,t.flags|=128,null);if(bo(t),sm(o)){if(r=o.nextSibling&&o.nextSibling.dataset,r)var l=r.dgst;return r=l,r!==``&&(a=Error(i(419)),a.stack=``,a.digest=r,ta({value:a,source:null,stack:null})),Gc(e,t,c)}if(Cc||la(e,t,c,!1),r=(c&e.childLanes)!==0,Cc||r){if(po.current!==null)return Gc(e,t,c);if(r=qu,r!==null&&(a=ot(r,c),a!==0&&a!==s.retryLane))throw s.retryLane=a,pi(e,a),jd(r,e,a),Sc;return om(o)||Ud(),Gc(e,t,c)}return om(o)?(t.flags|=192,t.child=e.child,null):(e=s.treeContext,Wi=lm(o.nextSibling),Ui=t,Gi=!0,Ki=null,qi=!1,e!==null&&Hi(t,e),t=Uc(t,a.children),t.flags|=134221824,t)}function qc(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),sa(e.return,t,n)}function Jc(e){for(var t=null;e!==null;){var n=e.alternate;n!==null&&Oo(n)===null&&(t=e),e=e.sibling}return t}function Yc(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function Xc(e){var t=e.child;for(e.child=null;t!==null;){var n=t.sibling;t.sibling=e.child,e.child=t,t=n}}function Zc(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=To.current;if(t.flags&128)return Eo(t,o),null;var s=!!(o&2);if(s?(o=o&1|2,t.flags|=128):o&=1,Eo(t,o),i===`backwards`&&e!==null?(Xc(e),wc(e,t,r,n),Xc(e)):wc(e,t,r,n),r=Gi?Mi:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&qc(e,n,t);else if(e.tag===19)qc(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`backwards`:n=Jc(t.child),n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null,Xc(t)),Yc(t,!0,i,null,a,r);break;case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&Oo(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}Yc(t,!0,n,null,a,r);break;case`together`:Yc(t,!1,null,null,void 0,r);break;case`independent`:t.memoizedState=null;break;default:n=Jc(t.child),n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),Yc(t,!1,i,n,a,r)}return t.child}function Qc(e,t,n){var r=t.pendingProps;return aa(t,t.type,r.value),wc(e,t,r.children,n),t.child}function $c(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),rd|=t.lanes,(n&t.childLanes)===0){if(e!==null){if(la(e,t,n,!1),(n&t.childLanes)===0)return null}else return null}if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=bi(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=bi(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function el(e,t){return(e.lanes&t)!==0||(e=e.dependencies,!!(e!==null&&ua(e)))}function tl(e,t,n){switch(t.tag){case 3:ge(t,t.stateNode.containerInfo),aa(t,va,e.memoizedState.cache),$i();break;case 27:case 5:ve(t);break;case 4:ge(t,t.stateNode.containerInfo);break;case 10:aa(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,xo(t),null;break;case 13:var r=t.memoizedState;if(r!==null){if(r.dehydrated!==null)return bo(t),t.flags|=128,null;r=la(e,t,n,!1);var i=t.child.childLanes;return r||(n&i)!==0?Hc(e,t,n):(bo(t),e=$c(e,t,n),e===null?null:e.sibling)}bo(t);break;case 19:if(t.flags&128)return Zc(e,t,n);if(i=!!(e.flags&128),r=(n&t.childLanes)!==0,r||=(la(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return Zc(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),Eo(t,To.current),r)break;return null;case 22:return t.lanes=0,Oc(e,t,n,t.pendingProps);case 24:aa(t,va,e.memoizedState.cache)}return $c(e,t,n)}function nl(e,t,n){if(e!==null){if(e.memoizedProps!==t.pendingProps)Cc=!0;else{if(!el(e,n)&&!(t.flags&128))return Cc=!1,tl(e,t,n);Cc=!!(e.flags&131072)}}else Cc=!1,Gi&&t.flags&1048576&&zi(t,Mi,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=Ha(t.elementType),t.type=e,typeof e==`function`)yi(e)?(r=fc(e,r),t.tag=1,t=Lc(null,t,e,r,n)):(t.tag=0,t=Fc(null,t,e,r,n));else{if(e!=null){var a=e.$$typeof;if(a===I){t.tag=11,t=Tc(null,t,e,r,n);break a}if(a===z){t.tag=14,t=Ec(null,t,e,r,n);break a}if(a===F){t.tag=10,t.type=e,t=Qc(null,t,n);break a}}throw t=W(e)||e,Error(i(306,t,``))}}return t;case 0:return Fc(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,a=fc(r,t.pendingProps),Lc(e,t,r,a,n);case 3:a:{if(ge(t,t.stateNode.containerInfo),e===null)throw Error(i(387));r=t.pendingProps;var o=t.memoizedState;a=o.element,no(e,t),lo(t,r,null,n);var s=t.memoizedState;if(r=s.cache,aa(t,va,r),r!==o.cache&&ca(t,[va],n,!0),co(),r=s.element,o.isDehydrated){if(o={element:r,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){t=Rc(e,t,r,n);break a}if(r!==a){a=Oi(Error(i(424)),t),ta(a),t=Rc(e,t,r,n);break a}switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(Wi=lm(e.firstChild),Ui=t,Gi=!0,Ki=null,qi=!0,n=$a(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|134221824,n=n.sibling}else{if($i(),r===a){t=$c(e,t,n);break a}wc(e,t,r,n)}t=t.child}return t;case 26:return Pc(e,t),e===null?(n=Nm(t.type,null,t.pendingProps,null))?t.memoizedState=n:Gi||(t.stateNode=fp(t.type,t.pendingProps,me.current,t)):t.memoizedState=Nm(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return ve(t),e===null&&Gi&&(r=t.stateNode=hm(t.type,t.pendingProps,me.current),Ui=t,qi=!0,a=Wi,Sp(t.type)?(um=a,Wi=lm(r.firstChild)):Wi=a),wc(e,t,t.pendingProps.children,n),Pc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&Gi&&((a=r=Wi)&&(r=rm(r,t.type,t.pendingProps,qi),r===null?a=!1:(t.stateNode=r,Ui=t,Wi=lm(r.firstChild),qi=!1,a=!0)),a||Yi(t)),ve(t),a=t.type,o=t.pendingProps,s=e===null?null:e.memoizedProps,r=o.children,pp(a,o)?r=null:s!==null&&pp(a,s)&&(t.flags|=32),t.memoizedState!==null&&(a=Ho(e,t,Go,null,null,n),sh._currentValue=a),Pc(e,t),wc(e,t,r,n),t.child;case 6:return e===null&&Gi&&((e=n=Wi)&&(n=im(n,t.pendingProps,qi),n===null?e=!1:(t.stateNode=n,Ui=t,Wi=null,e=!0)),e||Yi(t)),null;case 13:return Hc(e,t,n);case 4:return ge(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Qa(t,null,r,n):wc(e,t,r,n),t.child;case 11:return Tc(e,t,t.type,t.pendingProps,n);case 7:return r=t.pendingProps,Pc(e,t),wc(e,t,r,n),t.child;case 8:return wc(e,t,t.pendingProps.children,n),t.child;case 12:return wc(e,t,t.pendingProps.children,n),t.child;case 10:return Qc(e,t,n);case 9:return a=t.type._context,r=t.pendingProps.children,da(t),a=fa(a),r=r(a),t.flags|=1,wc(e,t,r,n),t.child;case 14:return Ec(e,t,t.type,t.pendingProps,n);case 15:return Dc(e,t,t.type,t.pendingProps,n);case 19:return Zc(e,t,n);case 31:return Nc(e,t,n);case 22:return Oc(e,t,n,t.pendingProps);case 24:return da(t),r=fa(va),e===null?(a=Na(),a===null&&(a=qu,o=ya(),a.pooledCache=o,o.refCount++,o!==null&&(a.pooledCacheLanes|=n),a=o),t.memoizedState={parent:r,cache:a},to(t),aa(t,va,a)):((e.lanes&n)!==0&&(no(e,t),lo(t,null,null,n),co()),a=e.memoizedState,o=t.memoizedState,a.parent===r?(r=o.cache,aa(t,va,r),r!==a.cache&&ca(t,[va],n,!0)):(a={parent:r,cache:r},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),aa(t,va,r))),wc(e,t,t.pendingProps.children,n),t.child;case 30:return t.stateNode===null&&(t.stateNode={autoName:null,paired:null,clones:null,ref:null}),r=t.pendingProps,r.name!=null&&r.name!==`auto`?t.flags|=e===null?18882560:18874368:Gi&&Bi(t),e!==null&&e.memoizedProps.name!==r.name?t.flags|=4194816:Pc(e,t),wc(e,t,r.children,n),t.child;case 29:throw t.pendingProps}throw Error(i(156,t.tag))}function rl(e){e.flags|=4}function il(e,t,n,r,i){var a;if((a=!!(e.mode&32))&&(a=n===null?Jm(t,r):Jm(t,r)&&(r.src!==n.src||r.srcSet!==n.srcSet)),a){if(e.flags|=16777216,(i&335544128)===i){if(e.stateNode.complete)e.flags|=8192;else if(Bd())e.flags|=8192;else throw Ua=za,La}}else e.flags&=-16777217}function al(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Ym(t)){if(Bd())e.flags|=8192;else throw Ua=za,La}}function ol(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:et(),e.lanes|=t,sd|=t)}function sl(e,t){if(!Gi)switch(e.tailMode){case`visible`:break;case`collapsed`:for(var n=e.tail,r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null;break;default:for(t=e.tail,n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null}}function cl(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&1206910976,r|=i.flags&1206910976,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function ll(e,t,n){var r=t.pendingProps;switch(Vi(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return cl(t),null;case 1:return cl(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),oa(va),_e(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(Qi(t)?rl(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,ea())),cl(t),null;case 26:var a=t.type,o=t.memoizedState;return e===null?(rl(t),o===null?(cl(t),il(t,a,null,r,n)):(cl(t),al(t,o))):o?o===e.memoizedState?(cl(t),t.flags&=-16777217):(rl(t),cl(t),al(t,o)):(e=e.memoizedProps,e!==r&&rl(t),cl(t),il(t,a,e,r,n)),null;case 27:if(ye(t),n=me.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&rl(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return cl(t),t.subtreeFlags&=-33554433,null}e=fe.current,Qi(t)?Xi(t,e):(e=hm(a,r,n),t.stateNode=e,rl(t))}return cl(t),t.subtreeFlags&=-33554433,null;case 5:if(ye(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&rl(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return cl(t),t.subtreeFlags&=-33554433,null}if(o=fe.current,Qi(t))Xi(t,o);else{var s=lp(me.current);switch(o){case 1:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case 2:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;default:switch(a){case`svg`:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case`math`:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;case`script`:o=s.createElement(`div`),o.innerHTML=`<script><\/script>`,o=o.removeChild(o.firstChild);break;case`select`:o=typeof r.is==`string`?s.createElement(`select`,{is:r.is}):s.createElement(`select`),r.multiple?o.multiple=!0:r.size&&(o.size=r.size);break;default:o=typeof r.is==`string`?s.createElement(a,{is:r.is}):s.createElement(a)}}o[ft]=t,o[pt]=r;a:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)o.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break a;for(;s.sibling===null;){if(s.return===null||s.return===t)break a;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=o;a:switch(np(o,a,r),a){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&rl(t)}}return cl(t),t.subtreeFlags&=-33554433,il(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&rl(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(i(166));if(e=me.current,Qi(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,a=Ui,a!==null)switch(a.tag){case 27:case 5:r=a.memoizedProps}e[ft]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||$f(e.nodeValue,n)),e||Yi(t,!0)}else e=lp(e).createTextNode(r),e[ft]=t,t.stateNode=e}return cl(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=Qi(t),n!==null){if(e===null){if(!r)throw Error(i(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(557));e[ft]=t}else $i(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;cl(t),e=!1}else n=ea(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(wo(t),t):(wo(t),null);if(t.flags&128)throw Error(i(558))}return cl(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=Qi(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(i(318));if(a=t.memoizedState,a=a===null?null:a.dehydrated,!a)throw Error(i(317));a[ft]=t}else $i(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;cl(t),a=!1}else a=ea(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(wo(t),t):(wo(t),null)}return wo(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,a=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(a=r.alternate.memoizedState.cachePool.pool),o=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(o=r.memoizedState.cachePool.pool),o!==a&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),ol(t,t.updateQueue),cl(t),null);case 4:return _e(),e===null&&Uf(t.stateNode.containerInfo),t.flags|=67108864,cl(t),null;case 10:return oa(t.type),cl(t),null;case 19:if(Do(t),r=t.memoizedState,r===null)return cl(t),null;if(a=!!(t.flags&128),o=r.rendering,o===null){if(a)sl(r,!1);else{if(nd!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=Oo(e),o!==null){for(t.flags|=128,sl(r,!1),e=o.updateQueue,t.updateQueue=e,ol(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)xi(n,e),n=n.sibling;return Eo(t,To.current&1|2),Gi&&Ri(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&Ae()>pd&&(t.flags|=128,a=!0,sl(r,!1),t.lanes=4194304)}}else{if(!a){if(e=Oo(o),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,ol(t,e),sl(r,!0),r.tail===null&&r.tailMode!==`collapsed`&&r.tailMode!==`visible`&&!o.alternate&&!Gi)return cl(t),null}else 2*Ae()-r.renderingStartTime>pd&&n!==536870912&&(t.flags|=128,a=!0,sl(r,!1),t.lanes=4194304)}r.isBackwards?(o.sibling=t.child,t.child=o):(e=r.last,e===null?t.child=o:e.sibling=o,r.last=o)}if(r.tail!==null){e=r.tail;a:{for(n=e;n!==null;){if(n.alternate!==null){n=!1;break a}n=n.sibling}n=!0}return r.rendering=e,r.tail=e.sibling,r.renderingStartTime=Ae(),e.sibling=null,o=To.current,o=a?o&1|2:o&1,r.tailMode===`visible`||r.tailMode===`collapsed`||!n||Gi?Eo(t,o):(n=o,de(vo,t),de(To,n),yo===null&&(yo=t)),Gi&&Ri(t,r.treeForkCount),e}return cl(t),null;case 22:case 23:return wo(t),_o(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(cl(t),t.subtreeFlags&6&&(t.flags|=8192)):cl(t),n=t.updateQueue,n!==null&&ol(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&ue(Ma),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),oa(va),cl(t),null;case 25:return null;case 30:return t.flags|=33554432,cl(t),null}throw Error(i(156,t.tag))}function ul(e,t){switch(Vi(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return oa(va),_e(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return ye(t),null;case 31:if(t.memoizedState!==null){if(wo(t),t.alternate===null)throw Error(i(340));$i()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(wo(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));$i()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Do(t),e=t.flags,e&65536?(t.flags=e&-65537|128,e=t.memoizedState,e!==null&&(e.rendering=null,e.tail=null),t.flags|=4,t):null;case 4:return _e(),null;case 10:return oa(t.type),null;case 22:case 23:return wo(t),_o(),e!==null&&ue(Ma),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return oa(va),null;case 25:return null;default:return null}}function dl(e,t){switch(Vi(t),t.tag){case 3:oa(va),_e();break;case 26:case 27:case 5:ye(t);break;case 4:_e();break;case 31:t.memoizedState!==null&&wo(t);break;case 13:wo(t);break;case 19:Do(t);break;case 10:oa(t.type);break;case 22:case 23:wo(t),_o(),e!==null&&ue(Ma);break;case 24:oa(va)}}function fl(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){df(t,t.return,e)}}function pl(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){df(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){df(t,t.return,e)}}function ml(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{fo(t,n)}catch(t){df(e,e.return,t)}}}function hl(e,t,n){n.props=fc(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){df(e,t,n)}}function gl(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:var i=e.stateNode,a=ii(e.memoizedProps,i);(i.ref===null||i.ref.name!==a)&&(i.ref=Pp(a)),r=i.ref;break;case 7:if(e.stateNode===null){var o=new Fp(e);h(e.child,!1,Qp,o,void 0,void 0),e.stateNode=o}r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){df(e,t,n)}}function _l(e,t){var n=e.ref,r=e.refCleanup;if(n!==null){if(typeof r==`function`)try{r()}catch(n){df(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){df(e,t,n)}else n.current=null}}function vl(e,t){if((e.tag===5||e.tag===27||e.tag===6)&&e.alternate===null&&t!==null)for(var n=0;n<t.length;n++)em(e.stateNode,t[n])}function yl(e){for(var t=e.return;t!==null&&(Sl(t)&&em(e.stateNode,t.stateNode),!xl(t));)t=t.return}function bl(e){for(var t=e.return;t!==null&&(Sl(t)&&tm(e.stateNode,t.stateNode),!xl(t));)t=t.return}function xl(e){return e.tag===5||e.tag===3||e.tag===27}function Sl(e){return e&&e.tag===7&&e.stateNode!==null}function Cl(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){df(e,e.return,t)}}function wl(e,t,n){try{var r=e.stateNode;ip(r,e.type,n,t),r[pt]=t}catch(t){df(e,e.return,t)}}function Tl(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Sp(e.type)||e.tag===4}function El(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||Tl(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Sp(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Dl(e,t,n,r){var i=e.tag;if(i===5||i===6)i=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(i,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(i),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=ln)),vl(e,r),It=!0;else if(i!==4&&(i===27&&(vl(e,r),r=null,Sp(e.type)&&(n=e.stateNode,t=null)),e=e.child,e!==null))for(Dl(e,t,n,r),e=e.sibling;e!==null;)Dl(e,t,n,r),e=e.sibling}function Ol(e,t,n,r){var i=e.tag;if(i===5||i===6)i=e.stateNode,t?n.insertBefore(i,t):n.appendChild(i),vl(e,r),It=!0;else if(i!==4&&(i===27&&(vl(e,r),r=null,Sp(e.type)&&(n=e.stateNode)),e=e.child,e!==null))for(Ol(e,t,n,r),e=e.sibling;e!==null;)Ol(e,t,n,r),e=e.sibling}function kl(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);np(t,r,n),t[ft]=e,t[pt]=n}catch(t){df(e,e.return,t)}}var Al=!1,jl=null;function Ml(e){(e.tag===30||e.subtreeFlags&33554432)&&(Al=!0)}var Nl=null;function Pl(){var e=Nl;return Nl=null,e}var Fl=0;function Il(e,t,n,r,i){return Fl=0,Ll(e.child,t,n,r,i)}function Ll(e,t,n,r,i){for(var a=!1;e!==null;){if(e.tag===5){var o=e.stateNode;if(r!==null){var s=Op(o);r.push(s),s.view&&(a=!0)}else a||Op(o).view&&(a=!0);Al=!0,Tp(o,Fl===0?t:t+`_`+Fl,n),Fl++}else(e.tag!==22||e.memoizedState===null)&&(e.tag===30&&i||Ll(e.child,t,n,r,i)&&(a=!0));e=e.sibling}return a}function Rl(e,t){for(;e!==null;)e.tag===5?Ep(e.stateNode,e.memoizedProps):(e.tag!==22||e.memoizedState===null)&&(e.tag===30&&t||Rl(e.child,t)),e=e.sibling}function zl(e){if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if((e.tag!==22||e.memoizedState===null)&&(zl(e),e.tag===30&&e.flags&18874368&&e.stateNode.paired)){var t=e.memoizedProps;if(t.name==null||t.name===`auto`)throw Error(i(544));var n=t.name;t=ai(t.default,t.share),t!==`none`&&(Il(e,n,t,null,!1)||Rl(e.child,!1))}e=e.sibling}}function Bl(e,t){if(e.tag===30){var n=e.stateNode,r=e.memoizedProps,i=ii(r,n),a=ai(r.default,n.paired?r.share:r.enter);a===`none`?zl(e):Il(e,i,a,null,!1)?(zl(e),n.paired||t||Ad(e,r.onEnter)):Rl(e.child,!1)}else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)Bl(e,t),e=e.sibling;else zl(e)}function Vl(e){if(jl!==null&&jl.size!==0){var t=jl;if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&e.flags&18874368){var n=e.memoizedProps,r=n.name;if(r!=null&&r!==`auto`){var i=t.get(r);if(i!==void 0){var a=ai(n.default,n.share);if(a!==`none`&&(Il(e,r,a,null,!1)?(a=e.stateNode,i.paired=a,a.paired=i,Ad(e,n.onShare)):Rl(e.child,!1)),t.delete(r),t.size===0)break}}}Vl(e)}e=e.sibling}}}function Hl(e){if(e.tag===30){var t=e.memoizedProps,n=ii(t,e.stateNode),r=jl===null?void 0:jl.get(n),i=ai(t.default,r===void 0?t.exit:t.share);i!==`none`&&(Il(e,n,i,null,!1)?r===void 0?Ad(e,t.onExit):(i=e.stateNode,r.paired=i,i.paired=r,jl.delete(n),Ad(e,t.onShare)):Rl(e.child,!1)),jl!==null&&Vl(e)}else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)Hl(e),e=e.sibling;else jl!==null&&Vl(e)}function Ul(e){for(e=e.child;e!==null;){if(e.tag===30){var t=e.memoizedProps,n=ii(t,e.stateNode);t=ai(t.default,t.update),e.flags&=-5,t!==`none`&&Il(e,n,t,e.memoizedState=[],!1)}else e.subtreeFlags&33554432&&Ul(e);e=e.sibling}}function Wl(e){if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&e.flags&18874368){var t=e.stateNode;t.paired!==null&&(t.paired=null,Rl(e.child,!1))}Wl(e)}e=e.sibling}}function Gl(e){if(e.tag===30)e.stateNode.paired=null,Rl(e.child,!1),Wl(e);else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)Gl(e),e=e.sibling;else Wl(e)}function Kl(e){for(e=e.child;e!==null;)e.tag===30?Rl(e.child,!1):e.subtreeFlags&33554432&&Kl(e),e=e.sibling}function ql(e,t,n,r,i,a,o){for(var s=!1;t!==null;){if(t.tag===5){var c=t.stateNode;if(a!==null&&Fl<a.length){var l=a[Fl],u=Op(c);(l.view||u.view)&&(s=!0);var d;if(d=!(e.flags&4)){if(u.clip)d=!0;else{d=l.rect;var f=u.rect;d=d.y!==f.y||d.x!==f.x||d.height!==f.height||d.width!==f.width}}d&&(e.flags|=4),u.abs?u=!l.abs:(l=l.rect,u=u.rect,u=l.height!==u.height||l.width!==u.width),u&&(e.flags|=32)}else e.flags|=32;e.flags&4&&Tp(c,Fl===0?n:n+`_`+Fl,i),s&&e.flags&4||(Nl===null&&(Nl=[]),Nl.push(c,Fl===0?r:r+`_`+Fl,t.memoizedProps)),Fl++}else(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&o?e.flags|=t.flags&32:ql(e,t.child,n,r,i,a,o)&&(s=!0));t=t.sibling}return s}function Jl(e,t){for(e=e.child;e!==null;){if(e.tag===30){var n=e.memoizedProps,r=e.stateNode,i=ii(n,r),a=ai(n.default,n.update);if(t){r=r.clones;var o=r===null?null:r.map(kp)}else o=e.memoizedState,e.memoizedState=null;r=e;var s=e.child;Fl=0,i=ql(r,s,i,i,a,o,!1),e.flags&4&&i&&(t||Ad(e,n.onUpdate))}else e.subtreeFlags&33554432&&Jl(e,t);e=e.sibling}}var Yl=!1,Xl=!1,Zl=!1,Ql=!1,$l=typeof WeakSet==`function`?WeakSet:Set,eu=null,tu=!1,nu=!1,ru=!1,iu=!1;function au(e,t,n){if(e=e.containerInfo,sp=gh,e=Pr(e),Fr(e)){if(`selectionStart`in e)var r={start:e.selectionStart,end:e.selectionEnd};else a:{r=(r=e.ownerDocument)&&r.defaultView||window;var i=r.getSelection&&r.getSelection();if(i&&i.rangeCount!==0){r=i.anchorNode;var a=i.anchorOffset,o=i.focusNode;i=i.focusOffset;try{r.nodeType,o.nodeType}catch{r=null;break a}var s=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==r||a!==0&&f.nodeType!==3||(c=s+a),f!==o||i!==0&&f.nodeType!==3||(l=s+i),f.nodeType===3&&(s+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===r&&++u===a&&(c=s),p===o&&++d===i&&(l=s),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}r=c===-1||l===-1?null:{start:c,end:l}}else r=null}r||={start:0,end:0}}else r=null;for(cp={focusedElem:e,selectionRange:r},gh=!1,n=(n&335544064)===n,eu=t,t=n?9270:1024;eu!==null;){if(e=eu,n&&(r=e.deletions,r!==null))for(a=0;a<r.length;a++)n&&Hl(r[a]);if(e.alternate===null&&e.flags&2)n&&Ml(e),ou(n);else{if(e.tag===22){if(r=e.alternate,e.memoizedState!==null){r!==null&&r.memoizedState===null&&n&&Hl(r),ou(n);continue}if(r!==null&&r.memoizedState!==null){n&&Ml(e),ou(n);continue}}r=e.child,(e.subtreeFlags&t)!==0&&r!==null?(r.return=e,eu=r):(n&&Ul(e),ou(n))}}jl=null}function ou(e){for(;eu!==null;){var t=eu,n=e,r=t.alternate,a=t.flags;switch(t.tag){case 0:case 11:case 15:break;case 1:if(a&1024&&r!==null){n=void 0,a=r.memoizedProps,r=r.memoizedState;var o=t.stateNode;try{var s=fc(t.type,a);n=o.getSnapshotBeforeUpdate(s,r),o.__reactInternalSnapshotBeforeUpdate=n}catch(e){df(t,t.return,e)}}break;case 3:if(a&1024){if(r=t.stateNode.containerInfo,n=r.nodeType,n===9)nm(r);else if(n===1)switch(r.nodeName){case`HEAD`:case`HTML`:case`BODY`:nm(r);break;default:r.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;case 30:n&&r!==null&&(n=ii(r.memoizedProps,r.stateNode),a=t.memoizedProps,a=ai(a.default,a.update),a!==`none`&&Il(r,n,a,r.memoizedState=[],!0));break;default:if(a&1024)throw Error(i(163))}if(r=t.sibling,r!==null){r.return=t.return,eu=r;break}eu=t.return}}function su(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:Du(e,n),r&4&&fl(5,n);break;case 1:if(Du(e,n),r&4){if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){df(n,n.return,e)}else{var i=fc(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){df(n,n.return,e)}}}r&64&&ml(n),r&512&&gl(n,n.return);break;case 3:if(Du(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{fo(e,t)}catch(e){df(n,n.return,e)}}break;case 27:t===null&&r&4&&kl(n);case 26:case 5:Du(e,n),t===null&&r&4&&Cl(n),r&512&&gl(n,n.return);break;case 12:Du(e,n);break;case 31:Du(e,n),r&4&&gu(e,n);break;case 13:Du(e,n),r&4&&_u(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=hf.bind(null,n),cm(e,n))));break;case 22:if(r=n.memoizedState!==null||Yl,!r){var a=t!==null&&t.memoizedState!==null||Xl;t=Yl,i=Xl,Yl=r,(Xl=a)&&!i?(r=2,n.subtreeFlags&8772&&(r|=1),ku(e,n,r)):Du(e,n),Yl=t,Xl=i}break;case 30:Du(e,n),r&512&&gl(n,n.return);break;case 7:r&512&&gl(n,n.return);default:Du(e,n)}}function cu(e,t){for(e=e.child;e!==null;)lu(e,t),e=e.sibling}function lu(e,t){switch(e.tag){case 5:case 26:try{var n=e.stateNode;if(t){var r=n.style;typeof r.setProperty==`function`?r.setProperty(`display`,`none`,`important`):r.display=`none`}else{var i=e.stateNode,a=e.memoizedProps.style,o=a!=null&&a.hasOwnProperty(`display`)?a.display:null;i.style.display=o==null||typeof o==`boolean`?``:(``+o).trim()}}catch(t){df(e,e.return,t)}uu(e,t);break;case 6:try{e.stateNode.nodeValue=t?``:e.memoizedProps,It=!0}catch(t){df(e,e.return,t)}break;case 18:try{var s=e.stateNode;t?wp(s,!0):wp(e.stateNode,!1)}catch(t){df(e,e.return,t)}break;case 22:case 23:e.memoizedState===null&&cu(e,t);break;default:cu(e,t)}}function uu(e,t){if(e.subtreeFlags&67108864)for(e=e.child;e!==null;){a:{var n=e,r=t;switch(n.tag){case 4:lu(n,r);break a;case 22:n.memoizedState===null&&uu(n,r);break a;default:uu(n,r)}}e=e.sibling}}function du(e){var t=e.alternate;t!==null&&(e.alternate=null,du(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&xt(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var fu=null,pu=!1;function mu(e,t,n){for(n=n.child;n!==null;)hu(e,t,n),n=n.sibling}function hu(e,t,n){if(Be&&typeof Be.onCommitFiberUnmount==`function`)try{Be.onCommitFiberUnmount(ze,n)}catch{}switch(n.tag){case 26:Xl||_l(n,t),mu(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&!Xl&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:Xl||_l(n,t),bl(n);var r=fu,i=pu;Sp(n.type)&&(fu=n.stateNode,pu=!1),mu(e,t,n),gm(n.stateNode,n.type,n.memoizedProps),fu=r,pu=i;break;case 5:Xl||_l(n,t),bl(n);case 6:if(n.tag===6&&bl(n),r=fu,i=pu,fu=null,mu(e,t,n),fu=r,pu=i,fu!==null){if(pu)try{(fu.nodeType===9?fu.body:fu.nodeName===`HTML`?fu.ownerDocument.body:fu).removeChild(n.stateNode),It=!0}catch(e){df(n,t,e)}else try{fu.removeChild(n.stateNode),It=!0}catch(e){df(n,t,e)}}break;case 18:fu!==null&&(pu?(e=fu,Cp(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Hh(e)):Cp(fu,n.stateNode));break;case 4:r=fu,i=pu,fu=n.stateNode.containerInfo,pu=!0,mu(e,t,n),fu=r,pu=i;break;case 0:case 11:case 14:case 15:pl(2,n,t),Xl||pl(4,n,t),mu(e,t,n);break;case 1:Xl||(_l(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&hl(n,t,r)),mu(e,t,n);break;case 21:mu(e,t,n);break;case 22:Xl=(r=Xl)||n.memoizedState!==null,mu(e,t,n),Xl=r;break;case 30:_l(n,t),mu(e,t,n);break;case 7:Xl||_l(n,t),mu(e,t,n);break;default:mu(e,t,n)}}function gu(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Hh(e)}catch(e){df(t,t.return,e)}}}function _u(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Hh(e)}catch(e){df(t,t.return,e)}}function vu(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new $l),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new $l),t;default:throw Error(i(435,e.tag))}}function yu(e,t){var n=vu(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=gf.bind(null,e,t);t.then(r,r)}})}function bu(e,t,n){var r=t.deletions;if(r!==null)for(var a=0;a<r.length;a++){var o=r[a],s=e,c=t,l=c;a:for(;l!==null;){switch(l.tag){case 27:if(Sp(l.type)){fu=l.stateNode,pu=!1;break a}break;case 5:fu=l.stateNode,pu=!1;break a;case 3:case 4:fu=l.stateNode.containerInfo,pu=!0;break a}l=l.return}if(fu===null)throw Error(i(160));hu(s,c,o),fu=null,pu=!1,s=o.alternate,s!==null&&(s.return=null),o.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)Su(t,e,n),t=t.sibling}var xu=null;function Su(e,t,n){var r=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(a&4&&(r=e.updateQueue,r=r===null?null:r.events,r!==null))for(var o=0;o<r.length;o++){var s=r[o];s.ref.impl=s.nextImpl}bu(t,e,n),Cu(e),a&4&&(pl(3,e,e.return),fl(3,e),pl(5,e,e.return));break;case 1:bu(t,e,n),Cu(e),a&512&&(Xl||r===null||_l(r,r.return)),a&64&&Yl&&(e=e.updateQueue,e!==null&&(t=e.callbacks,t!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?t:n.concat(t))));break;case 26:if(o=xu,bu(t,e,n),Cu(e),a&512&&(Xl||r===null||_l(r,r.return)),a&4){if(a=r===null?null:r.memoizedState,n=e.memoizedState,r===null){if(n===null){if(e.stateNode===null){if(Yl)e.stateNode=fp(e.type,e.memoizedProps,t.containerInfo,e);else{a:{t=e.type,n=e.memoizedProps,a=o.ownerDocument||o;b:switch(t){case`title`:r=a.getElementsByTagName(`title`)[0],(!r||r[yt]||r[ft]||r.namespaceURI===`http://www.w3.org/2000/svg`||r.hasAttribute(`itemprop`))&&(r=a.createElement(t),a.head.insertBefore(r,a.querySelector(`head > title`))),np(r,t,n),r[ft]=e,Et(r),t=r;break a;case`link`:if(o=Gm(`link`,`href`,a).get(t+(n.href||``))){for(s=0;s<o.length;s++)if(r=o[s],r.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&r.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&r.getAttribute(`title`)===(n.title==null?null:n.title)&&r.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){o.splice(s,1);break b}}r=a.createElement(t),np(r,t,n),a.head.appendChild(r);break;case`meta`:if(o=Gm(`meta`,`content`,a).get(t+(n.content||``))){for(s=0;s<o.length;s++)if(r=o[s],r.getAttribute(`content`)===(n.content==null?null:``+n.content)&&r.getAttribute(`name`)===(n.name==null?null:n.name)&&r.getAttribute(`property`)===(n.property==null?null:n.property)&&r.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&r.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){o.splice(s,1);break b}}r=a.createElement(t),np(r,t,n),a.head.appendChild(r);break;default:throw Error(i(468,t))}r[ft]=e,Et(r),t=r}e.stateNode=t}}else Yl||Km(o,e.type,e.stateNode)}else e.stateNode=Bm(o,n,e.memoizedProps)}else a===n?n===null&&e.stateNode!==null&&wl(e,e.memoizedProps,r.memoizedProps):(a===null?(t=r.stateNode,t===null||Xl||t.parentNode.removeChild(t)):a.count--,n===null?Yl||Km(o,e.type,e.stateNode):Bm(o,n,e.memoizedProps))}break;case 27:bu(t,e,n),Cu(e),a&512&&(Xl||r===null||_l(r,r.return)),r!==null&&a&4&&wl(e,e.memoizedProps,r.memoizedProps);break;case 5:if(o=Zl,Zl=!1,bu(t,e,n),Zl=o,Cu(e),a&512&&(Xl||r===null||_l(r,r.return)),e.flags&32){t=e.stateNode;try{en(t,``),It=!0}catch(t){df(e,e.return,t)}}a&4&&e.stateNode!=null&&(t=e.memoizedProps,wl(e,t,r===null?t:r.memoizedProps)),a&1024&&(Ql=!0);break;case 6:if(bu(t,e,n),Cu(e),a&4){if(e.stateNode===null)throw Error(i(162));t=e.memoizedProps,n=e.stateNode;try{n.nodeValue=t,It=!0}catch(t){df(e,e.return,t)}}break;case 3:if(It=!1,Wm=null,o=xu,xu=bm(t.containerInfo),bu(t,e,n),xu=o,Cu(e),a&4&&r!==null&&r.memoizedState.isDehydrated)try{Hh(t.containerInfo)}catch(t){df(e,e.return,t)}Ql&&(Ql=!1,wu(e)),It=!1;break;case 4:a=Zl,Zl=Yl,r=Lt(),o=xu,xu=bm(e.stateNode.containerInfo),bu(t,e,n),Cu(e),xu=o,It&&nu&&(ru=!0),It=r,Zl=a;break;case 12:bu(t,e,n),Cu(e);break;case 31:bu(t,e,n),Cu(e),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,yu(e,t)));break;case 13:bu(t,e,n),Cu(e),e.child.flags&8192&&e.memoizedState!==null!=(r!==null&&r.memoizedState!==null)&&(dd=Ae()),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,yu(e,t)));break;case 22:o=e.memoizedState!==null,s=r!==null&&r.memoizedState!==null;var c=Yl,l=Xl,u=Zl;Yl=c||o,Zl=u||o,Xl=l||s,bu(t,e,n),Xl=l,Zl=u,Yl=c,Cu(e),a&8192&&(t=e.stateNode,t._visibility=o?t._visibility&-2:t._visibility|1,!o||r===null||s||Yl||Xl||(t=s||Xl,n=Yl,r=Xl,Yl=o||Yl,Xl=t,Ou(e,2),Yl=n,Xl=r),!o&&Zl||cu(e,o)),a&4&&(t=e.updateQueue,t!==null&&(n=t.retryQueue,n!==null&&(t.retryQueue=null,yu(e,n))));break;case 19:bu(t,e,n),Cu(e),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,yu(e,t)));break;case 30:a&512&&(Xl||r===null||_l(r,r.return)),a=Lt(),o=nu,s=(n&335544064)===n,c=e.memoizedProps,nu=s&&ai(c.default,c.update)!==`none`,bu(t,e,n),Cu(e),s&&r!==null&&It&&(e.flags|=4),nu=o,It=a;break;case 21:break;case 7:a&512&&(Xl||r===null||_l(r,r.return)),r&&r.stateNode!==null&&(r.stateNode._fragmentFiber=e);default:bu(t,e,n),Cu(e)}}function Cu(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(Tl(r)){n=r;break}r=r.return}r=null;for(var a=e.return;a!==null;){if(Sl(a)){var o=a.stateNode;r===null?r=[o]:r.push(o)}if(xl(a))break;a=a.return}var s=r;if(n==null)throw Error(i(160));switch(n.tag){case 27:var c=n.stateNode;Ol(e,El(e),c,s);break;case 5:var l=n.stateNode;n.flags&32&&(en(l,``),n.flags&=-33),Ol(e,El(e),l,s);break;case 3:case 4:var u=n.stateNode.containerInfo;Dl(e,El(e),u,s);break;default:throw Error(i(161))}}catch(t){df(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function wu(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;wu(t),t.tag===5&&t.flags&1024&&(t=t.stateNode,gh=!0,t.reset(),gh=!1),e=e.sibling}}function Tu(e,t){if(t.subtreeFlags&9270)for(t=t.child;t!==null;)Eu(t,e),t=t.sibling;else Jl(t,!1)}function Eu(e,t){var n=e.alternate;if(n===null)Bl(e,!1);else switch(e.tag){case 3:if(iu=tu=!1,Pl(),Tu(t,e),!tu&&!ru){if(e=Nl,e!==null)for(var r=0;r<e.length;r+=3){n=e[r];var i=e[r+1];Ep(n,e[r+2]),n=n.ownerDocument.documentElement,n!==null&&n.animate({opacity:[0,0],pointerEvents:[`none`,`none`]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition-group(`+i+`)`})}e=t.containerInfo,e=e.nodeType===9?e.documentElement:e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===``&&(e.style.viewTransitionName=`none`,e.animate({opacity:[0,0],pointerEvents:[`none`,`none`]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition-group(root)`}),e.animate({width:[0,0],height:[0,0]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition`})),iu=!0}Nl=null;break;case 5:Tu(t,e);break;case 4:r=tu,tu=!1,Tu(t,e),tu&&(ru=!0),tu=r;break;case 22:e.memoizedState===null&&(n.memoizedState===null?Tu(t,e):Bl(e,!1));break;case 30:r=tu,i=Pl(),tu=!1,Tu(t,e),tu&&(e.flags|=4);var a=e.memoizedProps,o=e.stateNode;t=ii(a,o),o=ii(n.memoizedProps,o);var s=ai(a.default,a.update);s===`none`?t=!1:(a=n.memoizedState,n.memoizedState=null,n=e.child,Fl=0,t=ql(e,n,t,o,s,a,!0),Fl!==(a===null?0:a.length)&&(e.flags|=32)),e.flags&4&&t?(Ad(e,e.memoizedProps.onUpdate),Nl=i):i!==null&&(i.push.apply(i,Nl),Nl=i),tu=e.flags&32?!0:r;break;default:Tu(t,e)}}function Du(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)su(e,t.alternate,t),t=t.sibling}function Ou(e,t){for(e=e.child;e!==null;){var n=e,r=t;switch(n.tag){case 0:case 11:case 14:case 15:pl(4,n,n.return),Ou(n,r);break;case 1:_l(n,n.return);var i=n.stateNode;typeof i.componentWillUnmount==`function`&&hl(n,n.return,i),Ou(n,r);break;case 27:r&2&&gm(n.stateNode,n.type,n.memoizedProps);case 5:_l(n,n.return),n.tag!==5&&n.tag!==27||bl(n),Ou(n,r);break;case 6:bl(n);break;case 26:_l(n,n.return),i=n.stateNode,n.memoizedState!==null||i===null||Xl||i.parentNode.removeChild(i),Ou(n,r);break;case 22:n.memoizedState===null&&Ou(n,r);break;case 30:_l(n,n.return),Ou(n,r);break;case 7:_l(n,n.return);default:Ou(n,r)}e=e.sibling}}function ku(e,t,n){for(n=t.subtreeFlags&8772?n:n&-2,t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags,s=!!(n&1);switch(a.tag){case 0:case 11:case 15:ku(i,a,n),fl(4,a);break;case 1:if(ku(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){df(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var c=r.stateNode;try{var l=i.shared.hiddenCallbacks;if(l!==null)for(i.shared.hiddenCallbacks=null,i=0;i<l.length;i++)uo(l[i],c)}catch(e){df(r,r.return,e)}}s&&o&64&&ml(a),gl(a,a.return);break;case 27:n&2&&kl(a);case 5:a.tag!==5&&a.tag!==27||yl(a),ku(i,a,n),s&&r===null&&o&4&&Cl(a),gl(a,a.return);break;case 6:yl(a);break;case 26:c=a.stateNode,a.memoizedState!==null||c===null||Yl||Km(bm(c.ownerDocument),a.type,c),ku(i,a,n),s&&r===null&&o&4&&Cl(a),gl(a,a.return);break;case 12:ku(i,a,n);break;case 31:ku(i,a,n),s&&o&4&&gu(i,a);break;case 13:ku(i,a,n),s&&o&4&&_u(i,a);break;case 22:a.memoizedState===null&&ku(i,a,n),gl(a,a.return);break;case 30:ku(i,a,n),gl(a,a.return);break;case 7:gl(a,a.return);default:ku(i,a,n)}t=t.sibling}}function Au(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&ba(n))}function ju(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ba(e))}function Mu(e,t,n,r){var i=(n&335544064)===n;if(t.subtreeFlags&(i?10262:10256))for(t=t.child;t!==null;)Nu(e,t,n,r),t=t.sibling;else i&&Kl(t)}function Nu(e,t,n,r){var i=(n&335544064)===n;i&&t.alternate===null&&t.return!==null&&t.return.alternate!==null&&Gl(t);var a=t.flags;switch(t.tag){case 0:case 11:case 15:Mu(e,t,n,r),a&2048&&fl(9,t);break;case 1:Mu(e,t,n,r);break;case 3:Mu(e,t,n,r),i&&iu&&(e=e.containerInfo,e=e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,e.style.viewTransitionName===`root`&&(e.style.viewTransitionName=``),e=e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===`none`&&(e.style.viewTransitionName=``)),a&2048&&(a=null,t.alternate!==null&&(a=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==a&&(t.refCount++,a!=null&&ba(a)));break;case 12:if(a&2048){Mu(e,t,n,r),a=t.stateNode;try{var o=t.memoizedProps,s=o.id,c=o.onPostCommit;typeof c==`function`&&c(s,t.alternate===null?`mount`:`update`,a.passiveEffectDuration,-0)}catch(e){df(t,t.return,e)}}else Mu(e,t,n,r);break;case 31:Mu(e,t,n,r);break;case 13:Mu(e,t,n,r);break;case 23:break;case 22:o=t.stateNode,s=t.alternate,t.memoizedState===null?(i&&s!==null&&s.memoizedState!==null&&Gl(t),o._visibility&2?Mu(e,t,n,r):(o._visibility|=2,Pu(e,t,n,r,!!(t.subtreeFlags&10256)||!1))):(i&&s!==null&&s.memoizedState===null&&Gl(s),o._visibility&2?Mu(e,t,n,r):Fu(e,t)),a&2048&&Au(s,t);break;case 24:Mu(e,t,n,r),a&2048&&ju(t.alternate,t);break;case 30:i&&(a=t.alternate,a!==null&&(Rl(a.child,!0),Rl(t.child,!0))),Mu(e,t,n,r);break;default:Mu(e,t,n,r)}}function Pu(e,t,n,r,i){for(i&&=!!(t.subtreeFlags&10256)||!1,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:Pu(a,o,s,c,i),fl(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,Pu(a,o,s,c,i)):u._visibility&2?Pu(a,o,s,c,i):Fu(a,o),i&&l&2048&&Au(o.alternate,o);break;case 24:Pu(a,o,s,c,i),i&&l&2048&&ju(o.alternate,o);break;default:Pu(a,o,s,c,i)}t=t.sibling}}function Fu(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:Fu(n,r),i&2048&&Au(r.alternate,r);break;case 24:Fu(n,r),i&2048&&ju(r.alternate,r);break;default:Fu(n,r)}t=t.sibling}}var Iu=8192;function Lu(e,t,n){if(e.subtreeFlags&Iu)for(e=e.child;e!==null;)Ru(e,t,n),e=e.sibling}function Ru(e,t,n){switch(e.tag){case 26:Lu(e,t,n),e.flags&Iu&&(e.memoizedState===null?(e=e.stateNode,(t&335544128)===t&&Zm(n,e)):Qm(n,xu,e.memoizedState,e.memoizedProps));break;case 5:Lu(e,t,n),e.flags&Iu&&(e=e.stateNode,(t&335544128)===t&&Zm(n,e));break;case 3:case 4:var r=xu;xu=bm(e.stateNode.containerInfo),Lu(e,t,n),xu=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=Iu,Iu=16777216,Lu(e,t,n),Iu=r):Lu(e,t,n));break;case 30:if((e.flags&Iu)!==0&&(r=e.memoizedProps.name,r!=null&&r!==`auto`)){var i=e.stateNode;i.paired=null,jl===null&&(jl=new Map),jl.set(r,i)}Lu(e,t,n);break;default:Lu(e,t,n)}}function zu(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Bu(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];eu=r,Uu(r,e)}zu(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Vu(e),e=e.sibling}function Vu(e){switch(e.tag){case 0:case 11:case 15:Bu(e),e.flags&2048&&pl(9,e,e.return);break;case 3:Bu(e);break;case 12:Bu(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Hu(e)):Bu(e);break;default:Bu(e)}}function Hu(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];eu=r,Uu(r,e)}zu(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:pl(8,t,t.return),Hu(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Hu(t));break;default:Hu(t)}e=e.sibling}}function Uu(e,t){for(;eu!==null;){var n=eu;switch(n.tag){case 0:case 11:case 15:pl(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:ba(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,eu=r;else a:for(n=e;eu!==null;){r=eu;var i=r.sibling,a=r.return;if(du(r),r===n){eu=null;break a}if(i!==null){i.return=a,eu=i;break a}eu=a}}}var Wu={getCacheForType:function(e){var t=fa(va),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return fa(va).controller.signal}},Gu=typeof WeakMap==`function`?WeakMap:Map,Ku=0,qu=null,Ju=null,Yu=0,Xu=0,Zu=null,Qu=!1,$u=!1,ed=!1,td=0,nd=0,rd=0,id=0,ad=0,od=0,sd=0,cd=null,ld=null,ud=!1,dd=0,fd=0,pd=1/0,md=null,hd=null,gd=0,_d=null,vd=null,yd=0,bd=0,xd=null,Sd=null,Cd=null,wd=null,Td=null,Ed=0,Dd=null;function Od(){return Ku&2&&Yu!==0?Yu&-Yu:G.T===null?lt():Mf()}function kd(){if(od===0){if(!(Yu&536870912)||Gi){var e=qe;qe<<=1,!(qe&3932160)&&(qe=262144),od=e}else od=536870912}return e=vo.current,e!==null&&(e.flags|=32),od}function Ad(e,t){if(t!=null){var n=e.stateNode,r=n.ref;r===null&&(r=n.ref=Pp(ii(e.memoizedProps,n))),wd===null&&(wd=[]),wd.push(t.bind(null,r))}}function jd(e,t,n){(e===qu&&(Xu===2||Xu===9)||e.cancelPendingCommit!==null)&&(Rd(e,0),Fd(e,Yu,od,!1)),nt(e,n),(!(Ku&2)||e!==qu)&&(e===qu&&(!(Ku&2)&&(id|=n),nd===4&&Fd(e,Yu,od,!1)),wf(e))}function Md(e,t,n){if(Ku&6)throw Error(i(327));var r=!n&&!(t&127)&&(t&e.expiredLanes)===0||Ze(e,t),a=r?Kd(e,t):Wd(e,t,!0),o=r;do{if(a===0){$u&&!r&&Fd(e,t,0,!1);break}if(n=e.current.alternate,o&&!Pd(n)){a=Wd(e,t,!1),o=!1;continue}if(a===2){if(o=t,e.errorRecoveryDisabledLanes&o)var s=0;else s=e.pendingLanes&-536870913,s=s===0?s&536870912?536870912:0:s;if(s!==0){t=s;a:{var c=e;a=cd;var l=c.current.memoizedState.isDehydrated;if(l&&(Rd(c,s).flags|=256),s=Wd(c,s,!1),s!==2&&s!==6){if(ed&&!l){c.errorRecoveryDisabledLanes|=o,id|=o,a=4;break a}o=ld,ld=a,o!==null&&(ld===null?ld=o:ld.push.apply(ld,o))}a=s}if(o=!1,a!==2)continue}}if(a===1){Rd(e,0),Fd(e,t,0,!0);break}a:{switch(r=e,o=a,o){case 0:case 1:throw Error(i(345));case 4:if((t&4194048)!==t&&(t&62914560)!==t)break;case 6:Fd(r,t,od,!Qu);break a;case 2:ld=null;break;case 3:case 5:break;default:throw Error(i(329))}if((t&62914560)===t&&(a=dd+300-Ae(),10<a)){if(Fd(r,t,od,!Qu),Xe(r,0,!0)!==0)break a;yd=t,r.timeoutHandle=gp(Nd.bind(null,r,n,ld,md,ud,t,od,id,sd,Qu,o,`Throttled`,-0,0),a);break a}Nd(r,n,ld,md,ud,t,od,id,sd,Qu,o,null,-0,0)}break}while(1);wf(e)}function Nd(e,t,n,r,i,a,o,s,c,l,u,d,f,p){e.timeoutHandle=-1;var m=t.subtreeFlags,h=(a&335544064)===a;if(d=null,(h||m&8192||(m&16785408)==16785408)&&(d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:ln},jl=null,Ru(t,a,d),h&&(m=d,h=e.containerInfo,h=(h.nodeType===9?h:h.ownerDocument).__reactViewTransition,h!=null&&(m.count++,m.waitingForViewTransition=!0,m=nh.bind(m),h.finished.then(m,m))),m=(a&62914560)===a?dd-Ae():(a&4194048)===a?fd-Ae():0,m=eh(d,m),m!==null)){yd=a,e.cancelPendingCommit=m($d.bind(null,e,t,a,n,r,i,o,s,c,l,u,d,null,f,p)),Fd(e,a,o,!l);return}$d(e,t,a,n,r,i,o,s,c,l,u,d)}function Pd(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!Or(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Fd(e,t,n,r){t=Qe(e,t),t&=~ad,t&=~id,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-He(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&it(e,n,t)}function Id(){return Ku&6?!0:(Tf(0,!1),!1)}function Ld(){if(Ju!==null){if(Xu===0)var e=Ju.return;else e=Ju,ia=ra=null,Jo(e),Ka=null,qa=0,e=Ju;for(;e!==null;)dl(e.alternate,e),e=e.return;Ju=null}}function Rd(e,t){var n=e.timeoutHandle;return n!==-1&&(e.timeoutHandle=-1,_p(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),yd=0,Ld(),qu=e,Ju=n=bi(e.current,null),Yu=t,Xu=0,Zu=null,Qu=!1,$u=Ze(e,t),ed=!1,sd=od=ad=id=rd=nd=0,ld=cd=null,ud=!1,td=Qe(e,t),ui(),n}function zd(e,t){Ao=null,G.H=ic,t===Ia||t===Ra?(t=Wa(),Xu=3):t===La?(t=Wa(),Xu=4):Xu=t===Sc?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,Zu=t,Ju===null&&(nd=1,gc(e,Oi(t,e.current)))}function Bd(){var e=vo.current;return e===null?!0:(Yu&4194048)===Yu?yo===null:(Yu&62914560)===Yu||Yu&536870912?e===yo:!1}function Vd(){var e=G.H;return G.H=ic,e===null?ic:e}function Hd(){var e=G.A;return G.A=Wu,e}function Ud(){nd=4,Qu||(Yu&4194048)!==Yu&&vo.current!==null||($u=!0),!(rd&134217727)&&!(id&134217727)||qu===null||Fd(qu,Yu,od,!1)}function Wd(e,t,n){var r=Ku;Ku|=2;var i=Vd(),a=Hd();(qu!==e||Yu!==t)&&(md=null,Rd(e,t)),t=!1;var o=nd;a:do try{if(Xu!==0&&Ju!==null){var s=Ju,c=Zu;switch(Xu){case 8:Ld(),o=6;break a;case 3:case 2:case 9:case 6:vo.current===null&&(t=!0);var l=Xu;if(Xu=0,Zu=null,Xd(e,s,c,l),n&&$u){o=0;break a}break;default:l=Xu,Xu=0,Zu=null,Xd(e,s,c,l)}}Gd(),o=nd;break}catch(t){zd(e,t)}while(1);return t&&e.shellSuspendCounter++,ia=ra=null,Ku=r,G.H=i,G.A=a,Ju===null&&(qu=null,Yu=0,ui()),o}function Gd(){for(;Ju!==null;)Jd(Ju)}function Kd(e,t){var n=Ku;Ku|=2;var r=Vd(),a=Hd();qu!==e||Yu!==t?(md=null,pd=Ae()+500,Rd(e,t)):$u=Ze(e,t);a:do try{if(Xu!==0&&Ju!==null){t=Ju;var o=Zu;b:switch(Xu){case 1:Xu=0,Zu=null,Xd(e,t,o,1);break;case 2:case 9:if(Ba(o)){Xu=0,Zu=null,Yd(t);break}t=function(){Xu!==2&&Xu!==9||qu!==e||(Xu=7),wf(e)},o.then(t,t);break a;case 3:Xu=7;break a;case 4:Xu=5;break a;case 7:Ba(o)?(Xu=0,Zu=null,Yd(t)):(Xu=0,Zu=null,Xd(e,t,o,7));break;case 5:var s=null;switch(Ju.tag){case 26:s=Ju.memoizedState;case 5:case 27:var c=Ju;if(s?Ym(s):c.stateNode.complete){Xu=0,Zu=null;var l=c.sibling;if(l!==null)Ju=l;else{var u=c.return;u===null?Ju=null:(Ju=u,Zd(u))}break b}}Xu=0,Zu=null,Xd(e,t,o,5);break;case 6:Xu=0,Zu=null,Xd(e,t,o,6);break;case 8:Ld(),nd=6;break a;default:throw Error(i(462))}}qd();break}catch(t){zd(e,t)}while(1);return ia=ra=null,G.H=r,G.A=a,Ku=n,Ju===null?(qu=null,Yu=0,ui(),nd):0}function qd(){for(;Ju!==null&&!Oe();)Jd(Ju)}function Jd(e){var t=nl(e.alternate,e,td);e.memoizedProps=e.pendingProps,t===null?Zd(e):Ju=t}function Yd(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=Ic(n,t,t.pendingProps,t.type,void 0,Yu);break;case 11:t=Ic(n,t,t.pendingProps,t.type.render,t.ref,Yu);break;case 5:Jo(t);var r=t;r===Ui&&(Gi?(Zi(r),r.tag===5&&r.stateNode!=null&&(Wi=r.stateNode)):(Zi(r),Gi=!0));default:dl(n,t),t=Ju=xi(t,td),t=nl(n,t,td)}e.memoizedProps=e.pendingProps,t===null?Zd(e):Ju=t}function Xd(e,t,n,r){ia=ra=null,Jo(t),Ka=null,qa=0;var i=t.return;try{if(xc(e,i,t,n,Yu)){nd=1,gc(e,Oi(n,e.current)),Ju=null;return}}catch(t){if(i!==null)throw Ju=i,t;nd=1,gc(e,Oi(n,e.current)),Ju=null;return}t.flags&32768?(Gi||r===1?e=!0:$u||Yu&536870912?e=!1:(Qu=e=!0,(r===2||r===9||r===3||r===6)&&(r=vo.current,r!==null&&r.tag===13&&(r.flags|=16384))),Qd(t,e)):Zd(t)}function Zd(e){var t=e;do{if(t.flags&32768){Qd(t,Qu);return}e=t.return;var n=ll(t.alternate,t,td);if(n!==null){Ju=n;return}if(t=t.sibling,t!==null){Ju=t;return}Ju=t=e}while(t!==null);nd===0&&(nd=5)}function Qd(e,t){do{var n=ul(e.alternate,e);if(n!==null){n.flags&=32767,Ju=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){Ju=e;return}Ju=e=n}while(e!==null);nd=6,Ju=null}function $d(e,t,n,r,a,o,s,c,l,u,d,f){e.cancelPendingCommit=null;do cf();while(gd!==0);if(Ku&6)throw Error(i(327));if(t!==null){if(t===e.current)throw Error(i(177));e===qu&&(Ju=qu=null,Yu=0),vd=t,_d=e,yd=n,xd=a,Sd=r,ef(e,t,n,s,c,l,f)}}function ef(e,t,n,r,i,a,o){var s=t.lanes|t.childLanes;if(bd=s,s|=li,rt(e,n,s,r,i,a),wd=null,(n&335544064)===n?(Td=Ca(e),r=10262):(Td=null,r=10256),(t.subtreeFlags&r)!==0||(t.flags&r)!==0?(e.callbackNode=null,e.callbackPriority=0,_f(Pe,function(){return lf(),null})):(e.callbackNode=null,e.callbackPriority=0),Al=!1,r=!!(t.flags&13878),t.subtreeFlags&13878||r){r=G.T,G.T=null,i=K.p,K.p=2,a=Ku,Ku|=4;try{au(e,t,n)}finally{Ku=a,K.p=i,G.T=r}}gd=1,Al?Cd=Mp(o,e.containerInfo,Td,rf,af,nf,of,lf,tf,null,null):(rf(),af(),of())}function tf(e){if(gd!==0){var t=_d.onRecoverableError;t(e,{componentStack:null})}}function nf(){gd===3&&(gd=0,Eu(vd,_d),gd=4)}function rf(){if(gd===1){gd=0;var e=_d,t=vd,n=yd,r=!!(t.flags&13878);if(t.subtreeFlags&13878||r){r=G.T,G.T=null;var i=K.p;K.p=2;var a=Ku;Ku|=4;try{nu=ru=!1,Su(t,e,n),n=cp;var o=Pr(e.containerInfo),s=n.focusedElem,c=n.selectionRange;if(o!==s&&s&&s.ownerDocument&&Nr(s.ownerDocument.documentElement,s)){if(c!==null&&Fr(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=Mr(s,h),v=Mr(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}gh=!!sp,cp=sp=null}finally{Ku=a,K.p=i,G.T=r}}e.current=t,gd=2}}function af(){if(gd===2){gd=0;var e=_d,t=vd,n=!!(t.flags&8772);if(t.subtreeFlags&8772||n){n=G.T,G.T=null;var r=K.p;K.p=2;var i=Ku;Ku|=4;try{su(e,t.alternate,t)}finally{Ku=i,K.p=r,G.T=n}}gd=3}}function of(){if(gd===4||gd===3){gd=0;var e=Cd;Cd=null,ke();var t=_d,n=vd,r=yd,i=Sd,a=(r&335544064)===r?10262:10256;if((n.subtreeFlags&a)!==0||(n.flags&a)!==0?gd=5:(gd=0,vd=_d=null,sf(t,t.pendingLanes)),a=t.pendingLanes,a===0&&(hd=null),ct(r),n=n.stateNode,Be&&typeof Be.onCommitFiberRoot==`function`)try{Be.onCommitFiberRoot(ze,n,void 0,(n.current.flags&128)==128)}catch{}if(i!==null){n=G.T,a=K.p,K.p=2,G.T=null;try{for(var o=t.onRecoverableError,s=0;s<i.length;s++){var c=i[s];o(c.value,{componentStack:c.stack})}}finally{G.T=n,K.p=a}}if(i=wd,o=Td,Td=null,i!==null&&(wd=null,o===null&&(o=[]),e!==null))for(c=0;c<i.length;c++)n=(0,i[c])(o),n!==void 0&&e.finished.finally(n);yd&3&&cf(),wf(t),a=t.pendingLanes,r&261930&&a&42?t===Dd?Ed++:(Ed=0,Dd=t):(Ed=0,Dd=null),Tf(0,!1)}}function sf(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,ba(t)))}function cf(){return Cd!==null&&(Cd.skipTransition(),Cd=null),rf(),af(),of(),lf()}function lf(){if(gd!==5)return!1;var e=_d,t=bd;bd=0;var n=ct(yd),r=G.T,a=K.p;try{K.p=32>n?32:n,G.T=null,n=xd,xd=null;var o=_d,s=yd;if(gd=0,vd=_d=null,yd=0,Ku&6)throw Error(i(331));var c=Ku;if(Ku|=4,Vu(o.current),Nu(o,o.current,s,n),Ku=c,Tf(0,!1),Be&&typeof Be.onPostCommitFiberRoot==`function`)try{Be.onPostCommitFiberRoot(ze,o)}catch{}return!0}finally{K.p=a,G.T=r,sf(e,t)}}function uf(e,t,n){t=Oi(n,t),t=vc(e.stateNode,t,2),e=io(e,t,2),e!==null&&(nt(e,2),wf(e))}function df(e,t,n){if(e.tag===3)uf(e,e,n);else for(;t!==null;){if(t.tag===3){uf(t,e,n);break}if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(hd===null||!hd.has(r))){e=Oi(n,e),n=yc(2),r=io(t,n,2),r!==null&&(bc(n,r,t,e),nt(r,2),wf(r));break}}t=t.return}}function ff(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Gu;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(ed=!0,i.add(n),e=pf.bind(null,e,t,n),t.then(e,e))}function pf(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,qu===e&&(Yu&n)===n&&(nd===4||nd===3&&(Yu&62914560)===Yu&&300>Ae()-dd?Ku&2?ad|=n:Rd(e,0):ad|=n,sd===Yu&&(sd=0)),wf(e)}function mf(e,t){t===0&&(t=et()),e=pi(e,t),e!==null&&(nt(e,t),wf(e))}function hf(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),mf(e,n)}function gf(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(i(314))}r!==null&&r.delete(t),mf(e,n)}function _f(e,t){return J(e,t)}var vf=null,yf=null,bf=!1,xf=!1,Sf=!1,Cf=0;function wf(e){e!==yf&&e.next===null&&(yf===null?vf=yf=e:yf=yf.next=e),xf=!0,bf||(bf=!0,jf())}function Tf(e,t){if(!Sf&&xf){Sf=!0;do for(var n=!1,r=vf;r!==null;){if(!t){if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-He(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,Af(r,a))}else a=Yu,a=Xe(r,r===qu?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||Ze(r,a)||(n=!0,Af(r,a))}r=r.next}while(n);Sf=!1}}function Ef(){Df()}function Df(){xf=bf=!1;var e=0;Cf!==0&&hp()&&(e=Cf);for(var t=Ae(),n=null,r=vf;r!==null;){var i=r.next,a=Of(r,t);a===0?(r.next=null,n===null?vf=i:n.next=i,i===null&&(yf=n)):(n=r,(e!==0||a&3)&&(xf=!0)),r=i}gd!==0&&gd!==5||Tf(e,!1),Cf!==0&&(Cf=0)}function Of(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-He(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=$e(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=qu,n=Yu,n=Xe(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(Xu===2||Xu===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&De(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||Ze(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&De(r),ct(n)){case 2:case 8:n=Ne;break;case 32:n=Pe;break;case 268435456:n=Ie;break;default:n=Pe}return r=kf.bind(null,e),n=J(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&De(r),e.callbackPriority=2,e.callbackNode=null,2}function kf(e,t){if(gd!==0&&gd!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(cf()&&e.callbackNode!==n)return null;var r=Yu;return r=Xe(e,e===qu?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(Md(e,r,t),Of(e,Ae()),e.callbackNode!=null&&e.callbackNode===n?kf.bind(null,e):null)}function Af(e,t){if(cf())return null;Md(e,t,!0)}function jf(){bp(function(){Ku&6?J(Me,Ef):Df()})}function Mf(){if(Cf===0){var e=Ea;e===0&&(e=Ke,Ke<<=1,!(Ke&261888)&&(Ke=256)),Cf=e}return Cf}function Nf(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:cn(e)}function Pf(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=Nf((i[pt]||null).action),o=r.submitter;o&&(t=(t=o[pt]||null)?Nf(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new Y(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(Cf!==0){var e=new FormData(i,o);Ws(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=new FormData(i,o),Ws(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var Ff=0;Ff<ti.length;Ff++){var If=ti[Ff];ni(If.toLowerCase(),`on`+(If[0].toUpperCase()+If.slice(1)))}ni(qr,`onAnimationEnd`),ni(Jr,`onAnimationIteration`),ni(Yr,`onAnimationStart`),ni(`dblclick`,`onDoubleClick`),ni(`focusin`,`onFocus`),ni(`focusout`,`onBlur`),ni(Xr,`onTransitionRun`),ni(Zr,`onTransitionStart`),ni(Qr,`onTransitionCancel`),ni($r,`onTransitionEnd`),jt(`onMouseEnter`,[`mouseout`,`mouseover`]),jt(`onMouseLeave`,[`mouseout`,`mouseover`]),jt(`onPointerEnter`,[`pointerout`,`pointerover`]),jt(`onPointerLeave`,[`pointerout`,`pointerover`]),At(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),At(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),At(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),At(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),At(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),At(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var Lf=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),Rf=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(Lf));function zf(e,t){t=!!(t&4);for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){oi(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){oi(e)}i.currentTarget=null,a=c}}}}function Bf(e,t){var n=t[ht];n===void 0&&(n=t[ht]=new Set);var r=e+`__bubble`;n.has(r)||(Wf(t,e,2,!1),n.add(r))}function Vf(e,t,n){var r=0;t&&(r|=4),Wf(n,e,r,t)}var Hf=`_reactListening`+Math.random().toString(36).slice(2);function Uf(e){if(!e[Hf]){e[Hf]=!0,Ot.forEach(function(t){t!==`selectionchange`&&(Rf.has(t)||Vf(t,!1,e),Vf(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Hf]||(t[Hf]=!0,Vf(`selectionchange`,!1,t))}}function Wf(e,t,n,r){switch(Ch(t)){case 2:var i=_h;break;case 8:i=vh;break;default:i=yh}n=i.bind(null,t,n,e),i=void 0,!yn||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function Gf(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var c=r.stateNode.containerInfo;if(c===i)break;if(s===4)for(s=r.return;s!==null;){var l=s.tag;if((l===3||l===4)&&s.stateNode.containerInfo===i)return;s=s.return}for(;c!==null;){if(s=St(c),s===null)return;if(l=s.tag,l===5||l===6||l===26||l===27){r=a=s;continue a}c=c.parentNode}}r=r.return}gn(function(){var r=a,i=dn(n),s=[];a:{var c=ei.get(e);if(c!==void 0){var l=Y,u=e;switch(e){case`keypress`:if(Tn(n)===0)break a;case`keydown`:case`keyup`:l=Kn;break;case`focusin`:u=`focus`,l=Ln;break;case`focusout`:u=`blur`,l=Ln;break;case`beforeblur`:case`afterblur`:l=Ln;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:l=In;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:l=X;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:l=Yn;break;case qr:case Jr:case Yr:l=Rn;break;case $r:l=Xn;break;case`scroll`:case`scrollend`:l=jn;break;case`wheel`:l=Zn;break;case`copy`:case`cut`:case`paste`:l=zn;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:l=qn;break;case`submit`:l=Jn;break;case`toggle`:case`beforetoggle`:l=Qn}var d=!!(t&4),f=!d&&(e===`scroll`||e===`scrollend`),p=d?c===null?null:c+`Capture`:c;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=_n(m,p),g!=null&&d.push(Kf(m,g,h))),f)break;m=m.return}0<d.length&&(c=new l(c,u,null,n,i),s.push({event:c,listeners:d}))}}if(!(t&7)){a:{if(l=e===`mouseover`||e===`pointerover`,c=e===`mouseout`||e===`pointerout`,l&&n!==un&&(u=n.relatedTarget||n.fromElement)&&(St(u)||u[mt]))break a;(c||l)&&(u=i.window===i?i:(l=i.ownerDocument)?l.defaultView||l.parentWindow:window,c?(l=n.relatedTarget||n.toElement,c=r,l=l?St(l):null,l!==null&&(f=o(l),d=l.tag,l!==f||d!==5&&d!==27&&d!==6)&&(l=null)):(c=null,l=r),c!==l&&(d=In,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=qn,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=c==null?u:wt(c),h=l==null?u:wt(l),u=new d(g,m+`leave`,c,n,i),u.target=f,u.relatedTarget=h,g=null,St(i)===r&&(d=new d(p,m+`enter`,l,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,d=c&&l?E(c,l,Jf):null,c!==null&&Yf(s,u,c,d,!1),l!==null&&f!==null&&Yf(s,f,l,d,!0)))}a:{if(c=r?wt(r):window,l=c.nodeName&&c.nodeName.toLowerCase(),l===`select`||l===`input`&&c.type===`file`)var _=gr;else if(ur(c)){if(_r)_=Er;else{_=wr;var v=Cr}}else l=c.nodeName,!l||l.toLowerCase()!==`input`||c.type!==`checkbox`&&c.type!==`radio`?r&&an(r.elementType)&&(_=gr):_=Tr;if(_&&=_(e,r)){dr(s,_,n,i);break a}v&&v(e,c,r)}switch(v=r?wt(r):window,e){case`focusin`:(ur(v)||v.contentEditable===`true`)&&(Lr=v,Rr=r,zr=null);break;case`focusout`:zr=Rr=Lr=null;break;case`mousedown`:Br=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:Br=!1,Vr(s,n,i);break;case`selectionchange`:if(Ir)break;case`keydown`:case`keyup`:Vr(s,n,i)}var y;if(er)b:{switch(e){case`compositionstart`:var b=`onCompositionStart`;break b;case`compositionend`:b=`onCompositionEnd`;break b;case`compositionupdate`:b=`onCompositionUpdate`;break b}b=void 0}else or?ir(e,n)&&(b=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(b=`onCompositionStart`);b&&(nr&&n.locale!==`ko`&&(or||b!==`onCompositionStart`?b===`onCompositionEnd`&&or&&(y=wn()):(xn=i,Sn=`value`in xn?xn.value:xn.textContent,or=!0)),v=qf(r,b),0<v.length&&(b=new Bn(b,e,null,n,i),s.push({event:b,listeners:v}),y?b.data=y:(y=ar(n),y!==null&&(b.data=y)))),(y=tr?sr(e,n):cr(e,n))&&(b=qf(r,`onBeforeInput`),0<b.length&&(v=new Bn(`onBeforeInput`,`beforeinput`,null,n,i),s.push({event:v,listeners:b}),v.data=y)),Pf(s,e,r,n,i)}zf(s,t)})}function Kf(e,t,n){return{instance:e,listener:t,currentTarget:n}}function qf(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=_n(e,n),i!=null&&r.unshift(Kf(e,i,a)),i=_n(e,t),i!=null&&r.push(Kf(e,i,a))),e.tag===3)return r;e=e.return}return[]}function Jf(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Yf(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=_n(n,a),l!=null&&o.unshift(Kf(n,l,c))):i||(l=_n(n,a),l!=null&&o.push(Kf(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var Xf=/\r\n?/g,Zf=/\u0000|\uFFFD/g;function Qf(e){return(typeof e==`string`?e:``+e).replace(Xf,`
`).replace(Zf,``)}function $f(e,t){return t=Qf(t),Qf(e)===t}function ep(e,t,n,r,a,o){switch(n){case`children`:if(typeof r==`string`)t===`body`||t===`textarea`&&r===``||en(e,r);else if(typeof r==`number`||typeof r==`bigint`)t!==`body`&&en(e,``+r);else return;break;case`className`:zt(e,`class`,r);break;case`tabIndex`:zt(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:zt(e,n,r);break;case`style`:rn(e,r,o);return;case`data`:if(t!==`object`){zt(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)){e.removeAttribute(n);break}if(r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=cn(r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}if(typeof o==`function`&&(n===`formAction`?(t!==`input`&&ep(e,t,`name`,a.name,a,null),ep(e,t,`formEncType`,a.formEncType,a,null),ep(e,t,`formMethod`,a.formMethod,a,null),ep(e,t,`formTarget`,a.formTarget,a,null)):(ep(e,t,`encType`,a.encType,a,null),ep(e,t,`method`,a.method,a,null),ep(e,t,`target`,a.target,a,null))),r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=cn(r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=ln);return;case`onScroll`:r!=null&&Bf(`scroll`,e);return;case`onScrollEnd`:r!=null&&Bf(`scrollend`,e);return;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));o?.__html!==n&&(e.innerHTML=n)}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=cn(r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`credentialless`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:Bf(`beforetoggle`,e),Bf(`toggle`,e),Rt(e,`popover`,r);break;case`xlinkActuate`:Bt(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:Bt(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:Bt(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:Bt(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:Bt(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:Bt(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:Bt(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:Bt(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:Bt(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:Rt(e,`is`,r);break;case`innerText`:case`textContent`:return;default:if(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)n=on.get(n)||n,Rt(e,n,r);else return}It=!0}function tp(e,t,n,r,a,o){switch(n){case`style`:rn(e,r,o);return;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));o?.__html!==n&&(e.innerHTML=n)}}break;case`children`:if(typeof r==`string`)en(e,r);else if(typeof r==`number`||typeof r==`bigint`)en(e,``+r);else return;break;case`onScroll`:r!=null&&Bf(`scroll`,e);return;case`onScrollEnd`:r!=null&&Bf(`scrollend`,e);return;case`onClick`:r!=null&&(e.onclick=ln);return;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:return;case`innerText`:case`textContent`:return;default:if(!kt.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(a=n.endsWith(`Capture`),o=n.slice(2,a?n.length-7:void 0),t=e[pt]||null,t=t==null?null:t[n],typeof t==`function`&&e.removeEventListener(o,t,a),typeof r==`function`)){typeof t!=`function`&&t!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(o,r,a);break a}It=!0,n in e?e[n]=r:!0===r?e.setAttribute(n,``):Rt(e,n,r)}return}It=!0}function np(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:Bf(`error`,e),Bf(`load`,e);var r=!1,a=!1,o;for(o in n)if(n.hasOwnProperty(o)){var s=n[o];if(s!=null)switch(o){case`src`:r=!0;break;case`srcSet`:a=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:ep(e,t,o,s,n,null)}}a&&ep(e,t,`srcSet`,n.srcSet,n,null),r&&ep(e,t,`src`,n.src,n,null);return;case`input`:Bf(`invalid`,e);var c=o=s=a=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:a=d;break;case`type`:s=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:o=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(i(137,t));break;default:ep(e,t,r,d,n,null)}}Yt(e,o,c,l,u,s,a,!1);return;case`select`:for(a in Bf(`invalid`,e),r=s=o=null,n)if(n.hasOwnProperty(a)&&(c=n[a],c!=null))switch(a){case`value`:o=c;break;case`defaultValue`:s=c;break;case`multiple`:r=c;default:ep(e,t,a,c,n,null)}t=o,n=s,e.multiple=!!r,t==null?n!=null&&Zt(e,!!r,n,!0):Zt(e,!!r,t,!1);return;case`textarea`:for(s in Bf(`invalid`,e),o=a=r=null,n)if(n.hasOwnProperty(s)&&(c=n[s],c!=null))switch(s){case`value`:r=c;break;case`defaultValue`:a=c;break;case`children`:o=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(i(91));break;default:ep(e,t,s,c,n,null)}$t(e,r,a,o);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:ep(e,t,l,r,n,null)}return;case`dialog`:Bf(`beforetoggle`,e),Bf(`toggle`,e),Bf(`cancel`,e),Bf(`close`,e);break;case`iframe`:case`object`:Bf(`load`,e);break;case`video`:case`audio`:for(r=0;r<Lf.length;r++)Bf(Lf[r],e);break;case`image`:Bf(`error`,e),Bf(`load`,e);break;case`details`:Bf(`toggle`,e);break;case`embed`:case`source`:case`link`:Bf(`error`,e),Bf(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:ep(e,t,u,r,n,null)}return;default:if(an(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&tp(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&ep(e,t,c,r,n,null))}var rp={};function ip(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var a=null,o=null,s=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||ep(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:m!==f&&(It=!0),o=m;break;case`name`:m!==f&&(It=!0),a=m;break;case`checked`:m!==f&&(It=!0),u=m;break;case`defaultChecked`:m!==f&&(It=!0),d=m;break;case`value`:m!==f&&(It=!0),s=m;break;case`defaultValue`:m!==f&&(It=!0),c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(i(137,t));break;default:m!==f&&ep(e,t,p,m,r,f)}}Jt(e,s,c,l,u,d,o,a);return;case`select`:for(o in m=s=c=p=null,n)if(l=n[o],n.hasOwnProperty(o)&&l!=null)switch(o){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(o)||ep(e,t,o,null,r,l)}for(a in r)if(o=r[a],l=n[a],r.hasOwnProperty(a)&&(o!=null||l!=null))switch(a){case`value`:o!==l&&(It=!0),p=o;break;case`defaultValue`:o!==l&&(It=!0),c=o;break;case`multiple`:o!==l&&(It=!0),s=o;default:o!==l&&ep(e,t,a,o,r,l)}t=c,n=s,r=m,p==null?!!r!=!!n&&(t==null?Zt(e,!!n,n?[]:``,!1):Zt(e,!!n,t,!0)):Zt(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(a=n[c],n.hasOwnProperty(c)&&a!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:ep(e,t,c,null,r,a)}for(s in r)if(a=r[s],o=n[s],r.hasOwnProperty(s)&&(a!=null||o!=null))switch(s){case`value`:a!==o&&(It=!0),p=a;break;case`defaultValue`:a!==o&&(It=!0),m=a;break;case`children`:break;case`dangerouslySetInnerHTML`:if(a!=null)throw Error(i(91));break;default:a!==o&&ep(e,t,s,a,r,o)}Qt(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:ep(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:p!==m&&(It=!0),e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:ep(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&ep(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(i(137,t));break;default:ep(e,t,u,p,r,m)}return;default:if(an(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&tp(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||tp(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&ep(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||ep(e,t,f,p,r,m)}function ap(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function op(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&ap(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&ap(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var sp=null,cp=null;function lp(e){return e.nodeType===9?e:e.ownerDocument}function up(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function dp(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function fp(e,t,n,r){return n=lp(n).createElement(e),n[ft]=r,n[pt]=t,np(n,e,t),Et(n),n}function pp(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var mp=null;function hp(){var e=window.event;return e&&e.type===`popstate`?e!==mp&&(mp=e,!0):(mp=null,!1)}var gp=typeof setTimeout==`function`?setTimeout:void 0,_p=typeof clearTimeout==`function`?clearTimeout:void 0,vp=typeof Promise==`function`?Promise:void 0,yp=typeof requestAnimationFrame==`function`?requestAnimationFrame:gp,bp=typeof queueMicrotask==`function`?queueMicrotask:vp===void 0?gp:function(e){return vp.resolve(null).then(e).catch(xp)};function xp(e){setTimeout(function(){throw e})}function Sp(e){return e===`head`}function Cp(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8){if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Hh(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)_m(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,_m(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[yt]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&_m(e.ownerDocument.body)}n=i}while(n);Hh(t)}function wp(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8){if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++}n=r}while(n)}function Tp(e,t,n){if(t=CSS.escape(t)===t?t:`r-`+btoa(t).replace(/=/g,``),e.style.viewTransitionName=t,n!=null&&(e.style.viewTransitionClass=n),n=getComputedStyle(e),n.display===`inline`){if(t=e.getClientRects(),t.length===1)var r=1;else for(var i=r=0;i<t.length;i++){var a=t[i];0<a.width&&0<a.height&&r++}r===1&&(e=e.style,e.display=t.length===1?`inline-block`:`block`,e.marginTop=`-`+n.paddingTop,e.marginBottom=`-`+n.paddingBottom)}}function Ep(e,t){e=e.style,t=t.style;var n=t==null?null:t.hasOwnProperty(`viewTransitionName`)?t.viewTransitionName:t.hasOwnProperty(`view-transition-name`)?t[`view-transition-name`]:null;e.viewTransitionName=n==null||typeof n==`boolean`?``:(``+n).trim(),n=t==null?null:t.hasOwnProperty(`viewTransitionClass`)?t.viewTransitionClass:t.hasOwnProperty(`view-transition-class`)?t[`view-transition-class`]:null,e.viewTransitionClass=n==null||typeof n==`boolean`?``:(``+n).trim(),e.display===`inline-block`&&(t==null?e.display=e.margin=``:(n=t.display,e.display=n==null||typeof n==`boolean`?``:n,n=t.margin,n==null?(n=t.hasOwnProperty(`marginTop`)?t.marginTop:t[`margin-top`],e.marginTop=n==null||typeof n==`boolean`?``:n,t=t.hasOwnProperty(`marginBottom`)?t.marginBottom:t[`margin-bottom`],e.marginBottom=t==null||typeof t==`boolean`?``:t):e.margin=n))}function Dp(e,t,n){return n=n.ownerDocument.defaultView,{rect:e,abs:t.position===`absolute`||t.position===`fixed`,clip:t.clipPath!==`none`||t.overflow!==`visible`||t.filter!==`none`||t.mask!==`none`||t.mask!==`none`||t.borderRadius!==`0px`,view:0<=e.bottom&&0<=e.right&&e.top<=n.innerHeight&&e.left<=n.innerWidth}}function Op(e){return Dp(e.getBoundingClientRect(),getComputedStyle(e),e)}function kp(e){var t=e.getBoundingClientRect();t=new DOMRect(t.x+2e4,t.y+2e4,t.width,t.height);var n=getComputedStyle(e);return Dp(t,n,e)}function Ap(e){return e.documentElement.clientHeight}function jp(e){this.addEventListener(`load`,e),this.addEventListener(`error`,e)}function Mp(e,t,n,r,i,a,o,s,c){var l=t.nodeType===9?t:t.ownerDocument;try{var u=l.startViewTransition({update:function(){var t=l.defaultView,n=t.navigation&&t.navigation.transition,o=l.fonts.status;r();var s=[];if(o===`loaded`&&(Ap(l),l.fonts.status===`loading`&&s.push(l.fonts.ready)),o=s.length,e!==null)for(var c=e.suspenseyImages,u=0,d=0;d<c.length;d++){var f=c[d];if(!f.complete){var p=f.getBoundingClientRect();if(0<p.bottom&&0<p.right&&p.top<t.innerHeight&&p.left<t.innerWidth){if(u+=Xm(f),u>$m){s.length=o;break}f=new Promise(jp.bind(f)),s.push(f)}}}if(0<s.length)return t=Promise.race([Promise.all(s),new Promise(function(e){return setTimeout(e,500)})]).then(i,i),(n?Promise.allSettled([n.finished,t]):t).then(a,a);if(i(),n)return n.finished.then(a,a);a()},types:n});l.__reactViewTransition=u;var d=[];return u.ready.then(function(){for(var e=l.documentElement.getAnimations({subtree:!0}),t=0;t<e.length;t++){var n=e[t],r=n.effect,i=r.pseudoElement;if(i!=null&&i.startsWith(`::view-transition`)){d.push(n),n=r.getKeyframes();for(var a=i=void 0,s=!0,c=0;c<n.length;c++){var u=n[c],f=u.width;if(i===void 0)i=f;else if(i!==f){s=!1;break}if(f=u.height,a===void 0)a=f;else if(a!==f){s=!1;break}delete u.width,delete u.height,u.transform===`none`&&delete u.transform}s&&i!==void 0&&a!==void 0&&(r.setKeyframes(n),s=getComputedStyle(r.target,r.pseudoElement),s.width!==i||s.height!==a)&&(s=n[0],s.width=i,s.height=a,s=n[n.length-1],s.width=i,s.height=a,r.setKeyframes(n))}}o()},function(e){l.__reactViewTransition===u&&(l.__reactViewTransition=null);try{if(typeof e==`object`&&e)switch(e.name){case`InvalidStateError`:(e.message===`View transition was skipped because document visibility state is hidden.`||e.message===`Skipping view transition because document visibility state has become hidden.`||e.message===`Skipping view transition because viewport size changed.`||e.message===`Transition was aborted because of invalid state`)&&(e=null)}e!==null&&c(e)}finally{r(),i(),o()}}),u.finished.finally(function(){for(var e=0;e<d.length;e++)d[e].cancel();l.__reactViewTransition===u&&(l.__reactViewTransition=null),s()}),u}catch{return r(),i(),o(),null}}function Np(e,t){this._scope=document.documentElement,this._selector=`::view-transition-`+e+`(`+t+`)`}Np.prototype.animate=function(e,t){return t=typeof t==`number`?{duration:t}:D({},t),t.pseudoElement=this._selector,this._scope.animate(e,t)},Np.prototype.getAnimations=function(){for(var e=this._scope,t=this._selector,n=e.getAnimations({subtree:!0}),r=[],i=0;i<n.length;i++){var a=n[i].effect;a!==null&&a.target===e&&a.pseudoElement===t&&r.push(n[i])}return r},Np.prototype.getComputedStyle=function(){return getComputedStyle(this._scope,this._selector)};function Pp(e){return{name:e,group:new Np(`group`,e),imagePair:new Np(`image-pair`,e),old:new Np(`old`,e),new:new Np(`new`,e)}}function Fp(e){this._fragmentFiber=e,this._observers=this._eventListeners=null}Fp.prototype.addEventListener=function(e,t,n){var r=null,i=null;if(!(n!=null&&typeof n!=`boolean`&&(r=n.signal||null,r!==null&&r.aborted))){this._eventListeners===null&&(this._eventListeners=[]);var a=this._eventListeners;if(Bp(a,e,t,n)===-1){var o=this,s=t;n!=null&&typeof n!=`boolean`&&!0===n.once&&(s=function(r){o.removeEventListener(e,t,n),typeof t==`function`?t.call(this,r):t.handleEvent(r)}),r!==null&&(i=o.removeEventListener.bind(o,e,t,n),r.addEventListener(`abort`,i,{once:!0}),i=r.removeEventListener.bind(r,`abort`,i)),r=Rp(n),a.push({type:e,listener:t,optionsOrUseCapture:n,attachedListener:s,cleanup:i}),h(this._fragmentFiber.child,!1,Ip,e,s,r)}this._eventListeners=a}};function Ip(e,t,n,r){return b(e).addEventListener(t,n,r),!1}Fp.prototype.removeEventListener=function(e,t,n){var r=this._eventListeners;if(r!==null&&(t=Bp(r,e,t,n),t!==-1)){var i=r[t];n=i.attachedListener;var a=i.cleanup;i=Rp(i.optionsOrUseCapture),h(this._fragmentFiber.child,!1,Lp,e,n,i),r.splice(t,1),a!==null&&a()}};function Lp(e,t,n,r){return b(e).removeEventListener(t,n,r),!1}function Rp(e){return e!=null&&typeof e!=`boolean`&&(!0===e.once||e.signal instanceof AbortSignal)?{capture:e.capture,passive:e.passive}:e}function zp(e){return e==null?`c=0`:typeof e==`boolean`?`c=`+(e?`1`:`0`):`c=`+(e.capture?`1`:`0`)}function Bp(e,t,n,r){if(e.length===0)return-1;r=zp(r);for(var i=0;i<e.length;i++){var a=e[i];if(a.type===t&&a.listener===n&&zp(a.optionsOrUseCapture)===r)return i}return-1}Fp.prototype.dispatchEvent=function(e){var t=g(this._fragmentFiber);if(t===null)return!0;t=b(t);var n=this._eventListeners;if(n!==null&&0<n.length||!e.bubbles){var r=t.nodeType===9?t.createComment(``):document.createTextNode(``);if(n)for(var i=0;i<n.length;i++){var a=n[i];r.addEventListener(a.type,a.attachedListener,Rp(a.optionsOrUseCapture))}if(t.appendChild(r),e=r.dispatchEvent(e),n)for(i=0;i<n.length;i++)a=n[i],r.removeEventListener(a.type,a.attachedListener,Rp(a.optionsOrUseCapture));return t.removeChild(r),e}return t.dispatchEvent(e)},Fp.prototype.focus=function(e){h(this._fragmentFiber.child,!0,Vp,e,void 0,void 0)};function Vp(e,t){return e.tag!==6&&(e=b(e),pm(e,t))}Fp.prototype.focusLast=function(e){var t=[];h(this._fragmentFiber.child,!0,Hp,t,void 0,void 0);for(var n=t.length-1;0<=n&&!Vp(t[n],e);n--);};function Hp(e,t){return t.push(e),!1}Fp.prototype.blur=function(){var e=g(this._fragmentFiber);e!==null&&(e=b(e),e=lp(e).activeElement,e!==null&&h(this._fragmentFiber.child,!1,Up,e,void 0,void 0))};function Up(e,t){return e.tag!==6&&(e=b(e),e===t||e.contains(t)?(t.blur(),!0):!1)}Fp.prototype.observeUsing=function(e){this._observers===null&&(this._observers=new Set),this._observers.add(e),h(this._fragmentFiber.child,!1,Wp,e,void 0,void 0)};function Wp(e,t){return e.tag!==6&&(e=b(e),t.observe(e),!1)}Fp.prototype.unobserveUsing=function(e){var t=this._observers;if(t!==null&&t.has(e)){t.delete(e),h(this._fragmentFiber.child,!1,Gp,e,void 0,void 0);for(var n=t=0;n<Kp.length;n++){var r=Kp[n];r.fragmentInstance===this&&r.observer===e?e.unobserve(r.instance):Kp[t++]=r}Kp.length=t}};function Gp(e,t){return e.tag!==6&&(e=b(e),t.unobserve(e),!1)}var Kp=[],qp=!1;function Jp(e,t,n){Kp.push({fragmentInstance:e,observer:t,instance:n}),qp||(qp=!0,mm(function(){qp=!1;var e=Kp;Kp=[];for(var t=0;t<e.length;t++){var n=e[t];n.observer.unobserve(n.instance)}}))}Fp.prototype.getClientRects=function(){var e=[];return h(this._fragmentFiber.child,!1,Yp,e,void 0,void 0),e};function Yp(e,t){if(e.tag===6){e=e.stateNode;var n=e.ownerDocument.createRange();n.selectNodeContents(e),t.push.apply(t,n.getClientRects())}else e=b(e),t.push.apply(t,e.getClientRects());return!1}Fp.prototype.getRootNode=function(e){var t=g(this._fragmentFiber);return t===null?this:b(t).getRootNode(e)},Fp.prototype.compareDocumentPosition=function(e){var t=g(this._fragmentFiber);if(t===null)return Node.DOCUMENT_POSITION_DISCONNECTED;var n=[];h(this._fragmentFiber.child,!1,Hp,n,void 0,void 0);var r=b(t);if(n.length===0){if(n=r,_(this._fragmentFiber)){a:{for(t=this._fragmentFiber.return;t!==null;){if(t.tag===4){t=t.stateNode.containerInfo;break a}if(t.tag===3||t.tag===5||t.tag===27)break;t=t.return}t=null}t!=null&&(n=t)}t=this._fragmentFiber;var i=r=n.compareDocumentPosition(e);return n===e?i=Node.DOCUMENT_POSITION_CONTAINS:r&Node.DOCUMENT_POSITION_CONTAINED_BY&&(n=v(t)[1],n===null?i=Node.DOCUMENT_POSITION_PRECEDING:(e=b(n).compareDocumentPosition(e),i=e===0||e&Node.DOCUMENT_POSITION_FOLLOWING?Node.DOCUMENT_POSITION_FOLLOWING:Node.DOCUMENT_POSITION_PRECEDING)),i|=Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC}t=b(n[0]),i=b(n[n.length-1]);var a=_(this._fragmentFiber)?t.parentElement:r;if(a==null)return Node.DOCUMENT_POSITION_DISCONNECTED;r=a.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_CONTAINED_BY,a=a.compareDocumentPosition(i)&Node.DOCUMENT_POSITION_CONTAINED_BY;var o=t.compareDocumentPosition(e),s=i.compareDocumentPosition(e),c=o&Node.DOCUMENT_POSITION_CONTAINED_BY||s&Node.DOCUMENT_POSITION_CONTAINED_BY;return s=r&&a&&o&Node.DOCUMENT_POSITION_FOLLOWING&&s&Node.DOCUMENT_POSITION_PRECEDING,t=r&&t===e||a&&i===e||c||s?Node.DOCUMENT_POSITION_CONTAINED_BY:!r&&t===e||!a&&i===e?Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:o,t&Node.DOCUMENT_POSITION_DISCONNECTED||t&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC||Xp(t,this._fragmentFiber,n[0],n[n.length-1],e)?t:Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC};function Xp(e,t,n,r,i){var a=St(i);if(e&Node.DOCUMENT_POSITION_CONTAINED_BY){if(n=!!a)a:{for(;a!==null;){if(a.tag===7&&(a===t||a.alternate===t)){n=!0;break a}a=a.return}n=!1}return n}if(e&Node.DOCUMENT_POSITION_CONTAINS){if(a===null)return a=i.ownerDocument,i===a||i===a.documentElement||i===a.body;a:{for(a=t,t=g(t);a!==null;){if(!(a.tag!==5&&a.tag!==3&&a.tag!==27||a!==t&&a.alternate!==t)){a=!0;break a}a=a.return}a=!1}return a}return e&Node.DOCUMENT_POSITION_PRECEDING?((t=!!a)&&!(t=a===n)&&(t=E(n,a,T),t===null?t=!1:(h(t,!0,C,a,n),a=x,x=null,t=a!==null)),t):e&Node.DOCUMENT_POSITION_FOLLOWING?((t=!!a)&&!(t=a===r)&&(t=E(r,a,T),t===null?t=!1:(h(t,!0,w,a,r),a=x,S=x=null,t=a!==null)),t):!1}function Zp(e,t){var n=e.ownerDocument.createRange();n.selectNodeContents(e),e=n.getBoundingClientRect(),window.scrollTo(window.scrollX+e.left,t?window.scrollY+e.top:window.scrollY+e.bottom-window.innerHeight)}Fp.prototype.scrollIntoView=function(e){if(typeof e==`object`)throw Error(i(566));var t=[];h(this._fragmentFiber.child,!1,Hp,t,void 0,void 0);var n=!1!==e;if(t.length===0){var r=v(this._fragmentFiber);if(r=n?r[1]||r[0]||g(this._fragmentFiber):r[0]||r[1],r===null)return;if(r.tag===6){e=b(r),Zp(e,n);return}if(r=b(r),r.nodeType!==9){if(r.nodeType===11){n=`host`in r?r.host:null,n!==null&&n.scrollIntoView(e);return}r.scrollIntoView(e)}}for(r=n?t.length-1:0;r!==(n?-1:t.length);){var a=t[r];a.tag===6?(a=b(a),Zp(a,n)):b(a).scrollIntoView(e),r+=n?-1:1}};function Qp(e,t){return e=b(e),$p(e,t),!1}function $p(e,t){e.reactFragments??=new Set,e.reactFragments.add(t)}function em(e,t){var n=t._eventListeners;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];e.addEventListener(i.type,i.attachedListener,Rp(i.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(n){for(var r=0,i=0;i<Kp.length;i++){var a=Kp[i];(a.fragmentInstance!==t||a.observer!==n||a.instance!==e)&&(Kp[r++]=a)}Kp.length=r,n.observe(e)}),$p(e,t))}function tm(e,t){var n=t._eventListeners;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];e.removeEventListener(i.type,i.attachedListener,Rp(i.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(n){typeof n.rootMargin==`string`?Jp(t,n,e):n.unobserve(e)}),e.reactFragments!=null&&e.reactFragments.delete(t))}function nm(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:nm(n),xt(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function rm(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r){if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e}else if(!e[yt])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=lm(e.nextSibling),e===null)break}return null}function im(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=lm(e.nextSibling),e===null))return null;return e}function am(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=lm(e.nextSibling),e===null))return null;return e}function om(e){return e.data===`$?`||e.data===`$~`}function sm(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function cm(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function lm(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var um=null;function dm(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return lm(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function fm(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function pm(e,t){function n(){r=!0}if(e.ownerDocument.activeElement===e)return!0;var r=!1;try{e.ownerDocument.addEventListener(`focus`,n,!0),(e.focus||HTMLElement.prototype.focus).call(e,t)}finally{e.ownerDocument.removeEventListener(`focus`,n,!0)}return r}function mm(e){yp(function(){yp(function(t){return e(t)})})}function hm(e,t,n){switch(t=lp(n),e){case`html`:if(e=t.documentElement,!e)throw Error(i(452));return e;case`head`:if(e=t.head,!e)throw Error(i(453));return e;case`body`:if(e=t.body,!e)throw Error(i(454));return e;default:throw Error(i(451))}}function gm(e,t,n){for(var r in n){var i=n[r];n.hasOwnProperty(r)&&i!=null&&ep(e,t,r,null,rp,i)}n.dangerouslySetInnerHTML!=null&&(e.textContent=``),e.onclick===ln&&(e.onclick=null),xt(e)}function _m(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);xt(e)}var vm=new Map,ym=new Set;function bm(e){if(typeof e.getRootNode==`function`){var t=e.getRootNode();if(t.nodeType===9||t.nodeType===11)return t}return e.nodeType===9?e:e.ownerDocument}var xm=K.d;K.d={f:Sm,r:Cm,D:Em,C:Dm,L:Om,m:km,X:jm,S:Am,M:Mm};function Sm(){var e=xm.f(),t=Id();return e||t}function Cm(e){var t=Ct(e);t!==null&&t.tag===5&&t.type===`form`?Ks(t):xm.r(e)}var wm=typeof document>`u`?null:document;function Tm(e,t,n){var r=wm;if(r&&typeof t==`string`&&t){var i=qt(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),ym.has(i)||(ym.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),np(t,`link`,e),Et(t),r.head.appendChild(t)))}}function Em(e){xm.D(e),Tm(`dns-prefetch`,e,null)}function Dm(e,t){xm.C(e,t),Tm(`preconnect`,e,t)}function Om(e,t,n){xm.L(e,t,n);var r=wm;if(r&&e&&t){var i=`link[rel="preload"][as="`+qt(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+qt(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+qt(n.imageSizes)+`"]`)):i+=`[href="`+qt(e)+`"]`;var a=i;switch(t){case`style`:a=Pm(e);break;case`script`:a=Rm(e)}if(!(vm.has(a)||(e=D({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),vm.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(Fm(a))||t===`script`&&r.querySelector(zm(a))))){var o=r.createElement(`link`);np(o,`link`,e),t===`style`&&(o[bt]=!0,o.onload=o.onerror=function(){Dt(o)}),Et(o),r.head.appendChild(o)}}}function km(e,t){xm.m(e,t);var n=wm;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+qt(r)+`"][href="`+qt(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=Rm(e)}if(!vm.has(a)&&(e=D({rel:`modulepreload`,href:e},t),vm.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(zm(a)))return}r=n.createElement(`link`),np(r,`link`,e),Et(r),n.head.appendChild(r)}}}function Am(e,t,n){xm.S(e,t,n);var r=wm;if(r&&e){var i=Tt(r).hoistableStyles,a=Pm(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(Fm(a)))s.loading=5;else{e=D({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=vm.get(a))&&Hm(e,n);var c=o=r.createElement(`link`);Et(c),np(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,Vm(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function jm(e,t){xm.X(e,t);var n=wm;if(n&&e){var r=Tt(n).hoistableScripts,i=Rm(e),a=r.get(i);a||(a=n.querySelector(zm(i)),a||(e=D({src:e,async:!0},t),(t=vm.get(i))&&Um(e,t),a=n.createElement(`script`),Et(a),np(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Mm(e,t){xm.M(e,t);var n=wm;if(n&&e){var r=Tt(n).hoistableScripts,i=Rm(e),a=r.get(i);a||(a=n.querySelector(zm(i)),a||(e=D({src:e,async:!0,type:`module`},t),(t=vm.get(i))&&Um(e,t),a=n.createElement(`script`),Et(a),np(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Nm(e,t,n,r){var a=(a=me.current)?bm(a):null;if(!a)throw Error(i(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(n=Pm(n.href),t=Tt(a).hoistableStyles,r=t.get(n),r||(r={type:`style`,instance:null,count:0,state:null},t.set(n,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=Pm(n.href);var o=Tt(a).hoistableStyles,s=o.get(e);if(s||(a=a.ownerDocument||a,s={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},o.set(e,s),(o=a.querySelector(Fm(e)))?o._p||(s.instance=o,s.state.loading=5):(o=vm.get(e),o||(o={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},vm.set(e,o)),Lm(a,e,o,s.state))),t&&r===null)throw Error(i(528,``));return s}if(t&&r!==null)throw Error(i(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(n=Rm(n),t=Tt(a).hoistableScripts,r=t.get(n),r||(r={type:`script`,instance:null,count:0,state:null},t.set(n,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(i(444,e))}}function Pm(e){return`href="`+qt(e)+`"`}function Fm(e){return`link[rel="stylesheet"][`+e+`]`}function Im(e){return D({},e,{"data-precedence":e.precedence,precedence:null})}function Lm(e,t,n,r){if(t=e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)){if(!0!==t[bt]){r.loading=1;return}}else t=e.createElement(`link`),t[bt]=!0,t.onload=t.onerror=Dt.bind(null,t),np(t,`link`,n),Et(t),e.head.appendChild(t);r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2})}function Rm(e){return`[src="`+qt(e)+`"]`}function zm(e){return`script[async]`+e}function Bm(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+qt(n.href)+`"]`);if(r)return t.instance=r,Et(r),r;var a=D({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),Et(r),np(r,`style`,a),Vm(r,n.precedence,e),t.instance=r;case`stylesheet`:a=Pm(n.href);var o=e.querySelector(Fm(a));if(o)return t.state.loading|=4,t.instance=o,Et(o),o;r=Im(n),(a=vm.get(a))&&Hm(r,a),o=(e.ownerDocument||e).createElement(`link`),Et(o);var s=o;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),np(o,`link`,r),t.state.loading|=4,Vm(o,n.precedence,e),t.instance=o;case`script`:return o=Rm(n.src),(a=e.querySelector(zm(o)))?(t.instance=a,Et(a),a):(r=n,(a=vm.get(o))&&(r=D({},n),Um(r,a)),e=e.ownerDocument||e,a=e.createElement(`script`),Et(a),np(a,`link`,r),e.head.appendChild(a),t.instance=a);case`void`:return null;default:throw Error(i(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,Vm(r,n.precedence,e));return t.instance}function Vm(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Hm(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function Um(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var Wm=null;function Gm(e,t,n){if(Wm===null){var r=new Map,i=Wm=new Map;i.set(n,r)}else i=Wm,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[yt]||a[ft]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function Km(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function qm(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Jm(e,t){return e===`img`&&t.src!=null&&t.src!==``&&t.onLoad==null&&t.loading!==`lazy`}function Ym(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function Xm(e){return(e.width||100)*(e.height||100)*(typeof devicePixelRatio==`number`?devicePixelRatio:1)*.25}function Zm(e,t){typeof t.decode==`function`&&(e.imgCount++,t.complete||(e.imgBytes+=Xm(t),e.suspenseyImages.push(t)),e=rh.bind(e),t.decode().then(e,e))}function Qm(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=Pm(r.href),a=t.querySelector(Fm(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=nh.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,Et(a);return}a=t.ownerDocument||t,r=Im(r),(i=vm.get(i))&&Hm(r,i),a=a.createElement(`link`),Et(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),np(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=nh.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var $m=0;function eh(e,t){return e.stylesheets&&e.count===0&&ah(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&ah(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&$m===0&&($m=62500*op());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&ah(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>$m?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function th(e){if(e.count===0&&(e.imgCount===0||!e.waitingForImages)){if(e.stylesheets)ah(e,e.stylesheets);else if(e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}}}function nh(){this.count--,th(this)}function rh(){this.imgCount--,th(this)}var ih=null;function ah(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,ih=new Map,t.forEach(oh,e),ih=null,nh.call(e))}function oh(e,t){if(!(t.state.loading&4)){var n=ih.get(e);if(n)var r=n.get(null);else{n=new Map,ih.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=nh.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var sh={$$typeof:F,Provider:null,Consumer:null,_currentValue:oe,_currentValue2:oe,_threadCount:0};function ch(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=tt(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=tt(0),this.hiddenUpdates=tt(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.transitionTypes=null,this.incompleteTransitions=new Map}function lh(e,t,n,r,i,a,o,s,c,l,u,d){return e=new ch(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=vi(3,null,null,t),e.current=a,a.stateNode=e,t=ya(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},to(a),e}function uh(e){return e?(e=gi,e):gi}function dh(e,t,n,r,i,a){i=uh(i),r.context===null?r.context=i:r.pendingContext=i,r=ro(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=io(e,r,t),n!==null&&(jd(n,e,t),ao(n,e,t))}function fh(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function ph(e,t){fh(e,t),(e=e.alternate)&&fh(e,t)}function mh(e){if(e.tag===13||e.tag===31){var t=pi(e,67108864);t!==null&&jd(t,e,67108864),ph(e,67108864)}}function hh(e){if(e.tag===13||e.tag===31){var t=Od();t=st(t);var n=pi(e,t);n!==null&&jd(n,e,t),ph(e,t)}}var gh=!0;function _h(e,t,n,r){var i=G.T;G.T=null;var a=K.p;try{K.p=2,yh(e,t,n,r)}finally{K.p=a,G.T=i}}function vh(e,t,n,r){var i=G.T;G.T=null;var a=K.p;try{K.p=8,yh(e,t,n,r)}finally{K.p=a,G.T=i}}function yh(e,t,n,r){if(gh){var i=bh(r);if(i===null)Gf(e,t,r,xh,n),Mh(e,r);else if(Ph(i,e,t,n,r))r.stopPropagation();else if(Mh(e,r),t&4&&-1<jh.indexOf(e)){for(;i!==null;){var a=Ct(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=Ye(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-He(o);s.entanglements[1]|=c,o&=~c}wf(a),!(Ku&6)&&(pd=Ae()+500,Tf(0,!1))}}break;case 31:case 13:s=pi(a,2),s!==null&&jd(s,a,2),Id(),ph(a,2)}if(a=bh(r),a===null&&Gf(e,t,r,xh,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else Gf(e,t,r,null,n)}}function bh(e){return e=dn(e),Sh(e)}var xh=null;function Sh(e){if(xh=null,e=St(e),e!==null){var t=o(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=s(t),e!==null)return e;e=null}else if(n===31){if(e=c(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return xh=e,null}function Ch(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`fullscreenerror`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`resize`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(je()){case Me:return 2;case Ne:return 8;case Pe:case Fe:return 32;case Ie:return 268435456;default:return 32}default:return 32}}var wh=!1,Th=null,Eh=null,Dh=null,Oh=new Map,kh=new Map,Ah=[],jh=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function Mh(e,t){switch(e){case`focusin`:case`focusout`:Th=null;break;case`dragenter`:case`dragleave`:Eh=null;break;case`mouseover`:case`mouseout`:Dh=null;break;case`pointerover`:case`pointerout`:Oh.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:kh.delete(t.pointerId)}}function Nh(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=Ct(t),t!==null&&mh(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Ph(e,t,n,r,i){switch(t){case`focusin`:return Th=Nh(Th,e,t,n,r,i),!0;case`dragenter`:return Eh=Nh(Eh,e,t,n,r,i),!0;case`mouseover`:return Dh=Nh(Dh,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return Oh.set(a,Nh(Oh.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,kh.set(a,Nh(kh.get(a)||null,e,t,n,r,i)),!0}return!1}function Fh(e){var t=St(e.target);if(t!==null){var n=o(t);if(n!==null){if(t=n.tag,t===13){if(t=s(n),t!==null){e.blockedOn=t,ut(e.priority,function(){hh(n)});return}}else if(t===31){if(t=c(n),t!==null){e.blockedOn=t,ut(e.priority,function(){hh(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ih(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=bh(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);un=r,n.target.dispatchEvent(r),un=null}else return t=Ct(n),t!==null&&mh(t),e.blockedOn=n,!1;t.shift()}return!0}function Lh(e,t,n){Ih(e)&&n.delete(t)}function Rh(){wh=!1,Th!==null&&Ih(Th)&&(Th=null),Eh!==null&&Ih(Eh)&&(Eh=null),Dh!==null&&Ih(Dh)&&(Dh=null),Oh.forEach(Lh),kh.forEach(Lh)}function zh(e,n){e.blockedOn===n&&(e.blockedOn=null,wh||(wh=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,Rh)))}var Bh=null;function Vh(e){Bh!==e&&(Bh=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){Bh===e&&(Bh=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(Sh(r||n)===null)continue;break}var a=Ct(n);a!==null&&(e.splice(t,3),t-=3,Ws(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Hh(e){function t(t){return zh(t,e)}Th!==null&&zh(Th,e),Eh!==null&&zh(Eh,e),Dh!==null&&zh(Dh,e),Oh.forEach(t),kh.forEach(t);for(var n=0;n<Ah.length;n++){var r=Ah[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<Ah.length&&(n=Ah[0],n.blockedOn===null);)Fh(n),n.blockedOn===null&&Ah.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[pt]||null;if(typeof a==`function`)o||Vh(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[pt]||null)s=o.formAction;else if(Sh(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),Vh(n)}}}function Uh(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Wh(e){this._internalRoot=e}Gh.prototype.render=Wh.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));var n=t.current;dh(n,Od(),e,t,null,null)},Gh.prototype.unmount=Wh.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;dh(e.current,2,null,e,null,null),Id(),t[mt]=null}};function Gh(e){this._internalRoot=e}Gh.prototype.unstable_scheduleHydration=function(e){if(e){var t=lt();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Ah.length&&t!==0&&t<Ah[n].priority;n++);Ah.splice(n,0,e),n===0&&Fh(e)}};var Kh=n.version;if(Kh!==`19.3.0`)throw Error(i(527,Kh,`19.3.0`));K.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(i(188)):(e=Object.keys(e).join(`,`),Error(i(268,e)));return e=d(t),e=e===null?null:p(e),e=e===null?null:e.stateNode,e};var qh={bundleType:0,version:`19.3.0`,rendererPackageName:`react-dom`,currentDispatcherRef:G,reconcilerVersion:`19.3.0`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var Jh=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Jh.isDisabled&&Jh.supportsFiber)try{ze=Jh.inject(qh),Be=Jh}catch{}}e.createRoot=function(e,t){if(!a(e))throw Error(i(299));var n=!1,r=``,o=pc,s=mc,c=hc;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(o=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(c=t.onRecoverableError)),t=lh(e,1,!1,null,null,n,r,null,o,s,c,Uh),e[mt]=t.current,Uf(e),new Wh(t)}})),g=o(((e,t)=>{function n(){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE==`function`)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=h()})),_=c(u(),1),v=new Map([[`bold`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M228,128a100,100,0,0,1-98.66,100H128a99.39,99.39,0,0,1-68.62-27.29,12,12,0,0,1,16.48-17.45,76,76,0,1,0-1.57-109c-.13.13-.25.25-.39.37L54.89,92H72a12,12,0,0,1,0,24H24a12,12,0,0,1-12-12V56a12,12,0,0,1,24,0V76.72L57.48,57.06A100,100,0,0,1,228,128Z`}))],[`duotone`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M216,128a88,88,0,1,1-88-88A88,88,0,0,1,216,128Z`,opacity:`0.2`}),_.createElement(`path`,{d:`M224,128a96,96,0,0,1-94.71,96H128A95.38,95.38,0,0,1,62.1,197.8a8,8,0,0,1,11-11.63A80,80,0,1,0,71.43,71.39a3.07,3.07,0,0,1-.26.25L44.59,96H72a8,8,0,0,1,0,16H24a8,8,0,0,1-8-8V56a8,8,0,0,1,16,0V85.8L60.25,60A96,96,0,0,1,224,128Z`}))],[`fill`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M224,128a96,96,0,0,1-94.71,96H128A95.38,95.38,0,0,1,62.1,197.8a8,8,0,0,1,11-11.63A80,80,0,1,0,71.43,71.39a3.07,3.07,0,0,1-.26.25L60.63,81.29l17,17A8,8,0,0,1,72,112H24a8,8,0,0,1-8-8V56A8,8,0,0,1,29.66,50.3L49.31,70,60.25,60A96,96,0,0,1,224,128Z`}))],[`light`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M222,128a94,94,0,0,1-92.74,94H128a93.43,93.43,0,0,1-64.5-25.65,6,6,0,1,1,8.24-8.72A82,82,0,1,0,70,70l-.19.19L39.44,98H72a6,6,0,0,1,0,12H24a6,6,0,0,1-6-6V56a6,6,0,0,1,12,0V90.34L61.63,61.4A94,94,0,0,1,222,128Z`}))],[`regular`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M224,128a96,96,0,0,1-94.71,96H128A95.38,95.38,0,0,1,62.1,197.8a8,8,0,0,1,11-11.63A80,80,0,1,0,71.43,71.39a3.07,3.07,0,0,1-.26.25L44.59,96H72a8,8,0,0,1,0,16H24a8,8,0,0,1-8-8V56a8,8,0,0,1,16,0V85.8L60.25,60A96,96,0,0,1,224,128Z`}))],[`thin`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M220,128a92,92,0,0,1-90.77,92H128a91.47,91.47,0,0,1-63.13-25.1,4,4,0,1,1,5.5-5.82A84,84,0,1,0,68.6,68.57l-.13.12L34.3,100H72a4,4,0,0,1,0,8H24a4,4,0,0,1-4-4V56a4,4,0,0,1,8,0V94.89l35-32A92,92,0,0,1,220,128Z`}))]]),y=new Map([[`bold`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M216.49,104.49l-80,80a12,12,0,0,1-17,0l-80-80a12,12,0,0,1,17-17L128,159l71.51-71.52a12,12,0,0,1,17,17Z`}))],[`duotone`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M208,96l-80,80L48,96Z`,opacity:`0.2`}),_.createElement(`path`,{d:`M215.39,92.94A8,8,0,0,0,208,88H48a8,8,0,0,0-5.66,13.66l80,80a8,8,0,0,0,11.32,0l80-80A8,8,0,0,0,215.39,92.94ZM128,164.69,67.31,104H188.69Z`}))],[`fill`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,48,88H208a8,8,0,0,1,5.66,13.66Z`}))],[`light`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M212.24,100.24l-80,80a6,6,0,0,1-8.48,0l-80-80a6,6,0,0,1,8.48-8.48L128,167.51l75.76-75.75a6,6,0,0,1,8.48,8.48Z`}))],[`regular`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z`}))],[`thin`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M210.83,98.83l-80,80a4,4,0,0,1-5.66,0l-80-80a4,4,0,0,1,5.66-5.66L128,170.34l77.17-77.17a4,4,0,1,1,5.66,5.66Z`}))]]),b=new Map([[`bold`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M232.49,80.49l-128,128a12,12,0,0,1-17,0l-56-56a12,12,0,1,1,17-17L96,183,215.51,63.51a12,12,0,0,1,17,17Z`}))],[`duotone`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M232,56V200a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56Z`,opacity:`0.2`}),_.createElement(`path`,{d:`M205.66,85.66l-96,96a8,8,0,0,1-11.32,0l-40-40a8,8,0,0,1,11.32-11.32L104,164.69l90.34-90.35a8,8,0,0,1,11.32,11.32Z`}))],[`fill`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM205.66,85.66l-96,96a8,8,0,0,1-11.32,0l-40-40a8,8,0,0,1,11.32-11.32L104,164.69l90.34-90.35a8,8,0,0,1,11.32,11.32Z`}))],[`light`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M228.24,76.24l-128,128a6,6,0,0,1-8.48,0l-56-56a6,6,0,0,1,8.48-8.48L96,191.51,219.76,67.76a6,6,0,0,1,8.48,8.48Z`}))],[`regular`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z`}))],[`thin`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M226.83,74.83l-128,128a4,4,0,0,1-5.66,0l-56-56a4,4,0,0,1,5.66-5.66L96,194.34,221.17,69.17a4,4,0,1,1,5.66,5.66Z`}))]]),x=new Map([[`bold`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M71.68,97.22,34.74,128l36.94,30.78a12,12,0,1,1-15.36,18.44l-48-40a12,12,0,0,1,0-18.44l48-40A12,12,0,0,1,71.68,97.22Zm176,21.56-48-40a12,12,0,1,0-15.36,18.44L221.26,128l-36.94,30.78a12,12,0,1,0,15.36,18.44l48-40a12,12,0,0,0,0-18.44ZM164.1,28.72a12,12,0,0,0-15.38,7.18l-64,176a12,12,0,0,0,7.18,15.37A11.79,11.79,0,0,0,96,228a12,12,0,0,0,11.28-7.9l64-176A12,12,0,0,0,164.1,28.72Z`}))],[`duotone`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M240,128l-48,40H64L16,128,64,88H192Z`,opacity:`0.2`}),_.createElement(`path`,{d:`M69.12,94.15,28.5,128l40.62,33.85a8,8,0,1,1-10.24,12.29l-48-40a8,8,0,0,1,0-12.29l48-40a8,8,0,0,1,10.24,12.3Zm176,27.7-48-40a8,8,0,1,0-10.24,12.3L227.5,128l-40.62,33.85a8,8,0,1,0,10.24,12.29l48-40a8,8,0,0,0,0-12.29ZM162.73,32.48a8,8,0,0,0-10.25,4.79l-64,176a8,8,0,0,0,4.79,10.26A8.14,8.14,0,0,0,96,224a8,8,0,0,0,7.52-5.27l64-176A8,8,0,0,0,162.73,32.48Z`}))],[`fill`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM92.8,145.6a8,8,0,1,1-9.6,12.8l-32-24a8,8,0,0,1,0-12.8l32-24a8,8,0,0,1,9.6,12.8L69.33,128Zm58.89-71.4-32,112a8,8,0,1,1-15.38-4.4l32-112a8,8,0,0,1,15.38,4.4Zm53.11,60.2-32,24a8,8,0,0,1-9.6-12.8L186.67,128,163.2,110.4a8,8,0,1,1,9.6-12.8l32,24a8,8,0,0,1,0,12.8Z`}))],[`light`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M67.84,92.61,25.37,128l42.47,35.39a6,6,0,1,1-7.68,9.22l-48-40a6,6,0,0,1,0-9.22l48-40a6,6,0,0,1,7.68,9.22Zm176,30.78-48-40a6,6,0,1,0-7.68,9.22L230.63,128l-42.47,35.39a6,6,0,1,0,7.68,9.22l48-40a6,6,0,0,0,0-9.22Zm-81.79-89A6,6,0,0,0,154.36,38l-64,176A6,6,0,0,0,94,221.64a6.15,6.15,0,0,0,2,.36,6,6,0,0,0,5.64-3.95l64-176A6,6,0,0,0,162.05,34.36Z`}))],[`regular`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M69.12,94.15,28.5,128l40.62,33.85a8,8,0,1,1-10.24,12.29l-48-40a8,8,0,0,1,0-12.29l48-40a8,8,0,0,1,10.24,12.3Zm176,27.7-48-40a8,8,0,1,0-10.24,12.3L227.5,128l-40.62,33.85a8,8,0,1,0,10.24,12.29l48-40a8,8,0,0,0,0-12.29ZM162.73,32.48a8,8,0,0,0-10.25,4.79l-64,176a8,8,0,0,0,4.79,10.26A8.14,8.14,0,0,0,96,224a8,8,0,0,0,7.52-5.27l64-176A8,8,0,0,0,162.73,32.48Z`}))],[`thin`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M66.56,91.07,22.25,128l44.31,36.93A4,4,0,0,1,64,172a3.94,3.94,0,0,1-2.56-.93l-48-40a4,4,0,0,1,0-6.14l48-40a4,4,0,0,1,5.12,6.14Zm176,33.86-48-40a4,4,0,1,0-5.12,6.14L233.75,128l-44.31,36.93a4,4,0,1,0,5.12,6.14l48-40a4,4,0,0,0,0-6.14ZM161.37,36.24a4,4,0,0,0-5.13,2.39l-64,176a4,4,0,0,0,2.39,5.13A4.12,4.12,0,0,0,96,220a4,4,0,0,0,3.76-2.63l64-176A4,4,0,0,0,161.37,36.24Z`}))]]),S=new Map([[`bold`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M180,64H40A12,12,0,0,0,28,76V216a12,12,0,0,0,12,12H180a12,12,0,0,0,12-12V76A12,12,0,0,0,180,64ZM168,204H52V88H168ZM228,40V180a12,12,0,0,1-24,0V52H76a12,12,0,0,1,0-24H216A12,12,0,0,1,228,40Z`}))],[`duotone`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M184,72V216H40V72Z`,opacity:`0.2`}),_.createElement(`path`,{d:`M184,64H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H184a8,8,0,0,0,8-8V72A8,8,0,0,0,184,64Zm-8,144H48V80H176ZM224,40V184a8,8,0,0,1-16,0V48H72a8,8,0,0,1,0-16H216A8,8,0,0,1,224,40Z`}))],[`fill`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M192,72V216a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V72a8,8,0,0,1,8-8H184A8,8,0,0,1,192,72Zm24-40H72a8,8,0,0,0,0,16H208V184a8,8,0,0,0,16,0V40A8,8,0,0,0,216,32Z`}))],[`light`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M184,66H40a6,6,0,0,0-6,6V216a6,6,0,0,0,6,6H184a6,6,0,0,0,6-6V72A6,6,0,0,0,184,66Zm-6,144H46V78H178ZM222,40V184a6,6,0,0,1-12,0V46H72a6,6,0,0,1,0-12H216A6,6,0,0,1,222,40Z`}))],[`regular`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M184,64H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H184a8,8,0,0,0,8-8V72A8,8,0,0,0,184,64Zm-8,144H48V80H176ZM224,40V184a8,8,0,0,1-16,0V48H72a8,8,0,0,1,0-16H216A8,8,0,0,1,224,40Z`}))],[`thin`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M184,68H40a4,4,0,0,0-4,4V216a4,4,0,0,0,4,4H184a4,4,0,0,0,4-4V72A4,4,0,0,0,184,68Zm-4,144H44V76H180ZM220,40V184a4,4,0,0,1-8,0V44H72a4,4,0,0,1,0-8H216A4,4,0,0,1,220,40Z`}))]]),C=new Map([[`bold`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M222.14,69.17,186.83,33.86A19.86,19.86,0,0,0,172.69,28H48A20,20,0,0,0,28,48V208a20,20,0,0,0,20,20H208a20,20,0,0,0,20-20V83.31A19.86,19.86,0,0,0,222.14,69.17ZM164,204H92V160h72Zm40,0H188V156a20,20,0,0,0-20-20H88a20,20,0,0,0-20,20v48H52V52H171l33,33ZM164,84a12,12,0,0,1-12,12H96a12,12,0,0,1,0-24h56A12,12,0,0,1,164,84Z`}))],[`duotone`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M216,83.31V208a8,8,0,0,1-8,8H176V152a8,8,0,0,0-8-8H88a8,8,0,0,0-8,8v64H48a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8H172.69a8,8,0,0,1,5.65,2.34l35.32,35.32A8,8,0,0,1,216,83.31Z`,opacity:`0.2`}),_.createElement(`path`,{d:`M219.31,72,184,36.69A15.86,15.86,0,0,0,172.69,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V83.31A15.86,15.86,0,0,0,219.31,72ZM168,208H88V152h80Zm40,0H184V152a16,16,0,0,0-16-16H88a16,16,0,0,0-16,16v56H48V48H172.69L208,83.31ZM160,72a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h56A8,8,0,0,1,160,72Z`}))],[`fill`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M219.31,72,184,36.69A15.86,15.86,0,0,0,172.69,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V83.31A15.86,15.86,0,0,0,219.31,72ZM208,208H184V152a16,16,0,0,0-16-16H88a16,16,0,0,0-16,16v56H48V48H172.69L208,83.31ZM160,72a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h56A8,8,0,0,1,160,72Z`}))],[`light`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M217.9,73.42,182.58,38.1a13.9,13.9,0,0,0-9.89-4.1H48A14,14,0,0,0,34,48V208a14,14,0,0,0,14,14H208a14,14,0,0,0,14-14V83.31A13.9,13.9,0,0,0,217.9,73.42ZM170,210H86V152a2,2,0,0,1,2-2h80a2,2,0,0,1,2,2Zm40-2a2,2,0,0,1-2,2H182V152a14,14,0,0,0-14-14H88a14,14,0,0,0-14,14v58H48a2,2,0,0,1-2-2V48a2,2,0,0,1,2-2H172.69a2,2,0,0,1,1.41.58L209.42,81.9a2,2,0,0,1,.58,1.41ZM158,72a6,6,0,0,1-6,6H96a6,6,0,0,1,0-12h56A6,6,0,0,1,158,72Z`}))],[`regular`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M219.31,72,184,36.69A15.86,15.86,0,0,0,172.69,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V83.31A15.86,15.86,0,0,0,219.31,72ZM168,208H88V152h80Zm40,0H184V152a16,16,0,0,0-16-16H88a16,16,0,0,0-16,16v56H48V48H172.69L208,83.31ZM160,72a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h56A8,8,0,0,1,160,72Z`}))],[`thin`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M216.49,74.83,181.17,39.51A11.93,11.93,0,0,0,172.69,36H48A12,12,0,0,0,36,48V208a12,12,0,0,0,12,12H208a12,12,0,0,0,12-12V83.31A11.93,11.93,0,0,0,216.49,74.83ZM172,212H84V152a4,4,0,0,1,4-4h80a4,4,0,0,1,4,4Zm40-4a4,4,0,0,1-4,4H180V152a12,12,0,0,0-12-12H88a12,12,0,0,0-12,12v60H48a4,4,0,0,1-4-4V48a4,4,0,0,1,4-4H172.69a4,4,0,0,1,2.82,1.17l35.32,35.32A4,4,0,0,1,212,83.31ZM156,72a4,4,0,0,1-4,4H96a4,4,0,0,1,0-8h56A4,4,0,0,1,156,72Z`}))]]),w=new Map([[`bold`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M212.62,75.17A63.7,63.7,0,0,0,206.39,26,12,12,0,0,0,196,20a63.71,63.71,0,0,0-50,24H126A63.71,63.71,0,0,0,76,20a12,12,0,0,0-10.39,6,63.7,63.7,0,0,0-6.23,49.17A61.5,61.5,0,0,0,52,104v8a60.1,60.1,0,0,0,45.76,58.28A43.66,43.66,0,0,0,92,192v4H76a20,20,0,0,1-20-20,44.05,44.05,0,0,0-44-44,12,12,0,0,0,0,24,20,20,0,0,1,20,20,44.05,44.05,0,0,0,44,44H92v12a12,12,0,0,0,24,0V192a20,20,0,0,1,40,0v40a12,12,0,0,0,24,0V192a43.66,43.66,0,0,0-5.76-21.72A60.1,60.1,0,0,0,220,112v-8A61.5,61.5,0,0,0,212.62,75.17ZM196,112a36,36,0,0,1-36,36H112a36,36,0,0,1-36-36v-8a37.87,37.87,0,0,1,6.13-20.12,11.65,11.65,0,0,0,1.58-11.49,39.9,39.9,0,0,1-.4-27.72,39.87,39.87,0,0,1,26.41,17.8A12,12,0,0,0,119.82,68h32.35a12,12,0,0,0,10.11-5.53,39.84,39.84,0,0,1,26.41-17.8,39.9,39.9,0,0,1-.4,27.72,12,12,0,0,0,1.61,11.53A37.85,37.85,0,0,1,196,104Z`}))],[`duotone`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M208,104v8a48,48,0,0,1-48,48H136a32,32,0,0,1,32,32v40H104V192a32,32,0,0,1,32-32H112a48,48,0,0,1-48-48v-8a49.28,49.28,0,0,1,8.51-27.3A51.92,51.92,0,0,1,76,32a52,52,0,0,1,43.83,24h32.34A52,52,0,0,1,196,32a51.92,51.92,0,0,1,3.49,44.7A49.28,49.28,0,0,1,208,104Z`,opacity:`0.2`}),_.createElement(`path`,{d:`M208.3,75.68A59.74,59.74,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58,58,0,0,0,208.3,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.76,41.76,0,0,1,200,104Z`}))],[`fill`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M216,104v8a56.06,56.06,0,0,1-48.44,55.47A39.8,39.8,0,0,1,176,192v40a8,8,0,0,1-8,8H104a8,8,0,0,1-8-8V216H72a40,40,0,0,1-40-40A24,24,0,0,0,8,152a8,8,0,0,1,0-16,40,40,0,0,1,40,40,24,24,0,0,0,24,24H96v-8a39.8,39.8,0,0,1,8.44-24.53A56.06,56.06,0,0,1,56,112v-8a58.14,58.14,0,0,1,7.69-28.32A59.78,59.78,0,0,1,69.07,28,8,8,0,0,1,76,24a59.75,59.75,0,0,1,48,24h24a59.75,59.75,0,0,1,48-24,8,8,0,0,1,6.93,4,59.74,59.74,0,0,1,5.37,47.68A58,58,0,0,1,216,104Z`}))],[`light`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M206.13,75.92A57.79,57.79,0,0,0,201.2,29a6,6,0,0,0-5.2-3,57.77,57.77,0,0,0-47,24H123A57.77,57.77,0,0,0,76,26a6,6,0,0,0-5.2,3,57.79,57.79,0,0,0-4.93,46.92A55.88,55.88,0,0,0,58,104v8a54.06,54.06,0,0,0,50.45,53.87A37.85,37.85,0,0,0,98,192v10H72a26,26,0,0,1-26-26A38,38,0,0,0,8,138a6,6,0,0,0,0,12,26,26,0,0,1,26,26,38,38,0,0,0,38,38H98v18a6,6,0,0,0,12,0V192a26,26,0,0,1,52,0v40a6,6,0,0,0,12,0V192a37.85,37.85,0,0,0-10.45-26.13A54.06,54.06,0,0,0,214,112v-8A55.88,55.88,0,0,0,206.13,75.92ZM202,112a42,42,0,0,1-42,42H112a42,42,0,0,1-42-42v-8a43.86,43.86,0,0,1,7.3-23.69,6,6,0,0,0,.81-5.76,45.85,45.85,0,0,1,1.43-36.42,45.85,45.85,0,0,1,35.23,21.1A6,6,0,0,0,119.83,62h32.34a6,6,0,0,0,5.06-2.76,45.83,45.83,0,0,1,35.23-21.11,45.85,45.85,0,0,1,1.43,36.42,6,6,0,0,0,.79,5.74A43.78,43.78,0,0,1,202,104Z`}))],[`regular`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.72,41.72,0,0,1,200,104Z`}))],[`thin`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M203.94,76.16A55.73,55.73,0,0,0,199.46,30,4,4,0,0,0,196,28a55.78,55.78,0,0,0-46,24H122A55.78,55.78,0,0,0,76,28a4,4,0,0,0-3.46,2,55.73,55.73,0,0,0-4.48,46.16A53.78,53.78,0,0,0,60,104v8a52.06,52.06,0,0,0,52,52h1.41A36,36,0,0,0,100,192v12H72a28,28,0,0,1-28-28A36,36,0,0,0,8,140a4,4,0,0,0,0,8,28,28,0,0,1,28,28,36,36,0,0,0,36,36h28v20a4,4,0,0,0,8,0V192a28,28,0,0,1,56,0v40a4,4,0,0,0,8,0V192a36,36,0,0,0-13.41-28H160a52.06,52.06,0,0,0,52-52v-8A53.78,53.78,0,0,0,203.94,76.16ZM204,112a44.05,44.05,0,0,1-44,44H112a44.05,44.05,0,0,1-44-44v-8a45.76,45.76,0,0,1,7.71-24.89,4,4,0,0,0,.53-3.84,47.82,47.82,0,0,1,2.1-39.21,47.8,47.8,0,0,1,38.12,22.1A4,4,0,0,0,119.83,60h32.34a4,4,0,0,0,3.37-1.84,47.8,47.8,0,0,1,38.12-22.1,47.82,47.82,0,0,1,2.1,39.21,4,4,0,0,0,.53,3.83A45.85,45.85,0,0,1,204,104Z`}))]]),T=new Map([[`bold`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M87.5,151.52l64-64a12,12,0,0,1,17,17l-64,64a12,12,0,0,1-17-17Zm131-114a60.08,60.08,0,0,0-84.87,0L103.51,67.61a12,12,0,0,0,17,17l30.07-30.06a36,36,0,0,1,50.93,50.92L171.4,135.52a12,12,0,1,0,17,17l30.08-30.06A60.09,60.09,0,0,0,218.45,37.55ZM135.52,171.4l-30.07,30.08a36,36,0,0,1-50.92-50.93l30.06-30.07a12,12,0,0,0-17-17L37.55,133.58a60,60,0,0,0,84.88,84.87l30.06-30.07a12,12,0,0,0-17-17Z`}))],[`duotone`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M209.94,113.94l-96,96a48,48,0,0,1-67.88-67.88l96-96a48,48,0,0,1,67.88,67.88Z`,opacity:`0.2`}),_.createElement(`path`,{d:`M165.66,90.34a8,8,0,0,1,0,11.32l-64,64a8,8,0,0,1-11.32-11.32l64-64A8,8,0,0,1,165.66,90.34ZM215.6,40.4a56,56,0,0,0-79.2,0L106.34,70.45a8,8,0,0,0,11.32,11.32l30.06-30a40,40,0,0,1,56.57,56.56l-30.07,30.06a8,8,0,0,0,11.31,11.32L215.6,119.6a56,56,0,0,0,0-79.2ZM138.34,174.22l-30.06,30.06a40,40,0,1,1-56.56-56.57l30.05-30.05a8,8,0,0,0-11.32-11.32L40.4,136.4a56,56,0,0,0,79.2,79.2l30.06-30.07a8,8,0,0,0-11.32-11.31Z`}))],[`fill`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM144.56,173.66l-21.45,21.45a44,44,0,0,1-62.22-62.22l21.45-21.46a8,8,0,0,1,11.32,11.31L72.2,144.2a28,28,0,0,0,39.6,39.6l21.45-21.46a8,8,0,0,1,11.31,11.32Zm-34.9-16a8,8,0,0,1-11.32-11.32l48-48a8,8,0,0,1,11.32,11.32Zm85.45-34.55-21.45,21.45a8,8,0,0,1-11.32-11.31L183.8,111.8a28,28,0,0,0-39.6-39.6L122.74,93.66a8,8,0,0,1-11.31-11.32l21.46-21.45a44,44,0,0,1,62.22,62.22Z`}))],[`light`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M164.25,91.75a6,6,0,0,1,0,8.49l-64,64a6,6,0,0,1-8.49-8.48l64-64A6,6,0,0,1,164.25,91.75ZM214.2,41.8a54.07,54.07,0,0,0-76.38,0L107.75,71.85a6,6,0,0,0,8.49,8.49l30.07-30.06a42,42,0,0,1,59.41,59.41l-30.08,30.07a6,6,0,1,0,8.49,8.49l30.07-30.07A54,54,0,0,0,214.2,41.8ZM139.76,175.64l-30.07,30.08a42,42,0,0,1-59.41-59.41l30.06-30.07a6,6,0,0,0-8.49-8.49l-30,30.07a54,54,0,0,0,76.38,76.39l30.07-30.08a6,6,0,0,0-8.49-8.49Z`}))],[`regular`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M165.66,90.34a8,8,0,0,1,0,11.32l-64,64a8,8,0,0,1-11.32-11.32l64-64A8,8,0,0,1,165.66,90.34ZM215.6,40.4a56,56,0,0,0-79.2,0L106.34,70.45a8,8,0,0,0,11.32,11.32l30.06-30a40,40,0,0,1,56.57,56.56l-30.07,30.06a8,8,0,0,0,11.31,11.32L215.6,119.6a56,56,0,0,0,0-79.2ZM138.34,174.22l-30.06,30.06a40,40,0,1,1-56.56-56.57l30.05-30.05a8,8,0,0,0-11.32-11.32L40.4,136.4a56,56,0,0,0,79.2,79.2l30.06-30.07a8,8,0,0,0-11.32-11.31Z`}))],[`thin`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M162.84,93.16a4,4,0,0,1,0,5.66l-64,64a4,4,0,0,1-5.66-5.66l64-64A4,4,0,0,1,162.84,93.16Zm49.95-49.95a52.07,52.07,0,0,0-73.56,0L109.17,73.27a4,4,0,0,0,5.65,5.66l30.07-30.06a44,44,0,0,1,62.24,62.24l-30.07,30.06a4,4,0,0,0,5.66,5.66l30.07-30.06A52.07,52.07,0,0,0,212.79,43.21ZM141.17,177.06l-30.06,30.07a44,44,0,0,1-62.24-62.24l30.06-30.06a4,4,0,0,0-5.66-5.66L43.21,139.23a52,52,0,0,0,73.56,73.56l30.06-30.07a4,4,0,1,0-5.66-5.66Z`}))]]),E=new Map([[`bold`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M234.49,111.07,90.41,22.94A20,20,0,0,0,60,39.87V216.13a20,20,0,0,0,30.41,16.93l144.08-88.13a19.82,19.82,0,0,0,0-33.86ZM84,208.85V47.15L216.16,128Z`}))],[`duotone`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M228.23,134.69,84.15,222.81A8,8,0,0,1,72,216.12V39.88a8,8,0,0,1,12.15-6.69l144.08,88.12A7.82,7.82,0,0,1,228.23,134.69Z`,opacity:`0.2`}),_.createElement(`path`,{d:`M232.4,114.49,88.32,26.35a16,16,0,0,0-16.2-.3A15.86,15.86,0,0,0,64,39.87V216.13A15.94,15.94,0,0,0,80,232a16.07,16.07,0,0,0,8.36-2.35L232.4,141.51a15.81,15.81,0,0,0,0-27ZM80,215.94V40l143.83,88Z`}))],[`fill`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z`}))],[`light`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M231.36,116.19,87.28,28.06a14,14,0,0,0-14.18-.27A13.69,13.69,0,0,0,66,39.87V216.13a13.69,13.69,0,0,0,7.1,12.08,14,14,0,0,0,14.18-.27l144.08-88.13a13.82,13.82,0,0,0,0-23.62Zm-6.26,13.38L81,217.7a2,2,0,0,1-2.06,0,1.78,1.78,0,0,1-1-1.61V39.87a1.78,1.78,0,0,1,1-1.61A2.06,2.06,0,0,1,80,38a2,2,0,0,1,1,.31L225.1,126.43a1.82,1.82,0,0,1,0,3.14Z`}))],[`regular`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M232.4,114.49,88.32,26.35a16,16,0,0,0-16.2-.3A15.86,15.86,0,0,0,64,39.87V216.13A15.94,15.94,0,0,0,80,232a16.07,16.07,0,0,0,8.36-2.35L232.4,141.51a15.81,15.81,0,0,0,0-27ZM80,215.94V40l143.83,88Z`}))],[`thin`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M230.32,117.9,86.24,29.79a11.91,11.91,0,0,0-12.17-.23A11.71,11.71,0,0,0,68,39.89V216.11a11.71,11.71,0,0,0,6.07,10.33,11.91,11.91,0,0,0,12.17-.23L230.32,138.1a11.82,11.82,0,0,0,0-20.2Zm-4.18,13.37L82.06,219.39a4,4,0,0,1-4.07.07,3.77,3.77,0,0,1-2-3.35V39.89a3.77,3.77,0,0,1,2-3.35,4,4,0,0,1,4.07.07l144.08,88.12a3.8,3.8,0,0,1,0,6.54Z`}))]]),D=new Map([[`bold`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M144,180a16,16,0,1,1-16-16A16,16,0,0,1,144,180Zm92-52A108,108,0,1,1,128,20,108.12,108.12,0,0,1,236,128Zm-24,0a84,84,0,1,0-84,84A84.09,84.09,0,0,0,212,128ZM128,64c-24.26,0-44,17.94-44,40v4a12,12,0,0,0,24,0v-4c0-8.82,9-16,20-16s20,7.18,20,16-9,16-20,16a12,12,0,0,0-12,12v8a12,12,0,0,0,23.73,2.56C158.31,137.88,172,122.37,172,104,172,81.94,152.26,64,128,64Z`}))],[`duotone`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z`,opacity:`0.2`}),_.createElement(`path`,{d:`M140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180ZM128,72c-22.06,0-40,16.15-40,36v4a8,8,0,0,0,16,0v-4c0-11,10.77-20,24-20s24,9,24,20-10.77,20-24,20a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-.72c18.24-3.35,32-17.9,32-35.28C168,88.15,150.06,72,128,72Zm104,56A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z`}))],[`fill`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,168a12,12,0,1,1,12-12A12,12,0,0,1,128,192Zm8-48.72V144a8,8,0,0,1-16,0v-8a8,8,0,0,1,8-8c13.23,0,24-9,24-20s-10.77-20-24-20-24,9-24,20v4a8,8,0,0,1-16,0v-4c0-19.85,17.94-36,40-36s40,16.15,40,36C168,125.38,154.24,139.93,136,143.28Z`}))],[`light`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M138,180a10,10,0,1,1-10-10A10,10,0,0,1,138,180ZM128,74c-21,0-38,15.25-38,34v4a6,6,0,0,0,12,0v-4c0-12.13,11.66-22,26-22s26,9.87,26,22-11.66,22-26,22a6,6,0,0,0-6,6v8a6,6,0,0,0,12,0v-2.42c18.11-2.58,32-16.66,32-33.58C166,89.25,149,74,128,74Zm102,54A102,102,0,1,1,128,26,102.12,102.12,0,0,1,230,128Zm-12,0a90,90,0,1,0-90,90A90.1,90.1,0,0,0,218,128Z`}))],[`regular`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180ZM128,72c-22.06,0-40,16.15-40,36v4a8,8,0,0,0,16,0v-4c0-11,10.77-20,24-20s24,9,24,20-10.77,20-24,20a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-.72c18.24-3.35,32-17.9,32-35.28C168,88.15,150.06,72,128,72Zm104,56A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z`}))],[`thin`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M136,180a8,8,0,1,1-8-8A8,8,0,0,1,136,180ZM128,76c-19.85,0-36,14.36-36,32v4a4,4,0,0,0,8,0v-4c0-13.23,12.56-24,28-24s28,10.77,28,24-12.56,24-28,24a4,4,0,0,0-4,4v8a4,4,0,0,0,8,0v-4.2c18-1.77,32-15.36,32-31.8C164,90.36,147.85,76,128,76Zm100,52A100,100,0,1,1,128,28,100.11,100.11,0,0,1,228,128Zm-8,0a92,92,0,1,0-92,92A92.1,92.1,0,0,0,220,128Z`}))]]),O=new Map([[`bold`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z`}))],[`duotone`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M216,56V200a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V56A16,16,0,0,1,56,40H200A16,16,0,0,1,216,56Z`,opacity:`0.2`}),_.createElement(`path`,{d:`M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z`}))],[`fill`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM181.66,170.34a8,8,0,0,1-11.32,11.32L128,139.31,85.66,181.66a8,8,0,0,1-11.32-11.32L116.69,128,74.34,85.66A8,8,0,0,1,85.66,74.34L128,116.69l42.34-42.35a8,8,0,0,1,11.32,11.32L139.31,128Z`}))],[`light`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M204.24,195.76a6,6,0,1,1-8.48,8.48L128,136.49,60.24,204.24a6,6,0,0,1-8.48-8.48L119.51,128,51.76,60.24a6,6,0,0,1,8.48-8.48L128,119.51l67.76-67.75a6,6,0,0,1,8.48,8.48L136.49,128Z`}))],[`regular`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z`}))],[`thin`,_.createElement(_.Fragment,null,_.createElement(`path`,{d:`M202.83,197.17a4,4,0,0,1-5.66,5.66L128,133.66,58.83,202.83a4,4,0,0,1-5.66-5.66L122.34,128,53.17,58.83a4,4,0,0,1,5.66-5.66L128,122.34l69.17-69.17a4,4,0,1,1,5.66,5.66L133.66,128Z`}))]]),k=(0,_.createContext)({color:`currentColor`,size:`1em`,weight:`regular`,mirrored:!1}),A=_.forwardRef((e,t)=>{let{alt:n,color:r,size:i,weight:a,mirrored:o,children:s,weights:c,...l}=e,{color:u=`currentColor`,size:d,weight:f=`regular`,mirrored:p=!1,...m}=_.useContext(k);return _.createElement(`svg`,{ref:t,xmlns:`http://www.w3.org/2000/svg`,width:i??d,height:i??d,fill:r??u,viewBox:`0 0 256 256`,transform:o||p?`scale(-1, 1)`:void 0,...m,...l},!!n&&_.createElement(`title`,null,n),s,c.get(a??f))});A.displayName=`IconBase`;var j=_.forwardRef((e,t)=>_.createElement(A,{ref:t,...e,weights:v}));j.displayName=`ArrowCounterClockwiseIcon`;var M=_.forwardRef((e,t)=>_.createElement(A,{ref:t,...e,weights:y}));M.displayName=`CaretDownIcon`;var N=_.forwardRef((e,t)=>_.createElement(A,{ref:t,...e,weights:b}));N.displayName=`CheckIcon`;var P=_.forwardRef((e,t)=>_.createElement(A,{ref:t,...e,weights:x}));P.displayName=`CodeIcon`;var F=_.forwardRef((e,t)=>_.createElement(A,{ref:t,...e,weights:S}));F.displayName=`CopySimpleIcon`;var I=_.forwardRef((e,t)=>_.createElement(A,{ref:t,...e,weights:C}));I.displayName=`FloppyDiskIcon`;var L=_.forwardRef((e,t)=>_.createElement(A,{ref:t,...e,weights:w}));L.displayName=`GithubLogoIcon`;var R=_.forwardRef((e,t)=>_.createElement(A,{ref:t,...e,weights:T}));R.displayName=`LinkSimpleIcon`;var z=_.forwardRef((e,t)=>_.createElement(A,{ref:t,...e,weights:E}));z.displayName=`PlayIcon`;var ee=_.forwardRef((e,t)=>_.createElement(A,{ref:t,...e,weights:D}));ee.displayName=`QuestionIcon`;var B=_.forwardRef((e,t)=>_.createElement(A,{ref:t,...e,weights:O}));B.displayName=`XIcon`;function te(){return typeof window<`u`}function ne(e){return H(e)?(e.nodeName||``).toLowerCase():`#document`}function V(e){var t;return(e==null||(t=e.ownerDocument)==null?void 0:t.defaultView)||window}function re(e){return((H(e)?e.ownerDocument:e.document)||window.document)?.documentElement}function H(e){return te()?e instanceof Node||e instanceof V(e).Node:!1}function U(e){return te()?e instanceof Element||e instanceof V(e).Element:!1}function ie(e){return te()?e instanceof HTMLElement||e instanceof V(e).HTMLElement:!1}function W(e){return!te()||typeof ShadowRoot>`u`?!1:e instanceof ShadowRoot||e instanceof V(e).ShadowRoot}function ae(e){let{overflow:t,overflowX:n,overflowY:r,display:i}=me(e);return/auto|scroll|overlay|hidden|clip/.test(t+r+n)&&i!==`inline`&&i!==`contents`}function G(e){return/^(table|td|th)$/.test(ne(e))}function K(e){try{if(e.matches(`:popover-open`))return!0}catch{}try{return e.matches(`:modal`)}catch{return!1}}var oe=/transform|translate|scale|rotate|perspective|filter/,se=/paint|layout|strict|content/,ce=e=>!!e&&e!==`none`,le;function ue(e){let t=U(e)?me(e):e;return ce(t.transform)||ce(t.translate)||ce(t.scale)||ce(t.rotate)||ce(t.perspective)||!fe()&&(ce(t.backdropFilter)||ce(t.filter))||oe.test(t.willChange||``)||se.test(t.contain||``)}function de(e){let t=ge(e);for(;ie(t)&&!pe(t);){if(ue(t))return t;if(K(t))return null;t=ge(t)}return null}function fe(){return le??=typeof CSS<`u`&&CSS.supports&&CSS.supports(`-webkit-backdrop-filter`,`none`),le}function pe(e){return/^(html|body|#document)$/.test(ne(e))}function me(e){return V(e).getComputedStyle(e)}function he(e){return U(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function ge(e){if(ne(e)===`html`)return e;let t=e.assignedSlot||e.parentNode||W(e)&&e.host||re(e);return W(t)?t.host:t}function _e(e){let t=ge(e);return pe(t)?(e.ownerDocument||e).body:ie(t)&&ae(t)?t:_e(t)}function ve(e,t,n){t===void 0&&(t=[]),n===void 0&&(n=!0);let r=_e(e),i=r===e.ownerDocument?.body,a=V(r);if(i){let e=ye(a);return t.concat(a,a.visualViewport||[],ae(r)?r:[],e&&n?ve(e):[])}return t.concat(r,ve(r,[],n))}function ye(e){return e.parent&&Object.getPrototypeOf(e.parent)?e.frameElement:null}var be={..._},xe={};function Se(e,t){let n=_.useRef(xe);return n.current===xe&&(n.current=e(t)),n}var Ce=be.useInsertionEffect,we=Ce&&Ce!==be.useLayoutEffect?Ce:e=>e();function q(e){let t=Se(Te).current;return t.next=e,we(t.effect),t.trampoline}function Te(){let e={next:void 0,callback:Ee,trampoline:(...t)=>e.callback?.(...t),effect:()=>{e.callback=e.next}};return e}function Ee(){}var J=typeof document<`u`?_.useLayoutEffect:()=>{};function De(e,t){if(e&&!t)return e;if(!e&&t)return t;if(e||t)return{...e,...t}}var Oe={};function ke(e,t,n,r,i){if(!n&&!r&&!i&&!e)return je(t);let a=je(e);return t&&(a=Me(a,t)),n&&(a=Me(a,n)),r&&(a=Me(a,r)),i&&(a=Me(a,i)),a}function Ae(e){if(e.length===0)return Oe;if(e.length===1)return je(e[0]);let t=je(e[0]);for(let n=1;n<e.length;n+=1)t=Me(t,e[n]);return t}function je(e){return Ie(e)?{...Le(e,Oe)}:Ne(e)}function Me(e,t){return Ie(t)?Le(t,e):Pe(e,t)}function Ne(e){let t={...e};for(let e in t){let n=t[e];Fe(e,n)&&(t[e]=ze(n))}return t}function Pe(e,t){if(!t)return e;for(let n in t){let r=t[n];switch(n){case`style`:e[n]=De(e.style,r);break;case`className`:e[n]=Ve(e.className,r);break;default:e[n]=Fe(n,r)?Re(e[n],r):r}}return e}function Fe(e,t){let n=e.charCodeAt(0),r=e.charCodeAt(1),i=e.charCodeAt(2);return n===111&&r===110&&i>=65&&i<=90&&(typeof t==`function`||t===void 0)}function Ie(e){return typeof e==`function`}function Le(e,t){return Ie(e)?e(t):e??Oe}function Re(e,t){return t?e?(...n)=>{let r=n[0];if(He(r)){let i=r;Be(i);let a=t(...n);return i.baseUIHandlerPrevented||e?.(...n),a}let i=t(...n);return e?.(...n),i}:ze(t):e}function ze(e){return e&&((...t)=>{let n=t[0];return He(n)&&Be(n),e(...t)})}function Be(e){return e.preventBaseUIHandler=()=>{e.baseUIHandlerPrevented=!0},e}function Ve(e,t){return t?e?t+` `+e:t:e}function He(e){return typeof e==`object`&&!!e&&`nativeEvent`in e}function Ue(e,t){return function(n,...r){let i=new URL(e);return i.searchParams.set(`code`,n.toString()),r.forEach(e=>i.searchParams.append(`args[]`,e)),`${t} error #${n}; visit ${i} for the full message.`}}var We=Ue(`https://base-ui.com/production-error`,`Base UI`),Ge=_.createContext(void 0);function Ke(e=!1){let t=_.useContext(Ge);if(t===void 0&&!e)throw Error(We(16));return t}function qe(e){let{focusableWhenDisabled:t,disabled:n,composite:r=!1,tabIndex:i=0,isNativeButton:a}=e,o=r&&t!==!1,s=r&&t===!1;return{props:_.useMemo(()=>{let e={onKeyDown(e){n&&t&&e.key!==`Tab`&&e.preventDefault()}};return r||(e.tabIndex=i,!a&&n&&(e.tabIndex=t?i:-1)),(a&&(t||o)||!a&&n)&&(e[`aria-disabled`]=n),a&&(!t||s)&&(e.disabled=n),e},[r,n,t,o,s,a,i])}}function Je(e){return e?.ownerDocument||document}function Ye(e,t,{detail:n=0}={}){e.dispatchEvent(new(V(e)).PointerEvent(`click`,{bubbles:!0,cancelable:!0,composed:!0,detail:n,shiftKey:t.shiftKey,ctrlKey:t.ctrlKey,altKey:t.altKey,metaKey:t.metaKey}))}function Xe(e={}){let{disabled:t=!1,focusableWhenDisabled:n,tabIndex:r=0,native:i=!0,composite:a}=e,o=_.useRef(null),s=Ke(!0),c=a??s!==void 0,{props:l}=qe({focusableWhenDisabled:n,disabled:t,composite:c,tabIndex:r,isNativeButton:i}),u=_.useCallback(()=>{let e=o.current;Ze(e)&&c&&t&&l.disabled===void 0&&e.disabled&&(e.disabled=!1)},[t,l.disabled,c]);return J(u,[u]),{getButtonProps:_.useCallback((e={})=>{let{onClick:n,onMouseDown:r,onKeyUp:a,onKeyDown:o,onPointerDown:s,...u}=e;return ke({onClick(e){if(t){e.preventDefault();return}n?.(e)},onMouseDown(e){t||r?.(e)},onKeyDown(e){if(t||(Be(e),o?.(e),e.baseUIHandlerPrevented))return;let n=e.target===e.currentTarget,r=e.currentTarget,a=Ze(r),s=!i&&Qe(r),l=n&&(i?a:!s),u=e.key===`Enter`,d=e.key===` `,f=r.getAttribute(`role`),p=f?.startsWith(`menuitem`)||f===`option`||f===`gridcell`;if(n&&c&&d){if(e.defaultPrevented&&p)return;e.preventDefault(),(!i||a)&&(e.preventBaseUIHandler(),Ye(r,e));return}if(!l||i||!d&&!u){n&&s&&d&&e.preventDefault();return}e.defaultPrevented||(e.preventDefault(),u&&(e.preventBaseUIHandler(),Ye(r,e)))},onKeyUp(e){if(!t){if(Be(e),a?.(e),e.target===e.currentTarget&&i&&c&&Ze(e.currentTarget)&&e.key===` `){e.preventDefault();return}e.baseUIHandlerPrevented||e.target===e.currentTarget&&!i&&!c&&!e.defaultPrevented&&e.key===` `&&(e.preventBaseUIHandler(),Ye(e.currentTarget,e))}},onPointerDown(e){if(t){e.preventDefault();return}s?.(e)}},i?{type:`button`}:{role:`button`},l,u)},[t,l,c,i]),buttonRef:q(e=>{o.current=e,u()})}}function Ze(e){return ie(e)&&e.tagName===`BUTTON`}function Qe(e){return ie(e)&&e.tagName===`A`&&!!e.href}function $e(e,t,n,r){let i=Se(tt).current;return nt(i,e,t,n,r)&&it(i,[e,t,n,r]),i.callback}function et(e){let t=Se(tt).current;return rt(t,e)&&it(t,e),t.callback}function tt(){return{callback:null,cleanup:null,refs:[]}}function nt(e,t,n,r,i){return e.refs[0]!==t||e.refs[1]!==n||e.refs[2]!==r||e.refs[3]!==i}function rt(e,t){return e.refs.length!==t.length||e.refs.some((e,n)=>e!==t[n])}function it(e,t){if(e.refs=t,t.every(e=>e==null)){e.callback=null;return}e.callback=n=>{if(e.cleanup&&=(e.cleanup(),null),n!=null){let r=Array(t.length).fill(null);for(let e=0;e<t.length;e+=1){let i=t[e];if(i!=null)switch(typeof i){case`function`:{let t=i(n);typeof t==`function`&&(r[e]=t);break}case`object`:i.current=n}}e.cleanup=()=>{for(let e=0;e<t.length;e+=1){let n=t[e];if(n!=null)switch(typeof n){case`function`:{let t=r[e];typeof t==`function`?t():n(null);break}case`object`:n.current=null}}}}}}var at=19;function ot(e){return at>=e}function st(e){if(!_.isValidElement(e))return null;let t=e,n=t.props;return(ot(19)?n?.ref:t.ref)??null}function ct(){}var lt=Object.freeze([]),ut=Object.freeze({});function dt(e,t){let n={};for(let r in e){let i=e[r];if(t?.hasOwnProperty(r)){let e=t[r](i);e!=null&&Object.assign(n,e);continue}i===!0?n[`data-${r.toLowerCase()}`]=``:i&&(n[`data-${r.toLowerCase()}`]=i.toString())}return n}function ft(e,t){return typeof e==`function`?e(t):e}function pt(e,t){return typeof e==`function`?e(t):e}function mt(e,t,n={}){let r=t.render;n.enabled!==!1&&(r=vt(r));let i=ht(t,n,r);if(n.enabled===!1)return null;let a=n.state??ut;return yt(e,r,i,a)}function ht(e,t,n){let{className:r,style:i}=e,{state:a=ut,ref:o,props:s,stateAttributesMapping:c,enabled:l=!0}=t,u=l?ft(r,a):void 0,d=l?pt(i,a):void 0,f=l?dt(a,c):ut,p=l&&s?gt(s):void 0,m=l?De(f,p)??{}:ut;return typeof document<`u`&&(l?m.ref=Array.isArray(o)?et([m.ref,st(n),...o]):$e(m.ref,st(n),o):$e(null,null)),l?(u!==void 0&&(m.className=Ve(m.className,u)),d!==void 0&&(m.style=De(m.style,d)),m):ut}function gt(e){return Array.isArray(e)?Ae(e):ke(void 0,e)}var _t=Symbol.for(`react.lazy`);function vt(e){if(e?.$$typeof!==_t)return e;let t=_.Children.toArray(e)[0];return _.isValidElement(t)?t:e}function yt(e,t,n,r){if(t){if(typeof t==`function`)return t(n,r);let e=ke(n,t.props);return e.ref=n.ref,_.cloneElement(t,e)}if(e&&typeof e==`string`)return bt(e,n);throw Error(We(8))}function bt(e,t){return e===`button`?(0,_.createElement)(`button`,{type:`button`,...t,key:t.key}):e===`img`?(0,_.createElement)(`img`,{alt:``,...t,key:t.key}):_.createElement(e,t)}var xt=_.forwardRef(function(e,t){let{render:n,className:r,disabled:i=!1,focusableWhenDisabled:a=!1,nativeButton:o=!0,style:s,...c}=e,{getButtonProps:l,buttonRef:u}=Xe({disabled:i,focusableWhenDisabled:a,native:o});return mt(`button`,e,{state:{disabled:i},ref:[t,u],props:[c,l]})}),St=g();function Ct(e){var t,n,r=``;if(typeof e==`string`||typeof e==`number`)r+=e;else if(typeof e==`object`){if(Array.isArray(e)){var i=e.length;for(t=0;t<i;t++)e[t]&&(n=Ct(e[t]))&&(r&&(r+=` `),r+=n)}else for(n in e)e[n]&&(r&&(r+=` `),r+=n)}return r}function wt(){for(var e,t,n=0,r=``,i=arguments.length;n<i;n++)(e=arguments[n])&&(t=Ct(e))&&(r&&(r+=` `),r+=t);return r}var Tt=e=>typeof e==`boolean`?`${e}`:e===0?`0`:e,Et=wt,Dt=(e,t)=>n=>{if(t?.variants==null)return Et(e,n?.class,n?.className);let{variants:r,defaultVariants:i}=t,a=Object.keys(r).map(e=>{let t=n?.[e],a=i?.[e];if(t===null)return null;let o=Tt(t)||Tt(a);return r[e][o]}),o=n&&Object.entries(n).reduce((e,t)=>{let[n,r]=t;return r===void 0||(e[n]=r),e},{});return Et(e,a,t?.compoundVariants?.reduce((e,t)=>{let{class:n,className:r,...a}=t;return Object.entries(a).every(e=>{let[t,n]=e;return Array.isArray(n)?n.includes({...i,...o}[t]):{...i,...o}[t]===n})?[...e,n,r]:e},[]),n?.class,n?.className)},Ot=(e,t)=>{let n=Array(e.length+t.length);for(let t=0;t<e.length;t++)n[t]=e[t];for(let r=0;r<t.length;r++)n[e.length+r]=t[r];return n},kt=(e,t)=>({classGroupId:e,validator:t}),At=(e=new Map,t=null,n)=>({nextPart:e,validators:t,classGroupId:n}),jt=`-`,Mt=[],Nt=`arbitrary..`,Pt=e=>{let t=Lt(e),{conflictingClassGroups:n,conflictingClassGroupModifiers:r}=e;return{getClassGroupId:e=>{if(e.startsWith(`[`)&&e.endsWith(`]`))return It(e);let n=e.split(jt);return Ft(n,+(n[0]===``&&n.length>1),t)},getConflictingClassGroupIds:(e,t)=>{if(t){let t=r[e],i=n[e];return t?i?Ot(i,t):t:i||Mt}return n[e]||Mt}}},Ft=(e,t,n)=>{if(e.length-t===0)return n.classGroupId;let r=e[t],i=n.nextPart.get(r);if(i){let n=Ft(e,t+1,i);if(n)return n}let a=n.validators;if(a===null)return;let o=t===0?e.join(jt):e.slice(t).join(jt),s=a.length;for(let e=0;e<s;e++){let t=a[e];if(t.validator(o))return t.classGroupId}},It=e=>e.slice(1,-1).indexOf(`:`)===-1?void 0:(()=>{let t=e.slice(1,-1),n=t.indexOf(`:`),r=t.slice(0,n);return r?Nt+r:void 0})(),Lt=e=>{let{theme:t,classGroups:n}=e;return Rt(n,t)},Rt=(e,t)=>{let n=At();for(let r in e){let i=e[r];zt(i,n,r,t)}return n},zt=(e,t,n,r)=>{let i=e.length;for(let a=0;a<i;a++){let i=e[a];Bt(i,t,n,r)}},Bt=(e,t,n,r)=>{if(typeof e==`string`){Vt(e,t,n);return}if(typeof e==`function`){Ht(e,t,n,r);return}Ut(e,t,n,r)},Vt=(e,t,n)=>{let r=e===``?t:Wt(t,e);r.classGroupId=n},Ht=(e,t,n,r)=>{if(Gt(e)){zt(e(r),t,n,r);return}t.validators===null&&(t.validators=[]),t.validators.push(kt(n,e))},Ut=(e,t,n,r)=>{let i=Object.entries(e),a=i.length;for(let e=0;e<a;e++){let[a,o]=i[e];zt(o,Wt(t,a),n,r)}},Wt=(e,t)=>{let n=e,r=t.split(jt),i=r.length;for(let e=0;e<i;e++){let t=r[e],i=n.nextPart.get(t);i||(i=At(),n.nextPart.set(t,i)),n=i}return n},Gt=e=>`isThemeGetter`in e&&e.isThemeGetter===!0,Kt=e=>{if(e<1)return{get:()=>void 0,set:()=>{}};let t=0,n=Object.create(null),r=Object.create(null),i=(i,a)=>{n[i]=a,t++,t>e&&(t=0,r=n,n=Object.create(null))};return{get(e){let t=n[e];if(t!==void 0)return t;if((t=r[e])!==void 0)return i(e,t),t},set(e,t){e in n?n[e]=t:i(e,t)}}},qt=`!`,Jt=`:`,Yt=[],Xt=(e,t,n,r,i)=>({modifiers:e,hasImportantModifier:t,baseClassName:n,maybePostfixModifierPosition:r,isExternal:i}),Zt=e=>{let{prefix:t,experimentalParseClassName:n}=e,r=e=>{let t=[],n=0,r=0,i=0,a,o=e.length;for(let s=0;s<o;s++){let o=e[s];if(n===0&&r===0){if(o===Jt){t.push(e.slice(i,s)),i=s+1;continue}if(o===`/`){a=s;continue}}o===`[`?n++:o===`]`?n--:o===`(`?r++:o===`)`&&r--}let s=t.length===0?e:e.slice(i),c=s,l=!1;s.endsWith(qt)?(c=s.slice(0,-1),l=!0):s.startsWith(qt)&&(c=s.slice(1),l=!0);let u=a&&a>i?a-i:void 0;return Xt(t,l,c,u)};if(t){let e=t+Jt,n=r;r=t=>t.startsWith(e)?n(t.slice(e.length)):Xt(Yt,!1,t,void 0,!0)}if(n){let e=r;r=t=>n({className:t,parseClassName:e})}return r},Qt=e=>{let t=new Map;return e.orderSensitiveModifiers.forEach((e,n)=>{t.set(e,1e6+n)}),e=>{let n=[],r=[];for(let i=0;i<e.length;i++){let a=e[i],o=a[0]===`[`,s=t.has(a);o||s?(r.length>0&&(r.sort(),n.push(...r),r=[]),n.push(a)):r.push(a)}return r.length>0&&(r.sort(),n.push(...r)),n}},$t=e=>({cache:Kt(e.cacheSize),parseClassName:Zt(e),sortModifiers:Qt(e),postfixLookupClassGroupIds:en(e),...Pt(e)}),en=e=>{let t=Object.create(null),n=e.postfixLookupClassGroups;if(n)for(let e=0;e<n.length;e++)t[n[e]]=!0;return t},tn=/\s+/,nn=(e,t)=>{let{parseClassName:n,getClassGroupId:r,getConflictingClassGroupIds:i,sortModifiers:a,postfixLookupClassGroupIds:o}=t,s=[],c=e.trim().split(tn),l=``;for(let e=c.length-1;e>=0;--e){let t=c[e],{isExternal:u,modifiers:d,hasImportantModifier:f,baseClassName:p,maybePostfixModifierPosition:m}=n(t);if(u){l=t+(l.length>0?` `+l:l);continue}let h=!!m,g;if(h){g=r(p.substring(0,m));let e=g&&o[g]?r(p):void 0;e&&e!==g&&(g=e,h=!1)}else g=r(p);if(!g){if(!h){l=t+(l.length>0?` `+l:l);continue}if(g=r(p),!g){l=t+(l.length>0?` `+l:l);continue}h=!1}let _=d.length===0?``:d.length===1?d[0]:a(d).join(`:`),v=f?_+qt:_,y=v+g;if(s.indexOf(y)>-1)continue;s.push(y);let b=i(g,h);for(let e=0;e<b.length;++e){let t=b[e];s.push(v+t)}l=t+(l.length>0?` `+l:l)}return l},rn=(...e)=>{let t=0,n,r,i=``;for(;t<e.length;)(n=e[t++])&&(r=an(n))&&(i&&(i+=` `),i+=r);return i},an=e=>{if(typeof e==`string`)return e;let t,n=``;for(let r=0;r<e.length;r++)e[r]&&(t=an(e[r]))&&(n&&(n+=` `),n+=t);return n},on=(e,...t)=>{let n,r,i,a,o=o=>(n=$t(t.reduce((e,t)=>t(e),e())),r=n.cache.get,i=n.cache.set,a=s,s(o)),s=e=>{let t=r(e);if(t)return t;let a=nn(e,n);return i(e,a),a};return a=o,(...e)=>a(rn(...e))},sn=[],cn=e=>{let t=t=>t[e]||sn;return t.isThemeGetter=!0,t.themeKey=e,t},ln=/^\[(?:(\w[\w-]*):)?(.+)\]$/i,un=/^\((?:(\w[\w-]*):)?(.+)\)$/i,dn=/^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/,fn=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,pn=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,mn=/^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix|color|light-dark)\(.+\)$/,hn=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,gn=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,_n=e=>dn.test(e),vn=e=>!!e&&!Number.isNaN(Number(e)),yn=e=>!!e&&Number.isInteger(Number(e)),bn=e=>e.endsWith(`%`)&&vn(e.slice(0,-1)),xn=e=>fn.test(e),Sn=()=>!0,Cn=e=>pn.test(e)&&!mn.test(e),wn=()=>!1,Tn=e=>hn.test(e),En=e=>gn.test(e),Dn=e=>!Y(e)&&!X(e),On=e=>e.startsWith(`@container`)&&(e[10]===`/`&&e[11]!==void 0||e[11]===`s`&&e[16]!==void 0&&e.startsWith(`-size/`,10)||e[11]===`n`&&e[18]!==void 0&&e.startsWith(`-normal/`,10)),kn=e=>Wn(e,Jn,wn),Y=e=>ln.test(e),An=e=>Wn(e,Yn,Cn),jn=e=>Wn(e,Xn,vn),Mn=e=>Wn(e,Qn,Sn),Nn=e=>Wn(e,Zn,wn),Pn=e=>Wn(e,Kn,wn),Fn=e=>Wn(e,qn,En),In=e=>Wn(e,$n,Tn),X=e=>un.test(e),Ln=e=>Gn(e,Yn),Rn=e=>Gn(e,Zn),zn=e=>Gn(e,Kn),Bn=e=>Gn(e,Jn),Vn=e=>Gn(e,qn),Hn=e=>Gn(e,$n,!0),Un=e=>Gn(e,Qn,!0),Wn=(e,t,n)=>{let r=ln.exec(e);return r?r[1]?t(r[1]):n(r[2]):!1},Gn=(e,t,n=!1)=>{let r=un.exec(e);return r?r[1]?t(r[1]):n:!1},Kn=e=>e===`position`||e===`percentage`,qn=e=>e===`image`||e===`url`,Jn=e=>e===`length`||e===`size`||e===`bg-size`,Yn=e=>e===`length`,Xn=e=>e===`number`,Zn=e=>e===`family-name`,Qn=e=>e===`number`||e===`weight`,$n=e=>e===`shadow`,er=on(()=>{let e=cn(`color`),t=cn(`font`),n=cn(`text`),r=cn(`font-weight`),i=cn(`tracking`),a=cn(`leading`),o=cn(`breakpoint`),s=cn(`container`),c=cn(`spacing`),l=cn(`radius`),u=cn(`shadow`),d=cn(`inset-shadow`),f=cn(`text-shadow`),p=cn(`drop-shadow`),m=cn(`blur`),h=cn(`perspective`),g=cn(`aspect`),_=cn(`ease`),v=cn(`animate`),y=()=>[`auto`,`avoid`,`all`,`avoid-page`,`page`,`left`,`right`,`column`],b=()=>[`center`,`top`,`bottom`,`left`,`right`,`top-left`,`left-top`,`top-right`,`right-top`,`bottom-right`,`right-bottom`,`bottom-left`,`left-bottom`],x=()=>[...b(),X,Y],S=()=>[`auto`,`hidden`,`clip`,`visible`,`scroll`],C=()=>[`auto`,`contain`,`none`],w=()=>[X,Y,c],T=()=>[_n,`full`,`auto`,...w()],E=()=>[yn,`none`,`subgrid`,X,Y],D=()=>[`auto`,{span:[`full`,yn,X,Y]},yn,X,Y],O=()=>[yn,`auto`,X,Y],k=()=>[`auto`,`min`,`max`,`fr`,X,Y],A=()=>[`start`,`end`,`center`,`between`,`around`,`evenly`,`stretch`,`baseline`,`center-safe`,`end-safe`],j=()=>[`start`,`end`,`center`,`stretch`,`center-safe`,`end-safe`],M=()=>[`auto`,...w()],N=()=>[_n,`auto`,`full`,`dvw`,`dvh`,`lvw`,`lvh`,`svw`,`svh`,`min`,`max`,`fit`,...w()],P=()=>[s,_n,`screen`,`full`,`dvw`,`lvw`,`svw`,`min`,`max`,`fit`,...w()],F=()=>[_n,`screen`,`full`,`lh`,`dvh`,`lvh`,`svh`,`min`,`max`,`fit`,...w()],I=()=>[e,X,Y],L=()=>[...b(),zn,Pn,{position:[X,Y]}],R=()=>[`no-repeat`,{repeat:[``,`x`,`y`,`space`,`round`]}],z=()=>[`auto`,`cover`,`contain`,Bn,kn,{size:[X,Y]}],ee=()=>[bn,Ln,An],B=()=>[``,`none`,`full`,l,X,Y],te=()=>[``,vn,Ln,An],ne=()=>[`solid`,`dashed`,`dotted`,`double`],V=()=>[`normal`,`multiply`,`screen`,`overlay`,`darken`,`lighten`,`color-dodge`,`color-burn`,`hard-light`,`soft-light`,`difference`,`exclusion`,`hue`,`saturation`,`color`,`luminosity`],re=()=>[vn,bn,zn,Pn],H=()=>[``,`none`,m,X,Y],U=()=>[`none`,vn,X,Y],ie=()=>[`none`,vn,X,Y],W=()=>[vn,X,Y],ae=()=>[_n,`full`,...w()];return{cacheSize:500,theme:{animate:[`spin`,`ping`,`pulse`,`bounce`],aspect:[`video`],blur:[xn],breakpoint:[xn],color:[Sn],container:[xn],"drop-shadow":[xn],ease:[`in`,`out`,`in-out`],font:[Dn],"font-weight":[`thin`,`extralight`,`light`,`normal`,`medium`,`semibold`,`bold`,`extrabold`,`black`],"inset-shadow":[xn],leading:[`none`,`tight`,`snug`,`normal`,`relaxed`,`loose`],perspective:[`dramatic`,`near`,`normal`,`midrange`,`distant`,`none`],radius:[xn],shadow:[xn],spacing:[`px`,vn],text:[xn],"text-shadow":[xn],tracking:[`tighter`,`tight`,`normal`,`wide`,`wider`,`widest`]},classGroups:{aspect:[{aspect:[`auto`,`square`,_n,Y,X,g]}],container:[`container`],"container-type":[{"@container":[``,`normal`,`size`,X,Y]}],"container-named":[On],columns:[{columns:[vn,`auto`,Y,X,s]}],"break-after":[{"break-after":y()}],"break-before":[{"break-before":y()}],"break-inside":[{"break-inside":[`auto`,`avoid`,`avoid-page`,`avoid-column`]}],"box-decoration":[{"box-decoration":[`slice`,`clone`]}],box:[{box:[`border`,`content`]}],display:[`block`,`inline-block`,`inline`,`flex`,`inline-flex`,`table`,`inline-table`,`table-caption`,`table-cell`,`table-column`,`table-column-group`,`table-footer-group`,`table-header-group`,`table-row-group`,`table-row`,`flow-root`,`grid`,`inline-grid`,`contents`,`list-item`,`hidden`],sr:[`sr-only`,`not-sr-only`],float:[{float:[`right`,`left`,`none`,`start`,`end`]}],clear:[{clear:[`left`,`right`,`both`,`none`,`start`,`end`]}],isolation:[`isolate`,`isolation-auto`],"object-fit":[{object:[`contain`,`cover`,`fill`,`none`,`scale-down`]}],"object-position":[{object:x()}],overflow:[{overflow:S()}],"overflow-x":[{"overflow-x":S()}],"overflow-y":[{"overflow-y":S()}],overscroll:[{overscroll:C()}],"overscroll-x":[{"overscroll-x":C()}],"overscroll-y":[{"overscroll-y":C()}],position:[`static`,`fixed`,`absolute`,`relative`,`sticky`],inset:[{inset:T()}],"inset-x":[{"inset-x":T()}],"inset-y":[{"inset-y":T()}],start:[{"inset-s":T(),start:T()}],end:[{"inset-e":T(),end:T()}],"inset-bs":[{"inset-bs":T()}],"inset-be":[{"inset-be":T()}],top:[{top:T()}],right:[{right:T()}],bottom:[{bottom:T()}],left:[{left:T()}],visibility:[`visible`,`invisible`,`collapse`],z:[{z:[yn,`auto`,X,Y]}],basis:[{basis:[_n,`full`,`auto`,s,...w()]}],"flex-direction":[{flex:[`row`,`row-reverse`,`col`,`col-reverse`]}],"flex-wrap":[{flex:[`nowrap`,`wrap`,`wrap-reverse`]}],flex:[{flex:[vn,_n,`auto`,`initial`,`none`,Y]}],grow:[{grow:[``,vn,X,Y]}],shrink:[{shrink:[``,vn,X,Y]}],order:[{order:[yn,`first`,`last`,`none`,X,Y]}],"grid-cols":[{"grid-cols":E()}],"col-start-end":[{col:D()}],"col-start":[{"col-start":O()}],"col-end":[{"col-end":O()}],"grid-rows":[{"grid-rows":E()}],"row-start-end":[{row:D()}],"row-start":[{"row-start":O()}],"row-end":[{"row-end":O()}],"grid-flow":[{"grid-flow":[`row`,`col`,`dense`,`row-dense`,`col-dense`]}],"auto-cols":[{"auto-cols":k()}],"auto-rows":[{"auto-rows":k()}],gap:[{gap:w()}],"gap-x":[{"gap-x":w()}],"gap-y":[{"gap-y":w()}],"justify-content":[{justify:[...A(),`normal`]}],"justify-items":[{"justify-items":[...j(),`normal`]}],"justify-self":[{"justify-self":[`auto`,...j()]}],"align-content":[{content:[`normal`,...A()]}],"align-items":[{items:[...j(),{baseline:[``,`last`]}]}],"align-self":[{self:[`auto`,...j(),{baseline:[``,`last`]}]}],"place-content":[{"place-content":A()}],"place-items":[{"place-items":[...j(),`baseline`]}],"place-self":[{"place-self":[`auto`,...j()]}],p:[{p:w()}],px:[{px:w()}],py:[{py:w()}],ps:[{ps:w()}],pe:[{pe:w()}],pbs:[{pbs:w()}],pbe:[{pbe:w()}],pt:[{pt:w()}],pr:[{pr:w()}],pb:[{pb:w()}],pl:[{pl:w()}],m:[{m:M()}],mx:[{mx:M()}],my:[{my:M()}],ms:[{ms:M()}],me:[{me:M()}],mbs:[{mbs:M()}],mbe:[{mbe:M()}],mt:[{mt:M()}],mr:[{mr:M()}],mb:[{mb:M()}],ml:[{ml:M()}],"space-x":[{"space-x":w()}],"space-x-reverse":[`space-x-reverse`],"space-y":[{"space-y":w()}],"space-y-reverse":[`space-y-reverse`],size:[{size:N()}],"inline-size":[{inline:[`auto`,...P()]}],"min-inline-size":[{"min-inline":[`auto`,...P()]}],"max-inline-size":[{"max-inline":[`none`,...P()]}],"block-size":[{block:[`auto`,...F()]}],"min-block-size":[{"min-block":[`auto`,...F()]}],"max-block-size":[{"max-block":[`none`,...F()]}],w:[{w:[s,`screen`,...N()]}],"min-w":[{"min-w":[s,`screen`,`none`,...N()]}],"max-w":[{"max-w":[s,`screen`,`none`,`prose`,{screen:[o]},...N()]}],h:[{h:[`screen`,`lh`,...N()]}],"min-h":[{"min-h":[`screen`,`lh`,`none`,...N()]}],"max-h":[{"max-h":[`screen`,`lh`,`none`,...N()]}],"font-size":[{text:[`base`,n,Ln,An]}],"font-smoothing":[`antialiased`,`subpixel-antialiased`],"font-style":[`italic`,`not-italic`],"font-weight":[{font:[r,Un,Mn]}],"font-stretch":[{"font-stretch":[`ultra-condensed`,`extra-condensed`,`condensed`,`semi-condensed`,`normal`,`semi-expanded`,`expanded`,`extra-expanded`,`ultra-expanded`,bn,Y]}],"font-family":[{font:[Rn,Nn,t]}],"font-features":[{"font-features":[Y]}],"fvn-normal":[`normal-nums`],"fvn-ordinal":[`ordinal`],"fvn-slashed-zero":[`slashed-zero`],"fvn-figure":[`lining-nums`,`oldstyle-nums`],"fvn-spacing":[`proportional-nums`,`tabular-nums`],"fvn-fraction":[`diagonal-fractions`,`stacked-fractions`],tracking:[{tracking:[i,X,Y]}],"line-clamp":[{"line-clamp":[vn,`none`,X,jn]}],leading:[{leading:[`none`,a,...w()]}],"list-image":[{"list-image":[`none`,X,Y]}],"list-style-position":[{list:[`inside`,`outside`]}],"list-style-type":[{list:[`disc`,`decimal`,`none`,X,Y]}],"text-alignment":[{text:[`left`,`center`,`right`,`justify`,`start`,`end`]}],"placeholder-color":[{placeholder:I()}],"text-color":[{text:I()}],"text-decoration":[`underline`,`overline`,`line-through`,`no-underline`],"text-decoration-style":[{decoration:[...ne(),`wavy`]}],"text-decoration-thickness":[{decoration:[vn,`from-font`,`auto`,X,An]}],"text-decoration-color":[{decoration:I()}],"underline-offset":[{"underline-offset":[vn,`auto`,X,Y]}],"text-transform":[`uppercase`,`lowercase`,`capitalize`,`normal-case`],"text-overflow":[`truncate`,`text-ellipsis`,`text-clip`],"text-wrap":[{text:[`wrap`,`nowrap`,`balance`,`pretty`]}],indent:[{indent:w()}],"tab-size":[{tab:[yn,X,Y]}],"vertical-align":[{align:[`baseline`,`top`,`middle`,`bottom`,`text-top`,`text-bottom`,`sub`,`super`,X,Y]}],whitespace:[{whitespace:[`normal`,`nowrap`,`pre`,`pre-line`,`pre-wrap`,`break-spaces`]}],break:[{break:[`normal`,`words`,`all`,`keep`]}],wrap:[{wrap:[`break-word`,`anywhere`,`normal`]}],hyphens:[{hyphens:[`none`,`manual`,`auto`]}],content:[{content:[`none`,X,Y]}],"bg-attachment":[{bg:[`fixed`,`local`,`scroll`]}],"bg-clip":[{"bg-clip":[`border`,`padding`,`content`,`text`]}],"bg-origin":[{"bg-origin":[`border`,`padding`,`content`]}],"bg-position":[{bg:L()}],"bg-repeat":[{bg:R()}],"bg-size":[{bg:z()}],"bg-image":[{bg:[`none`,{linear:[{to:[`t`,`tr`,`r`,`br`,`b`,`bl`,`l`,`tl`]},yn,X,Y],radial:[``,X,Y],conic:[``,yn,X,Y]},Vn,Fn]}],"bg-color":[{bg:I()}],"gradient-from-pos":[{from:ee()}],"gradient-via-pos":[{via:ee()}],"gradient-to-pos":[{to:ee()}],"gradient-from":[{from:I()}],"gradient-via":[{via:I()}],"gradient-to":[{to:I()}],rounded:[{rounded:B()}],"rounded-s":[{"rounded-s":B()}],"rounded-e":[{"rounded-e":B()}],"rounded-t":[{"rounded-t":B()}],"rounded-r":[{"rounded-r":B()}],"rounded-b":[{"rounded-b":B()}],"rounded-l":[{"rounded-l":B()}],"rounded-ss":[{"rounded-ss":B()}],"rounded-se":[{"rounded-se":B()}],"rounded-ee":[{"rounded-ee":B()}],"rounded-es":[{"rounded-es":B()}],"rounded-tl":[{"rounded-tl":B()}],"rounded-tr":[{"rounded-tr":B()}],"rounded-br":[{"rounded-br":B()}],"rounded-bl":[{"rounded-bl":B()}],"border-w":[{border:te()}],"border-w-x":[{"border-x":te()}],"border-w-y":[{"border-y":te()}],"border-w-s":[{"border-s":te()}],"border-w-e":[{"border-e":te()}],"border-w-bs":[{"border-bs":te()}],"border-w-be":[{"border-be":te()}],"border-w-t":[{"border-t":te()}],"border-w-r":[{"border-r":te()}],"border-w-b":[{"border-b":te()}],"border-w-l":[{"border-l":te()}],"divide-x":[{"divide-x":te()}],"divide-x-reverse":[`divide-x-reverse`],"divide-y":[{"divide-y":te()}],"divide-y-reverse":[`divide-y-reverse`],"border-style":[{border:[...ne(),`hidden`,`none`]}],"divide-style":[{divide:[...ne(),`hidden`,`none`]}],"border-color":[{border:I()}],"border-color-x":[{"border-x":I()}],"border-color-y":[{"border-y":I()}],"border-color-s":[{"border-s":I()}],"border-color-e":[{"border-e":I()}],"border-color-bs":[{"border-bs":I()}],"border-color-be":[{"border-be":I()}],"border-color-t":[{"border-t":I()}],"border-color-r":[{"border-r":I()}],"border-color-b":[{"border-b":I()}],"border-color-l":[{"border-l":I()}],"divide-color":[{divide:I()}],"outline-style":[{outline:[...ne(),`none`,`hidden`]}],"outline-offset":[{"outline-offset":[vn,X,Y]}],"outline-w":[{outline:[``,vn,Ln,An]}],"outline-color":[{outline:I()}],shadow:[{shadow:[``,`inner`,`none`,u,Hn,In]}],"shadow-color":[{shadow:I()}],"inset-shadow":[{"inset-shadow":[`none`,d,Hn,In]}],"inset-shadow-color":[{"inset-shadow":I()}],"ring-w":[{ring:te()}],"ring-w-inset":[`ring-inset`],"ring-color":[{ring:I()}],"ring-offset-w":[{"ring-offset":[vn,An]}],"ring-offset-color":[{"ring-offset":I()}],"inset-ring-w":[{"inset-ring":te()}],"inset-ring-color":[{"inset-ring":I()}],"text-shadow":[{"text-shadow":[`none`,f,Hn,In]}],"text-shadow-color":[{"text-shadow":I()}],opacity:[{opacity:[vn,X,Y]}],"mix-blend":[{"mix-blend":[...V(),`plus-darker`,`plus-lighter`]}],"bg-blend":[{"bg-blend":V()}],"mask-clip":[{"mask-clip":[`border`,`padding`,`content`,`fill`,`stroke`,`view`]},`mask-no-clip`],"mask-composite":[{mask:[`add`,`subtract`,`intersect`,`exclude`]}],"mask-image-linear-pos":[{"mask-linear":[vn]}],"mask-image-linear-from-pos":[{"mask-linear-from":re()}],"mask-image-linear-to-pos":[{"mask-linear-to":re()}],"mask-image-linear-from-color":[{"mask-linear-from":I()}],"mask-image-linear-to-color":[{"mask-linear-to":I()}],"mask-image-t-from-pos":[{"mask-t-from":re()}],"mask-image-t-to-pos":[{"mask-t-to":re()}],"mask-image-t-from-color":[{"mask-t-from":I()}],"mask-image-t-to-color":[{"mask-t-to":I()}],"mask-image-r-from-pos":[{"mask-r-from":re()}],"mask-image-r-to-pos":[{"mask-r-to":re()}],"mask-image-r-from-color":[{"mask-r-from":I()}],"mask-image-r-to-color":[{"mask-r-to":I()}],"mask-image-b-from-pos":[{"mask-b-from":re()}],"mask-image-b-to-pos":[{"mask-b-to":re()}],"mask-image-b-from-color":[{"mask-b-from":I()}],"mask-image-b-to-color":[{"mask-b-to":I()}],"mask-image-l-from-pos":[{"mask-l-from":re()}],"mask-image-l-to-pos":[{"mask-l-to":re()}],"mask-image-l-from-color":[{"mask-l-from":I()}],"mask-image-l-to-color":[{"mask-l-to":I()}],"mask-image-x-from-pos":[{"mask-x-from":re()}],"mask-image-x-to-pos":[{"mask-x-to":re()}],"mask-image-x-from-color":[{"mask-x-from":I()}],"mask-image-x-to-color":[{"mask-x-to":I()}],"mask-image-y-from-pos":[{"mask-y-from":re()}],"mask-image-y-to-pos":[{"mask-y-to":re()}],"mask-image-y-from-color":[{"mask-y-from":I()}],"mask-image-y-to-color":[{"mask-y-to":I()}],"mask-image-radial":[{"mask-radial":[X,Y]}],"mask-image-radial-from-pos":[{"mask-radial-from":re()}],"mask-image-radial-to-pos":[{"mask-radial-to":re()}],"mask-image-radial-from-color":[{"mask-radial-from":I()}],"mask-image-radial-to-color":[{"mask-radial-to":I()}],"mask-image-radial-shape":[{"mask-radial":[`circle`,`ellipse`]}],"mask-image-radial-size":[{"mask-radial":[{closest:[`side`,`corner`],farthest:[`side`,`corner`]}]}],"mask-image-radial-pos":[{"mask-radial-at":b()}],"mask-image-conic-pos":[{"mask-conic":[vn]}],"mask-image-conic-from-pos":[{"mask-conic-from":re()}],"mask-image-conic-to-pos":[{"mask-conic-to":re()}],"mask-image-conic-from-color":[{"mask-conic-from":I()}],"mask-image-conic-to-color":[{"mask-conic-to":I()}],"mask-mode":[{mask:[`alpha`,`luminance`,`match`]}],"mask-origin":[{"mask-origin":[`border`,`padding`,`content`,`fill`,`stroke`,`view`]}],"mask-position":[{mask:L()}],"mask-repeat":[{mask:R()}],"mask-size":[{mask:z()}],"mask-type":[{"mask-type":[`alpha`,`luminance`]}],"mask-image":[{mask:[`none`,X,Y]}],filter:[{filter:[``,`none`,X,Y]}],blur:[{blur:H()}],brightness:[{brightness:[vn,X,Y]}],contrast:[{contrast:[vn,X,Y]}],"drop-shadow":[{"drop-shadow":[``,`none`,p,Hn,In]}],"drop-shadow-color":[{"drop-shadow":I()}],grayscale:[{grayscale:[``,vn,X,Y]}],"hue-rotate":[{"hue-rotate":[vn,X,Y]}],invert:[{invert:[``,vn,X,Y]}],saturate:[{saturate:[vn,X,Y]}],sepia:[{sepia:[``,vn,X,Y]}],"backdrop-filter":[{"backdrop-filter":[``,`none`,X,Y]}],"backdrop-blur":[{"backdrop-blur":H()}],"backdrop-brightness":[{"backdrop-brightness":[vn,X,Y]}],"backdrop-contrast":[{"backdrop-contrast":[vn,X,Y]}],"backdrop-grayscale":[{"backdrop-grayscale":[``,vn,X,Y]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[vn,X,Y]}],"backdrop-invert":[{"backdrop-invert":[``,vn,X,Y]}],"backdrop-opacity":[{"backdrop-opacity":[vn,X,Y]}],"backdrop-saturate":[{"backdrop-saturate":[vn,X,Y]}],"backdrop-sepia":[{"backdrop-sepia":[``,vn,X,Y]}],"border-collapse":[{border:[`collapse`,`separate`]}],"border-spacing":[{"border-spacing":w()}],"border-spacing-x":[{"border-spacing-x":w()}],"border-spacing-y":[{"border-spacing-y":w()}],"table-layout":[{table:[`auto`,`fixed`]}],caption:[{caption:[`top`,`bottom`]}],transition:[{transition:[``,`all`,`colors`,`opacity`,`shadow`,`transform`,`none`,X,Y]}],"transition-behavior":[{transition:[`normal`,`discrete`]}],duration:[{duration:[vn,`initial`,X,Y]}],ease:[{ease:[`linear`,`initial`,_,X,Y]}],delay:[{delay:[vn,X,Y]}],animate:[{animate:[`none`,v,X,Y]}],backface:[{backface:[`hidden`,`visible`]}],perspective:[{perspective:[h,X,Y]}],"perspective-origin":[{"perspective-origin":x()}],rotate:[{rotate:U()}],"rotate-x":[{"rotate-x":U()}],"rotate-y":[{"rotate-y":U()}],"rotate-z":[{"rotate-z":U()}],scale:[{scale:ie()}],"scale-x":[{"scale-x":ie()}],"scale-y":[{"scale-y":ie()}],"scale-z":[{"scale-z":ie()}],"scale-3d":[`scale-3d`],skew:[{skew:W()}],"skew-x":[{"skew-x":W()}],"skew-y":[{"skew-y":W()}],transform:[{transform:[X,Y,``,`none`,`gpu`,`cpu`]}],"transform-origin":[{origin:x()}],"transform-style":[{transform:[`3d`,`flat`]}],translate:[{translate:ae()}],"translate-x":[{"translate-x":ae()}],"translate-y":[{"translate-y":ae()}],"translate-z":[{"translate-z":ae()}],"translate-none":[`translate-none`],zoom:[{zoom:[yn,X,Y]}],accent:[{accent:I()}],appearance:[{appearance:[`none`,`auto`]}],"caret-color":[{caret:I()}],"color-scheme":[{scheme:[`normal`,`dark`,`light`,`light-dark`,`only-dark`,`only-light`]}],cursor:[{cursor:[`auto`,`default`,`pointer`,`wait`,`text`,`move`,`help`,`not-allowed`,`none`,`context-menu`,`progress`,`cell`,`crosshair`,`vertical-text`,`alias`,`copy`,`no-drop`,`grab`,`grabbing`,`all-scroll`,`col-resize`,`row-resize`,`n-resize`,`e-resize`,`s-resize`,`w-resize`,`ne-resize`,`nw-resize`,`se-resize`,`sw-resize`,`ew-resize`,`ns-resize`,`nesw-resize`,`nwse-resize`,`zoom-in`,`zoom-out`,X,Y]}],"field-sizing":[{"field-sizing":[`fixed`,`content`]}],"pointer-events":[{"pointer-events":[`auto`,`none`]}],resize:[{resize:[`none`,``,`y`,`x`]}],"scroll-behavior":[{scroll:[`auto`,`smooth`]}],"scrollbar-thumb-color":[{"scrollbar-thumb":I()}],"scrollbar-track-color":[{"scrollbar-track":I()}],"scrollbar-gutter":[{"scrollbar-gutter":[`auto`,`stable`,`both`]}],"scrollbar-w":[{scrollbar:[`auto`,`thin`,`none`]}],"scroll-m":[{"scroll-m":w()}],"scroll-mx":[{"scroll-mx":w()}],"scroll-my":[{"scroll-my":w()}],"scroll-ms":[{"scroll-ms":w()}],"scroll-me":[{"scroll-me":w()}],"scroll-mbs":[{"scroll-mbs":w()}],"scroll-mbe":[{"scroll-mbe":w()}],"scroll-mt":[{"scroll-mt":w()}],"scroll-mr":[{"scroll-mr":w()}],"scroll-mb":[{"scroll-mb":w()}],"scroll-ml":[{"scroll-ml":w()}],"scroll-p":[{"scroll-p":w()}],"scroll-px":[{"scroll-px":w()}],"scroll-py":[{"scroll-py":w()}],"scroll-ps":[{"scroll-ps":w()}],"scroll-pe":[{"scroll-pe":w()}],"scroll-pbs":[{"scroll-pbs":w()}],"scroll-pbe":[{"scroll-pbe":w()}],"scroll-pt":[{"scroll-pt":w()}],"scroll-pr":[{"scroll-pr":w()}],"scroll-pb":[{"scroll-pb":w()}],"scroll-pl":[{"scroll-pl":w()}],"snap-align":[{snap:[`start`,`end`,`center`,`align-none`]}],"snap-stop":[{snap:[`normal`,`always`]}],"snap-type":[{snap:[`none`,`x`,`y`,`both`]}],"snap-strictness":[{snap:[`mandatory`,`proximity`]}],touch:[{touch:[`auto`,`none`,`manipulation`]}],"touch-x":[{"touch-pan":[`x`,`left`,`right`]}],"touch-y":[{"touch-pan":[`y`,`up`,`down`]}],"touch-pz":[`touch-pinch-zoom`],select:[{select:[`none`,`text`,`all`,`auto`]}],"will-change":[{"will-change":[`auto`,`scroll`,`contents`,`transform`,X,Y]}],fill:[{fill:[`none`,...I()]}],"stroke-w":[{stroke:[vn,Ln,An,jn]}],stroke:[{stroke:[`none`,...I()]}],"forced-color-adjust":[{"forced-color-adjust":[`auto`,`none`]}]},conflictingClassGroups:{"container-named":[`container-type`],overflow:[`overflow-x`,`overflow-y`],overscroll:[`overscroll-x`,`overscroll-y`],inset:[`inset-x`,`inset-y`,`inset-bs`,`inset-be`,`start`,`end`,`top`,`right`,`bottom`,`left`],"inset-x":[`start`,`end`,`right`,`left`],"inset-y":[`inset-bs`,`inset-be`,`top`,`bottom`],flex:[`basis`,`grow`,`shrink`],gap:[`gap-x`,`gap-y`],p:[`px`,`py`,`ps`,`pe`,`pbs`,`pbe`,`pt`,`pr`,`pb`,`pl`],px:[`ps`,`pe`,`pr`,`pl`],py:[`pbs`,`pbe`,`pt`,`pb`],m:[`mx`,`my`,`ms`,`me`,`mbs`,`mbe`,`mt`,`mr`,`mb`,`ml`],mx:[`ms`,`me`,`mr`,`ml`],my:[`mbs`,`mbe`,`mt`,`mb`],size:[`w`,`h`],"font-size":[`leading`],"fvn-normal":[`fvn-ordinal`,`fvn-slashed-zero`,`fvn-figure`,`fvn-spacing`,`fvn-fraction`],"fvn-ordinal":[`fvn-normal`],"fvn-slashed-zero":[`fvn-normal`],"fvn-figure":[`fvn-normal`],"fvn-spacing":[`fvn-normal`],"fvn-fraction":[`fvn-normal`],"line-clamp":[`display`,`overflow`],rounded:[`rounded-s`,`rounded-e`,`rounded-t`,`rounded-r`,`rounded-b`,`rounded-l`,`rounded-ss`,`rounded-se`,`rounded-ee`,`rounded-es`,`rounded-tl`,`rounded-tr`,`rounded-br`,`rounded-bl`],"rounded-s":[`rounded-ss`,`rounded-es`],"rounded-e":[`rounded-se`,`rounded-ee`],"rounded-t":[`rounded-tl`,`rounded-tr`],"rounded-r":[`rounded-tr`,`rounded-br`],"rounded-b":[`rounded-br`,`rounded-bl`],"rounded-l":[`rounded-tl`,`rounded-bl`],"border-spacing":[`border-spacing-x`,`border-spacing-y`],"border-w":[`border-w-x`,`border-w-y`,`border-w-s`,`border-w-e`,`border-w-bs`,`border-w-be`,`border-w-t`,`border-w-r`,`border-w-b`,`border-w-l`],"border-w-x":[`border-w-s`,`border-w-e`,`border-w-r`,`border-w-l`],"border-w-y":[`border-w-bs`,`border-w-be`,`border-w-t`,`border-w-b`],"border-color":[`border-color-x`,`border-color-y`,`border-color-s`,`border-color-e`,`border-color-bs`,`border-color-be`,`border-color-t`,`border-color-r`,`border-color-b`,`border-color-l`],"border-color-x":[`border-color-s`,`border-color-e`,`border-color-r`,`border-color-l`],"border-color-y":[`border-color-bs`,`border-color-be`,`border-color-t`,`border-color-b`],translate:[`translate-x`,`translate-y`,`translate-none`],"translate-none":[`translate`,`translate-x`,`translate-y`,`translate-z`],"scroll-m":[`scroll-mx`,`scroll-my`,`scroll-ms`,`scroll-me`,`scroll-mbs`,`scroll-mbe`,`scroll-mt`,`scroll-mr`,`scroll-mb`,`scroll-ml`],"scroll-mx":[`scroll-ms`,`scroll-me`,`scroll-mr`,`scroll-ml`],"scroll-my":[`scroll-mbs`,`scroll-mbe`,`scroll-mt`,`scroll-mb`],"scroll-p":[`scroll-px`,`scroll-py`,`scroll-ps`,`scroll-pe`,`scroll-pbs`,`scroll-pbe`,`scroll-pt`,`scroll-pr`,`scroll-pb`,`scroll-pl`],"scroll-px":[`scroll-ps`,`scroll-pe`,`scroll-pr`,`scroll-pl`],"scroll-py":[`scroll-pbs`,`scroll-pbe`,`scroll-pt`,`scroll-pb`],touch:[`touch-x`,`touch-y`,`touch-pz`],"touch-x":[`touch`],"touch-y":[`touch`],"touch-pz":[`touch`]},conflictingClassGroupModifiers:{"font-size":[`leading`]},postfixLookupClassGroups:[`container-type`],orderSensitiveModifiers:[`*`,`**`,`after`,`backdrop`,`before`,`details-content`,`file`,`first-letter`,`first-line`,`marker`,`placeholder`,`selection`]}});function Z(...e){return er(wt(e))}var tr=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),nr=o(((e,t)=>{t.exports=tr()})),Q=nr();function rr(e){return typeof e==`number`?`${e}px`:e}function ir(e,t){let n=`min(${rr(e)}, 64px)`;return typeof t==`number`&&t>0?`min(${n}, max(0px, calc(100% - ${t*2}px)))`:n}function ar({className:e,height:t=6,indicatorClassName:n,insetX:r,width:i=40}){let a={height:rr(t),width:ir(i,r)};return(0,Q.jsx)(`span`,{"aria-hidden":`true`,className:Z(`relative shrink-0`,e),"data-inset-x":typeof r==`number`?String(r):void 0,"data-slot":`animated-loader`,style:a,children:(0,Q.jsx)(`span`,{className:Z(`button-loader-indicator absolute inset-y-0 left-0 right-[65%] rounded-full bg-[color:var(--foreground)] opacity-90`,n),"data-slot":`animated-loader-indicator`})})}var or=4;function sr(e){return typeof e==`string`||typeof e==`number`?String(e):Array.isArray(e)?e.map(e=>sr(e)).join(``):_.isValidElement(e)?sr(e.props.children):``}function cr(e,t){if(typeof e==`function`){e(t);return}e&&typeof e==`object`&&(e.current=t)}function lr(e,t){let n={maxWidth:`${t}px`,minWidth:`${t}px`,width:`${t}px`};return typeof e==`function`?t=>({...e(t),...n}):{...e,...n}}function ur({ariaLabel:e,children:t,className:n,compactHeight:r=!1,disabled:i,iconOnly:a=!1,loading:o=!1,loadingHeight:s,loadingIndicatorClassName:c,loadingWidth:l,measurementKey:u,ref:d,style:f}){let p=_.useRef(null),m=_.useRef(null),h=a?4:16,g=s??(r?or:6),v=(e??sr(t).trim())||void 0,y=_.useCallback(e=>{p.current=e,cr(d,e)},[d]);return _.useLayoutEffect(()=>{if(o)return;let e=p.current;if(!e)return;let t=e.getBoundingClientRect().width;t>0&&(m.current=t)},[t,n,o,u,f]),{buttonAriaBusy:o||void 0,buttonAriaLabel:o?v:e,buttonClassName:o?`relative overflow-hidden transition-none !opacity-100`:void 0,buttonContent:o?(0,Q.jsx)(`span`,{"aria-hidden":`true`,className:`invisible inline-flex items-center`,"data-slot":`button-content`,style:{gap:`inherit`},children:t}):t,buttonDisabled:!!(i||o),buttonLoader:o?(0,Q.jsx)(`span`,{className:`pointer-events-none absolute inset-0 flex items-center justify-center`,"data-slot":`button-loader`,children:(0,Q.jsx)(ar,{height:g,indicatorClassName:c,insetX:h,width:l??96})}):null,buttonRef:y,buttonStyle:o&&m.current?lr(f,m.current):f,dataLoading:o?`true`:void 0}}var dr=`aria-pressed:border-[color:color-mix(in_oklab,var(--border)_10%,transparent)] aria-pressed:bg-[color:color-mix(in_oklab,var(--link)_12%,transparent)] aria-pressed:text-[color:var(--foreground)] data-[pressed]:border-[color:color-mix(in_oklab,var(--border)_10%,transparent)] data-[pressed]:bg-[color:color-mix(in_oklab,var(--link)_12%,transparent)] data-[pressed]:text-[color:var(--foreground)]`,fr=`aria-pressed:border-[color:color-mix(in_oklab,var(--border)_10%,transparent)] aria-pressed:bg-[color:color-mix(in_oklab,var(--link)_12%,transparent)] aria-pressed:text-[color:var(--foreground)] data-[pressed]:border-[color:color-mix(in_oklab,var(--border)_10%,transparent)] data-[pressed]:bg-[color:color-mix(in_oklab,var(--link)_12%,transparent)] data-[pressed]:text-[color:var(--foreground)] data-[state=on]:border-[color:color-mix(in_oklab,var(--border)_10%,transparent)] data-[state=on]:bg-[color:color-mix(in_oklab,var(--link)_12%,transparent)] data-[state=on]:text-[color:var(--foreground)]`,pr=`data-active:border-[color:color-mix(in_oklab,var(--border)_10%,transparent)] data-active:bg-[color:color-mix(in_oklab,var(--link)_12%,transparent)] data-active:text-[color:var(--foreground)]`;function mr(e){let t=e.hover.replaceAll(`hover:`,`focus:`);return[e.hover,t,e.active,e.persistent].join(` `)}function hr(e){switch(e){case`thin`:return`light`;case`light`:return`regular`;case`regular`:return`bold`;case`bold`:case`duotone`:case`fill`:return e;default:return`bold`}}function gr(e){if(typeof e==`string`)return e;let t=e;if(typeof t.displayName==`string`&&t.displayName.length>0)return t.displayName;if(typeof t.name==`string`&&t.name.length>0)return t.name;if(typeof t.render==`function`){let e=t.render;return e.displayName||e.name||null}return null}function _r(e){return gr(e.type)?.endsWith(`Icon`)??!1}function vr(e){return!1}function yr(e,t){return _.Children.map(e,e=>{if(!_.isValidElement(e))return e;let n=e.props.children===void 0?e.props.children:yr(e.props.children,t);if(!t)return n===e.props.children?e:_.cloneElement(e,void 0,n);if(_r(e)){let t=hr(e.props.weight);return n===e.props.children?_.cloneElement(e,{weight:t}):_.cloneElement(e,{weight:t},n)}return n===e.props.children?e:_.cloneElement(e,void 0,n)})}var br=Dt(`group/button inline-flex shrink-0 cursor-pointer items-center justify-center border border-transparent font-medium whitespace-nowrap transition-colors outline-none select-none focus-visible:border-[color:var(--ring)] focus-visible:ring-2 focus-visible:ring-[color:color-mix(in_oklab,var(--ring)_30%,transparent)] disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-[color:var(--destructive)] aria-invalid:ring-2 aria-invalid:ring-[color:color-mix(in_oklab,var(--destructive)_20%,transparent)] dark:aria-invalid:border-[color:color-mix(in_oklab,var(--destructive)_50%,transparent)] dark:aria-invalid:ring-[color:color-mix(in_oklab,var(--destructive)_40%,transparent)] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_[data-icon]]:opacity-60 [&_[data-icon]]:transition-opacity hover:[&_[data-icon]]:opacity-100 data-[size=icon]:[&_svg:not([data-slot='primitive-arrow-icon'])]:opacity-60 data-[size=icon]:[&_svg:not([data-slot='primitive-arrow-icon'])]:transition-opacity data-[size=icon]:hover:[&_svg:not([data-slot='primitive-arrow-icon'])]:opacity-100 data-[size=icon-tight]:[&_svg:not([data-slot='primitive-arrow-icon'])]:opacity-60 data-[size=icon-tight]:[&_svg:not([data-slot='primitive-arrow-icon'])]:transition-opacity data-[size=icon-tight]:hover:[&_svg:not([data-slot='primitive-arrow-icon'])]:opacity-100 data-[size=icon-xxs]:[&_svg:not([data-slot='primitive-arrow-icon'])]:opacity-60 data-[size=icon-xxs]:[&_svg:not([data-slot='primitive-arrow-icon'])]:transition-opacity data-[size=icon-xxs]:hover:[&_svg:not([data-slot='primitive-arrow-icon'])]:opacity-100 data-[size=icon-xs]:[&_svg:not([data-slot='primitive-arrow-icon'])]:opacity-60 data-[size=icon-xs]:[&_svg:not([data-slot='primitive-arrow-icon'])]:transition-opacity data-[size=icon-xs]:hover:[&_svg:not([data-slot='primitive-arrow-icon'])]:opacity-100 data-[size=icon-sm]:[&_svg:not([data-slot='primitive-arrow-icon'])]:opacity-60 data-[size=icon-sm]:[&_svg:not([data-slot='primitive-arrow-icon'])]:transition-opacity data-[size=icon-sm]:hover:[&_svg:not([data-slot='primitive-arrow-icon'])]:opacity-100 data-[size=icon-lg]:[&_svg:not([data-slot='primitive-arrow-icon'])]:opacity-60 data-[size=icon-lg]:[&_svg:not([data-slot='primitive-arrow-icon'])]:transition-opacity data-[size=icon-lg]:hover:[&_svg:not([data-slot='primitive-arrow-icon'])]:opacity-100 data-[size=icon-xl]:[&_svg:not([data-slot='primitive-arrow-icon'])]:opacity-60 data-[size=icon-xl]:[&_svg:not([data-slot='primitive-arrow-icon'])]:transition-opacity data-[size=icon-xl]:hover:[&_svg:not([data-slot='primitive-arrow-icon'])]:opacity-100 data-[icon-active=true]:[&_[data-icon]]:!opacity-100 data-[icon-active=true]:[&_svg:not([data-slot='primitive-arrow-icon'])]:!opacity-100`,{variants:{motion:{default:``,static:``},radius:{default:`rounded-lg`,full:`rounded-full`,lg:`rounded-lg`,md:`rounded-md`,sm:`rounded-md`,"tab-control":`button-radius-tab-control`,xl:`rounded-xl`},variant:{default:`bg-[color:var(--primary)] text-[color:var(--primary-foreground)] ${mr({active:`active:bg-[color:color-mix(in_oklab,var(--primary)_82%,black)]`,hover:`hover:bg-[color:color-mix(in_oklab,var(--primary)_88%,black)]`,persistent:`aria-expanded:bg-[color:color-mix(in_oklab,var(--primary)_88%,black)] aria-pressed:bg-[color:color-mix(in_oklab,var(--primary)_82%,black)] data-open:bg-[color:color-mix(in_oklab,var(--primary)_88%,black)] data-popup-open:bg-[color:color-mix(in_oklab,var(--primary)_88%,black)] data-[state=open]:bg-[color:color-mix(in_oklab,var(--primary)_88%,black)] data-[pressed]:bg-[color:color-mix(in_oklab,var(--primary)_82%,black)]`})}`,outline:`border-[color:color-mix(in_oklab,var(--border)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--input)_10%,transparent)] ${mr({active:`active:bg-[color:color-mix(in_oklab,var(--input)_15%,transparent)] active:text-[color:var(--foreground)]`,hover:`hover:!border-[color:color-mix(in_oklab,var(--border)_20%,transparent)] hover:bg-[color:color-mix(in_oklab,var(--input)_15%,transparent)] hover:text-[color:var(--foreground)]`,persistent:`aria-expanded:border-[color:color-mix(in_oklab,var(--border)_45%,transparent)] aria-expanded:bg-[color:color-mix(in_oklab,var(--input)_15%,transparent)] aria-expanded:text-[color:var(--foreground)] data-open:border-[color:color-mix(in_oklab,var(--border)_45%,transparent)] data-open:bg-[color:color-mix(in_oklab,var(--input)_15%,transparent)] data-open:text-[color:var(--foreground)] data-popup-open:border-[color:color-mix(in_oklab,var(--border)_45%,transparent)] data-popup-open:bg-[color:color-mix(in_oklab,var(--input)_15%,transparent)] data-popup-open:text-[color:var(--foreground)] data-[state=open]:border-[color:color-mix(in_oklab,var(--border)_45%,transparent)] data-[state=open]:bg-[color:color-mix(in_oklab,var(--input)_15%,transparent)] data-[state=open]:text-[color:var(--foreground)] ${dr}`})}`,"outline-inverted":`border-[color:color-mix(in_oklab,var(--background)_15%,transparent)] text-[color:color-mix(in_oklab,var(--background)_70%,transparent)] ${mr({active:`active:bg-[color:color-mix(in_oklab,var(--background)_10%,transparent)] active:text-[color:var(--background)]`,hover:`hover:bg-[color:color-mix(in_oklab,var(--background)_10%,transparent)] hover:text-[color:var(--background)]`,persistent:`aria-expanded:bg-[color:color-mix(in_oklab,var(--background)_10%,transparent)] aria-expanded:text-[color:var(--background)] aria-pressed:bg-[color:color-mix(in_oklab,var(--background)_10%,transparent)] aria-pressed:text-[color:var(--background)] data-open:bg-[color:color-mix(in_oklab,var(--background)_10%,transparent)] data-open:text-[color:var(--background)] data-popup-open:bg-[color:color-mix(in_oklab,var(--background)_10%,transparent)] data-popup-open:text-[color:var(--background)] data-[state=open]:bg-[color:color-mix(in_oklab,var(--background)_10%,transparent)] data-[state=open]:text-[color:var(--background)] data-[pressed]:bg-[color:color-mix(in_oklab,var(--background)_10%,transparent)] data-[pressed]:text-[color:var(--background)]`})}`,"destructive-outline":`border-[color:color-mix(in_oklab,var(--destructive)_80%,transparent)] bg-[color:color-mix(in_oklab,var(--destructive)_80%,transparent)] text-[color:var(--destructive-foreground)] ${mr({active:`active:bg-[color:color-mix(in_oklab,var(--destructive)_70%,transparent)]`,hover:`hover:border-[color:color-mix(in_oklab,var(--destructive)_70%,transparent)] hover:bg-[color:color-mix(in_oklab,var(--destructive)_70%,transparent)]`,persistent:`aria-expanded:bg-[color:color-mix(in_oklab,var(--destructive)_70%,transparent)] aria-pressed:bg-[color:color-mix(in_oklab,var(--destructive)_70%,transparent)] data-open:bg-[color:color-mix(in_oklab,var(--destructive)_70%,transparent)] data-popup-open:bg-[color:color-mix(in_oklab,var(--destructive)_70%,transparent)] data-[state=open]:bg-[color:color-mix(in_oklab,var(--destructive)_70%,transparent)] data-[pressed]:bg-[color:color-mix(in_oklab,var(--destructive)_70%,transparent)]`})} focus-visible:border-[color:var(--destructive)] focus-visible:ring-[color:color-mix(in_oklab,var(--destructive)_20%,transparent)] dark:focus-visible:ring-[color:color-mix(in_oklab,var(--destructive)_40%,transparent)]`,"destructive-outline-inverted":`border-[color:color-mix(in_oklab,var(--destructive)_80%,transparent)] bg-[color:color-mix(in_oklab,var(--destructive)_80%,transparent)] text-[color:var(--destructive-foreground)] ${mr({active:`active:bg-[color:color-mix(in_oklab,var(--destructive)_70%,transparent)]`,hover:`hover:border-[color:color-mix(in_oklab,var(--destructive)_70%,transparent)] hover:bg-[color:color-mix(in_oklab,var(--destructive)_70%,transparent)]`,persistent:`aria-expanded:bg-[color:color-mix(in_oklab,var(--destructive)_70%,transparent)] aria-pressed:bg-[color:color-mix(in_oklab,var(--destructive)_70%,transparent)] data-open:bg-[color:color-mix(in_oklab,var(--destructive)_70%,transparent)] data-popup-open:bg-[color:color-mix(in_oklab,var(--destructive)_70%,transparent)] data-[state=open]:bg-[color:color-mix(in_oklab,var(--destructive)_70%,transparent)] data-[pressed]:bg-[color:color-mix(in_oklab,var(--destructive)_70%,transparent)]`})} focus-visible:border-[color:var(--destructive)] focus-visible:ring-[color:color-mix(in_oklab,var(--destructive)_20%,transparent)]`,secondary:`bg-[color:color-mix(in_oklab,var(--secondary)_8%,transparent)] text-[color:var(--secondary-foreground)] ${mr({active:`active:bg-[color:color-mix(in_oklab,var(--secondary)_20%,transparent)]`,hover:`hover:bg-[color:color-mix(in_oklab,var(--secondary)_20%,transparent)]`,persistent:`aria-expanded:bg-[color:color-mix(in_oklab,var(--secondary)_20%,transparent)] aria-pressed:bg-[color:color-mix(in_oklab,var(--secondary)_20%,transparent)] data-open:bg-[color:color-mix(in_oklab,var(--secondary)_20%,transparent)] data-popup-open:bg-[color:color-mix(in_oklab,var(--secondary)_20%,transparent)] data-[state=open]:bg-[color:color-mix(in_oklab,var(--secondary)_20%,transparent)] data-[pressed]:bg-[color:color-mix(in_oklab,var(--secondary)_20%,transparent)]`})}`,"ghost-static":`bg-clip-border text-[color:var(--foreground)] ${mr({active:`active:bg-transparent active:text-[color:var(--foreground)]`,hover:`hover:bg-transparent hover:text-[color:var(--foreground)]`,persistent:`aria-expanded:bg-transparent aria-expanded:text-[color:var(--foreground)] aria-pressed:bg-transparent aria-pressed:text-[color:var(--foreground)] data-open:bg-transparent data-open:text-[color:var(--foreground)] data-popup-open:bg-transparent data-popup-open:text-[color:var(--foreground)] data-[state=open]:bg-transparent data-[state=open]:text-[color:var(--foreground)] data-[pressed]:bg-transparent data-[pressed]:text-[color:var(--foreground)]`})}`,send:`bg-[color:color-mix(in_oklab,var(--foreground)_80%,transparent)] !text-[color:color-mix(in_oklab,var(--background)_80%,transparent)] hover:!text-[color:color-mix(in_oklab,var(--background)_80%,transparent)] active:!text-[color:color-mix(in_oklab,var(--background)_80%,transparent)] [&_svg:not([data-slot='primitive-arrow-icon'])]:opacity-100 hover:[&_svg:not([data-slot='primitive-arrow-icon'])]:opacity-100 active:[&_svg:not([data-slot='primitive-arrow-icon'])]:opacity-100 data-[size=icon]:[&_svg:not([data-slot='primitive-arrow-icon'])]:!opacity-100 data-[size=icon]:hover:[&_svg:not([data-slot='primitive-arrow-icon'])]:!opacity-100 data-[size=icon]:active:[&_svg:not([data-slot='primitive-arrow-icon'])]:!opacity-100 ${mr({active:`active:bg-[color:color-mix(in_oklab,var(--foreground)_80%,transparent)]`,hover:`hover:bg-[color:color-mix(in_oklab,var(--foreground)_80%,transparent)]`,persistent:`aria-expanded:bg-[color:color-mix(in_oklab,var(--foreground)_80%,transparent)] aria-pressed:bg-[color:color-mix(in_oklab,var(--foreground)_80%,transparent)] data-open:bg-[color:color-mix(in_oklab,var(--foreground)_80%,transparent)] data-popup-open:bg-[color:color-mix(in_oklab,var(--foreground)_80%,transparent)] data-[state=open]:bg-[color:color-mix(in_oklab,var(--foreground)_80%,transparent)] data-[pressed]:bg-[color:color-mix(in_oklab,var(--foreground)_80%,transparent)]`})}`,stop:`bg-[color:var(--foreground)] !text-[color:color-mix(in_oklab,var(--background)_90%,transparent)] hover:!text-[color:color-mix(in_oklab,var(--background)_90%,transparent)] active:!text-[color:color-mix(in_oklab,var(--background)_90%,transparent)] [&_svg:not([data-slot='primitive-arrow-icon'])]:opacity-100 hover:[&_svg:not([data-slot='primitive-arrow-icon'])]:opacity-100 active:[&_svg:not([data-slot='primitive-arrow-icon'])]:opacity-100 data-[size=icon]:[&_svg:not([data-slot='primitive-arrow-icon'])]:!opacity-100 data-[size=icon]:hover:[&_svg:not([data-slot='primitive-arrow-icon'])]:!opacity-100 data-[size=icon]:active:[&_svg:not([data-slot='primitive-arrow-icon'])]:!opacity-100 ${mr({active:`active:bg-[color:var(--foreground)]`,hover:`hover:bg-[color:var(--foreground)]`,persistent:`aria-expanded:bg-[color:var(--foreground)] aria-pressed:bg-[color:var(--foreground)] data-open:bg-[color:var(--foreground)] data-popup-open:bg-[color:var(--foreground)] data-[state=open]:bg-[color:var(--foreground)] data-[pressed]:bg-[color:var(--foreground)]`})}`,ghost:`bg-clip-border text-[color:var(--foreground)] ${mr({active:`active:bg-[color:color-mix(in_oklab,var(--input)_10%,transparent)] active:text-[color:var(--foreground)]`,hover:`hover:bg-[color:color-mix(in_oklab,var(--input)_10%,transparent)] hover:text-[color:var(--foreground)]`,persistent:`aria-expanded:bg-[color:color-mix(in_oklab,var(--input)_10%,transparent)] aria-expanded:text-[color:var(--foreground)] data-open:bg-[color:color-mix(in_oklab,var(--input)_10%,transparent)] data-open:text-[color:var(--foreground)] data-popup-open:bg-[color:color-mix(in_oklab,var(--input)_10%,transparent)] data-popup-open:text-[color:var(--foreground)] data-[state=open]:bg-[color:color-mix(in_oklab,var(--input)_10%,transparent)] data-[state=open]:text-[color:var(--foreground)] ${dr}`})}`,"ghost-muted":`bg-clip-border text-[color:color-mix(in_oklab,var(--foreground)_60%,transparent)] ${mr({active:`active:bg-[color:color-mix(in_oklab,var(--input)_10%,transparent)] active:text-[color:var(--foreground)]`,hover:`hover:bg-[color:color-mix(in_oklab,var(--input)_10%,transparent)] hover:text-[color:var(--foreground)]`,persistent:`aria-expanded:bg-[color:color-mix(in_oklab,var(--input)_10%,transparent)] aria-expanded:text-[color:var(--foreground)] data-open:bg-[color:color-mix(in_oklab,var(--input)_10%,transparent)] data-open:text-[color:var(--foreground)] data-popup-open:bg-[color:color-mix(in_oklab,var(--input)_10%,transparent)] data-popup-open:text-[color:var(--foreground)] data-[state=open]:bg-[color:color-mix(in_oklab,var(--input)_10%,transparent)] data-[state=open]:text-[color:var(--foreground)] ${dr}`})}`,destructive:`border-[color:color-mix(in_oklab,var(--destructive)_30%,transparent)] bg-[color:color-mix(in_oklab,var(--destructive)_15%,transparent)] text-[color:var(--destructive)] ${mr({active:`active:bg-[color:color-mix(in_oklab,var(--destructive)_25%,transparent)] active:text-[color:var(--destructive)]`,hover:`hover:border-[color:color-mix(in_oklab,var(--destructive)_60%,transparent)] hover:bg-[color:color-mix(in_oklab,var(--destructive)_25%,transparent)] hover:text-[color:var(--destructive)]`,persistent:`aria-expanded:bg-[color:color-mix(in_oklab,var(--destructive)_25%,transparent)] aria-expanded:text-[color:var(--destructive)] aria-pressed:bg-[color:color-mix(in_oklab,var(--destructive)_25%,transparent)] aria-pressed:text-[color:var(--destructive)] data-open:bg-[color:color-mix(in_oklab,var(--destructive)_25%,transparent)] data-open:text-[color:var(--destructive)] data-popup-open:bg-[color:color-mix(in_oklab,var(--destructive)_25%,transparent)] data-popup-open:text-[color:var(--destructive)] data-[state=open]:bg-[color:color-mix(in_oklab,var(--destructive)_25%,transparent)] data-[state=open]:text-[color:var(--destructive)] data-[pressed]:bg-[color:color-mix(in_oklab,var(--destructive)_25%,transparent)] data-[pressed]:text-[color:var(--destructive)]`})} focus-visible:border-[color:var(--destructive)] focus-visible:ring-[color:color-mix(in_oklab,var(--destructive)_20%,transparent)] dark:focus-visible:ring-[color:color-mix(in_oklab,var(--destructive)_40%,transparent)]`,"link-solid":`bg-[color:var(--link)] text-[color:var(--background)] ${mr({active:`active:bg-[color:color-mix(in_oklab,var(--link)_82%,black)]`,hover:`hover:bg-[color:color-mix(in_oklab,var(--link)_88%,black)]`,persistent:`aria-expanded:bg-[color:color-mix(in_oklab,var(--link)_88%,black)] aria-pressed:bg-[color:color-mix(in_oklab,var(--link)_82%,black)] data-open:bg-[color:color-mix(in_oklab,var(--link)_88%,black)] data-popup-open:bg-[color:color-mix(in_oklab,var(--link)_88%,black)] data-[state=open]:bg-[color:color-mix(in_oklab,var(--link)_88%,black)] data-[pressed]:bg-[color:color-mix(in_oklab,var(--link)_82%,black)]`})}`,link:`text-[color:var(--primary)] underline-offset-4 ${mr({active:`active:underline`,hover:`hover:underline`,persistent:`aria-expanded:underline aria-pressed:underline data-open:underline data-popup-open:underline data-[state=open]:underline data-[pressed]:underline`})}`,"toolbar-ghost":``,"toolbar-secondary":``},size:{default:`h-7 gap-1 px-2 text-[13px] leading-[1.125rem] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5`,xxs:`h-[18px] gap-1 px-1.5 text-[11px] has-data-[icon=inline-end]:pr-1 has-data-[icon=inline-start]:pl-1 [&_svg:not([class*='size-'])]:size-2.5`,xs:`h-[22px] gap-1 px-2 text-[12px] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-2.5`,sm:`h-6 gap-1 px-2 text-xs/relaxed has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3`,lg:`h-[34px] gap-1 px-3.5 text-sm/relaxed tracking-tight has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3 [&_svg:not([class*='size-'])]:size-3.5`,xl:`button-xl-icon-size h-10 gap-1.5 px-3 text-sm/relaxed has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5`,icon:`size-7 text-[13px] leading-[1.125rem] [&_svg:not([class*='size-'])]:size-3.5`,"icon-tight":`h-7 px-1.5 text-[13px] leading-[1.125rem] [&_svg:not([class*='size-'])]:size-3.5`,"icon-xxs":`size-[18px] text-[11px] [&_svg:not([class*='size-'])]:size-2.5`,"icon-xs":`size-[22px] text-[12px] [&_svg:not([class*='size-'])]:size-2.5`,"icon-sm":`size-6 text-xs/relaxed [&_svg:not([class*='size-'])]:size-3`,"icon-lg":`size-[34px] text-sm/relaxed tracking-tight [&_svg:not([class*='size-'])]:size-4`,"icon-xl":`button-xl-icon-size size-10 text-sm/relaxed`}},defaultVariants:{motion:`default`,radius:`default`,variant:`default`,size:`default`}});function xr(e){return e===`xxs`||e===`xs`||e===`sm`||e===`icon-xxs`||e===`icon-xs`||e===`icon-sm`}function Sr({"aria-label":e,"data-slot":t,children:n,className:r,disabled:i,loading:a=!1,loadingHeight:o,loadingIndicatorClassName:s,loadingWidth:c,motion:l=`default`,radius:u=`default`,ref:d,size:f=`default`,style:p,variant:m=`default`,...h}){let g=u==="default"&&(f===`xxs`||f===`icon-xxs`)?`sm`:u,{buttonAriaBusy:_,buttonAriaLabel:v,buttonClassName:y,buttonContent:b,buttonDisabled:x,buttonLoader:S,buttonRef:C,buttonStyle:w,dataLoading:T}=ur({ariaLabel:e,children:yr(n,vr(f)),className:r,compactHeight:xr(f),disabled:i,iconOnly:typeof f==`string`&&f.startsWith(`icon`),loading:a,loadingHeight:o,loadingIndicatorClassName:s??(m==="default"?`bg-[color:var(--primary-foreground)]`:m===`link-solid`?`bg-[color:var(--background)]`:void 0),loadingWidth:c,measurementKey:[l,g,f,m].join(`:`),ref:d,style:p});return(0,Q.jsxs)(xt,{...h,"aria-label":v,"aria-busy":_,"data-slot":t??`button`,"data-loading":T,"data-radius":g??void 0,"data-size":f??void 0,"data-variant":m??void 0,disabled:x,ref:C,className:Z(br({motion:l,radius:g,variant:m,size:f}),r,y),style:w,children:[b,S]})}var Cr=`data-valid`,wr=`data-invalid`,Tr={badInput:!1,customError:!1,patternMismatch:!1,rangeOverflow:!1,rangeUnderflow:!1,stepMismatch:!1,tooLong:!1,tooShort:!1,typeMismatch:!1,valid:null,valueMissing:!1},Er={disabled:!1,valid:null,touched:!1,dirty:!1,filled:!1,focused:!1},Dr={valid(e){return e===null?null:e?{[Cr]:``}:{[wr]:``}}},Or={invalid:void 0,name:void 0,validityData:{state:Tr,errors:[],error:``,value:``,initialValue:null},setValidityData:ct,disabled:void 0,setTouched:ct,setDirty:ct,setFilled:ct,setFocused:ct,validationMode:`onSubmit`,shouldValidateOnChange:()=>!1,state:Er,registerFieldControl:ct,validation:{getValidationProps:(e,t=ut)=>t,inputRef:{current:null},registeredInputs:new Map,registerInput:ct,getInputControl:()=>null,commit:async()=>{},change:ct}},kr=_.createContext(Or);function Ar(e=!0){let t=_.useContext(kr);if(t.setValidityData===ct&&!e)throw Error(We(28));return t}var jr=_.createContext({elementRef:{current:null},formRef:{current:{fields:new Map}},errors:{},clearErrors:ct,validationMode:`onSubmit`,submitCountRef:{current:0}});function Mr(){return _.useContext(jr)}var Nr=0;function Pr(e,t=`mui`){let[n,r]=_.useState(e),i=e||n;return _.useEffect(()=>{n??(Nr+=1,r(`${t}-${Nr}`))},[n,t]),i}var Fr=be.useId;function Ir(e,t){if(Fr!==void 0){let n=Fr();return e??(t?`${t}-${n}`:n)}return Pr(e,t)}function Lr(e){return Ir(e,`base-ui`)}var Rr=_.createContext({controlId:void 0,registerControlId:ct,resetControlId:ct,labelId:void 0,setLabelId:ct,messageIds:[],setMessageIds:ct,getDescriptionProps:e=>e});function zr(){return _.useContext(Rr)}function Br(e,t,n,r=!0,i){let[a,o]=_.useState(),s=Lr(i?`${i}-label`:void 0),c=e??t??a;return J(()=>{let i=e||t||!r?void 0:Vr(n.current,s);a!==i&&o(i)}),c}function Vr(e,t){let n=Hr(e);if(n)return!n.id&&t&&(n.id=t),n.id||void 0}function Hr(e){if(!e)return;let t=e.parentElement;if(t&&t.tagName===`LABEL`)return t;let n=e.id;if(n){let t=e.nextElementSibling;if(t&&t.htmlFor===n)return t}let r=e.labels;return r&&r[0]}function Ur(e={}){let{id:t,enabled:n=!0}=e,{controlId:r,registerControlId:i,resetControlId:a}=zr(),o=Lr(),s=Se(()=>Symbol()),c=_.useRef(!1),l=_.useRef(!1),u=q(()=>{c.current&&i!==ct&&(c.current=!1,i(s.current,void 0))});return J(()=>{if(!n||i===ct){u();return}let e;if(t!==void 0)l.current=!0,e=t;else if(l.current)e=o;else{a();return}if(e===void 0){u();return}c.current=!0,i(s.current,e)},[t,n,i,a,o,s,u]),J(()=>u,[u]),(n?r:void 0)??t??o}function Wr(){return typeof navigator>`u`?{userAgent:``,platform:``,maxTouchPoints:0}:{userAgent:navigator.userAgent,platform:navigator.platform??``,maxTouchPoints:navigator.maxTouchPoints??0}}var{userAgent:Gr,platform:Kr,maxTouchPoints:qr}=Wr(),Jr=Gr.toLowerCase(),Yr=Kr.toLowerCase(),Xr=/^i(os$|p)/.test(Yr)||Yr===`macintel`&&qr>1,Zr=`android`,Qr=Yr===Zr||Jr.includes(Zr),$r=!Xr&&Yr.startsWith(`mac`);Yr.startsWith(`win`),!Qr&&/^(linux|chrome os)/.test(Yr);var ei=$r||Xr,ti=typeof CSS<`u`&&!!CSS.supports?.(`-webkit-backdrop-filter:none`);!ti&&Jr.includes(`firefox`),!ti&&Jr.includes(`chrom`);var ni=ei,ri=/jsdom|happydom/.test(Jr);function ii(e){let t=e.activeElement;for(;t?.shadowRoot?.activeElement!=null;)t=t.shadowRoot.activeElement;return t}function $(e,t){if(!e||!t)return!1;let n=t.getRootNode?.();if(e.contains(t))return!0;if(n&&W(n)){let n=t;for(;n;){if(e===n)return!0;n=n.parentNode||n.host}}return!1}function ai(e){return`composedPath`in e?e.composedPath()[0]??e.target:e.target}var oi=`data-base-ui-focusable`,si=`input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])`,ci=`ArrowLeft`,li=`ArrowRight`,ui=`ArrowUp`,di=`ArrowDown`,fi=`data-starting-style`,pi=`data-ending-style`,mi={[fi]:``},hi={[pi]:``},gi={transitionStatus(e){return e===`starting`?mi:e===`ending`?hi:null}},_i=`data-open`,vi=`data-closed`,yi=`data-anchor-hidden`,bi=`data-popup-open`,xi=`data-pressed`,Si={[bi]:``},Ci={[bi]:``,[xi]:``},wi={[_i]:``},Ti={[vi]:``},Ei={[yi]:``},Di={open(e){return e?Si:null}},Oi={open(e){return e?Ci:null}},ki={open(e){return e?wi:Ti},anchorHidden(e){return e?Ei:null}},Ai={...ki,...gi},ji=`data-trigger-disabled`;function Mi(e,t){if(!U(e))return!1;let n=e;if(t.hasElement(n))return!n.hasAttribute(ji);for(let[,e]of t.entries())if($(e,n))return!e.hasAttribute(ji);return!1}function Ni(e,t){if(t==null)return!1;if(`composedPath`in e)return e.composedPath().includes(t);let n=e;return n.target!=null&&t.contains(n.target)}function Pi(e){return e.matches(`html,body`)}function Fi(e){return ie(e)&&e.matches(`input:not([type='hidden']):not([disabled]),[contenteditable]:not([contenteditable='false']),textarea:not([disabled])`)}function Ii(e){return e?.closest(`button,a[href],[role="button"],select,[tabindex]:not([tabindex="-1"]),${si}`)!=null}function Li(e){return e?e.getAttribute(`role`)===`combobox`&&Fi(e):!1}function Ri(e){if(!e||ri)return!0;try{return e.matches(`:focus-visible`)}catch{return!0}}function zi(e){return e?e.hasAttribute(`data-base-ui-focusable`)?e:e.querySelector(`[data-base-ui-focusable]`)||e:null}function Bi(e,t,n=!0){return e.filter(e=>e.parentId===t).flatMap(t=>[...!n||t.context?.open?[t]:[],...Bi(e,t.id,n)])}function Vi(e,t){let n=[],r=e.find(e=>e.id===t)?.parentId;for(;r;){let t=e.find(e=>e.id===r);r=t?.parentId,t&&(n=n.concat(t))}return n}function Hi(e){e.preventDefault(),e.stopPropagation()}function Ui(e){return`nativeEvent`in e}function Wi(e){return e.pointerType===``&&e.isTrusted?!0:Qr&&e.pointerType?e.type===`click`&&e.buttons===1:e.detail===0&&!e.pointerType}function Gi(e){return ri?!1:!Qr&&e.width===0&&e.height===0||Qr&&e.width===1&&e.height===1&&e.pressure===0&&e.detail===0&&e.pointerType===`mouse`||e.width<1&&e.height<1&&e.pressure===0&&e.detail===0&&e.pointerType===`touch`}function Ki(e,t){let n=[`mouse`,`pen`];return t||n.push(``,void 0),n.includes(e)}function qi(e){let t=e.type;return t===`click`||t===`mousedown`||t===`keydown`||t===`keyup`}var Ji=Math.min,Yi=Math.max,Xi=Math.round,Zi=Math.floor,Qi=e=>({x:e,y:e}),$i={left:`right`,right:`left`,bottom:`top`,top:`bottom`};function ea(e,t,n){return Yi(e,Ji(t,n))}function ta(e,t){return typeof e==`function`?e(t):e}function na(e){return e.split(`-`)[0]}function ra(e){return e.split(`-`)[1]}function ia(e){return e===`x`?`y`:`x`}function aa(e){return e===`y`?`height`:`width`}function oa(e){let t=e[0];return t===`t`||t===`b`?`y`:`x`}function sa(e){return ia(oa(e))}function ca(e,t,n){n===void 0&&(n=!1);let r=ra(e),i=sa(e),a=aa(i),o=i===`x`?r===(n?`end`:`start`)?`right`:`left`:r===`start`?`bottom`:`top`;return t.reference[a]>t.floating[a]&&(o=_a(o)),[o,_a(o)]}function la(e){let t=_a(e);return[ua(e),t,ua(t)]}function ua(e){return e.includes(`start`)?e.replace(`start`,`end`):e.replace(`end`,`start`)}var da=[`left`,`right`],fa=[`right`,`left`],pa=[`top`,`bottom`],ma=[`bottom`,`top`];function ha(e,t,n){switch(e){case`top`:case`bottom`:return n?t?fa:da:t?da:fa;case`left`:case`right`:return t?pa:ma;default:return[]}}function ga(e,t,n,r){let i=ra(e),a=ha(na(e),n===`start`,r);return i&&(a=a.map(e=>e+`-`+i),t&&(a=a.concat(a.map(ua)))),a}function _a(e){let t=na(e);return $i[t]+e.slice(t.length)}function va(e){return{top:e.top??0,right:e.right??0,bottom:e.bottom??0,left:e.left??0}}function ya(e){return typeof e==`number`?{top:e,right:e,bottom:e,left:e}:va(e)}function ba(e){let{x:t,y:n,width:r,height:i}=e;return{width:r,height:i,top:n,left:t,right:t+r,bottom:n+i,x:t,y:n}}function xa(e,t){return t<0||t>=e.length}function Sa(e,t){return wa(e.current,{disabledIndices:t})}function Ca(e,t){return wa(e.current,{decrement:!0,startingIndex:e.current.length,disabledIndices:t})}function wa(e,{startingIndex:t=-1,decrement:n=!1,disabledIndices:r,amount:i=1}={}){let a=t;do a+=n?-i:i;while(a>=0&&a<=e.length-1&&Ta(e,a,r));return a}function Ta(e,t,n){if(typeof n==`function`?n(t):n?.includes(t)??!1)return!0;let r=e[t];return r?!Da(r)||r.matches(`:disabled`)?!0:!n&&(r.hasAttribute(`disabled`)||r.getAttribute(`aria-disabled`)===`true`):!1}function Ea(e){return e.visibility===`hidden`||e.visibility===`collapse`}function Da(e,t=e?me(e):null){return!e||!e.isConnected||!t||Ea(t)?!1:typeof e.checkVisibility==`function`?e.checkVisibility():t.display!==`none`&&t.display!==`contents`}var Oa=`a[href],button,input,select,textarea,summary,details,iframe,object,embed,[tabindex],[contenteditable]:not([contenteditable="false"]),audio[controls],video[controls]`;function ka(e){let t=e.assignedSlot;if(t)return t;if(e.parentElement)return e.parentElement;let n=e.getRootNode();return W(n)?n.host:null}function Aa(e){for(let t of Array.from(e.children))if(ne(t)===`summary`)return t;return null}function ja(e,t){let n=Aa(t);return!!n&&(e===n||$(n,e))}function Ma(e){let t=e?ne(e):``;return e!=null&&e.matches(Oa)&&(t!==`summary`||e.parentElement!=null&&ne(e.parentElement)===`details`&&Aa(e.parentElement)===e)&&(t!==`details`||Aa(e)==null)&&(t!==`input`||e.type!==`hidden`)}function Na(e){if(!Ma(e)||!e.isConnected||e.matches(`:disabled`))return!1;for(let t=e;t;t=ka(t)){let n=t!==e,r=ne(t)===`slot`;if(t.hasAttribute(`inert`)||n&&ne(t)===`details`&&!t.open&&!ja(e,t)||t.hasAttribute(`hidden`)||!r&&!Pa(t,n))return!1}return!0}function Pa(e,t){let n=me(e);return t?n.display!==`none`:Da(e,n)}function Fa(e){let t=e.tabIndex;if(t<0){let t=ne(e);if(t===`details`||t===`audio`||t===`video`||ie(e)&&e.isContentEditable)return 0}return t}function Ia(e){if(ne(e)!==`input`)return null;let t=e;return t.type===`radio`&&t.name!==``?t:null}function La(e,t){let n=Ia(e);if(!n)return!0;let r=t.find(e=>{let t=Ia(e);return t?.name===n.name&&t.form===n.form&&t.checked});return r?r===n:t.find(e=>{let t=Ia(e);return t?.name===n.name&&t.form===n.form})===n}function Ra(e){if(ie(e)&&ne(e)===`slot`){let t=e.assignedElements({flatten:!0});if(t.length>0)return t}return ie(e)&&e.shadowRoot?Array.from(e.shadowRoot.children):Array.from(e.children)}function za(e,t){Ra(e).forEach(e=>{Ma(e)&&t.push(e),za(e,t)})}function Ba(e,t,n){Ra(e).forEach(e=>{ie(e)&&e.matches(t)&&n.push(e),Ba(e,t,n)})}function Va(e){return Na(e)&&Fa(e)>=0}function Ha(e){let t=[];return za(e,t),t.filter(Na)}function Ua(e){let t=Ha(e);return t.filter(e=>Fa(e)>=0&&La(e,t))}function Wa(e,t){let n=Ua(e),r=n.length;if(r===0)return;let i=ii(Je(e)),a=n.indexOf(i);return n[a===-1?t===1?0:r-1:a+t]}function Ga(e){return Wa(Je(e).body,1)||e}function Ka(e){return Wa(Je(e).body,-1)||e}function qa(e,t){if(!e)return null;let n=Ua(Je(e).body),r=n.length;if(r===0)return null;let i=n.indexOf(e);return i===-1?null:n[(i+t+r)%r]}function Ja(e){return qa(e,1)}function Ya(e){return qa(e,-1)}function Xa(e,t){let n=t||e.currentTarget,r=e.relatedTarget;return!r||!$(n,r)}function Za(e){Ua(e).forEach(e=>{e.dataset.tabindex=e.getAttribute(`tabindex`)||``,e.setAttribute(`tabindex`,`-1`)})}function Qa(e){let t=[];Ba(e,`[data-tabindex]`,t),t.forEach(e=>{let t=e.dataset.tabindex;delete e.dataset.tabindex,t?e.setAttribute(`tabindex`,t):e.removeAttribute(`tabindex`)})}function $a(e){_.useEffect(e,lt)}var eo=0,to=class e{static create(){return new e}currentId=eo;start(e,t){this.clear(),this.currentId=setTimeout(()=>{this.currentId=eo,t()},e)}isStarted(){return this.currentId!==eo}clear=()=>{this.currentId!==eo&&(clearTimeout(this.currentId),this.currentId=eo)};disposeEffect=()=>this.clear};function no(){let e=Se(to.create).current;return $a(e.disposeEffect),e}var ro=null;globalThis.requestAnimationFrame;var io=new class{callbacks=[];callbacksCount=0;nextId=1;startId=1;isScheduled=!1;tick=e=>{this.isScheduled=!1;let t=this.callbacks,n=this.callbacksCount;if(this.callbacks=[],this.callbacksCount=0,this.startId=this.nextId,n>0)for(let n=0;n<t.length;n+=1)t[n]?.(e)};request(e){let t=this.nextId;return this.nextId+=1,this.callbacks.push(e),this.callbacksCount+=1,this.isScheduled||=(requestAnimationFrame(this.tick),!0),t}cancel(e){let t=e-this.startId;t<0||t>=this.callbacks.length||this.callbacks[t]!==null&&(this.callbacks[t]=null,--this.callbacksCount)}},ao=class e{static create(){return new e}static request(e){return io.request(e)}static cancel(e){return io.cancel(e)}currentId=ro;request(e){this.cancel(),this.currentId=io.request(()=>{this.currentId=ro,e()})}cancel=()=>{this.currentId!==ro&&(io.cancel(this.currentId),this.currentId=ro)};disposeEffect=()=>this.cancel};function oo(){let e=Se(ao.create).current;return $a(e.disposeEffect),e}function so(e){return e==null?e:`current`in e?e.current:e}var co=c(m(),1),lo=null;function uo(e){if(!lo){let e=[];lo=e,queueMicrotask(()=>{lo=null,co.flushSync(()=>{for(let t of e)t()})})}lo.push(e)}function fo(e,t=!1,n=!1){let r=oo();return q((i,a=null)=>{r.cancel();let o=so(e);if(o==null)return;let s=o,c=()=>{if(!n){co.flushSync(i);return}uo(()=>{a?.aborted||i()})};if(typeof s.getAnimations!=`function`||globalThis.BASE_UI_ANIMATIONS_DISABLED){i();return}function l(){Promise.all(s.getAnimations().map(e=>e.finished)).then(()=>{a?.aborted||c()},()=>{if(!a?.aborted){if(s.getAnimations().some(e=>e.pending||e.playState!==`finished`)){l();return}c()}})}if(t){let e=fi;if(!s.hasAttribute(e)){r.request(l);return}let t=new MutationObserver(()=>{s.hasAttribute(e)||(t.disconnect(),l())});t.observe(s,{attributes:!0,attributeFilter:[e]}),a?.addEventListener(`abort`,()=>t.disconnect(),{once:!0});return}r.request(l)})}function po(e){let{enabled:t=!0,open:n,ref:r,batch:i=!1,onComplete:a}=e,o=q(a),s=fo(r,n,i);_.useEffect(()=>{if(!t)return;let e=new AbortController;return s(o,e.signal),()=>{e.abort()}},[t,n,o,s])}function mo(e,t=!1,n=!1,r=!1){let[i,a]=_.useState(e&&t?`idle`:void 0),[o,s]=_.useState(e&&!r);return e&&!o&&(s(!0),a(`starting`)),!e&&o&&i!==`ending`&&!n&&a(`ending`),!e&&!o&&i===`ending`&&a(void 0),J(()=>{if(!e&&o&&i!==`ending`&&n){let e=ao.request(()=>{a(`ending`)});return()=>{ao.cancel(e)}}},[e,o,i,n]),J(()=>{if(!e||t)return;let n=ao.request(()=>{a(void 0)});return()=>{ao.cancel(n)}},[t,e]),J(()=>{if(!e||!t)return;e&&o&&i!==`idle`&&a(`starting`);let n=ao.request(()=>{a(`idle`)});return()=>{ao.cancel(n)}},[t,e,o,i]),{mounted:o,setMounted:s,transitionStatus:i}}function ho({controlled:e,default:t,name:n,state:r=`value`}){let{current:i}=_.useRef(e!==void 0),[a,o]=_.useState(t);return[i&&e!==void 0?e:a,_.useCallback(e=>{i||o(e)},[])]}function go(e,t,n,r,i=!0,a){let{registerFieldControl:o}=Ar(),s=Se(()=>Symbol());J(()=>{let c=s.current;if(!i){o(c,void 0);return}o(c,{controlRef:e,getValue:r,id:t,name:a,value:n})},[e,i,r,t,a,o,s,n]),J(()=>{let e=s.current;return()=>{o(e,void 0)}},[o,s])}function _o(e,t){let n=_.useRef(e),r=q(t);J(()=>{n.current!==e&&r(n.current),n.current=e},[e,r])}var vo=`none`,yo=`trigger-press`,bo=`trigger-hover`,xo=`trigger-focus`,So=`outside-press`,Co=`item-press`,wo=`close-press`,To=`track-press`,Eo=`input-change`,Do=`focus-out`,Oo=`escape-key`,ko=`list-navigation`,Ao=`keyboard`,jo=`drag`,Mo=`cancel-open`,No=`disabled`,Po=`missing`,Fo=`initial`,Io=`imperative-action`,Lo=`window-resize`;function Ro(e,t,n,r){let i=!1,a=!1,o=r??ut;return{reason:e,event:t??new Event(`base-ui`),cancel(){i=!0},allowPropagation(){a=!0},get isCanceled(){return i},get isPropagationAllowed(){return a},trigger:n,...o}}function zo(e,t,n){let r=n??ut;return{reason:e,event:t??new Event(`base-ui`),...r}}var Bo=_.forwardRef(function(e,t){let{render:n,className:r,id:i,name:a,value:o,disabled:s=!1,onValueChange:c,defaultValue:l,autoFocus:u=!1,style:d,...f}=e,{state:p,name:m,disabled:h,setTouched:g,setDirty:v,validityData:y,setFocused:b,setFilled:x,validationMode:S,validation:C}=Ar(),{clearErrors:w,elementRef:T,submitCountRef:E}=Mr(),D=h||s,O=m??a,k={...p,disabled:D},{labelId:A}=zr(),j=Ur({id:i}),[M]=ho({controlled:o,default:l,name:`FieldControl`,state:`value`}),N=o!==void 0,P=N?M:void 0,F=P==null?void 0:String(P),I=q(()=>C.inputRef.current?.value);go(C.inputRef,j,F,I,!D,a),J(()=>{let e=F??C.inputRef.current?.value;e!==void 0&&x(e!==``)},[F,C.inputRef,x]),_o(F,()=>{F!==void 0&&(w(O),v(F!==(y.initialValue??``)),C.change(F))});let L=_.useRef(null),R=no();return J(()=>{u&&L.current===ii(Je(L.current))&&b(!0)},[u,b]),mt(`input`,e,{ref:[t,L],state:k,props:[{id:j,disabled:D,name:O,ref:C.inputRef,"aria-labelledby":A,autoFocus:u,...N?{value:P}:{defaultValue:l},onChange(e){let t=e.currentTarget.value,n=Ro(vo,e.nativeEvent);c?.(t,n),!N&&(v(t!==(y.initialValue??``)),x(t!==``),!e.nativeEvent.defaultPrevented&&!n.isCanceled&&(w(O),C.change(t)))},onFocus(){b(!0)},onBlur(e){if(g(!0),b(!1),S===`onBlur`){let t=e.currentTarget.value;C.commit(t),N&&queueMicrotask(()=>{let e=C.inputRef.current?.value;e!==void 0&&e!==t&&e!==(y.initialValue??``)&&C.commit(e)})}},onKeyDown(e){if(e.currentTarget.tagName===`INPUT`&&e.key===`Enter`){g(!0);let t=e.currentTarget.value,n=e.currentTarget.form;if(n&&n===T.current&&!e.defaultPrevented){let t=e.currentTarget,n=E.current;R.start(0,()=>{E.current===n&&C.commit(t.value)})}else C.commit(t)}}},f,e=>C.getValidationProps(D,e)],stateAttributesMapping:Dr})}),Vo=_.forwardRef(function(e,t){return(0,Q.jsx)(Bo,{ref:t,...e})}),Ho=`border-[color:color-mix(in_oklab,var(--border)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--input)_5%,transparent)] bg-clip-padding text-[color:var(--foreground)]`,Uo=[`w-full min-w-0 cursor-text rounded-lg border transition-colors outline-none`,`file:inline-flex file:border-0 file:bg-transparent file:font-medium file:text-[color:var(--foreground)]`,`placeholder:text-[color:var(--muted-foreground)]`,`[&:not(:focus):hover]:!border-[color:color-mix(in_oklab,var(--border)_20%,transparent)] [&:not(:focus):hover]:text-[color:var(--foreground)]`,`focus:border-[color:color-mix(in_oklab,var(--border)_30%,transparent)]`,`focus-visible:border-[color:color-mix(in_oklab,var(--border)_30%,transparent)]`,`disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50`,`aria-invalid:border-[color:var(--destructive)]`,`dark:aria-invalid:border-[color:color-mix(in_oklab,var(--destructive)_50%,transparent)]`,Ho].join(` `),Wo=Dt(Uo,{variants:{size:{default:`h-7 px-2 py-0.5 text-xs/relaxed file:h-6 file:text-xs/relaxed`,lg:`h-8 px-2.5 py-1 text-sm/relaxed file:h-7 file:text-sm/relaxed`,sm:`h-6 px-2 py-0 text-xs/relaxed file:h-5 file:text-xs/relaxed`,xl:`h-10 px-3 py-1.5 text-base/relaxed file:h-9 file:text-base/relaxed`}},defaultVariants:{size:`default`}});function Go(e){try{let t=e.selectionEnd??e.value.length;e.setSelectionRange(t,t)}catch{}}function Ko({className:e,collapseSelectionOnBlur:t=!1,onBlur:n,size:r,type:i,...a}){return(0,Q.jsx)(Vo,{type:i,"data-slot":`input`,className:Z(Wo({size:r}),e),onBlur:e=>{t&&Go(e.currentTarget),n?.(e)},...a})}var qo=[],Jo=void 0;function Yo(){return Jo}function Xo(e){qo.push(e)}function Zo(e){let t=(t,n)=>{let r=Se($o).current,i;try{Jo=r;for(let e of qo)e.before(r);i=e(t,n);for(let e of qo)e.after(r);r.didInitialize=!0}finally{Jo=void 0}return i};return t.displayName=e.displayName||e.name,t}function Qo(e){return _.forwardRef(Zo(e))}function $o(){return{didInitialize:!1}}var es=_.createContext(void 0);function ts(e){let t=_.useContext(es);if(t===void 0&&!e)throw Error(We(72));return t}function ns(e,t){return t!=null&&!Ki(t)?0:typeof e==`function`?e():e}function rs(e,t,n){let r=ns(e,n);return typeof r==`number`?r:r?.[t]}function is(e){return typeof e==`function`?e():e}function as(e,t){return t||e===`click`||e===`mousedown`}function os(e){return e?.includes(`mouse`)&&e!==`mousedown`}var ss=_.createContext({hasProvider:!1,timeoutMs:0,delayRef:{current:0},initialDelayRef:{current:0},timeout:new to,currentIdRef:{current:null},currentContextRef:{current:null}});function cs(e,t){e.current=t.current}function ls(e){let{children:t,delay:n,timeoutMs:r=0}=e,i=_.useRef(n),a=_.useRef(n),o=_.useRef(null),s=_.useRef(null),c=no();return J(()=>{if(a.current=n,!o.current){i.current=n;return}i.current={open:rs(i.current,`open`),close:rs(n,`close`)}},[n,o,i,a]),(0,Q.jsx)(ss.Provider,{value:_.useMemo(()=>({hasProvider:!0,delayRef:i,initialDelayRef:a,currentIdRef:o,timeoutMs:r,currentContextRef:s,timeout:c}),[r,c]),children:t})}function us(e,t={open:!1}){let{open:n}=t,r=`rootStore`in e?e.rootStore:e,i=r.useState(`floatingId`),{currentIdRef:a,delayRef:o,timeoutMs:s,initialDelayRef:c,currentContextRef:l,hasProvider:u,timeout:d}=_.useContext(ss),[f,p]=_.useState(!1),m=_.useRef(n);return J(()=>{m.current=n},[n]),J(()=>{function e(){l.current?.setIsInstantPhase(!1),a.current=null,l.current=null,o.current=c.current,d.clear()}if(a.current&&!n&&a.current===i){if(p(!1),s){let t=i;return d.start(s,()=>{r.select(`open`)||a.current&&a.current!==t||e()}),()=>{(m.current||a.current!==t)&&d.clear()}}e()}},[n,i,a,o,s,c,l,d,r]),J(()=>{if(!n)return;let e=l.current,t=a.current;d.clear(),l.current={onOpenChange:r.setOpen,setIsInstantPhase:p},a.current=i,o.current={open:0,close:rs(c.current,`close`)},t!==null&&t!==i?(p(!0),e?.setIsInstantPhase(!0),e?.onOpenChange(!1,Ro(vo))):(p(!1),e?.setIsInstantPhase(!1))},[n,i,r,a,o,c,l,d]),J(()=>()=>{if(a.current===i){if(l.current=null,!m.current)return;a.current=null,cs(o,c),d.clear()}},[l,a,o,i,c,d]),_.useMemo(()=>({activeIdRef:a,hasProvider:u,delayRef:o,isInstantPhase:f}),[a,u,o,f])}function ds(e,t,n,r){return e.addEventListener(t,n,r),()=>{e.removeEventListener(t,n,r)}}function fs(...e){return()=>{for(let t=0;t<e.length;t+=1){let n=e[t];n&&n()}}}function ps(e){let t=Se(ms,e).current;return t.next=e,J(t.effect),t}function ms(e){let t={current:e,next:e,effect:()=>{t.current=t.next}};return t}var hs={clipPath:`inset(50%)`,overflow:`hidden`,whiteSpace:`nowrap`,border:0,padding:0,width:1,height:1,margin:-1},gs={...hs,position:`fixed`,top:0,left:0},_s={...hs,position:`absolute`},vs=_.forwardRef(function(e,t){let[n,r]=_.useState();J(()=>{ni&&ti&&r(`button`)},[]);let i={tabIndex:0,role:n};return(0,Q.jsx)(`span`,{...e,ref:t,style:gs,"aria-hidden":!n||void 0,...i,"data-base-ui-focus-guard":``})});function ys(e){return`data-base-ui-${e}`}var bs=0;function xs(e,t={}){let{preventScroll:n=!1,sync:r=!1,shouldFocus:i}=t;cancelAnimationFrame(bs);function a(){(!i||i())&&e?.focus({preventScroll:n})}if(r)return a(),ct;let o=requestAnimationFrame(a);return bs=o,()=>{bs===o&&(cancelAnimationFrame(o),bs=0)}}var Ss={inert:new WeakMap,"aria-hidden":new WeakMap},Cs=`data-base-ui-inert`,ws={inert:new WeakSet,"aria-hidden":new WeakSet},Ts=new WeakMap,Es=0;function Ds(e){return ws[e]}function Os(e){return e?W(e)?e.host:Os(e.parentNode):null}var ks=(e,t)=>t.map(t=>{if(e.contains(t))return t;let n=Os(t);return e.contains(n)?n:null}).filter(e=>e!=null),As=e=>{let t=new Set;return e.forEach(e=>{let n=e;for(;n&&!t.has(n);)t.add(n),n=n.parentNode}),t},js=(e,t,n)=>{let r=[],i=e=>{e&&!n.has(e)&&Array.from(e.children).forEach(e=>{ne(e)!==`script`&&(t.has(e)?i(e):r.push(e))})};return i(e),r};function Ms(e,t,n,r,{mark:i=!0}){let a=null;r?a=`inert`:n&&(a=`aria-hidden`);let o=null,s=null,c=ks(t,e),l=i?js(t,As(c),new Set(c)):[],u=[],d=[];if(a){let e=Ss[a],n=Ds(a);s=n,o=e;let r=ks(t,Array.from(t.querySelectorAll(`[aria-live]`))),i=c.concat(r);js(t,As(i),new Set(i)).forEach(t=>{let r=t.getAttribute(a),i=r!==null&&r!==`false`,o=(e.get(t)||0)+1;e.set(t,o),u.push(t),o===1&&i&&n.add(t),i||t.setAttribute(a,a===`inert`?``:`true`)})}return i&&l.forEach(e=>{let t=(Ts.get(e)||0)+1;Ts.set(e,t),d.push(e),t===1&&e.setAttribute(Cs,``)}),Es+=1,()=>{o&&u.forEach(e=>{let t=(o.get(e)||0)-1;o.set(e,t),t||(!s?.has(e)&&a&&e.removeAttribute(a),s?.delete(e))}),i&&d.forEach(e=>{let t=(Ts.get(e)||0)-1;Ts.set(e,t),t||e.removeAttribute(Cs)}),--Es,Es||(Ss.inert=new WeakMap,Ss[`aria-hidden`]=new WeakMap,ws.inert=new WeakSet,ws[`aria-hidden`]=new WeakSet,Ts=new WeakMap)}}function Ns(e,t={}){let{ariaHidden:n=!1,inert:r=!1,mark:i=!0}=t,a=Je(e[0]).body;return Ms(e,a,n,r,{mark:i})}var Ps={style:{transition:`none`}},Fs=`data-base-ui-click-trigger`,Is={fallbackAxisSide:`none`},Ls={fallbackAxisSide:`end`},Rs={clipPath:`inset(50%)`,position:`fixed`,top:0,left:0},zs=_.createContext(null),Bs=()=>_.useContext(zs),Vs=ys(`portal`);function Hs(e={}){let{ref:t,container:n,componentProps:r=ut,elementProps:i}=e,a=Ir(),o=Bs()?.portalNode,[s,c]=_.useState(null),[l,u]=_.useState(null),d=q(e=>{e!==null&&u(e)}),f=_.useRef(null);J(()=>{if(n===null){f.current&&(f.current=null,u(null),c(null));return}let e=(n&&(H(n)?n:n.current))??o??document.body;if(e==null){f.current&&(f.current=null,u(null),c(null));return}f.current!==e&&(f.current=e,u(null),c(e))},[n,o]);let p=mt(`div`,r,{ref:[t,d],props:[{id:a,[Vs]:``},i]}),m=s&&p?co.createPortal(p,s):null;return{node:l,nodeId:_.isValidElement(p)?p.props.id:void 0,subtree:m}}var Us=_.forwardRef(function(e,t){let{render:n,className:r,style:i,children:a,container:o,portalOwnerRole:s,...c}=e,{node:l,nodeId:u,subtree:d}=Hs({container:o,ref:t,componentProps:e,elementProps:c}),f=_.useRef(null),p=_.useRef(null),m=_.useRef(null),h=_.useRef(null),[g,v]=_.useState(null),y=_.useRef(!1),b=g?.modal,x=g?.open,S=!!g&&!g.modal&&g.open&&!!l;_.useEffect(()=>{if(!l||b)return;function e(e){l&&e.relatedTarget&&Xa(e)&&(e.type===`focusin`?y.current&&=(Qa(l),!1):(Za(l),y.current=!0))}return fs(ds(l,`focusin`,e,!0),ds(l,`focusout`,e,!0))},[l,b]),J(()=>{l&&x===!0&&y.current&&(Qa(l),y.current=!1)},[x,l]);let C=_.useMemo(()=>({beforeOutsideRef:f,afterOutsideRef:p,beforeInsideRef:m,afterInsideRef:h,portalNode:l,setFocusManagerState:v}),[l]);return(0,Q.jsxs)(_.Fragment,{children:[d,(0,Q.jsxs)(zs.Provider,{value:C,children:[S&&l&&(0,Q.jsx)(vs,{"data-type":`outside`,ref:f,onFocus:e=>{Xa(e,l)?m.current?.focus():Ka(g?g.domReference:null)?.focus()}}),S&&l&&(0,Q.jsx)(`span`,{role:s,"aria-owns":u,style:Rs}),l&&co.createPortal(a,l),S&&l&&(0,Q.jsx)(vs,{"data-type":`outside`,ref:p,onFocus:e=>{Xa(e,l)?h.current?.focus():(Ga(g?g.domReference:null)?.focus(),g?.closeOnFocusOut&&g?.onOpenChange(!1,Ro(`focus-out`,e.nativeEvent)))}})]})]})});function Ws(){let e=new Map;return{emit(t,n){e.get(t)?.forEach(e=>e(n))},on(t,n){e.has(t)||e.set(t,new Set),e.get(t).add(n)},off(t,n){e.get(t)?.delete(n)}}}var Gs=class{nodesRef={current:[]};events=Ws();addNode(e){this.nodesRef.current.push(e)}removeNode(e){let t=this.nodesRef.current.findIndex(t=>t===e);t!==-1&&this.nodesRef.current.splice(t,1)}},Ks=_.createContext(null),qs=_.createContext(null),Js=()=>_.useContext(Ks)?.id||null,Ys=e=>{let t=_.useContext(qs);return e??t};function Xs(e){let t=Ir(),n=Ys(e),r=Js();return J(()=>{if(!t)return;let e={id:t,parentId:r};return n?.addNode(e),()=>{n?.removeNode(e)}},[n,t,r]),t}function Zs(e){let{children:t,id:n}=e,r=Js();return(0,Q.jsx)(Ks.Provider,{value:_.useMemo(()=>({id:n,parentId:r}),[n,r]),children:t})}function Qs(e){let{children:t,externalTree:n}=e,r=Se(()=>n??new Gs).current;return(0,Q.jsx)(qs.Provider,{value:r,children:t})}function $s(e,t){let n=V(ai(e));return e instanceof n.KeyboardEvent?`keyboard`:e instanceof n.FocusEvent?t||`keyboard`:`pointerType`in e?e.pointerType||`keyboard`:`touches`in e?`touch`:e instanceof n.MouseEvent?t||(e.detail===0?`keyboard`:`mouse`):``}var ec=20,tc=[];function nc(){tc=tc.filter(e=>e.deref()?.isConnected)}function rc(e){nc(),e&&ne(e)!==`body`&&(tc.push(new WeakRef(e)),tc.length>ec&&(tc=tc.slice(-20)))}function ic(){return nc(),tc[tc.length-1]?.deref()}function ac(e){return e?Va(e)?e:Ua(e)[0]||e:null}function oc(e){if(e.hasAttribute(`tabindex`)&&!e.hasAttribute(`data-tabindex`)||!e.getAttribute(`role`)?.includes(`dialog`))return;let t=Ha(e).filter(e=>{let t=e.getAttribute(`data-tabindex`)||``;return Va(e)||e.hasAttribute(`data-tabindex`)&&!t.startsWith(`-`)}),n=e.getAttribute(`tabindex`);t.length===0?n!==`0`&&(e.setAttribute(`tabindex`,`0`),e.setAttribute(`data-tabindex`,`0`)):(n!==`-1`||e.hasAttribute(`data-tabindex`)&&e.getAttribute(`data-tabindex`)!==`-1`)&&(e.setAttribute(`tabindex`,`-1`),e.setAttribute(`data-tabindex`,`-1`))}function sc(e){let{context:t,children:n,disabled:r=!1,initialFocus:i=!0,returnFocus:a=!0,restoreFocus:o=!1,modal:s=!0,closeOnFocusOut:c=!0,openInteractionType:l=``,nextFocusableElement:u,previousFocusableElement:d,beforeContentFocusGuardRef:f,externalTree:p,getInsideElements:m}=e,h=`rootStore`in t?t.rootStore:t,g=h.useState(`open`),v=h.useState(`domReferenceElement`),y=h.useState(`floatingElement`),{events:b,dataRef:x}=h.context,S=q(()=>x.current.floatingContext?.nodeId),C=i===!1,w=Li(v)&&C,T=ps(i),E=ps(a),D=ps(l),O=ps(g),k=Ys(p),A=Bs(),j=_.useRef(!1),M=_.useRef(!1),N=_.useRef(!1),P=_.useRef(null),F=_.useRef(``),I=_.useRef(``),L=_.useRef(null),R=_.useRef(null),z=$e(L,f,A?.beforeInsideRef),ee=$e(R,A?.afterInsideRef),B=no(),te=no(),V=oo(),re=A!=null,H=zi(y),U=q((e=H)=>e?Ua(e):[]),W=q(()=>m?.().filter(e=>e!=null)??[]);_.useEffect(()=>{if(r||!s)return;function e(e){e.key===`Tab`&&$(H,ii(Je(H)))&&U().length===0&&!w&&Hi(e)}return ds(Je(H),`keydown`,e)},[r,H,s,w,U]),_.useEffect(()=>{if(r||!g)return;let e=Je(H);function t(){N.current=!1}function n(e){let t=ai(e),n=W(),r=$(y,t)||$(v,t)||$(A?.portalNode,t)||n.some(e=>e===t||$(e,t));N.current=!r,I.current=e.pointerType||`keyboard`,t?.closest(`[data-base-ui-click-trigger]`)&&(M.current=!0,te.start(0,()=>{M.current=!1}))}function i(){I.current=`keyboard`}return fs(ds(e,`pointerdown`,n,!0),ds(e,`pointerup`,t,!0),ds(e,`pointercancel`,t,!0),ds(e,`keydown`,i,!0),t)},[r,y,v,H,g,A,te,W]),_.useEffect(()=>{if(r||!c)return;let e=Je(H);function t(){M.current=!0,te.start(0,()=>{M.current=!1})}function n(e){let t=ai(e);Va(t)&&(P.current=t)}function i(t){let n=t.relatedTarget,r=t.currentTarget,i=ai(t);s&&n==null&&i!=null&&$(y,i)&&rc(i),queueMicrotask(()=>{let a=S(),c=h.context.triggerElements,l=W(),f=n?.hasAttribute(ys(`focus-guard`))&&[L.current,R.current,A?.beforeInsideRef.current,A?.afterInsideRef.current,A?.beforeOutsideRef.current,A?.afterOutsideRef.current,so(d),so(u)].includes(n),p=!($(v,n)||$(y,n)||$(n,y)||$(A?.portalNode,n)||l.some(e=>e===n||$(e,n))||c.hasMatchingElement(e=>$(e,n))||f||k&&(Bi(k.nodesRef.current,a).find(e=>$(e.context?.elements.floating,n)||$(e.context?.elements.domReference,n))||Vi(k.nodesRef.current,a).find(e=>[e.context?.elements.floating,zi(e.context?.elements.floating)].includes(n)||e.context?.elements.domReference===n)));if(r===v&&H&&oc(H),o&&r!==v&&!Da(i)&&ii(e)===e.body){if(ie(H)&&(H.focus(),o===`popup`)){V.request(()=>{H.focus()});return}let e=U(),t=P.current,n=(t&&e.includes(t)?t:null)||e[e.length-1]||H;ie(n)&&n.focus()}if(x.current.insideReactTree){x.current.insideReactTree=!1;return}(w||!s)&&n&&p&&!M.current&&(w||n!==ic())&&(j.current=!0,h.setOpen(!1,Ro(Do,t)))})}function a(){N.current||(x.current.insideReactTree=!0,B.start(0,()=>{x.current.insideReactTree=!1}))}let l=ie(v)?v:null;if(y||l)return fs(l&&ds(l,`focusout`,i),l&&ds(l,`pointerdown`,t),y&&ds(y,`focusin`,n),y&&ds(y,`focusout`,i),y&&A&&ds(y,`focusout`,a,!0))},[r,v,y,H,s,k,A,h,c,o,U,w,S,x,B,te,V,u,d,W]),_.useEffect(()=>{if(r||!y||!g)return;let e=Array.from(A?.portalNode?.querySelectorAll(`[${ys(`portal`)}]`)||[]),t=(k?Vi(k.nodesRef.current,S()):[]).find(e=>Li(e.context?.elements.domReference||null))?.context?.elements.domReference,n=Ns([y,...e,L.current,R.current,A?.beforeOutsideRef.current,A?.afterOutsideRef.current,...W(),t,so(d),so(u),w?v:null].filter(e=>e!=null),{ariaHidden:s||w,mark:!1}),i=Ns([y,...e].filter(e=>e!=null));return()=>{i(),n()}},[g,r,v,y,s,A,w,k,S,u,d,W]),J(()=>{if(!g||r||!ie(H))return;F.current=``,I.current=``;let e=Je(H),t=ii(e);queueMicrotask(()=>{let n=T.current,r=typeof n==`function`?n(D.current||``):n;if(r===void 0||r===!1||$(H,t))return;let i=null,a=()=>(i??=U(H),i[0]||H),o;o=r===!0||r===null?a():so(r),o||=a();let s=$(H,ii(e));xs(o,{preventScroll:o===H,shouldFocus(){if(!O.current)return!1;if(s)return!0;let t=ii(e);return!(t!==o&&$(H,t))}})})},[r,g,H,U,T,D,O]),J(()=>{if(r||!H)return;let e=Je(H),t=ii(e),n=D.current==null;rc(t);function i(e){if(e.open||(F.current=$s(e.nativeEvent,I.current)),e.reason===`trigger-hover`&&e.nativeEvent.type===`mouseleave`&&(j.current=!0),e.reason===`outside-press`){if(e.nested)j.current=!1;else if(Wi(e.nativeEvent)||Gi(e.nativeEvent))j.current=!1;else{let e=!1;Je(H).createElement(`div`).focus({get preventScroll(){return e=!0,!1}}),e?j.current=!1:j.current=!0}}}b.on(`openchange`,i);function a(e){let r=E.current,i=typeof r==`function`?r(e):r;if(i===void 0||i===!1)return null;i===null&&(i=!0);let a=v?.isConnected?v:null,o=t?.isConnected&&ne(t)!==`body`?t:null,s=n?o||a:a||o;return s||=ic()||null,typeof i==`boolean`?s:so(i)||s||null}return()=>{b.off(`openchange`,i);let t=ii(e),n=W(),r=$(y,t)||n.some(e=>e===t||$(e,t))||k&&Bi(k.nodesRef.current,S(),!1).some(e=>$(e.context?.elements.floating,t)),o=E.current,s=F.current,c=a(s);queueMicrotask(()=>{let n=ac(c),i=typeof o!=`boolean`;if(o&&!j.current&&ie(n)&&(i||n===t||t===e.body||r)){let e={preventScroll:!0};s===`keyboard`&&(e.focusVisible=!0),n.focus(e)}j.current=!1})}},[r,y,H,E,D,b,k,v,S,W]),J(()=>{if(!ti||g||!y)return;let e=ii(Je(y));ie(e)&&Fi(e)&&$(y,e)&&e.blur()},[g,y]),J(()=>{if(!r&&A)return A.setFocusManagerState({modal:s,closeOnFocusOut:c,open:g,onOpenChange:h.setOpen,domReference:v}),()=>{A.setFocusManagerState(null)}},[r,A,s,g,h,c,v]),J(()=>{if(!r&&H)return oc(H),()=>{queueMicrotask(nc)}},[r,H]);let ae=!r&&(!s||!w)&&(re||s);return(0,Q.jsxs)(_.Fragment,{children:[ae&&(0,Q.jsx)(vs,{"data-type":`inside`,ref:z,onFocus:e=>{if(s){let e=U();xs(e[e.length-1])}else A?.portalNode&&(j.current=!1,Xa(e,A.portalNode)?Ga(v)?.focus():so(d??A.beforeOutsideRef)?.focus())}}),n,ae&&(0,Q.jsx)(vs,{"data-type":`inside`,ref:ee,onFocus:e=>{s?xs(U()[0]):A?.portalNode&&(c&&(j.current=!0),Xa(e,A.portalNode)?Ka(v)?.focus():so(u??A.afterOutsideRef)?.focus())}})]})}function cc(e,t={}){let{enabled:n=!0,event:r=`click`,toggle:i=!0,ignoreMouse:a=!1,stickIfOpen:o=!0,touchOpenDelay:s=0,reason:c=yo}=t,l=`rootStore`in e?e.rootStore:e,u=l.context.dataRef,d=_.useRef(void 0),f=oo(),p=no(),m=_.useMemo(()=>{function e(e,t,n,r){let i=Ro(c,t,n);e&&r===`touch`&&s>0?p.start(s,()=>{l.setOpen(!0,i)}):l.setOpen(e,i)}function t(e,t,n){let r=u.current.openEvent,a=l.select(`domReferenceElement`)!==t;return e&&a||!e||!i?!0:r&&o?!n(r.type):!1}return{onPointerDown(e){d.current=Ki(e.pointerType,!0)&&Gi(e.nativeEvent)?`virtual`:e.pointerType},onMouseDown(n){let i=d.current,o=n.nativeEvent,s=l.select(`open`);if(n.button!==0||r===`click`||Ki(i,!0)&&a)return;let c=t(s,n.currentTarget,e=>e===`click`||e===`mousedown`),u=ai(o);if(Fi(u)){e(c,o,u,i);return}let p=n.currentTarget;f.request(()=>{e(c,o,p,i)})},onClick(n){if(r===`mousedown-only`)return;let i=d.current;if(r===`mousedown`&&i){d.current=void 0;return}Ki(i,!0)&&a||e(t(l.select(`open`),n.currentTarget,e=>e===`click`||e===`mousedown`||e===`keydown`||e===`keyup`),n.nativeEvent,n.currentTarget,i)},onKeyDown(){d.current=void 0}}},[u,r,a,c,l,o,i,f,p,s]);return _.useMemo(()=>n?{reference:m}:ut,[n,m])}function lc(e,t){let n=null,r=null,i=!1;return{contextElement:e||void 0,getBoundingClientRect(){let a=e?.getBoundingClientRect()||{width:0,height:0,x:0,y:0},o=t.axis===`x`||t.axis===`both`,s=t.axis===`y`||t.axis===`both`,c=[`mouseenter`,`mousemove`].includes(t.dataRef.current.openEvent?.type||``)&&t.pointerType!==`touch`,l=a.width,u=a.height,d=a.x,f=a.y;return n==null&&t.x&&o&&(n=a.x-t.x),r==null&&t.y&&s&&(r=a.y-t.y),d-=n||0,f-=r||0,l=0,u=0,!i||c?(l=t.axis===`y`?a.width:0,u=t.axis===`x`?a.height:0,d=o&&t.x!=null?t.x:d,f=s&&t.y!=null?t.y:f):i&&!c&&(u=t.axis===`x`?a.height:u,l=t.axis===`y`?a.width:l),i=!0,{width:l,height:u,x:d,y:f,top:f,right:d+l,bottom:f+u,left:d}}}}function uc(e){return e!=null&&e.clientX!=null}function dc(e,t={}){let{enabled:n=!0,axis:r=`both`}=t,i=`rootStore`in e?e.rootStore:e,a=i.useState(`open`),o=i.useState(`floatingElement`),s=i.useState(`domReferenceElement`),c=i.context.dataRef,l=_.useRef(!1),u=_.useRef(null),[d,f]=_.useState(),[p,m]=_.useState([]),h=q(e=>{i.set(`positionReference`,e)}),g=q((e,t,n)=>{l.current||(!c.current.openEvent||uc(c.current.openEvent))&&i.set(`positionReference`,lc(n??s,{x:e,y:t,axis:r,dataRef:c,pointerType:d}))}),v=q(e=>{a?u.current||(g(e.clientX,e.clientY,e.currentTarget),m([])):g(e.clientX,e.clientY,e.currentTarget)}),y=Ki(d)?o:a;_.useEffect(()=>{if(!n){h(s);return}if(!y)return;function e(){u.current?.(),u.current=null}let t=V(o);function r(t){let n=ai(t);$(o,n)?e():g(t.clientX,t.clientY)}return!c.current.openEvent||uc(c.current.openEvent)?u.current=ds(t,`mousemove`,r):h(s),e},[y,n,o,c,s,i,g,h,p]),_.useEffect(()=>()=>{i.set(`positionReference`,null)},[i]),_.useEffect(()=>{n&&!o&&(l.current=!1)},[n,o]),_.useEffect(()=>{!n&&a&&(l.current=!0)},[n,a]);let b=_.useMemo(()=>{function e(e){f(e.pointerType)}return{onPointerDown:e,onPointerEnter:e,onMouseMove:v,onMouseEnter:v}},[v]);return _.useMemo(()=>n?{reference:b,trigger:b}:{},[n,b])}function fc(){return!1}function pc(e){return{escapeKey:typeof e==`boolean`?e:e?.escapeKey??!1,outsidePress:typeof e==`boolean`?e:e?.outsidePress??!0}}function mc(e,t={}){let{enabled:n=!0,escapeKey:r=!0,outsidePress:i=!0,outsidePressEvent:a=`sloppy`,referencePress:o=fc,bubbles:s,externalTree:c}=t,l=`rootStore`in e?e.rootStore:e,u=l.useState(`open`),d=l.useState(`floatingElement`),{dataRef:f,events:p}=l.context,m=Ys(c),h=q(typeof i==`function`?i:()=>!1),g=typeof i==`function`?h:i,v=g!==!1,y=q(()=>a),{escapeKey:b,outsidePress:x}=pc(s),S=_.useRef(!1),C=_.useRef(!1),w=_.useRef(!1),T=_.useRef(!1),E=_.useRef(!1),D=_.useRef(``),O=_.useRef(null),k=no(),A=no(),j=q(()=>{A.clear(),f.current.insideReactTree=!1}),M=q(e=>{let t=f.current.floatingContext?.nodeId;return(m?Bi(m.nodesRef.current,t):[]).some(t=>t.context?.open&&!t.context.dataRef.current[e])}),N=q(e=>Ni(e,l.select(`floatingElement`))||Ni(e,l.select(`domReferenceElement`))),P=q(e=>{o()&&l.setOpen(!1,Ro(yo,e.nativeEvent))}),F=q(e=>{if(!u||!n||!r||e.key!==`Escape`||E.current||!b&&M(`__escapeKeyBubbles`))return;let t=Ro(Oo,Ui(e)?e.nativeEvent:e);l.setOpen(!1,t),t.isCanceled||e.preventDefault(),!b&&!t.isPropagationAllowed&&e.stopPropagation()}),I=q(()=>{f.current.insideReactTree=!0,A.start(0,j)}),L=q(e=>{if(!u||!n||e.button!==0)return;let t=ai(e.nativeEvent);$(l.select(`floatingElement`),t)&&(S.current||(S.current=!0,C.current=!1))}),R=q(e=>{u&&n&&(e.defaultPrevented||e.nativeEvent.defaultPrevented)&&S.current&&(C.current=!0)});_.useEffect(()=>{function e(e){e.open||(T.current=!1)}return p.on(`openchange`,e),()=>{p.off(`openchange`,e)}},[p]),_.useEffect(()=>{if(!u||!n)return u||(T.current=!1),j;f.current.__escapeKeyBubbles=b,f.current.__outsidePressBubbles=x;let e=new to,t=new to,i=Je(d);function a(){e.clear(),E.current=!0}function o(){e.start(ti?5:0,()=>{E.current=!1})}function s(){w.current=!0,t.start(0,()=>{w.current=!1})}function c(){S.current=!1,C.current=!1}function p(){let e=D.current,t=e===`pen`||!e?`mouse`:e,n=y(),r=typeof n==`function`?n():n;return typeof r==`string`?r:r[t]}function h(e){let t=p();return t===`intentional`&&e.type!==`click`||t===`sloppy`&&e.type===`click`}function _(e){let t=f.current.floatingContext?.nodeId,n=m&&Bi(m.nodesRef.current,t).some(t=>Ni(e,t.context?.elements.floating));return N(e)||n}function A(e){if(h(e)){e.type!==`click`&&!N(e)&&(t.clear(),w.current=!1),j();return}if(f.current.insideReactTree){j();return}let n=ai(e),r=`[${ys(`inert`)}]`,i=U(n)?n.getRootNode():null,a=Array.from((W(i)?i:Je(l.select(`floatingElement`))).querySelectorAll(r)),o=l.context.triggerElements;if(n&&(o.hasElement(n)||o.hasMatchingElement(e=>$(e,n))))return;let s=U(n)?n:null;for(;s&&!pe(s);){let e=ge(s);if(pe(e)||!U(e))break;s=e}if(!(a.length&&U(n)&&!Pi(n)&&!$(n,l.select(`floatingElement`))&&a.every(e=>!$(s,e)))){if(ie(n)&&!(`touches`in e)){let t=pe(n),r=me(n),i=/auto|scroll/,a=t||i.test(r.overflowX),o=t||i.test(r.overflowY),s=a&&n.clientWidth>0&&n.scrollWidth>n.clientWidth,c=o&&n.clientHeight>0&&n.scrollHeight>n.clientHeight,l=r.direction===`rtl`,u=c&&(l?e.offsetX<=n.offsetWidth-n.clientWidth:e.offsetX>n.clientWidth),d=s&&e.offsetY>n.clientHeight;if(u||d)return}if(!_(e)){if(p()===`intentional`){if(e.detail!==0&&!Wi(e)&&!T.current)return;if(w.current){t.clear(),w.current=!1;return}}(typeof g!=`function`||g(e))&&(M(`__outsidePressBubbles`)||(l.setOpen(!1,Ro(So,e)),j()))}}}function P(e){p()===`sloppy`&&e.pointerType!==`touch`&&l.select(`open`)&&n&&!N(e)&&A(e)}function I(e){if(p()!==`sloppy`||!l.select(`open`)||!n||N(e))return;let t=e.touches[0];t&&(O.current={startTime:Date.now(),startX:t.clientX,startY:t.clientY,dismissOnTouchEnd:!1,dismissOnMouseDown:!0},k.start(1e3,()=>{O.current&&(O.current.dismissOnTouchEnd=!1,O.current.dismissOnMouseDown=!1)}))}function L(e,t){let n=ai(e);if(!n)return;let r=ds(n,e.type,()=>{t(e),r()})}function R(e){D.current=`touch`,L(e,I)}function z(e){k.clear(),e.type===`pointerdown`&&(e.button===0&&(T.current=!0),D.current=e.pointerType),(e.type!==`mousedown`||!O.current||O.current.dismissOnMouseDown)&&L(e,e=>{e.type===`pointerdown`?P(e):A(e)})}function ee(e){if(e.type===`pointercancel`&&(T.current=!1),!S.current)return;let n=C.current;if(c(),p()===`intentional`){if(e.type===`pointercancel`){n&&s();return}if(!_(e)){if(n){s();return}(typeof g!=`function`||g(e))&&(t.clear(),w.current=!0,j())}}}function B(e){if(p()!==`sloppy`||!O.current||N(e))return;let t=e.touches[0];if(!t)return;let n=Math.abs(t.clientX-O.current.startX),r=Math.abs(t.clientY-O.current.startY),i=Math.sqrt(n*n+r*r);i>5&&(O.current.dismissOnTouchEnd=!0),i>10&&(A(e),k.clear(),O.current=null)}function te(e){L(e,B)}function ne(e){p()===`sloppy`&&O.current&&!N(e)&&(O.current.dismissOnTouchEnd&&A(e),k.clear(),O.current=null)}function V(e){L(e,ne)}let re=fs(r&&fs(ds(i,`keydown`,F),ds(i,`compositionstart`,a),ds(i,`compositionend`,o)),v&&fs(ds(i,`click`,z,!0),ds(i,`pointerdown`,z,!0),ds(i,`pointerup`,ee,!0),ds(i,`pointercancel`,ee,!0),ds(i,`mousedown`,z,!0),ds(i,`mouseup`,ee,!0),ds(i,`touchstart`,R,{capture:!0,passive:!0}),ds(i,`touchmove`,te,{capture:!0,passive:!0}),ds(i,`touchend`,V,{capture:!0,passive:!0})));return()=>{re(),e.clear(),t.clear(),c(),w.current=!1,j()}},[f,d,r,v,g,u,n,b,x,F,j,y,M,N,m,l,k]);let z=_.useMemo(()=>({onKeyDown:F,onPointerDown:P,onClick:P}),[F,P]),ee=_.useMemo(()=>({onKeyDown:F,onPointerDown:R,onMouseDown:R,onClickCapture:I,onMouseDownCapture(e){I(),L(e)},onPointerDownCapture(e){I(),L(e)},onMouseUpCapture:I,onTouchEndCapture:I,onTouchMoveCapture:I}),[F,I,L,R]);return _.useMemo(()=>n?{reference:z,floating:ee,trigger:z}:{},[n,z,ee])}function hc(e,t,n){let{reference:r,floating:i}=e,a=oa(t),o=sa(t),s=aa(o),c=na(t),l=a===`y`,u=r.x+r.width/2-i.width/2,d=r.y+r.height/2-i.height/2,f=r[s]/2-i[s]/2,p;switch(c){case`top`:p={x:u,y:r.y-i.height};break;case`bottom`:p={x:u,y:r.y+r.height};break;case`right`:p={x:r.x+r.width,y:d};break;case`left`:p={x:r.x-i.width,y:d};break;default:p={x:r.x,y:r.y}}let m=ra(t);return m&&(p[o]+=f*(m===`end`?1:-1)*(n&&l?-1:1)),p}async function gc(e,t){t===void 0&&(t={});let{x:n,y:r,platform:i,rects:a,elements:o,strategy:s}=e,{boundary:c=`clippingAncestors`,rootBoundary:l=`viewport`,elementContext:u=`floating`,altBoundary:d=!1,padding:f=0}=ta(t,e),p=ya(f),m=o[d?u===`floating`?`reference`:`floating`:u],h=ba(await i.getClippingRect({element:await(i.isElement==null?void 0:i.isElement(m))??!0?m:m.contextElement||await(i.getDocumentElement==null?void 0:i.getDocumentElement(o.floating)),boundary:c,rootBoundary:l,strategy:s})),g=u===`floating`?{x:n,y:r,width:a.floating.width,height:a.floating.height}:a.reference,_=await(i.getOffsetParent==null?void 0:i.getOffsetParent(o.floating)),v=await(i.isElement==null?void 0:i.isElement(_))&&await(i.getScale==null?void 0:i.getScale(_))||{x:1,y:1},y=ba(i.convertOffsetParentRelativeRectToViewportRelativeRect?await i.convertOffsetParentRelativeRectToViewportRelativeRect({elements:o,rect:g,offsetParent:_,strategy:s}):g);return{top:(h.top-y.top+p.top)/v.y,bottom:(y.bottom-h.bottom+p.bottom)/v.y,left:(h.left-y.left+p.left)/v.x,right:(y.right-h.right+p.right)/v.x}}var _c=50,vc=async(e,t,n)=>{let{placement:r=`bottom`,strategy:i=`absolute`,middleware:a=[],platform:o}=n,s=o.detectOverflow?o:{...o,detectOverflow:gc},c=await(o.isRTL==null?void 0:o.isRTL(t)),l=await o.getElementRects({reference:e,floating:t,strategy:i}),{x:u,y:d}=hc(l,r,c),f=r,p=0,m={};for(let n=0;n<a.length;n++){let h=a[n];if(!h)continue;let{name:g,fn:_}=h,{x:v,y,data:b,reset:x}=await _({x:u,y:d,initialPlacement:r,placement:f,strategy:i,middlewareData:m,rects:l,platform:s,elements:{reference:e,floating:t}});u=v??u,d=y??d,m[g]={...m[g],...b},x&&p<_c&&(p++,typeof x==`object`&&(x.placement&&(f=x.placement),x.rects&&(l=x.rects===!0?await o.getElementRects({reference:e,floating:t,strategy:i}):x.rects),{x:u,y:d}=hc(l,f,c)),n=-1)}return{x:u,y:d,placement:f,strategy:i,middlewareData:m}},yc=function(e){return e===void 0&&(e={}),{name:`flip`,options:e,async fn(t){var n;let{placement:r,middlewareData:i,rects:a,initialPlacement:o,platform:s,elements:c}=t,{mainAxis:l=!0,crossAxis:u=!0,fallbackPlacements:d,fallbackStrategy:f=`bestFit`,fallbackAxisSideDirection:p=`none`,flipAlignment:m=!0,...h}=ta(e,t);if((n=i.arrow)!=null&&n.alignmentOffset)return{};let g=na(r),_=oa(o),v=na(o)===o,y=await(s.isRTL==null?void 0:s.isRTL(c.floating)),b=d||(v||!m?[_a(o)]:la(o)),x=p!==`none`;!d&&x&&b.push(...ga(o,m,p,y));let S=[o,...b],C=await s.detectOverflow(t,h),w=[],T=i.flip?.overflows||[];if(l&&w.push(C[g]),u){let e=ca(r,a,y);w.push(C[e[0]],C[e[1]])}if(T=[...T,{placement:r,overflows:w}],!w.every(e=>e<=0)){let e=(i.flip?.index||0)+1,t=S[e];if(t&&(u!==`alignment`||_===oa(t)||T.every(e=>oa(e.placement)!==_||e.overflows[0]>0)))return{data:{index:e,overflows:T},reset:{placement:t}};let n=T.filter(e=>e.overflows[0]<=0).sort((e,t)=>e.overflows[1]-t.overflows[1])[0]?.placement;if(!n)switch(f){case`bestFit`:{let e=T.filter(e=>{if(x){let t=oa(e.placement);return t===_||t===`y`}return!0}).map(e=>[e.placement,e.overflows.filter(e=>e>0).reduce((e,t)=>e+t,0)]).sort((e,t)=>e[1]-t[1])[0]?.[0];e&&(n=e);break}case`initialPlacement`:n=o}if(r!==n)return{reset:{placement:n}}}return{}}}},bc=new Set([`left`,`top`]);async function xc(e,t){let{placement:n,platform:r,elements:i}=e,a=await(r.isRTL==null?void 0:r.isRTL(i.floating)),o=na(n),s=ra(n),c=oa(n)===`y`,l=bc.has(o)?-1:1,u=a&&c?-1:1,d=ta(t,e),{mainAxis:f,crossAxis:p,alignmentAxis:m}=typeof d==`number`?{mainAxis:d,crossAxis:0,alignmentAxis:null}:{mainAxis:d.mainAxis||0,crossAxis:d.crossAxis||0,alignmentAxis:d.alignmentAxis};return s&&typeof m==`number`&&(p=s===`end`?m*-1:m),c?{x:p*u,y:f*l}:{x:f*l,y:p*u}}var Sc=function(e){return e===void 0&&(e=0),{name:`offset`,options:e,async fn(t){var n;let{x:r,y:i,placement:a,middlewareData:o}=t,s=await xc(t,e);return a===o.offset?.placement&&(n=o.arrow)!=null&&n.alignmentOffset?{}:{x:r+s.x,y:i+s.y,data:{...s,placement:a}}}}},Cc=function(e){return e===void 0&&(e={}),{name:`shift`,options:e,async fn(t){let{x:n,y:r,placement:i,platform:a}=t,{mainAxis:o=!0,crossAxis:s=!1,limiter:c={fn:e=>{let{x:t,y:n}=e;return{x:t,y:n}}},...l}=ta(e,t),u={x:n,y:r},d=await a.detectOverflow(t,l),f=oa(i),p=ia(f),m=u[p],h=u[f],g=(e,t)=>ea(t+d[e===`y`?`top`:`left`],t,t-d[e===`y`?`bottom`:`right`]);o&&(m=g(p,m)),s&&(h=g(f,h));let _=c.fn({...t,[p]:m,[f]:h});return{..._,data:{x:_.x-n,y:_.y-r,enabled:{[p]:o,[f]:s}}}}}},wc=function(e){return e===void 0&&(e={}),{options:e,fn(t){let{x:n,y:r,placement:i,rects:a,middlewareData:o}=t,{offset:s=0,mainAxis:c=!0,crossAxis:l=!0}=ta(e,t),u={x:n,y:r},d=oa(i),f=ia(d),p=u[f],m=u[d],h=ta(s,t),g=typeof h==`number`?{mainAxis:h,crossAxis:0}:{mainAxis:h.mainAxis??0,crossAxis:h.crossAxis??0};if(c){let e=f===`y`?`height`:`width`,t=a.reference[f]-a.floating[e]+g.mainAxis,n=a.reference[f]+a.reference[e]-g.mainAxis;p<t?p=t:p>n&&(p=n)}if(l){let e=f===`y`?`width`:`height`,t=bc.has(na(i)),n=a.reference[d]-a.floating[e]+(t&&o.offset?.[d]||0)+(t?0:g.crossAxis),r=a.reference[d]+a.reference[e]+(t?0:o.offset?.[d]||0)-(t?g.crossAxis:0);m<n?m=n:m>r&&(m=r)}return{[f]:p,[d]:m}}}},Tc=function(e){return e===void 0&&(e={}),{name:`size`,options:e,async fn(t){let{placement:n,rects:r,platform:i,elements:a}=t,{apply:o=()=>{},...s}=ta(e,t),c=await i.detectOverflow(t,s),l=na(n),u=ra(n),d=oa(n)===`y`,{width:f,height:p}=r.floating,m,h;l===`top`||l===`bottom`?(m=l,h=u===(await(i.isRTL==null?void 0:i.isRTL(a.floating))?`start`:`end`)?`left`:`right`):(h=l,m=u===`end`?`top`:`bottom`);let g=p-c.top-c.bottom,_=f-c.left-c.right,v=Ji(p-c[m],g),y=Ji(f-c[h],_),b=t.middlewareData.shift,x=!b,S=v,C=y;b!=null&&b.enabled.x&&(C=_),b!=null&&b.enabled.y&&(S=g),x&&!u&&(d?C=f-2*Yi(c.left,c.right):S=p-2*Yi(c.top,c.bottom)),await o({...t,availableWidth:C,availableHeight:S});let w=await i.getDimensions(a.floating);return f!==w.width||p!==w.height?{reset:{rects:!0}}:{}}}};function Ec(e){let t=me(e),n=parseFloat(t.width)||0,r=parseFloat(t.height)||0,i=ie(e),a=i?e.offsetWidth:n,o=i?e.offsetHeight:r,s=Xi(n)!==a||Xi(r)!==o;return s&&(n=a,r=o),{width:n,height:r,$:s}}function Dc(e){return U(e)?e:e.contextElement}function Oc(e){let t=Dc(e);if(!ie(t))return Qi(1);let n=t.getBoundingClientRect(),{width:r,height:i,$:a}=Ec(t),o=(a?Xi(n.width):n.width)/r,s=(a?Xi(n.height):n.height)/i;return(!o||!Number.isFinite(o))&&(o=1),(!s||!Number.isFinite(s))&&(s=1),{x:o,y:s}}var kc=Qi(0);function Ac(e){let t=V(e);return!fe()||!t.visualViewport?kc:{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}}function jc(e,t,n){return t===void 0&&(t=!1),!!n&&t&&n===V(e)}function Mc(e,t,n,r){t===void 0&&(t=!1),n===void 0&&(n=!1);let i=e.getBoundingClientRect(),a=Dc(e),o=Qi(1);t&&(r?U(r)&&(o=Oc(r)):o=Oc(e));let s=jc(a,n,r)?Ac(a):Qi(0),c=(i.left+s.x)/o.x,l=(i.top+s.y)/o.y,u=i.width/o.x,d=i.height/o.y;if(a&&r){let e=V(a),t=U(r)?V(r):r,n=e,i=ye(n);for(;i&&t!==n;){let e=Oc(i),t=i.getBoundingClientRect(),r=me(i),a=t.left+(i.clientLeft+parseFloat(r.paddingLeft))*e.x,o=t.top+(i.clientTop+parseFloat(r.paddingTop))*e.y;c*=e.x,l*=e.y,u*=e.x,d*=e.y,c+=a,l+=o,n=V(i),i=ye(n)}}return ba({width:u,height:d,x:c,y:l})}function Nc(e,t){let n=he(e).scrollLeft;return t?t.left+n:Mc(re(e)).left+n}function Pc(e,t){let n=e.getBoundingClientRect();return{x:n.left+t.scrollLeft-Nc(e,n),y:n.top+t.scrollTop}}function Fc(e){let{elements:t,rect:n,offsetParent:r,strategy:i}=e,a=i===`fixed`,o=re(r),s=t?K(t.floating):!1;if(r===o||s&&a)return n;let c={scrollLeft:0,scrollTop:0},l=Qi(1),u=Qi(0),d=ie(r);if((d||!a)&&((ne(r)!==`body`||ae(o))&&(c=he(r)),d)){let e=Mc(r);l=Oc(r),u.x=e.x+r.clientLeft,u.y=e.y+r.clientTop}let f=o&&!d&&!a?Pc(o,c):Qi(0);return{width:n.width*l.x,height:n.height*l.y,x:n.x*l.x-c.scrollLeft*l.x+u.x+f.x,y:n.y*l.y-c.scrollTop*l.y+u.y+f.y}}function Ic(e){return e.getClientRects?Array.from(e.getClientRects()):[]}function Lc(e){let t=he(e),n=e.ownerDocument.body,r=Yi(e.scrollWidth,e.clientWidth,n.scrollWidth,n.clientWidth),i=Yi(e.scrollHeight,e.clientHeight,n.scrollHeight,n.clientHeight),a=-t.scrollLeft+Nc(e),o=-t.scrollTop;return me(n).direction===`rtl`&&(a+=Yi(e.clientWidth,n.clientWidth)-r),{width:r,height:i,x:a,y:o}}var Rc=25;function zc(e,t,n){n===void 0&&(n=`viewport`);let r=n===`layoutViewport`,i=V(e),a=re(e),o=i.visualViewport,s=a.clientWidth,c=a.clientHeight,l=0,u=0;if(o){let e=!fe()||t===`fixed`;r?e||(l=-o.offsetLeft,u=-o.offsetTop):(s=o.width,c=o.height,e&&(l=o.offsetLeft,u=o.offsetTop))}if(Nc(a)<=0){let e=a.ownerDocument,t=e.body,n=getComputedStyle(t),r=e.compatMode===`CSS1Compat`&&parseFloat(n.marginLeft)+parseFloat(n.marginRight)||0,i=Math.abs(a.clientWidth-t.clientWidth-r),o=getComputedStyle(a).scrollbarGutter===`stable both-edges`?i/2:i;o<=Rc&&(s-=o)}return{width:s,height:c,x:l,y:u}}function Bc(e,t){let n=Mc(e,!0,t===`fixed`),r=n.top+e.clientTop,i=n.left+e.clientLeft,a=Oc(e);return{width:e.clientWidth*a.x,height:e.clientHeight*a.y,x:i*a.x,y:r*a.y}}function Vc(e,t,n){let r;if(t===`viewport`||t===`layoutViewport`)r=zc(e,n,t);else if(t===`document`)r=Lc(re(e));else if(U(t))r=Bc(t,n);else{let n=Ac(e);r={x:t.x-n.x,y:t.y-n.y,width:t.width,height:t.height}}return ba(r)}function Hc(e,t){let n=t.get(e);if(n)return n;let r=ve(e,[],!1).filter(e=>U(e)&&ne(e)!==`body`),i=null,a=me(e).position===`fixed`,o=a?ge(e):e;for(;U(o)&&!pe(o);){let e=me(o),t=ue(o),n=i?i.position:a?`fixed`:``;!t&&(n===`fixed`||n===`absolute`&&e.position===`static`)?r=r.filter(e=>e!==o):i=e,o=ge(o)}return t.set(e,r),r}function Uc(e){let{element:t,boundary:n,rootBoundary:r,strategy:i}=e,a=[...n===`clippingAncestors`?K(t)?[]:Hc(t,this._c):[].concat(n),r],o=Vc(t,a[0],i),s=o.top,c=o.right,l=o.bottom,u=o.left;for(let e=1;e<a.length;e++){let n=Vc(t,a[e],i);s=Yi(n.top,s),c=Ji(n.right,c),l=Ji(n.bottom,l),u=Yi(n.left,u)}return{width:c-u,height:l-s,x:u,y:s}}function Wc(e){let{width:t,height:n}=Ec(e);return{width:t,height:n}}function Gc(e,t,n){let r=ie(t),i=re(t),a=n===`fixed`,o=Mc(e,!0,a,t),s={scrollLeft:0,scrollTop:0},c=Qi(0);if((r||!a)&&((ne(t)!==`body`||ae(i))&&(s=he(t)),r)){let e=Mc(t,!0,a,t);c.x=e.x+t.clientLeft,c.y=e.y+t.clientTop}!r&&i&&(c.x=Nc(i));let l=i&&!r&&!a?Pc(i,s):Qi(0);return{x:o.left+s.scrollLeft-c.x-l.x,y:o.top+s.scrollTop-c.y-l.y,width:o.width,height:o.height}}function Kc(e){return me(e).position===`static`}function qc(e,t){if(!ie(e)||me(e).position===`fixed`)return null;if(t)return t(e);let n=e.offsetParent;return re(e)===n&&(n=n.ownerDocument.body),n}function Jc(e,t){let n=V(e);if(K(e))return n;if(!ie(e)){let t=ge(e);for(;t&&!pe(t);){if(U(t)&&!Kc(t))return t;t=ge(t)}return n}let r=qc(e,t);for(;r&&G(r)&&Kc(r);)r=qc(r,t);return r&&pe(r)&&Kc(r)&&!ue(r)?n:r||de(e)||n}var Yc=async function(e){let t=this.getOffsetParent||Jc,n=this.getDimensions,r=await n(e.floating);return{reference:Gc(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}};function Xc(e){return me(e).direction===`rtl`}var Zc={convertOffsetParentRelativeRectToViewportRelativeRect:Fc,getDocumentElement:re,getClippingRect:Uc,getOffsetParent:Jc,getElementRects:Yc,getClientRects:Ic,getDimensions:Wc,getScale:Oc,isElement:U,isRTL:Xc};function Qc(e,t){return e.x===t.x&&e.y===t.y&&e.width===t.width&&e.height===t.height}function $c(e,t,n){let r=null,i,a=re(e);function o(){var e;clearTimeout(i),(e=r)==null||e.disconnect(),r=null}function s(n,c){n===void 0&&(n=!1),c===void 0&&(c=1),o();let l=e.getBoundingClientRect(),{left:u,top:d,width:f,height:p}=l;if(n||t(),!f||!p)return;let m=Zi(d),h=Zi(a.clientWidth-(u+f)),g=Zi(a.clientHeight-(d+p)),_=Zi(u),v={rootMargin:-m+`px `+-h+`px `+-g+`px `+-_+`px`,threshold:Yi(0,Ji(1,c))||1},y=!0;function b(t){let n=t[0].intersectionRatio;if(!Qc(l,e.getBoundingClientRect()))return s();if(n!==c){if(!y)return s();n?s(!1,n):i=setTimeout(()=>{s(!1,1e-7)},1e3)}y=!1}try{r=new IntersectionObserver(b,{...v,root:a.ownerDocument})}catch{r=new IntersectionObserver(b,v)}r.observe(e)}let c=V(e),l=()=>s(n);return c.addEventListener(`resize`,l),s(!0),()=>{c.removeEventListener(`resize`,l),o()}}function el(e,t,n,r){r===void 0&&(r={});let{ancestorScroll:i=!0,ancestorResize:a=!0,elementResize:o=typeof ResizeObserver==`function`,layoutShift:s=typeof IntersectionObserver==`function`,animationFrame:c=!1}=r,l=Dc(e),u=i||a?[...l?ve(l):[],...t?ve(t):[]]:[];u.forEach(e=>{i&&e.addEventListener(`scroll`,n),a&&e.addEventListener(`resize`,n)});let d=l&&s?$c(l,n,a):null,f=-1,p=null;o&&(p=new ResizeObserver(e=>{let[r]=e;r&&r.target===l&&p&&t&&(p.unobserve(t),cancelAnimationFrame(f),f=requestAnimationFrame(()=>{var e;(e=p)==null||e.observe(t)})),n()}),l&&!c&&p.observe(l),t&&p.observe(t));let m,h=c?Mc(e):null;c&&g();function g(){let t=Mc(e);h&&!Qc(h,t)&&n(),h=t,m=requestAnimationFrame(g)}return n(),()=>{var e;u.forEach(e=>{i&&e.removeEventListener(`scroll`,n),a&&e.removeEventListener(`resize`,n)}),d?.(),(e=p)==null||e.disconnect(),p=null,c&&cancelAnimationFrame(m)}}var tl=Sc,nl=Cc,rl=yc,il=Tc,al=wc,ol=(e,t,n)=>{let r=new Map,i=n??{},a={...Zc,...i.platform,_c:r};return vc(e,t,{...i,platform:a})},sl=typeof document<`u`?_.useLayoutEffect:function(){};function cl(e,t){if(e===t)return!0;if(typeof e!=typeof t)return!1;if(typeof e==`function`&&e.toString()===t.toString())return!0;let n,r,i;if(e&&t&&typeof e==`object`){if(Array.isArray(e)){if(n=e.length,n!==t.length)return!1;for(r=n;r--!==0;)if(!cl(e[r],t[r]))return!1;return!0}if(i=Object.keys(e),n=i.length,n!==Object.keys(t).length)return!1;for(r=n;r--!==0;)if(!{}.hasOwnProperty.call(t,i[r]))return!1;for(r=n;r--!==0;){let n=i[r];if(!(n===`_owner`&&e.$$typeof)&&!cl(e[n],t[n]))return!1}return!0}return e!==e&&t!==t}function ll(e){return typeof window>`u`?1:(e.ownerDocument.defaultView||window).devicePixelRatio||1}function ul(e,t){let n=ll(e);return Math.round(t*n)/n}function dl(e){let t=_.useRef(e);return sl(()=>{t.current=e}),t}function fl(e){e===void 0&&(e={});let{placement:t=`bottom`,strategy:n=`absolute`,middleware:r=[],platform:i,elements:{reference:a,floating:o}={},transform:s=!0,whileElementsMounted:c,open:l}=e,[u,d]=_.useState({x:0,y:0,strategy:n,placement:t,middlewareData:{},isPositioned:!1}),[f,p]=_.useState(r);cl(f,r)||p(r);let[m,h]=_.useState(null),[g,v]=_.useState(null),y=_.useCallback(e=>{e!==C.current&&(C.current=e,h(e))},[]),b=_.useCallback(e=>{e!==w.current&&(w.current=e,v(e))},[]),x=a||m,S=o||g,C=_.useRef(null),w=_.useRef(null),T=_.useRef(u),E=c!=null,D=dl(c),O=dl(i),k=dl(l),A=_.useCallback(()=>{if(!C.current||!w.current)return;let e={placement:t,strategy:n,middleware:f};O.current&&(e.platform=O.current),ol(C.current,w.current,e).then(e=>{let t={...e,isPositioned:k.current!==!1};j.current&&!cl(T.current,t)&&(T.current=t,co.flushSync(()=>{d(t)}))})},[f,t,n,O,k]);sl(()=>{l===!1&&T.current.isPositioned&&(T.current.isPositioned=!1,d(e=>({...e,isPositioned:!1})))},[l]);let j=_.useRef(!1);sl(()=>(j.current=!0,()=>{j.current=!1}),[]),sl(()=>{if(x&&(C.current=x),S&&(w.current=S),x&&S){if(D.current)return D.current(x,S,A);A()}},[x,S,A,D,E]);let M=_.useMemo(()=>({reference:C,floating:w,setReference:y,setFloating:b}),[y,b]),N=_.useMemo(()=>({reference:x,floating:S}),[x,S]),P=_.useMemo(()=>{let e={position:n,left:0,top:0};if(!N.floating)return e;let t=ul(N.floating,u.x),r=ul(N.floating,u.y);return s?{...e,transform:`translate(`+t+`px, `+r+`px)`,...ll(N.floating)>=1.5&&{willChange:`transform`}}:{position:n,left:t,top:r}},[n,s,N.floating,u.x,u.y]);return _.useMemo(()=>({...u,update:A,refs:M,elements:N,floatingStyles:P}),[u,A,M,N,P])}var pl=(e,t)=>{let n=tl(e);return{name:n.name,fn:n.fn,options:[e,t]}},ml=(e,t)=>{let n=nl(e);return{name:n.name,fn:n.fn,options:[e,t]}},hl=(e,t)=>({fn:al(e).fn,options:[e,t]}),gl=(e,t)=>{let n=rl(e);return{name:n.name,fn:n.fn,options:[e,t]}},_l=(e,t)=>{let n=il(e);return{name:n.name,fn:n.fn,options:[e,t]}},vl=o((e=>{var t=u();function n(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var r=typeof Object.is==`function`?Object.is:n,i=t.useState,a=t.useEffect,o=t.useLayoutEffect,s=t.useDebugValue;function c(e,t){var n=t(),r=i({inst:{value:n,getSnapshot:t}}),c=r[0].inst,u=r[1];return o(function(){c.value=n,c.getSnapshot=t,l(c)&&u({inst:c})},[e,n,t]),a(function(){return l(c)&&u({inst:c}),e(function(){l(c)&&u({inst:c})})},[e]),s(n),n}function l(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!r(e,n)}catch{return!0}}function d(e,t){return t()}var f=typeof window>`u`||window.document===void 0||window.document.createElement===void 0?d:c;e.useSyncExternalStore=t.useSyncExternalStore===void 0?f:t.useSyncExternalStore})),yl=o(((e,t)=>{t.exports=vl()})),bl=o((e=>{var t=u(),n=yl();function r(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var i=typeof Object.is==`function`?Object.is:r,a=n.useSyncExternalStore,o=t.useRef,s=t.useEffect,c=t.useMemo,l=t.useDebugValue;e.useSyncExternalStoreWithSelector=function(e,t,n,r,u){var d=o(null);if(d.current===null){var f={hasValue:!1,value:null};d.current=f}else f=d.current;d=c(function(){function e(e){if(!a){if(a=!0,o=e,e=r(e),u!==void 0&&f.hasValue){var t=f.value;if(u(t,e))return s=t}return s=e}if(t=s,i(o,e))return t;var n=r(e);return u!==void 0&&u(t,n)?(o=e,t):(o=e,s=n)}var a=!1,o,s,c=n===void 0?null:n;return[function(){return e(t())},c===null?void 0:function(){return e(c())}]},[t,n,r,u]);var p=a(e,d[0],d[1]);return s(function(){f.hasValue=!0,f.value=p},[p]),l(p),p}})),xl=o(((e,t)=>{t.exports=bl()})),Sl=yl(),Cl=xl(),wl=ot(19)?Dl:Ol;function Tl(e,t,n,r,i){return wl(e,t,n,r,i)}function El(e,t,n,r,i){let a=_.useCallback(()=>t(e.getSnapshot(),n,r,i),[e,t,n,r,i]);return(0,Sl.useSyncExternalStore)(e.subscribe,a,a)}Xo({before(e){e.syncIndex=0,e.didInitialize||(e.syncTick=1,e.syncHooks=[],e.didChangeStore=!0,e.getSnapshot=()=>{let t=!1;for(let n=0;n<e.syncHooks.length;n+=1){let r=e.syncHooks[n],i=r.selector(r.store.state,r.a1,r.a2,r.a3);Object.is(r.value,i)||(t=!0,r.value=i)}return t&&(e.syncTick+=1),e.syncTick})},after(e){e.syncHooks.length>0&&(e.didChangeStore&&(e.didChangeStore=!1,e.subscribe=t=>{let n=new Set;for(let t of e.syncHooks)n.add(t.store);let r=[];for(let e of n)r.push(e.subscribe(t));return()=>{for(let e of r)e()}}),(0,Sl.useSyncExternalStore)(e.subscribe,e.getSnapshot,e.getSnapshot))}});function Dl(e,t,n,r,i){let a=Yo();if(!a)return El(e,t,n,r,i);let o=a.syncIndex;a.syncIndex+=1;let s;return a.didInitialize?(s=a.syncHooks[o],(s.store!==e||s.selector!==t||!Object.is(s.a1,n)||!Object.is(s.a2,r)||!Object.is(s.a3,i))&&(s.store!==e&&(a.didChangeStore=!0),s.store=e,s.selector=t,s.a1=n,s.a2=r,s.a3=i,s.value=t(e.getSnapshot(),n,r,i))):(s={store:e,selector:t,a1:n,a2:r,a3:i,value:t(e.getSnapshot(),n,r,i)},a.syncHooks.push(s)),s.value}function Ol(e,t,n,r,i){return(0,Cl.useSyncExternalStoreWithSelector)(e.subscribe,e.getSnapshot,e.getSnapshot,e=>t(e,n,r,i))}var kl=class{static create(e){return new this(e)}constructor(e){this.state=e,this.listeners=new Set,this.updateTick=0}subscribe=e=>(this.listeners.add(e),()=>{this.listeners.delete(e)});getSnapshot=()=>this.state;setState(e){if(this.state===e)return;this.state=e,this.updateTick+=1;let t=this.updateTick;for(let n of this.listeners){if(t!==this.updateTick)return;n(e)}}update(e){for(let t in e)if(!Object.is(this.state[t],e[t])){this.setState({...this.state,...e});return}}set(e,t){Object.is(this.state[e],t)||this.setState({...this.state,[e]:t})}notifyAll(){let e={...this.state};this.setState(e)}use(e,t,n,r){return Tl(this,e,t,n,r)}},Al=class extends kl{constructor(e,t={},n){super(e),this.context=t,this.selectors=n}useSyncedValue(e,t){_.useDebugValue(e);let n=this;J(()=>{n.state[e]!==t&&n.set(e,t)},[n,e,t])}useSyncedValueWithCleanup(e,t){let n=this;J(()=>(n.state[e]!==t&&n.set(e,t),()=>{n.set(e,void 0)}),[n,e,t])}useSyncedValues(e){let t=this;J(()=>{t.update(e)},[t,...Object.values(e)])}useControlledProp(e,t){_.useDebugValue(e);let n=this,r=t!==void 0;J(()=>{r&&!Object.is(n.state[e],t)&&n.setState({...n.state,[e]:t})},[n,e,t,r])}select(e,t,n,r){let i=this.selectors[e];return i(this.state,t,n,r)}useState(e,t,n,r){return _.useDebugValue(e),Tl(this,this.selectors[e],t,n,r)}useContextCallback(e,t){_.useDebugValue(e);let n=q(t??ct);this.context[e]=n}useStateSetter(e){let t=_.useRef(void 0);return t.current===void 0&&(t.current=t=>{this.set(e,t)}),t.current}observe(e,t){let n;n=typeof e==`function`?e:this.selectors[e];let r=n(this.state);return t(r,r,this),this.subscribe(e=>{let i=n(e);if(!Object.is(r,i)){let e=r;r=i,t(i,e,this)}})}},jl={open:e=>e.open,transitionStatus:e=>e.transitionStatus,domReferenceElement:e=>e.domReferenceElement,referenceElement:e=>e.positionReference??e.referenceElement,floatingElement:e=>e.floatingElement,floatingId:e=>e.floatingId},Ml=class extends Al{constructor(e){let{syncOnly:t,nested:n,onOpenChange:r,triggerElements:i,...a}=e;super({...a,positionReference:a.referenceElement,domReferenceElement:a.referenceElement},{onOpenChange:r,dataRef:{current:{}},events:Ws(),nested:n,triggerElements:i},jl),this.syncOnly=t}syncOpenEvent=(e,t)=>{(!e||!this.state.open||t!=null&&qi(t))&&(this.context.dataRef.current.openEvent=e?t:void 0)};dispatchOpenChange=(e,t)=>{this.syncOpenEvent(e,t.event);let n={open:e,reason:t.reason,nativeEvent:t.event,nested:this.context.nested,triggerElement:t.trigger};this.context.events.emit(`openchange`,n)};setOpen=(e,t)=>{if(this.syncOnly){this.context.onOpenChange?.(e,t);return}this.dispatchOpenChange(e,t),this.context.onOpenChange?.(e,t)}};function Nl(e){let{popupStore:t,treatPopupAsFloatingElement:n=!1,floatingRootContext:r,floatingId:i,nested:a,onOpenChange:o}=e,s=t.useState(`open`),c=t.useState(`activeTriggerElement`),l=t.useState(n?`popupElement`:`positionerElement`),u=t.context.triggerElements,d=o,f=_.useRef(null);r===void 0&&f.current===null&&(f.current=new Ml({open:s,transitionStatus:void 0,referenceElement:c,floatingElement:l,triggerElements:u,onOpenChange:d,floatingId:i,syncOnly:!0,nested:a}));let p=r??f.current;return t.useSyncedValue(`floatingId`,i),J(()=>{let e={open:s,floatingId:i,referenceElement:c,floatingElement:l};U(c)&&(e.domReferenceElement=c),p.state.positionReference===p.state.referenceElement&&(e.positionReference=c),p.update(e)},[s,i,c,l,p]),p.context.onOpenChange=d,p.context.nested=a,p}var Pl={tabIndex:-1,[oi]:``};function Fl(e){return t=>t!==`touch`||e.current}function Il(e,t=!1){let n=Ir(),r=Js()!=null,i=Se(()=>e(n,r)).current;return Nl({popupStore:i,treatPopupAsFloatingElement:t,floatingRootContext:i.state.floatingRootContext,floatingId:n,nested:r,onOpenChange:i.setOpen}),i}function Ll({handle:e,store:t}){return J(()=>e.attachStore(t),[e,t]),null}function Rl(e){let t=e.context.triggerElements.size;e.select(`open`)&&e.state.triggerCount!==t&&e.set(`triggerCount`,t)}function zl(e,t){let n=_.useRef(null);return q(r=>{let i=n.current;if(i!==null){if(i.element===r&&i.store===t&&i.id===e)return;n.current=null;let a=i.store;a.context.triggerElements.getById(i.id)===i.element&&(a.context.triggerElements.delete(i.id),Rl(a))}r!==null&&e!==void 0&&(n.current={store:t,id:e,element:r},t.context.triggerElements.add(e,r),Rl(t))})}function Bl(e,t,n,r=!1){let i=e.preventUnmountingOnClose;t?i=!1:r&&(i=!0);let a=n?.id??null,o=e.activeTriggerId,s=e.activeTriggerElement;return(a||t)&&(o=a,s=n??null),{open:t,preventUnmountingOnClose:i,activeTriggerId:o,activeTriggerElement:s}}function Vl(e){let t=!1;return e.preventUnmountOnClose=()=>{t=!0},()=>t}function Hl(e,t,n,r={}){let i=n.reason,a=i===bo,o=t&&i===`trigger-focus`,s=!t&&(i===`trigger-press`||i===`escape-key`),c=Vl(n);if(e.context.onOpenChange?.(t,n),n.isCanceled)return;r.onBeforeDispatch?.(),e.state.floatingRootContext.dispatchOpenChange(t,n);let l=()=>{let i=Bl(e.state,t,n.trigger,c()),l={...r.extraState,...i};o?l.instantType=`focus`:s?l.instantType=`dismiss`:a&&(l.instantType=void 0),e.update(l)};a?co.flushSync(l):l()}function Ul(e,t,n,r){let i=n.useState(`isMountedByTrigger`,e),a=zl(e,n),o=q(t=>{let i=n.select(`open`),a=n.select(`activeTriggerId`);if(a===e){let e={activeTriggerElement:t,...i?r:null};n.update(e);return}if(a==null&&i){let i={activeTriggerId:e??null,activeTriggerElement:t,...r};n.update(i)}}),s=q(e=>{a(e),e&&o(e)});return J(()=>(s(t.current),()=>s(null)),[s,t,n,e]),J(()=>{if(i){let e={activeTriggerElement:t.current,...r};n.update(e)}},[i,n,t,...Object.values(r)]),{registerTrigger:s,isMountedByThisTrigger:i}}function Wl(e,t={}){let{closeOnActiveTriggerUnmount:n=!1}=t,r=_.useRef(null),i=e.useState(`open`);J(()=>{if(!i){r.current=null,e.state.triggerCount!==0&&e.set(`triggerCount`,0);return}let t=e.context.triggerElements.size,a={};e.state.triggerCount!==t&&(a.triggerCount=t);let o=e.select(`activeTriggerId`),s=null;if(o){let t=e.context.triggerElements.getById(o);if(t)r.current=o,t!==e.state.activeTriggerElement&&(a.activeTriggerElement=t);else{for(let[t,n]of e.context.triggerElements.entries())if(n===e.state.activeTriggerElement){a.activeTriggerId=t,a.activeTriggerElement=n,r.current=t;break}a.activeTriggerId===void 0&&(r.current===o?s=o:r.current=null)}}else r.current=null;if(!s&&!o&&t===1){let t=e.context.triggerElements.entries().next();if(!t.done){let[e,n]=t.value;a.activeTriggerId=e,a.activeTriggerElement=n,r.current=e}}(a.triggerCount!==void 0||a.activeTriggerId!==void 0||a.activeTriggerElement!==void 0)&&e.update(a),s&&n&&queueMicrotask(()=>{if(e.select(`open`)&&e.select(`activeTriggerId`)===s&&!e.context.triggerElements.getById(s)){let t=Ro(vo);e.setOpen(!1,t),t.isCanceled||e.update({activeTriggerId:null,activeTriggerElement:null})}})},[i,e,e.useState(`triggerCount`),e.useState(`activeTriggerId`),e.useState(`activeTriggerElement`),n])}function Gl(e,t,n,r){let{mounted:i,setMounted:a,transitionStatus:o}=mo(e,!1,!1,r),s=t.useState(`preventUnmountingOnClose`),c=!e&&s;t.useSyncedValues({mounted:i,transitionStatus:o,preventUnmountingOnClose:c});let l=q(()=>{a(!1),t.update({activeTriggerId:null,activeTriggerElement:null,mounted:!1,preventUnmountingOnClose:!1}),n?.(),t.context.onOpenChangeComplete?.(!1)});return po({enabled:i&&!e&&!c,open:e,ref:t.context.popupRef,onComplete(){e||l()}}),{forceUnmount:l,transitionStatus:o}}function Kl(e,t){e.useSyncedValues(t),J(()=>()=>{e.update({activeTriggerProps:ut,inactiveTriggerProps:ut,popupProps:ut})},[e])}function ql(e,t){J(()=>{!t&&e.state.openMethod!==null&&e.set(`openMethod`,null)},[t,e]),J(()=>()=>{e.state.openMethod!==null&&e.set(`openMethod`,null)},[e])}var Jl=class{constructor(){this.idMap=new Map}add(e,t){this.idMap.set(e,t)}delete(e){this.idMap.delete(e)}hasElement(e){for(let t of this.idMap.values())if(t===e)return!0;return!1}hasMatchingElement(e){for(let t of this.idMap.values())if(e(t))return!0;return!1}getById(e){return this.idMap.get(e)}entries(){return this.idMap.entries()}elements(){return this.idMap.values()}get size(){return this.idMap.size}};function Yl(e,t,n=!1){return{open:!1,openProp:void 0,mounted:!1,transitionStatus:void 0,floatingRootContext:new Ml({open:!1,transitionStatus:void 0,floatingElement:null,referenceElement:null,triggerElements:e,floatingId:t,syncOnly:!0,nested:n,onOpenChange:void 0}),floatingId:t,triggerCount:0,preventUnmountingOnClose:!1,payload:void 0,activeTriggerId:null,activeTriggerElement:null,triggerIdProp:void 0,popupElement:null,positionerElement:null,activeTriggerProps:ut,inactiveTriggerProps:ut,popupProps:ut}}var Xl=e=>e.triggerIdProp??e.activeTriggerId,Zl=e=>e.openProp??e.open,Ql=e=>(e.popupElement?.id??e.floatingId)||void 0;function $l(e,t){return t!==void 0&&Zl(e)&&Xl(e)===t}function eu(e,t){return $l(e,t)?!0:t!==void 0&&Zl(e)&&Xl(e)==null&&e.triggerCount===1}var tu={open:Zl,mounted:e=>e.mounted,transitionStatus:e=>e.transitionStatus,floatingRootContext:e=>e.floatingRootContext,triggerCount:e=>e.triggerCount,preventUnmountingOnClose:e=>e.preventUnmountingOnClose,payload:e=>e.payload,activeTriggerId:Xl,activeTriggerElement:e=>e.mounted?e.activeTriggerElement:null,popupId:Ql,isTriggerActive:(e,t)=>t!==void 0&&Xl(e)===t,isOpenedByTrigger:(e,t)=>$l(e,t),isMountedByTrigger:(e,t)=>t!==void 0&&Xl(e)===t&&e.mounted,triggerProps:(e,t)=>t?e.activeTriggerProps:e.inactiveTriggerProps,triggerPopupId:(e,t)=>eu(e,t)?Ql(e):void 0,popupProps:e=>e.popupProps,popupElement:e=>e.popupElement,positionerElement:e=>e.positionerElement};function nu(e){let t=_.useCallback(t=>e===void 0?ct:e.subscribeStore(t),[e]),n=_.useCallback(()=>e===void 0?void 0:e.store,[e]);return(0,Sl.useSyncExternalStore)(t,n,()=>e?.serverStore)}function ru(e){let{open:t=!1,onOpenChange:n,elements:r={}}=e,i=Ir(),a=Js()!=null,o=Se(()=>new Ml({open:t,transitionStatus:void 0,onOpenChange:n,referenceElement:r.reference??null,floatingElement:r.floating??null,triggerElements:new Jl,floatingId:i,syncOnly:!1,nested:a})).current;return J(()=>{let e={open:t,floatingId:i};r.reference!==void 0&&(e.referenceElement=r.reference,e.domReferenceElement=U(r.reference)?r.reference:null),r.floating!==void 0&&(e.floatingElement=r.floating),o.update(e)},[t,i,r.reference,r.floating,o]),o.context.onOpenChange=n,o.context.nested=a,o}function iu(e){return au(e,e.rootContext)}function au(e,t){let{nodeId:n,externalTree:r}=e,i=t.useState(`referenceElement`),a=t.useState(`floatingElement`),o=t.useState(`domReferenceElement`),s=t.useState(`open`),c=t.useState(`floatingId`),[l,u]=_.useState(null),[d,f]=_.useState(void 0),[p,m]=_.useState(void 0),h=_.useRef(null),g=Ys(r),v=_.useMemo(()=>({reference:i,floating:a,domReference:o}),[i,a,o]),y=fl({...e,elements:{...v,...l&&{reference:l}}}),b=U(d)?d:null,x=p===void 0?t.state.floatingElement:p;t.useSyncedValue(`referenceElement`,d??null),t.useSyncedValue(`domReferenceElement`,d===void 0?o:b),t.useSyncedValue(`floatingElement`,x);let S=_.useCallback(e=>{let t=U(e)?{getBoundingClientRect:()=>e.getBoundingClientRect(),getClientRects:()=>e.getClientRects(),contextElement:e}:e;u(t),y.refs.setReference(t)},[y.refs]),C=_.useCallback(e=>{(U(e)||e===null)&&(h.current=e,f(e)),(U(y.refs.reference.current)||y.refs.reference.current===null||e!==null&&!U(e))&&y.refs.setReference(e)},[y.refs,f]),w=_.useCallback(e=>{m(e),y.refs.setFloating(e)},[y.refs]),T=_.useMemo(()=>({...y.refs,setReference:C,setFloating:w,setPositionReference:S,domReference:h}),[y.refs,C,w,S]),E=_.useMemo(()=>({...y.elements,domReference:o}),[y.elements,o]),D=_.useMemo(()=>({...y,dataRef:t.context.dataRef,open:s,onOpenChange:t.setOpen,events:t.context.events,floatingId:c,refs:T,elements:E,nodeId:n,rootStore:t}),[y,T,E,n,t,s,c]);return J(()=>{o&&(h.current=o)},[o]),J(()=>{t.context.dataRef.current.floatingContext=D;let e=g?.nodesRef.current.find(e=>e.id===n);e&&(e.context=D)}),_.useMemo(()=>({...y,context:D,refs:T,elements:E,rootStore:t}),[y,T,E,D,t])}var ou=$r&&ti;function su(e,t={}){let{enabled:n=!0,delay:r}=t,i=`rootStore`in e?e.rootStore:e,{events:a,dataRef:o}=i.context,s=_.useRef(!1),c=_.useRef(null),l=_.useRef(!0),u=no();_.useEffect(()=>{let e=i.select(`domReferenceElement`);if(!n)return;let t=V(e);function r(){let e=i.select(`domReferenceElement`);!i.select(`open`)&&ie(e)&&e===ii(Je(e))&&(s.current=!0,c.current=e)}function a(){l.current=!0}function o(){l.current=!1}return fs(ds(t,`blur`,r),ou&&ds(t,`keydown`,a,!0),ou&&ds(t,`pointerdown`,o,!0))},[i,n]),_.useEffect(()=>{if(!n)return;function e(e){if(e.reason===`trigger-press`||e.reason===`escape-key`){let e=i.select(`domReferenceElement`);U(e)&&(c.current=e,s.current=!0)}}return a.on(`openchange`,e),()=>{a.off(`openchange`,e)}},[a,n,i]);let d=_.useMemo(()=>{function e(){s.current=!1,c.current=null}return{onMouseLeave(){e()},onFocus(t){let n=t.currentTarget;if(s.current){if(c.current===n)return;e()}let a=ai(t.nativeEvent);if(U(a)){if(ou&&!t.relatedTarget){if(!l.current&&!Fi(a))return}else if(!Ri(a))return}let o=Mi(t.relatedTarget,i.context.triggerElements),{nativeEvent:d,currentTarget:f}=t,p=typeof r==`function`?r():r;if(i.select(`open`)&&o||p===0||p===void 0){i.setOpen(!0,Ro(xo,d,f));return}u.start(p,()=>{s.current||i.setOpen(!0,Ro(xo,d,f))})},onBlur(t){e();let n=t.relatedTarget,r=t.nativeEvent,a=U(n)&&n.hasAttribute(ys(`focus-guard`))&&n.getAttribute(`data-type`)===`outside`;u.start(0,()=>{let e=i.select(`domReferenceElement`),t=ii(Je(e));(n||t!==e)&&($(o.current.floatingContext?.refs.floating.current,t)||$(e,t)||a||Mi(n??t,i.context.triggerElements)||i.setOpen(!1,Ro(xo,r)))})}}},[o,r,i,u]);return _.useMemo(()=>n?{reference:d,trigger:d}:{},[n,d])}var cu=class e{constructor(){this.pointerType=void 0,this.interactedInside=!1,this.handler=void 0,this.blockMouseMove=!0,this.performedPointerEventsMutation=!1,this.pointerEventsScopeElement=null,this.pointerEventsReferenceElement=null,this.pointerEventsFloatingElement=null,this.restTimeoutPending=!1,this.openChangeTimeout=new to,this.restTimeout=new to,this.handleCloseOptions=void 0}static create(){return new e}dispose=()=>{this.openChangeTimeout.clear(),this.restTimeout.clear()};disposeEffect=()=>this.dispose},lu=new WeakMap;function uu(e){if(!e.performedPointerEventsMutation)return;let t=e.pointerEventsScopeElement;t&&lu.get(t)===e&&(e.pointerEventsScopeElement?.style.removeProperty(`pointer-events`),e.pointerEventsReferenceElement?.style.removeProperty(`pointer-events`),e.pointerEventsFloatingElement?.style.removeProperty(`pointer-events`),lu.delete(t)),e.performedPointerEventsMutation=!1,e.pointerEventsScopeElement=null,e.pointerEventsReferenceElement=null,e.pointerEventsFloatingElement=null}function du(e,t){let{scopeElement:n,referenceElement:r,floatingElement:i}=t,a=lu.get(n);a&&a!==e&&uu(a),uu(e),e.performedPointerEventsMutation=!0,e.pointerEventsScopeElement=n,e.pointerEventsReferenceElement=r,e.pointerEventsFloatingElement=i,lu.set(n,e),n.style.pointerEvents=`none`,r.style.pointerEvents=`auto`,i.style.pointerEvents=`auto`}function fu(e){let t=e.context.dataRef.current,n=Se(()=>t.hoverInteractionState??cu.create()).current;return t.hoverInteractionState||=n,$a(t.hoverInteractionState.disposeEffect),t.hoverInteractionState}function pu(e,t={}){let{enabled:n=!0,closeDelay:r=0,nodeId:i}=t,a=`rootStore`in e?e.rootStore:e,o=a.useState(`open`),s=a.useState(`floatingElement`),c=a.useState(`domReferenceElement`),{dataRef:l}=a.context,u=Ys(),d=Js(),f=fu(a),p=no(),m=q(()=>as(l.current.openEvent?.type,f.interactedInside)),h=q(()=>os(l.current.openEvent?.type)),g=q(()=>{uu(f)});J(()=>{o||(f.pointerType=void 0,f.restTimeoutPending=!1,f.interactedInside=!1,g())},[o,f,g]),_.useEffect(()=>g,[g]),J(()=>{if(n&&o&&f.handleCloseOptions?.blockPointerEvents&&h()&&U(c)&&s){let e=c,t=s,n=Je(s),r=u?.nodesRef.current.find(e=>e.id===d)?.context?.elements.floating;r&&(r.style.pointerEvents=``);let i=f.pointerEventsScopeElement===t?null:f.pointerEventsScopeElement,a=r===t?null:r,o=f.handleCloseOptions?.getScope?.()??i??a??e.closest(`[data-rootownerid]`)??n.body;return du(f,{scopeElement:o,referenceElement:e,floatingElement:t}),()=>{g()}}},[n,o,c,s,f,h,u,d,g]),_.useEffect(()=>{if(!n)return;function e(){return!!(u&&d&&Bi(u.nodesRef.current,d).length>0)}function t(e){let t=rs(r,`close`,f.pointerType),n=()=>{a.setOpen(!1,Ro(bo,e)),u?.events.emit(`floating.closed`,e)};t?f.openChangeTimeout.start(t,n):(f.openChangeTimeout.clear(),n())}function o(e){let t=ai(e);if(!Ii(t)){f.interactedInside=!1;return}f.interactedInside=t?.closest(`[aria-haspopup]`)!=null}function c(){f.openChangeTimeout.clear(),p.clear(),u?.events.off(`floating.closed`,v),g()}function _(n){if(e()&&u){u.events.on(`floating.closed`,v);return}if(Mi(n.relatedTarget,a.context.triggerElements))return;let r=l.current.floatingContext?.nodeId??i,o=n.relatedTarget;if(!(u&&r&&U(o)&&Bi(u.nodesRef.current,r,!1).some(e=>$(e.context?.elements.floating,o)))){if(f.handler){f.handler(n);return}g(),h()&&!m()&&t(n)}}function v(t){u&&d&&!e()&&p.start(0,()=>{u.events.off(`floating.closed`,v),a.setOpen(!1,Ro(bo,t)),u.events.emit(`floating.closed`,t)})}let y=s;return fs(y&&ds(y,`mouseenter`,c),y&&ds(y,`mouseleave`,_),y&&ds(y,`pointerdown`,o,!0),()=>{u?.events.off(`floating.closed`,v)})},[n,s,a,l,r,i,h,m,g,f,u,d,p])}var mu={current:null};function hu(e,t={}){let{enabled:n=!0,delay:r=0,handleClose:i=null,mouseOnly:a=!1,restMs:o=0,move:s=!0,triggerElementRef:c=mu,externalTree:l,isActiveTrigger:u=!0,getHandleCloseContext:d,isClosing:f,shouldOpen:p,guardStaleOpen:m=!1}=t,h=`rootStore`in e?e.rootStore:e,{dataRef:g,events:v}=h.context,y=Ys(l),b=fu(h),x=_.useRef(!1),S=ps(i),C=ps(r),w=ps(o),T=ps(n),E=ps(p),D=ps(f),O=q(()=>as(g.current.openEvent?.type,b.interactedInside)),k=q(()=>E.current?.()!==!1),A=q((e,t,n)=>{let r=h.context.triggerElements;if(r.hasElement(t))return!e||!$(e,t);if(!U(n))return!1;let i=n;return r.hasMatchingElement(e=>$(e,i))&&(!e||!$(e,i))}),j=q(()=>{b.handler&&=(Je(h.select(`domReferenceElement`)).removeEventListener(`mousemove`,b.handler),void 0)}),M=q(()=>{uu(b)});return u&&(b.handleCloseOptions=i?.__options),_.useEffect(()=>j,[j]),_.useEffect(()=>{if(!n)return;function e(e){e.open?x.current=!1:(x.current=e.reason===bo,j(),b.openChangeTimeout.clear(),b.restTimeout.clear(),b.blockMouseMove=!0,b.restTimeoutPending=!1)}return v.on(`openchange`,e),()=>{v.off(`openchange`,e)}},[n,v,b,j]),_.useEffect(()=>{if(!n)return;function e(e,t=!0){let n=rs(C.current,`close`,b.pointerType);n?b.openChangeTimeout.start(n,()=>{h.setOpen(!1,Ro(bo,e)),y?.events.emit(`floating.closed`,e)}):t&&(b.openChangeTimeout.clear(),h.setOpen(!1,Ro(bo,e)),y?.events.emit(`floating.closed`,e))}let t=c.current??(u?h.select(`domReferenceElement`):null);if(!U(t))return;function r(e){if(b.openChangeTimeout.clear(),b.blockMouseMove=!1,a&&!Ki(b.pointerType))return;let t=is(w.current),n=rs(C.current,`open`,b.pointerType),r=ai(e),i=e.currentTarget??null,o=h.select(`domReferenceElement`),s=i;if(U(r)&&!h.context.triggerElements.hasElement(r)){for(let e of h.context.triggerElements.elements())if($(e,r)){s=e;break}}U(i)&&U(o)&&!h.context.triggerElements.hasElement(i)&&$(i,o)&&(s=o);let c=s!=null&&A(o,s,r),l=h.select(`open`),u=D.current?.()??h.select(`transitionStatus`)===`ending`,d=!l&&u&&x.current,f=!c&&U(s)&&U(o)&&$(o,s)&&d,p=t>0&&!n,m=c&&(l||d)||f,g=!l||c;if(m){k()&&h.setOpen(!0,Ro(bo,e,s));return}p||(n?b.openChangeTimeout.start(n,()=>{g&&k()&&h.setOpen(!0,Ro(bo,e,s))}):g&&k()&&h.setOpen(!0,Ro(bo,e,s)))}function i(t){if(O()){M();return}j();let n=Je(h.select(`domReferenceElement`));b.restTimeout.clear(),b.restTimeoutPending=!1;let r=g.current.floatingContext??d?.();if(!Mi(t.relatedTarget,h.context.triggerElements)){if(S.current&&r){h.select(`open`)||b.openChangeTimeout.clear();let i=c.current;b.handler=S.current({...r,tree:y,x:t.clientX,y:t.clientY,onClose(){M(),j(),T.current&&!O()&&i===h.select(`domReferenceElement`)&&e(t,!0)}}),n.addEventListener(`mousemove`,b.handler),b.handler(t);return}(b.pointerType!==`touch`||!$(h.select(`floatingElement`),t.relatedTarget))&&e(t)}}function o(e){$(t,e.relatedTarget)||(b.openChangeTimeout.clear(),b.restTimeout.clear(),b.restTimeoutPending=!1)}let l=m?ds(t,`mouseout`,o):void 0;return s?fs(ds(t,`mousemove`,r,{once:!0}),ds(t,`mouseenter`,r),ds(t,`mouseleave`,i),l):fs(ds(t,`mouseenter`,r),ds(t,`mouseleave`,i),l)},[j,M,g,C,h,n,S,b,u,A,O,a,s,w,c,y,T,d,D,k,m]),_.useMemo(()=>{if(!n)return;function e(e){b.pointerType=e.pointerType}return{onPointerDown:e,onPointerEnter:e,onMouseMove(e){let{nativeEvent:t}=e,n=e.currentTarget,r=h.select(`domReferenceElement`),i=h.select(`open`),o=A(r,n,e.target);if(a&&!Ki(b.pointerType))return;if(i&&o&&b.handleCloseOptions?.blockPointerEvents){let e=h.select(`floatingElement`);if(e){let t=b.handleCloseOptions?.getScope?.()??n.ownerDocument.body;du(b,{scopeElement:t,referenceElement:n,floatingElement:e})}}let s=is(w.current);if(i&&!o||s===0||!o&&b.restTimeoutPending&&e.movementX**2+e.movementY**2<2)return;b.restTimeout.clear();function c(){if(b.restTimeoutPending=!1,O())return;let e=h.select(`open`);!b.blockMouseMove&&(!e||o)&&k()&&h.setOpen(!0,Ro(bo,t,n))}b.pointerType===`touch`?co.flushSync(()=>{c()}):o&&i?c():(b.restTimeoutPending=!0,b.restTimeout.start(s,c))}}},[n,b,O,A,a,h,w,k])}var gu=`Escape`;function _u(e){return ti&&e.movementX===0&&e.movementY===0}function vu(e,t,n){switch(e){case`vertical`:return t;case`horizontal`:return n;default:return t||n}}function yu(e,t){return vu(t,e===`ArrowUp`||e===`ArrowDown`,e===`ArrowLeft`||e===`ArrowRight`)}function bu(e,t,n){return vu(t,e===`ArrowDown`,n?e===`ArrowLeft`:e===`ArrowRight`)||e===`Enter`||e===` `||e===``}function xu(e,t,n){return vu(t,n?e===ci:e===li,e===di)}function Su(e,t,n,r){return t===`both`||t===`horizontal`&&r?e===gu:vu(t,n?e===li:e===ci,e===ui)}function Cu(e,t){let{listRef:n,activeIndex:r,onNavigate:i=()=>{},enabled:a=!0,selectedIndex:o=null,allowEscape:s=!1,loopFocus:c=!1,nested:l=!1,rtl:u=!1,virtual:d=!1,focusItemOnOpen:f=`auto`,focusItemOnHover:p=!0,openOnArrowKeyDown:m=!0,disabledIndices:h=void 0,orientation:g=`vertical`,parentOrientation:v,id:y,resetOnPointerLeave:b=!0,externalTree:x,grid:S}=t,C=S!=null,w=`rootStore`in e?e.rootStore:e,T=w.useState(`open`),E=w.useState(`floatingElement`),D=w.useState(`domReferenceElement`),O=w.context.dataRef,k=zi(E),A=Li(D),j=ps(k),M=Js(),N=Ys(x),P=_.useRef(f),F=_.useRef(o??-1),I=_.useRef(null),L=_.useRef(!0),R=q(e=>{i(F.current===-1?null:F.current,e)}),z=_.useRef(!!E),ee=_.useRef(T),B=_.useRef(!1),te=_.useRef(!1),ne=_.useRef(null),V=ps(h),re=ps(T),H=ps(o),U=ps(b),W=oo(),ae=oo(),G=q(()=>{function e(e){d?N?.events.emit(`virtualfocus`,e):ne.current=xs(e,{sync:B.current,preventScroll:!0})}let t=n.current[F.current],r=te.current;t&&e(t),(B.current?e=>e():e=>W.request(e))(()=>{let i=n.current[F.current]||t;i&&(t||e(i),ue&&(r||!L.current)&&i.scrollIntoView?.({block:`nearest`,inline:`nearest`}))})});J(()=>{O.current.orientation=g},[O,g]),J(()=>{a&&(T&&E?(F.current=o??-1,P.current&&o!=null&&(te.current=!0,R())):z.current&&(F.current=-1,R()))},[a,T,E,o,R]),J(()=>{if(a){if(!T){B.current=!1;return}if(E){if(r==null){if(B.current=!1,H.current!=null)return;if(z.current&&(F.current=-1,G()),(!ee.current||!z.current)&&P.current&&(I.current!=null||P.current===!0&&I.current==null)){let e=0,t=()=>{n.current[0]==null?(e<2&&(e?e=>ae.request(e):queueMicrotask)(t),e+=1):(F.current=I.current==null||bu(I.current,g,u)||l?Sa(n):Ca(n),I.current=null,R())};t()}}else xa(n.current,r)||(F.current=r,G(),te.current=!1)}}},[a,T,E,r,H,l,n,g,u,R,G,ae]),J(()=>{if(!a||E||!N||d||!z.current)return;let e=N.nodesRef.current,t=e.find(e=>e.id===M)?.context?.elements.floating,n=ii(Je(D??t??null)),r=e.some(e=>e.context&&$(e.context.elements.floating,n));t&&!r&&L.current&&t.focus({preventScroll:!0})},[a,E,D,N,M,d]),J(()=>{ee.current=T,z.current=!!E}),J(()=>{T||(I.current=null,P.current=f)},[T,f]);let K=r!=null,oe=q(e=>{if(!re.current)return;let t=n.current.indexOf(e.currentTarget);t!==-1&&(F.current!==t||r!==t)&&(F.current=t,R(e))}),se=q(()=>v??N?.nodesRef.current.find(e=>e.id===M)?.context?.dataRef?.current.orientation),ce=q(()=>Sa(n,V.current)),le=q(e=>{if(L.current=!1,B.current=!0,e.which===229||!re.current&&e.currentTarget===j.current)return;if(l&&Su(e.key,g,u,C)){yu(e.key,se())||Hi(e),w.setOpen(!1,Ro(ko,e.nativeEvent)),ie(D)&&(d?N?.events.emit(`virtualfocus`,D):D.focus());return}let t=F.current,r=Sa(n,h),i=Ca(n,h);if(A||(e.key===`Home`&&(Hi(e),F.current=r,R(e)),e.key===`End`&&(Hi(e),F.current=i,R(e))),S!=null){let t=S(e,F.current,n,g,c,u,h,r,i);if(t!=null&&(F.current=t,R(e)),g===`both`)return}if(yu(e.key,g)){if(Hi(e),T&&!d&&ii(e.currentTarget.ownerDocument)===e.currentTarget){F.current=bu(e.key,g,u)?r:i,R(e);return}bu(e.key,g,u)?c?t>=i?s&&t!==n.current.length?F.current=-1:(B.current=!1,F.current=r):F.current=wa(n.current,{startingIndex:t,disabledIndices:h}):F.current=Math.min(i,wa(n.current,{startingIndex:t,disabledIndices:h})):c?t<=r?s&&t!==-1?F.current=n.current.length:(B.current=!1,F.current=i):F.current=wa(n.current,{startingIndex:t,decrement:!0,disabledIndices:h}):F.current=Math.max(r,wa(n.current,{startingIndex:t,decrement:!0,disabledIndices:h})),xa(n.current,F.current)&&(F.current=-1),R(e)}}),ue=_.useMemo(()=>({onFocus(e){B.current=!0,oe(e)},onClick:({currentTarget:e})=>e.focus({preventScroll:!0}),onMouseMove(e){_u(e)||(B.current=!0,te.current=!1,p&&oe(e))},onPointerLeave(e){if(!re.current||!L.current||e.pointerType===`touch`)return;B.current=!0;let t=e.relatedTarget;if(p&&!n.current.includes(t)&&U.current&&(ne.current?.(),ne.current=null,F.current=-1,R(e),!d)){let e=j.current,t=ii(Je(e));e&&$(e,t)&&e.focus({preventScroll:!0})}}}),[oe,re,j,p,n,R,U,d]),de=_.useMemo(()=>d&&T&&K&&{"aria-activedescendant":`${y}-${r}`},[d,T,K,y,r]),fe=_.useMemo(()=>({...A?{}:de,onKeyDown(e){if(e.key===`Tab`&&e.shiftKey&&T&&!d){let t=ai(e.nativeEvent);if(t&&!$(j.current,t))return;Hi(e),w.setOpen(!1,Ro(Do,e.nativeEvent)),ie(D)&&D.focus();return}le(e)},onPointerMove(e){_u(e)||(L.current=!0)}}),[de,le,j,A,w,T,d,D]),pe=_.useMemo(()=>{function e(e){w.setOpen(!0,Ro(ko,e.nativeEvent,e.currentTarget))}function t(e){f===`auto`&&Wi(e.nativeEvent)&&(P.current=!d)}function n(e){P.current=f,f===`auto`&&Gi(e.nativeEvent)&&(P.current=!0)}return{onKeyDown(t){let n=w.select(`open`);L.current=!1;let r=t.key.startsWith(`Arrow`),i=xu(t.key,se(),u),a=yu(t.key,g),o=(l?i:a)||t.key===`Enter`||t.key.trim()===``;if(d&&n)return le(t);if(n||m||!r){if(o){let e=yu(t.key,se());I.current=l&&e?null:t.key}if(l){i&&(Hi(t),n?(F.current=ce(),R(t)):e(t));return}a&&(H.current!=null&&(F.current=H.current),Hi(t),!n&&m?e(t):le(t),n&&R(t))}},onFocus(e){w.select(`open`)&&!d&&(F.current=-1,R(e))},onPointerDown:n,onPointerEnter:n,onMouseDown:t,onClick:t}},[le,f,ce,l,R,w,m,g,se,u,H,d]),me=_.useMemo(()=>({...de,...pe}),[de,pe]);return _.useMemo(()=>a?{reference:me,floating:fe,item:ue,trigger:pe}:{},[a,me,fe,pe,ue])}function wu(e,t){let{listRef:n,elementsRef:r,activeIndex:i,onMatch:a,disabledIndices:o,onTyping:s,enabled:c=!0,resetMs:l=750,selectedIndex:u=null}=t,d=`rootStore`in e?e.rootStore:e,f=d.useState(`open`),p=no(),m=_.useRef(``),h=_.useRef(u??i??-1),g=_.useRef(null),v=q(e=>{function t(e){return r?.current[e]}function c(e){let n=t(e);return n&&!Da(n)||n?.matches(`:disabled`)?!1:o==null||!Ta(lt,e,o)}function d(e,t,n=0){if(e.length===0)return-1;let r=(n%e.length+e.length)%e.length,i=t.toLowerCase();for(let t=0;t<e.length;t+=1){let n=(r+t)%e.length;if(e[n]?.toLowerCase().startsWith(i)&&c(n))return n}return-1}let _=n.current;if(m.current.length>0&&e.key===` `&&(Hi(e),s?.(!0)),m.current.length>0&&m.current[0]!==` `&&d(_,m.current)===-1&&e.key!==` `&&s?.(!1),_==null||e.key.length!==1||e.ctrlKey||e.metaKey||e.altKey)return;f&&e.key!==` `&&(Hi(e),s?.(!0));let v=m.current===``;v&&(h.current=u??i??-1),_.every((e,t)=>e&&c(t)?e[0]?.toLowerCase()!==e[1]?.toLowerCase():!0)&&m.current===e.key&&(m.current=``,h.current=g.current),m.current+=e.key,p.start(l,()=>{m.current=``,h.current=g.current,s?.(!1)});let y=((v?u??i??-1:h.current)??0)+1,b=d(_,m.current,y);b===-1?e.key!==` `&&(m.current=``,s?.(!1)):(a?.(b),g.current=b)}),y=q(e=>{let t=e.relatedTarget,n=d.select(`domReferenceElement`),r=d.select(`floatingElement`);$(n,t)||$(r,t)||(p.clear(),m.current=``,h.current=g.current,s?.(!1))});J(()=>{(f||u===null)&&(p.clear(),g.current=null,m.current!==``&&(m.current=``))},[f,u,p]);let b=_.useMemo(()=>({onKeyDown:v,onBlur:y}),[v,y]);return _.useMemo(()=>c?{reference:b,floating:b}:{},[c,b])}var Tu=.1,Eu=Tu*Tu,Du=.5;function Ou(e,t,n,r,i,a){return r>=t!=a>=t&&e<=(i-n)*(t-r)/(a-r)+n}function ku(e,t,n,r,i,a,o,s,c,l){let u=!1;return Ou(e,t,n,r,i,a)&&(u=!u),Ou(e,t,i,a,o,s)&&(u=!u),Ou(e,t,o,s,c,l)&&(u=!u),Ou(e,t,c,l,n,r)&&(u=!u),u}function Au(e,t,n){return e>=n.x&&e<=n.x+n.width&&t>=n.y&&t<=n.y+n.height}function ju(e,t,n,r,i,a){return e>=Math.min(n,i)&&e<=Math.max(n,i)&&t>=Math.min(r,a)&&t<=Math.max(r,a)}function Mu(e={}){let{blockPointerEvents:t=!1}=e,n=new to,r=({x:e,y:t,placement:r,elements:i,onClose:a,nodeId:o,tree:s})=>{let c=r?.split(`-`)[0],l=!1,u=null,d=null,f=typeof performance<`u`?performance.now():0;function p(e,t){let n=performance.now(),r=n-f;if(u===null||d===null||r===0)return u=e,d=t,f=n,!1;let i=e-u,a=t-d,o=i*i+a*a,s=r*r*Eu;return u=e,d=t,f=n,o<s}function m(){n.clear(),a()}return function(r){n.clear();let a=i.domReference,u=i.floating;if(!a||!u||c==null||e==null||t==null)return;let{clientX:d,clientY:f}=r,h=ai(r),g=r.type===`mouseleave`,_=$(u,h),v=$(a,h);if(_&&(l=!0,!g))return;if(v&&(l=!1,!g)){l=!0;return}if(g&&U(r.relatedTarget)&&$(u,r.relatedTarget))return;function y(){return!!(s&&Bi(s.nodesRef.current,o).length>0)}function b(){y()||m()}if(y())return;let x=a.getBoundingClientRect(),S=u.getBoundingClientRect(),C=e>S.right-S.width/2,w=t>S.bottom-S.height/2,T=S.width>x.width,E=S.height>x.height,D=(T?x:S).left,O=(T?x:S).right,k=(E?x:S).top,A=(E?x:S).bottom;if(c===`top`&&t>=x.bottom-1||c===`bottom`&&t<=x.top+1||c===`left`&&e>=x.right-1||c===`right`&&e<=x.left+1){b();return}let j=!1;switch(c){case`top`:j=ju(d,f,D,x.top+1,O,S.bottom-1);break;case`bottom`:j=ju(d,f,D,S.top+1,O,x.bottom-1);break;case`left`:j=ju(d,f,S.right-1,A,x.left+1,k);break;case`right`:j=ju(d,f,x.right-1,A,S.left+1,k)}if(j)return;if(l&&!Au(d,f,x)){b();return}if(!g&&p(d,f)){b();return}let M=!1;switch(c){case`top`:{let n=T?Du/2:Du*4,r=T||C?e+n:e-n,i=T?e-n:C?e+n:e-n,a=t+Du+1,o=C||T?S.bottom-Du:S.top,s=C?T?S.bottom-Du:S.top:S.bottom-Du;M=ku(d,f,r,a,i,a,S.left,o,S.right,s);break}case`bottom`:{let n=T?Du/2:Du*4,r=T||C?e+n:e-n,i=T?e-n:C?e+n:e-n,a=t-Du,o=C||T?S.top+Du:S.bottom,s=C?T?S.top+Du:S.bottom:S.top+Du;M=ku(d,f,r,a,i,a,S.left,o,S.right,s);break}case`left`:{let n=E?Du/2:Du*4,r=E||w?t+n:t-n,i=E?t-n:w?t+n:t-n,a=e+Du+1,o=w||E?S.right-Du:S.left,s=w?E?S.right-Du:S.left:S.right-Du;M=ku(d,f,o,S.top,s,S.bottom,a,r,a,i);break}case`right`:{let n=E?Du/2:Du*4,r=E||w?t+n:t-n,i=E?t-n:w?t+n:t-n,a=e-Du,o=w||E?S.left+Du:S.right,s=w?E?S.left+Du:S.right:S.left+Du;M=ku(d,f,a,r,a,i,o,S.top,s,S.bottom);break}}M?l||n.start(40,b):b()}};return r.__options={...e,blockPointerEvents:t},r}var Nu={...tu,disabled:e=>e.disabled,instantType:e=>e.instantType,isInstantPhase:e=>e.isInstantPhase,trackCursorAxis:e=>e.trackCursorAxis,disableHoverablePopup:e=>e.disableHoverablePopup,lastOpenChangeReason:e=>e.openChangeReason,closeOnClick:e=>e.closeOnClick,closeDelay:e=>e.closeDelay,adaptiveOrigin:e=>e.adaptiveOrigin},Pu=class extends Al{constructor(e,t,n){let r=new Jl;super(Fu(e,r,t,n),Iu(r),Nu)}setOpen=(e,t)=>{Hl(this,e,t,{extraState:{openChangeReason:t.reason}})};cancelPendingOpen(e){this.state.floatingRootContext.dispatchOpenChange(!1,Ro(yo,e))}};function Fu(e,t,n,r=!1){return{...Yl(t,n,r),disabled:!1,instantType:void 0,isInstantPhase:!1,trackCursorAxis:`none`,disableHoverablePopup:!1,openChangeReason:null,closeOnClick:!0,closeDelay:0,adaptiveOrigin:void 0,...e}}function Iu(e){return{popupRef:_.createRef(),onOpenChange:void 0,onOpenChangeComplete:void 0,triggerElements:e}}var Lu=Zo(function(e){let{disabled:t=!1,defaultOpen:n=!1,open:r,disableHoverablePopup:i=!1,trackCursorAxis:a=`none`,actionsRef:o,onOpenChange:s,onOpenChangeComplete:c,handle:l,triggerId:u,defaultTriggerId:d=null,children:f}=e,p=Il((e,t)=>new Pu({open:n,openProp:r,activeTriggerId:d,triggerIdProp:u},e,t));p.useControlledProp(`openProp`,r),p.useControlledProp(`triggerIdProp`,u),p.useContextCallback(`onOpenChange`,s),p.useContextCallback(`onOpenChangeComplete`,c);let m=p.useState(`open`),h=!t&&m,g=p.useState(`activeTriggerId`),v=p.useState(`mounted`),y=p.useState(`payload`);p.useSyncedValues({trackCursorAxis:a,disableHoverablePopup:i,disabled:t}),Wl(p,{closeOnActiveTriggerUnmount:!0});let{forceUnmount:b,transitionStatus:x}=Gl(h,p),S=p.useState(`isInstantPhase`),C=p.useState(`instantType`),w=p.useState(`lastOpenChangeReason`),T=_.useRef(null);J(()=>{m&&t&&p.setOpen(!1,Ro(No))},[m,t,p]),J(()=>{x===`ending`&&w===`none`||x!==`ending`&&S?(C!==`delay`&&(T.current=C),p.set(`instantType`,`delay`)):T.current!==null&&(p.set(`instantType`,T.current),T.current=null)},[x,S,w,C,p]),J(()=>{h&&(g??p.set(`payload`,void 0))},[p,g,h]),_.useImperativeHandle(o,()=>({unmount:b,close:()=>p.setOpen(!1,Ro(Io))}),[b,p]);let E=h||v||!t&&a!==`none`;return(0,Q.jsxs)(es.Provider,{value:p,children:[l&&(0,Q.jsx)(Ll,{handle:l,store:p}),E&&(0,Q.jsx)(Ru,{store:p,disabled:t,trackCursorAxis:a}),typeof f==`function`?f({payload:y}):f]})});function Ru({store:e,disabled:t,trackCursorAxis:n}){let r=e.useState(`floatingRootContext`),i=mc(r,{enabled:!t,referencePress:()=>e.select(`closeOnClick`)}),a=dc(r,{enabled:!t&&n!==`none`,axis:n===`none`?void 0:n}),o=_.useMemo(()=>ke(a.reference,i.reference),[a.reference,i.reference]);return Kl(e,{activeTriggerProps:o,inactiveTriggerProps:o,popupProps:i.floating??ut}),null}var zu=_.createContext(void 0);function Bu(){return _.useContext(zu)}var Vu=`data-base-ui-tooltip-trigger`;function Hu(e){if(`composedPath`in e){let t=e.composedPath();for(let e=0;e<t.length;e+=1){let n=t[e];if(U(n))return n}}let t=e.target;return U(t)?t:null}function Uu(e){let t=e;for(;t;){let e=t.closest(`[${Vu}]`);if(e)return e;let n=t.getRootNode();t=`host`in n&&U(n.host)?n.host:null}return null}var Wu=Qo(function(e,t){let{render:n,className:r,style:i,handle:a,payload:o,disabled:s,delay:c,closeOnClick:l=!0,closeDelay:u,id:d,...f}=e,p=ts(!0),m=nu(a)??p;if(!m)throw Error(We(82));let h=Lr(d),g=m.useState(`isTriggerActive`,h),v=m.useState(`isOpenedByTrigger`,h),y=m.useState(`floatingRootContext`),b=_.useRef(null),x=u??0,{registerTrigger:S,isMountedByThisTrigger:C}=Ul(h,b,m,{payload:o,closeOnClick:l,closeDelay:x}),w=Bu(),{activeIdRef:T,delayRef:E,isInstantPhase:D,hasProvider:O}=us(y,{open:v}),k=fu(y);m.useSyncedValue(`isInstantPhase`,D);let A=m.useState(`disabled`),j=s??A,M=ps(j),N=m.useState(`trackCursorAxis`),P=m.useState(`disableHoverablePopup`),F=_.useRef(!1),I=no(),L=_.useRef(void 0);function R(){return O&&T.current!=null?0:c??w??600}function z(e){let t=b.current;if(!t||!e)return!1;let n=Uu(e);return n!==null&&n!==t&&$(t,n)}function ee(e){let t=z(e);return F.current=t,t&&(k.openChangeTimeout.clear(),k.restTimeout.clear(),k.restTimeoutPending=!1,I.clear()),t}let B=hu(y,{enabled:!j,mouseOnly:!0,move:!1,handleClose:!P&&N!==`both`?Mu():null,restMs:R,delay(){return u==null&&O?{close:rs(E.current,`close`)}:{close:x}},triggerElementRef:b,isActiveTrigger:g,isClosing:()=>m.select(`transitionStatus`)===`ending`,shouldOpen(){return!F.current}}),te=su(y,{enabled:!j}).reference,ne=e=>{let t=F.current,n=Hu(e),r=ee(n),i=b.current,a=i&&n&&$(i,n);if(r&&m.select(`open`)&&m.select(`lastOpenChangeReason`)===`trigger-hover`){m.setOpen(!1,Ro(bo,e));return}if(t&&!r&&a&&!M.current&&!m.select(`open`)&&i&&Ki(L.current)){let t=()=>{!F.current&&!M.current&&!m.select(`open`)&&m.setOpen(!0,Ro(bo,e,i))},n=R();n===0?(I.clear(),t()):I.start(n,t)}},V=m.useState(`triggerProps`,C);return mt(`button`,e,{state:{open:v},ref:[t,S,b],props:[B,te,C||N!==`none`?V:void 0,{onMouseOver(e){ne(e.nativeEvent)},onFocus(e){z(Hu(e.nativeEvent))&&e.preventBaseUIHandler()},onMouseLeave(){F.current=!1,I.clear(),L.current=void 0},onPointerEnter(e){L.current=e.pointerType},onPointerDown(e){L.current=e.pointerType,m.set(`closeOnClick`,l),l&&!m.select(`open`)&&m.cancelPendingOpen(e.nativeEvent)},onClick(e){l&&!m.select(`open`)&&m.cancelPendingOpen(e.nativeEvent)},id:h,[ji]:j?``:void 0,[Vu]:j?void 0:``},f],stateAttributesMapping:Di})}),Gu=_.createContext(void 0);function Ku(){let e=_.useContext(Gu);if(e===void 0)throw Error(We(70));return e}var qu=_.forwardRef(function(e,t){let{children:n,container:r,className:i,render:a,style:o,...s}=e,{node:c,subtree:l}=Hs({container:r,ref:t,componentProps:e,elementProps:s});return!l&&!c?null:(0,Q.jsxs)(_.Fragment,{children:[l,c&&co.createPortal(n,c)]})}),Ju=_.forwardRef(function(e,t){let{keepMounted:n=!1,...r}=e;return ts().useState(`mounted`)||n?(0,Q.jsx)(Gu.Provider,{value:n,children:(0,Q.jsx)(qu,{ref:t,...r})}):null}),Yu=_.createContext(void 0);function Xu(){let e=_.useContext(Yu);if(e===void 0)throw Error(We(71));return e}var Zu=_.createContext(void 0);function Qu(){return _.useContext(Zu)?.direction??`ltr`}var $u=e=>({name:`arrow`,options:e,async fn(t){let{x:n,y:r,placement:i,rects:a,platform:o,elements:s,middlewareData:c}=t,{element:l,padding:u=0,offsetParent:d=`real`}=ta(e,t)||{};if(l==null)return{};let f=ya(u),p={x:n,y:r},m=sa(i),h=aa(m),g=await o.getDimensions(l),_=m===`y`,v=_?`top`:`left`,y=_?`bottom`:`right`,b=_?`clientHeight`:`clientWidth`,x=a.reference[h]+a.reference[m]-p[m]-a.floating[h],S=p[m]-a.reference[m],C=d===`real`?await o.getOffsetParent?.(l):s.floating,w=s.floating[b]||a.floating[h];(!w||!await o.isElement?.(C))&&(w=s.floating[b]||a.floating[h]);let T=x/2-S/2,E=w/2-g[h]/2-1,D=Math.min(f[v],E),O=Math.min(f[y],E),k=D,A=w-g[h]-O,j=w/2-g[h]/2+T,M=ea(k,j,A),N=!c.arrow&&ra(i)!=null&&j!==M&&a.reference[h]/2-(j<k?D:O)-g[h]/2<0,P=N?j<k?j-k:j-A:0;return{[m]:p[m]+P,data:{[m]:M,centerOffset:j-M-P,...N&&{alignmentOffset:P}},reset:N}}}),ed=(e,t)=>{let{name:n,fn:r}=$u(e);return{name:n,fn:r,options:[e,t]}},td={name:`hide`,async fn(e){let{width:t,height:n,x:r,y:i}=e.rects.reference,a=t===0&&n===0&&r===0&&i===0,o=await e.platform.detectOverflow(e,{elementContext:`reference`});return{data:{referenceHidden:o.top-n>=0||o.right-t>=0||o.bottom-n>=0||o.left-t>=0||a}}}},nd={sideX:`left`,sideY:`top`},rd=`--available-width`,id=`--available-height`,ad=`--anchor-width`,od=`--anchor-height`,sd=`--transform-origin`,cd=rd,ld=id;function ud(e,t,n){let r=e===`inline-start`||e===`inline-end`;return{top:`top`,right:r?n?`inline-start`:`inline-end`:`right`,bottom:`bottom`,left:r?n?`inline-end`:`inline-start`:`left`}[t]}function dd(e,t,n){let{rects:r,placement:i}=e;return{side:ud(t,na(i),n),align:ra(i)||`center`,anchor:{width:r.reference.width,height:r.reference.height},positioner:{width:r.floating.width,height:r.floating.height}}}function fd(e){return pd(e,iu)}function pd(e,t){let{anchor:n,positionMethod:r=`absolute`,side:i=`bottom`,sideOffset:a=0,align:o=`center`,alignOffset:s=0,collisionBoundary:c,collisionPadding:l=5,sticky:u=!1,arrowPadding:d=5,disableAnchorTracking:f=!1,inline:p,keepMounted:m=!1,floatingRootContext:h,mounted:g,collisionAvoidance:v,shift:y,nodeId:b,adaptiveOrigin:x,lazyFlip:S=!1,externalTree:C}=e,[w,T]=_.useState(null);!g&&w!==null&&T(null);let E=v.side||`flip`,D=v.align||`flip`,O=v.fallbackAxisSide||`end`,k=y?.crossAxis??!1,A=y?.rootBoundary,j=typeof n==`function`?n:void 0,M=q(j),N=j?M:n,P=ps(n),F=ps(g),I=Qu()===`rtl`,L=w||{top:`top`,right:`right`,bottom:`bottom`,left:`left`,"inline-end":I?`left`:`right`,"inline-start":I?`right`:`left`}[i],R=o===`center`?L:`${L}-${o}`,z=l;typeof z==`number`?z={top:z,right:z,bottom:z,left:z}:z&&={top:z.top||0,right:z.right||0,bottom:z.bottom||0,left:z.left||0};let ee=+(i===`bottom`),B=+(i===`top`),te=+(i===`right`),ne=+(i===`left`),re={boundary:c===`clipping-ancestors`?`clippingAncestors`:c,padding:z},H=_.useRef(null),U=ps(a),ie=ps(s),W=typeof a==`function`?0:a,ae=typeof s==`function`?0:s,G=[];p&&G.push(p),G.push(pl(e=>{let t=dd(e,i,I),n=typeof U.current==`function`?U.current(t):U.current,r=typeof ie.current==`function`?ie.current(t):ie.current;return{mainAxis:n,crossAxis:r,alignmentAxis:r}},[W,ae,I,i]));let K=D===`none`&&E!==`shift`,oe=!K&&(u||k||E===`shift`),se=E===`none`?null:gl({...re,padding:{top:z.top+1+ee,right:z.right+1+ne,bottom:z.bottom+1+B,left:z.left+1+te},mainAxis:!k&&E===`flip`,crossAxis:D===`flip`&&`alignment`,fallbackAxisSideDirection:O}),ce=K?null:ml({...re,rootBoundary:A,mainAxis:D!==`none`,crossAxis:oe,limiter:u||k?void 0:hl(e=>{if(!H.current)return{};let{width:t,height:n}=H.current.getBoundingClientRect(),r=oa(na(e.placement)),i=r===`y`?t:n,a=r===`y`?z.left+z.right:z.top+z.bottom;return{offset:i/2+a/2}})},[re,u,k,A,z,D]);E===`shift`||D===`shift`||o===`center`?G.push(ce,se):G.push(se,ce),G.push(_l({...re,apply({elements:{floating:e},availableWidth:t,availableHeight:n,rects:r}){if(!F.current)return;let i=e.style;i.setProperty(cd,`${t}px`),i.setProperty(ld,`${n}px`);let a=V(e).devicePixelRatio||1,{x:o,y:s,width:c,height:l}=r.reference,u=(Math.round((o+c)*a)-Math.round(o*a))/a,d=(Math.round((s+l)*a)-Math.round(s*a))/a;i.setProperty(ad,`${u}px`),i.setProperty(od,`${d}px`)}}),ed(e=>({element:H.current||Je(e.elements.floating).createElement(`div`),padding:H.current?d:0,offsetParent:`floating`}),[d]),{name:`transformOrigin`,fn(e){let{elements:{floating:t},middlewareData:n,placement:r,platform:o,rects:s,y:c}=e,l=na(r),u=ra(r),d=oa(l)===`y`,f=H.current,p=typeof a==`function`?a(dd(e,i,I)):a,m;m=!f&&u&&Math.abs(d?n.shift?.x||0:n.shift?.y||0)<=1?u===`start`===(d&&o.isRTL?.(t)===!0)?`100%`:`0%`:`${(d?n.arrow?.x||0:n.arrow?.y||0)+(d?f?.clientWidth||0:f?.clientHeight||0)/2}px`;let h=l===`top`||l===`left`?`calc(100% + ${p}px)`:`${-p}px`;return oe&&d&&Math.abs(n.shift?.y||0)>p&&(h=`${s.reference.y+s.reference.height/2-c}px`),t.style.setProperty(sd,d?`${m} ${h}`:`${h} ${m}`),{}}},td,x),J(()=>{!g&&h&&h.update({referenceElement:null,floatingElement:null,domReferenceElement:null,positionReference:null})},[g,h]);let le=_.useMemo(()=>({ancestorScroll:!f,elementResize:!f&&typeof ResizeObserver<`u`,layoutShift:!f&&typeof IntersectionObserver<`u`}),[f]),{refs:ue,elements:de,x:fe,y:pe,middlewareData:me,update:he,placement:ge,context:_e,isPositioned:ve,floatingStyles:ye}=t({rootContext:h,open:m?g:void 0,placement:R,middleware:G,strategy:r,whileElementsMounted:m?void 0:(...e)=>el(...e,le),nodeId:b,externalTree:C}),{sideX:be,sideY:xe}=me.adaptiveOrigin||nd,Se=ve?r:`fixed`,Ce=_.useMemo(()=>{let e;return e=ve?x?{position:Se,[be]:fe,[xe]:pe}:{...ye,position:Se}:{position:Se,top:0,left:0},e[cd]=`100vw`,e[ld]=`100vh`,ve||(e.opacity=0),e},[x,Se,be,fe,xe,pe,ye,ve]),we=_.useRef(null);J(()=>{if(!g)return;let e=P.current,t=typeof e==`function`?e():e,n=(md(t)?t.current:t)||null;n!==we.current&&(ue.setPositionReference(n),we.current=n)},[g,ue,N,P]),_.useEffect(()=>{if(!g)return;let e=P.current;typeof e!=`function`&&md(e)&&e.current!==we.current&&(ue.setPositionReference(e.current),we.current=e.current)},[g,ue,N,P]),_.useEffect(()=>{if(m&&g&&de.reference&&de.floating)return el(de.reference,de.floating,he,le)},[m,g,de,he,le]);let Te=na(ge),Ee=ud(i,Te,I),De=ra(ge)||`center`,Oe=!!me.hide?.referenceHidden;J(()=>{S&&g&&ve&&Te!==L&&T(Te)},[S,g,ve,Te,L]);let ke=_.useMemo(()=>({position:`absolute`,top:me.arrow?.y,left:me.arrow?.x}),[me.arrow]),Ae=me.arrow?.centerOffset!==0;return _.useMemo(()=>({positionerStyles:Ce,arrowStyles:ke,arrowRef:H,arrowUncentered:Ae,side:Ee,align:De,physicalSide:Te,anchorHidden:Oe,refs:ue,context:_e,isPositioned:ve,update:he}),[Ce,ke,H,Ae,Ee,De,Te,Oe,ue,_e,ve,he])}function md(e){return e!=null&&`current`in e}function hd(e){return e===`starting`?Ps:ut}function gd(e,t,{styles:n,transitionStatus:r,props:i,refs:a,hidden:o,inert:s=!1}){let c={...n};return s&&(c.pointerEvents=`none`),mt(`div`,e,{state:t,ref:a,props:[{role:`presentation`,hidden:o,style:c},hd(r),i],stateAttributesMapping:ki})}var _d=_.forwardRef(function(e,t){let{render:n,className:r,anchor:i,positionMethod:a=`absolute`,side:o=`top`,align:s=`center`,sideOffset:c=0,alignOffset:l=0,collisionBoundary:u=`clipping-ancestors`,collisionPadding:d=5,arrowPadding:f=5,sticky:p=!1,disableAnchorTracking:m=!1,collisionAvoidance:h=Ls,style:g,...v}=e,y=ts(),b=Ku(),x=y.useState(`open`),S=y.useState(`mounted`),C=y.useState(`trackCursorAxis`),w=y.useState(`disableHoverablePopup`),T=y.useState(`floatingRootContext`),E=y.useState(`instantType`),D=y.useState(`transitionStatus`),O=fd({anchor:i,positionMethod:a,floatingRootContext:T,mounted:S,side:o,sideOffset:c,align:s,alignOffset:l,collisionBoundary:u,collisionPadding:d,sticky:p,arrowPadding:f,disableAnchorTracking:m,keepMounted:b,collisionAvoidance:h,adaptiveOrigin:y.useState(`adaptiveOrigin`)}),k=gd(e,_.useMemo(()=>({open:x,side:O.side,align:O.align,anchorHidden:O.anchorHidden,instant:C===`none`?E:`tracking-cursor`}),[x,O.side,O.align,O.anchorHidden,C,E]),{styles:O.positionerStyles,transitionStatus:D,props:v,refs:[t,y.useStateSetter(`positionerElement`)],hidden:!S,inert:!x||C===`both`||w});return(0,Q.jsx)(Yu.Provider,{value:O,children:k})}),vd=_.forwardRef(function(e,t){let{render:n,className:r,style:i,...a}=e,o=ts(),{side:s,align:c}=Xu(),l=o.useState(`open`),u=o.useState(`instantType`),d=o.useState(`transitionStatus`),f=o.useState(`popupProps`),p=o.useState(`floatingRootContext`),m=o.useState(`disabled`),h=o.useState(`closeDelay`);po({open:l,ref:o.context.popupRef,onComplete(){l&&o.context.onOpenChangeComplete?.(!0)}}),pu(p,{enabled:!m,closeDelay:h});let g=o.useStateSetter(`popupElement`);return mt(`div`,e,{state:{open:l,side:s,align:c,instant:u,transitionStatus:d},ref:[t,o.context.popupRef,g],props:[Pl,f,hd(d),a],stateAttributesMapping:Ai})}),yd=function(e){let{delay:t,closeDelay:n,timeout:r=400}=e,i=_.useMemo(()=>({open:t,close:n}),[t,n]);return(0,Q.jsx)(zu.Provider,{value:t,children:(0,Q.jsx)(ls,{delay:i,timeoutMs:r,children:e.children})})};function bd(e){return ot(19)?e:e?`true`:void 0}function xd(e){let[t,n]=_.useState({current:e,previous:null});return Object.is(e,t.current)||n({current:e,previous:t.current}),t.previous}var Sd=_.createContext(void 0);function Cd({children:e,container:t}){return(0,Q.jsx)(Sd.Provider,{value:t,children:e})}function wd(e){let t=_.useContext(Sd);return e??t}function Td({delay:e=0,...t}){return(0,Q.jsx)(yd,{"data-slot":`tooltip-provider`,delay:e,...t})}function Ed({disableHoverablePopup:e=!0,...t}){return(0,Q.jsx)(Lu,{"data-slot":`tooltip`,disableHoverablePopup:e,...t})}function Dd({className:e,...t}){return(0,Q.jsx)(Wu,{className:e,"data-slot":`tooltip-trigger`,...t})}function Od({className:e,side:t=`top`,sideOffset:n=4,align:r=`center`,alignOffset:i=0,children:a,interactive:o=!1,portalContainer:s,...c}){let l=wd(s),u=_.useRef(null);return(0,Q.jsx)(Ju,{container:l,ref:u,children:(0,Q.jsx)(Cd,{container:u,children:(0,Q.jsx)(_d,{align:r,alignOffset:i,side:t,sideOffset:n,className:`isolate z-50`,children:(0,Q.jsx)(vd,{"data-slot":`tooltip-content`,className:Z(`z-50 inline-flex w-fit max-w-xs origin-(--transform-origin) items-center gap-1.5 rounded-lg border border-[color:color-mix(in_oklab,var(--border)_10%,transparent)] bg-[color:color-mix(in_oklab,var(--muted)_95%,transparent)] px-1.5 py-1 popup-text-xs-plus text-[color:var(--foreground)] shadow-md has-data-[slot=kbd]:pr-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95`,o?null:`pointer-events-none`,e),...c,children:a})})})})}function kd({className:e,...t}){return _.createElement(`label`,{...t,"data-slot":`label`,className:Z(`flex items-center gap-2 text-xs/relaxed leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50`,e)})}var Ad=Dt(`group/field flex w-full gap-field-control data-[invalid=true]:text-[color:var(--destructive)]`,{variants:{orientation:{vertical:`flex-col *:w-full [&>.sr-only]:w-auto`,horizontal:`flex-row items-center has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px has-[>[data-slot=field-content]]:[&>[role=radio][data-size=lg]]:mt-0.5`,responsive:`flex-col *:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto [&>.sr-only]:w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px @md/field-group:has-[>[data-slot=field-content]]:[&>[role=radio][data-size=lg]]:mt-0.5`}},defaultVariants:{orientation:`vertical`}});function jd({className:e,orientation:t=`vertical`,...n}){return(0,Q.jsx)(`div`,{role:`group`,"data-slot":`field`,"data-orientation":t,className:Z(Ad({orientation:t}),e),...n})}function Md({className:e,...t}){return(0,Q.jsx)(kd,{"data-slot":`field-label`,className:Z(`group/field-label peer/field-label flex w-fit gap-2 text-[color:color-mix(in_oklab,var(--foreground)_60%,transparent)] leading-snug group-data-[disabled=true]/field:opacity-50 has-data-checked:bg-[color:color-mix(in_oklab,var(--primary)_5%,transparent)] has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border has-[>[data-slot=field]]:border-[color:color-mix(in_oklab,var(--border)_12%,transparent)] *:data-[slot=field]:p-2 dark:has-data-checked:bg-[color:color-mix(in_oklab,var(--primary)_10%,transparent)]`,`has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col group-has-[>[data-slot=checkbox][data-size=sm]]/field:text-xs-plus group-has-[>[data-slot=checkbox][data-checked]]/field:text-[color:var(--foreground)] group-has-[>[data-slot=checkbox][data-size=lg]]/field:text-sm/relaxed group-has-[>[data-slot=radio-group-item][data-size=lg]]/field:text-sm/relaxed`,e),...t})}var Nd={down:void 0,left:`rotate-90`,right:`-rotate-90`,up:`rotate-180`};function Pd({className:e,direction:t=`down`,openClassName:n,...r}){return(0,Q.jsx)(M,{"aria-hidden":`true`,"data-slot":`primitive-arrow-icon`,className:Z(`pointer-events-none shrink-0 size-3.5 text-[color:color-mix(in_oklab,var(--foreground)_60%,transparent)] transition-transform duration-200 ease-out group-hover/button:text-[color:color-mix(in_oklab,var(--foreground)_90%,transparent)] group-active/button:text-[color:color-mix(in_oklab,var(--foreground)_90%,transparent)] group-aria-expanded/button:text-[color:color-mix(in_oklab,var(--foreground)_90%,transparent)] group-aria-pressed/button:text-[color:color-mix(in_oklab,var(--foreground)_90%,transparent)] group-data-open/button:text-[color:color-mix(in_oklab,var(--foreground)_90%,transparent)] group-data-popup-open/button:text-[color:color-mix(in_oklab,var(--foreground)_90%,transparent)] group-data-[state=open]/button:text-[color:color-mix(in_oklab,var(--foreground)_90%,transparent)]`,Nd[t],n,e),...r})}var Fd={compact:{height:20,intensity:`normal`},default:{height:24,intensity:`medium`},large:{height:48,intensity:`dense`}};function Id(e){return e===`left`||e===`right`}function Ld(e){return e===`dense`?{fadeStop:90,solidStop:24}:e===`medium`?{fadeStop:82,solidStop:16}:{fadeStop:100,solidStop:0}}function Rd(e){return`${Math.max(0,Number(e.toFixed(2)))}px`}function zd({height:e,intensity:t,preset:n}){let r=n?Fd[n]:void 0;return{height:e??r?.height??24,intensity:t??r?.intensity??`normal`}}function Bd(e){return`linear-gradient(${e===`left`||e===`right`?`to right`:`to bottom`}, transparent 0%, transparent var(--scroll-fade-leading-solid), black var(--scroll-fade-leading-fade), black calc(100% - var(--scroll-fade-trailing-fade)), transparent calc(100% - var(--scroll-fade-trailing-solid)), transparent 100%)`}function Vd(e){return e===`bottom`?`top`:e===`top`?`bottom`:e===`left`?`right`:`left`}function Hd({intensity:e,showFade:t,size:n}){if(!t)return{fade:`0px`,solid:`0px`};let{fadeStop:r,solidStop:i}=Ld(e);return e===`normal`?{fade:Rd(n),solid:`0px`}:{fade:Rd(r/100*n),solid:Rd(i/100*n)}}function Ud({showOppositeFade:e,showPrimaryFade:t,side:n}){return n===`top`||n===`left`?{leadingFadeVisible:t,trailingFadeVisible:e}:{leadingFadeVisible:e,trailingFadeVisible:t}}function Wd({intensity:e,showOppositeFade:t,showPrimaryFade:n,side:r,size:i,style:a}){let o=Bd(r),{leadingFadeVisible:s,trailingFadeVisible:c}=Ud({showOppositeFade:t,showPrimaryFade:n,side:r}),l=Hd({intensity:e,size:i,showFade:s}),u=Hd({intensity:e,size:i,showFade:c});return{...a,"--scroll-fade-leading-fade":l.fade,"--scroll-fade-leading-solid":l.solid,"--scroll-fade-mask-image":o,"--scroll-fade-trailing-fade":u.fade,"--scroll-fade-trailing-solid":u.solid}}function Gd(e,t){return e.length===t.length&&e.every((e,n)=>Object.is(e,t[n]))}function Kd(e){let t=(0,_.useRef)(e),n=(0,_.useRef)(0);return Gd(t.current,e)||(t.current=e,n.current+=1),n.current}function qd({dependencyVersion:e,dismissOnFirstInteraction:t,interactionVersion:n}){let[r,i]=(0,_.useState)(!1),a=(0,_.useRef)(n);return(0,_.useLayoutEffect)(()=>{i(!1)},[e,t]),(0,_.useLayoutEffect)(()=>{if(!t){a.current=n;return}a.current!==n&&(a.current=n,i(!0))},[t,n]),{dismissInteraction:(0,_.useCallback)(()=>{i(!0)},[]),interactionDismissed:r}}function Jd({interactionDismissed:e,isHorizontal:t,side:n,visibilityMode:r,viewportElement:i}){let a=t?i.scrollLeft:i.scrollTop,o=t?i.clientWidth:i.clientHeight,s=t?i.scrollWidth:i.scrollHeight,c=s>o+1,l=a<=1,u=a+o>=s-1;return e||!c?!1:r===`terminal`?n===`top`||n===`left`?u:l:n===`top`||n===`left`?!l:!u}function Yd({dependencyVersion:e,dismissInteraction:t,dismissOnFirstInteraction:n,interactionDismissed:r,isHorizontal:i,side:a,visibilityMode:o,viewportElement:s}){let[c,l]=(0,_.useState)(!1);return(0,_.useLayoutEffect)(()=>{if(!s){l(!1);return}let e=()=>{let e=Jd({interactionDismissed:r,isHorizontal:i,side:a,visibilityMode:o,viewportElement:s});l(t=>t===e?t:e)},c=()=>{if(n){t(),l(!1);return}e()};e(),s.addEventListener(`scroll`,c);let u=null;if(typeof ResizeObserver<`u`){u=new ResizeObserver(e),u.observe(s);let t=s.firstElementChild;t&&u.observe(t)}return()=>{s.removeEventListener(`scroll`,c),u?.disconnect()}},[e,t,n,r,i,a,o,s]),c}function Xd({disableTransition:e,dismissOnFirstInteraction:t,forceVisible:n,height:r,intensity:i,interactionWatch:a,preset:o,showOppositeSide:s,side:c,style:l,visibilityMode:u,viewportElement:d,watch:f}){let p=Kd(f),m=Kd(a),h=Id(c),g=zd({height:r,intensity:i,preset:o}),_=Vd(c),{dismissInteraction:v,interactionDismissed:y}=qd({dependencyVersion:p,dismissOnFirstInteraction:t,interactionVersion:m}),b=Yd({dependencyVersion:p,dismissInteraction:v,dismissOnFirstInteraction:t,interactionDismissed:y,isHorizontal:h,side:c,visibilityMode:u,viewportElement:d}),x=Yd({dependencyVersion:p,dismissInteraction:v,dismissOnFirstInteraction:t,interactionDismissed:y,isHorizontal:h,side:_,visibilityMode:u,viewportElement:d}),S=s&&x,C=n||b,w=n||C||S;return{isHorizontal:h,rootStyle:{"--scroll-fade-size":`${g.height}px`},viewportStyle:Wd({intensity:g.intensity,showOppositeFade:S,showPrimaryFade:C,side:c,size:g.height,style:e?{...l,transition:`none`}:l}),viewportVisible:w}}function Zd({setViewportElement:e,viewportRef:t}){return(0,_.useCallback)(n=>{if(e(n),t){if(typeof t==`function`){t(n);return}t.current=n}},[e,t])}function Qd({attachViewport:e,className:t,isHorizontal:n,props:r,scrollBoundaryBehavior:i,side:a,viewportStyle:o,viewportVisible:s,children:c}){let{"data-slot":l,...u}=r;return(0,Q.jsx)(`div`,{...u,className:Z(n?`overflow-x-auto overflow-y-hidden`:`overflow-x-hidden overflow-y-auto`,i===`chain`?`overscroll-auto`:`overscroll-contain`,t),"data-scroll-boundary-behavior":i,"data-side":a,"data-slot":l??`scroll-fade-viewport`,"data-scroll-fade-viewport":``,"data-visible":s?`true`:`false`,ref:e,style:o,children:c})}function $d({children:e,className:t,containerClassName:n,containerRef:r,disableTransition:i=!1,dismissOnFirstInteraction:a=!1,forceVisible:o=!1,height:s,intensity:c,interactionWatch:l=[],preset:u,scrollBoundaryBehavior:d=`contain`,side:f=`bottom`,showOppositeSide:p=!1,style:m,visibilityMode:h=`overflow`,viewportRef:g,watch:v=[],...y}){let[b,x]=(0,_.useState)(null),S=Zd({setViewportElement:x,viewportRef:g}),{isHorizontal:C,rootStyle:w,viewportStyle:T,viewportVisible:E}=Xd({disableTransition:i,dismissOnFirstInteraction:a,forceVisible:o,height:s,intensity:c,interactionWatch:l,preset:u,showOppositeSide:p,side:f,style:m,visibilityMode:h,viewportElement:b,watch:v});return(0,Q.jsx)(`div`,{className:Z(`relative`,n),"data-slot":`scroll-fade`,ref:r,style:w,children:(0,Q.jsx)(Qd,{attachViewport:S,className:t,isHorizontal:C,props:y,scrollBoundaryBehavior:d,side:f,viewportStyle:T,viewportVisible:E,children:e})})}var ef=_.createContext(null),tf=_.createContext(null),nf=[`flex flex-col pt-2 pb-6 first:border-t-0 data-[toolcraft-section-actions]:first:border-t`,`border-t border-[color:color-mix(in_oklab,var(--border)_8%,transparent)]`,`transition-colors duration-150 ease-out hover:bg-[color:color-mix(in_oklab,var(--foreground)_3%,transparent)]`].join(` `);function rf({children:e,className:t,...n}){return(0,Q.jsx)(`section`,{...n,className:Z(nf,`group/control-section gap-[14px]`,t),children:e})}function af({children:e,className:t}){return(0,Q.jsx)(`div`,{className:Z(`flex min-w-0 flex-col gap-[14px]`,t),"data-control-list":``,children:e})}function of({action:e,collapsed:t=!1,collapsible:n=!1,children:r,collapseLabel:i,expandLabel:a,onCollapsedChange:o}){let s=sf(r),c=t?a??`展开${s}`:i??`收起${s}`,l=i||a?c:`${c}分组`,u=_.useCallback(()=>{n&&o?.(!t)},[t,n,o]);function d(e){!n||e.key!==`Enter`&&e.key!==` `||(e.preventDefault(),u())}function f(e){e.stopPropagation()}return(0,Q.jsxs)(`div`,{"aria-expanded":n?!t:void 0,"aria-label":n?c:void 0,className:Z(`flex h-9 min-w-0 items-center justify-between gap-2 px-3`,n&&`cursor-pointer select-none`),"data-collapsed":n?String(t):void 0,"data-collapsible":n?``:void 0,"data-slot":`control-section-header`,onClick:n?u:void 0,onKeyDown:d,role:n?`button`:void 0,tabIndex:n?0:void 0,children:[(0,Q.jsx)(`div`,{className:`flex min-w-0 items-center gap-1 has-data-[icon-active=true]:[&_[data-slot=panel-title]]:text-[color:var(--link)]`,children:r}),e||n?(0,Q.jsxs)(`div`,{className:`inline-flex shrink-0 items-center gap-1`,onClick:f,onKeyDown:f,onPointerDown:f,children:[e,n?(0,Q.jsxs)(Ed,{children:[(0,Q.jsx)(Dd,{render:(0,Q.jsx)(Sr,{"aria-expanded":!t,"aria-label":l,"data-control-section-collapse-button":``,onClick:u,size:`icon-sm`,type:`button`,variant:`ghost`}),children:(0,Q.jsx)(Pd,{direction:t?`down`:`up`})}),(0,Q.jsx)(Od,{side:`top`,children:c})]}):null]}):null]})}function sf(e){let t=cf(e).trim();return t.length>0?t:`分组`}function cf(e){return typeof e==`string`||typeof e==`number`?String(e):_.isValidElement(e)?cf(e.props.children):Array.isArray(e)?e.map(cf).join(``):``}function lf({allowCompoundDividers:e=!1,children:t,compoundDividerPlacement:n=`both`,flush:r=!1}){let i=n===`both`||n===`top`,a=n===`both`||n===`bottom`;return(0,Q.jsx)(`div`,{className:Z(`min-w-0`,!r&&`px-3`,e&&a&&`has-data-[control-section-divider=compound]:relative has-data-[control-section-divider=compound]:pb-[18px] has-data-[control-section-divider=compound]:after:absolute has-data-[control-section-divider=compound]:after:bottom-0 has-data-[control-section-divider=compound]:after:h-px has-data-[control-section-divider=compound]:after:bg-[color:color-mix(in_oklab,var(--border)_8%,transparent)]`,e&&i&&`has-data-[control-section-divider=compound]:pt-[18px] has-data-[control-section-divider=compound]:before:absolute has-data-[control-section-divider=compound]:before:top-0 has-data-[control-section-divider=compound]:before:h-px has-data-[control-section-divider=compound]:before:bg-[color:color-mix(in_oklab,var(--border)_8%,transparent)]`,e&&a&&(r?`has-data-[control-section-divider=compound]:after:inset-x-0`:`has-data-[control-section-divider=compound]:after:inset-x-3`),e&&i&&(r?`has-data-[control-section-divider=compound]:before:inset-x-0`:`has-data-[control-section-divider=compound]:before:inset-x-3`)),"data-control-item-compound-divider-placement":e?n:void 0,"data-control-item-compound-context":e?``:void 0,children:t})}function uf({children:e}){return(0,Q.jsx)(`p`,{className:`m-0 text-2xs leading-none font-semibold text-[color:color-mix(in_oklab,var(--foreground)_75%,transparent)] uppercase transition-colors duration-150 ease-out`,"data-slot":`panel-title`,children:e})}function df(e){let t=_.useContext(ef);return t&&t.label===e?t.action:null}function ff(e){let t=_.useContext(tf);return t&&t.label===e?t.help:null}function pf({children:e,className:t,textClassName:n,title:r,...i}){let a=mf(e),o=hf(e,a),s=df(a),c=ff(a);return(0,Q.jsxs)(`span`,{className:Z(`group/keyframe-control-label inline-flex min-w-0 max-w-full items-center gap-0 has-data-[icon-active=true]:[&_[data-slot=template-field-label-text]]:text-[color:var(--link)] has-data-[icon-active=true]:[&_[data-slot=template-field-label-text]]:opacity-100`,t),"data-control-field-label":``,"data-slot":`field-label`,children:[(0,Q.jsx)(Md,{className:`min-w-0 max-w-full gap-0`,title:r??a,...i,children:(0,Q.jsx)($d,{className:`no-scrollbar min-w-0 max-w-full`,containerClassName:`min-w-0 max-w-full`,preset:`compact`,side:`right`,watch:[a??``],children:(0,Q.jsx)(`span`,{className:Z(`block whitespace-nowrap opacity-60`,n,`min-w-max`),"data-slot":`template-field-label-text`,title:a,children:o})})}),c?(0,Q.jsxs)(Ed,{children:[(0,Q.jsx)(Dd,{render:(0,Q.jsx)(`button`,{"aria-label":`${a??`Control`} help`,className:`ml-[3px] inline-flex size-3.5 shrink-0 items-center justify-center rounded-full text-[color:color-mix(in_oklab,var(--foreground)_40%,transparent)] transition-colors duration-150 ease-out hover:text-[color:color-mix(in_oklab,var(--foreground)_60%,transparent)] focus-visible:outline-none`,"data-control-field-help":``,type:`button`}),children:(0,Q.jsx)(ee,{className:`size-3.5`,weight:`fill`})}),(0,Q.jsx)(Od,{className:`max-w-[240px] whitespace-normal text-left`,side:`top`,children:c})]}):null,s]})}function mf(e){let t=_.Children.toArray(e).map(e=>typeof e==`string`||typeof e==`number`?String(e):null);if(t.length&&!t.some(e=>e===null))return t.join(``).trim()||void 0}function hf(e,t){if(!t||_.Children.count(e)!==1)return e;let[n]=_.Children.toArray(e);return typeof n!=`string`&&typeof n!=`number`?e:t.replace(/\s+\([^)]{1,80}\)\s*$/u,``).trim()||t}var gf=_.createContext(void 0);function _f(){let e=_.useContext(gf);if(e===void 0)throw Error(We(63));return e}var vf=`data-checked`,yf=`data-unchecked`,bf={...Dr,checked(e){return e?{[vf]:``}:{[yf]:``}}},xf=_.forwardRef(function(e,t){let{checked:n,className:r,defaultChecked:i,"aria-labelledby":a,form:o,id:s,inputRef:c,name:l,nativeButton:u=!1,onCheckedChange:d,readOnly:f=!1,required:p=!1,disabled:m=!1,render:h,uncheckedValue:g,value:v,style:y,...b}=e,{clearErrors:x}=Mr(),{state:S,setTouched:C,setDirty:w,validityData:T,setFilled:E,setFocused:D,validationMode:O,disabled:k,name:A,validation:j}=Ar(),{labelId:M}=zr(),N=k||m,P=A??l,F=_.useRef(null),I=$e(F,c,j.inputRef),L=_.useRef(null),R=Lr(),z=Ur({id:s}),ee=u?void 0:z,[B,te]=ho({controlled:n,default:!!i,name:`Switch`,state:`checked`});go(L,R,B,void 0,!N,l),J(()=>{E(B)},[B,E]),_o(B,()=>{x(P),w(B!==T.initialValue),j.change(B)});let{getButtonProps:ne,buttonRef:V}=Xe({disabled:N,native:u}),re=Br(a,M,F,!u,ee),H={id:u?z:R,role:`switch`,"aria-checked":B,"aria-readonly":f||void 0,"aria-required":p||void 0,"aria-labelledby":re,onFocus(){N||D(!0)},onBlur(){let e=F.current;e&&!N&&(C(!0),D(!1),O===`onBlur`&&j.commit(e.checked))},onClick(e){if(f||N)return;e.preventDefault();let t=F.current;t&&Ye(t,e)}},U={...j.getValidationProps(N),checked:B,disabled:N,form:o,id:ee,name:P,required:p,style:P?_s:gs,tabIndex:-1,type:`checkbox`,"aria-hidden":!0,ref:I,onChange(e){if(e.nativeEvent.defaultPrevented)return;if(f){e.preventDefault();return}let t=e.currentTarget.checked,n=Ro(vo,e.nativeEvent);d?.(t,n),!n.isCanceled&&te(t)},onClick(e){e.stopPropagation()},onFocus(){L.current?.focus()},...v===void 0?ut:{value:v}},ie=_.useMemo(()=>({...S,checked:B,disabled:N,readOnly:f,required:p}),[S,B,N,f,p]),W=mt(`span`,e,{state:ie,ref:[t,L,V],props:[H,b,ne,e=>j.getValidationProps(N,e)],stateAttributesMapping:bf});return(0,Q.jsxs)(gf.Provider,{value:ie,children:[W,!B&&P&&g!==void 0&&(0,Q.jsx)(`input`,{type:`hidden`,form:o,name:P,value:g,disabled:N}),(0,Q.jsx)(`input`,{...U,suppressHydrationWarning:!0})]})}),Sf=_.forwardRef(function(e,t){let{render:n,className:r,style:i,...a}=e;return mt(`span`,e,{state:_f(),ref:t,stateAttributesMapping:bf,props:a})});function Cf({className:e,checkedThumbSide:t=`end`,size:n=`default`,...r}){return(0,Q.jsx)(xf,{"data-checked-thumb-side":t,"data-slot":`switch`,"data-size":n,className:Z(`peer group/switch relative inline-flex shrink-0 cursor-pointer items-center rounded-full p-px transition-all outline-none after:absolute after:-inset-x-3 after:-inset-y-2 aria-invalid:ring aria-invalid:ring-[color:color-mix(in_oklab,var(--destructive)_20%,transparent)] data-[size=default]:h-4 data-[size=default]:w-[28px] data-[size=sm]:h-3.5 data-[size=sm]:w-[24px] data-[size=xs]:h-3 data-[size=xs]:w-5 dark:aria-invalid:ring-[color:color-mix(in_oklab,var(--destructive)_40%,transparent)] data-checked:bg-[color:var(--accent)] data-unchecked:bg-[color:color-mix(in_oklab,var(--input)_20%,transparent)] data-disabled:cursor-not-allowed data-disabled:opacity-50`,e),...r,children:(0,Q.jsx)(Sf,{"data-slot":`switch-thumb`,className:`pointer-events-none block rounded-full bg-[color:var(--background)] ring-0 transition-transform group-data-[size=default]/switch:size-3.5 group-data-[size=sm]/switch:size-3 group-data-[size=xs]/switch:size-2.5 group-data-[checked-thumb-side=end]/switch:data-checked:translate-x-[calc(100%-2px)] group-data-[checked-thumb-side=end]/switch:data-unchecked:translate-x-0 group-data-[checked-thumb-side=start]/switch:data-checked:translate-x-0 group-data-[checked-thumb-side=start]/switch:data-unchecked:translate-x-[calc(100%-2px)] dark:bg-[color:var(--foreground)]`})})}function wf({checked:e,onCheckedChange:t}){let[n,r]=_.useState(e);return _.useEffect(()=>{r(e)},[e]),[n,e=>{r(e),t?.(e)}]}function Tf({checked:e,disabled:t=!1,name:n,onCheckedChange:r,showLabel:i=!0}){let[a,o]=wf({checked:e,onCheckedChange:r});return(0,Q.jsxs)(jd,{className:`h-fit justify-start py-1`,orientation:`horizontal`,style:{gap:8},children:[(0,Q.jsx)(Cf,{"aria-label":n,checked:a,disabled:t,onCheckedChange:o,size:`default`}),i?(0,Q.jsx)(pf,{textClassName:`opacity-90`,children:n}):null]})}var Ef=Dt(`flex w-fit items-stretch *:focus:relative *:focus:z-10 *:focus-visible:relative *:focus-visible:z-10 has-[>[data-slot=button-group]]:gap-2 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md [&>[data-slot]]:relative [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1`,{variants:{orientation:{horizontal:`*:data-slot:rounded-r-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-r-md! [&>[data-slot]~[data-slot]]:rounded-l-none [&>[data-slot]:has(~[data-slot])]:border-r-0`,vertical:`flex-col *:data-slot:rounded-b-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-md! [&>[data-slot]~[data-slot]]:rounded-t-none [&>[data-slot]:has(~[data-slot])]:border-b-0`},adjacentBorderTone:{default:null,subtle:null}},compoundVariants:[{adjacentBorderTone:`default`,className:`[&>[data-slot]:not([data-slot=button-group-separator]):hover+[data-slot]]:!border-l-[color:color-mix(in_oklab,var(--border)_20%,transparent)] [&>[data-slot]:not([data-slot=button-group-separator]):focus+[data-slot]]:!border-l-[color:color-mix(in_oklab,var(--border)_30%,transparent)] [&>[data-slot]:not([data-slot=button-group-separator])[aria-expanded=true]+[data-slot]]:!border-l-[color:color-mix(in_oklab,var(--border)_45%,transparent)] [&>[data-slot]:not([data-slot=button-group-separator])[data-open]+[data-slot]]:!border-l-[color:color-mix(in_oklab,var(--border)_45%,transparent)] [&>[data-slot]:not([data-slot=button-group-separator])[data-popup-open]+[data-slot]]:!border-l-[color:color-mix(in_oklab,var(--border)_45%,transparent)]`,orientation:`horizontal`},{adjacentBorderTone:`subtle`,className:`[&>[data-slot]:not([data-slot=button-group-separator]):hover+[data-slot]]:!border-l-[color:color-mix(in_oklab,var(--border)_20%,transparent)] [&>[data-slot]:not([data-slot=button-group-separator]):focus+[data-slot]]:!border-l-[color:color-mix(in_oklab,var(--border)_30%,transparent)] [&>[data-slot]:not([data-slot=button-group-separator])[aria-expanded=true]+[data-slot]]:!border-l-[color:color-mix(in_oklab,var(--border)_30%,transparent)] [&>[data-slot]:not([data-slot=button-group-separator])[data-open]+[data-slot]]:!border-l-[color:color-mix(in_oklab,var(--border)_30%,transparent)] [&>[data-slot]:not([data-slot=button-group-separator])[data-popup-open]+[data-slot]]:!border-l-[color:color-mix(in_oklab,var(--border)_30%,transparent)]`,orientation:`horizontal`},{adjacentBorderTone:`default`,className:`[&>[data-slot]:not([data-slot=button-group-separator]):hover+[data-slot]]:!border-t-[color:color-mix(in_oklab,var(--border)_20%,transparent)] [&>[data-slot]:not([data-slot=button-group-separator]):focus+[data-slot]]:!border-t-[color:color-mix(in_oklab,var(--border)_30%,transparent)] [&>[data-slot]:not([data-slot=button-group-separator])[aria-expanded=true]+[data-slot]]:!border-t-[color:color-mix(in_oklab,var(--border)_45%,transparent)] [&>[data-slot]:not([data-slot=button-group-separator])[data-open]+[data-slot]]:!border-t-[color:color-mix(in_oklab,var(--border)_45%,transparent)] [&>[data-slot]:not([data-slot=button-group-separator])[data-popup-open]+[data-slot]]:!border-t-[color:color-mix(in_oklab,var(--border)_45%,transparent)]`,orientation:`vertical`},{adjacentBorderTone:`subtle`,className:`[&>[data-slot]:not([data-slot=button-group-separator]):hover+[data-slot]]:!border-t-[color:color-mix(in_oklab,var(--border)_20%,transparent)] [&>[data-slot]:not([data-slot=button-group-separator]):focus+[data-slot]]:!border-t-[color:color-mix(in_oklab,var(--border)_30%,transparent)] [&>[data-slot]:not([data-slot=button-group-separator])[aria-expanded=true]+[data-slot]]:!border-t-[color:color-mix(in_oklab,var(--border)_30%,transparent)] [&>[data-slot]:not([data-slot=button-group-separator])[data-open]+[data-slot]]:!border-t-[color:color-mix(in_oklab,var(--border)_30%,transparent)] [&>[data-slot]:not([data-slot=button-group-separator])[data-popup-open]+[data-slot]]:!border-t-[color:color-mix(in_oklab,var(--border)_30%,transparent)]`,orientation:`vertical`}],defaultVariants:{adjacentBorderTone:`default`,orientation:`horizontal`}});function Df({adjacentBorderTone:e,className:t,orientation:n,...r}){return(0,Q.jsx)(`div`,{role:`group`,"data-slot":`button-group`,"data-orientation":n,className:Z(Ef({adjacentBorderTone:e,orientation:n}),t),...r})}function Of(e,t=-(2**53-1),n=2**53-1){return Math.max(t,Math.min(e,n))}function kf(e,t,n=Object.is){let{length:r}=e;if(r!==t.length)return!1;for(let i=0;i<r;i+=1)if(!n(e[i],t[i]))return!1;return!0}var Af=_.createContext({register:()=>{},unregister:()=>{},subscribeMapChange:()=>()=>{},nextIndexRef:{current:0}});function jf(){return _.useContext(Af)}function Mf(e){let{children:t,elementsRef:n,labelsRef:r,onMapChange:i}=e,a=q(i),[,o]=_.useState(!1),s=Se(Pf).current,c=Se(Nf).current,l=_.useRef(0),u=_.useRef(!0),d=_.useRef(null),f=_.useRef(null),p=q(()=>{u.current||(u.current=!0,o(e=>!e))}),m=q((e,t)=>{c.set(e,t),p()}),h=q(e=>{c.delete(e),p()}),g=q(e=>{let t=new Map;return n.current.length=0,r&&(r.current.length=0),e.forEach(e=>{t.set(e.element,{...e.registration.metadata??{},index:e.index}),n.current[e.index]=e.element,r&&(r.current[e.index]=e.registration.label===void 0?e.registration.textRef?.current?.textContent??e.element.textContent:e.registration.label)}),l.current=n.current.length,t});function v(e){if(f.current?.disconnect(),f.current=null,typeof MutationObserver!=`function`||e.length<2)return;let t=new MutationObserver(n=>{if(!Lf(n))return;let r=null;for(let n of e)if(n.isConnected){if(r&&Rf(r,n)>0){t.disconnect(),p();return}r=n}});f.current=t;let n=new Set;for(let t=1;t<e.length;t+=1){let r=If(e[t-1],e[t]);r&&n.add(r)}n.forEach(e=>t.observe(e,{childList:!0}))}let y=q(()=>{let[e,t]=Ff(c),n=g(e),r=d.current,i=!r||r.length!==e.length||e.some((e,t)=>{let n=r[t];return e.index!==n.index||e.element!==n.element||e.registration.index!==n.registration.index||e.registration.metadata!==n.registration.metadata});v(t),d.current=e,u.current=!1,i&&(s.forEach(e=>e(n)),a(n))});J(()=>(!u.current&&d.current&&g(d.current),()=>{n.current=[],r&&(r.current=[])}),[n,r,g]),J(()=>{u.current&&y()}),J(()=>()=>{f.current?.disconnect(),u.current=!0},[]);let b=q(e=>(s.add(e),()=>{s.delete(e)})),x=_.useMemo(()=>({register:m,unregister:h,subscribeMapChange:b,nextIndexRef:l}),[m,h,b,l]);return(0,Q.jsx)(Af.Provider,{value:x,children:t})}function Nf(){return new Map}function Pf(){return new Set}function Ff(e){let t=new Set,n=[],r=[];e.forEach((e,i)=>{if(!i.isConnected)return;let a=e.index,o={index:a??-1,element:i,registration:e};a===null?r.push(o):a>=0&&(t.add(a),n.push(o))});let i=0;return r.sort((e,t)=>Rf(e.element,t.element)),r.forEach(e=>{for(;t.has(i);)i+=1;e.index=i,n.push(e),i+=1}),t.size>0&&n.sort((e,t)=>e.index-t.index),[n,r.map(e=>e.element)]}function If(e,t){let n=e.parentElement;for(;n&&!n.contains(t);)n=n.parentElement;return n}function Lf(e){for(let t of e)for(let e=0;e<t.removedNodes.length;e+=1)if(t.removedNodes[e].isConnected)return!0;return!1}function Rf(e,t){return e.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_FOLLOWING?-1:1}function zf(e){return e==null?void 0:`${e}-label`}function Bf(e,t){return e??t}function Vf(e,t){return e-t}function Hf(e,t,n,r,i,a){let o=Of(e,n,r);if(!i)return o;let s=a.slice();return s[t]=Of(o,a[t-1]??-1/0,a[t+1]??1/0),s.sort(Vf)}function Uf(e,t,n){if(!Array.isArray(e))return!0;let r=t*n;for(let t=0;t<e.length-1;t+=1)if(!(Math.abs(e[t]-e[t+1])>=r))return!1;return!0}var Wf=()=>null,Gf={activeThumbIndex:Wf,max:Wf,min:Wf,minStepsBetweenValues:Wf,step:Wf,values:Wf,...Dr},Kf=_.createContext(void 0);function qf(){let e=_.useContext(Kf);if(e===void 0)throw Error(We(62));return e}function Jf(e,t){return e===t||Array.isArray(e)&&Array.isArray(t)&&kf(e,t)}var Yf=_.forwardRef(function(e,t){let{"aria-labelledby":n,className:r,defaultValue:i,disabled:a=!1,id:o,format:s,largeStep:c=10,locale:l,render:u,max:d=100,min:f=0,minStepsBetweenValues:p=0,form:m,name:h,onValueChange:g,onValueCommitted:v,orientation:y=`horizontal`,step:b=1,thumbCollisionBehavior:x=`push`,thumbAlignment:S=`center`,value:C,style:w,...T}=e,E=Lr(o),D=zf(E),O=q(g),k=q(v),{clearErrors:A}=Mr(),{state:j,disabled:M,name:N,setTouched:P,setDirty:F,validityData:I,validation:L}=Ar(),{labelId:R}=zr(),[z,ee]=_.useState(),B=n??Bf(R,z),te=M||a,ne=N??h,[V,re]=ho({controlled:C,default:i??f,name:`Slider`}),H=_.useRef(null),U=_.useRef(null),ie=_.useRef([]),W=_.useRef(null),ae=_.useRef(-1),G=_.useRef(null),K=_.useRef(vo),[oe,se]=_.useState(-1),[ce,le]=_.useState(-1),[ue,de]=_.useState(!1),[fe,pe]=_.useState(()=>new Map),[me,he]=_.useState([void 0,void 0]),ge=q(e=>{se(e),e!==-1&&le(e)}),_e=q(e=>{e&&(U.current=e)}),ve=Array.isArray(V),ye=_.useMemo(()=>ve?V.map(e=>Of(e,f,d)).sort(Vf):[Of(V,f,d)],[d,f,ve,V]),be=ve?ye:ye[0];go(L.inputRef,E,be,void 0,!te,h),_o(be,()=>{A(ne),L.change(be);let e=I.initialValue,t;t=Array.isArray(be)&&Array.isArray(e)?!kf(be,e):be!==e,F(t)});let xe=q((e,t)=>{if(Number.isNaN(e)||Jf(e,V))return!1;let n=t.event,r=n.constructor,i=new r(n.type,n);return Object.defineProperty(i,"target",{writable:!0,value:{value:e,name:ne}}),t.event=i,O(e,t),!t.isCanceled&&(K.current=t.reason,re(e),!0)}),Se=q((e,t,n)=>{let r=Hf(e,t,f,d,ve,ye);if(Uf(r,b,p)){let e=`key`in n?Ao:Eo,i=xe(r,Ro(e,n.nativeEvent,void 0,{activeThumbIndex:t}));P(!0),i&&k(r,zo(e,n.nativeEvent))}});J(()=>{if(!te)return;let e=ii(Je(H.current));$(H.current,e)&&e.blur(),oe!==-1&&ge(-1)},[oe,te,ge]);let Ce=_.useMemo(()=>({...j,activeThumbIndex:oe,disabled:te,dragging:ue,orientation:y,max:d,min:f,minStepsBetweenValues:p,step:b,values:ye}),[j,oe,te,ue,d,f,p,y,b,ye]),we=_.useMemo(()=>({active:oe,controlRef:U,disabled:te,dragging:ue,validation:L,format:s,handleInputChange:Se,indicatorPosition:me,inset:S!==`center`,labelId:B,rootLabelId:D,largeStep:c,lastUsedThumbIndex:ce,lastChangeReasonRef:K,form:m,locale:l,max:d,min:f,minStepsBetweenValues:p,name:ne,onValueCommitted:k,orientation:y,pressedThumbCenterOffsetRef:W,pressedThumbIndexRef:ae,pressedValuesRef:G,registerFieldControlRef:_e,renderBeforeHydration:S===`edge`,setActive:ge,setDragging:de,setIndicatorPosition:he,setLabelId:ee,setValue:xe,state:Ce,step:b,thumbCollisionBehavior:x,thumbMap:fe,thumbRefs:ie,values:ye}),[oe,B,D,te,ue,L,s,Se,me,c,ce,m,l,d,f,p,ne,k,y,_e,ge,xe,Ce,b,x,S,fe,ye]),Te=mt(`div`,e,{state:Ce,ref:[t,H],props:[{"aria-labelledby":B,id:E,role:`group`},T,e=>L.getValidationProps(te,e)],stateAttributesMapping:Gf});return(0,Q.jsx)(Kf.Provider,{value:we,children:(0,Q.jsx)(Mf,{elementsRef:ie,onMapChange:pe,children:Te})})});function Xf(e){return Array.isArray(e)?e.map(e=>Xf(e)).join(`,`):e==null?``:String(e)}var Zf=new Map;function Qf(e,t){let n=JSON.stringify({locale:Xf(e),options:t}),r=Zf.get(n);if(r)return r;let i=new Intl.NumberFormat(e,t);return Zf.set(n,i),i}function $f(e,t,n){return e==null?``:Qf(t,n).format(e)}function ep(e,t){let n=e.getBoundingClientRect();return t?(n.top+n.bottom)/2:(n.left+n.right)/2}function tp(e){if(e===0)return 0;if(Math.abs(e)<1){let t=e.toExponential().split(`e-`),n=t[0].split(`.`)[1];return(n?n.length:0)+parseInt(t[1],10)}let t=e.toString().split(`.`)[1];return t?t.length:0}function np(e,t,n){let r=Math.round((e-n)/t)*t+n;return Number(r.toFixed(Math.max(tp(t),tp(n))))}function rp(e,t,n,r,i,a,o,s){let c=e.slice(),l=a*o,u=c.length-1,d=s??e;c[t]=Of(n,r+t*l,i-(u-t)*l);for(let e=t+1;e<=u;e+=1){let t=c[e-1]+l,n=i-(u-e)*l,r=d[e],a=Math.max(c[e],t);r<a&&(a=Math.max(r,t)),c[e]=Of(a,t,n)}for(let e=t-1;e>=0;--e){let t=c[e+1]-l,n=r+e*l,i=d[e],a=Math.min(c[e],t);i>a&&(a=Math.min(i,t)),c[e]=Of(a,n,t)}for(let e=0;e<=u;e+=1)c[e]=Number(c[e].toFixed(12));return c}function ip(e,t,n,r,i,a,o,s,c,l){let u=n??t,d=r??t;if(!(u.length>1))return{value:a,thumbIndex:0,didSwap:!1};let f=c*l;if(e===`push`)return{value:rp(u,i,a,o,s,c,l),thumbIndex:i,didSwap:!1};let p=u.slice(),m=p[i-1],h=p[i+1],g=m==null?o:m+f,_=h==null?s:h-f,v=Number(Of(a,g,_).toFixed(12));switch(p[i]=v,e){case`swap`:{let e=u[i],t=1e-7,n=a>e,r=a<e,g=n&&h!=null&&a>=h-t,_=r&&m!=null&&a<=m+t;if(!g&&!_)return{value:p,thumbIndex:i,didSwap:!1};let y=g?i+1:i-1,b=p.map((e,t)=>t===i?v:d[t]??u[t]),x=a;x=g?Math.max(a,p[y]):Math.min(a,p[y]);let S=rp(p,y,x,o,s,c,l,b),C=g?y-1:y+1,w=S[C-1],T=S[C+1],E=w==null?o:w+f;E=Math.max(E,o+C*f);let D=T==null?s:T-f;D=Math.min(D,s-(S.length-1-C)*f);let O=Of(v,E,D);return S[C]=Number(O.toFixed(12)),{value:S,thumbIndex:y,didSwap:!0}}default:return{value:p,thumbIndex:i,didSwap:!1}}}var ap=2;function op(e,t){if(!e)return{start:0,end:0};function n(e){let t=e==null?0:parseFloat(e);return Number.isNaN(t)?0:t}let r=t?`Top`:`InlineStart`,i=t?`Bottom`:`InlineEnd`;return{start:n(e[`border${r}Width`])+n(e[`padding${r}`]),end:n(e[`border${i}Width`])+n(e[`padding${i}`])}}function sp(e,t){if(t.current!=null&&e.changedTouches){let n=e;for(let e=0;e<n.changedTouches.length;e+=1){let r=n.changedTouches[e];if(r.identifier===t.current)return{x:r.clientX,y:r.clientY}}return null}return{x:e.clientX,y:e.clientY}}var cp=_.forwardRef(function(e,t){let{render:n,className:r,style:i,...a}=e,{disabled:o,dragging:s,inset:c,lastChangeReasonRef:l,max:u,min:d,minStepsBetweenValues:f,onValueCommitted:p,orientation:m,pressedThumbCenterOffsetRef:h,pressedThumbIndexRef:g,pressedValuesRef:v,registerFieldControlRef:y,renderBeforeHydration:b,setActive:x,setDragging:S,setValue:C,state:w,step:T,thumbCollisionBehavior:E,thumbRefs:D,values:O}=qf(),k=Qu(),A=O.length>1,j=m===`vertical`,M=_.useRef(null),N=_.useRef(null),P=q(e=>{e&&N.current==null&&(N.current=V(e).getComputedStyle(e))}),F=_.useRef(null),I=_.useRef(0),L=_.useRef(0),R=_.useRef(null),z=ps(O);function ee(e){return e?.querySelector(`input[type="range"]`)}function B(e){g.current=e,D.current[e]||(h.current=null)}function te(){g.current=-1,h.current=null}function ne(e){return U(e)?D.current.some(t=>!U(t)||!$(t,e)?!1:ee(t)?.disabled===!0):!1}function re(e){let t=M.current,n=g.current;if(!t||n<0||n>=O.length)return n>=O.length&&(R.current=null),null;let{width:r,height:i,bottom:a,left:o,right:s}=t.getBoundingClientRect(),c=op(N.current,j),l=L.current,p=(j?i:r)-c.start-c.end-l*2,m=h.current??0,_=e.x-m,y=e.y-m,b=Of(((j?a-y-c.end:(k===`rtl`?s-_:_-o)-c.start)-l)/p,0,1),x=(u-d)*b+d;return x=np(x,T,d),x=Of(x,d,u),A?ip(E,O,z.current,v.current,n,x,d,u,T,f):{value:x,thumbIndex:n,didSwap:!1}}function H(e){v.current=A?O.slice():null,R.current=null,z.current=O;let t=g.current,n=t;if(t>-1&&t<O.length){if(O[t]===u){let e=t;for(;e>0&&O[e-1]===u;)--e;n=e}}else{let t=j?`y`:`x`,r;n=-1;for(let i=0;i<D.current.length;i+=1){let a=D.current[i];if(U(a)&&!ee(a)?.disabled){let o=ep(a,j),s=Math.abs(e[t]-o);(r===void 0||s<=r)&&(n=i,r=s)}}}if(n>-1&&n!==t&&B(n),c){let e=D.current[n];if(U(e)){let t=e.getBoundingClientRect();L.current=t[j?`height`:`width`]/2}}}function ie(e){let t=ee(D.current?.[e]);t&&t.focus({preventScroll:!0,focusVisible:!1})}function W(e,t,n){let r=C(e.value,Ro(t,n,void 0,{activeThumbIndex:e.thumbIndex}));return r&&(R.current=e.value,z.current=Array.isArray(e.value)?e.value:[e.value],e.didSwap&&(B(e.thumbIndex),ie(e.thumbIndex))),r}let ae=q(e=>{let t=sp(e,F);if(t==null)return;if(I.current+=1,e.type===`pointermove`&&e.buttons===0){G(e);return}let n=re(t);n!=null&&Uf(n.value,T,f)&&(!s&&I.current>ap&&S(!0),W(n,jo,e))}),G=q(e=>{x(-1),S(!1),h.current=null;let t=R.current;if(Array.isArray(t)&&t.length!==O.length&&(R.current=null),R.current!=null){let t=l.current;p(R.current,zo(t,e))}`pointerType`in e&&M.current?.hasPointerCapture(e.pointerId)&&M.current?.releasePointerCapture(e.pointerId),g.current=-1,F.current=null,oe()}),K=q(e=>{if(o)return;if(ne(ai(e))){te();return}let t=e.changedTouches[0];if(t==null)return;F.current=t.identifier;let n={x:t.clientX,y:t.clientY};H(n);let r=re(n);if(r==null)return;ie(r.thumbIndex),W(r,To,e),I.current=0;let i=Je(M.current);i.addEventListener(`touchmove`,ae,{passive:!0}),i.addEventListener(`touchend`,G,{passive:!0})}),oe=q(()=>{let e=Je(M.current);e.removeEventListener(`pointermove`,ae),e.removeEventListener(`pointerup`,G),e.removeEventListener(`touchmove`,ae),e.removeEventListener(`touchend`,G),v.current=null,R.current=null}),se=oo();return _.useEffect(()=>{let e=M.current;if(!e)return()=>oe();let t=ds(e,`touchstart`,K,{passive:!0});return()=>{t(),se.cancel(),oe()}},[oe,K,M,se]),_.useEffect(()=>{o&&oe()},[o,oe]),mt(`div`,e,{state:w,ref:[t,y,M,P],props:[{"data-base-ui-slider-control":b?``:void 0,onPointerDown(e){let t=M.current,n=ai(e.nativeEvent);if(!t||o||e.defaultPrevented||!U(n)||e.button!==0)return;if(ne(n)){te();return}let r={x:e.clientX,y:e.clientY};H(r);let i=re(r);if(i==null)return;$(D.current[i.thumbIndex],ii(Je(t)))?e.preventDefault():se.request(()=>{ie(i.thumbIndex)}),S(!0),h.current??W(i,To,e.nativeEvent),e.nativeEvent.pointerId&&t.setPointerCapture(e.nativeEvent.pointerId),I.current=0;let a=Je(t);a.addEventListener(`pointermove`,ae,{passive:!0}),a.addEventListener(`pointerup`,G,{once:!0})}},a],stateAttributesMapping:Gf})}),lp=_.forwardRef(function(e,t){let{render:n,className:r,style:i,...a}=e,{state:o}=qf();return mt(`div`,e,{state:o,ref:t,props:[{style:{position:`relative`}},a],stateAttributesMapping:Gf})});function up(){return ct}function dp(){return!1}function fp(){return!0}function pp(){return(0,Sl.useSyncExternalStore)(up,dp,fp)}function mp(e,t,n){return(e-t)*100/(n-t)}var hp=`ArrowUp`,gp=`ArrowDown`,_p=`ArrowLeft`,vp=`ArrowRight`,yp=`Home`,bp=`PageUp`,xp=`PageDown`,Sp=new Set([hp,gp,_p,vp,yp,`End`]),Cp=[`Shift`,`Control`,`Alt`,`Meta`];function wp(e){return ie(e)&&e.tagName===`INPUT`}function Tp(e){return!!(wp(e)&&e.selectionStart!=null||ie(e)&&e.tagName===`TEXTAREA`)}function Ep(e,t,n,r){if(!e||!t||!t.scrollTo)return;let i=e.scrollLeft,a=e.scrollTop,o=e.clientWidth<e.scrollWidth,s=e.clientHeight<e.scrollHeight;if(o&&r!==`vertical`){let r=Dp(e,t,`left`),a=Op(e),o=Op(t);n===`ltr`&&(r+t.offsetWidth+o.scrollMarginRight>e.scrollLeft+e.clientWidth-a.scrollPaddingRight?i=r+t.offsetWidth+o.scrollMarginRight-e.clientWidth+a.scrollPaddingRight:r-o.scrollMarginLeft<e.scrollLeft+a.scrollPaddingLeft&&(i=r-o.scrollMarginLeft-a.scrollPaddingLeft)),n===`rtl`&&(r-o.scrollMarginLeft<e.scrollLeft+a.scrollPaddingLeft?i=r-o.scrollMarginLeft-a.scrollPaddingLeft:r+t.offsetWidth+o.scrollMarginRight>e.scrollLeft+e.clientWidth-a.scrollPaddingRight&&(i=r+t.offsetWidth+o.scrollMarginRight-e.clientWidth+a.scrollPaddingRight))}if(s&&r!==`horizontal`){let n=Dp(e,t,`top`),r=Op(e),i=Op(t);n-i.scrollMarginTop<e.scrollTop+r.scrollPaddingTop?a=n-i.scrollMarginTop-r.scrollPaddingTop:n+t.offsetHeight+i.scrollMarginBottom>e.scrollTop+e.clientHeight-r.scrollPaddingBottom&&(a=n+t.offsetHeight+i.scrollMarginBottom-e.clientHeight+r.scrollPaddingBottom)}e.scrollTo({left:i,top:a,behavior:`auto`})}function Dp(e,t,n){let r=n===`left`?`offsetLeft`:`offsetTop`,i=0;for(;t.offsetParent&&(i+=t[r],t.offsetParent!==e);)t=t.offsetParent;return i}function Op(e){let t=getComputedStyle(e);return{scrollMarginTop:parseFloat(t.scrollMarginTop)||0,scrollMarginRight:parseFloat(t.scrollMarginRight)||0,scrollMarginBottom:parseFloat(t.scrollMarginBottom)||0,scrollMarginLeft:parseFloat(t.scrollMarginLeft)||0,scrollPaddingTop:parseFloat(t.scrollPaddingTop)||0,scrollPaddingRight:parseFloat(t.scrollPaddingRight)||0,scrollPaddingBottom:parseFloat(t.scrollPaddingBottom)||0,scrollPaddingLeft:parseFloat(t.scrollPaddingLeft)||0}}function kp(e={}){let{guess:t,label:n,metadata:r,textRef:i,index:a}=e,{register:o,unregister:s,subscribeMapChange:c,nextIndexRef:l}=jf(),u=_.useRef(-1),[d,f]=_.useState(a==null&&t?()=>{if(u.current===-1){let e=l.current;l.current+=1,u.current=e}return u.current}:-1),p=a??d,m=_.useRef(null),h=_.useCallback(e=>{let t=m.current;t&&s(t),m.current=e,e&&o(e,{metadata:r??null,index:a??null,label:n,textRef:i})},[a,o,s,r,n,i]);return J(()=>{if(a==null)return c(e=>{let t=m.current?e.get(m.current)?.index:null;t!=null&&f(t)})},[a,c]),{ref:h,index:p}}var Ap=_.createContext(void 0),jp={disableStyleElements:!1};function Mp(){return _.useContext(Ap)??jp}function Np(e){let{script:t}=e,{nonce:n}=Mp();return pp()?(0,Q.jsx)(`script`,{nonce:n,dangerouslySetInnerHTML:{__html:t},suppressHydrationWarning:!0}):null}var Pp=`data-index`,Fp,Ip=new Set([...Sp,bp,xp]);function Lp(e,t,n,r){if(!(t<0))return e.length===2?`${$f(e[t],r,n)} ${t===0?`start`:`end`} range`:n?$f(e[t],r,n):void 0}function Rp(e,t,n,r,i){let a=e+t*n;return Of(Number(a.toFixed(Math.max(tp(e),tp(t),tp(r)))),r,i)}var zp=_.forwardRef(function(e,t){let{render:n,children:r,className:i,"aria-describedby":a,"aria-label":o,"aria-labelledby":s,"aria-valuetext":c,disabled:l=!1,getAriaLabel:u,getAriaValueText:d,id:f,index:p,inputRef:m,onBlur:h,onFocus:g,onKeyDown:v,tabIndex:y,style:b,...x}=e,S=Lr(f),{active:C,lastUsedThumbIndex:w,controlRef:T,disabled:E,validation:D,format:O,handleInputChange:k,inset:A,labelId:j,largeStep:M,locale:N,max:P,min:F,minStepsBetweenValues:I,form:L,name:R,orientation:z,pressedThumbCenterOffsetRef:ee,pressedThumbIndexRef:B,renderBeforeHydration:te,setActive:ne,setIndicatorPosition:re,state:H,step:U,thumbRefs:ie,values:W}=qf(),ae=Qu(),G=l||E,K=W.length>1,oe=z===`vertical`,se=ae===`rtl`,{setTouched:ce,setFocused:le,validationMode:ue}=Ar(),de=_.useRef(null),fe=_.useRef(null),pe=_.useRef(!1),me=q(e=>{pe.current||g?.(e)}),he=q(e=>{pe.current||h?.(e)}),ge=Lr(),_e=Ur(),ve=K?ge:_e,{ref:ye,index:be}=kp({metadata:_.useMemo(()=>({inputId:ve}),[ve])}),xe=K?p??be:0,Se=xe===W.length-1,Ce=W[xe],we=mp(Ce,F,P),[Te,Ee]=_.useState(),De=pp(),Oe=w>=0&&w<W.length?w:-1,Ae=q(()=>{let e=T.current,t=de.current;if(!e||!t)return;let n=t.getBoundingClientRect(),r=e.getBoundingClientRect(),i=oe?`height`:`width`,a=r[i]-n[i],o=(n[i]/2+a*we/100)/r[i]*100,s=Number.isFinite(o)?o:void 0;Ee(s),xe===0?re(e=>[s,e[1]]):Se&&re(e=>[e[0],s])});J(()=>{A&&queueMicrotask(Ae)},[Ae,A]),J(()=>{A&&Ae()},[Ae,A,we]),J(()=>{if(!A)return;let e=T.current,t=de.current;if(!e||!t)return;let n=V(e).ResizeObserver;if(typeof n!=`function`)return;let r=new n(Ae);return r.observe(e),r.observe(t),()=>{r.disconnect()}},[T,Ae,A]);let je=oe?`bottom`:`insetInlineStart`,Me=oe?`left`:`top`,Ne;K?C===xe?Ne=2:Oe===xe&&(Ne=1):C===xe&&(Ne=1);let Pe;Pe=!A&&!Number.isFinite(we)?gs:{position:`absolute`,[je]:A?`var(--position)`:`${we}%`,[Me]:`50%`,translate:`${(oe||!se?-1:1)*50}% ${(oe?1:-1)*50}%`,zIndex:Ne,...A&&{"--position":`${Te??0}%`,visibility:te&&De||Te===void 0?`hidden`:void 0}};let Fe;oe&&(Fe=se?`vertical-rl`:`vertical-lr`);let Ie=typeof u==`function`?u(xe):o,Le=ke({"aria-label":Ie,"aria-labelledby":s??(Ie==null?j:void 0),"aria-describedby":a,"aria-orientation":z,"aria-valuenow":Ce,"aria-valuetext":typeof d==`function`?d($f(Ce,N,O),Ce,xe):c??Lp(W,xe,O,N),disabled:G,form:L,id:ve,max:P,min:F,name:R,onChange(e){k(e.currentTarget.valueAsNumber,xe,e)},onFocus(e){let t=pe.current;pe.current=!1,ne(xe),le(!0),t&&e.stopPropagation()},onBlur(e){if(pe.current){e.stopPropagation();return}ne(-1),!ie.current.some(t=>$(t,e.relatedTarget))&&(ce(!0),le(!1),ue===`onBlur`&&D.commit(Hf(Ce,xe,F,P,K,W)))},onKeyDown(e){if(e.defaultPrevented||!Ip.has(e.key))return;Sp.has(e.key)&&e.stopPropagation();let t=null,n=0,r=e.shiftKey?M:U,i=np(Ce,U,F);switch(e.key){case hp:n=1;break;case vp:n=se?-1:1;break;case gp:n=-1;break;case _p:n=se?1:-1;break;case bp:r=M,n=1;break;case xp:r=M,n=-1;break;case`End`:t=K&&Number.isFinite(W[xe+1])?W[xe+1]-U*I:P;break;case yp:t=K&&Number.isFinite(W[xe-1])?W[xe-1]+U*I:F}if(n!==0&&(t=Rp(i,r,n,F,P)),t!==null){let n=e.currentTarget;Ri(n)||(pe.current=!0,n.blur(),n.focus({preventScroll:!0,focusVisible:!0})),k(t,xe,e),e.preventDefault()}},step:U,style:{...gs,width:`100%`,height:`100%`,writingMode:Fe},tabIndex:y,type:`range`,value:Ce??``},e=>D.getValidationProps(G,e),{onFocus:me,onBlur:he,onKeyDown:v}),Re=$e(fe,D.inputRef,m);return mt(`div`,e,{state:H,ref:[t,ye,de],props:[{[Pp]:xe,children:(0,Q.jsxs)(_.Fragment,{children:[r,(0,Q.jsx)(`input`,{ref:Re,...Le,suppressHydrationWarning:!0}),A&&Se&&te&&(Fp||=(0,Q.jsx)(Np,{script:``}))]}),id:S,onPointerDown(e){if(G)return;B.current=xe;let t=ep(e.currentTarget,oe);ee.current=(oe?e.clientY:e.clientX)-t},style:Pe,suppressHydrationWarning:te||void 0},x],stateAttributesMapping:Gf})});function Bp(e,t,n,r,i,a){let o={visibility:a||n&&(r===void 0||t&&i===void 0)?`hidden`:void 0,position:e?`absolute`:`relative`,[e?`width`:`height`]:`inherit`},s=`${r??0}%`,c=`${(i??0)-(r??0)}%`;return n&&(o[`--start-position`]=s,s=`var(--start-position)`,t&&(o[`--relative-size`]=c,c=`var(--relative-size)`)),o[e?`bottom`:`insetInlineStart`]=t?s:0,o[e?`height`:`width`]=t?c:s,o}var Vp=_.forwardRef(function(e,t){let{render:n,className:r,style:i,...a}=e,{indicatorPosition:o,inset:s,max:c,min:l,orientation:u,renderBeforeHydration:d,state:f,values:p}=qf(),m=pp(),h=Bp(u===`vertical`,p.length>1,s,s?o[0]:mp(p[0],l,c),s?o[1]:mp(p[p.length-1],l,c),s&&d&&m);return mt(`div`,e,{state:f,ref:t,props:[{"data-base-ui-slider-indicator":d?``:void 0,style:h,suppressHydrationWarning:d||void 0},a],stateAttributesMapping:Gf})}),Hp=340,Up=6;function Wp(e){let[t,n]=_.useState(null),r=_.useCallback(()=>{n(null)},[]),i=_.useCallback((t,r)=>{t.defaultPrevented||e||t.button!==0||n(r)},[e]);return _.useEffect(()=>{if(t!==null)return window.addEventListener(`pointerup`,r),window.addEventListener(`pointercancel`,r),window.addEventListener(`blur`,r),()=>{window.removeEventListener(`pointerup`,r),window.removeEventListener(`pointercancel`,r),window.removeEventListener(`blur`,r)}},[t,r]),{activeDragIndex:t,handlePointerDown:i}}function Gp({disabled:e=!1,isPointerDragging:t,markerCount:n,markerValues:r,max:i,min:a,orientation:o}){let s=r?.length?r.filter(e=>e>a&&e<i).map(e=>(e-a)/(i-a)*100):Array.from({length:n},(e,t)=>t===0||t===n-1?null:t/(n-1)*100).filter(e=>e!==null);return s.length===0?null:(0,Q.jsx)(Q.Fragment,{children:s.map((n,r)=>{let i=`${n}%`;return(0,Q.jsx)(`span`,{"aria-hidden":!0,className:Z(`pointer-events-none absolute rounded-full bg-[color:var(--slider-active-color)] opacity-0 transition-opacity duration-150`,e?null:t?`opacity-100`:`group-hover/slider-control:opacity-100`,o===`vertical`?`left-1/2 h-px w-1.5 -translate-x-1/2 translate-y-1/2`:`top-1/2 h-1.5 w-px -translate-x-1/2 -translate-y-1/2`),"data-slot":`slider-marker`,style:o===`vertical`?{bottom:i}:{left:i}},`${i}-${r}`)})})}function Kp({count:e,disabled:t=!1,getAriaLabel:n,onDoubleClick:r}){let{activeDragIndex:i,handlePointerDown:a}=Wp(t),o=_.useRef(null),s=_.useRef(!1),c=_.useCallback((e,t)=>{if(e.detail>=2)return!0;let n=o.current;if(!n||n.index!==t)return!1;let r=e.timeStamp-n.timeStamp,i=e.clientX-n.clientX,a=e.clientY-n.clientY,s=Math.hypot(i,a);return n.pointerType===e.pointerType&&r>=0&&r<=Hp&&s<=Up},[]),l=_.useCallback((e,n)=>{if(r&&!t&&e.button===0){if(c(e,n)){o.current=null,s.current=!0,r(e,n);return}o.current={clientX:e.clientX,clientY:e.clientY,index:n,pointerType:e.pointerType,timeStamp:e.timeStamp}}},[t,r,c]),u=_.useCallback((e,t)=>{if(s.current){s.current=!1,e.preventDefault(),e.stopPropagation();return}r?.(e,t)},[r]);return(0,Q.jsx)(Q.Fragment,{children:Array.from({length:e},(e,r)=>(0,Q.jsx)(zp,{"data-slot":`slider-thumb`,getAriaLabel:n,index:r,onDoubleClick:e=>u(e,r),onPointerDownCapture:e=>l(e,r),onPointerDown:e=>a(e,r),className:Z(`group/slider-thumb relative block size-[9px] shrink-0 cursor-pointer rounded-[2px] select-none before:absolute before:top-1/2 before:left-1/2 before:block before:size-[18px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-[''] transition-[inset-inline-start,bottom] duration-200 ease-out data-[dragging]:transition-none disabled:pointer-events-none motion-reduce:transition-none`),children:(0,Q.jsx)(`span`,{"aria-hidden":!0,"data-active-dragging":i===r?`true`:void 0,"data-slot":`slider-dot`,className:Z(`pointer-events-none absolute inset-0 block rounded-[2px] bg-[color:var(--slider-active-color)] transition-[scale,background-color] duration-200 ease-out motion-reduce:transition-none`,t?null:`group-hover/slider-thumb:scale-[1.4] data-[active-dragging=true]:scale-[1.4]`)})},r))})}function qp({show:e}){return e?(0,Q.jsx)(Vp,{"data-slot":`slider-range`,className:Z(`bg-[color:var(--slider-active-color)] transition-[width,height,inset-inline-start,bottom] duration-200 ease-out select-none data-[dragging]:transition-none data-horizontal:h-full data-vertical:w-full motion-reduce:transition-none`)}):null}function Jp({count:e,disabled:t,getAriaLabel:n,isDiscrete:r,isPointerDragging:i,markerCount:a,markerValues:o,max:s,min:c,onThumbDoubleClick:l,orientation:u,showFill:d}){return(0,Q.jsxs)(cp,{className:`group/slider-control relative flex touch-none items-center select-none data-[disabled]:opacity-[0.15] data-horizontal:h-[18px] data-horizontal:w-full data-vertical:h-full data-vertical:min-h-40 data-vertical:w-[18px] data-vertical:flex-col`,children:[(0,Q.jsxs)(lp,{"data-slot":`slider-track`,className:`group/slider-track relative grow overflow-visible rounded-full bg-[color:var(--slider-track-color)] select-none data-horizontal:h-px data-horizontal:w-full data-vertical:h-full data-vertical:w-px`,children:[(0,Q.jsx)(qp,{show:d}),r?(0,Q.jsx)(Gp,{disabled:t,isPointerDragging:i,markerCount:a,markerValues:o,max:s,min:c,orientation:u}):null]}),(0,Q.jsx)(Kp,{count:e,disabled:t,getAriaLabel:n,onDoubleClick:l})]})}var Yp=_.createContext(null);function Xp(e){return typeof e==`number`?[e]:[...e]}function Zp(e,t){return e.length===t.length&&e.every((e,n)=>e===t[n])}function Qp({disabled:e,handleValueChange:t,max:n,min:r,values:i}){let a=_.useContext(Yp),o=_.useRef(i);return _.useEffect(()=>{o.current=i},[i]),_.useCallback((i,s)=>{if(t(i,s),e)return;let c=o.current,l=Xp(i);Zp(c,l)||(a?.onValueChange?.({max:n,min:r,nextValues:l,previousValues:c}),o.current=l)},[e,t,n,r,a])}function $p({max:e,min:t,step:n}){if(!Number.isFinite(n)||!Number.isFinite(t)||!Number.isFinite(e)||n<=0||e<=t)return;let r=(e-t)/n,i=Math.round(r),a=Math.abs(r-i)<2**-52*100?i:Math.floor(r)+1;return Math.max(2,a+1)}function em({markerCount:e,max:t,min:n,step:r,variant:i}){return i===`discrete`?e??$p({max:t,min:n,step:r})??Math.max(2,Math.round(t-n)+1):e??Math.max(2,Math.round(t-n)+1)}function tm({disabled:e,onBlurCapture:t,onPointerCancelCapture:n,onPointerDownCapture:r,onPointerUpCapture:i}){let[a,o]=_.useState(!1),s=_.useCallback(()=>{o(!1)},[]),c=_.useCallback(t=>{r?.(t),!(t.defaultPrevented||e||t.button!==0)&&o(!0)},[e,r]),l=_.useCallback(e=>{i?.(e),s()},[i,s]),u=_.useCallback(e=>{n?.(e),s()},[n,s]),d=_.useCallback(e=>{t?.(e),s()},[t,s]);return _.useEffect(()=>{if(a)return window.addEventListener(`pointerup`,s),window.addEventListener(`pointercancel`,s),window.addEventListener(`blur`,s),()=>{window.removeEventListener(`pointerup`,s),window.removeEventListener(`pointercancel`,s),window.removeEventListener(`blur`,s)}},[a,s]),{handleBlurCapture:d,handlePointerCancelCapture:u,handlePointerDownCapture:c,handlePointerUpCapture:l,isPointerDragging:a}}function nm(e,t,n,r){let i=r>0?r:1,a=t+Math.round((e-t)/i)*i;return Math.min(n,Math.max(t,Number(a.toFixed(6))))}function rm(e,t,n,r){if(!r?.length)return null;let i=r.filter(e=>Number.isFinite(e)).map(e=>Math.min(n,Math.max(t,e)));if(!i.length)return null;let a=i.reduce((t,n)=>{let r=Math.abs(t-e);return Math.abs(n-e)<r?n:t},i[0]);return Number(a.toFixed(6))}function im(e,t,n,r){return Array.isArray(e)?[...e]:typeof e==`number`?[e]:Array.isArray(t)?[...t]:typeof t==`number`?[t]:[n,r]}function am(e,t,n,r){let i=t??n;return Array.isArray(i)?Array.isArray(e)?[...e]:[e]:typeof i==`number`&&Array.isArray(e)?e[0]??r:e}function om(e,t,n,r,i){if(typeof e==`number`){let a=rm(e,t,n,i);return a===null?nm(e,t,n,r):a}return e.map(e=>rm(e,t,n,i)??nm(e,t,n,r))}function sm(e,t){return Array.isArray(e)&&Array.isArray(t)?e.length===t.length&&e.every((e,n)=>e===t[n]):e===t}function cm(e,t){return{activeThumbIndex:t,allowPropagation:()=>void 0,cancel:()=>void 0,event:e.nativeEvent,isCanceled:!1,isPropagationAllowed:!1,reason:`none`,trigger:e.currentTarget}}function lm(e){return{event:e.nativeEvent,reason:`none`}}function um(e,t,n){if(!Array.isArray(e)||!Array.isArray(t))return t;let r=[...e],i=t[n]??e[n];return i===void 0?e:(r[n]=i,r)}function dm({defaultValue:e,disabled:t,handleValueChange:n,handleValueCommitted:r,isDiscrete:i,max:a,min:o,resetValue:s,snapValues:c,step:l,value:u,values:d}){let f=_.useRef(s??e??u);return _.useCallback((p,m)=>{if(t)return;let h=s??e??f.current;if(h===void 0)return;p.preventDefault(),p.stopPropagation();let g=am(h,u,e,o),_=am(d,u,e,o),v=um(_,g,m),y=i?om(v,o,a,l,c):v;sm(_,y)||(n?.(y,cm(p,m)),r(y,lm(p)))},[e,t,n,r,i,a,o,s,c,l,u,d])}function fm({discreteValue:e,isDiscrete:t,lastInternalDiscreteValueRef:n,max:r,min:i,setDiscreteValue:a,snapValues:o,step:s,value:c}){_.useEffect(()=>{if(!t||c===void 0||e===void 0)return;let l=n.current;(l===void 0||!sm(c,l)&&!sm(c,om(l,i,r,s,o)))&&a(void 0)},[e,t,n,r,i,a,o,s,c])}function pm({defaultValue:e,largeStep:t,max:n,min:r,onValueChange:i,onValueCommitted:a,snapValues:o,step:s,value:c,variant:l}){let[u,d]=_.useState(()=>c===void 0?e:void 0),f=_.useRef(c===void 0?e:void 0),p=_.useRef(null),m=l===`discrete`,h=m?u??c??e:c,g=m?Math.max((n-r)/1e3,1e-6):s,v=m?t??s:t,y=_.useMemo(()=>im(h,e,r,n),[h,e,r,n]);return fm({discreteValue:u,isDiscrete:m,lastInternalDiscreteValueRef:f,max:n,min:r,setDiscreteValue:d,snapValues:o,step:s,value:c}),{handleValueChange:_.useCallback((t,a)=>{if(p.current=a,m){let l=am(t,c,e,r);f.current=l,d(l),i?.(om(l,r,n,s,o),a);return}i?.(t,a)},[e,m,n,r,i,o,s,c]),handleValueCommitted:_.useCallback((t,l)=>{if(!m){a?.(t,l);return}let u=am(t,c,e,r),h=om(u,r,n,s,o);f.current=h,d(h),!sm(h,u)&&p.current&&i?.(h,p.current),a?.(h,l)},[e,m,n,r,i,a,o,s,c]),isDiscrete:m,resolvedValue:h,rootLargeStep:v,rootStep:g,values:y}}function mm({defaultValue:e,disabled:t,largeStep:n,markerCount:r,max:i,min:a,onBlurCapture:o,onPointerCancelCapture:s,onPointerDownCapture:c,onPointerUpCapture:l,onValueChange:u,onValueCommitted:d,resetValue:f,snapValues:p,step:m,value:h,variant:g}){let _=pm({defaultValue:e,largeStep:n,max:i,min:a,onValueChange:u,onValueCommitted:d,snapValues:p,step:m,value:h,variant:g}),v=tm({disabled:t,onBlurCapture:o,onPointerCancelCapture:s,onPointerDownCapture:c,onPointerUpCapture:l}),y=em({markerCount:r,max:i,min:a,step:m,variant:g}),b=Qp({disabled:t,handleValueChange:_.handleValueChange,max:i,min:a,values:_.values});return{handleThumbDoubleClick:dm({defaultValue:e,disabled:t,handleValueChange:b,handleValueCommitted:_.handleValueCommitted,isDiscrete:_.isDiscrete,max:i,min:a,resetValue:f,snapValues:p,step:m,value:h,values:_.values}),handleValueChange:b,pointerDrag:v,resolvedMarkerCount:y,sliderValue:_}}function hm({className:e,defaultValue:t,disabled:n,getAriaLabel:r,largeStep:i,markerCount:a,markerValues:o,onBlurCapture:s,onPointerCancelCapture:c,onPointerDownCapture:l,onPointerUpCapture:u,onValueChange:d,onValueCommitted:f,orientation:p=`horizontal`,resetValue:m,showFill:h=!0,snapValues:g,step:_=1,thumbAlignment:v=`edge`,variant:y=`continuous`,value:b,min:x=0,max:S=100,...C}){let{handleThumbDoubleClick:w,handleValueChange:T,pointerDrag:E,resolvedMarkerCount:D,sliderValue:O}=mm({defaultValue:t,disabled:n,largeStep:i,markerCount:a,max:S,min:x,onBlurCapture:s,onPointerCancelCapture:c,onPointerDownCapture:l,onPointerUpCapture:u,onValueChange:d,onValueCommitted:f,resetValue:m,snapValues:g,step:_,value:b,variant:y});return(0,Q.jsx)(Yf,{className:Z(`app-no-drag data-horizontal:w-full data-vertical:h-full`,`[--slider-active-color:var(--foreground)] [--slider-track-color:color-mix(in_oklab,var(--muted-foreground)_38%,transparent)]`,`data-[disabled]:[--slider-active-color:var(--foreground)] data-[disabled]:[--slider-track-color:var(--foreground)]`,e),"data-slot":`slider`,"data-variant":y,defaultValue:O.isDiscrete?void 0:t,value:O.resolvedValue,min:x,max:S,disabled:n,largeStep:O.rootLargeStep,onBlurCapture:E.handleBlurCapture,onPointerCancelCapture:E.handlePointerCancelCapture,onPointerDownCapture:E.handlePointerDownCapture,onPointerUpCapture:E.handlePointerUpCapture,onValueChange:T,onValueCommitted:O.handleValueCommitted,orientation:p,step:O.rootStep,thumbAlignment:v,thumbCollisionBehavior:`none`,...C,children:(0,Q.jsx)(Jp,{count:O.values.length,disabled:n,getAriaLabel:r,isDiscrete:O.isDiscrete,isPointerDragging:E.isPointerDragging,markerCount:D,markerValues:o,max:S,min:x,onThumbDoubleClick:w,orientation:p,showFill:h})})}var gm=`block h-full min-w-0 overflow-hidden whitespace-nowrap font-sans text-xs leading-5 tabular-nums`,_m=`inline-grid h-5 shrink-0`;function vm({ariaLabel:e,disabled:t=!1,editAriaLabel:n,layout:r=`reference`,maxValueLabel:i,onCommit:a,onStep:o,textAlign:s=`right`,valueLabel:c}){let[l,u]=(0,_.useState)(!1),d=(0,_.useRef)(null),f=(0,_.useRef)(c),p=km(c),m=xm({layout:r,textAlign:s}),h=Om(c,i);if((0,_.useEffect)(()=>{f.current=c},[c]),(0,_.useEffect)(()=>{if(l){let e=d.current;if(!e)return;e.textContent=f.current,e.focus(),Am(e)}},[l]),t||!a||!p){let e=t?`text-[color:color-mix(in_oklab,var(--foreground)_60%,transparent)] opacity-60`:`text-[color:var(--muted-foreground)]`;return(0,Q.jsxs)(`span`,{className:bm(r,`cursor-default`),children:[r===`reference`?(0,Q.jsx)(ym,{valueLabel:h}):null,(0,Q.jsx)(`span`,{className:`col-start-1 row-start-1 cursor-default ${e} ${m}`,children:c})]})}function g(){a?.(d.current?.textContent??f.current),u(!1)}return(0,Q.jsxs)(`span`,{className:bm(r),children:[r===`reference`?(0,Q.jsx)(ym,{valueLabel:h}):null,l?(0,Q.jsx)(Sm,{ariaLabel:e,editorRef:d,layout:r,onCancel:()=>u(!1),onCommit:g,onStep:o,textClassName:m}):(0,Q.jsx)(Cm,{ariaLabel:n??`编辑${e}`,layout:r,onBeginEditing:()=>u(!0),textClassName:m,valueLabel:c})]})}function ym({valueLabel:e}){return(0,Q.jsx)(`span`,{"aria-hidden":`true`,className:`invisible col-start-1 row-start-1 min-w-[4ch] pointer-events-none text-[color:var(--muted-foreground)] ${xm({layout:`reference`,textAlign:`right`})}`,"data-slider-value-label-measure":``,children:e})}function bm(e,t=``){return[_m,e===`content`?`w-fit justify-items-start`:`place-items-center`,t].filter(Boolean).join(` `)}function xm({layout:e,textAlign:t}){return[gm,e===`content`?`w-auto`:`w-full`,t===`left`?`text-left`:`text-right`].join(` `)}function Sm({ariaLabel:e,editorRef:t,layout:n,onCancel:r,onCommit:i,onStep:a,textClassName:o}){return(0,Q.jsx)(`span`,{"aria-label":e,className:`col-start-1 row-start-1 cursor-text p-0 text-[color:var(--foreground)] outline-none ${n===`content`?`justify-self-start`:``} ${o}`,contentEditable:!0,onBlur:i,onFocus:e=>Am(e.currentTarget),onKeyDown:e=>{if(e.key===`Enter`&&(e.preventDefault(),i()),e.key===`Escape`&&(e.preventDefault(),r()),e.key===`ArrowUp`||e.key===`ArrowDown`){let t=a?.(e.key===`ArrowUp`?1:-1,e.currentTarget.textContent??``);typeof t==`string`&&(e.preventDefault(),e.currentTarget.textContent=t,Am(e.currentTarget))}},onPointerDown:e=>e.stopPropagation(),ref:t,role:`textbox`,suppressContentEditableWarning:!0,tabIndex:0})}function Cm({ariaLabel:e,layout:t,onBeginEditing:n,textClassName:r,valueLabel:i}){function a(e){e.stopPropagation(),n()}return(0,Q.jsx)(`button`,{"aria-label":e,className:`col-start-1 row-start-1 h-full min-w-0 appearance-none cursor-text border-0 bg-transparent p-0 transition-colors ${t===`content`?`w-auto justify-self-start`:`w-full`}`,onClick:a,onKeyDown:e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),e.stopPropagation(),n())},onMouseDown:wm,onMouseUp:a,onPointerDown:wm,onPointerUp:a,type:`button`,children:(0,Q.jsx)(`span`,{className:`cursor-text text-[color:var(--muted-foreground)] transition-colors duration-200 ease-out hover:text-[color:var(--foreground)] ${r}`,children:i})})}function wm(e){e.stopPropagation()}function Tm(e,{max:t=100,min:n=0}){let r=Array.from(e.matchAll(/-?\d+(?:\.\d+)?/g));if(r.length===0)return;let i=Math.max(...r.map(Em)),a=[n,t].map(e=>Dm(e,i)).sort((e,t)=>t.length-e.length)[0];return e.replaceAll(/-?\d+(?:\.\d+)?/g,a??``)}function Em(e){return e[0].split(`.`)[1]?.length??0}function Dm(e,t){return t>0?e.toFixed(t):`${Math.round(e)}`}function Om(e,t){return!t||e.length>t.length?e:t}function km(e){return/-?\d+(?:\.\d+)?/.test(e)}function Am(e){let t=window.getSelection();if(!t)return;let n=document.createRange();n.selectNodeContents(e),t.removeAllRanges(),t.addRange(n)}var jm=Ho,Mm=Dt(Z(`flex field-sizing-content resize-none`,Uo),{variants:{size:{content:`min-h-0 px-2 py-2 text-sm/relaxed`,sm:`min-h-14 px-2 py-1.5 text-xs/relaxed`,default:`min-h-16 px-2 py-2 text-xs-plus/relaxed`,lg:`min-h-20 px-2.5 py-2.5 text-sm/relaxed`,xl:`min-h-24 px-3 py-3 text-base/relaxed`},variant:{default:``,"code-editor":`relative z-10 min-h-0 overflow-x-auto overflow-y-hidden font-mono whitespace-pre text-xs/relaxed text-transparent caret-[color:var(--foreground)] selection:bg-[color:var(--accent)] selection:text-transparent`}},defaultVariants:{size:`default`,variant:`default`}}),Nm=_.forwardRef(function({className:e,size:t,variant:n,...r},i){return(0,Q.jsx)(`textarea`,{ref:i,"data-size":t??`default`,"data-slot":`textarea`,"data-variant":n??`default`,className:Z(Mm({size:t,variant:n}),e),...r})}),Pm=_.createContext(`default`);function Fm(){return _.useContext(Pm)}var Im=Dt(Z(`group/input-group relative flex w-full min-w-0 items-center rounded-lg border border-[color:color-mix(in_oklab,var(--border)_12%,transparent)] transition-colors outline-none in-data-[slot=combobox-content]:focus-within:border-inherit in-data-[slot=combobox-content]:focus-within:ring-0 has-data-[align=block-end]:rounded-lg has-data-[align=block-start]:rounded-lg has-[[data-slot][aria-invalid=true]]:border-[color:var(--destructive)] has-[textarea]:rounded-lg has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>textarea]:h-auto has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-end]]:[&>input]:pr-1.5 has-[>[data-align=inline-start]]:[&>input]:pl-1.5`,`[&:not(:focus-within):hover]:!border-[color:color-mix(in_oklab,var(--border)_20%,transparent)] [&:not(:focus-within):hover]:text-[color:var(--foreground)]`),{variants:{size:{sm:`h-6`,default:`h-7`,lg:`h-8`,xl:`h-10`},surfaceStyle:{default:jm,transparent:`bg-transparent dark:bg-transparent`,"toolbar-address":``},focusStyle:{default:`has-[[data-slot=input-group-control]:focus]:border-[color:color-mix(in_oklab,var(--border)_30%,transparent)] in-data-[slot=combobox-content]:has-[[data-slot=input-group-control]:focus]:border-inherit`,none:``,"toolbar-address":``}},defaultVariants:{size:`default`,surfaceStyle:`default`,focusStyle:`default`}});function Lm({className:e,surfaceStyle:t,focusStyle:n,size:r=`default`,...i}){let a=r??`default`;return(0,Q.jsx)(Pm.Provider,{value:a,children:(0,Q.jsx)(`div`,{"data-focus-style":n??void 0,"data-size":a,"data-slot":`input-group`,"data-surface-style":t??void 0,role:`group`,className:Z(Im({focusStyle:n,size:a,surfaceStyle:t}),e),...i})})}var Rm=Dt(`flex h-auto cursor-text items-center justify-center gap-1 py-2 font-medium text-[color:var(--muted-foreground)] select-none group-data-[disabled=true]/input-group:opacity-50 [&>svg]:text-[color:var(--foreground)] **:data-[slot=kbd]:rounded-[calc(var(--radius-sm)-2px)] **:data-[slot=kbd]:bg-[color:color-mix(in_oklab,var(--muted-foreground)_10%,transparent)] **:data-[slot=kbd]:px-1 **:data-[slot=kbd]:text-[0.625rem] [&>svg:not([class*='size-'])]:size-3.5`,{variants:{align:{"inline-start":`order-first pl-2 has-[>button]:pl-px has-[>kbd]:ml-[-0.275rem]`,"inline-end":`order-last pr-1.5 has-[>button]:pr-0.5 has-[>kbd]:mr-[-0.275rem]`,"block-start":`order-first w-full justify-start px-2 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2`,"block-end":`order-last w-full justify-start px-2 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2`},size:{sm:`text-xs/relaxed`,default:`text-xs/relaxed`,lg:`gap-1.5 text-sm/relaxed data-[align=inline-start]:pl-2.5 data-[align=inline-start]:has-[>button]:pl-px data-[align=inline-end]:pr-2 data-[align=inline-end]:has-[>button]:pr-0.5 data-[align=block-start]:px-2.5 data-[align=block-end]:px-2.5 [&>svg:not([class*='size-'])]:size-4`,xl:`gap-2 text-base/relaxed data-[align=inline-start]:pl-3 data-[align=inline-start]:has-[>button]:pl-px data-[align=inline-end]:pr-2.5 data-[align=inline-end]:has-[>button]:pr-0.5 data-[align=block-start]:px-3 data-[align=block-end]:px-3 [&>svg:not([class*='size-'])]:size-4`}},defaultVariants:{align:`inline-start`,size:`default`}});function zm({className:e,align:t=`inline-start`,...n}){let r=Fm();return(0,Q.jsx)(`div`,{role:`group`,"data-slot":`input-group-addon`,"data-align":t,className:Z(Rm({align:t,size:r}),e),onMouseDown:e=>{e.target.closest(`button`)||(e.preventDefault(),e.currentTarget.parentElement?.querySelector(`input`)?.focus())},...n})}var Bm=Dt(`flex items-center gap-2 text-[color:color-mix(in_oklab,var(--foreground)_40%,transparent)] group-hover/input-group:text-[color:var(--foreground)] group-has-[[data-slot=input-group-control]:focus]/input-group:text-[color:var(--foreground)] [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4`,{variants:{size:{sm:`text-xs/relaxed`,default:`text-xs/relaxed`,lg:`text-sm/relaxed [&_svg:not([class*='size-'])]:size-4`,xl:`text-base/relaxed [&_svg:not([class*='size-'])]:size-4`}},defaultVariants:{size:`default`}});function Vm({className:e,...t}){let n=Fm();return(0,Q.jsx)(`span`,{"data-slot":`input-group-text`,className:Z(Bm({size:n}),e),...t})}var Hm=Dt(`h-full flex-1 border-0 shadow-none ring-0 focus-visible:ring-0 aria-invalid:ring-0`,{variants:{size:{sm:`px-2 py-0 text-xs/relaxed`,default:`px-2 py-0.5 text-xs/relaxed`,lg:`px-2.5 py-1 text-sm/relaxed`,xl:`px-3 py-1.5 text-base/relaxed`},surfaceStyle:{default:`rounded-none bg-transparent dark:bg-transparent`,hoverInput:`rounded-lg bg-transparent hover:bg-[color:color-mix(in_oklab,var(--input)_30%,transparent)] dark:bg-transparent dark:hover:bg-[color:color-mix(in_oklab,var(--input)_30%,transparent)]`,"toolbar-address":`rounded-none bg-transparent dark:bg-transparent`},typographyStyle:{default:``,addressBar:`text-xs-plus tracking-normal font-normal md:text-xs-plus`,popup:`popup-text-xs-plus leading-normal tracking-tight font-normal`}},defaultVariants:{size:`default`,surfaceStyle:`default`,typographyStyle:`default`}});function Um({className:e,surfaceStyle:t,typographyStyle:n,...r}){let i=Fm();return(0,Q.jsx)(Ko,{"data-surface-style":t??void 0,"data-typography-style":n??void 0,"data-slot":`input-group-control`,className:Z(Hm({size:i,surfaceStyle:t,typographyStyle:n}),e),...r})}_.forwardRef(function({className:e,...t},n){let r=Fm();return(0,Q.jsx)(Nm,{ref:n,"data-slot":`input-group-control`,className:Z(`flex-1 resize-none rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0 aria-invalid:ring-0 dark:bg-transparent`,e),size:r,...t})});var Wm=_.createContext(void 0);function Gm(e){let t=_.useContext(Wm);if(t===void 0&&!e)throw Error(We(47));return t}var Km={...tu,disabled:e=>e.disabled,instantType:e=>e.instantType,openMethod:e=>e.openMethod,openChangeReason:e=>e.openChangeReason,modal:e=>e.modal,focusManagerModal:e=>e.focusManagerModal,stickIfOpen:e=>e.stickIfOpen,titleElementId:e=>e.titleElementId,descriptionElementId:e=>e.descriptionElementId,openOnHover:e=>e.openOnHover,closeDelay:e=>e.closeDelay,adaptiveOrigin:e=>e.adaptiveOrigin},qm=class extends Al{constructor(e,t,n){let r=new Jl;super(Jm(e,r,t,n),Ym(r),Km)}setOpen=(e,t)=>{let n=t.reason===bo,r=t.reason===`trigger-press`&&t.event.detail===0,i=!e&&(t.reason===`escape-key`||t.reason==null),a=Vl(t),o=this.select(`activeTriggerId`);if(!e&&t.reason===`close-press`&&t.trigger==null&&o!=null&&(t.trigger=this.context.triggerElements.getById(o)??this.select(`activeTriggerElement`)??void 0),this.context.onOpenChange?.(e,t),t.isCanceled)return;this.state.floatingRootContext.dispatchOpenChange(e,t);let s=()=>{let n=Bl(this.state,e,t.trigger,a());n.openChangeReason=t.reason,this.update(n)};n?(this.set(`stickIfOpen`,!0),this.context.stickIfOpenTimeout.start(500,()=>{this.set(`stickIfOpen`,!1)}),co.flushSync(s)):s();let c;r?c=`click`:i?c=`dismiss`:t.reason===`focus-out`&&(c=`focus`),this.set(`instantType`,c)}};function Jm(e,t,n,r=!1){let i={...Yl(t,n,r),disabled:!1,modal:!1,focusManagerModal:!1,instantType:void 0,openMethod:null,openChangeReason:null,titleElementId:void 0,descriptionElementId:void 0,stickIfOpen:!0,openOnHover:!1,closeDelay:0,adaptiveOrigin:void 0,...e};return i.open&&e?.mounted===void 0&&(i.mounted=!0),i}function Ym(e){return{popupRef:_.createRef(),onOpenChange:void 0,onOpenChangeComplete:void 0,triggerFocusTargetRef:_.createRef(),beforeContentFocusGuardRef:_.createRef(),stickIfOpenTimeout:new to,triggerElements:e}}var Xm=Zo(function({props:e}){let{children:t,open:n,defaultOpen:r=!1,onOpenChange:i,onOpenChangeComplete:a,modal:o=!1,handle:s,triggerId:c,defaultTriggerId:l=null}=e,u=Qm(s,{modal:o,open:r,openProp:n,activeTriggerId:l,triggerIdProp:c});u.useControlledProp(`openProp`,n),u.useControlledProp(`triggerIdProp`,c);let d=u.useState(`open`),f=u.useState(`mounted`),p=u.useState(`payload`);u.useContextCallback(`onOpenChange`,i),u.useContextCallback(`onOpenChangeComplete`,a),ql(u,d),Wl(u);let{forceUnmount:m}=Gl(d,u,()=>{u.update({stickIfOpen:!0,openChangeReason:null})});u.useSyncedValues({modal:o}),_.useEffect(()=>{d||u.context.stickIfOpenTimeout.clear()},[u,d]),_.useImperativeHandle(e.actionsRef,()=>({unmount:m,close:()=>u.setOpen(!1,Ro(Io))}),[m,u]);let h=d||f;return(0,Q.jsxs)(Wm.Provider,{value:u,children:[s&&(0,Q.jsx)(Ll,{handle:s,store:u}),h&&(0,Q.jsx)($m,{store:u,modal:o}),typeof t==`function`?t({payload:p}):t]})});function Zm(e){return Gm(!0)?(0,Q.jsx)(Xm,{props:e}):(0,Q.jsx)(Qs,{children:(0,Q.jsx)(Xm,{props:e})})}function Qm(e,t){let n=Il((e,n)=>new qm(t,e,n));return _.useEffect(()=>n.context.stickIfOpenTimeout.disposeEffect(),[n]),n}function $m({store:e,modal:t}){let n=mc(e.useState(`floatingRootContext`),{outsidePressEvent:{mouse:t===`trap-focus`?`sloppy`:`intentional`,touch:`sloppy`}}),r=n.reference,i=n.floating;return Kl(e,{activeTriggerProps:r,inactiveTriggerProps:r,popupProps:i}),null}function eh(e,t){let n=_.useRef(null);function r(t){co.flushSync(()=>{e.setOpen(!1,Ro(Do,t.nativeEvent,t.currentTarget))}),Ya(n.current)?.focus()}function i(n){let r=e.select(`positionerElement`);if(r&&Xa(n,r))e.context.beforeContentFocusGuardRef.current?.focus();else{co.flushSync(()=>{e.setOpen(!1,Ro(Do,n.nativeEvent,n.currentTarget))});let i=Ja(e.context.triggerFocusTargetRef.current||t.current);for(;i!==null&&$(r,i);){let e=i;if(i=Ga(i),i===e)break}i?.focus()}}return{preFocusGuardRef:n,handlePreFocusGuardFocus:r,handleFocusTargetFocus:i}}function th(e){let t=_.useRef(``),n=_.useCallback(n=>{n.defaultPrevented||(t.current=n.pointerType,e(n,n.pointerType))},[e]);return{onClick:_.useCallback(n=>{if(n.detail===0){e(n,`keyboard`);return}`pointerType`in n?e(n,n.pointerType):e(n,t.current),t.current=``},[e]),onPointerDown:n}}function nh(e,t){let{onClick:n,onPointerDown:r}=th(q((n,r)=>{(typeof e==`function`?e():e)||t(r||(Xr?`touch`:``))}));return _.useMemo(()=>({onClick:n,onPointerDown:r}),[n,r])}function rh(e){let[t,n]=_.useState(null),r=nh(e,n);return _o(e,t=>{t&&!e&&n(null)}),_.useMemo(()=>({openMethod:t,triggerProps:r}),[t,r])}var ih=Qo(function(e,t){let{render:n,className:r,style:i,disabled:a=!1,nativeButton:o=!0,handle:s,payload:c,openOnHover:l=!1,delay:u=300,closeDelay:d=0,id:f,...p}=e,m=Gm(!0),h=nu(s)??m;if(!h)throw Error(We(74));let g=Lr(f),v=h.useState(`isTriggerActive`,g),y=h.useState(`floatingRootContext`),b=h.useState(`isOpenedByTrigger`,g),x=h.useState(`triggerPopupId`,g),S=_.useRef(null),{registerTrigger:C,isMountedByThisTrigger:w}=Ul(g,S,h,{payload:c,disabled:a,openOnHover:l,closeDelay:d}),T=h.useState(`openChangeReason`),E=h.useState(`stickIfOpen`),D=h.useState(`openMethod`),O=h.useState(`focusManagerModal`),k=hu(y,{enabled:!a&&l&&(D!==`touch`||T!==`trigger-press`),mouseOnly:!0,move:!1,handleClose:Mu(),restMs:u,delay:{close:d},triggerElementRef:S,isActiveTrigger:v,isClosing:()=>h.select(`transitionStatus`)===`ending`}),A=cc(y,{stickIfOpen:E}),j=nh(()=>h.select(`open`),e=>{h.set(`openMethod`,e)}),M=h.useState(`triggerProps`,w),{getButtonProps:N,buttonRef:P}=Xe({disabled:a,native:o}),F={open(e){return e&&T===`trigger-press`?Oi.open(e):Di.open(e)}},{preFocusGuardRef:I,handlePreFocusGuardFocus:L,handleFocusTargetFocus:R}=eh(h,S),z=mt(`button`,e,{state:{disabled:a,open:b},ref:[P,t,C,S],props:[A.reference,k,M,j,{[Fs]:``,id:g,"aria-haspopup":`dialog`,"aria-expanded":b,"aria-controls":x},p,N],stateAttributesMapping:F}),ee=(0,Q.jsx)(_.Fragment,{children:z},g);return w&&!O?(0,Q.jsxs)(_.Fragment,{children:[(0,Q.jsx)(vs,{ref:I,onFocus:L}),ee,(0,Q.jsx)(vs,{ref:h.context.triggerFocusTargetRef,onFocus:R})]}):ee}),ah=_.createContext(void 0);function oh(){let e=_.useContext(ah);if(e===void 0)throw Error(We(45));return e}var sh=_.forwardRef(function(e,t){let{keepMounted:n=!1,...r}=e;return Gm().useState(`mounted`)||n?(0,Q.jsx)(ah.Provider,{value:n,children:(0,Q.jsx)(Us,{ref:t,...r})}):null}),ch=_.createContext(void 0);function lh(){let e=_.useContext(ch);if(!e)throw Error(We(46));return e}var uh=_.forwardRef(function(e,t){let{cutout:n,...r}=e,i;if(n){let e=n.getBoundingClientRect();i=`polygon(0% 0%,100% 0%,100% 100%,0% 100%,0% 0%,${e.left}px ${e.top}px,${e.left}px ${e.bottom}px,${e.right}px ${e.bottom}px,${e.right}px ${e.top}px,${e.left}px ${e.top}px)`}return(0,Q.jsx)(`div`,{ref:t,role:`presentation`,"data-base-ui-inert":``,...r,style:{position:`fixed`,inset:0,userSelect:`none`,WebkitUserSelect:`none`,clipPath:i}})}),dh={},fh={},ph=``;function mh(e,t){return ae(e)?e:t}function hh(e,t,n){return/hidden|clip/.test(e.getComputedStyle(mh(t,n)).overflowY)}function gh(e){if(typeof document>`u`)return!1;let t=Je(e);return V(t).innerWidth-t.documentElement.clientWidth>0}function _h(e){if(!(typeof CSS<`u`&&CSS.supports&&CSS.supports(`scrollbar-gutter`,`stable`))||typeof document>`u`)return!1;let t=Je(e),n=t.documentElement,r=t.body,i=mh(n,r),a=i.style.overflowY,o=n.style.scrollbarGutter;n.style.scrollbarGutter=`stable`,i.style.overflowY=`scroll`;let s=i.offsetWidth;i.style.overflowY=`hidden`;let c=i.offsetWidth;return i.style.overflowY=a,n.style.scrollbarGutter=o,s===c}function vh(e){let t=Je(e),n=t.documentElement,r=t.body,i=mh(n,r),a={overflowY:i.style.overflowY,overflowX:i.style.overflowX};return Object.assign(i.style,{overflowY:`hidden`,overflowX:`hidden`}),()=>{Object.assign(i.style,a)}}function yh(e){let t=Je(e),n=t.documentElement,r=t.body,i=V(n),a=0,o=0,s=!1,c=ao.create();if(ti&&(i.visualViewport?.scale??1)!==1)return()=>{};function l(){let t=i.getComputedStyle(n),c=i.getComputedStyle(r),l=(t.scrollbarGutter||``).includes(`both-edges`)?`stable both-edges`:`stable`;a=n.scrollTop,o=n.scrollLeft,dh={scrollbarGutter:n.style.scrollbarGutter,overflowY:n.style.overflowY,overflowX:n.style.overflowX},ph=n.style.scrollBehavior,fh={position:r.style.position,height:r.style.height,width:r.style.width,boxSizing:r.style.boxSizing,overflowY:r.style.overflowY,overflowX:r.style.overflowX,scrollBehavior:r.style.scrollBehavior};let u=n.scrollHeight>n.clientHeight,d=n.scrollWidth>n.clientWidth,f=t.overflowY===`scroll`||c.overflowY===`scroll`,p=t.overflowX===`scroll`||c.overflowX===`scroll`,m=Math.max(0,i.innerWidth-r.clientWidth),h=Math.max(0,i.innerHeight-r.clientHeight),g=parseFloat(c.marginTop)+parseFloat(c.marginBottom),_=parseFloat(c.marginLeft)+parseFloat(c.marginRight),v=mh(n,r);if(s=_h(e),s){n.style.scrollbarGutter=l,v.style.overflowY=`hidden`,v.style.overflowX=`hidden`;return}Object.assign(n.style,{scrollbarGutter:l,overflowY:`hidden`,overflowX:`hidden`}),(u||f)&&(n.style.overflowY=`scroll`),(d||p)&&(n.style.overflowX=`scroll`),Object.assign(r.style,{position:`relative`,height:g||h?`calc(100dvh - ${g+h}px)`:`100dvh`,width:_||m?`calc(100vw - ${_+m}px)`:`100vw`,boxSizing:`border-box`,overflowY:`hidden`,overflowX:`hidden`,scrollBehavior:`unset`}),r.scrollTop=a,r.scrollLeft=o,n.setAttribute(`data-base-ui-scroll-locked`,``),n.style.scrollBehavior=`unset`}function u(){Object.assign(n.style,dh),Object.assign(r.style,fh),s||(n.scrollTop=a,n.scrollLeft=o,n.removeAttribute(`data-base-ui-scroll-locked`),n.style.scrollBehavior=ph)}function d(){u(),c.request(l)}l();let f=ds(i,`resize`,d);return()=>{c.cancel(),u(),typeof i.removeEventListener==`function`&&f()}}var bh=new class{lockCount=0;restore=null;timeoutLock=to.create();timeoutUnlock=to.create();acquire(e){return this.lockCount+=1,this.lockCount===1&&this.restore===null&&this.timeoutLock.start(0,()=>this.lock(e)),this.release}release=()=>{--this.lockCount,this.lockCount===0&&this.restore&&this.timeoutUnlock.start(0,this.unlock)};unlock=()=>{this.lockCount===0&&this.restore&&(this.restore?.(),this.restore=null)};lock(e){if(this.lockCount===0||this.restore!==null)return;let t=Je(e),n=t.documentElement,r=t.body,i=V(n);if(hh(i,n,r)){let t=new i.MutationObserver(()=>{hh(i,n,r)||(t.disconnect(),this.restore=null,this.lock(e))}),a={attributes:!0};t.observe(n,a),t.observe(r,a),this.restore=()=>t.disconnect();return}let a=Xr||!gh(e);this.restore=a?vh(e):yh(e)}};function xh(e=!0,t=null){J(()=>{if(e)return bh.acquire(t)},[e,t])}var Sh=20;function Ch(e,t,n,r){let[i,a]=_.useState(!1);J(()=>{if(!e||!t||n==null){a(!1);return}let r=Je(n).documentElement.clientWidth,i=n.offsetWidth;a(r>0&&i>0&&i>=r-Sh)},[e,t,n]),xh(e&&(!t||i),r)}var wh=_.forwardRef(function(e,t){let{render:n,className:r,style:i,anchor:a,positionMethod:o,side:s,align:c,sideOffset:l,alignOffset:u,collisionBoundary:d=`clipping-ancestors`,collisionPadding:f,arrowPadding:p,sticky:m,disableAnchorTracking:h=!1,collisionAvoidance:g=Ls,...v}=e,y=Gm(),b=oh(),x=Xs(),S=y.useState(`floatingRootContext`),C=y.useState(`mounted`),w=y.useState(`open`),T=y.useState(`openChangeReason`),E=y.useState(`activeTriggerElement`),D=y.useState(`modal`),O=y.useState(`openMethod`),k=y.useState(`positionerElement`),A=y.useState(`instantType`),j=y.useState(`transitionStatus`),M=y.useState(`adaptiveOrigin`),N=_.useRef(null),P=fo(k),F=fd({anchor:a,floatingRootContext:S,positionMethod:o,mounted:C,side:s,sideOffset:l,align:c,alignOffset:u,arrowPadding:p,collisionBoundary:d,collisionPadding:f,sticky:m,disableAnchorTracking:h,keepMounted:b,nodeId:x,collisionAvoidance:g,adaptiveOrigin:M}),I=S.useState(`domReferenceElement`);J(()=>{let e=I,t=N.current;if(e&&(N.current=e),t&&e&&e!==t){y.set(`instantType`,void 0);let e=new AbortController;return P(()=>{y.set(`instantType`,`trigger-change`)},e.signal),()=>{e.abort()}}},[I,P,y]);let L=D===!0&&T!==`trigger-hover`;Ch(w&&L,O===`touch`,k,E);let R=y.useStateSetter(`positionerElement`),z=gd(e,{open:w,side:F.side,align:F.align,anchorHidden:F.anchorHidden,instant:A},{styles:F.positionerStyles,transitionStatus:j,props:v,refs:[t,R],hidden:!C,inert:!w});return(0,Q.jsxs)(ch.Provider,{value:F,children:[C&&L&&(0,Q.jsx)(uh,{inert:bd(!w),cutout:E}),(0,Q.jsx)(Zs,{id:x,children:z})]})}),Th=_.createContext(void 0);function Eh(e){let t=_.useContext(Th);if(t===void 0&&!e)throw Error(We(69));return t}var Dh=_.createContext(void 0);function Oh(){let[e,t]=_.useState(0),n=q(()=>(t(e=>e+1),()=>{t(e=>Math.max(0,e-1))}));return{context:_.useMemo(()=>({register:n}),[n]),hasClosePart:e>0}}var kh=_.forwardRef(function(e,t){let{render:n,className:r,style:i,initialFocus:a,finalFocus:o,...s}=e,c=Gm(),l=lh(),u=Eh(!0)!=null,{context:d,hasClosePart:f}=Oh(),p=c.useState(`open`),m=c.useState(`openMethod`),h=c.useState(`instantType`),g=c.useState(`transitionStatus`),_=c.useState(`popupProps`),v=c.useState(`titleElementId`),y=c.useState(`descriptionElementId`),b=c.useState(`modal`),x=c.useState(`mounted`),S=c.useState(`openChangeReason`),C=c.useState(`activeTriggerElement`),w=c.useState(`floatingRootContext`),T=w.useState(`floatingId`),E=c.useState(`disabled`),D=c.useState(`openOnHover`),O=c.useState(`closeDelay`);po({open:p,ref:c.context.popupRef,onComplete(){p&&c.context.onOpenChangeComplete?.(!0)}}),pu(w,{enabled:D&&!E,closeDelay:O});let k=a===void 0?Fl(c.context.popupRef):a,A=b!==!1&&f;c.useSyncedValue(`focusManagerModal`,A);let j=c.useStateSetter(`popupElement`),M=mt(`div`,e,{state:{open:p,side:l.side,align:l.align,instant:h,transitionStatus:g},ref:[t,c.context.popupRef,j],props:[_,{id:T,role:`dialog`,...Pl,"aria-labelledby":v,"aria-describedby":y,onKeyDown(e){u&&Sp.has(e.key)&&e.stopPropagation()}},hd(g),s],stateAttributesMapping:Ai});return(0,Q.jsx)(sc,{context:w,openInteractionType:m,modal:A,disabled:!x||S===`trigger-hover`,initialFocus:k,returnFocus:o,restoreFocus:`popup`,previousFocusableElement:ie(C)?C:void 0,nextFocusableElement:c.context.triggerFocusTargetRef,beforeContentFocusGuardRef:c.context.beforeContentFocusGuardRef,children:(0,Q.jsx)(Dh.Provider,{value:d,children:M})})}),Ah=`floating-popup-surface z-50 flex w-72 origin-(--transform-origin) flex-col gap-4 rounded-lg border p-2.5 popup-text-xs-plus text-[color:var(--popover-foreground)] outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95`,jh=`floating-popup-surface flex min-h-0 w-full flex-col overflow-hidden rounded-xl border border-[color:color-mix(in_oklab,var(--border)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--foreground)_5%,transparent)] p-0 text-[color:var(--foreground)]`;function Mh({className:e,variant:t=`default`,...n}){return(0,Q.jsx)(`div`,{"data-slot":`popover-content`,"data-variant":t,className:Z(t===`embedded-card`?jh:Ah,e),...n})}function Nh({...e}){return(0,Q.jsx)(Zm,{"data-slot":`popover`,...e})}function Ph({...e}){return(0,Q.jsx)(ih,{"data-slot":`popover-trigger`,...e})}function Fh({className:e,align:t=`center`,alignOffset:n=0,anchor:r,portalContainer:i,side:a=`bottom`,sideOffset:o=4,...s}){let c=wd(i),l=_.useRef(null);return(0,Q.jsx)(sh,{container:c,ref:l,children:(0,Q.jsx)(Cd,{container:l,children:(0,Q.jsx)(wh,{align:t,alignOffset:n,anchor:r,side:a,sideOffset:o,className:`isolate z-50`,children:(0,Q.jsx)(kh,{render:(0,Q.jsx)(Mh,{}),className:Z(e),...s})})})})}function Ih(e){let t=_.useRef(!0);t.current&&(t.current=!1,e())}function Lh(e){return e==null||e.hasAttribute(`disabled`)||e.getAttribute(`aria-disabled`)===`true`}var Rh=_.createContext(void 0),zh=_.createContext(void 0),Bh=_.createContext(void 0);function Vh(){let e=_.useContext(Rh);if(e===void 0)throw Error(We(60));return e}function Hh(){let e=_.useContext(zh);if(e===void 0)throw Error(We(101));return e}function Uh(){let e=_.useContext(Bh);if(e===void 0)throw Error(We(61));return e}var Wh=(e,t)=>Object.is(e,t);function Gh(e,t,n){return e==null||t==null?Object.is(e,t):n(e,t)}function Kh(e,t,n){return Array.isArray(e)&&Array.isArray(t)?!kf(e,t,(e,t)=>Gh(e,t,n)):e!==t}function qh(e,t,n){return e?e.some(e=>e!==void 0&&Gh(t,e,n)):!1}function Jh(e,t,n){return e?e.findIndex(e=>e!==void 0&&Gh(e,t,n)):-1}function Yh(e,t){if(t!==Wh)return n=>qh(e,n,t);let n=new Set(e);return n.delete(void 0),t=>n.has(t)&&(t!==0||e.some(e=>Object.is(t,e)))}function Xh(e,t,n,r){let i=r&&Array.isArray(t)?e.findIndex(Yh(t,n)):Jh(e,t,n);return i===-1?null:i}function Zh(e,t,n,r,i,a){return qh(r,t,i)?a!=null&&e>a&&qh(r,n[a],i)?a:e:e===a?Xh(n,r,i,!0):a}function Qh(e,t,n){return e.filter(e=>!Gh(t,e,n))}function $h(e){if(e==null)return``;if(typeof e==`string`)return e;try{return JSON.stringify(e)}catch{return String(e)}}function eg(e){return typeof e==`object`&&!!e&&Array.isArray(e.items)}function tg(e){return eg(e?.[0])}function ng(e){return tg(e)?e.flatMap(e=>e.items):e}function rg(e){if(!Array.isArray(e))return e!=null&&`null`in e;let t=e;if(tg(t)){for(let e of t)for(let t of e.items)if(t&&t.value==null&&t.label!=null)return!0;return!1}for(let e of t)if(e&&e.value==null&&e.label!=null)return!0;return!1}function ig(e,t){if(t&&e!=null)return t(e)??``;if(e&&typeof e==`object`){if(`label`in e&&e.label!=null)return String(e.label);if(`value`in e)return String(e.value)}return $h(e)}function ag(e,t){return t&&e!=null?t(e)??``:e&&typeof e==`object`&&`value`in e&&`label`in e?$h(e.value):$h(e)}function og(e,t,n){function r(){return ig(e,n)}if(n&&e!=null)return n(e);if(e&&typeof e==`object`&&`label`in e&&e.label!=null)return e.label;if(t&&!Array.isArray(t))return(Object.hasOwn(t,e)?t[e]:void 0)??r();if(Array.isArray(t)){let n=ng(t);if(typeof e!=`object`||!e){let t=n.find(t=>t.value===e);return t&&t.label!=null?t.label:r()}if(`value`in e){let t=n.find(t=>t&&t.value===e.value);if(t&&t.label!=null)return t.label}}return r()}function sg(e,t,n){return e.reduce((e,r,i)=>(i>0&&e.push(`, `),e.push((0,Q.jsx)(_.Fragment,{children:og(r,t,n)},i)),e),[])}var cg={id:e=>e.id,labelId:e=>e.labelId,modal:e=>e.modal,items:e=>e.items,itemToStringLabel:e=>e.itemToStringLabel,isItemEqualToValue:e=>e.isItemEqualToValue,value:e=>e.value,hasSelectedValue:e=>{let{value:t,multiple:n,itemToStringValue:r}=e;return t==null?!1:n&&Array.isArray(t)?t.length>0:ag(t,r)!==``},hasNullItemLabel:(e,t)=>t?rg(e.items):!1,open:e=>e.open,mounted:e=>e.mounted,forceMount:e=>e.forceMount,transitionStatus:e=>e.transitionStatus,openMethod:e=>e.openMethod,activeIndex:e=>e.activeIndex,selectedIndex:e=>e.selectedIndex,isActive:(e,t)=>e.activeIndex===t,isSelected:(e,t)=>{let n=e.isItemEqualToValue,r=e.value;return e.multiple?Array.isArray(r)&&r.some(e=>Gh(t,e,n)):Gh(t,r,n)},isSelectedByFocus:(e,t)=>e.selectedIndex===t,popupProps:e=>e.popupProps,triggerProps:e=>e.triggerProps,triggerElement:e=>e.triggerElement,positionerElement:e=>e.positionerElement,listElement:e=>e.listElement,popupSide:e=>e.popupSide,scrollUpArrowVisible:e=>e.scrollUpArrowVisible,scrollDownArrowVisible:e=>e.scrollDownArrowVisible,hasScrollArrows:e=>e.hasScrollArrows};function lg(e,t){return Math.max(0,e-t)}function ug(e,t){if(t<=0)return 0;let n=Of(e,0,t),r=n,i=t-n,a=r<=1,o=i<=1;return a&&o?r<=i?0:t:a?0:o?t:n}function dg(e){let{id:t,value:n,defaultValue:r=null,onValueChange:i,open:a,defaultOpen:o=!1,onOpenChange:s,name:c,form:l,autoComplete:u,disabled:d=!1,readOnly:f=!1,required:p=!1,modal:m=!0,actionsRef:h,inputRef:g,onOpenChangeComplete:v,items:y,multiple:b=!1,itemToStringLabel:x,itemToStringValue:S,isItemEqualToValue:C=Wh,highlightItemOnHover:w=!0,children:T}=e,{clearErrors:E}=Mr(),{setDirty:D,setTouched:O,setFocused:k,validityData:A,setFilled:j,name:M,disabled:N,validation:P,validationMode:F}=Ar(),I=Ur({id:t}),L=N||d,R=M??c,[z,ee]=ho({controlled:n,default:b?r??lt:r,name:`Select`,state:`value`}),[B,te]=ho({controlled:a,default:o,name:`Select`,state:`open`}),ne=_.useRef([]),V=_.useRef([]),re=_.useRef(null),H=_.useRef(null),U=_.useRef(0),ie=_.useRef(null),W=_.useRef([]),ae=_.useRef(!1),G=_.useRef(null),K=_.useRef(null),oe=_.useRef({allowSelectedMouseUp:!1,allowUnselectedMouseUp:!1,dragY:0}),se=_.useRef(!1),ce=_.useRef(z),{mounted:le,setMounted:ue,transitionStatus:de}=mo(B),{openMethod:fe,triggerProps:pe}=rh(B),me=Se(()=>new Al({id:I,labelId:void 0,modal:m,multiple:b,itemToStringLabel:x,itemToStringValue:S,isItemEqualToValue:C,value:z,open:B,mounted:le,transitionStatus:de,items:y,forceMount:!1,openMethod:null,activeIndex:null,selectedIndex:null,popupProps:ut,triggerProps:ut,triggerElement:null,positionerElement:null,listElement:null,popupSide:null,scrollUpArrowVisible:!1,scrollDownArrowVisible:!1,hasScrollArrows:!1},{setValue:ct,setOpen:ct,handleScrollArrowVisibility:ct,onOpenChangeComplete:ct,listRef:ne,popupRef:re,scrollHandlerRef:H,scrollArrowsMountedCountRef:U,valueRef:ie,valuesRef:W,labelsRef:V,typingRef:ae,selectionRef:oe,firstItemTextRef:G,selectedItemTextRef:K,alignItemWithTriggerActiveRef:se,initialValueRef:ce},cg)).current,he=me.useState(`activeIndex`),ge=me.useState(`selectedIndex`),_e=me.useState(`triggerElement`),ve=me.useState(`positionerElement`),ye=xd(fe),be=fe??ye,xe=_.useMemo(()=>b?``:ag(z,S),[b,z,S]),Ce=_.useMemo(()=>b&&Array.isArray(z)?z.map(e=>ag(e,S)):ag(z,S),[b,z,S]);go(ps(_e),I,z,q(()=>Ce),!L,c);let we=b?Array.isArray(z)&&z.length>0:z!=null&&xe!==``;J(()=>{j(we)},[we,j]),J(function(){let e=Xh(W.current,z,C,b);e===null&&(K.current=null),!B&&me.set(`selectedIndex`,e)},[b,B,z,C,me]),_o(z,()=>{E(R),D(Kh(z,A.initialValue,C)),P.change(z)});let Te=q((e,t)=>{s?.(e,t),!t.isCanceled&&(te(e),!e&&(t.reason===`focus-out`||t.reason===`outside-press`)&&(O(!0),k(!1),F===`onBlur`&&P.commit(z)))}),Ee=q(()=>{ue(!1),me.update({activeIndex:null,openMethod:null,scrollUpArrowVisible:!1,scrollDownArrowVisible:!1}),v?.(!1)});po({enabled:!h,open:B,ref:re,onComplete(){B||Ee()}}),_.useImperativeHandle(h,()=>({unmount:Ee}),[Ee]);let De=q((e,t)=>{i?.(e,t),!t.isCanceled&&ee(e)}),Oe=q(e=>{let t=lg(e.scrollHeight,e.clientHeight),n=ug(e.scrollTop,t),r=n>0,i=n<t;me.set(`scrollUpArrowVisible`,r),me.set(`scrollDownArrowVisible`,i)}),Ae=ru({open:B,onOpenChange:Te,elements:{reference:_e,floating:ve}}),je=cc(Ae,{enabled:!L,event:`mousedown`}),Me=mc(Ae),Ne=Cu(Ae,{enabled:!L,listRef:ne,activeIndex:he,selectedIndex:ge,disabledIndices:lt,onNavigate(e){(e!==null||B)&&me.set(`activeIndex`,e)},focusItemOnHover:w}),Pe=wu(Ae,{enabled:!L&&(B||!f&&!b),listRef:V,activeIndex:he,selectedIndex:ge,disabledIndices:e=>Lh(ne.current[e]),onMatch(e){B?me.set(`activeIndex`,e):De(W.current[e],Ro(vo))},onTyping(e){ae.current=e}}),Fe=_.useMemo(()=>ke(Pe.reference,Ne.reference,Me.reference,je.reference,pe),[je.reference,Pe.reference,Ne.reference,Me.reference,pe]),Ie=_.useMemo(()=>ke(Pl,Pe.floating,Ne.floating,Me.floating),[Pe.floating,Ne.floating,Me.floating]),Le=Ne.item??ut;me.useContextCallback(`setValue`,De),me.useContextCallback(`setOpen`,Te),me.useContextCallback(`handleScrollArrowVisibility`,Oe),me.useContextCallback(`onOpenChangeComplete`,v),Ih(()=>{me.update({popupProps:Ie,triggerProps:Fe})}),me.useSyncedValues({id:I,modal:m,multiple:b,value:z,open:B,mounted:le,transitionStatus:de,popupProps:Ie,triggerProps:Fe,items:y,itemToStringLabel:x,itemToStringValue:S,isItemEqualToValue:C,openMethod:be});let Re=_.useMemo(()=>({disabled:L,readOnly:f,required:p,multiple:b,highlightItemOnHover:w,itemProps:Le}),[L,f,p,b,w,Le]),ze=$e(g,P.inputRef),Be=b?void 0:R,Ve=_.useMemo(()=>!b||!Array.isArray(z)||!R?null:z.map(e=>{let t=ag(e,S);return(0,Q.jsx)(`input`,{type:`hidden`,form:l,name:R,value:t,disabled:L},t)}),[b,z,l,R,S,L]);return(0,Q.jsxs)(Rh.Provider,{value:me,children:[(0,Q.jsx)(zh.Provider,{value:Re,children:(0,Q.jsx)(Bh.Provider,{value:Ae,children:T})}),(0,Q.jsx)(`input`,{...P.getValidationProps(L,{onFocus(){me.state.triggerElement?.focus({focusVisible:!0})},onChange(e){if(e.nativeEvent.defaultPrevented||L||f)return;let t=e.currentTarget.value,n=Ro(vo,e.nativeEvent);function r(){if(b)return;let e=t.toLowerCase(),r=W.current.findIndex(t=>ag(t,S).toLowerCase()===e||ig(t,x).toLowerCase()===e);r===-1&&(r=W.current.findIndex((t,n)=>{let r=V.current[n];return r!=null&&r.toLowerCase()===e}));let i=W.current[r];i!=null&&De(i,n)}me.set(`forceMount`,!0),queueMicrotask(r)}}),id:I&&Be==null?`${I}-hidden-input`:void 0,form:l,name:Be,autoComplete:u,value:xe,disabled:L,required:p&&!(b&&we),readOnly:f,ref:ze,style:R?_s:gs,tabIndex:-1,"aria-hidden":!0,suppressHydrationWarning:!0}),Ve]})}var fg=5;function pg(e,t){let n=mg(t);return e.clientX>=n.left-fg&&e.clientX<=n.right+fg&&e.clientY>=n.top-fg&&e.clientY<=n.bottom+fg}function mg(e){let t=e.getBoundingClientRect(),n=V(e);if(ri)return t;let r=n.getComputedStyle(e,`::before`),i=n.getComputedStyle(e,`::after`);if(r.content===`none`&&i.content===`none`)return t;let a=parseFloat(r.width)||0,o=parseFloat(r.height)||0,s=parseFloat(i.width)||0,c=parseFloat(i.height)||0,l=Math.max(t.width,a,s),u=Math.max(t.height,o,c),d=l-t.width,f=u-t.height;return{left:t.left-d/2,right:t.right+d/2,top:t.top-f/2,bottom:t.bottom+f/2}}var hg=`data-popup-side`,gg=400,_g={...Oi,...Dr,popupSide:e=>e?{[hg]:e}:null,value:()=>null},vg=_.forwardRef(function(e,t){let{render:n,className:r,id:i,disabled:a=!1,nativeButton:o=!0,style:s,...c}=e,{setTouched:l,setFocused:u,validationMode:d,validation:f,state:p,disabled:m}=Ar(),{labelId:h}=zr(),g=Vh(),{readOnly:v,required:y,disabled:b}=Hh(),x=m||b||a,S=g.useState(`open`),C=g.useState(`mounted`),w=g.useState(`value`),T=g.useState(`triggerProps`),E=g.useState(`positionerElement`),D=g.useState(`listElement`),O=g.useState(`popupSide`),k=g.useState(`id`),A=g.useState(`labelId`),j=g.useState(`hasSelectedValue`),M=C&&E?O:null,N=i??k,P=Bf(h,A);Ur({id:i});let F=ps(E),I=_.useRef(null),{getButtonProps:L,buttonRef:R}=Xe({disabled:x,native:o}),z=g.useStateSetter(`triggerElement`),ee=no(),B=no(),te=no();_.useEffect(()=>{if(S)return te.start(gg,()=>{g.context.selectionRef.current.allowUnselectedMouseUp=!0,g.context.selectionRef.current.allowSelectedMouseUp=!0}),()=>{te.clear()};g.context.selectionRef.current={allowSelectedMouseUp:!1,allowUnselectedMouseUp:!1,dragY:0},B.clear()},[S,g,B,te]);let ne=ke(T,{id:N,role:`combobox`,"aria-expanded":S,"aria-haspopup":`listbox`,"aria-controls":S?D?.id??zi(E)?.id:void 0,"aria-labelledby":P,"aria-readonly":v||void 0,"aria-required":y||void 0,tabIndex:x?-1:0,onFocus(e){u(!0),S&&g.context.alignItemWithTriggerActiveRef.current&&g.context.setOpen(!1,Ro(vo,e.nativeEvent)),ee.start(0,()=>{g.set(`forceMount`,!0)})},onBlur(e){$(E,e.relatedTarget)||(l(!0),u(!1),d===`onBlur`&&f.commit(w))},onMouseDown(e){if(S)return;let t=Je(e.currentTarget);function n(e){if(!I.current)return;let t=e.target;$(I.current,t)||$(F.current,t)||pg(e,I.current)||g.context.setOpen(!1,Ro(Mo,e))}B.start(0,()=>{t.addEventListener(`mouseup`,n,{once:!0})})}},c,L),V=f.getValidationProps(x,ne);V.role=`combobox`;let re={...p,open:S,disabled:x,value:w,readOnly:v,popupSide:M,placeholder:!j};return mt(`button`,e,{ref:[t,I,R,z],state:re,stateAttributesMapping:_g,props:V})}),yg={value:()=>null},bg=_.forwardRef(function(e,t){let{className:n,render:r,children:i,placeholder:a,style:o,...s}=e,c=Vh(),l=c.useState(`value`),u=c.useState(`items`),d=c.useState(`itemToStringLabel`),f=c.useState(`hasSelectedValue`),p=!f&&a!=null&&i==null,m=c.useState(`hasNullItemLabel`,p),h={value:l,placeholder:!f},g=null;return g=typeof i==`function`?i(l):i??(p&&!m?a:Array.isArray(l)?sg(l,u,d):og(l,u,d)),mt(`span`,e,{state:h,ref:[t,c.context.valueRef],props:[{children:g},s],stateAttributesMapping:yg})}),xg=_.forwardRef(function(e,t){let{render:n,className:r,style:i,...a}=e;return mt(`span`,e,{state:{open:Vh().useState(`open`)},ref:t,props:[{"aria-hidden":!0,children:`▼`},a],stateAttributesMapping:Di})}),Sg=_.forwardRef(function(e,t){let n=Vh(),r=n.useState(`mounted`),i=n.useState(`forceMount`);return r||i?(0,Q.jsx)(Us,{ref:t,...e}):null}),Cg=_.createContext(void 0);function wg(){let e=_.useContext(Cg);if(!e)throw Error(We(59));return e}function Tg(e,t){e&&Object.assign(e.style,t)}var Eg={position:`relative`,maxHeight:`100%`,overflowX:`hidden`,overflowY:`auto`},Dg={position:`fixed`},Og=_.forwardRef(function(e,t){let{anchor:n,className:r,render:i,positionMethod:a,side:o,align:s,sideOffset:c,alignOffset:l,collisionBoundary:u=`clipping-ancestors`,collisionPadding:d,arrowPadding:f,sticky:p,disableAnchorTracking:m,alignItemWithTrigger:h=!0,collisionAvoidance:g=Is,style:v,...y}=e,b=Vh(),x=Uh(),S=b.useState(`open`),C=b.useState(`mounted`),w=b.useState(`modal`),T=b.useState(`value`),E=b.useState(`openMethod`),D=b.useState(`positionerElement`),O=b.useState(`triggerElement`),k=b.useState(`isItemEqualToValue`),A=b.useState(`transitionStatus`),j=_.useRef(null),M=_.useRef(null),[N,P]=_.useState(h),F=C&&N&&E!==`touch`;!C&&N!==h&&P(h),_.useImperativeHandle(b.context.alignItemWithTriggerActiveRef,()=>F),Ch((F||w)&&S,E===`touch`,D,O);let I=fd({anchor:n,floatingRootContext:x,positionMethod:a,mounted:C,side:o,sideOffset:c,align:s,alignOffset:l,arrowPadding:f,collisionBoundary:u,collisionPadding:d,sticky:p,disableAnchorTracking:m??F,collisionAvoidance:g,keepMounted:!0}),L=F?`none`:I.side,R=F?Dg:I.positionerStyles,z={open:S,side:L,align:I.align,anchorHidden:I.anchorHidden};J(()=>{b.set(`popupSide`,I.side)},[b,I.side]);let ee=gd(e,z,{styles:R,transitionStatus:A,props:y,refs:[t,b.useStateSetter(`positionerElement`)],hidden:!C,inert:!S}),B=_.useRef(0),te=q(e=>{if(b.context.valuesRef.current.length===0)return;let t=B.current;B.current=e.size;let n=Ro(vo);if(t!==0&&!b.state.multiple&&T!==null&&Jh(b.context.valuesRef.current,T,k)===-1){let e=b.context.initialValueRef.current,t=e!=null&&Jh(b.context.valuesRef.current,e,k)!==-1?e:null;b.context.setValue(t,n),t===null&&(b.set(`selectedIndex`,null),b.context.selectedItemTextRef.current=null)}if(t!==0&&b.state.multiple&&Array.isArray(T)){let e=T.filter(e=>Jh(b.context.valuesRef.current,e,k)!==-1);e.length!==T.length&&(b.context.setValue(e,n),e.length===0&&(b.set(`selectedIndex`,null),b.context.selectedItemTextRef.current=null))}if(S&&F){b.update({scrollUpArrowVisible:!1,scrollDownArrowVisible:!1});let e={height:``};Tg(D,e),Tg(b.context.popupRef.current,e)}}),ne=_.useMemo(()=>({...I,side:L,alignItemWithTriggerActive:F,setControlledAlignItemWithTrigger:P,scrollUpArrowRef:j,scrollDownArrowRef:M}),[I,L,F,P]);return(0,Q.jsx)(Mf,{elementsRef:b.context.listRef,labelsRef:b.context.labelsRef,onMapChange:te,children:(0,Q.jsxs)(Cg.Provider,{value:ne,children:[C&&w&&(0,Q.jsx)(uh,{inert:bd(!S),cutout:O}),ee]})})}),kg=`base-ui-disable-scrollbar`,Ag={className:kg,getElement(e){return(0,Q.jsx)(`style`,{nonce:e,href:kg,precedence:`base-ui:low`,children:`.${kg}{scrollbar-width:none}.${kg}::-webkit-scrollbar{display:none}`})}},jg=`--transform-origin`,Mg={...ki,...gi},Ng=_.forwardRef(function(e,t){let{render:n,className:r,style:i,finalFocus:a,...o}=e,s=Vh(),{multiple:c,readOnly:l,highlightItemOnHover:u}=Hh(),d=Uh(),{side:f,align:p,alignItemWithTriggerActive:m,isPositioned:h,setControlledAlignItemWithTrigger:g}=wg(),v=Eh(!0)!=null,y=Qu(),{nonce:b,disableStyleElements:x}=Mp(),S=s.useState(`id`),C=s.useState(`open`),w=s.useState(`openMethod`),T=s.useState(`mounted`),E=s.useState(`popupProps`),D=s.useState(`transitionStatus`),O=s.useState(`triggerElement`),k=s.useState(`positionerElement`),A=s.useState(`listElement`),j=_.useRef(!1),M=_.useRef(!1),N=_.useRef({}),P=oo(),F=q(e=>{if(!k||!s.context.popupRef.current||!M.current)return;let t=k.style.top===`0px`,n=k.style.bottom===`0px`;if(j.current||!m||!t&&!n){s.context.handleScrollArrowVisibility(e);return}let r=Ig(k),i=Lg(k.getBoundingClientRect().height,`y`,r),a=Je(k),o=V(k),c=o.getComputedStyle(k),l=parseFloat(c.marginTop),u=parseFloat(c.marginBottom),d=Pg(o.getComputedStyle(s.context.popupRef.current)),f=Math.min(a.documentElement.clientHeight-l-u,d),p=e.scrollTop,h=Fg(e),g=null,_=e=>{k.style.height=`${e}px`},v=t?h-p:p,y=Math.min(i+v,f);if(v<=1){let n=Of(v,0,f-i);n>0&&_(i+n),e.scrollTop=t?h:0,f-(i+n)<=1&&(j.current=!0),s.context.handleScrollArrowVisibility(e);return}f-y>1?g=t?1/0:0:n&&p<h&&(g=p-(v-(i+v-f)));let b=Math.ceil(y);if(b!==0&&_(b),g!=null){let t=Of(g,0,Fg(e));Math.abs(e.scrollTop-t)>1&&(e.scrollTop=t)}b>=f-1&&(j.current=!0),s.context.handleScrollArrowVisibility(e)});_.useImperativeHandle(s.context.scrollHandlerRef,()=>F,[F]),po({open:C,ref:s.context.popupRef,onComplete(){C&&s.context.onOpenChangeComplete(!0)}});let I={open:C,transitionStatus:D,side:f,align:p};J(()=>{k&&s.context.popupRef.current&&!Object.keys(N.current).length&&(N.current={top:k.style.top||`0`,left:k.style.left||`0`,right:k.style.right,height:k.style.height,bottom:k.style.bottom,minHeight:k.style.minHeight,maxHeight:k.style.maxHeight,marginTop:k.style.marginTop,marginBottom:k.style.marginBottom})},[s,k]),J(()=>{C||m||(M.current=!1,j.current=!1,Tg(k,N.current))},[C,m,k]),J(()=>{let e=s.context.popupRef.current;if(!C||!O||!k||!e||m&&!h||s.state.transitionStatus===`ending`)return;if(M.current=!0,e.style.removeProperty(jg),!m){P.request(()=>s.context.handleScrollArrowVisibility(A||e));return}let t=Bg(e);try{let t=s.context.selectedItemTextRef.current;t?.isConnected||(t=!s.select(`hasSelectedValue`)&&s.context.firstItemTextRef.current?.isConnected?s.context.firstItemTextRef.current:null);let n=s.context.valueRef.current,r=V(k),i=r.getComputedStyle(k),a=r.getComputedStyle(e),o=Je(O),c=Ig(O),l=Rg(O.getBoundingClientRect(),c),d=Rg(k.getBoundingClientRect(),c),f=l.height,p=A||e,m=p.scrollHeight,h=parseFloat(a.borderBottomWidth),_=parseFloat(i.marginTop)||10,v=parseFloat(i.marginBottom)||10,b=parseFloat(i.minHeight)||100,x=Pg(a),S=o.documentElement.clientHeight-_-v,C=o.documentElement.clientWidth,w=S-l.bottom+f,T,E=y===`rtl`?l.right-d.width:l.left,D=0;if(t&&n){let e=Rg(n.getBoundingClientRect(),c);T=Rg(t.getBoundingClientRect(),c),E=d.left+(y===`rtl`?e.right-T.right:e.left-T.left);let r=e.top-l.top+e.height/2;D=T.top-d.top+T.height/2-r}let M=w+D+v+h,P=Math.min(S,M),F=S-_-v,I=M-P,L=C-5;k.style.left=`${Of(E,5,L-d.width)}px`,k.style.height=`${P}px`,k.style.maxHeight=`none`,k.style.marginTop=`${_}px`,k.style.marginBottom=`${v}px`,e.style.height=`100%`;let R=Fg(p),z=I>=R-1;z&&(P=Math.min(S,d.height)-(I-R));let ee=l.top<20||l.bottom>S-20||Math.ceil(P)+1<Math.min(m,b),B=(r.visualViewport?.scale??1)!==1&&ti;if(ee||B){Tg(k,N.current),g(!1);return}let te=Math.max(b,P);if(z){let e=Math.max(0,S-M);k.style.top=d.height>=F?`0`:`${e}px`,k.style.height=`${P}px`,p.scrollTop=Fg(p)}else k.style.bottom=`0`,p.scrollTop=I;if(T){let t=d.top,n=d.height,r=T.top+T.height/2,i=Of(n>0?(r-t)/n*100:50,0,100);e.style.setProperty(jg,`50% ${i}%`)}(te===S||P>=x)&&(j.current=!0),s.context.handleScrollArrowVisibility(p),u&&s.state.selectedIndex===null&&s.state.activeIndex===null&&s.context.listRef.current[0]!=null&&s.set(`activeIndex`,0)}finally{t()}},[s,C,k,O,m,g,P,A,u,y,h]),_.useEffect(()=>{if(!m||!k||!C)return;let e=V(k);function t(e){s.context.setOpen(!1,Ro(Lo,e))}return ds(e,`resize`,t)},[s,m,k,C]);let L={...A?{role:`presentation`}:{role:`listbox`,"aria-multiselectable":c||void 0,"aria-readonly":l||void 0,id:`${S}-list`},onKeyDown(e){v&&Sp.has(e.key)&&e.stopPropagation()},onScroll(e){A||F(e.currentTarget)},...m&&{style:A?{height:`100%`}:Eg},className:!A&&m?Ag.className:void 0},R=mt(`div`,e,{ref:[t,s.context.popupRef],state:I,stateAttributesMapping:Mg,props:[E,L,hd(D),o]});return(0,Q.jsxs)(_.Fragment,{children:[!x&&Ag.getElement(b),(0,Q.jsx)(sc,{context:d,modal:!1,disabled:!T,openInteractionType:w,returnFocus:a,restoreFocus:!0,children:R})]})});function Pg(e){let t=e.maxHeight;return t.endsWith(`px`)&&parseFloat(t)||1/0}function Fg(e){return lg(e.scrollHeight,e.clientHeight)}function Ig(e){return Zc.getScale(e)}function Lg(e,t,n){return e/n[t]}function Rg(e,t){return ba({x:Lg(e.x,`x`,t),y:Lg(e.y,`y`,t),width:Lg(e.width,`x`,t),height:Lg(e.height,`y`,t)})}var zg=[[`transform`,`none`],[`scale`,`1`],[`translate`,`0 0`]];function Bg(e){let{style:t}=e,n={};for(let[e,r]of zg)n[e]=t.getPropertyValue(e),t.setProperty(e,r,`important`);return()=>{for(let[e]of zg){let r=n[e];r?t.setProperty(e,r):t.removeProperty(e)}}}var Vg=_.forwardRef(function(e,t){let{render:n,className:r,style:i,...a}=e,o=Vh(),{multiple:s,readOnly:c}=Hh(),{alignItemWithTriggerActive:l}=wg(),u=o.useState(`hasScrollArrows`),d=o.useState(`openMethod`),f={id:`${o.useState(`id`)}-list`,role:`listbox`,"aria-multiselectable":s||void 0,"aria-readonly":c||void 0,onScroll(e){o.context.scrollHandlerRef.current?.(e.currentTarget)},...l&&{style:Eg},className:u&&d!==`touch`?Ag.className:void 0};return mt(`div`,e,{ref:[t,o.useStateSetter(`listElement`)],props:[f,a]})}),Hg=_.createContext(void 0);function Ug(){let e=_.useContext(Hg);if(!e)throw Error(We(57));return e}var Wg=_.memo(_.forwardRef(function(e,t){let{render:n,className:r,style:i,value:a=null,label:o,disabled:s=!1,nativeButton:c=!1,...l}=e,u=_.useRef(null),d=kp({guess:!0,label:o,textRef:u}),f=Vh(),{itemProps:p,multiple:m,disabled:h,readOnly:g}=Hh(),v=h||s,y=f.useState(`isActive`,d.index),b=f.useState(`open`),x=f.useState(`isSelected`,a),S=f.useState(`isSelectedByFocus`,d.index),C=f.useState(`isItemEqualToValue`),w=d.index,T=_.useRef(null);J(()=>{let e=f.context.valuesRef.current;return e[w]=a,()=>{delete e[w]}},[w,a,f]),J(()=>{let e=f.state.value,t=f.state.selectedIndex,n=t,r;m&&Array.isArray(e)?(n=Zh(w,a,f.context.valuesRef.current,e,C,t),r=n===w,w===t&&!r&&(f.context.selectedItemTextRef.current=null)):(r=e!==void 0&&Gh(a,e,C),r&&(n=w)),f.set(`selectedIndex`,n),r&&u.current&&(f.context.selectedItemTextRef.current=u.current)},[w,m,C,f,a]);let E=_.useRef(`mouse`),D=_.useRef(!1),{getButtonProps:O,buttonRef:k}=Xe({disabled:v,focusableWhenDisabled:!0,native:c,composite:!0}),A={disabled:v,selected:x,highlighted:y};function j(e){if(h||g)return;let t=f.state.value;if(m){let n=Array.isArray(t)?t:[],r=x?Qh(n,a,C):[...n,a];f.context.setValue(r,Ro(Co,e))}else f.context.setValue(a,Ro(Co,e)),f.context.setOpen(!1,Ro(Co,e))}function M(){f.context.selectionRef.current.dragY=0}let N={role:`option`,"aria-selected":x,tabIndex:b&&y?0:-1,onKeyDown(e){f.set(`activeIndex`,w),e.key===` `&&f.context.typingRef.current&&e.preventDefault()},onClick(e){let t=E.current!==`touch`,n=e.nativeEvent.pointerType,r=t&&Wi(e.nativeEvent)&&(n!==void 0||y),i=t&&!r&&!D.current;D.current=!1,!(v||i)&&j(e.nativeEvent)},onPointerEnter(e){E.current=e.pointerType},onPointerMove(e){if(e.pointerType===`mouse`&&e.buttons===1){let t=f.context.selectionRef.current;t.dragY+=e.movementY,t.dragY**2>=64&&(t.allowUnselectedMouseUp=!0)}},onPointerDown(e){E.current=e.pointerType,D.current=!0,M()},onMouseUp(){if(M(),v||E.current===`touch`||D.current)return;let e=!f.context.selectionRef.current.allowSelectedMouseUp&&x,t=!f.context.selectionRef.current.allowUnselectedMouseUp&&!x;e||t||(D.current=!0,T.current?.click(),D.current=!1)}},P=mt(`div`,e,{ref:[k,t,d.ref,T],state:A,props:[p,N,l,O]}),F=_.useMemo(()=>({selected:x,index:w,textRef:u,selectedByFocus:S}),[x,w,u,S]);return(0,Q.jsx)(Hg.Provider,{value:F,children:P})})),Gg=_.forwardRef(function(e,t){let{selected:n}=Ug();return e.keepMounted||n?(0,Q.jsx)(Kg,{...e,ref:t}):null}),Kg=_.memo(_.forwardRef((e,t)=>{let{render:n,className:r,style:i,keepMounted:a,...o}=e,{selected:s}=Ug(),c=_.useRef(null),{transitionStatus:l,setMounted:u}=mo(s),d=mt(`span`,e,{ref:[t,c],state:{selected:s,transitionStatus:l},props:[{"aria-hidden":!0,children:`✔️`},o],stateAttributesMapping:gi});return po({batch:!0,enabled:!s,open:s,ref:c,onComplete(){s||u(!1)}}),d})),qg=_.memo(_.forwardRef(function(e,t){let{index:n,textRef:r,selectedByFocus:i}=Ug(),a=Vh(),{render:o,className:s,style:c,...l}=e;return mt(`div`,e,{ref:[_.useCallback(e=>{e&&(n===0&&(a.context.firstItemTextRef.current=e),i&&(a.context.selectedItemTextRef.current=e))},[a,n,i]),t,r],props:l})})),Jg=_.forwardRef(function(e,t){let{render:n,className:r,style:i,direction:a,keepMounted:o,...s}=e,c=a===`up`,l=Vh(),{side:u,scrollDownArrowRef:d,scrollUpArrowRef:f}=wg(),p=c?`scrollUpArrowVisible`:`scrollDownArrowVisible`,m=l.useState(p),h=l.useState(`openMethod`),g=m&&h!==`touch`,_=no(),v=c?f:d,{mounted:y,transitionStatus:b,setMounted:x}=mo(g);J(()=>(l.context.scrollArrowsMountedCountRef.current+=1,l.set(`hasScrollArrows`,!0),()=>{l.context.scrollArrowsMountedCountRef.current=Math.max(0,l.context.scrollArrowsMountedCountRef.current-1),l.context.scrollArrowsMountedCountRef.current===0&&l.set(`hasScrollArrows`,!1)}),[l]),po({open:g,ref:v,onComplete(){g||x(!1)}});let S=mt(`div`,e,{ref:[t,v],state:{direction:a,visible:g,side:u,transitionStatus:b},props:[{"aria-hidden":!0,children:c?`▲`:`▼`,style:{position:`absolute`},onMouseMove(e){if(e.movementX===0&&e.movementY===0||_.isStarted())return;l.set(`activeIndex`,null);function t(){let e=l.state.listElement??l.context.popupRef.current;if(!e)return;l.set(`activeIndex`,null),l.context.handleScrollArrowVisibility(e);let n=lg(e.scrollHeight,e.clientHeight),r=ug(e.scrollTop,n),i=r===(c?0:n),a=l.context.listRef.current;if(r!==e.scrollTop&&(e.scrollTop=r),i){_.clear();return}if(a.length>0){let t=v.current?.offsetHeight||0;e.scrollTop=Yg(a,c,r,e.clientHeight,t,n)}_.start(40,t)}_.start(40,t)},onMouseLeave(){_.clear()}},s],stateAttributesMapping:gi});return y||o?S:null});function Yg(e,t,n,r,i,a){if(t){let t=0,r=n+i-1;for(let n=0;n<e.length;n+=1){let i=e[n];if(i&&i.offsetTop>=r){t=n;break}}let o=Math.max(0,t-1),s=e[o];return o<t&&s?ug(s.offsetTop-i,a):0}let o=e.length-1,s=n+r-i+1;for(let t=0;t<e.length;t+=1){let n=e[t];if(n&&n.offsetTop+n.offsetHeight>s){o=Math.max(0,t-1);break}}let c=Math.min(e.length-1,o+1),l=e[c];return c>o&&l?ug(l.offsetTop+l.offsetHeight-r+i,a):a}var Xg=_.forwardRef(function(e,t){return(0,Q.jsx)(Jg,{...e,ref:t,direction:`down`})}),Zg=_.forwardRef(function(e,t){return(0,Q.jsx)(Jg,{...e,ref:t,direction:`up`})}),Qg=_.createContext(void 0),$g=_.forwardRef(function(e,t){let{render:n,className:r,style:i,...a}=e,[o,s]=_.useState(),c=_.useMemo(()=>({labelId:o,setLabelId:s}),[o,s]),l=mt(`div`,e,{ref:t,props:[{role:`group`,"aria-labelledby":o},a]});return(0,Q.jsx)(Qg.Provider,{value:c,children:l})}),e_=dg,t_=Dt(`flex w-fit cursor-pointer items-center justify-between gap-1.5 border whitespace-nowrap font-medium transition-colors outline-none select-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-[color:var(--destructive)] *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 dark:aria-invalid:border-[color:color-mix(in_oklab,var(--destructive)_50%,transparent)] [&_svg]:pointer-events-none [&_svg]:shrink-0`,{variants:{placeholderTone:{default:`data-placeholder:text-[color:var(--foreground)]`,muted:`data-placeholder:text-[color:var(--muted-foreground)]`},radius:{default:`rounded-lg`,full:`rounded-full`},variant:{default:`${jm} [&:not(:focus):not([aria-expanded=true]):not([data-open]):not([data-popup-open]):not([data-state=open]):hover]:!border-[color:color-mix(in_oklab,var(--border)_20%,transparent)] focus-visible:border-[color:color-mix(in_oklab,var(--border)_30%,transparent)] aria-expanded:border-[color:color-mix(in_oklab,var(--border)_30%,transparent)] data-popup-open:border-[color:color-mix(in_oklab,var(--border)_30%,transparent)] data-open:border-[color:color-mix(in_oklab,var(--border)_30%,transparent)]`,ghost:`border-transparent bg-transparent bg-clip-border text-[color:var(--foreground)] focus-visible:border-[color:var(--ring)] focus-visible:ring-2 focus-visible:ring-[color:color-mix(in_oklab,var(--ring)_30%,transparent)] hover:bg-[color:color-mix(in_oklab,var(--input)_10%,transparent)] hover:text-[color:var(--foreground)] active:bg-[color:color-mix(in_oklab,var(--input)_10%,transparent)] active:text-[color:var(--foreground)] aria-expanded:bg-[color:color-mix(in_oklab,var(--input)_10%,transparent)] aria-expanded:text-[color:var(--foreground)] data-open:bg-[color:color-mix(in_oklab,var(--input)_10%,transparent)] data-open:text-[color:var(--foreground)] data-popup-open:bg-[color:color-mix(in_oklab,var(--input)_10%,transparent)] data-popup-open:text-[color:var(--foreground)] data-[state=open]:bg-[color:color-mix(in_oklab,var(--input)_10%,transparent)] data-[state=open]:text-[color:var(--foreground)] ${dr}`},size:{sm:`h-6 gap-1 px-1.5 pr-1 py-0 text-xs/relaxed *:data-[slot=select-value]:gap-1 [&_svg:not([class*='size-'])]:size-3`,default:`h-7 px-2 py-0.5 text-xs/relaxed [&_svg:not([class*='size-'])]:size-3.5`,lg:`h-8 px-2.5 py-1 text-sm/relaxed [&_svg:not([class*='size-'])]:size-4`,xl:`h-10 px-3 py-1.5 text-base/relaxed [&_svg:not([class*='size-'])]:size-4`}},defaultVariants:{placeholderTone:`muted`,radius:`default`,variant:`default`,size:`default`}});function n_({className:e,...t}){return(0,Q.jsx)($g,{"data-slot":`select-group`,className:Z(`scroll-my-1 p-1`,e),...t})}function r_({className:e,...t}){return(0,Q.jsx)(bg,{"data-slot":`select-value`,className:Z(`flex min-w-0 flex-1 text-left`,e),...t})}function i_({className:e,placeholderTone:t=`muted`,radius:n=`default`,size:r=`default`,variant:i=`default`,children:a,...o}){return(0,Q.jsxs)(vg,{"data-placeholder-tone":t,"data-radius":n,"data-slot":`select-trigger`,"data-size":r,"data-variant":i,className:Z(`group/select-trigger`,t_({placeholderTone:t,radius:n,size:r,variant:i}),e),...o,children:[a,(0,Q.jsx)(xg,{render:(0,Q.jsx)(Pd,{openClassName:`group-aria-expanded/select-trigger:rotate-180 group-data-popup-open/select-trigger:rotate-180 group-data-open/select-trigger:rotate-180`})})]})}var a_=`group-aria-expanded/select-trigger:rotate-180 group-data-popup-open/select-trigger:rotate-180 group-data-open/select-trigger:rotate-180`;_.forwardRef(function({children:e,className:t,open:n,placeholderTone:r=`muted`,radius:i=`default`,size:a=`default`,variant:o=`default`,...s},c){return(0,Q.jsxs)(`button`,{"data-open":n?``:void 0,"data-placeholder-tone":r,"data-radius":i,"data-slot":`select-trigger`,"data-size":a,"data-variant":o,className:Z(`group/select-trigger`,t_({placeholderTone:r,radius:i,size:a,variant:o}),t),ref:c,...s,children:[e,(0,Q.jsx)(Pd,{openClassName:a_})]})});function o_({className:e,children:t,side:n=`bottom`,sideOffset:r=4,align:i=`center`,alignOffset:a=0,alignItemWithTrigger:o=!0,...s}){let c=wd(),l=_.useRef(null);return(0,Q.jsx)(Sg,{container:c,ref:l,children:(0,Q.jsx)(Cd,{container:l,children:(0,Q.jsx)(Og,{side:n,sideOffset:r,align:i,alignOffset:a,alignItemWithTrigger:o,className:`isolate z-50`,children:(0,Q.jsxs)(Ng,{"data-slot":`select-content`,"data-align-trigger":o,className:Z(`floating-popup-surface relative isolate z-50 max-h-(--available-height) min-w-32 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg border text-[color:var(--popover-foreground)] duration-100 data-[align-trigger=true]:w-(--anchor-width) data-[align-trigger=true]:animate-none data-[align-trigger=false]:w-max data-[align-trigger=false]:min-w-(--anchor-width) data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95`,`floating-popup-surface relative isolate z-50 max-h-(--available-height) min-w-32 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg border popup-text-xs-plus text-[color:var(--popover-foreground)] duration-100 data-[align-trigger=true]:w-(--anchor-width) data-[align-trigger=true]:animate-none data-[align-trigger=false]:w-max data-[align-trigger=false]:min-w-(--anchor-width) data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:zoom-out-95`,e),...s,children:[(0,Q.jsx)(d_,{}),(0,Q.jsx)(Vg,{children:t}),(0,Q.jsx)(f_,{})]})})})})}function s_(e,t){if(typeof e==`string`&&e.length>0)return e;if(typeof t==`string`||typeof t==`number`)return String(t)}function c_(e,t){let[n,r]=_.useState(!1);return _.useEffect(()=>{let n=e.current;if(!n||!t){r(!1);return}let i=()=>{r(n.scrollWidth>n.clientWidth+1)};if(i(),typeof ResizeObserver>`u`)return;let a=new ResizeObserver(i);return a.observe(n),n.firstElementChild instanceof HTMLElement&&a.observe(n.firstElementChild),()=>{a.disconnect()}},[t,e]),n?t:void 0}function l_({children:e,title:t}){let n=_.useRef(null),r=c_(n,t);return t?(0,Q.jsx)($d,{className:`no-scrollbar min-w-0`,containerClassName:`min-w-0 flex-1`,preset:`compact`,side:`right`,viewportRef:n,watch:[t],children:(0,Q.jsx)(`span`,{className:`block min-w-max whitespace-nowrap pr-2`,title:r,children:e})}):(0,Q.jsx)(`span`,{className:`min-w-0 overflow-hidden text-ellipsis whitespace-nowrap`,children:e})}function u_({className:e,children:t,title:n,...r}){let i=s_(n,t);return(0,Q.jsxs)(Wg,{"data-slot":`select-item`,className:Z(`relative flex min-h-7 w-full cursor-pointer items-center gap-2 rounded-md py-1 pr-8 pl-2 popup-text-xs-plus leading-normal tracking-tight font-medium outline-hidden select-none hover:bg-[color:color-mix(in_oklab,var(--foreground)_5%,transparent)] focus:bg-[color:color-mix(in_oklab,var(--foreground)_5%,transparent)] focus:text-[color:var(--accent-foreground)] not-data-[variant=destructive]:focus:**:text-[color:var(--accent-foreground)] data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2`,e),...r,children:[(0,Q.jsx)(qg,{className:`flex min-w-0 flex-1 gap-2 overflow-hidden whitespace-nowrap`,"data-slot":`select-item-text`,children:(0,Q.jsx)(l_,{title:i,children:t})}),(0,Q.jsx)(Gg,{render:(0,Q.jsx)(`span`,{className:`pointer-events-none absolute right-2 flex items-center justify-center`}),children:(0,Q.jsx)(N,{className:`pointer-events-none`})})]})}function d_({className:e,...t}){return(0,Q.jsx)(Zg,{"data-slot":`select-scroll-up-button`,className:Z(`floating-popup-fill top-0 z-10 flex w-full cursor-pointer items-center justify-center py-1 [&_svg:not([class*='size-'])]:size-3.5`,e),...t,children:(0,Q.jsx)(Pd,{direction:`up`})})}function f_({className:e,...t}){return(0,Q.jsx)(Xg,{"data-slot":`select-scroll-down-button`,className:Z(`floating-popup-fill bottom-0 z-10 flex w-full cursor-pointer items-center justify-center py-1 [&_svg:not([class*='size-'])]:size-3.5`,e),...t,children:(0,Q.jsx)(Pd,{})})}var p_=_.createContext(void 0);function m_(){return _.useContext(p_)}function h_(e={}){let{highlightItemOnHover:t,highlightedIndex:n,onHighlightedIndexChange:r}=Ke(),{ref:i,index:a}=kp(e),o=n===a,s=_.useRef(null),c=$e(i,s);return{compositeProps:{tabIndex:o?0:-1,onFocus(){r(a)},onMouseMove(){let e=s.current;if(!t||!e)return;let n=e.hasAttribute(`disabled`)||e.ariaDisabled===`true`;!o&&!n&&e.focus()}},compositeRef:c,index:a}}function g_(e){let{render:t,className:n,style:r,state:i=ut,props:a=lt,refs:o=lt,metadata:s,stateAttributesMapping:c,tag:l=`div`,...u}=e,{compositeProps:d,compositeRef:f}=h_({metadata:s});return mt(l,e,{state:i,ref:[f,...o],props:[d,...a,u],stateAttributesMapping:c})}var __=_.forwardRef(function(e,t){let{className:n,defaultPressed:r=!1,disabled:i=!1,form:a,onPressedChange:o,pressed:s,render:c,type:l,value:u,nativeButton:d=!0,style:f,...p}=e,m=Lr(u||void 0),h=m_(),g=h?.value??[],v=(i||h?.disabled)??!1,[y,b]=ho({controlled:h?m!==void 0&&g.indexOf(m)>-1:s,default:r,name:`Toggle`,state:`pressed`}),{getButtonProps:x,buttonRef:S}=Xe({disabled:v,native:d}),C={disabled:v,pressed:y},w=[S,t],T=[{"aria-pressed":y,onClick(e){let t=!y,n=Ro(vo,e.nativeEvent);o?.(t,n),!n.isCanceled&&(m&&h?.setGroupValue?.(m,t,n),!n.isCanceled&&b(t))}},p,x],E=mt(`button`,e,{enabled:!h,state:C,ref:w,props:T}),D=_.useMemo(()=>({disabled:v,focusableWhenDisabled:!1}),[v]);return h?(0,Q.jsx)(g_,{tag:`button`,render:c,className:n,style:f,metadata:D,state:C,refs:w,props:T}):E}),v_=Dt(`group/toggle inline-flex cursor-pointer items-center justify-center gap-1 rounded-md text-xs font-medium whitespace-nowrap transition-all outline-none hover:bg-[color:color-mix(in_oklab,var(--foreground)_10%,transparent)] hover:text-[color:var(--foreground)] focus-visible:border-[color:var(--ring)] focus-visible:ring-[3px] focus-visible:ring-[color:color-mix(in_oklab,var(--ring)_50%,transparent)] disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-[color:var(--destructive)] aria-invalid:ring-[color:color-mix(in_oklab,var(--destructive)_20%,transparent)] ${fr} dark:aria-invalid:ring-[color:color-mix(in_oklab,var(--destructive)_40%,transparent)] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5`,{variants:{variant:{default:`bg-transparent text-[color:color-mix(in_oklab,var(--foreground)_72%,transparent)]`,outline:`border border-[color:color-mix(in_oklab,var(--border)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--input)_5%,transparent)] text-[color:color-mix(in_oklab,var(--foreground)_72%,transparent)] hover:bg-[color:color-mix(in_oklab,var(--foreground)_10%,transparent)] hover:text-[color:var(--foreground)] ${fr} aria-pressed:hover:bg-[color:color-mix(in_oklab,var(--link)_12%,transparent)] aria-pressed:hover:text-[color:var(--foreground)] data-[pressed]:hover:bg-[color:color-mix(in_oklab,var(--link)_12%,transparent)] data-[pressed]:hover:text-[color:var(--foreground)] data-[state=on]:hover:bg-[color:color-mix(in_oklab,var(--link)_12%,transparent)] data-[state=on]:hover:text-[color:var(--foreground)]`},size:{default:`h-7 min-w-7 px-2`,sm:`h-6 min-w-6 rounded-[min(var(--radius-md),8px)] px-1.5 text-[0.625rem] [&_svg:not([class*='size-'])]:size-3`,lg:`h-8 min-w-8 px-2`}},defaultVariants:{variant:`default`,size:`default`}}),y_=`data-composite-item-active`;function b_(e){let{loopFocus:t=!0,orientation:n=`both`,grid:r,onLoop:i,direction:a,highlightedIndex:o,onHighlightedIndexChange:s,rootRef:c,enableHomeAndEndKeys:l=!1,stopEventPropagation:u,disabledIndices:d,modifierKeys:f=lt}=e,[p,m]=_.useState(0),h=r!=null,g=_.useRef(null),v=$e(g,c),y=_.useRef([]),b=_.useRef(!1),x=_.useRef(null),S=o??p,C=q((e,t=!1)=>{if(x.current=y.current[e]??null,(s??m)(e),t){let t=y.current[e];Ep(g.current,t,a,n)}}),w=q(e=>{if(e.size===0)return;if(b.current){let e=y.current,t=e.indexOf(x.current);if(t===-1){let t=e[S];!t||Ta(e,S,d)?C(x_(e,d)):x.current=t}else t!==S&&C(t);return}b.current=!0;let t=Array.from(e.keys()),r=t.find(e=>e?.hasAttribute(`data-composite-item-active`))??null,i=r?e.get(r)?.index??-1:-1;if(i!==-1)C(i);else if(Ta(t,S,d)){let e=wa(t,{disabledIndices:d});xa(t,e)||C(e)}Ep(g.current,r,a,n)});J(()=>{if(d==null||o!=null||!b.current)return;let e=y.current;if(Ta(e,S,d)){let t=wa(e,{disabledIndices:d});xa(e,t)||C(t)}},[d,o,S,y,C]);let T=q((e,t,n)=>i?i(e,t,n,y):n),E=q(e=>{let o=e.key===`Home`||e.key===`End`;if(!Sp.has(e.key)||!l&&o||S_(e,f)||!g.current)return;let s=a===`rtl`,c=s?_p:vp,p=s?vp:_p,m=n===`vertical`?gp:c,_=n===`vertical`?hp:p,v=ai(e.nativeEvent);if(v!=null&&Tp(v)&&!Lh(v)){let t=v.selectionStart,n=v.selectionEnd,r=v.value;if(t==null||e.shiftKey||t!==n||e.key!==_&&t<r.length||e.key!==m&&t>0)return}let b=S,x=Sa(y,d),w=Ca(y,d);r!=null&&(b=r({disabledIndices:d,elementsRef:y,event:e,highlightedIndex:S,loopFocus:t,maxIndex:w,minIndex:x,onLoop:T,orientation:n,rtl:s}));let E=n!==`vertical`&&e.key===c||n!==`horizontal`&&e.key===`ArrowDown`,D=n!==`vertical`&&e.key===p||n!==`horizontal`&&e.key===`ArrowUp`;l&&(e.key===`Home`?b=x:e.key===`End`&&(b=w)),b===S&&(E||D)&&(t&&b===w&&E?(b=x,i&&(b=i(e,S,b,y))):t&&b===x&&D?(b=w,i&&(b=i(e,S,b,y))):b=wa(y.current,{startingIndex:b,decrement:D,disabledIndices:d})),b!==S&&!xa(y.current,b)&&(u&&e.stopPropagation(),(h||o||E||D)&&e.preventDefault(),C(b,!0),queueMicrotask(()=>{y.current[b]?.focus()}))});return{props:{ref:v,onFocus(e){let t=g.current,n=ai(e.nativeEvent);t&&n!=null&&Tp(n)&&n.setSelectionRange(0,n.value.length)},onKeyDown:E},highlightedIndex:S,onHighlightedIndexChange:C,elementsRef:y,onMapChange:w,relayKeyboardEvent:E}}function x_(e,t){let n=-1;for(let r=0;r<e.length;r+=1){let i=e[r];if(i&&!Ta(e,r,t)){if(i.hasAttribute(`data-composite-item-active`))return r;n===-1&&(n=r)}}return Math.max(n,0)}function S_(e,t){for(let n of Cp)if(!t.includes(n)&&e.getModifierState(n))return!0;return!1}function C_(e){let{render:t,className:n,style:r,refs:i=lt,props:a=lt,state:o=ut,stateAttributesMapping:s,highlightedIndex:c,onHighlightedIndexChange:l,orientation:u,grid:d,loopFocus:f,onLoop:p,enableHomeAndEndKeys:m,onMapChange:h,stopEventPropagation:g=!0,rootRef:v,disabledIndices:y,modifierKeys:b,highlightItemOnHover:x=!1,tag:S=`div`,...C}=e,{props:w,highlightedIndex:T,onHighlightedIndexChange:E,elementsRef:D,onMapChange:O,relayKeyboardEvent:k}=b_({grid:d,loopFocus:f,onLoop:p,orientation:u,highlightedIndex:c,onHighlightedIndexChange:l,rootRef:v,stopEventPropagation:g,enableHomeAndEndKeys:m,direction:Qu(),disabledIndices:y,modifierKeys:b}),A=mt(S,e,{state:o,ref:i,props:[w,...a,C],stateAttributesMapping:s}),j=_.useMemo(()=>({highlightedIndex:T,onHighlightedIndexChange:E,highlightItemOnHover:x,relayKeyboardEvent:k}),[T,E,x,k]);return(0,Q.jsx)(Ge.Provider,{value:j,children:(0,Q.jsx)(Mf,{elementsRef:D,onMapChange:e=>{h?.(e),O(e)},children:A})})}var w_=_.createContext(void 0);function T_(){return _.useContext(w_)}var E_=_.forwardRef(function(e,t){let{defaultValue:n,disabled:r=!1,loopFocus:i=!0,onValueChange:a,orientation:o=`horizontal`,multiple:s=!1,value:c,className:l,render:u,style:d,...f}=e,p=Eh(!0),m=T_(),h=n??lt,g=c!==void 0||n!==void 0,v=(p?.disabled??!1)||(m?.disabled??!1)||r,[y,b]=ho({controlled:c,default:h,name:`ToggleGroup`,state:`value`}),x=q((e,t,n)=>{let r;s?(r=y.slice(),t?r.push(e):r.splice(y.indexOf(e),1)):r=t?[e]:[],a?.(r,n),!n.isCanceled&&b(r)}),S={disabled:v,multiple:s,orientation:o},C=_.useMemo(()=>({disabled:v,setGroupValue:x,value:y,isValueInitialized:g}),[v,x,y,g]),w={role:`group`},T=mt(`div`,e,{enabled:!!p,state:S,ref:t,props:[w,f]});return(0,Q.jsx)(p_.Provider,{value:C,children:p?T:(0,Q.jsx)(C_,{render:u,className:l,style:d,state:S,refs:[t],props:[w,f],loopFocus:i,enableHomeAndEndKeys:!0,orientation:o})})}),D_=_.createContext({size:`default`,variant:`default`,spacing:0,orientation:`horizontal`});function O_({orientation:e,spacing:t,variant:n}){return t!==0||n!==`outline`?``:e===`vertical`?`[&>[data-slot]]:relative [&>[data-slot]:has(+[data-slot])]:border-b-0 [&>[data-slot][aria-pressed=true]+[data-slot]]:border-t-[color:color-mix(in_oklab,var(--border)_10%,transparent)] [&>[data-slot][data-pressed]+[data-slot]]:border-t-[color:color-mix(in_oklab,var(--border)_10%,transparent)] [&>[data-slot][data-state=on]+[data-slot]]:border-t-[color:color-mix(in_oklab,var(--border)_10%,transparent)]`:`[&>[data-slot]]:relative [&>[data-slot]:has(+[data-slot])]:border-r-0 [&>[data-slot][aria-pressed=true]+[data-slot]]:border-l-[color:color-mix(in_oklab,var(--border)_10%,transparent)] [&>[data-slot][data-pressed]+[data-slot]]:border-l-[color:color-mix(in_oklab,var(--border)_10%,transparent)] [&>[data-slot][data-state=on]+[data-slot]]:border-l-[color:color-mix(in_oklab,var(--border)_10%,transparent)]`}function k_({className:e,variant:t,size:n,spacing:r=0,orientation:i=`horizontal`,children:a,...o}){let s=O_({orientation:i,spacing:r,variant:t});return(0,Q.jsx)(E_,{"data-slot":`toggle-group`,"data-variant":t,"data-size":n,"data-spacing":r,"data-orientation":i,style:{"--gap":r},className:Z(`group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] rounded-md data-[size=sm]:rounded-[min(var(--radius-md),8px)] data-vertical:flex-col data-vertical:items-stretch`,s,e),...o,children:(0,Q.jsx)(D_.Provider,{value:{variant:t,size:n,spacing:r,orientation:i},children:a})})}function A_({className:e,children:t,variant:n=`default`,size:r=`default`,...i}){let a=_.useContext(D_);return(0,Q.jsx)(__,{"data-slot":`toggle-group-item`,"data-variant":a.variant||n,"data-size":a.size||r,"data-spacing":a.spacing,className:Z(`shrink-0 group-data-[spacing=0]/toggle-group:rounded-none group-data-[spacing=0]/toggle-group:px-2 focus:z-10 focus-visible:z-10 group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-l-md group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-md group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-r-md group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-md`,v_({variant:a.variant||n,size:a.size||r}),e),...i,children:t})}function j_({ariaLabel:e,name:t,onValueChange:n,options:r,value:i,variant:a=`default`}){let[o,s]=_.useState(()=>i??r[0]?.value??``),c=i??o;_.useEffect(()=>{if(i!==void 0){s(i);return}r.some(e=>e.value===o)||s(r[0]?.value??``)},[o,r,i]);function l(e){s(e),n?.(e)}return(0,Q.jsxs)(jd,{className:`min-w-0 gap-2`,children:[(0,Q.jsx)(pf,{children:t}),(0,Q.jsx)(k_,{"aria-label":e??t,className:`w-full`,onValueChange:e=>{let[t]=e;t&&l(t)},size:`default`,value:c?[c]:[],variant:`outline`,children:r.map(e=>(0,Q.jsxs)(A_,{"aria-label":e.label,className:a===`dots`?`min-w-0 flex-1 gap-[7px]`:`min-w-0 flex-1`,value:e.value,children:[a===`dots`?(0,Q.jsx)(`span`,{"aria-hidden":`true`,className:`size-2 shrink-0 rounded-full`,style:{backgroundColor:e.indicatorColor??`currentColor`}}):null,e.label]},e.value))})]})}function M_(e,t,n){return Math.min(n,Math.max(t,e))}function N_(e){return String(e).split(`.`)[1]?.length??0}function P_(e,t){let n=N_(t),r=Number(e.toFixed(n));return String(r)}var F_=new Set([`%`,`°`,`px`,`em`,`rem`,`vw`,`vh`,`vmin`,`vmax`,`s`,`ms`]);function I_(e){return e.replace(/[.*+?^${}()|[\]\\]/g,`\\$&`)}function L_(e){let t=e.trim();return t===``||F_.has(t)||/^[^\p{Letter}\p{Number}]+$/u.test(t)?``:` `}function R_(e,t){let n=t?.trim();if(!n||typeof B_(e)!=`number`)return e;let r=L_(n),i=RegExp(`(-?\\d+(?:\\.\\d+)?)(?:\\s*${I_(n)})?`,`g`);return e.replaceAll(i,(e,t)=>`${t}${r}${n}`)}function z_(e,t,n){return R_(P_(e,t),n)}function B_(e){let t=e.match(/-?\d+(?:\.\d+)?/),n=t?Number.parseFloat(t[0]):NaN;return Number.isFinite(n)?n:void 0}function V_(e){let t=Array.isArray(e)?e[0]:e;return typeof t==`number`?t:void 0}var H_=0;function U_(e){return H_+=1,`${e}:${H_}`}function W_({baseValue:e,className:t,disabled:n=!1,editValueLabel:r,markerCount:i,max:a=100,min:o=0,name:s,onValueChange:c,showFill:l,step:u=1,unit:d,value:f,valueLabel:p,variant:m=`continuous`}){let[h,g]=_.useState(f),v=_.useRef(null);_.useEffect(()=>{g(f)},[f]);let y=p&&h===f?R_(p,d):z_(h,u,d);function b(){return v.current??=U_(`slider:${s}`),{history:`merge`,historyGroup:v.current}}function x(){v.current=null}function S(e,t){let n=M_(e,o,a);g(n),c?.(n,t)}function C(e,t){let n=B_(t),r=M_((typeof n==`number`?n:h)+e*u,o,a);return S(r,b()),z_(r,u,d)}return(0,Q.jsxs)(jd,{className:Z(`min-w-0 gap-1!`,t),"data-disabled":n,children:[(0,Q.jsxs)(`div`,{className:`flex w-full min-w-0 items-center justify-between gap-3`,children:[(0,Q.jsx)(pf,{children:s}),(0,Q.jsx)(`div`,{className:`inline-flex h-5 shrink-0 items-center gap-1.5`,children:(0,Q.jsx)(vm,{ariaLabel:`${s}数值`,disabled:n,editAriaLabel:r,maxValueLabel:Tm(y,{max:a,min:o}),onCommit:e=>{let t=B_(e);typeof t==`number`&&S(t),x()},onStep:C,valueLabel:y})})]}),(0,Q.jsx)(hm,{getAriaLabel:()=>s,markerCount:i,max:a,min:o,disabled:n,onValueChange:e=>{let t=V_(e);typeof t==`number`&&S(t,b())},onValueCommitted:x,resetValue:typeof e==`number`?[e]:void 0,showFill:l,step:u,value:[h],variant:m})]})}var G_=e=>{e.stopPropagation()};function K_({children:e,className:t,disabled:n,label:r,onClick:i,onPointerDown:a,spinOnClick:o=!1,tooltipSide:s=`top`}){let c=_.useRef(null);function l(){let e=c.current,t=typeof window<`u`&&window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;if(o&&e&&!t){for(let t of e.getAnimations())t.cancel();e.animate([{transform:`rotate(0deg)`},{transform:`rotate(-360deg)`}],{duration:420,easing:`cubic-bezier(0.16, 1, 0.3, 1)`})}}function u(e){l(),i?.(),typeof e.currentTarget.blur==`function`&&e.currentTarget.blur()}return(0,Q.jsxs)(Ed,{children:[(0,Q.jsx)(Dd,{render:(0,Q.jsx)(Sr,{"aria-label":r,className:Z(`data-[icon-active=true]:text-[color:var(--foreground)]`,t),"data-icon-active":!1,disabled:n,onClick:u,onPointerDown:a,size:`icon`,type:`button`,variant:`ghost`}),children:(0,Q.jsx)(`span`,{ref:c,className:`inline-flex origin-center`,children:e})}),(0,Q.jsx)(Od,{side:s,children:r})]})}function q_({collapsed:e,collapseDirection:t=`up`,collapseLabel:n=`收起参数面板`,expandLabel:r=`展开参数面板`,onResetControls:i,onToggleCollapsed:a,resetLabel:o=`重置全部参数`,title:s}){let c=t===`left`?e?`right`:`left`:t===`right`?e?`left`:`right`:e?`down`:`up`;return(0,Q.jsx)(`div`,{className:`shrink-0`,"data-collapsed":String(e),"data-slot":`properties-panel-header-shell`,children:(0,Q.jsxs)(`div`,{className:Z(`flex h-9 touch-none items-center gap-3 pr-1 pl-3 hover:cursor-grab active:cursor-grabbing`,e?`justify-center px-1`:`justify-between`),"data-panel-drag-handle":``,"data-slot":`properties-panel-header`,children:[(0,Q.jsx)(`p`,{className:Z(`m-0 min-w-0 truncate text-xs-plus font-medium text-[color:var(--foreground)]`,e&&`sr-only`),children:s}),(0,Q.jsxs)(`div`,{className:`inline-flex shrink-0 items-center gap-1`,children:[e||!i?null:(0,Q.jsx)(K_,{label:o,onClick:i,onPointerDown:G_,spinOnClick:!0,children:(0,Q.jsx)(j,{})}),a?(0,Q.jsx)(K_,{label:e?r:n,onClick:a,onPointerDown:G_,children:(0,Q.jsx)(Pd,{direction:c})}):null]})]})})}var J_=`border-t border-[color:color-mix(in_oklab,var(--border)_8%,transparent)]`,Y_=44,X_=`flex min-h-0 flex-col overflow-x-hidden overflow-y-auto overscroll-contain`,Z_=_.forwardRef(function({children:e,className:t,...n},r){return(0,Q.jsx)(`div`,{...n,ref:r,className:Z(`floating-popup-surface toolcraft-panel-surface isolate border text-[color:var(--popover-foreground)] supports-backdrop-filter:backdrop-blur-2xl supports-backdrop-filter:backdrop-saturate-150`,t),children:e})}),Q_=_.forwardRef(function({children:e,className:t,scrollFadeMode:n=`always`,stickyFooter:r,stickyFooterActive:i=!1,stickyFooterProgress:a=null,...o},s){let[c,l]=_.useState(null),[u,d]=_.useState(n===`always`),f=_.useCallback(e=>{if(l(e),typeof s==`function`){s(e);return}s&&(s.current=e)},[s]),p=_.Children.count(r)>0;if(_.useLayoutEffect(()=>{if(n!==`overflow`){d(!0);return}if(!c){d(!1);return}let e=()=>{d(c.scrollHeight>c.clientHeight+1)};e(),window.addEventListener(`resize`,e);let t=typeof ResizeObserver>`u`?null:new ResizeObserver(e);t?.observe(c);let r=c.firstElementChild;return r&&t?.observe(r),()=>{window.removeEventListener(`resize`,e),t?.disconnect()}},[n,c]),n===`overflow`&&!u){let n=(0,Q.jsx)(`div`,{...o,className:Z(X_,p?`flex-1`:J_,t),ref:f,children:e});return p?(0,Q.jsx)($_,{stickyFooter:r,stickyFooterActive:i,stickyFooterProgress:a,children:n}):n}let m=(0,Q.jsx)($d,{...o,className:Z(`flex min-h-0 flex-col`,p&&`flex-1`,t),containerClassName:Z(`flex min-h-0 flex-col`,p?`flex-1`:J_),height:Y_,preset:`default`,showOppositeSide:!0,side:`bottom`,visibilityMode:`terminal`,viewportRef:f,children:e});return p?(0,Q.jsx)($_,{stickyFooter:r,stickyFooterActive:i,stickyFooterProgress:a,children:m}):m});function $_({children:e,stickyFooter:t,stickyFooterActive:n,stickyFooterProgress:r}){let i=typeof r==`number`?{"--sticky-footer-progress":String(r)}:void 0;return(0,Q.jsxs)(`div`,{className:Z(`flex min-h-0 flex-col`,J_),children:[e,(0,Q.jsx)(`div`,{className:`relative shrink-0 before:absolute before:inset-x-0 before:top-0 before:z-10 before:h-px before:origin-left before:scale-x-[var(--sticky-footer-progress,1)] before:bg-[color:var(--accent)] before:opacity-0 before:transition-[opacity,transform] before:duration-200 before:ease-out before:content-[''] data-[sticky-footer-active=true]:before:opacity-100`,"data-sticky-footer-progress":typeof r==`number`?r:void 0,"data-sticky-footer-active":n?`true`:void 0,"data-slot":`toolcraft-panel-sticky-actions`,style:i,children:t})]})}function ev({action:e,actionGroup:t,allowCompoundDividers:n,children:r,className:i,collapsed:a=!1,collapseLabel:o,collapsible:s=!1,expandLabel:c,flush:l=!1,onCollapsedChange:u,spacing:d=`default`,title:f,...p}){let m=t!==void 0,h=_.Children.toArray(r),g=f!=null&&f!==!1,v=!!(s&&a),y=n??h.length>1,b=(0,Q.jsx)(af,{className:Z(!m&&(d===`technical`?`py-3`:`pt-2 pb-6`)),children:h.map((e,t)=>(0,Q.jsx)(lf,{allowCompoundDividers:y,compoundDividerPlacement:tv({childCount:h.length,index:t,shouldRenderInnerDividers:y}),flush:l||m,children:e},iv(e,t)))});return(0,Q.jsxs)(rf,{...p,className:Z(!m&&`py-0`,g&&`gap-0`,m&&`p-3`,i),"data-collapsed":s?String(v):void 0,"data-toolcraft-section-action-group":t,"data-toolcraft-section-actions":m?``:void 0,children:[g?(0,Q.jsx)(of,{action:e,collapsed:v,collapseLabel:o,collapsible:s,expandLabel:c,onCollapsedChange:u,children:(0,Q.jsx)(uf,{children:f})}):null,s?(0,Q.jsx)(nv,{collapsed:v,children:b}):b]})}function tv({childCount:e,index:t,shouldRenderInnerDividers:n}){return!n||e<=1?`both`:t===0?`bottom`:t===e-1?`top`:`both`}function nv({collapsed:e,children:t}){let[n,r]=_.useState(!e),[i,a]=_.useState(e),o=rv(`${e?`collapsed`:`expanded`}:${n?`mounted`:`unmounted`}`);_.useEffect(()=>{if(e){a(!0);return}if(n){a(!1);return}r(!0),a(!0);let t=window.requestAnimationFrame(()=>{a(!1)});return()=>window.cancelAnimationFrame(t)},[e,n]);function s(t){t.target===t.currentTarget&&e&&r(!1)}return n?(0,Q.jsx)(`div`,{"aria-hidden":e?`true`:void 0,className:Z(`grid overflow-hidden transition-[grid-template-rows,opacity] duration-180 ease-out motion-reduce:transition-none`,i?`pointer-events-none grid-rows-[0fr] opacity-0`:`grid-rows-[1fr] opacity-100`),"data-collapsed":String(e),"data-slot":`panel-section-collapsible-body`,onTransitionEnd:s,children:(0,Q.jsx)(`div`,{className:`min-h-0 overflow-hidden`,"data-toolcraft-controls-mounting":o?`true`:void 0,children:t})}):null}function rv(e){let[t,n]=_.useState(()=>({dependency:e,isSuppressing:!0}));return _.useEffect(()=>{if(n({dependency:e,isSuppressing:!0}),typeof window>`u`)return;if(typeof window.requestAnimationFrame!=`function`){let t=window.setTimeout(()=>{n({dependency:e,isSuppressing:!1})},0);return()=>window.clearTimeout(t)}let t=0,r=window.requestAnimationFrame(()=>{t=window.requestAnimationFrame(()=>{n({dependency:e,isSuppressing:!1})})});return()=>{window.cancelAnimationFrame(r),window.cancelAnimationFrame(t)}},[e]),t.dependency!==e||t.isSuppressing}function iv(e,t){return _.isValidElement(e)&&e.key!==null?e.key:t}function av({children:e,className:t,collapsed:n,collapseDirection:r=`up`,collapseLabel:i,collapsible:a=!0,contentTransitionSuppressionKey:o,defaultCollapsed:s=!1,expandLabel:c,onCollapsedChange:l,onResetControls:u,resetLabel:d,stickyFooterActive:f=!1,stickyFooterProgress:p=null,title:m}){let[h,g]=_.useState(s),v=a&&(n??h),{bodyChildren:y,stickyFooterChildren:b}=lv(sv(e)?e:(0,Q.jsx)(dv,{children:e})),x=ov(o===void 0?v:`${v}:${String(o)}`);function S(){let e=!v;g(e),l?.(e)}return(0,Q.jsxs)(Z_,{className:Z(`pointer-events-auto flex max-h-[calc(100dvh-1.25rem)] flex-col overflow-hidden rounded-lg p-0 w-[300px]`,t),"data-collapsed":String(v),"data-panel-id":`properties`,children:[(0,Q.jsx)(q_,{collapsed:v,collapseDirection:r,collapseLabel:i,expandLabel:c,onResetControls:u,onToggleCollapsed:a?S:void 0,resetLabel:d,title:m}),v?null:(0,Q.jsx)(Q_,{"data-toolcraft-controls-mounting":x?`true`:void 0,"data-slot":`toolcraft-panel-content`,stickyFooter:b.length>0?b:void 0,stickyFooterActive:f,stickyFooterProgress:p,children:y})]})}function ov(e){let[t,n]=_.useState(()=>({dependency:e,isSuppressing:!0}));return _.useEffect(()=>{if(n({dependency:e,isSuppressing:!0}),typeof window>`u`)return;if(typeof window.requestAnimationFrame!=`function`){let t=window.setTimeout(()=>{n({dependency:e,isSuppressing:!1})},0);return()=>window.clearTimeout(t)}let t=0,r=window.requestAnimationFrame(()=>{t=window.requestAnimationFrame(()=>{n({dependency:e,isSuppressing:!1})})});return()=>{window.cancelAnimationFrame(r),window.cancelAnimationFrame(t)}},[e]),t.dependency!==e||t.isSuppressing}function sv(e){return _.Children.toArray(e).some(cv)}function cv(e){if(!_.isValidElement(e))return!1;if(e.type===_.Fragment){let t=e.props;return sv(t.children)}return e.type===rf||e.type===ev||e.props[`data-toolcraft-panel-section`]!==void 0}function lv(e){let t=_.Children.toArray(e),n=t.length;for(;n>0&&uv(t[n-1]);)--n;return{bodyChildren:t.slice(0,n),stickyFooterChildren:t.slice(n)}}function uv(e){return _.isValidElement(e)?e.props[`data-toolcraft-section-actions`]!==void 0||e.props.actionGroup!==void 0:!1}function dv({children:e}){let t=_.Children.toArray(e),n=t.length>1;return(0,Q.jsx)(rf,{className:`py-0`,children:(0,Q.jsx)(af,{className:`pt-2 pb-6`,children:t.map((e,t)=>(0,Q.jsx)(lf,{allowCompoundDividers:n,children:e},fv(e,t)))})})}function fv(e,t){return _.isValidElement(e)&&e.key!==null?e.key:t}var pv=_.createContext(void 0);function mv(e){let t=_.useContext(pv);if(!e&&t===void 0)throw Error(We(27));return t}var hv=_.forwardRef(function(e,t){let{render:n,className:r,style:i,forceRender:a=!1,...o}=e,s=mv(),c=s.useState(`open`),l=s.useState(`nested`),u=s.useState(`mounted`);return mt(`div`,e,{state:{open:c,transitionStatus:s.useState(`transitionStatus`)},ref:[s.context.backdropRef,t],stateAttributesMapping:Ai,props:[{role:`presentation`,hidden:!u,style:{userSelect:`none`,WebkitUserSelect:`none`}},o],enabled:a||!l})}),gv=_.forwardRef(function(e,t){let{render:n,className:r,style:i,disabled:a=!1,nativeButton:o=!0,...s}=e,c=mv(),l=c.useState(`open`),{getButtonProps:u,buttonRef:d}=Xe({disabled:a,native:o}),f={disabled:a};function p(e){l&&c.setOpen(!1,Ro(wo,e.nativeEvent))}return mt(`button`,e,{state:f,ref:[t,d],props:[{onClick:p},s,u]})}),_v=_.createContext(void 0);function vv(){let e=_.useContext(_v);if(e===void 0)throw Error(We(26));return e}var yv=`--nested-dialogs`,bv=`data-nested-dialog-open`,xv={...ki,...gi,nestedDialogOpen(e){return e?{[bv]:``}:null}},Sv=_.forwardRef(function(e,t){let{render:n,className:r,style:i,finalFocus:a,initialFocus:o,...s}=e,c=mv(),l=c.useState(`descriptionElementId`),u=c.useState(`disablePointerDismissal`),d=c.useState(`floatingRootContext`),f=c.useState(`popupProps`),p=c.useState(`modal`),m=c.useState(`mounted`),h=c.useState(`nested`),g=c.useState(`nestedOpenDialogCount`),_=c.useState(`open`),v=c.useState(`openMethod`),y=c.useState(`titleElementId`),b=c.useState(`transitionStatus`),x=c.useState(`role`),S=d.useState(`floatingId`);vv(),po({open:_,ref:c.context.popupRef,onComplete(){_&&c.context.onOpenChangeComplete?.(!0)}});let C=o===void 0?Fl(c.context.popupRef):o,w=g>0,T=c.useStateSetter(`popupElement`),E=mt(`div`,e,{state:{open:_,nested:h,transitionStatus:b,nestedDialogOpen:w},props:[f,{id:S,"aria-labelledby":y,"aria-describedby":l,role:x,...Pl,hidden:!m,onKeyDown(e){Sp.has(e.key)&&e.stopPropagation()},style:{[yv]:g}},s],ref:[t,c.context.popupRef,T],stateAttributesMapping:xv});return(0,Q.jsx)(sc,{context:d,openInteractionType:v,disabled:!m,closeOnFocusOut:!u,initialFocus:C,returnFocus:a,modal:p!==!1,restoreFocus:`popup`,children:E})}),Cv=_.forwardRef(function(e,t){let{keepMounted:n=!1,...r}=e,i=mv(),a=i.useState(`mounted`),o=i.useState(`modal`),s=i.useState(`open`);return a||n?(0,Q.jsx)(_v.Provider,{value:n,children:(0,Q.jsxs)(Us,{ref:t,...r,children:[a&&o===!0&&(0,Q.jsx)(uh,{ref:i.context.internalBackdropRef,inert:bd(!s)}),e.children]})}):null});function wv({store:e,parentContext:t,isDrawer:n}){let r=e.useState(`open`),i=e.useState(`disablePointerDismissal`),a=e.useState(`modal`),o=e.useState(`popupElement`),s=e.useState(`floatingRootContext`),[c,l]=_.useState(0),[u,d]=_.useState(0),f=c===0,p=mc(s,{outsidePressEvent(){return e.context.internalBackdropRef.current||e.context.backdropRef.current?`intentional`:{mouse:a===`trap-focus`?`sloppy`:`intentional`,touch:`sloppy`}},outsidePress(t){if(!e.context.outsidePressEnabledRef.current||`button`in t&&t.button!==0)return!1;if(`touches`in t){if(t.type===`touchend`){if(t.changedTouches.length!==1||t.touches.length!==0)return!1}else if(t.touches.length!==1)return!1}let n=ai(t);if(f&&!i){if(a){let t=e.context.internalBackdropRef.current,r=e.context.backdropRef.current;return t||r?t===n||r===n||$(n,o)&&!n?.hasAttribute(`data-base-ui-portal`):!0}return!0}return!1},escapeKey:f});return xh(r&&a===!0,o),e.useContextCallback(`onNestedDialogOpen`,(e,t)=>{l(e),d(t)}),J(()=>(t?.onNestedDialogOpen&&(r?t.onNestedDialogOpen(c+1,u+ +!!n):t.onNestedDialogOpen(0,0)),()=>{t?.onNestedDialogOpen&&r&&t.onNestedDialogOpen(0,0)}),[n,r,c,u,t]),Kl(e,{activeTriggerProps:p.reference,inactiveTriggerProps:p.trigger,popupProps:p.floating,nestedOpenDialogCount:c,nestedOpenDrawerCount:u}),null}var Tv={...tu,modal:e=>e.modal,nested:e=>e.nested,nestedOpenDialogCount:e=>e.nestedOpenDialogCount,nestedOpenDrawerCount:e=>e.nestedOpenDrawerCount,disablePointerDismissal:e=>e.disablePointerDismissal,openMethod:e=>e.openMethod,descriptionElementId:e=>e.descriptionElementId,titleElementId:e=>e.titleElementId,viewportElement:e=>e.viewportElement,role:e=>e.role},Ev=class extends Al{constructor(e,t,n){let r=new Jl,i=Dv(e,r,t,n);super(i,Ov(r),Tv)}setOpen=(e,t)=>{t.preventUnmountOnClose=()=>{this.set(`preventUnmountingOnClose`,!0)},!e&&t.trigger==null&&this.state.activeTriggerId!=null&&(t.trigger=this.state.activeTriggerElement??void 0),this.context.onOpenChange?.(e,t),!t.isCanceled&&(this.state.floatingRootContext.dispatchOpenChange(e,t),this.update(Bl(this.state,e,t.trigger)))}};function Dv(e,t,n,r=!1){return{...Yl(t,n,r),modal:!0,disablePointerDismissal:!1,viewportElement:null,descriptionElementId:void 0,titleElementId:void 0,openMethod:null,nested:!1,nestedOpenDialogCount:0,nestedOpenDrawerCount:0,role:`dialog`,...e}}function Ov(e){return{popupRef:_.createRef(),backdropRef:_.createRef(),internalBackdropRef:_.createRef(),outsidePressEnabledRef:{current:!0},triggerElements:e,onOpenChange:void 0,onOpenChangeComplete:void 0}}function kv(e,t){let{children:n,open:r,defaultOpen:i=!1,onOpenChange:a,onOpenChangeComplete:o,disablePointerDismissal:s=!1,modal:c=!0,actionsRef:l,handle:u,triggerId:d,defaultTriggerId:f=null}=t,p=e===`drawer`,m=e===`alert-dialog`,h=m?!0:c,g=m||s,v=m?`alertdialog`:`dialog`,y=mv(!0),b={modal:h,disablePointerDismissal:g,nested:y!=null,role:v},x=Il((e,t)=>new Ev({open:i,openProp:r,activeTriggerId:f,triggerIdProp:d,...b},e,t),!0);x.useControlledProp(`openProp`,r),x.useControlledProp(`triggerIdProp`,d),x.useSyncedValues(b),x.useContextCallback(`onOpenChange`,a),x.useContextCallback(`onOpenChangeComplete`,o);let S=x.useState(`open`),C=x.useState(`mounted`),w=x.useState(`payload`);ql(x,S),Wl(x);let{forceUnmount:T}=Gl(S,x);_.useImperativeHandle(l,()=>({unmount:T,close:()=>x.setOpen(!1,Ro(Io))}),[T,x]);let E=S||C;return(0,Q.jsxs)(pv.Provider,{value:x,children:[u&&(0,Q.jsx)(Ll,{handle:u,store:x}),E&&(0,Q.jsx)(wv,{store:x,parentContext:y?.context,isDrawer:p}),typeof n==`function`?n({payload:w}):n]})}var Av=Zo(function(e){return kv(`dialog`,e)}),jv=_.forwardRef(function(e,t){let{render:n,className:r,style:i,id:a,...o}=e,s=mv(),c=Lr(a);return s.useSyncedValueWithCleanup(`titleElementId`,c),mt(`h2`,e,{ref:t,props:[{id:c},o]})});function Mv({...e}){return(0,Q.jsx)(Av,{"data-slot":`sheet`,...e})}function Nv({children:e,container:t,...n}){let r=wd(t),i=_.useRef(null);return(0,Q.jsx)(Cv,{"data-slot":`sheet-portal`,container:r,ref:i,...n,children:(0,Q.jsx)(Cd,{container:i,children:e})})}function Pv({className:e,...t}){return(0,Q.jsx)(hv,{"data-slot":`sheet-overlay`,className:Z(`fixed inset-0 z-50 bg-black/80 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs`,e),...t})}function Fv({className:e,children:t,closeLabel:n=`关闭`,portalContainer:r,side:i=`right`,showCloseButton:a=!0,...o}){return(0,Q.jsxs)(Nv,{container:r,children:[(0,Q.jsx)(Pv,{}),(0,Q.jsxs)(Sv,{"data-slot":`sheet-content`,"data-side":i,className:Z(`fixed z-50 flex flex-col border-[color:color-mix(in_oklab,var(--border)_12%,transparent)] bg-[color:var(--background)] bg-clip-padding popup-text-xs-plus leading-relaxed shadow-lg transition duration-200 ease-in-out data-ending-style:opacity-0 data-starting-style:opacity-0 data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=bottom]:data-ending-style:translate-y-[2.5rem] data-[side=bottom]:data-starting-style:translate-y-[2.5rem] data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=left]:data-ending-style:translate-x-[-2.5rem] data-[side=left]:data-starting-style:translate-x-[-2.5rem] data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=right]:data-ending-style:translate-x-[2.5rem] data-[side=right]:data-starting-style:translate-x-[2.5rem] data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=top]:data-ending-style:translate-y-[-2.5rem] data-[side=top]:data-starting-style:translate-y-[-2.5rem] data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm`,e),...o,children:[t,a&&(0,Q.jsxs)(gv,{"data-slot":`sheet-close`,render:(0,Q.jsx)(Sr,{variant:`ghost`,className:`absolute top-4 right-4`,size:`icon-sm`}),children:[(0,Q.jsx)(B,{}),(0,Q.jsx)(`span`,{className:`sr-only`,children:n})]})]})]})}function Iv({className:e,...t}){return(0,Q.jsx)(`div`,{"data-slot":`sheet-header`,className:Z(`flex flex-col gap-1.5 p-6`,e),...t})}function Lv({className:e,...t}){return(0,Q.jsx)(jv,{"data-slot":`sheet-title`,className:Z(`popup-text-xs-plus font-medium text-[color:var(--foreground)]`,e),...t})}var Rv=_.createContext(void 0);function zv(){let e=_.useContext(Rv);if(e===void 0)throw Error(We(64));return e}var Bv=`data-activation-direction`,Vv={tabActivationDirection:e=>({[Bv]:e})},Hv=_.forwardRef(function(e,t){let{className:n,defaultValue:r=0,onValueChange:i,orientation:a=`horizontal`,render:o,value:s,style:c,...l}=e,u=e.defaultValue!==void 0,d=_.useRef([]),[f,p]=_.useState(()=>new Map),[m,h]=ho({controlled:s,default:r,name:`Tabs`,state:`value`}),g=s!==void 0,[v,y]=_.useState(()=>new Map),b=_.useRef(void 0),x=_.useCallback(e=>Uv(v,e),[v]),[S,C]=_.useState(()=>({previousValue:m,tabActivationDirection:`none`})),{previousValue:w,tabActivationDirection:T}=S,E=T,D=!1;w!==m&&(E=Wv(w,m,a,v),D=w!=null&&m!=null&&x(m)==null);let O=D?w:m,k=w!==O||T!==E;J(()=>{k&&C({previousValue:O,tabActivationDirection:E})},[O,k,E]);let A=q((e,t)=>{t.activationDirection=Wv(m,e,a,v),i?.(e,t),!t.isCanceled&&h(e)}),j=q((e,t)=>{i?.(e,Ro(t,void 0,void 0,{activationDirection:`none`}))}),M=q((e,t)=>(p(n=>{let r=new Map(n);return r.set(e,t),r}),()=>{p(n=>{if(n.get(e)!==t)return n;let r=new Map(n);return r.delete(e),r})})),N=_.useCallback(e=>f.get(e),[f]),P=_.useCallback(e=>{for(let t of v.values())if(e===t.value)return t.id},[v]),F=_.useMemo(()=>({getTabElementBySelectedValue:x,getTabIdByPanelValue:P,getTabPanelIdByValue:N,onValueChange:A,orientation:a,registerMountedTabPanel:M,setTabMap:y,tabActivationDirection:E,value:m}),[x,P,N,A,a,M,y,E,m]),I=_.useMemo(()=>{for(let e of v.values())if(e.value===m)return e},[v,m]),L=_.useMemo(()=>{for(let e of v.values())if(!e.disabled)return e.value},[v]),R=_.useRef(!u),z=_.useRef(r),ee=_.useRef(u),B=_.useRef(!1);J(()=>{if(g)return;function e(e,t){h(e),C({previousValue:e,tabActivationDirection:`none`}),j(e,t),R.current=!1}if(v.size===0){B.current&&m!==null&&!b.current?.isConnected&&e(null,Po);return}B.current=!0,b.current=v.keys().next().value;let t=I?.disabled,n=I==null&&m!==null;if(!t&&m===z.current&&(ee.current=!1),ee.current&&t&&m===z.current)return;let r=R.current;if(t||n){let n=L??null;if(m===n){R.current=!1;return}let i=Po;r?i=Fo:t&&(i=No),e(n,i);return}r&&I!=null&&(j(m,Fo),R.current=!1)},[L,g,j,I,h,v,m]);let te=mt(`div`,e,{state:{orientation:a,tabActivationDirection:E},ref:t,props:l,stateAttributesMapping:Vv});return(0,Q.jsx)(Rv.Provider,{value:F,children:(0,Q.jsx)(Mf,{elementsRef:d,children:te})})});function Uv(e,t){for(let[n,r]of e.entries())if(t===r.value)return n;return null}function Wv(e,t,n,r){if(e==null||t==null)return`none`;let[i,a,o]=n===`horizontal`?[`left`,`left`,`right`]:[`top`,`up`,`down`],s=Uv(r,e),c=Uv(r,t);if(s==null||c==null)return s!==c&&(typeof e==`number`||typeof e==`string`)&&typeof e==typeof t?t>e?o:a:`none`;let l=s.getBoundingClientRect()[i],u=c.getBoundingClientRect()[i];return u<l?a:u>l?o:`none`}var Gv=_.createContext(void 0);function Kv(){let e=_.useContext(Gv);if(e===void 0)throw Error(We(65));return e}var qv=_.forwardRef(function(e,t){let{className:n,disabled:r=!1,render:i,value:a,id:o,nativeButton:s=!0,style:c,...l}=e,{value:u,getTabPanelIdByValue:d,onValueChange:f,orientation:p,tabActivationDirection:m}=zv(),{activateOnFocus:h,registerTabResizeObserverElement:g,tabsListElement:v}=Kv(),{highlightedIndex:y,onHighlightedIndexChange:b}=Ke(),x=Lr(o),{compositeProps:S,compositeRef:C,index:w}=h_({metadata:_.useMemo(()=>({disabled:r,id:x,value:a}),[r,x,a])}),T=a===u,E=_.useRef(!1),D=_.useRef(null),O=q(e=>{D.current?.(),D.current=e?g(e):null});J(()=>{if(E.current){E.current=!1;return}if(!(T&&w>-1&&y!==w))return;let e=v;if(e!=null){let t=ii(Je(e));if(t&&$(e,t))return}r||b(w)},[T,w,y,b,r,v]);let{getButtonProps:k,buttonRef:A}=Xe({disabled:r,native:s,focusableWhenDisabled:!0}),j=d(a),M=_.useRef(!1),N=_.useRef(!1);function P(e){f(a,Ro(vo,e.nativeEvent,void 0,{activationDirection:`none`}))}function F(e){T||r||P(e)}function I(e){T||r||h&&(!M.current||N.current)&&P(e)}function L(e){if(T||r)return;M.current=!0,N.current=e.button===0;let t=Je(e.currentTarget);function n(){M.current=!1,N.current=!1,t.removeEventListener(`pointerup`,n),t.removeEventListener(`pointercancel`,n)}t.addEventListener(`pointerup`,n),t.addEventListener(`pointercancel`,n)}return mt(`button`,e,{state:{disabled:r,active:T,orientation:p,tabActivationDirection:m},ref:[t,A,C,O],props:[S,{role:`tab`,"aria-controls":j,"aria-selected":T,id:x,onClick:F,onFocus:I,onPointerDown:L,[y_]:T?``:void 0,onKeyDownCapture(){E.current=!0}},l,k],stateAttributesMapping:Vv})}),Jv=`data-index`,Yv={...Vv,...gi},Xv=_.forwardRef(function(e,t){let{className:n,value:r,render:i,keepMounted:a=!1,style:o,...s}=e,{value:c,getTabIdByPanelValue:l,orientation:u,tabActivationDirection:d,registerMountedTabPanel:f}=zv(),p=Lr(),{ref:m,index:h}=kp(),g=r===c,{mounted:v,transitionStatus:y,setMounted:b}=mo(g),x=!v,S=l(r),C={hidden:x,orientation:u,tabActivationDirection:d,transitionStatus:y},w=_.useRef(null),T=mt(`div`,e,{state:C,ref:[t,m,w],props:[{"aria-labelledby":S,hidden:x,id:p,role:`tabpanel`,tabIndex:g?0:-1,inert:bd(!g),[Jv]:h},s],stateAttributesMapping:Yv});return po({open:g,ref:w,onComplete(){g||b(!1)}}),J(()=>{if(!(p==null||x&&!a))return f(r,p)},[x,a,r,p,f]),a||v?T:null}),Zv=_.forwardRef(function(e,t){let{activateOnFocus:n=!1,className:r,loopFocus:i=!0,render:a,style:o,...s}=e,{orientation:c,setTabMap:l,tabActivationDirection:u}=zv(),[d,f]=_.useState(0),[p,m]=_.useState(null),h=_.useRef(new Set),g=_.useRef(new Set),v=_.useRef(null);J(()=>{if(typeof ResizeObserver>`u`)return;let e=new ResizeObserver(()=>{h.current.forEach(e=>{e()})});return v.current=e,p&&e.observe(p),g.current.forEach(t=>{e.observe(t)}),()=>{e.disconnect(),v.current=null}},[p]);let y=q(e=>(h.current.add(e),()=>{h.current.delete(e)})),b=q(e=>(g.current.add(e),v.current?.observe(e),()=>{g.current.delete(e),v.current?.unobserve(e)})),x={orientation:c,tabActivationDirection:u},S={"aria-orientation":c===`vertical`?`vertical`:void 0,role:`tablist`},C=_.useMemo(()=>({activateOnFocus:n,registerIndicatorUpdateListener:y,registerTabResizeObserverElement:b,tabsListElement:p}),[n,y,b,p]);return(0,Q.jsx)(Gv.Provider,{value:C,children:(0,Q.jsx)(C_,{render:a,className:r,style:o,state:x,refs:[t,m],props:[S,s],stateAttributesMapping:Vv,highlightedIndex:d,enableHomeAndEndKeys:!0,loopFocus:i,orientation:c,onHighlightedIndexChange:f,onMapChange:l,disabledIndices:lt})})});function Qv({className:e,orientation:t=`horizontal`,...n}){return(0,Q.jsx)(Hv,{"data-slot":`tabs`,"data-orientation":t,className:Z(`group/tabs flex gap-2 data-horizontal:flex-col`,e),...n})}var $v=Dt(`group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-[color:var(--muted-foreground)] group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col data-[variant=line]:rounded-none`,{variants:{size:{default:`group-data-horizontal/tabs:h-8`,header:`group-data-horizontal/tabs:h-10`,"header-lg":`group-data-horizontal/tabs:h-10`},variant:{control:`w-full rounded-md p-0 text-[color:color-mix(in_oklab,var(--foreground)_72%,transparent)] [&>[data-slot=tabs-trigger]]:relative [&>[data-slot=tabs-trigger]:has(+[data-slot=tabs-trigger])]:border-r-0 [&>[data-slot=tabs-trigger][data-active]+[data-slot=tabs-trigger]]:border-l-[color:color-mix(in_oklab,var(--border)_10%,transparent)]`,default:`bg-transparent`,line:`gap-1 bg-transparent pl-0`}},compoundVariants:[{className:`group-data-horizontal/tabs:h-7`,size:`default`,variant:`control`}],defaultVariants:{size:`default`,variant:`default`}});function ey({className:e,size:t=`default`,variant:n=`default`,...r}){return(0,Q.jsx)(Zv,{"data-slot":`tabs-list`,"data-variant":n,"data-size":t,className:Z($v({size:t,variant:n}),e),...r})}function ty({className:e,...t}){return(0,Q.jsx)(qv,{"data-slot":`tabs-trigger`,className:Z(`relative inline-flex h-[var(--tabs-trigger-height,calc(100%-1px))] flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-md border border-transparent px-1.5 py-0.5 text-xs font-medium whitespace-nowrap text-[color:color-mix(in_oklab,var(--foreground)_60%,transparent)] transition-none group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start group-data-vertical/tabs:py-[calc(--spacing(1.25))] hover:text-[color:var(--foreground)] focus-visible:border-[color:var(--ring)] focus-visible:ring-[3px] focus-visible:ring-[color:color-mix(in_oklab,var(--ring)_50%,transparent)] focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 dark:text-[color:var(--muted-foreground)] dark:hover:text-[color:var(--foreground)] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5`,`group-data-[size=header-lg]/tabs-list:px-2.5 group-data-[size=header-lg]/tabs-list:text-xs-plus`,`group-data-[variant=control]/tabs-list:h-full group-data-[variant=control]/tabs-list:min-w-0 group-data-[variant=control]/tabs-list:rounded-none group-data-[variant=control]/tabs-list:border-[color:color-mix(in_oklab,var(--border)_12%,transparent)] group-data-[variant=control]/tabs-list:bg-[color:color-mix(in_oklab,var(--input)_5%,transparent)] group-data-[variant=control]/tabs-list:px-2 group-data-[variant=control]/tabs-list:transition-all group-data-[variant=control]/tabs-list:first:rounded-l-md group-data-[variant=control]/tabs-list:last:rounded-r-md group-data-[variant=control]/tabs-list:hover:bg-[color:color-mix(in_oklab,var(--foreground)_10%,transparent)] group-data-[variant=control]/tabs-list:hover:text-[color:var(--foreground)] group-data-[variant=control]/tabs-list:data-active:border-[color:color-mix(in_oklab,var(--border)_10%,transparent)] group-data-[variant=control]/tabs-list:data-active:bg-[color:color-mix(in_oklab,var(--link)_12%,transparent)] group-data-[variant=control]/tabs-list:data-active:text-[color:var(--foreground)] group-data-[variant=control]/tabs-list:data-active:hover:bg-[color:color-mix(in_oklab,var(--link)_12%,transparent)] group-data-[variant=control]/tabs-list:data-active:hover:text-[color:var(--foreground)]`,`group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:border-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent`,`${pr} dark:data-active:text-[color:var(--foreground)]`,`after:absolute after:bg-[color:var(--foreground)] after:opacity-0 after:transition-none group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:bottom-[var(--tabs-indicator-bottom,-5px)] group-data-horizontal/tabs:after:h-0.5 group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-1 group-data-vertical/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-active:after:opacity-100`,e),...t})}function ny({className:e,...t}){return(0,Q.jsx)(Xv,{"data-slot":`tabs-content`,className:Z(`flex-1 text-xs/relaxed outline-none`,e),...t})}var ry=new URL(`poster-0qKU1qpL.png`,import.meta.url).href,iy=new URL(`aurora--T_lSQe3.png`,import.meta.url).href,ay=new URL(`blueDrop-zJiSOMYV.png`,import.meta.url).href,oy=new URL(`chrome-CmWCbSDw.png`,import.meta.url).href,sy=new URL(`chromaticMetal-jaOj7GKS.png`,import.meta.url).href,cy=new URL(`frost-5TitiKWg.png`,import.meta.url).href,ly=new URL(`opal-Czi46gqK.png`,import.meta.url).href,uy=new URL(`particleRibbon-BGLkfFRp.png`,import.meta.url).href,dy=new URL(`plasma-75zRh8iH.png`,import.meta.url).href,fy=new URL(`refractiveBlob-B8wcL_wC.png`,import.meta.url).href,py=new URL(`siri-rPkpl1Xk.png`,import.meta.url).href,my=new URL(`spectrum-BQxb1ogg.png`,import.meta.url).href,hy=new URL(`violetEmber-DHkKNL5C.png`,import.meta.url).href,gy=new URL(`voiceWave-D1__H5Sf.png`,import.meta.url).href,_y=new URL(`nebula-DReeQqAX.png`,import.meta.url).href,vy=new URL(`sonar-ImyNSjRK.png`,import.meta.url).href,yy=new URL(`harbor-BlY-aEy6.png`,import.meta.url).href,by=new URL(`ember-BkF483-g.png`,import.meta.url).href,xy=`// Generated from effect.wgsl for the native SwiftUI/Metal export.
// Do not edit this file independently of the WGSL source.
// language: metal2.1
#include <metal_stdlib>
#include <simd/simd.h>

using metal::uint;
struct DefaultConstructible {
    template<typename T>
    operator T() && {
        return T {};
    }
};

struct Uniforms {
    metal::float2 size;
    float time;
    float speed;
    float radius;
    float zoom;
    float warp;
    float ridgeAmt;
    float sharp;
    float shade;
    float sheen;
    float gloss;
    float shellMidAlpha;
    float shellEdgeAlpha;
    float exposure;
    float style;
    float edgeSoftness;
    float edgeGlow;
    float paletteCount;
    float glassEnabled;
    float glassOpacity;
    float contourDeform;
    float bandDensity;
    float chromaticShift;
    float metalScale;
    float metalStretch;
    float metalAngle;
    float metalOffset;
    float metalPhase;
    float metalEvolution;
    float metalRoughness;
    float metalDepth;
    float particleDensity;
    float ribbonCount;
    float ribbonWidth;
    float ribbonTwist;
    float ribbonFold;
    float ribbonBreath;
    float particleSize;
    float particleBloom;
    metal::float4 colorA;
    metal::float4 colorB;
    metal::float4 colorC;
    metal::float4 colorD;
    metal::float4 highlightColor;
    metal::float4 shellInner;
    metal::float4 shellMid;
    metal::float4 shellEdge;
    metal::float4 sheenColor;
    metal::float4 specColor;
    metal::float4 canvasColor;
    metal::float4 glowColor;
    metal::float4 paletteStop0_;
    metal::float4 paletteStop1_;
    metal::float4 paletteStop2_;
    metal::float4 paletteStop3_;
    metal::float4 paletteStop4_;
    metal::float4 paletteStop5_;
    metal::float4 paletteStop6_;
    metal::float4 paletteStop7_;
    metal::float4 paletteStop8_;
    metal::float4 paletteStop9_;
    metal::float4 paletteStop10_;
    metal::float4 paletteStop11_;
};
struct MfRamp {
    float n;
    char _pad1[12];
    metal::float3 s0_;
    metal::float3 s1_;
    metal::float3 s2_;
    metal::float3 s3_;
    metal::float3 s4_;
    metal::float3 s5_;
    metal::float3 s6_;
    metal::float3 s7_;
    metal::float3 s8_;
    metal::float3 s9_;
    metal::float3 s10_;
    metal::float3 s11_;
};
struct VOut {
    metal::float4 pos;
    metal::float2 uv;
    char _pad2[8];
};
struct type_7 {
    metal::float2 inner[3];
};
constant float GL_FU = 0.8817204;
constant float GL_BSIG_CLEAR = 0.018;
constant float GL_BSIG_GLASS = 0.0399;
constant float GL_KA = 6.0;
constant float GL_KG = 4.1209;
constant float GL_KWA = 0.5;
constant float GL_KR = 0.32;
constant float GL_GH = 1.7320508;
constant float GL_CLEAR_EA = 0.995;
constant float GL_CLEAR_EB = 1.04;

float mfEdgeD(
    float soft
) {
    return soft - 0.005;
}

metal::float3 mfEdgeGlow(
    metal::float3 col,
    metal::float2 uv,
    metal::float2 ctr,
    float rad,
    float soft_1,
    float glow,
    metal::float3 glowRGB
) {
    if (glow <= 0.0) {
        return col;
    }
    float r_3 = metal::length(uv - ctr);
    float outside = metal::smoothstep(rad - metal::max(soft_1, 0.0005), rad + metal::max(soft_1, 0.0005), r_3);
    return col + (glowRGB * ((glow * metal::exp(-(metal::max(r_3 - rad, 0.0)) * 11.0)) * outside));
}

metal::float3 mfRampPick(
    float idx,
    metal::float3 s0_,
    metal::float3 s1_,
    metal::float3 s2_,
    metal::float3 s3_,
    metal::float3 s4_,
    metal::float3 s5_,
    metal::float3 s6_,
    metal::float3 s7_,
    metal::float3 s8_,
    metal::float3 s9_,
    metal::float3 s10_,
    metal::float3 s11_
) {
    metal::float3 r = {};
    r = s0_;
    metal::float3 _e14 = r;
    r = (idx == 1.0) ? s1_ : _e14;
    metal::float3 _e18 = r;
    r = (idx == 2.0) ? s2_ : _e18;
    metal::float3 _e22 = r;
    r = (idx == 3.0) ? s3_ : _e22;
    metal::float3 _e26 = r;
    r = (idx == 4.0) ? s4_ : _e26;
    metal::float3 _e30 = r;
    r = (idx == 5.0) ? s5_ : _e30;
    metal::float3 _e34 = r;
    r = (idx == 6.0) ? s6_ : _e34;
    metal::float3 _e38 = r;
    r = (idx == 7.0) ? s7_ : _e38;
    metal::float3 _e42 = r;
    r = (idx == 8.0) ? s8_ : _e42;
    metal::float3 _e46 = r;
    r = (idx == 9.0) ? s9_ : _e46;
    metal::float3 _e50 = r;
    r = (idx == 10.0) ? s10_ : _e50;
    metal::float3 _e54 = r;
    r = (idx == 11.0) ? s11_ : _e54;
    metal::float3 _e58 = r;
    return _e58;
}

metal::float3 mfRampCyc(
    float tIn,
    float n,
    metal::float3 s0_1,
    metal::float3 s1_1,
    metal::float3 s2_1,
    metal::float3 s3_1,
    metal::float3 s4_1,
    metal::float3 s5_1,
    metal::float3 s6_1,
    metal::float3 s7_1,
    metal::float3 s8_1,
    metal::float3 s9_1,
    metal::float3 s10_1,
    metal::float3 s11_1
) {
    float k_3 = metal::clamp(metal::floor(n + 0.5), 1.0, 12.0);
    float x = metal::fract(tIn) * k_3;
    float i0_ = metal::min(metal::floor(x), k_3 - 1.0);
    float i1_ = ((i0_ + 1.0) >= k_3) ? 0.0 : i0_ + 1.0;
    metal::float3 _e33 = mfRampPick(i0_, s0_1, s1_1, s2_1, s3_1, s4_1, s5_1, s6_1, s7_1, s8_1, s9_1, s10_1, s11_1);
    metal::float3 _e34 = mfRampPick(i1_, s0_1, s1_1, s2_1, s3_1, s4_1, s5_1, s6_1, s7_1, s8_1, s9_1, s10_1, s11_1);
    return metal::mix(_e33, _e34, x - i0_);
}

metal::float3 mfRampLin(
    float tIn_1,
    float n_1,
    metal::float3 s0_2,
    metal::float3 s1_2,
    metal::float3 s2_2,
    metal::float3 s3_2,
    metal::float3 s4_2,
    metal::float3 s5_2,
    metal::float3 s6_2,
    metal::float3 s7_2,
    metal::float3 s8_2,
    metal::float3 s9_2,
    metal::float3 s10_2,
    metal::float3 s11_2
) {
    float k_4 = metal::clamp(metal::floor(n_1 + 0.5), 1.0, 12.0);
    float x_1 = metal::clamp(tIn_1, 0.0, 1.0) * (k_4 - 1.0);
    float i0_1 = metal::clamp(metal::floor(x_1), 0.0, metal::max(k_4 - 2.0, 0.0));
    metal::float3 _e33 = mfRampPick(i0_1, s0_2, s1_2, s2_2, s3_2, s4_2, s5_2, s6_2, s7_2, s8_2, s9_2, s10_2, s11_2);
    metal::float3 _e36 = mfRampPick(i0_1 + 1.0, s0_2, s1_2, s2_2, s3_2, s4_2, s5_2, s6_2, s7_2, s8_2, s9_2, s10_2, s11_2);
    return metal::mix(_e33, _e36, x_1 - i0_1);
}

MfRamp mfRampOf(
    float n_2,
    metal::float3 s0_3,
    metal::float3 s1_3,
    metal::float3 s2_3,
    metal::float3 s3_3,
    metal::float3 s4_3,
    metal::float3 s5_3,
    metal::float3 s6_3,
    metal::float3 s7_3,
    metal::float3 s8_3,
    metal::float3 s9_3,
    metal::float3 s10_3,
    metal::float3 s11_3
) {
    return MfRamp {n_2, {}, s0_3, s1_3, s2_3, s3_3, s4_3, s5_3, s6_3, s7_3, s8_3, s9_3, s10_3, s11_3};
}

metal::float3 mfRampCycR(
    float t,
    MfRamp r_1
) {
    metal::float3 _e15 = mfRampCyc(t, r_1.n, r_1.s0_, r_1.s1_, r_1.s2_, r_1.s3_, r_1.s4_, r_1.s5_, r_1.s6_, r_1.s7_, r_1.s8_, r_1.s9_, r_1.s10_, r_1.s11_);
    return _e15;
}

metal::float3 mfRampLinR(
    float t_1,
    MfRamp r_2
) {
    metal::float3 _e15 = mfRampLin(t_1, r_2.n, r_2.s0_, r_2.s1_, r_2.s2_, r_2.s3_, r_2.s4_, r_2.s5_, r_2.s6_, r_2.s7_, r_2.s8_, r_2.s9_, r_2.s10_, r_2.s11_);
    return _e15;
}

float lqHash(
    metal::float2 pIn
) {
    metal::float2 p_1 = {};
    p_1 = metal::fract(pIn * metal::float2(123.34, 456.21));
    metal::float2 _e7 = p_1;
    metal::float2 _e8 = p_1;
    metal::float2 _e9 = p_1;
    p_1 = _e7 + metal::float2(metal::dot(_e8, _e9 + metal::float2(45.32)));
    float _e17 = p_1.x;
    float _e19 = p_1.y;
    return metal::fract(_e17 * _e19);
}

float lqNoise(
    metal::float2 p_2
) {
    metal::float2 f = {};
    metal::float2 i_4 = metal::floor(p_2);
    f = metal::fract(p_2);
    metal::float2 _e4 = f;
    metal::float2 _e5 = f;
    metal::float2 _e7 = f;
    f = (_e4 * _e5) * (metal::float2(3.0) - (2.0 * _e7));
    float _e14 = lqHash(i_4);
    float _e19 = lqHash(i_4 + metal::float2(1.0, 0.0));
    float _e21 = f.x;
    float _e27 = lqHash(i_4 + metal::float2(0.0, 1.0));
    float _e32 = lqHash(i_4 + metal::float2(1.0, 1.0));
    float _e34 = f.x;
    float _e37 = f.y;
    return metal::mix(metal::mix(_e14, _e19, _e21), metal::mix(_e27, _e32, _e34), _e37);
}

metal::float2 lqFbm(
    metal::float2 pIn_1,
    float bs
) {
    metal::float2 p_3 = {};
    float s = 0.0;
    float a = 0.5;
    float m = 0.0;
    float vr = 0.0;
    float g = 1.0;
    int i_1 = 0;
    p_3 = pIn_1;
    float e = (-6.0 * bs) * bs;
    uint2 loop_bound = uint2(4294967295u);
    bool loop_init = true;
    while(true) {
        if (metal::all(loop_bound == uint2(0u))) { break; }
        loop_bound -= uint2(loop_bound.y == 0u, 1u);
        if (!loop_init) {
            int _e74 = i_1;
            i_1 = as_type<int>(as_type<uint>(_e74) + as_type<uint>(1));
        }
        loop_init = false;
        int _e18 = i_1;
        if (_e18 < 5) {
        } else {
            break;
        }
        {
            float _e21 = g;
            float b_1 = metal::exp(e * _e21);
            float _e24 = s;
            float _e25 = a;
            metal::float2 _e26 = p_3;
            float _e27 = lqNoise(_e26);
            s = _e24 + (_e25 * (0.5 + (b_1 * (_e27 - 0.5))));
            float _e35 = vr;
            float _e36 = a;
            float _e37 = a;
            vr = _e35 + ((_e36 * _e37) * (1.0 - (b_1 * b_1)));
            float _e44 = m;
            float _e45 = a;
            m = _e44 + _e45;
            float _e47 = a;
            a = _e47 * 0.5;
            float _e50 = g;
            g = _e50 * GL_KG;
            float _e54 = p_3.x;
            float _e58 = p_3.y;
            float _e63 = p_3.x;
            float _e67 = p_3.y;
            p_3 = metal::float2((0.8 * _e54) - (0.6 * _e58), (0.6 * _e63) + (0.8 * _e67)) * 2.03;
        }
    }
    float _e77 = s;
    float _e78 = m;
    float _e81 = vr;
    float _e84 = m;
    return metal::float2(_e77 / _e78, (GL_KR * metal::sqrt(_e81)) / _e84);
}

float lqRidge(
    float v,
    float k
) {
    return metal::pow(metal::clamp(1.0 - metal::abs((v * 2.0) - 1.0), 0.0, 1.0), k);
}

metal::float3 lqRamp(
    float v_1,
    metal::float3 cA,
    metal::float3 cB,
    metal::float3 cC,
    metal::float3 cD,
    constant Uniforms& u
) {
    metal::float3 c = {};
    c = metal::mix(cA, cB, metal::smoothstep(0.0, 0.45, v_1));
    metal::float3 _e10 = c;
    c = metal::mix(_e10, cC, metal::smoothstep(0.38, 0.72, v_1));
    metal::float3 _e15 = c;
    c = metal::mix(_e15, cD, metal::smoothstep(0.68, 1.0, v_1));
    metal::float3 _e20 = c;
    float _e23 = u.paletteCount;
    metal::float4 _e26 = u.paletteStop0_;
    metal::float4 _e30 = u.paletteStop1_;
    metal::float4 _e34 = u.paletteStop2_;
    metal::float4 _e38 = u.paletteStop3_;
    metal::float4 _e42 = u.paletteStop4_;
    metal::float4 _e46 = u.paletteStop5_;
    metal::float4 _e50 = u.paletteStop6_;
    metal::float4 _e54 = u.paletteStop7_;
    metal::float4 _e58 = u.paletteStop8_;
    metal::float4 _e62 = u.paletteStop9_;
    metal::float4 _e66 = u.paletteStop10_;
    metal::float4 _e70 = u.paletteStop11_;
    metal::float3 _e72 = mfRampLin(v_1, _e23, _e26.xyz, _e30.xyz, _e34.xyz, _e38.xyz, _e42.xyz, _e46.xyz, _e50.xyz, _e54.xyz, _e58.xyz, _e62.xyz, _e66.xyz, _e70.xyz);
    float _e75 = u.paletteCount;
    return (_e75 > 0.5) ? _e72 : _e20;
}

float lqRidgeS(
    metal::float2 vs,
    float k_1
) {
    float d_1 = GL_GH * vs.y;
    float _e7 = lqRidge(vs.x - d_1, k_1);
    float _e9 = lqRidge(vs.x, k_1);
    float _e15 = lqRidge(vs.x + d_1, k_1);
    return ((_e7 + (4.0 * _e9)) + _e15) / 6.0;
}

float lqStepS(
    metal::float2 vs_1,
    float a_1,
    float b
) {
    float d_2 = GL_GH * vs_1.y;
    return ((metal::smoothstep(a_1, b, vs_1.x - d_2) + (4.0 * metal::smoothstep(a_1, b, vs_1.x))) + metal::smoothstep(a_1, b, vs_1.x + d_2)) / 6.0;
}

float lqPowS(
    metal::float2 vs_2,
    float k_2
) {
    float d_3 = GL_GH * vs_2.y;
    return ((metal::pow(metal::clamp(vs_2.x - d_3, 0.0, 1.0), k_2) + (4.0 * metal::pow(metal::clamp(vs_2.x, 0.0, 1.0), k_2))) + metal::pow(metal::clamp(vs_2.x + d_3, 0.0, 1.0), k_2)) / 6.0;
}

metal::float3 glsFinishPresetFluid(
    metal::float3 colorIn,
    metal::float2 p_4,
    constant Uniforms& u
) {
    metal::float3 color = {};
    color = colorIn;
    metal::float3 _e3 = color;
    metal::float4 _e6 = u.highlightColor;
    float _e10 = u.shade;
    color = metal::mix(_e3, _e6.xyz, (_e10 * 0.22) * metal::smoothstep(0.15, 1.15, metal::dot(p_4, metal::float2(-0.32, 0.78))));
    metal::float3 _e22 = color;
    float _e25 = u.shade;
    color = _e22 * (1.0 - ((_e25 * 0.34) * metal::smoothstep(-0.1, 1.2, metal::dot(p_4, metal::float2(0.45, -0.62)))));
    metal::float3 _e39 = color;
    float _e42 = u.shade;
    color = _e39 * (1.0 - ((_e42 * 0.22) * metal::smoothstep(0.72, 1.08, metal::length(p_4))));
    metal::float3 _e53 = color;
    return metal::clamp(_e53, metal::float3(0.0), metal::float3(1.0));
}

metal::float3 glsFinishEmissionFluid(
    metal::float3 colorIn,
    metal::float2 p,
    constant Uniforms& u
) {
    metal::float3 color = colorIn;
    if (u.glassEnabled > 0.5) {
        color = metal::mix(
            color,
            u.highlightColor.xyz,
            u.shade * 0.22
                * metal::smoothstep(0.15, 1.15, metal::dot(p, metal::float2(-0.32, 0.78)))
        );
    }
    color *= 1.0 - u.shade * 0.34
        * metal::smoothstep(-0.1, 1.2, metal::dot(p, metal::float2(0.45, -0.62)));
    color *= 1.0 - u.shade * 0.22
        * metal::smoothstep(0.72, 1.08, metal::length(p));
    return metal::clamp(color, metal::float3(0.0), metal::float3(1.0));
}

metal::float2 glsSiriBand(
    metal::float2 q,
    float drift,
    float phaseOffset,
    float amplitude,
    float mainY,
    float envelope,
    float softness
) {
    float y = (amplitude * envelope) * metal::sin(((q.x * 1.0) + drift) + phaseOffset);
    float distanceToLine = metal::abs(q.y - y);
    float line = 0.018 / (metal::sqrt((distanceToLine * distanceToLine) + (softness * softness)) + 0.026);
    float bandDistance = metal::max(0.0, metal::max(q.y - metal::max(mainY, y), metal::min(mainY, y) - q.y));
    float band = 0.018 / (bandDistance + 0.075);
    return metal::float2(line, band);
}

metal::float3 glsSiriFluid(
    metal::float2 p_5,
    float t_2,
    constant Uniforms& u
) {
    metal::float3 color_1 = {};
    float _e4 = u.zoom;
    float scale_1 = 0.74 + (_e4 * 0.34);
    metal::float2 q_5 = p_5 / metal::float2(scale_1);
    float xNorm = q_5.x;
    float envelopeBase = metal::cos(1.5707964 * metal::min(metal::abs(0.9 * xNorm), 1.0));
    float envelope_1 = envelopeBase * envelopeBase;
    float low = 0.5 + (0.5 * metal::cos(t_2 * 0.37));
    float mid = 0.5 + (0.5 * metal::sin((t_2 * 0.51) + 1.2));
    float high = 0.5 + (0.5 * metal::cos((t_2 * 0.73) + 2.1));
    float drift_1 = t_2 * 2.4;
    float _e50 = u.ridgeAmt;
    float mainAmplitude = (0.25 + (_e50 * 0.075)) + (low * 0.018);
    float bandAmplitude = (mainAmplitude + (mid * 0.025)) + (high * 0.018);
    float mainY_1 = (mainAmplitude * envelope_1) * metal::sin((q_5.x * 1.1) + drift_1);
    float _e73 = u.warp;
    float separation = (1.85 + (_e73 * 0.2)) + (mid * 0.28);
    float _e83 = u.ridgeAmt;
    float softness_2 = (0.035 + ((1.0 - _e83) * 0.018)) + (mid * 0.006);
    metal::float2 _e94 = glsSiriBand(q_5, drift_1, -(separation), bandAmplitude, mainY_1, envelope_1, softness_2);
    metal::float2 _e98 = glsSiriBand(q_5, drift_1, -(separation) * 0.34, bandAmplitude, mainY_1, envelope_1, softness_2);
    metal::float2 _e101 = glsSiriBand(q_5, drift_1, separation * 0.34, bandAmplitude, mainY_1, envelope_1, softness_2);
    metal::float2 _e102 = glsSiriBand(q_5, drift_1, separation, bandAmplitude, mainY_1, envelope_1, softness_2);
    float w0_ = _e94.x + _e94.y;
    float w1_ = _e98.x + _e98.y;
    float w2_ = _e101.x + _e101.y;
    float w3_ = _e102.x + _e102.y;
    float total = ((w0_ + w1_) + w2_) + w3_;
    float dominant0_ = w0_ * w0_;
    float dominant1_ = w1_ * w1_;
    float dominant2_ = w2_ * w2_;
    float dominant3_ = w3_ * w3_;
    float dominantTotal = ((dominant0_ + dominant1_) + dominant2_) + dominant3_;
    metal::float4 _e127 = u.colorA;
    metal::float4 _e132 = u.colorC;
    metal::float4 _e138 = u.colorB;
    metal::float4 _e144 = u.colorD;
    metal::float3 spectral = ((((_e127.xyz * dominant0_) + (_e132.xyz * dominant1_)) + (_e138.xyz * dominant2_)) + (_e144.xyz * dominant3_)) / metal::float3(metal::max(dominantTotal, 0.0001));
    float energy = (1.0 - metal::exp(-(total) * 0.58)) * envelope_1;
    float mainDistance = metal::abs(q_5.y - mainY_1);
    float whiteCore = metal::exp((-(mainDistance) * mainDistance) / 0.0028) * envelope_1;
    metal::float4 _e170 = u.colorD;
    metal::float4 _e174 = u.colorB;
    float glassFill = u.glassEnabled > 0.5 ? 1.0 : 0.0;
    metal::float3 atmosphere = metal::mix(
        _e170.xyz, _e174.xyz, metal::smoothstep(-0.7, 0.7, q_5.y)) * 0.018 * glassFill;
    color_1 = atmosphere + ((spectral * energy) * 1.14);
    metal::float3 _e188 = color_1;
    metal::float4 _e191 = u.highlightColor;
    color_1 = _e188 + ((_e191.xyz * whiteCore) * (0.18 + (0.1 * low)));
    float emissionMask = metal::mix(
        metal::smoothstep(0.08, 0.25, energy + whiteCore * 0.12),
        1.0,
        glassFill
    );
    color_1 *= emissionMask;
    metal::float3 _e200 = color_1;
    metal::float3 _e203 = color_1;
    color_1 = _e200 / (metal::float3(1.0) + (_e203 * 0.18));
    metal::float3 _e208 = color_1;
    metal::float3 _e209 = glsFinishEmissionFluid(_e208, p_5, u);
    return _e209;
}

float glsSpectrumHeight(
    metal::float2 q_1,
    float t_3,
    float frequency,
    float phaseOffset_1,
    float amplitude_1
) {
    float x_2 = q_1.x * 2.15;
    float envelope_2 = metal::pow(4.0 / (4.0 + (x_2 * x_2)), 4.0);
    float breathing = 0.82 + (0.18 * metal::sin((t_3 * 0.48) + (phaseOffset_1 * 0.7)));
    float wave = metal::abs(metal::sin(((frequency * x_2) - (t_3 * 1.36)) + phaseOffset_1));
    return ((envelope_2 * amplitude_1) * breathing) * (0.28 + (0.72 * wave));
}

float glsSpectrumLayer(
    metal::float2 q_2,
    float height,
    float softness_1
) {
    return (1.0 - metal::smoothstep(metal::max(height - softness_1, 0.0), height + softness_1, metal::abs(q_2.y))) * metal::smoothstep(0.0, 0.045, height);
}

metal::float3 glsSpectrumFluid(
    metal::float2 p_6,
    float t_4,
    constant Uniforms& u
) {
    metal::float3 color_2 = {};
    float _e4 = u.zoom;
    float scale_2 = 0.74 + (_e4 * 0.34);
    metal::float2 q_6 = p_6 / metal::float2(scale_2);
    float _e13 = u.ridgeAmt;
    float amplitude_2 = 0.26 + (_e13 * 0.27);
    float _e20 = u.warp;
    float frequency_1 = 0.72 + (_e20 * 0.095);
    float _e27 = u.ridgeAmt;
    float softness_3 = 0.026 + ((1.0 - _e27) * 0.032);
    float _e39 = glsSpectrumHeight(q_6, t_4, frequency_1 * 0.82, -1.2, amplitude_2 * 0.72);
    float _e41 = glsSpectrumHeight(q_6, t_4, frequency_1, 0.45, amplitude_2);
    float _e47 = glsSpectrumHeight(q_6, t_4, frequency_1 * 1.17, 2.05, amplitude_2 * 0.82);
    float _e48 = glsSpectrumLayer(q_6, _e39, softness_3);
    float _e49 = glsSpectrumLayer(q_6, _e41, softness_3);
    float _e50 = glsSpectrumLayer(q_6, _e47, softness_3);
    float spectrumX = q_6.x * 2.15;
    float envelope_3 = metal::pow(4.0 / (4.0 + (spectrumX * spectrumX)), 4.0);
    float support = metal::exp((-(q_6.y) * q_6.y) / 0.00072) * envelope_3;
    float total_1 = (_e48 + _e49) + _e50;
    metal::float4 _e73 = u.colorB;
    metal::float4 _e78 = u.colorC;
    metal::float4 _e84 = u.colorD;
    metal::float3 spectral_1 = (((_e73.xyz * _e48) + (_e78.xyz * _e49)) + (_e84.xyz * _e50)) / metal::float3(metal::max(total_1, 0.001));
    metal::float4 _e94 = u.colorD;
    float glassFill = u.glassEnabled > 0.5 ? 1.0 : 0.0;
    color_2 = (_e94.xyz * 0.025 * glassFill)
            + (spectral_1 * (1.0 - metal::exp(-(total_1) * 0.86)));
    metal::float3 _e107 = color_2;
    metal::float4 _e110 = u.colorA;
    color_2 = _e107 + ((_e110.xyz * support) * 0.58);
    metal::float3 _e116 = color_2;
    metal::float3 _e119 = color_2;
    color_2 = _e116 / (metal::float3(1.0) + (_e119 * 0.2));
    metal::float3 _e124 = color_2;
    metal::float3 _e125 = glsFinishEmissionFluid(_e124, p_6, u);
    return _e125;
}

float glsAuroraLayer(
    metal::float2 p_7,
    float t_5,
    float offset,
    constant Uniforms& u
) {
    float drift_2 = (t_5 * 0.18) + (offset * 2.5);
    float _e11 = u.warp;
    float wave1_ = metal::sin(((p_7.x * (2.0 + (_e11 * 0.13))) + drift_2) + (offset * 6.0)) * 0.25;
    float wave2_ = metal::sin(((p_7.x * 3.7) + (drift_2 * 1.3)) + (offset * 4.0)) * 0.12;
    float wave3_ = metal::sin(((p_7.x * 7.2) + (drift_2 * 0.7)) + (offset * 8.0)) * 0.055;
    metal::float2 _e62 = lqFbm(metal::float2((p_7.x * 1.6) + (drift_2 * 0.35), (p_7.y * 0.8) + (offset * 3.0)), 0.018);
    float noiseValue = _e62.x;
    float center = ((((offset * 0.46) + wave1_) + wave2_) + wave3_) + ((noiseValue - 0.5) * 0.28);
    float dist = metal::abs(p_7.y - center);
    float _e81 = u.ridgeAmt;
    float glow_1 = metal::exp((-(dist) * dist) * (13.0 - (5.0 * _e81)));
    metal::float2 _e102 = lqFbm(metal::float2((p_7.x * 4.0) + (t_5 * 0.22), (p_7.y * 7.0) + (offset * 5.0)), 0.012);
    float shimmer = _e102.x;
    return glow_1 * (0.64 + (0.36 * shimmer));
}

metal::float3 glsAuroraFluid(
    metal::float2 p_8,
    float t_6,
    constant Uniforms& u
) {
    metal::float3 color_3 = {};
    float _e4 = u.zoom;
    metal::float2 q_7 = p_8 * (0.82 + (_e4 * 0.58));
    float _e11 = glsAuroraLayer(q_7, t_6, -0.72, u);
    float _e13 = glsAuroraLayer(q_7, t_6, 0.0, u);
    float _e15 = glsAuroraLayer(q_7, t_6, 0.72, u);
    metal::float4 _e18 = u.colorA;
    color_3 = _e18.xyz * (0.46 + (0.18 * (q_7.y + 1.0)));
    metal::float3 _e29 = color_3;
    metal::float4 _e32 = u.colorB;
    color_3 = _e29 + ((_e32.xyz * _e11) * 1.3);
    metal::float3 _e38 = color_3;
    metal::float4 _e41 = u.colorC;
    color_3 = _e38 + ((_e41.xyz * _e13) * 1.15);
    metal::float3 _e47 = color_3;
    metal::float4 _e50 = u.colorD;
    color_3 = _e47 + ((_e50.xyz * _e15) * 1.2);
    metal::float3 _e56 = color_3;
    metal::float4 _e59 = u.colorB;
    metal::float4 _e63 = u.colorD;
    color_3 = _e56 + ((metal::mix(_e59.xyz, _e63.xyz, 0.5) * metal::min(_e11 * _e15, _e13)) * 0.65);
    metal::float2 starUv = (q_7 + metal::float2(1.0)) * 18.0;
    metal::float2 starCell = metal::floor(starUv);
    float _e79 = lqHash(starCell);
    float starPoint = metal::exp(-(metal::dot(metal::fract(starUv) - metal::float2(0.5), metal::fract(starUv) - metal::float2(0.5))) * 90.0);
    float stars = (metal::step(0.965, _e79) * starPoint) * (0.55 + (0.45 * metal::sin((t_6 * (1.0 + (_e79 * 2.0))) + (_e79 * 6.28))));
    metal::float3 _e110 = color_3;
    metal::float4 _e113 = u.highlightColor;
    color_3 = _e110 + ((_e113.xyz * stars) * (1.0 - metal::clamp((_e11 + _e13) + _e15, 0.0, 1.0)));
    metal::float3 _e125 = color_3;
    metal::float3 _e128 = color_3;
    color_3 = _e125 / (metal::float3(1.0) + (_e128 * 0.28));
    metal::float3 _e133 = color_3;
    metal::float3 _e134 = glsFinishPresetFluid(_e133, p_8, u);
    return _e134;
}

metal::float2 glsRotate(
    metal::float2 p_9,
    float angle
) {
    float c_1 = metal::cos(angle);
    float s_1 = metal::sin(angle);
    return metal::float2((c_1 * p_9.x) - (s_1 * p_9.y), (s_1 * p_9.x) + (c_1 * p_9.y));
}

float glsNeuroShape(
    metal::float2 pIn_2,
    float t_7,
    constant Uniforms& u
) {
    metal::float2 p_10 = {};
    metal::float2 sineAccum = metal::float2(0.0);
    metal::float2 result = metal::float2(0.0);
    float scale = 8.0;
    int j = 0;
    float _e4 = u.zoom;
    p_10 = pIn_2 * (0.34 + (0.08 * _e4));
    uint2 loop_bound_1 = uint2(4294967295u);
    bool loop_init_1 = true;
    while(true) {
        if (metal::all(loop_bound_1 == uint2(0u))) { break; }
        loop_bound_1 -= uint2(loop_bound_1.y == 0u, 1u);
        if (!loop_init_1) {
            int _e60 = j;
            j = as_type<int>(as_type<uint>(_e60) + as_type<uint>(1));
        }
        loop_init_1 = false;
        int _e21 = j;
        if (_e21 < 11) {
        } else {
            break;
        }
        {
            metal::float2 _e24 = p_10;
            metal::float2 _e26 = glsRotate(_e24, 1.0);
            p_10 = _e26;
            metal::float2 _e27 = sineAccum;
            metal::float2 _e29 = glsRotate(_e27, 1.0);
            sineAccum = _e29;
            metal::float2 _e30 = p_10;
            float _e31 = scale;
            int _e33 = j;
            metal::float2 _e37 = sineAccum;
            metal::float2 layer = (((_e30 * _e31) + metal::float2(static_cast<float>(_e33))) + _e37) - metal::float2(t_7 * 0.34);
            metal::float2 _e43 = sineAccum;
            sineAccum = _e43 + metal::sin(layer);
            metal::float2 _e46 = result;
            float _e53 = scale;
            result = _e46 + ((metal::float2(0.5) + (0.5 * metal::cos(layer))) / metal::float2(_e53));
            float _e57 = scale;
            scale = _e57 * 1.16;
        }
    }
    float _e64 = result.x;
    float _e66 = result.y;
    return _e64 + _e66;
}

metal::float3 glsPlasmaFluid(
    metal::float2 p_11,
    float t_8,
    constant Uniforms& u
) {
    metal::float3 color_4 = {};
    float _e2 = glsNeuroShape(p_11, t_8, u);
    float _e5 = u.warp;
    float phase = (((_e2 * (10.0 + _e5)) + (p_11.x * 1.7)) - (p_11.y * 1.3)) - (t_8 * 0.52);
    float _e22 = u.ridgeAmt;
    float ridgeWidth = 0.62 - (0.24 * _e22);
    float _e32 = u.sharp;
    float primary = metal::pow(metal::abs(metal::cos(phase)), metal::max(1.3, _e32 * ridgeWidth));
    float _e52 = u.sharp;
    float secondary = metal::pow(metal::abs(metal::cos(((phase * 0.53) + (metal::atan2(p_11.y, p_11.x) * 2.0)) + (t_8 * 0.21))), metal::max(1.6, _e52 * (ridgeWidth + 0.1)));
    float filaments = metal::max(primary, secondary * 0.64);
    float core = metal::pow(primary, 4.0);
    float polarity = 0.5 + (0.5 * metal::sin((phase * 0.37) + (_e2 * 3.0)));
    metal::float4 _e75 = u.colorA;
    metal::float4 _e81 = u.colorD;
    color_4 = metal::mix(_e75.xyz * 0.42, _e81.xyz * 0.48, polarity * 0.46);
    metal::float3 _e89 = color_4;
    metal::float4 _e92 = u.colorB;
    color_4 = metal::mix(_e89, _e92.xyz, filaments * 0.72);
    metal::float3 _e97 = color_4;
    metal::float4 _e100 = u.colorC;
    color_4 = metal::mix(_e97, _e100.xyz, core * 0.68);
    metal::float3 _e105 = color_4;
    metal::float4 _e108 = u.highlightColor;
    color_4 = _e105 + ((_e108.xyz * metal::pow(core, 3.0)) * 0.16);
    metal::float3 _e116 = color_4;
    metal::float3 _e119 = color_4;
    color_4 = _e116 / (metal::float3(1.0) + (_e119 * 0.34));
    metal::float3 _e124 = color_4;
    metal::float3 _e125 = glsFinishPresetFluid(_e124, p_11, u);
    return _e125;
}

metal::float3 glsChromeFluid(
    metal::float2 p_12,
    float t_9,
    constant Uniforms& u
) {
    metal::float2 q_3 = {};
    int i_2 = 1;
    metal::float3 color_5 = {};
    float _e4 = u.zoom;
    q_3 = p_12 * (1.0 + (_e4 * 0.35));
    float _e13 = u.warp;
    float amplitude_3 = 0.028 * _e13;
    uint2 loop_bound_2 = uint2(4294967295u);
    bool loop_init_2 = true;
    while(true) {
        if (metal::all(loop_bound_2 == uint2(0u))) { break; }
        loop_bound_2 -= uint2(loop_bound_2.y == 0u, 1u);
        if (!loop_init_2) {
            int _e53 = i_2;
            i_2 = as_type<int>(as_type<uint>(_e53) + as_type<uint>(1));
        }
        loop_init_2 = false;
        int _e18 = i_2;
        if (_e18 <= 9) {
        } else {
            break;
        }
        {
            int _e21 = i_2;
            float fi = static_cast<float>(_e21);
            float _e25 = q_3.x;
            float _e30 = q_3.y;
            q_3.x = _e25 + ((amplitude_3 / fi) * metal::cos(((fi * 2.7) * _e30) + (t_9 * 0.46)));
            float _e40 = q_3.y;
            float _e45 = q_3.x;
            q_3.y = _e40 + ((amplitude_3 / fi) * metal::cos(((fi * 3.1) * _e45) - (t_9 * 0.4)));
        }
    }
    float _e59 = q_3.y;
    float _e62 = q_3.x;
    float denominator = metal::max(metal::abs(metal::sin(((t_9 * 0.24) - _e59) - _e62)), 0.045);
    float flare = metal::clamp(1.0 / denominator, 0.0, 18.0);
    float metal_ = metal::smoothstep(1.15, 7.5, flare);
    float _e77 = q_3.x;
    float _e79 = q_3.y;
    float _e83 = u.sharp;
    float fold = 0.5 + (0.5 * metal::cos(((_e77 - _e79) * (3.2 + (_e83 * 0.28))) + (t_9 * 0.32)));
    float value = metal::clamp((metal_ * 0.74) + (fold * 0.36), 0.0, 1.0);
    metal::float4 _e107 = u.colorD;
    metal::float4 _e111 = u.colorC;
    metal::float4 _e115 = u.colorB;
    metal::float4 _e119 = u.colorA;
    metal::float3 _e121 = lqRamp(value, _e107.xyz, _e111.xyz, _e115.xyz, _e119.xyz, u);
    color_5 = _e121;
    metal::float3 _e123 = color_5;
    metal::float4 _e126 = u.colorA;
    color_5 = metal::mix(_e123, _e126.xyz, metal::pow(metal_, 5.0) * 0.62);
    metal::float3 _e133 = color_5;
    metal::float3 _e134 = glsFinishPresetFluid(_e133, p_12, u);
    return _e134;
}

float glsChromaticMetalPhase(
    metal::float2 p,
    float t,
    constant Uniforms& u
) {
    float angle = u.metalAngle * 0.01745329252;
    float scale = metal::max(u.metalScale, 0.05);
    float stretch = metal::mix(0.48, 1.58, metal::clamp(u.metalStretch, 0.0, 1.0));
    metal::float2 q = glsRotate(p / scale, angle);
    q = metal::float2(q.x / stretch, q.y * stretch);
    float cycle = t * 0.46 + u.metalPhase * 6.28318530718;
    float evolution = metal::clamp(u.metalEvolution, 0.0, 2.0);
    q.x += metal::sin(q.y * 1.86 - cycle) * 0.095 * evolution;
    q.x += metal::sin((q.x + q.y) * 1.28 + cycle * 2.0 + 1.4) * 0.045 * evolution;
    q.y += metal::sin(q.x * 1.52 + cycle + 0.8) * 0.07 * evolution;
    float repeats = metal::max(u.bandDensity, 1.0);
    return q.x * repeats * 2.18
         + metal::sin(q.y * (1.3 + repeats * 0.26) - cycle) * 0.56 * evolution
         + metal::sin((q.x - q.y) * 1.34 + cycle * 2.0 + 1.7) * 0.27 * evolution
         + metal::sin((q.x * 0.72 + q.y) * 2.1 - cycle * 3.0 + 0.35) * 0.11 * evolution
         + metal::sin(cycle) * 0.1
         + metal::sin(cycle * 3.0 + 0.7) * 0.035
         + cycle
         + u.metalOffset * 6.28318530718;
}

float glsChromaticMetalTone(
    float phase,
    constant Uniforms& u
) {
    float wave = 0.5 + 0.5 * metal::cos(phase);
    float roughness = metal::clamp(u.metalRoughness, 0.0, 1.0);
    float depth = metal::clamp(u.metalDepth, 0.0, 1.0);
    float edge = 0.025 + roughness * 0.18;
    float broadReflection = metal::smoothstep(0.5 - edge, 0.5 + edge, wave);
    float hardReflection = metal::pow(wave, metal::mix(13.0, 4.0, roughness));
    float blackFold = metal::pow(1.0 - wave, metal::mix(9.0, 3.0, roughness));
    float body = metal::mix(wave, broadReflection, 0.2 + depth * 0.3);
    return metal::clamp(0.018 + body * (0.46 + depth * 0.12)
                        + hardReflection * (0.3 + depth * 0.42)
                        - blackFold * (0.07 + depth * 0.11), 0.0, 1.0);
}

metal::float3 glsChromaticMetalSample(
    metal::float2 p,
    float t,
    constant Uniforms& u
) {
    float phase = glsChromaticMetalPhase(p, t, u);
    float angle = u.metalAngle * 0.01745329252;
    metal::float2 brushP = glsRotate(p / metal::max(u.metalScale, 0.05), angle);
    float brushed = metal::sin(brushP.y * 146.0
                               + metal::sin(brushP.x * 11.0) * 0.58)
                  + 0.48 * metal::sin(brushP.y * 317.0 - brushP.x * 5.0);
    float brushAmount = 0.004 + metal::clamp(u.metalRoughness, 0.0, 1.0) * 0.014;
    float tone = metal::clamp(glsChromaticMetalTone(phase, u)
                              + brushed * brushAmount, 0.0, 1.0);
    return lqRamp(tone, u.colorD.xyz, u.colorB.xyz, u.colorC.xyz, u.colorA.xyz, u);
}

metal::float3 glsChromaticMetalFluid(
    metal::float2 p,
    float t,
    constant Uniforms& u
) {
    float angle = u.metalAngle * 0.01745329252;
    metal::float2 splitDirection = glsRotate(metal::float2(0.0, 1.0), angle);
    metal::float2 split = splitDirection * u.chromaticShift * 0.045;
    metal::float3 redSample = glsChromaticMetalSample(p + split, t, u);
    metal::float3 neutral = glsChromaticMetalSample(p, t, u);
    metal::float3 blueSample = glsChromaticMetalSample(p - split, t, u);
    metal::float3 optical = metal::float3(redSample.x, neutral.y, blueSample.z);
    float fringe = metal::clamp(metal::length(optical - neutral) * 4.0, 0.0, 1.0);
    metal::float3 color = metal::mix(neutral, optical,
        metal::clamp(u.chromaticShift * (0.72 + fringe * 0.28), 0.0, 1.0));
    float centerTone = glsChromaticMetalTone(glsChromaticMetalPhase(p, t, u), u);
    float glint = metal::pow(centerTone,
        metal::mix(12.0, 5.0, metal::clamp(u.metalRoughness, 0.0, 1.0)));
    color = metal::mix(color, u.highlightColor.xyz,
        glint * metal::clamp(u.metalDepth, 0.0, 1.0) * 0.06);
    float radial2 = metal::clamp(metal::dot(p, p), 0.0, 1.0);
    metal::float3 normal = metal::normalize(metal::float3(
        p, metal::sqrt(metal::max(1.0 - radial2, 0.0))));
    float roughness = metal::clamp(u.metalRoughness, 0.0, 1.0);
    float depth = metal::clamp(u.metalDepth, 0.0, 1.0);
    float key = metal::pow(metal::max(metal::dot(normal,
        metal::normalize(metal::float3(-0.48, 0.62, 0.62))), 0.0),
        metal::mix(7.0, 3.0, roughness));
    float fill = metal::pow(metal::max(metal::dot(normal,
        metal::normalize(metal::float3(0.7, -0.34, 0.63))), 0.0),
        metal::mix(10.0, 4.0, roughness));
    float limb = 1.0 - normal.z;
    float fresnel = metal::pow(limb, 3.0);
    float rim = metal::pow(limb, 10.0);
    color *= 0.86 + normal.z * 0.14;
    color = metal::mix(color, u.highlightColor.xyz, key * (0.05 + depth * 0.13));
    color = metal::mix(color, u.colorC.xyz, fill * (0.025 + depth * 0.07));
    color = metal::mix(color, u.colorD.xyz, fresnel * (0.12 + depth * 0.15));
    color = metal::mix(color, u.highlightColor.xyz, rim * (0.035 + depth * 0.055));
    return glsFinishPresetFluid(color, p, u);
}

metal::float3 glsOpalFluid(
    metal::float2 p_13,
    float t_10,
    constant Uniforms& u
) {
    float d = {};
    float a_2 = 0.0;
    int i_3 = 0;
    metal::float3 color_6 = {};
    float _e4 = u.zoom;
    metal::float2 q_8 = p_13 * (0.8 + (_e4 * 0.64));
    float _e12 = u.warp;
    float complexity = 0.76 + (_e12 * 0.085);
    d = -(t_10) * 0.42;
    uint2 loop_bound_3 = uint2(4294967295u);
    bool loop_init_3 = true;
    while(true) {
        if (metal::all(loop_bound_3 == uint2(0u))) { break; }
        loop_bound_3 -= uint2(loop_bound_3.y == 0u, 1u);
        if (!loop_init_3) {
            int _e48 = i_3;
            i_3 = as_type<int>(as_type<uint>(_e48) + as_type<uint>(1));
        }
        loop_init_3 = false;
        int _e25 = i_3;
        if (_e25 < 8) {
        } else {
            break;
        }
        {
            int _e28 = i_3;
            float fi_1 = static_cast<float>(_e28);
            float _e30 = a_2;
            float _e31 = d;
            float _e33 = a_2;
            a_2 = _e30 + metal::cos((fi_1 - _e31) - ((_e33 * q_8.x) * complexity));
            float _e40 = d;
            float _e44 = a_2;
            d = _e40 + metal::sin(((q_8.y * fi_1) * complexity) + _e44);
        }
    }
    float _e51 = d;
    d = _e51 + (t_10 * 0.42);
    float _e55 = d;
    float _e56 = a_2;
    metal::float2 c1_ = (metal::cos(q_8 * metal::float2(_e55, _e56)) * 0.6) + metal::float2(0.4);
    float _e65 = a_2;
    float _e66 = d;
    float c2_ = (metal::cos(_e65 + _e66) * 0.5) + 0.5;
    float _e76 = d;
    float _e77 = a_2;
    metal::float3 interference = metal::float3(0.5) + (0.5 * metal::cos(((metal::float3(c1_.x, c1_.y, c2_) * metal::cos(metal::float3(_e76, _e77, 2.5))) * 0.5) + metal::float3(0.5)));
    float tone = metal::fract(((((interference.x * 0.37) + (interference.y * 0.51)) + (interference.z * 0.73)) + (c1_.x * 0.22)) - (c1_.y * 0.15));
    metal::float4 _e115 = u.colorB;
    metal::float4 _e119 = u.colorC;
    metal::float4 _e123 = u.colorD;
    metal::float4 _e127 = u.colorA;
    metal::float3 _e129 = lqRamp(tone, _e115.xyz, _e119.xyz, _e123.xyz, _e127.xyz, u);
    color_6 = _e129;
    metal::float3 _e131 = color_6;
    metal::float4 _e134 = u.colorA;
    color_6 = metal::mix(_e131, _e134.xyz, 0.16 + (0.1 * interference.z));
    metal::float3 _e142 = color_6;
    metal::float3 _e145 = color_6;
    color_6 = _e142 / (metal::float3(1.0) + (_e145 * 0.16));
    metal::float3 _e150 = color_6;
    metal::float3 _e151 = glsFinishPresetFluid(_e150, p_13, u);
    return _e151;
}

metal::float3 glsFrostFluid(
    metal::float2 p_14,
    float t_11,
    constant Uniforms& u
) {
    metal::float2 q_4 = {};
    metal::float3 color_7 = {};
    float _e4 = u.zoom;
    q_4 = p_14 * (0.66 + (_e4 * 0.92));
    float _e13 = q_4.y;
    q_4.y = _e13 + (t_11 * 0.055);
    float _e19 = u.zoom;
    float blur = 0.011 + (0.006 * _e19);
    metal::float2 _e24 = q_4;
    metal::float2 _e32 = lqFbm((_e24 * 1.14) + metal::float2(t_11 * 0.055, 0.0), blur);
    metal::float2 _e34 = q_4;
    metal::float2 _e43 = lqFbm((_e34 * 1.14) + metal::float2(6.8, -(t_11) * 0.048), blur);
    metal::float2 warpField = metal::float2(_e32.x, _e43.x);
    metal::float2 _e46 = q_4;
    float _e52 = u.warp;
    metal::float2 warped = _e46 + ((warpField - metal::float2(0.5)) * (0.28 + (_e52 * 0.17)));
    metal::float2 _e70 = lqFbm((warped * 1.48) + metal::float2(t_11 * 0.032, -(t_11) * 0.02), blur * 1.48);
    metal::float2 _e81 = lqFbm((warped * 2.36) + metal::float2(3.1, -(t_11) * 0.024), blur * 2.36);
    float _e84 = u.sharp;
    float _e85 = lqRidgeS(_e81, _e84);
    float _e88 = lqStepS(_e70, 0.1, 0.9);
    float _e100 = u.ridgeAmt;
    float value_1 = metal::mix(_e88, metal::clamp((_e85 * 0.8) + (_e70.x * 0.46), 0.0, 1.0), _e100);
    metal::float4 _e104 = u.colorA;
    metal::float4 _e108 = u.colorB;
    metal::float4 _e112 = u.colorC;
    metal::float4 _e116 = u.colorD;
    metal::float3 _e118 = lqRamp(value_1, _e104.xyz, _e108.xyz, _e112.xyz, _e116.xyz, u);
    color_7 = _e118;
    metal::float3 _e120 = color_7;
    metal::float4 _e123 = u.colorA;
    color_7 = metal::mix(_e120, _e123.xyz, 0.08 * metal::smoothstep(0.62, 0.92, _e70.x));
    metal::float3 _e132 = color_7;
    metal::float3 _e133 = glsFinishPresetFluid(_e132, p_14, u);
    return _e133;
}

metal::float3 glsVoiceWaveFluid(
    metal::float2 p_15,
    float t_12,
    constant Uniforms& u
) {
    metal::float3 color_8 = {};
    float _e4 = u.zoom;
    float scale_3 = 0.76 + (_e4 * 0.34);
    metal::float2 q_9 = p_15 / metal::float2(scale_3);
    float rimEnvelope = metal::pow(metal::max(1.0 - (q_9.x * q_9.x), 0.0), 0.72);
    float drift_3 = t_12 * 0.82;
    float _e24 = u.warp;
    float amplitude_4 = 0.2 + (_e24 * 0.018);
    float mainY_2 = rimEnvelope * ((amplitude_4 * metal::sin((q_9.x * 1.48) + drift_3)) + (0.055 * metal::sin(((q_9.x * 3.2) - (drift_3 * 0.43)) + 1.1)));
    float distance = q_9.y - mainY_2;
    float _e52 = u.ridgeAmt;
    float width = 0.11 + ((1.0 - _e52) * 0.075);
    float membrane = metal::exp((-(distance) * distance) / metal::max(width * width, 0.001)) * rimEnvelope;
    float upperVeil = metal::exp((-(distance - 0.105) * (distance - 0.105)) / metal::max((width * width) * 2.4, 0.001)) * rimEnvelope;
    float lowerVeil = metal::exp((-(distance + 0.115) * (distance + 0.115)) / metal::max((width * width) * 2.8, 0.001)) * rimEnvelope;
    float crest = metal::exp((-(distance) * distance) / 0.0026) * rimEnvelope;
    float depth = metal::sqrt(metal::max(1.0 - metal::clamp(metal::dot(p_15, p_15), 0.0, 1.0), 0.0));
    metal::float4 _e112 = u.colorA;
    metal::float4 _e118 = u.colorD;
    color_8 = metal::mix(_e112.xyz * 0.7, _e118.xyz * 0.34, metal::smoothstep(-0.82, 0.82, q_9.y));
    metal::float3 _e128 = color_8;
    metal::float4 _e131 = u.colorB;
    color_8 = metal::mix(_e128, _e131.xyz, upperVeil * 0.7);
    metal::float3 _e136 = color_8;
    metal::float4 _e139 = u.colorC;
    color_8 = metal::mix(_e136, _e139.xyz, lowerVeil * 0.62);
    metal::float3 _e144 = color_8;
    metal::float4 _e147 = u.colorB;
    metal::float4 _e151 = u.colorC;
    color_8 = _e144 + ((metal::mix(_e147.xyz, _e151.xyz, 0.46) * membrane) * 0.34);
    metal::float3 _e159 = color_8;
    metal::float4 _e162 = u.highlightColor;
    color_8 = _e159 + ((_e162.xyz * crest) * 0.14);
    metal::float3 _e168 = color_8;
    color_8 = _e168 * (0.58 + (0.42 * depth));
    metal::float3 _e174 = color_8;
    metal::float3 _e175 = glsFinishPresetFluid(_e174, p_15, u);
    return _e175;
}

metal::float3 glsBlueDropFluid(
    metal::float2 p,
    float t,
    constant Uniforms& u
) {
    float depth = metal::sqrt(metal::max(1.0 - metal::clamp(metal::dot(p, p), 0.0, 1.0), 0.0));
    metal::float2 q = p * metal::mix(0.72, 1.0, depth * 0.62 + 0.38);
    q = glsRotate(q, -0.24 + 0.06 * metal::sin(t * 0.17));
    float scale = 1.0 + u.zoom * 1.12;
    float blur = 0.012 + 0.006 * u.zoom;
    metal::float2 driftA = lqFbm(q * 1.28 + metal::float2(t * 0.095, -t * 0.034), blur * 1.28);
    metal::float2 driftB = lqFbm(glsRotate(q, 1.08) * 1.62
                                 + metal::float2(-t * 0.042, t * 0.078), blur * 1.62);
    metal::float2 flowed = q + metal::float2(driftA.x - 0.5, driftB.x - 0.5)
                               * (0.24 + u.warp * 0.1);
    flowed.x += metal::sin(flowed.y * 2.15 + t * 0.24) * (0.035 + u.warp * 0.012);
    flowed.y += metal::sin(flowed.x * 1.38 - t * 0.18) * (0.045 + u.warp * 0.01);
    metal::float2 body = lqFbm(flowed * scale + metal::float2(t * 0.025, -t * 0.018), blur * scale);
    float marbleScale = 1.72 + u.zoom * 0.9;
    float marble = lqRidgeS(lqFbm(flowed * marbleScale
                                  + metal::float2(2.7, -t * 0.035), blur * marbleScale),
                            0.8 + u.sharp * 0.46);
    float value = metal::clamp(metal::mix(body.x, body.x * 0.62 + marble * 0.58, u.ridgeAmt), 0.0, 1.0);
    metal::float3 color = lqRamp(value, u.colorA.xyz, u.colorB.xyz, u.colorC.xyz, u.colorD.xyz, u);
    metal::float3 surface = metal::normalize(metal::float3(p.x, p.y, depth));
    metal::float3 direction = metal::normalize(metal::float3(-0.48, 0.62, 0.92));
    float light = metal::pow(metal::max(metal::dot(surface, direction), 0.0), 3.2);
    color = metal::mix(color, u.highlightColor.xyz, light * (0.035 + 0.05 * u.shade));
    color *= 0.74 + 0.26 * depth;
    return glsFinishPresetFluid(color, p, u);
}

metal::float3 glsVioletEmberFluid(
    metal::float2 p,
    float t,
    constant Uniforms& u
) {
    float scale = 1.08 + u.zoom * 1.18;
    float blur = 0.011 + 0.005 * u.zoom;
    float radius = metal::length(p);
    float twist = t * 0.055 + radius * (0.72 + u.warp * 0.11)
                  + 0.08 * metal::sin(t * 0.31 + radius * 4.0);
    metal::float2 q = glsRotate(p * scale, twist);
    metal::float2 low = lqFbm(q * 1.18 + metal::float2(t * 0.068, -t * 0.105), blur * 1.18);
    metal::float2 cross = lqFbm(glsRotate(q, -1.12) * 1.52
                                + metal::float2(-t * 0.094, t * 0.042)
                                + metal::float2(low.x * 1.35, -low.x * 0.72), blur * 1.52);
    metal::float2 warped = q + metal::float2(low.x - 0.5, cross.x - 0.5)
                              * (0.3 + u.warp * 0.12);
    metal::float2 melt = lqFbm(warped * 1.34
                               + metal::float2(cross.x * 1.48, low.x * 1.12), blur * 1.34);
    float veinScale = 2.05 + u.zoom * 0.72;
    float veins = lqRidgeS(lqFbm(warped * veinScale
                                 + metal::float2(-2.1, t * 0.052), blur * veinScale),
                           0.82 + u.sharp * 0.58);
    float heat = metal::smoothstep(0.18, 0.92,
                                   melt.x * (0.72 - u.ridgeAmt * 0.16)
                                   + veins * (0.32 + u.ridgeAmt * 0.5));
    metal::float3 color = lqRamp(heat, u.colorA.xyz, u.colorB.xyz, u.colorC.xyz, u.colorD.xyz, u);
    float pulse = 0.94 + 0.06 * metal::sin(t * 0.44 + melt.x * 5.0);
    color *= pulse;
    color = metal::mix(color, u.highlightColor.xyz, metal::pow(veins, 4.0) * 0.045);
    return glsFinishPresetFluid(color, p, u);
}

metal::float3 glsRefractiveBlobFluid(
    metal::float2 p,
    float t,
    constant Uniforms& u
) {
    float radial2 = metal::clamp(metal::dot(p, p), 0.0, 1.0);
    float depth = metal::sqrt(metal::max(1.0 - radial2, 0.0));
    float scale = 0.82 + u.zoom * 1.08;
    float blur = 0.012 + 0.005 * u.zoom;
    metal::float2 q = glsRotate(p * scale, 0.08 * metal::sin(t * 0.17));
    metal::float2 driftA = lqFbm(
        q * 1.16 + metal::float2(t * 0.052, -t * 0.078), blur * 1.16);
    metal::float2 driftB = lqFbm(
        glsRotate(q, 1.21) * 1.34 + metal::float2(-t * 0.064, t * 0.041),
        blur * 1.34);
    q += metal::float2(driftA.x - 0.5, driftB.x - 0.5)
       * (0.34 + u.warp * 0.105);

    metal::float2 body = lqFbm(
        q * 1.42 + metal::float2(driftB.x * 0.82, driftA.x * 0.66),
        blur * 1.42);
    float ribbonPhase = q.y * (2.2 + u.warp * 0.11)
                      + metal::sin(q.x * 1.72 - t * 0.19) * 0.92
                      + metal::sin((q.x + q.y) * 1.08 + t * 0.13) * 0.46;
    float ribbon = metal::pow(
        metal::clamp(1.0 - metal::abs(metal::sin(ribbonPhase)), 0.0, 1.0),
        0.82 + u.sharp * 0.23);
    float fold = lqRidgeS(
        lqFbm(q * 2.05 + metal::float2(2.8, -t * 0.037), blur * 2.05),
        0.9 + u.sharp * 0.32);
    float value = metal::clamp(
        body.x * 0.5 + driftA.x * 0.16
        + ribbon * (0.2 + u.ridgeAmt * 0.2)
        + fold * u.ridgeAmt * 0.18, 0.0, 1.0);

    metal::float3 color = lqRamp(
        value, u.colorA.xyz, u.colorB.xyz, u.colorC.xyz, u.colorD.xyz, u);
    float caustic = metal::pow(ribbon, 3.1) * (0.24 + 0.28 * u.ridgeAmt)
                  + metal::pow(fold, 4.2) * 0.08;
    color = metal::mix(color, u.colorD.xyz, metal::clamp(caustic, 0.0, 0.52));
    color *= 0.7 + depth * 0.3;
    float key = metal::pow(metal::max(metal::dot(
        metal::normalize(metal::float3(p, depth)),
        metal::normalize(metal::float3(-0.42, 0.58, 0.9))), 0.0), 4.0);
    color = metal::mix(color, u.highlightColor.xyz, key * 0.055);
    return glsFinishPresetFluid(color, p, u);
}

metal::float3 glsParticleRibbonFluid(
    metal::float2 p,
    float t,
    constant Uniforms& u
) {
    return metal::float3(0.0);
}

// ---------------------------------------------------------------------------
// GLIMMER: hand port of glmNebulaFluid / glmSonarFluid from
// Glimmer's src/shader/effect.wgsl. Not compiled on Apple hardware yet.
// ---------------------------------------------------------------------------
metal::float2 glmRotate(metal::float2 p, float angle) {
    float c = metal::cos(angle);
    float s = metal::sin(angle);
    return metal::float2(c * p.x - s * p.y, s * p.x + c * p.y);
}

metal::float3 glmNebulaFluid(metal::float2 p, float t, constant Uniforms& u) {
    metal::float2 q = p / (0.78 + u.zoom * 0.5);
    float r = metal::length(q);
    float angle = metal::atan2(q.y, q.x);
    float bend = lqFbm(q * 1.9 + metal::float2(t * 0.05, -t * 0.04), 0.02).x;
    float swirl = angle + t * 0.21 - metal::log(metal::max(r, 0.015)) * (1.4 + u.warp * 0.22);
    float arms = metal::pow(0.5 + 0.5 * metal::cos(2.0 * swirl + bend * 3.6), 1.0 + u.sharp * 0.75);
    float dust = lqFbm(glmRotate(q, t * 0.09) * 3.1 + metal::float2(4.2), 0.03).x;
    float core = metal::exp(-r * r * 16.0);
    float falloff = 1.0 - metal::smoothstep(0.1, 1.1, r);
    float v = metal::clamp(arms * (0.4 + 0.7 * dust) * falloff * (0.45 + u.ridgeAmt * 0.8)
                           + core * 0.6 + dust * 0.1, 0.0, 0.92);
    metal::float3 color = lqRamp(v, u.colorA.xyz, u.colorB.xyz, u.colorC.xyz, u.colorD.xyz, u);

    metal::float2 cellPos = glmRotate(q, t * 0.03) * 24.0;
    metal::float2 cell = metal::floor(cellPos);
    float seed = lqHash(cell + metal::float2(17.0, 3.0));
    metal::float2 local = metal::fract(cellPos) - metal::float2(0.5);
    float twinkle = 0.55 + 0.45 * metal::sin(t * 2.7 + seed * 41.0);
    float star = metal::step(0.955, seed) * metal::smoothstep(0.22, 0.0, metal::length(local)) * twinkle;
    color = color + u.highlightColor.xyz * star * (0.9 - core);
    color = metal::mix(color, u.highlightColor.xyz, core * 0.3);
    return glsFinishPresetFluid(color, p, u);
}

metal::float3 glmSonarFluid(metal::float2 p, float t, constant Uniforms& u) {
    metal::float2 q = p / (0.85 + u.zoom * 0.3);
    float r = metal::length(q);
    float angle = metal::atan2(q.y, q.x);
    float n = lqFbm(q * 1.7 + metal::float2(t * 0.05, t * 0.035), 0.025).x;
    float ringPhase = r * (1.2 + u.bandDensity * 0.9) - t * 0.55 + (n - 0.5) * u.warp * 0.35;
    float rings = metal::pow(0.5 + 0.5 * metal::cos(ringPhase * 6.28318530718), 6.0 + u.sharp * 6.0)
                  * (1.0 - metal::smoothstep(0.35, 1.0, r)) * 0.8;
    float beamAngle = angle - t * 0.9;
    float behind = metal::fract(-beamAngle / 6.28318530718);
    float beam = metal::pow(metal::max(metal::cos(beamAngle), 0.0), 40.0) + 0.6 * metal::exp(-behind * 7.0);
    metal::float2 cellPos = q * 5.5;
    float seed = lqHash(metal::floor(cellPos) + metal::float2(5.0, 11.0));
    float contactAngle = metal::atan2(metal::floor(cellPos).y + 0.5, metal::floor(cellPos).x + 0.5);
    float wake = metal::fract(-(contactAngle - t * 0.9) / 6.28318530718);
    float contact = metal::step(0.9, seed)
                    * metal::smoothstep(0.32, 0.0, metal::length(metal::fract(cellPos) - metal::float2(0.5)))
                    * metal::exp(-wake * 5.0) * metal::step(r, 0.92);
    float grid = (1.0 - metal::smoothstep(0.0, 0.012, metal::abs(metal::fract(r * 4.0 + 0.5) - 0.5))) * 0.06;
    float v = metal::clamp(0.12 + n * 0.2 + grid + rings * (0.35 + u.ridgeAmt * 0.5)
                           + beam * 0.5 * (1.0 - r * 0.6), 0.0, 1.0);
    metal::float3 color = lqRamp(v, u.colorA.xyz, u.colorB.xyz, u.colorC.xyz, u.colorD.xyz, u);
    color = color + u.highlightColor.xyz * contact * 1.2;
    return glsFinishPresetFluid(color, p, u);
}

metal::float3 glsPresetFluid(
    metal::float2 p_16,
    int style,
    float t_13,
    constant Uniforms& u
) {
    // GLIMMER: original flows.
    if (style == 30) {
        return glmNebulaFluid(p_16, t_13, u);
    }
    if (style == 31) {
        return glmSonarFluid(p_16, t_13, u);
    }
    if (style == 9) {
        metal::float3 _e5 = glsSiriFluid(p_16, t_13, u);
        return _e5;
    }
    if (style == 10) {
        metal::float3 _e8 = glsAuroraFluid(p_16, t_13, u);
        return _e8;
    }
    if (style == 11) {
        metal::float3 _e11 = glsPlasmaFluid(p_16, t_13, u);
        return _e11;
    }
    if (style == 12) {
        metal::float3 _e14 = glsChromeFluid(p_16, t_13, u);
        return _e14;
    }
    if (style == 13) {
        metal::float3 _e17 = glsOpalFluid(p_16, t_13, u);
        return _e17;
    }
    if (style == 14) {
        metal::float3 _e20 = glsSpectrumFluid(p_16, t_13, u);
        return _e20;
    }
    if (style == 15) {
        metal::float3 _e23 = glsFrostFluid(p_16, t_13, u);
        return _e23;
    }
    if (style == 19) {
        metal::float3 _e26 = glsVoiceWaveFluid(p_16, t_13, u);
        return _e26;
    }
    if (style == 20) {
        return glsBlueDropFluid(p_16, t_13, u);
    }
    if (style == 21) {
        return glsVioletEmberFluid(p_16, t_13, u);
    }
    if (style == 22) {
        return glsChromaticMetalFluid(p_16, t_13, u);
    }
    if (style == 23) {
        return glsRefractiveBlobFluid(p_16, t_13, u);
    }
    if (style == 24) {
        return glsParticleRibbonFluid(p_16, t_13, u);
    }
    metal::float3 _e27 = glsFrostFluid(p_16, t_13, u);
    return _e27;
}

metal::float3 glsFluid(
    metal::float2 fu,
    int md,
    float t_14,
    constant Uniforms& u
) {
    metal::float3 fcol = {};
    metal::float2 pp = {};
    float v_2 = {};
    float df = metal::length(fu);
    metal::float4 _e6 = u.colorA;
    metal::float3 cA_1 = _e6.xyz;
    metal::float4 _e10 = u.colorB;
    metal::float3 cB_1 = _e10.xyz;
    metal::float4 _e14 = u.colorC;
    metal::float3 cC_1 = _e14.xyz;
    metal::float4 _e18 = u.colorD;
    metal::float3 cD_1 = _e18.xyz;
    float _e24 = u.glassEnabled;
    float blurSigma = (_e24 > 0.5) ? GL_BSIG_GLASS : GL_BSIG_CLEAR;
    float _e30 = u.zoom;
    float sp = blurSigma * _e30;
    float sw = (sp * 1.1) * GL_KWA;
    if (md < 0) {
        float _e41 = u.zoom;
        pp = fu * _e41;
        float _e46 = pp.y;
        pp.y = _e46 + (t_14 * 0.05);
        metal::float2 _e50 = pp;
        metal::float2 _e58 = lqFbm((_e50 * 1.1) + metal::float2(0.0, t_14 * 0.09), sw);
        metal::float2 _e60 = pp;
        metal::float2 _e69 = lqFbm((_e60 * 1.1) + metal::float2(7.7, -(t_14) * 0.07), sw);
        metal::float2 w = metal::float2(_e58.x, _e69.x);
        metal::float2 _e72 = pp;
        float _e75 = u.warp;
        metal::float2 q_10 = _e72 + (_e75 * (w - metal::float2(0.5)));
        metal::float2 _e90 = lqFbm((q_10 * 1.5) + metal::float2(t_14 * 0.04, 0.0), sp * 1.5);
        metal::float2 _e98 = lqFbm((q_10 * 2.2) + metal::float2(3.1), sp * 2.2);
        float _e101 = u.sharp;
        float _e102 = lqRidgeS(_e98, _e101);
        float _e105 = lqStepS(_e90, 0.12, 0.88);
        float _e117 = u.ridgeAmt;
        float v_3 = metal::mix(_e105, metal::clamp((_e102 * 0.85) + (0.45 * _e90.x), 0.0, 1.0), _e117);
        metal::float3 _e119 = lqRamp(v_3, cA_1, cB_1, cC_1, cD_1, u);
        fcol = _e119;
    } else {
        float _e122 = u.zoom;
        metal::float2 pp_1 = fu * _e122;
        metal::float2 _e131 = lqFbm((pp_1 * 1.1) + metal::float2(0.0, t_14 * 0.09), sw);
        metal::float2 _e141 = lqFbm((pp_1 * 1.1) + metal::float2(7.7, -(t_14) * 0.07), sw);
        metal::float2 w_1 = metal::float2(_e131.x, _e141.x);
        float _e146 = u.warp;
        metal::float2 q_11 = pp_1 + (_e146 * (w_1 - metal::float2(0.5)));
        if (md == 0) {
            metal::float2 _e158 = lqFbm(q_11 * 2.2, sp * 2.2);
            float damp = metal::exp(((-18.0 * _e158.y) * _e158.y) - ((24.5 * sp) * sp));
            v_2 = 0.5 + ((0.5 * damp) * metal::sin(((q_11.x * 7.0) + (_e158.x * 6.0)) + (t_14 * 0.35)));
            float _e186 = v_2;
            metal::float2 _e195 = lqFbm((q_11 * 1.4) + metal::float2(t_14 * 0.03), sp * 1.4);
            v_2 = metal::mix(_e186, _e195.x, 0.25);
            float _e199 = v_2;
            metal::float3 _e200 = lqRamp(_e199, cA_1, cB_1, cC_1, cD_1, u);
            fcol = _e200;
        } else {
            if (md == 1) {
                metal::float2 _e212 = lqFbm((q_11 * 1.4) + metal::float2(t_14 * 0.06, 0.0), sp * 1.4);
                float _e215 = u.sharp;
                float _e216 = lqRidgeS(_e212, _e215);
                metal::float2 _e226 = lqFbm((q_11 * 1.7) - metal::float2(0.0, t_14 * 0.05), sp * 1.7);
                float _e229 = u.sharp;
                float _e230 = lqRidgeS(_e226, _e229);
                float v_4 = _e216 * _e230;
                metal::float3 _e234 = lqRamp(metal::pow(v_4, 0.7), cA_1, cB_1, cC_1, cD_1, u);
                fcol = _e234;
            } else {
                if (md == 6) {
                    metal::float2 _e247 = lqFbm((q_11 * 2.6) + metal::float2(t_14 * 0.025), sp * 2.6);
                    metal::float2 _e255 = lqFbm((q_11 * 1.3) + metal::float2(1.5 * _e247.x), sp * 1.3);
                    metal::float2 _e263 = lqFbm((q_11 * 2.1) + metal::float2(7.0), sp * 2.1);
                    float _e265 = lqRidgeS(_e263, 1.3);
                    float _e268 = lqStepS(_e255, 0.1, 0.9);
                    metal::float3 _e269 = lqRamp(_e268, cA_1, cB_1, cC_1, cD_1, u);
                    fcol = _e269;
                    metal::float3 _e270 = fcol;
                    fcol = _e270 * (1.0 - (0.18 * _e265));
                } else {
                    metal::float2 q2_ = q_11 + metal::float2(0.0, -(t_14) * 0.14);
                    metal::float2 _e294 = lqFbm((q2_ * 2.4) + metal::float2(0.0, -(t_14) * 0.05), sp * 2.4);
                    metal::float2 _e302 = lqFbm((q2_ * 1.6) + metal::float2(2.2 * _e294.x), sp * 1.6);
                    float _e304 = lqPowS(_e302, 1.5);
                    metal::float3 _e305 = lqRamp(_e304, cA_1, cB_1, cC_1, cD_1, u);
                    fcol = _e305;
                }
            }
        }
    }
    metal::float3 _e306 = fcol;
    metal::float4 _e309 = u.highlightColor;
    float _e313 = u.shade;
    fcol = metal::mix(_e306, _e309.xyz, (_e313 * 0.3) * metal::smoothstep(0.25, 1.25, metal::dot(fu, metal::float2(-0.32, 0.78))));
    metal::float3 _e325 = fcol;
    float _e328 = u.shade;
    fcol = _e325 * (1.0 - ((_e328 * 0.42) * metal::smoothstep(-0.05, 1.25, metal::dot(fu, metal::float2(0.45, -0.62)))));
    metal::float3 _e342 = fcol;
    float _e345 = u.shade;
    fcol = _e342 * (1.0 - ((_e345 * 0.3) * metal::smoothstep(0.72, 1.0, df)));
    metal::float3 _e355 = fcol;
    return metal::clamp(_e355, metal::float3(0.0), metal::float3(1.0));
}

metal::float3 glsOver(
    metal::float3 dst,
    metal::float3 src,
    float a_3
) {
    float k_5 = metal::clamp(a_3, 0.0, 1.0);
    return (src * k_5) + (dst * (1.0 - k_5));
}

float glsRefractionProfile(
    float t_15
) {
    float depth_1 = metal::clamp(t_15, 0.0, 1.0);
    float circular = metal::sqrt(metal::max(1.0 - ((1.0 - depth_1) * (1.0 - depth_1)), 0.0));
    return 1.0 - circular;
}

float glsHighlightLobe(
    metal::float2 normal,
    metal::float2 direction,
    float cut,
    float power
) {
    float angular = metal::clamp((metal::dot(normal, direction) - cut) / metal::max(1.0 - cut, 0.001), 0.0, 1.0);
    return metal::pow(angular, power);
}

int naga_f2i32(float value) {
    return static_cast<int>(metal::clamp(value, -2147483600.0, 2147483500.0));
}

metal::float2 glsContourWave(
    float angle_1,
    float t_16,
    constant Uniforms& u
) {
    float _e4 = u.style;
    int style_1 = naga_f2i32(_e4 + 0.5);
    if (style_1 == 19) {
        float wave_1 = (metal::sin((angle_1 * 2.0) + (t_16 * 0.27)) * 0.72) + (metal::sin(((angle_1 * 4.0) - (t_16 * 0.16)) + 2.1) * 0.28);
        float slope = (metal::cos((angle_1 * 2.0) + (t_16 * 0.27)) * 1.44) + (metal::cos(((angle_1 * 4.0) - (t_16 * 0.16)) + 2.1) * 1.12);
        return metal::float2(wave_1, slope);
    }
    float wave_2 = ((metal::sin((angle_1 * 3.0) + (t_16 * 0.62)) * 0.52) + (metal::sin(((angle_1 * 5.0) - (t_16 * 0.41)) + 1.7) * 0.31)) + (metal::sin(((angle_1 * 2.0) + (t_16 * 0.23)) + 3.1) * 0.17);
    float slope_1 = ((metal::cos((angle_1 * 3.0) + (t_16 * 0.62)) * 1.56) + (metal::cos(((angle_1 * 5.0) - (t_16 * 0.41)) + 1.7) * 1.55)) + (metal::cos(((angle_1 * 2.0) + (t_16 * 0.23)) + 3.1) * 0.34);
    return metal::float2(wave_2, slope_1);
}

float glsContourStrength(
    constant Uniforms& u
) {
    float _e2 = u.style;
    if (_e2 >= 18.5) {
        return 0.11;
    }
    float _e10 = u.style;
    return (_e10 >= 15.5) ? 0.16 : 0.09;
}

float glsContourScale(
    metal::float2 uv_1,
    float t_17,
    float amount,
    constant Uniforms& u
) {
    if (amount <= 0.0) {
        return 1.0;
    }
    metal::float2 _e9 = glsContourWave(metal::atan2(uv_1.y, uv_1.x), t_17, u);
    float _e13 = glsContourStrength(u);
    return 1.0 + ((metal::clamp(amount, 0.0, 1.0) * _e13) * _e9.x);
}

metal::float2 glsContourNormal(
    metal::float2 uv_2,
    float rad_1,
    float t_18,
    float amount_1,
    constant Uniforms& u
) {
    float distance_1 = metal::length(uv_2);
    if (distance_1 <= 0.0001) {
        return metal::float2(0.0);
    }
    metal::float2 radial = uv_2 / metal::float2(distance_1);
    metal::float2 _e14 = glsContourWave(metal::atan2(uv_2.y, uv_2.x), t_18, u);
    float _e18 = glsContourStrength(u);
    float slope_2 = (metal::clamp(amount_1, 0.0, 1.0) * _e18) * _e14.y;
    metal::float2 tangent = metal::float2(-(radial.y), radial.x);
    return metal::normalize(radial - (tangent * ((rad_1 * slope_2) / distance_1)));
}

metal::float2 glsRefractionNormal(
    metal::float2 base,
    metal::float2 p,
    float t,
    int style
) {
    if (style != 23) {
        return base;
    }
    metal::float2 tangent = metal::float2(-base.y, base.x);
    float a = lqFbm(
        p * 2.15 + metal::float2(t * 0.061, -t * 0.043), 0.018).x;
    float b = lqFbm(
        glsRotate(p, 1.37) * 2.55 + metal::float2(-t * 0.037, t * 0.052),
        0.021).x;
    float wave = (a - b) * 0.76
               + metal::sin(metal::atan2(p.y, p.x) * 3.0 + t * 0.21) * 0.08;
    return metal::normalize(base + tangent * wave);
}

metal::float4 orbGlassLiquidAnim(
    metal::float2 uv01_,
    constant Uniforms& u
) {
    metal::float2 fc = metal::float2(uv01_.x, 1.0 - uv01_.y) * u.size;
    metal::float2 uv = (2.0 * fc - u.size)
                     / metal::max(metal::min(u.size.x, u.size.y), 1.0);
    float rad = metal::max(u.radius, 0.05);
    float t = u.time * u.speed;
    int s = naga_f2i32(u.style + 0.5);
    bool emissionOnly = u.glassEnabled <= 0.5 && (s == 9 || s == 14 || s == 24);
    float contourRad = rad * glsContourScale(uv, t, u.contourDeform, u);

    if (metal::length(uv) > contourRad * (1.01 + mfEdgeD(u.edgeSoftness))) {
        metal::float3 halo = mfEdgeGlow(metal::float3(0.0), uv, metal::float2(0.0),
                                         contourRad, u.edgeSoftness, u.edgeGlow,
                                         u.glowColor.xyz);
        halo = metal::clamp(halo, metal::float3(0.0), metal::float3(1.0));
        float haloAlpha = metal::max(halo.x, metal::max(halo.y, halo.z));
        return metal::float4(halo, haloAlpha);
    }

    metal::float2 p = uv / contourRad;
    float pd = metal::length(p);
    metal::float2 fu = p / GL_FU;
    int md = -1;
    if (s == 1) { md = 1; }
    else if (s == 3 || s == 8) { md = 7; }
    else if (s == 5) { md = 6; }
    else if (s == 7) { md = 0; }

    float clearFa = 1.0 - metal::smoothstep(GL_CLEAR_EA, GL_CLEAR_EB, pd);
    metal::float2 contourNormal = glsContourNormal(uv, rad, t, u.contourDeform, u);
    metal::float2 normal = glsRefractionNormal(contourNormal, p, t, s);
    float edgeDepth = metal::max(1.0 - pd, 0.0);
    float refractionWidth = 0.015 + 0.95 * metal::clamp(u.shellMidAlpha, 0.0, 1.0);
    float refractionT = edgeDepth / metal::max(refractionWidth, 0.001);
    float refractionProfile = metal::pow(glsRefractionProfile(refractionT), 0.68);
    float refractionAmount = 1.6 * metal::clamp(u.glassOpacity, 0.0, 1.0)
                           * refractionProfile;
    metal::float2 refractedP = p - normal * refractionAmount;
    metal::float3 fcol = metal::float3(0.0);

    if (clearFa > 0.0) {
        if (s >= 9) {
            if (u.glassEnabled > 0.5) {
                float channelSplit = 0.14 * metal::clamp(u.gloss, 0.0, 2.0)
                                   * metal::clamp(u.glassOpacity, 0.0, 1.0)
                                   * refractionProfile;
                metal::float3 redSample = glsPresetFluid(refractedP - normal * channelSplit, s, t, u);
                metal::float3 greenSample = glsPresetFluid(refractedP, s, t, u);
                metal::float3 blueSample = glsPresetFluid(refractedP + normal * channelSplit, s, t, u);
                fcol = metal::float3(redSample.x, greenSample.y, blueSample.z);
            } else {
                fcol = glsPresetFluid(p, s, t, u);
            }
        } else {
            fcol = glsFluid(fu, md, t, u);
        }
    }

    float lum = metal::dot(fcol, metal::float3(0.213, 0.715, 0.072));
    metal::float3 clearSat = metal::clamp(
        metal::float3(lum) + (fcol - metal::float3(lum)) * 1.22,
        metal::float3(0.0), metal::float3(1.0));
    bool particleGlassOverlay = s == 24;
    metal::float3 col = particleGlassOverlay
        ? metal::float3(0.0)
        : glsOver(u.canvasColor.xyz, clearSat, 0.99 * clearFa);
    if (emissionOnly) {
        float signal = metal::max(clearSat.x, metal::max(clearSat.y, clearSat.z));
        float emissionCoverage = metal::smoothstep(0.025, 0.16, signal);
        col = clearSat * emissionCoverage;
    }

    if (u.glassEnabled > 0.5) {
        float surfaceWidth = particleGlassOverlay
            ? 0.09 + 0.12 * metal::clamp(u.shellEdgeAlpha, 0.0, 1.0)
            : 0.026 + 0.055 * metal::clamp(u.shellEdgeAlpha, 0.0, 1.0);
        float surfaceBand = (1.0 - metal::smoothstep(0.0, surfaceWidth, edgeDepth)) * clearFa;
        float opticalRim = metal::pow(surfaceBand, particleGlassOverlay ? 1.3 : 1.8);
        float innerRimAlpha = !particleGlassOverlay
            ? opticalRim * u.glassOpacity * 0.45
            : opticalRim * u.glassOpacity * 0.14;
        col = glsOver(col, u.shellInner.xyz, innerRimAlpha);

        metal::float2 coolDirection = metal::normalize(metal::float2(0.84, 0.54));
        metal::float2 warmDirection = metal::normalize(metal::float2(-0.62, -0.78));
        float coolSplit = glsHighlightLobe(normal, coolDirection, -0.32, 1.8);
        float warmSplit = glsHighlightLobe(normal, warmDirection, -0.28, 2.0);
        float dispersion = opticalRim * metal::clamp(u.gloss, 0.0, 2.0)
                         * (0.8 + 0.8 * u.shellEdgeAlpha);
        col = glsOver(col, u.shellMid.xyz, dispersion * coolSplit);
        col = glsOver(col, u.shellEdge.xyz, dispersion * warmSplit);

        float edgeShadow = opticalRim * (0.015 + 0.15 * u.shellEdgeAlpha)
                         * (0.15 + 0.85 * metal::max(
                            metal::dot(normal, metal::float2(0.45, -0.89)), 0.0));
        col *= 1.0 - edgeShadow;

        metal::float2 keyDirection = metal::normalize(metal::float2(-0.68, 0.73));
        metal::float2 fillDirection = metal::normalize(metal::float2(0.74, -0.67));
        float key = opticalRim * glsHighlightLobe(normal, keyDirection, 0.2, 2.8)
                  * metal::clamp(u.sheen, 0.0, 2.0) * 1.4;
        float fill = opticalRim * glsHighlightLobe(normal, fillDirection, 0.4, 3.6)
                   * metal::clamp(u.sheen, 0.0, 2.0) * 1.0;
        col = glsOver(col, u.sheenColor.xyz, key);
        col = glsOver(col, u.specColor.xyz, fill);
    }

    float ballA = 1.0 - metal::smoothstep(
        0.99 - mfEdgeD(u.edgeSoftness),
        1.01 + mfEdgeD(u.edgeSoftness), pd);
    col = metal::clamp(col * metal::max(u.exposure, 0.0),
                       metal::float3(0.0), metal::float3(1.0)) * ballA;
    metal::float3 edged = mfEdgeGlow(col, uv, metal::float2(0.0), contourRad,
                                     u.edgeSoftness, u.edgeGlow, u.glowColor.xyz);
    metal::float3 finalColor = metal::clamp(
        edged, metal::float3(0.0), metal::float3(1.0));
    float emissionAlpha = metal::max(finalColor.x, metal::max(finalColor.y, finalColor.z));
    float sphereAlpha = metal::clamp(metal::max(ballA, emissionAlpha), 0.0, 1.0);
    float finalAlpha = (emissionOnly || particleGlassOverlay)
        ? emissionAlpha
        : sphereAlpha;
    return metal::float4(finalColor, finalAlpha);
}

struct vs_mainInput {
};
struct vs_mainOutput {
    metal::float4 pos [[position]];
    metal::float2 uv [[user(loc0), center_perspective]];
};
vertex vs_mainOutput vs_main(
  uint i [[vertex_id]]
) {
    type_7 p = type_7 {metal::float2(-1.0, -1.0), metal::float2(3.0, -1.0), metal::float2(-1.0, 3.0)};
    VOut out = {};
    metal::float2 _e15 = uint(i) < 3 ? p.inner[i] : DefaultConstructible();
    out.pos = metal::float4(_e15, 0.0, 1.0);
    metal::float2 _e20 = uint(i) < 3 ? p.inner[i] : DefaultConstructible();
    metal::float2 uv01_1 = (_e20 + metal::float2(1.0)) * 0.5;
    out.uv = metal::float2(uv01_1.x, 1.0 - uv01_1.y);
    VOut _e32 = out;
    const auto _tmp = _e32;
    return vs_mainOutput { _tmp.pos, _tmp.uv };
}


struct fs_mainInput {
    metal::float2 uv [[user(loc0), center_perspective]];
};
struct fs_mainOutput {
    metal::float4 member_1 [[color(0)]];
};
fragment fs_mainOutput fs_main(
  fs_mainInput varyings_1 [[stage_in]]
, metal::float4 pos [[position]]
, constant Uniforms& u [[buffer(0)]]
) {
    const VOut in = { pos, varyings_1.uv };
    metal::float4 _e2 = orbGlassLiquidAnim(in.uv, u);
    metal::float2 _e12 = u.size;
    metal::float2 fc_1 = metal::float2(in.uv.x, 1.0 - in.uv.y) * _e12;
    metal::float2 _e18 = u.size;
    float _e23 = u.size.x;
    float _e27 = u.size.y;
    metal::float2 uv_4 = ((2.0 * fc_1) - _e18) / metal::float2(metal::max(metal::min(_e23, _e27), 1.0));
    float _e35 = u.radius;
    float rad_3 = metal::max(_e35, 0.05);
    float _e40 = u.time;
    float _e43 = u.speed;
    float t_20 = _e40 * _e43;
    float _e47 = u.contourDeform;
    float _e48 = glsContourScale(uv_4, t_20, _e47, u);
    float contourRad_1 = rad_3 * _e48;
    metal::float2 _e76 = u.size;
    metal::float2 _e80 = u.size;
    metal::float2 q_12 = ((2.0 * fc_1) - _e76) / _e80;
    float fitEnd = 1.0;
    float fitFeather = 2.0 / metal::max(metal::min(u.size.x, u.size.y), 1.0);
    float fitStart = metal::min(metal::mix(contourRad_1, fitEnd, 0.5), fitEnd - fitFeather);
    float fit = 1.0 - metal::smoothstep(fitStart, fitEnd, metal::max(metal::abs(q_12.x), metal::abs(q_12.y)));
    return fs_mainOutput { metal::float4(_e2.xyz * fit, _e2.w * fit) };
}

constant uint PR_U_SEGMENTS = 384;
constant uint PR_V_SEGMENTS = 96;
constant uint PR_PARTICLES_PER_LAYER = PR_U_SEGMENTS * PR_V_SEGMENTS;

float prHash(float value) {
    return metal::fract(metal::sin(value * 12.9898 + 78.233) * 43758.5453);
}

metal::float3 prRotateX(metal::float3 p, float angle) {
    float c = metal::cos(angle);
    float s = metal::sin(angle);
    return metal::float3(p.x, c * p.y - s * p.z, s * p.y + c * p.z);
}

metal::float3 prRotateY(metal::float3 p, float angle) {
    float c = metal::cos(angle);
    float s = metal::sin(angle);
    return metal::float3(c * p.x + s * p.z, p.y, -s * p.x + c * p.z);
}

metal::float3 prCurve(
    float theta,
    float layer,
    float phase,
    constant Uniforms& u
) {
    float local = theta + layer * 0.11;
    float foldPhase = 2.0 * local + phase * (0.72 + layer * 0.025);
    float fold = metal::clamp(u.ribbonFold, 0.0, 1.2);
    float radial = 0.4 + (0.085 + fold * 0.04) * metal::cos(foldPhase);
    float orbit = local + phase * 0.13
                + metal::sin(local - phase * 0.22 + layer) * fold * 0.13;
    float vertical = (0.235 + fold * 0.085) * metal::sin(foldPhase)
                   + 0.055 * metal::sin(local * 3.0 - phase * 0.46 + layer * 0.7);
    return metal::float3(radial * metal::cos(orbit), vertical, radial * metal::sin(orbit));
}

metal::float3 prPalette(float valueIn, constant Uniforms& u) {
    float value = metal::fract(valueIn) * 4.0;
    if (value < 1.0) return metal::mix(u.colorA.xyz, u.colorB.xyz, value);
    if (value < 2.0) return metal::mix(u.colorB.xyz, u.colorC.xyz, value - 1.0);
    if (value < 3.0) return metal::mix(u.colorC.xyz, u.colorD.xyz, value - 2.0);
    return metal::mix(u.colorD.xyz, u.colorA.xyz, value - 3.0);
}

struct ribbon_vs_mainOutput {
    metal::float4 pos [[position]];
    metal::float2 local [[user(loc0), center_no_perspective]];
    metal::float3 color [[user(loc1), center_perspective]];
    float opacity [[user(loc2), center_perspective]];
};

vertex ribbon_vs_mainOutput ribbon_vs_main(
    uint vertexIndex [[vertex_id]],
    uint instanceIndex [[instance_id]],
    constant Uniforms& u [[buffer(0)]]
) {
    const metal::float2 corners[6] = {
        metal::float2(-1.0, -1.0), metal::float2(1.0, -1.0),
        metal::float2(-1.0, 1.0), metal::float2(-1.0, 1.0),
        metal::float2(1.0, -1.0), metal::float2(1.0, 1.0)
    };
    uint layerIndex = instanceIndex / PR_PARTICLES_PER_LAYER;
    uint particleIndex = instanceIndex % PR_PARTICLES_PER_LAYER;
    uint uIndex = particleIndex / PR_V_SEGMENTS;
    uint vIndex = particleIndex % PR_V_SEGMENTS;
    float layer = float(layerIndex);
    float random = prHash(float(instanceIndex));
    bool activeLayer = layer < metal::floor(metal::clamp(u.ribbonCount, 2.0, 6.0) + 0.5);

    float uCoord = (float(uIndex) + prHash(float(instanceIndex) + 11.0) * 0.56)
                 / float(PR_U_SEGMENTS);
    float vCoord = (float(vIndex) + prHash(float(instanceIndex) + 29.0) * 0.46)
                 / float(PR_V_SEGMENTS);
    float strip = vCoord * 2.0 - 1.0;
    float t = u.time * u.speed;
    float phase = t * 0.48;
    float arc = metal::fract(uCoord + layer * 0.211 - phase * 0.019);
    float arcLength = 0.76 + 0.055 * metal::sin(t * 0.23 + layer * 1.71);
    float arcPosition = arc / arcLength;
    float arcEnvelope = metal::smoothstep(0.0, 0.075, arcPosition)
                      * (1.0 - metal::smoothstep(0.88, 1.0, arcPosition));
    bool active = activeLayer
               && arc <= arcLength
               && random <= metal::clamp(u.particleDensity, 0.2, 1.0);
    float theta = uCoord * 6.28318530718;
    metal::float3 center = prCurve(theta, layer, phase, u);
    metal::float3 ahead = prCurve(theta + 0.006, layer, phase, u);
    metal::float3 tangent = metal::normalize(ahead - center);
    metal::float3 radial = metal::normalize(center + metal::float3(0.001, 0.013, 0.007));
    metal::float3 side = metal::normalize(metal::cross(tangent, radial));
    metal::float3 surfaceNormal = metal::normalize(metal::cross(side, tangent));
    float twist = theta * (0.72 + u.ribbonTwist * 0.58)
                + phase * 0.74 + layer * 1.17;
    metal::float3 ribbonDirection = metal::normalize(
        side * metal::cos(twist) + surfaceNormal * metal::sin(twist));
    float widthEnvelope = (0.72 + 0.28
        * metal::pow(metal::sin(theta * 1.5 + phase + layer), 2.0))
        * metal::mix(0.42, 1.0, metal::sqrt(metal::max(arcEnvelope, 0.0)));
    metal::float3 position = center
        + ribbonDirection * strip * u.ribbonWidth * 0.5 * widthEnvelope;

    float pulse = metal::sin(t * 0.73 + layer * 1.71)
                + 0.44 * metal::sin(t * 1.17 + layer * 0.83 + 1.2);
    position *= 1.0 + u.ribbonBreath * pulse * 0.16;
    float layerCenter = layer
        - (metal::floor(metal::clamp(u.ribbonCount, 2.0, 6.0) + 0.5) - 1.0) * 0.5;
    position = prRotateY(
        position, layerCenter * 0.24 + metal::sin(t * 0.19 + layer * 1.3) * 0.055);
    position = prRotateX(
        position, layerCenter * 0.14 + metal::cos(t * 0.17 + layer * 0.9) * 0.04);
    position = prRotateY(position, t * 0.105 + metal::sin(t * 0.21) * 0.11);
    position = prRotateX(position, -0.2 + metal::sin(t * 0.16 + layer * 0.1) * 0.16);

    float minSize = metal::max(metal::min(u.size.x, u.size.y), 1.0);
    float depthScale = 0.88 + position.z * 0.16;
    metal::float2 orbPosition = position.xy * u.radius * 1.45 * depthScale;
    metal::float2 clip = metal::float2(
        orbPosition.x * minSize / metal::max(u.size.x, 1.0),
        orbPosition.y * minSize / metal::max(u.size.y, 1.0));
    float canvasParticleScale = metal::clamp(minSize / 640.0, 0.22, 1.0);
    float pointPixels = metal::max(0.6, u.particleSize)
                      * (1.5 + u.particleBloom * 2.5)
                      * (0.92 + position.z * 0.18)
                      * canvasParticleScale;
    metal::float2 corner = corners[vertexIndex];
    metal::float2 pointOffset = corner * pointPixels * 2.0
                              / metal::max(u.size, metal::float2(1.0));

    float colorPhase = uCoord * 0.32 + layer * 0.19 + phase * 0.025
                     + position.z * 0.08;
    float stripEdge = metal::smoothstep(0.58, 1.0, metal::abs(strip));
    float front = metal::clamp(0.78 + position.z * 0.54, 0.5, 1.24);
    float baseOpacity = metal::mix(0.025, 0.009,
        metal::clamp(u.shade / 1.5, 0.0, 1.0));

    ribbon_vs_mainOutput out;
    out.pos = active
        ? metal::float4(clip + pointOffset,
                        metal::clamp(0.5 - position.z * 0.12, 0.05, 0.95), 1.0)
        : metal::float4(2.0, 2.0, 1.0, 1.0);
    out.local = corner;
    out.color = metal::pow(
        metal::mix(prPalette(colorPhase, u), u.highlightColor.xyz, stripEdge * 0.56),
        metal::float3(0.72)) * front;
    out.opacity = active
        ? baseOpacity
            * (0.72 + stripEdge * 1.28)
            * arcEnvelope
            * metal::pow(canvasParticleScale, 1.35)
        : 0.0;
    return out;
}

struct ribbon_fs_mainOutput {
    metal::float4 color [[color(0)]];
};

fragment ribbon_fs_mainOutput ribbon_fs_main(
    ribbon_vs_mainOutput in [[stage_in]],
    constant Uniforms& u [[buffer(0)]]
) {
    float distanceSquared = metal::dot(in.local, in.local);
    if (distanceSquared > 1.0) discard_fragment();
    float core = metal::exp(-distanceSquared * 4.8);
    float halo = metal::exp(-distanceSquared * 1.35);
    float bloom = metal::clamp(u.particleBloom, 0.0, 2.0);
    float intensity = in.opacity * (core * 1.9 + halo * bloom * 0.72)
                    * metal::max(u.exposure, 0.0);
    float glowMix = metal::clamp((halo - core * 0.45)
        * (0.18 + u.edgeGlow * 0.5), 0.0, 0.7);
    metal::float3 color = metal::mix(in.color, u.glowColor.xyz, glowMix);
    float alpha = metal::clamp(intensity, 0.0, 1.0);
    return ribbon_fs_mainOutput { metal::float4(color * alpha, alpha) };
}

metal::float2 prTextureUvFromOrb(
    metal::float2 p,
    float contourRad,
    constant Uniforms& u
) {
    float minSize = metal::max(metal::min(u.size.x, u.size.y), 1.0);
    metal::float2 fc = (p * contourRad * minSize + u.size) * 0.5;
    return metal::clamp(
        metal::float2(
            fc.x / metal::max(u.size.x, 1.0),
            1.0 - fc.y / metal::max(u.size.y, 1.0)),
        metal::float2(0.0),
        metal::float2(1.0));
}

struct ribbon_composite_fs_mainOutput {
    metal::float4 color [[color(0)]];
};

fragment ribbon_composite_fs_mainOutput ribbon_composite_fs_main(
    fs_mainInput in [[stage_in]],
    metal::float4 position [[position]],
    constant Uniforms& u [[buffer(0)]],
    metal::texture2d<float> ribbonTexture [[texture(0)]]
) {
    constexpr metal::sampler ribbonSampler(
        metal::coord::normalized,
        metal::address::clamp_to_edge,
        metal::filter::linear);
    metal::float4 direct = ribbonTexture.sample(ribbonSampler, in.uv);
    if (u.glassEnabled <= 0.5) {
        return ribbon_composite_fs_mainOutput { direct };
    }

    metal::float2 fc = metal::float2(in.uv.x, 1.0 - in.uv.y) * u.size;
    float minSize = metal::max(metal::min(u.size.x, u.size.y), 1.0);
    metal::float2 uv = (2.0 * fc - u.size) / minSize;
    float rad = metal::max(u.radius, 0.05);
    float t = u.time * u.speed;
    float contourRad = rad * glsContourScale(uv, t, u.contourDeform, u);
    metal::float4 shell = orbGlassLiquidAnim(in.uv, u);
    if (metal::length(uv) > contourRad * (1.01 + mfEdgeD(u.edgeSoftness))) {
        return ribbon_composite_fs_mainOutput { shell };
    }

    metal::float2 p = uv / contourRad;
    float pd = metal::length(p);
    float clearFa = 1.0 - metal::smoothstep(GL_CLEAR_EA, GL_CLEAR_EB, pd);
    metal::float2 normal = glsContourNormal(uv, rad, t, u.contourDeform, u);
    float edgeDepth = metal::max(1.0 - pd, 0.0);
    float refractionWidth = 0.015 + 0.95 * metal::clamp(u.shellMidAlpha, 0.0, 1.0);
    float refractionT = edgeDepth / metal::max(refractionWidth, 0.001);
    float refractionProfile = metal::pow(glsRefractionProfile(refractionT), 0.68);
    float refractionAmount = 1.6 * metal::clamp(u.glassOpacity, 0.0, 1.0)
                           * refractionProfile;
    metal::float2 refractedP = p - normal * refractionAmount;
    float channelSplit = 0.14 * metal::clamp(u.gloss, 0.0, 2.0)
                       * metal::clamp(u.glassOpacity, 0.0, 1.0)
                       * refractionProfile;
    metal::float4 redSample = ribbonTexture.sample(
        ribbonSampler,
        prTextureUvFromOrb(refractedP - normal * channelSplit, contourRad, u));
    metal::float4 greenSample = ribbonTexture.sample(
        ribbonSampler,
        prTextureUvFromOrb(refractedP, contourRad, u));
    metal::float4 blueSample = ribbonTexture.sample(
        ribbonSampler,
        prTextureUvFromOrb(refractedP + normal * channelSplit, contourRad, u));
    float refractedAlpha = metal::max(
        redSample.w,
        metal::max(greenSample.w, blueSample.w)) * clearFa;
    metal::float4 refracted = metal::float4(
        metal::float3(redSample.x, greenSample.y, blueSample.z) * clearFa,
        refractedAlpha);
    return ribbon_composite_fs_mainOutput {
        metal::float4(
            shell.xyz + refracted.xyz * (1.0 - shell.w),
            shell.w + refracted.w * (1.0 - shell.w))
    };
}
`,Sy={siri:9,aurora:10,plasma:11,chrome:12,opal:13,spectrum:14,frost:15,voiceWave:19,blueDrop:20,violetEmber:21,chromaticMetal:22,refractiveBlob:23,particleRibbon:24,nebula:30,sonar:31};Object.keys(Sy);var Cy={glassEnabled:!0,speed:1,radius:.72,contourDeform:0,bandDensity:2,chromaticShift:.42,metalScale:.77,metalStretch:.23,metalAngle:65,metalOffset:0,metalPhase:0,metalEvolution:1,metalRoughness:.22,metalDepth:.25,particleDensity:.72,ribbonCount:5,ribbonWidth:.42,ribbonTwist:1.25,ribbonFold:.55,ribbonBreath:.3,particleSize:1.2,particleBloom:.7,zoom:.3,warp:3,ridgeAmt:.5,sharp:2.2,shade:.3,sheen:.36,gloss:.28,glassOpacity:.42,shellMidAlpha:.2,shellEdgeAlpha:.22,exposure:1,edgeSoftness:.005,edgeGlow:0,colorA:`#F7FBFF`,colorB:`#D6E8F7`,colorC:`#A8C8F0`,colorD:`#6F9EE8`,highlightColor:`#FFFFFF`,shellInner:`#FFFFFF`,shellMid:`#D6E8F7`,shellEdge:`#6F9EE8`,sheenColor:`#EAF4FF`,specColor:`#DCEAFF`,canvasColor:`#000000`,glowColor:`#6F9EE8`},wy={siri:{...Cy,speed:.82,zoom:.36,warp:3.2,ridgeAmt:.5,sharp:2.2,shade:.12,sheen:.28,gloss:.24,glassOpacity:.44,shellMidAlpha:.18,shellEdgeAlpha:.18,exposure:2,colorA:`#FFD86B`,colorB:`#82F4FF`,colorC:`#FF7BD5`,colorD:`#8E6CFF`,shellMid:`#9BF4FF`,shellEdge:`#C5A9FF`,canvasColor:`#030409`,glowColor:`#956CFF`},voiceWave:{...Cy,speed:.95,radius:.7,contourDeform:.1,zoom:.36,warp:2.6,ridgeAmt:.46,shade:.08,sheen:.22,gloss:.36,glassOpacity:.48,shellMidAlpha:.18,shellEdgeAlpha:.2,exposure:1.35,colorA:`#09030E`,colorB:`#CE2CCB`,colorC:`#FF5C71`,colorD:`#7B53FF`,highlightColor:`#FFD9F0`,shellMid:`#E48BFF`,shellEdge:`#FF7890`,sheenColor:`#FFF1FA`,specColor:`#E7D9FF`,canvasColor:`#020105`,glowColor:`#CE2CCB`},aurora:{...Cy,speed:3,contourDeform:.08,zoom:.4,warp:4.2,ridgeAmt:.62,sharp:2.1,shade:.18,exposure:1.18,colorA:`#030816`,colorB:`#20F0B6`,colorC:`#32A8FF`,colorD:`#A34BFF`,shellMid:`#32A8FF`,shellEdge:`#20F0B6`,canvasColor:`#010207`,glowColor:`#20F0B6`},plasma:{...Cy,speed:1.32,contourDeform:.05,zoom:.55,warp:5.4,ridgeAmt:.78,sharp:4.2,shade:.16,exposure:1.25,colorA:`#06020E`,colorB:`#0099FF`,colorC:`#258BFF`,colorD:`#1375FF`,shellInner:`#FFFFFF`,shellMid:`#1951C2`,shellEdge:`#00E9FF`,sheenColor:`#EAF4FF`,specColor:`#DCEAFF`,canvasColor:`#020105`,glowColor:`#0099FF`},chrome:{...Cy,speed:2,zoom:.36,warp:3.8,ridgeAmt:.44,sharp:5.2,shade:.58,exposure:1.08,colorA:`#FFFFFF`,colorB:`#B9C0CA`,colorC:`#343A43`,colorD:`#030405`,shellMid:`#B9C0CA`,shellEdge:`#FFFFFF`,canvasColor:`#050608`,glowColor:`#FFFFFF`},opal:{...Cy,speed:1.5,zoom:.3,warp:2.8,ridgeAmt:.36,sharp:2,shade:.1,sheen:.3,gloss:.26,glassOpacity:.38,shellMidAlpha:.2,shellEdgeAlpha:.2,exposure:1.12,colorA:`#FFF6E8`,colorB:`#6EF2CF`,colorC:`#FF91D8`,colorD:`#756BFF`,shellMid:`#CDE5FF`,shellEdge:`#D9C8FF`,canvasColor:`#07080D`,glowColor:`#9E8CFF`},spectrum:{...Cy,speed:1.8,contourDeform:.03,zoom:.46,warp:4.4,ridgeAmt:.72,shade:.06,sheen:.26,gloss:.24,glassOpacity:.4,shellMidAlpha:.18,shellEdgeAlpha:.18,exposure:1.5,colorA:`#FFFFFF`,colorB:`#1677FF`,colorC:`#F249A0`,colorD:`#35E6B2`,shellMid:`#66E8FF`,shellEdge:`#D26CFF`,canvasColor:`#03040A`,glowColor:`#1677FF`},frost:{...Cy,speed:2.22,contourDeform:.04,zoom:.36,warp:3.7,ridgeAmt:.45,sharp:2.05,shade:.3,sheen:.34,gloss:.28,glassOpacity:.42,shellMidAlpha:.2,shellEdgeAlpha:.22,exposure:1,colorA:`#F7FBFF`,colorB:`#D6E8F7`,colorC:`#A8C8F0`,colorD:`#6F9EE8`,shellMid:`#D6E8F7`,shellEdge:`#6F9EE8`,canvasColor:`#000000`,glowColor:`#6F9EE8`},blueDrop:{...Cy,speed:.9,radius:.74,contourDeform:.08,zoom:.48,warp:2.65,ridgeAmt:.42,sharp:2.4,shade:.16,sheen:.22,gloss:.42,glassOpacity:.66,shellMidAlpha:.32,shellEdgeAlpha:.24,exposure:1.24,colorA:`#020B1D`,colorB:`#0756B8`,colorC:`#1EC8FF`,colorD:`#DDFBFF`,highlightColor:`#EAFBFF`,shellInner:`#F6FDFF`,shellMid:`#4FD7FF`,shellEdge:`#466DFF`,sheenColor:`#DDFBFF`,specColor:`#A8D9FF`,canvasColor:`#010207`,glowColor:`#168DFF`},violetEmber:{...Cy,speed:1.12,radius:.72,contourDeform:.04,zoom:.58,warp:4.7,ridgeAmt:.73,sharp:3.3,shade:.18,sheen:.2,gloss:.34,glassOpacity:.62,shellMidAlpha:.28,shellEdgeAlpha:.24,exposure:1.28,colorA:`#100016`,colorB:`#4A0E8F`,colorC:`#A52EFF`,colorD:`#F1A7FF`,highlightColor:`#FFD6FF`,shellInner:`#FCF5FF`,shellMid:`#C257FF`,shellEdge:`#6C2DFF`,sheenColor:`#F8E6FF`,specColor:`#D4B7FF`,canvasColor:`#030006`,glowColor:`#A52EFF`},refractiveBlob:{...Cy,speed:.76,radius:.73,contourDeform:.16,zoom:.46,warp:3.65,ridgeAmt:.58,sharp:2.7,shade:.14,sheen:.14,gloss:.52,glassOpacity:.82,shellMidAlpha:.42,shellEdgeAlpha:.2,exposure:1.2,colorA:`#1B102B`,colorB:`#7056A8`,colorC:`#BFA5F5`,colorD:`#F1E8FF`,highlightColor:`#FFFFFF`,shellInner:`#F6F0FF`,shellMid:`#D9C7FF`,shellEdge:`#B59AE8`,sheenColor:`#FFFFFF`,specColor:`#E9DEFF`,canvasColor:`#050208`,glowColor:`#B18CFF`},particleRibbon:{...Cy,glassEnabled:!0,speed:.72,radius:.66,particleDensity:1,ribbonCount:4,ribbonWidth:.48,ribbonTwist:1.15,ribbonFold:.6,ribbonBreath:.38,particleSize:1.12,particleBloom:1.22,shade:.12,sheen:.28,gloss:.24,glassOpacity:.44,shellMidAlpha:.18,shellEdgeAlpha:.18,exposure:1.48,colorA:`#63F1FF`,colorB:`#4A9DFF`,colorC:`#8566FF`,colorD:`#F15DE1`,highlightColor:`#F5FBFF`,shellInner:`#FFFFFF`,shellMid:`#9BF4FF`,shellEdge:`#C5A9FF`,sheenColor:`#EAF4FF`,specColor:`#DCEAFF`,canvasColor:`#010208`,glowColor:`#765CFF`},chromaticMetal:{...Cy,speed:1.12,radius:.72,bandDensity:2,chromaticShift:.42,metalScale:.77,metalStretch:.23,metalAngle:65,metalOffset:0,metalPhase:0,metalEvolution:1,metalRoughness:.16,metalDepth:.38,shade:.1,sheen:.14,gloss:.46,glassOpacity:.54,shellMidAlpha:.2,shellEdgeAlpha:.16,exposure:1.08,colorA:`#FBFCFB`,colorB:`#7F8683`,colorC:`#D6DAD8`,colorD:`#33373A`,highlightColor:`#FFFFFF`,shellInner:`#F7FCFF`,shellMid:`#6EDCFF`,shellEdge:`#FF806D`,sheenColor:`#F7FCFF`,specColor:`#D9F3FF`,canvasColor:`#050606`,glowColor:`#BDEFFF`}},Ty={nebula:{...Cy,style:`nebula`,speed:.7,zoom:.34,warp:2.6,ridgeAmt:.55,sharp:1.6,shade:.1,sheen:.26,gloss:.3,glassOpacity:.5,shellMidAlpha:.22,shellEdgeAlpha:.2,exposure:1.15,colorA:`#04030C`,colorB:`#3B1C6E`,colorC:`#E2508C`,colorD:`#FFD9A0`,highlightColor:`#FFF4E0`,shellMid:`#B48CFF`,shellEdge:`#FF8FB1`,canvasColor:`#020108`,glowColor:`#8A4DFF`},sonar:{...Cy,style:`sonar`,speed:.9,zoom:.3,warp:1.4,bandDensity:1.6,ridgeAmt:.5,sharp:1.4,shade:.14,sheen:.24,gloss:.32,glassOpacity:.48,shellMidAlpha:.2,shellEdgeAlpha:.2,exposure:1.25,colorA:`#010A08`,colorB:`#06402F`,colorC:`#19C98A`,colorD:`#C8FFE6`,highlightColor:`#E6FFF4`,shellMid:`#5CFFC1`,shellEdge:`#38B6FF`,canvasColor:`#010604`,glowColor:`#19C98A`},harbor:{...Cy,...wy.blueDrop,style:`blueDrop`,speed:.8,colorA:`#01100F`,colorB:`#0B4F5C`,colorC:`#2FB7B0`,colorD:`#F2D59A`,highlightColor:`#FFF3D6`,shellMid:`#5FE3D6`,shellEdge:`#E0B565`,sheenColor:`#FFF6E3`,canvasColor:`#010807`,glowColor:`#2FB7B0`},ember:{...Cy,...wy.violetEmber,style:`violetEmber`,speed:1,colorA:`#120300`,colorB:`#7A1405`,colorC:`#FF5A1F`,colorD:`#FFD27A`,highlightColor:`#FFE7C2`,shellInner:`#FFF6EC`,shellMid:`#FF8A3D`,shellEdge:`#FF3D3D`,sheenColor:`#FFF0DE`,specColor:`#FFD2B0`,canvasColor:`#060100`,glowColor:`#FF5A1F`}},Ey=[`siri`,`voiceWave`,`particleRibbon`,`blueDrop`,`violetEmber`,`refractiveBlob`,`chromaticMetal`,`aurora`,`frost`,`chrome`,`opal`,`spectrum`,`plasma`],Dy={siri:`Siri Wave`,voiceWave:`Voice Membrane`,particleRibbon:`Particle Ribbons`,blueDrop:`Crystal Drop`,violetEmber:`Violet Ember`,refractiveBlob:`Refractive Gel`,chromaticMetal:`Chromatic Metal`,aurora:`Aurora Veil`,frost:`Frost Flow`,chrome:`Liquid Chrome`,opal:`Iridescent Opal`,spectrum:`Prismatic Field`,plasma:`Neural Plasma`,nebula:`Nebula`,sonar:`Sonar`,harbor:`Harbor`,ember:`Ember`},Oy=new Map;for(let e of Object.keys(Ty))Oy.set(e,{name:e,label:Dy[e]??e,origin:`glimmer`,params:Ty[e]});for(let e of Ey)Oy.set(e,{name:e,label:Dy[e],origin:`orb`,params:{style:e,...wy[e]}});function ky(e){return Oy.get(e)}var Ay=`siri`,jy={min:.3,max:.95},My={glassEnabled:!0,speed:1,radius:.72,contourDeform:0,bandDensity:2,chromaticShift:.42,metalScale:.77,metalStretch:.23,metalAngle:65,metalOffset:0,metalPhase:0,metalEvolution:1,metalRoughness:.22,metalDepth:.25,particleDensity:.72,ribbonCount:5,ribbonWidth:.42,ribbonTwist:1.25,ribbonFold:.55,ribbonBreath:.3,particleSize:1.2,particleBloom:.7,zoom:.3,warp:3,ridgeAmt:.5,sharp:2.2,shade:.3,sheen:.36,gloss:.28,glassOpacity:.42,shellMidAlpha:.2,shellEdgeAlpha:.22,exposure:1,edgeSoftness:.005,edgeGlow:0,colorA:`#F7FBFF`,colorB:`#D6E8F7`,colorC:`#A8C8F0`,colorD:`#6F9EE8`,highlightColor:`#FFFFFF`,shellInner:`#FFFFFF`,shellMid:`#D6E8F7`,shellEdge:`#6F9EE8`,sheenColor:`#EAF4FF`,specColor:`#DCEAFF`,canvasColor:`#000000`,glowColor:`#6F9EE8`};function Ny(e){let t=ky(e);if(!t)throw Error(`Glimmer preset missing: ${e}`);let{style:n,...r}=t.params;return r}var Py={siri:{...My,speed:.82,zoom:.36,warp:3.2,ridgeAmt:.5,sharp:2.2,shade:.12,sheen:.28,gloss:.24,glassOpacity:.44,shellMidAlpha:.18,shellEdgeAlpha:.18,exposure:2,colorA:`#FFD86B`,colorB:`#82F4FF`,colorC:`#FF7BD5`,colorD:`#8E6CFF`,shellMid:`#9BF4FF`,shellEdge:`#C5A9FF`,canvasColor:`#030409`,glowColor:`#956CFF`},voiceWave:{...My,speed:.95,radius:.7,contourDeform:.1,zoom:.36,warp:2.6,ridgeAmt:.46,shade:.08,sheen:.22,gloss:.36,glassOpacity:.48,shellMidAlpha:.18,shellEdgeAlpha:.2,exposure:1.35,colorA:`#09030E`,colorB:`#CE2CCB`,colorC:`#FF5C71`,colorD:`#7B53FF`,highlightColor:`#FFD9F0`,shellMid:`#E48BFF`,shellEdge:`#FF7890`,sheenColor:`#FFF1FA`,specColor:`#E7D9FF`,canvasColor:`#020105`,glowColor:`#CE2CCB`},aurora:{...My,speed:3,contourDeform:.08,zoom:.4,warp:4.2,ridgeAmt:.62,sharp:2.1,shade:.18,exposure:1.18,colorA:`#030816`,colorB:`#20F0B6`,colorC:`#32A8FF`,colorD:`#A34BFF`,shellMid:`#32A8FF`,shellEdge:`#20F0B6`,canvasColor:`#010207`,glowColor:`#20F0B6`},plasma:{...My,speed:1.32,contourDeform:.05,zoom:.55,warp:5.4,ridgeAmt:.78,sharp:4.2,shade:.16,exposure:1.25,colorA:`#06020E`,colorB:`#0099FF`,colorC:`#258BFF`,colorD:`#1375FF`,shellInner:`#FFFFFF`,shellMid:`#1951C2`,shellEdge:`#00E9FF`,sheenColor:`#EAF4FF`,specColor:`#DCEAFF`,canvasColor:`#020105`,glowColor:`#0099FF`},chrome:{...My,speed:2,zoom:.36,warp:3.8,ridgeAmt:.44,sharp:5.2,shade:.58,exposure:1.08,colorA:`#FFFFFF`,colorB:`#B9C0CA`,colorC:`#343A43`,colorD:`#030405`,shellMid:`#B9C0CA`,shellEdge:`#FFFFFF`,canvasColor:`#050608`,glowColor:`#FFFFFF`},opal:{...My,speed:1.5,zoom:.3,warp:2.8,ridgeAmt:.36,sharp:2,shade:.1,sheen:.3,gloss:.26,glassOpacity:.38,shellMidAlpha:.2,shellEdgeAlpha:.2,exposure:1.12,colorA:`#FFF6E8`,colorB:`#6EF2CF`,colorC:`#FF91D8`,colorD:`#756BFF`,shellMid:`#CDE5FF`,shellEdge:`#D9C8FF`,canvasColor:`#07080D`,glowColor:`#9E8CFF`},spectrum:{...My,speed:1.8,contourDeform:.03,zoom:.46,warp:4.4,ridgeAmt:.72,shade:.06,sheen:.26,gloss:.24,glassOpacity:.4,shellMidAlpha:.18,shellEdgeAlpha:.18,exposure:1.5,colorA:`#FFFFFF`,colorB:`#1677FF`,colorC:`#F249A0`,colorD:`#35E6B2`,shellMid:`#66E8FF`,shellEdge:`#D26CFF`,canvasColor:`#03040A`,glowColor:`#1677FF`},frost:{...My,speed:2.22,contourDeform:.04,zoom:.36,warp:3.7,ridgeAmt:.45,sharp:2.05,shade:.3,sheen:.34,gloss:.28,glassOpacity:.42,shellMidAlpha:.2,shellEdgeAlpha:.22,exposure:1,colorA:`#F7FBFF`,colorB:`#D6E8F7`,colorC:`#A8C8F0`,colorD:`#6F9EE8`,shellMid:`#D6E8F7`,shellEdge:`#6F9EE8`,canvasColor:`#000000`,glowColor:`#6F9EE8`},blueDrop:{...My,speed:.9,radius:.74,contourDeform:.08,zoom:.48,warp:2.65,ridgeAmt:.42,sharp:2.4,shade:.16,sheen:.22,gloss:.42,glassOpacity:.66,shellMidAlpha:.32,shellEdgeAlpha:.24,exposure:1.24,colorA:`#020B1D`,colorB:`#0756B8`,colorC:`#1EC8FF`,colorD:`#DDFBFF`,highlightColor:`#EAFBFF`,shellInner:`#F6FDFF`,shellMid:`#4FD7FF`,shellEdge:`#466DFF`,sheenColor:`#DDFBFF`,specColor:`#A8D9FF`,canvasColor:`#010207`,glowColor:`#168DFF`},violetEmber:{...My,speed:1.12,radius:.72,contourDeform:.04,zoom:.58,warp:4.7,ridgeAmt:.73,sharp:3.3,shade:.18,sheen:.2,gloss:.34,glassOpacity:.62,shellMidAlpha:.28,shellEdgeAlpha:.24,exposure:1.28,colorA:`#100016`,colorB:`#4A0E8F`,colorC:`#A52EFF`,colorD:`#F1A7FF`,highlightColor:`#FFD6FF`,shellInner:`#FCF5FF`,shellMid:`#C257FF`,shellEdge:`#6C2DFF`,sheenColor:`#F8E6FF`,specColor:`#D4B7FF`,canvasColor:`#030006`,glowColor:`#A52EFF`},refractiveBlob:{...My,speed:.76,radius:.73,contourDeform:.16,zoom:.46,warp:3.65,ridgeAmt:.58,sharp:2.7,shade:.14,sheen:.14,gloss:.52,glassOpacity:.82,shellMidAlpha:.42,shellEdgeAlpha:.2,exposure:1.2,colorA:`#1B102B`,colorB:`#7056A8`,colorC:`#BFA5F5`,colorD:`#F1E8FF`,highlightColor:`#FFFFFF`,shellInner:`#F6F0FF`,shellMid:`#D9C7FF`,shellEdge:`#B59AE8`,sheenColor:`#FFFFFF`,specColor:`#E9DEFF`,canvasColor:`#050208`,glowColor:`#B18CFF`},particleRibbon:{...My,glassEnabled:!0,speed:.72,radius:.66,particleDensity:1,ribbonCount:4,ribbonWidth:.48,ribbonTwist:1.15,ribbonFold:.6,ribbonBreath:.38,particleSize:1.12,particleBloom:1.22,shade:.12,sheen:.28,gloss:.24,glassOpacity:.44,shellMidAlpha:.18,shellEdgeAlpha:.18,exposure:1.48,colorA:`#63F1FF`,colorB:`#4A9DFF`,colorC:`#8566FF`,colorD:`#F15DE1`,highlightColor:`#F5FBFF`,shellInner:`#FFFFFF`,shellMid:`#9BF4FF`,shellEdge:`#C5A9FF`,sheenColor:`#EAF4FF`,specColor:`#DCEAFF`,canvasColor:`#010208`,glowColor:`#765CFF`},chromaticMetal:{...My,speed:1.12,radius:.72,bandDensity:2,chromaticShift:.42,metalScale:.77,metalStretch:.23,metalAngle:65,metalOffset:0,metalPhase:0,metalEvolution:1,metalRoughness:.16,metalDepth:.38,shade:.1,sheen:.14,gloss:.46,glassOpacity:.54,shellMidAlpha:.2,shellEdgeAlpha:.16,exposure:1.08,colorA:`#FBFCFB`,colorB:`#7F8683`,colorC:`#D6DAD8`,colorD:`#33373A`,highlightColor:`#FFFFFF`,shellInner:`#F7FCFF`,shellMid:`#6EDCFF`,shellEdge:`#FF806D`,sheenColor:`#F7FCFF`,specColor:`#D9F3FF`,canvasColor:`#050606`,glowColor:`#BDEFFF`},nebula:Ny(`nebula`),sonar:Ny(`sonar`),harbor:Ny(`harbor`),ember:Ny(`ember`)},Fy=[`nebula`,`sonar`,`harbor`,`ember`],Iy=[`siri`,`voiceWave`,`particleRibbon`,`blueDrop`,`violetEmber`,`refractiveBlob`,`chromaticMetal`,`aurora`,`frost`,`chrome`,`opal`,`spectrum`,`plasma`,...Fy],Ly={siri:9,voiceWave:19,aurora:10,plasma:11,chrome:12,opal:13,spectrum:14,frost:15,blueDrop:20,violetEmber:21,refractiveBlob:23,particleRibbon:24,chromaticMetal:22,nebula:30,sonar:31,harbor:20,ember:21},Ry=Object.fromEntries(Iy.map(e=>[e,ky(e)?.params.style??e])),zy={style:`siri`,...Py.siri};({...zy});for(let e of Iy)if(!Number.isInteger(Ly[e]))throw Error(`预设缺少流场映射：${e}`);var By=[`#F7FBFF`,`#EFF6FD`,`#E0EEF9`,`#D4E6F7`,`#BBD5F3`,`#A6C7F0`,`#87B0EB`,`#6F9EE8`,`#6F9EE8`,`#6F9EE8`,`#6F9EE8`,`#6F9EE8`];function Vy(e){let t=e.slice(1);return[Number.parseInt(t.slice(0,2),16)/255,Number.parseInt(t.slice(2,4),16)/255,Number.parseInt(t.slice(4,6),16)/255,1]}function Hy(e,t,n,r,i){e.fill(0),e[0]=t,e[1]=n,e[2]=r,e.set([i.speed,i.radius,i.zoom,i.warp,i.ridgeAmt,i.sharp,i.shade,i.sheen,i.gloss,i.shellMidAlpha,i.shellEdgeAlpha,i.exposure,Ly[i.style],i.edgeSoftness,i.edgeGlow,0,+!!i.glassEnabled,i.glassOpacity,i.contourDeform,i.bandDensity,i.chromaticShift,i.metalScale,i.metalStretch,i.metalAngle,i.metalOffset,i.metalPhase,i.metalEvolution,i.metalRoughness,i.metalDepth,i.particleDensity,i.ribbonCount,i.ribbonWidth,i.ribbonTwist,i.ribbonFold,i.ribbonBreath,i.particleSize,i.particleBloom],3),[i.colorA,i.colorB,i.colorC,i.colorD,i.highlightColor,i.shellInner,i.shellMid,i.shellEdge,i.sheenColor,i.specColor,i.canvasColor,i.glowColor,...By].forEach((t,n)=>e.set(Vy(t),40+n*4))}function Uy(e){let t=new Float32Array(136);return Hy(t,1,1,0,e),Array.from(t)}var Wy=221184,Gy=[`idle`,`thinking`,`success`,`error`],Ky=[`speed`,`contourDeform`,`bandDensity`,`chromaticShift`,`metalStretch`,`metalEvolution`,`metalRoughness`,`metalDepth`,`ribbonWidth`,`ribbonTwist`,`ribbonFold`,`ribbonBreath`,`zoom`,`warp`,`ridgeAmt`,`sharp`,`shade`,`exposure`,`edgeGlow`],qy=[`colorA`,`colorB`,`colorC`,`colorD`,`highlightColor`,`glowColor`],Jy={siri:{numeric:{speed:{scale:.3},contourDeform:{scale:.3},zoom:{scale:.94},warp:{scale:.52},ridgeAmt:{scale:.48},sharp:{scale:.9},exposure:{scale:.68}},colors:{colorA:`#B5A674`,colorB:`#5E8794`,colorC:`#9A648A`,colorD:`#635B8A`,highlightColor:`#B6C4D2`,glowColor:`#6C688F`}},voiceWave:{numeric:{speed:{scale:.28},contourDeform:{scale:.3},zoom:{scale:.92},warp:{scale:.46},ridgeAmt:{scale:.42},exposure:{scale:.62}},colors:{colorA:`#08050B`,colorB:`#6A2F69`,colorC:`#8C4652`,colorD:`#55467F`,highlightColor:`#B58AA5`,glowColor:`#6C3E72`}},blueDrop:{numeric:{speed:{scale:.3},contourDeform:{scale:.35},zoom:{scale:.93},warp:{scale:.5},ridgeAmt:{scale:.46},sharp:{scale:.82},exposure:{scale:.66}},colors:{colorA:`#020812`,colorB:`#0A2C5A`,colorC:`#24678A`,colorD:`#A4C3CA`,highlightColor:`#9FC8D5`,glowColor:`#1F5076`}},violetEmber:{numeric:{speed:{scale:.28},contourDeform:{scale:.3},zoom:{scale:.92},warp:{scale:.46},ridgeAmt:{scale:.42},sharp:{scale:.78},exposure:{scale:.64}},colors:{colorA:`#0B0310`,colorB:`#2B1748`,colorC:`#593078`,colorD:`#9B78A8`,highlightColor:`#BCA6C2`,glowColor:`#593273`}},refractiveBlob:{numeric:{speed:{scale:.3},contourDeform:{scale:.32},zoom:{scale:.94},warp:{scale:.5},ridgeAmt:{scale:.44},sharp:{scale:.82},exposure:{scale:.68}},colors:{colorA:`#0F0B16`,colorB:`#403552`,colorC:`#776990`,colorD:`#AEA4BD`,highlightColor:`#C9C4D1`,glowColor:`#6E6185`}},particleRibbon:{numeric:{speed:{scale:.28},ribbonWidth:{scale:.62},ribbonTwist:{scale:.42},ribbonFold:{scale:.35},ribbonBreath:{scale:.18},exposure:{scale:.68}},colors:{colorA:`#3A6068`,colorB:`#375D78`,colorC:`#594E83`,colorD:`#854C7A`,highlightColor:`#B9CCD1`,glowColor:`#514C78`}},chromaticMetal:{numeric:{speed:{scale:.3},bandDensity:{scale:.62},chromaticShift:{scale:.35},metalStretch:{scale:.48},metalEvolution:{scale:.32},metalRoughness:{scale:1.35},metalDepth:{scale:.55},exposure:{scale:.72}},colors:{colorA:`#B8BCBA`,colorB:`#666B69`,colorC:`#9EA3A1`,colorD:`#282B2D`,highlightColor:`#D1D5D3`,glowColor:`#78898F`}},aurora:{numeric:{speed:{scale:.22},contourDeform:{scale:.3},zoom:{scale:.92},warp:{scale:.42},ridgeAmt:{scale:.38},sharp:{scale:.85},exposure:{scale:.62}},colors:{colorA:`#02050C`,colorB:`#1D6659`,colorC:`#285D78`,colorD:`#533E75`,highlightColor:`#92B6B3`,glowColor:`#286A62`}},frost:{numeric:{speed:{scale:.26},contourDeform:{scale:.28},zoom:{scale:.94},warp:{scale:.5},ridgeAmt:{scale:.46},sharp:{scale:.78},exposure:{scale:.72}},colors:{colorA:`#C3CDD5`,colorB:`#9AABB8`,colorC:`#768D9E`,colorD:`#536985`,highlightColor:`#D6DEE5`,glowColor:`#697D91`}},chrome:{numeric:{speed:{scale:.28},contourDeform:{scale:.35},zoom:{scale:.92},warp:{scale:.48},sharp:{scale:.74},exposure:{scale:.72}},colors:{colorA:`#A7AAA9`,colorB:`#6E7273`,colorC:`#363A3D`,colorD:`#101213`,highlightColor:`#CBCFCE`,glowColor:`#747A7B`}},opal:{numeric:{speed:{scale:.3},contourDeform:{scale:.32},zoom:{scale:.94},warp:{scale:.52},ridgeAmt:{scale:.48},exposure:{scale:.68}},colors:{colorA:`#C9C3BC`,colorB:`#6E9E91`,colorC:`#A17496`,colorD:`#68608E`,highlightColor:`#E1DCD5`,glowColor:`#82799B`}},spectrum:{numeric:{speed:{scale:.27},contourDeform:{scale:.3},zoom:{scale:.92},warp:{scale:.44},ridgeAmt:{scale:.38},exposure:{scale:.62}},colors:{colorA:`#B4BBC2`,colorB:`#285D8F`,colorC:`#91506F`,colorD:`#3F8873`,highlightColor:`#D8DDE1`,glowColor:`#386789`}},plasma:{numeric:{speed:{scale:.26},contourDeform:{scale:.28},zoom:{scale:.9},warp:{scale:.42},ridgeAmt:{scale:.36},sharp:{scale:.68},exposure:{scale:.6}},colors:{colorA:`#04020A`,colorB:`#084772`,colorC:`#1C5790`,colorD:`#174B84`,highlightColor:`#A5BBD0`,glowColor:`#14577F`}}};function Yy(e){if(!/^#[0-9a-f]{6}$/i.test(e))throw Error(`Glimmer: invalid colour ${e}`);return[Number.parseInt(e.slice(1,3),16)/255,Number.parseInt(e.slice(3,5),16)/255,Number.parseInt(e.slice(5,7),16)/255]}var Xy=e=>e<=.04045?e/12.92:((e+.055)/1.055)**2.4,Zy=e=>e<=.0031308?e*12.92:1.055*e**(1/2.4)-.055;function Qy(e){return`#${e.map(e=>Math.min(255,Math.max(0,Math.round(Zy(Math.min(1,Math.max(0,e)))*255)))).map(e=>e.toString(16).padStart(2,`0`)).join(``)}`.toUpperCase()}function $y(e,t,n){if(n<=0)return e;if(n>=1)return t;let r=Yy(e).map(Xy),i=Yy(t).map(Xy);return Qy(r.map((e,t)=>e+(i[t]-e)*n))}var eb=e=>e[0]*.2126+e[1]*.7152+e[2]*.0722;function tb(e,t,n){let r=Yy(e).map(Xy),i=eb(r);return Qy(r.map(e=>(e+(i-e)*t)*n))}var nb={speed:{scale:.28},contourDeform:{scale:.3},zoom:{scale:.94},warp:{scale:.5},ridgeAmt:{scale:.45},sharp:{scale:.85},exposure:{scale:.68},bandDensity:{scale:.8},ribbonWidth:{scale:.62},ribbonTwist:{scale:.42},ribbonFold:{scale:.35},ribbonBreath:{scale:.18}};function rb(e,t){for(let[n,r]of Object.entries(t))e[n]=e[n]*r.scale+(r.offset??0)}function ib(e){return e in Jy}function ab(e,t){return t?qy.every(n=>e[n].toUpperCase()===t[n].toUpperCase()):!1}function ob(e,t){let n={...e};if(ib(e.style)){let r=Jy[e.style];if(rb(n,r.numeric),ab(e,t)){for(let e of qy)n[e]=r.colors[e];return n}}else rb(n,nb);for(let t of qy)n[t]=tb(e[t],.45,.42);return n}var sb={colorA:`#0FD48A`,colorB:`#2EE6C9`,colorC:`#9CFFB8`,colorD:`#0A7F62`,highlightColor:`#EFFFF6`,glowColor:`#22E39A`},cb={colorA:`#FF3B3B`,colorB:`#FF7A45`,colorC:`#FF2E55`,colorD:`#B3122E`,highlightColor:`#FFE1DA`,glowColor:`#FF4545`};function lb(e,t,n,r=1){let i=Yy(e).map(Xy),a=Yy(t).map(Xy),o=eb(i)*r/Math.max(eb(a),1e-5),s=a.map(e=>e*o),c=Math.max(...s);return c>1&&(s=s.map(e=>e/c)),Qy(i.map((e,t)=>e+(s[t]-e)*n))}function ub(e,t,n,r,i){for(let a of qy)e[a]=a===`glowColor`?$y(t[a],n[a],.9):lb(t[a],n[a],r,i)}function db(e){let t={...e};return t.speed*=.55,t.exposure*=1.08,t.warp*=.8,t.edgeGlow=Math.max(t.edgeGlow,.12),ub(t,e,sb,.82,1.12),t}function fb(e){let t={...e};return t.speed*=.42,t.contourDeform=Math.min(1,t.contourDeform+.35),t.warp*=1.15,t.edgeGlow=Math.max(t.edgeGlow,.18),ub(t,e,cb,.86,1.05),t}function pb(e,t){let n={...e.params,...e.overrides?.thinking},r={thinking:n,idle:ob(n,t),success:db(n),error:fb(n)};for(let t of Gy){let n=e.overrides?.[t];t!==`thinking`&&n&&(r[t]={...r[t],...n})}return r}var mb=e=>{let t=Math.min(1,Math.max(0,e));return t*t*(3-2*t)},hb=e=>1-(1-Math.min(1,Math.max(0,e)))**3;function gb(e,t,n){let r=Math.min(1,Math.max(0,n));if(r===0)return{...e};if(r===1)return{...t};let i={...t};for(let n of Ky)i[n]=e[n]+(t[n]-e[n])*r;for(let n of qy)i[n]=$y(e[n],t[n],r);return i}var _b=class{constructor(e,t){this.startedAt=0,this.duration=0,this.from={...e},this.to={...e},this.target=t}get state(){return this.target}go(e,t,n,r){this.from=this.sample(r),this.to={...t},this.target=e,this.startedAt=r,this.duration=Math.max(0,n*1e3)}retarget(e){this.to={...e}}sample(e){if(this.duration===0)return{...this.to};let t=(e-this.startedAt)/this.duration,n=this.target===`thinking`?hb(t):mb(t);return gb(this.from,this.to,n)}},vb=[`idle`,`thinking`,`success`,`error`],yb=[`speed`,`contourDeform`,`bandDensity`,`chromaticShift`,`metalStretch`,`metalEvolution`,`metalRoughness`,`metalDepth`,`ribbonWidth`,`ribbonTwist`,`ribbonFold`,`ribbonBreath`,`zoom`,`warp`,`ridgeAmt`,`sharp`,`shade`,`exposure`,`edgeGlow`],bb=[`colorA`,`colorB`,`colorC`,`colorD`,`highlightColor`,`glowColor`],xb=[...yb,...bb],Sb=`thinking`,Cb=.22,wb=.65,Tb={siri:{numeric:{speed:{scale:.3},contourDeform:{scale:.3},zoom:{scale:.94},warp:{scale:.52},ridgeAmt:{scale:.48},sharp:{scale:.9},exposure:{scale:.68}},colors:{colorA:`#B5A674`,colorB:`#5E8794`,colorC:`#9A648A`,colorD:`#635B8A`,highlightColor:`#B6C4D2`,glowColor:`#6C688F`}},voiceWave:{numeric:{speed:{scale:.28},contourDeform:{scale:.3},zoom:{scale:.92},warp:{scale:.46},ridgeAmt:{scale:.42},exposure:{scale:.62}},colors:{colorA:`#08050B`,colorB:`#6A2F69`,colorC:`#8C4652`,colorD:`#55467F`,highlightColor:`#B58AA5`,glowColor:`#6C3E72`}},blueDrop:{numeric:{speed:{scale:.3},contourDeform:{scale:.35},zoom:{scale:.93},warp:{scale:.5},ridgeAmt:{scale:.46},sharp:{scale:.82},exposure:{scale:.66}},colors:{colorA:`#020812`,colorB:`#0A2C5A`,colorC:`#24678A`,colorD:`#A4C3CA`,highlightColor:`#9FC8D5`,glowColor:`#1F5076`}},violetEmber:{numeric:{speed:{scale:.28},contourDeform:{scale:.3},zoom:{scale:.92},warp:{scale:.46},ridgeAmt:{scale:.42},sharp:{scale:.78},exposure:{scale:.64}},colors:{colorA:`#0B0310`,colorB:`#2B1748`,colorC:`#593078`,colorD:`#9B78A8`,highlightColor:`#BCA6C2`,glowColor:`#593273`}},refractiveBlob:{numeric:{speed:{scale:.3},contourDeform:{scale:.32},zoom:{scale:.94},warp:{scale:.5},ridgeAmt:{scale:.44},sharp:{scale:.82},exposure:{scale:.68}},colors:{colorA:`#0F0B16`,colorB:`#403552`,colorC:`#776990`,colorD:`#AEA4BD`,highlightColor:`#C9C4D1`,glowColor:`#6E6185`}},particleRibbon:{numeric:{speed:{scale:.28},ribbonWidth:{scale:.62},ribbonTwist:{scale:.42},ribbonFold:{scale:.35},ribbonBreath:{scale:.18},exposure:{scale:.68}},colors:{colorA:`#3A6068`,colorB:`#375D78`,colorC:`#594E83`,colorD:`#854C7A`,highlightColor:`#B9CCD1`,glowColor:`#514C78`}},chromaticMetal:{numeric:{speed:{scale:.3},bandDensity:{scale:.62},chromaticShift:{scale:.35},metalStretch:{scale:.48},metalEvolution:{scale:.32},metalRoughness:{scale:1.35},metalDepth:{scale:.55},exposure:{scale:.72}},colors:{colorA:`#B8BCBA`,colorB:`#666B69`,colorC:`#9EA3A1`,colorD:`#282B2D`,highlightColor:`#D1D5D3`,glowColor:`#78898F`}},aurora:{numeric:{speed:{scale:.22},contourDeform:{scale:.3},zoom:{scale:.92},warp:{scale:.42},ridgeAmt:{scale:.38},sharp:{scale:.85},exposure:{scale:.62}},colors:{colorA:`#02050C`,colorB:`#1D6659`,colorC:`#285D78`,colorD:`#533E75`,highlightColor:`#92B6B3`,glowColor:`#286A62`}},frost:{numeric:{speed:{scale:.26},contourDeform:{scale:.28},zoom:{scale:.94},warp:{scale:.5},ridgeAmt:{scale:.46},sharp:{scale:.78},exposure:{scale:.72}},colors:{colorA:`#C3CDD5`,colorB:`#9AABB8`,colorC:`#768D9E`,colorD:`#536985`,highlightColor:`#D6DEE5`,glowColor:`#697D91`}},chrome:{numeric:{speed:{scale:.28},contourDeform:{scale:.35},zoom:{scale:.92},warp:{scale:.48},sharp:{scale:.74},exposure:{scale:.72}},colors:{colorA:`#A7AAA9`,colorB:`#6E7273`,colorC:`#363A3D`,colorD:`#101213`,highlightColor:`#CBCFCE`,glowColor:`#747A7B`}},opal:{numeric:{speed:{scale:.3},contourDeform:{scale:.32},zoom:{scale:.94},warp:{scale:.52},ridgeAmt:{scale:.48},exposure:{scale:.68}},colors:{colorA:`#C9C3BC`,colorB:`#6E9E91`,colorC:`#A17496`,colorD:`#68608E`,highlightColor:`#E1DCD5`,glowColor:`#82799B`}},spectrum:{numeric:{speed:{scale:.27},contourDeform:{scale:.3},zoom:{scale:.92},warp:{scale:.44},ridgeAmt:{scale:.38},exposure:{scale:.62}},colors:{colorA:`#B4BBC2`,colorB:`#285D8F`,colorC:`#91506F`,colorD:`#3F8873`,highlightColor:`#D8DDE1`,glowColor:`#386789`}},plasma:{numeric:{speed:{scale:.26},contourDeform:{scale:.28},zoom:{scale:.9},warp:{scale:.42},ridgeAmt:{scale:.36},sharp:{scale:.68},exposure:{scale:.6}},colors:{colorA:`#04020A`,colorB:`#084772`,colorC:`#1C5790`,colorD:`#174B84`,highlightColor:`#A5BBD0`,glowColor:`#14577F`}}},Eb=new Set(xb);function Db(e){return Eb.has(e)}function Ob(e){let t=Object.fromEntries(xb.map(t=>[t,e[t]])),n={...e};for(let e of xb)delete n[e];return{shared:n,profile:t}}function kb(e){let t=pb({params:{...e,style:Ry[e.style]}});return Object.fromEntries(vb.map(n=>[n,{...t[n],style:e.style}]))}function Ab(e){let t={...e},n=Tb[e.style];if(!n)return kb(e).idle;for(let[r,i]of Object.entries(n.numeric))t[r]=e[r]*i.scale+(i.offset??0);for(let e of bb)t[e]=n.colors[e];return t}function jb(e,t=wb,n=Cb){if(!Number.isFinite(t)||t<0)throw RangeError(`Invalid orb transition duration: ${t}`);if(!Number.isFinite(n)||n<0)throw RangeError(`Invalid orb activation duration: ${n}`);let r=Ob(e),i=Ob(Ab(e)),a=kb(e);return{activationDuration:n,shared:r.shared,profiles:{idle:i.profile,thinking:r.profile,success:Ob(a.success).profile,error:Ob(a.error).profile},transitionDuration:t}}function Mb(e){return jb({style:e,...Py[e]})}function Nb(e,t){return{...e.shared,...e.profiles[t]}}function Pb(e,t,n,r){return Db(n)?{...e,profiles:{...e.profiles,[t]:{...e.profiles[t],[n]:r}}}:{...e,shared:{...e.shared,[n]:r}}}function Fb(e){if(!/^#[0-9a-f]{6}$/i.test(e))throw Error(`Invalid orb color: ${e}`);return[Number.parseInt(e.slice(1,3),16)/255,Number.parseInt(e.slice(3,5),16)/255,Number.parseInt(e.slice(5,7),16)/255]}function Ib(e){return e<=.04045?e/12.92:((e+.055)/1.055)**2.4}function Lb(e){return e<=.0031308?e*12.92:1.055*e**(1/2.4)-.055}function Rb(e,t,n){if(n===0)return e;if(n===1)return t;let r=Fb(e),i=Fb(t);return`#${r.map((e,t)=>{let r=Ib(e)+(Ib(i[t])-Ib(e))*n;return Math.min(255,Math.max(0,Math.round(Lb(r)*255)))}).map(e=>e.toString(16).padStart(2,`0`)).join(``)}`.toUpperCase()}function zb(e){let t=Math.min(1,Math.max(0,e));return t*t*(3-2*t)}function Bb(e){return 1-(1-Math.min(1,Math.max(0,e)))**3}function Vb(e,t,n){let r=Math.min(1,Math.max(0,n));if(r===0)return{...e};if(r===1)return{...t};let i={...t};for(let n of yb)i[n]=e[n]+(t[n]-e[n])*r;for(let n of bb)i[n]=Rb(e[n],t[n],r);return i}function Hb(e){let t=e.state,n={...e.params},r={...e.params},i=e.state,a=0,o=0;function s(e){if(o===0)return{...r};let t=Math.max(0,e-a)/o,s=i===`thinking`?Bb(t):zb(t);return Vb(n,r,s)}return{sample(e,c){return e.state===t?r={...e.params}:(n=s(c),r={...e.params},i=e.state,a=c,o=Math.max(0,(e.state===`thinking`?e.activationDuration:e.transitionDuration)*1e3),t=e.state),s(c)}}}var Ub=`// ─────────────────────────────────────────────────────────────────────────────
// Glimmer shader bank.
//
// Based on "orb" by LerSent001 (https://github.com/LerSent001/orb), MIT
// licensed, vendored from commit 8d1736e (2026-09-16). See NOTICE.md for the
// full upstream license. The upstream flow programs, glass shell, and edge bank
// below are their work and are kept as-is so the presets render identically.
//
// Glimmer additions are marked "GLIMMER": the Nebula (30) and Sonar (31) flow
// programs and their dispatch entries.
// ─────────────────────────────────────────────────────────────────────────────

// Glass Liquid — curated flow programs with an optional glass shell.
//
// The local presets use independent spatial models for Siri-like sheets,
// symmetric colour waves, aurora curtains, frost flow, neural interference,
// liquid chrome, opal interference, a voice membrane, a blue liquid drop, and
// a violet molten core, plus a chromatic brushed-metal field. The legacy liquid
// bank remains below for compatibility with older shared shader
// code, but is not exposed as an editor preset.
//
// When enabled, the shell uses a signed-distance refraction profile around the
// boundary, asymmetric spectral separation, and two directional edge lights.
// The fluid is resampled through that profile, so glass changes the image rather
// than covering it with a translucent white face.
//
// ---------------------------------------------------------------------------
// Analytic optical diffusion without a convolution.
// ---------------------------------------------------------------------------
//
// The source used a thirteen-tap 5px frost blur. This port keeps one fluid
// evaluation and applies the equivalent gaussian in the frequency domain:
//
//  1. **Per-octave attenuation, inside \`lqFbm\`.** Convolving with a gaussian of
//     sigma σ scales a component at wavenumber k by exp(-k²σ²/2). An fbm's
//     octaves have known wavenumbers — octave i sits at 2.03^i times the base —
//     so each octave's amplitude is scaled by its own factor and the field is
//     sampled once. The mean is untouched (a blur preserves it), so only the
//     deviation from 0.5 is scaled and the \`s / m\` normaliser is unchanged.
//     Every caller passes the diffusion sigma in its own input units, so detail
//     attenuation continues to track \`zoom\`.
//
//  2. **Value-space quadrature at every pointwise nonlinearity.** This is the
//     part that is easy to get wrong. \`blur(ridge(f))\` is not \`ridge(blur(f))\`:
//     attenuating first and ridging after leaves filaments thin and hard where
//     the blur should have spread them, which is exactly how the earlier
//     analytic-edge version failed. So \`lqFbm\` also returns the standard
//     deviation of the detail the attenuation removed — within a gaussian
//     window an octave scaled by β contributes variance ∝ (1 - β²), NOT
//     (1 - β)² — and every nonlinearity applied to that field integrates it
//     back out with a three-point Gauss-Hermite rule (exact through the fourth
//     moment). Three evaluations of a function of one float, not three
//     evaluations of the noise. \`lqRidgeS\`/\`lqStepS\`/\`lqPowS\` below; Nectar's
//     branch has the fbm inside a \`sin\`, where the same integral is closed-form
//     (E[sin(A + cε)] = sin A · exp(-c²σ²/2)), so it damps the sine instead.
//
//  3. **One continuous disc edge.** The fluid always reaches the sphere
//     boundary. Glass changes its sample coordinates near that boundary, so
//     toggling the shell cannot reveal a second hard-clipped silhouette.
//
// Deliberately NOT ported, and why:
//   - The liquid grain. It sits below display-pixel scale and adds noise rather
//     than useful optical detail, so Glass Liquid has no Grain parameter.
//   - The two contact-shadow ellipses under the ball and its outer
//     \`0 26px 50px -24px\` drop shadow. The Orbs family cut the source app's
//     floor at the user's request, and the export paints over \`Color.black\`.
//
// Scalar controls are packed after \`time\`; the colour bank starts on the next
// 16-byte boundary. The TypeScript writer mirrors this order exactly.
struct Uniforms {
  size:           vec2<f32>,
  time:           f32,
  speed:          f32,
  radius:         f32,
  zoom:           f32,
  warp:           f32,
  ridgeAmt:       f32,
  sharp:          f32,
  shade:          f32,
  sheen:          f32,
  gloss:          f32,
  shellMidAlpha:  f32,
  shellEdgeAlpha: f32,
  exposure:       f32,
  style:          f32,
  edgeSoftness:   f32,
  edgeGlow:       f32,
  paletteCount:   f32,
  glassEnabled:   f32,
  glassOpacity:   f32,
  contourDeform:  f32,
  bandDensity:    f32,
  chromaticShift: f32,
  metalScale:     f32,
  metalStretch:   f32,
  metalAngle:     f32,
  metalOffset:    f32,
  metalPhase:     f32,
  metalEvolution: f32,
  metalRoughness: f32,
  metalDepth:     f32,
  particleDensity: f32,
  ribbonCount:     f32,
  ribbonWidth:     f32,
  ribbonTwist:     f32,
  ribbonFold:      f32,
  ribbonBreath:    f32,
  particleSize:    f32,
  particleBloom:   f32,
  colorA:         vec4<f32>,
  colorB:         vec4<f32>,
  colorC:         vec4<f32>,
  colorD:         vec4<f32>,
  highlightColor: vec4<f32>,
  shellInner:     vec4<f32>,
  shellMid:       vec4<f32>,
  shellEdge:      vec4<f32>,
  sheenColor:     vec4<f32>,
  specColor:      vec4<f32>,
  canvasColor:    vec4<f32>,
  glowColor:      vec4<f32>,
  paletteStop0:    vec4<f32>,
  paletteStop1:    vec4<f32>,
  paletteStop2:    vec4<f32>,
  paletteStop3:    vec4<f32>,
  paletteStop4:    vec4<f32>,
  paletteStop5:    vec4<f32>,
  paletteStop6:    vec4<f32>,
  paletteStop7:    vec4<f32>,
  paletteStop8:    vec4<f32>,
  paletteStop9:    vec4<f32>,
  paletteStop10:   vec4<f32>,
  paletteStop11:   vec4<f32>,
};
@group(0) @binding(0) var<uniform> u: Uniforms;

// ── The Orbs edge bank (WGSL) ───────────────────────────────────────────────
// Two knobs every orb on the shelf carries: how soft its limb is, and how far
// it glows past it. See effects/_shared/edge.ts for the contract.
//
// THREE files must agree — edge.wgsl, edge.metal, edge.sksl. Change one, change
// all three, or the Code tab starts lying about what it ships.

// How much wider than the shipped feather the Edge softness slider is asking
// for. 0.005 is the width every orb was authored with, so this returns exactly
// 0 at the default and every edge expression collapses to the constant it
// replaced — the defaults are bit-identical to the render before the bank.
fn mfEdgeD(soft: f32) -> f32 {
  return soft - 0.005;
}

// The halo an orb throws past its own limb.
//
// ADDED, never subtracted: whatever the orb already paints out there — a
// studio wall, its own exp() bleed, the sheet's cones — survives untouched.
// That is what lets this be adopted by seventeen shaders whose backdrops have
// nothing in common.
//
// \`glow == 0\` returns \`col\` by an early exit rather than by adding zero. Both
// are exact, but the exit also skips the length() on the ~60% of the frame
// outside the ball, and 0 is the default.
fn mfEdgeGlow(col: vec3<f32>, uv: vec2<f32>, ctr: vec2<f32>, rad: f32,
              soft: f32, glow: f32, glowRGB: vec3<f32>) -> vec3<f32> {
  if (glow <= 0.0) { return col; }
  let r = length(uv - ctr);
  // Fenced to the outside of the limb by the same softness the limb uses, so
  // the halo starts where the ball stops however soft that boundary is. Without
  // it the exp() is 1 across the whole disc and washes the face flat.
  let outside = smoothstep(rad - max(soft, 0.0005), rad + max(soft, 0.0005), r);
  return col + glowRGB * (glow * exp(-max(r - rad, 0.0) * 11.0) * outside);
}


// ── The Orbs palette-ramp bank (WGSL) ───────────────────────────────────────
// The add/remove colour list, evaluated INSIDE the shader so every stop paints
// its own region of the ball instead of being averaged into a role colour.
// See effects/_shared/ramp.ts for the contract.
//
// THREE files must agree — ramp.wgsl, ramp.metal, ramp.sksl. Change one, change
// all three, or the Code tab starts lying about what it ships.

// One stop, picked without a dynamic array index.
//
// A \`var\` array indexed by a runtime value is the shape that spills to scratch
// memory on the GPUs this project cares about (PERFORMANCE.md); twelve selects
// stay in registers and are branchless on every backend. Written once here so
// no adopting shader has to.
fn mfRampPick(idx: f32,
              s0: vec3<f32>, s1: vec3<f32>, s2:  vec3<f32>, s3:  vec3<f32>,
              s4: vec3<f32>, s5: vec3<f32>, s6:  vec3<f32>, s7:  vec3<f32>,
              s8: vec3<f32>, s9: vec3<f32>, s10: vec3<f32>, s11: vec3<f32>) -> vec3<f32> {
  var r = s0;
  r = select(r, s1,  idx == 1.0);
  r = select(r, s2,  idx == 2.0);
  r = select(r, s3,  idx == 3.0);
  r = select(r, s4,  idx == 4.0);
  r = select(r, s5,  idx == 5.0);
  r = select(r, s6,  idx == 6.0);
  r = select(r, s7,  idx == 7.0);
  r = select(r, s8,  idx == 8.0);
  r = select(r, s9,  idx == 9.0);
  r = select(r, s10, idx == 10.0);
  r = select(r, s11, idx == 11.0);
  return r;
}

// The CYCLIC ramp: \`t\` wraps, and the last stop runs back into the first.
//
// This is the one a generated-colour orb wants. Prism's hue comes from a cosine
// of an unbounded scalar field, so its colour has always been periodic — a
// clamped ramp would flatten every band past t == 1 into one colour and throw
// the banding away. Wrapping keeps the field's structure exactly and only swaps
// what the structure is *coloured* with.
//
// NOT ONE BRANCH IN HERE, and that is load-bearing rather than tidy. An orb
// evaluates this next to a \`fract(sin(x) * 43758.5453)\` grain hash, which
// amplifies a last-bit change in its argument by ~44000x. Any \`if\` in this file
// or at a call site splits the fragment's basic block, the compiler stops
// folding \`uv / rad\` into its uses, and the hash turns that into speckle up to
// 33/255 — measured, on exactly the first cut of this bank. Straight-line code
// keeps the untouched render bit-identical. Same reasoning as the early-out
// guards every orb carries; see the note in orb-prism.wgsl.
fn mfRampCyc(tIn: f32, n: f32,
             s0: vec3<f32>, s1: vec3<f32>, s2:  vec3<f32>, s3:  vec3<f32>,
             s4: vec3<f32>, s5: vec3<f32>, s6:  vec3<f32>, s7:  vec3<f32>,
             s8: vec3<f32>, s9: vec3<f32>, s10: vec3<f32>, s11: vec3<f32>) -> vec3<f32> {
  let k  = clamp(floor(n + 0.5), 1.0, 12.0);
  let x  = fract(tIn) * k;
  let i0 = min(floor(x), k - 1.0);
  let i1 = select(i0 + 1.0, 0.0, i0 + 1.0 >= k);   // the wrap
  return mix(mfRampPick(i0, s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11),
             mfRampPick(i1, s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11),
             x - i0);
}

// The CLAMPED ramp: stop 0 at t == 0, the last stop at t == 1, held outside.
//
// This is the one an orb with an authored dark→light body ramp wants — the
// four-stop Deep/Mid/Surge/Crest shape, where the ends really are ends.
//
// Branchless for the same reason as \`mfRampCyc\`. The single-stop case falls out
// of the arithmetic rather than needing an early return: k == 1 makes the span
// zero, so x is 0, i0 is 0 and the mix weight is 0 — s0, exactly.
fn mfRampLin(tIn: f32, n: f32,
             s0: vec3<f32>, s1: vec3<f32>, s2:  vec3<f32>, s3:  vec3<f32>,
             s4: vec3<f32>, s5: vec3<f32>, s6:  vec3<f32>, s7:  vec3<f32>,
             s8: vec3<f32>, s9: vec3<f32>, s10: vec3<f32>, s11: vec3<f32>) -> vec3<f32> {
  let k  = clamp(floor(n + 0.5), 1.0, 12.0);
  let x  = clamp(tIn, 0.0, 1.0) * (k - 1.0);
  let i0 = clamp(floor(x), 0.0, max(k - 2.0, 0.0));
  return mix(mfRampPick(i0,     s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11),
             mfRampPick(i0 + 1.0, s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11),
             x - i0);
}

// ── The ramp as ONE value ───────────────────────────────────────────────────
//
// Thirteen uniforms is a reasonable thing for a shader to hold and a terrible
// thing for a helper to take. Several orbs make their body colour deep inside
// one — Glass·Liquid's fluid, the studio orbs' environment mirrors — and in the
// MSL these files are transcribed against, a helper cannot read the stitchable
// entry point's arguments, so the palette has to be handed down. Bundled like
// this that is one parameter instead of thirteen, and the three languages stay
// line-for-line.
//
// The stops come back out by CONSTANT index only, so this is still not a
// dynamically indexed array and still cannot spill to scratch memory.
struct MfRamp {
  n:   f32,
  s0:  vec3<f32>, s1:  vec3<f32>, s2:  vec3<f32>, s3:  vec3<f32>,
  s4:  vec3<f32>, s5:  vec3<f32>, s6:  vec3<f32>, s7:  vec3<f32>,
  s8:  vec3<f32>, s9:  vec3<f32>, s10: vec3<f32>, s11: vec3<f32>,
};

fn mfRampOf(n: f32,
            s0: vec3<f32>, s1: vec3<f32>, s2:  vec3<f32>, s3:  vec3<f32>,
            s4: vec3<f32>, s5: vec3<f32>, s6:  vec3<f32>, s7:  vec3<f32>,
            s8: vec3<f32>, s9: vec3<f32>, s10: vec3<f32>, s11: vec3<f32>) -> MfRamp {
  return MfRamp(n, s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11);
}

fn mfRampCycR(t: f32, r: MfRamp) -> vec3<f32> {
  return mfRampCyc(t, r.n, r.s0, r.s1, r.s2, r.s3, r.s4, r.s5,
                   r.s6, r.s7, r.s8, r.s9, r.s10, r.s11);
}

fn mfRampLinR(t: f32, r: MfRamp) -> vec3<f32> {
  return mfRampLin(t, r.n, r.s0, r.s1, r.s2, r.s3, r.s4, r.s5,
                   r.s6, r.s7, r.s8, r.s9, r.s10, r.s11);
}


// Fluid geometry, in ball radii (|p| == 1 on the ball's edge, y up).
const GL_FU:   f32 = 0.88172043;   // canvas half-side = 0.82/0.93 R

// Pure fluid keeps tighter diffusion; enabling glass restores the source's 5px
// frosted diffusion inside the inset shell.
const GL_BSIG_CLEAR: f32 = 0.01800000;
const GL_BSIG_GLASS: f32 = 0.03990000;

// --- the three constants the frequency-domain blur is fitted on -------------
// A gaussian's response is exp(-k²σ²/2), so GL_KA is k²/2 for the wavenumber
// where smoothstep-interpolated value noise actually keeps its energy. The
// textbook choice — one cycle per noise cell, k = 2π, GL_KA = 19.74 — blurs too
// hard, because the smoothstep interpolation is itself a low-pass and pulls the
// effective k down to about 3.5. Fitted against the 13-tap render.
const GL_KA:  f32 = 6.0;
// (2.03)² — how σ grows, in its own octave's cells, from one octave to the next.
const GL_KG:  f32 = 4.1209;
// The warp field displaces the fluid rather than colouring it, so blurring the
// image does not attenuate it as strongly as the model says. Also fitted.
const GL_KWA: f32 = 0.5;
// One value-noise octave's standard deviation about its own mean, as a fraction
// of its range — the scale that turns "amplitude the attenuation removed" into
// "how far the removed detail typically pushed the value".
const GL_KR:  f32 = 0.32;
const GL_GH:  f32 = 1.73205081;   // sqrt(3), the 3-point Gauss-Hermite abscissa

// Pure fluid reaches the ball edge.
const GL_CLEAR_EA: f32 = 0.995;
const GL_CLEAR_EB: f32 = 1.04;

// ---------------------------------------------------------------------------
// The sheet's liquid noise bank. Five octaves, gain .5, normalised by the
// weight sum, and rotated every octave. This is NOT the bank the sheet's Prism
// screen uses (a different hash, gain .55, unnormalised, no rotation).
// ---------------------------------------------------------------------------
fn lqHash(pIn: vec2<f32>) -> f32 {
  var p = fract(pIn * vec2<f32>(123.34, 456.21));
  p = p + vec2<f32>(dot(p, p + vec2<f32>(45.32)));
  return fract(p.x * p.y);
}

fn lqNoise(p: vec2<f32>) -> f32 {
  let i = floor(p);
  var f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(lqHash(i), lqHash(i + vec2<f32>(1.0, 0.0)), f.x),
             mix(lqHash(i + vec2<f32>(0.0, 1.0)), lqHash(i + vec2<f32>(1.0, 1.0)), f.x), f.y);
}

// The fbm, pre-blurred. \`bs\` is the blur's sigma expressed in THIS call's input
// units — the caller scales it by whatever it scaled the domain by. Returns
// \`.x\` the attenuated value and \`.y\` the standard deviation of the detail the
// attenuation took out, which is what a following nonlinearity has to integrate
// over. Both are exact for a gaussian window: the surviving amplitude is β and
// the variance that leaves is (1 - β²), per octave, weighted by that octave's
// own share of the normalised sum.
fn lqFbm(pIn: vec2<f32>, bs: f32) -> vec2<f32> {
  var p = pIn;
  var s:  f32 = 0.0;
  var a:  f32 = 0.5;
  var m:  f32 = 0.0;
  var vr: f32 = 0.0;
  let e = -GL_KA * bs * bs;
  var g: f32 = 1.0;
  for (var i: i32 = 0; i < 5; i = i + 1) {
    let b = exp(e * g);
    s  = s  + a * (0.5 + b * (lqNoise(p) - 0.5));
    vr = vr + a * a * (1.0 - b * b);
    m  = m + a;
    a  = a * 0.5;
    g  = g * GL_KG;
    // GLSL's mat2(.8,.6,-.6,.8) is COLUMN-major — columns (.8,.6) and
    // (-.6,.8) — so the product is written out rather than constructed.
    p = vec2<f32>(0.8 * p.x - 0.6 * p.y, 0.6 * p.x + 0.8 * p.y) * 2.03;
  }
  return vec2<f32>(s / m, GL_KR * sqrt(vr) / m);
}

fn lqRidge(v: f32, k: f32) -> f32 {
  return pow(clamp(1.0 - abs(v * 2.0 - 1.0), 0.0, 1.0), k);
}

// The sheet's four-stop ramp, shared by every branch of every program.
fn lqRamp(v: f32, cA: vec3<f32>, cB: vec3<f32>, cC: vec3<f32>, cD: vec3<f32>) -> vec3<f32> {
  var c = mix(cA, cB, smoothstep(0.0, 0.45, v));
  c = mix(c, cC, smoothstep(0.38, 0.72, v));
  c = mix(c, cD, smoothstep(0.68, 1.0, v));
  // The editor's four colours are the default ramp. An optional custom palette
  // can replace them without changing the scalar field that produces \`v\`.
  return select(c, mfRampLin(v, u.paletteCount,
                             u.paletteStop0.rgb, u.paletteStop1.rgb, u.paletteStop2.rgb,
                             u.paletteStop3.rgb, u.paletteStop4.rgb, u.paletteStop5.rgb,
                             u.paletteStop6.rgb, u.paletteStop7.rgb, u.paletteStop8.rgb,
                             u.paletteStop9.rgb, u.paletteStop10.rgb, u.paletteStop11.rgb), u.paletteCount > 0.5);
}

// ---------------------------------------------------------------------------
// The three nonlinearities the fluid applies to a pre-blurred field, each
// integrated over the detail \`lqFbm\` attenuated away. Three-point
// Gauss-Hermite — nodes 0 and ±sqrt(3)·sd, weights 4/6 and 1/6 — reproduces a
// gaussian's second AND fourth moments, which is what keeps a ridged filament
// spreading as it dims instead of just dimming. \`vs\` is an \`lqFbm\` result:
// \`.x\` the value, \`.y\` that standard deviation.
// ---------------------------------------------------------------------------
fn lqRidgeS(vs: vec2<f32>, k: f32) -> f32 {
  let d = GL_GH * vs.y;
  return (lqRidge(vs.x - d, k) + 4.0 * lqRidge(vs.x, k) + lqRidge(vs.x + d, k)) / 6.0;
}

fn lqStepS(vs: vec2<f32>, a: f32, b: f32) -> f32 {
  let d = GL_GH * vs.y;
  return (smoothstep(a, b, vs.x - d) + 4.0 * smoothstep(a, b, vs.x)
        + smoothstep(a, b, vs.x + d)) / 6.0;
}

fn lqPowS(vs: vec2<f32>, k: f32) -> f32 {
  let d = GL_GH * vs.y;
  return (pow(clamp(vs.x - d, 0.0, 1.0), k) + 4.0 * pow(clamp(vs.x, 0.0, 1.0), k)
        + pow(clamp(vs.x + d, 0.0, 1.0), k)) / 6.0;
}

// ---------------------------------------------------------------------------
// Curated local flow programs. Each preset owns a different spatial model;
// colour changes are secondary to silhouette, frequency, and motion structure.
// ---------------------------------------------------------------------------

fn glsFinishPresetFluid(colorIn: vec3<f32>, p: vec2<f32>) -> vec3<f32> {
  var color = colorIn;
  color = mix(color, u.highlightColor.rgb,
              u.shade * 0.22 * smoothstep(0.15, 1.15, dot(p, vec2<f32>(-0.32, 0.78))));
  color = color * (1.0 - u.shade * 0.34
                  * smoothstep(-0.1, 1.2, dot(p, vec2<f32>(0.45, -0.62))));
  color = color * (1.0 - u.shade * 0.22 * smoothstep(0.72, 1.08, length(p)));
  return clamp(color, vec3<f32>(0.0), vec3<f32>(1.0));
}

fn glsFinishEmissionFluid(colorIn: vec3<f32>, p: vec2<f32>) -> vec3<f32> {
  var color = colorIn;
  if (u.glassEnabled > 0.5) {
    color = mix(color, u.highlightColor.rgb,
                u.shade * 0.22 * smoothstep(0.15, 1.15, dot(p, vec2<f32>(-0.32, 0.78))));
  }
  color = color * (1.0 - u.shade * 0.34
                  * smoothstep(-0.1, 1.2, dot(p, vec2<f32>(0.45, -0.62))));
  color = color * (1.0 - u.shade * 0.22 * smoothstep(0.72, 1.08, length(p)));
  return clamp(color, vec3<f32>(0.0), vec3<f32>(1.0));
}

fn glsSiriBand(q: vec2<f32>, drift: f32, phaseOffset: f32, amplitude: f32,
               mainY: f32, envelope: f32, softness: f32) -> vec2<f32> {
  let y = amplitude * envelope * sin(q.x * 1.0 + drift + phaseOffset);
  let distanceToLine = abs(q.y - y);
  let line = 0.018 / (sqrt(distanceToLine * distanceToLine + softness * softness) + 0.026);
  let bandDistance = max(0.0, max(q.y - max(mainY, y), min(mainY, y) - q.y));
  let band = 0.018 / (bandDistance + 0.075);
  return vec2<f32>(line, band);
}

fn glsSiriFluid(p: vec2<f32>, t: f32) -> vec3<f32> {
  // The reference wave is a main sinusoid plus four chromatically separated
  // waves. Their enclosed bands carry colour while the shared crest stays hot.
  let scale = 0.74 + u.zoom * 0.34;
  let q = p / scale;
  let xNorm = q.x;
  let envelopeBase = cos(1.57079633 * min(abs(0.9 * xNorm), 1.0));
  let envelope = envelopeBase * envelopeBase;
  let low = 0.5 + 0.5 * cos(t * 0.37);
  let mid = 0.5 + 0.5 * sin(t * 0.51 + 1.2);
  let high = 0.5 + 0.5 * cos(t * 0.73 + 2.1);
  let drift = t * 2.4;
  let mainAmplitude = 0.25 + u.ridgeAmt * 0.075 + low * 0.018;
  let bandAmplitude = mainAmplitude + mid * 0.025 + high * 0.018;
  let mainY = mainAmplitude * envelope * sin(q.x * 1.1 + drift);
  let separation = 1.85 + u.warp * 0.2 + mid * 0.28;
  let softness = 0.035 + (1.0 - u.ridgeAmt) * 0.018 + mid * 0.006;

  let band0 = glsSiriBand(q, drift, -separation, bandAmplitude, mainY, envelope, softness);
  let band1 = glsSiriBand(q, drift, -separation * 0.34, bandAmplitude, mainY, envelope, softness);
  let band2 = glsSiriBand(q, drift, separation * 0.34, bandAmplitude, mainY, envelope, softness);
  let band3 = glsSiriBand(q, drift, separation, bandAmplitude, mainY, envelope, softness);
  let w0 = band0.x + band0.y;
  let w1 = band1.x + band1.y;
  let w2 = band2.x + band2.y;
  let w3 = band3.x + band3.y;
  let total = w0 + w1 + w2 + w3;
  let dominant0 = w0 * w0;
  let dominant1 = w1 * w1;
  let dominant2 = w2 * w2;
  let dominant3 = w3 * w3;
  let dominantTotal = dominant0 + dominant1 + dominant2 + dominant3;
  let spectral = (u.colorA.rgb * dominant0 + u.colorC.rgb * dominant1
                + u.colorB.rgb * dominant2 + u.colorD.rgb * dominant3)
                / max(dominantTotal, 0.0001);
  let energy = (1.0 - exp(-total * 0.58)) * envelope;
  let mainDistance = abs(q.y - mainY);
  let whiteCore = exp(-mainDistance * mainDistance / 0.0028) * envelope;
  let glassFill = select(0.0, 1.0, u.glassEnabled > 0.5);
  let atmosphere = mix(u.colorD.rgb, u.colorB.rgb,
                       smoothstep(-0.7, 0.7, q.y)) * 0.018 * glassFill;
  var color = atmosphere + spectral * energy * 1.14;
  color = color + u.highlightColor.rgb * whiteCore * (0.18 + 0.1 * low);
  let emissionMask = mix(smoothstep(0.08, 0.25, energy + whiteCore * 0.12),
                         1.0, glassFill);
  color = color * emissionMask;
  color = color / (vec3<f32>(1.0) + color * 0.18);
  return glsFinishEmissionFluid(color, p);
}

fn glsSpectrumHeight(q: vec2<f32>, t: f32, frequency: f32,
                     phaseOffset: f32, amplitude: f32) -> f32 {
  let x = q.x * 2.15;
  let envelope = pow(4.0 / (4.0 + x * x), 4.0);
  let breathing = 0.82 + 0.18 * sin(t * 0.48 + phaseOffset * 0.7);
  let wave = abs(sin(frequency * x - t * 1.36 + phaseOffset));
  return envelope * amplitude * breathing * (0.28 + 0.72 * wave);
}

fn glsSpectrumLayer(q: vec2<f32>, height: f32, softness: f32) -> f32 {
  return (1.0 - smoothstep(max(height - softness, 0.0), height + softness, abs(q.y)))
         * smoothstep(0.0, 0.045, height);
}

fn glsSpectrumFluid(p: vec2<f32>, t: f32) -> vec3<f32> {
  // Three symmetric filled wave surfaces orbit a persistent support line. This
  // keeps the iOS 9 voice-field silhouette without depending on canvas strokes.
  let scale = 0.74 + u.zoom * 0.34;
  let q = p / scale;
  let amplitude = 0.26 + u.ridgeAmt * 0.27;
  let frequency = 0.72 + u.warp * 0.095;
  let softness = 0.026 + (1.0 - u.ridgeAmt) * 0.032;
  let h0 = glsSpectrumHeight(q, t, frequency * 0.82, -1.2, amplitude * 0.72);
  let h1 = glsSpectrumHeight(q, t, frequency, 0.45, amplitude);
  let h2 = glsSpectrumHeight(q, t, frequency * 1.17, 2.05, amplitude * 0.82);
  let l0 = glsSpectrumLayer(q, h0, softness);
  let l1 = glsSpectrumLayer(q, h1, softness);
  let l2 = glsSpectrumLayer(q, h2, softness);
  let spectrumX = q.x * 2.15;
  let envelope = pow(4.0 / (4.0 + spectrumX * spectrumX), 4.0);
  let support = exp(-q.y * q.y / 0.00072) * envelope;
  let total = l0 + l1 + l2;
  let spectral = (u.colorB.rgb * l0 + u.colorC.rgb * l1 + u.colorD.rgb * l2)
                 / max(total, 0.001);
  let glassFill = select(0.0, 1.0, u.glassEnabled > 0.5);
  var color = u.colorD.rgb * 0.025 * glassFill
            + spectral * (1.0 - exp(-total * 0.86));
  color = color + u.colorA.rgb * support * 0.58;
  color = color / (vec3<f32>(1.0) + color * 0.2);
  return glsFinishEmissionFluid(color, p);
}

fn glsAuroraLayer(p: vec2<f32>, t: f32, offset: f32) -> f32 {
  let drift = t * 0.18 + offset * 2.5;
  let wave1 = sin(p.x * (2.0 + u.warp * 0.13) + drift + offset * 6.0) * 0.25;
  let wave2 = sin(p.x * 3.7 + drift * 1.3 + offset * 4.0) * 0.12;
  let wave3 = sin(p.x * 7.2 + drift * 0.7 + offset * 8.0) * 0.055;
  let noiseValue = lqFbm(vec2<f32>(p.x * 1.6 + drift * 0.35,
                                   p.y * 0.8 + offset * 3.0), 0.018).x;
  let center = offset * 0.46 + wave1 + wave2 + wave3
               + (noiseValue - 0.5) * 0.28;
  let dist = abs(p.y - center);
  let glow = exp(-dist * dist * (13.0 - 5.0 * u.ridgeAmt));
  let shimmer = lqFbm(vec2<f32>(p.x * 4.0 + t * 0.22,
                                p.y * 7.0 + offset * 5.0), 0.012).x;
  return glow * (0.64 + 0.36 * shimmer);
}

fn glsAuroraFluid(p: vec2<f32>, t: f32) -> vec3<f32> {
  let q = p * (0.82 + u.zoom * 0.58);
  let l0 = glsAuroraLayer(q, t, -0.72);
  let l1 = glsAuroraLayer(q, t, 0.0);
  let l2 = glsAuroraLayer(q, t, 0.72);
  var color = u.colorA.rgb * (0.46 + 0.18 * (q.y + 1.0));
  color = color + u.colorB.rgb * l0 * 1.3;
  color = color + u.colorC.rgb * l1 * 1.15;
  color = color + u.colorD.rgb * l2 * 1.2;
  color = color + mix(u.colorB.rgb, u.colorD.rgb, 0.5) * min(l0 * l2, l1) * 0.65;

  let starUv = (q + vec2<f32>(1.0)) * 18.0;
  let starCell = floor(starUv);
  let starHash = lqHash(starCell);
  let starPoint = exp(-dot(fract(starUv) - vec2<f32>(0.5),
                            fract(starUv) - vec2<f32>(0.5)) * 90.0);
  let stars = step(0.965, starHash) * starPoint
              * (0.55 + 0.45 * sin(t * (1.0 + starHash * 2.0) + starHash * 6.28));
  color = color + u.highlightColor.rgb * stars * (1.0 - clamp(l0 + l1 + l2, 0.0, 1.0));
  color = color / (vec3<f32>(1.0) + color * 0.28);
  return glsFinishPresetFluid(color, p);
}

fn glsRotate(p: vec2<f32>, angle: f32) -> vec2<f32> {
  let c = cos(angle);
  let s = sin(angle);
  return vec2<f32>(c * p.x - s * p.y, s * p.x + c * p.y);
}

fn glsNeuroShape(pIn: vec2<f32>, t: f32) -> f32 {
  var p = pIn * (0.34 + 0.08 * u.zoom);
  var sineAccum = vec2<f32>(0.0);
  var result = vec2<f32>(0.0);
  var scale = 8.0;
  for (var j: i32 = 0; j < 11; j = j + 1) {
    p = glsRotate(p, 1.0);
    sineAccum = glsRotate(sineAccum, 1.0);
    let layer = p * scale + vec2<f32>(f32(j)) + sineAccum - vec2<f32>(t * 0.34);
    sineAccum = sineAccum + sin(layer);
    result = result + (vec2<f32>(0.5) + 0.5 * cos(layer)) / scale;
    scale = scale * 1.16;
  }
  return result.x + result.y;
}

fn glsPlasmaFluid(p: vec2<f32>, t: f32) -> vec3<f32> {
  let shape = glsNeuroShape(p, t);
  let phase = shape * (10.0 + u.warp) + p.x * 1.7 - p.y * 1.3 - t * 0.52;
  let ridgeWidth = 0.62 - 0.24 * u.ridgeAmt;
  let primary = pow(abs(cos(phase)), max(1.3, u.sharp * ridgeWidth));
  let secondary = pow(abs(cos(phase * 0.53 + atan2(p.y, p.x) * 2.0 + t * 0.21)),
                      max(1.6, u.sharp * (ridgeWidth + 0.1)));
  let filaments = max(primary, secondary * 0.64);
  let core = pow(primary, 4.0);
  let polarity = 0.5 + 0.5 * sin(phase * 0.37 + shape * 3.0);
  var color = mix(u.colorA.rgb * 0.42, u.colorD.rgb * 0.48, polarity * 0.46);
  color = mix(color, u.colorB.rgb, filaments * 0.72);
  color = mix(color, u.colorC.rgb, core * 0.68);
  color = color + u.highlightColor.rgb * pow(core, 3.0) * 0.16;
  color = color / (vec3<f32>(1.0) + color * 0.34);
  return glsFinishPresetFluid(color, p);
}

fn glsChromeFluid(p: vec2<f32>, t: f32) -> vec3<f32> {
  var q = p * (1.0 + u.zoom * 0.35);
  let amplitude = 0.028 * u.warp;
  for (var i: i32 = 1; i <= 9; i = i + 1) {
    let fi = f32(i);
    q.x = q.x + amplitude / fi * cos(fi * 2.7 * q.y + t * 0.46);
    q.y = q.y + amplitude / fi * cos(fi * 3.1 * q.x - t * 0.4);
  }
  let denominator = max(abs(sin(t * 0.24 - q.y - q.x)), 0.045);
  let flare = clamp(1.0 / denominator, 0.0, 18.0);
  let metal = smoothstep(1.15, 7.5, flare);
  let fold = 0.5 + 0.5 * cos((q.x - q.y) * (3.2 + u.sharp * 0.28) + t * 0.32);
  let value = clamp(metal * 0.74 + fold * 0.36, 0.0, 1.0);
  var color = lqRamp(value, u.colorD.rgb, u.colorC.rgb, u.colorB.rgb, u.colorA.rgb);
  color = mix(color, u.colorA.rgb, pow(metal, 5.0) * 0.62);
  return glsFinishPresetFluid(color, p);
}

fn glsChromaticMetalPhase(p: vec2<f32>, t: f32) -> f32 {
  let angle = u.metalAngle * 0.01745329252;
  let scale = max(u.metalScale, 0.05);
  let stretch = mix(0.48, 1.58, clamp(u.metalStretch, 0.0, 1.0));
  var q = glsRotate(p / scale, angle);
  q = vec2<f32>(q.x / stretch, q.y * stretch);

  // The reference advances continuously while local reflections evolve out of
  // phase. Travelling domain waves provide that deformation without rotating
  // the entire pattern as one rigid layer. Integer harmonics keep a clean loop.
  let cycle = t * 0.46 + u.metalPhase * 6.28318530718;
  let evolution = clamp(u.metalEvolution, 0.0, 2.0);
  q.x = q.x + sin(q.y * 1.86 - cycle) * 0.095 * evolution;
  q.x = q.x + sin((q.x + q.y) * 1.28 + cycle * 2.0 + 1.4) * 0.045 * evolution;
  q.y = q.y + sin(q.x * 1.52 + cycle + 0.8) * 0.07 * evolution;

  let repeats = max(u.bandDensity, 1.0);
  return q.x * repeats * 2.18
       + sin(q.y * (1.3 + repeats * 0.26) - cycle) * 0.56 * evolution
       + sin((q.x - q.y) * 1.34 + cycle * 2.0 + 1.7) * 0.27 * evolution
       + sin((q.x * 0.72 + q.y) * 2.1 - cycle * 3.0 + 0.35) * 0.11 * evolution
       + sin(cycle) * 0.1
       + sin(cycle * 3.0 + 0.7) * 0.035
       + cycle
       + u.metalOffset * 6.28318530718;
}

fn glsChromaticMetalTone(phase: f32) -> f32 {
  let wave = 0.5 + 0.5 * cos(phase);
  let roughness = clamp(u.metalRoughness, 0.0, 1.0);
  let depth = clamp(u.metalDepth, 0.0, 1.0);
  let edge = 0.025 + roughness * 0.18;
  let broadReflection = smoothstep(0.5 - edge, 0.5 + edge, wave);
  let hardReflection = pow(wave, mix(13.0, 4.0, roughness));
  let blackFold = pow(1.0 - wave, mix(9.0, 3.0, roughness));
  let body = mix(wave, broadReflection, 0.2 + depth * 0.3);
  return clamp(0.018 + body * (0.46 + depth * 0.12)
               + hardReflection * (0.3 + depth * 0.42)
               - blackFold * (0.07 + depth * 0.11), 0.0, 1.0);
}

fn glsChromaticMetalSample(p: vec2<f32>, t: f32) -> vec3<f32> {
  let phase = glsChromaticMetalPhase(p, t);
  let angle = u.metalAngle * 0.01745329252;
  let brushP = glsRotate(p / max(u.metalScale, 0.05), angle);
  let brushed = sin(brushP.y * 146.0 + sin(brushP.x * 11.0) * 0.58)
              + 0.48 * sin(brushP.y * 317.0 - brushP.x * 5.0);
  let brushAmount = 0.004 + clamp(u.metalRoughness, 0.0, 1.0) * 0.014;
  let tone = clamp(glsChromaticMetalTone(phase) + brushed * brushAmount, 0.0, 1.0);
  return lqRamp(tone, u.colorD.rgb, u.colorB.rgb, u.colorC.rgb, u.colorA.rgb);
}

fn glsChromaticMetalFluid(p: vec2<f32>, t: f32) -> vec3<f32> {
  let angle = u.metalAngle * 0.01745329252;
  let splitDirection = glsRotate(vec2<f32>(0.0, 1.0), angle);
  let split = splitDirection * u.chromaticShift * 0.045;
  let redSample = glsChromaticMetalSample(p + split, t);
  let neutral = glsChromaticMetalSample(p, t);
  let blueSample = glsChromaticMetalSample(p - split, t);
  let optical = vec3<f32>(redSample.r, neutral.g, blueSample.b);
  let fringe = clamp(length(optical - neutral) * 4.0, 0.0, 1.0);
  var color = mix(neutral, optical,
                  clamp(u.chromaticShift * (0.72 + fringe * 0.28), 0.0, 1.0));
  let centerTone = glsChromaticMetalTone(glsChromaticMetalPhase(p, t));
  let glint = pow(centerTone, mix(12.0, 5.0, clamp(u.metalRoughness, 0.0, 1.0)));
  color = mix(color, u.highlightColor.rgb,
              glint * clamp(u.metalDepth, 0.0, 1.0) * 0.06);

  // A second, sphere-scale reflection layer keeps the material metallic even
  // when the optional glass shell is disabled. It modulates the animated ramp
  // instead of raising exposure, preserving dark chrome between reflections.
  let radial2 = clamp(dot(p, p), 0.0, 1.0);
  let normal = normalize(vec3<f32>(p, sqrt(max(1.0 - radial2, 0.0))));
  let roughness = clamp(u.metalRoughness, 0.0, 1.0);
  let depth = clamp(u.metalDepth, 0.0, 1.0);
  let key = pow(max(dot(normal, normalize(vec3<f32>(-0.48, 0.62, 0.62))), 0.0),
                mix(7.0, 3.0, roughness));
  let fill = pow(max(dot(normal, normalize(vec3<f32>(0.7, -0.34, 0.63))), 0.0),
                 mix(10.0, 4.0, roughness));
  let limb = 1.0 - normal.z;
  let fresnel = pow(limb, 3.0);
  let rim = pow(limb, 10.0);
  color = color * (0.86 + normal.z * 0.14);
  color = mix(color, u.highlightColor.rgb, key * (0.05 + depth * 0.13));
  color = mix(color, u.colorC.rgb, fill * (0.025 + depth * 0.07));
  color = mix(color, u.colorD.rgb, fresnel * (0.12 + depth * 0.15));
  color = mix(color, u.highlightColor.rgb, rim * (0.035 + depth * 0.055));
  return glsFinishPresetFluid(color, p);
}

fn glsOpalFluid(p: vec2<f32>, t: f32) -> vec3<f32> {
  let q = p * (0.8 + u.zoom * 0.64);
  let complexity = 0.76 + u.warp * 0.085;
  var d = -t * 0.42;
  var a = 0.0;
  for (var i: i32 = 0; i < 8; i = i + 1) {
    let fi = f32(i);
    a = a + cos(fi - d - a * q.x * complexity);
    d = d + sin(q.y * fi * complexity + a);
  }
  d = d + t * 0.42;
  let c1 = cos(q * vec2<f32>(d, a)) * 0.6 + vec2<f32>(0.4);
  let c2 = cos(a + d) * 0.5 + 0.5;
  let interference = 0.5 + 0.5 * cos(vec3<f32>(c1.x, c1.y, c2)
                         * cos(vec3<f32>(d, a, 2.5)) * 0.5 + vec3<f32>(0.5));
  let tone = fract(interference.r * 0.37 + interference.g * 0.51
                   + interference.b * 0.73 + c1.x * 0.22 - c1.y * 0.15);
  var color = lqRamp(tone, u.colorB.rgb, u.colorC.rgb, u.colorD.rgb, u.colorA.rgb);
  color = mix(color, u.colorA.rgb, 0.16 + 0.1 * interference.b);
  color = color / (vec3<f32>(1.0) + color * 0.16);
  return glsFinishPresetFluid(color, p);
}

fn glsFrostFluid(p: vec2<f32>, t: f32) -> vec3<f32> {
  // The initial frost-style orb: a slow domain warp drives broad cloudy colour
  // bodies, while a second higher-frequency field contributes adjustable veins.
  var q = p * (0.66 + u.zoom * 0.92);
  q.y = q.y + t * 0.055;
  let blur = 0.011 + 0.006 * u.zoom;
  let warpField = vec2<f32>(
    lqFbm(q * 1.14 + vec2<f32>(t * 0.055, 0.0), blur).x,
    lqFbm(q * 1.14 + vec2<f32>(6.8, -t * 0.048), blur).x
  );
  let warped = q + (warpField - vec2<f32>(0.5)) * (0.28 + u.warp * 0.17);
  let body = lqFbm(warped * 1.48 + vec2<f32>(t * 0.032, -t * 0.02), blur * 1.48);
  let veins = lqRidgeS(
    lqFbm(warped * 2.36 + vec2<f32>(3.1, -t * 0.024), blur * 2.36),
    u.sharp
  );
  let value = mix(lqStepS(body, 0.1, 0.9),
                  clamp(veins * 0.8 + body.x * 0.46, 0.0, 1.0),
                  u.ridgeAmt);
  var color = lqRamp(value, u.colorA.rgb, u.colorB.rgb, u.colorC.rgb, u.colorD.rgb);
  color = mix(color, u.colorA.rgb, 0.08 * smoothstep(0.62, 0.92, body.x));
  return glsFinishPresetFluid(color, p);
}

fn glsVoiceWaveFluid(p: vec2<f32>, t: f32) -> vec3<f32> {
  // A single broad membrane stays phase-coherent across the sphere. Nearby
  // translucent layers add volume without splitting into separate Siri bands.
  let scale = 0.76 + u.zoom * 0.34;
  let q = p / scale;
  let rimEnvelope = pow(max(1.0 - q.x * q.x, 0.0), 0.72);
  let drift = t * 0.82;
  let amplitude = 0.2 + u.warp * 0.018;
  let mainY = rimEnvelope * (amplitude * sin(q.x * 1.48 + drift)
              + 0.055 * sin(q.x * 3.2 - drift * 0.43 + 1.1));
  let distance = q.y - mainY;
  let width = 0.11 + (1.0 - u.ridgeAmt) * 0.075;
  let membrane = exp(-distance * distance / max(width * width, 0.001)) * rimEnvelope;
  let upperVeil = exp(-(distance - 0.105) * (distance - 0.105)
                      / max(width * width * 2.4, 0.001)) * rimEnvelope;
  let lowerVeil = exp(-(distance + 0.115) * (distance + 0.115)
                      / max(width * width * 2.8, 0.001)) * rimEnvelope;
  let crest = exp(-distance * distance / 0.0026) * rimEnvelope;
  let depth = sqrt(max(1.0 - clamp(dot(p, p), 0.0, 1.0), 0.0));
  var color = mix(u.colorA.rgb * 0.7, u.colorD.rgb * 0.34,
                  smoothstep(-0.82, 0.82, q.y));
  color = mix(color, u.colorB.rgb, upperVeil * 0.7);
  color = mix(color, u.colorC.rgb, lowerVeil * 0.62);
  color = color + mix(u.colorB.rgb, u.colorC.rgb, 0.46) * membrane * 0.34;
  color = color + u.highlightColor.rgb * crest * 0.14;
  color = color * (0.58 + 0.42 * depth);
  return glsFinishPresetFluid(color, p);
}

fn glsBlueDropFluid(p: vec2<f32>, t: f32) -> vec3<f32> {
  // Slow diagonal advection keeps the broad liquid bodies coherent. The two
  // shear waves replace the reference orb's circular, looped point motion.
  let depth = sqrt(max(1.0 - clamp(dot(p, p), 0.0, 1.0), 0.0));
  var q = p * mix(0.72, 1.0, depth * 0.62 + 0.38);
  q = glsRotate(q, -0.24 + 0.06 * sin(t * 0.17));
  let scale = 1.0 + u.zoom * 1.12;
  let blur = 0.012 + 0.006 * u.zoom;
  let driftA = lqFbm(q * 1.28 + vec2<f32>(t * 0.095, -t * 0.034), blur * 1.28);
  let driftB = lqFbm(glsRotate(q, 1.08) * 1.62
                     + vec2<f32>(-t * 0.042, t * 0.078), blur * 1.62);
  var flowed = q + vec2<f32>(driftA.x - 0.5, driftB.x - 0.5)
                 * (0.24 + u.warp * 0.1);
  flowed.x = flowed.x + sin(flowed.y * 2.15 + t * 0.24) * (0.035 + u.warp * 0.012);
  flowed.y = flowed.y + sin(flowed.x * 1.38 - t * 0.18) * (0.045 + u.warp * 0.01);
  let body = lqFbm(flowed * scale + vec2<f32>(t * 0.025, -t * 0.018), blur * scale);
  let marble = lqRidgeS(lqFbm(flowed * (1.72 + u.zoom * 0.9)
                              + vec2<f32>(2.7, -t * 0.035),
                              blur * (1.72 + u.zoom * 0.9)),
                            0.8 + u.sharp * 0.46);
  let value = clamp(mix(body.x, body.x * 0.62 + marble * 0.58, u.ridgeAmt), 0.0, 1.0);
  var color = lqRamp(value, u.colorA.rgb, u.colorB.rgb, u.colorC.rgb, u.colorD.rgb);
  let light = pow(max(dot(normalize(vec3<f32>(p, depth)),
                          normalize(vec3<f32>(-0.48, 0.62, 0.92))), 0.0), 3.2);
  color = mix(color, u.highlightColor.rgb, light * (0.035 + 0.05 * u.shade));
  color = color * (0.74 + 0.26 * depth);
  return glsFinishPresetFluid(color, p);
}

fn glsVioletEmberFluid(p: vec2<f32>, t: f32) -> vec3<f32> {
  // A radial twist and two crossing drift fields make heavy molten folds. This
  // moves as a breathing spiral instead of the reference orb's closed circles.
  let scale = 1.08 + u.zoom * 1.18;
  let blur = 0.011 + 0.005 * u.zoom;
  let radius = length(p);
  let twist = t * 0.055 + radius * (0.72 + u.warp * 0.11)
              + 0.08 * sin(t * 0.31 + radius * 4.0);
  let q = glsRotate(p * scale, twist);
  let low = lqFbm(q * 1.18 + vec2<f32>(t * 0.068, -t * 0.105), blur * 1.18);
  let cross = lqFbm(glsRotate(q, -1.12) * 1.52
                    + vec2<f32>(-t * 0.094, t * 0.042)
                    + vec2<f32>(low.x * 1.35, -low.x * 0.72), blur * 1.52);
  let warped = q + vec2<f32>(low.x - 0.5, cross.x - 0.5)
                   * (0.3 + u.warp * 0.12);
  let melt = lqFbm(warped * 1.34
                   + vec2<f32>(cross.x * 1.48, low.x * 1.12), blur * 1.34);
  let veins = lqRidgeS(lqFbm(warped * (2.05 + u.zoom * 0.72)
                             + vec2<f32>(-2.1, t * 0.052),
                             blur * (2.05 + u.zoom * 0.72)),
                           0.82 + u.sharp * 0.58);
  let heat = smoothstep(0.18, 0.92,
                        melt.x * (0.72 - u.ridgeAmt * 0.16)
                        + veins * (0.32 + u.ridgeAmt * 0.5));
  var color = lqRamp(heat, u.colorA.rgb, u.colorB.rgb, u.colorC.rgb, u.colorD.rgb);
  let pulse = 0.94 + 0.06 * sin(t * 0.44 + melt.x * 5.0);
  color = color * pulse;
  color = mix(color, u.highlightColor.rgb, pow(veins, 4.0) * 0.045);
  return glsFinishPresetFluid(color, p);
}

fn glsRefractiveBlobFluid(p: vec2<f32>, t: f32) -> vec3<f32> {
  // Broad advected cells give the lens something legible to bend. A slower
  // caustic ribbon crosses those cells out of phase, so the material evolves
  // without looking like a texture rotating inside a fixed sphere.
  let radial2 = clamp(dot(p, p), 0.0, 1.0);
  let depth = sqrt(max(1.0 - radial2, 0.0));
  let scale = 0.82 + u.zoom * 1.08;
  let blur = 0.012 + 0.005 * u.zoom;
  var q = glsRotate(p * scale, 0.08 * sin(t * 0.17));
  let driftA = lqFbm(q * 1.16 + vec2<f32>(t * 0.052, -t * 0.078), blur * 1.16);
  let driftB = lqFbm(glsRotate(q, 1.21) * 1.34
                     + vec2<f32>(-t * 0.064, t * 0.041), blur * 1.34);
  q = q + vec2<f32>(driftA.x - 0.5, driftB.x - 0.5)
          * (0.34 + u.warp * 0.105);

  let body = lqFbm(q * 1.42 + vec2<f32>(driftB.x * 0.82, driftA.x * 0.66),
                   blur * 1.42);
  let ribbonPhase = q.y * (2.2 + u.warp * 0.11)
                  + sin(q.x * 1.72 - t * 0.19) * 0.92
                  + sin((q.x + q.y) * 1.08 + t * 0.13) * 0.46;
  let ribbon = pow(clamp(1.0 - abs(sin(ribbonPhase)), 0.0, 1.0),
                   0.82 + u.sharp * 0.23);
  let fold = lqRidgeS(lqFbm(q * 2.05 + vec2<f32>(2.8, -t * 0.037),
                            blur * 2.05), 0.9 + u.sharp * 0.32);
  let value = clamp(body.x * 0.5 + driftA.x * 0.16
                    + ribbon * (0.2 + u.ridgeAmt * 0.2)
                    + fold * u.ridgeAmt * 0.18, 0.0, 1.0);

  var color = lqRamp(value, u.colorA.rgb, u.colorB.rgb, u.colorC.rgb, u.colorD.rgb);
  let caustic = pow(ribbon, 3.1) * (0.24 + 0.28 * u.ridgeAmt)
               + pow(fold, 4.2) * 0.08;
  color = mix(color, u.colorD.rgb, clamp(caustic, 0.0, 0.52));
  color = color * (0.7 + depth * 0.3);
  let key = pow(max(dot(normalize(vec3<f32>(p, depth)),
                        normalize(vec3<f32>(-0.42, 0.58, 0.9))), 0.0), 4.0);
  color = mix(color, u.highlightColor.rgb, key * 0.055);
  return glsFinishPresetFluid(color, p);
}

fn glsParticleRibbonFluid(p: vec2<f32>, t: f32) -> vec3<f32> {
  // The visible body is emitted by the dedicated particle pipeline. Keeping
  // this branch empty lets the shared fullscreen pass contribute only the
  // optional glass shell and its transparent background contract.
  return vec3<f32>(0.0);
}

// ---------------------------------------------------------------------------
// GLIMMER: original flow programs (not from upstream).
// ---------------------------------------------------------------------------

// Nebula (style 30): two logarithmic spiral arms advected by fbm, a hot core,
// and a sparse twinkling star field. Warp tightens the spiral, Sharp thins the
// arms, Ridge brightens them.
fn glmRotate(p: vec2<f32>, angle: f32) -> vec2<f32> {
  let c = cos(angle);
  let s = sin(angle);
  return vec2<f32>(c * p.x - s * p.y, s * p.x + c * p.y);
}

fn glmNebulaFluid(p: vec2<f32>, t: f32) -> vec3<f32> {
  let q = p / (0.78 + u.zoom * 0.5);
  let r = length(q);
  let angle = atan2(q.y, q.x);
  let bend = lqFbm(q * 1.9 + vec2<f32>(t * 0.05, -t * 0.04), 0.02).x;
  let swirl = angle + t * 0.21 - log(max(r, 0.015)) * (1.4 + u.warp * 0.22);
  // cos(2 * swirl) is continuous across atan2's seam, so the arms never tear.
  let arms = pow(0.5 + 0.5 * cos(2.0 * swirl + bend * 3.6), 1.0 + u.sharp * 0.75);
  let dust = lqFbm(glmRotate(q, t * 0.09) * 3.1 + vec2<f32>(4.2), 0.03).x;
  let core = exp(-r * r * 16.0);
  let falloff = 1.0 - smoothstep(0.1, 1.1, r);
  let v = clamp(arms * (0.4 + 0.7 * dust) * falloff * (0.45 + u.ridgeAmt * 0.8)
                + core * 0.6 + dust * 0.1, 0.0, 0.92);
  var color = lqRamp(v, u.colorA.rgb, u.colorB.rgb, u.colorC.rgb, u.colorD.rgb);

  let cellPos = glmRotate(q, t * 0.03) * 24.0;
  let cell = floor(cellPos);
  let seed = lqHash(cell + vec2<f32>(17.0, 3.0));
  let local = fract(cellPos) - vec2<f32>(0.5);
  let twinkle = 0.55 + 0.45 * sin(t * 2.7 + seed * 41.0);
  let star = step(0.955, seed) * smoothstep(0.22, 0.0, length(local)) * twinkle;
  color = color + u.highlightColor.rgb * star * (0.9 - core);
  color = mix(color, u.highlightColor.rgb, core * 0.3);
  return glsFinishPresetFluid(color, p);
}

// Sonar (style 31): concentric pulses leaving the centre, bent by noise, with a
// rotating sweep beam and contacts that flare when the beam passes them.
// Band density sets the ring count, Warp how far noise bends them.
fn glmSonarFluid(p: vec2<f32>, t: f32) -> vec3<f32> {
  let q = p / (0.85 + u.zoom * 0.3);
  let r = length(q);
  let angle = atan2(q.y, q.x);
  let n = lqFbm(q * 1.7 + vec2<f32>(t * 0.05, t * 0.035), 0.025).x;
  // A few thin pulses travelling outward, fading as they spread.
  let ringPhase = r * (1.2 + u.bandDensity * 0.9) - t * 0.55 + (n - 0.5) * u.warp * 0.35;
  let rings = pow(0.5 + 0.5 * cos(ringPhase * 6.28318530718), 6.0 + u.sharp * 6.0)
              * (1.0 - smoothstep(0.35, 1.0, r)) * 0.8;
  let beamAngle = angle - t * 0.9;
  // \`behind\` is 0 right where the beam is and grows through the area it has
  // already swept, so the afterglow trails it and the leading edge stays crisp.
  let behind = fract(-beamAngle / 6.28318530718);
  let beam = pow(max(cos(beamAngle), 0.0), 40.0) + 0.6 * exp(-behind * 7.0);
  let cellPos = q * 5.5;
  let seed = lqHash(floor(cellPos) + vec2<f32>(5.0, 11.0));
  let contactAngle = atan2(floor(cellPos).y + 0.5, floor(cellPos).x + 0.5);
  let wake = fract(-(contactAngle - t * 0.9) / 6.28318530718);
  let contact = step(0.9, seed) * smoothstep(0.32, 0.0, length(fract(cellPos) - vec2<f32>(0.5)))
                * exp(-wake * 5.0) * step(r, 0.92);
  let grid = (1.0 - smoothstep(0.0, 0.012, abs(fract(r * 4.0 + 0.5) - 0.5))) * 0.06;
  let v = clamp(0.12 + n * 0.2 + grid + rings * (0.35 + u.ridgeAmt * 0.5)
                + beam * 0.5 * (1.0 - r * 0.6), 0.0, 1.0);
  var color = lqRamp(v, u.colorA.rgb, u.colorB.rgb, u.colorC.rgb, u.colorD.rgb);
  color = color + u.highlightColor.rgb * contact * 1.2;
  return glsFinishPresetFluid(color, p);
}

fn glsPresetFluid(p: vec2<f32>, style: i32, t: f32) -> vec3<f32> {
  if (style == 9) { return glsSiriFluid(p, t); }
  if (style == 10) { return glsAuroraFluid(p, t); }
  if (style == 11) { return glsPlasmaFluid(p, t); }
  if (style == 12) { return glsChromeFluid(p, t); }
  if (style == 13) { return glsOpalFluid(p, t); }
  if (style == 14) { return glsSpectrumFluid(p, t); }
  if (style == 15) { return glsFrostFluid(p, t); }
  if (style == 19) { return glsVoiceWaveFluid(p, t); }
  if (style == 20) { return glsBlueDropFluid(p, t); }
  if (style == 21) { return glsVioletEmberFluid(p, t); }
  if (style == 22) { return glsChromaticMetalFluid(p, t); }
  if (style == 23) { return glsRefractiveBlobFluid(p, t); }
  if (style == 24) { return glsParticleRibbonFluid(p, t); }
  // GLIMMER: original flows.
  if (style == 30) { return glmNebulaFluid(p, t); }
  if (style == 31) { return glmSonarFluid(p, t); }
  return glsFrostFluid(p, t);
}

// ---------------------------------------------------------------------------
// The fluid, at one point, already blurred and straight (not premultiplied):
// the sheet's shader on \`fu\` — both programs, all four inner branches, and the
// shared shade tail — with the blur folded into the noise bank as above. The
// disc's own alpha is the caller's, because it is analytic now.
// ---------------------------------------------------------------------------
fn glsFluid(fu: vec2<f32>, md: i32, t: f32) -> vec3<f32> {
  let df = length(fu);

  let cA = u.colorA.rgb;
  let cB = u.colorB.rgb;
  let cC = u.colorC.rgb;
  let cD = u.colorD.rgb;

  // The blur's sigma, carried from fluid units into the fluid's own domains.
  // \`sp\` is it in pp/q units — the warp shifts q about but does not stretch it
  // on average, so pp and q share one. \`sw\` is the warp field's own, softened
  // by GL_KWA.
  let blurSigma = select(GL_BSIG_CLEAR, GL_BSIG_GLASS, u.glassEnabled > 0.5);
  let sp = blurSigma * u.zoom;
  let sw = sp * 1.1 * GL_KWA;

  var fcol: vec3<f32>;
  if (md < 0) {
    // progA — the warped body, the only branch with the slow vertical drift
    // and the only one that reads Ridge.
    var pp = fu * u.zoom;
    pp.y = pp.y + t * 0.05;
    let w = vec2<f32>(lqFbm(pp * 1.1 + vec2<f32>(0.0, t * 0.09), sw).x,
                      lqFbm(pp * 1.1 + vec2<f32>(7.7, -t * 0.07), sw).x);
    let q = pp + u.warp * (w - vec2<f32>(0.5));
    let body  = lqFbm(q * 1.5 + vec2<f32>(t * 0.04, 0.0), sp * 1.5);
    let veins = lqRidgeS(lqFbm(q * 2.2 + vec2<f32>(3.1), sp * 2.2), u.sharp);
    let v = mix(lqStepS(body, 0.12, 0.88),
                clamp(veins * 0.85 + 0.45 * body.x, 0.0, 1.0), u.ridgeAmt);
    fcol = lqRamp(v, cA, cB, cC, cD);
  } else {
    // progB — same warp, no vertical drift, four inner branches.
    let pp = fu * u.zoom;
    let w = vec2<f32>(lqFbm(pp * 1.1 + vec2<f32>(0.0, t * 0.09), sw).x,
                      lqFbm(pp * 1.1 + vec2<f32>(7.7, -t * 0.07), sw).x);
    let q = pp + u.warp * (w - vec2<f32>(0.5));
    if (md == 0) {
      // Nectar — a sine band the noise leans on. The fbm is INSIDE the sine, so
      // the removed detail integrates out in closed form rather than by
      // quadrature: E[sin(A + 6e)] = sin(A)·exp(-18·sd²). The second term of
      // the exponent is the same integral for the sine's own \`q.x * 7.0\`, which
      // the blur attenuates by exp(-49·sp²/2).
      let n0 = lqFbm(q * 2.2, sp * 2.2);
      let damp = exp(-18.0 * n0.y * n0.y - 24.5 * sp * sp);
      var v = 0.5 + 0.5 * damp * sin(q.x * 7.0 + n0.x * 6.0 + t * 0.35);
      v = mix(v, lqFbm(q * 1.4 + vec2<f32>(t * 0.03), sp * 1.4).x, 0.25);
      fcol = lqRamp(v, cA, cB, cC, cD);
    } else if (md == 1) {
      // Lumen — two ridged fields multiplied into filaments. The two fields are
      // independent, so each integrates its own detail out before the product.
      let v = lqRidgeS(lqFbm(q * 1.4 + vec2<f32>(t * 0.06, 0.0), sp * 1.4), u.sharp)
            * lqRidgeS(lqFbm(q * 1.7 - vec2<f32>(0.0, t * 0.05), sp * 1.7), u.sharp);
      fcol = lqRamp(pow(v, 0.7), cA, cB, cC, cD);
    } else if (md == 6) {
      // Sprig — noise warped by noise, with a ridged edge darkening it.
      let v = lqFbm(q * 1.3 + vec2<f32>(1.5 * lqFbm(q * 2.6 + vec2<f32>(t * 0.025), sp * 2.6).x), sp * 1.3);
      let edge = lqRidgeS(lqFbm(q * 2.1 + vec2<f32>(7.0), sp * 2.1), 1.3);
      fcol = lqRamp(lqStepS(v, 0.1, 0.9), cA, cB, cC, cD);
      fcol = fcol * (1.0 - 0.18 * edge);
    } else {
      // Haze and Smoke — the same rising plume at two palettes.
      let q2 = q + vec2<f32>(0.0, -t * 0.14);
      let v = lqFbm(q2 * 1.6 + vec2<f32>(2.2 * lqFbm(q2 * 2.4 + vec2<f32>(0.0, -t * 0.05), sp * 2.4).x), sp * 1.6);
      fcol = lqRamp(lqPowS(v, 1.5), cA, cB, cC, cD);
    }
  }

  // The sheet's shared tail: a highlight up-left, a shadow down-right, and a
  // darkened limb. All three are far below the blur's cutoff, so they are the
  // sheet's own expressions untouched. The grain term the sheet ends on is not
  // ported — see the header. The two \`1 - shade*k*smoothstep(...)\` terms are
  // multiplicative darkening, not colours, so they stay literal.
  fcol = mix(fcol, u.highlightColor.rgb,
             u.shade * 0.3 * smoothstep(0.25, 1.25, dot(fu, vec2<f32>(-0.32, 0.78))));
  fcol = fcol * (1.0 - u.shade * 0.42 * smoothstep(-0.05, 1.25, dot(fu, vec2<f32>(0.45, -0.62))));
  fcol = fcol * (1.0 - u.shade * 0.3 * smoothstep(0.72, 1.0, df));
  return clamp(fcol, vec3<f32>(0.0), vec3<f32>(1.0));
}

// ---------------------------------------------------------------------------
// The shell.
// ---------------------------------------------------------------------------

// Source-over onto an opaque destination, straight (un-premultiplied) sRGB.
fn glsOver(dst: vec3<f32>, src: vec3<f32>, a: f32) -> vec3<f32> {
  let k = clamp(a, 0.0, 1.0);
  return src * k + dst * (1.0 - k);
}

fn glsRefractionProfile(t: f32) -> f32 {
  let depth = clamp(t, 0.0, 1.0);
  let circular = sqrt(max(1.0 - (1.0 - depth) * (1.0 - depth), 0.0));
  return 1.0 - circular;
}

fn glsHighlightLobe(normal: vec2<f32>, direction: vec2<f32>, cut: f32,
                     power: f32) -> f32 {
  let angular = clamp((dot(normal, direction) - cut) / max(1.0 - cut, 0.001),
                      0.0, 1.0);
  return pow(angular, power);
}

fn glsContourWave(angle: f32, t: f32) -> vec2<f32> {
  let style = i32(u.style + 0.5);
  if (style == 19) {
    let wave = sin(angle * 2.0 + t * 0.27) * 0.72
               + sin(angle * 4.0 - t * 0.16 + 2.1) * 0.28;
    let slope = cos(angle * 2.0 + t * 0.27) * 1.44
                + cos(angle * 4.0 - t * 0.16 + 2.1) * 1.12;
    return vec2<f32>(wave, slope);
  }
  let wave = sin(angle * 3.0 + t * 0.62) * 0.52
             + sin(angle * 5.0 - t * 0.41 + 1.7) * 0.31
             + sin(angle * 2.0 + t * 0.23 + 3.1) * 0.17;
  let slope = cos(angle * 3.0 + t * 0.62) * 1.56
              + cos(angle * 5.0 - t * 0.41 + 1.7) * 1.55
              + cos(angle * 2.0 + t * 0.23 + 3.1) * 0.34;
  return vec2<f32>(wave, slope);
}

fn glsContourStrength() -> f32 {
  if (u.style >= 18.5) { return 0.11; }
  return select(0.09, 0.16, u.style >= 15.5);
}

fn glsContourScale(uv: vec2<f32>, t: f32, amount: f32) -> f32 {
  if (amount <= 0.0) { return 1.0; }
  let contour = glsContourWave(atan2(uv.y, uv.x), t);
  return 1.0 + clamp(amount, 0.0, 1.0) * glsContourStrength() * contour.x;
}

fn glsContourNormal(uv: vec2<f32>, rad: f32, t: f32, amount: f32) -> vec2<f32> {
  let distance = length(uv);
  if (distance <= 0.0001) { return vec2<f32>(0.0); }
  let radial = uv / distance;
  let contour = glsContourWave(atan2(uv.y, uv.x), t);
  let slope = clamp(amount, 0.0, 1.0) * glsContourStrength() * contour.y;
  let tangent = vec2<f32>(-radial.y, radial.x);
  return normalize(radial - tangent * (rad * slope / distance));
}

fn glsRefractionNormal(base: vec2<f32>, p: vec2<f32>, t: f32,
                       style: i32) -> vec2<f32> {
  if (style != 23) { return base; }
  let tangent = vec2<f32>(-base.y, base.x);
  let a = lqFbm(p * 2.15 + vec2<f32>(t * 0.061, -t * 0.043), 0.018).x;
  let b = lqFbm(glsRotate(p, 1.37) * 2.55
                  + vec2<f32>(-t * 0.037, t * 0.052), 0.021).x;
  let wave = (a - b) * 0.76 + sin(atan2(p.y, p.x) * 3.0 + t * 0.21) * 0.08;
  return normalize(base + tangent * wave);
}

fn orbGlassLiquidAnim(uv01: vec2<f32>) -> vec4<f32> {
  // The runner hands uv01 with y down from the top, like stitchable MSL's
  // \`position\`; the orb was authored bottom-left, so flip back.
  let fc = vec2<f32>(uv01.x, 1.0 - uv01.y) * u.size;
  let uv = (2.0 * fc - u.size) / max(min(u.size.x, u.size.y), 1.0);

  let rad = max(u.radius, 0.05);
  let t = u.time * u.speed;
  let s = i32(u.style + 0.5);
  let emissionOnly = u.glassEnabled <= 0.5 && (s == 9 || s == 14 || s == 24);
  let contourRad = rad * glsContourScale(uv, t, u.contourDeform);

  // Nothing on this pixel — and here that is the whole fluid and the whole
  // shell skipped, over roughly 60% of the quad. 1.01 is the far edge of the
  // ball's own coverage, \`1 - smoothstep(0.99, 1.01, pd)\` on the last line of
  // this function, which is EXACTLY zero past it, so the full path already
  // returns opaque black here. An early-out, not a clip: the number is that
  // coverage term's own far edge, so do not "tidy" it to 1.0 — that would
  // shave the outer half of the limb's antialiasing.
  //
  // Tested on \`uv\` rather than on \`pd\` because \`|uv| > rad * 1.01\` IS
  // \`pd > 1.01\`, and it keeps \`p\` and \`pd\` in the same basic block as
  // everything that reads them — the shape the four sibling orbs of this port
  // need, where branching on \`d\` after computing it makes the compiler stop
  // folding \`uv / rad\` into its uses and the moved last bit comes back through
  // their grain hash as speckle up to 34/255. Glass Liquid has no grain and is
  // nearly immune either way: at 1024x1024 this costs under a dozen bytes of a
  // four-million-byte frame, off by 1/255. Those are the branch existing, not a
  // pixel wrongly skipped — a copy of this guard with a threshold it can never
  // reach diffs identically, and against it the guard is exactly 0/255.
  if (length(uv) > contourRad * (1.01 + mfEdgeD(u.edgeSoftness))) {
    // Off the ball entirely — but the halo lives out here, so hand back
    // what the edge bank paints on nothing. Exactly black at Glow 0.
    let halo = clamp(mfEdgeGlow(vec3<f32>(0.0), uv, vec2<f32>(0.0), contourRad,
                                u.edgeSoftness, u.edgeGlow, u.glowColor.rgb),
                     vec3<f32>(0.0), vec3<f32>(1.0));
    let haloAlpha = max(halo.r, max(halo.g, halo.b));
    return vec4<f32>(halo, haloAlpha);
  }

  let p   = uv / contourRad;     // deformed ball space: |p| == 1 on the edge
  let pd  = length(p);

  // ---- the fluid ------------------------------------------------------
  let fu = p / GL_FU;

  // Branch dispatch. Source indices 0/2/4/6 are progA (md < 0); the others are
  // progB at the sheet's own mode number. An if-chain avoids a runtime-indexed
  // lookup here.
  var md: i32 = -1;
  if (s == 1) { md = 1; }
  else if (s == 3 || s == 8) { md = 7; }
  else if (s == 5) { md = 6; }
  else if (s == 7) { md = 0; }

  let clearFa = 1.0 - smoothstep(GL_CLEAR_EA, GL_CLEAR_EB, pd);
  let contourNormal = glsContourNormal(uv, rad, t, u.contourDeform);
  let normal = glsRefractionNormal(contourNormal, p, t, s);
  let edgeDepth = max(1.0 - pd, 0.0);
  let refractionWidth = 0.015 + 0.95 * clamp(u.shellMidAlpha, 0.0, 1.0);
  let refractionT = edgeDepth / max(refractionWidth, 0.001);
  let refractionProfile = pow(glsRefractionProfile(refractionT), 0.68);
  let refractionAmount = 1.6 * clamp(u.glassOpacity, 0.0, 1.0)
                         * refractionProfile;
  let refractedP = p - normal * refractionAmount;
  var fcol = vec3<f32>(0.0);
  if (clearFa > 0.0) {
    if (s >= 9) {
      if (u.glassEnabled > 0.5) {
        // Three actual fluid evaluations produce optical dispersion. At the
        // outer boundary the reference lens pulls samples from deep inside the
        // orb; the channels converge continuously at the inner edge of the
        // refraction band.
        let channelSplit = 0.14 * clamp(u.gloss, 0.0, 2.0)
                           * clamp(u.glassOpacity, 0.0, 1.0)
                           * refractionProfile;
        let redSample = glsPresetFluid(refractedP - normal * channelSplit, s, t);
        let greenSample = glsPresetFluid(refractedP, s, t);
        let blueSample = glsPresetFluid(refractedP + normal * channelSplit, s, t);
        fcol = vec3<f32>(redSample.r, greenSample.g, blueSample.b);
      }
      else { fcol = glsPresetFluid(p, s, t); }
    }
    else { fcol = glsFluid(fu, md, t); }
  }

  // Voice-like presets become a true emissive layer when glass is disabled.
  // Their empty pixels no longer inherit the opaque circular canvas fill.
  let lum = dot(fcol, vec3<f32>(0.213, 0.715, 0.072));
  let clearSat = clamp(vec3<f32>(lum) + (fcol - vec3<f32>(lum)) * 1.22,
                       vec3<f32>(0.0), vec3<f32>(1.0));
  let particleGlassOverlay = s == 24;
  var col = select(
    glsOver(u.canvasColor.rgb, clearSat, 0.99 * clearFa),
    vec3<f32>(0.0),
    particleGlassOverlay,
  );
  if (emissionOnly) {
    let signal = max(clearSat.r, max(clearSat.g, clearSat.b));
    let emissionCoverage = smoothstep(0.025, 0.16, signal);
    col = clearSat * emissionCoverage;
  }
  if (u.glassEnabled > 0.5) {
    // Surface lighting stays on a thin arc. The broad visual change comes from
    // the refracted fluid above, not from a translucent white overlay.
    // Its weights still need enough contrast to keep the exposed colour and
    // highlight controls perceptible in the compact scene preview.
    let surfaceWidth = select(
      0.026 + 0.055 * clamp(u.shellEdgeAlpha, 0.0, 1.0),
      0.09 + 0.12 * clamp(u.shellEdgeAlpha, 0.0, 1.0),
      particleGlassOverlay,
    );
    let surfaceBand = (1.0 - smoothstep(0.0, surfaceWidth, edgeDepth)) * clearFa;
    let opticalRim = pow(surfaceBand, select(1.8, 1.3, particleGlassOverlay));
    let innerRimAlpha = select(
      opticalRim * u.glassOpacity * 0.45,
      opticalRim * u.glassOpacity * 0.14,
      particleGlassOverlay,
    );
    col = glsOver(col, u.shellInner.rgb, innerRimAlpha);

    let coolDirection = normalize(vec2<f32>(0.84, 0.54));
    let warmDirection = normalize(vec2<f32>(-0.62, -0.78));
    let coolSplit = glsHighlightLobe(normal, coolDirection, -0.32, 1.8);
    let warmSplit = glsHighlightLobe(normal, warmDirection, -0.28, 2.0);
    let dispersion = opticalRim * clamp(u.gloss, 0.0, 2.0)
                     * (0.8 + 0.8 * u.shellEdgeAlpha);
    col = glsOver(col, u.shellMid.rgb, dispersion * coolSplit);
    col = glsOver(col, u.shellEdge.rgb, dispersion * warmSplit);

    let edgeShadow = opticalRim * (0.015 + 0.15 * u.shellEdgeAlpha)
                     * (0.15 + 0.85 * max(dot(normal, vec2<f32>(0.45, -0.89)), 0.0));
    col = col * (1.0 - edgeShadow);

    let keyDirection = normalize(vec2<f32>(-0.68, 0.73));
    let fillDirection = normalize(vec2<f32>(0.74, -0.67));
    let key = opticalRim * glsHighlightLobe(normal, keyDirection, 0.2, 2.8)
              * clamp(u.sheen, 0.0, 2.0) * 1.4;
    let fill = opticalRim * glsHighlightLobe(normal, fillDirection, 0.4, 3.6)
               * clamp(u.sheen, 0.0, 2.0) * 1.0;
    col = glsOver(col, u.sheenColor.rgb, key);
    col = glsOver(col, u.specColor.rgb, fill);
  }

  // The ball's own edge, and nothing outside it — everything the effect does
  // not paint must be exactly 0 so the page shows through.
  let ballA = 1.0 - smoothstep(0.99 - mfEdgeD(u.edgeSoftness), 1.01 + mfEdgeD(u.edgeSoftness), pd);
  col = clamp(col * max(u.exposure, 0.0), vec3<f32>(0.0), vec3<f32>(1.0)) * ballA;
  // The Orbs edge bank — the Edge group's Glow. Adding zero is exactly
  // the render this file was diffed against, and zero is the default.
  let edged = mfEdgeGlow(col, uv, vec2<f32>(0.0), contourRad,
                         u.edgeSoftness, u.edgeGlow, u.glowColor.rgb);
  let finalColor = clamp(edged, vec3<f32>(0.0), vec3<f32>(1.0));
  let emissionAlpha = max(finalColor.r, max(finalColor.g, finalColor.b));
  let sphereAlpha = clamp(max(ballA, emissionAlpha), 0.0, 1.0);
  let finalAlpha = select(
    sphereAlpha,
    emissionAlpha,
    emissionOnly || particleGlassOverlay,
  );
  return vec4<f32>(finalColor, finalAlpha);
}


struct VOut {
  @builtin(position) pos: vec4<f32>,
  @location(0) uv: vec2<f32>,
};

@vertex
fn vs_main(@builtin(vertex_index) i: u32) -> VOut {
  var p = array<vec2<f32>, 3>(
    vec2<f32>(-1.0, -1.0),
    vec2<f32>( 3.0, -1.0),
    vec2<f32>(-1.0,  3.0),
  );
  var out: VOut;
  out.pos = vec4<f32>(p[i], 0.0, 1.0);
  let uv01 = (p[i] + vec2<f32>(1.0)) * 0.5;
  out.uv = vec2<f32>(uv01.x, 1.0 - uv01.y);
  return out;
}

@fragment
fn fs_main(in: VOut) -> @location(0) vec4<f32> {
  let c = orbGlassLiquidAnim(in.uv);

  let fc = vec2<f32>(in.uv.x, 1.0 - in.uv.y) * u.size;
  let uv = (2.0 * fc - u.size) / max(min(u.size.x, u.size.y), 1.0);
  let rad = max(u.radius, 0.05);
  let t = u.time * u.speed;
  let contourRad = rad * glsContourScale(uv, t, u.contourDeform);
  let q = (2.0 * fc - u.size) / u.size;
  let fitEnd = 1.0;
  let fitFeather = 2.0 / max(min(u.size.x, u.size.y), 1.0);
  let fitStart = min(mix(contourRad, fitEnd, 0.5), fitEnd - fitFeather);
  let fit = 1.0 - smoothstep(fitStart, fitEnd, max(abs(q.x), abs(q.y)));
  return vec4<f32>(c.rgb * fit, c.a * fit);
}

const PR_U_SEGMENTS: u32 = 384u;
const PR_V_SEGMENTS: u32 = 96u;
const PR_PARTICLES_PER_LAYER: u32 = PR_U_SEGMENTS * PR_V_SEGMENTS;

struct RibbonOut {
  @builtin(position) pos: vec4<f32>,
  @location(0) local: vec2<f32>,
  @location(1) color: vec3<f32>,
  @location(2) opacity: f32,
};

fn prHash(value: f32) -> f32 {
  return fract(sin(value * 12.9898 + 78.233) * 43758.5453);
}

fn prRotateX(p: vec3<f32>, angle: f32) -> vec3<f32> {
  let c = cos(angle);
  let s = sin(angle);
  return vec3<f32>(p.x, c * p.y - s * p.z, s * p.y + c * p.z);
}

fn prRotateY(p: vec3<f32>, angle: f32) -> vec3<f32> {
  let c = cos(angle);
  let s = sin(angle);
  return vec3<f32>(c * p.x + s * p.z, p.y, -s * p.x + c * p.z);
}

fn prCurve(theta: f32, layer: f32, phase: f32) -> vec3<f32> {
  let local = theta + layer * 0.11;
  let foldPhase = 2.0 * local + phase * (0.72 + layer * 0.025);
  let fold = clamp(u.ribbonFold, 0.0, 1.2);
  let radial = 0.4 + (0.085 + fold * 0.04) * cos(foldPhase);
  let orbit = local + phase * 0.13
              + sin(local - phase * 0.22 + layer) * fold * 0.13;
  let vertical = (0.235 + fold * 0.085) * sin(foldPhase)
                 + 0.055 * sin(local * 3.0 - phase * 0.46 + layer * 0.7);
  return vec3<f32>(radial * cos(orbit), vertical, radial * sin(orbit));
}

fn prPalette(valueIn: f32) -> vec3<f32> {
  let value = fract(valueIn) * 4.0;
  if (value < 1.0) { return mix(u.colorA.rgb, u.colorB.rgb, value); }
  if (value < 2.0) { return mix(u.colorB.rgb, u.colorC.rgb, value - 1.0); }
  if (value < 3.0) { return mix(u.colorC.rgb, u.colorD.rgb, value - 2.0); }
  return mix(u.colorD.rgb, u.colorA.rgb, value - 3.0);
}

@vertex
fn ribbon_vs_main(
  @builtin(vertex_index) vertexIndex: u32,
  @builtin(instance_index) instanceIndex: u32,
) -> RibbonOut {
  var corners = array<vec2<f32>, 6>(
    vec2<f32>(-1.0, -1.0), vec2<f32>(1.0, -1.0), vec2<f32>(-1.0, 1.0),
    vec2<f32>(-1.0, 1.0), vec2<f32>(1.0, -1.0), vec2<f32>(1.0, 1.0),
  );
  let layerIndex = instanceIndex / PR_PARTICLES_PER_LAYER;
  let particleIndex = instanceIndex % PR_PARTICLES_PER_LAYER;
  let uIndex = particleIndex / PR_V_SEGMENTS;
  let vIndex = particleIndex % PR_V_SEGMENTS;
  let layer = f32(layerIndex);
  let random = prHash(f32(instanceIndex));
  let activeLayer = layer < floor(clamp(u.ribbonCount, 2.0, 6.0) + 0.5);

  let uCoord = (f32(uIndex) + prHash(f32(instanceIndex) + 11.0) * 0.56)
               / f32(PR_U_SEGMENTS);
  let vCoord = (f32(vIndex) + prHash(f32(instanceIndex) + 29.0) * 0.46)
               / f32(PR_V_SEGMENTS);
  let strip = vCoord * 2.0 - 1.0;
  let t = u.time * u.speed;
  let phase = t * 0.48;
  let arc = fract(uCoord + layer * 0.211 - phase * 0.019);
  let arcLength = 0.76 + 0.055 * sin(t * 0.23 + layer * 1.71);
  let arcPosition = arc / arcLength;
  let arcEnvelope = smoothstep(0.0, 0.075, arcPosition)
                    * (1.0 - smoothstep(0.88, 1.0, arcPosition));
  let particleVisible = activeLayer
                        && arc <= arcLength
                        && random <= clamp(u.particleDensity, 0.2, 1.0);
  let theta = uCoord * 6.28318530718;
  let center = prCurve(theta, layer, phase);
  let ahead = prCurve(theta + 0.006, layer, phase);
  let tangent = normalize(ahead - center);
  let radial = normalize(center + vec3<f32>(0.001, 0.013, 0.007));
  let side = normalize(cross(tangent, radial));
  let surfaceNormal = normalize(cross(side, tangent));
  let twist = theta * (0.72 + u.ribbonTwist * 0.58)
              + phase * 0.74 + layer * 1.17;
  let ribbonDirection = normalize(side * cos(twist) + surfaceNormal * sin(twist));
  let widthEnvelope = (0.72 + 0.28 * pow(sin(theta * 1.5 + phase + layer), 2.0))
                      * mix(0.42, 1.0, sqrt(max(arcEnvelope, 0.0)));
  var position = center + ribbonDirection * strip * u.ribbonWidth * 0.5 * widthEnvelope;

  let pulse = sin(t * 0.73 + layer * 1.71)
              + 0.44 * sin(t * 1.17 + layer * 0.83 + 1.2);
  position *= 1.0 + u.ribbonBreath * pulse * 0.16;
  let layerCenter = layer
                    - (floor(clamp(u.ribbonCount, 2.0, 6.0) + 0.5) - 1.0) * 0.5;
  position = prRotateY(
    position,
    layerCenter * 0.24 + sin(t * 0.19 + layer * 1.3) * 0.055,
  );
  position = prRotateX(
    position,
    layerCenter * 0.14 + cos(t * 0.17 + layer * 0.9) * 0.04,
  );
  position = prRotateY(position, t * 0.105 + sin(t * 0.21) * 0.11);
  position = prRotateX(position, -0.2 + sin(t * 0.16 + layer * 0.1) * 0.16);

  let minSize = max(min(u.size.x, u.size.y), 1.0);
  let depthScale = 0.88 + position.z * 0.16;
  let orbPosition = position.xy * u.radius * 1.45 * depthScale;
  let clip = vec2<f32>(
    orbPosition.x * minSize / max(u.size.x, 1.0),
    orbPosition.y * minSize / max(u.size.y, 1.0),
  );
  let canvasParticleScale = clamp(minSize / 640.0, 0.22, 1.0);
  let pointPixels = max(0.6, u.particleSize)
                    * (1.5 + u.particleBloom * 2.5)
                    * (0.92 + position.z * 0.18)
                    * canvasParticleScale;
  let corner = corners[vertexIndex];
  let pointOffset = corner * pointPixels * 2.0 / max(u.size, vec2<f32>(1.0));

  let colorPhase = uCoord * 0.32 + layer * 0.19 + phase * 0.025
                   + position.z * 0.08;
  let stripEdge = smoothstep(0.58, 1.0, abs(strip));
  let front = clamp(0.78 + position.z * 0.54, 0.5, 1.24);
  let baseOpacity = mix(0.025, 0.009, clamp(u.shade / 1.5, 0.0, 1.0));
  var out: RibbonOut;
  out.pos = select(
    vec4<f32>(2.0, 2.0, 1.0, 1.0),
    vec4<f32>(clip + pointOffset, clamp(0.5 - position.z * 0.12, 0.05, 0.95), 1.0),
    particleVisible,
  );
  out.local = corner;
  out.color = pow(
    mix(prPalette(colorPhase), u.highlightColor.rgb, stripEdge * 0.56),
    vec3<f32>(0.72),
  ) * front;
  out.opacity = select(
    0.0,
    baseOpacity
      * (0.72 + stripEdge * 1.28)
      * arcEnvelope
      * pow(canvasParticleScale, 1.35),
    particleVisible,
  );
  return out;
}

@fragment
fn ribbon_fs_main(in: RibbonOut) -> @location(0) vec4<f32> {
  let distanceSquared = dot(in.local, in.local);
  if (distanceSquared > 1.0) { discard; }
  let core = exp(-distanceSquared * 4.8);
  let halo = exp(-distanceSquared * 1.35);
  let bloom = clamp(u.particleBloom, 0.0, 2.0);
  let intensity = in.opacity * (core * 1.9 + halo * bloom * 0.72)
                  * max(u.exposure, 0.0);
  let glowMix = clamp((halo - core * 0.45) * (0.18 + u.edgeGlow * 0.5), 0.0, 0.7);
  let color = mix(in.color, u.glowColor.rgb, glowMix);
  let alpha = clamp(intensity, 0.0, 1.0);
  return vec4<f32>(color * alpha, alpha);
}

@group(0) @binding(1) var ribbonTexture: texture_2d<f32>;
@group(0) @binding(2) var ribbonSampler: sampler;

fn prTextureUvFromOrb(p: vec2<f32>, contourRad: f32) -> vec2<f32> {
  let minSize = max(min(u.size.x, u.size.y), 1.0);
  let fc = (p * contourRad * minSize + u.size) * 0.5;
  return clamp(
    vec2<f32>(fc.x / max(u.size.x, 1.0), 1.0 - fc.y / max(u.size.y, 1.0)),
    vec2<f32>(0.0),
    vec2<f32>(1.0),
  );
}

fn prSampleRibbon(p: vec2<f32>, contourRad: f32) -> vec4<f32> {
  return textureSampleLevel(
    ribbonTexture,
    ribbonSampler,
    prTextureUvFromOrb(p, contourRad),
    0.0,
  );
}

@fragment
fn ribbon_composite_fs_main(in: VOut) -> @location(0) vec4<f32> {
  let direct = textureSampleLevel(ribbonTexture, ribbonSampler, in.uv, 0.0);
  if (u.glassEnabled <= 0.5) { return direct; }

  let fc = vec2<f32>(in.uv.x, 1.0 - in.uv.y) * u.size;
  let minSize = max(min(u.size.x, u.size.y), 1.0);
  let uv = (2.0 * fc - u.size) / minSize;
  let rad = max(u.radius, 0.05);
  let t = u.time * u.speed;
  let contourRad = rad * glsContourScale(uv, t, u.contourDeform);
  let shell = orbGlassLiquidAnim(in.uv);
  if (length(uv) > contourRad * (1.01 + mfEdgeD(u.edgeSoftness))) {
    return shell;
  }

  let p = uv / contourRad;
  let pd = length(p);
  let clearFa = 1.0 - smoothstep(GL_CLEAR_EA, GL_CLEAR_EB, pd);
  let normal = glsContourNormal(uv, rad, t, u.contourDeform);
  let edgeDepth = max(1.0 - pd, 0.0);
  let refractionWidth = 0.015 + 0.95 * clamp(u.shellMidAlpha, 0.0, 1.0);
  let refractionT = edgeDepth / max(refractionWidth, 0.001);
  let refractionProfile = pow(glsRefractionProfile(refractionT), 0.68);
  let refractionAmount = 1.6 * clamp(u.glassOpacity, 0.0, 1.0)
                         * refractionProfile;
  let refractedP = p - normal * refractionAmount;
  let channelSplit = 0.14 * clamp(u.gloss, 0.0, 2.0)
                     * clamp(u.glassOpacity, 0.0, 1.0)
                     * refractionProfile;
  let redSample = prSampleRibbon(refractedP - normal * channelSplit, contourRad);
  let greenSample = prSampleRibbon(refractedP, contourRad);
  let blueSample = prSampleRibbon(refractedP + normal * channelSplit, contourRad);
  let refractedAlpha = max(redSample.a, max(greenSample.a, blueSample.a)) * clearFa;
  let refracted = vec4<f32>(
    vec3<f32>(redSample.r, greenSample.g, blueSample.b) * clearFa,
    refractedAlpha,
  );
  return vec4<f32>(
    shell.rgb + refracted.rgb * (1.0 - shell.a),
    shell.a + refracted.a * (1.0 - shell.a),
  );
}
`,Wb=()=>({low:0,mid:0,high:0,all:0}),Gb=[[3,`all`,0,.7,5],[6,`mid`,.85,0,7],[21,`low`,.075,0,1],[10,`high`,.16,0,2],[14,`all`,0,.12,4]],Kb={siri:.8,voiceWave:1,aurora:.65,plasma:.65,spectrum:.75,violetEmber:.7,ember:.7,nebula:.7,sonar:.75},qb=Object.fromEntries(Object.entries(Kb).map(([e,t])=>[Ly[e],t]));function Jb(e,t){let n=qb[Math.round(e[15])]??0;if(n)for(let[r,i,a,o,s]of Gb){let c=t[i],l=(Number.isFinite(c)?Math.max(0,Math.min(1,c)):0)*n;l&&(e[r]=Math.min(Math.max(s,e[r]),e[r]*(1+o*l)+a*l))}}var Yb=class{gain=.7;level=0;context=null;analyser=null;source=null;stream=null;player=null;url=null;generation=0;spectrum=new Uint8Array;waveform=new Float32Array;smoothed=Wb();stop(){this.generation++,this.stream?.getTracks().forEach(e=>e.stop()),this.source?.disconnect(),this.player&&(this.player.pause(),this.player.removeAttribute(`src`),this.player.load()),this.url&&URL.revokeObjectURL(this.url),this.context?.close().catch(()=>{}),this.context=this.analyser=this.source=this.stream=this.player=this.url=null,this.smoothed=Wb(),this.level=0}async setup(){this.stop();let e=this.generation,t=new AudioContext;return this.context=t,this.analyser=t.createAnalyser(),this.analyser.fftSize=2048,this.analyser.smoothingTimeConstant=.65,this.spectrum=new Uint8Array(this.analyser.frequencyBinCount),this.waveform=new Float32Array(this.analyser.fftSize),await t.resume(),e}async microphone(e){let t=await this.setup();if(t!==this.generation)return!1;if(!navigator.mediaDevices?.getUserMedia)throw Error(`Microphone unavailable`);let n=await navigator.mediaDevices.getUserMedia({audio:!0});return t===this.generation?(this.stream=n,this.source=this.context.createMediaStreamSource(n),this.source.connect(this.analyser),n.getAudioTracks()[0].onended=()=>{this.stream===n&&(this.stop(),e())},!0):(n.getTracks().forEach(e=>e.stop()),!1)}async file(e,t){let n=await this.setup();if(n!==this.generation)return!1;let r=document.createElement(`audio`);return r.controls=!0,r.setAttribute(`aria-label`,e.name),t.replaceChildren(r),this.player=r,this.url=URL.createObjectURL(e),r.src=this.url,this.source=this.context.createMediaElementSource(r),this.source.connect(this.analyser),this.source.connect(this.context.destination),await r.play(),n===this.generation}read(e){let t=Wb(),n=this.analyser;if(n&&this.context?.state===`running`&&(this.stream?.active||this.player&&!this.player.paused&&!this.player.ended)){n.getByteFrequencyData(this.spectrum),n.getFloatTimeDomainData(this.waveform);let e=Math.sqrt(this.waveform.reduce((e,t)=>e+t*t,0)/this.waveform.length);t.all=Math.min(1,Math.max(0,e-.004)*5.5);let r=(e,n)=>{let r=e=>Math.max(0,Math.min(this.spectrum.length-1,Math.round(e/(this.context.sampleRate/2)*this.spectrum.length))),i=r(e),a=r(n),o=0;for(let e=i;e<=a;e++)o+=this.spectrum[e];return t.all===0?0:Math.min(1,o/(a-i+1)/255*2)};t.low=r(30,200),t.mid=r(200,2e3),t.high=r(2e3,16e3)}for(let n of[`low`,`mid`,`high`,`all`]){let r=t[n]>this.smoothed[n]?.07:.24;this.smoothed[n]+=(t[n]-this.smoothed[n])*(1-Math.exp(-e/r)),this.smoothed[n]<1e-4&&(this.smoothed[n]=0)}return this.level=this.smoothed.all,Object.fromEntries(Object.entries(this.smoothed).map(([e,t])=>[e,Math.min(1,t*this.gain/.7)]))}};function Xb(e){let t=[];for(let n=0;n<e.length;n+=8)t.push(`    ${e.slice(n,n+8).join(`, `)},`);return t.join(`
`)}function Zb(e){return{idle:Uy(Nb(e,`idle`)),thinking:Uy(Nb(e,`thinking`))}}function Qb(e,t){let n=Zb(e),r=JSON.stringify(Ub);return`<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" href="data:," />
  <title>Liquid Orb</title>
  <style>
    html, body, canvas { width: 100%; height: 100%; margin: 0; }
    body { overflow: hidden; background: ${e.shared.canvasColor}; }
    canvas { display: block; }
    #status { position: fixed; inset: 0; display: grid; place-items: center; color: white; font: 14px system-ui; }
  </style>
</head>
<body>
  <canvas id="orb" aria-label="Animated liquid glass orb"></canvas>
  <div id="status" hidden></div>
  <script type="module">
    const shaderSource = ${r};
    const stateSeeds = ${JSON.stringify(n)};
    const ribbonStyleIndex = ${Ly.particleRibbon};
    const ribbonInstanceCount = ${Wy};
    const activationDurationMs = ${e.activationDuration*1e3};
    const settleDurationMs = ${e.transitionDuration*1e3};
    const canvas = document.querySelector("#orb");
    const status = document.querySelector("#status");
    let animationFrame = 0;
    let device = null;
    let ribbonTarget = null;
    let stopped = false;
    let state = ${JSON.stringify(t)};
    let transitionTargetState = state;
    let fromUniforms = new Float32Array(stateSeeds[state]);
    let targetUniforms = new Float32Array(stateSeeds[state]);
    const displayedUniforms = new Float32Array(stateSeeds[state]);
    let transitionStartedAt = 0;
    let activeTransitionDuration = 0;
    let lastFrameAt = null;
    let motionPhase = 0;
    const audioRules = ${JSON.stringify(Gb)};
    const audioFlowStrengths = ${JSON.stringify(qb)};
    function applyAudioUniforms(values, bands) {
      const strength = audioFlowStrengths[Math.round(values[15])] ?? 0;
      if (!strength) return;
      for (const [index, band, additive, proportional, ceiling] of audioRules) {
        const input = bands[band];
        const level = (Number.isFinite(input) ? Math.max(0, Math.min(1, input)) : 0) * strength;
        if (!level) continue;
        values[index] = Math.min(Math.max(ceiling, values[index]), values[index] * (1 + proportional * level) + additive * level);
      }
    }
    let audioBands = { low: 0, mid: 0, high: 0, all: 0 };
    // Feed normalized 0...1 bands from your audio analyser; zero them on stop.
    function setAudioBands(bands = {}) {
      audioBands = Object.fromEntries(["low", "mid", "high", "all"].map(key => [key,
        Number.isFinite(bands[key]) ? Math.max(0, Math.min(1, bands[key])) : 0]));
    }

    function srgbToLinear(value) {
      return value <= 0.04045
        ? value / 12.92
        : ((value + 0.055) / 1.055) ** 2.4;
    }

    function linearToSrgb(value) {
      return value <= 0.0031308
        ? value * 12.92
        : 1.055 * value ** (1 / 2.4) - 0.055;
    }

    function mixSrgb(from, to, progress) {
      return linearToSrgb(
        srgbToLinear(from) + (srgbToLinear(to) - srgbToLinear(from)) * progress,
      );
    }

    function transitionProgress(now) {
      if (activeTransitionDuration === 0) return 1;
      const raw = Math.min(1, Math.max(0, (now - transitionStartedAt) / activeTransitionDuration));
      return transitionTargetState === "thinking"
        ? 1 - (1 - raw) ** 3
        : raw * raw * (3 - 2 * raw);
    }

    function sampleTransition(now) {
      const progress = transitionProgress(now);
      for (let index = 3; index < displayedUniforms.length; index += 1) {
        const colorComponent = index >= 40
          && (index - 40) % 4 < 3;
        displayedUniforms[index] = colorComponent
          ? mixSrgb(fromUniforms[index], targetUniforms[index], progress)
          : fromUniforms[index] + (targetUniforms[index] - fromUniforms[index]) * progress;
      }
      return displayedUniforms;
    }

    function setState(nextState) {
      if (!Object.prototype.hasOwnProperty.call(stateSeeds, nextState)) {
        throw new TypeError(\`Unknown liquid orb state: \${nextState}\`);
      }
      if (nextState === state) return;

      const now = performance.now();
      sampleTransition(now);
      fromUniforms = new Float32Array(displayedUniforms);
      targetUniforms = new Float32Array(stateSeeds[nextState]);
      transitionTargetState = nextState;
      transitionStartedAt = now;
      activeTransitionDuration = nextState === "thinking"
        ? activationDurationMs
        : settleDurationMs;
      state = nextState;
    }

    Object.defineProperty(window, "liquidOrb", {
      value: Object.freeze({
        getState: () => state,
        setState,
        setAudioBands,
      }),
    });

    function stopWithError(error) {
      if (stopped) return;
      stopped = true;
      cancelAnimationFrame(animationFrame);
      ribbonTarget?.destroy();
      device?.destroy();
      status.hidden = false;
      status.textContent = error instanceof Error ? error.message : String(error);
      console.error(error);
    }

    async function start() {
      if (!navigator.gpu) throw new Error("WebGPU is not supported in this environment.");
      const adapter = await navigator.gpu.requestAdapter();
      if (!adapter) throw new Error("No compatible WebGPU adapter was found.");
      device = await adapter.requestDevice();
      const context = canvas.getContext("webgpu");
      if (!context) throw new Error("Unable to create a WebGPU canvas context.");

      const format = navigator.gpu.getPreferredCanvasFormat();
      context.configure({ device, format, alphaMode: "premultiplied" });
      const shader = device.createShaderModule({ code: shaderSource });
      const compilation = await shader.getCompilationInfo();
      const errors = compilation.messages.filter((message) => message.type === "error");
      if (errors.length) {
        throw new Error(errors.map((message) => \`\${message.lineNum}:\${message.linePos} \${message.message}\`).join("\\n"));
      }

      const pipeline = device.createRenderPipeline({
        layout: "auto",
        vertex: { module: shader, entryPoint: "vs_main" },
        fragment: {
          module: shader,
          entryPoint: "fs_main",
          targets: [{
            format,
            blend: {
              color: {
                srcFactor: "one",
                dstFactor: "one-minus-src-alpha",
                operation: "add",
              },
              alpha: {
                srcFactor: "one",
                dstFactor: "one-minus-src-alpha",
                operation: "add",
              },
            },
          }],
        },
        primitive: { topology: "triangle-list" },
      });
      const ribbonPipeline = device.createRenderPipeline({
        layout: "auto",
        vertex: { module: shader, entryPoint: "ribbon_vs_main" },
        fragment: {
          module: shader,
          entryPoint: "ribbon_fs_main",
          targets: [{
            format,
            blend: {
              color: { srcFactor: "one", dstFactor: "one", operation: "add" },
              alpha: {
                srcFactor: "one",
                dstFactor: "one-minus-src-alpha",
                operation: "add",
              },
            },
          }],
        },
        primitive: { topology: "triangle-list" },
      });
      const ribbonCompositePipeline = device.createRenderPipeline({
        layout: "auto",
        vertex: { module: shader, entryPoint: "vs_main" },
        fragment: {
          module: shader,
          entryPoint: "ribbon_composite_fs_main",
          targets: [{
            format,
            blend: {
              color: {
                srcFactor: "one",
                dstFactor: "one-minus-src-alpha",
                operation: "add",
              },
              alpha: {
                srcFactor: "one",
                dstFactor: "one-minus-src-alpha",
                operation: "add",
              },
            },
          }],
        },
        primitive: { topology: "triangle-list" },
      });
      const values = new Float32Array(displayedUniforms);
      const uniformBuffer = device.createBuffer({
        size: values.byteLength,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
      });
      const bindGroup = device.createBindGroup({
        layout: pipeline.getBindGroupLayout(0),
        entries: [{ binding: 0, resource: { buffer: uniformBuffer } }],
      });
      const ribbonBindGroup = device.createBindGroup({
        layout: ribbonPipeline.getBindGroupLayout(0),
        entries: [{ binding: 0, resource: { buffer: uniformBuffer } }],
      });
      const ribbonSampler = device.createSampler({
        addressModeU: "clamp-to-edge",
        addressModeV: "clamp-to-edge",
        magFilter: "linear",
        minFilter: "linear",
      });
      let ribbonCompositeBindGroup = null;
      device.lost.then((info) => {
        stopWithError(new Error(\`WebGPU device lost: \${info.message || info.reason}\`));
      });
      device.addEventListener("uncapturederror", (event) => {
        event.preventDefault();
        stopWithError(new Error(\`WebGPU rendering error: \${event.error.message}\`));
      });

      function frame(now) {
        if (stopped) return;
        try {
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          const width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
          const height = Math.max(1, Math.floor(canvas.clientHeight * dpr));
          if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
            ribbonTarget?.destroy();
            ribbonTarget = null;
            ribbonCompositeBindGroup = null;
          }
          values.set(sampleTransition(now));
          const frameDelta = lastFrameAt === null
            ? 0
            : Math.min(0.1, Math.max(0, (now - lastFrameAt) / 1000));
          lastFrameAt = now;
          applyAudioUniforms(values, audioBands);
          motionPhase += frameDelta * Math.max(values[3], 0);
          values[0] = width;
          values[1] = height;
          values[2] = motionPhase / Math.max(values[3], 0.001);
          device.queue.writeBuffer(uniformBuffer, 0, values);

          const isParticleRibbon = Math.round(values[15]) === ribbonStyleIndex;
          const encoder = device.createCommandEncoder();
          if (isParticleRibbon) {
            if (!ribbonTarget || !ribbonCompositeBindGroup) {
              ribbonTarget = device.createTexture({
                size: { width, height },
                format,
                usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,
              });
              ribbonCompositeBindGroup = device.createBindGroup({
                layout: ribbonCompositePipeline.getBindGroupLayout(0),
                entries: [
                  { binding: 0, resource: { buffer: uniformBuffer } },
                  { binding: 1, resource: ribbonTarget.createView() },
                  { binding: 2, resource: ribbonSampler },
                ],
              });
            }
            const particlePass = encoder.beginRenderPass({
              colorAttachments: [{
                view: ribbonTarget.createView(),
                clearValue: { r: 0, g: 0, b: 0, a: 0 },
                loadOp: "clear",
                storeOp: "store",
              }],
            });
            particlePass.setPipeline(ribbonPipeline);
            particlePass.setBindGroup(0, ribbonBindGroup);
            particlePass.draw(6, ribbonInstanceCount);
            particlePass.end();
          }
          const pass = encoder.beginRenderPass({
            colorAttachments: [{
              view: context.getCurrentTexture().createView(),
              clearValue: { r: 0, g: 0, b: 0, a: 0 },
              loadOp: "clear",
              storeOp: "store",
            }],
          });
          if (isParticleRibbon) {
            pass.setPipeline(ribbonCompositePipeline);
            pass.setBindGroup(0, ribbonCompositeBindGroup);
          } else {
            pass.setPipeline(pipeline);
            pass.setBindGroup(0, bindGroup);
          }
          pass.draw(3);
          pass.end();
          device.queue.submit([encoder.finish()]);
          animationFrame = requestAnimationFrame(frame);
        } catch (error) {
          stopWithError(error);
        }
      }

      animationFrame = requestAnimationFrame(frame);
    }

    window.addEventListener("pagehide", () => {
      stopped = true;
      cancelAnimationFrame(animationFrame);
      ribbonTarget?.destroy();
      device?.destroy();
    }, { once: true });
    start().catch((error) => {
      stopWithError(error);
    });
  <\/script>
</body>
</html>`}function $b(e,t){let n=Zb(e);return`import Foundation
import MetalKit
import QuartzCore
import SwiftUI

private let orbMetalSource = #"""
${xy}
"""#

private let orbIdleUniformSeed: [Float] = [
${Xb(n.idle)}
]

private let orbThinkingUniformSeed: [Float] = [
${Xb(n.thinking)}
]

private let orbActivationDuration: CFTimeInterval = ${e.activationDuration}
private let orbSettleDuration: CFTimeInterval = ${e.transitionDuration}
private let orbRibbonStyleIndex: Float = ${Ly.particleRibbon}
private let orbRibbonInstanceCount = ${Wy}

// Supply normalized, smoothed frequency bands from your app's audio analyser.
public struct LiquidOrbAudio: Sendable {
    public var low: Float
    public var mid: Float
    public var high: Float
    public var all: Float
    public init(low: Float = 0, mid: Float = 0, high: Float = 0, all: Float = 0) {
        self.low = low; self.mid = mid; self.high = high; self.all = all
    }
}

private func applyOrbAudio(_ values: inout [Float], _ bands: LiquidOrbAudio) {
    let strengths: [Int: Float] = [${Object.entries(qb).map(([e,t])=>`${e}: ${t}`).join(`, `)}]
    guard let strength = strengths[Int(values[15].rounded())] else { return }
    func level(_ value: Float) -> Float { value.isFinite ? max(0, min(1, value)) * strength : 0 }
${Gb.map(([e,t,n,r,i])=>`    if level(bands.${t}) > 0 { values[${e}] = min(max(${i}, values[${e}]), values[${e}] * (1 + ${r} * level(bands.${t})) + ${n} * level(bands.${t})) }`).join(`
`)}
}

public enum LiquidOrbState: Sendable {
    case idle
    case thinking
}

private func orbUniformSeed(for state: LiquidOrbState) -> [Float] {
    switch state {
    case .idle: orbIdleUniformSeed
    case .thinking: orbThinkingUniformSeed
    }
}

private func orbSrgbToLinear(_ value: Float) -> Float {
    value <= 0.04045
        ? value / 12.92
        : Float(pow(Double((value + 0.055) / 1.055), 2.4))
}

private func orbLinearToSrgb(_ value: Float) -> Float {
    value <= 0.0031308
        ? value * 12.92
        : 1.055 * Float(pow(Double(value), 1.0 / 2.4)) - 0.055
}

private func orbMixSrgb(_ from: Float, _ to: Float, _ progress: Float) -> Float {
    orbLinearToSrgb(
        orbSrgbToLinear(from) + (orbSrgbToLinear(to) - orbSrgbToLinear(from)) * progress
    )
}

private enum LiquidOrbError: Error {
    case metalUnavailable
    case shaderFunctionMissing(String)
    case commandQueueUnavailable
}

private final class LiquidOrbRenderer: NSObject, MTKViewDelegate {
    private let commandQueue: MTLCommandQueue
    private let pipeline: MTLRenderPipelineState
    private let ribbonPipeline: MTLRenderPipelineState
    private let ribbonCompositePipeline: MTLRenderPipelineState
    private var ribbonTexture: MTLTexture?
    private var lastFrameAt = CACurrentMediaTime()
    private var motionPhase: CFTimeInterval = 0
    private var audio = LiquidOrbAudio()

    func setAudio(_ audio: LiquidOrbAudio) {
        stateLock.lock()
        self.audio = audio
        stateLock.unlock()
    }
    private let stateLock = NSLock()
    private var currentState: LiquidOrbState
    private var transitionTargetState: LiquidOrbState
    private var fromUniforms: [Float]
    private var targetUniforms: [Float]
    private var displayedUniforms: [Float]
    private var transitionStartedAt = CACurrentMediaTime()
    private var activeTransitionDuration: CFTimeInterval = 0

    init(view: MTKView, state: LiquidOrbState) throws {
        let initialUniforms = orbUniformSeed(for: state)
        currentState = state
        transitionTargetState = state
        fromUniforms = initialUniforms
        targetUniforms = initialUniforms
        displayedUniforms = initialUniforms

        guard let device = MTLCreateSystemDefaultDevice() else {
            throw LiquidOrbError.metalUnavailable
        }
        view.device = device
        view.colorPixelFormat = .bgra8Unorm
        view.framebufferOnly = true
        view.preferredFramesPerSecond = 60
        view.enableSetNeedsDisplay = false
        view.isPaused = false
        #if os(iOS)
        view.isOpaque = false
        #elseif os(macOS)
        view.layer?.isOpaque = false
        #endif
        view.clearColor = MTLClearColor(
            red: 0,
            green: 0,
            blue: 0,
            alpha: 0
        )

        let library = try device.makeLibrary(source: orbMetalSource, options: nil)
        guard let vertex = library.makeFunction(name: "vs_main") else {
            throw LiquidOrbError.shaderFunctionMissing("vs_main")
        }
        guard let fragment = library.makeFunction(name: "fs_main") else {
            throw LiquidOrbError.shaderFunctionMissing("fs_main")
        }
        let descriptor = MTLRenderPipelineDescriptor()
        descriptor.vertexFunction = vertex
        descriptor.fragmentFunction = fragment
        descriptor.colorAttachments[0].pixelFormat = view.colorPixelFormat
        descriptor.colorAttachments[0].isBlendingEnabled = true
        descriptor.colorAttachments[0].sourceRGBBlendFactor = .one
        descriptor.colorAttachments[0].destinationRGBBlendFactor = .oneMinusSourceAlpha
        descriptor.colorAttachments[0].sourceAlphaBlendFactor = .one
        descriptor.colorAttachments[0].destinationAlphaBlendFactor = .oneMinusSourceAlpha
        pipeline = try device.makeRenderPipelineState(descriptor: descriptor)
        guard let ribbonVertex = library.makeFunction(name: "ribbon_vs_main") else {
            throw LiquidOrbError.shaderFunctionMissing("ribbon_vs_main")
        }
        guard let ribbonFragment = library.makeFunction(name: "ribbon_fs_main") else {
            throw LiquidOrbError.shaderFunctionMissing("ribbon_fs_main")
        }
        let ribbonDescriptor = MTLRenderPipelineDescriptor()
        ribbonDescriptor.vertexFunction = ribbonVertex
        ribbonDescriptor.fragmentFunction = ribbonFragment
        ribbonDescriptor.colorAttachments[0].pixelFormat = view.colorPixelFormat
        ribbonDescriptor.colorAttachments[0].isBlendingEnabled = true
        ribbonDescriptor.colorAttachments[0].sourceRGBBlendFactor = .one
        ribbonDescriptor.colorAttachments[0].destinationRGBBlendFactor = .one
        ribbonDescriptor.colorAttachments[0].sourceAlphaBlendFactor = .one
        ribbonDescriptor.colorAttachments[0].destinationAlphaBlendFactor = .oneMinusSourceAlpha
        ribbonPipeline = try device.makeRenderPipelineState(descriptor: ribbonDescriptor)
        guard let ribbonCompositeFragment = library.makeFunction(
            name: "ribbon_composite_fs_main"
        ) else {
            throw LiquidOrbError.shaderFunctionMissing("ribbon_composite_fs_main")
        }
        let ribbonCompositeDescriptor = MTLRenderPipelineDescriptor()
        ribbonCompositeDescriptor.vertexFunction = vertex
        ribbonCompositeDescriptor.fragmentFunction = ribbonCompositeFragment
        ribbonCompositeDescriptor.colorAttachments[0].pixelFormat = view.colorPixelFormat
        ribbonCompositeDescriptor.colorAttachments[0].isBlendingEnabled = true
        ribbonCompositeDescriptor.colorAttachments[0].sourceRGBBlendFactor = .one
        ribbonCompositeDescriptor.colorAttachments[0].destinationRGBBlendFactor = .oneMinusSourceAlpha
        ribbonCompositeDescriptor.colorAttachments[0].sourceAlphaBlendFactor = .one
        ribbonCompositeDescriptor.colorAttachments[0].destinationAlphaBlendFactor = .oneMinusSourceAlpha
        ribbonCompositePipeline = try device.makeRenderPipelineState(
            descriptor: ribbonCompositeDescriptor
        )
        guard let queue = device.makeCommandQueue() else {
            throw LiquidOrbError.commandQueueUnavailable
        }
        commandQueue = queue
        super.init()
    }

    func setState(_ state: LiquidOrbState) {
        let now = CACurrentMediaTime()
        stateLock.lock()
        defer { stateLock.unlock() }
        guard state != currentState else { return }

        let nextUniforms = orbUniformSeed(for: state)
        fromUniforms = sampleTransition(at: now)
        targetUniforms = nextUniforms
        transitionTargetState = state
        transitionStartedAt = now
        activeTransitionDuration = state == .thinking
            ? orbActivationDuration
            : orbSettleDuration
        currentState = state
    }

    private func sampleTransition(at now: CFTimeInterval) -> [Float] {
        let rawProgress = activeTransitionDuration == 0
            ? 1
            : min(1, max(0, (now - transitionStartedAt) / activeTransitionDuration))
        let easedProgress = transitionTargetState == .thinking
            ? 1 - pow(1 - rawProgress, 3)
            : rawProgress * rawProgress * (3 - 2 * rawProgress)
        let progress = Float(easedProgress)

        for index in 3..<displayedUniforms.count {
            let isColorComponent = index >= 40
                && (index - 40) % 4 < 3
            displayedUniforms[index] = isColorComponent
                ? orbMixSrgb(fromUniforms[index], targetUniforms[index], progress)
                : fromUniforms[index] + (targetUniforms[index] - fromUniforms[index]) * progress
        }
        return displayedUniforms
    }

    func mtkView(_ view: MTKView, drawableSizeWillChange size: CGSize) {
        ribbonTexture = nil
    }

    private func ensureRibbonTexture(for view: MTKView) -> MTLTexture? {
        let width = max(1, Int(view.drawableSize.width))
        let height = max(1, Int(view.drawableSize.height))
        if let ribbonTexture,
           ribbonTexture.width == width,
           ribbonTexture.height == height {
            return ribbonTexture
        }
        guard let device = view.device else { return nil }
        let descriptor = MTLTextureDescriptor.texture2DDescriptor(
            pixelFormat: view.colorPixelFormat,
            width: width,
            height: height,
            mipmapped: false
        )
        descriptor.usage = [.renderTarget, .shaderRead]
        descriptor.storageMode = .private
        ribbonTexture = device.makeTexture(descriptor: descriptor)
        return ribbonTexture
    }

    func draw(in view: MTKView) {
        guard
            view.drawableSize.width > 0,
            view.drawableSize.height > 0,
            let descriptor = view.currentRenderPassDescriptor,
            let drawable = view.currentDrawable,
            let commandBuffer = commandQueue.makeCommandBuffer()
        else { return }

        let now = CACurrentMediaTime()
        stateLock.lock()
        var uniforms = sampleTransition(at: now)
        applyOrbAudio(&uniforms, audio)
        stateLock.unlock()
        let frameDelta = min(0.1, max(0, now - lastFrameAt))
        lastFrameAt = now
        motionPhase += frameDelta * CFTimeInterval(max(uniforms[3], 0))
        uniforms[0] = Float(view.drawableSize.width)
        uniforms[1] = Float(view.drawableSize.height)
        uniforms[2] = Float(motionPhase / CFTimeInterval(max(uniforms[3], 0.001)))
        let isParticleRibbon = round(uniforms[15]) == orbRibbonStyleIndex
        if isParticleRibbon {
            guard let ribbonTexture = ensureRibbonTexture(for: view) else { return }
            let ribbonPass = MTLRenderPassDescriptor()
            ribbonPass.colorAttachments[0].texture = ribbonTexture
            ribbonPass.colorAttachments[0].loadAction = .clear
            ribbonPass.colorAttachments[0].storeAction = .store
            ribbonPass.colorAttachments[0].clearColor = MTLClearColor(
                red: 0, green: 0, blue: 0, alpha: 0
            )
            guard let ribbonEncoder = commandBuffer.makeRenderCommandEncoder(
                descriptor: ribbonPass
            ) else { return }
            ribbonEncoder.setRenderPipelineState(ribbonPipeline)
            uniforms.withUnsafeBytes { bytes in
                ribbonEncoder.setVertexBytes(bytes.baseAddress!, length: bytes.count, index: 0)
                ribbonEncoder.setFragmentBytes(bytes.baseAddress!, length: bytes.count, index: 0)
            }
            ribbonEncoder.drawPrimitives(
                type: .triangle,
                vertexStart: 0,
                vertexCount: 6,
                instanceCount: orbRibbonInstanceCount
            )
            ribbonEncoder.endEncoding()
        }
        guard let encoder = commandBuffer.makeRenderCommandEncoder(descriptor: descriptor) else {
            return
        }
        encoder.setRenderPipelineState(isParticleRibbon ? ribbonCompositePipeline : pipeline)
        uniforms.withUnsafeBytes { bytes in
            encoder.setFragmentBytes(bytes.baseAddress!, length: bytes.count, index: 0)
        }
        if isParticleRibbon {
            encoder.setFragmentTexture(ribbonTexture, index: 0)
        }
        encoder.drawPrimitives(type: .triangle, vertexStart: 0, vertexCount: 3)
        encoder.endEncoding()
        commandBuffer.present(drawable)
        commandBuffer.commit()
    }
}

private final class LiquidOrbCoordinator {
    private var renderer: LiquidOrbRenderer?

    func setAudio(_ audio: LiquidOrbAudio) { renderer?.setAudio(audio) }

    func makeView(state: LiquidOrbState) -> MTKView {
        let view = MTKView(frame: .zero, device: nil)
        do {
            let renderer = try LiquidOrbRenderer(view: view, state: state)
            self.renderer = renderer
            view.delegate = renderer
            return view
        } catch {
            preconditionFailure("Liquid Orb Metal initialization failed: \\(error)")
        }
    }

    func setState(_ state: LiquidOrbState) {
        renderer?.setState(state)
    }
}

#if os(iOS)
private struct LiquidOrbSurface: UIViewRepresentable {
    let state: LiquidOrbState
    var audio = LiquidOrbAudio()

    func makeCoordinator() -> LiquidOrbCoordinator { LiquidOrbCoordinator() }
    func makeUIView(context: Context) -> MTKView { context.coordinator.makeView(state: state) }
    func updateUIView(_ view: MTKView, context: Context) { context.coordinator.setState(state); context.coordinator.setAudio(audio) }
}
#elseif os(macOS)
private struct LiquidOrbSurface: NSViewRepresentable {
    let state: LiquidOrbState
    var audio = LiquidOrbAudio()

    func makeCoordinator() -> LiquidOrbCoordinator { LiquidOrbCoordinator() }
    func makeNSView(context: Context) -> MTKView { context.coordinator.makeView(state: state) }
    func updateNSView(_ view: MTKView, context: Context) { context.coordinator.setState(state); context.coordinator.setAudio(audio) }
}
#endif

public struct LiquidOrbView: View {
    private let state: LiquidOrbState
    private var audio = LiquidOrbAudio()

    public init(state: LiquidOrbState = .${t}) {
        self.state = state
    }

    public init(state: LiquidOrbState = .${t}, audio: LiquidOrbAudio) {
        self.state = state
        self.audio = audio
    }

    public var body: some View {
        LiquidOrbSurface(state: state, audio: audio)
    }
}`}var ex={success:{colorA:`#1BE39A`,colorB:`#3DF2D0`,colorC:`#B5FFCB`,colorD:`#0C9C72`,highlightColor:`#F2FFF8`,glowColor:`#22E39A`,shellMid:`#7DFFD2`,shellEdge:`#3DF2D0`},error:{colorA:`#FF4A4A`,colorB:`#FF8A4C`,colorC:`#FF3B6E`,colorD:`#B3122E`,highlightColor:`#FFE4DE`,glowColor:`#FF4545`,shellMid:`#FF9C8A`,shellEdge:`#FF5A6E`}};function tx(e){return{a:e.colorA,b:e.colorB,c:e.colorC,d:e.colorD,hi:e.highlightColor,glow:e.glowColor,canvas:e.canvasColor,rimA:e.shellMid,rimB:e.shellEdge}}function nx(e,t){let n={...e};for(let[r,i]of Object.entries(ex[t]))n[r]=r===`glowColor`?i:$y(e[r],i,.82);return n}function rx(e,t=e,n=e){return{base:tx(e),success:tx(nx(t,`success`)),error:tx(nx(n,`error`))}}function ix(e){let t=Nb(e,`thinking`),n={...t,style:Ry[t.style]},r={};for(let t of vb)t!==`thinking`&&(r[t]={...e.profiles[t]});return{params:n,overrides:r,activation:e.activationDuration,transition:e.transitionDuration}}function ax(e,t){let n=` `.repeat(t);return e.split(`
`).map((e,t)=>t===0?e:n+e).join(`
`)}function ox(e,t,n){let r=JSON.stringify(ix(e),null,2),i=JSON.stringify(n||`Loading…`);return`<!-- Glimmer: dist/glimmer.js from the Glimmer repo (includes orb by LerSent001, MIT). -->
<script src="glimmer.js"><\/script>
<script>
  const look = ${ax(r,2)};

  // Full-screen loading screen
  const splash = Glimmer.splash({ look, title: "My App", text: ${i}, progress: null });
  // splash.status("Loading data").progress(0.5);
  // await splash.done("Ready");          // or splash.fail("Something went wrong")

  // Or an orb anywhere on the page:
  // const orb = new Glimmer.Orb(document.querySelector("#orb"), { look, state: "${t}" });
  // orb.setState("idle" | "thinking" | "success" | "error");

  // Or an inline pill:
  // Glimmer.pill(document.querySelector("#status"), { look, text: ${i} });
<\/script>
`}function sx(e,t){let n=`#${e}`;return`// Glimmer.WinForms (hosts/winforms/Glimmer.WinForms). Works from WinForms and WPF.
using Glimmer.WinForms;

// WinForms: ApplicationConfiguration.Initialize() first.
var splash = GlimmerSplash.Show(new GlimmerSplashOptions
{
    Title = "My App",
    Text = ${JSON.stringify(t||`Loading…`)},
    ShowProgress = true,
    // The whole look, all four states, as an editor link:
    OrbLink = ${JSON.stringify(n)},
});

splash.Status("Opening the database").Progress(0.4);
// … startup work, even if it blocks this thread …
await splash.CompleteAsync("Ready");      // or splash.Fail("Couldn't connect")
`}function cx(e,t=`v1.0.0`){let n=Nb(e,`thinking`),r=[`--gd-a:${n.colorA}`,`--gd-b:${n.colorB}`,`--gd-c:${n.colorC}`,`--gd-d:${n.colorD}`,`--gd-hi:${n.highlightColor}`,`--gd-glow:${n.glowColor}`,`--gd-canvas:${n.canvasColor}`,`--gd-rim-a:${n.shellMid}`,`--gd-rim-b:${n.shellEdge}`].join(`;`);return`<!-- Glimmer badge: include dist/glimmer-badge.css (CSS only, no script, no GPU). -->
<link rel="stylesheet" href="glimmer-badge.css">

<!-- Named preset: -->
<button class="version-button glimmer-version" data-preset="${n.style}" data-state="idle">
  <span class="glimmer-dot" aria-hidden="true"></span><span>${t}</span>
</button>

<!-- This exact look. The colours sit on a wrapper so success/error can still recolour the button. -->
<span style="${r}">
  <button class="version-button glimmer-version" data-state="idle">
    <span class="glimmer-dot" aria-hidden="true"></span><span>${t}</span>
  </button>
</span>

<!-- Drive it from your app: idle | thinking | success | error -->
<script>
  // versionButton.dataset.state = "thinking";   // while work is in flight
  // versionButton.dataset.state = "success";    // when it finishes or an update is waiting
  // versionButton.dataset.state = "error";      // after a failure
<\/script>
`}function lx(e){let t=ix(e),n={...t.params,...t.overrides?.success},r={...t.params,...t.overrides?.error};return rx(t.params,n,r)}function ux(e){return[Number.parseInt(e.slice(1,3),16),Number.parseInt(e.slice(3,5),16),Number.parseInt(e.slice(5,7),16)]}var dx=([e,t,n],r)=>`rgba(${e},${t},${n},${Math.min(1,Math.max(0,r)).toFixed(3)})`,fx=[{orbit:.42,wx:.53,wy:.71,phase:0,size:.82},{orbit:.48,wx:-.61,wy:.47,phase:2.1,size:.74},{orbit:.38,wx:.43,wy:-.58,phase:4.2,size:.78},{orbit:.3,wx:-.37,wy:-.41,phase:5.3,size:.66}],px=class{constructor(e){this.canvas=e;let t=e.getContext(`2d`);if(!t)throw Error(`Could not create a 2D canvas context`);this.ctx=t}render(e,t){let{ctx:n,canvas:r}=this,i=r.width,a=r.height;n.setTransform(1,0,0,1,0,0),n.globalCompositeOperation=`source-over`,n.globalAlpha=1,n.clearRect(0,0,i,a);let o=i/2,s=a/2,c=1+e.contourDeform*.05*Math.sin(t*.62),l=Math.max(1,Math.min(i,a)/2*e.radius*c);if(e.edgeGlow>0){let t=n.createRadialGradient(o,s,l*.96,o,s,l*(1.2+e.edgeGlow));t.addColorStop(0,dx(ux(e.glowColor),Math.min(.9,e.edgeGlow*2.2))),t.addColorStop(1,dx(ux(e.glowColor),0)),n.fillStyle=t,n.fillRect(0,0,i,a)}n.save(),n.beginPath(),n.arc(o,s,l,0,Math.PI*2),n.clip(),n.fillStyle=e.canvasColor,n.fillRect(o-l,s-l,l*2,l*2),n.globalCompositeOperation=`screen`;let u=[e.colorB,e.colorC,e.colorD,e.colorA].map(ux),d=Math.min(.85,.28+e.exposure*.22),f=.6+e.warp*.1;fx.forEach((e,r)=>{let i=o+l*e.orbit*Math.cos(t*e.wx*f+e.phase),a=s+l*e.orbit*Math.sin(t*e.wy*f+e.phase*1.3),c=l*e.size*(.92+.08*Math.sin(t*.9+r)),p=n.createRadialGradient(i,a,0,i,a,c);p.addColorStop(0,dx(u[r],d)),p.addColorStop(.5,dx(u[r],d*.4)),p.addColorStop(1,dx(u[r],0)),n.fillStyle=p,n.fillRect(o-l,s-l,l*2,l*2)}),n.globalCompositeOperation=`screen`;let p=s+l*.18*Math.sin(t*1.1),m=n.createLinearGradient(0,p-l*.3,0,p+l*.3);m.addColorStop(0,dx(ux(e.highlightColor),0)),m.addColorStop(.5,dx(ux(e.highlightColor),.12*e.ridgeAmt+.04)),m.addColorStop(1,dx(ux(e.highlightColor),0)),n.fillStyle=m,n.fillRect(o-l,s-l,l*2,l*2),n.globalCompositeOperation=`source-over`;let h=n.createRadialGradient(o-l*.35,s-l*.55,0,o-l*.35,s-l*.55,l*1.1);h.addColorStop(0,dx(ux(e.highlightColor),.1+e.shade*.2)),h.addColorStop(1,dx(ux(e.highlightColor),0)),n.fillStyle=h,n.fillRect(o-l,s-l,l*2,l*2);let g=n.createRadialGradient(o,s,l*.62,o,s,l);g.addColorStop(0,`rgba(0,0,0,0)`),g.addColorStop(1,`rgba(0,0,0,${(.18+e.shade*.5).toFixed(3)})`),n.fillStyle=g,n.fillRect(o-l,s-l,l*2,l*2),e.glassEnabled&&this.glass(e,o,s,l),n.restore()}glass(e,t,n,r){let{ctx:i}=this,a=Math.max(1,r*(.022+.03*e.shellEdgeAlpha)),o=(e,t)=>Math.atan2(-t,e),s=typeof i.createConicGradient==`function`,c=(e,a,o,c,l)=>{if(!(c<=.002)){if(i.beginPath(),i.arc(t,n,r-l/2,0,Math.PI*2),i.lineWidth=l,s){let r=i.createConicGradient(e-Math.PI,t,n),s=a/(Math.PI*2),l=ux(o);r.addColorStop(0,dx(l,0)),r.addColorStop(Math.max(0,.5-s),dx(l,0)),r.addColorStop(.5,dx(l,c)),r.addColorStop(Math.min(1,.5+s),dx(l,0)),r.addColorStop(1,dx(l,0)),i.strokeStyle=r}else i.beginPath(),i.arc(t,n,r-l/2,e-a*.6,e+a*.6),i.strokeStyle=dx(ux(o),c*.7);i.stroke()}},l=Math.min(1,e.gloss*(.8+.8*e.shellEdgeAlpha)*1.8);i.globalCompositeOperation=`source-over`,i.beginPath(),i.arc(t,n,r-a*.3,0,Math.PI*2),i.lineWidth=a*.6,i.strokeStyle=dx(ux(e.shellInner),.12+e.glassOpacity*.2),i.stroke(),c(o(.84,.54),1.5,e.shellMid,l,a),c(o(-.62,-.78),1.4,e.shellEdge,l,a),i.globalCompositeOperation=`screen`,c(o(-.68,.73),.9,e.sheenColor,Math.min(1,e.sheen*2.2),a*1.3),c(o(.74,-.67),.6,e.specColor,Math.min(1,e.sheen*1.4),a)}destroy(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)}},mx=`// ─────────────────────────────────────────────────────────────────────────────
// Glimmer shader bank.
//
// Based on "orb" by LerSent001 (https://github.com/LerSent001/orb), MIT
// licensed, vendored from commit 8d1736e (2026-09-16). See NOTICE.md for the
// full upstream license. The upstream flow programs, glass shell, and edge bank
// below are their work and are kept as-is so the presets render identically.
//
// Glimmer additions are marked "GLIMMER": the Nebula (30) and Sonar (31) flow
// programs and their dispatch entries.
// ─────────────────────────────────────────────────────────────────────────────

// Glass Liquid — curated flow programs with an optional glass shell.
//
// The local presets use independent spatial models for Siri-like sheets,
// symmetric colour waves, aurora curtains, frost flow, neural interference,
// liquid chrome, opal interference, a voice membrane, a blue liquid drop, and
// a violet molten core, plus a chromatic brushed-metal field. The legacy liquid
// bank remains below for compatibility with older shared shader
// code, but is not exposed as an editor preset.
//
// When enabled, the shell uses a signed-distance refraction profile around the
// boundary, asymmetric spectral separation, and two directional edge lights.
// The fluid is resampled through that profile, so glass changes the image rather
// than covering it with a translucent white face.
//
// ---------------------------------------------------------------------------
// Analytic optical diffusion without a convolution.
// ---------------------------------------------------------------------------
//
// The source used a thirteen-tap 5px frost blur. This port keeps one fluid
// evaluation and applies the equivalent gaussian in the frequency domain:
//
//  1. **Per-octave attenuation, inside \`lqFbm\`.** Convolving with a gaussian of
//     sigma σ scales a component at wavenumber k by exp(-k²σ²/2). An fbm's
//     octaves have known wavenumbers — octave i sits at 2.03^i times the base —
//     so each octave's amplitude is scaled by its own factor and the field is
//     sampled once. The mean is untouched (a blur preserves it), so only the
//     deviation from 0.5 is scaled and the \`s / m\` normaliser is unchanged.
//     Every caller passes the diffusion sigma in its own input units, so detail
//     attenuation continues to track \`zoom\`.
//
//  2. **Value-space quadrature at every pointwise nonlinearity.** This is the
//     part that is easy to get wrong. \`blur(ridge(f))\` is not \`ridge(blur(f))\`:
//     attenuating first and ridging after leaves filaments thin and hard where
//     the blur should have spread them, which is exactly how the earlier
//     analytic-edge version failed. So \`lqFbm\` also returns the standard
//     deviation of the detail the attenuation removed — within a gaussian
//     window an octave scaled by β contributes variance ∝ (1 - β²), NOT
//     (1 - β)² — and every nonlinearity applied to that field integrates it
//     back out with a three-point Gauss-Hermite rule (exact through the fourth
//     moment). Three evaluations of a function of one float, not three
//     evaluations of the noise. \`lqRidgeS\`/\`lqStepS\`/\`lqPowS\` below; Nectar's
//     branch has the fbm inside a \`sin\`, where the same integral is closed-form
//     (E[sin(A + cε)] = sin A · exp(-c²σ²/2)), so it damps the sine instead.
//
//  3. **One continuous disc edge.** The fluid always reaches the sphere
//     boundary. Glass changes its sample coordinates near that boundary, so
//     toggling the shell cannot reveal a second hard-clipped silhouette.
//
// Deliberately NOT ported, and why:
//   - The liquid grain. It sits below display-pixel scale and adds noise rather
//     than useful optical detail, so Glass Liquid has no Grain parameter.
//   - The two contact-shadow ellipses under the ball and its outer
//     \`0 26px 50px -24px\` drop shadow. The Orbs family cut the source app's
//     floor at the user's request, and the export paints over \`Color.black\`.
//
// Scalar controls are packed after \`time\`; the colour bank starts on the next
// 16-byte boundary. The TypeScript writer mirrors this order exactly.
struct Uniforms {
  size:           vec2<f32>,
  time:           f32,
  speed:          f32,
  radius:         f32,
  zoom:           f32,
  warp:           f32,
  ridgeAmt:       f32,
  sharp:          f32,
  shade:          f32,
  sheen:          f32,
  gloss:          f32,
  shellMidAlpha:  f32,
  shellEdgeAlpha: f32,
  exposure:       f32,
  style:          f32,
  edgeSoftness:   f32,
  edgeGlow:       f32,
  paletteCount:   f32,
  glassEnabled:   f32,
  glassOpacity:   f32,
  contourDeform:  f32,
  bandDensity:    f32,
  chromaticShift: f32,
  metalScale:     f32,
  metalStretch:   f32,
  metalAngle:     f32,
  metalOffset:    f32,
  metalPhase:     f32,
  metalEvolution: f32,
  metalRoughness: f32,
  metalDepth:     f32,
  particleDensity: f32,
  ribbonCount:     f32,
  ribbonWidth:     f32,
  ribbonTwist:     f32,
  ribbonFold:      f32,
  ribbonBreath:    f32,
  particleSize:    f32,
  particleBloom:   f32,
  colorA:         vec4<f32>,
  colorB:         vec4<f32>,
  colorC:         vec4<f32>,
  colorD:         vec4<f32>,
  highlightColor: vec4<f32>,
  shellInner:     vec4<f32>,
  shellMid:       vec4<f32>,
  shellEdge:      vec4<f32>,
  sheenColor:     vec4<f32>,
  specColor:      vec4<f32>,
  canvasColor:    vec4<f32>,
  glowColor:      vec4<f32>,
  paletteStop0:    vec4<f32>,
  paletteStop1:    vec4<f32>,
  paletteStop2:    vec4<f32>,
  paletteStop3:    vec4<f32>,
  paletteStop4:    vec4<f32>,
  paletteStop5:    vec4<f32>,
  paletteStop6:    vec4<f32>,
  paletteStop7:    vec4<f32>,
  paletteStop8:    vec4<f32>,
  paletteStop9:    vec4<f32>,
  paletteStop10:   vec4<f32>,
  paletteStop11:   vec4<f32>,
};
@group(0) @binding(0) var<uniform> u: Uniforms;

// ── The Orbs edge bank (WGSL) ───────────────────────────────────────────────
// Two knobs every orb on the shelf carries: how soft its limb is, and how far
// it glows past it. See effects/_shared/edge.ts for the contract.
//
// THREE files must agree — edge.wgsl, edge.metal, edge.sksl. Change one, change
// all three, or the Code tab starts lying about what it ships.

// How much wider than the shipped feather the Edge softness slider is asking
// for. 0.005 is the width every orb was authored with, so this returns exactly
// 0 at the default and every edge expression collapses to the constant it
// replaced — the defaults are bit-identical to the render before the bank.
fn mfEdgeD(soft: f32) -> f32 {
  return soft - 0.005;
}

// The halo an orb throws past its own limb.
//
// ADDED, never subtracted: whatever the orb already paints out there — a
// studio wall, its own exp() bleed, the sheet's cones — survives untouched.
// That is what lets this be adopted by seventeen shaders whose backdrops have
// nothing in common.
//
// \`glow == 0\` returns \`col\` by an early exit rather than by adding zero. Both
// are exact, but the exit also skips the length() on the ~60% of the frame
// outside the ball, and 0 is the default.
fn mfEdgeGlow(col: vec3<f32>, uv: vec2<f32>, ctr: vec2<f32>, rad: f32,
              soft: f32, glow: f32, glowRGB: vec3<f32>) -> vec3<f32> {
  if (glow <= 0.0) { return col; }
  let r = length(uv - ctr);
  // Fenced to the outside of the limb by the same softness the limb uses, so
  // the halo starts where the ball stops however soft that boundary is. Without
  // it the exp() is 1 across the whole disc and washes the face flat.
  let outside = smoothstep(rad - max(soft, 0.0005), rad + max(soft, 0.0005), r);
  return col + glowRGB * (glow * exp(-max(r - rad, 0.0) * 11.0) * outside);
}


// ── The Orbs palette-ramp bank (WGSL) ───────────────────────────────────────
// The add/remove colour list, evaluated INSIDE the shader so every stop paints
// its own region of the ball instead of being averaged into a role colour.
// See effects/_shared/ramp.ts for the contract.
//
// THREE files must agree — ramp.wgsl, ramp.metal, ramp.sksl. Change one, change
// all three, or the Code tab starts lying about what it ships.

// One stop, picked without a dynamic array index.
//
// A \`var\` array indexed by a runtime value is the shape that spills to scratch
// memory on the GPUs this project cares about (PERFORMANCE.md); twelve selects
// stay in registers and are branchless on every backend. Written once here so
// no adopting shader has to.
fn mfRampPick(idx: f32,
              s0: vec3<f32>, s1: vec3<f32>, s2:  vec3<f32>, s3:  vec3<f32>,
              s4: vec3<f32>, s5: vec3<f32>, s6:  vec3<f32>, s7:  vec3<f32>,
              s8: vec3<f32>, s9: vec3<f32>, s10: vec3<f32>, s11: vec3<f32>) -> vec3<f32> {
  var r = s0;
  r = select(r, s1,  idx == 1.0);
  r = select(r, s2,  idx == 2.0);
  r = select(r, s3,  idx == 3.0);
  r = select(r, s4,  idx == 4.0);
  r = select(r, s5,  idx == 5.0);
  r = select(r, s6,  idx == 6.0);
  r = select(r, s7,  idx == 7.0);
  r = select(r, s8,  idx == 8.0);
  r = select(r, s9,  idx == 9.0);
  r = select(r, s10, idx == 10.0);
  r = select(r, s11, idx == 11.0);
  return r;
}

// The CYCLIC ramp: \`t\` wraps, and the last stop runs back into the first.
//
// This is the one a generated-colour orb wants. Prism's hue comes from a cosine
// of an unbounded scalar field, so its colour has always been periodic — a
// clamped ramp would flatten every band past t == 1 into one colour and throw
// the banding away. Wrapping keeps the field's structure exactly and only swaps
// what the structure is *coloured* with.
//
// NOT ONE BRANCH IN HERE, and that is load-bearing rather than tidy. An orb
// evaluates this next to a \`fract(sin(x) * 43758.5453)\` grain hash, which
// amplifies a last-bit change in its argument by ~44000x. Any \`if\` in this file
// or at a call site splits the fragment's basic block, the compiler stops
// folding \`uv / rad\` into its uses, and the hash turns that into speckle up to
// 33/255 — measured, on exactly the first cut of this bank. Straight-line code
// keeps the untouched render bit-identical. Same reasoning as the early-out
// guards every orb carries; see the note in orb-prism.wgsl.
fn mfRampCyc(tIn: f32, n: f32,
             s0: vec3<f32>, s1: vec3<f32>, s2:  vec3<f32>, s3:  vec3<f32>,
             s4: vec3<f32>, s5: vec3<f32>, s6:  vec3<f32>, s7:  vec3<f32>,
             s8: vec3<f32>, s9: vec3<f32>, s10: vec3<f32>, s11: vec3<f32>) -> vec3<f32> {
  let k  = clamp(floor(n + 0.5), 1.0, 12.0);
  let x  = fract(tIn) * k;
  let i0 = min(floor(x), k - 1.0);
  let i1 = select(i0 + 1.0, 0.0, i0 + 1.0 >= k);   // the wrap
  return mix(mfRampPick(i0, s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11),
             mfRampPick(i1, s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11),
             x - i0);
}

// The CLAMPED ramp: stop 0 at t == 0, the last stop at t == 1, held outside.
//
// This is the one an orb with an authored dark→light body ramp wants — the
// four-stop Deep/Mid/Surge/Crest shape, where the ends really are ends.
//
// Branchless for the same reason as \`mfRampCyc\`. The single-stop case falls out
// of the arithmetic rather than needing an early return: k == 1 makes the span
// zero, so x is 0, i0 is 0 and the mix weight is 0 — s0, exactly.
fn mfRampLin(tIn: f32, n: f32,
             s0: vec3<f32>, s1: vec3<f32>, s2:  vec3<f32>, s3:  vec3<f32>,
             s4: vec3<f32>, s5: vec3<f32>, s6:  vec3<f32>, s7:  vec3<f32>,
             s8: vec3<f32>, s9: vec3<f32>, s10: vec3<f32>, s11: vec3<f32>) -> vec3<f32> {
  let k  = clamp(floor(n + 0.5), 1.0, 12.0);
  let x  = clamp(tIn, 0.0, 1.0) * (k - 1.0);
  let i0 = clamp(floor(x), 0.0, max(k - 2.0, 0.0));
  return mix(mfRampPick(i0,     s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11),
             mfRampPick(i0 + 1.0, s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11),
             x - i0);
}

// ── The ramp as ONE value ───────────────────────────────────────────────────
//
// Thirteen uniforms is a reasonable thing for a shader to hold and a terrible
// thing for a helper to take. Several orbs make their body colour deep inside
// one — Glass·Liquid's fluid, the studio orbs' environment mirrors — and in the
// MSL these files are transcribed against, a helper cannot read the stitchable
// entry point's arguments, so the palette has to be handed down. Bundled like
// this that is one parameter instead of thirteen, and the three languages stay
// line-for-line.
//
// The stops come back out by CONSTANT index only, so this is still not a
// dynamically indexed array and still cannot spill to scratch memory.
struct MfRamp {
  n:   f32,
  s0:  vec3<f32>, s1:  vec3<f32>, s2:  vec3<f32>, s3:  vec3<f32>,
  s4:  vec3<f32>, s5:  vec3<f32>, s6:  vec3<f32>, s7:  vec3<f32>,
  s8:  vec3<f32>, s9:  vec3<f32>, s10: vec3<f32>, s11: vec3<f32>,
};

fn mfRampOf(n: f32,
            s0: vec3<f32>, s1: vec3<f32>, s2:  vec3<f32>, s3:  vec3<f32>,
            s4: vec3<f32>, s5: vec3<f32>, s6:  vec3<f32>, s7:  vec3<f32>,
            s8: vec3<f32>, s9: vec3<f32>, s10: vec3<f32>, s11: vec3<f32>) -> MfRamp {
  return MfRamp(n, s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11);
}

fn mfRampCycR(t: f32, r: MfRamp) -> vec3<f32> {
  return mfRampCyc(t, r.n, r.s0, r.s1, r.s2, r.s3, r.s4, r.s5,
                   r.s6, r.s7, r.s8, r.s9, r.s10, r.s11);
}

fn mfRampLinR(t: f32, r: MfRamp) -> vec3<f32> {
  return mfRampLin(t, r.n, r.s0, r.s1, r.s2, r.s3, r.s4, r.s5,
                   r.s6, r.s7, r.s8, r.s9, r.s10, r.s11);
}


// Fluid geometry, in ball radii (|p| == 1 on the ball's edge, y up).
const GL_FU:   f32 = 0.88172043;   // canvas half-side = 0.82/0.93 R

// Pure fluid keeps tighter diffusion; enabling glass restores the source's 5px
// frosted diffusion inside the inset shell.
const GL_BSIG_CLEAR: f32 = 0.01800000;
const GL_BSIG_GLASS: f32 = 0.03990000;

// --- the three constants the frequency-domain blur is fitted on -------------
// A gaussian's response is exp(-k²σ²/2), so GL_KA is k²/2 for the wavenumber
// where smoothstep-interpolated value noise actually keeps its energy. The
// textbook choice — one cycle per noise cell, k = 2π, GL_KA = 19.74 — blurs too
// hard, because the smoothstep interpolation is itself a low-pass and pulls the
// effective k down to about 3.5. Fitted against the 13-tap render.
const GL_KA:  f32 = 6.0;
// (2.03)² — how σ grows, in its own octave's cells, from one octave to the next.
const GL_KG:  f32 = 4.1209;
// The warp field displaces the fluid rather than colouring it, so blurring the
// image does not attenuate it as strongly as the model says. Also fitted.
const GL_KWA: f32 = 0.5;
// One value-noise octave's standard deviation about its own mean, as a fraction
// of its range — the scale that turns "amplitude the attenuation removed" into
// "how far the removed detail typically pushed the value".
const GL_KR:  f32 = 0.32;
const GL_GH:  f32 = 1.73205081;   // sqrt(3), the 3-point Gauss-Hermite abscissa

// Pure fluid reaches the ball edge.
const GL_CLEAR_EA: f32 = 0.995;
const GL_CLEAR_EB: f32 = 1.04;

// ---------------------------------------------------------------------------
// The sheet's liquid noise bank. Five octaves, gain .5, normalised by the
// weight sum, and rotated every octave. This is NOT the bank the sheet's Prism
// screen uses (a different hash, gain .55, unnormalised, no rotation).
// ---------------------------------------------------------------------------
fn lqHash(pIn: vec2<f32>) -> f32 {
  var p = fract(pIn * vec2<f32>(123.34, 456.21));
  p = p + vec2<f32>(dot(p, p + vec2<f32>(45.32)));
  return fract(p.x * p.y);
}

fn lqNoise(p: vec2<f32>) -> f32 {
  let i = floor(p);
  var f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(lqHash(i), lqHash(i + vec2<f32>(1.0, 0.0)), f.x),
             mix(lqHash(i + vec2<f32>(0.0, 1.0)), lqHash(i + vec2<f32>(1.0, 1.0)), f.x), f.y);
}

// The fbm, pre-blurred. \`bs\` is the blur's sigma expressed in THIS call's input
// units — the caller scales it by whatever it scaled the domain by. Returns
// \`.x\` the attenuated value and \`.y\` the standard deviation of the detail the
// attenuation took out, which is what a following nonlinearity has to integrate
// over. Both are exact for a gaussian window: the surviving amplitude is β and
// the variance that leaves is (1 - β²), per octave, weighted by that octave's
// own share of the normalised sum.
fn lqFbm(pIn: vec2<f32>, bs: f32) -> vec2<f32> {
  var p = pIn;
  var s:  f32 = 0.0;
  var a:  f32 = 0.5;
  var m:  f32 = 0.0;
  var vr: f32 = 0.0;
  let e = -GL_KA * bs * bs;
  var g: f32 = 1.0;
  for (var i: i32 = 0; i < 5; i = i + 1) {
    let b = exp(e * g);
    s  = s  + a * (0.5 + b * (lqNoise(p) - 0.5));
    vr = vr + a * a * (1.0 - b * b);
    m  = m + a;
    a  = a * 0.5;
    g  = g * GL_KG;
    // GLSL's mat2(.8,.6,-.6,.8) is COLUMN-major — columns (.8,.6) and
    // (-.6,.8) — so the product is written out rather than constructed.
    p = vec2<f32>(0.8 * p.x - 0.6 * p.y, 0.6 * p.x + 0.8 * p.y) * 2.03;
  }
  return vec2<f32>(s / m, GL_KR * sqrt(vr) / m);
}

fn lqRidge(v: f32, k: f32) -> f32 {
  return pow(clamp(1.0 - abs(v * 2.0 - 1.0), 0.0, 1.0), k);
}

// The sheet's four-stop ramp, shared by every branch of every program.
fn lqRamp(v: f32, cA: vec3<f32>, cB: vec3<f32>, cC: vec3<f32>, cD: vec3<f32>) -> vec3<f32> {
  var c = mix(cA, cB, smoothstep(0.0, 0.45, v));
  c = mix(c, cC, smoothstep(0.38, 0.72, v));
  c = mix(c, cD, smoothstep(0.68, 1.0, v));
  // The editor's four colours are the default ramp. An optional custom palette
  // can replace them without changing the scalar field that produces \`v\`.
  return select(c, mfRampLin(v, u.paletteCount,
                             u.paletteStop0.rgb, u.paletteStop1.rgb, u.paletteStop2.rgb,
                             u.paletteStop3.rgb, u.paletteStop4.rgb, u.paletteStop5.rgb,
                             u.paletteStop6.rgb, u.paletteStop7.rgb, u.paletteStop8.rgb,
                             u.paletteStop9.rgb, u.paletteStop10.rgb, u.paletteStop11.rgb), u.paletteCount > 0.5);
}

// ---------------------------------------------------------------------------
// The three nonlinearities the fluid applies to a pre-blurred field, each
// integrated over the detail \`lqFbm\` attenuated away. Three-point
// Gauss-Hermite — nodes 0 and ±sqrt(3)·sd, weights 4/6 and 1/6 — reproduces a
// gaussian's second AND fourth moments, which is what keeps a ridged filament
// spreading as it dims instead of just dimming. \`vs\` is an \`lqFbm\` result:
// \`.x\` the value, \`.y\` that standard deviation.
// ---------------------------------------------------------------------------
fn lqRidgeS(vs: vec2<f32>, k: f32) -> f32 {
  let d = GL_GH * vs.y;
  return (lqRidge(vs.x - d, k) + 4.0 * lqRidge(vs.x, k) + lqRidge(vs.x + d, k)) / 6.0;
}

fn lqStepS(vs: vec2<f32>, a: f32, b: f32) -> f32 {
  let d = GL_GH * vs.y;
  return (smoothstep(a, b, vs.x - d) + 4.0 * smoothstep(a, b, vs.x)
        + smoothstep(a, b, vs.x + d)) / 6.0;
}

fn lqPowS(vs: vec2<f32>, k: f32) -> f32 {
  let d = GL_GH * vs.y;
  return (pow(clamp(vs.x - d, 0.0, 1.0), k) + 4.0 * pow(clamp(vs.x, 0.0, 1.0), k)
        + pow(clamp(vs.x + d, 0.0, 1.0), k)) / 6.0;
}

// ---------------------------------------------------------------------------
// Curated local flow programs. Each preset owns a different spatial model;
// colour changes are secondary to silhouette, frequency, and motion structure.
// ---------------------------------------------------------------------------

fn glsFinishPresetFluid(colorIn: vec3<f32>, p: vec2<f32>) -> vec3<f32> {
  var color = colorIn;
  color = mix(color, u.highlightColor.rgb,
              u.shade * 0.22 * smoothstep(0.15, 1.15, dot(p, vec2<f32>(-0.32, 0.78))));
  color = color * (1.0 - u.shade * 0.34
                  * smoothstep(-0.1, 1.2, dot(p, vec2<f32>(0.45, -0.62))));
  color = color * (1.0 - u.shade * 0.22 * smoothstep(0.72, 1.08, length(p)));
  return clamp(color, vec3<f32>(0.0), vec3<f32>(1.0));
}

fn glsFinishEmissionFluid(colorIn: vec3<f32>, p: vec2<f32>) -> vec3<f32> {
  var color = colorIn;
  if (u.glassEnabled > 0.5) {
    color = mix(color, u.highlightColor.rgb,
                u.shade * 0.22 * smoothstep(0.15, 1.15, dot(p, vec2<f32>(-0.32, 0.78))));
  }
  color = color * (1.0 - u.shade * 0.34
                  * smoothstep(-0.1, 1.2, dot(p, vec2<f32>(0.45, -0.62))));
  color = color * (1.0 - u.shade * 0.22 * smoothstep(0.72, 1.08, length(p)));
  return clamp(color, vec3<f32>(0.0), vec3<f32>(1.0));
}

fn glsSiriBand(q: vec2<f32>, drift: f32, phaseOffset: f32, amplitude: f32,
               mainY: f32, envelope: f32, softness: f32) -> vec2<f32> {
  let y = amplitude * envelope * sin(q.x * 1.0 + drift + phaseOffset);
  let distanceToLine = abs(q.y - y);
  let line = 0.018 / (sqrt(distanceToLine * distanceToLine + softness * softness) + 0.026);
  let bandDistance = max(0.0, max(q.y - max(mainY, y), min(mainY, y) - q.y));
  let band = 0.018 / (bandDistance + 0.075);
  return vec2<f32>(line, band);
}

fn glsSiriFluid(p: vec2<f32>, t: f32) -> vec3<f32> {
  // The reference wave is a main sinusoid plus four chromatically separated
  // waves. Their enclosed bands carry colour while the shared crest stays hot.
  let scale = 0.74 + u.zoom * 0.34;
  let q = p / scale;
  let xNorm = q.x;
  let envelopeBase = cos(1.57079633 * min(abs(0.9 * xNorm), 1.0));
  let envelope = envelopeBase * envelopeBase;
  let low = 0.5 + 0.5 * cos(t * 0.37);
  let mid = 0.5 + 0.5 * sin(t * 0.51 + 1.2);
  let high = 0.5 + 0.5 * cos(t * 0.73 + 2.1);
  let drift = t * 2.4;
  let mainAmplitude = 0.25 + u.ridgeAmt * 0.075 + low * 0.018;
  let bandAmplitude = mainAmplitude + mid * 0.025 + high * 0.018;
  let mainY = mainAmplitude * envelope * sin(q.x * 1.1 + drift);
  let separation = 1.85 + u.warp * 0.2 + mid * 0.28;
  let softness = 0.035 + (1.0 - u.ridgeAmt) * 0.018 + mid * 0.006;

  let band0 = glsSiriBand(q, drift, -separation, bandAmplitude, mainY, envelope, softness);
  let band1 = glsSiriBand(q, drift, -separation * 0.34, bandAmplitude, mainY, envelope, softness);
  let band2 = glsSiriBand(q, drift, separation * 0.34, bandAmplitude, mainY, envelope, softness);
  let band3 = glsSiriBand(q, drift, separation, bandAmplitude, mainY, envelope, softness);
  let w0 = band0.x + band0.y;
  let w1 = band1.x + band1.y;
  let w2 = band2.x + band2.y;
  let w3 = band3.x + band3.y;
  let total = w0 + w1 + w2 + w3;
  let dominant0 = w0 * w0;
  let dominant1 = w1 * w1;
  let dominant2 = w2 * w2;
  let dominant3 = w3 * w3;
  let dominantTotal = dominant0 + dominant1 + dominant2 + dominant3;
  let spectral = (u.colorA.rgb * dominant0 + u.colorC.rgb * dominant1
                + u.colorB.rgb * dominant2 + u.colorD.rgb * dominant3)
                / max(dominantTotal, 0.0001);
  let energy = (1.0 - exp(-total * 0.58)) * envelope;
  let mainDistance = abs(q.y - mainY);
  let whiteCore = exp(-mainDistance * mainDistance / 0.0028) * envelope;
  let glassFill = select(0.0, 1.0, u.glassEnabled > 0.5);
  let atmosphere = mix(u.colorD.rgb, u.colorB.rgb,
                       smoothstep(-0.7, 0.7, q.y)) * 0.018 * glassFill;
  var color = atmosphere + spectral * energy * 1.14;
  color = color + u.highlightColor.rgb * whiteCore * (0.18 + 0.1 * low);
  let emissionMask = mix(smoothstep(0.08, 0.25, energy + whiteCore * 0.12),
                         1.0, glassFill);
  color = color * emissionMask;
  color = color / (vec3<f32>(1.0) + color * 0.18);
  return glsFinishEmissionFluid(color, p);
}

fn glsSpectrumHeight(q: vec2<f32>, t: f32, frequency: f32,
                     phaseOffset: f32, amplitude: f32) -> f32 {
  let x = q.x * 2.15;
  let envelope = pow(4.0 / (4.0 + x * x), 4.0);
  let breathing = 0.82 + 0.18 * sin(t * 0.48 + phaseOffset * 0.7);
  let wave = abs(sin(frequency * x - t * 1.36 + phaseOffset));
  return envelope * amplitude * breathing * (0.28 + 0.72 * wave);
}

fn glsSpectrumLayer(q: vec2<f32>, height: f32, softness: f32) -> f32 {
  return (1.0 - smoothstep(max(height - softness, 0.0), height + softness, abs(q.y)))
         * smoothstep(0.0, 0.045, height);
}

fn glsSpectrumFluid(p: vec2<f32>, t: f32) -> vec3<f32> {
  // Three symmetric filled wave surfaces orbit a persistent support line. This
  // keeps the iOS 9 voice-field silhouette without depending on canvas strokes.
  let scale = 0.74 + u.zoom * 0.34;
  let q = p / scale;
  let amplitude = 0.26 + u.ridgeAmt * 0.27;
  let frequency = 0.72 + u.warp * 0.095;
  let softness = 0.026 + (1.0 - u.ridgeAmt) * 0.032;
  let h0 = glsSpectrumHeight(q, t, frequency * 0.82, -1.2, amplitude * 0.72);
  let h1 = glsSpectrumHeight(q, t, frequency, 0.45, amplitude);
  let h2 = glsSpectrumHeight(q, t, frequency * 1.17, 2.05, amplitude * 0.82);
  let l0 = glsSpectrumLayer(q, h0, softness);
  let l1 = glsSpectrumLayer(q, h1, softness);
  let l2 = glsSpectrumLayer(q, h2, softness);
  let spectrumX = q.x * 2.15;
  let envelope = pow(4.0 / (4.0 + spectrumX * spectrumX), 4.0);
  let support = exp(-q.y * q.y / 0.00072) * envelope;
  let total = l0 + l1 + l2;
  let spectral = (u.colorB.rgb * l0 + u.colorC.rgb * l1 + u.colorD.rgb * l2)
                 / max(total, 0.001);
  let glassFill = select(0.0, 1.0, u.glassEnabled > 0.5);
  var color = u.colorD.rgb * 0.025 * glassFill
            + spectral * (1.0 - exp(-total * 0.86));
  color = color + u.colorA.rgb * support * 0.58;
  color = color / (vec3<f32>(1.0) + color * 0.2);
  return glsFinishEmissionFluid(color, p);
}

fn glsAuroraLayer(p: vec2<f32>, t: f32, offset: f32) -> f32 {
  let drift = t * 0.18 + offset * 2.5;
  let wave1 = sin(p.x * (2.0 + u.warp * 0.13) + drift + offset * 6.0) * 0.25;
  let wave2 = sin(p.x * 3.7 + drift * 1.3 + offset * 4.0) * 0.12;
  let wave3 = sin(p.x * 7.2 + drift * 0.7 + offset * 8.0) * 0.055;
  let noiseValue = lqFbm(vec2<f32>(p.x * 1.6 + drift * 0.35,
                                   p.y * 0.8 + offset * 3.0), 0.018).x;
  let center = offset * 0.46 + wave1 + wave2 + wave3
               + (noiseValue - 0.5) * 0.28;
  let dist = abs(p.y - center);
  let glow = exp(-dist * dist * (13.0 - 5.0 * u.ridgeAmt));
  let shimmer = lqFbm(vec2<f32>(p.x * 4.0 + t * 0.22,
                                p.y * 7.0 + offset * 5.0), 0.012).x;
  return glow * (0.64 + 0.36 * shimmer);
}

fn glsAuroraFluid(p: vec2<f32>, t: f32) -> vec3<f32> {
  let q = p * (0.82 + u.zoom * 0.58);
  let l0 = glsAuroraLayer(q, t, -0.72);
  let l1 = glsAuroraLayer(q, t, 0.0);
  let l2 = glsAuroraLayer(q, t, 0.72);
  var color = u.colorA.rgb * (0.46 + 0.18 * (q.y + 1.0));
  color = color + u.colorB.rgb * l0 * 1.3;
  color = color + u.colorC.rgb * l1 * 1.15;
  color = color + u.colorD.rgb * l2 * 1.2;
  color = color + mix(u.colorB.rgb, u.colorD.rgb, 0.5) * min(l0 * l2, l1) * 0.65;

  let starUv = (q + vec2<f32>(1.0)) * 18.0;
  let starCell = floor(starUv);
  let starHash = lqHash(starCell);
  let starPoint = exp(-dot(fract(starUv) - vec2<f32>(0.5),
                            fract(starUv) - vec2<f32>(0.5)) * 90.0);
  let stars = step(0.965, starHash) * starPoint
              * (0.55 + 0.45 * sin(t * (1.0 + starHash * 2.0) + starHash * 6.28));
  color = color + u.highlightColor.rgb * stars * (1.0 - clamp(l0 + l1 + l2, 0.0, 1.0));
  color = color / (vec3<f32>(1.0) + color * 0.28);
  return glsFinishPresetFluid(color, p);
}

fn glsRotate(p: vec2<f32>, angle: f32) -> vec2<f32> {
  let c = cos(angle);
  let s = sin(angle);
  return vec2<f32>(c * p.x - s * p.y, s * p.x + c * p.y);
}

fn glsNeuroShape(pIn: vec2<f32>, t: f32) -> f32 {
  var p = pIn * (0.34 + 0.08 * u.zoom);
  var sineAccum = vec2<f32>(0.0);
  var result = vec2<f32>(0.0);
  var scale = 8.0;
  for (var j: i32 = 0; j < 11; j = j + 1) {
    p = glsRotate(p, 1.0);
    sineAccum = glsRotate(sineAccum, 1.0);
    let layer = p * scale + vec2<f32>(f32(j)) + sineAccum - vec2<f32>(t * 0.34);
    sineAccum = sineAccum + sin(layer);
    result = result + (vec2<f32>(0.5) + 0.5 * cos(layer)) / scale;
    scale = scale * 1.16;
  }
  return result.x + result.y;
}

fn glsPlasmaFluid(p: vec2<f32>, t: f32) -> vec3<f32> {
  let shape = glsNeuroShape(p, t);
  let phase = shape * (10.0 + u.warp) + p.x * 1.7 - p.y * 1.3 - t * 0.52;
  let ridgeWidth = 0.62 - 0.24 * u.ridgeAmt;
  let primary = pow(abs(cos(phase)), max(1.3, u.sharp * ridgeWidth));
  let secondary = pow(abs(cos(phase * 0.53 + atan2(p.y, p.x) * 2.0 + t * 0.21)),
                      max(1.6, u.sharp * (ridgeWidth + 0.1)));
  let filaments = max(primary, secondary * 0.64);
  let core = pow(primary, 4.0);
  let polarity = 0.5 + 0.5 * sin(phase * 0.37 + shape * 3.0);
  var color = mix(u.colorA.rgb * 0.42, u.colorD.rgb * 0.48, polarity * 0.46);
  color = mix(color, u.colorB.rgb, filaments * 0.72);
  color = mix(color, u.colorC.rgb, core * 0.68);
  color = color + u.highlightColor.rgb * pow(core, 3.0) * 0.16;
  color = color / (vec3<f32>(1.0) + color * 0.34);
  return glsFinishPresetFluid(color, p);
}

fn glsChromeFluid(p: vec2<f32>, t: f32) -> vec3<f32> {
  var q = p * (1.0 + u.zoom * 0.35);
  let amplitude = 0.028 * u.warp;
  for (var i: i32 = 1; i <= 9; i = i + 1) {
    let fi = f32(i);
    q.x = q.x + amplitude / fi * cos(fi * 2.7 * q.y + t * 0.46);
    q.y = q.y + amplitude / fi * cos(fi * 3.1 * q.x - t * 0.4);
  }
  let denominator = max(abs(sin(t * 0.24 - q.y - q.x)), 0.045);
  let flare = clamp(1.0 / denominator, 0.0, 18.0);
  let metal = smoothstep(1.15, 7.5, flare);
  let fold = 0.5 + 0.5 * cos((q.x - q.y) * (3.2 + u.sharp * 0.28) + t * 0.32);
  let value = clamp(metal * 0.74 + fold * 0.36, 0.0, 1.0);
  var color = lqRamp(value, u.colorD.rgb, u.colorC.rgb, u.colorB.rgb, u.colorA.rgb);
  color = mix(color, u.colorA.rgb, pow(metal, 5.0) * 0.62);
  return glsFinishPresetFluid(color, p);
}

fn glsChromaticMetalPhase(p: vec2<f32>, t: f32) -> f32 {
  let angle = u.metalAngle * 0.01745329252;
  let scale = max(u.metalScale, 0.05);
  let stretch = mix(0.48, 1.58, clamp(u.metalStretch, 0.0, 1.0));
  var q = glsRotate(p / scale, angle);
  q = vec2<f32>(q.x / stretch, q.y * stretch);

  // The reference advances continuously while local reflections evolve out of
  // phase. Travelling domain waves provide that deformation without rotating
  // the entire pattern as one rigid layer. Integer harmonics keep a clean loop.
  let cycle = t * 0.46 + u.metalPhase * 6.28318530718;
  let evolution = clamp(u.metalEvolution, 0.0, 2.0);
  q.x = q.x + sin(q.y * 1.86 - cycle) * 0.095 * evolution;
  q.x = q.x + sin((q.x + q.y) * 1.28 + cycle * 2.0 + 1.4) * 0.045 * evolution;
  q.y = q.y + sin(q.x * 1.52 + cycle + 0.8) * 0.07 * evolution;

  let repeats = max(u.bandDensity, 1.0);
  return q.x * repeats * 2.18
       + sin(q.y * (1.3 + repeats * 0.26) - cycle) * 0.56 * evolution
       + sin((q.x - q.y) * 1.34 + cycle * 2.0 + 1.7) * 0.27 * evolution
       + sin((q.x * 0.72 + q.y) * 2.1 - cycle * 3.0 + 0.35) * 0.11 * evolution
       + sin(cycle) * 0.1
       + sin(cycle * 3.0 + 0.7) * 0.035
       + cycle
       + u.metalOffset * 6.28318530718;
}

fn glsChromaticMetalTone(phase: f32) -> f32 {
  let wave = 0.5 + 0.5 * cos(phase);
  let roughness = clamp(u.metalRoughness, 0.0, 1.0);
  let depth = clamp(u.metalDepth, 0.0, 1.0);
  let edge = 0.025 + roughness * 0.18;
  let broadReflection = smoothstep(0.5 - edge, 0.5 + edge, wave);
  let hardReflection = pow(wave, mix(13.0, 4.0, roughness));
  let blackFold = pow(1.0 - wave, mix(9.0, 3.0, roughness));
  let body = mix(wave, broadReflection, 0.2 + depth * 0.3);
  return clamp(0.018 + body * (0.46 + depth * 0.12)
               + hardReflection * (0.3 + depth * 0.42)
               - blackFold * (0.07 + depth * 0.11), 0.0, 1.0);
}

fn glsChromaticMetalSample(p: vec2<f32>, t: f32) -> vec3<f32> {
  let phase = glsChromaticMetalPhase(p, t);
  let angle = u.metalAngle * 0.01745329252;
  let brushP = glsRotate(p / max(u.metalScale, 0.05), angle);
  let brushed = sin(brushP.y * 146.0 + sin(brushP.x * 11.0) * 0.58)
              + 0.48 * sin(brushP.y * 317.0 - brushP.x * 5.0);
  let brushAmount = 0.004 + clamp(u.metalRoughness, 0.0, 1.0) * 0.014;
  let tone = clamp(glsChromaticMetalTone(phase) + brushed * brushAmount, 0.0, 1.0);
  return lqRamp(tone, u.colorD.rgb, u.colorB.rgb, u.colorC.rgb, u.colorA.rgb);
}

fn glsChromaticMetalFluid(p: vec2<f32>, t: f32) -> vec3<f32> {
  let angle = u.metalAngle * 0.01745329252;
  let splitDirection = glsRotate(vec2<f32>(0.0, 1.0), angle);
  let split = splitDirection * u.chromaticShift * 0.045;
  let redSample = glsChromaticMetalSample(p + split, t);
  let neutral = glsChromaticMetalSample(p, t);
  let blueSample = glsChromaticMetalSample(p - split, t);
  let optical = vec3<f32>(redSample.r, neutral.g, blueSample.b);
  let fringe = clamp(length(optical - neutral) * 4.0, 0.0, 1.0);
  var color = mix(neutral, optical,
                  clamp(u.chromaticShift * (0.72 + fringe * 0.28), 0.0, 1.0));
  let centerTone = glsChromaticMetalTone(glsChromaticMetalPhase(p, t));
  let glint = pow(centerTone, mix(12.0, 5.0, clamp(u.metalRoughness, 0.0, 1.0)));
  color = mix(color, u.highlightColor.rgb,
              glint * clamp(u.metalDepth, 0.0, 1.0) * 0.06);

  // A second, sphere-scale reflection layer keeps the material metallic even
  // when the optional glass shell is disabled. It modulates the animated ramp
  // instead of raising exposure, preserving dark chrome between reflections.
  let radial2 = clamp(dot(p, p), 0.0, 1.0);
  let normal = normalize(vec3<f32>(p, sqrt(max(1.0 - radial2, 0.0))));
  let roughness = clamp(u.metalRoughness, 0.0, 1.0);
  let depth = clamp(u.metalDepth, 0.0, 1.0);
  let key = pow(max(dot(normal, normalize(vec3<f32>(-0.48, 0.62, 0.62))), 0.0),
                mix(7.0, 3.0, roughness));
  let fill = pow(max(dot(normal, normalize(vec3<f32>(0.7, -0.34, 0.63))), 0.0),
                 mix(10.0, 4.0, roughness));
  let limb = 1.0 - normal.z;
  let fresnel = pow(limb, 3.0);
  let rim = pow(limb, 10.0);
  color = color * (0.86 + normal.z * 0.14);
  color = mix(color, u.highlightColor.rgb, key * (0.05 + depth * 0.13));
  color = mix(color, u.colorC.rgb, fill * (0.025 + depth * 0.07));
  color = mix(color, u.colorD.rgb, fresnel * (0.12 + depth * 0.15));
  color = mix(color, u.highlightColor.rgb, rim * (0.035 + depth * 0.055));
  return glsFinishPresetFluid(color, p);
}

fn glsOpalFluid(p: vec2<f32>, t: f32) -> vec3<f32> {
  let q = p * (0.8 + u.zoom * 0.64);
  let complexity = 0.76 + u.warp * 0.085;
  var d = -t * 0.42;
  var a = 0.0;
  for (var i: i32 = 0; i < 8; i = i + 1) {
    let fi = f32(i);
    a = a + cos(fi - d - a * q.x * complexity);
    d = d + sin(q.y * fi * complexity + a);
  }
  d = d + t * 0.42;
  let c1 = cos(q * vec2<f32>(d, a)) * 0.6 + vec2<f32>(0.4);
  let c2 = cos(a + d) * 0.5 + 0.5;
  let interference = 0.5 + 0.5 * cos(vec3<f32>(c1.x, c1.y, c2)
                         * cos(vec3<f32>(d, a, 2.5)) * 0.5 + vec3<f32>(0.5));
  let tone = fract(interference.r * 0.37 + interference.g * 0.51
                   + interference.b * 0.73 + c1.x * 0.22 - c1.y * 0.15);
  var color = lqRamp(tone, u.colorB.rgb, u.colorC.rgb, u.colorD.rgb, u.colorA.rgb);
  color = mix(color, u.colorA.rgb, 0.16 + 0.1 * interference.b);
  color = color / (vec3<f32>(1.0) + color * 0.16);
  return glsFinishPresetFluid(color, p);
}

fn glsFrostFluid(p: vec2<f32>, t: f32) -> vec3<f32> {
  // The initial frost-style orb: a slow domain warp drives broad cloudy colour
  // bodies, while a second higher-frequency field contributes adjustable veins.
  var q = p * (0.66 + u.zoom * 0.92);
  q.y = q.y + t * 0.055;
  let blur = 0.011 + 0.006 * u.zoom;
  let warpField = vec2<f32>(
    lqFbm(q * 1.14 + vec2<f32>(t * 0.055, 0.0), blur).x,
    lqFbm(q * 1.14 + vec2<f32>(6.8, -t * 0.048), blur).x
  );
  let warped = q + (warpField - vec2<f32>(0.5)) * (0.28 + u.warp * 0.17);
  let body = lqFbm(warped * 1.48 + vec2<f32>(t * 0.032, -t * 0.02), blur * 1.48);
  let veins = lqRidgeS(
    lqFbm(warped * 2.36 + vec2<f32>(3.1, -t * 0.024), blur * 2.36),
    u.sharp
  );
  let value = mix(lqStepS(body, 0.1, 0.9),
                  clamp(veins * 0.8 + body.x * 0.46, 0.0, 1.0),
                  u.ridgeAmt);
  var color = lqRamp(value, u.colorA.rgb, u.colorB.rgb, u.colorC.rgb, u.colorD.rgb);
  color = mix(color, u.colorA.rgb, 0.08 * smoothstep(0.62, 0.92, body.x));
  return glsFinishPresetFluid(color, p);
}

fn glsVoiceWaveFluid(p: vec2<f32>, t: f32) -> vec3<f32> {
  // A single broad membrane stays phase-coherent across the sphere. Nearby
  // translucent layers add volume without splitting into separate Siri bands.
  let scale = 0.76 + u.zoom * 0.34;
  let q = p / scale;
  let rimEnvelope = pow(max(1.0 - q.x * q.x, 0.0), 0.72);
  let drift = t * 0.82;
  let amplitude = 0.2 + u.warp * 0.018;
  let mainY = rimEnvelope * (amplitude * sin(q.x * 1.48 + drift)
              + 0.055 * sin(q.x * 3.2 - drift * 0.43 + 1.1));
  let distance = q.y - mainY;
  let width = 0.11 + (1.0 - u.ridgeAmt) * 0.075;
  let membrane = exp(-distance * distance / max(width * width, 0.001)) * rimEnvelope;
  let upperVeil = exp(-(distance - 0.105) * (distance - 0.105)
                      / max(width * width * 2.4, 0.001)) * rimEnvelope;
  let lowerVeil = exp(-(distance + 0.115) * (distance + 0.115)
                      / max(width * width * 2.8, 0.001)) * rimEnvelope;
  let crest = exp(-distance * distance / 0.0026) * rimEnvelope;
  let depth = sqrt(max(1.0 - clamp(dot(p, p), 0.0, 1.0), 0.0));
  var color = mix(u.colorA.rgb * 0.7, u.colorD.rgb * 0.34,
                  smoothstep(-0.82, 0.82, q.y));
  color = mix(color, u.colorB.rgb, upperVeil * 0.7);
  color = mix(color, u.colorC.rgb, lowerVeil * 0.62);
  color = color + mix(u.colorB.rgb, u.colorC.rgb, 0.46) * membrane * 0.34;
  color = color + u.highlightColor.rgb * crest * 0.14;
  color = color * (0.58 + 0.42 * depth);
  return glsFinishPresetFluid(color, p);
}

fn glsBlueDropFluid(p: vec2<f32>, t: f32) -> vec3<f32> {
  // Slow diagonal advection keeps the broad liquid bodies coherent. The two
  // shear waves replace the reference orb's circular, looped point motion.
  let depth = sqrt(max(1.0 - clamp(dot(p, p), 0.0, 1.0), 0.0));
  var q = p * mix(0.72, 1.0, depth * 0.62 + 0.38);
  q = glsRotate(q, -0.24 + 0.06 * sin(t * 0.17));
  let scale = 1.0 + u.zoom * 1.12;
  let blur = 0.012 + 0.006 * u.zoom;
  let driftA = lqFbm(q * 1.28 + vec2<f32>(t * 0.095, -t * 0.034), blur * 1.28);
  let driftB = lqFbm(glsRotate(q, 1.08) * 1.62
                     + vec2<f32>(-t * 0.042, t * 0.078), blur * 1.62);
  var flowed = q + vec2<f32>(driftA.x - 0.5, driftB.x - 0.5)
                 * (0.24 + u.warp * 0.1);
  flowed.x = flowed.x + sin(flowed.y * 2.15 + t * 0.24) * (0.035 + u.warp * 0.012);
  flowed.y = flowed.y + sin(flowed.x * 1.38 - t * 0.18) * (0.045 + u.warp * 0.01);
  let body = lqFbm(flowed * scale + vec2<f32>(t * 0.025, -t * 0.018), blur * scale);
  let marble = lqRidgeS(lqFbm(flowed * (1.72 + u.zoom * 0.9)
                              + vec2<f32>(2.7, -t * 0.035),
                              blur * (1.72 + u.zoom * 0.9)),
                            0.8 + u.sharp * 0.46);
  let value = clamp(mix(body.x, body.x * 0.62 + marble * 0.58, u.ridgeAmt), 0.0, 1.0);
  var color = lqRamp(value, u.colorA.rgb, u.colorB.rgb, u.colorC.rgb, u.colorD.rgb);
  let light = pow(max(dot(normalize(vec3<f32>(p, depth)),
                          normalize(vec3<f32>(-0.48, 0.62, 0.92))), 0.0), 3.2);
  color = mix(color, u.highlightColor.rgb, light * (0.035 + 0.05 * u.shade));
  color = color * (0.74 + 0.26 * depth);
  return glsFinishPresetFluid(color, p);
}

fn glsVioletEmberFluid(p: vec2<f32>, t: f32) -> vec3<f32> {
  // A radial twist and two crossing drift fields make heavy molten folds. This
  // moves as a breathing spiral instead of the reference orb's closed circles.
  let scale = 1.08 + u.zoom * 1.18;
  let blur = 0.011 + 0.005 * u.zoom;
  let radius = length(p);
  let twist = t * 0.055 + radius * (0.72 + u.warp * 0.11)
              + 0.08 * sin(t * 0.31 + radius * 4.0);
  let q = glsRotate(p * scale, twist);
  let low = lqFbm(q * 1.18 + vec2<f32>(t * 0.068, -t * 0.105), blur * 1.18);
  let cross = lqFbm(glsRotate(q, -1.12) * 1.52
                    + vec2<f32>(-t * 0.094, t * 0.042)
                    + vec2<f32>(low.x * 1.35, -low.x * 0.72), blur * 1.52);
  let warped = q + vec2<f32>(low.x - 0.5, cross.x - 0.5)
                   * (0.3 + u.warp * 0.12);
  let melt = lqFbm(warped * 1.34
                   + vec2<f32>(cross.x * 1.48, low.x * 1.12), blur * 1.34);
  let veins = lqRidgeS(lqFbm(warped * (2.05 + u.zoom * 0.72)
                             + vec2<f32>(-2.1, t * 0.052),
                             blur * (2.05 + u.zoom * 0.72)),
                           0.82 + u.sharp * 0.58);
  let heat = smoothstep(0.18, 0.92,
                        melt.x * (0.72 - u.ridgeAmt * 0.16)
                        + veins * (0.32 + u.ridgeAmt * 0.5));
  var color = lqRamp(heat, u.colorA.rgb, u.colorB.rgb, u.colorC.rgb, u.colorD.rgb);
  let pulse = 0.94 + 0.06 * sin(t * 0.44 + melt.x * 5.0);
  color = color * pulse;
  color = mix(color, u.highlightColor.rgb, pow(veins, 4.0) * 0.045);
  return glsFinishPresetFluid(color, p);
}

fn glsRefractiveBlobFluid(p: vec2<f32>, t: f32) -> vec3<f32> {
  // Broad advected cells give the lens something legible to bend. A slower
  // caustic ribbon crosses those cells out of phase, so the material evolves
  // without looking like a texture rotating inside a fixed sphere.
  let radial2 = clamp(dot(p, p), 0.0, 1.0);
  let depth = sqrt(max(1.0 - radial2, 0.0));
  let scale = 0.82 + u.zoom * 1.08;
  let blur = 0.012 + 0.005 * u.zoom;
  var q = glsRotate(p * scale, 0.08 * sin(t * 0.17));
  let driftA = lqFbm(q * 1.16 + vec2<f32>(t * 0.052, -t * 0.078), blur * 1.16);
  let driftB = lqFbm(glsRotate(q, 1.21) * 1.34
                     + vec2<f32>(-t * 0.064, t * 0.041), blur * 1.34);
  q = q + vec2<f32>(driftA.x - 0.5, driftB.x - 0.5)
          * (0.34 + u.warp * 0.105);

  let body = lqFbm(q * 1.42 + vec2<f32>(driftB.x * 0.82, driftA.x * 0.66),
                   blur * 1.42);
  let ribbonPhase = q.y * (2.2 + u.warp * 0.11)
                  + sin(q.x * 1.72 - t * 0.19) * 0.92
                  + sin((q.x + q.y) * 1.08 + t * 0.13) * 0.46;
  let ribbon = pow(clamp(1.0 - abs(sin(ribbonPhase)), 0.0, 1.0),
                   0.82 + u.sharp * 0.23);
  let fold = lqRidgeS(lqFbm(q * 2.05 + vec2<f32>(2.8, -t * 0.037),
                            blur * 2.05), 0.9 + u.sharp * 0.32);
  let value = clamp(body.x * 0.5 + driftA.x * 0.16
                    + ribbon * (0.2 + u.ridgeAmt * 0.2)
                    + fold * u.ridgeAmt * 0.18, 0.0, 1.0);

  var color = lqRamp(value, u.colorA.rgb, u.colorB.rgb, u.colorC.rgb, u.colorD.rgb);
  let caustic = pow(ribbon, 3.1) * (0.24 + 0.28 * u.ridgeAmt)
               + pow(fold, 4.2) * 0.08;
  color = mix(color, u.colorD.rgb, clamp(caustic, 0.0, 0.52));
  color = color * (0.7 + depth * 0.3);
  let key = pow(max(dot(normalize(vec3<f32>(p, depth)),
                        normalize(vec3<f32>(-0.42, 0.58, 0.9))), 0.0), 4.0);
  color = mix(color, u.highlightColor.rgb, key * 0.055);
  return glsFinishPresetFluid(color, p);
}

fn glsParticleRibbonFluid(p: vec2<f32>, t: f32) -> vec3<f32> {
  // The visible body is emitted by the dedicated particle pipeline. Keeping
  // this branch empty lets the shared fullscreen pass contribute only the
  // optional glass shell and its transparent background contract.
  return vec3<f32>(0.0);
}

// ---------------------------------------------------------------------------
// GLIMMER: original flow programs (not from upstream).
// ---------------------------------------------------------------------------

// Nebula (style 30): two logarithmic spiral arms advected by fbm, a hot core,
// and a sparse twinkling star field. Warp tightens the spiral, Sharp thins the
// arms, Ridge brightens them.
fn glmRotate(p: vec2<f32>, angle: f32) -> vec2<f32> {
  let c = cos(angle);
  let s = sin(angle);
  return vec2<f32>(c * p.x - s * p.y, s * p.x + c * p.y);
}

fn glmNebulaFluid(p: vec2<f32>, t: f32) -> vec3<f32> {
  let q = p / (0.78 + u.zoom * 0.5);
  let r = length(q);
  let angle = atan2(q.y, q.x);
  let bend = lqFbm(q * 1.9 + vec2<f32>(t * 0.05, -t * 0.04), 0.02).x;
  let swirl = angle + t * 0.21 - log(max(r, 0.015)) * (1.4 + u.warp * 0.22);
  // cos(2 * swirl) is continuous across atan2's seam, so the arms never tear.
  let arms = pow(0.5 + 0.5 * cos(2.0 * swirl + bend * 3.6), 1.0 + u.sharp * 0.75);
  let dust = lqFbm(glmRotate(q, t * 0.09) * 3.1 + vec2<f32>(4.2), 0.03).x;
  let core = exp(-r * r * 16.0);
  let falloff = 1.0 - smoothstep(0.1, 1.1, r);
  let v = clamp(arms * (0.4 + 0.7 * dust) * falloff * (0.45 + u.ridgeAmt * 0.8)
                + core * 0.6 + dust * 0.1, 0.0, 0.92);
  var color = lqRamp(v, u.colorA.rgb, u.colorB.rgb, u.colorC.rgb, u.colorD.rgb);

  let cellPos = glmRotate(q, t * 0.03) * 24.0;
  let cell = floor(cellPos);
  let seed = lqHash(cell + vec2<f32>(17.0, 3.0));
  let local = fract(cellPos) - vec2<f32>(0.5);
  let twinkle = 0.55 + 0.45 * sin(t * 2.7 + seed * 41.0);
  let star = step(0.955, seed) * smoothstep(0.22, 0.0, length(local)) * twinkle;
  color = color + u.highlightColor.rgb * star * (0.9 - core);
  color = mix(color, u.highlightColor.rgb, core * 0.3);
  return glsFinishPresetFluid(color, p);
}

// Sonar (style 31): concentric pulses leaving the centre, bent by noise, with a
// rotating sweep beam and contacts that flare when the beam passes them.
// Band density sets the ring count, Warp how far noise bends them.
fn glmSonarFluid(p: vec2<f32>, t: f32) -> vec3<f32> {
  let q = p / (0.85 + u.zoom * 0.3);
  let r = length(q);
  let angle = atan2(q.y, q.x);
  let n = lqFbm(q * 1.7 + vec2<f32>(t * 0.05, t * 0.035), 0.025).x;
  // A few thin pulses travelling outward, fading as they spread.
  let ringPhase = r * (1.2 + u.bandDensity * 0.9) - t * 0.55 + (n - 0.5) * u.warp * 0.35;
  let rings = pow(0.5 + 0.5 * cos(ringPhase * 6.28318530718), 6.0 + u.sharp * 6.0)
              * (1.0 - smoothstep(0.35, 1.0, r)) * 0.8;
  let beamAngle = angle - t * 0.9;
  // \`behind\` is 0 right where the beam is and grows through the area it has
  // already swept, so the afterglow trails it and the leading edge stays crisp.
  let behind = fract(-beamAngle / 6.28318530718);
  let beam = pow(max(cos(beamAngle), 0.0), 40.0) + 0.6 * exp(-behind * 7.0);
  let cellPos = q * 5.5;
  let seed = lqHash(floor(cellPos) + vec2<f32>(5.0, 11.0));
  let contactAngle = atan2(floor(cellPos).y + 0.5, floor(cellPos).x + 0.5);
  let wake = fract(-(contactAngle - t * 0.9) / 6.28318530718);
  let contact = step(0.9, seed) * smoothstep(0.32, 0.0, length(fract(cellPos) - vec2<f32>(0.5)))
                * exp(-wake * 5.0) * step(r, 0.92);
  let grid = (1.0 - smoothstep(0.0, 0.012, abs(fract(r * 4.0 + 0.5) - 0.5))) * 0.06;
  let v = clamp(0.12 + n * 0.2 + grid + rings * (0.35 + u.ridgeAmt * 0.5)
                + beam * 0.5 * (1.0 - r * 0.6), 0.0, 1.0);
  var color = lqRamp(v, u.colorA.rgb, u.colorB.rgb, u.colorC.rgb, u.colorD.rgb);
  color = color + u.highlightColor.rgb * contact * 1.2;
  return glsFinishPresetFluid(color, p);
}

fn glsPresetFluid(p: vec2<f32>, style: i32, t: f32) -> vec3<f32> {
  if (style == 9) { return glsSiriFluid(p, t); }
  if (style == 10) { return glsAuroraFluid(p, t); }
  if (style == 11) { return glsPlasmaFluid(p, t); }
  if (style == 12) { return glsChromeFluid(p, t); }
  if (style == 13) { return glsOpalFluid(p, t); }
  if (style == 14) { return glsSpectrumFluid(p, t); }
  if (style == 15) { return glsFrostFluid(p, t); }
  if (style == 19) { return glsVoiceWaveFluid(p, t); }
  if (style == 20) { return glsBlueDropFluid(p, t); }
  if (style == 21) { return glsVioletEmberFluid(p, t); }
  if (style == 22) { return glsChromaticMetalFluid(p, t); }
  if (style == 23) { return glsRefractiveBlobFluid(p, t); }
  if (style == 24) { return glsParticleRibbonFluid(p, t); }
  // GLIMMER: original flows.
  if (style == 30) { return glmNebulaFluid(p, t); }
  if (style == 31) { return glmSonarFluid(p, t); }
  return glsFrostFluid(p, t);
}

// ---------------------------------------------------------------------------
// The fluid, at one point, already blurred and straight (not premultiplied):
// the sheet's shader on \`fu\` — both programs, all four inner branches, and the
// shared shade tail — with the blur folded into the noise bank as above. The
// disc's own alpha is the caller's, because it is analytic now.
// ---------------------------------------------------------------------------
fn glsFluid(fu: vec2<f32>, md: i32, t: f32) -> vec3<f32> {
  let df = length(fu);

  let cA = u.colorA.rgb;
  let cB = u.colorB.rgb;
  let cC = u.colorC.rgb;
  let cD = u.colorD.rgb;

  // The blur's sigma, carried from fluid units into the fluid's own domains.
  // \`sp\` is it in pp/q units — the warp shifts q about but does not stretch it
  // on average, so pp and q share one. \`sw\` is the warp field's own, softened
  // by GL_KWA.
  let blurSigma = select(GL_BSIG_CLEAR, GL_BSIG_GLASS, u.glassEnabled > 0.5);
  let sp = blurSigma * u.zoom;
  let sw = sp * 1.1 * GL_KWA;

  var fcol: vec3<f32>;
  if (md < 0) {
    // progA — the warped body, the only branch with the slow vertical drift
    // and the only one that reads Ridge.
    var pp = fu * u.zoom;
    pp.y = pp.y + t * 0.05;
    let w = vec2<f32>(lqFbm(pp * 1.1 + vec2<f32>(0.0, t * 0.09), sw).x,
                      lqFbm(pp * 1.1 + vec2<f32>(7.7, -t * 0.07), sw).x);
    let q = pp + u.warp * (w - vec2<f32>(0.5));
    let body  = lqFbm(q * 1.5 + vec2<f32>(t * 0.04, 0.0), sp * 1.5);
    let veins = lqRidgeS(lqFbm(q * 2.2 + vec2<f32>(3.1), sp * 2.2), u.sharp);
    let v = mix(lqStepS(body, 0.12, 0.88),
                clamp(veins * 0.85 + 0.45 * body.x, 0.0, 1.0), u.ridgeAmt);
    fcol = lqRamp(v, cA, cB, cC, cD);
  } else {
    // progB — same warp, no vertical drift, four inner branches.
    let pp = fu * u.zoom;
    let w = vec2<f32>(lqFbm(pp * 1.1 + vec2<f32>(0.0, t * 0.09), sw).x,
                      lqFbm(pp * 1.1 + vec2<f32>(7.7, -t * 0.07), sw).x);
    let q = pp + u.warp * (w - vec2<f32>(0.5));
    if (md == 0) {
      // Nectar — a sine band the noise leans on. The fbm is INSIDE the sine, so
      // the removed detail integrates out in closed form rather than by
      // quadrature: E[sin(A + 6e)] = sin(A)·exp(-18·sd²). The second term of
      // the exponent is the same integral for the sine's own \`q.x * 7.0\`, which
      // the blur attenuates by exp(-49·sp²/2).
      let n0 = lqFbm(q * 2.2, sp * 2.2);
      let damp = exp(-18.0 * n0.y * n0.y - 24.5 * sp * sp);
      var v = 0.5 + 0.5 * damp * sin(q.x * 7.0 + n0.x * 6.0 + t * 0.35);
      v = mix(v, lqFbm(q * 1.4 + vec2<f32>(t * 0.03), sp * 1.4).x, 0.25);
      fcol = lqRamp(v, cA, cB, cC, cD);
    } else if (md == 1) {
      // Lumen — two ridged fields multiplied into filaments. The two fields are
      // independent, so each integrates its own detail out before the product.
      let v = lqRidgeS(lqFbm(q * 1.4 + vec2<f32>(t * 0.06, 0.0), sp * 1.4), u.sharp)
            * lqRidgeS(lqFbm(q * 1.7 - vec2<f32>(0.0, t * 0.05), sp * 1.7), u.sharp);
      fcol = lqRamp(pow(v, 0.7), cA, cB, cC, cD);
    } else if (md == 6) {
      // Sprig — noise warped by noise, with a ridged edge darkening it.
      let v = lqFbm(q * 1.3 + vec2<f32>(1.5 * lqFbm(q * 2.6 + vec2<f32>(t * 0.025), sp * 2.6).x), sp * 1.3);
      let edge = lqRidgeS(lqFbm(q * 2.1 + vec2<f32>(7.0), sp * 2.1), 1.3);
      fcol = lqRamp(lqStepS(v, 0.1, 0.9), cA, cB, cC, cD);
      fcol = fcol * (1.0 - 0.18 * edge);
    } else {
      // Haze and Smoke — the same rising plume at two palettes.
      let q2 = q + vec2<f32>(0.0, -t * 0.14);
      let v = lqFbm(q2 * 1.6 + vec2<f32>(2.2 * lqFbm(q2 * 2.4 + vec2<f32>(0.0, -t * 0.05), sp * 2.4).x), sp * 1.6);
      fcol = lqRamp(lqPowS(v, 1.5), cA, cB, cC, cD);
    }
  }

  // The sheet's shared tail: a highlight up-left, a shadow down-right, and a
  // darkened limb. All three are far below the blur's cutoff, so they are the
  // sheet's own expressions untouched. The grain term the sheet ends on is not
  // ported — see the header. The two \`1 - shade*k*smoothstep(...)\` terms are
  // multiplicative darkening, not colours, so they stay literal.
  fcol = mix(fcol, u.highlightColor.rgb,
             u.shade * 0.3 * smoothstep(0.25, 1.25, dot(fu, vec2<f32>(-0.32, 0.78))));
  fcol = fcol * (1.0 - u.shade * 0.42 * smoothstep(-0.05, 1.25, dot(fu, vec2<f32>(0.45, -0.62))));
  fcol = fcol * (1.0 - u.shade * 0.3 * smoothstep(0.72, 1.0, df));
  return clamp(fcol, vec3<f32>(0.0), vec3<f32>(1.0));
}

// ---------------------------------------------------------------------------
// The shell.
// ---------------------------------------------------------------------------

// Source-over onto an opaque destination, straight (un-premultiplied) sRGB.
fn glsOver(dst: vec3<f32>, src: vec3<f32>, a: f32) -> vec3<f32> {
  let k = clamp(a, 0.0, 1.0);
  return src * k + dst * (1.0 - k);
}

fn glsRefractionProfile(t: f32) -> f32 {
  let depth = clamp(t, 0.0, 1.0);
  let circular = sqrt(max(1.0 - (1.0 - depth) * (1.0 - depth), 0.0));
  return 1.0 - circular;
}

fn glsHighlightLobe(normal: vec2<f32>, direction: vec2<f32>, cut: f32,
                     power: f32) -> f32 {
  let angular = clamp((dot(normal, direction) - cut) / max(1.0 - cut, 0.001),
                      0.0, 1.0);
  return pow(angular, power);
}

fn glsContourWave(angle: f32, t: f32) -> vec2<f32> {
  let style = i32(u.style + 0.5);
  if (style == 19) {
    let wave = sin(angle * 2.0 + t * 0.27) * 0.72
               + sin(angle * 4.0 - t * 0.16 + 2.1) * 0.28;
    let slope = cos(angle * 2.0 + t * 0.27) * 1.44
                + cos(angle * 4.0 - t * 0.16 + 2.1) * 1.12;
    return vec2<f32>(wave, slope);
  }
  let wave = sin(angle * 3.0 + t * 0.62) * 0.52
             + sin(angle * 5.0 - t * 0.41 + 1.7) * 0.31
             + sin(angle * 2.0 + t * 0.23 + 3.1) * 0.17;
  let slope = cos(angle * 3.0 + t * 0.62) * 1.56
              + cos(angle * 5.0 - t * 0.41 + 1.7) * 1.55
              + cos(angle * 2.0 + t * 0.23 + 3.1) * 0.34;
  return vec2<f32>(wave, slope);
}

fn glsContourStrength() -> f32 {
  if (u.style >= 18.5) { return 0.11; }
  return select(0.09, 0.16, u.style >= 15.5);
}

fn glsContourScale(uv: vec2<f32>, t: f32, amount: f32) -> f32 {
  if (amount <= 0.0) { return 1.0; }
  let contour = glsContourWave(atan2(uv.y, uv.x), t);
  return 1.0 + clamp(amount, 0.0, 1.0) * glsContourStrength() * contour.x;
}

fn glsContourNormal(uv: vec2<f32>, rad: f32, t: f32, amount: f32) -> vec2<f32> {
  let distance = length(uv);
  if (distance <= 0.0001) { return vec2<f32>(0.0); }
  let radial = uv / distance;
  let contour = glsContourWave(atan2(uv.y, uv.x), t);
  let slope = clamp(amount, 0.0, 1.0) * glsContourStrength() * contour.y;
  let tangent = vec2<f32>(-radial.y, radial.x);
  return normalize(radial - tangent * (rad * slope / distance));
}

fn glsRefractionNormal(base: vec2<f32>, p: vec2<f32>, t: f32,
                       style: i32) -> vec2<f32> {
  if (style != 23) { return base; }
  let tangent = vec2<f32>(-base.y, base.x);
  let a = lqFbm(p * 2.15 + vec2<f32>(t * 0.061, -t * 0.043), 0.018).x;
  let b = lqFbm(glsRotate(p, 1.37) * 2.55
                  + vec2<f32>(-t * 0.037, t * 0.052), 0.021).x;
  let wave = (a - b) * 0.76 + sin(atan2(p.y, p.x) * 3.0 + t * 0.21) * 0.08;
  return normalize(base + tangent * wave);
}

fn orbGlassLiquidAnim(uv01: vec2<f32>) -> vec4<f32> {
  // The runner hands uv01 with y down from the top, like stitchable MSL's
  // \`position\`; the orb was authored bottom-left, so flip back.
  let fc = vec2<f32>(uv01.x, 1.0 - uv01.y) * u.size;
  let uv = (2.0 * fc - u.size) / max(min(u.size.x, u.size.y), 1.0);

  let rad = max(u.radius, 0.05);
  let t = u.time * u.speed;
  let s = i32(u.style + 0.5);
  let emissionOnly = u.glassEnabled <= 0.5 && (s == 9 || s == 14 || s == 24);
  let contourRad = rad * glsContourScale(uv, t, u.contourDeform);

  // Nothing on this pixel — and here that is the whole fluid and the whole
  // shell skipped, over roughly 60% of the quad. 1.01 is the far edge of the
  // ball's own coverage, \`1 - smoothstep(0.99, 1.01, pd)\` on the last line of
  // this function, which is EXACTLY zero past it, so the full path already
  // returns opaque black here. An early-out, not a clip: the number is that
  // coverage term's own far edge, so do not "tidy" it to 1.0 — that would
  // shave the outer half of the limb's antialiasing.
  //
  // Tested on \`uv\` rather than on \`pd\` because \`|uv| > rad * 1.01\` IS
  // \`pd > 1.01\`, and it keeps \`p\` and \`pd\` in the same basic block as
  // everything that reads them — the shape the four sibling orbs of this port
  // need, where branching on \`d\` after computing it makes the compiler stop
  // folding \`uv / rad\` into its uses and the moved last bit comes back through
  // their grain hash as speckle up to 34/255. Glass Liquid has no grain and is
  // nearly immune either way: at 1024x1024 this costs under a dozen bytes of a
  // four-million-byte frame, off by 1/255. Those are the branch existing, not a
  // pixel wrongly skipped — a copy of this guard with a threshold it can never
  // reach diffs identically, and against it the guard is exactly 0/255.
  if (length(uv) > contourRad * (1.01 + mfEdgeD(u.edgeSoftness))) {
    // Off the ball entirely — but the halo lives out here, so hand back
    // what the edge bank paints on nothing. Exactly black at Glow 0.
    let halo = clamp(mfEdgeGlow(vec3<f32>(0.0), uv, vec2<f32>(0.0), contourRad,
                                u.edgeSoftness, u.edgeGlow, u.glowColor.rgb),
                     vec3<f32>(0.0), vec3<f32>(1.0));
    let haloAlpha = max(halo.r, max(halo.g, halo.b));
    return vec4<f32>(halo, haloAlpha);
  }

  let p   = uv / contourRad;     // deformed ball space: |p| == 1 on the edge
  let pd  = length(p);

  // ---- the fluid ------------------------------------------------------
  let fu = p / GL_FU;

  // Branch dispatch. Source indices 0/2/4/6 are progA (md < 0); the others are
  // progB at the sheet's own mode number. An if-chain avoids a runtime-indexed
  // lookup here.
  var md: i32 = -1;
  if (s == 1) { md = 1; }
  else if (s == 3 || s == 8) { md = 7; }
  else if (s == 5) { md = 6; }
  else if (s == 7) { md = 0; }

  let clearFa = 1.0 - smoothstep(GL_CLEAR_EA, GL_CLEAR_EB, pd);
  let contourNormal = glsContourNormal(uv, rad, t, u.contourDeform);
  let normal = glsRefractionNormal(contourNormal, p, t, s);
  let edgeDepth = max(1.0 - pd, 0.0);
  let refractionWidth = 0.015 + 0.95 * clamp(u.shellMidAlpha, 0.0, 1.0);
  let refractionT = edgeDepth / max(refractionWidth, 0.001);
  let refractionProfile = pow(glsRefractionProfile(refractionT), 0.68);
  let refractionAmount = 1.6 * clamp(u.glassOpacity, 0.0, 1.0)
                         * refractionProfile;
  let refractedP = p - normal * refractionAmount;
  var fcol = vec3<f32>(0.0);
  if (clearFa > 0.0) {
    if (s >= 9) {
      if (u.glassEnabled > 0.5) {
        // Three actual fluid evaluations produce optical dispersion. At the
        // outer boundary the reference lens pulls samples from deep inside the
        // orb; the channels converge continuously at the inner edge of the
        // refraction band.
        let channelSplit = 0.14 * clamp(u.gloss, 0.0, 2.0)
                           * clamp(u.glassOpacity, 0.0, 1.0)
                           * refractionProfile;
        let redSample = glsPresetFluid(refractedP - normal * channelSplit, s, t);
        let greenSample = glsPresetFluid(refractedP, s, t);
        let blueSample = glsPresetFluid(refractedP + normal * channelSplit, s, t);
        fcol = vec3<f32>(redSample.r, greenSample.g, blueSample.b);
      }
      else { fcol = glsPresetFluid(p, s, t); }
    }
    else { fcol = glsFluid(fu, md, t); }
  }

  // Voice-like presets become a true emissive layer when glass is disabled.
  // Their empty pixels no longer inherit the opaque circular canvas fill.
  let lum = dot(fcol, vec3<f32>(0.213, 0.715, 0.072));
  let clearSat = clamp(vec3<f32>(lum) + (fcol - vec3<f32>(lum)) * 1.22,
                       vec3<f32>(0.0), vec3<f32>(1.0));
  let particleGlassOverlay = s == 24;
  var col = select(
    glsOver(u.canvasColor.rgb, clearSat, 0.99 * clearFa),
    vec3<f32>(0.0),
    particleGlassOverlay,
  );
  if (emissionOnly) {
    let signal = max(clearSat.r, max(clearSat.g, clearSat.b));
    let emissionCoverage = smoothstep(0.025, 0.16, signal);
    col = clearSat * emissionCoverage;
  }
  if (u.glassEnabled > 0.5) {
    // Surface lighting stays on a thin arc. The broad visual change comes from
    // the refracted fluid above, not from a translucent white overlay.
    // Its weights still need enough contrast to keep the exposed colour and
    // highlight controls perceptible in the compact scene preview.
    let surfaceWidth = select(
      0.026 + 0.055 * clamp(u.shellEdgeAlpha, 0.0, 1.0),
      0.09 + 0.12 * clamp(u.shellEdgeAlpha, 0.0, 1.0),
      particleGlassOverlay,
    );
    let surfaceBand = (1.0 - smoothstep(0.0, surfaceWidth, edgeDepth)) * clearFa;
    let opticalRim = pow(surfaceBand, select(1.8, 1.3, particleGlassOverlay));
    let innerRimAlpha = select(
      opticalRim * u.glassOpacity * 0.45,
      opticalRim * u.glassOpacity * 0.14,
      particleGlassOverlay,
    );
    col = glsOver(col, u.shellInner.rgb, innerRimAlpha);

    let coolDirection = normalize(vec2<f32>(0.84, 0.54));
    let warmDirection = normalize(vec2<f32>(-0.62, -0.78));
    let coolSplit = glsHighlightLobe(normal, coolDirection, -0.32, 1.8);
    let warmSplit = glsHighlightLobe(normal, warmDirection, -0.28, 2.0);
    let dispersion = opticalRim * clamp(u.gloss, 0.0, 2.0)
                     * (0.8 + 0.8 * u.shellEdgeAlpha);
    col = glsOver(col, u.shellMid.rgb, dispersion * coolSplit);
    col = glsOver(col, u.shellEdge.rgb, dispersion * warmSplit);

    let edgeShadow = opticalRim * (0.015 + 0.15 * u.shellEdgeAlpha)
                     * (0.15 + 0.85 * max(dot(normal, vec2<f32>(0.45, -0.89)), 0.0));
    col = col * (1.0 - edgeShadow);

    let keyDirection = normalize(vec2<f32>(-0.68, 0.73));
    let fillDirection = normalize(vec2<f32>(0.74, -0.67));
    let key = opticalRim * glsHighlightLobe(normal, keyDirection, 0.2, 2.8)
              * clamp(u.sheen, 0.0, 2.0) * 1.4;
    let fill = opticalRim * glsHighlightLobe(normal, fillDirection, 0.4, 3.6)
               * clamp(u.sheen, 0.0, 2.0) * 1.0;
    col = glsOver(col, u.sheenColor.rgb, key);
    col = glsOver(col, u.specColor.rgb, fill);
  }

  // The ball's own edge, and nothing outside it — everything the effect does
  // not paint must be exactly 0 so the page shows through.
  let ballA = 1.0 - smoothstep(0.99 - mfEdgeD(u.edgeSoftness), 1.01 + mfEdgeD(u.edgeSoftness), pd);
  col = clamp(col * max(u.exposure, 0.0), vec3<f32>(0.0), vec3<f32>(1.0)) * ballA;
  // The Orbs edge bank — the Edge group's Glow. Adding zero is exactly
  // the render this file was diffed against, and zero is the default.
  let edged = mfEdgeGlow(col, uv, vec2<f32>(0.0), contourRad,
                         u.edgeSoftness, u.edgeGlow, u.glowColor.rgb);
  let finalColor = clamp(edged, vec3<f32>(0.0), vec3<f32>(1.0));
  let emissionAlpha = max(finalColor.r, max(finalColor.g, finalColor.b));
  let sphereAlpha = clamp(max(ballA, emissionAlpha), 0.0, 1.0);
  let finalAlpha = select(
    sphereAlpha,
    emissionAlpha,
    emissionOnly || particleGlassOverlay,
  );
  return vec4<f32>(finalColor, finalAlpha);
}
`,hx=`// Render passes for the Glimmer shader bank: the fullscreen orb pass, the
// particle-ribbon instanced pass, and the glass composite over the ribbons.
// From "orb" by LerSent001 (MIT, see NOTICE.md), unchanged apart from this header.

struct VOut {
  @builtin(position) pos: vec4<f32>,
  @location(0) uv: vec2<f32>,
};

@vertex
fn vs_main(@builtin(vertex_index) i: u32) -> VOut {
  var p = array<vec2<f32>, 3>(
    vec2<f32>(-1.0, -1.0),
    vec2<f32>( 3.0, -1.0),
    vec2<f32>(-1.0,  3.0),
  );
  var out: VOut;
  out.pos = vec4<f32>(p[i], 0.0, 1.0);
  let uv01 = (p[i] + vec2<f32>(1.0)) * 0.5;
  out.uv = vec2<f32>(uv01.x, 1.0 - uv01.y);
  return out;
}

@fragment
fn fs_main(in: VOut) -> @location(0) vec4<f32> {
  let c = orbGlassLiquidAnim(in.uv);

  let fc = vec2<f32>(in.uv.x, 1.0 - in.uv.y) * u.size;
  let uv = (2.0 * fc - u.size) / max(min(u.size.x, u.size.y), 1.0);
  let rad = max(u.radius, 0.05);
  let t = u.time * u.speed;
  let contourRad = rad * glsContourScale(uv, t, u.contourDeform);
  let q = (2.0 * fc - u.size) / u.size;
  let fitEnd = 1.0;
  let fitFeather = 2.0 / max(min(u.size.x, u.size.y), 1.0);
  let fitStart = min(mix(contourRad, fitEnd, 0.5), fitEnd - fitFeather);
  let fit = 1.0 - smoothstep(fitStart, fitEnd, max(abs(q.x), abs(q.y)));
  return vec4<f32>(c.rgb * fit, c.a * fit);
}

const PR_U_SEGMENTS: u32 = 384u;
const PR_V_SEGMENTS: u32 = 96u;
const PR_PARTICLES_PER_LAYER: u32 = PR_U_SEGMENTS * PR_V_SEGMENTS;

struct RibbonOut {
  @builtin(position) pos: vec4<f32>,
  @location(0) local: vec2<f32>,
  @location(1) color: vec3<f32>,
  @location(2) opacity: f32,
};

fn prHash(value: f32) -> f32 {
  return fract(sin(value * 12.9898 + 78.233) * 43758.5453);
}

fn prRotateX(p: vec3<f32>, angle: f32) -> vec3<f32> {
  let c = cos(angle);
  let s = sin(angle);
  return vec3<f32>(p.x, c * p.y - s * p.z, s * p.y + c * p.z);
}

fn prRotateY(p: vec3<f32>, angle: f32) -> vec3<f32> {
  let c = cos(angle);
  let s = sin(angle);
  return vec3<f32>(c * p.x + s * p.z, p.y, -s * p.x + c * p.z);
}

fn prCurve(theta: f32, layer: f32, phase: f32) -> vec3<f32> {
  let local = theta + layer * 0.11;
  let foldPhase = 2.0 * local + phase * (0.72 + layer * 0.025);
  let fold = clamp(u.ribbonFold, 0.0, 1.2);
  let radial = 0.4 + (0.085 + fold * 0.04) * cos(foldPhase);
  let orbit = local + phase * 0.13
              + sin(local - phase * 0.22 + layer) * fold * 0.13;
  let vertical = (0.235 + fold * 0.085) * sin(foldPhase)
                 + 0.055 * sin(local * 3.0 - phase * 0.46 + layer * 0.7);
  return vec3<f32>(radial * cos(orbit), vertical, radial * sin(orbit));
}

fn prPalette(valueIn: f32) -> vec3<f32> {
  let value = fract(valueIn) * 4.0;
  if (value < 1.0) { return mix(u.colorA.rgb, u.colorB.rgb, value); }
  if (value < 2.0) { return mix(u.colorB.rgb, u.colorC.rgb, value - 1.0); }
  if (value < 3.0) { return mix(u.colorC.rgb, u.colorD.rgb, value - 2.0); }
  return mix(u.colorD.rgb, u.colorA.rgb, value - 3.0);
}

@vertex
fn ribbon_vs_main(
  @builtin(vertex_index) vertexIndex: u32,
  @builtin(instance_index) instanceIndex: u32,
) -> RibbonOut {
  var corners = array<vec2<f32>, 6>(
    vec2<f32>(-1.0, -1.0), vec2<f32>(1.0, -1.0), vec2<f32>(-1.0, 1.0),
    vec2<f32>(-1.0, 1.0), vec2<f32>(1.0, -1.0), vec2<f32>(1.0, 1.0),
  );
  let layerIndex = instanceIndex / PR_PARTICLES_PER_LAYER;
  let particleIndex = instanceIndex % PR_PARTICLES_PER_LAYER;
  let uIndex = particleIndex / PR_V_SEGMENTS;
  let vIndex = particleIndex % PR_V_SEGMENTS;
  let layer = f32(layerIndex);
  let random = prHash(f32(instanceIndex));
  let activeLayer = layer < floor(clamp(u.ribbonCount, 2.0, 6.0) + 0.5);

  let uCoord = (f32(uIndex) + prHash(f32(instanceIndex) + 11.0) * 0.56)
               / f32(PR_U_SEGMENTS);
  let vCoord = (f32(vIndex) + prHash(f32(instanceIndex) + 29.0) * 0.46)
               / f32(PR_V_SEGMENTS);
  let strip = vCoord * 2.0 - 1.0;
  let t = u.time * u.speed;
  let phase = t * 0.48;
  let arc = fract(uCoord + layer * 0.211 - phase * 0.019);
  let arcLength = 0.76 + 0.055 * sin(t * 0.23 + layer * 1.71);
  let arcPosition = arc / arcLength;
  let arcEnvelope = smoothstep(0.0, 0.075, arcPosition)
                    * (1.0 - smoothstep(0.88, 1.0, arcPosition));
  let particleVisible = activeLayer
                        && arc <= arcLength
                        && random <= clamp(u.particleDensity, 0.2, 1.0);
  let theta = uCoord * 6.28318530718;
  let center = prCurve(theta, layer, phase);
  let ahead = prCurve(theta + 0.006, layer, phase);
  let tangent = normalize(ahead - center);
  let radial = normalize(center + vec3<f32>(0.001, 0.013, 0.007));
  let side = normalize(cross(tangent, radial));
  let surfaceNormal = normalize(cross(side, tangent));
  let twist = theta * (0.72 + u.ribbonTwist * 0.58)
              + phase * 0.74 + layer * 1.17;
  let ribbonDirection = normalize(side * cos(twist) + surfaceNormal * sin(twist));
  let widthEnvelope = (0.72 + 0.28 * pow(sin(theta * 1.5 + phase + layer), 2.0))
                      * mix(0.42, 1.0, sqrt(max(arcEnvelope, 0.0)));
  var position = center + ribbonDirection * strip * u.ribbonWidth * 0.5 * widthEnvelope;

  let pulse = sin(t * 0.73 + layer * 1.71)
              + 0.44 * sin(t * 1.17 + layer * 0.83 + 1.2);
  position *= 1.0 + u.ribbonBreath * pulse * 0.16;
  let layerCenter = layer
                    - (floor(clamp(u.ribbonCount, 2.0, 6.0) + 0.5) - 1.0) * 0.5;
  position = prRotateY(
    position,
    layerCenter * 0.24 + sin(t * 0.19 + layer * 1.3) * 0.055,
  );
  position = prRotateX(
    position,
    layerCenter * 0.14 + cos(t * 0.17 + layer * 0.9) * 0.04,
  );
  position = prRotateY(position, t * 0.105 + sin(t * 0.21) * 0.11);
  position = prRotateX(position, -0.2 + sin(t * 0.16 + layer * 0.1) * 0.16);

  let minSize = max(min(u.size.x, u.size.y), 1.0);
  let depthScale = 0.88 + position.z * 0.16;
  let orbPosition = position.xy * u.radius * 1.45 * depthScale;
  let clip = vec2<f32>(
    orbPosition.x * minSize / max(u.size.x, 1.0),
    orbPosition.y * minSize / max(u.size.y, 1.0),
  );
  let canvasParticleScale = clamp(minSize / 640.0, 0.22, 1.0);
  let pointPixels = max(0.6, u.particleSize)
                    * (1.5 + u.particleBloom * 2.5)
                    * (0.92 + position.z * 0.18)
                    * canvasParticleScale;
  let corner = corners[vertexIndex];
  let pointOffset = corner * pointPixels * 2.0 / max(u.size, vec2<f32>(1.0));

  let colorPhase = uCoord * 0.32 + layer * 0.19 + phase * 0.025
                   + position.z * 0.08;
  let stripEdge = smoothstep(0.58, 1.0, abs(strip));
  let front = clamp(0.78 + position.z * 0.54, 0.5, 1.24);
  let baseOpacity = mix(0.025, 0.009, clamp(u.shade / 1.5, 0.0, 1.0));
  var out: RibbonOut;
  out.pos = select(
    vec4<f32>(2.0, 2.0, 1.0, 1.0),
    vec4<f32>(clip + pointOffset, clamp(0.5 - position.z * 0.12, 0.05, 0.95), 1.0),
    particleVisible,
  );
  out.local = corner;
  out.color = pow(
    mix(prPalette(colorPhase), u.highlightColor.rgb, stripEdge * 0.56),
    vec3<f32>(0.72),
  ) * front;
  out.opacity = select(
    0.0,
    baseOpacity
      * (0.72 + stripEdge * 1.28)
      * arcEnvelope
      * pow(canvasParticleScale, 1.35),
    particleVisible,
  );
  return out;
}

@fragment
fn ribbon_fs_main(in: RibbonOut) -> @location(0) vec4<f32> {
  let distanceSquared = dot(in.local, in.local);
  if (distanceSquared > 1.0) { discard; }
  let core = exp(-distanceSquared * 4.8);
  let halo = exp(-distanceSquared * 1.35);
  let bloom = clamp(u.particleBloom, 0.0, 2.0);
  let intensity = in.opacity * (core * 1.9 + halo * bloom * 0.72)
                  * max(u.exposure, 0.0);
  let glowMix = clamp((halo - core * 0.45) * (0.18 + u.edgeGlow * 0.5), 0.0, 0.7);
  let color = mix(in.color, u.glowColor.rgb, glowMix);
  let alpha = clamp(intensity, 0.0, 1.0);
  return vec4<f32>(color * alpha, alpha);
}

@group(0) @binding(1) var ribbonTexture: texture_2d<f32>;
@group(0) @binding(2) var ribbonSampler: sampler;

fn prTextureUvFromOrb(p: vec2<f32>, contourRad: f32) -> vec2<f32> {
  let minSize = max(min(u.size.x, u.size.y), 1.0);
  let fc = (p * contourRad * minSize + u.size) * 0.5;
  return clamp(
    vec2<f32>(fc.x / max(u.size.x, 1.0), 1.0 - fc.y / max(u.size.y, 1.0)),
    vec2<f32>(0.0),
    vec2<f32>(1.0),
  );
}

fn prSampleRibbon(p: vec2<f32>, contourRad: f32) -> vec4<f32> {
  return textureSampleLevel(
    ribbonTexture,
    ribbonSampler,
    prTextureUvFromOrb(p, contourRad),
    0.0,
  );
}

@fragment
fn ribbon_composite_fs_main(in: VOut) -> @location(0) vec4<f32> {
  let direct = textureSampleLevel(ribbonTexture, ribbonSampler, in.uv, 0.0);
  if (u.glassEnabled <= 0.5) { return direct; }

  let fc = vec2<f32>(in.uv.x, 1.0 - in.uv.y) * u.size;
  let minSize = max(min(u.size.x, u.size.y), 1.0);
  let uv = (2.0 * fc - u.size) / minSize;
  let rad = max(u.radius, 0.05);
  let t = u.time * u.speed;
  let contourRad = rad * glsContourScale(uv, t, u.contourDeform);
  let shell = orbGlassLiquidAnim(in.uv);
  if (length(uv) > contourRad * (1.01 + mfEdgeD(u.edgeSoftness))) {
    return shell;
  }

  let p = uv / contourRad;
  let pd = length(p);
  let clearFa = 1.0 - smoothstep(GL_CLEAR_EA, GL_CLEAR_EB, pd);
  let normal = glsContourNormal(uv, rad, t, u.contourDeform);
  let edgeDepth = max(1.0 - pd, 0.0);
  let refractionWidth = 0.015 + 0.95 * clamp(u.shellMidAlpha, 0.0, 1.0);
  let refractionT = edgeDepth / max(refractionWidth, 0.001);
  let refractionProfile = pow(glsRefractionProfile(refractionT), 0.68);
  let refractionAmount = 1.6 * clamp(u.glassOpacity, 0.0, 1.0)
                         * refractionProfile;
  let refractedP = p - normal * refractionAmount;
  let channelSplit = 0.14 * clamp(u.gloss, 0.0, 2.0)
                     * clamp(u.glassOpacity, 0.0, 1.0)
                     * refractionProfile;
  let redSample = prSampleRibbon(refractedP - normal * channelSplit, contourRad);
  let greenSample = prSampleRibbon(refractedP, contourRad);
  let blueSample = prSampleRibbon(refractedP + normal * channelSplit, contourRad);
  let refractedAlpha = max(redSample.a, max(greenSample.a, blueSample.a)) * clearFa;
  let refracted = vec4<f32>(
    vec3<f32>(redSample.r, greenSample.g, blueSample.b) * clearFa,
    refractedAlpha,
  );
  return vec4<f32>(
    shell.rgb + refracted.rgb * (1.0 - shell.a),
    shell.a + refracted.a * (1.0 - shell.a),
  );
}
`,gx=`speed.radius.zoom.warp.ridgeAmt.sharp.shade.sheen.gloss.shellMidAlpha.shellEdgeAlpha.exposure.style.edgeSoftness.edgeGlow.paletteCount.glassEnabled.glassOpacity.contourDeform.bandDensity.chromaticShift.metalScale.metalStretch.metalAngle.metalOffset.metalPhase.metalEvolution.metalRoughness.metalDepth.particleDensity.ribbonCount.ribbonWidth.ribbonTwist.ribbonFold.ribbonBreath.particleSize.particleBloom`.split(`.`),_x=[`colorA`,`colorB`,`colorC`,`colorD`,`highlightColor`,`shellInner`,`shellMid`,`shellEdge`,`sheenColor`,`specColor`,`canvasColor`,`glowColor`],vx=12,yx=new Map;function bx(e){let t=yx.get(e);return t||(t=[Number.parseInt(e.slice(1,3),16)/255,Number.parseInt(e.slice(3,5),16)/255,Number.parseInt(e.slice(5,7),16)/255],yx.size>4096&&yx.clear(),yx.set(e,t)),t}function xx(e,t,n,r,i){e.fill(0),e[0]=t,e[1]=n,e[2]=r;let a=3;for(let t of gx)t===`style`?e[a]=Sy[i.style]:t===`paletteCount`?e[a]=0:t===`glassEnabled`?e[a]=+!!i.glassEnabled:e[a]=i[t],a++;_x.forEach((t,n)=>{let[r,a,o]=bx(i[t]),s=40+n*4;e[s]=r,e[s+1]=a,e[s+2]=o,e[s+3]=1});for(let t=0;t<vx;t++)e[40+(_x.length+t)*4+3]=1}var Sx=221184,Cx=null,wx=new Set;function Tx(){return typeof navigator<`u`&&`gpu`in navigator&&!!navigator.gpu}function Ex(e){return wx.add(e),()=>wx.delete(e)}function Dx(){return Cx||=Ax().catch(e=>{throw Cx=null,e}),Cx}var Ox={color:{srcFactor:`one`,dstFactor:`one-minus-src-alpha`,operation:`add`},alpha:{srcFactor:`one`,dstFactor:`one-minus-src-alpha`,operation:`add`}},kx={color:{srcFactor:`one`,dstFactor:`one`,operation:`add`},alpha:{srcFactor:`one`,dstFactor:`one-minus-src-alpha`,operation:`add`}};async function Ax(){if(!Tx())throw Error(`WebGPU is not available in this browser`);let e=await navigator.gpu.requestAdapter({powerPreference:`low-power`});if(!e)throw Error(`No WebGPU adapter`);let t=await e.requestDevice(),n=navigator.gpu.getPreferredCanvasFormat(),r=t.createShaderModule({label:`glimmer`,code:`${mx}\n${hx}`}),i=(await r.getCompilationInfo()).messages.filter(e=>e.type===`error`);if(i.length)throw t.destroy(),Error(i.map(e=>`${e.lineNum}:${e.linePos} ${e.message}`).join(`
`));let a=(e,i,a,o)=>t.createRenderPipelineAsync({label:e,layout:`auto`,vertex:{module:r,entryPoint:i},fragment:{module:r,entryPoint:a,targets:[{format:n,blend:o}]},primitive:{topology:`triangle-list`}}),o=await a(`glimmer-orb`,`vs_main`,`fs_main`,Ox),s=null,c=!1,l=()=>{if(c)return;c=!0;let e=performance.now();Promise.all([a(`glimmer-ribbon`,`ribbon_vs_main`,`ribbon_fs_main`,kx),a(`glimmer-ribbon-composite`,`vs_main`,`ribbon_composite_fs_main`,Ox)]).then(([t,n])=>{s={ribbon:t,composite:n},`${Math.round(performance.now()-e)}`},e=>{`${String(e)}`,console.warn(`Glimmer: particle pipelines failed`,e)})};return t.lost.then(e=>{Cx=null;let t=e.message||e.reason||`device lost`;for(let e of[...wx])e(t)}),{device:t,format:n,orb:o,particles:()=>(l(),s),sampler:t.createSampler({addressModeU:`clamp-to-edge`,addressModeV:`clamp-to-edge`,magFilter:`linear`,minFilter:`linear`})}}var jx=class{constructor(e,t){this.canvas=e,this.gpu=t,this.values=new Float32Array(136),this.ribbonGroup=null,this.ribbonTarget=null,this.compositeGroup=null;let n=e.getContext(`webgpu`);if(!n)throw Error(`Could not create a WebGPU canvas context`);this.context=n,n.configure({device:t.device,format:t.format,alphaMode:`premultiplied`}),this.uniforms=t.device.createBuffer({size:this.values.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.orbGroup=t.device.createBindGroup({layout:t.orb.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniforms}}]})}ensureRibbonTarget(e){this.ribbonGroup??=this.gpu.device.createBindGroup({layout:e.ribbon.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniforms}}]});let{width:t,height:n}=this.canvas;return this.ribbonTarget&&this.compositeGroup&&this.ribbonTarget.width===t&&this.ribbonTarget.height===n?this.compositeGroup:(this.ribbonTarget?.destroy(),this.ribbonTarget=this.gpu.device.createTexture({label:`glimmer-ribbon-target`,size:{width:t,height:n},format:this.gpu.format,usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING}),this.compositeGroup=this.gpu.device.createBindGroup({layout:e.composite.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uniforms}},{binding:1,resource:this.ribbonTarget.createView()},{binding:2,resource:this.gpu.sampler}]}),this.compositeGroup)}render(e,t){let{device:n}=this.gpu,r=e.style===`particleRibbon`?this.gpu.particles():null;if(e.style===`particleRibbon`&&!r)return!1;xx(this.values,this.canvas.width,this.canvas.height,t,e),n.queue.writeBuffer(this.uniforms,0,this.values);let i=n.createCommandEncoder(),a=null;if(r){a=this.ensureRibbonTarget(r);let e=i.beginRenderPass({colorAttachments:[{view:this.ribbonTarget.createView(),clearValue:{r:0,g:0,b:0,a:0},loadOp:`clear`,storeOp:`store`}]});e.setPipeline(r.ribbon),e.setBindGroup(0,this.ribbonGroup),e.draw(6,Sx,0,0),e.end()}let o=i.beginRenderPass({colorAttachments:[{view:this.context.getCurrentTexture().createView(),clearValue:{r:0,g:0,b:0,a:0},loadOp:`clear`,storeOp:`store`}]});return r?(o.setPipeline(r.composite),o.setBindGroup(0,a)):(o.setPipeline(this.gpu.orb),o.setBindGroup(0,this.orbGroup)),o.draw(3,1,0,0),o.end(),n.queue.submit([i.finish()]),!0}destroy(){this.ribbonTarget?.destroy(),this.uniforms.destroy();try{this.context.unconfigure()}catch{}}},Mx=`
.glimmer-orb{position:relative;display:block;width:100%;height:100%;contain:layout paint;}
.glimmer-layer{position:absolute;inset:0;width:100%;height:100%;display:block;transition:opacity .4s ease;}
.glimmer-hidden{opacity:0;}
.glimmer-off{display:none;}

glimmer-orb{display:inline-block;width:120px;height:120px;vertical-align:middle;}

.glimmer-shimmer{
  --glimmer-dim:#6b6e77;
  --glimmer-hot:color-mix(in srgb,var(--glimmer-glow,#fff) 22%,#fff);
  background-image:linear-gradient(105deg,var(--glimmer-dim) 0%,var(--glimmer-dim) 38%,var(--glimmer-hot) 49%,#aeb0b6 56%,var(--glimmer-dim) 68%,var(--glimmer-dim) 100%);
  background-size:260% 100%;background-position:135% 0;
  -webkit-background-clip:text;background-clip:text;color:transparent;
  animation:glimmer-sweep 2.35s ease-in-out infinite;
}
.glimmer-status{position:relative;display:grid;overflow:hidden;}
.glimmer-status>span{grid-area:1/1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
  transition:transform .42s cubic-bezier(.2,.8,.2,1),opacity .42s ease;}
.glimmer-status>span.is-entering{transform:translateY(70%);opacity:0;}
.glimmer-status>span.is-leaving{transform:translateY(-70%);opacity:0;}

.glimmer-progress{position:relative;height:3px;border-radius:3px;background:rgb(255 255 255/.08);overflow:hidden;
  transition:opacity .3s ease;}
.glimmer-progress[hidden]{display:block;opacity:0;}
.glimmer-progress>i{position:absolute;inset:0 auto 0 0;width:0;border-radius:inherit;
  background:linear-gradient(90deg,color-mix(in srgb,var(--glimmer-glow) 35%,transparent),var(--glimmer-glow));
  box-shadow:0 0 10px var(--glimmer-glow);transition:width .45s cubic-bezier(.2,.8,.2,1),background .6s ease;}
.glimmer-progress.is-indeterminate>i{width:32%;animation:glimmer-indeterminate 1.5s cubic-bezier(.45,0,.55,1) infinite;}

.glimmer-splash{position:fixed;inset:0;z-index:2147483000;display:grid;place-items:center;
  font:500 15px/1.35 "Segoe UI Variable Text","Segoe UI",system-ui,-apple-system,sans-serif;color:#e8eaf0;
  opacity:0;transition:opacity .45s ease,--glimmer-glow .7s ease;}
.glimmer-splash.is-shown{opacity:1;}
.glimmer-splash.is-leaving{opacity:0;}
.glimmer-splash[data-backdrop=solid]{background:radial-gradient(70% 70% at 50% 42%,
  color-mix(in srgb,var(--glimmer-glow) 13%,var(--glimmer-canvas)) 0%,var(--glimmer-canvas) 72%);}
.glimmer-splash[data-backdrop=dim]{background:rgb(4 5 9/.72);backdrop-filter:blur(6px);}
.glimmer-splash-stack{display:flex;flex-direction:column;align-items:center;gap:14px;padding:24px;}
.glimmer-splash-orb{width:var(--glimmer-size,200px);height:var(--glimmer-size,200px);margin-bottom:6px;}
.glimmer-splash-title{font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:rgb(255 255 255/.45);}
.glimmer-splash .glimmer-shimmer{--glimmer-dim:#9497a1;}
.glimmer-splash[data-state=success] .glimmer-shimmer{--glimmer-dim:#7fd9b4;}
.glimmer-splash[data-state=error] .glimmer-shimmer{animation:none;background:none;color:#ff9aa2;}
.glimmer-splash .glimmer-status{font-size:22px;font-weight:560;min-width:min(320px,80vw);max-width:80vw;text-align:center;}
.glimmer-splash .glimmer-progress{width:min(240px,60vw);}
.glimmer-splash-detail{min-height:1.35em;font-size:12.5px;color:rgb(255 255 255/.38);font-variant-numeric:tabular-nums;}

.glimmer-pill{--glimmer-size:64px;position:relative;display:inline-flex;align-items:center;gap:calc(var(--glimmer-size)*.18);
  padding:calc(var(--glimmer-size)*.09) calc(var(--glimmer-size)*.42) calc(var(--glimmer-size)*.09) calc(var(--glimmer-size)*.09);
  border-radius:999px;background:#101114;border:1px solid rgb(255 255 255/.11);
  box-shadow:0 24px 60px -28px rgb(0 0 0/.9),0 0 0 1px color-mix(in srgb,var(--glimmer-glow) 0%,transparent),inset 0 1px 0 rgb(255 255 255/.04);
  transition:box-shadow .6s ease,--glimmer-glow .7s ease;overflow:hidden;max-width:100%;
  font:560 calc(var(--glimmer-size)*.3)/1.1 "Segoe UI Variable Display","Segoe UI",system-ui,-apple-system,sans-serif;}
.glimmer-pill[data-state=success]{box-shadow:0 24px 60px -28px rgb(0 0 0/.9),0 0 0 1px color-mix(in srgb,#22e39a 45%,transparent),inset 0 1px 0 rgb(255 255 255/.04);}
.glimmer-pill[data-state=error]{box-shadow:0 24px 60px -28px rgb(0 0 0/.9),0 0 0 1px color-mix(in srgb,#ff4d5e 50%,transparent),inset 0 1px 0 rgb(255 255 255/.04);}
.glimmer-pill-orb{width:var(--glimmer-size);height:var(--glimmer-size);flex:none;border-radius:50%;overflow:hidden;}
.glimmer-pill .glimmer-status{min-width:0;}
.glimmer-pill .glimmer-progress{position:absolute;left:calc(var(--glimmer-size)*.5);right:calc(var(--glimmer-size)*.5);bottom:0;height:2px;background:transparent;}

@keyframes glimmer-sweep{0%,12%{background-position:135% 0;}70%,100%{background-position:-55% 0;}}
@keyframes glimmer-indeterminate{0%{left:-32%;}100%{left:100%;}}
@media (prefers-reduced-motion:reduce){
  .glimmer-shimmer{animation:none;background-position:50% 0;}
  .glimmer-progress.is-indeterminate>i{animation-duration:4s;}
}
`,Nx=!1;function Px(){if(Nx||typeof document>`u`)return;Nx=!0;try{CSS.registerProperty({name:`--glimmer-glow`,syntax:`<color>`,inherits:!0,initialValue:`#956cff`})}catch{}let e=document.createElement(`style`);e.dataset.glimmer=``,e.textContent=Mx,document.head.append(e)}var Fx=new Set,Ix=0;function Lx(e){Ix=0;for(let t of Fx)t.tick(e);Fx.size&&(Ix=requestAnimationFrame(Lx))}function Rx(){!Ix&&Fx.size&&(Ix=requestAnimationFrame(Lx))}var zx=typeof matchMedia==`function`?matchMedia(`(prefers-reduced-motion: reduce)`):null,Bx=class e{constructor(t,n={}){this.mode=`starting`,this.gpuCanvas=null,this.gpuSurface=null,this.phase=0,this.lastFrame=null,this.visible=!0,this.paused=!1,this.readyFired=!1,this.gpuError=null,this.destroyed=!1,this.gpuShowing=!1,this.retireTimer=0,Px(),this.options=n,this.element=document.createElement(`div`),this.element.className=`glimmer-orb`,this.fallbackCanvas=document.createElement(`canvas`),this.fallbackCanvas.className=`glimmer-layer glimmer-canvas2d`,this.element.append(this.fallbackCanvas),t.append(this.element),this.canvasSurface=new px(this.fallbackCanvas),this.applyLook(n.look??e.lookFor(n.preset,n.params),n.state??`thinking`,!0),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(this.element),this.intersectionObserver=typeof IntersectionObserver==`function`?new IntersectionObserver(e=>{this.visible=e.some(e=>e.isIntersecting),this.lastFrame=null}):null,this.intersectionObserver?.observe(this.element),this.offLost=Ex(()=>this.dropToCanvas()),this.resize(),Fx.add(this),Rx(),(n.renderer??`auto`)!==`canvas`&&Tx()?this.startGpu():this.mode=`canvas`}static lookFor(e=Ay,t){let n=ky(e);if(!n)throw Error(`Glimmer: unknown preset "${e}"`);return{params:{...n.params,...t}}}get renderMode(){return this.mode}get state(){return this.transition.state}get targetParams(){return{...this.states[this.transition.state]}}get params(){return{...this.current}}setState(e){if(e===this.transition.state)return this;let t=e===`thinking`?this.look.activation??.22:this.look.transition??.65;return this.transition.go(e,this.states[e],t,performance.now()),this.element.dataset.state=e,this}setPreset(t,n){return this.setLook(e.lookFor(t,n))}setLook(e){return this.applyLook(e,this.transition.state,!1),this}set(e){return this.look={...this.look,params:{...this.look.params,...e}},this.states=pb(this.look,this.upstreamFor(this.look)),this.transition.retarget(this.states[this.transition.state]),this}pause(){return this.paused=!0,this}resume(){return this.paused=!1,this.lastFrame=null,this}destroy(){this.destroyed||(this.destroyed=!0,Fx.delete(this),this.resizeObserver.disconnect(),this.intersectionObserver?.disconnect(),this.offLost(),this.gpuSurface?.destroy(),this.canvasSurface.destroy(),this.element.remove())}upstreamFor(e){let t=ky(e.params.style);return t?.origin===`orb`?t.params:void 0}applyLook(e,t,n){this.look=e,this.states=pb(e,this.upstreamFor(e)),n?(this.transition=new _b(this.states[t],t),this.current=this.states[t]):this.transition.go(t,this.states[t],e.transition??.65,performance.now()),this.element.dataset.state=t,this.element.style.setProperty(`--glimmer-glow`,e.params.glowColor),this.element.style.setProperty(`--glimmer-canvas`,e.params.canvasColor)}async startGpu(){let e=window.setTimeout(()=>{this.mode===`starting`&&(this.gpuError=`WebGPU still starting after 8 s; drawing with canvas meanwhile`,this.mode=`canvas`)},8e3);try{let t=await Dx();if(window.clearTimeout(e),this.destroyed)return;let n=document.createElement(`canvas`);n.className=`glimmer-layer glimmer-webgpu glimmer-hidden`,this.element.append(n),this.gpuCanvas=n,this.resize(),this.gpuSurface=new jx(n,t),this.mode=`webgpu`,this.gpuError=null,this.element.dataset.renderer=`webgpu`}catch(t){window.clearTimeout(e),this.gpuError=String(t),this.options.renderer===`webgpu`&&console.warn(`Glimmer: WebGPU failed`,t),this.gpuCanvas?.remove(),this.gpuCanvas=null,this.mode=`canvas`}}get visibleLayer(){return this.gpuShowing?`webgpu`:`canvas`}showGpu(e){this.gpuShowing=e,clearTimeout(this.retireTimer),e?(this.gpuCanvas?.classList.remove(`glimmer-hidden`),this.retireTimer=window.setTimeout(()=>this.fallbackCanvas.classList.add(`glimmer-off`),450)):(this.fallbackCanvas.classList.remove(`glimmer-off`),this.gpuCanvas?.classList.add(`glimmer-hidden`))}dropToCanvas(){!this.destroyed&&this.gpuSurface&&(this.gpuSurface=null,this.gpuCanvas?.remove(),this.gpuCanvas=null,this.showGpu(!1),this.mode=`canvas`)}resize(){let e=this.options.maxPixelRatio??2,t=Math.min(window.devicePixelRatio||1,e),n=Math.max(1,Math.round(this.element.clientWidth*t)),r=Math.max(1,Math.round(this.element.clientHeight*t));for(let e of[this.fallbackCanvas,this.gpuCanvas])e&&(e.width!==n||e.height!==r)&&(e.width=n,e.height=r)}motionScale(){let e=this.options.motion??`auto`;return e===`reduce`||e===`auto`&&zx?.matches?.2:1}tick(e){if(this.paused||!this.visible||this.destroyed){this.lastFrame=null;return}let t=this.lastFrame===null?0:Math.min(.1,Math.max(0,(e-this.lastFrame)/1e3));this.lastFrame=e,this.current=this.transition.sample(e);let n=Math.max(this.current.speed,0);this.phase+=t*n*this.motionScale();try{let e=this.gpuSurface?.render(this.current,this.phase/Math.max(n,.001))??!1;e!==this.gpuShowing&&this.showGpu(e),e||this.canvasSurface.render(this.current,this.phase)}catch(e){console.warn(`Glimmer: render failed, using canvas`,e),this.dropToCanvas()}!this.readyFired&&this.mode!==`starting`&&(this.readyFired=!0,this.element.dataset.renderer=this.mode,this.options.onReady?.(this.mode))}},Vx=class{constructor(e){this.element=document.createElement(`div`),this.currentSpan=null,this.element.className=`glimmer-status`,this.element.setAttribute(`role`,`status`),this.element.setAttribute(`aria-live`,`polite`),this.set(e,!1)}get text(){return this.currentSpan?.textContent??``}set(e,t=!0){if(this.currentSpan&&this.currentSpan.textContent===e)return;let n=document.createElement(`span`);n.className=`glimmer-shimmer`,n.textContent=e||`\xA0`;let r=this.currentSpan;if(this.currentSpan=n,!t||!r){r?.remove(),this.element.append(n);return}n.classList.add(`is-entering`),this.element.append(n),n.offsetWidth,n.classList.remove(`is-entering`),r.classList.add(`is-leaving`),setTimeout(()=>r.remove(),450)}},Hx=class{constructor(e){this.element=document.createElement(`div`),this.fill=document.createElement(`i`),this.element.className=`glimmer-progress`,this.element.setAttribute(`role`,`progressbar`),this.element.append(this.fill),this.set(e)}set(e){this.element.hidden=e===void 0;let t=e===null;if(this.element.classList.toggle(`is-indeterminate`,t),typeof e==`number`){let t=Math.min(1,Math.max(0,e));this.fill.style.width=`${(t*100).toFixed(1)}%`,this.element.setAttribute(`aria-valuenow`,String(Math.round(t*100)))}else this.fill.style.width=``,this.element.removeAttribute(`aria-valuenow`)}},Ux=e=>new Promise(t=>setTimeout(t,e)),Wx=class{constructor(e={}){this.element=document.createElement(`div`),this.title=document.createElement(`div`),this.detailLine=document.createElement(`div`),this.shownAt=performance.now(),this.closing=null,Px(),this.minVisibleMs=e.minVisibleMs??700,this.element.className=`glimmer-splash`,this.element.dataset.backdrop=e.backdrop??`solid`,e.size&&this.element.style.setProperty(`--glimmer-size`,`${e.size}px`);let t=document.createElement(`div`);t.className=`glimmer-splash-stack`;let n=document.createElement(`div`);n.className=`glimmer-splash-orb`,this.title.className=`glimmer-splash-title`,this.title.textContent=e.title??``,this.title.hidden=!e.title,this.statusText=new Vx(e.text??`Loading…`),this.bar=new Hx(e.progress),this.detailLine.className=`glimmer-splash-detail`,this.detailLine.textContent=e.detail??``,t.append(n,this.title,this.statusText.element,this.bar.element,this.detailLine),this.element.append(t),(e.parent??document.body).append(this.element),this.orb=new Bx(n,e),this.syncColors(),this.element.offsetWidth,this.element.classList.add(`is-shown`)}syncColors(){let e=this.orb.targetParams;this.element.style.setProperty(`--glimmer-glow`,e.glowColor),this.element.style.setProperty(`--glimmer-canvas`,e.canvasColor)}status(e){return this.statusText.set(e),this}progress(e){return this.bar.set(e),this}detail(e){return this.detailLine.textContent=e,this}state(e){return this.orb.setState(e),this.element.dataset.state=e,this.syncColors(),this}preset(e){return this.orb.setPreset(e),this.syncColors(),this}async done(e=`Ready`,t=650){this.status(e),this.bar.element.hidden===!1&&this.progress(1),this.state(`success`),await Ux(t),await this.close()}fail(e=`Something went wrong`){return this.status(e),this.state(`error`),this}close(){return this.closing||=(async()=>{let e=this.minVisibleMs-(performance.now()-this.shownAt);e>0&&await Ux(e),this.element.classList.add(`is-leaving`),await Ux(460),this.orb.destroy(),this.element.remove(),this.onClosed?.()})(),this.closing}};function Gx(e){return new Wx(e)}var Kx=[{label:`中`,value:`zh`},{label:`EN`,value:`en`}],qx={zh:{siri:`Siri 波澜`,voiceWave:`声纹薄膜`,spectrum:`彩色声场`,aurora:`极光帷幕`,frost:`冰霜流体`,plasma:`神经电浆`,chrome:`液态铬`,opal:`虹彩欧泊`,blueDrop:`蓝晶液滴`,violetEmber:`紫焰流核`,refractiveBlob:`折射软体`,particleRibbon:`量子丝带`,chromaticMetal:`色差液态金属`,nebula:`星云`,sonar:`声呐`,harbor:`港湾`,ember:`余烬`},en:{siri:`Siri Wave`,voiceWave:`Voice Membrane`,spectrum:`Prismatic Field`,aurora:`Aurora Veil`,frost:`Frost Flow`,plasma:`Neural Plasma`,chrome:`Liquid Chrome`,opal:`Iridescent Opal`,blueDrop:`Crystal Drop`,violetEmber:`Violet Ember`,refractiveBlob:`Refractive Gel`,particleRibbon:`Particle Ribbons`,chromaticMetal:`Chromatic Metal`,nebula:`Nebula`,sonar:`Sonar`,harbor:`Harbor`,ember:`Ember`}},Jx={zh:{speed:`速度`,radius:`半径`,contourDeform:`轮廓形变`,zoom:`缩放`,warp:`扭曲`,ridgeAmt:`脊线`,sharp:`锐度`,bandDensity:`重复次数`,metalDepth:`金属深度`,metalRoughness:`表面粗糙度`,chromaticShift:`RGB 分离`,metalScale:`图案缩放`,metalStretch:`纵横拉伸`,metalAngle:`流带角度`,metalOffset:`图案偏移`,metalPhase:`循环相位`,metalEvolution:`演化幅度`,particleDensity:`粒子密度`,ribbonCount:`丝带层数`,ribbonWidth:`丝带宽度`,ribbonTwist:`扭转强度`,ribbonFold:`折叠幅度`,ribbonBreath:`呼吸幅度`,particleSize:`粒子尺寸`,particleBloom:`粒子辉光`,shade:`明暗`,exposure:`曝光`,sheen:`边缘高光`,gloss:`色散`,glassOpacity:`折射强度`,shellMidAlpha:`折射宽度`,shellEdgeAlpha:`边缘强度`,edgeSoftness:`边缘柔化`,edgeGlow:`外发光强度`},en:{speed:`Speed`,radius:`Radius`,contourDeform:`Contour Motion`,zoom:`Flow Scale`,warp:`Flow Distortion`,ridgeAmt:`Ridge Detail`,sharp:`Sharpness`,bandDensity:`Band Count`,metalDepth:`Metallic Depth`,metalRoughness:`Roughness`,chromaticShift:`RGB Split`,metalScale:`Pattern Scale`,metalStretch:`Aspect Stretch`,metalAngle:`Band Angle`,metalOffset:`Pattern Offset`,metalPhase:`Loop Phase`,metalEvolution:`Flow Evolution`,particleDensity:`Particle Density`,ribbonCount:`Ribbon Layers`,ribbonWidth:`Ribbon Width`,ribbonTwist:`Twist`,ribbonFold:`Folding`,ribbonBreath:`Breathing`,particleSize:`Particle Size`,particleBloom:`Particle Bloom`,shade:`Shading`,exposure:`Exposure`,sheen:`Rim Highlight`,gloss:`Dispersion`,glassOpacity:`Refraction Strength`,shellMidAlpha:`Refraction Width`,shellEdgeAlpha:`Edge Intensity`,edgeSoftness:`Edge Softness`,edgeGlow:`Outer Glow`}},Yx={zh:{colorA:`颜色 A`,colorB:`颜色 B`,colorC:`颜色 C`,colorD:`颜色 D`,highlightColor:`提亮色`,shellInner:`折射底色`,shellMid:`冷色散`,shellEdge:`暖色散`,sheenColor:`主高光色`,specColor:`辅高光色`,canvasColor:`背景颜色`,glowColor:`外发光颜色`},en:{colorA:`Color A`,colorB:`Color B`,colorC:`Color C`,colorD:`Color D`,highlightColor:`Highlight Tint`,shellInner:`Refraction Base`,shellMid:`Cool Dispersion`,shellEdge:`Warm Dispersion`,sheenColor:`Key Highlight`,specColor:`Fill Highlight`,canvasColor:`Background`,glowColor:`Glow Color`}},Xx={zh:{documentTitle:`Glimmer 液态玻璃球编辑器`,presets:`效果预设`,animatedPresets:`动态预设`,orbControls:`球体参数`,collapsePresets:`收起预设面板`,expandPresets:`展开预设面板`,collapseControls:`收起参数面板`,expandControls:`展开参数面板`,resetControls:`重置全部参数`,previewMode:`预览模式`,switchPreviewMode:`切换预览模式`,orbMode:`球体`,sceneMode:`场景`,switchLanguage:`切换界面语言`,orbPreview:`液态玻璃球预览`,scenePreview:`实际场景预览`,staticOrbPreview:`液态玻璃球静态预览`,animatedOrbPreview:`动态液态玻璃球`,loadingOrb:`正在加载球体`,renderFallback:`WebGPU 不可用，当前显示静态预览`,renderErrorTitle:`WebGPU 渲染失败`,sceneText:e=>`场景文字：${e}`,copyCode:`复制代码`,viewSource:`在 GitHub 查看源码`,sceneSection:`场景预览`,displayText:`显示文字`,sceneTextLimit:`最多 20 个字符`,stateSection:`AI 状态`,orbState:`当前状态`,switchOrbState:`切换 AI 球状态`,idleState:`空闲`,thinkingState:`思考中`,successState:`成功`,errorState:`错误`,glimmerPresets:`Glimmer 预设`,previewSplash:`预览启动画面`,splashTitle:`启动画面`,copyLink:`复制链接`,linkCopied:`链接已复制`,savePreset:`保存`,savedPresets:`我的预设`,savePresetPrompt:`预设名称`,deletePreset:e=>`删除 ${e}`,glimmerWebCode:`Glimmer Web 代码`,glimmerDotnetCode:`Glimmer .NET 代码`,swiftUnavailable:`星云和声呐的 Metal 版本是手工移植的，尚未在 Apple 设备上测试。`,credit:`编辑器作者 LerSent001（MIT），Glimmer 分支`,activationDuration:`启动时长`,transitionDuration:`回落时长`,collapseSection:e=>`收起${e}`,expandSection:e=>`展开${e}`,editValue:e=>`编辑${e}数值`,selectColor:e=>`选择${e}`,hexValue:e=>`${e}十六进制值`,hexColor:`十六进制颜色`,colorSurface:`颜色饱和度和亮度`,colorChannel:`通道`,cssColorValue:`CSS 颜色值`,hue:`色相`,motionSection:`动态`,colorsSection:`颜色`,shapeSection:`形状动画`,glassSection:`玻璃罩`,enableGlass:`开启玻璃罩`,edgeSection:`边缘与外发光`,copyFailed:`复制失败`,copied:`已复制`,close:`关闭`,webCode:`Web 代码`,swiftCode:`SwiftUI 代码`},en:{documentTitle:`Glimmer Orb Editor`,presets:`Presets`,animatedPresets:`Animated presets`,orbControls:`Orb Controls`,collapsePresets:`Collapse presets`,expandPresets:`Expand presets`,collapseControls:`Collapse controls`,expandControls:`Expand controls`,resetControls:`Reset all controls`,previewMode:`Preview`,switchPreviewMode:`Switch preview mode`,orbMode:`Orb`,sceneMode:`Scene`,switchLanguage:`Switch interface language`,orbPreview:`Liquid glass orb preview`,scenePreview:`In-context preview`,staticOrbPreview:`Static liquid glass orb preview`,animatedOrbPreview:`Animated liquid glass orb`,loadingOrb:`Loading orb`,renderFallback:`WebGPU is unavailable. Showing the fallback preview.`,renderErrorTitle:`WebGPU rendering failed`,sceneText:e=>`Scene text: ${e}`,copyCode:`Copy Code`,viewSource:`View source on GitHub`,sceneSection:`Scene Preview`,displayText:`Display Text`,sceneTextLimit:`Up to 20 characters`,stateSection:`AI State`,orbState:`Current State`,switchOrbState:`Switch AI orb state`,idleState:`Idle`,thinkingState:`Thinking`,successState:`Success`,errorState:`Error`,glimmerPresets:`Glimmer presets`,previewSplash:`Preview Splash`,splashTitle:`Splash screen`,copyLink:`Copy Link`,linkCopied:`Link Copied`,savePreset:`Save`,savedPresets:`My presets`,savePresetPrompt:`Preset name`,deletePreset:e=>`Delete ${e}`,glimmerWebCode:`Glimmer web code`,glimmerDotnetCode:`Glimmer .NET code`,swiftUnavailable:`Nebula and Sonar are hand-ported to Metal for this export and haven't been tested on Apple hardware yet.`,credit:`Editor by LerSent001 (MIT), Glimmer fork`,activationDuration:`Activation Duration`,transitionDuration:`Settle Duration`,collapseSection:e=>`Collapse ${e}`,expandSection:e=>`Expand ${e}`,editValue:e=>`Edit ${e} value`,selectColor:e=>`Choose ${e}`,hexValue:e=>`${e} hex value`,hexColor:`Hex color`,colorSurface:`Color saturation and brightness`,colorChannel:`channel`,cssColorValue:`CSS color value`,hue:`Hue`,motionSection:`Motion`,colorsSection:`Color`,shapeSection:`Shape Motion`,glassSection:`Glass Shell`,enableGlass:`Enable Glass Shell`,edgeSection:`Edge & Glow`,copyFailed:`Copy Failed`,copied:`Copied`,close:`Close`,webCode:`Web code`,swiftCode:`SwiftUI code`}};function Zx({canvas:e,getTarget:t,getAudioBands:n,onError:r,onReady:i}){let a=!1,o=0,s=null,c=null,l=!1,u=!1,d=null,f=0;function p(e){a||u||(u=!0,cancelAnimationFrame(o),c?.destroy(),s?.destroy(),r(e))}async function m(){if(!navigator.gpu)throw Error(`当前浏览器不支持 WebGPU`);let r=await navigator.gpu.requestAdapter();if(!r)throw Error(`未找到可用的 WebGPU 适配器`);if(s=await r.requestDevice(),a){s.destroy();return}let m=e.getContext(`webgpu`);if(!m)throw Error(`无法创建 WebGPU 画布上下文`);let h=m,g=navigator.gpu.getPreferredCanvasFormat();h.configure({device:s,format:g,alphaMode:`premultiplied`});let _=s.createShaderModule({label:`orb-glass-liquid`,code:Ub}),v=(await _.getCompilationInfo()).messages.filter(e=>e.type===`error`);if(v.length>0)throw Error(v.map(e=>`${e.lineNum}:${e.linePos} ${e.message}`).join(`
`));let y=s.createRenderPipeline({label:`orb-glass-liquid-pipeline`,layout:`auto`,vertex:{module:_,entryPoint:`vs_main`},fragment:{module:_,entryPoint:`fs_main`,targets:[{format:g,blend:{color:{srcFactor:`one`,dstFactor:`one-minus-src-alpha`,operation:`add`},alpha:{srcFactor:`one`,dstFactor:`one-minus-src-alpha`,operation:`add`}}}]},primitive:{topology:`triangle-list`}}),b=s.createRenderPipeline({label:`particle-ribbon-pipeline`,layout:`auto`,vertex:{module:_,entryPoint:`ribbon_vs_main`},fragment:{module:_,entryPoint:`ribbon_fs_main`,targets:[{format:g,blend:{color:{srcFactor:`one`,dstFactor:`one`,operation:`add`},alpha:{srcFactor:`one`,dstFactor:`one-minus-src-alpha`,operation:`add`}}}]},primitive:{topology:`triangle-list`}}),x=s.createRenderPipeline({label:`particle-ribbon-glass-composite-pipeline`,layout:`auto`,vertex:{module:_,entryPoint:`vs_main`},fragment:{module:_,entryPoint:`ribbon_composite_fs_main`,targets:[{format:g,blend:{color:{srcFactor:`one`,dstFactor:`one-minus-src-alpha`,operation:`add`},alpha:{srcFactor:`one`,dstFactor:`one-minus-src-alpha`,operation:`add`}}}]},primitive:{topology:`triangle-list`}}),S=new Float32Array(136),C=s.createBuffer({size:S.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),w=s.createBindGroup({layout:y.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:C}}]}),T=s.createBindGroup({layout:b.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:C}}]}),E=s.createSampler({addressModeU:`clamp-to-edge`,addressModeV:`clamp-to-edge`,magFilter:`linear`,minFilter:`linear`}),D=null,O=Hb(t());s.lost.then(e=>{p(Error(`WebGPU 设备已断开：${e.message||e.reason}`))}),s.addEventListener(`uncapturederror`,e=>{e.preventDefault(),p(Error(`WebGPU 渲染错误：${e.error.message}`))});function k(){let t=Math.min(window.devicePixelRatio||1,2),n=Math.max(1,Math.floor(e.clientWidth*t)),r=Math.max(1,Math.floor(e.clientHeight*t));(e.width!==n||e.height!==r)&&(e.width=n,e.height=r,c?.destroy(),c=null,D=null)}function A(){c&&D||(c=s.createTexture({label:`particle-ribbon-offscreen-texture`,size:{width:e.width,height:e.height},format:g,usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING}),D=s.createBindGroup({layout:x.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:C}},{binding:1,resource:c.createView()},{binding:2,resource:E}]}))}function j(r){if(!(a||u||!s))try{k();let a=O.sample(t(),r),u=d===null?0:Math.min(.1,Math.max(0,(r-d)/1e3));d=r,Hy(S,e.width,e.height,0,a),n&&Jb(S,n(u)),f+=u*Math.max(S[3],0),S[2]=f/Math.max(S[3],.001),s.queue.writeBuffer(C,0,S);let p=Ly[a.style]===Ly.particleRibbon,m=s.createCommandEncoder();if(p){A();let e=m.beginRenderPass({colorAttachments:[{view:c.createView(),clearValue:{r:0,g:0,b:0,a:0},loadOp:`clear`,storeOp:`store`}]});e.setPipeline(b),e.setBindGroup(0,T),e.draw(6,Wy,0,0),e.end()}let g=m.beginRenderPass({colorAttachments:[{view:h.getCurrentTexture().createView(),clearValue:{r:0,g:0,b:0,a:0},loadOp:`clear`,storeOp:`store`}]});p?(g.setPipeline(x),g.setBindGroup(0,D)):(g.setPipeline(y),g.setBindGroup(0,w)),g.draw(3,1,0,0),g.end(),s.queue.submit([m.finish()]),l||(l=!0,i()),o=requestAnimationFrame(j)}catch(e){p(e instanceof Error?e:Error(String(e)))}}o=requestAnimationFrame(j)}return m().catch(e=>{p(e instanceof Error?e:Error(String(e)))}),()=>{a=!0,cancelAnimationFrame(o),c?.destroy(),s?.destroy()}}function Qx({input:e,style:t,locale:n}){let r=n===`zh`,i=Kb[t]!==void 0,[a,o]=_.useState(`off`),[s,c]=_.useState(!1),[l,u]=_.useState(70),d=_.useRef(null),f=_.useRef(null),p=_.useRef(null),m=_.useRef(0),h=_.useCallback(()=>{m.current++,e.stop(),f.current?.replaceChildren(),o(`off`),c(!1)},[e]);_.useEffect(()=>{i||h()},[i,h]),_.useEffect(()=>{let t=0;e.gain=.7;let n=()=>{p.current&&(p.current.value=e.level),t=requestAnimationFrame(n)};n();let r=()=>h();return window.addEventListener(`pagehide`,r),()=>{m.current++,cancelAnimationFrame(t),e.stop(),window.removeEventListener(`pagehide`,r)}},[e,h]);let g=async t=>{h();let n=m.current;o(`pending`);try{let r=t?await e.file(t,f.current):await e.microphone(h);n===m.current&&r&&o(t?`file`:`mic`)}catch{if(n!==m.current)return;e.stop(),f.current?.replaceChildren(),o(`off`),c(!0)}};return(0,Q.jsx)(ev,{title:r?`声音响应`:`Audio response`,children:(0,Q.jsxs)(`div`,{className:`orb-audio-controls`,children:[(0,Q.jsx)(`p`,{className:`orb-audio-hint`,children:i?r?`声音驱动流动、形变与高光`:`Sound drives motion, shape and highlights`:r?`此预设暂不支持声音响应`:`Audio response is unavailable for this preset`}),i&&(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsxs)(`div`,{className:`orb-audio-actions`,children:[(0,Q.jsx)(Sr,{variant:`outline`,"aria-pressed":a===`mic`,disabled:a===`pending`,onClick:()=>void g(),children:r?`麦克风`:`Microphone`}),(0,Q.jsx)(Sr,{variant:`outline`,disabled:a===`pending`,onClick:()=>d.current?.click(),children:r?`音频文件`:`Audio file`}),a!==`off`&&(0,Q.jsx)(Sr,{variant:`outline`,onClick:h,children:r?`关闭`:`Stop`})]}),(0,Q.jsx)(`input`,{ref:d,type:`file`,accept:`audio/*,.mp3,.wav,.m4a,.ogg,.flac`,hidden:!0,onChange:e=>{let t=e.target.files?.[0];e.target.value=``,t&&g(t)}}),(0,Q.jsxs)(`label`,{className:`orb-audio-gain`,children:[r?`响应强度`:`Sensitivity`,(0,Q.jsxs)(`output`,{children:[l,`%`]}),(0,Q.jsx)(`input`,{"aria-label":r?`响应强度`:`Sensitivity`,type:`range`,min:`0`,max:`100`,value:l,onChange:t=>{let n=+t.target.value;u(n),e.gain=n/100}})]}),(0,Q.jsx)(`meter`,{ref:p,min:`0`,max:`1`,value:`0`,"aria-label":r?`输入音量`:`Input level`})]}),(0,Q.jsx)(`div`,{ref:f,className:`orb-audio-player`,hidden:!i||a!==`file`&&a!==`pending`}),(0,Q.jsx)(`p`,{className:`orb-audio-hint`,role:`status`,children:s?r?`无法打开声音，请检查麦克风权限或更换音频文件。`:`Unable to open audio. Check microphone permission or try another file.`:a===`pending`?r?`正在打开声音…`:`Opening audio…`:a===`mic`?r?`正在使用麦克风`:`Microphone is active`:``})]})})}var $x=`modulepreload`,eS=function(e,t){return new URL(e,t).href},tS={},nS=function(e){return e.pathname.endsWith(`.css`)},rS=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=eS(t,n);let r=s(t);if(r.href in tS)return;tS[r.href]=!0;let i=nS(r);if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let o=document.createElement(`link`);if(o.rel=i?`stylesheet`:$x,i||(o.as=`script`),o.crossOrigin=``,o.href=r.href,a&&o.setAttribute(`nonce`,a),document.head.appendChild(o),i)return new Promise((e,t)=>{o.addEventListener(`load`,e),o.addEventListener(`error`,()=>t(Error(`Unable to preload CSS for ${r}`)))})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},iS=_.lazy(async()=>({default:(await rS(()=>import(`./color-control-D-KvOh2B.js`),[],import.meta.url)).ColorControl})),aS={siri:py,voiceWave:gy,spectrum:my,aurora:iy,frost:cy,plasma:dy,chrome:oy,opal:ly,blueDrop:ay,violetEmber:hy,refractiveBlob:fy,particleRibbon:uy,chromaticMetal:sy,nebula:_y,sonar:vy,harbor:yy,ember:by},oS=Iy.filter(e=>!Fy.includes(e)),sS=`glimmer-editor-presets`,cS=new URLSearchParams(window.location.search),lS=cS.get(`embed`)===`1`,uS=cS.get(`app`)??`this app`,dS=window.parent===window?window.opener:window.parent,fS=new Set([`particleRibbon`,`blueDrop`,`violetEmber`,`refractiveBlob`,`chromaticMetal`]),pS=`Thinking...`,mS=20,hS=500,gS=`liquid-orb-editor-locale`,_S={min:.05,max:.8,step:.01},vS={min:.1,max:2,step:.05},yS=[`nebula`,`sonar`,`harbor`,`ember`,`siri`,`voiceWave`,`spectrum`,`aurora`,`frost`,`plasma`,`blueDrop`,`violetEmber`,`refractiveBlob`],bS=[`nebula`,`sonar`,`harbor`,`ember`,`frost`,`plasma`,`chrome`,`blueDrop`,`violetEmber`,`refractiveBlob`],xS=Iy.filter(e=>e!==`chromaticMetal`&&e!==`particleRibbon`),SS=[`chromaticMetal`],CS=[`particleRibbon`],wS=[{key:`speed`,min:0,max:3,step:.01},{key:`radius`,...jy,step:.01},{key:`contourDeform`,min:0,max:1,step:.01,enabledStyles:xS},{key:`zoom`,min:.05,max:1,step:.01,enabledStyles:xS},{key:`warp`,min:0,max:6,step:.05,enabledStyles:xS},{key:`ridgeAmt`,min:0,max:1,step:.01,enabledStyles:yS},{key:`sharp`,min:.5,max:6,step:.05,enabledStyles:bS},{key:`bandDensity`,min:1,max:6,step:.1,enabledStyles:[...SS,`sonar`]},{key:`metalDepth`,min:0,max:1,step:.01,enabledStyles:SS},{key:`metalRoughness`,min:0,max:1,step:.01,enabledStyles:SS},{key:`chromaticShift`,min:0,max:1,step:.01,enabledStyles:SS},{key:`metalScale`,min:.2,max:2,step:.01,enabledStyles:SS},{key:`metalStretch`,min:0,max:1,step:.01,enabledStyles:SS},{key:`metalAngle`,min:-180,max:180,step:1,enabledStyles:SS},{key:`metalOffset`,min:-1,max:1,step:.01,enabledStyles:SS},{key:`metalPhase`,min:0,max:1,step:.01,enabledStyles:SS},{key:`metalEvolution`,min:0,max:2,step:.02,enabledStyles:SS},{key:`particleDensity`,min:.2,max:1,step:.01,enabledStyles:CS},{key:`ribbonCount`,min:2,max:6,step:1,enabledStyles:CS},{key:`ribbonWidth`,min:.1,max:.8,step:.01,enabledStyles:CS},{key:`ribbonTwist`,min:.1,max:3,step:.01,enabledStyles:CS},{key:`ribbonFold`,min:0,max:1.2,step:.01,enabledStyles:CS},{key:`ribbonBreath`,min:0,max:.8,step:.01,enabledStyles:CS},{key:`particleSize`,min:.6,max:2.5,step:.01,enabledStyles:CS},{key:`particleBloom`,min:0,max:2,step:.01,enabledStyles:CS},{key:`shade`,min:0,max:1.5,step:.01},{key:`exposure`,min:.2,max:3,step:.02},{key:`sheen`,min:0,max:2,step:.02},{key:`gloss`,min:0,max:2,step:.02},{key:`glassOpacity`,min:0,max:1,step:.01},{key:`shellMidAlpha`,min:0,max:1,step:.01},{key:`shellEdgeAlpha`,min:0,max:1,step:.01},{key:`edgeSoftness`,min:.005,max:.15,step:.005},{key:`edgeGlow`,min:0,max:1,step:.01}],TS=new Map(wS.map(e=>[e.key,e])),ES=[`colorA`,`colorB`,`colorC`,`colorD`,`highlightColor`,`shellInner`,`shellMid`,`shellEdge`,`sheenColor`,`specColor`,`canvasColor`,`glowColor`];function DS(e,t,n){return Math.min(n,Math.max(t,e))}function OS(e){return/^#[0-9a-f]{6}$/i.test(e)?e.toUpperCase():null}function kS(e){return Array.from(e).slice(0,mS).join(``)}function AS(){try{let e=window.localStorage.getItem(gS);if(e===`zh`||e===`en`)return e}catch(e){console.warn(`Unable to read the saved interface language.`,e)}return navigator.language.toLowerCase().startsWith(`zh`)?`zh`:`en`}function jS(){return new URLSearchParams(window.location.hash.slice(1)).get(`preview`)===`scene`?`scene`:`orb`}function MS(){let e=new URLSearchParams(window.location.hash.slice(1)).get(`text`);return e===null?pS:kS(e)}function NS(e,t){return e===`thinking`?t:`${e}${t.charAt(0).toUpperCase()}${t.slice(1)}`}var PS=vb.filter(e=>e!==`thinking`);function FS(){try{let e=JSON.parse(window.localStorage.getItem(sS)??`[]`);return Array.isArray(e)?e.filter(e=>typeof e?.name==`string`&&typeof e?.hash==`string`):[]}catch{return[]}}function IS(e){try{window.localStorage.setItem(sS,JSON.stringify(e))}catch(e){console.warn(`Unable to save presets.`,e)}}function LS(){let e=new URLSearchParams(window.location.hash.slice(1)),t=e.get(`style`),n=t&&Iy.includes(t)?t:zy.style,r={style:n,...Py[n]},i=e.get(`glass`);i===`1`&&(r.glassEnabled=!0),i===`0`&&(r.glassEnabled=!1);for(let t of wS){let n=e.get(t.key);if(n===null)continue;let i=Number(n);Number.isFinite(i)&&(r[t.key]=DS(i,t.min,t.max))}for(let t of ES){let n=e.get(t);if(n===null)continue;let i=OS(n);i&&(r[t]=i)}let a=e.get(`transition`),o=a===null?null:Number(a),s=o!==null&&Number.isFinite(o)?DS(o,vS.min,vS.max):wb,c=e.get(`activation`),l=c===null?null:Number(c),u=jb(r,s,l!==null&&Number.isFinite(l)?DS(l,_S.min,_S.max):Cb);for(let t of PS)for(let n of xb){let r=e.get(NS(t,n));if(r!==null){if(typeof u.profiles[t][n]==`number`){let e=TS.get(n),i=Number(r);e&&Number.isFinite(i)&&(u=Pb(u,t,n,DS(i,e.min,e.max)))}else{let e=OS(r);e&&(u=Pb(u,t,n,e))}}}let d=e.get(`state`),f=d&&vb.includes(d)?d:Sb;return{configuration:u,activeState:f}}function RS(e,t,n){window.history.replaceState(null,``,`#${zS(e,t,n)}`)}function zS(e,t,n){let{configuration:r,activeState:i}=e,a=Nb(r,`thinking`),o=new URLSearchParams;o.set(`effect`,`orb-glass-liquid`),o.set(`style`,a.style),o.set(`glass`,a.glassEnabled?`1`:`0`),o.set(`state`,i),o.set(`activation`,String(r.activationDuration)),o.set(`transition`,String(r.transitionDuration)),o.set(`preview`,t),o.set(`text`,n);for(let e of wS)if(o.set(e.key,String(a[e.key])),Db(e.key))for(let t of PS)o.set(NS(t,e.key),String(r.profiles[t][e.key]));for(let e of ES)if(o.set(e,a[e]),Db(e))for(let t of PS)o.set(NS(t,e),r.profiles[t][e]);return o.toString()}function BS(){let[e,t]=_.useState({state:!1,motion:!1,colors:!0,shape:!0,glass:!1,edge:!1,scene:!1});return{isCollapsed:t=>e[t]??!1,onCollapsedChange:e=>n=>{t(t=>({...t,[e]:n}))}}}function VS(){let[e,t]=_.useState(()=>window.matchMedia(`(max-width: 900px)`).matches);return _.useEffect(()=>{let e=window.matchMedia(`(max-width: 900px)`),n=()=>t(e.matches);return e.addEventListener(`change`,n),()=>e.removeEventListener(`change`,n)},[]),e}function HS(){let[e]=_.useState(()=>new Yb),[t,n]=_.useState(0),[r,i]=_.useState(AS),[a,o]=_.useState(LS),[s,c]=_.useState(`loading`),[l,u]=_.useState(``),[d,f]=_.useState(!1),[p,m]=_.useState(!1),[h,g]=_.useState(1),[v,y]=_.useState(jS),[b,x]=_.useState(MS),[S,C]=_.useState(!1),[w,T]=_.useState(`glimmer`),[E,D]=_.useState(null),[O,k]=_.useState(FS),[A,j]=_.useState(!1),[M,N]=_.useState(null),ee=_.useRef(null),te=_.useRef(null),ne=_.useRef(null),V=Nb(a.configuration,a.activeState),re=_.useMemo(()=>Nb(Mb(V.style),a.activeState),[a.activeState,V.style]),H=_.useRef({state:a.activeState,params:V,activationDuration:a.configuration.activationDuration,transitionDuration:a.configuration.transitionDuration}),U=BS(),ie=VS(),W=Xx[r],ae=_.useMemo(()=>[{label:W.orbMode,value:`orb`},{label:W.sceneMode,value:`scene`}],[W.orbMode,W.sceneMode]),G=_.useMemo(()=>[{label:W.idleState,value:`idle`},{label:W.thinkingState,value:`thinking`},{label:W.successState,value:`success`},{label:W.errorState,value:`error`}],[W.idleState,W.thinkingState,W.successState,W.errorState]),K=_.useMemo(()=>M?Qb(M.configuration,M.activeState===`idle`?`idle`:`thinking`):``,[M]),oe=_.useMemo(()=>M?$b(M.configuration,M.activeState===`idle`?`idle`:`thinking`):``,[M]),se=_.useMemo(()=>M?ox(M.configuration,M.activeState,b):``,[M,b]),ce=_.useMemo(()=>M?sx(zS(M,v,b),b):``,[M,v,b]),le=_.useMemo(()=>M?cx(M.configuration):``,[M]),ue=M!==null&&[`nebula`,`sonar`].includes(Ry[Nb(M.configuration,`thinking`).style]);H.current={state:a.activeState,params:V,activationDuration:a.configuration.activationDuration,transitionDuration:a.configuration.transitionDuration},_.useEffect(()=>{document.documentElement.lang=r===`zh`?`zh-CN`:`en`,document.title=Xx[r].documentTitle;try{window.localStorage.setItem(gS,r)}catch(e){console.warn(`Unable to save the interface language.`,e)}},[r]),_.useEffect(()=>{let e=window.setTimeout(()=>{RS(a,v,b)},hS);return()=>window.clearTimeout(e)},[a,v,b]),_.useEffect(()=>{let e=()=>{o(LS()),y(jS()),x(MS()),g(1)};return window.addEventListener(`hashchange`,e),()=>window.removeEventListener(`hashchange`,e)},[]),_.useEffect(()=>{document.documentElement.style.setProperty(`--orb-canvas-color`,V.canvasColor)},[V.canvasColor]),_.useEffect(()=>{let t=ee.current;if(t)return Zx({canvas:t,getTarget:()=>H.current,getAudioBands:t=>e.read(t),onError:e=>{u(e.message),c(`error`)},onReady:()=>c(e=>e===`ready`?e:`ready`)})},[]),_.useEffect(()=>{let e=te.current;if(!e)return;let t=t=>{if(t.target instanceof Element&&t.target.closest(`[data-stage-controls]`))return;t.preventDefault();let n=t.deltaMode===WheelEvent.DOM_DELTA_LINE?16:t.deltaMode===WheelEvent.DOM_DELTA_PAGE?e.clientHeight:1,r=DS(-t.deltaY*n*.001,-.1,.1);g(e=>Math.round(DS(e+r,.6,1.6)*100)/100)};return e.addEventListener(`wheel`,t,{passive:!1}),()=>e.removeEventListener(`wheel`,t)},[]);let de=_.useCallback((e,t)=>{o(n=>({...n,configuration:Pb(n.configuration,n.activeState,e,t)}))},[]),fe=_.useCallback(e=>{o(t=>({activeState:t.activeState,configuration:{...Mb(e),activationDuration:t.configuration.activationDuration,transitionDuration:t.configuration.transitionDuration}}))},[]),pe=_.useCallback(()=>{n(e=>e+1),o({activeState:Sb,configuration:Mb(zy.style)}),x(pS),g(1)},[]),me=_.useCallback(e=>{(e===`orb`||e===`scene`)&&(y(e),g(1))},[]),he=_.useCallback(e=>{vb.includes(e)&&o(t=>({...t,activeState:e}))},[]),ge=_.useCallback(async()=>{let e=e=>new Promise(t=>window.setTimeout(t,e)),t=Gx({look:ix(a.configuration),title:`Glimmer`,text:b||`Loading…`,progress:null});await e(1400),t.status(`Loading settings`),await e(1100),t.status(`Indexing files`);for(let n=0;n<=20;n++)t.progress(n/20).detail(`${n*5}%`),await e(90);t.detail(``),await t.done(`Ready`)},[a.configuration,b]),_e=_.useCallback(()=>{dS?.postMessage({type:`glimmer:apply`,app:uS,hash:zS(a,v,b),preset:null,colors:lx(a.configuration),look:ix(a.configuration)},`*`)},[a,v,b]),ve=_.useCallback(()=>{dS?.postMessage({type:`glimmer:cancel`},`*`)},[]),ye=_.useCallback(async()=>{let e=zS(a,v,b),t=`${window.location.origin}${window.location.pathname}#${e}`;try{await navigator.clipboard.writeText(t),j(!0),window.setTimeout(()=>j(!1),1600)}catch{window.prompt(W.copyLink,t)}},[W.copyLink,a,v,b]),be=_.useCallback(()=>{let e=window.prompt(W.savePresetPrompt)?.trim();if(!e)return;let t={name:e,hash:zS(a,v,b)};k(n=>{let r=[...n.filter(t=>t.name!==e),t];return IS(r),r})},[W.savePresetPrompt,a,v,b]),xe=_.useCallback(e=>{k(t=>{let n=t.filter(t=>t.name!==e);return IS(n),n})},[]),Se=_.useCallback(e=>{o(t=>({...t,configuration:{...t.configuration,transitionDuration:e}}))},[]),Ce=_.useCallback(e=>{o(t=>({...t,configuration:{...t.configuration,activationDuration:e}}))},[]),we=_.useCallback(()=>{N({activeState:a.activeState,configuration:{...a.configuration,shared:{...a.configuration.shared},profiles:Object.fromEntries(vb.map(e=>[e,{...a.configuration.profiles[e]}]))}}),D(null),C(!0)},[a]),q=_.useCallback(async()=>{let e={web:K,swift:oe,glimmer:se,dotnet:ce,badge:le}[w];try{await navigator.clipboard.writeText(e),D(w)}catch{let t=ne.current,n=document.activeElement instanceof HTMLElement?document.activeElement:null;if(!t){D(`error`);return}t.value=e,t.focus(),t.select();let r=document.execCommand(`copy`);n?.focus(),D(r?w:`error`)}},[le,w,ce,se,oe,K]);function Te(e){let t=TS.get(e);if(!t)throw Error(`Missing slider configuration: ${e}`);return t.enabledStyles&&!t.enabledStyles.includes(V.style)?null:(0,Q.jsx)(W_,{baseValue:re[e],editValueLabel:W.editValue(Jx[r][e]),max:t.max,min:t.min,name:Jx[r][e],onValueChange:t=>de(e,t),showFill:!0,step:t.step,value:V[e]},e)}function Ee(e){let t=Yx[r][e];return{ariaLabels:{colorChannel:W.colorChannel,colorSurface:W.colorSurface,cssColorValue:W.cssColorValue,hexColor:W.hexColor,hexValue:W.hexValue(t),hue:W.hue,selectColor:W.selectColor(t)},hex:V[e],name:t,onValueChange:({hex:t})=>de(e,t),showLabel:!0}}function J(e){return(0,Q.jsxs)(Sr,{"aria-pressed":V.style===e,className:`preset-button`,onClick:()=>fe(e),type:`button`,variant:`outline`,children:[(0,Q.jsx)(`img`,{alt:``,"aria-hidden":`true`,className:`preset-preview${fS.has(e)?` preset-preview--compact`:``}`,src:aS[e]}),(0,Q.jsx)(`span`,{title:qx[r][e],children:qx[r][e]})]},e)}function De(e){return(0,Q.jsx)(_.Suspense,{fallback:(0,Q.jsx)(`div`,{className:`color-control-loading`,"aria-hidden":`true`}),children:e})}return(0,Q.jsxs)(Td,{children:[(0,Q.jsxs)(`main`,{className:`orb-editor`,"data-preset-collapsed":String(!ie&&d),"data-properties-collapsed":String(!ie&&p),children:[(0,Q.jsx)(`aside`,{className:`preset-dock`,"aria-label":W.presets,children:(0,Q.jsx)(av,{className:`preset-panel h-full max-h-none w-full rounded-lg`,collapsed:d,collapseDirection:`left`,collapseLabel:W.collapsePresets,collapsible:!ie,expandLabel:W.expandPresets,onCollapsedChange:f,title:W.presets,children:(0,Q.jsx)(ev,{children:(0,Q.jsxs)(`div`,{className:`preset-control`,children:[(0,Q.jsx)(`div`,{className:`preset-grid`,role:`group`,"aria-label":W.animatedPresets,children:oS.map(J)}),(0,Q.jsx)(`div`,{className:`preset-group-label`,children:W.glimmerPresets}),(0,Q.jsx)(`div`,{className:`preset-grid`,role:`group`,"aria-label":W.glimmerPresets,children:Fy.map(J)}),O.length>0?(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(`div`,{className:`preset-group-label`,children:W.savedPresets}),(0,Q.jsx)(`ul`,{className:`saved-presets`,children:O.map(e=>(0,Q.jsxs)(`li`,{children:[(0,Q.jsx)(`button`,{className:`saved-preset-load`,onClick:()=>{window.location.hash=e.hash},type:`button`,children:e.name}),(0,Q.jsx)(`button`,{"aria-label":W.deletePreset(e.name),className:`saved-preset-delete`,onClick:()=>xe(e.name),type:`button`,children:(0,Q.jsx)(B,{"aria-hidden":`true`})})]},e.name))})]}):null]})})})}),(0,Q.jsxs)(`section`,{className:`orb-stage`,"aria-label":v===`scene`?W.scenePreview:W.orbPreview,"data-preview-mode":v,ref:te,style:{"--preview-scale":h},children:[(0,Q.jsx)(`div`,{className:`language-control`,"data-stage-controls":!0,children:(0,Q.jsx)(j_,{ariaLabel:W.switchLanguage,name:W.switchLanguage,onValueChange:e=>{(e===`zh`||e===`en`)&&i(e)},options:Kx,value:r})}),(0,Q.jsx)(`div`,{className:`stage-mode-control`,"data-stage-controls":!0,children:(0,Q.jsx)(j_,{ariaLabel:W.switchPreviewMode,name:W.previewMode,onValueChange:me,options:ae,value:v})}),(0,Q.jsxs)(`div`,{className:`preview-surface`,children:[(0,Q.jsxs)(`div`,{className:`orb-visual`,children:[s===`error`?(0,Q.jsx)(`img`,{className:`orb-poster`,src:ry,alt:W.staticOrbPreview}):null,(0,Q.jsx)(`canvas`,{"aria-label":W.animatedOrbPreview,className:`orb-canvas`,"data-ready":s===`ready`?`true`:void 0,ref:ee}),s===`loading`?(0,Q.jsxs)(`div`,{className:`orb-status`,role:`status`,"aria-live":`polite`,children:[(0,Q.jsx)(`span`,{className:`orb-spinner`,"aria-hidden":`true`}),(0,Q.jsx)(`span`,{className:`sr-only`,children:W.loadingOrb})]}):null,s===`error`?(0,Q.jsx)(`p`,{className:`orb-error`,title:r===`zh`?l:W.renderErrorTitle,children:W.renderFallback}):null]}),v===`scene`?(0,Q.jsx)(`div`,{className:`scene-copy`,"aria-label":W.sceneText(b),children:(0,Q.jsx)(`span`,{className:`scene-copy-text`,children:b||`\xA0`})}):null]}),(0,Q.jsxs)(`p`,{className:`stage-credit`,children:[W.credit,` ·`,` `,(0,Q.jsx)(`a`,{href:`https://github.com/LerSent001/orb`,rel:`noopener noreferrer`,target:`_blank`,children:`LerSent001/orb`})]}),(0,Q.jsxs)(`div`,{className:`stage-toolbar`,"data-stage-controls":!0,children:[lS?(0,Q.jsxs)(Q.Fragment,{children:[(0,Q.jsx)(Sr,{className:`embed-apply`,onClick:_e,size:`lg`,type:`button`,children:`Apply to ${uS}`}),(0,Q.jsx)(Sr,{onClick:ve,size:`lg`,type:`button`,variant:`outline`,children:`Cancel`})]}):null,(0,Q.jsxs)(Sr,{onClick:()=>void ge(),size:`lg`,type:`button`,variant:`outline`,children:[(0,Q.jsx)(z,{"data-icon":`inline-start`,weight:`fill`}),W.previewSplash]}),lS?null:(0,Q.jsxs)(Sr,{onClick:()=>void ye(),size:`lg`,type:`button`,variant:`outline`,children:[(0,Q.jsx)(R,{"data-icon":`inline-start`}),A?W.linkCopied:W.copyLink]}),(0,Q.jsxs)(Sr,{onClick:be,size:`lg`,type:`button`,variant:`outline`,children:[(0,Q.jsx)(I,{"data-icon":`inline-start`}),W.savePreset]}),(0,Q.jsxs)(Sr,{className:`code-trigger`,onClick:we,size:`lg`,type:`button`,variant:`outline`,children:[(0,Q.jsx)(P,{"data-icon":`inline-start`}),W.copyCode]}),(0,Q.jsxs)(Ed,{children:[(0,Q.jsx)(Dd,{render:(0,Q.jsx)(`a`,{"aria-label":W.viewSource,className:`${br({size:`icon-lg`,variant:`outline`})} github-link`,href:`https://github.com/LerSent001/orb`,rel:`noopener noreferrer`,target:`_blank`}),children:(0,Q.jsx)(L,{"aria-hidden":`true`,weight:`fill`})}),(0,Q.jsx)(Od,{side:`top`,children:W.viewSource})]})]})]}),(0,Q.jsx)(`aside`,{className:`panel-dock`,"aria-label":W.orbControls,children:(0,Q.jsxs)(av,{className:`orb-editor-panel h-full max-h-none w-full rounded-lg`,collapsed:p,collapseDirection:`right`,collapseLabel:W.collapseControls,collapsible:!ie,expandLabel:W.expandControls,onCollapsedChange:m,onResetControls:pe,resetLabel:W.resetControls,title:W.orbControls,children:[(0,Q.jsx)(Qx,{input:e,style:V.style,locale:r},t),v===`scene`?(0,Q.jsx)(ev,{collapsed:U.isCollapsed(`scene`),collapseLabel:W.collapseSection(W.sceneSection),collapsible:!0,expandLabel:W.expandSection(W.sceneSection),onCollapsedChange:U.onCollapsedChange(`scene`),title:W.sceneSection,children:(0,Q.jsxs)(`div`,{className:`scene-text-field`,children:[(0,Q.jsxs)(`div`,{className:`scene-text-label-row`,children:[(0,Q.jsx)(pf,{htmlFor:`scene-text-input`,children:W.displayText}),(0,Q.jsxs)(`span`,{"aria-live":`polite`,className:`scene-text-count`,children:[Array.from(b).length,`/`,mS]})]}),(0,Q.jsx)(Ko,{"aria-describedby":`scene-text-limit`,id:`scene-text-input`,onChange:e=>x(kS(e.target.value)),value:b}),(0,Q.jsx)(`span`,{className:`sr-only`,id:`scene-text-limit`,children:W.sceneTextLimit})]})}):null,(0,Q.jsxs)(ev,{collapsed:U.isCollapsed(`state`),collapseLabel:W.collapseSection(W.stateSection),collapsible:!0,expandLabel:W.expandSection(W.stateSection),onCollapsedChange:U.onCollapsedChange(`state`),title:W.stateSection,children:[(0,Q.jsx)(`div`,{className:`orb-state-control`,children:(0,Q.jsx)(j_,{ariaLabel:W.switchOrbState,name:W.orbState,onValueChange:he,options:G,value:a.activeState})}),(0,Q.jsx)(W_,{baseValue:Cb,editValueLabel:W.editValue(W.activationDuration),max:_S.max,min:_S.min,name:W.activationDuration,onValueChange:Ce,showFill:!0,step:_S.step,unit:`s`,value:a.configuration.activationDuration}),(0,Q.jsx)(W_,{baseValue:wb,editValueLabel:W.editValue(W.transitionDuration),max:vS.max,min:vS.min,name:W.transitionDuration,onValueChange:Se,showFill:!0,step:vS.step,unit:`s`,value:a.configuration.transitionDuration})]}),(0,Q.jsx)(ev,{collapsed:U.isCollapsed(`motion`),collapseLabel:W.collapseSection(W.motionSection),collapsible:!0,expandLabel:W.expandSection(W.motionSection),onCollapsedChange:U.onCollapsedChange(`motion`),title:W.motionSection,children:Te(`speed`)}),(0,Q.jsxs)(ev,{collapsed:U.isCollapsed(`colors`),collapseLabel:W.collapseSection(W.colorsSection),collapsible:!0,expandLabel:W.expandSection(W.colorsSection),onCollapsedChange:U.onCollapsedChange(`colors`),title:W.colorsSection,children:[De((0,Q.jsx)(iS,{inputs:[Ee(`colorA`),Ee(`colorB`)]})),De((0,Q.jsx)(iS,{inputs:[Ee(`colorC`),Ee(`colorD`)]})),De((0,Q.jsx)(iS,{inputs:[Ee(`highlightColor`),Ee(`canvasColor`)]})),Te(`shade`),Te(`exposure`)]}),(0,Q.jsxs)(ev,{collapsed:U.isCollapsed(`shape`),collapseLabel:W.collapseSection(W.shapeSection),collapsible:!0,expandLabel:W.expandSection(W.shapeSection),onCollapsedChange:U.onCollapsedChange(`shape`),title:W.shapeSection,children:[Te(`radius`),Te(`contourDeform`),Te(`zoom`),Te(`warp`),Te(`ridgeAmt`),Te(`sharp`),Te(`metalDepth`),Te(`metalRoughness`),Te(`chromaticShift`),Te(`metalScale`),Te(`metalStretch`),Te(`metalAngle`),Te(`bandDensity`),Te(`metalOffset`),Te(`metalPhase`),Te(`metalEvolution`),Te(`particleDensity`),Te(`ribbonCount`),Te(`ribbonWidth`),Te(`ribbonTwist`),Te(`ribbonFold`),Te(`ribbonBreath`),Te(`particleSize`),Te(`particleBloom`)]}),(0,Q.jsxs)(ev,{collapsed:U.isCollapsed(`glass`),collapseLabel:W.collapseSection(W.glassSection),collapsible:!0,expandLabel:W.expandSection(W.glassSection),onCollapsedChange:U.onCollapsedChange(`glass`),title:W.glassSection,children:[(0,Q.jsx)(`div`,{className:`glass-switch`,children:(0,Q.jsx)(Tf,{checked:V.glassEnabled,name:W.enableGlass,onCheckedChange:e=>de(`glassEnabled`,e)})}),V.glassEnabled?(0,Q.jsxs)(Q.Fragment,{children:[Te(`glassOpacity`),Te(`sheen`),Te(`gloss`),Te(`shellMidAlpha`),Te(`shellEdgeAlpha`),De((0,Q.jsx)(iS,{inputs:[Ee(`shellInner`),Ee(`shellMid`)]})),De((0,Q.jsx)(iS,{inputs:[Ee(`shellEdge`),Ee(`sheenColor`)]})),De((0,Q.jsx)(iS,{...Ee(`specColor`)}))]}):null]}),(0,Q.jsxs)(ev,{collapsed:U.isCollapsed(`edge`),collapseLabel:W.collapseSection(W.edgeSection),collapsible:!0,expandLabel:W.expandSection(W.edgeSection),onCollapsedChange:U.onCollapsedChange(`edge`),title:W.edgeSection,children:[Te(`edgeSoftness`),Te(`edgeGlow`),De((0,Q.jsx)(iS,{...Ee(`glowColor`)}))]})]})})]}),(0,Q.jsx)(Mv,{onOpenChange:e=>{C(e),e||D(null)},open:S,children:(0,Q.jsxs)(Fv,{className:`code-sheet`,closeLabel:W.close,side:`bottom`,children:[(0,Q.jsx)(`textarea`,{"aria-hidden":`true`,className:`code-copy-buffer`,ref:ne,tabIndex:-1}),(0,Q.jsx)(Iv,{className:`code-sheet-header`,children:(0,Q.jsx)(Lv,{children:W.copyCode})}),(0,Q.jsxs)(Qv,{className:`code-tabs`,onValueChange:e=>{(e===`web`||e===`swift`||e===`glimmer`||e===`dotnet`||e===`badge`)&&(T(e),D(null))},value:w,children:[(0,Q.jsxs)(`div`,{className:`code-sheet-toolbar`,children:[(0,Q.jsxs)(ey,{variant:`control`,children:[(0,Q.jsx)(ty,{value:`glimmer`,children:`Glimmer`}),(0,Q.jsx)(ty,{value:`dotnet`,children:`.NET`}),(0,Q.jsx)(ty,{value:`badge`,children:`Badge`}),(0,Q.jsx)(ty,{value:`web`,children:`Web`}),(0,Q.jsx)(ty,{value:`swift`,children:`SwiftUI`})]}),(0,Q.jsxs)(Sr,{onClick:q,type:`button`,variant:`outline`,children:[(0,Q.jsx)(F,{"data-icon":`inline-start`}),E===`error`?W.copyFailed:E===w?W.copied:W.copyCode]})]}),(0,Q.jsx)(ny,{className:`code-tab-content`,value:`web`,children:(0,Q.jsx)(`pre`,{className:`code-preview`,"aria-label":W.webCode,children:(0,Q.jsx)(`code`,{children:K})})}),(0,Q.jsxs)(ny,{className:`code-tab-content`,value:`swift`,children:[ue?(0,Q.jsx)(`p`,{className:`code-notice`,children:W.swiftUnavailable}):null,(0,Q.jsx)(`pre`,{className:`code-preview`,"aria-label":W.swiftCode,children:(0,Q.jsx)(`code`,{children:oe})})]}),(0,Q.jsx)(ny,{className:`code-tab-content`,value:`glimmer`,children:(0,Q.jsx)(`pre`,{className:`code-preview`,"aria-label":W.glimmerWebCode,children:(0,Q.jsx)(`code`,{children:se})})}),(0,Q.jsx)(ny,{className:`code-tab-content`,value:`badge`,children:(0,Q.jsx)(`pre`,{className:`code-preview`,"aria-label":`Glimmer badge code`,children:(0,Q.jsx)(`code`,{children:le})})}),(0,Q.jsx)(ny,{className:`code-tab-content`,value:`dotnet`,children:(0,Q.jsx)(`pre`,{className:`code-preview`,"aria-label":W.glimmerDotnetCode,children:(0,Q.jsx)(`code`,{children:ce})})})]})]})})]})}var US=document.querySelector(`#root`);if(!US)throw Error(`找不到应用挂载节点`);(0,St.createRoot)(US).render((0,Q.jsx)(_.StrictMode,{children:(0,Q.jsx)(HS,{})}));export{c as C,u as S,$d as _,u_ as a,nr as b,Nh as c,Lm as d,zm as f,pf as g,Df as h,n_ as i,Fh as l,Vm as m,e_ as n,i_ as o,Um as p,o_ as r,r_ as s,U_ as t,Ph as u,jd as v,Z as x,Ko as y};