(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[185],{9273:function(e,t,r){Promise.resolve().then(r.bind(r,3580)),Promise.resolve().then(r.t.bind(r,3054,23)),Promise.resolve().then(r.t.bind(r,4193,23)),Promise.resolve().then(r.bind(r,466)),Promise.resolve().then(r.bind(r,8786)),Promise.resolve().then(r.bind(r,7453))},6463:function(e,t,r){"use strict";var s=r(1169);r.o(s,"usePathname")&&r.d(t,{usePathname:function(){return s.usePathname}}),r.o(s,"useRouter")&&r.d(t,{useRouter:function(){return s.useRouter}})},466:function(e,t,r){"use strict";r.d(t,{FilesProvider:function(){return l},Y:function(){return u}});var s=r(7437),n=r(2265),o=r(9842),a=r(3908);let i=(0,n.createContext)(void 0),l=e=>{let{children:t}=e,[r,l]=(0,n.useState)(0),[u,c]=(0,n.useState)(!0);(0,n.useEffect)(()=>{(async()=>{try{let e=await (0,o.PL)((0,o.hJ)(a.db,"files"));l(e.size)}catch(e){console.error("Erreur lors de la r\xe9cup\xe9ration du nombre total de fichiers :",e)}finally{c(!1)}})()},[]);let d=async e=>{if(0===e.length)return[];try{let t=(0,o.hJ)(a.db,"files"),r=(0,o.IO)(t,(0,o.ar)("tags","array-contains-any",e));return(await (0,o.PL)(r)).docs.map(e=>({id:e.id,...e.data()})).filter(t=>e.every(e=>t.tags.includes(e)))}catch(e){return console.error("Erreur lors de la recherche des fichiers :",e),[]}};return(0,s.jsx)(i.Provider,{value:{totalFiles:r,loadingFiles:u,searchFilesByTags:d},children:t})},u=()=>{let e=(0,n.useContext)(i);if(void 0===e)throw Error("useFiles must be used within a FilesProvider");return e}},8786:function(e,t,r){"use strict";r.d(t,{TagProvider:function(){return l},e:function(){return u}});var s=r(7437),n=r(2265),o=r(9842),a=r(3908);let i=(0,n.createContext)(void 0),l=e=>{let{children:t}=e,[r,l]=(0,n.useState)([]),[u,c]=(0,n.useState)([]),[d,f]=(0,n.useState)(!0),[h,m]=(0,n.useState)(0);return(0,n.useEffect)(()=>{let e=(0,o.IO)((0,o.hJ)(a.db,"tags"),(0,o.Xo)("name","asc")),t=(0,o.cf)(e,e=>{let t=e.docs.map(e=>e.id),r=e.docs.map(e=>({id:e.id,data:e.data()}));l(t),c(r),m(e.size),f(!1)});return()=>t()},[]),(0,s.jsx)(i.Provider,{value:{tags:r,tagsWithData:u,loadingTags:d,totalTags:h},children:t})},u=()=>{let e=(0,n.useContext)(i);if(void 0===e)throw Error("useTags must be used within a TagProvider");return e}},7453:function(e,t,r){"use strict";r.d(t,{UserProvider:function(){return h},a:function(){return f}});var s=r(7437),n=r(6463),o=r(3908),a=r(9842),i=r(5186),l=r(2265),u=r(2126),c=r(8786);let d=(0,l.createContext)(void 0),f=()=>{let e=(0,l.useContext)(d);if(void 0===e)throw Error("useUser must be used within a UserProvider");return e},h=e=>{let{children:t}=e,[r,f]=(0,l.useState)(null),[h,m]=(0,l.useState)(null),[p,g]=(0,l.useState)(!0),[v,x]=(0,l.useState)(!1),b=(0,n.useRouter)(),y=(0,n.usePathname)(),{tags:P,loadingTags:C}=(0,c.e)();(0,l.useEffect)(()=>{let e=(0,i.Aj)(o.I,async e=>{if(e){let t=(0,a.JU)(o.db,"users",e.uid),r=(0,a.cf)(t,t=>{if(t.exists()){let r={...t.data(),id:e.uid};f(r),localStorage.getItem("toastShown")||v||((0,u.XA)("Salut ".concat(r.pseudonym," !")),x(!0),localStorage.setItem("toastShown","true")),C||(r.isValidated?["/dashboard","/ranking","/profile","/uploadMedia"].includes(null!=y?y:"")||b.push("/dashboard"):b.push("/account-validation"))}else f(null);g(!1)}),s=(0,a.hJ)(o.db,"users"),n=(0,a.cf)(s,e=>{m(e.docs.map(e=>({...e.data(),id:e.id})))});return()=>{r(),n()}}f(null),g(!1)});return()=>e()},[b,v,C,y]);let w=async()=>{try{await (0,i.w7)(o.I),f(null),x(!1),localStorage.removeItem("toastShown"),b.push("/")}catch(e){console.error("Erreur lors de la d\xe9connexion :",e),(0,u.Eo)("Ne part pas ! :(")}};return(0,s.jsx)(d.Provider,{value:{user:r,allUsers:h,loading:p,logout:w},children:t})}},3908:function(e,t,r){"use strict";r.d(t,{I:function(){return i},db:function(){return l}});var s=r(5236),n=r(5186),o=r(9842);let a=(0,s.ZF)({apiKey:"AIzaSyA3nabauSNn32rLpKIkT5BoPnH8GYBMgEo",authDomain:"drivegazland.firebaseapp.com",projectId:"drivegazland",storageBucket:"drivegazland.appspot.com",messagingSenderId:"159250775284",appId:"1:159250775284:web:1a9bb56fcbd44938a832a1",measurementId:"G-0TF1NK3MC2"}),i=(0,n.v0)(a),l=(0,o.ad)(a)},4364:function(e,t,r){"use strict";r.d(t,{Pn:function(){return n},zK:function(){return o}});let s=e=>e.trim().toLowerCase(),n=(e,t)=>{let r=s(t);return e.includes(r)?e:[...e,r]},o=e=>{let t=Math.floor(Math.random()*e.length);return e[t]}},2126:function(e,t,r){"use strict";r.d(t,{Eo:function(){return c},QT:function(){return d},XA:function(){return u}});var s=r(7437),n=r(3580),o=r(6648),a=r(4364);let i=["Psartek \uD83C\uDF89","Pas mal elle","Mets les nudes de ta soeur plutot \uD83D\uDC4D","Ho ouai","Ho ouai","Ho ouai","Gors","Sa va","Pas mal","chaque upload fait grandir de 1 cm ton sexe","Bien jou\xe9 !","Ha ouai j'aime bien elle","ez","gg","Sa manque de hentai tout sa","ok super","Basique","C'est pas mal","ha ouai m'en souviens de celle la","J'aime bien","J'aime bien celle la","Tu peux faire mieux","si c'est pour upload sa..."],l=["Oups, quelque chose s'est mal pass\xe9 ! \uD83D\uDE15","merde j'ai cass\xe9 un truc","oula... c'est pas bon","saint jos\xe9 des le matin, me sent pas bien"],u=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=e||(0,a.zK)(i);n.Am.success((0,s.jsxs)("div",{className:"flex items-center",children:[(0,s.jsx)("div",{style:{width:"75px",height:"75px",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"flex-start"},children:(0,s.jsx)(o.default,{src:"/images/toast/success-icon.png",alt:"Success",layout:"intrinsic",width:75,height:75})}),(0,s.jsx)("span",{className:"flex-grow text-left ml-3",style:{color:"#ffffff"},children:t})]}),{position:"top-right",autoClose:3e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored",icon:!1,style:{backgroundColor:"#1C7B47",color:"#ffffff"}})},c=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=e||(0,a.zK)(l);n.Am.error((0,s.jsxs)("div",{className:"flex items-center",children:[(0,s.jsx)("div",{style:{width:"75px",height:"75px",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"flex-start"},children:(0,s.jsx)(o.default,{src:"/images/toast/error-icon.png",alt:"Error",layout:"intrinsic",width:75,height:75})}),(0,s.jsx)("span",{className:"flex-grow text-left ml-3",style:{color:"#ffffff"},children:t})]}),{position:"top-right",autoClose:3e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored",icon:!1,style:{backgroundColor:"#D62839",color:"#ffffff"}})},d=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;n.Am.error((0,s.jsxs)("div",{className:"flex items-center",children:[(0,s.jsx)("div",{style:{width:"75px",height:"75px",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"flex-start"},children:(0,s.jsx)(o.default,{src:"/images/toast/mock-icon.png",alt:"Mock",layout:"intrinsic",width:75,height:75})}),(0,s.jsx)("span",{className:"flex-grow text-left ml-3",style:{color:"#ffffff"},children:e||"Ceci est un toast moqueur ! \uD83D\uDE1C"})]}),{position:"top-right",autoClose:3e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored",icon:!1,style:{backgroundColor:"#FAA613",color:"#ffffff"}})}},4193:function(){},3054:function(){}},function(e){e.O(0,[811,358,691,431,971,23,744],function(){return e(e.s=9273)}),_N_E=e.O()}]);