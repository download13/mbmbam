!function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:o})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=2)}([function(e,t,n){!function(e,n){n(t)}(this,function(e){function t(e,t,n){this.nodeName=e,this.attributes=t,this.children=n,this.key=t&&t.key}function n(e,n){var o,r,i,a,s=[];for(a=arguments.length;a-- >2;)L.push(arguments[a]);for(n&&n.children&&(L.length||L.push(n.children),delete n.children);L.length;)if((r=L.pop())instanceof Array)for(a=r.length;a--;)L.push(r[a]);else null!=r&&r!==!1&&("number"!=typeof r&&r!==!0||(r=String(r)),i="string"==typeof r,i&&o?s[s.length-1]+=r:(s.push(r),o=i));var u=new t(e,n||void 0,s);return D.vnode&&D.vnode(u),u}function o(e,t){if(t)for(var n in t)e[n]=t[n];return e}function r(e){return o({},e)}function i(e,t){for(var n=t.split("."),o=0;o<n.length&&e;o++)e=e[n[o]];return e}function a(e){return"function"==typeof e}function s(e){return"string"==typeof e}function u(e){var t="";for(var n in e)e[n]&&(t&&(t+=" "),t+=n);return t}function l(e,t){return n(e.nodeName,o(r(e.attributes),t),arguments.length>2?[].slice.call(arguments,2):e.children)}function c(e,t,n){var o=t.split(".");return function(t){for(var r=t&&t.target||this,a={},u=a,l=s(n)?i(t,n):r.nodeName?r.type.match(/^che|rad/)?r.checked:r.value:t,c=0;c<o.length-1;c++)u=u[o[c]]||(u[o[c]]=!c&&e.state[o[c]]||{});u[o[c]]=l,e.setState(a)}}function f(e){!e._dirty&&(e._dirty=!0)&&1==K.push(e)&&(D.debounceRendering||R)(p)}function p(){var e,t=K;for(K=[];e=t.pop();)e._dirty&&B(e)}function d(e){var t=e&&e.nodeName;return t&&a(t)&&!(t.prototype&&t.prototype.render)}function h(e,t){return e.nodeName(y(e),t||V)}function v(e,t){return s(t)?e instanceof Text:s(t.nodeName)?!e._componentConstructor&&m(e,t.nodeName):a(t.nodeName)?!e._componentConstructor||e._componentConstructor===t.nodeName||d(t):void 0}function m(e,t){return e.normalizedNodeName===t||z(e.nodeName)===z(t)}function y(e){var t=r(e.attributes);t.children=e.children;var n=e.nodeName.defaultProps;if(n)for(var o in n)void 0===t[o]&&(t[o]=n[o]);return t}function b(e){var t=e.parentNode;t&&t.removeChild(e)}function _(e,t,n,o,r){if("className"===t&&(t="class"),"class"===t&&o&&"object"==typeof o&&(o=u(o)),"key"===t);else if("class"!==t||r)if("style"===t){if((!o||s(o)||s(n))&&(e.style.cssText=o||""),o&&"object"==typeof o){if(!s(n))for(var i in n)i in o||(e.style[i]="");for(var i in o)e.style[i]="number"!=typeof o[i]||J[i]?o[i]:o[i]+"px"}}else if("dangerouslySetInnerHTML"===t)e.innerHTML=o&&o.__html||"";else if("o"==t[0]&&"n"==t[1]){var l=e._listeners||(e._listeners={});t=z(t.substring(2)),o?l[t]||e.addEventListener(t,x,!!q[t]):l[t]&&e.removeEventListener(t,x,!!q[t]),l[t]=o}else if("list"!==t&&"type"!==t&&!r&&t in e)g(e,t,null==o?"":o),null!=o&&o!==!1||e.removeAttribute(t);else{var c=r&&t.match(/^xlink\:?(.+)/);null==o||o===!1?c?e.removeAttributeNS("http://www.w3.org/1999/xlink",z(c[1])):e.removeAttribute(t):"object"==typeof o||a(o)||(c?e.setAttributeNS("http://www.w3.org/1999/xlink",z(c[1]),o):e.setAttribute(t,o))}else e.className=o||""}function g(e,t,n){try{e[t]=n}catch(e){}}function x(e){return this._listeners[e.type](D.event&&D.event(e)||e)}function k(e){if(b(e),e instanceof Element){e._component=e._componentConstructor=null;var t=e.normalizedNodeName||z(e.nodeName);(X[t]||(X[t]=[])).push(e)}}function C(e,t){var n=z(e),o=X[n]&&X[n].pop()||(t?document.createElementNS("http://www.w3.org/2000/svg",e):document.createElement(e));return o.normalizedNodeName=n,o}function w(){for(var e;e=Q.pop();)D.afterMount&&D.afterMount(e),e.componentDidMount&&e.componentDidMount()}function N(e,t,n,o,r,i){Y++||(Z=r instanceof SVGElement,$=e&&!(G in e));var a=S(e,t,n,o);return r&&a.parentNode!==r&&r.appendChild(a),--Y||($=!1,i||w()),a}function S(e,t,n,o){for(var r=t&&t.attributes;d(t);)t=h(t,n);if(null==t&&(t=""),s(t))return e&&e instanceof Text?e.nodeValue!=t&&(e.nodeValue=t):(e&&P(e),e=document.createTextNode(t)),e[G]=!0,e;if(a(t.nodeName))return j(e,t,n,o);var i=e,u=String(t.nodeName),l=Z,c=t.children;if(Z="svg"===u||"foreignObject"!==u&&Z,e){if(!m(e,u)){for(i=C(u,Z);e.firstChild;)i.appendChild(e.firstChild);e.parentNode&&e.parentNode.replaceChild(i,e),P(e)}}else i=C(u,Z);var f=i.firstChild,p=i[G];if(!p){i[G]=p={};for(var v=i.attributes,y=v.length;y--;)p[v[y].name]=v[y].value}return O(i,t.attributes,p),!$&&c&&1===c.length&&"string"==typeof c[0]&&f&&f instanceof Text&&!f.nextSibling?f.nodeValue!=c[0]&&(f.nodeValue=c[0]):(c&&c.length||f)&&E(i,c,n,o),r&&"function"==typeof r.ref&&(p.ref=r.ref)(i),Z=l,i}function E(e,t,n,o){var r,i,a,s,u=e.childNodes,l=[],c={},f=0,p=0,d=u.length,h=0,m=t&&t.length;if(d)for(var y=0;y<d;y++){var _=u[y],g=_[G],x=m?(i=_._component)?i.__key:g?g.key:null:null;null!=x?(f++,c[x]=_):($||g)&&(l[h++]=_)}if(m)for(var y=0;y<m;y++){a=t[y],s=null;var x=a.key;if(null!=x)f&&x in c&&(s=c[x],c[x]=void 0,f--);else if(!s&&p<h)for(r=p;r<h;r++)if(i=l[r],i&&v(i,a)){s=i,l[r]=void 0,r===h-1&&h--,r===p&&p++;break}s=S(s,a,n,o),s&&s!==e&&(y>=d?e.appendChild(s):s!==u[y]&&(s===u[y+1]&&b(u[y]),e.insertBefore(s,u[y]||null)))}if(f)for(var y in c)c[y]&&P(c[y]);for(;p<=h;)s=l[h--],s&&P(s)}function P(e,t){var n=e._component;if(n)I(n,!t);else{e[G]&&e[G].ref&&e[G].ref(null),t||k(e);for(var o;o=e.lastChild;)P(o,t)}}function O(e,t,n){for(var o in n)t&&o in t||null==n[o]||_(e,o,n[o],n[o]=void 0,Z);if(t)for(var r in t)"children"===r||"innerHTML"===r||r in n&&t[r]===("value"===r||"checked"===r?e[r]:n[r])||_(e,r,n[r],n[r]=t[r],Z)}function M(e){var t=e.constructor.name,n=ee[t];n?n.push(e):ee[t]=[e]}function U(e,t,n){var o=new e(t,n),r=ee[e.name];if(W.call(o,t,n),r)for(var i=r.length;i--;)if(r[i].constructor===e){o.nextBase=r[i].nextBase,r.splice(i,1);break}return o}function T(e,t,n,o,r){e._disable||(e._disable=!0,(e.__ref=t.ref)&&delete t.ref,(e.__key=t.key)&&delete t.key,!e.base||r?e.componentWillMount&&e.componentWillMount():e.componentWillReceiveProps&&e.componentWillReceiveProps(t,o),o&&o!==e.context&&(e.prevContext||(e.prevContext=e.context),e.context=o),e.prevProps||(e.prevProps=e.props),e.props=t,e._disable=!1,0!==n&&(1!==n&&D.syncComponentUpdates===!1&&e.base?f(e):B(e,1,r)),e.__ref&&e.__ref(e))}function B(e,t,n,i){if(!e._disable){var s,u,l,c,f=e.props,p=e.state,v=e.context,m=e.prevProps||f,b=e.prevState||p,_=e.prevContext||v,g=e.base,x=e.nextBase,k=g||x,C=e._component;if(g&&(e.props=m,e.state=b,e.context=_,2!==t&&e.shouldComponentUpdate&&e.shouldComponentUpdate(f,p,v)===!1?s=!0:e.componentWillUpdate&&e.componentWillUpdate(f,p,v),e.props=f,e.state=p,e.context=v),e.prevProps=e.prevState=e.prevContext=e.nextBase=null,e._dirty=!1,!s){for(e.render&&(u=e.render(f,p,v)),e.getChildContext&&(v=o(r(v),e.getChildContext()));d(u);)u=h(u,v);var S,E,O=u&&u.nodeName;if(a(O)){var M=y(u);l=C,l&&l.constructor===O&&M.key==l.__key?T(l,M,1,v):(S=l,l=U(O,M,v),l.nextBase=l.nextBase||x,l._parentComponent=e,e._component=l,T(l,M,0,v),B(l,1,n,!0)),E=l.base}else c=k,S=C,S&&(c=e._component=null),(k||1===t)&&(c&&(c._component=null),E=N(c,u,v,n||!g,k&&k.parentNode,!0));if(k&&E!==k&&l!==C){var j=k.parentNode;j&&E!==j&&(j.replaceChild(E,k),S||(k._component=null,P(k)))}if(S&&I(S,E!==k),e.base=E,E&&!i){for(var W=e,A=e;A=A._parentComponent;)(W=A).base=E;E._component=W,E._componentConstructor=W.constructor}}!g||n?Q.unshift(e):s||(e.componentDidUpdate&&e.componentDidUpdate(m,b,_),D.afterUpdate&&D.afterUpdate(e));var L,F=e._renderCallbacks;if(F)for(;L=F.pop();)L.call(e);Y||i||w()}}function j(e,t,n,o){for(var r=e&&e._component,i=e,a=r&&e._componentConstructor===t.nodeName,s=a,u=y(t);r&&!s&&(r=r._parentComponent);)s=r.constructor===t.nodeName;return r&&s&&(!o||r._component)?(T(r,u,3,n,o),e=r.base):(r&&!a&&(I(r,!0),e=i=null),r=U(t.nodeName,u,n),e&&!r.nextBase&&(r.nextBase=e,i=null),T(r,u,1,n,o),e=r.base,i&&e!==i&&(i._component=null,P(i))),e}function I(e,t){D.beforeUnmount&&D.beforeUnmount(e);var n=e.base;e._disable=!0,e.componentWillUnmount&&e.componentWillUnmount(),e.base=null;var o=e._component;if(o)I(o,t);else if(n){n[G]&&n[G].ref&&n[G].ref(null),e.nextBase=n,t&&(b(n),M(e));for(var r;r=n.lastChild;)P(r,!t)}e.__ref&&e.__ref(null),e.componentDidUnmount&&e.componentDidUnmount()}function W(e,t){this._dirty=!0,this.context=t,this.props=e,this.state||(this.state={})}function A(e,t,n){return N(n,e,{},!1,t)}var D={},L=[],F={},z=function(e){return F[e]||(F[e]=e.toLowerCase())},H="undefined"!=typeof Promise&&Promise.resolve(),R=H?function(e){H.then(e)}:setTimeout,V={},G="undefined"!=typeof Symbol?Symbol.for("preactattr"):"__preactattr_",J={boxFlex:1,boxFlexGroup:1,columnCount:1,fillOpacity:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,fontWeight:1,lineClamp:1,lineHeight:1,opacity:1,order:1,orphans:1,strokeOpacity:1,widows:1,zIndex:1,zoom:1},q={blur:1,error:1,focus:1,load:1,resize:1,scroll:1},K=[],X={},Q=[],Y=0,Z=!1,$=!1,ee={};o(W.prototype,{linkState:function(e,t){var n=this._linkedStates||(this._linkedStates={});return n[e+t]||(n[e+t]=c(this,e,t))},setState:function(e,t){var n=this.state;this.prevState||(this.prevState=r(n)),o(n,a(e)?e(n,this.props):e),t&&(this._renderCallbacks=this._renderCallbacks||[]).push(t),f(this)},forceUpdate:function(){B(this,2)},render:function(){}}),e.h=n,e.cloneElement=l,e.Component=W,e.render=A,e.rerender=p,e.options=D})},function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function a(e){var t=Math.floor(e/60);t<10&&(t="0"+t);var n=Math.floor(e%60);return n<10&&(n="0"+n),t+":"+n}function s(e){return new Promise(function(t,n){var o=new XMLHttpRequest;o.open("GET","/list/"+e,!0),o.onload=function(){return t(JSON.parse(o.responseText))},o.onerror=n,o.send()})}function u(e,t,n){return Math.max(Math.min(e,n),t)}var l=n(0),c=(n.n(l),function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}()),f=function(e){function t(e){o(this,t);var n=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={currentPodcast:"mbmbam",episodes:[],index:0,position:0,duration:0,autoplay:!0,offline:!1},n}return i(t,e),c(t,[{key:"componentDidMount",value:function(){var e=this,t=this.audioEl;s(this.state.currentPodcast).then(function(t){e.setState({episodes:t}),e.load()}),t.ontimeupdate=function(){e.setState({position:t.currentTime})},t.ondurationchange=function(){e.setState({duration:t.duration})},window.onbeforeunload=function(){return e.save()},window.addEventListener("keyup",function(t){"Space"===t.code&&(t.preventDefault(),e.togglePlaying())})}},{key:"render",value:function(e,t){var o=this,r=t.currentPodcast,i=t.index,s=t.episodes,u=t.autoplay,c=(t.offline,t.position),f=t.duration,p=s[i]||{},d=p.title;p.imageUrl,p.audioUrl;return n.i(l.h)("div",{class:"player"},n.i(l.h)("h1",{class:"title"},d),n.i(l.h)("img",{class:"image",src:"/episodes/"+r+"/"+i+"/image"}),n.i(l.h)("audio",{class:"audio",ref:function(e){return o.audioEl=e},controls:!0,autoplay:u,preload:"auto",src:"/episodes/"+r+"/"+i+"/audio",onPause:function(){return o.save()},onEnded:function(){return o.episodeEnded()}}),n.i(l.h)("div",{class:"time"},a(c)+" / "+a(f)),n.i(l.h)("div",{class:"seek"},n.i(l.h)("button",{onClick:function(){return o.seekBackward(30)},title:"Back 30 Seconds"},n.i(l.h)("span",{class:"icon-fast-bw"})," 30"),n.i(l.h)("button",{onClick:function(){return o.seekBackward(5)},title:"Back 5 Seconds"},n.i(l.h)("span",{class:"icon-fast-bw"})," 5"),n.i(l.h)("button",{onClick:function(){return o.seekForward(5)},title:"Forward 5 Seconds"},"5 ",n.i(l.h)("span",{class:"icon-fast-fw"})),n.i(l.h)("button",{onClick:function(){return o.seekForward(30)},title:"Forward 30 Seconds"},"30 ",n.i(l.h)("span",{class:"icon-fast-fw"}))),n.i(l.h)("div",{class:"nav"},n.i(l.h)("button",{onClick:function(){return o.previousEpisode()},title:"Previous Episode"},n.i(l.h)("span",{class:"icon-to-start-alt"})),n.i(l.h)("input",{type:"number",onKeyUp:function(e){return o.gotoIndexOnEnter(e)},onInput:function(e){return o.gotoIndex(e)},value:i+1}),n.i(l.h)("button",{onClick:function(){return o.nextEpisode()},title:"Next Episode"},n.i(l.h)("span",{class:"icon-to-end-alt"}))),n.i(l.h)("div",{class:"options"},n.i(l.h)("span",null,n.i(l.h)("input",{type:"checkbox",id:"autoplay_opt",checked:u,onChange:function(e){return o.setAutoplay(e.target.checked)}}),n.i(l.h)("label",{for:"autoplay_opt"},"Autoplay"))))}},{key:"previousEpisode",value:function(){var e=this.state.index;this.selectEpisode(Math.max(e-1,0))}},{key:"nextEpisode",value:function(){var e=this.state,t=e.index,n=e.episodes;this.selectEpisode(Math.min(t+1,n.length-1))}},{key:"selectEpisode",value:function(e){this.setState({index:e}),document.title=this.state.episodes[e].title}},{key:"seekBackward",value:function(e){this.audioEl.currentTime-=e}},{key:"seekForward",value:function(e){this.audioEl.currentTime+=e}},{key:"togglePlaying",value:function(){var e=this.audioEl;e.paused?e.play():e.pause()}},{key:"setAutoplay",value:function(e){this.setState({autoplay:e})}},{key:"setOffline",value:function(e){this.setState({offline:e})}},{key:"gotoIndexOnEnter",value:function(e){"Enter"===e.key&&this.gotoIndex(e)}},{key:"gotoIndex",value:function(e){var t=this.state.episodes,n=parseInt(e.target.value);"number"!=typeof n||isNaN(n)||this.selectEpisode(u(n-1,0,t.length-1))}},{key:"episodeEnded",value:function(){var e=this.state,t=e.index,n=e.episodes;t<n.length-1&&this.selectEpisode(t+1)}},{key:"save",value:function(){var e=this.state,t=e.index,n=e.position,o=e.autoplay;localStorage.setItem("place",JSON.stringify({index:t,position:n,autoplay:o}))}},{key:"load",value:function(){try{var e=JSON.parse(localStorage.getItem("place")),t=e.index,n=e.position,o=e.autoplay;this.audioEl.currentTime=n,this.setState({autoplay:o}),this.selectEpisode(t)}catch(e){console.log("Invalid saved JSON")}}}]),t}(l.Component);t.a=f},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(0),r=(n.n(o),n(1));n.i(o.render)(n.i(o.h)(r.a,null),document.getElementById("player-mount")),navigator.serviceWorker&&navigator.serviceWorker.register("/sw.js")}]);