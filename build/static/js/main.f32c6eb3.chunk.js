(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{38:function(e,t,n){},40:function(e,t,n){"use strict";n.r(t);var c=n(14),a=n.n(c),r=n(15),o=n(3),u=n(2),i=n(4),s=n.n(i),d="/api/persons",l={addNewContact:function(e){return s.a.post(d,e).then((function(e){return e.data}))},getAllContacts:function(){return s.a.get(d).then((function(e){return e.data}))},deleteContact:function(e){return s.a.delete("".concat(d,"/").concat(e.id)).then((function(e){return e.data}))},updateContact:function(e,t){return s.a.put("".concat(d,"/").concat(e),t).then((function(e){return e.data}))}},f=(n(38),n(0)),j=function(e){var t=e.handler;return Object(f.jsxs)("div",{children:["filter shown with ",Object(f.jsx)("input",{onChange:t})]})},h=function(e){return Object(f.jsxs)("form",{onSubmit:function(t){e.addNameHandler(t)},children:[Object(f.jsxs)("div",{children:["name: ",Object(f.jsx)("input",{onChange:e.changeNameHandler})]}),Object(f.jsxs)("div",{children:["number: ",Object(f.jsx)("input",{onChange:e.changeNumberHandler})]}),Object(f.jsx)("div",{children:Object(f.jsx)("button",{type:"submit",children:"add"})})]})},b=function(e){return Object(f.jsx)("div",{children:e.personsToShow.map((function(t){return Object(f.jsxs)("p",{children:[t.name," ",t.number,Object(f.jsx)(m,{text:"Delete",handleDeleteClick:function(t){return e.handleDeleteClick(t)},person:t})]},t.id)}))})},m=function(e){var t=e.text,n=e.handleDeleteClick,c=e.person;return Object(f.jsx)("button",{onClick:function(){return n(c)},children:t})},O=function(e){var t=e.message,n=e.type;return null===t?null:Object(f.jsx)("div",{className:n,children:t})},p=function(){var e=Object(u.useState)([]),t=Object(o.a)(e,2),n=t[0],c=t[1],a=Object(u.useState)(),i=Object(o.a)(a,2),s=i[0],d=i[1],m=Object(u.useState)(),p=Object(o.a)(m,2),x=p[0],v=p[1],C=Object(u.useState)(""),g=Object(o.a)(C,2),w=g[0],N=g[1],k=Object(u.useState)(),S=Object(o.a)(k,2),D=S[0],y=S[1],H=Object(u.useState)(),T=Object(o.a)(H,2),A=T[0],E=T[1];Object(u.useEffect)((function(){l.getAllContacts().then((function(e){return c(e)}))}),[]);var I=function(e,t){for(var n=0;n<e.length;n++)if(e[n].name===t)return n;return-1},J=""===w?n:n.filter((function(e){return e.name.toLowerCase().includes(w.toLowerCase())}));return Object(f.jsxs)("div",{children:[Object(f.jsx)("h2",{children:"Phonebook"}),Object(f.jsx)(O,{message:D,type:A}),Object(f.jsx)(j,{handler:function(e){N(e.target.value)}}),Object(f.jsx)("h3",{children:"Add a new"}),Object(f.jsx)(h,{changeNameHandler:function(e){d(e.target.value)},changeNumberHandler:function(e){v(e.target.value)},addNameHandler:function(e){e.preventDefault();var t={name:s,number:x};if(n.some((function(e){return e.name===t.name}))){var a=I(n,t.name),r=n[a].id;window.confirm("".concat(s," is already added to phonebook, replace the old number with a new one?"))&&l.updateContact(r,t).then((function(e){c(n.map((function(t){return t.id!==r?t:e}))),y("Updated ".concat(e.name)),E("successNotif"),setTimeout((function(){y(null)}),5e3)}))}else l.addNewContact(t).then((function(e){c(n.concat(e)),y("Added ".concat(t.name)),E("successNotif"),setTimeout((function(){y(null)}),5e3)}))}}),Object(f.jsx)("h3",{children:"Numbers"}),Object(f.jsx)(b,{personsToShow:J,handleDeleteClick:function(e){return function(e){var t=Object(r.a)({},e);window.confirm("Delete ".concat(e.name,"?"))&&l.deleteContact(e).then((function(){c(n.filter((function(t){return t.id!==e.id}))),y("Deleted ".concat(e.name)),E("errorNotif"),setTimeout((function(){y(null)}),5e3)})).catch((function(e){y("Information of ".concat(t.name," has already been removed from the server")),E("errorNotif"),setTimeout((function(){y(null)}),5e3)}))}(e)}})]})};a.a.render(Object(f.jsx)(p,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.f32c6eb3.chunk.js.map