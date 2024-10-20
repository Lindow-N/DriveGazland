"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[453],{8786:function(e,t,r){r.d(t,{TagProvider:function(){return l},e:function(){return u}});var i=r(7437),n=r(2265),s=r(9842),a=r(3908);let o=(0,n.createContext)(void 0),l=e=>{let{children:t}=e,[r,l]=(0,n.useState)([]),[u,c]=(0,n.useState)([]),[d,f]=(0,n.useState)([]),[h,p]=(0,n.useState)(!0),[m,g]=(0,n.useState)(0);return(0,n.useEffect)(()=>{let e=(0,s.IO)((0,s.hJ)(a.db,"tags"),(0,s.Xo)("name","asc")),t=(0,s.cf)(e,e=>{let t=e.docs.map(e=>e.id),r=e.docs.map(e=>({id:e.id,data:e.data()}));l(t),c(r),g(e.size),p(!1)}),r=(0,s.hJ)(a.db,"linkedTags"),i=(0,s.cf)(r,e=>{f(e.docs.map(e=>({id:e.id,group:e.data().group,tags:e.data().tags})))});return()=>{t(),i()}},[]),(0,i.jsx)(o.Provider,{value:{tags:r,tagsWithData:u,linkedTags:d,setLinkedTags:f,loadingTags:h,totalTags:m},children:t})},u=()=>{let e=(0,n.useContext)(o);if(void 0===e)throw Error("useTags must be used within a TagProvider");return e}},7453:function(e,t,r){r.d(t,{UserProvider:function(){return p},a:function(){return h}});var i=r(7437),n=r(6463),s=r(3908),a=r(9842),o=r(5186),l=r(2265),u=r(2126),c=r(8786),d=r(1288);let f=(0,l.createContext)(void 0),h=()=>{let e=(0,l.useContext)(f);if(void 0===e)throw Error("useUser must be used within a UserProvider");return e},p=e=>{let{children:t}=e,[r,h]=(0,l.useState)(null),[p,m]=(0,l.useState)(null),[g,x]=(0,l.useState)(!0),[v,C]=(0,l.useState)(!1),b=(0,n.useRouter)(),j=(0,n.usePathname)(),{tags:y,loadingTags:w}=(0,c.e)();(0,l.useEffect)(()=>{let e=(0,o.Aj)(s.I,async e=>{if(e){let t=(0,a.JU)(s.db,"users",e.uid),r=(0,a.cf)(t,t=>{if(t.exists()){let i={...t.data(),id:e.uid};h(i),localStorage.getItem("toastShown")||v||((0,u.XA)("Salut ".concat(i.pseudonym," !")),C(!0),localStorage.setItem("toastShown","true")),w||(i.isValidated?["/dashboard","/ranking","/profile","/uploadMedia","/linked"].includes(null!=j?j:"")||b.push("/dashboard"):b.push("/account-validation"));let[n,s]=new Date().toLocaleString("fr-FR",{timeZone:"Europe/Paris",hour:"2-digit",minute:"2-digit",hour12:!1}).split(":").map(Number);if(16===n&&20===s||4===n&&20===s){var r;(null===(r=i.achievements)||void 0===r?void 0:r[11])||(0,d.T)(i.id,11)}}else h(null);x(!1)}),i=(0,a.hJ)(s.db,"users"),n=(0,a.cf)(i,e=>{m(e.docs.map(e=>({...e.data(),id:e.id})))});return()=>{r(),n()}}h(null),x(!1)});return()=>e()},[b,v,w,j]);let S=async()=>{try{var e;!r||(null===(e=r.achievements)||void 0===e?void 0:e[14])||await (0,d.T)(r.id,14),await (0,o.w7)(s.I),h(null),C(!1),localStorage.removeItem("toastShown"),b.push("/")}catch(e){console.error("Erreur lors de la d\xe9connexion :",e),(0,u.Eo)("Ne part pas ! :(")}};return(0,i.jsx)(f.Provider,{value:{user:r,allUsers:p,loading:g,logout:S},children:t})}},3908:function(e,t,r){r.d(t,{I:function(){return l},db:function(){return u},t:function(){return c}});var i=r(5236),n=r(5186),s=r(9842),a=r(9854);let o=(0,i.ZF)({apiKey:"AIzaSyA3nabauSNn32rLpKIkT5BoPnH8GYBMgEo",authDomain:"drivegazland.firebaseapp.com",projectId:"drivegazland",storageBucket:"drivegazland.appspot.com",messagingSenderId:"159250775284",appId:"1:159250775284:web:1a9bb56fcbd44938a832a1",measurementId:"G-0TF1NK3MC2"}),l=(0,n.v0)(o),u=(0,s.ad)(o),c=(0,a.cF)(o)},1288:function(e,t,r){r.d(t,{T:function(){return o}});var i=r(9842),n=r(3908),s=r(2126),a=r(8592);let o=async(e,t)=>{let r=(0,i.JU)(n.db,"users",e);try{await (0,i.r7)(r,{achievements:(0,i.vr)(t)});let e=a.N.find(e=>e.id===t);e&&(0,s.Dc)(e)}catch(e){console.error("Erreur lors du d\xe9blocage du succ\xe8s :",e)}}},8592:function(e,t,r){r.d(t,{N:function(){return i}});let i=[{id:1,name:"1er Upload",description:"Ajouter votre premier fichier"},{id:2,name:"2000",description:"moi au moins, je suis pas un 2000"},{id:3,name:" J'repr\xe9sente le sept",description:"Cr\xe9er 7 tags"},{id:4,name:"Around 8",description:"Ajouter 8 fichiers"},{id:5,name:"Bonne pioche !",description:"t\xe9l\xe9charger un fichier"},{id:6,name:"Ghost 10",description:"Cr\xe9er 10 tags"},{id:7,name:"13",description:"Ajouter 13 fichiers"},{id:8,name:"Tu cr\xe9es une r\xe8gle.",description:"Cr\xe9er 21 tags"},{id:9,name:"hentai",description:"Ajouter 69 fichiers"},{id:10,name:"we are 99",description:"Ajouter 99 fichiers"},{id:11,name:"420",description:"C\xe9l\xe9brer le 420."},{id:12,name:"Ma\xeetre des tags",description:"Cr\xe9er 50 tags"},{id:13,name:"40Kant too fat",description:"acceder page 404"},{id:14,name:"Salut mon pote",description:"appuis usr deconnecion"}]},4364:function(e,t,r){r.d(t,{Pn:function(){return a},SH:function(){return l},ep:function(){return u},zK:function(){return o}});var i=r(9854),n=r(3908);let s=e=>e.trim().toLowerCase(),a=(e,t)=>{let r=s(t);return e.includes(r)?e:[...e,r]},o=e=>{let t=Math.floor(Math.random()*e.length);return e[t]},l=async e=>{try{let t=(0,i.iH)(n.t,e);return await (0,i.Jt)(t)}catch(e){return console.error("Erreur lors de la r\xe9cup\xe9ration de l'URL:",e),null}},u=function(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:29,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:3;return t?71:Math.max(r-e.filter(e=>e.storagePath.startsWith("videos/")).length*i,4)}},2126:function(e,t,r){r.d(t,{Dc:function(){return f},Eo:function(){return c},QT:function(){return d},XA:function(){return u}});var i=r(7437),n=r(3580),s=r(6648),a=r(4364);let o=["Psartek \uD83C\uDF89","Pas mal elle","Mets les nudes de ta soeur plutot \uD83D\uDC4D","Ho ouai","Ho ouai","Ho ouai","Gors","Sa va","Pas mal","chaque upload fait grandir de 1 cm ton sexe","Bien jou\xe9 !","Ha ouai j'aime bien elle","ez","gg","Sa manque de hentai tout sa","ok super","Basique","C'est pas mal","ha ouai m'en souviens de celle la","J'aime bien","J'aime bien celle la","Tu peux faire mieux","si c'est pour upload sa..."],l=["Oups, quelque chose s'est mal pass\xe9 ! \uD83D\uDE15","merde j'ai cass\xe9 un truc","oula... c'est pas bon","saint jos\xe9 des le matin, me sent pas bien"],u=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=e||(0,a.zK)(o);n.Am.success((0,i.jsxs)("div",{className:"flex items-center",children:[(0,i.jsx)("div",{style:{width:"75px",height:"75px",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"flex-start"},children:(0,i.jsx)(s.default,{src:"/images/toast/success-icon.png",alt:"Success",layout:"intrinsic",width:75,height:75})}),(0,i.jsx)("span",{className:"flex-grow text-left ml-3",style:{color:"#ffffff"},children:t})]}),{position:"top-right",autoClose:3e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored",icon:!1,style:{backgroundColor:"#1C7B47",color:"#ffffff"}})},c=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=e||(0,a.zK)(l);n.Am.error((0,i.jsxs)("div",{className:"flex items-center",children:[(0,i.jsx)("div",{style:{width:"75px",height:"75px",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"flex-start"},children:(0,i.jsx)(s.default,{src:"/images/toast/error-icon.png",alt:"Error",layout:"intrinsic",width:75,height:75})}),(0,i.jsx)("span",{className:"flex-grow text-left ml-3",style:{color:"#ffffff"},children:t})]}),{position:"top-right",autoClose:3e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored",icon:!1,style:{backgroundColor:"#D62839",color:"#ffffff"}})},d=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;n.Am.error((0,i.jsxs)("div",{className:"flex items-center",children:[(0,i.jsx)("div",{style:{width:"75px",height:"75px",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"flex-start"},children:(0,i.jsx)(s.default,{src:"/images/toast/mock-icon.png",alt:"Mock",layout:"intrinsic",width:75,height:75})}),(0,i.jsx)("span",{className:"flex-grow text-left ml-3",style:{color:"#ffffff"},children:e||"Ceci est un toast moqueur ! \uD83D\uDE1C"})]}),{position:"top-right",autoClose:3e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored",icon:!1,style:{backgroundColor:"#FAA613",color:"#ffffff"}})},f=e=>{let t="Succ\xe8s d\xe9bloqu\xe9: ".concat(e.name),r="/images/success/".concat(e.id,".png");n.Am.success((0,i.jsxs)("div",{className:"flex items-center",children:[(0,i.jsx)("div",{style:{width:"75px",height:"75px",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"flex-start"},children:(0,i.jsx)(s.default,{src:r,alt:e.name,layout:"intrinsic",width:75,height:75})}),(0,i.jsx)("span",{className:"flex-grow text-left ml-3",style:{color:"#ffffff"},children:t})]}),{position:"top-right",autoClose:3e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored",icon:!1,style:{backgroundColor:"#1C7B47",color:"#ffffff"}})}}}]);