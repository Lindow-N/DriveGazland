(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[363],{690:function(e,t,r){Promise.resolve().then(r.bind(r,1740))},1740:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return c}});var n=r(7437),s=r(2265),i=r(4824),a=r(8599),o=r(9962),l=r(8770);function c(){let[e,t]=(0,s.useState)(!1),r=async e=>{let{email:r}=e;if(!r){(0,a.QT)("Le mec ne sait pas \xe9crire un email.");return}try{await (0,o.c0)(r),(0,a.XA)("Un email de r\xe9initialisation de mot de passe a \xe9t\xe9 envoy\xe9 !"),t(!0)}catch(e){(0,a.Eo)("Saint-Jose d\xe8s le matin, je me sens pas bien.")}};return(0,n.jsx)(l.Z,{children:(0,n.jsx)(i.Z,{title:"R\xe9initialiser votre mot de passe",subtitle:"Entrez votre adresse email pour recevoir un lien de r\xe9initialisation",fields:[{id:"email",label:"Email",type:"text"}],buttonText:"Envoyer",linkText:"Retour",linkHref:"/",linkDescription:"Retour \xe0 la page de connexion",onSubmit:r,showMessage:e,message:"Si une adresse email valide a \xe9t\xe9 fournie, un email de r\xe9initialisation de mot de passe a \xe9t\xe9 envoy\xe9."})})}},4824:function(e,t,r){"use strict";var n=r(7437),s=r(2265),i=r(7193),a=r(2985);t.Z=e=>{let{title:t,subtitle:r,fields:o,buttonText:l,linkText:c,linkHref:d,linkDescription:u,onSubmit:m,ForgotPassword:f,showMessage:h,message:x}=e,[p,g]=(0,s.useState)({}),[b,v]=(0,s.useState)(!1),y=e=>{g({...p,[e.target.id]:e.target.value})},w=()=>{v(!b)};return(0,n.jsxs)("main",{className:"bg-dark3 max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl",children:[(0,n.jsxs)("section",{children:[(0,n.jsx)("h3",{className:"font-bold text-2xl text-white font-subtitle",children:t}),(0,n.jsx)("p",{className:"text-gray-300 pt-2",children:r})]}),h?(0,n.jsx)("div",{className:"bg-green-500 p-4 rounded text-white text-center mt-6",children:x}):(0,n.jsx)("section",{className:"mt-10",children:(0,n.jsxs)("form",{className:"flex flex-col",onSubmit:e=>{e.preventDefault(),m(p)},children:[o.map((e,t)=>(0,n.jsxs)("div",{className:"mb-6 pt-3 rounded bg-dark2 relative",children:[(0,n.jsx)("label",{className:"block text-gray-300 text-sm font-bold mb-2 ml-3 font-subtitle",htmlFor:e.id,children:e.label}),(0,n.jsx)("input",{type:"password"===e.type&&b?"text":e.type,id:e.id,value:p[e.id]||"",onChange:y,className:"bg-dark2 rounded w-full text-white focus:outline-none border-b-4 border-dark1 focus:border-greenPrimary transition duration-500 px-3 pb-3"}),"password"===e.type&&(0,n.jsx)("button",{type:"button",onClick:w,className:"absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white",children:b?(0,n.jsx)(i.Z,{className:"h-5 w-5","aria-hidden":"true"}):(0,n.jsx)(a.Z,{className:"h-5 w-5","aria-hidden":"true"})})]},t)),f&&(0,n.jsx)("div",{className:"flex justify-end",children:(0,n.jsx)("a",{href:"/reset-password",className:"text-sm text-greenPrimary hover:text-greenPrimary hover:underline mb-6",children:"Mot de passe oubli\xe9 ?"})}),(0,n.jsx)("button",{className:"bg-greenPrimary hover:bg-green-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200",type:"submit",children:l})]})}),c&&(0,n.jsx)("div",{className:"max-w-lg mx-auto text-center mt-12 mb-6",children:(0,n.jsxs)("p",{className:"text-white",children:[u," ",(0,n.jsx)("a",{href:d,className:"font-bold text-greenPrimary hover:underline",children:c}),"."]})})]})}},9962:function(e,t,r){"use strict";r.d(t,{a$:function(){return i},c0:function(){return o},pH:function(){return a}});var n=r(5186),s=r(3908);let i=async(e,t)=>{try{let r=(await (0,n.Xb)(s.I,e,t)).user;return console.log("Inscription r\xe9ussie : ",r),r}catch(e){throw console.error("Erreur d'inscription : ",e),e}},a=async(e,t)=>{try{let r=(await (0,n.e5)(s.I,e,t)).user;return console.log("Connexion r\xe9ussie : ",r),r}catch(e){throw console.error("Erreur de connexion : ",e),e}},o=async e=>{try{await (0,n.LS)(s.I,e),console.log("Email de r\xe9initialisation envoy\xe9 \xe0 : ",e)}catch(e){throw console.error("Erreur lors de l'envoi de l'email de r\xe9initialisation : ",e),e}}},3908:function(e,t,r){"use strict";r.d(t,{I:function(){return a}});var n=r(5236),s=r(5186);let i=(0,n.ZF)({apiKey:"AIzaSyA3nabauSNn32rLpKIkT5BoPnH8GYBMgEo",authDomain:"drivegazland.firebaseapp.com",projectId:"drivegazland",storageBucket:"drivegazland.appspot.com",messagingSenderId:"159250775284",appId:"1:159250775284:web:1a9bb56fcbd44938a832a1",measurementId:"G-0TF1NK3MC2"}),a=(0,s.v0)(i)},8770:function(e,t,r){"use strict";var n=r(7437);r(2265);var s=r(6648);t.Z=e=>{let{children:t}=e;return(0,n.jsxs)("div",{style:{backgroundColor:"#111828"},className:"min-h-screen flex flex-col items-center justify-center pt-12 md:pt-20 pb-6 px-2 md:px-0 font-body",children:[(0,n.jsx)("header",{className:"max-w-lg mx-auto mb-4 mt-12",children:(0,n.jsx)(s.default,{src:"./images/GazlandProjet.png",alt:"Drive Gazland Logo",layout:"intrinsic",width:400,height:200,className:"mx-auto"})}),(0,n.jsx)("div",{className:"w-full max-w-lg mx-auto",children:t})]})}},8599:function(e,t,r){"use strict";r.d(t,{Eo:function(){return o},QT:function(){return l},XA:function(){return a}});var n=r(7437),s=r(3580),i=r(6648);let a=e=>{s.Am.success((0,n.jsxs)("div",{className:"flex items-center",children:[(0,n.jsx)("div",{style:{width:"75px",height:"75px",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"flex-start"},children:(0,n.jsx)(i.default,{src:"/images/success-icon.png",alt:"Success",layout:"intrinsic",width:75,height:75})}),(0,n.jsx)("span",{className:"flex-grow text-left ml-3",style:{color:"#ffffff"},children:e})]}),{position:"top-right",autoClose:3e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored",icon:!1,style:{backgroundColor:"#1C7B47",color:"#ffffff"}})},o=e=>{s.Am.error((0,n.jsxs)("div",{className:"flex items-center",children:[(0,n.jsx)("div",{style:{width:"75px",height:"75px",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"flex-start"},children:(0,n.jsx)(i.default,{src:"/images/error-icon.png",alt:"Error",layout:"intrinsic",width:75,height:75})}),(0,n.jsx)("span",{className:"flex-grow text-left ml-3",style:{color:"#ffffff"},children:e})]}),{position:"top-right",autoClose:3e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored",icon:!1,style:{backgroundColor:"#D62839",color:"#ffffff"}})},l=e=>{s.Am.error((0,n.jsxs)("div",{className:"flex items-center",children:[(0,n.jsx)("div",{style:{width:"75px",height:"75px",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"flex-start"},children:(0,n.jsx)(i.default,{src:"/images/mock-icon.png",alt:"Mock",layout:"intrinsic",width:75,height:75})}),(0,n.jsx)("span",{className:"flex-grow text-left ml-3",style:{color:"#ffffff"},children:e})]}),{position:"top-right",autoClose:3e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0,theme:"colored",icon:!1,style:{backgroundColor:"#FAA613",color:"#ffffff"}})}},2985:function(e,t,r){"use strict";var n=r(2265);let s=n.forwardRef(function(e,t){let{title:r,titleId:s,...i}=e;return n.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:t,"aria-labelledby":s},i),r?n.createElement("title",{id:s},r):null,n.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"}),n.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"}))});t.Z=s},7193:function(e,t,r){"use strict";var n=r(2265);let s=n.forwardRef(function(e,t){let{title:r,titleId:s,...i}=e;return n.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:t,"aria-labelledby":s},i),r?n.createElement("title",{id:s},r):null,n.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"}))});t.Z=s}},function(e){e.O(0,[691,880,580,971,23,744],function(){return e(e.s=690)}),_N_E=e.O()}]);