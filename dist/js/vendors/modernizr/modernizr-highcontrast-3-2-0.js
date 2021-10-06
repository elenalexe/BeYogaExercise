
/*! modernizr 3.2.0 (Custom Build) | MIT *
 * http://modernizr.com/download/?-addtest !*/
 !function(n,e,o){function t(n,e){return typeof n===e}function s(){var n,e,o,s,i,a,l;for(var u in f)if(f.hasOwnProperty(u)){if(n=[],e=f[u],e.name&&(n.push(e.name.toLowerCase()),e.options&&e.options.aliases&&e.options.aliases.length))for(o=0;o<e.options.aliases.length;o++)n.push(e.options.aliases[o].toLowerCase());for(s=t(e.fn,"function")?e.fn():e.fn,i=0;i<n.length;i++)a=n[i],l=a.split("."),1===l.length?Modernizr[l[0]]=s:(!Modernizr[l[0]]||Modernizr[l[0]]instanceof Boolean||(Modernizr[l[0]]=new Boolean(Modernizr[l[0]])),Modernizr[l[0]][l[1]]=s),r.push((s?"":"no-")+l.join("-"))}}function i(n){var e=c.className,o=Modernizr._config.classPrefix||"";if(d&&(e=e.baseVal),Modernizr._config.enableJSClass){var t=new RegExp("(^|\\s)"+o+"no-js(\\s|$)");e=e.replace(t,"$1"+o+"js$2")}Modernizr._config.enableClasses&&(e+=" "+o+n.join(" "+o),d?c.className.baseVal=e:c.className=e)}function a(n,e){if("object"==typeof n)for(var o in n)u(n,o)&&a(o,n[o]);else{n=n.toLowerCase();var t=n.split("."),s=Modernizr[t[0]];if(2==t.length&&(s=s[t[1]]),"undefined"!=typeof s)return Modernizr;e="function"==typeof e?e():e,1==t.length?Modernizr[t[0]]=e:(!Modernizr[t[0]]||Modernizr[t[0]]instanceof Boolean||(Modernizr[t[0]]=new Boolean(Modernizr[t[0]])),Modernizr[t[0]][t[1]]=e),i([(e&&0!=e?"":"no-")+t.join("-")]),Modernizr._trigger(n,e)}return Modernizr}var r=[],f=[],l={_version:"3.2.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(n,e){var o=this;setTimeout(function(){e(o[n])},0)},addTest:function(n,e,o){f.push({name:n,fn:e,options:o})},addAsyncTest:function(n){f.push({name:null,fn:n})}},Modernizr=function(){};Modernizr.prototype=l,Modernizr=new Modernizr;var u,c=e.documentElement,d="svg"===c.nodeName.toLowerCase();!function(){var n={}.hasOwnProperty;u=t(n,"undefined")||t(n.call,"undefined")?function(n,e){return e in n&&t(n.constructor.prototype[e],"undefined")}:function(e,o){return n.call(e,o)}}(),l._l={},l.on=function(n,e){this._l[n]||(this._l[n]=[]),this._l[n].push(e),Modernizr.hasOwnProperty(n)&&setTimeout(function(){Modernizr._trigger(n,Modernizr[n])},0)},l._trigger=function(n,e){if(this._l[n]){var o=this._l[n];setTimeout(function(){var n,t;for(n=0;n<o.length;n++)(t=o[n])(e)},0),delete this._l[n]}},Modernizr._q.push(function(){l.addTest=a}),s(),i(r),delete l.addTest,delete l.addAsyncTest;for(var p=0;p<Modernizr._q.length;p++)Modernizr._q[p]();n.Modernizr=Modernizr}(window,document);

 // Modernizr addTest for high contrast mode
 // https://modernizr.com/docs#modernizr-addtest
 // Based on Karl Groves & Hans Hillen test
 // http://jsfiddle.net/karlgroves/XR8Su/6/
 // Determines if document is in High Contrast Mode or not,
 // and if user customized colors in his browsers
 // GaÃ«l Poupard â€” ffoodd.fr
 Modernizr.addTest("highcontrast", function() {
   var objA = document.createElement("a"),
       strColor;
   objA.style.color = "rgb(31, 41, 59)";
   document.documentElement.appendChild(objA);
   strColor = document.defaultView ? document.defaultView.getComputedStyle(objA, null).color : objA.currentStyle.color;
   strColor = strColor.replace(/ /g, "");
   document.documentElement.removeChild(objA);
   return strColor !== "rgb(31,41,59)";
 });