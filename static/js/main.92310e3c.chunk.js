(this.webpackJsonptest=this.webpackJsonptest||[]).push([[0],{76:function(e,t,a){e.exports=a(77)},77:function(e,t,a){"use strict";a.r(t);var n=a(3),c=a(0),r=a.n(c),o=a(45),l=a(1),i=(a(82),function(){var e=Object(c.useState)([]),t=Object(n.a)(e,2),a=t[0],o=t[1];return Object(c.useEffect)((function(){window.fetch("./data/plot_test_data_25.json").then((function(e){return e.json()})).then((function(e){l.e(e).force("collide",l.c().radius((function(e){return Math.pow(e.count,.7)+8})).strength(.01).iterations(30)).force("charge",l.d().strength(1)).force("center",l.b()).on("end",(function(){o(e)}))}))}),[]),0===a.length?r.a.createElement("div",null,"loading"):r.a.createElement("div",null,r.a.createElement("div",{className:"hero is-info is-bold"},r.a.createElement("div",{className:"hero-body"},r.a.createElement("div",{className:"container"},r.a.createElement("h1",{className:"title"},"\u60c5\u5831\u79d1\u5b66\u7814\u7a76 \u56fd\u5bb6\u8ca1\u653f\u30c1\u30fc\u30e0"),r.a.createElement("h2",{className:"subtitle"},"\u30a2\u30a4\u30a6\u30a8\u30aa")))),r.a.createElement("div",{className:"App"},r.a.createElement(s,{data:a})),r.a.createElement("footer",{class:"footer"},r.a.createElement("div",{class:"content has-text-centered"},r.a.createElement("p",null,"\xa9 2020 \u4e0a\u91ce\u745e\u8cb4 \u91ce\u6751\u7406\u6c99"))))}),s=function(e){var t=e.data,a=Object(c.useState)(""),o=Object(n.a)(a,2),i=o[0],s=o[1],m=Object(c.useState)(""),d=Object(n.a)(m,2),f=d[0],h=d[1],E=150,g=30,b=460+E+150,p=460+g+10,v=l.j(l.k),j=function(e){return Math.pow(e.count,.7)},w=l.i().domain([l.h(t,(function(e){return e.x})),l.g(t,(function(e){return e.x}))]).range([0,460]).nice(),x=l.i().domain([l.g(t,(function(e){return e.y})),l.h(t,(function(e){return e.y}))]).range([0,460]).nice();return r.a.createElement("section",{className:"section"},r.a.createElement("div",{className:"container"},r.a.createElement("svg",{viewBox:"0 0 ".concat(b," ").concat(p)},r.a.createElement("g",{transform:"translate(".concat(E,", ").concat(g,")")},t.map((function(e,t){return r.a.createElement("g",{key:t,onClick:function(){s(e.word)},onMouseEnter:function(){h(e.word)},onMouseLeave:function(){h("")},transform:"translate(".concat(w(e.x),", ").concat(x(e.y),")"),style:{cursor:"pointer"}},r.a.createElement("title",null,"word:".concat(e.word)),r.a.createElement("circle",{r:j(e),fill:v(e.color)}),r.a.createElement("text",{fontSize:"".concat(.8*j(e),"px"),textAnchor:"middle",dominantBaseline:"central",fill:e.word===f?"blue":"black"},e.word))}))),r.a.createElement("g",{transform:"translate(".concat(E+460,", ").concat(440,")")},r.a.createElement("text",null,i)))),r.a.createElement("div",null,""===i?null:r.a.createElement(u,{word:i})))},u=function(e){var t=e.word,a=Object(c.useState)([]),o=Object(n.a)(a,2),i=o[0],s=o[1],u=Object(c.useState)([]),d=Object(n.a)(u,2),f=d[0],h=d[1],E=Object(c.useState)(""),g=Object(n.a)(E,2),b=g[0],p=g[1],v=Object(c.useState)([]),j=Object(n.a)(v,2),w=j[0],x=j[1],O=Object(c.useState)(""),y=Object(n.a)(O,2),N=y[0],S=y[1],k="./data/dendrogramData2/".concat(t,".json");if(Object(c.useEffect)((function(){window.fetch(k).then((function(e){return e.json()})).then((function(e){s(e)}))}),[k]),Object(c.useEffect)((function(){window.fetch("./data/tsne_+_clusters_list.json").then((function(e){return e.json()})).then((function(e){var t=new Set;e.map((function(e){return t.add(e["\u5e9c\u7701\u5e81"])})),x(Array.from(t));var a=e.filter((function(e){return"2019"===e["\u516c\u958b\u5e74\u5ea6"]&&e["\u4e8b\u696d\u540d"]===b}));h(a)}))}),[b]),0===i.length)return r.a.createElement("div",null);var L=i.length/2*15,M=l.i().domain([0,4,8,12,16,20]).range(["red","orange","yellow","green","blue","purple"]),_=160,A=200,z=20,D=200,B=[];w.map((function(e,t){return B.push({"\u5e9c\u7701\u5e81":e,color:M(t)})}));var C=function(e){var t="";return B.forEach((function(a){a["\u5e9c\u7701\u5e81"]===e&&(t=a.color)})),t},J=400+z+D,q=l.i().domain([l.g(i,(function(e){return e.height})),l.h(i,(function(e){return e.height}))]).range([0,200]),I=l.l().id((function(e){return e.name})).parentId((function(e){return e.parent}))(i),X=l.f(I);l.a().size([L,200]).separation((function(){return 5}))(X);var F=X.descendants();return r.a.createElement("div",null,r.a.createElement("div",{className:"columns"},r.a.createElement("div",{className:"column is-2"},r.a.createElement("svg",{width:_,height:"600"},B.map((function(e,t){return r.a.createElement("g",{transform:"translate(6, ".concat(z+30*t,")")},r.a.createElement("circle",{r:"6",fill:e.color}),r.a.createElement("text",{x:"7",y:"5"},e["\u5e9c\u7701\u5e81"]))})))),r.a.createElement("div",{className:"column",style:{overflowX:"scroll"}},r.a.createElement("svg",{width:L+A,height:J},r.a.createElement("g",{transform:"translate(0,".concat(z,")")},F.slice(1).map((function(e){return r.a.createElement("path",{className:"link",d:"M".concat(e.x,",").concat(q(e.data.data.height),"\n                        L").concat(e.x,",").concat(q(e.parent.data.data.height),"\n                        L").concat(e.parent.x,",").concat(q(e.parent.data.data.height))})})),F.map((function(e,t){return r.a.createElement("g",{key:t,transform:"translate(".concat(e.x,",").concat(q(e.data.data.height),")"),style:{cursor:"pointer"},onClick:function(){p(e.data.data["\u4e8b\u696d\u540d"])},onMouseEnter:function(){S(e.data.data["\u4e8b\u696d\u540d"])},onMouseLeave:function(){S("")}},r.a.createElement("circle",{r:e.children?"1":"6",fill:C(e.data.data["\u5e9c\u7701\u5e81"])}),r.a.createElement("text",{transform:"translate(-3,10) rotate(45)",y:e.children?-10:2,x:"0",fontSize:"".concat(10,"px"),textAnchor:e.children?"end":"start",fill:e.data.data["\u4e8b\u696d\u540d"]===N?"blue":"black"},e.children?null:e.data.data["\u4e8b\u696d\u540d"]))})))))),r.a.createElement("div",null,0===f.length?null:r.a.createElement(m,{projectData:f})))},m=function(e){var t=e.projectData;return r.a.createElement("div",{className:"container"},r.a.createElement("h1",{className:"title"},t[0]["\u4e8b\u696d\u540d"]),r.a.createElement("h2",{className:"has-text-weight-bold"},"\u5e9c\u7701\u5e81"),r.a.createElement("p",{style:{marginLeft:"0.75rem",marginbottom:"1.0rem"}},t[0]["\u5e9c\u7701\u5e81"]),r.a.createElement("h2",{className:"has-text-weight-bold"},"\u4e8b\u696d\u306e\u76ee\u7684"),r.a.createElement("p",{style:{marginLeft:"0.75rem",marginbottom:"0.8rem"}},t[0]["\u4e8b\u696d\u306e\u76ee\u7684"]),r.a.createElement("h2",{className:"has-text-weight-bold"},"\u4e8b\u696d\u6982\u8981"),r.a.createElement("p",{style:{marginLeft:"0.75rem",marginbottom:"0.8rem"}},t[0]["\u4e8b\u696d\u6982\u8981"]))};Object(o.render)(r.a.createElement(i,null),document.querySelector("#content"))}},[[76,1,2]]]);
//# sourceMappingURL=main.92310e3c.chunk.js.map