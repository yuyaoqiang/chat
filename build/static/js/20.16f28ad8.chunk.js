(this["webpackJsonpadvisory-h5"]=this["webpackJsonpadvisory-h5"]||[]).push([[20],{177:function(e,t,c){},178:function(e,t,c){"use strict";var n=c(6),s=c(0),a=c(5),i=c(174),r=function(){var e=Object(s.useState)("http://ayx.ltd/kefu/5fe0753addc8c"),t=Object(i.a)(e,1)[0];return{onService:function(){var e=document.createElement("a");e.setAttribute("href",t),e.setAttribute("target","_blank"),e.setAttribute("id","online"),document.getElementById("online")||document.body.appendChild(e),e.click()},onlineService:t}};c(177),t.a=function(e){var t=Object(a.g)(),c=(r().onService,e.goback),s=e.title,i=e.rightTitle,l=e.cb;return Object(n.jsx)("header",{className:"header-wrap",children:Object(n.jsxs)("ul",{className:"container",children:[Object(n.jsx)("li",{className:"goback",onClick:function(){"function"===typeof c?c():t.replace(c)}}),Object(n.jsx)("li",{className:"title",children:s}),Object(n.jsx)("li",{className:"title small-title",onClick:function(){l&&l()},children:i})]})})}},241:function(e,t,c){},252:function(e,t,c){"use strict";c.r(t);var n,s=c(6),a=(c(235),c(237)),i=c.n(a),r=(c(41),c(20)),l=c.n(r),o=c(174),j=c(0),b=c(178),u=c(5),d=c(91),O=c(19);c(241);!function(e){e.WAIT_FOR_APPROVE="\u5ba1\u6279\u4e2d",e.ENABLE="\u542f\u7528",e.DISABLE="\u7981\u7528"}(n||(n={}));t.default=Object(O.b)("banksState")(Object(O.c)((function(e){var t=Object(u.g)(),c=t.goBack,n=t.push,a=e.banksState.mapBanks,r=Object(j.useState)(null),O=Object(o.a)(r,2),h=O[0],p=O[1];Object(j.useEffect)((function(){f()}),[]);var f=function(){l.a.loading("\u52a0\u8f7d\u4e2d..."),Object(d.c)().then((function(e){p(e),l.a.hide()}))};return Object(s.jsxs)("div",{className:"banks-wrap",children:[Object(s.jsx)(b.a,{goback:c,title:"\u94f6\u884c\u5361"}),Object(s.jsx)("ul",{className:"banks-container",children:h&&h.map((function(e,t){return Object(s.jsxs)("li",{className:"banks-item",children:[Object(s.jsx)("span",{className:"bank-icon"}),Object(s.jsxs)("div",{className:"back-right-wrap",children:["WAIT_FOR_APPROVE"===e.status&&Object(s.jsx)("p",{className:"review-icon"}),"ENABLE"===e.status&&Object(s.jsx)("p",{className:"open-status",children:"\u6b63\u5e38"}),"DISABLE"===e.status&&Object(s.jsx)("p",{className:"close-status",children:"\u62d2\u7edd"}),Object(s.jsxs)("p",{className:"right-top",children:[Object(s.jsx)("span",{children:a[e.bank]}),"WAIT_FOR_APPROVE"!==e.status&&Object(s.jsx)("span",{onClick:function(){return function(e){var t=e.id;i.a.alert("\u63d0\u793a","\u786e\u5b9a\u5220\u9664\u94f6\u884c\u5361?",[{text:"\u53d6\u6d88",onPress:function(){return console.log("cancel")}},{text:"\u786e\u5b9a",onPress:function(){l.a.loading("\u52a0\u8f7d\u4e2d..."),Object(d.b)({cardId:t}).then((function(e){f(),l.a.hide()}))}}])}(e)},children:"\u5220\u9664"})]}),Object(s.jsx)("p",{className:"right-min",children:e.cardNo}),Object(s.jsxs)("p",{className:"right-bottom",children:[Object(s.jsxs)("span",{children:["\u6301\u5361\u4eba:",e.owner]}),Object(s.jsxs)("span",{children:[e.province," ",e.city]})]})]})]},t)}))}),Object(s.jsxs)("div",{className:"add-wrap",onClick:function(){return n("addBank")},children:[Object(s.jsx)("span",{className:"add-icon"}),Object(s.jsx)("span",{children:"\u6dfb\u52a0\u94f6\u884c\u5361"})]})]})})))}}]);