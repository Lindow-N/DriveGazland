(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[185],{145:function(e,t,r){Promise.resolve().then(r.bind(r,3580)),Promise.resolve().then(r.t.bind(r,3054,23)),Promise.resolve().then(r.t.bind(r,4193,23)),Promise.resolve().then(r.bind(r,8786)),Promise.resolve().then(r.bind(r,7453))},6463:function(e,t,r){"use strict";var n=r(1169);r.o(n,"usePathname")&&r.d(t,{usePathname:function(){return n.usePathname}}),r.o(n,"useRouter")&&r.d(t,{useRouter:function(){return n.useRouter}})},8786:function(e,t,r){"use strict";r.d(t,{TagProvider:function(){return i},e:function(){return d}});var n=r(7437),u=r(2265),a=r(9842),s=r(3908);let o=(0,u.createContext)(void 0),i=e=>{let{children:t}=e,[r,i]=(0,u.useState)([]),[d,c]=(0,u.useState)([]),[l,f]=(0,u.useState)(!0);return(0,u.useEffect)(()=>{(async()=>{try{let e=(0,a.IO)((0,a.hJ)(s.db,"tags"),(0,a.Xo)("name","asc")),t=await (0,a.PL)(e),r=t.docs.map(e=>e.id),n=t.docs.map(e=>({id:e.id,data:e.data()}));i(r),c(n)}catch(e){console.error("Erreur lors de la r\xe9cup\xe9ration des tags :",e)}finally{f(!1)}})()},[]),(0,n.jsx)(o.Provider,{value:{tags:r,tagsWithData:d,loadingTags:l},children:t})},d=()=>{let e=(0,u.useContext)(o);if(void 0===e)throw Error("useTags must be used within a TagProvider");return e}},7453:function(e,t,r){"use strict";r.d(t,{UserProvider:function(){return c},a:function(){return l}});var n=r(7437),u=r(2265),a=r(6463),s=r(3908),o=r(9842),i=r(5186);let d=(0,u.createContext)(void 0),c=e=>{let{children:t}=e,[r,c]=(0,u.useState)(null),[l,f]=(0,u.useState)(!0),v=(0,a.useRouter)();(0,u.useEffect)(()=>{let e=(0,i.Aj)(s.I,async e=>{if(e){let t=(0,o.JU)(s.db,"users",e.uid),r=(0,o.cf)(t,t=>{if(t.exists()){let r={...t.data(),id:e.uid};c(r),r.isValidated||v.push("/account-validation")}else c(null);f(!1)});return()=>r()}c(null),f(!1)});return()=>e()},[v]);let h=async()=>{try{await (0,i.w7)(s.I),c(null),v.push("/")}catch(e){console.error("Erreur lors de la d\xe9connexion :",e)}};return(0,n.jsx)(d.Provider,{value:{user:r,loading:l,logout:h},children:t})},l=()=>{let e=(0,u.useContext)(d);if(void 0===e)throw Error("useUser must be used within a UserProvider");return e}},3908:function(e,t,r){"use strict";r.d(t,{I:function(){return o},db:function(){return i}});var n=r(5236),u=r(5186),a=r(9842);let s=(0,n.ZF)({apiKey:"AIzaSyA3nabauSNn32rLpKIkT5BoPnH8GYBMgEo",authDomain:"drivegazland.firebaseapp.com",projectId:"drivegazland",storageBucket:"drivegazland.appspot.com",messagingSenderId:"159250775284",appId:"1:159250775284:web:1a9bb56fcbd44938a832a1",measurementId:"G-0TF1NK3MC2"}),o=(0,u.v0)(s),i=(0,a.ad)(s)},4193:function(){},3054:function(){}},function(e){e.O(0,[811,358,691,72,580,971,23,744],function(){return e(e.s=145)}),_N_E=e.O()}]);