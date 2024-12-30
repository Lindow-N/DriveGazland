"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[93],{9735:function(e,t,r){r.d(t,{Z:function(){return o}});var a=r(7437),n=r(2265);let s=n.forwardRef(function(e,t){let{title:r,titleId:a,...s}=e;return n.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:t,"aria-labelledby":a},s),r?n.createElement("title",{id:a},r):null,n.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"}))}),l=n.forwardRef(function(e,t){let{title:r,titleId:a,...s}=e;return n.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:t,"aria-labelledby":a},s),r?n.createElement("title",{id:a},r):null,n.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"}),n.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"}))});var o=e=>{let{title:t,subtitle:r,fields:o,buttonText:i,linkText:c,linkHref:d,linkDescription:u,onSubmit:f,ForgotPassword:h,showMessage:m,message:x}=e,[g,p]=(0,n.useState)({}),[b,v]=(0,n.useState)(!1),w=e=>{p({...g,[e.target.id]:e.target.value})},y=()=>{v(!b)};return(0,a.jsxs)("main",{className:"bg-dark3 max-w-lg mx-auto p-6 md:p-10 rounded-lg shadow-2xl",children:[(0,a.jsxs)("section",{children:[(0,a.jsx)("h3",{className:"font-bold text-2xl text-white font-subtitle",children:t}),(0,a.jsx)("p",{className:"text-gray-300 pt-2",children:r})]}),m?(0,a.jsx)("div",{className:"bg-green-500 p-4 rounded text-white text-center mt-6",children:x}):(0,a.jsx)("section",{className:"mt-8",children:(0,a.jsxs)("form",{className:"flex flex-col",onSubmit:e=>{e.preventDefault(),f(g)},children:[o.map((e,t)=>(0,a.jsxs)("div",{className:"mb-6 pt-3 rounded bg-dark2 relative",children:[(0,a.jsx)("label",{className:"block text-gray-300 text-sm font-bold mb-2 ml-3 font-subtitle",htmlFor:e.id,children:e.label}),(0,a.jsx)("input",{type:"password"===e.type&&b?"text":e.type,id:e.id,value:g[e.id]||"",onChange:w,className:"bg-dark2 rounded w-full text-white focus:outline-none border-b-4 border-dark1 focus:border-greenPrimary transition duration-500 px-3 pb-3"}),"password"===e.type&&(0,a.jsx)("button",{type:"button",onClick:y,className:"absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white",children:b?(0,a.jsx)(s,{className:"h-5 w-5","aria-hidden":"true"}):(0,a.jsx)(l,{className:"h-5 w-5","aria-hidden":"true"})})]},t)),h&&(0,a.jsx)("div",{className:"flex justify-end",children:(0,a.jsx)("a",{href:"/reset-password",className:"text-sm text-greenPrimary hover:text-greenPrimary hover:underline mb-6",children:"Mot de passe oubli\xe9 ?"})}),(0,a.jsx)("button",{className:"bg-greenPrimary hover:bg-green-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200",type:"submit",children:i})]})}),c&&(0,a.jsx)("div",{className:"max-w-lg mx-auto text-center mt-8 mb-6",children:(0,a.jsxs)("p",{className:"text-white",children:[u," ",(0,a.jsx)("a",{href:d,className:"font-bold text-greenPrimary hover:underline",children:c}),"."]})})]})}},9962:function(e,t,r){r.d(t,{ZJ:function(){return i},a$:function(){return l},c0:function(){return c},pH:function(){return o}});var a=r(9842),n=r(3908),s=r(5186);let l=async(e,t,r)=>{try{let l=(await (0,s.Xb)(n.I,e,t)).user,o=(0,a.JU)(n.db,"users",l.uid);return await (0,a.pl)(o,{id:l.uid,pseudonym:r,isValidated:!1,totalFileUploads:0,creationDate:new Date,recentFiles:[],achievements:{},createdTags:[],favorites:[]}),l}catch(e){throw console.error("Erreur lors de la cr\xe9ation de l'utilisateur ou du document Firestore : ",e),e}},o=async(e,t)=>{try{return(await (0,s.e5)(n.I,e,t)).user}catch(e){throw console.error("Erreur de connexion : ",e),e}},i=async e=>{let t=(0,a.JU)(n.db,"users",e),r=await (0,a.QT)(t);if(!r.exists())throw Error("Utilisateur introuvable.");return r.data().isValidated},c=async e=>{try{await (0,s.LS)(n.I,e)}catch(e){throw console.error("Erreur lors de l'envoi de l'email de r\xe9initialisation : ",e),e}}},3908:function(e,t,r){r.d(t,{I:function(){return i},db:function(){return c},t:function(){return d}});var a=r(5236),n=r(5186),s=r(9842),l=r(9854);let o=(0,a.ZF)({apiKey:"AIzaSyA3nabauSNn32rLpKIkT5BoPnH8GYBMgEo",authDomain:"drivegazland.firebaseapp.com",projectId:"drivegazland",storageBucket:"drivegazland.appspot.com",messagingSenderId:"159250775284",appId:"1:159250775284:web:1a9bb56fcbd44938a832a1",measurementId:"G-0TF1NK3MC2"}),i=(0,n.v0)(o),c=(0,s.ad)(o),d=(0,l.cF)(o)},8770:function(e,t,r){var a=r(7437);r(2265);var n=r(6648);t.Z=e=>{let{children:t}=e;return(0,a.jsxs)("div",{style:{backgroundColor:"#111828"},className:"min-h-screen flex flex-col items-center justify-center pt-12 md:pt-20 pb-6 px-2 md:px-0 font-body",children:[(0,a.jsx)("header",{className:"max-w-lg mx-auto mb-4 mt-2 md:mt-12",children:(0,a.jsx)(n.default,{src:"/images/GazlandProjet.png",alt:"Drive Gazland Logo",layout:"intrinsic",width:400,height:200,className:"mx-auto"})}),(0,a.jsx)("div",{className:"w-full max-w-lg mx-auto flex-grow",children:t})]})}},4364:function(e,t,r){r.d(t,{Pn:function(){return l},SH:function(){return i},ep:function(){return c},zK:function(){return o}});var a=r(9854),n=r(3908);let s=e=>e.trim().toLowerCase(),l=(e,t)=>{let r=s(t);return e.includes(r)?e:[...e,r]},o=e=>{let t=Math.floor(Math.random()*e.length);return e[t]},i=async e=>{try{let t=(0,a.iH)(n.t,e);return await (0,a.Jt)(t)}catch(e){return console.error("Erreur lors de la r\xe9cup\xe9ration de l'URL:",e),null}},c=function(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:29,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:3,n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:54;return t?Math.min(e.length,n):Math.max(r-e.filter(e=>e.storagePath.startsWith("videos/")).length*a,4)}},2126:function(e,t,r){r.d(t,{Dc:function(){return f},Eo:function(){return d},QT:function(){return u},XA:function(){return c}});var a=r(7437),n=r(3580),s=r(6648),l=r(4364);let o=["Psartek \uD83C\uDF89","Pas mal elle","Mets les nudes de ta soeur plutot \uD83D\uDC4D","Ho ouai","Ho ouai","Ho ouai","Gors","Sa va","Pas mal","chaque upload fait grandir de 1 cm ton sexe","Bien jou\xe9 !","Ha ouai j'aime bien elle","ez","gg","Sa manque de hentai tout sa","ok super","Basique","C'est pas mal","ha ouai m'en souviens de celle la","J'aime bien","J'aime bien celle la","Tu peux faire mieux","si c'est pour upload sa..."],i=["Oups, quelque chose s'est mal pass\xe9 ! \uD83D\uDE15","merde j'ai cass\xe9 un truc","oula... c'est pas bon","saint jos\xe9 des le matin, me sent pas bien"],c=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=e||(0,l.zK)(o);n.Am.success((0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)("div",{style:{width:"75px",height:"75px",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"flex-start"},children:(0,a.jsx)(s.default,{src:"/images/toast/success-icon.png",alt:"Success",layout:"intrinsic",width:75,height:75})}),(0,a.jsx)("span",{className:"flex-grow text-left ml-3",style:{color:"#ffffff"},children:t})]}),{position:"top-right",autoClose:3e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored",icon:!1,style:{backgroundColor:"#1C7B47",color:"#ffffff"}})},d=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=e||(0,l.zK)(i);n.Am.error((0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)("div",{style:{width:"75px",height:"75px",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"flex-start"},children:(0,a.jsx)(s.default,{src:"/images/toast/error-icon.png",alt:"Error",layout:"intrinsic",width:75,height:75})}),(0,a.jsx)("span",{className:"flex-grow text-left ml-3",style:{color:"#ffffff"},children:t})]}),{position:"top-right",autoClose:3e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored",icon:!1,style:{backgroundColor:"#D62839",color:"#ffffff"}})},u=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;n.Am.error((0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)("div",{style:{width:"75px",height:"75px",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"flex-start"},children:(0,a.jsx)(s.default,{src:"/images/toast/mock-icon.png",alt:"Mock",layout:"intrinsic",width:75,height:75})}),(0,a.jsx)("span",{className:"flex-grow text-left ml-3",style:{color:"#ffffff"},children:e||"Ceci est un toast moqueur ! \uD83D\uDE1C"})]}),{position:"top-right",autoClose:3e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored",icon:!1,style:{backgroundColor:"#FAA613",color:"#ffffff"}})},f=e=>{let t="Succ\xe8s d\xe9bloqu\xe9: ".concat(e.name),r="/images/success/".concat(e.id,".png");n.Am.success((0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)("div",{style:{width:"75px",height:"75px",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"flex-start"},children:(0,a.jsx)(s.default,{src:r,alt:e.name,layout:"intrinsic",width:75,height:75})}),(0,a.jsx)("span",{className:"flex-grow text-left ml-3",style:{color:"#ffffff"},children:t})]}),{position:"top-right",autoClose:3e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored",icon:!1,style:{backgroundColor:"#1C7B47",color:"#ffffff"}})}}}]);