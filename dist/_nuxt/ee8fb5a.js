(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{209:function(t,e,n){"use strict";var r=n(5),o=n(31),c=n(32),l=n(142),f=n(73),m=n(13),d=n(56).f,h=n(57).f,v=n(16).f,N=n(210).trim,I="Number",x=r.Number,y=x,_=x.prototype,E=c(n(93)(_))==I,S="trim"in String.prototype,w=function(t){var e=f(t,!1);if("string"==typeof e&&e.length>2){var n,r,o,c=(e=S?e.trim():N(e,3)).charCodeAt(0);if(43===c||45===c){if(88===(n=e.charCodeAt(2))||120===n)return NaN}else if(48===c){switch(e.charCodeAt(1)){case 66:case 98:r=2,o=49;break;case 79:case 111:r=8,o=55;break;default:return+e}for(var code,l=e.slice(2),i=0,m=l.length;i<m;i++)if((code=l.charCodeAt(i))<48||code>o)return NaN;return parseInt(l,r)}}return+e};if(!x(" 0o1")||!x("0b1")||x("+0x1")){x=function(t){var e=arguments.length<1?0:t,n=this;return n instanceof x&&(E?m((function(){_.valueOf.call(n)})):c(n)!=I)?l(new y(w(e)),n,x):w(e)};for(var A,P=n(9)?d(y):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),T=0;P.length>T;T++)o(y,A=P[T])&&!o(x,A)&&v(x,A,h(y,A));x.prototype=_,_.constructor=x,n(18)(r,I,x)}},210:function(t,e,n){var r=n(4),o=n(40),c=n(13),l=n(211),f="["+l+"]",m=RegExp("^"+f+f+"*"),d=RegExp(f+f+"*$"),h=function(t,e,n){var o={},f=c((function(){return!!l[t]()||"​"!="​"[t]()})),m=o[t]=f?e(v):l[t];n&&(o[n]=m),r(r.P+r.F*f,"String",o)},v=h.trim=function(t,e){return t=String(o(t)),1&e&&(t=t.replace(m,"")),2&e&&(t=t.replace(d,"")),t};t.exports=h},211:function(t,e){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"},214:function(t,e,n){"use strict";n.r(e);var r=n(14),o=(n(209),Object(r.a)({props:{min:{type:Number,default:0},max:{type:Number,default:100},step:{type:Number},title:{type:String,default:""},type:{type:String,default:""},format:{type:Function,default:function(t){return t}},value:{type:Number}},data:function(){return{pass:2}},watch:{value:function(t){this.selectedValue=t},getPass:function(t){t&&(this.pass=2,this.$store.commit("options/updatePass",!1))},selectedValue:function(t){this.$emit("input",parseInt(t)),0===this.pass&&this.$store.commit("options/updateUserInteraction",{userInteraction:!0}),this.pass--}},computed:{getPass:function(){return this.$store.getters["options/getPass"]},computedStep:function(){return this.step||(this.max-this.min)/100},computedTitle:function(){return this.title+": "+this.format(this.value)+this.type}}},"data",(function(){return{selectedValue:this.value}}))),c=n(8),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"flex flex-col"},[n("div",{staticClass:"text-xs font-montserrat font-bold mb-2 md:mb-0",domProps:{innerHTML:t._s(t.computedTitle)}}),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.selectedValue,expression:"selectedValue"}],staticClass:"slider",attrs:{type:"range",step:t.computedStep,min:t.min,max:t.max},domProps:{value:t.selectedValue},on:{__r:function(e){t.selectedValue=e.target.value}}}),t._v(" "),n("div",{staticClass:"flex justify-between text-[10px] font-montserrat text-dark-grey"},[n("span",{domProps:{innerHTML:t._s(t.format(t.min)+t.type)}}),t._v(" "),n("span",{domProps:{innerHTML:t._s(t.format(t.max)+t.type)}})])])}),[],!1,null,null,null);e.default=component.exports}}]);