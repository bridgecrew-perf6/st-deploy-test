!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n((e=e||self).Diff={})}(this,(function(e){"use strict";function n(){}function t(e,n,t,r,i){for(var o=0,l=n.length,s=0,a=0;o<l;o++){var u=n[o];if(u.removed){if(u.value=e.join(r.slice(a,a+u.count)),a+=u.count,o&&n[o-1].added){var f=n[o-1];n[o-1]=n[o],n[o]=f}}else{if(!u.added&&i){var d=t.slice(s,s+u.count);d=d.map((function(e,n){var t=r[a+n];return t.length>e.length?t:e})),u.value=e.join(d)}else u.value=e.join(t.slice(s,s+u.count));s+=u.count,u.added||(a+=u.count)}}var c=n[l-1];return l>1&&"string"==typeof c.value&&(c.added||c.removed)&&e.equals("",c.value)&&(n[l-2].value+=c.value,n.pop()),n}function r(e){return{newPos:e.newPos,components:e.components.slice(0)}}n.prototype={diff:function(e,n){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},o=i.callback;"function"==typeof i&&(o=i,i={}),this.options=i;var l=this;function s(e){return o?(setTimeout((function(){o(void 0,e)}),0),!0):e}e=this.castInput(e),n=this.castInput(n),e=this.removeEmpty(this.tokenize(e));var a=(n=this.removeEmpty(this.tokenize(n))).length,u=e.length,f=1,d=a+u,c=[{newPos:-1,components:[]}],h=this.extractCommon(c[0],n,e,0);if(c[0].newPos+1>=a&&h+1>=u)return s([{value:this.join(n),count:n.length}]);function p(){for(var i=-1*f;i<=f;i+=2){var o=void 0,d=c[i-1],h=c[i+1],p=(h?h.newPos:0)-i;d&&(c[i-1]=void 0);var v=d&&d.newPos+1<a,g=h&&0<=p&&p<u;if(v||g){if(!v||g&&d.newPos<h.newPos?(o=r(h),l.pushComponent(o.components,void 0,!0)):((o=d).newPos++,l.pushComponent(o.components,!0,void 0)),p=l.extractCommon(o,n,e,i),o.newPos+1>=a&&p+1>=u)return s(t(l,o.components,n,e,l.useLongestToken));c[i]=o}else c[i]=void 0}f++}if(o)!function e(){setTimeout((function(){if(f>d)return o();p()||e()}),0)}();else for(;f<=d;){var v=p();if(v)return v}},pushComponent:function(e,n,t){var r=e[e.length-1];r&&r.added===n&&r.removed===t?e[e.length-1]={count:r.count+1,added:n,removed:t}:e.push({count:1,added:n,removed:t})},extractCommon:function(e,n,t,r){for(var i=n.length,o=t.length,l=e.newPos,s=l-r,a=0;l+1<i&&s+1<o&&this.equals(n[l+1],t[s+1]);)l++,s++,a++;return a&&e.components.push({count:a}),e.newPos=l,s},equals:function(e,n){return this.options.comparator?this.options.comparator(e,n):e===n||this.options.ignoreCase&&e.toLowerCase()===n.toLowerCase()},removeEmpty:function(e){for(var n=[],t=0;t<e.length;t++)e[t]&&n.push(e[t]);return n},castInput:function(e){return e},tokenize:function(e){return e.split("")},join:function(e){return e.join("")}};var i=new n;function o(e,n){if("function"==typeof e)n.callback=e;else if(e)for(var t in e)e.hasOwnProperty(t)&&(n[t]=e[t]);return n}var l=/^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/,s=/\S/,a=new n;a.equals=function(e,n){return this.options.ignoreCase&&(e=e.toLowerCase(),n=n.toLowerCase()),e===n||this.options.ignoreWhitespace&&!s.test(e)&&!s.test(n)},a.tokenize=function(e){for(var n=e.split(/([^\S\r\n]+|[()[\]{}'"\r\n]|\b)/),t=0;t<n.length-1;t++)!n[t+1]&&n[t+2]&&l.test(n[t])&&l.test(n[t+2])&&(n[t]+=n[t+2],n.splice(t+1,2),t--);return n};var u=new n;function f(e,n,t){return u.diff(e,n,t)}u.tokenize=function(e){var n=[],t=e.split(/(\n|\r\n)/);t[t.length-1]||t.pop();for(var r=0;r<t.length;r++){var i=t[r];r%2&&!this.options.newlineIsToken?n[n.length-1]+=i:(this.options.ignoreWhitespace&&(i=i.trim()),n.push(i))}return n};var d=new n;d.tokenize=function(e){return e.split(/(\S.+?[.!?])(?=\s+|$)/)};var c=new n;function h(e){return(h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function p(e){return function(e){if(Array.isArray(e))return v(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,n){if(e){if("string"==typeof e)return v(e,void 0);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?v(e,void 0):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function v(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}c.tokenize=function(e){return e.split(/([{}:;,]|\s+)/)};var g=Object.prototype.toString,m=new n;function w(e,n,t,r,i){var o,l;for(n=n||[],t=t||[],r&&(e=r(i,e)),o=0;o<n.length;o+=1)if(n[o]===e)return t[o];if("[object Array]"===g.call(e)){for(n.push(e),l=new Array(e.length),t.push(l),o=0;o<e.length;o+=1)l[o]=w(e[o],n,t,r,i);return n.pop(),t.pop(),l}if(e&&e.toJSON&&(e=e.toJSON()),"object"===h(e)&&null!==e){n.push(e),t.push(l={});var s,a=[];for(s in e)e.hasOwnProperty(s)&&a.push(s);for(a.sort(),o=0;o<a.length;o+=1)l[s=a[o]]=w(e[s],n,t,r,s);n.pop(),t.pop()}else l=e;return l}m.useLongestToken=!0,m.tokenize=u.tokenize,m.castInput=function(e){var n=this.options,t=n.undefinedReplacement,r=n.stringifyReplacer,i=void 0===r?function(e,n){return void 0===n?t:n}:r;return"string"==typeof e?e:JSON.stringify(w(e,null,null,i),i,"  ")},m.equals=function(e,t){return n.prototype.equals.call(m,e.replace(/,([\r\n])/g,"$1"),t.replace(/,([\r\n])/g,"$1"))};var y=new n;function L(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=e.split(/\r\n|[\n\v\f\r\x85]/),r=e.match(/\r\n|[\n\v\f\r\x85]/g)||[],i=[],o=0;function l(){var e={};for(i.push(e);o<t.length;){var r=t[o];if(/^(\-\-\-|\+\+\+|@@)\s/.test(r))break;var l=/^(?:Index:|diff(?: -r \w+)+)\s+(.+?)\s*$/.exec(r);l&&(e.index=l[1]),o++}for(s(e),s(e),e.hunks=[];o<t.length;){var u=t[o];if(/^(Index:|diff|\-\-\-|\+\+\+)\s/.test(u))break;if(/^@@/.test(u))e.hunks.push(a());else{if(u&&n.strict)throw new Error("Unknown line "+(o+1)+" "+JSON.stringify(u));o++}}}function s(e){var n=/^(---|\+\+\+)\s+(.*)$/.exec(t[o]);if(n){var r="---"===n[1]?"old":"new",i=n[2].split("\t",2),l=i[0].replace(/\\\\/g,"\\");/^".*"$/.test(l)&&(l=l.substr(1,l.length-2)),e[r+"FileName"]=l,e[r+"Header"]=(i[1]||"").trim(),o++}}function a(){var e=o,i=t[o++].split(/@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/),l={oldStart:+i[1],oldLines:void 0===i[2]?1:+i[2],newStart:+i[3],newLines:void 0===i[4]?1:+i[4],lines:[],linedelimiters:[]};0===l.oldLines&&(l.oldStart+=1),0===l.newLines&&(l.newStart+=1);for(var s=0,a=0;o<t.length&&!(0===t[o].indexOf("--- ")&&o+2<t.length&&0===t[o+1].indexOf("+++ ")&&0===t[o+2].indexOf("@@"));o++){var u=0==t[o].length&&o!=t.length-1?" ":t[o][0];if("+"!==u&&"-"!==u&&" "!==u&&"\\"!==u)break;l.lines.push(t[o]),l.linedelimiters.push(r[o]||"\n"),"+"===u?s++:"-"===u?a++:" "===u&&(s++,a++)}if(s||1!==l.newLines||(l.newLines=0),a||1!==l.oldLines||(l.oldLines=0),n.strict){if(s!==l.newLines)throw new Error("Added line count did not match for hunk at line "+(e+1));if(a!==l.oldLines)throw new Error("Removed line count did not match for hunk at line "+(e+1))}return l}for(;o<t.length;)l();return i}function x(e,n,t){var r=!0,i=!1,o=!1,l=1;return function s(){if(r&&!o){if(i?l++:r=!1,e+l<=t)return l;o=!0}if(!i)return o||(r=!0),n<=e-l?-l++:(i=!0,s())}}function S(e,n){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if("string"==typeof n&&(n=L(n)),Array.isArray(n)){if(n.length>1)throw new Error("applyPatch only works with a single input.");n=n[0]}var r,i,o=e.split(/\r\n|[\n\v\f\r\x85]/),l=e.match(/\r\n|[\n\v\f\r\x85]/g)||[],s=n.hunks,a=t.compareLine||function(e,n,t,r){return n===r},u=0,f=t.fuzzFactor||0,d=0,c=0;function h(e,n){for(var t=0;t<e.lines.length;t++){var r=e.lines[t],i=r.length>0?r[0]:" ",l=r.length>0?r.substr(1):r;if(" "===i||"-"===i){if(!a(n+1,o[n],i,l)&&++u>f)return!1;n++}}return!0}for(var p=0;p<s.length;p++){for(var v=s[p],g=o.length-v.oldLines,m=0,w=c+v.oldStart-1,y=x(w,d,g);void 0!==m;m=y())if(h(v,w+m)){v.offset=c+=m;break}if(void 0===m)return!1;d=v.offset+v.oldStart+v.oldLines}for(var S=0,k=0;k<s.length;k++){var b=s[k],F=b.oldStart+b.offset+S-1;S+=b.newLines-b.oldLines;for(var N=0;N<b.lines.length;N++){var H=b.lines[N],P=H.length>0?H[0]:" ",C=H.length>0?H.substr(1):H,j=b.linedelimiters[N];if(" "===P)F++;else if("-"===P)o.splice(F,1),l.splice(F,1);else if("+"===P)o.splice(F,0,C),l.splice(F,0,j),F++;else if("\\"===P){var z=b.lines[N-1]?b.lines[N-1][0]:null;"+"===z?r=!0:"-"===z&&(i=!0)}}}if(r)for(;!o[o.length-1];)o.pop(),l.pop();else i&&(o.push(""),l.push("\n"));for(var A=0;A<o.length-1;A++)o[A]=o[A]+l[A];return o.join("")}function k(e,n,t,r,i,o,l){l||(l={}),void 0===l.context&&(l.context=4);var s=f(t,r,l);function a(e){return e.map((function(e){return" "+e}))}s.push({value:"",lines:[]});for(var u=[],d=0,c=0,h=[],v=1,g=1,m=function(e){var n=s[e],i=n.lines||n.value.replace(/\n$/,"").split("\n");if(n.lines=i,n.added||n.removed){var o;if(!d){var f=s[e-1];d=v,c=g,f&&(h=l.context>0?a(f.lines.slice(-l.context)):[],d-=h.length,c-=h.length)}(o=h).push.apply(o,p(i.map((function(e){return(n.added?"+":"-")+e})))),n.added?g+=i.length:v+=i.length}else{if(d)if(i.length<=2*l.context&&e<s.length-2){var m;(m=h).push.apply(m,p(a(i)))}else{var w,y=Math.min(i.length,l.context);(w=h).push.apply(w,p(a(i.slice(0,y))));var L={oldStart:d,oldLines:v-d+y,newStart:c,newLines:g-c+y,lines:h};if(e>=s.length-2&&i.length<=l.context){var x=/\n$/.test(t),S=/\n$/.test(r),k=0==i.length&&h.length>L.oldLines;!x&&k&&t.length>0&&h.splice(L.oldLines,0,"\\ No newline at end of file"),(x||k)&&S||h.push("\\ No newline at end of file")}u.push(L),d=0,c=0,h=[]}v+=i.length,g+=i.length}},w=0;w<s.length;w++)m(w);return{oldFileName:e,newFileName:n,oldHeader:i,newHeader:o,hunks:u}}function b(e,n,t,r,i,o,l){return function(e){var n=[];e.oldFileName==e.newFileName&&n.push("Index: "+e.oldFileName),n.push("==================================================================="),n.push("--- "+e.oldFileName+(void 0===e.oldHeader?"":"\t"+e.oldHeader)),n.push("+++ "+e.newFileName+(void 0===e.newHeader?"":"\t"+e.newHeader));for(var t=0;t<e.hunks.length;t++){var r=e.hunks[t];0===r.oldLines&&(r.oldStart-=1),0===r.newLines&&(r.newStart-=1),n.push("@@ -"+r.oldStart+","+r.oldLines+" +"+r.newStart+","+r.newLines+" @@"),n.push.apply(n,r.lines)}return n.join("\n")+"\n"}(k(e,n,t,r,i,o,l))}function F(e,n){if(n.length>e.length)return!1;for(var t=0;t<n.length;t++)if(n[t]!==e[t])return!1;return!0}function N(e,n){if("string"==typeof e){if(/^@@/m.test(e)||/^Index:/m.test(e))return L(e)[0];if(!n)throw new Error("Must provide a base reference or pass in a patch");return k(void 0,void 0,n,e)}return e}function H(e){return e.newFileName&&e.newFileName!==e.oldFileName}function P(e,n,t){return n===t?n:(e.conflict=!0,{mine:n,theirs:t})}function C(e,n){return e.oldStart<n.oldStart&&e.oldStart+e.oldLines<n.oldStart}function j(e,n){return{oldStart:e.oldStart,oldLines:e.oldLines,newStart:e.newStart+n,newLines:e.newLines,lines:e.lines}}function z(e,n,t,r,i){var o={offset:n,lines:t,index:0},l={offset:r,lines:i,index:0};for(I(e,o,l),I(e,l,o);o.index<o.lines.length&&l.index<l.lines.length;){var s=o.lines[o.index],a=l.lines[l.index];if("-"!==s[0]&&"+"!==s[0]||"-"!==a[0]&&"+"!==a[0])if("+"===s[0]&&" "===a[0]){var u;(u=e.lines).push.apply(u,p(T(o)))}else if("+"===a[0]&&" "===s[0]){var f;(f=e.lines).push.apply(f,p(T(l)))}else"-"===s[0]&&" "===a[0]?E(e,o,l):"-"===a[0]&&" "===s[0]?E(e,l,o,!0):s===a?(e.lines.push(s),o.index++,l.index++):O(e,T(o),T(l));else A(e,o,l)}$(e,o),$(e,l),function(e){var n=function e(n){var t=0,r=0;return n.forEach((function(n){if("string"!=typeof n){var i=e(n.mine),o=e(n.theirs);void 0!==t&&(i.oldLines===o.oldLines?t+=i.oldLines:t=void 0),void 0!==r&&(i.newLines===o.newLines?r+=i.newLines:r=void 0)}else void 0===r||"+"!==n[0]&&" "!==n[0]||r++,void 0===t||"-"!==n[0]&&" "!==n[0]||t++})),{oldLines:t,newLines:r}}(e.lines),t=n.oldLines,r=n.newLines;void 0!==t?e.oldLines=t:delete e.oldLines,void 0!==r?e.newLines=r:delete e.newLines}(e)}function A(e,n,t){var r,i,o=T(n),l=T(t);if(M(o)&&M(l)){var s,a;if(F(o,l)&&q(t,o,o.length-l.length))return void(s=e.lines).push.apply(s,p(o));if(F(l,o)&&q(n,l,l.length-o.length))return void(a=e.lines).push.apply(a,p(l))}else if((r=o).length===(i=l).length&&F(r,i)){var u;return void(u=e.lines).push.apply(u,p(o))}O(e,o,l)}function E(e,n,t,r){var i,o=T(n),l=function(e,n){for(var t=[],r=[],i=0,o=!1,l=!1;i<n.length&&e.index<e.lines.length;){var s=e.lines[e.index],a=n[i];if("+"===a[0])break;if(o=o||" "!==s[0],r.push(a),i++,"+"===s[0])for(l=!0;"+"===s[0];)t.push(s),s=e.lines[++e.index];a.substr(1)===s.substr(1)?(t.push(s),e.index++):l=!0}if("+"===(n[i]||"")[0]&&o&&(l=!0),l)return t;for(;i<n.length;)r.push(n[i++]);return{merged:r,changes:t}}(t,o);l.merged?(i=e.lines).push.apply(i,p(l.merged)):O(e,r?l:o,r?o:l)}function O(e,n,t){e.conflict=!0,e.lines.push({conflict:!0,mine:n,theirs:t})}function I(e,n,t){for(;n.offset<t.offset&&n.index<n.lines.length;){var r=n.lines[n.index++];e.lines.push(r),n.offset++}}function $(e,n){for(;n.index<n.lines.length;){var t=n.lines[n.index++];e.lines.push(t)}}function T(e){for(var n=[],t=e.lines[e.index][0];e.index<e.lines.length;){var r=e.lines[e.index];if("-"===t&&"+"===r[0]&&(t="+"),t!==r[0])break;n.push(r),e.index++}return n}function M(e){return e.reduce((function(e,n){return e&&"-"===n[0]}),!0)}function q(e,n,t){for(var r=0;r<t;r++){var i=n[n.length-t+r].substr(1);if(e.lines[e.index+r]!==" "+i)return!1}return e.index+=t,!0}y.tokenize=function(e){return e.slice()},y.join=y.removeEmpty=function(e){return e},e.Diff=n,e.applyPatch=S,e.applyPatches=function(e,n){"string"==typeof e&&(e=L(e));var t=0;!function r(){var i=e[t++];if(!i)return n.complete();n.loadFile(i,(function(e,t){if(e)return n.complete(e);var o=S(t,i,n);n.patched(i,o,(function(e){if(e)return n.complete(e);r()}))}))}()},e.canonicalize=w,e.convertChangesToDMP=function(e){for(var n,t=[],r=0;r<e.length;r++)t.push([(n=e[r]).added?1:n.removed?-1:0,n.value]);return t},e.convertChangesToXML=function(e){for(var n=[],t=0;t<e.length;t++){var r=e[t];r.added?n.push("<ins>"):r.removed&&n.push("<del>"),n.push(r.value.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")),r.added?n.push("</ins>"):r.removed&&n.push("</del>")}return n.join("")},e.createPatch=function(e,n,t,r,i,o){return b(e,e,n,t,r,i,o)},e.createTwoFilesPatch=b,e.diffArrays=function(e,n,t){return y.diff(e,n,t)},e.diffChars=function(e,n,t){return i.diff(e,n,t)},e.diffCss=function(e,n,t){return c.diff(e,n,t)},e.diffJson=function(e,n,t){return m.diff(e,n,t)},e.diffLines=f,e.diffSentences=function(e,n,t){return d.diff(e,n,t)},e.diffTrimmedLines=function(e,n,t){var r=o(t,{ignoreWhitespace:!0});return u.diff(e,n,r)},e.diffWords=function(e,n,t){return t=o(t,{ignoreWhitespace:!0}),a.diff(e,n,t)},e.diffWordsWithSpace=function(e,n,t){return a.diff(e,n,t)},e.merge=function(e,n,t){e=N(e,t),n=N(n,t);var r={};(e.index||n.index)&&(r.index=e.index||n.index),(e.newFileName||n.newFileName)&&(H(e)?H(n)?(r.oldFileName=P(r,e.oldFileName,n.oldFileName),r.newFileName=P(r,e.newFileName,n.newFileName),r.oldHeader=P(r,e.oldHeader,n.oldHeader),r.newHeader=P(r,e.newHeader,n.newHeader)):(r.oldFileName=e.oldFileName,r.newFileName=e.newFileName,r.oldHeader=e.oldHeader,r.newHeader=e.newHeader):(r.oldFileName=n.oldFileName||e.oldFileName,r.newFileName=n.newFileName||e.newFileName,r.oldHeader=n.oldHeader||e.oldHeader,r.newHeader=n.newHeader||e.newHeader)),r.hunks=[];for(var i=0,o=0,l=0,s=0;i<e.hunks.length||o<n.hunks.length;){var a=e.hunks[i]||{oldStart:1/0},u=n.hunks[o]||{oldStart:1/0};if(C(a,u))r.hunks.push(j(a,l)),i++,s+=a.newLines-a.oldLines;else if(C(u,a))r.hunks.push(j(u,s)),o++,l+=u.newLines-u.oldLines;else{var f={oldStart:Math.min(a.oldStart,u.oldStart),oldLines:0,newStart:Math.min(a.newStart+l,u.oldStart+s),newLines:0,lines:[]};z(f,a.oldStart,a.lines,u.oldStart,u.lines),o++,i++,r.hunks.push(f)}}return r},e.parsePatch=L,e.structuredPatch=k,Object.defineProperty(e,"__esModule",{value:!0})}));