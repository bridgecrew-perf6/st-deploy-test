!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=26)}([function(e,t){e.exports=require("electron")},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("fs")},function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),e.webpackPolyfill=1),e}},function(e,t){e.exports=require("url")},function(e,t,n){"use strict";(function(e){const t=n(6),r=n(7),o=n(2),i=n(1),c=n(8),s=n(9),a=Object.prototype.hasOwnProperty;class u{constructor(e,t){const n=t?p(t+"."):"";this._blobFilename=i.join(e,n+"BLOB"),this._mapFilename=i.join(e,n+"MAP"),this._lockFilename=i.join(e,n+"LOCK"),this._directory=e,this._load()}has(e,t){return a.call(this._memoryBlobs,e)?this._invalidationKeys[e]===t:!!a.call(this._storedMap,e)&&this._storedMap[e][0]===t}get(e,t){if(a.call(this._memoryBlobs,e)){if(this._invalidationKeys[e]===t)return this._memoryBlobs[e]}else if(a.call(this._storedMap,e)){const n=this._storedMap[e];if(n[0]===t)return this._storedBlob.slice(n[1],n[2])}}set(e,t,n){this._invalidationKeys[e]=t,this._memoryBlobs[e]=n,this._dirty=!0}delete(e){a.call(this._memoryBlobs,e)&&(this._dirty=!0,delete this._memoryBlobs[e]),a.call(this._invalidationKeys,e)&&(this._dirty=!0,delete this._invalidationKeys[e]),a.call(this._storedMap,e)&&(this._dirty=!0,delete this._storedMap[e])}isDirty(){return this._dirty}save(){const e=this._getDump(),t=Buffer.concat(e[0]),n=JSON.stringify(e[1]);try{f(this._directory),o.writeFileSync(this._lockFilename,"LOCK",{flag:"wx"})}catch(e){return!1}try{o.writeFileSync(this._blobFilename,t),o.writeFileSync(this._mapFilename,n)}catch(e){throw e}finally{o.unlinkSync(this._lockFilename)}return!0}_load(){try{this._storedBlob=o.readFileSync(this._blobFilename),this._storedMap=JSON.parse(o.readFileSync(this._mapFilename))}catch(e){this._storedBlob=Buffer.alloc(0),this._storedMap={}}this._dirty=!1,this._memoryBlobs={},this._invalidationKeys={}}_getDump(){const e=[],t={};let n=0;function r(r,o,i){e.push(i),t[r]=[o,n,n+i.length],n+=i.length}for(const e of Object.keys(this._memoryBlobs)){const t=this._memoryBlobs[e];r(e,this._invalidationKeys[e],t)}for(const e of Object.keys(this._storedMap)){if(a.call(t,e))continue;const n=this._storedMap[e],o=this._storedBlob.slice(n[1],n[2]);r(e,n[0],o)}return[e,t]}}class l{constructor(){this._cacheStore=null,this._previousModuleCompile=null}setCacheStore(e){this._cacheStore=e}install(){const e=this,r="function"==typeof n(10).resolve.paths;this._previousModuleCompile=t.prototype._compile,t.prototype._compile=function(n,o){const c=this;function s(e){return c.require(e)}function a(e,n){return t._resolveFilename(e,c,!1,n)}s.resolve=a,r&&(a.paths=function(e){return t._resolveLookupPaths(e,c,!0)}),s.main=process.mainModule,s.extensions=t._extensions,s.cache=t._cache;const u=i.dirname(o),l=e._moduleCompile(o,n),f=[c.exports,s,c,o,u,process,global,Buffer];return l.apply(c.exports,f)}}uninstall(){t.prototype._compile=this._previousModuleCompile}_moduleCompile(e,n){var o=n.length;if(o>=2&&35===n.charCodeAt(0)&&33/*!*/===n.charCodeAt(1))if(2===o)n="";else{for(var i=2;i<o;++i){var s=n.charCodeAt(i);if(10===s||13===s)break}n=i===o?"":n.slice(i)}var a=t.wrap(n),u=r.createHash("sha1").update(n,"utf8").digest("hex"),l=this._cacheStore.get(e,u),f=new c.Script(a,{filename:e,lineOffset:0,displayErrors:!0,cachedData:l,produceCachedData:!0});return f.cachedDataProduced?this._cacheStore.set(e,u,f.cachedData):f.cachedDataRejected&&this._cacheStore.delete(e),f.runInThisContext({filename:e,lineOffset:0,columnOffset:0,displayErrors:!0})}}function f(e){!function e(t,n){try{o.mkdirSync(t,n)}catch(n){if("ENOENT"===n.code)e(i.dirname(t)),e(t);else try{if(!o.statSync(t).isDirectory())throw n}catch(e){throw n}}}(i.resolve(e),parseInt("0777",8)&~process.umask())}function p(e){const t={"\\":"zB",":":"zC","/":"zS","\0":"z0",z:"zZ"};return e.replace(/[\\:\/\x00z]/g,e=>t[e])}function h(){return!0===new c.Script('""',{produceCachedData:!0}).cachedDataProduced}function d(){const e="function"==typeof process.getuid?"v8-compile-cache-"+process.getuid():"v8-compile-cache",t="string"==typeof process.versions.v8?process.versions.v8:"string"==typeof process.versions.chakracore?"chakracore-"+process.versions.chakracore:"node-"+process.version;return i.join(s.tmpdir(),e,t)}function y(){return e.parent&&"string"==typeof e.parent.filename?e.parent.filename:process.cwd()}if(!process.env.DISABLE_V8_COMPILE_CACHE&&h()){const e=new u(d(),y()),t=new l;t.setCacheStore(e),t.install(),process.once("exit",n=>{e.isDirty()&&e.save(),t.uninstall()})}e.exports.__TEST__={FileSystemBlobStore:u,NativeCompileCache:l,mkdirpSync:f,slashEscape:p,supportsCachedData:h,getCacheDir:d,getParentName:y}}).call(this,n(3)(e))},function(e,t){e.exports=require("module")},function(e,t){e.exports=require("crypto")},function(e,t){e.exports=require("vm")},function(e,t){e.exports=require("os")},function(e,t){function n(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}n.keys=function(){return[]},n.resolve=n,e.exports=n,n.id=10},function(e,t,n){"use strict";const r=n(1),o=n(0),i=n(12),c=n(21);e.exports=function(e){const t=o.app||o.remote.app,n=o.screen||o.remote.screen;let s,a,u;const l=Object.assign({file:"window-state.json",path:t.getPath("userData"),maximize:!0,fullScreen:!0},e),f=r.join(l.path,l.file);function p(){return s&&Number.isInteger(s.x)&&Number.isInteger(s.y)&&Number.isInteger(s.width)&&s.width>0&&Number.isInteger(s.height)&&s.height>0}function h(){const e=n.getPrimaryDisplay().bounds;s={width:l.defaultWidth||800,height:l.defaultHeight||600,x:0,y:0,displayBounds:e}}function d(){if(!n.getAllDisplays().some(e=>{return t=e.bounds,s.x>=t.x&&s.y>=t.y&&s.x+s.width<=t.x+t.width&&s.y+s.height<=t.y+t.height;var t}))return h()}function y(e){if(e=e||a)try{const t=e.getBounds();(function(e){return!e.isMaximized()&&!e.isMinimized()&&!e.isFullScreen()})(e)&&(s.x=t.x,s.y=t.y,s.width=t.width,s.height=t.height),s.isMaximized=e.isMaximized(),s.isFullScreen=e.isFullScreen(),s.displayBounds=n.getDisplayMatching(t).bounds}catch(e){}}function m(e){e&&y(e);try{c.sync(r.dirname(f)),i.writeFileSync(f,s)}catch(e){}}function v(){clearTimeout(u),u=setTimeout(y,100)}function g(){y()}function b(){_(),m()}function _(){a&&(a.removeListener("resize",v),a.removeListener("move",v),clearTimeout(u),a.removeListener("close",g),a.removeListener("closed",b),a=null)}try{s=i.readFileSync(f)}catch(e){}return s&&(p()||s.isMaximized||s.isFullScreen)?p()&&s.displayBounds&&d():s=null,s=Object.assign({width:l.defaultWidth||800,height:l.defaultHeight||600},s),{get x(){return s.x},get y(){return s.y},get width(){return s.width},get height(){return s.height},get displayBounds(){return s.displayBounds},get isMaximized(){return s.isMaximized},get isFullScreen(){return s.isFullScreen},saveState:m,unmanage:_,manage:function(e){l.maximize&&s.isMaximized&&e.maximize(),l.fullScreen&&s.isFullScreen&&e.setFullScreen(!0),e.on("resize",v),e.on("move",v),e.on("close",g),e.on("closed",b),a=e},resetStateToDefault:h}}},function(e,t,n){var r;try{r=n(13)}catch(e){r=n(2)}function o(e,t){var n,r="\n";return"object"==typeof t&&null!==t&&(t.spaces&&(n=t.spaces),t.EOL&&(r=t.EOL)),JSON.stringify(e,t?t.replacer:null,n).replace(/\n/g,r)+r}function i(e){return Buffer.isBuffer(e)&&(e=e.toString("utf8")),e=e.replace(/^\uFEFF/,"")}var c={readFile:function(e,t,n){null==n&&(n=t,t={}),"string"==typeof t&&(t={encoding:t});var o=(t=t||{}).fs||r,c=!0;"throws"in t&&(c=t.throws),o.readFile(e,t,(function(r,o){if(r)return n(r);var s;o=i(o);try{s=JSON.parse(o,t?t.reviver:null)}catch(t){return c?(t.message=e+": "+t.message,n(t)):n(null,null)}n(null,s)}))},readFileSync:function(e,t){"string"==typeof(t=t||{})&&(t={encoding:t});var n=t.fs||r,o=!0;"throws"in t&&(o=t.throws);try{var c=n.readFileSync(e,t);return c=i(c),JSON.parse(c,t.reviver)}catch(t){if(o)throw t.message=e+": "+t.message,t;return null}},writeFile:function(e,t,n,i){null==i&&(i=n,n={});var c=(n=n||{}).fs||r,s="";try{s=o(t,n)}catch(e){return void(i&&i(e,null))}c.writeFile(e,s,n,i)},writeFileSync:function(e,t,n){var i=(n=n||{}).fs||r,c=o(t,n);return i.writeFileSync(e,c,n)}};e.exports=c},function(e,t,n){var r,o,i=n(2),c=n(14),s=n(16),a=n(18),u=n(19);"function"==typeof Symbol&&"function"==typeof Symbol.for?(r=Symbol.for("graceful-fs.queue"),o=Symbol.for("graceful-fs.previous")):(r="___graceful-fs.queue",o="___graceful-fs.previous");var l=function(){};if(u.debuglog?l=u.debuglog("gfs4"):/\bgfs4\b/i.test(process.env.NODE_DEBUG||"")&&(l=function(){var e=u.format.apply(u,arguments);e="GFS4: "+e.split(/\n/).join("\nGFS4: "),console.error(e)}),!global[r]){var f=[];Object.defineProperty(global,r,{get:function(){return f}}),i.close=function(e){function t(t,n){return e.call(i,t,(function(e){e||d(),"function"==typeof n&&n.apply(this,arguments)}))}return Object.defineProperty(t,o,{value:e}),t}(i.close),i.closeSync=function(e){function t(t){e.apply(i,arguments),d()}return Object.defineProperty(t,o,{value:e}),t}(i.closeSync),/\bgfs4\b/i.test(process.env.NODE_DEBUG||"")&&process.on("exit",(function(){l(global[r]),n(20).equal(global[r].length,0)}))}function p(e){c(e),e.gracefulify=p,e.createReadStream=function(t,n){return new e.ReadStream(t,n)},e.createWriteStream=function(t,n){return new e.WriteStream(t,n)};var t=e.readFile;e.readFile=function(e,n,r){"function"==typeof n&&(r=n,n=null);return function e(n,r,o){return t(n,r,(function(t){!t||"EMFILE"!==t.code&&"ENFILE"!==t.code?("function"==typeof o&&o.apply(this,arguments),d()):h([e,[n,r,o]])}))}(e,n,r)};var n=e.writeFile;e.writeFile=function(e,t,r,o){"function"==typeof r&&(o=r,r=null);return function e(t,r,o,i){return n(t,r,o,(function(n){!n||"EMFILE"!==n.code&&"ENFILE"!==n.code?("function"==typeof i&&i.apply(this,arguments),d()):h([e,[t,r,o,i]])}))}(e,t,r,o)};var r=e.appendFile;r&&(e.appendFile=function(e,t,n,o){"function"==typeof n&&(o=n,n=null);return function e(t,n,o,i){return r(t,n,o,(function(r){!r||"EMFILE"!==r.code&&"ENFILE"!==r.code?("function"==typeof i&&i.apply(this,arguments),d()):h([e,[t,n,o,i]])}))}(e,t,n,o)});var o=e.readdir;function i(t){return o.apply(e,t)}if(e.readdir=function(e,t,n){var r=[e];"function"!=typeof t?r.push(t):n=t;return r.push((function(e,t){t&&t.sort&&t.sort();!e||"EMFILE"!==e.code&&"ENFILE"!==e.code?("function"==typeof n&&n.apply(this,arguments),d()):h([i,[r]])})),i(r)},"v0.8"===process.version.substr(0,4)){var a=s(e);m=a.ReadStream,v=a.WriteStream}var u=e.ReadStream;u&&(m.prototype=Object.create(u.prototype),m.prototype.open=function(){var e=this;b(e.path,e.flags,e.mode,(function(t,n){t?(e.autoClose&&e.destroy(),e.emit("error",t)):(e.fd=n,e.emit("open",n),e.read())}))});var l=e.WriteStream;l&&(v.prototype=Object.create(l.prototype),v.prototype.open=function(){var e=this;b(e.path,e.flags,e.mode,(function(t,n){t?(e.destroy(),e.emit("error",t)):(e.fd=n,e.emit("open",n))}))}),Object.defineProperty(e,"ReadStream",{get:function(){return m},set:function(e){m=e},enumerable:!0,configurable:!0}),Object.defineProperty(e,"WriteStream",{get:function(){return v},set:function(e){v=e},enumerable:!0,configurable:!0});var f=m;Object.defineProperty(e,"FileReadStream",{get:function(){return f},set:function(e){f=e},enumerable:!0,configurable:!0});var y=v;function m(e,t){return this instanceof m?(u.apply(this,arguments),this):m.apply(Object.create(m.prototype),arguments)}function v(e,t){return this instanceof v?(l.apply(this,arguments),this):v.apply(Object.create(v.prototype),arguments)}Object.defineProperty(e,"FileWriteStream",{get:function(){return y},set:function(e){y=e},enumerable:!0,configurable:!0});var g=e.open;function b(e,t,n,r){return"function"==typeof n&&(r=n,n=null),function e(t,n,r,o){return g(t,n,r,(function(i,c){!i||"EMFILE"!==i.code&&"ENFILE"!==i.code?("function"==typeof o&&o.apply(this,arguments),d()):h([e,[t,n,r,o]])}))}(e,t,n,r)}return e.open=b,e}function h(e){l("ENQUEUE",e[0].name,e[1]),global[r].push(e)}function d(){var e=global[r].shift();e&&(l("RETRY",e[0].name,e[1]),e[0].apply(null,e[1]))}e.exports=p(a(i)),process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH&&!i.__patched&&(e.exports=p(i),i.__patched=!0)},function(e,t,n){var r=n(15),o=process.cwd,i=null,c=process.env.GRACEFUL_FS_PLATFORM||process.platform;process.cwd=function(){return i||(i=o.call(process)),i};try{process.cwd()}catch(e){}var s=process.chdir;process.chdir=function(e){i=null,s.call(process,e)},e.exports=function(e){r.hasOwnProperty("O_SYMLINK")&&process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)&&function(e){e.lchmod=function(t,n,o){e.open(t,r.O_WRONLY|r.O_SYMLINK,n,(function(t,r){t?o&&o(t):e.fchmod(r,n,(function(t){e.close(r,(function(e){o&&o(t||e)}))}))}))},e.lchmodSync=function(t,n){var o,i=e.openSync(t,r.O_WRONLY|r.O_SYMLINK,n),c=!0;try{o=e.fchmodSync(i,n),c=!1}finally{if(c)try{e.closeSync(i)}catch(e){}else e.closeSync(i)}return o}}(e);e.lutimes||function(e){r.hasOwnProperty("O_SYMLINK")?(e.lutimes=function(t,n,o,i){e.open(t,r.O_SYMLINK,(function(t,r){t?i&&i(t):e.futimes(r,n,o,(function(t){e.close(r,(function(e){i&&i(t||e)}))}))}))},e.lutimesSync=function(t,n,o){var i,c=e.openSync(t,r.O_SYMLINK),s=!0;try{i=e.futimesSync(c,n,o),s=!1}finally{if(s)try{e.closeSync(c)}catch(e){}else e.closeSync(c)}return i}):(e.lutimes=function(e,t,n,r){r&&process.nextTick(r)},e.lutimesSync=function(){})}(e);e.chown=i(e.chown),e.fchown=i(e.fchown),e.lchown=i(e.lchown),e.chmod=n(e.chmod),e.fchmod=n(e.fchmod),e.lchmod=n(e.lchmod),e.chownSync=s(e.chownSync),e.fchownSync=s(e.fchownSync),e.lchownSync=s(e.lchownSync),e.chmodSync=o(e.chmodSync),e.fchmodSync=o(e.fchmodSync),e.lchmodSync=o(e.lchmodSync),e.stat=a(e.stat),e.fstat=a(e.fstat),e.lstat=a(e.lstat),e.statSync=u(e.statSync),e.fstatSync=u(e.fstatSync),e.lstatSync=u(e.lstatSync),e.lchmod||(e.lchmod=function(e,t,n){n&&process.nextTick(n)},e.lchmodSync=function(){});e.lchown||(e.lchown=function(e,t,n,r){r&&process.nextTick(r)},e.lchownSync=function(){});"win32"===c&&(e.rename=(t=e.rename,function(n,r,o){var i=Date.now(),c=0;t(n,r,(function s(a){if(a&&("EACCES"===a.code||"EPERM"===a.code)&&Date.now()-i<6e4)return setTimeout((function(){e.stat(r,(function(e,i){e&&"ENOENT"===e.code?t(n,r,s):o(a)}))}),c),void(c<100&&(c+=10));o&&o(a)}))}));var t;function n(t){return t?function(n,r,o){return t.call(e,n,r,(function(e){l(e)&&(e=null),o&&o.apply(this,arguments)}))}:t}function o(t){return t?function(n,r){try{return t.call(e,n,r)}catch(e){if(!l(e))throw e}}:t}function i(t){return t?function(n,r,o,i){return t.call(e,n,r,o,(function(e){l(e)&&(e=null),i&&i.apply(this,arguments)}))}:t}function s(t){return t?function(n,r,o){try{return t.call(e,n,r,o)}catch(e){if(!l(e))throw e}}:t}function a(t){return t?function(n,r,o){function i(e,t){t&&(t.uid<0&&(t.uid+=4294967296),t.gid<0&&(t.gid+=4294967296)),o&&o.apply(this,arguments)}return"function"==typeof r&&(o=r,r=null),r?t.call(e,n,r,i):t.call(e,n,i)}:t}function u(t){return t?function(n,r){var o=r?t.call(e,n,r):t.call(e,n);return o.uid<0&&(o.uid+=4294967296),o.gid<0&&(o.gid+=4294967296),o}:t}function l(e){return!e||("ENOSYS"===e.code||!(process.getuid&&0===process.getuid()||"EINVAL"!==e.code&&"EPERM"!==e.code))}e.read=function(t){function n(n,r,o,i,c,s){var a;if(s&&"function"==typeof s){var u=0;a=function(l,f,p){if(l&&"EAGAIN"===l.code&&u<10)return u++,t.call(e,n,r,o,i,c,a);s.apply(this,arguments)}}return t.call(e,n,r,o,i,c,a)}return n.__proto__=t,n}(e.read),e.readSync=(f=e.readSync,function(t,n,r,o,i){for(var c=0;;)try{return f.call(e,t,n,r,o,i)}catch(e){if("EAGAIN"===e.code&&c<10){c++;continue}throw e}});var f}},function(e,t){e.exports=require("constants")},function(e,t,n){var r=n(17).Stream;e.exports=function(e){return{ReadStream:function t(n,o){if(!(this instanceof t))return new t(n,o);r.call(this);var i=this;this.path=n,this.fd=null,this.readable=!0,this.paused=!1,this.flags="r",this.mode=438,this.bufferSize=65536,o=o||{};for(var c=Object.keys(o),s=0,a=c.length;s<a;s++){var u=c[s];this[u]=o[u]}this.encoding&&this.setEncoding(this.encoding);if(void 0!==this.start){if("number"!=typeof this.start)throw TypeError("start must be a Number");if(void 0===this.end)this.end=1/0;else if("number"!=typeof this.end)throw TypeError("end must be a Number");if(this.start>this.end)throw new Error("start must be <= end");this.pos=this.start}if(null!==this.fd)return void process.nextTick((function(){i._read()}));e.open(this.path,this.flags,this.mode,(function(e,t){if(e)return i.emit("error",e),void(i.readable=!1);i.fd=t,i.emit("open",t),i._read()}))},WriteStream:function t(n,o){if(!(this instanceof t))return new t(n,o);r.call(this),this.path=n,this.fd=null,this.writable=!0,this.flags="w",this.encoding="binary",this.mode=438,this.bytesWritten=0,o=o||{};for(var i=Object.keys(o),c=0,s=i.length;c<s;c++){var a=i[c];this[a]=o[a]}if(void 0!==this.start){if("number"!=typeof this.start)throw TypeError("start must be a Number");if(this.start<0)throw new Error("start must be >= zero");this.pos=this.start}this.busy=!1,this._queue=[],null===this.fd&&(this._open=e.open,this._queue.push([this._open,this.path,this.flags,this.mode,void 0]),this.flush())}}}},function(e,t){e.exports=require("stream")},function(e,t,n){"use strict";e.exports=function(e){if(null===e||"object"!=typeof e)return e;if(e instanceof Object)var t={__proto__:e.__proto__};else t=Object.create(null);return Object.getOwnPropertyNames(e).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(e,n))})),t}},function(e,t){e.exports=require("util")},function(e,t){e.exports=require("assert")},function(e,t,n){var r=n(1),o=n(2),i=parseInt("0777",8);function c(e,t,n,s){"function"==typeof t?(n=t,t={}):t&&"object"==typeof t||(t={mode:t});var a=t.mode,u=t.fs||o;void 0===a&&(a=i&~process.umask()),s||(s=null);var l=n||function(){};e=r.resolve(e),u.mkdir(e,a,(function(n){if(!n)return l(null,s=s||e);switch(n.code){case"ENOENT":if(r.dirname(e)===e)return l(n);c(r.dirname(e),t,(function(n,r){n?l(n,r):c(e,t,l,r)}));break;default:u.stat(e,(function(e,t){e||!t.isDirectory()?l(n,s):l(null,s)}))}}))}e.exports=c.mkdirp=c.mkdirP=c,c.sync=function e(t,n,c){n&&"object"==typeof n||(n={mode:n});var s=n.mode,a=n.fs||o;void 0===s&&(s=i&~process.umask()),c||(c=null),t=r.resolve(t);try{a.mkdirSync(t,s),c=c||t}catch(o){switch(o.code){case"ENOENT":c=e(r.dirname(t),n,c),e(t,n,c);break;default:var u;try{u=a.statSync(t)}catch(e){throw o}if(!u.isDirectory())throw o}}return c}},function(e,t,n){(function(e){const{app:t}=n(0),r=n(23),o=n(2),{spawn:i}=n(24),c=t.getAppPath(),s=/node_modules|[/\\]\./,a=e.parent.filename;e.exports=(e,n={})=>{const u=[],l=r.watch(e,Object.assign({ignored:[s,a]},n)),f=n.electron,p=((e,n,r)=>()=>{const o=(r||[]).concat([c]);i(e,o,{detached:!0,stdio:"inherit"}).unref(),"exit"===n?t.exit():t.quit()})(f,n.hardResetMethod,n.argv);if(t.on("browser-window-created",(e,t)=>{u.push(t),t.on("closed",(function(){const e=u.indexOf(t);u.splice(e,1)}))}),l.on("change",()=>u.forEach(e=>e.webContents.reloadIgnoringCache())),f&&o.existsSync(f)){const t=r.watch(a,Object.assign({ignored:[s]},n));!0===n.forceHardReset&&(t.add(e),l.close()),t.once("change",p)}else console.log("Electron could not be found. No hard resets for you!")}}).call(this,n(3)(e))},function(e,t){e.exports=require("chokidar")},function(e,t){e.exports=require("child_process")},function(e,t){function n(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}n.keys=function(){return[]},n.resolve=n,e.exports=n,n.id=25},function(e,t,n){"use strict";n.r(t);n(5);var r=n(0),o=n(1),i=n(4),c=function(e,t){void 0===t&&(t=[]),this.label=e,this.path=t.slice(),this.path.push(e)};var s=function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function c(e){try{a(r.next(e))}catch(e){i(e)}}function s(e){try{a(r.throw(e))}catch(e){i(e)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(c,s)}a((r=r.apply(e,t||[])).next())}))},a=function(e,t){var n,r,o,i,c={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;c;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return c.label++,{value:i[1],done:!1};case 5:c.label++,r=i[1],i=[0];continue;case 7:i=c.ops.pop(),c.trys.pop();continue;default:if(!(o=(o=c.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){c=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){c.label=i[1];break}if(6===i[0]&&c.label<o[1]){c.label=o[1],o=i;break}if(o&&c.label<o[2]){c.label=o[2],c.ops.push(i);break}o[2]&&c.ops.pop(),c.trys.pop();continue}i=t.call(e,c)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}},u=function(){function e(e,t,n,r){this._ipcMain=e,this._serve=t,this._win=n,this._app=r,this._pendingContextMenu=null}return e.prototype.turnOn=function(){var e=this;this._ipcMain.handle("shell.moveItemToTrash",(function(e,t,n){return r.shell.moveItemToTrash(t,n)})),this._ipcMain.handle("app.prepend-window-title",(function(t,n){return e._win.setTitle(n?n+" - Starling Desktop":"Starling Desktop")})),this._ipcMain.handle("app.close",(function(){e._win.hide(),e._app.quit()})),this._ipcMain.handle("app.get-file-icon",(function(t,n){return s(e,void 0,void 0,(function(){return a(this,(function(e){switch(e.label){case 0:return[4,this._app.getFileIcon(n)];case 1:return[2,e.sent().toPNG()]}}))}))})),this._ipcMain.handle("app.context-menu",(function(t,n,o,i){return e._pendingContextMenu&&e._pendingContextMenu(),new Promise((function(t){e._pendingContextMenu=function(){return t(null)},function(e,t){!function e(n,r){n.forEach((function(n){var o=new c(n.label,r);if("submenu"===n.type)return e(n.submenu,o.path);n.click=function(e){return t(o.path)}}))}(e,[])}(i,(function(r){var i;return e._pendingContextMenu=null,(null===(i=r)||void 0===i?void 0:i.length)?"Inspect element"===r[r.length-1]?(e._win.webContents.inspectElement(n,o),t(null)):void t(r.join("/")):t(null)})),r.Menu.buildFromTemplate(i).popup({x:n,y:o})}))})),this._ipcMain.handle("app.message-box",(function(e,t){return r.dialog.showMessageBox(t)})),this._ipcMain.handle("app.save-dialog",(function(e,t){return r.dialog.showSaveDialog(t)}))},e.prototype.turnOff=function(){return s(this,void 0,void 0,(function(){return a(this,(function(e){return this._ipcMain.removeHandler("app.prepend-window-title"),[2]}))}))},e}(),l=function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function c(e){try{a(r.next(e))}catch(e){i(e)}}function s(e){try{a(r.throw(e))}catch(e){i(e)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(c,s)}a((r=r.apply(e,t||[])).next())}))},f=function(e,t){var n,r,o,i,c={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(i){return function(s){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;c;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return c.label++,{value:i[1],done:!1};case 5:c.label++,r=i[1],i=[0];continue;case 7:i=c.ops.pop(),c.trys.pop();continue;default:if(!(o=(o=c.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){c=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){c.label=i[1];break}if(6===i[0]&&c.label<o[1]){c.label=o[1],o=i;break}if(o&&c.label<o[2]){c.label=o[2],c.ops.push(i);break}o[2]&&c.ops.pop(),c.trys.pop();continue}i=t.call(e,c)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,s])}}},p=function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,i=n.call(e),c=[];try{for(;(void 0===t||t-- >0)&&!(r=i.next()).done;)c.push(r.value)}catch(e){o={error:e}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return c},h=function(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(p(arguments[t]));return e},d=n(11),y=null,m=null,v=process.argv.slice(1),g=v.some((function(e){return"--serve"===e})),b=v.some((function(e){return"--reset"===e}));function _(){var e=d({defaultWidth:1480,defaultHeight:790,path:g?o.resolve(r.app.getAppPath(),"..",".tmpData"):r.app.getPath("userData")}),t=b?["--reset-state"]:[];t.push.apply(t,h(["home","desktop","documents","downloads","music","pictures","videos","userData","temp"].map((function(e){return"/"+e+"="+r.app.getPath(e)})))),y=new r.BrowserWindow({x:e.x,y:e.y,width:e.width,height:e.height,webPreferences:{nodeIntegration:!0,nodeIntegrationInWorker:!0,allowRunningInsecureContent:g,defaultFontFamily:{standard:"Arial"},defaultFontSize:10,devTools:g,additionalArguments:t},backgroundColor:"#f9f9f9",title:"Starling Desktop",show:!g,icon:o.join(__dirname,"/icon/Icon-512x512.png")}),m||(m=new u(r.ipcMain,g,y,r.app)).turnOn(),e.manage(y),g?(n(22)(__dirname,{electron:n(25)(__dirname+"/node_modules/electron")}),y.loadURL("http://localhost:4200")):y.loadURL(i.format({pathname:o.join(__dirname,"dist/index.html"),protocol:"file:",slashes:!0})),y.on("closed",(function(){y=null})).once("ready-to-show",(function(){y.show(),y.focus(),g&&y.webContents.openDevTools()}))}try{var w=!1,S=!1,x=!1;r.app.requestSingleInstanceLock()?r.app.on("second-instance",(function(e,t,n){S?x||(r.app.relaunch(),x=!0):y&&(y.isMinimized()&&y.restore(),y.focus())})):r.app.quit(),r.app.on("ready",_),r.app.on("window-all-closed",(function(){"darwin"!==process.platform&&r.app.quit()})),r.app.on("activate",(function(){null===y&&_()})),r.app.on("before-quit",(function(e){return l(void 0,void 0,void 0,(function(){return f(this,(function(t){switch(t.label){case 0:return w?[3,3]:(e.preventDefault(),S=!0,y=null,m?[4,m.turnOff()]:[3,2]);case 1:t.sent(),t.label=2;case 2:return m=null,w=!0,r.app.quit(),[3,4];case 3:console.log("Bye.."),r.app.exit(0),t.label=4;case 4:return[2]}}))}))}))}catch(e){}}]);