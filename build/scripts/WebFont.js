﻿var webFont={},fontItem={url:"//fonts.googleapis.com/css?family=Roboto+Condensed:700&subset=cyrillic,cyrillic-ext",name:"Roboto Condensed",font:"'webFont', 'Arial Narrow', sans-serif",testStrings:{webFont:"ИГРАТЬFOR"}};webFont.cyrillic=fontItem,(fontItem={}).url="//fonts.googleapis.com/css?family=Roboto+Condensed:700,400&subset=latin,latin-ext",fontItem.name="Roboto Condensed",fontItem.font="'webFont', 'Arial Narrow', sans-serif",webFont.latin=fontItem,(fontItem={}).url="//fonts.googleapis.com/css?family=Roboto+Condensed:400,700&subset=latin,greek,greek-ext,latin-ext",fontItem.name="Roboto Condensed",fontItem.font="'webFont', 'Arial Narrow', sans-serif",fontItem.testStrings={webFont:"ΠΑΙΞΕΔΩΡΕΑΝ"},webFont.greek=fontItem,(fontItem={}).url="//fonts.googleapis.com/css?family=Roboto+Condensed:400,700&subset=latin-ext,vietnamese",fontItem.name="Roboto Condensed",fontItem.font="'webFont', 'Arial Narrow', sans-serif",fontItem.testStrings={webFont:"CHƠIMIỄNPHÍ"},webFont.vietnamese=fontItem,(fontItem={}).url="//fonts.googleapis.com/css?family=Itim&subset=thai",fontItem.name="Itim",fontItem.font="'webFont', 'Arial Narrow', sans-serif",fontItem.testStrings={webFont:"เล่นฟรPL"},webFont.thai=fontItem,(fontItem={}).url="//fonts.googleapis.com/css?family=Mada",fontItem.name="Mada",fontItem.font="'webFont', 'Arial Narrow', sans-serif",fontItem.testStrings={webFont:"مجانًBe"},webFont.arabic=fontItem,(fontItem={}).url="",fontItem.name="",fontItem.font="'Malgun Gothic', '애플고딕', 'AppleGothic', '맑은 고딕', 'Dotum, 돋움', 'DotumChe', '돋움체', 'Gulim', '굴림', 'New Gulim', '새굴림', sans-serif",webFont.korean=fontItem,(fontItem={}).url="",fontItem.name="",fontItem.font="'メイリオ', 'Microsoft YaHei', 'STXihei', '华文细黑', sans-serif",webFont.japanese=fontItem,(fontItem={}).url="",fontItem.name="",fontItem.font="'Microsoft YaHei', '微软雅黑', 'STXihei', '华文细黑', sans-serif",webFont.chinese=fontItem;fontItem={url:"//fonts.googleapis.com/css?family=Cormorant+Garamond:400,700&subset=latin-ext",name:"Cormorant Garamond",font:"'webFont', 'Times New Roman', serif",testStrings:{webFont:"ИГРАТЬFOR"}};webFont.twa_latin=fontItem;fontItem={url:"//fonts.googleapis.com/css?family=Cormorant+Garamond:400,700&subset=cyrillic,cyrillic-ext",name:"Cormorant Garamond",font:"'webFont', 'Times New Roman', serif",testStrings:{webFont:"ИГРАТЬFOR"}};webFont.twa_cyrillic=fontItem;fontItem={url:"//fonts.googleapis.com/css?family=Cormorant+Garamond:400,700&subset=vietnamese",name:"Cormorant Garamond",font:"'webFont', 'Times New Roman', serif",testStrings:{webFont:"CHƠIMIỄNPHÍ"}};webFont.twa_vietnamese=fontItem,webFont.currentFont=webFont.cyrillic;var font=webFont.currentFont.font,addFonts=new Array;function loadFonts(){var t=new(window.XDomainRequest||window.XMLHttpRequest),n="https:";"https:"!=window.location.protocol&&(n="https:"),""!=webFont.currentFont.url&&t.open("GET",n+webFont.currentFont.url,!0),t.onload=function(){var n="webFont";webFont.currentFont.wfName&&(n=webFont.currentFont.wfName);var e=t.responseText;if(e=(e=(e=e.replace(new RegExp("font-family: '"+webFont.currentFont.name+"';","g"),"font-family: '"+n+"';")).replace(/local\(.*\),/g,"")).replace(/url\(\/\//g,"url(https://"),head=document.head||document.getElementsByTagName("head")[0],style=document.createElement("style"),style.type="text/css",style.styleSheet){style.styleSheet.cssText=e;for(var o=document.styleSheets,i=0,s=o.length;i<s;i++)o[i].disabled=!0,o[i].disabled=!1}else style.appendChild(document.createTextNode(e));head.appendChild(style),WebFontConfig={custom:{families:[n]},loading:function(){},active:function(){toStart()},inactive:function(){toStart()}},webFont.currentFont.testStrings&&(WebFontConfig.custom.testStrings=webFont.currentFont.testStrings),runWFL()},t.onerror=function(){console.log("Fonts error"),toStart()},""!=webFont.currentFont.url?t.send():toStart()}function toStart(){0==addFonts.length?start():(webFont.currentFont=addFonts[0],loadFonts(),addFonts.splice(0,1))}function runWFL(){!function(){function t(t,n,e){return t.call.apply(t.bind,arguments)}function n(t,n,e){if(!t)throw Error();if(2<arguments.length){var o=Array.prototype.slice.call(arguments,2);return function(){var e=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(e,o),t.apply(n,e)}}return function(){return t.apply(n,arguments)}}function e(o,i,s){return(e=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?t:n).apply(null,arguments)}var o=Date.now||function(){return+new Date};var i=!!window.FontFace;function s(t,n,e,o){if(n=t.b.createElement(n),e)for(var i in e)e.hasOwnProperty(i)&&("style"==i?n.style.cssText=e[i]:n.setAttribute(i,e[i]));return o&&n.appendChild(t.b.createTextNode(o)),n}function a(t,n,e){(t=t.b.getElementsByTagName(n)[0])||(t=document.documentElement),t.insertBefore(e,t.lastChild)}function r(t){t.parentNode&&t.parentNode.removeChild(t)}function f(t,n,e){n=n||[],e=e||[];for(var o=t.className.split(/\s+/),i=0;i<n.length;i+=1){for(var s=!1,a=0;a<o.length;a+=1)if(n[i]===o[a]){s=!0;break}s||o.push(n[i])}for(n=[],i=0;i<o.length;i+=1){for(s=!1,a=0;a<e.length;a+=1)if(o[i]===e[a]){s=!0;break}s||n.push(o[i])}t.className=n.join(" ").replace(/\s+/g," ").replace(/^\s+|\s+$/,"")}function l(t,n){for(var e=t.className.split(/\s+/),o=0,i=e.length;o<i;o++)if(e[o]==n)return!0;return!1}function c(t,n,e){function o(){c&&r&&f&&(c(l),c=null)}n=s(t,"link",{rel:"stylesheet",href:n,media:"all"});var r=!1,f=!0,l=null,c=e||null;i?(n.onload=function(){r=!0,o()},n.onerror=function(){r=!0,l=Error("Stylesheet failed to load"),o()}):setTimeout(function(){r=!0,o()},0),a(t,"head",n)}function u(t){return t.a++,function(){t.a--,h(t)}}function h(t){0==t.a&&t.b&&(t.b(),t.b=null)}function m(t){this.a=t||"-"}function b(t,n){this.b=t,this.c=4,this.a="n";var e=(n||"n4").match(/^([nio])([1-9])$/i);e&&(this.a=e[1],this.c=parseInt(e[2],10))}function w(t){var n=[];t=t.split(/,\s*/);for(var e=0;e<t.length;e++){var o=t[e].replace(/['"]/g,"");-1!=o.indexOf(" ")||/^\d/.test(o)?n.push("'"+o+"'"):n.push(o)}return n.join(",")}function d(t){return t.a+t.c}function g(t){var n="normal";return"o"===t.a?n="oblique":"i"===t.a&&(n="italic"),n}function p(t){if(t.f){var n=l(t.c,t.a.b("wf","active")),e=[],o=[t.a.b("wf","loading")];n||e.push(t.a.b("wf","inactive")),f(t.c,e,o)}F(t,"inactive")}function F(t,n,e){t.h&&t.g[n]&&(e?t.g[n](e.b,d(e)):t.g[n]())}function v(t,n){this.b=t,this.c=n,this.a=s(this.b,"span",{"aria-hidden":"true"},this.c)}function y(t){a(t.b,"body",t.a)}function I(t){return"display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:"+w(t.b)+";font-style:"+g(t)+";font-weight:"+t.c+"00;"}function S(t,n,e,o,i,s){this.f=t,this.h=n,this.a=o,this.b=e,this.c=i||3e3,this.g=s||void 0}function x(t,n,e,o,i,s,a){this.m=t,this.s=n,this.b=e,this.a=o,this.j=a||"BESbswy",this.c={},this.u=i||3e3,this.l=s||null,this.i=this.h=this.g=this.f=null,this.f=new v(this.b,this.j),this.g=new v(this.b,this.j),this.h=new v(this.b,this.j),this.i=new v(this.b,this.j),t=I(t=new b(this.a.b+",serif",d(this.a))),this.f.a.style.cssText=t,t=I(t=new b(this.a.b+",sans-serif",d(this.a))),this.g.a.style.cssText=t,t=I(t=new b("serif",d(this.a))),this.h.a.style.cssText=t,t=I(t=new b("sans-serif",d(this.a))),this.i.a.style.cssText=t,y(this.f),y(this.g),y(this.h),y(this.i)}m.prototype.b=function(t){for(var n=[],e=0;e<arguments.length;e++)n.push(arguments[e].replace(/[\W_]+/g,"").toLowerCase());return n.join(this.a)},S.prototype.start=function(){var t=this.b.a.document,n=this,e=o(),i=new Promise(function(i,s){!function a(){var r;o()-e>=n.c?s():t.fonts.load((r=n.a,g(r)+" "+r.c+"00 300px "+w(r.b)),n.g).then(function(t){1<=t.length?i():setTimeout(a,25)},function(){s()})}()}),s=new Promise(function(t,e){setTimeout(e,n.c)});Promise.race([s,i]).then(function(){n.f(n.a)},function(){n.h(n.a)})};var C={w:"serif",v:"sans-serif"},N=null;function T(){if(null===N){var t=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);N=!!t&&(536>parseInt(t[1],10)||536===parseInt(t[1],10)&&11>=parseInt(t[2],10))}return N}function R(t,n,e){for(var o in C)if(C.hasOwnProperty(o)&&n===t.c[C[o]]&&e===t.c[C[o]])return!0;return!1}function A(t){var n,i=t.f.a.offsetWidth,s=t.g.a.offsetWidth;(n=i===t.c.serif&&s===t.c["sans-serif"])||(n=T()&&R(t,i,s)),n?o()-t.o>=t.u?T()&&R(t,i,s)&&(null===t.l||t.l.hasOwnProperty(t.a.b))?W(t,t.m):W(t,t.s):setTimeout(e(function(){A(this)},t),50):W(t,t.m)}function W(t,n){setTimeout(e(function(){r(this.f.a),r(this.g.a),r(this.h.a),r(this.i.a),n(this.a)},t),0)}function j(t,n,e){this.b=t,this.a=n,this.c=0,this.i=this.h=!1,this.j=e}x.prototype.start=function(){this.c.serif=this.h.a.offsetWidth,this.c["sans-serif"]=this.i.a.offsetWidth,this.o=o(),A(this)};var G=null;function E(t){0==--t.c&&t.h&&(t.i?((t=t.a).f&&f(t.c,[t.a.b("wf","active")],[t.a.b("wf","loading"),t.a.b("wf","inactive")]),F(t,"active")):p(t.a))}function P(t){this.h=t,this.f=new function(){this.b={}},this.g=0,this.a=this.c=!0}function k(t,n){this.b=t,this.a=n}j.prototype.f=function(t){var n=this.a;n.f&&f(n.c,[n.a.b("wf",t.b,d(t).toString(),"active")],[n.a.b("wf",t.b,d(t).toString(),"loading"),n.a.b("wf",t.b,d(t).toString(),"inactive")]),F(n,"fontactive",t),this.i=!0,E(this)},j.prototype.g=function(t){var n=this.a;if(n.f){var e=l(n.c,n.a.b("wf",t.b,d(t).toString(),"active")),o=[],i=[n.a.b("wf",t.b,d(t).toString(),"loading")];e||o.push(n.a.b("wf",t.b,d(t).toString(),"inactive")),f(n.c,o,i)}F(n,"fontinactive",t),E(this)},P.prototype.load=function(t){this.b=new function(t,n){this.a=n||t,this.b=this.a.document}(this.h,t.context||this.h),this.c=!1!==t.events,this.a=!1!==t.classes,function(t,n,o){var i=[],s=o.timeout;a=n,a.f&&f(a.c,[a.a.b("wf","loading")]),F(a,"loading");var a;var i=function(t,n,e){var o,i=[];for(o in n)if(n.hasOwnProperty(o)){var s=t.b[o];s&&i.push(s(n[o],e))}return i}(t.f,o,t.b),r=new j(t.b,n,s);for(t.g=i.length,n=0,o=i.length;n<o;n++)i[n].load(function(n,o,i){var s,a,l,c,u,h;a=r,l=n,c=o,u=i,h=0==--(s=t).g,(s.a||s.c)&&setTimeout(function(){var t=u||null,n=c||{};if(0===l.length&&h)p(a.a);else{a.c+=l.length,h&&(a.h=h);var o,i=[];for(o=0;o<l.length;o++){var s=l[o],r=n[s.b],m=a.a,b=s;m.f&&f(m.c,[m.a.b("wf",b.b,d(b).toString(),"loading")]),F(m,"fontloading",b),m=null,null===G&&(G=!!window.FontFace&&(!(b=/Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent))||42<parseInt(b[1],10))),m=G?new S(e(a.f,a),e(a.g,a),a.b,s,a.j,r):new x(e(a.f,a),e(a.g,a),a.b,s,a.j,t,r),i.push(m)}for(o=0;o<i.length;o++)i[o].start()}},0)})}(this,new function(t,n){this.b=t,this.c=t.a.document.documentElement,this.g=n,this.a=new m("-"),this.h=!1!==n.events,this.f=!1!==n.classes}(this.b,t),t)},k.prototype.load=function(t){var n,e,o=this.a.urls||[],i=this.a.families||[],s=this.a.testStrings||{},a=new function(){this.a=0,this.b=null};for(n=0,e=o.length;n<e;n++)c(this.b,o[n],u(a));var r,f,l=[];for(n=0,e=i.length;n<e;n++)if(o=i[n].split(":"),o[1])for(var m=o[1].split(","),w=0;w<m.length;w+=1)l.push(new b(o[0],m[w]));else l.push(new b(o[0]));f=function(){t(l,s)},(r=a).b=f,h(r)};var O=new P(window);O.f.b.custom=function(t,n){return new k(n,t)};var M={load:e(O.load,O)};"function"==typeof define&&define.amd?define(function(){return M}):"undefined"!=typeof module&&module.exports?module.exports=M:(window.WebFont=M,window.WebFontConfig&&O.load(window.WebFontConfig))}()}